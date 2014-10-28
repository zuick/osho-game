define( function(){
    return {
        game: {
            width: 600
            ,height: 600
        }
        ,map: {
            tileTypes: {
                collidable: [ 2 ]
                ,gate: [ 4 ]
                ,run: [ 3 ]
                ,climb: [ 5 ]
                ,flight: [ 1, -1 ]                
            }
        }
        ,hero: {
            mainSprite: "hero"
            ,position: { x: 180, y: 320 }
            ,size: { width: 24, height: 24 }
            ,spriteSize: { width: 32 ,height: 32 }
            ,linearDamping: 1
            ,bounce: 1
            ,velocity: {
                1: 100
                ,2: 125
                ,3: 60
            }
            ,states: {
                run: 1
                ,flight: 2
                ,climb: 3
            }
        }
        ,messages:{
            height: 50
            ,bgTile: 'message'
            ,textStyle: { font: '15pt Courier'
                        ,fill: '#19cb65'
                        ,stroke: '#119f4e'
                        ,strokeThickness: 2
                        ,xOffset: 180
                        ,yOffset: 35
                    }
            
            ,animationTime: 1000
            ,animationType: Phaser.Easing.Linear.None
            ,alfaMin: 0
            ,alfaMax: 1  
        }
    }
})
