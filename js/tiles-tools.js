define( function( require ){
    
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
    }
})
