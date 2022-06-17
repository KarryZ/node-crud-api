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
exports.removeUser = exports.updateUserData = exports.addNewUser = exports.findUserByID = exports.findAllUsers = exports.addAllUsers = exports.CreateUser = void 0;
const uuid_1 = require("uuid");
let users = [];
const CreateUser = class {
    constructor(name, age, hobbies) {
        this.name = name;
        this.age = age;
        this.hobbies = hobbies;
        this.id = (0, uuid_1.v4)();
    }
};
exports.CreateUser = CreateUser;
const addAllUsers = () => {
    const user1 = new exports.CreateUser('Tom', 28, ["play music", "watch tv shows"]);
    const user2 = new exports.CreateUser('Nick', 30, ["hiking", "sleeping"]);
    const user3 = new exports.CreateUser("Andy", 27, ["cycling", "hanging out with friends"]);
    users.push(user1, user2, user3);
    return users;
};
exports.addAllUsers = addAllUsers;
const findAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        resolve(users);
    });
});
exports.findAllUsers = findAllUsers;
const findUserByID = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const user = users.find(user => user.id === userId);
        resolve(user);
    });
});
exports.findUserByID = findUserByID;
const addNewUser = (name, age, hobby) => {
    return new Promise((resolve, reject) => {
        if (name && age && hobby) {
            const user = new exports.CreateUser(name, age, hobby);
            users.push(user);
            resolve(user);
        }
        else {
            reject('err');
        }
    });
};
exports.addNewUser = addNewUser;
const updateUserData = (id, name, age, hobbies) => {
    return new Promise((resolve, reject) => {
        const index = users.findIndex(i => i.id === id);
        users[index] = { id, name, age, hobbies };
        resolve(users[index]);
    });
};
exports.updateUserData = updateUserData;
const removeUser = (id) => {
    return new Promise((resolve, reject) => {
        const index = users.findIndex(i => i.id === id);
        console.log('index', index);
        users = [
            ...users.slice(0, index),
            ...users.slice(index + 1)
        ];
        console.log('users', users);
        resolve(true);
    });
};
exports.removeUser = removeUser;
