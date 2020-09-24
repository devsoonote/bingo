import Player from "./player";
import utils from './utils';

describe('player', () => {
  let containerEl, player, row, cell, target, scoreEl;

  beforeEach(() => {
    containerEl = document.createElement('div');
    row = 5
    cell = 5
    player = new Player(containerEl, { row: row, cell: cell, name: 'player'});

    target = document.createElement('span');
    scoreEl = document.createElement('span');
    target.innerHTML = '1';
  })

  describe('negative test', () => {
    it('containerEl이 주입되지 않으면 에러를 출력한다', () => {
      const actual = () =>  new Player(null, { row: row, cell: cell, name: 'player'});
      expect(actual).toThrowError()
    });
  })

  describe('createBoard()', () => {
    it('row의 값과 board의 길이가 동일하다', () => {
      expect(player.board.length).toBe(row);
    });

    it('cell의 값과 board[0]의 길이가 동일하다', () => {
      expect(player.board[0].length).toBe(cell);
    });

    it('utils의 getRandomArbitrary() 함수가 실행된다', () => {
      spyOn(utils, 'getRandomArbitrary');
      player.createBoard(row, cell);
      expect(utils.getRandomArbitrary).toHaveBeenCalled();
    });
  });


  describe('calculateResult()', () => {
    it('getScore()의 함수가 실행된다', () => {
      spyOn(player, 'getScore');
      player.calculateResult(target);
      expect(player.getScore).toHaveBeenCalled();
    })
  });

  describe('getScore()', () => {
    it('player의 score를 반환한다', () => {
      expect(player.getScore()).toBe(player.score)
    })
  });

  describe('updateScoreEl()의 negative test', () => {
    it('scoreEl가 주입되지 않으면 에러를 출력한다', () => {
      const actual = () => player.updateScoreEl(null, target)
      expect(actual).toThrowError()
    });

    it('target이 주입되지 않으면 에러를 출력한다', () => {
      const actual = () => player.updateScoreEl(scoreEl, null)
      expect(actual).toThrowError()
    })
  });

  describe('updateScoreEl()', () => {
    it('scoreEl의 innerHTML과 player의 score는 같다', () => {
      player.updateScoreEl(scoreEl, target);
      expect(scoreEl.innerHTML).toBe(player.score.toString())
    })
  });
});
