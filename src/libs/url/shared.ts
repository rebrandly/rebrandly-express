import { URLSearchParams } from 'url';
import { Request } from 'express';

export const extractSearchParamsFromRequest = (req: Request): URLSearchParams => {
    const params = new URLSearchParams();

    for (const [k, v] of Object.entries(req.query)) {
        if (typeof(v) === 'string') {
            params.append(k, v);
        }
    }

    return params;
};
