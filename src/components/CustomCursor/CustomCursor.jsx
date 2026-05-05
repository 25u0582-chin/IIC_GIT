import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const positionRef = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      positionRef.current.mx = e.clientX;
      positionRef.current.my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = positionRef.current.mx - 6 + 'px';
        cursorRef.current.style.top = positionRef.current.my - 6 + 'px';
      }
    };

    const animateRing = () => {
      const pos = positionRef.current;
      pos.rx += (pos.mx - pos.rx) * 0.15;
      pos.ry += (pos.my - pos.ry) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.left = pos.rx - 18 + 'px';
        ringRef.current.style.top = pos.ry - 18 + 'px';
      }
      requestAnimationFrame(animateRing);
    };

    document.addEventListener('mousemove', handleMouseMove);
    const animationFrame = requestAnimationFrame(animateRing);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, .faq-q, .tab-btn, .overview-card, .theme-card'
    );

    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.transform = 'scale(2)';
      if (ringRef.current) ringRef.current.style.opacity = '0.9';
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.transform = 'scale(1)';
      if (ringRef.current) ringRef.current.style.opacity = '0.5';
    };

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className={styles.cursor}></div>
      <div ref={ringRef} className={styles.cursor_ring}></div>
    </>
  );
}
