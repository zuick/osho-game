define( function( require ){
    var config = require('config');
    var logo = null;
    return function( game ){
        this.create = function(){
            logo = game.add.sprite(  config.game.width / 2, config.game.height / 2, 'logo' );
            logo.anchor.setTo( 0.5, 0.5 ); 
            logo.alpha = 0.5;
            game.add.tween( logo ).to( { alpha: 1 }, config.bumper.animationTime, config.bumper.animationType, true, 0, 0, false );
            
            setTimeout( this.close.bind(this), config.bumper.showTime )
        }   
        
        this.close = function(){
            var tween = game.add.tween( logo ).to( { alpha: 0 }, config.bumper.animationTime, config.bumper.animationType, true, 0, 0, false);
            tween.onComplete.add( function(){
                game.state.start( 'game' );
            })
        }
    }
})


