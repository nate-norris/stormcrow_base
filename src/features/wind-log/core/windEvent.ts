// TODO: possibly translate this to accept the highest of cross or headtail so it is clearer when thresholds are passed
// structure for past log of wind values
export type WindEvent = {
    time: number,
    windFull: number
}