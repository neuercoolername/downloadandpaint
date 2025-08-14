import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'inherit',
      color: '#333'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>About</h1>
      <p style={{ 
        fontSize: '1.1rem', 
        textAlign: 'center', 
        maxWidth: '600px',
        lineHeight: '1.6',
        marginBottom: '2rem'
      }}>
        This is a placeholder About page. Content will be added here in future iterations.
      </p>
      <button 
        onClick={handleBackToHome}
        style={{
          padding: '12px 24px',
          fontSize: '1rem',
          backgroundColor: '#333',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Back to Home
      </button>
    </div>
  );
}