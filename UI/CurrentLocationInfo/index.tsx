import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Data } from "@/pages/api";
import moment from "moment";
import { messageService, mouseMove } from "@/utilFunction";

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
  const currentLocation = `${currentLocationData?.response?.location?.name}, ${currentLocationData?.response?.location?.region}, ${currentLocationData?.response?.location?.country}`;

  useEffect(() => {
    setInterval(() => {
      setDate(moment().format("LLLL"));
      setLastUpdated(
        moment(currentLocationData?.response?.current?.last_updated).fromNow()
      );
    }, 1000);
  }, []);

  return (
    <div
      className={`${styles?.main} card`}
      onMouseMove={(e) => {
        mouseMove(e);
      }}
    >
      <div className="card-content">
        {currentLocationData ? (
          <div className={styles?.data}>
            <div className={styles?.allinfo}>
              <div className={styles?.weathercondition}>
                <img
                  src={currentLocationData?.response?.current?.condition?.icon}
                />
                <div className={styles?.temp}>
                  {currentLocationData?.response?.current?.temp_c}°C{" "}
                  <span className={styles?.feel_temp}>
                    (feels like{" "}
                    {currentLocationData?.response?.current?.feelslike_c}°C)
                  </span>
                  <div className={styles?.condition}>
                    {currentLocationData?.response?.current?.condition?.text}
                  </div>
                </div>
              </div>
              <div className={styles?.localinfo}>
                <div>{date}</div>
                <div>{currentLocation}</div>
              </div>
            </div>
            <div className={styles?.last_updated}>
              Last updated {lastUpdated}
            </div>
            <div
              className={styles?.more}
              onClick={() => {
                messageService?.sendMessage({
                  sender: "current-location-info",
                  // @ts-ignore
                  message: { action: "open-popup" },
                  target: "pop-up",
                });
              }}
            >
              More info &gt;
            </div>
          </div>
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
