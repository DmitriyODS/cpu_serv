BEGIN;

CREATE TABLE IF NOT EXISTS cpu_info
(
    id        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    value     INTEGER NOT NULL DEFAULT 0,
    date_unix INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
);

UPDATE sqlite_sequence
SET seq = (SELECT MAX(id) FROM cpu_info)
WHERE name = 'cpu_info';

COMMIT;