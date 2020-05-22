const { exec, spawn } = require('child_process');

const execShellCmd = cmd => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
};

const runTop = async () => {
  const res = await execShellCmd('top -n 1 -b ');

  // this regex should be a lot better
  // ideally, split only data into array and map variables in order
  // should also make a model for better API
  const data = res.split(/[^0-9\.]+/g).filter(v => v);

  const result = {
    memUsed: data[0] * 1024,
    memFree: data[1] * 1024,
    cpuUserSpace: data[5],
    cpuIdle: data[8],
    loadAvg1Min: data[12],
    loadAvg5Min: data[13],
    loadAvg15Min: data[14],
    //memTotal: memUsed + memFree,
  };
  result.memTotal = result.memUsed + result.memFree;

  return result;
};

const runDf = async () => {
  const res = await execShellCmd('df / -T -Bk');

  // this regex should be a lot better
  // ideally, split only data into array and map variables in order
  // should also make a model for better API
  const re = /\s*(?: |$)\s*/;
  const data = res.split(re);

  const result = {
    diskPath: data[7].split('\n')[1],
    diskType: data[8],
    diskTotalSpace: data[9].split('K')[0] * 1024,
    diskUsedSpace: data[10].split('K')[0] * 1024,
    diskAvailSpace: data[11].split('K')[0] * 1024,
    diskUsagePercent: data[12],
    diskMounted: data[13],
  };

  return result;
};

const runUptime = async () => {
  const res = await execShellCmd('uptime');

  const data = res.split(/[^0-9\:]+/g).filter(v => v);
  const result = {
    systemTime: data[0],
    upTime: data[1],
  };

  return result;
};

const getStats = async () => {
  const top = await runTop();
  const df = await runDf();
  const uptime = await runUptime();

  // return object

  const stats = { ...top, ...df, ...uptime };
  return stats;
};

module.exports = { getStats };
