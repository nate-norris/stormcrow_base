-- +migrate Up
CREATE TABLE IF NOT EXISTS tests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(30) NOT NULL UNIQUE,
    time INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS test_configs (
    id INTEGER PRIMARY KEY,
    max_wind INTEGER NOT NULL,
    threshold_percent INTEGER NOT NULL,
    gun_orient INTEGER NOT NULL,
    expected_sites INTEGER NOT NULL,
    FOREIGN KEY(id) REFERENCES tests(id)
);

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

CREATE TABLE IF NOT EXISTS last_test (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    last_test_name VARCHAR(30),
    last_initiated INTEGER
);

INSERT INTO last_test (id, last_test_name)
VALUES (1, NULL)
ON CONFLICT(id) DO NOTHING;

-- +migrate Down
-- DROP TABLE IF EXISTS last_test;
-- DROP TABLE IF EXISTS qe;
-- DROP TABLE IF EXISTS test_configs;
-- DROP TABLE IF EXISTS tests;