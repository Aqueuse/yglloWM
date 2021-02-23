createWindow("window 1", "window1", 20, 50, 100, 100);

createHorizontalMenu("myFirstMainMenu", 0);

createMenuLeaf("myFirstMainMenu", "item1", "item 1", "console.log('item1')");
createSubMenuOpener("myFirstMainMenu", "opener1", "subMenuOpener", "firstSubMenu");
createMenuLeaf("myFirstMainMenu", "item5", "item 5", "console.log('item5')");
createMenuLeaf("myFirstMainMenu", "item9", "item 9", "console.log('item9')");

createSubMenu("myFirstMainMenu", "firstSubMenu");

createMenuLeaf("firstSubMenu", "item2", "item 2", "console.log('item2')");
createMenuLeaf("firstSubMenu", "item3", "item 3", "console.log('item3')");
createMenuLeaf("firstSubMenu", "item4", "item 4", "console.log('item4')");

createSubMenu("firstSubMenu", "secondSubMenu");
createSubMenuOpener("firstSubMenu", "opener2", "subMenuOpener2", "secondSubMenu");

createMenuLeaf("secondSubMenu", "item6", "item 6", "console.log('item6')");
createMenuLeaf("secondSubMenu", "item7", "item 7", "console.log('item7')");
createMenuLeaf("secondSubMenu", "item8", "item 8", "console.log('item8')");

