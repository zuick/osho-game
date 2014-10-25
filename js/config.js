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
            ,position: { x: 120, y: 80 }
            ,size: { width: 24, height: 24 }
            ,linearDamping: 1
            ,bounce: 1
            ,velocity: {
                run: 100
            } 
        }
    }
})
