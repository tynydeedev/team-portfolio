import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Navbar.module.css'

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'vi', label: 'VI' },
  { code: 'zh', label: '中文' },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const scrollTo = (id: string) => {
    closeMenu()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const changeLang = (code: string) => i18n.changeLanguage(code)

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#hero" className={styles.logo} onClick={(e) => { e.preventDefault(); scrollTo('hero') }}>
          TynyDee<span>Dev</span>
        </a>

        <button
          className={styles.toggle}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle navigation"
        >
          <span className={menuOpen ? styles.open : ''} />
          <span className={menuOpen ? styles.open : ''} />
          <span className={menuOpen ? styles.open : ''} />
        </button>

        <ul className={`${styles.links} ${menuOpen ? styles.linksOpen : ''}`}>
          {['about', 'services', 'map', 'clients', 'team'].map((id) => (
            <li key={id}>
              <a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id) }}>
                {t(`nav.${id}`)}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className={styles.cta} onClick={(e) => { e.preventDefault(); scrollTo('contact') }}>
              {t('nav.cta')}
            </a>
          </li>
          <li className={styles.langSwitcher}>
            {LANGS.map((l) => (
              <button
                key={l.code}
                className={i18n.language === l.code || i18n.language.startsWith(l.code) ? styles.activeLang : ''}
                onClick={() => { changeLang(l.code); closeMenu() }}
              >
                {l.label}
              </button>
            ))}
          </li>
        </ul>
      </div>
    </nav>
  )
}
