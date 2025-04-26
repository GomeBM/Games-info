const express = require("express");
const app = express();
const sequelize = require("./config/db");
const gameRouter = require("./routes/gamesRouter.js");
const userRouter = require("./routes/userRouter.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const db = require("./models");
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/games", gameRouter);
app.use("/api/user", userRouter);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected.");

    await db.sequelize.sync();
    console.log("✅ DB synced.");

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("❌ DB error:", err);
  }
};

startServer();
