// Name: Sunny Han
// Date: 02/02/2024

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 320,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Play ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config