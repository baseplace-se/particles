

class Particles {
    constructor(){
        this.maxParticles = 1500;
        this.particles = new Array();
        this.container = new PIXI.Container();

    }

    GetNumberOfParticles() {
        return this.particles.length;
    }

    SpawnParticle(goal, xMax, yMax) {
        if(this.particles.length <= this.maxParticles) {
            let posX = Math.floor(Math.random() * xMax);
            let posY = Math.floor(Math.random() * yMax);
            let id = this.particles.length
            this.particles.push(new Particle(posX, posY, goal.x, goal.y, id));
        }
    }

    DestroyParticle(particle) {
        this.particles.splice(this.particles.indexOf(particle), 1);

    }

    Update(goal) {
        this.particles.forEach((particle) => {
            particle.SetGoalPos(goal.GetX(), goal.GetY())
            particle.Update();
            if(particle.atGoal == true) {
                this.DestroyParticle(particle);
            }
        });
    }

    GetGraphics() {
        this.container.removeChildren().forEach((item) => {
            item.destroy();
        });
        for(let i = 0; i < this.particles.length; i++) {
            let particle = this.particles[i];
            
            
            this.container.addChild(particle.GetGraphics());
        }
        return this.container;
    }
}