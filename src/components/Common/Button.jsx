import styles from './Button.module.css';

export function Button({ children, variant = 'primary', onClick, className = '', ...props }) {
  const buttonClass = variant === 'primary' ? styles.btn_primary : styles.btn_secondary;
  return (
    <button className={`${buttonClass} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({ children, variant = 'primary', href = '#', className = '', ...props }) {
  const buttonClass = variant === 'primary' ? styles.btn_primary : styles.btn_secondary;
  return (
    <a href={href} className={`${buttonClass} ${className}`} {...props}>
      {children}
    </a>
  );
}
