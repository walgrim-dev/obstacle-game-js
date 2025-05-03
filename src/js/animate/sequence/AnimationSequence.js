export default class AnimationSequence {
    /**
     * Constructor
     * @param {FatTile} fatTile Sequence of tiles
     */
    constructor(fatTile) {
        this.sequence = fatTile;
        this.currentFrame = 0;
    }

    /**
     * Next frame of the animation
     */
    nextFrame = () => {
        if (this.currentFrame < this.sequence.getNumberOfTiles() - 1) {
            this.currentFrame++;
        } else {
            this.currentFrame = 0;
        }
    }

    /**
     * Get the current frame of the animation
     * @returns {number}
     */
    getCurrentFrame = () => {
        return this.currentFrame;
    }

    /**
     * X
     * @returns {float} X coordinate of the tile
     */
    getX = () => {
        return this.sequence.getTile(this.currentFrame).coordinates.x;
    }

    /**
     * Y
     * @returns {float} X coordinate of the tile
     */
    getY = () => {
        return this.sequence.getTile(this.currentFrame).coordinates.y;
    }

    /**
     * Cut size W
     * @returns {float} X cut size of the tile
     */
    getCutSizeW = () => {
        return this.sequence.getTile(this.currentFrame).infos.cutSizeW;
    }

    /**
     * Cut size H
     * @returns {float} Y cut size of the tile
     */
    getCutSizeH = () => {
        return this.sequence.getTile(this.currentFrame).infos.cutSizeH;
    }
}