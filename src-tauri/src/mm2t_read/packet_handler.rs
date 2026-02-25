use tauri::AppHandle;
use utils::mm2t::DecodedPacket;

pub(crate) fn handle_packet(_packet: DecodedPacket, _app_handle: &AppHandle) {
    println!("I have a packet");
}