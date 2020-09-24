export default class Bingo {
  constructor([me, you]) {
    this.history = [];
    this.current = me;
    this.players = [me, you]
  }

  changeCurrent() {
    if (this.current === this.players[0]) {
      this.current =  this.players[1]
    } else {
      this.current = this.players[0]
    }
  }

  activeHistory(target) {
    this.history.push(target.textContent);
    this.changeCurrent();

    return this.history;
  }

  activeClass(target) {
    if(this.current.containerEl !== target.parentNode.parentNode.parentNode) {
      alert('현재 차례가 아닙니다')
      return
    }

    target.classList.add('active');
    const boards = document.getElementsByClassName('board');
    const otherBoard = [].reduce.call(boards, (acc, cur) => cur !== target.parentNode.parentNode ? cur : acc);
    this.addClassOfOtherBoard(otherBoard, target);
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

  updateHistoryView(historyBoxEl, target) {
    if (!historyBoxEl) throw Error('historyBoxEl가 주입되지 않았습니다');
    if (!target) throw Error('target이 주입되지 않았습니다');

    this.activeClass(target);
    this.activeHistory(target);
    historyBoxEl.insertAdjacentHTML('beforeend', `<span>${this.history[this.history.length - 1]}</span>`)
  }
}
