function Player({row = 5, cell = 5, name, containerEl}) {
  const _board = this.createBoard(row, cell);
  let _score = 0;
  const _name = name;

  this.result = {
    row: new Array(5).fill(0),
    cell: new Array(5).fill(0),
    left: 0,
    right: 0
  }

  if (document.getElementById(containerEl) === null) throw Error(`${containerEl}를 찾을 수 없습니다`);

  const scoreIdEl = document.getElementById(containerEl).getElementsByClassName('score-text');
  const nameIdEl = document.getElementById(containerEl).getElementsByClassName('game-board-name');
  this.boardEl = document.getElementById(containerEl).getElementsByClassName('board');

  nameIdEl.innerText = _name;

  return {
    get score() {
      return _score
    },
    set score(v) {
      _score = v;
    },
    get board() {
      return _board
    },
    get name() {
      return _name
    }
  }
}

Player.prototype.createBoard = function(row, cell) {
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
}

Player.prototype.createBoardUI = function(callback, current) {
  if (!(callback instanceof Function)) {
    throw new Error('콜백함수를 잘못 전달 받았습니다');
  }

  for (let i = 0; i < this.board.length; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < this.board[0].length; j++) {
      const td = document.createElement('td');
      td.innerText = this.board[i][j];
      td.name = this.boardEl[i][j];
      tr.appendChild(td);
    }
    this.boardEl.appendChild(tr);
  }

  this.boardEl.addEventListener('click', function(e) {
    if (current !== this.name) {
      alert('현재 차례가 아닙니다')
      e.preventDefault();
    }

    e.target.classList.add('active');
    const otherBoard = document.getElementsByClassName('board').reduce((acc, cur) => cur === this.boardEl ? acc : cur);
    addClassOfOtherBoard(otherBoard, e.target);
    this.getResult(e.target);

    callback.call(null, e.target);
  });
}

function addClassOfOtherBoard(boardEl, target) {
  Array.prototype.forEach.call(boardEl.children, (trEl) => {
    Array.prototype.forEach.call(trEl.children, (tdEl) => {
      if (tdEl.textContent === target.textContent) {
        tdEl.classList.add('active');
      }
    })
  })
}

Player.prototype.getResult = function(target) {
  const { result, board, scoreIdEl } = this;

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

  scoreIdEl.innerText = this.getScoreString();
}

Player.prototype.getScoreString = function() {
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

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// app
function App() {
  const meName = document.getElementById('me-name').value;
  const youName = document.getElementById('you-name').value;
  const me = new Player({
    name: meName,
    scoreEl: 'me-score',
    nameEl: 'me-name-box'
  });
  const you = new Player({
    name: youName,
    scoreEl: 'you-score',
    nameEl: 'you-name-box'
  });

  this.startGame(me, you);
}

App.prototype.startGame = function(me, you) {
  document.getElementById('start-button').addEventListener('click', () => {
    const bingo = new Bingo(me.name);
    const { history } = bingo;

    function callback(target) {
      if (history.includes(target.textContent)) return;

      bingo.activeHistory(target);
      bingo.current = bingo.current === me.name ? you.name : me.name;

      if (me.score === 5 || you.score === 5) {
        alert('이겼습니다');
        this.resetGame();
      }
    }

      me.createBoardUI(callback, bingo.current);
      you.createBoardUI(callback, bingo.current);

      document.querySelector('.main-page').style.display = 'none';
      document.querySelector('.game-page').style.display = 'block';
    })
}

App.prototype.resetGame = function () {
  document.querySelector('.board').map((preEle, i) => {
    const cloneBoard = preEle[i].cloneNode(false);
    preEle[i].parentNode.replaceChild(cloneBoard, preEle[i])
  })

  document.querySelector('.player-name').map(item => item.value = '')
  document.querySelector('.game-history-box').innerHTML = '';

  document.querySelector('.main-page').style.display = 'block';
  document.querySelector('.game-page').style.display = 'none';
}


function Bingo(current) {
  this.history = [];
  this.current = current;
}

Bingo.prototype.activeHistory = function(target, historyBoxEl) {
  if (document.getElementById(historyBoxEl) === null) throw Error();
  this.historyBoxEl = document.getElementById(historyBoxEl);

  this.history.push(target.textContent);
  this.historyBoxEl.insertAdjacentHTML('beforeend', `<span>${target.textContent}</span>`)

  return this.history;
}

new App();


