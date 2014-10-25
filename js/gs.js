define( function( require ){
    var config = require('config');
    return function( game ){
        return {
            map: null
            ,layers: {}
            ,initMap: function(){
                this.map = game.add.tilemap('tilemap');
                this.map.addTilesetImage('tiles', 'tiles');

                this.layers.background = this.map.createLayer('background');
                this.layers.collidable = this.map.createLayer('collidable');
                this.layers.static = this.map.createLayer('static');      
                
                this.layers.collidable.resizeWorld();

                this.map.setCollision( config.map.collidableBlocks, true, this.layers.collidable );
                
            }
            ,initHero: function(){
                this.hero = require('models/hero')( game, config.hero.position.x, config.hero.position.y );                
            }
            ,initCameraSettings: function(){
                game.camera.follow( this.hero.man )
            }
            ,initKeys: function(){
                this.cursors = game.input.keyboard.createCursorKeys();
            }
            ,updateHero: function(){
                this.hero.update( game, this.cursors );
            }
        }
    }
})


