define( function( require ){
    var config = require('config').hero;
    var AirContainer = require('models/air-container');
    
    return function( game, x, y ){
        
        var hero = {};
        
        hero.group = game.add.group();        
        hero.man = hero.group.create( x, y, config.mainSprite );        
        
        game.physics.enable( hero.man );        
        hero.man.body.linearDamping = config.linearDamping;
        hero.man.body.collideWorldBounds = true;
        hero.man.anchor.setTo(0.5, 0.5);
        hero.man.body.setSize( config.size.width, config.size.height )
        
        hero.man.frame = 0;
        
        hero.airContainer = new AirContainer( game, config.airMax );
        
        hero.setVelocity = function( prop, value ){
            hero.group.forEach( function( item ){
                item.body.velocity[prop] = value;
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
                this.man.body.bounce.x = config.bounce;
                this.man.body.bounce.y = config.bounce;            
            }else{
                this.man.body.bounce.x = 0;
                this.man.body.bounce.y = 0;                
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
        }
        return hero;
        
    }
})


