const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

let transactions = [];

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','login', 'index.html'));
});

app.post('/index', (req, res) => {
    const { username, password } = req.body;

    if (username == test && password == password) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Login failed! Please check your username and password.' });
    }
});




app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/donate', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'donate.html'));
});

app.post('/donate', (req, res) => {
    const { amount, donorName, donorEmail, phoneNumber, referralCode } = req.body;

    const transaction = {
        donorName,
        amount: parseFloat(amount),
        date: new Date().toISOString().split('T')[0]
    };

    transactions.push(transaction);

    res.json({ message: 'Donation successful!', transaction });
});

app.get('/transactions', (req, res) => {
    res.json(transactions);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
