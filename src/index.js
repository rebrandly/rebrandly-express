const { rewrite } = require("./libs/rewriting");
const { loopDetected } = require("./libs/integration");
const { parseOptions } = require("./libs/defaulting");

const setup = (options) => {
    let { log, alias, dryRun, skip } = parseOptions(options); 
       
    const aliasing = (req, res, next) => {
        let nextUrl = rewrite(req, alias);
        if (dryRun) {
            log(`[Rebrandly][DRY] Redirecting to ${nextUrl} ...`)
            return next();
        }
        return res.redirect(nextUrl);
    }

    return function (req, res, next) {
        if (skip) {
            return next();
        }

        if (loopDetected(req)) {
            return next();
        }
        return aliasing(req, res, next);
    };
};

module.exports = setup;