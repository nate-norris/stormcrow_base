//! all return Result<T, sqlx::Error>
//! DDL (CREATE, ALTER, DROP) → use sqlx::query(...).execute(pool).await.
//! DML (SELECT, INSERT, UPDATE) → use query_as! or query! when possible for compile-time checks.

// use sqlx::{Executor, Sqlite, Transaction};
// use super::schema::DbPool;

// use super::{DbExec, NewTest, Test};
use super::{DbExec, Test, NewTest};

#[allow(dead_code)]
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

// pub(crate) async fn get_tests<E: DbExec>(executor: E) ->
//     Result<Vec<Test>, sqlx::Error> {
//     let tests: Vec<Test> = sqlx::query_as!(
//         Test,
//         "SELECT id, name, time FROM tests"
//     )
//     .fetch_all(executor)
//     .await?;

//     Ok(tests)
// }


// pub async fn insert_test(tx: &mut sqlx::Transaction<'static, DbPool>, 
// 	new_test: &NewTest) -> Result<Option<Test>, sqlx::Error> {
// // pub(crate) async fn insert_test(_tx: &mut Transaction<'_, DbPool>, new_test: &NewTest) 
// //     -> Result<Test, sqlx::Error> {

//     if let Some(t) = Test {
//         id: 1,
//         name: new_test.name,
//         time: new_test.time
//     }
//     Ok(t)
// }
//ATTEMPT 3
// pub(crate) async fn insert_test3<'e, E>(
//     executor: E,
//     new_test: &NewTest
// ) -> Result<Test, sqlx::Error>
// where
//     E: Executor<'e, Database = Sqlite>,
// {
//     sqlx::query_as!(
//         Test,
//         r#"
//         INSERT INTO tests (name, time)
//         VALUES (?, ?)
//         RETURNING id, name, time
//         "#,
//         new_test.name,
//         new_test.time
//     )
//     .fetch_one(executor)
//     .await
// }


// ATEMPT 2
// pub(crate) async fn insert_test<E>(executor: E, new_test: &NewTest) -> 
// 	Result<Test, sqlx::Error> 
//     where for <'e> E: DbExec<'e> {
//     sqlx::query_as!(
//         Test,
//         r#"
//         INSERT INTO tests (name, time)
//         VALUES (?, ?)
//         RETURNING id, name, time
//         "#,
//         new_test.name,
//         new_test.time
//     )
//     .fetch_one(executor)
//     .await
// }


// ATTEMPT 1
#[allow(dead_code)]
pub(crate) async fn insert_test<'e, E>(executor: E, new_test: &NewTest) -> 
	Result<Test, sqlx::Error> 
    where E: DbExec<'e> {
    println!("inserting test");
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


// ORIGINAL 
// pub(crate) async fn insert_test<E: DbExec>(executor: E, new_test: &NewTest) -> 
// 	Result<Test, sqlx::Error> {
//     sqlx::query_as!(
//         Test,
//         r#"
//         INSERT INTO tests (name, time)
//         VALUES (?, ?)
//         RETURNING id, name, time
//         "#,
//         new_test.name,
//         new_test.time
//     )
//     .fetch_one(executor)
//     .await
// }

// pub(crate) async fn get_last_test_name<E: DbExec>(executor: E) ->
//     Result<Option<&str>, sqlx::Error> {
//     sqlx::query_as!("Select last_test_name FROM last_test WHERE id = 1")
//     .fetch_optional(executor)
//     .await
// }



// pub(crate) async fn update_last_test<E: DbExec>(executor: E, test_name: &str) ->
// 	Result<(), sqlx::Error> {
pub(crate) async fn update_last_test<'e, E>(executor: E, test_name: &str) ->
	Result<(), sqlx::Error> 
    where E: DbExec<'e> {

	sqlx::query("UPDATE last_test SET last_test_name = ?")
	.bind(test_name)
	.execute(executor)
	.await?;
	Ok(())
}