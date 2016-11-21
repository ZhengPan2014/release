var mousePressed = false;
var lastX, lastY;
var ctx;
var editMapID;



function AddCanvasEdit(id) {
    editMapID = id;
    ctx = document.getElementById(id).getContext("2d");
    document.getElementById(id).addEventListener("touchstart", mapTouchEvent, false);
    document.getElementById(id).addEventListener("touchmove", mapTouchEvent, false);
    document.getElementById(id).addEventListener("touchend", mapTouchEvent, false);

}

function DeleteCanvasEdit() {
    if (document.getElementById(editMapID)) {
        document.getElementById(editMapID).removeEventListener("touchstart", mapTouchEvent, false);
        document.getElementById(editMapID).removeEventListener("touchmove", mapTouchEvent, false);
        document.getElementById(editMapID).removeEventListener("touchend", mapTouchEvent, false);
    }
}
var mapEditcolor, mapEditlineWidth;


function mapTouchEvent(event) {

    switch (event.type) {
        case "touchstart":
            event.preventDefault();
            mousePressed = true;

           
            Draw(event.touches[0].clientX - $(this).offset().left, event.touches[0].clientY - $(this).offset().top, false, mapEditcolor, mapEditlineWidth);
            break;
        case "touchmove":
            event.preventDefault();
            if (mousePressed) {
                Draw(event.touches[0].clientX - $(this).offset().left, event.touches[0].clientY - $(this).offset().top, true, mapEditcolor, mapEditlineWidth);
            }
   
            break;
        case "touchend":
            mousePressed = false;
            break;
        default:
            break;
    }

}
function Draw(x, y, isDown, color, linWidth) {
    console.log(x, y);
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = linWidth;
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x; lastY = y;
}

function clearArea() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}



