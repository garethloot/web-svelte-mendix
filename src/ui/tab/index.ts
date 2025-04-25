import Settings from "./Tab.svelte";
import { mount } from "svelte";

const app = mount(Settings, {
  target: document.getElementById("root")!,
});

export default app;
