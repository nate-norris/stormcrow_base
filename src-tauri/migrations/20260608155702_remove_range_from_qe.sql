-- up

CREATE TABLE qe_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    site_id INTEGER NOT NULL,
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

INSERT INTO qe_new (
    id, site_id, altitude, gun_orient, count,
    qe_type, dodic, lot,
    wind_full, wind_direction, cross, tail,
    temp, humidity, baro, time, test_id
)
SELECT
    id, site_id, altitude, gun_orient, count,
    qe_type, dodic, lot,
    wind_full, wind_direction, cross, tail,
    temp, humidity, baro, time, test_id
FROM qe;

DROP TABLE qe;

ALTER TABLE qe_new RENAME TO qe;