import { useState } from 'react';
import styles from './Schedule.module.css';
import { SectionLabel, SectionContainer, SectionTitle } from '../Common/Section';

const scheduleData = {
  day1: [
    { time: '09:00 AM', name: 'Inauguration Ceremony', desc: 'Grand opening with dignitaries, torch lighting, and the official unveiling of Festie 2K26.', tag: 'All Events', tagType: 'cultural' },
    { time: '11:00 AM', name: 'Hackathon Kickoff', desc: '24-hour hackathon begins. Teams tackle real-world problem statements with cutting-edge solutions.', tag: 'Technical', tagType: 'tech' },
    { time: '02:00 PM', name: 'Sports Day Opening', desc: 'Cricket, Football & Basketball tournaments begin. Group stage matches across all arenas.', tag: 'Sports', tagType: 'sports' },
    { time: '07:00 PM', name: 'Cultural Night — Dance Battle', desc: 'Inter-college dance battle. Solo, duet and group categories. Electrifying performances on the main stage.', tag: 'Cultural', tagType: 'cultural' },
  ],
  day2: [
    { time: '09:00 AM', name: 'Hackathon Midpoint', desc: 'Mentorship sessions, mid-review presentations. Guest experts guide participant teams.', tag: 'Technical', tagType: 'tech' },
    { time: '10:00 AM', name: 'Paper Presentation & Tech Quiz', desc: 'Present your research papers and compete in the inter-college tech quiz championship.', tag: 'Technical', tagType: 'tech' },
    { time: '03:00 PM', name: 'Drama & Fine Arts', desc: 'Theatrical performances, stand-up comedy, short films, and live art installations.', tag: 'Cultural', tagType: 'cultural' },
    { time: '08:00 PM', name: 'Pro Night — Musical Concert', desc: 'Star performer live concert. Crowd-favourite bands and DJs take over the main stage.', tag: 'Cultural', tagType: 'cultural' },
  ],
  day3: [
    { time: '09:00 AM', name: 'Hackathon Final Presentations', desc: 'Top teams pitch their solutions to a jury of industry leaders. Live judging and Q&A rounds.', tag: 'Technical', tagType: 'tech' },
    { time: '11:00 AM', name: 'Sports Finals', desc: 'Championship finals across Cricket, Football, Basketball, Chess & Esports. Win trophies and prizes.', tag: 'Sports', tagType: 'sports' },
    { time: '04:00 PM', name: 'Fashion Show & Mr/Ms Festie', desc: 'The grandest fashion showcase of the year. Crowning of Mr. and Ms. Festie 2K26.', tag: 'Cultural', tagType: 'cultural' },
    { time: '07:00 PM', name: 'Grand Closing & Prize Distribution', desc: 'Award ceremony, overall championship trophy, and a spectacular closing performance to end Festie 2K26.', tag: 'Closing', tagType: 'cultural' },
  ],
};

export function Schedule() {
  const [activeDay, setActiveDay] = useState('day1');

  const getTagStyle = (tagType) => {
    switch (tagType) {
      case 'tech':
        return styles.tagTech;
      case 'sports':
        return styles.tagSports;
      case 'cultural':
        return styles.tagCultural;
      default:
        return styles.tagTech;
    }
  };

  return (
    <section id="schedule" className={styles.section}>
      <SectionContainer>
        <SectionLabel>3-Day Program</SectionLabel>
        <SectionTitle>Event Schedule</SectionTitle>

        <div className={styles.tabs}>
          {['day1', 'day2', 'day3'].map((day, index) => (
            <button
              key={day}
              className={`${styles.tabBtn} ${activeDay === day ? styles.active : ''}`}
              onClick={() => setActiveDay(day)}
            >
              Day {index + 1} — Mar {14 + index}
            </button>
          ))}
        </div>

        <div className={styles.content + (activeDay === 'day1' ? ' ' + styles.active : '')}>
          <TimelineContent items={scheduleData.day1} getTagStyle={getTagStyle} />
        </div>

        <div className={styles.content + (activeDay === 'day2' ? ' ' + styles.active : '')}>
          <TimelineContent items={scheduleData.day2} getTagStyle={getTagStyle} />
        </div>

        <div className={styles.content + (activeDay === 'day3' ? ' ' + styles.active : '')}>
          <TimelineContent items={scheduleData.day3} getTagStyle={getTagStyle} />
        </div>
      </SectionContainer>
    </section>
  );
}

function TimelineContent({ items, getTagStyle }) {
  return (
    <div className={styles.timeline}>
      {items.map((item, index) => (
        <div key={index} className={styles.timelineItem}>
          <div className={styles.time}>{item.time}</div>
          <div className={styles.line}></div>
          <div className={styles.itemContent}>
            <div className={styles.name}>{item.name}</div>
            <div className={styles.desc}>{item.desc}</div>
            <div className={`${styles.tag} ${getTagStyle(item.tagType)}`}>{item.tag}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
