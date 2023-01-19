class Game {
    constructor(width, height, tileSize, nrOfParticles) {
        this.app = new PIXI.Application({ width: width, height: height });
        document.body.appendChild(this.app.view);
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
        this.gridSizeX = (w / this.tileSize) - 3;
        this.gridSizeY = h / this.tileSize;
        this.textWidth = 192;
        this.gridWidth = width - this.textWidth;

        this.particles = new Particles();
        this.text = new Textfield(this.width - (this.tileSize * 3), 0);
        this.grid = new Grid(this.gridWidth, this.height, this.tileSize);    
        this.blocks = new Blocks(this.gridSizeX, this.gridSizeY);
        this.movementgrid = new Movementgrid(this.gridSizeX, this.gridSizeY, this.tileSize);

        input.setupInput(this.grid.container);

        this.app.ticker.add((delta) => {
            this.Update(delta);
            this.Draw(delta);

        });
    }


    Update(delta) {
        this.text.clear();
        let newX = input.getMousePosX();
        let newY = input.getMousePosY();
        let mouseDown = input.getMouseDown();
        
        
        if (newX != null && newY != null) {
            this.particles.SetGoal(newX, newY);
            if (mouseDown == true) {
                this.blocks.dragging = true;
                this.blocks.SetDraggingPos(newX, newY, this.tileSize);
            } else if (this.blocks.dragging == true) {
                this.blocks.SetBlock(newX, newY, this.tileSize);
                this.blocks.dragging = false;
            }
        }
        
        
        this.particles.Update(this.movementgrid, this.tileSize, this.blocks);
        this.particles.SpawnParticle(this.gridWidth, this.height, this.movementgrid);
        
        this.text.addtext(`FPS: ${this.app.ticker.FPS}`);
        this.text.addtext(`Delta: ${delta}`);
        this.text.addtext(`MouseX: ${input.getMousePosX()}, MouseY: ${input.getMousePosY()}`);
        this.text.addtext(`Dragging: ${this.grid.dragging}`);
        this.text.addtext(`PosX: ${this.particles.goal.x}, PosY: ${this.particles.goal.y}`);
        let goalGridpos = this.movementgrid.CalculateGridPos(this.particles.goal.x, this.particles.goal.y, this.tileSize, this.tileSize);
        this.text.addtext(`GridX: ${goalGridpos.x}, GridY: ${goalGridpos.y}`);
        this.text.addtext(`nrOfParticles: ${this.particles.GetNumberOfParticles()}`);


    }

    

    Draw(delta) {
        
        this.app.stage.removeChildren();
        this.app.stage.addChild(this.grid.GetGraphics());
        this.app.stage.addChild(this.blocks.GetGraphics());
        this.app.stage.addChild(this.movementgrid.GetGraphics(this.tileSize));
    
        this.app.stage.addChild(this.text.GetGraphics());
        
        this.app.stage.addChild(this.particles.GetGraphics());
    }
}