const dotenv = require('dotenv/config');
export const jwt = require('jsonwebtoken');

export class Token {
  issuer: string;
  expires: number;
  user: {name: string, email: string} | undefined;
  id: number | undefined;
  nonce: string;
  secret: any;
  signed: string | undefined;

  constructor(secret: any, signed?: string, user?: {name: string, email: string}, id?: number) {
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
    }
  }

  sign() {
    const signedToken = jwt.sign({issuer: this.issuer, expires: this.expires, user: this.user, id: this.id, nonce: this.nonce}, this.secret);
    return signedToken;
  }

  verify() {
    const verifiedToken = jwt.verify(this.signed, this.secret);
    return verifiedToken;
  }
}