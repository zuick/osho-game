define( function( require ){
    return function( game, x, y ){
        var config = require('config').hero;
        
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
        
        hero.turnTo = function( dir ){
            if( dir === 'up' ){
                this.man.frame = 2;
            }else if( dir === 'down'){
                this.man.frame = 3;
            }else if( dir === 'left'){
                this.man.frame = 0;
            }else if( dir === 'right'){
                this.man.frame = 1;
            }
        }
        
        hero.getTurnToCollidable = function( tilesAround ){
            for( var i in tilesAround ){
                if( tilesAround[i] === 'collidable' || tilesAround[i] === 'gate') return i;
            }
        }
        
        hero.updateControls = function( cursors, keys ){
            var isRun = this.state === config.states.run;
            var isClimbing = ( this.state === config.states.climb && keys.space.isDown );
            var isGonaFlight = ( this.state !== config.states.run && this.man.body.velocity.x === 0 && this.man.body.velocity.y === 0 );
            
            if( isRun || isClimbing || isGonaFlight ) {
                
                this.setVelocity( 'x', 0 );
                this.setVelocity( 'y', 0 );
                
                var velocity = config.velocity[config.states.run];
                if( isGonaFlight ) velocity = config.velocity[config.states.flight];
                if( isClimbing ) velocity = config.velocity[config.states.climb];
                
                if (cursors.up.isDown){
                    this.setVelocity( 'y', -velocity );
                    if( this.state !== config.states.climb ) this.turnTo('up')
                }else if (cursors.down.isDown){
                    this.setVelocity( 'y', velocity );
                    if( this.state !== config.states.climb ) this.turnTo('down')
                }else if(cursors.left.isDown){
                    this.setVelocity( 'x', -velocity );
                    if( this.state !== config.states.climb ) this.turnTo('left')
                }else if (cursors.right.isDown){
                    this.setVelocity( 'x', velocity );
                    if( this.state !== config.states.climb ) this.turnTo('right')
                }
            }
            
        }
        
        hero.updateCollides = function( layer, tick ){
            game.physics.arcade.collide( this.man, layer, null, null, this );
        }
        
        hero.updateState = function( tilesAround ){
            
            if( tilesAround.center === 'run' || tilesAround.center === 'gate' ){
                this.setState( config.states.run, tilesAround )
            }else if( tilesAround.center === 'flight' ){
                this.setState( config.states.flight, tilesAround )
            }else if( tilesAround.center === 'climb' ){
                this.setState( config.states.climb, tilesAround )
            }
        }
        
        hero.setState = function( state, tilesAround ){
            this.state = state;

            if( this.state === config.states.run ){
                this.man.body.bounce.x = 0;
                this.man.body.bounce.y = 0;
            }else if( this.state === config.states.flight ){
                this.man.body.bounce.x = config.bounce;
                this.man.body.bounce.y = config.bounce;
            }else if( this.state === config.states.climb ){
                this.man.body.bounce.x = config.bounce;
                this.man.body.bounce.y = config.bounce;
                
                this.turnTo( this.getTurnToCollidable( tilesAround ) )
            }         
        }
           
        
        return hero;
        
    }
})


