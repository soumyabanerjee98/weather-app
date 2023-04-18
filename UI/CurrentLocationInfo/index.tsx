import React, { useState } from "react";
import styles from "./index.module.css";
import { Data } from "@/pages/api";
import moment from "moment";
import {
  formatDateTime,
  messageService,
  monthName,
  mouseMove,
  timeFormat,
} from "@/utilFunction";
import { motion, AnimatePresence } from "framer-motion";

type CurrentLocationInfoProps = {
  currentLocationData: Data | null | undefined;
};

const CurrentLocationInfo = (props: CurrentLocationInfoProps) => {
  const { currentLocationData } = props;
  console.log(currentLocationData?.response);

  const [date, setDate] = useState(moment().format("LLLL"));
  const [lastUpdated, setLastUpdated] = useState(
    moment(currentLocationData?.response?.current?.last_updated).fromNow()
  );
  const localTime: string = currentLocationData?.response?.location?.localtime;
  const formattedLocalTime = formatDateTime(localTime);
  const currentLocation = `${currentLocationData?.response?.location?.name}, ${currentLocationData?.response?.location?.region}, ${currentLocationData?.response?.location?.country}`;

  setInterval(() => {
    setDate(moment().format("LLLL"));
    setLastUpdated(
      moment(currentLocationData?.response?.current?.last_updated).fromNow()
    );
  }, 1000);

  return (
    <div
      className={`${styles?.main} card`}
      onMouseMove={(e) => {
        mouseMove(e);
      }}
    >
      <div className="card-content">
        {currentLocationData ? (
          <>
            <img
              src={currentLocationData?.response?.current?.condition?.icon}
            />
            <div>Local time: {formattedLocalTime}</div>
            <div>{date}</div>
            <div>{currentLocation}</div>
            <div>Last updated: {lastUpdated}</div>
            <button
              type="button"
              onClick={() => {
                messageService?.sendMessage({
                  sender: "current-location-info",
                  // @ts-ignore
                  message: { action: "open-popup" },
                  target: "pop-up",
                });
              }}
            >
              Hi
            </button>
          </>
        ) : (
          <div className={styles?.nodata}>
            Can not fetch current location weather data
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentLocationInfo;
