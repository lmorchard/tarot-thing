import { LitElement, css, html } from "lit";
import { TarotCardsModel, TarotCardSet } from "../models.js";
import "./tarot-card-set.js";

export class TarotThingElement extends LitElement {
  static properties = {
    base: {},
    model: { type: Object, attribute: false },
    cards: { type: Object },
  };

  static styles = css``;

  async willUpdate(changedProperties) {
    if (changedProperties.has("base")) {
      const model = new TarotCardsModel({ base: this.base });
      await model.fetch();
      this.model = model;
      this.updateCards();
    }
  }

  updateCards() {
    const params = new URLSearchParams(location.search);
    if (params.getAll("card").length === 0) {
      console.debug("Drawing random cards");
      this.cards = this.model.drawRandomCards(3);
      location.search = this.cards.toParams();
    } else {
      console.debug("Using cards from parameters");
      this.cards = TarotCardSet.fromParams(this.model, location.search);
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
