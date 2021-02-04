/////////////////// The Menu and Items constructors, followed by the functions to click them
var uniqueID;
var menuParent;
var subMenu;
var item;

////////////////// The main menu class /////////////////////

class yglloMainMenu extends HTMLElement {
    constructor(top, menuID) {
        super();
        this.setAttribute('id',menuID);

        menuParent = document.createElement('div');
        menuParent.setAttribute('class', 'menuParent');

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

        this.append(menuParent);
        document.body.append(this);

        this.addItem = function(itemID, text, onclick) {
            item = new yglloItem(this.id, itemID, text, onclick);
            menuParent.append(item);
        }
    }
}

customElements.define('ygllo-mainmenu', yglloMainMenu);

////////////////// The sub menu class /////////////////////

class yglloSubMenu extends HTMLElement {
    constructor(itemAttachmentID, menuID) {
        super();

        this.setAttribute('id', menuID);

        subMenu = document.createElement('div');
        subMenu.setAttribute('class', 'subMenu');

        var parentMenu = document.getElementById(itemAttachmentID).parentElement;

        // TODO : dynamise itemHeight in the CSS
        var itemPXheight = 5*6.57;

        if (parentMenu.className == "menuParent") {
            var parentLeft = parseInt(parentMenu.style.left, 10);
            var parentTop = parseInt(parentMenu.style.top, 10);
            var parentHeight = itemPXheight+"px;";
            var parentWidth = parseInt(parentMenu.style.width, 10);
    
            var verticalPosition = "top:"+parentTop+parentHeight+"px;";
            var horizontalPosition = "left:0px;";  // stack horizontally
        }

        if (parentMenu.className == "subMenu") {
            var parentLeft = parseInt(parentMenu.style.left, 10);
            var parentTop = parseInt(parentMenu.style.top, 10);

            var siblingNumber = parentMenu.childElementCount-1;
            var parentHeight = siblingNumber*itemPXheight;
            var parentWidth = parseInt(parentMenu.style.width, 10);
            var topPosition = parentTop+parentHeight;
            var leftPosition = parentLeft+parentMenu.clientWidth;

            var verticalPosition = "top:"+topPosition+"px;";  // stack vertically
            var horizontalPosition = "left:"+leftPosition+ "px;";
        }

        var wrapperStyle = "position:absolute;" +
            verticalPosition +
            horizontalPosition+
            "visibility:hidden;";
 
        subMenu.setAttribute('style', wrapperStyle);

        this.append(subMenu);
        document.body.append(this);

        this.addItem = function(itemID, text, onclick) {
            item = new yglloItem(this.id, itemID, text, onclick);
            subMenu.append(item);
        }
    }
}
customElements.define('ygllo-submenu', yglloSubMenu);

///////////////////////// the item class ////////////////////////

class yglloItem extends HTMLElement {
    constructor(parentID, itemID, itemText, onclick) {
        super();
        this.setAttribute('id', itemID);

        var parentType = document.getElementById(parentID).firstChild.className;

        item = document.createElement('span');
        if (parentType=="subMenu") {
            item.setAttribute('style','display:block; vertical-align:middle;');
        }

        item.setAttribute('class', 'menuItem');
        item.setAttribute('onclick', onclick);
        item.innerHTML = itemText;

        this.append(item);
        document.getElementById(parentID).append(this);
    }
}
customElements.define('ygllo-item', yglloItem);

///////////////// the functions to create and click the menu  /////////////////

function openSubMenu(subMenuID) {
    var subMenuVisibility = document.getElementById(subMenuID).firstChild.style.visibility;
    if (subMenuVisibility == "hidden") {   /// don't over simplify please, it will not work
        document.getElementById(subMenuID).firstChild.style.visibility = "visible";
    }
    if (subMenuVisibility == "visible") {
        document.getElementById(subMenuID).firstChild.style.visibility = "hidden";
    }
}

function openWindow(windowID) {
    console.log(document.getElementById(windowID).style.visibility);
    document.getElementById(windowID).style.visibility = "visible";
}