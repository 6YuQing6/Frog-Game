class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene')
    }
    preload(){
        this.load.path = './assets/img/'
        this.load.image('background', 'Background.png')
        this.load.image('leaf', 'Leaf.png')
    }
}