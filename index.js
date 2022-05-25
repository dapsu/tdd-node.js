const express = require('express');
const morgan = require('morgan');
const app = express();

let users = [
    {id: 1, name: '유재석'},
    {id: 2, name: '정준하'},
    {id: 3, name: '박명수'},
    {id: 4, name: '하하'},
];

// middleware
app.use(morgan('dev'));
app.use(express.json());     // for parsing application/json
// app.use(express.urlencoded({ extended: true }));     // for parsing application/x-www-form-urlencoded

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

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();
    users = users.filter(user => user.id !== id);
    res.status(204).end();
});

app.post('/users', (req, res) => {
    const name = req.body.name;     // express는 body 프로퍼티 지원하지 않기 때문에 body-parser 모듈 필요
    if (!name) return res.status(400).end();
    const isConflict = users.filter(user => user.name === name).length;
    if (isConflict) return res.status(409).end();
    const id = Date.now();          // id는 고유한 값으로 설정해야 함. 임시로 현재 시간으로
    const user = {id, name};
    users.push(user);
    res.status(201).json(user);
});

app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) return res.status(400).end();

    const name = req.body.name;
    if (!name) return res.status(400).end();

    const isConflict = users.filter(user => user.name === name).length;
    if (isConflict) return res.status(409).end();

    const user = users.filter(user => user.id === id)[0];
    if (!user) return res.status(404).end();
    
    user.name = name;
    res.json(user);
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
})

module.exports = app;