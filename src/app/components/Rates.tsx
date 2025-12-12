'use client';

import { useState, useEffect } from 'react';
import { fetchCurrencies, fetchExchangeRates } from '../services/frankfurter';
import styles from './Rates.module.css';

const MAJOR_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'NZD', 'BRL'];

export default function Rates() {
  const [base, setBase] = useState('USD');
  const [rates, setRates] = useState<{[key: string]: number}>({});
  const [allCurrencies, setAllCurrencies] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCurrencies() {
      const list = await fetchCurrencies();
      setAllCurrencies(list);
    }
    loadCurrencies();
  }, []);

  useEffect(() => {
    async function loadRates() {
      setLoading(true);
      const data = await fetchExchangeRates(base);
      if (data) {
        setRates(data.rates);
      }
      setLoading(false);
    }
    loadRates();
  }, [base]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Exchange Rates</h3>
        
        <div>
          <span className={styles.labelBase}>Base Currency:</span>
          <select 
            value={base} 
            onChange={(e) => setBase(e.target.value)}
            className={styles.select}
          >
            {Object.keys(allCurrencies).map((code) => (
              <option key={code} value={code}>{code}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}>
            <p>Loading...</p>
        </div>
      ) : (
        <div className={styles.grid}>
            {MAJOR_CURRENCIES
              .filter(code => code !== base) 
              .map((code) => {
                const rate = rates[code];
                if (!rate) return null; 

                return (
                  <div key={code} className={styles.rateCard}>
                    <span className={styles.currencyCode}>{code}</span>
                    <span className={styles.rateValue}>{rate.toFixed(4)}</span>
                  </div>
                );
            })}
        </div>
      )}
    </div>
  );
}