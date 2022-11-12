class Game {
    constructor(goal, width, height, tileSize, nrOfParticles) {
        this.app = new PIXI.Application({ width: width, height: height });
        document.body.appendChild(this.app.view);
        this.goal = goal;
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
        this.gridSizeX = (w / this.tileSize) - 3;
        this.gridSizeY = h / this.tileSize;
        this.maxParticles = 1500;
        this.particles = new Array();
        

        this.textWidth = 192;
        this.gridWidth = width - this.textWidth;
        this.frame = new PIXI.Graphics();


        this.particleContainer = new PIXI.Container();

        this.text = new Textfield(this.width - (this.tileSize * 3), 0);
        this.grid = new Grid(this.gridWidth, this.height, this.tileSize);


        this.app.stage.addChild(this.text.container);
        this.app.stage.addChild(this.frame);
        this.app.stage.addChild(this.particleContainer);
        this.app.stage.addChild(this.grid.container);

        this.app.ticker.add((delta) => {
            this.Update();
            this.Draw();
            // drawInfoText();

        });
    }
    SpawnParticle() {
        if(this.particles.length <= this.maxParticles) {
            let posX = Math.floor(Math.random() * (this.gridWidth + 1));
            let posY = Math.floor(Math.random() * (this.height + 1));
            let id = this.particles.length
            this.particles.push(new Particle(posX, posY, this.goal.x, this.goal.y, id));

        }
    }

    DestroyParticle(particle) {
        let oldLength = this.particles.length
        this.particles.splice(this.particles.indexOf(particle), 1);

    }

    UpdateParticles() {
        this.particles.forEach((particle) => {
            particle.SetGoalPos(this.goal.GetX(), this.goal.GetY())
            // console.log("Part")
            particle.Update();
            if(particle.atGoal == true) {
                this.DestroyParticle(particle);
            }
        });
    }

    Update() {
        this.text.clear();
        let newX = input.getMousePosX();
        let newY = input.getMousePosY();
        let mouseDown = input.getMouseDown();
        
        
        if (newX != null && newY != null) {
            this.goal.pos.x = newX;
            this.goal.gridPos.x = Math.floor(newX / this.tileSize);

            this.goal.pos.y = newY;
            this.goal.gridPos.y = Math.floor(newY / this.tileSize);

            if (mouseDown == true) {
                this.grid.dragging = true;
                this.grid.SetDraggingPos(newX, newY);
            } else if (this.grid.dragging == true) {
                this.grid.SetBlock(newX, newY);
                this.grid.dragging = false;
            }
        }
        
        
        // this.SpawnParticle();
        this.UpdateParticles();
        let goalGridPos = this.grid.CalculateGridPos(this.goal.pos.x, this.goal.pos.y, this.tileSize, this.tileSize);
        let movementGrid = this.grid.CalculateMovementGrid(goalGridPos.x, goalGridPos.y, this.grid, this.grid.gridSizeX, this.grid.gridSizeY);
        this.grid.movementGrid = movementGrid;
        this.text.addtext(`FPS: ${this.app.ticker.FPS}`);
        this.text.addtext(`MouseX: ${input.getMousePosX()}, MouseY: ${input.getMousePosY()}`);
        this.text.addtext(`Dragging: ${this.grid.dragging}`);
        this.text.addtext(`PosX: ${goal.pos.x}, PosY: ${goal.pos.y}`);
        this.text.addtext(`GridX: ${goal.gridPos.x}, GridY: ${goal.gridPos.y}`);
        this.text.addtext(`nrOfParticles: ${this.particles.length}`);


    }

    DrawParticles() {
        // console.log(this.particles);
        // console.log(this.particles.length);
        this.particleContainer.removeChildren().forEach((item) => {
            item.destroy();
        });
        for(let i = 0; i < this.particles.length; i++) {
            let particle = this.particles[i];
            let sprite = PIXI.Sprite.from('Particle.png');
            sprite.width = 10;
            sprite.height = 10;
            sprite.x = particle.pos.x;
            sprite.y = particle.pos.y;
            sprite.anchor.set(0.5, 0.5);
            
            this.particleContainer.addChild(sprite);
        }
    }

    Draw() {
        
        this.DrawParticles();
        this.text.Draw();
        this.grid.Draw();
        
    }
}