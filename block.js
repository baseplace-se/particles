class Block {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;

    }

    SetPos(x, y) {
        this.x = x;
        this.y = y;
    }
    GetGraphics() {
        let graphics = new PIXI.Graphics();
        graphics.lineStyle({width: 1, color:  0xFFFF00, alignment: 0.5});
        graphics.drawRoundedRect(this.x + 3, this.y + 3 , this.size - 6, this.size - 6);
        return graphics;
    }
}