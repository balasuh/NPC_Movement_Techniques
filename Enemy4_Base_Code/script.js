// Canvas setup - The below line tells VSCode that this is a canvas project, which helps with auto-suggestions
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 800;
const numberOfEnemies = 10;
const enemiesArray = [];

let gameFrame = 0;

// enemy Class
class enemy {
    constructor() {
        this.image = new Image();
        this.image.src = './assets/enemy4.png'
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 213;
        this.spriteHeight = 213;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.x = Math.random() * (CANVAS_WIDTH - this.width);
        this.y = Math.random() * (CANVAS_HEIGHT - this.width);
        this.newX = Math.random() * (CANVAS_WIDTH - this.width);
        this.newY = Math.random() * (CANVAS_HEIGHT - this.height);
        this.frame = 0;
        this.flapSpeed = Math.ceil(Math.random() * 4 + 1);
        this.interval = Math.ceil(Math.random() * 200 + 50);
    }

    update() {
        if (gameFrame % this.interval === 0) {
            this.newX = Math.random() * (CANVAS_WIDTH - this.width);
            this.newY = Math.random() * (CANVAS_HEIGHT - this.height);
        };
        let dx = this.x - this.newX;
        let dy = this.y - this.newY;

        this.x -= dx / 80;
        this.y -= dy / 80;

        if ((this.x + this.width) < 0) this.x = canvas.width;

        // Animate Sprite
        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 3 ? this.frame = 0 : this.frame++;
        }

        if (gameFrame > 1000000000) {
            gameFrame = 0;
        }
    }

    draw() {
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

// enemy creation loop
for (let i = 0; i < numberOfEnemies; i++) {
    enemiesArray.push(new enemy());
}

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemiesArray.forEach((enemy) => {
        enemy.update();
        enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);
}

animate();
