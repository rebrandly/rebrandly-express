import { URLSearchParams } from 'url';
import { Request } from 'express';

export const extractSearchParamsFromRequest = (req: Request): URLSearchParams => {
    const params = new URLSearchParams();

    if (req.query) {
        for (const [k, v] of Object.entries(req.query)) {
            if (v !== undefined) {
                params.append(k, v.toString());
            }
        }
    }

    return params;
};
