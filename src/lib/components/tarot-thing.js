import { LitElement, css, html } from "lit";
import { TarotCardsModel } from "../models.js";
import "./tarot-card-set.js";

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
