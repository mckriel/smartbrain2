const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

const port = 3001;
const app = express();

app.use(express.json())
app.use(cors())

const database = {
    users: [
        {
            id: '123',
            name: 'matt',
            email: 'matt@gmail.com',
            password: 'poes',
            entries: 0,
            joined: new Date(),
        },
        {
            id: '124',
            name: 'nalise',
            email: 'nalise@gmail.com',
            password: 'poes',
            entries: 0,
            joined: new Date(),
        }
    ]
}

app.get('/', (request, response) => {
    response.send(database.users);
})

app.post('/signin', (req, res) => {
    console.log(database.users[0])
    console.log(req.body)
    
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        // res.json('success');
        res.json(database.users[0]);
    } else {
        res.status(400).json('error logging in');
    }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    
    bcrypt.hash(password, null, null, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash);
    });
    
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json('user not found')
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(`Entries: ${user.entries}`);
        }
    })
    if (!found) {
        res.status(400).json('user not found')
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
