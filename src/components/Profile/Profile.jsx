import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';

export function Profile() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const registrationId = searchParams.get('id');

  const [registration, setRegistration] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!registrationId) {
      setError('No registration ID provided.');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/registration/${registrationId}/qrcode`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Failed to load registration.');
        }

        setRegistration(result.registration);
        setQrCode(result.qrCode);
      } catch (err) {
        setError(err.message || 'Failed to load your pass.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [registrationId]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading your pass...</div>
      </div>
    );
  }

  if (error || !registration) {
    return (
      <div className={styles.container}>
        <button className={styles.backButton} onClick={() => navigate('/')}>
          ← Back to Home
        </button>
        <div className={styles.error}>{error || 'Unable to display your pass.'}</div>
      </div>
    );
  }

  const handleDownloadPass = () => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `festie2k26-pass-${registration.id}.png`;
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate('/')}>
        ← Back to Home
      </button>

      <h1 className={styles.title}>Your Event Pass</h1>

      <div className={styles.passCard}>
        <div className={styles.header}>
          <div className={styles.info}>
            <div className={styles.name}>
              {registration.firstName} {registration.lastName}
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Email:</span>
              <span>{registration.email}</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>College:</span>
              <span>{registration.college}</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Year:</span>
              <span>{registration.year}</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Phone:</span>
              <span>{registration.phone}</span>
            </div>
            <div className={styles.eventBadge}>
              {registration.category}
            </div>
          </div>

          <div className={styles.qrSection}>
            {qrCode && (
              <div className={styles.qrCode}>
                <img src={qrCode} alt="Event Pass QR Code" />
              </div>
            )}
            <div className={styles.qrLabel}>Event Pass</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '8px' }}>
              Scan at check-in
            </div>
          </div>
        </div>

        <div className={styles.registrationId}>
          Registration ID: {registration.id}
        </div>
      </div>

      <div className={styles.footer}>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleDownloadPass}>
          📥 Download Pass
        </button>
        <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={handlePrint}>
          🖨️ Print Pass
        </button>
      </div>
    </div>
  );
}
