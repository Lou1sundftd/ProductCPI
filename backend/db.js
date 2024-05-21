const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./prices.db');

// Create the prices table
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS prices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        item TEXT,
        price REAL
    )`);

    // Check if the table is empty
    db.get("SELECT COUNT(*) AS count FROM prices", (err, row) => {
        if (err) {
            console.error("Error checking table contents:", err.message);
            return;
        }

        if (row.count === 0) {
            // Table is empty, insert preset data
            const stmt = db.prepare("INSERT INTO prices (date, item, price) VALUES (?, ?, ?)");

            const presetData = [
                ['2024-02-21', 'GIGABYTE', 20726],
                ['2024-02-22', 'GIGABYTE', 20726],
                ['2024-02-23', 'GIGABYTE', 20726],
                ['2024-02-24', 'GIGABYTE', 20726],
                ['2024-02-25', 'GIGABYTE', 20726],
                ['2024-02-26', 'GIGABYTE', 20726],
                ['2024-02-27', 'GIGABYTE', 22490],
                ['2024-02-28', 'GIGABYTE', 22490],
                ['2024-02-29', 'GIGABYTE', 22490],
                ['2024-03-01', 'GIGABYTE', 22490],
                ['2024-03-02', 'GIGABYTE', 22490],
                ['2024-03-03', 'GIGABYTE', 22490],
                ['2024-03-04', 'GIGABYTE', 22490],
                ['2024-03-05', 'GIGABYTE', 22490],
                ['2024-03-06', 'GIGABYTE', 22490],
                ['2024-03-07', 'GIGABYTE', 22490],
                ['2024-03-08', 'GIGABYTE', 22490],
                ['2024-03-09', 'GIGABYTE', 22490],
                ['2024-03-10', 'GIGABYTE', 22490],
                ['2024-03-11', 'GIGABYTE', 22490],
                ['2024-03-12', 'GIGABYTE', 22490],
                ['2024-03-13', 'GIGABYTE', 22490],
                ['2024-03-14', 'GIGABYTE', 22490],
                ['2024-03-15', 'GIGABYTE', 22490],
                ['2024-03-16', 'GIGABYTE', 22490],
                ['2024-03-17', 'GIGABYTE', 22490],
                ['2024-03-18', 'GIGABYTE', 22490],
                ['2024-03-19', 'GIGABYTE', 22490],
                ['2024-03-20', 'GIGABYTE', 22490],
                ['2024-03-21', 'GIGABYTE', 22490],
                ['2024-03-22', 'GIGABYTE', 22490],
                ['2024-03-23', 'GIGABYTE', 22490],
                ['2024-03-24', 'GIGABYTE', 22490],
                ['2024-03-25', 'GIGABYTE', 22490],
                ['2024-03-26', 'GIGABYTE', 22490],
                ['2024-03-27', 'GIGABYTE', 22490],
                ['2024-03-28', 'GIGABYTE', 22490],
                ['2024-03-29', 'GIGABYTE', 22490],
                ['2024-03-30', 'GIGABYTE', 21090],
                ['2024-03-31', 'GIGABYTE', 21090],
                ['2024-04-01', 'GIGABYTE', 21090],
                ['2024-04-02', 'GIGABYTE', 21090],
                ['2024-04-03', 'GIGABYTE', 20990],
                ['2024-04-04', 'GIGABYTE', 20990],
                ['2024-04-05', 'GIGABYTE', 20990],
                ['2024-04-06', 'GIGABYTE', 20990],
                ['2024-04-07', 'GIGABYTE', 20990],
                ['2024-04-08', 'GIGABYTE', 20990],
                ['2024-04-09', 'GIGABYTE', 20990],
                ['2024-04-10', 'GIGABYTE', 20990],
                ['2024-04-11', 'GIGABYTE', 20990],
                ['2024-04-12', 'GIGABYTE', 20990],
                ['2024-04-13', 'GIGABYTE', 20990],
                ['2024-04-14', 'GIGABYTE', 20990],
                ['2024-04-15', 'GIGABYTE', 20990],
                ['2024-04-16', 'GIGABYTE', 20990],
                ['2024-04-17', 'GIGABYTE', 20990],
                ['2024-04-18', 'GIGABYTE', 20990],
                ['2024-04-19', 'GIGABYTE', 20990],
                ['2024-04-20', 'GIGABYTE', 20990],
                ['2024-04-21', 'GIGABYTE', 20990],
                ['2024-04-22', 'GIGABYTE', 20990],
                ['2024-04-23', 'GIGABYTE', 20990],
                ['2024-04-24', 'GIGABYTE', 20990],
                ['2024-04-25', 'GIGABYTE', 20990],
                ['2024-04-26', 'GIGABYTE', 20990],
                ['2024-04-27', 'GIGABYTE', 20990],
                ['2024-04-28', 'GIGABYTE', 20990],
                ['2024-04-29', 'GIGABYTE', 20990],
                ['2024-04-30', 'GIGABYTE', 20990],
                ['2024-05-01', 'GIGABYTE', 20990],
                ['2024-05-02', 'GIGABYTE', 20990],
                ['2024-05-03', 'GIGABYTE', 20990],
                ['2024-05-04', 'GIGABYTE', 20990],
                ['2024-05-05', 'GIGABYTE', 20990],
                ['2024-05-06', 'GIGABYTE', 20990],
                ['2024-05-07', 'GIGABYTE', 20990],
                ['2024-05-08', 'GIGABYTE', 20990],
                ['2024-05-09', 'GIGABYTE', 20990],
                ['2024-05-10', 'GIGABYTE', 20990],
                ['2024-05-11', 'GIGABYTE', 20990],
                ['2024-05-12', 'GIGABYTE', 20990],
                ['2024-05-13', 'GIGABYTE', 20990],
                ['2024-05-14', 'GIGABYTE', 20990],
                ['2024-05-15', 'GIGABYTE', 19990],
                ['2024-05-16', 'GIGABYTE', 20990],
                ['2024-05-17', 'GIGABYTE', 20990],
                ['2024-05-18', 'GIGABYTE', 20990],
                ['2024-05-19', 'GIGABYTE', 20990],
                ['2024-05-20', 'GIGABYTE', 20990],
                ['2024-05-21', 'GIGABYTE', 20990],
                ['2024-05-22', 'GIGABYTE', 20990]
            ];


            presetData.forEach(data => {
                stmt.run(data);
            });

            stmt.finalize();
        }
    });
});

module.exports = db;