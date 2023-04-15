import React, { useState } from "react";
import styles from "./index.module.css";
import { Data } from "@/pages/api";
import moment from "moment";

type CurrentLocationInfoProps = {
  currentLocationData: Data | undefined;
};

const CurrentLocationInfo = (props: CurrentLocationInfoProps) => {
  const { currentLocationData } = props;
  const [date, setDate] = useState(moment().format("LLLL"));

  setInterval(() => {
    setDate(moment().format("LLLL"));
  }, 1000);

  return (
    <div className={styles?.main}>
      <img src={currentLocationData?.response?.current?.condition?.icon} />
      <div>{currentLocationData?.response?.location?.localtime}</div>
      <div>{date}</div>
    </div>
  );
};

export default CurrentLocationInfo;
