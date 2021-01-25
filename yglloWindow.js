// Create a class for the element
class yglloWindow extends HTMLElement {
    constructor(title, left, top, width, height) {
        // Always call super first in constructor
        super();

        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // generate CSS to apply to the window
        const style = document.createElement('style');
        var generalImport = "@import './yglloWM.css';\n";
        left = "left : "+left+"px;";
        top = "top : "+top+"px;";
        width = "width : "+width+"px;";
        height = "height : "+height+"px;";

        style.textContent=generalImport;
        var wrapperStyle="position : absolute;"+left+top+width+height;

        // create a uniqueID to later manipulate wathever we want
        var uniqueID = getUniqueID(title);

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'wrapper');
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

// Define the new element
customElements.define('ygllo-window', yglloWindow);