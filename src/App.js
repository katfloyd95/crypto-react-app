import logo from "./CryptoAppLogo.png"
import { useEffect, useState } from 'react';

// Use this API
// https://api2.binance.com/api/v3/ticker/24hr

// symbols we want...
// BTCUSDT (Bitcoin)
// ETHUSDT (Ethereum)
// SOLUSDT (Solana)
// ADAUSDT (Cardano)
// DOGEUSDT (DogeCoin)

const COIN_NAMES = {
  BTCUSDT: 'Bitcoin',
  ETHUSDT: 'Ethereum',
  SOLUSDT: 'Solana',
  ADAUSDT: 'Cardano',
  DOGEUSDT: 'DogeCoin'
}

const COIN_SYMBOLS = Object.keys(COIN_NAMES);

function App() {

  // 1. STATE AND USEEFFECT HERE

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

  console.log(cryptoData);

  // 2. How will you "Pull out" the symbols we need?

  // console.log(cryptoData[0].symbol);

  // const cryptoSymbols = {};
  // cryptoData.forEach(dataObject => {
  //   if (dataObject.symbol === 'BTCUSDT') {
  //     cryptoSymbols.bitcoin = dataObject;
  //   } else if (dataObject.symbol === 'ETHUSDT') {
  //     cryptoSymbols.ethereum = dataObject;
  //   } else if (dataObject.symbol === 'SOLUSDT') {
  //     cryptoSymbols.solana = dataObject;
  //   } else if (dataObject.symbol === 'ADAUSDT') {
  //     cryptoSymbols.cardano = dataObject;
  //   } else if (dataObject.symbol === 'DOGEUSDT') {
  //     cryptoSymbols.dogecoin = dataObject;
  //   }
  // })
  // console.log(cryptoSymbols);

  // 3. ...and then store them in state?

  // cryptoSymbols.map((crypto, index) => (
  //   // <tr>
  //   //   <td>{index + 1}</td>
  //   //   <td></td>
  //   //   <td>$40,000</td>
  //   //   <td style={{color: 'green'}}>▲1.02%</td>
  //   // </tr>
  //   console.log(crypto, index)
  // ))

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
