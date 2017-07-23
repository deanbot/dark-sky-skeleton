# dark-sky-skeleton

*Based on Elias Hussary's [dark-sky](https://github.com/eliash91/dark-sky).*

An isomorphic barebones js wrapper library for Dark Sky API (previously known as Forecast.io). See Dark Sky developer docs: [https://darksky.net/dev/docs](https://darksky.net/dev/docs).

For a more robust solution see [dark-sky-api](https://github.com/deanbot/dark-sky-api).

## Install it

```
 npm install dark-sky-skeleton
```

## Client Side Setup

### Import it

```javascript
import DarkSkySkeleton from 'dark-sky-skeleton';
```

### Initialize it

`DarkSkySkeleton(apiKey, proxy)`

```javascript
const api = new DarkSkySkeleton('your-dark-sky-api-key');
```

#### Experimental (untested - help wanted)
The above is simple and great for testing, but it exposes your api key in client side requests. Using a server-side proxy to make the actual api call to dark sky and is highly suggested as this hides the API key from client side requests [[ref](https://darksky.net/dev/docs/faq#cross-origin)]. 

The proxy in this would receive a request issued by dark-sky-api and attach this query to a base uri (like the following: `https://api.darksky.net/forecast/your-api-key`) prior to returning a final request.

```javascript
import DarkSkySkeleton from 'dark-sky-skeleton';
const api = new DarkSkySkeleton(false, '//base-url-to-proxy/service');
```

## Server Side Setup

### Import it

```javascript
const DarkSkySkeleton = require('dark-sky-skeleton');
```

### Initialize it

`DarkSkySkeleton(apiKey, proxy)`

```javascript
const api = new DarkSkySkeleton('your-dark-sky-api-key', true);
```

Passing true as the proxy parameter indicates that the caller is server-side (_and essentially a proxy_).

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

### Make use of excludes

"Exclude some number of data blocks from the API response. This is useful for reducing latency and saving cache space ([see 'Request Parameters'](https://darksky.net/dev/docs/forecast))."

```javascript
const excludes = ['alerts', 'currently', 'daily', 'flags', 'hourly', 'minutely'],
  exludesBlock = excludes.filter(val => val != 'currently').join(',')
darkSky.latitude(lat)
  .longitude(long)
  .exclude(excludesBlock)
  .get()
  .then(data => console.log(data));
```