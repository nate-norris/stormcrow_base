use crate::lib_sqlx::models::{SiteWeather, QEConfiguration, WeatherRow};

use super::{DbExec, QEBase, QEDeleteSite};

// TODO
// pub(crate) async fn get_test_qes<'e, E>(executor: E, test_id: i64) ->

// when reassigning weather delete (delete qe that is being overwritten plus if there is an existing destination qe)
// when inserting weather and overwriting then all qe sites are gone
pub(crate) async fn insert_qe_site<'e, E>(executor: E, base: &QEBase, config: &QEConfiguration, qe_site: &SiteWeather) ->
	Result<WeatherRow, sqlx::Error>
	where E: DbExec<'e> {

	sqlx::query_as!(
        WeatherRow,
        r#"
        INSERT INTO qe (site_id, range, altitude, gun_orient, count, qe_type, dodic, lot, wind_full, wind_direction, cross, tail, temp, humidity, baro, time, test_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        RETURNING id, site_id, range, altitude, gun_orient, count, qe_type, dodic, lot, wind_full, wind_direction, cross, tail, temp, humidity, baro, time, test_id
        "#,
        qe_site.site_id,
		qe_site.range,
		qe_site.altitude,
		config.gun_orient,
		base.count,
		base.qe_type,
		config.dodic,
		config.lot,
		qe_site.wind_full,
		qe_site.wind_direction,
		qe_site.cross,
		qe_site.tail,
		qe_site.temp,
		qe_site.humidity,
		qe_site.baro,
		config.time,
		base.test_id
    )
    .fetch_one(executor)
    .await
}

pub(crate) async fn get_qe_rows<'e, E>(executor: E, base: &QEBase) ->
	Result<Vec<WeatherRow>, sqlx::Error>
	where E: DbExec<'e> {

	let sites = sqlx::query_as!(
		WeatherRow,
		r#"
		SELECT id, site_id, range, altitude, gun_orient, count, qe_type, dodic, lot, wind_full, wind_direction, cross, tail, temp, humidity, baro, time, test_id
		FROM qe
		WHERE count = ? AND qe_type = ? AND test_id = ?
		"#, 
		base.count,
		base.qe_type,
		base.test_id
	)
	.fetch_all(executor)
    .await?;

	Ok(sites)
}

pub(crate) async fn delete_test_qes<'e, E>(executor: E, test_id: i64) ->
	Result<(), sqlx::Error>
	where E: DbExec<'e> {
	sqlx::query!(
		"DELETE FROM qe WHERE test_id = ?", 
		test_id
	)
    .execute(executor)
    .await?;
	
	Ok(())
}

pub(crate) async fn delete_qe<'e, E>(executor: E, qe: &QEBase) ->
    Result<(), sqlx::Error>
    where E: DbExec<'e> {

    sqlx::query!(
		r#"
		DELETE FROM qe
		WHERE count = ? AND qe_type = ? AND test_id = ?
		"#, 
		qe.count,
		qe.qe_type,
		qe.test_id
	)
    .execute(executor)
    .await?;
	
	Ok(())
}

pub(crate) async fn delete_qe_site<'e, E>(executor: E, qe_site: &QEDeleteSite) ->
	Result<(), sqlx::Error>
	where E: DbExec<'e> {

	sqlx::query!(
		r#"
		DELETE FROM qe WHERE 
		count = ? AND qe_type = ? AND test_id = ? AND site_id = ?
		"#, 
		qe_site.base.count,
		qe_site.base.qe_type,
		qe_site.base.test_id,
		qe_site.site_id
	)
    .execute(executor)
    .await?;
	
	Ok(())
}