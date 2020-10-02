import Player from "./player";

interface IBingo {
    playersOptions: Player[]
}

export default class Bingo implements IBingo {
    public history: number[];
    public current: Player;
    public players: Player[];

    constructor(
        public playersOptions: Player[]
    ) {
        const [me, ] = playersOptions;
        this.history = [];
        this.current = me;
        this.players = playersOptions
    }

    changeCurrent(): void {
        if (this.current === this.players[0]) {
            this.current =  this.players[1]
        } else {
            this.current = this.players[0]
        }
    }

    activeHistory(target: HTMLElement): number[] {
        this.history.push(Number(<string>target.textContent));
        this.changeCurrent();

        return this.history;
    }

    activeClass(target: HTMLElement): void {
        if(this.current.containerEl !== target.parentNode?.parentNode?.parentNode) {
            alert('현재 차례가 아닙니다')
            return
        }

        target.classList.add('active');
        const boards: HTMLCollectionOf<Element> = document.getElementsByClassName('board');
        const otherBoard = [].reduce.call(boards, (acc: any, cur: HTMLElement) => cur !== target.parentNode?.parentNode ? cur : acc, {} as Record<any, HTMLElement>);
        this.addClassOfOtherBoard(otherBoard, target);
    }

    addClassOfOtherBoard(boardEl: HTMLElement, target: HTMLElement): void{
        Array.prototype.forEach.call(boardEl?.children, (trEl: HTMLElement) => {
            Array.prototype.forEach.call(trEl.children, (tdEl: HTMLElement) => {
                if (tdEl.textContent === target.textContent) {
                    tdEl.classList.add('active');
                }
            })
        })
    }

    updateHistoryView(historyBoxEl: Element | null, target: HTMLElement) {
        if (!historyBoxEl) throw Error('historyBoxEl가 주입되지 않았습니다');
        if (!target) throw Error('target이 주입되지 않았습니다');

        this.activeClass(target);
        this.activeHistory(target);
        historyBoxEl.insertAdjacentHTML('beforeend', `<span>${this.history[this.history.length - 1]}</span>`)
    }
}
