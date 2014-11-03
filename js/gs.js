define( function( require ){
    var config = require('config');
    var mapTools = require('utils/map-tools');
    var createHint = require('models/hint');    
    var createCheckpoint = require('models/checkpoint');    
    var createStateBar = require('models/state-bar');
    var createStar = require('models/star');
    var gameSaver = require('utils/game-saver');    
    
    return function( game ){
        return {
            map: null
            ,layers: {}
            ,keys: {}
            ,cursors: {}
            ,hints: null
            ,messager: null
            ,lastCheckpoint: 0
            ,checkpoints: null
            ,fader: null
            ,stars: null
            ,initFader: function(){
                this.fader = require('utils/fader')( game );
                this.fader.init();
            }
            ,initStateBar: function(){
                this.stateBar = createStateBar( game );
            }
            ,initStars: function(){
                this.stars = game.add.group();
                for( var i = 0; i < config.stars.count; i++ ){
                    this.stars.add( createStar( game, game.world.randomX, game.world.randomY )  );
                }
            }
            ,initMap: function(){
                this.map = game.add.tilemap('tilemap');
                this.map.addTilesetImage('tiles', 'tiles');

                this.layers.background = this.map.createLayer('background');
                this.layers.background.resizeWorld();
                this.initStars();
                this.layers.static = this.map.createLayer('static');                      

                this.map.setCollision( config.map.tileTypes.collidable, true, this.layers.static );
                
            }
            ,resetFromLastCheckpoint: function(){
                var state = gameSaver.load();
                
                var heroOptions = mapTools.getObjects( game.cache.getTilemapData('tilemap').data, 'objects', 'checkpoint');

                if( heroOptions[ state.checkpoint ] ){
                    this.lastCheckpoint = state.checkpoint;
                    var x = heroOptions[state.checkpoint].x + config.hero.size.width / 2;
                    var y = heroOptions[state.checkpoint].y - config.hero.size.height / 2;
                    
                    this.hero.moveTo( x, y );                                 
                }
            }
            ,initHero: function(){
                var state = gameSaver.load();
                
                var heroOptions = mapTools.getObjects( game.cache.getTilemapData('tilemap').data, 'objects', 'checkpoint');

                if( heroOptions[ state.checkpoint ] ){
                    this.lastCheckpoint = state.checkpoint;
                    var x = heroOptions[state.checkpoint].x + config.hero.size.width / 2;
                    var y = heroOptions[state.checkpoint].y - config.hero.size.height / 2;
                    this.hero = require('models/hero')( game, x, y );                                  
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
            ,initCheckpoints: function(){
                this.checkpoints = game.add.group();
                var cpOptions = mapTools.getObjects( game.cache.getTilemapData('tilemap').data, 'objects', 'checkpoint');
                for( var i in cpOptions ){
                    this.checkpoints.add( createCheckpoint( 
                            game
                            ,cpOptions[i].x
                            ,cpOptions[i].y - this.map.tileHeight
                            ,parseInt(i))                            
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
                this.processCheckpointCollision()
            }
            ,updateStateBar: function(){
                this.stateBar.updateAirLeft( this.hero.airContainer );
            }
            ,checkZeroAirCase: function(){
                if( this.hero.airContainer.ammount <= 0 ){
                    this.resetFromLastCheckpoint();
                }
            }
            ,processCheckpointCollision: function(){
                this.checkpoints.forEach( function( cp ){
                   if( this.lastCheckpoint !== cp.cpIndex && cp.body.hitTest( this.hero.man.x, this.hero.man.y ) ){
                        cp.activate();
                        gameSaver.save( cp.cpIndex );
                        this.lastCheckpoint = cp.cpIndex;
                   }
                }.bind(this))
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
            ,processStarsShift: function(){
                this.stars.forEach( function( star ){
                    star.x = star.offset.x * ( 1 - ( star.scrollFactor * game.camera.view.x / game.world.width ) )
                    star.y = star.offset.y * ( 1 - ( star.scrollFactor * game.camera.view.y / game.world.height ) )
                })
            }
        }
    }
})


