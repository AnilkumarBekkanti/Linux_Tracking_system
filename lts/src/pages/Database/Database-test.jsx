import React from 'react';

const DatabaseTest = () => {
  console.log('DatabaseTest component loaded');
  
  return (
    <div style={{ padding: '20px', backgroundColor: 'white', minHeight: '100vh' }}>
      <h1>Database Management - Test Version</h1>
      <p>This is a simple test to see if the database page loads.</p>
      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Database Status</h2>
        <p>PostgreSQL: Healthy</p>
        <p>Redis: Healthy</p>
        <p>MongoDB: Warning</p>
        <p>Elasticsearch: Healthy</p>
      </div>
    </div>
  );
};

export default DatabaseTest;
