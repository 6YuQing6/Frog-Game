class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    }
    init(){
        this.physics.world.gravity.y = 1200
        this.VELOCITY = 500
        this.MAX_X_VEL = 500
        this.MAX_Y_VEL = 2000
        this.MAX_JUMPS = 1
        this.leafAcceleration = 150
        this.frogDestroyed = false
        score = 0
        this.tileScroll = 0.5
    }

    create(){
        // bgm
        this.bgm = this.sound.add('bgm1', {loop: true})
        this.bgm.play()

        // sound effects
        this.splat = this.sound.add('splat')
        this.pop = this.sound.add('pop')
        
        //leaf speed settings 
        this.leafSpeed = 160;
        this.leafSpeedMax = 300;


        //adds leafs
        this.leafGroup = this.add.group({
            runChildUpdate: true
        });
        //this.addLeaf(height/2 + height/4)
        this.addLeaf(height/2);
        this.addLeaf(height/4)
        this.time.delayedCall(500, () => {
            this.addLeaf();
        });
        /*
        this.time.delayedCall(1500, () => {
            this.addLeaf();
        });
        */
        

        // sets background color
        this.cameras.main.setBackgroundColor('0xfcf0cb');
        this.background = this.add.tileSprite(0,0,832,960,'sky').setOrigin(0);

        // creates frog
        this.frog = new Frog(this, width/2, 0).setOrigin(0.5,0.5);
        this.frog.setDepth(100);

        // creates mini frog
        this.miniGroup = this.add.group({
            runChildUpdate: true
        });
        this.addMini()
        //this.mini.MiniJump(this);

        // creates starting leaf
        this.start = new Leaf(this, this.leafSpeed).setPosition(width/2,height/2 - 2*height/10);
        this.leafGroup.add(this.start);
        
        

        // creates controls
        this.keys = this.input.keyboard.createCursorKeys();

        // adds collisions
        this.physics.add.collider(this.frog, this.leafGroup, (frog, leaf) => {
            if (frog.body.touching.down){
                leaf.setAccelerationY(this.leafAcceleration);
                leaf.setTint(0xFF0000)
            }
        });

        // adds score
        this.score = this.add.text(width - width/20, height / 20, "Score: 0", menuConfig).setOrigin(1,0.5);
        
        // adds rectangle on the bottom 
        this.deadzone = this.physics.add.sprite(width/2, height, null).setVisible(false);
        this.deadzone.body.setSize(width,1)
        this.deadzone.body.setAllowGravity(false);
        this.deadzone.body.setImmovable(true);
        //this.add.rectangle(width/2, height, width, 100, 0x0000FF);

        // debug key listener (assigned to D key) Taken from FSM https://github.com/nathanaltice/FSM 
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

    }


    update(){
        if (!this.frogDestroyed){
            this.frogFSM.step()
            this.score.setText("Score: " + score)
            if (score > highscore){
                highscore = score
            }
            this.levelBump()
        }
        this.background.tilePositionY -= this.tileScroll
        this.physics.collide(this.miniGroup, this.leafGroup, (mini,leaf) => {
            if (mini.body.touching.down){
                leaf.setAccelerationY(this.leafAcceleration);
                leaf.setTint(0xFF0000)
                mini.MiniJump(this)
            }
        })
        
        this.physics.overlap(this.frog, this.miniGroup, (frog, mini) => {
            const emitter = this.add.particles(mini.x,mini.y, 'particles', {
                lifespan: 4000,
                speed: {min: 250, max: 450},
                scale: {start: 0.8, end: 0.0},
                gravityY: 300,
                emitting: false
              });
            emitter.explode(32); //adds particle explosion
            this.splat.play()
            mini.destroy()
            score += 2
            this.time.delayedCall(3000, () => {
                this.addMini()
            })
        })
        
        this.physics.overlap(this.frog, this.deadzone, (frog, dead) => {
            this.frogDestroyed = true
            this.gameOver()
        })
        this.physics.overlap(this.miniGroup, this.deadzone, (mini, dead) => { 
            this.time.delayedCall(1500, () => {
                this.addMini() 
            });
            mini.destroy()
        })
    }
    addMini(){
        let x = Phaser.Math.Between(0,width);
        let y = -150
        let mini = new MiniFrog(this, x, y);
        this.miniGroup.add(mini)
    }
    // create new leafs and add them to existing leaf group
    addLeaf(y=0, scale = 1.5, parent = true) {
        let speedVariance =  Phaser.Math.Between(0, 50);
        let leaf = new Leaf(this, this.leafSpeed - speedVariance, y, scale, parent).setVisible(true);
        this.leafGroup.add(leaf);
    }

    levelBump(){
        if (score % 15 == 0 && score != 0) {
            if (this.leafSpeed < this.leafSpeedMax) {
                this.leafSpeed += 15
                this.addMini()
                score += 1
                this.tileScroll += 0.1
            }
        }
    }

    gameOver(){
        this.pop.play()
        this.frog.setVisible(false)
        this.add.rectangle(width/2,height/2 - height/10, 300, 300, 0x4b692f, 0.5).setOrigin(0.5,0.5)
        this.add.text(width/2,height/2 - 2 * height/10,'Game Over', menuConfig).setOrigin(0.5,0.5).setFontSize(40);
        this.add.text(width/2,height/2 - height/10,'Play Again (Press Left)', menuConfig).setOrigin(0.5,0.5);
        this.add.text(width/2,height/2,'Menu (Press Right)', menuConfig).setOrigin(0.5,0.5);

        if (Phaser.Input.Keyboard.DownDuration(this.keys.left, 500)){
            this.bgm.stop()
            this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.DownDuration(this.keys.right, 500)){
            this.bgm.stop()
            this.scene.start('menuScene')
        }
    }

}