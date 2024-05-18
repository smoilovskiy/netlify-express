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
    res.status(500).json({ error: "Error getting active airports..." });
  }
});

router.get("/roundTripFares", async (req, res) => {
  console.log("REQUEST", req.query);
  try {
    const response = await axios.get(
      `https://www.ryanair.com/api/farfnd/v4/roundTripFares?departureAirportIataCode=${req.query.origin}&market=en-gb&adultPaxCount=1&outboundDepartureDateFrom=${req.query.dateFrom}&outboundDepartureDateTo=${req.query.dateTo}&inboundDepartureDateFrom=${req.query.dateFrom}&inboundDepartureDateTo=${req.query.dateTo}&outboundDepartureTimeFrom&outboundDepartureTimeTo&inboundDepartureTimeFrom&inboundDepartureTimeTo&durationFrom&durationTo`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting round trip fares..." });
  }
});

app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);
