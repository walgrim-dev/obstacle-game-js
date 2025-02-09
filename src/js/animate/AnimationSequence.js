export default class AnimationSequence {
    /**
     * Constructor
     * @param sequence Sequence of imgs
     * @param split
     */
    constructor(sequence) {
        this.sequence = sequence;
        this.currentFrame = 0;
    }

    nextFrame = () => {
        console.log(this.sequence.length);
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
}