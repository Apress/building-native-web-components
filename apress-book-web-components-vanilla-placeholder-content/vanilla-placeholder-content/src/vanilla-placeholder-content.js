export class VanillaPlaceholderContent extends HTMLElement {
    constructor() {
        super();

        const placeholder = document.createElement('template');
        const height = this.getAttribute('height') || '100px';
        const width = this.getAttribute('width') || '100px';
        placeholder.innerHTML = VanillaPlaceholderContent.template(height, width);

        this.appendChild(document.importNode(placeholder.content, true));
    }

    static template (height, width) {
        return `
        <style>
        .placeholder {
            background-color: red;
            width: ${height};
            height: ${width};
        }
        </style>
        <div class='placeholder'>Placeholder</div>`;
    }
}
customElements.define('vanilla-placeholder-content', VanillaPlaceholderContent);
