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
        
        ,getSafelyDirections: function( x, y, map, layer ){
            var tx = Math.ceil( x / map.tileWidth ) - 1;
            var ty = Math.ceil( y / map.tileHeight ) - 1;
            
            var tilesAround = this.getTypesAround( x, y, map, layer );
            delete tilesAround.center;
            var d = 0;
            var safelyDirections = [];
            
            for( var i in tilesAround ){
                if( tilesAround[i] === 'collidable' || tilesAround[i] === 'gate'){
                    if( i === 'up' ){
                        d = Math.abs( y - ( ( ty ) * map.tileHeight ) )
                        if( d + 4 < config.hero.climbingMaxDistance ) safelyDirections.push(i);
                    }else if( i === 'down' ){
                        d = Math.abs( y - ( ( ty + 1 ) * map.tileHeight ) )
                    }else if( i === 'left' ){
                        d = Math.abs( x - ( ( tx ) * map.tileWidth ) )
                    }else if( i === 'right' ){
                        d = Math.abs( x - ( ( tx + 1 ) * map.tileWidth ) )                      
                    }
                    
                }
            }
            
            return safelyDirections;
        }
    }
})
