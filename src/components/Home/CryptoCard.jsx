import React from "react";

const CryptoCard = ({ name, imageSrc, price, change }) => {
  return (
    <div className="text-center flex flex-col items-center justify-center h-full max-sm:scale-90">
      <img
        className="h-[5rem]"
        loading="lazy"
        src={imageSrc}
        alt={`${name} Logo`}
      />
      <h3 className="font-bold text-3xl">{name}</h3>
      <h5
        className={`text-2xl ${
          change > 0 ? "text-green-500" : change < 0 ? "text-red-500" : "text-white"
        }`}
      >
        {change ? `${parseFloat(change).toFixed(2)}%` : "Loading..."}
      </h5>
      <h5 className="text-2xl">{price ? `$${parseFloat(price).toFixed(2)}` : "Loading..."}</h5>
    </div>
  );
};

export default CryptoCard;
