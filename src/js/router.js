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
exports.router = void 0;
const app_1 = require("./app");
const cookie_1 = require("./cookie");
const authDB_1 = require("./authDB");
const user_1 = require("./user");
const token_1 = require("./token");
const session_1 = require("./session");
const dotenv = require('dotenv/config');
let authDB = new authDB_1.AuthDB(process.env.MONGODB_PATH, 'authDB', 'users', process.env.MONGODB_LOGIN, process.env.MONGODB_PASS);
authDB.client.connect();
exports.router = app_1.express.Router();
exports.router.use((0, app_1.cors)());
exports.router.use(app_1.express.json());
exports.router.use(app_1.express.static(__dirname + '/public'));
exports.router.use(app_1.express.urlencoded({ extended: true }));
exports.router.get('/', function (request, response) {
    response.redirect('/login');
});
exports.router.get('/login', function (request, response) {
    response.sendFile(__dirname + '/public/login/index.html');
});
exports.router.get('/register', function (request, response) {
    response.sendFile(__dirname + '/public/register/index.html');
});
exports.router.post('/registerUser', function (request, response) {
    function registerUser() {
        return __awaiter(this, void 0, void 0, function* () {
            if (request.body.email && request.body.username) {
                let userCheck = yield authDB.checkUser(request.body.username, request.body.email);
                console.log(userCheck);
                switch (userCheck) {
                    case null:
                        let getUserID = yield authDB.getID();
                        console.log(getUserID);
                        let user = new user_1.User(request.body.username, request.body.email, getUserID, authDB);
                        let register = yield user.register();
                        console.log(register);
                        if (register.acknowledged) {
                            response.end('Registration succeeded. Please log in.');
                        }
                        else {
                            response.end('Registration failed. Try again.');
                        }
                        ;
                        break;
                    default:
                        response.end('User already registered.');
                        break;
                }
            }
        });
    }
    registerUser();
});
exports.router.post('/sendtoken', function (request, response) {
    function sendToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (request.body.email && request.body.username) {
                console.log('r.b.username: ' + request.body.username);
                console.log('r.b.email: ' + request.body.email);
                let findUser = yield authDB.checkUser(request.body.username, request.body.email);
                console.log('findUser: ');
                console.log(findUser);
                // I'll have to change these to new schema ... subid => id, username => name
                let user = new user_1.User(findUser.name, findUser.email, findUser.id, authDB, findUser.sessions);
                let delivery = yield user.sendToken();
                if (delivery) {
                    response.end(delivery.message);
                }
            }
        });
    }
    sendToken();
});
exports.router.get('/authenticate', function (request, response) {
    function authenticate() {
        return __awaiter(this, void 0, void 0, function* () {
            if (request.query.token) {
                const token = new token_1.Token(process.env.SECRET, request.query.token);
                let signedToken = token.verify();
                let checkUser = yield authDB.checkUser(signedToken.user.name, signedToken.user.email);
                if (checkUser) {
                    let userString = JSON.stringify(checkUser);
                    let userObject = JSON.parse(userString);
                    const user = new user_1.User(userObject.name, userObject.email, userObject.id, authDB, userObject.sessions);
                    let updateSessions = yield authDB.updateUserSessions(user);
                    if (updateSessions instanceof session_1.Session) {
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
        });
    }
    authenticate();
});
exports.router.get('/welcome', function (request, response) {
    if (request['headers']['cookie']) {
        let cookie = new cookie_1.Cookie();
        cookie.parseAndAssign(request['headers']['cookie']);
        let currentDateTime = Date.now() / 1000;
        if (cookie.expiry > currentDateTime) {
            response.sendFile(__dirname + '/public/mainPage/index.html');
        }
        else {
            response.end('No access.');
        }
    }
    else {
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
exports.router.get('/logout', function (request, response) {
    response.clearCookie('user');
    response.clearCookie('sessionID');
    response.clearCookie('expiry');
    response.redirect('/login');
});
//# sourceMappingURL=router.js.map