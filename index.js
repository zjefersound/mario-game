const canvas = document.getElementById('canvas')
canvas.height = window.innerHeight
canvas.width = window.innerWidth

const gravity = 1.5
const c = canvas.getContext('2d')

console.log(c);

class Player {
    constructor() {
        this.position = {
            x: 200,
            y: 200
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = 30
        this.height = 30
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        else this.velocity.y = 0

    }
}


const player = new Player()


function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
}
animate()

addEventListener('keydown', event => {
    switch (event.keyCode) {
        case 37: {
            player.velocity.x -= 1;
            console.log('left');
            break;
        }
        case 39: {
            console.log('right');
            player.velocity.x += 1;
            break;
        }
        case 38: {
            player.velocity.y -= 20
            console.log('up');
            break;
        }
        case 40: {
            console.log('down');
            break;
        }
    }
})

addEventListener('keyup', event => {
    switch (event.keyCode) {
        case 37: {
            player.velocity.x = 0;
            console.log('left');
            break;
        }
        case 39: {
            console.log('right');
            player.velocity.x = 0;
            break;
        }
    }
})