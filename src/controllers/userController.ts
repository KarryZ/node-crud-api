import {  addAllUsers, findAllUsers, findUserByID, addNewUser, updateUserData, removeUser } from "../models/userModel"
import { getPostData, isUUIDValid, setError500, setError400, setError404 } from './utils';

//addAllUsers();

export const getUsers = async (req: any, res: any) => {
    try {        
        const users = await findAllUsers();
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(users))
    } catch (error) {
        setError500(res);
    }
}

export const getUser = async (req: any, res: any, userId) => {
    try {
        const isUUidValid = await isUUIDValid(userId);
        const user = await findUserByID(userId);
        
        if ( !user && isUUidValid ) {
            setError404(res);
        } else if ( !user && !isUUidValid ) {
            setError400(res);
        } else {                      
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(user))
        } 
        
    } catch (error) {
        setError500(res);
    }
}


export const createUser = async (req: any, res: any) => {
    try {
        const body: any = await getPostData(req);        
        const { name, age, hobbies } = JSON.parse(body);
        
        if ( !(name && age && hobbies) ){
            setError400(res);
        } else {
            const user = await addNewUser(name, age, hobbies);
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(user));
        }
               
    } catch (error) {
        setError500(res);
    }
}

export const updateUser =  async (req: any, res: any, userID: string) => {
    try {
        const isUUidValid = await isUUIDValid(userID);
        const user: { name?: string, age?: number, id?:string, hobbies?:string[] } = await findUserByID(userID);
        
        if ( !user && isUUidValid) {
            setError404(res);
        } else if ( !user && !isUUidValid) {
            setError400(res);
        } else {
            const body: any = await getPostData(req);
            const { name=user.name, age=user.age, hobbies=user.hobbies } = JSON.parse(body);

            const updUser = await updateUserData(userID, name, age, hobbies);
            res.writeHead(200, {'Content-Type': 'application/json'})
            console.log('get user', JSON.stringify(updUser));
            res.end(JSON.stringify(updUser))  
        }           
        
    } catch (error) {
        setError500(res);
    }
}

export const deleteUser = async (req: any, res: any, userId: string) => {
    try {
        const isUUidValid = await isUUIDValid(userId);
        const user = await findUserByID(userId);
       
        if ( !user && isUUidValid ) {
            setError404(res);
        } else if ( !user && !isUUidValid ) {
            setError400(res);
        } else {    
            await removeUser(userId);         
            res.writeHead(204, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(`User ${userId} removed`))
        } 
        
    } catch (error) {
        setError500(res);
    }
}

