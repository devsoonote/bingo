export default {
  getRandomArbitrary(min = 0, max) {
    if (!max) throw Error('max를 주입해주세요')

    return Math.floor(Math.random() * (max - min)) + min;
  }
}
