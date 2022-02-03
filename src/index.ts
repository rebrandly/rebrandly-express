import { parseOptions, ConfigOptions } from './config';
import { createAliasingMiddleware } from './libs/middleware';

export const createExpressMiddleware = (options?: ConfigOptions) => {
    return createAliasingMiddleware(parseOptions(options));
};
