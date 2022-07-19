import React, { useRef } from "react";
import { Bird } from "../Bird";
import { css } from "@emotion/css";

export default function Playground() {
  const ref = useRef();
  return (
    <div
      className={css({
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      <Bird ref={ref} />
    </div>
  );
}
