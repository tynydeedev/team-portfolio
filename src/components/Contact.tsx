import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useFadeIn } from '../hooks/useFadeIn'
import styles from './Contact.module.css'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

type Status = 'idle' | 'sending' | 'success' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function buildDiscordPayload(form: FormState): object {
  return {
    embeds: [
      {
        title: `📬 New Contact: ${form.subject}`,
        color: 0x6366f1,
        fields: [
          { name: 'Name', value: form.name, inline: true },
          { name: 'Email', value: form.email, inline: true },
          { name: 'Message', value: form.message },
        ],
        timestamp: new Date().toISOString(),
      },
    ],
  }
}

export default function Contact() {
  const { t } = useTranslation()
  const ref = useFadeIn()
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const update = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('idle')

    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus('error')
      return
    }
    if (!EMAIL_RE.test(form.email)) {
      setStatus('error')
      return
    }

    const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL
    if (!webhookUrl) {
      // Discord webhook not configured — log and show success for demo
      console.warn('VITE_DISCORD_WEBHOOK_URL is not set. Message not delivered.')
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildDiscordPayload(form)),
      })
      if (!res.ok) throw new Error(`Discord responded with ${res.status}`)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const statusMsg = () => {
    if (status === 'sending') return t('contact.sending')
    if (status === 'success') return t('contact.success')
    if (status === 'error') {
      if (!form.name || !form.email || !form.subject || !form.message) return t('contact.error_fields')
      if (!EMAIL_RE.test(form.email)) return t('contact.error_email')
      return t('contact.error_send')
    }
    return ''
  }

  return (
    <section className="section section-alt" id="contact">
      <div className="container">
        <div className="section-header">
          <p className="section-tag">{t('contact.tag')}</p>
          <h2>{t('contact.h2_1')}<br />{t('contact.h2_2')}</h2>
        </div>
        <p className={styles.intro}>{t('contact.intro')}</p>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          noValidate
          ref={ref as React.RefObject<HTMLFormElement>}
        >
          <div className={styles.row}>
            <div className={styles.group}>
              <label htmlFor="name">{t('contact.name')}</label>
              <input
                id="name" type="text" required
                placeholder={t('contact.name_ph')}
                value={form.name}
                onChange={update('name')}
                autoComplete="name"
              />
            </div>
            <div className={styles.group}>
              <label htmlFor="email">{t('contact.email')}</label>
              <input
                id="email" type="email" required
                placeholder={t('contact.email_ph')}
                value={form.email}
                onChange={update('email')}
                autoComplete="email"
              />
            </div>
          </div>
          <div className={styles.group}>
            <label htmlFor="subject">{t('contact.subject')}</label>
            <input
              id="subject" type="text" required
              placeholder={t('contact.subject_ph')}
              value={form.subject}
              onChange={update('subject')}
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="message">{t('contact.message')}</label>
            <textarea
              id="message" rows={5} required
              placeholder={t('contact.message_ph')}
              value={form.message}
              onChange={update('message')}
            />
          </div>
          <button
            type="submit"
            className={`btn btn-primary ${styles.submit}`}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? t('contact.sending') : t('contact.submit')}
          </button>
          {statusMsg() && (
            <p className={`${styles.status} ${status === 'success' ? styles.success : status === 'error' ? styles.error : ''}`}>
              {statusMsg()}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
