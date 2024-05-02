import packageJson from "@package.json";
import os from "os";
let cpuUsageLine: number[] = new Array(60).fill(0); // 初始化60个元素的数组，初始值为0
let currentIndex = 0; // 当前索引

// 在程序启动时调用此函数开始收集数据
startCollectingCpuUsage();

function startCollectingCpuUsage() {
  const updateCpuUsage = () => {
    const startMeasure = cpuAverage();
    setTimeout(() => {
      const endMeasure = cpuAverage();
      const idleDifference = endMeasure.idle - startMeasure.idle;
      const totalDifference = endMeasure.total - startMeasure.total;
      const cpuUsage = 100 - ~~((100 * idleDifference) / totalDifference);

      cpuUsageLine[currentIndex] = cpuUsage;
      currentIndex = (currentIndex + 1) % 60; // 更新索引，确保它循环在0到59之间

      updateCpuUsage(); // 递归调用，继续收集下一秒的数据
    }, 1000); // 每1秒采集一次
  };

  updateCpuUsage(); // 开始收集数据
}

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

function getCpuLine(callback: (cpuUsageLine: number[]) => void) {
  // 由于数据是循环收集的，需要按正确的顺序返回最近的60个数据点
  const recentCpuUsage = [];
  const length = cpuUsageLine.length;
  for (let i = 0; i < length; i++) {
    const index = (currentIndex + i) % length;
    recentCpuUsage.push(cpuUsageLine[index]);
  }
  callback(recentCpuUsage);
}

export default { getSystemInfo, getDevicesInfo, getCpuLine };
