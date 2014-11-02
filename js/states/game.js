define( function( require ){
    
    return function( game ){
        var gs = require('gs')( game );

        this.create = function(){
            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.stage.backgroundColor = '#000';                      

            gs.initKeys();
            gs.initMap();
            gs.initHints();
            gs.initCheckpoints();
            gs.initStateBar();
            gs.initHero();            
            gs.initCameraSettings();            
        }

        this.update = function() {
            gs.hero.update( gs.cursors, gs.keys, gs.getTilesTypesAround.bind(gs) );
            gs.updateCollides();
            gs.updateStateBar();
        }

        this.render = function(){
            
        }            
        
        
    }
})


