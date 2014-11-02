define( function( require ){
    var config = require('config');
    return function( game ){
        this.preload = function(){
            game.add.text( 20, 20, "Loading...", { font: "Verdana", fill: "#FFF" } );

            game.load.tilemap('tilemap', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
            game.load.image('tiles', 'assets/tiles.png');
            game.load.image('message', 'assets/message-bg.png');
            game.load.spritesheet('hero', 'assets/hero.png', config.hero.spriteSize.width, config.hero.spriteSize.height, 4 );
            game.load.image('hint', 'assets/hint.png');
        } 
        this.create = function(){
            game.state.start( 'game' );
        }            
    }
})


