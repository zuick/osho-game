define( function( require ){
    var config = require('config');
    var mapTools = require('utils/map-tools');
    var createHint = require('models/hint');    
    
    return function( game ){
        return {
            map: null
            ,layers: {}
            ,keys: {}
            ,cursors: {}
            ,hints: null
            ,messager: null
            ,initMap: function(){
                this.map = game.add.tilemap('tilemap');
                this.map.addTilesetImage('tiles', 'tiles');

                this.layers.background = this.map.createLayer('background');
                this.layers.static = this.map.createLayer('static');                      
                
                this.layers.background.resizeWorld();
                this.layers.background.scrollFactorX = 0.5;
                this.layers.background.scrollFactory = 0.5;

                this.map.setCollision( config.map.tileTypes.collidable, true, this.layers.static );
                
            }
            ,initHero: function(){
                var heroOptions = mapTools.getObjects( game.cache.getTilemapData('tilemap').data, 'objects', 'hero');

                if( heroOptions[0] ){
                    this.hero = require('models/hero')( game, heroOptions[0].x, heroOptions[0].y );                                  
                }
            }
            ,initHints: function(){
                this.messager = require('utils/messager')( game );
                this.hints = game.add.group();
                var hintsOptions = mapTools.getObjects( game.cache.getTilemapData('tilemap').data, 'objects', 'hint');
                for( var i in hintsOptions ){
                    this.hints.add( createHint( 
                            game
                            ,hintsOptions[i].x
                            ,hintsOptions[i].y - this.map.tileHeight
                            ,hintsOptions[i].properties.key ) 
                        );
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
                
                this.processHintCollision();                
            }
            ,processHintCollision: function( man, hint ){
                var nohits = true;
                this.hints.forEach( function( hint ){
                   if( hint.body.hitTest( this.hero.man.x, this.hero.man.y ) ){
                        this.messager.show( hint.messageKey )
                        nohits = false;
                   }
                }.bind(this))
                
                if( nohits ) this.messager.close();
            }
        }
    }
})


