'use strict';

require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.static(`${__dirname}/public`));
app.listen(process.env.port, () => {
});

app.use((req, res) => {
    res.status(404);
    res.send('Page not found');
});
