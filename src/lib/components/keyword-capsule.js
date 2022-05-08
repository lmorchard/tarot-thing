import { LitElement, css, html } from "lit";

export class KeywordCapsuleElement extends LitElement {
  static properties = {
    keyword: {},
  };

  static styles = css`
    .capsule {
      text-transform: uppercase;
      font-size: 0.8em;
      background: #666;
      color: #eee;
      padding: 0.5rem 0.75rem;
      border-radius: 1.5rem;
      margin: 0.25rem 0.125rem;
      display: inline-block;
    }
  `;

  render() {
    return html`<span class="capsule">${this.keyword}</span> `;
  }
}
customElements.define("keyword-capsule", KeywordCapsuleElement);
