// Create a class for the element
class yglloWindow extends HTMLElement {
    constructor(title, left, top, width, height) {
        // Always call super first in constructor
        super();

        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Create div
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'wrapper');
        wrapper.setAttribute('id', title);

        const borderLeft = document.createElement('div');
        borderLeft.setAttribute('class', 'windowBorder borderLeft');
        borderLeft.setAttribute('onmousedown', 'mouseDown(this)');
        borderLeft.setAttribute('id', 'borderLeftID');
        const borderRight = document.createElement('div');
        borderRight.setAttribute('class', 'windowBorder borderRight');
        borderRight.setAttribute('onmousedown', 'mouseDown(this)');
        borderRight.setAttribute('id', 'borderRightID');
        const borderTop = document.createElement('div');
        borderTop.setAttribute('class', 'windowBorder borderTop');
        borderTop.setAttribute('onmousedown', 'mouseDown(this)');
        borderTop.setAttribute('id', 'borderTopID');
        const borderBottom = document.createElement('div');
        borderBottom.setAttribute('class', 'windowBorder borderBottom');
        borderBottom.setAttribute('onmousedown', 'mouseDown(this)');
        borderBottom.setAttribute('id', 'borderBottomID');

        const header = document.createElement('div');
        header.setAttribute('class', 'windowHeader');
        header.setAttribute('onmousedown', 'mouseDown(this)');
        header.setAttribute('id', 'headerID');

        // Create some CSS to apply to the shadow dom
        const style = document.createElement('style');
        var generalImport = "@import './yglloWM.css';\n";
        var positionAbsolute = "position : absolute;\n";
        left = "left : "+left+"px;\n";
        top = "top : "+top+"px;\n";
        width = "width : "+width+"px;\n";
        height = "height : "+height+"px;\n";

        var wrapperStyle=generalImport+".wrapper {\n"+positionAbsolute+left+top+width+height+"\n}\n";
        style.textContent=wrapperStyle;

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