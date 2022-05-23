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
    req.query.limit = req.query.limit || 10;        // limit의 값이 없다면 10
    const limit = parseInt(req.query.limit, 10);      // 리퀘스트의 쿼리스트링에서 limit의 value 담기
    if (Number.isNaN(limit)) return res.status(400).end();
    res.json(users.slice(0, limit));
});

app.get('/users/:id', function(req, res) {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();
    const user = users.filter((user) => user.id === id)[0];
    if (!user) return res.status(404).end();
    res.json(user);
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
})

module.exports = app;