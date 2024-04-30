const express = require("express");
const serverless = require("serverless-http");
const app = express();
const axios = require("axios");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("App test is running..");
});

router.get("/activeAirports", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.ryanair.com/api/views/locate/3/airports/en/active"
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);
