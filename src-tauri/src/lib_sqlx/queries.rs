//! All database queries for the app.
//! 
//! all return Result<T, sqlx::Error>
//! all take either tx: &mut sqlx::Transaction<'_, DbPool> or pool: &DbPool as first parameter

use sqlx::{Error, Transaction, Sqlite};
use super::{DbPool, DbExec, NewTest, Test, TestConfiguration, NewWeather};

pub async fn get_test_by_name<'e, E: DbExec<'e>>(executor: E, test_name: &str) ->
	Result<Option<Test>, sqlx::Error> {

	sqlx::query_as!(
    	Test,
        "SELECT id, name, time FROM tests WHERE name = ?",
        test_name
    )
    .fetch_optional(executor)
    .await
}

pub async fn get_test_config_by_id<'e, E: DbExec<'e>>(executor: E, test_id: i64) ->
	Result<Option<TestConfiguration>, sqlx::Error> {
	sqlx::query_as!(
		TestConfiguration,
		"SELECT id, cross, cross_type, tail, tail_type, gun_orient, tolerance 
		FROM test_configs WHERE id = ?",
		test_id
	)
	.fetch_optional(executor)
	.await
}

pub async fn insert_test<'e, E: DbExec<'e>>(executor: E, new_test: &NewTest) -> 
	Result<Test, sqlx::Error> {
	// Insert the new session
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

pub async fn insert_default_test_config<'e, E: DbExec<'e>>(executor: E, test_id: i64) -> 
	Result<TestConfiguration, sqlx::Error> {
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
        test_id
    )
    .fetch_one(executor)
    .await
}

pub async fn update_last_test<'e, E: DbExec<'e>>(executor: E, test_id: i64) ->
	Result<(), sqlx::Error> {

	sqlx::query("UPDATE last_test SET last_test_id = ?")
	.bind(test_id)
	.execute(executor)
	.await?;
	Ok(())
}


pub async fn get_last_test



// Use .fetch_all() → return Result<Vec<T>, E>






/// Inserts a new test record if one with the same name does not already exist.
///
/// # Arguments
/// * `pool` - A reference to the database connection pool.
/// * `new_test` - The [`NewTest`] struct containing the `name` and `time` values to insert.
///
/// # Returns
/// * `Ok(Test)` - The existing or newly inserted [`Test`] record.
/// * `Err(sqlx::Error)` - If the database query or insert operation fails.
///
/// # Notes
/// - Prevents duplicate test names by performing a lookup before insertion.
/// - Uses [`sqlx::query_as!`] for compile-time checked SQL mapping.
pub async fn insert_test_if_not_exists(pool: &DbPool, new_test: 
	NewTest) -> Result<Test, sqlx::Error> {

    // if session exists return existing session
    if let Some(existing) = sqlx::query_as!(
    	Test,
        "SELECT id, name, time FROM tests WHERE name = ?",
        new_test.name
    )
    .fetch_optional(pool)
    .await? {
        return Ok(existing);
    }

    // Insert the new session
    let inserted = sqlx::query_as!(
        Test,
        r#"
        INSERT INTO tests (name, time)
        VALUES (?, ?)
        RETURNING id, name, time
        "#,
        new_test.name,
        new_test.time
    )
    .fetch_one(pool)
    .await?;

    Ok(inserted)
}




/*

use sqlx::{SqlitePool, Row};
use chrono::NaiveDateTime;



*/



//In Tauri, Mutex or RwLock is the simplest way to keep a DB connection alive across commands.
// In SQLx, a &str is treated as an unprepared query, and a Query or QueryAs struct is treated as a prepared query.
//https://www.shuttle.dev/blog/2023/10/04/sql-in-rust
//https://bitbucket.org/norris14597mil/chinook/src/v4airmarkestrel/src/gun_site/weather_database.py
//https://crates.io/crates/sqlx-cli
//https://tms-dev-blog.com/rust-sqlx-basics-with-sqlite/
//https://github.com/launchbadge/sqlx/blob/main/examples/sqlite/todos/src/main.rs
//https://tauritutorials.com/blog/tauri-command-fundamentals

// use tauri::api::path::app_data_dir;
// use sqlx::sqlite::SqlitePool;
// use sqlx::Result;
// use sqlx::{migrate::MigrateDatabase, Sqlite, SqlitePool};
// use chrono::NaiveDateTime;


