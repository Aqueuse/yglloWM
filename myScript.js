createWindow("window 1", "window1", 20, 50, 100, 100);

createHorizontalMenu("myFirstMainMenu", 0);
createMenuLeaf("myFirstMainMenu", "item1", "item 1", "console.log('item1')");

createSubMenu("myFirstMainMenu", "firstSubMenu");
createSubMenuOpener("myFirstMainMenu", "opener1", "subMenuOpener", "firstSubMenu");