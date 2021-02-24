// The Window constructor, followed by the functions to move and resize them
var windowsList = [];

////////////////// The window class /////////////////////
class yglloWindow extends HTMLElement {
    constructor(title, ID, left, top, width, height) {
        super();

        left = "left:"+left+"px; ";
        top = "top:"+top+"px; ";
        width = "width:"+width+"px; ";
        height = "height:"+height+"px; ";
        var wrapperStyle="position:absolute; "+left+top+width+height+ "visibility:visible;";

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'windowWrapper');
        wrapper.setAttribute('id', ID);
        wrapper.setAttribute('style', wrapperStyle);

        const header = document.createElement('div');
        header.setAttribute('class', 'windowHeader');
        header.setAttribute('onmousedown', 'mouseDown(this)');
        header.setAttribute('id', 'headerID-'+ID);
        header.innerHTML = title;

        const borderLeft = document.createElement('div');
        borderLeft.setAttribute('class', 'windowBorder borderLeft');
        borderLeft.setAttribute('onmousedown', 'mouseDown(this)');
        borderLeft.setAttribute('id', 'borderLeftID-'+ID);
        const borderRight = document.createElement('div');
        borderRight.setAttribute('class', 'windowBorder borderRight');
        borderRight.setAttribute('onmousedown', 'mouseDown(this)');
        borderRight.setAttribute('id', 'borderRightID-'+ID);
        const borderTop = document.createElement('div');
        borderTop.setAttribute('class', 'windowBorder borderTop');
        borderTop.setAttribute('onmousedown', 'mouseDown(this)');
        borderTop.setAttribute('id', 'borderTopID-'+ID);
        const borderBottom = document.createElement('div');
        borderBottom.setAttribute('class', 'windowBorder borderBottom');
        borderBottom.setAttribute('onmousedown', 'mouseDown(this)');
        borderBottom.setAttribute('id', 'borderBottomID-'+ID);

        const windowInternalContainer = document.createElement('div');
        windowInternalContainer.setAttribute('class', 'windowInternalContainer');
        windowInternalContainer.setAttribute('onmousedown', 'mouseDown(this)');
        windowInternalContainer.setAttribute('id', 'windowInternalContainer-'+ID);

        // Attach the created elements to the shadow dom
        wrapper.appendChild(borderLeft);
        wrapper.appendChild(borderRight);
        wrapper.appendChild(borderTop);
        wrapper.appendChild(borderBottom);
        wrapper.appendChild(header);
        wrapper.appendChild(windowInternalContainer);

        this.append(wrapper);
    }
}
customElements.define('ygllo-window', yglloWindow);

///////////// the function to create the windows //////////////

/**
 * @param {string} innerText - the window header text content
 * @param {string} windowID - the window ID
 * @param {number} initialLeft - the initial left position of the window, in px
 * @param {number} initialTop - the initial top position of the window, in px
 * @param {number} initialWidth - the initial width of the window, in px
 * @param {number} initialHeight - the initial height of the window, in px
 */
function createWindow(innerText, windowID, initialLeft, initialTop, initialWidth, initialHeight) {
    var window = new yglloWindow(innerText, windowID, initialLeft, initialTop, initialWidth, initialHeight);
    document.body.append(window);
}

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
    currentElement.parentElement.addEventListener('mouseup', stopEventListening, false);
};

// save the relative X mouse position in the window (move middleware)
var saveRelativeMousePos = function(e) {
    relativeMousePos = e.clientX - parseInt(currentElement.parentElement.style.left,10);
    currentElement.parentElement.removeEventListener('mousemove', saveRelativeMousePos, false);
    currentElement.parentElement.addEventListener('mousemove', move, false);
}

// save the initial right and bottom of the window (resize middleware)
var saveInitialRight = function(e) {
    initialRight = e.clientX + parseInt(currentElement.parentElement.style.width,10);
    initialBottom = parseInt(currentElement.parentElement.style.top,10) +
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
        currentElement.parentElement.removeEventListener('mouseup', stopEventListening, false);        
    }
    else {
        currentElement.parentElement.removeEventListener('mousemove', resize, false);
        currentElement.parentElement.removeEventListener('mouseup', stopEventListening, false);        
    }
};

function showHideWindow(windowID) {
    const window = document.getElementById(windowID);
    var windowVisibility = getComputedStyle(window).visibility;

    if (windowVisibility === "visible") {
        window.style.visibility="hidden";
    }
    else if (windowVisibility === "hidden") {
        window.style.visibility="visible";
    }
}