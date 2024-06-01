import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCoin } from "../../store/slice/selectedCoinsSlice/index";
import axios from "axios"; // for making HTTP requests

const SearchCoin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    try {
      setSearching(true);
      if (searchTerm.length <= 0) {
        setSearchResults([]);
        setSearching(false);
        return;
      }
      const response = await axios.get(
        `https://api.binance.com/api/v3/exchangeInfo`
      );
      const coins = response.data.symbols;
      const filteredCoins = coins.filter((coin) =>
        coin.symbol.trim().toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearching(false);
      setSearchResults(filteredCoins);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddCoin = (coinSymbol) => {
    dispatch(addCoin(coinSymbol));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Coin"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="text-black"
      />
      {searching && "searching..."}
      <button onClick={handleSearch}>Search</button>
      <div className="max-h-[2rem]">
        {searchResults.map((coin) => (
          <div key={coin.symbol} onClick={() => handleAddCoin(coin.symbol)}>
            {coin.symbol} - {coin.baseAsset} / {coin.quoteAsset}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchCoin;
