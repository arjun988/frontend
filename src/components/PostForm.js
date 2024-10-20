import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
  },
  form: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#202124',
    marginBottom: '1.5rem',
  },
  fieldGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#5f6368',
    fontSize: '0.875rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #dadce0',
    fontSize: '1rem',
    marginBottom: '1rem',
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #dadce0',
    fontSize: '1rem',
    minHeight: '200px',
    resize: 'vertical',
  },
  button: {
    backgroundColor: '#1a73e8',
    color: '#ffffff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  buttonHover: {
    backgroundColor: '#1557b0',
  },
};

const PostForm = ({ post }) => {
  const [title, setTitle] = useState(post ? post.title : '');
  const [content, setContent] = useState(post ? post.content : '');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (post) {
        await axios.put(`http://localhost:5000/posts/${post.id}`, { title, content });
      } else {
        await axios.post('http://localhost:5000/posts', { title, content });
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>{post ? 'Edit Post' : 'Create New Post'}</h2>
        
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content..."
            style={styles.textarea}
            required
          />
        </div>

        <button 
          type="submit" 
          style={styles.button}
          onMouseOver={e => Object.assign(e.target.style, styles.buttonHover)}
          onMouseOut={e => Object.assign(e.target.style, styles.button)}
        >
          {post ? 'Update Post' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default PostForm;