"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = exports.fs = exports.formidable = exports.http = void 0;
exports.http = require('http');
exports.formidable = require('formidable');
exports.fs = require('fs');
class File {
    constructor(upload, size, type, oldPath, newPath, name) {
        this.upload = upload;
        this.size = size;
        this.type = type;
        this.oldPath = oldPath;
        this.newPath = newPath;
        this.name = name;
    }
    getType() {
        return this.type;
    }
    send() {
    }
}
exports.File = File;
//# sourceMappingURL=file.js.map