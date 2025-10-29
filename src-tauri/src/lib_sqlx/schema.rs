//! Initiate the app database.
//! 
//! Will create the database, any required tables, and return a sqlx::Pool
//! for future database calls. 

use sqlx::{Pool, Sqlite, Executor};
use sqlx::migrate::MigrateDatabase;
use std::path::PathBuf;

pub type DbPool = Pool<Sqlite>; // pool type

const DB_SCHEME: &str = "sqlite"; //uri type can be swapped
// bounded type group
//      all queries can accept either tx: &mut sqlx::Transaction<'_, DbPool> 
//      or pool: &DbPool as the first parameter
// Handles the lifeline internally
pub trait DbExec<'e>: Executor<'e, Database = Sqlite> {}
impl<'e, T> DbExec<'e> for T where T: Executor<'e, Database = Sqlite> {}
    

/// Initializes the database and returns a connection pool.
///
/// This function performs the following steps:
/// 1. Determines the platform-specific database path.
/// 2. Creates the database file if it does not exist.
/// 3. Connects to the database and returns a connection pool (`DbPool`).
/// 4. Ensures all required tables are created if missing.
///
/// # Returns
/// - `Ok(DbPool)` — A connection pool ready for SQLx queries.
/// - `Err(sqlx::Error)` — If any database operation fails.
pub async fn init_db() -> Result<DbPool, sqlx::Error> {
    // platform specific db location
    let (_path, db_url) = get_db_path();
    // create database if needed
    maybe_create_database(&db_url).await?;
    // connect to the pool
    let pool: DbPool = DbPool::connect(&db_url).await?;
    // Create tables if they don’t exist
    create_tables(&pool).await?;

    Ok(pool)
}

/// Return a path and database scheme for the apps database
/// 
/// Selects the path based on whether tha pp is in development or production
/// mode.
/// 
/// # Returns
/// A tuple `(path, url)`:
/// - `path` - `PathBuff` pointing to the SQLite database file location.
/// - `url` — `String` containing the database connection URL suitable for `sqlx::SqlitePool`.
fn get_db_path() -> (PathBuf, String) {
    #[cfg(debug_assertions)]
    {
        let mut path = PathBuf::from(env!("CARGO_MANIFEST_DIR")); // guaranteed project root
        path.pop(); // go up one level from .toml
        path.push("data/weather.sqlite");
        let url: String = format!("{}://{}", DB_SCHEME, path.display());
        println!("{}", url);
        (path, url)
    }

    #[cfg(not(debug_assertions))]
    { //TODO fix the app source for production
        // Packaged Tauri app: platform-appropriate folder
        let base = dirs::data_dir().expect("no data dir");
        let path = base.join("chinook").join("weather.sqlite");
        let url = format!("{}://{}", DB_SCHEME, path.display());
        (path, url)
    }
}

/// Creates the database when required.
/// 
/// # Arguments
/// - `database_path` — Path or URL to the database.
/// 
/// # Returns
/// - `Ok(())` — function has ran correctly
/// - `Err(sqlx::Error)` — If any database operation fails.
/// 
/// # Example
/// ```rust,no_run
/// # use sqlx::Error;
/// # async fn example() -> Result<(), Error> {
/// maybe_create_database("weather.sqlite").await?;
/// # Ok(())
/// # }
/// ```
async fn maybe_create_database(database_path: &str) -> Result<(), sqlx::Error> {
    if !Sqlite::database_exists(database_path).await.unwrap_or(false) {
        Sqlite::create_database(database_path).await?;
    }
    Ok(())
}

/// Create tables if they do not exists.
///
/// Initializes the following tables:
/// - **tests** – Contains test metadata such as `id`, `name`, and `time`.
/// - **test_configs** – Stores configuration parameters linked to a test via `id`.
/// - **weather** – Records weather data linked to a test via `test_id`.
/// Each table is created within a single transaction.  
/// If any statement fails, the entire transaction is rolled back.
///
/// # Arguments
/// * `pool` - A reference to the shared [`DbPool`] used for executing SQL queries.
///
/// # Returns
/// * `Ok(())` - If all tables are successfully created or already exist.
/// * `Err(sqlx::Error)` - If an SQL error occurs during creation.
///
/// # Errors
/// Returns an error if any SQL query fails or if the transaction cannot be committed.
///
/// # Examples
/// ```
/// let pool = create_db_pool().await?;
/// create_tables(&pool).await?;
/// ```
async fn create_tables(pool: &DbPool) -> Result<(), sqlx::Error> {

    let mut tx: sqlx::Transaction<'static, Sqlite> = pool.begin().await?;
    // Tests table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS tests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(30) NOT NULL UNIQUE,
            time INTEGER NOT NULL
        );
        "#,
    )
    .execute(&mut *tx)
    .await?;

    // Test Configurations table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS test_configs (
            id INTEGER PRIMARY KEY,
            cross INTEGER NOT NULL,
            cross_type VARCHAR(5) NOT NULL,
            tail INTEGER NOT NULL,
            tail_type VARCHAR(5) NOT NULL,
            gun_orient INTEGER NOT NULL,
            tolerance INTEGER NOT NULL,
            FOREIGN KEY(id) REFERENCES tests(id)
        );
        "#,
    )
    .execute(&mut *tx)
    .await?;

    // Weather table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS weather (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            site_id INTEGER NOT NULL,
            range INTEGER NOT NULL,
            altitude INTEGER NOT NULL,
            gun_orient INTEGER NOT NULL,
            qe INTEGER NOT NULL,
            qe_type CHARACTER(2) NOT NULL,
            dodic CHARACTER(4) NOT NULL,
            lot VARCHAR(14) NOT NULL,
            wind_full REAL NOT NULL,
            wind_direction REAL NOT NULL,
            cross REAL NOT NULL,
            tail REAL NOT NULL,
            temp REAL NOT NULL,
            humidity REAL NOT NULL,
            baro REAL NOT NULL,
            time INTEGER NOT NULL,
            test_id INTEGER NOT NULL,
            FOREIGN KEY(test_id) REFERENCES tests(id)
        );
        "#,
    )
    .execute(&mut *tx)
    .await?;

    //last test table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS last_test (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            last_test_name VARCHAR(30)
        );
        "#,
    )
    .execute(&mut *tx)
    .await?;

    // add last_test single row if needed
    sqlx::query(
        r#"
        INSERT INTO last_test (id, last_test_name)
        VALUES (1, NULL)
        ON CONFLICT(id) DO NOTHING
        "#,
    )
    .execute(&mut *tx)
    .await?;

    tx.commit().await?;

    Ok(())
}