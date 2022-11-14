

class Textfield {
    constructor(posX, posY) {
        this.textList = []
        this.container = new PIXI.Container();
        this.container.x = posX; // this.width - (this.tileSize * 3);
        this.container.y = posY; // 0;
        this.container.interactive = true;
    }

    addtext(text) {
        this.textList.push(text);
    }

    clear() {
        this.textList.length = 0;
    }
    GetGraphics() {

        this.container.removeChildren().forEach((item) => {
            item.destroy();
        });
        let offset = 0;
        this.textList.forEach((text) => {
            let pixiText = new PIXI.Text(text, {
                fontFamily: 'arial',
                fontSize: 12,
                fontWeight: 'bold',
                fill: 'white',
            });
            pixiText.y = offset;
            this.container.addChild(pixiText);
            offset += pixiText.height;
        });
        
        return this.container;
        
    }
}