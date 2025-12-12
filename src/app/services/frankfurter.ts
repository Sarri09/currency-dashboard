// ============= TYPES =============
export interface CurrencyList {
  [code: string]: string; 
}

export interface ExchangeRateResponse {
  amount: number;
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
}
// ============= TYPES =============

const API_HOST = 'https://api.frankfurter.dev/v1';

export async function fetchCurrencies(): Promise<CurrencyList> {
  try {
    const response = await fetch(`${API_HOST}/currencies`);

    if (!response.ok) {
      throw new Error(`Error fetching currencies: ${response.status}`);
    }

    const data: CurrencyList = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {}; 
  }
}

// Documentation https://frankfurter.dev:
// Currency Conversion
// Perform currency conversion by fetching the exchange rate and calculating in your code.
export async function convert(amount:number, from:string, to:string): Promise<number | null> {
  if (from === to) {
    return amount;
  }

  try {
    const url = `${API_HOST}/latest?base=${from}&symbols=${to}`; 
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Error fetching exchange rate');
    }

    const data: ExchangeRateResponse = await response.json(); 
    const rate = data.rates[to];  
    const result = amount * rate;
    
    return result;

  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchExchangeRates(baseCurrency:string): Promise<ExchangeRateResponse | null> {
  try {
    const url = `${API_HOST}/latest?base=${baseCurrency}`;
    const response = await fetch(url);
    
    if (!response.ok) throw new Error('Error fetching rates');

    const data: ExchangeRateResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}