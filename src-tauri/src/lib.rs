//! # lib
//! crate root
//! 
//! Initialization of Tauri setup
//! 
//! State is managed through marker structs in order to allow async startup
//! 
use std::sync::Arc;
use crate::lib_sqlx::DbPool;

mod commands;
mod lib_sqlx;
mod t_state;

use t_state::DbState;
use lib_sqlx::init_db;
use commands::{greet, get_users_command,
    initiate_test_command, get_last_test_command, get_tests_command, 
    delete_test_command, update_configuration_command};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {

    let pool: DbPool = tauri::async_runtime::block_on(init_db())
        .expect("Failed to init database");

    tauri::Builder::default()
        //placeholder states provided synchronously
        .manage(DbState(Arc::new(pool)))
        .setup(|_app| {
            // shared database pool
            {
                // build db syncrhonously
                // let pool = tauri::async_runtime::block_on(init_db()).unwrap();
                // app.manage(DbState(Arc::new(Some(pool))));

                //ERROR
                // tauri::async_runtime::spawn(async move {
                //     let pool = init_db().await.unwrap();
                //     app.manage(DbState(Arc::new(Some(pool))));

                // });

                // DOESNT WORK WITHOUT MUTEX
                // let db_state = app.state::<DbState>().0.clone();
                // tauri::async_runtime::spawn(async move {
                //     let pool = init_db().await.unwrap();
                //     let mut lock = db_state.lock().await;
                //     *lock = Some(pool);
                // });
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            get_users_command,
            initiate_test_command,
            get_last_test_command,
            get_tests_command,
            delete_test_command,
            update_configuration_command
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
