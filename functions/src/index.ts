import * as functions from "firebase-functions";
import * as http from "node:http";
import * as https from "node:https";

export const getWeather = functions.https.onRequest(
  async (request, response) => {
    const options = {};
    https.get(
      "https://api.open-meteo.com/v1/forecast?latitude=" +
      "51.51&longitude=-0.13&hourly=temperature_2m&current_weather=true",
      options,
      (res: http.IncomingMessage) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            const parsedData = JSON.parse(data);
            response.setHeader(
              "Content-Type",
              "application/json; charset=utf-8"
            );
            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(JSON.stringify({data: parsedData}));
          } catch (err) {
            console.error("Error parsing weather API data:", err);
            response.status(500)
              .json({error: "Failed to process weather data"});
          }
        });
      });
  });
