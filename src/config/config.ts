import os from 'os';

export interface ConfigOptions {
    alias?: string,
    skip?: boolean,
    dryRun?: boolean,
    log?: (...data: any[]) => void,
}

const defaultOptions: ConfigOptions = {
    alias: os.hostname(),
    skip: false,
    dryRun: false,
    log: console.log,
}

export const parseOptions = (options?: ConfigOptions): ConfigOptions => {
    if (options) {
        return {
            ...defaultOptions,
            ...options,
        };
    }

    return { ...defaultOptions };
};
