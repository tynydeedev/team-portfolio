import { useTranslation } from 'react-i18next'
import { useFadeIn } from '../hooks/useFadeIn'
import styles from './Team.module.css'

const members = [
  {
    initials: 'VD',
    name: 'Vu Quoc Dat',
    role: 'Tech Lead',
    desc: 'Leads technical direction, architecture decisions, and delivery quality across projects with 6 years of hands-on engineering experience.',
  },
  {
    initials: 'NN',
    name: 'Nguyen Duy Nga',
    role: 'Solution Architect',
    desc: 'Designs scalable end-to-end solutions and translates business goals into reliable systems, with 8 years of web development experience.',
  },
  {
    initials: 'NT',
    name: 'Nguyen Quyet Thang',
    role: 'Cloud Architect',
    desc: 'Builds cloud-native infrastructure and deployment pipelines while delivering production-ready web applications, with 4 years of experience.',
    avatar: `${import.meta.env.BASE_URL}thangnq27.jpg`,
  },
]

export default function Team() {
  const { t } = useTranslation()
  const ref = useFadeIn()

  return (
    <section className="section section-alt" id="team">
      <div className="container">
        <div className="section-header">
          <p className="section-tag">{t('team.tag')}</p>
          <h2>{t('team.h2_1')}<br />{t('team.h2_2')}</h2>
        </div>
        <p className={styles.intro}>{t('team.intro')}</p>
        <div className={styles.grid} ref={ref as React.RefObject<HTMLDivElement>}>
          {members.map((m) => (
            <div key={m.initials} className={styles.card}>
              <div className={styles.avatar}>
                {m.avatar ? (
                  <img src={m.avatar} alt={m.name} />
                ) : (
                  m.initials
                )}
              </div>
              <h3>{m.name}</h3>
              <p className={styles.role}>{m.role}</p>
              <p className={styles.desc}>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
