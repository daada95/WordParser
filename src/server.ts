import { App, express, cors, bodyParser } from './app';
import { File, formidable, fs, http } from './file';
import { Cookie, cookieRequestObject } from './cookie';
import { AuthDB, MongoClient } from './authDB';
import { User } from './user';
import { Message, EmailConfig, nodemailer } from './email';
import { Token, jwt } from './token';
import { Session } from './session';

const dotenv = require('dotenv/config');
const secret = process.env.SECRET;
const app = new App;
const server = app.express;
const port = process.env.PORT;

let authDB = new AuthDB(process.env.MONGODB_PATH!, 'authDB', 'users', process.env.MONGODB_LOGIN!, process.env.MONGODB_PASS!);

authDB.client.connect(function (error: Error, database: any) {
  if (error) {
  console.log('Error connecting to MongoDB:');
  console.log(error)
  }

  else {
    server.listen(port, function(request: JSON, response: any) {
      console.log('Server running on port ' + port);
    });
  }
});