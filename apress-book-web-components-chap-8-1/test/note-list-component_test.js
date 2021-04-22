import { NoteListComponent } from "../note-list-component.js";
import { fixture, html } from "@open-wc/testing";

const assert = chai.assert;

suite("note-list-component", () => {
  test("is defined", () => {
    const el = document.createElement("note-list-component");
    assert.instanceOf(el, NoteListComponent);
  });

  test("renders with default values", async () => {
    const el = await fixture(html`<note-list-component></note-list-component>`);
    assert.shadowDom.equal(el, ``);
  });
});
