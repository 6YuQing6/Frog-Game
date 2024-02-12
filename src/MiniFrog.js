class MiniFrog extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'minifrog');
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(2)
        this.body.setSize(this.width / 2, this.height / 2);
        this.body.setOffset(this.width/4, this.height/3);
        //this.body.setBounce(1)

        this.jumpSFX = scene.sound.add('minijump')

        this.setCollideWorldBounds(true);

        this.JUMP_VELOCITY_Y_MIN = -800
        this.JUMP_VELOCITY_Y_MAX = -1000
        this.JUMP_VELOCITY_X_MIN = 300
        this.JUMP_VELOCITY_X_MAX = 600

        this.play('miniIdle', true)
    }

    MiniJump(scene){
        this.setRotation(0);
        let direction = Phaser.Math.Between(-1,1)
        this.setVelocityX(Phaser.Math.Between(this.JUMP_VELOCITY_X_MIN, this.JUMP_VELOCITY_X_MAX) * direction)
        this.setVelocityY(Phaser.Math.Between(this.JUMP_VELOCITY_Y_MIN, this.JUMP_VELOCITY_Y_MAX));
        this.jumpSFX.play()
        scene.tweens.add({
            targets: this,
            angle: 360 * direction,
            duration: 500,
            ease: 'Linear',
            onComplete: () => {
                this.setRotation(0)
            }
        })
        //this.setVelocityX(Phaser.Math.Between(this.JUMP_VELOCITY_X_MIN, this.JUMP_VELOCITY_X_MAX));
        //this.setVelocityY(Phaser.Math.Between(this.JUMP_VELOCITY_Y_MIN, this.JUMP_VELOCITY_Y_MAX));
    }

    update(){
        if (this.body.touching.down){
            this.MiniJump(this.scene);
            //console.log('mini jumps')
        }
    }
}