define(function( require ){    
    var config = require('config');
    
    var game = new Phaser.Game( config.game.width, config.game.height, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
    
    var gs = require('gs')( game ); 
    
    function preload() {
        game.load.tilemap('tilemap', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/tiles.png');
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
        gs.hero.updateControls( gs.cursors, gs.keys );
        gs.hero.updateCollides( gs.layers.static );
        gs.hero.updateState( gs.getTilesTypesAround() );
        
    }

    function render(){
        game.debug.spriteInfo( gs.hero.man )
    }
});