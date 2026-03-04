use serde::Serialize;
use tauri::{AppHandle};
use utils::mm2t::DecodedPacket;
use utils::logger;

const PACKET_BOOM: u8 = 0x42;
const PACKET_WEATHER: u8 = 0x57;

#[derive(Debug, Serialize)]
pub struct WeatherData {
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

pub(crate) fn handle_packet(packet: DecodedPacket, app_handle: &AppHandle) {
    match packet.packet_type {
        PACKET_BOOM => handle_boom(app_handle),
        PACKET_WEATHER => handle_weather(&packet.payload, app_handle),
        _ => logger::error("MM2T incorrect packet type identified"),
    }
}

fn handle_boom(_handle: &AppHandle) {
    println!("Got me a Boom!");
    //app_handle.emit("event_name", payload)?;
}

fn handle_weather(payload: &[u8], _handle: &AppHandle) {
    let data = WeatherData::from_payload(payload);
    println!("Got me some weather {:?}", data);
    //app_handle.emit("event_name", payload)?;
}