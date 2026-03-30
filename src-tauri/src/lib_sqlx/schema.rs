//! Initiate the app database.
//! 
//! Will create the database, any required tables, and return a sqlx::Pool
//! for future database calls. 
use tokio::fs;
use sqlx::{Pool, Sqlite, Executor};
use sqlx::migrate::MigrateDatabase;
use std::path::{Path, PathBuf};

pub type DbPool = Pool<Sqlite>; // pool type

struct DbLocation {
    path: PathBuf, //points to the SQLite database file location
    url: String, // database connection URL suitable for `sqlx::SqlitePool`.
}
impl DbLocation {
    fn path(&self) -> &Path {
        &self.path
    }

    fn url(&self) -> &str {
        &self.url
    }
}

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
    let db_location = get_db_path();
    // create database if needed
    maybe_create_database(&db_location).await?;
    // connect to the pool
    let pool: DbPool = DbPool::connect(db_location.url()).await?;
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
/// - DbLocation
fn get_db_path() -> DbLocation {
    #[cfg(debug_assertions)]
    {
        let mut path = PathBuf::from(env!("CARGO_MANIFEST_DIR")); // guaranteed project root
        path.pop(); // go up one level from .toml
        path.push("data/weather.sqlite");
        let url: String = format!("{}://{}", DB_SCHEME, path.display());
        DbLocation { path, url }
    }

    #[cfg(not(debug_assertions))]
    {
        // Packaged Tauri app: platform-appropriate folder
        let base = dirs::data_dir().expect("no data dir");
        let path = base.join("stormcrow").join("weather.sqlite");
        let url = format!("{}://{}", DB_SCHEME, path.display());
        DbLocation { path, url }
    }
}

/// Creates the database when required.
/// 
/// # Arguments
/// - `location` — DbLocation containing PathBuf and url string to the database.
/// 
/// # Returns
/// - `Ok(())` — function has ran correctly
/// - `Err(sqlx::Error)` — If any database operation fails.
/// 
/// # Example
/// ```rust,no_run
/// # use sqlx::Error;
/// # async fn example() -> Result<(), Error> {
/// # location = DbLocation{ PathBuf::from("path"), "sqlite:///path" }
/// # maybe_create_database(location).await?;
/// # Ok(())
/// # }
/// ```
async fn maybe_create_database(location: &DbLocation) -> Result<(), sqlx::Error> {

    // confirm parent directory
    if let Some(parent) = location.path().parent().filter(|p| !p.exists()) {
        fs::create_dir_all(parent)
            .await
            .map_err(sqlx::Error::Io)?;
    }

    // create DB file
    if !Sqlite::database_exists(location.url()).await.unwrap_or(false) {
        Sqlite::create_database(location.url()).await?;
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
            max_wind INTEGER NOT NULL,
            threshold_percent INTEGER NOT NULL,
            gun_orient INTEGER NOT NULL,
            expected_sites: number,
            FOREIGN KEY(id) REFERENCES tests(id)
        );
        "#,
    )
    .execute(&mut *tx)
    .await?;

    // Weather table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS qe (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            site_id INTEGER NOT NULL,
            range INTEGER NOT NULL,
            altitude INTEGER NOT NULL,
            gun_orient INTEGER NOT NULL,
            count INTEGER NOT NULL,
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