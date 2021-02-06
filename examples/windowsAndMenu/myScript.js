createWindow("window 1", "window1", 20, 50, 100, 100);

createHorizontalMenu("mainMenu", 0);
createMenuLeaf("mainMenu", "item1", "item 1", "console.log('echo')");
createMenuLeaf("mainMenu", "item2", "item 2", "console.log('echo')");

createSubMenu("mainMenu","subMenu1");
createSubMenuOpener("mainMenu", "item2", "item 3", "subMenu1");