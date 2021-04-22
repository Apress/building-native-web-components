---
layout: page.11ty.cjs
title: <simple-form-modal-component> ⌲ Install
---

# Install

`<simple-form-modal-component>` is distributed on npm, so you can install it locally or use it via npm CDNs like unpkg.com.

## CDN

npm CDNs like [unpkg.com]() can directly serve files that have been published to npm. This works great for standard JavaScript modules that the browser can load natively.

For this element to work from unpkg.com specifically, you need to include the `?module` query parameter, which tells unpkg.com to rewrite "bare" module specificers to full URLs.

### HTML
```html
<script type="module" src="http://unpkg.com/apress-simple-form-modal-component@1.0.3/dist/index.js"></script>
```

### JavaScript
```html
import {MyElement} from 'http://unpkg.com/apress-simple-form-modal-component@1.0.3/dist/index.js';
```
