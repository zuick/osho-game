define( function( require ){
    var config = require('config');
    
    return function( game, capacity ){
        this.capacity = capacity;
        this.ammount = capacity;
        this.usingEvent = null;
        this.fillingEvent = null;
        this.isEmpty = false;
        this.isFull = true;
        
        this.use = function(){
            this.ammount -= Math.ceil( config.hero.airConsumptionSpeed * config.hero.airUpdateFrequency / 1000 );
            
            if( this.ammount < 0 ){            
                this.isEmpty = true;
                this.ammount = 0;
            }
            
            this.isFull = false;
        }
        
        this.fill = function(){
            this.ammount += Math.ceil( config.hero.airRecoverySpeed * config.hero.airUpdateFrequency / 1000 );
            
            if( this.ammount > this.capacity ){            
                this.isFull = true;
                this.ammount = this.capacity;
            }
            
            this.isEmpty = false;
        }
        
        this.startUsing = function(){     
            
            if( this.fillingEvent ){
                game.time.events.remove( this.fillingEvent )
                this.fillingEvent = null;
            }
            if( !this.usingEvent ){
                this.usingEvent = game.time.events.loop( config.hero.airUpdateFrequency, this.use, this );
            }
        }
        
        this.startFilling = function(){
            
            if( this.usingEvent ){
                game.time.events.remove( this.usingEvent )
                this.usingEvent = null;
            }
            
            if( !this.fillingEvent ){
                this.fillingEvent = game.time.events.loop( config.hero.airUpdateFrequency, this.fill, this );
            }
        }
        
        this.encrease = function( size ){
            this.capacity += size;
        }
    }
})