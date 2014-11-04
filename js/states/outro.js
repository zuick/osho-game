define( function( require ){
    var config = require('config');
    var messages = require('utils/messages-ru');
    
    return function( game ){
        this.create = function(){
            if( messages.outro ){
                var text = game.add.text( config.game.width / 2, config.game.height / 2, messages.outro, config.boot.textStyle );
                text.anchor.setTo( 0.5, 0.5 );                
            }
        }            
    }
})


