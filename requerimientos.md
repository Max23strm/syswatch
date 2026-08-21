# Monitor de Recursos del Sistema — Plan de Proyecto

**Producto:** SysWatch (nombre provisional)
**Stack:** Go + Wails v2 + React (o Svelte) + Recharts/Chart.js
**Tipo de proyecto:** Portafolio personal — herramienta de escritorio multiplataforma

---

## 1. Resumen Ejecutivo

SysWatch es una aplicación de escritorio ligera que monitorea en tiempo real el uso de CPU, memoria RAM, disco y red del sistema, mostrando gráficos animados y permitiendo configurar alertas personalizadas cuando algún recurso supera un umbral definido por el usuario.

**Objetivo del proyecto:** Demostrar dominio de Go (concurrencia, acceso a APIs del sistema operativo), integración frontend-backend vía Wails, diseño de UI en tiempo real, y buenas prácticas de arquitectura de software — todo empaquetado en una herramienta visualmente atractiva para un portafolio.

---

## 2. Objetivos y Alcance

### 2.1 Objetivos del producto
- Visualizar en tiempo real el consumo de CPU, RAM, disco y red.
- Listar y gestionar procesos activos (ver, ordenar, finalizar procesos).
- Configurar alertas por umbral (ej. "notificarme si CPU > 90% por más de 30s").
- Persistir historial de uso para ver tendencias (últimas 24h).
- Funcionar en Windows, macOS y Linux sin cambios de código.

### 2.2 Fuera de alcance (v1)
- Monitoreo remoto de otras máquinas (solo local).
- Perfiles de usuario múltiples o sincronización en la nube.
- Monitoreo de GPU (se puede evaluar para v2).

---

## 3. Requerimientos Funcionales

| ID | Requerimiento | Prioridad |
|----|---------------|-----------|
| RF-01 | El sistema debe mostrar el % de uso de CPU actualizado cada 1-2 segundos | Alta |
| RF-02 | El sistema debe mostrar uso de RAM (usada/total/disponible) | Alta |
| RF-03 | El sistema debe mostrar uso de disco por partición | Alta |
| RF-04 | El sistema debe mostrar tráfico de red (subida/bajada en tiempo real) | Alta |
| RF-05 | El sistema debe listar procesos activos con PID, nombre, % CPU, % RAM | Alta |
| RF-06 | El usuario debe poder finalizar (kill) un proceso desde la UI | Media |
| RF-07 | El usuario debe poder ordenar la lista de procesos por cualquier columna | Media |
| RF-08 | El usuario debe poder configurar umbrales de alerta por recurso | Alta |
| RF-09 | El sistema debe enviar una notificación nativa del SO al superar un umbral | Alta |
| RF-10 | El sistema debe guardar historial de métricas para graficar tendencias | Media |
| RF-11 | El usuario debe poder exportar el historial a CSV | Baja |
| RF-12 | El sistema debe permitir cambiar el intervalo de refresco (1s, 2s, 5s) | Baja |

## 4. Requerimientos No Funcionales

| ID | Requerimiento | Detalle |
|----|---------------|---------|
| RNF-01 | Rendimiento | La app en sí no debe consumir más de ~50MB RAM ni más de 2% CPU en reposo |
| RNF-02 | Portabilidad | Debe compilar y ejecutar en Windows 10+, macOS 11+, Linux (X11/Wayland) |
| RNF-03 | Tamaño del binario | Menor a 15MB (ventaja clave frente a Electron) |
| RNF-04 | Tiempo de arranque | Menor a 1 segundo desde ejecución hasta UI interactiva |
| RNF-05 | Persistencia | Uso de SQLite embebido, sin dependencias externas |
| RNF-06 | Código | Cobertura de tests unitarios en el backend Go ≥ 60% |

---

## 5. Arquitectura Propuesta

```
syswatch/
├── backend (Go)
│   ├── main.go                 // punto de entrada Wails
│   ├── monitor/
│   │   ├── cpu.go              // lectura de métricas CPU
│   │   ├── memory.go
│   │   ├── disk.go
│   │   ├── network.go
│   │   └── process.go          // listado/kill de procesos
│   ├── alerts/
│   │   └── threshold.go        // lógica de umbrales y notificaciones
│   ├── storage/
│   │   └── sqlite.go           // persistencia de historial
│   └── app.go                  // struct principal expuesta a JS (bindings)
│
└── frontend (React + TypeScript)
    ├── src/
    │   ├── components/
    │   │   ├── CpuGauge.tsx
    │   │   ├── MemoryChart.tsx
    │   │   ├── NetworkGraph.tsx
    │   │   ├── ProcessTable.tsx
    │   │   └── AlertConfig.tsx
    │   ├── hooks/
    │   │   └── useMetricsStream.ts   // hook que consume eventos Wails
    │   └── App.tsx
    └── package.json
```

