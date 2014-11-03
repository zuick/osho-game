define( function( require ){
    var config = require('config');
    
    return function( game, x, y, w, h, key ){
        var hint = game.add.sprite( x, y, config.hint.sprite );
        hint.width = w;
        hint.height = h;
        
        game.physics.enable( hint );        
        hint.messageKey = key;
        
        return hint;
    }
})


