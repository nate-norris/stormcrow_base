//! all return Result<T, sqlx::Error>
//! 
// use sqlx::Error;
// use crate::lib_sqlx::models::{DegreesCircle, Percent};
/*
DDL (CREATE, ALTER, DROP) → use sqlx::query(...).execute(pool).await.
DML (SELECT, INSERT, UPDATE) → use query_as! or query! when possible for compile-time checks.
*/

use super::{DbExec, TestConfiguration};

pub(crate) async fn insert_default_test_config<'e, E>(executor: E, test_id: i64) -> 
	Result<TestConfiguration, sqlx::Error> 
    where E: DbExec<'e> {

    // let gun_orient = DegreesCircle::new(0).unwrap().value() as i64; // u16
    // let tolerance = Percent::new(75).unwrap().value() as i64;       // u8
    sqlx::query_as!(
        TestConfiguration,
        r#"
        INSERT INTO test_configs
            (id, cross, cross_type, tail, tail_type, gun_orient, tolerance)
        VALUES (?, 10, 'mph', 10, 'mph', 0, 75)
        RETURNING id, cross, cross_type as "cross_type: _",
                  tail, tail_type as "tail_type: _",
                  gun_orient as "gun_orient: _", tolerance as "tolerance: _"
        "#,
        test_id,
    )
    .fetch_one(executor)
    .await
}

pub(crate) async fn update_test_config<'e, E>(executor: E, config: TestConfiguration) ->
    Result<(), sqlx::Error> 
    where E: DbExec<'e> {

    sqlx::query!(
        r#"UPDATE test_configs SET 
        cross = ?,
        cross_type = ?,
        tail = ?,
        tail_type = ?,
        gun_orient = ?,
        tolerance = ?
        WHERE id = ?
        "#,
        config.cross,
        config.cross_type,
        config.tail,
        config.tail_type,
        config.gun_orient,
        config.tolerance,
        config.id
        )
        .execute(executor)
        .await?;
	Ok(())

}

pub(crate) async fn get_test_config_by_id<'e, E>(executor: E, test_id: i64) ->
	Result<Option<TestConfiguration>, sqlx::Error> 
    where E: DbExec<'e> {
	sqlx::query_as!(
		TestConfiguration,
		r#"
        SELECT id, cross, cross_type, tail, tail_type, gun_orient, tolerance 
		FROM test_configs WHERE id = ?
        "#,
		test_id
	)
	.fetch_optional(executor)
	.await
}

pub(crate) async fn delete_config_by_id<'e, E>(executor: E, test_id: i64) ->
    Result<(), sqlx::Error>
    where E: DbExec<'e> {
    sqlx::query!("DELETE FROM test_configs WHERE id = ?", test_id)
        .execute(executor)
        .await?;
	Ok(())
}