import React, { useState } from 'react';
import axios from 'axios';

const styles = {
  post: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '1.5rem',
    marginBottom: '2rem',
    transition: 'transform 0.2s ease',
  },
  postHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#202124',
    marginBottom: '1rem',
  },
  content: {
    color: '#5f6368',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
  },
  actionBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0',
    borderTop: '1px solid #f1f3f4',
  },
  button: {
    backgroundColor: '#1a73e8',
    color: '#ffffff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  buttonHover: {
    backgroundColor: '#1557b0',
  },
  commentsSection: {
    marginTop: '1.5rem',
  },
  commentsList: {
    marginBottom: '1rem',
  },
  comment: {
    backgroundColor: '#f8f9fa',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '0.5rem',
  },
  commentForm: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
  },
  input: {
    flex: 1,
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #dadce0',
    fontSize: '0.875rem',
  },
  stats: {
    display: 'flex',
    gap: '1rem',
    color: '#5f6368',
    fontSize: '0.875rem',
  },
};

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = async () => {
    try {
      await axios.post(`http://13.232.240.179:5000/posts/${post.id}/like`);
      setLikes(likes + 1);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const newComment = { content: comment };
      await axios.post(`http://13.232.240.179:5000/posts/${post.id}/comments`, newComment);
      setComments([...comments, newComment]);
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <article 
      style={{...styles.post, ...(isHovered ? styles.postHover : {})}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 style={styles.title}>{post.title}</h2>
      <p style={styles.content}>{post.content}</p>
      
      <div style={styles.actionBar}>
        <div style={styles.stats}>
          <span>{likes} likes</span>
          <span>•</span>
          <span>{comments.length} comments</span>
        </div>
        <button 
          onClick={handleLike}
          style={styles.button}
          onMouseOver={e => Object.assign(e.target.style, styles.buttonHover)}
          onMouseOut={e => Object.assign(e.target.style, styles.button)}
        >
          Like
        </button>
      </div>

      <div style={styles.commentsSection}>
        <h3 style={{marginBottom: '1rem', color: '#202124'}}>Comments</h3>
        <div style={styles.commentsList}>
          {comments.map((c, index) => (
            <div key={index} style={styles.comment}>
              {c.content}
            </div>
          ))}
        </div>

        <form onSubmit={handleComment} style={styles.commentForm}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            style={styles.input}
            required
          />
          <button 
            type="submit" 
            style={styles.button}
            onMouseOver={e => Object.assign(e.target.style, styles.buttonHover)}
            onMouseOut={e => Object.assign(e.target.style, styles.button)}
          >
            Comment
          </button>
        </form>
      </div>
    </article>
  );
};

export default Post;