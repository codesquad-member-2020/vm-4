const express = require("express");
const cors = require("cors");
const router = require("./router.js");
const routes = require("./routes.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes.vendingmachine, router);

app.listen(8081);
