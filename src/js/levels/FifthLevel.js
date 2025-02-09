import LevelDesign from "./LevelDesign.js";

export class FifthLevel extends LevelDesign {
    constructor(canvas, ctx) {
        let map = [
            [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
            [2,-1,0,0,2,0,0,3,0,0,0,2,0,0,2,0,3,0,0,2],
            [2,0,2,0,0,3,2,0,0,2,3,0,0,2,0,3,0,0,0,2],
            [2,0,0,0,2,0,0,0,3,0,0,0,2,0,0,2,0,3,0,2],
            [2,3,0,2,0,0,0,2,0,0,0,3,0,0,0,0,2,0,0,2],
            [2,0,0,3,0,3,0,0,0,2,0,0,0,0,3,0,0,0,0,2],
            [2,0,2,0,3,0,0,0,2,0,0,3,0,2,0,0,0,0,0,2],
            [2,0,0,0,0,0,2,3,0,0,0,0,2,0,0,3,0,3,2,2],
            [2,0,3,0,2,0,3,0,0,0,2,0,0,0,2,0,3,0,0,2],
            [2,3,0,2,0,0,0,3,0,2,0,0,3,0,0,0,0,0,3,2],
            [2,0,0,0,3,2,0,0,2,0,3,0,0,2,3,0,2,0,0,2],
            [2,2,3,0,0,0,0,0,0,3,0,2,0,0,0,3,0,0,0,2],
            [2,3,0,0,2,0,3,0,0,0,0,0,3,0,2,0,0,3,0,2],
            [2,0,2,3,0,0,0,0,3,2,0,0,0,0,0,2,0,0,0,2],
            [2,0,3,0,2,0,3,2,0,0,0,0,0,3,0,0,2,0,0,2],
            [2,2,0,0,3,0,2,0,0,0,3,2,0,0,0,3,0,0,0,2],
            [2,0,0,2,3,0,0,0,2,3,0,0,0,0,3,0,0,2,3,2],
            [2,0,3,0,0,0,0,3,0,0,0,0,2,0,0,0,0,0,0,2],
            [2,0,0,0,0,2,0,0,3,2,0,0,0,3,2,0,3,0,0,2],
            [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2]
        ];
        super(map, canvas, ctx);
    }

    nextLevel = () => {
        alert("Congratulations! You have completed all levels!");
    }
}