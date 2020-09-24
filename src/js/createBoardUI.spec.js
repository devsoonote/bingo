import CreateBoardUI from "./createBoardUI";
import Player from "./player";

describe('createBoardUI()', () => {
  let createBoardUI, callback, me, meEl, scoreEl, score, nameEl, boardEl;

  beforeEach(() => {
    meEl = $('<div class="game-board" id="me">' +
        '<h3 class="game-board-name" id="me-name-box">Me</h3>' +
        '<table class="board" id="me-board"></table>' +
        '<div class="score-container">' +
        '<span>빙고: </span>' +
        '<span id="me-score" class="score-text">3</span>' +
        '</div>' +
        '</div>');
    $('body').append(meEl);

    const meId = document.querySelector('#me');
    me = new Player(meId, {row: 5, cell: 5, name: 'test1'});
    callback = function(target) {}
    scoreEl = document.querySelector('#me-score');
    score = 2;
    nameEl = document.querySelector('#me-name-box');
    boardEl = document.querySelector('.board')

    createBoardUI = new CreateBoardUI(callback, me);
  });

  afterEach(() => {
    meEl.remove()
  })

  describe('createBoardElView()의 negative test', () => {
    it('player가 주입되지 않으면 에러를 출력한다', () => {
      const actual = () => createBoardUI.createBoardElView();
      expect(actual).toThrowError();
    })
  })

  describe('createBoardElView()', () => {
    it('player의 컨테이너 안의 board에 5개의 tr이 생성된다', () => {
      expect(me.containerEl.querySelectorAll('tr').length).toBe(5)
    })

    it('player의 컨테이너 안의 board에 25개의 td가 생성된다', () => {
      expect(me.containerEl.querySelectorAll('td').length).toBe(25)
    })
  })

  describe('createScoreElView()의 negative test', () => {
    it('scoreEl가 주입되지 않으면 에러를 출력한다', () => {
      const actual = () => createBoardUI.createScoreElView(null, score);
      expect(actual).toThrowError();
    })
    it('score가 주입되지 않으면 에러를 출력한다', () => {
      const actual = () => createBoardUI.createScoreElView(scoreEl);
      expect(actual).toThrowError();
    })
  })

  describe('createScoreElView()', () => {
    it('scoreEl의 innerHTML과 주입된 score의 숫자가 동일하다', () => {
      createBoardUI.createScoreElView(scoreEl, score);
      expect(scoreEl.innerHTML).toBe(score.toString())
    })
  })

  describe('createPlayerNameElView()의 negative test', () => {
    it('nameEl가 주입되지 않으면 에러를 출력한다', () => {
      const actual = () => createBoardUI.createPlayerNameElView(null, me.name);
      expect(actual).toThrowError();
    })
    it('name가 주입되지 않으면 에러를 출력한다', () => {
      const actual = () => createBoardUI.createPlayerNameElView(nameEl, null);
      expect(actual).toThrowError();
    })
  })

  describe('createPlayerNameElView()', () => {
    it('nameEl의 innerHTML과 주입된 name이 동일하다', () => {
      createBoardUI.createPlayerNameElView(nameEl, me.name);
      expect(nameEl.innerHTML).toBe(me.name)
    })
  })

  // it('클릭이벤트가 일어나면, 콜백함수가 일어난다', () => {
  //   const observer = { callback }
  //   spyOn(observer, 'callback');
  //   me.containerEl.querySelector('.board').click();
  //   expect(observer.callback).toHaveBeenCalled();
  // })

})
