import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Registration.module.css';
import { SectionLabel, SectionContainer, SectionTitle } from '../Common/Section';

const eventOptions = [
  'Technical — Hackathon',
  'Technical — Coding Contest',
  'Technical — Paper Presentation',
  'Cultural — Dance',
  'Cultural — Music',
  'Cultural — Drama & Arts',
  'Cultural — Fashion Show',
  'Sports — Cricket',
  'Sports — Football',
  'Sports — Basketball',
  'Sports — Esports',
  'General Pass (All Events)',
];

const perks = [
  { icon: '🎫', text: 'Entry pass to all 3 days of events' },
  { icon: '🍕', text: 'Complimentary meals & refreshments' },
  { icon: '🏅', text: 'Participation certificate for all attendees' },
  { icon: '💰', text: 'Cash prizes worth ₹5,00,000+' },
  { icon: '🤝', text: 'Networking with 50+ college delegations' },
  { icon: '🎁', text: 'Exclusive Festie 2K26 merchandise kit' },
];

export function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    category: '',
    team: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Required field';
    if (!formData.lastName.trim()) newErrors.lastName = 'Required field';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!/^[0-9+\s\-]{8,}$/.test(formData.phone)) newErrors.phone = 'Enter a valid number';
    if (!formData.college.trim()) newErrors.college = 'Required field';
    if (!formData.year) newErrors.year = 'Select your year';
    if (!formData.category) newErrors.category = 'Select an event';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    setErrors(newErrors);
    setServerError('');

    if (Object.keys(newErrors).length !== 0) {
      return;
    }

    const submitRegistration = async () => {
      setIsSubmitting(true);

      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Registration could not be completed.');
        }

        setConfirmation(result.message);
        setSubmitted(true);

        setTimeout(() => {
          navigate(`/profile?id=${result.registrationId}`);
        }, 2000);
      } catch (error) {
        setServerError(error.message || 'Registration could not be completed.');
      } finally {
        setIsSubmitting(false);
      }
    };

    submitRegistration();
  };

  return (
    <section id="register" className={styles.section}>
      <SectionContainer>
        <SectionLabel>Join The Fest</SectionLabel>
        <SectionTitle>Register Now</SectionTitle>

        <div className={styles.wrap}>
          <div className={`${styles.info} reveal`}>
            <h3>Secure your spot at the biggest fest of the year</h3>
            <p>
              Registration is open for all college students. Choose your events, assemble your team, and get
              ready to compete, create, and celebrate at Festie 2K26.
            </p>
            <ul className={styles.perks}>
              {perks.map((perk, index) => (
                <li key={index} className={styles.perk}>
                  <div className={styles.perkIcon}>{perk.icon}</div>
                  <div>{perk.text}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${styles.form} reveal reveal-delay-2`}>
            {!submitted ? (
              <>
                <div className={styles.formTitle}>Participant Registration</div>
                <form onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="Arjun"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      {errors.firstName && <div className={styles.error}>{errors.firstName}</div>}
                    </div>
                    <div className={styles.formGroup}>
                      <label>Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Sharma"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                      {errors.lastName && <div className={styles.error}>{errors.lastName}</div>}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="arjun@college.edu"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className={styles.error}>{errors.email}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && <div className={styles.error}>{errors.phone}</div>}
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>College Name *</label>
                      <input
                        type="text"
                        name="college"
                        placeholder="Your College"
                        value={formData.college}
                        onChange={handleChange}
                      />
                      {errors.college && <div className={styles.error}>{errors.college}</div>}
                    </div>
                    <div className={styles.formGroup}>
                      <label>Year of Study *</label>
                      <select name="year" value={formData.year} onChange={handleChange}>
                        <option value="">Select Year</option>
                        <option>1st Year</option>
                        <option>2nd Year</option>
                        <option>3rd Year</option>
                        <option>4th Year</option>
                        <option>PG / MBA</option>
                      </select>
                      {errors.year && <div className={styles.error}>{errors.year}</div>}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Event Category *</label>
                    <select name="category" value={formData.category} onChange={handleChange}>
                      <option value="">Choose your event type</option>
                      {eventOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.category && <div className={styles.error}>{errors.category}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label>Team Name (if applicable)</label>
                    <input
                      type="text"
                      name="team"
                      placeholder="Team name or solo"
                      value={formData.team}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Anything to tell us?</label>
                    <textarea
                      name="notes"
                      placeholder="Dietary requirements, special needs, or a fun fact about yourself..."
                      value={formData.notes}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  {serverError && <div className={styles.serverError}>{serverError}</div>}

                  <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : '⚡ Complete Registration'}
                  </button>
                </form>
              </>
            ) : (
              <div className={`${styles.successMsg} ${styles.show}`}>
                <div className={styles.successIcon}>🎉</div>
                <h3>You're In!</h3>
                <p>{confirmation || `Congratulations! Your registration is confirmed and a congratulations email has been sent to ${formData.email}.`}</p>
                <p className={styles.successEmail}>Registered email: {formData.email}</p>
              </div>
            )}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
