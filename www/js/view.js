/* jshint browser:true */
(function() {
    //wait for the DOM to be loaded
    document.addEventListener('DOMContentLoaded', function() {
        // create an new instance of a pixi stage
        var stage = new PIXI.Stage(0xFFFFFF);

        // create a renderer instance
        var width = screen.availWidth;
        var height = screen.availHeight;
        var renderer = PIXI.autoDetectRenderer(width, height);

        // add the renderer view element to the DOM
        document.body.appendChild(renderer.view);

        requestAnimFrame(animate);

        // create a background Sprite using an image
        var background = PIXI.Sprite.fromImage("background.jpg");

        background.width = width;
        background.height = height;

        stage.addChildAt(background, 0);

        var bar = new PIXI.Graphics();

        bar.beginFill(0x404C68);

        bar.drawRect(width*1/2, 0, 5, height);

        stage.addChild(bar);

        function animate() {
            if (orientationChanged) {
              var aux = width;
              width = height;
              height = aux;

              renderer.resize(width, height);

              background.width = width;
              background.height = height;

              orientationChanged = false;
            }

            requestAnimFrame(animate);

            bar.clear();

            bar.beginFill(0x404C68);

            bar.drawRect(width*1/2 - magnitude*2, 0, magnitude*4, height);

            // render the stage
            renderer.render(stage);
        }



    }, false);

}());
