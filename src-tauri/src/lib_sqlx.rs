//! # lib_sqlx
//! 
//! This module provides the core logic for handling database operations
//! including connection setup, query execution, and public interfaces.
//! 
//! ## Structure
//! - [`handler`] — Contains Tauri command definitions for frontend access.
//! - [`queries`] — SQL query builders and database logic.
//! - [`schema`] — Database initialization and connection helpers.
//! - [`models`] — Data structures representing database entities.

pub mod schema;
pub mod queries;
pub mod models;
pub mod handler;

//internal module imports
use queries::*;
use schema::DbPool;
use models::{NewSession, Session};

// public module imports
pub use schema::init_db;

// Re-export tauri commands that are library specific via handlers
pub use handler::get_users_command;