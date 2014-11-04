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
                collidable: [ 2,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,47 ]
                ,gate: [ 4, 45,46 ]
                ,run: [ 3, 41,42,43,44,48,49,50,51,52,53,54,55,56,57,58,59,60 ]
                ,climb: [ 5, 9 ]
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
            ,armsSprite: "hero-arms"
            ,position: { x: 180, y: 320 }
            ,size: { width: 24, height: 24 }
            ,spriteSize: { width: 32 ,height: 32 }
            ,linearDamping: 1
            ,bounce: 1
            ,climbingMaxDistance: 16
            ,stepLength: 2
            ,airMax: 300
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
                        ,fill: '#1da8ab'
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
