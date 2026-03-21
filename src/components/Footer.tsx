import { useTranslation } from 'react-i18next'
import styles from './Footer.module.css'

const NAV_ITEMS = ['about', 'services', 'map', 'clients', 'team', 'contact']

export default function Footer() {
  const { t } = useTranslation()

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <a
            href="#hero"
            className={styles.logo}
            onClick={(e) => { e.preventDefault(); scrollTo('hero') }}
          >
            WildSpace<span>Tech</span>
          </a>
          <p>{t('footer.tagline')}</p>
        </div>
        <div className={styles.links}>
          {NAV_ITEMS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(id) }}
            >
              {t(`nav.${id}`)}
            </a>
          ))}
        </div>
        <p className={styles.copy}>{t('footer.rights')}</p>
      </div>
    </footer>
  )
}
