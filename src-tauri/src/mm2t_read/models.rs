use serde::Serialize;

#[derive(Debug, Serialize)]
pub(crate) struct WeatherData {
    pub site_id: u8,
    pub altitude: f32,
    pub wind_full: f32,
    pub wind_dir: f32,
    pub temp: f32,
    pub humidity: f32,
    pub baro: f32,
}
impl WeatherData {
    pub(crate) fn from_payload(payload: &[u8]) -> anyhow::Result<Self> {
        Ok(Self {
            site_id: payload[0],
            altitude: f32::from_le_bytes(payload[1..5].try_into()?),
            wind_full: f32::from_le_bytes(payload[5..9].try_into()?),
            wind_dir: f32::from_le_bytes(payload[9..13].try_into()?),
            temp: f32::from_le_bytes(payload[13..17].try_into()?),
            humidity: f32::from_le_bytes(payload[17..21].try_into()?),
            baro: f32::from_le_bytes(payload[21..25].try_into()?),
        })
    }
}