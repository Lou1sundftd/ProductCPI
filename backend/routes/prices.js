const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.all("SELECT * FROM prices", [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(rows);
    });
});

router.post('/', (req, res) => {
    const { date, item, price } = req.body;
    db.run("INSERT INTO prices (date, item, price) VALUES (?, ?, ?)", [date, item, price], function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": { id: this.lastID, date, item, price }
        });
    });
});

module.exports = router;
