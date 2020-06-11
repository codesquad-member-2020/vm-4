import express from "express";
import cors from "cors";
import logger from "morgan";
import router from "./router.js";
import routes from "./routes.js";

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes.vendingmachine, router);

export default app;
