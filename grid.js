
class Grid {
    constructor(width, height, tileSize) {
        this.tileSize = tileSize;
        this.width = width;
        this.height = height;
        this.gridSizeX = this.width / this.tileSize;
        this.gridSizeY = this.height / this.tileSize;
        this.draggingBlock = null;
        this.dragging = false;
        this.movementDirections = [new PIXI.Point(1, 0), new PIXI.Point(-1, 0), new PIXI.Point(0, 1), new PIXI.Point(0, -1)];
        this.movementGrid = null;
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

    SetBlock(x, y) {
        let gridPos = this.CalculateGridPos(x, y, this.tileSize, this.tileSize);
        let realPos = this.CalculateRealPos(gridPos.x, gridPos.y, this.tileSize, this.tileSize);
        this.draggingBlock.SetPos(realPos.x, realPos.y);
        this.blockGrid[gridPos.x][gridPos.y] = this.draggingBlock;
        this.draggingBlock = null;
    }

    SetDraggingPos(x, y, gridPosX, gridPosY) {
        let xOffset = x - (this.tileSize / 2);
        let yOffset = y - (this.tileSize / 2);

        if (this.draggingBlock == null) {
            this.draggingBlock = new Block(xOffset, yOffset, this.tileSize);
        } else {
            this.draggingBlock.SetPos(xOffset, yOffset);
        }
    }

    // GetBlockGrid(gridX, gridY) {
    //     let blockGrid = new Array(this.gridSizeX); 
    //     for (var x = 0; x < this.gridSizeX; x++) {
    //         blockGrid[x] = new Array(this.gridSizeY);
    //         for (var y = 0; y < this.gridSizeY; y++ ) {

    //             blockGrid[x][y] = this.blockGrid[x][y] instanceof Block;
    //         }
    //         // blockGrid[i] = instanceof Block;
    //     }
    // }

    IsGridPosMovable(x, y) {
        if(x < 0 || y < 0) {
            return false;
        }
        if(x > this.gridSizeX || y > this.gridSizeY) {
            return false;
        }
        return !(this.blockGrid[x][y] instanceof Block);
    }
    ContainsPos(posList, pos) {
        let returnValue = false;
        posList.forEach(element => {
            if(element.x == pos.x && element.y == pos.y) {
                returnValue = true;
                return
            }
        });
        return returnValue;
    }

    CalculateMovementGrid(gridX, gridY, grid, gridSizeX, gridSizeY) {
        // let gridPos = this.CalculateGridPos(x, y, this.tileSize, this.tileSize)
        let posList = new Array();
        let visitedPos = new Array();

        let movementGrid = new Array(gridSizeX); 
        for (var i = 0; i < gridSizeX; i++) {
            movementGrid[i] = new Array(gridSizeY);
        }

        let startPos =  new PIXI.Point(gridX, gridY);
        startPos.depth = 0;
        posList.push(startPos);
        while(posList.length > 0) {
            let currentPos = posList.shift();
            if(grid.IsGridPosMovable(currentPos.x, currentPos.y)) {
                movementGrid[currentPos.x][currentPos.y] = currentPos.depth;
                // console.log(currentPos.depth);
                this.movementDirections.forEach((point) =>  {
                    let newPos = currentPos.add(point);
                    newPos.depth = currentPos.depth + 1;
                    // let newDepth = currentPos.depth + 1;
                    if(newPos.y < 0 || newPos.x < 0) {
                        return;
                    }
                    if(newPos.y >= gridSizeY ||  newPos.x >= gridSizeX) {
                        return;
                    }
    
                    if(this.ContainsPos(visitedPos, newPos) == false && this.ContainsPos(posList, newPos) == false ) {
                        posList.push(newPos);
                    }
                }
                );

                
            }
            visitedPos.push(currentPos);


        }
        return movementGrid;
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

                let gridPos = this.CalculateGridPos(xPos, yPos, this.tileSize, this.tileSize);
                if (this.blockGrid[gridPos.x][gridPos.y] instanceof Block) {
                    this.container.addChild(this.blockGrid[gridPos.x][gridPos.y].GetGraphics());
                }
            }
        }

        if (this.movementGrid) {
            for (let x = 0; x < this.gridSizeX; x++) {
                let xPos = x * this.tileSize;
                for (let y = 0; y < this.gridSizeY; y++) {
                    let text = this.movementGrid[x][y];
                    let yPos = y * this.tileSize;
                    let pixiText = new PIXI.Text(text, {
                        fontFamily: 'arial',
                        fontSize: 12,
                        fontWeight: 'bold',
                        fill: 'white',
                    });
                    pixiText.x = xPos;
                    pixiText.y = yPos;
                    this.container.addChild(pixiText);
                    
                }
            }
        }

        if (this.draggingBlock != null) {
            this.container.addChild(this.draggingBlock.GetGraphics());
        }
    }
}