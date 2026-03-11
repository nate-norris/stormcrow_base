
export interface WeatherObservation {
    site_id: string,
    time: Date,
    altitude: number,
    wind_full: number,
    wind_dir: number,
    cross: number,
    tail: number,
    temp: number,
    humidity: number,
    baro: number
}