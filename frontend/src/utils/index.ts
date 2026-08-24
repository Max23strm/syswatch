export const intervalTimer = 2000

// Convierte los bytes a GB
// @param = number
export const bytesToGB = (b : number) : string => {
    return (b / (1024 * 1024 * 1024)).toFixed(2)
}