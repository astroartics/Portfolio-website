const start = document.querySelector('#startGame');
const fakeCanvas = document.querySelector('#fakeCanvas');
const fakeCanvas2 = document.querySelector('#fakeCanvas2');
const settings = document.querySelector('#settings');
const buttons = document.querySelector('#buttons');
const close = document.querySelector('#close');
const instructions = document.querySelector('#instructions');
const help = document.querySelector('#help');
const levelText = document.querySelector('#level');
const Game = document.querySelector('#Game');
const switchToKeyboard = document.querySelector('#switch');
const restart = document.querySelector('#restart');
const tiltScreen = document.querySelector('#tiltScreen');
let audio = new Audio();
const canvas = document.querySelector('#canvas1');
const context = canvas.getContext('2d');
const fakeContext = fakeCanvas2.getContext('2d');
let randomObjects = [];
let xSpeed = -1;
let playerSpeed = 10;
let player;
let x = y = j = 0;
let myAnimFrames = [];
let isRestart = 0;
let isMobileDevice;
let level = '-', score = '-';
let blockCount = 8;

function showImage() {
    let drawImage = () => {
        const image = new Image();
        image.src = "background.jpg";
        image.onload = () => {
            context.drawImage(image, 0, 0)
        }
    }

    drawImage();
    //context.fillRect(player.x, player.y, player.width, player.height);
    player.draw(player.x, player.y);
}

let balloon;
const drawBalloon = () => {
    balloon = new Image();
    balloon.src = "player.png";
    balloon.onload = () => {
        context.drawImage(balloon, x, y);
    }
}
drawBalloon();

class shape {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(x, y) {
        //context.fillRect(x, y, this.width, this.height);
        context.drawImage(balloon, x, y);
    }

    clear(x, y) {
        context.clearRect(x, y, 0, 0);
        showImage();
    }
}

class randomShape {
    constructor(x, y, width, height, top, right, bottom, left) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }

    draw(x, y) {
        context.fillRect(x, y, this.width, this.height);
    }

    clear(x, y, width, height) {
        context.clearRect(x, y, width, height);
        showImage();
    }
}

function VirtualKeys(showHide) {
    if (showHide == 0) {
        buttons.style.visibility = "hidden";
        switchToKeyboard.value = "1";
        Game.style.backgroundColor = "#464646";
        window.scrollTo(0, 0);
        switchToKeyboard.innerText = "Enable virtual keys";
        switchToKeyboard.style.backgroundColor = "rgb(163, 247, 163)";
    } else {
        buttons.style.visibility = "visible";
        switchToKeyboard.value = "0";
        Game.style.backgroundColor = "rgb(128, 208, 210)";
        switchToKeyboard.innerHTML = "Disable virtual keys";
        switchToKeyboard.style.backgroundColor = "rgb(246, 152, 152)";
    }
}

function mobileSettings() {
    audio.muted = true;
    switchToKeyboard.style.display = "none";
    buttons.style.visibility = "visible";
    Game.style.backgroundColor = "rgb(128, 208, 210)";
    document.body.style.overflowY = "scroll";
    settings.style.gridTemplateAreas = "'restart restart instruc instruc level level back close'";
    levelText.innerText = "Level : " + level + "  Score : " + score;
    VirtualKeys(1);
}

function randomBlocks() {
    for (let i = 0; i < blockCount; i++) {
        let randomWid = Math.abs(Math.floor(Math.random() * (100 - 10) + 20));
        let randomHei = Math.abs(Math.floor(Math.random() * (100 - 10) + 20));
        let randomX = Math.abs(Math.floor(Math.random() * (1700) + 850));
        let randomY = Math.abs(Math.floor(Math.random() * (600 - 10 + 1)));

        let randomTop = randomY;
        let randomRight = randomX + randomWid;
        let randomBottom = randomY + randomHei;
        let randomLeft = randomX;
        const randomObj = new randomShape(randomX, randomY, randomWid, randomHei, randomTop, randomRight, randomBottom, randomLeft);
        randomObjects[i] = randomObj;
    }
}

