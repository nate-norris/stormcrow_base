//! Marker structs for Tauri State
//! 

use std::sync::Arc;

use crate::lib_sqlx::DbPool;
// use crate::lib_mm2t::MM2TTx;

// database state
pub struct DbState(pub Arc<DbPool>);

// mm2t serial state
// pub struct MM2TState {
//     pub writer_tx: MM2TTx,         // send data from client
// }


