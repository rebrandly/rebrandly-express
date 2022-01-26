// const chai = require("chai");
// const { assert } = require("console");
// const expect = chai.expect;
// const { rewrite } = require("./../src/libs/rewriting");
//
// describe('URL rewriting', () => {
//     const alias = "alias-xyz.rebrandly.cc";
//     const specialParameter = "rb.routing.mode=aliasing"
//
//     it("should transform basic URL with no query params", (done) => {
//         let mockReq = {
//             path: "/promo",
//             query: ""
//         }
//         let expectedUrl = `https://${alias}/promo?${specialParameter}`
//         expect(rewrite(mockReq, alias)).to.be.equal(expectedUrl)
//         done()
//     })
//
//     it("should ignore protocol and force https after rewriting", (done) => {
//         let mockReq = {
//             path: "/promo",
//             query: "",
//             protocol: "http"
//         }
//         let expectedUrl = `https://${alias}/promo?${specialParameter}`
//         expect(rewrite(mockReq, alias)).to.be.equal(expectedUrl)
//         done()
//     })
//
//     it("should preserve query parameters after rewriting", (done) => {
//         let mockReq = {
//             path: "/promo",
//             query: "?super=true",
//             protocol: "http"
//         }
//         let expectedUrl = `https://${alias}/promo?super=true&${specialParameter}`
//         expect(rewrite(mockReq, alias)).to.be.equal(expectedUrl)
//         done()
//     })
//
//
// });
