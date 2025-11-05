//! Define tauri commands that are available outside of any specific module/file
//! 

use crate::t_state::DbState;
use crate::lib_sqlx::{initiate_test, get_last_test, get_tests, delete_test, 
    update_configuration, delete_qe_site, Test, TestConfiguration, QESite};

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
pub async fn delete_qe_site_command(state: tauri::State<'_, DbState>, qe_site: QESite)
    -> Result<(), String> {
    let pool = state.0.as_ref();
    delete_qe_site(pool, qe_site)
        .await
        .map_err(|e: sqlx::Error| e.to_string())
}
// delete qe specific site
// delete qe


// weather actions -----------------------------
// getTestWeatherData for display on table load or export to csv
// updateWeatherQe as in reassign
// insert weather data (or insert QE).... each site will have its own data so array of weather sites. will also need dodic/lot/etc
// deleteQe ... no longer needed