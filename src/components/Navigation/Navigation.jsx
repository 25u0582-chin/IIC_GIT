import styles from './Navigation.module.css';

export function Navigation() {
  const handleRegisterClick = () => {
    const element = document.getElementById('register');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>Festie2k26</div>
      <ul className={styles.links}>
        <li><a href="#overview">Overview</a></li>
        <li><a href="#schedule">Schedule</a></li>
        <li><a href="#themes">Themes</a></li>
        <li><a href="#faq">FAQ</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#about">About</a></li>
      </ul>
      <button className={styles.cta} onClick={handleRegisterClick}>
        Register Now
      </button>
    </nav>
  );
}
