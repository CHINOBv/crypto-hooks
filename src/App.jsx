import React, { useState, useEffect } from 'react'
import img from './cryptomonedas.png';
import axios from 'axios';
import Form from './components/Form.jsx';
import Spin from './components/Spin.jsx';

const App = () => {

  const [Crypto, setCrypto] = useState("");
  const [Currency, setCurrency] = useState("");
  const [Loading, setLoading] = useState(false);
  
  const consultQuoteCryptoAPI = async() => {
    if(Currency.trim() === "" || Currency.trim() === "") return;
    let url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${Crypto}&tsyms=${Currency}`;

    const res = await axios(url)
    console.log(res);
    setLoading(true);
  }

  useEffect( () => {
    consultQuoteCryptoAPI().then(() => setLoading(false))
  }, [Crypto, Currency]);

  return (
    <div className="container">
      <div className="row">
      <div className="one-half column">
        <img src={img} alt="img" className="logotipo"/>
      </div>
      <div className="one-half column">
        <h1>Cotiza Tu Criptomoneda</h1>
        <Form
          setCrypto={setCrypto}
          setCurrency={setCurrency}
        />
        {Loading ? <Spin/> : null}
      </div>
      </div>
    </div>
  )
}

export default App
