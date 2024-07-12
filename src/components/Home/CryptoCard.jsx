import React, { memo, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

const CryptoCard = ({ name, imageSrc, price, change }) => {
  const offsetX = useMotionValue(-100);
  const offsetY = useMotionValue(-100);
  const maskImage = useMotionTemplate`radial-gradient(100px 100px at ${offsetX}px ${offsetY}px, black, transparent)`;
  const border = useRef();

  useEffect(() => {
    const updateMousePosition = (e) => {
      if (!border.current) return;
      const borderRect = border?.current?.getBoundingClientRect();
      offsetX.set(e.clientX - borderRect.x);
      offsetY.set(e.clientY - borderRect.y);
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <div className="text-center flex flex-col max-md:justify-evenly max-md:flex-row items-center justify-center h-full max-sm:scale-90 p-4 border max-md:w-full relative border-white/50 rounded-xl bg-white bg-opacity-10 shadow-lg">
      <motion.div
        className="inset-0 absolute border-2 border-purple-400 rounded-xl"
        style={{
          maskImage: maskImage,
          WebkitMaskImage: maskImage,
        }}
        ref={border}
      ></motion.div>
      <img
        className="h-[5rem]"
        loading="lazy"
        src={imageSrc}
        alt={`${name} Logo`}
      />
      <div>
        <h3 className="font-bold text-3xl max-md:text-2xl">{name}</h3>
        <h5
          className={`text-2xl max-md:text-xl ${
            change > 0
              ? "text-green-500"
              : change < 0
              ? "text-red-500"
              : "text-white"
          }`}
        >
          {change ? `${parseFloat(change).toFixed(2)}%` : "Loading..."}
        </h5>
        <h5 className="text-2xl max-md:text-xl w-20 md:w-32 lg:w-40 text-center">
          {price ? `$${parseFloat(price).toFixed(2)}` : "Loading..."}
        </h5>
      </div>
    </div>
  );
};

export default memo(CryptoCard);
