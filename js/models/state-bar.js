define( function( require ){
    var config = require('config');
    
    return function( game ){
        var airBgPadding = config.stateBar.airBgPadding;
        
        var bar = game.add.group();
        var bg = game.add.tileSprite( 0, 0, config.game.width, config.stateBar.bgHeight, config.stateBar.bgSprite )
        
        
        var airBg = game.add.tileSprite( 
            bg.x + airBgPadding
            ,bg.y + airBgPadding
            ,config.game.width - config.stateBar.airBgPadding * 2
            ,bg.height - airBgPadding * 2, config.stateBar.airBgSprite );
            
        var airLeftBg = game.add.tileSprite( airBg.x, airBg.y, airBg.width, airBg.height, config.stateBar.airLeftBgSprite );
            
        bg.fixedToCamera = true;
        airBg.fixedToCamera = true;
        airLeftBg.fixedToCamera = true;
        
        bar.add( bg );
        bar.add( airBg );
        bar.add( airLeftBg );
        
        bar.updateAirLeft = function( airContainer ){
            airLeftBg.width = airContainer.ammount / airContainer.capacity * airBg.width;
        }
        
        return bar;
    }
})


