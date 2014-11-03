define( function(){
    return {
        debug: true
        ,game: {
            width: 800
            ,height: 600
        }
        ,boot: {
            textStyle: { font: "14pt Verdana", fill: "#FFF" }
        }
        ,checkpoint: {
            sprite: 'checkpoint'
        }
        ,bumper:{
            animationTime: 500
            ,animationType: Phaser.Easing.Linear.None
            ,showTime: 3000
        }
        ,fader: {
            animationTime: 1000
            ,animationType: Phaser.Easing.Linear.None
            ,sprite: "fader-bg"
        }
        ,stateBar:{
            bgHeight: 40
            ,airBgPadding: 10
            ,bgSprite: "message"
            ,airBgSprite: "bar-air-bg"            
            ,airLeftBgSprite: "bar-air-left-bg"            
        }
        ,map: {
            tileTypes: {
                collidable: [ 2 ]
                ,gate: [ 4 ]
                ,run: [ 3 ]
                ,climb: [ 5 ]
                ,flight: [ 1, -1 ]                
            }
            ,tileWidth: 32
            ,tileHeight: 32
        }      
        ,stars: {
            sprite: "stars"
            ,spriteSize: { width: 5 ,height: 5 }
            ,spritesCount: 5
            ,count: 3000
            ,animationType: Phaser.Easing.Linear.None
            ,animationTime: 500
            ,animationDelay: 4000
            ,maxScrollFactor: 0.15
            ,maxScrollFactorAlpha: 3
            ,tweenFrequency: 70
        }
        ,hero: {
            mainSprite: "hero"
            ,position: { x: 180, y: 320 }
            ,size: { width: 24, height: 24 }
            ,spriteSize: { width: 32 ,height: 32 }
            ,linearDamping: 1
            ,bounce: 1
            ,climbingMaxDistance: 16
            ,stepLength: 2
            ,airMax: 200
            ,airUpdateFrequency: 100
            ,airRecoverySpeed: 100
            ,airConsumptionSpeed: 15
            ,velocity: {
                1: 100
                ,2: 135
                ,3: 60
            }
            ,states: {
                run: 1
                ,flight: 2
                ,climb: 3
            }
        }
        ,hint:{
            sprite: "hint"
        }
        ,messages:{
            height: 60
            ,bgTile: 'message'
            ,textStyle: { font: '12pt Verdana'
                        ,fill: '#19cb65'
                        ,stroke: '#000'
                        ,strokeThickness: 0
                        ,xOffset: 20
                        ,yOffset: 10
                    }
            
            ,animationTime: 300
            ,animationType: Phaser.Easing.Linear.None
            ,autoCloseTime: 2000
            ,alfaMin: 0
            ,alfaMax: 1  
        }
    }
})
