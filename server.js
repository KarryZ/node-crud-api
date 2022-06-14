import { createServer } from 'http';
import { getUsers, getUser, createUser, updateUser, deleteUser } from './controllers/userController.js';


const server = createServer((req, res) => {   
    const userId = req.url.split('/api/users/').pop();

    if(req.url === '/api/users' && req.method === 'GET') {
        getUsers(req, res);
    } else if (req.url.includes('/api/users/') && userId.length > 0  && req.method === 'GET') {
        getUser(req, res, userId);
    } else if (req.url.includes('/api/users') && req.method === 'POST') {
        createUser(req, res)
    } else if (req.url.includes('/api/users/') && userId.length > 0  && req.method === 'PUT') {
        updateUser(req, res, userId)
    } else if (req.url.includes('/api/users/') && userId.length > 0  && req.method === 'DELETE') {
        deleteUser(req, res, userId)
    }else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Route is not found'}))
    }
    
    
});

const PORT = process.env.port || 5000;
server.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))

