import GameEngine from "../game/GameEngine.js";

export default class Animate {
    static objToAnimate = [];

    constructor(gameEngine, canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.gameEngine = gameEngine;
    }

    lastTime = 0;
    animate(time) {
        // time c'est le temps écoulé depuis le début de la première exécution de cette fonction
        // en millisecondes mais avec une précision au millième de milliseconde
        // Pour l'animation basée sur le temps, on va calculer le temps écoule
        // entre deux images
        const delta = time - this.lastTime;

        // on va utiliser ce delta pour calculer la distance des déplacement de tous les objets
        // formule v = distance / temps, du coup si on connait temps, et si les objets ont une
        // vitesse en pixels par seconde, on peut calculer d = v * temps

        //console.log(delta);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (GameEngine.getInstance() === null) {
            return;
        }

        for (const obj of Animate.objToAnimate) {
            if (!obj.state) continue;
            obj.animate(this.ctx);
        }
        this.lastTime = time;
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