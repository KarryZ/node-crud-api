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
exports.setError404 = exports.setError400 = exports.setError500 = exports.isUUIDValid = exports.getPostData = void 0;
const uuid_1 = require("uuid");
const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => __awaiter(void 0, void 0, void 0, function* () {
                resolve(body);
            }));
        }
        catch (e) {
            reject('error');
        }
    });
};
exports.getPostData = getPostData;
const isUUIDValid = (userId) => {
    return new Promise((resolve, reject) => {
        const isValid = (0, uuid_1.validate)(userId) && (0, uuid_1.version)(userId) === 4;
        isValid ? resolve(true) : resolve(false);
    });
};
exports.isUUIDValid = isUUIDValid;
const setError500 = (res) => {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Ups! Something went wrong :(' }));
};
exports.setError500 = setError500;
const setError400 = (res) => {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route is not found' }));
};
exports.setError400 = setError400;
const setError404 = (res) => {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: "User doesn't exist" }));
};
exports.setError404 = setError404;
