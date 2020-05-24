import React from 'react';
import { Typography, Link } from '@material-ui/core';

const Footer = props => {
  return (
    <>
      <Typography variant="h6" align="center" gutterBottom>
        Stat Monitor
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        Created with React
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mitchell.schooler.me">
          Mitchell Schooler
        </Link>
        {' 2020.'}
      </Typography>
    </>
  );
};

export default Footer;
