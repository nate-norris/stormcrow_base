//! Define tauri commands that are available outside of any specific module/file
//! 
use crate::t_state::{DbState, SpeakerState};
use crate::lib_sqlx::{QEDeleteSite, QEBase, QEEntry, Test, TestConfiguration, WeatherRow, 
    delete_qe_site, delete_test, get_last_test, get_tests, initiate_test, 
    get_test_qes, insert_new_qe, update_configuration, reassign_qe};
use utils::speaker::SpeakerNotification;

#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
pub async fn get_users_command() -> Vec<String> {
    // Pretend this is a SQLx query — simplified
    vec!["Alice".into(), "Bob".into(), "Charlie".into()]
}

#[tauri::command]
pub async fn initiate_test_command(state: tauri::State<'_, DbState>, name: String) -> 
    Result<(Test, TestConfiguration), String> {

    let pool = state.0.as_ref();
    let result: (Test, TestConfiguration) = initiate_test(pool, &name)
        .await
        .map_err(|e| e.to_string())?;

    Ok(result)
}

#[tauri::command]
pub async fn get_last_test_command(state: tauri::State<'_, DbState>) ->
    Result<Option<Test>, String> {
    let pool = state.0.as_ref();

    get_last_test(pool).await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_tests_command(state: tauri::State<'_, DbState>) ->
    Result<Vec<Test>, String> {
    let pool = state.0.as_ref();
    get_tests(pool).await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn delete_test_command(state: tauri::State<'_, DbState>, name: String) ->
    Result<(), String> {
    let pool = state.0.as_ref();
    delete_test(pool, &name).await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_configuration_command(state: tauri::State<'_, DbState>, config: TestConfiguration)
    -> Result<(), String> {

    let pool = state.0.as_ref();
    update_configuration(pool, config)
        .await
        .map_err(|e: sqlx::Error| e.to_string())
}

#[tauri::command]
pub async fn get_test_qes_command(state: tauri::State<'_, DbState>, test_id: i64) ->
    Result<Vec<WeatherRow>, String> {
    let pool = state.0.as_ref();
    get_test_qes(pool, test_id).await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn delete_qe_site_command(state: tauri::State<'_, DbState>, qe_site: QEDeleteSite)
    -> Result<(), String> {
    let pool = state.0.as_ref();
    delete_qe_site(pool, qe_site)
        .await
        .map_err(|e: sqlx::Error| e.to_string())
}

#[tauri::command]
pub async fn insert_new_qe_command(state: tauri::State<'_, DbState>, new_qe: QEEntry)
    -> Result<Vec<WeatherRow>, String> {
    let pool = state.0.as_ref();
    insert_new_qe(pool, new_qe)
        .await
        .map_err(|e: sqlx::Error| e.to_string())
}

#[tauri::command]
pub async fn reassign_qe_command(state: tauri::State<'_, DbState>, 
    source: QEBase, destination: QEBase)
    -> Result<Vec<WeatherRow>, String> {
    let pool = state.0.as_ref();
    reassign_qe(pool, source, destination)
        .await
        .map_err(|e: sqlx::Error| e.to_string())
}

#[tauri::command]
pub async fn speaker_boom_command(state: tauri::State<'_, SpeakerState>)
    -> Result<(), String> {
    let tx = state.0.as_ref();
    tx.send(SpeakerNotification::Boom)
        .await
        .map_err(|e| e.to_string())
}


#[allow(dead_code)]
#[tauri::command]
pub async fn speaker_command(state: tauri::State<'_, SpeakerState>, 
    notification: SpeakerNotification) -> Result<(), String> {
    let tx = state.0.as_ref();
    tx.send(notification)
        .await
        .map_err(|e| e.to_string())
}

// #[tauri::command]
// pub async fn next_radio_packet(state: State<'_, SerialState>)
//     -> Result<Vec<u8>, String>
// {
    
//     /*
//     import { listen } from "@tauri-apps/api/event";

// useEffect(() => {
//   const unlisten = listen("radio-packet", (event) => {
//     const packet = event.payload;
//     console.log("Radio packet:", packet);
//   });

//   return () => { unlisten.then(fn => fn()); };
// }, []);
//      */
//     let mut rx = state.packet_rx.lock().await;
//     match rx.recv().await {
//         Some(packet) => Ok(packet),
//         None => Err("radio closed".into()),
//     }
// }
//app_handle.emit_all("radio-packet", packet).unwrap();
// ALTERNATIVE TO NEXT_RADIO_PACKET??