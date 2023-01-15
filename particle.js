class Particle {
    constructor(x, y, goalX, goalY) {
        this.pos = new PIXI.Point(x, y);
        this.atGoal = false;
        this.sprite = PIXI.Sprite.from('Particle.png');
        this.sprite.width = 10;
        this.sprite.height = 10;
        this.sprite.x = this.pos.x;
        this.sprite.y = this.pos.y;
        this.sprite.anchor.set(0.5, 0.5);

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

            if(difference.magnitude() > 0.5) {
                difference.multiplyScalar(0.1, difference);
                
            }
            this.pos.add(difference, this.pos);
            this.sprite.x = this.pos.x;
            this.sprite.y = this.pos.y;
            this.atGoal = this.pos.equals(goalPos);
        }
        
    }

    GetGraphics() {
        return this.sprite;
    }
}