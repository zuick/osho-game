define( function( require ){
    return function( game, x, y  ){
        var config = require('config').hero;
        var mapConfig = require('config').map;
        
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
        hero.stateTick = 0;
        
        hero.setVelocity = function( prop, value ){
            hero.group.forEach( function( item ){
                item.body.velocity[prop] = value;
            })
        }
        
        hero.updateControls = function( cursors ){
            if( this.state === config.states.run ){
                this.setVelocity( 'x', 0 );
                this.setVelocity( 'y', 0 );
                
                if (cursors.up.isDown){
                    this.setVelocity( 'y', -config.velocity.run );
                    hero.man.frame = 2;
                }else if (cursors.down.isDown){
                    this.setVelocity( 'y', config.velocity.run );
                    hero.man.frame = 3;
                }else if(cursors.left.isDown){
                    this.setVelocity( 'x', -config.velocity.run );
                    hero.man.frame = 0;
                }else if (cursors.right.isDown){
                    this.setVelocity( 'x', config.velocity.run );
                    hero.man.frame = 1;
                }
            }
            
        }
        
        hero.updateCollides = function( layer, tick ){
            game.physics.arcade.collide( this.man, layer, null, this.processCollides.bind( this, tick ), this );
        }
        
        hero.setState = function( state, tick ){
            if( config.states[state] && tick !== this.stateTick ){
                this.state = config.states[state];
                this.stateTick = tick;
                if( this.state === config.states.run ){
                    this.man.body.bounce.x = 0;
                    this.man.body.bounce.y = 0;
                }else if( this.state === config.states.flight ){
                    this.man.body.bounce.x = config.bounce;
                    this.man.body.bounce.y = config.bounce;
                }
            }            
        }
        
        hero.processCollides = function( tick, man, tile ){
            // just collide, do not change state
            if( mapConfig.collidableBlocks.indexOf( tile.index ) !== -1 ){
                return true;
            }else if( mapConfig.runBlocks.indexOf( tile.index ) !== -1 ){
                this.setState( 'run', tick );
                return false;
            }else if( mapConfig.flightBlocks.indexOf( tile.index ) !== -1 || tile.index === -1 ){
                this.setState( 'flight', tick );
                return false;
            }
            
            return false;
        }
        
        return hero;
        
    }
})


