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
                this.layers.static = this.map.createLayer('static');      
                
                this.layers.background.resizeWorld();

                this.map.setCollision( config.map.collidableBlocks, true, this.layers.static );
                
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
        }
    }
})


