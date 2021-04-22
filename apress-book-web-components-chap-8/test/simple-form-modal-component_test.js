import {SimpleFormModalComponent} from '../simple-form-modal-component.js';
import {fixture, html} from '@open-wc/testing';

const assert = chai.assert;

suite('simple-form-modal-component', () => {
  test('is defined', () => {
    const el = document.createElement('simple-form-modal-component');
    assert.instanceOf(el, SimpleFormModalComponent);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<simple-form-modal-component></simple-form-modal-component>`);
    assert.shadowDom.equal(
      el,
      `
      <div id="myModal" class="modal" style="display: none;">
        <div class="modal-content">
          <form id="myForm">
            <label for="ftitle">Title:</label><br>
            <input type="text" id="ftitle" name="ftitle"><br>
            <label for="fdesc">Description:</label><br>
            <textarea id="fdesc" name="fdesc" rows="4" cols="50"></textarea><br/>
            <button type="button" id="addBtn">Add</button>
            <button type="button" id="closeBtn">Close</button>
          </form>
        </div>
      </div>
    `
    );
  });
});
