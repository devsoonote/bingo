import Bingo from "./bingo";
import Player from "./player";
import CreateBoardUI from "./createBoardUI";

describe('Bingo', () => {
  let bingo, me, you, target, historyBoxEl, meEl, youEl;

  beforeEach(() => {
    meEl = $('<div class="game-board" id="me">' +
          '<h3 class="game-board-name" id="me-name-box">Me</h3>' +
            '<table class="board" id="me-board"></table>' +
            '<div class="score-container">' +
              '<span>빙고: </span>' +
              '<span id="me-score" class="score-text">3</span>' +
            '</div>' +
        '</div>');
    youEl = $('<div class="game-board" id="you">' +
            '<h3 class="game-board-name" id="you-name-box">You</h3>' +
              '<table class="board" id="you-board"></table>' +
              '<div class="score-container">' +
                '<span>빙고: </span>' +
                '<span id="me-score" class="score-text">3</span>' +
              '</div>' +
        '</div>');

    $('body').append(youEl);
    $('body').append(meEl);

    const meId = document.querySelector('#me');
    const youId = document.querySelector('#you');

    me = new Player(meId, {row: 5, cell: 5, name: 'test1'});
    you = new Player(youId, {row: 5, cell: 5, name: 'test2'});
    bingo = new Bingo([me, you]);
    const callback = function(target) {}
    new CreateBoardUI(callback, me);
    new CreateBoardUI(callback, you);

    historyBoxEl = document.createElement('div');
    target = meId.querySelector('td');
  });

  afterEach(() => {
    meEl.remove();
    youEl.remove();
  })

  describe('activeHistory()', () => {
    it('history 배열에 클릭 값이 추가된다', () => {
      bingo.activeHistory(target);
      expect(bingo.history).toEqual([target.textContent]);
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

    // 현재 차례를 정하지 않음... 이거 변경하기
    it('activeClass()가 호출된다', () => {
      spyOn(bingo, 'activeClass');
      bingo.updateHistoryView(historyBoxEl, target);
      expect(bingo.activeClass).toHaveBeenCalled();
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

  describe('activeClass()', () => {
    it('addClassOfOtherBoard() 함수가 실행된다', () => {
      spyOn(bingo, 'addClassOfOtherBoard');
      bingo.activeClass(target);

      expect(bingo.addClassOfOtherBoard).toHaveBeenCalled();
    })
  })
});
