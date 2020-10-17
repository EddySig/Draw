
window.brush = class Brush{
    canvas;
    context;

    constructor(canvas,context) {
        this.canvas = canvas;
        this.context = context;
    }

    begin(e){
        context.beginPath();
        context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
    }

    move(e){
        var x = e.pageX - canvas.offsetLeft;
        var y = e.pageY - canvas.offsetTop;
        context.lineTo(x, y);
        context.stroke();
    }
}
