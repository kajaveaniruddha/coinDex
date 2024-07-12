import React, { useEffect, useState } from "react";
import axios from "axios";
import CryptoCard from "./CryptoCard";
import Table from "./Table";
import { motion } from "framer-motion";
const Index = () => {
  const [cryptoData, setCryptoData] = useState({
    bitcoin: { price: null, change: null },
    ethereum: { price: null, change: null },
    solana: { price: null, change: null },
  });

  useEffect(() => {
    const socket = new WebSocket("wss://stream.binance.com:9443/ws");

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: ["btcusdt@ticker", "ethusdt@ticker", "solusdt@ticker"],
          id: 1,
        })
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.e === "24hrTicker") {
        setCryptoData((prevCryptoData) => {
          const updatedData = { ...prevCryptoData };
          switch (data.s) {
            case "BTCUSDT":
              updatedData.bitcoin = {
                price: data.c,
                change: data.P,
              };
              break;
            case "ETHUSDT":
              updatedData.ethereum = {
                price: data.c,
                change: data.P,
              };
              break;
            case "SOLUSDT":
              updatedData.solana = {
                price: data.c,
                change: data.P,
              };
              break;
            default:
              break;
          }
          return updatedData;
        });
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    // Fetch initial data using REST API
    const fetchInitialData = async () => {
      try {
        const [btcResponse, ethResponse, solResponse] = await Promise.all([
          axios.get(
            "https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT"
          ),
          axios.get(
            "https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT"
          ),
          axios.get(
            "https://api.binance.com/api/v3/ticker/24hr?symbol=SOLUSDT"
          ),
        ]);

        setCryptoData({
          bitcoin: {
            price: btcResponse.data.lastPrice,
            change: btcResponse.data.priceChangePercent,
          },
          ethereum: {
            price: ethResponse.data.lastPrice,
            change: ethResponse.data.priceChangePercent,
          },
          solana: {
            price: solResponse.data.lastPrice,
            change: solResponse.data.priceChangePercent,
          },
        });
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchInitialData();
  }, []);

  return (
    <>
      <section
        className=" text-white text-center relative pt-4 h-screen overflow-x-hidden"
        id="home"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="leading-none max-sm:text-[3rem] max-md:text-[4rem] max-sm:tracking-normal text-[6.5rem] max-md:w-[80%] tracking-tight uppercase font-bold w-1/2 mx-auto"
        >
          Real-Time{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00FF6A] to-[#FF9500]">
            Crypto
          </span>{" "}
          <br /> Companion
        </motion.h1>
        <div className=" justify-around max-md:justify-between animated-svg absolute max-sm:top-[4rem] top-[9rem] flex w-full">
          <img
            loading="lazy"
            className="w-[5rem] max-sm:scale-75"
            src="/3d-fluency-bitcoin.png"
            alt="3d-fluency-ethereum"
          />
          <img
            loading="lazy"
            className="w-[5rem] max-sm:scale-75"
            src="/3d-fluency-ethereum.png"
            alt="3d-fluency-ethereum"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-md:w-[80%] flex-wrap mx-auto max-sm:scale-95 flex justify-evenly gap-4 font-semibold w-full pt-10 max-sm:pb-20"
        >
          <CryptoCard
            name="Bitcoin"
            imageSrc="/bitcoin-btc-logo.svg"
            price={cryptoData.bitcoin.price}
            change={cryptoData.bitcoin.change}
          />
          <CryptoCard
            name="Ethereum"
            imageSrc="/ethereum-eth-logo.svg"
            price={cryptoData.ethereum.price}
            change={cryptoData.ethereum.change}
          />
          <CryptoCard
            name="Solana"
            imageSrc="/solana-sol-logo.svg"
            price={cryptoData.solana.price}
            change={cryptoData.solana.change}
          />
        </motion.div>
      </section>

      <section
        className="text-white text-center w-[95%] max-sm:pb-10 max-sm:pt-0 mx-auto"
        id="market"
      >
        <Table />
      </section>
      <section
        className="text-white text-center w-[95%] my-20 mx-auto relative border-t border-white/20"
        id="joinus"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="pt-20 leading-none max-sm:text-[3rem] max-sm:-mt-14 text-[6rem] tracking-tight uppercase font-bold w-1/2 mx-auto">
            Join us via{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00FF6A] to-[#FF9500]">
              Twitter
            </span>{" "}
          </h1>
          <div className="animated-svg absolute top-28 max-sm:top-10 flex justify-around max-sm:justify-between w-full">
            <img
              loading="lazy"
              className="w-[5rem] max-sm:scale-75"
              src="/3d-fluency-bitcoin.png"
              alt="3d-fluency-ethereum"
            />
            <img
              loading="lazy"
              className="w-[5rem] max-sm:scale-75"
              src="/3d-fluency-ethereum.png"
              alt="3d-fluency-ethereum"
            />
          </div>
          <p className=" max-sm:text-sm text-xl font-thin mt-4 ">
            Follow our Twitter handle to connect with the crypto community!
          </p>
        </motion.div>
      </section>
    </>
  );
};

export default Index;
