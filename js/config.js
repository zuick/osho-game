define( function(){
    return {
        game: {
            width: 600
            ,height: 600
        }
        ,map: {
            collidableBlocks: [ 2 ]
            ,runBlocks: [ 3, 4, 5 ]
            ,flightBlocks: [ 1 ]
        }
        ,hero: {
            mainSprite: "hero"
            ,position: { x: 180, y: 320 }
            ,size: { width: 24, height: 24 }
            ,spriteSize: { width: 32 ,height: 32 }
            ,linearDamping: 1
            ,bounce: 1
            ,velocity: {
                run: 100
            }
            ,states: {
                run: 1
                ,flight: 2
                ,climb: 3
            }
        }
    }
})
