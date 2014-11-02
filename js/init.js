define(function( require ){    
    var config = require('config');
    var BootState = require('states/boot');
    var GameState = require('states/game');
    var BumperState = require('states/bumper');
    
    var game = new Phaser.Game( config.game.width, config.game.height, Phaser.AUTO );
    
    game.state.add( 'game', GameState );
    game.state.add( 'bumper', BumperState );
    game.state.add( 'boot', BootState, true );  
    
   
});