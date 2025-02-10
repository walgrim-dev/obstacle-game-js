import GameEngine from "../game/GameEngine.js";

export default class Animate {
    static objToAnimate = [];

    constructor(gameEngine, canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.gameEngine = gameEngine;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //this.gameEngine.level.generate();

        if (GameEngine.getInstance() === null) {
            return;
        }

        if (this.gameEngine.player.animation.pos === null) {
            this.gameEngine.player.animation.pos = this.gameEngine.level.getPlayerPos();
        }

        for (let obj of Animate.objToAnimate) {
            if (!obj.state) continue;
            obj.animate(this.ctx);
        }
        /**
         * Needs to animate :
         * Player moves
         * Obstacles
         * Techniquement l'idée c'est :
         *  - Chaque classe doit contenir la séquence
         *  - Le joueur est animé en fonction de la séquence
         *  - Pareil pour l'obstacle
         */
        /*
        let sequence = texture.textures.get("right");
        console.log(sequence.getX());
        this.ctx.drawImage(texture.spriteSheet, sequence.getX(), sequence.getY(), 16, 16, 0, 0, 16, 16);
         */
    }
}