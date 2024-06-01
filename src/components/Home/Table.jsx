import React, { useState, useEffect } from "react";
import axios from "axios";
import { RefreshCcw, RefreshCwOff } from "lucide-react";
const Table = () => {
  const [coinData, setCoinData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const coinsPerPage = 10;

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.binance.com/api/v3/ticker/24hr"
        );

        // Filter coins with non-zero market cap
        const filteredData = response.data.filter(
          (coin) => parseFloat(coin.quoteVolume) !== 0
        );
        setLoading(false);
        setCoinData(filteredData.slice(0, 40));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCoinData();
  }, [refresh]);

  // Logic to calculate the index of the first and last coins for the current page
  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = coinData.slice(indexOfFirstCoin, indexOfLastCoin);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <h3 className="text-left text-4xl font-bold pb-6 max-sm:text-center max-sm:text-3xl">Market Update</h3>
      <button
        className={`has-tooltip right-0 w-fit cursor-pointer py-2 ${
          loading && "pointer-events-none cursor-wait"
        }`}
        onClick={() => setRefresh(!refresh)}
      >
        <span className="tooltip  rounded shadow-lg p-1 bg-[#121212] text-[#fff] -mt-8">
          {loading?"wait":"Refresh"}
        </span>
        {!loading ? <RefreshCcw /> : <RefreshCwOff />}
      </button>
      <div className="flex justify-center text-[#FF9500]">
        <table className=" max-sm:text-sm text-xl w-full table-auto border-collapse border border-gray-200 rounded">
          <thead className=" max-sm:text-sm text-2xl font-bold">
            <tr className="bg-gradient-to-b ">
              <th className="border w-1/4 border-gray-300 px-4 py-2 text-center">
                Coin
              </th>
              <th className="border w-1/4 border-gray-300 px-4 py-2 text-center">
                Price
              </th>
              <th className="border w-1/4 border-gray-300 px-4 py-2 text-center">
                24h Change
              </th>
              <th className="border w-1/4 border-gray-300 px-4 py-2 text-center">
                Market Cap
              </th>
            </tr>
          </thead>
          <tbody className=" text-white font-semibold ">
            {currentCoins.map((coin, index) => (
              <tr key={index} className="hover:bg-[#1212127b] transition-colors">
                <td className="text-[#FF9500] border border-gray-300 px-4 py-2 text-center">
                  {coin.symbol}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  $ {parseFloat(coin.lastPrice).toFixed(3)}{" "}
                </td>
                <td
                  className={`border border-gray-300 px-4 py-2 text-center ${
                    parseFloat(coin.priceChangePercent) >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {parseFloat(coin.priceChangePercent).toFixed(2)}%
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  $ {parseFloat(coin.quoteVolume).toFixed(4)}{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(coinData.length / coinsPerPage)).keys()].map(
          (pageNumber) => (
            <button
              key={pageNumber}
              className={`mx-1 py-2 px-4 rounded ${
                currentPage === pageNumber + 1
                  ? "bg-gray-800 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={() => paginate(pageNumber + 1)}
            >
              {pageNumber + 1}
            </button>
          )
        )}
      </div>
    </>
  );
};

export default Table;
