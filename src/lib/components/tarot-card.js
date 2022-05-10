import { LitElement, css, html } from "lit";
import { classMap } from "lit-html/directives/class-map.js";
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
      border: 1px solid rgba(0, 0, 0, 0.25);
    }
    .card {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      align-content: center;
    }
    .card section {
      margin: 0 0.5em;
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
    @media (max-width: 1275px) {
      .card {
        flex-direction: row;
      }
      .card section {
        max-width: 50%;
      }
    }
    @media (max-width: 800px) {
      .card {
        flex-direction: column;
      }
      .card section {
        max-width: 100%;
      }
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
      <div class=${classMap({ card: true, inverted })}>
        <section class="main">
          <h2 class="name">${name}${inverted ? " (inverted)" : ""}</h2>
          <div class="img"><img src="${base}/cards/${img}" /></div>
          <p class="keywords">
            ${keywords.map(
              (keyword) =>
                html`<keyword-capsule keyword=${keyword}></keyword-capsule>`
            )}
          </p>
        </section>
        <section class="details">
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
        </section>
      </div>
    `;
  }
}
customElements.define("tarot-card", TarotCardElement);