/*
DDL (CREATE, ALTER, DROP) → use sqlx::query(...).execute(pool).await.
DML (SELECT, INSERT, UPDATE) → use query_as! or query! when possible for compile-time checks.
*/
// use tauri::State;
pub async fn get_users() -> Vec<String> {
    // Pretend this is a SQLx query — simplified
    vec!["Alice".into(), "Bob".into(), "Charlie".into()]
}

// note that bound parameters are added to the query macro
// let query = query!("SELECT * FROM FOO WHERE ID = $1", 1).fetch_one(&pool).await.unwrap();

// #[tauri::command]



/*
from __future__ import annotations
import os
import sqlite3

import shared._utils as Utils

from typing import TYPE_CHECKING
if TYPE_CHECKING:
	from datetime import datetime
	from gun_site.pi.site_controller import SiteController

class WeatherDB():
	#############################################################################
	# database tracking weather data		                    			              #
	#############################################################################

	# file permissions
	# drwxr-xr-x 2 root root 4096 Feb3 13:42

	def __init__(self):
		''' create connection or quite application '''

		try:
			path = os.path.join(Utils.getAppFilesPath(), 'gun_site/Chinook.db')
			#path = os.path.join(os.getcwd(), 'Chinook.db')
			connection = 'file:'+path+'?mode=rw'
			#sqlite3.Connection
			self.conn = sqlite3.connect(connection, uri=True, \
				check_same_thread=False)
		except sqlite3.OperationalError:
			print('------ERROR: no database')
			import sys
			sys.exit(1) #failure
	
		
		self.conn.execute("PRAGMA foreign_keys = 1") #enable foreign keys
		self.c = self.conn.cursor() #handles db events
		self.createTables() #session and weather table created if not already

	def createTables(self):
		''' create tables if they don't exist '''
		# session and its preferences
		self.c.execute('''CREATE TABLE IF NOT EXISTS Sessions ( \
			session_id INTEGER PRIMARY KEY, \
			session_name VARCHAR(30), \
			session_time DATETIME, \
			cross_value_settings INTEGER, \
			cross_type_settings VARACHAR(5), \
			tail_value_settings INTEGER, \
			tail_type_settings VARACHAR(5), \
			gun_orient_settings INTEGER, \
			tolerance_settings DOUBLE)''')
		self.conn.commit()

		# weather log for session by site
		self.c.execute('''CREATE TABLE IF NOT EXISTS Weather ( \
			weather_id INTEGER PRIMARY KEY, \
			site_id CHARACTER(7), \
			range INTEGER, \
			altitude INTEGER, \
			weapon_orientation INTEGER, \
			qe INTEGER, \
			qe_type CHARACTER(2), \
			dodic CHARACTER(4), \
			lot VARCHAR(14), \
			wind_speed DOUBLE, \
			wind_direction INTEGER, \
			cross_wind DOUBLE, \
			tail_wind DOUBLE, \
			temp DOUBLE, \
			humidity DOUBLE, \
			barometer DOUBLE, \
			weather_time DATETIME, \
			session_id INTEGER, \
			FOREIGN KEY (session_id) REFERENCES Sessions (session_id))''')
		self.conn.commit()

		# start up option to kick off last session
		self.c.execute('''CREATE TABLE IF NOT EXISTS LastSession (
			row_id INTEGER PRIMARY KEY, \
			session_id INTEGER, \
			FOREIGN KEY (session_id) REFERENCES Sessions (session_id))''')
		self.conn.commit()
	
	def closeConnection(self):
		''' disconnect sqlite connection '''
		self.c.close()
		self.conn.close()

	##### sesion methods ######################################################
	###########################################################################
	
	def isSessionAlreadyCreated(self, session: str) -> bool:
		''' 
		determine if session name is existence
		Args:
			session - (str) session name to search for
		Returns:
			(bool) True if session exists, False otherwise
		'''
		binding = (session, )
		sql = ''' SELECT EXISTS(SELECT 1 FROM Sessions WHERE session_name = ?)
			'''
		cursor = self.c.execute(sql, binding)

		return True if cursor.fetchone()[0] == 1 else False

	def insertSession(self, session: str, datetime: datetime, cross: int, \
		cross_type: int, tail: int, tail_type: str, weapon_orientation: int, \
		threshold: float) -> int:
		''' insert session if doesnt exists 
		Args:
			session - (str) session name
			datetime - (datetime.datetime) for session creation
			cross - (int)
			cross_type - (str)
			tail - (int)
			tail_type - (str)
			weapon_orientation - (int)
			threshold - (float)
		Returns:
			(int) session id
		'''
		def getSessionIDFromDB(session: str) -> int:
			''' returns session id
			Args:
				session (str) - session name
			Returns: (int) id of session row
			'''
			binding = (session, )
			sql = ''' SELECT session_id FROM Sessions WHERE session_name = ?'''
			cursor = self.c.execute(sql, binding)
			return cursor.fetchone()[0]

		if not self.isSessionAlreadyCreated(session):
			binding = (session, str(datetime), cross, cross_type, tail, \
				tail_type, weapon_orientation, threshold)
			sql = ''' INSERT INTO Sessions VALUES (NULL,?,?,?,?,?,?,?,?) '''
			self.c.execute(sql, binding)
			self.conn.commit()

		return getSessionIDFromDB(session) #get session id

	def getAllSessionData(self) -> list:
		''' get all session data in database
		Returns:
			(list)
		'''
		sql = ''' SELECT * FROM Sessions ORDER BY session_time DESC '''
		cursor = self.c.execute(sql)
		
		return cursor

	def getSessionSettings(self, sess_id: int) -> tuple:
		''' get the user settings for the selected session
		Args:
			sess_id - (int)
		Returns:
			(tuple)
		'''
		binding = (sess_id, )
		sql = ''' SELECT session_name, cross_value_settings, \
			cross_type_settings, tail_value_settings, tail_type_settings, \
			gun_orient_settings, tolerance_settings FROM Sessions WHERE \
			session_id = ? '''
		cursor = self.c.execute(sql, binding)
		return cursor.fetchone()

	def updateSessionSettings(self, sess_id: str, cross: int, cross_type: str,\
		tail: int, tail_type: str, weapon: int, tolerance: float):
		''' update settings to last specified
		Args:
			sess_id - (str) session id
			cross - (int) max cross value
			cross_type - (str) NA, MPH, or KNOTS
			tail - (int) max tail value
			tail_type - (str) NA, MPH, or KNOTS
			weapon - (int) degrees orientation
			tolerance - (float) threshold for warning
		'''
		binding = (cross, cross_type, tail, tail_type, weapon, tolerance, \
			sess_id)
		sql = ''' UPDATE Sessions SET cross_value_settings = ?, \
			cross_type_settings = ?, tail_value_settings = ?, \
			tail_type_settings = ?, gun_orient_settings = ?, \
			tolerance_settings = ? WHERE session_id = ? '''
		self.c.execute(sql, binding)
		self.conn.commit()
		
	def deleteSession(self, sess_id: int):
		''' delete all session data associated to sess_id
		Weather and LastSession will be deleted prior to Sessions as session_id
			is a foreign key in their tables to Sessions
		Arg:
			sess_id (int) - session_id as seen in Sessions table
		'''
		binding = (sess_id, )
		# foreign key in Weather so delete before Sessions
		sql1 = ''' DELETE FROM Weather WHERE session_id = ? '''
		sql2 = ''' DELETE FROM Sessions WHERE session_id = ? '''
		
		self.c.execute(sql1, binding)
		self.conn.commit()
		# set LastSession to None if the deleting session was
		#   the last session loaded
		if sess_id == self.getLastSessionID():
			self.updateLastSession() 
			
		self.c.execute(sql2, binding)
		self.conn.commit()
		
	def updateLastSession(self, *args: list):
		''' save the last session logged by user for easy load on start up
		Args:
			*args (list) - will contain the session_id to update. if none 
				provided will set to None to notify of no previous session
		'''
	
		session_id = args[0] if len(args)>0 else None
		binding = (session_id, )
		sql = ''' UPDATE LastSession SET session_id = ?
			WHERE row_id = 1 '''
		self.c.execute(sql, binding)
		self.conn.commit()
		
	def getLastSessionID(self) -> int | None:
		''' get the last session loaded by user 
		Returns:
			(int/None) session_id - FOREIGN KEY to Sessions session_id if set, 
				None if no session was last set
		'''
		sql = ''' SELECT session_id FROM LastSession WHERE row_id = 1 '''
		cursor = self.c.execute(sql)
		return cursor.fetchone()[0]

	##### weather methods #####################################################
	###########################################################################

	def getWeatherDataForSessionID(self, sess_id: int) -> list:
		''' get all weather data included in the provided session
		ordered by QE least to greatest
		Args:
			sess_id - (int) id of session
		Returns:
			(list)
		'''
		binding = (sess_id, )
		sql = ''' SELECT * FROM Weather WHERE session_id = ? \
			ORDER BY qe ASC '''
		cursor = self.c.execute(sql, binding)
		return cursor.fetchall()

	def reassignWeather(self, session_id: str, qe_orig: int, \
		qe_type_orig: str, qe: int, qe_type: str):
		''' reassignment will overwrite any existing site data and the
		previous data will be deleted
		Args:
			session_id - (str)
			qe_orig - (int)
			qe_type_orig - (str)
			qe -(int)
			qe_type - (str)
		'''
		
		def getSessionQeData(sess: int, qe: int, qet: str):
			binding = (sess, qe, qet)
			sql = ''' SELECT * FROM Weather WHERE session_id = ? AND qe = ? \
				AND qe_type = ? '''
			cursor = self.c.execute(sql, binding)
			return cursor.fetchall()
		
		# get all values from original weather that has already been inserted 
		#   in  db based off session id qe orig and type orig
		rows = getSessionQeData(session_id, qe_orig, qe_type_orig)

		# delete rows associated to the original qe 
		self.deleteQeWeather(session_id, qe_orig, qe_type_orig)
		# delete all rows if any associated to new qe
		if self.doesSessionQeExist(session_id, qe, qe_type):
			self.deleteQeWeather(session_id, qe, qe_type)

		sql = ''' INSERT INTO Weather VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?,\
			?,?,?,?,?) '''
		for r in rows:
			binding = (r[1], r[2], r[3], r[4], qe, qe_type, \
					r[7], r[8], r[9], r[10], r[11], r[12], r[13], r[14], \
					r[15], r[16], r[17])
			self.c.execute(sql, binding)
		self.conn.commit()

	def doesSessionQeExist(self, sid: int, qe: int, qet: str) -> bool:
		''' determine if there is an entry for a qe within provided session
		Args:
			sid = (int) session id
			qe - (int)
			qet - (str) qe type
		Returns:
			(bool) - True if exists, False otherwise
		'''
		binding = (qe, qet, sid)
		sql = ''' SELECT * FROM Weather WHERE qe = ? AND qe_type = ? AND \
			session_id = ? '''
		cursor = self.c.execute(sql, binding) # can have multiple sites
		return True if cursor.fetchone() != None else False

	def insertWeatherSites(self, session_id: int, weapon_orientation: int, \
		dodic: str, lot: str, qe: int, qe_type: str, datetime: datetime, \
		site_list: list[SiteController]):
		''' insert all weather data for the provided weather sites
		Args:
			session_id - (int)
			weapon_orientation - (int)
			dodic - (str)
			lot - (str)
			qe - (int)
			qe_type - (str)
			datetime - (datetime.datetime)
			site_list - (list) of gun_site.pi.SiteControllers
		'''

		# delete all sites for qe and type
		if self.doesSessionQeExist(session_id, qe, qe_type):
			self.deleteQeWeather(session_id, qe, qe_type)

		sql = ''' INSERT INTO Weather VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,\
			?,?,?,?) '''
		for s in site_list:
			binding = (s.site_id, s.range_meters, s.altitude, \
				weapon_orientation, qe, qe_type, dodic, lot, s.wind_speed, \
				s.wind_direction, s.cross_wind, s.tail_wind, s.temperature, \
				s.humidity, s.barometer, datetime, session_id)
			self.c.execute(sql, binding)
		self.conn.commit()


	def deleteQeWeather(self, sess_id: int, qe: int, qe_type: str, site=None):
		''' delete QE session weather data, a qe is unique by its
		type and session. NOTE WILL DELETE ALL SITE DATA IF SITE NOT PROVIDED
		Args:
			sess_id - (int) session id
			qe - (int) quality evaluation count
			qe_type - (str) 'TR' or 'WS'
		Kwargs:
			site (str | None) - limit deletions to a specific site if one
				provided. Otherwise delete all based off qe and type
		'''
		if site is not None:
			binding = (qe, qe_type, sess_id, site)
			sql = ''' DELETE FROM Weather WHERE qe = ? AND qe_type = ? \
				AND session_id = ? AND site_id = ?'''
		else:
			binding = (qe, qe_type, sess_id)
			sql = ''' DELETE FROM Weather WHERE qe = ? AND qe_type = ? \
				AND session_ID = ? '''
		self.c.execute(sql, binding)
		self.conn.commit()