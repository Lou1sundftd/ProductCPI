const express = require('express');
const bodyParser = require('body-parser');
const pricesRouter = require('./routes/prices');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/api/prices', pricesRouter); // API
app.use(express.static('../frontend'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
