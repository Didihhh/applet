! function(t, e) {
  "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.BaaS = e() : t.BaaS = e()
}(window, function() {
  return function(t) {
    var e = {};

    function n(r) {
      if (e[r]) return e[r].exports;
      var o = e[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    return n.m = t, n.c = e, n.d = function(t, e, r) {
      n.o(t, e) || Object.defineProperty(t, e, {
        enumerable: !0,
        get: r
      })
    }, n.r = function(t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      })
    }, n.t = function(t, e) {
      if (1 & e && (t = n(t)), 8 & e) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (n.r(r), Object.defineProperty(r, "default", {
          enumerable: !0,
          value: t
        }), 2 & e && "string" != typeof t)
        for (var o in t) n.d(r, o, function(e) {
          return t[e]
        }.bind(null, o));
      return r
    }, n.n = function(t) {
      var e = t && t.__esModule ? function() {
        return t.default
      } : function() {
        return t
      };
      return n.d(e, "a", e), e
    }, n.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 31)
  }([function(t, e, n) {
    (function(e) {
      var r = e.BaaS || {};
      r._config = n(17), r._polyfill = n(18), r.use = function(t) {
        return t(r)
      }, t.exports = r
    }).call(this, n(10))
  }, function(t, e, n) {
    function r(t) {
      return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      })(t)
    }
    var o = n(5),
      i = n(3),
      a = n(0),
      u = n(2),
      s = n(20),
      c = function(t) {
        return s({
          level: t
        })
      },
      f = c(i.LOG_LEVEL.ERROR);
    Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
      value: function(t, e) {
        if (null == this) throw new TypeError('"this" is null or not defined');
        var n = Object(this),
          r = n.length >>> 0;
        if (0 === r) return !1;
        var o, i, a = 0 | e,
          u = Math.max(a >= 0 ? a : r - Math.abs(a), 0);
        for (; u < r;) {
          if ((o = n[u]) === (i = t) || "number" == typeof o && "number" == typeof i && isNaN(o) && isNaN(i)) return !0;
          u++
        }
        return !1
      }
    });
    var l = function(t, e) {
        for (var n in e = e || {}) {
          var r = new RegExp(":" + n, "g");
          t = t.replace(r, encodeURIComponent(e[n]))
        }
        return t.replace(/([^:])\/\//g, function(t, e) {
          return e + "/"
        })
      },
      h = function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          e = a._config.REQUEST_PARAMS_MAP,
          n = Object.assign({}, t);
        return Object.keys(t).map(function(r) {
          Object.keys(e).map(function(o) {
            if (r.startsWith(o)) {
              var i = r.replace(o, e[o]);
              delete n[r], n[i] = t[r]
            }
          })
        }), n
      },
      p = function(t) {
        var e = "";
        return 404 === t.statusCode ? e = "not found" : t.data.error_msg ? e = t.data.error_msg : t.data.message && (e = t.data.message), e
      },
      d = function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
      },
      y = function t(e) {
        if (null == e) return Object.create(null);
        var n = d(e) ? [] : Object.create(Object.getPrototypeOf(e));
        for (var o in e) e.hasOwnProperty(o) && (e[o] && "object" === r(e[o]) ? (n[o] = d(e[o]) ? [] : {}, n[o] = t(e[o])) : n[o] = e[o]);
        return n
      };
    var _ = function(t, e) {
      return t.replace(/:(\w*)/g, function(t, n) {
        void 0 !== e[n] && delete e[n]
      }), e
    };
    t.exports = {
      mergeRequestHeader: function(t) {
        var e = {
            "X-Hydrogen-Client-ID": a._config.CLIENT_ID,
            "X-Hydrogen-Client-Version": a._config.VERSION,
            "X-Hydrogen-Client-Platform": a._polyfill.CLIENT_PLATFORM,
            "X-Hydrogen-Client-SDK-Type": a._polyfill.SDK_TYPE
          },
          n = a.getAuthToken();
        return n && (e.Authorization = a._config.AUTH_PREFIX + " " + n), Object.assign({}, t || {}, e)
      },
      log: function(t, e) {
        f[t] && f[t](e)
      },
      setLogLevel: function(t) {
        Object.keys(i.LOG_LEVEL).forEach(function(e) {
          i.LOG_LEVEL[e] === t && (f = c(t))
        })
      },
      format: l,
      getSysPlatform: function() {
        var t = "UNKNOWN";
        try {
          t = a._polyfill.getSystemInfoSync().platform
        } catch (t) {}
        return t
      },
      getFileNameFromPath: function(t) {
        var e = t.lastIndexOf("/");
        return t.slice(e + 1)
      },
      parseRegExp: function(t) {
        var e = [],
          n = t.toString(),
          r = n.lastIndexOf("/");
        return e.push(n.substring(1, r)), r !== n.length - 1 && e.push(n.substring(r + 1)), e
      },
      replaceQueryParams: h,
      extractErrorMsg: p,
      isArray: d,
      isString: function(t) {
        return "[object String]" === Object.prototype.toString.call(t)
      },
      isObject: function(t) {
        var e = r(t);
        return null != t && "object" == e
      },
      isFunction: function(t) {
        var e = r(t);
        return null != t && "function" == e
      },
      cloneDeep: y,
      isSessionExpired: function() {
        return Date.now() / 1e3 >= (o.get(i.STORAGE_KEY.EXPIRES_AT) || 0)
      },
      excludeParams: _,
      doCreateRequestMethod: function(t) {
        for (var e in t) t.hasOwnProperty(e) && (a[e] = function(e) {
          var n = t[e];
          return function(t) {
            var e = y(t),
              r = n.method || "GET";
            if (n.defaultParams) {
              var o = y(n.defaultParams);
              e = Object.assign(o, e)
            }
            var i = l(n.url, e),
              u = {};
            return e.data ? u = e.data : (u = _(n.url, e), u = h(u)), a._baasRequest({
              url: i,
              method: r,
              data: u
            })
          }
        }(e))
      },
      validateStatusCode: function(t) {
        var e = parseInt(t.status || t.statusCode);
        if (e >= 200 && e < 300) return t;
        throw new u(e, p(t))
      },
      rateLimit: function(t) {
        var e = null;
        return function() {
          return e || (e = t.apply(this, arguments).then(function(t) {
            return e = null, t
          }, function(t) {
            throw e = null, t
          })), e
        }
      },
      fnUnsupportedHandler: function() {
        throw new u(611)
      },
      compareVersion: function(t, e) {
        try {
          if ("string" != typeof t || "string" != typeof e) return 0;
          t = t.replace(/^[^0-9]/, ""), e = e.replace(/^[^0-9]/, "");
          for (var n = t.split("."), r = e.split("."), o = Math.max(n.length, r.length), i = 0; i < o; i++) {
            var a = n[i] ? parseInt(n[i]) : 0,
              u = r[i] ? parseInt(r[i]) : 0;
            if (a > u) return 1;
            if (a < u) return -1
          }
          return 0
        } catch (t) {
          return 0
        }
      },
      makeReportTicketParam: function(t) {
        if (!t) throw new u(605);
        var e = {
          submission_type: "form_id"
        };
        return e.submission_value = t, e
      },
      extend: function() {
        return Object.assign.apply(Object, arguments)
      }
    }
  }, function(t, e) {
    function n(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
      }
    }
    var r = function() {
      function t(e, n) {
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, t);
        var r = new Error;
        return r.code = e, r.message = n ? "".concat(e, ": ").concat(n) : "".concat(e, ": ").concat(this.mapErrorMessage(e)), r
      }
      var e, r, o;
      return e = t, (r = [{
        key: "mapErrorMessage",
        value: function(t) {
          switch (t) {
            case 600:
              return "network disconnected";
            case 601:
              return "request timeout";
            case 602:
              return "uninitialized";
            case 603:
              return "unauthorized";
            case 604:
              return "session missing";
            case 605:
              return "incorrect parameter type";
            case 607:
              return "payment cancelled";
            case 608:
              return "payment failed";
            case 609:
              return "wxExtend function should be executed to allow plugin use wx.login, wx.getUserInfo, wx.requestPayment";
            case 610:
              return "errorTracker uninitialized";
            case 611:
              return "unsupported function";
            case 612:
              return "anonymous user is not allowed";
            default:
              return "unknown error"
          }
        }
      }]) && n(e.prototype, r), o && n(e, o), t
    }();
    t.exports = r
  }, function(t, e) {
    t.exports = {
      STORAGE_KEY: {
        AUTH_TOKEN: "auth_token",
        USERINFO: "userinfo",
        UID: "uid",
        OPENID: "openid",
        UNIONID: "unionid",
        IS_LOGINED_BAAS: "is_logined_baas",
        IS_ANONYMOUS_USER: "is_anonymous_user",
        EXPIRES_AT: "session_expires_at",
        ALIPAY_USER_ID: "alipay_user_id",
        LATEST_VERSION_CHECK_MILLISECONDS: "latest_version_check_milliseconds"
      },
      VERSION_MIN_CHECK_INTERVAL: "86400000",
      STATUS_CODE: {
        CREATED: 201,
        SUCCESS: 200,
        UPDATE: 200,
        PATCH: 200,
        DELETE: 204,
        UNAUTHORIZED: 401,
        NOT_FOUND: 404,
        SERVER_ERROR: 500
      },
      UPLOAD: {
        UPLOAD_FILE_KEY: "file",
        HEADER_AUTH: "Authorization",
        HEADER_CLIENT: "X-Hydrogen-Client-ID",
        HEADER_AUTH_VALUE: "Hydrogen-r1 ",
        UA: "Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"
      },
      USER_PROFILE_BUILD_IN_FIELDS: ["id", "created_at", "created_by", "updated_at", "country", "nickname", "province", "city", "language", "openid", "unionid", "avatar", "is_authorized", "gender"],
      httpMethodCodeMap: {
        GET: 200,
        POST: 201,
        PUT: 200,
        PATCH: 200,
        DELETE: 204
      },
      LOG_LEVEL: {
        DEBUG: "debug",
        INFO: "info",
        WARN: "warn",
        ERROR: "error"
      }
    }
  }, function(t, e, n) {
    function r(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
      }
    }
    var o = n(2),
      i = n(6),
      a = n(1),
      u = function() {
        function t() {
          ! function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
          }(this, t), this._initQueryParams()
        }
        var e, n, u;
        return e = t, (n = [{
          key: "_initQueryParams",
          value: function() {
            this._queryObject = {}, this._limit = 20, this._offset = 0, this._orderBy = null, this._keys = null, this._expand = null
          }
        }, {
          key: "setQuery",
          value: function(t) {
            if (!(t instanceof i)) throw new o(605);
            return this._queryObject = a.cloneDeep(t.queryObject), this
          }
        }, {
          key: "select",
          value: function(t) {
            return t instanceof Array ? this._keys = t.join(",") : this._keys = t, this
          }
        }, {
          key: "expand",
          value: function(t) {
            return t instanceof Array ? this._expand = t.join(",") : this._expand = t, this
          }
        }, {
          key: "limit",
          value: function(t) {
            if (!Number.isInteger(t)) throw new o(605);
            return this._limit = t, this
          }
        }, {
          key: "offset",
          value: function(t) {
            if (!Number.isInteger(t)) throw new o(605);
            return this._offset = t, this
          }
        }, {
          key: "orderBy",
          value: function(t) {
            return t instanceof Array ? this._orderBy = t.join(",") : this._orderBy = t, this
          }
        }, {
          key: "_handleAllQueryConditions",
          value: function() {
            var t = {};
            return t.limit = this._limit, t.offset = this._offset, this._orderBy && (t.order_by = this._orderBy), this._keys && (t.keys = this._keys), this._expand && (t.expand = this._expand), t.where = JSON.stringify(this._queryObject), t
          }
        }]) && r(e.prototype, n), u && r(e, u), t
      }();
    t.exports = u
  }, function(t, e, n) {
    var r = n(0);
    t.exports = {
      set: function(t, e) {
        r._polyfill.setStorageSync("ifx_baas_" + t, e)
      },
      get: function(t) {
        return r._polyfill.getStorageSync("ifx_baas_" + t)
      }
    }
  }, function(t, e, n) {
    function r(t, e, n) {
      return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : t[e] = n, t
    }

    function o(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
      }
    }
    var i = n(8),
      a = n(9),
      u = n(2),
      s = n(1),
      c = n(7)._serializeValueFuncFactory(["BaseRecord"]),
      f = function() {
        function t() {
          ! function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
          }(this, t), this.queryObject = {}
        }
        var e, n, f;
        return e = t, f = [{
          key: "and",
          value: function() {
            for (var e = new t, n = {
                $and: []
              }, r = arguments.length, o = new Array(r), i = 0; i < r; i++) o[i] = arguments[i];
            return o.forEach(function(t) {
              n.$and.push(t.queryObject)
            }), e._setQueryObject(n), e
          }
        }, {
          key: "or",
          value: function() {
            for (var e = new t, n = {
                $or: []
              }, r = arguments.length, o = new Array(r), i = 0; i < r; i++) o[i] = arguments[i];
            return o.forEach(function(t) {
              n.$or.push(t.queryObject)
            }), e._setQueryObject(n), e
          }
        }], (n = [{
          key: "compare",
          value: function(t, e, n) {
            var o = "eq";
            switch (e) {
              case "=":
                o = "eq";
                break;
              case "!=":
                o = "ne";
                break;
              case "<":
                o = "lt";
                break;
              case "<=":
                o = "lte";
                break;
              case ">":
                o = "gt";
                break;
              case ">=":
                o = "gte";
                break;
              default:
                throw new u(605)
            }
            return this._addQueryObject(t, r({}, o, c(n))), this
          }
        }, {
          key: "contains",
          value: function(t, e) {
            if (e && s.isString(e)) return this._addQueryObject(t, {
              contains: e
            }), this;
            throw new u(605)
          }
        }, {
          key: "matches",
          value: function(t, e) {
            if (e && e instanceof RegExp) {
              var n = s.parseRegExp(e);
              return n.length > 1 ? this._addQueryObject(t, {
                regex: n[0],
                options: n[1]
              }) : this._addQueryObject(t, {
                regex: n[0]
              }), this
            }
            throw new u(605)
          }
        }, {
          key: "in",
          value: function(t, e) {
            if (e && e instanceof Array) return this._addQueryObject(t, { in: e.map(function(t) {
                return c(t)
              })
            }), this;
            throw new u(605)
          }
        }, {
          key: "notIn",
          value: function(t, e) {
            if (e && e instanceof Array) return this._addQueryObject(t, {
              nin: e.map(function(t) {
                return c(t)
              })
            }), this;
            throw new u(605)
          }
        }, {
          key: "arrayContains",
          value: function(t, e) {
            if (e && e instanceof Array) return this._addQueryObject(t, {
              all: e
            }), this;
            throw new u(605)
          }
        }, {
          key: "isNull",
          value: function(t) {
            var e = this;
            return t && t instanceof Array ? t.forEach(function(t) {
              e._addQueryObject(t, {
                isnull: !0
              })
            }) : this._addQueryObject(t, {
              isnull: !0
            }), this
          }
        }, {
          key: "isNotNull",
          value: function(t) {
            var e = this;
            return t && t instanceof Array ? t.forEach(function(t) {
              e._addQueryObject(t, {
                isnull: !1
              })
            }) : this._addQueryObject(t, {
              isnull: !1
            }), this
          }
        }, {
          key: "exists",
          value: function(t) {
            var e = this;
            return t && t instanceof Array ? t.forEach(function(t) {
              e._addQueryObject(t, {
                exists: !0
              })
            }) : this._addQueryObject(t, {
              exists: !0
            }), this
          }
        }, {
          key: "notExists",
          value: function(t) {
            var e = this;
            return t && t instanceof Array ? t.forEach(function(t) {
              e._addQueryObject(t, {
                exists: !1
              })
            }) : this._addQueryObject(t, {
              exists: !1
            }), this
          }
        }, {
          key: "include",
          value: function(t, e) {
            if (e && e instanceof i) return this._addQueryObject(t, {
              intersects: e.toGeoJSON()
            }), this;
            throw new u(605)
          }
        }, {
          key: "within",
          value: function(t, e) {
            if (e && e instanceof a) return this._addQueryObject(t, {
              within: e.toGeoJSON()
            }), this;
            throw new u(605)
          }
        }, {
          key: "withinCircle",
          value: function(t, e, n) {
            if (e && e instanceof i) {
              var r = {
                radius: n,
                coordinates: [e.longitude, e.latitude]
              };
              return this._addQueryObject(t, {
                center: r
              }), this
            }
            throw new u(605)
          }
        }, {
          key: "withinRegion",
          value: function(t, e, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
            if (e && e instanceof i) {
              var o = {
                geometry: e.toGeoJSON(),
                min_distance: r
              };
              return n && (o.max_distance = n), this._addQueryObject(t, {
                nearsphere: o
              }), this
            }
            throw new u(605)
          }
        }, {
          key: "hasKey",
          value: function(t, e) {
            if ("string" != typeof t || "string" != typeof e) throw u(605);
            return this._addQueryObject(t, {
              has_key: e
            }), this
          }
        }, {
          key: "_setQueryObject",
          value: function(t) {
            this.queryObject = t
          }
        }, {
          key: "_addQueryObject",
          value: function(t, e) {
            if (e.constructor !== Object) throw new u(605);
            var n = r({}, t, {});
            Object.keys(e).forEach(function(r) {
              n[t]["$".concat(r)] = e[r]
            }), this.queryObject.$and || (this.queryObject.$and = []), this.queryObject.$and.push(n)
          }
        }]) && o(e.prototype, n), f && o(e, f), t
      }();
    t.exports = f
  }, function(t, e, n) {
    function r(t) {
      return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      })(t)
    }

    function o(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
      }
    }
    var i = n(2);

    function a() {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ["BaseRecord"],
        e = n(8),
        r = n(9);
      return function(n) {
        return t.includes("Geo") && (n instanceof e || n instanceof r) ? n.toGeoJSON() : t.includes("BaseRecord") && n instanceof u ? null == n._recordID ? "" : n._recordID.toString() : n
      }
    }
    var u = function() {
      function t(e) {
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, t), this._recordID = e, this._recordValueInit()
      }
      var e, n, u;
      return e = t, (n = [{
        key: "_recordValueInit",
        value: function() {
          this._record = {
            $set: {},
            $unset: {}
          }
        }
      }, {
        key: "set",
        value: function() {
          for (var t = this, e = a(["BaseRecord", "Geo"]), n = a(["Geo"]), o = arguments.length, u = new Array(o), s = 0; s < o; s++) u[s] = arguments[s];
          if (1 === u.length) {
            if ("object" !== r(u[0])) throw new i(605);
            var c = u[0],
              f = {};
            Object.keys(u[0]).forEach(function(r) {
              if (t._record.$unset.hasOwnProperty(r)) throw new i(605);
              var o = c[r];
              Array.isArray(o) ? f[r] = o.map(function(t) {
                return n(t)
              }) : f[r] = e(o)
            }), this._record.$set = f
          } else {
            if (2 !== u.length) throw new i(605);
            if (this._record.$unset.hasOwnProperty(u[0])) throw new i(605);
            var l = u[1];
            Array.isArray(l) ? this._record.$set[u[0]] = l.map(function(t) {
              return n(t)
            }) : this._record.$set[u[0]] = e(l)
          }
          return this
        }
      }, {
        key: "unset",
        value: function() {
          for (var t = this, e = arguments.length, n = new Array(e), o = 0; o < e; o++) n[o] = arguments[o];
          if ("object" === r(n[0])) {
            var a = {};
            Object.keys(n[0]).forEach(function(e) {
              if (t._record.$set.hasOwnProperty(e)) throw new i(605);
              a[e] = ""
            }), this._record.$unset = a
          } else {
            if ("string" != typeof n[0]) throw new i(605);
            if (this._record.$set.hasOwnProperty(n[0])) throw new i(605);
            this._record.$unset[n[0]] = ""
          }
          return this
        }
      }, {
        key: "incrementBy",
        value: function(t, e) {
          return this._record.$set[t] = {
            $incr_by: e
          }, this
        }
      }, {
        key: "append",
        value: function(t, e) {
          var n = a(["Geo"]);
          return e instanceof Array || (e = [e]), e = e.map(function(t) {
            return n(t)
          }), this._record.$set[t] = {
            $append: e
          }, this
        }
      }, {
        key: "uAppend",
        value: function(t, e) {
          var n = a(["Geo"]);
          return e instanceof Array || (e = [e]), e = e.map(function(t) {
            return n(t)
          }), this._record.$set[t] = {
            $append_unique: e
          }, this
        }
      }, {
        key: "remove",
        value: function(t, e) {
          var n = a(["Geo"]);
          return e instanceof Array || (e = [e]), e = e.map(function(t) {
            return n(t)
          }), this._record.$set[t] = {
            $remove: e
          }, this
        }
      }, {
        key: "patchObject",
        value: function(t, e) {
          if ("[object Object]" !== Object.prototype.toString.call(e)) throw new i(605);
          return this._record.$set[t] = {
            $update: e
          }, this
        }
      }]) && o(e.prototype, n), u && o(e, u), t
    }();
    u._serializeValueFuncFactory = a, t.exports = u
  }, function(t, e, n) {
    function r(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
      }
    }
    var o = n(1),
      i = function() {
        function t(e, n) {
          ! function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
          }(this, t), this.longitude = e, this.latitude = n, this.geoJSON = {
            type: "Point",
            coordinates: [this.longitude, this.latitude]
          }
        }
        var e, n, i;
        return e = t, (n = [{
          key: "toGeoJSON",
          value: function() {
            return o.cloneDeep(this.geoJSON)
          }
        }]) && r(e.prototype, n), i && r(e, i), t
      }();
    t.exports = i
  }, function(t, e, n) {
    function r(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
      }
    }
    var o = n(8),
      i = n(2),
      a = n(1),
      u = function() {
        function t(e) {
          if (function(t, e) {
              if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t), !(e && e instanceof Array)) throw new i(605);
          if (e.length < 4) throw new i(605);
          this.points = e, this.geoJSON = {
            type: "Polygon",
            coordinates: []
          }
        }
        var e, n, u;
        return e = t, (n = [{
          key: "toGeoJSON",
          value: function() {
            var t = [];
            return this.points.forEach(function(e) {
              if (e instanceof o) t.push([e.longitude, e.latitude]);
              else {
                if (!(e instanceof Array && 2 === e.length)) throw new i(605);
                t.push(e)
              }
            }), this.geoJSON.coordinates = [t], a.cloneDeep(this.geoJSON)
          }
        }]) && r(e.prototype, n), u && r(e, u), t
      }();
    t.exports = u
  }, function(t, e) {
    var n;
    n = function() {
      return this
    }();
    try {
      n = n || new Function("return this")()
    } catch (t) {
      "object" == typeof window && (n = window)
    }
    t.exports = n
  }, , function(t, e, n) {
    function r(t) {
      return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      })(t)
    }

    function o(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
      }
    }

    function i(t, e) {
      return !e || "object" !== r(e) && "function" != typeof e ? function(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
      }(t) : e
    }

    function a(t) {
      return (a = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
        return t.__proto__ || Object.getPrototypeOf(t)
      })(t)
    }

    function u(t, e) {
      return (u = Object.setPrototypeOf || function(t, e) {
        return t.__proto__ = e, t
      })(t, e)
    }
    var s = n(0),
      c = n(7),
      f = n(1),
      l = n(3).USER_PROFILE_BUILD_IN_FIELDS,
      h = n(2),
      p = s._config.API,
      d = function(t) {
        function e(t) {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
          }(this, e), i(this, a(e).call(this, t))
        }
        var n, r, l;
        return function(t, e) {
          if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: !0,
              configurable: !0
            }
          }), e && u(t, e)
        }(e, c), n = e, (r = [{
          key: "update",
          value: function() {
            var t = f.cloneDeep(this._record);
            return this._recordValueInit(), s.updateUser({
              data: t.$set
            })
          }
        }, {
          key: "linkWechat",
          value: function() {
            return this._anonymous ? Promise.reject(new h(612)) : s._polyfill.linkWechat ? s._polyfill.linkWechat.apply(null, arguments) : Promise.reject(new h(605, "linkWechat 方法未定义"))
          }
        }, {
          key: "linkAlipay",
          value: function() {
            return this._anonymous ? Promise.reject(new h(612)) : s._polyfill.linkAlipay ? s._polyfill.linkAlipay.apply(null, arguments) : Promise.reject(new h(605, "linkAlipay 方法未定义"))
          }
        }, {
          key: "updatePassword",
          value: function(t) {
            var e = this,
              n = t.password,
              r = t.newPassword;
            return this._anonymous ? Promise.reject(new h(612)) : s._baasRequest({
              url: p.WEB.ACCOUNT_INFO,
              method: "PUT",
              data: {
                password: n,
                new_password: r
              }
            }).then(function() {
              return e
            })
          }
        }, {
          key: "setEmail",
          value: function(t) {
            var e = this,
              n = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).sendVerificationEmail,
              r = void 0 !== n && n;
            return this._anonymous ? Promise.reject(new h(612)) : s._baasRequest({
              url: p.WEB.ACCOUNT_INFO,
              method: "PUT",
              data: {
                email: t
              }
            }).then(function(n) {
              return r && e.requestEmailVerification(t), Object.assign(e._attribute, n.data), e
            })
          }
        }, {
          key: "setUsername",
          value: function(t) {
            var e = this;
            return this._anonymous ? Promise.reject(new h(612)) : s._baasRequest({
              url: p.WEB.ACCOUNT_INFO,
              method: "PUT",
              data: {
                username: t
              }
            }).then(function(t) {
              return Object.assign(e._attribute, t.data), e
            })
          }
        }, {
          key: "requestEmailVerification",
          value: function() {
            return this._anonymous ? Promise.reject(new h(612)) : s._baasRequest({
              url: p.WEB.EMAIL_VERIFY,
              method: "POST"
            })
          }
        }, {
          key: "setAccount",
          value: function() {
            var t = this,
              e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return this._anonymous ? Promise.reject(new h(612)) : (e.password && (e.new_password = e.password, delete e.password), s._baasRequest({
              url: p.WEB.ACCOUNT_INFO,
              method: "PUT",
              data: e
            }).then(function(e) {
              return Object.assign(t._attribute, e.data), t
            }))
          }
        }, {
          key: "updateMobile",
          value: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            if (this._anonymous) return Promise.reject(new h(612));
            e && this.requestMobileVerification(t)
          }
        }, {
          key: "requestMobileVerification",
          value: function() {
            if (this._anonymous) return Promise.reject(new h(612))
          }
        }]) && o(n.prototype, r), l && o(n, l), e
      }();
    d.initCurrentUser = function(t) {
      if (!f.isObject(t)) return new h(605);
      var e = new d;
      return e._attribute = Object.assign({}, t), e.toJSON = function() {
        return this._attribute
      }, e.get = function(t) {
        return this._attribute[t]
      }, Object.keys(t).forEach(function(n) {
        ("_" === n[0] || l.includes(n)) && (e[n] = t[n])
      }), e
    }, t.exports = d
  }, function(t, e, n) {
    function r(t) {
      return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      })(t)
    }

    function o(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
      }
    }

    function i(t, e) {
      return !e || "object" !== r(e) && "function" != typeof e ? function(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
      }(t) : e
    }

    function a(t) {
      return (a = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
        return t.__proto__ || Object.getPrototypeOf(t)
      })(t)
    }

    function u(t, e) {
      return (u = Object.setPrototypeOf || function(t, e) {
        return t.__proto__ = e, t
      })(t, e)
    }
    var s = n(0),
      c = n(4),
      f = n(12),
      l = n(1),
      h = n(2),
      p = function(t) {
        function e() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
          }(this, e), i(this, a(e).call(this))
        }
        var n, r, p;
        return function(t, e) {
          if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: !0,
              configurable: !0
            }
          }), e && u(t, e)
        }(e, c), n = e, (r = [{
          key: "get",
          value: function(t) {
            var e = {
              userID: t
            };
            return this._expand && (e.expand = this._expand), this._keys && (e.keys = this._keys), this._initQueryParams(), s.getUserDetail(e)
          }
        }, {
          key: "getWithoutData",
          value: function(t) {
            if (l.isString(t) || Number.isInteger(t)) return new f(t);
            throw new h(605)
          }
        }, {
          key: "getCurrentUserWithoutData",
          value: function() {
            return new f
          }
        }, {
          key: "find",
          value: function() {
            var t = this._handleAllQueryConditions();
            return this._initQueryParams(), s.getUserList(t)
          }
        }]) && o(n.prototype, r), p && o(n, p), e
      }();
    t.exports = p
  }, function(t, e, n) {
    var r = n(0),
      o = n(2),
      i = r._config.API;
    t.exports = function(t, e) {
      var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
      if (!t) throw new o(605);
      var a = {
        function_name: t,
        sync: n
      };
      return void 0 !== e && (a.data = e), r._baasRequest({
        url: i.CLOUD_FUNCTION,
        method: "POST",
        data: a
      }).then(function(t) {
        return t.data
      })
    }
  }, function(t, e, n) {
    var r = n(0),
      o = n(3),
      i = n(2),
      a = n(5),
      u = n(1),
      s = n(12),
      c = n(13),
      f = r._config.API,
      l = function() {
        var t = a.get(o.STORAGE_KEY.UID);
        return t ? (new c).get(t).then(function(t) {
          var e = s.initCurrentUser(t.data);
          return e.user_id = t.data.id, e
        }) : Promise.reject(new i(604))
      };
    t.exports = {
      login: u.rateLimit(function(t) {
        var e = t.username ? f.WEB.LOGIN_USERNAME : f.WEB.LOGIN_EMAIL;
        return r.request({
          url: e,
          method: "POST",
          data: t
        }).then(u.validateStatusCode).then(function(t) {
          return a.set(o.STORAGE_KEY.UID, t.data.user_id), a.set(o.STORAGE_KEY.AUTH_TOKEN, t.data.token), a.set(o.STORAGE_KEY.IS_ANONYMOUS_USER, 0), a.set(o.STORAGE_KEY.EXPIRES_AT, Math.floor(Date.now() / 1e3) + t.data.expires_in - 30), l()
        })
      }),
      logout: function() {
        return r.request({
          url: f.LOGOUT,
          method: "POST"
        }).then(u.validateStatusCode).then(function(t) {
          return r.clearSession(), t
        })
      },
      silentLogin: function() {
        return Promise.reject(new i(605, "silentLogin 方法未定义"))
      },
      anonymousLogin: u.rateLimit(function() {
        return r.request({
          url: f.WEB.ANONYMOUS_LOGIN,
          method: "POST"
        }).then(u.validateStatusCode).then(function(t) {
          return a.set(o.STORAGE_KEY.UID, t.data.user_id), a.set(o.STORAGE_KEY.AUTH_TOKEN, t.data.token), a.set(o.STORAGE_KEY.IS_ANONYMOUS_USER, 1), a.set(o.STORAGE_KEY.EXPIRES_AT, Math.floor(Date.now() / 1e3) + t.data.expires_in - 30), l()
        })
      }),
      requestPasswordReset: function() {
        var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).email;
        return r.request({
          url: f.WEB.PASSWORD_RESET,
          method: "POST",
          data: {
            email: t
          }
        }).then(u.validateStatusCode)
      },
      register: u.rateLimit(function(t) {
        var e = t.username ? f.WEB.REGISTER_USERNAME : f.WEB.REGISTER_EMAIL;
        return r.request({
          url: e,
          method: "POST",
          data: t
        }).then(u.validateStatusCode).then(function(t) {
          return a.set(o.STORAGE_KEY.UID, t.data.user_id), a.set(o.STORAGE_KEY.AUTH_TOKEN, t.data.token), a.set(o.STORAGE_KEY.IS_ANONYMOUS_USER, 0), a.set(o.STORAGE_KEY.EXPIRES_AT, Math.floor(Date.now() / 1e3) + t.data.expires_in - 30), l()
        })
      }),
      getCurrentUser: u.rateLimit(l)
    }
  }, function(t, e) {
    var n, r, o = t.exports = {};

    function i() {
      throw new Error("setTimeout has not been defined")
    }

    function a() {
      throw new Error("clearTimeout has not been defined")
    }

    function u(t) {
      if (n === setTimeout) return setTimeout(t, 0);
      if ((n === i || !n) && setTimeout) return n = setTimeout, setTimeout(t, 0);
      try {
        return n(t, 0)
      } catch (e) {
        try {
          return n.call(null, t, 0)
        } catch (e) {
          return n.call(this, t, 0)
        }
      }
    }! function() {
      try {
        n = "function" == typeof setTimeout ? setTimeout : i
      } catch (t) {
        n = i
      }
      try {
        r = "function" == typeof clearTimeout ? clearTimeout : a
      } catch (t) {
        r = a
      }
    }();
    var s, c = [],
      f = !1,
      l = -1;

    function h() {
      f && s && (f = !1, s.length ? c = s.concat(c) : l = -1, c.length && p())
    }

    function p() {
      if (!f) {
        var t = u(h);
        f = !0;
        for (var e = c.length; e;) {
          for (s = c, c = []; ++l < e;) s && s[l].run();
          l = -1, e = c.length
        }
        s = null, f = !1,
          function(t) {
            if (r === clearTimeout) return clearTimeout(t);
            if ((r === a || !r) && clearTimeout) return r = clearTimeout, clearTimeout(t);
            try {
              r(t)
            } catch (e) {
              try {
                return r.call(null, t)
              } catch (e) {
                return r.call(this, t)
              }
            }
          }(t)
      }
    }

    function d(t, e) {
      this.fun = t, this.array = e
    }

    function y() {}
    o.nextTick = function(t) {
      var e = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
      c.push(new d(t, e)), 1 !== c.length || f || u(p)
    }, d.prototype.run = function() {
      this.fun.apply(null, this.array)
    }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = y, o.addListener = y, o.once = y, o.off = y, o.removeListener = y, o.removeAllListeners = y, o.emit = y, o.prependListener = y, o.prependOnceListener = y, o.listeners = function(t) {
      return []
    }, o.binding = function(t) {
      throw new Error("process.binding is not supported")
    }, o.cwd = function() {
      return "/"
    }, o.chdir = function(t) {
      throw new Error("process.chdir is not supported")
    }, o.umask = function() {
      return 0
    }
  }, function(t, e) {
    var n = {
        LOGOUT: "/hserve/v2.0/session/destroy/",
        UPLOAD: "/hserve/v1/upload/",
        CLOUD_FUNCTION: "/hserve/v1/cloud-function/job/",
        USER_DETAIL: "/hserve/v2.0/user/info/:userID/",
        USER_LIST: "/hserve/v2.0/user/info/",
        UPDATE_USER: "/hserve/v2.0/user/info/",
        TABLE_LIST: "/hserve/v2.0/table/",
        TABLE_DETAIL: "/hserve/v2.0/table/:tableID/",
        RECORD_LIST: "/hserve/v2.0/table/:tableID/record/",
        QUERY_RECORD_LIST: "/hserve/v2.0/table/:tableID/record/",
        CREATE_RECORD_LIST: "/hserve/v2.0/table/:tableID/record/?enable_trigger=:enable_trigger",
        RECORD_DETAIL: "/hserve/v2.0/table/:tableID/record/:recordID/",
        CREATE_RECORD: "/hserve/v2.0/table/:tableID/record/",
        UPDATE_RECORD: "/hserve/v2.0/table/:tableID/record/:recordID/",
        UPDATE_RECORD_LIST: "/hserve/v2.0/table/:tableID/record/?limit=:limit&offset=:offset&where=:where&enable_trigger=:enable_trigger",
        DELETE_RECORD: "/hserve/v2.0/table/:tableID/record/:recordID/",
        DELETE_RECORD_LIST: "/hserve/v2.0/table/:tableID/record/?limit=:limit&offset=:offset&where=:where&enable_trigger=:enable_trigger",
        LAGECY_CONTENT_LIST: "/hserve/v1/content/detail/",
        CONTENT_LIST: "/hserve/v2.0/content/detail/",
        CONTENT_GROUP_LIST: "/hserve/v1/content/group/",
        CONTENT_DETAIL: "/hserve/v2.0/content/detail/:richTextID/",
        CONTENT_GROUP_DETAIL: "/hserve/v1/content/category/",
        CONTENT_CATEGORY_LIST: "/hserve/v1/content/category/",
        CONTENT_CATEGORY_DETAIL: "/hserve/v1/content/category/:categoryID/",
        FILE_DETAIL: "/hserve/v1.3/uploaded-file/:fileID/",
        FILE_LIST: "/hserve/v1.3/uploaded-file/",
        DELETE_FILE: "/hserve/v1.3/uploaded-file/:fileID/",
        DELETE_FILES: "/hserve/v1.3/uploaded-file/",
        FILE_CATEGORY_DETAIL: "/hserve/v1.3/file-category/:categoryID/",
        FILE_CATEGORY_LIST: "/hserve/v1.3/file-category/",
        CENSOR_IMAGE: "/hserve/v1.7/censor-image/",
        CENSOR_MSG: "/hserve/v1.7/censor-msg/",
        SEND_SMS_CODE: "/hserve/v1.8/sms-verification-code/",
        VERIFY_SMS_CODE: "/hserve/v1.8/sms-verification-code/verify/",
        PAY: "/hserve/v2.0/idp/pay/order/",
        ORDER: "/hserve/v2.0/idp/pay/order/:transactionID/",
        WEB: {
          REGISTER_USERNAME: "/hserve/v2.0/register/username/",
          REGISTER_EMAIL: "/hserve/v2.0/register/email/",
          LOGIN_USERNAME: "/hserve/v2.0/login/username/",
          LOGIN_EMAIL: "/hserve/v2.0/login/email/",
          EMAIL_VERIFY: "/hserve/v2.0/user/email-verify/",
          ACCOUNT_INFO: "/hserve/v2.0/user/account/",
          PASSWORD_RESET: "/hserve/v2.0/user/password/reset/",
          ANONYMOUS_LOGIN: "/hserve/v2.0/login/anonymous/"
        },
        WECHAT: {
          SILENT_LOGIN: "/hserve/v2.0/idp/wechat/silent-login/",
          AUTHENTICATE: "/hserve/v2.0/idp/wechat/authenticate/",
          USER_ASSOCIATE: "/hserve/v2.0/idp/wechat/user-associate/",
          TEMPLATE_MESSAGE: "/hserve/v2.0/template-message-ticket/",
          DECRYPT: "/hserve/v1/wechat/decrypt/",
          WXACODE: "/hserve/v1.4/miniappcode/",
          CENSOR_IMAGE: "/hserve/v1.7/censor-image/",
          CENSOR_MSG: "/hserve/v1.7/censor-msg/"
        },
        ALIPAY: {
          SILENT_LOGIN: "/hserve/v2.0/idp/alipay/silent-login/",
          AUTHENTICATE: "/hserve/v2.0/idp/alipay/authenticate/",
          USER_ASSOCIATE: "/hserve/v2.0/idp/alipay/user-associate/",
          TEMPLATE_MESSAGE: "/hserve/v2.0/template-message-ticket/",
          MINIAPP_QR_CODE: "/hserve/v2.0/idp/alipay/miniapp-qr-code/"
        },
        VIDEO_SNAPSHOT: "/hserve/v1/media/video-snapshot/",
        M3U8_CONCAT: "/hserve/v1/media/m3u8-concat/",
        M3U8_CLIP: "/hserve/v1/media/m3u8-clip/",
        M3U8_META: "/hserve/v1/media/m3u8-meta/",
        VIDEO_AUDIO_META: "/hserve/v1/media/audio-video-meta/",
        LATEST_VERSION: "/hserve/v1/latest-sdk-version/"
      },
      r = [{
        getUserInfo: {
          url: n.USER_DETAIL,
          defaultParams: {
            userID: ""
          }
        },
        getUserDetail: {
          url: n.USER_DETAIL
        },
        getUserList: {
          url: n.USER_LIST
        },
        updateUser: {
          url: n.UPDATE_USER,
          method: "PUT"
        }
      }, {
        getTableList: {
          url: n.TABLE_LIST
        },
        getTable: {
          url: n.TABLE_DETAIL
        },
        getRecordList: {
          url: n.RECORD_LIST
        },
        queryRecordList: {
          url: n.QUERY_RECORD_LIST
        },
        getRecord: {
          url: n.RECORD_DETAIL
        },
        createRecord: {
          url: n.CREATE_RECORD,
          method: "POST"
        },
        createRecordList: {
          url: n.CREATE_RECORD_LIST,
          method: "POST"
        },
        updateRecord: {
          url: n.UPDATE_RECORD,
          method: "PUT"
        },
        updateRecordList: {
          url: n.UPDATE_RECORD_LIST,
          method: "PUT"
        },
        deleteRecord: {
          url: n.DELETE_RECORD,
          method: "DELETE"
        },
        deleteRecordList: {
          url: n.DELETE_RECORD_LIST,
          method: "DELETE"
        }
      }, {
        getContentList: {
          url: n.LAGECY_CONTENT_LIST
        },
        getContentList2: {
          url: n.CONTENT_LIST
        },
        getContent: {
          url: n.CONTENT_DETAIL
        },
        getContentGroupList: {
          url: n.CONTENT_GROUP_LIST
        },
        getContentGroup: {
          url: n.CONTENT_GROUP_DETAIL
        },
        getContentCategoryList: {
          url: n.CONTENT_CATEGORY_LIST
        },
        getContentCategory: {
          url: n.CONTENT_CATEGORY_DETAIL
        }
      }, {
        getFileDetail: {
          url: n.FILE_DETAIL
        },
        getFileList: {
          url: n.FILE_LIST
        },
        deleteFile: {
          url: n.DELETE_FILE,
          method: "DELETE"
        },
        deleteFiles: {
          url: n.DELETE_FILES,
          method: "DELETE"
        },
        getFileCategoryDetail: {
          url: n.FILE_CATEGORY_DETAIL
        },
        getFileCategoryList: {
          url: n.FILE_CATEGORY_LIST
        },
        sendSmsCode: {
          url: n.SEND_SMS_CODE,
          method: "POST"
        },
        verifySmsCode: {
          url: n.VERIFY_SMS_CODE,
          method: "POST"
        }
      }, {
        getOrderList: {
          url: n.PAY
        }
      }];
    t.exports = {
      API_HOST: "https://api.myminapp.com",
      API: n,
      AUTH_PREFIX: "Hydrogen-r1",
      METHOD_MAP_LIST: r,
      DEBUG: !1,
      RANDOM_OPTION: {
        max: 100
      },
      REQUEST_PARAMS_MAP: {
        contentGroupID: "content_group_id",
        categoryID: "category_id",
        recordID: "id",
        submissionType: "submission_type",
        submissionValue: "submission_value",
        categoryName: "category_name"
      },
      SDK_DOWNLOAD_PAGE: "https://doc.minapp.com/js-sdk/download-sdk.html",
      VERSION: "v2.0.1-a"
    }
  }, function(t, e, n) {
    t.exports = {
      getAPIHost: function() {
        return "https://".concat(n(0)._config.CLIENT_ID, ".myminapp.com")
      },
      SDK_TYPE: "file",
      CLIENT_PLATFORM: "UNKNOWN",
      checkLatestVersion: function() {
        return null
      }
    }
  }, function(t, e, n) {
    var r = n(3),
      o = n(5),
      i = n(2),
      a = n(1);
    t.exports = function(t) {
      t.init = function(e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
            autoLogin: !1
          },
          r = n.autoLogin,
          o = n.logLevel;
        if (!a.isString(e)) throw new i(605);
        o && a.setLogLevel(o), t._config.AUTO_LOGIN = r, t._config.CLIENT_ID = e, t._config.API_HOST = t._polyfill.getAPIHost(e), t._polyfill.checkLatestVersion()
      }, t.getAuthToken = function() {
        return o.get(r.STORAGE_KEY.AUTH_TOKEN)
      }, t.checkVersion = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          n = e.platform,
          i = e.onSuccess,
          u = e.onError;
        i || (i = function(e) {
          var o = e.statusCode || e.status;
          parseInt(o) !== r.STATUS_CODE.SUCCESS ? u && u(e) : -1 === a.compareVersion(t._config.VERSION, e.data[n]) && a.log(r.LOG_LEVEL.WARN, "【知晓云 SDK 更新提示】当前 SDK 版本为 ".concat(t._config.VERSION, " 最新版本为 ").concat(e.data[n], "，请前往 ").concat(t._config.SDK_DOWNLOAD_PAGE, " 下载。"))
        });
        var s = Date.now(),
          c = o.get(r.STORAGE_KEY.LATEST_VERSION_CHECK_MILLISECONDS);
        c && c - s <= r.VERSION_MIN_CHECK_INTERVAL || (o.set(r.STORAGE_KEY.LATEST_VERSION_CHECK_MILLISECONDS, s), t.request({
          url: t._config.API.LATEST_VERSION
        }).then(i, u))
      }, t.clearSession = function() {
        o.set(r.STORAGE_KEY.AUTH_TOKEN, ""), o.set(r.STORAGE_KEY.IS_LOGINED_BAAS, ""), o.set(r.STORAGE_KEY.IS_ANONYMOUS_USER, ""), o.set(r.STORAGE_KEY.USERINFO, ""), o.set(r.STORAGE_KEY.UID, "")
      }, t._createRequestMethod = function() {
        t._config.METHOD_MAP_LIST.map(function(t) {
          a.doCreateRequestMethod(t)
        })
      }, t.auth = n(15), t.ContentGroup = n(24), t.File = n(25), t.FileCategory = n(26), t.GeoPoint = n(8), t.GeoPolygon = n(9), t.invokeFunction = n(14), t.invoke = n(14), t.Query = n(6), t.storage = n(5), t.TableObject = n(27), t.User = n(13), t.Order = n(29)
    }
  }, function(t, e, n) {
    "use strict";
    var r = n(21),
      o = ["trace", "debug", "info", "warn", "error", "fatal"],
      i = function() {};
    t.exports = function(t) {
      (t = t || {}).level = t.level || "info";
      var e = {};
      return o.forEach(function(n) {
        e[n] = function(e) {
          return o.indexOf(e) >= o.indexOf(t.level)
        }(n) ? function() {
          var e, o = t.prefix;
          if (t.stderr) e = "error";
          else switch (n) {
            case "trace":
            case "debug":
              e = "info";
              break;
            case "fatal":
              e = "error";
              break;
            default:
              e = n
          }
          o && ("function" == typeof o && (o = o(n)), arguments[0] = r.format(o, arguments[0]));
          console[e](r.format.apply(r, arguments))
        } : i
      }), e
    }
  }, function(t, e, n) {
    (function(t, r) {
      var o = /%[sdj%]/g;
      e.format = function(t) {
        if (!g(t)) {
          for (var e = [], n = 0; n < arguments.length; n++) e.push(u(arguments[n]));
          return e.join(" ")
        }
        n = 1;
        for (var r = arguments, i = r.length, a = String(t).replace(o, function(t) {
            if ("%%" === t) return "%";
            if (n >= i) return t;
            switch (t) {
              case "%s":
                return String(r[n++]);
              case "%d":
                return Number(r[n++]);
              case "%j":
                try {
                  return JSON.stringify(r[n++])
                } catch (t) {
                  return "[Circular]"
                }
              default:
                return t
            }
          }), s = r[n]; n < i; s = r[++n]) y(s) || !E(s) ? a += " " + s : a += " " + u(s);
        return a
      }, e.deprecate = function(n, o) {
        if (v(t.process)) return function() {
          return e.deprecate(n, o).apply(this, arguments)
        };
        if (!0 === r.noDeprecation) return n;
        var i = !1;
        return function() {
          if (!i) {
            if (r.throwDeprecation) throw new Error(o);
            r.traceDeprecation ? console.trace(o) : console.error(o), i = !0
          }
          return n.apply(this, arguments)
        }
      };
      var i, a = {};

      function u(t, n) {
        var r = {
          seen: [],
          stylize: c
        };
        return arguments.length >= 3 && (r.depth = arguments[2]), arguments.length >= 4 && (r.colors = arguments[3]), d(n) ? r.showHidden = n : n && e._extend(r, n), v(r.showHidden) && (r.showHidden = !1), v(r.depth) && (r.depth = 2), v(r.colors) && (r.colors = !1), v(r.customInspect) && (r.customInspect = !0), r.colors && (r.stylize = s), f(r, t, r.depth)
      }

      function s(t, e) {
        var n = u.styles[e];
        return n ? "[" + u.colors[n][0] + "m" + t + "[" + u.colors[n][1] + "m" : t
      }

      function c(t, e) {
        return t
      }

      function f(t, n, r) {
        if (t.customInspect && n && O(n.inspect) && n.inspect !== e.inspect && (!n.constructor || n.constructor.prototype !== n)) {
          var o = n.inspect(r, t);
          return g(o) || (o = f(t, o, r)), o
        }
        var i = function(t, e) {
          if (v(e)) return t.stylize("undefined", "undefined");
          if (g(e)) {
            var n = "'" + JSON.stringify(e).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
            return t.stylize(n, "string")
          }
          if (_(e)) return t.stylize("" + e, "number");
          if (d(e)) return t.stylize("" + e, "boolean");
          if (y(e)) return t.stylize("null", "null")
        }(t, n);
        if (i) return i;
        var a = Object.keys(n),
          u = function(t) {
            var e = {};
            return t.forEach(function(t, n) {
              e[t] = !0
            }), e
          }(a);
        if (t.showHidden && (a = Object.getOwnPropertyNames(n)), w(n) && (a.indexOf("message") >= 0 || a.indexOf("description") >= 0)) return l(n);
        if (0 === a.length) {
          if (O(n)) {
            var s = n.name ? ": " + n.name : "";
            return t.stylize("[Function" + s + "]", "special")
          }
          if (b(n)) return t.stylize(RegExp.prototype.toString.call(n), "regexp");
          if (m(n)) return t.stylize(Date.prototype.toString.call(n), "date");
          if (w(n)) return l(n)
        }
        var c, E = "",
          S = !1,
          T = ["{", "}"];
        (p(n) && (S = !0, T = ["[", "]"]), O(n)) && (E = " [Function" + (n.name ? ": " + n.name : "") + "]");
        return b(n) && (E = " " + RegExp.prototype.toString.call(n)), m(n) && (E = " " + Date.prototype.toUTCString.call(n)), w(n) && (E = " " + l(n)), 0 !== a.length || S && 0 != n.length ? r < 0 ? b(n) ? t.stylize(RegExp.prototype.toString.call(n), "regexp") : t.stylize("[Object]", "special") : (t.seen.push(n), c = S ? function(t, e, n, r, o) {
          for (var i = [], a = 0, u = e.length; a < u; ++a) I(e, String(a)) ? i.push(h(t, e, n, r, String(a), !0)) : i.push("");
          return o.forEach(function(o) {
            o.match(/^\d+$/) || i.push(h(t, e, n, r, o, !0))
          }), i
        }(t, n, r, u, a) : a.map(function(e) {
          return h(t, n, r, u, e, S)
        }), t.seen.pop(), function(t, e, n) {
          if (t.reduce(function(t, e) {
              return 0, e.indexOf("\n") >= 0 && 0, t + e.replace(/\u001b\[\d\d?m/g, "").length + 1
            }, 0) > 60) return n[0] + ("" === e ? "" : e + "\n ") + " " + t.join(",\n  ") + " " + n[1];
          return n[0] + e + " " + t.join(", ") + " " + n[1]
        }(c, E, T)) : T[0] + E + T[1]
      }

      function l(t) {
        return "[" + Error.prototype.toString.call(t) + "]"
      }

      function h(t, e, n, r, o, i) {
        var a, u, s;
        if ((s = Object.getOwnPropertyDescriptor(e, o) || {
            value: e[o]
          }).get ? u = s.set ? t.stylize("[Getter/Setter]", "special") : t.stylize("[Getter]", "special") : s.set && (u = t.stylize("[Setter]", "special")), I(r, o) || (a = "[" + o + "]"), u || (t.seen.indexOf(s.value) < 0 ? (u = y(n) ? f(t, s.value, null) : f(t, s.value, n - 1)).indexOf("\n") > -1 && (u = i ? u.split("\n").map(function(t) {
            return "  " + t
          }).join("\n").substr(2) : "\n" + u.split("\n").map(function(t) {
            return "   " + t
          }).join("\n")) : u = t.stylize("[Circular]", "special")), v(a)) {
          if (i && o.match(/^\d+$/)) return u;
          (a = JSON.stringify("" + o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (a = a.substr(1, a.length - 2), a = t.stylize(a, "name")) : (a = a.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), a = t.stylize(a, "string"))
        }
        return a + ": " + u
      }

      function p(t) {
        return Array.isArray(t)
      }

      function d(t) {
        return "boolean" == typeof t
      }

      function y(t) {
        return null === t
      }

      function _(t) {
        return "number" == typeof t
      }

      function g(t) {
        return "string" == typeof t
      }

      function v(t) {
        return void 0 === t
      }

      function b(t) {
        return E(t) && "[object RegExp]" === S(t)
      }

      function E(t) {
        return "object" == typeof t && null !== t
      }

      function m(t) {
        return E(t) && "[object Date]" === S(t)
      }

      function w(t) {
        return E(t) && ("[object Error]" === S(t) || t instanceof Error)
      }

      function O(t) {
        return "function" == typeof t
      }

      function S(t) {
        return Object.prototype.toString.call(t)
      }

      function T(t) {
        return t < 10 ? "0" + t.toString(10) : t.toString(10)
      }
      e.debuglog = function(t) {
        if (v(i) && (i = r.env.NODE_DEBUG || ""), t = t.toUpperCase(), !a[t])
          if (new RegExp("\\b" + t + "\\b", "i").test(i)) {
            var n = r.pid;
            a[t] = function() {
              var r = e.format.apply(e, arguments);
              console.error("%s %d: %s", t, n, r)
            }
          } else a[t] = function() {};
        return a[t]
      }, e.inspect = u, u.colors = {
        bold: [1, 22],
        italic: [3, 23],
        underline: [4, 24],
        inverse: [7, 27],
        white: [37, 39],
        grey: [90, 39],
        black: [30, 39],
        blue: [34, 39],
        cyan: [36, 39],
        green: [32, 39],
        magenta: [35, 39],
        red: [31, 39],
        yellow: [33, 39]
      }, u.styles = {
        special: "cyan",
        number: "yellow",
        boolean: "yellow",
        undefined: "grey",
        null: "bold",
        string: "green",
        date: "magenta",
        regexp: "red"
      }, e.isArray = p, e.isBoolean = d, e.isNull = y, e.isNullOrUndefined = function(t) {
        return null == t
      }, e.isNumber = _, e.isString = g, e.isSymbol = function(t) {
        return "symbol" == typeof t
      }, e.isUndefined = v, e.isRegExp = b, e.isObject = E, e.isDate = m, e.isError = w, e.isFunction = O, e.isPrimitive = function(t) {
        return null === t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || "symbol" == typeof t || void 0 === t
      }, e.isBuffer = n(22);
      var A = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      function I(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
      }
      e.log = function() {
        var t, n;
        console.log("%s - %s", (t = new Date, n = [T(t.getHours()), T(t.getMinutes()), T(t.getSeconds())].join(":"), [t.getDate(), A[t.getMonth()], n].join(" ")), e.format.apply(e, arguments))
      }, e.inherits = n(23), e._extend = function(t, e) {
        if (!e || !E(e)) return t;
        for (var n = Object.keys(e), r = n.length; r--;) t[n[r]] = e[n[r]];
        return t
      }
    }).call(this, n(10), n(16))
  }, function(t, e) {
    t.exports = function(t) {
      return t && "object" == typeof t && "function" == typeof t.copy && "function" == typeof t.fill && "function" == typeof t.readUInt8
    }
  }, function(t, e) {
    "function" == typeof Object.create ? t.exports = function(t, e) {
      t.super_ = e, t.prototype = Object.create(e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      })
    } : t.exports = function(t, e) {
      t.super_ = e;
      var n = function() {};
      n.prototype = e.prototype, t.prototype = new n, t.prototype.constructor = t
    }
  }, function(t, e, n) {
    function r(t) {
      return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      })(t)
    }

    function o(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
      }
    }

    function i(t, e) {
      return !e || "object" !== r(e) && "function" != typeof e ? function(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
      }(t) : e
    }

    function a(t) {
      return (a = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
        return t.__proto__ || Object.getPrototypeOf(t)
      })(t)
    }

    function u(t, e) {
      return (u = Object.setPrototypeOf || function(t, e) {
        return t.__proto__ = e, t
      })(t, e)
    }
    var s = n(0),
      c = n(4),
      f = n(6),
      l = function(t) {
        function e(t) {
          var n;
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
          }(this, e), (n = i(this, a(e).call(this)))._contentGroupID = t, n
        }
        var n, r, l;
        return function(t, e) {
          if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: !0,
              configurable: !0
            }
          }), e && u(t, e)
        }(e, c), n = e, (r = [{
          key: "getContent",
          value: function(t) {
            var e = {
              richTextID: t
            };
            return this._expand && (e.expand = this._expand), this._keys && (e.keys = this._keys), this._initQueryParams(), s.getContent(e)
          }
        }, {
          key: "find",
          value: function() {
            var t = this._handleAllQueryConditions();
            return t.contentGroupID = this._contentGroupID, this._initQueryParams(), s.getContentList2(t)
          }
        }, {
          key: "getCategoryList",
          value: function() {
            return s.getContentCategoryList({
              contentGroupID: this._contentGroupID,
              limit: 100
            })
          }
        }, {
          key: "getCategory",
          value: function(t) {
            var e = new f;
            return e.compare("group_id", "=", this._contentGroupID), s.getContentCategory({
              categoryID: t,
              where: JSON.stringify(e.queryObject)
            })
          }
        }]) && o(n.prototype, r), l && o(n, l), e
      }();
    t.exports = l
  }, function(t, e, n) {
    function r(t) {
      return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      })(t)
    }

    function o(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
      }
    }

    function i(t, e) {
      return !e || "object" !== r(e) && "function" != typeof e ? function(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
      }(t) : e
    }

    function a(t) {
      return (a = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
        return t.__proto__ || Object.getPrototypeOf(t)
      })(t)
    }

    function u(t, e) {
      return (u = Object.setPrototypeOf || function(t, e) {
        return t.__proto__ = e, t
      })(t, e)
    }
    var s = n(0),
      c = n(4),
      f = s._config.API,
      l = function(t) {
        function e() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
          }(this, e), i(this, a(e).call(this))
        }
        var n, r, l;
        return function(t, e) {
          if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: !0,
              configurable: !0
            }
          }), e && u(t, e)
        }(e, c), n = e, (r = [{
          key: "upload",
          value: function(t, e) {
            return s.uploadFile(t, e, "json")
          }
        }, {
          key: "delete",
          value: function(t) {
            return t instanceof Array ? s.deleteFiles({
              id__in: t
            }) : s.deleteFile({
              fileID: t
            })
          }
        }, {
          key: "get",
          value: function(t) {
            return s.getFileDetail({
              fileID: t
            })
          }
        }, {
          key: "find",
          value: function() {
            var t = this._handleAllQueryConditions();
            return this._initQueryParams(), s.getFileList(t)
          }
        }, {
          key: "genVideoSnapshot",
          value: function(t) {
            return s._baasRequest({
              url: f.VIDEO_SNAPSHOT,
              method: "POST",
              data: t
            }).then(function(t) {
              return t.data
            })
          }
        }, {
          key: "videoConcat",
          value: function(t) {
            return s._baasRequest({
              url: f.M3U8_CONCAT,
              method: "POST",
              data: t
            }).then(function(t) {
              return t.data
            })
          }
        }, {
          key: "videoClip",
          value: function(t) {
            return s._baasRequest({
              url: f.M3U8_CLIP,
              method: "POST",
              data: t
            }).then(function(t) {
              return t.data
            })
          }
        }, {
          key: "videoMeta",
          value: function(t) {
            return s._baasRequest({
              url: f.M3U8_META,
              method: "POST",
              data: t
            }).then(function(t) {
              return t.data
            })
          }
        }, {
          key: "videoAudioMeta",
          value: function(t) {
            return s._baasRequest({
              url: f.VIDEO_AUDIO_META,
              method: "POST",
              data: t
            }).then(function(t) {
              return t.data
            })
          }
        }]) && o(n.prototype, r), l && o(n, l), e
      }();
    t.exports = l
  }, function(t, e, n) {
    function r(t) {
      return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      })(t)
    }

    function o(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
      }
    }

    function i(t, e) {
      return !e || "object" !== r(e) && "function" != typeof e ? function(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
      }(t) : e
    }

    function a(t) {
      return (a = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
        return t.__proto__ || Object.getPrototypeOf(t)
      })(t)
    }

    function u(t, e) {
      return (u = Object.setPrototypeOf || function(t, e) {
        return t.__proto__ = e, t
      })(t, e)
    }
    var s = n(0),
      c = n(4),
      f = n(6),
      l = function(t) {
        function e() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
          }(this, e), i(this, a(e).call(this))
        }
        var n, r, l;
        return function(t, e) {
          if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: !0,
              configurable: !0
            }
          }), e && u(t, e)
        }(e, c), n = e, (r = [{
          key: "get",
          value: function(t) {
            return s.getFileCategoryDetail({
              categoryID: t
            })
          }
        }, {
          key: "getFileList",
          value: function(t) {
            var e = new f;
            return e.in("category_id", [t]), s.getFileList({
              where: JSON.stringify(e.queryObject)
            })
          }
        }, {
          key: "find",
          value: function() {
            var t = this._handleAllQueryConditions();
            return this._initQueryParams(), s.getFileCategoryList(t)
          }
        }]) && o(n.prototype, r), l && o(n, l), e
      }();
    t.exports = l
  }, function(t, e, n) {
    function r(t) {
      return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      })(t)
    }

    function o(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
      }
    }

    function i(t, e) {
      return !e || "object" !== r(e) && "function" != typeof e ? function(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
      }(t) : e
    }

    function a(t, e, n) {
      return (a = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(t, e, n) {
        var r = function(t, e) {
          for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = u(t)););
          return t
        }(t, e);
        if (r) {
          var o = Object.getOwnPropertyDescriptor(r, e);
          return o.get ? o.get.call(n) : o.value
        }
      })(t, e, n || t)
    }

    function u(t) {
      return (u = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
        return t.__proto__ || Object.getPrototypeOf(t)
      })(t)
    }

    function s(t, e) {
      return (s = Object.setPrototypeOf || function(t, e) {
        return t.__proto__ = e, t
      })(t, e)
    }
    var c = n(0),
      f = n(4),
      l = n(2),
      h = n(6),
      p = n(28),
      d = n(1),
      y = n(7),
      _ = function(t) {
        function e(t) {
          var n;
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
          }(this, e), (n = i(this, u(e).call(this)))._tableID = t, n
        }
        var n, r, _;
        return function(t, e) {
          if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: !0,
              configurable: !0
            }
          }), e && s(t, e)
        }(e, f), n = e, (r = [{
          key: "create",
          value: function() {
            return new p(this._tableID)
          }
        }, {
          key: "createMany",
          value: function(t) {
            var e = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).enableTrigger,
              n = void 0 === e || e,
              r = y._serializeValueFuncFactory(["BaseRecord"]);
            if (d.isArray(t)) {
              var o = {
                tableID: this._tableID,
                data: t.map(function(t) {
                  return Object.keys(t).forEach(function(e) {
                    t[e] = r(t[e])
                  }), t
                }),
                enable_trigger: n ? 1 : 0
              };
              return c.createRecordList(o)
            }
            throw new l(605)
          }
        }, {
          key: "delete",
          value: function(t) {
            var e = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).enableTrigger,
              n = void 0 === e || e;
            if (d.isString(t) || Number.isInteger(t)) return c.deleteRecord({
              tableID: this._tableID,
              recordID: t
            });
            if (t instanceof h) {
              var r = {
                tableID: this._tableID,
                limit: this._limit,
                offset: this._offset,
                where: JSON.stringify(t.queryObject),
                enable_trigger: n ? 1 : 0
              };
              return this._initQueryParams(), c.deleteRecordList(r)
            }
            throw new l(605)
          }
        }, {
          key: "getWithoutData",
          value: function(t) {
            if (d.isString(t) || Number.isInteger(t)) return new p(this._tableID, t);
            if (t instanceof h) {
              var e = {};
              return e.limit = this._limit, e.offset = this._offset, e.where = d.cloneDeep(t.queryObject), this._initQueryParams(), new p(this._tableID, null, e)
            }
            throw new l(605)
          }
        }, {
          key: "get",
          value: function(t) {
            var e = {
              tableID: this._tableID,
              recordID: t
            };
            return this._expand && (e.expand = this._expand), this._keys && (e.keys = this._keys), this._initQueryParams(), c.getRecord(e)
          }
        }, {
          key: "_handleAllQueryConditions",
          value: function() {
            var t = a(u(e.prototype), "_handleAllQueryConditions", this).call(this);
            return t.tableID = this._tableID, t
          }
        }, {
          key: "find",
          value: function() {
            var t = this._handleAllQueryConditions();
            return this._initQueryParams(), c.queryRecordList(t)
          }
        }, {
          key: "count",
          value: function() {
            return this.limit(1).find().then(function(t) {
              return t.data.meta.total_count
            })
          }
        }]) && o(n.prototype, r), _ && o(n, _), e
      }();
    t.exports = _
  }, function(t, e, n) {
    function r(t) {
      return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      })(t)
    }

    function o(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
      }
    }

    function i(t, e) {
      return !e || "object" !== r(e) && "function" != typeof e ? function(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
      }(t) : e
    }

    function a(t) {
      return (a = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
        return t.__proto__ || Object.getPrototypeOf(t)
      })(t)
    }

    function u(t, e) {
      return (u = Object.setPrototypeOf || function(t, e) {
        return t.__proto__ = e, t
      })(t, e)
    }
    var s = n(0),
      c = n(7),
      f = n(1),
      l = function(t) {
        function e(t, n) {
          var r, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
          }(this, e), (r = i(this, a(e).call(this, n)))._tableID = t, r._queryObject = o, r
        }
        var n, r, l;
        return function(t, e) {
          if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: !0,
              configurable: !0
            }
          }), e && u(t, e)
        }(e, c), n = e, (r = [{
          key: "save",
          value: function() {
            var t = f.cloneDeep(this._record);
            return this._recordValueInit(), s.createRecord({
              tableID: this._tableID,
              data: t.$set
            })
          }
        }, {
          key: "update",
          value: function() {
            var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).enableTrigger,
              e = void 0 === t || t,
              n = f.cloneDeep(this._record);
            if (this._recordValueInit(), this._recordID) return s.updateRecord({
              tableID: this._tableID,
              recordID: this._recordID,
              data: n
            });
            var r = {
              tableID: this._tableID,
              data: n,
              where: JSON.stringify(this._queryObject.where),
              limit: this._queryObject.limit,
              offset: this._queryObject.offset,
              enable_trigger: e ? 1 : 0
            };
            return this._queryObject = {}, s.updateRecordList(r)
          }
        }]) && o(n.prototype, r), l && o(n, l), e
      }();
    t.exports = l
  }, function(t, e, n) {
    function r(t) {
      return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      })(t)
    }

    function o(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
      }
    }

    function i(t, e) {
      return !e || "object" !== r(e) && "function" != typeof e ? function(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
      }(t) : e
    }

    function a(t) {
      return (a = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
        return t.__proto__ || Object.getPrototypeOf(t)
      })(t)
    }

    function u(t, e) {
      return (u = Object.setPrototypeOf || function(t, e) {
        return t.__proto__ = e, t
      })(t, e)
    }
    var s = n(0),
      c = n(1),
      f = n(4),
      l = function(t) {
        function e() {
          return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
          }(this, e), i(this, a(e).apply(this, arguments))
        }
        var n, r, l;
        return function(t, e) {
          if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: !0,
              configurable: !0
            }
          }), e && u(t, e)
        }(e, f), n = e, (r = [{
          key: "get",
          value: function(t) {
            var e = s._config.API,
              n = c.format(e.ORDER, {
                transactionID: t
              });
            return s._baasRequest({
              url: n
            })
          }
        }, {
          key: "getOrderList",
          value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              e = Object.assign({}, this._handleAllQueryConditions(), t);
            return this._initQueryParams(), s.getOrderList(Object.assign(e, t))
          }
        }]) && o(n.prototype, r), l && o(n, l), e
      }();
    t.exports = l
  }, function(t, e, n) {
    var r = n(0),
      o = n(3),
      i = n(1);
    t.exports = {
      getUploadFileConfig: function(t, e) {
        return e.filename = t, r._baasRequest({
          url: r._polyfill.getAPIHost() + r._config.API.UPLOAD,
          method: "POST",
          data: e
        })
      },
      getUploadHeaders: function() {
        return {
          Authorization: o.UPLOAD.HEADER_AUTH_VALUE + r.getAuthToken(),
          "X-Hydrogen-Client-Version": r._config.VERSION,
          "X-Hydrogen-Client-Platform": i.getSysPlatform(),
          "X-Hydrogen-Client-ID": r._config.CLIENT_ID,
          "User-Agent": o.UPLOAD.UA
        }
      }
    }
  }, function(t, e, n) {
    var r = n(0),
      o = n(19),
      i = n(32),
      a = n(33),
      u = n(34);
    r._config.VERSION = "v2.0.5-a", r.use(o), r.use(a), r.use(i), r.use(u), r.pay = n(35), r.order = n(36), r.request = n(37), r._baasRequest = n(38), r.uploadFile = n(39), r.getWXACode = n(40), r.wxDecryptData = n(41), r.wxReportTicket = n(42), r.ErrorTracker = n(43), r._createRequestMethod(), "undefined" != typeof wx && (wx.BaaS = r), t.exports = r
  }, function(t, e, n) {
    var r = n(3),
      o = n(2),
      i = n(5),
      a = n(1),
      u = n(15);
    t.exports = function(t) {
      var e = t._polyfill,
        n = t._config.API,
        s = function() {
          return new Promise(function(n, r) {
            e.wxLogin({
              success: function(t) {
                n(t.code)
              },
              fail: function() {
                t.request.wxRequestFail(r)
              }
            })
          })
        },
        c = function(e, o, u) {
          var s = e.code,
            c = e.createUser;
          return t.request({
            url: n.WECHAT.SILENT_LOGIN,
            method: "POST",
            data: {
              create_user: c,
              code: s
            }
          }).then(a.validateStatusCode).then(function(t) {
            i.set(r.STORAGE_KEY.UID, t.data.user_id), i.set(r.STORAGE_KEY.OPENID, t.data.openid || ""), i.set(r.STORAGE_KEY.UNIONID, t.data.unionid || ""), i.set(r.STORAGE_KEY.AUTH_TOKEN, t.data.token), i.set(r.STORAGE_KEY.IS_ANONYMOUS_USER, 0), i.set(r.STORAGE_KEY.USERINFO, {
              id: t.data.user_id,
              openid: t.data.openid,
              unionid: t.data.unionid
            }), i.set(r.STORAGE_KEY.EXPIRES_AT, Math.floor(Date.now() / 1e3) + t.data.expires_in - 30), o(t)
          }, u)
        },
        f = function() {
          return i.get(r.STORAGE_KEY.AUTH_TOKEN) && !a.isSessionExpired() ? Promise.resolve() : function() {
            var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).createUser,
              e = void 0 === t || t;
            return new Promise(function(t, n) {
              s().then(function(r) {
                c({
                  code: r,
                  createUser: e
                }, t, n)
              }, n)
            })
          }.apply(void 0, arguments)
        },
        l = function(t) {
          if (!t || !t.detail) throw new o(603);
          var e = t.detail,
            n = !!t.createUser;
          return e.userInfo ? f({
            createUser: n
          }).then(function() {
            return p().then(function(t) {
              var e = {
                  rawData: t.rawData,
                  signature: t.signature,
                  encryptedData: t.encryptedData,
                  iv: t.iv
                },
                n = t.userInfo;
              return n.id = i.get(r.STORAGE_KEY.UID), n.openid = i.get(r.STORAGE_KEY.OPENID), n.unionid = i.get(r.STORAGE_KEY.UNIONID), i.set(r.STORAGE_KEY.USERINFO, n), h(e, n)
            })
          }) : Promise.reject(Object.assign(new o(603), {
            id: i.get(r.STORAGE_KEY.UID),
            openid: i.get(r.STORAGE_KEY.OPENID),
            unionid: i.get(r.STORAGE_KEY.UNIONID)
          }))
        },
        h = function(e, o) {
          return t.request({
            url: n.WECHAT.AUTHENTICATE,
            method: "POST",
            data: e
          }).then(a.validateStatusCode).then(function(t) {
            !o.unionid && t.data.unionid && (o.unionid = t.data.unionid, i.set(r.STORAGE_KEY.UNIONID, o.unionid)), t.data.user_id && i.set(r.STORAGE_KEY.UID, t.data.user_id)
          })
        },
        p = function() {
          return new Promise(function(e, n) {
            t._polyfill.wxGetUserInfo({
              success: e,
              fail: n
            })
          })
        };
      Object.assign(t.auth, {
        silentLogin: a.rateLimit(f),
        loginWithWechat: a.rateLimit(function(t) {
          var e = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
            createUser: !0
          }).createUser;
          return (t && t.detail ? l(Object.assign(t, {
            createUser: e
          })) : f({
            createUser: e
          })).then(function() {
            return u.getCurrentUser()
          })
        }),
        handleUserInfo: a.rateLimit(l),
        linkWechat: a.rateLimit(function(e) {
          var r = !1;
          return e && e.userInfo && (r = !0), s().then(function(e) {
            return (r ? p() : Promise.resolve(null)).then(function(r) {
              var o = r ? {
                rawData: r.rawData,
                signature: r.signature,
                encryptedData: r.encryptedData,
                iv: r.iv,
                code: e
              } : {
                code: e
              };
              return t._baasRequest({
                method: "POST",
                url: n.WECHAT.USER_ASSOCIATE,
                data: o
              })
            })
          })
        })
      }), t.login = function(t) {
        return !1 === t ? f().then(function() {
          return t = {
            id: i.get(r.STORAGE_KEY.UID),
            openid: i.get(r.STORAGE_KEY.OPENID),
            unionid: i.get(r.STORAGE_KEY.UNIONID)
          }, e = r.STORAGE_KEY.EXPIRES_AT, n = i.get(r.STORAGE_KEY.EXPIRES_AT), e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : t[e] = n, t;
          var t, e, n
        }) : Promise.reject(new o(605))
      }, t.handleUserInfo = function(e) {
        return t.auth.handleUserInfo(e).then(function() {
          return u.getCurrentUser()
        }).then(function(t) {
          return t.toJSON()
        })
      }, t.logout = t.auth.logout
    }
  }, function(t, e) {
    t.exports = function(t) {
      Object.assign(t._polyfill, {
        wxLogin: function() {
          var t;
          return (t = wx).login.apply(t, arguments)
        },
        wxGetUserInfo: function() {
          var t;
          return (t = wx).getUserInfo.apply(t, arguments)
        },
        wxPaymentRequest: function() {
          var t;
          return (t = wx).requestPayment.apply(t, arguments)
        },
        CLIENT_PLATFORM: "WECHAT",
        setStorageSync: function(t, e) {
          try {
            return wx.setStorageSync(t, e)
          } catch (n) {
            return wx.setStorageSync(t, e)
          }
        },
        getStorageSync: function(t) {
          try {
            return wx.getStorageSync(t)
          } catch (e) {
            return wx.getStorageSync(t)
          }
        },
        getSystemInfoSync: function() {
          return wx.getSystemInfoSync()
        },
        linkWechat: function() {
          var e;
          return (e = t.auth).linkWechat.apply(e, arguments)
        },
        checkLatestVersion: function() {
          "devtools" === wx.getSystemInfoSync().platform && t.checkVersion({
            platform: "wechat_miniapp"
          })
        }
      })
    }
  }, function(t, e, n) {
    var r = n(3),
      o = n(2),
      i = n(1);
    t.exports = function(t) {
      t.wxCensorImage = function(e) {
        return new Promise(function(n, o) {
          wx.uploadFile({
            url: t._polyfill.getAPIHost() + t._config.API.WECHAT.CENSOR_IMAGE,
            filePath: e,
            name: r.UPLOAD.UPLOAD_FILE_KEY,
            header: {
              Authorization: r.UPLOAD.HEADER_AUTH_VALUE + t.getAuthToken(),
              "X-Hydrogen-Client-Version": t._config.VERSION,
              "X-Hydrogen-Client-Platform": i.getSysPlatform(),
              "X-Hydrogen-Client-ID": t._config.CLIENT_ID,
              "User-Agent": r.UPLOAD.UA
            },
            success: function(t) {
              var e = t.statusCode,
                i = t.data;
              if (parseInt(e) !== r.STATUS_CODE.SUCCESS) return o(t);
              n(JSON.parse(i))
            },
            fail: function() {
              t.request.wxRequestFail(o)
            }
          })
        })
      }, t.wxCensorText = function(e) {
        return e && "string" == typeof e ? t._baasRequest({
          url: t._polyfill.getAPIHost() + t._config.API.WECHAT.CENSOR_MSG,
          method: "POST",
          data: {
            content: e
          }
        }) : Promise.reject(new o(605))
      }
    }
  }, function(t, e, n) {
    var r = n(0),
      o = n(2),
      i = r._polyfill,
      a = r._config.API,
      u = {
        merchandiseSchemaID: "merchandise_schema_id",
        merchandiseRecordID: "merchandise_record_id",
        merchandiseSnapshot: "merchandise_snapshot",
        merchandiseDescription: "merchandise_description",
        totalCost: "total_cost"
      };
    t.exports = function(t) {
      var e = {};
      for (var n in t) e[u[n]] = t[n];
      return e.gateway_type = "weixin_tenpay", r._baasRequest({
        url: a.PAY,
        method: "POST",
        data: e
      }).then(function(t) {
        var e = t.data || {};
        return new Promise(function(t, n) {
          i.wxPaymentRequest({
            appId: e.appId,
            timeStamp: e.timeStamp,
            nonceStr: e.nonceStr,
            package: e.package,
            signType: "MD5",
            paySign: e.paySign,
            success: function(n) {
              return n.transaction_no = e.transaction_no, n.trade_no = e.trade_no, t(n)
            },
            complete: function(t) {
              "requestPayment:fail cancel" == t.errMsg && n(new o(607))
            },
            fail: function(t) {
              "requestPayment:fail cancel" == t.errMsg ? n(new o(607)) : n(new o(608, t.errMsg))
            }
          })
        })
      })
    }
  }, function(t, e, n) {
    var r = n(0);
    t.exports = function(t) {
      return (new r.Order).get(t.transactionID)
    }
  }, function(t, e, n) {
    var r = n(0),
      o = n(2),
      i = n(1),
      a = n(3),
      u = function(t) {
        wx.getNetworkType({
          success: function(e) {
            "none" === e.networkType ? t(new o(600)) : t(new o(601))
          }
        })
      };
    t.exports = function(t) {
      var e = t.url,
        n = t.method,
        s = void 0 === n ? "GET" : n,
        c = t.data,
        f = void 0 === c ? {} : c,
        l = t.header,
        h = void 0 === l ? {} : l,
        p = t.dataType,
        d = void 0 === p ? "json" : p;
      return new Promise(function(t, n) {
        if (!r._config.CLIENT_ID) return n(new o(602));
        var c = i.mergeRequestHeader(h);
        if (!/https?:\/\//.test(e)) {
          var l = r._config.DEBUG ? r._config.API_HOST : r._polyfill.getAPIHost();
          e = l.replace(/\/$/, "") + "/" + e.replace(/^\//, "")
        }
        wx.request({
          method: s,
          url: e,
          data: f,
          header: c,
          dataType: d,
          success: t,
          fail: function() {
            u(n)
          }
        }), i.log(a.LOG_LEVEL.INFO, "Request => " + e)
      })
    }, t.exports.wxRequestFail = u
  }, function(t, e, n) {
    var r = n(1),
      o = n(0),
      i = n(3),
      a = n(5);
    t.exports = function(t) {
      var e = arguments,
        n = t.url,
        u = t.method,
        s = void 0 === u ? "GET" : u,
        c = t.data,
        f = void 0 === c ? {} : c,
        l = t.header,
        h = void 0 === l ? {} : l,
        p = t.dataType,
        d = void 0 === p ? "json" : p;
      return (o._config.AUTO_LOGIN ? o.auth.silentLogin() : Promise.resolve()).then(function() {
        return o.request.apply(null, e)
      }).then(function(t) {
        return t.statusCode === i.STATUS_CODE.UNAUTHORIZED && o._config.AUTO_LOGIN ? (e = {
          header: h,
          method: s,
          url: n,
          data: f,
          dataType: d
        }, a.get(i.STORAGE_KEY.AUTH_TOKEN) && o.clearSession(), void o.auth.silentLogin().then(function() {
          return o.request(e).then(r.validateStatusCode)
        })) : r.validateStatusCode(t);
        var e
      })
    }
  }, function(t, e, n) {
    function r(t) {
      return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      })(t)
    }
    var o = n(3),
      i = n(2),
      a = n(1),
      u = n(30),
      s = u.getUploadFileConfig,
      c = u.getUploadHeaders;
    t.exports = function(t, e, n) {
      if (!t || "object" !== r(t) || !t.filePath) throw new i(605);
      if (e) {
        if ("object" !== r(e)) throw new i(605)
      } else e = {};
      var u, f, l, h, p = null,
        d = new Promise(function(t, e) {
          u = t, f = e
        }),
        y = function(t) {
          return p ? p.onProgressUpdate(t) : l = t, this
        },
        _ = function() {
          return p && p.abort(), h = !0, this
        };
      ! function t(e) {
        return Object.assign(e, {
          catch: function() {
            for (var e, n = arguments.length, r = new Array(n), o = 0; o < n; o++) r[o] = arguments[o];
            var i = (e = Promise.prototype.catch).call.apply(e, [this].concat(r));
            return t(i), i
          },
          then: function() {
            for (var e, n = arguments.length, r = new Array(n), o = 0; o < n; o++) r[o] = arguments[o];
            var i = (e = Promise.prototype.then).call.apply(e, [this].concat(r));
            return t(i), i
          },
          abort: _,
          onProgressUpdate: y
        })
      }(d);
      var g = a.getFileNameFromPath(t.filePath);
      return s(g, a.replaceQueryParams(e)).then(function(e) {
        if (h) return f(new Error("aborted"));
        var r = {
          id: e.data.id,
          fileName: g,
          policy: e.data.policy,
          authorization: e.data.authorization,
          uploadUrl: e.data.upload_url,
          filePath: t.filePath,
          destLink: e.data.file_link
        };
        p = function(t, e, n, r) {
          return wx.uploadFile({
            url: t.uploadUrl,
            filePath: t.filePath,
            name: o.UPLOAD.UPLOAD_FILE_KEY,
            formData: {
              authorization: t.authorization,
              policy: t.policy
            },
            header: c(),
            success: function(o) {
              var i = {},
                u = JSON.parse(o.data);
              i.status = "ok", i.path = t.destLink, i.file = {
                id: t.id,
                name: t.fileName,
                created_at: u.time,
                mime_type: u.mimetype,
                cdn_path: u.url,
                size: u.file_size
              }, delete o.data, o.data = r && "json" === r ? i : JSON.stringify(i);
              try {
                e(a.validateStatusCode(o))
              } catch (t) {
                n(t)
              }
            },
            fail: function() {
              BaaS.request.wxRequestFail(n)
            }
          })
        }(r, function(t) {
          if (h) return f(new Error("aborted"));
          u(t)
        }, f, n), l && p.onProgressUpdate(l)
      }, f), d
    }
  }, function(t, e, n) {
    var r = n(0),
      o = n(2),
      i = n(1),
      a = r._config.API;
    t.exports = function(t, e, n, u) {
      var s = function(t, e, n, r) {
        var a = {},
          u = ["wxacode", "wxacodeunlimit", "wxaqrcode"].indexOf(t);
        if (!i.isString(t) || -1 === u) throw new o(605, 'type 为字符串类型且只接受 "wxacode", "wxacodeunlimit", "wxaqrcode" 其中一种');
        if (a.code_type = ["miniapp_permanent", "miniapp_temporary", "miniapp_qr"][u], !e || e.constructor !== Object) throw new o(605, "params 为 Object 类型");
        if ("wxacode" === t || "wxaqrcode" === t) {
          if (!e.hasOwnProperty("path")) throw new o(605, '当 type 为 "wxacode" 或 "wxaqrcode" 时，params 中必须带有 "path" 属性');
          a.path = e.path
        }
        if ("wxacodeunlimit" === t) {
          if (!e.hasOwnProperty("scene")) throw new o(605, '当 type 为 "wxacodeunlimit" 时，params 中必须带有 "scene" 属性');
          a.scene = e.scene, e.hasOwnProperty("page") && (a.path = e.page)
        }
        return a.options = {}, e.hasOwnProperty("width") && (a.options.width = e.width), e.hasOwnProperty("auto_color") && (a.options.auto_color = e.auto_color), e.hasOwnProperty("line_color") && (a.options.line_color = e.line_color), e.hasOwnProperty("is_hyaline") && (a.options.is_hyaline = e.is_hyaline), !0 === n && (a.upload_to_cdn = !0, r && (a.category_name = r)), a
      }(t, e, n, u);
      return r._baasRequest({
        url: a.WECHAT.WXACODE,
        method: "POST",
        data: s
      }).then(function(t) {
        return t.data
      })
    }
  }, function(t, e, n) {
    var r = n(0),
      o = n(2),
      i = r._config.API,
      a = function(t) {
        if (!(t instanceof Array) || t.length < 3) return !1;
        return -1 !== ["we-run-data", "open-gid", "phone-number"].indexOf(t[2])
      };
    t.exports = function() {
      for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
      if (!a(e)) throw new o(605);
      var u = {
        encryptedData: e[0],
        iv: e[1]
      };
      return r._baasRequest({
        url: i.WECHAT.DECRYPT + e[2] + "/",
        method: "POST",
        data: u
      }).then(function(t) {
        return t.data
      }, function(t) {
        if (403 === t.code) throw new o(403, "微信解密插件未开启");
        throw t
      })
    }
  }, function(t, e, n) {
    var r = n(0),
      o = n(1),
      i = r._config.API;
    t.exports = function(t) {
      var e = o.makeReportTicketParam(t);
      return r._baasRequest({
        url: i.WECHAT.TEMPLATE_MESSAGE,
        method: "POST",
        data: e
      })
    }
  }, function(t, e, n) {
    var r = n(0),
      o = n(2),
      i = r._config,
      a = r._polyfill,
      u = n(44),
      s = !1;
    t.exports = {
      enable: function() {
        var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).usePlugins,
          e = void 0 !== t && t;
        if (!r._config || !r._config.CLIENT_ID) throw new o(602);
        return u.usePlugins = "plugin" === a.SDK_TYPE || e, s = !0, u.init(!0, {
          clientId: r._config.CLIENT_ID
        }, i.VERSION)
      },
      track: function() {
        if (!s) throw new o(610);
        return u.track.apply(u, arguments)
      },
      metaData: function() {
        if (!s) throw new o(610);
        return u.metaData.apply(u, arguments)
      }
    }
  }, function(t, e, n) {
    (function(r) {
      var o, i, a;

      function u(t) {
        return (u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
          return typeof t
        } : function(t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
      }
      a = function() {
        var t = {
            url: {
              sdkDown: "https://dataapi.testin.cn/sdkDown",
              track: "https://dataapi.testin.cn/sendEvents"
            },
            sdkDown: {
              pid: "",
              pl: "miniPrograms",
              sv: "1.1.1",
              testin_id: "",
              testin_time: 0,
              testin_type: "track",
              testin_name: "testin_bug",
              testin_first: !0,
              di: {
                testin_schan: ["testin_schan_bugout"],
                testin_av: "",
                testin_wechat_ver: "",
                testin_tm: 0,
                testin_pa: "",
                testin_brand: "",
                testin_model: "",
                testin_os: "",
                testin_ov: "",
                testin_dh: 0,
                testin_dw: 0,
                testin_lan: "",
                testin_net: "",
                testin_bug_type: 1,
                testin_bug_lan: 4,
                testin_component_ver: "",
                testin_bug_bn: "",
                testin_bug_pr: "",
                testin_bug_ww: 0,
                testin_bug_wh: 0,
                testin_bug_sbh: "",
                testin_bug_fss: "",
                testin_bus: 2
              }
            },
            record: {
              testin_pid: "",
              testin_id: "",
              testin_pl: "miniPrograms",
              testin_time: 0,
              testin_type: "track",
              testin_name: "testin_bug",
              testin_sv: "1.1.1",
              attrs: {
                testin_av: "",
                testin_wechat_ver: "",
                testin_tm: 0,
                testin_pa: "",
                testin_brand: "",
                testin_model: "",
                testin_os: "",
                testin_ov: "",
                testin_dh: 0,
                testin_dw: 0,
                testin_lan: "",
                testin_url: "",
                testin_net: "",
                testin_bug_type: 1,
                testin_bug_lan: 4,
                testin_component_ver: "",
                testin_bug_bn: "",
                testin_bug_stack: "",
                testin_bug_sv: "1.1.1",
                testin_bug_pr: "0",
                testin_bug_ww: 0,
                testin_bug_wh: 0,
                testin_bug_sbh: "",
                testin_bug_fss: "",
                testin_bug_rea: "",
                testin_bug_slog: "",
                testin_bug_name: "",
                testin_bus: 2
              }
            },
            breadcrumb: [],
            sdkInitComplete: !1
          },
          e = {
            uuid: function() {
              var t, e;
              ! function() {
                if (!t) {
                  var n = new Array(16);
                  e = t = function() {
                    for (var t, e = 0; e < 16; e++) 0 == (3 & e) && (t = 4294967296 * Math.random()), n[e] = t >>> ((3 & e) << 3) & 255;
                    return n
                  }
                }
              }();
              for (var n = "function" == typeof r ? r : Array, o = [], i = {}, a = 0; a < 256; a++) o[a] = (a + 256).toString(16).substr(1), i[o[a]] = a;

              function u(t, e) {
                var n = e || 0,
                  r = o;
                return r[t[n++]] + r[t[n++]] + r[t[n++]] + r[t[n++]] + "-" + r[t[n++]] + r[t[n++]] + "-" + r[t[n++]] + r[t[n++]] + "-" + r[t[n++]] + r[t[n++]] + "-" + r[t[n++]] + r[t[n++]] + r[t[n++]] + r[t[n++]] + r[t[n++]] + r[t[n++]]
              }

              function s(e, r, o) {
                var i = r && o || 0;
                "string" == typeof e && (r = "binary" === e ? new n(16) : null, e = null);
                var a = (e = e || {}).random || (e.rng || t)();
                if (a[6] = 15 & a[6] | 64, a[8] = 63 & a[8] | 128, r)
                  for (var s = 0; s < 16; s++) r[i + s] = a[s];
                return r || u(a)
              }
              var c = s;
              return c.v4 = s, c.parse = function(t, e, n) {
                var r = e && n || 0,
                  o = 0;
                for (e = e || [], t.toLowerCase().replace(/[0-9a-f]{2}/g, function(t) {
                    o < 16 && (e[r + o++] = i[t])
                  }); o < 16;) e[r + o++] = 0;
                return e
              }, c.unparse = u, c.BufferClass = n, c._rng = t, c._mathRNG = e, c._nodeRNG = void 0, c._whatwgRNG = void 0, c()
            },
            getCurrentPageUrl: function() {
              var t = getCurrentPages();
              if (t.length) return t[t.length - 1]
            },
            getAesKey: function() {
              var t, e = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
                n = e.length,
                r = "";
              for (t = 0; t < 16; t++) r += e.charAt(Math.floor(Math.random() * n));
              return r
            },
            reWriteApp: function(e) {
              var n = App,
                r = this;
              App = function(o) {
                return ["onLaunch", "onShow", "onHide", "onError"].forEach(function(n) {
                  var i = o[n];
                  o[n] = function(o) {
                    "onLaunch" === n && (t.sdkDown.di.testin_chan = t.record.attrs.testin_chan = o.scene);
                    var a = {};
                    "onError" === n ? (a.testin_bug_s_time = r.nowTime(), a.testin_bug_s_tit = "⬆⬆⬆⬆⬆BUG在此⬆⬆⬆⬆⬆", a.testin_bug_s_con = "App: " + n) : (a.testin_bug_s_time = r.nowTime(), a.testin_bug_s_tit = o && o.path || "", a.testin_bug_s_con = "App: " + n), r.pushToBreadcrumb(a), "onError" === n && e.track(o), i && i.call(this, o)
                  }
                }), n(o)
              }
            },
            reWritePage: function() {
              var t = this,
                e = Page;
              Page = function(n) {
                return Object.keys(n).forEach(function(e) {
                  "function" == typeof n[e] && t.recordPageFn(n, e)
                }), n.onReady || t.recordPageFn(n, "onReady"), n.onLoad || t.recordPageFn(n, "onLoad"), e(n)
              }
            },
            reWriteWxRequest: function() {
              var e = this,
                n = wx.request;
              try {
                Object.defineProperty(wx, "request", {
                  configurable: !0,
                  enumerable: !0,
                  writable: !0,
                  value: function() {
                    var r = arguments[0] || {},
                      o = e.nowTime();
                    return r.url.indexOf(t.url.sdkDown) > -1 || r.url.indexOf(t.url.track) > -1 ? n.apply(wx, arguments) : (r.complete ? e.reWriteComplete(r, o) : r.complete = function(t) {
                      e.pushToBreadcrumb({
                        testin_bug_s_time: e.nowTime(),
                        testin_bug_s_tit: r.url,
                        testin_bug_s_con: r.method + ", status: " + t.statusCode
                      })
                    }, n.apply(wx, arguments))
                  }
                })
              } catch (t) {
                console.log(t, "此内容为bugout所有~~")
              }
            },
            reWriteComplete: function(t, e) {
              var n = this,
                r = t.complete;
              t.complete = function(e) {
                return n.pushToBreadcrumb({
                  testin_bug_s_time: n.nowTime(),
                  testin_bug_s_tit: t.url,
                  testin_bug_s_con: t.method + ", status: " + e.statusCode
                }), r(e)
              }
            },
            reWriteConsole: function() {
              var t = {
                  log: "L",
                  info: "I",
                  error: "E",
                  warn: "W",
                  debug: "D"
                },
                e = this;
              this.consoleList = [], ["debug", "error", "info", "log", "warn"].forEach(function(n) {
                var r;
                r = console[n], console[n] = function(o) {
                  e.consoleList.push(e.nowTimeTrans() + " " + t[n] + "/console(0): " + o), e.consoleList.length > 100 && e.consoleList.shift(), r.apply(console, arguments)
                }
              })
            },
            recordPageFn: function(t, e) {
              var n = t[e],
                r = this;
              t[e] = function() {
                "onLoad" !== e && "onShow" !== e || (r.activePage = r.getCurrentPageUrl());
                var t = {
                  testin_bug_s_time: r.nowTime(),
                  testin_bug_s_tit: r.activePage ? r.activePage.route : "-",
                  testin_bug_s_con: "Page: " + e
                };
                return "onLoad" === e && (t.args = arguments), r.pushToBreadcrumb(t), n && n.apply(this, arguments)
              }
            },
            nowTime: function() {
              return (new Date).getTime()
            },
            timeZone: function() {
              return (new Date).getTimezoneOffset() / 60
            },
            nowTimeTrans: function() {
              var t = new Date;
              return (t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + "-" + (t.getDate() < 10 ? "0" + t.getDate() : t.getDate()) + " " + (t.getHours() < 10 ? "0" + t.getHours() : t.getHours()) + ":" + (t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes()) + ":" + (t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds()) + "." + (t.getTime() + "").slice(-3)
            },
            pushToBreadcrumb: function(e) {
              t.breadcrumb.push(e), t.breadcrumb.length > 100 && t.breadcrumb.shift()
            },
            getStorage: function() {
              var e = this;
              wx.getStorage({
                key: "testin_id",
                success: function(e) {
                  t.sdkDown.testin_first = !1, t.sdkDown.testin_id = t.record.testin_eid = t.record.testin_id = e.data
                },
                fail: function() {
                  var n = e.uuid();
                  wx.setStorage({
                    key: "testin_id",
                    data: n
                  }), t.sdkDown.testin_first = !0, t.sdkDown.testin_id = t.record.testin_eid = t.record.testin_id = n
                }
              })
            }
          },
          n = "function" == typeof Symbol && "symbol" == u(Symbol.iterator) ? function(t) {
            return u(t)
          } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : u(t)
          };
        return {
          init: function(r, o, i) {
            var a = void 0,
              u = this;

            function s(n, o) {
              if (e.reWriteConsole(), n.usePlugins || (e.reWriteWxRequest(), e.reWritePage(), e.reWriteApp(u)), "boolean" == typeof r) {
                if (t.sdkDown.di.testin_zone = t.record.attrs.testin_zone = e.timeZone(), t.sdkDown.di.testin_av = t.record.attrs.testin_av = i, e.bugOutPower = r, wx.getAccountInfoSync) {
                  var a = wx.getAccountInfoSync();
                  t.sdkDown.di.testin_pa = t.record.attrs.testin_pa = a.miniProgram.appId
                }
                t.sdkDown.pid = t.record.testin_pid = o, t.sdkDown.testin_time = e.nowTime(), e.getStorage(), wx.getSystemInfo({
                  success: function(e) {
                    var n = e.system.split(" ");
                    t.record.attrs.testin_wechat_ver = t.sdkDown.di.testin_wechat_ver = e.version, t.record.attrs.testin_brand = t.sdkDown.di.testin_brand = e.brand, t.record.attrs.testin_model = t.sdkDown.di.testin_model = e.model, t.record.attrs.testin_os = t.sdkDown.di.testin_os = n[0], t.record.attrs.testin_ov = t.sdkDown.di.testin_ov = n[1], t.record.attrs.testin_dh = t.sdkDown.di.testin_dh = e.screenHeight, t.record.attrs.testin_dw = t.sdkDown.di.testin_dw = e.screenWidth, t.record.attrs.testin_lan = t.sdkDown.di.testin_lan = e.language, t.record.attrs.testin_bug_bn = t.sdkDown.di.testin_bug_bn = e.platform, t.record.attrs.testin_component_ver = t.sdkDown.di.testin_component_ver = e.SDKVersion, t.record.attrs.testin_bug_pr = t.sdkDown.di.testin_bug_pr = e.pixelRatio.toFixed(1), t.record.attrs.testin_bug_ww = t.sdkDown.di.testin_bug_ww = e.windowWidth, t.record.attrs.testin_bug_wh = t.sdkDown.di.testin_bug_wh = e.windowHeight, t.record.attrs.testin_bug_sbh = t.sdkDown.di.testin_bug_sbh = e.statusBarHeight, t.record.attrs.testin_bug_fss = t.sdkDown.di.testin_bug_fss = e.fontSizeSetting, e.batteryLevel && (t.record.attrs.testin_bat_rem = t.sdkDown.di.testin_bat_rem = e.batteryLevel)
                  },
                  complete: function() {
                    wx.getNetworkType({
                      success: function(e) {
                        t.record.attrs.testin_net = t.sdkDown.di.testin_net = e.networkType
                      },
                      complete: function() {
                        wx.request({
                          url: t.url.sdkDown,
                          method: "POST",
                          data: t.sdkDown
                        })
                      }
                    })
                  }
                })
              } else console.log("请按照集成文档正确集成SDK")
            }
            "object" === (void 0 === o ? "undefined" : n(o)) ? wx.request({
              url: "https://dataapi.testin.cn/api/getappkey/" + o.clientId,
              header: {
                "Content-Type": "text/html;charset=UTF-8"
              },
              success: function(t) {
                a = t.data ? t.data : "noPid", s(u, a)
              }
            }): "string" == typeof o && s(u, a = o)
          },
          track: function(r) {
            if (e.bugOutPower) {
              "string" == typeof r && (t.record.attrs.testin_bug_rea = r.split("\n")[1], t.record.attrs.testin_bug_name = r.split("\n")[0], t.record.attrs.testin_bug_stack = r), "object" === (void 0 === r ? "undefined" : n(r)) && (t.record.attrs.testin_bug_rea = r.message, t.record.attrs.testin_bug_name = r.name, t.record.attrs.testin_bug_stack = r.stack), t.record.attrs.testin_bug_slog = e.consoleList.join("\n"), t.record.attrs.testin_url = e.getCurrentPageUrl() ? e.getCurrentPageUrl().route : "", t.record.testin_time = e.nowTime(), t.record.attrs.testin_bug_steps = JSON.stringify(t.breadcrumb);
              var o = [];
              o.push(t.record), wx.request({
                url: t.url.track,
                method: "POST",
                data: o
              })
            }
          },
          usePlugins: !1,
          metaData: function(e) {
            return t.record.attrs.testin_bug_user = JSON.stringify(Object.assign({}, e))
          }
        }
      }, "object" == u(e) && void 0 !== t ? t.exports = a() : void 0 === (i = "function" == typeof(o = a) ? o.call(e, n, e, t) : o) || (t.exports = i)
    }).call(this, n(45).Buffer)
  }, function(t, e, n) {
    "use strict";
    (function(t) {
      /*!
       * The buffer module from node.js, for the browser.
       *
       * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
       * @license  MIT
       */
      var r = n(46),
        o = n(47),
        i = n(48);

      function a() {
        return s.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
      }

      function u(t, e) {
        if (a() < e) throw new RangeError("Invalid typed array length");
        return s.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = s.prototype : (null === t && (t = new s(e)), t.length = e), t
      }

      function s(t, e, n) {
        if (!(s.TYPED_ARRAY_SUPPORT || this instanceof s)) return new s(t, e, n);
        if ("number" == typeof t) {
          if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
          return l(this, t)
        }
        return c(this, t, e, n)
      }

      function c(t, e, n, r) {
        if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
        return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function(t, e, n, r) {
          if (e.byteLength, n < 0 || e.byteLength < n) throw new RangeError("'offset' is out of bounds");
          if (e.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
          e = void 0 === n && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, n) : new Uint8Array(e, n, r);
          s.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = s.prototype : t = h(t, e);
          return t
        }(t, e, n, r) : "string" == typeof e ? function(t, e, n) {
          "string" == typeof n && "" !== n || (n = "utf8");
          if (!s.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
          var r = 0 | d(e, n),
            o = (t = u(t, r)).write(e, n);
          o !== r && (t = t.slice(0, o));
          return t
        }(t, e, n) : function(t, e) {
          if (s.isBuffer(e)) {
            var n = 0 | p(e.length);
            return 0 === (t = u(t, n)).length ? t : (e.copy(t, 0, 0, n), t)
          }
          if (e) {
            if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || (r = e.length) != r ? u(t, 0) : h(t, e);
            if ("Buffer" === e.type && i(e.data)) return h(t, e.data)
          }
          var r;
          throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
        }(t, e)
      }

      function f(t) {
        if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
        if (t < 0) throw new RangeError('"size" argument must not be negative')
      }

      function l(t, e) {
        if (f(e), t = u(t, e < 0 ? 0 : 0 | p(e)), !s.TYPED_ARRAY_SUPPORT)
          for (var n = 0; n < e; ++n) t[n] = 0;
        return t
      }

      function h(t, e) {
        var n = e.length < 0 ? 0 : 0 | p(e.length);
        t = u(t, n);
        for (var r = 0; r < n; r += 1) t[r] = 255 & e[r];
        return t
      }

      function p(t) {
        if (t >= a()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a().toString(16) + " bytes");
        return 0 | t
      }

      function d(t, e) {
        if (s.isBuffer(t)) return t.length;
        if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
        "string" != typeof t && (t = "" + t);
        var n = t.length;
        if (0 === n) return 0;
        for (var r = !1;;) switch (e) {
          case "ascii":
          case "latin1":
          case "binary":
            return n;
          case "utf8":
          case "utf-8":
          case void 0:
            return Y(t).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return 2 * n;
          case "hex":
            return n >>> 1;
          case "base64":
            return B(t).length;
          default:
            if (r) return Y(t).length;
            e = ("" + e).toLowerCase(), r = !0
        }
      }

      function y(t, e, n) {
        var r = t[e];
        t[e] = t[n], t[n] = r
      }

      function _(t, e, n, r, o) {
        if (0 === t.length) return -1;
        if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = o ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
          if (o) return -1;
          n = t.length - 1
        } else if (n < 0) {
          if (!o) return -1;
          n = 0
        }
        if ("string" == typeof e && (e = s.from(e, r)), s.isBuffer(e)) return 0 === e.length ? -1 : g(t, e, n, r, o);
        if ("number" == typeof e) return e &= 255, s.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, e, n) : Uint8Array.prototype.lastIndexOf.call(t, e, n) : g(t, [e], n, r, o);
        throw new TypeError("val must be string, number or Buffer")
      }

      function g(t, e, n, r, o) {
        var i, a = 1,
          u = t.length,
          s = e.length;
        if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
          if (t.length < 2 || e.length < 2) return -1;
          a = 2, u /= 2, s /= 2, n /= 2
        }

        function c(t, e) {
          return 1 === a ? t[e] : t.readUInt16BE(e * a)
        }
        if (o) {
          var f = -1;
          for (i = n; i < u; i++)
            if (c(t, i) === c(e, -1 === f ? 0 : i - f)) {
              if (-1 === f && (f = i), i - f + 1 === s) return f * a
            } else -1 !== f && (i -= i - f), f = -1
        } else
          for (n + s > u && (n = u - s), i = n; i >= 0; i--) {
            for (var l = !0, h = 0; h < s; h++)
              if (c(t, i + h) !== c(e, h)) {
                l = !1;
                break
              }
            if (l) return i
          }
        return -1
      }

      function v(t, e, n, r) {
        n = Number(n) || 0;
        var o = t.length - n;
        r ? (r = Number(r)) > o && (r = o) : r = o;
        var i = e.length;
        if (i % 2 != 0) throw new TypeError("Invalid hex string");
        r > i / 2 && (r = i / 2);
        for (var a = 0; a < r; ++a) {
          var u = parseInt(e.substr(2 * a, 2), 16);
          if (isNaN(u)) return a;
          t[n + a] = u
        }
        return a
      }

      function b(t, e, n, r) {
        return F(Y(e, t.length - n), t, n, r)
      }

      function E(t, e, n, r) {
        return F(function(t) {
          for (var e = [], n = 0; n < t.length; ++n) e.push(255 & t.charCodeAt(n));
          return e
        }(e), t, n, r)
      }

      function m(t, e, n, r) {
        return E(t, e, n, r)
      }

      function w(t, e, n, r) {
        return F(B(e), t, n, r)
      }

      function O(t, e, n, r) {
        return F(function(t, e) {
          for (var n, r, o, i = [], a = 0; a < t.length && !((e -= 2) < 0); ++a) n = t.charCodeAt(a), r = n >> 8, o = n % 256, i.push(o), i.push(r);
          return i
        }(e, t.length - n), t, n, r)
      }

      function S(t, e, n) {
        return 0 === e && n === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, n))
      }

      function T(t, e, n) {
        n = Math.min(t.length, n);
        for (var r = [], o = e; o < n;) {
          var i, a, u, s, c = t[o],
            f = null,
            l = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
          if (o + l <= n) switch (l) {
            case 1:
              c < 128 && (f = c);
              break;
            case 2:
              128 == (192 & (i = t[o + 1])) && (s = (31 & c) << 6 | 63 & i) > 127 && (f = s);
              break;
            case 3:
              i = t[o + 1], a = t[o + 2], 128 == (192 & i) && 128 == (192 & a) && (s = (15 & c) << 12 | (63 & i) << 6 | 63 & a) > 2047 && (s < 55296 || s > 57343) && (f = s);
              break;
            case 4:
              i = t[o + 1], a = t[o + 2], u = t[o + 3], 128 == (192 & i) && 128 == (192 & a) && 128 == (192 & u) && (s = (15 & c) << 18 | (63 & i) << 12 | (63 & a) << 6 | 63 & u) > 65535 && s < 1114112 && (f = s)
          }
          null === f ? (f = 65533, l = 1) : f > 65535 && (f -= 65536, r.push(f >>> 10 & 1023 | 55296), f = 56320 | 1023 & f), r.push(f), o += l
        }
        return function(t) {
          var e = t.length;
          if (e <= A) return String.fromCharCode.apply(String, t);
          var n = "",
            r = 0;
          for (; r < e;) n += String.fromCharCode.apply(String, t.slice(r, r += A));
          return n
        }(r)
      }
      e.Buffer = s, e.SlowBuffer = function(t) {
        +t != t && (t = 0);
        return s.alloc(+t)
      }, e.INSPECT_MAX_BYTES = 50, s.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
        try {
          var t = new Uint8Array(1);
          return t.__proto__ = {
            __proto__: Uint8Array.prototype,
            foo: function() {
              return 42
            }
          }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
        } catch (t) {
          return !1
        }
      }(), e.kMaxLength = a(), s.poolSize = 8192, s._augment = function(t) {
        return t.__proto__ = s.prototype, t
      }, s.from = function(t, e, n) {
        return c(null, t, e, n)
      }, s.TYPED_ARRAY_SUPPORT && (s.prototype.__proto__ = Uint8Array.prototype, s.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && s[Symbol.species] === s && Object.defineProperty(s, Symbol.species, {
        value: null,
        configurable: !0
      })), s.alloc = function(t, e, n) {
        return function(t, e, n, r) {
          return f(e), e <= 0 ? u(t, e) : void 0 !== n ? "string" == typeof r ? u(t, e).fill(n, r) : u(t, e).fill(n) : u(t, e)
        }(null, t, e, n)
      }, s.allocUnsafe = function(t) {
        return l(null, t)
      }, s.allocUnsafeSlow = function(t) {
        return l(null, t)
      }, s.isBuffer = function(t) {
        return !(null == t || !t._isBuffer)
      }, s.compare = function(t, e) {
        if (!s.isBuffer(t) || !s.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
        if (t === e) return 0;
        for (var n = t.length, r = e.length, o = 0, i = Math.min(n, r); o < i; ++o)
          if (t[o] !== e[o]) {
            n = t[o], r = e[o];
            break
          }
        return n < r ? -1 : r < n ? 1 : 0
      }, s.isEncoding = function(t) {
        switch (String(t).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return !0;
          default:
            return !1
        }
      }, s.concat = function(t, e) {
        if (!i(t)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === t.length) return s.alloc(0);
        var n;
        if (void 0 === e)
          for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
        var r = s.allocUnsafe(e),
          o = 0;
        for (n = 0; n < t.length; ++n) {
          var a = t[n];
          if (!s.isBuffer(a)) throw new TypeError('"list" argument must be an Array of Buffers');
          a.copy(r, o), o += a.length
        }
        return r
      }, s.byteLength = d, s.prototype._isBuffer = !0, s.prototype.swap16 = function() {
        var t = this.length;
        if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var e = 0; e < t; e += 2) y(this, e, e + 1);
        return this
      }, s.prototype.swap32 = function() {
        var t = this.length;
        if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var e = 0; e < t; e += 4) y(this, e, e + 3), y(this, e + 1, e + 2);
        return this
      }, s.prototype.swap64 = function() {
        var t = this.length;
        if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var e = 0; e < t; e += 8) y(this, e, e + 7), y(this, e + 1, e + 6), y(this, e + 2, e + 5), y(this, e + 3, e + 4);
        return this
      }, s.prototype.toString = function() {
        var t = 0 | this.length;
        return 0 === t ? "" : 0 === arguments.length ? T(this, 0, t) : function(t, e, n) {
          var r = !1;
          if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
          if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
          if ((n >>>= 0) <= (e >>>= 0)) return "";
          for (t || (t = "utf8");;) switch (t) {
            case "hex":
              return P(this, e, n);
            case "utf8":
            case "utf-8":
              return T(this, e, n);
            case "ascii":
              return I(this, e, n);
            case "latin1":
            case "binary":
              return R(this, e, n);
            case "base64":
              return S(this, e, n);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return D(this, e, n);
            default:
              if (r) throw new TypeError("Unknown encoding: " + t);
              t = (t + "").toLowerCase(), r = !0
          }
        }.apply(this, arguments)
      }, s.prototype.equals = function(t) {
        if (!s.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
        return this === t || 0 === s.compare(this, t)
      }, s.prototype.inspect = function() {
        var t = "",
          n = e.INSPECT_MAX_BYTES;
        return this.length > 0 && (t = this.toString("hex", 0, n).match(/.{2}/g).join(" "), this.length > n && (t += " ... ")), "<Buffer " + t + ">"
      }, s.prototype.compare = function(t, e, n, r, o) {
        if (!s.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
        if (void 0 === e && (e = 0), void 0 === n && (n = t ? t.length : 0), void 0 === r && (r = 0), void 0 === o && (o = this.length), e < 0 || n > t.length || r < 0 || o > this.length) throw new RangeError("out of range index");
        if (r >= o && e >= n) return 0;
        if (r >= o) return -1;
        if (e >= n) return 1;
        if (this === t) return 0;
        for (var i = (o >>>= 0) - (r >>>= 0), a = (n >>>= 0) - (e >>>= 0), u = Math.min(i, a), c = this.slice(r, o), f = t.slice(e, n), l = 0; l < u; ++l)
          if (c[l] !== f[l]) {
            i = c[l], a = f[l];
            break
          }
        return i < a ? -1 : a < i ? 1 : 0
      }, s.prototype.includes = function(t, e, n) {
        return -1 !== this.indexOf(t, e, n)
      }, s.prototype.indexOf = function(t, e, n) {
        return _(this, t, e, n, !0)
      }, s.prototype.lastIndexOf = function(t, e, n) {
        return _(this, t, e, n, !1)
      }, s.prototype.write = function(t, e, n, r) {
        if (void 0 === e) r = "utf8", n = this.length, e = 0;
        else if (void 0 === n && "string" == typeof e) r = e, n = this.length, e = 0;
        else {
          if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
          e |= 0, isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0)
        }
        var o = this.length - e;
        if ((void 0 === n || n > o) && (n = o), t.length > 0 && (n < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
        r || (r = "utf8");
        for (var i = !1;;) switch (r) {
          case "hex":
            return v(this, t, e, n);
          case "utf8":
          case "utf-8":
            return b(this, t, e, n);
          case "ascii":
            return E(this, t, e, n);
          case "latin1":
          case "binary":
            return m(this, t, e, n);
          case "base64":
            return w(this, t, e, n);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return O(this, t, e, n);
          default:
            if (i) throw new TypeError("Unknown encoding: " + r);
            r = ("" + r).toLowerCase(), i = !0
        }
      }, s.prototype.toJSON = function() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        }
      };
      var A = 4096;

      function I(t, e, n) {
        var r = "";
        n = Math.min(t.length, n);
        for (var o = e; o < n; ++o) r += String.fromCharCode(127 & t[o]);
        return r
      }

      function R(t, e, n) {
        var r = "";
        n = Math.min(t.length, n);
        for (var o = e; o < n; ++o) r += String.fromCharCode(t[o]);
        return r
      }

      function P(t, e, n) {
        var r = t.length;
        (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);
        for (var o = "", i = e; i < n; ++i) o += G(t[i]);
        return o
      }

      function D(t, e, n) {
        for (var r = t.slice(e, n), o = "", i = 0; i < r.length; i += 2) o += String.fromCharCode(r[i] + 256 * r[i + 1]);
        return o
      }

      function L(t, e, n) {
        if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
        if (t + e > n) throw new RangeError("Trying to access beyond buffer length")
      }

      function C(t, e, n, r, o, i) {
        if (!s.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (e > o || e < i) throw new RangeError('"value" argument is out of bounds');
        if (n + r > t.length) throw new RangeError("Index out of range")
      }

      function U(t, e, n, r) {
        e < 0 && (e = 65535 + e + 1);
        for (var o = 0, i = Math.min(t.length - n, 2); o < i; ++o) t[n + o] = (e & 255 << 8 * (r ? o : 1 - o)) >>> 8 * (r ? o : 1 - o)
      }

      function k(t, e, n, r) {
        e < 0 && (e = 4294967295 + e + 1);
        for (var o = 0, i = Math.min(t.length - n, 4); o < i; ++o) t[n + o] = e >>> 8 * (r ? o : 3 - o) & 255
      }

      function N(t, e, n, r, o, i) {
        if (n + r > t.length) throw new RangeError("Index out of range");
        if (n < 0) throw new RangeError("Index out of range")
      }

      function j(t, e, n, r, i) {
        return i || N(t, 0, n, 4), o.write(t, e, n, r, 23, 4), n + 4
      }

      function x(t, e, n, r, i) {
        return i || N(t, 0, n, 8), o.write(t, e, n, r, 52, 8), n + 8
      }
      s.prototype.slice = function(t, e) {
        var n, r = this.length;
        if ((t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), (e = void 0 === e ? r : ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t), s.TYPED_ARRAY_SUPPORT)(n = this.subarray(t, e)).__proto__ = s.prototype;
        else {
          var o = e - t;
          n = new s(o, void 0);
          for (var i = 0; i < o; ++i) n[i] = this[i + t]
        }
        return n
      }, s.prototype.readUIntLE = function(t, e, n) {
        t |= 0, e |= 0, n || L(t, e, this.length);
        for (var r = this[t], o = 1, i = 0; ++i < e && (o *= 256);) r += this[t + i] * o;
        return r
      }, s.prototype.readUIntBE = function(t, e, n) {
        t |= 0, e |= 0, n || L(t, e, this.length);
        for (var r = this[t + --e], o = 1; e > 0 && (o *= 256);) r += this[t + --e] * o;
        return r
      }, s.prototype.readUInt8 = function(t, e) {
        return e || L(t, 1, this.length), this[t]
      }, s.prototype.readUInt16LE = function(t, e) {
        return e || L(t, 2, this.length), this[t] | this[t + 1] << 8
      }, s.prototype.readUInt16BE = function(t, e) {
        return e || L(t, 2, this.length), this[t] << 8 | this[t + 1]
      }, s.prototype.readUInt32LE = function(t, e) {
        return e || L(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
      }, s.prototype.readUInt32BE = function(t, e) {
        return e || L(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
      }, s.prototype.readIntLE = function(t, e, n) {
        t |= 0, e |= 0, n || L(t, e, this.length);
        for (var r = this[t], o = 1, i = 0; ++i < e && (o *= 256);) r += this[t + i] * o;
        return r >= (o *= 128) && (r -= Math.pow(2, 8 * e)), r
      }, s.prototype.readIntBE = function(t, e, n) {
        t |= 0, e |= 0, n || L(t, e, this.length);
        for (var r = e, o = 1, i = this[t + --r]; r > 0 && (o *= 256);) i += this[t + --r] * o;
        return i >= (o *= 128) && (i -= Math.pow(2, 8 * e)), i
      }, s.prototype.readInt8 = function(t, e) {
        return e || L(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
      }, s.prototype.readInt16LE = function(t, e) {
        e || L(t, 2, this.length);
        var n = this[t] | this[t + 1] << 8;
        return 32768 & n ? 4294901760 | n : n
      }, s.prototype.readInt16BE = function(t, e) {
        e || L(t, 2, this.length);
        var n = this[t + 1] | this[t] << 8;
        return 32768 & n ? 4294901760 | n : n
      }, s.prototype.readInt32LE = function(t, e) {
        return e || L(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
      }, s.prototype.readInt32BE = function(t, e) {
        return e || L(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
      }, s.prototype.readFloatLE = function(t, e) {
        return e || L(t, 4, this.length), o.read(this, t, !0, 23, 4)
      }, s.prototype.readFloatBE = function(t, e) {
        return e || L(t, 4, this.length), o.read(this, t, !1, 23, 4)
      }, s.prototype.readDoubleLE = function(t, e) {
        return e || L(t, 8, this.length), o.read(this, t, !0, 52, 8)
      }, s.prototype.readDoubleBE = function(t, e) {
        return e || L(t, 8, this.length), o.read(this, t, !1, 52, 8)
      }, s.prototype.writeUIntLE = function(t, e, n, r) {
        (t = +t, e |= 0, n |= 0, r) || C(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
        var o = 1,
          i = 0;
        for (this[e] = 255 & t; ++i < n && (o *= 256);) this[e + i] = t / o & 255;
        return e + n
      }, s.prototype.writeUIntBE = function(t, e, n, r) {
        (t = +t, e |= 0, n |= 0, r) || C(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
        var o = n - 1,
          i = 1;
        for (this[e + o] = 255 & t; --o >= 0 && (i *= 256);) this[e + o] = t / i & 255;
        return e + n
      }, s.prototype.writeUInt8 = function(t, e, n) {
        return t = +t, e |= 0, n || C(this, t, e, 1, 255, 0), s.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1
      }, s.prototype.writeUInt16LE = function(t, e, n) {
        return t = +t, e |= 0, n || C(this, t, e, 2, 65535, 0), s.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : U(this, t, e, !0), e + 2
      }, s.prototype.writeUInt16BE = function(t, e, n) {
        return t = +t, e |= 0, n || C(this, t, e, 2, 65535, 0), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : U(this, t, e, !1), e + 2
      }, s.prototype.writeUInt32LE = function(t, e, n) {
        return t = +t, e |= 0, n || C(this, t, e, 4, 4294967295, 0), s.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : k(this, t, e, !0), e + 4
      }, s.prototype.writeUInt32BE = function(t, e, n) {
        return t = +t, e |= 0, n || C(this, t, e, 4, 4294967295, 0), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : k(this, t, e, !1), e + 4
      }, s.prototype.writeIntLE = function(t, e, n, r) {
        if (t = +t, e |= 0, !r) {
          var o = Math.pow(2, 8 * n - 1);
          C(this, t, e, n, o - 1, -o)
        }
        var i = 0,
          a = 1,
          u = 0;
        for (this[e] = 255 & t; ++i < n && (a *= 256);) t < 0 && 0 === u && 0 !== this[e + i - 1] && (u = 1), this[e + i] = (t / a >> 0) - u & 255;
        return e + n
      }, s.prototype.writeIntBE = function(t, e, n, r) {
        if (t = +t, e |= 0, !r) {
          var o = Math.pow(2, 8 * n - 1);
          C(this, t, e, n, o - 1, -o)
        }
        var i = n - 1,
          a = 1,
          u = 0;
        for (this[e + i] = 255 & t; --i >= 0 && (a *= 256);) t < 0 && 0 === u && 0 !== this[e + i + 1] && (u = 1), this[e + i] = (t / a >> 0) - u & 255;
        return e + n
      }, s.prototype.writeInt8 = function(t, e, n) {
        return t = +t, e |= 0, n || C(this, t, e, 1, 127, -128), s.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
      }, s.prototype.writeInt16LE = function(t, e, n) {
        return t = +t, e |= 0, n || C(this, t, e, 2, 32767, -32768), s.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : U(this, t, e, !0), e + 2
      }, s.prototype.writeInt16BE = function(t, e, n) {
        return t = +t, e |= 0, n || C(this, t, e, 2, 32767, -32768), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : U(this, t, e, !1), e + 2
      }, s.prototype.writeInt32LE = function(t, e, n) {
        return t = +t, e |= 0, n || C(this, t, e, 4, 2147483647, -2147483648), s.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : k(this, t, e, !0), e + 4
      }, s.prototype.writeInt32BE = function(t, e, n) {
        return t = +t, e |= 0, n || C(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : k(this, t, e, !1), e + 4
      }, s.prototype.writeFloatLE = function(t, e, n) {
        return j(this, t, e, !0, n)
      }, s.prototype.writeFloatBE = function(t, e, n) {
        return j(this, t, e, !1, n)
      }, s.prototype.writeDoubleLE = function(t, e, n) {
        return x(this, t, e, !0, n)
      }, s.prototype.writeDoubleBE = function(t, e, n) {
        return x(this, t, e, !1, n)
      }, s.prototype.copy = function(t, e, n, r) {
        if (n || (n = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < n && (r = n), r === n) return 0;
        if (0 === t.length || 0 === this.length) return 0;
        if (e < 0) throw new RangeError("targetStart out of bounds");
        if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
        if (r < 0) throw new RangeError("sourceEnd out of bounds");
        r > this.length && (r = this.length), t.length - e < r - n && (r = t.length - e + n);
        var o, i = r - n;
        if (this === t && n < e && e < r)
          for (o = i - 1; o >= 0; --o) t[o + e] = this[o + n];
        else if (i < 1e3 || !s.TYPED_ARRAY_SUPPORT)
          for (o = 0; o < i; ++o) t[o + e] = this[o + n];
        else Uint8Array.prototype.set.call(t, this.subarray(n, n + i), e);
        return i
      }, s.prototype.fill = function(t, e, n, r) {
        if ("string" == typeof t) {
          if ("string" == typeof e ? (r = e, e = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === t.length) {
            var o = t.charCodeAt(0);
            o < 256 && (t = o)
          }
          if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
          if ("string" == typeof r && !s.isEncoding(r)) throw new TypeError("Unknown encoding: " + r)
        } else "number" == typeof t && (t &= 255);
        if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
        if (n <= e) return this;
        var i;
        if (e >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0), "number" == typeof t)
          for (i = e; i < n; ++i) this[i] = t;
        else {
          var a = s.isBuffer(t) ? t : Y(new s(t, r).toString()),
            u = a.length;
          for (i = 0; i < n - e; ++i) this[i + e] = a[i % u]
        }
        return this
      };
      var M = /[^+\/0-9A-Za-z-_]/g;

      function G(t) {
        return t < 16 ? "0" + t.toString(16) : t.toString(16)
      }

      function Y(t, e) {
        var n;
        e = e || 1 / 0;
        for (var r = t.length, o = null, i = [], a = 0; a < r; ++a) {
          if ((n = t.charCodeAt(a)) > 55295 && n < 57344) {
            if (!o) {
              if (n > 56319) {
                (e -= 3) > -1 && i.push(239, 191, 189);
                continue
              }
              if (a + 1 === r) {
                (e -= 3) > -1 && i.push(239, 191, 189);
                continue
              }
              o = n;
              continue
            }
            if (n < 56320) {
              (e -= 3) > -1 && i.push(239, 191, 189), o = n;
              continue
            }
            n = 65536 + (o - 55296 << 10 | n - 56320)
          } else o && (e -= 3) > -1 && i.push(239, 191, 189);
          if (o = null, n < 128) {
            if ((e -= 1) < 0) break;
            i.push(n)
          } else if (n < 2048) {
            if ((e -= 2) < 0) break;
            i.push(n >> 6 | 192, 63 & n | 128)
          } else if (n < 65536) {
            if ((e -= 3) < 0) break;
            i.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
          } else {
            if (!(n < 1114112)) throw new Error("Invalid code point");
            if ((e -= 4) < 0) break;
            i.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
          }
        }
        return i
      }

      function B(t) {
        return r.toByteArray(function(t) {
          if ((t = function(t) {
              return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
            }(t).replace(M, "")).length < 2) return "";
          for (; t.length % 4 != 0;) t += "=";
          return t
        }(t))
      }

      function F(t, e, n, r) {
        for (var o = 0; o < r && !(o + n >= e.length || o >= t.length); ++o) e[o + n] = t[o];
        return o
      }
    }).call(this, n(10))
  }, function(t, e, n) {
    "use strict";
    e.byteLength = function(t) {
      var e = c(t),
        n = e[0],
        r = e[1];
      return 3 * (n + r) / 4 - r
    }, e.toByteArray = function(t) {
      for (var e, n = c(t), r = n[0], a = n[1], u = new i(function(t, e, n) {
          return 3 * (e + n) / 4 - n
        }(0, r, a)), s = 0, f = a > 0 ? r - 4 : r, l = 0; l < f; l += 4) e = o[t.charCodeAt(l)] << 18 | o[t.charCodeAt(l + 1)] << 12 | o[t.charCodeAt(l + 2)] << 6 | o[t.charCodeAt(l + 3)], u[s++] = e >> 16 & 255, u[s++] = e >> 8 & 255, u[s++] = 255 & e;
      2 === a && (e = o[t.charCodeAt(l)] << 2 | o[t.charCodeAt(l + 1)] >> 4, u[s++] = 255 & e);
      1 === a && (e = o[t.charCodeAt(l)] << 10 | o[t.charCodeAt(l + 1)] << 4 | o[t.charCodeAt(l + 2)] >> 2, u[s++] = e >> 8 & 255, u[s++] = 255 & e);
      return u
    }, e.fromByteArray = function(t) {
      for (var e, n = t.length, o = n % 3, i = [], a = 0, u = n - o; a < u; a += 16383) i.push(f(t, a, a + 16383 > u ? u : a + 16383));
      1 === o ? (e = t[n - 1], i.push(r[e >> 2] + r[e << 4 & 63] + "==")) : 2 === o && (e = (t[n - 2] << 8) + t[n - 1], i.push(r[e >> 10] + r[e >> 4 & 63] + r[e << 2 & 63] + "="));
      return i.join("")
    };
    for (var r = [], o = [], i = "undefined" != typeof Uint8Array ? Uint8Array : Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", u = 0, s = a.length; u < s; ++u) r[u] = a[u], o[a.charCodeAt(u)] = u;

    function c(t) {
      var e = t.length;
      if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
      var n = t.indexOf("=");
      return -1 === n && (n = e), [n, n === e ? 0 : 4 - n % 4]
    }

    function f(t, e, n) {
      for (var o, i, a = [], u = e; u < n; u += 3) o = (t[u] << 16 & 16711680) + (t[u + 1] << 8 & 65280) + (255 & t[u + 2]), a.push(r[(i = o) >> 18 & 63] + r[i >> 12 & 63] + r[i >> 6 & 63] + r[63 & i]);
      return a.join("")
    }
    o["-".charCodeAt(0)] = 62, o["_".charCodeAt(0)] = 63
  }, function(t, e) {
    e.read = function(t, e, n, r, o) {
      var i, a, u = 8 * o - r - 1,
        s = (1 << u) - 1,
        c = s >> 1,
        f = -7,
        l = n ? o - 1 : 0,
        h = n ? -1 : 1,
        p = t[e + l];
      for (l += h, i = p & (1 << -f) - 1, p >>= -f, f += u; f > 0; i = 256 * i + t[e + l], l += h, f -= 8);
      for (a = i & (1 << -f) - 1, i >>= -f, f += r; f > 0; a = 256 * a + t[e + l], l += h, f -= 8);
      if (0 === i) i = 1 - c;
      else {
        if (i === s) return a ? NaN : 1 / 0 * (p ? -1 : 1);
        a += Math.pow(2, r), i -= c
      }
      return (p ? -1 : 1) * a * Math.pow(2, i - r)
    }, e.write = function(t, e, n, r, o, i) {
      var a, u, s, c = 8 * i - o - 1,
        f = (1 << c) - 1,
        l = f >> 1,
        h = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
        p = r ? 0 : i - 1,
        d = r ? 1 : -1,
        y = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
      for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (u = isNaN(e) ? 1 : 0, a = f) : (a = Math.floor(Math.log(e) / Math.LN2), e * (s = Math.pow(2, -a)) < 1 && (a--, s *= 2), (e += a + l >= 1 ? h / s : h * Math.pow(2, 1 - l)) * s >= 2 && (a++, s /= 2), a + l >= f ? (u = 0, a = f) : a + l >= 1 ? (u = (e * s - 1) * Math.pow(2, o), a += l) : (u = e * Math.pow(2, l - 1) * Math.pow(2, o), a = 0)); o >= 8; t[n + p] = 255 & u, p += d, u /= 256, o -= 8);
      for (a = a << o | u, c += o; c > 0; t[n + p] = 255 & a, p += d, a /= 256, c -= 8);
      t[n + p - d] |= 128 * y
    }
  }, function(t, e) {
    var n = {}.toString;
    t.exports = Array.isArray || function(t) {
      return "[object Array]" == n.call(t)
    }
  }])
});
//# sourceMappingURL=sdk-wechat.2.0.5-a.js.map