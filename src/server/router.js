const express = require("express");
const routes = require("./routes.js");

const menuJSON = require("../db/menu.json");
const walletJSON = require("../db/wallet.json");

const router = express.Router();

router.get(routes.items, (req, res) => res.send(menuJSON));
router.get(routes.wallet, (req, res) => res.send(walletJSON));

module.exports = router;
