import React from 'react';
import { Typography, Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles/';

const useStyles = makeStyles({
  root: {},
});

const Main = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Typography variant="h3" align="center" gutterBottom>
        Stat Monitor
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        Stat Monitor using NodeJS to report stats such as disk usage, memory
        usage, system uptime
      </Typography>
      <Typography variant="h5" align="center" paragraph>
        Check it out, the demo here is running on the server hosting this site!
      </Typography>
      <Button variant="contained" color="primary" href="#Monitor">
        Demo
      </Button>
    </div>
  );
};

export default Main;
