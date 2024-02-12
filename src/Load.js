class Load extends Phaser.Scene {
    constructor(){
        super('loadScene')
    }

    preload(){
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, game.config.width * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        
        this.load.path = './assets/'
        // loads graphics 
        this.load.image('background', 'Background.png')
        this.load.image('leaf', 'Leaf.png')
        this.load.image('particles', 'particles.png')
        this.load.image('sky','sky.png')
        this.load.image('instructions', 'Instructions.png')
        //loads audio 
        this.load.audio('bgm', 'Tsundere Twintails - cute circus.mp3');
        this.load.audio('bgm1', 'Tsundere Twintails - Head Empty.mp3')
        this.load.audio('bigjump', 'zapsplat_multimedia_game_sound_retro_arcade_style_jump_003_108840.mp3')
        this.load.audio('minijump', 'zapsplat_multimedia_game_sound_retro_arcade_style_jump_001_108838.mp3')
        this.load.audio('splat', 'zapsplat_cartoon_wet_squelchy_pop_high_pitched_76642.mp3')
        this.load.audio('pop', 'zapsplat_multimedia_game_designed_bubble_pop_001_26267.mp3')
        // loads spritesheets
        this.load.spritesheet('frog', 'Froggo-Sheet.png', {
            frameWidth: 32,
        })
        this.load.spritesheet('minifrog', 'Froggo1-Sheet.png',{
            frameWidth: 32,
        })
    }
    create(){
        // frog animations
        //creates frog animations 
        const frameRate = 8; // frame rate for animations
        //idle
        this.anims.create({
            key: 'idle',
            frameRate: frameRate,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('frog', {
                start: 0,
                end: 2
            })
        })
        //jump
        this.anims.create({
            key: 'jump',
            frameRate: 20,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('frog', {
                start: 0,
                end: 4
            })
        })
        //glide right
        this.anims.create({
            key: 'glide-right',
            frameRate: frameRate,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('frog', {
                start: 6,
                end: 7
            })
        })
        //glide left
        this.anims.create({
            key: 'glide-left',
            frameRate: frameRate,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('frog', {
                start: 9,
                end: 10
            })
        })

        // mini frog animations 
        // mini idle
        this.anims.create({
            key: 'miniIdle',
            frameRate: frameRate,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('minifrog', {
                start: 0,
                end: 2
            })
        })
        // mini jump
        this.anims.create({
            key: 'miniJump',
            frameRate: frameRate,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('minifrog', {
                start: 0,
                end: 4
            })
        })

        this.scene.start('menuScene')
    }
}