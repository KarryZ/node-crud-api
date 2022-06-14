import { v4 as uuidv4 } from 'uuid';

let users = [];

export const CreateUser = class {
    constructor(name, age, hobbies) {
        this.name= name;
        this.age= age;
        this.hobbies = hobbies;
        this.id = uuidv4();
    }
  };

export const addAllUsers = () => {
    const user1 = new CreateUser('Tom', 28, ["play music","watch tv shows"]);
    const user2 = new CreateUser('Nick', 30, ["hiking","sleeping"]);
    const user3 = new CreateUser("Andy", 27, ["cycling","hanging out with friends"]);
    users.push(user1, user2, user3);    
    return users;
}

export const findAllUsers = async () => {
    return new Promise((resolve, reject) => {
        resolve(users);
    });
}

export const findUserByID = async (userId) => {
    return new Promise((resolve, reject) => {
        const user = users.find(user => user.id === userId);
        resolve(user);
    })
}

export const addNewUser = ( name, age, hobby) => {
    return new Promise((resolve, reject) => {
        
        if(name || age && hobby) {
            const user = new CreateUser(name, age, hobby);
            users.push(user);
            resolve(user);
        }else{
            reject('err')
        }
        
    });
    
}

export const updateUserData = (id, name, age, hobby) => {
    return new Promise((resolve, reject) => {
        const index = users.findIndex(i=> i.id === id); 
        users[index] = {id, name, age, hobby};
        resolve(users[index]);
    });
    
}

export const removeUser = (id) => {
    return new Promise((resolve, reject) => {
        const index = users.findIndex(i=> i.id === id); 
        console.log('index', index);
        users = [
            ...users.slice(0, index),
            ...users.slice(index +1)
        ];
        console.log('users', users);
        resolve();
    });
    
}


