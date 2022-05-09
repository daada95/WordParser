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
exports.EmailConfig = exports.Message = exports.nodemailer = void 0;
exports.nodemailer = require('nodemailer');
const dotenv = require('dotenv/config');
class Message {
    constructor(config, receiver, token) {
        this.config = config;
        this.sender = config.auth.user;
        this.receiver = receiver;
        this.token = token;
        this.subject = `Token for ${this.receiver}`,
            this.text = `Here's your token: ${process.env.HOST}/authenticate?token=${this.token}`;
    }
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = exports.nodemailer.createTransport(this.config);
            console.log('config:' + this.config);
            console.log('receiver: ' + this.receiver);
            let response;
            let delivery = yield transporter.sendMail({
                from: this.sender,
                to: this.receiver,
                subject: this.subject,
                text: this.text
            });
            if (delivery.accepted.length > 0) {
                return { message: 'Token delivered. Please check your email to log in.', status: true };
            }
            else if (delivery.accepted.length === 0) {
                return { message: `Delivery failed. Error: ${delivery.response}`, status: false };
            }
        });
    }
}
exports.Message = Message;
class EmailConfig {
    constructor() {
        this.host = process.env.EMAIL_SMTP;
        this.port = process.env.EMAIL_PORT;
        this.secure = true;
        this.auth = { user: process.env.EMAIL_LOGIN, pass: process.env.EMAIL_PASS };
    }
}
exports.EmailConfig = EmailConfig;
//# sourceMappingURL=email.js.map