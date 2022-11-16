

class Blocks {
    constructor(gridWidth, gridHeight) {
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.container = new PIXI.Container();
        this.blockGrid = new Array(this.gridWidth); 
        for (var i = 0; i < this.gridWidth; i++) {
            this.blockGrid[i] = new Array(this.gridHeight);
        }

        this.blockList = new Array();

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

    SetBlock(x, y, tileSize) {
        let gridPos = this.CalculateGridPos(x, y, tileSize, tileSize);
        let realPos = this.CalculateRealPos(gridPos.x, gridPos.y, tileSize, tileSize);
        this.draggingBlock.SetPos(realPos.x, realPos.y);
        this.blockList.push(this.draggingBlock);
        this.blockGrid[gridPos.x][gridPos.y] = this.draggingBlock;
        this.draggingBlock = null;
    }

    SetDraggingPos(x, y, size) {
        let xOffset = x - (size / 2);
        let yOffset = y - (size / 2);

        if (this.draggingBlock == null) {
            this.draggingBlock = new Block(xOffset, yOffset, size);
        } else {
            this.draggingBlock.SetPos(xOffset, yOffset);
        }
    }

    IsGridPosMovable(x, y) {
        if(x < 0 || y < 0) {
            return false;
        }
        if(x >= this.gridWidth || y >= this.gridHeight) {
            return false;
        }
        return !(this.blockGrid[x][y] instanceof Block);
    }
    

    GetGraphics() {
        this.container.removeChildren().forEach((item) => {
            item.destroy();
        });

        this.blockList.forEach((block) => {
            this.container.addChild(block.GetGraphics());
        });

        if (this.draggingBlock != null) {
            this.container.addChild(this.draggingBlock.GetGraphics());
        }
        return this.container;
    }
}