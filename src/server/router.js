const express = require("express");
const routes = require("./routes.js");
const fs = require("fs");
const path = require("path");

const menuJSON = require("../db/menu.json");
const walletJSON = require("../db/wallet.json");

const router = express.Router();

const updateWalletJson = (req, res) => {
  const latestData = req.body;
  const file = path.join(__dirname, "../db/wallet.json");
  fs.writeFile(file, JSON.stringify(latestData), err => {
    if (err) throw err;
    res.status(200);
    res.end();
  });
};

router.get(routes.items, (req, res) => res.send(menuJSON));
router.get(routes.wallet, (req, res) => res.send(walletJSON));
router.patch(routes.wallet, updateWalletJson);

module.exports = router;
