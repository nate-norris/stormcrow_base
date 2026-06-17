import type { WeatherRow } from "./weatherRow";

type RowBase = Pick<WeatherRow, "dodic" | "lot" | "siteId" | "windFull" | "windDirection" | "temp" | "humidity" | "baro" | "time">;
export type QETableRow = RowBase & {
    id: string;
    qeKey: string;
};