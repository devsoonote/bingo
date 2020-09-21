import Player from "./player";
import Bingo from "./bingo";
import CreateBoardUI from "./createBoardUI";

export default class App{
  constructor() {
    const mePlayerNameEl = document.getElementById('me-name');
    const youPlayerNameEl = document.getElementById('you-name');

    document.getElementById('start-button').addEventListener('click', (e) => {
      const me = new Player('me', {row: 5, cell: 5, name: mePlayerNameEl.value});
      const you = new Player('you', {row: 5, cell: 5, name: youPlayerNameEl.value});

      this.startGame(me, you);
      e.preventDefault();
    })
  }

  startGame(me, you){
    const bingo = new Bingo([me.name, you.name]);
    const { history } = bingo;

    try {
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

      new CreateBoardUI({ bingo, callback, player: me });
      new CreateBoardUI({ bingo, callback, player: you});
    } catch (e) {
      console.log(e);
    }

    document.querySelector('.main-page').style.display = 'none';
    document.querySelector('.game-page').style.display = 'block';
  }

  resetGame(){
    [].map.call(document.querySelectorAll('.board'), preEle => {
      const cloneBoard = preEle.cloneNode(false);
      preEle.parentNode.replaceChild(cloneBoard, preEle)
    });

    [].map.call(document.querySelectorAll('.player-name'), item => item.value = '');
    document.querySelector('.game-history-box').innerHTML = '';

    document.querySelector('.main-page').style.display = 'block';
    document.querySelector('.game-page').style.display = 'none';
  }
}




