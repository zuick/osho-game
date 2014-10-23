define( function( require ){
    var config = require('config');
    
    return function( game ){
        return {
            map: null
            ,layers: {}
            ,initMap: function(){
                this.map = game.add.tilemap('tilemap');
                this.map.addTilesetImage('tiles', 'tiles');
                this.map.setCollision( config.map.collidableBlocks );

                this.layers.background = this.map.createLayer('background');
                this.layers.collidable = this.map.createLayer('collidable');
                this.layers.static = this.map.createLayer('static');      
                
                Object.keys( this.layers ).forEach( 
                        function( l ){ 
                            this.layers[l].resizeWorld(); 
                        }.bind(this) 
                );
                
            }
        }
    }
})


