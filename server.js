const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3333;

app.use(express.static(path.join(__dirname, './')))
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}index.html`);
});

app.get('/json', (req, res) => {
    res.sendFile(`${__dirname}/json.html`);
});

app.listen(port, () => {
    console.log('Application listening on port 3333!');
});