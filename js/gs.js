define( function( require ){
    var config = require('config');
    return function( game ){
        return {
            map: null
            ,layers: {}
            ,initMap: function(){
                this.map = game.add.tilemap('tilemap', 25, 25, 32, 32);
                this.map.addTilesetImage('tiles', 'tiles');
                this.map.setCollision( 2 );

                this.layers.background = this.map.createLayer('background');
                this.layers.collidable = this.map.createLayer('collidable');
                this.layers.static = this.map.createLayer('static');      
                
                this.layers.background.resizeWorld();

                
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


