"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const authDB_1 = require("./authDB");
const dotenv = require('dotenv/config');
const secret = process.env.SECRET;
const app = new app_1.App;
const server = app.express;
const port = process.env.PORT;
let authDB = new authDB_1.AuthDB(process.env.MONGODB_PATH, 'authDB', 'users', process.env.MONGODB_LOGIN, process.env.MONGODB_PASS);
authDB.client.connect(function (error, database) {
    if (error) {
        console.log('Error connecting to MongoDB:');
        console.log(error);
    }
    else {
        server.listen(port, function (request, response) {
            console.log('Server running on port ' + port);
        });
    }
});
// NOW IN AUTHDB OBJECT AS CHECKUSER() METHOD
/* async function readOneDoc(dbName, collection, key) {
  let dbCallResult;
  try {
    dbCallResult = await mongoClient.db(dbName).collection(collection).findOne(key);
  } catch(error) {
      console.log(error);
  } finally {
      return dbCallResult;
  };
};
*/
// NOW IN AUTHDB OBJECT AS GETID() METHOD
/* async function readManyDocs(dbName, collection) {
  let dbCallResult;
  let allDocs;
  try {
    dbCallResult = mongoClient.db(dbName).collection(collection).find({});
    allDocs = await dbCallResult.toArray();
  } catch(error) {
      console.log(error);
  } finally {
      return allDocs;
  };
}; */
// NOW IN AUTHDB OBJECT AS CREATEUSER() METHOD
/* async function insertOneDoc(dbName, collection, key) {
  let dbCallResult;
  try {
    dbCallResult = await mongoClient.db(dbName).collection(collection).insertOne(key);
  } catch(error) {
      console.log(error);
  } finally {
      return dbCallResult;
  };
} */
// NOW IN AUTHDB OBJECT AS UPDATEUSERSESSIONS() METHOD
/* async function updateSessions(dbName, collection, lookFor, newKeyValue) {
  let dbCallResult;
  try {
    dbCallResult = await mongoClient.db(dbName).collection(collection).updateOne(lookFor, {$set: {sessions: newKeyValue}});
  } catch(error) {
      console.log(error);
  } finally {
      return dbCallResult;
  };
} */
// NOW TOKEN IS A SEPARATE OBJECT, YOU CAN CREATE A NEW INSTANCE AND SIGN IT USING SIGN() METHOD ON ITSELF
/* let getToken = function(userObject) {
  let username = userObject['username'];
  let userEmail = userObject['email'];
  
  // and let's send the token to the email
  let token = jwt.sign({
    "iss": "flashcards-app",
    "exp": Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
    "sub": username,
    "nonce": Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }, secret);

  return token;
}; */
//  NOW MESSAGE IS A SEPARATE OBJECT, YOU CAN CREATE A NEW INSTANCE AND SEND IT USING SEND() METHOD ON ITSELF
/* let getMessage = function(userObject, token) {
  let message = {
    to: userObject['email'],
    from: emailAddress,
    subject: `Token for ${userObject['username']}`,
    text: `Here's your token: ${host}/authenticateUser?token=${token}`
  };

  return message;
}; */
// NOW COOKIE IS A SEPARATE OBJECT, YOU CAN CREATE A NEW INSTANCE AND ASSIGN VALUES BY USING PARSEANDASIGN() METHOD
/* let cookieParser = function(requestCookie) {
  let cookiePairs = requestCookie.split('; ');
  let cookieObject = {};
  for (let i = 0; i < cookiePairs.length; i++) {
    let cookieKeyValues = cookiePairs[i].split('=');
    cookieObject[cookieKeyValues[0]] = cookieKeyValues[1];
  }
  return cookieObject;
} */
// NOW HOST IS A DOTENV PROPERTY HIDDEN IN .ENV
// let host = 'http://localhost:2000';
// NOW EMAIL CONFIG IS A SEPARATE OBJECT. EMAIL TRANSPORTER GETS CREATED EVERY TIME YOU MESSAGE.SEND() FROM MESSAGE OBJECT
/* let emailAddress = process.env.EMAIL_LOGIN;
let emailPassword = process.env.EMAIL_PASS;
let emailSMTP = process.env.EMAIL_SMTP;
let emailTransporterConfig = {
  host: emailSMTP,
  port: 465,
  secure: true,
  auth: {
    user: emailAddress,
    pass: emailPassword
  }
};
let emailTransporter = nodemailer.createTransport(emailTransporterConfig); */
/*
mongoClient.connect(function (error: any, database: any) {
 if (error) {
   console.log('Error connecting to MongoDB: ');
   console.log(error);
 } else {

*/
/* server.get('/', function(request, response) {
  response.redirect('/login');
}); */
/*
server.get('/login', function(request, response) {
  response.render('/public/login');
}); */
/* server.post('/sendtoken', function(request, response) {
  let userEmail = '';
  let username = '';
  let userSubID;
  let userObject;
  let token;
  let message;

  // request form not empty
  if (request.body.email && request.body.username) {

    let findUser = readOneDoc("authDB", "users", {email: request.body.email});
    findUser.then(function(result) {
      if (result) {
        userObject = result;
        token = getToken(userObject);
        message = getMessage(userObject, token);
        emailTransporter.sendMail(message, function(error, info) {
          if (error) {
            response.end("Delivery failed. Reason: " + error);
          } else {
            response.end("Delivery successful. Please check your email to log in.");
          }
        });

      } else {
        let getNewSubID = readManyDocs("authDB", "users");
        getNewSubID.then(function(result) {
          userObject = {
            'username': request.body.username,
            'email': request.body.email,
            'subid': result.length,
            'sessions': {}
          }

          insertOneDoc('authDB', 'users', userObject);

          token = getToken(userObject);
          message = getMessage(userObject, token);
          emailTransporter.sendMail(message, function(error, info) {
            if (error) {
              response.end("Delivery failed. Reason: " + error);
            } else {
              response.end("Delivery successful. Please check your email to log in.");
            }
          });

        }).catch(function(error) {
          console.log("Error getting new subID: " + error);
        });
      }
})}
}); */
/*
server.get('/welcome', function(request, response) {
  if (request['headers']['cookie']) {
    let cookieObject = cookieParser(request['headers']['cookie']);
    let currentDateTime = Date.now() / 1000;

    if (cookieObject['exp'] > currentDateTime) {
      response.sendFile(__dirname + '/public/mainPage/index.html');
    } else {
      response.end('No access.');
    }

  } else {
    response.end('No access.');
  }
}); */
/*
server.get('/authenticateUser', function(request, response) {
  if (request.query.token) {
    let newSession = new Date;
    let token = request.query.token;
    try {
      let verifiedToken = jwt.verify(token, secret);
// database code
      let userObject = readOneDoc("authDB", "users", {username: verifiedToken['sub']});
      userObject.then(function(result) {
        console.log("User found in authDB.");
        userObject = result;
        let newSessionValue = newSession.toString();
        console.log(newSessionValue);
        let userSubID = userObject['subid'];
        let userAccessExpiry = verifiedToken['exp'];
        let newSessionsObject = [...userObject['sessions'], newSessionValue];

        updateSessions("authDB", "users", {username: verifiedToken['sub']}, newSessionsObject)
        .then(function(result) {
          console.log("Update successful.");
          console.log(result);
        }).catch(function(error) {
          console.log("Update failed. Reason: " + error);
          console.log(userObject["sessions"]);
        });

// authentication
        response.cookie('sub', userObject['username'], { httpOnly: true, secure: true});
        response.cookie('sessionid', newSession, { httpOnly: true, secure: true});
        response.cookie('exp', userAccessExpiry, { httpOnly: true, secure: true});
// redirect
        response.redirect('/welcome');
        }).catch(function(error) {
          console.log("User not found in authDB: ");
          console.log(error);
        });
      } catch (error) {
        response.end("Not authorized. Error: " + error);
    }
  }
});
*/
/*
server.post('/upload', function(request, response) {
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
});

server.get('/logout', function(request, response) {
  response.clearCookie('sub');
  response.clearCookie('sessionid');
  response.clearCookie('exp');
  response.redirect('/login');
});

 }}); */ 
//# sourceMappingURL=server.js.map