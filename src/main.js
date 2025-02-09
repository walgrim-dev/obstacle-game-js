import './css/style.css'
import GameEngine from "./js/game/GameEngine.js";

addEventListener('load', exec);

/**
 * On load
 */
function exec() {
    let gameEngine = new GameEngine('#gameCanvas');
    gameEngine.launch();
}