const isHas = [1, 2, 3].includes(2)

new Promise((resolve, reject) => {
    resolve(100)
})
;async () => {
    await setTimeout(() => {
        console.log('async fun is called')
    }, 2000)
}

class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    getX() {
        return this.x
    }
}

let cp = new Point(25, 8)
