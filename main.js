
// function drawInfoText() {
    // let text = new PIXI.Text(`MouseX: ${input.getMousePosX()}, MouseY: ${input.getMousePosY()}`, {
    //     fontFamily: 'arial',
    //     fontSize: 12,
    //     fontWeight: 'bold',
    //     fill: 'white',
    // });
    // let text2 = new PIXI.Text(`PosX: ${goalPosX}, PosY: ${goalPosY}`, {
    //     fontFamily: 'arial',
    //     fontSize: 12,
    //     fontWeight: 'bold',
    //     fill: 'white',
    // });
    // textContainer.removeChildren().forEach((item) => {
    //     item.destroy();
    // });
    // textContainer.addChild(text);
    // text2.y = text.height;
    // textContainer.addChild(text2);

// }

// function drawGrid() {

    
// }

// function update() {
//     newX = input.getMousePosX();
//     newY = input.getMousePosY();
//     if (newX != null) {
//         goalPosX = newX;
//     }
//     if (newY != null) {
//         goalPosY = newY;
//     }

// }


let w = 1280;
let h = 640;
let tileSize = 64;



goal = new Goal();
game = new Game(goal, w, h, tileSize);
    


