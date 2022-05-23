const request = require('supertest');
const should = require('should');
const app = require('./index');

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
                .expect(400)
                .end(done);
        });
    });
});