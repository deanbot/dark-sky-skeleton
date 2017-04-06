# dark-sky-skeleton

*Based on Elias Hussary's [dark-sky](https://github.com/eliash91/dark-sky).*

A barebones wrapper library for Dark Sky API (previously known as Forecast.io). See Dark Sky developer docs: [https://darksky.net/dev/docs](https://darksky.net/dev/docs).

For a more robust solution see [dark-sky-api](https://github.com/deanbot/dark-sky-api).

### Install it

```
 npm install dark-sky-skeleton
```

### Require it

```javascript
import darkSkyApi from 'dark-sky-skeleton';
```

### Initialize it

While dark-sky-skeleton allows embedding api keys through use of jsonp on the backend using a proxy to make the api call is highly suggested as this hides the API key from client side requests [[ref](https://darksky.net/dev/docs/faq#cross-origin)]. 

* proxy url is optional
* pass an empty string or false for api key if using proxy url

```javascript
const darkSky = new darkSkyApi('your-dark-sky-api-key', '//base-url-to-proxy/service');
```

### Use it

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
const darkSky = new darkSkyApi('your-dark-sky-api-key');
darkSky.latitude(lat)
  .longitude(long);

darkSky.get();
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


## TODO 

* reset query params when appropriate
* add testing