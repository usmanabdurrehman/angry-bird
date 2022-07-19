import React, { useState, useEffect, forwardRef } from "react";
import { css, keyframes } from "@emotion/css";

const getDistance = (x1, y1, x2, y2) => {
  return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5;
};

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  console.log(rect.left, rect.top, window.scrollX, window.scrollY);
  return {
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY,
  };
}

const rotation = keyframes`
  from {
    transform: translate(0) rotate(0deg);
  }
  to {
    transform: translate(300px, -300px) rotate(359deg);
  }
`;

const release = keyframes`
  from {
    transform: translate(0);
  }
  to {
   transform: translate(300px, 300px);
  }
`;

export default forwardRef(function Bird({}, ref: any) {
  const [isDrag, setIsDrag] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [distance, setDistance] = useState(0);
  const [releaseCorr, setReleaseCorr] = useState({ x: 0, y: 0 });
  const [isFlying, setIsFlying] = useState(false);

  console.log({ distance: Math.floor(50 / distance) });

  useEffect(() => {
    if (ref && ref.current) {
      const bird = ref.current;
      console.log("hmn");
      setOrigin(getOffset(bird));
      // releaseCorr.x != 0 && setReleaseCorr(getOffset(bird));
      // if (releaseCorr.x != 0) {
      //   const { x, y } = getOffset(bird);
      //   ref.current.style.top = y;
      //   ref.current.style.left = x;
      // }
    }
  }, [ref]);

  // console.log({ ...releaseCorr });
  // console.log("c", ref?.current?.styles);
  return (
    <div
      className={css({
        background: "red",
        height: 50,
        width: 50,
        borderRadius: 4,
        position: "absolute",
        // display: isDrag ? "none" : "block",
        cursor: "pointer",
        ...(isFlying && {
          animation: `${rotation} ${Math.floor(
            50 / distance
          )}s ease 0s infinite`,
        }),
      })}
      id="sdsd"
      draggable
      onDrag={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setDistance(getDistance(origin.x, origin.y, e.clientX, e.clientY));
      }}
      ref={ref}
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "copyMove";
        setTimeout(() => setIsDrag(true), 0);
      }}
      onDragEnd={(e) => {
        if (ref && ref.current) {
          ref.current.style.top = `${e.clientY}px`;
          ref.current.style.left = `${e.clientX}px`;
        }
        // console.log({ x: e.clientX, y: e.clientY });
        setIsDrag(false);
        setIsFlying(true);
      }}
    ></div>
  );
});
