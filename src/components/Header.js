import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  header: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '1rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1a73e8',
    textDecoration: 'none',
    letterSpacing: '-0.5px',
  },
  linkContainer: {
    display: 'flex',
    gap: '1.5rem',
  },
  link: {
    color: '#5f6368',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
  },
  linkHover: {
    backgroundColor: '#f1f3f4',
    color: '#1a73e8',
  },
};

const Header = () => {
  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <Link to="/" style={styles.logo}>BlogSpace</Link>
        <div style={styles.linkContainer}>
          <Link 
            to="/" 
            style={styles.link}
            onMouseOver={e => Object.assign(e.target.style, styles.linkHover)}
            onMouseOut={e => Object.assign(e.target.style, styles.link)}
          >
            Home
          </Link>
          <Link 
            to="/create" 
            style={styles.link}
            onMouseOver={e => Object.assign(e.target.style, styles.linkHover)}
            onMouseOut={e => Object.assign(e.target.style, styles.link)}
          >
            Create Post
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;