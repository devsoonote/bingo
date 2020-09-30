export default {
    getRandomArbitrary(min:number = 0, max: number): number {
        if (!max) throw Error('max를 주입해주세요')

        return Math.floor(Math.random() * (max - min)) + min;
    }
}
