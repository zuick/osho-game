define( function( require ){
    var config = require('config').hero;
    var AirContainer = require('models/air-container');
    
    return function( game, x, y ){
        
        var hero = {};
        
        hero.group = game.add.group();
        hero.arms = hero.group.create( x, y, config.armsSprite );
        hero.arms.animations.add('u-run', [0,1,0,2], 6, true)
        hero.arms.animations.add('d-run', [3,4,3,5], 6, true)
        hero.arms.animations.add('r-run', [6,7,6,8], 6, true)
        hero.arms.animations.add('l-run', [9,10,9,11], 6, true)        
        hero.arms.animations.add('u-cl', [12,13,14,13], 6, true)
        hero.arms.animations.add('d-cl', [15,16,17,16], 6, true)
        hero.arms.animations.add('r-cl', [18,19,20,19], 6, true)
        hero.arms.animations.add('l-cl', [21,22,23,22], 6, true)        
        
        hero.man = hero.group.create( x, y, config.mainSprite );        
        
        game.physics.enable( hero.man );        
        game.physics.enable( hero.arms );        
        hero.man.body.linearDamping = config.linearDamping;        
        hero.man.anchor.setTo(0.5, 0.5);
        hero.arms.anchor.setTo(0.5, 0.5);
        hero.man.body.setSize( config.size.width, config.size.height )        
        hero.arms.body.setSize( config.size.width, config.size.height )        
        
        hero.man.frame = 0;
        
        hero.airContainer = new AirContainer( game, config.airMax );
        
        hero.setVelocity = function( prop, value ){
            hero.group.forEach( function( item ){
                item.body.velocity[prop] = value;
            })
        }
        
        hero.moveTo = function( x, y ){
            hero.group.forEach( function( item ){
                item.x = x;
                item.y = y;
            })
        }
        
        hero.setTurn = function( dir ){
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
        
        hero.getTurnFromTilesAround = function( tilesAround, types ){
            var lookTo = [ 'up', 'down', 'left', 'right' ];
            for( var i in tilesAround ){
                if( -1 === lookTo.indexOf( tilesAround[i].type ) && types.indexOf( tilesAround[i].type ) !== -1 ) return i;
            }
        }
        
        hero.canGoTo = function( dir, tilesAround, reverse ){
            var opposites = {
                'up': [ 'down', 'downleft', 'downright', 'left', 'right' ]
                ,'down': [ 'up', 'upleft', 'upright', 'left', 'right' ]
                ,'left': [ 'right', 'upright', 'downright', 'up', 'down' ]
                ,'right': [ 'left', 'upleft', 'downleft', 'up', 'down' ]
            }
            
            if( reverse ) dir = opposites[dir][0];
            
            var collidableTilesDist = opposites[ dir ].filter( function( oppositDir ){
                // return only collidable or gate
                return tilesAround[ oppositDir ].type === 'collidable' || tilesAround[ oppositDir ].type === 'gate';
            }).map( function( oppositDir ){
                // return objects with dir and distance
                return { dir: oppositDir, d: tilesAround[ oppositDir ].d };
            })
            
            if( collidableTilesDist.length === 0 ){
                return true;
            }
            
            if( collidableTilesDist.length === 1 && ['downleft', 'downright', 'upleft', 'upright'].indexOf( collidableTilesDist[0].dir ) !== -1  ) { // corner case
                 collidableTilesDist[0].d = tilesAround[ opposites[dir][0] ].d;
            }
                        
            collidableTilesDist = collidableTilesDist.map( function( obj ){
                return obj.d;
            })
            
            var maxDist = Math.min.apply( Math, collidableTilesDist );
            return maxDist < config.climbingMaxDistance;
        }
        
        hero.updateVelocity = function( state, cursors, keys, tilesAroundChecker ){
            if( state.isRunning || state.isClimbing || state.isGonaFlight ) {
                
                this.setVelocity( 'x', 0 );
                this.setVelocity( 'y', 0 );
                
                var velocity = config.velocity[config.states.run];
                if( state.isGonaFlight ) velocity = config.velocity[config.states.flight];
                if( state.isClimbing ) velocity = config.velocity[config.states.climb];
                
                var delta = config.stepLength;
                
                if (cursors.up.isDown){
                    if( !state.isClimbing || this.canGoTo('up', tilesAroundChecker( this.man.x, this.man.y - delta ) ) ) this.setVelocity( 'y', -velocity );

                }else if (cursors.down.isDown){
                    if( !state.isClimbing || this.canGoTo('down', tilesAroundChecker( this.man.x, this.man.y + delta ) ) ) this.setVelocity( 'y', velocity );

                }else if(cursors.left.isDown){
                    if( !state.isClimbing || this.canGoTo('left', tilesAroundChecker( this.man.x - delta, this.man.y ) ) ) this.setVelocity( 'x', -velocity );

                }else if (cursors.right.isDown){
                    if( !state.isClimbing || this.canGoTo('right', tilesAroundChecker( this.man.x + delta, this.man.y ) ) ) this.setVelocity( 'x', velocity );

                }
            }
        }
        
        hero.updateProperties = function( state ){            
            if( state.isFlying || state.isGonaClimbing ){  
                hero.group.forEach( function( item ){
                    item.body.bounce.x = config.bounce;
                    item.body.bounce.y = config.bounce;
                })
            }else{
                hero.group.forEach( function( item ){
                    item.body.bounce.x = 0;
                    item.body.bounce.y = 0;
                })                
            }
        }
        
        hero.getTurnFromVelocity = function(){
            var v = this.man.body.velocity;
            
            if( v.x === 0 && v.y < 0 ){
                this.dir = 'up'
                return this.dir;
            }else if(v.x === 0 && v.y > 0){
                this.dir = 'down'
                return this.dir;
            }else if(v.x < 0 && v.y === 0){
                this.dir = 'left'
                return this.dir;
            }else if(v.x > 0 && v.y === 0){
                this.dir = 'right'
                return this.dir;
            }
            
            return this.dir;
        }
        
        hero.updateTurn = function( state, tilesAround, cursors ){
            if( state.isClimbing ){
                this.setTurn( this.getTurnFromTilesAround( tilesAround, [ 'collidable', 'gate' ] ) )
            }else{
                if (cursors.up.isDown){
                    this.setTurn('up')
                    
                }else if (cursors.down.isDown){
                    this.setTurn('down')
                    
                }else if(cursors.left.isDown){
                    this.setTurn('left')
                    
                }else if (cursors.right.isDown){
                    this.setTurn('right')
                }
            }
        }
        
        hero.updateAirContainer = function( state ){
            if( state.isRunning ){
                this.airContainer.startFilling();                
            }else{
                this.airContainer.startUsing();                 
            }
        }
        
        hero.updateArms = function( state, cursors, keys ){
            if( this.man.frame === 0 ){
                
                if( state.isRunning ){
                    if( !cursors.left.isDown ){
                        this.arms.frame = 9;
                        this.arms.animations.stop()
                    }else{
                        this.arms.play('l-run')
                    }
                                        
                }else if( state.isFlying || state.isGonaClimbing ){
                    this.arms.frame = 9;
                }else if( state.isClimbing ){
                    this.arms.play('l-cl')
                }
                
                if( !state.isClimbing && keys.space.isDown ){
                    this.arms.animations.stop()
                    this.arms.frame = 21;
                }
            }else if( this.man.frame === 1 ){
                
                if( state.isRunning ){
                    if( !cursors.right.isDown ){ 
                        this.arms.frame = 6;
                        this.arms.animations.stop() 
                    }else{ 
                        this.arms.play('r-run') 
                    }
                    
                }else if( state.isFlying || state.isGonaClimbing ){
                    this.arms.frame = 6;
                }else if( state.isClimbing ){
                    this.arms.play('r-cl')
                }
                
                if( !state.isClimbing && keys.space.isDown ){
                    this.arms.animations.stop()
                    this.arms.frame = 18;
                }
            }else if( this.man.frame === 2 ){
                
                if( state.isRunning ){
                    if( !cursors.up.isDown ){
                        this.arms.frame = 0;
                        this.arms.animations.stop()
                    }else{
                        this.arms.play('u-run')
                    }
                }else if( state.isFlying || state.isGonaClimbing ){
                    this.arms.frame = 0;
                }else if( state.isClimbing ){
                    this.arms.play('u-cl')
                }
                
                if( !state.isClimbing && keys.space.isDown ){
                    this.arms.animations.stop()
                    this.arms.frame = 12;
                }
            }else if( this.man.frame === 3 ){
                
                if( state.isRunning ){
                    if( !cursors.down.isDown ){
                        this.arms.frame = 3;
                        this.arms.animations.stop()
                    }else{
                        this.arms.play('d-run')
                    }
                }else if( state.isFlying || state.isGonaClimbing ){
                    this.arms.frame = 3;
                }else if( state.isClimbing ){
                    this.arms.play('d-cl')
                }
                
                if( !state.isClimbing && keys.space.isDown ){
                    this.arms.animations.stop()
                    this.arms.frame = 15;
                }                
            }
            
            
        }
        
        hero.update = function( cursors, keys, tilesAroundChecker ){
            var tilesAround = tilesAroundChecker();
            
            var state = {
                isRunning: tilesAround.center.type === 'run' || tilesAround.center.type === 'gate',
                isClimbing: tilesAround.center.type === 'climb' && keys.space.isDown && this.canGoTo( this.getTurnFromVelocity(), tilesAround, true ),
                isFlying: tilesAround.center.type === 'flight',
                isGonaClimbing: tilesAround.center.type === 'climb' && !keys.space.isDown,
            }
            
            state.isGonaFlight = !state.isRun && this.man.body.velocity.x === 0 && this.man.body.velocity.y === 0 && !keys.space.isDown;   
            state.isBouncy = tilesAround.center.type === 'flight' || state.isGonaClimbing;             
            
            this.updateVelocity( state, cursors, keys, tilesAroundChecker );
            this.updateProperties( state );
            this.updateTurn( state, tilesAround, cursors );
            this.updateAirContainer( state );
            this.updateArms( state, cursors, keys );
                
            
        }
        return hero;
        
    }
})


