import { useTranslation } from 'react-i18next'
import { useFadeIn } from '../hooks/useFadeIn'
import styles from './Hero.module.css'

export default function Hero() {
  const { t } = useTranslation()
  const contentRef = useFadeIn()

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.bg} />
      <div className={`container ${styles.content}`} ref={contentRef as React.RefObject<HTMLDivElement>}>
        <p className={styles.tag}>{t('hero.tag')}</p>
        <h1>
          {t('hero.h1_1')}<br />
          {t('hero.h1_2')} <span className={styles.highlight}>{t('hero.h1_highlight')}</span>
        </h1>
        <p className={styles.sub}>{t('hero.sub')}</p>
        <div className={styles.actions}>
          <button className="btn btn-primary" onClick={() => scrollTo('services')}>
            {t('hero.btnServices')}
          </button>
          <button className="btn btn-outline" onClick={() => scrollTo('contact')}>
            {t('hero.btnStart')}
          </button>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <strong>{t('hero.stat1_val')}</strong>
            <span>{t('hero.stat1_label')}</span>
          </div>
          <div className={styles.stat}>
            <strong>{t('hero.stat2_val')}</strong>
            <span>{t('hero.stat2_label')}</span>
          </div>
          <div className={styles.stat}>
            <strong>{t('hero.stat3_val')}</strong>
            <span>{t('hero.stat3_label')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
