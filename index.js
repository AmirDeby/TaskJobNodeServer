const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const SECRET = "foo";
const expressJwt = require('express-jwt');
const cors = require('cors');


const { jobRouter } = require('./routers/jobs');
const { userRouter } = require('./routers/users')
const port = 4000;

const { addUser, login } = require('./queries');



app.use(express.json());
app.use(cors())
// app.use(expressJwt({ SECRET }).unless({ path: ['/register'] }));



app.use('/job', jobRouter);
app.use('/users', userRouter);

app.post('/register', async (req, res) => {

    const { firstName, lastName, userName, password } = req.body;
    const { userId } = req.params

    await addUser(firstName, lastName, userName, password);
    // bring the id from SQL
    jwt.sign({ userId }, SECRET, (err, token) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(token);
    })
})

app.post('/login', async (req, res) => {

    const { userName, password } = req.body;
    const { userId } = req.params

    const [result] = await login(userName, password);
    
    const [user] = result;

    if (!user) {
        res.status(401).send('incorrect user name or password')
        return;
    }
    jwt.sign({ userId }, SECRET, (err, token) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(token);
    })
})


app.use('*', (req, res) => {
    res.status(404).send('page not found');
});


app.listen(port, () => {
    console.log(`server is up: ${port}`)
});