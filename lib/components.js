import { html, createElement, BaseElement } from "./dom.js";
import { TarotCardsModel } from "./models.js";

customElements.define(
  "tarot-thing",
  class extends BaseElement {
    static template = html`
      <template>
        <style>
          :host {
            margin: 0;
            padding: 0;
          }
        </style>
        <tarot-card-set class="card-set" />
      </template>
    `;

    static get observedAttributes() {
      return ["base"];
    }

    renderCards() {
      const cards = this.model.drawRandomCards(3);

      this.updateElements({
        ".card-set": {
          props: { base: this.model.base, cards },
        },
      });
    }

    attributeHandlers = {
      async base(oldValue, newValue) {
        this.model = new TarotCardsModel({ base: newValue });
        await this.model.fetch();
        this.renderCards();
      },
    };
  }
);

customElements.define(
  "tarot-card-set",
  class extends BaseElement {
    static template = html`
      <template>
        <style>
          :host .cards {
            margin: 0;
            padding: 0;
            list-style-type: none;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            align-content: stretch;
          }
        </style>
        <ul class="cards"></ul>
      </template>
    `;

    propsChanged({ base, cards }) {
      this.updateElements({
        ".cards": {
          children: cards.map((card) =>
            createElement("tarot-card", { props: { base, card } })
          ),
        },
      });
    }
  }
);

customElements.define(
  "tarot-card",
  class extends BaseElement {
    static template = html`
      <template>
        <style>
          :host {
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
        </style>
        <div class="tarot-card">
          <h2 class="name"></h2>
          <div class="img"><img src="" /></div>
          <p class="keywords"></p>
          <dl>
            <dt>Questions to Ask</dt>
            <dd class="questions"><ul></ul></dd>
            <dt>Meanings</dt>
            <dd class="meanings"><ul></ul></dd>
          </dl>
        </div>
      </template>
    `;

    propsChanged({
      base,
      card: {
        name,
        img,
        inverted = false,
        keywords,
        meanings: { light: meaningsLight, shadow: meaningsShadow },
        "Questions to Ask": questions,
      },
    }) {
      const meanings = inverted ? meaningsShadow : meaningsLight;
      this.updateElements({
        ".tarot-card": (el) =>
          el.classList[inverted ? "add" : "remove"]("inverted"),
        ".name": { textContent: `${name}${inverted ? " (inverted)" : ""}` },
        ".img img": { "@src": `${base}/cards/${img}` },
        ".keywords": {
          children: keywords.map((keyword) =>
            createElement("keyword-capsule", { props: { keyword } })
          ),
        },
        ".questions ul": {
          children: questions.map((question) =>
            createElement("li", { textContent: question })
          ),
        },
        ".meanings ul": {
          children: meanings.map((meaning) =>
            createElement("li", { textContent: meaning })
          ),
        },
      });
    }
  }
);

customElements.define(
  "keyword-capsule",
  class extends BaseElement {
    static template = html`
      <template>
        <style>
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
        </style>
        <span class="capsule"> </span>
      </template>
    `;

    propsChanged({ keyword }) {
      this.updateElements({
        ".capsule": { textContent: keyword },
      });
    }
  }
);
