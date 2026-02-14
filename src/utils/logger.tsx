const { NODE_ENV, DEBUG } = process.env;

const logger = {
  debug: (message?: any, ...optionalParams: any[]) => {
    if (DEBUG) {
      console.debug(message, ...optionalParams);
    }
  },
  groupCollapsed: (...label: any[]) => {
    if (NODE_ENV === "development") {
      console.groupCollapsed(...label);
    }
  },
  groupEnd: () => {
    console.groupEnd();
  },
  warn: (message?: any, ...optionalParams: any[]) => {
    if (NODE_ENV === "development") {
      console.warn(message, ...optionalParams);
    }
  },
};

export default logger;
