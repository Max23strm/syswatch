export const intervalTimer = 2000

// Convierte los bytes a GB
// @param = number
export const bytesToGB = (b : number) : string => {
    return (b / (1024 * 1024 * 1024)).toFixed(2)
}

export const formatSpeed = (bytesPerSec: number): {speed: string, format: 'B/s' | 'KB/s' | 'MB/s'} => {
    return {
        speed: bytesPerSec < 1024 ? bytesPerSec.toFixed(0) : (bytesPerSec < 1024 * 1024) ? (bytesPerSec / 1024).toFixed(1) : (bytesPerSec / (1024 * 1024)).toFixed(1),
        format: bytesPerSec < 1024 ? 'B/s' : (bytesPerSec < 1024 * 1024) ? 'KB/s' : 'MB/s',
    }
}