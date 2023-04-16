import React from "react";
import styles from "./index.module.css";
import { mouseMove } from "@/utilFunction";

const SearchSection = () => {
  return (
    <div
      className={`${styles?.main} card`}
      onMouseMove={(e) => {
        mouseMove(e);
      }}
    >
      <div className="card-content">SearchSection</div>
    </div>
  );
};

export default SearchSection;
