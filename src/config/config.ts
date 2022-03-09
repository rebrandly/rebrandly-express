import { verify, decode, JwtPayload } from 'jsonwebtoken';
import { logger } from '../libs/log/logger';

export interface JwtRebrandlyPayload extends JwtPayload {
    alias: string;
    // TODO add other fields (e.g. email, account_public_id, etc)
}

export interface ConfigOptions {
    alias?: string,
    token?: string,
    skip?: boolean,
    dryRun?: boolean,
    log?: (...data: any[]) => void,
}

const publicKey = ''; // TODO: fill value

const defaultOptions: ConfigOptions = {
    skip: false,
    dryRun: false,
    log: logger.info,
};

const skipOptions: ConfigOptions = {
    skip: true,
    log: logger.info,
};

export const parseOptions = (options?: ConfigOptions): ConfigOptions => {
    if (!options) {
        logger.warn(`No configuration options provided: skip mode enabled.`)
        return { ...skipOptions };
    }

    const { alias, token } = options;

    if (!alias && !token) {
        logger.warn(`No alias or token found in configuration options: skip mode enabled.`)
        return { ...skipOptions };
    }

    if (token) {
        try {
            verify(token, publicKey);
        }
        catch(err) {
            logger.warn(`Invalid token: skip mode enabled.`);
            return { ...skipOptions };
        }

        const decoded = decode(token) as JwtRebrandlyPayload;

        if (!decoded.alias) {
            logger.warn(`Invalid token (missing alias field): skip mode enabled.`);
            return { ...skipOptions };
        }

        options.alias = decoded.alias;

        return {
            ...defaultOptions,
            ...options,
        };
    }

    return {
        ...defaultOptions,
        ...options,
    };
};
