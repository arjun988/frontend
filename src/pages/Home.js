import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../components/Post';

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#202124',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
    color: '#5f6368',
  },
  empty: {
    textAlign: 'center',
    padding: '2rem',
    color: '#5f6368',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
};

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://13.232.240.179:5000/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading posts...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Latest Blog Posts</h1>
      
      {posts.length === 0 ? (
        <div style={styles.empty}>
          No posts yet. Be the first to create one!
        </div>
      ) : (
        posts.map(post => <Post key={post.id} post={post} />)
      )}
    </div>
  );
};

export default Home;