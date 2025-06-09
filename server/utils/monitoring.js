// Server monitoring utility
import os from 'os';
import config from '../config.js';

// Utility functions to gather server info
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Calculate uptime in human-readable format
const formatUptime = (seconds) => {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const uptime = [];
  
  if (days > 0) uptime.push(`${days} day${days === 1 ? '' : 's'}`);
  if (hours > 0) uptime.push(`${hours} hour${hours === 1 ? '' : 's'}`);
  if (minutes > 0) uptime.push(`${minutes} minute${minutes === 1 ? '' : 's'}`);
  
  return uptime.join(', ');
};

// Get server stats
export const getServerStats = () => {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const memoryUsage = (usedMem / totalMem * 100).toFixed(1);
  
  const cpuCount = os.cpus().length;
  const uptime = formatUptime(os.uptime());
  
  return {
    hostname: os.hostname(),
    platform: os.platform(),
    cpus: cpuCount,
    architecture: os.arch(),
    memoryTotal: formatBytes(totalMem),
    memoryFree: formatBytes(freeMem),
    memoryUsed: formatBytes(usedMem),
    memoryUsagePercent: `${memoryUsage}%`,
    uptime: uptime,
    nodeVersion: process.version,
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
    port: config.port
  };
};

// Track request metrics
let requestStats = {
  totalRequests: 0,
  apiRequests: 0,
  successfulApiRequests: 0,
  failedApiRequests: 0,
  lastError: null,
  startTime: new Date()
};

export const trackRequest = (req, isApi = false) => {
  requestStats.totalRequests++;
  if (isApi) {
    requestStats.apiRequests++;
  }
};

export const trackApiSuccess = () => {
  requestStats.successfulApiRequests++;
};

export const trackApiFailure = (error) => {
  requestStats.failedApiRequests++;
  requestStats.lastError = {
    message: error.message,
    timestamp: new Date().toISOString()
  };
};

export const getRequestStats = () => {
  const uptime = (new Date() - requestStats.startTime) / 1000;
  return {
    ...requestStats,
    uptime: formatUptime(uptime),
    requestsPerMinute: (requestStats.totalRequests / (uptime / 60)).toFixed(2),
    apiRequestsPerMinute: (requestStats.apiRequests / (uptime / 60)).toFixed(2),
    apiSuccessRate: ((requestStats.successfulApiRequests / requestStats.apiRequests) * 100 || 0).toFixed(2) + '%'
  };
};
