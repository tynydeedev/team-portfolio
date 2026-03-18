import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Clients from './components/Clients'
import Team from './components/Team'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Lazy-load the map so Leaflet is only loaded when needed
const ClientMap = lazy(() => import('./components/ClientMap'))

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Suspense fallback={<div style={{ height: 480, background: 'var(--color-bg-alt)' }} />}>
          <ClientMap />
        </Suspense>
        <Clients />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
