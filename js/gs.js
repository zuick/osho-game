define( function( require ){
    var config = require('config');
    var tilesTools = require('utils/tiles-tools');
    
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
                this.hero = require('models/hero')( game, config.hero.position.x, config.hero.position.y );                
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
                return tilesTools.getTypesAround( x, y, this.map, 'static' );
            }        
            ,updateCollides: function(){
                game.physics.arcade.collide( this.hero.man, this.layers.static );
            }
        }
    }
})


