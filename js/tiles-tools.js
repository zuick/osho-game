define( function( require ){
    var config = require('config');
    var tileTypes = config.map.tileTypes;
    
    return {
        getIndexAt: function( tx, ty, map, layer ){
            if( tx < 0 || ty < 0 ) return -1;
            
            var tile = map.getTile( tx, ty, layer );
            var index = ( tile ) ? tile.index : -1;
            return index;
        }        
        /*
         * x,y in pixels
         */
        ,getIndexesAround: function( x, y, map, layer ){
            var tx = Math.ceil( x / map.tileWidth ) - 1;
            var ty = Math.ceil( y / map.tileHeight ) - 1;
            return {
                center: this.getIndexAt( tx, ty, map, layer )
                ,up: this.getIndexAt( tx, ty - 1, map, layer )
                ,down: this.getIndexAt( tx, ty + 1, map, layer )
                ,left: this.getIndexAt( tx - 1, ty, map, layer )
                ,right: this.getIndexAt( tx + 1, ty, map, layer )
            }
        }
        ,getType: function( index ){
            for( var type in tileTypes){
                if( tileTypes[type].indexOf(index) !== -1 ){
                    return type;
                }
            }
            return -1;
        }
        /*
         * x,y in pixels
         */
        ,getTypesAround: function( x, y, map, layer ){
            var indexes = this.getIndexesAround( x, y, map, layer );
            var types = {}
            for( var i in indexes ){
                types[i] = this.getType( indexes[i] );
            }
            
            return types;
        }
    }
})
