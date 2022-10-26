
class Grid {
    constructor(width, height, tileSize) {
        this.tileSize = tileSize;
        this.width = width;
        this.height = height;
        this.gridSizeX = this.width / this.tileSize;
        this.gridSizeY = this.height / this.tileSize;

        this.container = new PIXI.Container();

        this.container.hitArea = new PIXI.Rectangle(0, 0, this.tileSize * this.gridSizeX, this.tileSize * this.gridSizeY);
        this.container.interactive = true;

        this.container.on("mousemove", (event) => {
            input.inputMousePos(event.data.global.x, event.data.global.y);
        });
        this.container.on("mouseout", (event) => {
            input.inputMouseBounds(false);
        });
        this.container.on("mouseover", (event) => {
            input.inputMouseBounds(true);
        });
    }



    Draw() {
        this.container.removeChildren().forEach((item) => {
            item.destroy();
        });

        for (let i = 0; i < this.gridSizeX; i++) {
            let xPos = i * this.tileSize;
            for (let y = 0; y < this.gridSizeY; y++) {
                let yPos = y * this.tileSize;
                let graphics = new PIXI.Graphics();
                graphics.lineStyle({width: 1, color:  0xFF0000, alignment: 0.5});
                graphics.drawRect(xPos, yPos, this.tileSize, this.tileSize);
                this.container.addChild(graphics);
            }
        }
    }
}