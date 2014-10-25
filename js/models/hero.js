define( function( require ){
    return function( game, x, y  ){
        var config = require('config');
        
        var hero = {};
        
        hero.group = game.add.group();
        
        hero.man = hero.group.create( x, y, config.hero.mainSprite );
        
        game.physics.enable( hero.man );
        
        hero.man.body.linearDamping = config.hero.linearDamping;
        hero.man.body.collideWorldBounds = true;
        
        hero.setVelocity = function( prop, value ){
            this.man.body.velocity[prop] = value;
//            hero.group.forEach( function( item ){
//                item.body.velocity[prop] = value;
//            })
        }
        
        hero.update = function( game, cursors ){
            
            this.setVelocity( 'x', 0 );
            this.setVelocity( 'y', 0 );
            
            if (cursors.up.isDown){
                this.setVelocity( 'y', -config.hero.velocity.run );
            }else if (cursors.down.isDown){
                this.setVelocity( 'y', config.hero.velocity.run );
            }else if(cursors.left.isDown){
                this.setVelocity( 'x', -config.hero.velocity.run );
            }else if (cursors.right.isDown){
                this.setVelocity( 'x', config.hero.velocity.run );
            }

        }
        
        return hero;
        
    }
})


