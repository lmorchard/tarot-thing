import { LitElement, css, html } from "lit";
import { TarotCardsModel } from "./models.js";

export class TarotThingElement extends LitElement {
  static properties = {
    base: {},
    model: { type: Object, attribute: false },
    cards: { type: Array },
  };

  static styles = css``;

  async willUpdate(changedProperties) {
    if (changedProperties.has("base")) {
      const model = new TarotCardsModel({ base: this.base });
      await model.fetch();
      this.model = model;
      this.cards = this.model.drawRandomCards(3);
    }
  }
  
  render() {
    if (!this.model) {
      return html` <p>Loading...</p> `;
    }

    return html`
      <tarot-card-set
        class="card-set"
        base=${this.base}
        .cards=${this.cards}
      ></tarot-card-set>
    `;
  }
}
customElements.define("tarot-thing", TarotThingElement);

export class TarotCardSetElement extends LitElement {
  static properties = {
    base: {},
    cards: { type: Array },
  };

  static styles = css`
    .cards {
      margin: 0;
      padding: 0;
      list-style-type: none;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      align-content: stretch;
    }
  `;

  constructor() {
    super();
    this.base = "";
    this.cards = [];
  }

  render() {
    return html`
      <div class="cards">
        ${this.cards.map(
          (card) => html`
            <tarot-card
              base=${this.base}
              name=${card.name}
              img=${card.img}
              .inverted=${card.inverted}
              .keywords=${card.keywords}
              .meanings=${card.inverted
                ? card.meanings.shadow
                : card.meanings.light}
              .fortuneTelling=${card.fortune_telling}
              .questions=${card["Questions to Ask"]}
            ></tarot-card>
          `
        )}
      </div>
    `;
  }
}
customElements.define("tarot-card-set", TarotCardSetElement);

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
    .tarot-card {
      padding: 1em;
      margin: 1em;
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
      <div class="tarot-card">
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
      </div>
    `;
  }
}
customElements.define("tarot-card", TarotCardElement);

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
