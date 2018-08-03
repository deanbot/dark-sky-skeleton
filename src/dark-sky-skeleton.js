import fetchJsonp from 'fetch-jsonp';
import fetch from 'isomorphic-fetch';
import queryString from 'query-string';

class DarkSkySkeleton {
  constructor(apiKey, proxy) {
    this.proxy = proxy || '';
    this.apiKey = apiKey || '';
    this._longitude = null;
    this._latitude = null;
    this._time = null;
    this.query = {};
  }

  longitude(long) {
    !long ? null : this._longitude = long;
    return this;
  }

  latitude(lat) {
    !lat ? null : this._latitude = lat;
    return this;
  }

  /**
   * @param {string} time - 'YYYY-MM-DDTHH:mm:ss'
   */
  time(time) {
    this._time = time;
    return this;
  }

  units(unit) {
    !unit ? null : this.query.units = unit;
    return this;
  }

  language(lang) {
    !lang ? null : this.query.lang = lang;
    return this;
  }

  exclude(blocks) {
    this.query.exclude = blocks;
    return this;
  }

  // not on currently requests
  extendHourly(param) {
    if (!!param) {
      this.query.extend = 'hourly';
    } else {
      if (this.query.hasOwnProperty('extend')) {
        delete this.query.extend;
      }
    }
    return this;
  }

  generateReqUrl() {
    const baseUrl = this.proxy && this.proxy !== true ? this.proxy : `https://api.darksky.net/forecast/${this.apiKey}`;
    this.url = `${baseUrl}/${this._latitude},${this._longitude}`;
    this._time
      ? this.url += `,${this._time}`
      : this.url;
    !this.isEmpty(this.query)
      ? this.url += `?${queryString.stringify(this.query)}`
      : this.url;
  }

  get() {
    if (!this._latitude || !this._longitude) {
      return new Promise((resolve, reject) => {
        reject('Request not sent. ERROR: Longitute or Latitude is missing.');
      });
    }
    this.generateReqUrl();

    const query = this.proxy ? fetch(this.url) : fetchJsonp(this.url);

    return query.then(function (response) {
      return response.json();
    }).then(function (json) {
      return json;
    }).catch(function (ex) {
      return ex;
    });
  }

  isEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
}
export default DarkSkySkeleton;