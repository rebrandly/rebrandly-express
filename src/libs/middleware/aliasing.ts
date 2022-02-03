import { Request, Response, NextFunction } from 'express';
import { ConfigOptions } from '../../config';
import { rewrite, loopDetected } from '../url';

type ExpressMiddleware = (req: Request, res: Response, next: NextFunction) => any;

const TEMPORARY_REDIRECT = 302;

export const createAliasingMiddleware = (options: ConfigOptions): ExpressMiddleware => {
    const {
        alias,
        skip,
        dryRun,
        log,
    } = options;

    return (req: Request, res: Response, next: NextFunction) => {
        if (skip) {
            return next();
        }

        if (loopDetected(req)) {
            return next();
        }

        const nextUrl = rewrite(req, alias!);

        if (dryRun) {
            log!(`[Rebrandly][DRY] Redirecting to ${nextUrl} ...`);
            return next();
        }

        return res.redirect(TEMPORARY_REDIRECT, nextUrl);
    };
}
