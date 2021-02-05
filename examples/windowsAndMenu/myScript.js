window1 = new yglloWindow("my window 1", "window1", 10, 100, 150, 200);
document.body.append(window1);

mainMenu = new yglloMenuContainer("body","mainMenu","horizontal",0);
document.body.append(mainMenu);

item1 = new yglloMenuContent("mainMenu", "item1", "item 1", onclick, "console.log('click')");
document.body.append(item1);