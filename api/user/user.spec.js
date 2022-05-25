// 테스트 코드

const request = require('supertest');
const should = require('should');
const app = require('../../index');

describe('GET /users는 ', () => {
    describe('성공 시', () => {
        it('유저 객체를 담은 배열로 응답한다', (done) => {  
        // it의 콜백함수로 done()을 사용하면 자동으로 비동기 테스트로 인식, 비동기 로직 완료 후 done()이 실행하면 테스트 완료
            request(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    done();
                });
        });
            
        it('최대 limit 갯수만큼 응답한다', (done) => {
            request(app)
                .get('/users?limit=2')  // 쿼리스트링 형식으로 파라미터 입력. 2개까지만 받겠다
                .end((err, res) => {
                    res.body.should.have.lengthOf(2);
                    done();
                });
        });
    });

    describe('실패 시', () => {
        it('limit이 숫자형이 아니면 상태 코드 400 응답', (done) => {
            request(app)
                .get('/users?limit=two')
                .expect(400)    // 에러 상태 코드를 작성할 때는 expect 사용
                .end(done);
        });
    });
});

describe('GET /users/:id는', () => {
    describe('성공 시', () => {
        it('id가 1인 유저 객체를 반환한다', (done) => {
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1);     // id 프로퍼티의 값이 1일 때
                    done();
                });
        });
    });

    describe('실패 시', () => {
        it('id가 숫자가 아닐 경우 400으로 응답한다', (done) => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done);
            });
            
        it('id로 유저를 찾을 수 없을 경우 404로 응답한다', (done) => {
            request(app)
                .get('/users/999')
                .expect(404)
                .end(done);
        });
    });
});

describe('DELETE /users/:id는', () => {
    describe('성공 시', () => {
        it('204를 응답한다', (done) => {
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done);
        });
    });

    describe('실패 시', () => {
        it('404를 응답한다', (done) => {
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done);
        });
    });
});

describe('POST /users', () => {
    describe('성공 시', (done) => {
        let body;
        // before(): 테스트케이스가 동작하기 전에 미리 실행되는 함수. 코드의 중복성 없애는데 효율적
        before(done => {
            request(app)
                .post('/users')
                .send({name: '노홍철'})
                .expect(201)
                .end((err, res) => {
                    body = res.body;
                    done();
                });
        })
        
        it('생성된 유저 객체를 반환한다', () => {
            body.should.have.property('id');
        });

        it('입력한 name을 반환한다', () => {
            body.should.have.property('name', '노홍철');
        });
    });

    describe('실패 시', () => {
        it('name 파라미터 누락 시 400을 반환한다', (done) => {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done);
        });
        
        it('name이 중복일 경우 409를 반환한다', (done) => {
            request(app)
                .post('/users')
                .send({name: '노홍철'})
                .expect(409)
                .end(done);
        });
    });
});

describe('PUt /users/:id', () => {
    describe('성공 시', () => {
        it('변경된 name을 응답한다', (done) => {
            request(app)
                .put('/users/4')
                .send({name: '정형돈'})
                .end((err, res) => {
                    res.body.should.have.property('name', '정형돈');
                    done();
                });
            });
    });

    describe('실패 시', () => {
        it('정수가 아닌 id일 경우 400 응답', (done) => {
            request(app)
                .put('/users/four')
                .expect(400)
                .end(done);
        });

        it('name이 없을 경우 400 응답', (done) => {
            request(app)
                .put('/users/2')
                .send({})
                .expect(400)
                .end(done);
        });

        it('없는 유저일 경우 404 응답', (done) => {
            request(app)
                .put('/users/999')
                .send({name: 'foo'})
                .expect(404)
                .end(done);
        });

        it('이름이 중복일 경우 409 응답', (done) => {
            request(app)
                .put('/users/2')
                .send({name: '정준하'})
                .expect(409)
                .end(done);
        });
    });
});