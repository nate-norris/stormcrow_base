use tauri::AppHandle;
use utils::logger;
use utils::speaker::{SpeakerTx, SpeakerNotification};
use utils::mm2t::{MM2TTransport, PacketDecoder};
use super::packet_handler::handle_packet;

pub async fn init_mm2t(speaker_tx: &SpeakerTx) -> Option<MM2TTransport> {
    match MM2TTransport::start("/dev/ttyUSB0").await {
        Ok(r) => Some(r),
        Err(e) => {
            println!("failed mm2t init in err {}", e);
            logger::error_with("Failed mm2t init", e);
            let _ = speaker_tx.send(SpeakerNotification::RadioError).await;
            None
        }
    }
}

pub fn spawn_mm2t_read(mm2t: MM2TTransport, app_handle: AppHandle) {
    
    tauri::async_runtime::spawn(async move {
        let mut decoder = PacketDecoder::new();
        loop {
            //recieve byte
            let byte = match mm2t.read().await {
                Ok(b) => b,
                Err(_) => {
                    logger::error("Error reading mm2t byte");
                    break
                },
            };

            let packet = match decoder.push(byte) {
                Ok(Some(packet)) => packet,
                Ok(None) => continue,
                Err(e) => {
                    logger::error(&format!("Packet decode error: {}", e));
                    continue;
                }
            };
            handle_packet(packet, &app_handle);
        }
    });
}