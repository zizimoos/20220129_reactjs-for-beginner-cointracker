import { useEffect, useState } from "react";

function App() {
  const [coinList, setCoinList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [myMoney, setMyMoney] = useState(0);
  const [myBTC, setMyBTC] = useState(0);
  const [coinPrice, setCoinPrice] = useState(0);
  const [coinName, setCoinName] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("https://api.coinpaprika.com/v1/tickers");
      const json = await result.json();
      setCoinList(json);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const onChangeMyMoney = (e) => {
    e.preventDefault();
    setMyMoney(e.target.value);
  };
  const moneyToCoins = (e) => {
    e.preventDefault();
    console.log(coinPrice);
    setMyBTC(myMoney / coinPrice);
  };
  const selectCoinPrice = (e) => {
    e.preventDefault();
    setCoinPrice((prev) => coinList[e.target.value].quotes.USD.price);
    setCoinName(coinList[e.target.value].symbol);
  };

  return (
    <div>
      <h1>Coin List</h1>
      {isLoading ? (
        <span>loading...</span>
      ) : (
        <div>
          <span>Select coin you want to buy </span>
          <select onChange={selectCoinPrice}>
            {coinList.map((coin, index) => (
              <option key={coin.id} value={index}>
                {coin.rank} :{coin.symbol} : ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
        </div>
      )}
      <form onSubmit={moneyToCoins}>
        <label htmlFor="myMoney">INPUT YOUR USD : </label>
        <input
          id="myMoney"
          type="number"
          placeholder="your money"
          onChange={onChangeMyMoney}
          value={myMoney}
        />
        <label htmlFor="myBTC">CHANGE YOUR {coinName} : </label>
        <input
          id="myBTC"
          type="number"
          placeholder="your BTC"
          value={myBTC}
          readOnly
        />
        <button type="submit">Convert</button>
      </form>
    </div>
  );
}

export default App;
