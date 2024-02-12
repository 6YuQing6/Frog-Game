class Credits extends Phaser.Scene{
    constructor(){
        super('creditsScene')
    }
    create(){
        this.cameras.main.setBackgroundColor(0xfcf0cb)
        this.bgm = this.sound.add('bgm', {volume: 0.5, loop: true});
        this.bgm.play();
        //this.add.image(0,0,'sky').setOrigin(0);
        this.add.rectangle(width/2, height/2, 700, 300, 0x4b692f).setOrigin(0.5)
        this.add.text(width/2, 2*height/10, "Credits", menuConfig).setOrigin(0.5,0.5).setFontSize(64)
        this.add.text(width/2, 4*height/10, 'Art/Code: Sunny Han', menuConfig).setOrigin(0.5,0.5)
        this.add.text(width/2, height/2, 'Music: Tsundere Twintails - cute circus, Head Empty', menuConfig).setOrigin(0.5,0.5)
        this.add.text(width/2, height/2 + height/10, 'BACK (press DOWN)', menuConfig).setOrigin(0.5,0.5)
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