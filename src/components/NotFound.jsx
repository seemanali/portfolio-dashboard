// src/components/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '150px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <br />
      <Link to="/" className='bg-red-700 text-white p-3'>Go back to Home</Link>
    </div>
  );
};

export default NotFound;
