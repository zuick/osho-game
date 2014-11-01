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
            var dirs = {
                center: { 
                    index: this.getIndexAt( tx, ty, map, layer ) 
                    ,d: 0 }
                ,up: { 
                    index: this.getIndexAt( tx, ty - 1, map, layer )
                    ,d: Math.abs( y - ( ( ty ) * map.tileHeight ) ) }
                ,down: { 
                    index: this.getIndexAt( tx, ty + 1, map, layer )
                    ,d: Math.abs( y - ( ( ty + 1 ) * map.tileHeight ) ) }
                ,left: { 
                    index: this.getIndexAt( tx - 1, ty, map, layer )
                    ,d: Math.abs( x - ( ( tx ) * map.tileWidth ) ) }
                ,right: { 
                    index: this.getIndexAt( tx + 1, ty, map, layer )
                    ,d: Math.abs( x - ( ( tx + 1 ) * map.tileWidth ) ) }
            }
            
            dirs.upright = { 
                    index: this.getIndexAt( tx + 1, ty - 1, map, layer )
                    ,d: Math.sqrt( dirs.up.d * dirs.up.d + dirs.right.d * dirs.right.d ) 
                }
            dirs.upleft = { 
                    index: this.getIndexAt( tx - 1, ty - 1, map, layer )
                    ,d: Math.sqrt( dirs.up.d * dirs.up.d + dirs.left.d * dirs.left.d )
                }
            dirs.downright = { 
                    index: this.getIndexAt( tx + 1, ty + 1, map, layer )
                    ,d: Math.sqrt( dirs.down.d * dirs.down.d + dirs.right.d * dirs.right.d )
                }
            dirs.downleft = { 
                    index: this.getIndexAt( tx - 1, ty + 1, map, layer )
                    ,d: Math.sqrt( dirs.down.d * dirs.down.d + dirs.left.d * dirs.left.d )
                }
            
            return dirs;
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
                types[i] = { type: this.getType( indexes[i].index ), d: indexes[i].d };
            }
            
            return types;
        }
        ,getObjects: function ( map, layerName, type ){
            var result = [];
            // find layer
            for( var i in map.layers ){
                var layer = map.layers[i];
                if( layer.name == layerName ){
                    // find objects
                    for( var j in layer.objects ){
                        if( layer.objects[j].type === type ){
                            result.push( layer.objects[j] );
                        }
                    }
                    break;
                }
            }

            return result;
        },
    }
})
