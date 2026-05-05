import styles from './Card.module.css';

export function Card({ icon, title, children, className = '' }) {
  return (
    <div className={`${styles.card} ${className}`}>
      {icon && <div className={styles.icon}>{icon}</div>}
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.text}>{children}</div>
    </div>
  );
}
