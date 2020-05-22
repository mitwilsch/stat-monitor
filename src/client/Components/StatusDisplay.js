import React, { useState, useEffect } from 'react';
import { Typography, Card } from '@material-ui/core';

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const StatusDisplay = props => {
  const { status } = props;
  const {
    upTime,
    systemTime,
    cpuIdle,
    memAvail,
    memTotal,
    diskAvailSpace,
    diskUsedSpace,
    diskTotalSpace,
    diskUsagePercent,
  } = status;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" gutterBottom>
        System Time
      </Typography>
      <Typography variant="h3">{systemTime}</Typography>

      <Typography variant="h5" gutterBottom>
        Uptime
      </Typography>
      <Typography variant="h3">{upTime}</Typography>

      <Typography variant="h5" gutterBottom>
        Cpu Used
      </Typography>
      <Typography variant="h3">{(100 - cpuIdle).toFixed(2)}%</Typography>

      <Typography variant="h5" gutterBottom>
        Total Memory
      </Typography>
      <Typography variant="h3">{formatBytes(memTotal)}</Typography>

      <Typography variant="h5" gutterBottom>
        Used Memory
      </Typography>
      <Typography variant="h3">{formatBytes(memTotal - memAvail)}</Typography>

      <Typography variant="h5" gutterBottom>
        free Memory
      </Typography>
      <Typography variant="h3">{formatBytes(memAvail)}</Typography>

      <Typography variant="h5" gutterBottom>
        Disk Usage
      </Typography>
      <Typography variant="h3">
        {formatBytes(diskUsedSpace)} of {formatBytes(diskTotalSpace)} (
        {formatBytes(diskAvailSpace)} available)
      </Typography>

      <Typography variant="h5" gutterBottom>
        Disk Usage %
      </Typography>
      <Typography variant="h3">{diskUsagePercent}</Typography>
    </div>
  );
};

export default StatusDisplay;
