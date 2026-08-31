import type { NetSpeed } from "../../bindings/changeme"
import type { UsageStat } from "../../bindings/github.com/shirou/gopsutil/v4/disk"
import type { VirtualMemoryStat } from "../../bindings/github.com/shirou/gopsutil/v4/mem"
import type { IOCountersStat } from "../../bindings/github.com/shirou/gopsutil/v4/net"

export type MonitorStates = {
    cpuPerc: number,
    disk: UsageStat,
    ram: VirtualMemoryStat,
    netSpeed: NetSpeed[]
  }