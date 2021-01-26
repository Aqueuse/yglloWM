var currentElement;
var topIndex=0;
var relativeMousePos;
var initialRight;

var mouseDown = function (element) {
    currentElement = element;
    topIndex = topIndex+1;
    currentElement.parentElement.style.zIndex = topIndex;

    if (currentElement.id === "headerID-"+currentElement.parentElement.id) {
        currentElement.parentElement.addEventListener('mousemove', saveRelativeMousePos, false);
    }
    else {
        currentElement.parentElement.addEventListener('mousemove', saveInitialRight, false);
    }
    currentElement.parentElement.addEventListener('click', stopEventListening, false);
};

// save the relative X mouse position in the window (middleware)
var saveRelativeMousePos = function(e) {
    relativeMousePos = e.clientX - parseInt(currentElement.parentElement.style.left,10);
    currentElement.parentElement.removeEventListener('mousemove', saveRelativeMousePos, false);
    currentElement.parentElement.addEventListener('mousemove', move, false);
}

// save the initial right and bottom of the window (middleware)
var saveInitialRight = function(e) {
    initialRight = e.clientX + parseInt(currentElement.parentElement.style.width,10);
    initialBottom = 
        parseInt(currentElement.parentElement.style.top,10) +
        parseInt(currentElement.parentElement.style.height,10);
    currentElement.parentElement.removeEventListener('mousemove', saveInitialRight, false);
    currentElement.parentElement.addEventListener('mousemove', resize, false);
}

var move = function(e) {
    currentElement.parentElement.style.left = e.clientX - relativeMousePos + "px";
    currentElement.parentElement.style.top = e.clientY - (currentElement.offsetHeight/2) +"px";
};

var resize = function(e) {
    if (currentElement.id === "borderLeftID-"+currentElement.parentElement.id) {
        currentElement.parentElement.style.left = e.clientX - (currentElement.offsetWidth/2) + "px";
        currentElement.parentElement.style.width = 
        initialRight - (e.clientX + (currentElement.offsetWidth/2) )  + "px";
    }

    if (currentElement.id === "borderRightID-"+currentElement.parentElement.id) {
        currentElement.parentElement.style.width = 
        e.clientX - ( parseInt(currentElement.parentElement.style.left, 10) - (currentElement.offsetWidth/2)) + "px";
    }

    if (currentElement.id === "borderTopID-"+currentElement.parentElement.id) {
        currentElement.parentElement.style.top = e.clientY - (currentElement.offsetHeight/2) +"px";
        currentElement.parentElement.style.height =
        initialBottom - (e.clientY + (currentElement.offsetHeight/2) )  + "px";
    }

    if (currentElement.id === "borderBottomID-"+currentElement.parentElement.id) {
        currentElement.parentElement.style.height = e.clientY - (parseInt(currentElement.parentElement.style.top, 10)) +"px";
    }
};

var stopEventListening = function (e) {
    if (currentElement.id === "headerID-"+currentElement.parentElement.id) {
        currentElement.parentElement.removeEventListener('mousemove', move, false);
        currentElement.parentElement.removeEventListener('click', stopEventListening, false);        
    }
    else {
        currentElement.parentElement.removeEventListener('mousemove', resize, false);
        currentElement.parentElement.removeEventListener('click', stopEventListening, false);        
    }
};

function getUniqueID(complicatedTitle) {
    var key = "-" + Math.random().toString(36).substring(2, 10);

    var shortTitle = complicatedTitle.toLowerCase();
    var arrayTitle = shortTitle.split(" ", 3);
    var cleanTitle = [];

    for (i = 0; i < arrayTitle.length; i++) {
        var arrayWord = arrayTitle[i].split("");
        for (j = 0; j < arrayWord.length; j++) {
            if (isAlphaNumeric(arrayWord[j]))
                cleanTitle.push(arrayWord[j]);
        }
    }
    return cleanTitle.join("") + key;
}

function isAlphaNumeric(char) {
    var code = char.charCodeAt(0);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
        return false;
    }
    else {
        return true;
    }
}