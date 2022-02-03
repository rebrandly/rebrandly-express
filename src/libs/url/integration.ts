import { Request } from 'express';
import { extractSearchParamsFromRequest } from './shared';

export const loopDetected = (req: Request) => {
    const params = extractSearchParamsFromRequest(req);
    return params.has('rb.routing.mode') && params.get('rb.routing.mode') == 'aliasing';
};
