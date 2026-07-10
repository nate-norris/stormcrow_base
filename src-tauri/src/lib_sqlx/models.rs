//! Structs and Enums used for data passing within sqlx_lib
//! 
//! Includes data types for database fields as well as the structure for the
//! table itself. The sqlx::Type and sqlx::FromRow are used for conveneince
//! matching data to tables.

// use sqlx::FromRow;
use serde::{Serialize, Deserialize};
use sqlx::FromRow;
use chrono::{DateTime, Local};

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

/// Represents the required data when initiating a test
/// 
/// Contains the following:
/// - Test for the selected test
/// - WindWarningConfig settings for wind warnings
/// - Vec<WeatherRow> for all QEs that have been logged
#[derive(Debug, Serialize)]
pub struct TestSession {
    pub test: Test,
    pub config: WindWarningConfig,
    pub qes: Vec<WeatherRow>,
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
#[serde(rename_all = "camelCase")]
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
/// This struct is used for returned weather table rows only and are serialized
/// for Tauri commands.
///
/// # Fields
/// - `id` — Primary key of this weather entry.
/// - `site_id` — Identifier of the weather site where measurements were taken.
/// - `altitude` — Altitude in meters.
/// - `gun_orient` — Orientation of the gun in degrees (`DegreesCircle` enum).
/// - `qe` — QE count value.
/// - `qe_type` — Type of QE measurement (`QEType` enum).
/// - `dodic` — DODIC code associated with the entry.
/// - `lot` — Lot number associated with the entry.
/// - `wind_full` — Full wind speed in meters per second (m/s).
/// - `wind_direction` — Wind direction in floating-point degrees.
/// - `cross` — Cross-section wind speed in m/s.
/// - `tail` — Tail-section wind speed in m/s.
/// - `temp` — Temperature in degrees Fahrenheit.
/// - `humidity` — Relative humidity as a percentage.
/// - `baro` — Barometric pressure in inches of mercury (inHg).
/// - `time` — Timestamp of the measurement (`NaiveDateTime`).
/// - `test_id` — Foreign key linking this weather entry to a `Test` entry.
#[derive(Debug, Clone, FromRow, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct WeatherRow {
    pub id: Option<i64>,
    pub site_id: String, // weather site
    pub altitude: i64, //meters
    pub gun_orient: i64, //DegreesCircle,
    pub count: i64,
    pub qe_type: String, //QEType,
    pub dodic: String,
    pub lot: String,
    pub wind_full: f64, // m/s
    pub wind_direction: f64, //floating point degrees
    pub cross: f64, //m/s
    pub tail: f64, //m/s
    pub temp: f64, //degrees farenheit
    pub humidity: f64, //percent
    pub baro: f64, //inHg
    pub time: i64,
    pub test_id: i64 //FK
}

impl WeatherRow {
    pub fn export(self) -> ExportWeatherRow {
        let time = DateTime::from_timestamp_millis(self.time)
            .unwrap()
            .with_timezone(&Local)
            .format("%m/%d/%Y %H:%M:%S")
            .to_string();

        ExportWeatherRow {
            site_id: self.site_id,
            altitude: self.altitude,
            gun_orient: self.gun_orient,
            count: self.count,
            qe_type: self.qe_type,
            dodic: self.dodic,
            lot: self.lot,
            wind_full: self.wind_full,
            wind_direction: self.wind_direction,
            cross: self.cross,
            tail: self.tail,
            temp: self.temp,
            humidity: self.humidity,
            baro: self.baro,
            time,
        }
    }
}

#[derive(Serialize)]
pub struct ExportWeatherRow {
    site_id: String,
    altitude: i64,
    gun_orient: i64,
    count: i64,
    qe_type: String,
    dodic: String,
    lot: String,
    wind_full: f64,
    wind_direction: f64,
    cross: f64,
    tail: f64,
    temp: f64,
    humidity: f64,
    baro: f64,
    time: String,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SiteWeather {
    pub site_id: String, // unique id for site
    pub altitude: i64, //meters
    pub wind_full: f64, //m/s
    pub wind_direction: f64, //floating point degrees
    pub cross: f64, //m/s
    pub tail: f64, //m/s
    pub temp: f64, //degrees farenheit
    pub humidity: f64, //percent
    pub baro: f64, //inHg
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct QEConfiguration {
    pub dodic: String,
    pub lot: String,
    pub gun_orient: i64,
    pub time: i64
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct QEBase {
    pub count: i64,
    pub qe_type: String,
    pub test_id: i64
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
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
#[serde(rename_all = "camelCase")]
pub struct QEDeleteSite {
    pub site_id: String,
    #[serde(flatten)]
    pub base: QEBase
}