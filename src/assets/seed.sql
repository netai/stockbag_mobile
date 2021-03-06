CREATE TABLE IF NOT EXISTS holding (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    script VARCHAR(40) UNIQUE,
    exchange VARCHAR(3) NOT NULL,
    price REAL NOT NULL DEFAULT(0),
    target_price REAL NOT NULL DEFAULT(0),
    quantity INTEGER NOT NULL DEFAULT(0),
    period CHAR DEFAULT M NOT NULL,
    est_exit_date DATETIME NOT NULL,
    holding_type VARCHAR(5) DEFAULT buy NOT NULL,
    holding_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notes (
    id INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL,
    holding_id REFERENCES holding(id) NOT NULL,
    note TEXT,
    important BOOLEAN NOT NULL DEFAULT(0),
    note_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fund (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    total_amount REAL DEFAULT(0) NOT NULL,
    invested_amount REAL DEFAULT(0) NOT NULL
);

INSERT OR IGNORE INTO fund (id, total_amount, invested_amount) VALUES (1, 100000, 100000);