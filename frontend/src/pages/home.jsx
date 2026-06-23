import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { FaPlay, FaRegCircle, FaStar, FaApple, FaGooglePlay } from "react-icons/fa";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      
      {/* Hero Section */}
      <section className={`container ${styles.heroSection}`}>
        <h2 className={styles.heroPreTitle}>Inner Peace</h2>
        <div className={styles.heroTitleContainer}>
          <div className={`${styles.decorationCircle} ${styles.circleYellow}`}></div>
          <h1 className={styles.heroTitle}>SARVUDAY</h1>
          <div className={`${styles.decorationPill} ${styles.pillPink}`}></div>
        </div>
        <p className={styles.heroSubtitle}>
          Experience the sophisticated evolution of mental clarity. Our playful, sticker-like interface 
          reduces clinical friction, making professional mental health support approachable and vibrant.
        </p>
        <div className={styles.heroButtons}>
          <Link to="/chat">
            <button className="btn-primary">Start Journey</button>
          </Link>
          <Link to="/assessments">
            <button className="btn-secondary">View Programs</button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className={`container ${styles.featuresSection}`}>
        <h3 className={styles.sectionHeading}>Meditations for any mind, any mood, any goal.</h3>
        <div className={styles.featureGrid}>
          <div className={`sticker-container ${styles.featureCard}`}>
            <div className={styles.iconWrapperPrimary}>
              <span>🎧</span>
            </div>
            <h4>Guided meditations</h4>
            <p>Step-by-step audio sessions led by world-class experts across 50+ focus areas including focus, stress, and anxiety.</p>
          </div>
          <div className={`sticker-container ${styles.featureCard}`}>
            <div className={styles.iconWrapperSecondary}>
              <span>⏱️</span>
            </div>
            <h4>Timed meditations</h4>
            <p>For when you only have a moment. From 1-minute deep breaths to 60-minute sleep immersion sessions.</p>
          </div>
          <div className={`sticker-container ${styles.featureCard}`}>
            <div className={styles.iconWrapperPink}>
              <span>🌸</span>
            </div>
            <h4>Practice mindfulness</h4>
            <p>Incorporate mindful movements into your daily routine with exercises designed for walking, eating, and working.</p>
          </div>
          <div className={`sticker-container ${styles.featureCard}`}>
            <div className={styles.iconWrapperPrimary}>
              <span>🔬</span>
            </div>
            <h4>Evidence-based benefits</h4>
            <p>Backed by clinical research to help reduce cortisol levels by 20% and improve sleep quality significantly within two weeks.</p>
          </div>
        </div>
      </section>



      {/* Testimonials Section */}
      <section className={`container ${styles.testimonialsSection}`}>
        <h3 className={styles.testimonialsHeading}>Sarvuday stories</h3>
        <div className={styles.avatarGroup}>
          <div className={styles.avatar}>👩</div>
          <div className={styles.avatar}>👨</div>
          <div className={styles.avatar}>🧑‍🦱</div>
          <div className={styles.avatarCount}>+10k</div>
        </div>
        
        <div className={styles.testimonialGrid}>
          <div className={`sticker-container ${styles.testimonialCard}`}>
            <div className={styles.stars}>
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <p className={styles.quote}>"This app changed how I start my mornings. The visual style actually makes me happy to open it every day."</p>
            <p className={styles.author}>— Sarah J., Designer</p>
          </div>
          <div className={`sticker-container ${styles.testimonialCard}`}>
            <div className={styles.stars}>
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <p className={styles.quote}>"Simple, effective, and beautiful. The guided sessions for anxiety helped me get through a very tough project."</p>
            <p className={styles.author}>— Mark L., Developer</p>
          </div>
          <div className={`sticker-container ${styles.testimonialCard}`}>
            <div className={styles.stars}>
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <p className={styles.quote}>"I love the stickers and the hard shadows. It feels like a physical journal but with high-tech benefits."</p>
            <p className={styles.author}>— Elena R., Artist</p>
          </div>
        </div>
      </section>

      {/* App Promo Section */}
      <section className={`container ${styles.appPromoSection}`}>
        <div className={styles.promoContent}>
          <div className={styles.phoneMockup}>
            <div className={styles.phoneScreen}>
              <div className={styles.phoneSticker}>♡ Sarvuday Med</div>
              <div className={styles.phoneWidget1}>Today's Calm</div>
              <div className={styles.phoneLines}>
                <div className={styles.line}></div>
                <div className={styles.lineShort}></div>
              </div>
              <div className={styles.phonePlayer}>
                <FaPlay className={styles.playIcon} />
                <div className={styles.progressBar}>
                  <div className={styles.progressFill}></div>
                </div>
                <span className={styles.time}>12:34</span>
              </div>
            </div>
          </div>
          
          <div className={styles.promoText}>
            <h2>Your everyday mental health app</h2>
            <p>Take your practice anywhere. With offline access and a variety of content styles, Sarvuday fits perfectly into your pocket and your lifestyle.</p>
            <div className={styles.appButtons}>
              <button className={styles.storeButton}>
                <FaApple size={24} />
                <div className={styles.storeBtnText}>
                  <span className={styles.smallText}>Download on the</span>
                  <span className={styles.largeText}>App Store</span>
                </div>
              </button>
              <button className={styles.storeButton}>
                <FaGooglePlay size={24} />
                <div className={styles.storeBtnText}>
                  <span className={styles.smallText}>Get it on</span>
                  <span className={styles.largeText}>Google Play</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
