const express = require('express');
const userRouter = express.Router();
const { getUsers } = require('../queries');

userRouter.get('/', async (req, res) => {
    
    const [result] = await getUsers();
    
    res.send(result);
});

userRouter.get('/me', async (req, res) => {
    
})


module.exports = { userRouter }