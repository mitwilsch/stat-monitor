import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@material-ui/core';

import { Memory, Storage, Schedule, ArrowUpward } from '@material-ui/icons';

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const Item = props => {
  const { name, data, icon } = props;
  return (
    <ListItem>
      <ListItemAvatar>{icon}</ListItemAvatar>
      <ListItemText primary={name} secondary={data} />
    </ListItem>
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
      <List>
        <Item name="System Time" data={systemTime} icon={<Schedule />} />

        <Item name="Uptime" data={upTime} icon={<ArrowUpward />} />
        <Item
          name="Total Memory"
          data={formatBytes(memTotal)}
          icon={<Memory />}
        />
        <Item name="Used Memory" data={formatBytes(memTotal - memFree)} />
        <Item name="Free Memory" data={formatBytes(memFree)} />

        {console.log(cpus)}

        <Item
          name="Disk Usage"
          data={`${formatBytes(diskUsedSpace)} of ${formatBytes(
            diskTotalSpace
          )} (
        ${formatBytes(diskAvailSpace)} available)`}
          icon={<Storage />}
        />
        <Item name="Disk Usage %" data={diskUsagePercent} />
      </List>
    </div>
  );
};

const Monitor = props => {
  const { status } = props;
  return (
    <div>
      {Object.keys(status).length > 0 ? (
        <StatusDisplay status={status} />
      ) : (
        <div />
      )}
    </div>
  );
};

export default Monitor;
