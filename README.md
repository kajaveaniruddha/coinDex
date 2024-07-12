# Crypto Dashboard

A real-time cryptocurrency dashboard displaying key data for Bitcoin, Ethereum, and Solana.

https://github.com/kajaveaniruddha/coinDex/blob/main/README.md
LIVE @  https://coin-dex.vercel.app
## Project Description

This project provides a real-time dashboard for tracking the price, 24-hour change, and market cap of Bitcoin, Ethereum, and Solana using data from Binance.
![image](https://github.com/user-attachments/assets/c9eb6a51-8231-4306-a8c3-100bb9047c35)



## Achievements

- Integrated real-time data using WebSockets from Binance.
- Displayed cryptocurrency information with dynamic and responsive components.
- Achieved a seamless user experience with pagination for better data navigation.
- Fetch and Sort top 15 trending coins data according to their Rank and Price from CoinGecko.
![image](https://github.com/user-attachments/assets/63810500-1de1-4019-bc42-27b7f8291289)


## Components

- **CryptoCard.jsx**: A card component that displays the name, image, price, and 24-hour change percentage of a cryptocurrency.
- **Table.jsx**: A table component that lists multiple cryptocurrencies with their prices, 24-hour change percentages, and market caps.
- **index.jsx**: The main component that integrates CryptoCard and Table, establishes WebSocket connection, and handles state management.

## Installation and Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/kajaveaniruddha/coinDex.git
   ```
2. Navigate to the project directory:
   ```bash
   cd coinDex
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open your browser and visit `http://localhost:3000` to view the dashboard.

## File Overview

- `CryptoCard.jsx`: Displays individual cryptocurrency data.
- `Table.jsx`: Displays a paginated table of cryptocurrency data.
- `index.jsx`: Fetches and manages the data, and integrates the components.

## Technologies Used

- React: For building the user interface.
- Tanstack-query: caching top-15 trending coins data from API.
- WebSocket: For real-time data updates.
- Fetch: For making HTTP requests.

## Future Enhancements

- Implement search and view realtime data for more cryptocurrencies.
- Enhance the UI with more detailed charts and graphs using trading view light weight chars library.

---

By following this README, users will be able to understand the purpose of the project, how to set it up, and what each file and component is responsible for.
## Binance API 


https://binance-docs.github.io/apidocs/#change-log
