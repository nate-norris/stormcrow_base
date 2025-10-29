//! Define tauri commands that are available outside of any specific module/file
//! 

use crate::t_state::DbState;
use crate::lib_sqlx::{initiate_test, Test, TestConfiguration};

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