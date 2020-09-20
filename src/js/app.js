function Player(containerEl, {row = 5, cell = 5, name = ''}) {
  this.board = this.createBoard(row, cell);
  this.score = 0;
  this.name = name;

  this.result = {
    row: new Array(5).fill(0),
    cell: new Array(5).fill(0),
    left: 0,
    right: 0
  }

  if (document.getElementById(containerEl) === null) throw Error(`${containerEl}를 찾을 수 없습니다`);

  this.containerEl = document.getElementById(containerEl);
}

Player.prototype = {
  constructor: Player,
  createBoard: function(row, cell) {
    const numbers = [];
    this.board = [];

    for (let i = 1; i <= row * cell; i++) {
      numbers.push(i);
    }

    for (let i = 0; i < row; i++) {
      const board_row = [];
      for (let j = 0; j < cell; j++) {
        const idx = getRandomArbitrary(0, numbers.length - 1);
        board_row.push(numbers[idx]);
        numbers.splice(idx, 1);
      }
      this.board.push(board_row);
    }

    return this.board;
  },
  getResult: function(target) {
    const { result, board } = this;

    for (let i=0; i<board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === parseInt(target.textContent, 10)) {
          result.row[i]++;
          result.cell[j]++;

          if (i === j) {
            result.left++;
            if (i + j === 4) {
              result.right++;
            }
          } else if (i + j === 4) {
            result.right++;
          }
        }

      }
    }

    return this.getScoreString();
  },
  getScoreString: function() {
    const { result } = this;
    const resultCell = result.cell.filter(item => item === 5);
    const resultRow = result.row.filter(item => item === 5);

    this.score = resultCell.length + resultRow.length;

    if (result.left === 5) {
      this.score++;
    }

    if (result.right === 5) {
      this.score++;
    }

    return this.score;
  }
}


function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function CreateBoardUI({bingo, callback, player}) {
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

CreateBoardUI.prototype.addClassOfOtherBoard = function(boardEl, target) {
  Array.prototype.forEach.call(boardEl.children, (trEl) => {
    Array.prototype.forEach.call(trEl.children, (tdEl) => {
      if (tdEl.textContent === target.textContent) {
        tdEl.classList.add('active');
      }
    })
  })
}

// app
function App() {
  const mePlayerNameEl = document.getElementById('me-name');
  const youPlayerNameEl = document.getElementById('you-name');

  document.getElementById('start-button').addEventListener('click', (e) => {
    const me = new Player('me', {row: 5, cell: 5, name: mePlayerNameEl.value});
    const you = new Player('you', {row: 5, cell: 5, name: youPlayerNameEl.value});

    this.startGame(me, you);
    e.preventDefault();
  })
}

App.prototype.startGame = function(me, you) {
    const bingo = new Bingo([me.name, you.name]);
    const { history } = bingo;

    const callback = (target) => {
      if (history.includes(target.textContent)) return;

      bingo.activeHistory(target, 'game-history-box');

      const meResult = me.getResult(target);
      const youResult = you.getResult(target);
      me.containerEl.querySelector('.score-text').innerText = meResult;
      you.containerEl.querySelector('.score-text').innerText = youResult;


      if (meResult === 5 || youResult === 5) {
        alert('이겼습니다');
        this.resetGame();
      }
    }

    try {
      new CreateBoardUI({
        bingo,
        callback,
        player: me
      });

      new CreateBoardUI({
        bingo,
        callback,
        player: you
      });
    } catch (e) {
      console.log(e);
    }

    document.querySelector('.main-page').style.display = 'none';
    document.querySelector('.game-page').style.display = 'block';
}

App.prototype.resetGame = function () {
  [].map.call(document.querySelectorAll('.board'), preEle => {
    const cloneBoard = preEle.cloneNode(false);
    preEle.parentNode.replaceChild(cloneBoard, preEle)
  });

  [].map.call(document.querySelectorAll('.player-name'), item => item.value = '');
  document.querySelector('.game-history-box').innerHTML = '';

  document.querySelector('.main-page').style.display = 'block';
  document.querySelector('.game-page').style.display = 'none';
}


function Bingo([me, you]) {
  this.history = [];
  this.current = me;
  this.players = [me, you]
}

Bingo.prototype = {
  constructor: Bingo,
  activeHistory: function(target, historyBoxEl) {
    if (document.getElementById(historyBoxEl) === null) throw Error();
    this.historyBoxEl = document.getElementById(historyBoxEl);

    this.history.push(target.textContent);
    this.historyBoxEl.insertAdjacentHTML('beforeend', `<span>${target.textContent}</span>`)

    if (this.current === this.players[0]) {
      this.current =  this.players[1]
    } else {
      this.current = this.players[0]
    }

    return this.history;
  },
}

new App();