function checkCollision(object1, object2) {
    if ((object1.bottom >= object2.top && (object1.right >= object2.left && object1.right <= object2.right) && object1.top <= object2.bottom) || (object1.bottom >= object2.top && (object1.left >= object2.left && object1.left <= object2.right) && object1.top <= object2.bottom)) {
        object1.clear(object1.x, object1.y);
        showImage();
        const gameOver = new Image();
        gameOver.src = "gameOverBack.jpg";
        gameOver.onload = () => {
            fakeContext.drawImage(gameOver, 0, 0);
        }
        //fakeContext.fillStyle = 'white';
        fakeContext.font = "35px Arial";
        const colAudio = new Audio();
        colAudio.src = 'collision_buzzer.mp3';
        colAudio.play();
        audio.muted = true;
        switchToKeyboard.setAttribute('disabled', true);

        instructions.removeAttribute('disabled');
        help.setAttribute('href', 'instructions.html');
        instructions.style.backgroundColor = 'beige';
        fakeContext.fillText("Image may take some time to load...", 600, 300);
        //fakeContext.fillText("COLLISION DETECTED!", 600, 250);
        x = 0;
        y = 0;
        player.x = player.y = 0;
        VirtualKeys(0);
        canvas.style.display = "none";
        fakeCanvas2.style.display = "block";
        document.addEventListener('keydown', function (e) {
            e.stopPropagation();
        })
        setTimeout(function () {
            colAudio.muted = true;
        }, 2000);
        for (let i = 0; i < myAnimFrames.length; i++) {
            window.cancelAnimationFrame(myAnimFrames[i]);
            myAnimFrames[i] = undefined;
        }
        //fakeContext.font = "35px Arial";
        // fakeContext.fillText("You died on level : " + level, 700, 320);
        // fakeContext.fillText("Final Score : " + score, 700, 370);
        throw new Error("Collision");
    }
}


function restartGame(positionY, levelUp) {
    if (levelUp == 1) {
        let levelUpAudio = new Audio();
        levelUpAudio.src = "levelUp.mp3";
        levelUpAudio.play();
        level++;
        score += 10;
        xSpeed -= 1.2;
        blockCount += 2;
    } else {
        level = 1;
        score = 0;
        xSpeed = -1;
        blockCount = 8;
        isRestart = 1;
    }

    if (isMobileDevice) {
        levelText.innerText = "Level : " + level + "  Score : " + score;
    } else {
        levelText.innerText = "Level : " + level + "      Score : " + score;
    }

    audio.muted = false;
    context.clearRect(0, 0, canvas.width, canvas.height);
    showImage();
    x = 0;
    y = positionY;
    player.x = 0;
    player.y = positionY;
    player.top = y;
    player.right = x + player.width;
    player.bottom = y + player.height;
    player.left = x;
    player.draw(player.x, positionY);
    for (let i = 0; i < myAnimFrames.length; i++) {
        cancelAnimationFrame(myAnimFrames[i]);
        myAnimFrames[i] = undefined;
    }

    for (let i = 0; i < randomObjects.length; i++) {
        randomObjects[i].x = -randomObjects[i].width;
        randomObjects[i].right = 0;
    }

    randomBlocks();

    for (let i = 0; i < randomObjects.length; i++) {
        randomObjects[i].draw(randomObjects[i].x, randomObjects[i].y);
        randomBlockAnimation(randomObjects[i]);
    }

    if (isMobileDevice) {
        mobileSettings();
    }

    fakeCanvas2.style.display = "none";
    canvas.style.display = "grid";
    switchToKeyboard.removeAttribute('disabled');
}


function randomBlockAnimation(object) {
    let randomAnimate = () => {
        object.clear(object.x, object.y, object.width, object.height);
        showImage();
        object.x += xSpeed;
        object.left = object.x;
        object.right = object.x + object.width;
        object.draw(object.x, object.y);
        if (!isRestart) {
            checkCollision(player, object);
        }
        myAnimFrames[j++] = requestAnimationFrame(randomAnimate);

        if ((object.x + object.width) <= 0) {
            object.clear(object.x, object.y, object.width, object.height);
            showImage();
            for (let i = 0; i < randomObjects.length; i++) {
                if (randomObjects[i] == object) {
                    randomObjects.splice(i, 1);
                }
            }
        }

        if (randomObjects.length == 0) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            showImage();
            x = 0;
            player.x = 0;
            player.top = y;
            player.right = x + player.width;
            player.bottom = y + player.height;
            player.left = x;
            player.draw(player.x, player.y);
            randomBlocks();
            for (let i = 0; i < randomObjects.length; i++) {
                randomObjects[i].draw(randomObjects[i].x, randomObjects[i].y);
                randomBlockAnimation(randomObjects[i]);
            }
        }
    }
    randomAnimate();
}


