var imgs = document.querySelectorAll('.images>img');
var targetCont = document.querySelectorAll('.target');

var targEl = {
    elem: '',
    container: ''
};

imgs.forEach(function(img) {
    img.addEventListener('dragstart', handleDragStart, false);
    img.addEventListener('dragend', handleDragEnd, false);
});

targetCont.forEach(function(cont) {
    cont.addEventListener('dragover', handleDragOver, false);
    cont.addEventListener('drop', handleDrop, false);
    cont.addEventListener('dragleave', handleDragLeave, false);
});

function handleDragStart(ev) {
    targEl.elem = ev.target;
}

function handleDragOver(ev) {
    ev.preventDefault();
    targEl.container = this;
    ev.currentTarget.classList.add('over');
}

function handleDrop(ev) {
    ev.currentTarget.appendChild(targEl.elem);
}

function handleDragLeave(e) {
    targEl.container.classList.remove('over');
}

function handleDragEnd() {
    targEl.container.classList.remove('over');
}