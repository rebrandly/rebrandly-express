# rebrandly-express
Seamlessly connect your web server to Rebrandly so that you can re-use your domain name for both your app and your short links

[Rebrandly](https://rebrandly.com) innovated the way individuals and companies share links,  
introducing Branded Links and providing an easy way for everyone to define meaningful links using their custom domain name.

Rebrandly embraced a mission to have you create Branded Links using the same domain name you use for your email and website,
so that you are no longer supposed to dedicate an entire spare domain name to your short links:
just use the .com you already have both for your website and short links!

The `rebrandly-express` router is a middleware you can use in your NodeJS projects using Express router,  
so that you can extend your web server's routes remotely after you have deployed the app
by creating new links with this domain name in your Rebrandly account.

## install

```
> npm install rebrandly-express
```

## How it works

Whenever your web server is unable to match the HTTP request with any defined route of your web app,  
this middleware will delegate to Rebrandly the handling of the request:  
If a matching Branded Link is found in your Rebrandly account, your visitor will be redirected there.

### Keep your flow the same
This module is completely transparent to your existing flow and is 100% safe to add on top of what you have:  
whenever it detects that there is no match neither in your app nor in Rebrandly,  
your standard 404 routing will be selected as next page and your visitors will be served your 404 page as before.

### Easy configuration
Subscribe to Rebrandly and connect a domain name you have, or register a new one.
Make sure to turn on the "Aliasing" feature for the domain.

While adding the middleware to your web server,  
configure it with the alias for your branded domain

```
const rebrandlyRouter = require("rebrandly-express");

// replace alias with your own alias
const options = { "alias": "46e8ac9583d7e0c513485aef06045733.rebrandly.cc" };

const fallbackToRebrandly = rebrandlyRouter(options);

// init your app as usual and add your middlewares
...

// then add Rebrandly right before your latest catchall rule for 404
app.use(fallbackToRebrandly);
app.use('*', your404Handler);

```

Example HTTP server with module installed: [https://github.com/rebrandly/rebrandly-express-demo](https://github.com/rebrandly/rebrandly-express-demo)
