//! # lib_sqlx
//! 
//! This module provides the core logic for handling database operations
//! including connection setup, query execution, and public interfaces.
//! 
//! ## Structure
//! - [`handler`] — Contains Tauri command definitions for frontend access.
//! - [`q_filename`] — SQL query builders and database logic for specific queries.
//! - [`schema`] — Database initialization and connection helpers.
//! - [`models`] — Data structures representing database entities.

pub mod schema;
pub mod models;
pub mod handler;

// //internal module imports
pub(crate) mod q_tests;
pub(crate) mod q_configs;
pub(crate) mod q_qe;
use schema::DbExec;
use models::{NewTest, QEBase};

// Re-export tauri commands that are library specific via handlers
pub use schema::{DbPool, init_db};
pub use models::{Test, TestConfiguration};
pub use handler::{initiate_test, get_last_test, get_tests, delete_test, update_configuration};