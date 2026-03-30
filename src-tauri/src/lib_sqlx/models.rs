//! Structs and Enums used for data passing within sqlx_lib
//! 
//! Includes data types for database fields as well as the structure for the
//! table itself. The sqlx::Type and sqlx::FromRow are used for conveneince
//! matching data to tables.

// use sqlx::FromRow;
use serde::{Serialize, Deserialize};
use sqlx::FromRow;

/// Represents a row in `test` table
/// 
/// The struct is used to retrieve records via SQLx and are returned
/// via JSON.
/// 
/// # Fields
/// - `id` - primary key for row
/// - `name` - name of the test
/// - `time` - timestamp test was created
#[derive(Debug, Clone, FromRow, Serialize)]
pub struct Test {
    pub id: i64,
    pub name: String,
    pub time: i64,
}
/// Represents a new entry in `test`` table
/// 
/// Struct is deserialized from JSON
#[derive(Debug, Clone, Deserialize)]
pub struct NewTest {
    pub name: String,
    // #[serde(with = "chrono::serde::ts_seconds")]
    // pub time: DateTime<Utc>,
    pub time: i64,
}

/// Represents a row in `test_configs`
/// 
/// The struct will retrieve updates for configurations aligning
/// to a specific test as well as provide most recent configuration
/// settings.
/// 
/// # Fields
/// - `id` — Primary key linking this configuration to the corresponding `Test` 
/// entry in the `test` table.
/// - `max_wind` — Maximum wind speed for the cross and head/tail calculations.
/// - `threshold_percent` — Allowed tolerance as a percentage used to calculate
/// allowed cross and head/tail wind components.
/// - `gun_orient` — Orientation of the gun in degrees around the circle.
/// - `expected_sites` — The number of sites to verify consistent receiving
/// of weather data from.
#[derive(Debug, Clone, FromRow, Serialize, Deserialize)]
pub struct WindWarningConfig {
    pub id: i64,
    pub max_wind: i64,
    pub threshold_percent: i64,
    pub gun_orient: i64,
    pub expected_sites: i64
}

/// Represents a weather measurement associated with a `test` entry.
///
/// Each `NewWeather` row contains detailed environmental data recorded at a
/// specific weather site and gun position, and is linked to a `Test` via `test_id`.
/// This struct is used for both reading from and writing to the database, and
/// can be serialized/deserialized for Tauri commands.
///
/// # Fields
/// - `id` — Primary key of this weather entry.
/// - `site_id` — Identifier of the weather site where measurements were taken.
/// - `range` — Distance from the gun position in meters.
/// - `altitude` — Altitude in meters.
/// - `gun_orient` — Orientation of the gun in degrees (`DegreesCircle` enum).
/// - `qe` — QE count value.
/// - `qe_type` — Type of QE measurement (`QEType` enum).
/// - `dodic` — DODIC code associated with the entry.
/// - `lot` — Lot number associated with the entry.
/// - `wind_full` — Full wind speed in miles per hour (mph).
/// - `wind_direction` — Wind direction in floating-point degrees.
/// - `cross` — Cross-section wind speed in mph.
/// - `tail` — Tail-section wind speed in mph.
/// - `temp` — Temperature in degrees Fahrenheit.
/// - `humidity` — Relative humidity as a percentage.
/// - `baro` — Barometric pressure in inches of mercury (inHg).
/// - `time` — Timestamp of the measurement (`NaiveDateTime`).
/// - `test_id` — Foreign key linking this weather entry to a `Test` entry.
#[derive(Debug, Clone, FromRow, Serialize)]
pub struct WeatherRow {
    pub id: Option<i64>,
    pub site_id: i64, // weather site
    pub range: i64, // from gun position in meters
    pub altitude: i64, //meters
    pub gun_orient: i64, //DegreesCircle,
    pub count: i64,
    pub qe_type: String, //QEType,
    pub dodic: String,
    pub lot: String,
    pub wind_full: f64, // mph
    pub wind_direction: f64, //floating point degrees
    pub cross: f64, //mph
    pub tail: f64, //mph
    pub temp: f64, //degrees farenheit
    pub humidity: f64, //percent
    pub baro: f64, //inHg
    pub time: i64,
    pub test_id: i64 //FK
}

#[derive(Debug, Clone, Deserialize)]
pub struct SiteWeather {
    pub site_id: i64, // unique id for site
    pub range: i64, // from gun position in meters
    pub altitude: i64, //meters
    pub wind_full: f64, // mph
    pub wind_direction: f64, //floating point degrees
    pub cross: f64, //mph
    pub tail: f64, //mph
    pub temp: f64, //degrees farenheit
    pub humidity: f64, //percent
    pub baro: f64, //inHg
}

#[derive(Debug, Clone, Deserialize)]
pub struct QEConfiguration {
    pub dodic: String,
    pub lot: String,
    pub gun_orient: i64,
    pub time: i64
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct QEBase {
    pub count: i64,
    pub qe_type: String,
    pub test_id: i64
}

#[derive(Debug, Clone, Deserialize)]
pub struct QEEntry {
    pub base: QEBase,
    pub config: QEConfiguration,
    pub sites: Vec<SiteWeather>
}
impl QEEntry {
    pub fn from_weather_rows(rows: Vec<WeatherRow>) -> Option<Self> {
        if rows.is_empty() {
            return None;
        }

        // Take base/config from the first row — guaranteed to be consistent
        let base = rows[0].clone().into();
        let config = rows[0].clone().into();
        let sites = rows.into_iter().map(|r| r.into()).collect();

        Some(Self { base, config, sites })
    }
}
impl From<WeatherRow> for QEBase {
    fn from(row: WeatherRow) -> Self {
        QEBase {
            count: row.count,
            qe_type: row.qe_type,
            test_id: row.test_id,
        }
    }
}
impl From<WeatherRow> for QEConfiguration {
    fn from(row: WeatherRow) -> Self {
        QEConfiguration {
            gun_orient: row.gun_orient,
            dodic: row.dodic,
            lot: row.lot,
            time: row.time,
        }
    }
}
impl From<WeatherRow> for SiteWeather {
    fn from(row: WeatherRow) -> Self {
        SiteWeather {
            site_id: row.site_id,
            range: row.range,
            altitude: row.altitude,
            wind_full: row.wind_full,
            wind_direction: row.wind_direction,
            cross: row.cross,
            tail: row.tail,
            temp: row.temp,
            humidity: row.humidity,
            baro: row.baro,
        }
    }
}

#[derive(Debug, Clone, Deserialize)]
pub struct QEDeleteSite {
    pub site_id: i64,
    #[serde(flatten)]
    pub base: QEBase
}