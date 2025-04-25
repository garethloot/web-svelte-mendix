import { type IComponent, studioPro } from "@mendix/extensions-api";

class Main implements IComponent {
  async loaded() {
    await studioPro.ui.extensionsMenu.add({
      menuId: "extension-name.MainMenu",
      caption: "Exension Name",
      subMenus: [
        { menuId: "extension-name.ShowTabMenuItem", caption: "Show tab" },
      ],
    });

    studioPro.ui.extensionsMenu.addEventListener(
      "menuItemActivated",
      async (args) => {
        if (args.menuId === "svelte.ShowTabMenuItem") {
          await studioPro.ui.tabs.open(
            {
              title: "Tab Name",
            },
            {
              componentName: "extension/extension-name",
              uiEntrypoint: "tab",
            }
          );
        }
      }
    );
  }
}

export const component: IComponent = new Main();
