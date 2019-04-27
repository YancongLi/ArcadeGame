// Enemies our player must avoid
const Enemy = function (x, y, speed) {
    // Setting the Enemy initial location 
    this.x = x;
    this.y = y;
    // Setting the Enemy speed
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > 530) {
        this.x = 0;
        this.speed = Math.random() * 256;
    }

    if (player.x < this.x + 60 && player.x + 38 > this.x &&
        player.y < this.y + 25 && player.y + 30 > this.y) {
        resetPlayerToCenter(player);
        setPrompt('fail');
    }
};

Enemy.prototype.setWarning = function () {
    document.querySelector('body').style.backgroundColor = 'red';
    setTimeout(function () {
        document.querySelector('body').style.backgroundColor = 'white';
    }, 300);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const resetPlayerToCenter = function (playerObj) {
    playerObj.x = 200;
    playerObj.y = 380;
};

const setPrompt = function (status) {
    let color;
    if (status === 'fail') {
        color = 'red';
    } else if (status === 'success') {
        color = 'GreenYellow';
    }
    document.querySelector('body').style.backgroundColor = color;
    setTimeout(function () {
        document.querySelector('body').style.backgroundColor = 'white';
    }, 300);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function (x, y, speed) {
    // Setting the Player initial location 
    this.x = x;
    this.y = y;
    // Setting the Player speed
    this.speed = speed;

    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function () {
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.y > 380) {
        this.y = 380;
    }
    if (this.y < 0) {
        resetPlayerToCenter(this);
        setPrompt('success');
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
    if (key === 'left') {
        this.x -= this.speed + 50;
    } else if (key === 'right') {
        this.x += this.speed + 50;
    } else if (key === 'up') {
        this.y -= this.speed + 30;
    } else if (key === 'down') {
        this.y += this.speed + 30;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const player = new Player(0, 0, 50);
resetPlayerToCenter(player);

let yPos = 60;
for (let i = 0; i < 3; i++) {
    allEnemies.push(new Enemy(0, yPos, Math.random() * 256));
    yPos += 80;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});