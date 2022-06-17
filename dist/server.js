"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const userController_1 = require("./controllers/userController");
const utils_1 = require("./controllers/utils");
require("dotenv/config");
const server = (0, http_1.createServer)((req, res) => {
    const userId = req.url.split('/api/users/').pop();
    if (req.url === '/api/users' && req.method === 'GET') {
        (0, userController_1.getUsers)(req, res);
    }
    else if (req.url.includes('/api/users/') && userId.length > 0 && req.method === 'GET') {
        (0, userController_1.getUser)(req, res, userId);
    }
    else if (req.url.includes('/api/users') && req.method === 'POST') {
        (0, userController_1.createUser)(req, res);
    }
    else if (req.url.includes('/api/users/') && userId.length > 0 && req.method === 'PUT') {
        (0, userController_1.updateUser)(req, res, userId);
    }
    else if (req.url.includes('/api/users/') && userId.length > 0 && req.method === 'DELETE') {
        (0, userController_1.deleteUser)(req, res, userId);
    }
    else {
        (0, utils_1.setError400)(res);
    }
});
const PORT = process.env.port || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
