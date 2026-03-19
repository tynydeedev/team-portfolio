import { useTranslation } from 'react-i18next'
import { useFadeIn } from '../hooks/useFadeIn'
import styles from './About.module.css'

export default function About() {
  const { t } = useTranslation()
  const textRef = useFadeIn()
  const cardsRef = useFadeIn()

  const cards = [
    { icon: '◆', titleKey: 'about.card1_title', descKey: 'about.card1_desc' },
    { icon: '☁', titleKey: 'about.card2_title', descKey: 'about.card2_desc' },
    { icon: '⚙', titleKey: 'about.card3_title', descKey: 'about.card3_desc' },
  ]

  return (
    <section className="section section-alt" id="about">
      <div className="container">
        <div className="section-header">
          <p className="section-tag">{t('about.tag')}</p>
          <h2>{t('about.h2_1')}<br />{t('about.h2_2')}</h2>
        </div>
        <div className={styles.grid}>
          <div className={styles.text} ref={textRef as React.RefObject<HTMLDivElement>}>
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>
          </div>
          <div className={styles.cards} ref={cardsRef as React.RefObject<HTMLDivElement>}>
            {cards.map((c) => (
              <div key={c.titleKey} className={styles.card}>
                <span className={styles.icon}>{c.icon}</span>
                <h3>{t(c.titleKey)}</h3>
                <p>{t(c.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
