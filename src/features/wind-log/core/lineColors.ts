function hashString(str: string): number {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    return Math.abs(hash);
}

export function getLineColor(siteId: string) {
    const hue = (hashString(siteId) % 24) * 15;

    return `hsl(${hue}, 70%, 55%)`;
}