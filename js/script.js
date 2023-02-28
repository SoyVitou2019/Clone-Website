/* MIT https://github.com/fabiospampinato/cash */
(function () {
  var aa = {
    class: "className",
    contenteditable: "contentEditable",
    for: "htmlFor",
    readonly: "readOnly",
    maxlength: "maxLength",
    tabindex: "tabIndex",
    colspan: "colSpan",
    rowspan: "rowSpan",
    usemap: "useMap",
  };
  function ba(a, b) {
    try {
      return a(b);
    } catch (c) {
      return b;
    }
  }
  var e = document,
    k = window,
    ca = e.documentElement,
    p = e.createElement.bind(e),
    da = p("div"),
    q = p("table"),
    ea = p("tbody"),
    ha = p("tr"),
    v = Array.isArray,
    x = Array.prototype,
    ia = x.concat,
    y = x.filter,
    ja = x.indexOf,
    ka = x.map,
    la = x.push,
    ma = x.slice,
    z = x.some,
    na = x.splice,
    oa = /^#(?:[\w-]|\\.|[^\x00-\xa0])*$/,
    pa = /^\.(?:[\w-]|\\.|[^\x00-\xa0])*$/,
    qa = /<.+>/,
    ra = /^\w+$/;
  function A(a, b) {
    var c = !!b && 11 === b.nodeType;
    return a && (c || B(b) || C(b))
      ? !c && pa.test(a)
        ? b.getElementsByClassName(a.slice(1))
        : !c && ra.test(a)
        ? b.getElementsByTagName(a)
        : b.querySelectorAll(a)
      : [];
  }
  var D = (function () {
      function a(b, c) {
        if (b) {
          if (b instanceof D) return b;
          var d = b;
          if (G(b)) {
            if (
              ((d = (c instanceof D ? c[0] : c) || e),
              (d =
                oa.test(b) && "getElementById" in d
                  ? d.getElementById(b.slice(1))
                  : qa.test(b)
                  ? sa(b)
                  : A(b, d)),
              !d)
            )
              return;
          } else if (H(b)) return this.ready(b);
          if (d.nodeType || d === k) d = [d];
          this.length = d.length;
          b = 0;
          for (c = this.length; b < c; b++) this[b] = d[b];
        }
      }
      a.prototype.init = function (b, c) {
        return new a(b, c);
      };
      return a;
    })(),
    I = D.prototype,
    J = I.init;
  J.fn = J.prototype = I;
  I.length = 0;
  I.splice = na;
  "function" === typeof Symbol && (I[Symbol.iterator] = x[Symbol.iterator]);
  I.map = function (a) {
    return J(
      ia.apply(
        [],
        ka.call(this, function (b, c) {
          return a.call(b, c, b);
        })
      )
    );
  };
  I.slice = function (a, b) {
    return J(ma.call(this, a, b));
  };
  var ta = /-([a-z])/g;
  function K(a) {
    return a.replace(ta, function (b, c) {
      return c.toUpperCase();
    });
  }
  J.guid = 1;
  function ua(a, b) {
    var c = a && (a.matches || a.webkitMatchesSelector || a.msMatchesSelector);
    return !!c && !!b && c.call(a, b);
  }
  function L(a) {
    return !!a && a === a.window;
  }
  function B(a) {
    return !!a && 9 === a.nodeType;
  }
  function C(a) {
    return !!a && 1 === a.nodeType;
  }
  function H(a) {
    return "function" === typeof a;
  }
  function G(a) {
    return "string" === typeof a;
  }
  function va(a) {
    return !isNaN(parseFloat(a)) && isFinite(a);
  }
  function wa(a) {
    if ("object" !== typeof a || null === a) return !1;
    a = Object.getPrototypeOf(a);
    return null === a || a === Object.prototype;
  }
  J.isWindow = L;
  J.isFunction = H;
  J.isArray = v;
  J.isNumeric = va;
  J.isPlainObject = wa;
  I.get = function (a) {
    if (void 0 === a) return ma.call(this);
    a = Number(a);
    return this[0 > a ? a + this.length : a];
  };
  I.eq = function (a) {
    return J(this.get(a));
  };
  I.first = function () {
    return this.eq(0);
  };
  I.last = function () {
    return this.eq(-1);
  };
  function M(a, b, c) {
    if (c) for (c = a.length; c-- && !1 !== b.call(a[c], c, a[c]); );
    else if (wa(a)) {
      var d = Object.keys(a);
      c = 0;
      for (var f = d.length; c < f; c++) {
        var g = d[c];
        if (!1 === b.call(a[g], g, a[g])) break;
      }
    } else
      for (c = 0, f = a.length; c < f && !1 !== b.call(a[c], c, a[c]); c++);
    return a;
  }
  J.each = M;
  I.each = function (a) {
    return M(this, a);
  };
  I.prop = function (a, b) {
    if (a) {
      if (G(a))
        return (
          (a = aa[a] || a),
          2 > arguments.length
            ? this[0] && this[0][a]
            : this.each(function (d, f) {
                f[a] = b;
              })
        );
      for (var c in a) this.prop(c, a[c]);
      return this;
    }
  };
  I.removeProp = function (a) {
    return this.each(function (b, c) {
      delete c[aa[a] || a];
    });
  };
  function N() {
    for (var a = [], b = 0; b < arguments.length; b++) a[b] = arguments[b];
    b = "boolean" === typeof a[0] ? a.shift() : !1;
    var c = a.shift(),
      d = a.length;
    if (!c) return {};
    if (!d) return N(b, J, c);
    for (var f = 0; f < d; f++) {
      var g = a[f],
        h;
      for (h in g)
        b && (v(g[h]) || wa(g[h]))
          ? ((c[h] && c[h].constructor === g[h].constructor) ||
              (c[h] = new g[h].constructor()),
            N(b, c[h], g[h]))
          : (c[h] = g[h]);
    }
    return c;
  }
  J.extend = N;
  I.extend = function (a) {
    return N(I, a);
  };
  function O(a) {
    return G(a)
      ? function (b, c) {
          return ua(c, a);
        }
      : H(a)
      ? a
      : a instanceof D
      ? function (b, c) {
          return a.is(c);
        }
      : a
      ? function (b, c) {
          return c === a;
        }
      : function () {
          return !1;
        };
  }
  I.filter = function (a) {
    var b = O(a);
    return J(
      y.call(this, function (c, d) {
        return b.call(c, d, c);
      })
    );
  };
  function P(a, b) {
    return b ? a.filter(b) : a;
  }
  var xa = /\S+/g;
  function Q(a) {
    return G(a) ? a.match(xa) || [] : [];
  }
  I.hasClass = function (a) {
    return (
      !!a &&
      z.call(this, function (b) {
        return C(b) && b.classList.contains(a);
      })
    );
  };
  I.removeAttr = function (a) {
    var b = Q(a);
    return this.each(function (c, d) {
      C(d) &&
        M(b, function (f, g) {
          d.removeAttribute(g);
        });
    });
  };
  I.attr = function (a, b) {
    if (a) {
      if (G(a)) {
        if (2 > arguments.length) {
          if (!this[0] || !C(this[0])) return;
          var c = this[0].getAttribute(a);
          return null === c ? void 0 : c;
        }
        return void 0 === b
          ? this
          : null === b
          ? this.removeAttr(a)
          : this.each(function (d, f) {
              C(f) && f.setAttribute(a, b);
            });
      }
      for (c in a) this.attr(c, a[c]);
      return this;
    }
  };
  I.toggleClass = function (a, b) {
    var c = Q(a),
      d = void 0 !== b;
    return this.each(function (f, g) {
      C(g) &&
        M(c, function (h, m) {
          d
            ? b
              ? g.classList.add(m)
              : g.classList.remove(m)
            : g.classList.toggle(m);
        });
    });
  };
  I.addClass = function (a) {
    return this.toggleClass(a, !0);
  };
  I.removeClass = function (a) {
    return arguments.length ? this.toggleClass(a, !1) : this.attr("class", "");
  };
  function R(a, b, c, d) {
    for (var f = [], g = H(b), h = d && O(d), m = 0, l = a.length; m < l; m++)
      if (g) {
        var u = b(a[m]);
        u.length && la.apply(f, u);
      } else
        for (u = a[m][b]; !(null == u || (d && h(-1, u))); )
          f.push(u), (u = c ? u[b] : null);
    return f;
  }
  function S(a) {
    return 1 < a.length
      ? y.call(a, function (b, c, d) {
          return ja.call(d, b) === c;
        })
      : a;
  }
  J.unique = S;
  I.add = function (a, b) {
    return J(S(this.get().concat(J(a, b).get())));
  };
  function T(a, b, c) {
    if (C(a)) {
      var d = k.getComputedStyle(a, null);
      return c ? d.getPropertyValue(b) || void 0 : d[b] || a.style[b];
    }
  }
  function V(a, b) {
    return parseInt(T(a, b), 10) || 0;
  }
  var ya = /^--/,
    za = {},
    Aa = da.style,
    Ba = ["webkit", "moz", "ms"];
  function Ca(a, b) {
    void 0 === b && (b = ya.test(a));
    if (b) return a;
    if (!za[a]) {
      b = K(a);
      var c = "" + b[0].toUpperCase() + b.slice(1);
      b = (b + " " + Ba.join(c + " ") + c).split(" ");
      M(b, function (d, f) {
        if (f in Aa) return (za[a] = f), !1;
      });
    }
    return za[a];
  }
  var Da = {
    animationIterationCount: !0,
    columnCount: !0,
    flexGrow: !0,
    flexShrink: !0,
    fontWeight: !0,
    gridArea: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnStart: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowStart: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    widows: !0,
    zIndex: !0,
  };
  function Ea(a, b, c) {
    void 0 === c && (c = ya.test(a));
    return c || Da[a] || !va(b) ? b : b + "px";
  }
  I.css = function (a, b) {
    if (G(a)) {
      var c = ya.test(a);
      a = Ca(a, c);
      if (2 > arguments.length) return this[0] && T(this[0], a, c);
      if (!a) return this;
      b = Ea(a, b, c);
      return this.each(function (f, g) {
        C(g) && (c ? g.style.setProperty(a, b) : (g.style[a] = b));
      });
    }
    for (var d in a) this.css(d, a[d]);
    return this;
  };
  var Fa = /^\s+|\s+$/;
  function Ga(a, b) {
    a = a.dataset[b] || a.dataset[K(b)];
    return Fa.test(a) ? a : ba(JSON.parse, a);
  }
  I.data = function (a, b) {
    if (!a) {
      if (!this[0]) return;
      var c = {},
        d;
      for (d in this[0].dataset) c[d] = Ga(this[0], d);
      return c;
    }
    if (G(a))
      return 2 > arguments.length
        ? this[0] && Ga(this[0], a)
        : void 0 === b
        ? this
        : this.each(function (f, g) {
            f = b;
            f = ba(JSON.stringify, f);
            g.dataset[K(a)] = f;
          });
    for (d in a) this.data(d, a[d]);
    return this;
  };
  function Ha(a, b) {
    var c = a.documentElement;
    return Math.max(
      a.body["scroll" + b],
      c["scroll" + b],
      a.body["offset" + b],
      c["offset" + b],
      c["client" + b]
    );
  }
  function Ia(a, b) {
    return (
      V(a, "border" + (b ? "Left" : "Top") + "Width") +
      V(a, "padding" + (b ? "Left" : "Top")) +
      V(a, "padding" + (b ? "Right" : "Bottom")) +
      V(a, "border" + (b ? "Right" : "Bottom") + "Width")
    );
  }
  M([!0, !1], function (a, b) {
    M(["Width", "Height"], function (c, d) {
      I[(b ? "outer" : "inner") + d] = function (f) {
        if (this[0])
          return L(this[0])
            ? b
              ? this[0]["inner" + d]
              : this[0].document.documentElement["client" + d]
            : B(this[0])
            ? Ha(this[0], d)
            : this[0][(b ? "offset" : "client") + d] +
              (f && b
                ? V(this[0], "margin" + (c ? "Top" : "Left")) +
                  V(this[0], "margin" + (c ? "Bottom" : "Right"))
                : 0);
      };
    });
  });
  M(["Width", "Height"], function (a, b) {
    var c = b.toLowerCase();
    I[c] = function (d) {
      if (!this[0]) return void 0 === d ? void 0 : this;
      if (!arguments.length)
        return L(this[0])
          ? this[0].document.documentElement["client" + b]
          : B(this[0])
          ? Ha(this[0], b)
          : this[0].getBoundingClientRect()[c] - Ia(this[0], !a);
      var f = parseInt(d, 10);
      return this.each(function (g, h) {
        C(h) &&
          ((g = T(h, "boxSizing")),
          (h.style[c] = Ea(c, f + ("border-box" === g ? Ia(h, !a) : 0))));
      });
    };
  });
  var Ja = {};
  I.toggle = function (a) {
    return this.each(function (b, c) {
      if (C(c))
        if (void 0 === a ? "none" === T(c, "display") : a) {
          if (((c.style.display = c.___cd || ""), "none" === T(c, "display"))) {
            b = c.style;
            c = c.tagName;
            if (Ja[c]) c = Ja[c];
            else {
              var d = p(c);
              e.body.insertBefore(d, null);
              var f = T(d, "display");
              e.body.removeChild(d);
              c = Ja[c] = "none" !== f ? f : "block";
            }
            b.display = c;
          }
        } else (c.___cd = T(c, "display")), (c.style.display = "none");
    });
  };
  I.hide = function () {
    return this.toggle(!1);
  };
  I.show = function () {
    return this.toggle(!0);
  };
  function Ka(a, b) {
    return (
      !b ||
      !z.call(b, function (c) {
        return 0 > a.indexOf(c);
      })
    );
  }
  var W = {
      focus: "focusin",
      blur: "focusout",
    },
    X = {
      mouseenter: "mouseover",
      mouseleave: "mouseout",
    },
    La = /^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;
  function Ma(a, b, c, d, f) {
    var g = (a.___ce = a.___ce || {});
    g[b] = g[b] || [];
    g[b].push([c, d, f]);
    a.addEventListener(b, f);
  }
  function Na(a) {
    a = a.split(".");
    return [a[0], a.slice(1).sort()];
  }
  function Y(a, b, c, d, f) {
    var g = (a.___ce = a.___ce || {});
    if (b)
      g[b] &&
        (g[b] = g[b].filter(function (h) {
          var m = h[0],
            l = h[1];
          h = h[2];
          if ((f && h.guid !== f.guid) || !Ka(m, c) || (d && d !== l))
            return !0;
          a.removeEventListener(b, h);
        }));
    else for (b in g) Y(a, b, c, d, f);
  }
  I.off = function (a, b, c) {
    var d = this;
    if (void 0 === a)
      this.each(function (g, h) {
        (C(h) || B(h) || L(h)) && Y(h);
      });
    else if (G(a))
      H(b) && ((c = b), (b = "")),
        M(Q(a), function (g, h) {
          g = Na(h);
          h = g[0];
          var m = g[1],
            l = X[h] || W[h] || h;
          d.each(function (u, w) {
            (C(w) || B(w) || L(w)) && Y(w, l, m, b, c);
          });
        });
    else for (var f in a) this.off(f, a[f]);
    return this;
  };
  I.on = function (a, b, c, d, f) {
    var g = this;
    if (!G(a)) {
      for (var h in a) this.on(h, b, c, a[h], f);
      return this;
    }
    G(b) ||
      (void 0 !== b && null !== b && (void 0 !== c && (d = c), (c = b)),
      (b = ""));
    H(d) || ((d = c), (c = void 0));
    if (!d) return this;
    M(Q(a), function (m, l) {
      m = Na(l);
      l = m[0];
      var u = m[1],
        w = X[l] || W[l] || l,
        U = l in X,
        E = l in W;
      w &&
        g.each(function (t, n) {
          if (C(n) || B(n) || L(n))
            (t = function Ra(r) {
              if (r.target["___i" + r.type])
                return r.stopImmediatePropagation();
              if (!r.namespace || Ka(u, r.namespace.split(".")))
                if (
                  b ||
                  !(
                    (E && (r.target !== n || r.___ot === w)) ||
                    (U && r.relatedTarget && n.contains(r.relatedTarget))
                  )
                ) {
                  var fa = n;
                  if (b) {
                    for (var F = r.target; !ua(F, b); ) {
                      if (F === n) return;
                      F = F.parentNode;
                      if (!F) return;
                    }
                    fa = F;
                  }
                  Object.defineProperty(r, "currentTarget", {
                    configurable: !0,
                    get: function () {
                      return fa;
                    },
                  });
                  Object.defineProperty(r, "delegateTarget", {
                    configurable: !0,
                    get: function () {
                      return n;
                    },
                  });
                  Object.defineProperty(r, "data", {
                    configurable: !0,
                    get: function () {
                      return c;
                    },
                  });
                  F = d.call(fa, r, r.___td);
                  f && Y(n, w, u, b, Ra);
                  !1 === F && (r.preventDefault(), r.stopPropagation());
                }
            }),
              (t.guid = d.guid = d.guid || J.guid++),
              Ma(n, w, u, b, t);
        });
    });
    return this;
  };
  I.one = function (a, b, c, d) {
    return this.on(a, b, c, d, !0);
  };
  I.ready = function (a) {
    function b() {
      return setTimeout(a, 0, J);
    }
    "loading" !== e.readyState
      ? b()
      : e.addEventListener("DOMContentLoaded", b);
    return this;
  };
  I.trigger = function (a, b) {
    if (G(a)) {
      var c = Na(a),
        d = c[0];
      c = c[1];
      var f = X[d] || W[d] || d;
      if (!f) return this;
      var g = La.test(f) ? "MouseEvents" : "HTMLEvents";
      a = e.createEvent(g);
      a.initEvent(f, !0, !0);
      a.namespace = c.join(".");
      a.___ot = d;
    }
    a.___td = b;
    var h = a.___ot in W;
    return this.each(function (m, l) {
      h &&
        H(l[a.___ot]) &&
        ((l["___i" + a.type] = !0), l[a.___ot](), (l["___i" + a.type] = !1));
      l.dispatchEvent(a);
    });
  };
  function Oa(a) {
    return a.multiple && a.options
      ? R(
          y.call(a.options, function (b) {
            return b.selected && !b.disabled && !b.parentNode.disabled;
          }),
          "value"
        )
      : a.value || "";
  }
  var Pa = /%20/g,
    Qa = /\r?\n/g,
    Sa = /file|reset|submit|button|image/i,
    Ta = /radio|checkbox/i;
  I.serialize = function () {
    var a = "";
    this.each(function (b, c) {
      M(c.elements || [c], function (d, f) {
        f.disabled ||
          !f.name ||
          "FIELDSET" === f.tagName ||
          Sa.test(f.type) ||
          (Ta.test(f.type) && !f.checked) ||
          ((d = Oa(f)),
          void 0 !== d &&
            ((d = v(d) ? d : [d]),
            M(d, function (g, h) {
              g = a;
              h =
                "&" +
                encodeURIComponent(f.name) +
                "=" +
                encodeURIComponent(h.replace(Qa, "\r\n")).replace(Pa, "+");
              a = g + h;
            })));
      });
    });
    return a.slice(1);
  };
  I.val = function (a) {
    return arguments.length
      ? this.each(function (b, c) {
          if ((b = c.multiple && c.options) || Ta.test(c.type)) {
            var d = v(a) ? ka.call(a, String) : null === a ? [] : [String(a)];
            b
              ? M(
                  c.options,
                  function (f, g) {
                    g.selected = 0 <= d.indexOf(g.value);
                  },
                  !0
                )
              : (c.checked = 0 <= d.indexOf(c.value));
          } else c.value = void 0 === a || null === a ? "" : a;
        })
      : this[0] && Oa(this[0]);
  };
  I.clone = function () {
    return this.map(function (a, b) {
      return b.cloneNode(!0);
    });
  };
  I.detach = function (a) {
    P(this, a).each(function (b, c) {
      c.parentNode && c.parentNode.removeChild(c);
    });
    return this;
  };
  var Ua = /^\s*<(\w+)[^>]*>/,
    Va = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
    Wa = {
      "*": da,
      tr: ea,
      td: ha,
      th: ha,
      thead: q,
      tbody: q,
      tfoot: q,
    };
  function sa(a) {
    if (!G(a)) return [];
    if (Va.test(a)) return [p(RegExp.$1)];
    var b = Ua.test(a) && RegExp.$1;
    b = Wa[b] || Wa["*"];
    b.innerHTML = a;
    return J(b.childNodes).detach().get();
  }
  J.parseHTML = sa;
  I.empty = function () {
    return this.each(function (a, b) {
      for (; b.firstChild; ) b.removeChild(b.firstChild);
    });
  };
  I.html = function (a) {
    return arguments.length
      ? void 0 === a
        ? this
        : this.each(function (b, c) {
            C(c) && (c.innerHTML = a);
          })
      : this[0] && this[0].innerHTML;
  };
  I.remove = function (a) {
    P(this, a).detach().off();
    return this;
  };
  I.text = function (a) {
    return void 0 === a
      ? this[0]
        ? this[0].textContent
        : ""
      : this.each(function (b, c) {
          C(c) && (c.textContent = a);
        });
  };
  I.unwrap = function () {
    this.parent().each(function (a, b) {
      "BODY" !== b.tagName && ((a = J(b)), a.replaceWith(a.children()));
    });
    return this;
  };
  I.offset = function () {
    var a = this[0];
    if (a)
      return (
        (a = a.getBoundingClientRect()),
        {
          top: a.top + k.pageYOffset,
          left: a.left + k.pageXOffset,
        }
      );
  };
  I.offsetParent = function () {
    return this.map(function (a, b) {
      for (a = b.offsetParent; a && "static" === T(a, "position"); )
        a = a.offsetParent;
      return a || ca;
    });
  };
  I.position = function () {
    var a = this[0];
    if (a) {
      var b = "fixed" === T(a, "position"),
        c = b ? a.getBoundingClientRect() : this.offset();
      if (!b) {
        var d = a.ownerDocument;
        for (
          b = a.offsetParent || d.documentElement;
          (b === d.body || b === d.documentElement) &&
          "static" === T(b, "position");

        )
          b = b.parentNode;
        b !== a &&
          C(b) &&
          ((d = J(b).offset()),
          (c.top -= d.top + V(b, "borderTopWidth")),
          (c.left -= d.left + V(b, "borderLeftWidth")));
      }
      return {
        top: c.top - V(a, "marginTop"),
        left: c.left - V(a, "marginLeft"),
      };
    }
  };
  I.children = function (a) {
    return P(
      J(
        S(
          R(this, function (b) {
            return b.children;
          })
        )
      ),
      a
    );
  };
  I.contents = function () {
    return J(
      S(
        R(this, function (a) {
          return "IFRAME" === a.tagName
            ? [a.contentDocument]
            : "TEMPLATE" === a.tagName
            ? a.content.childNodes
            : a.childNodes;
        })
      )
    );
  };
  I.find = function (a) {
    return J(
      S(
        R(this, function (b) {
          return A(a, b);
        })
      )
    );
  };
  var Xa = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    Ya = /^$|^module$|\/(java|ecma)script/i,
    Za = ["type", "src", "nonce", "noModule"];
  function $a(a, b) {
    a = J(a);
    a.filter("script")
      .add(a.find("script"))
      .each(function (c, d) {
        if (Ya.test(d.type) && ca.contains(d)) {
          var f = p("script");
          f.text = d.textContent.replace(Xa, "");
          M(Za, function (g, h) {
            d[h] && (f[h] = d[h]);
          });
          b.head.insertBefore(f, null);
          b.head.removeChild(f);
        }
      });
  }
  function Z(a, b, c, d, f, g, h, m) {
    M(
      a,
      function (l, u) {
        M(
          J(u),
          function (w, U) {
            M(
              J(b),
              function (E, t) {
                var n = c ? t : U;
                E = c ? w : E;
                t = c ? U : t;
                n = E ? n.cloneNode(!0) : n;
                E = !E;
                f
                  ? t.insertBefore(n, d ? t.firstChild : null)
                  : "HTML" === t.nodeName
                  ? t.parentNode.replaceChild(n, t)
                  : t.parentNode.insertBefore(n, d ? t : t.nextSibling);
                E && $a(n, t.ownerDocument);
              },
              m
            );
          },
          h
        );
      },
      g
    );
    return b;
  }
  I.after = function () {
    return Z(arguments, this, !1, !1, !1, !0, !0);
  };
  I.append = function () {
    return Z(arguments, this, !1, !1, !0);
  };
  I.appendTo = function (a) {
    return Z(arguments, this, !0, !1, !0);
  };
  I.before = function () {
    return Z(arguments, this, !1, !0);
  };
  I.insertAfter = function (a) {
    return Z(arguments, this, !0, !1, !1, !1, !1, !0);
  };
  I.insertBefore = function (a) {
    return Z(arguments, this, !0, !0);
  };
  I.prepend = function () {
    return Z(arguments, this, !1, !0, !0, !0, !0);
  };
  I.prependTo = function (a) {
    return Z(arguments, this, !0, !0, !0, !1, !1, !0);
  };
  I.replaceWith = function (a) {
    return this.before(a).remove();
  };
  I.replaceAll = function (a) {
    J(a).replaceWith(this);
    return this;
  };
  I.wrapAll = function (a) {
    a = J(a);
    for (var b = a[0]; b.children.length; ) b = b.firstElementChild;
    this.first().before(a);
    return this.appendTo(b);
  };
  I.wrap = function (a) {
    return this.each(function (b, c) {
      var d = J(a)[0];
      J(c).wrapAll(b ? d.cloneNode(!0) : d);
    });
  };
  I.wrapInner = function (a) {
    return this.each(function (b, c) {
      b = J(c);
      c = b.contents();
      c.length ? c.wrapAll(a) : b.append(a);
    });
  };
  I.has = function (a) {
    var b = G(a)
      ? function (c, d) {
          return A(a, d).length;
        }
      : function (c, d) {
          return d.contains(a);
        };
    return this.filter(b);
  };
  I.is = function (a) {
    var b = O(a);
    return z.call(this, function (c, d) {
      return b.call(c, d, c);
    });
  };
  I.next = function (a, b, c) {
    return P(J(S(R(this, "nextElementSibling", b, c))), a);
  };
  I.nextAll = function (a) {
    return this.next(a, !0);
  };
  I.nextUntil = function (a, b) {
    return this.next(b, !0, a);
  };
  I.not = function (a) {
    var b = O(a);
    return this.filter(function (c, d) {
      return (!G(a) || C(d)) && !b.call(d, c, d);
    });
  };
  I.parent = function (a) {
    return P(J(S(R(this, "parentNode"))), a);
  };
  I.index = function (a) {
    var b = a ? J(a)[0] : this[0];
    a = a ? this : J(b).parent().children();
    return ja.call(a, b);
  };
  I.closest = function (a) {
    var b = this.filter(a);
    if (b.length) return b;
    var c = this.parent();
    return c.length ? c.closest(a) : b;
  };
  I.parents = function (a, b) {
    return P(J(S(R(this, "parentElement", !0, b))), a);
  };
  I.parentsUntil = function (a, b) {
    return this.parents(b, a);
  };
  I.prev = function (a, b, c) {
    return P(J(S(R(this, "previousElementSibling", b, c))), a);
  };
  I.prevAll = function (a) {
    return this.prev(a, !0);
  };
  I.prevUntil = function (a, b) {
    return this.prev(b, !0, a);
  };
  I.siblings = function (a) {
    return P(
      J(
        S(
          R(this, function (b) {
            return J(b).parent().children().not(b);
          })
        )
      ),
      a
    );
  };
  "undefined" !== typeof exports ? (module.exports = J) : (k.cash = k.$ = J);
})();
/* Pretty Print Library Starts Here */
!(function () {
  /*

 Copyright (C) 2013 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 Copyright (C) 2006 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
  (function () {
    function aa(g) {
      function r() {
        try {
          L.doScroll("left");
        } catch (ba) {
          k.setTimeout(r, 50);
          return;
        }
        x("poll");
      }
      function x(r) {
        if ("readystatechange" != r.type || "complete" == z.readyState)
          ("load" == r.type ? k : z)[B](n + r.type, x, !1),
            !l && (l = !0) && g.call(k, r.type || r);
      }
      var X = z.addEventListener,
        l = !1,
        E = !0,
        v = X ? "addEventListener" : "attachEvent",
        B = X ? "removeEventListener" : "detachEvent",
        n = X ? "" : "on";
      if ("complete" == z.readyState) g.call(k, "lazy");
      else {
        if (z.createEventObject && L.doScroll) {
          try {
            E = !k.frameElement;
          } catch (ba) {}
          E && r();
        }
        z[v](n + "DOMContentLoaded", x, !1);
        z[v](n + "readystatechange", x, !1);
        k[v](n + "load", x, !1);
      }
    }
    function T() {
      U &&
        aa(function () {
          var g = M.length;
          ca(
            g
              ? function () {
                  for (var r = 0; r < g; ++r)
                    (function (g) {
                      k.setTimeout(function () {
                        k.exports[M[g]].apply(k, arguments);
                      }, 0);
                    })(r);
                }
              : void 0
          );
        });
    }
    for (
      var k = window,
        z = document,
        L = z.documentElement,
        N = z.head || z.getElementsByTagName("head")[0] || L,
        B = "",
        F = z.getElementsByTagName("script"),
        l = F.length;
      0 <= --l;

    ) {
      var O = F[l],
        Y = O.src.match(/^[^?#]*\/run_prettify\.js(\?[^#]*)?(?:#.*)?$/);
      if (Y) {
        B = Y[1] || "";
        O.parentNode.removeChild(O);
        break;
      }
    }
    var U = !0,
      H = [],
      P = [],
      M = [];
    B.replace(/[?&]([^&=]+)=([^&]+)/g, function (g, r, x) {
      x = decodeURIComponent(x);
      r = decodeURIComponent(r);
      "autorun" == r
        ? (U = !/^[0fn]/i.test(x))
        : "lang" == r
        ? H.push(x)
        : "skin" == r
        ? P.push(x)
        : "callback" == r && M.push(x);
    });
    l = 0;
    for (B = H.length; l < B; ++l)
      (function () {
        var g = z.createElement("script");
        g.onload =
          g.onerror =
          g.onreadystatechange =
            function () {
              !g ||
                (g.readyState && !/loaded|complete/.test(g.readyState)) ||
                ((g.onerror = g.onload = g.onreadystatechange = null),
                --S,
                S || k.setTimeout(T, 0),
                g.parentNode && g.parentNode.removeChild(g),
                (g = null));
            };
        g.type = "text/javascript";
        g.src =
          "https://cdn.rawgit.com/google/code-prettify/master/loader/lang-" +
          encodeURIComponent(H[l]) +
          ".js";
        N.insertBefore(g, N.firstChild);
      })(H[l]);
    for (var S = H.length, F = [], l = 0, B = P.length; l < B; ++l)
      F.push(
        "https://cdn.rawgit.com/google/code-prettify/master/loader/skins/" +
          encodeURIComponent(P[l]) +
          ".css"
      );
    F.push(
      "https://cdn.rawgit.com/google/code-prettify/master/loader/prettify.css"
    );
    (function (g) {
      function r(l) {
        if (l !== x) {
          var k = z.createElement("link");
          k.rel = "stylesheet";
          k.type = "text/css";
          l + 1 < x &&
            (k.error = k.onerror =
              function () {
                r(l + 1);
              });
          k.href = g[l];
          N.appendChild(k);
        }
      }
      var x = g.length;
      r(0);
    })(F);
    var ca = (function () {
      "undefined" !== typeof window && (window.PR_SHOULD_USE_CONTINUATION = !0);
      var g;
      (function () {
        function r(a) {
          function d(e) {
            var a = e.charCodeAt(0);
            if (92 !== a) return a;
            var c = e.charAt(1);
            return (a = k[c])
              ? a
              : "0" <= c && "7" >= c
              ? parseInt(e.substring(1), 8)
              : "u" === c || "x" === c
              ? parseInt(e.substring(2), 16)
              : e.charCodeAt(1);
          }
          function f(e) {
            if (32 > e) return (16 > e ? "\\x0" : "\\x") + e.toString(16);
            e = String.fromCharCode(e);
            return "\\" === e || "-" === e || "]" === e || "^" === e
              ? "\\" + e
              : e;
          }
          function c(e) {
            var c = e
              .substring(1, e.length - 1)
              .match(
                RegExp(
                  "\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]",
                  "g"
                )
              );
            e = [];
            var a = "^" === c[0],
              b = ["["];
            a && b.push("^");
            for (var a = a ? 1 : 0, h = c.length; a < h; ++a) {
              var m = c[a];
              if (/\\[bdsw]/i.test(m)) b.push(m);
              else {
                var m = d(m),
                  p;
                a + 2 < h && "-" === c[a + 1]
                  ? ((p = d(c[a + 2])), (a += 2))
                  : (p = m);
                e.push([m, p]);
                65 > p ||
                  122 < m ||
                  (65 > p ||
                    90 < m ||
                    e.push([Math.max(65, m) | 32, Math.min(p, 90) | 32]),
                  97 > p ||
                    122 < m ||
                    e.push([Math.max(97, m) & -33, Math.min(p, 122) & -33]));
              }
            }
            e.sort(function (e, a) {
              return e[0] - a[0] || a[1] - e[1];
            });
            c = [];
            h = [];
            for (a = 0; a < e.length; ++a)
              (m = e[a]),
                m[0] <= h[1] + 1
                  ? (h[1] = Math.max(h[1], m[1]))
                  : c.push((h = m));
            for (a = 0; a < c.length; ++a)
              (m = c[a]),
                b.push(f(m[0])),
                m[1] > m[0] &&
                  (m[1] + 1 > m[0] && b.push("-"), b.push(f(m[1])));
            b.push("]");
            return b.join("");
          }
          function g(e) {
            for (
              var a = e.source.match(
                  RegExp(
                    "(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)",
                    "g"
                  )
                ),
                b = a.length,
                d = [],
                h = 0,
                m = 0;
              h < b;
              ++h
            ) {
              var p = a[h];
              "(" === p
                ? ++m
                : "\\" === p.charAt(0) &&
                  (p = +p.substring(1)) &&
                  (p <= m ? (d[p] = -1) : (a[h] = f(p)));
            }
            for (h = 1; h < d.length; ++h) -1 === d[h] && (d[h] = ++r);
            for (m = h = 0; h < b; ++h)
              (p = a[h]),
                "(" === p
                  ? (++m, d[m] || (a[h] = "(?:"))
                  : "\\" === p.charAt(0) &&
                    (p = +p.substring(1)) &&
                    p <= m &&
                    (a[h] = "\\" + d[p]);
            for (h = 0; h < b; ++h)
              "^" === a[h] && "^" !== a[h + 1] && (a[h] = "");
            if (e.ignoreCase && A)
              for (h = 0; h < b; ++h)
                (p = a[h]),
                  (e = p.charAt(0)),
                  2 <= p.length && "[" === e
                    ? (a[h] = c(p))
                    : "\\" !== e &&
                      (a[h] = p.replace(/[a-zA-Z]/g, function (a) {
                        a = a.charCodeAt(0);
                        return "[" + String.fromCharCode(a & -33, a | 32) + "]";
                      }));
            return a.join("");
          }
          for (var r = 0, A = !1, q = !1, I = 0, b = a.length; I < b; ++I) {
            var t = a[I];
            if (t.ignoreCase) q = !0;
            else if (
              /[a-z]/i.test(
                t.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi, "")
              )
            ) {
              A = !0;
              q = !1;
              break;
            }
          }
          for (
            var k = {
                b: 8,
                t: 9,
                n: 10,
                v: 11,
                f: 12,
                r: 13,
              },
              u = [],
              I = 0,
              b = a.length;
            I < b;
            ++I
          ) {
            t = a[I];
            if (t.global || t.multiline) throw Error("" + t);
            u.push("(?:" + g(t) + ")");
          }
          return new RegExp(u.join("|"), q ? "gi" : "g");
        }
        function l(a, d) {
          function f(a) {
            var b = a.nodeType;
            if (1 == b) {
              if (!c.test(a.className)) {
                for (b = a.firstChild; b; b = b.nextSibling) f(b);
                b = a.nodeName.toLowerCase();
                if ("br" === b || "li" === b)
                  (g[q] = "\n"), (A[q << 1] = r++), (A[(q++ << 1) | 1] = a);
              }
            } else if (3 == b || 4 == b)
              (b = a.nodeValue),
                b.length &&
                  ((b = d
                    ? b.replace(/\r\n?/g, "\n")
                    : b.replace(/[ \t\r\n]+/g, " ")),
                  (g[q] = b),
                  (A[q << 1] = r),
                  (r += b.length),
                  (A[(q++ << 1) | 1] = a));
          }
          var c = /(?:^|\s)nocode(?:\s|$)/,
            g = [],
            r = 0,
            A = [],
            q = 0;
          f(a);
          return {
            a: g.join("").replace(/\n$/, ""),
            c: A,
          };
        }
        function k(a, d, f, c, g) {
          f &&
            ((a = {
              h: a,
              l: 1,
              j: null,
              m: null,
              a: f,
              c: null,
              i: d,
              g: null,
            }),
            c(a),
            g.push.apply(g, a.g));
        }
        function z(a) {
          for (var d = void 0, f = a.firstChild; f; f = f.nextSibling)
            var c = f.nodeType,
              d =
                1 === c
                  ? d
                    ? a
                    : f
                  : 3 === c
                  ? S.test(f.nodeValue)
                    ? a
                    : d
                  : d;
          return d === a ? void 0 : d;
        }
        function E(a, d) {
          function f(a) {
            for (
              var q = a.i,
                r = a.h,
                b = [q, "pln"],
                t = 0,
                A = a.a.match(g) || [],
                u = {},
                e = 0,
                l = A.length;
              e < l;
              ++e
            ) {
              var D = A[e],
                w = u[D],
                h = void 0,
                m;
              if ("string" === typeof w) m = !1;
              else {
                var p = c[D.charAt(0)];
                if (p) (h = D.match(p[1])), (w = p[0]);
                else {
                  for (m = 0; m < n; ++m)
                    if (((p = d[m]), (h = D.match(p[1])))) {
                      w = p[0];
                      break;
                    }
                  h || (w = "pln");
                }
                !(m = 5 <= w.length && "lang-" === w.substring(0, 5)) ||
                  (h && "string" === typeof h[1]) ||
                  ((m = !1), (w = "src"));
                m || (u[D] = w);
              }
              p = t;
              t += D.length;
              if (m) {
                m = h[1];
                var C = D.indexOf(m),
                  G = C + m.length;
                h[2] && ((G = D.length - h[2].length), (C = G - m.length));
                w = w.substring(5);
                k(r, q + p, D.substring(0, C), f, b);
                k(r, q + p + C, m, F(w, m), b);
                k(r, q + p + G, D.substring(G), f, b);
              } else b.push(q + p, w);
            }
            a.g = b;
          }
          var c = {},
            g;
          (function () {
            for (
              var f = a.concat(d), q = [], k = {}, b = 0, t = f.length;
              b < t;
              ++b
            ) {
              var n = f[b],
                u = n[3];
              if (u) for (var e = u.length; 0 <= --e; ) c[u.charAt(e)] = n;
              n = n[1];
              u = "" + n;
              k.hasOwnProperty(u) || (q.push(n), (k[u] = null));
            }
            q.push(/[\0-\uffff]/);
            g = r(q);
          })();
          var n = d.length;
          return f;
        }
        function v(a) {
          var d = [],
            f = [];
          a.tripleQuotedStrings
            ? d.push([
                "str",
                /^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,
                null,
                "'\"",
              ])
            : a.multiLineStrings
            ? d.push([
                "str",
                /^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,
                null,
                "'\"`",
              ])
            : d.push([
                "str",
                /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,
                null,
                "\"'",
              ]);
          a.verbatimStrings &&
            f.push(["str", /^@\"(?:[^\"]|\"\")*(?:\"|$)/, null]);
          var c = a.hashComments;
          c &&
            (a.cStyleComments
              ? (1 < c
                  ? d.push([
                      "com",
                      /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,
                      null,
                      "#",
                    ])
                  : d.push([
                      "com",
                      /^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/,
                      null,
                      "#",
                    ]),
                f.push([
                  "str",
                  /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/,
                  null,
                ]))
              : d.push(["com", /^#[^\r\n]*/, null, "#"]));
          a.cStyleComments &&
            (f.push(["com", /^\/\/[^\r\n]*/, null]),
            f.push(["com", /^\/\*[\s\S]*?(?:\*\/|$)/, null]));
          if ((c = a.regexLiterals)) {
            var g = (c = 1 < c ? "" : "\n\r") ? "." : "[\\S\\s]";
            f.push([
              "lang-regex",
              RegExp(
                "^(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*(" +
                  ("/(?=[^/*" +
                    c +
                    "])(?:[^/\\x5B\\x5C" +
                    c +
                    "]|\\x5C" +
                    g +
                    "|\\x5B(?:[^\\x5C\\x5D" +
                    c +
                    "]|\\x5C" +
                    g +
                    ")*(?:\\x5D|$))+/") +
                  ")"
              ),
            ]);
          }
          (c = a.types) && f.push(["typ", c]);
          c = ("" + a.keywords).replace(/^ | $/g, "");
          c.length &&
            f.push([
              "kwd",
              new RegExp("^(?:" + c.replace(/[\s,]+/g, "|") + ")\\b"),
              null,
            ]);
          d.push(["pln", /^\s+/, null, " \r\n\t\u00a0"]);
          c = "^.[^\\s\\w.$@'\"`/\\\\]*";
          a.regexLiterals && (c += "(?!s*/)");
          f.push(
            ["lit", /^@[a-z_$][a-z_$@0-9]*/i, null],
            ["typ", /^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/, null],
            ["pln", /^[a-z_$][a-z_$@0-9]*/i, null],
            [
              "lit",
              /^(?:0x[a-f0-9]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+\-]?\d+)?)[a-z]*/i,
              null,
              "0123456789",
            ],
            ["pln", /^\\[\s\S]?/, null],
            ["pun", new RegExp(c), null]
          );
          return E(d, f);
        }
        function B(a, d, f) {
          function c(a) {
            var b = a.nodeType;
            if (1 == b && !r.test(a.className))
              if ("br" === a.nodeName.toLowerCase())
                g(a), a.parentNode && a.parentNode.removeChild(a);
              else for (a = a.firstChild; a; a = a.nextSibling) c(a);
            else if ((3 == b || 4 == b) && f) {
              var e = a.nodeValue,
                d = e.match(n);
              d &&
                ((b = e.substring(0, d.index)),
                (a.nodeValue = b),
                (e = e.substring(d.index + d[0].length)) &&
                  a.parentNode.insertBefore(q.createTextNode(e), a.nextSibling),
                g(a),
                b || a.parentNode.removeChild(a));
            }
          }
          function g(a) {
            function c(a, b) {
              var e = b ? a.cloneNode(!1) : a,
                p = a.parentNode;
              if (p) {
                var p = c(p, 1),
                  d = a.nextSibling;
                p.appendChild(e);
                for (var f = d; f; f = d) (d = f.nextSibling), p.appendChild(f);
              }
              return e;
            }
            for (; !a.nextSibling; ) if (((a = a.parentNode), !a)) return;
            a = c(a.nextSibling, 0);
            for (var e; (e = a.parentNode) && 1 === e.nodeType; ) a = e;
            b.push(a);
          }
          for (
            var r = /(?:^|\s)nocode(?:\s|$)/,
              n = /\r\n?|\n/,
              q = a.ownerDocument,
              k = q.createElement("li");
            a.firstChild;

          )
            k.appendChild(a.firstChild);
          for (var b = [k], t = 0; t < b.length; ++t) c(b[t]);
          d === (d | 0) && b[0].setAttribute("value", d);
          var l = q.createElement("ol");
          l.className = "linenums";
          d = Math.max(0, (d - 1) | 0) || 0;
          for (var t = 0, u = b.length; t < u; ++t)
            (k = b[t]),
              (k.className = "L" + ((t + d) % 10)),
              k.firstChild || k.appendChild(q.createTextNode("\u00a0")),
              l.appendChild(k);
          a.appendChild(l);
        }
        function n(a, d) {
          for (var f = d.length; 0 <= --f; ) {
            var c = d[f];
            V.hasOwnProperty(c)
              ? Q.console &&
                console.warn("cannot override language handler %s", c)
              : (V[c] = a);
          }
        }
        function F(a, d) {
          (a && V.hasOwnProperty(a)) ||
            (a = /^\s*</.test(d) ? "default-markup" : "default-code");
          return V[a];
        }
        function H(a) {
          var d = a.j;
          try {
            var f = l(a.h, a.l),
              c = f.a;
            a.a = c;
            a.c = f.c;
            a.i = 0;
            F(d, c)(a);
            var g = /\bMSIE\s(\d+)/.exec(navigator.userAgent),
              g = g && 8 >= +g[1],
              d = /\n/g,
              r = a.a,
              k = r.length,
              f = 0,
              q = a.c,
              n = q.length,
              c = 0,
              b = a.g,
              t = b.length,
              v = 0;
            b[t] = k;
            var u, e;
            for (e = u = 0; e < t; )
              b[e] !== b[e + 2]
                ? ((b[u++] = b[e++]), (b[u++] = b[e++]))
                : (e += 2);
            t = u;
            for (e = u = 0; e < t; ) {
              for (
                var x = b[e], z = b[e + 1], w = e + 2;
                w + 2 <= t && b[w + 1] === z;

              )
                w += 2;
              b[u++] = x;
              b[u++] = z;
              e = w;
            }
            b.length = u;
            var h = a.h;
            a = "";
            h && ((a = h.style.display), (h.style.display = "none"));
            try {
              for (; c < n; ) {
                var m = q[c + 2] || k,
                  p = b[v + 2] || k,
                  w = Math.min(m, p),
                  C = q[c + 1],
                  G;
                if (1 !== C.nodeType && (G = r.substring(f, w))) {
                  g && (G = G.replace(d, "\r"));
                  C.nodeValue = G;
                  var Z = C.ownerDocument,
                    W = Z.createElement("span");
                  W.className = b[v + 1];
                  var B = C.parentNode;
                  B.replaceChild(W, C);
                  W.appendChild(C);
                  f < m &&
                    ((q[c + 1] = C = Z.createTextNode(r.substring(w, m))),
                    B.insertBefore(C, W.nextSibling));
                }
                f = w;
                f >= m && (c += 2);
                f >= p && (v += 2);
              }
            } finally {
              h && (h.style.display = a);
            }
          } catch (y) {
            Q.console && console.log((y && y.stack) || y);
          }
        }
        var Q = "undefined" !== typeof window ? window : {},
          J = ["break,continue,do,else,for,if,return,while"],
          K = [
            [
              J,
              "auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,restrict,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile",
            ],
            "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof",
          ],
          R = [
            K,
            "alignas,alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,noexcept,noreturn,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where",
          ],
          L = [
            K,
            "abstract,assert,boolean,byte,extends,finally,final,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient",
          ],
          M = [
            K,
            "abstract,add,alias,as,ascending,async,await,base,bool,by,byte,checked,decimal,delegate,descending,dynamic,event,finally,fixed,foreach,from,get,global,group,implicit,in,interface,internal,into,is,join,let,lock,null,object,out,override,orderby,params,partial,readonly,ref,remove,sbyte,sealed,select,set,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,value,var,virtual,where,yield",
          ],
          K = [
            K,
            "abstract,async,await,constructor,debugger,enum,eval,export,from,function,get,import,implements,instanceof,interface,let,null,of,set,undefined,var,with,yield,Infinity,NaN",
          ],
          N = [
            J,
            "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None",
          ],
          O = [
            J,
            "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END",
          ],
          J = [
            J,
            "case,done,elif,esac,eval,fi,function,in,local,set,then,until",
          ],
          P =
            /^(DIR|FILE|array|vector|(de|priority_)?queue|(forward_)?list|stack|(const_)?(reverse_)?iterator|(unordered_)?(multi)?(set|map)|bitset|u?(int|float)\d*)\b/,
          S = /\S/,
          T = v({
            keywords: [
              R,
              M,
              L,
              K,
              "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",
              N,
              O,
              J,
            ],
            hashComments: !0,
            cStyleComments: !0,
            multiLineStrings: !0,
            regexLiterals: !0,
          }),
          V = {};
        n(T, ["default-code"]);
        n(
          E(
            [],
            [
              ["pln", /^[^<?]+/],
              ["dec", /^<!\w[^>]*(?:>|$)/],
              ["com", /^<\!--[\s\S]*?(?:-\->|$)/],
              ["lang-", /^<\?([\s\S]+?)(?:\?>|$)/],
              ["lang-", /^<%([\s\S]+?)(?:%>|$)/],
              ["pun", /^(?:<[%?]|[%?]>)/],
              ["lang-", /^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],
              ["lang-js", /^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],
              ["lang-css", /^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],
              ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i],
            ]
          ),
          "default-markup htm html mxml xhtml xml xsl".split(" ")
        );
        n(
          E(
            [
              ["pln", /^[\s]+/, null, " \t\r\n"],
              ["atv", /^(?:\"[^\"]*\"?|\'[^\']*\'?)/, null, "\"'"],
            ],
            [
              ["tag", /^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],
              ["atn", /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],
              ["lang-uq.val", /^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],
              ["pun", /^[=<>\/]+/],
              ["lang-js", /^on\w+\s*=\s*\"([^\"]+)\"/i],
              ["lang-js", /^on\w+\s*=\s*\'([^\']+)\'/i],
              ["lang-js", /^on\w+\s*=\s*([^\"\'>\s]+)/i],
              ["lang-css", /^style\s*=\s*\"([^\"]+)\"/i],
              ["lang-css", /^style\s*=\s*\'([^\']+)\'/i],
              ["lang-css", /^style\s*=\s*([^\"\'>\s]+)/i],
            ]
          ),
          ["in.tag"]
        );
        n(E([], [["atv", /^[\s\S]+/]]), ["uq.val"]);
        n(
          v({
            keywords: R,
            hashComments: !0,
            cStyleComments: !0,
            types: P,
          }),
          "c cc cpp cxx cyc m".split(" ")
        );
        n(
          v({
            keywords: "null,true,false",
          }),
          ["json"]
        );
        n(
          v({
            keywords: M,
            hashComments: !0,
            cStyleComments: !0,
            verbatimStrings: !0,
            types: P,
          }),
          ["cs"]
        );
        n(
          v({
            keywords: L,
            cStyleComments: !0,
          }),
          ["java"]
        );
        n(
          v({
            keywords: J,
            hashComments: !0,
            multiLineStrings: !0,
          }),
          ["bash", "bsh", "csh", "sh"]
        );
        n(
          v({
            keywords: N,
            hashComments: !0,
            multiLineStrings: !0,
            tripleQuotedStrings: !0,
          }),
          ["cv", "py", "python"]
        );
        n(
          v({
            keywords:
              "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",
            hashComments: !0,
            multiLineStrings: !0,
            regexLiterals: 2,
          }),
          ["perl", "pl", "pm"]
        );
        n(
          v({
            keywords: O,
            hashComments: !0,
            multiLineStrings: !0,
            regexLiterals: !0,
          }),
          ["rb", "ruby"]
        );
        n(
          v({
            keywords: K,
            cStyleComments: !0,
            regexLiterals: !0,
          }),
          ["javascript", "js", "ts", "typescript"]
        );
        n(
          v({
            keywords:
              "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",
            hashComments: 3,
            cStyleComments: !0,
            multilineStrings: !0,
            tripleQuotedStrings: !0,
            regexLiterals: !0,
          }),
          ["coffee"]
        );
        n(E([], [["str", /^[\s\S]+/]]), ["regex"]);
        var U = (Q.PR = {
            createSimpleLexer: E,
            registerLangHandler: n,
            sourceDecorator: v,
            PR_ATTRIB_NAME: "atn",
            PR_ATTRIB_VALUE: "atv",
            PR_COMMENT: "com",
            PR_DECLARATION: "dec",
            PR_KEYWORD: "kwd",
            PR_LITERAL: "lit",
            PR_NOCODE: "nocode",
            PR_PLAIN: "pln",
            PR_PUNCTUATION: "pun",
            PR_SOURCE: "src",
            PR_STRING: "str",
            PR_TAG: "tag",
            PR_TYPE: "typ",
            prettyPrintOne: function (a, d, f) {
              f = f || !1;
              d = d || null;
              var c = document.createElement("div");
              c.innerHTML = "<pre>" + a + "</pre>";
              c = c.firstChild;
              f && B(c, f, !0);
              H({
                j: d,
                m: f,
                h: c,
                l: 1,
                a: null,
                i: null,
                c: null,
                g: null,
              });
              return c.innerHTML;
            },
            prettyPrint: (g = function (a, d) {
              function f() {
                for (
                  var c = Q.PR_SHOULD_USE_CONTINUATION
                    ? b.now() + 250
                    : Infinity;
                  t < r.length && b.now() < c;
                  t++
                ) {
                  for (var d = r[t], k = h, n = d; (n = n.previousSibling); ) {
                    var q = n.nodeType,
                      l = (7 === q || 8 === q) && n.nodeValue;
                    if (
                      l
                        ? !/^\??prettify\b/.test(l)
                        : 3 !== q || /\S/.test(n.nodeValue)
                    )
                      break;
                    if (l) {
                      k = {};
                      l.replace(/\b(\w+)=([\w:.%+-]+)/g, function (a, b, c) {
                        k[b] = c;
                      });
                      break;
                    }
                  }
                  n = d.className;
                  if ((k !== h || u.test(n)) && !e.test(n)) {
                    q = !1;
                    for (l = d.parentNode; l; l = l.parentNode)
                      if (
                        w.test(l.tagName) &&
                        l.className &&
                        u.test(l.className)
                      ) {
                        q = !0;
                        break;
                      }
                    if (!q) {
                      d.className += " prettyprinted";
                      q = k.lang;
                      if (!q) {
                        var q = n.match(v),
                          A;
                        !q &&
                          (A = z(d)) &&
                          D.test(A.tagName) &&
                          (q = A.className.match(v));
                        q && (q = q[1]);
                      }
                      if (x.test(d.tagName)) l = 1;
                      else
                        var l = d.currentStyle,
                          y = g.defaultView,
                          l =
                            (l = l
                              ? l.whiteSpace
                              : y && y.getComputedStyle
                              ? y
                                  .getComputedStyle(d, null)
                                  .getPropertyValue("white-space")
                              : 0) && "pre" === l.substring(0, 3);
                      y = k.linenums;
                      (y = "true" === y || +y) ||
                        (y = (y = n.match(/\blinenums\b(?::(\d+))?/))
                          ? y[1] && y[1].length
                            ? +y[1]
                            : !0
                          : !1);
                      y && B(d, y, l);
                      H({
                        j: q,
                        h: d,
                        m: y,
                        l: l,
                        a: null,
                        i: null,
                        c: null,
                        g: null,
                      });
                    }
                  }
                }
                t < r.length
                  ? Q.setTimeout(f, 250)
                  : "function" === typeof a && a();
              }
              for (
                var c = d || document.body,
                  g = c.ownerDocument || document,
                  c = [
                    c.getElementsByTagName("pre"),
                    c.getElementsByTagName("code"),
                    c.getElementsByTagName("xmp"),
                  ],
                  r = [],
                  k = 0;
                k < c.length;
                ++k
              )
                for (var n = 0, l = c[k].length; n < l; ++n) r.push(c[k][n]);
              var c = null,
                b = Date;
              b.now ||
                (b = {
                  now: function () {
                    return +new Date();
                  },
                });
              var t = 0,
                v = /\blang(?:uage)?-([\w.]+)(?!\S)/,
                u = /\bprettyprint\b/,
                e = /\bprettyprinted\b/,
                x = /pre|xmp/i,
                D = /^code$/i,
                w = /^(?:pre|code|xmp)$/i,
                h = {};
              f();
            }),
          }),
          R = Q.define;
        "function" === typeof R &&
          R.amd &&
          R("google-code-prettify", [], function () {
            return U;
          });
      })();
      return g;
    })();
    S || k.setTimeout(T, 0);
  })();
})();

/**
 * Minified by jsDelivr using Terser v5.3.5.
 * Original file: /npm/codejar@3.5.0/codejar.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
const globalWindow = window;
function CodeJar(t, e, n = {}) {
  const o = Object.assign(
      {
        tab: "\t",
        indentOn: /{$/,
        spellcheck: !1,
        catchTab: !0,
        preserveIdent: !0,
        addClosing: !0,
        history: !0,
        window: globalWindow,
      },
      n
    ),
    r = o.window,
    s = r.document;
  let i,
    d,
    l = [],
    a = [],
    c = -1,
    f = !1;
  t.setAttribute("contenteditable", "plaintext-only"),
    t.setAttribute("spellcheck", o.spellcheck ? "true" : "false"),
    (t.style.outline = "none"),
    (t.style.overflowWrap = "break-word"),
    (t.style.overflowY = "auto"),
    (t.style.whiteSpace = "pre-wrap");
  let u = !1;
  e(t),
    "plaintext-only" !== t.contentEditable && (u = !0),
    u && t.setAttribute("contenteditable", "true");
  const p = S(() => {
    const n = b();
    e(t, n), T(n);
  }, 30);
  let g = !1;
  const h = (t) =>
      !O(t) &&
      !x(t) &&
      "Meta" !== t.key &&
      "Control" !== t.key &&
      "Alt" !== t.key &&
      !t.key.startsWith("Arrow"),
    y = S((t) => {
      h(t) && (m(), (g = !1));
    }, 300),
    N = (e, n) => {
      l.push([e, n]), t.addEventListener(e, n);
    };
  function b() {
    const e = K(),
      n = {
        start: 0,
        end: 0,
        dir: void 0,
      };
    let { anchorNode: o, anchorOffset: r, focusNode: i, focusOffset: d } = e;
    if (!o || !i) throw "error1";
    if (o.nodeType === Node.ELEMENT_NODE) {
      const t = s.createTextNode("");
      o.insertBefore(t, o.childNodes[r]), (o = t), (r = 0);
    }
    if (i.nodeType === Node.ELEMENT_NODE) {
      const t = s.createTextNode("");
      i.insertBefore(t, i.childNodes[d]), (i = t), (d = 0);
    }
    return (
      v(t, (t) => {
        if (t === o && t === i)
          return (
            (n.start += r), (n.end += d), (n.dir = r <= d ? "->" : "<-"), "stop"
          );
        if (t === o) {
          if (((n.start += r), n.dir)) return "stop";
          n.dir = "->";
        } else if (t === i) {
          if (((n.end += d), n.dir)) return "stop";
          n.dir = "<-";
        }
        t.nodeType === Node.TEXT_NODE &&
          ("->" != n.dir && (n.start += t.nodeValue.length),
          "<-" != n.dir && (n.end += t.nodeValue.length));
      }),
      t.normalize(),
      n
    );
  }
  function T(e) {
    const n = K();
    let o,
      r,
      s = 0,
      i = 0;
    if (
      (e.dir || (e.dir = "->"),
      e.start < 0 && (e.start = 0),
      e.end < 0 && (e.end = 0),
      "<-" == e.dir)
    ) {
      const { start: t, end: n } = e;
      (e.start = n), (e.end = t);
    }
    let d = 0;
    v(t, (t) => {
      if (t.nodeType !== Node.TEXT_NODE) return;
      const n = (t.nodeValue || "").length;
      if (d + n > e.start && (o || ((o = t), (s = e.start - d)), d + n > e.end))
        return (r = t), (i = e.end - d), "stop";
      d += n;
    }),
      o || ((o = t), (s = t.childNodes.length)),
      r || ((r = t), (i = t.childNodes.length)),
      "<-" == e.dir && ([o, s, r, i] = [r, i, o, s]),
      n.setBaseAndExtent(o, s, r, i);
  }
  function E() {
    const e = K().getRangeAt(0),
      n = s.createRange();
    return (
      n.selectNodeContents(t),
      n.setEnd(e.startContainer, e.startOffset),
      n.toString()
    );
  }
  function k() {
    const e = K().getRangeAt(0),
      n = s.createRange();
    return (
      n.selectNodeContents(t),
      n.setStart(e.endContainer, e.endOffset),
      n.toString()
    );
  }
  function C(t) {
    if (u && "Enter" === t.key)
      if ((L(t), t.stopPropagation(), "" == k())) {
        M("\n ");
        const t = b();
        (t.start = --t.end), T(t);
      } else M("\n");
  }
  function m() {
    if (!f) return;
    const e = t.innerHTML,
      n = b(),
      o = a[c];
    if (o && o.html === e && o.pos.start === n.start && o.pos.end === n.end)
      return;
    c++,
      (a[c] = {
        html: e,
        pos: n,
      }),
      a.splice(c + 1);
    c > 300 && ((c = 300), a.splice(0, 1));
  }
  function v(t, e) {
    const n = [];
    t.firstChild && n.push(t.firstChild);
    let o = n.pop();
    for (; o && "stop" !== e(o); )
      o.nextSibling && n.push(o.nextSibling),
        o.firstChild && n.push(o.firstChild),
        (o = n.pop());
  }
  function w(t) {
    return t.metaKey || t.ctrlKey;
  }
  function O(t) {
    return w(t) && !t.shiftKey && "KeyZ" === t.code;
  }
  function x(t) {
    return w(t) && t.shiftKey && "KeyZ" === t.code;
  }
  function M(t) {
    (t = t
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")),
      s.execCommand("insertHTML", !1, t);
  }
  function S(t, e) {
    let n = 0;
    return (...o) => {
      clearTimeout(n), (n = r.setTimeout(() => t(...o), e));
    };
  }
  function A(t) {
    let e = t.length - 1;
    for (; e >= 0 && "\n" !== t[e]; ) e--;
    e++;
    let n = e;
    for (; n < t.length && /[ \t]/.test(t[n]); ) n++;
    return [t.substring(e, n) || "", e, n];
  }
  function D() {
    return t.textContent || "";
  }
  function L(t) {
    t.preventDefault();
  }
  function K() {
    var e;
    return (null === (e = t.parentNode) || void 0 === e
      ? void 0
      : e.nodeType) == Node.DOCUMENT_FRAGMENT_NODE
      ? t.parentNode.getSelection()
      : r.getSelection();
  }
  return (
    N("keydown", (e) => {
      e.defaultPrevented ||
        ((d = D()),
        o.preserveIdent
          ? (function (t) {
              if ("Enter" === t.key) {
                const e = E(),
                  n = k();
                let [r] = A(e),
                  s = r;
                if (
                  (o.indentOn.test(e) && (s += o.tab),
                  s.length > 0
                    ? (L(t), t.stopPropagation(), M("\n" + s))
                    : C(t),
                  s !== r && "}" === n[0])
                ) {
                  const t = b();
                  M("\n" + r), T(t);
                }
              }
            })(e)
          : C(e),
        o.catchTab &&
          (function (t) {
            if ("Tab" === t.key)
              if ((L(t), t.shiftKey)) {
                const t = E();
                let [e, n] = A(t);
                if (e.length > 0) {
                  const t = b(),
                    r = Math.min(o.tab.length, e.length);
                  T({
                    start: n,
                    end: n + r,
                  }),
                    s.execCommand("delete"),
                    (t.start -= r),
                    (t.end -= r),
                    T(t);
                }
              } else M(o.tab);
          })(e),
        o.addClosing &&
          (function (t) {
            const e = "([{'\"",
              n = ")]}'\"",
              o = k(),
              r = E(),
              s = "\\" === r.substr(r.length - 1),
              i = o.substr(0, 1);
            if (n.includes(t.key) && !s && i === t.key) {
              const e = b();
              L(t), (e.start = ++e.end), T(e);
            } else if (
              e.includes(t.key) &&
              !s &&
              ("\"'".includes(t.key) || ["", " ", "\n"].includes(i))
            ) {
              L(t);
              const o = b(),
                r = o.start == o.end ? "" : K().toString();
              M(t.key + r + n[e.indexOf(t.key)]), o.start++, o.end++, T(o);
            }
          })(e),
        o.history &&
          (!(function (e) {
            if (O(e)) {
              L(e), c--;
              const n = a[c];
              n && ((t.innerHTML = n.html), T(n.pos)), c < 0 && (c = 0);
            }
            if (x(e)) {
              L(e), c++;
              const n = a[c];
              n && ((t.innerHTML = n.html), T(n.pos)), c >= a.length && c--;
            }
          })(e),
          h(e) && !g && (m(), (g = !0))),
        u && T(b()));
    }),
    N("keyup", (t) => {
      t.defaultPrevented ||
        t.isComposing ||
        (d !== D() && p(), y(t), i && i(D()));
    }),
    N("focus", (t) => {
      f = !0;
    }),
    N("blur", (t) => {
      f = !1;
    }),
    N("paste", (n) => {
      m(),
        (function (n) {
          L(n);
          const o = (n.originalEvent || n).clipboardData
              .getData("text/plain")
              .replace(/\r/g, ""),
            r = b();
          M(o),
            e(t),
            T({
              start: r.start + o.length,
              end: r.start + o.length,
            });
        })(n),
        m(),
        i && i(D());
    }),
    {
      updateOptions(t) {
        Object.assign(o, t);
      },
      updateCode(n) {
        (t.textContent = n), e(t);
      },
      onUpdate(t) {
        i = t;
      },
      toString: D,
      save: b,
      restore: T,
      recordHistory: m,
      destroy() {
        for (let [e, n] of l) t.removeEventListener(e, n);
      },
    }
  );
}
/* Codejar code ends here */

/* functions.js starts here */
("use strict");
(window.Element.prototype.removeClass = function () {
  let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
    e = this;
  return (
    e instanceof HTMLElement || null === e || (e = document.querySelector(e)),
    this.isVariableDefined(e) && t && e.classList.remove(t),
    this
  );
}),
  (window.Element.prototype.addClass = function () {
    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
      e = this;
    return (
      e instanceof HTMLElement || null === e || (e = document.querySelector(e)),
      this.isVariableDefined(e) && t && e.classList.add(t),
      this
    );
  }),
  (window.Element.prototype.toggleClass = function () {
    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
      e = this;
    return (
      e instanceof HTMLElement || null === e || (e = document.querySelector(e)),
      this.isVariableDefined(e) && t && e.classList.toggle(t),
      this
    );
  }),
  (window.Element.prototype.isVariableDefined = function () {
    return !!this && void 0 !== this && null != this;
  });
var ThemeColor = {
    getCssVariableValue: function (t) {
      var e = getComputedStyle(document.documentElement).getPropertyValue(t);
      return e && e.length > 0 && (e = e.trim()), e;
    },
  },
  e = {
    init: function () {
      e.preLoader(),
        e.stickyHeader(),
        e.tinySlider(),
        e.stickyBar(),
        e.backTotop(),
        e.darkMode(),
        e.stickyElement();
    },
    isVariableDefined: function (t) {
      return typeof !!t && "undefined" != t && null != t;
    },
    on: function (t, e, i) {
      document.addEventListener("DOMContentLoaded", () => {
        t instanceof HTMLElement ||
          null === t ||
          (t = document.querySelector(t)),
          t.addEventListener(e, i);
      });
    },
    onAll: function (t, e, i) {
      document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(t).forEach((t) => {
          if (e.indexOf(",") > -1) {
            e.split(",").forEach((e) => {
              t.addEventListener(e, i);
            });
          } else t.addEventListener(e, i);
        });
      });
    },
    removeClass: function (t, i) {
      t instanceof HTMLElement || null === t || (t = document.querySelector(t)),
        e.isVariableDefined(t) && t.removeClass(i);
    },
    removeAllClass: function (t, i) {
      e.isVariableDefined(t) &&
        t instanceof HTMLElement &&
        document.querySelectorAll(t).forEach((t) => {
          t.removeClass(i);
        });
    },
    select: function (t) {
      return document.querySelector(t);
    },
    selectAll: function (t) {
      return document.querySelectorAll(t);
    },
    preLoader: function () {
      window.onload = function () {
        var t = e.select(".preloader");
        e.isVariableDefined(t) &&
          ((t.className += " animate__animated animate__fadeOut"),
          setTimeout(function () {
            t.style.display = "none";
          }, 200));
      };
    },
    stickyHeader: function () {
      var t = e.select(".navbar-sticky");
      if (e.isVariableDefined(t)) {
        var i = t.offsetHeight;
        t.insertAdjacentHTML("afterend", '<div id="sticky-space"></div>');
        var a = e.select("#sticky-space");
        e.isVariableDefined(a) &&
          document.addEventListener("scroll", function (n) {
            (window.pageYOffset || document.documentElement.scrollTop) >= 400
              ? (a.addClass("active"),
                (e.select("#sticky-space.active").style.height = i + "px"),
                t.addClass("navbar-sticky-on"))
              : (a.removeClass("active"),
                (a.style.height = "0px"),
                t.removeClass("navbar-sticky-on"));
          });
      }
    },
    tinySlider: function () {
      var t = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
        i = e.select(".tiny-slider-inner");
      e.isVariableDefined(i) &&
        e.selectAll(".tiny-slider-inner").forEach((i) => {
          var a = i,
            n =
              !!a.getAttribute("data-mobile") && a.getAttribute("data-mobile");
          if (t || !n) {
            var r = a.getAttribute("data-mode")
                ? a.getAttribute("data-mode")
                : "carousel",
              s = a.getAttribute("data-axis")
                ? a.getAttribute("data-axis")
                : "horizontal",
              o = a.getAttribute("data-gutter")
                ? a.getAttribute("data-gutter")
                : 30,
              l = a.getAttribute("data-edge") ? a.getAttribute("data-edge") : 0,
              d = a.getAttribute("data-items")
                ? a.getAttribute("data-items")
                : 4,
              u = a.getAttribute("data-items-xl")
                ? a.getAttribute("data-items-xl")
                : Number(d),
              c = a.getAttribute("data-items-lg")
                ? a.getAttribute("data-items-lg")
                : Number(u),
              m = a.getAttribute("data-items-md")
                ? a.getAttribute("data-items-md")
                : Number(c),
              f = a.getAttribute("data-items-sm")
                ? a.getAttribute("data-items-sm")
                : Number(m),
              g = a.getAttribute("data-items-xs")
                ? a.getAttribute("data-items-xs")
                : Number(f),
              b = a.getAttribute("data-speed")
                ? a.getAttribute("data-speed")
                : 500,
              h = "true" === a.getAttribute("data-autowidth"),
              y = "false" !== a.getAttribute("data-arrow"),
              v = "false" !== a.getAttribute("data-dots"),
              A = "false" !== a.getAttribute("data-autoplay"),
              p = a.getAttribute("data-autoplaytime")
                ? a.getAttribute("data-autoplaytime")
                : 3e3,
              w = "true" === a.getAttribute("data-hoverpause");
            if (e.isVariableDefined(e.select(".custom-thumb")))
              var k = e.select(".custom-thumb");
            var E,
              L = "false" !== a.getAttribute("data-loop"),
              C = "true" === a.getAttribute("data-rewind"),
              D = "true" === a.getAttribute("data-autoheight"),
              V = "true" === a.getAttribute("data-fixedwidth"),
              S = "false" !== a.getAttribute("data-touch");
            a.getAttribute("data-drag");
            "rtl" ===
              document.getElementsByTagName("html")[0].getAttribute("dir") &&
              (E = "rtl");
            tns({
              container: i,
              mode: r,
              axis: s,
              gutter: o,
              edgePadding: l,
              speed: b,
              autoWidth: h,
              controls: y,
              nav: v,
              autoplay: A,
              autoplayTimeout: p,
              autoplayHoverPause: w,
              autoplayButton: !1,
              autoplayButtonOutput: !0,
              controlsPosition: top,
              navContainer: k,
              navPosition: top,
              autoplayPosition: top,
              controlsText: [
                '<i class="fal fa-chevron-left"></i>',
                '<i class="fal fa-chevron-right"></i>',
              ],
              loop: L,
              rewind: C,
              autoHeight: D,
              fixedWidth: V,
              touch: S,
              arrowKeys: !0,
              items: d,
              textDirection: E,
              responsive: {
                0: {
                  items: Number(g),
                },
                576: {
                  items: Number(f),
                },
                768: {
                  items: Number(m),
                },
                992: {
                  items: Number(c),
                },
                1200: {
                  items: Number(u),
                },
              },
            });
          }
        });
    },
    stickyBar: function () {
      var t = e.select("[data-sticky]");
      if (e.isVariableDefined(t)) new Sticky("[data-sticky]");
    },
    backTotop: function () {
      window.scrollY;
      var t = e.select(".back-top");
      if (e.isVariableDefined(t)) {
        window.addEventListener("scroll", function () {
          window.scrollY >= 800
            ? (() => t.addClass("back-top-show"))()
            : (() => t.removeClass("back-top-show"))();
        }),
          t.addEventListener("click", () =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          );
      }
    },
    darkMode: function () {
      let t = localStorage.getItem("data-theme");
      var i = document.getElementById("style-switch");
      document.getElementsByTagName("html")[0].getAttribute("dir");
      function a() {
        document.documentElement.setAttribute("data-theme", "dark"),
          i.setAttribute("href", "/static/css/purge/style-dark-min.css?v0.5"),
          localStorage.setItem("data-theme", "dark");
      }
      function n() {
        document.documentElement.setAttribute("data-theme", "light"),
          i.setAttribute("href", "/static/css/purge/style-min.css?v0.5"),
          localStorage.setItem("data-theme", "light");
      }
      "dark" === t
        ? -1 == i.href.indexOf("style-dark-min.css") && a()
        : (null != t && "light" !== t) ||
          (-1 == i.href.indexOf("style-min.css") && n());
      const r = e.select("#darkModeSwitch");
      e.isVariableDefined(r) &&
        r.addEventListener("click", () => {
          "dark" === localStorage.getItem("data-theme") ? n() : a();
        });
    },
    stickyElement: function () {
      window.scrollY;
      var t = e.select(".sticky-element");
      if (e.isVariableDefined(t)) {
        window.addEventListener("scroll", function () {
          window.scrollY >= 800
            ? (() => t.addClass("sticky-element-sticked"))()
            : (() => t.removeClass("sticky-element-sticked"))();
        });
      }
    },
  };
e.init();
/* functions.js ends here */

/* prism-core.min.js starts here */
var _self =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope
      ? self
      : {},
  Prism = (function (u) {
    var c = /\blang(?:uage)?-([\w-]+)\b/i,
      n = 0,
      e = {},
      M = {
        manual: u.Prism && u.Prism.manual,
        disableWorkerMessageHandler:
          u.Prism && u.Prism.disableWorkerMessageHandler,
        util: {
          encode: function e(n) {
            return n instanceof W
              ? new W(n.type, e(n.content), n.alias)
              : Array.isArray(n)
              ? n.map(e)
              : n
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/\u00a0/g, " ");
          },
          type: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1);
          },
          objId: function (e) {
            return (
              e.__id ||
                Object.defineProperty(e, "__id", {
                  value: ++n,
                }),
              e.__id
            );
          },
          clone: function t(e, r) {
            var a, n;
            switch (((r = r || {}), M.util.type(e))) {
              case "Object":
                if (((n = M.util.objId(e)), r[n])) return r[n];
                for (var i in ((a = {}), (r[n] = a), e))
                  e.hasOwnProperty(i) && (a[i] = t(e[i], r));
                return a;
              case "Array":
                return (
                  (n = M.util.objId(e)),
                  r[n]
                    ? r[n]
                    : ((a = []),
                      (r[n] = a),
                      e.forEach(function (e, n) {
                        a[n] = t(e, r);
                      }),
                      a)
                );
              default:
                return e;
            }
          },
          getLanguage: function (e) {
            for (; e && !c.test(e.className); ) e = e.parentElement;
            return e
              ? (e.className.match(c) || [, "none"])[1].toLowerCase()
              : "none";
          },
          currentScript: function () {
            if ("undefined" == typeof document) return null;
            if ("currentScript" in document) return document.currentScript;
            try {
              throw new Error();
            } catch (e) {
              var n = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(e.stack) ||
                [])[1];
              if (n) {
                var t = document.getElementsByTagName("script");
                for (var r in t) if (t[r].src == n) return t[r];
              }
              return null;
            }
          },
          isActive: function (e, n, t) {
            for (var r = "no-" + n; e; ) {
              var a = e.classList;
              if (a.contains(n)) return !0;
              if (a.contains(r)) return !1;
              e = e.parentElement;
            }
            return !!t;
          },
        },
        languages: {
          plain: e,
          plaintext: e,
          text: e,
          txt: e,
          extend: function (e, n) {
            var t = M.util.clone(M.languages[e]);
            for (var r in n) t[r] = n[r];
            return t;
          },
          insertBefore: function (t, e, n, r) {
            var a = (r = r || M.languages)[t],
              i = {};
            for (var l in a)
              if (a.hasOwnProperty(l)) {
                if (l == e)
                  for (var o in n) n.hasOwnProperty(o) && (i[o] = n[o]);
                n.hasOwnProperty(l) || (i[l] = a[l]);
              }
            var s = r[t];
            return (
              (r[t] = i),
              M.languages.DFS(M.languages, function (e, n) {
                n === s && e != t && (this[e] = i);
              }),
              i
            );
          },
          DFS: function e(n, t, r, a) {
            a = a || {};
            var i = M.util.objId;
            for (var l in n)
              if (n.hasOwnProperty(l)) {
                t.call(n, l, n[l], r || l);
                var o = n[l],
                  s = M.util.type(o);
                "Object" !== s || a[i(o)]
                  ? "Array" !== s || a[i(o)] || ((a[i(o)] = !0), e(o, t, l, a))
                  : ((a[i(o)] = !0), e(o, t, null, a));
              }
          },
        },
        plugins: {},
        highlightAll: function (e, n) {
          M.highlightAllUnder(document, e, n);
        },
        highlightAllUnder: function (e, n, t) {
          var r = {
            callback: t,
            container: e,
            selector:
              'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
          };
          M.hooks.run("before-highlightall", r),
            (r.elements = Array.prototype.slice.apply(
              r.container.querySelectorAll(r.selector)
            )),
            M.hooks.run("before-all-elements-highlight", r);
          for (var a, i = 0; (a = r.elements[i++]); )
            M.highlightElement(a, !0 === n, r.callback);
        },
        highlightElement: function (e, n, t) {
          var r = M.util.getLanguage(e),
            a = M.languages[r];
          e.className =
            e.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r;
          var i = e.parentElement;
          i &&
            "pre" === i.nodeName.toLowerCase() &&
            (i.className =
              i.className.replace(c, "").replace(/\s+/g, " ") +
              " language-" +
              r);
          var l = {
            element: e,
            language: r,
            grammar: a,
            code: e.textContent,
          };
          function o(e) {
            (l.highlightedCode = e),
              M.hooks.run("before-insert", l),
              (l.element.innerHTML = l.highlightedCode),
              M.hooks.run("after-highlight", l),
              M.hooks.run("complete", l),
              t && t.call(l.element);
          }
          if (
            (M.hooks.run("before-sanity-check", l),
            (i = l.element.parentElement) &&
              "pre" === i.nodeName.toLowerCase() &&
              !i.hasAttribute("tabindex") &&
              i.setAttribute("tabindex", "0"),
            !l.code)
          )
            return M.hooks.run("complete", l), void (t && t.call(l.element));
          if ((M.hooks.run("before-highlight", l), l.grammar))
            if (n && u.Worker) {
              var s = new Worker(M.filename);
              (s.onmessage = function (e) {
                o(e.data);
              }),
                s.postMessage(
                  JSON.stringify({
                    language: l.language,
                    code: l.code,
                    immediateClose: !0,
                  })
                );
            } else o(M.highlight(l.code, l.grammar, l.language));
          else o(M.util.encode(l.code));
        },
        highlight: function (e, n, t) {
          var r = {
            code: e,
            grammar: n,
            language: t,
          };
          return (
            M.hooks.run("before-tokenize", r),
            (r.tokens = M.tokenize(r.code, r.grammar)),
            M.hooks.run("after-tokenize", r),
            W.stringify(M.util.encode(r.tokens), r.language)
          );
        },
        tokenize: function (e, n) {
          var t = n.rest;
          if (t) {
            for (var r in t) n[r] = t[r];
            delete n.rest;
          }
          var a = new i();
          return (
            I(a, a.head, e),
            (function e(n, t, r, a, i, l) {
              for (var o in r)
                if (r.hasOwnProperty(o) && r[o]) {
                  var s = r[o];
                  s = Array.isArray(s) ? s : [s];
                  for (var u = 0; u < s.length; ++u) {
                    if (l && l.cause == o + "," + u) return;
                    var c = s[u],
                      g = c.inside,
                      f = !!c.lookbehind,
                      h = !!c.greedy,
                      d = c.alias;
                    if (h && !c.pattern.global) {
                      var p = c.pattern.toString().match(/[imsuy]*$/)[0];
                      c.pattern = RegExp(c.pattern.source, p + "g");
                    }
                    for (
                      var v = c.pattern || c, m = a.next, y = i;
                      m !== t.tail && !(l && y >= l.reach);
                      y += m.value.length, m = m.next
                    ) {
                      var b = m.value;
                      if (t.length > n.length) return;
                      if (!(b instanceof W)) {
                        var k,
                          x = 1;
                        if (h) {
                          if (!(k = z(v, y, n, f))) break;
                          var w = k.index,
                            A = k.index + k[0].length,
                            P = y;
                          for (P += m.value.length; P <= w; )
                            (m = m.next), (P += m.value.length);
                          if (
                            ((P -= m.value.length),
                            (y = P),
                            m.value instanceof W)
                          )
                            continue;
                          for (
                            var E = m;
                            E !== t.tail &&
                            (P < A || "string" == typeof E.value);
                            E = E.next
                          )
                            x++, (P += E.value.length);
                          x--, (b = n.slice(y, P)), (k.index -= y);
                        } else if (!(k = z(v, 0, b, f))) continue;
                        var w = k.index,
                          S = k[0],
                          O = b.slice(0, w),
                          L = b.slice(w + S.length),
                          N = y + b.length;
                        l && N > l.reach && (l.reach = N);
                        var j = m.prev;
                        O && ((j = I(t, j, O)), (y += O.length)), q(t, j, x);
                        var C = new W(o, g ? M.tokenize(S, g) : S, d, S);
                        if (((m = I(t, j, C)), L && I(t, m, L), 1 < x)) {
                          var _ = {
                            cause: o + "," + u,
                            reach: N,
                          };
                          e(n, t, r, m.prev, y, _),
                            l && _.reach > l.reach && (l.reach = _.reach);
                        }
                      }
                    }
                  }
                }
            })(e, a, n, a.head, 0),
            (function (e) {
              var n = [],
                t = e.head.next;
              for (; t !== e.tail; ) n.push(t.value), (t = t.next);
              return n;
            })(a)
          );
        },
        hooks: {
          all: {},
          add: function (e, n) {
            var t = M.hooks.all;
            (t[e] = t[e] || []), t[e].push(n);
          },
          run: function (e, n) {
            var t = M.hooks.all[e];
            if (t && t.length) for (var r, a = 0; (r = t[a++]); ) r(n);
          },
        },
        Token: W,
      };
    function W(e, n, t, r) {
      (this.type = e),
        (this.content = n),
        (this.alias = t),
        (this.length = 0 | (r || "").length);
    }
    function z(e, n, t, r) {
      e.lastIndex = n;
      var a = e.exec(t);
      if (a && r && a[1]) {
        var i = a[1].length;
        (a.index += i), (a[0] = a[0].slice(i));
      }
      return a;
    }
    function i() {
      var e = {
          value: null,
          prev: null,
          next: null,
        },
        n = {
          value: null,
          prev: e,
          next: null,
        };
      (e.next = n), (this.head = e), (this.tail = n), (this.length = 0);
    }
    function I(e, n, t) {
      var r = n.next,
        a = {
          value: t,
          prev: n,
          next: r,
        };
      return (n.next = a), (r.prev = a), e.length++, a;
    }
    function q(e, n, t) {
      for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
      ((n.next = r).prev = n), (e.length -= a);
    }
    if (
      ((u.Prism = M),
      (W.stringify = function n(e, t) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) {
          var r = "";
          return (
            e.forEach(function (e) {
              r += n(e, t);
            }),
            r
          );
        }
        var a = {
            type: e.type,
            content: n(e.content, t),
            tag: "span",
            classes: ["token", e.type],
            attributes: {},
            language: t,
          },
          i = e.alias;
        i &&
          (Array.isArray(i)
            ? Array.prototype.push.apply(a.classes, i)
            : a.classes.push(i)),
          M.hooks.run("wrap", a);
        var l = "";
        for (var o in a.attributes)
          l +=
            " " +
            o +
            '="' +
            (a.attributes[o] || "").replace(/"/g, "&quot;") +
            '"';
        return (
          "<" +
          a.tag +
          ' class="' +
          a.classes.join(" ") +
          '"' +
          l +
          ">" +
          a.content +
          "</" +
          a.tag +
          ">"
        );
      }),
      !u.document)
    )
      return (
        u.addEventListener &&
          (M.disableWorkerMessageHandler ||
            u.addEventListener(
              "message",
              function (e) {
                var n = JSON.parse(e.data),
                  t = n.language,
                  r = n.code,
                  a = n.immediateClose;
                u.postMessage(M.highlight(r, M.languages[t], t)),
                  a && u.close();
              },
              !1
            )),
        M
      );
    var t = M.util.currentScript();
    function r() {
      M.manual || M.highlightAll();
    }
    if (
      (t &&
        ((M.filename = t.src),
        t.hasAttribute("data-manual") && (M.manual = !0)),
      !M.manual)
    ) {
      var a = document.readyState;
      "loading" === a || ("interactive" === a && t && t.defer)
        ? document.addEventListener("DOMContentLoaded", r)
        : window.requestAnimationFrame
        ? window.requestAnimationFrame(r)
        : window.setTimeout(r, 16);
    }
    return M;
  })(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism),
  "undefined" != typeof global && (global.Prism = Prism);
