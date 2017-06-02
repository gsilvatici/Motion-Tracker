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

        bar.drawRect(width*1/2, height*2/5, 5, 50);


//        var text = new PIXI.Text("STILL", {font: "35px Desyrel", align: "right", fill: "#bbbbbb"});
//
//        text.x = width*3/8;
//        text.y = height*2/5;
//        
//        stage.addChild(text);
        
        stage.addChild(bar);

//        var lastFrame = (new Date()).getTime();
//
//        var transition = false;
//
//        var newText = text.text;
//        
//        var lastText = text.text;
//        
//        var pos = text.x;
//
        
        function animate() {
            requestAnimFrame(animate);
//            
//            var actualFrame = (new Date()).getTime();
//            
//            var deltaT = actualFrame - lastFrame;

            bar.clear();
            
            bar.beginFill(0x404C68);

            bar.drawRect(width*1/2 - magnitude*2, height*2/5, magnitude*4, 50);
            
            // render the stage
            renderer.render(stage);
        }        
        

        
    }, false);

}());
