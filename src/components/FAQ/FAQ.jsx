import { useState } from 'react';
import styles from './FAQ.module.css';
import { SectionLabel, SectionContainer, SectionTitle } from '../Common/Section';

const faqData = [
  {
    q: 'Who can participate in Festie 2K26?',
    a: 'All undergraduate, postgraduate, and diploma students from any recognized college or university are eligible to participate. Each college can send up to 50 delegates.',
  },
  {
    q: 'What is the registration fee?',
    a: 'The general pass is ₹499 per person and covers all 3 days. Event-specific passes (e.g., Hackathon) are ₹299 per team member. Team registrations of 4+ members get a 20% discount automatically applied.',
  },
  {
    q: 'Is accommodation available for outstation participants?',
    a: 'Yes! We provide free hostel accommodation for registered participants from outstation colleges (outside 50km radius). Please select this option during registration. Accommodation is on a first-come, first-served basis.',
  },
  {
    q: 'Can I register for multiple events?',
    a: 'Absolutely! You can register for multiple events as long as there are no schedule conflicts. The general pass covers all event entries. Individual event passes can be upgraded to the general pass at a nominal fee.',
  },
  {
    q: 'What are the prizes for winners?',
    a: 'Total prize pool is ₹5,00,000+. The Hackathon winner gets ₹1,00,000 and internship opportunities. Cultural events offer cash prizes from ₹10,000 to ₹50,000. Sports champions receive trophies, medals, and prize money. All winners receive certificates and special edition Festie merchandise.',
  },
  {
    q: 'Are there any rules for hackathon teams?',
    a: 'Hackathon teams can have 2–4 members. All members must be registered participants. Teams must use only the tools and APIs specified in the problem statement. Code must be written during the event; existing projects are not allowed. Final submissions must include a working prototype and a 5-minute pitch.',
  },
  {
    q: 'How do I reach the venue?',
    a: 'The main campus is located at KLS GIT BELGAVI, Belgaum. We will be running free shuttle buses from central locations on all 3 days from 8:00 AM onwards. Detailed directions and shuttle schedules will be emailed to all registered participants.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={styles.section}>
      <SectionContainer>
        <SectionLabel>Got Questions?</SectionLabel>
        <SectionTitle>
          Frequently Asked<br />
          Questions
        </SectionTitle>

        <div className={`${styles.list} reveal`}>
          {faqData.map((item, index) => (
            <div key={index} className={`${styles.item} ${openIndex === index ? styles.open : ''}`}>
              <div className={styles.question} onClick={() => toggleFaq(index)}>
                <span>{item.q}</span>
                <div className={styles.icon}>+</div>
              </div>
              <div className={`${styles.answer} ${openIndex === index ? styles.open : ''}`}>{item.a}</div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
