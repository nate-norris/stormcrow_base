//! all return Result<T, sqlx::Error>
//! 
// use sqlx::Error;
// use crate::lib_sqlx::models::{DegreesCircle, Percent};
/*
DDL (CREATE, ALTER, DROP) → use sqlx::query(...).execute(pool).await.
DML (SELECT, INSERT, UPDATE) → use query_as! or query! when possible for compile-time checks.
*/

use super::{DbExec, WindWarningConfig, AzimuthRawInput, LocationConfig,
    LocationConfigRow};

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

pub(crate) async fn update_location_config<'e, E>(executor: E, test_id: i64, weapon: AzimuthRawInput, target: AzimuthRawInput) ->
    Result<(), sqlx::Error>
    where E: DbExec<'e> {
    
    sqlx::query!(
        r#"UPDATE test_configs SET 
        weapon_zone = ?,
        weapon_hem = ?,
        weapon_east = ?,
        weapon_north = ?,
        target_zone = ?,
        target_hem = ?,
        target_east = ?,
        target_north = ?
        WHERE id = ?
        "#,
        weapon.utm,
        weapon.hemisphere,
        weapon.easting,
        weapon.northing,
        target.utm,
        target.hemisphere,
        target.easting,
        target.northing,
        test_id
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

pub(crate) async fn get_location_config_by_id<'e, E>(executor: E, test_id: i64) ->
	Result<Option<LocationConfig>, sqlx::Error> 
    where E: DbExec<'e> {
	let row = sqlx::query_as!(
		LocationConfigRow,
		r#"
        SELECT weapon_zone, weapon_hem, weapon_east, weapon_north, 
        target_zone, target_hem, target_east, target_north
		FROM test_configs WHERE id = ?
        "#,
		test_id
	)
	.fetch_optional(executor)
	.await?;

    // return if no row for the test
    let Some(row) = row else {
        return Ok(None);
    };
    // return if row has null location config
    if row.weapon_zone.is_none() {
        return Ok(None);
    }

    // location config gauranteed
    // build the LocationConfig and return
    Ok(Some(LocationConfig {
        weapon: AzimuthRawInput {
            utm: row.weapon_zone.unwrap() as u32,
            hemisphere: row.weapon_hem.unwrap(),
            easting: row.weapon_east.unwrap().to_string(),
            northing: row.weapon_north.unwrap().to_string(),
        },
        target: AzimuthRawInput {
            utm: row.target_zone.unwrap() as u32,
            hemisphere: row.target_hem.unwrap(),
            easting: row.target_east.unwrap().to_string(),
            northing: row.target_north.unwrap().to_string(),
        },
    }))
}

pub(crate) async fn delete_config_by_id<'e, E>(executor: E, test_id: i64) ->
    Result<(), sqlx::Error>
    where E: DbExec<'e> {
    sqlx::query!("DELETE FROM test_configs WHERE id = ?", test_id)
        .execute(executor)
        .await?;
	Ok(())
}