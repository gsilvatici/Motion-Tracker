/* jshint browser:true */
(function() {

    document.addEventListener('DOMContentLoaded', function() {

        var width = screen.availWidth;
        var height = screen.availHeight;

        var onSettings = false;

        var app = new PIXI.Application(width, height, {backgroundColor : 0x000000});
        document.body.appendChild(app.view);

        // create a background Sprite using an image
        var background = PIXI.Sprite.fromImage("background.jpg");

        background.width = width;
        background.height = height;

        var settings = PIXI.Sprite.fromImage("settings-icon.png");

        settings.interactive = true;

        settings.x = width*4/5 ;
        settings.y = height - height*17/18;

        settings.width = width*1/7
        settings.height = settings.width;
        var bar = new PIXI.Graphics();

        bar.beginFill(0x404C68);

        bar.drawRect(width*1/2, 0, 20, height);

        var baseContainer = new PIXI.Container();

        baseContainer.addChild(background);
        baseContainer.addChild(settings);
        baseContainer.addChild(bar);

        app.stage.addChild(baseContainer);

        var xblur = new PIXI.filters.BlurXFilter();
        var yblur = new PIXI.filters.BlurYFilter();

        baseContainer.filters = [xblur, yblur];

        yblur.blur = 0;
        xblur.blur = 0;


        var text = new PIXI.Text("SENSIVITY", {fontFamily: "Verdana", fontSize:'2em', align: "right", fill: "#bbbbbb"});

        text.x = width*1/4;
        text.y = height*1/4;

        var value = new PIXI.Text(trigger, {fontFamily: "Verdana", fontSize:'2em', align: "right", fill: "#bbbbbb"});

        value.x = width*1/4;
        value.y = height*9/26;

        var left = PIXI.Sprite.fromImage("left.png");
        var right = PIXI.Sprite.fromImage("right.png");
        var back = PIXI.Sprite.fromImage("return.png");

        left.interactive = true;
        right.interactive = true;

        back.interactive = true;

        left.width = width*1/16;
        left.height = height*1/18;

        right.width = width*1/16;
        right.height = height*1/18;

        left.x = width*1/4;
        left.y = height*1/2;

        right.x = width*4/9;
        right.y = height*1/2;

        back.width = width*1/14;
        back.height = height*1/16;

        back.x = settings.x;
        back.y = height*1/2;


        var settingsContainer = new PIXI.Container();

        settingsContainer.addChild(value);
        settingsContainer.addChild(text);

        settingsContainer.addChild(left);
        settingsContainer.addChild(right);

        settingsContainer.addChild(back);

        // Listen for animate update
        app.ticker.add(function(delta) {
            if (orientationChanged) {
                var aux = width;
                width = height;
                height = aux;

                app.renderer.resize(width, height);

                background.width = width;
                background.height = height;

                orientationChanged = false;
            }

            bar.clear();

            bar.beginFill(0x404C68);

            bar.drawRect(width*1/2 - magnitude*2, 0, magnitude*4, height);

            bar.endFill();

      });

      // callbacks for the touch events
      settings.touchstart = function(touchData) {
          settings.alpha = 0.5;
      }

      settings.touchend = function(touchData) {
          settings.alpha = 1
          yblur.blur = 10;
          xblur.blur = 10;
          app.stage.addChild(settingsContainer);
          onSettings = true;
      }

      settings.touchendoutside = function(touchData) {
          settings.alpha = 1;
      }

      back.touchstart = function(touchData) {
          back.alpha = 0.5;
      }

      back.touchend = function(touchData) {
          back.alpha = 1;
          yblur.blur = 0;
          xblur.blur = 0;
          app.stage.removeChild(settingsContainer);
          onSettings = false;
      }

      back.touchendoutside = function(touchData) {
          settings.alpha = 1;
      }

      left.touchstart = function(touchData) {
          if (trigger >= 10) {
            trigger-= 1;
            value.setText(trigger);
          }
      }

      right.touchstart = function(touchData) {
          trigger+= 1;
          value.setText(trigger);
      }


    }, false);

}());
