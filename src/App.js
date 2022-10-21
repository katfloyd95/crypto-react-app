import logo from "./CryptoAppLogo.png"
import { useEffect, useState } from 'react';

const COIN_NAMES = {
  BTCUSDT: 'Bitcoin',
  ETHUSDT: 'Ethereum',
  SOLUSDT: 'Solana',
  ADAUSDT: 'Cardano',
  DOGEUSDT: 'DogeCoin'
}

const COIN_SYMBOLS = Object.keys(COIN_NAMES);

function App() {

  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    console.log("running fetch");
    fetch('https://api2.binance.com/api/v3/ticker/24hr')
    .then(res => res.json())
    .then(data => {
      const filteredData = data.filter(ticker => {
        if (COIN_SYMBOLS.includes(ticker.symbol)) {
          return true;
        }
      });
      setCryptoData(filteredData);
    });
  }, []);

  return (
    <div className='App'>
      <nav>
        <img src={logo} alt='Logo' />
        <input type='text' placeholder='Search' />
      </nav>
      <div className='main-content'>
        <h1>Today's Crypocurrency Prices</h1>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h %</th>
            </tr>
          </thead>
          <tbody>
            {
              cryptoData.map((coin, i) => (
                  <tr key={coin.symbol}>
                    <td>{i+1}</td>
                    <td>{COIN_NAMES[coin.symbol]}</td>
                    <td>${Number(coin.lastPrice).toLocaleString()}</td>
                    <td style={
                      Number(coin.priceChangePercent) > 0 
                      ? {color: 'green'} 
                      : {color: 'red'}
                    }>
                      {
                        Number(coin.priceChangePercent) < 0 
                        ? '▼' 
                        : '▲'
                      }
                      {Number(coin.priceChangePercent).toFixed(2)}%
                    </td>
                  </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
