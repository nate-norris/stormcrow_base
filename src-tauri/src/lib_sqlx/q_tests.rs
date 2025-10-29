//! all return Result<T, sqlx::Error>
//! DDL (CREATE, ALTER, DROP) → use sqlx::query(...).execute(pool).await.
//! DML (SELECT, INSERT, UPDATE) → use query_as! or query! when possible for compile-time checks.

use super::{DbExec, Test, NewTest};

pub(crate) async fn get_test_by_name<'e, E>(executor: E, test_name: &str) 
    -> Result<Option<Test>, sqlx::Error> 
    where E: DbExec<'e> {

    // NOTE: tell query that id and time is gauranteed to not implement Option
	sqlx::query_as!(
    	Test,
        r#"
        SELECT id as"id!", name, time as "time!"
        FROM tests WHERE name = ?
        "#,
        test_name
    )
    .fetch_optional(executor)
    .await
}

pub(crate) async fn get_tests<'e, E>(executor: E) ->
    Result<Vec<Test>, sqlx::Error> 
    where E: DbExec<'e> {
    let tests: Vec<Test> = sqlx::query_as!(
        Test,
        "SELECT id, name, time FROM tests"
    )
    .fetch_all(executor)
    .await?;

    Ok(tests)
}

pub(crate) async fn insert_test<'e, E>(executor: E, new_test: &NewTest) -> 
	Result<Test, sqlx::Error> 
    where E: DbExec<'e> {
    sqlx::query_as!(
        Test,
        r#"
        INSERT INTO tests (name, time)
        VALUES (?, ?)
        RETURNING id, name, time
        "#,
        new_test.name,
        new_test.time
    )
    .fetch_one(executor)
    .await
}

pub(crate) async fn get_last_test_name<'e, E>(executor: E) ->
    Result<Option<String>, sqlx::Error> 
    where E: DbExec<'e> {

    sqlx::query_scalar!(
        r#"
        SELECT last_test_name FROM last_test WHERE id = 1
        "#
    )
    .fetch_one(executor)
    .await
}

pub(crate) async fn update_last_test<'e, E>(executor: E, test_name: Option<&str>) ->
	Result<(), sqlx::Error> 
    where E: DbExec<'e> {

	sqlx::query("UPDATE last_test SET last_test_name = ?")
	.bind(test_name)
	.execute(executor)
	.await?;
	Ok(())
}

pub(crate) async fn delete_test_by_id<'e, E>(executor: E, test_id: i64) ->
    Result<(), sqlx::Error>
    where E: DbExec<'e> {
    sqlx::query!("DELETE FROM tests WHERE id = ?", test_id)
        .execute(executor)
        .await?;
	Ok(())
}