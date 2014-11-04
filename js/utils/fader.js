define( function(){
    var config = require('config');
    
    return function( game ){
        return {
            show: function( onComplete ){
                this.fader = game.add.tileSprite( 0, 0, config.game.width, config.game.height, config.fader.sprite );
                this.fader.alpha = 0;
                this.fader.fixedToCamera = true;
                var tween = game.add.tween( this.fader ).to( { alpha: 1 }, config.fader.animationTime, config.fader.animationType, true, 0, 0, false ); 
                if( typeof onComplete === "function" ) tween.onComplete.add( onComplete );
            }
        }
        
    }
})


