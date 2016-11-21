var BushEvent = NavEvent || {
    REVISION: '0.0.1.0-2016-11.16'
};
BushEvent.bushdata = {
    mousePressed: false,
    lastX: 0,
    lastY: 0,
    ctx: null,
    editMapID: "",
    mapEditcolor: "",
    mapEditlineWidth: ""

}

BushEvent.WorkPool = function () {
    this.EnableCanvasEdit = function (id) {
        BushEvent.bushdata.editMapID = id;
        BushEvent.bushdata.ctx = document.getElementById(id).getContext("2d");
        document.getElementById(id).addEventListener("touchstart", mapTouchEvent, false);
        document.getElementById(id).addEventListener("touchmove", mapTouchEvent, false);
        document.getElementById(id).addEventListener("touchend", mapTouchEvent, false);
    }

    this.DisableCanvasEdit = function () {
        if (document.getElementById(BushEvent.bushdata.editMapID)) {
            document.getElementById(BushEvent.bushdata.editMapID).removeEventListener("touchstart", mapTouchEvent, false);
            document.getElementById(BushEvent.bushdata.editMapID).removeEventListener("touchmove", mapTouchEvent, false);
            document.getElementById(BushEvent.bushdata.editMapID).removeEventListener("touchend", mapTouchEvent, false);
        }
    }

    this.clearArea = function () {
        BushEvent.bushdata.ctx.setTransform(1, 0, 0, 1, 0, 0);
        BushEvent.bushdata.ctx.clearRect(0, 0, BushEvent.bushdata.ctx.canvas.width, BushEvent.bushdata.ctx.canvas.height);
    }
}



function mapTouchEvent(event) {

    switch (event.type) {
        case "touchstart":
            event.preventDefault();
            BushEvent.bushdata.mousePressed = true;
            Draw(event.touches[0].clientX - $(this).offset().left,
                 event.touches[0].clientY - $(this).offset().top,
                 false,
                 BushEvent.bushdata.mapEditcolor,
                 BushEvent.bushdata.mapEditlineWidth);
            break;
        case "touchmove":
            event.preventDefault();
            if (BushEvent.bushdata.mousePressed) {
                Draw(event.touches[0].clientX - $(this).offset().left,
                    event.touches[0].clientY - $(this).offset().top,
                    true,
                    BushEvent.bushdata.mapEditcolor,
                    BushEvent.bushdata.mapEditlineWidth);
            }

            break;
        case "touchend":
            BushEvent.bushdata.mousePressed = false;
            break;
        default:
            break;
    }

}
function Draw(x, y, isDown, color, linWidth) {
    if (isDown) {
        BushEvent.bushdata.ctx.beginPath();
        BushEvent.bushdata.ctx.strokeStyle = color;
        BushEvent.bushdata.ctx.lineWidth = linWidth;
        BushEvent.bushdata.ctx.lineJoin = "round";
        BushEvent.bushdata.ctx.moveTo(BushEvent.bushdata.lastX, BushEvent.bushdata.lastY);
        BushEvent.bushdata.ctx.lineTo(x, y);
        BushEvent.bushdata.ctx.closePath();
        BushEvent.bushdata.ctx.stroke();
    }
    BushEvent.bushdata.lastX = x;
    BushEvent.bushdata.lastY = y;
}



var BrushJobs = new BushEvent.WorkPool();

