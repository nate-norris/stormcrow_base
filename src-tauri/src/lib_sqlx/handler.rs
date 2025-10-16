//! Define tauri commands that are available for this module.
use super::queries;
use super::models;

#[tauri::command]
pub async fn initiate_test(pool: tauri::State<'_, DbPool>, name: String,) -> 
    Result<(Test, TestConfiguration), sqlx::Error> {

    // create new test for insertion
    let new_test = NewTest {
        name,
        time: chrono::Utc::now().naive_utc(),
    };
    // returns existing test and configs if already created
    if let Some(existing) = get_test_by_name(&pool, &new_test.name).await? {
        if let Some(config) = get_test_config_by_id(&pool, existing.id).await? {
            //TODO update last test
            update_last_test(&pool, existing.id).await?
            return Ok((existing, config));
        }
    }

    // test name not entered insert into db
    let mut tx = pool.begin().await?;
    let test = insert_test(&mut tx, &new_test).await?;
    let config = insert_default_test_config(&mut tx, test.id).await?;
    //TODO update last_test
    tx.commit().await?;
    Ok((test, config))
}

// test session actions
// get list of all tests for dropdown
// insert new test when user types in a unique one (and update last test)
// select a previous test that existed from a drop down list (and update last test)
// select a previous test that existed from the last test used (no last test update)
// delete a test not needed (and update last test and settings)
// update test settings configs

// weather actions
// get all weather data for putting in table/or export to csv (probably same)
// 



/// Creates a new [`Test`] record or retrieves an existing one by name.
///
/// # Arguments
/// * `pool` - The Tauri-managed [`sqlx::SqlitePool`] state used for database access.
/// * `name` - The unique name of the test to insert or retrieve.
///
/// # Returns
/// * `Ok(Test)` - The existing or newly inserted [`Test`] record.
/// * `Err(String)` - If a database or SQL error occurs, converted to a string for frontend use.
///
/// # Notes
/// - Designed to be called from the frontend via Tauri’s `invoke` API.
/// - Uses the current UTC time (`chrono::Utc::now()`) when creating a new test.
/// - Wraps the SQLx error into a string to avoid leaking database types to the frontend.
#[tauri::command]
pub async fn initiate_testOLD(pool: tauri::State<'_, sqlx::SqlitePool>, name: String)
    -> Result<models::Session, String> {
    let new_test = models::NewTest {
        name,
        time: chrono::Utc::now().naive_utc(),
    };
    
    queries::insert_test_if_not_exists(&pool, new_test)
        .await
        .map_err(|e| e.to_string())
}







// This is the "command export" that Tauri can call from the frontend.
#[tauri::command]
pub async fn get_users_command() -> Vec<String> {
    queries::get_users().await
}