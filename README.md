# rebrandly-express
extend your Express.js web server with Rebrandly and have your team define new 301-redirects remotely


[Rebrandly](https://rebrandly.com) innovated the way individuals and companies share links,  
introducing Branded Links and providing an easy way for everyone to define meaningful links using their custom domain name.

The `rebrandly-express` router is a middleware you can use in your NodeJS projects using Express router,  
so that you can extend your web server's routes remotely after you have deployed the app.

## install

```
> npm install rebrandly-express [TODO]
```

## How it works

Whenever your web server is unable to match the HTTP request with any defined route of your web app,  
this middleware will delegate to Rebrandly the handling of the request:  
If a matching Branded Link is found in your Rebrandly account, your visitor will be redirected there.

### Keep your flow the same
This module is completely transparent to your existing flow and is 100% safe to add on top of what you have:  
whenever it detects that there is no match neither in your app nor in Rebrandly,  
your standard 404 routing will be selected as next page and your visitors will be served your 404 page.

### Easy configuration
Subscribe to Rebrandly and connect a domain name you have, or register a new one.
Make sure to turn on the "Aliasing" feature for the domain.

While adding the middleware to your web server,  
configure it with the name of your Branded Domain
```
const rebrandlyRouter = require("rebrandly-express");

const options = { "domain": "acme.link", "alias": "xxxxxxxxx.rebrandly.cc" };
const acmeRouter = rebrandlyRouter(options);

...
app.use(acmeRouter);

```
