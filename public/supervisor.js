!function(t) {
  function e(i) {
    if (n[i]) return n[i].exports; var r = n[i] = {
      i: i, l: !1, exports: {
      }
    }; return t[i].call(r.exports, r, r.exports, e), r.l = !0, r.exports
  } var n = {
  }; e.m = t, e.c = n, e.d = function(t, n, i) {
    e.o(t, n) || Object.defineProperty(t, n, {
      configurable: !1, enumerable: !0, get: i
    })
  }, e.n = function(t) {
    var n = t && t.__esModule ? function() {
      return t.default
    } : function() {
      return t
    }; return e.d(n, "a", n), n
  }, e.o = function(t, e) {
    return Object.prototype.hasOwnProperty.call(t, e)
  }, e.p = "", e(e.s = 0)
}([function(t, e, n) {
  t.exports = n(1)
}, function(t, e, n) {
  "use strict"; Object.defineProperty(e, "__esModule", {
    value: !0
  }), n.d(e, "PERMITTED_PARENT_ORIGINS", function() {
    return o
  }); var i = n(2), r = n(3), o = /https:\/\/(?:[^\.]+\.)*?twitch\.(tv|tech)/; document.addEventListener("DOMContentLoaded", function() {
    window.parent.postMessage({
      action: i.a.SupervisorReady
    }, "*"), document.body.setAttribute("tabindex", "-1"), document.documentElement.setAttribute("style", "height: 100%; width: 100%;")
  }), window.addEventListener("message", function(t) {
    var e = t.source, n = t.data, s = t.origin; if (e === window.parent && null !== s.match(o) && n.action === i.a.SupervisorInit) {
      var a = n.options, c = a.extensionURL, u = a.hostOrigin, d = a.iframeAttrs; r.a.init(c, u, o, window.parent, d)
    }
  })
}, function(t, e, n) {
  "use strict"; n.d(e, "a", function() {
    return i
  }); var i = {
    SupervisorReady: "supervisor-ready", SupervisorInit: "supervisor-init"
  }
}, function(t, e, n) {
  "use strict"; function i(t) {
    var e = document.createElement("a"); e.setAttribute("href", t); var n = e.protocol + "//" + e.hostname, i = e.protocol.slice(0, -1); return e.port && e.port !== r[i] && (n += ":" + e.port), n
  } n.d(e, "a", function() {
    return o
  }); var r = {
    http: "80", https: "443"
  }, o = function() {
    function t(t, e, n, r, o) {
      var s = this; this.hostOrigin = e, this.permittedParentOrigin = n, this.parentWindow = r, this.iframeAttrs = o, this.destroy = function() {
        window.removeEventListener("message", s.handleAction)
      }, this.handleAction = function(t) {
        var e = t.source, n = t.data, i = t.origin; e === s.extensionFrame.contentWindow && i === s.extensionOrigin ? s.postToParent(n) : e === s.parentWindow && null !== i.match(s.permittedParentOrigin) ? s.postToExtension(n) : console.error("Got message from unexpected source " + i + " " + JSON.stringify(n))
      }, this.extensionFrame = document.createElement("iframe"), this.extensionFrame.setAttribute("src", t), this.extensionFrame.setAttribute("frameBorder", "0"); var a = window.document, c = document.createElement("meta"); c.httpEquiv = "Content-Security-Policy", this.extensionOrigin = i(t), c.content = "frame-src 'self' " + this.extensionOrigin, a.head.appendChild(c), a.body.appendChild(this.extensionFrame), this.extensionFrame.setAttribute("style", this.iframeAttrs.style || "width: 100%; height: 100%"), this.extensionFrame.setAttribute("scrolling", this.iframeAttrs.scrolling || "yes"), this.extensionFrame.setAttribute("sandbox", this.iframeAttrs.sandbox || "allow-scripts allow-forms"), this.extensionFrame.style.width = "100%", window.addEventListener("message", this.handleAction)
    } return t.init = function(e, n, i, r, o) {
      t.instance || (t.instance = new t(e, n, i, r, o))
    }, t.prototype.postToExtension = function(t) {
      try {
        this.extensionFrame.contentWindow.postMessage(t, this.extensionOrigin)
      } catch (t) {
        console.error("Caught error in incoming action: " + t.stack)
      }
    }, t.prototype.postToParent = function(t) {
      try {
        this.parentWindow.postMessage(t, this.hostOrigin)
      } catch (t) {
        console.error("Caught error in outgoing action: " + t.stack)
      }
    }, t
  }()
}]);