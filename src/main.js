import './css/style.css'
import GameEngine from "./js/game/GameEngine.js";

addEventListener('load', exec);

/**
 * On DOM loaded
 */
function exec() {
    let gameEngine = new GameEngine('#gameCanvas');
    gameEngine.prepare();
    gameEngine.start();
}

/*
// Var declarations
let canvas;
let ctx;

let img = new Image();

/**
 * On load
 */
/*
addEventListener('load', exec);

function exec() {
    canvas = document.querySelector('#gameCanvas');
    ctx = canvas.getContext('2d');
    img.onload = function()  {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
    }
    img.src = 'img/sprites.gif';

    console.log(img.src);
}
*/