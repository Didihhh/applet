! function() {
  function t(e, r, n) {
    function o(a, s) {
      if (!r[a]) {
        if (!e[a]) {
          var u = "function" == typeof require && require;
          if (!s && u) return u(a, !0);
          if (i) return i(a, !0);
          var c = new Error("Cannot find module '" + a + "'");
          throw c.code = "MODULE_NOT_FOUND", c
        }
        var f = r[a] = {
          exports: {}
        };
        e[a][0].call(f.exports, function(t) {
          return o(e[a][1][t] || t)
        }, f, f.exports, t, e, r, n)
      }
      return r[a].exports
    }
    for (var i = "function" == typeof require && require, a = 0; a < n.length; a++) o(n[a]);
    return o
  }
  return t
}()({
  1: [function(t, e, r) {
    "use strict";

    function n(t) {
      var e = t.length;
      if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
      var r = t.indexOf("=");
      return -1 === r && (r = e), [r, r === e ? 0 : 4 - r % 4]
    }

    function o(t) {
      var e = n(t),
        r = e[0],
        o = e[1];
      return 3 * (r + o) / 4 - o
    }

    function i(t, e, r) {
      return 3 * (e + r) / 4 - r
    }

    function a(t) {
      for (var e, r = n(t), o = r[0], a = r[1], s = new h(i(t, o, a)), u = 0, c = a > 0 ? o - 4 : o, f = 0; f < c; f += 4) e = l[t.charCodeAt(f)] << 18 | l[t.charCodeAt(f + 1)] << 12 | l[t.charCodeAt(f + 2)] << 6 | l[t.charCodeAt(f + 3)], s[u++] = e >> 16 & 255, s[u++] = e >> 8 & 255, s[u++] = 255 & e;
      return 2 === a && (e = l[t.charCodeAt(f)] << 2 | l[t.charCodeAt(f + 1)] >> 4, s[u++] = 255 & e), 1 === a && (e = l[t.charCodeAt(f)] << 10 | l[t.charCodeAt(f + 1)] << 4 | l[t.charCodeAt(f + 2)] >> 2, s[u++] = e >> 8 & 255, s[u++] = 255 & e), s
    }

    function s(t) {
      return f[t >> 18 & 63] + f[t >> 12 & 63] + f[t >> 6 & 63] + f[63 & t]
    }

    function u(t, e, r) {
      for (var n, o = [], i = e; i < r; i += 3) n = (t[i] << 16 & 16711680) + (t[i + 1] << 8 & 65280) + (255 & t[i + 2]), o.push(s(n));
      return o.join("")
    }

    function c(t) {
      for (var e, r = t.length, n = r % 3, o = [], i = 0, a = r - n; i < a; i += 16383) o.push(u(t, i, i + 16383 > a ? a : i + 16383));
      return 1 === n ? (e = t[r - 1], o.push(f[e >> 2] + f[e << 4 & 63] + "==")) : 2 === n && (e = (t[r - 2] << 8) + t[r - 1], o.push(f[e >> 10] + f[e >> 4 & 63] + f[e << 2 & 63] + "=")), o.join("")
    }
    r.byteLength = o, r.toByteArray = a, r.fromByteArray = c;
    for (var f = [], l = [], h = "undefined" != typeof Uint8Array ? Uint8Array : Array, d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", p = 0, y = d.length; p < y; ++p) f[p] = d[p], l[d.charCodeAt(p)] = p;
    l["-".charCodeAt(0)] = 62, l["_".charCodeAt(0)] = 63
  }, {}],
  2: [function(t, e, r) {
    (function(e) {
      "use strict";

      function n() {
        return i.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
      }

      function o(t, e) {
        if (n() < e) throw new RangeError("Invalid typed array length");
        return i.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e), t.__proto__ = i.prototype) : (null === t && (t = new i(e)), t.length = e), t
      }

      function i(t, e, r) {
        if (!(i.TYPED_ARRAY_SUPPORT || this instanceof i)) return new i(t, e, r);
        if ("number" == typeof t) {
          if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
          return c(this, t)
        }
        return a(this, t, e, r)
      }

      function a(t, e, r, n) {
        if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
        return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? h(t, e, r, n) : "string" == typeof e ? f(t, e, r) : d(t, e)
      }

      function s(t) {
        if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
        if (t < 0) throw new RangeError('"size" argument must not be negative')
      }

      function u(t, e, r, n) {
        return s(e), e <= 0 ? o(t, e) : void 0 !== r ? "string" == typeof n ? o(t, e).fill(r, n) : o(t, e).fill(r) : o(t, e)
      }

      function c(t, e) {
        if (s(e), t = o(t, e < 0 ? 0 : 0 | p(e)), !i.TYPED_ARRAY_SUPPORT)
          for (var r = 0; r < e; ++r) t[r] = 0;
        return t
      }

      function f(t, e, r) {
        if ("string" == typeof r && "" !== r || (r = "utf8"), !i.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding');
        var n = 0 | _(e, r);
        t = o(t, n);
        var a = t.write(e, r);
        return a !== n && (t = t.slice(0, a)), t
      }

      function l(t, e) {
        var r = e.length < 0 ? 0 : 0 | p(e.length);
        t = o(t, r);
        for (var n = 0; n < r; n += 1) t[n] = 255 & e[n];
        return t
      }

      function h(t, e, r, n) {
        if (e.byteLength, r < 0 || e.byteLength < r) throw new RangeError("'offset' is out of bounds");
        if (e.byteLength < r + (n || 0)) throw new RangeError("'length' is out of bounds");
        return e = void 0 === r && void 0 === n ? new Uint8Array(e) : void 0 === n ? new Uint8Array(e, r) : new Uint8Array(e, r, n), i.TYPED_ARRAY_SUPPORT ? (t = e, t.__proto__ = i.prototype) : t = l(t, e), t
      }

      function d(t, e) {
        if (i.isBuffer(e)) {
          var r = 0 | p(e.length);
          return t = o(t, r), 0 === t.length ? t : (e.copy(t, 0, 0, r), t)
        }
        if (e) {
          if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || X(e.length) ? o(t, 0) : l(t, e);
          if ("Buffer" === e.type && J(e.data)) return l(t, e.data)
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
      }

      function p(t) {
        if (t >= n()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + n().toString(16) + " bytes");
        return 0 | t
      }

      function y(t) {
        return +t != t && (t = 0), i.alloc(+t)
      }

      function _(t, e) {
        if (i.isBuffer(t)) return t.length;
        if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
        "string" != typeof t && (t = "" + t);
        var r = t.length;
        if (0 === r) return 0;
        for (var n = !1;;) switch (e) {
          case "ascii":
          case "latin1":
          case "binary":
            return r;
          case "utf8":
          case "utf-8":
          case void 0:
            return F(t).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return 2 * r;
          case "hex":
            return r >>> 1;
          case "base64":
            return V(t).length;
          default:
            if (n) return F(t).length;
            e = ("" + e).toLowerCase(), n = !0
        }
      }

      function g(t, e, r) {
        var n = !1;
        if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
        if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
        if (r >>>= 0, e >>>= 0, r <= e) return "";
        for (t || (t = "utf8");;) switch (t) {
          case "hex":
            return k(this, e, r);
          case "utf8":
          case "utf-8":
            return R(this, e, r);
          case "ascii":
            return I(this, e, r);
          case "latin1":
          case "binary":
            return C(this, e, r);
          case "base64":
            return S(this, e, r);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return L(this, e, r);
          default:
            if (n) throw new TypeError("Unknown encoding: " + t);
            t = (t + "").toLowerCase(), n = !0
        }
      }

      function b(t, e, r) {
        var n = t[e];
        t[e] = t[r], t[r] = n
      }

      function v(t, e, r, n, o) {
        if (0 === t.length) return -1;
        if ("string" == typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, isNaN(r) && (r = o ? 0 : t.length - 1), r < 0 && (r = t.length + r), r >= t.length) {
          if (o) return -1;
          r = t.length - 1
        } else if (r < 0) {
          if (!o) return -1;
          r = 0
        }
        if ("string" == typeof e && (e = i.from(e, n)), i.isBuffer(e)) return 0 === e.length ? -1 : w(t, e, r, n, o);
        if ("number" == typeof e) return e &= 255, i.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : w(t, [e], r, n, o);
        throw new TypeError("val must be string, number or Buffer")
      }

      function w(t, e, r, n, o) {
        function i(t, e) {
          return 1 === a ? t[e] : t.readUInt16BE(e * a)
        }
        var a = 1,
          s = t.length,
          u = e.length;
        if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
          if (t.length < 2 || e.length < 2) return -1;
          a = 2, s /= 2, u /= 2, r /= 2
        }
        var c;
        if (o) {
          var f = -1;
          for (c = r; c < s; c++)
            if (i(t, c) === i(e, -1 === f ? 0 : c - f)) {
              if (-1 === f && (f = c), c - f + 1 === u) return f * a
            } else -1 !== f && (c -= c - f), f = -1
        } else
          for (r + u > s && (r = s - u), c = r; c >= 0; c--) {
            for (var l = !0, h = 0; h < u; h++)
              if (i(t, c + h) !== i(e, h)) {
                l = !1;
                break
              }
            if (l) return c
          }
        return -1
      }

      function E(t, e, r, n) {
        r = Number(r) || 0;
        var o = t.length - r;
        n ? (n = Number(n)) > o && (n = o) : n = o;
        var i = e.length;
        if (i % 2 != 0) throw new TypeError("Invalid hex string");
        n > i / 2 && (n = i / 2);
        for (var a = 0; a < n; ++a) {
          var s = parseInt(e.substr(2 * a, 2), 16);
          if (isNaN(s)) return a;
          t[r + a] = s
        }
        return a
      }

      function m(t, e, r, n) {
        return z(F(e, t.length - r), t, r, n)
      }

      function O(t, e, r, n) {
        return z(Q(e), t, r, n)
      }

      function T(t, e, r, n) {
        return O(t, e, r, n)
      }

      function A(t, e, r, n) {
        return z(V(e), t, r, n)
      }

      function P(t, e, r, n) {
        return z(K(e, t.length - r), t, r, n)
      }

      function S(t, e, r) {
        return 0 === e && r === t.length ? $.fromByteArray(t) : $.fromByteArray(t.slice(e, r))
      }

      function R(t, e, r) {
        r = Math.min(t.length, r);
        for (var n = [], o = e; o < r;) {
          var i = t[o],
            a = null,
            s = i > 239 ? 4 : i > 223 ? 3 : i > 191 ? 2 : 1;
          if (o + s <= r) {
            var u, c, f, l;
            switch (s) {
              case 1:
                i < 128 && (a = i);
                break;
              case 2:
                u = t[o + 1], 128 == (192 & u) && (l = (31 & i) << 6 | 63 & u) > 127 && (a = l);
                break;
              case 3:
                u = t[o + 1], c = t[o + 2], 128 == (192 & u) && 128 == (192 & c) && (l = (15 & i) << 12 | (63 & u) << 6 | 63 & c) > 2047 && (l < 55296 || l > 57343) && (a = l);
                break;
              case 4:
                u = t[o + 1], c = t[o + 2], f = t[o + 3], 128 == (192 & u) && 128 == (192 & c) && 128 == (192 & f) && (l = (15 & i) << 18 | (63 & u) << 12 | (63 & c) << 6 | 63 & f) > 65535 && l < 1114112 && (a = l)
            }
          }
          null === a ? (a = 65533, s = 1) : a > 65535 && (a -= 65536, n.push(a >>> 10 & 1023 | 55296), a = 56320 | 1023 & a), n.push(a), o += s
        }
        return D(n)
      }

      function D(t) {
        var e = t.length;
        if (e <= Z) return String.fromCharCode.apply(String, t);
        for (var r = "", n = 0; n < e;) r += String.fromCharCode.apply(String, t.slice(n, n += Z));
        return r
      }

      function I(t, e, r) {
        var n = "";
        r = Math.min(t.length, r);
        for (var o = e; o < r; ++o) n += String.fromCharCode(127 & t[o]);
        return n
      }

      function C(t, e, r) {
        var n = "";
        r = Math.min(t.length, r);
        for (var o = e; o < r; ++o) n += String.fromCharCode(t[o]);
        return n
      }

      function k(t, e, r) {
        var n = t.length;
        (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
        for (var o = "", i = e; i < r; ++i) o += H(t[i]);
        return o
      }

      function L(t, e, r) {
        for (var n = t.slice(e, r), o = "", i = 0; i < n.length; i += 2) o += String.fromCharCode(n[i] + 256 * n[i + 1]);
        return o
      }

      function U(t, e, r) {
        if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
        if (t + e > r) throw new RangeError("Trying to access beyond buffer length")
      }

      function x(t, e, r, n, o, a) {
        if (!i.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (e > o || e < a) throw new RangeError('"value" argument is out of bounds');
        if (r + n > t.length) throw new RangeError("Index out of range")
      }

      function j(t, e, r, n) {
        e < 0 && (e = 65535 + e + 1);
        for (var o = 0, i = Math.min(t.length - r, 2); o < i; ++o) t[r + o] = (e & 255 << 8 * (n ? o : 1 - o)) >>> 8 * (n ? o : 1 - o)
      }

      function N(t, e, r, n) {
        e < 0 && (e = 4294967295 + e + 1);
        for (var o = 0, i = Math.min(t.length - r, 4); o < i; ++o) t[r + o] = e >>> 8 * (n ? o : 3 - o) & 255
      }

      function B(t, e, r, n, o, i) {
        if (r + n > t.length) throw new RangeError("Index out of range");
        if (r < 0) throw new RangeError("Index out of range")
      }

      function G(t, e, r, n, o) {
        return o || B(t, e, r, 4, 3.4028234663852886e38, -3.4028234663852886e38), W.write(t, e, r, n, 23, 4), r + 4
      }

      function Y(t, e, r, n, o) {
        return o || B(t, e, r, 8, 1.7976931348623157e308, -1.7976931348623157e308), W.write(t, e, r, n, 52, 8), r + 8
      }

      function q(t) {
        if (t = M(t).replace(tt, ""), t.length < 2) return "";
        for (; t.length % 4 != 0;) t += "=";
        return t
      }

      function M(t) {
        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
      }

      function H(t) {
        return t < 16 ? "0" + t.toString(16) : t.toString(16)
      }

      function F(t, e) {
        e = e || 1 / 0;
        for (var r, n = t.length, o = null, i = [], a = 0; a < n; ++a) {
          if ((r = t.charCodeAt(a)) > 55295 && r < 57344) {
            if (!o) {
              if (r > 56319) {
                (e -= 3) > -1 && i.push(239, 191, 189);
                continue
              }
              if (a + 1 === n) {
                (e -= 3) > -1 && i.push(239, 191, 189);
                continue
              }
              o = r;
              continue
            }
            if (r < 56320) {
              (e -= 3) > -1 && i.push(239, 191, 189), o = r;
              continue
            }
            r = 65536 + (o - 55296 << 10 | r - 56320)
          } else o && (e -= 3) > -1 && i.push(239, 191, 189);
          if (o = null, r < 128) {
            if ((e -= 1) < 0) break;
            i.push(r)
          } else if (r < 2048) {
            if ((e -= 2) < 0) break;
            i.push(r >> 6 | 192, 63 & r | 128)
          } else if (r < 65536) {
            if ((e -= 3) < 0) break;
            i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
          } else {
            if (!(r < 1114112)) throw new Error("Invalid code point");
            if ((e -= 4) < 0) break;
            i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
          }
        }
        return i
      }

      function Q(t) {
        for (var e = [], r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r));
        return e
      }

      function K(t, e) {
        for (var r, n, o, i = [], a = 0; a < t.length && !((e -= 2) < 0); ++a) r = t.charCodeAt(a), n = r >> 8, o = r % 256, i.push(o), i.push(n);
        return i
      }

      function V(t) {
        return $.toByteArray(q(t))
      }

      function z(t, e, r, n) {
        for (var o = 0; o < n && !(o + r >= e.length || o >= t.length); ++o) e[o + r] = t[o];
        return o
      }

      function X(t) {
        return t !== t
      }
      var $ = t("base64-js"),
        W = t("ieee754"),
        J = t("isarray");
      r.Buffer = i, r.SlowBuffer = y, r.INSPECT_MAX_BYTES = 50, i.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : function() {
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
      }(), r.kMaxLength = n(), i.poolSize = 8192, i._augment = function(t) {
        return t.__proto__ = i.prototype, t
      }, i.from = function(t, e, r) {
        return a(null, t, e, r)
      }, i.TYPED_ARRAY_SUPPORT && (i.prototype.__proto__ = Uint8Array.prototype, i.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && i[Symbol.species] === i && Object.defineProperty(i, Symbol.species, {
        value: null,
        configurable: !0
      })), i.alloc = function(t, e, r) {
        return u(null, t, e, r)
      }, i.allocUnsafe = function(t) {
        return c(null, t)
      }, i.allocUnsafeSlow = function(t) {
        return c(null, t)
      }, i.isBuffer = function(t) {
        return !(null == t || !t._isBuffer)
      }, i.compare = function(t, e) {
        if (!i.isBuffer(t) || !i.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
        if (t === e) return 0;
        for (var r = t.length, n = e.length, o = 0, a = Math.min(r, n); o < a; ++o)
          if (t[o] !== e[o]) {
            r = t[o], n = e[o];
            break
          }
        return r < n ? -1 : n < r ? 1 : 0
      }, i.isEncoding = function(t) {
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
      }, i.concat = function(t, e) {
        if (!J(t)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === t.length) return i.alloc(0);
        var r;
        if (void 0 === e)
          for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
        var n = i.allocUnsafe(e),
          o = 0;
        for (r = 0; r < t.length; ++r) {
          var a = t[r];
          if (!i.isBuffer(a)) throw new TypeError('"list" argument must be an Array of Buffers');
          a.copy(n, o), o += a.length
        }
        return n
      }, i.byteLength = _, i.prototype._isBuffer = !0, i.prototype.swap16 = function() {
        var t = this.length;
        if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var e = 0; e < t; e += 2) b(this, e, e + 1);
        return this
      }, i.prototype.swap32 = function() {
        var t = this.length;
        if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var e = 0; e < t; e += 4) b(this, e, e + 3), b(this, e + 1, e + 2);
        return this
      }, i.prototype.swap64 = function() {
        var t = this.length;
        if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var e = 0; e < t; e += 8) b(this, e, e + 7), b(this, e + 1, e + 6), b(this, e + 2, e + 5), b(this, e + 3, e + 4);
        return this
      }, i.prototype.toString = function() {
        var t = 0 | this.length;
        return 0 === t ? "" : 0 === arguments.length ? R(this, 0, t) : g.apply(this, arguments)
      }, i.prototype.equals = function(t) {
        if (!i.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
        return this === t || 0 === i.compare(this, t)
      }, i.prototype.inspect = function() {
        var t = "",
          e = r.INSPECT_MAX_BYTES;
        return this.length > 0 && (t = this.toString("hex", 0, e).match(/.{2}/g).join(" "), this.length > e && (t += " ... ")), "<Buffer " + t + ">"
      }, i.prototype.compare = function(t, e, r, n, o) {
        if (!i.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
        if (void 0 === e && (e = 0), void 0 === r && (r = t ? t.length : 0), void 0 === n && (n = 0), void 0 === o && (o = this.length), e < 0 || r > t.length || n < 0 || o > this.length) throw new RangeError("out of range index");
        if (n >= o && e >= r) return 0;
        if (n >= o) return -1;
        if (e >= r) return 1;
        if (e >>>= 0, r >>>= 0, n >>>= 0, o >>>= 0, this === t) return 0;
        for (var a = o - n, s = r - e, u = Math.min(a, s), c = this.slice(n, o), f = t.slice(e, r), l = 0; l < u; ++l)
          if (c[l] !== f[l]) {
            a = c[l], s = f[l];
            break
          }
        return a < s ? -1 : s < a ? 1 : 0
      }, i.prototype.includes = function(t, e, r) {
        return -1 !== this.indexOf(t, e, r)
      }, i.prototype.indexOf = function(t, e, r) {
        return v(this, t, e, r, !0)
      }, i.prototype.lastIndexOf = function(t, e, r) {
        return v(this, t, e, r, !1)
      }, i.prototype.write = function(t, e, r, n) {
        if (void 0 === e) n = "utf8", r = this.length, e = 0;
        else if (void 0 === r && "string" == typeof e) n = e, r = this.length, e = 0;
        else {
          if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
          e |= 0, isFinite(r) ? (r |= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0)
        }
        var o = this.length - e;
        if ((void 0 === r || r > o) && (r = o), t.length > 0 && (r < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
        n || (n = "utf8");
        for (var i = !1;;) switch (n) {
          case "hex":
            return E(this, t, e, r);
          case "utf8":
          case "utf-8":
            return m(this, t, e, r);
          case "ascii":
            return O(this, t, e, r);
          case "latin1":
          case "binary":
            return T(this, t, e, r);
          case "base64":
            return A(this, t, e, r);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return P(this, t, e, r);
          default:
            if (i) throw new TypeError("Unknown encoding: " + n);
            n = ("" + n).toLowerCase(), i = !0
        }
      }, i.prototype.toJSON = function() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        }
      };
      var Z = 4096;
      i.prototype.slice = function(t, e) {
        var r = this.length;
        t = ~~t, e = void 0 === e ? r : ~~e, t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t);
        var n;
        if (i.TYPED_ARRAY_SUPPORT) n = this.subarray(t, e), n.__proto__ = i.prototype;
        else {
          var o = e - t;
          n = new i(o, void 0);
          for (var a = 0; a < o; ++a) n[a] = this[a + t]
        }
        return n
      }, i.prototype.readUIntLE = function(t, e, r) {
        t |= 0, e |= 0, r || U(t, e, this.length);
        for (var n = this[t], o = 1, i = 0; ++i < e && (o *= 256);) n += this[t + i] * o;
        return n
      }, i.prototype.readUIntBE = function(t, e, r) {
        t |= 0, e |= 0, r || U(t, e, this.length);
        for (var n = this[t + --e], o = 1; e > 0 && (o *= 256);) n += this[t + --e] * o;
        return n
      }, i.prototype.readUInt8 = function(t, e) {
        return e || U(t, 1, this.length), this[t]
      }, i.prototype.readUInt16LE = function(t, e) {
        return e || U(t, 2, this.length), this[t] | this[t + 1] << 8
      }, i.prototype.readUInt16BE = function(t, e) {
        return e || U(t, 2, this.length), this[t] << 8 | this[t + 1]
      }, i.prototype.readUInt32LE = function(t, e) {
        return e || U(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
      }, i.prototype.readUInt32BE = function(t, e) {
        return e || U(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
      }, i.prototype.readIntLE = function(t, e, r) {
        t |= 0, e |= 0, r || U(t, e, this.length);
        for (var n = this[t], o = 1, i = 0; ++i < e && (o *= 256);) n += this[t + i] * o;
        return o *= 128, n >= o && (n -= Math.pow(2, 8 * e)), n
      }, i.prototype.readIntBE = function(t, e, r) {
        t |= 0, e |= 0, r || U(t, e, this.length);
        for (var n = e, o = 1, i = this[t + --n]; n > 0 && (o *= 256);) i += this[t + --n] * o;
        return o *= 128, i >= o && (i -= Math.pow(2, 8 * e)), i
      }, i.prototype.readInt8 = function(t, e) {
        return e || U(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
      }, i.prototype.readInt16LE = function(t, e) {
        e || U(t, 2, this.length);
        var r = this[t] | this[t + 1] << 8;
        return 32768 & r ? 4294901760 | r : r
      }, i.prototype.readInt16BE = function(t, e) {
        e || U(t, 2, this.length);
        var r = this[t + 1] | this[t] << 8;
        return 32768 & r ? 4294901760 | r : r
      }, i.prototype.readInt32LE = function(t, e) {
        return e || U(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
      }, i.prototype.readInt32BE = function(t, e) {
        return e || U(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
      }, i.prototype.readFloatLE = function(t, e) {
        return e || U(t, 4, this.length), W.read(this, t, !0, 23, 4)
      }, i.prototype.readFloatBE = function(t, e) {
        return e || U(t, 4, this.length), W.read(this, t, !1, 23, 4)
      }, i.prototype.readDoubleLE = function(t, e) {
        return e || U(t, 8, this.length), W.read(this, t, !0, 52, 8)
      }, i.prototype.readDoubleBE = function(t, e) {
        return e || U(t, 8, this.length), W.read(this, t, !1, 52, 8)
      }, i.prototype.writeUIntLE = function(t, e, r, n) {
        if (t = +t, e |= 0, r |= 0, !n) {
          x(this, t, e, r, Math.pow(2, 8 * r) - 1, 0)
        }
        var o = 1,
          i = 0;
        for (this[e] = 255 & t; ++i < r && (o *= 256);) this[e + i] = t / o & 255;
        return e + r
      }, i.prototype.writeUIntBE = function(t, e, r, n) {
        if (t = +t, e |= 0, r |= 0, !n) {
          x(this, t, e, r, Math.pow(2, 8 * r) - 1, 0)
        }
        var o = r - 1,
          i = 1;
        for (this[e + o] = 255 & t; --o >= 0 && (i *= 256);) this[e + o] = t / i & 255;
        return e + r
      }, i.prototype.writeUInt8 = function(t, e, r) {
        return t = +t, e |= 0, r || x(this, t, e, 1, 255, 0), i.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1
      }, i.prototype.writeUInt16LE = function(t, e, r) {
        return t = +t, e |= 0, r || x(this, t, e, 2, 65535, 0), i.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : j(this, t, e, !0), e + 2
      }, i.prototype.writeUInt16BE = function(t, e, r) {
        return t = +t, e |= 0, r || x(this, t, e, 2, 65535, 0), i.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : j(this, t, e, !1), e + 2
      }, i.prototype.writeUInt32LE = function(t, e, r) {
        return t = +t, e |= 0, r || x(this, t, e, 4, 4294967295, 0), i.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : N(this, t, e, !0), e + 4
      }, i.prototype.writeUInt32BE = function(t, e, r) {
        return t = +t, e |= 0, r || x(this, t, e, 4, 4294967295, 0), i.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : N(this, t, e, !1), e + 4
      }, i.prototype.writeIntLE = function(t, e, r, n) {
        if (t = +t, e |= 0, !n) {
          var o = Math.pow(2, 8 * r - 1);
          x(this, t, e, r, o - 1, -o)
        }
        var i = 0,
          a = 1,
          s = 0;
        for (this[e] = 255 & t; ++i < r && (a *= 256);) t < 0 && 0 === s && 0 !== this[e + i - 1] && (s = 1), this[e + i] = (t / a >> 0) - s & 255;
        return e + r
      }, i.prototype.writeIntBE = function(t, e, r, n) {
        if (t = +t, e |= 0, !n) {
          var o = Math.pow(2, 8 * r - 1);
          x(this, t, e, r, o - 1, -o)
        }
        var i = r - 1,
          a = 1,
          s = 0;
        for (this[e + i] = 255 & t; --i >= 0 && (a *= 256);) t < 0 && 0 === s && 0 !== this[e + i + 1] && (s = 1), this[e + i] = (t / a >> 0) - s & 255;
        return e + r
      }, i.prototype.writeInt8 = function(t, e, r) {
        return t = +t, e |= 0, r || x(this, t, e, 1, 127, -128), i.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
      }, i.prototype.writeInt16LE = function(t, e, r) {
        return t = +t, e |= 0, r || x(this, t, e, 2, 32767, -32768), i.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : j(this, t, e, !0), e + 2
      }, i.prototype.writeInt16BE = function(t, e, r) {
        return t = +t, e |= 0, r || x(this, t, e, 2, 32767, -32768), i.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : j(this, t, e, !1), e + 2
      }, i.prototype.writeInt32LE = function(t, e, r) {
        return t = +t, e |= 0, r || x(this, t, e, 4, 2147483647, -2147483648), i.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : N(this, t, e, !0), e + 4
      }, i.prototype.writeInt32BE = function(t, e, r) {
        return t = +t, e |= 0, r || x(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), i.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : N(this, t, e, !1), e + 4
      }, i.prototype.writeFloatLE = function(t, e, r) {
        return G(this, t, e, !0, r)
      }, i.prototype.writeFloatBE = function(t, e, r) {
        return G(this, t, e, !1, r)
      }, i.prototype.writeDoubleLE = function(t, e, r) {
        return Y(this, t, e, !0, r)
      }, i.prototype.writeDoubleBE = function(t, e, r) {
        return Y(this, t, e, !1, r)
      }, i.prototype.copy = function(t, e, r, n) {
        if (r || (r = 0), n || 0 === n || (n = this.length), e >= t.length && (e = t.length), e || (e = 0), n > 0 && n < r && (n = r), n === r) return 0;
        if (0 === t.length || 0 === this.length) return 0;
        if (e < 0) throw new RangeError("targetStart out of bounds");
        if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");
        if (n < 0) throw new RangeError("sourceEnd out of bounds");
        n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r);
        var o, a = n - r;
        if (this === t && r < e && e < n)
          for (o = a - 1; o >= 0; --o) t[o + e] = this[o + r];
        else if (a < 1e3 || !i.TYPED_ARRAY_SUPPORT)
          for (o = 0; o < a; ++o) t[o + e] = this[o + r];
        else Uint8Array.prototype.set.call(t, this.subarray(r, r + a), e);
        return a
      }, i.prototype.fill = function(t, e, r, n) {
        if ("string" == typeof t) {
          if ("string" == typeof e ? (n = e, e = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), 1 === t.length) {
            var o = t.charCodeAt(0);
            o < 256 && (t = o)
          }
          if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
          if ("string" == typeof n && !i.isEncoding(n)) throw new TypeError("Unknown encoding: " + n)
        } else "number" == typeof t && (t &= 255);
        if (e < 0 || this.length < e || this.length < r) throw new RangeError("Out of range index");
        if (r <= e) return this;
        e >>>= 0, r = void 0 === r ? this.length : r >>> 0, t || (t = 0);
        var a;
        if ("number" == typeof t)
          for (a = e; a < r; ++a) this[a] = t;
        else {
          var s = i.isBuffer(t) ? t : F(new i(t, n).toString()),
            u = s.length;
          for (a = 0; a < r - e; ++a) this[a + e] = s[a % u]
        }
        return this
      };
      var tt = /[^+\/0-9A-Za-z-_]/g
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
  }, {
    "base64-js": 1,
    ieee754: 4,
    isarray: 3
  }],
  3: [function(t, e, r) {
    var n = {}.toString;
    e.exports = Array.isArray || function(t) {
      return "[object Array]" == n.call(t)
    }
  }, {}],
  4: [function(t, e, r) {
    r.read = function(t, e, r, n, o) {
      var i, a, s = 8 * o - n - 1,
        u = (1 << s) - 1,
        c = u >> 1,
        f = -7,
        l = r ? o - 1 : 0,
        h = r ? -1 : 1,
        d = t[e + l];
      for (l += h, i = d & (1 << -f) - 1, d >>= -f, f += s; f > 0; i = 256 * i + t[e + l], l += h, f -= 8);
      for (a = i & (1 << -f) - 1, i >>= -f, f += n; f > 0; a = 256 * a + t[e + l], l += h, f -= 8);
      if (0 === i) i = 1 - c;
      else {
        if (i === u) return a ? NaN : 1 / 0 * (d ? -1 : 1);
        a += Math.pow(2, n), i -= c
      }
      return (d ? -1 : 1) * a * Math.pow(2, i - n)
    }, r.write = function(t, e, r, n, o, i) {
      var a, s, u, c = 8 * i - o - 1,
        f = (1 << c) - 1,
        l = f >> 1,
        h = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
        d = n ? 0 : i - 1,
        p = n ? 1 : -1,
        y = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
      for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, a = f) : (a = Math.floor(Math.log(e) / Math.LN2), e * (u = Math.pow(2, -a)) < 1 && (a--, u *= 2), e += a + l >= 1 ? h / u : h * Math.pow(2, 1 - l), e * u >= 2 && (a++, u /= 2), a + l >= f ? (s = 0, a = f) : a + l >= 1 ? (s = (e * u - 1) * Math.pow(2, o), a += l) : (s = e * Math.pow(2, l - 1) * Math.pow(2, o), a = 0)); o >= 8; t[r + d] = 255 & s, d += p, s /= 256, o -= 8);
      for (a = a << o | s, c += o; c > 0; t[r + d] = 255 & a, d += p, a /= 256, c -= 8);
      t[r + d - p] |= 128 * y
    }
  }, {}],
  5: [function(t, e, r) {
    "use strict";
    e.exports = t("../../core/index")
  }, {
    "../../core/index": 28
  }],
  6: [function(t, e, r) {
    "use strict";

    function n(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    var o = function() {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
          }
        }
        return function(e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e
        }
      }(),
      i = t("./HError"),
      a = t("./Query"),
      s = t("./utils"),
      u = function() {
        function t() {
          n(this, t), this._initQueryParams()
        }
        return o(t, [{
          key: "_initQueryParams",
          value: function() {
            this._queryObject = {}, this._limit = 20, this._offset = 0, this._orderBy = null, this._keys = null, this._expand = null
          }
        }, {
          key: "setQuery",
          value: function(t) {
            if (!(t instanceof a)) throw new i(605);
            return this._queryObject = s.cloneDeep(t.queryObject), this
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
            if (!Number.isInteger(t)) throw new i(605);
            return this._limit = t, this
          }
        }, {
          key: "offset",
          value: function(t) {
            if (!Number.isInteger(t)) throw new i(605);
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
        }]), t
      }();
    e.exports = u
  }, {
    "./HError": 13,
    "./Query": 14,
    "./utils": 37
  }],
  7: [function(t, e, r) {
    "use strict";

    function n(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ["BaseRecord"],
        r = t("./GeoPoint"),
        n = t("./GeoPolygon");
      return function(t) {
        return e.includes("Geo") && (t instanceof r || t instanceof n) ? t.toGeoJSON() : e.includes("BaseRecord") && t instanceof u ? null == t._recordID ? "" : t._recordID.toString() : t
      }
    }
    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      },
      a = function() {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
          }
        }
        return function(e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e
        }
      }(),
      s = t("./HError"),
      u = function() {
        function t(e) {
          n(this, t), this._recordID = e, this._recordValueInit()
        }
        return a(t, [{
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
            for (var t = this, e = o(["BaseRecord", "Geo"]), r = o(["Geo"]), n = arguments.length, a = Array(n), u = 0; u < n; u++) a[u] = arguments[u];
            if (1 === a.length) {
              if ("object" !== i(a[0])) throw new s(605);
              var c = a[0],
                f = {};
              Object.keys(a[0]).forEach(function(n) {
                if (t._record.$unset.hasOwnProperty(n)) throw new s(605);
                var o = c[n];
                Array.isArray(o) ? f[n] = o.map(function(t) {
                  return r(t)
                }) : f[n] = e(o)
              }), this._record.$set = f
            } else {
              if (2 !== a.length) throw new s(605);
              if (this._record.$unset.hasOwnProperty(a[0])) throw new s(605);
              var l = a[1];
              Array.isArray(l) ? this._record.$set[a[0]] = l.map(function(t) {
                return r(t)
              }) : this._record.$set[a[0]] = e(l)
            }
            return this
          }
        }, {
          key: "unset",
          value: function() {
            for (var t = this, e = arguments.length, r = Array(e), n = 0; n < e; n++) r[n] = arguments[n];
            if ("object" === i(r[0])) {
              var o = {};
              Object.keys(r[0]).forEach(function(e) {
                if (t._record.$set.hasOwnProperty(e)) throw new s(605);
                o[e] = ""
              }), this._record.$unset = o
            } else {
              if ("string" != typeof r[0]) throw new s(605);
              if (this._record.$set.hasOwnProperty(r[0])) throw new s(605);
              this._record.$unset[r[0]] = ""
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
            var r = o(["Geo"]);
            return e instanceof Array || (e = [e]), e = e.map(function(t) {
              return r(t)
            }), this._record.$set[t] = {
              $append: e
            }, this
          }
        }, {
          key: "uAppend",
          value: function(t, e) {
            var r = o(["Geo"]);
            return e instanceof Array || (e = [e]), e = e.map(function(t) {
              return r(t)
            }), this._record.$set[t] = {
              $append_unique: e
            }, this
          }
        }, {
          key: "remove",
          value: function(t, e) {
            var r = o(["Geo"]);
            return e instanceof Array || (e = [e]), e = e.map(function(t) {
              return r(t)
            }), this._record.$set[t] = {
              $remove: e
            }, this
          }
        }, {
          key: "patchObject",
          value: function(t, e) {
            if ("[object Object]" !== Object.prototype.toString.call(e)) throw new s(605);
            return this._record.$set[t] = {
              $update: e
            }, this
          }
        }]), t
      }();
    u._serializeValueFuncFactory = o, e.exports = u
  }, {
    "./GeoPoint": 11,
    "./GeoPolygon": 12,
    "./HError": 13
  }],
  8: [function(t, e, r) {
    "use strict";

    function n(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
      if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function i(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    var a = function() {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
          }
        }
        return function(e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e
        }
      }(),
      s = t("./baas"),
      u = t("./BaseQuery"),
      c = t("./Query"),
      f = function(t) {
        function e(t) {
          n(this, e);
          var r = o(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
          return r._contentGroupID = t, r
        }
        return i(e, t), a(e, [{
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
            var e = new c;
            return e.compare("group_id", "=", this._contentGroupID), s.getContentCategory({
              categoryID: t,
              where: JSON.stringify(e.queryObject)
            })
          }
        }]), e
      }(u);
    e.exports = f
  }, {
    "./BaseQuery": 6,
    "./Query": 14,
    "./baas": 20
  }],
  9: [function(t, e, r) {
    "use strict";

    function n(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
      if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function i(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    var a = function() {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
          }
        }
        return function(e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e
        }
      }(),
      s = t("./baas"),
      u = t("./BaseQuery"),
      c = t("./baasRequest").baasRequest,
      f = t("./uploadFile"),
      l = s._config.API,
      h = function(t) {
        function e() {
          return n(this, e), o(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this))
        }
        return i(e, t), a(e, [{
          key: "upload",
          value: function(t, e) {
            return f(t, e, "json")
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
            return c({
              url: l.VIDEO_SNAPSHOT,
              method: "POST",
              data: t
            }).then(function(t) {
              return t.data
            })
          }
        }, {
          key: "videoConcat",
          value: function(t) {
            return c({
              url: l.M3U8_CONCAT,
              method: "POST",
              data: t
            }).then(function(t) {
              return t.data
            })
          }
        }, {
          key: "videoClip",
          value: function(t) {
            return c({
              url: l.M3U8_CLIP,
              method: "POST",
              data: t
            }).then(function(t) {
              return t.data
            })
          }
        }, {
          key: "videoMeta",
          value: function(t) {
            return c({
              url: l.M3U8_META,
              method: "POST",
              data: t
            }).then(function(t) {
              return t.data
            })
          }
        }, {
          key: "videoAudioMeta",
          value: function(t) {
            return c({
              url: l.VIDEO_AUDIO_META,
              method: "POST",
              data: t
            }).then(function(t) {
              return t.data
            })
          }
        }]), e
      }(u);
    e.exports = h
  }, {
    "./BaseQuery": 6,
    "./baas": 20,
    "./baasRequest": 21,
    "./uploadFile": 36
  }],
  10: [function(t, e, r) {
    "use strict";

    function n(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
      if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function i(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    var a = function() {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
          }
        }
        return function(e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e
        }
      }(),
      s = t("./baas"),
      u = t("./BaseQuery"),
      c = t("./Query"),
      f = function(t) {
        function e() {
          return n(this, e), o(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this))
        }
        return i(e, t), a(e, [{
          key: "get",
          value: function(t) {
            return s.getFileCategoryDetail({
              categoryID: t
            })
          }
        }, {
          key: "getFileList",
          value: function(t) {
            var e = new c;
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
        }]), e
      }(u);
    e.exports = f
  }, {
    "./BaseQuery": 6,
    "./Query": 14,
    "./baas": 20
  }],
  11: [function(t, e, r) {
    "use strict";

    function n(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    var o = function() {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
          }
        }
        return function(e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e
        }
      }(),
      i = t("./utils"),
      a = function() {
        function t(e, r) {
          n(this, t), this.longitude = e, this.latitude = r, this.geoJSON = {
            type: "Point",
            coordinates: [this.longitude, this.latitude]
          }
        }
        return o(t, [{
          key: "toGeoJSON",
          value: function() {
            return i.cloneDeep(this.geoJSON)
          }
        }]), t
      }();
    e.exports = a
  }, {
    "./utils": 37
  }],
  12: [function(t, e, r) {
    "use strict";

    function n(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    var o = function() {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
          }
        }
        return function(e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e
        }
      }(),
      i = t("./GeoPoint"),
      a = t("./HError"),
      s = t("./utils"),
      u = function() {
        function t(e) {
          if (n(this, t), !(e && e instanceof Array)) throw new a(605);
          if (e.length < 4) throw new a(605);
          this.points = e, this.geoJSON = {
            type: "Polygon",
            coordinates: []
          }
        }
        return o(t, [{
          key: "toGeoJSON",
          value: function() {
            var t = [];
            return this.points.forEach(function(e) {
              if (e instanceof i) t.push([e.longitude, e.latitude]);
              else {
                if (!(e instanceof Array && 2 === e.length)) throw new a(605);
                t.push(e)
              }
            }), this.geoJSON.coordinates = [t], s.cloneDeep(this.geoJSON)
          }
        }]), t
      }();
    e.exports = u
  }, {
    "./GeoPoint": 11,
    "./HError": 13,
    "./utils": 37
  }],
  13: [function(t, e, r) {
    "use strict";

    function n(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    var o = function() {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
          }
        }
        return function(e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e
        }
      }(),
      i = function() {
        function t(e, r) {
          n(this, t);
          var o = new Error;
          return o.code = e, o.message = r ? e + ": " + r : e + ": " + this.mapErrorMessage(e), o
        }
        return o(t, [{
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
              default:
                return "unknown error"
            }
          }
        }]), t
      }();
    e.exports = i
  }, {}],
  14: [function(t, e, r) {
    "use strict";

    function n(t, e, r) {
      return e in t ? Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : t[e] = r, t
    }

    function o(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    var i = function() {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
          }
        }
        return function(e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e
        }
      }(),
      a = t("./GeoPoint"),
      s = t("./GeoPolygon"),
      u = t("./HError"),
      c = t("./utils"),
      f = t("./BaseRecord"),
      l = f._serializeValueFuncFactory(["BaseRecord"]),
      h = function() {
        function t() {
          o(this, t), this.queryObject = {}
        }
        return i(t, [{
          key: "compare",
          value: function(t, e, r) {
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
            return this._addQueryObject(t, n({}, o, l(r))), this
          }
        }, {
          key: "contains",
          value: function(t, e) {
            if (e && c.isString(e)) return this._addQueryObject(t, {
              contains: e
            }), this;
            throw new u(605)
          }
        }, {
          key: "matches",
          value: function(t, e) {
            if (e && e instanceof RegExp) {
              var r = c.parseRegExp(e);
              return r.length > 1 ? this._addQueryObject(t, {
                regex: r[0],
                options: r[1]
              }) : this._addQueryObject(t, {
                regex: r[0]
              }), this
            }
            throw new u(605)
          }
        }, {
          key: "in",
          value: function(t, e) {
            if (e && e instanceof Array) return this._addQueryObject(t, { in: e.map(function(t) {
                return l(t)
              })
            }), this;
            throw new u(605)
          }
        }, {
          key: "notIn",
          value: function(t, e) {
            if (e && e instanceof Array) return this._addQueryObject(t, {
              nin: e.map(function(t) {
                return l(t)
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
            if (e && e instanceof a) return this._addQueryObject(t, {
              intersects: e.toGeoJSON()
            }), this;
            throw new u(605)
          }
        }, {
          key: "within",
          value: function(t, e) {
            if (e && e instanceof s) return this._addQueryObject(t, {
              within: e.toGeoJSON()
            }), this;
            throw new u(605)
          }
        }, {
          key: "withinCircle",
          value: function(t, e, r) {
            if (e && e instanceof a) {
              var n = {
                radius: r,
                coordinates: [e.longitude, e.latitude]
              };
              return this._addQueryObject(t, {
                center: n
              }), this
            }
            throw new u(605)
          }
        }, {
          key: "withinRegion",
          value: function(t, e, r) {
            var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
            if (e && e instanceof a) {
              var o = {
                geometry: e.toGeoJSON(),
                min_distance: n
              };
              return r && (o.max_distance = r), this._addQueryObject(t, {
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
            var r = n({}, t, {});
            Object.keys(e).forEach(function(n) {
              r[t]["$" + n] = e[n]
            }), this.queryObject.$and || (this.queryObject.$and = []), this.queryObject.$and.push(r)
          }
        }], [{
          key: "and",
          value: function() {
            for (var e = new t, r = {
                $and: []
              }, n = arguments.length, o = Array(n), i = 0; i < n; i++) o[i] = arguments[i];
            return o.forEach(function(t) {
              r.$and.push(t.queryObject)
            }), e._setQueryObject(r), e
          }
        }, {
          key: "or",
          value: function() {
            for (var e = new t, r = {
                $or: []
              }, n = arguments.length, o = Array(n), i = 0; i < n; i++) o[i] = arguments[i];
            return o.forEach(function(t) {
              r.$or.push(t.queryObject)
            }), e._setQueryObject(r), e
          }
        }]), t
      }();
    e.exports = h
  }, {
    "./BaseRecord": 7,
    "./GeoPoint": 11,
    "./GeoPolygon": 12,
    "./HError": 13,
    "./utils": 37
  }],
  15: [function(t, e, r) {
    "use strict";

    function n(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
      if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function i(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    var a = function() {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
          }
        }
        return function(e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e
        }
      }(),
      s = function t(e, r, n) {
        null === e && (e = Function.prototype);
        var o = Object.getOwnPropertyDescriptor(e, r);
        if (void 0 === o) {
          var i = Object.getPrototypeOf(e);
          return null === i ? void 0 : t(i, r, n)
        }
        if ("value" in o) return o.value;
        var a = o.get;
        if (void 0 !== a) return a.call(n)
      },
      u = t("./baas"),
      c = t("./BaseQuery"),
      f = t("./HError"),
      l = t("./Query"),
      h = t("./TableRecord"),
      d = t("./utils"),
      p = t("./BaseRecord"),
      y = function(t) {
        function e(t) {
          n(this, e);
          var r = o(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
          return r._tableID = t, r
        }
        return i(e, t), a(e, [{
          key: "create",
          value: function() {
            return new h(this._tableID)
          }
        }, {
          key: "createMany",
          value: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              r = e.enableTrigger,
              n = void 0 === r || r,
              o = p._serializeValueFuncFactory(["BaseRecord"]);
            if (d.isArray(t)) {
              var i = {
                tableID: this._tableID,
                data: t.map(function(t) {
                  return Object.keys(t).forEach(function(e) {
                    t[e] = o(t[e])
                  }), t
                }),
                enable_trigger: n ? 1 : 0
              };
              return u.createRecordList(i)
            }
            throw new f(605)
          }
        }, {
          key: "delete",
          value: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              r = e.enableTrigger,
              n = void 0 === r || r;
            if (d.isString(t) || Number.isInteger(t)) return u.deleteRecord({
              tableID: this._tableID,
              recordID: t
            });
            if (t instanceof l) {
              var o = {
                tableID: this._tableID,
                limit: this._limit,
                offset: this._offset,
                where: JSON.stringify(t.queryObject),
                enable_trigger: n ? 1 : 0
              };
              return this._initQueryParams(), u.deleteRecordList(o)
            }
            throw new f(605)
          }
        }, {
          key: "getWithoutData",
          value: function(t) {
            if (d.isString(t) || Number.isInteger(t)) return new h(this._tableID, t);
            if (t instanceof l) {
              var e = {};
              return e.limit = this._limit, e.offset = this._offset, e.where = d.cloneDeep(t.queryObject), this._initQueryParams(), new h(this._tableID, null, e)
            }
            throw new f(605)
          }
        }, {
          key: "get",
          value: function(t) {
            var e = {
              tableID: this._tableID,
              recordID: t
            };
            return this._expand && (e.expand = this._expand), this._keys && (e.keys = this._keys), this._initQueryParams(), u.getRecord(e)
          }
        }, {
          key: "_handleAllQueryConditions",
          value: function() {
            var t = s(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "_handleAllQueryConditions", this).call(this);
            return t.tableID = this._tableID, t
          }
        }, {
          key: "find",
          value: function() {
            var t = this._handleAllQueryConditions();
            return this._initQueryParams(), u.queryRecordList(t)
          }
        }, {
          key: "count",
          value: function() {
            return this.limit(1).find().then(function(t) {
              return t.data.meta.total_count
            })
          }
        }]), e
      }(c);
    e.exports = y
  }, {
    "./BaseQuery": 6,
    "./BaseRecord": 7,
    "./HError": 13,
    "./Query": 14,
    "./TableRecord": 16,
    "./baas": 20,
    "./utils": 37
  }],
  16: [function(t, e, r) {
    "use strict";

    function n(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
      if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function i(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    var a = function() {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
          }
        }
        return function(e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e
        }
      }(),
      s = t("./baas"),
      u = t("./BaseRecord"),
      c = t("./utils"),
      f = function(t) {
        function e(t, r) {
          var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          n(this, e);
          var a = o(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, r));
          return a._tableID = t, a._queryObject = i, a
        }
        return i(e, t), a(e, [{
          key: "save",
          value: function() {
            var t = c.cloneDeep(this._record);
            return this._recordValueInit(), s.createRecord({
              tableID: this._tableID,
              data: t.$set
            })
          }
        }, {
          key: "update",
          value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              e = t.enableTrigger,
              r = void 0 === e || e,
              n = c.cloneDeep(this._record);
            if (this._recordValueInit(), this._recordID) return s.updateRecord({
              tableID: this._tableID,
              recordID: this._recordID,
              data: n
            });
            var o = {
              tableID: this._tableID,
              data: n,
              where: JSON.stringify(this._queryObject.where),
              limit: this._queryObject.limit,
              offset: this._queryObject.offset,
              enable_trigger: r ? 1 : 0
            };
            return this._queryObject = {}, s.updateRecordList(o)
          }
        }]), e
      }(u);
    e.exports = f
  }, {
    "./BaseRecord": 7,
    "./baas": 20,
    "./utils": 37
  }],
  17: [function(t, e, r) {
    "use strict";

    function n(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
      if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function i(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    var a = function() {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
          }
        }
        return function(e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e
        }
      }(),
      s = t("./baas"),
      u = t("./BaseQuery"),
      c = t("./UserRecord"),
      f = t("./utils"),
      l = t("./HError"),
      h = function(t) {
        function e() {
          return n(this, e), o(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this))
        }
        return i(e, t), a(e, [{
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
            if (f.isString(t) || Number.isInteger(t)) return new c(t);
            throw new l(605)
          }
        }, {
          key: "getCurrentUserWithoutData",
          value: function() {
            return new c
          }
        }, {
          key: "find",
          value: function() {
            var t = this._handleAllQueryConditions();
            return this._initQueryParams(), s.getUserList(t)
          }
        }]), e
      }(u);
    e.exports = h
  }, {
    "./BaseQuery": 6,
    "./HError": 13,
    "./UserRecord": 18,
    "./baas": 20,
    "./utils": 37
  }],
  18: [function(t, e, r) {
    "use strict";

    function n(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
      if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function i(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    var a = function() {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
          }
        }
        return function(e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e
        }
      }(),
      s = t("./baas"),
      u = t("./BaseRecord"),
      c = t("./utils"),
      f = function(t) {
        function e(t) {
          return n(this, e), o(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t))
        }
        return i(e, t), a(e, [{
          key: "update",
          value: function() {
            var t = c.cloneDeep(this._record);
            return this._recordValueInit(), s.updateUser({
              data: t.$set
            })
          }
        }]), e
      }(u);
    e.exports = f
  }, {
    "./BaseRecord": 7,
    "./baas": 20,
    "./utils": 37
  }],
  19: [function(t, e, r) {
    "use strict";

    function n(t, e, r) {
      return e in t ? Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : t[e] = r, t
    }
    var o = t("./baas"),
      i = t("./constants"),
      a = t("./HError"),
      s = t("./request"),
      u = t("./storage"),
      c = t("./utils"),
      f = t("./polyfill"),
      l = o._config.API,
      h = !1,
      d = [],
      p = [],
      y = !1,
      _ = [],
      g = [],
      b = function() {
        return new Promise(function(t, e) {
          f.wxLogin({
            success: function(r) {
              return v(r.code, t, e)
            },
            fail: function() {
              c.wxRequestFail(e)
            }
          })
        })
      },
      v = function(t, e, r) {
        return s({
          url: l.LOGIN,
          method: "POST",
          data: {
            code: t
          }
        }).then(function(t) {
          t.statusCode == i.STATUS_CODE.CREATED ? (u.set(i.STORAGE_KEY.UID, t.data.user_id), u.set(i.STORAGE_KEY.OPENID, t.data.openid || ""), u.set(i.STORAGE_KEY.UNIONID, t.data.unionid || ""), u.set(i.STORAGE_KEY.AUTH_TOKEN, t.data.token), u.set(i.STORAGE_KEY.EXPIRES_AT, Math.floor(Date.now() / 1e3) + t.data.expires_in - 30), e(t)) : r(new a(t.statusCode, c.extractErrorMsg(t)))
        }, function(t) {
          r(t)
        })
      },
      w = function() {
        return arguments.length > 0 && void 0 !== arguments[0] && !arguments[0] ? E() : u.get(i.STORAGE_KEY.USERINFO) ? new Promise(function(t) {
          t(m())
        }) : h ? new Promise(function(t, e) {
          d.push(t), p.push(e)
        }) : (h = !0, new Promise(function(t, e) {
          d.push(t), p.push(e), E().then(function() {
            return S().then(function() {
              h = !1, O()
            })
          }).catch(function(t) {
            A(), T(t, !0)
          })
        }))
      },
      E = function() {
        return u.get(i.STORAGE_KEY.UID) && !c.isSessionExpired() ? new Promise(function(t) {
          t(m(!1))
        }) : y ? new Promise(function(t, e) {
          _.push(t), g.push(e)
        }) : (y = !0, new Promise(function(t, e) {
          _.push(t), g.push(e), b().then(function() {
            y = !1, O(!1)
          }, function(t) {
            y = !1, T(t, !1)
          })
        }))
      },
      m = function() {
        return arguments.length > 0 && void 0 !== arguments[0] && !arguments[0] ? n({
          id: u.get(i.STORAGE_KEY.UID),
          openid: u.get(i.STORAGE_KEY.OPENID),
          unionid: u.get(i.STORAGE_KEY.UNIONID)
        }, i.STORAGE_KEY.EXPIRES_AT, u.get(i.STORAGE_KEY.EXPIRES_AT)) : Object.assign(n({}, i.STORAGE_KEY.EXPIRES_AT, u.get(i.STORAGE_KEY.EXPIRES_AT)), u.get(i.STORAGE_KEY.USERINFO))
      },
      O = function() {
        var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        setTimeout(function() {
          if (t)
            for (; d.length;) d.shift()(m());
          else
            for (; _.length;) _.shift()(m(!1))
        }, 0)
      },
      T = function(t) {
        var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        setTimeout(function() {
          if (e)
            for (; p.length;) p.shift()(t);
          else
            for (; g.length;) g.shift()(t)
        }, 0)
      },
      A = function() {
        arguments.length > 0 && void 0 !== arguments[0] && !arguments[0] ? y = !1 : h = !1
      },
      P = function() {
        return new Promise(function(t, e) {
          s({
            url: l.LOGOUT,
            method: "POST"
          }).then(function() {
            o.clearSession(), t()
          }, function(t) {
            e(t)
          })
        })
      },
      S = function() {
        return new Promise(function(t, e) {
          f.wxGetUserInfo({
            success: function(r) {
              var n = {
                  rawData: r.rawData,
                  signature: r.signature,
                  encryptedData: r.encryptedData,
                  iv: r.iv
                },
                o = r.userInfo;
              return o.id = u.get(i.STORAGE_KEY.UID), o.openid = u.get(i.STORAGE_KEY.OPENID), o.unionid = u.get(i.STORAGE_KEY.UNIONID), D(n, t, e, o)
            },
            fail: function() {
              e(m(!1))
            }
          })
        })
      },
      R = function(t) {
        if (!t || !t.detail) throw new a(603);
        var e = t.detail;
        return new Promise(function(t, r) {
          return E().then(function() {
            if (!e.userInfo) return r(m(!1));
            var n = {
                rawData: e.rawData,
                signature: e.signature,
                encryptedData: e.encryptedData,
                iv: e.iv
              },
              o = e.userInfo;
            return o.id = u.get(i.STORAGE_KEY.UID), o.openid = u.get(i.STORAGE_KEY.OPENID), o.unionid = u.get(i.STORAGE_KEY.UNIONID), D(n, t, r, o)
          }, function(t) {
            r(t)
          })
        })
      },
      D = function(t, e, r, n) {
        return s({
          url: l.AUTHENTICATE,
          method: "POST",
          data: t
        }).then(function(t) {
          u.set(i.STORAGE_KEY.IS_LOGINED_BAAS, "1"), !n.unionid && t.data.unionid && (n.unionid = t.data.unionid, u.set(i.STORAGE_KEY.UNIONID, n.unionid)), u.set(i.STORAGE_KEY.USERINFO, n), e(m())
        }, function(t) {
          r(t)
        })
      };
    e.exports = {
      auth: b,
      handleUserInfo: R,
      login: w,
      logout: P,
      silentLogin: E
    }
  }, {
    "./HError": 13,
    "./baas": 20,
    "./constants": 25,
    "./polyfill": 32,
    "./request": 33,
    "./storage": 34,
    "./utils": 37
  }],
  20: [function(t, e, r) {
    (function(r) {
      "use strict";
      var n = t("./constants"),
        o = t("./HError"),
        i = t("./storage"),
        a = t("./utils"),
        s = t("./polyfill"),
        u = r.BaaS || {};
      u._config = a.getConfig(), u.init = function(t) {
        if (!a.isString(t)) throw new o(605);
        u._config.CLIENT_ID = t, u._config.API_HOST = s.getAPIHost(t)
      }, u.getAuthToken = function() {
        return i.get(n.STORAGE_KEY.AUTH_TOKEN)
      }, u.isLogined = function() {
        return i.get(n.STORAGE_KEY.IS_LOGINED_BAAS)
      }, u.clearSession = function() {
        i.set(n.STORAGE_KEY.AUTH_TOKEN, ""), i.set(n.STORAGE_KEY.IS_LOGINED_BAAS, ""), i.set(n.STORAGE_KEY.USERINFO, ""), i.set(n.STORAGE_KEY.UID, ""), i.set(n.STORAGE_KEY.OPENID, ""), i.set(n.STORAGE_KEY.UNIONID, "")
      }, e.exports = u
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
  }, {
    "./HError": 13,
    "./constants": 25,
    "./polyfill": 32,
    "./storage": 34,
    "./utils": 37
  }],
  21: [function(t, e, r) {
    "use strict";
    var n = t("./auth"),
      o = t("./baas"),
      i = t("./HError"),
      a = t("./request"),
      s = t("./utils"),
      u = function(t) {
        var e = arguments;
        t.url, t.method, t.data, t.header, t.dataType;
        return n.silentLogin().then(function() {
          return a.apply(null, e)
        }).then(function(t) {
          var e = parseInt(t.statusCode);
          if (e >= 200 && e < 300) return t;
          throw new i(t.statusCode, s.extractErrorMsg(t))
        })
      },
      c = function(t) {
        for (var e in t) t.hasOwnProperty(e) && (o[e] = function(e) {
          var r = t[e];
          return function(t) {
            var e = s.cloneDeep(t),
              n = r.method || "GET";
            if (r.defaultParams) {
              var o = s.cloneDeep(r.defaultParams);
              e = s.extend(o, e)
            }
            var i = s.format(r.url, e),
              a = {};
            return e.data ? a = e.data : (a = f(r.url, e), a = s.replaceQueryParams(a)), u({
              url: i,
              method: n,
              data: a
            })
          }
        }(e))
      },
      f = function(t, e) {
        return t.replace(/:(\w*)/g, function(t, r) {
          void 0 !== e[r] && delete e[r]
        }), e
      },
      l = function() {
        o._config.METHOD_MAP_LIST.map(function(t) {
          c(t)
        })
      };
    e.exports = {
      baasRequest: u,
      excludeParams: f,
      createRequestMethod: l,
      doCreateRequestMethod: c
    }
  }, {
    "./HError": 13,
    "./auth": 19,
    "./baas": 20,
    "./request": 33,
    "./utils": 37
  }],
  22: [function(t, e, r) {
    "use strict";
    var n = t("./baas"),
      o = t("./baasRequest").baasRequest,
      i = t("./constants"),
      a = t("./HError"),
      s = t("./utils"),
      u = function(t) {
        return new Promise(function(e, r) {
          wx.uploadFile({
            url: n._config.API_HOST + n._config.API.CENSOR_IMAGE,
            filePath: t,
            name: i.UPLOAD.UPLOAD_FILE_KEY,
            header: {
              Authorization: i.UPLOAD.HEADER_AUTH_VALUE + n.getAuthToken(),
              "X-Hydrogen-Client-Version": n._config.VERSION,
              "X-Hydrogen-Client-Platform": s.getSysPlatform(),
              "X-Hydrogen-Client-ID": n._config.CLIENT_ID,
              "User-Agent": i.UPLOAD.UA
            },
            success: function(t) {
              var n = t.statusCode,
                o = t.data;
              if (parseInt(n) !== i.STATUS_CODE.SUCCESS) return r(t);
              e(JSON.parse(o))
            },
            fail: function() {
              s.wxRequestFail(r)
            }
          })
        })
      },
      c = function(t) {
        return t && "string" == typeof t ? o({
          url: n._config.API_HOST + n._config.API.CENSOR_MSG,
          method: "POST",
          data: {
            content: t
          }
        }) : Promise.reject(new a(605))
      };
    e.exports = function(t) {
      t.wxCensorImage = u, t.wxCensorText = c
    }
  }, {
    "./HError": 13,
    "./baas": 20,
    "./baasRequest": 21,
    "./constants": 25,
    "./utils": 37
  }],
  23: [function(t, e, r) {
    "use strict";
    var n = t("./config"),
      o = {
        DEBUG: !0
      };
    e.exports = Object.assign(n, o)
  }, {
    "./config": 24
  }],
  24: [function(t, e, r) {
    "use strict";
    var n = /^https:\/\/\w+\.myminapp\.com/,
      o = {
        LOGIN: "/hserve/v1.4/session/init/",
        AUTHENTICATE: "/hserve/v1.4/session/authenticate/",
        LOGOUT: "/hserve/v1/session/destroy/",
        PAY: "/hserve/v1/wechat/pay/order/",
        ORDER: "/hserve/v1/wechat/pay/order/:transactionID/",
        UPLOAD: "/hserve/v1/upload/",
        TEMPLATE_MESSAGE: "/hserve/v1/template-message-ticket/",
        DECRYPT: "/hserve/v1/wechat/decrypt/",
        WXACODE: "/hserve/v1.4/miniappcode/",
        CLOUD_FUNCTION: "/hserve/v1/cloud-function/job/",
        USER_DETAIL: "/hserve/v1.3/user/info/:userID/",
        USER_LIST: "/hserve/v1.3/user/info/",
        UPDATE_USER: "/hserve/v1.3/user/info/",
        TABLE_LIST: "/hserve/v1.9/table/",
        TABLE_DETAIL: "/hserve/v1.9/table/:tableID/",
        RECORD_LIST: "/hserve/v1.9/table/:tableID/record/",
        QUERY_RECORD_LIST: "/hserve/v1.9/table/:tableID/record/",
        CREATE_RECORD_LIST: "/hserve/v1.9/table/:tableID/record/?enable_trigger=:enable_trigger",
        RECORD_DETAIL: "/hserve/v1.9/table/:tableID/record/:recordID/",
        CREATE_RECORD: "/hserve/v1.9/table/:tableID/record/",
        UPDATE_RECORD: "/hserve/v1.9/table/:tableID/record/:recordID/",
        UPDATE_RECORD_LIST: "/hserve/v1.9/table/:tableID/record/?limit=:limit&offset=:offset&where=:where&enable_trigger=:enable_trigger",
        DELETE_RECORD: "/hserve/v1.9/table/:tableID/record/:recordID/",
        DELETE_RECORD_LIST: "/hserve/v1.9/table/:tableID/record/?limit=:limit&offset=:offset&where=:where&enable_trigger=:enable_trigger",
        LAGECY_CONTENT_LIST: "/hserve/v1/content/detail/",
        CONTENT_LIST: "/hserve/v1.3/content/detail/",
        CONTENT_GROUP_LIST: "/hserve/v1/content/group/",
        CONTENT_DETAIL: "/hserve/v1.3/content/detail/:richTextID/",
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
        VIDEO_SNAPSHOT: "/hserve/v1/media/video-snapshot/",
        M3U8_CONCAT: "/hserve/v1/media/m3u8-concat/",
        M3U8_CLIP: "/hserve/v1/media/m3u8-clip/",
        M3U8_META: "/hserve/v1/media/m3u8-meta/",
        VIDEO_AUDIO_META: "/hserve/v1/media/audio-video-meta/"
      },
      i = [{
        getUserInfo: {
          url: o.USER_DETAIL,
          defaultParams: {
            userID: ""
          }
        },
        getUserDetail: {
          url: o.USER_DETAIL
        },
        getUserList: {
          url: o.USER_LIST
        },
        updateUser: {
          url: o.UPDATE_USER,
          method: "PUT"
        }
      }, {
        getTableList: {
          url: o.TABLE_LIST
        },
        getTable: {
          url: o.TABLE_DETAIL
        },
        getRecordList: {
          url: o.RECORD_LIST
        },
        queryRecordList: {
          url: o.QUERY_RECORD_LIST
        },
        getRecord: {
          url: o.RECORD_DETAIL
        },
        createRecord: {
          url: o.CREATE_RECORD,
          method: "POST"
        },
        createRecordList: {
          url: o.CREATE_RECORD_LIST,
          method: "POST"
        },
        updateRecord: {
          url: o.UPDATE_RECORD,
          method: "PUT"
        },
        updateRecordList: {
          url: o.UPDATE_RECORD_LIST,
          method: "PUT"
        },
        deleteRecord: {
          url: o.DELETE_RECORD,
          method: "DELETE"
        },
        deleteRecordList: {
          url: o.DELETE_RECORD_LIST,
          method: "DELETE"
        }
      }, {
        getContentList: {
          url: o.LAGECY_CONTENT_LIST
        },
        getContentList2: {
          url: o.CONTENT_LIST
        },
        getContent: {
          url: o.CONTENT_DETAIL
        },
        getContentGroupList: {
          url: o.CONTENT_GROUP_LIST
        },
        getContentGroup: {
          url: o.CONTENT_GROUP_DETAIL
        },
        getContentCategoryList: {
          url: o.CONTENT_CATEGORY_LIST
        },
        getContentCategory: {
          url: o.CONTENT_CATEGORY_DETAIL
        }
      }, {
        getFileDetail: {
          url: o.FILE_DETAIL
        },
        getFileList: {
          url: o.FILE_LIST
        },
        deleteFile: {
          url: o.DELETE_FILE,
          method: "DELETE"
        },
        deleteFiles: {
          url: o.DELETE_FILES,
          method: "DELETE"
        },
        getFileCategoryDetail: {
          url: o.FILE_CATEGORY_DETAIL
        },
        getFileCategoryList: {
          url: o.FILE_CATEGORY_LIST
        },
        sendSmsCode: {
          url: o.SEND_SMS_CODE,
          method: "POST"
        },
        verifySmsCode: {
          url: o.VERIFY_SMS_CODE,
          method: "POST"
        }
      }, {
        getOrderList: {
          url: o.PAY
        }
      }],
      a = {
        max: 100
      },
      s = {
        contentGroupID: "content_group_id",
        categoryID: "category_id",
        recordID: "id",
        submissionType: "submission_type",
        submissionValue: "submission_value",
        categoryName: "category_name"
      };
    e.exports = {
      API_HOST: "https://api.myminapp.com",
      API: o,
      API_HOST_PATTERN: n,
      AUTH_PREFIX: "Hydrogen-r1",
      METHOD_MAP_LIST: i,
      DEBUG: !1,
      RANDOM_OPTION: a,
      REQUEST_PARAMS_MAP: s,
      VERSION: "v1.16.0"
    }
  }, {}],
  25: [function(t, e, r) {
    "use strict";
    e.exports = {
      STORAGE_KEY: {
        AUTH_TOKEN: "auth_token",
        USERINFO: "userinfo",
        UID: "uid",
        OPENID: "openid",
        UNIONID: "unionid",
        IS_LOGINED_BAAS: "is_logined_baas",
        EXPIRES_AT: "session_expires_at"
      },
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
      httpMethodCodeMap: {
        GET: 200,
        POST: 201,
        PUT: 200,
        PATCH: 200,
        DELETE: 204
      }
    }
  }, {}],
  26: [function(t, e, r) {
    "use strict";

    function n() {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        e = t.usePlugins,
        r = void 0 !== e && e;
      if (!a._config || !a._config.CLIENT_ID) throw new s(602);
      return f.usePlugins = "plugin" === c.SDK_TYPE || r, l = !0, f.init(!0, {
        clientId: a._config.CLIENT_ID
      }, u.VERSION)
    }

    function o() {
      if (!l) throw new s(610);
      return f.track.apply(f, arguments)
    }

    function i() {
      if (!l) throw new s(610);
      return f.metaData.apply(f, arguments)
    }
    var a = t("./baas"),
      s = t("./HError"),
      u = t("./config"),
      c = t("./polyfill"),
      f = t("./vendor/bugOut.min"),
      l = !1;
    e.exports = {
      enable: n,
      track: o,
      metaData: i
    }
  }, {
    "./HError": 13,
    "./baas": 20,
    "./config": 24,
    "./polyfill": 32,
    "./vendor/bugOut.min": 38
  }],
  27: [function(t, e, r) {
    "use strict";
    var n = t("./baas"),
      o = t("./baasRequest").baasRequest,
      i = t("./HError"),
      a = t("./utils"),
      s = n._config.API,
      u = function(t, e, r, n) {
        var o = ["wxacode", "wxacodeunlimit", "wxaqrcode"],
          s = ["miniapp_permanent", "miniapp_temporary", "miniapp_qr"],
          u = {},
          c = o.indexOf(t);
        if (!a.isString(t) || -1 === c) throw new i(605, 'type 为字符串类型且只接受 "wxacode", "wxacodeunlimit", "wxaqrcode" 其中一种');
        if (u.code_type = s[c], !e || e.constructor !== Object) throw new i(605, "params 为 Object 类型");
        if ("wxacode" === t || "wxaqrcode" === t) {
          if (!e.hasOwnProperty("path")) throw new i(605, '当 type 为 "wxacode" 或 "wxaqrcode" 时，params 中必须带有 "path" 属性');
          u.path = e.path
        }
        if ("wxacodeunlimit" === t) {
          if (!e.hasOwnProperty("scene")) throw new i(605, '当 type 为 "wxacodeunlimit" 时，params 中必须带有 "scene" 属性');
          u.scene = e.scene, e.hasOwnProperty("page") && (u.path = e.page)
        }
        return u.options = {}, e.hasOwnProperty("width") && (u.options.width = e.width), e.hasOwnProperty("auto_color") && (u.options.auto_color = e.auto_color), e.hasOwnProperty("line_color") && (u.options.line_color = e.line_color), e.hasOwnProperty("is_hyaline") && (u.options.is_hyaline = e.is_hyaline), !0 === r && (u.upload_to_cdn = !0, n && (u.category_name = n)), u
      },
      c = function(t, e, r, n) {
        var i = u(t, e, r, n);
        return o({
          url: s.WXACODE,
          method: "POST",
          data: i
        }).then(function(t) {
          return t.data
        })
      };
    e.exports = c
  }, {
    "./HError": 13,
    "./baas": 20,
    "./baasRequest": 21,
    "./utils": 37
  }],
  28: [function(t, e, r) {
    "use strict";
    var n = t("./baas");
    n.auth = t("./baasRequest").auth, n.ContentGroup = t("./ContentGroup"), n.File = t("./File"), n.FileCategory = t("./FileCategory"), n.GeoPoint = t("./GeoPoint"), n.GeoPolygon = t("./GeoPolygon"), n.getWXACode = t("./getWXACode"), n.handleUserInfo = t("./auth").handleUserInfo, n.invokeFunction = t("./invokeFunction"), n.invoke = t("./invokeFunction"), n.login = t("./auth").login, n.logout = t("./auth").logout, n.order = t("./order").order, n.Order = t("./order"), n.pay = t("./pay"), n.Query = t("./Query"), n.request = t("./request"), n.storage = t("./storage"), n.TableObject = t("./TableObject"), n.uploadFile = t("./uploadFile"), n.User = t("./User"), n.wxDecryptData = t("./wxDecryptData"), n.wxReportTicket = t("./templateMessage").wxReportTicket, t("./censor")(n), n.ErrorTracker = t("./errorTracker"), t("./baasRequest").createRequestMethod(), "undefined" != typeof wx && (wx.BaaS = n), e.exports = n
  }, {
    "./ContentGroup": 8,
    "./File": 9,
    "./FileCategory": 10,
    "./GeoPoint": 11,
    "./GeoPolygon": 12,
    "./Query": 14,
    "./TableObject": 15,
    "./User": 17,
    "./auth": 19,
    "./baas": 20,
    "./baasRequest": 21,
    "./censor": 22,
    "./errorTracker": 26,
    "./getWXACode": 27,
    "./invokeFunction": 29,
    "./order": 30,
    "./pay": 31,
    "./request": 33,
    "./storage": 34,
    "./templateMessage": 35,
    "./uploadFile": 36,
    "./wxDecryptData": 39
  }],
  29: [function(t, e, r) {
    "use strict";
    var n = t("./baas"),
      o = t("./baasRequest").baasRequest,
      i = t("./HError"),
      a = n._config.API,
      s = function(t, e) {
        var r = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
        if (!t) throw new i(605);
        var n = {
          function_name: t,
          sync: r
        };
        return void 0 !== e && (n.data = e), o({
          url: a.CLOUD_FUNCTION,
          method: "POST",
          data: n
        }).then(function(t) {
          return t.data
        })
      };
    e.exports = s
  }, {
    "./HError": 13,
    "./baas": 20,
    "./baasRequest": 21
  }],
  30: [function(t, e, r) {
    "use strict";

    function n(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
      if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function i(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    var a = function() {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
          }
        }
        return function(e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e
        }
      }(),
      s = t("./baas"),
      u = t("./baasRequest").baasRequest,
      c = t("./utils"),
      f = t("./BaseQuery"),
      l = s._config.API,
      h = function(t) {
        function e() {
          return n(this, e), o(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this))
        }
        return i(e, t), a(e, [{
          key: "get",
          value: function(t) {
            var e = c.format(l.ORDER, {
              transactionID: t
            });
            return u({
              url: e
            })
          }
        }, {
          key: "getOrderList",
          value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              e = Object.assign({}, this._handleAllQueryConditions(), t);
            return this._initQueryParams(), s.getOrderList(Object.assign(e, t))
          }
        }]), e
      }(f);
    h.order = function(t) {
      return (new h).get(t.transactionID)
    }, e.exports = h
  }, {
    "./BaseQuery": 6,
    "./baas": 20,
    "./baasRequest": 21,
    "./utils": 37
  }],
  31: [function(t, e, r) {
    "use strict";
    var n = t("./baas"),
      o = t("./baasRequest").baasRequest,
      i = t("./HError"),
      a = t("./polyfill"),
      s = n._config.API,
      u = {
        merchandiseSchemaID: "merchandise_schema_id",
        merchandiseRecordID: "merchandise_record_id",
        merchandiseSnapshot: "merchandise_snapshot",
        merchandiseDescription: "merchandise_description",
        totalCost: "total_cost"
      },
      c = function(t) {
        var e = {};
        for (var r in t) e[u[r]] = t[r];
        return o({
          url: s.PAY,
          method: "POST",
          data: e
        }).then(function(t) {
          var e = t.data || {};
          return new Promise(function(t, r) {
            a.wxPaymentRequest({
              appId: e.appId,
              timeStamp: e.timeStamp,
              nonceStr: e.nonceStr,
              package: e.package,
              signType: "MD5",
              paySign: e.paySign,
              success: function(r) {
                return r.transaction_no = e.transaction_no, r.trade_no = e.trade_no, t(r)
              },
              complete: function(t) {
                "requestPayment:fail cancel" == t.errMsg && r(new i(607))
              },
              fail: function(t) {
                r("requestPayment:fail cancel" == t.errMsg ? new i(607) : new i(608, t.errMsg))
              }
            })
          })
        })
      };
    e.exports = c
  }, {
    "./HError": 13,
    "./baas": 20,
    "./baasRequest": 21,
    "./polyfill": 32
  }],
  32: [function(t, e, r) {
    "use strict";
    e.exports = {
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
      getAPIHost: function(t) {
        return "https://" + t + ".myminapp.com"
      },
      SDK_TYPE: "file"
    }
  }, {}],
  33: [function(t, e, r) {
    "use strict";

    function n(e, r, n) {
      var a = t("./auth").silentLogin;
      c.get(i.STORAGE_KEY.UID) && o.clearSession(), a().then(function() {
        wx.request(Object.assign(e, {
          header: h(e.header),
          success: r,
          fail: function() {
            s.wxRequestFail(n)
          }
        }))
      }, n)
    }
    var o = t("./baas"),
      i = t("./constants"),
      a = t("./HError"),
      s = t("./utils"),
      u = t("./polyfill"),
      c = t("./storage"),
      f = t("./config"),
      l = ["X-Hydrogen-Client-ID", "X-Hydrogen-Client-Version", "X-Hydrogen-Client-Platform", "Authorization"],
      h = function(t) {
        var e = {
            "X-Hydrogen-Client-ID": o._config.CLIENT_ID,
            "X-Hydrogen-Client-Version": o._config.VERSION,
            "X-Hydrogen-Client-Platform": s.getSysPlatform(),
            "X-Hydrogen-Client-SDK-Type": u.SDK_TYPE
          },
          r = o.getAuthToken();
        return r && (e.Authorization = o._config.AUTH_PREFIX + " " + r), t && l.map(function(e) {
          t.hasOwnProperty(e) && delete t[e]
        }), s.extend(e, t || {})
      },
      d = function(t) {
        var e = t.url,
          r = t.method,
          u = void 0 === r ? "GET" : r,
          c = t.data,
          l = void 0 === c ? {} : c,
          d = t.header,
          p = void 0 === d ? {} : d,
          y = t.dataType,
          _ = void 0 === y ? "json" : y;
        return new Promise(function(t, r) {
          if (!o._config.CLIENT_ID) return r(new a(602));
          var c = h(p);
          /https?:\/\//.test(e) || (e = o._config.API_HOST + e), wx.request({
            method: u,
            url: e,
            data: l,
            header: c,
            dataType: _,
            success: function(o) {
              if (o.statusCode == i.STATUS_CODE.UNAUTHORIZED && e.match(f.API_HOST_PATTERN)) return n({
                header: p,
                method: u,
                url: e,
                data: l,
                dataType: _
              }, t, r);
              t(o)
            },
            fail: function() {
              s.wxRequestFail(r)
            }
          }), s.log("Request => " + e)
        })
      };
    e.exports = d
  }, {
    "./HError": 13,
    "./auth": 19,
    "./baas": 20,
    "./config": 24,
    "./constants": 25,
    "./polyfill": 32,
    "./storage": 34,
    "./utils": 37
  }],
  34: [function(t, e, r) {
    "use strict";
    e.exports = {
      set: function(t, e) {
        wx.setStorageSync("ifx_baas_" + t, e)
      },
      get: function(t) {
        return wx.getStorageSync("ifx_baas_" + t)
      }
    }
  }, {}],
  35: [function(t, e, r) {
    "use strict";

    function n(t) {
      if (!t) throw new a(605);
      var e = {};
      return e.submission_type = "form_id", e.submission_value = t, e
    }
    var o = t("./baas"),
      i = t("./baasRequest").baasRequest,
      a = t("./HError"),
      s = o._config.API,
      u = function(t) {
        var e = n(t);
        return i({
          url: s.TEMPLATE_MESSAGE,
          method: "POST",
          data: e
        })
      };
    e.exports = {
      makeParams: n,
      wxReportTicket: u
    }
  }, {
    "./HError": 13,
    "./baas": 20,
    "./baasRequest": 21
  }],
  36: [function(t, e, r) {
    "use strict";
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      },
      o = t("./baas"),
      i = t("./baasRequest").baasRequest,
      a = t("./constants"),
      s = t("./HError"),
      u = t("./utils"),
      c = function(t, e) {
        return e.filename = t, i({
          url: o._config.API_HOST + o._config.API.UPLOAD,
          method: "POST",
          data: e
        })
      },
      f = function(t, e, r, n) {
        return wx.uploadFile({
          url: t.uploadUrl,
          filePath: t.filePath,
          name: a.UPLOAD.UPLOAD_FILE_KEY,
          formData: {
            authorization: t.authorization,
            policy: t.policy
          },
          header: {
            Authorization: a.UPLOAD.HEADER_AUTH_VALUE + o.getAuthToken(),
            "X-Hydrogen-Client-Version": o._config.VERSION,
            "X-Hydrogen-Client-Platform": u.getSysPlatform(),
            "X-Hydrogen-Client-ID": o._config.CLIENT_ID,
            "User-Agent": a.UPLOAD.UA
          },
          success: function(r) {
            var o = {},
              i = JSON.parse(r.data);
            o.status = "ok", o.path = t.destLink, o.file = {
              id: t.id,
              name: t.fileName,
              created_at: i.time,
              mime_type: i.mimetype,
              cdn_path: i.url,
              size: i.file_size
            }, delete r.data, r.data = n && "json" === n ? o : JSON.stringify(o), e(r)
          },
          fail: function() {
            u.wxRequestFail(r)
          }
        })
      },
      l = function(t, e, r) {
        function o(t) {
          return Object.assign(t, {
            catch: function() {
              for (var t, e = arguments.length, r = Array(e), n = 0; n < e; n++) r[n] = arguments[n];
              var i = (t = Promise.prototype.catch).call.apply(t, [this].concat(r));
              return o(i), i
            },
            then: function() {
              for (var t, e = arguments.length, r = Array(e), n = 0; n < e; n++) r[n] = arguments[n];
              var i = (t = Promise.prototype.then).call.apply(t, [this].concat(r));
              return o(i), i
            },
            abort: _,
            onProgressUpdate: y
          })
        }
        if (!t || "object" !== (void 0 === t ? "undefined" : n(t)) || !t.filePath) throw new s(605);
        if (e) {
          if ("object" !== (void 0 === e ? "undefined" : n(e))) throw new s(605)
        } else e = {};
        var i = void 0,
          a = void 0,
          l = void 0,
          h = void 0,
          d = null,
          p = new Promise(function(t, e) {
            i = t, a = e
          }),
          y = function(t) {
            return d ? d.onProgressUpdate(t) : l = t, this
          },
          _ = function() {
            return d && d.abort(), h = !0, this
          };
        o(p);
        var g = u.getFileNameFromPath(t.filePath);
        return c(g, u.replaceQueryParams(e)).then(function(e) {
          if (h) return a(new Error("aborted"));
          var n = {
            id: e.data.id,
            fileName: g,
            policy: e.data.policy,
            authorization: e.data.authorization,
            uploadUrl: e.data.upload_url,
            filePath: t.filePath,
            destLink: e.data.file_link
          };
          d = f(n, function(t) {
            if (h) return a(new Error("aborted"));
            i(t)
          }, a, r), l && d.onProgressUpdate(l)
        }, a), p
      };
    e.exports = l
  }, {
    "./HError": 13,
    "./baas": 20,
    "./baasRequest": 21,
    "./constants": 25,
    "./utils": 37
  }],
  37: [function(t, e, r) {
    "use strict";

    function n() {
      return Date.now() / 1e3 >= (a.get(s.STORAGE_KEY.EXPIRES_AT) || 0)
    }
    var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      },
      i = t("./HError"),
      a = t("./storage"),
      s = t("./constants"),
      u = void 0;
    try {
      u = t("./../../../core/config.js")
    } catch (e) {
      u = t("./config.dev")
    }
    Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
      value: function(t, e) {
        if (null == this) throw new TypeError('"this" is null or not defined');
        var r = Object(this),
          n = r.length >>> 0;
        if (0 === n) return !1;
        for (var o = 0 | e, i = Math.max(o >= 0 ? o : n - Math.abs(o), 0); i < n;) {
          if (function(t, e) {
              return t === e || "number" == typeof t && "number" == typeof e && isNaN(t) && isNaN(e)
            }(r[i], t)) return !0;
          i++
        }
        return !1
      }
    });
    var c = function() {
        return u
      },
      f = function() {
        var t = "UNKNOWN";
        try {
          t = wx.getSystemInfoSync().platform
        } catch (t) {}
        return t
      },
      l = function(t) {
        "undefined" != typeof BaaS && BaaS.test || !c().DEBUG || console.log("BaaS LOG: " + t)
      },
      h = function(t, e) {
        e = e || {};
        for (var r in e) {
          var n = new RegExp(":" + r, "g");
          t = t.replace(n, e[r])
        }
        return t.replace(/([^:])\/\//g, function(t, e) {
          return e + "/"
        })
      },
      d = function(t) {
        var e = t.lastIndexOf("/");
        return t.slice(e + 1)
      },
      p = function(t) {
        var e = [],
          r = t.toString(),
          n = r.lastIndexOf("/");
        return e.push(r.substring(1, n)), n !== r.length - 1 && e.push(r.substring(n + 1)), e
      },
      y = function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          e = u.REQUEST_PARAMS_MAP,
          r = m({}, t);
        return Object.keys(t).map(function(n) {
          Object.keys(e).map(function(o) {
            if (n.startsWith(o)) {
              var i = n.replace(o, e[o]);
              delete r[n], r[i] = t[n]
            }
          })
        }), r
      },
      _ = function(t) {
        wx.getNetworkType({
          success: function(e) {
            t("none" === e.networkType ? new i(600) : new i(601))
          }
        })
      },
      g = function(t) {
        var e = "";
        return 404 === t.statusCode ? e = "not found" : t.data.error_msg ? e = t.data.error_msg : t.data.message && (e = t.data.message), e
      },
      b = function(t) {
        return "[object String]" === Object.prototype.toString.call(t)
      },
      v = function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
      },
      w = function(t) {
        var e = void 0 === t ? "undefined" : o(t);
        return null != t && "object" == e
      },
      E = function(t) {
        var e = void 0 === t ? "undefined" : o(t);
        return null != t && "function" == e
      },
      m = function(t, e) {
        return Object.assign(t, e)
      },
      O = function t(e) {
        if (void 0 === e || null === e) return Object.create(null);
        var r = v(e) ? [] : Object.create(Object.getPrototypeOf(e));
        for (var n in e) e.hasOwnProperty(n) && (e[n] && "object" === o(e[n]) ? (r[n] = v(e[n]) ? [] : {}, r[n] = t(e[n])) : r[n] = e[n]);
        return r
      };
    e.exports = {
      log: l,
      format: h,
      getConfig: c,
      getSysPlatform: f,
      getFileNameFromPath: d,
      parseRegExp: p,
      replaceQueryParams: y,
      wxRequestFail: _,
      extractErrorMsg: g,
      isArray: v,
      isString: b,
      isObject: w,
      isFunction: E,
      extend: m,
      cloneDeep: O,
      isSessionExpired: n
    }
  }, {
    "./../../../core/config.js": 24,
    "./HError": 13,
    "./config.dev": 23,
    "./constants": 25,
    "./storage": 34
  }],
  38: [function(t, e, r) {
    (function(t) {
      "use strict";
      var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      };
      ! function(t, o) {
        "object" == (void 0 === r ? "undefined" : n(r)) && void 0 !== e ? e.exports = o() : "function" == typeof define && define.amd ? define(o) : t.Bugout = o()
      }(void 0, function() {
        var e = {
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
          r = {
            uuid: function() {
              function e(t, e) {
                var r = e || 0,
                  n = a;
                return n[t[r++]] + n[t[r++]] + n[t[r++]] + n[t[r++]] + "-" + n[t[r++]] + n[t[r++]] + "-" + n[t[r++]] + n[t[r++]] + "-" + n[t[r++]] + n[t[r++]] + "-" + n[t[r++]] + n[t[r++]] + n[t[r++]] + n[t[r++]] + n[t[r++]] + n[t[r++]]
              }

              function r(t, r, o) {
                var a = r && o || 0;
                "string" == typeof t && (r = "binary" === t ? new i(16) : null, t = null);
                var s = (t = t || {}).random || (t.rng || n)();
                if (s[6] = 15 & s[6] | 64, s[8] = 63 & s[8] | 128, r)
                  for (var u = 0; u < 16; u++) r[a + u] = s[u];
                return r || e(s)
              }
              var n, o;
              ! function() {
                if (!n) {
                  var t = new Array(16);
                  o = n = function() {
                    for (var e, r = 0; r < 16; r++) 0 == (3 & r) && (e = 4294967296 * Math.random()), t[r] = e >>> ((3 & r) << 3) & 255;
                    return t
                  }
                }
              }();
              for (var i = "function" == typeof t ? t : Array, a = [], s = {}, u = 0; u < 256; u++) a[u] = (u + 256).toString(16).substr(1), s[a[u]] = u;
              var c = r;
              return c.v4 = r, c.parse = function(t, e, r) {
                var n = e && r || 0,
                  o = 0;
                for (e = e || [], t.toLowerCase().replace(/[0-9a-f]{2}/g, function(t) {
                    o < 16 && (e[n + o++] = s[t])
                  }); o < 16;) e[n + o++] = 0;
                return e
              }, c.unparse = e, c.BufferClass = i, c._rng = n, c._mathRNG = o, c._nodeRNG = void 0, c._whatwgRNG = void 0, c()
            },
            getCurrentPageUrl: function() {
              var t = getCurrentPages();
              if (t.length) return t[t.length - 1]
            },
            getAesKey: function() {
              var t, e = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
                r = e.length,
                n = "";
              for (t = 0; t < 16; t++) n += e.charAt(Math.floor(Math.random() * r));
              return n
            },
            reWriteApp: function(t) {
              var r = App,
                n = this;
              App = function(o) {
                return ["onLaunch", "onShow", "onHide", "onError"].forEach(function(r) {
                  var i = o[r];
                  o[r] = function(o) {
                    "onLaunch" === r && (e.sdkDown.di.testin_chan = e.record.attrs.testin_chan = o.scene);
                    var a = {};
                    "onError" === r ? (a.testin_bug_s_time = n.nowTime(), a.testin_bug_s_tit = "⬆⬆⬆⬆⬆BUG在此⬆⬆⬆⬆⬆", a.testin_bug_s_con = "App: " + r) : (a.testin_bug_s_time = n.nowTime(), a.testin_bug_s_tit = o && o.path || "", a.testin_bug_s_con = "App: " + r), n.pushToBreadcrumb(a), "onError" === r && t.track(o), i && i.call(this, o)
                  }
                }), r(o)
              }
            },
            reWritePage: function() {
              var t = this,
                e = Page;
              Page = function(r) {
                return Object.keys(r).forEach(function(e) {
                  "function" == typeof r[e] && t.recordPageFn(r, e)
                }), r.onReady || t.recordPageFn(r, "onReady"), r.onLoad || t.recordPageFn(r, "onLoad"), e(r)
              }
            },
            reWriteWxRequest: function() {
              var t = this,
                r = wx.request;
              try {
                Object.defineProperty(wx, "request", {
                  configurable: !0,
                  enumerable: !0,
                  writable: !0,
                  value: function() {
                    var n = arguments[0] || {},
                      o = t.nowTime();
                    return n.url.indexOf(e.url.sdkDown) > -1 || n.url.indexOf(e.url.track) > -1 ? r.apply(wx, arguments) : (n.complete ? t.reWriteComplete(n, o) : n.complete = function(e) {
                      t.pushToBreadcrumb({
                        testin_bug_s_time: t.nowTime(),
                        testin_bug_s_tit: n.url,
                        testin_bug_s_con: n.method + ", status: " + e.statusCode
                      })
                    }, r.apply(wx, arguments))
                  }
                })
              } catch (t) {
                console.log(t, "此内容为bugout所有~~")
              }
            },
            reWriteComplete: function(t, e) {
              var r = this,
                n = t.complete;
              t.complete = function(e) {
                return r.pushToBreadcrumb({
                  testin_bug_s_time: r.nowTime(),
                  testin_bug_s_tit: t.url,
                  testin_bug_s_con: t.method + ", status: " + e.statusCode
                }), n(e)
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
              this.consoleList = [], ["debug", "error", "info", "log", "warn"].forEach(function(r) {
                ! function(n) {
                  console[r] = function(o) {
                    e.consoleList.push(e.nowTimeTrans() + " " + t[r] + "/console(0): " + o), e.consoleList.length > 100 && e.consoleList.shift(), n.apply(console, arguments)
                  }
                }(console[r])
              })
            },
            recordPageFn: function(t, e) {
              var r = t[e],
                n = this;
              t[e] = function() {
                "onLoad" !== e && "onShow" !== e || (n.activePage = n.getCurrentPageUrl());
                var t = {
                  testin_bug_s_time: n.nowTime(),
                  testin_bug_s_tit: n.activePage ? n.activePage.route : "-",
                  testin_bug_s_con: "Page: " + e
                };
                return "onLoad" === e && (t.args = arguments), n.pushToBreadcrumb(t), r && r.apply(this, arguments)
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
            pushToBreadcrumb: function(t) {
              e.breadcrumb.push(t), e.breadcrumb.length > 100 && e.breadcrumb.shift()
            },
            getStorage: function() {
              var t = this;
              wx.getStorage({
                key: "testin_id",
                success: function(t) {
                  e.sdkDown.testin_first = !1, e.sdkDown.testin_id = e.record.testin_eid = e.record.testin_id = t.data
                },
                fail: function() {
                  var r = t.uuid();
                  wx.setStorage({
                    key: "testin_id",
                    data: r
                  }), e.sdkDown.testin_first = !0, e.sdkDown.testin_id = e.record.testin_eid = e.record.testin_id = r
                }
              })
            }
          },
          o = "function" == typeof Symbol && "symbol" == n(Symbol.iterator) ? function(t) {
            return void 0 === t ? "undefined" : n(t)
          } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : n(t)
          };
        return {
          init: function(t, n, i) {
            function a(n, o) {
              if (r.reWriteConsole(), n.usePlugins || (r.reWriteWxRequest(), r.reWritePage(), r.reWriteApp(u)), "boolean" == typeof t) {
                if (e.sdkDown.di.testin_zone = e.record.attrs.testin_zone = r.timeZone(), e.sdkDown.di.testin_av = e.record.attrs.testin_av = i, r.bugOutPower = t, wx.getAccountInfoSync) {
                  var a = wx.getAccountInfoSync();
                  e.sdkDown.di.testin_pa = e.record.attrs.testin_pa = a.miniProgram.appId
                }
                e.sdkDown.pid = e.record.testin_pid = o, e.sdkDown.testin_time = r.nowTime(), r.getStorage(), wx.getSystemInfo({
                  success: function(t) {
                    var r = t.system.split(" ");
                    e.record.attrs.testin_wechat_ver = e.sdkDown.di.testin_wechat_ver = t.version, e.record.attrs.testin_brand = e.sdkDown.di.testin_brand = t.brand, e.record.attrs.testin_model = e.sdkDown.di.testin_model = t.model, e.record.attrs.testin_os = e.sdkDown.di.testin_os = r[0], e.record.attrs.testin_ov = e.sdkDown.di.testin_ov = r[1], e.record.attrs.testin_dh = e.sdkDown.di.testin_dh = t.screenHeight, e.record.attrs.testin_dw = e.sdkDown.di.testin_dw = t.screenWidth, e.record.attrs.testin_lan = e.sdkDown.di.testin_lan = t.language, e.record.attrs.testin_bug_bn = e.sdkDown.di.testin_bug_bn = t.platform, e.record.attrs.testin_component_ver = e.sdkDown.di.testin_component_ver = t.SDKVersion, e.record.attrs.testin_bug_pr = e.sdkDown.di.testin_bug_pr = t.pixelRatio.toFixed(1), e.record.attrs.testin_bug_ww = e.sdkDown.di.testin_bug_ww = t.windowWidth, e.record.attrs.testin_bug_wh = e.sdkDown.di.testin_bug_wh = t.windowHeight, e.record.attrs.testin_bug_sbh = e.sdkDown.di.testin_bug_sbh = t.statusBarHeight, e.record.attrs.testin_bug_fss = e.sdkDown.di.testin_bug_fss = t.fontSizeSetting, t.batteryLevel && (e.record.attrs.testin_bat_rem = e.sdkDown.di.testin_bat_rem = t.batteryLevel)
                  },
                  complete: function() {
                    wx.getNetworkType({
                      success: function(t) {
                        e.record.attrs.testin_net = e.sdkDown.di.testin_net = t.networkType
                      },
                      complete: function() {
                        wx.request({
                          url: e.url.sdkDown,
                          method: "POST",
                          data: e.sdkDown
                        })
                      }
                    })
                  }
                })
              } else console.log("请按照集成文档正确集成SDK")
            }
            var s = void 0,
              u = this;
            "object" === (void 0 === n ? "undefined" : o(n)) ? wx.request({
              url: "https://dataapi.testin.cn/api/getappkey/" + n.clientId,
              header: {
                "Content-Type": "text/html;charset=UTF-8"
              },
              success: function(t) {
                s = t.data ? t.data : "noPid", a(u, s)
              }
            }): "string" == typeof n && a(u, s = n)
          },
          track: function(t) {
            if (r.bugOutPower) {
              "string" == typeof t && (e.record.attrs.testin_bug_rea = t.split("\n")[1], e.record.attrs.testin_bug_name = t.split("\n")[0], e.record.attrs.testin_bug_stack = t), "object" === (void 0 === t ? "undefined" : o(t)) && (e.record.attrs.testin_bug_rea = t.message, e.record.attrs.testin_bug_name = t.name, e.record.attrs.testin_bug_stack = t.stack), e.record.attrs.testin_bug_slog = r.consoleList.join("\n"), e.record.attrs.testin_url = r.getCurrentPageUrl() ? r.getCurrentPageUrl().route : "", e.record.testin_time = r.nowTime(), e.record.attrs.testin_bug_steps = JSON.stringify(e.breadcrumb);
              var n = [];
              n.push(e.record), wx.request({
                url: e.url.track,
                method: "POST",
                data: n
              })
            }
          },
          usePlugins: !1,
          metaData: function(t) {
            return e.record.attrs.testin_bug_user = JSON.stringify(Object.assign({}, t))
          }
        }
      })
    }).call(this, t("buffer").Buffer)
  }, {
    buffer: 2
  }],
  39: [function(t, e, r) {
    "use strict";
    var n = t("./baas"),
      o = t("./baasRequest").baasRequest,
      i = t("./HError"),
      a = n._config.API,
      s = function() {
        for (var t = arguments.length, e = Array(t), r = 0; r < t; r++) e[r] = arguments[r];
        if (!u(e)) throw new i(605);
        var n = {
          encryptedData: e[0],
          iv: e[1]
        };
        return o({
          url: a.DECRYPT + e[2] + "/",
          method: "POST",
          data: n
        }).then(function(t) {
          return t.data
        }, function(t) {
          var e = t.code;
          if (403 === e) throw new i(403, "微信解密插件未开启");
          if (401 === e) throw new i(401, res.data.message);
          if (400 === e) throw new i(400, res.data.message)
        })
      },
      u = function(t) {
        return t instanceof Array && !(t.length < 3) && -1 !== ["we-run-data", "open-gid", "phone-number"].indexOf(t[2])
      };
    e.exports = s
  }, {
    "./HError": 13,
    "./baas": 20,
    "./baasRequest": 21
  }]
}, {}, [5]);