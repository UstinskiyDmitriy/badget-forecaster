
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Budget</h1>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link to="/">Обзор</Link>
          </li>
          <li>
            <Link to="/history">История</Link>
          </li>
          <li>
            <Link to="/goals">Цели</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
