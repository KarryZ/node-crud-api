import {  addAllUsers, findAllUsers, findUserByID, addNewUser, updateUserData, removeUser } from "../models/userModel.js"
import { getPostData, isUUIDValid } from './utils.js';

addAllUsers();

export const getUsers = async (req, res) => {
    try {
        const users = await findAllUsers();
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(users))
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async (req, res, userId) => {
    try {
        const isUUidValid = await isUUIDValid(userId);
        const user = await findUserByID(userId);
        
        if ( !user && isUUidValid ) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: "User doesn't exist"}))
        } else {                      
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(user))
        } 
        
    } catch (error) {
        res.writeHead(400, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Route is not found'}))
    }
}


export const createUser = async (req, res) => {
    try {
        const body = await getPostData(req);
        const { name, age, hobbies } = JSON.parse(body);
        const user = await addNewUser(name, age, hobbies);
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(user));        
    } catch (error) {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Route is not found'}));
    }
}

export const updateUser =  async (req, res, userID) => {
    try {
        const isUUidValid = await isUUIDValid(userID);
        const user = await findUserByID(userID);
        if ( !user && isUUidValid) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: "User doesn't exist"}))
        } else {
            const body = await getPostData(req);
            const { name=user.name, age=user.age, hobbies=user.hobbies } = JSON.parse(body);

            const updUser = await updateUserData(userID, name, age, hobbies);
            res.writeHead(200, {'Content-Type': 'application/json'})
            console.log('get user', JSON.stringify(updUser));
            res.end(JSON.stringify(updUser))  
        }           
        
    } catch (error) {
        res.writeHead(400, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Route is not found'}))
    }
}

export const deleteUser = async (req, res, userId) => {
    try {
        const isUUidValid = await isUUIDValid(userId);
        const user = await findUserByID(userId);
       
        if ( !user && isUUidValid ) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: "User doesn't exist"}))
        } else {    
            await removeUser(userId);         
            res.writeHead(204, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(`User ${userId} removed`))
        } 
        
    } catch (error) {
        res.writeHead(400, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Route is not found'}))
    }
}

