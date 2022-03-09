import debugLib from 'debug';

const namespace = 'rebrandly';

const namespaces = {
    DEBUG: `${namespace}:debug`,
    INFO: `${namespace}:info`,
    WARN: `${namespace}:warn`,
    ERROR: `${namespace}:error`,
};

const logger = {
    debug: debugLib(namespaces.DEBUG),
    info: debugLib(namespaces.INFO),
    warn: debugLib(namespaces.WARN),
    error: debugLib(namespaces.ERROR),
    enable: () => {
        debugLib.enable(`${namespace}:*`);
    },
    disable: () => {
        debugLib.disable();
    },
    enableDebug: () => {
        debugLib.enable(`${namespace}:*`);
    },
    enableInfo: () => {
        debugLib.enable(`${namespaces.INFO},${namespaces.WARN},${namespaces.ERROR}`);
    },
    enableWarn: () => {
        debugLib.enable(`${namespaces.WARN},${namespaces.ERROR}`);
    },
    enableError: () => {
        debugLib.enable(namespaces.ERROR);
    },
};

switch (process.env.RB_LOG) {
    case namespaces.ERROR:
        logger.enableError();
        break;
    case namespaces.WARN:
        logger.enableWarn();
        break;
    case namespaces.INFO:
        logger.enableInfo();
        break;
    case namespaces.DEBUG:
        logger.enableDebug();
        break;
    default:
        logger.enableInfo();
}

// Bind INFO to console (default is stderr)
logger.info.log = console.log.bind(console);

export { logger };
