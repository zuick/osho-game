define(function( require ){    
    var config = require('config');
    
    var game = new Phaser.Game( config.game.width, config.game.height, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
    
    var gs = require('gs')( game ); 
    
    var mesShow = require('utils/showMessage')( game );
    
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
        
        mesShow.show('monolog1');
        
        setTimeout(mesShow.close.bind(mesShow),5000);
        
        
    }

    function update() {        
        var tickTime = new Date().getTime();
        
        gs.hero.updateControls( gs.cursors );
        gs.hero.updateCollides( gs.layers.static, tickTime );
    }

    function render(){
        
    }
});