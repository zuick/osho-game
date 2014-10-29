define(function( require ){    
    var config = require('config');
    
    var game = new Phaser.Game( config.game.width, config.game.height, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
    
    var gs = require('gs')( game ); 

    
    function preload() {
        game.load.tilemap('tilemap', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/tiles.png');
        game.load.image('message', 'assets/message-bg.png');
        game.load.spritesheet('hero', 'assets/hero.png', config.hero.spriteSize.width, config.hero.spriteSize.height, 4 );
    }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#000';      
               
        gs.initKeys();
        gs.initMap();
        gs.initHero();
        gs.initCameraSettings();        
    }

    function update() {        
        gs.hero.updateState( gs.getTilesTypesAround(), gs.keys );
        gs.hero.updateControls( gs.cursors, gs.keys, gs.getTilesTypesAround.bind(gs) );
        gs.hero.updateCollides( gs.layers.static, gs.keys );
        
    }

    function render(){
        game.debug.text( gs.hero.state, 10, 30, "#FF0000")
        game.debug.text( gs.hero.man.body.velocity.x, 10, 50, "#FF0000")
        game.debug.text( gs.hero.man.body.velocity.y, 10, 70, "#FF0000")
    }
});