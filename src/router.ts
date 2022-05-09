import { App, express, cors, bodyParser } from './app';
import { File, formidable, fs, http } from './file';
import { Cookie } from './cookie';
import { AuthDB, MongoClient } from './authDB';
import { User } from './user';
import { Message, EmailConfig, nodemailer } from './email';
import { Token, jwt } from './token';
import { Session } from './session';

const dotenv = require('dotenv/config');

let authDB = new AuthDB(process.env.MONGODB_PATH!, 'authDB', 'users', process.env.MONGODB_LOGIN!, process.env.MONGODB_PASS!);
authDB.client.connect();
export const router = express.Router();
router.use(cors());
router.use(express.json());
router.use(express.static(__dirname + '/public'));
router.use(express.urlencoded({ extended: true}));

router.get('/', function(request: any, response: any) {
  response.redirect('/login');
});

router.get('/login', function(request: any, response: any) {
  response.sendFile(__dirname + '/public/login/index.html');
});

router.get('/register', function(request: any, response: any) {
  response.sendFile(__dirname + '/public/register/index.html');
});

router.post('/registerUser', function(request: any, response: any) {

async function registerUser() {
  if (request.body.email && request.body.username) {
    let userCheck = await authDB.checkUser(request.body.username, request.body.email);
      switch(userCheck) {
  
        case null:
          let getUserID = await authDB.getID();
          let user = new User(request.body.username, request.body.email, getUserID, authDB);
          let register = await user.register();
          if (register.acknowledged) {     
            response.end('Registration succeeded. Please log in.');
          }
          else {
            response.end('Registration failed. Try again.');
          };
          break;
        
        default:
          response.end('User already registered.');
          break;
      }
  }
}

registerUser();
});

router.post('/sendtoken', function(request: any, response: any) {
async function sendToken() {
  if (request.body.email && request.body.username) {

    let findUser = await authDB.checkUser(request.body.username, request.body.email);
    let user = new User(findUser.name, findUser.email, findUser.id, authDB, findUser.sessions);
    let delivery = await user.sendToken();
    
    if (delivery) {
      response.end(delivery.message);
    }
}

}

sendToken();
});

router.get('/authenticate', function(request: any, response: any) {

async function authenticate() {
    if (request.query.token) {
      const token = new Token(process.env.SECRET, request.query.token);
      let signedToken = token.verify();
      let checkUser = await authDB.checkUser(signedToken.user.name, signedToken.user.email);

      if (checkUser) {
        let userString = JSON.stringify(checkUser);
        let userObject = JSON.parse(userString);
        const user: User = new User(userObject.name, userObject.email, userObject.id, authDB, userObject.sessions);
        let updateSessions = await authDB.updateUserSessions(user);
        if (updateSessions instanceof Session) {
          response.cookie('user', { name: user.name, email: user.email }, { httpOnly: true, secure: true });
          response.cookie('session', updateSessions, { httpOnly: true, secure: true });
          response.cookie('expiry', signedToken.expires, { httpOnly: true, secure: true });
          response.redirect('welcome');
        }
      }

      else {
        response.end('User not found in database.');
      }
    }

    else {
      response.end('No token = no access.');
    }
}

authenticate();

});

router.get('/welcome', function(request: any, response: any) {
  if (request['headers']['cookie']) {
    let cookie = new Cookie();
    cookie.parseAndAssign(request['headers']['cookie']);
    let currentDateTime = Date.now() / 1000;

    if (cookie.expiry! > currentDateTime) {
      response.sendFile(__dirname + '/public/mainPage/index.html');
    } else {
      response.end('No access.');
    }

  } else {
    response.end('No access.');
  }
});

/*
router.post('/upload', function(request, response) {
  let form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, file) {
      if (file) {
        let fileUpload = file.fileupload;
        let fileSize = fileUpload.size;
        let fileType = fileUpload.mimetype;
        let oldFilePath = fileUpload.filepath;
        let fileName = fileUpload.originalFilename;        
        let newFilePath = __dirname + '/public/files/'; 
        newFilePath += fileName;
        let maxFileSize = 15000000;

        if (fileSize < maxFileSize) {
          switch (fileType) {
            case 'application/msword':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            fs.rename(oldFilePath, newFilePath, function() {
                response.write('Upload successful!');
                response.end();
            });
            break;
            default:
            response.end('Sorry, wrong filetype. Please upload .doc or docx. Thanks.');
          }
        } else {
          response.end('Sorry, your file is too big. Try with a smaller one (max. 15 MB)');
        }
      };
    });
}); */

/*
router.get('/settings', function(request: any, response: any) {

});
*/

router.get('/logout', function(request: any, response: any) {
  response.clearCookie('user');
  response.clearCookie('sessionID');
  response.clearCookie('expiry');
  response.redirect('/login');
});