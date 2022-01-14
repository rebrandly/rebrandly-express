const url = require('url');

const rewrite = (req, alias) => {
    const params = new url.URLSearchParams(req.query);
    params.append("rb.routing.mode", "aliasing");
    return new URL(`https://${alias}${req.path || "/"}?${params}`).toString()
}

exports.rewrite = rewrite;