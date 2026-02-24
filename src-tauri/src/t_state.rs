//! Marker structs for Tauri State
//! 

use std::sync::Arc;

use crate::lib_sqlx::DbPool;
use utils::speaker::SpeakerTx;
use utils::mm2t::MM2TTransport;

// database state
pub struct DbState(pub Arc<DbPool>);

// mm2t serial state
pub struct MM2TState(pub Arc<MM2TTransport>);

pub struct SpeakerState(pub Arc<SpeakerTx>);
