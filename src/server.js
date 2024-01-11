import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "http://localhost:";

configViewEngine(app);

// Cấu hình đọc body từ Request
// Đọc body ở dạng application/x-www-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);
// Đọc body ở dạng application//json
app.use(express.json());

initWebRoutes(app);

app.listen(PORT, () => {
  console.log("JWT Backend is running on the port = " + HOST + PORT);
});
