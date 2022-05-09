"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cookie = void 0;
class Cookie {
    constructor(user, sessionID, expiry) {
        this.user = user;
        this.sessionID = sessionID;
        this.expiry = expiry;
    }
    getUser() {
        return this.user;
    }
    getSessionID() {
        return this.sessionID;
    }
    getExpiry() {
        return this.expiry;
    }
    parseAndAssign(requestCookie) {
        let cookiePairs = requestCookie.split('; ');
        let cookieObject = {};
        for (let i = 0; i < cookiePairs.length; i++) {
            let cookieKeyValues = cookiePairs[i].split('=');
            let key = cookieKeyValues[0];
            let value = cookieKeyValues[1];
            cookieObject[key] = value;
        }
        this.user = cookieObject['user'];
        this.sessionID = cookieObject['sessionID'];
        this.expiry = cookieObject['expiry'];
        return this;
    }
}
exports.Cookie = Cookie;
//# sourceMappingURL=cookie.js.map