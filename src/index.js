const url = require('url');
const os = require("os");

const transformURL = (req, alias) => {
    const params = new url.URLSearchParams(req.query);
    params.append("rb.routing.mode", "aliasing");
    return new URL(`https://${alias}${req.path || "/"}?${params}`)
}

const loopDetected = (req) => {
    const params = new url.URLSearchParams(req.query);
    return params.has("rb.routing.mode") && params.get("rb.routing.mode") == "aliasing";
}

const setup = (options) => {
    options = options || {}
    let log = options.log || console.log
    let alias = options.alias || os.hostname();
    
    const aliasing = (req, res, next) => {
        let nextUrl = transformURL(req, alias);
        if (options.dryRun) {
            log(`[Rebrandly][DRY] Redirecting to ${nextUrl} ...`)
            return next();
        }
        return res.redirect(nextUrl);
    }

    return function (req, res, next) {
        if (options.skip) {
            return next();
        }

        if (loopDetected(req)) {
            return next();
        }
        return aliasing(req, res, next);
    };
};

module.exports = setup;