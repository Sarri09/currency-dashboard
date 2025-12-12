import CurrencyConverter from '../app/components/Converter';
import Rates from '../app/components/Rates';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.mainContainer}>
      <header className={styles.header}>
        <h1 className={styles.mainTitle}>ria Money Transfer</h1>
      </header>
      <CurrencyConverter />
      <Rates />
    </main>
  );
}