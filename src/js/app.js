function Gamer(row, cell, elId, name = '플레이어') {
  let _board = createBoard(row, cell);
  let _score = 0;
  let _name = name;
  const scoreId = document.getElementById(elId);
  const _result = {
    row: new Array(5).fill(0),
    cell: new Array(5).fill(0),
    left: 0,
    right: 0
  };

  function getResult(target) {
    for (let i=0; i<this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === parseInt(target.textContent, 10)) {
          _result.row[i]++;
          _result.cell[j]++;

          if (i === j) {
            _result.left++;
            if (i + j === 4) {
              _result.right++;
            }
          } else if (i + j === 4) {
            _result.right++;
          }
        }

      }
    }

    const resultCell = _result.cell.filter(item => item === 5);
    const resultRow = _result.row.filter(item => item === 5);

    this.score = resultCell.length + resultRow.length;

    if (_result.left === 5) {
      this.score++;
    }

    if (_result.right === 5) {
      this.score++;
    }
  }

  return {
    get score() {
      return _score;
    },
    get board() {
      return _board
    },
    set board(v) {
      _board = v;
    },
    set score(v) {
      _score = v;
      scoreId.innerText = this.score;
    },
    get name() {
      return _name
    },
    getResult
  }
}

function createBoard(row, cell) {
  const numbers = [];
  const board = [];

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
    board.push(board_row);
  }

  return board;
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


document.getElementById('start-button').addEventListener('click', function(e) {
  //1. board 생성
  const meName = document.getElementById('me-name').value;
  const youName = document.getElementById('you-name').value;
  const me = new Gamer(5, 5, 'me-score', meName);
  const you = new Gamer(5, 5, 'you-score', youName);
  let current = 'me';
  const history = [];
  document.getElementById('me-name-box').innerHTML = me.name;
  document.getElementById('you-name-box').innerHTML = you.name;

  //2. 빙고 스코어 init
  const meScore = document.getElementById('me-score');
  const youScore = document.getElementById('you-score');
  meScore.innerText = me.score;
  youScore.innerText = you.score;


  //2. board ui 뿌리기 insertAdjacentHTML, appendChild 비교하기
  createBoardUI({elId: 'you-board', gamer: you}, function(target) {
    if (current === 'you') {
     if (history.includes(target.textContent)) return;

      activeHistory(target, history);
      const boardEl = document.getElementById('me-board');

      // css 변경
      target.classList.add('active');
      addClassOfOtherBoard(boardEl, target);

      me.getResult(target);
      you.getResult(target);
      current = 'me';

      // 여기서 생성자함수를 다 지우려면, clone을
      if (me.score === 5 || you.score === 5) {
        alert('이겼습니다');
        resetGame();
      }

    } else {
      alert('현재 차례가 아닙니다. 순서를 기다리세요');
    }
  });

  createBoardUI({elId: 'me-board', gamer: me}, function (target) {
    if (current === 'me') {
      if (history.includes(target.textContent)) return;

      activeHistory(target, history);
      const boardEl = document.getElementById('you-board');

      // css 변경
      target.classList.add('active');
      addClassOfOtherBoard(boardEl, target);

      me.getResult(target);
      you.getResult(target);
      current = 'you';

      if (me.score === 5 || you.score === 5) {
        alert('이겼습니다');
        resetGame();
      }

    } else {
      alert('현재 차례가 아닙니다. 순서를 기다리세요');
    }
  });

  //3. css 수정
  document.querySelector('.main-page').style.display = 'none';
  document.querySelector('.game-page').style.display = 'block';
});

document.getElementById('restart-btn').addEventListener('click', resetGame)

function resetGame() {
  const preBoard1 = document.getElementById('you-board');
  const preBoard2 = document.getElementById('me-board')
  const cloneBoard1 = preBoard1.cloneNode(false);
  const cloneBoard2 = preBoard2.cloneNode(false);
  preBoard1.parentNode.replaceChild(cloneBoard1, preBoard1)
  preBoard2.parentNode.replaceChild(cloneBoard2, preBoard2)

  document.querySelector('#you-name').value = '';
  document.querySelector('#me-name').value = '';
  document.querySelector('.game-history-box').innerHTML = '';
  document.querySelector('.main-page').style.display = 'block';
  document.querySelector('.game-page').style.display = 'none';
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

function activeHistory(target, history) {
  const historyBoxEl = document.querySelector('.game-history-box');

  history.push(target.textContent);
  historyBoxEl.insertAdjacentHTML('beforeend', `<span>${target.textContent}</span>`)

  return history;
}

function createBoardUI(options, callback) {
  const { elId, gamer } = options;
  const boardEl = document.getElementById(elId);
  const { board } = gamer;

  if (boardEl === null) throw Error(`${elId}가 존재하지 않습니다`);

  for (let i = 0; i <board.length; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j <board[0].length; j++) {
      const td = document.createElement('td');
      td.innerText = board[i][j];
      td.name = board[i][j];
      tr.appendChild(td);
    }
    boardEl.appendChild(tr);
  }

  boardEl.addEventListener('click', function(e) {
    callback.call(null, e.target);
  });

}




