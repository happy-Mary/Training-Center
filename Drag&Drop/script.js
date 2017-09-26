var imgs = document.querySelectorAll('.images>img');
var targetCont = document.querySelectorAll('.target');

var targEl = {
    elem: ''
};

imgs.forEach(function(img) {
    img.addEventListener('dragstart', dragStart, false);
});

targetCont.forEach(function(cont){
    cont.addEventListener('dragover', dragOver, false);
    cont.addEventListener('drop', function(ev) {
        ev.preventDefault();
        dropIt(cont);
    }, false);
});

function dragStart(ev) {
    targEl.elem = ev.target;
    ev.dataTransfer.setData("text", '');
}

function dragOver(ev) {
    ev.preventDefault();
}

function dropIt(ev) {
    ev.appendChild(targEl.elem);
}