'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { fetchCurrencies, convert } from '../services/frankfurter';
import styles from './Converter.module.css';

export default function CurrencyConverter() {
  const [currencies, setCurrencies] = useState<{[key: string]: string}>({});
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>('EUR');
  const [toCurrency, setToCurrency] = useState<string>('USD');
  
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      const list = await fetchCurrencies();
      setCurrencies(list);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setConvertedAmount(0);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      
      const result = await convert(amount, fromCurrency, toCurrency);
      
      setConvertedAmount(result);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);

  }, [amount, fromCurrency, toCurrency]); 

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const valueStr = e.target.value;

    if (valueStr === '') {
      setAmount(0); 
      return;
    }

    const value = parseFloat(valueStr);

    if (value < 0) return;

    setAmount(value);
  };

  // FEAT 
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Currency Exchange Dashboard</h2>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Amount</label>
        <input 
          type="number" 
          value={amount === 0 ? '' : amount}
          onChange={handleAmountChange}
          className={styles.inputField}
          min="0"
          placeholder="0.00"
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>From Currency</label>
        <select 
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className={styles.selectField}
        >
          {Object.keys(currencies).map((code) => (
            <option key={code} value={code}>
              {code} - {currencies[code]}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.swapContainer}>
        <button 
          onClick={handleSwap} 
          className={styles.swapButton}
        >
          ⇅
        </button>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>To Currency</label>
        <select 
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className={styles.selectField}
        >
          {Object.keys(currencies).map((code) => (
            <option key={code} value={code}>
              {code} - {currencies[code]}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.resultBox}>        
        {isLoading ? (
            <p className={styles.loadingText}>Loading...</p>
        ) : (
            <p className={styles.resultText}>
            {amount || 0} {fromCurrency} = {(convertedAmount || 0).toFixed(2)} {toCurrency}
            </p>
            )}        
      </div>
    </div>
  );
}