### 5.1 Librerías Go clave
- [`gopsutil`](https://github.com/shirou/gopsutil) — acceso multiplataforma a CPU, RAM, disco, red, procesos (evita escribir código específico por SO).
- `mattn/go-sqlite3` o `modernc.org/sqlite` — persistencia embebida sin CGO si se usa la segunda.
- Sistema de eventos nativo de Wails (`runtime.EventsEmit`) para push de métricas al frontend en tiempo real, en vez de polling desde JS.

### 5.2 Flujo de datos en tiempo real
1. Goroutine en Go recolecta métricas cada N segundos (ticker).
2. Go emite un evento Wails (`metrics:update`) con el payload JSON.
3. React escucha el evento vía `EventsOn` y actualiza el estado/gráficos.
4. En paralelo, cada métrica se inserta en SQLite para el historial.

Este patrón evita que el frontend tenga que hacer polling constante y aprovecha la comunicación por eventos de Wails, que es más eficiente.

---

## 6. Plan de Desarrollo por Fases

### Fase 0 — Setup (2-3 días)
- Inicializar proyecto Wails con template React + TypeScript.
- Configurar estructura de carpetas backend.
- Integrar `gopsutil` y validar lectura básica de CPU/RAM en los 3 SO (o al menos en el tuyo + CI).
- Setup de SQLite embebido.

### Fase 1 — MVP de métricas en vivo (1 semana)
- Implementar `monitor/cpu.go`, `memory.go`, `disk.go`, `network.go`.
- Emitir eventos Wails con métricas cada 1-2s.
- Frontend: gauges/gráficos básicos para CPU y RAM (sin estilos finales).
- **Entregable:** app funcional mostrando CPU y RAM en tiempo real.

### Fase 2 — Gestión de procesos (4-5 días)
- Implementar `monitor/process.go`: listar procesos, % CPU/RAM por proceso.
- Tabla en frontend con ordenamiento por columna.
- Función de "kill process" con confirmación (modal).
- **Entregable:** pestaña de procesos completamente funcional.

### Fase 3 — Alertas y notificaciones (3-4 días)
- UI de configuración de umbrales por recurso.
- Lógica en Go para evaluar umbrales en cada ciclo de métricas.
- Integración con notificaciones nativas (Wails tiene soporte via `runtime` o librería como `beeep`).
- **Entregable:** sistema de alertas configurable y funcional.

### Fase 4 — Historial y persistencia (4-5 días)
- Guardar cada muestra de métricas en SQLite.
- Vista de "tendencias" con gráfico de las últimas 24h.
- Exportación a CSV.
- **Entregable:** historial navegable + export.

### Fase 5 — Pulido de UI/UX (1 semana)
- Aplicar diseño visual consistente (dark mode recomendado para este tipo de app).
- Animaciones suaves en gráficos (transiciones, no saltos bruscos).
- Responsive dentro de la ventana (redimensionable).
- Pantalla de configuración general (intervalo de refresco, unidades).

### Fase 6 — Testing y empaquetado (4-5 días)
- Tests unitarios en Go (paquetes `monitor` y `alerts`).
- Pruebas manuales en Windows, macOS y Linux.
- Generar builds con `wails build` para las 3 plataformas.
- Firmar binarios si aplica (opcional, evita warnings de SO).

### Fase 7 — Documentación y publicación (2-3 días)
- README con GIF de demo, instrucciones de instalación y build.
- Publicar en GitHub con licencia (MIT recomendado).
- Grabar video corto (60-90s) para incluir en el portafolio.
- Opcional: publicar releases precompilados en GitHub Releases.

**Duración total estimada:** ~5-6 semanas trabajando a tiempo parcial.

---

## 7. Criterios de Éxito (para portafolio)

- [ ] App corre en al menos 2 sistemas operativos sin bugs críticos.
- [ ] Gráficos en tiempo real fluidos, sin lag perceptible.
- [ ] Código en GitHub con commits organizados (no un solo commit gigante).
- [ ] README profesional con capturas/GIF.
- [ ] Al menos un artículo o post corto (LinkedIn/dev.to) explicando decisiones técnicas — esto suma mucho en entrevistas.

---

## 8. Riesgos y Mitigaciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| `gopsutil` tiene comportamiento distinto entre SOs | Medio | Probar temprano en cada plataforma, no dejar para el final |
| Notificaciones nativas requieren permisos distintos por SO | Bajo | Investigar API específica temprano en Fase 3 |
| SQLite con CGO complica cross-compilation | Medio | Usar `modernc.org/sqlite` (pure Go, sin CGO) desde el inicio |
| Scope creep (agregar GPU, red remota, etc.) | Alto | Mantener estrictamente el alcance de v1; documentar ideas para v2 |

---

## 9. Ideas para v2 (backlog futuro)
- Monitoreo de GPU (NVIDIA/AMD).
- Modo "widget" flotante siempre visible.
- Comparación de snapshots (antes/después de abrir una app).
- Temas personalizables / plugins de terceros.

---

*Documento vivo — actualizar conforme avance el desarrollo.*