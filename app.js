const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect('mongodb://localhost:27017/registration', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a mongoose schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/register', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save((err) => {
        if (err) {
            res.send('Error in registration.');
        } else {
            res.send('Registration successful.');
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

