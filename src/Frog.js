class Frog extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'frog');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(3)
        this.body.setSize(this.width / 2, this.height / 2);
        this.body.setOffset(this.width/4, this.height/3);
        this.setCollideWorldBounds(true);
        //this.setFriction(1,1)
        //this.setBounce(1)
        this.setDrag(0.8)
        this.setDamping()

        this.jumpSFX = scene.sound.add('bigjump')
        

        this.frogVelocity = 400
        this.JUMP_VELOCITY_Y_MIN = -800
        this.JUMP_VELOCITY_Y_MAX = -1000
        this.JUMP_VELOCITY_X_MIN = 300
        this.JUMP_VELOCITY_X_MAX = 500
        this.direction = 'left';
        this.glideTimer = 600
        this.idleTimer = 0
        this.idleTransitionTimer = null;

        scene.frogFSM = new StateMachine('idle', {
            idle: new IdleState(),
            jump: new JumpState(),
            glide: new GlideState(),
            fall: new FallState()
            }, [scene, this])
    }
}

class IdleState extends State {
    enter(scene, frog) {
        //frog.setVelocity(0);
        frog.play('idle', true);
    }

    execute(scene, frog){
        const {left, right, up, down} = scene.keys
        //console.log(frog.body.touching.down)
        if(up.isDown && frog.body.touching.down){
            scene.time.delayedCall(frog.idleTimer, () => {
                this.stateMachine.transition('jump')
                return
            })
        }
    }
}

class FallState extends State {
    enter(scene, frog) {
        //frog.setVelocity(0)
        //frog.setVelocityY(frog.frogVelocity);
        frog.body.setAccelerationY(frog.frogVelocity * 5)
        frog.play('idle', true);
        frog.stop()
        frog.setFlipY(true)
    }

    execute(scene, frog){
        const {left, right, up, down} = scene.keys
        
        if (frog.body.touching.down) {
            frog.setFlipY(false)
            frog.body.setVelocityX(0)
            frog.body.setAcceleration(0)
            this.stateMachine.transition('idle')
            return
        }
        
        else if (left.isDown || right.isDown){
            frog.setFlipY(false)
            frog.body.setAccelerationY(0)
            this.stateMachine.transition('glide')
            return
        }
    }
}

class GlideState extends State {
    execute(scene, frog){
        const {left, right, up, down} = scene.keys
        if (!(left.isDown || right.isDown)) {
            if (!frog.idleTransitionTimer){
                frog.idleTransitionTimer = scene.time.delayedCall(250, () => {
                    frog.idleTransitionTimer = null
                    this.stateMachine.transition('fall')
                    return
                })
            }
        }
        if (frog.body.touching.down){
            frog.setVelocityX(0)
            this.stateMachine.transition('idle');
            return
        }
        let moveDirection = new Phaser.Math.Vector2(0,0);
        if (left.isDown){
            if (frog.idleTransitionTimer != null){
                frog.idleTransitionTimer.remove();
                frog.idleTransitionTimer = null
            }
            moveDirection.x = -1
            frog.direction = 'left'
        } else if (right.isDown) {
            if (frog.idleTransitionTimer != null){
                frog.idleTransitionTimer.remove();
                frog.idleTransitionTimer = null
            }
            moveDirection.x = 1
            frog.direction = 'right'
        }
        moveDirection.normalize();
        frog.setVelocityX(frog.frogVelocity * 1.2 * moveDirection.x);
        //frog.setAccelerationX(200 * moveDirection.x)
        frog.play('glide-'+frog.direction,true);
        if (down.isDown){
            if (frog.idleTransitionTimer != null){
                frog.idleTransitionTimer.remove();
                frog.idleTransitionTimer = null
            }
            this.stateMachine.transition('fall');
            return
        }
    }
}

class JumpState extends State {
    enter(scene,frog){
        //frog.setVelocity(0);
        frog.play('jump', true);
        frog.jumpSFX.play()
        //frog.setAngularAcceleration(50)
        
        /*
        frog.setRotation(0);
        let direction = Phaser.Math.Between(-1,1)
        //frog.setVelocityX(Phaser.Math.Between(frog.JUMP_VELOCITY_X_MIN, frog.JUMP_VELOCITY_X_MAX) * direction)
        frog.setVelocityY(Phaser.Math.Between(frog.JUMP_VELOCITY_Y_MIN, frog.JUMP_VELOCITY_Y_MAX));
        scene.tweens.add({
            targets: frog,
            angle: 180 * direction,
            duration: 400,
            ease: 'Linear',
            onComplete: () => {
                frog.setRotation(0)
            }
        })
        */
        
        //frog.setVelocityX(Phaser.Math.Between(this.JUMP_VELOCITY_X_MIN, this.JUMP_VELOCITY_X_MAX));
        //frog.setVelocityY(Phaser.Math.Between(frog.JUMP_VELOCITY_Y_MIN, frog.JUMP_VELOCITY_Y_MAX));

        if (frog.idleTransitionTimer != null){
            frog.idleTransitionTimer.remove();
            frog.idleTransitionTimer = null
        }
    }
    execute(scene, frog) {
        const {left, right, up, down} = scene.keys
        /*
        if (Phaser.Input.Keyboard.JustDown(up)){
            frog.body.setVelocityY(-frog.frogVelocity * 10);
            console.log(frog.body.velocity.y)
        }
        */
        if (Phaser.Input.Keyboard.JustDown(up)){
            frog.setVelocityY(Phaser.Math.Between(frog.JUMP_VELOCITY_Y_MIN, frog.JUMP_VELOCITY_Y_MAX));
        }
        if (left.isDown || right.isDown){
            if (frog.idleTransitionTimer != null){
                frog.idleTransitionTimer.remove();
                frog.idleTransitionTimer = null
            }
            this.stateMachine.transition('glide')
            return
        }
        if (down.isDown){
            if (frog.idleTransitionTimer != null){
                frog.idleTransitionTimer.remove();
                frog.idleTransitionTimer = null
            }
            this.stateMachine.transition('fall');
            return
        }
        if (!(left.isDown || right.isDown || up.isDown || down.isDown)){
            if (!frog.idleTransitionTimer){
                frog.idleTransitionTimer = scene.time.delayedCall(frog.glideTimer, () => {
                    frog.idleTransitionTimer = null
                    this.stateMachine.transition('fall')
                    return
                })
            }
        }
    }
}