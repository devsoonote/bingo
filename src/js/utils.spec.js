import utils from "./utils";

describe('utils', () => {
  describe('getRandomArbitrary()의 negative test', () => {
    it('max가 주입되지 않으면 에러를 출력한다', () => {
      const actual = () => utils.getRandomArbitrary(0)
      expect(actual).toThrowError();
    })
  });

  describe('getRandomArbitrary()', () => {
    it('숫자가 반환된다', () => {
      const randomNumber = utils.getRandomArbitrary(0, 10);
      const checkNumber = randomNumber >= 0 && randomNumber <= 10
      expect(checkNumber).toBe(true)
    })
  });
});
