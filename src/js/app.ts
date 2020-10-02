import Player from "./player";
import Bingo from "./bingo";
import CreateBoardUI from "./createBoardUI";


export default class App{
    constructor() {
        const mePlayerNameEl = document.getElementById('me-name') as HTMLInputElement;
        const youPlayerNameEl = document.getElementById('you-name') as HTMLInputElement;
        const meEl = document.getElementById('me') as HTMLElement;
        const youEl = document.getElementById('you') as HTMLElement;

        document.getElementById('start-button')?.addEventListener('click', (e) => {
            const me = new Player(meEl, {row: 5, cell: 5, name: mePlayerNameEl.value});
            const you = new Player(youEl, {row: 5, cell: 5, name: youPlayerNameEl.value});

            this.startGame(me, you);
            e.preventDefault();
        })
    }

    startGame(me: Player, you: Player){
        const bingo = new Bingo([me, you]);
        const { history } = bingo;

        try {
            const callback = (target: HTMLElement) => {
                if (history.includes(Number(target.textContent))) return;

                const historyBoxEl = document.querySelector('#game-history-box');
                bingo.updateHistoryView(historyBoxEl, target);

                const meScoreEl = me.containerEl.querySelector('.score-text');
                const youScoreEl = you.containerEl.querySelector('.score-text');
                me.updateScoreEl(meScoreEl, target);
                you.updateScoreEl(youScoreEl, target);

                if (me.score === 5 || you.score === 5) {
                    alert('이겼습니다');
                    this.resetGame();
                }
            }

            new CreateBoardUI(callback, me);
            new CreateBoardUI(callback, you);
        } catch (e) {
            console.log(e);
        }

        const mainPage = document.querySelector('.main-page') as HTMLElement;
        const gamePage = document.querySelector('.game-page') as HTMLElement;
        mainPage.style.display = 'none';
        gamePage.style.display = 'block';
    }

    resetGame(){
        [].map.call(document.querySelectorAll('.board'), (preEle: HTMLElement) => {
            const cloneBoard = preEle.cloneNode(false);
            preEle.parentNode?.replaceChild(cloneBoard, preEle)
        });

        [].map.call(document.querySelectorAll('.player-name'), (item: HTMLInputElement) => item.value = '');
        const gameHistoryBox = document.querySelector('.game-history-box') as HTMLElement;

        const mainPage = document.querySelector('.main-page') as HTMLElement;
        const gamePage = document.querySelector('.game-page') as HTMLElement;
        gameHistoryBox.innerHTML = '';
        mainPage.style.display = 'block';
        gamePage.style.display = 'none';
    }
}




