define( function(){
    return {
        game: {
            width: 600
            ,height: 600
        }
        ,map: {
            collidableBlocks: [ 2 ]
        }
        ,hero: {
            mainSprite: "hero"
            ,position: { x: 80, y: 80 }
            ,linearDamping: 1
            ,velocity: {
                run: 200
            } 
        }
    }
})
