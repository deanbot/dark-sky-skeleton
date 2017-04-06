'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _fetchJsonp = require('fetch-jsonp');

var _fetchJsonp2 = _interopRequireDefault(_fetchJsonp);

var _whatwgFetch = require('whatwg-fetch');

var _whatwgFetch2 = _interopRequireDefault(_whatwgFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DarkSkyApi = function () {
  function DarkSkyApi(apiKey, proxyUrl) {
    _classCallCheck(this, DarkSkyApi);

    this.proxyUrl = proxyUrl || '';
    this.apiKey = apiKey || '';
    this._longitude = null;
    this._latitude = null;
    this._time = null;
    this.query = {};
  }

  _createClass(DarkSkyApi, [{
    key: 'longitude',
    value: function longitude(long) {
      !long ? null : this._longitude = long;
      return this;
    }
  }, {
    key: 'latitude',
    value: function latitude(lat) {
      !lat ? null : this._latitude = lat;
      return this;
    }

    /**
     * @param {string} time - 'YYYY-MM-DDTHH:mm:ss'
     */

  }, {
    key: 'time',
    value: function time(_time) {
      !_time ? null : this._time = _time;
      return this;
    }
  }, {
    key: 'units',
    value: function units(unit) {
      !unit ? null : this.query.units = unit;
      return this;
    }
  }, {
    key: 'language',
    value: function language(lang) {
      !lang ? null : this.query.lang = lang;
      return this;
    }
  }, {
    key: 'exclude',
    value: function exclude(blocks) {
      !blocks ? null : this.query.exclude = blocks;
      return this;
    }

    // not on currently requests

  }, {
    key: 'extendHourly',
    value: function extendHourly(param) {
      !param ? null : this.query.extend = 'hourly';
      return this;
    }
  }, {
    key: 'generateReqUrl',
    value: function generateReqUrl() {
      var baseUrl = this.proxyUrl ? this.proxyUrl : 'https://api.darksky.net/forecast/' + this.apiKey;
      this.url = baseUrl + '/' + this._latitude + ',' + this._longitude;
      this._time ? this.url += ',' + this._time : this.url;
      !this.isEmpty(this.query) ? this.url += '?' + _queryString2.default.stringify(this.query) : this.url;
    }
  }, {
    key: 'get',
    value: function get() {
      if (!this._latitude || !this._longitude) {
        return new Promise(function (resolve, reject) {
          reject("Request not sent. ERROR: Longitute or Latitude is missing.");
        });
      }
      this.generateReqUrl();

      var query = this.proxyUrl ? (0, _whatwgFetch2.default)(this.url) : (0, _fetchJsonp2.default)(this.url);

      return query.then(function (response) {
        return response.json();
      }).then(function (json) {
        return json;
      }).catch(function (ex) {
        return ex;
      });
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }
  }]);

  return DarkSkyApi;
}();

exports.default = DarkSkyApi;
