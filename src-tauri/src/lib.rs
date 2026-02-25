//! # lib
//! crate root
//! 
//! Initialization of Tauri setup
//! 
//! State is managed through marker structs in order to allow async startup
//! 
//!
use std::sync::Arc;
use tokio::sync::mpsc;
use tauri::Manager;

mod commands;
mod lib_sqlx;
mod t_state;
mod mm2t_read;

use utils::logger;
use utils::speaker::{SpeakerTx, SpeakerRx, speaker_consume_task, SpeakerNotification};
use t_state::{DbState, SpeakerState};
use mm2t_read::{init_mm2t, spawn_mm2t_read};
use lib_sqlx::init_db;
use commands::{greet, get_users_command,
    initiate_test_command, get_last_test_command, get_tests_command, 
    delete_test_command, update_configuration_command, get_test_qes_command,
    delete_qe_site_command, insert_new_qe_command, reassign_qe_command};
use commands::speaker_boom_command;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    logger::info("Started stormcrow");

    let pool = tauri::async_runtime::block_on(init_db())
        .expect("Tauri: failed init database");

    tauri::Builder::default()
        //placeholder states provided synchronously
        .manage(DbState(Arc::new(pool)))
        .setup(|app| {

            let speaker_tx; // mpsc channel for speaker Sender
            // speaker setup
            {
                let (tx, rx): (SpeakerTx, SpeakerRx) = mpsc::channel(32);
                // initialize speaker mpsc Receiver channel
                tauri::async_runtime::spawn(speaker_consume_task(rx));
                // set Tauri state ref to mpsc Sender channel
                speaker_tx = Arc::new(tx);
                app.manage(SpeakerState (
                    Arc::clone(&speaker_tx)
                ));
            }
            println!("finished speaker setup");

            // mm2t radio receiver setup
            {
                let mm2t_option = tauri::async_runtime::handle().block_on(async {
                    init_mm2t(&speaker_tx).await
                });
                if let Some(mm2t) = mm2t_option {
                    spawn_mm2t_read(mm2t, app.handle().clone());
                } else {
                    logger::error("Failed mm2t init");
                    let tx_clone = Arc::clone(&speaker_tx);
                    tauri::async_runtime::spawn(async move {
                        let _ = tx_clone.send(SpeakerNotification::RadioError);
                    });
                    
                }
            }
            println!("finished mm2t setup")
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            get_users_command,
            initiate_test_command,
            get_last_test_command,
            get_tests_command,
            delete_test_command,
            update_configuration_command,
            get_test_qes_command,
            insert_new_qe_command,
            delete_qe_site_command,
            reassign_qe_command,
            speaker_boom_command
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}