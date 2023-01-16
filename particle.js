class Particle {
    constructor(x, y, maxVelocity) {
        this.pos = new PIXI.Point(x, y);
        this.atGoal = false;
        this.sprite = PIXI.Sprite.from('Particle.png');
        this.sprite.width = 10;
        this.sprite.height = 10;
        this.sprite.x = this.pos.x;
        this.sprite.y = this.pos.y;
        this.sprite.anchor.set(0.5, 0.5);
        this.maxVelocity = maxVelocity;
        this.velocity = new PIXI.Point(0, 0);

    }
    
    GetX() {
        return this.pos.x;
    }

    GetY() {
        return this.pos.y;
    }

    SetPos(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    Update(goalPos, nextPos) {
        if(this.atGoal == false) {
            let difference = nextPos.subtract(this.pos);

            if(difference.magnitude() > 10 ) {
                difference.multiplyScalar(0.01, difference);
                
            }
            this.velocity.add(difference, this.velocity);
            if(this.velocity.magnitude() > this.maxVelocity) {
                this.velocity.normalize(this.velocity);
                this.velocity.multiplyScalar(this.maxVelocity, this.velocity);
            }
            let goalDifference = goalPos.subtract(this.pos);
            if(goalDifference.magnitude() < 4) {
                this.velocity.x = goalDifference.x;
                this.velocity.y = goalDifference.y;
            }
            this.pos.add(this.velocity, this.pos);
            this.sprite.x = this.pos.x;
            this.sprite.y = this.pos.y;
            this.atGoal = this.pos.equals(goalPos);
        }
        
    }

    GetGraphics() {
        return this.sprite;
    }
}