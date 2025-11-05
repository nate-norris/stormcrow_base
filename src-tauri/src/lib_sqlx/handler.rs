//! Define tauri commands that are available for this module.
//! returns Result<T, sqlx::Error>
//! 
use chrono::{Utc};

use super::models::{NewTest, Test, TestConfiguration, QESite};//, VelocityType, DegreesCircle, Percent};
use super::schema::DbPool;
use crate::lib_sqlx::q_tests;
use crate::lib_sqlx::q_configs;
use crate::lib_sqlx::q_qe;


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
            q_tests::update_last_test(pool, Some(&existing.name)).await?;
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
    q_tests::update_last_test(&mut *tx, Some(&test.name)).await?;
    //finalize transaction
    tx.commit().await?;
    
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


pub async fn delete_test(pool: &DbPool, name: &str) -> Result<(), sqlx::Error> {

    if let Some(existing) = q_tests::get_test_by_name(pool, name).await? {

        // initiate transaction for all queries executed simultaneous
        let mut tx = pool.begin().await?;

        // wipe last test if it is for this current test
        if let Some(last) = q_tests::get_last_test_name(pool)
            .await? {
            if last == name {
                q_tests::update_last_test(&mut *tx, None)
                    .await?;
            }
        }
        
        //remove test configuration
        q_configs::delete_config_by_id(&mut *tx, existing.id).await?;
        // remove qe weather
        q_qe::delete_test_qes(&mut *tx, existing.id).await?;
        //remove test
        q_tests::delete_test_by_id(&mut *tx, existing.id).await?;
        //finalize transaction
        tx.commit().await?;
    }
    Ok(())
}


pub async fn update_configuration(pool: &DbPool, config: TestConfiguration) ->
    Result<(), sqlx::Error> {
    q_configs::update_test_config(pool, config).await
}

pub async fn delete_qe_site(pool: &DbPool, qe_site: QESite) ->
    Result<(), sqlx::Error> {
    q_qe::delete_qe_site(pool, qe_site).await
}