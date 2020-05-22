import React, { useState, useEffect } from 'react';
import StatusDisplay from './Components/StatusDisplay';

const App = () => {
  const [status, setStatus] = useState({});

  const fetchStatus = async () => {
    const res = await fetch('/api/status');
    const data = await res.json();

    setStatus(data);
  };

  useEffect(() => {
    fetchStatus();
    console.log('I run on state change');

    const interval = setInterval(() => {
      fetchStatus();
      console.log('I run every 2 seconds');
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {Object.keys(status).length > 0 ? (
        <StatusDisplay status={status} />
      ) : (
        <div />
      )}
    </div>
  );
}; // App

export default App;
