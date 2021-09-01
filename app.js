const express = require('express');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const users = [];

app.get('/unknown', (req, res) => {
    res.render('unknown');
});

app.get('/users', (req, res) => {
    res.send(JSON.stringify(users));
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res, next) => {
    // TODO: check data for validation
    const firstName = req.body.firstName.length > 0 ? req.body.firstName : '';
    const lastName = req.body.lastName.length > 0 ? req.body.lastName.length : '';
    const email = req.body.email.length > 0 ? req.body.email : '';
    const birthDate = req.body.date.length === 10 ? req.body.date : '';
    const password = req.body.password.length > 6 ? req.body.password : '';
    const gender = req.body.gender.length > 0 ? req.body.gender : '';

    console.log(firstName.length, lastName.length, email.length, password.length, gender.length);

    if (firstName && lastName && email && birthDate && password && gender) {
        users.push({
            _id: users.length + 1,
            firstName,
            lastName,
            email,
            password,
            birthDate,
            gender,
        });
    } else {
        next('Fill Every Field!');
    }
    console.log(req.body);
    res.redirect('/');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.post('/login', (req, res) => {
    // TODO: check user validation for login
    res.redirect('/home');
});

app.get('/', (req, res) => {
    res.render('app');
});

app.use((err, req, res, next) => {
    if (err) {
        res.redirect('/unknown');
    }

    res.send();
});

const port = process.env.PORT || 4040;
app.listen(port);
