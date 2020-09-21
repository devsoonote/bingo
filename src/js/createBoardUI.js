export default class CreateBoardUI{
  constructor({bingo, callback, player}) {
    if (!(callback instanceof Function)) {
      throw new Error('콜백함수를 잘못 전달 받았습니다');
    }

    // 보드판 UI
    for (let i = 0; i < player.board.length; i++) {
      const tr = document.createElement('tr');
      for (let j = 0; j < player.board[0].length; j++) {
        const td = document.createElement('td');
        td.innerText = player.board[i][j];
        tr.appendChild(td);
      }
      player.containerEl.querySelector('.board').appendChild(tr);
    }

    // 점수판, 이름 UI
    player.containerEl.querySelector('.score-text').innerText = player.score;
    player.containerEl.querySelector('.game-board-name').innerText = player.name;

    player.containerEl.querySelector('.board').addEventListener('click', (e) => {
      if (bingo.current !== player.name) {
        alert('현재 차례가 아닙니다')
        return;
      }

      e.target.classList.add('active');
      const boards = document.getElementsByClassName('board');
      const otherBoard = [].reduce.call(boards, (acc, cur) => cur !== player.containerEl.querySelector('.board') ? cur : acc);
      this.addClassOfOtherBoard(otherBoard, e.target);

      callback.call(null, e.target);
    });
  }

  addClassOfOtherBoard(boardEl, target){
    Array.prototype.forEach.call(boardEl.children, (trEl) => {
      Array.prototype.forEach.call(trEl.children, (tdEl) => {
        if (tdEl.textContent === target.textContent) {
          tdEl.classList.add('active');
        }
      })
    })
  }
}

