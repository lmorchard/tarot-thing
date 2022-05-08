import { LitElement, css, html } from "../../vendor/pkg/lit.js";
import "./tarot-card.js";

export class TarotCardSetElement extends LitElement {
  static properties = {
    base: {},
    cards: { type: Object },
  };

  static styles = css`
    .cards {
      margin: 0;
      padding: 0;
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
    this.cards = null;
  }

  render() {
    return html`
      <div class="cards">
        ${this.cards && this.cards.map(
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
