const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3333;

app.use(express.static(path.join(__dirname, '/')))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/html/index.html`);
});

app.get('/todo', (req, res) => {
    res.sendFile(`${__dirname}/html/todo.html`);
});

app.get('/json', (req, res) => {
    res.sendFile(`${__dirname}/html/json.html`);
});


app.listen(port, () => {
    console.log('Application listening on port 3333!');
});