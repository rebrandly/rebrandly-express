import { Request, Response } from 'express';
import { createExpressMiddleware } from '../index';

describe('Rebrandly middleware', () => {
    jest.setTimeout(60000);

    it('should return a 302-redirect to a transformed URL when matching', () => {
        const alias = "alias.rebrandly.cc";

        const rbMiddleware = createExpressMiddleware({
            alias,
        });

        const noOp = () => {
            return new Error('has not performed any action');
        };

        const wrongOp = () => {
            return new Error('has returned a non-302 response to the client');
        }

        const expectedOp = (statusCode: number, url: string) => {
            expect(statusCode).toBe(302);
            expect(url).toBe(`https://${alias}/demo?rb.routing.mode=aliasing`);
        };

        const req = { path: '/demo' } as unknown as Request;
        const res = { redirect: expectedOp, json: wrongOp } as unknown as Response;
        const next = noOp;

        rbMiddleware(req, res, next);
    });

    it('should execute with no-op when not matching', () => {
        const rbMiddleware = createExpressMiddleware({
            skip: true,
        });

        const noOp = () => {};

        const op = () => {
            return new Error('has returned to client rather than proceeding');
        };

        const req = {} as unknown as Request;
        const res = { redirect: op, json: op } as unknown as Response;
        const next = noOp;

        rbMiddleware(req, res, next);
    });

    it('should run only print a message when running in dry mode', () => {
        const rbMiddleware = createExpressMiddleware({
            dryRun: true,
            log: (text) => {
                expect(text).toBeDefined();
                expect(text.length).toBeGreaterThan(0);
            },
        });

        const noOp = () => {};

        const op = () => {
            return new Error('has returned to client rather than proceeding');
        };

        const req = {} as unknown as Request;
        const res = { redirect: op, json: op } as unknown as Response;
        const next = noOp;

        rbMiddleware(req, res, next);
    });

    it('should prevent redirection loops from happening when no branded link is found in Rebrandly', () => {
        const rbMiddleware = createExpressMiddleware();

        const noOp = () => {};

        const op = () => {
            return new Error('has returned to client rather than proceeding');
        };

        const specialQueryParameters = { 'rb.routing.mode': 'aliasing' };
        const req = { query: specialQueryParameters } as unknown as Request;
        const res = { redirect: op, json: op } as unknown as Response;
        const next = noOp;

        rbMiddleware(req, res, next);
    })

});
