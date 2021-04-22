import { LitElement, html } from "lit-element";

/**
 * A Note List Component
 */
export class NoteListComponent extends LitElement {
  static get properties() {
    return {
      /**
       * The attribute is an Array of elements.
       */
      notes: {
        type: Array,
        attribute: true,
        reflect: true,
      },
    };
  }

  constructor() {
    super();
    this.notes = this.getAttribute("notes") || [];
    this.addEventListener("del-event", this.handleDelEvent);
  }

  attributeChangedCallback() {
    this.notes = [...this.notes];
    super.attributeChangedCallback();
  }

  render() {
    return html`
      ${this.notes.map((note, idx) => {
        return html` <note-list-item-component
          note="${JSON.stringify(note)}"
          idx="${idx}"
        ></note-list-item-component>`;
      })}
    `;
  }

  handleDelEvent(e) {
    this.notes.splice(e.detail.idx, 1);
    this.requestUpdate();
  }
}

window.customElements.define("note-list-component", NoteListComponent);
