import express from "express";
import routes from "./routes.js";
import fs from "fs";
import path from "path";

const menuJSON = require("../db/menu.json");
const walletJSON = require("../db/wallet.json");

const router = express.Router();

const updateWalletJson = (req, res) => {
  const latestData = req.body;
  const file = path.join(__dirname, "../db/wallet.json");
  fs.writeFile(file, JSON.stringify(latestData, null, 2), err => {
    if (err) throw err;
    res.send(walletJSON);
  });
};

router.get(routes.items, (req, res) => res.send(menuJSON));
router.get(routes.wallet, (req, res) => res.send(walletJSON));
router.patch(routes.wallet, updateWalletJson);

export default router;
