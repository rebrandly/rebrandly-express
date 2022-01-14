const os = require("os");

const parseOptions = (options) => {
    options = options || {};
    return {
        log: options.log || console.log,
        alias: options.alias || os.hostname(),
        skip: options.skip || false,
        dryRun: options.dryRun || false
    }
}

exports.parseOptions = parseOptions;