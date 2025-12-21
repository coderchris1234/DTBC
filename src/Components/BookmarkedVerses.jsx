import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useBookmarkedVerses } from '../hooks/useBookmarkedVerses';
import { 
  FaBookmark, 
  FaTrash, 
  FaShare, 
  FaCopy,
  FaTwitter,
  FaFacebook,
  FaWhatsapp,
  FaHeart
} from 'react-icons/fa';

const BookmarkedVerses = () => {
  const { theme } = useTheme();
  const { removeBookmark, clearBookmarks, getSortedBookmarks } = useBookmarkedVerses();
  const [showShareMenu, setShowShareMenu] = useState(null);
  const [copySuccess, setCopySuccess] = useState(null);

  const sortedVerses = getSortedBookmarks();

  // Copy verse to clipboard
  const copyToClipboard = async (verse, index) => {
    const text = `"${verse.text}" - ${verse.reference}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(index);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Share functions
  const shareToTwitter = (verse) => {
    const text = `"${verse.text}" - ${verse.reference}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&hashtags=BookmarkedVerse,Faith,DTBC`;
    window.open(url, '_blank');
  };

  const shareToFacebook = (verse) => {
    const text = `"${verse.text}" - ${verse.reference}`;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const shareToWhatsApp = (verse) => {
    const text = `🙏 Bookmarked Verse: "${verse.text}" - ${verse.reference}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (sortedVerses.length === 0) {
    return (
      <div className={`bookmarked-verses empty ${theme === 'dark' ? 'dark' : 'light'}`}>
        <div className="empty-state">
          <FaBookmark className="empty-icon" />
          <h3>No Bookmarked Verses Yet</h3>
          <p>Start bookmarking your favorite verses from the Daily Verse widget!</p>
        </div>

        <style jsx>{`
          .bookmarked-verses.empty {
            padding: 6rem 2rem 4rem;
            text-align: center;
            color: ${theme === 'dark' ? '#e2e8f0' : '#4a5568'};
          }

          .empty-state {
            max-width: 400px;
            margin: 0 auto;
          }

          .empty-icon {
            font-size: 4rem;
            color: ${theme === 'dark' ? '#4a5568' : '#a0aec0'};
            margin-bottom: 1rem;
          }

          .empty-state h3 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
            color: ${theme === 'dark' ? '#e2e8f0' : '#2d3748'};
          }

          .empty-state p {
            font-size: 1rem;
            opacity: 0.8;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`bookmarked-verses ${theme === 'dark' ? 'dark' : 'light'}`}>
      <div className="bookmarks-header">
        <div className="header-content">
          <h2 className="bookmarks-title">
            <FaBookmark className="title-icon" />
            Bookmarked Verses
          </h2>
          <p className="bookmarks-count">
            {sortedVerses.length} verse{sortedVerses.length !== 1 ? 's' : ''} saved
          </p>
        </div>
        {sortedVerses.length > 0 && (
          <button 
            className="clear-all-btn"
            onClick={() => {
              if (window.confirm('Are you sure you want to remove all bookmarked verses?')) {
                clearBookmarks();
              }
            }}
          >
            <FaTrash /> Clear All
          </button>
        )}
      </div>

      <div className="verses-grid">
        {sortedVerses.map((verse, index) => (
          <div key={`${verse.reference}-${index}`} className="verse-card">
            <div className="verse-content">
              <blockquote className="verse-text">
                "{verse.text}"
              </blockquote>
              <cite className="verse-reference">
                - {verse.reference}
              </cite>
              {verse.theme && (
                <div className={`verse-theme theme-${verse.theme}`}>
                  {verse.theme}
                </div>
              )}
              <div className="bookmark-date">
                <FaHeart className="date-icon" />
                Saved on {formatDate(verse.bookmarkedAt)}
              </div>
            </div>

            <div className="verse-actions">
              <button 
                className="action-btn remove-btn"
                onClick={() => removeBookmark(verse.reference)}
                title="Remove bookmark"
              >
                <FaTrash />
              </button>
              
              <div className="share-container">
                <button 
                  className="action-btn share-btn"
                  onClick={() => setShowShareMenu(showShareMenu === index ? null : index)}
                  title="Share verse"
                >
                  <FaShare />
                </button>
                
                {showShareMenu === index && (
                  <div className="share-menu">
                    <button onClick={() => shareToTwitter(verse)} className="share-option twitter">
                      <FaTwitter /> Twitter
                    </button>
                    <button onClick={() => shareToFacebook(verse)} className="share-option facebook">
                      <FaFacebook /> Facebook
                    </button>
                    <button onClick={() => shareToWhatsApp(verse)} className="share-option whatsapp">
                      <FaWhatsapp /> WhatsApp
                    </button>
                    <button onClick={() => copyToClipboard(verse, index)} className="share-option copy">
                      <FaCopy /> {copySuccess === index ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .bookmarked-verses {
          padding: 6rem 2rem 2rem;
          min-height: 60vh;
        }

        .bookmarks-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid ${theme === 'dark' ? '#4a5568' : '#e2e8f0'};
        }

        .header-content {
          flex: 1;
        }

        .bookmarks-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 2rem;
          font-weight: 700;
          color: ${theme === 'dark' ? '#e2e8f0' : '#2d3748'};
          margin: 0 0 0.5rem 0;
        }

        .title-icon {
          color: #ffd700;
        }

        .bookmarks-count {
          color: ${theme === 'dark' ? '#a0aec0' : '#718096'};
          font-size: 1rem;
          margin: 0;
        }

        .clear-all-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: #e53e3e;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .clear-all-btn:hover {
          background: #c53030;
          transform: translateY(-1px);
        }

        .verses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 1.5rem;
        }

        .verse-card {
          background: ${theme === 'dark' 
            ? 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)' 
            : 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)'
          };
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: ${theme === 'dark' 
            ? '0 10px 30px rgba(0, 0, 0, 0.3)' 
            : '0 10px 30px rgba(0, 0, 0, 0.1)'
          };
          border: 1px solid ${theme === 'dark' ? '#4a5568' : '#e2e8f0'};
          transition: all 0.3s ease;
          position: relative;
        }

        .verse-card:hover {
          transform: translateY(-4px);
          box-shadow: ${theme === 'dark' 
            ? '0 20px 40px rgba(0, 0, 0, 0.4)' 
            : '0 20px 40px rgba(0, 0, 0, 0.15)'
          };
        }

        .verse-content {
          margin-bottom: 1rem;
        }

        .verse-text {
          font-size: 1.1rem;
          line-height: 1.6;
          color: ${theme === 'dark' ? '#e2e8f0' : '#2d3748'};
          font-style: italic;
          margin: 0 0 1rem 0;
          font-weight: 400;
        }

        .verse-reference {
          display: block;
          color: ${theme === 'dark' ? '#a0aec0' : '#4a5568'};
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .verse-theme {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: ${theme === 'dark' ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.1)'};
          color: ${theme === 'dark' ? '#90cdf4' : '#3182ce'};
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: capitalize;
          margin-bottom: 0.75rem;
        }

        .bookmark-date {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: ${theme === 'dark' ? '#718096' : '#a0aec0'};
          font-size: 0.85rem;
          margin-top: 0.75rem;
        }

        .date-icon {
          color: #e53e3e;
          font-size: 0.8rem;
        }

        .verse-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
          align-items: center;
        }

        .action-btn {
          background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
          border: none;
          border-radius: 8px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${theme === 'dark' ? '#a0aec0' : '#4a5568'};
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
          transform: translateY(-1px);
        }

        .remove-btn:hover {
          background: rgba(229, 62, 62, 0.2);
          color: #e53e3e;
        }

        .share-container {
          position: relative;
        }

        .share-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background: ${theme === 'dark' ? '#2d3748' : 'white'};
          border-radius: 12px;
          padding: 0.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          z-index: 10;
          min-width: 150px;
          margin-top: 0.5rem;
          border: 1px solid ${theme === 'dark' ? '#4a5568' : '#e2e8f0'};
        }

        .share-option {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.75rem;
          border: none;
          background: none;
          color: ${theme === 'dark' ? '#e2e8f0' : '#2d3748'};
          cursor: pointer;
          border-radius: 8px;
          transition: background 0.2s ease;
          font-size: 0.9rem;
        }

        .share-option:hover {
          background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
        }

        .share-option.twitter:hover { color: #1da1f2; }
        .share-option.facebook:hover { color: #4267b2; }
        .share-option.whatsapp:hover { color: #25d366; }
        .share-option.copy:hover { color: #38a169; }

        @media (max-width: 768px) {
          .bookmarked-verses {
            padding: 5rem 1rem 1rem;
          }

          .bookmarks-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .verses-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .verse-card {
            padding: 1rem;
          }

          .bookmarks-title {
            font-size: 1.5rem;
          }

          .share-menu {
            right: -50px;
          }
        }
      `}</style>
    </div>
  );
};

export default BookmarkedVerses;