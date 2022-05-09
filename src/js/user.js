"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const token_1 = require("./token");
const email_1 = require("./email");
let emailConfig = new email_1.EmailConfig();
class User {
    constructor(name, email, id, authDB, sessions) {
        this.name = name;
        this.email = email;
        this.ownFlashcards = [];
        this.accessFlashcards = [];
        this.currentlyStudied = {};
        if (sessions && sessions !== undefined) {
            this.sessions = sessions;
        }
        else {
            this.sessions = [];
        }
        this.id = id;
        this.authDB = authDB;
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            let createUser = yield this.authDB.createUser({
                name: this.name,
                email: this.email,
                ownFlashcards: this.ownFlashcards,
                accessFlashcards: this.accessFlashcards,
                currentlyStudied: this.currentlyStudied,
                sessions: this.sessions,
                id: this.id
            });
            return createUser;
        });
    }
    sendToken() {
        return __awaiter(this, void 0, void 0, function* () {
            let token = new token_1.Token(process.env.SECRET, undefined, { name: this.name, email: this.email }, this.id);
            let signedToken = token.sign();
            let message = new email_1.Message(emailConfig, this.email, signedToken);
            let send = yield message.send();
            return send;
        });
    }
    changeDetails() {
        // change user details
    }
    delete() {
        // delete user
    }
    addFlashcards() {
    }
    getFlashcards() {
    }
    modifyFlashcards() {
    }
    deleteFlashcards() {
    }
    shareFlashcards() {
    }
    createCookie() {
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map