import express from "express";
import dotenv from "dotenv";

dotenv.config();

import connectDb from "./db/connect.js";

import userRoutes from "./routes/UserRoute.js";
import routes from "./routes/index.js";

await connectDb();
const app = express();
app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("helloooo world");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("server is running on port 4000");
});
