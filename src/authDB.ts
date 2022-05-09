export const { MongoClient } = require('mongodb');
import { User } from './user';
import { Session } from './session';
const dotenv = require('dotenv/config');

export class AuthDB {
  path: string;
  client: typeof MongoClient;
  db: string;
  collection: string;
  username: string;
  password: string;

  constructor(path: string, db: string, collection: string, username: string, password: string) {
    this.path = path;
    this.client = new MongoClient(this.path, {useUnifiedTopology: true});
    this.db = db;
    this.collection = collection;
    this.username = username;
    this.password = password;
  }

  async createUser(user: Object) {
    try {
      return await this.client.db(this.db).collection(this.collection).insertOne(user);
    }
    
    catch(error) {
      console.log(error);
    }
  }

  deleteUser(user: User) {
    
  }

  updateUser(user: User) {
    
  }

  async updateUserSessions(user: User) {
    let newSessions: any = user.sessions;

    let date = new Date;
    let session = new Session(date);
    newSessions!.push(session);

    try {
      await this.client.db(this.db).collection(this.collection).updateOne({name: user.name}, {$set: {sessions: newSessions}});
      return session;
    }
    
    catch(error) {
      console.log(error);
    }
  }

  async checkUser(name: string, email: string) {

    try {
      return await this.client.db(this.db).collection(this.collection).findOne({email: `${email}`});
    }
    
    catch(error) {
      console.log(error);
    }
  }

  async getID() {
    
    try {
    return await this.client.db(this.db).collection(this.collection).countDocuments();
    }
  
    catch(error) {
      console.log(error);
    }
  }
}