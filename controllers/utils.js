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
        isValid ? resolve(true) : reject('err');
    })
}