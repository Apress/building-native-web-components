class NoteListComponent extends HTMLElement {
  constructor() {
    super();

    this._notes = JSON.parse(this.getAttribute('notes')) || [];
    this.root = this.attachShadow({mode: 'open'});
    this.root.innerHTML = this.render();
  }

  render() {
    let noteElements = '';
    this._notes.map(
      (note) => {
        noteElements += `
        <div class="note">
        <p><strong>${note.title}</strong> ${note.description}</p>
        </div>`;
      }
    );

    return `
      ${this.getStyle()}
      ${noteElements}`;
  }

  get notes(){
    return this._notes;
  }

  set notes(newValue) {
    this._notes = newValue;
    this.root.innerHTML = this.render();
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
}
customElements.define('note-list-component', NoteListComponent);