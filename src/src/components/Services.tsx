import { useTranslation } from 'react-i18next'
import { useFadeIn } from '../hooks/useFadeIn'
import styles from './Services.module.css'

const services = [
  { num: '01', titleKey: 'services.s1_title', descKey: 'services.s1_desc', tags: ['s1_t1','s1_t2','s1_t3','s1_t4'] },
  { num: '02', titleKey: 'services.s2_title', descKey: 'services.s2_desc', tags: ['s2_t1','s2_t2','s2_t3','s2_t4'] },
  { num: '03', titleKey: 'services.s3_title', descKey: 'services.s3_desc', tags: ['s3_t1','s3_t2','s3_t3','s3_t4'] },
  { num: '04', titleKey: 'services.s4_title', descKey: 'services.s4_desc', tags: ['s4_t1','s4_t2','s4_t3','s4_t4'] },
]

export default function Services() {
  const { t } = useTranslation()
  const ref = useFadeIn()

  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-header">
          <p className="section-tag">{t('services.tag')}</p>
          <h2>{t('services.h2_1')}<br />{t('services.h2_2')}</h2>
        </div>
        <div className={styles.grid} ref={ref as React.RefObject<HTMLDivElement>}>
          {services.map((s) => (
            <div key={s.num} className={styles.card}>
              <span className={styles.num}>{s.num}</span>
              <h3>{t(s.titleKey)}</h3>
              <p>{t(s.descKey)}</p>
              <ul className={styles.tags}>
                {s.tags.map((tk) => (
                  <li key={tk}>{t(`services.${tk}`)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
