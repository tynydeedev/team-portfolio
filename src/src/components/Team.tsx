import { useTranslation } from 'react-i18next'
import { useFadeIn } from '../hooks/useFadeIn'
import styles from './Team.module.css'

const members = [
  { initials: 'AH', name: 'Alex Hartwell', roleKey: 'team.role1', descKey: 'team.desc1' },
  { initials: 'TN', name: 'Nguyen Quyet Thang', roleKey: 'team.role2', descKey: 'team.desc2', avatar: `${import.meta.env.BASE_URL}thangnq27.jpg` },
  { initials: 'JK', name: 'James Kowalski', roleKey: 'team.role3', descKey: 'team.desc3' },
  { initials: 'SN', name: 'Sara Nguyen', roleKey: 'team.role4', descKey: 'team.desc4' },
  { initials: 'DT', name: 'Daniel Torres', roleKey: 'team.role5', descKey: 'team.desc5' },
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
              <p className={styles.role}>{t(m.roleKey)}</p>
              <p className={styles.desc}>{t(m.descKey)}</p>
            </div>
          ))}
          <div className={styles.more}>
            <p>{t('team.more')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
