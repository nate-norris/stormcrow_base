-- Add migration script here
ALTER TABLE test_configs ADD COLUMN weapon_zone INTEGER;
ALTER TABLE test_configs ADD COLUMN weapon_hem CHARACTER(1);
ALTER TABLE test_configs ADD COLUMN weapon_east REAL;
ALTER TABLE test_configs ADD COLUMN weapon_north REAL;

ALTER TABLE test_configs ADD COLUMN target_zone INTEGER;
ALTER TABLE test_configs ADD COLUMN target_hem CHARACTER(1);
ALTER TABLE test_configs ADD COLUMN target_east REAL;
ALTER TABLE test_configs ADD COLUMN target_north REAL;