/* prism-core.min.js ends here */

/* prism-autoloader.min.js starts here */
!(function () {
  if ("undefined" != typeof Prism && "undefined" != typeof document) {
    var l = {
        javascript: "clike",
        actionscript: "javascript",
        apex: ["clike", "sql"],
        arduino: "cpp",
        aspnet: ["markup", "csharp"],
        birb: "clike",
        bison: "c",
        c: "clike",
        csharp: "clike",
        cpp: "c",
        cfscript: "clike",
        chaiscript: ["clike", "cpp"],
        coffeescript: "javascript",
        crystal: "ruby",
        "css-extras": "css",
        d: "clike",
        dart: "clike",
        django: "markup-templating",
        ejs: ["javascript", "markup-templating"],
        etlua: ["lua", "markup-templating"],
        erb: ["ruby", "markup-templating"],
        fsharp: "clike",
        "firestore-security-rules": "clike",
        flow: "javascript",
        ftl: "markup-templating",
        gml: "clike",
        glsl: "c",
        go: "clike",
        groovy: "clike",
        haml: "ruby",
        handlebars: "markup-templating",
        haxe: "clike",
        hlsl: "c",
        idris: "haskell",
        java: "clike",
        javadoc: ["markup", "java", "javadoclike"],
        jolie: "clike",
        jsdoc: ["javascript", "javadoclike", "typescript"],
        "js-extras": "javascript",
        json5: "json",
        jsonp: "json",
        "js-templates": "javascript",
        kotlin: "clike",
        latte: ["clike", "markup-templating", "php"],
        less: "css",
        lilypond: "scheme",
        liquid: "markup-templating",
        markdown: "markup",
        "markup-templating": "markup",
        mongodb: "javascript",
        n4js: "javascript",
        objectivec: "c",
        opencl: "c",
        parser: "markup",
        php: "markup-templating",
        phpdoc: ["php", "javadoclike"],
        "php-extras": "php",
        plsql: "sql",
        processing: "clike",
        protobuf: "clike",
        pug: ["markup", "javascript"],
        purebasic: "clike",
        purescript: "haskell",
        qsharp: "clike",
        qml: "javascript",
        qore: "clike",
        racket: "scheme",
        jsx: ["markup", "javascript"],
        tsx: ["jsx", "typescript"],
        reason: "clike",
        ruby: "clike",
        sass: "css",
        scss: "css",
        scala: "java",
        "shell-session": "bash",
        smarty: "markup-templating",
        solidity: "clike",
        soy: "markup-templating",
        sparql: "turtle",
        sqf: "clike",
        squirrel: "clike",
        "t4-cs": ["t4-templating", "csharp"],
        "t4-vb": ["t4-templating", "vbnet"],
        tap: "yaml",
        tt2: ["clike", "markup-templating"],
        textile: "markup",
        twig: "markup",
        typescript: "javascript",
        v: "clike",
        vala: "clike",
        vbnet: "basic",
        velocity: "markup",
        wiki: "markup",
        xeora: "markup",
        "xml-doc": "markup",
        xquery: "markup",
      },
      n = {
        html: "markup",
        xml: "markup",
        svg: "markup",
        mathml: "markup",
        ssml: "markup",
        atom: "markup",
        rss: "markup",
        js: "javascript",
        g4: "antlr4",
        adoc: "asciidoc",
        avdl: "avro-idl",
        shell: "bash",
        shortcode: "bbcode",
        rbnf: "bnf",
        oscript: "bsl",
        cs: "csharp",
        dotnet: "csharp",
        cfc: "cfscript",
        coffee: "coffeescript",
        conc: "concurnas",
        jinja2: "django",
        "dns-zone": "dns-zone-file",
        dockerfile: "docker",
        gv: "dot",
        eta: "ejs",
        xlsx: "excel-formula",
        xls: "excel-formula",
        gamemakerlanguage: "gml",
        gni: "gn",
        hbs: "handlebars",
        hs: "haskell",
        idr: "idris",
        gitignore: "ignore",
        hgignore: "ignore",
        npmignore: "ignore",
        webmanifest: "json",
        kt: "kotlin",
        kts: "kotlin",
        kum: "kumir",
        tex: "latex",
        context: "latex",
        ly: "lilypond",
        emacs: "lisp",
        elisp: "lisp",
        "emacs-lisp": "lisp",
        md: "markdown",
        moon: "moonscript",
        n4jsd: "n4js",
        nani: "naniscript",
        objc: "objectivec",
        qasm: "openqasm",
        objectpascal: "pascal",
        px: "pcaxis",
        pcode: "peoplecode",
        pq: "powerquery",
        mscript: "powerquery",
        pbfasm: "purebasic",
        purs: "purescript",
        py: "python",
        qs: "qsharp",
        rkt: "racket",
        rpy: "renpy",
        robot: "robotframework",
        rb: "ruby",
        "sh-session": "shell-session",
        shellsession: "shell-session",
        smlnj: "sml",
        sol: "solidity",
        sln: "solution-file",
        rq: "sparql",
        t4: "t4-cs",
        trig: "turtle",
        ts: "typescript",
        tsconfig: "typoscript",
        uscript: "unrealscript",
        uc: "unrealscript",
        url: "uri",
        vb: "visual-basic",
        vba: "visual-basic",
        mathematica: "wolfram",
        nb: "wolfram",
        wl: "wolfram",
        xeoracube: "xeora",
        yml: "yaml",
      },
      p = {},
      e = "components/",
      a = Prism.util.currentScript();
    if (a) {
      var r =
          /\bplugins\/autoloader\/prism-autoloader\.(?:min\.)?js(?:\?[^\r\n/]*)?$/i,
        s = /(^|\/)[\w-]+\.(?:min\.)?js(?:\?[^\r\n/]*)?$/i,
        i = a.getAttribute("data-autoloader-path");
      if (null != i) e = i.trim().replace(/\/?$/, "/");
      else {
        var t = a.src;
        r.test(t)
          ? (e = t.replace(r, "components/"))
          : s.test(t) && (e = t.replace(s, "$1components/"));
      }
    }
    var o = (Prism.plugins.autoloader = {
      languages_path: e,
      use_minified: !0,
      loadLanguages: m,
    });
    Prism.hooks.add("complete", function (e) {
      var a = e.element,
        r = e.language;
      if (a && r && "none" !== r) {
        var s = (function (e) {
          var a = (e.getAttribute("data-dependencies") || "").trim();
          if (!a) {
            var r = e.parentElement;
            r &&
              "pre" === r.tagName.toLowerCase() &&
              (a = (r.getAttribute("data-dependencies") || "").trim());
          }
          return a ? a.split(/\s*,\s*/g) : [];
        })(a);
        /^diff-./i.test(r)
          ? (s.push("diff"), s.push(r.substr("diff-".length)))
          : s.push(r),
          s.every(u) ||
            m(s, function () {
              Prism.highlightElement(a);
            });
      }
    });
  }
  function u(e) {
    if (0 <= e.indexOf("!")) return !1;
    if ((e = n[e] || e) in Prism.languages) return !0;
    var a = p[e];
    return a && !a.error && !1 === a.loading;
  }
  function m(e, a, r) {
    "string" == typeof e && (e = [e]);
    var s = e.length,
      i = 0,
      t = !1;
    function c() {
      t || (++i === s && a && a(e));
    }
    0 !== s
      ? e.forEach(function (e) {
          !(function (a, r, s) {
            var i = 0 <= a.indexOf("!");
            function e() {
              var e = p[a];
              e ||
                (e = p[a] =
                  {
                    callbacks: [],
                  }),
                e.callbacks.push({
                  success: r,
                  error: s,
                }),
                !i && u(a)
                  ? k(a, "success")
                  : !i && e.error
                  ? k(a, "error")
                  : (!i && e.loading) ||
                    ((e.loading = !0),
                    (e.error = !1),
                    (function (e, a, r) {
                      var s = document.createElement("script");
                      (s.src = e),
                        (s.async = !0),
                        (s.onload = function () {
                          document.body.removeChild(s), a && a();
                        }),
                        (s.onerror = function () {
                          document.body.removeChild(s), r && r();
                        }),
                        document.body.appendChild(s);
                    })(
                      (function (e) {
                        return (
                          o.languages_path +
                          "prism-" +
                          e +
                          (o.use_minified ? ".min" : "") +
                          ".js"
                        );
                      })(a),
                      function () {
                        (e.loading = !1), k(a, "success");
                      },
                      function () {
                        (e.loading = !1), (e.error = !0), k(a, "error");
                      }
                    ));
            }
            (a = a.replace("!", "")), (a = n[a] || a);
            var t = l[a];
            t && t.length ? m(t, e, s) : e();
          })(e, c, function () {
            t || ((t = !0), r && r(e));
          });
        })
      : a && setTimeout(a, 0);
  }
  function k(e, a) {
    if (p[e]) {
      for (var r = p[e].callbacks, s = 0, i = r.length; s < i; s++) {
        var t = r[s][a];
        t && setTimeout(t, 0);
      }
      r.length = 0;
    }
  }
})();
/* prism-autoloader.min.js ends here */

