//npm run devStart

const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

const users = []

app.get('/gametastic/users', (req, res) => {
    res.json(users);
});

//async because of bcrypt
app.post('/gametastic/users', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = { name: req.body.name, password: hashedPassword}
        users.push(user);
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
});

app.post('/gametastic/users/login', async (req, res) => {
    const user = users.find(user => user,name = req.body.name);
    if (user === null) {
        return res.status(400).send('Cannot find user');
    } 
    try {
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.status(200).send('Logged');
        } else {
            res.status(500).send('Not Allowed');
        }
    } catch {
        res.status(500).send();
    }
      
});

app.listen(3000);