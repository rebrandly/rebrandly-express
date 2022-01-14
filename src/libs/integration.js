const url = require('url');

const loopDetected = (req) => {
    const params = new url.URLSearchParams(req.query);
    return params.has("rb.routing.mode") && params.get("rb.routing.mode") == "aliasing";
}

exports.loopDetected = loopDetected;