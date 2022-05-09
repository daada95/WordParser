"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flashcards = void 0;
class Flashcards {
    constructor(owner, hasAccess, title, cards) {
        this.owner = owner;
        this.hasAccess = hasAccess;
        this.title = title;
        this.cards = cards;
    }
    getOwner() {
        return this.owner;
    }
    changeOwner(newOwner) {
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
exports.Flashcards = Flashcards;
//# sourceMappingURL=flashcards.js.map