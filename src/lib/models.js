export class TarotCardsModel {
  constructor({ base }) {
    Object.assign(this, { base, data: null });
  }

  async fetch() {
    const dataUrl = `${this.base}/tarot-images.json`;
    const resp = await fetch(dataUrl);
    const data = await resp.json();
    this.data = data;
    return this.data;
  }

  get cards() {
    return this.data.cards;
  }

  drawRandomCard() {
    return {
      inverted: Math.random() >= 0.5,
      ...this.cards[Math.floor(Math.random() * this.cards.length)],
    };
  }

  drawRandomCards(count = 3) {
    const cards = [];
    for (let idx = 0; idx < count; idx++) {
      let card;
      do {
        card = this.drawRandomCard();
      } while (cards.find((inList) => card.name === inList.name));
      cards.push(card);
    }
    return new TarotCardSet(cards);
  }

  findCardByName(name) {
    return this.cards.find(card => card.name.toLowerCase() === name.toLowerCase());
  }
}

export class TarotCardSet {
  constructor(cards) {
    this.cards = cards;
  }

  map(fn) {
    return this.cards.map(fn);
  }

  toParams() {
    const params = new URLSearchParams();
    params.delete("card");
    for (const card of this.cards) {
      params.append("card", card.name);
    }
    return params.toString();
  }

  static fromParams(model, paramsString) {
    const params = new URLSearchParams(paramsString);
    const cards = [];
    for (const name of params.getAll("card")) {
      const card = model.findCardByName(name);
      if (card) cards.push(card);
    }
    return new TarotCardSet(cards);
  }
}