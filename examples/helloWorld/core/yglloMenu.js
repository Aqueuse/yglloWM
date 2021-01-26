// Create a class for the element
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
        Object.keys(JSONcontent).forEach( (v, i) => {
            //console.log(i+" : "+v+" = "+JSONcontent[v]);
            item = document.createElement('span');
            item.setAttribute('id',uniqueID+'-item-'+i);
            item.setAttribute('class','menuLevel0');

            link = document.createElement('a');
            link.innerHTML = JSONcontent[v];
            link.setAttribute('id', uniqueID+'-link-'+i);
            link.setAttribute('class','menuLink');

            item.appendChild(link);
            menuWrapper.appendChild(item);
        });

        shadow.appendChild(style);
        shadow.appendChild(menuWrapper);
    }
}

customElements.define('ygllo-menu', yglloMenu);