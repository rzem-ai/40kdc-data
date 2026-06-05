import { mount } from "svelte";
import "./app.css";

// Viewer by default; the authoring editor stays behind #edit. The dynamic
// imports keep the two as split bundles, so the editor's model/board weight
// never loads for viewers.
const editor = location.hash === "#edit";
const load = editor ? import("./App.svelte") : import("./Viewer.svelte");
void load.then(({ default: Root }) => {
  mount(Root, { target: document.getElementById("app")! });
});

// The mode is decided at boot; flipping the hash mid-session reloads into the
// other app rather than hot-swapping component trees.
window.addEventListener("hashchange", () => {
  if ((location.hash === "#edit") !== editor) location.reload();
});
