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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const userModel_1 = require("../models/userModel");
const utils_1 = require("./utils");
//addAllUsers();
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userModel_1.findAllUsers)();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    }
    catch (error) {
        (0, utils_1.setError500)(res);
    }
});
exports.getUsers = getUsers;
const getUser = (req, res, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isUUidValid = yield (0, utils_1.isUUIDValid)(userId);
        const user = yield (0, userModel_1.findUserByID)(userId);
        if (!user && isUUidValid) {
            (0, utils_1.setError404)(res);
        }
        else if (!user && !isUUidValid) {
            (0, utils_1.setError400)(res);
        }
        else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        }
    }
    catch (error) {
        (0, utils_1.setError500)(res);
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield (0, utils_1.getPostData)(req);
        const { name, age, hobbies } = JSON.parse(body);
        if (!(name && age && hobbies)) {
            (0, utils_1.setError400)(res);
        }
        else {
            const user = yield (0, userModel_1.addNewUser)(name, age, hobbies);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        }
    }
    catch (error) {
        (0, utils_1.setError500)(res);
    }
});
exports.createUser = createUser;
const updateUser = (req, res, userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isUUidValid = yield (0, utils_1.isUUIDValid)(userID);
        const user = yield (0, userModel_1.findUserByID)(userID);
        if (!user && isUUidValid) {
            (0, utils_1.setError404)(res);
        }
        else if (!user && !isUUidValid) {
            (0, utils_1.setError400)(res);
        }
        else {
            const body = yield (0, utils_1.getPostData)(req);
            const { name = user.name, age = user.age, hobbies = user.hobbies } = JSON.parse(body);
            const updUser = yield (0, userModel_1.updateUserData)(userID, name, age, hobbies);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            console.log('get user', JSON.stringify(updUser));
            res.end(JSON.stringify(updUser));
        }
    }
    catch (error) {
        (0, utils_1.setError500)(res);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isUUidValid = yield (0, utils_1.isUUIDValid)(userId);
        const user = yield (0, userModel_1.findUserByID)(userId);
        if (!user && isUUidValid) {
            (0, utils_1.setError404)(res);
        }
        else if (!user && !isUUidValid) {
            (0, utils_1.setError400)(res);
        }
        else {
            yield (0, userModel_1.removeUser)(userId);
            res.writeHead(204, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(`User ${userId} removed`));
        }
    }
    catch (error) {
        (0, utils_1.setError500)(res);
    }
});
exports.deleteUser = deleteUser;
