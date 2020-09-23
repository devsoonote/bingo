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

  updateHistoryView(historyBoxEl, target) {
    if (!historyBoxEl) throw Error('historyBoxEl가 주입되지 않았습니다');
    if (!target) throw Error('target이 주입되지 않았습니다');

    this.activeHistory(target);
    historyBoxEl.insertAdjacentHTML('beforeend', `<span>${this.history[this.history.length - 1]}</span>`)
  }
}
