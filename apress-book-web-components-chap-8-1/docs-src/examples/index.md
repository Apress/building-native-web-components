---
layout: example.11ty.cjs
title: <note-list-component> ⌲ Examples ⌲ Basic
tags: example
name: Basic
description: A basic example
---
<script async type="module" src="http://unpkg.com/apress-simple-form-modal-component/dist/index.js"></script>
<script async type="module" src="http://unpkg.com/apress-book-web-components-note-list/dist/index.js"></script>
<script async type="module" src="http://unpkg.com/apress-note-list-item-component/dist/index.js"></script>
<div>
  <button id="myBtn">Open Modal</button>
  <simple-form-modal-component></simple-form-modal-component>
  <note-list-component></note-list-component>
</div>
<script>
  const myBtn = document.getElementById('myBtn');
  const formModal = document.querySelector('simple-form-modal-component');
  const noteList = document.querySelector('note-list-component');
  myBtn.addEventListener('click', function() {
    formModal.open = !formModal.open;
  });
  formModal.addEventListener('add-event', function(e) {
    let notes = noteList.notes;
    notes.push({title: e.detail.title, description: e.detail.description});
    noteList.notes = notes;
  });
</script>

<h3>HTML</h3>

```html
<note-list-component></note-list-component>
```

```js
  const myBtn = document.getElementById('myBtn');
  const formModal = document.querySelector('simple-form-modal-component');
  const noteList = document.querySelector('note-list-component');
  const allNotes = [{"title": "Note 1", "description": 'Loren Ipsum'}];

  noteList.notes = allNotes;
  myBtn.addEventListener('click', function() {
    formModal.open = !formModal.open;
  });
  formModal.addEventListener('add-event', function(e) {
    let notes = noteList.notes;

    notes.push({title: e.detail.title, description: e.detail.description});
    noteList.setAttribute('notes', JSON.stringify(notes));
  });
```
