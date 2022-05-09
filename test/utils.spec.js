/**
 * 일반적으로 자바스크립트 파일에서 .spec 이 붙으면 테스트 코드라고 보면 된다.
 * 명세서, 요구사항
 */

const utils = require('./utils');
const should = require('should');

// 테스트 환경
describe('utils.js 모듈의 capitalize() 함수는 ', () => {
    it('문자열의 첫 번째 문자를 대문자로 변환한다', () => {
        // 실제 테스트 코드 작성. 검증할 수 있는 모듈 필요
        const result = utils.capitalize('hey');
        result.should.be.equal('Hey');      // should 이용으로 테스트 코드의 가독성 향상
    });
});

