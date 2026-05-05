import styles from './Overview.module.css';
import { SectionLabel, SectionContainer, SectionTitle } from '../Common/Section';

export function Overview() {
  const cards = [
    {
      icon: '💻',
      title: 'Technical Events',
      text: 'Hackathons, coding contests, robotics, paper presentations, and tech quizzes that challenge your intellect.',
    },
    {
      icon: '🎭',
      title: 'Cultural Events',
      text: 'Dance battles, musical nights, drama, fine arts, fashion shows, and open mics that celebrate talent.',
    },
    {
      icon: '🏆',
      title: 'Sports Arena',
      text: 'Cricket, football, basketball, chess, esports and more competitive sporting events with grand prizes.',
    },
    {
      icon: '🌟',
      title: 'Pro Nights',
      text: 'Star performer nights, DJ sets, celebrity appearances and an unforgettable closing ceremony.',
    },
  ];

  return (
    <section id="overview" className={styles.section}>
      <SectionContainer>
        <SectionLabel>Event Overview</SectionLabel>
        <SectionTitle>
          What is<br />
          Festie2k26?
        </SectionTitle>

        <div className={styles.grid}>
          {/* Featured Card */}
          <div className={`${styles.card} ${styles.featured} reveal`}>
            <div className={styles.featuredLeft}>
              <div className={styles.featuredBig}>Three Days. One Legend.</div>
              <p className={styles.text} style={{ maxWidth: '500px' }}>
                Festie2k26 is the annual inter-college extravaganza that brings together the brightest minds,
                the boldest creators, and the most electric performers from across the region. Featuring
                technical competitions, cultural showcases, hackathons, sports, and star-studded nights —
                this is where legends are made.
              </p>
            </div>
            <div className={styles.featuredRight}>
              <div className={styles.locationIcon}>🎯</div>
              <div className={styles.locationLabel}>Main Campus</div>
              <div className={styles.locationDate}>March 14–16, 2026</div>
            </div>
          </div>

          {/* Regular Cards */}
          {cards.map((card, index) => (
            <div key={index} className={`${styles.card} reveal reveal-delay-${index + 1}`}>
              <div className={styles.icon}>{card.icon}</div>
              <div className={styles.title}>{card.title}</div>
              <div className={styles.text}>{card.text}</div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
