const express = require('express');
const cors = require('cors');
const app = express();
const menuJSON = require('../db/menu.json')
const walletJSON = require('../db/wallet.json')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/vendingmachine/items', (req, res) => {
    res.send(menuJSON);
});
app.get('/vendingmachine/wallet', (req, res) => {
    res.send(walletJSON);
});

app.listen(8081);
