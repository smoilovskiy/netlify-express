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
  try {
    const response = await axios.get(
      "https://www.ryanair.com/api/farfnd/v4/roundTripFares?departureAirportIataCode=POZ&market=en-gb&adultPaxCount=1&outboundDepartureDateFrom=2024-05-01&outboundDepartureDateTo=2024-05-31&inboundDepartureDateFrom=2024-05-01&inboundDepartureDateTo=2024-05-31&outboundDepartureTimeFrom&outboundDepartureTimeTo&inboundDepartureTimeFrom&inboundDepartureTimeTo&durationFrom&durationTo"
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting round trip fares..." });
  }
});

app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);
