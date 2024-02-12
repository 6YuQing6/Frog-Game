class Instructions extends Phaser.Scene{
    constructor(){
        super('instructionScene')
    }
    create(){
        this.cameras.main.setBackgroundColor(0xfcf0cb)
        this.bgm = this.sound.add('bgm', {volume: 0.5, loop: true});
        this.bgm.play();
        //this.add.image(0,0,'sky').setOrigin(0);
        this.add.rectangle(width/2, height/2 + height/20, 800, 400, 0x4b692f).setOrigin(0.5)
        this.add.text(width/2 , 2*height/10, "Instructions", menuConfig).setOrigin(0.5,0.5).setFontSize(64)
        this.add.text(width/2 - 2 * width/10, 4*height/10 + height/20, 'UP - Jump', menuConfig).setOrigin(0.5,0.5)
        this.add.text(width/2 - 2 * width/10, height/2, 'LEFT/RIGHT - Glide', menuConfig).setOrigin(0.5,0.5)
        this.add.text(width/2 - 2 * width/10, height/2 + height/20, 'DOWN - Dive', menuConfig).setOrigin(0.5,0.5)
        this.add.text(width/2, height/2 + 2 * height/10, 'BACK (press DOWN)', menuConfig).setOrigin(0.5,0.5)
        this.add.image(width/2 + 2 * width/10, height/2, 'instructions').setScale(2)
        // creates controls
        this.keys = this.input.keyboard.createCursorKeys();
    }

    update(){
        if (Phaser.Input.Keyboard.DownDuration(this.keys.down, 500)){
            this.scene.start('menuScene')
            this.bgm.stop()
        }
    }
}