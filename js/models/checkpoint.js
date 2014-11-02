define( function( require ){
    var config = require('config');
    
    return function( game, x, y, index ){
        var messager = require('utils/messager')( game );
        
        var cp = game.add.sprite( x, y, config.checkpoint.sprite );
        game.physics.enable( cp );                
        
        cp.activate = function(){
            messager.show( 'gameSaved', true)
        }
        
        cp.cpIndex = index;
        
        return cp;
    }
})

