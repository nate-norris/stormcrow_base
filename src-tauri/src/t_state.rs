use std::sync::Arc;
use crate::lib_sqlx::DbPool;

// Marker structs for Tauri State
pub struct DbState(pub Arc<DbPool>);