# Svelte Mendix Extension Template

This project provides a template for developing Mendix Studio Pro extensions using Svelte. It allows you to create custom UI elements, tabs, and menus to enhance the Mendix development experience.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Mendix Studio Pro (10.21.0 or higher)

### Mendix setup

Start Studio Pro with the following command line parameters to tell it to use the extensions in the folder.
You can set this in the shortcut settings for mendix
--enable-extension-development --enable-webview-debugging

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/garethloot/web-svelte-mendix.git
   cd web-svelte-mendix
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure your environment:

   - Create a `.env` file in the root directory of your project (at the same level as package.json)
   - Add the following content to point to your Mendix project:

     ```
     # Path to your Mendix project's webextensions folder, followed by your extension name
     # Windows example:
     VITE_OUT_DIR=C:/Users/YourUsername/Documents/Mendix/YourProject/webextensions/extension-name

     # macOS/Linux example:
     # VITE_OUT_DIR=/Users/YourUsername/Documents/Mendix/YourProject/webextensions/extension-name
     ```

   - Replace the path with the actual path to your Mendix project
   - Make sure to use forward slashes (/) even on Windows
   - The extension name in the path should match the `componentName` in your `main.ts` file (without the "extension/" prefix)

## Development

### Development Server

This is only ment to test components that do not rely on the @mendix/extensions-api because this only works in mendix studio pro.
Any component that import @mendix/extensions-api will crash the dev server. So you probably have to use mock input data for component props.

Start the development server:

```bash
npm run dev
```

This will start a local server with hot module replacement, allowing you to develop your components with live updates.

### Building for Production

Build the extension for production:

```bash
npm run build
```

This will create optimized production files in the directory specified in your `.env` file or in ./dist/exension-name.

## Project Structure

```
web-svelte-mendix/
├── src/
|   ├── lib                # Place to put general svelte componets
│   ├── main.ts            # Main entry point for Studio Pro extension
│   ├── ui/                # UI components
│   │   ├── tab/           # Tab UI components
│   │   │   ├── index.ts   # Entry point for tab UI
│   │   │   ├── Tab.svelte # Main Svelte component for tab
│   ├── style.css          # Global styles
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
```

## Creating UI Components

### Menu Items and Tabs

The extension menu structure is defined in `main.ts`. To add new menu items and tabs:

1. Update the menu structure in the `loaded` method:

```typescript
await studioPro.ui.extensionsMenu.add({
  menuId: "your-extension-name.MainMenu",
  caption: "Your Extension Name",
  subMenus: [
    { menuId: "your-extension-name.MenuItem1", caption: "Menu Item 1" },
    { menuId: "your-extension-name.MenuItem2", caption: "Menu Item 2" },
  ],
});
```

2. Add event listeners for menu item clicks:

```typescript
studioPro.ui.extensionsMenu.addEventListener(
  "menuItemActivated",
  async (args) => {
    if (args.menuId === "your-extension-name.MenuItem1") {
      await studioPro.ui.tabs.open(
        {
          title: "Tab Name 1",
        },
        {
          componentName: "extension/your-extension-name",
          uiEntrypoint: "tab1",
          queryParams: { key: "value" },
        }
      );
    } else if (args.menuId === "your-extension-name.MenuItem2") {
      await studioPro.ui.tabs.open(
        {
          title: "Tab Name 2",
        },
        {
          componentName: "extension/your-extension-name",
          uiEntrypoint: "tab2",
        }
      );
    }
  }
);
```

### Creating New Tab UIs

1. Create a new directory for your tab UI in the `src/ui` directory:

```
src/ui/newtab/
├── index.ts
├── App.svelte
├── components/
```

2. Create an entry point file (`index.ts`):

```typescript
import "./styles.css";
import App from "./App.svelte";

const target = document.getElementById("root");
if (!target) throw new Error("Target element not found");

const app = new App({
  target,
});

export default app;
```

3. Create the main Svelte component (`App.svelte`):

```svelte
<script lang="ts">
</script>

<main>
  <h1>Your New Tab</h1>
</main>

<style>
  main {
    padding: 1em;
    max-width: 800px;
    margin: 0 auto;
  }
  h1 {
    color: #333;
    text-align: center;
  }
</style>
```

4. Update the Vite configuration to include your new tab:

```typescript
// In vite.config.ts
rollupOptions: {
  input: {
    ...(isProd ? { main: "src/main.ts" } : {}),
    tab1: "src/ui/tab/index.ts",
    tab2: "src/ui/newtab/index.ts", // Add your new tab
    style: "src/style.css",
  },
  // ...
}
```

5. Update the `main.ts` to reference the new tab UI:

```typescript
if (args.menuId === "your-extension-name.MenuItem2") {
  await studioPro.ui.tabs.open(
    {
      title: "New Tab",
    },
    {
      componentName: "extension/your-extension-name",
      uiEntrypoint: "tab2", // This must match the key in the vite.config.ts input
    }
  );
}
```

## Troubleshooting

### Extension not showing up in Mendix

- Verify that your build output is correctly configured in the `.env` file
- Check the Mendix Studio Pro logs for any errors
- Ensure that your extension is properly exported in the `main.ts` file

### Build issues

- Check for TypeScript errors in your code
- Verify that all dependencies are installed
- Make sure the build output includes the export statement for components

## License

MIT
