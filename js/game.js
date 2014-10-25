define(function( require ){    
    var config = require('config'); 
    var game = new Phaser.Game( config.game.width, config.game.height, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
    
    var gs = require('gs')( game ); 
    
    function preload() {
        game.load.tilemap('tilemap', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/tiles.png');
        game.load.image('hero', 'assets/hero.png');
    }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#000';      
        game.world.setBounds(0, 0, this.game.width, this.game.height);
        
        gs.initKeys();
        gs.initMap();
        gs.initHero();
        gs.initCameraSettings();              
    }

    function update() {
        game.physics.arcade.collide( gs.hero.man, gs.layers.collidable );
        gs.updateHero();
        gs.layers.background.render();
    }

    function render(){
        
    }
});