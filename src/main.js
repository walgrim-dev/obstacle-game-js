import './style.css'

let objectTest = {
    name: 'test',
    func: null
}

objectTest.func = init;
console.log(objectTest);

objectTest.func;
window.onload = init;

const canvas = document.querySelector('#gameCanvas');

function init() {
    console.log('init');
    exec();
}

function exec() {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 400, 400);
}