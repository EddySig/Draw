var canvas;
var context;
var element;
var isMouseClick = false;

window.onload = function (){

    //получение контекста
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    //события
    canvas.onmousedown = mousedown;
    canvas.onmousemove = mousemove;
    canvas.onmouseup = mouseup;
    //При необходимости расширения будет вешаться на кнопки
    createElem(1);
    //загрузка из localStorage
    loadData();

    window.onstorage = event => {
        if (event.key != 'canvas') return;
        loadData();
    };
    let thincks = document.getElementsByClassName("thinck-btn");
    for (let i = 0; i < thincks.length; i++) {
        thincks[i].addEventListener('click', function() {
            for (let i = 0; i < thincks.length; i++) {
                thincks[i].classList.remove('active');
            }
            this.classList.add('active');
        })
    }

    let colors = document.getElementsByClassName("color-btn");
    for (let i = 0; i < colors.length; i++) {
        colors[i].addEventListener('click', function() {
            for (let i = 0; i < colors.length; i++) {
                colors[i].classList.remove('active');
                colors[i].classList.remove('active_white');
            }
            if(this.classList.contains("c-but_fill_black")){
                this.classList.add('active_white');
            }else{
                this.classList.add('active');
            }

        })
    }
}

function createElem(index){ //При необходимости сделать switch

    element = new brush(canvas,context);
}

function mousedown(e){
    if(e.which == 1){
        isMouseClick = true;
        element.begin(e)
    }
}

function mousemove(e){
    if (isMouseClick == true){
        element.move(e)
    }
}

function mouseup(){
    isMouseClick = false;
}

function setThickness(thick){
    setActive();
    context.lineWidth = thick;
}

function setColor(color){
    context.strokeStyle = color;
}

function saveData(){
    localStorage.setItem("canvas",canvas.toDataURL())
}
function loadData(){
    let dataURL = localStorage.getItem("canvas");
    let img = new Image;
    img.src = dataURL;
    img.onload = function () {
        context.drawImage(img, 0, 0);
    };
}

function clearWindow(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}



