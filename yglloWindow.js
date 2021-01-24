// Create a class for the element
class yglloWindow extends HTMLElement {
    constructor(title, left, top, width, height) {
        // Always call super first in constructor
        super();

        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Create some initial CSS to apply to the shadow dom
        const style = document.createElement('style');
        var generalImport = "@import './yglloWM.css';\n";
        var positionAbsolute = "position : absolute;\n";
        left = "left : "+left+"px;\n";
        top = "top : "+top+"px;\n";
        width = "width : "+width+"px;\n";
        height = "height : "+height+"px;\n";

        var wrapperStyle=generalImport+".wrapper {\n"+positionAbsolute+left+top+width+height+"\n}\n";
        style.textContent=wrapperStyle;

        var uniqueID = getUniqueID(title);

        // Create div
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'wrapper');
        wrapper.setAttribute('id', uniqueID);

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

        const header = document.createElement('div');
        header.setAttribute('class', 'windowHeader');
        header.setAttribute('onmousedown', 'mouseDown(this)');
        header.setAttribute('id', 'headerID-'+uniqueID);
        header.innerHTML = title;

        // Attach the created elements to the shadow dom
        wrapper.appendChild(borderLeft);
        wrapper.appendChild(borderRight);
        wrapper.appendChild(borderTop);
        wrapper.appendChild(borderBottom);
        wrapper.appendChild(header);

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }
}

// Define the new element
customElements.define('ygllo-window', yglloWindow);