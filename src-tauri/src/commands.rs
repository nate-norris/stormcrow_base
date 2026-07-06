//! Define tauri commands that are available outside of any specific module/file
//! 
use crate::t_state::{DbState, SpeakerState};
use crate::lib_sqlx::{QEDeleteSite, QEBase, QEEntry, TestSession, Test, 
    WindWarningConfig, WeatherRow, 
    delete_qe_site, delete_qe, delete_test, get_last_test, get_tests, 
    initiate_test, get_test_qes, insert_new_qe, update_configuration, 
    reassign_qe, export_test_qes};
use utils::speaker::SpeakerNotification;

#[tauri::command]
pub async fn initiate_test_command_deprc(state: tauri::State<'_, DbState>, name: String) -> 
    Result<TestSession, String> {

    let pool = state.0.as_ref();
    let result: TestSession = initiate_test(pool, &name)
        .await
        .map_err(|_| "Failed to initiate the test".to_string())?;

    Ok(result)
}

#[tauri::command]
pub async fn initiate_test_command(
    state: tauri::State<'_, DbState>,
    name: String
) -> Result<TestSession, String> {

    let pool = state.0.as_ref();

    let result = initiate_test(pool, &name).await;

    match result {
        Ok(v) => Ok(v),
        Err(e) => {
            println!("INITIATE TEST FAILED: {:?}", e);
            Err(e.to_string())
        }
    }
}

#[tauri::command]
pub async fn get_last_test_command(state: tauri::State<'_, DbState>) ->
    Result<Option<Test>, String> {
    let pool = state.0.as_ref();

    get_last_test(pool).await
        .map_err(|_| "Failed to retrieve the last test".to_string())
}

#[tauri::command]
pub async fn get_tests_command(state: tauri::State<'_, DbState>) ->
    Result<Vec<Test>, String> {
    let pool = state.0.as_ref();
    get_tests(pool).await
        .map_err(|_| "Failed to get all tests".to_string())
}

#[tauri::command]
pub async fn delete_test_command(state: tauri::State<'_, DbState>, name: String) ->
    Result<(), String> {
    let pool = state.0.as_ref();
    delete_test(pool, &name).await
        .map_err(|_| "Failed to delete the test".to_string())
}

#[tauri::command]
pub async fn update_configuration_command(state: tauri::State<'_, DbState>, config: WindWarningConfig)
    -> Result<(), String> {

    let pool = state.0.as_ref();
    update_configuration(pool, config)
        .await
        .map_err(|_| "Failed to update configuration".to_string())
}

#[tauri::command]
pub async fn get_test_qes_command(state: tauri::State<'_, DbState>, test_id: i64) ->
    Result<Vec<WeatherRow>, String> {
    let pool = state.0.as_ref();
    get_test_qes(pool, test_id).await
        .map_err(|_| "Failed to retrieve test QEs".to_string())
}

#[tauri::command]
pub async fn delete_qe_site_command(state: tauri::State<'_, DbState>, qe_site: QEDeleteSite)
    -> Result<(), String> {
    let pool = state.0.as_ref();
    delete_qe_site(pool, qe_site)
        .await
        .map_err(|_| "Failed to delete QE".to_string())
}

#[tauri::command]
pub async fn delete_qe_command(state: tauri::State<'_, DbState>, base: QEBase)
    -> Result<(), String> {
    let pool = state.0.as_ref();
    delete_qe(pool, base)
        .await
        .map_err(|_| "Failed to delete QE".to_string())
}

#[tauri::command]
pub async fn insert_new_qe_command(state: tauri::State<'_, DbState>, new_qe: QEEntry)
    -> Result<Vec<WeatherRow>, String> {
    let pool = state.0.as_ref();
    insert_new_qe(pool, new_qe)
        .await
        .map_err(|_| "Failed to insert QE".to_string())
}

#[tauri::command]
pub async fn reassign_qe_command(state: tauri::State<'_, DbState>, 
    source: QEBase, destination: QEBase)
    -> Result<Vec<WeatherRow>, String> {
    let pool = state.0.as_ref();
    reassign_qe(pool, source, destination)
        .await
        .map_err(|_| "Failed to reassign QE".to_string())
}

#[tauri::command]
pub async fn speaker_command(state: tauri::State<'_, SpeakerState>, 
    notification: SpeakerNotification) -> Result<(), String> {
    let tx = state.0.as_ref();
    tx.send(notification)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn export_test_to_path_command(state: tauri::State<'_, DbState>, 
    test_id: i64, path: String) -> Result<(), String> {
    let pool = state.0.as_ref();
    export_test_qes(pool, test_id, path)
        .await 
        .map_err(|_| "Failed to export test data".to_string()) 
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