export class NoteListItemComponent extends HTMLElement {
  constructor() {
    super();

    this._note = JSON.parse(this.getAttribute('note')) || {};
    this.idx = this.getAttribute('idx') || -1;
    this.root = this.attachShadow({mode: 'open'});
    this.root.innerHTML = this.getTemplate();

    this.delBtn = this.root.getElementById('deleteButton');
    this.handleDelete = this.handleDelete.bind(this);
  }

  connectedCallback() {
    this.delBtn.addEventListener('click', this.handleDelete);
  }

  disconnectedCallback () {
    this.delBtn.removeEventListener('click', this.handleDelete);
  }

  get note() {
    return this._note;
  }

  set note(newValue) {
    this._note = newValue;
  }

  get idx() {
    return this._idx;
  }

  set idx(newValue) {
    this._idx = newValue;
  }

  handleDelete() {
    this.dispatchEvent(new CustomEvent('delEvent', {bubbles: true, detail: {idx: this.idx}}));
  }

  getStyle() {
    return `
    <style>
      .note {
        background-color: #ffffcc;
        border-left: 6px solid #ffeb3b;
      }
      div {
        margin: 5px 0px 5px;
        padding: 4px 12px;
      }
    </style>
    `;
  }

  getTemplate() {
    return`
    ${this.getStyle()}
    <div class="note">
      <p><strong>${this._note.title}</strong> ${this._note.description}</p><br/>
      <button type="button" id="deleteButton">Delete</button>
    </div>`;
  }
}
customElements.define('note-list-item-component', NoteListItemComponent);