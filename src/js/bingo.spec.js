import Bingo from "./bingo";
import Player from "./player";

describe('Bingo', () => {
  let bingo, me, you, target, historyBoxEl;

  beforeEach(() => {
    const meEl = document.createElement('div');
    const youEl = document.createElement('div');
    me = new Player(meEl, {row: 5, cell: 5, name: 'test1'});
    you = new Player(youEl, {row: 5, cell: 5, name: 'test2'});
    bingo = new Bingo([me, you]);

    target = document.createElement('span');
    historyBoxEl = document.createElement('div');
    target.innerHTML = '1';

  });

  describe('activeHistory()', () => {
    it('history 배열에 클릭 값이 추가된다', () => {
      bingo.activeHistory(target);
      expect(bingo.history).toEqual(['1']);
    });

    it('changeCurrent()가 호출된다', () => {
      spyOn(bingo, 'changeCurrent');
      bingo.activeHistory(target);
      expect(bingo.changeCurrent).toHaveBeenCalled();
    });
  });

  describe('changeCurrent()', () => {
    it('현재 순서가 변경된다', () => {
      bingo.activeHistory(target);
      expect(bingo.current).toBe(you);
    });
  });

  describe('updateHistoryView()', () => {
    it('activeHistory()가 호출된다', () => {
      spyOn(bingo, 'activeHistory');
      bingo.updateHistoryView(historyBoxEl, target);
      expect(bingo.activeHistory).toHaveBeenCalled();
    });

    it('history의 내용이 출력된다', () => {
      bingo.updateHistoryView(historyBoxEl, target);
      expect(historyBoxEl.lastChild.textContent).toBe(target.textContent);
    })
  });

  describe('updateHistoryView()의 negative test', () => {
    it('historyBoxEl가 주입되지 않으면 에러를 출력한다', () => {
      const actual = () => bingo.updateHistoryView(null, target);
      expect(actual).toThrowError()
    });

    it('target이 주입되지 않으면 에러를 출력한다', () => {
      const actual = () => bingo.updateHistoryView(historyBoxEl, null);
      expect(actual).toThrowError()
    });
  });
});
