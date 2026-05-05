import styles from './Themes.module.css';
import { SectionLabel, SectionContainer, SectionTitle } from '../Common/Section';

const themes = [
  {
    num: '01 / 06',
    icon: '🤖',
    name: 'AI & Machine Learning',
    desc: 'Build intelligent systems that solve real-world problems using data, algorithms, and neural networks.',
    accentColor: '#00f5ff',
    themeColor: '#00f5ff',
    problems: [
      'Predictive healthcare diagnostics',
      'AI-powered campus management',
      'Natural language processing tools',
    ],
  },
  {
    num: '02 / 06',
    icon: '🌱',
    name: 'Sustainability Tech',
    desc: 'Innovate for a greener future — energy, waste, water and climate change solutions.',
    accentColor: '#ff006e',
    themeColor: '#ff006e',
    problems: ['Smart waste segregation system', 'Renewable energy monitoring', 'Carbon footprint tracker app'],
  },
  {
    num: '03 / 06',
    icon: '🏙️',
    name: 'Smart Cities',
    desc: 'Design the urban landscape of tomorrow with IoT, data analytics and connected infrastructure.',
    accentColor: '#adff2f',
    themeColor: '#adff2f',
    problems: [
      'Intelligent traffic management',
      'Public safety monitoring',
      'Smart waste & utilities grid',
    ],
  },
  {
    num: '04 / 06',
    icon: '🔐',
    name: 'Cybersecurity',
    desc: 'Hack the hackers. Build tools that protect data, privacy, and critical digital infrastructure.',
    accentColor: '#ffd700',
    themeColor: '#ffd700',
    problems: [
      'Phishing detection system',
      'Zero-trust network architecture',
      'Encrypted data storage solution',
    ],
  },
  {
    num: '05 / 06',
    icon: '🎓',
    name: 'EdTech',
    desc: 'Reimagine learning through gamification, AR/VR, and personalized education platforms.',
    accentColor: '#a855f7',
    themeColor: '#c084fc',
    problems: ['Adaptive learning system', 'Rural classroom connectivity', 'Immersive AR study tools'],
  },
  {
    num: '06 / 06',
    icon: '💊',
    name: 'HealthTech',
    desc: 'Bridge the gap between technology and healthcare with innovations that save lives.',
    accentColor: '#f97316',
    themeColor: '#fb923c',
    problems: [
      'Remote patient monitoring',
      'Mental health support platform',
      'Telemedicine for rural areas',
    ],
  },
];

export function Themes() {
  return (
    <section id="themes" className={styles.section}>
      <SectionContainer>
        <SectionLabel>Hackathon</SectionLabel>
        <SectionTitle>
          Themes & Problem<br />
          Statements
        </SectionTitle>

        <div className={styles.grid}>
          {themes.map((theme, index) => (
            <div
              key={index}
              className={`${styles.card} reveal reveal-delay-${(index % 3) + 1}`}
              style={{
                '--accent-color': theme.accentColor,
                '--theme-color': theme.themeColor,
              }}
            >
              <div className={styles.num}>{theme.num}</div>
              <div className={styles.icon}>{theme.icon}</div>
              <div className={styles.name}>{theme.name}</div>
              <div className={styles.desc}>{theme.desc}</div>
              <div className={styles.problems}>
                {theme.problems.map((problem, idx) => (
                  <div key={idx} className={styles.problem}>
                    {problem}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
