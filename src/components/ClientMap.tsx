import { useTranslation } from 'react-i18next'
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useFadeIn } from '../hooks/useFadeIn'
import styles from './ClientMap.module.css'

const LOCATIONS = [
  { lat: 10.762622, lng: 106.660172, labelKey: 'map.vn_label', color: '#818cf8', radius: 14 }, // Ho Chi Minh
  { lat: 21.028511, lng: 105.804817, labelKey: 'map.vn_label', color: '#818cf8', radius: 10 }, // Hanoi
  { lat: 37.7749, lng: -122.4194, labelKey: 'map.us_label', color: '#22d3ee', radius: 13 },   // SF
  { lat: 40.7128, lng: -74.006, labelKey: 'map.us_label', color: '#22d3ee', radius: 13 },      // NY
  { lat: 48.8566, lng: 2.3522, labelKey: 'map.eu_label', color: '#34d399', radius: 11 },       // Paris
  { lat: 52.52, lng: 13.405, labelKey: 'map.eu_label', color: '#34d399', radius: 11 },         // Berlin
  { lat: 51.5074, lng: -0.1278, labelKey: 'map.eu_label', color: '#34d399', radius: 11 },      // London
  { lat: -33.8688, lng: 151.2093, labelKey: 'map.au_label', color: '#f59e0b', radius: 11 },    // Sydney
  { lat: -41.2925, lng: 174.7783, labelKey: 'map.nz_label', color: '#f59e0b', radius: 10 },    // Wellington
]

const LEGEND = [
  { color: '#818cf8', labelKey: 'map.vn_label' },
  { color: '#22d3ee', labelKey: 'map.us_label' },
  { color: '#34d399', labelKey: 'map.eu_label' },
  { color: '#f59e0b', labelKey: 'map.au_nz_label' },
]

export default function ClientMap() {
  const { t } = useTranslation()
  const ref = useFadeIn()

  return (
    <section className="section section-alt" id="map">
      <div className="container">
        <div className="section-header">
          <p className="section-tag">{t('map.tag')}</p>
          <h2>{t('map.h2')}</h2>
          <p className={styles.desc}>{t('map.desc')}</p>
        </div>
        <div className={styles.mapWrap} ref={ref as React.RefObject<HTMLDivElement>}>
          <MapContainer
            center={[20, 20]}
            zoom={2}
            minZoom={2}
            maxZoom={5}
            scrollWheelZoom={false}
            zoomControl={true}
            className={styles.map}
            attributionControl={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />
            {LOCATIONS.map((loc, i) => (
              <CircleMarker
                key={i}
                center={[loc.lat, loc.lng]}
                radius={loc.radius}
                pathOptions={{
                  color: loc.color,
                  fillColor: loc.color,
                  fillOpacity: 0.7,
                  weight: 2,
                }}
              >
                <Tooltip sticky>{t(loc.labelKey)}</Tooltip>
              </CircleMarker>
            ))}
          </MapContainer>
          <div className={styles.legend}>
            {LEGEND.map((l) => (
              <div key={l.labelKey} className={styles.legendItem}>
                <span className={styles.dot} style={{ background: l.color }} />
                <span>{t(l.labelKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
