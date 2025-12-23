import { useTheme } from '../contexts/ThemeContext'
import QRCode from './QRCode'

const QRCodeSection = () => {
  const { theme } = useTheme()

  const sectionStyle = {
    padding: '4rem 1rem',
    backgroundColor: theme === 'dark' ? '#0f0f0f' : '#f8f9fa',
    textAlign: 'center'
  }

  const headingStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: theme === 'dark' ? '#ffffff' : '#333333',
    marginBottom: '1rem'
  }

  const subheadingStyle = {
    fontSize: '1.2rem',
    color: theme === 'dark' ? '#cccccc' : '#666666',
    marginBottom: '3rem',
    maxWidth: '600px',
    margin: '0 auto 3rem auto',
    lineHeight: '1.6'
  }

  return (
    <section style={sectionStyle}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={headingStyle}>Visit Our Website</h2>
        <p style={subheadingStyle}>
          Scan the QR code below with your phone's camera to quickly access our website, 
          stay connected with our community, and never miss an update.
        </p>
        
        <QRCode 
          title="Divine Touch Bible Church"
          size={250}
          showTitle={false}
        />
      </div>
    </section>
  )
}

export default QRCodeSection