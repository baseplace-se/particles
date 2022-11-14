class Movementgrid {

    constructor(width, height) {
        this.container = new PIXI.Container();
        this.movementDirections = [new PIXI.Point(1, 0), new PIXI.Point(-1, 0), new PIXI.Point(0, 1), new PIXI.Point(0, -1)];
        this.width = width;
        this.height = height;

        this.movementGrid = new Array(this.width); 
        for (var i = 0; i < this.width; i++) {
           this.movementGrid[i] = new Array(this.height);
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
    Update(goalGridX, goalGridY, grid) {
        let posList = new Array();
        let visitedPos = new Array();
        let gridSizeX = this.width;
        let gridSizeY = this.height;

        

        let startPos =  new PIXI.Point(goalGridX, goalGridY);
        startPos.depth = 0;
        posList.push(startPos);
        while(posList.length > 0) {
            let currentPos = posList.shift();
            if(grid.IsGridPosMovable(currentPos.x, currentPos.y)) {
                this.movementGrid[currentPos.x][currentPos.y] = currentPos.depth;
                this.movementDirections.forEach((point) =>  {
                    let newPos = currentPos.add(point);
                    newPos.depth = currentPos.depth + 1;
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
        // return movementGrid;
    }

    GetGraphics() {

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

        return this.container;
    }
}