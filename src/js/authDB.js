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
exports.AuthDB = exports.MongoClient = void 0;
exports.MongoClient = require('mongodb').MongoClient;
const session_1 = require("./session");
const dotenv = require('dotenv/config');
class AuthDB {
    constructor(path, db, collection, username, password) {
        this.path = path;
        this.client = new exports.MongoClient(this.path, { useUnifiedTopology: true });
        this.db = db;
        this.collection = collection;
        this.username = username;
        this.password = password;
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.db(this.db).collection(this.collection).insertOne(user);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteUser(user) {
    }
    updateUser(user) {
    }
    updateUserSessions(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let newSessions = user.sessions;
            let date = new Date;
            let session = new session_1.Session(date);
            newSessions.push(session);
            try {
                yield this.client.db(this.db).collection(this.collection).updateOne({ name: user.name }, { $set: { sessions: newSessions } });
                return session;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    checkUser(name, email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('checkUser name: ' + name);
            console.log('checkUser email: ' + email);
            try {
                return yield this.client.db(this.db).collection(this.collection).findOne({ email: `${email}` });
            }
            catch (error) {
                console.log('AuthDB checkUser() error:');
                console.log(error);
            }
        });
    }
    getID() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.db(this.db).collection(this.collection).countDocuments();
            }
            catch (error) {
                console.log('AuthDB getID() error:');
                console.log(error);
            }
        });
    }
}
exports.AuthDB = AuthDB;
//# sourceMappingURL=authDB.js.map