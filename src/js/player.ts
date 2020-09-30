import utils from './utils';

interface IPlayer {
    containerEl: HTMLElement;
    options: IOptions;
}

interface IOptions {
    row: number;
    cell: number;
    name: string;
}

interface IResult {
    row: number[];
    cell: number[];
    left: number;
    right: number;
}

export default class Player implements IPlayer{
    public board: number[][];
    public score: number;
    public name: string;
    public result: IResult;

    constructor(
        public containerEl: HTMLElement,
        public options: IOptions
    ) {
        const {row = 5, cell = 5, name = ''} = options;
        if (!containerEl) throw Error(`containerEl가 주입되지 않았습니다`);

        this.board = this.createBoard(row, cell);
        this.score = 0;
        this.name = name;

        this.result = {
            row: new Array(5).fill(0),
            cell: new Array(5).fill(0),
            left: 0,
            right: 0
        }

        this.containerEl = containerEl;
    }

    createBoard(row: number, cell: number) {
        const numbers = [];
        this.board = [];

        for (let i = 1; i <= row * cell; i++) {
            numbers.push(i);
        }

        for (let i = 0; i < row; i++) {
            const board_row: number[] = [];
            for (let j = 0; j < cell; j++) {
                const idx: number = utils.getRandomArbitrary(0, numbers.length);
                board_row.push(numbers[idx]);
                numbers.splice(idx, 1);
            }
            this.board.push(board_row);
        }

        return this.board;
    }

    calculateResult(target: HTMLElement) {
        const { result, board } = this;

        for (let i = 0; i<board.length; i++) {
            board[i].forEach((j: number) => {
                if (board[i][j] === parseInt(<string>target.textContent, 10)) {
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
            })
        }

        return this.getScore();
    }

    getScore() {
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

    updateScoreEl(scoreEl: HTMLElement, target: HTMLElement) {
        if (!scoreEl) throw Error('scoreEl이 주입되지 않았습니다');
        if (!target) throw Error('target이 주입되지 않았습니다');

        scoreEl.innerHTML = String(this.calculateResult(target))
    }
}
