import styles from './Contact.module.css';
import { SectionLabel, SectionContainer, SectionTitle } from '../Common/Section';

const contactCards = [
  {
    icon: '📧',
    label: 'Email',
    value: <a href="mailto:hello@festie2k26.in">hello@festie2k26.in</a>,
  },
  {
    icon: '📞',
    label: 'Helpline 1',
    value: <a href="tel:+919036994874">+91 9036994874</a>,
  },
  {
    icon: '📞',
    label: 'Helpline 2',
    value: <a href="tel:+917499979083">+91 7499979083</a>,
  },
  {
    icon: '📍',
    label: 'Venue',
    value: <>KLS GIT BELGAVI,<br />Karnataka — 560066</>,
  },
  {
    icon: '🌐',
    label: 'Social Media',
    value: '@festie2k26 on all platforms',
  },
  {
    icon: '💬',
    label: 'WhatsApp Group',
    value: <a href="#">Join Participant Group →</a>,
  },
  {
    icon: '🕘',
    label: 'Support Hours',
    value: 'Mon–Sat, 9 AM – 7 PM',
  },
];

export function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <SectionContainer>
        <SectionLabel>Get In Touch</SectionLabel>
        <SectionTitle>Contact Us</SectionTitle>

        <div className={styles.grid}>
          {contactCards.map((card, index) => (
            <div key={index} className={`${styles.card} reveal reveal-delay-${(index % 3) + 1}`}>
              <div className={styles.icon}>{card.icon}</div>
              <div className={styles.label}>{card.label}</div>
              <div className={styles.value}>{card.value}</div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
