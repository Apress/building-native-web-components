export class NoteListComponent extends HTMLElement {
  static get observedAttributes() { return ['notes']; }

  constructor() {
    super();

    this._notes = JSON.parse(this.getAttribute('notes')) || [];
    this.root = this.attachShadow({mode: 'open'});
    this.root.innerHTML = this.render();

    this.handleDelEvent = this.handleDelEvent.bind(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'notes':
        this.note = JSON.parse(newValue);
        this.root.innerHTML = this.render();
        break;
    }
  }

  connectedCallback() {
    this.root.addEventListener('del-event', this.handleDelEvent);
  }

  disconnectedCallback () {
    this.root.removeEventListener('del-event', this.handleDelEvent);
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