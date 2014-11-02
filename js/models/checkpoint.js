define( function( require ){
    var config = require('config');
    
    return function( game, x, y, index ){
        var cp = game.add.sprite( x, y, config.checkpoint.sprite );
        game.physics.enable( cp );                
        
        cp.activate = function(){
            console.log("activate");
        }
        
        cp.cpIndex = index;
        
        return cp;
    }
})

