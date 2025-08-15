import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar/Navbar';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar isLandingPage={false} />
      <div className={styles.aboutContainer}>
        <div className={styles.content}>
          <p className={styles.projectInfo}>
            Download and Paint Like A Master is a project by{' '}
            <a 
              href="https://davidamberg.de/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.link}
            >
              David Amberg
            </a>.
          </p>

          <p className={styles.contact}>
            Contact: mail[at]downloadandpaint.info
          </p>

          <div className={styles.supportSection}>
            <p className={styles.supportText}>
              <strong>This project was supported by:</strong>
            </p>
            
            <div className={styles.logoContainer}>
              <img 
                src="/images/contentSections/BKM_Web_de.gif" 
                alt="BKM Support" 
                className={styles.logo}
              />
              <img 
                src="/images/contentSections/CDR_BKM_Neustart_Kultur_Wortmarke_pos_RGB_RZ.svg" 
                alt="Neustart Kultur" 
                className={styles.logo}
              />
              <img 
                src="/images/contentSections/dkb_logo_1,9 x 6,4cm_RGB_300dpi.png" 
                alt="DKB Support" 
                className={styles.logo}
              />
            </div>
          </div>

          <p className={styles.legal}>
            <a href="/legal.html" className={styles.link}>
              Legal notice
            </a>
          </p>
        </div>
      </div>
    </>
  );
}