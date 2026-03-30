//! all return Result<T, sqlx::Error>
//! 
// use sqlx::Error;
// use crate::lib_sqlx::models::{DegreesCircle, Percent};
/*
DDL (CREATE, ALTER, DROP) → use sqlx::query(...).execute(pool).await.
DML (SELECT, INSERT, UPDATE) → use query_as! or query! when possible for compile-time checks.
*/

use super::{DbExec, WindWarningConfig};

pub(crate) async fn insert_default_test_config<'e, E>(executor: E, test_id: i64) -> 
	Result<WindWarningConfig, sqlx::Error> 
    where E: DbExec<'e> {

    // let gun_orient = DegreesCircle::new(0).unwrap().value() as i64; // u16
    // let tolerance = Percent::new(75).unwrap().value() as i64;       // u8
    sqlx::query_as!(
        WindWarningConfig,
        r#"
        INSERT INTO test_configs
            (id, max_wind, threshold_percent, gun_orient, expected_sites)
        VALUES (?, 10, 75, 0, 1)
        RETURNING id, max_wind, 
            threshold_percent as "threshold_percent: _", 
            gun_orient as "gun_orient: _",
            expected_sites
        "#,
        test_id,
    )
    .fetch_one(executor)
    .await
}

pub(crate) async fn update_test_config<'e, E>(executor: E, config: WindWarningConfig) ->
    Result<(), sqlx::Error> 
    where E: DbExec<'e> {

    sqlx::query!(
        r#"UPDATE test_configs SET 
        max_wind = ?,
        threshold_percent = ?,
        gun_orient = ?,
        expected_sites = ?
        WHERE id = ?
        "#,
        config.max_wind,
        config.threshold_percent,
        config.gun_orient,
        config.expected_sites,
        config.id
        )
        .execute(executor)
        .await?;
	Ok(())

}

pub(crate) async fn get_test_config_by_id<'e, E>(executor: E, test_id: i64) ->
	Result<Option<WindWarningConfig>, sqlx::Error> 
    where E: DbExec<'e> {
	sqlx::query_as!(
		WindWarningConfig,
		r#"
        SELECT id, max_wind, threshold_percent, gun_orient, expected_sites
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