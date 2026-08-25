package main

import (
	"sync"
	"time"

	"github.com/shirou/gopsutil/v4/cpu"
	"github.com/shirou/gopsutil/v4/disk"
	"github.com/shirou/gopsutil/v4/mem"
	"github.com/shirou/gopsutil/v4/net"
)

// NetSpeed representa la velocidad de red calculada para una interfaz
type NetSpeed struct {
	Name    string  `json:"name"`
	SentBps float64 `json:"sentBps"` // bytes por segundo enviados
	RecvBps float64 `json:"recvBps"` // bytes por segundo recibidos
}

type MonitorService struct {
	mu           sync.Mutex
	prevCounters map[string]net.IOCountersStat
	prevTime     time.Time
}

// NewMonitorService crea una instancia lista para usarse.
// Úsala en lugar de &MonitorService{} para que el mapa quede inicializado.
func NewMonitorService() *MonitorService {
	return &MonitorService{
		prevCounters: make(map[string]net.IOCountersStat),
	}
}

func (m *MonitorService) GetCpuPerc() ([]float64, error) {
	return cpu.Percent(0, false)
}

func (m *MonitorService) GetDiskUsage() (*disk.UsageStat, error) {
	return disk.Usage("/")
}

func (m *MonitorService) GetRamUsage() (*mem.VirtualMemoryStat, error) {
	v, err := mem.VirtualMemory()
	return v, err
}

// GetNetworkData devuelve los contadores crudos (acumulativos) por interfaz.
// Se mantiene por si la necesitas para otros fines (totales históricos, etc).
func (m *MonitorService) GetNetworkData() ([]net.IOCountersStat, error) {
	counters, err := net.IOCounters(true) // true = por interfaz, false = total
	if err != nil {
		return nil, err
	}

	return counters, nil
}

// GetNetworkSpeed devuelve la velocidad de red (bytes/segundo) por interfaz,
// calculada como delta entre esta lectura y la anterior.
// En la primera llamada devuelve una lista vacía, ya que no hay lectura previa
// con la cual calcular el delta.
func (m *MonitorService) GetNetworkSpeed() ([]NetSpeed, error) {
	counters, err := net.IOCounters(true)
	if err != nil {
		return nil, err
	}

	m.mu.Lock()
	defer m.mu.Unlock()

	now := time.Now()
	speeds := make([]NetSpeed, 0, len(counters))

	// Primera lectura: solo guardamos el estado inicial, sin delta.
	if m.prevTime.IsZero() {
		m.prevTime = now
		for _, c := range counters {
			m.prevCounters[c.Name] = c
		}
		return speeds, nil
	}

	elapsed := now.Sub(m.prevTime).Seconds()
	if elapsed <= 0 {
		elapsed = 1 // evita división por cero si el reloj no avanzó
	}

	seen := make(map[string]bool, len(counters))

	for _, c := range counters {
		seen[c.Name] = true

		prev, ok := m.prevCounters[c.Name]
		if !ok {
			// Interfaz nueva que no estaba en la lectura anterior
			m.prevCounters[c.Name] = c
			continue
		}

		// Protección contra overflow/reset de contadores
		// (interfaz reiniciada, sistema reiniciado, etc)
		var sentDiff, recvDiff uint64
		if c.BytesSent >= prev.BytesSent {
			sentDiff = c.BytesSent - prev.BytesSent
		}
		if c.BytesRecv >= prev.BytesRecv {
			recvDiff = c.BytesRecv - prev.BytesRecv
		}

		speeds = append(speeds, NetSpeed{
			Name:    c.Name,
			SentBps: float64(sentDiff) / elapsed,
			RecvBps: float64(recvDiff) / elapsed,
		})

		m.prevCounters[c.Name] = c
	}

	// Limpia interfaces que ya no aparecen (ej. VPN desconectada)
	for name := range m.prevCounters {
		if !seen[name] {
			delete(m.prevCounters, name)
		}
	}

	m.prevTime = now
	return speeds, nil
}
