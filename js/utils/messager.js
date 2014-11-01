define( function( require ){
    var mes = require('utils/messages-ru');
    var config = require('config');
    return function( game ){
        return {
            text:''
            ,sprite: null
            ,key: ''
            ,show: function( key, autoClose ){
                if( !this.key ){
                    this.key = key;
                    this.sprite = game.add.tileSprite(0, game.camera.view.height - config.messages.height, game.camera.view.width, config.messages.height, config.messages.bgTile);
                    this.sprite.fixedToCamera = true;
                    this.sprite.alpha = config.messages.alfaMin;

                    game.add.tween(this.sprite).to( { alpha: config.messages.alfaMax }, config.messages.animationTime, config.messages.animationType, true, 0, 0, false);

                    var style = { font: config.messages.textStyle.font
                                , fill: config.messages.textStyle.fill
                                , stroke: config.messages.textStyle.stroke
                                , strokeThickness: config.messages.textStyle.strokeThickness };

                    this.text = game.add.text(config.messages.textStyle.xOffset, game.camera.view.height - config.messages.height + config.messages.textStyle.yOffset, mes[key], style);
                    this.text.fixedToCamera = true;
                    this.text.wordWrap = true;
                    this.text.wordWrapWidth = game.camera.view.width - 2 * config.messages.textStyle.xOffset;
                    this.text.alpha = config.messages.alfaMin;

                    game.add.tween(this.text).to( { alpha: config.messages.alfaMax }, config.messages.animationTime, config.messages.animationType, true, 0, 0, false);   
                    
                    if( autoClose ) setTimeout( this.close.bind(this), config.messages.autoCloseTime )
                }
            }
            ,close: function(){
                if( this.key ){
                    var text_tmp = game.add.tween(this.text).to( { alpha: config.messages.alfaMin }, config.messages.animationTime, config.messages.animationType, true, 0, 0, false);
                    text_tmp.onComplete.add( this.text.destroy.bind(this.text));

                    var sprite_tmp = game.add.tween(this.sprite).to( { alpha: config.messages.alfaMin }, config.messages.animationTime, config.messages.animationType, true, 0, 0, false);
                    sprite_tmp.onComplete.add(this.sprite.destroy.bind(this.sprite));                    
                }
                this.key = '';
                
            }
        }
    }
})



