/////////////////// The Menu and Items constructors, followed by the functions to click them
var uniqueID;
var menuParent;
var subMenu;
var item;

////////////////// The main menu class /////////////////////

class yglloMainMenu extends HTMLElement {
    constructor(top, menuName) {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        this.setAttribute('name',"parentMenu");
        uniqueID = getUniqueID("menu-" + top);

        // generate CSS to apply to the menu
        const style = document.createElement('style');
        var generalImport = "@import './CSS/yglloWM.css';\n";
        style.textContent = generalImport;

        menuParent = document.createElement('div');
        menuParent.setAttribute('class', 'menuParent');
        menuParent.setAttribute('name',menuName);
        menuParent.setAttribute('id', uniqueID);

        // this background allow us to organize things simply with inline elements
        // var menuBarBackground = document.createElement('div');
        // menuBarBackground.setAttribute('class', 'menuBarBackground');
        // menuBarBackground.setAttribute('style', "position: absolute; left:0px; width:100%;");
        // menuParent.appendChild(menuBarBackground);

        var verticalPosition = "top:" + top + "px;";
        var horizontalPosition = "left:0px;";
        var width = "width:100%;";
        var height = "height:5vh;";
        var parentStyle = "position:absolute;" +
            verticalPosition +
            horizontalPosition +
            width +
            height+
            "display:inline;";
 
        menuParent.setAttribute('style', parentStyle);

        shadow.appendChild(style);
        shadow.append(menuParent);

        this.addItem = function(name, onclick) {
            item = new yglloItem("mainMenu", name, onclick);
            menuParent.append(item);
        }
    }
}

customElements.define('ygllo-mainmenu', yglloMainMenu);

////////////////// The sub menu class /////////////////////

class yglloSubMenu extends HTMLElement {
    constructor(parentMenuName, menuName) {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        this.setAttribute('name', menuName);
        this.setAttribute('class', 'subMenu');

        // generate CSS to apply to the menu
        const style = document.createElement('style');
        var generalImport = "@import './CSS/yglloWM.css';\n";
        style.textContent = generalImport;

        subMenu = document.createElement('div');

        var parentTop = parseInt(document.getElementsByName(parentMenuName)[0].shadowRoot.childNodes[1].style.top, 10);
        var parentVhHeight = document.getElementsByName(parentMenuName)[0].shadowRoot.childNodes[1].style.height;
        var parentHeight = parseInt(parentVhHeight,10)*6.57;

        var verticalPosition = "top:"+parentTop+parentHeight+"px;";
        var horizontalPosition = "left:0px;";

        var wrapperStyle = "position:absolute;" +
            verticalPosition +
            horizontalPosition+
            "visibility:hidden;";
 
        this.setAttribute('style', wrapperStyle);

        shadow.appendChild(style);
        shadow.append(subMenu);

        this.addItem = function(name, onclick) {
            item = new yglloItem("subMenu", name, onclick);
            subMenu.append(item);
        }
    }
}

customElements.define('ygllo-submenu', yglloSubMenu);

///////////////////////// the item class ////////////////////////

class yglloItem extends HTMLElement {
    constructor(parentType, itemName, onclick) {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        uniqueID = getUniqueID("item-" + itemName);

        const style = document.createElement('style');
        var generalImport = "@import './CSS/yglloWM.css';\n";
        style.textContent = generalImport;

        item = document.createElement('span');
        if (parentType=="subMenu") {
            item.setAttribute('style','display:block; vertical-align:middle;');
        }

        item.setAttribute('id', uniqueID);
        item.setAttribute('class', 'menuItem');
        item.innerHTML = itemName;
        item.setAttribute('onclick', onclick);

        shadow.appendChild(style);
        shadow.appendChild(item);
    }
}

customElements.define('ygllo-item', yglloItem);

///////////////// the functions to create and click the menu  /////////////////

function openSubMenu(itemClicked, subMenuName) {
    // we will display the submenu and move it at the top/right corner of the item
//    console.log(itemClicked);
    document.getElementsByName(subMenuName)[0].style.visibility = "visible";
    console.log(document.getElementsByName(subMenuName));
}

function openWindow(windowName) {
    // find the parent menu
    var parentTop = document.getElementsByName(windowName)[0].shadowRoot.childNodes[1].style.top;
    var parentHeight = document.getElementsByName(windowName)[0].shadowRoot.childNodes[1].style.height;

    console.log(parentHeight);
}