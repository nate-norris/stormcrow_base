//! Marker structs for Tauri State
//! 

use std::sync::Arc;

use crate::lib_sqlx::DbPool;
use utils::speaker::SpeakerTx;

// database state
pub struct DbState(pub Arc<DbPool>);

pub struct SpeakerState(pub Arc<SpeakerTx>);
