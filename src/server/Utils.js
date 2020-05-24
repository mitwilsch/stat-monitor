const { exec, spawn } = require('child_process');
const os = require('os');

const execShellCmd = cmd => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout || stderr);
    });
  });
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
  const df = await runDf();
  const uptime = await runUptime();

  const newUptime = await os.uptime();

  // generate uptime in date format
  const currentUptime = new Date(null);
  currentUptime.setSeconds(newUptime);
  const formatUptime = currentUptime.toISOString().substr(11, 8);
  // return object

  // const stats = { ...top, ...df, ...uptime };

  const stats = {
    upTime: formatUptime,
    systemTime: uptime.systemTime,
    cpus: os.cpus(),
    memFree: os.freemem(),
    memTotal: os.totalmem(),
    ...df,
  };

  return stats;
};

module.exports = { getStats };
