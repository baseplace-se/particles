class Particle {
    constructor(x, y, goalX, goalY) {
        this.pos = new PIXI.Point(x, y);
        this.goal = new PIXI.Point(goalX, goalY);

        this.atGoal = false;

    }
    
    GetX() {
        return this.pos.x;
    }

    GetY() {
        return this.pos.y;
    }

    SetGoalPos(x ,y) {
        this.goal.x = x;
        this.goal.y = y;
    }
    SetPos(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    Update() {
        if(this.atGoal == false) {
            let difference = this.goal.subtract(this.pos);
            if(difference.magnitude() > 0.5) {
                difference.multiplyScalar(0.1, difference);
                
            }
            this.pos.add(difference, this.pos);
            this.atGoal = this.pos.equals(this.goal);
        }
        
    }

    GetGraphics() {
        let sprite = PIXI.Sprite.from('Particle.png');
        sprite.width = 10;
        sprite.height = 10;
        sprite.x = this.pos.x;
        sprite.y = this.pos.y;
        sprite.anchor.set(0.5, 0.5);

        return sprite;
    }
}