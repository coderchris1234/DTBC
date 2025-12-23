import { QRCodeSVG } from 'qrcode.react'
import { useTheme } from '../contexts/ThemeContext'

const QRCode = ({ 
  url = import.meta.env.VITE_DOMAIN || 'https://your-domain.com',
  size = 200,
  title = 'Scan to visit our website',
  showTitle = true,
  showUrl = true 
}) => {
  const { theme } = useTheme()

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
    borderRadius: '12px',
    boxShadow: theme === 'dark' 
      ? '0 8px 32px rgba(255, 255, 255, 0.1)' 
      : '0 8px 32px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '0 auto'
  }

  const titleStyle = {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: theme === 'dark' ? '#ffffff' : '#333333',
    marginBottom: '1rem',
    textAlign: 'center'
  }

  const qrContainerStyle = {
    padding: '1rem',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    marginBottom: '1rem'
  }

  const urlStyle = {
    fontSize: '0.9rem',
    color: theme === 'dark' ? '#cccccc' : '#666666',
    textAlign: 'center',
    wordBreak: 'break-all',
    marginTop: '0.5rem'
  }

  const instructionStyle = {
    fontSize: '0.8rem',
    color: theme === 'dark' ? '#aaaaaa' : '#888888',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: '0.5rem'
  }

  return (
    <div style={containerStyle}>
      {showTitle && <h3 style={titleStyle}>{title}</h3>}
      
      <div style={qrContainerStyle}>
        <QRCodeSVG
          value={url}
          size={size}
          bgColor="#ffffff"
          fgColor="#000000"
          level="M"
          includeMargin={true}
        />
      </div>
      
      {showUrl && <p style={urlStyle}>{url}</p>}
      <p style={instructionStyle}>Point your camera at the QR code to scan</p>
    </div>
  )
}

export default QRCode