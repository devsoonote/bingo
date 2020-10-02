import Player from "./player";

interface ICreateBoardUI {
    callback: (target: HTMLElement) => void;
    player: Player;
}

export default class CreateBoardUI implements  ICreateBoardUI{
    constructor(
        public callback: (target: HTMLElement) => void,
        public player: Player
    ) {

        // 보드판 UI
        this.createBoardElView(player, () => {
            const scoreEl: HTMLElement | null =  player.containerEl.querySelector('.score-text');
            const nameEl: HTMLElement | null = player.containerEl.querySelector('.game-board-name');
            this.createPlayerNameElView(nameEl, player.name);
            this.createScoreElView(scoreEl, player.score);
        });

        player.containerEl.querySelector('.board')?.addEventListener('click', (e: Event) => {
            callback.call(null, <HTMLElement>e.target);
        });
    }

    createBoardElView(player: Player, viewCallback: () => void) {
        if (!player) throw Error('player가 주입되지 않았습니다')

        for (let i = 0; i < player.board.length; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < player.board[0].length; j++) {
                const td = document.createElement('td');
                td.innerText = player.board[i][j].toString();
                tr.appendChild(td);
            }
            player.containerEl.querySelector('.board')?.appendChild(tr);
        }

        viewCallback.call(null);
    }

    createPlayerNameElView(nameEl: HTMLElement | null, name: string): void {
        if (!nameEl) throw Error('nameEl이 주입되지 않았습니다')
        if (!name) throw Error('name가 주입되지 않았습니다')

        nameEl.innerHTML = name;
    }

    createScoreElView(scoreEl: HTMLElement | null, score: number): void {
        if (!scoreEl) throw Error('scoreEl이 주입되지 않았습니다')
        if (score === undefined) throw Error('score가 주입되지 않았습니다')

        scoreEl.innerHTML = score.toString();
    }

}

