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
        hero.tilesAround = {};
        
        hero.setVelocity = function( prop, value ){
            hero.group.forEach( function( item ){
                item.body.velocity[prop] = value;
            })
        }
        
        hero.turnTo = function( dir ){
            if( dir === 'up' ){
                this.man.frame = 2;
            }else if( dir === 'down' ){
                this.man.frame = 3;
            }else if( dir === 'left'){
                this.man.frame = 0;
            }else if( dir === 'right'){
                this.man.frame = 1;
            }
        }
        
        hero.getTurnToCollidable = function( tilesAround ){
            var lookTo = [ 'up', 'down', 'left', 'right' ];
            for( var i in tilesAround ){
                if( -1 === lookTo.indexOf( tilesAround[i].type ) && ( tilesAround[i].type === 'collidable' || tilesAround[i].type === 'gate' ) ) return i;
            }
        }
        
        hero.checkDir = function( dir, tilesAround ){
            var opposites = {
                'up': [ 'down', 'downleft', 'downright', 'left', 'right' ]
                ,'down': [ 'up', 'upleft', 'upright', 'left', 'right' ]
                ,'left': [ 'right', 'upright', 'downright', 'up', 'down' ]
                ,'right': [ 'left', 'upleft', 'downleft', 'up', 'down' ]
            }
            
            var collidableTilesDist = opposites[ dir ].filter( function( oppositDir ){
                return tilesAround[ oppositDir ].type === 'collidable' || tilesAround[ oppositDir ].type === 'gate';
            }).map( function( oppositDir ){
                return tilesAround[ oppositDir ].d;
            })
            
            if( collidableTilesDist.length === 0 ) return true;
            
            var maxDist = Math.min.apply( Math, collidableTilesDist );
            return maxDist < config.climbingMaxDistance;
            
        }
        
        hero.updateControls = function( cursors, keys, tilesAroundChecker ){
            var isRun = this.state === config.states.run;
            var isClimbing = ( this.state === config.states.climb && keys.space.isDown );
            var isGonaFlight = ( this.state !== config.states.run && this.man.body.velocity.x === 0 && this.man.body.velocity.y === 0 );
            
            if( isRun || isClimbing || isGonaFlight ) {
                
                this.setVelocity( 'x', 0 );
                this.setVelocity( 'y', 0 );
                
                var velocity = config.velocity[config.states.run];
                if( isGonaFlight ) velocity = config.velocity[config.states.flight];
                if( isClimbing ) velocity = config.velocity[config.states.climb];
                var delta = 2;
                
                if (cursors.up.isDown){
                    if( !isClimbing || this.checkDir('up', tilesAroundChecker( this.man.x, this.man.y - delta ) ) ) this.setVelocity( 'y', -velocity );
                    if( this.state !== config.states.climb ) this.turnTo('up')
                }else if (cursors.down.isDown){
                    if( !isClimbing || this.checkDir('down', tilesAroundChecker( this.man.x, this.man.y + delta ) ) ) this.setVelocity( 'y', velocity );
                    if( this.state !== config.states.climb ) this.turnTo('down')
                }else if(cursors.left.isDown){
                    if( !isClimbing || this.checkDir('left', tilesAroundChecker( this.man.x - delta, this.man.y ) ) ) this.setVelocity( 'x', -velocity );
                    if( this.state !== config.states.climb ) this.turnTo('left')
                }else if (cursors.right.isDown){
                    if( !isClimbing || this.checkDir('right', tilesAroundChecker( this.man.x + delta, this.man.y ) ) ) this.setVelocity( 'x', velocity );
                    if( this.state !== config.states.climb ) this.turnTo('right')
                }
            }
            
        }
        
        hero.updateCollides = function( layer, tick ){
            game.physics.arcade.collide( this.man, layer, null, null, this );
        }
        
        hero.updateState = function( tilesAround, keys ){
            
            if( tilesAround.center.type === 'run' || tilesAround.center.type === 'gate' ){
                this.setState( config.states.run, tilesAround, keys )
            }else if( tilesAround.center.type === 'flight' ){
                this.setState( config.states.flight, tilesAround, keys )
            }else if( tilesAround.center.type === 'climb' ){
                this.setState( config.states.climb, tilesAround, keys )
            }
        }
        
        hero.setState = function( state, tilesAround, keys ){
            this.state = state;
            this.tilesAround = tilesAround;
            
            this.man.body.bounce.x = 0;
            this.man.body.bounce.y = 0;
            
            if( this.state === config.states.flight || ( this.state === config.states.climb && !keys.space.isDown ) ){
                this.man.body.bounce.x = config.bounce;
                this.man.body.bounce.y = config.bounce;            
            }
            
            this.turnTo( this.getTurnToCollidable( tilesAround ) )
        }
           
        
        return hero;
        
    }
})


