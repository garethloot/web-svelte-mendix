import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import * as dotenv from "dotenv";

dotenv.config();

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProd = command === "build";
  console.log("isProd", isProd);
  return {
    plugins: [svelte()],
    build: {
      minify: false,
      outDir: process.env.VITE_OUT_DIR || "./dist/extension-name",
      rollupOptions: {
        input: {
          ...(isProd ? { main: "src/main.ts" } : {}),
          tab: "src/ui/tab/index.ts",
          style: "src/style.css",
        },
        ...(isProd
          ? {
              external: [
                "@mendix/component-framework",
                "@mendix/model-access-sdk",
              ],
            }
          : {}),
        output: {
          format: "es",
          entryFileNames: "[name].js",
          chunkFileNames: "[name].js",
          assetFileNames: "[name].[ext]",
          exports: "named",
        },
        preserveEntrySignatures: "strict",
      },
    },
  };
});
