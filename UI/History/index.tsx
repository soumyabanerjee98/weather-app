import React from "react";
import styles from "./index.module.css";
import { mouseMove } from "@/utilFunction";

const History = () => {
  return (
    <div
      className={`${styles?.main} card`}
      onMouseMove={(e) => {
        mouseMove(e);
      }}
    >
      <div className="card-content">History</div>
    </div>
  );
};

export default History;
