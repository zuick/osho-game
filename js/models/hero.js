define( function( require ){
    return function( game, x, y, map ){
        var config = require('config').hero;
        var mapConfig = require('config').map;
        var tilesTools = require('tiles-tools');
        
        var hero = {};
        
        hero.group = game.add.group();        
        hero.man = hero.group.create( x, y, config.mainSprite );        
        
        game.physics.enable( hero.man );        
        hero.man.body.linearDamping = config.linearDamping;
        hero.man.body.collideWorldBounds = true;
        hero.man.anchor.setTo(0.5, 0.5);
        hero.man.body.setSize( config.size.width, config.size.height )
        
        hero.man.frame = 0;
        
        hero.state = config.states.run;
        
        hero.setVelocity = function( prop, value ){
            hero.group.forEach( function( item ){
                item.body.velocity[prop] = value;
            })
        }
        
        hero.updateControls = function( cursors, keys ){
            if( this.state === config.states.run ){
                this.setVelocity( 'x', 0 );
                this.setVelocity( 'y', 0 );
                
                if (cursors.up.isDown){
                    this.setVelocity( 'y', -config.velocity.run );
                    this.man.frame = 2;
                }else if (cursors.down.isDown){
                    this.setVelocity( 'y', config.velocity.run );
                    this.man.frame = 3;
                }else if(cursors.left.isDown){
                    this.setVelocity( 'x', -config.velocity.run );
                    this.man.frame = 0;
                }else if (cursors.right.isDown){
                    this.setVelocity( 'x', config.velocity.run );
                    this.man.frame = 1;
                }
                
                if(keys.space.isDown){
                    console.log( tilesTools.getIndexesAround( this.man.x, this.man.y, map, 'static' ) )
                    
                }
            }
            
        }
        
        hero.updateCollides = function( layer, tick ){
            game.physics.arcade.collide( this.man, layer, null, null, this );
        }
        
        hero.setState = function( state ){
            
            if( config.states[state] ){
                this.state = config.states[state];

                if( this.state === config.states.run ){
                    this.man.body.bounce.x = 0;
                    this.man.body.bounce.y = 0;
                }else if( this.state === config.states.flight ){
                    this.man.body.bounce.x = config.bounce;
                    this.man.body.bounce.y = config.bounce;
                }
            }                       
        }
           
        
        return hero;
        
    }
})


