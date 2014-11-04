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
            gs.initShips();
            gs.initHero();   
            gs.initFader();
            gs.initStateBar();
            gs.initCameraSettings();            
        }

        this.update = function() {
            gs.checkZeroAirCase();
            gs.hero.update( gs.cursors, gs.keys, gs.getTilesTypesAround.bind(gs) );
            gs.updateCollides();
            gs.updateStateBar();
            gs.processStarsShift();
        }

        this.render = function(){
            
        }            
        
        
    }
})


