import packageJson from "@package.json";
import os from "os";
const cpuUsageLine: Array<{ date: Date; value: number }> = Array.from(
  { length: 60 },
  () => ({
    date: new Date(),
    value: 0,
  })
);
const devicesLine: Array<any> = new Array(60).fill([]);
let currentIndex = 0; // 当前索引

// 在程序启动时调用此函数开始收集数据
startCollecting();

function startCollecting() {
  function updateCpuUsageLine(index: number) {
    cpuUsageLine[index].date = new Date(); // 更新当前索引的日期
    getCpuUsage((cpuUsage) => {
      cpuUsageLine[index].value = cpuUsage; // 更新当前索引的值]
    });
  }

  function updateDevicesLine(index: number) {
    getDevicesInfo((devicesInfo) => {
      devicesLine[index] = devicesInfo;
    });
  }

  function nextCollecting() {
    setTimeout(() => {
      updateCpuUsageLine(currentIndex);
      updateDevicesLine(currentIndex);

      nextCollecting(); // 递归调用，继续收集下一秒的数据
      currentIndex = (currentIndex + 1) % 60; // 更新索引，确保它循环在0到59之间
    }, 1000);
  }

  nextCollecting();
}

function getSystemInfo(callback: (systemInfo: object) => void) {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const memoryUsage = ((totalMemory - freeMemory) / totalMemory) * 100;

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
  getCpuUsage((cpuUsage) => {
    res.cpuUsage = cpuUsage;
    callback(res);
  });
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

function getCpuUsage(callback: (cpuUsage: number) => void) {
  const startMeasure = cpuAverage(); // 开始测量

  setTimeout(() => {
    const endMeasure = cpuAverage(); // 结束测量
    const idleDifference = endMeasure.idle - startMeasure.idle;
    const totalDifference = endMeasure.total - startMeasure.total;
    const cpuUsage = 100 - ~~((100 * idleDifference) / totalDifference);

    callback(cpuUsage);
  }, 100);
}

function getDevicesInfo(callback: (devicesInfo: object[]) => void) {
  const res = Array.from({ length: 6 }, () => {
    const info = {};
    // 是否离线
    if (Math.random() > 0.1) {
      // 生成40到70之间的随机温度值
      Object.defineProperty(info, "temperature", {
        value: Math.floor(Math.random() * (70 - 40 + 1)) + 40,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }
    return info;
  });

  callback(res);
}

function getCpuLine(callback: (res: typeof cpuUsageLine) => any) {
  // 由于数据是循环收集的，需要按正确的顺序返回最近的60个数据点
  const recentCpuUsageLine = [];
  const length = cpuUsageLine.length;
  for (let i = 0; i < length; i++) {
    const index = (currentIndex + i) % length;
    recentCpuUsageLine.push(cpuUsageLine[index]);
  }
  callback(recentCpuUsageLine);
}

function getDevicesLine(callback: (devicesLine: object[]) => any) {
  const recentDevicesLine = [];
  const length = devicesLine.length;
  for (let i = 0; i < length; i++) {
    const index = (currentIndex + i) % length;
    recentDevicesLine.push(devicesLine[index]);
  }
  callback(recentDevicesLine);
}

export default {
  getSystemInfo,
  getDevicesInfo,
  getCpuLine,
  getDevicesLine,
};
