define( function(){
    return {
        save: function( cpIndex ){
            var state = { checkpoint: parseInt( cpIndex ) };
            
            localStorage.setItem("savegame", JSON.stringify( state ) );
        }
        ,load: function(){
            var lastGame = localStorage.getItem("savegame");
            if( lastGame ){
                lastGame = JSON.parse( lastGame );
                return lastGame;
            }else{
                return { checkpoint: 0 }
            }
        }
    }
})


