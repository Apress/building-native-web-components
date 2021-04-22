export class SimpleFormModalComponent extends HTMLElement {

  constructor() {
      super();

      this.root = this.attachShadow({mode: 'open'});
      this.container = document.createElement('div');
      this.container.innerHTML = this.getTemplate();
      this.root.appendChild(this.container.cloneNode(true));

      this._open = this.getAttribute('open') || false;

      this.modal = this.root.getElementById("myModal");
      this.addBtn = this.root.getElementById("addBtn");
      this.closeBtn = this.root.getElementById("closeBtn");

      this.handleAdd = this.handleAdd.bind(this);
      this.handleCancel = this.handleCancel.bind(this);

  }

  connectedCallback() {
    this.addBtn.addEventListener('click', this.handleAdd);
    this.closeBtn.addEventListener('click', this.handleCancel);
  }

  disconnectedCallback () {
    this.addBtn.removeEventListener('click', this.handleAdd);
    this.closeBtn.removeEventListener('click', this.handleCancel);
  }

  get open() {
    return this._open;
  }

  set open(newValue) {
    this._open = newValue;
    this.showModal(this._open);
  }

  handleAdd() {
    const fTitle = this.root.getElementById('ftitle');
    const fDesc = this.root.getElementById('fdesc');
    this.dispatchEvent(new CustomEvent('add-event', {bubbles: true, composed:true, detail: {title: fTitle.value, description: fDesc.value}}));

    fTitle.value = '';
    fDesc.value = '';
    this.open = false;
  }

  handleCancel() {
    this.open = false;
  }

  showModal(state) {
    if(state) {
      this.modal.style.display = "block";
    } else {
      this.modal.style.display = "none"
    }
  }

  getTemplate() {
      return `
      ${this.getStyle()}
      <div id="myModal" class="modal">
        <div class="modal-content">
          <form id="myForm">
            <label for="ftitle">Title:</label><br>
            <input type="text" id="ftitle" name="ftitle"><br>
            <label for="fdesc">Description:</label><br>
            <textarea id="fdesc" name="fdesc" rows="4" cols="50"></textarea><br/>
            <button type="button" id="addBtn">Add</button><button type="button" id="closeBtn">Close</button>
          </form>
        </div>
      </div>`;
  }

  getStyle() {
      return `
      <style>
        .modal {
          display: none;
          position: fixed;
          z-index: 1;
          padding-top: 100px;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgb(0,0,0);
          background-color: rgba(0,0,0,0.4);
        }
        .modal-content {
          background-color: #fefefe;
          margin: auto;
          padding: 20px;
          border: 1px solid #888;
          width: 50%;
        }
        .close {
          color: #aaaaaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
        }

        .close:hover,
        .close:focus {
          color: #000;
          text-decoration: none;
          cursor: pointer;
        }
      </style>`;
  }
}
customElements.define('simple-form-modal-component', SimpleFormModalComponent);
