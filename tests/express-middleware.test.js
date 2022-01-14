const middleware = require("../src/index");
const chai = require("chai");
const expect = chai.expect;

console.log(middleware)
describe('Rebrandly middleware', () => {

    it("should execute with no-op", (done) => {
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

    it("should run in dry mode and only print a message", (done) => {
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

    it("should prevent redirection loops from happening when no link is found", (done) => {
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