import packageJson from "@package.json";
import os from "os";

function getSystemInfo(callback: (systemInfo: object) => void) {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const memoryUsage = ((totalMemory - freeMemory) / totalMemory) * 100;

  const startMeasure = cpuAverage();

  // 获取Node环境信息
  const nodeVersion = process.version;
  const platform = process.platform;

  // 获取本程序使用的内存信息
  const usedMemory = process.memoryUsage().heapUsed / 1024 / 1024; // 将字节转换为MB

  const res = {
    cpuUsage: 0,
    memoryUsage: memoryUsage,
    nodeVersion: nodeVersion,
    platform: platform,
    app: {
      usedMemory: `${usedMemory.toFixed(2)} MB`, // 格式化为MB并保留两位小数
      version: packageJson.version,
    },
  };

  // Set delay for second measure
  setTimeout(() => {
    const endMeasure = cpuAverage();
    const idleDifference = endMeasure.idle - startMeasure.idle;
    const totalDifference = endMeasure.total - startMeasure.total;
    const cpuUsage = 100 - ~~((100 * idleDifference) / totalDifference);

    res.cpuUsage = cpuUsage;
    callback(res);
  }, 100);
}

// Function to get current average CPU usage
function cpuAverage() {
  const cpus = os.cpus();
  let idleMs = 0;
  let totalMs = 0;
  cpus.forEach((core) => {
    for (let type in core.times) {
      // @ts-expect-error
      totalMs += core.times[type];
    }
    idleMs += core.times.idle;
  });
  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length,
  };
}

function getDevicesInfo(callback: (deviceInfo: object) => void) {
  const res = [
    { temprature: 40 },
    { temprature: 42 },
    { temprature: 41 },
    { temprature: 41 },
    {},
    { temprature: 70 },
  ];

  callback(res);
}

export default { getSystemInfo, getDevicesInfo };
