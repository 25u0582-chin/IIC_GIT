import { useState, useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import { ButtonLink } from '../Common/Button';

export function Hero() {
  const [stats, setStats] = useState({
    participants: 0,
    events: 0,
    days: 0,
    colleges: 0,
  });

  const orbRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // Parallax effect on scroll
    const handleScroll = () => {
      const y = window.scrollY;
      const orb1 = document.querySelector(`.${styles.orb1}`);
      const orb2 = document.querySelector(`.${styles.orb2}`);

      if (orb1) orb1.style.transform = `translateY(${y * 0.15}px)`;
      if (orb2) orb2.style.transform = `translateY(${-y * 0.1}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (orbRef.current) {
      observer.observe(orbRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const targets = { participants: 500, events: 40, days: 3, colleges: 50 };
    const duration = 2000;
    const step = 16;

    Object.entries(targets).forEach(([key, target]) => {
      let start = 0;
      const inc = target / (duration / step);

      const timer = setInterval(() => {
        start += inc;
        if (start >= target) {
          setStats((prev) => ({ ...prev, [key]: target }));
          clearInterval(timer);
        } else {
          setStats((prev) => ({ ...prev, [key]: Math.floor(start) }));
        }
      }, step);
    });
  };

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.orbs}>
        <div className={`${styles.orb} ${styles.orb1}`}></div>
        <div className={`${styles.orb} ${styles.orb2}`}></div>
        <div className={`${styles.orb} ${styles.orb3}`}></div>
      </div>

      <div className={styles.badge}>
        <span className={styles.badgeDot}></span>
        The Ultimate College Fest is Back
      </div>

      <h1 className={styles.title}>
        <span className={styles.line1}>FESTIE</span>
        <span className={styles.line2}>2K26</span>
      </h1>

      <p className={styles.subtitle}>
        March 14–16, 2026 · Main Campus Grounds
      </p>

      <div className={styles.actions}>
        <ButtonLink href="#register" variant="primary">
          ⚡ Register Now
        </ButtonLink>
        <ButtonLink href="#themes" variant="secondary">
          Explore Themes
        </ButtonLink>
      </div>

      <div ref={orbRef} className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statNum}>{stats.participants}+</div>
          <div className={styles.statLabel}>Participants</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNum}>{stats.events}+</div>
          <div className={styles.statLabel}>Events</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNum}>{stats.days}+</div>
          <div className={styles.statLabel}>Days</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNum}>{stats.colleges}+</div>
          <div className={styles.statLabel}>Colleges</div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span>Scroll</span>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  );
}
