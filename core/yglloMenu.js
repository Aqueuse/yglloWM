/////////////////// The Menu and Items constructors, followed by the functions to click them

////////////////// The sub menu class /////////////////////
class yglloMenuContainer extends HTMLElement {
    /** 
      * @param {string} parentNodeID - the parent node ID, if type is horizontal, it's always body
      * @param {string} ID - the element ID
      * @param {string} type - vertical or horizontal ?
      * @param {number} top - if horizontal, top position
    */
    constructor(parentNodeID, ID, type, top) {
        super();

        this.setAttribute('id', ID);
        var menuWrapper = document.createElement('div');

        if (parentNodeID == "body") {
            menuWrapper.setAttribute('class', 'menuParent');
        }
        else {
            menuWrapper.setAttribute('class', 'subMenu');
        }
        this.append(menuWrapper);
    }
}
customElements.define('ygllo-menucontainer', yglloMenuContainer);

///////////////////////// the item class ////////////////////////
class yglloMenuContent extends HTMLElement {
    /**
    * @param {string} parentID the parent element ID
    * @param {string} itemID the chosen item ID
    * @param {string} itemText the inner content
    * @param {string} mouseEvent the mouse event to react
    * @param {string} eventFunction the action to perform on mouseEvent
    */
    constructor(parentID, itemID, itemText, mouseEvent, eventFunction) {
        super();
        this.setAttribute('id', itemID);

        var item = document.createElement('span');
        item.setAttribute('class', 'menuItem');
        item.setAttribute(mouseEvent, eventFunction);
        item.innerHTML = itemText;
        this.append(item);

        familyTreeAppend("leaf", itemID, parentID);
    }
}
customElements.define('ygllo-menucontent', yglloMenuContent);

///////////////// the functions to create and click the menu  /////////////////

/// methods to wrap and ease the final creation of Menus, subMenus and items
/**
 * @param {string} id - the menu ID
 * @param {number} top - the vertical position in px
 */
function createHorizontalMenu(id, top) {
    var mainMenu = new yglloMenuContainer("body", id, "horizontal", top);
    familyTreeAppend("node", id, "body");
    document.body.append(mainMenu);
    menuPlacement(id, "body", top);
}

/**
 * @param {string} parentID - the parent menu ID
 * @param {string} ID - this submenu ID
 */
function createSubMenu(parentID, id) {
    var subMenu = new yglloMenuContainer(parentID, id, "vertical", 0);
    familyTreeAppend("node", id, parentID);
    document.body.append(subMenu);
    menuPlacement(id, parentID, 0);
}

/**
 * @param {string} menuID - the menu where this item is added
 * @param {string} ID - this item ID
 * @param {string} innerText - the text of this item
 * @param {string} mouseEventType - the mouse event 
 */
function createMenuLeaf(menuID, ID, innerText, eventFunction) {
    var eventMouse = "onclick";
    var item = new yglloMenuContent(menuID, ID, innerText, eventMouse, eventFunction);
    document.getElementById(menuID).firstChild.append(item);
}

/**
 * @param {string} menuID - the menu where this item is added
 * @param {string} ID - this menu ID
 * @param {string} innerText - the text of this item
 * @param {string} subMenuID - the submenu to open
 */
function createSubMenuOpener(menuID, ID, innerText, subMenuID) {
    if (document.getElementById(menuID).firstChild.className == "menuParent") {
        var eventMouse = "onclick";
    }
    else {
        var eventMouse = "onmouseover";
    }
    var item = new yglloMenuContent(menuID, ID, innerText, eventMouse, "openSubMenu(" + subMenuID + ")");
    document.getElementById(menuID).firstChild.append(item);
}

////// We place the elements after they are created ////
function menuPlacement(elementID, parentID, top) {
    // si le menu est un main menu ...
    if (parentID == "body") {
        var style = "top :"+top+"px;";
        document.getElementById(elementID).firstChild.setAttribute('style', style);
    }

    // si le menu est un sub menu ...
    else {
        var parentMenu = document.getElementById(parentID).parentElement;
        const itemPXheight = 20;

        // si le subMenuOpener est dans le mainMenu ... 
        if (parentMenu.className == "menuParent") {
            var parentLeft = parseInt(parentMenu.style.left, 10);
            var parentTop = parseInt(parentMenu.style.top, 10);
            var parentHeight = itemPXheight + "px;";

            var left = "top:" + parentTop + parentHeight + "px;";
            var top = "left:0px;";  // stack horizontally
            var style = left + top;
            document.getElementById(elementID).firstChild.setAttribute('style', style);
        }

        /// si le subMenuOpener est dans un subMenu ...
        if (parentMenu.className == "subMenu") {
            var parentLeft = parseInt(parentMenu.style.left, 10);
            var parentTop = parseInt(parentMenu.style.top, 10);

            var siblingNumber = parentMenu.childElementCount - 1;
            var parentHeight = siblingNumber * itemPXheight;
            var top = parentTop + parentHeight;
            var left = parentLeft + parentMenu.clientWidth;

            var verticalPosition = "top:" + top + "px;";  // stack vertically
            var horizontalPosition = "left:" + left + "px;";

            var style = verticalPosition + horizontalPosition;
            document.getElementById(elementID).firstChild.setAttribute('style', style);
        }
    }
}

////// methods to interact with the menus and items
function familyTreeAppend(type, ID, parentID) {
    var node;
    if (type == "node") {
        if (parentID == "body") {
            console.log("add a root node");
            var familyTree = document.createElement('xml');
            familyTree.setAttribute('id', 'familyTree' + ID);
            document.body.append(familyTree);
        }
        else {
            console.log("add a node");
            node = document.createElement('node');
            node.setAttribute('id', "familyTree" + ID);
            document.getElementById('familyTree' + parentID).append(node);
        }
    }
    if (type == "leaf") {
        console.log("add a leaf");
        node = document.createElement('leaf');
        node.setAttribute('id', "familyTree" + ID);
        document.getElementById("familyTree" + parentID).append(node);
    }
}

function openSubMenu(subMenuID) {
    var subMenuVisibility = document.getElementById(subMenuID).firstChild.style.visibility;
    if (subMenuVisibility == "hidden") {   /// don't over simplify please, it will not work
        document.getElementById(subMenuID).firstChild.style.visibility = "visible";
    }
    if (subMenuVisibility == "visible") {
        document.getElementById(subMenuID).firstChild.style.visibility = "hidden";
    }
}

/// when a menu is closed, close all his childrens by consulting the family tree
function closeSubMenu(element) {
    console.log(element);
}

function openWindow(windowID) {
    console.log(document.getElementById(windowID).style.visibility);
    document.getElementById(windowID).style.visibility = "visible";
}