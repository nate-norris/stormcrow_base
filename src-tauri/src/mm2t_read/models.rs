use tauri::{AppHandle, Emitter};
use utils::mm2t::{DecodedPacket, WeatherPayload};
use utils::logger;

const PACKET_BOOM: u8 = 0x42;
const PACKET_WEATHER: u8 = 0x57;
pub(crate) enum PacketKind {
    Boom,
    Weather(WeatherPayload),
}
impl PacketKind {
    pub(crate) fn from_decode(packet: DecodedPacket) -> anyhow::Result<Self> {
        match packet.packet_type {
            PACKET_BOOM => Ok(PacketKind::Boom),
            PACKET_WEATHER => {
                let data = match WeatherPayload::decode_from(&packet.payload) {
                    Ok(d) => d,
                    Err(e) => {
                        logger::error_with("Weather packet decode", &e);
                        return Err(e.into());
                    }
                };

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
                let m = format!("MM2T handle: weather packet {:?}", data);
                logger::info(m);
                app.emit("weather", &data)?;
            }
        }

        Ok(())
    }
}