window.addEventListener('load', function () {

    document.body.style.overflow = "hidden";
    fakeCanvas2.style.display = "none";
    let details = navigator.userAgent;
    let regexp = /android|iphone|kindle|ipad/i;
    isMobileDevice = regexp.test(details);
    restart.setAttribute('disabled', true);
    restart.style.backgroundColor = "";
    switchToKeyboard.setAttribute('disabled', true);

    if (isMobileDevice) {
        mobileSettings();
    } else {
        levelText.innerText = "Level : " + level + "      Score : " + score;
    }

    canvas.width = 1700;
    canvas.height = 600;
    fakeCanvas2.width = 1700;
    fakeCanvas2.height = 600;

    start.addEventListener('click', function () {

        level = 1;
        score = 0;
        instructions.setAttribute('disabled', true);
        help.setAttribute('href', '#');
        instructions.style.backgroundColor = 'rgb(203, 203, 182)';
        restart.removeAttribute('disabled');
        switchToKeyboard.removeAttribute('disabled');
        if (isMobileDevice) {
            levelText.innerText = "Level : " + level + "  Score : " + score;
        } else {
            levelText.innerText = "Level : " + level + "      Score : " + score;
        }
        start.style.display = "none";
        fakeCanvas.style.display = "none";
        fakeCanvas2.style.display = "none";
        canvas.style.display = "grid";

        player = new shape(x, y, 70, 80);
        player.top = y;
        player.right = x + player.width;
        player.bottom = y + player.height;
        player.left = x;
        player.draw(x, y);
        randomBlocks();
        for (let i = 0; i < randomObjects.length; i++) {
            randomObjects[i].draw(randomObjects[i].x, randomObjects[i].y);
            randomBlockAnimation(randomObjects[i]);
        }

        function animate(keyPressed) {
            isRestart = 0;
            let flag = 0;
            player.clear(x, y);
            showImage();
            if (keyPressed == 1) {
                if (y != 0) {
                    y -= playerSpeed;
                    flag = 0;
                } else {
                    flag = 1;
                }
            } else if (keyPressed == 2) {
                if (y != 520) {
                    y += playerSpeed;
                    flag = 0;
                } else {
                    flag = 1;
                }
            } else if (keyPressed == 3) {
                if (x != 0) {
                    x -= playerSpeed;
                    flag = 0;
                } else {
                    flag = 1;
                }
            } else if (keyPressed == 4) {
                if (x != 1630) {
                    x += playerSpeed;
                    flag = 0;
                } else {
                    flag = 1;
                }
            }

            player.x = x;
            player.y = y;
            player.top = y;
            player.left = x;
            player.right = x + (player.width);
            player.bottom = y + (player.height);

            if (player.right == 1700) {
                restartGame(player.y, 1);
            }

            player.draw(x, y);
            for (let i = 0; i < randomObjects.length; i++) {
                randomObjects[i].draw(randomObjects[i].x, randomObjects[i].y);
            }

            if (flag == 0) {
                audio.src = "button_click.mp3";
            } else {
                audio.src = 'error.mp3';
            }

            let audioPromise = audio.play();
            audioPromise.then(_ => { }).catch(error => { });
        }

        switchToKeyboard.addEventListener('click', function () {

            if ((switchToKeyboard.getAttribute('value')) === "0") {
                document.body.style.overflow = "hidden";
                VirtualKeys(0);

            } else {
                document.body.style.overflowY = "scroll";
                VirtualKeys(1);
            }
        });

        const up = document.querySelector("#upArr");
        up.addEventListener('click', function () {
            animate(1);
        });

        const down = document.querySelector("#downArr");
        down.addEventListener('click', function () {
            animate(2);
        });

        const left = document.querySelector("#leftArr");
        left.addEventListener('click', function () {
            animate(3);
        });

        const right = document.querySelector("#rightArr");
        right.addEventListener('click', function () {
            animate(4);
        });

        document.addEventListener('keydown', function (e) {
            e.preventDefault();
            if (e.key === "ArrowUp") {
                animate(1);
            } else if (e.key === "ArrowDown") {
                animate(2);
            } else if (e.key === "ArrowLeft") {
                animate(3);
            } else if (e.key === "ArrowRight") {
                animate(4);
            }
        });




    });

    restart.addEventListener('click', function () {
        instructions.setAttribute('disabled', true);
        help.setAttribute('href', '#');
        instructions.style.backgroundColor = 'rgb(203, 203, 182)';
        restartGame(0, 0);
    });
    close.addEventListener('click', function () {
        window.location.reload();
    });

    instructions.addEventListener('click', function () {
        window.location = "instructions.html";
    });

    //back.addEventListener('click', function () { window.location = "../Recruiter/"; })
});



/*
class Player {
        constructor(game) {
            this.game = game;
            this.width = 64;
            this.height = 86;
            this.x = 20;
            this.y = 100;
            this.speedX = 1;
        }

        update() {
            this.x += this.speedX;
        }

        draw(context) {
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.player = new Player(this);
        }

        update() {
            this.player.update();
        }

        draw(context) {
            this.player.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(context);
        //requestAnimationFrame(animate);
    }












    function animate1() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        y += ySpeed;
        context.fillRect(x, y, 60, 60);
        requestAnimationFrame(animate1);
        if (y == 0) {
            ySpeed = 0.5;
        } else if (y == 540) {
            ySpeed = -0.5;
        }
    }

    function animate2() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        x += xSpeed;
        context.fillRect(x, y, 60, 60);
        requestAnimationFrame(animate2);
        if (x == 0) {
            xSpeed = 0.5;
        } else if (x == 1640) {
            xSpeed = -0.5;
        }
    }
*/