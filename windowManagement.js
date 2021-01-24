var currentElement;

var mouseDown = function (element) {
    console.log(element.id);
    currentElement = element;
    element.addEventListener('mousemove', resize);
    element.addEventListener('mouseup', stopResize);
};

var resize = function(e) {
    if (currentElement.id === "headerID") {
        currentElement.parentElement.style.left = e.clientX - currentElement.offsetWidth/2 +"px";
        currentElement.parentElement.style.top = e.clientY - currentElement.offsetHeight/2 +"px";
    }

    if (currentElement.id === "borderLeftID") {
        currentElement.parentElement.style.left = e.clientX - currentElement.offsetWidth/2 +"px";
        currentElement.parentElement.style.width = e.clientX - currentElement.offsetWidth/2 +"px";
    }

    if (currentElement.id === "borderRightID") {
        currentElement.parentElement.style.width = e.clientX - currentElement.offsetWidth +"px";
    }

    if (currentElement.id === "borderTopID") {
        currentElement.parentElement.style.top = e.clientY - currentElement.offsetHeight/2 +"px";
        currentElement.parentElement.style.height = e.clientY - currentElement.offsetHeight/2 +"px";
    }

    if (currentElement.id === "borderBottomID") {
        currentElement.parentElement.style.height = e.clientY - currentElement.offsetHeight/2 +"px";
    }
};

var stopResize = function () {
    console.log("stop resize");
    currentElement.removeEventListener('mousemove', resize);
    currentElement.removeEventListener('mouseup', stopResize);
};