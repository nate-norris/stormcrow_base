
use tauri::AppHandle;
use utils::mm2t::DecodedPacket;
use utils::logger;
use super::models::PacketKind;

pub(crate) fn handle_packet(packet: DecodedPacket, app_handle: &AppHandle) {
    match PacketKind::from_decode(packet) {
        Ok(kind) => {
            if let Err(e) = kind.handle(app_handle) {
                logger::error_with("Packet emit failure", e);
            }
        }
        Err(e) => logger::error_with("Packet decode error", e)
    }
}