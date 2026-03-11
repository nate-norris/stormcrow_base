use tauri::{AppHandle, Emitter};
use serde::Serialize;
use utils::mm2t::DecodedPacket;

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
    fn from_payload(payload: &[u8]) -> anyhow::Result<Self> {
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

const PACKET_BOOM: u8 = 0x42;
const PACKET_WEATHER: u8 = 0x57;
pub(crate) enum PacketKind {
    Boom,
    Weather(WeatherData),
}
impl PacketKind {
    pub(crate) fn from_decode(packet: DecodedPacket) -> anyhow::Result<Self> {
        match packet.packet_type {
            PACKET_BOOM => Ok(PacketKind::Boom),
            PACKET_WEATHER => {
                let data = WeatherData::from_payload(&packet.payload)?;
                Ok(PacketKind::Weather(data))
            },
            _ => anyhow::bail!("Unknown packet type"),
        }
    }

    pub(crate) fn handle(self, app: &AppHandle) -> anyhow::Result<()> {
        match self {
            PacketKind::Boom => {
                app.emit("boom", ())?;
            },
            PacketKind::Weather(data) => {
                app.emit("weather", &data)?;
            }
        }

        Ok(())
    }
}