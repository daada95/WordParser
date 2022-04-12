let http = require('http');
let formidable = require('formidable');
let fs = require('fs');
let express = require('express');

let serverOne = express();
let portIndex = 2000;
serverOne.use(express.static(__dirname + '/public'));

serverOne.listen(portIndex, function(request, response) {
  console.log('Server running on port ' + portIndex);
});

serverOne.post('/upload', function (request, response) {
  let form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, file) {

      if (file) {
        let fileUpload = file.fileupload;
        let fileType = fileUpload.mimetype;
        let oldFilePath = fileUpload.filepath;
        let fileName = fileUpload.originalFilename;        
        let newFilePath = __dirname + '/public/files/'; 
        newFilePath += fileName;

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
      };
    });
});