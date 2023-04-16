import React, { useState } from "react";
import styles from "./index.module.css";
import { Data } from "@/pages/api";
import moment from "moment";
import { mouseMove } from "@/utilFunction";

type CurrentLocationInfoProps = {
  currentLocationData: Data | null | undefined;
};

const CurrentLocationInfo = (props: CurrentLocationInfoProps) => {
  const { currentLocationData } = props;
  console.log(currentLocationData);

  const [date, setDate] = useState(moment().format("LLLL"));

  setInterval(() => {
    setDate(moment().format("LLLL"));
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
            <div>{currentLocationData?.response?.location?.localtime}</div>
            <div>{date}</div>
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
