export class NoteListComponent extends HTMLElement {
  constructor() {
    super();

    this._notes = JSON.parse(this.getAttribute('notes')) || [];
    this.root = this.attachShadow({mode: 'open'});
    this.root.innerHTML = this.render();

    this.handleDelEvent = this.handleDelEvent.bind(this);
  }

  connectedCallback() {
    this.root.addEventListener('delEvent', this.handleDelEvent);
  }

  disconnectedCallback () {
    this.root.removeEventListener('delEvent', this.handleDelEvent);
  }

  handleDelEvent(e) {
    this._notes.splice(e.detail.idx, 1);
    this.root.innerHTML = this.render();
  }

  render() {
    let noteElements = '';
    this._notes.map(
      (note, idx) => {
        noteElements += `
        <note-list-item-component note='${JSON.stringify(note)}' idx='${idx}'></note-list-item-component>`;
      }
    );
    return `
      ${noteElements}`;
  }

  get notes(){
    return this._notes;
  }

  set notes(newValue) {
    this._notes = newValue;
    this.root.innerHTML = this.render();
  }
}
customElements.define('note-list-component', NoteListComponent);