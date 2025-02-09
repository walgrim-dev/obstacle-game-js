export default class LevelDesign {
    constructor(mapOfElements, canvas, ctx) {
        this.mapOfElements = mapOfElements;
        this.canvas = canvas;
        this.ctx = ctx;
        this.tilesWidth = Math.round(this.canvas.width / 20);
        this.tilesHeight = Math.round(this.canvas.height / 20);
    }

    generateLayers() {
        for (let i = 0; i < this.mapOfElements.length; i++) {
            for (let j = 0; j < this.mapOfElements.length; j++) {
                if (this.mapOfElements[i][j] === 2) {
                    this.ctx.save();
                    this.ctx.fillStyle = "red";
                    this.ctx.fillRect(i * this.tilesWidth, j * this.tilesHeight, this.tilesWidth, this.tilesHeight);
                    this.ctx.restore();
                }
            }
        }
    }
}