import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>Festie2k26</div>
      <ul className={styles.links}>
        <li>
          <a href="#overview">Overview</a>
        </li>
        <li>
          <a href="#schedule">Schedule</a>
        </li>
        <li>
          <a href="#themes">Themes</a>
        </li>
        <li>
          <a href="#register">Register</a>
        </li>
      </ul>
      <div className={styles.copy}>© 2026 Festie2k26. Made with ⚡ by Students.</div>
    </footer>
  );
}
