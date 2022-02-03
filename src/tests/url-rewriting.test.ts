import { rewrite } from '../libs/url';
import { Request } from 'express';

describe('URL rewriting', () => {
    const alias = 'alias-xyz.rebrandly.cc';
    const specialParameter = 'rb.routing.mode=aliasing';

    it('should transform basic URL with no query params', () => {
        const mockReq = {
            path: '/promo',
            query: {},
        } as unknown as Request;

        const expectedUrl = `https://${alias}/promo?${specialParameter}`;
        expect(rewrite(mockReq, alias)).toBe(expectedUrl);
    });

    it('should ignore protocol and force https after rewriting', () => {
        const mockReq = {
            path: '/promo',
            query: {},
            protocol: 'http'
        } as unknown as Request;

        const expectedUrl = `https://${alias}/promo?${specialParameter}`;
        expect(rewrite(mockReq, alias)).toBe(expectedUrl);
    });

    it('should preserve query parameters after rewriting', () => {
        const mockReq = {
            path: '/promo',
            query: {
                super: true,
            },
            protocol: 'http'
        } as unknown as Request;

        const expectedUrl = `https://${alias}/promo?super=true&${specialParameter}`;
        expect(rewrite(mockReq, alias)).toBe(expectedUrl);
    });
});
