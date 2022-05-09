import { LitElement, css, html } from "../../vendor/pkg/lit.js";
import { classMap } from "../../vendor/pkg/lit-html/directives/class-map.js";
import "./keyword-capsule.js";

export class TarotCardElement extends LitElement {
  static properties = {
    base: {},
    card: { type: Object },
  };

  static styles = css`
    :host {
      padding: 0.5em 1em;
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
    const {
      base,
      // TODO: better to pass the whole tarot card object? or just individual properties?
      card: {
        name,
        inverted,
        img,
        keywords,
        fortune_telling: fortuneTelling,
        "Questions to Ask": questions,
        meanings: { shadow: meaningsShadow, light: meaningsLight },
      },
    } = this;

    const meanings = inverted ? meaningsShadow : meaningsLight;

    return html`
      <div class=${classMap({ inverted })}>
        <h2 class="name">${name}${inverted ? " (inverted)" : ""}</h2>
        <div class="img"><img src="${base}/cards/${img}" /></div>
        <p class="keywords">
          ${keywords.map(
            (keyword) =>
              html`<keyword-capsule keyword=${keyword}></keyword-capsule>`
          )}
        </p>
        <dl>
          <dt>Meanings</dt>
          <dd class="meanings">
            <ul>
              ${meanings.map((item) => html`<li>${item}</li>`)}
            </ul>
          </dd>
          <dt>Fortune Telling</dt>
          <dd class="fortuneTelling">
            <ul>
              ${fortuneTelling.map((item) => html`<li>${item}</li>`)}
            </ul>
          </dd>
          <dt>Questions to Ask</dt>
          <dd class="questions">
            <ul>
              ${questions.map((item) => html`<li>${item}</li>`)}
            </ul>
          </dd>
        </dl>
      </div>
    `;
  }
}
customElements.define("tarot-card", TarotCardElement);
