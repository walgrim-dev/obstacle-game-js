export default class LevelDesign {
    constructor(mapOfElements, canvas, ctx) {
        this.mapOfElements = mapOfElements;
        this.canvas = canvas;
        this.ctx = ctx;
        this.tilesWidth = Math.round(this.canvas.width / 20);
        this.tilesHeight = Math.round(this.canvas.height / 20);
        this.basicPlayerPos = null;
    }

    generate() {
        for (let i = 0; i < this.mapOfElements.length; i++) {
            for (let j = 0; j < this.mapOfElements.length; j++) {
                if (this.mapOfElements[i][j] === -1) {
                    this.basicPlayerPos = {
                        x: i * this.tilesWidth,
                        y: j * this.tilesHeight
                    }
                }
                if (this.mapOfElements[i][j] === 2) {
                    this.ctx.save();
                    this.ctx.fillStyle = "red";
                    this.ctx.fillRect(i * this.tilesWidth, j * this.tilesHeight, this.tilesWidth, this.tilesHeight);
                    this.ctx.restore();
                }

                if (this.mapOfElements[i][j] === 3) {
                    this.ctx.save();
                    this.ctx.fillStyle = "blue";
                    this.ctx.fillRect(i * this.tilesWidth, j * this.tilesHeight, this.tilesWidth, this.tilesHeight);
                    this.ctx.restore();
                }

                if (this.mapOfElements[i][j] === 1) {
                    this.ctx.save();
                    this.ctx.fillStyle = "green";
                    this.ctx.fillRect(i * this.tilesWidth, j * this.tilesHeight, this.tilesWidth, this.tilesHeight);
                    this.ctx.restore();
                }
            }
        }
    }

    getPlayerPos = () => {
        if (this.basicPlayerPos === null) {
            throw new Error("Player position is not defined");
        }
        return this.basicPlayerPos;
    }
}