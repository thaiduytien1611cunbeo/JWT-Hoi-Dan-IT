import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "http://localhost:";

configViewEngine(app);

initWebRoutes(app);

app.listen(PORT, () => {
  console.log("JWT Backend is running on the port = " + HOST + PORT);
});
