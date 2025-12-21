import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FaPray, FaTimes, FaPaperPlane } from 'react-icons/fa';

const FloatingPrayerButton = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [prayerRequest, setPrayerRequest] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prayerRequest.trim()) return;

    setIsSubmitting(true);

    // Format the prayer request for WhatsApp
    const message = `🙏 *Prayer Request*

*Name:* ${name || 'Anonymous'}
*Request:* ${prayerRequest}

---
Sent from Divine Touch Bible Church USA Inc website`;

    // WhatsApp number for prayer requests
    const whatsappNumber = '+19732020411';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Simulate processing delay
    setTimeout(() => {
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Show success and reset form
      setShowSuccess(true);
      setPrayerRequest('');
      setName('');
      setIsSubmitting(false);
      
      // Auto-hide success message and close modal
      setTimeout(() => {
        setShowSuccess(false);
        setIsOpen(false);
      }, 3000);
    }, 1000);
  };

  const buttonStyle = {
    position: 'fixed',
    bottom: '100px',
    right: '20px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
    border: 'none',
    color: 'white',
    fontSize: '24px',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(255, 107, 107, 0.4)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    animation: 'pulse 2s infinite'
  };

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1001,
    padding: '20px'
  };

  const formStyle = {
    background: theme === 'dark' ? '#1a1a2e' : '#ffffff',
    borderRadius: '16px',
    padding: '2rem',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    color: theme === 'dark' ? '#ffffff' : '#333333',
    position: 'relative'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: `1px solid ${theme === 'dark' ? '#444' : '#ddd'}`,
    borderRadius: '8px',
    background: theme === 'dark' ? '#333' : '#fff',
    color: theme === 'dark' ? '#fff' : '#333',
    fontSize: '14px',
    marginBottom: '1rem',
    fontFamily: 'inherit'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '100px',
    resize: 'vertical'
  };

  const submitButtonStyle = {
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'none',
    border: 'none',
    color: theme === 'dark' ? '#ffffff' : '#333333',
    cursor: 'pointer',
    fontSize: '20px',
    padding: '5px'
  };

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0% { box-shadow: 0 4px 20px rgba(255, 107, 107, 0.4); }
            50% { box-shadow: 0 4px 30px rgba(255, 107, 107, 0.8); }
            100% { box-shadow: 0 4px 20px rgba(255, 107, 107, 0.4); }
          }
        `}
      </style>
      
      <button
        style={buttonStyle}
        onClick={() => setIsOpen(true)}
        title="Send Prayer Request"
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.animation = 'none';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.animation = 'pulse 2s infinite';
        }}
      >
        <FaPray />
      </button>

      {isOpen && (
        <div style={modalStyle} onClick={() => setIsOpen(false)}>
          <div style={formStyle} onClick={(e) => e.stopPropagation()}>
            <button
              style={closeButtonStyle}
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <FaPray style={{ fontSize: '2rem', color: '#ff6b6b', marginBottom: '0.5rem' }} />
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', fontWeight: '600' }}>
                Prayer Request
              </h3>
              <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>
                Share your prayer request with us. We believe in the power of prayer.
              </p>
            </div>

            {showSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🙏</div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#28a745' }}>
                  Prayer Request Sent!
                </h4>
                <p style={{ margin: 0, opacity: 0.8 }}>
                  Your prayer request has been sent to our prayer team. God hears your prayers.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle}
                />
                
                <textarea
                  placeholder="Please share your prayer request..."
                  value={prayerRequest}
                  onChange={(e) => setPrayerRequest(e.target.value)}
                  style={textareaStyle}
                  required
                />
                
                <button
                  type="submit"
                  disabled={isSubmitting || !prayerRequest.trim()}
                  style={{
                    ...submitButtonStyle,
                    opacity: (isSubmitting || !prayerRequest.trim()) ? 0.6 : 1,
                    cursor: (isSubmitting || !prayerRequest.trim()) ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid transparent',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Prayer Request
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
};

export default FloatingPrayerButton;