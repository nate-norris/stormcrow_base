// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// use tauri::{AppHandle, Manager};

fn main() {
    chinook_lib::run()
}
