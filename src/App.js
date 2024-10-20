import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import PostForm from './components/PostForm';

const styles = {
  app: {
    fontFamily: "'Inter', sans-serif",
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    width: '100%',
  }
};

function App() {
  return (
    <Router>
      <div style={styles.app}>
        <Header />
        <main style={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<PostForm />} />
            <Route path="/edit/:id" element={<PostForm />} />
            <Route path="/post/:id" element={<PostDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;