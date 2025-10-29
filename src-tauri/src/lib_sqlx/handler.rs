//! Define tauri commands that are available for this module.
//! returns Result<T, sqlx::Error>
//! 

use chrono::{Utc};

use super::models::{NewTest, Test, TestConfiguration};//, VelocityType, DegreesCircle, Percent};
use super::schema::DbPool;
use crate::lib_sqlx::q_tests;
use crate::lib_sqlx::q_configs;


pub async fn initiate_test(pool: &DbPool, name: &str) -> 
    Result<(Test, TestConfiguration), sqlx::Error> {
    
    // test reference
    let new_test: NewTest = NewTest {
        name: name.to_string(),
        time: Utc::now().timestamp(),
    };

    //returns existing test and configs if already created
    if let Some(existing) = q_tests::get_test_by_name(pool, &new_test.name).await? {
        if let Some(config) = q_configs::get_test_config_by_id(pool, existing.id).await? {
            q_tests::update_last_test(pool, &existing.name).await?;
            println!("returning existing");
            return Ok((existing, config));
        }
    }

    // test name not entered insert into db
    // initiate transaction for all queries executed simultaneous
    let mut tx = pool.begin().await?;
    // insert and retrieve the Test
    let test = q_tests::insert_test(&mut *tx, &new_test).await?;
    // insert and retrieve the TestConfiguration
    let config = q_configs::insert_default_test_config(
        &mut *tx, test.id).await?;
    // update last test active
    q_tests::update_last_test(&mut *tx, &test.name).await?;
    //finalize transaction
    tx.commit().await?;
    println!("making new one");
    
    Ok((test, config))
}


pub async fn get_last_test(pool: &DbPool) -> Result<Option<Test>, sqlx::Error> {

    if let Some(name) = q_tests::get_last_test_name(pool).await? {
        // will unwrap since test must exist if was used last
        let test = q_tests::get_test_by_name(pool, &name).await?.unwrap();
        Ok(Some(test))
    } else {
        Ok(None)
    }
}

pub async fn get_tests(pool: &DbPool) -> Result<Vec<Test>, sqlx::Error> {
    q_tests::get_tests(pool).await
}


// #[tauri::command]
// pub async fn retrieve_tests(pool: tauri::State<'_, DbPool>) ->
//     DbResponse<Vec<Test>> {
//     DbResponse::Ok(try_resp!(q_tests::get_tests(&pool).await))
// }