define( function(){
    var config = require('config');
    
    return function( game ){
        return {
            init: function(){
                this.fader = game.add.tileSprite( 0, 0, config.game.width, config.game.height, config.fader.sprite );
                this.fader.alpha = 1;
                this.fader.fixedToCamera = true;
                
            },
            show: function(){
                var tween = game.add.tween( this.fader ).to( { alpha: 0 }, config.fader.animationTime, config.fader.animationType, true, 0, 0, false );                
            }
        }
        
    }
})


