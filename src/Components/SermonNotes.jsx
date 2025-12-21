import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { 
  FaEdit, 
  FaSave, 
  FaDownload, 
  FaTrash, 
  FaPlus,
  FaFileAlt,
  FaTimes,
  FaCalendarAlt
} from 'react-icons/fa';

const SermonNotes = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState({
    id: null,
    title: '',
    date: '',
    content: '',
    lastModified: null
  });

  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('dtbc-sermon-notes');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading sermon notes:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('dtbc-sermon-notes', JSON.stringify(notes));
  }, [notes]);

  const createNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: `Sermon Notes - ${new Date().toLocaleDateString()}`,
      date: new Date().toISOString().split('T')[0],
      content: '',
      lastModified: new Date().toISOString()
    };
    setCurrentNote(newNote);
    setIsEditing(true);
  };

  const saveNote = () => {
    if (!currentNote.title.trim() && !currentNote.content.trim()) {
      return;
    }

    const updatedNote = {
      ...currentNote,
      lastModified: new Date().toISOString()
    };

    if (currentNote.id && notes.find(note => note.id === currentNote.id)) {
      setNotes(prev => prev.map(note => 
        note.id === currentNote.id ? updatedNote : note
      ));
    } else {
      if (!currentNote.id) {
        updatedNote.id = Date.now();
      }
      setNotes(prev => [updatedNote, ...prev]);
    }

    setIsEditing(false);
  };

  const editNote = (note) => {
    setCurrentNote(note);
    setIsEditing(true);
  };

  const deleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(prev => prev.filter(note => note.id !== noteId));
      if (currentNote.id === noteId) {
        setCurrentNote({
          id: null,
          title: '',
          date: '',
          content: '',
          lastModified: null
        });
        setIsEditing(false);
      }
    }
  };

  const downloadNote = (note) => {
    const content = `${note.title}\nDate: ${note.date}\nLast Modified: ${new Date(note.lastModified).toLocaleString()}\n\n${note.content}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleInputChange = (field, value) => {
    setCurrentNote(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <button
        style={{
          position: 'fixed',
          bottom: '180px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: theme === 'dark' 
            ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' 
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}
        onClick={() => setIsOpen(!isOpen)}
        title="Sermon Notes"
        onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      >
        <FaFileAlt />
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000
          }}
          onClick={() => setIsOpen(false)}
        />
      )}

      <div style={{
        position: 'fixed',
        top: '0',
        right: isOpen ? '0' : '-400px',
        width: '400px',
        height: '100vh',
        background: theme === 'dark' ? '#1a1a2e' : '#ffffff',
        boxShadow: '-5px 0 20px rgba(0, 0, 0, 0.3)',
        zIndex: 1001,
        transition: 'right 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '20px',
          borderBottom: `1px solid ${theme === 'dark' ? '#333' : '#eee'}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: theme === 'dark' ? '#2d2d44' : '#f8f9fa'
        }}>
          <h3 style={{
            margin: 0,
            color: theme === 'dark' ? '#ffffff' : '#333333',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            <FaFileAlt style={{ marginRight: '8px' }} />
            Sermon Notes
          </h3>
          <div>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: theme === 'dark' ? '#ffffff' : '#333333',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '4px',
                marginRight: '5px'
              }}
              onClick={createNewNote}
              title="New Note"
            >
              <FaPlus />
            </button>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: theme === 'dark' ? '#ffffff' : '#333333',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '4px'
              }}
              onClick={() => setIsOpen(false)}
              title="Close"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        <div style={{
          flex: 1,
          padding: '20px',
          overflow: 'auto',
          color: theme === 'dark' ? '#ffffff' : '#333333'
        }}>
          {isEditing ? (
            <div>
              <input
                type="text"
                placeholder="Note Title"
                value={currentNote.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: `1px solid ${theme === 'dark' ? '#444' : '#ddd'}`,
                  borderRadius: '4px',
                  background: theme === 'dark' ? '#333' : '#fff',
                  color: theme === 'dark' ? '#fff' : '#333',
                  fontSize: '14px',
                  marginBottom: '10px',
                  boxSizing: 'border-box'
                }}
              />
              <input
                type="date"
                value={currentNote.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: `1px solid ${theme === 'dark' ? '#444' : '#ddd'}`,
                  borderRadius: '4px',
                  background: theme === 'dark' ? '#333' : '#fff',
                  color: theme === 'dark' ? '#fff' : '#333',
                  fontSize: '14px',
                  marginBottom: '10px',
                  boxSizing: 'border-box'
                }}
              />
              <textarea
                placeholder="Write your sermon notes here..."
                value={currentNote.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: `1px solid ${theme === 'dark' ? '#444' : '#ddd'}`,
                  borderRadius: '4px',
                  background: theme === 'dark' ? '#333' : '#fff',
                  color: theme === 'dark' ? '#fff' : '#333',
                  fontSize: '14px',
                  marginBottom: '10px',
                  minHeight: '200px',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box'
                }}
              />
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  onClick={saveNote}
                  style={{
                    background: '#28a745',
                    color: 'white',
                    border: 'none',
                    padding: '10px 15px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <FaSave />
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  style={{
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    padding: '10px 15px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              {notes.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <FaFileAlt style={{ fontSize: '48px', opacity: 0.3, marginBottom: '20px' }} />
                  <p style={{ opacity: 0.7 }}>No sermon notes yet.</p>
                  <p style={{ opacity: 0.7 }}>Click the + button to create your first note!</p>
                </div>
              ) : (
                notes.map(note => (
                  <div key={note.id} style={{
                    padding: '15px',
                    border: `1px solid ${theme === 'dark' ? '#444' : '#eee'}`,
                    borderRadius: '8px',
                    marginBottom: '10px',
                    background: theme === 'dark' ? '#2d2d44' : '#f8f9fa'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>{note.title}</h4>
                        <p style={{ margin: 0, fontSize: '12px', opacity: 0.7 }}>
                          <FaCalendarAlt style={{ marginRight: '5px' }} />
                          {note.date} • Modified: {new Date(note.lastModified).toLocaleDateString()}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <button
                          onClick={() => editNote(note)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: theme === 'dark' ? '#ffffff' : '#333333',
                            cursor: 'pointer',
                            padding: '4px'
                          }}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => downloadNote(note)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: theme === 'dark' ? '#ffffff' : '#333333',
                            cursor: 'pointer',
                            padding: '4px'
                          }}
                          title="Download"
                        >
                          <FaDownload />
                        </button>
                        <button
                          onClick={() => deleteNote(note.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: theme === 'dark' ? '#ffffff' : '#333333',
                            cursor: 'pointer',
                            padding: '4px'
                          }}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <p style={{ 
                      margin: 0, 
                      fontSize: '14px', 
                      lineHeight: '1.4',
                      maxHeight: '60px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {note.content.substring(0, 100)}{note.content.length > 100 ? '...' : ''}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SermonNotes;