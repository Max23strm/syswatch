import type { MonitorStates } from "../types"

export const intervalTimer = 2000

// Convierte los bytes a GB
// @param = 0
export const bytesToGB = (b : number) : string => {
    return (b / (1024 * 1024 * 1024)).toFixed(2)
}

export const formatSpeed = (bytesPerSec: number): {speed: string, format: 'B/s' | 'KB/s' | 'MB/s'} => {
    return {
        speed: bytesPerSec < 1024 ? bytesPerSec.toFixed(0) : (bytesPerSec < 1024 * 1024) ? (bytesPerSec / 1024).toFixed(1) : (bytesPerSec / (1024 * 1024)).toFixed(1),
        format: bytesPerSec < 1024 ? 'B/s' : (bytesPerSec < 1024 * 1024) ? 'KB/s' : 'MB/s',
    }
}

export const defatulMonitorState: MonitorStates =  {
    cpuPerc: 0,
    disk: {
        free: 0,
        used: 0,
        total: 0,
        usedPercent: 0,
        path: "",
        fstype: "",
        inodesTotal: 0,
        inodesUsed: 0,
        inodesFree: 0,
        inodesUsedPercent: 0,
    },
    ram: {
        total: 0,
        available: 0,
        used: 0,
        usedPercent: 0,
        free: 0,
        active: 0,
        inactive: 0,
        wired: 0,
        laundry: 0,
        buffers: 0,
        cached: 0,
        writeBack: 0,
        dirty: 0,
        writeBackTmp: 0,
        shared: 0,
        slab: 0,
        sreclaimable: 0,
        sunreclaim: 0,
        pageTables: 0,
        swapCached: 0,
        commitLimit: 0,
        committedAS: 0,
        highTotal: 0,
        highFree: 0,
        lowTotal: 0,
        lowFree: 0,
        swapTotal: 0,
        swapFree: 0,
        mapped: 0,
        vmallocTotal: 0,
        vmallocUsed: 0,
        vmallocChunk: 0,
        hugePagesTotal: 0,
        hugePagesFree: 0,
        hugePagesRsvd: 0,
        hugePagesSurp: 0,
        hugePageSize: 0,
        anonHugePages: 0,
    },
    netSpeed: []
}