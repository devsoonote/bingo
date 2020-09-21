class Bingo {
  constructor([me, you]) {
    this.history = [];
    this.current = me;
    this.players = [me, you]
  }

  activeHistory(target, historyBoxEl) {
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
  }
}
