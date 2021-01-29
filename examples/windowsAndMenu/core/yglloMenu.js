/////////////////// The Menu and Items constructors, followed by the functions to click them
var uniqueID;
var menuParent;
var subMenu;
var item;

////////////////// The main menu class /////////////////////

class yglloMainMenu extends HTMLElement {
    constructor(top) {
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
        menuParent.setAttribute('id', uniqueID);

        // this background allow us to organize things simply with inline elements
        // var menuBarBackground = document.createElement('div');
        // menuBarBackground.setAttribute('class', 'menuBarBackground');
        // menuBarBackground.setAttribute('style', "position: absolute; left:0px; width:100%;");
        // menuParent.appendChild(menuBarBackground);

        var verticalPosition = "top : " + top + "px;";
        var horizontalPosition = "left : 0px;";
        var width = "width:100%;";
        var height = "height:5vh;";
        var parentStyle = "position : absolute;" +
            verticalPosition +
            horizontalPosition +
            width +
            height;
 
        menuParent.setAttribute('style', parentStyle);

        shadow.appendChild(style);
        shadow.append(menuParent);

        this.addItem = function(name, onclick) {
            item = new yglloItem(verticalPosition, horizontalPosition, name, onclick);
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
        uniqueID = getUniqueID("submenu-");

        // generate CSS to apply to the menu
        const style = document.createElement('style');
        var generalImport = "@import './CSS/yglloWM.css';\n";
        style.textContent = generalImport;

        subMenu = document.createElement('div');
        subMenu.setAttribute('class', 'subMenu');
        subMenu.setAttribute('id', uniqueID);

        var parentTop = document.getElementsByName(parentMenuName)[0].shadowRoot.childNodes[1].style.top;
        console.log(parentTop);
        var verticalPosition = "top : "+parentTop+";";
        var horizontalPosition = "left : 0px;";

        var wrapperStyle = "position : absolute;" +
            verticalPosition +
            horizontalPosition;
 
        subMenu.setAttribute('style', wrapperStyle);

        shadow.appendChild(style);
        shadow.append(subMenu);

        this.addItem = function(name, onclick) {
            item = new yglloItem(verticalPosition, horizontalPosition, name, onclick);
            subMenu.append(item);
        }
    }
}

customElements.define('ygllo-submenu', yglloSubMenu);

///////////////////////// the item class ////////////////////////

class yglloItem extends HTMLElement {
    constructor(parentTop, parentLeft, name, onclick) {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        uniqueID = getUniqueID("item-" + name);

        const style = document.createElement('style');
        var generalImport = "@import './CSS/yglloWM.css';\n";
        style.textContent = generalImport;

        item = document.createElement('span');
        item.setAttribute('id', uniqueID);
        item.setAttribute('class', 'menuItem');
        item.innerHTML = name;
        item.setAttribute('onclick', onclick);
        item.setAttribute('style',"position:relative;");

        shadow.appendChild(style);
        shadow.appendChild(item);
    }
}

customElements.define('ygllo-item', yglloItem);

///////////////// the functions to create and click the menu  /////////////////

function openSubMenu(itemClicked, subMenuName) {
    console.log("Hi, I will open this subMenu\nI am "+itemClicked.id);
    // we will display the submenu and move it at the top/right corner of the item
    console.log(itemClicked);
    console.log(document.getElementsByName(subMenuName)[0].shadowRoot.childNodes[1].style.top);
}

function openWindow(windowName) {
    console.log(document.getElementsByName(windowName)[0].shadowRoot.childNodes[1].style.top);
}