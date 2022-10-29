
class Grid {
    constructor(width, height, tileSize) {
        this.tileSize = tileSize;
        this.width = width;
        this.height = height;
        this.gridSizeX = this.width / this.tileSize;
        this.gridSizeY = this.height / this.tileSize;
        this.draggingPos = null;
        this.dragging = false;

        this.blockGrid = new Array(this.gridSizeX); 
        for (var i = 0; i < this.gridSizeX; i++) {
            this.blockGrid[i] = new Array(this.gridSizeY);
        }

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

        this.container.on('pointerdown', (event) => {
            input.inputMouseDown(true);
        });

        this.container.on('pointerup', (event) => {
            input.inputMouseDown(false);
        });
    }

    CalculateGridPos(x, y) {
        let gridX  = Math.floor(x / this.tileSize);
        let gridY  = Math.floor(y / this.tileSize);
        return {x: gridX, y: gridY};
    }
    SetBlock(x, y) {
        let gridPos = this.CalculateGridPos(x, y);
        this.blockGrid[gridPos.x][gridPos.y] = true;
    }

    SetDraggingPos(x, y, gridPosX, gridPosY) {
        if (this.draggingPos == null) {
            this.draggingPos = new PIXI.Point({x: x, y: y});
        } else {
            this.draggingPos.x = x;
            this.draggingPos.y = y;
        }
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

                let gridPos = this.CalculateGridPos(xPos, yPos);
                if (this.blockGrid[gridPos.x][gridPos.y] == true) {
                    let graphics2 = new PIXI.Graphics();
                    graphics2.lineStyle({width: 1, color:  0xFFFF00, alignment: 0.5});
                    graphics2.drawRoundedRect(xPos + 3, yPos + 3 , this.tileSize - 6, this.tileSize - 6);
                    this.container.addChild(graphics2);
                }
            }
        }

        if (this.dragging == true) {
            let graphics = new PIXI.Graphics();
            graphics.lineStyle({width: 1, color:  0xFFFF00, alignment: 0.5});
            graphics.drawRoundedRect(this.draggingPos.x - (this.tileSize / 2), this.draggingPos.y - (this.tileSize / 2), this.tileSize - 6, this.tileSize - 6);
            this.container.addChild(graphics);
        }
    }
}