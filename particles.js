

class Particles {
    constructor(){
        this.maxParticles = 1500;
        this.maxVelocity = 5;
        this.particles = new Array();
        this.container = new PIXI.Container();
        this.goal = new PIXI.Point(0,0);

    }

    GetNumberOfParticles() {
        return this.particles.length;
    }

    SpawnParticle(xMax, yMax, movementgrid) {
        if(this.particles.length <= this.maxParticles) {
            
            let posX = Math.floor(Math.random() * xMax);
            let posY = Math.floor(Math.random() * yMax);
            while(!movementgrid.IsPosMovable(posX, posY)) {
                posX = Math.floor(Math.random() * xMax);
                posY = Math.floor(Math.random() * yMax);
            }
            let particle = new Particle(posX, posY, this.maxVelocity);
            this.particles.push(particle);
            this.container.addChild(particle.GetGraphics());
        }
    }

    DestroyParticle(particle) {
        this.particles.splice(this.particles.indexOf(particle), 1);

    }

    SetGoal(x, y) {
        this.goal.x = x;
        this.goal.y = y;
    }
    Update(movementgrid, tileSize, blocks) {
        movementgrid.Update(this.goal, blocks);
        this.particles.forEach((particle) => {
            let nextPos = movementgrid.GetNextMove(particle.GetX(), particle.GetY(), this.goal, tileSize);
            particle.Update(this.goal, nextPos);
            if(particle.atGoal == true) {
                this.container.removeChild(particle.GetGraphics());
                this.DestroyParticle(particle);
            }
        });
    }

    GetGraphics() {
        return this.container;
    }
}