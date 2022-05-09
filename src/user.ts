import { Flashcards } from './flashcards';
import { Token } from './token';
import { EmailConfig, Message } from './email';
import { AuthDB } from './authDB';
import { Session } from './session';
import { stringify } from 'querystring';
import * as dotenv from 'dotenv/config';

let emailConfig = new EmailConfig();

export class User {
  name: string;
  email: string;
  ownFlashcards: Array<String>;
  accessFlashcards: Array<String>;
  currentlyStudied: Object;
  sessions: Array<Session> | undefined;
  id: number;
  authDB: AuthDB;

  constructor(name: string, email: string, id: number, authDB: AuthDB, sessions?: Array<Session> | undefined) {
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

  async register() {

    let createUser = await this.authDB.createUser({
      name: this.name,
      email: this.email,
      ownFlashcards: this.ownFlashcards,
      accessFlashcards: this.accessFlashcards,
      currentlyStudied: this.currentlyStudied,
      sessions: this.sessions,
      id: this.id
    });
    
    return createUser;
  }
 
  async sendToken() {
    
    let token = new Token(process.env.SECRET, undefined, {name: this.name, email: this.email}, this.id);
    let signedToken = token.sign();
    let message = new Message(emailConfig, this.email, signedToken);
    let send = await message.send();
    return send;
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