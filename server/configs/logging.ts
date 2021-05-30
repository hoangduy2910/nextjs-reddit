import chalk from "chalk";

const INFO = (namespace: string, message: string, object?: any) => {
  const date = getTimeStamp();
  const messageType = chalk.bold.blueBright("[INFO]");

  if (object) {
    console.log(`[${date}] ${messageType} [${namespace}] ${message}`, object);
  } else {
    console.log(`[${date}] ${messageType} [${namespace}] ${message}`);
  }
};

const WARN = (namespace: string, message: string, object?: any) => {
  const date = getTimeStamp();
  const messageType = chalk.bold.yellowBright("[WARN]");

  if (object) {
    console.log(`[${date}] ${messageType} [${namespace}] ${message}`, object);
  } else {
    console.log(`[${date}] ${messageType} [${namespace}] ${message}`);
  }
};

const ERROR = (namespace: string, message: string, object?: any) => {
  const date = getTimeStamp();
  const messageType = chalk.bold.redBright("[ERROR]");

  if (object) {
    console.log(`[${date}] ${messageType} [${namespace}] ${message}`, object);
  } else {
    console.log(`[${date}] ${messageType} [${namespace}] ${message}`);
  }
};

const DEBUG = (namespace: string, message: string, object?: any) => {
  const date = getTimeStamp();
  const messageType = chalk.bold.greenBright("[DEBUG]");

  if (object) {
    console.log(`[${date}] ${messageType} [${namespace}] ${message}`, object);
  } else {
    console.log(`[${date}] ${messageType} [${namespace}] ${message}`);
  }
};

const getTimeStamp = (): string => {
  return new Date().toISOString();
};

export default {
  INFO,
  WARN,
  ERROR,
  DEBUG,
};
