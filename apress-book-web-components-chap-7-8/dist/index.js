!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.apressNoteListItemComponent=t():e.apressNoteListItemComponent=t()}(window,(function(){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t),n.d(t,"NoteListItemComponent",(function(){return i}));class i extends HTMLElement{static get observedAttributes(){return["note","idx"]}constructor(){super(),this._note=JSON.parse(this.getAttribute("note"))||{},this.idx=this.getAttribute("idx")||-1,this.root=this.attachShadow({mode:"open"}),this.root.innerHTML=this.getTemplate(),this.delBtn=this.root.getElementById("deleteButton"),this.handleDelete=this.handleDelete.bind(this)}connectedCallback(){this.delBtn.addEventListener("click",this.handleDelete)}disconnectedCallback(){this.delBtn.removeEventListener("click",this.handleDelete)}attributeChangedCallback(e,t,n){switch(e){case"note":this.note=JSON.parse(n),this.handleUpdate();break;case"idx":this.idx=n,this.handleUpdate()}}get note(){return this._note}set note(e){this._note=e}get idx(){return this._idx}set idx(e){this._idx=e}handleDelete(){this.dispatchEvent(new CustomEvent("del-event",{bubbles:!0,composed:!0,detail:{idx:this.idx}}))}handleUpdate(){this.root.innerHTML=this.getTemplate(),this.delBtn=this.root.getElementById("deleteButton"),this.handleDelete=this.handleDelete.bind(this),this.delBtn.addEventListener("click",this.handleDelete)}getStyle(){return"\n    <style>\n      .note {\n        background-color: #ffffcc;\n        border-left: 6px solid #ffeb3b;\n      }\n      div {\n        margin: 5px 0px 5px;\n        padding: 4px 12px;\n      }\n    </style>\n    "}getTemplate(){return`\n    ${this.getStyle()}\n    <div class="note">\n      <p><strong>${this._note.title}</strong> ${this._note.description}</p><br/>\n      <button type="button" id="deleteButton">Delete</button>\n    </div>`}}customElements.define("note-list-item-component",i)}])}));