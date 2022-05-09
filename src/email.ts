export const nodemailer = require('nodemailer');
import { User } from "./user";
import { Token } from "./token";
import { response } from "express";
const dotenv = require('dotenv/config');

export class Message {
    config: EmailConfig;
    sender: string;
    receiver: string;
    token: Token;
    subject: string;
    text: string;

    constructor(config: EmailConfig, receiver: string, token: Token) {
      this.config = config;
      this.sender = config.auth.user;
      this.receiver = receiver;
      this.token = token;
      this.subject = `Token for ${this.receiver}`,
      this.text = `Here's your token: ${process.env.HOST}/authenticate?token=${this.token}`
    }

    async send() {
      const transporter = nodemailer.createTransport(this.config);

      console.log('config:' + this.config);
      console.log('receiver: ' + this.receiver);

      let response;
      
      let delivery = await transporter.sendMail({
        from: this.sender,
        to: this.receiver,
        subject: this.subject,
        text: this.text
      });

      if (delivery.accepted.length > 0) {
        return {message: 'Token delivered. Please check your email to log in.', status: true};
      } 

      else if (delivery.accepted.length === 0) {
        return {message: `Delivery failed. Error: ${delivery.response}`, status: false};
      }
    }
}

export class EmailConfig {
    host: string | undefined;
    port: string | undefined;
    secure: boolean;
    auth: {user: any, pass: any};

    constructor() {
      this.host = process.env.EMAIL_SMTP;
      this.port = process.env.EMAIL_PORT;
      this.secure = true;
      this.auth = {user: process.env.EMAIL_LOGIN, pass: process.env.EMAIL_PASS};
    }
}