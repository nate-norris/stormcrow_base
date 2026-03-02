use tauri::AppHandle;
use utils::logger;
use utils::speaker::{SpeakerTx, SpeakerNotification};
use utils::mm2t::{MM2TTransport, PacketDecoder};
use super::packet_handler::handle_packet;

pub async fn init_mm2t(speaker_tx: &SpeakerTx) -> Option<MM2TTransport> {
    match MM2TTransport::start("/dev/ttyUSB0").await {
        Ok(r) => Some(r),
        Err(e) => {
            logger::error_with("Failed mm2t init", e);
            let _ = speaker_tx.send(SpeakerNotification::RadioError).await;
            None
        }
    }
}

pub fn spawn_mm2t_read(mm2t: MM2TTransport, app_handle: AppHandle, 
    speaker_tx: &SpeakerTx) {
    tauri::async_runtime::spawn(async move {
        let mut decoder = PacketDecoder::new();
        loop {
            match mm2t.read().await {
                Ok(Some(byte)) => {
                    match decoder.push(byte) {
                        Ok(Some(packet)) => handle_packet(packet, &app_handle),
                        Ok(None) => {},
                        Err(e) => {
                            logger::error(&format!("Packet decode error: {}", e));
                        }
                    }
                },
                Ok(None) => { 
                    tauri::async_runtime::sleep(std::time::Duration::from_millis(1)).await;
                    continue;
                },
                Err(e) => {
                    logger::error_with("MM2T Read: error reading bytes {}", e);
                    let _ = speaker_tx.send(SpeakerNotification::RadioError)
                        .await;
                    break
                },
            }
        }
    });
}

#[allow(dead_code)]
pub fn spawn_mm2t_read_mult(mm2t: MM2TTransport) {
    tauri::async_runtime::spawn(async move {
        loop {
            let chunk = mm2t.read_many(64).await.unwrap_or_else(|e| {
                eprintln!("Read error: {:?}", e);
                vec![]
            });
            if !chunk.is_empty() {
                for b in &chunk {
                    print!("{} ", b);
                }
                println!();
            }
        }
    });
}