export interface cookieRequestObject {
  [key: string | number]: any
}

export class Cookie {
  user: string | undefined;
  sessionID: number | undefined;
  expiry: number | undefined;

  constructor(user?: string, sessionID?: number, expiry?: number) {
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

  parseAndAssign(requestCookie: string) {
    let cookiePairs = requestCookie.split('; ');
    let cookieObject: cookieRequestObject = {};
    
    for (let i = 0; i < cookiePairs.length; i++) {
      let cookieKeyValues = cookiePairs[i].split('=');
      let key: string | number = cookieKeyValues[0];
      let value: string | number = cookieKeyValues[1];
      cookieObject[key] = value;
    }
    
    this.user = cookieObject['user'];
    this.sessionID = cookieObject['sessionID'];
    this.expiry = cookieObject['expiry'];

    return this;
  }
}