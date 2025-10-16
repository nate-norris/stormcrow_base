//! # lib
//! 
//! Initialization of Tauri setup
//! 
//! State is managed through marker structs in order to allow async startup
//! 
use std::sync::Arc;
use tokio::sync::Mutex;
use tauri::Manager; // for app.state::<T>()

mod commands;
mod lib_sqlx;
use commands::greet;
use lib_sqlx::{init_db, DbPool, get_users_command};

// Marker structs for Tauri State
struct DbState(Arc<Mutex<Option<DbPool>>>);

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {

    tauri::Builder::default()
        //placeholder states provided synchronously
        .manage(DbState(Arc::new(Mutex::new(None))))
        .setup(|app| {
            // shared database pool
            {
                let db_state = app.state::<DbState>().0.clone();
                tauri::async_runtime::spawn(async move {
                    let pool = init_db().await.unwrap();
                    let mut lock = db_state.lock().await;
                    *lock = Some(pool);
                });
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            get_users_command
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
