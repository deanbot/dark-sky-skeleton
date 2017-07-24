# dark-sky-skeleton

*Based on Elias Hussary's [dark-sky](https://github.com/eliash91/dark-sky).*

A barebones isomorphic js wrapper library for Dark Sky API (previously known as Forecast.io). See Dark Sky developer docs: [https://darksky.net/dev/docs](https://darksky.net/dev/docs).

For a more robust solution see [dark-sky-api](https://github.com/deanbot/dark-sky-api).

You can use dark-sky-skeleton client-side __OR__ server-side. Note: an example of a server side proxy used with client side dark-sky-skeleton is forthecoming...

## Install it

```
 npm install dark-sky-skeleton
```

## Import it

```javascript
import DarkSkySkeleton from 'dark-sky-skeleton';
```

or Common JS

```javascript
const DarkSkySkeleton = require('dark-sky-skeleton');
```

## Initialize it

`DarkSkySkeleton(apiKey, proxy)`
- {string|bool} apiKey - your Dark Sky api key or false if using proxy
- {string|bool} [proxy] - optional URL to proxy service or true if running server-side

### Client-side Setup

```javascript
const api = new DarkSkySkeleton('your-dark-sky-api-key');
```

#### Proxy URL - Client-side be warned!

The above is simple and great for testing, but your api key is exposed in every request (when running in client-side). Using a separate server-side proxy to make the actual api call to dark sky is highly suggested as this hides the api key. [[ref](https://darksky.net/dev/docs/faq#cross-origin)]. 

To use a proxy set your api-key to false or an empty string, and pass a URL to the proxy service as the proxy (second) param.

```javascript
const api = new DarkSkySkeleton(false, '//base-url-to-proxy/service');
```

##### Experimental (help wanted)

dark-sky-skeleton theoretically supports a proxy service (aka untested). A proxy service would receive a request issued by dark-sky-skeleton, attach this query to a base URI (like the following: `https://api.darksky.net/forecast/your-api-key`), and return a final request.

### Server Side Setup

```javascript
const api = new DarkSkySkeleton('your-dark-sky-api-key', true);
```

Passing true as the proxy parameter indicates that the caller is server-side. Awesome!

## Use it

```javascript
darkSky.latitude(lat)
  .longitude(long)
  .units('us')
  .language('en')
  .time('2000-04-06T12:20:05') // moment().year(2000).format('YYYY-MM-DDTHH:mm:ss')
  .extendHourly(true)
  .get();
  .then(data => console.log(data));
```

Feel free to omit setting of latitude and longitude for subsequent calls i.e.:

```javascript
darkSky.latitude(lat)
  .longitude(long)
  .get()
  .then(data => console.log(data));

darkSky.get().then(data => console.log(data));
```

## Make use of excludes

"Exclude some number of data blocks from the api response. This is useful for reducing latency and saving cache space ([see 'Request Parameters'](https://darksky.net/dev/docs/forecast))."

```javascript
const excludes = ['alerts', 'currently', 'daily', 'flags', 'hoURLy', 'minutely'],
  exludesBlock = excludes.filter(val => val != 'currently').join(',')
darkSky.latitude(lat)
  .longitude(long)
  .exclude(excludesBlock)
  .get()
  .then(data => console.log(data));
```