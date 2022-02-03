import express from 'express';
import supertest from 'supertest';
import { Request, Response } from 'express';
import { createExpressMiddleware } from '../index';

describe('Rebrandly middleware', () => {
    jest.setTimeout(60000);

    it('should return a 302-redirect to a transformed URL when matching', async () => {
        const app = express();
        const request = supertest(app);
        const alias = "alias.rebrandly.cc";
        const path = '/demo';
        const rbMiddleware = createExpressMiddleware({ alias });

        app.use(rbMiddleware);
        app.get(path, (req, res) => res.send('OK'));

        const res = await request.get(path);
        const { statusCode, redirect, headers } = res;

        expect(statusCode).toBe(302);
        expect(redirect).toBe(true);
        expect(headers.location).toBe(`https://${alias}/demo?rb.routing.mode=aliasing`);
    });

    it('should execute with no-op when not matching', async () => {
        const app = express();
        const request = supertest(app);
        const path = '/';

        const rbMiddleware = createExpressMiddleware({
            skip: true,
        });

        app.use(rbMiddleware);
        app.get(path, (req, res) => res.send('OK'));

        const res = await request.get(path);
        const { statusCode, redirect, headers } = res;

        expect(statusCode).toBe(200);
        expect(redirect).toBe(false);
    });

    it('should run only print a message when running in dry mode', async () => {
        const app = express();
        const request = supertest(app);
        const alias = "alias.rebrandly.cc";
        const path = '/';

        const rbMiddleware = createExpressMiddleware({
            alias,
            dryRun: true,
            log: (text) => {
                expect(text).toBeDefined();
                expect(text.length).toBeGreaterThan(0);
            },
        });

        app.use(rbMiddleware);
        app.get(path, (req, res) => res.send('OK'));

        const res = await request.get(path);
        const { statusCode, redirect, headers } = res;

        expect(statusCode).toBe(200);
        expect(redirect).toBe(false);
    });

    it('should prevent redirection loops from happening when no branded link is found in Rebrandly', async () => {
        const app = express();
        const request = supertest(app);
        const alias = "alias.rebrandly.cc";
        const path = '/';
        const rbMiddleware = createExpressMiddleware({ alias });

        app.use(rbMiddleware);
        app.get(path, (req, res) => res.send('OK'));

        const res = await request.get(path).query({ 'rb.routing.mode': 'aliasing' })
        const { statusCode, redirect, headers } = res;

        expect(statusCode).toBe(200);
        expect(redirect).toBe(false);
    });
});
