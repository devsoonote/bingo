export default class CreateBoardUI{
  constructor(callback, player) {
    if (!(callback instanceof Function)) {
      throw new Error('콜백함수를 잘못 전달 받았습니다');
    }

    // 보드판 UI
    this.createBoardElView(player, () => {
      const scoreEl =  player.containerEl.querySelector('.score-text');
      const nameEl = player.containerEl.querySelector('.game-board-name');
      this.createPlayerNameElView(nameEl, player.name);
      this.createScoreElView(scoreEl, player.score);
    });

    player.containerEl.querySelector('.board').addEventListener('click', (e) => {
      callback.call(null, e.target);
    });
  }

  createBoardElView(player, viewCallback) {
    if (!player) throw Error('player가 주입되지 않았습니다')

    for (let i = 0; i < player.board.length; i++) {
      const tr = document.createElement('tr');
      for (let j = 0; j < player.board[0].length; j++) {
        const td = document.createElement('td');
        td.innerText = player.board[i][j];
        tr.appendChild(td);
      }
      player.containerEl.querySelector('.board').appendChild(tr);
    }

    viewCallback.call(null);
  }

  createPlayerNameElView(nameEl, name) {
    if (!nameEl) throw Error('nameEl이 주입되지 않았습니다')
    if (!name) throw Error('name가 주입되지 않았습니다')

    nameEl.innerHTML = name;
  }

  createScoreElView(scoreEl, score) {
    if (!scoreEl) throw Error('scoreEl이 주입되지 않았습니다')
    if (score === undefined) throw Error('score가 주입되지 않았습니다')

    scoreEl.innerHTML = score;
  }

}

