export class Flashcards {
  owner: Object;
  hasAccess: Object;
  title: string;
  cards: Object;

  constructor(owner: Object, hasAccess: Object, title: string, cards: Object) {
    this.owner = owner;
    this.hasAccess = hasAccess;
    this.title = title;
    this.cards = cards;
  }

  getOwner() {
    return this.owner;
  }

  changeOwner(newOwner: Object) {
    this.owner = newOwner;
  }

  getHasAccess() {
    return this.hasAccess;
  }

  getTitle() {
    return this.title;
  }

  getCards() {
    return this.cards;
  }
}