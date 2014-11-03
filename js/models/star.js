define( function( require ){
    var config = require('config');
    
    return function( game, x, y ){
        var star = game.add.sprite( x, y, config.stars.sprite );
        star.frame = game.rnd.integerInRange( 0, config.stars.spritesCount )
        star.offset = { x: x, y: y };
        star.scrollFactor = game.rnd.realInRange( config.stars.maxScrollFactor, config.stars.maxScrollFactor * 2 );
        star.alpha = star.scrollFactor * config.stars.maxScrollFactorAlpha;
        
        if( game.rnd.integerInRange( 0, 100 ) > config.stars.tweenFrequency ){
            game.add.tween( star ).to( 
                    { alpha: 0.2 }
                    ,config.stars.animationTime
                    ,config.stars.animationType
                    ,true
                    ,game.rnd.integerInRange( config.stars.animationTime, config.stars.animationDelay )
                    ,config.stars.animationDelay, true )
        }
        return star;
    }
})


