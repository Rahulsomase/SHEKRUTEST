
// Author - Rahul Somase

import React, { useState, useEffect } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = " "; // API key
  const apiUrl = `https://open.er-api.com/v6/latest`;

  useEffect(() => {
    // Fetch available currencies
    axios
      .get(`${apiUrl}/${fromCurrency}`)
      .then((response) => {
        setCurrencies(Object.keys(response.data.rates));
      })
      .catch(() => setError("Failed to load currencies"));
  }, [fromCurrency]);

  const handleConvert = () => {
    setError(null);
    axios
      .get(`${apiUrl}/${fromCurrency}`)
      .then((response) => {
        const rate = response.data.rates[toCurrency];
        if (rate) {
          setConvertedAmount((amount * rate).toFixed(2));
        } else {
          setError("Conversion rate not available");
        }
      })
      .catch(() => setError("Failed to fetch conversion rate"));
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ width: "150px", marginRight: "10px" }}
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <span style={{ margin: "0 10px" }}>to</span>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleConvert} style={{ padding: "10px 20px" }}>
        Convert
      </button>
      {convertedAmount && (
        <p style={{ marginTop: "20px" ,  color: 'blue', }}>
          {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </p>
      )}
    </div>
  );
};

export default CurrencyConverter;
