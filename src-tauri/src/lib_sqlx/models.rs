//! Structs and Enums used for data passing within sqlx_lib
//! 
//! Includes data types for database fields as well as the structure for the
//! table itself. The sqlx::Type and sqlx::FromRow are used for conveneince
//! matching data to tables.

use sqlx::FromRow;
use chrono::NaiveDateTime;
use serde::{Serialize, Deserialize};

/// a valid degree (0-359) in a circle
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub struct DegreesCircle(u16);
impl DegreesCircle {
    /// Creates a degrees with valid 0-359
    /// 
    /// # Arguments
    /// - `value` — The degree value to wrap in the `DegreesCircle`.
    /// 
    /// # Returns
    /// - `Some(DegreesCircle)` — If the provided value is within the range `0..360`.
    /// - `None` — If the value is out of range.
    /// 
    /// # Examples
    /// ```
    /// let deg = DegreesCircle::new(180);
    /// ```
    pub fn new(value: u16) ->Option<Self> {
        if value < 360 {
            Some(Self(value))
        } else {
            None
        }
    }

    // Returns the degree value
    pub fn value(self) -> u16 {
        self.0
    }
}

// integer based percentage 0-100
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub struct Percent(u8);
impl Percent {
    /// Create a valid new percent
    ///   /// # Examples
    /// ```
    /// let p = Percent::new(7);
    /// ```
    pub fn new(value: u8) -> Option<Self> {
        if value <= 100 {
            Some(Self(value))
        } else {
            None
        }
    }

    // Returns percent value
    pub fn value(self) -> u8 {
        self.0
    }
}

/// Velocity type. Used as a preference for wind thresholds
/// mph or knots or na if no type selected
/// sqlx auto maps to enum lowercase values
#[derive(Debug, Clone, Copy, PartialEq, Eq, sqlx::Type, Serialize, Deserialize)]
#[sqlx(type_name = "velocity_type", rename_all = "lowercase")]
#[serde(rename_all = "snake_case")]
pub enum VelocityType {
    MPH,
    KNOTS,
    NA
}

/// Quality Evaluation (QE) type (Test Round-TR or Warmer Spotter-WS)
/// sqlx auto maps to enum uppercase values
#[derive(Debug, Clone, Copy, PartialEq, Eq, sqlx::Type, Serialize, Deserialize)]
#[sqlx(type_name = "qe_type", rename_all = "UPPERCASE")]
#[serde(rename_all = "snake_case")]
pub enum QEType {
    TS,
    WS
}

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
    pub time: NaiveDateTime
}
/// Represents a new entry in `test`` table
/// 
/// Struct is deserialized from JSON
#[derive(Debug, Clone, Deserialize)]
pub struct NewTest {
    pub name: String,
    pub time: NaiveDateTime
}

/// Represents a row in `test_configs`
/// 
/// The struct will retrieve updates for configurations aligning
/// to a specific test as well as provide most recent configuration
/// settings.
/// 
/// # Fields
/// - `id` — Primary key linking this configuration to the corresponding `Test` entry in the `test` table.
/// - `cross` — Maximum wind speed in miles per hour (mph) for the cross section.
/// - `cross_type` — Type of velocity measurement for the cross section (`VelocityType` enum).
/// - `tail` — Maximum wind speed in mph for the tail section.
/// - `tail_type` — Type of velocity measurement for the tail section (`VelocityType` enum).
/// - `gun_orient` — Orientation of the gun in degrees around the circle (`DegreesCircle`).
/// - `tolerance` — Allowed tolerance as a percentage (`Percent`).
#[derive(Debug, Clone, FromRow, Serialize, Deserialize)]
pub struct TestConfiguration {
    pub id: i64,
    pub cross: i64,
    pub cross_type: VelocityType,
    pub tail: i64,
    pub tail_type: VelocityType,
    pub gun_orient: DegreesCircle,
    pub tolerance: Percent
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
#[derive(Debug, Clone, FromRow, Serialize, Deserialize)]
pub struct NewWeather {
    pub id: i64,
    pub site_id: i64, // weather site
    pub range: i64, // from gun position in meters
    pub altitude: i64, //meters
    pub gun_orient: DegreesCircle,
    pub qe: i64,
    pub qe_type: QEType,
    pub dodic: String,
    pub lot: String,
    pub wind_full: f64, // mph
    pub wind_direction: f64, //floating point degrees
    pub cross: f64, //mph
    pub tail: f64, //mph
    pub temp: f64, //degrees farenheit
    pub humidity: f64, //percent
    pub baro: f64, //inHg
    pub time: NaiveDateTime,
    pub test_id: i64, //FK
}