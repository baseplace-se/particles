class Movementgrid {

    constructor(width, height, tileSize) {
        this.container = new PIXI.Container();
        this.movementDirections = [new PIXI.Point(1, 0), new PIXI.Point(-1, 0), new PIXI.Point(0, 1), new PIXI.Point(0, -1)];
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
        this.movementGrid = new Array(this.width); 
        for (var i = 0; i < this.width; i++) {
           this.movementGrid[i] = new Array(this.height);
        }

        this.graphicsGrid = new Array(this.width); 
        for (var i = 0; i < this.width; i++) {
            let xPos = i * tileSize;
            this.graphicsGrid[i] = new Array(this.height);
            for ( var j = 0; j < this.height; j++) {
                let yPos = j * tileSize;
                let pixiText = new PIXI.Text("-1", {
                fontFamily: 'arial',
                fontSize: 12,
                fontWeight: 'bold',
                fill: 'white',
            });
            pixiText.x = xPos;
            pixiText.y = yPos;
            this.graphicsGrid[i][j] = pixiText;
            this.container.addChild(pixiText);
           }
        }

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

    GetClosestGridPos(gridPos) {
        let nrOfMoves = this.movementGrid[gridPos.x][gridPos.y];
        let nextPos = gridPos;
        this.movementDirections.forEach((point) =>  {
            let potentialPos = gridPos.add(point);
            if(potentialPos.y < 0 || potentialPos.x < 0) {
                return;
            }
            if(potentialPos.y >= this.height ||  potentialPos.x >= this.width) {
                return;
            }
            let potentialNrOfMoves = this.movementGrid[potentialPos.x][potentialPos.y]
            if(Number.isFinite(potentialNrOfMoves) && potentialNrOfMoves < nrOfMoves) {
                nrOfMoves = potentialNrOfMoves;
                nextPos = potentialPos;
            }
            
        });
        return nextPos
    }

    OutOfBounds(x, y) {
        if(y < 0 || x < 0) {
            return true;
        }
        if(y >= this.height ||  x >= this.width) {
            return true;
        }
        return false;
    }
    
    GetNextMove(x, y, goal) {
        let tileSize = this.tileSize;
        let gridPos = this.CalculateGridPos(x, y, tileSize, tileSize);
        if(gridPos.x == goal.gridPos.x && gridPos.y == goal.gridPos.y ) {
            return goal.pos;
        }
        
        gridPos.x = Math.max(0, gridPos.x)
        gridPos.x = Math.min(this.width - 1, gridPos.x)
        gridPos.y = Math.max(0, gridPos.y)
        gridPos.y = Math.min(this.height -1 , gridPos.y)
        gridPos = new PIXI.Point(gridPos.x, gridPos.y);

        let nextPos = this.GetClosestGridPos(gridPos);
        let pos = this.CalculateRealPos(nextPos.x, nextPos.y, tileSize, tileSize);

        let returnPos;
        if(nextPos.y == gridPos.y) {
            returnPos = new PIXI.Point(pos.x, y);
        } else {
            returnPos = new PIXI.Point(x, pos.y);
        }

        return returnPos;
    }

    SetGridValue(x,y, value) {
        this.movementGrid[x][y] = value;
        this.graphicsGrid[x][y].text = value;
    }

    Update(goalGridX, goalGridY, blocks) {
        let posList = new Array();
        let visitedPos = new Array();

        let startPos =  new PIXI.Point(goalGridX, goalGridY);
        startPos.depth = 0;
        posList.push(startPos);
        while(posList.length > 0) {
            let currentPos = posList.shift();
            if(blocks.IsGridPosMovable(currentPos.x, currentPos.y)) {
                this.SetGridValue(currentPos.x, currentPos.y, currentPos.depth);
                this.movementDirections.forEach((point) =>  {
                    let newPos = currentPos.add(point);
                    newPos.depth = currentPos.depth + 1;

                    if (this.OutOfBounds(newPos.x, newPos.y)) {
                        return;
                    }
                    if(this.ContainsPos(visitedPos, newPos) == false && this.ContainsPos(posList, newPos) == false ) {
                        posList.push(newPos);
                    }
                }
                );
            } else {
                this.movementGrid[currentPos.x][currentPos.y] = Infinity;
                this.graphicsGrid[currentPos.x][currentPos.y].text = "Infinity";
            }
            visitedPos.push(currentPos);

        }
    }

    GetGraphics() {


        return this.container;
    }
}