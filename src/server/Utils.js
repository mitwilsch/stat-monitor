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
  const re = /\s*(?: |$)\s*/;
  const data = res.split(re);

  const result = {
    systemTime: data[2],
    upTime: data[4].split(','),
    users: data[5],
    loadAvg1Min: data[9],
    loadAvg5Min: data[10],
    loadAvg15Min: data[11].split('\n')[0],
    totalTasks: data[12],
    runningTasks: data[14],
    sleepingTasks: data[16],
    stoppedTasks: data[18],
    zombieTasks: data[20],
    cpuUserSpace: data[22],
    cpuSystem: data[24],
    cpuNice: data[26],
    cpuIdle: data[28],
    cpuWait: data[30],
    cpuHi: data[32],
    cpuSi: data[34],
    cpuSt: data[36],
    memTotal: data[40] * 1024,
    memFree: data[42] * 1024,
    memUsed: data[44] * 1024,
    memBuffCache: data[46] * 1024,
    memSwapTotal: data[49] * 1024,
    memSwapFree: data[51] * 1024,
    memSwapUsed: data[53] * 1024,
    memAvail: data[55] * 1024,
  };
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

const getStats = async () => {
  const top = await runTop();
  const df = await runDf();
  // return object
  const stats = { ...top, ...df };
  return stats;
};

module.exports = { getStats };
