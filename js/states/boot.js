define( function( require ){
    var config = require('config');
    return function( game ){
        this.preload = function(){
            var text = game.add.text( config.game.width / 2, config.game.height / 2, "Загрузка...", config.boot.textStyle );
            text.anchor.setTo( 0.5, 0.5 );
            
            game.load.tilemap('tilemap', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
            game.load.image('tiles', 'assets/tiles.png');
            game.load.image('message', 'assets/message-bg.png');
            game.load.image('fader-bg', 'assets/fader-bg.png');
            game.load.image('bar-air-bg', 'assets/bar-air-bg.png');
            game.load.image('bar-air-left-bg', 'assets/bar-air-left-bg.png');
            game.load.spritesheet('hero', 'assets/hero.png', config.hero.spriteSize.width, config.hero.spriteSize.height, 4 );
            game.load.spritesheet('stars', 'assets/stars.png', config.stars.spriteSize.width, config.stars.spriteSize.height, config.stars.spritesCount );
            game.load.image('hint', 'assets/hint.png');
            game.load.image('checkpoint', 'assets/terminal.png');
            game.load.image('logo', 'assets/gaminator-logo.png');
        } 
        this.create = function(){
            if( config.debug ) game.state.start( 'game' );
            else game.state.start( 'bumper' );
        }            
    }
})


