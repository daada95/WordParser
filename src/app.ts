export const dotenv = require('dotenv/config');
export const express = require('express');
export const cors = require('cors');
export const bodyParser = require('body-parser');
import { router } from './router';

export class App {
  public express;

  constructor() {
    this.express = express();
    this.loadRoutes();
  }

  private loadRoutes() {
    this.express.use('/', router);
  }
}