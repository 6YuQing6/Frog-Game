class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene')
    }
    init(){
        this.physics.world.gravity.y = 1200
    }
    create(){
        this.bgm = this.sound.add('bgm', {loop: true})
        this.bgm.play()
        this.cameras.main.setBackgroundColor(0xfcf0cb)
        this.add.image(0,0,'sky').setOrigin(0);
        this.add.rectangle(width/2, height/2 + height/20, 500, 400, 0x4b692f).setOrigin(0.5)
        this.add.text(width/2, 2*height/10, "It's Raining Frogs", menuConfig).setOrigin(0.5,0.5).setFontSize(64)
        this.add.text(width/2, 4*height/10 + height/20, 'PLAY (press UP)', menuConfig).setOrigin(0.5,0.5)
        this.add.text(width/2, height/2, 'CREDITS (press LEFT)', menuConfig).setOrigin(0.5,0.5)
        this.add.text(width/2, height/2 + height/20, 'INSTRUCTIONS (press RIGHT)', menuConfig).setOrigin(0.5,0.5)
        this.add.text(width/2, height/2 + 2*height/10, 'HIGHSCORE: ' + highscore, menuConfig).setOrigin(0.5,0.5)
        // creates controls
        this.keys = this.input.keyboard.createCursorKeys();

        this.deadzone = this.physics.add.sprite(width/2, height, null).setVisible(false);
        this.deadzone.body.setSize(width,50)
        this.deadzone.body.setAllowGravity(false);
        this.deadzone.body.setImmovable(true);
        this.mini1 = new MiniFrog(this, width/2 - 2 * width/10, height + height/10).setScale(4)
        this.frog = new Frog(this, width/2, height + height/10).setScale(6)
        this.mini2 = new MiniFrog(this, width/2 + 2 * width/10, height + height/10).setScale(4)
    }
    update(){
        this.frogFSM.step()
        this.physics.collide(this.frog,this.deadzone)
        this.physics.collide(this.mini1,this.deadzone)
        this.physics.collide(this.mini2,this.deadzone)
        if (Phaser.Input.Keyboard.DownDuration(this.keys.up, 500)){
            this.scene.start('playScene')
            this.bgm.stop();
        }
        if (Phaser.Input.Keyboard.DownDuration(this.keys.left, 500)){
            this.scene.start('creditsScene')
            this.bgm.pause();
        }
        if (Phaser.Input.Keyboard.DownDuration(this.keys.right, 500)){
            this.scene.start('instructionScene')
            this.bgm.pause();
        }
    }
}