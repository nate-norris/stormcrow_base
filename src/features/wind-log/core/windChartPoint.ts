export type WindChartPoint = {
    time: number;
    [siteId: string]: number | undefined;
};