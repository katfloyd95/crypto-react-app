import logo from "./CryptoAppLogo.png"

// Use this API
// https://api2.binance.com/api/v3/ticker/24hr

// symbols we want...
// BTCUSDT (Bitcoin)
// ETHUSDT (Ethereum)
// SOLUSDT (Solana)
// ADAUSDT (Cardano)
// DOGEUSDT (DogeCoin)

function App() {

  // 1. STATE AND USEEFFECT HERE

  // 2. How will you "Pull out" the symbols we need?

  // 3. ...and then store them in state?

  return (
    <div className='App'>
      <nav>
        <img src={logo} alt='Logo' />
        <input type='text' placeholder='Search' />
      </nav>
      <div className='main-content'>
        <h1>Today's Crypocurrency Prices</h1>
        <table>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>24h %</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Bitcoin</td>
            <td>$40,000</td>
            <td style={{color: 'green'}}>▲1.02%</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default App;
