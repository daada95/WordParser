"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = exports.jwt = void 0;
const dotenv = require('dotenv/config');
exports.jwt = require('jsonwebtoken');
class Token {
    constructor(secret, signed, user, id) {
        this.issuer = 'flashcards-app';
        this.expires = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7);
        this.signed = signed || undefined;
        this.user = user || undefined;
        this.id = id || undefined;
        this.nonce = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.secret = secret;
        this.sign();
    }
    get() {
        return {
            issuer: this.issuer,
            expires: this.expires,
            user: this.user,
            id: this.id,
            nonce: this.nonce
        };
    }
    sign() {
        const signedToken = exports.jwt.sign({ issuer: this.issuer, expires: this.expires, user: this.user, id: this.id, nonce: this.nonce }, this.secret);
        return signedToken;
    }
    verify() {
        console.log(this.signed);
        console.log;
        const verifiedToken = exports.jwt.verify(this.signed, this.secret);
        return verifiedToken;
    }
}
exports.Token = Token;
//# sourceMappingURL=token.js.map