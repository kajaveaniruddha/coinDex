import React, { memo, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "market_cap_rank",
    direction: "ascending",
  });
  const coinsPerPage = 5;

  const fetchTrending = async () => {
    const url = "https://api.coingecko.com/api/v3/search/trending";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": import.meta.env.API_KEY_CG,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data.coins; // Return only the coins array
  };

  const { data, isFetching, error } = useQuery({
    queryKey: ["fetch-trending"],
    queryFn: fetchTrending,
    staleTime: 120_000,
  });

  const totalPages = data ? Math.ceil(data.length / coinsPerPage) : 1;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedCoins = data
    ? [...data].sort((a, b) => {
        const aValue =
          sortConfig.key === "price"
            ? a.item.data.price
            : a.item.market_cap_rank;
        const bValue =
          sortConfig.key === "price"
            ? b.item.data.price
            : b.item.market_cap_rank;
        return sortConfig.direction === "ascending"
          ? aValue - bValue
          : bValue - aValue;
      })
    : [];

  const currentCoins = sortedCoins.slice(
    (currentPage - 1) * coinsPerPage,
    currentPage * coinsPerPage
  );

  return (
    <section className="z-20 text-white border-t border-white/20 container">
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center pt-20 lg:text-3xl md:text-2xl sm:text-xl text-lg font-semibold"
      >
        Top 15 Trending Coins
      </motion.h3>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-red-500 w-fit mx-auto mt-4 p-4 rounded-md"
        >
          Error Loading data!
        </motion.div>
      )}
      {isFetching && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-blue-500 w-fit mx-auto mt-4 p-4 rounded-md"
        >
          Loading...
        </motion.div>
      )}

      {data && (
        <>
          <motion.table
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-[90%] lg:w-[75%] mx-auto mt-20 rounded-xl overflow-hidden bg-gray-800 shadow-lg"
          >
            <thead className="bg-[linear-gradient(to_right,#ef32d9cc,#f6ff00cc,#89fffdcc)] text-gray-900">
              <tr>
                <th className="p-4 text-md md:text-lg lg:text-xl font-medium">
                  Coin
                </th>
                <th className="p-4 text-md md:text-lg lg:text-xl font-medium">
                  Name
                </th>
                <th
                  onClick={() => handleSort("price")}
                  className="p-4 text-md md:text-lg lg:text-xl font-medium cursor-pointer"
                >
                  Price{" "}
                  {sortConfig.key === "price" ? (
                    sortConfig.direction === "ascending" ? (
                      <AiFillCaretUp size={20} />
                    ) : (
                      <AiFillCaretDown size={20} />
                    )
                  ) : (
                    ""
                  )}
                </th>
                <th
                  onClick={() => handleSort("market_cap_rank")}
                  className=" p-4 text-md md:text-lg lg:text-xl font-medium cursor-pointer"
                >
                  Rank{" "}
                  {sortConfig.key === "market_cap_rank" ? (
                    sortConfig.direction === "ascending" ? (
                      <AiFillCaretUp size={20} />
                    ) : (
                      <AiFillCaretDown size={20} />
                    )
                  ) : (
                    ""
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentCoins.map((coin) => (
                <tr key={coin.item.id}>
                  <td className="border-b border-gray-700 flex justify-center py-2">
                    <img
                      src={coin.item.small}
                      alt={coin.item.name}
                      loading="lazy"
                      className="rounded-full"
                    />
                  </td>
                  <td className="border-b border-gray-700 px-4 py-2">
                    {coin.item.name}
                  </td>
                  <td className="border-b border-gray-700 px-4 py-2">
                    {coin.item.data.price.toFixed(3)}
                  </td>
                  <td className="border-b border-gray-700 px-4 py-2">
                    {coin.item.market_cap_rank}
                  </td>
                </tr>
              ))}
            </tbody>
          </motion.table>
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 rounded-md ${
                  currentPage === index + 1 ? "bg-blue-600" : "bg-gray-600"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default memo(Table);
