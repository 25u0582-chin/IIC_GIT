import styles from './About.module.css';
import { SectionLabel, SectionContainer, SectionTitle } from '../Common/Section';

const highlights = [
  'Organized entirely by students, for students',
  'Backed by industry sponsors and tech giants',
  'ISO-certified event management standards',
  'Featured in Times of India & Deccan Herald',
  'AICTE recognized inter-collegiate festival',
  'Zero tolerance for discrimination & harassment',
];

export function About() {
  return (
    <section id="about" className={styles.section}>
      <SectionContainer>
        <SectionLabel>Our Story</SectionLabel>
        <SectionTitle>About the Fest</SectionTitle>

        <div className={styles.inner}>
          <div className={`${styles.img} reveal`}>
            <div className={styles.estLabel}>Est.</div>
            <div className={styles.year}>2K26</div>
            <div className={styles.yearLabel}>The New Era</div>
          </div>

          <div className={`${styles.text} reveal reveal-delay-2`}>
            <p>
              Festie 2K26 is organized by the Student Council of KLS GIT Belgavi — a student-run
              extravaganza that's been growing stronger every year. What started as a small intra-college
              event has evolved into one of South India's most anticipated inter-college festivals.
            </p>
            <p>
              We believe that college life is about more than academics. It's about discovering your passion,
              building friendships, pushing your limits, and creating memories that last a lifetime. Festie 2K26
              is that stage for you.
            </p>
            <ul className={styles.list}>
              {highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
