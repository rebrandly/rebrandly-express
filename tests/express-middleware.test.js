const middleware = require("../src/index");
const chai = require("chai");
const expect = chai.expect;

describe('Rebrandly middleware', () => {

    it("should return a 302-redirect to a transformed URL when matching", (done) => {
        const alias = "alias.rebrandly.cc";
        const matchingMiddleware = middleware({
            alias
        })

        let noOp = () => { 
            return done(new Error("has not performed any action")) 
        };
        let wrongOp = () => {
            return done(new Error("has returned a non-302 response to the client"))
        }
        let expectedOp = (code, URL) => {
            expect(code).to.be.equal(302);
            expect(URL).to.be.equal(`https://${alias}/demo?rb.routing.mode=aliasing`)
            return done();
        };
        let req = { path: "/demo" }
        let res = { redirect: expectedOp, json: wrongOp }
        let next = noOp;
        matchingMiddleware(req, res, next);
    })

    it("should execute with no-op when not matching", (done) => {
        const disabledMiddleware = middleware({
            skip: true
        })

        let noOp = () => { return done() };
        let op = () => {
            return done(new Error("has returned to client rather than proceeding"))
        };
        let req = {}
        let res = { redirect: op, json: op }
        let next = noOp;
        disabledMiddleware(req, res, next)
    })

    it("should run only print a message when running in dry mode", (done) => {
        const dryRunMiddleware = middleware({
            dryRun: true,
            log: (text) => {
                expect(text).to.be.not.empty;
            }
        })

        let noOp = () => { return done() };
        let op = () => {
            return done(new Error("has returned to client rather than proceeding"))
        };
        let req = {}
        let res = { redirect: op, json: op }
        let next = noOp;
        dryRunMiddleware(req, res, next)
    })

    it("should prevent redirection loops from happening when no branded link is found in Rebrandly", (done) => {
        const loopAwareMiddleware = middleware();
        let noOp = () => { return done() };
        let op = () => {
            return done(new Error("has returned to client rather than proceeding"))
        };
        const specialQueryParameters = { "rb.routing.mode": "aliasing" }; 
        let req = {query: specialQueryParameters };
        let res = { redirect: op, json: op }
        let next = noOp;
        loopAwareMiddleware(req, res, next)
    })
});
