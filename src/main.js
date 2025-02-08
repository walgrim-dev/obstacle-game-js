import './style.css'

// Var declarations
let canvas;
let ctx;

/**
 * On load
 */
addEventListener('load', init);

let main = () => {
    const image = new Image();
    image.src = '../public/img/sprites.gif';
}
function init() {
    exec();
}

function exec() {
    canvas = document.querySelector('#gameCanvas');
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;
    //console.log(window.innerHeight - 20);
    console.log(canvas.height);
    ctx = canvas.getContext('2d');
    drawMonster(0,0);
    //ctx.strokeRect(0,0, canvas.width, 200);
}

function drawMonster(x, y) {
    // head
    ctx.save();
    ctx.translate(600,600);
    ctx.fillStyle='lightgreen';
    ctx.fillRect(x,y,200,200);
    // eyes
    ctx.fillStyle='red';
    ctx.fillRect(x+35,y+30,20,20);
    ctx.fillRect(x+140,y+30,20,20);
    // interior of eye
    ctx.fillStyle='yellow';
    ctx.fillRect(x+43,y+37,10,10);
    ctx.fillRect(x+143,y+37,10,10);
    // Nose
    ctx.fillStyle='black';
    ctx.fillRect(x+90,y+70,20,80);
    // Mouth
    ctx.fillStyle='purple';
    ctx.fillRect(x+60,y+165,80,20);
    ctx.restore();
}