import { LitElement, html, css } from "lit-element";

/**
 * A Note List Item Component
 */
export class NoteListItemComponent extends LitElement {
  static get properties() {
    return {
      /**
       * The attribute is an Object.
       */
      note: {
        type: Object,
        attribute: true,
        reflect: true,
      },
      /**
       * The attribute is a number.
       */
      idx: {
        type: Number,
        attribute: true,
        reflect: true,
      }
    };
  }

  static get styles() {
    return css`
      .note {
        background-color: #ffffcc;
        border-left: 6px solid #ffeb3b;
      }
      
      div {
        margin: 5px 0px 5px;
        padding: 4px 12px;
      }
    `;
  }

  constructor() {
    super();
    this.note = JSON.parse(this.getAttribute('note')) || {};
    this.idx = this.getAttribute('idx') || -1;
  }

  render() {
    return html`
    <div class="note">
      <p><strong>${this.note.title}</strong> ${this.note.description}</p><br/>
      <button type="button" id="deleteButton" @click="${this.handleDelete}">Delete</button>
    </div>
    `;
  }

  handleDelete() {
    this.dispatchEvent(new CustomEvent('del-event', {bubbles: true,  composed: true, detail: {idx: this.idx}}));
  }
}

window.customElements.define('note-list-item-component', NoteListItemComponent);
