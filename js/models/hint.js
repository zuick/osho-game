define( function( require ){
    var config = require('config');
    
    return function( game, x, y, key ){
        var hint = game.add.sprite( x, y, config.hint.sprite );
        game.physics.enable( hint );        
        
        hint.messageKey = key;
        
        return hint;
    }
})


