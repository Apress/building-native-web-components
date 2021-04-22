import {LitElement, html, css} from 'lit-element';

/**
 * A Simple Form Modal Component
 *
 * @csspart modal - Window Modal CSS
 * @csspart modal-content - CSS Properties for form content
 */
export class SimpleFormModalComponent extends LitElement {
  static get styles() {
    return css`
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
    `;
  }

  static get properties() {
    return {
      /**
       * The state to show/hide the modal.
       */
      open: {
        type: Boolean,
        hasChanged(newVal, oldVal) {
          if (oldVal !== newVal) {
            return true;
          }
          else {
            return false;
          }
        }
      }
    };
  }

  constructor() {
    super();
    this.open = false;
  }

  render() {
    return html`
      <div id="myModal" class="modal">
        <div class="modal-content">
          <form id="myForm">
            <label for="ftitle">Title:</label><br>
            <input type="text" id="ftitle" name="ftitle"><br>
            <label for="fdesc">Description:</label><br>
            <textarea id="fdesc" name="fdesc" rows="4" cols="50"></textarea><br/>
            <button type="button" id="addBtn" @click=${this.handleAdd}>Add</button>
            <button type="button" id="closeBtn" @click=${this.handleCancel}>Close</button>
          </form>
        </div>
      </div>
    `;
  }

  handleAdd() {
    const fTitle = this.shadowRoot.getElementById('ftitle');
    const fDesc = this.shadowRoot.getElementById('fdesc');
    /**
     * returns form data.
     */
    this.dispatchEvent(new CustomEvent('addEvent', {detail: {title: fTitle.value, description: fDesc.value}}));

    fTitle.value = '';
    fDesc.value = '';
    this.open = false;
  }

  handleCancel() {
    this.open = false;
  }

  showModal(state) {
    const modal = this.shadowRoot.getElementById("myModal");
    if(state) {
      modal.style.display = "block";
    } else {
      modal.style.display = "none"
    }
  }

  updated(){
    this.showModal(this.open);
  }
}

window.customElements.define('simple-form-modal-component', SimpleFormModalComponent);
