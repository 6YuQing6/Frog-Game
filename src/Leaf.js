class Leaf extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,velocity, y = 0, scale = 1.5, parent = true){
        super(scene, Phaser.Math.Between(leafWidth/2, width - leafWidth/2), (y - leafHeight), 'leaf');

        this.parentScene = scene;
        this.velocity = velocity;
        this.parent = parent

        this.parentScene.add.existing(this);
        this.parentScene.physics.add.existing(this);
        this.body.setAllowGravity(false)
        this.setScale(1.5);
        this.setVelocityY(this.velocity);
        this.setImmovable(true);
        this.setFriction(1,0)
        this.setBounce(0);
        this.body.checkCollision.down = false; //makes it one way 

        this.newLeaf = true;
    }
    update(){
        if (this.newLeaf && this.y > (centerY - Phaser.Math.Between(0,100)) && this.parent){
            this.parentScene.addLeaf(this.parent, this.velocity);
            this.newLeaf = false;
            //console.log('adding new leaf')
        }
        if (this.y > game.config.height){
            score += 1
            this.destroy();
        }
    }
}