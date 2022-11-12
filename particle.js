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
            // console.log(typeof this.goal);
            // console.log(typeof this.pos);
            // console.log(new PIXI.Point(0,0).subtract(new PIXI.Point(0,0)));
            let difference = this.goal.subtract(this.pos);
            // console.log(`Difference: ${difference}`);
            if(difference.magnitude() > 0.5) {
                difference.multiplyScalar(0.1, difference);
                
            }
            this.pos.add(difference, this.pos);
            this.atGoal = this.pos.equals(this.goal);
        }
        
    }
}