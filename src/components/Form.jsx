import React, { useEffect, useState } from "react";
import ErrorC from './ErrorC.jsx';

import axios from "axios";

const Form = ({setCrypto, setCurrency}) => {
  const [Cryptos, setCryptos] = useState([]);
  const [CurrencyF, setCurrencyF] = useState("");
  const [CryptoF, setCryptoF] = useState("");
  const [Error, setError] = useState(false);

  const consultAPI = async () => {
    let url = `https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=10&tsym=USD`;

    const res = await axios(url);
    // console.log(res.data.Data);
    setCryptos(res.data.Data);
  };

  useEffect(() => {
    consultAPI();
  }, []);

  const quoteCrypto = e => {
    e.preventDefault();
    if(CurrencyF.trim() === "" || CryptoF.trim() === ""){
      setError(true);
      return;
    }
    setError(false);
    setCurrency(CurrencyF);
    setCrypto(CryptoF);
  }

  return (
    <form
      onSubmit={quoteCrypto}
    >
      <div className="row">
        <label htmlFor="currency">Elige tu Moneda</label>
        {Error ? <ErrorC MSG="Ambos campos son obligatorios"/> : null}
        <select
          name="currency"
          id="currency"
          className="u-full-width"
          onChange={(e) => setCurrencyF(e.target.value)}
        >
          <option value="">--Elige tu Moneda--</option>
          <option value="USD">Dolar Estado Unidense</option>
          <option value="MXN">Peso Mexico</option>
          <option value="GBP">Libras</option>
          <option value="EUR">Euro</option>
        </select>
      </div>
      <div className="row">
        <label htmlFor="crypto">Elige tu Criptomoneda</label>
        <select
          name="crypto"
          id="crypto"
          className="u-full-width"
          onChange={(e) => setCryptoF(e.target.value)}
        >
          <option value="">--Elige tu Criptomoneda--</option>
          {Cryptos.map((CryptoF) => (
            <option key={CryptoF.CoinInfo.Id} value={CryptoF.CoinInfo.Internal}>
              {CryptoF.CoinInfo.FullName}
            </option>
          ))}
        </select>
      </div>
      <input 
        type="submit" 
        value="Cotizar valor" 
        className="button-primary u-full-width"
      />
    </form>
  );
};

export default Form;
