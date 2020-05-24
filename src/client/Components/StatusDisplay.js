import React, { useState, useEffect } from 'react';
import { Typography, Card } from '@material-ui/core';

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const Item = props => {
  const { name, data } = props;
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        {name}
      </Typography>
      <Typography variant="h3">{data}</Typography>
    </div>
  );
};
const StatusDisplay = props => {
  const { status } = props;
  const {
    upTime,
    systemTime,
    cpus,
    memFree,
    memTotal,

    diskAvailSpace,
    diskUsedSpace,
    diskTotalSpace,
    diskUsagePercent,
  } = status;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Item name="System Time" data={systemTime} />

      <Item name="Uptime" data={upTime} />
      <Item name="Total Memory" data={formatBytes(memTotal)} />
      <Item name="Used Memory" data={formatBytes(memTotal - memFree)} />
      <Item name="Free Memory" data={formatBytes(memFree)} />

      {console.log(cpus)}

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
