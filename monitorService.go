package main

import (
	"github.com/shirou/gopsutil/v4/cpu"
	"github.com/shirou/gopsutil/v4/disk"
	"github.com/shirou/gopsutil/v4/mem"
	"github.com/shirou/gopsutil/v4/net"
)

type MonitorService struct{}

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

func (m *MonitorService) GetNetworkData() ([]net.IOCountersStat, error) {
	counters, err := net.IOCounters(true) // true = por interfaz, false = total

	if err != nil {
		return nil, err
	}

	return counters, nil
}
