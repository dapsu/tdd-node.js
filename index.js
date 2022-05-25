const express = require('express');
const morgan = require('morgan');
const user = require('./api/user');
const app = express();

// middleware
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}
app.use(express.json());     // for parsing application/json
app.use(express.urlencoded({ extended: true }));     // for parsing application/x-www-form-urlencoded

app.use('/users', user);

module.exports = app;