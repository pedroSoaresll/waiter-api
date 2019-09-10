"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var mjml2html = require('mjml');
var mjmlPath = '../emails/mjml';
var htmlPath = '../emails/html';
var nameTemplateFiles = fs.readdirSync(path.resolve(__dirname, mjmlPath));
var getFilesFromMjmlDirectory = function (fileName) { return fs
    .readFileSync(path.resolve(__dirname, mjmlPath + "/" + fileName)); };
var transformBufferToString = function (fileBuffer) { return Buffer.from(fileBuffer).toString('utf-8'); };
var renderFileToHtml = function (file) { return mjml2html(file).html; };
var saveFileRederized = function (html, index) { return fs
    .writeFileSync(path.resolve(__dirname, htmlPath + "/" + nameTemplateFiles[index].replace('mjml', 'html')), html); };
nameTemplateFiles
    .map(getFilesFromMjmlDirectory)
    .map(transformBufferToString)
    .map(renderFileToHtml)
    .map(saveFileRederized);
