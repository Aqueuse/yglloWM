// The Window constructor, followed by the functions to move and resize them
var windowsList = [];

////////////////// The window class /////////////////////
class yglloWindow extends HTMLElement {
    constructor(title, name, left, top, width, height) {
        super();

        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });
        this.setAttribute('name',name);

        // generate CSS to apply to the window
        const style = document.createElement('style');
        var generalImport = "@import './CSS/yglloWM.css';\n";
        style.textContent=generalImport;

        left = "left : "+left+"px;";
        top = "top : "+top+"px;";
        width = "width : "+width+"px;";
        height = "height : "+height+"px;";
        var wrapperStyle="position : absolute;"+left+top+width+height;

        var uniqueID = getUniqueID(title);

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'windowWrapper');
        wrapper.setAttribute('id', uniqueID);
        wrapper.setAttribute('style', wrapperStyle);

        const header = document.createElement('div');
        header.setAttribute('class', 'windowHeader');
        header.setAttribute('onmousedown', 'mouseDown(this)');
        header.setAttribute('id', 'headerID-'+uniqueID);
        header.innerHTML = title;

        const borderLeft = document.createElement('div');
        borderLeft.setAttribute('class', 'windowBorder borderLeft');
        borderLeft.setAttribute('onmousedown', 'mouseDown(this)');
        borderLeft.setAttribute('id', 'borderLeftID-'+uniqueID);
        const borderRight = document.createElement('div');
        borderRight.setAttribute('class', 'windowBorder borderRight');
        borderRight.setAttribute('onmousedown', 'mouseDown(this)');
        borderRight.setAttribute('id', 'borderRightID-'+uniqueID);
        const borderTop = document.createElement('div');
        borderTop.setAttribute('class', 'windowBorder borderTop');
        borderTop.setAttribute('onmousedown', 'mouseDown(this)');
        borderTop.setAttribute('id', 'borderTopID-'+uniqueID);
        const borderBottom = document.createElement('div');
        borderBottom.setAttribute('class', 'windowBorder borderBottom');
        borderBottom.setAttribute('onmousedown', 'mouseDown(this)');
        borderBottom.setAttribute('id', 'borderBottomID-'+uniqueID);

        const windowInternalContainer = document.createElement('div');
        windowInternalContainer.setAttribute('class', 'windowInternalContainer');
        windowInternalContainer.setAttribute('onmousedown', 'mouseDown(this)');
        windowInternalContainer.setAttribute('id', 'windowInternalContainer-'+uniqueID);

        // Attach the created elements to the shadow dom
        wrapper.appendChild(borderLeft);
        wrapper.appendChild(borderRight);
        wrapper.appendChild(borderTop);
        wrapper.appendChild(borderBottom);
        wrapper.appendChild(header);
        wrapper.appendChild(windowInternalContainer);

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }
}

customElements.define('ygllo-window', yglloWindow);

//////////////////////////////////////////////////////////////////////////////

/////////// the set of functions and variables to use the windows /////////////
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