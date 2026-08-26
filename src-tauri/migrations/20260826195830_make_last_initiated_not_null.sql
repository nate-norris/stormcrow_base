CREATE TABLE last_test_new (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    last_test_name VARCHAR(30),
    last_initiated INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
);

INSERT INTO last_test_new (
    id,
    last_test_name,
    last_initiated
)
SELECT
    id,
    last_test_name,
    COALESCE(last_initiated, strftime('%s', 'now'))
FROM last_test;

DROP TABLE last_test;

ALTER TABLE last_test_new RENAME TO last_test;