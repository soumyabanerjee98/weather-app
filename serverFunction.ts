import { processIDs, server } from "./config";
import { Data, Request } from "./pages/api";

const dotenv = require("dotenv");

dotenv.config();

const getcurrentlocationweather = async (reqData: Request["data"]) => {
  const ip = await fetch(
    `http://api.weatherapi.com/v1/ip.json?key=${process.env.WEATHERAPI}&q=auto:ip`
  );
  const ipJson = await ip.json();
  if (ipJson?.error) {
    const data: Data = {
      returnCode: false,
      response: ipJson?.error,
      message: "Something went wrong!",
    };
    return data;
  }
  const lat = ipJson?.lat;
  const lon = ipJson?.lon;
  const currentLocWeather = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHERAPI}&q=${lat},${lon}&days=${server?.forecastDay}&aqi=yes&alerts=yes`
  );
  const currentLocWeatherJson = await currentLocWeather.json();
  if (currentLocWeatherJson?.error) {
    const data: Data = {
      returnCode: false,
      response: currentLocWeatherJson?.error,
      message: "Something went wrong!",
    };
    return data;
  }
  const data: Data = {
    returnCode: true,
    response: currentLocWeatherJson,
    message: "Data fetched successfully",
  };
  return data;
};

const getsearchedlocationweather = async (reqData: Request["data"]) => {};

export const processHandler = async (
  processId: Request["processId"],
  reqData: Request["data"]
) => {
  switch (processId) {
    case processIDs?.getcurrentlocationweather:
      return await getcurrentlocationweather(reqData);
      break;
    case processIDs?.getsearchedlocationweather:
      return await getsearchedlocationweather(reqData);
      break;
    default:
      return {
        returnCode: false,
        response: undefined,
        message: "Incorrect process ID",
      };
      break;
  }
};
