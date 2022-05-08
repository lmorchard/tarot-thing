import { LitElement, css, html } from "lit";
import "./keyword-capsule.js";

export class TarotCardElement extends LitElement {
  static properties = {
    base: {},
    name: {},
    img: {},
    inverted: { type: Boolean },
    keywords: { type: Array },
    meanings: { type: Array },
    fortuneTelling: { type: Array },
    questions: { type: Array },
  };

  static styles = css`
    :host {
      padding: 0.5em 1.0em;
      margin: 0.5em;
      flex: 1;
      text-align: center;
      border: 1px solid #333;
    }
    .img {
      width: 100%;
    }
    .inverted img {
      transform: rotate(180deg);
    }
    dl {
      text-align: left;
    }
    dd {
      margin: 0 0 1rem 0;
    }
  `;

  render() {
    return html`
      <h2 class="name">${this.name}${this.inverted ? " (inverted)" : ""}</h2>
      <div class="img"><img src="${this.base}/cards/${this.img}" /></div>
      <p class="keywords">
        ${this.keywords.map(
          (keyword) =>
            html`<keyword-capsule keyword=${keyword}></keyword-capsule>`
        )}
      </p>
      <dl>
        <dt>Meanings</dt>
        <dd class="meanings">
          <ul>
            ${this.meanings.map((item) => html`<li>${item}</li>`)}
          </ul>
        </dd>
        <dt>Fortune Telling</dt>
        <dd class="fortuneTelling">
          <ul>
            ${this.fortuneTelling.map((item) => html`<li>${item}</li>`)}
          </ul>
        </dd>
        <dt>Questions to Ask</dt>
        <dd class="questions">
          <ul>
            ${this.questions.map((item) => html`<li>${item}</li>`)}
          </ul>
        </dd>
      </dl>
    `;
  }
}
customElements.define("tarot-card", TarotCardElement);
