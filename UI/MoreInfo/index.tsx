import React from "react";
import styles from "./index.module.css";
import { motion } from "framer-motion";
import { messageService } from "@/utilFunction";

const MoreInfo = () => {
  const closePopUp = () => {
    messageService?.sendMessage({
      sender: "pop-up",
      // @ts-ignore
      message: { action: "close-popup" },
      target: "page",
    });
  };
  const clickOutSide = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // @ts-ignore
    const classname: string = e.target?.className;
    if (classname?.includes("modal")) {
      closePopUp();
    }
  };
  return (
    <motion.div
      key="more-info"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles?.modal}
      onClick={(event) => {
        clickOutSide(event);
      }}
    >
      Hi
    </motion.div>
  );
};

export default MoreInfo;
