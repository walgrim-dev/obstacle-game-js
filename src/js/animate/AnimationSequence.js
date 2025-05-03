export default class AnimationSequence {
    /**
     * Constructor
     * @param sequence Sequence of imgs
     */
    constructor(sequence) {
        this.sequence = sequence;
        this.currentFrame = 0;
    }

    nextFrame = () => {
        if (this.currentFrame < this.sequence.length - 1) {
            this.currentFrame++;
        } else {
            this.currentFrame = 0;
        }
    }

    getX = () => {
        return this.sequence[this.currentFrame][0];
    }

    getY = () => {
        return this.sequence[this.currentFrame][1];
    }

    getCutSizeW = () => {
        return this.sequence[this.currentFrame][2];
    }

    getCutSizeH = () => {
        return this.sequence[this.currentFrame][3];
    }
}