// Name: Sunny Han
// Date: 02/02/2024
// Hours: 25
// Creative Tilt: Designed frog animations 
// Technical Tilt: Used a state machine for frog movement and animation + added mini frog spawner

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
            debug: false,
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