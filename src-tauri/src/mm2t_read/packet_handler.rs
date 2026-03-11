
use tauri::{AppHandle, Emitter};
use utils::mm2t::DecodedPacket;
use utils::logger;
use super::models::WeatherData;

const PACKET_BOOM: u8 = 0x42;
const PACKET_WEATHER: u8 = 0x57;

pub(crate) fn handle_packet(packet: DecodedPacket, app_handle: &AppHandle) {
    match packet.packet_type {
        PACKET_BOOM => handle_boom(app_handle),
        PACKET_WEATHER => handle_weather(&packet.payload, app_handle),
        _ => logger::error("MM2T incorrect packet type identified"),
    }
}

fn handle_boom(handle: &AppHandle) {
    if let Err(e) = handle.emit("boom", ()) {
        logger::error_with("Boom packet: failed event emit", e);
    }
}

fn handle_weather(payload: &[u8], handle: &AppHandle) {
    match WeatherData::from_payload(payload) {
        Ok(weather_data) => {
            if let Err(e) = handle.emit("weather", &weather_data) {
                logger::error_with("Weather packet: failed emit event", e);
            }
        },
        Err(e) => logger::error_with("Weather packet: failed ", e),
    }
}