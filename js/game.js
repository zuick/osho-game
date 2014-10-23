define(function( require ){    
    var config = require('config'); 
    var game = new Phaser.Game( config.game.width, config.game.height, Phaser.AUTO, 'phaser-stage', { preload: preload, create: create, update: update, render: render });
    
    function preload() {}

    function create() {
        game.stage.backgroundColor = '#000';        
    }

    function update() {}

    function render(){}
});