//variable initializaation
var X = 200;
var Y = 400;

var height = [68, 151, 234];

var points = 0;
var livesRem = 3;


// Enemies our player must avoid
var Enemy = function() {

    this.speed = Math.floor(Math.random() * 200 + 10);
    this.x = -100;
    this.y = height[Math.floor(Math.random() * 3)];
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;

    // accident with the enemy
    if (this.x - X < 40 && this.x - X > 0 && this.y === Y) {
        this.collision();
    }

    // resets enemy when they cross the screen
    if (this.x > 500) {
        this.x = -100;
        // Randomize which line bug appears on.
        this.y = height[Math.floor(Math.random() * 3)];
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// accident due to collosion and reset the palyer position
Enemy.prototype.collision = function() {
    player.x = 200;
    player.y = 400;
    // decree lives due to collision
    livesRem = livesRem - 1;
    lives.update(livesRem);
    if (livesRem === 0) {
        document.write(
            "<h1 style= 'text-align: center'>Game over</h1>" +
            "<h2 style= 'text-align: center'>The score was " + points + "</h2>" )
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {

    this.x = X;
    this.y = Y;
    this.sprite = 'images/char-boy.png';
};


//Resets player position when they reach
// the water and increases their score.
Player.prototype.update = function(dt) {

    X = this.x;
    Y = this.y;
    if (Y < 60) {
        this.success();
    }
};

//increases score after success
Player.prototype.success = function() {
    this.x = 200;
    this.y = 400;
    points = points + 1;
    score.update(points);

};

Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

//Movement of player without crossing canvas
Player.prototype.handleInput = function(keys) {

    if (keys === "left" && this.x > 0) {
        this.x = this.x - 100;
    }
    if (keys === "right" && this.x < 400) {
        this.x = this.x + 100;
    }
    if (keys === "up" && this.y > 0) {
        this.y = this.y - 83;
    }
    if (keys === "down" && this.y < 400) {
        this.y = this.y + 83;
    }

    if (keys != "down" && keys != "up" && keys != "right" && keys != "left") {
        alert("Please use the arrow keys to move around the board");
    }
};




var Lives = function() {
    this.doc = document;
    this.livesHeading = this.doc.createElement('h2');
    this.doc.body.appendChild(this.livesHeading);
    this.node = this.doc.createTextNode("Lives: " + livesRem);
    this.livesHeading.appendChild(this.node);
};

Lives.prototype.update = function(livesRem) {
    this.h2 = this.doc.getElementsByTagName('h2');
    this.h2[1].firstChild.nodeValue = "Lives: " + livesRem;
};

var Score = function() {
    this.doc = document;
    this.scoreHeading = this.doc.createElement('h2');
    this.doc.body.appendChild(this.scoreHeading);
    this.node = this.doc.createTextNode("Score: " + points);
    this.scoreHeading.appendChild(this.node);
};

Score.prototype.update = function(points) {
    this.h2 = this.doc.getElementsByTagName('h2');
    this.h2[0].firstChild.nodeValue = "Score: " + points;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemy = new Enemy();
for (var i = 0; i <= 4; i++) {
    enemy = new Enemy();
    allEnemies[i] = new Enemy();
    allEnemies.push(enemy);
}
var player = new Player();
var score = new Score();
var lives = new Lives();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});