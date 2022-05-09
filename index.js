const express = require('express');
const morgan = require('morgan');
const app = express();

const users = [
    {id: 1, name: '유재석'},
    {id: 2, name: '정준하'},
    {id: 3, name: '박명수'},
    {id: 4, name: '하하'},
];

app.use(morgan('dev'));

app.get('/users', function(req, res) {
    res.json(users);
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
})

module.exports = app;