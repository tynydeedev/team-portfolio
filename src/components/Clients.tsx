import { useTranslation } from 'react-i18next'
import { useFadeIn } from '../hooks/useFadeIn'
import styles from './Clients.module.css'

const clients = [
  { name: 'ASX Energy', industryKey: 'clients.c1_industry' },
  { name: 'Silicon Labs', industryKey: 'clients.c2_industry' },
  { name: 'Cardinal Peak', industryKey: 'clients.c3_industry' },
]

export default function Clients() {
  const { t } = useTranslation()
  const ref = useFadeIn()

  return (
    <section className="section" id="clients">
      <div className="container">
        <div className="section-header">
          <p className="section-tag">{t('clients.tag')}</p>
          <h2>{t('clients.h2')}</h2>
        </div>
        <p className={styles.intro}>{t('clients.intro')}</p>
        <div className={styles.grid} ref={ref as React.RefObject<HTMLDivElement>}>
          {clients.map((c) => (
            <div key={c.name} className={styles.card}>
              <div className={styles.name}>{c.name}</div>
              <p className={styles.industry}>{t(c.industryKey)}</p>
            </div>
          ))}
        </div>
        <p className={styles.footer}>{t('clients.footer')}</p>
      </div>
    </section>
  )
}
