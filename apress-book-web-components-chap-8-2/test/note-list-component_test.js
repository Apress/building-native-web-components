import { NoteListItemComponent } from "../note-list-item-component.js";
import { fixture, html } from "@open-wc/testing";

const assert = chai.assert;

suite("note-list-item-component", () => {
  test("is defined", () => {
    const el = document.createElement("note-list-item-component");
    assert.instanceOf(el, NoteListItemComponent);
  });

  test("renders with default values", async () => {
    const el = await fixture(html`<note-list-item-component></note-list-item-component>`);
    assert.shadowDom.equal(el, `
    <div class="note">
      <p><strong></strong></p><br/>
      <button type="button" id="deleteButton">Delete</button>
    </div>
    `);
  });
});
