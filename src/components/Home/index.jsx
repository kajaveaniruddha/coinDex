import React, { useEffect, useState } from "react";
import axios from "axios";
import CryptoCard from "./CryptoCard";
import Table from "./Table";
import { Link } from "react-router-dom";
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
        className=" text-white text-center relative pt-6 h-screen max-sm:mt-20"
        id="home"
      >
        <h1 className="leading-none max-sm:text-[3rem] max-sm:tracking-normal max-sm:w-[80%] text-[7rem] tracking-tight uppercase font-bold w-1/2 mx-auto">
          Real-Time{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00FF6A] to-[#FF9500]">
            Crypto
          </span>{" "}
          <br /> Companion
        </h1>
        <div className=" max-sm:justify-between animated-svg absolute max-sm:top-[4rem] top-[9rem] flex justify-around w-full">
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
        <div className=" max-sm:scale-95 flex font-semibold justify-evenly w-full pt-10 max-sm:pb-20">
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
          <div>
            <CryptoCard
              name="Solana"
              imageSrc="/solana-sol-logo.svg"
              price={cryptoData.solana.price}
              change={cryptoData.solana.change}
            />
          </div>
        </div>
        <a href="#market" className=" bg-gradient-to-b text-left text-3xl font-bold border sm:hidden rounded p-4">Market Update</a>
      </section>

      <section
        className="text-white text-center w-[95%] max-sm:pb-10 max-sm:pt-0 py-20 mx-auto"
        id="market"
      >
        <Table />
      </section>
      <section
        className="text-white text-center w-[95%] py-20 mx-auto relative"
        id="joinus"
      >
        <h1 className="leading-none max-sm:text-[3rem] max-sm:-mt-14 text-[6rem] tracking-tight uppercase font-bold w-1/2 mx-auto">
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
        <p className=" max-sm:text-sm text-xl mt-4 ">
          Follow our Twitter handle to connect with the crypto community!
        </p>
      </section>
    </>
  );
};

export default Index;
