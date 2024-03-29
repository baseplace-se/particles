
class Grid {
    constructor(width, height, tileSize) {
        this.tileSize = tileSize;
        this.width = width;
        this.height = height;
        this.gridSizeX = this.width / this.tileSize;
        this.gridSizeY = this.height / this.tileSize;
        this.draggingBlock = null;
        this.dragging = false;
        

        this.container = new PIXI.Container();

        this.container.hitArea = new PIXI.Rectangle(0, 0, this.tileSize * this.gridSizeX, this.tileSize * this.gridSizeY);
        this.container.interactive = true;

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

    CalculateGridPos(x, y, tileSizeX, tileSizeY) {
        let gridX  = Math.floor(x / tileSizeX);
        let gridY  = Math.floor(y / tileSizeY);
        return {x: gridX, y: gridY};
    }

    CalculateRealPos(gridX, gridY, tileSizeX, tileSizeY) {
        let x = gridX * tileSizeX;
        let y = gridY * tileSizeY;
        return {x: x, y:y}
    }


    

    GetGraphics() {        
        return this.container;
    }
}