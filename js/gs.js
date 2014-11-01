define( function( require ){
    var config = require('config');
    var mapTools = require('utils/map-tools');
    
    return function( game ){
        return {
            map: null
            ,layers: {}
            ,keys: {}
            ,cursors: {}
            ,initMap: function(){
                this.map = game.add.tilemap('tilemap');
                this.map.addTilesetImage('tiles', 'tiles');

                this.layers.background = this.map.createLayer('background');
                this.layers.static = this.map.createLayer('static');                      
                
                this.layers.background.resizeWorld();

                this.map.setCollision( config.map.tileTypes.collidable, true, this.layers.static );
                
            }
            ,initHero: function(){
                var heroOptions = mapTools.getObjects( game.cache.getTilemapData('tilemap').data, 'objects', 'hero');

                if( heroOptions[0] ){
                    this.hero = require('models/hero')( game, heroOptions[0].x, heroOptions[0].y );                                  
                }
            }
            ,initCameraSettings: function(){
                game.camera.follow( this.hero.man )
            }
            ,initKeys: function(){
                this.cursors = game.input.keyboard.createCursorKeys();
                this.keys = {
                    space: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
                }
            }
            ,getTilesTypesAround: function( x, y ){
                x = x || this.hero.man.x;
                y = y || this.hero.man.y;
                return mapTools.getTypesAround( x, y, this.map, 'static' );
            }        
            ,updateCollides: function(){
                game.physics.arcade.collide( this.hero.man, this.layers.static );
            }
        }
    }
})


