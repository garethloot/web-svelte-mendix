import Settings from "./Test.svelte";
import { mount } from "svelte";

const app = mount(Settings, {
  target: document.getElementById("root")!,
});

export default app;
