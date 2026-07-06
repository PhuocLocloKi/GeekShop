import React, { useState } from 'react';
import StarRating from '../common/StarRating';
import Button from '../common/Button';
import { showError, showSuccess } from '../common/Toast';

const ReviewForm = ({ onSubmit, submitting = false }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      showError('Please write a comment before submitting.');
      return;
    }
    onSubmit({ rating, comment }).then(() => {
      setComment('');
      setRating(5);
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card-static"
      style={{
        padding: 'var(--space-lg)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-md)',
        border: '1px solid var(--glass-border)',
      }}
    >
      <h4
        style={{
          fontFamily: 'var(--font-code)',
          fontSize: 'var(--text-sm)',
          color: 'var(--neon-cyan)',
          letterSpacing: '0.05em',
        }}
      >
        SUBMIT_REVIEW
      </h4>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
        <span style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
          RATING:
        </span>
        <StarRating
          rating={rating}
          interactive={true}
          onChange={setRating}
          size={20}
        />
      </div>

      <div className="form-group" style={{ margin: 0 }}>
        <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>
          COMMENT
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter review notes here..."
          className="cyber-input cyber-textarea"
          style={{ width: '100%' }}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="sm"
        loading={submitting}
        style={{ alignSelf: 'flex-start' }}
      >
        [ SUBMIT_FEEDBACK ]
      </Button>
    </form>
  );
};

export default ReviewForm;
