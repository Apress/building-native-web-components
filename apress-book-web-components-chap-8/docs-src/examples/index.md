---
layout: example.11ty.cjs
title: <simple-form-modal-component> ⌲ Examples ⌲ Basic
tags: example
name: Basic
description: A basic example
---
<script async src="https://unpkg.com/browse/@webcomponents/webcomponentsjs@2.4.3/webcomponents-bundle.js"></script>
<script async type="module" src="http://unpkg.com/apress-simple-form-modal-component@1.0.3/dist/index.js"></script>
<button id="myBtn">Open Modal</button>
<simple-form-modal-component></simple-form-modal-component>
<script>
  const myBtn = document.getElementById('myBtn');
  const formModal = document.querySelector('simple-form-modal-component');
  myBtn.addEventListener('click', function() {
    formModal.open = !formModal.open;
  });
  formModal.addEventListener('addEvent', function(e) {
    console.log("Event:", e.detail);
  });
</script>

<h3>HTML</h3>

```html
<button id="myBtn">Open Modal</button>
<simple-form-modal-component></simple-form-modal-component>
```

```js
  const myBtn = document.getElementById('myBtn');
  const formModal = document.querySelector('simple-form-modal-component');
  myBtn.addEventListener('click', function() {
    formModal.open = !formModal.open;
  });
  formModal.addEventListener('addEvent', function(e) {
    console.log("Event:", e.detail);
  });
```
