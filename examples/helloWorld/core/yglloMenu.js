/////////////////// The Menu constructor, followed by the functions to click them

////////////////// The menu class /////////////////////
class yglloMenu extends HTMLElement {
    constructor(JSONcontent, HorizontalPosition) {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        // generate CSS to apply to the window
        const style = document.createElement('style');
        var generalImport = "@import './CSS/yglloWM.css';\n";
        style.textContent=generalImport;

        if (HorizontalPosition === "above") {
            var verticalPosition = "top:0px;";
        }
        if (HorizontalPosition === "below") {
            var verticalPosition = "bottom:0px;";
        }

        var wrapperStyle="position : absolute;"+verticalPosition;

        const menuWrapper = document.createElement('div');
        menuWrapper.setAttribute('class', 'menuWrapper');
        menuWrapper.setAttribute('style', wrapperStyle);
 
        var item;
        var link;
        var uniqueID = getUniqueID("menu"+HorizontalPosition);

        // this background allow us to organize things simply with inline elements
        var menuBarBackground = document.createElement('div');
        menuBarBackground.setAttribute('class', 'menuBarBackground');
        menuBarBackground.setAttribute('style', "position: absolute; right:0px; width:100%;");
        menuWrapper.appendChild(menuBarBackground);

        // read the JSONcontent, add each element to the menuWrapper
        Object.keys(JSONcontent).forEach( (value, index) => {
            item = document.createElement('span');
            item.setAttribute('id',uniqueID+'-item-'+index);
            item.setAttribute('class','menuLevel0');
            item.setAttribute('onclick', 'console.log(this.id);');

            link = document.createElement('a');
            link.innerHTML = JSONcontent[value];
            link.setAttribute('id', uniqueID+'-link-'+index);
            link.setAttribute('class','menuLink');

            item.appendChild(link);
            menuWrapper.appendChild(item);
        });

        shadow.appendChild(style);
        shadow.appendChild(menuWrapper);
    }
}

customElements.define('ygllo-menu', yglloMenu);

///////////////// the functions to click the menu  ///////////////////////