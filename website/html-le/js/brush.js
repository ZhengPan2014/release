var BrushEvent = BrushEvent || {
    REVISION: '0.0.6.0-2016-12.22',
    mousePressed: false,
    lastX: 0,
    lastY: 0,
    ctx: null,
    mapEditcolor: "black",
    mapEditlineWidth: 3, 

    Draw: function (x, y, isDown, color, linWidth) {
        if (isDown) {
            // console.log(NavEvent.zoomView.stage.x);
            // console.log(NavEvent.zoomView.center.x);
            // console.log('before x: ' + x + '; y: ' + y);
            // var x = x + (x - NavEvent.zoomView.center.x) * NavEvent.zoomView.stage.scaleX;
            // var y = y + (y - NavEvent.zoomView.center.y) * NavEvent.zoomView.stage.scaleY;
            // console.log('after x: ' + x + '; y: ' + y);

            this.ctx.beginPath();
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = linWidth;
            this.ctx.lineJoin = "round";
            this.ctx.moveTo(this.lastX, this.lastY);
            this.ctx.lineTo(x, y);
            this.ctx.closePath();
            this.ctx.stroke();
        }
        this.lastX = x;
        this.lastY = y;
    },
    enableCanvasEdit: function (id, internalCanvas) {
        var canvas = document.getElementById(id);
        BrushEvent.ctx = internalCanvas.getContext("2d");

        $("#" + id).on("touchstart touchmove touchend", function (e) {
            var left = $(this).offset().left;;
            var top = $(this).offset().top;
            switch (e.type) {
                case "touchstart":
                    e.preventDefault();
                    BrushEvent.mousePressed = true;
                    console.log(e.originalEvent.touches[0].clientX, e.originalEvent.touches[0].clientY);
                    BrushEvent.Draw(e.originalEvent.touches[0].clientX -left,
                         e.originalEvent.touches[0].clientY -top,
                         false,
                         BrushEvent.mapEditcolor,
                         BrushEvent.mapEditlineWidth);
                    BaseEvent.mapEditStage.update();
                    break;
                case "touchmove":
                   e.preventDefault();
                   if (BrushEvent.mousePressed) {
                        BrushEvent.Draw(e.originalEvent.touches[0].clientX - left,
                            e.originalEvent.touches[0].clientY - top,
                            true,
                            BrushEvent.mapEditcolor,
                            BrushEvent.mapEditlineWidth);
                    }
                    BaseEvent.mapEditStage.update();
                    break;
                case "touchend":
                    BrushEvent.mousePressed = false;
                    BaseEvent.mapEditStage.update();
                    break;
                default:

            }
        });
        $("#" + id).on("mousedown mousemove mouseup", function (e) {
            switch (e.type) {
                case "mousedown":
                    e.preventDefault();
                    BrushEvent.mousePressed = true;
                    BrushEvent.Draw(e.clientX - $(this).offset().left,
                         e.clientY - $(this).offset().top,
                         false,
                         BrushEvent.mapEditcolor,
                         BrushEvent.mapEditlineWidth);
                    BaseEvent.mapEditStage.update();
                    break;
                case "mousemove":
                    e.preventDefault();
                    if (BrushEvent.mousePressed) {
                        BrushEvent.Draw(e.clientX - $(this).offset().left,
                            e.clientY - $(this).offset().top,
                            true,
                            BrushEvent.mapEditcolor,
                            BrushEvent.mapEditlineWidth);
                    }
                    BaseEvent.mapEditStage.update();
                    break;
                case "mouseup":
                    BrushEvent.mousePressed = false;
                    break;
                default:
            }
        });
    },
    disableCanvasEdit: function (id) {
        $("#" + id).off("touchstart touchmove touchend");
        $("#" + id).off("mousedown mousemove mouseup");
    },

};