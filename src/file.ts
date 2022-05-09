export const http = require('http');
export const formidable = require('formidable');
export const fs = require('fs');

export class File {
  upload: Object;
  size: number;
  type: string;
  oldPath: string;
  newPath: string;
  name: string;

  constructor(upload: Object, size: number, type: string, oldPath: string, newPath: string, name: string) {
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