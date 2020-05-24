import React, { useState, useEffect } from 'react';

import { CssBaseline, makeStyles, Container } from '@material-ui/core';
import { Route } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Main from './Components/Main';
import Monitor from './Components/Monitor';

const useStyles = makeStyles(theme => ({
  root: { display: 'flex', flexDirection: 'column', minHeight: '100vh' },
  main: { marginTop: theme.spacing(8), marginBottom: theme.spacing(2) },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
}));

const App = () => {
  const [status, setStatus] = useState({});
  const styles = useStyles();

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
    <div className={styles.root}>
      <CssBaseline />

      <Header>
        <Container component="main" className={styles.main} maxWidth="sm">
          <Route exact path="/" component={Main} />
          <Route
            path="/Monitor"
            render={props => <Monitor {...props} status={status} />}
          />
        </Container>
      </Header>
      <footer className={styles.footer}>
        <Container maxWidth="sm">
          <Footer />
        </Container>
      </footer>
    </div>
  );
}; // App

export default App;
