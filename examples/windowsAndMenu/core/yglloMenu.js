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

        // TODO : dynamise itemHeight in the CSS
        var itemPXheight = 5*6.57;

        if (type == "horizontal") {
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
     
            menuWrapper.setAttribute('class', 'menuParent');
            menuWrapper.setAttribute('style', parentStyle);

            familyTreeAppend("node", ID, "body");
        }

        if (type == "vertical") {
            var parentMenu = document.getElementById(parentNodeID).parentElement;

            if (parentMenu.className == "menuParent") {
                var parentLeft = parseInt(parentMenu.style.left, 10);
                var parentTop = parseInt(parentMenu.style.top, 10);
                var parentHeight = itemPXheight+"px;";
        
                var verticalPosition = "top:"+parentTop+parentHeight+"px;";
                var horizontalPosition = "left:0px;";  // stack horizontally
                var wrapperStyle = "position:absolute;" +
                    verticalPosition +
                    horizontalPosition+
                    "visibility:hidden;";
            }
    
            if (parentMenu.className == "subMenu") {
                var parentLeft = parseInt(parentMenu.style.left, 10);
                var parentTop = parseInt(parentMenu.style.top, 10);
    
                var siblingNumber = parentMenu.childElementCount-1;
                var parentHeight = siblingNumber*itemPXheight;
                var topPosition = parentTop+parentHeight;
                var leftPosition = parentLeft+parentMenu.clientWidth;
    
                var verticalPosition = "top:"+topPosition+"px;";  // stack vertically
                var horizontalPosition = "left:"+leftPosition+ "px;";
    
                var wrapperStyle = "position:absolute;" +
                verticalPosition +
                horizontalPosition+
                "visibility:hidden;";
            }

            menuWrapper.setAttribute('class','subMenu');
            menuWrapper.setAttribute('style', wrapperStyle);

            familyTreeAppend("node", ID, parentNodeID);
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

        var parentType = document.getElementById(parentID).firstChild.className;
        var item = document.createElement('span');

        if (parentType=="subMenu") {
            item.setAttribute('style','display:block; vertical-align:middle;');
        }

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
    document.body.append(mainMenu);
}

/**
 * @param {string} parentID - the parent menu ID
 * @param {string} ID - this submenu ID
 */
function createSubMenu(parentID, ID) {
    var subMenu = new yglloMenuContainer(parentID, ID, "vertical", 0);
    document.body.append(subMenu);
}

/**
 * @param {string} menuID - the menu where this item is added
 * @param {string} ID - this menu ID
 * @param {string} innerText - the text of this item
 * @param {string} mouseEventType - the mouse event 
 */
function createMenuLeaf(menuID, ID, innerText, eventFunction) {
    var item = new yglloMenuContent(menuID, ID, innerText, "onclick", eventFunction);
    document.getElementById(menuID).append(item);
}

/**
 * @param {string} menuID - the menu where this item is added
 * @param {string} ID - this menu ID
 * @param {string} innerText - the text of this item
 * @param {string} subMenuID - the submenu to open
 */
function createSubMenuOpener(menuID, ID, innerText, subMenuID) {
    var item = new yglloMenuContent(menuID, ID, innerText, "onmouseover", "openSubMenu("+subMenuID+")");
    document.getElementById(menuID).append(item);
}

////// method to interact with the menus and items

function familyTreeAppend(type, ID, parentID) {
    var node;
    if (type=="node") {
        if (parentID == "body") {
            console.log("add a root node");
            var familyTree = document.createElement('xml');
            familyTree.setAttribute('id','familyTree'+ID);
            document.body.append(familyTree);
        }
        else {
            console.log("add a node");
            node = document.createElement('node');
            node.setAttribute('id',"familyTree"+ID);
            document.getElementById('familyTree'+parentID).append(node);
        }
    }
    if (type == "leaf") {
        console.log("add a leaf");
        node = document.createElement('leaf');
        node.setAttribute('id',"familyTree"+ID);
        document.getElementById("familyTree"+parentID).append(node);
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