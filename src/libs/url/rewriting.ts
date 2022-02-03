import { Request } from 'express';
import { extractSearchParamsFromRequest } from './shared';

export const rewrite = (req: Request, alias: string) => {
    const params = extractSearchParamsFromRequest(req);
    params.append('rb.routing.mode', 'aliasing');
    return new URL(`https://${alias}${req.path || '/'}?${params}`).toString();
};
