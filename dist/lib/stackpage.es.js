var Zm = Object.defineProperty;
var Xm = (e, t, r) => t in e ? Zm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var ue = (e, t, r) => Xm(e, typeof t != "symbol" ? t + "" : t, r);
import * as U from "react";
import fe, { createContext as Rn, useContext as Mr, useState as te, useCallback as Y, useRef as st, useLayoutEffect as ic, useMemo as Bt, useEffect as De, forwardRef as Qm, useImperativeHandle as eg, createElement as tg, Component as Dn, useReducer as rg, createRef as ng } from "react";
import { GridStack as gn } from "gridstack";
import { createPortal as sg } from "react-dom";
var ns = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Mn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Zu = { exports: {} }, Qs = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ag = fe, ig = Symbol.for("react.element"), og = Symbol.for("react.fragment"), lg = Object.prototype.hasOwnProperty, cg = ag.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, dg = { key: !0, ref: !0, __self: !0, __source: !0 };
function Xu(e, t, r) {
  var n, s = {}, a = null, i = null;
  r !== void 0 && (a = "" + r), t.key !== void 0 && (a = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (n in t) lg.call(t, n) && !dg.hasOwnProperty(n) && (s[n] = t[n]);
  if (e && e.defaultProps) for (n in t = e.defaultProps, t) s[n] === void 0 && (s[n] = t[n]);
  return { $$typeof: ig, type: e, key: a, ref: i, props: s, _owner: cg.current };
}
Qs.Fragment = og;
Qs.jsx = Xu;
Qs.jsxs = Xu;
Zu.exports = Qs;
var l = Zu.exports;
const Qu = Rn(null);
function Ln() {
  const e = Mr(Qu);
  if (!e)
    throw new Error(
      "useGridStackContext must be used within a GridStackProvider"
    );
  return e;
}
function ug({
  children: e,
  initialOptions: t
}) {
  const [r, n] = te(null), [s, a] = te(() => {
    var h;
    const u = /* @__PURE__ */ new Map(), f = (m) => {
      var b;
      m.id && m.content && u.set(m.id, m), (b = m.subGridOpts) != null && b.children && m.subGridOpts.children.forEach(($) => {
        f($);
      });
    };
    return (h = t.children) == null || h.forEach((m) => {
      f(m);
    }), u;
  }), i = Y(
    (u) => {
      const f = `widget-${Math.random().toString(36).substring(2, 15)}`, h = u(f);
      r == null || r.addWidget({ ...h, id: f }), a((m) => {
        const b = new Map(m);
        return b.set(f, h), b;
      });
    },
    [r]
  ), o = Y(
    (u) => {
      const f = `sub-grid-${Math.random().toString(36).substring(2, 15)}`, h = /* @__PURE__ */ new Map(), m = u(f, (b) => {
        const $ = `widget-${Math.random().toString(36).substring(2, 15)}`;
        return h.set($, b), { ...b, id: $ };
      });
      r == null || r.addWidget({ ...m, id: f }), a((b) => {
        const $ = new Map(b);
        return h.forEach((y, p) => {
          $.set(p, y);
        }), $;
      });
    },
    [r]
  ), c = Y(
    (u) => {
      r == null || r.removeWidget(u), a((f) => {
        const h = new Map(f);
        return h.delete(u), h;
      });
    },
    [r]
  ), d = Y(() => r == null ? void 0 : r.save(!0, !0, (u, f) => f), [r]);
  return /* @__PURE__ */ l.jsx(
    Qu.Provider,
    {
      value: {
        initialOptions: t,
        gridStack: r,
        addWidget: i,
        removeWidget: c,
        addSubGrid: o,
        saveOptions: d,
        _gridStack: {
          value: r,
          set: n
        },
        _rawWidgetMetaMap: {
          value: s,
          set: a
        }
      },
      children: e
    }
  );
}
const ef = Rn(null);
function fg() {
  const e = Mr(ef);
  if (!e)
    throw new Error(
      "useGridStackRenderContext must be used within a GridStackProvider"
    );
  return e;
}
var pg = typeof Element < "u", hg = typeof Map == "function", mg = typeof Set == "function", gg = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
function ys(e, t) {
  if (e === t) return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor) return !1;
    var r, n, s;
    if (Array.isArray(e)) {
      if (r = e.length, r != t.length) return !1;
      for (n = r; n-- !== 0; )
        if (!ys(e[n], t[n])) return !1;
      return !0;
    }
    var a;
    if (hg && e instanceof Map && t instanceof Map) {
      if (e.size !== t.size) return !1;
      for (a = e.entries(); !(n = a.next()).done; )
        if (!t.has(n.value[0])) return !1;
      for (a = e.entries(); !(n = a.next()).done; )
        if (!ys(n.value[1], t.get(n.value[0]))) return !1;
      return !0;
    }
    if (mg && e instanceof Set && t instanceof Set) {
      if (e.size !== t.size) return !1;
      for (a = e.entries(); !(n = a.next()).done; )
        if (!t.has(n.value[0])) return !1;
      return !0;
    }
    if (gg && ArrayBuffer.isView(e) && ArrayBuffer.isView(t)) {
      if (r = e.length, r != t.length) return !1;
      for (n = r; n-- !== 0; )
        if (e[n] !== t[n]) return !1;
      return !0;
    }
    if (e.constructor === RegExp) return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf && typeof e.valueOf == "function" && typeof t.valueOf == "function") return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString && typeof e.toString == "function" && typeof t.toString == "function") return e.toString() === t.toString();
    if (s = Object.keys(e), r = s.length, r !== Object.keys(t).length) return !1;
    for (n = r; n-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, s[n])) return !1;
    if (pg && e instanceof Element) return !1;
    for (n = r; n-- !== 0; )
      if (!((s[n] === "_owner" || s[n] === "__v" || s[n] === "__o") && e.$$typeof) && !ys(e[s[n]], t[s[n]]))
        return !1;
    return !0;
  }
  return e !== e && t !== t;
}
var yg = function(t, r) {
  try {
    return ys(t, r);
  } catch (n) {
    if ((n.message || "").match(/stack|recursion/i))
      return console.warn("react-fast-compare cannot handle circular refs"), !1;
    throw n;
  }
};
const bg = /* @__PURE__ */ Mn(yg), Pe = [];
for (let e = 0; e < 256; ++e)
  Pe.push((e + 256).toString(16).slice(1));
function vg(e, t = 0) {
  return (Pe[e[t + 0]] + Pe[e[t + 1]] + Pe[e[t + 2]] + Pe[e[t + 3]] + "-" + Pe[e[t + 4]] + Pe[e[t + 5]] + "-" + Pe[e[t + 6]] + Pe[e[t + 7]] + "-" + Pe[e[t + 8]] + Pe[e[t + 9]] + "-" + Pe[e[t + 10]] + Pe[e[t + 11]] + Pe[e[t + 12]] + Pe[e[t + 13]] + Pe[e[t + 14]] + Pe[e[t + 15]]).toLowerCase();
}
let Ga;
const $g = new Uint8Array(16);
function xg() {
  if (!Ga) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    Ga = crypto.getRandomValues.bind(crypto);
  }
  return Ga($g);
}
const wg = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), oc = { randomUUID: wg };
function _g(e, t, r) {
  var s;
  if (oc.randomUUID && !e)
    return oc.randomUUID();
  e = e || {};
  const n = e.random ?? ((s = e.rng) == null ? void 0 : s.call(e)) ?? xg();
  if (n.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, vg(n);
}
const jg = gn.prototype.resizeToContent;
gn.prototype.resizeToContent = function(e) {
  const t = e.querySelector(".grid-stack-item-content");
  if (t != null && t.firstElementChild)
    return jg.call(this, e);
};
function Sg({
  children: e,
  onGridStackDropEvent: t
}) {
  const {
    _gridStack: { value: r, set: n },
    initialOptions: s
  } = Ln(), a = st(/* @__PURE__ */ new Map()), i = st(null), o = st(s), c = Y(
    (u, f) => {
      f.id && a.current.set(f.id, u);
    },
    []
  ), d = Y(() => {
    if (i.current) {
      gn.renderCB = c;
      const u = gn.init(o.current, i.current);
      return gn.setupDragIn(
        ".grid-stack-item-widget",
        {
          appendTo: "body",
          helper: "clone",
          scroll: !1
        }
      ), u.on("dropped", function(f, h, m) {
        if (console.log("dropped....", m), m) {
          const b = m.el, $ = b.dataset.gsType;
          if ($ && t) {
            const y = {
              name: $,
              id: _g(),
              x: m.x || 0,
              y: m.y || 0,
              w: $ === "SubGrid" ? 12 : 4,
              // SubGrid takes full width
              h: $ === "SubGrid" ? 6 : 4
              // SubGrid is taller              
            };
            t(y), u.removeWidget(b, !0);
          }
        }
      }), u;
    }
    return null;
  }, [c, t]);
  return ic(() => {
    if (!bg(s, o.current) && r)
      try {
        r.removeAll(!1), r.destroy(!1), a.current.clear(), o.current = s, n(d());
      } catch (u) {
        console.error("Error reinitializing gridstack", u);
      }
  }, [s, r, d, n]), ic(() => {
    if (!r)
      try {
        n(d());
      } catch (u) {
        console.error("Error initializing gridstack", u);
      }
  }, [r, d, n]), /* @__PURE__ */ l.jsx(
    ef.Provider,
    {
      value: Bt(
        () => ({
          getWidgetContainer: (u) => a.current.get(u) || null
        }),
        // ! gridStack is required to reinitialize the grid when the options change
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [r]
      ),
      children: /* @__PURE__ */ l.jsx("div", { ref: i, children: r ? e : null })
    }
  );
}
const tf = Rn(null);
function c9() {
  const e = Mr(tf);
  if (!e)
    throw new Error(
      "useGridStackWidgetContext must be used within a GridStackWidgetProvider"
    );
  return e;
}
function Ng({
  widgetId: e
}) {
  const { removeWidget: t } = Ln(), [r, n] = U.useState(!1), [s, a] = U.useState({ top: 0, left: 0 }), i = U.useRef(null), o = (u) => {
    if (u.stopPropagation(), i.current) {
      const f = i.current.getBoundingClientRect();
      a({
        top: f.bottom + window.scrollY,
        left: f.left + window.scrollX
      });
    }
    n(!r);
  }, c = () => {
    n(!1);
  }, d = () => {
    var f;
    t(e);
    const u = document.querySelector(`[gs-id="${e}"]`);
    u && ((f = u.gridstackNode) != null && f.grid) && u.gridstackNode.grid.removeWidget(u, !0, !0), c();
  };
  return U.useEffect(() => {
    const u = (f) => {
      r && n(!1);
    };
    return document.addEventListener("click", u), () => {
      document.removeEventListener("click", u);
    };
  }, [r]), /* @__PURE__ */ l.jsxs("div", { className: "flex justify-end size-4", children: [
    /* @__PURE__ */ l.jsx("button", { className: "p-1 hover:bg-gray-200 rounded transition-colors", children: /* @__PURE__ */ l.jsxs(
      "svg",
      {
        className: "w-4 h-4 text-gray-600",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        children: [
          /* @__PURE__ */ l.jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            }
          ),
          /* @__PURE__ */ l.jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ l.jsx(
      "button",
      {
        ref: i,
        onClick: o,
        className: "p-1 hover:bg-gray-200 rounded transition-colors",
        "aria-haspopup": "true",
        "aria-expanded": r,
        children: /* @__PURE__ */ l.jsx(
          "svg",
          {
            className: "w-4 h-4 text-gray-600",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ l.jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              }
            )
          }
        )
      }
    ),
    r && /* @__PURE__ */ l.jsx(
      "div",
      {
        className: "fixed z-50 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 py-1",
        style: {
          top: `${s.top}px`,
          left: `${s.left}px`,
          transform: "translateX(-100%)"
        },
        onClick: (u) => u.stopPropagation(),
        children: /* @__PURE__ */ l.jsxs(
          "button",
          {
            onClick: d,
            className: "flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors",
            children: [
              /* @__PURE__ */ l.jsx(
                "svg",
                {
                  className: "w-4 h-4 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ l.jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    }
                  )
                }
              ),
              "Delete"
            ]
          }
        )
      }
    )
  ] });
}
function Eg({ widgetId: e, children: t }) {
  const r = st(null);
  return De(() => {
    var o;
    const n = r.current;
    if (!n) return;
    const s = n.closest(".grid-stack-item");
    if (!s || !((o = s.gridstackNode) != null && o.grid)) return;
    const a = () => {
      var d, u;
      const c = s.querySelector(".grid-stack-item-content");
      c != null && c.firstElementChild && s.gridstackNode && s.gridstackNode.grid && ((u = (d = s.gridstackNode) == null ? void 0 : d.grid) == null || u.resizeToContent(s));
    }, i = new ResizeObserver(() => a());
    return i.observe(n), a(), () => i.disconnect();
  }, [e]), /* @__PURE__ */ l.jsx(
    "div",
    {
      ref: r,
      className: "gridstack-measured-container",
      style: { width: "100%" },
      children: t
    }
  );
}
function Og(e) {
  let t = null, r = "", n = {};
  try {
    if (e.content) {
      const s = JSON.parse(e.content);
      r = s.name, n = s.props;
    }
  } catch (s) {
    t = s;
  }
  return { name: r, props: n, error: t };
}
function Cg({
  id: e,
  meta: t,
  WidgetComponent: r,
  widgetContainer: n,
  showMenubar: s,
  isSelected: a = !1,
  onWidgetSelect: i,
  componentProps: o
  // Add this
}) {
  const c = Og(t), d = o || c.props, u = (d == null ? void 0 : d.title) || `Widget ${e.slice(0, 4)}`, f = (m) => {
    i && i({
      id: e,
      name: c.name,
      props: d
      // Use the resolved props
    });
  }, h = /* @__PURE__ */ l.jsx(Eg, { widgetId: e, children: /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: `h-full w-full ${a ? "outline outline-2 outline-blue-400 outline-offset-1" : ""}`,
      onClick: f,
      children: [
        s && /* @__PURE__ */ l.jsxs("div", { className: "widget-header flex items-center justify-between bg-gray-100 border-b px-2 min-h-[36px]", children: [
          /* @__PURE__ */ l.jsx("div", { className: "font-medium truncate text-sm px-1", children: u }),
          /* @__PURE__ */ l.jsx(Ng, { widgetId: e })
        ] }),
        /* @__PURE__ */ l.jsxs("div", { className: "widget-body flex-1 min-h-[40px] cursor-pointer", children: [
          /* @__PURE__ */ l.jsx(r, { ...d }),
          " "
        ] })
      ]
    }
  ) });
  return /* @__PURE__ */ l.jsx(tf.Provider, { value: { widget: { id: e } }, children: sg(h, n) });
}
const eo = Rn(
  void 0
), Gt = () => {
  const e = Mr(eo);
  if (!e)
    throw new Error("useStackPage must be used within a StackPageProvider");
  return e;
}, rf = () => {
  const e = Mr(eo);
  if (!e)
    throw new Error(
      "useStackPageWidgetProps must be used within a StackPageProvider"
    );
  return {
    widgetProps: e.widgetProps,
    updateWidgetProps: e.updateWidgetProps
  };
};
function Ag(e) {
  let t = null, r = "", n = {};
  try {
    if (e.content) {
      const s = JSON.parse(e.content);
      r = s.name, n = s.props;
    }
  } catch (s) {
    t = s;
  }
  return { name: r, props: n, error: t };
}
function Pg({
  componentMap: e,
  showMenubar: t = !1,
  onWidgetSelect: r
}) {
  const { _rawWidgetMetaMap: n } = Ln(), { getWidgetContainer: s } = fg(), { widgetProps: a } = rf(), { selectedInstance: i } = Gt();
  return /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    Array.from(n.value.entries()).length === 0 && /* @__PURE__ */ l.jsxs("div", { className: "flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 p-8 text-center", children: [
      /* @__PURE__ */ l.jsx("div", { className: "text-4xl mb-4", children: "📦" }),
      /* @__PURE__ */ l.jsx("h3", { className: "text-lg font-medium mb-2", children: "Drag Components Here" }),
      /* @__PURE__ */ l.jsx("p", { className: "text-sm", children: "Drag components from the Components tab in the right panel to start building your layout" })
    ] }),
    Array.from(n.value.entries()).map(([o, c]) => {
      const { name: d, props: u } = Ag(c), f = e[d], h = s(o), m = a.get(o) || u;
      return !f || !h ? null : /* @__PURE__ */ l.jsx(
        Cg,
        {
          id: o,
          meta: c,
          WidgetComponent: f,
          widgetContainer: h,
          showMenubar: t,
          isSelected: o === (i == null ? void 0 : i.id),
          onWidgetSelect: r,
          componentProps: m
        },
        o
      );
    })
  ] });
}
const nf = Rn(void 0), d9 = () => {
  const e = Mr(nf);
  if (!e)
    throw new Error("useLocale must be used within a LocaleProvider");
  return e;
}, u9 = ({ children: e, defaultLocale: t = "en-US" }) => {
  const [r, n] = te(t);
  return /* @__PURE__ */ l.jsx(nf.Provider, { value: { locale: r, setLocale: n }, children: e });
};
function Tg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ U.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ U.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ U.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const lc = /* @__PURE__ */ U.forwardRef(Tg);
function Ig({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ U.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ U.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ U.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
  }));
}
const kg = /* @__PURE__ */ U.forwardRef(Ig);
function Fg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ U.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ U.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ U.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
  }));
}
const sf = /* @__PURE__ */ U.forwardRef(Fg);
function Rg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ U.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ U.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ U.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
  }));
}
const Dg = /* @__PURE__ */ U.forwardRef(Rg);
function Mg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ U.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ U.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ U.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m19.5 8.25-7.5 7.5-7.5-7.5"
  }));
}
const af = /* @__PURE__ */ U.forwardRef(Mg);
function Lg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ U.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ U.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ U.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 19.5 8.25 12l7.5-7.5"
  }));
}
const cc = /* @__PURE__ */ U.forwardRef(Lg);
function Ug({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ U.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ U.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ U.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m8.25 4.5 7.5 7.5-7.5 7.5"
  }));
}
const dc = /* @__PURE__ */ U.forwardRef(Ug);
function Wg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ U.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ U.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ U.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m4.5 15.75 7.5-7.5 7.5 7.5"
  }));
}
const of = /* @__PURE__ */ U.forwardRef(Wg);
function Vg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ U.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ U.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ U.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
  }));
}
const Bg = /* @__PURE__ */ U.forwardRef(Vg);
function zg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ U.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ U.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ U.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
  }));
}
const qg = /* @__PURE__ */ U.forwardRef(zg);
function Kg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ U.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ U.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ U.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
  }));
}
const Gg = /* @__PURE__ */ U.forwardRef(Kg);
function Hg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ U.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ U.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ U.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
  }));
}
const uc = /* @__PURE__ */ U.forwardRef(Hg);
function Jg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ U.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ U.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ U.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
  }));
}
const Yg = /* @__PURE__ */ U.forwardRef(Jg);
function Zg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ U.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ U.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ U.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
  }), /* @__PURE__ */ U.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
  }));
}
const Xg = /* @__PURE__ */ U.forwardRef(Zg);
function Qg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ U.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ U.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ U.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
  }));
}
const ey = /* @__PURE__ */ U.forwardRef(Qg);
function ty({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ U.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ U.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ U.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
  }));
}
const ry = /* @__PURE__ */ U.forwardRef(ty);
function ny({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ U.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ U.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ U.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
  }));
}
const sy = /* @__PURE__ */ U.forwardRef(ny);
function ay({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ U.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ U.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ U.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
  }));
}
const iy = /* @__PURE__ */ U.forwardRef(ay);
function oy({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ U.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ U.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ U.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 4.5v15m7.5-7.5h-15"
  }));
}
const ly = /* @__PURE__ */ U.forwardRef(oy);
function cy({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ U.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ U.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ U.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
  }));
}
const Ps = /* @__PURE__ */ U.forwardRef(cy);
function dy({ content: e }) {
  return /* @__PURE__ */ l.jsx("div", { className: "flex items-start p-2 bg-white border rounded shadow-sm text-left", children: /* @__PURE__ */ l.jsx("div", { children: /* @__PURE__ */ l.jsx("p", { className: "text-sm", children: e }) }) });
}
const wi = "1rem", _i = [
  //{ c: 1, w: 300 },   // 1 column on screens < 300px
  { c: 1, w: 500 },
  // 2 columns between 300px - 500px
  { c: 3, w: 800 },
  // 4 columns between 500px - 800px
  { c: 6, w: 1024 }
  // 6 columns between 800px - 1024px
  //{ c: 8, w: 1200 },  // 8 columns on screens > 1200px
], Ha = {
  acceptWidgets: !0,
  removable: "#trash",
  sizeToContent: !0,
  resizable: { handles: "se" },
  minRow: 10,
  columnOpts: {
    breakpointForWindow: !0,
    breakpoints: _i,
    layout: "moveScale",
    columnMax: 12
  },
  margin: 5,
  cellHeight: wi,
  subGridDynamic: !0,
  // v7 api to create sub-grids on the fly
  subGridOpts: {
    acceptWidgets: !0,
    removable: "#trash",
    resizable: { handles: "se" },
    sizeToContent: !0,
    subGridDynamic: !0,
    columnOpts: {
      breakpoints: _i,
      layout: "moveScale"
    },
    margin: 5,
    minRow: 1,
    cellHeight: wi
  },
  children: []
}, uy = {
  acceptWidgets: !0,
  removable: "#trash",
  resizable: { handles: "se" },
  sizeToContent: !0,
  subGridDynamic: !0,
  // v7 api to create sub-grids on the fly
  subGridOpts: {
    acceptWidgets: !0,
    removable: "#trash",
    resizable: { handles: "se" },
    sizeToContent: !0,
    columnOpts: {
      breakpoints: _i,
      layout: "moveScale"
    },
    margin: 5,
    minRow: 6,
    cellHeight: wi,
    children: []
  },
  children: []
}, fc = {
  Text: {
    content: "Any content other than text are what we call cards. Cards can be accessed by clicking the ➕ button or typing / at the beginning of a paragraph.\nEven better, continue typing to find the card you're looking for, hit enter, and avoid dragging your mouse altogether.\nSome cards have a handy little shortcut, to keep you on track and in flow. Use --- to divide your paragraphs with a line, or ``` to add a code block. You can also drag and drop images directly into the editor to bypass the menu. \nAny content other than text are what we call cards. Cards can be accessed by clicking the ➕ button or typing / at the beginning of a paragraph.",
    title: "This is text card"
  }
}, pc = {
  Text: dy
}, lf = (e) => {
  if (e) {
    const t = e();
    return { ...pc, ...t };
  }
  return pc;
}, fy = (e) => {
  if (e) {
    const t = e();
    return { ...fc, ...t };
  }
  return fc;
}, py = Qm((e, t) => {
  const { addWidget: r, addSubGrid: n, saveOptions: s, _rawWidgetMetaMap: a } = Ln();
  return eg(t, () => ({
    saveLayout: () => s(),
    addWidget: r,
    addSubGrid: n,
    rawWidgetMetaMap: a
  })), null;
});
function hy({ pageInfo: e }) {
  const [t, r] = te(void 0);
  return De(() => {
    e && r(e);
  }, [e]), /* @__PURE__ */ l.jsx("div", { children: /* @__PURE__ */ l.jsx(
    "div",
    {
      style: {
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(2, 1fr)"
      },
      children: /* @__PURE__ */ l.jsx("div", { id: "pageinfo", children: /* @__PURE__ */ l.jsx(
        "pre",
        {
          style: {
            backgroundColor: "#f3f4f6",
            padding: "1rem",
            borderRadius: "0.25rem",
            overflow: "auto"
          },
          children: JSON.stringify(t || {}, null, 2)
        }
      ) })
    }
  ) });
}
function my({
  isOpen: e,
  pageInfo: t,
  resetOpenInfo: r
}) {
  const [n, s] = U.useState(!1);
  U.useEffect(() => {
  }, [e, t]);
  const a = () => {
    r(!1);
  }, i = () => {
    var c;
    navigator.clipboard.writeText(
      ((c = document.getElementById("pageinfo")) == null ? void 0 : c.innerText) || ""
    ), s(!0), setTimeout(() => {
      s(!1);
    }, 3e3);
  }, o = (c) => {
    c.target === c.currentTarget && a();
  };
  return e ? /* @__PURE__ */ l.jsx(
    "div",
    {
      className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
      onClick: o,
      children: /* @__PURE__ */ l.jsxs("div", { className: "bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col", children: [
        /* @__PURE__ */ l.jsxs("div", { className: "flex items-center justify-between p-4 border-b flex-shrink-0", children: [
          /* @__PURE__ */ l.jsx("h2", { className: "text-lg font-semibold truncate mr-2", children: "Page Information" }),
          /* @__PURE__ */ l.jsxs("div", { className: "flex items-center space-x-1 flex-shrink-0", children: [
            /* @__PURE__ */ l.jsxs(
              "button",
              {
                onClick: i,
                className: "p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center relative",
                "aria-label": "Copy page info",
                children: [
                  /* @__PURE__ */ l.jsx(
                    "svg",
                    {
                      className: "w-5 h-5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ l.jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        }
                      )
                    }
                  ),
                  n && /* @__PURE__ */ l.jsx("span", { className: "absolute -top-8 -right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap", children: "copied" })
                ]
              }
            ),
            /* @__PURE__ */ l.jsx(
              "button",
              {
                onClick: a,
                className: "p-2 hover:bg-gray-100 rounded-full transition-colors",
                "aria-label": "Close",
                children: /* @__PURE__ */ l.jsx(
                  "svg",
                  {
                    className: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ l.jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M6 18L18 6M6 6l12 12"
                      }
                    )
                  }
                )
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ l.jsx("div", { className: "p-4 overflow-y-auto flex-1", children: /* @__PURE__ */ l.jsx(hy, { pageInfo: t }) }),
        /* @__PURE__ */ l.jsx("div", { className: "flex justify-end p-4 border-t flex-shrink-0", children: /* @__PURE__ */ l.jsx(
          "button",
          {
            onClick: a,
            className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors w-full sm:w-auto",
            autoFocus: !0,
            children: "Close"
          }
        ) })
      ] })
    }
  ) : null;
}
function gy({ children: e }) {
  const [t, r] = te(
    null
  ), [n, s] = te(null), [a, i] = te({
    type: "page",
    title: "Untitled Page",
    status: "draft",
    margin: "5",
    padding: "10px",
    background: "#ffffff",
    showMenubar: !0,
    image: "",
    lists: [],
    dataSources: []
  }), [o, c] = te("components"), [d, u] = te(
    /* @__PURE__ */ new Map()
  ), f = Y((m, b) => {
    u(($) => {
      const y = new Map($);
      return y.set(m, b), y;
    });
  }, []), h = {
    selectedComponent: t,
    setSelectedComponent: r,
    selectedInstance: n,
    setSelectedInstance: s,
    attributes: a,
    setPageAttributes: i,
    activeTab: o,
    setActiveTab: c,
    widgetProps: d,
    updateWidgetProps: f
  };
  return /* @__PURE__ */ l.jsx(eo.Provider, { value: h, children: e });
}
const yy = (e) => {
  const { widgetProps: t, updateWidgetProps: r } = rf();
  return {
    getProps: () => {
      if (e)
        return t.get(e);
    },
    setProps: (i) => {
      e && r(e, i);
    },
    updateProps: (i) => {
      if (!e) return;
      const o = t.get(e) || {};
      r(e, { ...o, ...i });
    },
    hasProps: e ? t.has(e) : !1
  };
};
function ie(e) {
  return typeof e != "object" || e === null || typeof e.lastModified == "number" && typeof File < "u" && e instanceof File || typeof e.getMonth == "function" && typeof Date < "u" && e instanceof Date ? !1 : !Array.isArray(e);
}
function by(e) {
  return e.additionalItems === !0 && console.warn("additionalItems=true is currently not supported"), ie(e.additionalItems);
}
function hc(e) {
  if (e === "")
    return;
  if (e === null)
    return null;
  if (/\.$/.test(e) || /\.0$/.test(e) || /\.\d*0$/.test(e))
    return e;
  const t = Number(e);
  return typeof t == "number" && !Number.isNaN(t) ? t : e;
}
const Un = "__additional_property", ji = "additionalProperties", Lr = "allOf", nt = "anyOf", Ot = "const", vy = "default", ea = "dependencies", $y = "enum", ze = "__errors", Wt = "$id", xy = "if", zt = "items", wy = "_$junk_option_schema_id$_", bs = "$name", qe = "oneOf", Ne = "properties", _y = "required", Ts = "submitButtonOptions", Ce = "$ref", to = "__rjsf_additionalProperties", cf = "__rjsf_rootSchema", jy = "ui:field", ro = "ui:widget", yn = "ui:options", Sy = "ui:globalOptions";
function ae(e = {}, t = {}) {
  return Object.keys(e).filter((r) => r.indexOf("ui:") === 0).reduce((r, n) => {
    const s = e[n];
    return n === ro && ie(s) ? (console.error("Setting options via ui:widget object is no longer supported, use ui:options instead"), r) : n === yn && ie(s) ? { ...r, ...s } : { ...r, [n.substring(3)]: s };
  }, { ...t });
}
function Ny(e, t = {}, r) {
  if (!e.additionalProperties)
    return !1;
  const { expandable: n = !0 } = ae(t);
  return n === !1 ? n : e.maxProperties !== void 0 && r ? Object.keys(r).length < e.maxProperties : !0;
}
var df = typeof global == "object" && global && global.Object === Object && global, Ey = typeof self == "object" && self && self.Object === Object && self, gt = df || Ey || Function("return this")(), Ze = gt.Symbol, uf = Object.prototype, Oy = uf.hasOwnProperty, Cy = uf.toString, an = Ze ? Ze.toStringTag : void 0;
function Ay(e) {
  var t = Oy.call(e, an), r = e[an];
  try {
    e[an] = void 0;
    var n = !0;
  } catch {
  }
  var s = Cy.call(e);
  return n && (t ? e[an] = r : delete e[an]), s;
}
var Py = Object.prototype, Ty = Py.toString;
function Iy(e) {
  return Ty.call(e);
}
var ky = "[object Null]", Fy = "[object Undefined]", mc = Ze ? Ze.toStringTag : void 0;
function Tt(e) {
  return e == null ? e === void 0 ? Fy : ky : mc && mc in Object(e) ? Ay(e) : Iy(e);
}
function ff(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var ta = ff(Object.getPrototypeOf, Object);
function Xe(e) {
  return e != null && typeof e == "object";
}
var Ry = "[object Object]", Dy = Function.prototype, My = Object.prototype, pf = Dy.toString, Ly = My.hasOwnProperty, Uy = pf.call(Object);
function rr(e) {
  if (!Xe(e) || Tt(e) != Ry)
    return !1;
  var t = ta(e);
  if (t === null)
    return !0;
  var r = Ly.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && pf.call(r) == Uy;
}
function Is(e) {
  const t = {
    // We store the list of errors for this node in a property named __errors
    // to avoid name collision with a possible sub schema field named
    // 'errors' (see `utils.toErrorSchema`).
    [ze]: [],
    addError(r) {
      this[ze].push(r);
    }
  };
  if (Array.isArray(e))
    return e.reduce((r, n, s) => ({ ...r, [s]: Is(n) }), t);
  if (rr(e)) {
    const r = e;
    return Object.keys(r).reduce((n, s) => ({ ...n, [s]: Is(r[s]) }), t);
  }
  return t;
}
function Wy() {
  this.__data__ = [], this.size = 0;
}
function Wn(e, t) {
  return e === t || e !== e && t !== t;
}
function ra(e, t) {
  for (var r = e.length; r--; )
    if (Wn(e[r][0], t))
      return r;
  return -1;
}
var Vy = Array.prototype, By = Vy.splice;
function zy(e) {
  var t = this.__data__, r = ra(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : By.call(t, r, 1), --this.size, !0;
}
function qy(e) {
  var t = this.__data__, r = ra(t, e);
  return r < 0 ? void 0 : t[r][1];
}
function Ky(e) {
  return ra(this.__data__, e) > -1;
}
function Gy(e, t) {
  var r = this.__data__, n = ra(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
function It(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
It.prototype.clear = Wy;
It.prototype.delete = zy;
It.prototype.get = qy;
It.prototype.has = Ky;
It.prototype.set = Gy;
function Hy() {
  this.__data__ = new It(), this.size = 0;
}
function Jy(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
function Yy(e) {
  return this.__data__.get(e);
}
function Zy(e) {
  return this.__data__.has(e);
}
function ve(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Xy = "[object AsyncFunction]", Qy = "[object Function]", e0 = "[object GeneratorFunction]", t0 = "[object Proxy]";
function na(e) {
  if (!ve(e))
    return !1;
  var t = Tt(e);
  return t == Qy || t == e0 || t == Xy || t == t0;
}
var Ja = gt["__core-js_shared__"], gc = function() {
  var e = /[^.]+$/.exec(Ja && Ja.keys && Ja.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function r0(e) {
  return !!gc && gc in e;
}
var n0 = Function.prototype, s0 = n0.toString;
function lr(e) {
  if (e != null) {
    try {
      return s0.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var a0 = /[\\^$.*+?()[\]{}|]/g, i0 = /^\[object .+?Constructor\]$/, o0 = Function.prototype, l0 = Object.prototype, c0 = o0.toString, d0 = l0.hasOwnProperty, u0 = RegExp(
  "^" + c0.call(d0).replace(a0, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function f0(e) {
  if (!ve(e) || r0(e))
    return !1;
  var t = na(e) ? u0 : i0;
  return t.test(lr(e));
}
function p0(e, t) {
  return e == null ? void 0 : e[t];
}
function cr(e, t) {
  var r = p0(e, t);
  return f0(r) ? r : void 0;
}
var En = cr(gt, "Map"), On = cr(Object, "create");
function h0() {
  this.__data__ = On ? On(null) : {}, this.size = 0;
}
function m0(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var g0 = "__lodash_hash_undefined__", y0 = Object.prototype, b0 = y0.hasOwnProperty;
function v0(e) {
  var t = this.__data__;
  if (On) {
    var r = t[e];
    return r === g0 ? void 0 : r;
  }
  return b0.call(t, e) ? t[e] : void 0;
}
var $0 = Object.prototype, x0 = $0.hasOwnProperty;
function w0(e) {
  var t = this.__data__;
  return On ? t[e] !== void 0 : x0.call(t, e);
}
var _0 = "__lodash_hash_undefined__";
function j0(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = On && t === void 0 ? _0 : t, this;
}
function nr(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
nr.prototype.clear = h0;
nr.prototype.delete = m0;
nr.prototype.get = v0;
nr.prototype.has = w0;
nr.prototype.set = j0;
function S0() {
  this.size = 0, this.__data__ = {
    hash: new nr(),
    map: new (En || It)(),
    string: new nr()
  };
}
function N0(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function sa(e, t) {
  var r = e.__data__;
  return N0(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
function E0(e) {
  var t = sa(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function O0(e) {
  return sa(this, e).get(e);
}
function C0(e) {
  return sa(this, e).has(e);
}
function A0(e, t) {
  var r = sa(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
function kt(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
kt.prototype.clear = S0;
kt.prototype.delete = E0;
kt.prototype.get = O0;
kt.prototype.has = C0;
kt.prototype.set = A0;
var P0 = 200;
function T0(e, t) {
  var r = this.__data__;
  if (r instanceof It) {
    var n = r.__data__;
    if (!En || n.length < P0 - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new kt(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
function at(e) {
  var t = this.__data__ = new It(e);
  this.size = t.size;
}
at.prototype.clear = Hy;
at.prototype.delete = Jy;
at.prototype.get = Yy;
at.prototype.has = Zy;
at.prototype.set = T0;
var I0 = "__lodash_hash_undefined__";
function k0(e) {
  return this.__data__.set(e, I0), this;
}
function F0(e) {
  return this.__data__.has(e);
}
function Er(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new kt(); ++t < r; )
    this.add(e[t]);
}
Er.prototype.add = Er.prototype.push = k0;
Er.prototype.has = F0;
function R0(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
function no(e, t) {
  return e.has(t);
}
var D0 = 1, M0 = 2;
function hf(e, t, r, n, s, a) {
  var i = r & D0, o = e.length, c = t.length;
  if (o != c && !(i && c > o))
    return !1;
  var d = a.get(e), u = a.get(t);
  if (d && u)
    return d == t && u == e;
  var f = -1, h = !0, m = r & M0 ? new Er() : void 0;
  for (a.set(e, t), a.set(t, e); ++f < o; ) {
    var b = e[f], $ = t[f];
    if (n)
      var y = i ? n($, b, f, t, e, a) : n(b, $, f, e, t, a);
    if (y !== void 0) {
      if (y)
        continue;
      h = !1;
      break;
    }
    if (m) {
      if (!R0(t, function(p, g) {
        if (!no(m, g) && (b === p || s(b, p, r, n, a)))
          return m.push(g);
      })) {
        h = !1;
        break;
      }
    } else if (!(b === $ || s(b, $, r, n, a))) {
      h = !1;
      break;
    }
  }
  return a.delete(e), a.delete(t), h;
}
var ks = gt.Uint8Array;
function L0(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n, s) {
    r[++t] = [s, n];
  }), r;
}
function so(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n) {
    r[++t] = n;
  }), r;
}
var U0 = 1, W0 = 2, V0 = "[object Boolean]", B0 = "[object Date]", z0 = "[object Error]", q0 = "[object Map]", K0 = "[object Number]", G0 = "[object RegExp]", H0 = "[object Set]", J0 = "[object String]", Y0 = "[object Symbol]", Z0 = "[object ArrayBuffer]", X0 = "[object DataView]", yc = Ze ? Ze.prototype : void 0, Ya = yc ? yc.valueOf : void 0;
function Q0(e, t, r, n, s, a, i) {
  switch (r) {
    case X0:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case Z0:
      return !(e.byteLength != t.byteLength || !a(new ks(e), new ks(t)));
    case V0:
    case B0:
    case K0:
      return Wn(+e, +t);
    case z0:
      return e.name == t.name && e.message == t.message;
    case G0:
    case J0:
      return e == t + "";
    case q0:
      var o = L0;
    case H0:
      var c = n & U0;
      if (o || (o = so), e.size != t.size && !c)
        return !1;
      var d = i.get(e);
      if (d)
        return d == t;
      n |= W0, i.set(e, t);
      var u = hf(o(e), o(t), n, s, a, i);
      return i.delete(e), u;
    case Y0:
      if (Ya)
        return Ya.call(e) == Ya.call(t);
  }
  return !1;
}
function ao(e, t) {
  for (var r = -1, n = t.length, s = e.length; ++r < n; )
    e[s + r] = t[r];
  return e;
}
var Ae = Array.isArray;
function mf(e, t, r) {
  var n = t(e);
  return Ae(e) ? n : ao(n, r(e));
}
function eb(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, s = 0, a = []; ++r < n; ) {
    var i = e[r];
    t(i, r, e) && (a[s++] = i);
  }
  return a;
}
function gf() {
  return [];
}
var tb = Object.prototype, rb = tb.propertyIsEnumerable, bc = Object.getOwnPropertySymbols, io = bc ? function(e) {
  return e == null ? [] : (e = Object(e), eb(bc(e), function(t) {
    return rb.call(e, t);
  }));
} : gf;
function yf(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var nb = "[object Arguments]";
function vc(e) {
  return Xe(e) && Tt(e) == nb;
}
var bf = Object.prototype, sb = bf.hasOwnProperty, ab = bf.propertyIsEnumerable, Or = vc(/* @__PURE__ */ function() {
  return arguments;
}()) ? vc : function(e) {
  return Xe(e) && sb.call(e, "callee") && !ab.call(e, "callee");
};
function ib() {
  return !1;
}
var vf = typeof exports == "object" && exports && !exports.nodeType && exports, $c = vf && typeof module == "object" && module && !module.nodeType && module, ob = $c && $c.exports === vf, xc = ob ? gt.Buffer : void 0, lb = xc ? xc.isBuffer : void 0, sr = lb || ib, cb = 9007199254740991, db = /^(?:0|[1-9]\d*)$/;
function aa(e, t) {
  var r = typeof e;
  return t = t ?? cb, !!t && (r == "number" || r != "symbol" && db.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var ub = 9007199254740991;
function oo(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= ub;
}
var fb = "[object Arguments]", pb = "[object Array]", hb = "[object Boolean]", mb = "[object Date]", gb = "[object Error]", yb = "[object Function]", bb = "[object Map]", vb = "[object Number]", $b = "[object Object]", xb = "[object RegExp]", wb = "[object Set]", _b = "[object String]", jb = "[object WeakMap]", Sb = "[object ArrayBuffer]", Nb = "[object DataView]", Eb = "[object Float32Array]", Ob = "[object Float64Array]", Cb = "[object Int8Array]", Ab = "[object Int16Array]", Pb = "[object Int32Array]", Tb = "[object Uint8Array]", Ib = "[object Uint8ClampedArray]", kb = "[object Uint16Array]", Fb = "[object Uint32Array]", $e = {};
$e[Eb] = $e[Ob] = $e[Cb] = $e[Ab] = $e[Pb] = $e[Tb] = $e[Ib] = $e[kb] = $e[Fb] = !0;
$e[fb] = $e[pb] = $e[Sb] = $e[hb] = $e[Nb] = $e[mb] = $e[gb] = $e[yb] = $e[bb] = $e[vb] = $e[$b] = $e[xb] = $e[wb] = $e[_b] = $e[jb] = !1;
function Rb(e) {
  return Xe(e) && oo(e.length) && !!$e[Tt(e)];
}
function lo(e) {
  return function(t) {
    return e(t);
  };
}
var $f = typeof exports == "object" && exports && !exports.nodeType && exports, bn = $f && typeof module == "object" && module && !module.nodeType && module, Db = bn && bn.exports === $f, Za = Db && df.process, Cr = function() {
  try {
    var e = bn && bn.require && bn.require("util").types;
    return e || Za && Za.binding && Za.binding("util");
  } catch {
  }
}(), wc = Cr && Cr.isTypedArray, Vn = wc ? lo(wc) : Rb, Mb = Object.prototype, Lb = Mb.hasOwnProperty;
function xf(e, t) {
  var r = Ae(e), n = !r && Or(e), s = !r && !n && sr(e), a = !r && !n && !s && Vn(e), i = r || n || s || a, o = i ? yf(e.length, String) : [], c = o.length;
  for (var d in e)
    (t || Lb.call(e, d)) && !(i && // Safari 9 has enumerable `arguments.length` in strict mode.
    (d == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (d == "offset" || d == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    a && (d == "buffer" || d == "byteLength" || d == "byteOffset") || // Skip index properties.
    aa(d, c))) && o.push(d);
  return o;
}
var Ub = Object.prototype;
function ia(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || Ub;
  return e === r;
}
var Wb = ff(Object.keys, Object), Vb = Object.prototype, Bb = Vb.hasOwnProperty;
function wf(e) {
  if (!ia(e))
    return Wb(e);
  var t = [];
  for (var r in Object(e))
    Bb.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
function Ur(e) {
  return e != null && oo(e.length) && !na(e);
}
function dt(e) {
  return Ur(e) ? xf(e) : wf(e);
}
function Si(e) {
  return mf(e, dt, io);
}
var zb = 1, qb = Object.prototype, Kb = qb.hasOwnProperty;
function Gb(e, t, r, n, s, a) {
  var i = r & zb, o = Si(e), c = o.length, d = Si(t), u = d.length;
  if (c != u && !i)
    return !1;
  for (var f = c; f--; ) {
    var h = o[f];
    if (!(i ? h in t : Kb.call(t, h)))
      return !1;
  }
  var m = a.get(e), b = a.get(t);
  if (m && b)
    return m == t && b == e;
  var $ = !0;
  a.set(e, t), a.set(t, e);
  for (var y = i; ++f < c; ) {
    h = o[f];
    var p = e[h], g = t[h];
    if (n)
      var v = i ? n(g, p, h, t, e, a) : n(p, g, h, e, t, a);
    if (!(v === void 0 ? p === g || s(p, g, r, n, a) : v)) {
      $ = !1;
      break;
    }
    y || (y = h == "constructor");
  }
  if ($ && !y) {
    var _ = e.constructor, w = t.constructor;
    _ != w && "constructor" in e && "constructor" in t && !(typeof _ == "function" && _ instanceof _ && typeof w == "function" && w instanceof w) && ($ = !1);
  }
  return a.delete(e), a.delete(t), $;
}
var Ni = cr(gt, "DataView"), Ei = cr(gt, "Promise"), _r = cr(gt, "Set"), Oi = cr(gt, "WeakMap"), _c = "[object Map]", Hb = "[object Object]", jc = "[object Promise]", Sc = "[object Set]", Nc = "[object WeakMap]", Ec = "[object DataView]", Jb = lr(Ni), Yb = lr(En), Zb = lr(Ei), Xb = lr(_r), Qb = lr(Oi), Je = Tt;
(Ni && Je(new Ni(new ArrayBuffer(1))) != Ec || En && Je(new En()) != _c || Ei && Je(Ei.resolve()) != jc || _r && Je(new _r()) != Sc || Oi && Je(new Oi()) != Nc) && (Je = function(e) {
  var t = Tt(e), r = t == Hb ? e.constructor : void 0, n = r ? lr(r) : "";
  if (n)
    switch (n) {
      case Jb:
        return Ec;
      case Yb:
        return _c;
      case Zb:
        return jc;
      case Xb:
        return Sc;
      case Qb:
        return Nc;
    }
  return t;
});
var ev = 1, Oc = "[object Arguments]", Cc = "[object Array]", ss = "[object Object]", tv = Object.prototype, Ac = tv.hasOwnProperty;
function rv(e, t, r, n, s, a) {
  var i = Ae(e), o = Ae(t), c = i ? Cc : Je(e), d = o ? Cc : Je(t);
  c = c == Oc ? ss : c, d = d == Oc ? ss : d;
  var u = c == ss, f = d == ss, h = c == d;
  if (h && sr(e)) {
    if (!sr(t))
      return !1;
    i = !0, u = !1;
  }
  if (h && !u)
    return a || (a = new at()), i || Vn(e) ? hf(e, t, r, n, s, a) : Q0(e, t, c, r, n, s, a);
  if (!(r & ev)) {
    var m = u && Ac.call(e, "__wrapped__"), b = f && Ac.call(t, "__wrapped__");
    if (m || b) {
      var $ = m ? e.value() : e, y = b ? t.value() : t;
      return a || (a = new at()), s($, y, r, n, a);
    }
  }
  return h ? (a || (a = new at()), Gb(e, t, r, n, s, a)) : !1;
}
function oa(e, t, r, n, s) {
  return e === t ? !0 : e == null || t == null || !Xe(e) && !Xe(t) ? e !== e && t !== t : rv(e, t, r, n, oa, s);
}
function nv(e, t, r) {
  r = typeof r == "function" ? r : void 0;
  var n = r ? r(e, t) : void 0;
  return n === void 0 ? oa(e, t, void 0, r) : !!n;
}
function we(e, t) {
  return nv(e, t, (r, n) => {
    if (typeof r == "function" && typeof n == "function")
      return !0;
  });
}
var sv = "[object Symbol]";
function Bn(e) {
  return typeof e == "symbol" || Xe(e) && Tt(e) == sv;
}
var av = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, iv = /^\w*$/;
function co(e, t) {
  if (Ae(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || Bn(e) ? !0 : iv.test(e) || !av.test(e) || t != null && e in Object(t);
}
var ov = "Expected a function";
function uo(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(ov);
  var r = function() {
    var n = arguments, s = t ? t.apply(this, n) : n[0], a = r.cache;
    if (a.has(s))
      return a.get(s);
    var i = e.apply(this, n);
    return r.cache = a.set(s, i) || a, i;
  };
  return r.cache = new (uo.Cache || kt)(), r;
}
uo.Cache = kt;
var lv = 500;
function cv(e) {
  var t = uo(e, function(n) {
    return r.size === lv && r.clear(), n;
  }), r = t.cache;
  return t;
}
var dv = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, uv = /\\(\\)?/g, _f = cv(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(dv, function(r, n, s, a) {
    t.push(s ? a.replace(uv, "$1") : n || r);
  }), t;
});
function la(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, s = Array(n); ++r < n; )
    s[r] = t(e[r], r, e);
  return s;
}
var Pc = Ze ? Ze.prototype : void 0, Tc = Pc ? Pc.toString : void 0;
function jf(e) {
  if (typeof e == "string")
    return e;
  if (Ae(e))
    return la(e, jf) + "";
  if (Bn(e))
    return Tc ? Tc.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function fo(e) {
  return e == null ? "" : jf(e);
}
function Wr(e, t) {
  return Ae(e) ? e : co(e, t) ? [e] : _f(fo(e));
}
function dr(e) {
  if (typeof e == "string" || Bn(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function ca(e, t) {
  t = Wr(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[dr(t[r++])];
  return r && r == n ? e : void 0;
}
function G(e, t, r) {
  var n = e == null ? void 0 : ca(e, t);
  return n === void 0 ? r : n;
}
var fv = "[object Map]", pv = "[object Set]", hv = Object.prototype, mv = hv.hasOwnProperty;
function Ar(e) {
  if (e == null)
    return !0;
  if (Ur(e) && (Ae(e) || typeof e == "string" || typeof e.splice == "function" || sr(e) || Vn(e) || Or(e)))
    return !e.length;
  var t = Je(e);
  if (t == fv || t == pv)
    return !e.size;
  if (ia(e))
    return !wf(e).length;
  for (var r in e)
    if (mv.call(e, r))
      return !1;
  return !0;
}
var da = {}, gv = /~/, yv = /~[01]/g;
function bv(e) {
  switch (e) {
    case "~1":
      return "/";
    case "~0":
      return "~";
  }
  throw new Error("Invalid tilde escape: " + e);
}
function Sf(e) {
  return gv.test(e) ? e.replace(yv, bv) : e;
}
function vv(e, t, r) {
  for (var n, s, a = 1, i = t.length; a < i; ) {
    if (t[a] === "constructor" || t[a] === "prototype" || t[a] === "__proto__") return e;
    if (n = Sf(t[a++]), s = i > a, typeof e[n] > "u" && (Array.isArray(e) && n === "-" && (n = e.length), s && (t[a] !== "" && t[a] < 1 / 0 || t[a] === "-" ? e[n] = [] : e[n] = {})), !s) break;
    e = e[n];
  }
  var o = e[n];
  return r === void 0 ? delete e[n] : e[n] = r, o;
}
function po(e) {
  if (typeof e == "string") {
    if (e = e.split("/"), e[0] === "") return e;
    throw new Error("Invalid JSON pointer.");
  } else if (Array.isArray(e)) {
    for (const t of e)
      if (typeof t != "string" && typeof t != "number")
        throw new Error("Invalid JSON pointer. Must be of type string or number.");
    return e;
  }
  throw new Error("Invalid JSON pointer.");
}
function Nf(e, t) {
  if (typeof e != "object") throw new Error("Invalid input object.");
  t = po(t);
  var r = t.length;
  if (r === 1) return e;
  for (var n = 1; n < r; ) {
    if (e = e[Sf(t[n++])], r === n) return e;
    if (typeof e != "object" || e === null) return;
  }
}
function Ef(e, t, r) {
  if (typeof e != "object") throw new Error("Invalid input object.");
  if (t = po(t), t.length === 0) throw new Error("Invalid JSON pointer for set.");
  return vv(e, t, r);
}
function $v(e) {
  var t = po(e);
  return {
    get: function(r) {
      return Nf(r, t);
    },
    set: function(r, n) {
      return Ef(r, t, n);
    }
  };
}
da.get = Nf;
da.set = Ef;
da.compile = $v;
function ho(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var Fs = function() {
  try {
    var e = cr(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
function mo(e, t, r) {
  t == "__proto__" && Fs ? Fs(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var xv = Object.prototype, wv = xv.hasOwnProperty;
function go(e, t, r) {
  var n = e[t];
  (!(wv.call(e, t) && Wn(n, r)) || r === void 0 && !(t in e)) && mo(e, t, r);
}
function Vr(e, t, r, n) {
  var s = !r;
  r || (r = {});
  for (var a = -1, i = t.length; ++a < i; ) {
    var o = t[a], c = void 0;
    c === void 0 && (c = e[o]), s ? mo(r, o, c) : go(r, o, c);
  }
  return r;
}
function _v(e, t) {
  return e && Vr(t, dt(t), e);
}
function jv(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var Sv = Object.prototype, Nv = Sv.hasOwnProperty;
function Ev(e) {
  if (!ve(e))
    return jv(e);
  var t = ia(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !Nv.call(e, n)) || r.push(n);
  return r;
}
function zn(e) {
  return Ur(e) ? xf(e, !0) : Ev(e);
}
function Ov(e, t) {
  return e && Vr(t, zn(t), e);
}
var Of = typeof exports == "object" && exports && !exports.nodeType && exports, Ic = Of && typeof module == "object" && module && !module.nodeType && module, Cv = Ic && Ic.exports === Of, kc = Cv ? gt.Buffer : void 0, Fc = kc ? kc.allocUnsafe : void 0;
function Cf(e, t) {
  if (t)
    return e.slice();
  var r = e.length, n = Fc ? Fc(r) : new e.constructor(r);
  return e.copy(n), n;
}
function yo(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
function Av(e, t) {
  return Vr(e, io(e), t);
}
var Pv = Object.getOwnPropertySymbols, Af = Pv ? function(e) {
  for (var t = []; e; )
    ao(t, io(e)), e = ta(e);
  return t;
} : gf;
function Tv(e, t) {
  return Vr(e, Af(e), t);
}
function bo(e) {
  return mf(e, zn, Af);
}
var Iv = Object.prototype, kv = Iv.hasOwnProperty;
function Fv(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && kv.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
function vo(e) {
  var t = new e.constructor(e.byteLength);
  return new ks(t).set(new ks(e)), t;
}
function Rv(e, t) {
  var r = t ? vo(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var Dv = /\w*$/;
function Mv(e) {
  var t = new e.constructor(e.source, Dv.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var Rc = Ze ? Ze.prototype : void 0, Dc = Rc ? Rc.valueOf : void 0;
function Lv(e) {
  return Dc ? Object(Dc.call(e)) : {};
}
function Pf(e, t) {
  var r = t ? vo(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var Uv = "[object Boolean]", Wv = "[object Date]", Vv = "[object Map]", Bv = "[object Number]", zv = "[object RegExp]", qv = "[object Set]", Kv = "[object String]", Gv = "[object Symbol]", Hv = "[object ArrayBuffer]", Jv = "[object DataView]", Yv = "[object Float32Array]", Zv = "[object Float64Array]", Xv = "[object Int8Array]", Qv = "[object Int16Array]", e$ = "[object Int32Array]", t$ = "[object Uint8Array]", r$ = "[object Uint8ClampedArray]", n$ = "[object Uint16Array]", s$ = "[object Uint32Array]";
function a$(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case Hv:
      return vo(e);
    case Uv:
    case Wv:
      return new n(+e);
    case Jv:
      return Rv(e, r);
    case Yv:
    case Zv:
    case Xv:
    case Qv:
    case e$:
    case t$:
    case r$:
    case n$:
    case s$:
      return Pf(e, r);
    case Vv:
      return new n();
    case Bv:
    case Kv:
      return new n(e);
    case zv:
      return Mv(e);
    case qv:
      return new n();
    case Gv:
      return Lv(e);
  }
}
var Mc = Object.create, Tf = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!ve(t))
      return {};
    if (Mc)
      return Mc(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}();
function If(e) {
  return typeof e.constructor == "function" && !ia(e) ? Tf(ta(e)) : {};
}
var i$ = "[object Map]";
function o$(e) {
  return Xe(e) && Je(e) == i$;
}
var Lc = Cr && Cr.isMap, l$ = Lc ? lo(Lc) : o$, c$ = "[object Set]";
function d$(e) {
  return Xe(e) && Je(e) == c$;
}
var Uc = Cr && Cr.isSet, u$ = Uc ? lo(Uc) : d$, f$ = 1, p$ = 2, h$ = 4, kf = "[object Arguments]", m$ = "[object Array]", g$ = "[object Boolean]", y$ = "[object Date]", b$ = "[object Error]", Ff = "[object Function]", v$ = "[object GeneratorFunction]", $$ = "[object Map]", x$ = "[object Number]", Rf = "[object Object]", w$ = "[object RegExp]", _$ = "[object Set]", j$ = "[object String]", S$ = "[object Symbol]", N$ = "[object WeakMap]", E$ = "[object ArrayBuffer]", O$ = "[object DataView]", C$ = "[object Float32Array]", A$ = "[object Float64Array]", P$ = "[object Int8Array]", T$ = "[object Int16Array]", I$ = "[object Int32Array]", k$ = "[object Uint8Array]", F$ = "[object Uint8ClampedArray]", R$ = "[object Uint16Array]", D$ = "[object Uint32Array]", ye = {};
ye[kf] = ye[m$] = ye[E$] = ye[O$] = ye[g$] = ye[y$] = ye[C$] = ye[A$] = ye[P$] = ye[T$] = ye[I$] = ye[$$] = ye[x$] = ye[Rf] = ye[w$] = ye[_$] = ye[j$] = ye[S$] = ye[k$] = ye[F$] = ye[R$] = ye[D$] = !0;
ye[b$] = ye[Ff] = ye[N$] = !1;
function vn(e, t, r, n, s, a) {
  var i, o = t & f$, c = t & p$, d = t & h$;
  if (r && (i = s ? r(e, n, s, a) : r(e)), i !== void 0)
    return i;
  if (!ve(e))
    return e;
  var u = Ae(e);
  if (u) {
    if (i = Fv(e), !o)
      return yo(e, i);
  } else {
    var f = Je(e), h = f == Ff || f == v$;
    if (sr(e))
      return Cf(e, o);
    if (f == Rf || f == kf || h && !s) {
      if (i = c || h ? {} : If(e), !o)
        return c ? Tv(e, Ov(i, e)) : Av(e, _v(i, e));
    } else {
      if (!ye[f])
        return s ? e : {};
      i = a$(e, f, o);
    }
  }
  a || (a = new at());
  var m = a.get(e);
  if (m)
    return m;
  a.set(e, i), u$(e) ? e.forEach(function(y) {
    i.add(vn(y, t, r, y, e, a));
  }) : l$(e) && e.forEach(function(y, p) {
    i.set(p, vn(y, t, r, p, e, a));
  });
  var b = d ? c ? bo : Si : c ? zn : dt, $ = u ? void 0 : b(e);
  return ho($ || e, function(y, p) {
    $ && (p = y, y = e[p]), go(i, p, vn(y, t, r, p, e, a));
  }), i;
}
function M$(e) {
  var t = e == null ? 0 : e.length;
  return t ? e[t - 1] : void 0;
}
function L$(e, t, r) {
  var n = -1, s = e.length;
  t < 0 && (t = -t > s ? 0 : s + t), r = r > s ? s : r, r < 0 && (r += s), s = t > r ? 0 : r - t >>> 0, t >>>= 0;
  for (var a = Array(s); ++n < s; )
    a[n] = e[n + t];
  return a;
}
function U$(e, t) {
  return t.length < 2 ? e : ca(e, L$(t, 0, -1));
}
function Df(e, t) {
  return t = Wr(t, e), e = U$(e, t), e == null || delete e[dr(M$(t))];
}
function W$(e) {
  return rr(e) ? void 0 : e;
}
var Wc = Ze ? Ze.isConcatSpreadable : void 0;
function V$(e) {
  return Ae(e) || Or(e) || !!(Wc && e && e[Wc]);
}
function qn(e, t, r, n, s) {
  var a = -1, i = e.length;
  for (r || (r = V$), s || (s = []); ++a < i; ) {
    var o = e[a];
    t > 0 && r(o) ? t > 1 ? qn(o, t - 1, r, n, s) : ao(s, o) : n || (s[s.length] = o);
  }
  return s;
}
function B$(e) {
  var t = e == null ? 0 : e.length;
  return t ? qn(e, 1) : [];
}
function z$(e, t, r) {
  switch (r.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, r[0]);
    case 2:
      return e.call(t, r[0], r[1]);
    case 3:
      return e.call(t, r[0], r[1], r[2]);
  }
  return e.apply(t, r);
}
var Vc = Math.max;
function Mf(e, t, r) {
  return t = Vc(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, s = -1, a = Vc(n.length - t, 0), i = Array(a); ++s < a; )
      i[s] = n[t + s];
    s = -1;
    for (var o = Array(t + 1); ++s < t; )
      o[s] = n[s];
    return o[t] = r(i), z$(e, this, o);
  };
}
function q$(e) {
  return function() {
    return e;
  };
}
function ua(e) {
  return e;
}
var K$ = Fs ? function(e, t) {
  return Fs(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: q$(t),
    writable: !0
  });
} : ua, G$ = 800, H$ = 16, J$ = Date.now;
function Y$(e) {
  var t = 0, r = 0;
  return function() {
    var n = J$(), s = H$ - (n - r);
    if (r = n, s > 0) {
      if (++t >= G$)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
var Lf = Y$(K$);
function Uf(e) {
  return Lf(Mf(e, void 0, B$), e + "");
}
var Z$ = 1, X$ = 2, Q$ = 4, Rs = Uf(function(e, t) {
  var r = {};
  if (e == null)
    return r;
  var n = !1;
  t = la(t, function(a) {
    return a = Wr(a, e), n || (n = a.length > 1), a;
  }), Vr(e, bo(e), r), n && (r = vn(r, Z$ | X$ | Q$, W$));
  for (var s = t.length; s--; )
    Df(r, t[s]);
  return r;
});
function $o(e, t) {
  const r = t[e];
  return [Rs(t, [e]), r];
}
function Wf(e, t = {}, r = []) {
  const n = e || "";
  let s;
  if (n.startsWith("#"))
    s = decodeURIComponent(n.substring(1));
  else
    throw new Error(`Could not find a definition for ${e}.`);
  const a = da.get(t, s);
  if (a === void 0)
    throw new Error(`Could not find a definition for ${e}.`);
  const i = a[Ce];
  if (i) {
    if (r.includes(i)) {
      if (r.length === 1)
        throw new Error(`Definition for ${e} is a circular reference`);
      const [u, ...f] = r, h = [...f, n, u].join(" -> ");
      throw new Error(`Definition for ${u} contains a circular reference through ${h}`);
    }
    const [o, c] = $o(Ce, a), d = Wf(c, t, [...r, n]);
    return Object.keys(o).length > 0 ? { ...o, ...d } : d;
  }
  return a;
}
function Vf(e, t = {}) {
  return Wf(e, t, []);
}
var ex = Object.prototype, tx = ex.hasOwnProperty;
function rx(e, t) {
  return e != null && tx.call(e, t);
}
function Bf(e, t, r) {
  t = Wr(t, e);
  for (var n = -1, s = t.length, a = !1; ++n < s; ) {
    var i = dr(t[n]);
    if (!(a = e != null && r(e, i)))
      break;
    e = e[i];
  }
  return a || ++n != s ? a : (s = e == null ? 0 : e.length, !!s && oo(s) && aa(i, s) && (Ae(e) || Or(e)));
}
function We(e, t) {
  return e != null && Bf(e, t, rx);
}
var nx = "[object Number]";
function zf(e) {
  return typeof e == "number" || Xe(e) && Tt(e) == nx;
}
var sx = "[object String]";
function fa(e) {
  return typeof e == "string" || !Ae(e) && Xe(e) && Tt(e) == sx;
}
function ax(e, t, r, n) {
  var s = -1, a = e == null ? 0 : e.length;
  for (n && a && (r = e[++s]); ++s < a; )
    r = t(r, e[s], s, e);
  return r;
}
function ix(e) {
  return function(t, r, n) {
    for (var s = -1, a = Object(t), i = n(t), o = i.length; o--; ) {
      var c = i[++s];
      if (r(a[c], c, a) === !1)
        break;
    }
    return t;
  };
}
var qf = ix();
function Kf(e, t) {
  return e && qf(e, t, dt);
}
function ox(e, t) {
  return function(r, n) {
    if (r == null)
      return r;
    if (!Ur(r))
      return e(r, n);
    for (var s = r.length, a = -1, i = Object(r); ++a < s && n(i[a], a, i) !== !1; )
      ;
    return r;
  };
}
var Gf = ox(Kf), lx = 1, cx = 2;
function dx(e, t, r, n) {
  var s = r.length, a = s;
  if (e == null)
    return !a;
  for (e = Object(e); s--; ) {
    var i = r[s];
    if (i[2] ? i[1] !== e[i[0]] : !(i[0] in e))
      return !1;
  }
  for (; ++s < a; ) {
    i = r[s];
    var o = i[0], c = e[o], d = i[1];
    if (i[2]) {
      if (c === void 0 && !(o in e))
        return !1;
    } else {
      var u = new at(), f;
      if (!(f === void 0 ? oa(d, c, lx | cx, n, u) : f))
        return !1;
    }
  }
  return !0;
}
function Hf(e) {
  return e === e && !ve(e);
}
function ux(e) {
  for (var t = dt(e), r = t.length; r--; ) {
    var n = t[r], s = e[n];
    t[r] = [n, s, Hf(s)];
  }
  return t;
}
function Jf(e, t) {
  return function(r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
  };
}
function fx(e) {
  var t = ux(e);
  return t.length == 1 && t[0][2] ? Jf(t[0][0], t[0][1]) : function(r) {
    return r === e || dx(r, e, t);
  };
}
function px(e, t) {
  return e != null && t in Object(e);
}
function Yf(e, t) {
  return e != null && Bf(e, t, px);
}
var hx = 1, mx = 2;
function gx(e, t) {
  return co(e) && Hf(t) ? Jf(dr(e), t) : function(r) {
    var n = G(r, e);
    return n === void 0 && n === t ? Yf(r, e) : oa(t, n, hx | mx);
  };
}
function yx(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function bx(e) {
  return function(t) {
    return ca(t, e);
  };
}
function vx(e) {
  return co(e) ? yx(dr(e)) : bx(e);
}
function xo(e) {
  return typeof e == "function" ? e : e == null ? ua : typeof e == "object" ? Ae(e) ? gx(e[0], e[1]) : fx(e) : vx(e);
}
function $x(e, t, r, n, s) {
  return s(e, function(a, i, o) {
    r = n ? (n = !1, a) : t(r, a, i, o);
  }), r;
}
function xx(e, t, r) {
  var n = Ae(e) ? ax : $x, s = arguments.length < 3;
  return n(e, xo(t), r, s, Gf);
}
function Zf(e) {
  return typeof e == "function" ? e : ua;
}
var wx = /\s/;
function _x(e) {
  for (var t = e.length; t-- && wx.test(e.charAt(t)); )
    ;
  return t;
}
var jx = /^\s+/;
function Sx(e) {
  return e && e.slice(0, _x(e) + 1).replace(jx, "");
}
var Bc = NaN, Nx = /^[-+]0x[0-9a-f]+$/i, Ex = /^0b[01]+$/i, Ox = /^0o[0-7]+$/i, Cx = parseInt;
function Ax(e) {
  if (typeof e == "number")
    return e;
  if (Bn(e))
    return Bc;
  if (ve(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = ve(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = Sx(e);
  var r = Ex.test(e);
  return r || Ox.test(e) ? Cx(e.slice(2), r ? 2 : 8) : Nx.test(e) ? Bc : +e;
}
var zc = 1 / 0, Px = 17976931348623157e292;
function Tx(e) {
  if (!e)
    return e === 0 ? e : 0;
  if (e = Ax(e), e === zc || e === -zc) {
    var t = e < 0 ? -1 : 1;
    return t * Px;
  }
  return e === e ? e : 0;
}
function Ix(e) {
  var t = Tx(e), r = t % 1;
  return t === t ? r ? t - r : t : 0;
}
var kx = 9007199254740991, Xa = 4294967295, Fx = Math.min;
function Xf(e, t) {
  if (e = Ix(e), e < 1 || e > kx)
    return [];
  var r = Xa, n = Fx(e, Xa);
  t = Zf(t), e -= Xa;
  for (var s = yf(n, t); ++r < e; )
    t(r);
  return s;
}
function Qf(e, t, r) {
  var n;
  if (e && r) {
    const s = G(e, r);
    if (s === void 0)
      return;
    for (let a = 0; a < t.length; a++) {
      const i = t[a], o = G(i, [Ne, r], {});
      if (!(o.type === "object" || o.type === "array") && (o.const === s || !((n = o.enum) === null || n === void 0) && n.includes(s)))
        return a;
    }
  }
}
function ep(e, t, r, n, s) {
  if (t === void 0)
    return 0;
  const a = Qf(t, r, s);
  if (zf(a))
    return a;
  for (let i = 0; i < r.length; i++) {
    const o = r[i];
    if (s && We(o, [Ne, s])) {
      const c = G(t, s), d = G(o, [Ne, s], {});
      if (e.isValid(d, c, n))
        return i;
    } else if (o[Ne]) {
      const c = {
        anyOf: Object.keys(o[Ne]).map((u) => ({
          required: [u]
        }))
      };
      let d;
      if (o.anyOf) {
        const { ...u } = o;
        u.allOf ? u.allOf = u.allOf.slice() : u.allOf = [], u.allOf.push(c), d = u;
      } else
        d = Object.assign({}, o, c);
      if (delete d.required, e.isValid(d, t, n))
        return i;
    } else if (e.isValid(o, t, n))
      return i;
  }
  return 0;
}
function wo(e, t, r, n, s) {
  return ep(e, t, r, n, s);
}
function _o(e, t, r, n) {
  if (!ve(e))
    return e;
  t = Wr(t, e);
  for (var s = -1, a = t.length, i = a - 1, o = e; o != null && ++s < a; ) {
    var c = dr(t[s]), d = r;
    if (c === "__proto__" || c === "constructor" || c === "prototype")
      return e;
    if (s != i) {
      var u = o[c];
      d = n ? n(u, c, o) : void 0, d === void 0 && (d = ve(u) ? u : aa(t[s + 1]) ? [] : {});
    }
    go(o, c, d), o = o[c];
  }
  return e;
}
function Ie(e, t, r) {
  return e == null ? e : _o(e, t, r);
}
function Rx(e, t, r) {
  var n = Ae(e), s = n || sr(e) || Vn(e);
  if (t = xo(t), r == null) {
    var a = e && e.constructor;
    s ? r = n ? new a() : [] : ve(e) ? r = na(a) ? Tf(ta(e)) : {} : r = {};
  }
  return (s ? ho : Kf)(e, function(i, o, c) {
    return t(r, i, o, c);
  }), r;
}
function Ci(e, t, r) {
  (r !== void 0 && !Wn(e[t], r) || r === void 0 && !(t in e)) && mo(e, t, r);
}
function Ds(e) {
  return Xe(e) && Ur(e);
}
function Ai(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function Dx(e) {
  return Vr(e, zn(e));
}
function Mx(e, t, r, n, s, a, i) {
  var o = Ai(e, r), c = Ai(t, r), d = i.get(c);
  if (d) {
    Ci(e, r, d);
    return;
  }
  var u = a ? a(o, c, r + "", e, t, i) : void 0, f = u === void 0;
  if (f) {
    var h = Ae(c), m = !h && sr(c), b = !h && !m && Vn(c);
    u = c, h || m || b ? Ae(o) ? u = o : Ds(o) ? u = yo(o) : m ? (f = !1, u = Cf(c, !0)) : b ? (f = !1, u = Pf(c, !0)) : u = [] : rr(c) || Or(c) ? (u = o, Or(o) ? u = Dx(o) : (!ve(o) || na(o)) && (u = If(c))) : f = !1;
  }
  f && (i.set(c, u), s(u, c, n, a, i), i.delete(c)), Ci(e, r, u);
}
function tp(e, t, r, n, s) {
  e !== t && qf(t, function(a, i) {
    if (s || (s = new at()), ve(a))
      Mx(e, t, i, r, tp, n, s);
    else {
      var o = n ? n(Ai(e, i), a, i + "", e, t, s) : void 0;
      o === void 0 && (o = a), Ci(e, i, o);
    }
  }, zn);
}
function jo(e, t) {
  return Lf(Mf(e, t, ua), e + "");
}
function Lx(e, t, r) {
  if (!ve(r))
    return !1;
  var n = typeof t;
  return (n == "number" ? Ur(r) && aa(t, r.length) : n == "string" && t in r) ? Wn(r[t], e) : !1;
}
function Ux(e) {
  return jo(function(t, r) {
    var n = -1, s = r.length, a = s > 1 ? r[s - 1] : void 0, i = s > 2 ? r[2] : void 0;
    for (a = e.length > 3 && typeof a == "function" ? (s--, a) : void 0, i && Lx(r[0], r[1], i) && (a = s < 3 ? void 0 : a, s = 1), t = Object(t); ++n < s; ) {
      var o = r[n];
      o && e(t, o, n, a);
    }
    return t;
  });
}
var Wx = Ux(function(e, t, r) {
  tp(e, t, r);
}), Vx = 1 / 0;
function Bx(e) {
  var t = e == null ? 0 : e.length;
  return t ? qn(e, Vx) : [];
}
function zx(e, t, r, n) {
  for (var s = e.length, a = r + -1; ++a < s; )
    if (t(e[a], a, e))
      return a;
  return -1;
}
function qx(e) {
  return e !== e;
}
function Kx(e, t, r) {
  for (var n = r - 1, s = e.length; ++n < s; )
    if (e[n] === t)
      return n;
  return -1;
}
function Gx(e, t, r) {
  return t === t ? Kx(e, t, r) : zx(e, qx, r);
}
function rp(e, t) {
  var r = e == null ? 0 : e.length;
  return !!r && Gx(e, t, 0) > -1;
}
function Hx() {
}
var Jx = 1 / 0, Yx = _r && 1 / so(new _r([, -0]))[1] == Jx ? function(e) {
  return new _r(e);
} : Hx, Zx = 200;
function np(e, t, r) {
  var n = -1, s = rp, a = e.length, i = !0, o = [], c = o;
  if (a >= Zx) {
    var d = Yx(e);
    if (d)
      return so(d);
    i = !1, s = no, c = new Er();
  } else
    c = o;
  e:
    for (; ++n < a; ) {
      var u = e[n], f = u;
      if (u = u !== 0 ? u : 0, i && f === f) {
        for (var h = c.length; h--; )
          if (c[h] === f)
            continue e;
        o.push(u);
      } else s(c, f, r) || (c !== o && c.push(f), o.push(u));
    }
  return o;
}
function Xx(e) {
  return e && e.length ? np(e) : [];
}
function Qx() {
  this.__data__ = [], this.size = 0;
}
var e1 = Qx;
function t1(e, t) {
  return e === t || e !== e && t !== t;
}
var Br = t1, r1 = Br;
function n1(e, t) {
  for (var r = e.length; r--; )
    if (r1(e[r][0], t))
      return r;
  return -1;
}
var pa = n1, s1 = pa, a1 = Array.prototype, i1 = a1.splice;
function o1(e) {
  var t = this.__data__, r = s1(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : i1.call(t, r, 1), --this.size, !0;
}
var l1 = o1, c1 = pa;
function d1(e) {
  var t = this.__data__, r = c1(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var u1 = d1, f1 = pa;
function p1(e) {
  return f1(this.__data__, e) > -1;
}
var h1 = p1, m1 = pa;
function g1(e, t) {
  var r = this.__data__, n = m1(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
var y1 = g1, b1 = e1, v1 = l1, $1 = u1, x1 = h1, w1 = y1;
function zr(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
zr.prototype.clear = b1;
zr.prototype.delete = v1;
zr.prototype.get = $1;
zr.prototype.has = x1;
zr.prototype.set = w1;
var ha = zr, _1 = ha;
function j1() {
  this.__data__ = new _1(), this.size = 0;
}
var S1 = j1;
function N1(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var E1 = N1;
function O1(e) {
  return this.__data__.get(e);
}
var C1 = O1;
function A1(e) {
  return this.__data__.has(e);
}
var P1 = A1, T1 = typeof ns == "object" && ns && ns.Object === Object && ns, sp = T1, I1 = sp, k1 = typeof self == "object" && self && self.Object === Object && self, F1 = I1 || k1 || Function("return this")(), yt = F1, R1 = yt, D1 = R1.Symbol, qr = D1, qc = qr, ap = Object.prototype, M1 = ap.hasOwnProperty, L1 = ap.toString, on = qc ? qc.toStringTag : void 0;
function U1(e) {
  var t = M1.call(e, on), r = e[on];
  try {
    e[on] = void 0;
    var n = !0;
  } catch {
  }
  var s = L1.call(e);
  return n && (t ? e[on] = r : delete e[on]), s;
}
var W1 = U1, V1 = Object.prototype, B1 = V1.toString;
function z1(e) {
  return B1.call(e);
}
var q1 = z1, Kc = qr, K1 = W1, G1 = q1, H1 = "[object Null]", J1 = "[object Undefined]", Gc = Kc ? Kc.toStringTag : void 0;
function Y1(e) {
  return e == null ? e === void 0 ? J1 : H1 : Gc && Gc in Object(e) ? K1(e) : G1(e);
}
var ur = Y1;
function Z1(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var bt = Z1, X1 = ur, Q1 = bt, ew = "[object AsyncFunction]", tw = "[object Function]", rw = "[object GeneratorFunction]", nw = "[object Proxy]";
function sw(e) {
  if (!Q1(e))
    return !1;
  var t = X1(e);
  return t == tw || t == rw || t == ew || t == nw;
}
var So = sw, aw = yt, iw = aw["__core-js_shared__"], ow = iw, Qa = ow, Hc = function() {
  var e = /[^.]+$/.exec(Qa && Qa.keys && Qa.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function lw(e) {
  return !!Hc && Hc in e;
}
var cw = lw, dw = Function.prototype, uw = dw.toString;
function fw(e) {
  if (e != null) {
    try {
      return uw.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var ip = fw, pw = So, hw = cw, mw = bt, gw = ip, yw = /[\\^$.*+?()[\]{}|]/g, bw = /^\[object .+?Constructor\]$/, vw = Function.prototype, $w = Object.prototype, xw = vw.toString, ww = $w.hasOwnProperty, _w = RegExp(
  "^" + xw.call(ww).replace(yw, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function jw(e) {
  if (!mw(e) || hw(e))
    return !1;
  var t = pw(e) ? _w : bw;
  return t.test(gw(e));
}
var Sw = jw;
function Nw(e, t) {
  return e == null ? void 0 : e[t];
}
var Ew = Nw, Ow = Sw, Cw = Ew;
function Aw(e, t) {
  var r = Cw(e, t);
  return Ow(r) ? r : void 0;
}
var fr = Aw, Pw = fr, Tw = yt, Iw = Pw(Tw, "Map"), No = Iw, kw = fr, Fw = kw(Object, "create"), ma = Fw, Jc = ma;
function Rw() {
  this.__data__ = Jc ? Jc(null) : {}, this.size = 0;
}
var Dw = Rw;
function Mw(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Lw = Mw, Uw = ma, Ww = "__lodash_hash_undefined__", Vw = Object.prototype, Bw = Vw.hasOwnProperty;
function zw(e) {
  var t = this.__data__;
  if (Uw) {
    var r = t[e];
    return r === Ww ? void 0 : r;
  }
  return Bw.call(t, e) ? t[e] : void 0;
}
var qw = zw, Kw = ma, Gw = Object.prototype, Hw = Gw.hasOwnProperty;
function Jw(e) {
  var t = this.__data__;
  return Kw ? t[e] !== void 0 : Hw.call(t, e);
}
var Yw = Jw, Zw = ma, Xw = "__lodash_hash_undefined__";
function Qw(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = Zw && t === void 0 ? Xw : t, this;
}
var e_ = Qw, t_ = Dw, r_ = Lw, n_ = qw, s_ = Yw, a_ = e_;
function Kr(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Kr.prototype.clear = t_;
Kr.prototype.delete = r_;
Kr.prototype.get = n_;
Kr.prototype.has = s_;
Kr.prototype.set = a_;
var i_ = Kr, Yc = i_, o_ = ha, l_ = No;
function c_() {
  this.size = 0, this.__data__ = {
    hash: new Yc(),
    map: new (l_ || o_)(),
    string: new Yc()
  };
}
var d_ = c_;
function u_(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var f_ = u_, p_ = f_;
function h_(e, t) {
  var r = e.__data__;
  return p_(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var ga = h_, m_ = ga;
function g_(e) {
  var t = m_(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var y_ = g_, b_ = ga;
function v_(e) {
  return b_(this, e).get(e);
}
var $_ = v_, x_ = ga;
function w_(e) {
  return x_(this, e).has(e);
}
var __ = w_, j_ = ga;
function S_(e, t) {
  var r = j_(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
var N_ = S_, E_ = d_, O_ = y_, C_ = $_, A_ = __, P_ = N_;
function Gr(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Gr.prototype.clear = E_;
Gr.prototype.delete = O_;
Gr.prototype.get = C_;
Gr.prototype.has = A_;
Gr.prototype.set = P_;
var Eo = Gr, T_ = ha, I_ = No, k_ = Eo, F_ = 200;
function R_(e, t) {
  var r = this.__data__;
  if (r instanceof T_) {
    var n = r.__data__;
    if (!I_ || n.length < F_ - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new k_(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
var D_ = R_, M_ = ha, L_ = S1, U_ = E1, W_ = C1, V_ = P1, B_ = D_;
function Hr(e) {
  var t = this.__data__ = new M_(e);
  this.size = t.size;
}
Hr.prototype.clear = L_;
Hr.prototype.delete = U_;
Hr.prototype.get = W_;
Hr.prototype.has = V_;
Hr.prototype.set = B_;
var ya = Hr;
function z_(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var op = z_, q_ = fr, K_ = function() {
  try {
    var e = q_(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), lp = K_, Zc = lp;
function G_(e, t, r) {
  t == "__proto__" && Zc ? Zc(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var Oo = G_, H_ = Oo, J_ = Br, Y_ = Object.prototype, Z_ = Y_.hasOwnProperty;
function X_(e, t, r) {
  var n = e[t];
  (!(Z_.call(e, t) && J_(n, r)) || r === void 0 && !(t in e)) && H_(e, t, r);
}
var cp = X_, Q_ = cp, ej = Oo;
function tj(e, t, r, n) {
  var s = !r;
  r || (r = {});
  for (var a = -1, i = t.length; ++a < i; ) {
    var o = t[a], c = n ? n(r[o], e[o], o, r, e) : void 0;
    c === void 0 && (c = e[o]), s ? ej(r, o, c) : Q_(r, o, c);
  }
  return r;
}
var Kn = tj;
function rj(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var nj = rj;
function sj(e) {
  return e != null && typeof e == "object";
}
var vt = sj, aj = ur, ij = vt, oj = "[object Arguments]";
function lj(e) {
  return ij(e) && aj(e) == oj;
}
var cj = lj, Xc = cj, dj = vt, dp = Object.prototype, uj = dp.hasOwnProperty, fj = dp.propertyIsEnumerable, pj = Xc(/* @__PURE__ */ function() {
  return arguments;
}()) ? Xc : function(e) {
  return dj(e) && uj.call(e, "callee") && !fj.call(e, "callee");
}, ba = pj, hj = Array.isArray, Ge = hj, Ms = { exports: {} };
function mj() {
  return !1;
}
var gj = mj;
Ms.exports;
(function(e, t) {
  var r = yt, n = gj, s = t && !t.nodeType && t, a = s && !0 && e && !e.nodeType && e, i = a && a.exports === s, o = i ? r.Buffer : void 0, c = o ? o.isBuffer : void 0, d = c || n;
  e.exports = d;
})(Ms, Ms.exports);
var va = Ms.exports, yj = 9007199254740991, bj = /^(?:0|[1-9]\d*)$/;
function vj(e, t) {
  var r = typeof e;
  return t = t ?? yj, !!t && (r == "number" || r != "symbol" && bj.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var Co = vj, $j = 9007199254740991;
function xj(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= $j;
}
var Ao = xj, wj = ur, _j = Ao, jj = vt, Sj = "[object Arguments]", Nj = "[object Array]", Ej = "[object Boolean]", Oj = "[object Date]", Cj = "[object Error]", Aj = "[object Function]", Pj = "[object Map]", Tj = "[object Number]", Ij = "[object Object]", kj = "[object RegExp]", Fj = "[object Set]", Rj = "[object String]", Dj = "[object WeakMap]", Mj = "[object ArrayBuffer]", Lj = "[object DataView]", Uj = "[object Float32Array]", Wj = "[object Float64Array]", Vj = "[object Int8Array]", Bj = "[object Int16Array]", zj = "[object Int32Array]", qj = "[object Uint8Array]", Kj = "[object Uint8ClampedArray]", Gj = "[object Uint16Array]", Hj = "[object Uint32Array]", xe = {};
xe[Uj] = xe[Wj] = xe[Vj] = xe[Bj] = xe[zj] = xe[qj] = xe[Kj] = xe[Gj] = xe[Hj] = !0;
xe[Sj] = xe[Nj] = xe[Mj] = xe[Ej] = xe[Lj] = xe[Oj] = xe[Cj] = xe[Aj] = xe[Pj] = xe[Tj] = xe[Ij] = xe[kj] = xe[Fj] = xe[Rj] = xe[Dj] = !1;
function Jj(e) {
  return jj(e) && _j(e.length) && !!xe[wj(e)];
}
var Yj = Jj;
function Zj(e) {
  return function(t) {
    return e(t);
  };
}
var pr = Zj, Ls = { exports: {} };
Ls.exports;
(function(e, t) {
  var r = sp, n = t && !t.nodeType && t, s = n && !0 && e && !e.nodeType && e, a = s && s.exports === n, i = a && r.process, o = function() {
    try {
      var c = s && s.require && s.require("util").types;
      return c || i && i.binding && i.binding("util");
    } catch {
    }
  }();
  e.exports = o;
})(Ls, Ls.exports);
var Po = Ls.exports, Xj = Yj, Qj = pr, Qc = Po, ed = Qc && Qc.isTypedArray, eS = ed ? Qj(ed) : Xj, To = eS, tS = nj, rS = ba, nS = Ge, sS = va, aS = Co, iS = To, oS = Object.prototype, lS = oS.hasOwnProperty;
function cS(e, t) {
  var r = nS(e), n = !r && rS(e), s = !r && !n && sS(e), a = !r && !n && !s && iS(e), i = r || n || s || a, o = i ? tS(e.length, String) : [], c = o.length;
  for (var d in e)
    (t || lS.call(e, d)) && !(i && // Safari 9 has enumerable `arguments.length` in strict mode.
    (d == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (d == "offset" || d == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    a && (d == "buffer" || d == "byteLength" || d == "byteOffset") || // Skip index properties.
    aS(d, c))) && o.push(d);
  return o;
}
var up = cS, dS = Object.prototype;
function uS(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || dS;
  return e === r;
}
var Io = uS;
function fS(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var fp = fS, pS = fp, hS = pS(Object.keys, Object), mS = hS, gS = Io, yS = mS, bS = Object.prototype, vS = bS.hasOwnProperty;
function $S(e) {
  if (!gS(e))
    return yS(e);
  var t = [];
  for (var r in Object(e))
    vS.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var xS = $S, wS = So, _S = Ao;
function jS(e) {
  return e != null && _S(e.length) && !wS(e);
}
var Jr = jS, SS = up, NS = xS, ES = Jr;
function OS(e) {
  return ES(e) ? SS(e) : NS(e);
}
var Gn = OS, CS = Kn, AS = Gn;
function PS(e, t) {
  return e && CS(t, AS(t), e);
}
var TS = PS;
function IS(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var kS = IS, FS = bt, RS = Io, DS = kS, MS = Object.prototype, LS = MS.hasOwnProperty;
function US(e) {
  if (!FS(e))
    return DS(e);
  var t = RS(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !LS.call(e, n)) || r.push(n);
  return r;
}
var WS = US, VS = up, BS = WS, zS = Jr;
function qS(e) {
  return zS(e) ? VS(e, !0) : BS(e);
}
var Yr = qS, KS = Kn, GS = Yr;
function HS(e, t) {
  return e && KS(t, GS(t), e);
}
var JS = HS, Us = { exports: {} };
Us.exports;
(function(e, t) {
  var r = yt, n = t && !t.nodeType && t, s = n && !0 && e && !e.nodeType && e, a = s && s.exports === n, i = a ? r.Buffer : void 0, o = i ? i.allocUnsafe : void 0;
  function c(d, u) {
    if (u)
      return d.slice();
    var f = d.length, h = o ? o(f) : new d.constructor(f);
    return d.copy(h), h;
  }
  e.exports = c;
})(Us, Us.exports);
var pp = Us.exports;
function YS(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var ko = YS;
function ZS(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, s = 0, a = []; ++r < n; ) {
    var i = e[r];
    t(i, r, e) && (a[s++] = i);
  }
  return a;
}
var XS = ZS;
function QS() {
  return [];
}
var hp = QS, e2 = XS, t2 = hp, r2 = Object.prototype, n2 = r2.propertyIsEnumerable, td = Object.getOwnPropertySymbols, s2 = td ? function(e) {
  return e == null ? [] : (e = Object(e), e2(td(e), function(t) {
    return n2.call(e, t);
  }));
} : t2, Fo = s2, a2 = Kn, i2 = Fo;
function o2(e, t) {
  return a2(e, i2(e), t);
}
var l2 = o2;
function c2(e, t) {
  for (var r = -1, n = t.length, s = e.length; ++r < n; )
    e[s + r] = t[r];
  return e;
}
var Ro = c2, d2 = fp, u2 = d2(Object.getPrototypeOf, Object), Do = u2, f2 = Ro, p2 = Do, h2 = Fo, m2 = hp, g2 = Object.getOwnPropertySymbols, y2 = g2 ? function(e) {
  for (var t = []; e; )
    f2(t, h2(e)), e = p2(e);
  return t;
} : m2, mp = y2, b2 = Kn, v2 = mp;
function $2(e, t) {
  return b2(e, v2(e), t);
}
var x2 = $2, w2 = Ro, _2 = Ge;
function j2(e, t, r) {
  var n = t(e);
  return _2(e) ? n : w2(n, r(e));
}
var gp = j2, S2 = gp, N2 = Fo, E2 = Gn;
function O2(e) {
  return S2(e, E2, N2);
}
var yp = O2, C2 = gp, A2 = mp, P2 = Yr;
function T2(e) {
  return C2(e, P2, A2);
}
var I2 = T2, k2 = fr, F2 = yt, R2 = k2(F2, "DataView"), D2 = R2, M2 = fr, L2 = yt, U2 = M2(L2, "Promise"), W2 = U2, V2 = fr, B2 = yt, z2 = V2(B2, "Set"), bp = z2, q2 = fr, K2 = yt, G2 = q2(K2, "WeakMap"), H2 = G2, Pi = D2, Ti = No, Ii = W2, ki = bp, Fi = H2, vp = ur, Zr = ip, rd = "[object Map]", J2 = "[object Object]", nd = "[object Promise]", sd = "[object Set]", ad = "[object WeakMap]", id = "[object DataView]", Y2 = Zr(Pi), Z2 = Zr(Ti), X2 = Zr(Ii), Q2 = Zr(ki), eN = Zr(Fi), Yt = vp;
(Pi && Yt(new Pi(new ArrayBuffer(1))) != id || Ti && Yt(new Ti()) != rd || Ii && Yt(Ii.resolve()) != nd || ki && Yt(new ki()) != sd || Fi && Yt(new Fi()) != ad) && (Yt = function(e) {
  var t = vp(e), r = t == J2 ? e.constructor : void 0, n = r ? Zr(r) : "";
  if (n)
    switch (n) {
      case Y2:
        return id;
      case Z2:
        return rd;
      case X2:
        return nd;
      case Q2:
        return sd;
      case eN:
        return ad;
    }
  return t;
});
var $a = Yt, tN = Object.prototype, rN = tN.hasOwnProperty;
function nN(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && rN.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var sN = nN, aN = yt, iN = aN.Uint8Array, $p = iN, od = $p;
function oN(e) {
  var t = new e.constructor(e.byteLength);
  return new od(t).set(new od(e)), t;
}
var Mo = oN, lN = Mo;
function cN(e, t) {
  var r = t ? lN(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var dN = cN, uN = /\w*$/;
function fN(e) {
  var t = new e.constructor(e.source, uN.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var pN = fN, ld = qr, cd = ld ? ld.prototype : void 0, dd = cd ? cd.valueOf : void 0;
function hN(e) {
  return dd ? Object(dd.call(e)) : {};
}
var mN = hN, gN = Mo;
function yN(e, t) {
  var r = t ? gN(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var xp = yN, bN = Mo, vN = dN, $N = pN, xN = mN, wN = xp, _N = "[object Boolean]", jN = "[object Date]", SN = "[object Map]", NN = "[object Number]", EN = "[object RegExp]", ON = "[object Set]", CN = "[object String]", AN = "[object Symbol]", PN = "[object ArrayBuffer]", TN = "[object DataView]", IN = "[object Float32Array]", kN = "[object Float64Array]", FN = "[object Int8Array]", RN = "[object Int16Array]", DN = "[object Int32Array]", MN = "[object Uint8Array]", LN = "[object Uint8ClampedArray]", UN = "[object Uint16Array]", WN = "[object Uint32Array]";
function VN(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case PN:
      return bN(e);
    case _N:
    case jN:
      return new n(+e);
    case TN:
      return vN(e, r);
    case IN:
    case kN:
    case FN:
    case RN:
    case DN:
    case MN:
    case LN:
    case UN:
    case WN:
      return wN(e, r);
    case SN:
      return new n();
    case NN:
    case CN:
      return new n(e);
    case EN:
      return $N(e);
    case ON:
      return new n();
    case AN:
      return xN(e);
  }
}
var BN = VN, zN = bt, ud = Object.create, qN = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!zN(t))
      return {};
    if (ud)
      return ud(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}(), KN = qN, GN = KN, HN = Do, JN = Io;
function YN(e) {
  return typeof e.constructor == "function" && !JN(e) ? GN(HN(e)) : {};
}
var wp = YN, ZN = $a, XN = vt, QN = "[object Map]";
function eE(e) {
  return XN(e) && ZN(e) == QN;
}
var tE = eE, rE = tE, nE = pr, fd = Po, pd = fd && fd.isMap, sE = pd ? nE(pd) : rE, aE = sE, iE = $a, oE = vt, lE = "[object Set]";
function cE(e) {
  return oE(e) && iE(e) == lE;
}
var dE = cE, uE = dE, fE = pr, hd = Po, md = hd && hd.isSet, pE = md ? fE(md) : uE, hE = pE, mE = ya, gE = op, yE = cp, bE = TS, vE = JS, $E = pp, xE = ko, wE = l2, _E = x2, jE = yp, SE = I2, NE = $a, EE = sN, OE = BN, CE = wp, AE = Ge, PE = va, TE = aE, IE = bt, kE = hE, FE = Gn, RE = Yr, DE = 1, ME = 2, LE = 4, _p = "[object Arguments]", UE = "[object Array]", WE = "[object Boolean]", VE = "[object Date]", BE = "[object Error]", jp = "[object Function]", zE = "[object GeneratorFunction]", qE = "[object Map]", KE = "[object Number]", Sp = "[object Object]", GE = "[object RegExp]", HE = "[object Set]", JE = "[object String]", YE = "[object Symbol]", ZE = "[object WeakMap]", XE = "[object ArrayBuffer]", QE = "[object DataView]", eO = "[object Float32Array]", tO = "[object Float64Array]", rO = "[object Int8Array]", nO = "[object Int16Array]", sO = "[object Int32Array]", aO = "[object Uint8Array]", iO = "[object Uint8ClampedArray]", oO = "[object Uint16Array]", lO = "[object Uint32Array]", be = {};
be[_p] = be[UE] = be[XE] = be[QE] = be[WE] = be[VE] = be[eO] = be[tO] = be[rO] = be[nO] = be[sO] = be[qE] = be[KE] = be[Sp] = be[GE] = be[HE] = be[JE] = be[YE] = be[aO] = be[iO] = be[oO] = be[lO] = !0;
be[BE] = be[jp] = be[ZE] = !1;
function vs(e, t, r, n, s, a) {
  var i, o = t & DE, c = t & ME, d = t & LE;
  if (r && (i = s ? r(e, n, s, a) : r(e)), i !== void 0)
    return i;
  if (!IE(e))
    return e;
  var u = AE(e);
  if (u) {
    if (i = EE(e), !o)
      return xE(e, i);
  } else {
    var f = NE(e), h = f == jp || f == zE;
    if (PE(e))
      return $E(e, o);
    if (f == Sp || f == _p || h && !s) {
      if (i = c || h ? {} : CE(e), !o)
        return c ? _E(e, vE(i, e)) : wE(e, bE(i, e));
    } else {
      if (!be[f])
        return s ? e : {};
      i = OE(e, f, o);
    }
  }
  a || (a = new mE());
  var m = a.get(e);
  if (m)
    return m;
  a.set(e, i), kE(e) ? e.forEach(function(y) {
    i.add(vs(y, t, r, y, e, a));
  }) : TE(e) && e.forEach(function(y, p) {
    i.set(p, vs(y, t, r, p, e, a));
  });
  var b = d ? c ? SE : jE : c ? RE : FE, $ = u ? void 0 : b(e);
  return gE($ || e, function(y, p) {
    $ && (p = y, y = e[p]), yE(i, p, vs(y, t, r, p, e, a));
  }), i;
}
var cO = vs, dO = cO, uO = 1, fO = 4;
function pO(e) {
  return dO(e, uO | fO);
}
var hO = pO, mO = "__lodash_hash_undefined__";
function gO(e) {
  return this.__data__.set(e, mO), this;
}
var yO = gO;
function bO(e) {
  return this.__data__.has(e);
}
var vO = bO, $O = Eo, xO = yO, wO = vO;
function Ws(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new $O(); ++t < r; )
    this.add(e[t]);
}
Ws.prototype.add = Ws.prototype.push = xO;
Ws.prototype.has = wO;
var xa = Ws;
function _O(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
var jO = _O;
function SO(e, t) {
  return e.has(t);
}
var wa = SO, NO = xa, EO = jO, OO = wa, CO = 1, AO = 2;
function PO(e, t, r, n, s, a) {
  var i = r & CO, o = e.length, c = t.length;
  if (o != c && !(i && c > o))
    return !1;
  var d = a.get(e), u = a.get(t);
  if (d && u)
    return d == t && u == e;
  var f = -1, h = !0, m = r & AO ? new NO() : void 0;
  for (a.set(e, t), a.set(t, e); ++f < o; ) {
    var b = e[f], $ = t[f];
    if (n)
      var y = i ? n($, b, f, t, e, a) : n(b, $, f, e, t, a);
    if (y !== void 0) {
      if (y)
        continue;
      h = !1;
      break;
    }
    if (m) {
      if (!EO(t, function(p, g) {
        if (!OO(m, g) && (b === p || s(b, p, r, n, a)))
          return m.push(g);
      })) {
        h = !1;
        break;
      }
    } else if (!(b === $ || s(b, $, r, n, a))) {
      h = !1;
      break;
    }
  }
  return a.delete(e), a.delete(t), h;
}
var Np = PO;
function TO(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n, s) {
    r[++t] = [s, n];
  }), r;
}
var IO = TO;
function kO(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n) {
    r[++t] = n;
  }), r;
}
var Lo = kO, gd = qr, yd = $p, FO = Br, RO = Np, DO = IO, MO = Lo, LO = 1, UO = 2, WO = "[object Boolean]", VO = "[object Date]", BO = "[object Error]", zO = "[object Map]", qO = "[object Number]", KO = "[object RegExp]", GO = "[object Set]", HO = "[object String]", JO = "[object Symbol]", YO = "[object ArrayBuffer]", ZO = "[object DataView]", bd = gd ? gd.prototype : void 0, ei = bd ? bd.valueOf : void 0;
function XO(e, t, r, n, s, a, i) {
  switch (r) {
    case ZO:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case YO:
      return !(e.byteLength != t.byteLength || !a(new yd(e), new yd(t)));
    case WO:
    case VO:
    case qO:
      return FO(+e, +t);
    case BO:
      return e.name == t.name && e.message == t.message;
    case KO:
    case HO:
      return e == t + "";
    case zO:
      var o = DO;
    case GO:
      var c = n & LO;
      if (o || (o = MO), e.size != t.size && !c)
        return !1;
      var d = i.get(e);
      if (d)
        return d == t;
      n |= UO, i.set(e, t);
      var u = RO(o(e), o(t), n, s, a, i);
      return i.delete(e), u;
    case JO:
      if (ei)
        return ei.call(e) == ei.call(t);
  }
  return !1;
}
var QO = XO, vd = yp, eC = 1, tC = Object.prototype, rC = tC.hasOwnProperty;
function nC(e, t, r, n, s, a) {
  var i = r & eC, o = vd(e), c = o.length, d = vd(t), u = d.length;
  if (c != u && !i)
    return !1;
  for (var f = c; f--; ) {
    var h = o[f];
    if (!(i ? h in t : rC.call(t, h)))
      return !1;
  }
  var m = a.get(e), b = a.get(t);
  if (m && b)
    return m == t && b == e;
  var $ = !0;
  a.set(e, t), a.set(t, e);
  for (var y = i; ++f < c; ) {
    h = o[f];
    var p = e[h], g = t[h];
    if (n)
      var v = i ? n(g, p, h, t, e, a) : n(p, g, h, e, t, a);
    if (!(v === void 0 ? p === g || s(p, g, r, n, a) : v)) {
      $ = !1;
      break;
    }
    y || (y = h == "constructor");
  }
  if ($ && !y) {
    var _ = e.constructor, w = t.constructor;
    _ != w && "constructor" in e && "constructor" in t && !(typeof _ == "function" && _ instanceof _ && typeof w == "function" && w instanceof w) && ($ = !1);
  }
  return a.delete(e), a.delete(t), $;
}
var sC = nC, ti = ya, aC = Np, iC = QO, oC = sC, $d = $a, xd = Ge, wd = va, lC = To, cC = 1, _d = "[object Arguments]", jd = "[object Array]", as = "[object Object]", dC = Object.prototype, Sd = dC.hasOwnProperty;
function uC(e, t, r, n, s, a) {
  var i = xd(e), o = xd(t), c = i ? jd : $d(e), d = o ? jd : $d(t);
  c = c == _d ? as : c, d = d == _d ? as : d;
  var u = c == as, f = d == as, h = c == d;
  if (h && wd(e)) {
    if (!wd(t))
      return !1;
    i = !0, u = !1;
  }
  if (h && !u)
    return a || (a = new ti()), i || lC(e) ? aC(e, t, r, n, s, a) : iC(e, t, c, r, n, s, a);
  if (!(r & cC)) {
    var m = u && Sd.call(e, "__wrapped__"), b = f && Sd.call(t, "__wrapped__");
    if (m || b) {
      var $ = m ? e.value() : e, y = b ? t.value() : t;
      return a || (a = new ti()), s($, y, r, n, a);
    }
  }
  return h ? (a || (a = new ti()), oC(e, t, r, n, s, a)) : !1;
}
var fC = uC, pC = fC, Nd = vt;
function Ep(e, t, r, n, s) {
  return e === t ? !0 : e == null || t == null || !Nd(e) && !Nd(t) ? e !== e && t !== t : pC(e, t, r, n, Ep, s);
}
var Uo = Ep, hC = Uo;
function mC(e, t) {
  return hC(e, t);
}
var Op = mC, Ed = qr, gC = ba, yC = Ge, Od = Ed ? Ed.isConcatSpreadable : void 0;
function bC(e) {
  return yC(e) || gC(e) || !!(Od && e && e[Od]);
}
var vC = bC, $C = Ro, xC = vC;
function Cp(e, t, r, n, s) {
  var a = -1, i = e.length;
  for (r || (r = xC), s || (s = []); ++a < i; ) {
    var o = e[a];
    t > 0 && r(o) ? t > 1 ? Cp(o, t - 1, r, n, s) : $C(s, o) : n || (s[s.length] = o);
  }
  return s;
}
var Wo = Cp;
function wC(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, s = Array(n); ++r < n; )
    s[r] = t(e[r], r, e);
  return s;
}
var hr = wC, _C = ur, jC = vt, SC = "[object Symbol]";
function NC(e) {
  return typeof e == "symbol" || jC(e) && _C(e) == SC;
}
var _a = NC, EC = Ge, OC = _a, CC = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, AC = /^\w*$/;
function PC(e, t) {
  if (EC(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || OC(e) ? !0 : AC.test(e) || !CC.test(e) || t != null && e in Object(t);
}
var Vo = PC, Ap = Eo, TC = "Expected a function";
function Bo(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(TC);
  var r = function() {
    var n = arguments, s = t ? t.apply(this, n) : n[0], a = r.cache;
    if (a.has(s))
      return a.get(s);
    var i = e.apply(this, n);
    return r.cache = a.set(s, i) || a, i;
  };
  return r.cache = new (Bo.Cache || Ap)(), r;
}
Bo.Cache = Ap;
var IC = Bo, kC = IC, FC = 500;
function RC(e) {
  var t = kC(e, function(n) {
    return r.size === FC && r.clear(), n;
  }), r = t.cache;
  return t;
}
var DC = RC, MC = DC, LC = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, UC = /\\(\\)?/g, WC = MC(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(LC, function(r, n, s, a) {
    t.push(s ? a.replace(UC, "$1") : n || r);
  }), t;
}), VC = WC, Cd = qr, BC = hr, zC = Ge, qC = _a, Ad = Cd ? Cd.prototype : void 0, Pd = Ad ? Ad.toString : void 0;
function Pp(e) {
  if (typeof e == "string")
    return e;
  if (zC(e))
    return BC(e, Pp) + "";
  if (qC(e))
    return Pd ? Pd.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
var KC = Pp, GC = KC;
function HC(e) {
  return e == null ? "" : GC(e);
}
var JC = HC, YC = Ge, ZC = Vo, XC = VC, QC = JC;
function eA(e, t) {
  return YC(e) ? e : ZC(e, t) ? [e] : XC(QC(e));
}
var Tp = eA, tA = _a;
function rA(e) {
  if (typeof e == "string" || tA(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
var ja = rA, nA = Tp, sA = ja;
function aA(e, t) {
  t = nA(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[sA(t[r++])];
  return r && r == n ? e : void 0;
}
var zo = aA, iA = ya, oA = Uo, lA = 1, cA = 2;
function dA(e, t, r, n) {
  var s = r.length, a = s, i = !n;
  if (e == null)
    return !a;
  for (e = Object(e); s--; ) {
    var o = r[s];
    if (i && o[2] ? o[1] !== e[o[0]] : !(o[0] in e))
      return !1;
  }
  for (; ++s < a; ) {
    o = r[s];
    var c = o[0], d = e[c], u = o[1];
    if (i && o[2]) {
      if (d === void 0 && !(c in e))
        return !1;
    } else {
      var f = new iA();
      if (n)
        var h = n(d, u, c, e, t, f);
      if (!(h === void 0 ? oA(u, d, lA | cA, n, f) : h))
        return !1;
    }
  }
  return !0;
}
var uA = dA, fA = bt;
function pA(e) {
  return e === e && !fA(e);
}
var Ip = pA, hA = Ip, mA = Gn;
function gA(e) {
  for (var t = mA(e), r = t.length; r--; ) {
    var n = t[r], s = e[n];
    t[r] = [n, s, hA(s)];
  }
  return t;
}
var yA = gA;
function bA(e, t) {
  return function(r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
  };
}
var kp = bA, vA = uA, $A = yA, xA = kp;
function wA(e) {
  var t = $A(e);
  return t.length == 1 && t[0][2] ? xA(t[0][0], t[0][1]) : function(r) {
    return r === e || vA(r, e, t);
  };
}
var _A = wA, jA = zo;
function SA(e, t, r) {
  var n = e == null ? void 0 : jA(e, t);
  return n === void 0 ? r : n;
}
var NA = SA;
function EA(e, t) {
  return e != null && t in Object(e);
}
var OA = EA, CA = Tp, AA = ba, PA = Ge, TA = Co, IA = Ao, kA = ja;
function FA(e, t, r) {
  t = CA(t, e);
  for (var n = -1, s = t.length, a = !1; ++n < s; ) {
    var i = kA(t[n]);
    if (!(a = e != null && r(e, i)))
      break;
    e = e[i];
  }
  return a || ++n != s ? a : (s = e == null ? 0 : e.length, !!s && IA(s) && TA(i, s) && (PA(e) || AA(e)));
}
var RA = FA, DA = OA, MA = RA;
function LA(e, t) {
  return e != null && MA(e, t, DA);
}
var UA = LA, WA = Uo, VA = NA, BA = UA, zA = Vo, qA = Ip, KA = kp, GA = ja, HA = 1, JA = 2;
function YA(e, t) {
  return zA(e) && qA(t) ? KA(GA(e), t) : function(r) {
    var n = VA(r, e);
    return n === void 0 && n === t ? BA(r, e) : WA(t, n, HA | JA);
  };
}
var ZA = YA;
function XA(e) {
  return e;
}
var Hn = XA;
function QA(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
var eP = QA, tP = zo;
function rP(e) {
  return function(t) {
    return tP(t, e);
  };
}
var nP = rP, sP = eP, aP = nP, iP = Vo, oP = ja;
function lP(e) {
  return iP(e) ? sP(oP(e)) : aP(e);
}
var cP = lP, dP = _A, uP = ZA, fP = Hn, pP = Ge, hP = cP;
function mP(e) {
  return typeof e == "function" ? e : e == null ? fP : typeof e == "object" ? pP(e) ? uP(e[0], e[1]) : dP(e) : hP(e);
}
var gP = mP;
function yP(e) {
  return function(t, r, n) {
    for (var s = -1, a = Object(t), i = n(t), o = i.length; o--; ) {
      var c = i[e ? o : ++s];
      if (r(a[c], c, a) === !1)
        break;
    }
    return t;
  };
}
var bP = yP, vP = bP, $P = vP(), Fp = $P, xP = Fp, wP = Gn;
function _P(e, t) {
  return e && xP(e, t, wP);
}
var jP = _P, SP = Jr;
function NP(e, t) {
  return function(r, n) {
    if (r == null)
      return r;
    if (!SP(r))
      return e(r, n);
    for (var s = r.length, a = t ? s : -1, i = Object(r); (t ? a-- : ++a < s) && n(i[a], a, i) !== !1; )
      ;
    return r;
  };
}
var EP = NP, OP = jP, CP = EP, AP = CP(OP), Rp = AP, PP = Rp, TP = Jr;
function IP(e, t) {
  var r = -1, n = TP(e) ? Array(e.length) : [];
  return PP(e, function(s, a, i) {
    n[++r] = t(s, a, i);
  }), n;
}
var kP = IP;
function FP(e, t) {
  var r = e.length;
  for (e.sort(t); r--; )
    e[r] = e[r].value;
  return e;
}
var RP = FP, Td = _a;
function DP(e, t) {
  if (e !== t) {
    var r = e !== void 0, n = e === null, s = e === e, a = Td(e), i = t !== void 0, o = t === null, c = t === t, d = Td(t);
    if (!o && !d && !a && e > t || a && i && c && !o && !d || n && i && c || !r && c || !s)
      return 1;
    if (!n && !a && !d && e < t || d && r && s && !n && !a || o && r && s || !i && s || !c)
      return -1;
  }
  return 0;
}
var MP = DP, LP = MP;
function UP(e, t, r) {
  for (var n = -1, s = e.criteria, a = t.criteria, i = s.length, o = r.length; ++n < i; ) {
    var c = LP(s[n], a[n]);
    if (c) {
      if (n >= o)
        return c;
      var d = r[n];
      return c * (d == "desc" ? -1 : 1);
    }
  }
  return e.index - t.index;
}
var WP = UP, ri = hr, VP = zo, BP = gP, zP = kP, qP = RP, KP = pr, GP = WP, HP = Hn, JP = Ge;
function YP(e, t, r) {
  t.length ? t = ri(t, function(a) {
    return JP(a) ? function(i) {
      return VP(i, a.length === 1 ? a[0] : a);
    } : a;
  }) : t = [HP];
  var n = -1;
  t = ri(t, KP(BP));
  var s = zP(e, function(a, i, o) {
    var c = ri(t, function(d) {
      return d(a);
    });
    return { criteria: c, index: ++n, value: a };
  });
  return qP(s, function(a, i) {
    return GP(a, i, r);
  });
}
var ZP = YP;
function XP(e, t, r) {
  switch (r.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, r[0]);
    case 2:
      return e.call(t, r[0], r[1]);
    case 3:
      return e.call(t, r[0], r[1], r[2]);
  }
  return e.apply(t, r);
}
var Dp = XP, QP = Dp, Id = Math.max;
function eT(e, t, r) {
  return t = Id(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, s = -1, a = Id(n.length - t, 0), i = Array(a); ++s < a; )
      i[s] = n[t + s];
    s = -1;
    for (var o = Array(t + 1); ++s < t; )
      o[s] = n[s];
    return o[t] = r(i), QP(e, this, o);
  };
}
var tT = eT;
function rT(e) {
  return function() {
    return e;
  };
}
var nT = rT, sT = nT, kd = lp, aT = Hn, iT = kd ? function(e, t) {
  return kd(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: sT(t),
    writable: !0
  });
} : aT, oT = iT, lT = 800, cT = 16, dT = Date.now;
function uT(e) {
  var t = 0, r = 0;
  return function() {
    var n = dT(), s = cT - (n - r);
    if (r = n, s > 0) {
      if (++t >= lT)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
var fT = uT, pT = oT, hT = fT, mT = hT(pT), gT = mT, yT = Hn, bT = tT, vT = gT;
function $T(e, t) {
  return vT(bT(e, t, yT), e + "");
}
var mr = $T, xT = Br, wT = Jr, _T = Co, jT = bt;
function ST(e, t, r) {
  if (!jT(r))
    return !1;
  var n = typeof t;
  return (n == "number" ? wT(r) && _T(t, r.length) : n == "string" && t in r) ? xT(r[t], e) : !1;
}
var qo = ST, NT = Wo, ET = ZP, OT = mr, Fd = qo, CT = OT(function(e, t) {
  if (e == null)
    return [];
  var r = t.length;
  return r > 1 && Fd(e, t[0], t[1]) ? t = [] : r > 2 && Fd(t[0], t[1], t[2]) && (t = [t[0]]), ET(e, NT(t, 1), []);
}), Mp = CT;
function AT(e, t, r, n) {
  for (var s = e.length, a = r + (n ? 1 : -1); n ? a-- : ++a < s; )
    if (t(e[a], a, e))
      return a;
  return -1;
}
var PT = AT;
function TT(e) {
  return e !== e;
}
var IT = TT;
function kT(e, t, r) {
  for (var n = r - 1, s = e.length; ++n < s; )
    if (e[n] === t)
      return n;
  return -1;
}
var FT = kT, RT = PT, DT = IT, MT = FT;
function LT(e, t, r) {
  return t === t ? MT(e, t, r) : RT(e, DT, r);
}
var Lp = LT, UT = Lp;
function WT(e, t) {
  var r = e == null ? 0 : e.length;
  return !!r && UT(e, t, 0) > -1;
}
var Ko = WT;
function VT(e, t, r) {
  for (var n = -1, s = e == null ? 0 : e.length; ++n < s; )
    if (r(t, e[n]))
      return !0;
  return !1;
}
var Go = VT;
function BT() {
}
var zT = BT, ni = bp, qT = zT, KT = Lo, GT = 1 / 0, HT = ni && 1 / KT(new ni([, -0]))[1] == GT ? function(e) {
  return new ni(e);
} : qT, JT = HT, YT = xa, ZT = Ko, XT = Go, QT = wa, eI = JT, tI = Lo, rI = 200;
function nI(e, t, r) {
  var n = -1, s = ZT, a = e.length, i = !0, o = [], c = o;
  if (r)
    i = !1, s = XT;
  else if (a >= rI) {
    var d = t ? null : eI(e);
    if (d)
      return tI(d);
    i = !1, s = QT, c = new YT();
  } else
    c = t ? [] : o;
  e:
    for (; ++n < a; ) {
      var u = e[n], f = t ? t(u) : u;
      if (u = r || u !== 0 ? u : 0, i && f === f) {
        for (var h = c.length; h--; )
          if (c[h] === f)
            continue e;
        t && c.push(f), o.push(u);
      } else s(c, f, r) || (c !== o && c.push(f), o.push(u));
    }
  return o;
}
var Up = nI, sI = Up;
function aI(e) {
  return e && e.length ? sI(e) : [];
}
var Ho = aI, iI = Up;
function oI(e, t) {
  return t = typeof t == "function" ? t : void 0, e && e.length ? iI(e, void 0, t) : [];
}
var Jo = oI, lI = mr, cI = Br, dI = qo, uI = Yr, Wp = Object.prototype, fI = Wp.hasOwnProperty, pI = lI(function(e, t) {
  e = Object(e);
  var r = -1, n = t.length, s = n > 2 ? t[2] : void 0;
  for (s && dI(t[0], t[1], s) && (n = 1); ++r < n; )
    for (var a = t[r], i = uI(a), o = -1, c = i.length; ++o < c; ) {
      var d = i[o], u = e[d];
      (u === void 0 || cI(u, Wp[d]) && !fI.call(e, d)) && (e[d] = a[d]);
    }
  return e;
}), hI = pI, mI = xa, gI = Ko, yI = Go, bI = hr, vI = pr, Rd = wa, $I = Math.min;
function xI(e, t, r) {
  for (var n = r ? yI : gI, s = e[0].length, a = e.length, i = a, o = Array(a), c = 1 / 0, d = []; i--; ) {
    var u = e[i];
    i && t && (u = bI(u, vI(t))), c = $I(u.length, c), o[i] = !r && (t || s >= 120 && u.length >= 120) ? new mI(i && u) : void 0;
  }
  u = e[0];
  var f = -1, h = o[0];
  e:
    for (; ++f < s && d.length < c; ) {
      var m = u[f], b = t ? t(m) : m;
      if (m = r || m !== 0 ? m : 0, !(h ? Rd(h, b) : n(d, b, r))) {
        for (i = a; --i; ) {
          var $ = o[i];
          if (!($ ? Rd($, b) : n(e[i], b, r)))
            continue e;
        }
        h && h.push(b), d.push(m);
      }
    }
  return d;
}
var Vp = xI, wI = Jr, _I = vt;
function jI(e) {
  return _I(e) && wI(e);
}
var Yo = jI, SI = Yo;
function NI(e) {
  return SI(e) ? e : [];
}
var Bp = NI;
function EI(e) {
  var t = e == null ? 0 : e.length;
  return t ? e[t - 1] : void 0;
}
var OI = EI, CI = hr, AI = Vp, PI = mr, TI = Bp, II = OI, kI = PI(function(e) {
  var t = II(e), r = CI(e, TI);
  return t = typeof t == "function" ? t : void 0, t && r.pop(), r.length && r[0] === e[0] ? AI(r, void 0, t) : [];
}), zp = kI, FI = ur, RI = Do, DI = vt, MI = "[object Object]", LI = Function.prototype, UI = Object.prototype, qp = LI.toString, WI = UI.hasOwnProperty, VI = qp.call(Object);
function BI(e) {
  if (!DI(e) || FI(e) != MI)
    return !1;
  var t = RI(e);
  if (t === null)
    return !0;
  var r = WI.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && qp.call(r) == VI;
}
var Sa = BI, zI = ur, qI = vt, KI = "[object Boolean]";
function GI(e) {
  return e === !0 || e === !1 || qI(e) && zI(e) == KI;
}
var HI = GI, ot = Op, JI = Mp, Zo = Ho, Dd = Jo, YI = hI, ZI = zp, Vs = Sa, si = HI, Md = (e) => Array.isArray(e) ? e : [e], Ye = (e) => e === void 0, is = (e) => Vs(e) || Array.isArray(e) ? Object.keys(e) : [], wr = (e, t) => e.hasOwnProperty(t), Pr = (e) => JI(Zo(e)), Ld = (e) => Ye(e) || Array.isArray(e) && e.length === 0, XI = (e, t, r, n) => t && wr(t, r) && e && wr(e, r) && n(e[r], t[r]), ai = (e, t) => Ye(e) && t === 0 || Ye(t) && e === 0 || ot(e, t), QI = (e, t) => Ye(e) && t === !1 || Ye(t) && e === !1 || ot(e, t), Ud = (e) => Ye(e) || ot(e, {}) || e === !0, os = (e) => Ye(e) || ot(e, {}), Wd = (e) => Ye(e) || Vs(e) || e === !0 || e === !1;
function Vd(e, t) {
  return Ld(e) && Ld(t) ? !0 : ot(Pr(e), Pr(t));
}
function e5(e, t) {
  return e = Md(e), t = Md(t), ot(Pr(e), Pr(t));
}
function $s(e, t, r, n) {
  var s = Zo(is(e).concat(is(t)));
  return os(e) && os(t) ? !0 : os(e) && is(t).length || os(t) && is(e).length ? !1 : s.every(function(a) {
    var i = e[a], o = t[a];
    return Array.isArray(i) && Array.isArray(o) ? ot(Pr(e), Pr(t)) : Array.isArray(i) && !Array.isArray(o) || Array.isArray(o) && !Array.isArray(i) ? !1 : XI(e, t, a, n);
  });
}
function t5(e, t, r, n) {
  return Vs(e) && Vs(t) ? n(e, t) : Array.isArray(e) && Array.isArray(t) ? $s(e, t, r, n) : ot(e, t);
}
function ii(e, t, r, n) {
  var s = Dd(e, n), a = Dd(t, n), i = ZI(s, a, n);
  return i.length === Math.max(s.length, a.length);
}
var r5 = {
  title: ot,
  uniqueItems: QI,
  minLength: ai,
  minItems: ai,
  minProperties: ai,
  required: Vd,
  enum: Vd,
  type: e5,
  items: t5,
  anyOf: ii,
  allOf: ii,
  oneOf: ii,
  properties: $s,
  patternProperties: $s,
  dependencies: $s
}, n5 = [
  "properties",
  "patternProperties",
  "dependencies",
  "uniqueItems",
  "minLength",
  "minItems",
  "minProperties",
  "required"
], s5 = ["additionalProperties", "additionalItems", "contains", "propertyNames", "not"];
function Ri(e, t, r) {
  if (r = YI(r, {
    ignore: []
  }), Ud(e) && Ud(t))
    return !0;
  if (!Wd(e) || !Wd(t))
    throw new Error("Either of the values are not a JSON schema.");
  if (e === t)
    return !0;
  if (si(e) && si(t))
    return e === t;
  if (e === void 0 && t === !1 || t === void 0 && e === !1 || Ye(e) && !Ye(t) || !Ye(e) && Ye(t))
    return !1;
  var n = Zo(Object.keys(e).concat(Object.keys(t)));
  if (r.ignore.length && (n = n.filter((a) => r.ignore.indexOf(a) === -1)), !n.length)
    return !0;
  function s(a, i) {
    return Ri(a, i, r);
  }
  return n.every(function(a) {
    var i = e[a], o = t[a];
    if (s5.indexOf(a) !== -1)
      return Ri(i, o, r);
    var c = r5[a];
    if (c || (c = ot), ot(i, o))
      return !0;
    if (n5.indexOf(a) === -1 && (!wr(e, a) && wr(t, a) || wr(e, a) && !wr(t, a)))
      return i === o;
    var d = c(i, o, a, s);
    if (!si(d))
      throw new Error("Comparer must return true or false");
    return d;
  });
}
var Xo = Ri;
function a5(e) {
  return Object.prototype.toString.call(e) === "[object Array]";
}
var Qo = Array.isArray || a5;
function i5(e) {
  return (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]") && e.valueOf() === e.valueOf();
}
var o5 = i5, l5 = o5;
function c5(e) {
  return l5(e) && e % 1 === 0;
}
var d5 = c5, u5 = Qo, f5 = d5;
function p5(e) {
  var t;
  if (!u5(e) || (t = e.length, !t))
    return !1;
  for (var r = 0; r < t; r++)
    if (!f5(e[r]))
      return !1;
  return !0;
}
var Kp = p5;
function h5(e) {
  return typeof e == "function";
}
var Gp = h5, m5 = Qo, Bd = Kp, g5 = Gp, ls = Math.pow(2, 31) - 1;
function zd(e, t) {
  var r = 1, n;
  if (e === 0)
    return t;
  if (t === 0)
    return e;
  for (; e % 2 === 0 && t % 2 === 0; )
    e = e / 2, t = t / 2, r = r * 2;
  for (; e % 2 === 0; )
    e = e / 2;
  for (; t; ) {
    for (; t % 2 === 0; )
      t = t / 2;
    e > t && (n = t, t = e, e = n), t = t - e;
  }
  return r * e;
}
function qd(e, t) {
  var r = 0, n;
  if (e === 0)
    return t;
  if (t === 0)
    return e;
  for (; !(e & 1) && !(t & 1); )
    e >>>= 1, t >>>= 1, r++;
  for (; !(e & 1); )
    e >>>= 1;
  for (; t; ) {
    for (; !(t & 1); )
      t >>>= 1;
    e > t && (n = t, t = e, e = n), t = t - e;
  }
  return e << r;
}
function y5() {
  var e = arguments.length, t, r, n, s, a, i, o;
  for (t = new Array(e), o = 0; o < e; o++)
    t[o] = arguments[o];
  if (Bd(t)) {
    if (e === 2)
      return a = t[0], i = t[1], a < 0 && (a = -a), i < 0 && (i = -i), a <= ls && i <= ls ? qd(a, i) : zd(a, i);
    n = t;
  } else if (m5(t[0]))
    if (e > 1) {
      if (n = t[0], r = t[1], !g5(r))
        throw new TypeError("gcd()::invalid input argument. Accessor must be a function. Value: `" + r + "`.");
    } else
      n = t[0];
  else throw new TypeError("gcd()::invalid input argument. Must provide an array of integers. Value: `" + t[0] + "`.");
  if (s = n.length, s < 2)
    return null;
  if (r) {
    for (a = new Array(s), o = 0; o < s; o++)
      a[o] = r(n[o], o);
    n = a;
  }
  if (e < 3 && !Bd(n))
    throw new TypeError("gcd()::invalid input argument. Accessed array values must be integers. Value: `" + n + "`.");
  for (o = 0; o < s; o++)
    a = n[o], a < 0 && (n[o] = -a);
  for (a = n[0], o = 1; o < s; o++)
    i = n[o], i <= ls && a <= ls ? a = qd(a, i) : a = zd(a, i);
  return a;
}
var b5 = y5, Kd = b5, v5 = Qo, Gd = Kp, $5 = Gp;
function x5() {
  var e = arguments.length, t, r, n, s, a, i, o;
  for (t = new Array(e), o = 0; o < e; o++)
    t[o] = arguments[o];
  if (Gd(t)) {
    if (e === 2)
      return a = t[0], i = t[1], a < 0 && (a = -a), i < 0 && (i = -i), a === 0 || i === 0 ? 0 : a / Kd(a, i) * i;
    n = t;
  } else if (v5(t[0]))
    if (e > 1) {
      if (n = t[0], r = t[1], !$5(r))
        throw new TypeError("lcm()::invalid input argument. Accessor must be a function. Value: `" + r + "`.");
    } else
      n = t[0];
  else throw new TypeError("lcm()::invalid input argument. Must provide an array of integers. Value: `" + t[0] + "`.");
  if (s = n.length, s < 2)
    return null;
  if (r) {
    for (a = new Array(s), o = 0; o < s; o++)
      a[o] = r(n[o], o);
    n = a;
  }
  if (e < 3 && !Gd(n))
    throw new TypeError("lcm()::invalid input argument. Accessed array values must be integers. Value: `" + n + "`.");
  for (o = 0; o < s; o++)
    a = n[o], a < 0 && (n[o] = -a);
  for (a = n[0], o = 1; o < s; o++) {
    if (i = n[o], a === 0 || i === 0)
      return 0;
    a = a / Kd(a, i) * i;
  }
  return a;
}
var w5 = x5, _5 = Oo, j5 = Br;
function S5(e, t, r) {
  (r !== void 0 && !j5(e[t], r) || r === void 0 && !(t in e)) && _5(e, t, r);
}
var Hp = S5;
function N5(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
var Jp = N5, E5 = Kn, O5 = Yr;
function C5(e) {
  return E5(e, O5(e));
}
var A5 = C5, Hd = Hp, P5 = pp, T5 = xp, I5 = ko, k5 = wp, Jd = ba, Yd = Ge, F5 = Yo, R5 = va, D5 = So, M5 = bt, L5 = Sa, U5 = To, Zd = Jp, W5 = A5;
function V5(e, t, r, n, s, a, i) {
  var o = Zd(e, r), c = Zd(t, r), d = i.get(c);
  if (d) {
    Hd(e, r, d);
    return;
  }
  var u = a ? a(o, c, r + "", e, t, i) : void 0, f = u === void 0;
  if (f) {
    var h = Yd(c), m = !h && R5(c), b = !h && !m && U5(c);
    u = c, h || m || b ? Yd(o) ? u = o : F5(o) ? u = I5(o) : m ? (f = !1, u = P5(c, !0)) : b ? (f = !1, u = T5(c, !0)) : u = [] : L5(c) || Jd(c) ? (u = o, Jd(o) ? u = W5(o) : (!M5(o) || D5(o)) && (u = k5(c))) : f = !1;
  }
  f && (i.set(c, u), s(u, c, n, a, i), i.delete(c)), Hd(e, r, u);
}
var B5 = V5, z5 = ya, q5 = Hp, K5 = Fp, G5 = B5, H5 = bt, J5 = Yr, Y5 = Jp;
function Yp(e, t, r, n, s) {
  e !== t && K5(t, function(a, i) {
    if (s || (s = new z5()), H5(a))
      G5(e, t, i, r, Yp, n, s);
    else {
      var o = n ? n(Y5(e, i), a, i + "", e, t, s) : void 0;
      o === void 0 && (o = a), q5(e, i, o);
    }
  }, J5);
}
var Zp = Yp, Z5 = Zp, Xd = bt;
function Xp(e, t, r, n, s, a) {
  return Xd(e) && Xd(t) && (a.set(t, e), Z5(e, t, void 0, Xp, a), a.delete(t)), e;
}
var X5 = Xp, Q5 = mr, e3 = qo;
function t3(e) {
  return Q5(function(t, r) {
    var n = -1, s = r.length, a = s > 1 ? r[s - 1] : void 0, i = s > 2 ? r[2] : void 0;
    for (a = e.length > 3 && typeof a == "function" ? (s--, a) : void 0, i && e3(r[0], r[1], i) && (a = s < 3 ? void 0 : a, s = 1), t = Object(t); ++n < s; ) {
      var o = r[n];
      o && e(t, o, n, a);
    }
    return t;
  });
}
var r3 = t3, n3 = Zp, s3 = r3, a3 = s3(function(e, t, r, n) {
  n3(e, t, r, n);
}), i3 = a3, o3 = Dp, l3 = mr, c3 = X5, d3 = i3, u3 = l3(function(e) {
  return e.push(void 0, c3), o3(d3, void 0, e);
}), f3 = u3, p3 = Wo;
function h3(e) {
  var t = e == null ? 0 : e.length;
  return t ? p3(e, 1) : [];
}
var Qp = h3, m3 = Wo, g3 = 1 / 0;
function y3(e) {
  var t = e == null ? 0 : e.length;
  return t ? m3(e, g3) : [];
}
var eh = y3, b3 = hr, v3 = Vp, $3 = mr, x3 = Bp, w3 = $3(function(e) {
  var t = b3(e, x3);
  return t.length && t[0] === e[0] ? v3(t) : [];
}), _3 = w3;
function j3(e, t, r, n) {
  for (var s = r - 1, a = e.length; ++s < a; )
    if (n(e[s], t))
      return s;
  return -1;
}
var S3 = j3, N3 = hr, E3 = Lp, O3 = S3, C3 = pr, A3 = ko, P3 = Array.prototype, Qd = P3.splice;
function T3(e, t, r, n) {
  var s = n ? O3 : E3, a = -1, i = t.length, o = e;
  for (e === t && (t = A3(t)), r && (o = N3(e, C3(r))); ++a < i; )
    for (var c = 0, d = t[a], u = r ? r(d) : d; (c = s(o, u, c, n)) > -1; )
      o !== e && Qd.call(o, c, 1), Qd.call(e, c, 1);
  return e;
}
var I3 = T3, k3 = I3;
function F3(e, t) {
  return e && e.length && t && t.length ? k3(e, t) : e;
}
var R3 = F3, D3 = Hn;
function M3(e) {
  return typeof e == "function" ? e : D3;
}
var L3 = M3, U3 = op, W3 = Rp, V3 = L3, B3 = Ge;
function z3(e, t) {
  var r = B3(e) ? U3 : W3;
  return r(e, V3(t));
}
var th = z3, q3 = xa, K3 = Ko, G3 = Go, H3 = hr, J3 = pr, Y3 = wa, Z3 = 200;
function X3(e, t, r, n) {
  var s = -1, a = K3, i = !0, o = e.length, c = [], d = t.length;
  if (!o)
    return c;
  r && (t = H3(t, J3(r))), n ? (a = G3, i = !1) : t.length >= Z3 && (a = Y3, i = !1, t = new q3(t));
  e:
    for (; ++s < o; ) {
      var u = e[s], f = r == null ? u : r(u);
      if (u = n || u !== 0 ? u : 0, i && f === f) {
        for (var h = d; h--; )
          if (t[h] === f)
            continue e;
        c.push(u);
      } else a(t, f, n) || c.push(u);
    }
  return c;
}
var Q3 = X3, ek = Q3, tk = mr, rk = Yo, nk = tk(function(e, t) {
  return rk(e) ? ek(e, t) : [];
}), sk = nk;
const ak = Qp, ik = eh, rh = Sa, ok = Ho, lk = Jo, ck = sk;
function dk(e) {
  for (const t in e)
    nh(e, t) && mk(e[t]) && delete e[t];
  return e;
}
const uk = (e) => ok(ik(e.map(el))), fk = (e, t) => e.map((r) => r && r[t]), nh = (e, t) => Object.prototype.hasOwnProperty.call(e, t), el = (e) => rh(e) || Array.isArray(e) ? Object.keys(e) : [], pk = (e) => e !== void 0, hk = (e) => rh(e) || e === !0 || e === !1, mk = (e) => !el(e).length && e !== !1 && e !== !0, gk = (e, ...t) => ck.apply(null, [e].concat(ak(t)));
var sh = {
  allUniqueKeys: uk,
  deleteUndefinedProps: dk,
  getValues: fk,
  has: nh,
  isSchema: hk,
  keys: el,
  notUndefined: pk,
  uniqWith: lk,
  withoutArr: gk
};
const yk = Xo, bk = th, {
  allUniqueKeys: vk,
  deleteUndefinedProps: $k,
  getValues: xk,
  keys: ln,
  notUndefined: wk,
  uniqWith: _k,
  withoutArr: eu
} = sh;
function jk(e) {
  bk(e, function(t, r) {
    t === !1 && delete e[r];
  });
}
function tu(e, t) {
  return vk(e).reduce(function(n, s) {
    const a = xk(e, s), i = _k(a.filter(wk), yk);
    return n[s] = t(i, s), n;
  }, {});
}
var Sk = {
  keywords: ["properties", "patternProperties", "additionalProperties"],
  resolver(e, t, r, n) {
    n.ignoreAdditionalProperties || (e.forEach(function(a) {
      const i = e.filter((u) => u !== a), o = ln(a.properties), d = ln(a.patternProperties).map((u) => new RegExp(u));
      i.forEach(function(u) {
        const f = ln(u.properties), h = f.filter((b) => d.some(($) => $.test(b)));
        eu(f, o, h).forEach(function(b) {
          u.properties[b] = r.properties([
            u.properties[b],
            a.additionalProperties
          ], b);
        });
      });
    }), e.forEach(function(a) {
      const i = e.filter((c) => c !== a), o = ln(a.patternProperties);
      a.additionalProperties === !1 && i.forEach(function(c) {
        const d = ln(c.patternProperties);
        eu(d, o).forEach((f) => delete c.patternProperties[f]);
      });
    }));
    const s = {
      additionalProperties: r.additionalProperties(e.map((a) => a.additionalProperties)),
      patternProperties: tu(e.map((a) => a.patternProperties), r.patternProperties),
      properties: tu(e.map((a) => a.properties), r.properties)
    };
    return s.additionalProperties === !1 && jk(s.properties), $k(s);
  }
};
const Nk = Xo, Ek = th, {
  allUniqueKeys: Ok,
  deleteUndefinedProps: Ck,
  has: Ak,
  isSchema: ah,
  notUndefined: ih,
  uniqWith: Pk
} = sh;
function Tk(e) {
  Ek(e, function(t, r) {
    t === !1 && e.splice(r, 1);
  });
}
function Ik(e, t) {
  return e.map(function(r) {
    if (r)
      if (Array.isArray(r.items)) {
        const n = r.items[t];
        if (ah(n))
          return n;
        if (Ak(r, "additionalItems"))
          return r.additionalItems;
      } else
        return r.items;
  });
}
function kk(e) {
  return e.map(function(t) {
    if (t)
      return Array.isArray(t.items) ? t.additionalItems : t.items;
  });
}
function Fk(e, t, r) {
  return Ok(r).reduce(function(s, a) {
    const i = Ik(e, a), o = Pk(i.filter(ih), Nk);
    return s[a] = t(o, a), s;
  }, []);
}
var Rk = {
  keywords: ["items", "additionalItems"],
  resolver(e, t, r) {
    const n = e.map((o) => o.items), s = n.filter(ih), a = {};
    s.every(ah) ? a.items = r.items(n) : a.items = Fk(e, r.items, n);
    let i;
    return s.every(Array.isArray) ? i = e.map((o) => o.additionalItems) : s.some(Array.isArray) && (i = kk(e)), i && (a.additionalItems = r.additionalItems(i)), a.additionalItems === !1 && Array.isArray(a.items) && Tk(a.items), Ck(a);
  }
};
const oh = hO, Bs = Xo, Dk = w5, Mk = f3, lh = Qp, tl = eh, Lk = _3, Uk = zp, Di = Op, Tr = Sa, Wk = R3, ch = Mp, rl = Ho, jr = Jo, dh = Sk, uh = Rk, cs = (e, t) => e.indexOf(t) !== -1, Vk = (e) => Tr(e) || e === !0 || e === !1, Bk = (e) => e === !1, fh = (e) => e === !0, Na = (e, t, r) => r(e), ph = (e) => ch(rl(tl(e))), zs = (e) => e !== void 0, hh = (e) => rl(tl(e.map(Jk))), Xr = (e) => e[0], zk = (e) => ph(e), Jn = (e) => Math.max.apply(Math, e), Yn = (e) => Math.min.apply(Math, e), qk = (e) => e.some(fh), Kk = (e) => jr(lh(e), Di);
function Gk(e) {
  return function(t, r) {
    return Bs({
      [e]: t
    }, { [e]: r });
  };
}
function mh(e) {
  let { allOf: t = [], ...r } = e;
  return r = Tr(e) ? r : e, [r, ...t.map(mh)];
}
function gh(e, t) {
  return e.map((r) => r && r[t]);
}
function Hk(e, t) {
  return e.map(function(r, n) {
    try {
      return t(r, n);
    } catch {
      return;
    }
  }).filter(zs);
}
function Jk(e) {
  return Tr(e) || Array.isArray(e) ? Object.keys(e) : [];
}
function Mi(e, t) {
  if (t = t || [], !e.length)
    return t;
  const r = e.slice(0).shift(), n = e.slice(1);
  return t.length ? Mi(n, lh(t.map((s) => r.map((a) => [a].concat(s))))) : Mi(n, r.map((s) => s));
}
function yh(e, t) {
  let r;
  try {
    r = e.map(function(n) {
      return JSON.stringify(n, null, 2);
    }).join(`
`);
  } catch {
    r = e.join(", ");
  }
  throw new Error('Could not resolve values for path:"' + t.join(".") + `". They are probably incompatible. Values: 
` + r);
}
function Yk(e, t, r, n, s, a) {
  if (e.length) {
    const i = s.complexResolvers[t];
    if (!i || !i.resolver)
      throw new Error("No resolver found for " + t);
    const o = r.map((f) => e.reduce((h, m) => (f[m] !== void 0 && (h[m] = f[m]), h), {})), c = jr(o, Bs), d = i.keywords.reduce((f, h) => ({
      ...f,
      [h]: (m, b = []) => n(m, null, a.concat(h, b))
    }), {}), u = i.resolver(c, a.concat(t), d, s);
    return Tr(u) || yh(c, a.concat(t)), u;
  }
}
function Zk(e) {
  return { required: e };
}
const Xk = ["properties", "patternProperties", "definitions", "dependencies"], Qk = ["anyOf", "oneOf"], e4 = [
  "additionalProperties",
  "additionalItems",
  "contains",
  "propertyNames",
  "not",
  "items"
], oe = {
  type(e) {
    if (e.some(Array.isArray)) {
      const t = e.map(function(n) {
        return Array.isArray(n) ? n : [n];
      }), r = Lk.apply(null, t);
      if (r.length === 1)
        return r[0];
      if (r.length > 1)
        return rl(r);
    }
  },
  dependencies(e, t, r) {
    return hh(e).reduce(function(s, a) {
      const i = gh(e, a);
      let o = jr(i.filter(zs), Di);
      const c = o.filter(Array.isArray);
      if (c.length) {
        if (c.length === o.length)
          s[a] = ph(o);
        else {
          const d = o.filter(Vk), u = c.map(Zk);
          s[a] = r(d.concat(u), a);
        }
        return s;
      }
      return o = jr(o, Bs), s[a] = r(o, a), s;
    }, {});
  },
  oneOf(e, t, r) {
    const n = Mi(oh(e)), s = Hk(n, r), a = jr(s, Bs);
    if (a.length)
      return a;
  },
  not(e) {
    return { anyOf: e };
  },
  pattern(e) {
    return e.map((t) => "(?=" + t + ")").join("");
  },
  multipleOf(e) {
    let t = e.slice(0), r = 1;
    for (; t.some((n) => !Number.isInteger(n)); )
      t = t.map((n) => n * 10), r = r * 10;
    return Dk(t) / r;
  },
  enum(e) {
    const t = Uk.apply(null, e.concat(Di));
    if (t.length)
      return ch(t);
  }
};
oe.$id = Xr;
oe.$ref = Xr;
oe.$schema = Xr;
oe.additionalItems = Na;
oe.additionalProperties = Na;
oe.anyOf = oe.oneOf;
oe.contains = Na;
oe.default = Xr;
oe.definitions = oe.dependencies;
oe.description = Xr;
oe.examples = Kk;
oe.exclusiveMaximum = Yn;
oe.exclusiveMinimum = Jn;
oe.items = uh;
oe.maximum = Yn;
oe.maxItems = Yn;
oe.maxLength = Yn;
oe.maxProperties = Yn;
oe.minimum = Jn;
oe.minItems = Jn;
oe.minLength = Jn;
oe.minProperties = Jn;
oe.properties = dh;
oe.propertyNames = Na;
oe.required = zk;
oe.title = Xr;
oe.uniqueItems = qk;
const t4 = {
  properties: dh,
  items: uh
};
function nl(e, t, r) {
  t = Mk(t, {
    ignoreAdditionalProperties: !1,
    resolvers: oe,
    complexResolvers: t4,
    deep: !0
  });
  const n = Object.entries(t.complexResolvers);
  function s(o, c, d) {
    o = oh(o.filter(zs)), d = d || [];
    const u = Tr(c) ? c : {};
    if (!o.length)
      return;
    if (o.some(Bk))
      return !1;
    if (o.every(fh))
      return !0;
    o = o.filter(Tr);
    const f = hh(o);
    if (t.deep && cs(f, "allOf"))
      return nl({
        allOf: o
      }, t);
    const h = n.map(([m, b]) => f.filter(($) => b.keywords.includes($)));
    return h.forEach((m) => Wk(f, m)), f.forEach(function(m) {
      const b = gh(o, m), $ = jr(b.filter(zs), Gk(m));
      if ($.length === 1 && cs(Qk, m))
        u[m] = $[0].map((y) => s([y], y));
      else if ($.length === 1 && !cs(Xk, m) && !cs(e4, m))
        u[m] = $[0];
      else {
        const y = t.resolvers[m] || t.resolvers.defaultResolver;
        if (!y) throw new Error("No resolver found for key " + m + ". You can provide a resolver for this keyword in the options, or provide a default resolver.");
        const p = (g, v = []) => s(g, null, d.concat(m, v));
        u[m] = y($, d.concat(m), p, t), u[m] === void 0 ? yh($, d.concat(m)) : u[m] === void 0 && delete u[m];
      }
    }), n.reduce((m, [b, $], y) => ({
      ...m,
      ...Yk(h[y], b, o, s, t, d)
    }), u);
  }
  const a = tl(mh(e));
  return s(a);
}
nl.options = {
  resolvers: oe
};
var r4 = nl;
const n4 = /* @__PURE__ */ Mn(r4);
function Ir(e) {
  let t;
  const r = G(e, "discriminator.propertyName", void 0);
  return fa(r) ? t = r : r !== void 0 && console.warn(`Expecting discriminator to be a string, got "${typeof r}" instead`), t;
}
function Cn(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : e == null ? "null" : typeof e == "boolean" ? "boolean" : isNaN(e) ? typeof e == "object" ? "object" : "string" : "number";
}
var s4 = jo(function(e) {
  return np(qn(e, 1, Ds, !0));
});
function Ct(e) {
  let { type: t } = e;
  return !t && e.const ? Cn(e.const) : !t && e.enum ? "string" : !t && (e.properties || e.additionalProperties) ? "object" : (Array.isArray(t) && (t.length === 2 && t.includes("null") ? t = t.find((r) => r !== "null") : t = t[0]), t);
}
function At(e, t) {
  const r = Object.assign({}, e);
  return Object.keys(t).reduce((n, s) => {
    const a = e ? e[s] : {}, i = t[s];
    return e && s in e && ie(i) ? n[s] = At(a, i) : e && t && (Ct(e) === "object" || Ct(t) === "object") && s === _y && Array.isArray(a) && Array.isArray(i) ? n[s] = s4(a, i) : n[s] = i, n;
  }, r);
}
function Ke(e, t, r = {}, n, s) {
  return ft(e, t, r, n, void 0, void 0, s)[0];
}
function a4(e, t, r, n, s, a, i) {
  const { if: o, then: c, else: d, ...u } = t, f = e.isValid(o, a || {}, r);
  let h = [u], m = [];
  if (n)
    c && typeof c != "boolean" && (m = m.concat(ft(e, c, r, a, n, s, i))), d && typeof d != "boolean" && (m = m.concat(ft(e, d, r, a, n, s, i)));
  else {
    const b = f ? c : d;
    b && typeof b != "boolean" && (m = m.concat(ft(e, b, r, a, n, s, i)));
  }
  return m.length && (h = m.map((b) => At(u, b))), h.flatMap((b) => ft(e, b, r, a, n, s, i));
}
function bh(e) {
  return e.reduce(
    (r, n) => n.length > 1 ? n.flatMap((s) => Xf(r.length, (a) => [...r[a]].concat(s))) : (r.forEach((s) => s.push(n[0])), r),
    [[]]
    // Start with an empty list
  );
}
function i4(e, t, r, n, s, a, i) {
  const o = vh(e, t, r, n, s, a);
  if (o.length > 1 || o[0] !== t)
    return o;
  if (ea in t)
    return $h(e, t, r, n, s, a).flatMap((d) => ft(e, d, r, a, n, s, i));
  if (Lr in t && Array.isArray(t.allOf)) {
    const c = t.allOf.map((u) => ft(e, u, r, a, n, s, i));
    return bh(c).map((u) => ({
      ...t,
      allOf: u
    }));
  }
  return [t];
}
function vh(e, t, r, n, s, a, i) {
  const o = An(t, r, s);
  return o !== t ? ft(e, o, r, a, n, s, i) : [t];
}
function An(e, t, r) {
  if (!ie(e))
    return e;
  let n = e;
  if (Ce in n) {
    const { $ref: s, ...a } = n;
    if (r.includes(s))
      return n;
    r.push(s), n = { ...Vf(s, t), ...a };
  }
  if (Ne in n) {
    const s = [], a = Rx(n[Ne], (i, o, c) => {
      const d = [...r];
      i[c] = An(o, t, d), s.push(d);
    }, {});
    Wx(r, Xx(Bx(s))), n = { ...n, [Ne]: a };
  }
  return zt in n && !Array.isArray(n.items) && typeof n.items != "boolean" && (n = {
    ...n,
    items: An(n.items, t, r)
  }), we(e, n) ? e : n;
}
function o4(e, t, r, n, s) {
  const a = {
    ...t,
    properties: { ...t.properties }
  }, i = n && ie(n) ? n : {};
  return Object.keys(i).forEach((o) => {
    if (o in a.properties)
      return;
    let c = {};
    typeof a.additionalProperties != "boolean" ? Ce in a.additionalProperties ? c = Ke(e, { $ref: G(a.additionalProperties, [Ce]) }, r, i, s) : "type" in a.additionalProperties ? c = { ...a.additionalProperties } : nt in a.additionalProperties || qe in a.additionalProperties ? c = {
      type: "object",
      ...a.additionalProperties
    } : c = { type: Cn(G(i, [o])) } : c = { type: Cn(G(i, [o])) }, a.properties[o] = c, Ie(a.properties, [o, Un], !0);
  }), a;
}
function ft(e, t, r, n, s = !1, a = [], i) {
  return ie(t) ? i4(e, t, r, s, a, n, i).flatMap((c) => {
    var d;
    let u = c;
    if (xy in u)
      return a4(e, u, r, s, a, n, i);
    if (Lr in u) {
      if (s) {
        const { allOf: h, ...m } = u;
        return [...h, m];
      }
      try {
        const h = [], m = [];
        (d = u.allOf) === null || d === void 0 || d.forEach((b) => {
          typeof b == "object" && b.contains ? h.push(b) : m.push(b);
        }), h.length && (u = { ...u, allOf: m }), u = i ? i(u) : n4(u, {
          deep: !1
        }), h.length && (u.allOf = h);
      } catch (h) {
        console.warn(`could not merge subschemas in allOf:
`, h);
        const { allOf: m, ...b } = u;
        return b;
      }
    }
    return ji in u && u.additionalProperties !== !1 ? o4(e, u, r, n, i) : u;
  }) : [{}];
}
function l4(e, t, r, n, s) {
  let a;
  const { oneOf: i, anyOf: o, ...c } = t;
  if (Array.isArray(i) ? a = i : Array.isArray(o) && (a = o), a) {
    const d = s === void 0 && n ? {} : s, u = Ir(t);
    a = a.map((h) => An(h, r, []));
    const f = wo(e, d, a, r, u);
    if (n)
      return a.map((h) => At(c, h));
    t = At(c, a[f]);
  }
  return [t];
}
function $h(e, t, r, n, s, a, i) {
  const { dependencies: o, ...c } = t;
  return l4(e, c, r, n, a).flatMap((u) => xh(e, o, u, r, n, s, a, i));
}
function xh(e, t, r, n, s, a, i, o) {
  let c = [r];
  for (const d in t) {
    if (!s && G(i, [d]) === void 0 || r.properties && !(d in r.properties))
      continue;
    const [u, f] = $o(d, t);
    return Array.isArray(f) ? c[0] = c4(r, f) : ie(f) && (c = d4(e, r, n, d, f, s, a, i, o)), c.flatMap((h) => xh(e, u, h, n, s, a, i, o));
  }
  return c;
}
function c4(e, t) {
  if (!t)
    return e;
  const r = Array.isArray(e.required) ? Array.from(/* @__PURE__ */ new Set([...e.required, ...t])) : t;
  return { ...e, required: r };
}
function d4(e, t, r, n, s, a, i, o, c) {
  return ft(e, s, r, o, a, i, c).flatMap((u) => {
    const { oneOf: f, ...h } = u;
    if (t = At(t, h), f === void 0)
      return t;
    const m = f.map(($) => typeof $ == "boolean" || !(Ce in $) ? [$] : vh(e, $, r, a, i, o));
    return bh(m).flatMap(($) => u4(e, t, r, n, $, a, i, o, c));
  });
}
function u4(e, t, r, n, s, a, i, o, c) {
  const d = s.filter((u) => {
    if (typeof u == "boolean" || !u || !u.properties)
      return !1;
    const { [n]: f } = u.properties;
    if (f) {
      const h = {
        type: "object",
        properties: {
          [n]: f
        }
      };
      return e.isValid(h, o, r) || a;
    }
    return !1;
  });
  return !a && d.length !== 1 ? (console.warn("ignoring oneOf in dependencies because there isn't exactly one subschema that is valid"), [t]) : d.flatMap((u) => {
    const f = u, [h] = $o(n, f.properties), m = { ...f, properties: h };
    return ft(e, m, r, o, a, i, c).map(($) => At(t, $));
  });
}
const f4 = {
  type: "object",
  $id: wy,
  properties: {
    __not_really_there__: {
      type: "number"
    }
  }
};
function Li(e, t, r, n, s) {
  let a = 0;
  return r && (ve(r.properties) ? a += xx(r.properties, (i, o, c) => {
    const d = G(n, c);
    if (typeof o == "boolean")
      return i;
    if (We(o, Ce)) {
      const u = Ke(e, o, t, d, s);
      return i + Li(e, t, u, d || {}, s);
    }
    if ((We(o, qe) || We(o, nt)) && d) {
      const u = We(o, qe) ? qe : nt, f = Ir(o);
      return i + Pn(e, t, d, G(o, u), -1, f, s);
    }
    if (o.type === "object")
      return ve(d) && (i += 1), i + Li(e, t, o, d, s);
    if (o.type === Cn(d)) {
      let u = i + 1;
      return o.default ? u += d === o.default ? 1 : -1 : o.const && (u += d === o.const ? 1 : -1), u;
    }
    return i;
  }, 0) : fa(r.type) && r.type === Cn(n) && (a += 1)), a;
}
function Pn(e, t, r, n, s = -1, a, i) {
  const o = n.map((h) => An(h, t, [])), c = Qf(r, n, a);
  if (zf(c))
    return c;
  const d = o.reduce((h, m, b) => (wo(e, r, [f4, m], t, a) === 1 && h.push(b), h), []);
  if (d.length === 1)
    return d[0];
  d.length || Xf(o.length, (h) => d.push(h));
  const u = /* @__PURE__ */ new Set(), { bestIndex: f } = d.reduce((h, m) => {
    const { bestScore: b } = h, $ = o[m], y = Li(e, t, $, r, i);
    return u.add(y), y > b ? { bestIndex: m, bestScore: y } : h;
  }, { bestIndex: s, bestScore: 0 });
  return u.size === 1 && s >= 0 ? s : f;
}
function Ui(e) {
  return Array.isArray(e.items) && e.items.length > 0 && e.items.every((t) => ie(t));
}
function $n(e) {
  return e == null;
}
function Tn(e, t, r = !1, n = !1, s = !1) {
  if (Array.isArray(t)) {
    const a = Array.isArray(e) ? e : [], i = s ? a : t, o = s ? t : a, c = i.map((d, u) => o[u] !== void 0 ? Tn(a[u], t[u], r, n, s) : d);
    return (r || s) && c.length < o.length && c.push(...o.slice(c.length)), c;
  }
  if (ie(t)) {
    const a = Object.assign({}, e);
    return Object.keys(t).reduce((i, o) => {
      const c = G(t, o), d = ie(e) && o in e, u = o in t;
      return i[o] = Tn(
        e ? G(e, o) : {},
        c,
        r,
        n,
        // overrideFormDataWithDefaults can be true only when the key value exists in defaults
        // Or if the key value doesn't exist in formData
        s && (d || !u)
      ), i;
    }, a);
  }
  return n && (!$n(e) && $n(t) || typeof t == "number" && isNaN(t)) || s && !$n(t) ? e : t;
}
function jt(e, t, r = !1) {
  return Object.keys(t).reduce((n, s) => {
    const a = e ? e[s] : {}, i = t[s];
    if (e && s in e && ie(i))
      n[s] = jt(a, i, r);
    else if (r && Array.isArray(a) && Array.isArray(i)) {
      let o = i;
      r === "preventDuplicates" && (o = i.reduce((c, d) => (a.includes(d) || c.push(d), c), [])), n[s] = a.concat(o);
    } else
      n[s] = i;
    return n;
  }, Object.assign({}, e));
}
function wh(e) {
  return Array.isArray(e.enum) && e.enum.length === 1 || Ot in e;
}
function sl(e, t, r = {}, n) {
  const s = Ke(e, t, r, void 0, n), a = s.oneOf || s.anyOf;
  return Array.isArray(s.enum) ? !0 : Array.isArray(a) ? a.every((i) => typeof i != "boolean" && wh(i)) : !1;
}
function al(e, t, r, n) {
  return !t.uniqueItems || !t.items || typeof t.items == "boolean" ? !1 : sl(e, t.items, r, n);
}
function _h(e) {
  const t = e[Ot], r = Ct(e);
  return ie(t) && fa(t == null ? void 0 : t.$data) && r !== "object" && r !== "array";
}
function p4(e) {
  if ($y in e && Array.isArray(e.enum) && e.enum.length === 1)
    return e.enum[0];
  if (Ot in e)
    return e.const;
  throw new Error("schema cannot be inferred as a constant");
}
function In(e, t) {
  const r = e;
  if (e.enum) {
    let a;
    if (t) {
      const { enumNames: i } = ae(t);
      a = i;
    }
    return !a && r.enumNames && (a = r.enumNames), e.enum.map((i, o) => ({ label: (a == null ? void 0 : a[o]) || String(i), value: i }));
  }
  let n, s;
  return e.anyOf ? (n = e.anyOf, s = t == null ? void 0 : t.anyOf) : e.oneOf && (n = e.oneOf, s = t == null ? void 0 : t.oneOf), n && n.map((a, i) => {
    const { title: o } = ae(s == null ? void 0 : s[i]), c = a, d = p4(c), u = o || c.title || String(d);
    return {
      schema: c,
      label: u,
      value: d
    };
  });
}
const h4 = ["string", "number", "integer", "boolean", "null"];
var kr;
(function(e) {
  e[e.Ignore = 0] = "Ignore", e[e.Invert = 1] = "Invert", e[e.Fallback = 2] = "Fallback";
})(kr || (kr = {}));
function oi(e, t = kr.Ignore, r = -1) {
  if (r >= 0) {
    if (Array.isArray(e.items) && r < e.items.length) {
      const n = e.items[r];
      if (typeof n != "boolean")
        return n;
    }
  } else if (e.items && !Array.isArray(e.items) && typeof e.items != "boolean")
    return e.items;
  return t !== kr.Ignore && ie(e.additionalItems) ? e.additionalItems : {};
}
function ru(e, t, r, n, s, a = [], i = {}, o = !1) {
  const { emptyObjectFields: c = "populateAllDefaults" } = i;
  if (n || o)
    e[t] = r;
  else if (c !== "skipDefaults") {
    const d = s === void 0 ? a.includes(t) : s;
    ie(r) ? c === "skipEmptyDefaults" ? Ar(r) || (e[t] = r) : (!Ar(r) || a.includes(t)) && (d || c !== "populateRequiredDefaults") && (e[t] = r) : (
      // Store computedDefault if it's a defined primitive (e.g., true) and satisfies certain conditions
      // Condition 1: computedDefault is not undefined
      // Condition 2: If emptyObjectFields is 'populateAllDefaults' or 'skipEmptyDefaults)
      // Or if isSelfOrParentRequired is 'true' and the key is a required field
      r !== void 0 && (c === "populateAllDefaults" || c === "skipEmptyDefaults" || d && a.includes(t)) && (e[t] = r)
    );
  }
}
function qt(e, t, r = {}) {
  const { parentDefaults: n, rawFormData: s, rootSchema: a = {}, includeUndefinedValues: i = !1, _recurseList: o = [], experimental_defaultFormStateBehavior: c = void 0, experimental_customMergeAllOf: d = void 0, required: u, shouldMergeDefaultsIntoFormData: f = !1 } = r;
  let h = ie(s) ? s : {};
  const m = ie(t) ? t : {};
  let b = n, $ = null, y = c, p = o;
  if (m[Ot] !== void 0 && (c == null ? void 0 : c.constAsDefaults) !== "never" && !_h(m))
    b = m[Ot];
  else if (ie(b) && ie(m.default))
    b = jt(b, m.default);
  else if (vy in m && !m[nt] && !m[qe])
    b = m.default;
  else if (Ce in m) {
    const _ = m[Ce];
    o.includes(_) || (p = o.concat(_), $ = Vf(_, a)), $ && !b && (b = m.default), f && $ && !ie(s) && (h = s);
  } else if (ea in m) {
    const _ = {
      ...nu(e, m, r, b),
      ...h
    };
    $ = $h(e, m, a, !1, [], _, d)[0];
  } else if (Ui(m))
    b = m.items.map((_, w) => qt(e, _, {
      rootSchema: a,
      includeUndefinedValues: i,
      _recurseList: o,
      experimental_defaultFormStateBehavior: c,
      experimental_customMergeAllOf: d,
      parentDefaults: Array.isArray(n) ? n[w] : void 0,
      rawFormData: h,
      required: u,
      shouldMergeDefaultsIntoFormData: f
    }));
  else if (qe in m) {
    const { oneOf: _, ...w } = m;
    if (_.length === 0)
      return;
    const S = Ir(m), { type: O = "null" } = w;
    !Array.isArray(O) && h4.includes(O) && (y == null ? void 0 : y.constAsDefaults) === "skipOneOf" && (y = {
      ...y,
      constAsDefaults: "never"
    }), $ = _[Pn(e, a, s ?? m.default, _, 0, S, d)], $ = At(w, $);
  } else if (nt in m) {
    const { anyOf: _, ...w } = m;
    if (_.length === 0)
      return;
    const S = Ir(m);
    $ = _[Pn(e, a, s ?? m.default, _, 0, S, d)], $ = At(w, $);
  }
  if ($)
    return qt(e, $, {
      rootSchema: a,
      includeUndefinedValues: i,
      _recurseList: p,
      experimental_defaultFormStateBehavior: y,
      experimental_customMergeAllOf: d,
      parentDefaults: b,
      rawFormData: s ?? h,
      required: u,
      shouldMergeDefaultsIntoFormData: f
    });
  b === void 0 && (b = m.default);
  const g = nu(e, m, r, b);
  let v = g ?? b;
  if (f) {
    const { arrayMinItems: _ = {} } = c || {}, { mergeExtraDefaults: w } = _, S = m4(e, m, a, s, c, d);
    (!ie(s) || Lr in m) && (v = Tn(v, S, w, !0));
  }
  return v;
}
function m4(e, t, r, n, s, a) {
  const i = !wh(t) && sl(e, t, r, a);
  let o = n;
  if (i) {
    const d = In(t);
    o = (d == null ? void 0 : d.some((f) => we(f.value, n))) ? n : void 0;
  }
  return t[Ot] && (s == null ? void 0 : s.constAsDefaults) === "always" && (o = t.const), o;
}
function g4(e, t, { rawFormData: r, rootSchema: n = {}, includeUndefinedValues: s = !1, _recurseList: a = [], experimental_defaultFormStateBehavior: i = void 0, experimental_customMergeAllOf: o = void 0, required: c, shouldMergeDefaultsIntoFormData: d } = {}, u) {
  {
    const f = ie(r) ? r : {}, h = t, m = (i == null ? void 0 : i.allOf) === "populateDefaults" && Lr in h ? Ke(e, h, n, f, o) : h, b = m[Ot], $ = Object.keys(m.properties || {}).reduce((y, p) => {
      var g;
      const v = G(m, [Ne, p]), _ = ie(b) && b[p] !== void 0, w = (ie(v) && Ot in v || _) && (i == null ? void 0 : i.constAsDefaults) !== "never" && !_h(v), S = qt(e, v, {
        rootSchema: n,
        _recurseList: a,
        experimental_defaultFormStateBehavior: i,
        experimental_customMergeAllOf: o,
        includeUndefinedValues: s === !0,
        parentDefaults: G(u, [p]),
        rawFormData: G(f, [p]),
        required: (g = m.required) === null || g === void 0 ? void 0 : g.includes(p),
        shouldMergeDefaultsIntoFormData: d
      });
      return ru(y, p, S, s, c, m.required, i, w), y;
    }, {});
    if (m.additionalProperties) {
      const y = ie(m.additionalProperties) ? m.additionalProperties : {}, p = /* @__PURE__ */ new Set();
      ie(u) && Object.keys(u).filter((v) => !m.properties || !m.properties[v]).forEach((v) => p.add(v));
      const g = [];
      Object.keys(f).filter((v) => !m.properties || !m.properties[v]).forEach((v) => {
        p.add(v), g.push(v);
      }), p.forEach((v) => {
        var _;
        const w = qt(e, y, {
          rootSchema: n,
          _recurseList: a,
          experimental_defaultFormStateBehavior: i,
          experimental_customMergeAllOf: o,
          includeUndefinedValues: s === !0,
          parentDefaults: G(u, [v]),
          rawFormData: G(f, [v]),
          required: (_ = m.required) === null || _ === void 0 ? void 0 : _.includes(v),
          shouldMergeDefaultsIntoFormData: d
        });
        ru($, v, w, s, c, g);
      });
    }
    return $;
  }
}
function y4(e, t, { rawFormData: r, rootSchema: n = {}, _recurseList: s = [], experimental_defaultFormStateBehavior: a = void 0, experimental_customMergeAllOf: i = void 0, required: o, shouldMergeDefaultsIntoFormData: c } = {}, d) {
  var u, f;
  const h = t, m = (u = a == null ? void 0 : a.arrayMinItems) !== null && u !== void 0 ? u : {}, { populate: b, mergeExtraDefaults: $ } = m, y = b === "never", p = b === "requiredOnly", g = b === "all" || !y && !p, v = (f = m == null ? void 0 : m.computeSkipPopulate) !== null && f !== void 0 ? f : () => !1, w = (a == null ? void 0 : a.emptyObjectFields) === "skipEmptyDefaults" ? void 0 : [];
  if (Array.isArray(d) && (d = d.map((L, W) => {
    const I = oi(h, kr.Fallback, W);
    return qt(e, I, {
      rootSchema: n,
      _recurseList: s,
      experimental_defaultFormStateBehavior: a,
      experimental_customMergeAllOf: i,
      parentDefaults: L,
      required: o,
      shouldMergeDefaultsIntoFormData: c
    });
  })), Array.isArray(r)) {
    const L = oi(h);
    if (y)
      d = r;
    else {
      const W = r.map((P, k) => qt(e, L, {
        rootSchema: n,
        _recurseList: s,
        experimental_defaultFormStateBehavior: a,
        experimental_customMergeAllOf: i,
        rawFormData: P,
        parentDefaults: G(d, [k]),
        required: o,
        shouldMergeDefaultsIntoFormData: c
      }));
      d = Tn(d, W, (p && o || g) && $);
    }
  }
  if ((ie(h) && Ot in h && (a == null ? void 0 : a.constAsDefaults) !== "never") === !1) {
    if (y)
      return d ?? w;
    if (p && !o)
      return d || void 0;
  }
  const O = Array.isArray(d) ? d.length : 0;
  if (!h.minItems || al(e, h, n, i) || v(e, h, n) || h.minItems <= O)
    return d || w;
  const D = d || [], N = oi(h, kr.Invert), A = N.default, R = new Array(h.minItems - O).fill(qt(e, N, {
    parentDefaults: A,
    rootSchema: n,
    _recurseList: s,
    experimental_defaultFormStateBehavior: a,
    experimental_customMergeAllOf: i,
    required: o,
    shouldMergeDefaultsIntoFormData: c
  }));
  return D.concat(R);
}
function nu(e, t, r = {}, n) {
  switch (Ct(t)) {
    case "object":
      return g4(e, t, r, n);
    case "array":
      return y4(e, t, r, n);
  }
}
function jh(e, t, r, n, s = !1, a, i) {
  if (!ie(t))
    throw new Error("Invalid schema: " + t);
  const o = Ke(e, t, n, r, i), c = qt(e, o, {
    rootSchema: n,
    includeUndefinedValues: s,
    experimental_defaultFormStateBehavior: a,
    experimental_customMergeAllOf: i,
    rawFormData: r,
    shouldMergeDefaultsIntoFormData: !0
  });
  if (ie(r) || Array.isArray(r)) {
    const { mergeDefaultsIntoFormData: d } = a || {};
    return Tn(
      c,
      r,
      !0,
      d === "useDefaultIfFormDataUndefined",
      !0
      // set to true to override formData with defaults if they exist.
    );
  }
  return c;
}
function Sh(e = {}) {
  return (
    // TODO: Remove the `&& uiSchema['ui:widget'] !== 'hidden'` once we support hidden widgets for arrays.
    // https://rjsf-team.github.io/react-jsonschema-form/docs/usage/widgets/#hidden-widgets
    "widget" in ae(e) && ae(e).widget !== "hidden"
  );
}
function Nh(e, t, r = {}, n, s) {
  if (r[ro] === "files")
    return !0;
  if (t.items) {
    const a = Ke(e, t.items, n, void 0, s);
    return a.type === "string" && a.format === "data-url";
  }
  return !1;
}
function b4(e, t, r = {}, n, s, a) {
  const i = ae(r, s), { label: o = !0 } = i;
  let c = !!o;
  const d = Ct(t);
  return d === "array" && (c = al(e, t, n, a) || Nh(e, t, r, n, a) || Sh(r)), d === "object" && (c = !1), d === "boolean" && !r[ro] && (c = !1), r[jy] && (c = !1), c;
}
function v4(e, t, r) {
  if (!r)
    return t;
  const { errors: n, errorSchema: s } = t;
  let a = e.toErrorList(r), i = r;
  return Ar(s) || (i = jt(s, r, !0), a = [...n].concat(a)), { errorSchema: i, errors: a };
}
const br = Symbol("no Value");
function Wi(e, t, r, n, s = {}, a) {
  let i;
  if (We(r, Ne)) {
    const o = {};
    if (We(n, Ne)) {
      const u = G(n, Ne, {});
      Object.keys(u).forEach((f) => {
        We(s, f) && (o[f] = void 0);
      });
    }
    const c = Object.keys(G(r, Ne, {})), d = {};
    c.forEach((u) => {
      const f = G(s, u);
      let h = G(n, [Ne, u], {}), m = G(r, [Ne, u], {});
      We(h, Ce) && (h = Ke(e, h, t, f, a)), We(m, Ce) && (m = Ke(e, m, t, f, a));
      const b = G(h, "type"), $ = G(m, "type");
      if (!b || b === $)
        if (We(o, u) && delete o[u], $ === "object" || $ === "array" && Array.isArray(f)) {
          const y = Wi(e, t, m, h, f, a);
          (y !== void 0 || $ === "array") && (d[u] = y);
        } else {
          const y = G(m, "default", br), p = G(h, "default", br);
          y !== br && y !== f && (p === f ? o[u] = y : G(m, "readOnly") === !0 && (o[u] = void 0));
          const g = G(m, "const", br), v = G(h, "const", br);
          g !== br && g !== f && (o[u] = v === f ? g : void 0);
        }
    }), i = {
      ...typeof s == "string" || Array.isArray(s) ? void 0 : s,
      ...o,
      ...d
    };
  } else if (G(n, "type") === "array" && G(r, "type") === "array" && Array.isArray(s)) {
    let o = G(n, "items"), c = G(r, "items");
    if (typeof o == "object" && typeof c == "object" && !Array.isArray(o) && !Array.isArray(c)) {
      We(o, Ce) && (o = Ke(e, o, t, s, a)), We(c, Ce) && (c = Ke(e, c, t, s, a));
      const d = G(o, "type"), u = G(c, "type");
      if (!d || d === u) {
        const f = G(r, "maxItems", -1);
        u === "object" ? i = s.reduce((h, m) => {
          const b = Wi(e, t, c, o, m, a);
          return b !== void 0 && (f < 0 || h.length < f) && h.push(b), h;
        }, []) : i = f > 0 && s.length > f ? s.slice(0, f) : s;
      }
    } else typeof o == "boolean" && typeof c == "boolean" && o === c && (i = s);
  }
  return i;
}
function xs(e, t, r, n, s, a, i, o = [], c) {
  if (Ce in t || ea in t || Lr in t) {
    const f = Ke(e, t, a, i, c);
    if (o.findIndex((m) => we(m, f)) === -1)
      return xs(e, f, r, n, s, a, i, o.concat(f), c);
  }
  if (zt in t && !G(t, [zt, Ce]))
    return xs(e, G(t, zt), r, n, s, a, i, o, c);
  const u = { $id: s || r };
  if (Ct(t) === "object" && Ne in t)
    for (const f in t.properties) {
      const h = G(t, [Ne, f]), m = u[Wt] + n + f;
      u[f] = xs(
        e,
        ie(h) ? h : {},
        r,
        n,
        m,
        a,
        // It's possible that formData is not an object -- this can happen if an
        // array item has just been added, but not populated with data yet
        G(i, [f]),
        o,
        c
      );
    }
  return u;
}
function $4(e, t, r, n, s, a = "root", i = "_", o) {
  return xs(e, t, a, i, r, n, s, void 0, o);
}
function Zt(e, t, r, n, s, a = [], i) {
  if (Ce in t || ea in t || Lr in t) {
    const c = Ke(e, t, n, s, i);
    if (a.findIndex((u) => we(u, c)) === -1)
      return Zt(e, c, r, n, s, a.concat(c), i);
  }
  let o = {
    [bs]: r.replace(/^\./, "")
  };
  if (qe in t || nt in t) {
    const c = qe in t ? t.oneOf : t.anyOf, d = Ir(t), u = Pn(e, n, s, c, 0, d, i), f = c[u];
    o = {
      ...o,
      ...Zt(e, f, r, n, s, a, i)
    };
  }
  if (ji in t && t[ji] !== !1 && Ie(o, to, !0), zt in t && Array.isArray(s)) {
    const { items: c, additionalItems: d } = t;
    Array.isArray(c) ? s.forEach((u, f) => {
      c[f] ? o[f] = Zt(e, c[f], `${r}.${f}`, n, u, a, i) : d ? o[f] = Zt(e, d, `${r}.${f}`, n, u, a, i) : console.warn(`Unable to generate path schema for "${r}.${f}". No schema defined for it`);
    }) : s.forEach((u, f) => {
      o[f] = Zt(e, c, `${r}.${f}`, n, u, a, i);
    });
  } else if (Ne in t)
    for (const c in t.properties) {
      const d = G(t, [Ne, c]);
      o[c] = Zt(
        e,
        d,
        `${r}.${c}`,
        n,
        // It's possible that formData is not an object -- this can happen if an
        // array item has just been added, but not populated with data yet
        G(s, [c]),
        a,
        i
      );
    }
  return o;
}
function x4(e, t, r = "", n, s, a) {
  return Zt(e, t, r, n, s, void 0, a);
}
class w4 {
  /** Constructs the `SchemaUtils` instance with the given `validator` and `rootSchema` stored as instance variables
   *
   * @param validator - An implementation of the `ValidatorType` interface that will be forwarded to all the APIs
   * @param rootSchema - The root schema that will be forwarded to all the APIs
   * @param experimental_defaultFormStateBehavior - Configuration flags to allow users to override default form state behavior
   * @param [experimental_customMergeAllOf] - Optional function that allows for custom merging of `allOf` schemas
   */
  constructor(t, r, n, s) {
    this.rootSchema = r, this.validator = t, this.experimental_defaultFormStateBehavior = n, this.experimental_customMergeAllOf = s;
  }
  /** Returns the `ValidatorType` in the `SchemaUtilsType`
   *
   * @returns - The `ValidatorType`
   */
  getValidator() {
    return this.validator;
  }
  /** Determines whether either the `validator` and `rootSchema` differ from the ones associated with this instance of
   * the `SchemaUtilsType`. If either `validator` or `rootSchema` are falsy, then return false to prevent the creation
   * of a new `SchemaUtilsType` with incomplete properties.
   *
   * @param validator - An implementation of the `ValidatorType` interface that will be compared against the current one
   * @param rootSchema - The root schema that will be compared against the current one
   * @param [experimental_defaultFormStateBehavior] Optional configuration object, if provided, allows users to override default form state behavior
   * @param [experimental_customMergeAllOf] - Optional function that allows for custom merging of `allOf` schemas
   * @returns - True if the `SchemaUtilsType` differs from the given `validator` or `rootSchema`
   */
  doesSchemaUtilsDiffer(t, r, n = {}, s) {
    return !t || !r ? !1 : this.validator !== t || !we(this.rootSchema, r) || !we(this.experimental_defaultFormStateBehavior, n) || this.experimental_customMergeAllOf !== s;
  }
  /** Returns the superset of `formData` that includes the given set updated to include any missing fields that have
   * computed to have defaults provided in the `schema`.
   *
   * @param schema - The schema for which the default state is desired
   * @param [formData] - The current formData, if any, onto which to provide any missing defaults
   * @param [includeUndefinedValues=false] - Optional flag, if true, cause undefined values to be added as defaults.
   *          If "excludeObjectChildren", pass `includeUndefinedValues` as false when computing defaults for any nested
   *          object properties.
   * @returns - The resulting `formData` with all the defaults provided
   */
  getDefaultFormState(t, r, n = !1) {
    return jh(this.validator, t, r, this.rootSchema, n, this.experimental_defaultFormStateBehavior, this.experimental_customMergeAllOf);
  }
  /** Determines whether the combination of `schema` and `uiSchema` properties indicates that the label for the `schema`
   * should be displayed in a UI.
   *
   * @param schema - The schema for which the display label flag is desired
   * @param [uiSchema] - The UI schema from which to derive potentially displayable information
   * @param [globalOptions={}] - The optional Global UI Schema from which to get any fallback `xxx` options
   * @returns - True if the label should be displayed or false if it should not
   */
  getDisplayLabel(t, r, n) {
    return b4(this.validator, t, r, this.rootSchema, n, this.experimental_customMergeAllOf);
  }
  /** Determines which of the given `options` provided most closely matches the `formData`.
   * Returns the index of the option that is valid and is the closest match, or 0 if there is no match.
   *
   * The closest match is determined using the number of matching properties, and more heavily favors options with
   * matching readOnly, default, or const values.
   *
   * @param formData - The form data associated with the schema
   * @param options - The list of options that can be selected from
   * @param [selectedOption] - The index of the currently selected option, defaulted to -1 if not specified
   * @param [discriminatorField] - The optional name of the field within the options object whose value is used to
   *          determine which option is selected
   * @returns - The index of the option that is the closest match to the `formData` or the `selectedOption` if no match
   */
  getClosestMatchingOption(t, r, n, s) {
    return Pn(this.validator, this.rootSchema, t, r, n, s, this.experimental_customMergeAllOf);
  }
  /** Given the `formData` and list of `options`, attempts to find the index of the first option that matches the data.
   * Always returns the first option if there is nothing that matches.
   *
   * @param formData - The current formData, if any, used to figure out a match
   * @param options - The list of options to find a matching options from
   * @param [discriminatorField] - The optional name of the field within the options object whose value is used to
   *          determine which option is selected
   * @returns - The firstindex of the matched option or 0 if none is available
   */
  getFirstMatchingOption(t, r, n) {
    return wo(this.validator, t, r, this.rootSchema, n);
  }
  /** Given the `formData` and list of `options`, attempts to find the index of the option that best matches the data.
   * Deprecated, use `getFirstMatchingOption()` instead.
   *
   * @param formData - The current formData, if any, onto which to provide any missing defaults
   * @param options - The list of options to find a matching options from
   * @param [discriminatorField] - The optional name of the field within the options object whose value is used to
   *          determine which option is selected
   * @returns - The index of the matched option or 0 if none is available
   * @deprecated
   */
  getMatchingOption(t, r, n) {
    return ep(this.validator, t, r, this.rootSchema, n);
  }
  /** Checks to see if the `schema` and `uiSchema` combination represents an array of files
   *
   * @param schema - The schema for which check for array of files flag is desired
   * @param [uiSchema] - The UI schema from which to check the widget
   * @returns - True if schema/uiSchema contains an array of files, otherwise false
   */
  isFilesArray(t, r) {
    return Nh(this.validator, t, r, this.rootSchema, this.experimental_customMergeAllOf);
  }
  /** Checks to see if the `schema` combination represents a multi-select
   *
   * @param schema - The schema for which check for a multi-select flag is desired
   * @returns - True if schema contains a multi-select, otherwise false
   */
  isMultiSelect(t) {
    return al(this.validator, t, this.rootSchema, this.experimental_customMergeAllOf);
  }
  /** Checks to see if the `schema` combination represents a select
   *
   * @param schema - The schema for which check for a select flag is desired
   * @returns - True if schema contains a select, otherwise false
   */
  isSelect(t) {
    return sl(this.validator, t, this.rootSchema, this.experimental_customMergeAllOf);
  }
  /** Merges the errors in `additionalErrorSchema` into the existing `validationData` by combining the hierarchies in
   * the two `ErrorSchema`s and then appending the error list from the `additionalErrorSchema` obtained by calling
   * `getValidator().toErrorList()` onto the `errors` in the `validationData`. If no `additionalErrorSchema` is passed,
   * then `validationData` is returned.
   *
   * @param validationData - The current `ValidationData` into which to merge the additional errors
   * @param [additionalErrorSchema] - The additional set of errors
   * @returns - The `validationData` with the additional errors from `additionalErrorSchema` merged into it, if provided.
   * @deprecated - Use the `validationDataMerge()` function exported from `@rjsf/utils` instead. This function will be
   *        removed in the next major release.
   */
  mergeValidationData(t, r) {
    return v4(this.validator, t, r);
  }
  /** Retrieves an expanded schema that has had all of its conditions, additional properties, references and
   * dependencies resolved and merged into the `schema` given a `rawFormData` that is used to do the potentially
   * recursive resolution.
   *
   * @param schema - The schema for which retrieving a schema is desired
   * @param [rawFormData] - The current formData, if any, to assist retrieving a schema
   * @returns - The schema having its conditions, additional properties, references and dependencies resolved
   */
  retrieveSchema(t, r) {
    return Ke(this.validator, t, this.rootSchema, r, this.experimental_customMergeAllOf);
  }
  /** Sanitize the `data` associated with the `oldSchema` so it is considered appropriate for the `newSchema`. If the
   * new schema does not contain any properties, then `undefined` is returned to clear all the form data. Due to the
   * nature of schemas, this sanitization happens recursively for nested objects of data. Also, any properties in the
   * old schemas that are non-existent in the new schema are set to `undefined`.
   *
   * @param [newSchema] - The new schema for which the data is being sanitized
   * @param [oldSchema] - The old schema from which the data originated
   * @param [data={}] - The form data associated with the schema, defaulting to an empty object when undefined
   * @returns - The new form data, with all the fields uniquely associated with the old schema set
   *      to `undefined`. Will return `undefined` if the new schema is not an object containing properties.
   */
  sanitizeDataForNewSchema(t, r, n) {
    return Wi(this.validator, this.rootSchema, t, r, n, this.experimental_customMergeAllOf);
  }
  /** Generates an `IdSchema` object for the `schema`, recursively
   *
   * @param schema - The schema for which the display label flag is desired
   * @param [id] - The base id for the schema
   * @param [formData] - The current formData, if any, onto which to provide any missing defaults
   * @param [idPrefix='root'] - The prefix to use for the id
   * @param [idSeparator='_'] - The separator to use for the path segments in the id
   * @returns - The `IdSchema` object for the `schema`
   */
  toIdSchema(t, r, n, s = "root", a = "_") {
    return $4(this.validator, t, r, this.rootSchema, n, s, a, this.experimental_customMergeAllOf);
  }
  /** Generates an `PathSchema` object for the `schema`, recursively
   *
   * @param schema - The schema for which the display label flag is desired
   * @param [name] - The base name for the schema
   * @param [formData] - The current formData, if any, onto which to provide any missing defaults
   * @returns - The `PathSchema` object for the `schema`
   */
  toPathSchema(t, r, n) {
    return x4(this.validator, t, r, this.rootSchema, n, this.experimental_customMergeAllOf);
  }
}
function _4(e, t, r = {}, n) {
  return new w4(e, t, r, n);
}
function j4(e) {
  var t;
  if (e.indexOf("data:") === -1)
    throw new Error("File is invalid: URI must be a dataURI");
  const n = e.slice(5).split(";base64,");
  if (n.length !== 2)
    throw new Error("File is invalid: dataURI must be base64");
  const [s, a] = n, [i, ...o] = s.split(";"), c = i || "", d = decodeURI(
    // parse the parameters into key-value pairs, find a key, and extract a value
    // if no key is found, then the name is unknown
    ((t = o.map((u) => u.split("=")).find(([u]) => u === "name")) === null || t === void 0 ? void 0 : t[1]) || "unknown"
  );
  try {
    const u = atob(a), f = new Array(u.length);
    for (let m = 0; m < u.length; m++)
      f[m] = u.charCodeAt(m);
    return { blob: new window.Blob([new Uint8Array(f)], { type: c }), name: d };
  } catch (u) {
    throw new Error("File is invalid: " + u.message);
  }
}
function Ut(e, t) {
  let r = String(e);
  for (; r.length < t; )
    r = "0" + r;
  return r;
}
function Eh(e, t) {
  if (e <= 0 && t <= 0)
    e = (/* @__PURE__ */ new Date()).getFullYear() + e, t = (/* @__PURE__ */ new Date()).getFullYear() + t;
  else if (e < 0 || t < 0)
    throw new Error(`Both start (${e}) and stop (${t}) must both be <= 0 or > 0, got one of each`);
  if (e > t)
    return Eh(t, e).reverse();
  const r = [];
  for (let n = e; n <= t; n++)
    r.push({ value: n, label: Ut(n, 2) });
  return r;
}
function S4(e, t) {
  let r = e;
  if (Array.isArray(t)) {
    const n = r.split(/(%\d)/);
    t.forEach((s, a) => {
      const i = n.findIndex((o) => o === `%${a + 1}`);
      i >= 0 && (n[i] = s);
    }), r = n.join("");
  }
  return r;
}
function N4(e, t) {
  return S4(e, t);
}
function mt(e, t = [], r) {
  if (Array.isArray(e))
    return e.map((a) => mt(a, t)).filter((a) => a !== r);
  const n = e === "" || e === null ? -1 : Number(e), s = t[n];
  return s ? s.value : r;
}
function E4(e, t, r = []) {
  const n = mt(e, r);
  return Array.isArray(t) ? t.filter((s) => !we(s, n)) : we(n, t) ? void 0 : t;
}
function il(e, t) {
  return Array.isArray(t) ? t.some((r) => we(r, e)) : we(t, e);
}
function O4(e, t = [], r = !1) {
  const n = t.map((s, a) => il(s.value, e) ? String(a) : void 0).filter((s) => typeof s < "u");
  return r ? n : n[0];
}
function C4(e, t, r = []) {
  const n = mt(e, r);
  if (!$n(n)) {
    const s = r.findIndex((o) => n === o.value), a = r.map(({ value: o }) => o);
    return t.slice(0, s).concat(n, t.slice(s)).sort((o, c) => +(a.indexOf(o) > a.indexOf(c)));
  }
  return t;
}
var A4 = 1, P4 = 4;
function Oh(e) {
  return vn(e, A4 | P4);
}
function T4(e, t, r, n) {
  return n = typeof n == "function" ? n : void 0, e == null ? e : _o(e, t, r, n);
}
class I4 {
  /** Construct an `ErrorSchemaBuilder` with an optional initial set of errors in an `ErrorSchema`.
   *
   * @param [initialSchema] - The optional set of initial errors, that will be cloned into the class
   */
  constructor(t) {
    this.errorSchema = {}, this.resetAllErrors(t);
  }
  /** Returns the `ErrorSchema` that has been updated by the methods of the `ErrorSchemaBuilder`
   */
  get ErrorSchema() {
    return this.errorSchema;
  }
  /** Will get an existing `ErrorSchema` at the specified `pathOfError` or create and return one.
   *
   * @param [pathOfError] - The optional path into the `ErrorSchema` at which to add the error(s)
   * @returns - The error block for the given `pathOfError` or the root if not provided
   * @private
   */
  getOrCreateErrorBlock(t) {
    let n = Array.isArray(t) && t.length > 0 || typeof t == "string" ? G(this.errorSchema, t) : this.errorSchema;
    return !n && t && (n = {}, T4(this.errorSchema, t, n, Object)), n;
  }
  /** Resets all errors in the `ErrorSchemaBuilder` back to the `initialSchema` if provided, otherwise an empty set.
   *
   * @param [initialSchema] - The optional set of initial errors, that will be cloned into the class
   * @returns - The `ErrorSchemaBuilder` object for chaining purposes
   */
  resetAllErrors(t) {
    return this.errorSchema = t ? Oh(t) : {}, this;
  }
  /** Adds the `errorOrList` to the list of errors in the `ErrorSchema` at either the root level or the location within
   * the schema described by the `pathOfError`. For more information about how to specify the path see the
   * [eslint lodash plugin docs](https://github.com/wix/eslint-plugin-lodash/blob/master/docs/rules/path-style.md).
   *
   * @param errorOrList - The error or list of errors to add into the `ErrorSchema`
   * @param [pathOfError] - The optional path into the `ErrorSchema` at which to add the error(s)
   * @returns - The `ErrorSchemaBuilder` object for chaining purposes
   */
  addErrors(t, r) {
    const n = this.getOrCreateErrorBlock(r);
    let s = G(n, ze);
    return Array.isArray(s) || (s = [], n[ze] = s), Array.isArray(t) ? Ie(n, ze, [.../* @__PURE__ */ new Set([...s, ...t])]) : Ie(n, ze, [.../* @__PURE__ */ new Set([...s, t])]), this;
  }
  /** Sets/replaces the `errorOrList` as the error(s) in the `ErrorSchema` at either the root level or the location
   * within the schema described by the `pathOfError`. For more information about how to specify the path see the
   * [eslint lodash plugin docs](https://github.com/wix/eslint-plugin-lodash/blob/master/docs/rules/path-style.md).
   *
   * @param errorOrList - The error or list of errors to set into the `ErrorSchema`
   * @param [pathOfError] - The optional path into the `ErrorSchema` at which to set the error(s)
   * @returns - The `ErrorSchemaBuilder` object for chaining purposes
   */
  setErrors(t, r) {
    const n = this.getOrCreateErrorBlock(r), s = Array.isArray(t) ? [.../* @__PURE__ */ new Set([...t])] : [t];
    return Ie(n, ze, s), this;
  }
  /** Clears the error(s) in the `ErrorSchema` at either the root level or the location within the schema described by
   * the `pathOfError`. For more information about how to specify the path see the
   * [eslint lodash plugin docs](https://github.com/wix/eslint-plugin-lodash/blob/master/docs/rules/path-style.md).
   *
   * @param [pathOfError] - The optional path into the `ErrorSchema` at which to clear the error(s)
   * @returns - The `ErrorSchemaBuilder` object for chaining purposes
   */
  clearErrors(t) {
    const r = this.getOrCreateErrorBlock(t);
    return Ie(r, ze, []), this;
  }
}
function k4(e, t, r = [1900, (/* @__PURE__ */ new Date()).getFullYear() + 2], n = "YMD") {
  const { day: s, month: a, year: i, hour: o, minute: c, second: d } = e, u = { type: "day", range: [1, 31], value: s }, f = { type: "month", range: [1, 12], value: a }, h = { type: "year", range: r, value: i }, m = [];
  switch (n) {
    case "MDY":
      m.push(f, u, h);
      break;
    case "DMY":
      m.push(u, f, h);
      break;
    case "YMD":
    default:
      m.push(h, f, u);
  }
  return t && m.push({ type: "hour", range: [0, 23], value: o }, { type: "minute", range: [0, 59], value: c }, { type: "second", range: [0, 59], value: d }), m;
}
function F4(e) {
  const t = {};
  return e.multipleOf && (t.step = e.multipleOf), (e.minimum || e.minimum === 0) && (t.min = e.minimum), (e.maximum || e.maximum === 0) && (t.max = e.maximum), t;
}
function R4(e, t, r = {}, n = !0) {
  const s = {
    type: t || "text",
    ...F4(e)
  };
  return r.inputType ? s.type = r.inputType : t || (e.type === "number" ? (s.type = "number", n && s.step === void 0 && (s.step = "any")) : e.type === "integer" && (s.type = "number", s.step === void 0 && (s.step = 1))), r.autocomplete && (s.autoComplete = r.autocomplete), r.accept && (s.accept = r.accept), s;
}
const su = {
  props: {
    disabled: !1
  },
  submitText: "Submit",
  norender: !1
};
function D4(e = {}) {
  const t = ae(e);
  if (t && t[Ts]) {
    const r = t[Ts];
    return { ...su, ...r };
  }
  return su;
}
function le(e, t, r = {}) {
  const { templates: n } = t;
  return e === "ButtonTemplates" ? n[e] : (
    // Evaluating uiOptions[name] results in TS2590: Expression produces a union type that is too complex to represent
    // To avoid that, we cast uiOptions to `any` before accessing the name field
    r[e] || n[e]
  );
}
var Ch = { exports: {} }, ce = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ol = Symbol.for("react.element"), ll = Symbol.for("react.portal"), Ea = Symbol.for("react.fragment"), Oa = Symbol.for("react.strict_mode"), Ca = Symbol.for("react.profiler"), Aa = Symbol.for("react.provider"), Pa = Symbol.for("react.context"), M4 = Symbol.for("react.server_context"), Ta = Symbol.for("react.forward_ref"), Ia = Symbol.for("react.suspense"), ka = Symbol.for("react.suspense_list"), Fa = Symbol.for("react.memo"), Ra = Symbol.for("react.lazy"), L4 = Symbol.for("react.offscreen"), Ah;
Ah = Symbol.for("react.module.reference");
function Qe(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case ol:
        switch (e = e.type, e) {
          case Ea:
          case Ca:
          case Oa:
          case Ia:
          case ka:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case M4:
              case Pa:
              case Ta:
              case Ra:
              case Fa:
              case Aa:
                return e;
              default:
                return t;
            }
        }
      case ll:
        return t;
    }
  }
}
ce.ContextConsumer = Pa;
ce.ContextProvider = Aa;
ce.Element = ol;
ce.ForwardRef = Ta;
ce.Fragment = Ea;
ce.Lazy = Ra;
ce.Memo = Fa;
ce.Portal = ll;
ce.Profiler = Ca;
ce.StrictMode = Oa;
ce.Suspense = Ia;
ce.SuspenseList = ka;
ce.isAsyncMode = function() {
  return !1;
};
ce.isConcurrentMode = function() {
  return !1;
};
ce.isContextConsumer = function(e) {
  return Qe(e) === Pa;
};
ce.isContextProvider = function(e) {
  return Qe(e) === Aa;
};
ce.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ol;
};
ce.isForwardRef = function(e) {
  return Qe(e) === Ta;
};
ce.isFragment = function(e) {
  return Qe(e) === Ea;
};
ce.isLazy = function(e) {
  return Qe(e) === Ra;
};
ce.isMemo = function(e) {
  return Qe(e) === Fa;
};
ce.isPortal = function(e) {
  return Qe(e) === ll;
};
ce.isProfiler = function(e) {
  return Qe(e) === Ca;
};
ce.isStrictMode = function(e) {
  return Qe(e) === Oa;
};
ce.isSuspense = function(e) {
  return Qe(e) === Ia;
};
ce.isSuspenseList = function(e) {
  return Qe(e) === ka;
};
ce.isValidElementType = function(e) {
  return typeof e == "string" || typeof e == "function" || e === Ea || e === Ca || e === Oa || e === Ia || e === ka || e === L4 || typeof e == "object" && e !== null && (e.$$typeof === Ra || e.$$typeof === Fa || e.$$typeof === Aa || e.$$typeof === Pa || e.$$typeof === Ta || e.$$typeof === Ah || e.getModuleId !== void 0);
};
ce.typeOf = Qe;
Ch.exports = ce;
var U4 = Ch.exports;
const au = /* @__PURE__ */ Mn(U4), li = {
  boolean: {
    checkbox: "CheckboxWidget",
    radio: "RadioWidget",
    select: "SelectWidget",
    hidden: "HiddenWidget"
  },
  string: {
    text: "TextWidget",
    password: "PasswordWidget",
    email: "EmailWidget",
    hostname: "TextWidget",
    ipv4: "TextWidget",
    ipv6: "TextWidget",
    uri: "URLWidget",
    "data-url": "FileWidget",
    radio: "RadioWidget",
    select: "SelectWidget",
    textarea: "TextareaWidget",
    hidden: "HiddenWidget",
    date: "DateWidget",
    datetime: "DateTimeWidget",
    "date-time": "DateTimeWidget",
    "alt-date": "AltDateWidget",
    "alt-datetime": "AltDateTimeWidget",
    time: "TimeWidget",
    color: "ColorWidget",
    file: "FileWidget"
  },
  number: {
    text: "TextWidget",
    select: "SelectWidget",
    updown: "UpDownWidget",
    range: "RangeWidget",
    radio: "RadioWidget",
    hidden: "HiddenWidget"
  },
  integer: {
    text: "TextWidget",
    select: "SelectWidget",
    updown: "UpDownWidget",
    range: "RangeWidget",
    radio: "RadioWidget",
    hidden: "HiddenWidget"
  },
  array: {
    select: "SelectWidget",
    checkboxes: "CheckboxesWidget",
    files: "FileWidget",
    hidden: "HiddenWidget"
  }
};
function W4(e) {
  let t = G(e, "MergedWidget");
  if (!t) {
    const r = e.defaultProps && e.defaultProps.options || {};
    t = ({ options: n, ...s }) => l.jsx(e, { options: { ...r, ...n }, ...s }), Ie(e, "MergedWidget", t);
  }
  return t;
}
function St(e, t, r = {}) {
  const n = Ct(e);
  if (typeof t == "function" || t && au.isForwardRef(tg(t)) || au.isMemo(t))
    return W4(t);
  if (typeof t != "string")
    throw new Error(`Unsupported widget definition: ${typeof t}`);
  if (t in r) {
    const s = r[t];
    return St(e, s, r);
  }
  if (typeof n == "string") {
    if (!(n in li))
      throw new Error(`No widget for type '${n}'`);
    if (t in li[n]) {
      const s = r[li[n][t]];
      return St(e, s, r);
    }
  }
  throw new Error(`No widget '${t}' for type '${n}'`);
}
function V4(e) {
  let t = 0;
  for (let r = 0; r < e.length; r += 1) {
    const n = e.charCodeAt(r);
    t = (t << 5) - t + n, t = t & t;
  }
  return t.toString(16);
}
function B4(e) {
  const t = /* @__PURE__ */ new Set();
  return JSON.stringify(e, (r, n) => (t.add(r), n)), V4(JSON.stringify(e, Array.from(t).sort()));
}
function z4(e, t, r = {}) {
  try {
    return St(e, t, r), !0;
  } catch (n) {
    const s = n;
    if (s.message && (s.message.startsWith("No widget") || s.message.startsWith("Unsupported widget")))
      return !1;
    throw n;
  }
}
function Zn(e, t) {
  return `${fa(e) ? e : e[Wt]}__${t}`;
}
function Xn(e) {
  return Zn(e, "description");
}
function Ph(e) {
  return Zn(e, "error");
}
function Vi(e) {
  return Zn(e, "examples");
}
function Th(e) {
  return Zn(e, "help");
}
function Ih(e) {
  return Zn(e, "title");
}
function gr(e, t = !1) {
  const r = t ? ` ${Vi(e)}` : "";
  return `${Ph(e)} ${Xn(e)} ${Th(e)}${r}`;
}
function kh(e, t) {
  return `${e}-${t}`;
}
function q4(e, t, r) {
  return t ? r : e;
}
function K4(e) {
  return e ? new Date(e).toJSON() : void 0;
}
function G4(e, t) {
  if (!Array.isArray(t))
    return e;
  const r = (u) => u.reduce((f, h) => (f[h] = !0, f), {}), n = (u) => u.length > 1 ? `properties '${u.join("', '")}'` : `property '${u[0]}'`, s = r(e), a = t.filter((u) => u === "*" || s[u]), i = r(a), o = e.filter((u) => !i[u]), c = a.indexOf("*");
  if (c === -1) {
    if (o.length)
      throw new Error(`uiSchema order list does not contain ${n(o)}`);
    return a;
  }
  if (c !== a.lastIndexOf("*"))
    throw new Error("uiSchema order list contains more than one wildcard item");
  const d = [...a];
  return d.splice(c, 1, ...o), d;
}
function ci(e, t = !0) {
  if (!e)
    return {
      year: -1,
      month: -1,
      day: -1,
      hour: t ? -1 : 0,
      minute: t ? -1 : 0,
      second: t ? -1 : 0
    };
  const r = new Date(e);
  if (Number.isNaN(r.getTime()))
    throw new Error("Unable to parse date " + e);
  return {
    year: r.getUTCFullYear(),
    month: r.getUTCMonth() + 1,
    day: r.getUTCDate(),
    hour: t ? r.getUTCHours() : 0,
    minute: t ? r.getUTCMinutes() : 0,
    second: t ? r.getUTCSeconds() : 0
  };
}
function ws(e) {
  if (e.const || e.enum && e.enum.length === 1 && e.enum[0] === !0)
    return !0;
  if (e.anyOf && e.anyOf.length === 1)
    return ws(e.anyOf[0]);
  if (e.oneOf && e.oneOf.length === 1)
    return ws(e.oneOf[0]);
  if (e.allOf) {
    const t = (r) => ws(r);
    return e.allOf.some(t);
  }
  return !1;
}
function H4(e, t, r) {
  const { props: n, state: s } = e;
  return !we(n, t) || !we(s, r);
}
function iu(e, t = !0) {
  const { year: r, month: n, day: s, hour: a = 0, minute: i = 0, second: o = 0 } = e, c = Date.UTC(r, n - 1, s, a, i, o), d = new Date(c).toJSON();
  return t ? d : d.slice(0, 10);
}
function kn(e, t = []) {
  if (!e)
    return [];
  let r = [];
  return ze in e && (r = r.concat(e[ze].map((n) => {
    const s = `.${t.join(".")}`;
    return {
      property: s,
      message: n,
      stack: `${s} ${n}`
    };
  }))), Object.keys(e).reduce((n, s) => {
    if (s !== ze) {
      const a = e[s];
      rr(a) && (n = n.concat(kn(a, [...t, s])));
    }
    return n;
  }, r);
}
function Fh(e) {
  return Ae(e) ? la(e, dr) : Bn(e) ? [e] : yo(_f(fo(e)));
}
function J4(e) {
  const t = new I4();
  return e.length && e.forEach((r) => {
    const { property: n, message: s } = r, a = n === "." ? [] : Fh(n);
    a.length > 0 && a[0] === "" && a.splice(0, 1), s && t.addErrors(s, a);
  }), t.ErrorSchema;
}
function cl(e) {
  return Object.keys(e).reduce((t, r) => {
    if (r === "addError")
      return t;
    {
      const n = e[r];
      return rr(n) ? {
        ...t,
        [r]: cl(n)
      } : { ...t, [r]: n };
    }
  }, {});
}
function Y4(e) {
  if (!e)
    return "";
  const t = new Date(e), r = Ut(t.getFullYear(), 4), n = Ut(t.getMonth() + 1, 2), s = Ut(t.getDate(), 2), a = Ut(t.getHours(), 2), i = Ut(t.getMinutes(), 2), o = Ut(t.getSeconds(), 2), c = Ut(t.getMilliseconds(), 3);
  return `${r}-${n}-${s}T${a}:${i}:${o}.${c}`;
}
function _s(e, t) {
  if (!t)
    return e;
  const { errors: r, errorSchema: n } = e;
  let s = kn(t), a = t;
  return Ar(n) || (a = jt(n, t, !0), s = [...r].concat(s)), { errorSchema: a, errors: s };
}
function Z4(e) {
  for (const t in e) {
    const r = e, n = r[t];
    t === Ce && typeof n == "string" && n.startsWith("#") ? r[t] = cf + n : r[t] = dl(n);
  }
  return e;
}
function X4(e) {
  for (let t = 0; t < e.length; t++)
    e[t] = dl(e[t]);
  return e;
}
function dl(e) {
  return Array.isArray(e) ? X4([...e]) : ve(e) ? Z4({ ...e }) : e;
}
function Rh(e, t, r) {
  for (var n = -1, s = t.length, a = {}; ++n < s; ) {
    var i = t[n], o = ca(e, i);
    r(o, i) && _o(a, Wr(i, e), o);
  }
  return a;
}
function Q4(e, t) {
  if (e == null)
    return {};
  var r = la(bo(e), function(n) {
    return [n];
  });
  return t = xo(t), Rh(e, r, function(n, s) {
    return t(n, s[0]);
  });
}
var eF = 200;
function tF(e, t, r, n) {
  var s = -1, a = rp, i = !0, o = e.length, c = [], d = t.length;
  if (!o)
    return c;
  t.length >= eF && (a = no, i = !1, t = new Er(t));
  e:
    for (; ++s < o; ) {
      var u = e[s], f = u;
      if (u = u !== 0 ? u : 0, i && f === f) {
        for (var h = d; h--; )
          if (t[h] === f)
            continue e;
        c.push(u);
      } else a(t, f, n) || c.push(u);
    }
  return c;
}
var rF = jo(function(e, t) {
  return Ds(e) ? tF(e, qn(t, 1, Ds, !0)) : [];
});
function nF(e, t) {
  const r = rr(e), n = rr(t);
  if (e === t || !r && !n)
    return [];
  if (r && !n)
    return dt(e);
  if (!r && n)
    return dt(t);
  {
    const s = dt(Q4(e, (i, o) => !we(i, G(t, o)))), a = rF(dt(t), dt(e));
    return [...s, ...a];
  }
}
var he;
(function(e) {
  e.ArrayItemTitle = "Item", e.MissingItems = "Missing items definition", e.YesLabel = "Yes", e.NoLabel = "No", e.CloseLabel = "Close", e.ErrorsLabel = "Errors", e.NewStringDefault = "New Value", e.AddButton = "Add", e.AddItemButton = "Add Item", e.CopyButton = "Copy", e.MoveDownButton = "Move down", e.MoveUpButton = "Move up", e.RemoveButton = "Remove", e.NowLabel = "Now", e.ClearLabel = "Clear", e.AriaDateLabel = "Select a date", e.PreviewLabel = "Preview", e.DecrementAriaLabel = "Decrease value by 1", e.IncrementAriaLabel = "Increase value by 1", e.UnknownFieldType = "Unknown field type %1", e.OptionPrefix = "Option %1", e.TitleOptionPrefix = "%1 option %2", e.KeyLabel = "%1 Key", e.InvalidObjectField = 'Invalid "%1" object field configuration: _%2_.', e.UnsupportedField = "Unsupported field schema.", e.UnsupportedFieldWithId = "Unsupported field schema for field `%1`.", e.UnsupportedFieldWithReason = "Unsupported field schema: _%1_.", e.UnsupportedFieldWithIdAndReason = "Unsupported field schema for field `%1`: _%2_.", e.FilesInfo = "**%1** (%2, %3 bytes)";
})(he || (he = {}));
function sF(e, t) {
  var r = Ae(e) ? ho : Gf;
  return r(e, Zf(t));
}
function aF(e, t) {
  return Rh(e, t, function(r, n) {
    return Yf(e, n);
  });
}
var ou = Uf(function(e, t) {
  return e == null ? {} : aF(e, t);
}), iF = 0;
function oF(e) {
  var t = ++iF;
  return fo(e) + t;
}
function Bi() {
  return oF("rjsf-array-item-");
}
function lu(e) {
  return Array.isArray(e) ? e.map((t) => ({
    key: Bi(),
    item: t
  })) : [];
}
function cn(e) {
  return Array.isArray(e) ? e.map((t) => t.item) : [];
}
class lF extends Dn {
  /** Constructs an `ArrayField` from the `props`, generating the initial keyed data from the `formData`
   *
   * @param props - The `FieldProps` for this template
   */
  constructor(r) {
    super(r);
    /** Returns the default form information for an item based on the schema for that item. Deals with the possibility
     * that the schema is fixed and allows additional items.
     */
    ue(this, "_getNewFormDataRow", () => {
      const { schema: r, registry: n } = this.props, { schemaUtils: s } = n;
      let a = r.items;
      return Ui(r) && by(r) && (a = r.additionalItems), s.getDefaultFormState(a);
    });
    /** Callback handler for when the user clicks on the add button. Creates a new row of keyed form data at the end of
     * the list, adding it into the state, and then returning `onChange()` with the plain form data converted from the
     * keyed data
     *
     * @param event - The event for the click
     */
    ue(this, "onAddClick", (r) => {
      this._handleAddClick(r);
    });
    /** Callback handler for when the user clicks on the add button on an existing array element. Creates a new row of
     * keyed form data inserted at the `index`, adding it into the state, and then returning `onChange()` with the plain
     * form data converted from the keyed data
     *
     * @param index - The index at which the add button is clicked
     */
    ue(this, "onAddIndexClick", (r) => (n) => {
      this._handleAddClick(n, r);
    });
    /** Callback handler for when the user clicks on the copy button on an existing array element. Clones the row of
     * keyed form data at the `index` into the next position in the state, and then returning `onChange()` with the plain
     * form data converted from the keyed data
     *
     * @param index - The index at which the copy button is clicked
     */
    ue(this, "onCopyIndexClick", (r) => (n) => {
      n && n.preventDefault();
      const { onChange: s, errorSchema: a } = this.props, { keyedFormData: i } = this.state;
      let o;
      if (a) {
        o = {};
        for (const u in a) {
          const f = parseInt(u);
          f <= r ? Ie(o, [f], a[u]) : f > r && Ie(o, [f + 1], a[u]);
        }
      }
      const c = {
        key: Bi(),
        item: Oh(i[r].item)
      }, d = [...i];
      r !== void 0 ? d.splice(r + 1, 0, c) : d.push(c), this.setState({
        keyedFormData: d,
        updatedKeyedFormData: !0
      }, () => s(cn(d), o));
    });
    /** Callback handler for when the user clicks on the remove button on an existing array element. Removes the row of
     * keyed form data at the `index` in the state, and then returning `onChange()` with the plain form data converted
     * from the keyed data
     *
     * @param index - The index at which the remove button is clicked
     */
    ue(this, "onDropIndexClick", (r) => (n) => {
      n && n.preventDefault();
      const { onChange: s, errorSchema: a } = this.props, { keyedFormData: i } = this.state;
      let o;
      if (a) {
        o = {};
        for (const d in a) {
          const u = parseInt(d);
          u < r ? Ie(o, [u], a[d]) : u > r && Ie(o, [u - 1], a[d]);
        }
      }
      const c = i.filter((d, u) => u !== r);
      this.setState({
        keyedFormData: c,
        updatedKeyedFormData: !0
      }, () => s(cn(c), o));
    });
    /** Callback handler for when the user clicks on one of the move item buttons on an existing array element. Moves the
     * row of keyed form data at the `index` to the `newIndex` in the state, and then returning `onChange()` with the
     * plain form data converted from the keyed data
     *
     * @param index - The index of the item to move
     * @param newIndex - The index to where the item is to be moved
     */
    ue(this, "onReorderClick", (r, n) => (s) => {
      s && (s.preventDefault(), s.currentTarget.blur());
      const { onChange: a, errorSchema: i } = this.props;
      let o;
      if (i) {
        o = {};
        for (const f in i) {
          const h = parseInt(f);
          h == r ? Ie(o, [n], i[r]) : h == n ? Ie(o, [r], i[n]) : Ie(o, [f], i[h]);
        }
      }
      const { keyedFormData: c } = this.state;
      function d() {
        const f = c.slice();
        return f.splice(r, 1), f.splice(n, 0, c[r]), f;
      }
      const u = d();
      this.setState({
        keyedFormData: u
      }, () => a(cn(u), o));
    });
    /** Callback handler used to deal with changing the value of the data in the array at the `index`. Calls the
     * `onChange` callback with the updated form data
     *
     * @param index - The index of the item being changed
     */
    ue(this, "onChangeForIndex", (r) => (n, s, a) => {
      const { formData: i, onChange: o, errorSchema: c } = this.props, u = (Array.isArray(i) ? i : []).map((f, h) => r === h ? typeof n > "u" ? null : n : f);
      o(u, c && c && {
        ...c,
        [r]: s
      }, a);
    });
    /** Callback handler used to change the value for a checkbox */
    ue(this, "onSelectChange", (r) => {
      const { onChange: n, idSchema: s } = this.props;
      n(r, void 0, s && s.$id);
    });
    const { formData: n = [] } = r, s = lu(n);
    this.state = {
      keyedFormData: s,
      updatedKeyedFormData: !1
    };
  }
  /** React lifecycle method that is called when the props are about to change allowing the state to be updated. It
   * regenerates the keyed form data and returns it
   *
   * @param nextProps - The next set of props data
   * @param prevState - The previous set of state data
   */
  static getDerivedStateFromProps(r, n) {
    if (n.updatedKeyedFormData)
      return {
        updatedKeyedFormData: !1
      };
    const s = Array.isArray(r.formData) ? r.formData : [], a = n.keyedFormData || [];
    return {
      keyedFormData: s.length === a.length ? a.map((o, c) => ({
        key: o.key,
        item: s[c]
      })) : lu(s)
    };
  }
  /** Returns the appropriate title for an item by getting first the title from the schema.items, then falling back to
   * the description from the schema.items, and finally the string "Item"
   */
  get itemTitle() {
    const { schema: r, registry: n } = this.props, { translateString: s } = n;
    return G(r, [zt, "title"], G(r, [zt, "description"], s(he.ArrayItemTitle)));
  }
  /** Determines whether the item described in the schema is always required, which is determined by whether any item
   * may be null.
   *
   * @param itemSchema - The schema for the item
   * @return - True if the item schema type does not contain the "null" type
   */
  isItemRequired(r) {
    return Array.isArray(r.type) ? !r.type.includes("null") : r.type !== "null";
  }
  /** Determines whether more items can be added to the array. If the uiSchema indicates the array doesn't allow adding
   * then false is returned. Otherwise, if the schema indicates that there are a maximum number of items and the
   * `formData` matches that value, then false is returned, otherwise true is returned.
   *
   * @param formItems - The list of items in the form
   * @returns - True if the item is addable otherwise false
   */
  canAddItem(r) {
    const { schema: n, uiSchema: s, registry: a } = this.props;
    let { addable: i } = ae(s, a.globalUiOptions);
    return i !== !1 && (n.maxItems !== void 0 ? i = r.length < n.maxItems : i = !0), i;
  }
  /** Callback handler for when the user clicks on the add or add at index buttons. Creates a new row of keyed form data
   * either at the end of the list (when index is not specified) or inserted at the `index` when it is, adding it into
   * the state, and then returning `onChange()` with the plain form data converted from the keyed data
   *
   * @param event - The event for the click
   * @param [index] - The optional index at which to add the new data
   */
  _handleAddClick(r, n) {
    r && r.preventDefault();
    const { onChange: s, errorSchema: a } = this.props, { keyedFormData: i } = this.state;
    let o;
    if (a) {
      o = {};
      for (const u in a) {
        const f = parseInt(u);
        n === void 0 || f < n ? Ie(o, [f], a[u]) : f >= n && Ie(o, [f + 1], a[u]);
      }
    }
    const c = {
      key: Bi(),
      item: this._getNewFormDataRow()
    }, d = [...i];
    n !== void 0 ? d.splice(n, 0, c) : d.push(c), this.setState({
      keyedFormData: d,
      updatedKeyedFormData: !0
    }, () => s(cn(d), o));
  }
  /** Renders the `ArrayField` depending on the specific needs of the schema and uischema elements
   */
  render() {
    const { schema: r, uiSchema: n, idSchema: s, registry: a } = this.props, { schemaUtils: i, translateString: o } = a;
    if (!(zt in r)) {
      const c = ae(n), d = le("UnsupportedFieldTemplate", a, c);
      return l.jsx(d, { schema: r, idSchema: s, reason: o(he.MissingItems), registry: a });
    }
    return i.isMultiSelect(r) ? this.renderMultiSelect() : Sh(n) ? this.renderCustomWidget() : Ui(r) ? this.renderFixedArray() : i.isFilesArray(r, n) ? this.renderFiles() : this.renderNormalArray();
  }
  /** Renders a normal array without any limitations of length
   */
  renderNormalArray() {
    const { schema: r, uiSchema: n = {}, errorSchema: s, idSchema: a, name: i, title: o, disabled: c = !1, readonly: d = !1, autofocus: u = !1, required: f = !1, registry: h, onBlur: m, onFocus: b, idPrefix: $, idSeparator: y = "_", rawErrors: p } = this.props, { keyedFormData: g } = this.state, v = r.title || o || i, { schemaUtils: _, formContext: w } = h, S = ae(n), O = ve(r.items) ? r.items : {}, D = _.retrieveSchema(O), N = cn(this.state.keyedFormData), A = this.canAddItem(N), R = {
      canAdd: A,
      items: g.map((W, I) => {
        const { key: P, item: k } = W, V = k, q = _.retrieveSchema(O, V), Z = s ? s[I] : void 0, M = a.$id + y + I, E = _.toIdSchema(q, M, V, $, y);
        return this.renderArrayFieldItem({
          key: P,
          index: I,
          name: i && `${i}-${I}`,
          title: v ? `${v}-${I + 1}` : void 0,
          canAdd: A,
          canMoveUp: I > 0,
          canMoveDown: I < N.length - 1,
          itemSchema: q,
          itemIdSchema: E,
          itemErrorSchema: Z,
          itemData: V,
          itemUiSchema: n.items,
          autofocus: u && I === 0,
          onBlur: m,
          onFocus: b,
          rawErrors: p,
          totalItems: g.length
        });
      }),
      className: `field field-array field-array-of-${D.type}`,
      disabled: c,
      idSchema: a,
      uiSchema: n,
      onAddClick: this.onAddClick,
      readonly: d,
      required: f,
      schema: r,
      title: v,
      formContext: w,
      formData: N,
      rawErrors: p,
      registry: h
    }, L = le("ArrayFieldTemplate", h, S);
    return l.jsx(L, { ...R });
  }
  /** Renders an array using the custom widget provided by the user in the `uiSchema`
   */
  renderCustomWidget() {
    const { schema: r, idSchema: n, uiSchema: s, disabled: a = !1, readonly: i = !1, autofocus: o = !1, required: c = !1, hideError: d, placeholder: u, onBlur: f, onFocus: h, formData: m = [], registry: b, rawErrors: $, name: y } = this.props, { widgets: p, formContext: g, globalUiOptions: v, schemaUtils: _ } = b, { widget: w, title: S, ...O } = ae(s, v), D = St(r, w, p), N = S ?? r.title ?? y, A = _.getDisplayLabel(r, s, v);
    return l.jsx(D, { id: n.$id, name: y, multiple: !0, onChange: this.onSelectChange, onBlur: f, onFocus: h, options: O, schema: r, uiSchema: s, registry: b, value: m, disabled: a, readonly: i, hideError: d, required: c, label: N, hideLabel: !A, placeholder: u, formContext: g, autofocus: o, rawErrors: $ });
  }
  /** Renders an array as a set of checkboxes
   */
  renderMultiSelect() {
    const { schema: r, idSchema: n, uiSchema: s, formData: a = [], disabled: i = !1, readonly: o = !1, autofocus: c = !1, required: d = !1, placeholder: u, onBlur: f, onFocus: h, registry: m, rawErrors: b, name: $ } = this.props, { widgets: y, schemaUtils: p, formContext: g, globalUiOptions: v } = m, _ = p.retrieveSchema(r.items, a), w = In(_, s), { widget: S = "select", title: O, ...D } = ae(s, v), N = St(r, S, y), A = O ?? r.title ?? $, R = p.getDisplayLabel(r, s, v);
    return l.jsx(N, { id: n.$id, name: $, multiple: !0, onChange: this.onSelectChange, onBlur: f, onFocus: h, options: { ...D, enumOptions: w }, schema: r, uiSchema: s, registry: m, value: a, disabled: i, readonly: o, required: d, label: A, hideLabel: !R, placeholder: u, formContext: g, autofocus: c, rawErrors: b });
  }
  /** Renders an array of files using the `FileWidget`
   */
  renderFiles() {
    const { schema: r, uiSchema: n, idSchema: s, name: a, disabled: i = !1, readonly: o = !1, autofocus: c = !1, required: d = !1, onBlur: u, onFocus: f, registry: h, formData: m = [], rawErrors: b } = this.props, { widgets: $, formContext: y, globalUiOptions: p, schemaUtils: g } = h, { widget: v = "files", title: _, ...w } = ae(n, p), S = St(r, v, $), O = _ ?? r.title ?? a, D = g.getDisplayLabel(r, n, p);
    return l.jsx(S, { options: w, id: s.$id, name: a, multiple: !0, onChange: this.onSelectChange, onBlur: u, onFocus: f, schema: r, uiSchema: n, value: m, disabled: i, readonly: o, required: d, registry: h, formContext: y, autofocus: c, rawErrors: b, label: O, hideLabel: !D });
  }
  /** Renders an array that has a maximum limit of items
   */
  renderFixedArray() {
    const { schema: r, uiSchema: n = {}, formData: s = [], errorSchema: a, idPrefix: i, idSeparator: o = "_", idSchema: c, name: d, title: u, disabled: f = !1, readonly: h = !1, autofocus: m = !1, required: b = !1, registry: $, onBlur: y, onFocus: p, rawErrors: g } = this.props, { keyedFormData: v } = this.state;
    let { formData: _ = [] } = this.props;
    const w = r.title || u || d, S = ae(n), { schemaUtils: O, formContext: D } = $, A = (ve(r.items) ? r.items : []).map((P, k) => O.retrieveSchema(P, s[k])), R = ve(r.additionalItems) ? O.retrieveSchema(r.additionalItems, s) : null;
    (!_ || _.length < A.length) && (_ = _ || [], _ = _.concat(new Array(A.length - _.length)));
    const L = this.canAddItem(_) && !!R, W = {
      canAdd: L,
      className: "field field-array field-array-fixed-items",
      disabled: f,
      idSchema: c,
      formData: s,
      items: v.map((P, k) => {
        const { key: V, item: q } = P, Z = q, M = k >= A.length, E = (M && ve(r.additionalItems) ? O.retrieveSchema(r.additionalItems, Z) : A[k]) || {}, F = c.$id + o + k, C = O.toIdSchema(E, F, Z, i, o), x = M ? n.additionalItems || {} : Array.isArray(n.items) ? n.items[k] : n.items || {}, j = a ? a[k] : void 0;
        return this.renderArrayFieldItem({
          key: V,
          index: k,
          name: d && `${d}-${k}`,
          title: w ? `${w}-${k + 1}` : void 0,
          canAdd: L,
          canRemove: M,
          canMoveUp: k >= A.length + 1,
          canMoveDown: M && k < _.length - 1,
          itemSchema: E,
          itemData: Z,
          itemUiSchema: x,
          itemIdSchema: C,
          itemErrorSchema: j,
          autofocus: m && k === 0,
          onBlur: y,
          onFocus: p,
          rawErrors: g,
          totalItems: v.length
        });
      }),
      onAddClick: this.onAddClick,
      readonly: h,
      required: b,
      registry: $,
      schema: r,
      uiSchema: n,
      title: w,
      formContext: D,
      errorSchema: a,
      rawErrors: g
    }, I = le("ArrayFieldTemplate", $, S);
    return l.jsx(I, { ...W });
  }
  /** Renders the individual array item using a `SchemaField` along with the additional properties required to be send
   * back to the `ArrayFieldItemTemplate`.
   *
   * @param props - The props for the individual array item to be rendered
   */
  renderArrayFieldItem(r) {
    const { key: n, index: s, name: a, canAdd: i, canRemove: o = !0, canMoveUp: c, canMoveDown: d, itemSchema: u, itemData: f, itemUiSchema: h, itemIdSchema: m, itemErrorSchema: b, autofocus: $, onBlur: y, onFocus: p, rawErrors: g, totalItems: v, title: _ } = r, { disabled: w, hideError: S, idPrefix: O, idSeparator: D, readonly: N, uiSchema: A, registry: R, formContext: L } = this.props, { fields: { ArraySchemaField: W, SchemaField: I }, globalUiOptions: P } = R, k = W || I, { orderable: V = !0, removable: q = !0, copyable: Z = !1 } = ae(A, P), M = {
      moveUp: V && c,
      moveDown: V && d,
      copy: Z && i,
      remove: q && o,
      toolbar: !1
    };
    return M.toolbar = Object.keys(M).some((E) => M[E]), {
      children: l.jsx(k, { name: a, title: _, index: s, schema: u, uiSchema: h, formData: f, formContext: L, errorSchema: b, idPrefix: O, idSeparator: D, idSchema: m, required: this.isItemRequired(u), onChange: this.onChangeForIndex(s), onBlur: y, onFocus: p, registry: R, disabled: w, readonly: N, hideError: S, autofocus: $, rawErrors: g }),
      className: "array-item",
      disabled: w,
      canAdd: i,
      hasCopy: M.copy,
      hasToolbar: M.toolbar,
      hasMoveUp: M.moveUp,
      hasMoveDown: M.moveDown,
      hasRemove: M.remove,
      index: s,
      totalItems: v,
      key: n,
      onAddIndexClick: this.onAddIndexClick,
      onCopyIndexClick: this.onCopyIndexClick,
      onDropIndexClick: this.onDropIndexClick,
      onReorderClick: this.onReorderClick,
      readonly: N,
      registry: R,
      schema: u,
      uiSchema: h
    };
  }
}
function cF(e) {
  const { schema: t, name: r, uiSchema: n, idSchema: s, formData: a, registry: i, required: o, disabled: c, readonly: d, hideError: u, autofocus: f, title: h, onChange: m, onFocus: b, onBlur: $, rawErrors: y } = e, { title: p } = t, { widgets: g, formContext: v, translateString: _, globalUiOptions: w } = i, {
    widget: S = "checkbox",
    title: O,
    // Unlike the other fields, don't use `getDisplayLabel()` since it always returns false for the boolean type
    label: D = !0,
    ...N
  } = ae(n, w), A = St(t, S, g), R = _(he.YesLabel), L = _(he.NoLabel);
  let W;
  const I = O ?? p ?? h ?? r;
  if (Array.isArray(t.oneOf))
    W = In({
      oneOf: t.oneOf.map((P) => {
        if (ve(P))
          return {
            ...P,
            title: P.title || (P.const === !0 ? R : L)
          };
      }).filter((P) => P)
      // cast away the error that typescript can't grok is fixed
    }, n);
  else {
    const P = t, k = t.enum ?? [!0, !1];
    !P.enumNames && k.length === 2 && k.every((V) => typeof V == "boolean") ? W = [
      {
        value: k[0],
        label: k[0] ? R : L
      },
      {
        value: k[1],
        label: k[1] ? R : L
      }
    ] : W = In({
      enum: k,
      // NOTE: enumNames is deprecated, but still supported for now.
      enumNames: P.enumNames
    }, n);
  }
  return l.jsx(A, { options: { ...N, enumOptions: W }, schema: t, uiSchema: n, id: s.$id, name: r, onChange: m, onFocus: b, onBlur: $, label: I, hideLabel: !D, value: a, required: o, disabled: c, readonly: d, hideError: u, registry: i, formContext: v, autofocus: f, rawErrors: y });
}
class cu extends Dn {
  /** Constructs an `AnyOfField` with the given `props` to initialize the initially selected option in state
   *
   * @param props - The `FieldProps` for this template
   */
  constructor(r) {
    super(r);
    /** Callback handler to remember what the currently selected option is. In addition to that the `formData` is updated
     * to remove properties that are not part of the newly selected option schema, and then the updated data is passed to
     * the `onChange` handler.
     *
     * @param option - The new option value being selected
     */
    ue(this, "onOptionChange", (r) => {
      const { selectedOption: n, retrievedOptions: s } = this.state, { formData: a, onChange: i, registry: o } = this.props, { schemaUtils: c } = o, d = r !== void 0 ? parseInt(r, 10) : -1;
      if (d === n)
        return;
      const u = d >= 0 ? s[d] : void 0, f = n >= 0 ? s[n] : void 0;
      let h = c.sanitizeDataForNewSchema(u, f, a);
      u && (h = c.getDefaultFormState(u, h, "excludeObjectChildren")), this.setState({ selectedOption: d }, () => {
        i(h, void 0, this.getFieldId());
      });
    });
    const { formData: n, options: s, registry: { schemaUtils: a } } = this.props, i = s.map((o) => a.retrieveSchema(o, n));
    this.state = {
      retrievedOptions: i,
      selectedOption: this.getMatchingOption(0, n, i)
    };
  }
  /** React lifecycle method that is called when the props and/or state for this component is updated. It recomputes the
   * currently selected option based on the overall `formData`
   *
   * @param prevProps - The previous `FieldProps` for this template
   * @param prevState - The previous `AnyOfFieldState` for this template
   */
  componentDidUpdate(r, n) {
    const { formData: s, options: a, idSchema: i } = this.props, { selectedOption: o } = this.state;
    let c = this.state;
    if (!we(r.options, a)) {
      const { registry: { schemaUtils: d } } = this.props, u = a.map((f) => d.retrieveSchema(f, s));
      c = { selectedOption: o, retrievedOptions: u };
    }
    if (!we(s, r.formData) && i.$id === r.idSchema.$id) {
      const { retrievedOptions: d } = c, u = this.getMatchingOption(o, s, d);
      n && u !== o && (c = { selectedOption: u, retrievedOptions: d });
    }
    c !== this.state && this.setState(c);
  }
  /** Determines the best matching option for the given `formData` and `options`.
   *
   * @param formData - The new formData
   * @param options - The list of options to choose from
   * @return - The index of the `option` that best matches the `formData`
   */
  getMatchingOption(r, n, s) {
    const { schema: a, registry: { schemaUtils: i } } = this.props, o = Ir(a);
    return i.getClosestMatchingOption(n, s, r, o);
  }
  getFieldId() {
    const { idSchema: r, schema: n } = this.props;
    return `${r.$id}${n.oneOf ? "__oneof_select" : "__anyof_select"}`;
  }
  /** Renders the `AnyOfField` selector along with a `SchemaField` for the value of the `formData`
   */
  render() {
    const { name: r, disabled: n = !1, errorSchema: s = {}, formContext: a, onBlur: i, onFocus: o, readonly: c, registry: d, schema: u, uiSchema: f } = this.props, { widgets: h, fields: m, translateString: b, globalUiOptions: $, schemaUtils: y } = d, { SchemaField: p } = m, { selectedOption: g, retrievedOptions: v } = this.state, { widget: _ = "select", placeholder: w, autofocus: S, autocomplete: O, title: D = u.title, ...N } = ae(f, $), A = St({ type: "number" }, _, h), R = G(s, ze, []), L = Rs(s, [ze]), W = y.getDisplayLabel(u, f, $), I = g >= 0 && v[g] || null;
    let P;
    if (I) {
      const { required: E } = u;
      P = E ? At({ required: E }, I) : I;
    }
    let k = [];
    qe in u && f && qe in f ? Array.isArray(f[qe]) ? k = f[qe] : console.warn(`uiSchema.oneOf is not an array for "${D || r}"`) : nt in u && f && nt in f && (Array.isArray(f[nt]) ? k = f[nt] : console.warn(`uiSchema.anyOf is not an array for "${D || r}"`));
    let V = f;
    g >= 0 && k.length > g && (V = k[g]);
    const q = D ? he.TitleOptionPrefix : he.OptionPrefix, Z = D ? [D] : [], M = v.map((E, F) => {
      const { title: C = E.title } = ae(k[F]);
      return {
        label: C || b(q, Z.concat(String(F + 1))),
        value: F
      };
    });
    return l.jsxs("div", { className: "panel panel-default panel-body", children: [l.jsx("div", { className: "form-group", children: l.jsx(A, { id: this.getFieldId(), name: `${r}${u.oneOf ? "__oneof_select" : "__anyof_select"}`, schema: { type: "number", default: 0 }, onChange: this.onOptionChange, onBlur: i, onFocus: o, disabled: n || Ar(M), multiple: !1, rawErrors: R, errorSchema: L, value: g >= 0 ? g : void 0, options: { enumOptions: M, ...N }, registry: d, formContext: a, placeholder: w, autocomplete: O, autofocus: S, label: D ?? r, hideLabel: !W, readonly: c }) }), P && P.type !== "null" && l.jsx(p, { ...this.props, schema: P, uiSchema: V })] });
  }
}
const dF = /\.([0-9]*0)*$/, uF = /[0.]0*$/;
function fF(e) {
  const { registry: t, onChange: r, formData: n, value: s } = e, [a, i] = te(s), { StringField: o } = t.fields;
  let c = n;
  const d = Y((u, f, h) => {
    i(u), `${u}`.charAt(0) === "." && (u = `0${u}`);
    const m = typeof u == "string" && u.match(dF) ? hc(u.replace(uF, "")) : hc(u);
    r(m, f, h);
  }, [r]);
  if (typeof a == "string" && typeof c == "number") {
    const u = new RegExp(`^(${String(c).replace(".", "\\.")})?\\.?0*$`);
    a.match(u) && (c = a);
  }
  return l.jsx(o, { ...e, formData: c, onChange: d });
}
function Xt() {
  return Xt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Xt.apply(this, arguments);
}
const pF = ["children", "options"], du = ["allowFullScreen", "allowTransparency", "autoComplete", "autoFocus", "autoPlay", "cellPadding", "cellSpacing", "charSet", "classId", "colSpan", "contentEditable", "contextMenu", "crossOrigin", "encType", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "hrefLang", "inputMode", "keyParams", "keyType", "marginHeight", "marginWidth", "maxLength", "mediaGroup", "minLength", "noValidate", "radioGroup", "readOnly", "rowSpan", "spellCheck", "srcDoc", "srcLang", "srcSet", "tabIndex", "useMap"].reduce((e, t) => (e[t.toLowerCase()] = t, e), { class: "className", for: "htmlFor" }), uu = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: "“" }, hF = ["style", "script", "pre"], mF = ["src", "href", "data", "formAction", "srcDoc", "action"], gF = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi, yF = /\n{2,}$/, fu = /^(\s*>[\s\S]*?)(?=\n\n|$)/, bF = /^ *> ?/gm, vF = /^(?:\[!([^\]]*)\]\n)?([\s\S]*)/, $F = /^ {2,}\n/, xF = /^(?:([-*_])( *\1){2,}) *(?:\n *)+\n/, pu = /^(?: {1,3})?(`{3,}|~{3,}) *(\S+)? *([^\n]*?)?\n([\s\S]*?)(?:\1\n?|$)/, hu = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/, wF = /^(`+)((?:\\`|(?!\1)`|[^`])+)\1/, _F = /^(?:\n *)*\n/, jF = /\r\n?/g, SF = /^\[\^([^\]]+)](:(.*)((\n+ {4,}.*)|(\n(?!\[\^).+))*)/, NF = /^\[\^([^\]]+)]/, EF = /\f/g, OF = /^---[ \t]*\n(.|\n)*\n---[ \t]*\n/, CF = /^\s*?\[(x|\s)\]/, mu = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, gu = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, yu = /^([^\n]+)\n *(=|-)\2{2,} *\n/, di = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?((?:[^>]*[^/])?)>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1\b)[\s\S])*?)<\/\1>(?!<\/\1>)\n*/i, AF = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, bu = /^<!--[\s\S]*?(?:-->)/, PF = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/, ui = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i, TF = /^\{.*\}$/, IF = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, kF = /^<([^ >]+[:@\/][^ >]+)>/, FF = /-([a-z])?/gi, vu = /^(\|.*)\n(?: *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*))?\n?/, RF = /^[^\n]+(?:  \n|\n{2,})/, DF = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/, MF = /^!\[([^\]]*)\] ?\[([^\]]*)\]/, LF = /^\[([^\]]*)\] ?\[([^\]]*)\]/, UF = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/, WF = /\t/g, VF = /(^ *\||\| *$)/g, BF = /^ *:-+: *$/, zF = /^ *:-+ *$/, qF = /^ *-+: *$/, Da = (e) => `(?=[\\s\\S]+?\\1${e ? "\\1" : ""})`, Ma = "((?:\\[.*?\\][([].*?[)\\]]|<.*?>(?:.*?<.*?>)?|`.*?`|\\\\\\1|[\\s\\S])+?)", KF = RegExp(`^([*_])\\1${Da(1)}${Ma}\\1\\1(?!\\1)`), GF = RegExp(`^([*_])${Da(0)}${Ma}\\1(?!\\1)`), HF = RegExp(`^(==)${Da(0)}${Ma}\\1`), JF = RegExp(`^(~~)${Da(0)}${Ma}\\1`), YF = /^(:[a-zA-Z0-9-_]+:)/, ZF = /^\\([^0-9A-Za-z\s])/, XF = /\\([^0-9A-Za-z\s])/g, QF = /^[\s\S](?:(?!  \n|[0-9]\.|http)[^=*_~\-\n:<`\\\[!])*/, eR = /^\n+/, tR = /^([ \t]*)/, rR = /(?:^|\n)( *)$/, ul = "(?:\\d+\\.)", fl = "(?:[*+-])";
function Dh(e) {
  return "( *)(" + (e === 1 ? ul : fl) + ") +";
}
const Mh = Dh(1), Lh = Dh(2);
function Uh(e) {
  return RegExp("^" + (e === 1 ? Mh : Lh));
}
const nR = Uh(1), sR = Uh(2);
function Wh(e) {
  return RegExp("^" + (e === 1 ? Mh : Lh) + "[^\\n]*(?:\\n(?!\\1" + (e === 1 ? ul : fl) + " )[^\\n]*)*(\\n|$)", "gm");
}
const aR = Wh(1), iR = Wh(2);
function Vh(e) {
  const t = e === 1 ? ul : fl;
  return RegExp("^( *)(" + t + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + t + " (?!" + t + " ))\\n*|\\s*\\n*$)");
}
const Bh = Vh(1), zh = Vh(2);
function $u(e, t) {
  const r = t === 1, n = r ? Bh : zh, s = r ? aR : iR, a = r ? nR : sR;
  return { t: (i) => a.test(i), o: Fr(function(i, o) {
    const c = rR.exec(o.prevCapture);
    return c && (o.list || !o.inline && !o.simple) ? n.exec(i = c[1] + i) : null;
  }), i: 1, u(i, o, c) {
    const d = r ? +i[2] : void 0, u = i[0].replace(yF, `
`).match(s);
    let f = !1;
    return { items: u.map(function(h, m) {
      const b = a.exec(h)[0].length, $ = RegExp("^ {1," + b + "}", "gm"), y = h.replace($, "").replace(a, ""), p = m === u.length - 1, g = y.indexOf(`

`) !== -1 || p && f;
      f = g;
      const v = c.inline, _ = c.list;
      let w;
      c.list = !0, g ? (c.inline = !1, w = xn(y) + `

`) : (c.inline = !0, w = xn(y));
      const S = o(w, c);
      return c.inline = v, c.list = _, S;
    }), ordered: r, start: d };
  }, l: (i, o, c) => e(i.ordered ? "ol" : "ul", { key: c.key, start: i.type === "20" ? i.start : void 0 }, i.items.map(function(d, u) {
    return e("li", { key: u }, o(d, c));
  })) };
}
const oR = RegExp(`^\\[((?:\\[[^\\[\\]]*(?:\\[[^\\[\\]]*\\][^\\[\\]]*)*\\]|[^\\[\\]])*)\\]\\(\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*\\)`), lR = /^!\[(.*?)\]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/;
function xu(e) {
  return typeof e == "string";
}
function xn(e) {
  let t = e.length;
  for (; t > 0 && e[t - 1] <= " "; ) t--;
  return e.slice(0, t);
}
function js(e, t) {
  return e.startsWith(t);
}
function cR(e, t, r) {
  if (Array.isArray(r)) {
    for (let n = 0; n < r.length; n++) if (js(e, r[n])) return !0;
    return !1;
  }
  return r(e, t);
}
function dn(e) {
  return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
function dR(e) {
  return qF.test(e) ? "right" : BF.test(e) ? "center" : zF.test(e) ? "left" : null;
}
function wu(e, t, r, n) {
  const s = r.inTable;
  r.inTable = !0;
  let a = [[]], i = "";
  function o() {
    if (!i) return;
    const c = a[a.length - 1];
    c.push.apply(c, t(i, r)), i = "";
  }
  return e.trim().split(/(`[^`]*`|\\\||\|)/).filter(Boolean).forEach((c, d, u) => {
    c.trim() === "|" && (o(), n) ? d !== 0 && d !== u.length - 1 && a.push([]) : i += c;
  }), o(), r.inTable = s, a;
}
function uR(e, t, r) {
  r.inline = !0;
  const n = e[2] ? e[2].replace(VF, "").split("|").map(dR) : [], s = e[3] ? function(i, o, c) {
    return i.trim().split(`
`).map(function(d) {
      return wu(d, o, c, !0);
    });
  }(e[3], t, r) : [], a = wu(e[1], t, r, !!s.length);
  return r.inline = !1, s.length ? { align: n, cells: s, header: a, type: "25" } : { children: a, type: "21" };
}
function _u(e, t) {
  return e.align[t] == null ? {} : { textAlign: e.align[t] };
}
function Fr(e) {
  return e.inline = 1, e;
}
function Ht(e) {
  return Fr(function(t, r) {
    return r.inline ? e.exec(t) : null;
  });
}
function Dt(e) {
  return Fr(function(t, r) {
    return r.inline || r.simple ? e.exec(t) : null;
  });
}
function _t(e) {
  return function(t, r) {
    return r.inline || r.simple ? null : e.exec(t);
  };
}
function ds(e) {
  return Fr(function(t) {
    return e.exec(t);
  });
}
const fR = /(javascript|vbscript|data(?!:image)):/i;
function pR(e) {
  try {
    const t = decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g, "");
    if (fR.test(t)) return null;
  } catch {
    return null;
  }
  return e;
}
function ct(e) {
  return e && e.replace(XF, "$1");
}
function Ss(e, t, r) {
  const n = r.inline || !1, s = r.simple || !1;
  r.inline = !0, r.simple = !0;
  const a = e(t, r);
  return r.inline = n, r.simple = s, a;
}
function hR(e, t, r) {
  const n = r.inline || !1, s = r.simple || !1;
  r.inline = !1, r.simple = !0;
  const a = e(t, r);
  return r.inline = n, r.simple = s, a;
}
function mR(e, t, r) {
  const n = r.inline || !1;
  r.inline = !1;
  const s = e(t, r);
  return r.inline = n, s;
}
const fi = (e, t, r) => ({ children: Ss(t, e[2], r) });
function pi() {
  return {};
}
function hi() {
  return null;
}
function gR(...e) {
  return e.filter(Boolean).join(" ");
}
function mi(e, t, r) {
  let n = e;
  const s = t.split(".");
  for (; s.length && (n = n[s[0]], n !== void 0); ) s.shift();
  return n || r;
}
function yR(e = "", t = {}) {
  t.overrides = t.overrides || {}, t.namedCodesToUnicode = t.namedCodesToUnicode ? Xt({}, uu, t.namedCodesToUnicode) : uu;
  const r = t.slugify || dn, n = t.sanitizer || pR, s = t.createElement || U.createElement, a = [fu, pu, hu, t.enforceAtxHeadings ? gu : mu, yu, vu, Bh, zh], i = [...a, RF, di, bu, ui];
  function o(p, g) {
    for (let v = 0; v < p.length; v++) if (p[v].test(g)) return !0;
    return !1;
  }
  function c(p, g, ...v) {
    const _ = mi(t.overrides, p + ".props", {});
    return s(function(w, S) {
      const O = mi(S, w);
      return O ? typeof O == "function" || typeof O == "object" && "render" in O ? O : mi(S, w + ".component", w) : w;
    }(p, t.overrides), Xt({}, g, _, { className: gR(g == null ? void 0 : g.className, _.className) || void 0 }), ...v);
  }
  function d(p) {
    p = p.replace(OF, "");
    let g = !1;
    t.forceInline ? g = !0 : t.forceBlock || (g = UF.test(p) === !1);
    const v = $(b(g ? p : xn(p).replace(eR, "") + `

`, { inline: g }));
    for (; xu(v[v.length - 1]) && !v[v.length - 1].trim(); ) v.pop();
    if (t.wrapper === null) return v;
    const _ = t.wrapper || (g ? "span" : "div");
    let w;
    if (v.length > 1 || t.forceWrapper) w = v;
    else {
      if (v.length === 1) return w = v[0], typeof w == "string" ? c("span", { key: "outer" }, w) : w;
      w = null;
    }
    return s(_, { key: "outer" }, w);
  }
  function u(p, g) {
    if (!g || !g.trim()) return null;
    const v = g.match(gF);
    return v ? v.reduce(function(_, w) {
      const S = w.indexOf("=");
      if (S !== -1) {
        const O = function(R) {
          return R.indexOf("-") !== -1 && R.match(PF) === null && (R = R.replace(FF, function(L, W) {
            return W.toUpperCase();
          })), R;
        }(w.slice(0, S)).trim(), D = function(R) {
          const L = R[0];
          return (L === '"' || L === "'") && R.length >= 2 && R[R.length - 1] === L ? R.slice(1, -1) : R;
        }(w.slice(S + 1).trim()), N = du[O] || O;
        if (N === "ref") return _;
        const A = _[N] = function(R, L, W, I) {
          return L === "style" ? function(P) {
            const k = [];
            let V = "", q = !1, Z = !1, M = "";
            if (!P) return k;
            for (let F = 0; F < P.length; F++) {
              const C = P[F];
              if (C !== '"' && C !== "'" || q || (Z ? C === M && (Z = !1, M = "") : (Z = !0, M = C)), C === "(" && V.endsWith("url") ? q = !0 : C === ")" && q && (q = !1), C !== ";" || Z || q) V += C;
              else {
                const x = V.trim();
                if (x) {
                  const j = x.indexOf(":");
                  if (j > 0) {
                    const T = x.slice(0, j).trim(), z = x.slice(j + 1).trim();
                    k.push([T, z]);
                  }
                }
                V = "";
              }
            }
            const E = V.trim();
            if (E) {
              const F = E.indexOf(":");
              if (F > 0) {
                const C = E.slice(0, F).trim(), x = E.slice(F + 1).trim();
                k.push([C, x]);
              }
            }
            return k;
          }(W).reduce(function(P, [k, V]) {
            return P[k.replace(/(-[a-z])/g, (q) => q[1].toUpperCase())] = I(V, R, k), P;
          }, {}) : mF.indexOf(L) !== -1 ? I(ct(W), R, L) : (W.match(TF) && (W = ct(W.slice(1, W.length - 1))), W === "true" || W !== "false" && W);
        }(p, O, D, n);
        typeof A == "string" && (di.test(A) || ui.test(A)) && (_[N] = d(A.trim()));
      } else w !== "style" && (_[du[w] || w] = !0);
      return _;
    }, {}) : null;
  }
  const f = [], h = {}, m = { 0: { t: [">"], o: _t(fu), i: 1, u(p, g, v) {
    const [, _, w] = p[0].replace(bF, "").match(vF);
    return { alert: _, children: g(w, v) };
  }, l(p, g, v) {
    const _ = { key: v.key };
    return p.alert && (_.className = "markdown-alert-" + r(p.alert.toLowerCase(), dn), p.children.unshift({ attrs: {}, children: [{ type: "27", text: p.alert }], noInnerParse: !0, type: "11", tag: "header" })), c("blockquote", _, g(p.children, v));
  } }, 1: { t: ["  "], o: ds($F), i: 1, u: pi, l: (p, g, v) => c("br", { key: v.key }) }, 2: { t: ["--", "__", "**", "- ", "* ", "_ "], o: _t(xF), i: 1, u: pi, l: (p, g, v) => c("hr", { key: v.key }) }, 3: { t: ["    "], o: _t(hu), i: 0, u: (p) => ({ lang: void 0, text: ct(xn(p[0].replace(/^ {4}/gm, ""))) }), l: (p, g, v) => c("pre", { key: v.key }, c("code", Xt({}, p.attrs, { className: p.lang ? "lang-" + p.lang : "" }), p.text)) }, 4: { t: ["```", "~~~"], o: _t(pu), i: 0, u: (p) => ({ attrs: u("code", p[3] || ""), lang: p[2] || void 0, text: p[4], type: "3" }) }, 5: { t: ["`"], o: Dt(wF), i: 3, u: (p) => ({ text: ct(p[2]) }), l: (p, g, v) => c("code", { key: v.key }, p.text) }, 6: { t: ["[^"], o: _t(SF), i: 0, u: (p) => (f.push({ footnote: p[2], identifier: p[1] }), {}), l: hi }, 7: { t: ["[^"], o: Ht(NF), i: 1, u: (p) => ({ target: "#" + r(p[1], dn), text: p[1] }), l: (p, g, v) => c("a", { key: v.key, href: n(p.target, "a", "href") }, c("sup", { key: v.key }, p.text)) }, 8: { t: ["[ ]", "[x]"], o: Ht(CF), i: 1, u: (p) => ({ completed: p[1].toLowerCase() === "x" }), l: (p, g, v) => c("input", { checked: p.completed, key: v.key, readOnly: !0, type: "checkbox" }) }, 9: { t: ["#"], o: _t(t.enforceAtxHeadings ? gu : mu), i: 1, u: (p, g, v) => ({ children: Ss(g, p[2], v), id: r(p[2], dn), level: p[1].length }), l: (p, g, v) => c("h" + p.level, { id: p.id, key: v.key }, g(p.children, v)) }, 10: { t: (p) => {
    const g = p.indexOf(`
`);
    return g > 0 && g < p.length - 1 && (p[g + 1] === "=" || p[g + 1] === "-");
  }, o: _t(yu), i: 1, u: (p, g, v) => ({ children: Ss(g, p[1], v), level: p[2] === "=" ? 1 : 2, type: "9" }) }, 11: { t: ["<"], o: ds(di), i: 1, u(p, g, v) {
    const [, _] = p[3].match(tR), w = RegExp("^" + _, "gm"), S = p[3].replace(w, ""), O = o(i, S) ? mR : Ss, D = p[1].toLowerCase(), N = hF.indexOf(D) !== -1, A = (N ? D : p[1]).trim(), R = { attrs: u(A, p[2]), noInnerParse: N, tag: A };
    if (v.inAnchor = v.inAnchor || D === "a", N) R.text = p[3];
    else {
      const L = v.inHTML;
      v.inHTML = !0, R.children = O(g, S, v), v.inHTML = L;
    }
    return v.inAnchor = !1, R;
  }, l: (p, g, v) => c(p.tag, Xt({ key: v.key }, p.attrs), p.text || (p.children ? g(p.children, v) : "")) }, 13: { t: ["<"], o: ds(ui), i: 1, u(p) {
    const g = p[1].trim();
    return { attrs: u(g, p[2] || ""), tag: g };
  }, l: (p, g, v) => c(p.tag, Xt({}, p.attrs, { key: v.key })) }, 12: { t: ["<!--"], o: ds(bu), i: 1, u: () => ({}), l: hi }, 14: { t: ["!["], o: Dt(lR), i: 1, u: (p) => ({ alt: ct(p[1]), target: ct(p[2]), title: ct(p[3]) }), l: (p, g, v) => c("img", { key: v.key, alt: p.alt || void 0, title: p.title || void 0, src: n(p.target, "img", "src") }) }, 15: { t: ["["], o: Ht(oR), i: 3, u: (p, g, v) => ({ children: hR(g, p[1], v), target: ct(p[2]), title: ct(p[3]) }), l: (p, g, v) => c("a", { key: v.key, href: n(p.target, "a", "href"), title: p.title }, g(p.children, v)) }, 16: { t: ["<"], o: Ht(kF), i: 0, u(p) {
    let g = p[1], v = !1;
    return g.indexOf("@") !== -1 && g.indexOf("//") === -1 && (v = !0, g = g.replace("mailto:", "")), { children: [{ text: g, type: "27" }], target: v ? "mailto:" + g : g, type: "15" };
  } }, 17: { t: (p, g) => !g.inAnchor && !t.disableAutoLink && (js(p, "http://") || js(p, "https://")), o: Ht(IF), i: 0, u: (p) => ({ children: [{ text: p[1], type: "27" }], target: p[1], title: void 0, type: "15" }) }, 20: $u(c, 1), 33: $u(c, 2), 19: { t: [`
`], o: _t(_F), i: 3, u: pi, l: () => `
` }, 21: { o: Fr(function(p, g) {
    if (g.inline || g.simple || g.inHTML && p.indexOf(`

`) === -1 && g.prevCapture.indexOf(`

`) === -1) return null;
    let v = "", _ = 0;
    for (; ; ) {
      const S = p.indexOf(`
`, _), O = p.slice(_, S === -1 ? void 0 : S + 1);
      if (o(a, O) || (v += O, S === -1 || !O.trim())) break;
      _ = S + 1;
    }
    const w = xn(v);
    return w === "" ? null : [v, , w];
  }), i: 3, u: fi, l: (p, g, v) => c("p", { key: v.key }, g(p.children, v)) }, 22: { t: ["["], o: Ht(DF), i: 0, u: (p) => (h[p[1]] = { target: p[2], title: p[4] }, {}), l: hi }, 23: { t: ["!["], o: Dt(MF), i: 0, u: (p) => ({ alt: p[1] ? ct(p[1]) : void 0, ref: p[2] }), l: (p, g, v) => h[p.ref] ? c("img", { key: v.key, alt: p.alt, src: n(h[p.ref].target, "img", "src"), title: h[p.ref].title }) : null }, 24: { t: (p) => p[0] === "[" && p.indexOf("](") === -1, o: Ht(LF), i: 0, u: (p, g, v) => ({ children: g(p[1], v), fallbackChildren: p[0], ref: p[2] }), l: (p, g, v) => h[p.ref] ? c("a", { key: v.key, href: n(h[p.ref].target, "a", "href"), title: h[p.ref].title }, g(p.children, v)) : c("span", { key: v.key }, p.fallbackChildren) }, 25: { t: ["|"], o: _t(vu), i: 1, u: uR, l(p, g, v) {
    const _ = p;
    return c("table", { key: v.key }, c("thead", null, c("tr", null, _.header.map(function(w, S) {
      return c("th", { key: S, style: _u(_, S) }, g(w, v));
    }))), c("tbody", null, _.cells.map(function(w, S) {
      return c("tr", { key: S }, w.map(function(O, D) {
        return c("td", { key: D, style: _u(_, D) }, g(O, v));
      }));
    })));
  } }, 27: { o: Fr(function(p, g) {
    let v;
    return js(p, ":") && (v = YF.exec(p)), v || QF.exec(p);
  }), i: 4, u(p) {
    const g = p[0];
    return { text: g.indexOf("&") === -1 ? g : g.replace(AF, (v, _) => t.namedCodesToUnicode[_] || v) };
  }, l: (p) => p.text }, 28: { t: ["**", "__"], o: Dt(KF), i: 2, u: (p, g, v) => ({ children: g(p[2], v) }), l: (p, g, v) => c("strong", { key: v.key }, g(p.children, v)) }, 29: { t: (p) => {
    const g = p[0];
    return (g === "*" || g === "_") && p[1] !== g;
  }, o: Dt(GF), i: 3, u: (p, g, v) => ({ children: g(p[2], v) }), l: (p, g, v) => c("em", { key: v.key }, g(p.children, v)) }, 30: { t: ["\\"], o: Dt(ZF), i: 1, u: (p) => ({ text: p[1], type: "27" }) }, 31: { t: ["=="], o: Dt(HF), i: 3, u: fi, l: (p, g, v) => c("mark", { key: v.key }, g(p.children, v)) }, 32: { t: ["~~"], o: Dt(JF), i: 3, u: fi, l: (p, g, v) => c("del", { key: v.key }, g(p.children, v)) } };
  t.disableParsingRawHTML === !0 && (delete m[11], delete m[13]);
  const b = function(p) {
    var g = Object.keys(p);
    function v(_, w) {
      var S = [];
      if (w.prevCapture = w.prevCapture || "", _.trim()) for (; _; ) for (var O = 0; O < g.length; ) {
        var D = g[O], N = p[D];
        if (!N.t || cR(_, w, N.t)) {
          var A = N.o(_, w);
          if (A && A[0]) {
            _ = _.substring(A[0].length);
            var R = N.u(A, v, w);
            w.prevCapture += A[0], R.type || (R.type = D), S.push(R);
            break;
          }
          O++;
        } else O++;
      }
      return w.prevCapture = "", S;
    }
    return g.sort(function(_, w) {
      return p[_].i - p[w].i || (_ < w ? -1 : 1);
    }), function(_, w) {
      return v(function(S) {
        return S.replace(jF, `
`).replace(EF, "").replace(WF, "    ");
      }(_), w);
    };
  }(m), $ = /* @__PURE__ */ function(p, g) {
    return function v(_, w = {}) {
      if (Array.isArray(_)) {
        const S = w.key, O = [];
        let D = !1;
        for (let N = 0; N < _.length; N++) {
          w.key = N;
          const A = v(_[N], w), R = xu(A);
          R && D ? O[O.length - 1] += A : A !== null && O.push(A), D = R;
        }
        return w.key = S, O;
      }
      return function(S, O, D) {
        const N = p[S.type].l;
        return g ? g(() => N(S, O, D), S, O, D) : N(S, O, D);
      }(_, v, w);
    };
  }(m, t.renderRule), y = d(e);
  return f.length ? c("div", null, y, c("footer", { key: "footer" }, f.map(function(p) {
    return c("div", { id: r(p.identifier, dn), key: p.identifier }, p.identifier, $(b(p.footnote, { inline: !0 })));
  }))) : y;
}
const La = (e) => {
  let { children: t, options: r } = e, n = function(s, a) {
    if (s == null) return {};
    var i, o, c = {}, d = Object.keys(s);
    for (o = 0; o < d.length; o++) a.indexOf(i = d[o]) >= 0 || (c[i] = s[i]);
    return c;
  }(e, pF);
  return U.cloneElement(yR(t ?? "", r), n);
};
function bR(e, t) {
  return e == null ? !0 : Df(e, t);
}
class vR extends Dn {
  constructor() {
    super(...arguments);
    /** Set up the initial state */
    ue(this, "state", {
      wasPropertyKeyModified: !1,
      additionalProperties: {}
    });
    /** Returns the `onPropertyChange` handler for the `name` field. Handles the special case where a user is attempting
     * to clear the data for a field added as an additional property. Calls the `onChange()` handler with the updated
     * formData.
     *
     * @param name - The name of the property
     * @param addedByAdditionalProperties - Flag indicating whether this property is an additional property
     * @returns - The onPropertyChange callback for the `name` property
     */
    ue(this, "onPropertyChange", (r, n = !1) => (s, a, i) => {
      const { formData: o, onChange: c, errorSchema: d } = this.props;
      s === void 0 && n && (s = "");
      const u = { ...o, [r]: s };
      c(u, d && d && {
        ...d,
        [r]: a
      }, i);
    });
    /** Returns a callback to handle the onDropPropertyClick event for the given `key` which removes the old `key` data
     * and calls the `onChange` callback with it
     *
     * @param key - The key for which the drop callback is desired
     * @returns - The drop property click callback
     */
    ue(this, "onDropPropertyClick", (r) => (n) => {
      n.preventDefault();
      const { onChange: s, formData: a } = this.props, i = { ...a };
      bR(i, r), s(i);
    });
    /** Computes the next available key name from the `preferredKey`, indexing through the already existing keys until one
     * that is already not assigned is found.
     *
     * @param preferredKey - The preferred name of a new key
     * @param [formData] - The form data in which to check if the desired key already exists
     * @returns - The name of the next available key from `preferredKey`
     */
    ue(this, "getAvailableKey", (r, n) => {
      const { uiSchema: s, registry: a } = this.props, { duplicateKeySuffixSeparator: i = "-" } = ae(s, a.globalUiOptions);
      let o = 0, c = r;
      for (; We(n, c); )
        c = `${r}${i}${++o}`;
      return c;
    });
    /** Returns a callback function that deals with the rename of a key for an additional property for a schema. That
     * callback will attempt to rename the key and move the existing data to that key, calling `onChange` when it does.
     *
     * @param oldValue - The old value of a field
     * @returns - The key change callback function
     */
    ue(this, "onKeyChange", (r) => (n, s) => {
      if (r === n)
        return;
      const { formData: a, onChange: i, errorSchema: o } = this.props;
      n = this.getAvailableKey(n, a);
      const c = {
        ...a
      }, d = { [r]: n }, u = Object.keys(c).map((h) => ({ [d[h] || h]: c[h] })), f = Object.assign({}, ...u);
      this.setState({ wasPropertyKeyModified: !0 }), i(f, o && o && {
        ...o,
        [n]: s
      });
    });
    /** Handles the adding of a new additional property on the given `schema`. Calls the `onChange` callback once the new
     * default data for that field has been added to the formData.
     *
     * @param schema - The schema element to which the new property is being added
     */
    ue(this, "handleAddClick", (r) => () => {
      if (!r.additionalProperties)
        return;
      const { formData: n, onChange: s, registry: a } = this.props, i = { ...n };
      let o, c, d;
      if (ve(r.additionalProperties)) {
        o = r.additionalProperties.type, c = r.additionalProperties.const, d = r.additionalProperties.default;
        let h = r.additionalProperties;
        if (Ce in h) {
          const { schemaUtils: m } = a;
          h = m.retrieveSchema({ $ref: h[Ce] }, n), o = h.type, c = h.const, d = h.default;
        }
        !o && (nt in h || qe in h) && (o = "object");
      }
      const u = this.getAvailableKey("newKey", i), f = c ?? d ?? this.getDefaultValue(o);
      Ie(i, u, f), s(i);
    });
  }
  /** Returns a flag indicating whether the `name` field is required in the object schema
   *
   * @param name - The name of the field to check for required-ness
   * @returns - True if the field `name` is required, false otherwise
   */
  isRequired(r) {
    const { schema: n } = this.props;
    return Array.isArray(n.required) && n.required.indexOf(r) !== -1;
  }
  /** Returns a default value to be used for a new additional schema property of the given `type`
   *
   * @param type - The type of the new additional schema property
   */
  getDefaultValue(r) {
    const { registry: { translateString: n } } = this.props;
    switch (r) {
      case "array":
        return [];
      case "boolean":
        return !1;
      case "null":
        return null;
      case "number":
        return 0;
      case "object":
        return {};
      case "string":
      default:
        return n(he.NewStringDefault);
    }
  }
  /** Renders the `ObjectField` from the given props
   */
  render() {
    const { schema: r, uiSchema: n = {}, formData: s, errorSchema: a, idSchema: i, name: o, required: c = !1, disabled: d, readonly: u, hideError: f, idPrefix: h, idSeparator: m, onBlur: b, onFocus: $, registry: y, title: p } = this.props, { fields: g, formContext: v, schemaUtils: _, translateString: w, globalUiOptions: S } = y, { SchemaField: O } = g, D = _.retrieveSchema(r, s), N = ae(n, S), { properties: A = {} } = D, R = N.title ?? D.title ?? p ?? o, L = N.description ?? D.description;
    let W;
    try {
      const k = Object.keys(A);
      W = G4(k, N.order);
    } catch (k) {
      return l.jsxs("div", { children: [l.jsx("p", { className: "config-error", style: { color: "red" }, children: l.jsx(La, { options: { disableParsingRawHTML: !0 }, children: w(he.InvalidObjectField, [o || "root", k.message]) }) }), l.jsx("pre", { children: JSON.stringify(D) })] });
    }
    const I = le("ObjectFieldTemplate", y, N), P = {
      // getDisplayLabel() always returns false for object types, so just check the `uiOptions.label`
      title: N.label === !1 ? "" : R,
      description: N.label === !1 ? void 0 : L,
      properties: W.map((k) => {
        const V = We(D, [Ne, k, Un]), q = V ? n.additionalProperties : n[k], Z = ae(q).widget === "hidden", M = G(i, [k], {});
        return {
          content: l.jsx(O, { name: k, required: this.isRequired(k), schema: G(D, [Ne, k], {}), uiSchema: q, errorSchema: G(a, k), idSchema: M, idPrefix: h, idSeparator: m, formData: G(s, k), formContext: v, wasPropertyKeyModified: this.state.wasPropertyKeyModified, onKeyChange: this.onKeyChange(k), onChange: this.onPropertyChange(k, V), onBlur: b, onFocus: $, registry: y, disabled: d, readonly: u, hideError: f, onDropPropertyClick: this.onDropPropertyClick }, k),
          name: k,
          readonly: u,
          disabled: d,
          required: c,
          hidden: Z
        };
      }),
      readonly: u,
      disabled: d,
      required: c,
      idSchema: i,
      uiSchema: n,
      errorSchema: a,
      schema: D,
      formData: s,
      formContext: v,
      registry: y
    };
    return l.jsx(I, { ...P, onAddClick: this.handleAddClick });
  }
}
const $R = {
  array: "ArrayField",
  boolean: "BooleanField",
  integer: "NumberField",
  number: "NumberField",
  object: "ObjectField",
  string: "StringField",
  null: "NullField"
};
function xR(e, t, r, n) {
  const s = t.field, { fields: a, translateString: i } = n;
  if (typeof s == "function")
    return s;
  if (typeof s == "string" && s in a)
    return a[s];
  const o = Ct(e), c = Array.isArray(o) ? o[0] : o || "", d = e.$id;
  let u = $R[c];
  return d && d in a && (u = d), !u && (e.anyOf || e.oneOf) ? () => null : u in a ? a[u] : () => {
    const f = le("UnsupportedFieldTemplate", n, t);
    return l.jsx(f, { schema: e, idSchema: r, reason: i(he.UnknownFieldType, [String(e.type)]), registry: n });
  };
}
function wR(e) {
  const { schema: t, idSchema: r, uiSchema: n, formData: s, errorSchema: a, idPrefix: i, idSeparator: o, name: c, onChange: d, onKeyChange: u, onDropPropertyClick: f, required: h, registry: m, wasPropertyKeyModified: b = !1 } = e, { formContext: $, schemaUtils: y, globalUiOptions: p } = m, g = ae(n, p), v = le("FieldTemplate", m, g), _ = le("DescriptionFieldTemplate", m, g), w = le("FieldHelpTemplate", m, g), S = le("FieldErrorTemplate", m, g), O = y.retrieveSchema(t, s), D = r[Wt], N = jt(y.toIdSchema(O, D, s, i, o), r), A = Y((je, Fe, lt) => d(je, Fe, lt || D), [D, d]), R = xR(O, g, N, m), L = !!(g.disabled ?? e.disabled), W = !!(g.readonly ?? (e.readonly || e.schema.readOnly || O.readOnly)), I = g.hideError, P = I === void 0 ? e.hideError : !!I, k = !!(g.autofocus ?? e.autofocus);
  if (Object.keys(O).length === 0)
    return null;
  const V = y.getDisplayLabel(O, n, p), { __errors: q, ...Z } = a || {}, M = Rs(n, ["ui:classNames", "classNames", "ui:style"]);
  yn in M && (M[yn] = Rs(M[yn], ["classNames", "style"]));
  const E = l.jsx(R, { ...e, onChange: A, idSchema: N, schema: O, uiSchema: M, disabled: L, readonly: W, hideError: P, autofocus: k, errorSchema: Z, formContext: $, rawErrors: q }), F = N[Wt];
  let C;
  b ? C = c : C = Un in O ? c : g.title || e.schema.title || O.title || e.title || c;
  const x = g.description || e.schema.description || O.description || "", j = g.enableMarkdownInDescription ? l.jsx(La, { options: { disableParsingRawHTML: !0 }, children: x }) : x, T = g.help, z = g.widget === "hidden", K = ["form-group", "field", `field-${Ct(O)}`];
  !P && q && q.length > 0 && K.push("field-error has-error has-danger"), n != null && n.classNames && K.push(n.classNames), g.classNames && K.push(g.classNames);
  const ne = l.jsx(w, { help: T, idSchema: N, schema: O, uiSchema: n, hasErrors: !P && q && q.length > 0, registry: m }), X = P || (O.anyOf || O.oneOf) && !y.isSelect(O) ? void 0 : l.jsx(S, { errors: q, errorSchema: a, idSchema: N, schema: O, uiSchema: n, registry: m }), me = {
    description: l.jsx(_, { id: Xn(F), description: j, schema: O, uiSchema: n, registry: m }),
    rawDescription: x,
    help: ne,
    rawHelp: typeof T == "string" ? T : void 0,
    errors: X,
    rawErrors: P ? void 0 : q,
    id: F,
    label: C,
    hidden: z,
    onChange: d,
    onKeyChange: u,
    onDropPropertyClick: f,
    required: h,
    disabled: L,
    readonly: W,
    hideError: P,
    displayLabel: V,
    classNames: K.join(" ").trim(),
    style: g.style,
    formContext: $,
    formData: s,
    schema: O,
    uiSchema: n,
    registry: m
  }, de = m.fields.AnyOfField, ge = m.fields.OneOfField, Me = (n == null ? void 0 : n["ui:field"]) && (n == null ? void 0 : n["ui:fieldReplacesAnyOrOneOf"]) === !0;
  return l.jsx(v, { ...me, children: l.jsxs(l.Fragment, { children: [E, O.anyOf && !Me && !y.isSelect(O) && l.jsx(de, { name: c, disabled: L, readonly: W, hideError: P, errorSchema: a, formData: s, formContext: $, idPrefix: i, idSchema: N, idSeparator: o, onBlur: e.onBlur, onChange: e.onChange, onFocus: e.onFocus, options: O.anyOf.map((je) => y.retrieveSchema(ve(je) ? je : {}, s)), registry: m, required: h, schema: O, uiSchema: n }), O.oneOf && !Me && !y.isSelect(O) && l.jsx(ge, { name: c, disabled: L, readonly: W, hideError: P, errorSchema: a, formData: s, formContext: $, idPrefix: i, idSchema: N, idSeparator: o, onBlur: e.onBlur, onChange: e.onChange, onFocus: e.onFocus, options: O.oneOf.map((je) => y.retrieveSchema(ve(je) ? je : {}, s)), registry: m, required: h, schema: O, uiSchema: n })] }) });
}
class _R extends Dn {
  shouldComponentUpdate(t) {
    return !we(this.props, t);
  }
  render() {
    return l.jsx(wR, { ...this.props });
  }
}
function jR(e) {
  const { schema: t, name: r, uiSchema: n, idSchema: s, formData: a, required: i, disabled: o = !1, readonly: c = !1, autofocus: d = !1, onChange: u, onBlur: f, onFocus: h, registry: m, rawErrors: b, hideError: $ } = e, { title: y, format: p } = t, { widgets: g, formContext: v, schemaUtils: _, globalUiOptions: w } = m, S = _.isSelect(t) ? In(t, n) : void 0;
  let O = S ? "select" : "text";
  p && z4(t, p, g) && (O = p);
  const { widget: D = O, placeholder: N = "", title: A, ...R } = ae(n), L = _.getDisplayLabel(t, n, w), W = A ?? y ?? r, I = St(t, D, g);
  return l.jsx(I, { options: { ...R, enumOptions: S }, schema: t, uiSchema: n, id: s.$id, name: r, label: W, hideLabel: !L, hideError: $, value: a, onChange: u, onBlur: f, onFocus: h, required: i, disabled: o, readonly: c, formContext: v, autofocus: d, registry: m, placeholder: N, rawErrors: b });
}
function SR(e) {
  const { formData: t, onChange: r } = e;
  return De(() => {
    t === void 0 && r(null);
  }, [t, r]), null;
}
function NR() {
  return {
    AnyOfField: cu,
    ArrayField: lF,
    // ArrayField falls back to SchemaField if ArraySchemaField is not defined, which it isn't by default
    BooleanField: cF,
    NumberField: fF,
    ObjectField: vR,
    OneOfField: cu,
    SchemaField: _R,
    StringField: jR,
    NullField: SR
  };
}
function ER(e) {
  const { idSchema: t, description: r, registry: n, schema: s, uiSchema: a } = e, i = ae(a, n.globalUiOptions), { label: o = !0 } = i;
  if (!r || !o)
    return null;
  const c = le("DescriptionFieldTemplate", n, i);
  return l.jsx(c, { id: Xn(t), description: r, schema: s, uiSchema: a, registry: n });
}
function OR(e) {
  const { children: t, className: r, disabled: n, hasToolbar: s, hasMoveDown: a, hasMoveUp: i, hasRemove: o, hasCopy: c, index: d, onCopyIndexClick: u, onDropIndexClick: f, onReorderClick: h, readonly: m, registry: b, uiSchema: $ } = e, { CopyButton: y, MoveDownButton: p, MoveUpButton: g, RemoveButton: v } = b.templates.ButtonTemplates, _ = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: "bold"
  };
  return l.jsxs("div", { className: r, children: [l.jsx("div", { className: s ? "col-xs-9" : "col-xs-12", children: t }), s && l.jsx("div", { className: "col-xs-3 array-item-toolbox", children: l.jsxs("div", { className: "btn-group", style: {
    display: "flex",
    justifyContent: "space-around"
  }, children: [(i || a) && l.jsx(g, { style: _, disabled: n || m || !i, onClick: h(d, d - 1), uiSchema: $, registry: b }), (i || a) && l.jsx(p, { style: _, disabled: n || m || !a, onClick: h(d, d + 1), uiSchema: $, registry: b }), c && l.jsx(y, { style: _, disabled: n || m, onClick: u(d), uiSchema: $, registry: b }), o && l.jsx(v, { style: _, disabled: n || m, onClick: f(d), uiSchema: $, registry: b })] }) })] });
}
function CR(e) {
  const { canAdd: t, className: r, disabled: n, idSchema: s, uiSchema: a, items: i, onAddClick: o, readonly: c, registry: d, required: u, schema: f, title: h } = e, m = ae(a), b = le("ArrayFieldDescriptionTemplate", d, m), $ = le("ArrayFieldItemTemplate", d, m), y = le("ArrayFieldTitleTemplate", d, m), { ButtonTemplates: { AddButton: p } } = d.templates;
  return l.jsxs("fieldset", { className: r, id: s.$id, children: [l.jsx(y, { idSchema: s, title: m.title || h, required: u, schema: f, uiSchema: a, registry: d }), l.jsx(b, { idSchema: s, description: m.description || f.description, schema: f, uiSchema: a, registry: d }), l.jsx("div", { className: "row array-item-list", children: i && i.map(({ key: g, ...v }) => l.jsx($, { ...v }, g)) }), t && l.jsx(p, { className: "array-item-add", onClick: o, disabled: n || c, uiSchema: a, registry: d })] });
}
function AR(e) {
  const { idSchema: t, title: r, schema: n, uiSchema: s, required: a, registry: i } = e, o = ae(s, i.globalUiOptions), { label: c = !0 } = o;
  if (!r || !c)
    return null;
  const d = le("TitleFieldTemplate", i, o);
  return l.jsx(d, { id: Ih(t), title: r, required: a, schema: n, uiSchema: s, registry: i });
}
function PR(e) {
  const {
    id: t,
    name: r,
    // remove this from ...rest
    value: n,
    readonly: s,
    disabled: a,
    autofocus: i,
    onBlur: o,
    onFocus: c,
    onChange: d,
    onChangeOverride: u,
    options: f,
    schema: h,
    uiSchema: m,
    formContext: b,
    registry: $,
    rawErrors: y,
    type: p,
    hideLabel: g,
    // remove this from ...rest
    hideError: v,
    // remove this from ...rest
    ..._
  } = e;
  if (!t)
    throw console.log("No id for", e), new Error(`no id for props ${JSON.stringify(e)}`);
  const w = {
    ..._,
    ...R4(h, p, f)
  };
  let S;
  w.type === "number" || w.type === "integer" ? S = n || n === 0 ? n : "" : S = n ?? "";
  const O = Y(({ target: { value: A } }) => d(A === "" ? f.emptyValue : A), [d, f]), D = Y(({ target: A }) => o(t, A && A.value), [o, t]), N = Y(({ target: A }) => c(t, A && A.value), [c, t]);
  return l.jsxs(l.Fragment, { children: [l.jsx("input", { id: t, name: t, className: "form-control", readOnly: s, disabled: a, autoFocus: i, value: S, ...w, list: h.examples ? Vi(t) : void 0, onChange: u || O, onBlur: D, onFocus: N, "aria-describedby": gr(t, !!h.examples) }), Array.isArray(h.examples) && l.jsx("datalist", { id: Vi(t), children: h.examples.concat(h.default && !h.examples.includes(h.default) ? [h.default] : []).map((A) => l.jsx("option", { value: A }, A)) }, `datalist_${t}`)] });
}
function TR({ uiSchema: e }) {
  const { submitText: t, norender: r, props: n = {} } = D4(e);
  return r ? null : l.jsx("div", { children: l.jsx("button", { type: "submit", ...n, className: `btn btn-info ${n.className || ""}`, children: t }) });
}
function Qn(e) {
  const { iconType: t = "default", icon: r, className: n, uiSchema: s, registry: a, ...i } = e;
  return l.jsx("button", { type: "button", className: `btn btn-${t} ${n}`, ...i, children: l.jsx("i", { className: `glyphicon glyphicon-${r}` }) });
}
function IR(e) {
  const { registry: { translateString: t } } = e;
  return l.jsx(Qn, { title: t(he.CopyButton), className: "array-item-copy", ...e, icon: "copy" });
}
function kR(e) {
  const { registry: { translateString: t } } = e;
  return l.jsx(Qn, { title: t(he.MoveDownButton), className: "array-item-move-down", ...e, icon: "arrow-down" });
}
function FR(e) {
  const { registry: { translateString: t } } = e;
  return l.jsx(Qn, { title: t(he.MoveUpButton), className: "array-item-move-up", ...e, icon: "arrow-up" });
}
function RR(e) {
  const { registry: { translateString: t } } = e;
  return l.jsx(Qn, { title: t(he.RemoveButton), className: "array-item-remove", ...e, iconType: "danger", icon: "remove" });
}
function DR({ className: e, onClick: t, disabled: r, registry: n }) {
  const { translateString: s } = n;
  return l.jsx("div", { className: "row", children: l.jsx("p", { className: `col-xs-3 col-xs-offset-9 text-right ${e}`, children: l.jsx(Qn, { iconType: "info", icon: "plus", className: "btn-add col-xs-12", title: s(he.AddButton), onClick: t, disabled: r, registry: n }) }) });
}
function MR() {
  return {
    SubmitButton: TR,
    AddButton: DR,
    CopyButton: IR,
    MoveDownButton: kR,
    MoveUpButton: FR,
    RemoveButton: RR
  };
}
function LR(e) {
  const { id: t, description: r } = e;
  return r ? typeof r == "string" ? l.jsx("p", { id: t, className: "field-description", children: r }) : l.jsx("div", { id: t, className: "field-description", children: r }) : null;
}
function UR({ errors: e, registry: t }) {
  const { translateString: r } = t;
  return l.jsxs("div", { className: "panel panel-danger errors", children: [l.jsx("div", { className: "panel-heading", children: l.jsx("h3", { className: "panel-title", children: r(he.ErrorsLabel) }) }), l.jsx("ul", { className: "list-group", children: e.map((n, s) => l.jsx("li", { className: "list-group-item text-danger", children: n.stack }, s)) })] });
}
const WR = "*";
function qh(e) {
  const { label: t, required: r, id: n } = e;
  return t ? l.jsxs("label", { className: "control-label", htmlFor: n, children: [t, r && l.jsx("span", { className: "required", children: WR })] }) : null;
}
function VR(e) {
  const { id: t, label: r, children: n, errors: s, help: a, description: i, hidden: o, required: c, displayLabel: d, registry: u, uiSchema: f } = e, h = ae(f), m = le("WrapIfAdditionalTemplate", u, h);
  return o ? l.jsx("div", { className: "hidden", children: n }) : l.jsxs(m, { ...e, children: [d && l.jsx(qh, { label: r, required: c, id: t }), d && i ? i : null, n, s, a] });
}
function BR(e) {
  const { errors: t = [], idSchema: r } = e;
  if (t.length === 0)
    return null;
  const n = Ph(r);
  return l.jsx("div", { children: l.jsx("ul", { id: n, className: "error-detail bs-callout bs-callout-info", children: t.filter((s) => !!s).map((s, a) => l.jsx("li", { className: "text-danger", children: s }, a)) }) });
}
function zR(e) {
  const { idSchema: t, help: r } = e;
  if (!r)
    return null;
  const n = Th(t);
  return typeof r == "string" ? l.jsx("p", { id: n, className: "help-block", children: r }) : l.jsx("div", { id: n, className: "help-block", children: r });
}
function qR(e) {
  const { description: t, disabled: r, formData: n, idSchema: s, onAddClick: a, properties: i, readonly: o, registry: c, required: d, schema: u, title: f, uiSchema: h } = e, m = ae(h), b = le("TitleFieldTemplate", c, m), $ = le("DescriptionFieldTemplate", c, m), { ButtonTemplates: { AddButton: y } } = c.templates;
  return l.jsxs("fieldset", { id: s.$id, children: [f && l.jsx(b, { id: Ih(s), title: f, required: d, schema: u, uiSchema: h, registry: c }), t && l.jsx($, { id: Xn(s), description: t, schema: u, uiSchema: h, registry: c }), i.map((p) => p.content), Ny(u, h, n) && l.jsx(y, { className: "object-property-expand", onClick: a(u), disabled: r || o, uiSchema: h, registry: c })] });
}
const KR = "*";
function GR(e) {
  const { id: t, title: r, required: n } = e;
  return l.jsxs("legend", { id: t, children: [r, n && l.jsx("span", { className: "required", children: KR })] });
}
function HR(e) {
  const { schema: t, idSchema: r, reason: n, registry: s } = e, { translateString: a } = s;
  let i = he.UnsupportedField;
  const o = [];
  return r && r.$id && (i = he.UnsupportedFieldWithId, o.push(r.$id)), n && (i = i === he.UnsupportedField ? he.UnsupportedFieldWithReason : he.UnsupportedFieldWithIdAndReason, o.push(n)), l.jsxs("div", { className: "unsupported-field", children: [l.jsx("p", { children: l.jsx(La, { options: { disableParsingRawHTML: !0 }, children: a(i, o) }) }), t && l.jsx("pre", { children: JSON.stringify(t, null, 2) })] });
}
function JR(e) {
  const { id: t, classNames: r, style: n, disabled: s, label: a, onKeyChange: i, onDropPropertyClick: o, readonly: c, required: d, schema: u, children: f, uiSchema: h, registry: m } = e, { templates: b, translateString: $ } = m, { RemoveButton: y } = b.ButtonTemplates, p = $(he.KeyLabel, [a]);
  return Un in u ? l.jsx("div", { className: r, style: n, children: l.jsxs("div", { className: "row", children: [l.jsx("div", { className: "col-xs-5 form-additional", children: l.jsxs("div", { className: "form-group", children: [l.jsx(qh, { label: p, required: d, id: `${t}-key` }), l.jsx("input", { className: "form-control", type: "text", id: `${t}-key`, onBlur: ({ target: v }) => i(v && v.value), defaultValue: a })] }) }), l.jsx("div", { className: "form-additional form-group col-xs-5", children: f }), l.jsx("div", { className: "col-xs-2", children: l.jsx(y, { className: "array-item-remove btn-block", style: { border: "0" }, disabled: s || c, onClick: o(a), uiSchema: h, registry: m }) })] }) }) : l.jsx("div", { className: r, style: n, children: f });
}
function YR() {
  return {
    ArrayFieldDescriptionTemplate: ER,
    ArrayFieldItemTemplate: OR,
    ArrayFieldTemplate: CR,
    ArrayFieldTitleTemplate: AR,
    ButtonTemplates: MR(),
    BaseInputTemplate: PR,
    DescriptionFieldTemplate: LR,
    ErrorListTemplate: UR,
    FieldTemplate: VR,
    FieldErrorTemplate: BR,
    FieldHelpTemplate: zR,
    ObjectFieldTemplate: qR,
    TitleFieldTemplate: GR,
    UnsupportedFieldTemplate: HR,
    WrapIfAdditionalTemplate: JR
  };
}
function ZR(e) {
  return Object.values(e).every((t) => t !== -1);
}
function XR({ type: e, range: t, value: r, select: n, rootId: s, name: a, disabled: i, readonly: o, autofocus: c, registry: d, onBlur: u, onFocus: f }) {
  const h = s + "_" + e, { SelectWidget: m } = d.widgets;
  return l.jsx(m, { schema: { type: "integer" }, id: h, name: a, className: "form-control", options: { enumOptions: Eh(t[0], t[1]) }, placeholder: e, value: r, disabled: i, readonly: o, autofocus: c, onChange: (b) => n(e, b), onBlur: u, onFocus: f, registry: d, label: "", "aria-describedby": gr(s) });
}
function QR({ time: e = !1, disabled: t = !1, readonly: r = !1, autofocus: n = !1, options: s, id: a, name: i, registry: o, onBlur: c, onFocus: d, onChange: u, value: f }) {
  const { translateString: h } = o, [m, b] = te(f), [$, y] = rg((_, w) => ({ ..._, ...w }), ci(f, e));
  De(() => {
    const _ = iu($, e);
    ZR($) && _ !== f ? u(_) : m !== f && (b(f), y(ci(f, e)));
  }, [e, f, u, $, m]);
  const p = Y((_, w) => {
    y({ [_]: w });
  }, []), g = Y((_) => {
    if (_.preventDefault(), t || r)
      return;
    const w = ci((/* @__PURE__ */ new Date()).toJSON(), e);
    u(iu(w, e));
  }, [t, r, e]), v = Y((_) => {
    _.preventDefault(), !(t || r) && u(void 0);
  }, [t, r, u]);
  return l.jsxs("ul", { className: "list-inline", children: [k4($, e, s.yearsRange, s.format).map((_, w) => l.jsx("li", { className: "list-inline-item", children: l.jsx(XR, { rootId: a, name: i, select: p, ..._, disabled: t, readonly: r, registry: o, onBlur: c, onFocus: d, autofocus: n && w === 0 }) }, w)), (s.hideNowButton !== "undefined" ? !s.hideNowButton : !0) && l.jsx("li", { className: "list-inline-item", children: l.jsx("a", { href: "#", className: "btn btn-info btn-now", onClick: g, children: h(he.NowLabel) }) }), (s.hideClearButton !== "undefined" ? !s.hideClearButton : !0) && l.jsx("li", { className: "list-inline-item", children: l.jsx("a", { href: "#", className: "btn btn-warning btn-clear", onClick: v, children: h(he.ClearLabel) }) })] });
}
function eD({ time: e = !0, ...t }) {
  const { AltDateWidget: r } = t.registry.widgets;
  return l.jsx(r, { time: e, ...t });
}
function tD({ schema: e, uiSchema: t, options: r, id: n, value: s, disabled: a, readonly: i, label: o, hideLabel: c, autofocus: d = !1, onBlur: u, onFocus: f, onChange: h, registry: m }) {
  const b = le("DescriptionFieldTemplate", m, r), $ = ws(e), y = Y((_) => h(_.target.checked), [h]), p = Y((_) => u(n, _.target.checked), [u, n]), g = Y((_) => f(n, _.target.checked), [f, n]), v = r.description ?? e.description;
  return l.jsxs("div", { className: `checkbox ${a || i ? "disabled" : ""}`, children: [!c && !!v && l.jsx(b, { id: Xn(n), description: v, schema: e, uiSchema: t, registry: m }), l.jsxs("label", { children: [l.jsx("input", { type: "checkbox", id: n, name: n, checked: typeof s > "u" ? !1 : s, required: $, disabled: a || i, autoFocus: d, onChange: y, onBlur: p, onFocus: g, "aria-describedby": gr(n) }), q4(l.jsx("span", { children: o }), c)] })] });
}
function rD({ id: e, disabled: t, options: { inline: r = !1, enumOptions: n, enumDisabled: s, emptyValue: a }, value: i, autofocus: o = !1, readonly: c, onChange: d, onBlur: u, onFocus: f }) {
  const h = Array.isArray(i) ? i : [i], m = Y(({ target: $ }) => u(e, mt($ && $.value, n, a)), [u, e]), b = Y(({ target: $ }) => f(e, mt($ && $.value, n, a)), [f, e]);
  return l.jsx("div", { className: "checkboxes", id: e, children: Array.isArray(n) && n.map(($, y) => {
    const p = il($.value, h), g = Array.isArray(s) && s.indexOf($.value) !== -1, v = t || g || c ? "disabled" : "", _ = (S) => {
      S.target.checked ? d(C4(y, h, n)) : d(E4(y, h, n));
    }, w = l.jsxs("span", { children: [l.jsx("input", { type: "checkbox", id: kh(e, y), name: e, checked: p, value: String(y), disabled: t || g || c, autoFocus: o && y === 0, onChange: _, onBlur: m, onFocus: b, "aria-describedby": gr(e) }), l.jsx("span", { children: $.label })] });
    return r ? l.jsx("label", { className: `checkbox-inline ${v}`, children: w }, y) : l.jsx("div", { className: `checkbox ${v}`, children: l.jsx("label", { children: w }) }, y);
  }) });
}
function nD(e) {
  const { disabled: t, readonly: r, options: n, registry: s } = e, a = le("BaseInputTemplate", s, n);
  return l.jsx(a, { type: "color", ...e, disabled: t || r });
}
function sD(e) {
  const { onChange: t, options: r, registry: n } = e, s = le("BaseInputTemplate", n, r), a = Y((i) => t(i || void 0), [t]);
  return l.jsx(s, { type: "date", ...e, onChange: a });
}
function aD(e) {
  const { onChange: t, value: r, options: n, registry: s } = e, a = le("BaseInputTemplate", s, n);
  return l.jsx(a, { type: "datetime-local", ...e, value: Y4(r), onChange: (i) => t(K4(i)) });
}
function iD(e) {
  const { options: t, registry: r } = e, n = le("BaseInputTemplate", r, t);
  return l.jsx(n, { type: "email", ...e });
}
function oD(e, t) {
  return e === null ? null : e.replace(";base64", `;name=${encodeURIComponent(t)};base64`);
}
function lD(e) {
  const { name: t, size: r, type: n } = e;
  return new Promise((s, a) => {
    const i = new window.FileReader();
    i.onerror = a, i.onload = (o) => {
      var c;
      typeof ((c = o.target) == null ? void 0 : c.result) == "string" ? s({
        dataURL: oD(o.target.result, t),
        name: t,
        size: r,
        type: n
      }) : s({
        dataURL: null,
        name: t,
        size: r,
        type: n
      });
    }, i.readAsDataURL(e);
  });
}
function cD(e) {
  return Promise.all(Array.from(e).map(lD));
}
function dD({ fileInfo: e, registry: t }) {
  const { translateString: r } = t, { dataURL: n, type: s, name: a } = e;
  return n ? ["image/jpeg", "image/png"].includes(s) ? l.jsx("img", { src: n, style: { maxWidth: "100%" }, className: "file-preview" }) : l.jsxs(l.Fragment, { children: [" ", l.jsx("a", { download: `preview-${a}`, href: n, className: "file-download", children: r(he.PreviewLabel) })] }) : null;
}
function uD({ filesInfo: e, registry: t, preview: r, onRemove: n, options: s }) {
  if (e.length === 0)
    return null;
  const { translateString: a } = t, { RemoveButton: i } = le("ButtonTemplates", t, s);
  return l.jsx("ul", { className: "file-info", children: e.map((o, c) => {
    const { name: d, size: u, type: f } = o, h = () => n(c);
    return l.jsxs("li", { children: [l.jsx(La, { children: a(he.FilesInfo, [d, f, String(u)]) }), r && l.jsx(dD, { fileInfo: o, registry: t }), l.jsx(i, { onClick: h, registry: t })] }, c);
  }) });
}
function fD(e) {
  return e.reduce((t, r) => {
    if (!r)
      return t;
    try {
      const { blob: n, name: s } = j4(r);
      return [
        ...t,
        {
          dataURL: r,
          name: s,
          size: n.size,
          type: n.type
        }
      ];
    } catch {
      return t;
    }
  }, []);
}
function pD(e) {
  const { disabled: t, readonly: r, required: n, multiple: s, onChange: a, value: i, options: o, registry: c } = e, d = le("BaseInputTemplate", c, o), u = Y((m) => {
    m.target.files && cD(m.target.files).then((b) => {
      const $ = b.map((y) => y.dataURL);
      a(s ? i.concat($) : $[0]);
    });
  }, [s, i, a]), f = Bt(() => fD(Array.isArray(i) ? i : [i]), [i]), h = Y((m) => {
    if (s) {
      const b = i.filter(($, y) => y !== m);
      a(b);
    } else
      a(void 0);
  }, [s, i, a]);
  return l.jsxs("div", { children: [l.jsx(d, { ...e, disabled: t || r, type: "file", required: i ? !1 : n, onChangeOverride: u, value: "", accept: o.accept ? String(o.accept) : void 0 }), l.jsx(uD, { filesInfo: f, onRemove: h, registry: c, preview: o.filePreview, options: o })] });
}
function hD({ id: e, value: t }) {
  return l.jsx("input", { type: "hidden", id: e, name: e, value: typeof t > "u" ? "" : t });
}
function mD(e) {
  const { options: t, registry: r } = e, n = le("BaseInputTemplate", r, t);
  return l.jsx(n, { type: "password", ...e });
}
function gD({ options: e, value: t, required: r, disabled: n, readonly: s, autofocus: a = !1, onBlur: i, onFocus: o, onChange: c, id: d }) {
  const { enumOptions: u, enumDisabled: f, inline: h, emptyValue: m } = e, b = Y(({ target: y }) => i(d, mt(y && y.value, u, m)), [i, d]), $ = Y(({ target: y }) => o(d, mt(y && y.value, u, m)), [o, d]);
  return l.jsx("div", { className: "field-radio-group", id: d, children: Array.isArray(u) && u.map((y, p) => {
    const g = il(y.value, t), v = Array.isArray(f) && f.indexOf(y.value) !== -1, _ = n || v || s ? "disabled" : "", w = () => c(y.value), S = l.jsxs("span", { children: [l.jsx("input", { type: "radio", id: kh(d, p), checked: g, name: d, required: r, value: String(p), disabled: n || v || s, autoFocus: a && p === 0, onChange: w, onBlur: b, onFocus: $, "aria-describedby": gr(d) }), l.jsx("span", { children: y.label })] });
    return h ? l.jsx("label", { className: `radio-inline ${_}`, children: S }, p) : l.jsx("div", { className: `radio ${_}`, children: l.jsx("label", { children: S }) }, p);
  }) });
}
function yD(e) {
  const { value: t, registry: { templates: { BaseInputTemplate: r } } } = e;
  return l.jsxs("div", { className: "field-range-wrapper", children: [l.jsx(r, { type: "range", ...e }), l.jsx("span", { className: "range-view", children: t })] });
}
function gi(e, t) {
  return t ? Array.from(e.target.options).slice().filter((r) => r.selected).map((r) => r.value) : e.target.value;
}
function bD({ schema: e, id: t, options: r, value: n, required: s, disabled: a, readonly: i, multiple: o = !1, autofocus: c = !1, onChange: d, onBlur: u, onFocus: f, placeholder: h }) {
  const { enumOptions: m, enumDisabled: b, emptyValue: $ } = r, y = o ? [] : "", p = Y((S) => {
    const O = gi(S, o);
    return f(t, mt(O, m, $));
  }, [f, t, e, o, m, $]), g = Y((S) => {
    const O = gi(S, o);
    return u(t, mt(O, m, $));
  }, [u, t, e, o, m, $]), v = Y((S) => {
    const O = gi(S, o);
    return d(mt(O, m, $));
  }, [d, e, o, m, $]), _ = O4(n, m, o), w = !o && e.default === void 0;
  return l.jsxs("select", { id: t, name: t, multiple: o, className: "form-control", value: typeof _ > "u" ? y : _, required: s, disabled: a || i, autoFocus: c, onBlur: g, onFocus: p, onChange: v, "aria-describedby": gr(t), children: [w && l.jsx("option", { value: "", children: h }), Array.isArray(m) && m.map(({ value: S, label: O }, D) => {
    const N = b && b.indexOf(S) !== -1;
    return l.jsx("option", { value: String(D), disabled: N, children: O }, D);
  })] });
}
function Kh({ id: e, options: t = {}, placeholder: r, value: n, required: s, disabled: a, readonly: i, autofocus: o = !1, onChange: c, onBlur: d, onFocus: u }) {
  const f = Y(({ target: { value: b } }) => c(b === "" ? t.emptyValue : b), [c, t.emptyValue]), h = Y(({ target: b }) => d(e, b && b.value), [d, e]), m = Y(({ target: b }) => u(e, b && b.value), [e, u]);
  return l.jsx("textarea", { id: e, name: e, className: "form-control", value: n || "", placeholder: r, required: s, disabled: a, readOnly: i, autoFocus: o, rows: t.rows, onBlur: h, onFocus: m, onChange: f, "aria-describedby": gr(e) });
}
Kh.defaultProps = {
  autofocus: !1,
  options: {}
};
function vD(e) {
  const { options: t, registry: r } = e, n = le("BaseInputTemplate", r, t);
  return l.jsx(n, { ...e });
}
function $D(e) {
  const { onChange: t, options: r, registry: n } = e, s = le("BaseInputTemplate", n, r), a = Y((i) => t(i ? `${i}:00` : void 0), [t]);
  return l.jsx(s, { type: "time", ...e, onChange: a });
}
function xD(e) {
  const { options: t, registry: r } = e, n = le("BaseInputTemplate", r, t);
  return l.jsx(n, { type: "url", ...e });
}
function wD(e) {
  const { options: t, registry: r } = e, n = le("BaseInputTemplate", r, t);
  return l.jsx(n, { type: "number", ...e });
}
function _D() {
  return {
    AltDateWidget: QR,
    AltDateTimeWidget: eD,
    CheckboxWidget: tD,
    CheckboxesWidget: rD,
    ColorWidget: nD,
    DateWidget: sD,
    DateTimeWidget: aD,
    EmailWidget: iD,
    FileWidget: pD,
    HiddenWidget: hD,
    PasswordWidget: mD,
    RadioWidget: gD,
    RangeWidget: yD,
    SelectWidget: bD,
    TextWidget: vD,
    TextareaWidget: Kh,
    TimeWidget: $D,
    UpDownWidget: wD,
    URLWidget: xD
  };
}
function jD() {
  return {
    fields: NR(),
    templates: YR(),
    widgets: _D(),
    rootSchema: {},
    formContext: {},
    translateString: N4
  };
}
class SD extends Dn {
  /** Constructs the `Form` from the `props`. Will setup the initial state from the props. It will also call the
   * `onChange` handler if the initially provided `formData` is modified to add missing default values as part of the
   * state construction.
   *
   * @param props - The initial props for the `Form`
   */
  constructor(r) {
    super(r);
    /** The ref used to hold the `form` element, this needs to be `any` because `tagName` or `_internalFormWrapper` can
     * provide any possible type here
     */
    ue(this, "formElement");
    /** Returns the `formData` with only the elements specified in the `fields` list
     *
     * @param formData - The data for the `Form`
     * @param fields - The fields to keep while filtering
     */
    ue(this, "getUsedFormData", (r, n) => {
      if (n.length === 0 && typeof r != "object")
        return r;
      const s = ou(r, n);
      return Array.isArray(r) ? Object.keys(s).map((a) => s[a]) : s;
    });
    /** Returns the list of field names from inspecting the `pathSchema` as well as using the `formData`
     *
     * @param pathSchema - The `PathSchema` object for the form
     * @param [formData] - The form data to use while checking for empty objects/arrays
     */
    ue(this, "getFieldNames", (r, n) => {
      const s = (a, i = [], o = [[]]) => (Object.keys(a).forEach((c) => {
        if (typeof a[c] == "object") {
          const d = o.map((u) => [...u, c]);
          a[c][to] && a[c][bs] !== "" ? i.push(a[c][bs]) : s(a[c], i, d);
        } else c === bs && a[c] !== "" && o.forEach((d) => {
          const u = G(n, d);
          (typeof u != "object" || Ar(u) || Array.isArray(u) && u.every((f) => typeof f != "object")) && i.push(d);
        });
      }), i);
      return s(r);
    });
    /** Returns the `formData` after filtering to remove any extra data not in a form field
     *
     * @param formData - The data for the `Form`
     * @returns The `formData` after omitting extra data
     */
    ue(this, "omitExtraData", (r) => {
      const { schema: n, schemaUtils: s } = this.state, a = s.retrieveSchema(n, r), i = s.toPathSchema(a, "", r), o = this.getFieldNames(i, r);
      return this.getUsedFormData(r, o);
    });
    /** Function to handle changes made to a field in the `Form`. This handler receives an entirely new copy of the
     * `formData` along with a new `ErrorSchema`. It will first update the `formData` with any missing default fields and
     * then, if `omitExtraData` and `liveOmit` are turned on, the `formData` will be filtered to remove any extra data not
     * in a form field. Then, the resulting formData will be validated if required. The state will be updated with the new
     * updated (potentially filtered) `formData`, any errors that resulted from validation. Finally the `onChange`
     * callback will be called if specified with the updated state.
     *
     * @param formData - The new form data from a change to a field
     * @param newErrorSchema - The new `ErrorSchema` based on the field change
     * @param id - The id of the field that caused the change
     */
    ue(this, "onChange", (r, n, s) => {
      const { extraErrors: a, omitExtraData: i, liveOmit: o, noValidate: c, liveValidate: d, onChange: u } = this.props, { schemaUtils: f, schema: h } = this.state;
      let m = this.state.retrievedSchema;
      if (ie(r) || Array.isArray(r)) {
        const p = this.getStateFromProps(this.props, r);
        r = p.formData, m = p.retrievedSchema;
      }
      const b = !c && d;
      let $ = { formData: r, schema: h }, y = r;
      if (i === !0 && o === !0 && (y = this.omitExtraData(r), $ = {
        formData: y
      }), b) {
        const p = this.validate(y, h, f, m);
        let g = p.errors, v = p.errorSchema;
        const _ = g, w = v;
        if (a) {
          const S = _s(p, a);
          v = S.errorSchema, g = S.errors;
        }
        if (n) {
          const S = this.filterErrorsBasedOnSchema(n, m, y);
          v = jt(v, S, "preventDuplicates");
        }
        $ = {
          formData: y,
          errors: g,
          errorSchema: v,
          schemaValidationErrors: _,
          schemaValidationErrorSchema: w
        };
      } else if (!c && n) {
        const p = a ? jt(n, a, "preventDuplicates") : n;
        $ = {
          formData: y,
          errorSchema: p,
          errors: kn(p)
        };
      }
      this.setState($, () => u && u({ ...this.state, ...$ }, s));
    });
    /**
     * Callback function to handle reset form data.
     * - Reset all fields with default values.
     * - Reset validations and errors
     *
     */
    ue(this, "reset", () => {
      const { onChange: r } = this.props, a = {
        formData: this.getStateFromProps(this.props, void 0).formData,
        errorSchema: {},
        errors: [],
        schemaValidationErrors: [],
        schemaValidationErrorSchema: {}
      };
      this.setState(a, () => r && r({ ...this.state, ...a }));
    });
    /** Callback function to handle when a field on the form is blurred. Calls the `onBlur` callback for the `Form` if it
     * was provided.
     *
     * @param id - The unique `id` of the field that was blurred
     * @param data - The data associated with the field that was blurred
     */
    ue(this, "onBlur", (r, n) => {
      const { onBlur: s } = this.props;
      s && s(r, n);
    });
    /** Callback function to handle when a field on the form is focused. Calls the `onFocus` callback for the `Form` if it
     * was provided.
     *
     * @param id - The unique `id` of the field that was focused
     * @param data - The data associated with the field that was focused
     */
    ue(this, "onFocus", (r, n) => {
      const { onFocus: s } = this.props;
      s && s(r, n);
    });
    /** Callback function to handle when the form is submitted. First, it prevents the default event behavior. Nothing
     * happens if the target and currentTarget of the event are not the same. It will omit any extra data in the
     * `formData` in the state if `omitExtraData` is true. It will validate the resulting `formData`, reporting errors
     * via the `onError()` callback unless validation is disabled. Finally, it will add in any `extraErrors` and then call
     * back the `onSubmit` callback if it was provided.
     *
     * @param event - The submit HTML form event
     */
    ue(this, "onSubmit", (r) => {
      if (r.preventDefault(), r.target !== r.currentTarget)
        return;
      r.persist();
      const { omitExtraData: n, extraErrors: s, noValidate: a, onSubmit: i } = this.props;
      let { formData: o } = this.state;
      if (n === !0 && (o = this.omitExtraData(o)), a || this.validateFormWithFormData(o)) {
        const c = s || {}, d = s ? kn(s) : [];
        this.setState({
          formData: o,
          errors: d,
          errorSchema: c,
          schemaValidationErrors: [],
          schemaValidationErrorSchema: {}
        }, () => {
          i && i({ ...this.state, formData: o, status: "submitted" }, r);
        });
      }
    });
    /** Provides a function that can be used to programmatically submit the `Form` */
    ue(this, "submit", () => {
      if (this.formElement.current) {
        const r = new CustomEvent("submit", {
          cancelable: !0
        });
        r.preventDefault(), this.formElement.current.dispatchEvent(r), this.formElement.current.requestSubmit();
      }
    });
    /** Validates the form using the given `formData`. For use on form submission or on programmatic validation.
     * If `onError` is provided, then it will be called with the list of errors.
     *
     * @param formData - The form data to validate
     * @returns - True if the form is valid, false otherwise.
     */
    ue(this, "validateFormWithFormData", (r) => {
      const { extraErrors: n, extraErrorsBlockSubmit: s, focusOnFirstError: a, onError: i } = this.props, { errors: o } = this.state, c = this.validate(r);
      let d = c.errors, u = c.errorSchema;
      const f = d, h = u, m = d.length > 0 || n && s;
      if (m) {
        if (n) {
          const b = _s(c, n);
          u = b.errorSchema, d = b.errors;
        }
        a && (typeof a == "function" ? a(d[0]) : this.focusOnError(d[0])), this.setState({
          errors: d,
          errorSchema: u,
          schemaValidationErrors: f,
          schemaValidationErrorSchema: h
        }, () => {
          i ? i(d) : console.error("Form validation failed", d);
        });
      } else o.length > 0 && this.setState({
        errors: [],
        errorSchema: {},
        schemaValidationErrors: [],
        schemaValidationErrorSchema: {}
      });
      return !m;
    });
    if (!r.validator)
      throw new Error("A validator is required for Form functionality to work");
    this.state = this.getStateFromProps(r, r.formData), this.props.onChange && !we(this.state.formData, this.props.formData) && this.props.onChange(this.state), this.formElement = ng();
  }
  /**
   * `getSnapshotBeforeUpdate` is a React lifecycle method that is invoked right before the most recently rendered
   * output is committed to the DOM. It enables your component to capture current values (e.g., scroll position) before
   * they are potentially changed.
   *
   * In this case, it checks if the props have changed since the last render. If they have, it computes the next state
   * of the component using `getStateFromProps` method and returns it along with a `shouldUpdate` flag set to `true` IF
   * the `nextState` and `prevState` are different, otherwise `false`. This ensures that we have the most up-to-date
   * state ready to be applied in `componentDidUpdate`.
   *
   * If `formData` hasn't changed, it simply returns an object with `shouldUpdate` set to `false`, indicating that a
   * state update is not necessary.
   *
   * @param prevProps - The previous set of props before the update.
   * @param prevState - The previous state before the update.
   * @returns Either an object containing the next state and a flag indicating that an update should occur, or an object
   *        with a flag indicating that an update is not necessary.
   */
  getSnapshotBeforeUpdate(r, n) {
    if (!we(this.props, r)) {
      const s = nF(this.props.formData, r.formData), a = !we(r.schema, this.props.schema), i = s.length > 0 || !we(r.formData, this.props.formData), o = this.getStateFromProps(
        this.props,
        this.props.formData,
        // If the `schema` has changed, we need to update the retrieved schema.
        // Or if the `formData` changes, for example in the case of a schema with dependencies that need to
        //  match one of the subSchemas, the retrieved schema must be updated.
        a || i ? void 0 : this.state.retrievedSchema,
        a,
        s
      ), c = !we(o, n);
      return { nextState: o, shouldUpdate: c };
    }
    return { shouldUpdate: !1 };
  }
  /**
   * `componentDidUpdate` is a React lifecycle method that is invoked immediately after updating occurs. This method is
   * not called for the initial render.
   *
   * Here, it checks if an update is necessary based on the `shouldUpdate` flag received from `getSnapshotBeforeUpdate`.
   * If an update is required, it applies the next state and, if needed, triggers the `onChange` handler to inform about
   * changes.
   *
   * This method effectively replaces the deprecated `UNSAFE_componentWillReceiveProps`, providing a safer alternative
   * to handle prop changes and state updates.
   *
   * @param _ - The previous set of props.
   * @param prevState - The previous state of the component before the update.
   * @param snapshot - The value returned from `getSnapshotBeforeUpdate`.
   */
  componentDidUpdate(r, n, s) {
    if (s.shouldUpdate) {
      const { nextState: a } = s;
      !we(a.formData, this.props.formData) && !we(a.formData, n.formData) && this.props.onChange && this.props.onChange(a), this.setState(a);
    }
  }
  /** Extracts the updated state from the given `props` and `inputFormData`. As part of this process, the
   * `inputFormData` is first processed to add any missing required defaults. After that, the data is run through the
   * validation process IF required by the `props`.
   *
   * @param props - The props passed to the `Form`
   * @param inputFormData - The new or current data for the `Form`
   * @param retrievedSchema - An expanded schema, if not provided, it will be retrieved from the `schema` and `formData`.
   * @param isSchemaChanged - A flag indicating whether the schema has changed.
   * @param formDataChangedFields - The changed fields of `formData`
   * @returns - The new state for the `Form`
   */
  getStateFromProps(r, n, s, a = !1, i = []) {
    var A;
    const o = this.state || {}, c = "schema" in r ? r.schema : this.props.schema, d = ("uiSchema" in r ? r.uiSchema : this.props.uiSchema) || {}, u = typeof n < "u", f = "liveValidate" in r ? r.liveValidate : this.props.liveValidate, h = u && !r.noValidate && f, m = c, b = "experimental_defaultFormStateBehavior" in r ? r.experimental_defaultFormStateBehavior : this.props.experimental_defaultFormStateBehavior, $ = "experimental_customMergeAllOf" in r ? r.experimental_customMergeAllOf : this.props.experimental_customMergeAllOf;
    let y = o.schemaUtils;
    (!y || y.doesSchemaUtilsDiffer(r.validator, m, b, $)) && (y = _4(r.validator, m, b, $));
    const p = y.getDefaultFormState(c, n), g = this.updateRetrievedSchema(s ?? y.retrieveSchema(c, p)), v = () => r.noValidate || a ? { errors: [], errorSchema: {} } : r.liveValidate ? {
      errors: o.errors || [],
      errorSchema: o.errorSchema || {}
    } : {
      errors: o.schemaValidationErrors || [],
      errorSchema: o.schemaValidationErrorSchema || {}
    };
    let _, w, S = o.schemaValidationErrors, O = o.schemaValidationErrorSchema;
    if (h) {
      const R = this.validate(p, c, y, g);
      _ = R.errors, s === void 0 ? w = R.errorSchema : w = jt((A = this.state) == null ? void 0 : A.errorSchema, R.errorSchema, "preventDuplicates"), S = _, O = w;
    } else {
      const R = v();
      if (_ = R.errors, w = R.errorSchema, i.length > 0) {
        const L = i.reduce((W, I) => (W[I] = void 0, W), {});
        w = O = jt(R.errorSchema, L, "preventDuplicates");
      }
    }
    if (r.extraErrors) {
      const R = _s({ errorSchema: w, errors: _ }, r.extraErrors);
      w = R.errorSchema, _ = R.errors;
    }
    const D = y.toIdSchema(g, d["ui:rootFieldId"], p, r.idPrefix, r.idSeparator);
    return {
      schemaUtils: y,
      schema: c,
      uiSchema: d,
      idSchema: D,
      formData: p,
      edit: u,
      errors: _,
      errorSchema: w,
      schemaValidationErrors: S,
      schemaValidationErrorSchema: O,
      retrievedSchema: g
    };
  }
  /** React lifecycle method that is used to determine whether component should be updated.
   *
   * @param nextProps - The next version of the props
   * @param nextState - The next version of the state
   * @returns - True if the component should be updated, false otherwise
   */
  shouldComponentUpdate(r, n) {
    return H4(this, r, n);
  }
  /** Gets the previously raised customValidate errors.
   *
   * @returns the previous customValidate errors
   */
  getPreviousCustomValidateErrors() {
    const { customValidate: r, uiSchema: n } = this.props, s = this.state.formData;
    let a = {};
    if (typeof r == "function") {
      const i = r(s, Is(s), n);
      a = cl(i);
    }
    return a;
  }
  /** Validates the `formData` against the `schema` using the `altSchemaUtils` (if provided otherwise it uses the
   * `schemaUtils` in the state), returning the results.
   *
   * @param formData - The new form data to validate
   * @param schema - The schema used to validate against
   * @param altSchemaUtils - The alternate schemaUtils to use for validation
   */
  validate(r, n = this.props.schema, s, a) {
    const i = s || this.state.schemaUtils, { customValidate: o, transformErrors: c, uiSchema: d } = this.props, u = a ?? i.retrieveSchema(n, r);
    return i.getValidator().validateFormData(r, u, o, c, d);
  }
  /** Renders any errors contained in the `state` in using the `ErrorList`, if not disabled by `showErrorList`. */
  renderErrors(r) {
    const { errors: n, errorSchema: s, schema: a, uiSchema: i } = this.state, { formContext: o } = this.props, c = ae(i), d = le("ErrorListTemplate", r, c);
    return n && n.length ? l.jsx(d, { errors: n, errorSchema: s || {}, schema: a, uiSchema: i, formContext: o, registry: r }) : null;
  }
  // Filtering errors based on your retrieved schema to only show errors for properties in the selected branch.
  filterErrorsBasedOnSchema(r, n, s) {
    const { retrievedSchema: a, schemaUtils: i } = this.state, o = n ?? a, c = i.toPathSchema(o, "", s), d = this.getFieldNames(c, s), u = ou(r, d);
    (n == null ? void 0 : n.type) !== "object" && (n == null ? void 0 : n.type) !== "array" && (u.__errors = r.__errors);
    const f = this.getPreviousCustomValidateErrors(), h = (b = [], $) => b.length === 0 ? b : b.filter((y) => !$.includes(y)), m = (b, $ = {}) => (sF(b, (y, p) => {
      const g = $[p];
      $n(y) || Array.isArray(y) && y.length === 0 ? delete b[p] : ie(y) && ie(g) && Array.isArray(g == null ? void 0 : g.__errors) ? b[p] = h(y.__errors, g.__errors) : typeof y == "object" && !Array.isArray(y.__errors) && m(y, $[p]);
    }), b);
    return m(u, f);
  }
  /**
   * If the retrievedSchema has changed the new retrievedSchema is returned.
   * Otherwise, the old retrievedSchema is returned to persist reference.
   * -  This ensures that AJV retrieves the schema from the cache when it has not changed,
   *    avoiding the performance cost of recompiling the schema.
   *
   * @param retrievedSchema The new retrieved schema.
   * @returns The new retrieved schema if it has changed, else the old retrieved schema.
   */
  updateRetrievedSchema(r) {
    var s;
    return we(r, (s = this.state) == null ? void 0 : s.retrievedSchema) ? this.state.retrievedSchema : r;
  }
  /** Returns the registry for the form */
  getRegistry() {
    var u;
    const { translateString: r, uiSchema: n = {} } = this.props, { schemaUtils: s } = this.state, { fields: a, templates: i, widgets: o, formContext: c, translateString: d } = jD();
    return {
      fields: { ...a, ...this.props.fields },
      templates: {
        ...i,
        ...this.props.templates,
        ButtonTemplates: {
          ...i.ButtonTemplates,
          ...(u = this.props.templates) == null ? void 0 : u.ButtonTemplates
        }
      },
      widgets: { ...o, ...this.props.widgets },
      rootSchema: this.props.schema,
      formContext: this.props.formContext || c,
      schemaUtils: s,
      translateString: r || d,
      globalUiOptions: n[Sy]
    };
  }
  /** Attempts to focus on the field associated with the `error`. Uses the `property` field to compute path of the error
   * field, then, using the `idPrefix` and `idSeparator` converts that path into an id. Then the input element with that
   * id is attempted to be found using the `formElement` ref. If it is located, then it is focused.
   *
   * @param error - The error on which to focus
   */
  focusOnError(r) {
    const { idPrefix: n = "root", idSeparator: s = "_" } = this.props, { property: a } = r, i = Fh(a);
    i[0] === "" ? i[0] = n : i.unshift(n);
    const o = i.join(s);
    let c = this.formElement.current.elements[o];
    c || (c = this.formElement.current.querySelector(`input[id^="${o}"`)), c && c.length && (c = c[0]), c && c.focus();
  }
  /** Programmatically validate the form.  If `omitExtraData` is true, the `formData` will first be filtered to remove
   * any extra data not in a form field. If `onError` is provided, then it will be called with the list of errors the
   * same way as would happen on form submission.
   *
   * @returns - True if the form is valid, false otherwise.
   */
  validateForm() {
    const { omitExtraData: r } = this.props;
    let { formData: n } = this.state;
    return r === !0 && (n = this.omitExtraData(n)), this.validateFormWithFormData(n);
  }
  /** Renders the `Form` fields inside the <form> | `tagName` or `_internalFormWrapper`, rendering any errors if
   * needed along with the submit button or any children of the form.
   */
  render() {
    const { children: r, id: n, idPrefix: s, idSeparator: a, className: i = "", tagName: o, name: c, method: d, target: u, action: f, autoComplete: h, enctype: m, acceptcharset: b, acceptCharset: $, noHtml5Validate: y = !1, disabled: p, readonly: g, formContext: v, showErrorList: _ = "top", _internalFormWrapper: w } = this.props, { schema: S, uiSchema: O, formData: D, errorSchema: N, idSchema: A } = this.state, R = this.getRegistry(), { SchemaField: L } = R.fields, { SubmitButton: W } = R.templates.ButtonTemplates, I = w ? o : void 0, P = w || o || "form";
    let { [Ts]: k = {} } = ae(O);
    p && (k = { ...k, props: { ...k.props, disabled: !0 } });
    const V = { [yn]: { [Ts]: k } };
    return l.jsxs(P, { className: i || "rjsf", id: n, name: c, method: d, target: u, action: f, autoComplete: h, encType: m, acceptCharset: $ || b, noValidate: y, onSubmit: this.onSubmit, as: I, ref: this.formElement, children: [_ === "top" && this.renderErrors(R), l.jsx(L, { name: "", schema: S, uiSchema: O, errorSchema: N, idSchema: A, idPrefix: s, idSeparator: a, formContext: v, formData: D, onChange: this.onChange, onBlur: this.onBlur, onFocus: this.onFocus, registry: R, disabled: p, readonly: g }), r || l.jsx(W, { uiSchema: V, registry: R }), _ === "bottom" && this.renderErrors(R)] });
  }
}
var zi = { exports: {} }, Gh = {}, it = {}, Rr = {}, es = {}, re = {}, Fn = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(g) {
      if (super(), !e.IDENTIFIER.test(g))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = g;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = r;
  class n extends t {
    constructor(g) {
      super(), this._items = typeof g == "string" ? [g] : g;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const g = this._items[0];
      return g === "" || g === '""';
    }
    get str() {
      var g;
      return (g = this._str) !== null && g !== void 0 ? g : this._str = this._items.reduce((v, _) => `${v}${_}`, "");
    }
    get names() {
      var g;
      return (g = this._names) !== null && g !== void 0 ? g : this._names = this._items.reduce((v, _) => (_ instanceof r && (v[_.str] = (v[_.str] || 0) + 1), v), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(p, ...g) {
    const v = [p[0]];
    let _ = 0;
    for (; _ < g.length; )
      o(v, g[_]), v.push(p[++_]);
    return new n(v);
  }
  e._ = s;
  const a = new n("+");
  function i(p, ...g) {
    const v = [m(p[0])];
    let _ = 0;
    for (; _ < g.length; )
      v.push(a), o(v, g[_]), v.push(a, m(p[++_]));
    return c(v), new n(v);
  }
  e.str = i;
  function o(p, g) {
    g instanceof n ? p.push(...g._items) : g instanceof r ? p.push(g) : p.push(f(g));
  }
  e.addCodeArg = o;
  function c(p) {
    let g = 1;
    for (; g < p.length - 1; ) {
      if (p[g] === a) {
        const v = d(p[g - 1], p[g + 1]);
        if (v !== void 0) {
          p.splice(g - 1, 3, v);
          continue;
        }
        p[g++] = "+";
      }
      g++;
    }
  }
  function d(p, g) {
    if (g === '""')
      return p;
    if (p === '""')
      return g;
    if (typeof p == "string")
      return g instanceof r || p[p.length - 1] !== '"' ? void 0 : typeof g != "string" ? `${p.slice(0, -1)}${g}"` : g[0] === '"' ? p.slice(0, -1) + g.slice(1) : void 0;
    if (typeof g == "string" && g[0] === '"' && !(p instanceof r))
      return `"${p}${g.slice(1)}`;
  }
  function u(p, g) {
    return g.emptyStr() ? p : p.emptyStr() ? g : i`${p}${g}`;
  }
  e.strConcat = u;
  function f(p) {
    return typeof p == "number" || typeof p == "boolean" || p === null ? p : m(Array.isArray(p) ? p.join(",") : p);
  }
  function h(p) {
    return new n(m(p));
  }
  e.stringify = h;
  function m(p) {
    return JSON.stringify(p).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = m;
  function b(p) {
    return typeof p == "string" && e.IDENTIFIER.test(p) ? new n(`.${p}`) : s`[${p}]`;
  }
  e.getProperty = b;
  function $(p) {
    if (typeof p == "string" && e.IDENTIFIER.test(p))
      return new n(`${p}`);
    throw new Error(`CodeGen: invalid export name: ${p}, use explicit $id name mapping`);
  }
  e.getEsmExportName = $;
  function y(p) {
    return new n(p.toString());
  }
  e.regexpCode = y;
})(Fn);
var qi = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Fn;
  class r extends Error {
    constructor(d) {
      super(`CodeGen: "code" for ${d} not defined`), this.value = d.value;
    }
  }
  var n;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class s {
    constructor({ prefixes: d, parent: u } = {}) {
      this._names = {}, this._prefixes = d, this._parent = u;
    }
    toName(d) {
      return d instanceof t.Name ? d : this.name(d);
    }
    name(d) {
      return new t.Name(this._newName(d));
    }
    _newName(d) {
      const u = this._names[d] || this._nameGroup(d);
      return `${d}${u.index++}`;
    }
    _nameGroup(d) {
      var u, f;
      if (!((f = (u = this._parent) === null || u === void 0 ? void 0 : u._prefixes) === null || f === void 0) && f.has(d) || this._prefixes && !this._prefixes.has(d))
        throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
      return this._names[d] = { prefix: d, index: 0 };
    }
  }
  e.Scope = s;
  class a extends t.Name {
    constructor(d, u) {
      super(u), this.prefix = d;
    }
    setValue(d, { property: u, itemIndex: f }) {
      this.value = d, this.scopePath = (0, t._)`.${new t.Name(u)}[${f}]`;
    }
  }
  e.ValueScopeName = a;
  const i = (0, t._)`\n`;
  class o extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? i : t.nil };
    }
    get() {
      return this._scope;
    }
    name(d) {
      return new a(d, this._newName(d));
    }
    value(d, u) {
      var f;
      if (u.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const h = this.toName(d), { prefix: m } = h, b = (f = u.key) !== null && f !== void 0 ? f : u.ref;
      let $ = this._values[m];
      if ($) {
        const g = $.get(b);
        if (g)
          return g;
      } else
        $ = this._values[m] = /* @__PURE__ */ new Map();
      $.set(b, h);
      const y = this._scope[m] || (this._scope[m] = []), p = y.length;
      return y[p] = u.ref, h.setValue(u, { property: m, itemIndex: p }), h;
    }
    getValue(d, u) {
      const f = this._values[d];
      if (f)
        return f.get(u);
    }
    scopeRefs(d, u = this._values) {
      return this._reduceValues(u, (f) => {
        if (f.scopePath === void 0)
          throw new Error(`CodeGen: name "${f}" has no value`);
        return (0, t._)`${d}${f.scopePath}`;
      });
    }
    scopeCode(d = this._values, u, f) {
      return this._reduceValues(d, (h) => {
        if (h.value === void 0)
          throw new Error(`CodeGen: name "${h}" has no value`);
        return h.value.code;
      }, u, f);
    }
    _reduceValues(d, u, f = {}, h) {
      let m = t.nil;
      for (const b in d) {
        const $ = d[b];
        if (!$)
          continue;
        const y = f[b] = f[b] || /* @__PURE__ */ new Map();
        $.forEach((p) => {
          if (y.has(p))
            return;
          y.set(p, n.Started);
          let g = u(p);
          if (g) {
            const v = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            m = (0, t._)`${m}${v} ${p} = ${g};${this.opts._n}`;
          } else if (g = h == null ? void 0 : h(p))
            m = (0, t._)`${m}${g}${this.opts._n}`;
          else
            throw new r(p);
          y.set(p, n.Completed);
        });
      }
      return m;
    }
  }
  e.ValueScope = o;
})(qi);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Fn, r = qi;
  var n = Fn;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var s = qi;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return s.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return s.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return s.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return s.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class a {
    optimizeNodes() {
      return this;
    }
    optimizeNames(x, j) {
      return this;
    }
  }
  class i extends a {
    constructor(x, j, T) {
      super(), this.varKind = x, this.name = j, this.rhs = T;
    }
    render({ es5: x, _n: j }) {
      const T = x ? r.varKinds.var : this.varKind, z = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${T} ${this.name}${z};` + j;
    }
    optimizeNames(x, j) {
      if (x[this.name.str])
        return this.rhs && (this.rhs = I(this.rhs, x, j)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class o extends a {
    constructor(x, j, T) {
      super(), this.lhs = x, this.rhs = j, this.sideEffects = T;
    }
    render({ _n: x }) {
      return `${this.lhs} = ${this.rhs};` + x;
    }
    optimizeNames(x, j) {
      if (!(this.lhs instanceof t.Name && !x[this.lhs.str] && !this.sideEffects))
        return this.rhs = I(this.rhs, x, j), this;
    }
    get names() {
      const x = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return W(x, this.rhs);
    }
  }
  class c extends o {
    constructor(x, j, T, z) {
      super(x, T, z), this.op = j;
    }
    render({ _n: x }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + x;
    }
  }
  class d extends a {
    constructor(x) {
      super(), this.label = x, this.names = {};
    }
    render({ _n: x }) {
      return `${this.label}:` + x;
    }
  }
  class u extends a {
    constructor(x) {
      super(), this.label = x, this.names = {};
    }
    render({ _n: x }) {
      return `break${this.label ? ` ${this.label}` : ""};` + x;
    }
  }
  class f extends a {
    constructor(x) {
      super(), this.error = x;
    }
    render({ _n: x }) {
      return `throw ${this.error};` + x;
    }
    get names() {
      return this.error.names;
    }
  }
  class h extends a {
    constructor(x) {
      super(), this.code = x;
    }
    render({ _n: x }) {
      return `${this.code};` + x;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(x, j) {
      return this.code = I(this.code, x, j), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class m extends a {
    constructor(x = []) {
      super(), this.nodes = x;
    }
    render(x) {
      return this.nodes.reduce((j, T) => j + T.render(x), "");
    }
    optimizeNodes() {
      const { nodes: x } = this;
      let j = x.length;
      for (; j--; ) {
        const T = x[j].optimizeNodes();
        Array.isArray(T) ? x.splice(j, 1, ...T) : T ? x[j] = T : x.splice(j, 1);
      }
      return x.length > 0 ? this : void 0;
    }
    optimizeNames(x, j) {
      const { nodes: T } = this;
      let z = T.length;
      for (; z--; ) {
        const K = T[z];
        K.optimizeNames(x, j) || (P(x, K.names), T.splice(z, 1));
      }
      return T.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((x, j) => L(x, j.names), {});
    }
  }
  class b extends m {
    render(x) {
      return "{" + x._n + super.render(x) + "}" + x._n;
    }
  }
  class $ extends m {
  }
  class y extends b {
  }
  y.kind = "else";
  class p extends b {
    constructor(x, j) {
      super(j), this.condition = x;
    }
    render(x) {
      let j = `if(${this.condition})` + super.render(x);
      return this.else && (j += "else " + this.else.render(x)), j;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const x = this.condition;
      if (x === !0)
        return this.nodes;
      let j = this.else;
      if (j) {
        const T = j.optimizeNodes();
        j = this.else = Array.isArray(T) ? new y(T) : T;
      }
      if (j)
        return x === !1 ? j instanceof p ? j : j.nodes : this.nodes.length ? this : new p(k(x), j instanceof p ? [j] : j.nodes);
      if (!(x === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(x, j) {
      var T;
      if (this.else = (T = this.else) === null || T === void 0 ? void 0 : T.optimizeNames(x, j), !!(super.optimizeNames(x, j) || this.else))
        return this.condition = I(this.condition, x, j), this;
    }
    get names() {
      const x = super.names;
      return W(x, this.condition), this.else && L(x, this.else.names), x;
    }
  }
  p.kind = "if";
  class g extends b {
  }
  g.kind = "for";
  class v extends g {
    constructor(x) {
      super(), this.iteration = x;
    }
    render(x) {
      return `for(${this.iteration})` + super.render(x);
    }
    optimizeNames(x, j) {
      if (super.optimizeNames(x, j))
        return this.iteration = I(this.iteration, x, j), this;
    }
    get names() {
      return L(super.names, this.iteration.names);
    }
  }
  class _ extends g {
    constructor(x, j, T, z) {
      super(), this.varKind = x, this.name = j, this.from = T, this.to = z;
    }
    render(x) {
      const j = x.es5 ? r.varKinds.var : this.varKind, { name: T, from: z, to: K } = this;
      return `for(${j} ${T}=${z}; ${T}<${K}; ${T}++)` + super.render(x);
    }
    get names() {
      const x = W(super.names, this.from);
      return W(x, this.to);
    }
  }
  class w extends g {
    constructor(x, j, T, z) {
      super(), this.loop = x, this.varKind = j, this.name = T, this.iterable = z;
    }
    render(x) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(x);
    }
    optimizeNames(x, j) {
      if (super.optimizeNames(x, j))
        return this.iterable = I(this.iterable, x, j), this;
    }
    get names() {
      return L(super.names, this.iterable.names);
    }
  }
  class S extends b {
    constructor(x, j, T) {
      super(), this.name = x, this.args = j, this.async = T;
    }
    render(x) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(x);
    }
  }
  S.kind = "func";
  class O extends m {
    render(x) {
      return "return " + super.render(x);
    }
  }
  O.kind = "return";
  class D extends b {
    render(x) {
      let j = "try" + super.render(x);
      return this.catch && (j += this.catch.render(x)), this.finally && (j += this.finally.render(x)), j;
    }
    optimizeNodes() {
      var x, j;
      return super.optimizeNodes(), (x = this.catch) === null || x === void 0 || x.optimizeNodes(), (j = this.finally) === null || j === void 0 || j.optimizeNodes(), this;
    }
    optimizeNames(x, j) {
      var T, z;
      return super.optimizeNames(x, j), (T = this.catch) === null || T === void 0 || T.optimizeNames(x, j), (z = this.finally) === null || z === void 0 || z.optimizeNames(x, j), this;
    }
    get names() {
      const x = super.names;
      return this.catch && L(x, this.catch.names), this.finally && L(x, this.finally.names), x;
    }
  }
  class N extends b {
    constructor(x) {
      super(), this.error = x;
    }
    render(x) {
      return `catch(${this.error})` + super.render(x);
    }
  }
  N.kind = "catch";
  class A extends b {
    render(x) {
      return "finally" + super.render(x);
    }
  }
  A.kind = "finally";
  class R {
    constructor(x, j = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...j, _n: j.lines ? `
` : "" }, this._extScope = x, this._scope = new r.Scope({ parent: x }), this._nodes = [new $()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(x) {
      return this._scope.name(x);
    }
    // reserves unique name in the external scope
    scopeName(x) {
      return this._extScope.name(x);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(x, j) {
      const T = this._extScope.value(x, j);
      return (this._values[T.prefix] || (this._values[T.prefix] = /* @__PURE__ */ new Set())).add(T), T;
    }
    getScopeValue(x, j) {
      return this._extScope.getValue(x, j);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(x) {
      return this._extScope.scopeRefs(x, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(x, j, T, z) {
      const K = this._scope.toName(j);
      return T !== void 0 && z && (this._constants[K.str] = T), this._leafNode(new i(x, K, T)), K;
    }
    // `const` declaration (`var` in es5 mode)
    const(x, j, T) {
      return this._def(r.varKinds.const, x, j, T);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(x, j, T) {
      return this._def(r.varKinds.let, x, j, T);
    }
    // `var` declaration with optional assignment
    var(x, j, T) {
      return this._def(r.varKinds.var, x, j, T);
    }
    // assignment code
    assign(x, j, T) {
      return this._leafNode(new o(x, j, T));
    }
    // `+=` code
    add(x, j) {
      return this._leafNode(new c(x, e.operators.ADD, j));
    }
    // appends passed SafeExpr to code or executes Block
    code(x) {
      return typeof x == "function" ? x() : x !== t.nil && this._leafNode(new h(x)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...x) {
      const j = ["{"];
      for (const [T, z] of x)
        j.length > 1 && j.push(","), j.push(T), (T !== z || this.opts.es5) && (j.push(":"), (0, t.addCodeArg)(j, z));
      return j.push("}"), new t._Code(j);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(x, j, T) {
      if (this._blockNode(new p(x)), j && T)
        this.code(j).else().code(T).endIf();
      else if (j)
        this.code(j).endIf();
      else if (T)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(x) {
      return this._elseNode(new p(x));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new y());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(p, y);
    }
    _for(x, j) {
      return this._blockNode(x), j && this.code(j).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(x, j) {
      return this._for(new v(x), j);
    }
    // `for` statement for a range of values
    forRange(x, j, T, z, K = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const ne = this._scope.toName(x);
      return this._for(new _(K, ne, j, T), () => z(ne));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(x, j, T, z = r.varKinds.const) {
      const K = this._scope.toName(x);
      if (this.opts.es5) {
        const ne = j instanceof t.Name ? j : this.var("_arr", j);
        return this.forRange("_i", 0, (0, t._)`${ne}.length`, (X) => {
          this.var(K, (0, t._)`${ne}[${X}]`), T(K);
        });
      }
      return this._for(new w("of", z, K, j), () => T(K));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(x, j, T, z = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(x, (0, t._)`Object.keys(${j})`, T);
      const K = this._scope.toName(x);
      return this._for(new w("in", z, K, j), () => T(K));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(g);
    }
    // `label` statement
    label(x) {
      return this._leafNode(new d(x));
    }
    // `break` statement
    break(x) {
      return this._leafNode(new u(x));
    }
    // `return` statement
    return(x) {
      const j = new O();
      if (this._blockNode(j), this.code(x), j.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(O);
    }
    // `try` statement
    try(x, j, T) {
      if (!j && !T)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const z = new D();
      if (this._blockNode(z), this.code(x), j) {
        const K = this.name("e");
        this._currNode = z.catch = new N(K), j(K);
      }
      return T && (this._currNode = z.finally = new A(), this.code(T)), this._endBlockNode(N, A);
    }
    // `throw` statement
    throw(x) {
      return this._leafNode(new f(x));
    }
    // start self-balancing block
    block(x, j) {
      return this._blockStarts.push(this._nodes.length), x && this.code(x).endBlock(j), this;
    }
    // end the current self-balancing block
    endBlock(x) {
      const j = this._blockStarts.pop();
      if (j === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const T = this._nodes.length - j;
      if (T < 0 || x !== void 0 && T !== x)
        throw new Error(`CodeGen: wrong number of nodes: ${T} vs ${x} expected`);
      return this._nodes.length = j, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(x, j = t.nil, T, z) {
      return this._blockNode(new S(x, j, T)), z && this.code(z).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(S);
    }
    optimize(x = 1) {
      for (; x-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(x) {
      return this._currNode.nodes.push(x), this;
    }
    _blockNode(x) {
      this._currNode.nodes.push(x), this._nodes.push(x);
    }
    _endBlockNode(x, j) {
      const T = this._currNode;
      if (T instanceof x || j && T instanceof j)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${j ? `${x.kind}/${j.kind}` : x.kind}"`);
    }
    _elseNode(x) {
      const j = this._currNode;
      if (!(j instanceof p))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = j.else = x, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const x = this._nodes;
      return x[x.length - 1];
    }
    set _currNode(x) {
      const j = this._nodes;
      j[j.length - 1] = x;
    }
  }
  e.CodeGen = R;
  function L(C, x) {
    for (const j in x)
      C[j] = (C[j] || 0) + (x[j] || 0);
    return C;
  }
  function W(C, x) {
    return x instanceof t._CodeOrName ? L(C, x.names) : C;
  }
  function I(C, x, j) {
    if (C instanceof t.Name)
      return T(C);
    if (!z(C))
      return C;
    return new t._Code(C._items.reduce((K, ne) => (ne instanceof t.Name && (ne = T(ne)), ne instanceof t._Code ? K.push(...ne._items) : K.push(ne), K), []));
    function T(K) {
      const ne = j[K.str];
      return ne === void 0 || x[K.str] !== 1 ? K : (delete x[K.str], ne);
    }
    function z(K) {
      return K instanceof t._Code && K._items.some((ne) => ne instanceof t.Name && x[ne.str] === 1 && j[ne.str] !== void 0);
    }
  }
  function P(C, x) {
    for (const j in x)
      C[j] = (C[j] || 0) - (x[j] || 0);
  }
  function k(C) {
    return typeof C == "boolean" || typeof C == "number" || C === null ? !C : (0, t._)`!${F(C)}`;
  }
  e.not = k;
  const V = E(e.operators.AND);
  function q(...C) {
    return C.reduce(V);
  }
  e.and = q;
  const Z = E(e.operators.OR);
  function M(...C) {
    return C.reduce(Z);
  }
  e.or = M;
  function E(C) {
    return (x, j) => x === t.nil ? j : j === t.nil ? x : (0, t._)`${F(x)} ${C} ${F(j)}`;
  }
  function F(C) {
    return C instanceof t.Name ? C : (0, t._)`(${C})`;
  }
})(re);
var B = {};
Object.defineProperty(B, "__esModule", { value: !0 });
B.checkStrictMode = B.getErrorPath = B.Type = B.useFunc = B.setEvaluated = B.evaluatedPropsToName = B.mergeEvaluated = B.eachItem = B.unescapeJsonPointer = B.escapeJsonPointer = B.escapeFragment = B.unescapeFragment = B.schemaRefOrVal = B.schemaHasRulesButRef = B.schemaHasRules = B.checkUnknownRules = B.alwaysValidSchema = B.toHash = void 0;
const pe = re, ND = Fn;
function ED(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
B.toHash = ED;
function OD(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Hh(e, t), !Jh(t, e.self.RULES.all));
}
B.alwaysValidSchema = OD;
function Hh(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || Xh(e, `unknown keyword: "${a}"`);
}
B.checkUnknownRules = Hh;
function Jh(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
B.schemaHasRules = Jh;
function CD(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
B.schemaHasRulesButRef = CD;
function AD({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, pe._)`${r}`;
  }
  return (0, pe._)`${e}${t}${(0, pe.getProperty)(n)}`;
}
B.schemaRefOrVal = AD;
function PD(e) {
  return Yh(decodeURIComponent(e));
}
B.unescapeFragment = PD;
function TD(e) {
  return encodeURIComponent(pl(e));
}
B.escapeFragment = TD;
function pl(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
B.escapeJsonPointer = pl;
function Yh(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
B.unescapeJsonPointer = Yh;
function ID(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
B.eachItem = ID;
function ju({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, i, o) => {
    const c = i === void 0 ? a : i instanceof pe.Name ? (a instanceof pe.Name ? e(s, a, i) : t(s, a, i), i) : a instanceof pe.Name ? (t(s, i, a), a) : r(a, i);
    return o === pe.Name && !(c instanceof pe.Name) ? n(s, c) : c;
  };
}
B.mergeEvaluated = {
  props: ju({
    mergeNames: (e, t, r) => e.if((0, pe._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, pe._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, pe._)`${r} || {}`).code((0, pe._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, pe._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, pe._)`${r} || {}`), hl(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Zh
  }),
  items: ju({
    mergeNames: (e, t, r) => e.if((0, pe._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, pe._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, pe._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, pe._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Zh(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, pe._)`{}`);
  return t !== void 0 && hl(e, r, t), r;
}
B.evaluatedPropsToName = Zh;
function hl(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, pe._)`${t}${(0, pe.getProperty)(n)}`, !0));
}
B.setEvaluated = hl;
const Su = {};
function kD(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: Su[t.code] || (Su[t.code] = new ND._Code(t.code))
  });
}
B.useFunc = kD;
var Ki;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Ki || (B.Type = Ki = {}));
function FD(e, t, r) {
  if (e instanceof pe.Name) {
    const n = t === Ki.Num;
    return r ? n ? (0, pe._)`"[" + ${e} + "]"` : (0, pe._)`"['" + ${e} + "']"` : n ? (0, pe._)`"/" + ${e}` : (0, pe._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, pe.getProperty)(e).toString() : "/" + pl(e);
}
B.getErrorPath = FD;
function Xh(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
B.checkStrictMode = Xh;
var $t = {};
Object.defineProperty($t, "__esModule", { value: !0 });
const Re = re, RD = {
  // validation function arguments
  data: new Re.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Re.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Re.Name("instancePath"),
  parentData: new Re.Name("parentData"),
  parentDataProperty: new Re.Name("parentDataProperty"),
  rootData: new Re.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Re.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Re.Name("vErrors"),
  // null or array of validation errors
  errors: new Re.Name("errors"),
  // counter of validation errors
  this: new Re.Name("this"),
  // "globals"
  self: new Re.Name("self"),
  scope: new Re.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Re.Name("json"),
  jsonPos: new Re.Name("jsonPos"),
  jsonLen: new Re.Name("jsonLen"),
  jsonPart: new Re.Name("jsonPart")
};
$t.default = RD;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = re, r = B, n = $t;
  e.keywordError = {
    message: ({ keyword: y }) => (0, t.str)`must pass "${y}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: y, schemaType: p }) => p ? (0, t.str)`"${y}" keyword must be ${p} ($data)` : (0, t.str)`"${y}" keyword is invalid ($data)`
  };
  function s(y, p = e.keywordError, g, v) {
    const { it: _ } = y, { gen: w, compositeRule: S, allErrors: O } = _, D = f(y, p, g);
    v ?? (S || O) ? c(w, D) : d(_, (0, t._)`[${D}]`);
  }
  e.reportError = s;
  function a(y, p = e.keywordError, g) {
    const { it: v } = y, { gen: _, compositeRule: w, allErrors: S } = v, O = f(y, p, g);
    c(_, O), w || S || d(v, n.default.vErrors);
  }
  e.reportExtraError = a;
  function i(y, p) {
    y.assign(n.default.errors, p), y.if((0, t._)`${n.default.vErrors} !== null`, () => y.if(p, () => y.assign((0, t._)`${n.default.vErrors}.length`, p), () => y.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = i;
  function o({ gen: y, keyword: p, schemaValue: g, data: v, errsCount: _, it: w }) {
    if (_ === void 0)
      throw new Error("ajv implementation error");
    const S = y.name("err");
    y.forRange("i", _, n.default.errors, (O) => {
      y.const(S, (0, t._)`${n.default.vErrors}[${O}]`), y.if((0, t._)`${S}.instancePath === undefined`, () => y.assign((0, t._)`${S}.instancePath`, (0, t.strConcat)(n.default.instancePath, w.errorPath))), y.assign((0, t._)`${S}.schemaPath`, (0, t.str)`${w.errSchemaPath}/${p}`), w.opts.verbose && (y.assign((0, t._)`${S}.schema`, g), y.assign((0, t._)`${S}.data`, v));
    });
  }
  e.extendErrors = o;
  function c(y, p) {
    const g = y.const("err", p);
    y.if((0, t._)`${n.default.vErrors} === null`, () => y.assign(n.default.vErrors, (0, t._)`[${g}]`), (0, t._)`${n.default.vErrors}.push(${g})`), y.code((0, t._)`${n.default.errors}++`);
  }
  function d(y, p) {
    const { gen: g, validateName: v, schemaEnv: _ } = y;
    _.$async ? g.throw((0, t._)`new ${y.ValidationError}(${p})`) : (g.assign((0, t._)`${v}.errors`, p), g.return(!1));
  }
  const u = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function f(y, p, g) {
    const { createErrors: v } = y.it;
    return v === !1 ? (0, t._)`{}` : h(y, p, g);
  }
  function h(y, p, g = {}) {
    const { gen: v, it: _ } = y, w = [
      m(_, g),
      b(y, g)
    ];
    return $(y, p, w), v.object(...w);
  }
  function m({ errorPath: y }, { instancePath: p }) {
    const g = p ? (0, t.str)`${y}${(0, r.getErrorPath)(p, r.Type.Str)}` : y;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, g)];
  }
  function b({ keyword: y, it: { errSchemaPath: p } }, { schemaPath: g, parentSchema: v }) {
    let _ = v ? p : (0, t.str)`${p}/${y}`;
    return g && (_ = (0, t.str)`${_}${(0, r.getErrorPath)(g, r.Type.Str)}`), [u.schemaPath, _];
  }
  function $(y, { params: p, message: g }, v) {
    const { keyword: _, data: w, schemaValue: S, it: O } = y, { opts: D, propertyName: N, topSchemaRef: A, schemaPath: R } = O;
    v.push([u.keyword, _], [u.params, typeof p == "function" ? p(y) : p || (0, t._)`{}`]), D.messages && v.push([u.message, typeof g == "function" ? g(y) : g]), D.verbose && v.push([u.schema, S], [u.parentSchema, (0, t._)`${A}${R}`], [n.default.data, w]), N && v.push([u.propertyName, N]);
  }
})(es);
Object.defineProperty(Rr, "__esModule", { value: !0 });
Rr.boolOrEmptySchema = Rr.topBoolOrEmptySchema = void 0;
const DD = es, MD = re, LD = $t, UD = {
  message: "boolean schema is false"
};
function WD(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? Qh(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(LD.default.data) : (t.assign((0, MD._)`${n}.errors`, null), t.return(!0));
}
Rr.topBoolOrEmptySchema = WD;
function VD(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), Qh(e)) : r.var(t, !0);
}
Rr.boolOrEmptySchema = VD;
function Qh(e, t) {
  const { gen: r, data: n } = e, s = {
    gen: r,
    keyword: "false schema",
    data: n,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, DD.reportError)(s, UD, void 0, t);
}
var Oe = {}, ar = {};
Object.defineProperty(ar, "__esModule", { value: !0 });
ar.getRules = ar.isJSONType = void 0;
const BD = ["string", "number", "integer", "boolean", "null", "object", "array"], zD = new Set(BD);
function qD(e) {
  return typeof e == "string" && zD.has(e);
}
ar.isJSONType = qD;
function KD() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
ar.getRules = KD;
var Nt = {};
Object.defineProperty(Nt, "__esModule", { value: !0 });
Nt.shouldUseRule = Nt.shouldUseGroup = Nt.schemaHasRulesForType = void 0;
function GD({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && em(e, n);
}
Nt.schemaHasRulesForType = GD;
function em(e, t) {
  return t.rules.some((r) => tm(e, r));
}
Nt.shouldUseGroup = em;
function tm(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
Nt.shouldUseRule = tm;
Object.defineProperty(Oe, "__esModule", { value: !0 });
Oe.reportTypeError = Oe.checkDataTypes = Oe.checkDataType = Oe.coerceAndCheckDataType = Oe.getJSONTypes = Oe.getSchemaTypes = Oe.DataType = void 0;
const HD = ar, JD = Nt, YD = es, ee = re, rm = B;
var Sr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(Sr || (Oe.DataType = Sr = {}));
function ZD(e) {
  const t = nm(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
Oe.getSchemaTypes = ZD;
function nm(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(HD.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
Oe.getJSONTypes = nm;
function XD(e, t) {
  const { gen: r, data: n, opts: s } = e, a = QD(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, JD.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const o = ml(t, n, s.strictNumbers, Sr.Wrong);
    r.if(o, () => {
      a.length ? eM(e, t, a) : gl(e);
    });
  }
  return i;
}
Oe.coerceAndCheckDataType = XD;
const sm = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function QD(e, t) {
  return t ? e.filter((r) => sm.has(r) || t === "array" && r === "array") : [];
}
function eM(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, ee._)`typeof ${s}`), o = n.let("coerced", (0, ee._)`undefined`);
  a.coerceTypes === "array" && n.if((0, ee._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, ee._)`${s}[0]`).assign(i, (0, ee._)`typeof ${s}`).if(ml(t, s, a.strictNumbers), () => n.assign(o, s))), n.if((0, ee._)`${o} !== undefined`);
  for (const d of r)
    (sm.has(d) || d === "array" && a.coerceTypes === "array") && c(d);
  n.else(), gl(e), n.endIf(), n.if((0, ee._)`${o} !== undefined`, () => {
    n.assign(s, o), tM(e, o);
  });
  function c(d) {
    switch (d) {
      case "string":
        n.elseIf((0, ee._)`${i} == "number" || ${i} == "boolean"`).assign(o, (0, ee._)`"" + ${s}`).elseIf((0, ee._)`${s} === null`).assign(o, (0, ee._)`""`);
        return;
      case "number":
        n.elseIf((0, ee._)`${i} == "boolean" || ${s} === null
              || (${i} == "string" && ${s} && ${s} == +${s})`).assign(o, (0, ee._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, ee._)`${i} === "boolean" || ${s} === null
              || (${i} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(o, (0, ee._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, ee._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(o, !1).elseIf((0, ee._)`${s} === "true" || ${s} === 1`).assign(o, !0);
        return;
      case "null":
        n.elseIf((0, ee._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(o, null);
        return;
      case "array":
        n.elseIf((0, ee._)`${i} === "string" || ${i} === "number"
              || ${i} === "boolean" || ${s} === null`).assign(o, (0, ee._)`[${s}]`);
    }
  }
}
function tM({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, ee._)`${t} !== undefined`, () => e.assign((0, ee._)`${t}[${r}]`, n));
}
function Gi(e, t, r, n = Sr.Correct) {
  const s = n === Sr.Correct ? ee.operators.EQ : ee.operators.NEQ;
  let a;
  switch (e) {
    case "null":
      return (0, ee._)`${t} ${s} null`;
    case "array":
      a = (0, ee._)`Array.isArray(${t})`;
      break;
    case "object":
      a = (0, ee._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      a = i((0, ee._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = i();
      break;
    default:
      return (0, ee._)`typeof ${t} ${s} ${e}`;
  }
  return n === Sr.Correct ? a : (0, ee.not)(a);
  function i(o = ee.nil) {
    return (0, ee.and)((0, ee._)`typeof ${t} == "number"`, o, r ? (0, ee._)`isFinite(${t})` : ee.nil);
  }
}
Oe.checkDataType = Gi;
function ml(e, t, r, n) {
  if (e.length === 1)
    return Gi(e[0], t, r, n);
  let s;
  const a = (0, rm.toHash)(e);
  if (a.array && a.object) {
    const i = (0, ee._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, ee._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = ee.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, ee.and)(s, Gi(i, t, r, n));
  return s;
}
Oe.checkDataTypes = ml;
const rM = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, ee._)`{type: ${e}}` : (0, ee._)`{type: ${t}}`
};
function gl(e) {
  const t = nM(e);
  (0, YD.reportError)(t, rM);
}
Oe.reportTypeError = gl;
function nM(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, rm.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: s,
    schemaValue: s,
    parentSchema: n,
    params: {},
    it: e
  };
}
var Ua = {};
Object.defineProperty(Ua, "__esModule", { value: !0 });
Ua.assignDefaults = void 0;
const vr = re, sM = B;
function aM(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      Nu(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => Nu(e, a, s.default));
}
Ua.assignDefaults = aM;
function Nu(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: i } = e;
  if (r === void 0)
    return;
  const o = (0, vr._)`${a}${(0, vr.getProperty)(t)}`;
  if (s) {
    (0, sM.checkStrictMode)(e, `default is ignored for: ${o}`);
    return;
  }
  let c = (0, vr._)`${o} === undefined`;
  i.useDefaults === "empty" && (c = (0, vr._)`${c} || ${o} === null || ${o} === ""`), n.if(c, (0, vr._)`${o} = ${(0, vr.stringify)(r)}`);
}
var pt = {}, se = {};
Object.defineProperty(se, "__esModule", { value: !0 });
se.validateUnion = se.validateArray = se.usePattern = se.callValidateCode = se.schemaProperties = se.allSchemaProperties = se.noPropertyInData = se.propertyInData = se.isOwnProperty = se.hasPropFunc = se.reportMissingProp = se.checkMissingProp = se.checkReportMissingProp = void 0;
const _e = re, yl = B, Mt = $t, iM = B;
function oM(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(vl(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, _e._)`${t}` }, !0), e.error();
  });
}
se.checkReportMissingProp = oM;
function lM({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, _e.or)(...n.map((a) => (0, _e.and)(vl(e, t, a, r.ownProperties), (0, _e._)`${s} = ${a}`)));
}
se.checkMissingProp = lM;
function cM(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
se.reportMissingProp = cM;
function am(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, _e._)`Object.prototype.hasOwnProperty`
  });
}
se.hasPropFunc = am;
function bl(e, t, r) {
  return (0, _e._)`${am(e)}.call(${t}, ${r})`;
}
se.isOwnProperty = bl;
function dM(e, t, r, n) {
  const s = (0, _e._)`${t}${(0, _e.getProperty)(r)} !== undefined`;
  return n ? (0, _e._)`${s} && ${bl(e, t, r)}` : s;
}
se.propertyInData = dM;
function vl(e, t, r, n) {
  const s = (0, _e._)`${t}${(0, _e.getProperty)(r)} === undefined`;
  return n ? (0, _e.or)(s, (0, _e.not)(bl(e, t, r))) : s;
}
se.noPropertyInData = vl;
function im(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
se.allSchemaProperties = im;
function uM(e, t) {
  return im(t).filter((r) => !(0, yl.alwaysValidSchema)(e, t[r]));
}
se.schemaProperties = uM;
function fM({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: i }, o, c, d) {
  const u = d ? (0, _e._)`${e}, ${t}, ${n}${s}` : t, f = [
    [Mt.default.instancePath, (0, _e.strConcat)(Mt.default.instancePath, a)],
    [Mt.default.parentData, i.parentData],
    [Mt.default.parentDataProperty, i.parentDataProperty],
    [Mt.default.rootData, Mt.default.rootData]
  ];
  i.opts.dynamicRef && f.push([Mt.default.dynamicAnchors, Mt.default.dynamicAnchors]);
  const h = (0, _e._)`${u}, ${r.object(...f)}`;
  return c !== _e.nil ? (0, _e._)`${o}.call(${c}, ${h})` : (0, _e._)`${o}(${h})`;
}
se.callValidateCode = fM;
const pM = (0, _e._)`new RegExp`;
function hM({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, _e._)`${s.code === "new RegExp" ? pM : (0, iM.useFunc)(e, s)}(${r}, ${n})`
  });
}
se.usePattern = hM;
function mM(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const o = t.let("valid", !0);
    return i(() => t.assign(o, !1)), o;
  }
  return t.var(a, !0), i(() => t.break()), a;
  function i(o) {
    const c = t.const("len", (0, _e._)`${r}.length`);
    t.forRange("i", 0, c, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: yl.Type.Num
      }, a), t.if((0, _e.not)(a), o);
    });
  }
}
se.validateArray = mM;
function gM(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, yl.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const i = t.let("valid", !1), o = t.name("_valid");
  t.block(() => r.forEach((c, d) => {
    const u = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, o);
    t.assign(i, (0, _e._)`${i} || ${o}`), e.mergeValidEvaluated(u, o) || t.if((0, _e.not)(i));
  })), e.result(i, () => e.reset(), () => e.error(!0));
}
se.validateUnion = gM;
Object.defineProperty(pt, "__esModule", { value: !0 });
pt.validateKeywordUsage = pt.validSchemaType = pt.funcKeywordCode = pt.macroKeywordCode = void 0;
const Ue = re, Qt = $t, yM = se, bM = es;
function vM(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: i } = e, o = t.macro.call(i.self, s, a, i), c = om(r, n, o);
  i.opts.validateSchema !== !1 && i.self.validateSchema(o, !0);
  const d = r.name("valid");
  e.subschema({
    schema: o,
    schemaPath: Ue.nil,
    errSchemaPath: `${i.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, d), e.pass(d, () => e.error(!0));
}
pt.macroKeywordCode = vM;
function $M(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: i, $data: o, it: c } = e;
  wM(c, t);
  const d = !o && t.compile ? t.compile.call(c.self, a, i, c) : t.validate, u = om(n, s, d), f = n.let("valid");
  e.block$data(f, h), e.ok((r = t.valid) !== null && r !== void 0 ? r : f);
  function h() {
    if (t.errors === !1)
      $(), t.modifying && Eu(e), y(() => e.error());
    else {
      const p = t.async ? m() : b();
      t.modifying && Eu(e), y(() => xM(e, p));
    }
  }
  function m() {
    const p = n.let("ruleErrs", null);
    return n.try(() => $((0, Ue._)`await `), (g) => n.assign(f, !1).if((0, Ue._)`${g} instanceof ${c.ValidationError}`, () => n.assign(p, (0, Ue._)`${g}.errors`), () => n.throw(g))), p;
  }
  function b() {
    const p = (0, Ue._)`${u}.errors`;
    return n.assign(p, null), $(Ue.nil), p;
  }
  function $(p = t.async ? (0, Ue._)`await ` : Ue.nil) {
    const g = c.opts.passContext ? Qt.default.this : Qt.default.self, v = !("compile" in t && !o || t.schema === !1);
    n.assign(f, (0, Ue._)`${p}${(0, yM.callValidateCode)(e, u, g, v)}`, t.modifying);
  }
  function y(p) {
    var g;
    n.if((0, Ue.not)((g = t.valid) !== null && g !== void 0 ? g : f), p);
  }
}
pt.funcKeywordCode = $M;
function Eu(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Ue._)`${n.parentData}[${n.parentDataProperty}]`));
}
function xM(e, t) {
  const { gen: r } = e;
  r.if((0, Ue._)`Array.isArray(${t})`, () => {
    r.assign(Qt.default.vErrors, (0, Ue._)`${Qt.default.vErrors} === null ? ${t} : ${Qt.default.vErrors}.concat(${t})`).assign(Qt.default.errors, (0, Ue._)`${Qt.default.vErrors}.length`), (0, bM.extendErrors)(e);
  }, () => e.error());
}
function wM({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function om(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Ue.stringify)(r) });
}
function _M(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
pt.validSchemaType = _M;
function jM({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(a) : s.keyword !== a)
    throw new Error("ajv implementation error");
  const i = s.dependencies;
  if (i != null && i.some((o) => !Object.prototype.hasOwnProperty.call(e, o)))
    throw new Error(`parent schema must have dependencies of ${a}: ${i.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[a])) {
    const c = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
pt.validateKeywordUsage = jM;
var Kt = {};
Object.defineProperty(Kt, "__esModule", { value: !0 });
Kt.extendSubschemaMode = Kt.extendSubschemaData = Kt.getSubschema = void 0;
const ut = re, lm = B;
function SM(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: i }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const o = e.schema[t];
    return r === void 0 ? {
      schema: o,
      schemaPath: (0, ut._)`${e.schemaPath}${(0, ut.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: o[r],
      schemaPath: (0, ut._)`${e.schemaPath}${(0, ut.getProperty)(t)}${(0, ut.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, lm.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (s === void 0 || a === void 0 || i === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: s,
      topSchemaRef: i,
      errSchemaPath: a
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
Kt.getSubschema = SM;
function NM(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: i }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: o } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: u, opts: f } = t, h = o.let("data", (0, ut._)`${t.data}${(0, ut.getProperty)(r)}`, !0);
    c(h), e.errorPath = (0, ut.str)`${d}${(0, lm.getErrorPath)(r, n, f.jsPropertySyntax)}`, e.parentDataProperty = (0, ut._)`${r}`, e.dataPathArr = [...u, e.parentDataProperty];
  }
  if (s !== void 0) {
    const d = s instanceof ut.Name ? s : o.let("data", s, !0);
    c(d), i !== void 0 && (e.propertyName = i);
  }
  a && (e.dataTypes = a);
  function c(d) {
    e.data = d, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, d];
  }
}
Kt.extendSubschemaData = NM;
function EM(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Kt.extendSubschemaMode = EM;
var ke = {}, cm = function e(t, r) {
  if (t === r) return !0;
  if (t && r && typeof t == "object" && typeof r == "object") {
    if (t.constructor !== r.constructor) return !1;
    var n, s, a;
    if (Array.isArray(t)) {
      if (n = t.length, n != r.length) return !1;
      for (s = n; s-- !== 0; )
        if (!e(t[s], r[s])) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === r.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === r.toString();
    if (a = Object.keys(t), n = a.length, n !== Object.keys(r).length) return !1;
    for (s = n; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, a[s])) return !1;
    for (s = n; s-- !== 0; ) {
      var i = a[s];
      if (!e(t[i], r[i])) return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
}, dm = { exports: {} }, Vt = dm.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  Ns(t, n, s, e, "", e);
};
Vt.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
Vt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Vt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Vt.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function Ns(e, t, r, n, s, a, i, o, c, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, i, o, c, d);
    for (var u in n) {
      var f = n[u];
      if (Array.isArray(f)) {
        if (u in Vt.arrayKeywords)
          for (var h = 0; h < f.length; h++)
            Ns(e, t, r, f[h], s + "/" + u + "/" + h, a, s, u, n, h);
      } else if (u in Vt.propsKeywords) {
        if (f && typeof f == "object")
          for (var m in f)
            Ns(e, t, r, f[m], s + "/" + u + "/" + OM(m), a, s, u, n, m);
      } else (u in Vt.keywords || e.allKeys && !(u in Vt.skipKeywords)) && Ns(e, t, r, f, s + "/" + u, a, s, u, n);
    }
    r(n, s, a, i, o, c, d);
  }
}
function OM(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var CM = dm.exports;
Object.defineProperty(ke, "__esModule", { value: !0 });
ke.getSchemaRefs = ke.resolveUrl = ke.normalizeId = ke._getFullPath = ke.getFullPath = ke.inlineRef = void 0;
const AM = B, PM = cm, TM = CM, IM = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function kM(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Hi(e) : t ? um(e) <= t : !1;
}
ke.inlineRef = kM;
const FM = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Hi(e) {
  for (const t in e) {
    if (FM.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Hi) || typeof r == "object" && Hi(r))
      return !0;
  }
  return !1;
}
function um(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !IM.has(r) && (typeof e[r] == "object" && (0, AM.eachItem)(e[r], (n) => t += um(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function fm(e, t = "", r) {
  r !== !1 && (t = Nr(t));
  const n = e.parse(t);
  return pm(e, n);
}
ke.getFullPath = fm;
function pm(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
ke._getFullPath = pm;
const RM = /#\/?$/;
function Nr(e) {
  return e ? e.replace(RM, "") : "";
}
ke.normalizeId = Nr;
function DM(e, t, r) {
  return r = Nr(r), e.resolve(t, r);
}
ke.resolveUrl = DM;
const MM = /^[a-z_][-a-z0-9._]*$/i;
function LM(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = Nr(e[r] || t), a = { "": s }, i = fm(n, s, !1), o = {}, c = /* @__PURE__ */ new Set();
  return TM(e, { allKeys: !0 }, (f, h, m, b) => {
    if (b === void 0)
      return;
    const $ = i + h;
    let y = a[b];
    typeof f[r] == "string" && (y = p.call(this, f[r])), g.call(this, f.$anchor), g.call(this, f.$dynamicAnchor), a[h] = y;
    function p(v) {
      const _ = this.opts.uriResolver.resolve;
      if (v = Nr(y ? _(y, v) : v), c.has(v))
        throw u(v);
      c.add(v);
      let w = this.refs[v];
      return typeof w == "string" && (w = this.refs[w]), typeof w == "object" ? d(f, w.schema, v) : v !== Nr($) && (v[0] === "#" ? (d(f, o[v], v), o[v] = f) : this.refs[v] = $), v;
    }
    function g(v) {
      if (typeof v == "string") {
        if (!MM.test(v))
          throw new Error(`invalid anchor "${v}"`);
        p.call(this, `#${v}`);
      }
    }
  }), o;
  function d(f, h, m) {
    if (h !== void 0 && !PM(f, h))
      throw u(m);
  }
  function u(f) {
    return new Error(`reference "${f}" resolves to more than one schema`);
  }
}
ke.getSchemaRefs = LM;
Object.defineProperty(it, "__esModule", { value: !0 });
it.getData = it.KeywordCxt = it.validateFunctionCode = void 0;
const hm = Rr, Ou = Oe, $l = Nt, qs = Oe, UM = Ua, wn = pt, yi = Kt, H = re, Q = $t, WM = ke, Et = B, un = es;
function VM(e) {
  if (ym(e) && (bm(e), gm(e))) {
    qM(e);
    return;
  }
  mm(e, () => (0, hm.topBoolOrEmptySchema)(e));
}
it.validateFunctionCode = VM;
function mm({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, H._)`${Q.default.data}, ${Q.default.valCxt}`, n.$async, () => {
    e.code((0, H._)`"use strict"; ${Cu(r, s)}`), zM(e, s), e.code(a);
  }) : e.func(t, (0, H._)`${Q.default.data}, ${BM(s)}`, n.$async, () => e.code(Cu(r, s)).code(a));
}
function BM(e) {
  return (0, H._)`{${Q.default.instancePath}="", ${Q.default.parentData}, ${Q.default.parentDataProperty}, ${Q.default.rootData}=${Q.default.data}${e.dynamicRef ? (0, H._)`, ${Q.default.dynamicAnchors}={}` : H.nil}}={}`;
}
function zM(e, t) {
  e.if(Q.default.valCxt, () => {
    e.var(Q.default.instancePath, (0, H._)`${Q.default.valCxt}.${Q.default.instancePath}`), e.var(Q.default.parentData, (0, H._)`${Q.default.valCxt}.${Q.default.parentData}`), e.var(Q.default.parentDataProperty, (0, H._)`${Q.default.valCxt}.${Q.default.parentDataProperty}`), e.var(Q.default.rootData, (0, H._)`${Q.default.valCxt}.${Q.default.rootData}`), t.dynamicRef && e.var(Q.default.dynamicAnchors, (0, H._)`${Q.default.valCxt}.${Q.default.dynamicAnchors}`);
  }, () => {
    e.var(Q.default.instancePath, (0, H._)`""`), e.var(Q.default.parentData, (0, H._)`undefined`), e.var(Q.default.parentDataProperty, (0, H._)`undefined`), e.var(Q.default.rootData, Q.default.data), t.dynamicRef && e.var(Q.default.dynamicAnchors, (0, H._)`{}`);
  });
}
function qM(e) {
  const { schema: t, opts: r, gen: n } = e;
  mm(e, () => {
    r.$comment && t.$comment && $m(e), YM(e), n.let(Q.default.vErrors, null), n.let(Q.default.errors, 0), r.unevaluated && KM(e), vm(e), QM(e);
  });
}
function KM(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, H._)`${r}.evaluated`), t.if((0, H._)`${e.evaluated}.dynamicProps`, () => t.assign((0, H._)`${e.evaluated}.props`, (0, H._)`undefined`)), t.if((0, H._)`${e.evaluated}.dynamicItems`, () => t.assign((0, H._)`${e.evaluated}.items`, (0, H._)`undefined`));
}
function Cu(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, H._)`/*# sourceURL=${r} */` : H.nil;
}
function GM(e, t) {
  if (ym(e) && (bm(e), gm(e))) {
    HM(e, t);
    return;
  }
  (0, hm.boolOrEmptySchema)(e, t);
}
function gm({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function ym(e) {
  return typeof e.schema != "boolean";
}
function HM(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && $m(e), ZM(e), XM(e);
  const a = n.const("_errs", Q.default.errors);
  vm(e, a), n.var(t, (0, H._)`${a} === ${Q.default.errors}`);
}
function bm(e) {
  (0, Et.checkUnknownRules)(e), JM(e);
}
function vm(e, t) {
  if (e.opts.jtd)
    return Au(e, [], !1, t);
  const r = (0, Ou.getSchemaTypes)(e.schema), n = (0, Ou.coerceAndCheckDataType)(e, r);
  Au(e, r, !n, t);
}
function JM(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, Et.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function YM(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, Et.checkStrictMode)(e, "default is ignored in the schema root");
}
function ZM(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, WM.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function XM(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function $m({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, H._)`${Q.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const i = (0, H.str)`${n}/$comment`, o = e.scopeValue("root", { ref: t.root });
    e.code((0, H._)`${Q.default.self}.opts.$comment(${a}, ${i}, ${o}.schema)`);
  }
}
function QM(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, H._)`${Q.default.errors} === 0`, () => t.return(Q.default.data), () => t.throw((0, H._)`new ${s}(${Q.default.vErrors})`)) : (t.assign((0, H._)`${n}.errors`, Q.default.vErrors), a.unevaluated && eL(e), t.return((0, H._)`${Q.default.errors} === 0`));
}
function eL({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof H.Name && e.assign((0, H._)`${t}.props`, r), n instanceof H.Name && e.assign((0, H._)`${t}.items`, n);
}
function Au(e, t, r, n) {
  const { gen: s, schema: a, data: i, allErrors: o, opts: c, self: d } = e, { RULES: u } = d;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, Et.schemaHasRulesButRef)(a, u))) {
    s.block(() => _m(e, "$ref", u.all.$ref.definition));
    return;
  }
  c.jtd || tL(e, t), s.block(() => {
    for (const h of u.rules)
      f(h);
    f(u.post);
  });
  function f(h) {
    (0, $l.shouldUseGroup)(a, h) && (h.type ? (s.if((0, qs.checkDataType)(h.type, i, c.strictNumbers)), Pu(e, h), t.length === 1 && t[0] === h.type && r && (s.else(), (0, qs.reportTypeError)(e)), s.endIf()) : Pu(e, h), o || s.if((0, H._)`${Q.default.errors} === ${n || 0}`));
  }
}
function Pu(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, UM.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, $l.shouldUseRule)(n, a) && _m(e, a.keyword, a.definition, t.type);
  });
}
function tL(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (rL(e, t), e.opts.allowUnionTypes || nL(e, t), sL(e, e.dataTypes));
}
function rL(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      xm(e.dataTypes, r) || xl(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), iL(e, t);
  }
}
function nL(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && xl(e, "use allowUnionTypes to allow union type keyword");
}
function sL(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, $l.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((i) => aL(t, i)) && xl(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function aL(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function xm(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function iL(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    xm(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function xl(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, Et.checkStrictMode)(e, t, e.opts.strictTypes);
}
class wm {
  constructor(t, r, n) {
    if ((0, wn.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, Et.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", jm(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, wn.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", Q.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, H.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, H.not)(t), void 0, r);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: r } = this;
    this.fail((0, H._)`${r} !== undefined && (${(0, H.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? un.reportExtraError : un.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, un.reportError)(this, this.def.$dataError || un.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, un.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = H.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = H.nil, r = H.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: s, schemaType: a, def: i } = this;
    n.if((0, H.or)((0, H._)`${s} === undefined`, r)), t !== H.nil && n.assign(t, !0), (a.length || i.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== H.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: a } = this;
    return (0, H.or)(i(), o());
    function i() {
      if (n.length) {
        if (!(r instanceof H.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, H._)`${(0, qs.checkDataTypes)(c, r, a.opts.strictNumbers, qs.DataType.Wrong)}`;
      }
      return H.nil;
    }
    function o() {
      if (s.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, H._)`!${c}(${r})`;
      }
      return H.nil;
    }
  }
  subschema(t, r) {
    const n = (0, yi.getSubschema)(this.it, t);
    (0, yi.extendSubschemaData)(n, this.it, t), (0, yi.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return GM(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = Et.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = Et.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, H.Name)), !0;
  }
}
it.KeywordCxt = wm;
function _m(e, t, r, n) {
  const s = new wm(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, wn.funcKeywordCode)(s, r) : "macro" in r ? (0, wn.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, wn.funcKeywordCode)(s, r);
}
const oL = /^\/(?:[^~]|~0|~1)*$/, lL = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function jm(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return Q.default.rootData;
  if (e[0] === "/") {
    if (!oL.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = Q.default.rootData;
  } else {
    const d = lL.exec(e);
    if (!d)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const u = +d[1];
    if (s = d[2], s === "#") {
      if (u >= t)
        throw new Error(c("property/index", u));
      return n[t - u];
    }
    if (u > t)
      throw new Error(c("data", u));
    if (a = r[t - u], !s)
      return a;
  }
  let i = a;
  const o = s.split("/");
  for (const d of o)
    d && (a = (0, H._)`${a}${(0, H.getProperty)((0, Et.unescapeJsonPointer)(d))}`, i = (0, H._)`${i} && ${a}`);
  return i;
  function c(d, u) {
    return `Cannot access ${d} ${u} levels up, current level is ${t}`;
  }
}
it.getData = jm;
var ts = {};
Object.defineProperty(ts, "__esModule", { value: !0 });
class cL extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
ts.default = cL;
var Qr = {};
Object.defineProperty(Qr, "__esModule", { value: !0 });
const bi = ke;
class dL extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, bi.resolveUrl)(t, r, n), this.missingSchema = (0, bi.normalizeId)((0, bi.getFullPath)(t, this.missingRef));
  }
}
Qr.default = dL;
var Be = {};
Object.defineProperty(Be, "__esModule", { value: !0 });
Be.resolveSchema = Be.getCompilingSchema = Be.resolveRef = Be.compileSchema = Be.SchemaEnv = void 0;
const et = re, uL = ts, Jt = $t, rt = ke, Tu = B, fL = it;
class Wa {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, rt.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Be.SchemaEnv = Wa;
function wl(e) {
  const t = Sm.call(this, e);
  if (t)
    return t;
  const r = (0, rt.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new et.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let o;
  e.$async && (o = i.scopeValue("Error", {
    ref: uL.default,
    code: (0, et._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = i.scopeName("validate");
  e.validateName = c;
  const d = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: Jt.default.data,
    parentData: Jt.default.parentData,
    parentDataProperty: Jt.default.parentDataProperty,
    dataNames: [Jt.default.data],
    dataPathArr: [et.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: i.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, et.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: o,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: et.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, et._)`""`,
    opts: this.opts,
    self: this
  };
  let u;
  try {
    this._compilations.add(e), (0, fL.validateFunctionCode)(d), i.optimize(this.opts.code.optimize);
    const f = i.toString();
    u = `${i.scopeRefs(Jt.default.scope)}return ${f}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const m = new Function(`${Jt.default.self}`, `${Jt.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(c, { ref: m }), m.errors = null, m.schema = e.schema, m.schemaEnv = e, e.$async && (m.$async = !0), this.opts.code.source === !0 && (m.source = { validateName: c, validateCode: f, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: b, items: $ } = d;
      m.evaluated = {
        props: b instanceof et.Name ? void 0 : b,
        items: $ instanceof et.Name ? void 0 : $,
        dynamicProps: b instanceof et.Name,
        dynamicItems: $ instanceof et.Name
      }, m.source && (m.source.evaluated = (0, et.stringify)(m.evaluated));
    }
    return e.validate = m, e;
  } catch (f) {
    throw delete e.validate, delete e.validateName, u && this.logger.error("Error compiling schema, function code:", u), f;
  } finally {
    this._compilations.delete(e);
  }
}
Be.compileSchema = wl;
function pL(e, t, r) {
  var n;
  r = (0, rt.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = gL.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: o } = this.opts;
    i && (a = new Wa({ schema: i, schemaId: o, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = hL.call(this, a);
}
Be.resolveRef = pL;
function hL(e) {
  return (0, rt.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : wl.call(this, e);
}
function Sm(e) {
  for (const t of this._compilations)
    if (mL(t, e))
      return t;
}
Be.getCompilingSchema = Sm;
function mL(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function gL(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || Va.call(this, e, t);
}
function Va(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, rt._getFullPath)(this.opts.uriResolver, r);
  let s = (0, rt.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return vi.call(this, r, e);
  const a = (0, rt.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const o = Va.call(this, e, i);
    return typeof (o == null ? void 0 : o.schema) != "object" ? void 0 : vi.call(this, r, o);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || wl.call(this, i), a === (0, rt.normalizeId)(t)) {
      const { schema: o } = i, { schemaId: c } = this.opts, d = o[c];
      return d && (s = (0, rt.resolveUrl)(this.opts.uriResolver, s, d)), new Wa({ schema: o, schemaId: c, root: e, baseId: s });
    }
    return vi.call(this, r, i);
  }
}
Be.resolveSchema = Va;
const yL = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function vi(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const o of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, Tu.unescapeFragment)(o)];
    if (c === void 0)
      return;
    r = c;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !yL.has(o) && d && (t = (0, rt.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, Tu.schemaHasRulesButRef)(r, this.RULES)) {
    const o = (0, rt.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = Va.call(this, n, o);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new Wa({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const bL = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", vL = "Meta-schema for $data reference (JSON AnySchema extension proposal)", $L = "object", xL = [
  "$data"
], wL = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, _L = !1, jL = {
  $id: bL,
  description: vL,
  type: $L,
  required: xL,
  properties: wL,
  additionalProperties: _L
};
var _l = {}, Ba = { exports: {} };
const SL = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), Nm = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function Em(e) {
  let t = "", r = 0, n = 0;
  for (n = 0; n < e.length; n++)
    if (r = e[n].charCodeAt(0), r !== 48) {
      if (!(r >= 48 && r <= 57 || r >= 65 && r <= 70 || r >= 97 && r <= 102))
        return "";
      t += e[n];
      break;
    }
  for (n += 1; n < e.length; n++) {
    if (r = e[n].charCodeAt(0), !(r >= 48 && r <= 57 || r >= 65 && r <= 70 || r >= 97 && r <= 102))
      return "";
    t += e[n];
  }
  return t;
}
const NL = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function Iu(e) {
  return e.length = 0, !0;
}
function EL(e, t, r) {
  if (e.length) {
    const n = Em(e);
    if (n !== "")
      t.push(n);
    else
      return r.error = !0, !1;
    e.length = 0;
  }
  return !0;
}
function OL(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], s = [];
  let a = !1, i = !1, o = EL;
  for (let c = 0; c < e.length; c++) {
    const d = e[c];
    if (!(d === "[" || d === "]"))
      if (d === ":") {
        if (a === !0 && (i = !0), !o(s, n, r))
          break;
        if (++t > 7) {
          r.error = !0;
          break;
        }
        c > 0 && e[c - 1] === ":" && (a = !0), n.push(":");
        continue;
      } else if (d === "%") {
        if (!o(s, n, r))
          break;
        o = Iu;
      } else {
        s.push(d);
        continue;
      }
  }
  return s.length && (o === Iu ? r.zone = s.join("") : i ? n.push(s.join("")) : n.push(Em(s))), r.address = n.join(""), r;
}
function Om(e) {
  if (CL(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = OL(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, isIPV6: !0, escapedHost: n };
  }
}
function CL(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
function AL(e) {
  let t = e;
  const r = [];
  let n = -1, s = 0;
  for (; s = t.length; ) {
    if (s === 1) {
      if (t === ".")
        break;
      if (t === "/") {
        r.push("/");
        break;
      } else {
        r.push(t);
        break;
      }
    } else if (s === 2) {
      if (t[0] === ".") {
        if (t[1] === ".")
          break;
        if (t[1] === "/") {
          t = t.slice(2);
          continue;
        }
      } else if (t[0] === "/" && (t[1] === "." || t[1] === "/")) {
        r.push("/");
        break;
      }
    } else if (s === 3 && t === "/..") {
      r.length !== 0 && r.pop(), r.push("/");
      break;
    }
    if (t[0] === ".") {
      if (t[1] === ".") {
        if (t[2] === "/") {
          t = t.slice(3);
          continue;
        }
      } else if (t[1] === "/") {
        t = t.slice(2);
        continue;
      }
    } else if (t[0] === "/" && t[1] === ".") {
      if (t[2] === "/") {
        t = t.slice(2);
        continue;
      } else if (t[2] === "." && t[3] === "/") {
        t = t.slice(3), r.length !== 0 && r.pop();
        continue;
      }
    }
    if ((n = t.indexOf("/", 1)) === -1) {
      r.push(t);
      break;
    } else
      r.push(t.slice(0, n)), t = t.slice(n);
  }
  return r.join("");
}
function PL(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function TL(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    if (!Nm(r)) {
      const n = Om(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var Cm = {
  nonSimpleDomain: NL,
  recomposeAuthority: TL,
  normalizeComponentEncoding: PL,
  removeDotSegments: AL,
  isIPv4: Nm,
  isUUID: SL,
  normalizeIPv6: Om
};
const { isUUID: IL } = Cm, kL = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function Am(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function Pm(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function Tm(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function FL(e) {
  return e.secure = Am(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function RL(e) {
  if ((e.port === (Am(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function DL(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(kL);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const s = `${n}:${t.nid || e.nid}`, a = jl(s);
    e.path = void 0, a && (e = a.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function ML(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), s = `${r}:${t.nid || n}`, a = jl(s);
  a && (e = a.serialize(e, t));
  const i = e, o = e.nss;
  return i.path = `${n || t.nid}:${o}`, t.skipEscape = !0, i;
}
function LL(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !IL(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function UL(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const Im = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: Pm,
    serialize: Tm
  }
), WL = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: Im.domainHost,
    parse: Pm,
    serialize: Tm
  }
), Es = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: !0,
    parse: FL,
    serialize: RL
  }
), VL = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: Es.domainHost,
    parse: Es.parse,
    serialize: Es.serialize
  }
), BL = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: DL,
    serialize: ML,
    skipNormalize: !0
  }
), zL = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: LL,
    serialize: UL,
    skipNormalize: !0
  }
), Ks = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: Im,
    https: WL,
    ws: Es,
    wss: VL,
    urn: BL,
    "urn:uuid": zL
  }
);
Object.setPrototypeOf(Ks, null);
function jl(e) {
  return e && (Ks[
    /** @type {SchemeName} */
    e
  ] || Ks[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var qL = {
  SCHEMES: Ks,
  getSchemeHandler: jl
};
const { normalizeIPv6: KL, removeDotSegments: hn, recomposeAuthority: GL, normalizeComponentEncoding: us, isIPv4: HL, nonSimpleDomain: JL } = Cm, { SCHEMES: YL, getSchemeHandler: km } = qL;
function ZL(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  ht(Pt(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  Pt(ht(e, t), t)), e;
}
function XL(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, s = Fm(Pt(e, n), Pt(t, n), n, !0);
  return n.skipEscape = !0, ht(s, n);
}
function Fm(e, t, r, n) {
  const s = {};
  return n || (e = Pt(ht(e, r), r), t = Pt(ht(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = hn(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = hn(t.path || ""), s.query = t.query) : (t.path ? (t.path[0] === "/" ? s.path = hn(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = hn(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function QL(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = ht(us(Pt(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = ht(us(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = ht(us(Pt(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = ht(us(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function ht(e, t) {
  const r = {
    host: e.host,
    scheme: e.scheme,
    userinfo: e.userinfo,
    port: e.port,
    path: e.path,
    query: e.query,
    nid: e.nid,
    nss: e.nss,
    uuid: e.uuid,
    fragment: e.fragment,
    reference: e.reference,
    resourceName: e.resourceName,
    secure: e.secure,
    error: ""
  }, n = Object.assign({}, t), s = [], a = km(n.scheme || r.scheme);
  a && a.serialize && a.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && s.push(r.scheme, ":");
  const i = GL(r);
  if (i !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(i), r.path && r.path[0] !== "/" && s.push("/")), r.path !== void 0) {
    let o = r.path;
    !n.absolutePath && (!a || !a.absolutePath) && (o = hn(o)), i === void 0 && o[0] === "/" && o[1] === "/" && (o = "/%2F" + o.slice(2)), s.push(o);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const e6 = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function Pt(e, t) {
  const r = Object.assign({}, t), n = {
    scheme: void 0,
    userinfo: void 0,
    host: "",
    port: void 0,
    path: "",
    query: void 0,
    fragment: void 0
  };
  let s = !1;
  r.reference === "suffix" && (r.scheme ? e = r.scheme + ":" + e : e = "//" + e);
  const a = e.match(e6);
  if (a) {
    if (n.scheme = a[1], n.userinfo = a[3], n.host = a[4], n.port = parseInt(a[5], 10), n.path = a[6] || "", n.query = a[7], n.fragment = a[8], isNaN(n.port) && (n.port = a[5]), n.host)
      if (HL(n.host) === !1) {
        const c = KL(n.host);
        n.host = c.host.toLowerCase(), s = c.isIPV6;
      } else
        s = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const i = km(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!i || !i.unicodeSupport) && n.host && (r.domainHost || i && i.domainHost) && s === !1 && JL(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (o) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + o;
      }
    (!i || i && !i.skipNormalize) && (e.indexOf("%") !== -1 && (n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), n.host !== void 0 && (n.host = unescape(n.host))), n.path && (n.path = escape(unescape(n.path))), n.fragment && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), i && i.parse && i.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const Sl = {
  SCHEMES: YL,
  normalize: ZL,
  resolve: XL,
  resolveComponent: Fm,
  equal: QL,
  serialize: ht,
  parse: Pt
};
Ba.exports = Sl;
Ba.exports.default = Sl;
Ba.exports.fastUri = Sl;
var t6 = Ba.exports;
Object.defineProperty(_l, "__esModule", { value: !0 });
const Rm = t6;
Rm.code = 'require("ajv/dist/runtime/uri").default';
_l.default = Rm;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = it;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = re;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = ts, s = Qr, a = ar, i = Be, o = re, c = ke, d = Oe, u = B, f = jL, h = _l, m = (M, E) => new RegExp(M, E);
  m.code = "new RegExp";
  const b = ["removeAdditional", "useDefaults", "coerceTypes"], $ = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), y = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, p = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, g = 200;
  function v(M) {
    var E, F, C, x, j, T, z, K, ne, X, me, de, ge, Me, je, Fe, lt, Ft, Rt, rn, nn, J, Se, xt, yr;
    const Le = M.strict, sn = (E = M.code) === null || E === void 0 ? void 0 : E.optimize, wt = sn === !0 || sn === void 0 ? 1 : sn || 0, ac = (C = (F = M.code) === null || F === void 0 ? void 0 : F.regExp) !== null && C !== void 0 ? C : m, Ym = (x = M.uriResolver) !== null && x !== void 0 ? x : h.default;
    return {
      strictSchema: (T = (j = M.strictSchema) !== null && j !== void 0 ? j : Le) !== null && T !== void 0 ? T : !0,
      strictNumbers: (K = (z = M.strictNumbers) !== null && z !== void 0 ? z : Le) !== null && K !== void 0 ? K : !0,
      strictTypes: (X = (ne = M.strictTypes) !== null && ne !== void 0 ? ne : Le) !== null && X !== void 0 ? X : "log",
      strictTuples: (de = (me = M.strictTuples) !== null && me !== void 0 ? me : Le) !== null && de !== void 0 ? de : "log",
      strictRequired: (Me = (ge = M.strictRequired) !== null && ge !== void 0 ? ge : Le) !== null && Me !== void 0 ? Me : !1,
      code: M.code ? { ...M.code, optimize: wt, regExp: ac } : { optimize: wt, regExp: ac },
      loopRequired: (je = M.loopRequired) !== null && je !== void 0 ? je : g,
      loopEnum: (Fe = M.loopEnum) !== null && Fe !== void 0 ? Fe : g,
      meta: (lt = M.meta) !== null && lt !== void 0 ? lt : !0,
      messages: (Ft = M.messages) !== null && Ft !== void 0 ? Ft : !0,
      inlineRefs: (Rt = M.inlineRefs) !== null && Rt !== void 0 ? Rt : !0,
      schemaId: (rn = M.schemaId) !== null && rn !== void 0 ? rn : "$id",
      addUsedSchema: (nn = M.addUsedSchema) !== null && nn !== void 0 ? nn : !0,
      validateSchema: (J = M.validateSchema) !== null && J !== void 0 ? J : !0,
      validateFormats: (Se = M.validateFormats) !== null && Se !== void 0 ? Se : !0,
      unicodeRegExp: (xt = M.unicodeRegExp) !== null && xt !== void 0 ? xt : !0,
      int32range: (yr = M.int32range) !== null && yr !== void 0 ? yr : !0,
      uriResolver: Ym
    };
  }
  class _ {
    constructor(E = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), E = this.opts = { ...E, ...v(E) };
      const { es5: F, lines: C } = this.opts.code;
      this.scope = new o.ValueScope({ scope: {}, prefixes: $, es5: F, lines: C }), this.logger = L(E.logger);
      const x = E.validateFormats;
      E.validateFormats = !1, this.RULES = (0, a.getRules)(), w.call(this, y, E, "NOT SUPPORTED"), w.call(this, p, E, "DEPRECATED", "warn"), this._metaOpts = A.call(this), E.formats && D.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), E.keywords && N.call(this, E.keywords), typeof E.meta == "object" && this.addMetaSchema(E.meta), O.call(this), E.validateFormats = x;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: E, meta: F, schemaId: C } = this.opts;
      let x = f;
      C === "id" && (x = { ...f }, x.id = x.$id, delete x.$id), F && E && this.addMetaSchema(x, x[C], !1);
    }
    defaultMeta() {
      const { meta: E, schemaId: F } = this.opts;
      return this.opts.defaultMeta = typeof E == "object" ? E[F] || E : void 0;
    }
    validate(E, F) {
      let C;
      if (typeof E == "string") {
        if (C = this.getSchema(E), !C)
          throw new Error(`no schema with key or ref "${E}"`);
      } else
        C = this.compile(E);
      const x = C(F);
      return "$async" in C || (this.errors = C.errors), x;
    }
    compile(E, F) {
      const C = this._addSchema(E, F);
      return C.validate || this._compileSchemaEnv(C);
    }
    compileAsync(E, F) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: C } = this.opts;
      return x.call(this, E, F);
      async function x(X, me) {
        await j.call(this, X.$schema);
        const de = this._addSchema(X, me);
        return de.validate || T.call(this, de);
      }
      async function j(X) {
        X && !this.getSchema(X) && await x.call(this, { $ref: X }, !0);
      }
      async function T(X) {
        try {
          return this._compileSchemaEnv(X);
        } catch (me) {
          if (!(me instanceof s.default))
            throw me;
          return z.call(this, me), await K.call(this, me.missingSchema), T.call(this, X);
        }
      }
      function z({ missingSchema: X, missingRef: me }) {
        if (this.refs[X])
          throw new Error(`AnySchema ${X} is loaded but ${me} cannot be resolved`);
      }
      async function K(X) {
        const me = await ne.call(this, X);
        this.refs[X] || await j.call(this, me.$schema), this.refs[X] || this.addSchema(me, X, F);
      }
      async function ne(X) {
        const me = this._loading[X];
        if (me)
          return me;
        try {
          return await (this._loading[X] = C(X));
        } finally {
          delete this._loading[X];
        }
      }
    }
    // Adds schema to the instance
    addSchema(E, F, C, x = this.opts.validateSchema) {
      if (Array.isArray(E)) {
        for (const T of E)
          this.addSchema(T, void 0, C, x);
        return this;
      }
      let j;
      if (typeof E == "object") {
        const { schemaId: T } = this.opts;
        if (j = E[T], j !== void 0 && typeof j != "string")
          throw new Error(`schema ${T} must be string`);
      }
      return F = (0, c.normalizeId)(F || j), this._checkUnique(F), this.schemas[F] = this._addSchema(E, C, F, x, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(E, F, C = this.opts.validateSchema) {
      return this.addSchema(E, F, !0, C), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(E, F) {
      if (typeof E == "boolean")
        return !0;
      let C;
      if (C = E.$schema, C !== void 0 && typeof C != "string")
        throw new Error("$schema must be a string");
      if (C = C || this.opts.defaultMeta || this.defaultMeta(), !C)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const x = this.validate(C, E);
      if (!x && F) {
        const j = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(j);
        else
          throw new Error(j);
      }
      return x;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(E) {
      let F;
      for (; typeof (F = S.call(this, E)) == "string"; )
        E = F;
      if (F === void 0) {
        const { schemaId: C } = this.opts, x = new i.SchemaEnv({ schema: {}, schemaId: C });
        if (F = i.resolveSchema.call(this, x, E), !F)
          return;
        this.refs[E] = F;
      }
      return F.validate || this._compileSchemaEnv(F);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(E) {
      if (E instanceof RegExp)
        return this._removeAllSchemas(this.schemas, E), this._removeAllSchemas(this.refs, E), this;
      switch (typeof E) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const F = S.call(this, E);
          return typeof F == "object" && this._cache.delete(F.schema), delete this.schemas[E], delete this.refs[E], this;
        }
        case "object": {
          const F = E;
          this._cache.delete(F);
          let C = E[this.opts.schemaId];
          return C && (C = (0, c.normalizeId)(C), delete this.schemas[C], delete this.refs[C]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(E) {
      for (const F of E)
        this.addKeyword(F);
      return this;
    }
    addKeyword(E, F) {
      let C;
      if (typeof E == "string")
        C = E, typeof F == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), F.keyword = C);
      else if (typeof E == "object" && F === void 0) {
        if (F = E, C = F.keyword, Array.isArray(C) && !C.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (I.call(this, C, F), !F)
        return (0, u.eachItem)(C, (j) => P.call(this, j)), this;
      V.call(this, F);
      const x = {
        ...F,
        type: (0, d.getJSONTypes)(F.type),
        schemaType: (0, d.getJSONTypes)(F.schemaType)
      };
      return (0, u.eachItem)(C, x.type.length === 0 ? (j) => P.call(this, j, x) : (j) => x.type.forEach((T) => P.call(this, j, x, T))), this;
    }
    getKeyword(E) {
      const F = this.RULES.all[E];
      return typeof F == "object" ? F.definition : !!F;
    }
    // Remove keyword
    removeKeyword(E) {
      const { RULES: F } = this;
      delete F.keywords[E], delete F.all[E];
      for (const C of F.rules) {
        const x = C.rules.findIndex((j) => j.keyword === E);
        x >= 0 && C.rules.splice(x, 1);
      }
      return this;
    }
    // Add format
    addFormat(E, F) {
      return typeof F == "string" && (F = new RegExp(F)), this.formats[E] = F, this;
    }
    errorsText(E = this.errors, { separator: F = ", ", dataVar: C = "data" } = {}) {
      return !E || E.length === 0 ? "No errors" : E.map((x) => `${C}${x.instancePath} ${x.message}`).reduce((x, j) => x + F + j);
    }
    $dataMetaSchema(E, F) {
      const C = this.RULES.all;
      E = JSON.parse(JSON.stringify(E));
      for (const x of F) {
        const j = x.split("/").slice(1);
        let T = E;
        for (const z of j)
          T = T[z];
        for (const z in C) {
          const K = C[z];
          if (typeof K != "object")
            continue;
          const { $data: ne } = K.definition, X = T[z];
          ne && X && (T[z] = Z(X));
        }
      }
      return E;
    }
    _removeAllSchemas(E, F) {
      for (const C in E) {
        const x = E[C];
        (!F || F.test(C)) && (typeof x == "string" ? delete E[C] : x && !x.meta && (this._cache.delete(x.schema), delete E[C]));
      }
    }
    _addSchema(E, F, C, x = this.opts.validateSchema, j = this.opts.addUsedSchema) {
      let T;
      const { schemaId: z } = this.opts;
      if (typeof E == "object")
        T = E[z];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof E != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let K = this._cache.get(E);
      if (K !== void 0)
        return K;
      C = (0, c.normalizeId)(T || C);
      const ne = c.getSchemaRefs.call(this, E, C);
      return K = new i.SchemaEnv({ schema: E, schemaId: z, meta: F, baseId: C, localRefs: ne }), this._cache.set(K.schema, K), j && !C.startsWith("#") && (C && this._checkUnique(C), this.refs[C] = K), x && this.validateSchema(E, !0), K;
    }
    _checkUnique(E) {
      if (this.schemas[E] || this.refs[E])
        throw new Error(`schema with key or id "${E}" already exists`);
    }
    _compileSchemaEnv(E) {
      if (E.meta ? this._compileMetaSchema(E) : i.compileSchema.call(this, E), !E.validate)
        throw new Error("ajv implementation error");
      return E.validate;
    }
    _compileMetaSchema(E) {
      const F = this.opts;
      this.opts = this._metaOpts;
      try {
        i.compileSchema.call(this, E);
      } finally {
        this.opts = F;
      }
    }
  }
  _.ValidationError = n.default, _.MissingRefError = s.default, e.default = _;
  function w(M, E, F, C = "error") {
    for (const x in M) {
      const j = x;
      j in E && this.logger[C](`${F}: option ${x}. ${M[j]}`);
    }
  }
  function S(M) {
    return M = (0, c.normalizeId)(M), this.schemas[M] || this.refs[M];
  }
  function O() {
    const M = this.opts.schemas;
    if (M)
      if (Array.isArray(M))
        this.addSchema(M);
      else
        for (const E in M)
          this.addSchema(M[E], E);
  }
  function D() {
    for (const M in this.opts.formats) {
      const E = this.opts.formats[M];
      E && this.addFormat(M, E);
    }
  }
  function N(M) {
    if (Array.isArray(M)) {
      this.addVocabulary(M);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const E in M) {
      const F = M[E];
      F.keyword || (F.keyword = E), this.addKeyword(F);
    }
  }
  function A() {
    const M = { ...this.opts };
    for (const E of b)
      delete M[E];
    return M;
  }
  const R = { log() {
  }, warn() {
  }, error() {
  } };
  function L(M) {
    if (M === !1)
      return R;
    if (M === void 0)
      return console;
    if (M.log && M.warn && M.error)
      return M;
    throw new Error("logger must implement log, warn and error methods");
  }
  const W = /^[a-z_$][a-z0-9_$:-]*$/i;
  function I(M, E) {
    const { RULES: F } = this;
    if ((0, u.eachItem)(M, (C) => {
      if (F.keywords[C])
        throw new Error(`Keyword ${C} is already defined`);
      if (!W.test(C))
        throw new Error(`Keyword ${C} has invalid name`);
    }), !!E && E.$data && !("code" in E || "validate" in E))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function P(M, E, F) {
    var C;
    const x = E == null ? void 0 : E.post;
    if (F && x)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: j } = this;
    let T = x ? j.post : j.rules.find(({ type: K }) => K === F);
    if (T || (T = { type: F, rules: [] }, j.rules.push(T)), j.keywords[M] = !0, !E)
      return;
    const z = {
      keyword: M,
      definition: {
        ...E,
        type: (0, d.getJSONTypes)(E.type),
        schemaType: (0, d.getJSONTypes)(E.schemaType)
      }
    };
    E.before ? k.call(this, T, z, E.before) : T.rules.push(z), j.all[M] = z, (C = E.implements) === null || C === void 0 || C.forEach((K) => this.addKeyword(K));
  }
  function k(M, E, F) {
    const C = M.rules.findIndex((x) => x.keyword === F);
    C >= 0 ? M.rules.splice(C, 0, E) : (M.rules.push(E), this.logger.warn(`rule ${F} is not defined`));
  }
  function V(M) {
    let { metaSchema: E } = M;
    E !== void 0 && (M.$data && this.opts.$data && (E = Z(E)), M.validateSchema = this.compile(E, !0));
  }
  const q = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function Z(M) {
    return { anyOf: [M, q] };
  }
})(Gh);
var Nl = {}, El = {}, Ol = {};
Object.defineProperty(Ol, "__esModule", { value: !0 });
const r6 = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
Ol.default = r6;
var ir = {};
Object.defineProperty(ir, "__esModule", { value: !0 });
ir.callRef = ir.getValidate = void 0;
const n6 = Qr, ku = se, Ve = re, $r = $t, Fu = Be, fs = B, s6 = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: o, self: c } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return f();
    const u = Fu.resolveRef.call(c, d, s, r);
    if (u === void 0)
      throw new n6.default(n.opts.uriResolver, s, r);
    if (u instanceof Fu.SchemaEnv)
      return h(u);
    return m(u);
    function f() {
      if (a === d)
        return Os(e, i, a, a.$async);
      const b = t.scopeValue("root", { ref: d });
      return Os(e, (0, Ve._)`${b}.validate`, d, d.$async);
    }
    function h(b) {
      const $ = Dm(e, b);
      Os(e, $, b, b.$async);
    }
    function m(b) {
      const $ = t.scopeValue("schema", o.code.source === !0 ? { ref: b, code: (0, Ve.stringify)(b) } : { ref: b }), y = t.name("valid"), p = e.subschema({
        schema: b,
        dataTypes: [],
        schemaPath: Ve.nil,
        topSchemaRef: $,
        errSchemaPath: r
      }, y);
      e.mergeEvaluated(p), e.ok(y);
    }
  }
};
function Dm(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Ve._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
ir.getValidate = Dm;
function Os(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: o, opts: c } = a, d = c.passContext ? $r.default.this : Ve.nil;
  n ? u() : f();
  function u() {
    if (!o.$async)
      throw new Error("async schema referenced by sync schema");
    const b = s.let("valid");
    s.try(() => {
      s.code((0, Ve._)`await ${(0, ku.callValidateCode)(e, t, d)}`), m(t), i || s.assign(b, !0);
    }, ($) => {
      s.if((0, Ve._)`!(${$} instanceof ${a.ValidationError})`, () => s.throw($)), h($), i || s.assign(b, !1);
    }), e.ok(b);
  }
  function f() {
    e.result((0, ku.callValidateCode)(e, t, d), () => m(t), () => h(t));
  }
  function h(b) {
    const $ = (0, Ve._)`${b}.errors`;
    s.assign($r.default.vErrors, (0, Ve._)`${$r.default.vErrors} === null ? ${$} : ${$r.default.vErrors}.concat(${$})`), s.assign($r.default.errors, (0, Ve._)`${$r.default.vErrors}.length`);
  }
  function m(b) {
    var $;
    if (!a.opts.unevaluated)
      return;
    const y = ($ = r == null ? void 0 : r.validate) === null || $ === void 0 ? void 0 : $.evaluated;
    if (a.props !== !0)
      if (y && !y.dynamicProps)
        y.props !== void 0 && (a.props = fs.mergeEvaluated.props(s, y.props, a.props));
      else {
        const p = s.var("props", (0, Ve._)`${b}.evaluated.props`);
        a.props = fs.mergeEvaluated.props(s, p, a.props, Ve.Name);
      }
    if (a.items !== !0)
      if (y && !y.dynamicItems)
        y.items !== void 0 && (a.items = fs.mergeEvaluated.items(s, y.items, a.items));
      else {
        const p = s.var("items", (0, Ve._)`${b}.evaluated.items`);
        a.items = fs.mergeEvaluated.items(s, p, a.items, Ve.Name);
      }
  }
}
ir.callRef = Os;
ir.default = s6;
Object.defineProperty(El, "__esModule", { value: !0 });
const a6 = Ol, i6 = ir, o6 = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  a6.default,
  i6.default
];
El.default = o6;
var Cl = {}, Al = {};
Object.defineProperty(Al, "__esModule", { value: !0 });
const Gs = re, Lt = Gs.operators, Hs = {
  maximum: { okStr: "<=", ok: Lt.LTE, fail: Lt.GT },
  minimum: { okStr: ">=", ok: Lt.GTE, fail: Lt.LT },
  exclusiveMaximum: { okStr: "<", ok: Lt.LT, fail: Lt.GTE },
  exclusiveMinimum: { okStr: ">", ok: Lt.GT, fail: Lt.LTE }
}, l6 = {
  message: ({ keyword: e, schemaCode: t }) => (0, Gs.str)`must be ${Hs[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Gs._)`{comparison: ${Hs[e].okStr}, limit: ${t}}`
}, c6 = {
  keyword: Object.keys(Hs),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: l6,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Gs._)`${r} ${Hs[t].fail} ${n} || isNaN(${r})`);
  }
};
Al.default = c6;
var Pl = {};
Object.defineProperty(Pl, "__esModule", { value: !0 });
const _n = re, d6 = {
  message: ({ schemaCode: e }) => (0, _n.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, _n._)`{multipleOf: ${e}}`
}, u6 = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: d6,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), o = a ? (0, _n._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, _n._)`${i} !== parseInt(${i})`;
    e.fail$data((0, _n._)`(${n} === 0 || (${i} = ${r}/${n}, ${o}))`);
  }
};
Pl.default = u6;
var Tl = {}, Il = {};
Object.defineProperty(Il, "__esModule", { value: !0 });
function Mm(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Il.default = Mm;
Mm.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Tl, "__esModule", { value: !0 });
const er = re, f6 = B, p6 = Il, h6 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, er.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, er._)`{limit: ${e}}`
}, m6 = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: h6,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? er.operators.GT : er.operators.LT, i = s.opts.unicode === !1 ? (0, er._)`${r}.length` : (0, er._)`${(0, f6.useFunc)(e.gen, p6.default)}(${r})`;
    e.fail$data((0, er._)`${i} ${a} ${n}`);
  }
};
Tl.default = m6;
var kl = {};
Object.defineProperty(kl, "__esModule", { value: !0 });
const g6 = se, Js = re, y6 = {
  message: ({ schemaCode: e }) => (0, Js.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Js._)`{pattern: ${e}}`
}, b6 = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: y6,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, i = a.opts.unicodeRegExp ? "u" : "", o = r ? (0, Js._)`(new RegExp(${s}, ${i}))` : (0, g6.usePattern)(e, n);
    e.fail$data((0, Js._)`!${o}.test(${t})`);
  }
};
kl.default = b6;
var Fl = {};
Object.defineProperty(Fl, "__esModule", { value: !0 });
const jn = re, v6 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, jn.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, jn._)`{limit: ${e}}`
}, $6 = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: v6,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? jn.operators.GT : jn.operators.LT;
    e.fail$data((0, jn._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
Fl.default = $6;
var Rl = {};
Object.defineProperty(Rl, "__esModule", { value: !0 });
const fn = se, Sn = re, x6 = B, w6 = {
  message: ({ params: { missingProperty: e } }) => (0, Sn.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Sn._)`{missingProperty: ${e}}`
}, _6 = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: w6,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: i } = e, { opts: o } = i;
    if (!a && r.length === 0)
      return;
    const c = r.length >= o.loopRequired;
    if (i.allErrors ? d() : u(), o.strictRequired) {
      const m = e.parentSchema.properties, { definedProperties: b } = e.it;
      for (const $ of r)
        if ((m == null ? void 0 : m[$]) === void 0 && !b.has($)) {
          const y = i.schemaEnv.baseId + i.errSchemaPath, p = `required property "${$}" is not defined at "${y}" (strictRequired)`;
          (0, x6.checkStrictMode)(i, p, i.opts.strictRequired);
        }
    }
    function d() {
      if (c || a)
        e.block$data(Sn.nil, f);
      else
        for (const m of r)
          (0, fn.checkReportMissingProp)(e, m);
    }
    function u() {
      const m = t.let("missing");
      if (c || a) {
        const b = t.let("valid", !0);
        e.block$data(b, () => h(m, b)), e.ok(b);
      } else
        t.if((0, fn.checkMissingProp)(e, r, m)), (0, fn.reportMissingProp)(e, m), t.else();
    }
    function f() {
      t.forOf("prop", n, (m) => {
        e.setParams({ missingProperty: m }), t.if((0, fn.noPropertyInData)(t, s, m, o.ownProperties), () => e.error());
      });
    }
    function h(m, b) {
      e.setParams({ missingProperty: m }), t.forOf(m, n, () => {
        t.assign(b, (0, fn.propertyInData)(t, s, m, o.ownProperties)), t.if((0, Sn.not)(b), () => {
          e.error(), t.break();
        });
      }, Sn.nil);
    }
  }
};
Rl.default = _6;
var Dl = {};
Object.defineProperty(Dl, "__esModule", { value: !0 });
const Nn = re, j6 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Nn.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Nn._)`{limit: ${e}}`
}, S6 = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: j6,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Nn.operators.GT : Nn.operators.LT;
    e.fail$data((0, Nn._)`${r}.length ${s} ${n}`);
  }
};
Dl.default = S6;
var Ml = {}, rs = {};
Object.defineProperty(rs, "__esModule", { value: !0 });
const Lm = cm;
Lm.code = 'require("ajv/dist/runtime/equal").default';
rs.default = Lm;
Object.defineProperty(Ml, "__esModule", { value: !0 });
const $i = Oe, Te = re, N6 = B, E6 = rs, O6 = {
  message: ({ params: { i: e, j: t } }) => (0, Te.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Te._)`{i: ${e}, j: ${t}}`
}, C6 = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: O6,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: o } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = a.items ? (0, $i.getSchemaTypes)(a.items) : [];
    e.block$data(c, u, (0, Te._)`${i} === false`), e.ok(c);
    function u() {
      const b = t.let("i", (0, Te._)`${r}.length`), $ = t.let("j");
      e.setParams({ i: b, j: $ }), t.assign(c, !0), t.if((0, Te._)`${b} > 1`, () => (f() ? h : m)(b, $));
    }
    function f() {
      return d.length > 0 && !d.some((b) => b === "object" || b === "array");
    }
    function h(b, $) {
      const y = t.name("item"), p = (0, $i.checkDataTypes)(d, y, o.opts.strictNumbers, $i.DataType.Wrong), g = t.const("indices", (0, Te._)`{}`);
      t.for((0, Te._)`;${b}--;`, () => {
        t.let(y, (0, Te._)`${r}[${b}]`), t.if(p, (0, Te._)`continue`), d.length > 1 && t.if((0, Te._)`typeof ${y} == "string"`, (0, Te._)`${y} += "_"`), t.if((0, Te._)`typeof ${g}[${y}] == "number"`, () => {
          t.assign($, (0, Te._)`${g}[${y}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Te._)`${g}[${y}] = ${b}`);
      });
    }
    function m(b, $) {
      const y = (0, N6.useFunc)(t, E6.default), p = t.name("outer");
      t.label(p).for((0, Te._)`;${b}--;`, () => t.for((0, Te._)`${$} = ${b}; ${$}--;`, () => t.if((0, Te._)`${y}(${r}[${b}], ${r}[${$}])`, () => {
        e.error(), t.assign(c, !1).break(p);
      })));
    }
  }
};
Ml.default = C6;
var Ll = {};
Object.defineProperty(Ll, "__esModule", { value: !0 });
const Ji = re, A6 = B, P6 = rs, T6 = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Ji._)`{allowedValue: ${e}}`
}, I6 = {
  keyword: "const",
  $data: !0,
  error: T6,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, Ji._)`!${(0, A6.useFunc)(t, P6.default)}(${r}, ${s})`) : e.fail((0, Ji._)`${a} !== ${r}`);
  }
};
Ll.default = I6;
var Ul = {};
Object.defineProperty(Ul, "__esModule", { value: !0 });
const mn = re, k6 = B, F6 = rs, R6 = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, mn._)`{allowedValues: ${e}}`
}, D6 = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: R6,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const o = s.length >= i.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, k6.useFunc)(t, F6.default));
    let u;
    if (o || n)
      u = t.let("valid"), e.block$data(u, f);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const m = t.const("vSchema", a);
      u = (0, mn.or)(...s.map((b, $) => h(m, $)));
    }
    e.pass(u);
    function f() {
      t.assign(u, !1), t.forOf("v", a, (m) => t.if((0, mn._)`${d()}(${r}, ${m})`, () => t.assign(u, !0).break()));
    }
    function h(m, b) {
      const $ = s[b];
      return typeof $ == "object" && $ !== null ? (0, mn._)`${d()}(${r}, ${m}[${b}])` : (0, mn._)`${r} === ${$}`;
    }
  }
};
Ul.default = D6;
Object.defineProperty(Cl, "__esModule", { value: !0 });
const M6 = Al, L6 = Pl, U6 = Tl, W6 = kl, V6 = Fl, B6 = Rl, z6 = Dl, q6 = Ml, K6 = Ll, G6 = Ul, H6 = [
  // number
  M6.default,
  L6.default,
  // string
  U6.default,
  W6.default,
  // object
  V6.default,
  B6.default,
  // array
  z6.default,
  q6.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  K6.default,
  G6.default
];
Cl.default = H6;
var Wl = {}, en = {};
Object.defineProperty(en, "__esModule", { value: !0 });
en.validateAdditionalItems = void 0;
const tr = re, Yi = B, J6 = {
  message: ({ params: { len: e } }) => (0, tr.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, tr._)`{limit: ${e}}`
}, Y6 = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: J6,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Yi.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Um(e, n);
  }
};
function Um(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const o = r.const("len", (0, tr._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, tr._)`${o} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Yi.alwaysValidSchema)(i, n)) {
    const d = r.var("valid", (0, tr._)`${o} <= ${t.length}`);
    r.if((0, tr.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, o, (u) => {
      e.subschema({ keyword: a, dataProp: u, dataPropType: Yi.Type.Num }, d), i.allErrors || r.if((0, tr.not)(d), () => r.break());
    });
  }
}
en.validateAdditionalItems = Um;
en.default = Y6;
var Vl = {}, tn = {};
Object.defineProperty(tn, "__esModule", { value: !0 });
tn.validateTuple = void 0;
const Ru = re, Cs = B, Z6 = se, X6 = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Wm(e, "additionalItems", t);
    r.items = !0, !(0, Cs.alwaysValidSchema)(r, t) && e.ok((0, Z6.validateArray)(e));
  }
};
function Wm(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: o } = e;
  u(s), o.opts.unevaluated && r.length && o.items !== !0 && (o.items = Cs.mergeEvaluated.items(n, r.length, o.items));
  const c = n.name("valid"), d = n.const("len", (0, Ru._)`${a}.length`);
  r.forEach((f, h) => {
    (0, Cs.alwaysValidSchema)(o, f) || (n.if((0, Ru._)`${d} > ${h}`, () => e.subschema({
      keyword: i,
      schemaProp: h,
      dataProp: h
    }, c)), e.ok(c));
  });
  function u(f) {
    const { opts: h, errSchemaPath: m } = o, b = r.length, $ = b === f.minItems && (b === f.maxItems || f[t] === !1);
    if (h.strictTuples && !$) {
      const y = `"${i}" is ${b}-tuple, but minItems or maxItems/${t} are not specified or different at path "${m}"`;
      (0, Cs.checkStrictMode)(o, y, h.strictTuples);
    }
  }
}
tn.validateTuple = Wm;
tn.default = X6;
Object.defineProperty(Vl, "__esModule", { value: !0 });
const Q6 = tn, eU = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, Q6.validateTuple)(e, "items")
};
Vl.default = eU;
var Bl = {};
Object.defineProperty(Bl, "__esModule", { value: !0 });
const Du = re, tU = B, rU = se, nU = en, sU = {
  message: ({ params: { len: e } }) => (0, Du.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Du._)`{limit: ${e}}`
}, aU = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: sU,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, tU.alwaysValidSchema)(n, t) && (s ? (0, nU.validateAdditionalItems)(e, s) : e.ok((0, rU.validateArray)(e)));
  }
};
Bl.default = aU;
var zl = {};
Object.defineProperty(zl, "__esModule", { value: !0 });
const He = re, ps = B, iU = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, He.str)`must contain at least ${e} valid item(s)` : (0, He.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, He._)`{minContains: ${e}}` : (0, He._)`{minContains: ${e}, maxContains: ${t}}`
}, oU = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: iU,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let i, o;
    const { minContains: c, maxContains: d } = n;
    a.opts.next ? (i = c === void 0 ? 1 : c, o = d) : i = 1;
    const u = t.const("len", (0, He._)`${s}.length`);
    if (e.setParams({ min: i, max: o }), o === void 0 && i === 0) {
      (0, ps.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (o !== void 0 && i > o) {
      (0, ps.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, ps.alwaysValidSchema)(a, r)) {
      let $ = (0, He._)`${u} >= ${i}`;
      o !== void 0 && ($ = (0, He._)`${$} && ${u} <= ${o}`), e.pass($);
      return;
    }
    a.items = !0;
    const f = t.name("valid");
    o === void 0 && i === 1 ? m(f, () => t.if(f, () => t.break())) : i === 0 ? (t.let(f, !0), o !== void 0 && t.if((0, He._)`${s}.length > 0`, h)) : (t.let(f, !1), h()), e.result(f, () => e.reset());
    function h() {
      const $ = t.name("_valid"), y = t.let("count", 0);
      m($, () => t.if($, () => b(y)));
    }
    function m($, y) {
      t.forRange("i", 0, u, (p) => {
        e.subschema({
          keyword: "contains",
          dataProp: p,
          dataPropType: ps.Type.Num,
          compositeRule: !0
        }, $), y();
      });
    }
    function b($) {
      t.code((0, He._)`${$}++`), o === void 0 ? t.if((0, He._)`${$} >= ${i}`, () => t.assign(f, !0).break()) : (t.if((0, He._)`${$} > ${o}`, () => t.assign(f, !1).break()), i === 1 ? t.assign(f, !0) : t.if((0, He._)`${$} >= ${i}`, () => t.assign(f, !0)));
    }
  }
};
zl.default = oU;
var Vm = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = re, r = B, n = se;
  e.error = {
    message: ({ params: { property: c, depsCount: d, deps: u } }) => {
      const f = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${f} ${u} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: d, deps: u, missingProperty: f } }) => (0, t._)`{property: ${c},
    missingProperty: ${f},
    depsCount: ${d},
    deps: ${u}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [d, u] = a(c);
      i(c, d), o(c, u);
    }
  };
  function a({ schema: c }) {
    const d = {}, u = {};
    for (const f in c) {
      if (f === "__proto__")
        continue;
      const h = Array.isArray(c[f]) ? d : u;
      h[f] = c[f];
    }
    return [d, u];
  }
  function i(c, d = c.schema) {
    const { gen: u, data: f, it: h } = c;
    if (Object.keys(d).length === 0)
      return;
    const m = u.let("missing");
    for (const b in d) {
      const $ = d[b];
      if ($.length === 0)
        continue;
      const y = (0, n.propertyInData)(u, f, b, h.opts.ownProperties);
      c.setParams({
        property: b,
        depsCount: $.length,
        deps: $.join(", ")
      }), h.allErrors ? u.if(y, () => {
        for (const p of $)
          (0, n.checkReportMissingProp)(c, p);
      }) : (u.if((0, t._)`${y} && (${(0, n.checkMissingProp)(c, $, m)})`), (0, n.reportMissingProp)(c, m), u.else());
    }
  }
  e.validatePropertyDeps = i;
  function o(c, d = c.schema) {
    const { gen: u, data: f, keyword: h, it: m } = c, b = u.name("valid");
    for (const $ in d)
      (0, r.alwaysValidSchema)(m, d[$]) || (u.if(
        (0, n.propertyInData)(u, f, $, m.opts.ownProperties),
        () => {
          const y = c.subschema({ keyword: h, schemaProp: $ }, b);
          c.mergeValidEvaluated(y, b);
        },
        () => u.var(b, !0)
        // TODO var
      ), c.ok(b));
  }
  e.validateSchemaDeps = o, e.default = s;
})(Vm);
var ql = {};
Object.defineProperty(ql, "__esModule", { value: !0 });
const Bm = re, lU = B, cU = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Bm._)`{propertyName: ${e.propertyName}}`
}, dU = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: cU,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, lU.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, Bm.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
ql.default = dU;
var za = {};
Object.defineProperty(za, "__esModule", { value: !0 });
const hs = se, tt = re, uU = $t, ms = B, fU = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, tt._)`{additionalProperty: ${e.additionalProperty}}`
}, pU = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: fU,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: o, opts: c } = i;
    if (i.props = !0, c.removeAdditional !== "all" && (0, ms.alwaysValidSchema)(i, r))
      return;
    const d = (0, hs.allSchemaProperties)(n.properties), u = (0, hs.allSchemaProperties)(n.patternProperties);
    f(), e.ok((0, tt._)`${a} === ${uU.default.errors}`);
    function f() {
      t.forIn("key", s, (y) => {
        !d.length && !u.length ? b(y) : t.if(h(y), () => b(y));
      });
    }
    function h(y) {
      let p;
      if (d.length > 8) {
        const g = (0, ms.schemaRefOrVal)(i, n.properties, "properties");
        p = (0, hs.isOwnProperty)(t, g, y);
      } else d.length ? p = (0, tt.or)(...d.map((g) => (0, tt._)`${y} === ${g}`)) : p = tt.nil;
      return u.length && (p = (0, tt.or)(p, ...u.map((g) => (0, tt._)`${(0, hs.usePattern)(e, g)}.test(${y})`))), (0, tt.not)(p);
    }
    function m(y) {
      t.code((0, tt._)`delete ${s}[${y}]`);
    }
    function b(y) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        m(y);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: y }), e.error(), o || t.break();
        return;
      }
      if (typeof r == "object" && !(0, ms.alwaysValidSchema)(i, r)) {
        const p = t.name("valid");
        c.removeAdditional === "failing" ? ($(y, p, !1), t.if((0, tt.not)(p), () => {
          e.reset(), m(y);
        })) : ($(y, p), o || t.if((0, tt.not)(p), () => t.break()));
      }
    }
    function $(y, p, g) {
      const v = {
        keyword: "additionalProperties",
        dataProp: y,
        dataPropType: ms.Type.Str
      };
      g === !1 && Object.assign(v, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(v, p);
    }
  }
};
za.default = pU;
var Kl = {};
Object.defineProperty(Kl, "__esModule", { value: !0 });
const hU = it, Mu = se, xi = B, Lu = za, mU = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Lu.default.code(new hU.KeywordCxt(a, Lu.default, "additionalProperties"));
    const i = (0, Mu.allSchemaProperties)(r);
    for (const f of i)
      a.definedProperties.add(f);
    a.opts.unevaluated && i.length && a.props !== !0 && (a.props = xi.mergeEvaluated.props(t, (0, xi.toHash)(i), a.props));
    const o = i.filter((f) => !(0, xi.alwaysValidSchema)(a, r[f]));
    if (o.length === 0)
      return;
    const c = t.name("valid");
    for (const f of o)
      d(f) ? u(f) : (t.if((0, Mu.propertyInData)(t, s, f, a.opts.ownProperties)), u(f), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(f), e.ok(c);
    function d(f) {
      return a.opts.useDefaults && !a.compositeRule && r[f].default !== void 0;
    }
    function u(f) {
      e.subschema({
        keyword: "properties",
        schemaProp: f,
        dataProp: f
      }, c);
    }
  }
};
Kl.default = mU;
var Gl = {};
Object.defineProperty(Gl, "__esModule", { value: !0 });
const Uu = se, gs = re, Wu = B, Vu = B, gU = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, o = (0, Uu.allSchemaProperties)(r), c = o.filter(($) => (0, Wu.alwaysValidSchema)(a, r[$]));
    if (o.length === 0 || c.length === o.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = i.strictSchema && !i.allowMatchingProperties && s.properties, u = t.name("valid");
    a.props !== !0 && !(a.props instanceof gs.Name) && (a.props = (0, Vu.evaluatedPropsToName)(t, a.props));
    const { props: f } = a;
    h();
    function h() {
      for (const $ of o)
        d && m($), a.allErrors ? b($) : (t.var(u, !0), b($), t.if(u));
    }
    function m($) {
      for (const y in d)
        new RegExp($).test(y) && (0, Wu.checkStrictMode)(a, `property ${y} matches pattern ${$} (use allowMatchingProperties)`);
    }
    function b($) {
      t.forIn("key", n, (y) => {
        t.if((0, gs._)`${(0, Uu.usePattern)(e, $)}.test(${y})`, () => {
          const p = c.includes($);
          p || e.subschema({
            keyword: "patternProperties",
            schemaProp: $,
            dataProp: y,
            dataPropType: Vu.Type.Str
          }, u), a.opts.unevaluated && f !== !0 ? t.assign((0, gs._)`${f}[${y}]`, !0) : !p && !a.allErrors && t.if((0, gs.not)(u), () => t.break());
        });
      });
    }
  }
};
Gl.default = gU;
var Hl = {};
Object.defineProperty(Hl, "__esModule", { value: !0 });
const yU = B, bU = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, yU.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const s = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, s), e.failResult(s, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
Hl.default = bU;
var Jl = {};
Object.defineProperty(Jl, "__esModule", { value: !0 });
const vU = se, $U = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: vU.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Jl.default = $U;
var Yl = {};
Object.defineProperty(Yl, "__esModule", { value: !0 });
const As = re, xU = B, wU = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, As._)`{passingSchemas: ${e.passing}}`
}, _U = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: wU,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, i = t.let("valid", !1), o = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: o }), t.block(d), e.result(i, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((u, f) => {
        let h;
        (0, xU.alwaysValidSchema)(s, u) ? t.var(c, !0) : h = e.subschema({
          keyword: "oneOf",
          schemaProp: f,
          compositeRule: !0
        }, c), f > 0 && t.if((0, As._)`${c} && ${i}`).assign(i, !1).assign(o, (0, As._)`[${o}, ${f}]`).else(), t.if(c, () => {
          t.assign(i, !0), t.assign(o, f), h && e.mergeEvaluated(h, As.Name);
        });
      });
    }
  }
};
Yl.default = _U;
var Zl = {};
Object.defineProperty(Zl, "__esModule", { value: !0 });
const jU = B, SU = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, jU.alwaysValidSchema)(n, a))
        return;
      const o = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(o);
    });
  }
};
Zl.default = SU;
var Xl = {};
Object.defineProperty(Xl, "__esModule", { value: !0 });
const Ys = re, zm = B, NU = {
  message: ({ params: e }) => (0, Ys.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Ys._)`{failingKeyword: ${e.ifClause}}`
}, EU = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: NU,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, zm.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Bu(n, "then"), a = Bu(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), o = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(o, d("then", u), d("else", u));
    } else s ? t.if(o, d("then")) : t.if((0, Ys.not)(o), d("else"));
    e.pass(i, () => e.error(!0));
    function c() {
      const u = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, o);
      e.mergeEvaluated(u);
    }
    function d(u, f) {
      return () => {
        const h = e.subschema({ keyword: u }, o);
        t.assign(i, o), e.mergeValidEvaluated(h, i), f ? t.assign(f, (0, Ys._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function Bu(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, zm.alwaysValidSchema)(e, r);
}
Xl.default = EU;
var Ql = {};
Object.defineProperty(Ql, "__esModule", { value: !0 });
const OU = B, CU = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, OU.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Ql.default = CU;
Object.defineProperty(Wl, "__esModule", { value: !0 });
const AU = en, PU = Vl, TU = tn, IU = Bl, kU = zl, FU = Vm, RU = ql, DU = za, MU = Kl, LU = Gl, UU = Hl, WU = Jl, VU = Yl, BU = Zl, zU = Xl, qU = Ql;
function KU(e = !1) {
  const t = [
    // any
    UU.default,
    WU.default,
    VU.default,
    BU.default,
    zU.default,
    qU.default,
    // object
    RU.default,
    DU.default,
    FU.default,
    MU.default,
    LU.default
  ];
  return e ? t.push(PU.default, IU.default) : t.push(AU.default, TU.default), t.push(kU.default), t;
}
Wl.default = KU;
var ec = {}, tc = {};
Object.defineProperty(tc, "__esModule", { value: !0 });
const Ee = re, GU = {
  message: ({ schemaCode: e }) => (0, Ee.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, Ee._)`{format: ${e}}`
}, HU = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: GU,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: o } = e, { opts: c, errSchemaPath: d, schemaEnv: u, self: f } = o;
    if (!c.validateFormats)
      return;
    s ? h() : m();
    function h() {
      const b = r.scopeValue("formats", {
        ref: f.formats,
        code: c.code.formats
      }), $ = r.const("fDef", (0, Ee._)`${b}[${i}]`), y = r.let("fType"), p = r.let("format");
      r.if((0, Ee._)`typeof ${$} == "object" && !(${$} instanceof RegExp)`, () => r.assign(y, (0, Ee._)`${$}.type || "string"`).assign(p, (0, Ee._)`${$}.validate`), () => r.assign(y, (0, Ee._)`"string"`).assign(p, $)), e.fail$data((0, Ee.or)(g(), v()));
      function g() {
        return c.strictSchema === !1 ? Ee.nil : (0, Ee._)`${i} && !${p}`;
      }
      function v() {
        const _ = u.$async ? (0, Ee._)`(${$}.async ? await ${p}(${n}) : ${p}(${n}))` : (0, Ee._)`${p}(${n})`, w = (0, Ee._)`(typeof ${p} == "function" ? ${_} : ${p}.test(${n}))`;
        return (0, Ee._)`${p} && ${p} !== true && ${y} === ${t} && !${w}`;
      }
    }
    function m() {
      const b = f.formats[a];
      if (!b) {
        g();
        return;
      }
      if (b === !0)
        return;
      const [$, y, p] = v(b);
      $ === t && e.pass(_());
      function g() {
        if (c.strictSchema === !1) {
          f.logger.warn(w());
          return;
        }
        throw new Error(w());
        function w() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function v(w) {
        const S = w instanceof RegExp ? (0, Ee.regexpCode)(w) : c.code.formats ? (0, Ee._)`${c.code.formats}${(0, Ee.getProperty)(a)}` : void 0, O = r.scopeValue("formats", { key: a, ref: w, code: S });
        return typeof w == "object" && !(w instanceof RegExp) ? [w.type || "string", w.validate, (0, Ee._)`${O}.validate`] : ["string", w, O];
      }
      function _() {
        if (typeof b == "object" && !(b instanceof RegExp) && b.async) {
          if (!u.$async)
            throw new Error("async format in sync schema");
          return (0, Ee._)`await ${p}(${n})`;
        }
        return typeof y == "function" ? (0, Ee._)`${p}(${n})` : (0, Ee._)`${p}.test(${n})`;
      }
    }
  }
};
tc.default = HU;
Object.defineProperty(ec, "__esModule", { value: !0 });
const JU = tc, YU = [JU.default];
ec.default = YU;
var Dr = {};
Object.defineProperty(Dr, "__esModule", { value: !0 });
Dr.contentVocabulary = Dr.metadataVocabulary = void 0;
Dr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Dr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(Nl, "__esModule", { value: !0 });
const ZU = El, XU = Cl, QU = Wl, e7 = ec, zu = Dr, t7 = [
  ZU.default,
  XU.default,
  (0, QU.default)(),
  e7.default,
  zu.metadataVocabulary,
  zu.contentVocabulary
];
Nl.default = t7;
var rc = {}, qa = {};
Object.defineProperty(qa, "__esModule", { value: !0 });
qa.DiscrError = void 0;
var qu;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(qu || (qa.DiscrError = qu = {}));
Object.defineProperty(rc, "__esModule", { value: !0 });
const xr = re, Zi = qa, Ku = Be, r7 = Qr, n7 = B, s7 = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Zi.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, xr._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, a7 = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: s7,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: i } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const o = n.propertyName;
    if (typeof o != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!i)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), d = t.const("tag", (0, xr._)`${r}${(0, xr.getProperty)(o)}`);
    t.if((0, xr._)`typeof ${d} == "string"`, () => u(), () => e.error(!1, { discrError: Zi.DiscrError.Tag, tag: d, tagName: o })), e.ok(c);
    function u() {
      const m = h();
      t.if(!1);
      for (const b in m)
        t.elseIf((0, xr._)`${d} === ${b}`), t.assign(c, f(m[b]));
      t.else(), e.error(!1, { discrError: Zi.DiscrError.Mapping, tag: d, tagName: o }), t.endIf();
    }
    function f(m) {
      const b = t.name("valid"), $ = e.subschema({ keyword: "oneOf", schemaProp: m }, b);
      return e.mergeEvaluated($, xr.Name), b;
    }
    function h() {
      var m;
      const b = {}, $ = p(s);
      let y = !0;
      for (let _ = 0; _ < i.length; _++) {
        let w = i[_];
        if (w != null && w.$ref && !(0, n7.schemaHasRulesButRef)(w, a.self.RULES)) {
          const O = w.$ref;
          if (w = Ku.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, O), w instanceof Ku.SchemaEnv && (w = w.schema), w === void 0)
            throw new r7.default(a.opts.uriResolver, a.baseId, O);
        }
        const S = (m = w == null ? void 0 : w.properties) === null || m === void 0 ? void 0 : m[o];
        if (typeof S != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${o}"`);
        y = y && ($ || p(w)), g(S, _);
      }
      if (!y)
        throw new Error(`discriminator: "${o}" must be required`);
      return b;
      function p({ required: _ }) {
        return Array.isArray(_) && _.includes(o);
      }
      function g(_, w) {
        if (_.const)
          v(_.const, w);
        else if (_.enum)
          for (const S of _.enum)
            v(S, w);
        else
          throw new Error(`discriminator: "properties/${o}" must have "const" or "enum"`);
      }
      function v(_, w) {
        if (typeof _ != "string" || _ in b)
          throw new Error(`discriminator: "${o}" values must be unique strings`);
        b[_] = w;
      }
    }
  }
};
rc.default = a7;
const i7 = "http://json-schema.org/draft-07/schema#", o7 = "http://json-schema.org/draft-07/schema#", l7 = "Core schema meta-schema", c7 = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, d7 = [
  "object",
  "boolean"
], u7 = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
}, f7 = {
  $schema: i7,
  $id: o7,
  title: l7,
  definitions: c7,
  type: d7,
  properties: u7,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Gh, n = Nl, s = rc, a = f7, i = ["/properties"], o = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((b) => this.addVocabulary(b)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const b = this.opts.$data ? this.$dataMetaSchema(a, i) : a;
      this.addMetaSchema(b, o, !1), this.refs["http://json-schema.org/schema"] = o;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(o) ? o : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var d = it;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return d.KeywordCxt;
  } });
  var u = re;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return u._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return u.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return u.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return u.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return u.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return u.CodeGen;
  } });
  var f = ts;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return f.default;
  } });
  var h = Qr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return h.default;
  } });
})(zi, zi.exports);
var qm = zi.exports;
const p7 = /* @__PURE__ */ Mn(qm);
var Xi = { exports: {} }, Km = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(N, A) {
    return { validate: N, compare: A };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(a, i),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(c, d),
    "date-time": t(f, h),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: $,
    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    // uri-template: https://tools.ietf.org/html/rfc6570
    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    // For the source: https://gist.github.com/dperini/729294
    // For test cases: https://mathiasbynens.be/demo/url-regex
    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
    // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
    regex: D,
    // uuid: http://tools.ietf.org/html/rfc4122
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    // JSON-pointer: https://tools.ietf.org/html/rfc6901
    // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
    // byte: https://github.com/miguelmota/is-base64
    byte: p,
    // signed 32 bit integer
    int32: { type: "number", validate: _ },
    // signed 64 bit integer
    int64: { type: "number", validate: w },
    // C-type float
    float: { type: "number", validate: S },
    // C-type double
    double: { type: "number", validate: S },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, i),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, d),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, h),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function r(N) {
    return N % 4 === 0 && (N % 100 !== 0 || N % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, s = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function a(N) {
    const A = n.exec(N);
    if (!A)
      return !1;
    const R = +A[1], L = +A[2], W = +A[3];
    return L >= 1 && L <= 12 && W >= 1 && W <= (L === 2 && r(R) ? 29 : s[L]);
  }
  function i(N, A) {
    if (N && A)
      return N > A ? 1 : N < A ? -1 : 0;
  }
  const o = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  function c(N, A) {
    const R = o.exec(N);
    if (!R)
      return !1;
    const L = +R[1], W = +R[2], I = +R[3], P = R[5];
    return (L <= 23 && W <= 59 && I <= 59 || L === 23 && W === 59 && I === 60) && (!A || P !== "");
  }
  function d(N, A) {
    if (!(N && A))
      return;
    const R = o.exec(N), L = o.exec(A);
    if (R && L)
      return N = R[1] + R[2] + R[3] + (R[4] || ""), A = L[1] + L[2] + L[3] + (L[4] || ""), N > A ? 1 : N < A ? -1 : 0;
  }
  const u = /t|\s/i;
  function f(N) {
    const A = N.split(u);
    return A.length === 2 && a(A[0]) && c(A[1], !0);
  }
  function h(N, A) {
    if (!(N && A))
      return;
    const [R, L] = N.split(u), [W, I] = A.split(u), P = i(R, W);
    if (P !== void 0)
      return P || d(L, I);
  }
  const m = /\/|:/, b = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function $(N) {
    return m.test(N) && b.test(N);
  }
  const y = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function p(N) {
    return y.lastIndex = 0, y.test(N);
  }
  const g = -2147483648, v = 2 ** 31 - 1;
  function _(N) {
    return Number.isInteger(N) && N <= v && N >= g;
  }
  function w(N) {
    return Number.isInteger(N);
  }
  function S() {
    return !0;
  }
  const O = /[^\\]\\Z/;
  function D(N) {
    if (O.test(N))
      return !1;
    try {
      return new RegExp(N), !0;
    } catch {
      return !1;
    }
  }
})(Km);
var Gm = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = qm, r = re, n = r.operators, s = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, a = {
    message: ({ keyword: o, schemaCode: c }) => r.str`should be ${s[o].okStr} ${c}`,
    params: ({ keyword: o, schemaCode: c }) => r._`{comparison: ${s[o].okStr}, limit: ${c}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(s),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: a,
    code(o) {
      const { gen: c, data: d, schemaCode: u, keyword: f, it: h } = o, { opts: m, self: b } = h;
      if (!m.validateFormats)
        return;
      const $ = new t.KeywordCxt(h, b.RULES.all.format.definition, "format");
      $.$data ? y() : p();
      function y() {
        const v = c.scopeValue("formats", {
          ref: b.formats,
          code: m.code.formats
        }), _ = c.const("fmt", r._`${v}[${$.schemaCode}]`);
        o.fail$data(r.or(r._`typeof ${_} != "object"`, r._`${_} instanceof RegExp`, r._`typeof ${_}.compare != "function"`, g(_)));
      }
      function p() {
        const v = $.schema, _ = b.formats[v];
        if (!_ || _ === !0)
          return;
        if (typeof _ != "object" || _ instanceof RegExp || typeof _.compare != "function")
          throw new Error(`"${f}": format "${v}" does not define "compare" function`);
        const w = c.scopeValue("formats", {
          key: v,
          ref: _,
          code: m.code.formats ? r._`${m.code.formats}${r.getProperty(v)}` : void 0
        });
        o.fail$data(g(w));
      }
      function g(v) {
        return r._`${v}.compare(${d}, ${u}) ${s[f].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const i = (o) => (o.addKeyword(e.formatLimitDefinition), o);
  e.default = i;
})(Gm);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = Km, n = Gm, s = re, a = new s.Name("fullFormats"), i = new s.Name("fastFormats"), o = (d, u = { keywords: !0 }) => {
    if (Array.isArray(u))
      return c(d, u, r.fullFormats, a), d;
    const [f, h] = u.mode === "fast" ? [r.fastFormats, i] : [r.fullFormats, a], m = u.formats || r.formatNames;
    return c(d, m, f, h), u.keywords && n.default(d), d;
  };
  o.get = (d, u = "full") => {
    const h = (u === "fast" ? r.fastFormats : r.fullFormats)[d];
    if (!h)
      throw new Error(`Unknown format "${d}"`);
    return h;
  };
  function c(d, u, f, h) {
    var m, b;
    (m = (b = d.opts.code).formats) !== null && m !== void 0 || (b.formats = s._`require("ajv-formats/dist/formats").${h}`);
    for (const $ of u)
      d.addFormat($, f[$]);
  }
  e.exports = t = o, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = o;
})(Xi, Xi.exports);
var h7 = Xi.exports;
const Gu = /* @__PURE__ */ Mn(h7), m7 = {
  allErrors: !0,
  multipleOfPrecision: 8,
  strict: !1,
  verbose: !0,
  discriminator: !1
  // TODO enable this in V6
}, g7 = /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/, y7 = /^data:([a-z]+\/[a-z0-9-+.]+)?;(?:name=(.*);)?base64,(.*)$/;
function b7(e, t, r = {}, n, s = p7) {
  const a = new s({ ...m7, ...r });
  return n ? Gu(a, n) : n !== !1 && Gu(a), a.addFormat("data-url", y7), a.addFormat("color", g7), a.addKeyword(Un), a.addKeyword(to), Array.isArray(e) && a.addMetaSchema(e), ve(t) && Object.keys(t).forEach((i) => {
    a.addFormat(i, t[i]);
  }), a;
}
function v7(e = [], t) {
  return e.map((r) => {
    var n;
    const { instancePath: s, keyword: a, params: i, schemaPath: o, parentSchema: c, ...d } = r;
    let { message: u = "" } = d, f = s.replace(/\//g, "."), h = `${f} ${u}`.trim();
    const m = [
      ...((n = i.deps) === null || n === void 0 ? void 0 : n.split(", ")) || [],
      i.missingProperty,
      i.property
    ].filter((b) => b);
    if (m.length > 0)
      m.forEach((b) => {
        const $ = f ? `${f}.${b}` : b;
        let y = ae(G(t, `${$.replace(/^\./, "")}`)).title;
        if (y === void 0) {
          const p = o.replace(/\/properties\//g, "/").split("/").slice(1, -1).concat([b]);
          y = ae(G(t, p)).title;
        }
        if (y)
          u = u.replace(`'${b}'`, `'${y}'`);
        else {
          const p = G(c, [Ne, b, "title"]);
          p && (u = u.replace(`'${b}'`, `'${p}'`));
        }
      }), h = u;
    else {
      const b = ae(G(t, `${f.replace(/^\./, "")}`)).title;
      if (b)
        h = `'${b}' ${u}`.trim();
      else {
        const $ = c == null ? void 0 : c.title;
        $ && (h = `'${$}' ${u}`.trim());
      }
    }
    return "missingProperty" in i && (f = f ? `${f}.${i.missingProperty}` : i.missingProperty), {
      name: a,
      property: f,
      message: u,
      params: i,
      stack: h,
      schemaPath: o
    };
  });
}
function $7(e, t, r, n, s, a, i) {
  const { validationError: o } = t;
  let c = v7(t.errors, i);
  o && (c = [...c, { stack: o.message }]), typeof a == "function" && (c = a(c, i));
  let d = J4(c);
  if (o && (d = {
    ...d,
    $schema: {
      __errors: [o.message]
    }
  }), typeof s != "function")
    return { errors: c, errorSchema: d };
  const u = jh(e, n, r, n, !0), f = s(u, Is(u), i), h = cl(f);
  return _s({ errors: c, errorSchema: d }, h);
}
class x7 {
  /** Constructs an `AJV8Validator` instance using the `options`
   *
   * @param options - The `CustomValidatorOptionsType` options that are used to create the AJV instance
   * @param [localizer] - If provided, is used to localize a list of Ajv `ErrorObject`s
   */
  constructor(t, r) {
    const { additionalMetaSchemas: n, customFormats: s, ajvOptionsOverrides: a, ajvFormatOptions: i, AjvClass: o } = t;
    this.ajv = b7(n, s, a, i, o), this.localizer = r;
  }
  /** Resets the internal AJV validator to clear schemas from it. Can be helpful for resetting the validator for tests.
   */
  reset() {
    this.ajv.removeSchema();
  }
  /** Converts an `errorSchema` into a list of `RJSFValidationErrors`
   *
   * @param errorSchema - The `ErrorSchema` instance to convert
   * @param [fieldPath=[]] - The current field path, defaults to [] if not specified
   * @deprecated - Use the `toErrorList()` function provided by `@rjsf/utils` instead. This function will be removed in
   *        the next major release.
   */
  toErrorList(t, r = []) {
    return kn(t, r);
  }
  /** Runs the pure validation of the `schema` and `formData` without any of the RJSF functionality. Provided for use
   * by the playground. Returns the `errors` from the validation
   *
   * @param schema - The schema against which to validate the form data   * @param schema
   * @param formData - The form data to validate
   */
  rawValidation(t, r) {
    var n, s;
    let a, i;
    t[Wt] && (i = this.ajv.getSchema(t[Wt]));
    try {
      i === void 0 && (i = this.ajv.compile(t)), i(r);
    } catch (c) {
      a = c;
    }
    let o;
    return i && (typeof this.localizer == "function" && (((n = i.errors) !== null && n !== void 0 ? n : []).forEach((c) => {
      var d;
      ["missingProperty", "property"].forEach((u) => {
        var f;
        !((f = c.params) === null || f === void 0) && f[u] && (c.params[u] = `'${c.params[u]}'`);
      }), !((d = c.params) === null || d === void 0) && d.deps && (c.params.deps = c.params.deps.split(", ").map((u) => `'${u}'`).join(", "));
    }), this.localizer(i.errors), ((s = i.errors) !== null && s !== void 0 ? s : []).forEach((c) => {
      var d;
      ["missingProperty", "property"].forEach((u) => {
        var f;
        !((f = c.params) === null || f === void 0) && f[u] && (c.params[u] = c.params[u].slice(1, -1));
      }), !((d = c.params) === null || d === void 0) && d.deps && (c.params.deps = c.params.deps.split(", ").map((u) => u.slice(1, -1)).join(", "));
    })), o = i.errors || void 0, i.errors = null), {
      errors: o,
      validationError: a
    };
  }
  /** This function processes the `formData` with an optional user contributed `customValidate` function, which receives
   * the form data and a `errorHandler` function that will be used to add custom validation errors for each field. Also
   * supports a `transformErrors` function that will take the raw AJV validation errors, prior to custom validation and
   * transform them in what ever way it chooses.
   *
   * @param formData - The form data to validate
   * @param schema - The schema against which to validate the form data
   * @param [customValidate] - An optional function that is used to perform custom validation
   * @param [transformErrors] - An optional function that is used to transform errors after AJV validation
   * @param [uiSchema] - An optional uiSchema that is passed to `transformErrors` and `customValidate`
   */
  validateFormData(t, r, n, s, a) {
    const i = this.rawValidation(r, t);
    return $7(this, i, t, r, n, s, a);
  }
  /**
   * This function checks if a schema needs to be added and if the root schemas don't match it removes the old root schema from the ajv instance and adds the new one.
   * @param rootSchema - The root schema used to provide $ref resolutions
   */
  handleSchemaUpdate(t) {
    var r, n;
    const s = (r = t[Wt]) !== null && r !== void 0 ? r : cf;
    this.ajv.getSchema(s) === void 0 ? this.ajv.addSchema(t, s) : we(t, (n = this.ajv.getSchema(s)) === null || n === void 0 ? void 0 : n.schema) || (this.ajv.removeSchema(s), this.ajv.addSchema(t, s));
  }
  /** Validates data against a schema, returning true if the data is valid, or
   * false otherwise. If the schema is invalid, then this function will return
   * false.
   *
   * @param schema - The schema against which to validate the form data
   * @param formData - The form data to validate
   * @param rootSchema - The root schema used to provide $ref resolutions
   */
  isValid(t, r, n) {
    var s;
    try {
      this.handleSchemaUpdate(n);
      const a = dl(t), i = (s = a[Wt]) !== null && s !== void 0 ? s : B4(a);
      let o;
      return o = this.ajv.getSchema(i), o === void 0 && (o = this.ajv.addSchema(a, i).getSchema(i) || this.ajv.compile(a)), o(r);
    } catch (a) {
      return console.warn("Error encountered compiling schema:", a), !1;
    }
  }
}
function w7(e = {}, t) {
  return new x7(e, t);
}
const _7 = w7(), Ka = (e, t) => {
  var c;
  if (!t) return "image";
  const r = e.toLowerCase();
  if (t.startsWith("data:"))
    return t.startsWith("data:image") ? "image" : t.startsWith("data:video") ? "video" : t.startsWith("data:audio") ? "audio" : "file";
  const n = ((c = t.split(".").pop()) == null ? void 0 : c.toLowerCase()) || "", s = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "webp",
    "bmp",
    "svg",
    "ico",
    "tiff"
  ], a = [
    "mp4",
    "mov",
    "avi",
    "webm",
    "mkv",
    "flv",
    "wmv",
    "m4v",
    "3gp"
  ], i = ["mp3", "wav", "ogg", "aac", "flac", "m4a", "wma"], o = [
    "pdf",
    "doc",
    "docx",
    "txt",
    "rtf",
    "odt",
    "xls",
    "xlsx",
    "ppt",
    "pptx"
  ];
  return s.includes(n) ? "image" : a.includes(n) ? "video" : i.includes(n) ? "audio" : o.includes(n) ? "document" : r.includes("image") || r.includes("avatar") || r.includes("logo") || r.includes("icon") ? "image" : r.includes("video") ? "video" : r.includes("audio") || r.includes("sound") ? "audio" : r.includes("document") || r.includes("pdf") || r.includes("doc") ? "document" : "file";
}, nc = (e, t) => {
  const r = e.toLowerCase(), n = Ka(e, t);
  if (r.includes("image") || r.includes("avatar") || r.includes("logo") || r.includes("icon"))
    return "image/*";
  if (r.includes("video"))
    return "video/*";
  if (r.includes("audio") || r.includes("sound"))
    return "audio/*";
  if (r.includes("document") || r.includes("pdf") || r.includes("doc"))
    return ".pdf,.doc,.docx,.txt,.rtf,.odt,.xls,.xlsx,.ppt,.pptx";
  switch (n) {
    case "image":
      return "image/*";
    case "video":
      return "video/*";
    case "audio":
      return "audio/*";
    case "document":
      return ".pdf,.doc,.docx,.txt,.rtf,.odt,.xls,.xlsx,.ppt,.pptx";
    default:
      return "*/*";
  }
}, Hu = (e, t) => {
  const r = e.toLowerCase(), s = [
    "src",
    "source",
    "file",
    "image",
    "url",
    "avatar",
    "logo",
    "icon",
    "video",
    "audio",
    "media",
    "background",
    "poster",
    "thumbnail"
  ].some(
    (i) => r.includes(i)
  ), a = typeof t == "string" && (t.startsWith("data:") || // Data URLs
  t.startsWith("blob:") || // Blob URLs
  t.match(
    /\.(jpg|jpeg|png|gif|webp|bmp|svg|mp4|mov|avi|webm|mkv|mp3|wav|ogg|pdf|doc|docx|txt|rtf)$/i
  ) || // File extensions
  t.match(
    /\/[^/]+\.(jpg|jpeg|png|gif|webp|bmp|svg|mp4|mov|avi|webm|mkv|mp3|wav|ogg|pdf|doc|docx|txt|rtf)(\?.*)?$/i
  ));
  return s || a;
}, sc = (e) => typeof e == "string" && /^\[.*\]$/.test(e), j7 = (e) => {
  if (!sc(e)) return [];
  const t = e.match(/^\[(.*)\]$/);
  return t ? t[1].split(",").map((r) => r.trim()).filter((r) => r.length > 0) : [];
}, S7 = (e, t) => {
  const r = e.toLowerCase(), s = [
    "select",
    "option",
    "choice",
    "dropdown",
    "picker",
    "type",
    "category",
    "status",
    "state",
    "mode"
  ].some(
    (i) => r.includes(i)
  ), a = typeof t == "string" && (t.startsWith("/api/") || // API endpoint
  sc(t) || // Static options array
  t.includes("|") || // Pipe-separated values
  t.includes(",") && t.split(",").length <= 10);
  return s || a;
}, N7 = (e, t) => {
  const r = typeof t, n = e.toLowerCase(), s = {
    title: e.replace(/([A-Z])/g, " $1").replace(/^./, (i) => i.toUpperCase()),
    default: t
  };
  if (Hu(e, t))
    return s.type = "string", s.format = "uri", s;
  if (r === "string") {
    if (s.type = "string", S7(e, t)) {
      if (t && t.startsWith("/api/"))
        s.description = "API Endpoint", s["x-dynamic-select"] = !0;
      else if (sc(t)) {
        const o = j7(t);
        o.length > 0 && (s.enum = o);
      }
    }
    n.includes("email") ? s.format = "email" : n.includes("color") ? s.format = "color" : n.includes("date") && !n.includes("datetime") ? s.format = "date" : n.includes("datetime") ? s.format = "datetime" : (n.includes("url") || n.includes("link")) && (s.format = "uri"), t && (t.length > 50 || n.includes("content") || n.includes("description")) && (s.format = "textarea");
  } else if (r === "number")
    s.type = "number";
  else if (r === "boolean")
    s.type = "boolean";
  else if (Array.isArray(t))
    if (s.type = "array", t.length > 0 && typeof t[0] == "object" && t[0] !== null) {
      const i = t[0], o = Object.keys(i);
      o.every((d) => {
        const u = i[d];
        return typeof u == "string" || typeof u == "number" || typeof u == "boolean" || u === null;
      }) && o.length > 0 ? (s.items = {
        type: "object",
        properties: o.reduce((d, u) => {
          const f = i[u], h = typeof f, m = {
            title: u.replace(/([A-Z])/g, " $1").replace(/^./, (b) => b.toUpperCase())
          };
          return h === "string" ? (m.type = "string", Hu(u, f) && (m.format = "uri")) : h === "number" ? m.type = "number" : h === "boolean" ? m.type = "boolean" : m.type = "string", d[u] = m, d;
        }, {})
      }, s["x-array-of-objects"] = !0) : (s.items = { type: "object" }, s.format = "json");
    } else t.length > 0 && typeof t[0] == "string" ? (s.items = { type: "string" }, t.every((i) => typeof i == "string") && t.length <= 10 && (s.enum = t)) : s.items = { type: "string" };
  else r === "object" && t !== null ? (s.type = "object", s.format = "json") : s.type = "string";
  return s;
}, or = (e) => {
  const t = {}, r = [];
  return Object.entries(e).forEach(([n, s]) => {
    const a = {
      title: n.charAt(0).toUpperCase() + n.slice(1)
    };
    if (Array.isArray(s))
      if (s.length === 0)
        a.type = "array", a.items = { type: "string" };
      else {
        const i = s[0];
        typeof i == "object" && i !== null && !Array.isArray(i) ? (a.type = "array", a.items = {
          type: "object",
          properties: or(i).properties
        }, console.log(`Detected array of objects for ${n}:`, a)) : (a.type = "string", a.enum = s, console.log(`Detected select field for ${n} with options:`, s));
      }
    else if (typeof s == "string") {
      if (a.type = "string", s.startsWith("http") || s.startsWith("/") || s.includes(".")) {
        const i = n.toLowerCase();
        i.includes("image") || i.includes("avatar") || i.includes("photo") ? a.format = "uri" : i.includes("color") ? a.format = "color" : s.includes("@") && i.includes("email") ? a.format = "email" : i.includes("date") && (a.format = "date");
      }
    } else typeof s == "number" ? a.type = "number" : typeof s == "boolean" ? a.type = "boolean" : typeof s == "object" && s !== null ? (a.type = "object", a.properties = or(s).properties) : a.type = "string";
    t[n] = a;
  }), {
    type: "object",
    properties: t,
    required: r
  };
}, Ju = (e) => {
  const t = {};
  return Object.entries(e.properties || {}).forEach(
    ([r, n]) => {
      if (t[r] = {}, n.type === "array")
        n.items && n.items.type === "object" ? t[r]["ui:widget"] = "ArrayOfObjectsWidget" : t[r]["ui:widget"] = "array";
      else if (n.format === "uri") {
        const s = r.toLowerCase();
        s.includes("image") || s.includes("avatar") || s.includes("photo") || s.includes("video") || s.includes("audio"), t[r]["ui:widget"] = "FileWidget";
      } else n.format === "color" ? t[r]["ui:widget"] = "CustomColorWidget" : n.enum ? t[r]["ui:widget"] = "CustomSelectWidget" : n.type === "boolean" ? t[r]["ui:widget"] = "CustomCheckboxWidget" : n.format === "textarea" ? t[r]["ui:widget"] = "CustomTextareaWidget" : n.type === "number" ? t[r]["ui:widget"] = "CustomNumberWidget" : n.format === "email" ? t[r]["ui:widget"] = "CustomEmailWidget" : n.format === "date" && (t[r]["ui:widget"] = "CustomDateWidget");
    }
  ), t;
}, E7 = (e, t) => {
  const r = e.toLowerCase(), s = [
    "binding",
    "datasource",
    "dataSource",
    "api",
    "endpoint",
    "url",
    "source"
  ].some(
    (i) => r.includes(i)
  ), a = typeof t == "string" && (t.startsWith("/api/") || t.startsWith("http://") || t.startsWith("https://") || t.startsWith("data://") || t.includes("${") || // Template literal
  t.startsWith("{"));
  return s || a;
}, O7 = (e) => {
  const {
    id: t,
    classNames: r,
    label: n,
    help: s,
    required: a,
    description: i,
    errors: o,
    children: c
  } = e;
  return /* @__PURE__ */ l.jsxs("div", { className: `mb-6 ${r}`, children: [
    n && /* @__PURE__ */ l.jsxs(
      "label",
      {
        htmlFor: t,
        className: "block text-sm font-medium text-gray-700 mb-2",
        children: [
          n,
          a && /* @__PURE__ */ l.jsx("span", { className: "text-red-500 ml-1", children: "*" })
        ]
      }
    ),
    /* @__PURE__ */ l.jsx("div", { className: "w-full", children: c }),
    i && /* @__PURE__ */ l.jsx("div", { className: "text-xs text-gray-500 mt-1", children: i }),
    o && /* @__PURE__ */ l.jsx("div", { className: "text-xs text-red-600 mt-1", children: o }),
    s && /* @__PURE__ */ l.jsx("div", { className: "text-xs text-blue-600 mt-1", children: s })
  ] });
}, C7 = (e) => {
  const [t, r] = fe.useState(!1), [n, s] = fe.useState(e.value || ""), [a, i] = fe.useState(""), [o, c] = fe.useState(/* @__PURE__ */ new Set()), [d, u] = fe.useState(0);
  fe.useEffect(() => {
    s(e.value || ""), e.value || i("");
  }, [e.value]), fe.useEffect(() => () => {
    o.forEach((g) => {
      g.startsWith("blob:") && URL.revokeObjectURL(g);
    });
  }, [o]);
  const f = async (g) => {
    var _;
    const v = (_ = g.target.files) == null ? void 0 : _[0];
    if (v) {
      i(v.name), r(!0), u(0);
      try {
        let w;
        e.onFileUpload ? w = await e.onFileUpload(v, {
          onProgress: (S) => {
            u(S);
          },
          onError: (S) => {
            alert(`Upload failed: ${S.message}`), r(!1), u(0);
          }
        }) : v.type.startsWith("image/") && v.size < 5 * 1024 * 1024 ? w = await new Promise((S) => {
          const O = new FileReader();
          O.onload = (D) => {
            var N;
            return S((N = D.target) == null ? void 0 : N.result);
          }, O.readAsDataURL(v);
        }) : (w = URL.createObjectURL(v), c((S) => /* @__PURE__ */ new Set([...S, w]))), s(w), e.onChange(w), r(!1), u(100);
      } catch (w) {
        console.error("File processing failed:", w), alert("File processing failed"), i(""), r(!1), u(0);
      } finally {
        g.target.value = "";
      }
    }
  }, h = (g) => {
    const v = g.target.value;
    s(v), e.onChange(v), i("");
  }, m = () => {
    n.startsWith("blob:") && o.has(n) && (URL.revokeObjectURL(n), c((g) => {
      const v = new Set(g);
      return v.delete(n), v;
    })), s(""), i(""), u(0), e.onChange("");
  }, b = Ka(e.name, n), $ = nc(e.name, n), p = (() => {
    if (a) return a;
    if (!n) return "";
    try {
      return n.startsWith("data:") ? "Image file" : n.startsWith("blob:") ? "Selected file" : new URL(n).pathname.split("/").pop() || "File";
    } catch {
      const g = n.split("/");
      return g[g.length - 1].split("?")[0] || "File";
    }
  })();
  return /* @__PURE__ */ l.jsxs("div", { className: "space-y-4 w-full", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "space-y-2 w-full", children: [
      /* @__PURE__ */ l.jsx("label", { className: "block text-sm font-medium text-gray-700", children: "File URL" }),
      /* @__PURE__ */ l.jsxs("div", { className: "flex space-x-2 w-full", children: [
        /* @__PURE__ */ l.jsx(
          "input",
          {
            type: "url",
            value: n,
            onChange: h,
            className: "flex-1 min-w-0 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            placeholder: "https://example.com/file.jpg"
          }
        ),
        n && /* @__PURE__ */ l.jsx(
          "button",
          {
            type: "button",
            onClick: m,
            className: "flex-shrink-0 px-4 py-3 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600 transition-colors whitespace-nowrap",
            children: "Clear"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "space-y-2 w-full", children: [
      /* @__PURE__ */ l.jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
        /* @__PURE__ */ l.jsxs("div", { className: "flex gap-2 w-full", children: [
          /* @__PURE__ */ l.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ l.jsx(
            "input",
            {
              type: "file",
              onChange: f,
              disabled: t,
              accept: $,
              className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
            }
          ) }),
          t && /* @__PURE__ */ l.jsx("div", { className: "flex-shrink-0 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg text-sm flex items-center whitespace-nowrap", children: /* @__PURE__ */ l.jsxs("span", { children: [
            "Uploading... ",
            d,
            "%"
          ] }) })
        ] }),
        t && /* @__PURE__ */ l.jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: /* @__PURE__ */ l.jsx(
          "div",
          {
            className: "bg-blue-600 h-2 rounded-full transition-all duration-300",
            style: { width: `${d}%` }
          }
        ) }),
        p && /* @__PURE__ */ l.jsx("div", { className: "w-full", children: /* @__PURE__ */ l.jsxs(
          "div",
          {
            className: "text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded border truncate w-full",
            title: p,
            children: [
              "📄 ",
              p
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ l.jsxs("div", { className: "text-xs text-gray-500 flex flex-col sm:flex-row sm:justify-between gap-1", children: [
        /* @__PURE__ */ l.jsxs("span", { className: "truncate", children: [
          "Accepted: ",
          $ === "*/*" ? "All files" : $
        ] }),
        !e.onFileUpload && /* @__PURE__ */ l.jsx("span", { className: "text-orange-600 font-medium whitespace-nowrap", children: "Local preview only" })
      ] })
    ] }),
    n && /* @__PURE__ */ l.jsxs("div", { className: "space-y-2 w-full", children: [
      /* @__PURE__ */ l.jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Preview" }),
      /* @__PURE__ */ l.jsxs("div", { className: "border border-gray-200 rounded-lg p-4 w-full overflow-hidden", children: [
        b === "image" && /* @__PURE__ */ l.jsxs("div", { className: "flex flex-col items-center space-y-3 w-full", children: [
          /* @__PURE__ */ l.jsx("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ l.jsx(
            "img",
            {
              src: n,
              alt: "Preview",
              className: "max-w-full max-h-48 object-contain rounded",
              onError: (g) => {
                g.target.style.display = "none";
                const v = g.target.parentElement;
                if (v) {
                  const _ = document.createElement("div");
                  _.className = "text-center py-4", _.innerHTML = `
                          <div class="text-3xl mb-2">🖼️</div>
                          <div class="text-sm text-gray-600">Image preview not available</div>
                        `, v.appendChild(_);
                }
              }
            }
          ) }),
          p && /* @__PURE__ */ l.jsx("div", { className: "text-sm text-gray-600 text-center truncate w-full max-w-full px-2", children: p })
        ] }),
        b === "video" && /* @__PURE__ */ l.jsxs("div", { className: "flex flex-col items-center space-y-3 w-full", children: [
          /* @__PURE__ */ l.jsx("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ l.jsx(
            "video",
            {
              src: n,
              controls: !0,
              className: "max-w-full max-h-48 rounded"
            }
          ) }),
          p && /* @__PURE__ */ l.jsx("div", { className: "text-sm text-gray-600 text-center truncate w-full max-w-full px-2", children: p })
        ] }),
        b === "audio" && /* @__PURE__ */ l.jsxs("div", { className: "flex flex-col items-center space-y-3 w-full", children: [
          /* @__PURE__ */ l.jsx("div", { className: "w-full", children: /* @__PURE__ */ l.jsx("audio", { src: n, controls: !0, className: "w-full" }) }),
          p && /* @__PURE__ */ l.jsx("div", { className: "text-sm text-gray-600 text-center truncate w-full max-w-full px-2", children: p })
        ] }),
        (b === "document" || b === "file") && /* @__PURE__ */ l.jsxs("div", { className: "text-center py-4 w-full", children: [
          /* @__PURE__ */ l.jsx("div", { className: "text-3xl mb-2", children: b === "document" ? "📄" : "📎" }),
          p && /* @__PURE__ */ l.jsx("div", { className: "text-sm text-gray-600 truncate w-full max-w-full px-2", children: p })
        ] })
      ] })
    ] })
  ] });
}, A7 = (e) => {
  const {
    schema: t,
    /*options,*/
    value: r,
    onChange: n,
    onGetSelectOptions: s
  } = e, a = t.enum || [], [i, o] = fe.useState([]);
  fe.useEffect(() => {
    s && (t["x-dynamic-select"] || t["x-list-reference"]) && (async () => {
      try {
        const u = await s(t);
        o(u || []);
      } catch (u) {
        console.error("Failed to fetch select options:", u);
      }
    })();
  }, [t, s]);
  const c = [...a, ...i];
  return /* @__PURE__ */ l.jsxs("select", { value: r, onChange: (d) => n(d.target.value), children: [
    /* @__PURE__ */ l.jsx("option", { value: "", children: "Select an option" }),
    c.map((d, u) => /* @__PURE__ */ l.jsx("option", { value: d.value || d, children: d.label || d }, u))
  ] });
}, P7 = (e) => {
  const [t, r] = fe.useState(
    typeof e.value == "string" ? e.value : JSON.stringify(e.value, null, 2)
  );
  fe.useEffect(() => {
    r(
      typeof e.value == "string" ? e.value : JSON.stringify(e.value, null, 2)
    );
  }, [e.value]);
  const n = (a) => {
    const i = a.target.value;
    r(i);
    try {
      if (i.trim() === "")
        e.onChange(void 0);
      else if (i.trim().startsWith("{") || i.trim().startsWith("[")) {
        const o = JSON.parse(i);
        e.onChange(o);
      } else
        e.onChange(i);
    } catch {
      e.onChange(i);
    }
  }, s = () => {
    try {
      const a = JSON.stringify(JSON.parse(t), null, 2);
      r(a), e.onChange(JSON.parse(a));
    } catch {
    }
  };
  return /* @__PURE__ */ l.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ l.jsx(
      "textarea",
      {
        value: t,
        onChange: n,
        rows: 8,
        className: "w-full p-3 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        placeholder: "Enter JSON data..."
      }
    ),
    /* @__PURE__ */ l.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ l.jsx(
      "button",
      {
        type: "button",
        onClick: s,
        className: "px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors",
        children: "Format JSON"
      }
    ) })
  ] });
}, T7 = (e) => {
  var W;
  const [t, r] = fe.useState(e.value || []), [n, s] = fe.useState([]), [a, i] = fe.useState(
    {}
  ), [o, c] = fe.useState(
    /* @__PURE__ */ new Set()
  ), [d, u] = fe.useState(!1), [f, h] = fe.useState(!1), [m, b] = fe.useState(
    e.value || []
  );
  fe.useEffect(() => {
    const I = e.value || [];
    r(I), b(I);
    const { keys: P, schemas: k } = g(
      e.schema,
      I
    );
    s(P), i(k), h(!1);
  }, [e.schema, (W = e.value) == null ? void 0 : W.length]);
  const $ = (I, P, k) => {
    const V = [...m];
    V[I] = { ...V[I], [P]: k }, b(V), h(!0);
    const q = [...t];
    q[I] = { ...q[I], [P]: k }, r(q);
  }, y = () => {
    e.onChange(m), r(m), h(!1);
  }, p = () => {
    const I = e.value || [];
    b(I), r(I), h(!1);
  }, g = (I, P) => {
    const k = [], V = {};
    if (I.items && I.items.properties)
      Object.entries(I.items.properties).forEach(
        ([q, Z]) => {
          k.push(q), V[q] = Z;
        }
      );
    else if (P && P.length > 0 && typeof P[0] == "object") {
      const q = P[0];
      Object.keys(q).forEach((Z) => {
        k.push(Z), V[Z] = N7(Z, q[Z]);
      });
    } else
      ["name", "value", "label", "key"].forEach((Z) => {
        k.push(Z), V[Z] = { type: "string", title: Z };
      });
    return { keys: k, schemas: V };
  }, v = (I, P, k) => {
    const V = P.format || "", q = P.type || "string";
    return V === "file" || V === "uri" || I.toLowerCase().includes("url") || I.toLowerCase().includes("image") || I.toLowerCase().includes("video") || I.toLowerCase().includes("audio") || I.toLowerCase().includes("file") || I.toLowerCase().includes("src") || I.toLowerCase().includes("icon") || I.toLowerCase().includes("avatar") || I.toLowerCase().includes("logo") || I.toLowerCase().includes("thumbnail") || I.toLowerCase().includes("media") || typeof k == "string" && (k.startsWith("http") || k.startsWith("data:") || k.startsWith("blob:") || k.includes("/uploads/") || k.includes("/images/") || k.includes("/media/") || /\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|ogg|mp3|wav|pdf|doc|docx)$/i.test(
      k
    )) ? "file" : V === "color" ? "color" : V === "email" ? "email" : V === "uri" || V === "url" ? "url" : V === "date" ? "date" : V === "datetime" ? "datetime-local" : q === "number" ? "number" : V === "select" || V === "dynamic-select" ? "select" : "text";
  }, _ = (I) => {
    const [P, k] = fe.useState(
      I.value || ""
    ), [V, q] = fe.useState(""), [Z, M] = fe.useState(/* @__PURE__ */ new Set()), [E, F] = fe.useState(!1), [C, x] = fe.useState(0);
    fe.useEffect(() => {
      k(I.value || ""), I.value || q("");
    }, [I.value]), fe.useEffect(() => () => {
      Z.forEach((de) => {
        de.startsWith("blob:") && URL.revokeObjectURL(de);
      });
    }, [Z]);
    const j = async (de) => {
      var Me;
      const ge = (Me = de.target.files) == null ? void 0 : Me[0];
      if (ge) {
        q(ge.name), F(!0), x(0);
        try {
          let je;
          I.onFileUpload ? je = await I.onFileUpload(ge, {
            onProgress: (Fe) => {
              x(Fe);
            },
            onError: (Fe) => {
              console.error("Upload error:", Fe), alert(`Upload failed: ${Fe.message}`), F(!1), x(0);
            }
          }) : ge.type.startsWith("image/") && ge.size < 5 * 1024 * 1024 ? je = await new Promise((Fe) => {
            const lt = new FileReader();
            lt.onload = (Ft) => {
              var Rt;
              return Fe((Rt = Ft.target) == null ? void 0 : Rt.result);
            }, lt.readAsDataURL(ge);
          }) : (je = URL.createObjectURL(ge), M((Fe) => /* @__PURE__ */ new Set([...Fe, je]))), k(je), I.onChange(je), F(!1), x(100);
        } catch (je) {
          console.error("File processing failed:", je), q(""), F(!1), x(0);
        } finally {
          de.target.value = "";
        }
      }
    }, T = (de) => {
      const ge = de.target.value;
      k(ge), I.onChange(ge), q("");
    }, z = () => {
      P.startsWith("blob:") && Z.has(P) && (URL.revokeObjectURL(P), M((de) => {
        const ge = new Set(de);
        return ge.delete(P), ge;
      })), k(""), q(""), x(0), I.onChange("");
    }, ne = (() => {
      if (V) return V;
      if (!P) return "";
      try {
        return P.startsWith("data:") ? "Image file" : P.startsWith("blob:") ? "Selected file" : new URL(P).pathname.split("/").pop() || "File";
      } catch {
        const de = P.split("/");
        return de[de.length - 1].split("?")[0] || "File";
      }
    })(), X = Ka(I.name, P), me = nc(I.name, P);
    return /* @__PURE__ */ l.jsxs("div", { className: "space-y-3 w-full", children: [
      /* @__PURE__ */ l.jsx("div", { className: "space-y-2 w-full", children: /* @__PURE__ */ l.jsxs("div", { className: "flex space-x-2 w-full", children: [
        /* @__PURE__ */ l.jsx(
          "input",
          {
            type: "url",
            value: P,
            onChange: T,
            className: "flex-1 min-w-0 p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
            placeholder: "https://example.com/file.jpg"
          }
        ),
        P && /* @__PURE__ */ l.jsx(
          "button",
          {
            type: "button",
            onClick: z,
            className: "flex-shrink-0 px-3 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors whitespace-nowrap",
            children: "Clear"
          }
        )
      ] }) }),
      /* @__PURE__ */ l.jsxs("div", { className: "space-y-2 w-full", children: [
        /* @__PURE__ */ l.jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
          /* @__PURE__ */ l.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ l.jsx(
            "input",
            {
              type: "file",
              onChange: j,
              disabled: E,
              accept: me,
              className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
            }
          ) }),
          E && /* @__PURE__ */ l.jsx("div", { className: "flex-shrink-0 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg text-sm flex items-center whitespace-nowrap", children: /* @__PURE__ */ l.jsxs("span", { children: [
            "Uploading... ",
            C,
            "%"
          ] }) }),
          ne && /* @__PURE__ */ l.jsx("div", { className: "w-full", children: /* @__PURE__ */ l.jsxs(
            "div",
            {
              className: "text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded border truncate",
              title: ne,
              children: [
                "📄 ",
                ne
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ l.jsxs("div", { className: "text-xs text-gray-500 flex justify-between", children: [
          /* @__PURE__ */ l.jsxs("span", { children: [
            "Accepted: ",
            me === "*/*" ? "All files" : me
          ] }),
          !I.onFileUpload && /* @__PURE__ */ l.jsx("span", { className: "text-orange-600", children: "Local preview only" })
        ] })
      ] }),
      P && (X === "image" || X === "video" || X === "audio") && /* @__PURE__ */ l.jsxs("div", { className: "space-y-2 w-full", children: [
        /* @__PURE__ */ l.jsx("label", { className: "block text-xs font-medium text-gray-700", children: "Preview" }),
        /* @__PURE__ */ l.jsxs("div", { className: "border border-gray-200 rounded p-2 w-full bg-gray-50", children: [
          X === "image" && /* @__PURE__ */ l.jsx("div", { className: "flex flex-col items-center space-y-2", children: /* @__PURE__ */ l.jsx(
            "img",
            {
              src: P,
              alt: "Preview",
              className: "max-w-full max-h-32 object-contain rounded",
              onError: (de) => {
                de.target.style.display = "none";
                const ge = de.target.parentElement;
                if (ge) {
                  const Me = document.createElement("div");
                  Me.className = "text-center py-2", Me.innerHTML = `
                        <div class="text-xl mb-1">🖼️</div>
                        <div class="text-xs text-gray-600">Preview not available</div>
                      `, ge.appendChild(Me);
                }
              }
            }
          ) }),
          X === "video" && /* @__PURE__ */ l.jsx("div", { className: "flex flex-col items-center space-y-2", children: /* @__PURE__ */ l.jsx(
            "video",
            {
              src: P,
              controls: !0,
              className: "max-w-full max-h-32 rounded"
            }
          ) }),
          X === "audio" && /* @__PURE__ */ l.jsx("div", { className: "w-full", children: /* @__PURE__ */ l.jsx("audio", { src: P, controls: !0, className: "w-full" }) })
        ] })
      ] }),
      P && (X === "document" || X === "file") && /* @__PURE__ */ l.jsxs("div", { className: "space-y-2 w-full", children: [
        /* @__PURE__ */ l.jsx("label", { className: "block text-xs font-medium text-gray-700", children: "Preview" }),
        /* @__PURE__ */ l.jsxs("div", { className: "border border-gray-200 rounded p-3 bg-gray-50 text-center", children: [
          /* @__PURE__ */ l.jsx("div", { className: "text-2xl mb-1", children: X === "document" ? "📄" : "📎" }),
          ne && /* @__PURE__ */ l.jsx("div", { className: "text-xs text-gray-600 truncate", children: ne })
        ] })
      ] })
    ] });
  }, w = (I, P, k, V) => {
    const q = v(I, P, k), Z = `Enter ${I}`;
    switch (q) {
      case "color":
        return /* @__PURE__ */ l.jsxs("div", { className: "flex space-x-2 items-center", children: [
          /* @__PURE__ */ l.jsx(
            "input",
            {
              type: "color",
              value: k || "#000000",
              onChange: (E) => V(E.target.value),
              className: "w-8 h-8 border border-gray-300 rounded cursor-pointer"
            }
          ),
          /* @__PURE__ */ l.jsx(
            "input",
            {
              type: "text",
              value: k,
              onChange: (E) => V(E.target.value),
              className: "flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
              placeholder: Z
            }
          )
        ] });
      case "select":
        const M = P.enum || [];
        return /* @__PURE__ */ l.jsxs(
          "select",
          {
            value: k || "",
            onChange: (E) => V(E.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
            children: [
              /* @__PURE__ */ l.jsxs("option", { value: "", children: [
                "Select ",
                I
              ] }),
              M.map((E) => /* @__PURE__ */ l.jsx("option", { value: E, children: E }, E))
            ]
          }
        );
      case "file":
        return /* @__PURE__ */ l.jsx(
          _,
          {
            value: k,
            onChange: V,
            onFileUpload: e.onFileUpload,
            schema: P,
            name: I
          }
        );
      case "date":
        return /* @__PURE__ */ l.jsx(
          "input",
          {
            type: "date",
            value: k || "",
            onChange: (E) => V(E.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          }
        );
      case "datetime-local":
        return /* @__PURE__ */ l.jsx(
          "input",
          {
            type: "datetime-local",
            value: k || "",
            onChange: (E) => V(E.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          }
        );
      default:
        return /* @__PURE__ */ l.jsx(
          "input",
          {
            type: q,
            value: k || "",
            onChange: (E) => V(E.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
            placeholder: Z,
            step: q === "number" ? "any" : void 0
          }
        );
    }
  }, S = (I) => {
    const P = new Set(o);
    P.has(I) ? P.delete(I) : P.add(I), c(P);
  }, O = () => {
    if (d)
      c(/* @__PURE__ */ new Set());
    else {
      const I = new Set(t.map((P, k) => k));
      c(I);
    }
    u(!d);
  }, D = () => {
    if (o.size === 0) return;
    const I = m.filter(
      (P, k) => !o.has(k)
    );
    b(I), r(I), c(/* @__PURE__ */ new Set()), u(!1), h(!0);
  }, N = () => {
    const I = n.reduce((k, V) => {
      var Z;
      const q = ((Z = a[V]) == null ? void 0 : Z.default) || "";
      return k[V] = q, k;
    }, {}), P = [...m, I];
    b(P), r(P), h(!0);
  }, A = (I) => {
    const P = m.filter((V, q) => q !== I);
    b(P), r(P);
    const k = new Set(o);
    k.delete(I), c(k), h(!0);
  }, R = () => {
    b([]), r([]), c(/* @__PURE__ */ new Set()), u(!1), h(!0);
  }, L = (I, P) => P.description ? P.description : P.format === "select" ? "Select field" : P.format === "dynamic-select" ? "Dynamic select field" : P.format === "file" ? "File field" : "";
  return /* @__PURE__ */ l.jsxs("div", { className: "space-y-4 w-full", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ l.jsx("div", { className: "flex items-center space-x-4", children: t.length > 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ l.jsx(
            "input",
            {
              type: "checkbox",
              checked: d,
              onChange: O,
              className: "w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            }
          ),
          /* @__PURE__ */ l.jsx("span", { className: "ml-2 text-sm text-gray-700", children: "Select All" })
        ] }),
        o.size > 0 && /* @__PURE__ */ l.jsxs(
          "button",
          {
            type: "button",
            onClick: D,
            className: "px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors",
            children: [
              "Delete Selected (",
              o.size,
              ")"
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ l.jsxs("div", { className: "flex space-x-2", children: [
        f && /* @__PURE__ */ l.jsxs("div", { className: "flex space-x-2", children: [
          /* @__PURE__ */ l.jsxs(
            "button",
            {
              type: "button",
              onClick: y,
              className: "px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors flex items-center",
              children: [
                /* @__PURE__ */ l.jsx("span", { children: "Apply Changes" }),
                f && /* @__PURE__ */ l.jsx("span", { className: "ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full", children: "●" })
              ]
            }
          ),
          /* @__PURE__ */ l.jsx(
            "button",
            {
              type: "button",
              onClick: p,
              className: "px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors",
              children: "Reset"
            }
          )
        ] }),
        /* @__PURE__ */ l.jsx(
          "button",
          {
            type: "button",
            onClick: N,
            className: "px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors",
            children: "Add Item"
          }
        ),
        t.length > 0 && /* @__PURE__ */ l.jsx(
          "button",
          {
            type: "button",
            onClick: R,
            className: "px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors",
            children: "Clear All"
          }
        )
      ] })
    ] }),
    f && /* @__PURE__ */ l.jsx("div", { className: "p-3 bg-yellow-50 border border-yellow-200 rounded-lg", children: /* @__PURE__ */ l.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ l.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ l.jsx("span", { className: "text-yellow-700 text-sm", children: '⚠️ You have unsaved changes. Click "Apply Changes" to save.' }) }) }) }),
    t.length === 0 ? /* @__PURE__ */ l.jsxs("div", { className: "text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg w-full", children: [
      /* @__PURE__ */ l.jsx("div", { className: "text-5xl mb-3", children: "📝" }),
      /* @__PURE__ */ l.jsx("p", { className: "text-base mb-1", children: "No items added yet" }),
      /* @__PURE__ */ l.jsx("p", { className: "text-sm", children: 'Click "Add Item" to get started' })
    ] }) : /* @__PURE__ */ l.jsx("div", { className: "space-y-4 w-full", children: t.map((I, P) => /* @__PURE__ */ l.jsxs(
      "div",
      {
        className: `border rounded-lg p-4 bg-slate-50 shadow-sm w-full transition-all ${o.has(P) ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200" : "border-gray-200 hover:border-gray-300"}`,
        children: [
          /* @__PURE__ */ l.jsxs("div", { className: "flex justify-between items-center mb-4 pb-3 border-b border-gray-200", children: [
            /* @__PURE__ */ l.jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ l.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: o.has(P),
                  onChange: () => S(P),
                  className: "w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                }
              ),
              /* @__PURE__ */ l.jsxs("h4", { className: "font-medium text-gray-700 text-sm", children: [
                "Item ",
                P + 1
              ] })
            ] }),
            /* @__PURE__ */ l.jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ l.jsxs("div", { className: "flex space-x-1", children: [
                n.includes("name") && n.includes("value") && /* @__PURE__ */ l.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      const k = I.name || `Item ${P + 1}`, V = I.value || `value${P + 1}`;
                      $(P, "name", k), $(P, "value", V);
                    },
                    className: "px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors",
                    title: "Auto-fill name and value",
                    children: "Auto-fill"
                  }
                ),
                n.includes("label") && !I.label && I.name && /* @__PURE__ */ l.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      $(P, "label", I.name);
                    },
                    className: "px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors",
                    title: "Use name as label",
                    children: "Use as Label"
                  }
                )
              ] }),
              /* @__PURE__ */ l.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => A(P),
                  className: "px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors",
                  children: "Delete"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ l.jsx("div", { className: "space-y-4 w-full", children: n.map((k) => {
            const V = a[k] || {}, q = I[k] || "", Z = L(k, V);
            return /* @__PURE__ */ l.jsxs("div", { className: "space-y-2 w-full", children: [
              /* @__PURE__ */ l.jsxs("label", { className: "block text-sm font-medium text-gray-700 capitalize", children: [
                V.title || k.replace(/([A-Z])/g, " $1").toLowerCase(),
                V.format === "file" && " 📁",
                V.format === "select" && " 📋",
                V.format === "dynamic-select" && " 🔄"
              ] }),
              /* @__PURE__ */ l.jsx("div", { className: "w-full", children: w(
                k,
                V,
                q,
                (M) => $(P, k, M)
              ) }),
              Z && /* @__PURE__ */ l.jsx("p", { className: "text-xs text-gray-500", children: Z })
            ] }, k);
          }) })
        ]
      },
      P
    )) }),
    /* @__PURE__ */ l.jsxs("div", { className: "flex justify-between items-center text-sm text-gray-500 pt-2 border-t border-gray-200", children: [
      /* @__PURE__ */ l.jsxs("div", { className: "flex space-x-4", children: [
        /* @__PURE__ */ l.jsxs("span", { children: [
          t.length,
          " item(s) total"
        ] }),
        o.size > 0 && /* @__PURE__ */ l.jsxs("span", { className: "text-blue-600 font-medium", children: [
          o.size,
          " selected"
        ] }),
        f && /* @__PURE__ */ l.jsx("span", { className: "text-yellow-600 font-medium", children: "Unsaved changes" })
      ] }),
      n.length > 0 && /* @__PURE__ */ l.jsxs("span", { children: [
        n.length,
        " fields detected"
      ] })
    ] }),
    f && t.length > 2 && /* @__PURE__ */ l.jsx("div", { className: "sticky bottom-4 mt-6 p-4 bg-white border border-gray-300 rounded-lg shadow-lg", children: /* @__PURE__ */ l.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ l.jsxs("span", { className: "text-sm text-gray-700", children: [
        "You have unsaved changes in ",
        t.length,
        " items"
      ] }),
      /* @__PURE__ */ l.jsxs("div", { className: "flex space-x-2", children: [
        /* @__PURE__ */ l.jsx(
          "button",
          {
            type: "button",
            onClick: p,
            className: "px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors",
            children: "Discard Changes"
          }
        ),
        /* @__PURE__ */ l.jsx(
          "button",
          {
            type: "button",
            onClick: y,
            className: "px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors font-medium",
            children: "Apply All Changes"
          }
        )
      ] })
    ] }) })
  ] });
}, I7 = (e) => /* @__PURE__ */ l.jsx(
  "input",
  {
    type: "text",
    value: e.value || "",
    onChange: (t) => e.onChange(t.target.value),
    className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    placeholder: e.placeholder
  }
), k7 = (e) => {
  var t;
  return /* @__PURE__ */ l.jsx(
    "textarea",
    {
      value: e.value || "",
      onChange: (r) => e.onChange(r.target.value),
      rows: ((t = e.options) == null ? void 0 : t.rows) || 4,
      className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical",
      placeholder: e.placeholder
    }
  );
}, F7 = (e) => /* @__PURE__ */ l.jsx(
  "input",
  {
    type: "number",
    value: e.value || "",
    onChange: (t) => e.onChange(Number(t.target.value)),
    className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    step: e.step || "any"
  }
), R7 = (e) => {
  const t = (n) => {
    if (!n) return "";
    if (typeof n == "string") {
      const s = new Date(n);
      return isNaN(s.getTime()) ? n : s.toISOString().split("T")[0];
    }
    return n;
  }, r = (n) => {
    e.onChange(n.target.value);
  };
  return /* @__PURE__ */ l.jsx(
    "input",
    {
      type: "date",
      value: t(e.value),
      onChange: r,
      className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    }
  );
}, D7 = (e) => {
  const t = (n) => {
    if (!n) return "";
    if (typeof n == "string") {
      const s = new Date(n);
      if (!isNaN(s.getTime())) {
        const a = s.getFullYear(), i = String(s.getMonth() + 1).padStart(2, "0"), o = String(s.getDate()).padStart(2, "0"), c = String(s.getHours()).padStart(2, "0"), d = String(s.getMinutes()).padStart(2, "0");
        return `${a}-${i}-${o}T${c}:${d}`;
      }
      return n;
    }
    return n;
  }, r = (n) => {
    e.onChange(n.target.value);
  };
  return /* @__PURE__ */ l.jsx(
    "input",
    {
      type: "datetime-local",
      value: t(e.value),
      onChange: r,
      className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    }
  );
}, M7 = (e) => /* @__PURE__ */ l.jsx(
  "input",
  {
    type: "email",
    value: e.value || "",
    onChange: (t) => e.onChange(t.target.value),
    className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    placeholder: e.placeholder
  }
), L7 = (e) => /* @__PURE__ */ l.jsx(
  "input",
  {
    type: "url",
    value: e.value || "",
    onChange: (t) => e.onChange(t.target.value),
    className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    placeholder: e.placeholder
  }
), U7 = (e) => /* @__PURE__ */ l.jsxs("div", { className: "flex space-x-3 items-center", children: [
  /* @__PURE__ */ l.jsx(
    "input",
    {
      type: "color",
      value: e.value || "#000000",
      onChange: (t) => e.onChange(t.target.value),
      className: "w-16 h-16 border border-gray-300 rounded-lg cursor-pointer"
    }
  ),
  /* @__PURE__ */ l.jsx(
    "input",
    {
      type: "text",
      value: e.value || "",
      onChange: (t) => e.onChange(t.target.value),
      className: "flex-1 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      placeholder: "#000000"
    }
  )
] }), W7 = (e) => /* @__PURE__ */ l.jsxs("div", { className: "flex items-center", children: [
  /* @__PURE__ */ l.jsx(
    "input",
    {
      type: "checkbox",
      checked: !!e.value,
      onChange: (t) => e.onChange(t.target.checked),
      className: "w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border border-gray-300"
    }
  ),
  /* @__PURE__ */ l.jsx("span", { className: "ml-3 text-sm text-gray-700", children: e.value ? "Enabled" : "Disabled" })
] }), V7 = ({
  selectedInstance: e,
  componentType: t,
  componentProps: r,
  currentProps: n,
  onPropertyChange: s,
  onFileUpload: a,
  onApiCall: i,
  onCustomAction: o,
  onGetSelectOptions: c,
  setSelectedInstance: d,
  setSelectedComponent: u,
  componentSchema: f
}) => {
  const { schema: h, uiSchema: m } = Bt(() => {
    try {
      let w = f;
      (!w || Object.keys(w).length === 0 || !w.properties) && (w = or(r));
      const S = Ju(w);
      return { schema: w, uiSchema: S };
    } catch (w) {
      console.error("Error generating schema:", w);
      const S = or(r), O = Ju(S);
      return { schema: S, uiSchema: O };
    }
  }, [f, r, a]), b = {
    FileWidget: (w) => /* @__PURE__ */ l.jsx(
      C7,
      {
        ...w,
        onFileUpload: a ? (S) => {
          const O = Ka(w.name, w.value), D = nc(w.name, w.value);
          return a(S, {
            onProgress: (N) => {
              console.log(`Upload progress: ${N}%`);
            },
            onError: (N) => {
              console.error("Upload error:", N), alert(`Upload failed: ${N.message}`);
            },
            options: {
              fileType: O,
              fieldName: w.name,
              acceptTypes: D,
              componentType: t
            }
          });
        } : void 0
      }
    ),
    CustomSelectWidget: (w) => /* @__PURE__ */ l.jsx(
      A7,
      {
        ...w,
        onGetSelectOptions: c,
        componentType: t,
        uiSchema: m[w.name]
      }
    ),
    JsonWidget: P7,
    ArrayOfObjectsWidget: (w) => /* @__PURE__ */ l.jsx(
      T7,
      {
        ...w,
        onFileUpload: a ? (S, O, D) => a(S, {
          onProgress: (N) => {
            console.log(`Upload progress: ${N}%`);
          },
          onError: (N) => {
            console.error("Upload error:", N), alert(`Upload failed: ${N.message}`);
          },
          options: {
            fieldName: O || w.name,
            fieldType: D || "file",
            componentType: t,
            isArrayItem: !0
          }
        }) : void 0
      }
    ),
    CustomTextWidget: I7,
    CustomTextareaWidget: k7,
    CustomNumberWidget: F7,
    CustomDateWidget: R7,
    CustomDateTimeWidget: D7,
    CustomEmailWidget: M7,
    CustomURLWidget: L7,
    CustomColorWidget: U7,
    CustomCheckboxWidget: W7
  }, $ = {
    FieldTemplate: O7
  }, y = (w) => typeof w != "string" ? !1 : w.startsWith("/api/"), p = (w) => typeof w != "string" ? !1 : w.toLowerCase().startsWith("/customaction/"), g = async (w, S, O) => {
    if (O)
      try {
        return await O(S);
      } catch (D) {
        throw console.error("API call failed:", D), D;
      }
  }, v = async (w, S, O, D) => {
    if (D)
      try {
        return await D(S, O);
      } catch (N) {
        throw console.error("Custom action failed:", N), N;
      }
  }, _ = () => {
    const w = Object.keys(r).reduce((S, O) => {
      const D = r[O];
      return typeof D == "number" ? S[O] = 0 : typeof D == "boolean" ? S[O] = !1 : Array.isArray(D) ? S[O] = [] : typeof D == "object" ? S[O] = {} : S[O] = "", S;
    }, {});
    s({ formData: w });
  };
  return Object.keys(h).length === 0 ? /* @__PURE__ */ l.jsxs("div", { className: "p-6 text-center text-red-500", children: [
    /* @__PURE__ */ l.jsx("div", { className: "mb-3 text-2xl", children: "❌" }),
    /* @__PURE__ */ l.jsx("p", { className: "text-base", children: "Error generating properties form" }),
    /* @__PURE__ */ l.jsx("p", { className: "text-sm mt-2", children: "Please check the console for details" })
  ] }) : /* @__PURE__ */ l.jsxs("div", { className: "h-full flex flex-col", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "flex-1 overflow-auto p-6", children: [
      /* @__PURE__ */ l.jsx("div", { className: "properties-form", children: /* @__PURE__ */ l.jsx(
        SD,
        {
          schema: h,
          uiSchema: m,
          formData: r,
          onChange: s,
          validator: _7,
          widgets: b,
          templates: $,
          liveValidate: !0,
          children: /* @__PURE__ */ l.jsx("div", { style: { display: "none" } })
        },
        e == null ? void 0 : e.id
      ) }),
      (i || o) && /* @__PURE__ */ l.jsxs("div", { className: "mt-8 p-5 bg-gray-50 rounded-lg border border-gray-200", children: [
        /* @__PURE__ */ l.jsx("h4", { className: "text-sm font-medium text-gray-800 mb-4", children: "Quick Actions" }),
        /* @__PURE__ */ l.jsxs("div", { className: "flex flex-wrap gap-3", children: [
          i && Object.entries(r).some(
            ([w, S]) => y(S)
          ) && /* @__PURE__ */ l.jsx(
            "button",
            {
              onClick: async () => {
                try {
                  const w = Object.entries(
                    r
                  ).filter(([S, O]) => y(O));
                  for (const [S, O] of w)
                    await g(S, O, i);
                  w.length === 0 ? alert("No API endpoints found") : alert(
                    `Called ${w.length} API endpoint(s)`
                  );
                } catch (w) {
                  console.error("Failed to call APIs:", w), alert("Failed to call APIs");
                }
              },
              className: "px-4 py-3 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors font-medium",
              children: "Call All API Endpoints"
            }
          ),
          o && Object.entries(r).some(
            ([w, S]) => p(S)
          ) && /* @__PURE__ */ l.jsx(
            "button",
            {
              onClick: async () => {
                try {
                  const w = Object.entries(
                    r
                  ).filter(([S, O]) => p(O));
                  for (const [S, O] of w) {
                    const D = O.replace(
                      "/customaction/",
                      ""
                    );
                    await v(
                      S,
                      D,
                      n,
                      o
                    );
                  }
                  w.length === 0 ? alert("No custom actions found") : alert(
                    `Executed ${w.length} custom action(s)`
                  );
                } catch (w) {
                  console.error(
                    "Failed to execute custom actions:",
                    w
                  ), alert("Failed to execute actions");
                }
              },
              className: "px-4 py-3 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors font-medium",
              children: "Execute All Custom Actions"
            }
          )
        ] })
      ] }),
      Object.keys(r).length === 0 && /* @__PURE__ */ l.jsxs("div", { className: "text-center py-12 text-gray-500", children: [
        /* @__PURE__ */ l.jsx("div", { className: "text-5xl mb-4", children: "📝" }),
        /* @__PURE__ */ l.jsx("p", { className: "text-base mb-2", children: "No properties available for this component" }),
        /* @__PURE__ */ l.jsx("p", { className: "text-sm", children: "Properties will appear here when the component has configurable options" })
      ] })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: "border-t border-gray-200 bg-white p-4 sticky bottom-0", children: /* @__PURE__ */ l.jsxs("div", { className: "flex space-x-3", children: [
      /* @__PURE__ */ l.jsx(
        "button",
        {
          onClick: () => {
            d(null), u(null);
          },
          className: "flex-1 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium",
          children: "Clear Selection"
        }
      ),
      /* @__PURE__ */ l.jsx(
        "button",
        {
          onClick: _,
          className: "px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium",
          children: "Reset"
        }
      )
    ] }) })
  ] });
}, B7 = [
  "text",
  "textarea",
  "richtext",
  "select",
  // This is for fields with predefined options
  "checkbox",
  "image",
  "video",
  "audio",
  "color",
  "file",
  "tel",
  "email",
  "password",
  "date",
  "array"
  // This is for fields that contain multiple items/objects
], z7 = ({
  options: e = [],
  onChange: t
}) => {
  const [r, n] = te(""), s = () => {
    r.trim() && (t([...e, r.trim()]), n(""));
  }, a = (o) => {
    t(e.filter((c, d) => d !== o));
  }, i = (o) => {
    o.key === "Enter" && (o.preventDefault(), s());
  };
  return /* @__PURE__ */ l.jsxs("div", { className: "col-span-2 mt-2 bg-gray-50 p-3 rounded border border-gray-300", children: [
    /* @__PURE__ */ l.jsx("label", { className: "text-xs text-gray-600 uppercase font-semibold mb-2 block", children: "Select Options" }),
    /* @__PURE__ */ l.jsx("div", { className: "flex flex-wrap gap-2 mb-3", children: e.length > 0 ? e.map((o, c) => /* @__PURE__ */ l.jsxs(
      "div",
      {
        className: "flex items-center gap-1 bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-700 group",
        children: [
          /* @__PURE__ */ l.jsx("span", { children: o }),
          /* @__PURE__ */ l.jsx(
            "button",
            {
              type: "button",
              onClick: () => a(c),
              className: "ml-1 text-gray-500 hover:text-red-500 focus:outline-none transition-colors",
              children: /* @__PURE__ */ l.jsx(
                "svg",
                {
                  className: "w-3 h-3",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ l.jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M6 18L18 6M6 6l12 12"
                    }
                  )
                }
              )
            }
          )
        ]
      },
      c
    )) : /* @__PURE__ */ l.jsx("div", { className: "text-xs text-gray-500 italic", children: "No options defined." }) }),
    /* @__PURE__ */ l.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ l.jsx(
        "input",
        {
          type: "text",
          value: r,
          onChange: (o) => n(o.target.value),
          onKeyDown: i,
          placeholder: "New option...",
          className: "flex-1 bg-white border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 focus:border-blue-500 outline-none"
        }
      ),
      /* @__PURE__ */ l.jsx(
        "button",
        {
          type: "button",
          onClick: s,
          className: "bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs font-medium transition-colors border border-gray-300",
          children: "Add"
        }
      )
    ] })
  ] });
}, q7 = ({
  itemSchema: e,
  onChange: t,
  lists: r,
  dataSources: n
}) => {
  const [s, a] = te(!1);
  return /* @__PURE__ */ l.jsxs("div", { className: "col-span-2 mt-2 bg-blue-50 p-3 rounded border border-blue-200", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
      /* @__PURE__ */ l.jsx("label", { className: "text-xs text-blue-700 uppercase font-semibold", children: "Array Item Structure" }),
      /* @__PURE__ */ l.jsx(
        "button",
        {
          type: "button",
          onClick: () => a(!s),
          className: "text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors",
          children: s ? "Hide Editor" : "Edit Items"
        }
      )
    ] }),
    s && /* @__PURE__ */ l.jsxs("div", { className: "mt-2 p-3 bg-white rounded border border-blue-300", children: [
      /* @__PURE__ */ l.jsx("p", { className: "text-xs text-blue-600 mb-3", children: "Define the structure of each item in this array:" }),
      /* @__PURE__ */ l.jsx(
        Hm,
        {
          schema: e,
          lists: r,
          dataSources: n,
          onChange: t,
          isNested: !0
        }
      )
    ] }),
    e.length > 0 && !s && /* @__PURE__ */ l.jsxs("div", { className: "text-xs text-blue-600", children: [
      e.length,
      " field(s) defined for array items"
    ] }),
    e.length === 0 && !s && /* @__PURE__ */ l.jsx("div", { className: "text-xs text-blue-500 italic", children: 'No item structure defined. Click "Edit Items" to define array item fields.' })
  ] });
}, Hm = ({
  schema: e,
  lists: t,
  dataSources: r = [],
  onChange: n,
  isNested: s = !1
}) => {
  const a = (d, u, f) => {
    const h = [...e];
    h[d] = { ...h[d], [u]: f }, u === "listRef" && f ? (delete h[d].options, delete h[d].dataSourceRef, delete h[d].dataSourceLabelKey, delete h[d].dataSourceValueKey) : u === "dataSourceRef" && f ? (delete h[d].options, delete h[d].listRef, h[d].dataSourceLabelKey || (h[d].dataSourceLabelKey = "name"), h[d].dataSourceValueKey || (h[d].dataSourceValueKey = "id")) : u === "type" && (f !== "select" && (delete h[d].options, delete h[d].listRef, delete h[d].dataSourceRef, delete h[d].dataSourceLabelKey, delete h[d].dataSourceValueKey), f !== "array" ? delete h[d].itemSchema : f === "array" && !h[d].itemSchema && (h[d].itemSchema = [])), n(h);
  }, i = (d, u) => {
    const f = [...e];
    f[d] = {
      ...f[d],
      itemSchema: u
    }, n(f);
  }, o = (d) => {
    const u = e.filter((f, h) => h !== d);
    n(u);
  }, c = () => {
    const d = {
      key: `field_${e.length + 1}`,
      label: "New Field",
      type: "text"
    };
    n([...e, d]);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `flex flex-col gap-4 ${s ? "pb-4" : "pb-10"}`, children: [
    e.map((d, u) => /* @__PURE__ */ l.jsx(
      "div",
      {
        className: "bg-white border border-gray-300 p-4 rounded flex flex-col gap-3 relative group",
        children: /* @__PURE__ */ l.jsxs("div", { className: "flex justify-between items-start gap-2", children: [
          /* @__PURE__ */ l.jsxs("div", { className: "grid grid-cols-2 gap-3 flex-1", children: [
            /* @__PURE__ */ l.jsxs("div", { className: "col-span-1", children: [
              /* @__PURE__ */ l.jsx("label", { className: "text-xs text-gray-600 uppercase font-semibold mb-1 block", children: "Label" }),
              /* @__PURE__ */ l.jsx(
                "input",
                {
                  type: "text",
                  value: d.label,
                  onChange: (f) => a(u, "label", f.target.value),
                  className: "w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:border-blue-500 outline-none"
                }
              )
            ] }),
            /* @__PURE__ */ l.jsxs("div", { className: "col-span-1", children: [
              /* @__PURE__ */ l.jsx("label", { className: "text-xs text-gray-600 uppercase font-semibold mb-1 block", children: "JSON Key" }),
              /* @__PURE__ */ l.jsx(
                "input",
                {
                  type: "text",
                  value: d.key,
                  onChange: (f) => a(u, "key", f.target.value),
                  className: "w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-yellow-600 font-mono focus:border-blue-500 outline-none"
                }
              )
            ] }),
            /* @__PURE__ */ l.jsxs("div", { className: "col-span-1", children: [
              /* @__PURE__ */ l.jsx("label", { className: "text-xs text-gray-600 uppercase font-semibold mb-1 block", children: "Type" }),
              /* @__PURE__ */ l.jsx(
                "select",
                {
                  value: d.type,
                  onChange: (f) => a(
                    u,
                    "type",
                    f.target.value
                  ),
                  className: "w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:border-blue-500 outline-none",
                  children: B7.map((f) => /* @__PURE__ */ l.jsx("option", { value: f, children: f.charAt(0).toUpperCase() + f.slice(1) }, f))
                }
              )
            ] }),
            d.type === "select" && /* @__PURE__ */ l.jsxs("div", { className: "col-span-2 mt-3 bg-gray-50 border border-gray-200 p-3 rounded", children: [
              /* @__PURE__ */ l.jsxs("div", { className: "flex items-center gap-4 mb-3", children: [
                /* @__PURE__ */ l.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
                  /* @__PURE__ */ l.jsx(
                    "input",
                    {
                      type: "radio",
                      name: `source_${u}`,
                      checked: !d.listRef && !d.dataSourceRef,
                      onChange: () => {
                        const f = {
                          ...d,
                          listRef: void 0,
                          dataSourceRef: void 0,
                          options: d.options || []
                        }, h = [...e];
                        h[u] = f, n(h);
                      },
                      className: "text-blue-500 focus:ring-blue-500"
                    }
                  ),
                  /* @__PURE__ */ l.jsx("span", { className: "text-sm text-gray-700", children: "Custom Options" })
                ] }),
                /* @__PURE__ */ l.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
                  /* @__PURE__ */ l.jsx(
                    "input",
                    {
                      type: "radio",
                      name: `source_${u}`,
                      checked: !!d.listRef,
                      onChange: () => {
                        const f = t.length > 0 ? t[0].id : "", h = {
                          ...d,
                          listRef: f,
                          dataSourceRef: void 0,
                          options: void 0
                        }, m = [...e];
                        m[u] = h, n(m);
                      },
                      className: "text-blue-500 focus:ring-blue-500"
                    }
                  ),
                  /* @__PURE__ */ l.jsx("span", { className: "text-sm text-gray-700", children: "List" })
                ] }),
                /* @__PURE__ */ l.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
                  /* @__PURE__ */ l.jsx(
                    "input",
                    {
                      type: "radio",
                      name: `source_${u}`,
                      checked: !!d.dataSourceRef,
                      onChange: () => {
                        const f = r.length > 0 ? r[0].id : "", h = {
                          ...d,
                          dataSourceRef: f,
                          listRef: void 0,
                          options: void 0,
                          dataSourceLabelKey: "name",
                          dataSourceValueKey: "id"
                        }, m = [...e];
                        m[u] = h, n(m);
                      },
                      className: "text-purple-500 focus:ring-purple-500"
                    }
                  ),
                  /* @__PURE__ */ l.jsx("span", { className: "text-sm text-gray-700", children: "API" })
                ] })
              ] }),
              d.listRef ? /* @__PURE__ */ l.jsxs("div", { children: [
                /* @__PURE__ */ l.jsx("label", { className: "text-xs text-gray-600 uppercase font-semibold mb-2 block", children: "Select List Source" }),
                t.length > 0 ? /* @__PURE__ */ l.jsx(
                  "select",
                  {
                    value: d.listRef,
                    onChange: (f) => a(u, "listRef", f.target.value),
                    className: "w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:border-blue-500 outline-none",
                    children: t.map((f) => /* @__PURE__ */ l.jsxs("option", { value: f.id, children: [
                      f.name,
                      " (",
                      f.items.length,
                      " items)"
                    ] }, f.id))
                  }
                ) : /* @__PURE__ */ l.jsx("div", { className: "text-sm text-red-600 p-2 border border-red-200 bg-red-50 rounded", children: "No lists found. Create lists in the Lists tab first." })
              ] }) : d.dataSourceRef ? /* @__PURE__ */ l.jsxs("div", { className: "flex flex-col gap-3", children: [
                /* @__PURE__ */ l.jsxs("div", { children: [
                  /* @__PURE__ */ l.jsx("label", { className: "text-xs text-gray-600 uppercase font-semibold mb-2 block", children: "Data Source" }),
                  r.length > 0 ? /* @__PURE__ */ l.jsx(
                    "select",
                    {
                      value: d.dataSourceRef,
                      onChange: (f) => a(
                        u,
                        "dataSourceRef",
                        f.target.value
                      ),
                      className: "w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:border-purple-500 outline-none",
                      children: r.map((f) => /* @__PURE__ */ l.jsxs("option", { value: f.id, children: [
                        f.name,
                        " (",
                        f.type,
                        ")"
                      ] }, f.id))
                    }
                  ) : /* @__PURE__ */ l.jsx("div", { className: "text-sm text-red-600 p-2 border border-red-200 bg-red-50 rounded", children: "No data sources found. Create data sources in the Data Sources tab first." })
                ] }),
                /* @__PURE__ */ l.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ l.jsxs("div", { children: [
                    /* @__PURE__ */ l.jsx("label", { className: "text-xs text-gray-600 uppercase font-semibold mb-1 block", children: "Label Key" }),
                    /* @__PURE__ */ l.jsx(
                      "input",
                      {
                        type: "text",
                        value: d.dataSourceLabelKey || "",
                        onChange: (f) => a(
                          u,
                          "dataSourceLabelKey",
                          f.target.value
                        ),
                        placeholder: "e.g. name",
                        className: "w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ l.jsxs("div", { children: [
                    /* @__PURE__ */ l.jsx("label", { className: "text-xs text-gray-600 uppercase font-semibold mb-1 block", children: "Value Key" }),
                    /* @__PURE__ */ l.jsx(
                      "input",
                      {
                        type: "text",
                        value: d.dataSourceValueKey || "",
                        onChange: (f) => a(
                          u,
                          "dataSourceValueKey",
                          f.target.value
                        ),
                        placeholder: "e.g. id",
                        className: "w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ l.jsx("div", { className: "text-xs text-gray-500 italic", children: "Keys must match properties in the API JSON response array." })
              ] }) : /* @__PURE__ */ l.jsx(
                z7,
                {
                  options: d.options,
                  onChange: (f) => a(u, "options", f)
                }
              )
            ] }),
            d.type === "array" && /* @__PURE__ */ l.jsx(
              q7,
              {
                itemSchema: d.itemSchema || [],
                onChange: (f) => i(u, f),
                lists: t,
                dataSources: r
              }
            ),
            d.type === "file" && /* @__PURE__ */ l.jsx("div", { className: "col-span-2 mt-2", children: /* @__PURE__ */ l.jsx("div", { className: "text-xs text-gray-500 italic", children: "File fields support uploads for any file type. Use image, video, or audio types for specific media." }) }),
            d.type === "date" && /* @__PURE__ */ l.jsx("div", { className: "col-span-2 mt-2", children: /* @__PURE__ */ l.jsx("div", { className: "text-xs text-gray-500 italic", children: "Date fields will show a date picker in the form." }) })
          ] }),
          /* @__PURE__ */ l.jsx(
            "button",
            {
              onClick: () => o(u),
              className: "text-gray-400 hover:text-red-500 p-1 rounded transition-colors",
              title: "Remove Field",
              children: /* @__PURE__ */ l.jsx(
                "svg",
                {
                  className: "w-5 h-5",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ l.jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    }
                  )
                }
              )
            }
          )
        ] })
      },
      u
    )),
    /* @__PURE__ */ l.jsxs(
      "button",
      {
        onClick: c,
        className: "flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded text-gray-500 hover:text-gray-700 transition-all font-medium text-sm",
        children: [
          /* @__PURE__ */ l.jsx(
            "svg",
            {
              className: "w-4 h-4",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ l.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M12 4v16m8-8H4"
                }
              )
            }
          ),
          "Add New Field"
        ]
      }
    )
  ] });
}, Jm = (e, t) => !e || !e.properties ? [] : Object.entries(e.properties).map(
  ([r, n]) => {
    var i;
    const s = {
      key: r,
      label: n.title || r,
      type: "text"
      // default
    }, a = t[r];
    if (n.type === "boolean")
      s.type = "checkbox";
    else if (n.type === "array")
      if (Array.isArray(a) && a.length > 0) {
        const o = a[0];
        typeof o == "object" && o !== null ? (s.type = "array", n.items && n.items.properties && (s.itemSchema = Jm(
          n.items,
          o
        ))) : (s.type = "select", s.options = a);
      } else
        n.items && n.items.enum ? (s.type = "select", s.options = n.items.enum) : s.type = "array";
    else if (n.enum)
      s.type = "select", s.options = n.enum;
    else if (n.format === "textarea")
      s.type = "textarea";
    else if (n.format === "color")
      s.type = "color";
    else if (n["x-dynamic-select"])
      s.type = "select", s.dataSourceRef = ((i = n.description) == null ? void 0 : i.replace("API Endpoint: ", "")) || "";
    else if (n["x-list-reference"])
      s.type = "select", s.listRef = n["x-list-reference"];
    else if (n.format === "uri") {
      const o = r.toLowerCase();
      o.includes("image") ? s.type = "image" : o.includes("video") ? s.type = "video" : o.includes("audio") ? s.type = "audio" : o.includes("file") && (s.type = "file");
    } else n.format === "email" ? s.type = "email" : n.format === "date" ? s.type = "date" : r.toLowerCase().includes("phone") || r.toLowerCase().includes("tel") ? s.type = "tel" : r.toLowerCase().includes("password") && (s.type = "password");
    return s;
  }
), Qi = (e) => {
  const t = {}, r = [];
  return e.forEach((n) => {
    const s = {
      title: n.label,
      default: K7(n.type)
    };
    switch (n.type) {
      case "text":
        s.type = "string";
        break;
      case "textarea":
        s.type = "string", s.format = "textarea";
        break;
      case "richtext":
        s.type = "string", s.format = "richtext";
        break;
      case "select":
        s.type = "string", n.listRef ? (s["x-list-reference"] = n.listRef, s.description = `List: ${n.listRef}`) : n.dataSourceRef ? (s["x-dynamic-select"] = !0, s.description = `API Endpoint: ${n.dataSourceRef}`) : n.options && n.options.length > 0 && (s.enum = n.options);
        break;
      case "checkbox":
        s.type = "boolean", s.default = !1;
        break;
      case "array":
        s.type = "array", n.itemSchema && n.itemSchema.length > 0 ? s.items = Qi(n.itemSchema) : s.items = { type: "object" };
        break;
      case "image":
      case "video":
      case "audio":
      case "file":
        s.type = "string", s.format = "uri";
        break;
      case "color":
        s.type = "string", s.format = "color";
        break;
      case "email":
        s.type = "string", s.format = "email";
        break;
      case "tel":
        s.type = "string", s.format = "tel";
        break;
      case "password":
        s.type = "string", s.format = "password";
        break;
      case "date":
        s.type = "string", s.format = "date";
        break;
      default:
        s.type = "string";
    }
    t[n.key] = s;
  }), {
    type: "object",
    properties: t,
    required: r
  };
}, K7 = (e) => {
  switch (e) {
    case "checkbox":
      return !1;
    case "select":
      return "";
    case "color":
      return "#000000";
    case "date":
      return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    case "array":
      return [];
    default:
      return "";
  }
}, G7 = ({
  schema: e,
  componentProps: t,
  onChange: r
}) => {
  const { attributes: n } = Gt(), s = Bt(() => Jm(e, t), [e, t]), a = Bt(
    () => n.lists || [],
    [n.lists]
  ), i = Bt(
    () => n.dataSources || [],
    [n.dataSources]
  ), o = (d) => {
    const u = Qi(d);
    r(u);
  }, c = () => {
    const d = or(t);
    r(d);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: "p-4 space-y-4 h-full overflow-auto bg-zinc-200", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-4", children: [
      /* @__PURE__ */ l.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ l.jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Schema Editor" }),
        /* @__PURE__ */ l.jsx("div", { className: "flex space-x-2", children: /* @__PURE__ */ l.jsx(
          "button",
          {
            onClick: c,
            className: "px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors",
            children: "Generate from Props"
          }
        ) })
      ] }),
      /* @__PURE__ */ l.jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Define the structure and types of your component properties. The schema controls how properties appear in the Data tab." })
    ] }),
    s.length > 0 ? /* @__PURE__ */ l.jsx("div", { className: "bg-white rounded-lg border border-gray-200 p-4", children: /* @__PURE__ */ l.jsx(
      Hm,
      {
        schema: s,
        lists: a,
        dataSources: i,
        onChange: o
      }
    ) }) : /* @__PURE__ */ l.jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-8 text-center", children: [
      /* @__PURE__ */ l.jsx("div", { className: "text-3xl mb-3", children: "📝" }),
      /* @__PURE__ */ l.jsx("p", { className: "text-gray-600 mb-2", children: "No schema defined yet" }),
      /* @__PURE__ */ l.jsx("p", { className: "text-sm text-gray-500 mb-4", children: "Generate a schema from current properties or start adding fields manually" }),
      /* @__PURE__ */ l.jsx(
        "button",
        {
          onClick: c,
          className: "px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors",
          children: "Generate Schema from Props"
        }
      )
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [
      /* @__PURE__ */ l.jsx("h4", { className: "text-sm font-medium text-blue-800 mb-2", children: "Schema Tips" }),
      /* @__PURE__ */ l.jsxs("ul", { className: "text-xs text-blue-700 space-y-1", children: [
        /* @__PURE__ */ l.jsxs("li", { children: [
          "• ",
          /* @__PURE__ */ l.jsx("strong", { children: "Label" }),
          ": Display name shown in the form"
        ] }),
        /* @__PURE__ */ l.jsxs("li", { children: [
          "• ",
          /* @__PURE__ */ l.jsx("strong", { children: "JSON Key" }),
          ": Property name used in the data"
        ] }),
        /* @__PURE__ */ l.jsxs("li", { children: [
          "• ",
          /* @__PURE__ */ l.jsx("strong", { children: "Text Types" }),
          ": text, textarea, richtext, email, tel, password"
        ] }),
        /* @__PURE__ */ l.jsxs("li", { children: [
          "• ",
          /* @__PURE__ */ l.jsx("strong", { children: "Media Types" }),
          ": image, video, audio, file"
        ] }),
        /* @__PURE__ */ l.jsxs("li", { children: [
          "• ",
          /* @__PURE__ */ l.jsx("strong", { children: "Special Types" }),
          ": color, date, checkbox"
        ] }),
        /* @__PURE__ */ l.jsxs("li", { children: [
          "• ",
          /* @__PURE__ */ l.jsx("strong", { children: "Select Fields" }),
          ": Can use custom options, lists, or API data sources"
        ] }),
        /* @__PURE__ */ l.jsxs("li", { children: [
          "• ",
          /* @__PURE__ */ l.jsx("strong", { children: "Generate from Props" }),
          ": Auto-create schema from current component properties"
        ] }),
        /* @__PURE__ */ l.jsx("li", { children: "• Changes here affect the form structure in the Data tab" })
      ] })
    ] }),
    s.length > 0 && /* @__PURE__ */ l.jsxs("div", { className: "bg-gray-50 border border-gray-200 rounded-lg p-4", children: [
      /* @__PURE__ */ l.jsxs("h4", { className: "text-sm font-medium text-gray-800 mb-2", children: [
        "Schema Preview (",
        s.length,
        " fields)"
      ] }),
      /* @__PURE__ */ l.jsx("div", { className: "text-xs text-gray-600 font-mono bg-white p-3 rounded border max-h-32 overflow-auto", children: /* @__PURE__ */ l.jsx("pre", { children: JSON.stringify(Qi(s), null, 2) }) })
    ] })
  ] });
}, H7 = ({
  componentProps: e,
  onPropertyChange: t
}) => {
  const [r, n] = te(
    {}
  ), s = Object.entries(e).filter(([o, c]) => E7(o, c)).map(([o, c]) => ({ key: o, value: c })), a = (o, c) => {
    const d = { ...r, [o]: c };
    n(d);
    const u = { ...e, [o]: c };
    t({ formData: u });
  }, i = () => {
    const o = { ...e, ...r };
    t({ formData: o }), n({});
  };
  return s.length === 0 ? /* @__PURE__ */ l.jsx("div", { className: "p-6 h-full flex items-center justify-center", children: /* @__PURE__ */ l.jsxs("div", { className: "text-center py-8 text-gray-500 bg-white rounded-lg border border-gray-200 max-w-md w-full", children: [
    /* @__PURE__ */ l.jsx("div", { className: "text-3xl mb-2", children: "🔗" }),
    /* @__PURE__ */ l.jsx("p", { className: "text-sm", children: "No data binding fields found" }),
    /* @__PURE__ */ l.jsx("p", { className: "text-xs mt-1", children: "Fields with API endpoints, URLs, or template literals will appear here" })
  ] }) }) : /* @__PURE__ */ l.jsxs("div", { className: "p-6 space-y-4 h-full overflow-auto", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-4", children: [
      /* @__PURE__ */ l.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ l.jsx("h3", { className: "text-lg font-medium", children: "Data Bindings" }),
        Object.keys(r).length > 0 && /* @__PURE__ */ l.jsx(
          "button",
          {
            onClick: i,
            className: "px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors",
            children: "Apply All Changes"
          }
        )
      ] }),
      /* @__PURE__ */ l.jsx("div", { className: "space-y-4", children: s.map(({ key: o, value: c }) => /* @__PURE__ */ l.jsxs("div", { className: "border border-gray-200 rounded-lg p-4", children: [
        /* @__PURE__ */ l.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: o }),
        /* @__PURE__ */ l.jsx(
          "textarea",
          {
            value: r[o] ?? c,
            onChange: (d) => a(o, d.target.value),
            rows: 3,
            className: "w-full p-3 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono",
            placeholder: "Enter binding expression..."
          }
        ),
        /* @__PURE__ */ l.jsxs("div", { className: "mt-2 text-xs text-gray-500", children: [
          "Current value:",
          " ",
          /* @__PURE__ */ l.jsx("code", { className: "bg-gray-100 px-1 rounded", children: String(c) })
        ] })
      ] }, o)) })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "p-4 bg-blue-50 border border-blue-200 rounded-lg", children: [
      /* @__PURE__ */ l.jsx("h4", { className: "text-sm font-medium text-blue-800 mb-2", children: "Binding Examples" }),
      /* @__PURE__ */ l.jsxs("ul", { className: "text-xs text-blue-700 space-y-1", children: [
        /* @__PURE__ */ l.jsxs("li", { children: [
          "• API Endpoints:",
          " ",
          /* @__PURE__ */ l.jsx("code", { className: "bg-blue-100 px-1 rounded", children: "/api/users" })
        ] }),
        /* @__PURE__ */ l.jsxs("li", { children: [
          "• Template Literals:",
          " ",
          /* @__PURE__ */ l.jsx("code", { className: "bg-blue-100 px-1 rounded", children: "{{user.name}}" })
        ] }),
        /* @__PURE__ */ l.jsxs("li", { children: [
          "• Data Source References:",
          " ",
          /* @__PURE__ */ l.jsx("code", { className: "bg-blue-100 px-1 rounded", children: "{{dataSource.users.name}}" })
        ] }),
        /* @__PURE__ */ l.jsxs("li", { children: [
          "• List References:",
          " ",
          /* @__PURE__ */ l.jsx("code", { className: "bg-blue-100 px-1 rounded", children: "{{list.categories}}" })
        ] })
      ] })
    ] })
  ] });
}, J7 = ({
  componentProps: e,
  onChange: t
}) => {
  const [r, n] = te(
    JSON.stringify(e, null, 2)
  ), [s, a] = te(!0), i = (c) => {
    n(c);
    try {
      const d = JSON.parse(c);
      a(!0), t(d);
    } catch {
      a(!1);
    }
  }, o = () => {
    try {
      const c = JSON.parse(r), d = JSON.stringify(c, null, 2);
      n(d), a(!0);
    } catch {
      a(!1);
    }
  };
  return /* @__PURE__ */ l.jsxs("div", { className: "p-6 space-y-4 h-full overflow-auto", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-4", children: [
      /* @__PURE__ */ l.jsx("h3", { className: "text-lg font-medium mb-4", children: "Raw JSON Editor" }),
      /* @__PURE__ */ l.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ l.jsx(
          "textarea",
          {
            value: r,
            onChange: (c) => i(c.target.value),
            rows: 15,
            className: `w-full p-3 border rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${s ? "border-gray-300" : "border-red-500"}`,
            placeholder: "Enter component properties as JSON..."
          }
        ),
        /* @__PURE__ */ l.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ l.jsx(
            "button",
            {
              onClick: o,
              className: "px-4 py-2 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors",
              children: "Format JSON"
            }
          ),
          !s && /* @__PURE__ */ l.jsx("div", { className: "text-red-600 text-sm flex items-center", children: "Invalid JSON format" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "p-4 bg-yellow-50 border border-yellow-200 rounded-lg", children: [
      /* @__PURE__ */ l.jsx("h4", { className: "text-sm font-medium text-yellow-800 mb-2", children: "⚠️ Advanced Editor" }),
      /* @__PURE__ */ l.jsxs("ul", { className: "text-xs text-yellow-700 space-y-1", children: [
        /* @__PURE__ */ l.jsx("li", { children: "• Edit the complete component properties including schema" }),
        /* @__PURE__ */ l.jsx("li", { children: "• Changes are applied immediately when valid JSON is detected" }),
        /* @__PURE__ */ l.jsx("li", { children: "• Invalid JSON will be highlighted" }),
        /* @__PURE__ */ l.jsx("li", { children: "• Use with caution as invalid data may break the component" })
      ] })
    ] })
  ] });
}, Y7 = ({
  onFileUpload: e,
  onApiCall: t,
  onCustomAction: r,
  onGetSelectOptions: n
}) => {
  const {
    selectedInstance: s,
    selectedComponent: a,
    setSelectedInstance: i,
    setSelectedComponent: o
  } = Gt(), { updateProps: c, getProps: d } = yy(s == null ? void 0 : s.id), [u, f] = te("data"), h = st(/* @__PURE__ */ new Set()), m = st({
    instanceId: (s == null ? void 0 : s.id) || null,
    component: a
  });
  De(() => {
    m.current = {
      instanceId: (s == null ? void 0 : s.id) || null,
      component: a
    };
  }, [s, a]);
  const b = (s == null ? void 0 : s.type) || a, $ = (s == null ? void 0 : s.props) || {}, y = d() || {}, p = { ...$, ...y }, { __schema: g, ...v } = p;
  De(() => {
    if (s && !h.current.has(s.id)) {
      if (!g) {
        const D = or(
          v
        ), N = {
          ...v,
          __schema: D
        }, A = {
          ...s,
          props: N
        };
        i(A), c(N);
      }
      h.current.add(s.id);
    }
  }, [
    s,
    g,
    v,
    i,
    c
  ]);
  const _ = Bt(() => g || or(v), [g, v]), w = Y(
    (D) => {
      if (D.formData && s) {
        const N = {
          ...D.formData,
          __schema: _
          // Preserve the schema
        }, A = {
          ...s,
          props: N
        };
        i(A), c(N);
      }
    },
    [s, _, i, c]
  ), S = Y(
    (D) => {
      if (s) {
        const N = {
          ...v,
          __schema: D
        }, A = {
          ...s,
          props: N
        };
        i(A), c(N);
      }
    },
    [
      s,
      v,
      i,
      c
    ]
  ), O = Y(
    (D) => {
      if (s) {
        const N = {
          ...s,
          props: D
        };
        i(N), c(D), D.__schema && !h.current.has(s.id) && h.current.add(s.id);
      }
    },
    [s, i, c]
  );
  return !s && !a ? /* @__PURE__ */ l.jsx("div", { className: "h-full flex items-center justify-center bg-zinc-200", children: /* @__PURE__ */ l.jsxs("div", { className: "text-center text-gray-500", children: [
    /* @__PURE__ */ l.jsx("div", { className: "mb-3 text-2xl", children: "👈" }),
    /* @__PURE__ */ l.jsx("p", { className: "text-base", children: "Select a component from the Components tab or click on a placed component to edit its properties" })
  ] }) }) : /* @__PURE__ */ l.jsxs("div", { className: "h-full flex flex-col bg-zinc-200", children: [
    /* @__PURE__ */ l.jsx("div", { className: "border-b border-gray-200 bg-white p-4", children: /* @__PURE__ */ l.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ l.jsxs("h3", { className: "text-lg font-semibold text-gray-900", children: [
      b,
      s && /* @__PURE__ */ l.jsxs("span", { className: "text-sm text-gray-500 ml-2 font-normal", children: [
        "(ID: ",
        s.id,
        ")"
      ] })
    ] }) }) }),
    /* @__PURE__ */ l.jsxs("div", { className: "flex border-b border-gray-300 bg-white", children: [
      /* @__PURE__ */ l.jsx(
        "button",
        {
          className: `px-4 py-2 text-sm font-medium border-b-2 transition-colors ${u === "data" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`,
          onClick: () => f("data"),
          children: "Data"
        }
      ),
      /* @__PURE__ */ l.jsx(
        "button",
        {
          className: `px-4 py-2 text-sm font-medium border-b-2 transition-colors ${u === "schema" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`,
          onClick: () => f("schema"),
          children: "Schema"
        }
      ),
      /* @__PURE__ */ l.jsx(
        "button",
        {
          className: `px-4 py-2 text-sm font-medium border-b-2 transition-colors ${u === "binding" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`,
          onClick: () => f("binding"),
          children: "Binding"
        }
      ),
      /* @__PURE__ */ l.jsx(
        "button",
        {
          className: `px-4 py-2 text-sm font-medium border-b-2 transition-colors ${u === "json" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`,
          onClick: () => f("json"),
          children: "JSON"
        }
      )
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "flex-1 overflow-auto", children: [
      u === "data" && /* @__PURE__ */ l.jsx(
        V7,
        {
          selectedInstance: s,
          componentType: b,
          componentProps: v,
          currentProps: v,
          onPropertyChange: w,
          onFileUpload: e,
          onApiCall: t,
          onCustomAction: r,
          onGetSelectOptions: n,
          setSelectedInstance: i,
          setSelectedComponent: o,
          componentSchema: _
        }
      ),
      u === "schema" && /* @__PURE__ */ l.jsx(
        G7,
        {
          schema: _,
          componentProps: v,
          onChange: S
        }
      ),
      u === "binding" && /* @__PURE__ */ l.jsx(
        H7,
        {
          componentProps: v,
          onPropertyChange: w
        }
      ),
      u === "json" && /* @__PURE__ */ l.jsx(J7, { componentProps: p, onChange: O })
    ] })
  ] });
};
function Z7({ onDropDelete: e }) {
  const { removeWidget: t } = Ln(), r = Y((i) => {
    var c;
    i.preventDefault();
    const o = i.dataTransfer.getData("text/plain");
    if (o) {
      const d = document.querySelector(`[gs-id="${o}"]`);
      d && ((c = d.gridstackNode) != null && c.grid) && d.gridstackNode.grid.removeWidget(d, !0, !0), t(o);
    }
    e();
  }, [e, t]), n = (i) => {
    i.preventDefault(), i.dataTransfer.dropEffect = "move";
  }, s = (i) => {
    i.preventDefault(), i.currentTarget.classList.add("bg-red-200", "border-red-400");
  }, a = (i) => {
    i.preventDefault(), i.currentTarget.classList.remove("bg-red-200", "border-red-400");
  };
  return /* @__PURE__ */ l.jsx(
    "div",
    {
      id: "trash",
      onDrop: r,
      onDragOver: n,
      onDragEnter: s,
      onDragLeave: a,
      className: "bg-red-50 min-h-20 h-18 flex items-center justify-center p-0 border-2 border-dashed border-red-200 rounded-lg transition-all duration-200 hover:bg-red-100 cursor-pointer group",
      children: /* @__PURE__ */ l.jsx("div", { className: "w-full h-full flex flex-col items-center justify-center m-3", children: /* @__PURE__ */ l.jsx(
        "svg",
        {
          className: "w-16 h-16 text-red-300 group-hover:text-red-400 transition-colors",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          children: /* @__PURE__ */ l.jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 1.5,
              d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            }
          )
        }
      ) })
    }
  );
}
const X7 = ({
  componentMapProvider: e,
  onDragStart: t
}) => {
  const { setSelectedComponent: r, setSelectedInstance: n } = Gt(), s = lf(e);
  return /* @__PURE__ */ l.jsxs("div", { className: "h-full p-4 space-y-4 max-h-[calc(100vh-48*0.25rem)] bg-zinc-200 overflow-y-auto", children: [
    /* @__PURE__ */ l.jsx("h3", { className: "text-lg font-medium mb-3", children: "Components" }),
    /* @__PURE__ */ l.jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Drag components to the main area or click to select them" }),
    /* @__PURE__ */ l.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ l.jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Delete Zone" }),
      /* @__PURE__ */ l.jsx(
        Z7,
        {
          onDropDelete: () => {
            console.log("Component deleted via drop zone"), r(null), n(null);
          }
        }
      ),
      /* @__PURE__ */ l.jsx("p", { className: "text-xs text-gray-500 mt-2 text-center", children: "Drag components here to delete them" })
    ] }),
    /* @__PURE__ */ l.jsx(
      "div",
      {
        "gs-type": "SubGrid",
        "data-gs-type": "SubGrid",
        className: "grid-stack-item grid-stack-item-widget",
        draggable: "true",
        onDragStart: (a) => t(a, "SubGrid"),
        onDragEnd: () => console.log("====SubGrid drag event end...."),
        onClick: () => {
          r("SubGrid"), n(null);
        },
        children: /* @__PURE__ */ l.jsxs("div", { className: "p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-dashed border-blue-300 text-sm hover:from-blue-100 hover:to-indigo-100 cursor-pointer transition-all duration-200 hover:shadow-lg text-center group", children: [
          /* @__PURE__ */ l.jsxs("div", { className: "font-semibold text-blue-700 mb-2 flex items-center justify-center", children: [
            /* @__PURE__ */ l.jsxs(
              "svg",
              {
                className: "w-5 h-5 mr-2 group-hover:scale-110 transition-transform",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: [
                  /* @__PURE__ */ l.jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
                    }
                  ),
                  /* @__PURE__ */ l.jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M9 3v18M3 9h18"
                    }
                  )
                ]
              }
            ),
            "SubGrid"
          ] }),
          /* @__PURE__ */ l.jsx("div", { className: "text-xs text-blue-600 font-medium", children: "Nested Grid Container" }),
          /* @__PURE__ */ l.jsx("div", { className: "text-xs text-blue-500 mt-1", children: "Drag to create nested layout" })
        ] })
      },
      "SubGrid"
    ),
    /* @__PURE__ */ l.jsx("div", { className: "grid grid-cols-2 gap-3", children: Object.entries(s).map(([
      a
      /*Component*/
    ]) => /* @__PURE__ */ l.jsx(
      "div",
      {
        "gs-type": a,
        "data-gs-type": a,
        className: "grid-stack-item grid-stack-item-widget",
        draggable: "true",
        onDragStart: (i) => t(i, a),
        onDragEnd: () => console.log("====drag event end...."),
        onClick: () => {
          r(a), n(null);
        },
        children: /* @__PURE__ */ l.jsxs("div", { className: "p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm hover:bg-gray-100 cursor-pointer transition-all duration-200 hover:shadow-md text-center", children: [
          /* @__PURE__ */ l.jsx("div", { className: "font-medium text-gray-800 mb-2", children: a }),
          /* @__PURE__ */ l.jsx("div", { className: "text-xs text-gray-500", children: "Drag to main area" })
        ] })
      },
      a
    )) })
  ] });
}, Q7 = ({ onFileUpload: e }) => {
  var b, $, y, p, g, v, _, w;
  const { attributes: t, setPageAttributes: r } = Gt(), [n, s] = te(!1), [a, i] = te(0), o = st(null), c = (S, O) => {
    const D = {
      ...t,
      [S]: O
    };
    r(D);
  }, d = (S) => {
    const O = S.target.value;
    c("image", O);
  }, u = async (S) => {
    var D;
    const O = (D = S.target.files) == null ? void 0 : D[0];
    if (O) {
      s(!0), i(0);
      try {
        let N = URL.createObjectURL(O);
        e && (N = await e(O, {
          onProgress: (A) => i(A),
          onError: (A) => alert(A.message),
          options: {}
        })), o.current && (o.current.value = ""), c("image", N);
      } catch (N) {
        console.error("Failed to upload image:", N), alert("Failed to upload image. Please try again.");
      } finally {
        s(!1), i(0);
      }
    }
  }, f = () => {
    c("image", ""), o.current && (o.current.value = "");
  }, h = ["draft", "published"], m = ((b = t.lists) == null ? void 0 : b.reduce(
    (S, O) => {
      var D;
      return S + (((D = O.items) == null ? void 0 : D.length) || 0);
    },
    0
  )) || 0;
  return /* @__PURE__ */ l.jsxs("div", { className: "h-full p-4 space-y-4 max-h-[calc(100vh-48*0.25rem)] bg-zinc-200 overflow-y-auto", children: [
    /* @__PURE__ */ l.jsx("h3", { className: "text-lg font-medium mb-3", children: "Page Settings" }),
    /* @__PURE__ */ l.jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Configure the overall page layout and appearance" }),
    /* @__PURE__ */ l.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ l.jsxs("div", { className: "border-b border-gray-100 pb-4", children: [
        /* @__PURE__ */ l.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-3", children: "Page Image" }),
        /* @__PURE__ */ l.jsxs("div", { className: "mb-6 space-y-2", children: [
          /* @__PURE__ */ l.jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Image URL" }),
          /* @__PURE__ */ l.jsx(
            "input",
            {
              type: "url",
              value: t.image || "",
              onChange: d,
              placeholder: "https://example.com/image.jpg",
              className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            }
          ),
          /* @__PURE__ */ l.jsx("p", { className: "text-xs text-gray-500", children: "Enter image URL or upload a file below" })
        ] }),
        /* @__PURE__ */ l.jsxs("div", { className: "flex flex-col items-center space-y-4", children: [
          /* @__PURE__ */ l.jsx("div", { className: "relative bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-200 w-full max-w-md", children: t.image ? /* @__PURE__ */ l.jsxs("div", { className: "flex flex-col items-center space-y-4", children: [
            /* @__PURE__ */ l.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ l.jsx(
                "img",
                {
                  src: t.image,
                  alt: "Page preview",
                  className: "w-64 h-64 object-contain rounded-lg shadow-lg",
                  onError: (S) => {
                    S.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='16' fill='%239ca3af'%3EImage Error%3C/text%3E%3C/svg%3E";
                  }
                }
              ),
              /* @__PURE__ */ l.jsx(
                "button",
                {
                  type: "button",
                  onClick: f,
                  disabled: n,
                  className: "absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-600 disabled:bg-gray-400 transition-colors shadow-lg",
                  children: "×"
                }
              )
            ] }),
            /* @__PURE__ */ l.jsxs("div", { className: "text-center space-y-1", children: [
              /* @__PURE__ */ l.jsx("p", { className: "text-sm text-gray-600 truncate max-w-xs", children: t.image.startsWith("blob:") ? "Temporary Preview" : "Saved Image" }),
              t.image.length > 60 && /* @__PURE__ */ l.jsxs("p", { className: "text-xs text-gray-500 break-all", children: [
                t.image.substring(0, 80),
                "..."
              ] })
            ] })
          ] }) : /* @__PURE__ */ l.jsxs("div", { className: "flex flex-col items-center justify-center py-12", children: [
            /* @__PURE__ */ l.jsx("div", { className: "w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 mb-4", children: n ? /* @__PURE__ */ l.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ l.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2" }),
              /* @__PURE__ */ l.jsxs("span", { className: "text-sm", children: [
                "Uploading...",
                a,
                "%"
              ] })
            ] }) : /* @__PURE__ */ l.jsx("span", { className: "text-4xl", children: "🖼️" }) }),
            /* @__PURE__ */ l.jsx("p", { className: "text-gray-500 text-sm text-center", children: n ? "Processing your image..." : "No image selected" })
          ] }) }),
          /* @__PURE__ */ l.jsxs("div", { className: "flex flex-col items-center space-y-3 w-full max-w-md", children: [
            /* @__PURE__ */ l.jsx(
              "input",
              {
                ref: o,
                type: "file",
                accept: "image/*",
                onChange: u,
                disabled: n,
                className: "hidden",
                id: "page-image-upload"
              }
            ),
            /* @__PURE__ */ l.jsx(
              "label",
              {
                htmlFor: "page-image-upload",
                className: `px-8 py-3 rounded-lg transition-colors cursor-pointer text-sm font-medium w-full text-center ${n ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"}`,
                children: n ? "Uploading..." : "Choose Image File"
              }
            ),
            /* @__PURE__ */ l.jsxs("div", { className: "text-center space-y-1", children: [
              n && /* @__PURE__ */ l.jsx("div", { className: "text-sm text-blue-600 font-medium", children: "⏳ Uploading image to server..." }),
              t.image && !n && /* @__PURE__ */ l.jsx("div", { className: "text-sm text-green-600 font-medium", children: "✅ Image saved successfully" }),
              /* @__PURE__ */ l.jsx("p", { className: "text-xs text-gray-500", children: e ? "Images will be uploaded to your server" : "Images will be stored locally (demo mode)" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ l.jsxs("div", { className: "border-b border-gray-100 pb-4", children: [
        /* @__PURE__ */ l.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Status" }),
        /* @__PURE__ */ l.jsx(
          "select",
          {
            value: t.status || "draft",
            onChange: (S) => c("status", S.target.value),
            className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            children: h.map((S) => /* @__PURE__ */ l.jsx("option", { value: S, children: S.charAt(0).toUpperCase() + S.slice(1) }, S))
          }
        ),
        /* @__PURE__ */ l.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Set the publication status of this page" })
      ] }),
      /* @__PURE__ */ l.jsx("div", { className: "border-b border-gray-100 pb-4", children: /* @__PURE__ */ l.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Show Component Menu" }),
          /* @__PURE__ */ l.jsx("p", { className: "text-xs text-gray-500", children: "Display the menu bar with delete button on each component" })
        ] }),
        /* @__PURE__ */ l.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ l.jsx(
          "input",
          {
            type: "checkbox",
            checked: t.showMenubar,
            onChange: (S) => c(
              "showMenubar",
              S.target.checked
            ),
            className: "w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ l.jsxs("div", { children: [
        /* @__PURE__ */ l.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Margin" }),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            type: "text",
            value: t.margin,
            onChange: (S) => c("margin", S.target.value),
            className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            placeholder: "e.g., 0, 10px, 1rem"
          }
        ),
        /* @__PURE__ */ l.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Space around the entire page content" })
      ] }),
      /* @__PURE__ */ l.jsxs("div", { children: [
        /* @__PURE__ */ l.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Padding" }),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            type: "text",
            value: t.padding,
            onChange: (S) => c("padding", S.target.value),
            className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            placeholder: "e.g., 20px, 2rem"
          }
        ),
        /* @__PURE__ */ l.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Space inside the page container" })
      ] }),
      /* @__PURE__ */ l.jsxs("div", { children: [
        /* @__PURE__ */ l.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Background Color" }),
        /* @__PURE__ */ l.jsxs("div", { className: "flex gap-4 items-center", children: [
          /* @__PURE__ */ l.jsx(
            "input",
            {
              type: "color",
              value: t.background,
              onChange: (S) => c("background", S.target.value),
              className: "w-16 h-16 border border-gray-300 rounded-lg cursor-pointer shadow-sm"
            }
          ),
          /* @__PURE__ */ l.jsx(
            "input",
            {
              type: "text",
              value: t.background,
              onChange: (S) => c("background", S.target.value),
              className: "flex-1 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              placeholder: "#ffffff, rgb(255,255,255), etc."
            }
          )
        ] }),
        /* @__PURE__ */ l.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Background color for the main content area" })
      ] })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl", children: [
      /* @__PURE__ */ l.jsx("h4", { className: "font-medium text-blue-800 mb-3 text-lg", children: "Current Page Configuration" }),
      /* @__PURE__ */ l.jsxs("div", { className: "text-sm text-blue-700 grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ l.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ l.jsx("span", { className: "font-medium", children: "Menu Bar:" }),
          /* @__PURE__ */ l.jsx(
            "code",
            {
              className: `px-2 py-1 rounded ${t.showMenubar ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`,
              children: t.showMenubar ? "Visible" : "Hidden"
            }
          )
        ] }),
        /* @__PURE__ */ l.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ l.jsx("span", { className: "font-medium", children: "Status:" }),
          /* @__PURE__ */ l.jsx("code", { className: "px-2 py-1 rounded bg-gray-100", children: t.status || "draft" })
        ] }),
        /* @__PURE__ */ l.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ l.jsx("span", { className: "font-medium", children: "Margin:" }),
          /* @__PURE__ */ l.jsx("code", { className: "px-2 py-1 rounded bg-gray-100", children: t.margin || "Not set" })
        ] }),
        /* @__PURE__ */ l.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ l.jsx("span", { className: "font-medium", children: "Padding:" }),
          /* @__PURE__ */ l.jsx("code", { className: "px-2 py-1 rounded bg-gray-100", children: t.padding || "Not set" })
        ] }),
        /* @__PURE__ */ l.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ l.jsx("span", { className: "font-medium", children: "Background:" }),
          /* @__PURE__ */ l.jsx("code", { className: "px-2 py-1 rounded bg-gray-100 truncate max-w-[120px]", children: t.background || "Not set" })
        ] }),
        /* @__PURE__ */ l.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ l.jsx("span", { className: "font-medium", children: "Lists:" }),
          /* @__PURE__ */ l.jsxs("code", { className: "px-2 py-1 rounded bg-gray-100", children: [
            (($ = t.lists) == null ? void 0 : $.length) || 0,
            " lists, ",
            m,
            " items"
          ] })
        ] }),
        /* @__PURE__ */ l.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ l.jsx("span", { className: "font-medium", children: "Data Sources:" }),
          /* @__PURE__ */ l.jsxs("code", { className: "px-2 py-1 rounded bg-gray-100", children: [
            ((y = t.dataSources) == null ? void 0 : y.length) || 0,
            " configured"
          ] })
        ] }),
        /* @__PURE__ */ l.jsxs("div", { className: "col-span-2 flex items-start space-x-2", children: [
          /* @__PURE__ */ l.jsx("span", { className: "font-medium whitespace-nowrap", children: "Image:" }),
          /* @__PURE__ */ l.jsx("code", { className: "px-2 py-1 rounded bg-gray-100 break-all flex-1", children: t.image ? t.image.length > 80 ? t.image.substring(0, 80) + "..." : t.image : "Not set" })
        ] })
      ] }),
      (((p = t.lists) == null ? void 0 : p.length) > 0 || ((g = t.dataSources) == null ? void 0 : g.length) > 0) && /* @__PURE__ */ l.jsxs("div", { className: "mt-4 pt-4 border-t border-blue-200", children: [
        /* @__PURE__ */ l.jsx("h5", { className: "font-medium text-blue-800 mb-2 text-sm", children: "Quick Statistics" }),
        /* @__PURE__ */ l.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [
          ((v = t.lists) == null ? void 0 : v.length) > 0 && /* @__PURE__ */ l.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ l.jsx("span", { className: "text-blue-700", children: "Total Lists:" }),
            /* @__PURE__ */ l.jsx("span", { className: "font-medium", children: t.lists.length })
          ] }),
          m > 0 && /* @__PURE__ */ l.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ l.jsx("span", { className: "text-blue-700", children: "Total List Items:" }),
            /* @__PURE__ */ l.jsx("span", { className: "font-medium", children: m })
          ] }),
          ((_ = t.dataSources) == null ? void 0 : _.length) > 0 && /* @__PURE__ */ l.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ l.jsx("span", { className: "text-blue-700", children: "API Data Sources:" }),
            /* @__PURE__ */ l.jsx("span", { className: "font-medium", children: t.dataSources.filter(
              (S) => S.type === "api"
            ).length })
          ] }),
          ((w = t.dataSources) == null ? void 0 : w.length) > 0 && /* @__PURE__ */ l.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ l.jsx("span", { className: "text-blue-700", children: "Static Data Sources:" }),
            /* @__PURE__ */ l.jsx("span", { className: "font-medium", children: t.dataSources.filter(
              (S) => S.type === "static"
            ).length })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "mt-6 p-4 bg-green-50 border border-green-200 rounded-lg", children: [
      /* @__PURE__ */ l.jsx("h4", { className: "font-medium text-green-800 mb-2 text-sm", children: "💡 Usage Tips" }),
      /* @__PURE__ */ l.jsxs("ul", { className: "text-xs text-green-700 space-y-1", children: [
        /* @__PURE__ */ l.jsxs("li", { children: [
          "• Use the ",
          /* @__PURE__ */ l.jsx("strong", { children: "List tab" }),
          " to create dropdown options, radio choices, etc."
        ] }),
        /* @__PURE__ */ l.jsxs("li", { children: [
          "• Use the ",
          /* @__PURE__ */ l.jsx("strong", { children: "Data Source tab" }),
          " to configure APIs for dynamic content"
        ] }),
        /* @__PURE__ */ l.jsxs("li", { children: [
          "• Reference lists in components with:",
          " ",
          /* @__PURE__ */ l.jsx("code", { children: "{{list.your_list_name}}" })
        ] }),
        /* @__PURE__ */ l.jsxs("li", { children: [
          "• Reference data sources with:",
          " ",
          /* @__PURE__ */ l.jsx("code", { children: "{{dataSource.source_name.field}}" })
        ] }),
        /* @__PURE__ */ l.jsx("li", { children: "• All configurations are automatically saved with your page" })
      ] })
    ] })
  ] });
}, Zs = (e, t) => {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (e == null || t == null) return e === t;
  if (Array.isArray(e)) {
    if (!Array.isArray(t) || e.length !== t.length) return !1;
    for (let r = 0; r < e.length; r++)
      if (!Zs(e[r], t[r])) return !1;
    return !0;
  }
  if (typeof e == "object") {
    const r = Object.keys(e), n = Object.keys(t);
    if (r.length !== n.length) return !1;
    for (const s of r)
      if (!t.hasOwnProperty(s) || !Zs(e[s], t[s])) return !1;
    return !0;
  }
  return e === t;
}, e9 = () => {
  const { attributes: e, setPageAttributes: t } = Gt(), [r, n] = te([]), [s, a] = te(null), [i, o] = te(""), [c, d] = te(""), [u, f] = te(null), h = st(r);
  h.current = r, De(() => {
    const N = (e == null ? void 0 : e.lists) || [];
    Zs(N, h.current) || n(Array.isArray(N) ? N : []);
  }, [e == null ? void 0 : e.lists]), De(() => {
    const N = (e == null ? void 0 : e.lists) || [];
    Zs(N, r) || t((A) => ({
      ...A,
      lists: r
    }));
  }, [r]);
  const m = Y(
    (N, A) => ({
      id: `list_${Date.now()}`,
      name: N,
      description: A,
      items: []
    }),
    []
  ), b = Y(() => {
    if (!i.trim()) return;
    const N = m(i.trim(), c);
    n((A) => [...A, N]), o(""), d(""), a(N.id);
  }, [i, c, m]), $ = Y((N) => {
    n((A) => A.filter((R) => R.id !== N)), a((A) => A === N ? null : A);
  }, []), y = Y((N) => {
    const A = {
      id: `item_${Date.now()}`,
      label: "New Item",
      value: "new_item"
    };
    n(
      (R) => R.map(
        (L) => L.id === N ? { ...L, items: [...L.items, A] } : L
      )
    ), a(N);
  }, []), p = Y(
    (N, A, R, L) => {
      n(
        (W) => W.map(
          (I) => I.id === N ? {
            ...I,
            items: I.items.map(
              (P) => P.id === A ? { ...P, [R]: L } : P
            )
          } : I
        )
      );
    },
    []
  ), g = Y((N, A) => {
    n(
      (R) => R.map(
        (L) => L.id === N ? { ...L, items: L.items.filter((W) => W.id !== A) } : L
      )
    );
  }, []), v = Y(
    (N, A, R) => {
      if (A === R) return N;
      const L = N.slice(), [W] = L.splice(A, 1);
      return L.splice(R, 0, W), L;
    },
    []
  ), _ = Y(
    (N, A, R) => {
      n(
        (L) => L.map(
          (W) => W.id === N ? { ...W, items: v(W.items, A, R) } : W
        )
      );
    },
    [v]
  ), w = Y((N, A) => {
    f(A);
    try {
      N.dataTransfer.setData("text/plain", A);
    } catch {
    }
    N.dataTransfer.effectAllowed = "move";
  }, []), S = Y((N) => {
    N.preventDefault(), N.dataTransfer.dropEffect = "move";
  }, []), O = Y(
    (N, A, R) => {
      N.preventDefault();
      const L = u || (() => {
        try {
          return N.dataTransfer.getData("text/plain");
        } catch {
          return null;
        }
      })();
      if (!L) return;
      const W = h.current.find((P) => P.id === A);
      if (!W) return;
      const I = W.items.findIndex((P) => P.id === L);
      I !== -1 && (_(A, I, R), f(null));
    },
    [u, _]
  ), D = Bt(() => r, [r]);
  return /* @__PURE__ */ l.jsxs("div", { className: "h-full p-4 space-y-4 bg-zinc-200 overflow-y-auto scrollbar-thin", children: [
    /* @__PURE__ */ l.jsx("h3", { className: "text-lg font-medium mb-3", children: "List Manager" }),
    /* @__PURE__ */ l.jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-4", children: [
      /* @__PURE__ */ l.jsx("h4", { className: "font-medium text-gray-800 mb-3", children: "Create New List" }),
      /* @__PURE__ */ l.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "List Name *" }),
          /* @__PURE__ */ l.jsx(
            "input",
            {
              type: "text",
              value: i,
              onChange: (N) => o(N.target.value),
              placeholder: "Enter list name",
              className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            }
          )
        ] }),
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Description" }),
          /* @__PURE__ */ l.jsx(
            "input",
            {
              type: "text",
              value: c,
              onChange: (N) => d(N.target.value),
              placeholder: "Enter list description",
              className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ l.jsx(
        "button",
        {
          onClick: b,
          disabled: !i.trim(),
          className: "mt-3 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm font-medium transition-colors duration-200",
          children: "Create List"
        }
      )
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ l.jsxs("h4", { className: "font-medium text-gray-800", children: [
        "Your Lists (",
        r.length,
        ")"
      ] }),
      D.length === 0 ? /* @__PURE__ */ l.jsxs("div", { className: "text-center py-8 text-gray-500 bg-white rounded-lg border border-gray-200", children: [
        /* @__PURE__ */ l.jsx("div", { className: "text-3xl mb-2", children: "📝" }),
        /* @__PURE__ */ l.jsx("p", { className: "text-sm", children: "No lists created yet" }),
        /* @__PURE__ */ l.jsx("p", { className: "text-xs mt-1", children: "Create your first list above" })
      ] }) : D.map((N) => {
        const A = s === N.id;
        return /* @__PURE__ */ l.jsxs(
          "div",
          {
            className: "bg-white rounded-lg border border-gray-200 overflow-hidden",
            children: [
              /* @__PURE__ */ l.jsxs(
                "div",
                {
                  className: "flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200 group",
                  onClick: () => a(
                    (R) => R === N.id ? null : N.id
                  ),
                  children: [
                    /* @__PURE__ */ l.jsxs("div", { className: "flex items-center space-x-3", children: [
                      A ? /* @__PURE__ */ l.jsx(of, { className: "w-4 h-4 text-gray-500" }) : /* @__PURE__ */ l.jsx(af, { className: "w-4 h-4 text-gray-500" }),
                      /* @__PURE__ */ l.jsxs("div", { children: [
                        /* @__PURE__ */ l.jsx("h5", { className: "font-medium text-gray-900 text-sm", children: N.name }),
                        /* @__PURE__ */ l.jsxs("p", { className: "text-xs text-gray-500", children: [
                          N.description || "No description",
                          " •",
                          " ",
                          N.items.length,
                          " items"
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ l.jsx(
                      "button",
                      {
                        onClick: (R) => {
                          R.stopPropagation(), $(N.id);
                        },
                        className: "p-1 text-red-600 hover:bg-red-50 rounded transition-colors duration-200 opacity-0 group-hover:opacity-100",
                        "aria-label": `Delete ${N.name}`,
                        children: /* @__PURE__ */ l.jsx(Ps, { className: "w-4 h-4" })
                      }
                    )
                  ]
                }
              ),
              A && /* @__PURE__ */ l.jsxs(
                "div",
                {
                  className: "border-t border-gray-200 p-3",
                  role: "region",
                  "aria-labelledby": `list-${N.id}`,
                  children: [
                    /* @__PURE__ */ l.jsxs("div", { className: "flex justify-between items-center mb-3", children: [
                      /* @__PURE__ */ l.jsx("span", { className: "text-sm font-medium text-gray-700", children: "List Items" }),
                      /* @__PURE__ */ l.jsxs(
                        "button",
                        {
                          onClick: () => y(N.id),
                          className: "flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium transition-colors duration-200",
                          children: [
                            /* @__PURE__ */ l.jsx(ly, { className: "w-4 h-4" }),
                            "Add Item"
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ l.jsx("div", { className: "space-y-2", children: N.items.length === 0 ? /* @__PURE__ */ l.jsx("div", { className: "text-center py-4 text-gray-500 text-sm", children: "No items in this list" }) : N.items.map((R, L) => /* @__PURE__ */ l.jsxs(
                      "div",
                      {
                        className: "flex items-center space-x-2 p-2 border border-gray-200 rounded bg-gray-50 group transition-colors duration-200",
                        draggable: !0,
                        onDragStart: (W) => w(W, R.id),
                        onDragOver: S,
                        onDrop: (W) => O(W, N.id, L),
                        children: [
                          /* @__PURE__ */ l.jsx(Dg, { className: "w-4 h-4 text-gray-400 cursor-move flex-shrink-0" }),
                          /* @__PURE__ */ l.jsxs("div", { className: "grid grid-cols-2 gap-2 flex-1 min-w-0", children: [
                            /* @__PURE__ */ l.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ l.jsx(
                              "input",
                              {
                                type: "text",
                                value: R.label,
                                onChange: (W) => p(
                                  N.id,
                                  R.id,
                                  "label",
                                  W.target.value
                                ),
                                placeholder: "Label",
                                className: "w-full p-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              }
                            ) }),
                            /* @__PURE__ */ l.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ l.jsx(
                              "input",
                              {
                                type: "text",
                                value: R.value,
                                onChange: (W) => p(
                                  N.id,
                                  R.id,
                                  "value",
                                  W.target.value
                                ),
                                placeholder: "Value",
                                className: "w-full p-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              }
                            ) })
                          ] }),
                          /* @__PURE__ */ l.jsx(
                            "button",
                            {
                              onClick: () => g(N.id, R.id),
                              className: "p-1 text-red-600 hover:bg-red-50 rounded transition-colors duration-200 opacity-0 group-hover:opacity-100 flex-shrink-0",
                              "aria-label": `Delete item ${R.label}`,
                              children: /* @__PURE__ */ l.jsx(Ps, { className: "w-4 h-4" })
                            }
                          )
                        ]
                      },
                      R.id
                    )) }),
                    N.items.length > 1 && /* @__PURE__ */ l.jsx("p", { className: "text-xs text-gray-500 mt-2 text-center", children: "💡 Drag items to reorder them" })
                  ]
                }
              )
            ]
          },
          N.id
        );
      })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "p-4 bg-blue-50 border border-blue-200 rounded-lg", children: [
      /* @__PURE__ */ l.jsx("h4", { className: "font-medium text-blue-800 mb-2 text-sm", children: "How to Use Lists" }),
      /* @__PURE__ */ l.jsxs("ul", { className: "text-xs text-blue-700 space-y-1", children: [
        /* @__PURE__ */ l.jsx("li", { children: "• Create lists for dropdowns, radio groups, or checkboxes" }),
        /* @__PURE__ */ l.jsxs("li", { children: [
          "• Reference lists in components using: ",
          "{{list.your_list_name}}"
        ] }),
        /* @__PURE__ */ l.jsx("li", { children: "• Drag items to reorder them within a list" }),
        /* @__PURE__ */ l.jsx("li", { children: "• Lists are saved with the page and available across components" })
      ] })
    ] })
  ] });
}, Xs = (e, t) => {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (e == null || t == null) return e === t;
  if (Array.isArray(e)) {
    if (!Array.isArray(t) || e.length !== t.length) return !1;
    for (let r = 0; r < e.length; r++) if (!Xs(e[r], t[r])) return !1;
    return !0;
  }
  if (typeof e == "object") {
    const r = Object.keys(e), n = Object.keys(t);
    if (r.length !== n.length) return !1;
    for (const s of r)
      if (!Xs(e[s], t[s])) return !1;
    return !0;
  }
  return e === t;
}, t9 = () => {
  var $;
  const { attributes: e, setPageAttributes: t } = Gt(), [r, n] = te([]), s = st(r);
  s.current = r;
  const [a, i] = te(
    null
  ), [o, c] = te({
    type: "api",
    method: "GET",
    headers: {},
    parameters: {},
    mapping: {},
    refreshInterval: 0
  }), [d, u] = te(!1);
  De(() => {
    const y = e.dataSources || [];
    Xs(y, s.current) || n(Array.isArray(y) ? y : []);
  }, [e.dataSources]), De(() => {
    const y = e.dataSources || [];
    Xs(y, r) || t((p) => ({
      ...p,
      dataSources: r
    }));
  }, [r, e.dataSources, t]);
  const f = Y(() => {
    var p;
    if (!((p = o.name) != null && p.trim())) return;
    const y = {
      id: `ds_${Date.now()}`,
      name: o.name,
      description: o.description || "",
      type: o.type || "api",
      endpoint: o.endpoint || "",
      method: o.method || "GET",
      headers: o.headers || {},
      parameters: o.parameters || {},
      mapping: o.mapping || {},
      refreshInterval: o.refreshInterval || 0
    };
    n((g) => [...g, y]), i(y.id), c({
      type: "api",
      method: "GET",
      headers: {},
      parameters: {},
      mapping: {},
      refreshInterval: 0
    });
  }, [o]), h = Y(
    (y) => {
      n((p) => p.filter((g) => g.id !== y)), a === y && i(null);
    },
    [a]
  ), m = Y(
    (y, p) => {
      n(
        (g) => g.map((v) => v.id === y ? { ...v, ...p } : v)
      );
    },
    []
  ), b = Y(
    async (y) => {
      u(!0);
      try {
        await new Promise((g) => setTimeout(g, 2e3));
        const p = {
          items: [
            { id: 1, name: "Test Item 1" },
            { id: 2, name: "Test Item 2" }
          ],
          total: 2
        };
        m(y.id, {
          data: p,
          lastFetched: (/* @__PURE__ */ new Date()).toISOString()
        }), alert("Data source test successful!");
      } catch (p) {
        alert("Data source test failed: " + p.message);
      } finally {
        u(!1);
      }
    },
    [m]
  );
  return /* @__PURE__ */ l.jsxs("div", { className: "h-full p-4 space-y-4 bg-zinc-200 overflow-y-auto scrollbar-thin", children: [
    /* @__PURE__ */ l.jsx("h3", { className: "text-lg font-medium mb-3", children: "Data Source Manager" }),
    /* @__PURE__ */ l.jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-4", children: [
      /* @__PURE__ */ l.jsx("h4", { className: "font-medium text-gray-800 mb-3", children: "Create Data Source" }),
      /* @__PURE__ */ l.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Name *" }),
          /* @__PURE__ */ l.jsx(
            "input",
            {
              type: "text",
              value: o.name || "",
              onChange: (y) => c((p) => ({
                ...p,
                name: y.target.value
              })),
              placeholder: "Enter data source name",
              className: "w-full p-2 border border-gray-300 rounded text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Type" }),
          /* @__PURE__ */ l.jsxs(
            "select",
            {
              value: o.type || "api",
              onChange: (y) => c((p) => ({
                ...p,
                type: y.target.value
              })),
              className: "w-full p-2 border border-gray-300 rounded text-sm",
              children: [
                /* @__PURE__ */ l.jsx("option", { value: "api", children: "API" }),
                /* @__PURE__ */ l.jsx("option", { value: "static", children: "Static Data" }),
                /* @__PURE__ */ l.jsx("option", { value: "function", children: "Function" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ l.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ l.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Description" }),
          /* @__PURE__ */ l.jsx(
            "input",
            {
              type: "text",
              value: o.description || "",
              onChange: (y) => c((p) => ({
                ...p,
                description: y.target.value
              })),
              placeholder: "Enter description",
              className: "w-full p-2 border border-gray-300 rounded text-sm"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ l.jsx(
        "button",
        {
          onClick: f,
          disabled: !(($ = o.name) != null && $.trim()),
          className: "mt-3 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 text-sm font-medium",
          children: "Create Data Source"
        }
      )
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ l.jsxs("h4", { className: "font-medium text-gray-800", children: [
        "Your Data Sources (",
        r.length,
        ")"
      ] }),
      r.length === 0 ? /* @__PURE__ */ l.jsxs("div", { className: "text-center py-8 text-gray-500 bg-white rounded-lg border border-gray-200", children: [
        /* @__PURE__ */ l.jsx("div", { className: "text-3xl mb-2", children: "📊" }),
        /* @__PURE__ */ l.jsx("p", { className: "text-sm", children: "No data sources configured" }),
        /* @__PURE__ */ l.jsx("p", { className: "text-xs mt-1", children: "Create your first data source above" })
      ] }) : r.map((y) => {
        const p = a === y.id;
        return /* @__PURE__ */ l.jsxs(
          "div",
          {
            className: "bg-white rounded-lg border border-gray-200 overflow-hidden",
            children: [
              /* @__PURE__ */ l.jsxs(
                "div",
                {
                  className: "flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 group",
                  onClick: () => i(
                    (g) => g === y.id ? null : y.id
                  ),
                  children: [
                    /* @__PURE__ */ l.jsxs("div", { className: "flex items-center space-x-3", children: [
                      p ? /* @__PURE__ */ l.jsx(of, { className: "w-4 h-4 text-gray-500" }) : /* @__PURE__ */ l.jsx(af, { className: "w-4 h-4 text-gray-500" }),
                      /* @__PURE__ */ l.jsxs("div", { children: [
                        /* @__PURE__ */ l.jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ l.jsx("h5", { className: "font-medium text-gray-900 text-sm", children: y.name }),
                          /* @__PURE__ */ l.jsx(
                            "span",
                            {
                              className: `px-2 py-1 rounded text-xs ${y.type === "api" ? "bg-green-100 text-green-800" : y.type === "static" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}`,
                              children: y.type
                            }
                          )
                        ] }),
                        /* @__PURE__ */ l.jsxs("p", { className: "text-xs text-gray-500", children: [
                          y.description || "No description",
                          y.lastFetched && ` • Last fetched: ${new Date(
                            y.lastFetched
                          ).toLocaleDateString()}`
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ l.jsx(
                      "button",
                      {
                        onClick: (g) => {
                          g.stopPropagation(), h(y.id);
                        },
                        className: "p-1 text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100",
                        children: /* @__PURE__ */ l.jsx(Ps, { className: "w-4 h-4" })
                      }
                    )
                  ]
                }
              ),
              p && /* @__PURE__ */ l.jsxs("div", { className: "border-t border-gray-200 p-4 space-y-4", children: [
                /* @__PURE__ */ l.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ l.jsxs("div", { children: [
                    /* @__PURE__ */ l.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Endpoint URL" }),
                    /* @__PURE__ */ l.jsx(
                      "input",
                      {
                        type: "text",
                        value: y.endpoint,
                        onChange: (g) => m(y.id, {
                          endpoint: g.target.value
                        }),
                        placeholder: "https://api.example.com/data",
                        className: "w-full p-2 border border-gray-300 rounded text-sm"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ l.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                    /* @__PURE__ */ l.jsxs("div", { children: [
                      /* @__PURE__ */ l.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "HTTP Method" }),
                      /* @__PURE__ */ l.jsxs(
                        "select",
                        {
                          value: y.method,
                          onChange: (g) => m(y.id, {
                            method: g.target.value
                          }),
                          className: "w-full p-2 border border-gray-300 rounded text-sm",
                          children: [
                            /* @__PURE__ */ l.jsx("option", { value: "GET", children: "GET" }),
                            /* @__PURE__ */ l.jsx("option", { value: "POST", children: "POST" }),
                            /* @__PURE__ */ l.jsx("option", { value: "PUT", children: "PUT" }),
                            /* @__PURE__ */ l.jsx("option", { value: "DELETE", children: "DELETE" })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ l.jsxs("div", { children: [
                      /* @__PURE__ */ l.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Refresh (min)" }),
                      /* @__PURE__ */ l.jsx(
                        "input",
                        {
                          type: "number",
                          min: 0,
                          value: y.refreshInterval,
                          onChange: (g) => m(y.id, {
                            refreshInterval: parseInt(g.target.value) || 0
                          }),
                          className: "w-full p-2 border border-gray-300 rounded text-sm"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ l.jsxs("div", { children: [
                  /* @__PURE__ */ l.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Response Mapping" }),
                  /* @__PURE__ */ l.jsx(
                    "textarea",
                    {
                      value: JSON.stringify(y.mapping, null, 2),
                      onChange: (g) => {
                        try {
                          const v = JSON.parse(g.target.value);
                          m(y.id, { mapping: v });
                        } catch {
                        }
                      },
                      rows: 3,
                      className: "w-full p-2 border border-gray-300 rounded text-xs font-mono"
                    }
                  ),
                  /* @__PURE__ */ l.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Map API response fields to component properties" })
                ] }),
                y.data && /* @__PURE__ */ l.jsxs("div", { children: [
                  /* @__PURE__ */ l.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Test Response Data" }),
                  /* @__PURE__ */ l.jsx("pre", { className: "max-h-32 overflow-auto p-3 bg-gray-100 border border-gray-300 rounded text-xs font-mono", children: JSON.stringify(y.data, null, 2) })
                ] }),
                /* @__PURE__ */ l.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ l.jsxs(
                  "button",
                  {
                    onClick: () => b(y),
                    disabled: d,
                    className: "flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 text-sm",
                    children: [
                      /* @__PURE__ */ l.jsx(iy, { className: "w-4 h-4" }),
                      d ? "Testing..." : "Test Data Source"
                    ]
                  }
                ) })
              ] })
            ]
          },
          y.id
        );
      })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "p-4 bg-blue-50 border border-blue-200 rounded-lg", children: [
      /* @__PURE__ */ l.jsx("h4", { className: "text-sm font-medium text-blue-800 mb-2", children: "How to Use Data Sources" }),
      /* @__PURE__ */ l.jsxs("ul", { className: "text-xs text-blue-700 space-y-1", children: [
        /* @__PURE__ */ l.jsx("li", { children: "• Configure APIs to fetch dynamic data for your components" }),
        /* @__PURE__ */ l.jsx("li", { children: "• Use response mapping to transform API data" }),
        /* @__PURE__ */ l.jsxs("li", { children: [
          "• Reference data using: ",
          "{{dataSource.your_source.field}}"
        ] }),
        /* @__PURE__ */ l.jsx("li", { children: "• Data sources can auto-refresh at specified intervals" })
      ] })
    ] })
  ] });
};
function Yu({
  onClick: e,
  icon: t,
  label: r,
  className: n = "",
  successMessage: s = "Success",
  errorMessage: a = "Error"
}) {
  const [i, o] = te(null), [c, d] = te(!1), u = async () => {
    d(!0), o(null);
    try {
      await e(), o({ message: s, type: "success" });
    } catch {
      o({ message: a, type: "error" });
    } finally {
      d(!1), setTimeout(() => o(null), 3e3);
    }
  };
  return /* @__PURE__ */ l.jsxs("div", { className: "relative z-30", children: [
    /* @__PURE__ */ l.jsx(
      "button",
      {
        onClick: u,
        disabled: c,
        className: `p-2 rounded-lg transition flex items-center ${n} ${c ? "opacity-70" : ""}`,
        children: c ? /* @__PURE__ */ l.jsx(sf, { className: "stack-btn-icon animate-spin" }) : /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          t,
          /* @__PURE__ */ l.jsx("span", { className: "ml-1 text-sm sm:inline", children: r })
        ] })
      }
    ),
    i && /* @__PURE__ */ l.jsx(
      "div",
      {
        className: `absolute top-full left-0 mt-1 w-full text-center px-2 py-1 rounded-md text-xs font-medium animate-fadeIn ${i.type === "success" ? "bg-blue-500 text-white" : "bg-red-100 text-red-800"}`,
        children: i.message
      }
    )
  ] });
}
function pn({
  onClick: e,
  icon: t,
  tooltip: r,
  className: n = ""
}) {
  return /* @__PURE__ */ l.jsxs("div", { className: "relative group", children: [
    /* @__PURE__ */ l.jsx(
      "button",
      {
        onClick: e,
        className: `p-2 rounded-lg transition ${n}`,
        children: t
      }
    ),
    /* @__PURE__ */ l.jsxs("div", { className: "absolute top-full left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10", children: [
      r,
      /* @__PURE__ */ l.jsx("div", { className: "absolute bottom-full left-1/2 w-2 h-2 bg-black transform -translate-x-1/2 rotate-45 -mb-1" })
    ] })
  ] });
}
const r9 = () => {
  const [e, t] = te(!1);
  return De(() => {
    const r = () => {
      t(window.innerWidth <= 768);
    };
    return r(), window.addEventListener("resize", r), () => {
      window.removeEventListener("resize", r);
    };
  }, []), e;
}, n9 = (e) => {
  const t = "w-5 h-5";
  switch (e) {
    case "components":
      return /* @__PURE__ */ l.jsx(uc, { className: t });
    case "properties":
      return /* @__PURE__ */ l.jsx(Gg, { className: t });
    case "page":
      return /* @__PURE__ */ l.jsx(Yg, { className: t });
    case "list":
      return /* @__PURE__ */ l.jsx(ry, { className: t });
    case "datasource":
      return /* @__PURE__ */ l.jsx(Bg, { className: t });
    default:
      return /* @__PURE__ */ l.jsx(uc, { className: t });
  }
}, s9 = ({
  pageid: e,
  pageMode: t,
  onSaveLayout: r,
  onLoadLayout: n,
  componentMapProvider: s,
  componentPropsProvider: a,
  gobackList: i,
  onFileUpload: o,
  onApiCall: c,
  onCustomAction: d,
  onGetSelectOptions: u,
  children: f
}) => {
  const [h, m] = te(
    t
  ), b = r9(), [$, y] = te(!b), [p, g] = te(!1), v = st(!0), {
    activeTab: _,
    setActiveTab: w,
    attributes: S,
    setPageAttributes: O,
    setSelectedInstance: D,
    setSelectedComponent: N,
    widgetProps: A
    // Add this to get widgetProps from context
  } = Gt(), [R, L] = te({
    id: e,
    type: "page",
    title: "untitled page",
    layout: Ha
  }), [W, I] = te(), [P, k] = te(), [V, q] = te(0), [Z, M] = te(Ha), E = st(null), [F, C] = te(), [x, j] = te(!1);
  De(() => {
    m(t);
  }, [t]), De(() => {
    setTimeout(() => {
      v.current && b && (v.current = !1, y(!b));
    }, 100);
  }, [b]), De(() => {
    h === "preview" || h === "view" ? O((J) => ({
      ...J,
      showMenubar: !1
    })) : h === "edit" && O((J) => ({
      ...J,
      showMenubar: !0
    }));
  }, [h, O]);
  const T = Y(
    async (J) => {
      const Se = await n(J);
      return L(Se), I(Se.title), k(Se.title), O(Se.attributes || S), Se.layout;
    },
    [n]
  ), z = Y(async () => {
    if (e) {
      L((Se) => ({ ...Se, id: e }));
      const J = await T(e);
      M(J), q((Se) => Se + 1), de(), console.log(`Reload layout: pageid ${e}, props id ${R == null ? void 0 : R.id}`);
    }
  }, [e, T]);
  De(() => {
    (async () => {
      if (e)
        try {
          await z();
        } catch (Se) {
          console.error("Failed to load layout:", Se);
        }
    })();
  }, [e, z]);
  const K = () => {
    i && i();
  }, ne = (J, Se) => {
    if (!J) return J;
    const xt = Array.isArray(J) ? J : J.children;
    if (!xt) return J;
    const yr = xt.map((Le) => {
      if (Le.id && Se.has(Le.id)) {
        const sn = Se.get(Le.id);
        try {
          let wt = { name: "", props: {} };
          return Le.content && (wt = JSON.parse(Le.content)), wt.props = { ...wt.props, ...sn }, {
            ...Le,
            content: JSON.stringify(wt)
          };
        } catch (wt) {
          return console.error(`Error updating props for widget ${Le.id}:`, wt), Le;
        }
      }
      return Le;
    });
    return Array.isArray(J) ? yr : {
      ...J,
      children: yr
    };
  }, X = () => {
    var xt;
    let J = (xt = E.current) == null ? void 0 : xt.saveLayout();
    return J && (J = ne(J, A)), {
      ...R,
      id: e,
      layout: J,
      attributes: S,
      type: S.type,
      title: S.title,
      status: S.status,
      published_at: S.published_at
    };
  }, me = async () => {
    if (r) {
      const J = X();
      await r(J);
    }
  }, de = () => {
    N(null), D(null);
  }, ge = () => {
    confirm("Are you sure you want to clear all data? This cannot be undone.") && (M(Ha), q((J) => J + 1), de());
  }, Me = () => {
    g(!0);
  }, je = () => {
    g(!1);
  }, Fe = (J) => {
    J.key === "Enter" ? je() : J.key === "Escape" && (k(W), g(!1));
  }, lt = (J, Se) => {
    J.dataTransfer.setData("text/plain", Se), J.dataTransfer.effectAllowed = "copy";
  }, Ft = (J) => {
    C(J);
  }, Rt = Y(
    (J) => {
      const Se = {
        id: J.id,
        type: J.name,
        props: J.props
      };
      D(Se), N(J.name), w("properties");
    },
    [D, N, w]
  );
  De(() => {
    F && E.current && (F.name !== "SubGrid" ? E.current.addWidget((J) => ({
      ...F,
      sizeToContent: !0,
      content: JSON.stringify({
        name: F.name,
        props: fy(a)[F.name]
      })
    })) : E.current.addSubGrid((J) => ({
      ...F,
      ...uy
    })));
  }, [F, a]);
  const rn = b ? {
    width: "100vw",
    minWidth: "100vw",
    height: "calc(100% - var(--stackpage-top-spacing, 60px))",
    top: "var(--stackpage-top-spacing, 60px)",
    zIndex: 101
  } : {
    width: "500px",
    minWidth: "300px",
    height: "calc(100% - var(--stackpage-top-spacing, 60px))",
    top: "var(--stackpage-top-spacing, 60px)"
  }, nn = {
    margin: S.margin,
    padding: S.padding,
    backgroundColor: S.background
  };
  return /* @__PURE__ */ l.jsx(ug, { initialOptions: Z, children: /* @__PURE__ */ l.jsxs("div", { className: "min-h-screen bg-white text-black flex flex-col", children: [
    h === "edit" && /* @__PURE__ */ l.jsx("header", { className: "mx-2 p-4 bg-white shadow relative", children: /* @__PURE__ */ l.jsxs("div", { className: "flex flex-col md:flex-row md:items-center text-lg", children: [
      /* @__PURE__ */ l.jsx("div", { className: "flex-1 mb-3 sm:mb-0 min-w-0", children: /* @__PURE__ */ l.jsx("div", { className: "flex items-center gap-2", children: p ? /* @__PURE__ */ l.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ l.jsx(
        "input",
        {
          type: "text",
          value: P,
          onChange: (J) => k(J.target.value),
          onKeyDown: Fe,
          onBlur: je,
          maxLength: 100,
          className: "text-2xl font-bold border-b-2 border-blue-500 bg-transparent outline-none px-1",
          autoFocus: !0
        }
      ) }) : /* @__PURE__ */ l.jsxs("div", { className: "flex items-center gap-2 group", children: [
        /* @__PURE__ */ l.jsx("h1", { className: "text-2xl font-bold truncate", children: P }),
        /* @__PURE__ */ l.jsx(
          "button",
          {
            onClick: Me,
            className: "p-1 text-gray-400 hover:text-gray-600 group-hover:opacity-100 transition-opacity",
            children: /* @__PURE__ */ l.jsx(sy, { className: "stack-btn-icon" })
          }
        )
      ] }) }) }),
      /* @__PURE__ */ l.jsxs("div", { className: "flex flex-wrap gap-1 justify-end", children: [
        /* @__PURE__ */ l.jsx(
          pn,
          {
            onClick: K,
            icon: /* @__PURE__ */ l.jsx(kg, { className: "stack-btn-icon" }),
            tooltip: "Back to list",
            className: "bg-gray-200 hover:bg-gray-300"
          }
        ),
        /* @__PURE__ */ l.jsx(
          pn,
          {
            onClick: () => m("preview"),
            icon: /* @__PURE__ */ l.jsx(Xg, { className: "stack-btn-icon" }),
            tooltip: "Preview",
            className: "bg-purple-600 hover:bg-purple-700 text-white"
          }
        ),
        /* @__PURE__ */ l.jsx(
          Yu,
          {
            onClick: me,
            icon: /* @__PURE__ */ l.jsx(qg, { className: "stack-btn-icon" }),
            label: "Save",
            className: "bg-green-600 hover:bg-green-700 text-white",
            successMessage: "Saved successfully!",
            errorMessage: "Save failed"
          }
        ),
        /* @__PURE__ */ l.jsx(
          Yu,
          {
            onClick: z,
            icon: /* @__PURE__ */ l.jsx(sf, { className: "stack-btn-icon" }),
            label: "Reload",
            className: "bg-green-600 hover:bg-green-700 text-white",
            successMessage: "Reloaded successfully",
            errorMessage: "Failed to reload"
          }
        ),
        /* @__PURE__ */ l.jsx(
          pn,
          {
            onClick: ge,
            icon: /* @__PURE__ */ l.jsx(Ps, { className: "stack-btn-icon" }),
            tooltip: "Clear all data",
            className: "bg-red-600 hover:bg-red-700 text-white"
          }
        ),
        /* @__PURE__ */ l.jsx(
          pn,
          {
            onClick: () => j(!0),
            icon: /* @__PURE__ */ l.jsx(ey, { className: "stack-btn-icon" }),
            tooltip: "Page Info & Settings",
            className: "bg-indigo-600 hover:bg-indigo-700 text-white"
          }
        ),
        !b && /* @__PURE__ */ l.jsx(
          pn,
          {
            onClick: () => y(!$),
            icon: $ ? /* @__PURE__ */ l.jsx(dc, { className: "stack-btn-icon" }) : /* @__PURE__ */ l.jsx(cc, { className: "stack-btn-icon" }),
            tooltip: $ ? "Hide Editor" : "Show Editor",
            className: "bg-gray-200 hover:bg-gray-300"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ l.jsxs("div", { className: "flex flex-1 overflow-hidden relative", children: [
      /* @__PURE__ */ l.jsx(
        "div",
        {
          className: `flex-1 transition-all duration-200 ${$ && h === "edit" ? "overflow-auto" : "overflow-hidden"}`,
          style: nn,
          children: /* @__PURE__ */ l.jsx("div", { className: "h-full", children: /* @__PURE__ */ l.jsx("div", { className: "bg-white rounded-lg shadow h-full flex flex-col", children: /* @__PURE__ */ l.jsxs(
            "div",
            {
              className: `flex-1 relative p-0 grid-stack-mode-${h}`,
              children: [
                /* @__PURE__ */ l.jsx(py, { ref: E }),
                /* @__PURE__ */ l.jsx(
                  Sg,
                  {
                    onGridStackDropEvent: Ft,
                    children: /* @__PURE__ */ l.jsx(
                      Pg,
                      {
                        componentMap: lf(s),
                        showMenubar: S.showMenubar,
                        onWidgetSelect: Rt
                      }
                    )
                  }
                ),
                f
              ]
            }
          ) }) })
        }
      ),
      h === "edit" && $ && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        b && /* @__PURE__ */ l.jsx(
          "div",
          {
            className: "relative inset-0 bg-black bg-opacity-50 z-40 stack-tab-panel-top-mobile",
            onClick: () => y(!1)
          }
        ),
        /* @__PURE__ */ l.jsxs(
          "div",
          {
            className: `flex flex-row bg-white shadow-lg border-l border-gray-200 ${b ? "fixed right-0 bottom-0 transform transition-transform duration-300" : "relative"}`,
            style: rn,
            children: [
              b && /* @__PURE__ */ l.jsx("div", { className: "absolute top-4 right-4 z-10", children: /* @__PURE__ */ l.jsx(
                "button",
                {
                  onClick: () => y(!1),
                  className: "p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors",
                  children: /* @__PURE__ */ l.jsx(dc, { className: "stack-btn-icon" })
                }
              ) }),
              /* @__PURE__ */ l.jsxs("div", { className: "flex-1 overflow-y-auto pb-4", children: [
                /* @__PURE__ */ l.jsx(
                  "div",
                  {
                    style: {
                      display: _ === "components" ? "block" : "none"
                    },
                    children: /* @__PURE__ */ l.jsx(
                      X7,
                      {
                        componentMapProvider: s,
                        onDragStart: lt
                      }
                    )
                  }
                ),
                /* @__PURE__ */ l.jsx(
                  "div",
                  {
                    style: {
                      display: _ === "properties" ? "block" : "none"
                    },
                    children: /* @__PURE__ */ l.jsx(
                      Y7,
                      {
                        onFileUpload: o,
                        onApiCall: c,
                        onCustomAction: d,
                        onGetSelectOptions: u
                      }
                    )
                  }
                ),
                /* @__PURE__ */ l.jsx(
                  "div",
                  {
                    style: { display: _ === "page" ? "block" : "none" },
                    children: /* @__PURE__ */ l.jsx(Q7, { onFileUpload: o })
                  }
                ),
                /* @__PURE__ */ l.jsx(
                  "div",
                  {
                    style: { display: _ === "list" ? "block" : "none" },
                    children: /* @__PURE__ */ l.jsx(e9, {})
                  }
                ),
                /* @__PURE__ */ l.jsx(
                  "div",
                  {
                    style: {
                      display: _ === "datasource" ? "block" : "none"
                    },
                    children: /* @__PURE__ */ l.jsx(t9, {})
                  }
                )
              ] }),
              /* @__PURE__ */ l.jsx("div", { className: "flex flex-col border-l border-gray-200 bg-gray-50 w-16", children: [
                "components",
                "properties",
                "page",
                "list",
                "datasource"
              ].map((J) => /* @__PURE__ */ l.jsxs(
                "button",
                {
                  className: `flex flex-col items-center justify-center py-4 px-2 text-xs font-medium transition-colors ${_ === J ? "text-blue-600 bg-blue-50 border-r-2 border-blue-600" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`,
                  onClick: () => w(J),
                  title: J.charAt(0).toUpperCase() + J.slice(1),
                  children: [
                    n9(J),
                    /* @__PURE__ */ l.jsx("span", { className: "mt-1 capitalize", children: J === "datasource" ? "data" : J })
                  ]
                },
                J
              )) })
            ]
          }
        )
      ] })
    ] }),
    h === "edit" && b && !$ && /* @__PURE__ */ l.jsx("div", { className: "fixed bottom-4 right-4 z-30", children: /* @__PURE__ */ l.jsx(
      "button",
      {
        onClick: () => y(!0),
        className: "p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors",
        children: /* @__PURE__ */ l.jsx(cc, { className: "stack-btn-icon" })
      }
    ) }),
    h === "preview" && /* @__PURE__ */ l.jsx("div", { className: "fixed inset-0 pointer-events-none z-50", children: /* @__PURE__ */ l.jsx("div", { className: "absolute bottom-8 right-8 pointer-events-auto", children: /* @__PURE__ */ l.jsxs(
      "button",
      {
        onClick: () => m("edit"),
        className: "flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 group",
        title: "Return to Edit Mode",
        children: [
          /* @__PURE__ */ l.jsx(lc, { className: "stack-btn-icon group-hover:animate-bounce" }),
          /* @__PURE__ */ l.jsx("span", { className: "text-sm font-medium", children: "Edit Mode" })
        ]
      }
    ) }) }),
    h === "view" && i && /* @__PURE__ */ l.jsx("div", { className: "fixed inset-0 pointer-events-none z-50", children: /* @__PURE__ */ l.jsx("div", { className: "absolute bottom-8 right-8 pointer-events-auto", children: /* @__PURE__ */ l.jsxs(
      "button",
      {
        onClick: i,
        className: "flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 group",
        title: "Back to List",
        children: [
          /* @__PURE__ */ l.jsx(lc, { className: "stack-btn-icon group-hover:animate-bounce" }),
          /* @__PURE__ */ l.jsx("span", { className: "text-sm font-medium", children: "Back to List" })
        ]
      }
    ) }) }),
    /* @__PURE__ */ l.jsx(
      my,
      {
        isOpen: x,
        pageInfo: X,
        resetOpenInfo: j
      }
    )
  ] }) }, V);
}, f9 = (e) => /* @__PURE__ */ l.jsx(gy, { children: /* @__PURE__ */ l.jsx(s9, { ...e }) });
export {
  ug as GridStackProvider,
  Pg as GridStackRender,
  Sg as GridStackRenderProvider,
  u9 as LocaleProvider,
  f9 as StackPage,
  Ha as gridOptions,
  uy as subGridOptions,
  Ln as useGridStackContext,
  c9 as useGridStackWidgetContext,
  d9 as useLocale
};
//# sourceMappingURL=stackpage.es.js.map
