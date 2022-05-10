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
      align-items: stretch;
      align-content: stretch;
    }
    @media (max-width: 1275px) {
      .cards {
        flex-direction: column;
      }
    }
  `;

  constructor() {
    super();
    this.base = "";
    this.cards = null;
  }

  render() {
    if (!this.cards) return;
    return html`
      <div class="cards">
        ${this.cards.map(
          (card) => html`
            <tarot-card base=${this.base} .card=${card}></tarot-card>
          `
        )}
      </div>
    `;
  }
}
customElements.define("tarot-card-set", TarotCardSetElement);
