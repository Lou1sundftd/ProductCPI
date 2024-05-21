const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('../prices.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the prices database.');
});

db.serialize(() => {
    db.run(`DELETE FROM prices`, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('All data deleted from the prices table.');
    });
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Closed the database connection.');
});
