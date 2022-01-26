import { URLSearchParams } from 'url';
import { Request } from 'express';

export const extractSearchParamsFromRequest = (req: Request): URLSearchParams => {
    const params = new URLSearchParams();

    for (const [k, v] of Object.entries(req.query)) {
        if (v) {
            params.append(k, v.toString());
        }
    }

    return params;
};