/* custom.js starts here */
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
function getDocHeight(e) {
  var t = (e = e || document).body,
    e = e.documentElement;
  return Math.max(
    t.scrollHeight,
    t.offsetHeight,
    e.clientHeight,
    e.scrollHeight,
    e.offsetHeight
  );
}
function resizeFrame(e) {
  var t = e.contentDocument || e.contentWindow.document,
    t = ((e.style.visibility = "hidden"), getDocHeight(t) + 5);
  e.style.height = 230 < t ? t + "px" : "230px";
  e.style.visibility = "visible";
}
function showAnswer(e) {
  $("#A" + e).toggle();
  $("#Q" + e + " .true").removeAttr("href");
  $("#Q" + e + " .true").addClass("selected");
  $("#Q" + e + " .true")
    .find("span")
    .addClass("correct");
}
var Timer = !1,
  timeout = 0;
function startTimer(e) {
  var t,
    n,
    i = e,
    s = 0,
    o = setInterval(function () {
      t = parseInt(i / 60, 10);
      n = parseInt(i % 60, 10);
      s = ("0" + (s = 10 < ++s ? 0 : s)).slice(-2);
      t = t < 10 ? "0" + t : t;
      n = n < 10 ? "0" + n : n;
      $("#counter").html(t + ":" + n + ":" + s);
      elapsedTime = 1e3 * (e - i);
      if (i <= 0) {
        finishTest();
        clearInterval(o);
      } else {
        if (timeout) return clearInterval(o), void 0;
        i -= 0.1;
      }
    }, 100);
}
function finishTest() {
  $("#quiz_navigation").addClass("hide");
  $("#quiz_navigation").removeClass("show");
  $("#bottom_navigation").removeClass("hide");
  $("#bottom_navigation").addClass("show");
  $("#stage").html("");
  $("#stage").append(
    "<a href='javascript:checkTestResult();' title='Check Result'><img src='/images/time_over.png' alt='Test is Over'/></a>"
  );
  $("#stage").append(
    "<center><a href='javascript:checkTestResult();' title='Check Result'><h2>Test is Over, Click Here to Check the Result</h2></a></center>"
  );
  timeout = 1;
  $(".middle-col").attr("style", "height:auto!important");
}
function checkTestResult() {
  var t = new FormData();
  t.append("testID", testID);
  t.append("testURL", testURL);
  questionMap.forEach(function (e) {
    t.append("questionMap[]", JSON.stringify(e));
  });
  t.append("totalQ", totalQ);
  t.append("elapsedTime", elapsedTime);
  console.log(t);
  fetch("https://www.tutorialspoint.com/checkTestResult.php", {
    method: "POST",
    body: t,
  })
    .then((e) => {
      t = null;
      return e.text();
    })
    .then((e) => {
      $("#stage").html(e);
    })
    .catch((e) => {
      alert(e);
      return !1;
    });
}
var selected = 1;
function nextQuestion(e) {
  if (0 < timeout) return alert("Given time for online test is over"), void 0;
  $(".Q a").each(function (e) {
    $(this).hasClass("selected") && (selected = 1);
  });
  if (!selected)
    return alert("Please select an asnwer before proceeding"), void 0;
  if (!1 === Timer) {
    startTimer(givenTime / 1e3);
    Timer = !0;
  }
  if (currentQ == totalQ) alert("You are already at last question");
  else {
    currentQ++;
    questionID = questionMap[currentQ].id;
    fetch(e + "/" + questionID + ".htm?QN=" + currentQ)
      .then((e) => e.text())
      .then((e) => {
        $("#stage").html(e);
        selected = 0;
        $("button").addClass("hide");
        $("#quiz_navigation").removeClass("hide");
        $("#bottom_navigation").removeClass("show");
        $("#bottom_navigation").addClass("hide");
        questionMap[currentQ].selected < 10 &&
          $(".Q a").each(function (e) {
            if (questionMap[currentQ].selected === e) {
              $(this).addClass("selected");
              selected = 1;
            }
          });
        $(".middle-col").height() < $(".sidebar").height() &&
          991 < window.innerWidth &&
          $(".middle-col").css("height", $(".sidebar").height() + 50);
        $(".middle-col").height() < $("#rightbar").height() &&
          991 < window.innerWidth &&
          $(".middle-col").css("height", "1113");
        $(".Q a").on("click", function () {
          var e = $(".Q a").index(this);
          questionMap[currentQ].selected = e;
          $(".Q a").each(function (e) {
            $(this).hasClass("true") && (questionMap[currentQ].correct = e);
            $(this).removeClass("selected");
          });
          $(this).addClass("selected");
          selected = 1;
        });
        if (timeout) {
          $("#stage").html("");
          $("#stage").append(
            "<a href='javascript:checkTestResult();' title='Check Result'><img src='/images/time_over.png' alt='Time is Over'/></a>"
          );
          $("#stage").append(
            "<center><a href='javascript:checkTestResult();' title='Check Result'><h2>Time is Over, Check Result</h2></a></center>"
          );
        }
      });
  }
}
function previousQuestion(e) {
  if (0 < timeout) return alert("Given time for online test is over"), void 0;
  if (--currentQ < 1) {
    currentQ++;
    alert("You are already at first question!");
  } else {
    questionID = questionMap[currentQ].id;
    $("div.pre-btn").removeClass("hide");
    $("div.nxt-btn").removeClass("hide");
    $("hr").removeClass("hide");
    fetch(e + "/" + questionID + ".htm?QN=" + currentQ)
      .then((e) => e.text())
      .then((e) => {
        $("button").addClass("hide");
        questionMap[currentQ].selected < 10 &&
          $(".Q a").each(function (e) {
            questionMap[currentQ].selected === e &&
              $(this).addClass("selected");
          });
        $(".Q a").on("click", function () {
          var e = $(".Q a").index(this);
          questionMap[currentQ].selected = e;
          $(".Q a").each(function (e) {
            $(this).hasClass("true") && (questionMap[currentQ].correct = e);
            $(this).removeClass("selected");
          });
          $(this).addClass("selected");
        });
        if (timeout) {
          $("#stage").html("");
          $("#stage").append(
            "<a href='javascript:checkTestResult();' title='Check Result'><img src='/images/time_over.png' alt='Time is Over'/></a>"
          );
          $("#stage").append(
            "<center><a href='javascript:checkTestResult();' title='Check Result'><h2>Time is Over, Check Result</h2></a></center>"
          );
        }
      });
  }
}
function getStyleValue(e, t) {
  return window.getComputedStyle
    ? window.getComputedStyle(e, null).getPropertyValue(t)
    : e.currentStyle[t];
}
var stickyadstatus = "";
function stickyAds() {
  if (
    !document.getElementById("sticky-ad") ||
    !document.getElementById("stickyparent") ||
    !document.getElementById("footer")
  )
    return !1;
  document.getElementById("stickyparent").style.position = "sticky";
  var e = document.getElementById("sticky-ad");
  if (window.innerWidth <= 992) {
    e.style.position = "";
    e.style.top = t + "px";
    return !1;
  }
  var t = document.getElementById("stickyparent").offsetTop,
    n =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop,
    i = Number(getStyleValue(e, "height").replace("px", ""));
  if ("" == stickyadstatus) {
    if (t - n < 80) {
      e.style.position = "fixed";
      e.style.top = "60px";
      stickyadstatus = "sticky";
      document.getElementById("stickyparent").style.position = "sticky";
    }
  } else if (n + 80 - t < 0) {
    e.style.position = "";
    e.style.top = t + "px";
    stickyadstatus = "";
    document.getElementById("stickyparent").style.position = "static";
  }
  if ("sticky" == stickyadstatus)
    if (n + i + 80 > document.getElementById("footer").offsetTop) {
      e.style.position = "absolute";
      e.style.top = document.getElementById("footer").offsetTop - i + "px";
      document.getElementById("stickyparent").style.position = "static";
    } else {
      e.style.position = "fixed";
      e.style.top = "80px";
      stickyadstatus = "sticky";
      document.getElementById("stickyparent").style.position = "sticky";
    }
}
function trim(e, t) {
  for (; ~t.indexOf(e[0]); ) e = e.slice(1);
  for (; ~t.indexOf(e[e.length - 1]); ) e = e.slice(0, -1);
  return e;
}
$(function () {
  $("#print-page").on("click", function (e) {
    window.print();
  });
  $(".toggle").on("click", function () {
    $(this).find(".toggle-content").toggle();
  });
  localStorage.bannerClosed
    ? $("#privacy-banner").css("display", "none")
    : $("#privacy-banner").css("display", "inherit");
  $("#banner-accept").on("click", function () {
    $("#privacy-banner").css("display", "none");
    localStorage.bannerClosed = "true";
  });
  navigator.userAgent.match(/Opera|OPR\//) &&
    $("#privacy-banner").css("display", "inherit");
  var e = location.href;
  -1 ==
    (filename = (filename = e.substring(e.lastIndexOf(".com") + 5)).replace(
      /([/]$)/g,
      ""
    )).lastIndexOf(".htm") && (filename += "/index.htm");
  if (
    -1 ==
    (filename =
      null ==
        document.querySelectorAll(
          '.tutorial-toc .toc li a[href*= "' + filename + '"]'
        )[0] &&
      null != (filenames = document.getElementsByClassName("parent-file")[0])
        ? filenames.innerHTML
        : filename).lastIndexOf("whoiswho")
  ) {
    e = document.querySelectorAll(
      'ul.toc.chapters>li a[href*= "' + filename + '"]'
    );
    0 < e.length && e[0].parentElement.classList.add("current-chapter");
    0 <
      document.querySelectorAll(
        'ul.toc.submenu>li a[href*= "' + filename + '"]'
      ).length && e[0].parentElement.classList.add("current-chapter");
    var e = document.getElementsByClassName("tutorial-content")[0],
      t = document.getElementsByClassName("tutorial-toc")[0];
    e &&
      t &&
      e.offsetHeight < t.offsetHeight &&
      840 < window.innerWidth &&
      (e.style.minHeight = t.offsetHeight + 20 + "px");
  }
  window.addEventListener("scroll", stickyAds);
  window.addEventListener("resize", stickyAds);
  $("#btn-tutorial-toc").on("click", function () {
    $("#navbarCollapse").hide();
    $("#categories-menu").hide();
    $("#tocCollapse").toggle();
  });
  $("#btn-menu-collapse").on("click", function () {
    $("#tocCollapse").hide();
    $("#categories-menu").hide();
    $("#navbarCollapse").toggle();
  });
  $("#categoryMenu").on("click", function () {
    $("#categories-menu").toggle();
  });
  window.addEventListener("click", function (e) {
    e.target.closest("#categoryMenu") ||
      $("#categories-menu").css("display", "none");
  });
  $(".Q a").on("click", function () {
    $(this).hasClass("true")
      ? $(this).find("span").addClass("correct")
      : $(this).find("span").addClass("wrong");
    $(this).removeAttr("href");
    $(this).addClass("selected");
  });
  $("button span").on("click", function () {
    "Show Answer" == $(this).text()
      ? $(this).text("Hide Answer")
      : "Hide Answer" == $(this).text()
      ? $(this).text("Show Answer")
      : "Show Editor" == $(this).text()
      ? $(this).text("Hide Editor")
      : "Hide Editor" == $(this).text() && $(this).text("Show Editor");
  });
  (0 < navigator.userAgent.indexOf("MSIE") ||
    0 < navigator.userAgent.indexOf("Firefox")) &&
    $(".btn-test").on("click", function () {
      if ($(this).find("a").attr("href")) {
        var e = $(this).find("a").attr("href").replace("javascript:", "");
        setTimeout(e, 0);
      }
    });
  for (
    var a = [],
      n = document.querySelectorAll(".demo-code"),
      i = document.querySelectorAll(".just-code"),
      s =
        (($.fn.isInViewport = function (e) {
          var e = $(this).offset().top + e,
            t = e + $(this).outerHeight(),
            n = window.pageYOffset || document.documentElement.scrollTop,
            i = n + $(window).height();
          return n < t && e < i;
        }),
        (e) => {
          e.textContent = e.textContent;
          Prism.highlightElement(e);
        }),
      o = 0;
    o < n.length;
    o++
  ) {
    if (document.getElementById("txtQuestionDesp")) return;
    if (document.getElementById("summernote")) return;
    var r = n[o].innerHTML,
      c = document.createElement("div");
    c.className = "execute";
    n[o].innerHTML = "";
    n[o].append(c);
    n[o].dataset.index = o;
    n[o].id = o;
    (u = document.createElement("div")).className = "code-mirror";
    u.innerHTML = r;
    n[o].append(u);
    var l = {
      tab: " ".repeat(4),
    };
    a[o] = CodeJar(u, s, l);
    (c = document.createElement("div")).className = "output-wrapper";
    c.innerHTML =
      '<div class="console-close"></div><div class="code-output"></div>';
    n[o].append(c);
  }
  for (var d, o = 0; o < i.length; o++) {
    if (document.getElementById("txtQuestionDesp")) return;
    if (document.getElementById("summernote")) return;
    var u,
      r = i[o].innerHTML;
    i[o].innerHTML = "";
    (u = document.createElement("div")).className = "code-mirror";
    u.innerHTML = r;
    i[o].append(u);
    CodeJar(u, s);
  }
  $(".execute").on("click", function () {
    var t = $(this).next().next(".output-wrapper").show(),
      e = $(this).parent().data("index"),
      n = $(this).parent().data("lang"),
      e = ($(this).parent().data("preview"), a[e].toString()),
      i =
        (isMobile || this.nextElementSibling.focus(),
        "https://tpcg1.tutorialspoint.com/demo.php");
    "c" == n ||
    "cpp" == n ||
    "c99" == n ||
    "cpp0x" == n ||
    "cpp11" == n ||
    "objc" == n ||
    "swift" == n ||
    "ada" == n ||
    "algol" == n ||
    "asm" == n ||
    "awk" == n ||
    "bash" == n ||
    "befunge" == n ||
    "brainfuck" == n ||
    "fbc" == n ||
    "csharp" == n ||
    "fsharp" == n ||
    "vb.net" == n ||
    "ilasm" == n ||
    "elixir" == n ||
    "basic" == n ||
    "cobol" == n ||
    "cbasic" == n ||
    "yasm" == n ||
    "fortran" == n ||
    "erlang" == n ||
    "factor" == n
      ? (i = "https://tpcg2.tutorialspoint.com/demo.php")
      : "kotlin" === n ||
        "javascript" === n ||
        "java" === n ||
        "rexx" === n ||
        "clojure" === n ||
        "fantom" === n ||
        "golang" === n ||
        "groovy" === n ||
        "haxe" === n ||
        "haskell" === n ||
        "dart" === n ||
        "d" === n ||
        "julia" === n ||
        "scala" === n
      ? (i = "https://tpcg4.tutorialspoint.com/demo.php")
      : ("perl" !== n &&
          "ruby" !== n &&
          "rubyterm" !== n &&
          "matplotlib" !== n &&
          "numpyterm" !== n &&
          "scipyterm" !== n &&
          "python3" !== n &&
          "python" !== n &&
          "rscript" !== n &&
          "octave" !== n &&
          "octaveterm" !== n &&
          "rterm" !== n &&
          "nodejsterm" !== n &&
          "unixterm" !== n &&
          "python3term" !== n &&
          "pashterm" != n &&
          "lua" != n &&
          "luaterm" != n &&
          "forth" != n &&
          "jython" !== n &&
          "java8" !== n &&
          "ksh" !== n &&
          "tcl" !== n &&
          "lisp" !== n &&
          "icon" !== n &&
          "intercal" !== n &&
          "sqlite" !== n) ||
        (i = "https://tpcg3.tutorialspoint.com/demo.php");
    "typescript" === n && (i = "https://tools.tutorialspoint.com/webview.php");
    $(this).next().next().isInViewport(100) ||
      window.scrollTo({
        top: $(this).next().next().offset().top - 110,
        behavior: "smooth",
      });
    t.find(".console-close").show();
    t.find(".code-output").html('<div class="loader"></div>');
    if ("javascript" === n || "html" === n || "css" === n) {
      var s = document.createElement("iframe");
      s.addEventListener("load", function () {
        setTimeout(function () {
          resizeFrame(s);
          $(".loader").hide();
        }, 100);
      });
      s.style = "height:230px;width:100%;border:none;overflow:hidden;";
      t.find(".code-output").append(s);
      s.contentWindow.document.open();
      s.contentWindow.document.write(e);
      s.contentWindow.document.close();
      return !0;
    }
    var o = new FormData();
    o.append("lang", n);
    o.append("code", e);
    fetch(i, {
      method: "POST",
      body: o,
    })
      .then((e) => {
        console.log(e);
        return e.text();
      })
      .then((e) => {
        t.find(".code-output").html(e);
      })
      .catch((e) => {
        console.log(e);
        alert(e);
        return !1;
      });
  });
  $(".console-close").on("click", function () {
    $(this).parent().prev().prev().isInViewport(0) ||
      window.scrollTo({
        top: $(this).parent().prev().prev().offset().top - 50,
        behavior: "smooth",
      });
    $(this).hide();
    $(this).parent().hide();
  });
  d =
    "undefined" == typeof isQA
      ? "https://search.tutorialspoint.com/get_tp_search_data.php"
      : "https://search.tutorialspoint.com/get_qa_search_data.php";
  $("#search-strings").on("keyup", function () {
    var e = $("#search-strings").val();
    if ("" != e && 2 < e.length) {
      var t = new FormData();
      t.append("keyword", e);
      fetch(d, {
        method: "POST",
        body: t,
      })
        .then((e) => {
          t = null;
          return e.json();
        })
        .then((e) => {
          if (0 < e.length) {
            var t = '<div class="search-overlay"><ul>';
            "undefined" == typeof isQA
              ? e.forEach((e) => {
                  t =
                    t +
                    '<a href="' +
                    e.url +
                    '" target="_blank"><li class="clsHeadQuestion"><i class="fal fa-file-alt search-icons"></i> ' +
                    e.name +
                    "</li></a>";
                })
              : e.forEach((e) => {
                  t =
                    t +
                    '<a href="' +
                    e.question_url +
                    '" target="_blank"><li class="clsHeadQuestion"><i class="fa fa-external-link"></i> ' +
                    e.question_title +
                    "</li></a>";
                });
            t += '</ul><br/></div><div class="clear"></div>';
            $("#search-results").show();
            $("#search-results").html(t);
          } else {
            $("#search-results").hide();
            $("#search-results").html("");
          }
        })
        .catch((e) => {
          console.log(e);
          alert(e);
          return !1;
        });
    } else {
      $("#search-results").hide();
      $("#search-results").html("");
    }
  });
  $("#btnSearch").on("click", function () {
    var e = $("#search-strings").val();
    window.location.href = "https://www.tutorialspoint.com/search/" + e;
  });
  $(document).on("mouseup", function (e) {
    var t = $("#search-results");
    t.is(e.target) || 0 !== t.has(e.target).length || t.hide();
  });
});
