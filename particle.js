class Particle {
    constructor(x, y, goalX, goalY) {
        this.pos = new PIXI.Point(x, y);
        this.goal = new PIXI.Point(goalX, goalY);
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
            this.sprite.x = this.pos.x;
            this.sprite.y = this.pos.y;
            this.atGoal = this.pos.equals(this.goal);
        }
        
    }

    GetGraphics() {
        return this.sprite;
    }
}