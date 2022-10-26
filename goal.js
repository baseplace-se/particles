
class Goal {

    constructor() {
        this.pos = new PIXI.Point(0, 0);
        this.gridPos = new PIXI.Point(0, 0);
    }

    GetX() {
        return this.pos.x;
    }

    GetY() {
        return this.pos.y;
    }
}