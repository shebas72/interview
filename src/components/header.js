import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>My Store</h1>
      <p>Your favorite place for quality products</p>
    </header>
  );
}
