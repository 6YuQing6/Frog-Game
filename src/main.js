// Name: Sunny Han
// Date: 02/02/2024
// Hours:
// Creative Tilt: Particles to simulate rain
// Technical Tilt: Used a state machine for frog movement and animation

'use strict';

let config = {
    type: Phaser.AUTO,
    autoCenter: true,
    width: 832,
    height: 960,
    zoom: 0.75,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Load, Menu, Play, Credits, Instructions ]
}


let game = new Phaser.Game(config)

let { width, height } = game.config

const centerY = game.config.height / 2;
let cursors;
const leafWidth = 128;
const leafHeight = 7;
let score = 1;
let highscore = 0; 

// Text UI configs
let menuConfig = {
    fontFamily: 'Comic Sans',
    fontSize: '28px',
    backgroundColor: '#4b692f',
    color: '#FFFFFF',
    align: 'right',
    padding: {
      top: 5,
      bottom: 5,
    },
    fixedWidth: 0
  }