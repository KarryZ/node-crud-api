import { validate as uuidValidate, version as uuidVersion } from 'uuid';

export const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        try{
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString()
            })
            req.on('end', async() => {
                resolve(body);
            })
        } catch(e) {
            reject('error')
        }
        
    })
    
}

export const isUUIDValid = (userId) => {
    return new Promise((resolve, reject) => {
        const isValid = uuidValidate(userId) && uuidVersion(userId) === 4;
        isValid ? resolve(true) : resolve(false);
    })
}

export const setError500 = (res) => {
    res.writeHead(500, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({message: 'Ups! Something went wrong :('}))
}

export const setError400 = (res) => {
    res.writeHead(400, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({message: 'Route is not found'}))
}

export const setError404 = (res) => {
    res.writeHead(404, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({message: "User doesn't exist"}))
}