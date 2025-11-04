var Wm = Object.defineProperty;
var Vm = (e, t, r) => t in e ? Wm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var de = (e, t, r) => Vm(e, typeof t != "symbol" ? t + "" : t, r);
import * as Y from "react";
import oe, { createContext as In, useContext as kr, useState as ve, useCallback as ne, useRef as Vt, useLayoutEffect as tc, useMemo as zd, useEffect as tt, forwardRef as zm, useImperativeHandle as Bm, createElement as qm, Component as Fn, useReducer as Km, createRef as Gm } from "react";
import { GridStack as pn } from "gridstack";
import { createPortal as Hm } from "react-dom";
var ts = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function kn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Bd = { exports: {} }, Hs = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jm = oe, Ym = Symbol.for("react.element"), Zm = Symbol.for("react.fragment"), Xm = Object.prototype.hasOwnProperty, Qm = Jm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, eg = { key: !0, ref: !0, __self: !0, __source: !0 };
function qd(e, t, r) {
  var n, s = {}, a = null, i = null;
  r !== void 0 && (a = "" + r), t.key !== void 0 && (a = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (n in t) Xm.call(t, n) && !eg.hasOwnProperty(n) && (s[n] = t[n]);
  if (e && e.defaultProps) for (n in t = e.defaultProps, t) s[n] === void 0 && (s[n] = t[n]);
  return { $$typeof: Ym, type: e, key: a, ref: i, props: s, _owner: Qm.current };
}
Hs.Fragment = Zm;
Hs.jsx = qd;
Hs.jsxs = qd;
Bd.exports = Hs;
var d = Bd.exports;
const Kd = In(null);
function Dn() {
  const e = kr(Kd);
  if (!e)
    throw new Error(
      "useGridStackContext must be used within a GridStackProvider"
    );
  return e;
}
function tg({
  children: e,
  initialOptions: t
}) {
  const [r, n] = ve(null), [s, a] = ve(() => {
    var m;
    const c = /* @__PURE__ */ new Map(), f = (h) => {
      var g;
      h.id && h.content && c.set(h.id, h), (g = h.subGridOpts) != null && g.children && h.subGridOpts.children.forEach((b) => {
        f(b);
      });
    };
    return (m = t.children) == null || m.forEach((h) => {
      f(h);
    }), c;
  }), i = ne(
    (c) => {
      const f = `widget-${Math.random().toString(36).substring(2, 15)}`, m = c(f);
      r == null || r.addWidget({ ...m, id: f }), a((h) => {
        const g = new Map(h);
        return g.set(f, m), g;
      });
    },
    [r]
  ), o = ne(
    (c) => {
      const f = `sub-grid-${Math.random().toString(36).substring(2, 15)}`, m = /* @__PURE__ */ new Map(), h = c(f, (g) => {
        const b = `widget-${Math.random().toString(36).substring(2, 15)}`;
        return m.set(b, g), { ...g, id: b };
      });
      r == null || r.addWidget({ ...h, id: f }), a((g) => {
        const b = new Map(g);
        return m.forEach((y, p) => {
          b.set(p, y);
        }), b;
      });
    },
    [r]
  ), l = ne(
    (c) => {
      r == null || r.removeWidget(c), a((f) => {
        const m = new Map(f);
        return m.delete(c), m;
      });
    },
    [r]
  ), u = ne(() => r == null ? void 0 : r.save(!0, !0, (c, f) => f), [r]);
  return /* @__PURE__ */ d.jsx(
    Kd.Provider,
    {
      value: {
        initialOptions: t,
        gridStack: r,
        addWidget: i,
        removeWidget: l,
        addSubGrid: o,
        saveOptions: u,
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
const Gd = In(null);
function rg() {
  const e = kr(Gd);
  if (!e)
    throw new Error(
      "useGridStackRenderContext must be used within a GridStackProvider"
    );
  return e;
}
var ng = typeof Element < "u", sg = typeof Map == "function", ag = typeof Set == "function", ig = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
function ms(e, t) {
  if (e === t) return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor) return !1;
    var r, n, s;
    if (Array.isArray(e)) {
      if (r = e.length, r != t.length) return !1;
      for (n = r; n-- !== 0; )
        if (!ms(e[n], t[n])) return !1;
      return !0;
    }
    var a;
    if (sg && e instanceof Map && t instanceof Map) {
      if (e.size !== t.size) return !1;
      for (a = e.entries(); !(n = a.next()).done; )
        if (!t.has(n.value[0])) return !1;
      for (a = e.entries(); !(n = a.next()).done; )
        if (!ms(n.value[1], t.get(n.value[0]))) return !1;
      return !0;
    }
    if (ag && e instanceof Set && t instanceof Set) {
      if (e.size !== t.size) return !1;
      for (a = e.entries(); !(n = a.next()).done; )
        if (!t.has(n.value[0])) return !1;
      return !0;
    }
    if (ig && ArrayBuffer.isView(e) && ArrayBuffer.isView(t)) {
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
    if (ng && e instanceof Element) return !1;
    for (n = r; n-- !== 0; )
      if (!((s[n] === "_owner" || s[n] === "__v" || s[n] === "__o") && e.$$typeof) && !ms(e[s[n]], t[s[n]]))
        return !1;
    return !0;
  }
  return e !== e && t !== t;
}
var og = function(t, r) {
  try {
    return ms(t, r);
  } catch (n) {
    if ((n.message || "").match(/stack|recursion/i))
      return console.warn("react-fast-compare cannot handle circular refs"), !1;
    throw n;
  }
};
const lg = /* @__PURE__ */ kn(og), Ce = [];
for (let e = 0; e < 256; ++e)
  Ce.push((e + 256).toString(16).slice(1));
function cg(e, t = 0) {
  return (Ce[e[t + 0]] + Ce[e[t + 1]] + Ce[e[t + 2]] + Ce[e[t + 3]] + "-" + Ce[e[t + 4]] + Ce[e[t + 5]] + "-" + Ce[e[t + 6]] + Ce[e[t + 7]] + "-" + Ce[e[t + 8]] + Ce[e[t + 9]] + "-" + Ce[e[t + 10]] + Ce[e[t + 11]] + Ce[e[t + 12]] + Ce[e[t + 13]] + Ce[e[t + 14]] + Ce[e[t + 15]]).toLowerCase();
}
let Va;
const ug = new Uint8Array(16);
function dg() {
  if (!Va) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    Va = crypto.getRandomValues.bind(crypto);
  }
  return Va(ug);
}
const fg = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), rc = { randomUUID: fg };
function pg(e, t, r) {
  var s;
  if (rc.randomUUID && !e)
    return rc.randomUUID();
  e = e || {};
  const n = e.random ?? ((s = e.rng) == null ? void 0 : s.call(e)) ?? dg();
  if (n.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, cg(n);
}
const hg = pn.prototype.resizeToContent;
pn.prototype.resizeToContent = function(e) {
  const t = e.querySelector(".grid-stack-item-content");
  if (t != null && t.firstElementChild)
    return hg.call(this, e);
};
function mg({
  children: e,
  onGridStackDropEvent: t
}) {
  const {
    _gridStack: { value: r, set: n },
    initialOptions: s
  } = Dn(), a = Vt(/* @__PURE__ */ new Map()), i = Vt(null), o = Vt(s), l = ne(
    (c, f) => {
      f.id && a.current.set(f.id, c);
    },
    []
  ), u = ne(() => {
    if (i.current) {
      pn.renderCB = l;
      const c = pn.init(o.current, i.current);
      return pn.setupDragIn(
        ".grid-stack-item-widget",
        {
          appendTo: "body",
          helper: "clone",
          scroll: !1
        }
      ), c.on("dropped", function(f, m, h) {
        if (console.log("dropped....", h), h) {
          const g = h.el, b = g.dataset.gsType;
          if (b && t) {
            const y = {
              name: b,
              id: pg(),
              x: h.x || 0,
              y: h.y || 0,
              w: b === "SubGrid" ? 12 : 4,
              // SubGrid takes full width
              h: b === "SubGrid" ? 6 : 4
              // SubGrid is taller              
            };
            t(y), c.removeWidget(g, !0);
          }
        }
      }), c;
    }
    return null;
  }, [l, t]);
  return tc(() => {
    if (!lg(s, o.current) && r)
      try {
        r.removeAll(!1), r.destroy(!1), a.current.clear(), o.current = s, n(u());
      } catch (c) {
        console.error("Error reinitializing gridstack", c);
      }
  }, [s, r, u, n]), tc(() => {
    if (!r)
      try {
        n(u());
      } catch (c) {
        console.error("Error initializing gridstack", c);
      }
  }, [r, u, n]), /* @__PURE__ */ d.jsx(
    Gd.Provider,
    {
      value: zd(
        () => ({
          getWidgetContainer: (c) => a.current.get(c) || null
        }),
        // ! gridStack is required to reinitialize the grid when the options change
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [r]
      ),
      children: /* @__PURE__ */ d.jsx("div", { ref: i, children: r ? e : null })
    }
  );
}
const Hd = In(null);
function N9() {
  const e = kr(Hd);
  if (!e)
    throw new Error(
      "useGridStackWidgetContext must be used within a GridStackWidgetProvider"
    );
  return e;
}
function gg({
  widgetId: e
}) {
  const { removeWidget: t } = Dn(), [r, n] = Y.useState(!1), [s, a] = Y.useState({ top: 0, left: 0 }), i = Y.useRef(null), o = (c) => {
    if (c.stopPropagation(), i.current) {
      const f = i.current.getBoundingClientRect();
      a({
        top: f.bottom + window.scrollY,
        left: f.left + window.scrollX
      });
    }
    n(!r);
  }, l = () => {
    n(!1);
  }, u = () => {
    var f;
    t(e);
    const c = document.querySelector(`[gs-id="${e}"]`);
    c && ((f = c.gridstackNode) != null && f.grid) && c.gridstackNode.grid.removeWidget(c, !0, !0), l();
  };
  return Y.useEffect(() => {
    const c = (f) => {
      r && n(!1);
    };
    return document.addEventListener("click", c), () => {
      document.removeEventListener("click", c);
    };
  }, [r]), /* @__PURE__ */ d.jsxs("div", { className: "flex justify-end size-4", children: [
    /* @__PURE__ */ d.jsx("button", { className: "p-1 hover:bg-gray-200 rounded transition-colors", children: /* @__PURE__ */ d.jsxs(
      "svg",
      {
        className: "w-4 h-4 text-gray-600",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        children: [
          /* @__PURE__ */ d.jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            }
          ),
          /* @__PURE__ */ d.jsx(
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
    /* @__PURE__ */ d.jsx(
      "button",
      {
        ref: i,
        onClick: o,
        className: "p-1 hover:bg-gray-200 rounded transition-colors",
        "aria-haspopup": "true",
        "aria-expanded": r,
        children: /* @__PURE__ */ d.jsx(
          "svg",
          {
            className: "w-4 h-4 text-gray-600",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ d.jsx(
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
    r && /* @__PURE__ */ d.jsx(
      "div",
      {
        className: "fixed z-50 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 py-1",
        style: {
          top: `${s.top}px`,
          left: `${s.left}px`,
          transform: "translateX(-100%)"
        },
        onClick: (c) => c.stopPropagation(),
        children: /* @__PURE__ */ d.jsxs(
          "button",
          {
            onClick: u,
            className: "flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors",
            children: [
              /* @__PURE__ */ d.jsx(
                "svg",
                {
                  className: "w-4 h-4 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ d.jsx(
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
function yg({ widgetId: e, children: t }) {
  const r = Vt(null);
  return tt(() => {
    var o;
    const n = r.current;
    if (!n) return;
    const s = n.closest(".grid-stack-item");
    if (!s || !((o = s.gridstackNode) != null && o.grid)) return;
    const a = () => {
      var u, c;
      const l = s.querySelector(".grid-stack-item-content");
      l != null && l.firstElementChild && s.gridstackNode && s.gridstackNode.grid && ((c = (u = s.gridstackNode) == null ? void 0 : u.grid) == null || c.resizeToContent(s));
    }, i = new ResizeObserver(() => a());
    return i.observe(n), a(), () => i.disconnect();
  }, [e]), /* @__PURE__ */ d.jsx(
    "div",
    {
      ref: r,
      className: "gridstack-measured-container",
      style: { width: "100%" },
      children: t
    }
  );
}
function vg(e) {
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
function bg({
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
  const l = vg(t), u = o || l.props, c = (u == null ? void 0 : u.title) || `Widget ${e.slice(0, 4)}`, f = (h) => {
    i && i({
      id: e,
      name: l.name,
      props: u
      // Use the resolved props
    });
  }, m = /* @__PURE__ */ d.jsx(yg, { widgetId: e, children: /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: `h-full w-full ${a ? "outline outline-2 outline-blue-400 outline-offset-1" : ""}`,
      onClick: f,
      children: [
        s && /* @__PURE__ */ d.jsxs("div", { className: "widget-header flex items-center justify-between bg-gray-100 border-b px-2 min-h-[36px]", children: [
          /* @__PURE__ */ d.jsx("div", { className: "font-medium truncate text-sm px-1", children: c }),
          /* @__PURE__ */ d.jsx(gg, { widgetId: e })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "widget-body flex-1 min-h-[40px] cursor-pointer", children: [
          /* @__PURE__ */ d.jsx(r, { ...u }),
          " "
        ] })
      ]
    }
  ) });
  return /* @__PURE__ */ d.jsx(Hd.Provider, { value: { widget: { id: e } }, children: Hm(m, n) });
}
const Ji = In(
  void 0
), Rn = () => {
  const e = kr(Ji);
  if (!e)
    throw new Error("useStackPage must be used within a StackPageProvider");
  return e;
}, Jd = () => {
  const e = kr(Ji);
  if (!e)
    throw new Error(
      "useStackPageWidgetProps must be used within a StackPageProvider"
    );
  return {
    widgetProps: e.widgetProps,
    updateWidgetProps: e.updateWidgetProps
  };
};
function $g(e) {
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
function wg({
  componentMap: e,
  showMenubar: t = !1,
  onWidgetSelect: r
}) {
  const { _rawWidgetMetaMap: n } = Dn(), { getWidgetContainer: s } = rg(), { widgetProps: a } = Jd(), { selectedInstance: i } = Rn();
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    Array.from(n.value.entries()).length === 0 && /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 p-8 text-center", children: [
      /* @__PURE__ */ d.jsx("div", { className: "text-4xl mb-4", children: "📦" }),
      /* @__PURE__ */ d.jsx("h3", { className: "text-lg font-medium mb-2", children: "Drag Components Here" }),
      /* @__PURE__ */ d.jsx("p", { className: "text-sm", children: "Drag components from the Components tab in the right panel to start building your layout" })
    ] }),
    Array.from(n.value.entries()).map(([o, l]) => {
      const { name: u, props: c } = $g(l), f = e[u], m = s(o), h = a.get(o) || c;
      return !f || !m ? null : /* @__PURE__ */ d.jsx(
        bg,
        {
          id: o,
          meta: l,
          WidgetComponent: f,
          widgetContainer: m,
          showMenubar: t,
          isSelected: o === (i == null ? void 0 : i.id),
          onWidgetSelect: r,
          componentProps: h
        },
        o
      );
    })
  ] });
}
const Yd = In(void 0), A9 = () => {
  const e = kr(Yd);
  if (!e)
    throw new Error("useLocale must be used within a LocaleProvider");
  return e;
}, P9 = ({ children: e, defaultLocale: t = "en-US" }) => {
  const [r, n] = ve(t);
  return /* @__PURE__ */ d.jsx(Yd.Provider, { value: { locale: r, setLocale: n }, children: e });
};
function _g({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ Y.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ Y.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ Y.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const nc = /* @__PURE__ */ Y.forwardRef(_g);
function xg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ Y.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ Y.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ Y.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
  }));
}
const Sg = /* @__PURE__ */ Y.forwardRef(xg);
function jg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ Y.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ Y.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ Y.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
  }));
}
const Zd = /* @__PURE__ */ Y.forwardRef(jg);
function Eg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ Y.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ Y.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ Y.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 19.5 8.25 12l7.5-7.5"
  }));
}
const sc = /* @__PURE__ */ Y.forwardRef(Eg);
function Og({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ Y.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ Y.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ Y.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m8.25 4.5 7.5 7.5-7.5 7.5"
  }));
}
const ac = /* @__PURE__ */ Y.forwardRef(Og);
function Ng({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ Y.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ Y.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ Y.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
  }));
}
const Ag = /* @__PURE__ */ Y.forwardRef(Ng);
function Pg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ Y.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ Y.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ Y.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
  }), /* @__PURE__ */ Y.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
  }));
}
const Cg = /* @__PURE__ */ Y.forwardRef(Pg);
function Tg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ Y.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ Y.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ Y.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
  }));
}
const Ig = /* @__PURE__ */ Y.forwardRef(Tg);
function Fg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ Y.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ Y.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ Y.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
  }));
}
const kg = /* @__PURE__ */ Y.forwardRef(Fg);
function Dg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ Y.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ Y.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ Y.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
  }));
}
const Rg = /* @__PURE__ */ Y.forwardRef(Dg);
function Mg({ content: e }) {
  return /* @__PURE__ */ d.jsx("div", { className: "flex items-start p-2 bg-white border rounded shadow-sm text-left", children: /* @__PURE__ */ d.jsx("div", { children: /* @__PURE__ */ d.jsx("p", { className: "text-sm", children: e }) }) });
}
const yi = "1rem", vi = [
  //{ c: 1, w: 300 },   // 1 column on screens < 300px
  { c: 1, w: 500 },
  // 2 columns between 300px - 500px
  { c: 3, w: 800 },
  // 4 columns between 500px - 800px
  { c: 6, w: 1024 }
  // 6 columns between 800px - 1024px
  //{ c: 8, w: 1200 },  // 8 columns on screens > 1200px
], za = {
  acceptWidgets: !0,
  removable: "#trash",
  sizeToContent: !0,
  resizable: { handles: "se" },
  minRow: 10,
  columnOpts: {
    breakpointForWindow: !0,
    breakpoints: vi,
    layout: "moveScale",
    columnMax: 12
  },
  margin: 5,
  cellHeight: yi,
  subGridDynamic: !0,
  // v7 api to create sub-grids on the fly
  subGridOpts: {
    acceptWidgets: !0,
    removable: "#trash",
    resizable: { handles: "se" },
    sizeToContent: !0,
    subGridDynamic: !0,
    columnOpts: {
      breakpoints: vi,
      layout: "moveScale"
    },
    margin: 5,
    minRow: 1,
    cellHeight: yi
  },
  children: []
}, Lg = {
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
      breakpoints: vi,
      layout: "moveScale"
    },
    margin: 5,
    minRow: 6,
    cellHeight: yi,
    children: []
  },
  children: []
}, ic = {
  Text: {
    content: "Any content other than text are what we call cards. Cards can be accessed by clicking the ➕ button or typing / at the beginning of a paragraph.\nEven better, continue typing to find the card you're looking for, hit enter, and avoid dragging your mouse altogether.\nSome cards have a handy little shortcut, to keep you on track and in flow. Use --- to divide your paragraphs with a line, or ``` to add a code block. You can also drag and drop images directly into the editor to bypass the menu. \nAny content other than text are what we call cards. Cards can be accessed by clicking the ➕ button or typing / at the beginning of a paragraph.",
    title: "This is text card"
  }
}, oc = {
  Text: Mg
}, Xd = (e) => {
  if (e) {
    const t = e();
    return { ...oc, ...t };
  }
  return oc;
}, Ug = (e) => {
  if (e) {
    const t = e();
    return { ...ic, ...t };
  }
  return ic;
}, Wg = zm((e, t) => {
  const { addWidget: r, addSubGrid: n, saveOptions: s, _rawWidgetMetaMap: a } = Dn();
  return Bm(t, () => ({
    saveLayout: () => s(),
    addWidget: r,
    addSubGrid: n,
    rawWidgetMetaMap: a
  })), null;
});
function Vg({ pageInfo: e }) {
  const [t, r] = ve(void 0);
  return tt(() => {
    e && r(e);
  }, [e]), /* @__PURE__ */ d.jsx("div", { children: /* @__PURE__ */ d.jsx(
    "div",
    {
      style: {
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(2, 1fr)"
      },
      children: /* @__PURE__ */ d.jsx("div", { id: "pageinfo", children: /* @__PURE__ */ d.jsx(
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
function zg({
  isOpen: e,
  pageInfo: t,
  resetOpenInfo: r
}) {
  const [n, s] = Y.useState(!1);
  Y.useEffect(() => {
  }, [e, t]);
  const a = () => {
    r(!1);
  }, i = () => {
    var l;
    navigator.clipboard.writeText(
      ((l = document.getElementById("pageinfo")) == null ? void 0 : l.innerText) || ""
    ), s(!0), setTimeout(() => {
      s(!1);
    }, 3e3);
  }, o = (l) => {
    l.target === l.currentTarget && a();
  };
  return e ? /* @__PURE__ */ d.jsx(
    "div",
    {
      className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
      onClick: o,
      children: /* @__PURE__ */ d.jsxs("div", { className: "bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col", children: [
        /* @__PURE__ */ d.jsxs("div", { className: "flex items-center justify-between p-4 border-b flex-shrink-0", children: [
          /* @__PURE__ */ d.jsx("h2", { className: "text-lg font-semibold truncate mr-2", children: "Page Information" }),
          /* @__PURE__ */ d.jsxs("div", { className: "flex items-center space-x-1 flex-shrink-0", children: [
            /* @__PURE__ */ d.jsxs(
              "button",
              {
                onClick: i,
                className: "p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center relative",
                "aria-label": "Copy page info",
                children: [
                  /* @__PURE__ */ d.jsx(
                    "svg",
                    {
                      className: "w-5 h-5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ d.jsx(
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
                  n && /* @__PURE__ */ d.jsx("span", { className: "absolute -top-8 -right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap", children: "copied" })
                ]
              }
            ),
            /* @__PURE__ */ d.jsx(
              "button",
              {
                onClick: a,
                className: "p-2 hover:bg-gray-100 rounded-full transition-colors",
                "aria-label": "Close",
                children: /* @__PURE__ */ d.jsx(
                  "svg",
                  {
                    className: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ d.jsx(
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
        /* @__PURE__ */ d.jsx("div", { className: "p-4 overflow-y-auto flex-1", children: /* @__PURE__ */ d.jsx(Vg, { pageInfo: t }) }),
        /* @__PURE__ */ d.jsx("div", { className: "flex justify-end p-4 border-t flex-shrink-0", children: /* @__PURE__ */ d.jsx(
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
function Bg({ children: e }) {
  const [t, r] = ve(
    null
  ), [n, s] = ve(null), [a, i] = ve({
    type: "page",
    title: "Untitled Page",
    status: "draft",
    // Add this
    margin: "5",
    padding: "10px",
    background: "#ffffff",
    showMenubar: !0,
    image: ""
    // Add this    
  }), [o, l] = ve("components"), [u, c] = ve(
    /* @__PURE__ */ new Map()
  ), f = ne((h, g) => {
    c((b) => {
      const y = new Map(b);
      return y.set(h, g), y;
    });
  }, []), m = {
    selectedComponent: t,
    setSelectedComponent: r,
    selectedInstance: n,
    setSelectedInstance: s,
    attributes: a,
    setPageAttributes: i,
    activeTab: o,
    setActiveTab: l,
    widgetProps: u,
    updateWidgetProps: f
  };
  return /* @__PURE__ */ d.jsx(Ji.Provider, { value: m, children: e });
}
function ae(e) {
  return typeof e != "object" || e === null || typeof e.lastModified == "number" && typeof File < "u" && e instanceof File || typeof e.getMonth == "function" && typeof Date < "u" && e instanceof Date ? !1 : !Array.isArray(e);
}
function qg(e) {
  return e.additionalItems === !0 && console.warn("additionalItems=true is currently not supported"), ae(e.additionalItems);
}
function lc(e) {
  if (e === "")
    return;
  if (e === null)
    return null;
  if (/\.$/.test(e) || /\.0$/.test(e) || /\.\d*0$/.test(e))
    return e;
  const t = Number(e);
  return typeof t == "number" && !Number.isNaN(t) ? t : e;
}
const Mn = "__additional_property", bi = "additionalProperties", Dr = "allOf", nt = "anyOf", Ot = "const", Kg = "default", Js = "dependencies", Gg = "enum", ze = "__errors", Ut = "$id", Hg = "if", zt = "items", Jg = "_$junk_option_schema_id$_", gs = "$name", Be = "oneOf", Ee = "properties", Yg = "required", As = "submitButtonOptions", Ae = "$ref", Yi = "__rjsf_additionalProperties", Qd = "__rjsf_rootSchema", Zg = "ui:field", Zi = "ui:widget", hn = "ui:options", Xg = "ui:globalOptions";
function se(e = {}, t = {}) {
  return Object.keys(e).filter((r) => r.indexOf("ui:") === 0).reduce((r, n) => {
    const s = e[n];
    return n === Zi && ae(s) ? (console.error("Setting options via ui:widget object is no longer supported, use ui:options instead"), r) : n === hn && ae(s) ? { ...r, ...s } : { ...r, [n.substring(3)]: s };
  }, { ...t });
}
function Qg(e, t = {}, r) {
  if (!e.additionalProperties)
    return !1;
  const { expandable: n = !0 } = se(t);
  return n === !1 ? n : e.maxProperties !== void 0 && r ? Object.keys(r).length < e.maxProperties : !0;
}
var ef = typeof global == "object" && global && global.Object === Object && global, ey = typeof self == "object" && self && self.Object === Object && self, mt = ef || ey || Function("return this")(), Ye = mt.Symbol, tf = Object.prototype, ty = tf.hasOwnProperty, ry = tf.toString, rn = Ye ? Ye.toStringTag : void 0;
function ny(e) {
  var t = ty.call(e, rn), r = e[rn];
  try {
    e[rn] = void 0;
    var n = !0;
  } catch {
  }
  var s = ry.call(e);
  return n && (t ? e[rn] = r : delete e[rn]), s;
}
var sy = Object.prototype, ay = sy.toString;
function iy(e) {
  return ay.call(e);
}
var oy = "[object Null]", ly = "[object Undefined]", cc = Ye ? Ye.toStringTag : void 0;
function Ct(e) {
  return e == null ? e === void 0 ? ly : oy : cc && cc in Object(e) ? ny(e) : iy(e);
}
function rf(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var Ys = rf(Object.getPrototypeOf, Object);
function Ze(e) {
  return e != null && typeof e == "object";
}
var cy = "[object Object]", uy = Function.prototype, dy = Object.prototype, nf = uy.toString, fy = dy.hasOwnProperty, py = nf.call(Object);
function er(e) {
  if (!Ze(e) || Ct(e) != cy)
    return !1;
  var t = Ys(e);
  if (t === null)
    return !0;
  var r = fy.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && nf.call(r) == py;
}
function Ps(e) {
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
    return e.reduce((r, n, s) => ({ ...r, [s]: Ps(n) }), t);
  if (er(e)) {
    const r = e;
    return Object.keys(r).reduce((n, s) => ({ ...n, [s]: Ps(r[s]) }), t);
  }
  return t;
}
function hy() {
  this.__data__ = [], this.size = 0;
}
function Ln(e, t) {
  return e === t || e !== e && t !== t;
}
function Zs(e, t) {
  for (var r = e.length; r--; )
    if (Ln(e[r][0], t))
      return r;
  return -1;
}
var my = Array.prototype, gy = my.splice;
function yy(e) {
  var t = this.__data__, r = Zs(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : gy.call(t, r, 1), --this.size, !0;
}
function vy(e) {
  var t = this.__data__, r = Zs(t, e);
  return r < 0 ? void 0 : t[r][1];
}
function by(e) {
  return Zs(this.__data__, e) > -1;
}
function $y(e, t) {
  var r = this.__data__, n = Zs(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
function Tt(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Tt.prototype.clear = hy;
Tt.prototype.delete = yy;
Tt.prototype.get = vy;
Tt.prototype.has = by;
Tt.prototype.set = $y;
function wy() {
  this.__data__ = new Tt(), this.size = 0;
}
function _y(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
function xy(e) {
  return this.__data__.get(e);
}
function Sy(e) {
  return this.__data__.has(e);
}
function be(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var jy = "[object AsyncFunction]", Ey = "[object Function]", Oy = "[object GeneratorFunction]", Ny = "[object Proxy]";
function Xs(e) {
  if (!be(e))
    return !1;
  var t = Ct(e);
  return t == Ey || t == Oy || t == jy || t == Ny;
}
var Ba = mt["__core-js_shared__"], uc = function() {
  var e = /[^.]+$/.exec(Ba && Ba.keys && Ba.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Ay(e) {
  return !!uc && uc in e;
}
var Py = Function.prototype, Cy = Py.toString;
function ar(e) {
  if (e != null) {
    try {
      return Cy.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Ty = /[\\^$.*+?()[\]{}|]/g, Iy = /^\[object .+?Constructor\]$/, Fy = Function.prototype, ky = Object.prototype, Dy = Fy.toString, Ry = ky.hasOwnProperty, My = RegExp(
  "^" + Dy.call(Ry).replace(Ty, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Ly(e) {
  if (!be(e) || Ay(e))
    return !1;
  var t = Xs(e) ? My : Iy;
  return t.test(ar(e));
}
function Uy(e, t) {
  return e == null ? void 0 : e[t];
}
function ir(e, t) {
  var r = Uy(e, t);
  return Ly(r) ? r : void 0;
}
var Sn = ir(mt, "Map"), jn = ir(Object, "create");
function Wy() {
  this.__data__ = jn ? jn(null) : {}, this.size = 0;
}
function Vy(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var zy = "__lodash_hash_undefined__", By = Object.prototype, qy = By.hasOwnProperty;
function Ky(e) {
  var t = this.__data__;
  if (jn) {
    var r = t[e];
    return r === zy ? void 0 : r;
  }
  return qy.call(t, e) ? t[e] : void 0;
}
var Gy = Object.prototype, Hy = Gy.hasOwnProperty;
function Jy(e) {
  var t = this.__data__;
  return jn ? t[e] !== void 0 : Hy.call(t, e);
}
var Yy = "__lodash_hash_undefined__";
function Zy(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = jn && t === void 0 ? Yy : t, this;
}
function tr(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
tr.prototype.clear = Wy;
tr.prototype.delete = Vy;
tr.prototype.get = Ky;
tr.prototype.has = Jy;
tr.prototype.set = Zy;
function Xy() {
  this.size = 0, this.__data__ = {
    hash: new tr(),
    map: new (Sn || Tt)(),
    string: new tr()
  };
}
function Qy(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function Qs(e, t) {
  var r = e.__data__;
  return Qy(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
function e0(e) {
  var t = Qs(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function t0(e) {
  return Qs(this, e).get(e);
}
function r0(e) {
  return Qs(this, e).has(e);
}
function n0(e, t) {
  var r = Qs(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
function It(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
It.prototype.clear = Xy;
It.prototype.delete = e0;
It.prototype.get = t0;
It.prototype.has = r0;
It.prototype.set = n0;
var s0 = 200;
function a0(e, t) {
  var r = this.__data__;
  if (r instanceof Tt) {
    var n = r.__data__;
    if (!Sn || n.length < s0 - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new It(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
function st(e) {
  var t = this.__data__ = new Tt(e);
  this.size = t.size;
}
st.prototype.clear = wy;
st.prototype.delete = _y;
st.prototype.get = xy;
st.prototype.has = Sy;
st.prototype.set = a0;
var i0 = "__lodash_hash_undefined__";
function o0(e) {
  return this.__data__.set(e, i0), this;
}
function l0(e) {
  return this.__data__.has(e);
}
function Sr(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new It(); ++t < r; )
    this.add(e[t]);
}
Sr.prototype.add = Sr.prototype.push = o0;
Sr.prototype.has = l0;
function c0(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
function Xi(e, t) {
  return e.has(t);
}
var u0 = 1, d0 = 2;
function sf(e, t, r, n, s, a) {
  var i = r & u0, o = e.length, l = t.length;
  if (o != l && !(i && l > o))
    return !1;
  var u = a.get(e), c = a.get(t);
  if (u && c)
    return u == t && c == e;
  var f = -1, m = !0, h = r & d0 ? new Sr() : void 0;
  for (a.set(e, t), a.set(t, e); ++f < o; ) {
    var g = e[f], b = t[f];
    if (n)
      var y = i ? n(b, g, f, t, e, a) : n(g, b, f, e, t, a);
    if (y !== void 0) {
      if (y)
        continue;
      m = !1;
      break;
    }
    if (h) {
      if (!c0(t, function(p, v) {
        if (!Xi(h, v) && (g === p || s(g, p, r, n, a)))
          return h.push(v);
      })) {
        m = !1;
        break;
      }
    } else if (!(g === b || s(g, b, r, n, a))) {
      m = !1;
      break;
    }
  }
  return a.delete(e), a.delete(t), m;
}
var Cs = mt.Uint8Array;
function f0(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n, s) {
    r[++t] = [s, n];
  }), r;
}
function Qi(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n) {
    r[++t] = n;
  }), r;
}
var p0 = 1, h0 = 2, m0 = "[object Boolean]", g0 = "[object Date]", y0 = "[object Error]", v0 = "[object Map]", b0 = "[object Number]", $0 = "[object RegExp]", w0 = "[object Set]", _0 = "[object String]", x0 = "[object Symbol]", S0 = "[object ArrayBuffer]", j0 = "[object DataView]", dc = Ye ? Ye.prototype : void 0, qa = dc ? dc.valueOf : void 0;
function E0(e, t, r, n, s, a, i) {
  switch (r) {
    case j0:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case S0:
      return !(e.byteLength != t.byteLength || !a(new Cs(e), new Cs(t)));
    case m0:
    case g0:
    case b0:
      return Ln(+e, +t);
    case y0:
      return e.name == t.name && e.message == t.message;
    case $0:
    case _0:
      return e == t + "";
    case v0:
      var o = f0;
    case w0:
      var l = n & p0;
      if (o || (o = Qi), e.size != t.size && !l)
        return !1;
      var u = i.get(e);
      if (u)
        return u == t;
      n |= h0, i.set(e, t);
      var c = sf(o(e), o(t), n, s, a, i);
      return i.delete(e), c;
    case x0:
      if (qa)
        return qa.call(e) == qa.call(t);
  }
  return !1;
}
function eo(e, t) {
  for (var r = -1, n = t.length, s = e.length; ++r < n; )
    e[s + r] = t[r];
  return e;
}
var Pe = Array.isArray;
function af(e, t, r) {
  var n = t(e);
  return Pe(e) ? n : eo(n, r(e));
}
function O0(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, s = 0, a = []; ++r < n; ) {
    var i = e[r];
    t(i, r, e) && (a[s++] = i);
  }
  return a;
}
function of() {
  return [];
}
var N0 = Object.prototype, A0 = N0.propertyIsEnumerable, fc = Object.getOwnPropertySymbols, to = fc ? function(e) {
  return e == null ? [] : (e = Object(e), O0(fc(e), function(t) {
    return A0.call(e, t);
  }));
} : of;
function lf(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var P0 = "[object Arguments]";
function pc(e) {
  return Ze(e) && Ct(e) == P0;
}
var cf = Object.prototype, C0 = cf.hasOwnProperty, T0 = cf.propertyIsEnumerable, jr = pc(/* @__PURE__ */ function() {
  return arguments;
}()) ? pc : function(e) {
  return Ze(e) && C0.call(e, "callee") && !T0.call(e, "callee");
};
function I0() {
  return !1;
}
var uf = typeof exports == "object" && exports && !exports.nodeType && exports, hc = uf && typeof module == "object" && module && !module.nodeType && module, F0 = hc && hc.exports === uf, mc = F0 ? mt.Buffer : void 0, k0 = mc ? mc.isBuffer : void 0, rr = k0 || I0, D0 = 9007199254740991, R0 = /^(?:0|[1-9]\d*)$/;
function ea(e, t) {
  var r = typeof e;
  return t = t ?? D0, !!t && (r == "number" || r != "symbol" && R0.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var M0 = 9007199254740991;
function ro(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= M0;
}
var L0 = "[object Arguments]", U0 = "[object Array]", W0 = "[object Boolean]", V0 = "[object Date]", z0 = "[object Error]", B0 = "[object Function]", q0 = "[object Map]", K0 = "[object Number]", G0 = "[object Object]", H0 = "[object RegExp]", J0 = "[object Set]", Y0 = "[object String]", Z0 = "[object WeakMap]", X0 = "[object ArrayBuffer]", Q0 = "[object DataView]", ev = "[object Float32Array]", tv = "[object Float64Array]", rv = "[object Int8Array]", nv = "[object Int16Array]", sv = "[object Int32Array]", av = "[object Uint8Array]", iv = "[object Uint8ClampedArray]", ov = "[object Uint16Array]", lv = "[object Uint32Array]", $e = {};
$e[ev] = $e[tv] = $e[rv] = $e[nv] = $e[sv] = $e[av] = $e[iv] = $e[ov] = $e[lv] = !0;
$e[L0] = $e[U0] = $e[X0] = $e[W0] = $e[Q0] = $e[V0] = $e[z0] = $e[B0] = $e[q0] = $e[K0] = $e[G0] = $e[H0] = $e[J0] = $e[Y0] = $e[Z0] = !1;
function cv(e) {
  return Ze(e) && ro(e.length) && !!$e[Ct(e)];
}
function no(e) {
  return function(t) {
    return e(t);
  };
}
var df = typeof exports == "object" && exports && !exports.nodeType && exports, mn = df && typeof module == "object" && module && !module.nodeType && module, uv = mn && mn.exports === df, Ka = uv && ef.process, Er = function() {
  try {
    var e = mn && mn.require && mn.require("util").types;
    return e || Ka && Ka.binding && Ka.binding("util");
  } catch {
  }
}(), gc = Er && Er.isTypedArray, Un = gc ? no(gc) : cv, dv = Object.prototype, fv = dv.hasOwnProperty;
function ff(e, t) {
  var r = Pe(e), n = !r && jr(e), s = !r && !n && rr(e), a = !r && !n && !s && Un(e), i = r || n || s || a, o = i ? lf(e.length, String) : [], l = o.length;
  for (var u in e)
    (t || fv.call(e, u)) && !(i && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    a && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    ea(u, l))) && o.push(u);
  return o;
}
var pv = Object.prototype;
function ta(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || pv;
  return e === r;
}
var hv = rf(Object.keys, Object), mv = Object.prototype, gv = mv.hasOwnProperty;
function pf(e) {
  if (!ta(e))
    return hv(e);
  var t = [];
  for (var r in Object(e))
    gv.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
function Rr(e) {
  return e != null && ro(e.length) && !Xs(e);
}
function ct(e) {
  return Rr(e) ? ff(e) : pf(e);
}
function $i(e) {
  return af(e, ct, to);
}
var yv = 1, vv = Object.prototype, bv = vv.hasOwnProperty;
function $v(e, t, r, n, s, a) {
  var i = r & yv, o = $i(e), l = o.length, u = $i(t), c = u.length;
  if (l != c && !i)
    return !1;
  for (var f = l; f--; ) {
    var m = o[f];
    if (!(i ? m in t : bv.call(t, m)))
      return !1;
  }
  var h = a.get(e), g = a.get(t);
  if (h && g)
    return h == t && g == e;
  var b = !0;
  a.set(e, t), a.set(t, e);
  for (var y = i; ++f < l; ) {
    m = o[f];
    var p = e[m], v = t[m];
    if (n)
      var $ = i ? n(v, p, m, t, e, a) : n(p, v, m, e, t, a);
    if (!($ === void 0 ? p === v || s(p, v, r, n, a) : $)) {
      b = !1;
      break;
    }
    y || (y = m == "constructor");
  }
  if (b && !y) {
    var _ = e.constructor, x = t.constructor;
    _ != x && "constructor" in e && "constructor" in t && !(typeof _ == "function" && _ instanceof _ && typeof x == "function" && x instanceof x) && (b = !1);
  }
  return a.delete(e), a.delete(t), b;
}
var wi = ir(mt, "DataView"), _i = ir(mt, "Promise"), $r = ir(mt, "Set"), xi = ir(mt, "WeakMap"), yc = "[object Map]", wv = "[object Object]", vc = "[object Promise]", bc = "[object Set]", $c = "[object WeakMap]", wc = "[object DataView]", _v = ar(wi), xv = ar(Sn), Sv = ar(_i), jv = ar($r), Ev = ar(xi), He = Ct;
(wi && He(new wi(new ArrayBuffer(1))) != wc || Sn && He(new Sn()) != yc || _i && He(_i.resolve()) != vc || $r && He(new $r()) != bc || xi && He(new xi()) != $c) && (He = function(e) {
  var t = Ct(e), r = t == wv ? e.constructor : void 0, n = r ? ar(r) : "";
  if (n)
    switch (n) {
      case _v:
        return wc;
      case xv:
        return yc;
      case Sv:
        return vc;
      case jv:
        return bc;
      case Ev:
        return $c;
    }
  return t;
});
var Ov = 1, _c = "[object Arguments]", xc = "[object Array]", rs = "[object Object]", Nv = Object.prototype, Sc = Nv.hasOwnProperty;
function Av(e, t, r, n, s, a) {
  var i = Pe(e), o = Pe(t), l = i ? xc : He(e), u = o ? xc : He(t);
  l = l == _c ? rs : l, u = u == _c ? rs : u;
  var c = l == rs, f = u == rs, m = l == u;
  if (m && rr(e)) {
    if (!rr(t))
      return !1;
    i = !0, c = !1;
  }
  if (m && !c)
    return a || (a = new st()), i || Un(e) ? sf(e, t, r, n, s, a) : E0(e, t, l, r, n, s, a);
  if (!(r & Ov)) {
    var h = c && Sc.call(e, "__wrapped__"), g = f && Sc.call(t, "__wrapped__");
    if (h || g) {
      var b = h ? e.value() : e, y = g ? t.value() : t;
      return a || (a = new st()), s(b, y, r, n, a);
    }
  }
  return m ? (a || (a = new st()), $v(e, t, r, n, s, a)) : !1;
}
function ra(e, t, r, n, s) {
  return e === t ? !0 : e == null || t == null || !Ze(e) && !Ze(t) ? e !== e && t !== t : Av(e, t, r, n, ra, s);
}
function Pv(e, t, r) {
  r = typeof r == "function" ? r : void 0;
  var n = r ? r(e, t) : void 0;
  return n === void 0 ? ra(e, t, void 0, r) : !!n;
}
function _e(e, t) {
  return Pv(e, t, (r, n) => {
    if (typeof r == "function" && typeof n == "function")
      return !0;
  });
}
var Cv = "[object Symbol]";
function Wn(e) {
  return typeof e == "symbol" || Ze(e) && Ct(e) == Cv;
}
var Tv = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Iv = /^\w*$/;
function so(e, t) {
  if (Pe(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || Wn(e) ? !0 : Iv.test(e) || !Tv.test(e) || t != null && e in Object(t);
}
var Fv = "Expected a function";
function ao(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Fv);
  var r = function() {
    var n = arguments, s = t ? t.apply(this, n) : n[0], a = r.cache;
    if (a.has(s))
      return a.get(s);
    var i = e.apply(this, n);
    return r.cache = a.set(s, i) || a, i;
  };
  return r.cache = new (ao.Cache || It)(), r;
}
ao.Cache = It;
var kv = 500;
function Dv(e) {
  var t = ao(e, function(n) {
    return r.size === kv && r.clear(), n;
  }), r = t.cache;
  return t;
}
var Rv = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Mv = /\\(\\)?/g, hf = Dv(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Rv, function(r, n, s, a) {
    t.push(s ? a.replace(Mv, "$1") : n || r);
  }), t;
});
function na(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, s = Array(n); ++r < n; )
    s[r] = t(e[r], r, e);
  return s;
}
var jc = Ye ? Ye.prototype : void 0, Ec = jc ? jc.toString : void 0;
function mf(e) {
  if (typeof e == "string")
    return e;
  if (Pe(e))
    return na(e, mf) + "";
  if (Wn(e))
    return Ec ? Ec.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function io(e) {
  return e == null ? "" : mf(e);
}
function Mr(e, t) {
  return Pe(e) ? e : so(e, t) ? [e] : hf(io(e));
}
function or(e) {
  if (typeof e == "string" || Wn(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function sa(e, t) {
  t = Mr(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[or(t[r++])];
  return r && r == n ? e : void 0;
}
function K(e, t, r) {
  var n = e == null ? void 0 : sa(e, t);
  return n === void 0 ? r : n;
}
var Lv = "[object Map]", Uv = "[object Set]", Wv = Object.prototype, Vv = Wv.hasOwnProperty;
function Or(e) {
  if (e == null)
    return !0;
  if (Rr(e) && (Pe(e) || typeof e == "string" || typeof e.splice == "function" || rr(e) || Un(e) || jr(e)))
    return !e.length;
  var t = He(e);
  if (t == Lv || t == Uv)
    return !e.size;
  if (ta(e))
    return !pf(e).length;
  for (var r in e)
    if (Vv.call(e, r))
      return !1;
  return !0;
}
var aa = {}, zv = /~/, Bv = /~[01]/g;
function qv(e) {
  switch (e) {
    case "~1":
      return "/";
    case "~0":
      return "~";
  }
  throw new Error("Invalid tilde escape: " + e);
}
function gf(e) {
  return zv.test(e) ? e.replace(Bv, qv) : e;
}
function Kv(e, t, r) {
  for (var n, s, a = 1, i = t.length; a < i; ) {
    if (t[a] === "constructor" || t[a] === "prototype" || t[a] === "__proto__") return e;
    if (n = gf(t[a++]), s = i > a, typeof e[n] > "u" && (Array.isArray(e) && n === "-" && (n = e.length), s && (t[a] !== "" && t[a] < 1 / 0 || t[a] === "-" ? e[n] = [] : e[n] = {})), !s) break;
    e = e[n];
  }
  var o = e[n];
  return r === void 0 ? delete e[n] : e[n] = r, o;
}
function oo(e) {
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
function yf(e, t) {
  if (typeof e != "object") throw new Error("Invalid input object.");
  t = oo(t);
  var r = t.length;
  if (r === 1) return e;
  for (var n = 1; n < r; ) {
    if (e = e[gf(t[n++])], r === n) return e;
    if (typeof e != "object" || e === null) return;
  }
}
function vf(e, t, r) {
  if (typeof e != "object") throw new Error("Invalid input object.");
  if (t = oo(t), t.length === 0) throw new Error("Invalid JSON pointer for set.");
  return Kv(e, t, r);
}
function Gv(e) {
  var t = oo(e);
  return {
    get: function(r) {
      return yf(r, t);
    },
    set: function(r, n) {
      return vf(r, t, n);
    }
  };
}
aa.get = yf;
aa.set = vf;
aa.compile = Gv;
function lo(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var Ts = function() {
  try {
    var e = ir(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
function co(e, t, r) {
  t == "__proto__" && Ts ? Ts(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var Hv = Object.prototype, Jv = Hv.hasOwnProperty;
function uo(e, t, r) {
  var n = e[t];
  (!(Jv.call(e, t) && Ln(n, r)) || r === void 0 && !(t in e)) && co(e, t, r);
}
function Lr(e, t, r, n) {
  var s = !r;
  r || (r = {});
  for (var a = -1, i = t.length; ++a < i; ) {
    var o = t[a], l = void 0;
    l === void 0 && (l = e[o]), s ? co(r, o, l) : uo(r, o, l);
  }
  return r;
}
function Yv(e, t) {
  return e && Lr(t, ct(t), e);
}
function Zv(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var Xv = Object.prototype, Qv = Xv.hasOwnProperty;
function eb(e) {
  if (!be(e))
    return Zv(e);
  var t = ta(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !Qv.call(e, n)) || r.push(n);
  return r;
}
function Vn(e) {
  return Rr(e) ? ff(e, !0) : eb(e);
}
function tb(e, t) {
  return e && Lr(t, Vn(t), e);
}
var bf = typeof exports == "object" && exports && !exports.nodeType && exports, Oc = bf && typeof module == "object" && module && !module.nodeType && module, rb = Oc && Oc.exports === bf, Nc = rb ? mt.Buffer : void 0, Ac = Nc ? Nc.allocUnsafe : void 0;
function $f(e, t) {
  if (t)
    return e.slice();
  var r = e.length, n = Ac ? Ac(r) : new e.constructor(r);
  return e.copy(n), n;
}
function fo(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
function nb(e, t) {
  return Lr(e, to(e), t);
}
var sb = Object.getOwnPropertySymbols, wf = sb ? function(e) {
  for (var t = []; e; )
    eo(t, to(e)), e = Ys(e);
  return t;
} : of;
function ab(e, t) {
  return Lr(e, wf(e), t);
}
function po(e) {
  return af(e, Vn, wf);
}
var ib = Object.prototype, ob = ib.hasOwnProperty;
function lb(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && ob.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
function ho(e) {
  var t = new e.constructor(e.byteLength);
  return new Cs(t).set(new Cs(e)), t;
}
function cb(e, t) {
  var r = t ? ho(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var ub = /\w*$/;
function db(e) {
  var t = new e.constructor(e.source, ub.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var Pc = Ye ? Ye.prototype : void 0, Cc = Pc ? Pc.valueOf : void 0;
function fb(e) {
  return Cc ? Object(Cc.call(e)) : {};
}
function _f(e, t) {
  var r = t ? ho(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var pb = "[object Boolean]", hb = "[object Date]", mb = "[object Map]", gb = "[object Number]", yb = "[object RegExp]", vb = "[object Set]", bb = "[object String]", $b = "[object Symbol]", wb = "[object ArrayBuffer]", _b = "[object DataView]", xb = "[object Float32Array]", Sb = "[object Float64Array]", jb = "[object Int8Array]", Eb = "[object Int16Array]", Ob = "[object Int32Array]", Nb = "[object Uint8Array]", Ab = "[object Uint8ClampedArray]", Pb = "[object Uint16Array]", Cb = "[object Uint32Array]";
function Tb(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case wb:
      return ho(e);
    case pb:
    case hb:
      return new n(+e);
    case _b:
      return cb(e, r);
    case xb:
    case Sb:
    case jb:
    case Eb:
    case Ob:
    case Nb:
    case Ab:
    case Pb:
    case Cb:
      return _f(e, r);
    case mb:
      return new n();
    case gb:
    case bb:
      return new n(e);
    case yb:
      return db(e);
    case vb:
      return new n();
    case $b:
      return fb(e);
  }
}
var Tc = Object.create, xf = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!be(t))
      return {};
    if (Tc)
      return Tc(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}();
function Sf(e) {
  return typeof e.constructor == "function" && !ta(e) ? xf(Ys(e)) : {};
}
var Ib = "[object Map]";
function Fb(e) {
  return Ze(e) && He(e) == Ib;
}
var Ic = Er && Er.isMap, kb = Ic ? no(Ic) : Fb, Db = "[object Set]";
function Rb(e) {
  return Ze(e) && He(e) == Db;
}
var Fc = Er && Er.isSet, Mb = Fc ? no(Fc) : Rb, Lb = 1, Ub = 2, Wb = 4, jf = "[object Arguments]", Vb = "[object Array]", zb = "[object Boolean]", Bb = "[object Date]", qb = "[object Error]", Ef = "[object Function]", Kb = "[object GeneratorFunction]", Gb = "[object Map]", Hb = "[object Number]", Of = "[object Object]", Jb = "[object RegExp]", Yb = "[object Set]", Zb = "[object String]", Xb = "[object Symbol]", Qb = "[object WeakMap]", e$ = "[object ArrayBuffer]", t$ = "[object DataView]", r$ = "[object Float32Array]", n$ = "[object Float64Array]", s$ = "[object Int8Array]", a$ = "[object Int16Array]", i$ = "[object Int32Array]", o$ = "[object Uint8Array]", l$ = "[object Uint8ClampedArray]", c$ = "[object Uint16Array]", u$ = "[object Uint32Array]", ge = {};
ge[jf] = ge[Vb] = ge[e$] = ge[t$] = ge[zb] = ge[Bb] = ge[r$] = ge[n$] = ge[s$] = ge[a$] = ge[i$] = ge[Gb] = ge[Hb] = ge[Of] = ge[Jb] = ge[Yb] = ge[Zb] = ge[Xb] = ge[o$] = ge[l$] = ge[c$] = ge[u$] = !0;
ge[qb] = ge[Ef] = ge[Qb] = !1;
function gn(e, t, r, n, s, a) {
  var i, o = t & Lb, l = t & Ub, u = t & Wb;
  if (r && (i = s ? r(e, n, s, a) : r(e)), i !== void 0)
    return i;
  if (!be(e))
    return e;
  var c = Pe(e);
  if (c) {
    if (i = lb(e), !o)
      return fo(e, i);
  } else {
    var f = He(e), m = f == Ef || f == Kb;
    if (rr(e))
      return $f(e, o);
    if (f == Of || f == jf || m && !s) {
      if (i = l || m ? {} : Sf(e), !o)
        return l ? ab(e, tb(i, e)) : nb(e, Yv(i, e));
    } else {
      if (!ge[f])
        return s ? e : {};
      i = Tb(e, f, o);
    }
  }
  a || (a = new st());
  var h = a.get(e);
  if (h)
    return h;
  a.set(e, i), Mb(e) ? e.forEach(function(y) {
    i.add(gn(y, t, r, y, e, a));
  }) : kb(e) && e.forEach(function(y, p) {
    i.set(p, gn(y, t, r, p, e, a));
  });
  var g = u ? l ? po : $i : l ? Vn : ct, b = c ? void 0 : g(e);
  return lo(b || e, function(y, p) {
    b && (p = y, y = e[p]), uo(i, p, gn(y, t, r, p, e, a));
  }), i;
}
function d$(e) {
  var t = e == null ? 0 : e.length;
  return t ? e[t - 1] : void 0;
}
function f$(e, t, r) {
  var n = -1, s = e.length;
  t < 0 && (t = -t > s ? 0 : s + t), r = r > s ? s : r, r < 0 && (r += s), s = t > r ? 0 : r - t >>> 0, t >>>= 0;
  for (var a = Array(s); ++n < s; )
    a[n] = e[n + t];
  return a;
}
function p$(e, t) {
  return t.length < 2 ? e : sa(e, f$(t, 0, -1));
}
function Nf(e, t) {
  return t = Mr(t, e), e = p$(e, t), e == null || delete e[or(d$(t))];
}
function h$(e) {
  return er(e) ? void 0 : e;
}
var kc = Ye ? Ye.isConcatSpreadable : void 0;
function m$(e) {
  return Pe(e) || jr(e) || !!(kc && e && e[kc]);
}
function zn(e, t, r, n, s) {
  var a = -1, i = e.length;
  for (r || (r = m$), s || (s = []); ++a < i; ) {
    var o = e[a];
    t > 0 && r(o) ? t > 1 ? zn(o, t - 1, r, n, s) : eo(s, o) : n || (s[s.length] = o);
  }
  return s;
}
function g$(e) {
  var t = e == null ? 0 : e.length;
  return t ? zn(e, 1) : [];
}
function y$(e, t, r) {
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
var Dc = Math.max;
function Af(e, t, r) {
  return t = Dc(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, s = -1, a = Dc(n.length - t, 0), i = Array(a); ++s < a; )
      i[s] = n[t + s];
    s = -1;
    for (var o = Array(t + 1); ++s < t; )
      o[s] = n[s];
    return o[t] = r(i), y$(e, this, o);
  };
}
function v$(e) {
  return function() {
    return e;
  };
}
function ia(e) {
  return e;
}
var b$ = Ts ? function(e, t) {
  return Ts(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: v$(t),
    writable: !0
  });
} : ia, $$ = 800, w$ = 16, _$ = Date.now;
function x$(e) {
  var t = 0, r = 0;
  return function() {
    var n = _$(), s = w$ - (n - r);
    if (r = n, s > 0) {
      if (++t >= $$)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
var Pf = x$(b$);
function Cf(e) {
  return Pf(Af(e, void 0, g$), e + "");
}
var S$ = 1, j$ = 2, E$ = 4, Is = Cf(function(e, t) {
  var r = {};
  if (e == null)
    return r;
  var n = !1;
  t = na(t, function(a) {
    return a = Mr(a, e), n || (n = a.length > 1), a;
  }), Lr(e, po(e), r), n && (r = gn(r, S$ | j$ | E$, h$));
  for (var s = t.length; s--; )
    Nf(r, t[s]);
  return r;
});
function mo(e, t) {
  const r = t[e];
  return [Is(t, [e]), r];
}
function Tf(e, t = {}, r = []) {
  const n = e || "";
  let s;
  if (n.startsWith("#"))
    s = decodeURIComponent(n.substring(1));
  else
    throw new Error(`Could not find a definition for ${e}.`);
  const a = aa.get(t, s);
  if (a === void 0)
    throw new Error(`Could not find a definition for ${e}.`);
  const i = a[Ae];
  if (i) {
    if (r.includes(i)) {
      if (r.length === 1)
        throw new Error(`Definition for ${e} is a circular reference`);
      const [c, ...f] = r, m = [...f, n, c].join(" -> ");
      throw new Error(`Definition for ${c} contains a circular reference through ${m}`);
    }
    const [o, l] = mo(Ae, a), u = Tf(l, t, [...r, n]);
    return Object.keys(o).length > 0 ? { ...o, ...u } : u;
  }
  return a;
}
function If(e, t = {}) {
  return Tf(e, t, []);
}
var O$ = Object.prototype, N$ = O$.hasOwnProperty;
function A$(e, t) {
  return e != null && N$.call(e, t);
}
function Ff(e, t, r) {
  t = Mr(t, e);
  for (var n = -1, s = t.length, a = !1; ++n < s; ) {
    var i = or(t[n]);
    if (!(a = e != null && r(e, i)))
      break;
    e = e[i];
  }
  return a || ++n != s ? a : (s = e == null ? 0 : e.length, !!s && ro(s) && ea(i, s) && (Pe(e) || jr(e)));
}
function Ue(e, t) {
  return e != null && Ff(e, t, A$);
}
var P$ = "[object Number]";
function kf(e) {
  return typeof e == "number" || Ze(e) && Ct(e) == P$;
}
var C$ = "[object String]";
function oa(e) {
  return typeof e == "string" || !Pe(e) && Ze(e) && Ct(e) == C$;
}
function T$(e, t, r, n) {
  var s = -1, a = e == null ? 0 : e.length;
  for (n && a && (r = e[++s]); ++s < a; )
    r = t(r, e[s], s, e);
  return r;
}
function I$(e) {
  return function(t, r, n) {
    for (var s = -1, a = Object(t), i = n(t), o = i.length; o--; ) {
      var l = i[++s];
      if (r(a[l], l, a) === !1)
        break;
    }
    return t;
  };
}
var Df = I$();
function Rf(e, t) {
  return e && Df(e, t, ct);
}
function F$(e, t) {
  return function(r, n) {
    if (r == null)
      return r;
    if (!Rr(r))
      return e(r, n);
    for (var s = r.length, a = -1, i = Object(r); ++a < s && n(i[a], a, i) !== !1; )
      ;
    return r;
  };
}
var Mf = F$(Rf), k$ = 1, D$ = 2;
function R$(e, t, r, n) {
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
    var o = i[0], l = e[o], u = i[1];
    if (i[2]) {
      if (l === void 0 && !(o in e))
        return !1;
    } else {
      var c = new st(), f;
      if (!(f === void 0 ? ra(u, l, k$ | D$, n, c) : f))
        return !1;
    }
  }
  return !0;
}
function Lf(e) {
  return e === e && !be(e);
}
function M$(e) {
  for (var t = ct(e), r = t.length; r--; ) {
    var n = t[r], s = e[n];
    t[r] = [n, s, Lf(s)];
  }
  return t;
}
function Uf(e, t) {
  return function(r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
  };
}
function L$(e) {
  var t = M$(e);
  return t.length == 1 && t[0][2] ? Uf(t[0][0], t[0][1]) : function(r) {
    return r === e || R$(r, e, t);
  };
}
function U$(e, t) {
  return e != null && t in Object(e);
}
function Wf(e, t) {
  return e != null && Ff(e, t, U$);
}
var W$ = 1, V$ = 2;
function z$(e, t) {
  return so(e) && Lf(t) ? Uf(or(e), t) : function(r) {
    var n = K(r, e);
    return n === void 0 && n === t ? Wf(r, e) : ra(t, n, W$ | V$);
  };
}
function B$(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function q$(e) {
  return function(t) {
    return sa(t, e);
  };
}
function K$(e) {
  return so(e) ? B$(or(e)) : q$(e);
}
function go(e) {
  return typeof e == "function" ? e : e == null ? ia : typeof e == "object" ? Pe(e) ? z$(e[0], e[1]) : L$(e) : K$(e);
}
function G$(e, t, r, n, s) {
  return s(e, function(a, i, o) {
    r = n ? (n = !1, a) : t(r, a, i, o);
  }), r;
}
function H$(e, t, r) {
  var n = Pe(e) ? T$ : G$, s = arguments.length < 3;
  return n(e, go(t), r, s, Mf);
}
function Vf(e) {
  return typeof e == "function" ? e : ia;
}
var J$ = /\s/;
function Y$(e) {
  for (var t = e.length; t-- && J$.test(e.charAt(t)); )
    ;
  return t;
}
var Z$ = /^\s+/;
function X$(e) {
  return e && e.slice(0, Y$(e) + 1).replace(Z$, "");
}
var Rc = NaN, Q$ = /^[-+]0x[0-9a-f]+$/i, e1 = /^0b[01]+$/i, t1 = /^0o[0-7]+$/i, r1 = parseInt;
function n1(e) {
  if (typeof e == "number")
    return e;
  if (Wn(e))
    return Rc;
  if (be(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = be(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = X$(e);
  var r = e1.test(e);
  return r || t1.test(e) ? r1(e.slice(2), r ? 2 : 8) : Q$.test(e) ? Rc : +e;
}
var Mc = 1 / 0, s1 = 17976931348623157e292;
function a1(e) {
  if (!e)
    return e === 0 ? e : 0;
  if (e = n1(e), e === Mc || e === -Mc) {
    var t = e < 0 ? -1 : 1;
    return t * s1;
  }
  return e === e ? e : 0;
}
function i1(e) {
  var t = a1(e), r = t % 1;
  return t === t ? r ? t - r : t : 0;
}
var o1 = 9007199254740991, Ga = 4294967295, l1 = Math.min;
function zf(e, t) {
  if (e = i1(e), e < 1 || e > o1)
    return [];
  var r = Ga, n = l1(e, Ga);
  t = Vf(t), e -= Ga;
  for (var s = lf(n, t); ++r < e; )
    t(r);
  return s;
}
function Bf(e, t, r) {
  var n;
  if (e && r) {
    const s = K(e, r);
    if (s === void 0)
      return;
    for (let a = 0; a < t.length; a++) {
      const i = t[a], o = K(i, [Ee, r], {});
      if (!(o.type === "object" || o.type === "array") && (o.const === s || !((n = o.enum) === null || n === void 0) && n.includes(s)))
        return a;
    }
  }
}
function qf(e, t, r, n, s) {
  if (t === void 0)
    return 0;
  const a = Bf(t, r, s);
  if (kf(a))
    return a;
  for (let i = 0; i < r.length; i++) {
    const o = r[i];
    if (s && Ue(o, [Ee, s])) {
      const l = K(t, s), u = K(o, [Ee, s], {});
      if (e.isValid(u, l, n))
        return i;
    } else if (o[Ee]) {
      const l = {
        anyOf: Object.keys(o[Ee]).map((c) => ({
          required: [c]
        }))
      };
      let u;
      if (o.anyOf) {
        const { ...c } = o;
        c.allOf ? c.allOf = c.allOf.slice() : c.allOf = [], c.allOf.push(l), u = c;
      } else
        u = Object.assign({}, o, l);
      if (delete u.required, e.isValid(u, t, n))
        return i;
    } else if (e.isValid(o, t, n))
      return i;
  }
  return 0;
}
function yo(e, t, r, n, s) {
  return qf(e, t, r, n, s);
}
function vo(e, t, r, n) {
  if (!be(e))
    return e;
  t = Mr(t, e);
  for (var s = -1, a = t.length, i = a - 1, o = e; o != null && ++s < a; ) {
    var l = or(t[s]), u = r;
    if (l === "__proto__" || l === "constructor" || l === "prototype")
      return e;
    if (s != i) {
      var c = o[l];
      u = n ? n(c, l, o) : void 0, u === void 0 && (u = be(c) ? c : ea(t[s + 1]) ? [] : {});
    }
    uo(o, l, u), o = o[l];
  }
  return e;
}
function Ie(e, t, r) {
  return e == null ? e : vo(e, t, r);
}
function c1(e, t, r) {
  var n = Pe(e), s = n || rr(e) || Un(e);
  if (t = go(t), r == null) {
    var a = e && e.constructor;
    s ? r = n ? new a() : [] : be(e) ? r = Xs(a) ? xf(Ys(e)) : {} : r = {};
  }
  return (s ? lo : Rf)(e, function(i, o, l) {
    return t(r, i, o, l);
  }), r;
}
function Si(e, t, r) {
  (r !== void 0 && !Ln(e[t], r) || r === void 0 && !(t in e)) && co(e, t, r);
}
function Fs(e) {
  return Ze(e) && Rr(e);
}
function ji(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function u1(e) {
  return Lr(e, Vn(e));
}
function d1(e, t, r, n, s, a, i) {
  var o = ji(e, r), l = ji(t, r), u = i.get(l);
  if (u) {
    Si(e, r, u);
    return;
  }
  var c = a ? a(o, l, r + "", e, t, i) : void 0, f = c === void 0;
  if (f) {
    var m = Pe(l), h = !m && rr(l), g = !m && !h && Un(l);
    c = l, m || h || g ? Pe(o) ? c = o : Fs(o) ? c = fo(o) : h ? (f = !1, c = $f(l, !0)) : g ? (f = !1, c = _f(l, !0)) : c = [] : er(l) || jr(l) ? (c = o, jr(o) ? c = u1(o) : (!be(o) || Xs(o)) && (c = Sf(l))) : f = !1;
  }
  f && (i.set(l, c), s(c, l, n, a, i), i.delete(l)), Si(e, r, c);
}
function Kf(e, t, r, n, s) {
  e !== t && Df(t, function(a, i) {
    if (s || (s = new st()), be(a))
      d1(e, t, i, r, Kf, n, s);
    else {
      var o = n ? n(ji(e, i), a, i + "", e, t, s) : void 0;
      o === void 0 && (o = a), Si(e, i, o);
    }
  }, Vn);
}
function bo(e, t) {
  return Pf(Af(e, t, ia), e + "");
}
function f1(e, t, r) {
  if (!be(r))
    return !1;
  var n = typeof t;
  return (n == "number" ? Rr(r) && ea(t, r.length) : n == "string" && t in r) ? Ln(r[t], e) : !1;
}
function p1(e) {
  return bo(function(t, r) {
    var n = -1, s = r.length, a = s > 1 ? r[s - 1] : void 0, i = s > 2 ? r[2] : void 0;
    for (a = e.length > 3 && typeof a == "function" ? (s--, a) : void 0, i && f1(r[0], r[1], i) && (a = s < 3 ? void 0 : a, s = 1), t = Object(t); ++n < s; ) {
      var o = r[n];
      o && e(t, o, n, a);
    }
    return t;
  });
}
var h1 = p1(function(e, t, r) {
  Kf(e, t, r);
}), m1 = 1 / 0;
function g1(e) {
  var t = e == null ? 0 : e.length;
  return t ? zn(e, m1) : [];
}
function y1(e, t, r, n) {
  for (var s = e.length, a = r + -1; ++a < s; )
    if (t(e[a], a, e))
      return a;
  return -1;
}
function v1(e) {
  return e !== e;
}
function b1(e, t, r) {
  for (var n = r - 1, s = e.length; ++n < s; )
    if (e[n] === t)
      return n;
  return -1;
}
function $1(e, t, r) {
  return t === t ? b1(e, t, r) : y1(e, v1, r);
}
function Gf(e, t) {
  var r = e == null ? 0 : e.length;
  return !!r && $1(e, t, 0) > -1;
}
function w1() {
}
var _1 = 1 / 0, x1 = $r && 1 / Qi(new $r([, -0]))[1] == _1 ? function(e) {
  return new $r(e);
} : w1, S1 = 200;
function Hf(e, t, r) {
  var n = -1, s = Gf, a = e.length, i = !0, o = [], l = o;
  if (a >= S1) {
    var u = x1(e);
    if (u)
      return Qi(u);
    i = !1, s = Xi, l = new Sr();
  } else
    l = o;
  e:
    for (; ++n < a; ) {
      var c = e[n], f = c;
      if (c = c !== 0 ? c : 0, i && f === f) {
        for (var m = l.length; m--; )
          if (l[m] === f)
            continue e;
        o.push(c);
      } else s(l, f, r) || (l !== o && l.push(f), o.push(c));
    }
  return o;
}
function j1(e) {
  return e && e.length ? Hf(e) : [];
}
function E1() {
  this.__data__ = [], this.size = 0;
}
var O1 = E1;
function N1(e, t) {
  return e === t || e !== e && t !== t;
}
var Ur = N1, A1 = Ur;
function P1(e, t) {
  for (var r = e.length; r--; )
    if (A1(e[r][0], t))
      return r;
  return -1;
}
var la = P1, C1 = la, T1 = Array.prototype, I1 = T1.splice;
function F1(e) {
  var t = this.__data__, r = C1(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : I1.call(t, r, 1), --this.size, !0;
}
var k1 = F1, D1 = la;
function R1(e) {
  var t = this.__data__, r = D1(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var M1 = R1, L1 = la;
function U1(e) {
  return L1(this.__data__, e) > -1;
}
var W1 = U1, V1 = la;
function z1(e, t) {
  var r = this.__data__, n = V1(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
var B1 = z1, q1 = O1, K1 = k1, G1 = M1, H1 = W1, J1 = B1;
function Wr(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Wr.prototype.clear = q1;
Wr.prototype.delete = K1;
Wr.prototype.get = G1;
Wr.prototype.has = H1;
Wr.prototype.set = J1;
var ca = Wr, Y1 = ca;
function Z1() {
  this.__data__ = new Y1(), this.size = 0;
}
var X1 = Z1;
function Q1(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var ew = Q1;
function tw(e) {
  return this.__data__.get(e);
}
var rw = tw;
function nw(e) {
  return this.__data__.has(e);
}
var sw = nw, aw = typeof ts == "object" && ts && ts.Object === Object && ts, Jf = aw, iw = Jf, ow = typeof self == "object" && self && self.Object === Object && self, lw = iw || ow || Function("return this")(), gt = lw, cw = gt, uw = cw.Symbol, Vr = uw, Lc = Vr, Yf = Object.prototype, dw = Yf.hasOwnProperty, fw = Yf.toString, nn = Lc ? Lc.toStringTag : void 0;
function pw(e) {
  var t = dw.call(e, nn), r = e[nn];
  try {
    e[nn] = void 0;
    var n = !0;
  } catch {
  }
  var s = fw.call(e);
  return n && (t ? e[nn] = r : delete e[nn]), s;
}
var hw = pw, mw = Object.prototype, gw = mw.toString;
function yw(e) {
  return gw.call(e);
}
var vw = yw, Uc = Vr, bw = hw, $w = vw, ww = "[object Null]", _w = "[object Undefined]", Wc = Uc ? Uc.toStringTag : void 0;
function xw(e) {
  return e == null ? e === void 0 ? _w : ww : Wc && Wc in Object(e) ? bw(e) : $w(e);
}
var lr = xw;
function Sw(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var yt = Sw, jw = lr, Ew = yt, Ow = "[object AsyncFunction]", Nw = "[object Function]", Aw = "[object GeneratorFunction]", Pw = "[object Proxy]";
function Cw(e) {
  if (!Ew(e))
    return !1;
  var t = jw(e);
  return t == Nw || t == Aw || t == Ow || t == Pw;
}
var $o = Cw, Tw = gt, Iw = Tw["__core-js_shared__"], Fw = Iw, Ha = Fw, Vc = function() {
  var e = /[^.]+$/.exec(Ha && Ha.keys && Ha.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function kw(e) {
  return !!Vc && Vc in e;
}
var Dw = kw, Rw = Function.prototype, Mw = Rw.toString;
function Lw(e) {
  if (e != null) {
    try {
      return Mw.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Zf = Lw, Uw = $o, Ww = Dw, Vw = yt, zw = Zf, Bw = /[\\^$.*+?()[\]{}|]/g, qw = /^\[object .+?Constructor\]$/, Kw = Function.prototype, Gw = Object.prototype, Hw = Kw.toString, Jw = Gw.hasOwnProperty, Yw = RegExp(
  "^" + Hw.call(Jw).replace(Bw, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Zw(e) {
  if (!Vw(e) || Ww(e))
    return !1;
  var t = Uw(e) ? Yw : qw;
  return t.test(zw(e));
}
var Xw = Zw;
function Qw(e, t) {
  return e == null ? void 0 : e[t];
}
var e_ = Qw, t_ = Xw, r_ = e_;
function n_(e, t) {
  var r = r_(e, t);
  return t_(r) ? r : void 0;
}
var cr = n_, s_ = cr, a_ = gt, i_ = s_(a_, "Map"), wo = i_, o_ = cr, l_ = o_(Object, "create"), ua = l_, zc = ua;
function c_() {
  this.__data__ = zc ? zc(null) : {}, this.size = 0;
}
var u_ = c_;
function d_(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var f_ = d_, p_ = ua, h_ = "__lodash_hash_undefined__", m_ = Object.prototype, g_ = m_.hasOwnProperty;
function y_(e) {
  var t = this.__data__;
  if (p_) {
    var r = t[e];
    return r === h_ ? void 0 : r;
  }
  return g_.call(t, e) ? t[e] : void 0;
}
var v_ = y_, b_ = ua, $_ = Object.prototype, w_ = $_.hasOwnProperty;
function __(e) {
  var t = this.__data__;
  return b_ ? t[e] !== void 0 : w_.call(t, e);
}
var x_ = __, S_ = ua, j_ = "__lodash_hash_undefined__";
function E_(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = S_ && t === void 0 ? j_ : t, this;
}
var O_ = E_, N_ = u_, A_ = f_, P_ = v_, C_ = x_, T_ = O_;
function zr(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
zr.prototype.clear = N_;
zr.prototype.delete = A_;
zr.prototype.get = P_;
zr.prototype.has = C_;
zr.prototype.set = T_;
var I_ = zr, Bc = I_, F_ = ca, k_ = wo;
function D_() {
  this.size = 0, this.__data__ = {
    hash: new Bc(),
    map: new (k_ || F_)(),
    string: new Bc()
  };
}
var R_ = D_;
function M_(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var L_ = M_, U_ = L_;
function W_(e, t) {
  var r = e.__data__;
  return U_(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var da = W_, V_ = da;
function z_(e) {
  var t = V_(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var B_ = z_, q_ = da;
function K_(e) {
  return q_(this, e).get(e);
}
var G_ = K_, H_ = da;
function J_(e) {
  return H_(this, e).has(e);
}
var Y_ = J_, Z_ = da;
function X_(e, t) {
  var r = Z_(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
var Q_ = X_, ex = R_, tx = B_, rx = G_, nx = Y_, sx = Q_;
function Br(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Br.prototype.clear = ex;
Br.prototype.delete = tx;
Br.prototype.get = rx;
Br.prototype.has = nx;
Br.prototype.set = sx;
var _o = Br, ax = ca, ix = wo, ox = _o, lx = 200;
function cx(e, t) {
  var r = this.__data__;
  if (r instanceof ax) {
    var n = r.__data__;
    if (!ix || n.length < lx - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new ox(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
var ux = cx, dx = ca, fx = X1, px = ew, hx = rw, mx = sw, gx = ux;
function qr(e) {
  var t = this.__data__ = new dx(e);
  this.size = t.size;
}
qr.prototype.clear = fx;
qr.prototype.delete = px;
qr.prototype.get = hx;
qr.prototype.has = mx;
qr.prototype.set = gx;
var fa = qr;
function yx(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var Xf = yx, vx = cr, bx = function() {
  try {
    var e = vx(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), Qf = bx, qc = Qf;
function $x(e, t, r) {
  t == "__proto__" && qc ? qc(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var xo = $x, wx = xo, _x = Ur, xx = Object.prototype, Sx = xx.hasOwnProperty;
function jx(e, t, r) {
  var n = e[t];
  (!(Sx.call(e, t) && _x(n, r)) || r === void 0 && !(t in e)) && wx(e, t, r);
}
var ep = jx, Ex = ep, Ox = xo;
function Nx(e, t, r, n) {
  var s = !r;
  r || (r = {});
  for (var a = -1, i = t.length; ++a < i; ) {
    var o = t[a], l = n ? n(r[o], e[o], o, r, e) : void 0;
    l === void 0 && (l = e[o]), s ? Ox(r, o, l) : Ex(r, o, l);
  }
  return r;
}
var Bn = Nx;
function Ax(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var Px = Ax;
function Cx(e) {
  return e != null && typeof e == "object";
}
var vt = Cx, Tx = lr, Ix = vt, Fx = "[object Arguments]";
function kx(e) {
  return Ix(e) && Tx(e) == Fx;
}
var Dx = kx, Kc = Dx, Rx = vt, tp = Object.prototype, Mx = tp.hasOwnProperty, Lx = tp.propertyIsEnumerable, Ux = Kc(/* @__PURE__ */ function() {
  return arguments;
}()) ? Kc : function(e) {
  return Rx(e) && Mx.call(e, "callee") && !Lx.call(e, "callee");
}, pa = Ux, Wx = Array.isArray, Ke = Wx, ks = { exports: {} };
function Vx() {
  return !1;
}
var zx = Vx;
ks.exports;
(function(e, t) {
  var r = gt, n = zx, s = t && !t.nodeType && t, a = s && !0 && e && !e.nodeType && e, i = a && a.exports === s, o = i ? r.Buffer : void 0, l = o ? o.isBuffer : void 0, u = l || n;
  e.exports = u;
})(ks, ks.exports);
var ha = ks.exports, Bx = 9007199254740991, qx = /^(?:0|[1-9]\d*)$/;
function Kx(e, t) {
  var r = typeof e;
  return t = t ?? Bx, !!t && (r == "number" || r != "symbol" && qx.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var So = Kx, Gx = 9007199254740991;
function Hx(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Gx;
}
var jo = Hx, Jx = lr, Yx = jo, Zx = vt, Xx = "[object Arguments]", Qx = "[object Array]", eS = "[object Boolean]", tS = "[object Date]", rS = "[object Error]", nS = "[object Function]", sS = "[object Map]", aS = "[object Number]", iS = "[object Object]", oS = "[object RegExp]", lS = "[object Set]", cS = "[object String]", uS = "[object WeakMap]", dS = "[object ArrayBuffer]", fS = "[object DataView]", pS = "[object Float32Array]", hS = "[object Float64Array]", mS = "[object Int8Array]", gS = "[object Int16Array]", yS = "[object Int32Array]", vS = "[object Uint8Array]", bS = "[object Uint8ClampedArray]", $S = "[object Uint16Array]", wS = "[object Uint32Array]", we = {};
we[pS] = we[hS] = we[mS] = we[gS] = we[yS] = we[vS] = we[bS] = we[$S] = we[wS] = !0;
we[Xx] = we[Qx] = we[dS] = we[eS] = we[fS] = we[tS] = we[rS] = we[nS] = we[sS] = we[aS] = we[iS] = we[oS] = we[lS] = we[cS] = we[uS] = !1;
function _S(e) {
  return Zx(e) && Yx(e.length) && !!we[Jx(e)];
}
var xS = _S;
function SS(e) {
  return function(t) {
    return e(t);
  };
}
var ur = SS, Ds = { exports: {} };
Ds.exports;
(function(e, t) {
  var r = Jf, n = t && !t.nodeType && t, s = n && !0 && e && !e.nodeType && e, a = s && s.exports === n, i = a && r.process, o = function() {
    try {
      var l = s && s.require && s.require("util").types;
      return l || i && i.binding && i.binding("util");
    } catch {
    }
  }();
  e.exports = o;
})(Ds, Ds.exports);
var Eo = Ds.exports, jS = xS, ES = ur, Gc = Eo, Hc = Gc && Gc.isTypedArray, OS = Hc ? ES(Hc) : jS, Oo = OS, NS = Px, AS = pa, PS = Ke, CS = ha, TS = So, IS = Oo, FS = Object.prototype, kS = FS.hasOwnProperty;
function DS(e, t) {
  var r = PS(e), n = !r && AS(e), s = !r && !n && CS(e), a = !r && !n && !s && IS(e), i = r || n || s || a, o = i ? NS(e.length, String) : [], l = o.length;
  for (var u in e)
    (t || kS.call(e, u)) && !(i && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    a && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    TS(u, l))) && o.push(u);
  return o;
}
var rp = DS, RS = Object.prototype;
function MS(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || RS;
  return e === r;
}
var No = MS;
function LS(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var np = LS, US = np, WS = US(Object.keys, Object), VS = WS, zS = No, BS = VS, qS = Object.prototype, KS = qS.hasOwnProperty;
function GS(e) {
  if (!zS(e))
    return BS(e);
  var t = [];
  for (var r in Object(e))
    KS.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var HS = GS, JS = $o, YS = jo;
function ZS(e) {
  return e != null && YS(e.length) && !JS(e);
}
var Kr = ZS, XS = rp, QS = HS, ej = Kr;
function tj(e) {
  return ej(e) ? XS(e) : QS(e);
}
var qn = tj, rj = Bn, nj = qn;
function sj(e, t) {
  return e && rj(t, nj(t), e);
}
var aj = sj;
function ij(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var oj = ij, lj = yt, cj = No, uj = oj, dj = Object.prototype, fj = dj.hasOwnProperty;
function pj(e) {
  if (!lj(e))
    return uj(e);
  var t = cj(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !fj.call(e, n)) || r.push(n);
  return r;
}
var hj = pj, mj = rp, gj = hj, yj = Kr;
function vj(e) {
  return yj(e) ? mj(e, !0) : gj(e);
}
var Gr = vj, bj = Bn, $j = Gr;
function wj(e, t) {
  return e && bj(t, $j(t), e);
}
var _j = wj, Rs = { exports: {} };
Rs.exports;
(function(e, t) {
  var r = gt, n = t && !t.nodeType && t, s = n && !0 && e && !e.nodeType && e, a = s && s.exports === n, i = a ? r.Buffer : void 0, o = i ? i.allocUnsafe : void 0;
  function l(u, c) {
    if (c)
      return u.slice();
    var f = u.length, m = o ? o(f) : new u.constructor(f);
    return u.copy(m), m;
  }
  e.exports = l;
})(Rs, Rs.exports);
var sp = Rs.exports;
function xj(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var Ao = xj;
function Sj(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, s = 0, a = []; ++r < n; ) {
    var i = e[r];
    t(i, r, e) && (a[s++] = i);
  }
  return a;
}
var jj = Sj;
function Ej() {
  return [];
}
var ap = Ej, Oj = jj, Nj = ap, Aj = Object.prototype, Pj = Aj.propertyIsEnumerable, Jc = Object.getOwnPropertySymbols, Cj = Jc ? function(e) {
  return e == null ? [] : (e = Object(e), Oj(Jc(e), function(t) {
    return Pj.call(e, t);
  }));
} : Nj, Po = Cj, Tj = Bn, Ij = Po;
function Fj(e, t) {
  return Tj(e, Ij(e), t);
}
var kj = Fj;
function Dj(e, t) {
  for (var r = -1, n = t.length, s = e.length; ++r < n; )
    e[s + r] = t[r];
  return e;
}
var Co = Dj, Rj = np, Mj = Rj(Object.getPrototypeOf, Object), To = Mj, Lj = Co, Uj = To, Wj = Po, Vj = ap, zj = Object.getOwnPropertySymbols, Bj = zj ? function(e) {
  for (var t = []; e; )
    Lj(t, Wj(e)), e = Uj(e);
  return t;
} : Vj, ip = Bj, qj = Bn, Kj = ip;
function Gj(e, t) {
  return qj(e, Kj(e), t);
}
var Hj = Gj, Jj = Co, Yj = Ke;
function Zj(e, t, r) {
  var n = t(e);
  return Yj(e) ? n : Jj(n, r(e));
}
var op = Zj, Xj = op, Qj = Po, e2 = qn;
function t2(e) {
  return Xj(e, e2, Qj);
}
var lp = t2, r2 = op, n2 = ip, s2 = Gr;
function a2(e) {
  return r2(e, s2, n2);
}
var i2 = a2, o2 = cr, l2 = gt, c2 = o2(l2, "DataView"), u2 = c2, d2 = cr, f2 = gt, p2 = d2(f2, "Promise"), h2 = p2, m2 = cr, g2 = gt, y2 = m2(g2, "Set"), cp = y2, v2 = cr, b2 = gt, $2 = v2(b2, "WeakMap"), w2 = $2, Ei = u2, Oi = wo, Ni = h2, Ai = cp, Pi = w2, up = lr, Hr = Zf, Yc = "[object Map]", _2 = "[object Object]", Zc = "[object Promise]", Xc = "[object Set]", Qc = "[object WeakMap]", eu = "[object DataView]", x2 = Hr(Ei), S2 = Hr(Oi), j2 = Hr(Ni), E2 = Hr(Ai), O2 = Hr(Pi), Ht = up;
(Ei && Ht(new Ei(new ArrayBuffer(1))) != eu || Oi && Ht(new Oi()) != Yc || Ni && Ht(Ni.resolve()) != Zc || Ai && Ht(new Ai()) != Xc || Pi && Ht(new Pi()) != Qc) && (Ht = function(e) {
  var t = up(e), r = t == _2 ? e.constructor : void 0, n = r ? Hr(r) : "";
  if (n)
    switch (n) {
      case x2:
        return eu;
      case S2:
        return Yc;
      case j2:
        return Zc;
      case E2:
        return Xc;
      case O2:
        return Qc;
    }
  return t;
});
var ma = Ht, N2 = Object.prototype, A2 = N2.hasOwnProperty;
function P2(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && A2.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var C2 = P2, T2 = gt, I2 = T2.Uint8Array, dp = I2, tu = dp;
function F2(e) {
  var t = new e.constructor(e.byteLength);
  return new tu(t).set(new tu(e)), t;
}
var Io = F2, k2 = Io;
function D2(e, t) {
  var r = t ? k2(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var R2 = D2, M2 = /\w*$/;
function L2(e) {
  var t = new e.constructor(e.source, M2.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var U2 = L2, ru = Vr, nu = ru ? ru.prototype : void 0, su = nu ? nu.valueOf : void 0;
function W2(e) {
  return su ? Object(su.call(e)) : {};
}
var V2 = W2, z2 = Io;
function B2(e, t) {
  var r = t ? z2(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var fp = B2, q2 = Io, K2 = R2, G2 = U2, H2 = V2, J2 = fp, Y2 = "[object Boolean]", Z2 = "[object Date]", X2 = "[object Map]", Q2 = "[object Number]", eE = "[object RegExp]", tE = "[object Set]", rE = "[object String]", nE = "[object Symbol]", sE = "[object ArrayBuffer]", aE = "[object DataView]", iE = "[object Float32Array]", oE = "[object Float64Array]", lE = "[object Int8Array]", cE = "[object Int16Array]", uE = "[object Int32Array]", dE = "[object Uint8Array]", fE = "[object Uint8ClampedArray]", pE = "[object Uint16Array]", hE = "[object Uint32Array]";
function mE(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case sE:
      return q2(e);
    case Y2:
    case Z2:
      return new n(+e);
    case aE:
      return K2(e, r);
    case iE:
    case oE:
    case lE:
    case cE:
    case uE:
    case dE:
    case fE:
    case pE:
    case hE:
      return J2(e, r);
    case X2:
      return new n();
    case Q2:
    case rE:
      return new n(e);
    case eE:
      return G2(e);
    case tE:
      return new n();
    case nE:
      return H2(e);
  }
}
var gE = mE, yE = yt, au = Object.create, vE = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!yE(t))
      return {};
    if (au)
      return au(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}(), bE = vE, $E = bE, wE = To, _E = No;
function xE(e) {
  return typeof e.constructor == "function" && !_E(e) ? $E(wE(e)) : {};
}
var pp = xE, SE = ma, jE = vt, EE = "[object Map]";
function OE(e) {
  return jE(e) && SE(e) == EE;
}
var NE = OE, AE = NE, PE = ur, iu = Eo, ou = iu && iu.isMap, CE = ou ? PE(ou) : AE, TE = CE, IE = ma, FE = vt, kE = "[object Set]";
function DE(e) {
  return FE(e) && IE(e) == kE;
}
var RE = DE, ME = RE, LE = ur, lu = Eo, cu = lu && lu.isSet, UE = cu ? LE(cu) : ME, WE = UE, VE = fa, zE = Xf, BE = ep, qE = aj, KE = _j, GE = sp, HE = Ao, JE = kj, YE = Hj, ZE = lp, XE = i2, QE = ma, eO = C2, tO = gE, rO = pp, nO = Ke, sO = ha, aO = TE, iO = yt, oO = WE, lO = qn, cO = Gr, uO = 1, dO = 2, fO = 4, hp = "[object Arguments]", pO = "[object Array]", hO = "[object Boolean]", mO = "[object Date]", gO = "[object Error]", mp = "[object Function]", yO = "[object GeneratorFunction]", vO = "[object Map]", bO = "[object Number]", gp = "[object Object]", $O = "[object RegExp]", wO = "[object Set]", _O = "[object String]", xO = "[object Symbol]", SO = "[object WeakMap]", jO = "[object ArrayBuffer]", EO = "[object DataView]", OO = "[object Float32Array]", NO = "[object Float64Array]", AO = "[object Int8Array]", PO = "[object Int16Array]", CO = "[object Int32Array]", TO = "[object Uint8Array]", IO = "[object Uint8ClampedArray]", FO = "[object Uint16Array]", kO = "[object Uint32Array]", ye = {};
ye[hp] = ye[pO] = ye[jO] = ye[EO] = ye[hO] = ye[mO] = ye[OO] = ye[NO] = ye[AO] = ye[PO] = ye[CO] = ye[vO] = ye[bO] = ye[gp] = ye[$O] = ye[wO] = ye[_O] = ye[xO] = ye[TO] = ye[IO] = ye[FO] = ye[kO] = !0;
ye[gO] = ye[mp] = ye[SO] = !1;
function ys(e, t, r, n, s, a) {
  var i, o = t & uO, l = t & dO, u = t & fO;
  if (r && (i = s ? r(e, n, s, a) : r(e)), i !== void 0)
    return i;
  if (!iO(e))
    return e;
  var c = nO(e);
  if (c) {
    if (i = eO(e), !o)
      return HE(e, i);
  } else {
    var f = QE(e), m = f == mp || f == yO;
    if (sO(e))
      return GE(e, o);
    if (f == gp || f == hp || m && !s) {
      if (i = l || m ? {} : rO(e), !o)
        return l ? YE(e, KE(i, e)) : JE(e, qE(i, e));
    } else {
      if (!ye[f])
        return s ? e : {};
      i = tO(e, f, o);
    }
  }
  a || (a = new VE());
  var h = a.get(e);
  if (h)
    return h;
  a.set(e, i), oO(e) ? e.forEach(function(y) {
    i.add(ys(y, t, r, y, e, a));
  }) : aO(e) && e.forEach(function(y, p) {
    i.set(p, ys(y, t, r, p, e, a));
  });
  var g = u ? l ? XE : ZE : l ? cO : lO, b = c ? void 0 : g(e);
  return zE(b || e, function(y, p) {
    b && (p = y, y = e[p]), BE(i, p, ys(y, t, r, p, e, a));
  }), i;
}
var DO = ys, RO = DO, MO = 1, LO = 4;
function UO(e) {
  return RO(e, MO | LO);
}
var WO = UO, VO = "__lodash_hash_undefined__";
function zO(e) {
  return this.__data__.set(e, VO), this;
}
var BO = zO;
function qO(e) {
  return this.__data__.has(e);
}
var KO = qO, GO = _o, HO = BO, JO = KO;
function Ms(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new GO(); ++t < r; )
    this.add(e[t]);
}
Ms.prototype.add = Ms.prototype.push = HO;
Ms.prototype.has = JO;
var ga = Ms;
function YO(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
var ZO = YO;
function XO(e, t) {
  return e.has(t);
}
var ya = XO, QO = ga, eN = ZO, tN = ya, rN = 1, nN = 2;
function sN(e, t, r, n, s, a) {
  var i = r & rN, o = e.length, l = t.length;
  if (o != l && !(i && l > o))
    return !1;
  var u = a.get(e), c = a.get(t);
  if (u && c)
    return u == t && c == e;
  var f = -1, m = !0, h = r & nN ? new QO() : void 0;
  for (a.set(e, t), a.set(t, e); ++f < o; ) {
    var g = e[f], b = t[f];
    if (n)
      var y = i ? n(b, g, f, t, e, a) : n(g, b, f, e, t, a);
    if (y !== void 0) {
      if (y)
        continue;
      m = !1;
      break;
    }
    if (h) {
      if (!eN(t, function(p, v) {
        if (!tN(h, v) && (g === p || s(g, p, r, n, a)))
          return h.push(v);
      })) {
        m = !1;
        break;
      }
    } else if (!(g === b || s(g, b, r, n, a))) {
      m = !1;
      break;
    }
  }
  return a.delete(e), a.delete(t), m;
}
var yp = sN;
function aN(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n, s) {
    r[++t] = [s, n];
  }), r;
}
var iN = aN;
function oN(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n) {
    r[++t] = n;
  }), r;
}
var Fo = oN, uu = Vr, du = dp, lN = Ur, cN = yp, uN = iN, dN = Fo, fN = 1, pN = 2, hN = "[object Boolean]", mN = "[object Date]", gN = "[object Error]", yN = "[object Map]", vN = "[object Number]", bN = "[object RegExp]", $N = "[object Set]", wN = "[object String]", _N = "[object Symbol]", xN = "[object ArrayBuffer]", SN = "[object DataView]", fu = uu ? uu.prototype : void 0, Ja = fu ? fu.valueOf : void 0;
function jN(e, t, r, n, s, a, i) {
  switch (r) {
    case SN:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case xN:
      return !(e.byteLength != t.byteLength || !a(new du(e), new du(t)));
    case hN:
    case mN:
    case vN:
      return lN(+e, +t);
    case gN:
      return e.name == t.name && e.message == t.message;
    case bN:
    case wN:
      return e == t + "";
    case yN:
      var o = uN;
    case $N:
      var l = n & fN;
      if (o || (o = dN), e.size != t.size && !l)
        return !1;
      var u = i.get(e);
      if (u)
        return u == t;
      n |= pN, i.set(e, t);
      var c = cN(o(e), o(t), n, s, a, i);
      return i.delete(e), c;
    case _N:
      if (Ja)
        return Ja.call(e) == Ja.call(t);
  }
  return !1;
}
var EN = jN, pu = lp, ON = 1, NN = Object.prototype, AN = NN.hasOwnProperty;
function PN(e, t, r, n, s, a) {
  var i = r & ON, o = pu(e), l = o.length, u = pu(t), c = u.length;
  if (l != c && !i)
    return !1;
  for (var f = l; f--; ) {
    var m = o[f];
    if (!(i ? m in t : AN.call(t, m)))
      return !1;
  }
  var h = a.get(e), g = a.get(t);
  if (h && g)
    return h == t && g == e;
  var b = !0;
  a.set(e, t), a.set(t, e);
  for (var y = i; ++f < l; ) {
    m = o[f];
    var p = e[m], v = t[m];
    if (n)
      var $ = i ? n(v, p, m, t, e, a) : n(p, v, m, e, t, a);
    if (!($ === void 0 ? p === v || s(p, v, r, n, a) : $)) {
      b = !1;
      break;
    }
    y || (y = m == "constructor");
  }
  if (b && !y) {
    var _ = e.constructor, x = t.constructor;
    _ != x && "constructor" in e && "constructor" in t && !(typeof _ == "function" && _ instanceof _ && typeof x == "function" && x instanceof x) && (b = !1);
  }
  return a.delete(e), a.delete(t), b;
}
var CN = PN, Ya = fa, TN = yp, IN = EN, FN = CN, hu = ma, mu = Ke, gu = ha, kN = Oo, DN = 1, yu = "[object Arguments]", vu = "[object Array]", ns = "[object Object]", RN = Object.prototype, bu = RN.hasOwnProperty;
function MN(e, t, r, n, s, a) {
  var i = mu(e), o = mu(t), l = i ? vu : hu(e), u = o ? vu : hu(t);
  l = l == yu ? ns : l, u = u == yu ? ns : u;
  var c = l == ns, f = u == ns, m = l == u;
  if (m && gu(e)) {
    if (!gu(t))
      return !1;
    i = !0, c = !1;
  }
  if (m && !c)
    return a || (a = new Ya()), i || kN(e) ? TN(e, t, r, n, s, a) : IN(e, t, l, r, n, s, a);
  if (!(r & DN)) {
    var h = c && bu.call(e, "__wrapped__"), g = f && bu.call(t, "__wrapped__");
    if (h || g) {
      var b = h ? e.value() : e, y = g ? t.value() : t;
      return a || (a = new Ya()), s(b, y, r, n, a);
    }
  }
  return m ? (a || (a = new Ya()), FN(e, t, r, n, s, a)) : !1;
}
var LN = MN, UN = LN, $u = vt;
function vp(e, t, r, n, s) {
  return e === t ? !0 : e == null || t == null || !$u(e) && !$u(t) ? e !== e && t !== t : UN(e, t, r, n, vp, s);
}
var ko = vp, WN = ko;
function VN(e, t) {
  return WN(e, t);
}
var bp = VN, wu = Vr, zN = pa, BN = Ke, _u = wu ? wu.isConcatSpreadable : void 0;
function qN(e) {
  return BN(e) || zN(e) || !!(_u && e && e[_u]);
}
var KN = qN, GN = Co, HN = KN;
function $p(e, t, r, n, s) {
  var a = -1, i = e.length;
  for (r || (r = HN), s || (s = []); ++a < i; ) {
    var o = e[a];
    t > 0 && r(o) ? t > 1 ? $p(o, t - 1, r, n, s) : GN(s, o) : n || (s[s.length] = o);
  }
  return s;
}
var Do = $p;
function JN(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, s = Array(n); ++r < n; )
    s[r] = t(e[r], r, e);
  return s;
}
var dr = JN, YN = lr, ZN = vt, XN = "[object Symbol]";
function QN(e) {
  return typeof e == "symbol" || ZN(e) && YN(e) == XN;
}
var va = QN, eA = Ke, tA = va, rA = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, nA = /^\w*$/;
function sA(e, t) {
  if (eA(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || tA(e) ? !0 : nA.test(e) || !rA.test(e) || t != null && e in Object(t);
}
var Ro = sA, wp = _o, aA = "Expected a function";
function Mo(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(aA);
  var r = function() {
    var n = arguments, s = t ? t.apply(this, n) : n[0], a = r.cache;
    if (a.has(s))
      return a.get(s);
    var i = e.apply(this, n);
    return r.cache = a.set(s, i) || a, i;
  };
  return r.cache = new (Mo.Cache || wp)(), r;
}
Mo.Cache = wp;
var iA = Mo, oA = iA, lA = 500;
function cA(e) {
  var t = oA(e, function(n) {
    return r.size === lA && r.clear(), n;
  }), r = t.cache;
  return t;
}
var uA = cA, dA = uA, fA = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, pA = /\\(\\)?/g, hA = dA(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(fA, function(r, n, s, a) {
    t.push(s ? a.replace(pA, "$1") : n || r);
  }), t;
}), mA = hA, xu = Vr, gA = dr, yA = Ke, vA = va, Su = xu ? xu.prototype : void 0, ju = Su ? Su.toString : void 0;
function _p(e) {
  if (typeof e == "string")
    return e;
  if (yA(e))
    return gA(e, _p) + "";
  if (vA(e))
    return ju ? ju.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
var bA = _p, $A = bA;
function wA(e) {
  return e == null ? "" : $A(e);
}
var _A = wA, xA = Ke, SA = Ro, jA = mA, EA = _A;
function OA(e, t) {
  return xA(e) ? e : SA(e, t) ? [e] : jA(EA(e));
}
var xp = OA, NA = va;
function AA(e) {
  if (typeof e == "string" || NA(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
var ba = AA, PA = xp, CA = ba;
function TA(e, t) {
  t = PA(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[CA(t[r++])];
  return r && r == n ? e : void 0;
}
var Lo = TA, IA = fa, FA = ko, kA = 1, DA = 2;
function RA(e, t, r, n) {
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
    var l = o[0], u = e[l], c = o[1];
    if (i && o[2]) {
      if (u === void 0 && !(l in e))
        return !1;
    } else {
      var f = new IA();
      if (n)
        var m = n(u, c, l, e, t, f);
      if (!(m === void 0 ? FA(c, u, kA | DA, n, f) : m))
        return !1;
    }
  }
  return !0;
}
var MA = RA, LA = yt;
function UA(e) {
  return e === e && !LA(e);
}
var Sp = UA, WA = Sp, VA = qn;
function zA(e) {
  for (var t = VA(e), r = t.length; r--; ) {
    var n = t[r], s = e[n];
    t[r] = [n, s, WA(s)];
  }
  return t;
}
var BA = zA;
function qA(e, t) {
  return function(r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
  };
}
var jp = qA, KA = MA, GA = BA, HA = jp;
function JA(e) {
  var t = GA(e);
  return t.length == 1 && t[0][2] ? HA(t[0][0], t[0][1]) : function(r) {
    return r === e || KA(r, e, t);
  };
}
var YA = JA, ZA = Lo;
function XA(e, t, r) {
  var n = e == null ? void 0 : ZA(e, t);
  return n === void 0 ? r : n;
}
var QA = XA;
function eP(e, t) {
  return e != null && t in Object(e);
}
var tP = eP, rP = xp, nP = pa, sP = Ke, aP = So, iP = jo, oP = ba;
function lP(e, t, r) {
  t = rP(t, e);
  for (var n = -1, s = t.length, a = !1; ++n < s; ) {
    var i = oP(t[n]);
    if (!(a = e != null && r(e, i)))
      break;
    e = e[i];
  }
  return a || ++n != s ? a : (s = e == null ? 0 : e.length, !!s && iP(s) && aP(i, s) && (sP(e) || nP(e)));
}
var cP = lP, uP = tP, dP = cP;
function fP(e, t) {
  return e != null && dP(e, t, uP);
}
var pP = fP, hP = ko, mP = QA, gP = pP, yP = Ro, vP = Sp, bP = jp, $P = ba, wP = 1, _P = 2;
function xP(e, t) {
  return yP(e) && vP(t) ? bP($P(e), t) : function(r) {
    var n = mP(r, e);
    return n === void 0 && n === t ? gP(r, e) : hP(t, n, wP | _P);
  };
}
var SP = xP;
function jP(e) {
  return e;
}
var Kn = jP;
function EP(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
var OP = EP, NP = Lo;
function AP(e) {
  return function(t) {
    return NP(t, e);
  };
}
var PP = AP, CP = OP, TP = PP, IP = Ro, FP = ba;
function kP(e) {
  return IP(e) ? CP(FP(e)) : TP(e);
}
var DP = kP, RP = YA, MP = SP, LP = Kn, UP = Ke, WP = DP;
function VP(e) {
  return typeof e == "function" ? e : e == null ? LP : typeof e == "object" ? UP(e) ? MP(e[0], e[1]) : RP(e) : WP(e);
}
var zP = VP;
function BP(e) {
  return function(t, r, n) {
    for (var s = -1, a = Object(t), i = n(t), o = i.length; o--; ) {
      var l = i[e ? o : ++s];
      if (r(a[l], l, a) === !1)
        break;
    }
    return t;
  };
}
var qP = BP, KP = qP, GP = KP(), Ep = GP, HP = Ep, JP = qn;
function YP(e, t) {
  return e && HP(e, t, JP);
}
var ZP = YP, XP = Kr;
function QP(e, t) {
  return function(r, n) {
    if (r == null)
      return r;
    if (!XP(r))
      return e(r, n);
    for (var s = r.length, a = t ? s : -1, i = Object(r); (t ? a-- : ++a < s) && n(i[a], a, i) !== !1; )
      ;
    return r;
  };
}
var eC = QP, tC = ZP, rC = eC, nC = rC(tC), Op = nC, sC = Op, aC = Kr;
function iC(e, t) {
  var r = -1, n = aC(e) ? Array(e.length) : [];
  return sC(e, function(s, a, i) {
    n[++r] = t(s, a, i);
  }), n;
}
var oC = iC;
function lC(e, t) {
  var r = e.length;
  for (e.sort(t); r--; )
    e[r] = e[r].value;
  return e;
}
var cC = lC, Eu = va;
function uC(e, t) {
  if (e !== t) {
    var r = e !== void 0, n = e === null, s = e === e, a = Eu(e), i = t !== void 0, o = t === null, l = t === t, u = Eu(t);
    if (!o && !u && !a && e > t || a && i && l && !o && !u || n && i && l || !r && l || !s)
      return 1;
    if (!n && !a && !u && e < t || u && r && s && !n && !a || o && r && s || !i && s || !l)
      return -1;
  }
  return 0;
}
var dC = uC, fC = dC;
function pC(e, t, r) {
  for (var n = -1, s = e.criteria, a = t.criteria, i = s.length, o = r.length; ++n < i; ) {
    var l = fC(s[n], a[n]);
    if (l) {
      if (n >= o)
        return l;
      var u = r[n];
      return l * (u == "desc" ? -1 : 1);
    }
  }
  return e.index - t.index;
}
var hC = pC, Za = dr, mC = Lo, gC = zP, yC = oC, vC = cC, bC = ur, $C = hC, wC = Kn, _C = Ke;
function xC(e, t, r) {
  t.length ? t = Za(t, function(a) {
    return _C(a) ? function(i) {
      return mC(i, a.length === 1 ? a[0] : a);
    } : a;
  }) : t = [wC];
  var n = -1;
  t = Za(t, bC(gC));
  var s = yC(e, function(a, i, o) {
    var l = Za(t, function(u) {
      return u(a);
    });
    return { criteria: l, index: ++n, value: a };
  });
  return vC(s, function(a, i) {
    return $C(a, i, r);
  });
}
var SC = xC;
function jC(e, t, r) {
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
var Np = jC, EC = Np, Ou = Math.max;
function OC(e, t, r) {
  return t = Ou(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, s = -1, a = Ou(n.length - t, 0), i = Array(a); ++s < a; )
      i[s] = n[t + s];
    s = -1;
    for (var o = Array(t + 1); ++s < t; )
      o[s] = n[s];
    return o[t] = r(i), EC(e, this, o);
  };
}
var NC = OC;
function AC(e) {
  return function() {
    return e;
  };
}
var PC = AC, CC = PC, Nu = Qf, TC = Kn, IC = Nu ? function(e, t) {
  return Nu(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: CC(t),
    writable: !0
  });
} : TC, FC = IC, kC = 800, DC = 16, RC = Date.now;
function MC(e) {
  var t = 0, r = 0;
  return function() {
    var n = RC(), s = DC - (n - r);
    if (r = n, s > 0) {
      if (++t >= kC)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
var LC = MC, UC = FC, WC = LC, VC = WC(UC), zC = VC, BC = Kn, qC = NC, KC = zC;
function GC(e, t) {
  return KC(qC(e, t, BC), e + "");
}
var fr = GC, HC = Ur, JC = Kr, YC = So, ZC = yt;
function XC(e, t, r) {
  if (!ZC(r))
    return !1;
  var n = typeof t;
  return (n == "number" ? JC(r) && YC(t, r.length) : n == "string" && t in r) ? HC(r[t], e) : !1;
}
var Uo = XC, QC = Do, eT = SC, tT = fr, Au = Uo, rT = tT(function(e, t) {
  if (e == null)
    return [];
  var r = t.length;
  return r > 1 && Au(e, t[0], t[1]) ? t = [] : r > 2 && Au(t[0], t[1], t[2]) && (t = [t[0]]), eT(e, QC(t, 1), []);
}), Ap = rT;
function nT(e, t, r, n) {
  for (var s = e.length, a = r + (n ? 1 : -1); n ? a-- : ++a < s; )
    if (t(e[a], a, e))
      return a;
  return -1;
}
var sT = nT;
function aT(e) {
  return e !== e;
}
var iT = aT;
function oT(e, t, r) {
  for (var n = r - 1, s = e.length; ++n < s; )
    if (e[n] === t)
      return n;
  return -1;
}
var lT = oT, cT = sT, uT = iT, dT = lT;
function fT(e, t, r) {
  return t === t ? dT(e, t, r) : cT(e, uT, r);
}
var Pp = fT, pT = Pp;
function hT(e, t) {
  var r = e == null ? 0 : e.length;
  return !!r && pT(e, t, 0) > -1;
}
var Wo = hT;
function mT(e, t, r) {
  for (var n = -1, s = e == null ? 0 : e.length; ++n < s; )
    if (r(t, e[n]))
      return !0;
  return !1;
}
var Vo = mT;
function gT() {
}
var yT = gT, Xa = cp, vT = yT, bT = Fo, $T = 1 / 0, wT = Xa && 1 / bT(new Xa([, -0]))[1] == $T ? function(e) {
  return new Xa(e);
} : vT, _T = wT, xT = ga, ST = Wo, jT = Vo, ET = ya, OT = _T, NT = Fo, AT = 200;
function PT(e, t, r) {
  var n = -1, s = ST, a = e.length, i = !0, o = [], l = o;
  if (r)
    i = !1, s = jT;
  else if (a >= AT) {
    var u = t ? null : OT(e);
    if (u)
      return NT(u);
    i = !1, s = ET, l = new xT();
  } else
    l = t ? [] : o;
  e:
    for (; ++n < a; ) {
      var c = e[n], f = t ? t(c) : c;
      if (c = r || c !== 0 ? c : 0, i && f === f) {
        for (var m = l.length; m--; )
          if (l[m] === f)
            continue e;
        t && l.push(f), o.push(c);
      } else s(l, f, r) || (l !== o && l.push(f), o.push(c));
    }
  return o;
}
var Cp = PT, CT = Cp;
function TT(e) {
  return e && e.length ? CT(e) : [];
}
var zo = TT, IT = Cp;
function FT(e, t) {
  return t = typeof t == "function" ? t : void 0, e && e.length ? IT(e, void 0, t) : [];
}
var Bo = FT, kT = fr, DT = Ur, RT = Uo, MT = Gr, Tp = Object.prototype, LT = Tp.hasOwnProperty, UT = kT(function(e, t) {
  e = Object(e);
  var r = -1, n = t.length, s = n > 2 ? t[2] : void 0;
  for (s && RT(t[0], t[1], s) && (n = 1); ++r < n; )
    for (var a = t[r], i = MT(a), o = -1, l = i.length; ++o < l; ) {
      var u = i[o], c = e[u];
      (c === void 0 || DT(c, Tp[u]) && !LT.call(e, u)) && (e[u] = a[u]);
    }
  return e;
}), WT = UT, VT = ga, zT = Wo, BT = Vo, qT = dr, KT = ur, Pu = ya, GT = Math.min;
function HT(e, t, r) {
  for (var n = r ? BT : zT, s = e[0].length, a = e.length, i = a, o = Array(a), l = 1 / 0, u = []; i--; ) {
    var c = e[i];
    i && t && (c = qT(c, KT(t))), l = GT(c.length, l), o[i] = !r && (t || s >= 120 && c.length >= 120) ? new VT(i && c) : void 0;
  }
  c = e[0];
  var f = -1, m = o[0];
  e:
    for (; ++f < s && u.length < l; ) {
      var h = c[f], g = t ? t(h) : h;
      if (h = r || h !== 0 ? h : 0, !(m ? Pu(m, g) : n(u, g, r))) {
        for (i = a; --i; ) {
          var b = o[i];
          if (!(b ? Pu(b, g) : n(e[i], g, r)))
            continue e;
        }
        m && m.push(g), u.push(h);
      }
    }
  return u;
}
var Ip = HT, JT = Kr, YT = vt;
function ZT(e) {
  return YT(e) && JT(e);
}
var qo = ZT, XT = qo;
function QT(e) {
  return XT(e) ? e : [];
}
var Fp = QT;
function eI(e) {
  var t = e == null ? 0 : e.length;
  return t ? e[t - 1] : void 0;
}
var tI = eI, rI = dr, nI = Ip, sI = fr, aI = Fp, iI = tI, oI = sI(function(e) {
  var t = iI(e), r = rI(e, aI);
  return t = typeof t == "function" ? t : void 0, t && r.pop(), r.length && r[0] === e[0] ? nI(r, void 0, t) : [];
}), kp = oI, lI = lr, cI = To, uI = vt, dI = "[object Object]", fI = Function.prototype, pI = Object.prototype, Dp = fI.toString, hI = pI.hasOwnProperty, mI = Dp.call(Object);
function gI(e) {
  if (!uI(e) || lI(e) != dI)
    return !1;
  var t = cI(e);
  if (t === null)
    return !0;
  var r = hI.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && Dp.call(r) == mI;
}
var $a = gI, yI = lr, vI = vt, bI = "[object Boolean]";
function $I(e) {
  return e === !0 || e === !1 || vI(e) && yI(e) == bI;
}
var wI = $I, it = bp, _I = Ap, Ko = zo, Cu = Bo, xI = WT, SI = kp, Ls = $a, Qa = wI, Tu = (e) => Array.isArray(e) ? e : [e], Je = (e) => e === void 0, ss = (e) => Ls(e) || Array.isArray(e) ? Object.keys(e) : [], br = (e, t) => e.hasOwnProperty(t), Nr = (e) => _I(Ko(e)), Iu = (e) => Je(e) || Array.isArray(e) && e.length === 0, jI = (e, t, r, n) => t && br(t, r) && e && br(e, r) && n(e[r], t[r]), ei = (e, t) => Je(e) && t === 0 || Je(t) && e === 0 || it(e, t), EI = (e, t) => Je(e) && t === !1 || Je(t) && e === !1 || it(e, t), Fu = (e) => Je(e) || it(e, {}) || e === !0, as = (e) => Je(e) || it(e, {}), ku = (e) => Je(e) || Ls(e) || e === !0 || e === !1;
function Du(e, t) {
  return Iu(e) && Iu(t) ? !0 : it(Nr(e), Nr(t));
}
function OI(e, t) {
  return e = Tu(e), t = Tu(t), it(Nr(e), Nr(t));
}
function vs(e, t, r, n) {
  var s = Ko(ss(e).concat(ss(t)));
  return as(e) && as(t) ? !0 : as(e) && ss(t).length || as(t) && ss(e).length ? !1 : s.every(function(a) {
    var i = e[a], o = t[a];
    return Array.isArray(i) && Array.isArray(o) ? it(Nr(e), Nr(t)) : Array.isArray(i) && !Array.isArray(o) || Array.isArray(o) && !Array.isArray(i) ? !1 : jI(e, t, a, n);
  });
}
function NI(e, t, r, n) {
  return Ls(e) && Ls(t) ? n(e, t) : Array.isArray(e) && Array.isArray(t) ? vs(e, t, r, n) : it(e, t);
}
function ti(e, t, r, n) {
  var s = Cu(e, n), a = Cu(t, n), i = SI(s, a, n);
  return i.length === Math.max(s.length, a.length);
}
var AI = {
  title: it,
  uniqueItems: EI,
  minLength: ei,
  minItems: ei,
  minProperties: ei,
  required: Du,
  enum: Du,
  type: OI,
  items: NI,
  anyOf: ti,
  allOf: ti,
  oneOf: ti,
  properties: vs,
  patternProperties: vs,
  dependencies: vs
}, PI = [
  "properties",
  "patternProperties",
  "dependencies",
  "uniqueItems",
  "minLength",
  "minItems",
  "minProperties",
  "required"
], CI = ["additionalProperties", "additionalItems", "contains", "propertyNames", "not"];
function Ci(e, t, r) {
  if (r = xI(r, {
    ignore: []
  }), Fu(e) && Fu(t))
    return !0;
  if (!ku(e) || !ku(t))
    throw new Error("Either of the values are not a JSON schema.");
  if (e === t)
    return !0;
  if (Qa(e) && Qa(t))
    return e === t;
  if (e === void 0 && t === !1 || t === void 0 && e === !1 || Je(e) && !Je(t) || !Je(e) && Je(t))
    return !1;
  var n = Ko(Object.keys(e).concat(Object.keys(t)));
  if (r.ignore.length && (n = n.filter((a) => r.ignore.indexOf(a) === -1)), !n.length)
    return !0;
  function s(a, i) {
    return Ci(a, i, r);
  }
  return n.every(function(a) {
    var i = e[a], o = t[a];
    if (CI.indexOf(a) !== -1)
      return Ci(i, o, r);
    var l = AI[a];
    if (l || (l = it), it(i, o))
      return !0;
    if (PI.indexOf(a) === -1 && (!br(e, a) && br(t, a) || br(e, a) && !br(t, a)))
      return i === o;
    var u = l(i, o, a, s);
    if (!Qa(u))
      throw new Error("Comparer must return true or false");
    return u;
  });
}
var Go = Ci;
function TI(e) {
  return Object.prototype.toString.call(e) === "[object Array]";
}
var Ho = Array.isArray || TI;
function II(e) {
  return (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]") && e.valueOf() === e.valueOf();
}
var FI = II, kI = FI;
function DI(e) {
  return kI(e) && e % 1 === 0;
}
var RI = DI, MI = Ho, LI = RI;
function UI(e) {
  var t;
  if (!MI(e) || (t = e.length, !t))
    return !1;
  for (var r = 0; r < t; r++)
    if (!LI(e[r]))
      return !1;
  return !0;
}
var Rp = UI;
function WI(e) {
  return typeof e == "function";
}
var Mp = WI, VI = Ho, Ru = Rp, zI = Mp, is = Math.pow(2, 31) - 1;
function Mu(e, t) {
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
function Lu(e, t) {
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
function BI() {
  var e = arguments.length, t, r, n, s, a, i, o;
  for (t = new Array(e), o = 0; o < e; o++)
    t[o] = arguments[o];
  if (Ru(t)) {
    if (e === 2)
      return a = t[0], i = t[1], a < 0 && (a = -a), i < 0 && (i = -i), a <= is && i <= is ? Lu(a, i) : Mu(a, i);
    n = t;
  } else if (VI(t[0]))
    if (e > 1) {
      if (n = t[0], r = t[1], !zI(r))
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
  if (e < 3 && !Ru(n))
    throw new TypeError("gcd()::invalid input argument. Accessed array values must be integers. Value: `" + n + "`.");
  for (o = 0; o < s; o++)
    a = n[o], a < 0 && (n[o] = -a);
  for (a = n[0], o = 1; o < s; o++)
    i = n[o], i <= is && a <= is ? a = Lu(a, i) : a = Mu(a, i);
  return a;
}
var qI = BI, Uu = qI, KI = Ho, Wu = Rp, GI = Mp;
function HI() {
  var e = arguments.length, t, r, n, s, a, i, o;
  for (t = new Array(e), o = 0; o < e; o++)
    t[o] = arguments[o];
  if (Wu(t)) {
    if (e === 2)
      return a = t[0], i = t[1], a < 0 && (a = -a), i < 0 && (i = -i), a === 0 || i === 0 ? 0 : a / Uu(a, i) * i;
    n = t;
  } else if (KI(t[0]))
    if (e > 1) {
      if (n = t[0], r = t[1], !GI(r))
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
  if (e < 3 && !Wu(n))
    throw new TypeError("lcm()::invalid input argument. Accessed array values must be integers. Value: `" + n + "`.");
  for (o = 0; o < s; o++)
    a = n[o], a < 0 && (n[o] = -a);
  for (a = n[0], o = 1; o < s; o++) {
    if (i = n[o], a === 0 || i === 0)
      return 0;
    a = a / Uu(a, i) * i;
  }
  return a;
}
var JI = HI, YI = xo, ZI = Ur;
function XI(e, t, r) {
  (r !== void 0 && !ZI(e[t], r) || r === void 0 && !(t in e)) && YI(e, t, r);
}
var Lp = XI;
function QI(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
var Up = QI, eF = Bn, tF = Gr;
function rF(e) {
  return eF(e, tF(e));
}
var nF = rF, Vu = Lp, sF = sp, aF = fp, iF = Ao, oF = pp, zu = pa, Bu = Ke, lF = qo, cF = ha, uF = $o, dF = yt, fF = $a, pF = Oo, qu = Up, hF = nF;
function mF(e, t, r, n, s, a, i) {
  var o = qu(e, r), l = qu(t, r), u = i.get(l);
  if (u) {
    Vu(e, r, u);
    return;
  }
  var c = a ? a(o, l, r + "", e, t, i) : void 0, f = c === void 0;
  if (f) {
    var m = Bu(l), h = !m && cF(l), g = !m && !h && pF(l);
    c = l, m || h || g ? Bu(o) ? c = o : lF(o) ? c = iF(o) : h ? (f = !1, c = sF(l, !0)) : g ? (f = !1, c = aF(l, !0)) : c = [] : fF(l) || zu(l) ? (c = o, zu(o) ? c = hF(o) : (!dF(o) || uF(o)) && (c = oF(l))) : f = !1;
  }
  f && (i.set(l, c), s(c, l, n, a, i), i.delete(l)), Vu(e, r, c);
}
var gF = mF, yF = fa, vF = Lp, bF = Ep, $F = gF, wF = yt, _F = Gr, xF = Up;
function Wp(e, t, r, n, s) {
  e !== t && bF(t, function(a, i) {
    if (s || (s = new yF()), wF(a))
      $F(e, t, i, r, Wp, n, s);
    else {
      var o = n ? n(xF(e, i), a, i + "", e, t, s) : void 0;
      o === void 0 && (o = a), vF(e, i, o);
    }
  }, _F);
}
var Vp = Wp, SF = Vp, Ku = yt;
function zp(e, t, r, n, s, a) {
  return Ku(e) && Ku(t) && (a.set(t, e), SF(e, t, void 0, zp, a), a.delete(t)), e;
}
var jF = zp, EF = fr, OF = Uo;
function NF(e) {
  return EF(function(t, r) {
    var n = -1, s = r.length, a = s > 1 ? r[s - 1] : void 0, i = s > 2 ? r[2] : void 0;
    for (a = e.length > 3 && typeof a == "function" ? (s--, a) : void 0, i && OF(r[0], r[1], i) && (a = s < 3 ? void 0 : a, s = 1), t = Object(t); ++n < s; ) {
      var o = r[n];
      o && e(t, o, n, a);
    }
    return t;
  });
}
var AF = NF, PF = Vp, CF = AF, TF = CF(function(e, t, r, n) {
  PF(e, t, r, n);
}), IF = TF, FF = Np, kF = fr, DF = jF, RF = IF, MF = kF(function(e) {
  return e.push(void 0, DF), FF(RF, void 0, e);
}), LF = MF, UF = Do;
function WF(e) {
  var t = e == null ? 0 : e.length;
  return t ? UF(e, 1) : [];
}
var Bp = WF, VF = Do, zF = 1 / 0;
function BF(e) {
  var t = e == null ? 0 : e.length;
  return t ? VF(e, zF) : [];
}
var qp = BF, qF = dr, KF = Ip, GF = fr, HF = Fp, JF = GF(function(e) {
  var t = qF(e, HF);
  return t.length && t[0] === e[0] ? KF(t) : [];
}), YF = JF;
function ZF(e, t, r, n) {
  for (var s = r - 1, a = e.length; ++s < a; )
    if (n(e[s], t))
      return s;
  return -1;
}
var XF = ZF, QF = dr, ek = Pp, tk = XF, rk = ur, nk = Ao, sk = Array.prototype, Gu = sk.splice;
function ak(e, t, r, n) {
  var s = n ? tk : ek, a = -1, i = t.length, o = e;
  for (e === t && (t = nk(t)), r && (o = QF(e, rk(r))); ++a < i; )
    for (var l = 0, u = t[a], c = r ? r(u) : u; (l = s(o, c, l, n)) > -1; )
      o !== e && Gu.call(o, l, 1), Gu.call(e, l, 1);
  return e;
}
var ik = ak, ok = ik;
function lk(e, t) {
  return e && e.length && t && t.length ? ok(e, t) : e;
}
var ck = lk, uk = Kn;
function dk(e) {
  return typeof e == "function" ? e : uk;
}
var fk = dk, pk = Xf, hk = Op, mk = fk, gk = Ke;
function yk(e, t) {
  var r = gk(e) ? pk : hk;
  return r(e, mk(t));
}
var Kp = yk, vk = ga, bk = Wo, $k = Vo, wk = dr, _k = ur, xk = ya, Sk = 200;
function jk(e, t, r, n) {
  var s = -1, a = bk, i = !0, o = e.length, l = [], u = t.length;
  if (!o)
    return l;
  r && (t = wk(t, _k(r))), n ? (a = $k, i = !1) : t.length >= Sk && (a = xk, i = !1, t = new vk(t));
  e:
    for (; ++s < o; ) {
      var c = e[s], f = r == null ? c : r(c);
      if (c = n || c !== 0 ? c : 0, i && f === f) {
        for (var m = u; m--; )
          if (t[m] === f)
            continue e;
        l.push(c);
      } else a(t, f, n) || l.push(c);
    }
  return l;
}
var Ek = jk, Ok = Ek, Nk = fr, Ak = qo, Pk = Nk(function(e, t) {
  return Ak(e) ? Ok(e, t) : [];
}), Ck = Pk;
const Tk = Bp, Ik = qp, Gp = $a, Fk = zo, kk = Bo, Dk = Ck;
function Rk(e) {
  for (const t in e)
    Hp(e, t) && Vk(e[t]) && delete e[t];
  return e;
}
const Mk = (e) => Fk(Ik(e.map(Jo))), Lk = (e, t) => e.map((r) => r && r[t]), Hp = (e, t) => Object.prototype.hasOwnProperty.call(e, t), Jo = (e) => Gp(e) || Array.isArray(e) ? Object.keys(e) : [], Uk = (e) => e !== void 0, Wk = (e) => Gp(e) || e === !0 || e === !1, Vk = (e) => !Jo(e).length && e !== !1 && e !== !0, zk = (e, ...t) => Dk.apply(null, [e].concat(Tk(t)));
var Jp = {
  allUniqueKeys: Mk,
  deleteUndefinedProps: Rk,
  getValues: Lk,
  has: Hp,
  isSchema: Wk,
  keys: Jo,
  notUndefined: Uk,
  uniqWith: kk,
  withoutArr: zk
};
const Bk = Go, qk = Kp, {
  allUniqueKeys: Kk,
  deleteUndefinedProps: Gk,
  getValues: Hk,
  keys: sn,
  notUndefined: Jk,
  uniqWith: Yk,
  withoutArr: Hu
} = Jp;
function Zk(e) {
  qk(e, function(t, r) {
    t === !1 && delete e[r];
  });
}
function Ju(e, t) {
  return Kk(e).reduce(function(n, s) {
    const a = Hk(e, s), i = Yk(a.filter(Jk), Bk);
    return n[s] = t(i, s), n;
  }, {});
}
var Xk = {
  keywords: ["properties", "patternProperties", "additionalProperties"],
  resolver(e, t, r, n) {
    n.ignoreAdditionalProperties || (e.forEach(function(a) {
      const i = e.filter((c) => c !== a), o = sn(a.properties), u = sn(a.patternProperties).map((c) => new RegExp(c));
      i.forEach(function(c) {
        const f = sn(c.properties), m = f.filter((g) => u.some((b) => b.test(g)));
        Hu(f, o, m).forEach(function(g) {
          c.properties[g] = r.properties([
            c.properties[g],
            a.additionalProperties
          ], g);
        });
      });
    }), e.forEach(function(a) {
      const i = e.filter((l) => l !== a), o = sn(a.patternProperties);
      a.additionalProperties === !1 && i.forEach(function(l) {
        const u = sn(l.patternProperties);
        Hu(u, o).forEach((f) => delete l.patternProperties[f]);
      });
    }));
    const s = {
      additionalProperties: r.additionalProperties(e.map((a) => a.additionalProperties)),
      patternProperties: Ju(e.map((a) => a.patternProperties), r.patternProperties),
      properties: Ju(e.map((a) => a.properties), r.properties)
    };
    return s.additionalProperties === !1 && Zk(s.properties), Gk(s);
  }
};
const Qk = Go, eD = Kp, {
  allUniqueKeys: tD,
  deleteUndefinedProps: rD,
  has: nD,
  isSchema: Yp,
  notUndefined: Zp,
  uniqWith: sD
} = Jp;
function aD(e) {
  eD(e, function(t, r) {
    t === !1 && e.splice(r, 1);
  });
}
function iD(e, t) {
  return e.map(function(r) {
    if (r)
      if (Array.isArray(r.items)) {
        const n = r.items[t];
        if (Yp(n))
          return n;
        if (nD(r, "additionalItems"))
          return r.additionalItems;
      } else
        return r.items;
  });
}
function oD(e) {
  return e.map(function(t) {
    if (t)
      return Array.isArray(t.items) ? t.additionalItems : t.items;
  });
}
function lD(e, t, r) {
  return tD(r).reduce(function(s, a) {
    const i = iD(e, a), o = sD(i.filter(Zp), Qk);
    return s[a] = t(o, a), s;
  }, []);
}
var cD = {
  keywords: ["items", "additionalItems"],
  resolver(e, t, r) {
    const n = e.map((o) => o.items), s = n.filter(Zp), a = {};
    s.every(Yp) ? a.items = r.items(n) : a.items = lD(e, r.items, n);
    let i;
    return s.every(Array.isArray) ? i = e.map((o) => o.additionalItems) : s.some(Array.isArray) && (i = oD(e)), i && (a.additionalItems = r.additionalItems(i)), a.additionalItems === !1 && Array.isArray(a.items) && aD(a.items), rD(a);
  }
};
const Xp = WO, Us = Go, uD = JI, dD = LF, Qp = Bp, Yo = qp, fD = YF, pD = kp, Ti = bp, Ar = $a, hD = ck, eh = Ap, Zo = zo, wr = Bo, th = Xk, rh = cD, os = (e, t) => e.indexOf(t) !== -1, mD = (e) => Ar(e) || e === !0 || e === !1, gD = (e) => e === !1, nh = (e) => e === !0, wa = (e, t, r) => r(e), sh = (e) => eh(Zo(Yo(e))), Ws = (e) => e !== void 0, ah = (e) => Zo(Yo(e.map(_D))), Jr = (e) => e[0], yD = (e) => sh(e), Gn = (e) => Math.max.apply(Math, e), Hn = (e) => Math.min.apply(Math, e), vD = (e) => e.some(nh), bD = (e) => wr(Qp(e), Ti);
function $D(e) {
  return function(t, r) {
    return Us({
      [e]: t
    }, { [e]: r });
  };
}
function ih(e) {
  let { allOf: t = [], ...r } = e;
  return r = Ar(e) ? r : e, [r, ...t.map(ih)];
}
function oh(e, t) {
  return e.map((r) => r && r[t]);
}
function wD(e, t) {
  return e.map(function(r, n) {
    try {
      return t(r, n);
    } catch {
      return;
    }
  }).filter(Ws);
}
function _D(e) {
  return Ar(e) || Array.isArray(e) ? Object.keys(e) : [];
}
function Ii(e, t) {
  if (t = t || [], !e.length)
    return t;
  const r = e.slice(0).shift(), n = e.slice(1);
  return t.length ? Ii(n, Qp(t.map((s) => r.map((a) => [a].concat(s))))) : Ii(n, r.map((s) => s));
}
function lh(e, t) {
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
function xD(e, t, r, n, s, a) {
  if (e.length) {
    const i = s.complexResolvers[t];
    if (!i || !i.resolver)
      throw new Error("No resolver found for " + t);
    const o = r.map((f) => e.reduce((m, h) => (f[h] !== void 0 && (m[h] = f[h]), m), {})), l = wr(o, Us), u = i.keywords.reduce((f, m) => ({
      ...f,
      [m]: (h, g = []) => n(h, null, a.concat(m, g))
    }), {}), c = i.resolver(l, a.concat(t), u, s);
    return Ar(c) || lh(l, a.concat(t)), c;
  }
}
function SD(e) {
  return { required: e };
}
const jD = ["properties", "patternProperties", "definitions", "dependencies"], ED = ["anyOf", "oneOf"], OD = [
  "additionalProperties",
  "additionalItems",
  "contains",
  "propertyNames",
  "not",
  "items"
], ie = {
  type(e) {
    if (e.some(Array.isArray)) {
      const t = e.map(function(n) {
        return Array.isArray(n) ? n : [n];
      }), r = fD.apply(null, t);
      if (r.length === 1)
        return r[0];
      if (r.length > 1)
        return Zo(r);
    }
  },
  dependencies(e, t, r) {
    return ah(e).reduce(function(s, a) {
      const i = oh(e, a);
      let o = wr(i.filter(Ws), Ti);
      const l = o.filter(Array.isArray);
      if (l.length) {
        if (l.length === o.length)
          s[a] = sh(o);
        else {
          const u = o.filter(mD), c = l.map(SD);
          s[a] = r(u.concat(c), a);
        }
        return s;
      }
      return o = wr(o, Us), s[a] = r(o, a), s;
    }, {});
  },
  oneOf(e, t, r) {
    const n = Ii(Xp(e)), s = wD(n, r), a = wr(s, Us);
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
    return uD(t) / r;
  },
  enum(e) {
    const t = pD.apply(null, e.concat(Ti));
    if (t.length)
      return eh(t);
  }
};
ie.$id = Jr;
ie.$ref = Jr;
ie.$schema = Jr;
ie.additionalItems = wa;
ie.additionalProperties = wa;
ie.anyOf = ie.oneOf;
ie.contains = wa;
ie.default = Jr;
ie.definitions = ie.dependencies;
ie.description = Jr;
ie.examples = bD;
ie.exclusiveMaximum = Hn;
ie.exclusiveMinimum = Gn;
ie.items = rh;
ie.maximum = Hn;
ie.maxItems = Hn;
ie.maxLength = Hn;
ie.maxProperties = Hn;
ie.minimum = Gn;
ie.minItems = Gn;
ie.minLength = Gn;
ie.minProperties = Gn;
ie.properties = th;
ie.propertyNames = wa;
ie.required = yD;
ie.title = Jr;
ie.uniqueItems = vD;
const ND = {
  properties: th,
  items: rh
};
function Xo(e, t, r) {
  t = dD(t, {
    ignoreAdditionalProperties: !1,
    resolvers: ie,
    complexResolvers: ND,
    deep: !0
  });
  const n = Object.entries(t.complexResolvers);
  function s(o, l, u) {
    o = Xp(o.filter(Ws)), u = u || [];
    const c = Ar(l) ? l : {};
    if (!o.length)
      return;
    if (o.some(gD))
      return !1;
    if (o.every(nh))
      return !0;
    o = o.filter(Ar);
    const f = ah(o);
    if (t.deep && os(f, "allOf"))
      return Xo({
        allOf: o
      }, t);
    const m = n.map(([h, g]) => f.filter((b) => g.keywords.includes(b)));
    return m.forEach((h) => hD(f, h)), f.forEach(function(h) {
      const g = oh(o, h), b = wr(g.filter(Ws), $D(h));
      if (b.length === 1 && os(ED, h))
        c[h] = b[0].map((y) => s([y], y));
      else if (b.length === 1 && !os(jD, h) && !os(OD, h))
        c[h] = b[0];
      else {
        const y = t.resolvers[h] || t.resolvers.defaultResolver;
        if (!y) throw new Error("No resolver found for key " + h + ". You can provide a resolver for this keyword in the options, or provide a default resolver.");
        const p = (v, $ = []) => s(v, null, u.concat(h, $));
        c[h] = y(b, u.concat(h), p, t), c[h] === void 0 ? lh(b, u.concat(h)) : c[h] === void 0 && delete c[h];
      }
    }), n.reduce((h, [g, b], y) => ({
      ...h,
      ...xD(m[y], g, o, s, t, u)
    }), c);
  }
  const a = Yo(ih(e));
  return s(a);
}
Xo.options = {
  resolvers: ie
};
var AD = Xo;
const PD = /* @__PURE__ */ kn(AD);
function Pr(e) {
  let t;
  const r = K(e, "discriminator.propertyName", void 0);
  return oa(r) ? t = r : r !== void 0 && console.warn(`Expecting discriminator to be a string, got "${typeof r}" instead`), t;
}
function En(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : e == null ? "null" : typeof e == "boolean" ? "boolean" : isNaN(e) ? typeof e == "object" ? "object" : "string" : "number";
}
var CD = bo(function(e) {
  return Hf(zn(e, 1, Fs, !0));
});
function Nt(e) {
  let { type: t } = e;
  return !t && e.const ? En(e.const) : !t && e.enum ? "string" : !t && (e.properties || e.additionalProperties) ? "object" : (Array.isArray(t) && (t.length === 2 && t.includes("null") ? t = t.find((r) => r !== "null") : t = t[0]), t);
}
function At(e, t) {
  const r = Object.assign({}, e);
  return Object.keys(t).reduce((n, s) => {
    const a = e ? e[s] : {}, i = t[s];
    return e && s in e && ae(i) ? n[s] = At(a, i) : e && t && (Nt(e) === "object" || Nt(t) === "object") && s === Yg && Array.isArray(a) && Array.isArray(i) ? n[s] = CD(a, i) : n[s] = i, n;
  }, r);
}
function qe(e, t, r = {}, n, s) {
  return dt(e, t, r, n, void 0, void 0, s)[0];
}
function TD(e, t, r, n, s, a, i) {
  const { if: o, then: l, else: u, ...c } = t, f = e.isValid(o, a || {}, r);
  let m = [c], h = [];
  if (n)
    l && typeof l != "boolean" && (h = h.concat(dt(e, l, r, a, n, s, i))), u && typeof u != "boolean" && (h = h.concat(dt(e, u, r, a, n, s, i)));
  else {
    const g = f ? l : u;
    g && typeof g != "boolean" && (h = h.concat(dt(e, g, r, a, n, s, i)));
  }
  return h.length && (m = h.map((g) => At(c, g))), m.flatMap((g) => dt(e, g, r, a, n, s, i));
}
function ch(e) {
  return e.reduce(
    (r, n) => n.length > 1 ? n.flatMap((s) => zf(r.length, (a) => [...r[a]].concat(s))) : (r.forEach((s) => s.push(n[0])), r),
    [[]]
    // Start with an empty list
  );
}
function ID(e, t, r, n, s, a, i) {
  const o = uh(e, t, r, n, s, a);
  if (o.length > 1 || o[0] !== t)
    return o;
  if (Js in t)
    return dh(e, t, r, n, s, a).flatMap((u) => dt(e, u, r, a, n, s, i));
  if (Dr in t && Array.isArray(t.allOf)) {
    const l = t.allOf.map((c) => dt(e, c, r, a, n, s, i));
    return ch(l).map((c) => ({
      ...t,
      allOf: c
    }));
  }
  return [t];
}
function uh(e, t, r, n, s, a, i) {
  const o = On(t, r, s);
  return o !== t ? dt(e, o, r, a, n, s, i) : [t];
}
function On(e, t, r) {
  if (!ae(e))
    return e;
  let n = e;
  if (Ae in n) {
    const { $ref: s, ...a } = n;
    if (r.includes(s))
      return n;
    r.push(s), n = { ...If(s, t), ...a };
  }
  if (Ee in n) {
    const s = [], a = c1(n[Ee], (i, o, l) => {
      const u = [...r];
      i[l] = On(o, t, u), s.push(u);
    }, {});
    h1(r, j1(g1(s))), n = { ...n, [Ee]: a };
  }
  return zt in n && !Array.isArray(n.items) && typeof n.items != "boolean" && (n = {
    ...n,
    items: On(n.items, t, r)
  }), _e(e, n) ? e : n;
}
function FD(e, t, r, n, s) {
  const a = {
    ...t,
    properties: { ...t.properties }
  }, i = n && ae(n) ? n : {};
  return Object.keys(i).forEach((o) => {
    if (o in a.properties)
      return;
    let l = {};
    typeof a.additionalProperties != "boolean" ? Ae in a.additionalProperties ? l = qe(e, { $ref: K(a.additionalProperties, [Ae]) }, r, i, s) : "type" in a.additionalProperties ? l = { ...a.additionalProperties } : nt in a.additionalProperties || Be in a.additionalProperties ? l = {
      type: "object",
      ...a.additionalProperties
    } : l = { type: En(K(i, [o])) } : l = { type: En(K(i, [o])) }, a.properties[o] = l, Ie(a.properties, [o, Mn], !0);
  }), a;
}
function dt(e, t, r, n, s = !1, a = [], i) {
  return ae(t) ? ID(e, t, r, s, a, n, i).flatMap((l) => {
    var u;
    let c = l;
    if (Hg in c)
      return TD(e, c, r, s, a, n, i);
    if (Dr in c) {
      if (s) {
        const { allOf: m, ...h } = c;
        return [...m, h];
      }
      try {
        const m = [], h = [];
        (u = c.allOf) === null || u === void 0 || u.forEach((g) => {
          typeof g == "object" && g.contains ? m.push(g) : h.push(g);
        }), m.length && (c = { ...c, allOf: h }), c = i ? i(c) : PD(c, {
          deep: !1
        }), m.length && (c.allOf = m);
      } catch (m) {
        console.warn(`could not merge subschemas in allOf:
`, m);
        const { allOf: h, ...g } = c;
        return g;
      }
    }
    return bi in c && c.additionalProperties !== !1 ? FD(e, c, r, n, i) : c;
  }) : [{}];
}
function kD(e, t, r, n, s) {
  let a;
  const { oneOf: i, anyOf: o, ...l } = t;
  if (Array.isArray(i) ? a = i : Array.isArray(o) && (a = o), a) {
    const u = s === void 0 && n ? {} : s, c = Pr(t);
    a = a.map((m) => On(m, r, []));
    const f = yo(e, u, a, r, c);
    if (n)
      return a.map((m) => At(l, m));
    t = At(l, a[f]);
  }
  return [t];
}
function dh(e, t, r, n, s, a, i) {
  const { dependencies: o, ...l } = t;
  return kD(e, l, r, n, a).flatMap((c) => fh(e, o, c, r, n, s, a, i));
}
function fh(e, t, r, n, s, a, i, o) {
  let l = [r];
  for (const u in t) {
    if (!s && K(i, [u]) === void 0 || r.properties && !(u in r.properties))
      continue;
    const [c, f] = mo(u, t);
    return Array.isArray(f) ? l[0] = DD(r, f) : ae(f) && (l = RD(e, r, n, u, f, s, a, i, o)), l.flatMap((m) => fh(e, c, m, n, s, a, i, o));
  }
  return l;
}
function DD(e, t) {
  if (!t)
    return e;
  const r = Array.isArray(e.required) ? Array.from(/* @__PURE__ */ new Set([...e.required, ...t])) : t;
  return { ...e, required: r };
}
function RD(e, t, r, n, s, a, i, o, l) {
  return dt(e, s, r, o, a, i, l).flatMap((c) => {
    const { oneOf: f, ...m } = c;
    if (t = At(t, m), f === void 0)
      return t;
    const h = f.map((b) => typeof b == "boolean" || !(Ae in b) ? [b] : uh(e, b, r, a, i, o));
    return ch(h).flatMap((b) => MD(e, t, r, n, b, a, i, o, l));
  });
}
function MD(e, t, r, n, s, a, i, o, l) {
  const u = s.filter((c) => {
    if (typeof c == "boolean" || !c || !c.properties)
      return !1;
    const { [n]: f } = c.properties;
    if (f) {
      const m = {
        type: "object",
        properties: {
          [n]: f
        }
      };
      return e.isValid(m, o, r) || a;
    }
    return !1;
  });
  return !a && u.length !== 1 ? (console.warn("ignoring oneOf in dependencies because there isn't exactly one subschema that is valid"), [t]) : u.flatMap((c) => {
    const f = c, [m] = mo(n, f.properties), h = { ...f, properties: m };
    return dt(e, h, r, o, a, i, l).map((b) => At(t, b));
  });
}
const LD = {
  type: "object",
  $id: Jg,
  properties: {
    __not_really_there__: {
      type: "number"
    }
  }
};
function Fi(e, t, r, n, s) {
  let a = 0;
  return r && (be(r.properties) ? a += H$(r.properties, (i, o, l) => {
    const u = K(n, l);
    if (typeof o == "boolean")
      return i;
    if (Ue(o, Ae)) {
      const c = qe(e, o, t, u, s);
      return i + Fi(e, t, c, u || {}, s);
    }
    if ((Ue(o, Be) || Ue(o, nt)) && u) {
      const c = Ue(o, Be) ? Be : nt, f = Pr(o);
      return i + Nn(e, t, u, K(o, c), -1, f, s);
    }
    if (o.type === "object")
      return be(u) && (i += 1), i + Fi(e, t, o, u, s);
    if (o.type === En(u)) {
      let c = i + 1;
      return o.default ? c += u === o.default ? 1 : -1 : o.const && (c += u === o.const ? 1 : -1), c;
    }
    return i;
  }, 0) : oa(r.type) && r.type === En(n) && (a += 1)), a;
}
function Nn(e, t, r, n, s = -1, a, i) {
  const o = n.map((m) => On(m, t, [])), l = Bf(r, n, a);
  if (kf(l))
    return l;
  const u = o.reduce((m, h, g) => (yo(e, r, [LD, h], t, a) === 1 && m.push(g), m), []);
  if (u.length === 1)
    return u[0];
  u.length || zf(o.length, (m) => u.push(m));
  const c = /* @__PURE__ */ new Set(), { bestIndex: f } = u.reduce((m, h) => {
    const { bestScore: g } = m, b = o[h], y = Fi(e, t, b, r, i);
    return c.add(y), y > g ? { bestIndex: h, bestScore: y } : m;
  }, { bestIndex: s, bestScore: 0 });
  return c.size === 1 && s >= 0 ? s : f;
}
function ki(e) {
  return Array.isArray(e.items) && e.items.length > 0 && e.items.every((t) => ae(t));
}
function yn(e) {
  return e == null;
}
function An(e, t, r = !1, n = !1, s = !1) {
  if (Array.isArray(t)) {
    const a = Array.isArray(e) ? e : [], i = s ? a : t, o = s ? t : a, l = i.map((u, c) => o[c] !== void 0 ? An(a[c], t[c], r, n, s) : u);
    return (r || s) && l.length < o.length && l.push(...o.slice(l.length)), l;
  }
  if (ae(t)) {
    const a = Object.assign({}, e);
    return Object.keys(t).reduce((i, o) => {
      const l = K(t, o), u = ae(e) && o in e, c = o in t;
      return i[o] = An(
        e ? K(e, o) : {},
        l,
        r,
        n,
        // overrideFormDataWithDefaults can be true only when the key value exists in defaults
        // Or if the key value doesn't exist in formData
        s && (u || !c)
      ), i;
    }, a);
  }
  return n && (!yn(e) && yn(t) || typeof t == "number" && isNaN(t)) || s && !yn(t) ? e : t;
}
function xt(e, t, r = !1) {
  return Object.keys(t).reduce((n, s) => {
    const a = e ? e[s] : {}, i = t[s];
    if (e && s in e && ae(i))
      n[s] = xt(a, i, r);
    else if (r && Array.isArray(a) && Array.isArray(i)) {
      let o = i;
      r === "preventDuplicates" && (o = i.reduce((l, u) => (a.includes(u) || l.push(u), l), [])), n[s] = a.concat(o);
    } else
      n[s] = i;
    return n;
  }, Object.assign({}, e));
}
function ph(e) {
  return Array.isArray(e.enum) && e.enum.length === 1 || Ot in e;
}
function Qo(e, t, r = {}, n) {
  const s = qe(e, t, r, void 0, n), a = s.oneOf || s.anyOf;
  return Array.isArray(s.enum) ? !0 : Array.isArray(a) ? a.every((i) => typeof i != "boolean" && ph(i)) : !1;
}
function el(e, t, r, n) {
  return !t.uniqueItems || !t.items || typeof t.items == "boolean" ? !1 : Qo(e, t.items, r, n);
}
function hh(e) {
  const t = e[Ot], r = Nt(e);
  return ae(t) && oa(t == null ? void 0 : t.$data) && r !== "object" && r !== "array";
}
function UD(e) {
  if (Gg in e && Array.isArray(e.enum) && e.enum.length === 1)
    return e.enum[0];
  if (Ot in e)
    return e.const;
  throw new Error("schema cannot be inferred as a constant");
}
function Pn(e, t) {
  const r = e;
  if (e.enum) {
    let a;
    if (t) {
      const { enumNames: i } = se(t);
      a = i;
    }
    return !a && r.enumNames && (a = r.enumNames), e.enum.map((i, o) => ({ label: (a == null ? void 0 : a[o]) || String(i), value: i }));
  }
  let n, s;
  return e.anyOf ? (n = e.anyOf, s = t == null ? void 0 : t.anyOf) : e.oneOf && (n = e.oneOf, s = t == null ? void 0 : t.oneOf), n && n.map((a, i) => {
    const { title: o } = se(s == null ? void 0 : s[i]), l = a, u = UD(l), c = o || l.title || String(u);
    return {
      schema: l,
      label: c,
      value: u
    };
  });
}
const WD = ["string", "number", "integer", "boolean", "null"];
var Cr;
(function(e) {
  e[e.Ignore = 0] = "Ignore", e[e.Invert = 1] = "Invert", e[e.Fallback = 2] = "Fallback";
})(Cr || (Cr = {}));
function ri(e, t = Cr.Ignore, r = -1) {
  if (r >= 0) {
    if (Array.isArray(e.items) && r < e.items.length) {
      const n = e.items[r];
      if (typeof n != "boolean")
        return n;
    }
  } else if (e.items && !Array.isArray(e.items) && typeof e.items != "boolean")
    return e.items;
  return t !== Cr.Ignore && ae(e.additionalItems) ? e.additionalItems : {};
}
function Yu(e, t, r, n, s, a = [], i = {}, o = !1) {
  const { emptyObjectFields: l = "populateAllDefaults" } = i;
  if (n || o)
    e[t] = r;
  else if (l !== "skipDefaults") {
    const u = s === void 0 ? a.includes(t) : s;
    ae(r) ? l === "skipEmptyDefaults" ? Or(r) || (e[t] = r) : (!Or(r) || a.includes(t)) && (u || l !== "populateRequiredDefaults") && (e[t] = r) : (
      // Store computedDefault if it's a defined primitive (e.g., true) and satisfies certain conditions
      // Condition 1: computedDefault is not undefined
      // Condition 2: If emptyObjectFields is 'populateAllDefaults' or 'skipEmptyDefaults)
      // Or if isSelfOrParentRequired is 'true' and the key is a required field
      r !== void 0 && (l === "populateAllDefaults" || l === "skipEmptyDefaults" || u && a.includes(t)) && (e[t] = r)
    );
  }
}
function Bt(e, t, r = {}) {
  const { parentDefaults: n, rawFormData: s, rootSchema: a = {}, includeUndefinedValues: i = !1, _recurseList: o = [], experimental_defaultFormStateBehavior: l = void 0, experimental_customMergeAllOf: u = void 0, required: c, shouldMergeDefaultsIntoFormData: f = !1 } = r;
  let m = ae(s) ? s : {};
  const h = ae(t) ? t : {};
  let g = n, b = null, y = l, p = o;
  if (h[Ot] !== void 0 && (l == null ? void 0 : l.constAsDefaults) !== "never" && !hh(h))
    g = h[Ot];
  else if (ae(g) && ae(h.default))
    g = xt(g, h.default);
  else if (Kg in h && !h[nt] && !h[Be])
    g = h.default;
  else if (Ae in h) {
    const _ = h[Ae];
    o.includes(_) || (p = o.concat(_), b = If(_, a)), b && !g && (g = h.default), f && b && !ae(s) && (m = s);
  } else if (Js in h) {
    const _ = {
      ...Zu(e, h, r, g),
      ...m
    };
    b = dh(e, h, a, !1, [], _, u)[0];
  } else if (ki(h))
    g = h.items.map((_, x) => Bt(e, _, {
      rootSchema: a,
      includeUndefinedValues: i,
      _recurseList: o,
      experimental_defaultFormStateBehavior: l,
      experimental_customMergeAllOf: u,
      parentDefaults: Array.isArray(n) ? n[x] : void 0,
      rawFormData: m,
      required: c,
      shouldMergeDefaultsIntoFormData: f
    }));
  else if (Be in h) {
    const { oneOf: _, ...x } = h;
    if (_.length === 0)
      return;
    const E = Pr(h), { type: N = "null" } = x;
    !Array.isArray(N) && WD.includes(N) && (y == null ? void 0 : y.constAsDefaults) === "skipOneOf" && (y = {
      ...y,
      constAsDefaults: "never"
    }), b = _[Nn(e, a, s ?? h.default, _, 0, E, u)], b = At(x, b);
  } else if (nt in h) {
    const { anyOf: _, ...x } = h;
    if (_.length === 0)
      return;
    const E = Pr(h);
    b = _[Nn(e, a, s ?? h.default, _, 0, E, u)], b = At(x, b);
  }
  if (b)
    return Bt(e, b, {
      rootSchema: a,
      includeUndefinedValues: i,
      _recurseList: p,
      experimental_defaultFormStateBehavior: y,
      experimental_customMergeAllOf: u,
      parentDefaults: g,
      rawFormData: s ?? m,
      required: c,
      shouldMergeDefaultsIntoFormData: f
    });
  g === void 0 && (g = h.default);
  const v = Zu(e, h, r, g);
  let $ = v ?? g;
  if (f) {
    const { arrayMinItems: _ = {} } = l || {}, { mergeExtraDefaults: x } = _, E = VD(e, h, a, s, l, u);
    (!ae(s) || Dr in h) && ($ = An($, E, x, !0));
  }
  return $;
}
function VD(e, t, r, n, s, a) {
  const i = !ph(t) && Qo(e, t, r, a);
  let o = n;
  if (i) {
    const u = Pn(t);
    o = (u == null ? void 0 : u.some((f) => _e(f.value, n))) ? n : void 0;
  }
  return t[Ot] && (s == null ? void 0 : s.constAsDefaults) === "always" && (o = t.const), o;
}
function zD(e, t, { rawFormData: r, rootSchema: n = {}, includeUndefinedValues: s = !1, _recurseList: a = [], experimental_defaultFormStateBehavior: i = void 0, experimental_customMergeAllOf: o = void 0, required: l, shouldMergeDefaultsIntoFormData: u } = {}, c) {
  {
    const f = ae(r) ? r : {}, m = t, h = (i == null ? void 0 : i.allOf) === "populateDefaults" && Dr in m ? qe(e, m, n, f, o) : m, g = h[Ot], b = Object.keys(h.properties || {}).reduce((y, p) => {
      var v;
      const $ = K(h, [Ee, p]), _ = ae(g) && g[p] !== void 0, x = (ae($) && Ot in $ || _) && (i == null ? void 0 : i.constAsDefaults) !== "never" && !hh($), E = Bt(e, $, {
        rootSchema: n,
        _recurseList: a,
        experimental_defaultFormStateBehavior: i,
        experimental_customMergeAllOf: o,
        includeUndefinedValues: s === !0,
        parentDefaults: K(c, [p]),
        rawFormData: K(f, [p]),
        required: (v = h.required) === null || v === void 0 ? void 0 : v.includes(p),
        shouldMergeDefaultsIntoFormData: u
      });
      return Yu(y, p, E, s, l, h.required, i, x), y;
    }, {});
    if (h.additionalProperties) {
      const y = ae(h.additionalProperties) ? h.additionalProperties : {}, p = /* @__PURE__ */ new Set();
      ae(c) && Object.keys(c).filter(($) => !h.properties || !h.properties[$]).forEach(($) => p.add($));
      const v = [];
      Object.keys(f).filter(($) => !h.properties || !h.properties[$]).forEach(($) => {
        p.add($), v.push($);
      }), p.forEach(($) => {
        var _;
        const x = Bt(e, y, {
          rootSchema: n,
          _recurseList: a,
          experimental_defaultFormStateBehavior: i,
          experimental_customMergeAllOf: o,
          includeUndefinedValues: s === !0,
          parentDefaults: K(c, [$]),
          rawFormData: K(f, [$]),
          required: (_ = h.required) === null || _ === void 0 ? void 0 : _.includes($),
          shouldMergeDefaultsIntoFormData: u
        });
        Yu(b, $, x, s, l, v);
      });
    }
    return b;
  }
}
function BD(e, t, { rawFormData: r, rootSchema: n = {}, _recurseList: s = [], experimental_defaultFormStateBehavior: a = void 0, experimental_customMergeAllOf: i = void 0, required: o, shouldMergeDefaultsIntoFormData: l } = {}, u) {
  var c, f;
  const m = t, h = (c = a == null ? void 0 : a.arrayMinItems) !== null && c !== void 0 ? c : {}, { populate: g, mergeExtraDefaults: b } = h, y = g === "never", p = g === "requiredOnly", v = g === "all" || !y && !p, $ = (f = h == null ? void 0 : h.computeSkipPopulate) !== null && f !== void 0 ? f : () => !1, x = (a == null ? void 0 : a.emptyObjectFields) === "skipEmptyDefaults" ? void 0 : [];
  if (Array.isArray(u) && (u = u.map((U, z) => {
    const F = ri(m, Cr.Fallback, z);
    return Bt(e, F, {
      rootSchema: n,
      _recurseList: s,
      experimental_defaultFormStateBehavior: a,
      experimental_customMergeAllOf: i,
      parentDefaults: U,
      required: o,
      shouldMergeDefaultsIntoFormData: l
    });
  })), Array.isArray(r)) {
    const U = ri(m);
    if (y)
      u = r;
    else {
      const z = r.map((I, C) => Bt(e, U, {
        rootSchema: n,
        _recurseList: s,
        experimental_defaultFormStateBehavior: a,
        experimental_customMergeAllOf: i,
        rawFormData: I,
        parentDefaults: K(u, [C]),
        required: o,
        shouldMergeDefaultsIntoFormData: l
      }));
      u = An(u, z, (p && o || v) && b);
    }
  }
  if ((ae(m) && Ot in m && (a == null ? void 0 : a.constAsDefaults) !== "never") === !1) {
    if (y)
      return u ?? x;
    if (p && !o)
      return u || void 0;
  }
  const N = Array.isArray(u) ? u.length : 0;
  if (!m.minItems || el(e, m, n, i) || $(e, m, n) || m.minItems <= N)
    return u || x;
  const R = u || [], A = ri(m, Cr.Invert), D = A.default, M = new Array(m.minItems - N).fill(Bt(e, A, {
    parentDefaults: D,
    rootSchema: n,
    _recurseList: s,
    experimental_defaultFormStateBehavior: a,
    experimental_customMergeAllOf: i,
    required: o,
    shouldMergeDefaultsIntoFormData: l
  }));
  return R.concat(M);
}
function Zu(e, t, r = {}, n) {
  switch (Nt(t)) {
    case "object":
      return zD(e, t, r, n);
    case "array":
      return BD(e, t, r, n);
  }
}
function mh(e, t, r, n, s = !1, a, i) {
  if (!ae(t))
    throw new Error("Invalid schema: " + t);
  const o = qe(e, t, n, r, i), l = Bt(e, o, {
    rootSchema: n,
    includeUndefinedValues: s,
    experimental_defaultFormStateBehavior: a,
    experimental_customMergeAllOf: i,
    rawFormData: r,
    shouldMergeDefaultsIntoFormData: !0
  });
  if (ae(r) || Array.isArray(r)) {
    const { mergeDefaultsIntoFormData: u } = a || {};
    return An(
      l,
      r,
      !0,
      u === "useDefaultIfFormDataUndefined",
      !0
      // set to true to override formData with defaults if they exist.
    );
  }
  return l;
}
function gh(e = {}) {
  return (
    // TODO: Remove the `&& uiSchema['ui:widget'] !== 'hidden'` once we support hidden widgets for arrays.
    // https://rjsf-team.github.io/react-jsonschema-form/docs/usage/widgets/#hidden-widgets
    "widget" in se(e) && se(e).widget !== "hidden"
  );
}
function yh(e, t, r = {}, n, s) {
  if (r[Zi] === "files")
    return !0;
  if (t.items) {
    const a = qe(e, t.items, n, void 0, s);
    return a.type === "string" && a.format === "data-url";
  }
  return !1;
}
function qD(e, t, r = {}, n, s, a) {
  const i = se(r, s), { label: o = !0 } = i;
  let l = !!o;
  const u = Nt(t);
  return u === "array" && (l = el(e, t, n, a) || yh(e, t, r, n, a) || gh(r)), u === "object" && (l = !1), u === "boolean" && !r[Zi] && (l = !1), r[Zg] && (l = !1), l;
}
function KD(e, t, r) {
  if (!r)
    return t;
  const { errors: n, errorSchema: s } = t;
  let a = e.toErrorList(r), i = r;
  return Or(s) || (i = xt(s, r, !0), a = [...n].concat(a)), { errorSchema: i, errors: a };
}
const mr = Symbol("no Value");
function Di(e, t, r, n, s = {}, a) {
  let i;
  if (Ue(r, Ee)) {
    const o = {};
    if (Ue(n, Ee)) {
      const c = K(n, Ee, {});
      Object.keys(c).forEach((f) => {
        Ue(s, f) && (o[f] = void 0);
      });
    }
    const l = Object.keys(K(r, Ee, {})), u = {};
    l.forEach((c) => {
      const f = K(s, c);
      let m = K(n, [Ee, c], {}), h = K(r, [Ee, c], {});
      Ue(m, Ae) && (m = qe(e, m, t, f, a)), Ue(h, Ae) && (h = qe(e, h, t, f, a));
      const g = K(m, "type"), b = K(h, "type");
      if (!g || g === b)
        if (Ue(o, c) && delete o[c], b === "object" || b === "array" && Array.isArray(f)) {
          const y = Di(e, t, h, m, f, a);
          (y !== void 0 || b === "array") && (u[c] = y);
        } else {
          const y = K(h, "default", mr), p = K(m, "default", mr);
          y !== mr && y !== f && (p === f ? o[c] = y : K(h, "readOnly") === !0 && (o[c] = void 0));
          const v = K(h, "const", mr), $ = K(m, "const", mr);
          v !== mr && v !== f && (o[c] = $ === f ? v : void 0);
        }
    }), i = {
      ...typeof s == "string" || Array.isArray(s) ? void 0 : s,
      ...o,
      ...u
    };
  } else if (K(n, "type") === "array" && K(r, "type") === "array" && Array.isArray(s)) {
    let o = K(n, "items"), l = K(r, "items");
    if (typeof o == "object" && typeof l == "object" && !Array.isArray(o) && !Array.isArray(l)) {
      Ue(o, Ae) && (o = qe(e, o, t, s, a)), Ue(l, Ae) && (l = qe(e, l, t, s, a));
      const u = K(o, "type"), c = K(l, "type");
      if (!u || u === c) {
        const f = K(r, "maxItems", -1);
        c === "object" ? i = s.reduce((m, h) => {
          const g = Di(e, t, l, o, h, a);
          return g !== void 0 && (f < 0 || m.length < f) && m.push(g), m;
        }, []) : i = f > 0 && s.length > f ? s.slice(0, f) : s;
      }
    } else typeof o == "boolean" && typeof l == "boolean" && o === l && (i = s);
  }
  return i;
}
function bs(e, t, r, n, s, a, i, o = [], l) {
  if (Ae in t || Js in t || Dr in t) {
    const f = qe(e, t, a, i, l);
    if (o.findIndex((h) => _e(h, f)) === -1)
      return bs(e, f, r, n, s, a, i, o.concat(f), l);
  }
  if (zt in t && !K(t, [zt, Ae]))
    return bs(e, K(t, zt), r, n, s, a, i, o, l);
  const c = { $id: s || r };
  if (Nt(t) === "object" && Ee in t)
    for (const f in t.properties) {
      const m = K(t, [Ee, f]), h = c[Ut] + n + f;
      c[f] = bs(
        e,
        ae(m) ? m : {},
        r,
        n,
        h,
        a,
        // It's possible that formData is not an object -- this can happen if an
        // array item has just been added, but not populated with data yet
        K(i, [f]),
        o,
        l
      );
    }
  return c;
}
function GD(e, t, r, n, s, a = "root", i = "_", o) {
  return bs(e, t, a, i, r, n, s, void 0, o);
}
function Jt(e, t, r, n, s, a = [], i) {
  if (Ae in t || Js in t || Dr in t) {
    const l = qe(e, t, n, s, i);
    if (a.findIndex((c) => _e(c, l)) === -1)
      return Jt(e, l, r, n, s, a.concat(l), i);
  }
  let o = {
    [gs]: r.replace(/^\./, "")
  };
  if (Be in t || nt in t) {
    const l = Be in t ? t.oneOf : t.anyOf, u = Pr(t), c = Nn(e, n, s, l, 0, u, i), f = l[c];
    o = {
      ...o,
      ...Jt(e, f, r, n, s, a, i)
    };
  }
  if (bi in t && t[bi] !== !1 && Ie(o, Yi, !0), zt in t && Array.isArray(s)) {
    const { items: l, additionalItems: u } = t;
    Array.isArray(l) ? s.forEach((c, f) => {
      l[f] ? o[f] = Jt(e, l[f], `${r}.${f}`, n, c, a, i) : u ? o[f] = Jt(e, u, `${r}.${f}`, n, c, a, i) : console.warn(`Unable to generate path schema for "${r}.${f}". No schema defined for it`);
    }) : s.forEach((c, f) => {
      o[f] = Jt(e, l, `${r}.${f}`, n, c, a, i);
    });
  } else if (Ee in t)
    for (const l in t.properties) {
      const u = K(t, [Ee, l]);
      o[l] = Jt(
        e,
        u,
        `${r}.${l}`,
        n,
        // It's possible that formData is not an object -- this can happen if an
        // array item has just been added, but not populated with data yet
        K(s, [l]),
        a,
        i
      );
    }
  return o;
}
function HD(e, t, r = "", n, s, a) {
  return Jt(e, t, r, n, s, void 0, a);
}
class JD {
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
    return !t || !r ? !1 : this.validator !== t || !_e(this.rootSchema, r) || !_e(this.experimental_defaultFormStateBehavior, n) || this.experimental_customMergeAllOf !== s;
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
    return mh(this.validator, t, r, this.rootSchema, n, this.experimental_defaultFormStateBehavior, this.experimental_customMergeAllOf);
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
    return qD(this.validator, t, r, this.rootSchema, n, this.experimental_customMergeAllOf);
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
    return Nn(this.validator, this.rootSchema, t, r, n, s, this.experimental_customMergeAllOf);
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
    return yo(this.validator, t, r, this.rootSchema, n);
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
    return qf(this.validator, t, r, this.rootSchema, n);
  }
  /** Checks to see if the `schema` and `uiSchema` combination represents an array of files
   *
   * @param schema - The schema for which check for array of files flag is desired
   * @param [uiSchema] - The UI schema from which to check the widget
   * @returns - True if schema/uiSchema contains an array of files, otherwise false
   */
  isFilesArray(t, r) {
    return yh(this.validator, t, r, this.rootSchema, this.experimental_customMergeAllOf);
  }
  /** Checks to see if the `schema` combination represents a multi-select
   *
   * @param schema - The schema for which check for a multi-select flag is desired
   * @returns - True if schema contains a multi-select, otherwise false
   */
  isMultiSelect(t) {
    return el(this.validator, t, this.rootSchema, this.experimental_customMergeAllOf);
  }
  /** Checks to see if the `schema` combination represents a select
   *
   * @param schema - The schema for which check for a select flag is desired
   * @returns - True if schema contains a select, otherwise false
   */
  isSelect(t) {
    return Qo(this.validator, t, this.rootSchema, this.experimental_customMergeAllOf);
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
    return KD(this.validator, t, r);
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
    return qe(this.validator, t, this.rootSchema, r, this.experimental_customMergeAllOf);
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
    return Di(this.validator, this.rootSchema, t, r, n, this.experimental_customMergeAllOf);
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
    return GD(this.validator, t, r, this.rootSchema, n, s, a, this.experimental_customMergeAllOf);
  }
  /** Generates an `PathSchema` object for the `schema`, recursively
   *
   * @param schema - The schema for which the display label flag is desired
   * @param [name] - The base name for the schema
   * @param [formData] - The current formData, if any, onto which to provide any missing defaults
   * @returns - The `PathSchema` object for the `schema`
   */
  toPathSchema(t, r, n) {
    return HD(this.validator, t, r, this.rootSchema, n, this.experimental_customMergeAllOf);
  }
}
function YD(e, t, r = {}, n) {
  return new JD(e, t, r, n);
}
function ZD(e) {
  var t;
  if (e.indexOf("data:") === -1)
    throw new Error("File is invalid: URI must be a dataURI");
  const n = e.slice(5).split(";base64,");
  if (n.length !== 2)
    throw new Error("File is invalid: dataURI must be base64");
  const [s, a] = n, [i, ...o] = s.split(";"), l = i || "", u = decodeURI(
    // parse the parameters into key-value pairs, find a key, and extract a value
    // if no key is found, then the name is unknown
    ((t = o.map((c) => c.split("=")).find(([c]) => c === "name")) === null || t === void 0 ? void 0 : t[1]) || "unknown"
  );
  try {
    const c = atob(a), f = new Array(c.length);
    for (let h = 0; h < c.length; h++)
      f[h] = c.charCodeAt(h);
    return { blob: new window.Blob([new Uint8Array(f)], { type: l }), name: u };
  } catch (c) {
    throw new Error("File is invalid: " + c.message);
  }
}
function Lt(e, t) {
  let r = String(e);
  for (; r.length < t; )
    r = "0" + r;
  return r;
}
function vh(e, t) {
  if (e <= 0 && t <= 0)
    e = (/* @__PURE__ */ new Date()).getFullYear() + e, t = (/* @__PURE__ */ new Date()).getFullYear() + t;
  else if (e < 0 || t < 0)
    throw new Error(`Both start (${e}) and stop (${t}) must both be <= 0 or > 0, got one of each`);
  if (e > t)
    return vh(t, e).reverse();
  const r = [];
  for (let n = e; n <= t; n++)
    r.push({ value: n, label: Lt(n, 2) });
  return r;
}
function XD(e, t) {
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
function QD(e, t) {
  return XD(e, t);
}
function ht(e, t = [], r) {
  if (Array.isArray(e))
    return e.map((a) => ht(a, t)).filter((a) => a !== r);
  const n = e === "" || e === null ? -1 : Number(e), s = t[n];
  return s ? s.value : r;
}
function eR(e, t, r = []) {
  const n = ht(e, r);
  return Array.isArray(t) ? t.filter((s) => !_e(s, n)) : _e(n, t) ? void 0 : t;
}
function tl(e, t) {
  return Array.isArray(t) ? t.some((r) => _e(r, e)) : _e(t, e);
}
function tR(e, t = [], r = !1) {
  const n = t.map((s, a) => tl(s.value, e) ? String(a) : void 0).filter((s) => typeof s < "u");
  return r ? n : n[0];
}
function rR(e, t, r = []) {
  const n = ht(e, r);
  if (!yn(n)) {
    const s = r.findIndex((o) => n === o.value), a = r.map(({ value: o }) => o);
    return t.slice(0, s).concat(n, t.slice(s)).sort((o, l) => +(a.indexOf(o) > a.indexOf(l)));
  }
  return t;
}
var nR = 1, sR = 4;
function bh(e) {
  return gn(e, nR | sR);
}
function aR(e, t, r, n) {
  return n = typeof n == "function" ? n : void 0, e == null ? e : vo(e, t, r, n);
}
class iR {
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
    let n = Array.isArray(t) && t.length > 0 || typeof t == "string" ? K(this.errorSchema, t) : this.errorSchema;
    return !n && t && (n = {}, aR(this.errorSchema, t, n, Object)), n;
  }
  /** Resets all errors in the `ErrorSchemaBuilder` back to the `initialSchema` if provided, otherwise an empty set.
   *
   * @param [initialSchema] - The optional set of initial errors, that will be cloned into the class
   * @returns - The `ErrorSchemaBuilder` object for chaining purposes
   */
  resetAllErrors(t) {
    return this.errorSchema = t ? bh(t) : {}, this;
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
    let s = K(n, ze);
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
function oR(e, t, r = [1900, (/* @__PURE__ */ new Date()).getFullYear() + 2], n = "YMD") {
  const { day: s, month: a, year: i, hour: o, minute: l, second: u } = e, c = { type: "day", range: [1, 31], value: s }, f = { type: "month", range: [1, 12], value: a }, m = { type: "year", range: r, value: i }, h = [];
  switch (n) {
    case "MDY":
      h.push(f, c, m);
      break;
    case "DMY":
      h.push(c, f, m);
      break;
    case "YMD":
    default:
      h.push(m, f, c);
  }
  return t && h.push({ type: "hour", range: [0, 23], value: o }, { type: "minute", range: [0, 59], value: l }, { type: "second", range: [0, 59], value: u }), h;
}
function lR(e) {
  const t = {};
  return e.multipleOf && (t.step = e.multipleOf), (e.minimum || e.minimum === 0) && (t.min = e.minimum), (e.maximum || e.maximum === 0) && (t.max = e.maximum), t;
}
function cR(e, t, r = {}, n = !0) {
  const s = {
    type: t || "text",
    ...lR(e)
  };
  return r.inputType ? s.type = r.inputType : t || (e.type === "number" ? (s.type = "number", n && s.step === void 0 && (s.step = "any")) : e.type === "integer" && (s.type = "number", s.step === void 0 && (s.step = 1))), r.autocomplete && (s.autoComplete = r.autocomplete), r.accept && (s.accept = r.accept), s;
}
const Xu = {
  props: {
    disabled: !1
  },
  submitText: "Submit",
  norender: !1
};
function uR(e = {}) {
  const t = se(e);
  if (t && t[As]) {
    const r = t[As];
    return { ...Xu, ...r };
  }
  return Xu;
}
function le(e, t, r = {}) {
  const { templates: n } = t;
  return e === "ButtonTemplates" ? n[e] : (
    // Evaluating uiOptions[name] results in TS2590: Expression produces a union type that is too complex to represent
    // To avoid that, we cast uiOptions to `any` before accessing the name field
    r[e] || n[e]
  );
}
var $h = { exports: {} }, ce = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rl = Symbol.for("react.element"), nl = Symbol.for("react.portal"), _a = Symbol.for("react.fragment"), xa = Symbol.for("react.strict_mode"), Sa = Symbol.for("react.profiler"), ja = Symbol.for("react.provider"), Ea = Symbol.for("react.context"), dR = Symbol.for("react.server_context"), Oa = Symbol.for("react.forward_ref"), Na = Symbol.for("react.suspense"), Aa = Symbol.for("react.suspense_list"), Pa = Symbol.for("react.memo"), Ca = Symbol.for("react.lazy"), fR = Symbol.for("react.offscreen"), wh;
wh = Symbol.for("react.module.reference");
function Xe(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case rl:
        switch (e = e.type, e) {
          case _a:
          case Sa:
          case xa:
          case Na:
          case Aa:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case dR:
              case Ea:
              case Oa:
              case Ca:
              case Pa:
              case ja:
                return e;
              default:
                return t;
            }
        }
      case nl:
        return t;
    }
  }
}
ce.ContextConsumer = Ea;
ce.ContextProvider = ja;
ce.Element = rl;
ce.ForwardRef = Oa;
ce.Fragment = _a;
ce.Lazy = Ca;
ce.Memo = Pa;
ce.Portal = nl;
ce.Profiler = Sa;
ce.StrictMode = xa;
ce.Suspense = Na;
ce.SuspenseList = Aa;
ce.isAsyncMode = function() {
  return !1;
};
ce.isConcurrentMode = function() {
  return !1;
};
ce.isContextConsumer = function(e) {
  return Xe(e) === Ea;
};
ce.isContextProvider = function(e) {
  return Xe(e) === ja;
};
ce.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === rl;
};
ce.isForwardRef = function(e) {
  return Xe(e) === Oa;
};
ce.isFragment = function(e) {
  return Xe(e) === _a;
};
ce.isLazy = function(e) {
  return Xe(e) === Ca;
};
ce.isMemo = function(e) {
  return Xe(e) === Pa;
};
ce.isPortal = function(e) {
  return Xe(e) === nl;
};
ce.isProfiler = function(e) {
  return Xe(e) === Sa;
};
ce.isStrictMode = function(e) {
  return Xe(e) === xa;
};
ce.isSuspense = function(e) {
  return Xe(e) === Na;
};
ce.isSuspenseList = function(e) {
  return Xe(e) === Aa;
};
ce.isValidElementType = function(e) {
  return typeof e == "string" || typeof e == "function" || e === _a || e === Sa || e === xa || e === Na || e === Aa || e === fR || typeof e == "object" && e !== null && (e.$$typeof === Ca || e.$$typeof === Pa || e.$$typeof === ja || e.$$typeof === Ea || e.$$typeof === Oa || e.$$typeof === wh || e.getModuleId !== void 0);
};
ce.typeOf = Xe;
$h.exports = ce;
var pR = $h.exports;
const Qu = /* @__PURE__ */ kn(pR), ni = {
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
function hR(e) {
  let t = K(e, "MergedWidget");
  if (!t) {
    const r = e.defaultProps && e.defaultProps.options || {};
    t = ({ options: n, ...s }) => d.jsx(e, { options: { ...r, ...n }, ...s }), Ie(e, "MergedWidget", t);
  }
  return t;
}
function St(e, t, r = {}) {
  const n = Nt(e);
  if (typeof t == "function" || t && Qu.isForwardRef(qm(t)) || Qu.isMemo(t))
    return hR(t);
  if (typeof t != "string")
    throw new Error(`Unsupported widget definition: ${typeof t}`);
  if (t in r) {
    const s = r[t];
    return St(e, s, r);
  }
  if (typeof n == "string") {
    if (!(n in ni))
      throw new Error(`No widget for type '${n}'`);
    if (t in ni[n]) {
      const s = r[ni[n][t]];
      return St(e, s, r);
    }
  }
  throw new Error(`No widget '${t}' for type '${n}'`);
}
function mR(e) {
  let t = 0;
  for (let r = 0; r < e.length; r += 1) {
    const n = e.charCodeAt(r);
    t = (t << 5) - t + n, t = t & t;
  }
  return t.toString(16);
}
function gR(e) {
  const t = /* @__PURE__ */ new Set();
  return JSON.stringify(e, (r, n) => (t.add(r), n)), mR(JSON.stringify(e, Array.from(t).sort()));
}
function yR(e, t, r = {}) {
  try {
    return St(e, t, r), !0;
  } catch (n) {
    const s = n;
    if (s.message && (s.message.startsWith("No widget") || s.message.startsWith("Unsupported widget")))
      return !1;
    throw n;
  }
}
function Jn(e, t) {
  return `${oa(e) ? e : e[Ut]}__${t}`;
}
function Yn(e) {
  return Jn(e, "description");
}
function _h(e) {
  return Jn(e, "error");
}
function Ri(e) {
  return Jn(e, "examples");
}
function xh(e) {
  return Jn(e, "help");
}
function Sh(e) {
  return Jn(e, "title");
}
function pr(e, t = !1) {
  const r = t ? ` ${Ri(e)}` : "";
  return `${_h(e)} ${Yn(e)} ${xh(e)}${r}`;
}
function jh(e, t) {
  return `${e}-${t}`;
}
function vR(e, t, r) {
  return t ? r : e;
}
function bR(e) {
  return e ? new Date(e).toJSON() : void 0;
}
function $R(e, t) {
  if (!Array.isArray(t))
    return e;
  const r = (c) => c.reduce((f, m) => (f[m] = !0, f), {}), n = (c) => c.length > 1 ? `properties '${c.join("', '")}'` : `property '${c[0]}'`, s = r(e), a = t.filter((c) => c === "*" || s[c]), i = r(a), o = e.filter((c) => !i[c]), l = a.indexOf("*");
  if (l === -1) {
    if (o.length)
      throw new Error(`uiSchema order list does not contain ${n(o)}`);
    return a;
  }
  if (l !== a.lastIndexOf("*"))
    throw new Error("uiSchema order list contains more than one wildcard item");
  const u = [...a];
  return u.splice(l, 1, ...o), u;
}
function si(e, t = !0) {
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
function $s(e) {
  if (e.const || e.enum && e.enum.length === 1 && e.enum[0] === !0)
    return !0;
  if (e.anyOf && e.anyOf.length === 1)
    return $s(e.anyOf[0]);
  if (e.oneOf && e.oneOf.length === 1)
    return $s(e.oneOf[0]);
  if (e.allOf) {
    const t = (r) => $s(r);
    return e.allOf.some(t);
  }
  return !1;
}
function wR(e, t, r) {
  const { props: n, state: s } = e;
  return !_e(n, t) || !_e(s, r);
}
function ed(e, t = !0) {
  const { year: r, month: n, day: s, hour: a = 0, minute: i = 0, second: o = 0 } = e, l = Date.UTC(r, n - 1, s, a, i, o), u = new Date(l).toJSON();
  return t ? u : u.slice(0, 10);
}
function Cn(e, t = []) {
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
      er(a) && (n = n.concat(Cn(a, [...t, s])));
    }
    return n;
  }, r);
}
function Eh(e) {
  return Pe(e) ? na(e, or) : Wn(e) ? [e] : fo(hf(io(e)));
}
function _R(e) {
  const t = new iR();
  return e.length && e.forEach((r) => {
    const { property: n, message: s } = r, a = n === "." ? [] : Eh(n);
    a.length > 0 && a[0] === "" && a.splice(0, 1), s && t.addErrors(s, a);
  }), t.ErrorSchema;
}
function sl(e) {
  return Object.keys(e).reduce((t, r) => {
    if (r === "addError")
      return t;
    {
      const n = e[r];
      return er(n) ? {
        ...t,
        [r]: sl(n)
      } : { ...t, [r]: n };
    }
  }, {});
}
function xR(e) {
  if (!e)
    return "";
  const t = new Date(e), r = Lt(t.getFullYear(), 4), n = Lt(t.getMonth() + 1, 2), s = Lt(t.getDate(), 2), a = Lt(t.getHours(), 2), i = Lt(t.getMinutes(), 2), o = Lt(t.getSeconds(), 2), l = Lt(t.getMilliseconds(), 3);
  return `${r}-${n}-${s}T${a}:${i}:${o}.${l}`;
}
function ws(e, t) {
  if (!t)
    return e;
  const { errors: r, errorSchema: n } = e;
  let s = Cn(t), a = t;
  return Or(n) || (a = xt(n, t, !0), s = [...r].concat(s)), { errorSchema: a, errors: s };
}
function SR(e) {
  for (const t in e) {
    const r = e, n = r[t];
    t === Ae && typeof n == "string" && n.startsWith("#") ? r[t] = Qd + n : r[t] = al(n);
  }
  return e;
}
function jR(e) {
  for (let t = 0; t < e.length; t++)
    e[t] = al(e[t]);
  return e;
}
function al(e) {
  return Array.isArray(e) ? jR([...e]) : be(e) ? SR({ ...e }) : e;
}
function Oh(e, t, r) {
  for (var n = -1, s = t.length, a = {}; ++n < s; ) {
    var i = t[n], o = sa(e, i);
    r(o, i) && vo(a, Mr(i, e), o);
  }
  return a;
}
function ER(e, t) {
  if (e == null)
    return {};
  var r = na(po(e), function(n) {
    return [n];
  });
  return t = go(t), Oh(e, r, function(n, s) {
    return t(n, s[0]);
  });
}
var OR = 200;
function NR(e, t, r, n) {
  var s = -1, a = Gf, i = !0, o = e.length, l = [], u = t.length;
  if (!o)
    return l;
  t.length >= OR && (a = Xi, i = !1, t = new Sr(t));
  e:
    for (; ++s < o; ) {
      var c = e[s], f = c;
      if (c = c !== 0 ? c : 0, i && f === f) {
        for (var m = u; m--; )
          if (t[m] === f)
            continue e;
        l.push(c);
      } else a(t, f, n) || l.push(c);
    }
  return l;
}
var AR = bo(function(e, t) {
  return Fs(e) ? NR(e, zn(t, 1, Fs, !0)) : [];
});
function PR(e, t) {
  const r = er(e), n = er(t);
  if (e === t || !r && !n)
    return [];
  if (r && !n)
    return ct(e);
  if (!r && n)
    return ct(t);
  {
    const s = ct(ER(e, (i, o) => !_e(i, K(t, o)))), a = AR(ct(t), ct(e));
    return [...s, ...a];
  }
}
var pe;
(function(e) {
  e.ArrayItemTitle = "Item", e.MissingItems = "Missing items definition", e.YesLabel = "Yes", e.NoLabel = "No", e.CloseLabel = "Close", e.ErrorsLabel = "Errors", e.NewStringDefault = "New Value", e.AddButton = "Add", e.AddItemButton = "Add Item", e.CopyButton = "Copy", e.MoveDownButton = "Move down", e.MoveUpButton = "Move up", e.RemoveButton = "Remove", e.NowLabel = "Now", e.ClearLabel = "Clear", e.AriaDateLabel = "Select a date", e.PreviewLabel = "Preview", e.DecrementAriaLabel = "Decrease value by 1", e.IncrementAriaLabel = "Increase value by 1", e.UnknownFieldType = "Unknown field type %1", e.OptionPrefix = "Option %1", e.TitleOptionPrefix = "%1 option %2", e.KeyLabel = "%1 Key", e.InvalidObjectField = 'Invalid "%1" object field configuration: _%2_.', e.UnsupportedField = "Unsupported field schema.", e.UnsupportedFieldWithId = "Unsupported field schema for field `%1`.", e.UnsupportedFieldWithReason = "Unsupported field schema: _%1_.", e.UnsupportedFieldWithIdAndReason = "Unsupported field schema for field `%1`: _%2_.", e.FilesInfo = "**%1** (%2, %3 bytes)";
})(pe || (pe = {}));
function CR(e, t) {
  var r = Pe(e) ? lo : Mf;
  return r(e, Vf(t));
}
function TR(e, t) {
  return Oh(e, t, function(r, n) {
    return Wf(e, n);
  });
}
var td = Cf(function(e, t) {
  return e == null ? {} : TR(e, t);
}), IR = 0;
function FR(e) {
  var t = ++IR;
  return io(e) + t;
}
function Mi() {
  return FR("rjsf-array-item-");
}
function rd(e) {
  return Array.isArray(e) ? e.map((t) => ({
    key: Mi(),
    item: t
  })) : [];
}
function an(e) {
  return Array.isArray(e) ? e.map((t) => t.item) : [];
}
class kR extends Fn {
  /** Constructs an `ArrayField` from the `props`, generating the initial keyed data from the `formData`
   *
   * @param props - The `FieldProps` for this template
   */
  constructor(r) {
    super(r);
    /** Returns the default form information for an item based on the schema for that item. Deals with the possibility
     * that the schema is fixed and allows additional items.
     */
    de(this, "_getNewFormDataRow", () => {
      const { schema: r, registry: n } = this.props, { schemaUtils: s } = n;
      let a = r.items;
      return ki(r) && qg(r) && (a = r.additionalItems), s.getDefaultFormState(a);
    });
    /** Callback handler for when the user clicks on the add button. Creates a new row of keyed form data at the end of
     * the list, adding it into the state, and then returning `onChange()` with the plain form data converted from the
     * keyed data
     *
     * @param event - The event for the click
     */
    de(this, "onAddClick", (r) => {
      this._handleAddClick(r);
    });
    /** Callback handler for when the user clicks on the add button on an existing array element. Creates a new row of
     * keyed form data inserted at the `index`, adding it into the state, and then returning `onChange()` with the plain
     * form data converted from the keyed data
     *
     * @param index - The index at which the add button is clicked
     */
    de(this, "onAddIndexClick", (r) => (n) => {
      this._handleAddClick(n, r);
    });
    /** Callback handler for when the user clicks on the copy button on an existing array element. Clones the row of
     * keyed form data at the `index` into the next position in the state, and then returning `onChange()` with the plain
     * form data converted from the keyed data
     *
     * @param index - The index at which the copy button is clicked
     */
    de(this, "onCopyIndexClick", (r) => (n) => {
      n && n.preventDefault();
      const { onChange: s, errorSchema: a } = this.props, { keyedFormData: i } = this.state;
      let o;
      if (a) {
        o = {};
        for (const c in a) {
          const f = parseInt(c);
          f <= r ? Ie(o, [f], a[c]) : f > r && Ie(o, [f + 1], a[c]);
        }
      }
      const l = {
        key: Mi(),
        item: bh(i[r].item)
      }, u = [...i];
      r !== void 0 ? u.splice(r + 1, 0, l) : u.push(l), this.setState({
        keyedFormData: u,
        updatedKeyedFormData: !0
      }, () => s(an(u), o));
    });
    /** Callback handler for when the user clicks on the remove button on an existing array element. Removes the row of
     * keyed form data at the `index` in the state, and then returning `onChange()` with the plain form data converted
     * from the keyed data
     *
     * @param index - The index at which the remove button is clicked
     */
    de(this, "onDropIndexClick", (r) => (n) => {
      n && n.preventDefault();
      const { onChange: s, errorSchema: a } = this.props, { keyedFormData: i } = this.state;
      let o;
      if (a) {
        o = {};
        for (const u in a) {
          const c = parseInt(u);
          c < r ? Ie(o, [c], a[u]) : c > r && Ie(o, [c - 1], a[u]);
        }
      }
      const l = i.filter((u, c) => c !== r);
      this.setState({
        keyedFormData: l,
        updatedKeyedFormData: !0
      }, () => s(an(l), o));
    });
    /** Callback handler for when the user clicks on one of the move item buttons on an existing array element. Moves the
     * row of keyed form data at the `index` to the `newIndex` in the state, and then returning `onChange()` with the
     * plain form data converted from the keyed data
     *
     * @param index - The index of the item to move
     * @param newIndex - The index to where the item is to be moved
     */
    de(this, "onReorderClick", (r, n) => (s) => {
      s && (s.preventDefault(), s.currentTarget.blur());
      const { onChange: a, errorSchema: i } = this.props;
      let o;
      if (i) {
        o = {};
        for (const f in i) {
          const m = parseInt(f);
          m == r ? Ie(o, [n], i[r]) : m == n ? Ie(o, [r], i[n]) : Ie(o, [f], i[m]);
        }
      }
      const { keyedFormData: l } = this.state;
      function u() {
        const f = l.slice();
        return f.splice(r, 1), f.splice(n, 0, l[r]), f;
      }
      const c = u();
      this.setState({
        keyedFormData: c
      }, () => a(an(c), o));
    });
    /** Callback handler used to deal with changing the value of the data in the array at the `index`. Calls the
     * `onChange` callback with the updated form data
     *
     * @param index - The index of the item being changed
     */
    de(this, "onChangeForIndex", (r) => (n, s, a) => {
      const { formData: i, onChange: o, errorSchema: l } = this.props, c = (Array.isArray(i) ? i : []).map((f, m) => r === m ? typeof n > "u" ? null : n : f);
      o(c, l && l && {
        ...l,
        [r]: s
      }, a);
    });
    /** Callback handler used to change the value for a checkbox */
    de(this, "onSelectChange", (r) => {
      const { onChange: n, idSchema: s } = this.props;
      n(r, void 0, s && s.$id);
    });
    const { formData: n = [] } = r, s = rd(n);
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
      keyedFormData: s.length === a.length ? a.map((o, l) => ({
        key: o.key,
        item: s[l]
      })) : rd(s)
    };
  }
  /** Returns the appropriate title for an item by getting first the title from the schema.items, then falling back to
   * the description from the schema.items, and finally the string "Item"
   */
  get itemTitle() {
    const { schema: r, registry: n } = this.props, { translateString: s } = n;
    return K(r, [zt, "title"], K(r, [zt, "description"], s(pe.ArrayItemTitle)));
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
    let { addable: i } = se(s, a.globalUiOptions);
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
      for (const c in a) {
        const f = parseInt(c);
        n === void 0 || f < n ? Ie(o, [f], a[c]) : f >= n && Ie(o, [f + 1], a[c]);
      }
    }
    const l = {
      key: Mi(),
      item: this._getNewFormDataRow()
    }, u = [...i];
    n !== void 0 ? u.splice(n, 0, l) : u.push(l), this.setState({
      keyedFormData: u,
      updatedKeyedFormData: !0
    }, () => s(an(u), o));
  }
  /** Renders the `ArrayField` depending on the specific needs of the schema and uischema elements
   */
  render() {
    const { schema: r, uiSchema: n, idSchema: s, registry: a } = this.props, { schemaUtils: i, translateString: o } = a;
    if (!(zt in r)) {
      const l = se(n), u = le("UnsupportedFieldTemplate", a, l);
      return d.jsx(u, { schema: r, idSchema: s, reason: o(pe.MissingItems), registry: a });
    }
    return i.isMultiSelect(r) ? this.renderMultiSelect() : gh(n) ? this.renderCustomWidget() : ki(r) ? this.renderFixedArray() : i.isFilesArray(r, n) ? this.renderFiles() : this.renderNormalArray();
  }
  /** Renders a normal array without any limitations of length
   */
  renderNormalArray() {
    const { schema: r, uiSchema: n = {}, errorSchema: s, idSchema: a, name: i, title: o, disabled: l = !1, readonly: u = !1, autofocus: c = !1, required: f = !1, registry: m, onBlur: h, onFocus: g, idPrefix: b, idSeparator: y = "_", rawErrors: p } = this.props, { keyedFormData: v } = this.state, $ = r.title || o || i, { schemaUtils: _, formContext: x } = m, E = se(n), N = be(r.items) ? r.items : {}, R = _.retrieveSchema(N), A = an(this.state.keyedFormData), D = this.canAddItem(A), M = {
      canAdd: D,
      items: v.map((z, F) => {
        const { key: I, item: C } = z, L = C, B = _.retrieveSchema(N, L), J = s ? s[F] : void 0, k = a.$id + y + F, j = _.toIdSchema(B, k, L, b, y);
        return this.renderArrayFieldItem({
          key: I,
          index: F,
          name: i && `${i}-${F}`,
          title: $ ? `${$}-${F + 1}` : void 0,
          canAdd: D,
          canMoveUp: F > 0,
          canMoveDown: F < A.length - 1,
          itemSchema: B,
          itemIdSchema: j,
          itemErrorSchema: J,
          itemData: L,
          itemUiSchema: n.items,
          autofocus: c && F === 0,
          onBlur: h,
          onFocus: g,
          rawErrors: p,
          totalItems: v.length
        });
      }),
      className: `field field-array field-array-of-${R.type}`,
      disabled: l,
      idSchema: a,
      uiSchema: n,
      onAddClick: this.onAddClick,
      readonly: u,
      required: f,
      schema: r,
      title: $,
      formContext: x,
      formData: A,
      rawErrors: p,
      registry: m
    }, U = le("ArrayFieldTemplate", m, E);
    return d.jsx(U, { ...M });
  }
  /** Renders an array using the custom widget provided by the user in the `uiSchema`
   */
  renderCustomWidget() {
    const { schema: r, idSchema: n, uiSchema: s, disabled: a = !1, readonly: i = !1, autofocus: o = !1, required: l = !1, hideError: u, placeholder: c, onBlur: f, onFocus: m, formData: h = [], registry: g, rawErrors: b, name: y } = this.props, { widgets: p, formContext: v, globalUiOptions: $, schemaUtils: _ } = g, { widget: x, title: E, ...N } = se(s, $), R = St(r, x, p), A = E ?? r.title ?? y, D = _.getDisplayLabel(r, s, $);
    return d.jsx(R, { id: n.$id, name: y, multiple: !0, onChange: this.onSelectChange, onBlur: f, onFocus: m, options: N, schema: r, uiSchema: s, registry: g, value: h, disabled: a, readonly: i, hideError: u, required: l, label: A, hideLabel: !D, placeholder: c, formContext: v, autofocus: o, rawErrors: b });
  }
  /** Renders an array as a set of checkboxes
   */
  renderMultiSelect() {
    const { schema: r, idSchema: n, uiSchema: s, formData: a = [], disabled: i = !1, readonly: o = !1, autofocus: l = !1, required: u = !1, placeholder: c, onBlur: f, onFocus: m, registry: h, rawErrors: g, name: b } = this.props, { widgets: y, schemaUtils: p, formContext: v, globalUiOptions: $ } = h, _ = p.retrieveSchema(r.items, a), x = Pn(_, s), { widget: E = "select", title: N, ...R } = se(s, $), A = St(r, E, y), D = N ?? r.title ?? b, M = p.getDisplayLabel(r, s, $);
    return d.jsx(A, { id: n.$id, name: b, multiple: !0, onChange: this.onSelectChange, onBlur: f, onFocus: m, options: { ...R, enumOptions: x }, schema: r, uiSchema: s, registry: h, value: a, disabled: i, readonly: o, required: u, label: D, hideLabel: !M, placeholder: c, formContext: v, autofocus: l, rawErrors: g });
  }
  /** Renders an array of files using the `FileWidget`
   */
  renderFiles() {
    const { schema: r, uiSchema: n, idSchema: s, name: a, disabled: i = !1, readonly: o = !1, autofocus: l = !1, required: u = !1, onBlur: c, onFocus: f, registry: m, formData: h = [], rawErrors: g } = this.props, { widgets: b, formContext: y, globalUiOptions: p, schemaUtils: v } = m, { widget: $ = "files", title: _, ...x } = se(n, p), E = St(r, $, b), N = _ ?? r.title ?? a, R = v.getDisplayLabel(r, n, p);
    return d.jsx(E, { options: x, id: s.$id, name: a, multiple: !0, onChange: this.onSelectChange, onBlur: c, onFocus: f, schema: r, uiSchema: n, value: h, disabled: i, readonly: o, required: u, registry: m, formContext: y, autofocus: l, rawErrors: g, label: N, hideLabel: !R });
  }
  /** Renders an array that has a maximum limit of items
   */
  renderFixedArray() {
    const { schema: r, uiSchema: n = {}, formData: s = [], errorSchema: a, idPrefix: i, idSeparator: o = "_", idSchema: l, name: u, title: c, disabled: f = !1, readonly: m = !1, autofocus: h = !1, required: g = !1, registry: b, onBlur: y, onFocus: p, rawErrors: v } = this.props, { keyedFormData: $ } = this.state;
    let { formData: _ = [] } = this.props;
    const x = r.title || c || u, E = se(n), { schemaUtils: N, formContext: R } = b, D = (be(r.items) ? r.items : []).map((I, C) => N.retrieveSchema(I, s[C])), M = be(r.additionalItems) ? N.retrieveSchema(r.additionalItems, s) : null;
    (!_ || _.length < D.length) && (_ = _ || [], _ = _.concat(new Array(D.length - _.length)));
    const U = this.canAddItem(_) && !!M, z = {
      canAdd: U,
      className: "field field-array field-array-fixed-items",
      disabled: f,
      idSchema: l,
      formData: s,
      items: $.map((I, C) => {
        const { key: L, item: B } = I, J = B, k = C >= D.length, j = (k && be(r.additionalItems) ? N.retrieveSchema(r.additionalItems, J) : D[C]) || {}, T = l.$id + o + C, O = N.toIdSchema(j, T, J, i, o), w = k ? n.additionalItems || {} : Array.isArray(n.items) ? n.items[C] : n.items || {}, S = a ? a[C] : void 0;
        return this.renderArrayFieldItem({
          key: L,
          index: C,
          name: u && `${u}-${C}`,
          title: x ? `${x}-${C + 1}` : void 0,
          canAdd: U,
          canRemove: k,
          canMoveUp: C >= D.length + 1,
          canMoveDown: k && C < _.length - 1,
          itemSchema: j,
          itemData: J,
          itemUiSchema: w,
          itemIdSchema: O,
          itemErrorSchema: S,
          autofocus: h && C === 0,
          onBlur: y,
          onFocus: p,
          rawErrors: v,
          totalItems: $.length
        });
      }),
      onAddClick: this.onAddClick,
      readonly: m,
      required: g,
      registry: b,
      schema: r,
      uiSchema: n,
      title: x,
      formContext: R,
      errorSchema: a,
      rawErrors: v
    }, F = le("ArrayFieldTemplate", b, E);
    return d.jsx(F, { ...z });
  }
  /** Renders the individual array item using a `SchemaField` along with the additional properties required to be send
   * back to the `ArrayFieldItemTemplate`.
   *
   * @param props - The props for the individual array item to be rendered
   */
  renderArrayFieldItem(r) {
    const { key: n, index: s, name: a, canAdd: i, canRemove: o = !0, canMoveUp: l, canMoveDown: u, itemSchema: c, itemData: f, itemUiSchema: m, itemIdSchema: h, itemErrorSchema: g, autofocus: b, onBlur: y, onFocus: p, rawErrors: v, totalItems: $, title: _ } = r, { disabled: x, hideError: E, idPrefix: N, idSeparator: R, readonly: A, uiSchema: D, registry: M, formContext: U } = this.props, { fields: { ArraySchemaField: z, SchemaField: F }, globalUiOptions: I } = M, C = z || F, { orderable: L = !0, removable: B = !0, copyable: J = !1 } = se(D, I), k = {
      moveUp: L && l,
      moveDown: L && u,
      copy: J && i,
      remove: B && o,
      toolbar: !1
    };
    return k.toolbar = Object.keys(k).some((j) => k[j]), {
      children: d.jsx(C, { name: a, title: _, index: s, schema: c, uiSchema: m, formData: f, formContext: U, errorSchema: g, idPrefix: N, idSeparator: R, idSchema: h, required: this.isItemRequired(c), onChange: this.onChangeForIndex(s), onBlur: y, onFocus: p, registry: M, disabled: x, readonly: A, hideError: E, autofocus: b, rawErrors: v }),
      className: "array-item",
      disabled: x,
      canAdd: i,
      hasCopy: k.copy,
      hasToolbar: k.toolbar,
      hasMoveUp: k.moveUp,
      hasMoveDown: k.moveDown,
      hasRemove: k.remove,
      index: s,
      totalItems: $,
      key: n,
      onAddIndexClick: this.onAddIndexClick,
      onCopyIndexClick: this.onCopyIndexClick,
      onDropIndexClick: this.onDropIndexClick,
      onReorderClick: this.onReorderClick,
      readonly: A,
      registry: M,
      schema: c,
      uiSchema: m
    };
  }
}
function DR(e) {
  const { schema: t, name: r, uiSchema: n, idSchema: s, formData: a, registry: i, required: o, disabled: l, readonly: u, hideError: c, autofocus: f, title: m, onChange: h, onFocus: g, onBlur: b, rawErrors: y } = e, { title: p } = t, { widgets: v, formContext: $, translateString: _, globalUiOptions: x } = i, {
    widget: E = "checkbox",
    title: N,
    // Unlike the other fields, don't use `getDisplayLabel()` since it always returns false for the boolean type
    label: R = !0,
    ...A
  } = se(n, x), D = St(t, E, v), M = _(pe.YesLabel), U = _(pe.NoLabel);
  let z;
  const F = N ?? p ?? m ?? r;
  if (Array.isArray(t.oneOf))
    z = Pn({
      oneOf: t.oneOf.map((I) => {
        if (be(I))
          return {
            ...I,
            title: I.title || (I.const === !0 ? M : U)
          };
      }).filter((I) => I)
      // cast away the error that typescript can't grok is fixed
    }, n);
  else {
    const I = t, C = t.enum ?? [!0, !1];
    !I.enumNames && C.length === 2 && C.every((L) => typeof L == "boolean") ? z = [
      {
        value: C[0],
        label: C[0] ? M : U
      },
      {
        value: C[1],
        label: C[1] ? M : U
      }
    ] : z = Pn({
      enum: C,
      // NOTE: enumNames is deprecated, but still supported for now.
      enumNames: I.enumNames
    }, n);
  }
  return d.jsx(D, { options: { ...A, enumOptions: z }, schema: t, uiSchema: n, id: s.$id, name: r, onChange: h, onFocus: g, onBlur: b, label: F, hideLabel: !R, value: a, required: o, disabled: l, readonly: u, hideError: c, registry: i, formContext: $, autofocus: f, rawErrors: y });
}
class nd extends Fn {
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
    de(this, "onOptionChange", (r) => {
      const { selectedOption: n, retrievedOptions: s } = this.state, { formData: a, onChange: i, registry: o } = this.props, { schemaUtils: l } = o, u = r !== void 0 ? parseInt(r, 10) : -1;
      if (u === n)
        return;
      const c = u >= 0 ? s[u] : void 0, f = n >= 0 ? s[n] : void 0;
      let m = l.sanitizeDataForNewSchema(c, f, a);
      c && (m = l.getDefaultFormState(c, m, "excludeObjectChildren")), this.setState({ selectedOption: u }, () => {
        i(m, void 0, this.getFieldId());
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
    let l = this.state;
    if (!_e(r.options, a)) {
      const { registry: { schemaUtils: u } } = this.props, c = a.map((f) => u.retrieveSchema(f, s));
      l = { selectedOption: o, retrievedOptions: c };
    }
    if (!_e(s, r.formData) && i.$id === r.idSchema.$id) {
      const { retrievedOptions: u } = l, c = this.getMatchingOption(o, s, u);
      n && c !== o && (l = { selectedOption: c, retrievedOptions: u });
    }
    l !== this.state && this.setState(l);
  }
  /** Determines the best matching option for the given `formData` and `options`.
   *
   * @param formData - The new formData
   * @param options - The list of options to choose from
   * @return - The index of the `option` that best matches the `formData`
   */
  getMatchingOption(r, n, s) {
    const { schema: a, registry: { schemaUtils: i } } = this.props, o = Pr(a);
    return i.getClosestMatchingOption(n, s, r, o);
  }
  getFieldId() {
    const { idSchema: r, schema: n } = this.props;
    return `${r.$id}${n.oneOf ? "__oneof_select" : "__anyof_select"}`;
  }
  /** Renders the `AnyOfField` selector along with a `SchemaField` for the value of the `formData`
   */
  render() {
    const { name: r, disabled: n = !1, errorSchema: s = {}, formContext: a, onBlur: i, onFocus: o, readonly: l, registry: u, schema: c, uiSchema: f } = this.props, { widgets: m, fields: h, translateString: g, globalUiOptions: b, schemaUtils: y } = u, { SchemaField: p } = h, { selectedOption: v, retrievedOptions: $ } = this.state, { widget: _ = "select", placeholder: x, autofocus: E, autocomplete: N, title: R = c.title, ...A } = se(f, b), D = St({ type: "number" }, _, m), M = K(s, ze, []), U = Is(s, [ze]), z = y.getDisplayLabel(c, f, b), F = v >= 0 && $[v] || null;
    let I;
    if (F) {
      const { required: j } = c;
      I = j ? At({ required: j }, F) : F;
    }
    let C = [];
    Be in c && f && Be in f ? Array.isArray(f[Be]) ? C = f[Be] : console.warn(`uiSchema.oneOf is not an array for "${R || r}"`) : nt in c && f && nt in f && (Array.isArray(f[nt]) ? C = f[nt] : console.warn(`uiSchema.anyOf is not an array for "${R || r}"`));
    let L = f;
    v >= 0 && C.length > v && (L = C[v]);
    const B = R ? pe.TitleOptionPrefix : pe.OptionPrefix, J = R ? [R] : [], k = $.map((j, T) => {
      const { title: O = j.title } = se(C[T]);
      return {
        label: O || g(B, J.concat(String(T + 1))),
        value: T
      };
    });
    return d.jsxs("div", { className: "panel panel-default panel-body", children: [d.jsx("div", { className: "form-group", children: d.jsx(D, { id: this.getFieldId(), name: `${r}${c.oneOf ? "__oneof_select" : "__anyof_select"}`, schema: { type: "number", default: 0 }, onChange: this.onOptionChange, onBlur: i, onFocus: o, disabled: n || Or(k), multiple: !1, rawErrors: M, errorSchema: U, value: v >= 0 ? v : void 0, options: { enumOptions: k, ...A }, registry: u, formContext: a, placeholder: x, autocomplete: N, autofocus: E, label: R ?? r, hideLabel: !z, readonly: l }) }), I && I.type !== "null" && d.jsx(p, { ...this.props, schema: I, uiSchema: L })] });
  }
}
const RR = /\.([0-9]*0)*$/, MR = /[0.]0*$/;
function LR(e) {
  const { registry: t, onChange: r, formData: n, value: s } = e, [a, i] = ve(s), { StringField: o } = t.fields;
  let l = n;
  const u = ne((c, f, m) => {
    i(c), `${c}`.charAt(0) === "." && (c = `0${c}`);
    const h = typeof c == "string" && c.match(RR) ? lc(c.replace(MR, "")) : lc(c);
    r(h, f, m);
  }, [r]);
  if (typeof a == "string" && typeof l == "number") {
    const c = new RegExp(`^(${String(l).replace(".", "\\.")})?\\.?0*$`);
    a.match(c) && (l = a);
  }
  return d.jsx(o, { ...e, formData: l, onChange: u });
}
function Yt() {
  return Yt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Yt.apply(this, arguments);
}
const UR = ["children", "options"], sd = ["allowFullScreen", "allowTransparency", "autoComplete", "autoFocus", "autoPlay", "cellPadding", "cellSpacing", "charSet", "classId", "colSpan", "contentEditable", "contextMenu", "crossOrigin", "encType", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "hrefLang", "inputMode", "keyParams", "keyType", "marginHeight", "marginWidth", "maxLength", "mediaGroup", "minLength", "noValidate", "radioGroup", "readOnly", "rowSpan", "spellCheck", "srcDoc", "srcLang", "srcSet", "tabIndex", "useMap"].reduce((e, t) => (e[t.toLowerCase()] = t, e), { class: "className", for: "htmlFor" }), ad = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: "“" }, WR = ["style", "script", "pre"], VR = ["src", "href", "data", "formAction", "srcDoc", "action"], zR = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi, BR = /\n{2,}$/, id = /^(\s*>[\s\S]*?)(?=\n\n|$)/, qR = /^ *> ?/gm, KR = /^(?:\[!([^\]]*)\]\n)?([\s\S]*)/, GR = /^ {2,}\n/, HR = /^(?:([-*_])( *\1){2,}) *(?:\n *)+\n/, od = /^(?: {1,3})?(`{3,}|~{3,}) *(\S+)? *([^\n]*?)?\n([\s\S]*?)(?:\1\n?|$)/, ld = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/, JR = /^(`+)((?:\\`|(?!\1)`|[^`])+)\1/, YR = /^(?:\n *)*\n/, ZR = /\r\n?/g, XR = /^\[\^([^\]]+)](:(.*)((\n+ {4,}.*)|(\n(?!\[\^).+))*)/, QR = /^\[\^([^\]]+)]/, e3 = /\f/g, t3 = /^---[ \t]*\n(.|\n)*\n---[ \t]*\n/, r3 = /^\s*?\[(x|\s)\]/, cd = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, ud = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, dd = /^([^\n]+)\n *(=|-)\2{2,} *\n/, ai = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?((?:[^>]*[^/])?)>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1\b)[\s\S])*?)<\/\1>(?!<\/\1>)\n*/i, n3 = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, fd = /^<!--[\s\S]*?(?:-->)/, s3 = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/, ii = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i, a3 = /^\{.*\}$/, i3 = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, o3 = /^<([^ >]+[:@\/][^ >]+)>/, l3 = /-([a-z])?/gi, pd = /^(\|.*)\n(?: *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*))?\n?/, c3 = /^[^\n]+(?:  \n|\n{2,})/, u3 = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/, d3 = /^!\[([^\]]*)\] ?\[([^\]]*)\]/, f3 = /^\[([^\]]*)\] ?\[([^\]]*)\]/, p3 = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/, h3 = /\t/g, m3 = /(^ *\||\| *$)/g, g3 = /^ *:-+: *$/, y3 = /^ *:-+ *$/, v3 = /^ *-+: *$/, Ta = (e) => `(?=[\\s\\S]+?\\1${e ? "\\1" : ""})`, Ia = "((?:\\[.*?\\][([].*?[)\\]]|<.*?>(?:.*?<.*?>)?|`.*?`|\\\\\\1|[\\s\\S])+?)", b3 = RegExp(`^([*_])\\1${Ta(1)}${Ia}\\1\\1(?!\\1)`), $3 = RegExp(`^([*_])${Ta(0)}${Ia}\\1(?!\\1)`), w3 = RegExp(`^(==)${Ta(0)}${Ia}\\1`), _3 = RegExp(`^(~~)${Ta(0)}${Ia}\\1`), x3 = /^(:[a-zA-Z0-9-_]+:)/, S3 = /^\\([^0-9A-Za-z\s])/, j3 = /\\([^0-9A-Za-z\s])/g, E3 = /^[\s\S](?:(?!  \n|[0-9]\.|http)[^=*_~\-\n:<`\\\[!])*/, O3 = /^\n+/, N3 = /^([ \t]*)/, A3 = /(?:^|\n)( *)$/, il = "(?:\\d+\\.)", ol = "(?:[*+-])";
function Nh(e) {
  return "( *)(" + (e === 1 ? il : ol) + ") +";
}
const Ah = Nh(1), Ph = Nh(2);
function Ch(e) {
  return RegExp("^" + (e === 1 ? Ah : Ph));
}
const P3 = Ch(1), C3 = Ch(2);
function Th(e) {
  return RegExp("^" + (e === 1 ? Ah : Ph) + "[^\\n]*(?:\\n(?!\\1" + (e === 1 ? il : ol) + " )[^\\n]*)*(\\n|$)", "gm");
}
const T3 = Th(1), I3 = Th(2);
function Ih(e) {
  const t = e === 1 ? il : ol;
  return RegExp("^( *)(" + t + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + t + " (?!" + t + " ))\\n*|\\s*\\n*$)");
}
const Fh = Ih(1), kh = Ih(2);
function hd(e, t) {
  const r = t === 1, n = r ? Fh : kh, s = r ? T3 : I3, a = r ? P3 : C3;
  return { t: (i) => a.test(i), o: Tr(function(i, o) {
    const l = A3.exec(o.prevCapture);
    return l && (o.list || !o.inline && !o.simple) ? n.exec(i = l[1] + i) : null;
  }), i: 1, u(i, o, l) {
    const u = r ? +i[2] : void 0, c = i[0].replace(BR, `
`).match(s);
    let f = !1;
    return { items: c.map(function(m, h) {
      const g = a.exec(m)[0].length, b = RegExp("^ {1," + g + "}", "gm"), y = m.replace(b, "").replace(a, ""), p = h === c.length - 1, v = y.indexOf(`

`) !== -1 || p && f;
      f = v;
      const $ = l.inline, _ = l.list;
      let x;
      l.list = !0, v ? (l.inline = !1, x = vn(y) + `

`) : (l.inline = !0, x = vn(y));
      const E = o(x, l);
      return l.inline = $, l.list = _, E;
    }), ordered: r, start: u };
  }, l: (i, o, l) => e(i.ordered ? "ol" : "ul", { key: l.key, start: i.type === "20" ? i.start : void 0 }, i.items.map(function(u, c) {
    return e("li", { key: c }, o(u, l));
  })) };
}
const F3 = RegExp(`^\\[((?:\\[[^\\[\\]]*(?:\\[[^\\[\\]]*\\][^\\[\\]]*)*\\]|[^\\[\\]])*)\\]\\(\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*\\)`), k3 = /^!\[(.*?)\]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/;
function md(e) {
  return typeof e == "string";
}
function vn(e) {
  let t = e.length;
  for (; t > 0 && e[t - 1] <= " "; ) t--;
  return e.slice(0, t);
}
function _s(e, t) {
  return e.startsWith(t);
}
function D3(e, t, r) {
  if (Array.isArray(r)) {
    for (let n = 0; n < r.length; n++) if (_s(e, r[n])) return !0;
    return !1;
  }
  return r(e, t);
}
function on(e) {
  return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
function R3(e) {
  return v3.test(e) ? "right" : g3.test(e) ? "center" : y3.test(e) ? "left" : null;
}
function gd(e, t, r, n) {
  const s = r.inTable;
  r.inTable = !0;
  let a = [[]], i = "";
  function o() {
    if (!i) return;
    const l = a[a.length - 1];
    l.push.apply(l, t(i, r)), i = "";
  }
  return e.trim().split(/(`[^`]*`|\\\||\|)/).filter(Boolean).forEach((l, u, c) => {
    l.trim() === "|" && (o(), n) ? u !== 0 && u !== c.length - 1 && a.push([]) : i += l;
  }), o(), r.inTable = s, a;
}
function M3(e, t, r) {
  r.inline = !0;
  const n = e[2] ? e[2].replace(m3, "").split("|").map(R3) : [], s = e[3] ? function(i, o, l) {
    return i.trim().split(`
`).map(function(u) {
      return gd(u, o, l, !0);
    });
  }(e[3], t, r) : [], a = gd(e[1], t, r, !!s.length);
  return r.inline = !1, s.length ? { align: n, cells: s, header: a, type: "25" } : { children: a, type: "21" };
}
function yd(e, t) {
  return e.align[t] == null ? {} : { textAlign: e.align[t] };
}
function Tr(e) {
  return e.inline = 1, e;
}
function Kt(e) {
  return Tr(function(t, r) {
    return r.inline ? e.exec(t) : null;
  });
}
function Dt(e) {
  return Tr(function(t, r) {
    return r.inline || r.simple ? e.exec(t) : null;
  });
}
function _t(e) {
  return function(t, r) {
    return r.inline || r.simple ? null : e.exec(t);
  };
}
function ls(e) {
  return Tr(function(t) {
    return e.exec(t);
  });
}
const L3 = /(javascript|vbscript|data(?!:image)):/i;
function U3(e) {
  try {
    const t = decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g, "");
    if (L3.test(t)) return null;
  } catch {
    return null;
  }
  return e;
}
function lt(e) {
  return e && e.replace(j3, "$1");
}
function xs(e, t, r) {
  const n = r.inline || !1, s = r.simple || !1;
  r.inline = !0, r.simple = !0;
  const a = e(t, r);
  return r.inline = n, r.simple = s, a;
}
function W3(e, t, r) {
  const n = r.inline || !1, s = r.simple || !1;
  r.inline = !1, r.simple = !0;
  const a = e(t, r);
  return r.inline = n, r.simple = s, a;
}
function V3(e, t, r) {
  const n = r.inline || !1;
  r.inline = !1;
  const s = e(t, r);
  return r.inline = n, s;
}
const oi = (e, t, r) => ({ children: xs(t, e[2], r) });
function li() {
  return {};
}
function ci() {
  return null;
}
function z3(...e) {
  return e.filter(Boolean).join(" ");
}
function ui(e, t, r) {
  let n = e;
  const s = t.split(".");
  for (; s.length && (n = n[s[0]], n !== void 0); ) s.shift();
  return n || r;
}
function B3(e = "", t = {}) {
  t.overrides = t.overrides || {}, t.namedCodesToUnicode = t.namedCodesToUnicode ? Yt({}, ad, t.namedCodesToUnicode) : ad;
  const r = t.slugify || on, n = t.sanitizer || U3, s = t.createElement || Y.createElement, a = [id, od, ld, t.enforceAtxHeadings ? ud : cd, dd, pd, Fh, kh], i = [...a, c3, ai, fd, ii];
  function o(p, v) {
    for (let $ = 0; $ < p.length; $++) if (p[$].test(v)) return !0;
    return !1;
  }
  function l(p, v, ...$) {
    const _ = ui(t.overrides, p + ".props", {});
    return s(function(x, E) {
      const N = ui(E, x);
      return N ? typeof N == "function" || typeof N == "object" && "render" in N ? N : ui(E, x + ".component", x) : x;
    }(p, t.overrides), Yt({}, v, _, { className: z3(v == null ? void 0 : v.className, _.className) || void 0 }), ...$);
  }
  function u(p) {
    p = p.replace(t3, "");
    let v = !1;
    t.forceInline ? v = !0 : t.forceBlock || (v = p3.test(p) === !1);
    const $ = b(g(v ? p : vn(p).replace(O3, "") + `

`, { inline: v }));
    for (; md($[$.length - 1]) && !$[$.length - 1].trim(); ) $.pop();
    if (t.wrapper === null) return $;
    const _ = t.wrapper || (v ? "span" : "div");
    let x;
    if ($.length > 1 || t.forceWrapper) x = $;
    else {
      if ($.length === 1) return x = $[0], typeof x == "string" ? l("span", { key: "outer" }, x) : x;
      x = null;
    }
    return s(_, { key: "outer" }, x);
  }
  function c(p, v) {
    if (!v || !v.trim()) return null;
    const $ = v.match(zR);
    return $ ? $.reduce(function(_, x) {
      const E = x.indexOf("=");
      if (E !== -1) {
        const N = function(M) {
          return M.indexOf("-") !== -1 && M.match(s3) === null && (M = M.replace(l3, function(U, z) {
            return z.toUpperCase();
          })), M;
        }(x.slice(0, E)).trim(), R = function(M) {
          const U = M[0];
          return (U === '"' || U === "'") && M.length >= 2 && M[M.length - 1] === U ? M.slice(1, -1) : M;
        }(x.slice(E + 1).trim()), A = sd[N] || N;
        if (A === "ref") return _;
        const D = _[A] = function(M, U, z, F) {
          return U === "style" ? function(I) {
            const C = [];
            let L = "", B = !1, J = !1, k = "";
            if (!I) return C;
            for (let T = 0; T < I.length; T++) {
              const O = I[T];
              if (O !== '"' && O !== "'" || B || (J ? O === k && (J = !1, k = "") : (J = !0, k = O)), O === "(" && L.endsWith("url") ? B = !0 : O === ")" && B && (B = !1), O !== ";" || J || B) L += O;
              else {
                const w = L.trim();
                if (w) {
                  const S = w.indexOf(":");
                  if (S > 0) {
                    const P = w.slice(0, S).trim(), V = w.slice(S + 1).trim();
                    C.push([P, V]);
                  }
                }
                L = "";
              }
            }
            const j = L.trim();
            if (j) {
              const T = j.indexOf(":");
              if (T > 0) {
                const O = j.slice(0, T).trim(), w = j.slice(T + 1).trim();
                C.push([O, w]);
              }
            }
            return C;
          }(z).reduce(function(I, [C, L]) {
            return I[C.replace(/(-[a-z])/g, (B) => B[1].toUpperCase())] = F(L, M, C), I;
          }, {}) : VR.indexOf(U) !== -1 ? F(lt(z), M, U) : (z.match(a3) && (z = lt(z.slice(1, z.length - 1))), z === "true" || z !== "false" && z);
        }(p, N, R, n);
        typeof D == "string" && (ai.test(D) || ii.test(D)) && (_[A] = u(D.trim()));
      } else x !== "style" && (_[sd[x] || x] = !0);
      return _;
    }, {}) : null;
  }
  const f = [], m = {}, h = { 0: { t: [">"], o: _t(id), i: 1, u(p, v, $) {
    const [, _, x] = p[0].replace(qR, "").match(KR);
    return { alert: _, children: v(x, $) };
  }, l(p, v, $) {
    const _ = { key: $.key };
    return p.alert && (_.className = "markdown-alert-" + r(p.alert.toLowerCase(), on), p.children.unshift({ attrs: {}, children: [{ type: "27", text: p.alert }], noInnerParse: !0, type: "11", tag: "header" })), l("blockquote", _, v(p.children, $));
  } }, 1: { t: ["  "], o: ls(GR), i: 1, u: li, l: (p, v, $) => l("br", { key: $.key }) }, 2: { t: ["--", "__", "**", "- ", "* ", "_ "], o: _t(HR), i: 1, u: li, l: (p, v, $) => l("hr", { key: $.key }) }, 3: { t: ["    "], o: _t(ld), i: 0, u: (p) => ({ lang: void 0, text: lt(vn(p[0].replace(/^ {4}/gm, ""))) }), l: (p, v, $) => l("pre", { key: $.key }, l("code", Yt({}, p.attrs, { className: p.lang ? "lang-" + p.lang : "" }), p.text)) }, 4: { t: ["```", "~~~"], o: _t(od), i: 0, u: (p) => ({ attrs: c("code", p[3] || ""), lang: p[2] || void 0, text: p[4], type: "3" }) }, 5: { t: ["`"], o: Dt(JR), i: 3, u: (p) => ({ text: lt(p[2]) }), l: (p, v, $) => l("code", { key: $.key }, p.text) }, 6: { t: ["[^"], o: _t(XR), i: 0, u: (p) => (f.push({ footnote: p[2], identifier: p[1] }), {}), l: ci }, 7: { t: ["[^"], o: Kt(QR), i: 1, u: (p) => ({ target: "#" + r(p[1], on), text: p[1] }), l: (p, v, $) => l("a", { key: $.key, href: n(p.target, "a", "href") }, l("sup", { key: $.key }, p.text)) }, 8: { t: ["[ ]", "[x]"], o: Kt(r3), i: 1, u: (p) => ({ completed: p[1].toLowerCase() === "x" }), l: (p, v, $) => l("input", { checked: p.completed, key: $.key, readOnly: !0, type: "checkbox" }) }, 9: { t: ["#"], o: _t(t.enforceAtxHeadings ? ud : cd), i: 1, u: (p, v, $) => ({ children: xs(v, p[2], $), id: r(p[2], on), level: p[1].length }), l: (p, v, $) => l("h" + p.level, { id: p.id, key: $.key }, v(p.children, $)) }, 10: { t: (p) => {
    const v = p.indexOf(`
`);
    return v > 0 && v < p.length - 1 && (p[v + 1] === "=" || p[v + 1] === "-");
  }, o: _t(dd), i: 1, u: (p, v, $) => ({ children: xs(v, p[1], $), level: p[2] === "=" ? 1 : 2, type: "9" }) }, 11: { t: ["<"], o: ls(ai), i: 1, u(p, v, $) {
    const [, _] = p[3].match(N3), x = RegExp("^" + _, "gm"), E = p[3].replace(x, ""), N = o(i, E) ? V3 : xs, R = p[1].toLowerCase(), A = WR.indexOf(R) !== -1, D = (A ? R : p[1]).trim(), M = { attrs: c(D, p[2]), noInnerParse: A, tag: D };
    if ($.inAnchor = $.inAnchor || R === "a", A) M.text = p[3];
    else {
      const U = $.inHTML;
      $.inHTML = !0, M.children = N(v, E, $), $.inHTML = U;
    }
    return $.inAnchor = !1, M;
  }, l: (p, v, $) => l(p.tag, Yt({ key: $.key }, p.attrs), p.text || (p.children ? v(p.children, $) : "")) }, 13: { t: ["<"], o: ls(ii), i: 1, u(p) {
    const v = p[1].trim();
    return { attrs: c(v, p[2] || ""), tag: v };
  }, l: (p, v, $) => l(p.tag, Yt({}, p.attrs, { key: $.key })) }, 12: { t: ["<!--"], o: ls(fd), i: 1, u: () => ({}), l: ci }, 14: { t: ["!["], o: Dt(k3), i: 1, u: (p) => ({ alt: lt(p[1]), target: lt(p[2]), title: lt(p[3]) }), l: (p, v, $) => l("img", { key: $.key, alt: p.alt || void 0, title: p.title || void 0, src: n(p.target, "img", "src") }) }, 15: { t: ["["], o: Kt(F3), i: 3, u: (p, v, $) => ({ children: W3(v, p[1], $), target: lt(p[2]), title: lt(p[3]) }), l: (p, v, $) => l("a", { key: $.key, href: n(p.target, "a", "href"), title: p.title }, v(p.children, $)) }, 16: { t: ["<"], o: Kt(o3), i: 0, u(p) {
    let v = p[1], $ = !1;
    return v.indexOf("@") !== -1 && v.indexOf("//") === -1 && ($ = !0, v = v.replace("mailto:", "")), { children: [{ text: v, type: "27" }], target: $ ? "mailto:" + v : v, type: "15" };
  } }, 17: { t: (p, v) => !v.inAnchor && !t.disableAutoLink && (_s(p, "http://") || _s(p, "https://")), o: Kt(i3), i: 0, u: (p) => ({ children: [{ text: p[1], type: "27" }], target: p[1], title: void 0, type: "15" }) }, 20: hd(l, 1), 33: hd(l, 2), 19: { t: [`
`], o: _t(YR), i: 3, u: li, l: () => `
` }, 21: { o: Tr(function(p, v) {
    if (v.inline || v.simple || v.inHTML && p.indexOf(`

`) === -1 && v.prevCapture.indexOf(`

`) === -1) return null;
    let $ = "", _ = 0;
    for (; ; ) {
      const E = p.indexOf(`
`, _), N = p.slice(_, E === -1 ? void 0 : E + 1);
      if (o(a, N) || ($ += N, E === -1 || !N.trim())) break;
      _ = E + 1;
    }
    const x = vn($);
    return x === "" ? null : [$, , x];
  }), i: 3, u: oi, l: (p, v, $) => l("p", { key: $.key }, v(p.children, $)) }, 22: { t: ["["], o: Kt(u3), i: 0, u: (p) => (m[p[1]] = { target: p[2], title: p[4] }, {}), l: ci }, 23: { t: ["!["], o: Dt(d3), i: 0, u: (p) => ({ alt: p[1] ? lt(p[1]) : void 0, ref: p[2] }), l: (p, v, $) => m[p.ref] ? l("img", { key: $.key, alt: p.alt, src: n(m[p.ref].target, "img", "src"), title: m[p.ref].title }) : null }, 24: { t: (p) => p[0] === "[" && p.indexOf("](") === -1, o: Kt(f3), i: 0, u: (p, v, $) => ({ children: v(p[1], $), fallbackChildren: p[0], ref: p[2] }), l: (p, v, $) => m[p.ref] ? l("a", { key: $.key, href: n(m[p.ref].target, "a", "href"), title: m[p.ref].title }, v(p.children, $)) : l("span", { key: $.key }, p.fallbackChildren) }, 25: { t: ["|"], o: _t(pd), i: 1, u: M3, l(p, v, $) {
    const _ = p;
    return l("table", { key: $.key }, l("thead", null, l("tr", null, _.header.map(function(x, E) {
      return l("th", { key: E, style: yd(_, E) }, v(x, $));
    }))), l("tbody", null, _.cells.map(function(x, E) {
      return l("tr", { key: E }, x.map(function(N, R) {
        return l("td", { key: R, style: yd(_, R) }, v(N, $));
      }));
    })));
  } }, 27: { o: Tr(function(p, v) {
    let $;
    return _s(p, ":") && ($ = x3.exec(p)), $ || E3.exec(p);
  }), i: 4, u(p) {
    const v = p[0];
    return { text: v.indexOf("&") === -1 ? v : v.replace(n3, ($, _) => t.namedCodesToUnicode[_] || $) };
  }, l: (p) => p.text }, 28: { t: ["**", "__"], o: Dt(b3), i: 2, u: (p, v, $) => ({ children: v(p[2], $) }), l: (p, v, $) => l("strong", { key: $.key }, v(p.children, $)) }, 29: { t: (p) => {
    const v = p[0];
    return (v === "*" || v === "_") && p[1] !== v;
  }, o: Dt($3), i: 3, u: (p, v, $) => ({ children: v(p[2], $) }), l: (p, v, $) => l("em", { key: $.key }, v(p.children, $)) }, 30: { t: ["\\"], o: Dt(S3), i: 1, u: (p) => ({ text: p[1], type: "27" }) }, 31: { t: ["=="], o: Dt(w3), i: 3, u: oi, l: (p, v, $) => l("mark", { key: $.key }, v(p.children, $)) }, 32: { t: ["~~"], o: Dt(_3), i: 3, u: oi, l: (p, v, $) => l("del", { key: $.key }, v(p.children, $)) } };
  t.disableParsingRawHTML === !0 && (delete h[11], delete h[13]);
  const g = function(p) {
    var v = Object.keys(p);
    function $(_, x) {
      var E = [];
      if (x.prevCapture = x.prevCapture || "", _.trim()) for (; _; ) for (var N = 0; N < v.length; ) {
        var R = v[N], A = p[R];
        if (!A.t || D3(_, x, A.t)) {
          var D = A.o(_, x);
          if (D && D[0]) {
            _ = _.substring(D[0].length);
            var M = A.u(D, $, x);
            x.prevCapture += D[0], M.type || (M.type = R), E.push(M);
            break;
          }
          N++;
        } else N++;
      }
      return x.prevCapture = "", E;
    }
    return v.sort(function(_, x) {
      return p[_].i - p[x].i || (_ < x ? -1 : 1);
    }), function(_, x) {
      return $(function(E) {
        return E.replace(ZR, `
`).replace(e3, "").replace(h3, "    ");
      }(_), x);
    };
  }(h), b = /* @__PURE__ */ function(p, v) {
    return function $(_, x = {}) {
      if (Array.isArray(_)) {
        const E = x.key, N = [];
        let R = !1;
        for (let A = 0; A < _.length; A++) {
          x.key = A;
          const D = $(_[A], x), M = md(D);
          M && R ? N[N.length - 1] += D : D !== null && N.push(D), R = M;
        }
        return x.key = E, N;
      }
      return function(E, N, R) {
        const A = p[E.type].l;
        return v ? v(() => A(E, N, R), E, N, R) : A(E, N, R);
      }(_, $, x);
    };
  }(h, t.renderRule), y = u(e);
  return f.length ? l("div", null, y, l("footer", { key: "footer" }, f.map(function(p) {
    return l("div", { id: r(p.identifier, on), key: p.identifier }, p.identifier, b(g(p.footnote, { inline: !0 })));
  }))) : y;
}
const Fa = (e) => {
  let { children: t, options: r } = e, n = function(s, a) {
    if (s == null) return {};
    var i, o, l = {}, u = Object.keys(s);
    for (o = 0; o < u.length; o++) a.indexOf(i = u[o]) >= 0 || (l[i] = s[i]);
    return l;
  }(e, UR);
  return Y.cloneElement(B3(t ?? "", r), n);
};
function q3(e, t) {
  return e == null ? !0 : Nf(e, t);
}
class K3 extends Fn {
  constructor() {
    super(...arguments);
    /** Set up the initial state */
    de(this, "state", {
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
    de(this, "onPropertyChange", (r, n = !1) => (s, a, i) => {
      const { formData: o, onChange: l, errorSchema: u } = this.props;
      s === void 0 && n && (s = "");
      const c = { ...o, [r]: s };
      l(c, u && u && {
        ...u,
        [r]: a
      }, i);
    });
    /** Returns a callback to handle the onDropPropertyClick event for the given `key` which removes the old `key` data
     * and calls the `onChange` callback with it
     *
     * @param key - The key for which the drop callback is desired
     * @returns - The drop property click callback
     */
    de(this, "onDropPropertyClick", (r) => (n) => {
      n.preventDefault();
      const { onChange: s, formData: a } = this.props, i = { ...a };
      q3(i, r), s(i);
    });
    /** Computes the next available key name from the `preferredKey`, indexing through the already existing keys until one
     * that is already not assigned is found.
     *
     * @param preferredKey - The preferred name of a new key
     * @param [formData] - The form data in which to check if the desired key already exists
     * @returns - The name of the next available key from `preferredKey`
     */
    de(this, "getAvailableKey", (r, n) => {
      const { uiSchema: s, registry: a } = this.props, { duplicateKeySuffixSeparator: i = "-" } = se(s, a.globalUiOptions);
      let o = 0, l = r;
      for (; Ue(n, l); )
        l = `${r}${i}${++o}`;
      return l;
    });
    /** Returns a callback function that deals with the rename of a key for an additional property for a schema. That
     * callback will attempt to rename the key and move the existing data to that key, calling `onChange` when it does.
     *
     * @param oldValue - The old value of a field
     * @returns - The key change callback function
     */
    de(this, "onKeyChange", (r) => (n, s) => {
      if (r === n)
        return;
      const { formData: a, onChange: i, errorSchema: o } = this.props;
      n = this.getAvailableKey(n, a);
      const l = {
        ...a
      }, u = { [r]: n }, c = Object.keys(l).map((m) => ({ [u[m] || m]: l[m] })), f = Object.assign({}, ...c);
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
    de(this, "handleAddClick", (r) => () => {
      if (!r.additionalProperties)
        return;
      const { formData: n, onChange: s, registry: a } = this.props, i = { ...n };
      let o, l, u;
      if (be(r.additionalProperties)) {
        o = r.additionalProperties.type, l = r.additionalProperties.const, u = r.additionalProperties.default;
        let m = r.additionalProperties;
        if (Ae in m) {
          const { schemaUtils: h } = a;
          m = h.retrieveSchema({ $ref: m[Ae] }, n), o = m.type, l = m.const, u = m.default;
        }
        !o && (nt in m || Be in m) && (o = "object");
      }
      const c = this.getAvailableKey("newKey", i), f = l ?? u ?? this.getDefaultValue(o);
      Ie(i, c, f), s(i);
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
        return n(pe.NewStringDefault);
    }
  }
  /** Renders the `ObjectField` from the given props
   */
  render() {
    const { schema: r, uiSchema: n = {}, formData: s, errorSchema: a, idSchema: i, name: o, required: l = !1, disabled: u, readonly: c, hideError: f, idPrefix: m, idSeparator: h, onBlur: g, onFocus: b, registry: y, title: p } = this.props, { fields: v, formContext: $, schemaUtils: _, translateString: x, globalUiOptions: E } = y, { SchemaField: N } = v, R = _.retrieveSchema(r, s), A = se(n, E), { properties: D = {} } = R, M = A.title ?? R.title ?? p ?? o, U = A.description ?? R.description;
    let z;
    try {
      const C = Object.keys(D);
      z = $R(C, A.order);
    } catch (C) {
      return d.jsxs("div", { children: [d.jsx("p", { className: "config-error", style: { color: "red" }, children: d.jsx(Fa, { options: { disableParsingRawHTML: !0 }, children: x(pe.InvalidObjectField, [o || "root", C.message]) }) }), d.jsx("pre", { children: JSON.stringify(R) })] });
    }
    const F = le("ObjectFieldTemplate", y, A), I = {
      // getDisplayLabel() always returns false for object types, so just check the `uiOptions.label`
      title: A.label === !1 ? "" : M,
      description: A.label === !1 ? void 0 : U,
      properties: z.map((C) => {
        const L = Ue(R, [Ee, C, Mn]), B = L ? n.additionalProperties : n[C], J = se(B).widget === "hidden", k = K(i, [C], {});
        return {
          content: d.jsx(N, { name: C, required: this.isRequired(C), schema: K(R, [Ee, C], {}), uiSchema: B, errorSchema: K(a, C), idSchema: k, idPrefix: m, idSeparator: h, formData: K(s, C), formContext: $, wasPropertyKeyModified: this.state.wasPropertyKeyModified, onKeyChange: this.onKeyChange(C), onChange: this.onPropertyChange(C, L), onBlur: g, onFocus: b, registry: y, disabled: u, readonly: c, hideError: f, onDropPropertyClick: this.onDropPropertyClick }, C),
          name: C,
          readonly: c,
          disabled: u,
          required: l,
          hidden: J
        };
      }),
      readonly: c,
      disabled: u,
      required: l,
      idSchema: i,
      uiSchema: n,
      errorSchema: a,
      schema: R,
      formData: s,
      formContext: $,
      registry: y
    };
    return d.jsx(F, { ...I, onAddClick: this.handleAddClick });
  }
}
const G3 = {
  array: "ArrayField",
  boolean: "BooleanField",
  integer: "NumberField",
  number: "NumberField",
  object: "ObjectField",
  string: "StringField",
  null: "NullField"
};
function H3(e, t, r, n) {
  const s = t.field, { fields: a, translateString: i } = n;
  if (typeof s == "function")
    return s;
  if (typeof s == "string" && s in a)
    return a[s];
  const o = Nt(e), l = Array.isArray(o) ? o[0] : o || "", u = e.$id;
  let c = G3[l];
  return u && u in a && (c = u), !c && (e.anyOf || e.oneOf) ? () => null : c in a ? a[c] : () => {
    const f = le("UnsupportedFieldTemplate", n, t);
    return d.jsx(f, { schema: e, idSchema: r, reason: i(pe.UnknownFieldType, [String(e.type)]), registry: n });
  };
}
function J3(e) {
  const { schema: t, idSchema: r, uiSchema: n, formData: s, errorSchema: a, idPrefix: i, idSeparator: o, name: l, onChange: u, onKeyChange: c, onDropPropertyClick: f, required: m, registry: h, wasPropertyKeyModified: g = !1 } = e, { formContext: b, schemaUtils: y, globalUiOptions: p } = h, v = se(n, p), $ = le("FieldTemplate", h, v), _ = le("DescriptionFieldTemplate", h, v), x = le("FieldHelpTemplate", h, v), E = le("FieldErrorTemplate", h, v), N = y.retrieveSchema(t, s), R = r[Ut], A = xt(y.toIdSchema(N, R, s, i, o), r), D = ne((Se, ke, ot) => u(Se, ke, ot || R), [R, u]), M = H3(N, v, A, h), U = !!(v.disabled ?? e.disabled), z = !!(v.readonly ?? (e.readonly || e.schema.readOnly || N.readOnly)), F = v.hideError, I = F === void 0 ? e.hideError : !!F, C = !!(v.autofocus ?? e.autofocus);
  if (Object.keys(N).length === 0)
    return null;
  const L = y.getDisplayLabel(N, n, p), { __errors: B, ...J } = a || {}, k = Is(n, ["ui:classNames", "classNames", "ui:style"]);
  hn in k && (k[hn] = Is(k[hn], ["classNames", "style"]));
  const j = d.jsx(M, { ...e, onChange: D, idSchema: A, schema: N, uiSchema: k, disabled: U, readonly: z, hideError: I, autofocus: C, errorSchema: J, formContext: b, rawErrors: B }), T = A[Ut];
  let O;
  g ? O = l : O = Mn in N ? l : v.title || e.schema.title || N.title || e.title || l;
  const w = v.description || e.schema.description || N.description || "", S = v.enableMarkdownInDescription ? d.jsx(Fa, { options: { disableParsingRawHTML: !0 }, children: w }) : w, P = v.help, V = v.widget === "hidden", q = ["form-group", "field", `field-${Nt(N)}`];
  !I && B && B.length > 0 && q.push("field-error has-error has-danger"), n != null && n.classNames && q.push(n.classNames), v.classNames && q.push(v.classNames);
  const te = d.jsx(x, { help: P, idSchema: A, schema: N, uiSchema: n, hasErrors: !I && B && B.length > 0, registry: h }), Z = I || (N.anyOf || N.oneOf) && !y.isSelect(N) ? void 0 : d.jsx(E, { errors: B, errorSchema: a, idSchema: A, schema: N, uiSchema: n, registry: h }), he = {
    description: d.jsx(_, { id: Yn(T), description: S, schema: N, uiSchema: n, registry: h }),
    rawDescription: w,
    help: te,
    rawHelp: typeof P == "string" ? P : void 0,
    errors: Z,
    rawErrors: I ? void 0 : B,
    id: T,
    label: O,
    hidden: V,
    onChange: u,
    onKeyChange: c,
    onDropPropertyClick: f,
    required: m,
    disabled: U,
    readonly: z,
    hideError: I,
    displayLabel: L,
    classNames: q.join(" ").trim(),
    style: v.style,
    formContext: b,
    formData: s,
    schema: N,
    uiSchema: n,
    registry: h
  }, ue = h.fields.AnyOfField, me = h.fields.OneOfField, Re = (n == null ? void 0 : n["ui:field"]) && (n == null ? void 0 : n["ui:fieldReplacesAnyOrOneOf"]) === !0;
  return d.jsx($, { ...he, children: d.jsxs(d.Fragment, { children: [j, N.anyOf && !Re && !y.isSelect(N) && d.jsx(ue, { name: l, disabled: U, readonly: z, hideError: I, errorSchema: a, formData: s, formContext: b, idPrefix: i, idSchema: A, idSeparator: o, onBlur: e.onBlur, onChange: e.onChange, onFocus: e.onFocus, options: N.anyOf.map((Se) => y.retrieveSchema(be(Se) ? Se : {}, s)), registry: h, required: m, schema: N, uiSchema: n }), N.oneOf && !Re && !y.isSelect(N) && d.jsx(me, { name: l, disabled: U, readonly: z, hideError: I, errorSchema: a, formData: s, formContext: b, idPrefix: i, idSchema: A, idSeparator: o, onBlur: e.onBlur, onChange: e.onChange, onFocus: e.onFocus, options: N.oneOf.map((Se) => y.retrieveSchema(be(Se) ? Se : {}, s)), registry: h, required: m, schema: N, uiSchema: n })] }) });
}
class Y3 extends Fn {
  shouldComponentUpdate(t) {
    return !_e(this.props, t);
  }
  render() {
    return d.jsx(J3, { ...this.props });
  }
}
function Z3(e) {
  const { schema: t, name: r, uiSchema: n, idSchema: s, formData: a, required: i, disabled: o = !1, readonly: l = !1, autofocus: u = !1, onChange: c, onBlur: f, onFocus: m, registry: h, rawErrors: g, hideError: b } = e, { title: y, format: p } = t, { widgets: v, formContext: $, schemaUtils: _, globalUiOptions: x } = h, E = _.isSelect(t) ? Pn(t, n) : void 0;
  let N = E ? "select" : "text";
  p && yR(t, p, v) && (N = p);
  const { widget: R = N, placeholder: A = "", title: D, ...M } = se(n), U = _.getDisplayLabel(t, n, x), z = D ?? y ?? r, F = St(t, R, v);
  return d.jsx(F, { options: { ...M, enumOptions: E }, schema: t, uiSchema: n, id: s.$id, name: r, label: z, hideLabel: !U, hideError: b, value: a, onChange: c, onBlur: f, onFocus: m, required: i, disabled: o, readonly: l, formContext: $, autofocus: u, registry: h, placeholder: A, rawErrors: g });
}
function X3(e) {
  const { formData: t, onChange: r } = e;
  return tt(() => {
    t === void 0 && r(null);
  }, [t, r]), null;
}
function Q3() {
  return {
    AnyOfField: nd,
    ArrayField: kR,
    // ArrayField falls back to SchemaField if ArraySchemaField is not defined, which it isn't by default
    BooleanField: DR,
    NumberField: LR,
    ObjectField: K3,
    OneOfField: nd,
    SchemaField: Y3,
    StringField: Z3,
    NullField: X3
  };
}
function eM(e) {
  const { idSchema: t, description: r, registry: n, schema: s, uiSchema: a } = e, i = se(a, n.globalUiOptions), { label: o = !0 } = i;
  if (!r || !o)
    return null;
  const l = le("DescriptionFieldTemplate", n, i);
  return d.jsx(l, { id: Yn(t), description: r, schema: s, uiSchema: a, registry: n });
}
function tM(e) {
  const { children: t, className: r, disabled: n, hasToolbar: s, hasMoveDown: a, hasMoveUp: i, hasRemove: o, hasCopy: l, index: u, onCopyIndexClick: c, onDropIndexClick: f, onReorderClick: m, readonly: h, registry: g, uiSchema: b } = e, { CopyButton: y, MoveDownButton: p, MoveUpButton: v, RemoveButton: $ } = g.templates.ButtonTemplates, _ = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: "bold"
  };
  return d.jsxs("div", { className: r, children: [d.jsx("div", { className: s ? "col-xs-9" : "col-xs-12", children: t }), s && d.jsx("div", { className: "col-xs-3 array-item-toolbox", children: d.jsxs("div", { className: "btn-group", style: {
    display: "flex",
    justifyContent: "space-around"
  }, children: [(i || a) && d.jsx(v, { style: _, disabled: n || h || !i, onClick: m(u, u - 1), uiSchema: b, registry: g }), (i || a) && d.jsx(p, { style: _, disabled: n || h || !a, onClick: m(u, u + 1), uiSchema: b, registry: g }), l && d.jsx(y, { style: _, disabled: n || h, onClick: c(u), uiSchema: b, registry: g }), o && d.jsx($, { style: _, disabled: n || h, onClick: f(u), uiSchema: b, registry: g })] }) })] });
}
function rM(e) {
  const { canAdd: t, className: r, disabled: n, idSchema: s, uiSchema: a, items: i, onAddClick: o, readonly: l, registry: u, required: c, schema: f, title: m } = e, h = se(a), g = le("ArrayFieldDescriptionTemplate", u, h), b = le("ArrayFieldItemTemplate", u, h), y = le("ArrayFieldTitleTemplate", u, h), { ButtonTemplates: { AddButton: p } } = u.templates;
  return d.jsxs("fieldset", { className: r, id: s.$id, children: [d.jsx(y, { idSchema: s, title: h.title || m, required: c, schema: f, uiSchema: a, registry: u }), d.jsx(g, { idSchema: s, description: h.description || f.description, schema: f, uiSchema: a, registry: u }), d.jsx("div", { className: "row array-item-list", children: i && i.map(({ key: v, ...$ }) => d.jsx(b, { ...$ }, v)) }), t && d.jsx(p, { className: "array-item-add", onClick: o, disabled: n || l, uiSchema: a, registry: u })] });
}
function nM(e) {
  const { idSchema: t, title: r, schema: n, uiSchema: s, required: a, registry: i } = e, o = se(s, i.globalUiOptions), { label: l = !0 } = o;
  if (!r || !l)
    return null;
  const u = le("TitleFieldTemplate", i, o);
  return d.jsx(u, { id: Sh(t), title: r, required: a, schema: n, uiSchema: s, registry: i });
}
function sM(e) {
  const {
    id: t,
    name: r,
    // remove this from ...rest
    value: n,
    readonly: s,
    disabled: a,
    autofocus: i,
    onBlur: o,
    onFocus: l,
    onChange: u,
    onChangeOverride: c,
    options: f,
    schema: m,
    uiSchema: h,
    formContext: g,
    registry: b,
    rawErrors: y,
    type: p,
    hideLabel: v,
    // remove this from ...rest
    hideError: $,
    // remove this from ...rest
    ..._
  } = e;
  if (!t)
    throw console.log("No id for", e), new Error(`no id for props ${JSON.stringify(e)}`);
  const x = {
    ..._,
    ...cR(m, p, f)
  };
  let E;
  x.type === "number" || x.type === "integer" ? E = n || n === 0 ? n : "" : E = n ?? "";
  const N = ne(({ target: { value: D } }) => u(D === "" ? f.emptyValue : D), [u, f]), R = ne(({ target: D }) => o(t, D && D.value), [o, t]), A = ne(({ target: D }) => l(t, D && D.value), [l, t]);
  return d.jsxs(d.Fragment, { children: [d.jsx("input", { id: t, name: t, className: "form-control", readOnly: s, disabled: a, autoFocus: i, value: E, ...x, list: m.examples ? Ri(t) : void 0, onChange: c || N, onBlur: R, onFocus: A, "aria-describedby": pr(t, !!m.examples) }), Array.isArray(m.examples) && d.jsx("datalist", { id: Ri(t), children: m.examples.concat(m.default && !m.examples.includes(m.default) ? [m.default] : []).map((D) => d.jsx("option", { value: D }, D)) }, `datalist_${t}`)] });
}
function aM({ uiSchema: e }) {
  const { submitText: t, norender: r, props: n = {} } = uR(e);
  return r ? null : d.jsx("div", { children: d.jsx("button", { type: "submit", ...n, className: `btn btn-info ${n.className || ""}`, children: t }) });
}
function Zn(e) {
  const { iconType: t = "default", icon: r, className: n, uiSchema: s, registry: a, ...i } = e;
  return d.jsx("button", { type: "button", className: `btn btn-${t} ${n}`, ...i, children: d.jsx("i", { className: `glyphicon glyphicon-${r}` }) });
}
function iM(e) {
  const { registry: { translateString: t } } = e;
  return d.jsx(Zn, { title: t(pe.CopyButton), className: "array-item-copy", ...e, icon: "copy" });
}
function oM(e) {
  const { registry: { translateString: t } } = e;
  return d.jsx(Zn, { title: t(pe.MoveDownButton), className: "array-item-move-down", ...e, icon: "arrow-down" });
}
function lM(e) {
  const { registry: { translateString: t } } = e;
  return d.jsx(Zn, { title: t(pe.MoveUpButton), className: "array-item-move-up", ...e, icon: "arrow-up" });
}
function cM(e) {
  const { registry: { translateString: t } } = e;
  return d.jsx(Zn, { title: t(pe.RemoveButton), className: "array-item-remove", ...e, iconType: "danger", icon: "remove" });
}
function uM({ className: e, onClick: t, disabled: r, registry: n }) {
  const { translateString: s } = n;
  return d.jsx("div", { className: "row", children: d.jsx("p", { className: `col-xs-3 col-xs-offset-9 text-right ${e}`, children: d.jsx(Zn, { iconType: "info", icon: "plus", className: "btn-add col-xs-12", title: s(pe.AddButton), onClick: t, disabled: r, registry: n }) }) });
}
function dM() {
  return {
    SubmitButton: aM,
    AddButton: uM,
    CopyButton: iM,
    MoveDownButton: oM,
    MoveUpButton: lM,
    RemoveButton: cM
  };
}
function fM(e) {
  const { id: t, description: r } = e;
  return r ? typeof r == "string" ? d.jsx("p", { id: t, className: "field-description", children: r }) : d.jsx("div", { id: t, className: "field-description", children: r }) : null;
}
function pM({ errors: e, registry: t }) {
  const { translateString: r } = t;
  return d.jsxs("div", { className: "panel panel-danger errors", children: [d.jsx("div", { className: "panel-heading", children: d.jsx("h3", { className: "panel-title", children: r(pe.ErrorsLabel) }) }), d.jsx("ul", { className: "list-group", children: e.map((n, s) => d.jsx("li", { className: "list-group-item text-danger", children: n.stack }, s)) })] });
}
const hM = "*";
function Dh(e) {
  const { label: t, required: r, id: n } = e;
  return t ? d.jsxs("label", { className: "control-label", htmlFor: n, children: [t, r && d.jsx("span", { className: "required", children: hM })] }) : null;
}
function mM(e) {
  const { id: t, label: r, children: n, errors: s, help: a, description: i, hidden: o, required: l, displayLabel: u, registry: c, uiSchema: f } = e, m = se(f), h = le("WrapIfAdditionalTemplate", c, m);
  return o ? d.jsx("div", { className: "hidden", children: n }) : d.jsxs(h, { ...e, children: [u && d.jsx(Dh, { label: r, required: l, id: t }), u && i ? i : null, n, s, a] });
}
function gM(e) {
  const { errors: t = [], idSchema: r } = e;
  if (t.length === 0)
    return null;
  const n = _h(r);
  return d.jsx("div", { children: d.jsx("ul", { id: n, className: "error-detail bs-callout bs-callout-info", children: t.filter((s) => !!s).map((s, a) => d.jsx("li", { className: "text-danger", children: s }, a)) }) });
}
function yM(e) {
  const { idSchema: t, help: r } = e;
  if (!r)
    return null;
  const n = xh(t);
  return typeof r == "string" ? d.jsx("p", { id: n, className: "help-block", children: r }) : d.jsx("div", { id: n, className: "help-block", children: r });
}
function vM(e) {
  const { description: t, disabled: r, formData: n, idSchema: s, onAddClick: a, properties: i, readonly: o, registry: l, required: u, schema: c, title: f, uiSchema: m } = e, h = se(m), g = le("TitleFieldTemplate", l, h), b = le("DescriptionFieldTemplate", l, h), { ButtonTemplates: { AddButton: y } } = l.templates;
  return d.jsxs("fieldset", { id: s.$id, children: [f && d.jsx(g, { id: Sh(s), title: f, required: u, schema: c, uiSchema: m, registry: l }), t && d.jsx(b, { id: Yn(s), description: t, schema: c, uiSchema: m, registry: l }), i.map((p) => p.content), Qg(c, m, n) && d.jsx(y, { className: "object-property-expand", onClick: a(c), disabled: r || o, uiSchema: m, registry: l })] });
}
const bM = "*";
function $M(e) {
  const { id: t, title: r, required: n } = e;
  return d.jsxs("legend", { id: t, children: [r, n && d.jsx("span", { className: "required", children: bM })] });
}
function wM(e) {
  const { schema: t, idSchema: r, reason: n, registry: s } = e, { translateString: a } = s;
  let i = pe.UnsupportedField;
  const o = [];
  return r && r.$id && (i = pe.UnsupportedFieldWithId, o.push(r.$id)), n && (i = i === pe.UnsupportedField ? pe.UnsupportedFieldWithReason : pe.UnsupportedFieldWithIdAndReason, o.push(n)), d.jsxs("div", { className: "unsupported-field", children: [d.jsx("p", { children: d.jsx(Fa, { options: { disableParsingRawHTML: !0 }, children: a(i, o) }) }), t && d.jsx("pre", { children: JSON.stringify(t, null, 2) })] });
}
function _M(e) {
  const { id: t, classNames: r, style: n, disabled: s, label: a, onKeyChange: i, onDropPropertyClick: o, readonly: l, required: u, schema: c, children: f, uiSchema: m, registry: h } = e, { templates: g, translateString: b } = h, { RemoveButton: y } = g.ButtonTemplates, p = b(pe.KeyLabel, [a]);
  return Mn in c ? d.jsx("div", { className: r, style: n, children: d.jsxs("div", { className: "row", children: [d.jsx("div", { className: "col-xs-5 form-additional", children: d.jsxs("div", { className: "form-group", children: [d.jsx(Dh, { label: p, required: u, id: `${t}-key` }), d.jsx("input", { className: "form-control", type: "text", id: `${t}-key`, onBlur: ({ target: $ }) => i($ && $.value), defaultValue: a })] }) }), d.jsx("div", { className: "form-additional form-group col-xs-5", children: f }), d.jsx("div", { className: "col-xs-2", children: d.jsx(y, { className: "array-item-remove btn-block", style: { border: "0" }, disabled: s || l, onClick: o(a), uiSchema: m, registry: h }) })] }) }) : d.jsx("div", { className: r, style: n, children: f });
}
function xM() {
  return {
    ArrayFieldDescriptionTemplate: eM,
    ArrayFieldItemTemplate: tM,
    ArrayFieldTemplate: rM,
    ArrayFieldTitleTemplate: nM,
    ButtonTemplates: dM(),
    BaseInputTemplate: sM,
    DescriptionFieldTemplate: fM,
    ErrorListTemplate: pM,
    FieldTemplate: mM,
    FieldErrorTemplate: gM,
    FieldHelpTemplate: yM,
    ObjectFieldTemplate: vM,
    TitleFieldTemplate: $M,
    UnsupportedFieldTemplate: wM,
    WrapIfAdditionalTemplate: _M
  };
}
function SM(e) {
  return Object.values(e).every((t) => t !== -1);
}
function jM({ type: e, range: t, value: r, select: n, rootId: s, name: a, disabled: i, readonly: o, autofocus: l, registry: u, onBlur: c, onFocus: f }) {
  const m = s + "_" + e, { SelectWidget: h } = u.widgets;
  return d.jsx(h, { schema: { type: "integer" }, id: m, name: a, className: "form-control", options: { enumOptions: vh(t[0], t[1]) }, placeholder: e, value: r, disabled: i, readonly: o, autofocus: l, onChange: (g) => n(e, g), onBlur: c, onFocus: f, registry: u, label: "", "aria-describedby": pr(s) });
}
function EM({ time: e = !1, disabled: t = !1, readonly: r = !1, autofocus: n = !1, options: s, id: a, name: i, registry: o, onBlur: l, onFocus: u, onChange: c, value: f }) {
  const { translateString: m } = o, [h, g] = ve(f), [b, y] = Km((_, x) => ({ ..._, ...x }), si(f, e));
  tt(() => {
    const _ = ed(b, e);
    SM(b) && _ !== f ? c(_) : h !== f && (g(f), y(si(f, e)));
  }, [e, f, c, b, h]);
  const p = ne((_, x) => {
    y({ [_]: x });
  }, []), v = ne((_) => {
    if (_.preventDefault(), t || r)
      return;
    const x = si((/* @__PURE__ */ new Date()).toJSON(), e);
    c(ed(x, e));
  }, [t, r, e]), $ = ne((_) => {
    _.preventDefault(), !(t || r) && c(void 0);
  }, [t, r, c]);
  return d.jsxs("ul", { className: "list-inline", children: [oR(b, e, s.yearsRange, s.format).map((_, x) => d.jsx("li", { className: "list-inline-item", children: d.jsx(jM, { rootId: a, name: i, select: p, ..._, disabled: t, readonly: r, registry: o, onBlur: l, onFocus: u, autofocus: n && x === 0 }) }, x)), (s.hideNowButton !== "undefined" ? !s.hideNowButton : !0) && d.jsx("li", { className: "list-inline-item", children: d.jsx("a", { href: "#", className: "btn btn-info btn-now", onClick: v, children: m(pe.NowLabel) }) }), (s.hideClearButton !== "undefined" ? !s.hideClearButton : !0) && d.jsx("li", { className: "list-inline-item", children: d.jsx("a", { href: "#", className: "btn btn-warning btn-clear", onClick: $, children: m(pe.ClearLabel) }) })] });
}
function OM({ time: e = !0, ...t }) {
  const { AltDateWidget: r } = t.registry.widgets;
  return d.jsx(r, { time: e, ...t });
}
function NM({ schema: e, uiSchema: t, options: r, id: n, value: s, disabled: a, readonly: i, label: o, hideLabel: l, autofocus: u = !1, onBlur: c, onFocus: f, onChange: m, registry: h }) {
  const g = le("DescriptionFieldTemplate", h, r), b = $s(e), y = ne((_) => m(_.target.checked), [m]), p = ne((_) => c(n, _.target.checked), [c, n]), v = ne((_) => f(n, _.target.checked), [f, n]), $ = r.description ?? e.description;
  return d.jsxs("div", { className: `checkbox ${a || i ? "disabled" : ""}`, children: [!l && !!$ && d.jsx(g, { id: Yn(n), description: $, schema: e, uiSchema: t, registry: h }), d.jsxs("label", { children: [d.jsx("input", { type: "checkbox", id: n, name: n, checked: typeof s > "u" ? !1 : s, required: b, disabled: a || i, autoFocus: u, onChange: y, onBlur: p, onFocus: v, "aria-describedby": pr(n) }), vR(d.jsx("span", { children: o }), l)] })] });
}
function AM({ id: e, disabled: t, options: { inline: r = !1, enumOptions: n, enumDisabled: s, emptyValue: a }, value: i, autofocus: o = !1, readonly: l, onChange: u, onBlur: c, onFocus: f }) {
  const m = Array.isArray(i) ? i : [i], h = ne(({ target: b }) => c(e, ht(b && b.value, n, a)), [c, e]), g = ne(({ target: b }) => f(e, ht(b && b.value, n, a)), [f, e]);
  return d.jsx("div", { className: "checkboxes", id: e, children: Array.isArray(n) && n.map((b, y) => {
    const p = tl(b.value, m), v = Array.isArray(s) && s.indexOf(b.value) !== -1, $ = t || v || l ? "disabled" : "", _ = (E) => {
      E.target.checked ? u(rR(y, m, n)) : u(eR(y, m, n));
    }, x = d.jsxs("span", { children: [d.jsx("input", { type: "checkbox", id: jh(e, y), name: e, checked: p, value: String(y), disabled: t || v || l, autoFocus: o && y === 0, onChange: _, onBlur: h, onFocus: g, "aria-describedby": pr(e) }), d.jsx("span", { children: b.label })] });
    return r ? d.jsx("label", { className: `checkbox-inline ${$}`, children: x }, y) : d.jsx("div", { className: `checkbox ${$}`, children: d.jsx("label", { children: x }) }, y);
  }) });
}
function PM(e) {
  const { disabled: t, readonly: r, options: n, registry: s } = e, a = le("BaseInputTemplate", s, n);
  return d.jsx(a, { type: "color", ...e, disabled: t || r });
}
function CM(e) {
  const { onChange: t, options: r, registry: n } = e, s = le("BaseInputTemplate", n, r), a = ne((i) => t(i || void 0), [t]);
  return d.jsx(s, { type: "date", ...e, onChange: a });
}
function TM(e) {
  const { onChange: t, value: r, options: n, registry: s } = e, a = le("BaseInputTemplate", s, n);
  return d.jsx(a, { type: "datetime-local", ...e, value: xR(r), onChange: (i) => t(bR(i)) });
}
function IM(e) {
  const { options: t, registry: r } = e, n = le("BaseInputTemplate", r, t);
  return d.jsx(n, { type: "email", ...e });
}
function FM(e, t) {
  return e === null ? null : e.replace(";base64", `;name=${encodeURIComponent(t)};base64`);
}
function kM(e) {
  const { name: t, size: r, type: n } = e;
  return new Promise((s, a) => {
    const i = new window.FileReader();
    i.onerror = a, i.onload = (o) => {
      var l;
      typeof ((l = o.target) == null ? void 0 : l.result) == "string" ? s({
        dataURL: FM(o.target.result, t),
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
function DM(e) {
  return Promise.all(Array.from(e).map(kM));
}
function RM({ fileInfo: e, registry: t }) {
  const { translateString: r } = t, { dataURL: n, type: s, name: a } = e;
  return n ? ["image/jpeg", "image/png"].includes(s) ? d.jsx("img", { src: n, style: { maxWidth: "100%" }, className: "file-preview" }) : d.jsxs(d.Fragment, { children: [" ", d.jsx("a", { download: `preview-${a}`, href: n, className: "file-download", children: r(pe.PreviewLabel) })] }) : null;
}
function MM({ filesInfo: e, registry: t, preview: r, onRemove: n, options: s }) {
  if (e.length === 0)
    return null;
  const { translateString: a } = t, { RemoveButton: i } = le("ButtonTemplates", t, s);
  return d.jsx("ul", { className: "file-info", children: e.map((o, l) => {
    const { name: u, size: c, type: f } = o, m = () => n(l);
    return d.jsxs("li", { children: [d.jsx(Fa, { children: a(pe.FilesInfo, [u, f, String(c)]) }), r && d.jsx(RM, { fileInfo: o, registry: t }), d.jsx(i, { onClick: m, registry: t })] }, l);
  }) });
}
function LM(e) {
  return e.reduce((t, r) => {
    if (!r)
      return t;
    try {
      const { blob: n, name: s } = ZD(r);
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
function UM(e) {
  const { disabled: t, readonly: r, required: n, multiple: s, onChange: a, value: i, options: o, registry: l } = e, u = le("BaseInputTemplate", l, o), c = ne((h) => {
    h.target.files && DM(h.target.files).then((g) => {
      const b = g.map((y) => y.dataURL);
      a(s ? i.concat(b) : b[0]);
    });
  }, [s, i, a]), f = zd(() => LM(Array.isArray(i) ? i : [i]), [i]), m = ne((h) => {
    if (s) {
      const g = i.filter((b, y) => y !== h);
      a(g);
    } else
      a(void 0);
  }, [s, i, a]);
  return d.jsxs("div", { children: [d.jsx(u, { ...e, disabled: t || r, type: "file", required: i ? !1 : n, onChangeOverride: c, value: "", accept: o.accept ? String(o.accept) : void 0 }), d.jsx(MM, { filesInfo: f, onRemove: m, registry: l, preview: o.filePreview, options: o })] });
}
function WM({ id: e, value: t }) {
  return d.jsx("input", { type: "hidden", id: e, name: e, value: typeof t > "u" ? "" : t });
}
function VM(e) {
  const { options: t, registry: r } = e, n = le("BaseInputTemplate", r, t);
  return d.jsx(n, { type: "password", ...e });
}
function zM({ options: e, value: t, required: r, disabled: n, readonly: s, autofocus: a = !1, onBlur: i, onFocus: o, onChange: l, id: u }) {
  const { enumOptions: c, enumDisabled: f, inline: m, emptyValue: h } = e, g = ne(({ target: y }) => i(u, ht(y && y.value, c, h)), [i, u]), b = ne(({ target: y }) => o(u, ht(y && y.value, c, h)), [o, u]);
  return d.jsx("div", { className: "field-radio-group", id: u, children: Array.isArray(c) && c.map((y, p) => {
    const v = tl(y.value, t), $ = Array.isArray(f) && f.indexOf(y.value) !== -1, _ = n || $ || s ? "disabled" : "", x = () => l(y.value), E = d.jsxs("span", { children: [d.jsx("input", { type: "radio", id: jh(u, p), checked: v, name: u, required: r, value: String(p), disabled: n || $ || s, autoFocus: a && p === 0, onChange: x, onBlur: g, onFocus: b, "aria-describedby": pr(u) }), d.jsx("span", { children: y.label })] });
    return m ? d.jsx("label", { className: `radio-inline ${_}`, children: E }, p) : d.jsx("div", { className: `radio ${_}`, children: d.jsx("label", { children: E }) }, p);
  }) });
}
function BM(e) {
  const { value: t, registry: { templates: { BaseInputTemplate: r } } } = e;
  return d.jsxs("div", { className: "field-range-wrapper", children: [d.jsx(r, { type: "range", ...e }), d.jsx("span", { className: "range-view", children: t })] });
}
function di(e, t) {
  return t ? Array.from(e.target.options).slice().filter((r) => r.selected).map((r) => r.value) : e.target.value;
}
function qM({ schema: e, id: t, options: r, value: n, required: s, disabled: a, readonly: i, multiple: o = !1, autofocus: l = !1, onChange: u, onBlur: c, onFocus: f, placeholder: m }) {
  const { enumOptions: h, enumDisabled: g, emptyValue: b } = r, y = o ? [] : "", p = ne((E) => {
    const N = di(E, o);
    return f(t, ht(N, h, b));
  }, [f, t, e, o, h, b]), v = ne((E) => {
    const N = di(E, o);
    return c(t, ht(N, h, b));
  }, [c, t, e, o, h, b]), $ = ne((E) => {
    const N = di(E, o);
    return u(ht(N, h, b));
  }, [u, e, o, h, b]), _ = tR(n, h, o), x = !o && e.default === void 0;
  return d.jsxs("select", { id: t, name: t, multiple: o, className: "form-control", value: typeof _ > "u" ? y : _, required: s, disabled: a || i, autoFocus: l, onBlur: v, onFocus: p, onChange: $, "aria-describedby": pr(t), children: [x && d.jsx("option", { value: "", children: m }), Array.isArray(h) && h.map(({ value: E, label: N }, R) => {
    const A = g && g.indexOf(E) !== -1;
    return d.jsx("option", { value: String(R), disabled: A, children: N }, R);
  })] });
}
function Rh({ id: e, options: t = {}, placeholder: r, value: n, required: s, disabled: a, readonly: i, autofocus: o = !1, onChange: l, onBlur: u, onFocus: c }) {
  const f = ne(({ target: { value: g } }) => l(g === "" ? t.emptyValue : g), [l, t.emptyValue]), m = ne(({ target: g }) => u(e, g && g.value), [u, e]), h = ne(({ target: g }) => c(e, g && g.value), [e, c]);
  return d.jsx("textarea", { id: e, name: e, className: "form-control", value: n || "", placeholder: r, required: s, disabled: a, readOnly: i, autoFocus: o, rows: t.rows, onBlur: m, onFocus: h, onChange: f, "aria-describedby": pr(e) });
}
Rh.defaultProps = {
  autofocus: !1,
  options: {}
};
function KM(e) {
  const { options: t, registry: r } = e, n = le("BaseInputTemplate", r, t);
  return d.jsx(n, { ...e });
}
function GM(e) {
  const { onChange: t, options: r, registry: n } = e, s = le("BaseInputTemplate", n, r), a = ne((i) => t(i ? `${i}:00` : void 0), [t]);
  return d.jsx(s, { type: "time", ...e, onChange: a });
}
function HM(e) {
  const { options: t, registry: r } = e, n = le("BaseInputTemplate", r, t);
  return d.jsx(n, { type: "url", ...e });
}
function JM(e) {
  const { options: t, registry: r } = e, n = le("BaseInputTemplate", r, t);
  return d.jsx(n, { type: "number", ...e });
}
function YM() {
  return {
    AltDateWidget: EM,
    AltDateTimeWidget: OM,
    CheckboxWidget: NM,
    CheckboxesWidget: AM,
    ColorWidget: PM,
    DateWidget: CM,
    DateTimeWidget: TM,
    EmailWidget: IM,
    FileWidget: UM,
    HiddenWidget: WM,
    PasswordWidget: VM,
    RadioWidget: zM,
    RangeWidget: BM,
    SelectWidget: qM,
    TextWidget: KM,
    TextareaWidget: Rh,
    TimeWidget: GM,
    UpDownWidget: JM,
    URLWidget: HM
  };
}
function ZM() {
  return {
    fields: Q3(),
    templates: xM(),
    widgets: YM(),
    rootSchema: {},
    formContext: {},
    translateString: QD
  };
}
class XM extends Fn {
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
    de(this, "formElement");
    /** Returns the `formData` with only the elements specified in the `fields` list
     *
     * @param formData - The data for the `Form`
     * @param fields - The fields to keep while filtering
     */
    de(this, "getUsedFormData", (r, n) => {
      if (n.length === 0 && typeof r != "object")
        return r;
      const s = td(r, n);
      return Array.isArray(r) ? Object.keys(s).map((a) => s[a]) : s;
    });
    /** Returns the list of field names from inspecting the `pathSchema` as well as using the `formData`
     *
     * @param pathSchema - The `PathSchema` object for the form
     * @param [formData] - The form data to use while checking for empty objects/arrays
     */
    de(this, "getFieldNames", (r, n) => {
      const s = (a, i = [], o = [[]]) => (Object.keys(a).forEach((l) => {
        if (typeof a[l] == "object") {
          const u = o.map((c) => [...c, l]);
          a[l][Yi] && a[l][gs] !== "" ? i.push(a[l][gs]) : s(a[l], i, u);
        } else l === gs && a[l] !== "" && o.forEach((u) => {
          const c = K(n, u);
          (typeof c != "object" || Or(c) || Array.isArray(c) && c.every((f) => typeof f != "object")) && i.push(u);
        });
      }), i);
      return s(r);
    });
    /** Returns the `formData` after filtering to remove any extra data not in a form field
     *
     * @param formData - The data for the `Form`
     * @returns The `formData` after omitting extra data
     */
    de(this, "omitExtraData", (r) => {
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
    de(this, "onChange", (r, n, s) => {
      const { extraErrors: a, omitExtraData: i, liveOmit: o, noValidate: l, liveValidate: u, onChange: c } = this.props, { schemaUtils: f, schema: m } = this.state;
      let h = this.state.retrievedSchema;
      if (ae(r) || Array.isArray(r)) {
        const p = this.getStateFromProps(this.props, r);
        r = p.formData, h = p.retrievedSchema;
      }
      const g = !l && u;
      let b = { formData: r, schema: m }, y = r;
      if (i === !0 && o === !0 && (y = this.omitExtraData(r), b = {
        formData: y
      }), g) {
        const p = this.validate(y, m, f, h);
        let v = p.errors, $ = p.errorSchema;
        const _ = v, x = $;
        if (a) {
          const E = ws(p, a);
          $ = E.errorSchema, v = E.errors;
        }
        if (n) {
          const E = this.filterErrorsBasedOnSchema(n, h, y);
          $ = xt($, E, "preventDuplicates");
        }
        b = {
          formData: y,
          errors: v,
          errorSchema: $,
          schemaValidationErrors: _,
          schemaValidationErrorSchema: x
        };
      } else if (!l && n) {
        const p = a ? xt(n, a, "preventDuplicates") : n;
        b = {
          formData: y,
          errorSchema: p,
          errors: Cn(p)
        };
      }
      this.setState(b, () => c && c({ ...this.state, ...b }, s));
    });
    /**
     * Callback function to handle reset form data.
     * - Reset all fields with default values.
     * - Reset validations and errors
     *
     */
    de(this, "reset", () => {
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
    de(this, "onBlur", (r, n) => {
      const { onBlur: s } = this.props;
      s && s(r, n);
    });
    /** Callback function to handle when a field on the form is focused. Calls the `onFocus` callback for the `Form` if it
     * was provided.
     *
     * @param id - The unique `id` of the field that was focused
     * @param data - The data associated with the field that was focused
     */
    de(this, "onFocus", (r, n) => {
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
    de(this, "onSubmit", (r) => {
      if (r.preventDefault(), r.target !== r.currentTarget)
        return;
      r.persist();
      const { omitExtraData: n, extraErrors: s, noValidate: a, onSubmit: i } = this.props;
      let { formData: o } = this.state;
      if (n === !0 && (o = this.omitExtraData(o)), a || this.validateFormWithFormData(o)) {
        const l = s || {}, u = s ? Cn(s) : [];
        this.setState({
          formData: o,
          errors: u,
          errorSchema: l,
          schemaValidationErrors: [],
          schemaValidationErrorSchema: {}
        }, () => {
          i && i({ ...this.state, formData: o, status: "submitted" }, r);
        });
      }
    });
    /** Provides a function that can be used to programmatically submit the `Form` */
    de(this, "submit", () => {
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
    de(this, "validateFormWithFormData", (r) => {
      const { extraErrors: n, extraErrorsBlockSubmit: s, focusOnFirstError: a, onError: i } = this.props, { errors: o } = this.state, l = this.validate(r);
      let u = l.errors, c = l.errorSchema;
      const f = u, m = c, h = u.length > 0 || n && s;
      if (h) {
        if (n) {
          const g = ws(l, n);
          c = g.errorSchema, u = g.errors;
        }
        a && (typeof a == "function" ? a(u[0]) : this.focusOnError(u[0])), this.setState({
          errors: u,
          errorSchema: c,
          schemaValidationErrors: f,
          schemaValidationErrorSchema: m
        }, () => {
          i ? i(u) : console.error("Form validation failed", u);
        });
      } else o.length > 0 && this.setState({
        errors: [],
        errorSchema: {},
        schemaValidationErrors: [],
        schemaValidationErrorSchema: {}
      });
      return !h;
    });
    if (!r.validator)
      throw new Error("A validator is required for Form functionality to work");
    this.state = this.getStateFromProps(r, r.formData), this.props.onChange && !_e(this.state.formData, this.props.formData) && this.props.onChange(this.state), this.formElement = Gm();
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
    if (!_e(this.props, r)) {
      const s = PR(this.props.formData, r.formData), a = !_e(r.schema, this.props.schema), i = s.length > 0 || !_e(r.formData, this.props.formData), o = this.getStateFromProps(
        this.props,
        this.props.formData,
        // If the `schema` has changed, we need to update the retrieved schema.
        // Or if the `formData` changes, for example in the case of a schema with dependencies that need to
        //  match one of the subSchemas, the retrieved schema must be updated.
        a || i ? void 0 : this.state.retrievedSchema,
        a,
        s
      ), l = !_e(o, n);
      return { nextState: o, shouldUpdate: l };
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
      !_e(a.formData, this.props.formData) && !_e(a.formData, n.formData) && this.props.onChange && this.props.onChange(a), this.setState(a);
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
    var D;
    const o = this.state || {}, l = "schema" in r ? r.schema : this.props.schema, u = ("uiSchema" in r ? r.uiSchema : this.props.uiSchema) || {}, c = typeof n < "u", f = "liveValidate" in r ? r.liveValidate : this.props.liveValidate, m = c && !r.noValidate && f, h = l, g = "experimental_defaultFormStateBehavior" in r ? r.experimental_defaultFormStateBehavior : this.props.experimental_defaultFormStateBehavior, b = "experimental_customMergeAllOf" in r ? r.experimental_customMergeAllOf : this.props.experimental_customMergeAllOf;
    let y = o.schemaUtils;
    (!y || y.doesSchemaUtilsDiffer(r.validator, h, g, b)) && (y = YD(r.validator, h, g, b));
    const p = y.getDefaultFormState(l, n), v = this.updateRetrievedSchema(s ?? y.retrieveSchema(l, p)), $ = () => r.noValidate || a ? { errors: [], errorSchema: {} } : r.liveValidate ? {
      errors: o.errors || [],
      errorSchema: o.errorSchema || {}
    } : {
      errors: o.schemaValidationErrors || [],
      errorSchema: o.schemaValidationErrorSchema || {}
    };
    let _, x, E = o.schemaValidationErrors, N = o.schemaValidationErrorSchema;
    if (m) {
      const M = this.validate(p, l, y, v);
      _ = M.errors, s === void 0 ? x = M.errorSchema : x = xt((D = this.state) == null ? void 0 : D.errorSchema, M.errorSchema, "preventDuplicates"), E = _, N = x;
    } else {
      const M = $();
      if (_ = M.errors, x = M.errorSchema, i.length > 0) {
        const U = i.reduce((z, F) => (z[F] = void 0, z), {});
        x = N = xt(M.errorSchema, U, "preventDuplicates");
      }
    }
    if (r.extraErrors) {
      const M = ws({ errorSchema: x, errors: _ }, r.extraErrors);
      x = M.errorSchema, _ = M.errors;
    }
    const R = y.toIdSchema(v, u["ui:rootFieldId"], p, r.idPrefix, r.idSeparator);
    return {
      schemaUtils: y,
      schema: l,
      uiSchema: u,
      idSchema: R,
      formData: p,
      edit: c,
      errors: _,
      errorSchema: x,
      schemaValidationErrors: E,
      schemaValidationErrorSchema: N,
      retrievedSchema: v
    };
  }
  /** React lifecycle method that is used to determine whether component should be updated.
   *
   * @param nextProps - The next version of the props
   * @param nextState - The next version of the state
   * @returns - True if the component should be updated, false otherwise
   */
  shouldComponentUpdate(r, n) {
    return wR(this, r, n);
  }
  /** Gets the previously raised customValidate errors.
   *
   * @returns the previous customValidate errors
   */
  getPreviousCustomValidateErrors() {
    const { customValidate: r, uiSchema: n } = this.props, s = this.state.formData;
    let a = {};
    if (typeof r == "function") {
      const i = r(s, Ps(s), n);
      a = sl(i);
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
    const i = s || this.state.schemaUtils, { customValidate: o, transformErrors: l, uiSchema: u } = this.props, c = a ?? i.retrieveSchema(n, r);
    return i.getValidator().validateFormData(r, c, o, l, u);
  }
  /** Renders any errors contained in the `state` in using the `ErrorList`, if not disabled by `showErrorList`. */
  renderErrors(r) {
    const { errors: n, errorSchema: s, schema: a, uiSchema: i } = this.state, { formContext: o } = this.props, l = se(i), u = le("ErrorListTemplate", r, l);
    return n && n.length ? d.jsx(u, { errors: n, errorSchema: s || {}, schema: a, uiSchema: i, formContext: o, registry: r }) : null;
  }
  // Filtering errors based on your retrieved schema to only show errors for properties in the selected branch.
  filterErrorsBasedOnSchema(r, n, s) {
    const { retrievedSchema: a, schemaUtils: i } = this.state, o = n ?? a, l = i.toPathSchema(o, "", s), u = this.getFieldNames(l, s), c = td(r, u);
    (n == null ? void 0 : n.type) !== "object" && (n == null ? void 0 : n.type) !== "array" && (c.__errors = r.__errors);
    const f = this.getPreviousCustomValidateErrors(), m = (g = [], b) => g.length === 0 ? g : g.filter((y) => !b.includes(y)), h = (g, b = {}) => (CR(g, (y, p) => {
      const v = b[p];
      yn(y) || Array.isArray(y) && y.length === 0 ? delete g[p] : ae(y) && ae(v) && Array.isArray(v == null ? void 0 : v.__errors) ? g[p] = m(y.__errors, v.__errors) : typeof y == "object" && !Array.isArray(y.__errors) && h(y, b[p]);
    }), g);
    return h(c, f);
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
    return _e(r, (s = this.state) == null ? void 0 : s.retrievedSchema) ? this.state.retrievedSchema : r;
  }
  /** Returns the registry for the form */
  getRegistry() {
    var c;
    const { translateString: r, uiSchema: n = {} } = this.props, { schemaUtils: s } = this.state, { fields: a, templates: i, widgets: o, formContext: l, translateString: u } = ZM();
    return {
      fields: { ...a, ...this.props.fields },
      templates: {
        ...i,
        ...this.props.templates,
        ButtonTemplates: {
          ...i.ButtonTemplates,
          ...(c = this.props.templates) == null ? void 0 : c.ButtonTemplates
        }
      },
      widgets: { ...o, ...this.props.widgets },
      rootSchema: this.props.schema,
      formContext: this.props.formContext || l,
      schemaUtils: s,
      translateString: r || u,
      globalUiOptions: n[Xg]
    };
  }
  /** Attempts to focus on the field associated with the `error`. Uses the `property` field to compute path of the error
   * field, then, using the `idPrefix` and `idSeparator` converts that path into an id. Then the input element with that
   * id is attempted to be found using the `formElement` ref. If it is located, then it is focused.
   *
   * @param error - The error on which to focus
   */
  focusOnError(r) {
    const { idPrefix: n = "root", idSeparator: s = "_" } = this.props, { property: a } = r, i = Eh(a);
    i[0] === "" ? i[0] = n : i.unshift(n);
    const o = i.join(s);
    let l = this.formElement.current.elements[o];
    l || (l = this.formElement.current.querySelector(`input[id^="${o}"`)), l && l.length && (l = l[0]), l && l.focus();
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
    const { children: r, id: n, idPrefix: s, idSeparator: a, className: i = "", tagName: o, name: l, method: u, target: c, action: f, autoComplete: m, enctype: h, acceptcharset: g, acceptCharset: b, noHtml5Validate: y = !1, disabled: p, readonly: v, formContext: $, showErrorList: _ = "top", _internalFormWrapper: x } = this.props, { schema: E, uiSchema: N, formData: R, errorSchema: A, idSchema: D } = this.state, M = this.getRegistry(), { SchemaField: U } = M.fields, { SubmitButton: z } = M.templates.ButtonTemplates, F = x ? o : void 0, I = x || o || "form";
    let { [As]: C = {} } = se(N);
    p && (C = { ...C, props: { ...C.props, disabled: !0 } });
    const L = { [hn]: { [As]: C } };
    return d.jsxs(I, { className: i || "rjsf", id: n, name: l, method: u, target: c, action: f, autoComplete: m, encType: h, acceptCharset: b || g, noValidate: y, onSubmit: this.onSubmit, as: F, ref: this.formElement, children: [_ === "top" && this.renderErrors(M), d.jsx(U, { name: "", schema: E, uiSchema: N, errorSchema: A, idSchema: D, idPrefix: s, idSeparator: a, formContext: $, formData: R, onChange: this.onChange, onBlur: this.onBlur, onFocus: this.onFocus, registry: M, disabled: p, readonly: v }), r || d.jsx(z, { uiSchema: L, registry: M }), _ === "bottom" && this.renderErrors(M)] });
  }
}
var Li = { exports: {} }, Mh = {}, at = {}, Ir = {}, Xn = {}, ee = {}, Tn = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(v) {
      if (super(), !e.IDENTIFIER.test(v))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = v;
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
    constructor(v) {
      super(), this._items = typeof v == "string" ? [v] : v;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const v = this._items[0];
      return v === "" || v === '""';
    }
    get str() {
      var v;
      return (v = this._str) !== null && v !== void 0 ? v : this._str = this._items.reduce(($, _) => `${$}${_}`, "");
    }
    get names() {
      var v;
      return (v = this._names) !== null && v !== void 0 ? v : this._names = this._items.reduce(($, _) => (_ instanceof r && ($[_.str] = ($[_.str] || 0) + 1), $), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(p, ...v) {
    const $ = [p[0]];
    let _ = 0;
    for (; _ < v.length; )
      o($, v[_]), $.push(p[++_]);
    return new n($);
  }
  e._ = s;
  const a = new n("+");
  function i(p, ...v) {
    const $ = [h(p[0])];
    let _ = 0;
    for (; _ < v.length; )
      $.push(a), o($, v[_]), $.push(a, h(p[++_]));
    return l($), new n($);
  }
  e.str = i;
  function o(p, v) {
    v instanceof n ? p.push(...v._items) : v instanceof r ? p.push(v) : p.push(f(v));
  }
  e.addCodeArg = o;
  function l(p) {
    let v = 1;
    for (; v < p.length - 1; ) {
      if (p[v] === a) {
        const $ = u(p[v - 1], p[v + 1]);
        if ($ !== void 0) {
          p.splice(v - 1, 3, $);
          continue;
        }
        p[v++] = "+";
      }
      v++;
    }
  }
  function u(p, v) {
    if (v === '""')
      return p;
    if (p === '""')
      return v;
    if (typeof p == "string")
      return v instanceof r || p[p.length - 1] !== '"' ? void 0 : typeof v != "string" ? `${p.slice(0, -1)}${v}"` : v[0] === '"' ? p.slice(0, -1) + v.slice(1) : void 0;
    if (typeof v == "string" && v[0] === '"' && !(p instanceof r))
      return `"${p}${v.slice(1)}`;
  }
  function c(p, v) {
    return v.emptyStr() ? p : p.emptyStr() ? v : i`${p}${v}`;
  }
  e.strConcat = c;
  function f(p) {
    return typeof p == "number" || typeof p == "boolean" || p === null ? p : h(Array.isArray(p) ? p.join(",") : p);
  }
  function m(p) {
    return new n(h(p));
  }
  e.stringify = m;
  function h(p) {
    return JSON.stringify(p).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = h;
  function g(p) {
    return typeof p == "string" && e.IDENTIFIER.test(p) ? new n(`.${p}`) : s`[${p}]`;
  }
  e.getProperty = g;
  function b(p) {
    if (typeof p == "string" && e.IDENTIFIER.test(p))
      return new n(`${p}`);
    throw new Error(`CodeGen: invalid export name: ${p}, use explicit $id name mapping`);
  }
  e.getEsmExportName = b;
  function y(p) {
    return new n(p.toString());
  }
  e.regexpCode = y;
})(Tn);
var Ui = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Tn;
  class r extends Error {
    constructor(u) {
      super(`CodeGen: "code" for ${u} not defined`), this.value = u.value;
    }
  }
  var n;
  (function(l) {
    l[l.Started = 0] = "Started", l[l.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class s {
    constructor({ prefixes: u, parent: c } = {}) {
      this._names = {}, this._prefixes = u, this._parent = c;
    }
    toName(u) {
      return u instanceof t.Name ? u : this.name(u);
    }
    name(u) {
      return new t.Name(this._newName(u));
    }
    _newName(u) {
      const c = this._names[u] || this._nameGroup(u);
      return `${u}${c.index++}`;
    }
    _nameGroup(u) {
      var c, f;
      if (!((f = (c = this._parent) === null || c === void 0 ? void 0 : c._prefixes) === null || f === void 0) && f.has(u) || this._prefixes && !this._prefixes.has(u))
        throw new Error(`CodeGen: prefix "${u}" is not allowed in this scope`);
      return this._names[u] = { prefix: u, index: 0 };
    }
  }
  e.Scope = s;
  class a extends t.Name {
    constructor(u, c) {
      super(c), this.prefix = u;
    }
    setValue(u, { property: c, itemIndex: f }) {
      this.value = u, this.scopePath = (0, t._)`.${new t.Name(c)}[${f}]`;
    }
  }
  e.ValueScopeName = a;
  const i = (0, t._)`\n`;
  class o extends s {
    constructor(u) {
      super(u), this._values = {}, this._scope = u.scope, this.opts = { ...u, _n: u.lines ? i : t.nil };
    }
    get() {
      return this._scope;
    }
    name(u) {
      return new a(u, this._newName(u));
    }
    value(u, c) {
      var f;
      if (c.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const m = this.toName(u), { prefix: h } = m, g = (f = c.key) !== null && f !== void 0 ? f : c.ref;
      let b = this._values[h];
      if (b) {
        const v = b.get(g);
        if (v)
          return v;
      } else
        b = this._values[h] = /* @__PURE__ */ new Map();
      b.set(g, m);
      const y = this._scope[h] || (this._scope[h] = []), p = y.length;
      return y[p] = c.ref, m.setValue(c, { property: h, itemIndex: p }), m;
    }
    getValue(u, c) {
      const f = this._values[u];
      if (f)
        return f.get(c);
    }
    scopeRefs(u, c = this._values) {
      return this._reduceValues(c, (f) => {
        if (f.scopePath === void 0)
          throw new Error(`CodeGen: name "${f}" has no value`);
        return (0, t._)`${u}${f.scopePath}`;
      });
    }
    scopeCode(u = this._values, c, f) {
      return this._reduceValues(u, (m) => {
        if (m.value === void 0)
          throw new Error(`CodeGen: name "${m}" has no value`);
        return m.value.code;
      }, c, f);
    }
    _reduceValues(u, c, f = {}, m) {
      let h = t.nil;
      for (const g in u) {
        const b = u[g];
        if (!b)
          continue;
        const y = f[g] = f[g] || /* @__PURE__ */ new Map();
        b.forEach((p) => {
          if (y.has(p))
            return;
          y.set(p, n.Started);
          let v = c(p);
          if (v) {
            const $ = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            h = (0, t._)`${h}${$} ${p} = ${v};${this.opts._n}`;
          } else if (v = m == null ? void 0 : m(p))
            h = (0, t._)`${h}${v}${this.opts._n}`;
          else
            throw new r(p);
          y.set(p, n.Completed);
        });
      }
      return h;
    }
  }
  e.ValueScope = o;
})(Ui);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Tn, r = Ui;
  var n = Tn;
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
  var s = Ui;
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
    optimizeNames(w, S) {
      return this;
    }
  }
  class i extends a {
    constructor(w, S, P) {
      super(), this.varKind = w, this.name = S, this.rhs = P;
    }
    render({ es5: w, _n: S }) {
      const P = w ? r.varKinds.var : this.varKind, V = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${P} ${this.name}${V};` + S;
    }
    optimizeNames(w, S) {
      if (w[this.name.str])
        return this.rhs && (this.rhs = F(this.rhs, w, S)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class o extends a {
    constructor(w, S, P) {
      super(), this.lhs = w, this.rhs = S, this.sideEffects = P;
    }
    render({ _n: w }) {
      return `${this.lhs} = ${this.rhs};` + w;
    }
    optimizeNames(w, S) {
      if (!(this.lhs instanceof t.Name && !w[this.lhs.str] && !this.sideEffects))
        return this.rhs = F(this.rhs, w, S), this;
    }
    get names() {
      const w = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return z(w, this.rhs);
    }
  }
  class l extends o {
    constructor(w, S, P, V) {
      super(w, P, V), this.op = S;
    }
    render({ _n: w }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + w;
    }
  }
  class u extends a {
    constructor(w) {
      super(), this.label = w, this.names = {};
    }
    render({ _n: w }) {
      return `${this.label}:` + w;
    }
  }
  class c extends a {
    constructor(w) {
      super(), this.label = w, this.names = {};
    }
    render({ _n: w }) {
      return `break${this.label ? ` ${this.label}` : ""};` + w;
    }
  }
  class f extends a {
    constructor(w) {
      super(), this.error = w;
    }
    render({ _n: w }) {
      return `throw ${this.error};` + w;
    }
    get names() {
      return this.error.names;
    }
  }
  class m extends a {
    constructor(w) {
      super(), this.code = w;
    }
    render({ _n: w }) {
      return `${this.code};` + w;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(w, S) {
      return this.code = F(this.code, w, S), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class h extends a {
    constructor(w = []) {
      super(), this.nodes = w;
    }
    render(w) {
      return this.nodes.reduce((S, P) => S + P.render(w), "");
    }
    optimizeNodes() {
      const { nodes: w } = this;
      let S = w.length;
      for (; S--; ) {
        const P = w[S].optimizeNodes();
        Array.isArray(P) ? w.splice(S, 1, ...P) : P ? w[S] = P : w.splice(S, 1);
      }
      return w.length > 0 ? this : void 0;
    }
    optimizeNames(w, S) {
      const { nodes: P } = this;
      let V = P.length;
      for (; V--; ) {
        const q = P[V];
        q.optimizeNames(w, S) || (I(w, q.names), P.splice(V, 1));
      }
      return P.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((w, S) => U(w, S.names), {});
    }
  }
  class g extends h {
    render(w) {
      return "{" + w._n + super.render(w) + "}" + w._n;
    }
  }
  class b extends h {
  }
  class y extends g {
  }
  y.kind = "else";
  class p extends g {
    constructor(w, S) {
      super(S), this.condition = w;
    }
    render(w) {
      let S = `if(${this.condition})` + super.render(w);
      return this.else && (S += "else " + this.else.render(w)), S;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const w = this.condition;
      if (w === !0)
        return this.nodes;
      let S = this.else;
      if (S) {
        const P = S.optimizeNodes();
        S = this.else = Array.isArray(P) ? new y(P) : P;
      }
      if (S)
        return w === !1 ? S instanceof p ? S : S.nodes : this.nodes.length ? this : new p(C(w), S instanceof p ? [S] : S.nodes);
      if (!(w === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(w, S) {
      var P;
      if (this.else = (P = this.else) === null || P === void 0 ? void 0 : P.optimizeNames(w, S), !!(super.optimizeNames(w, S) || this.else))
        return this.condition = F(this.condition, w, S), this;
    }
    get names() {
      const w = super.names;
      return z(w, this.condition), this.else && U(w, this.else.names), w;
    }
  }
  p.kind = "if";
  class v extends g {
  }
  v.kind = "for";
  class $ extends v {
    constructor(w) {
      super(), this.iteration = w;
    }
    render(w) {
      return `for(${this.iteration})` + super.render(w);
    }
    optimizeNames(w, S) {
      if (super.optimizeNames(w, S))
        return this.iteration = F(this.iteration, w, S), this;
    }
    get names() {
      return U(super.names, this.iteration.names);
    }
  }
  class _ extends v {
    constructor(w, S, P, V) {
      super(), this.varKind = w, this.name = S, this.from = P, this.to = V;
    }
    render(w) {
      const S = w.es5 ? r.varKinds.var : this.varKind, { name: P, from: V, to: q } = this;
      return `for(${S} ${P}=${V}; ${P}<${q}; ${P}++)` + super.render(w);
    }
    get names() {
      const w = z(super.names, this.from);
      return z(w, this.to);
    }
  }
  class x extends v {
    constructor(w, S, P, V) {
      super(), this.loop = w, this.varKind = S, this.name = P, this.iterable = V;
    }
    render(w) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(w);
    }
    optimizeNames(w, S) {
      if (super.optimizeNames(w, S))
        return this.iterable = F(this.iterable, w, S), this;
    }
    get names() {
      return U(super.names, this.iterable.names);
    }
  }
  class E extends g {
    constructor(w, S, P) {
      super(), this.name = w, this.args = S, this.async = P;
    }
    render(w) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(w);
    }
  }
  E.kind = "func";
  class N extends h {
    render(w) {
      return "return " + super.render(w);
    }
  }
  N.kind = "return";
  class R extends g {
    render(w) {
      let S = "try" + super.render(w);
      return this.catch && (S += this.catch.render(w)), this.finally && (S += this.finally.render(w)), S;
    }
    optimizeNodes() {
      var w, S;
      return super.optimizeNodes(), (w = this.catch) === null || w === void 0 || w.optimizeNodes(), (S = this.finally) === null || S === void 0 || S.optimizeNodes(), this;
    }
    optimizeNames(w, S) {
      var P, V;
      return super.optimizeNames(w, S), (P = this.catch) === null || P === void 0 || P.optimizeNames(w, S), (V = this.finally) === null || V === void 0 || V.optimizeNames(w, S), this;
    }
    get names() {
      const w = super.names;
      return this.catch && U(w, this.catch.names), this.finally && U(w, this.finally.names), w;
    }
  }
  class A extends g {
    constructor(w) {
      super(), this.error = w;
    }
    render(w) {
      return `catch(${this.error})` + super.render(w);
    }
  }
  A.kind = "catch";
  class D extends g {
    render(w) {
      return "finally" + super.render(w);
    }
  }
  D.kind = "finally";
  class M {
    constructor(w, S = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...S, _n: S.lines ? `
` : "" }, this._extScope = w, this._scope = new r.Scope({ parent: w }), this._nodes = [new b()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(w) {
      return this._scope.name(w);
    }
    // reserves unique name in the external scope
    scopeName(w) {
      return this._extScope.name(w);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(w, S) {
      const P = this._extScope.value(w, S);
      return (this._values[P.prefix] || (this._values[P.prefix] = /* @__PURE__ */ new Set())).add(P), P;
    }
    getScopeValue(w, S) {
      return this._extScope.getValue(w, S);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(w) {
      return this._extScope.scopeRefs(w, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(w, S, P, V) {
      const q = this._scope.toName(S);
      return P !== void 0 && V && (this._constants[q.str] = P), this._leafNode(new i(w, q, P)), q;
    }
    // `const` declaration (`var` in es5 mode)
    const(w, S, P) {
      return this._def(r.varKinds.const, w, S, P);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(w, S, P) {
      return this._def(r.varKinds.let, w, S, P);
    }
    // `var` declaration with optional assignment
    var(w, S, P) {
      return this._def(r.varKinds.var, w, S, P);
    }
    // assignment code
    assign(w, S, P) {
      return this._leafNode(new o(w, S, P));
    }
    // `+=` code
    add(w, S) {
      return this._leafNode(new l(w, e.operators.ADD, S));
    }
    // appends passed SafeExpr to code or executes Block
    code(w) {
      return typeof w == "function" ? w() : w !== t.nil && this._leafNode(new m(w)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...w) {
      const S = ["{"];
      for (const [P, V] of w)
        S.length > 1 && S.push(","), S.push(P), (P !== V || this.opts.es5) && (S.push(":"), (0, t.addCodeArg)(S, V));
      return S.push("}"), new t._Code(S);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(w, S, P) {
      if (this._blockNode(new p(w)), S && P)
        this.code(S).else().code(P).endIf();
      else if (S)
        this.code(S).endIf();
      else if (P)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(w) {
      return this._elseNode(new p(w));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new y());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(p, y);
    }
    _for(w, S) {
      return this._blockNode(w), S && this.code(S).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(w, S) {
      return this._for(new $(w), S);
    }
    // `for` statement for a range of values
    forRange(w, S, P, V, q = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const te = this._scope.toName(w);
      return this._for(new _(q, te, S, P), () => V(te));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(w, S, P, V = r.varKinds.const) {
      const q = this._scope.toName(w);
      if (this.opts.es5) {
        const te = S instanceof t.Name ? S : this.var("_arr", S);
        return this.forRange("_i", 0, (0, t._)`${te}.length`, (Z) => {
          this.var(q, (0, t._)`${te}[${Z}]`), P(q);
        });
      }
      return this._for(new x("of", V, q, S), () => P(q));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(w, S, P, V = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(w, (0, t._)`Object.keys(${S})`, P);
      const q = this._scope.toName(w);
      return this._for(new x("in", V, q, S), () => P(q));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(v);
    }
    // `label` statement
    label(w) {
      return this._leafNode(new u(w));
    }
    // `break` statement
    break(w) {
      return this._leafNode(new c(w));
    }
    // `return` statement
    return(w) {
      const S = new N();
      if (this._blockNode(S), this.code(w), S.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(N);
    }
    // `try` statement
    try(w, S, P) {
      if (!S && !P)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const V = new R();
      if (this._blockNode(V), this.code(w), S) {
        const q = this.name("e");
        this._currNode = V.catch = new A(q), S(q);
      }
      return P && (this._currNode = V.finally = new D(), this.code(P)), this._endBlockNode(A, D);
    }
    // `throw` statement
    throw(w) {
      return this._leafNode(new f(w));
    }
    // start self-balancing block
    block(w, S) {
      return this._blockStarts.push(this._nodes.length), w && this.code(w).endBlock(S), this;
    }
    // end the current self-balancing block
    endBlock(w) {
      const S = this._blockStarts.pop();
      if (S === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const P = this._nodes.length - S;
      if (P < 0 || w !== void 0 && P !== w)
        throw new Error(`CodeGen: wrong number of nodes: ${P} vs ${w} expected`);
      return this._nodes.length = S, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(w, S = t.nil, P, V) {
      return this._blockNode(new E(w, S, P)), V && this.code(V).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(E);
    }
    optimize(w = 1) {
      for (; w-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(w) {
      return this._currNode.nodes.push(w), this;
    }
    _blockNode(w) {
      this._currNode.nodes.push(w), this._nodes.push(w);
    }
    _endBlockNode(w, S) {
      const P = this._currNode;
      if (P instanceof w || S && P instanceof S)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${S ? `${w.kind}/${S.kind}` : w.kind}"`);
    }
    _elseNode(w) {
      const S = this._currNode;
      if (!(S instanceof p))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = S.else = w, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const w = this._nodes;
      return w[w.length - 1];
    }
    set _currNode(w) {
      const S = this._nodes;
      S[S.length - 1] = w;
    }
  }
  e.CodeGen = M;
  function U(O, w) {
    for (const S in w)
      O[S] = (O[S] || 0) + (w[S] || 0);
    return O;
  }
  function z(O, w) {
    return w instanceof t._CodeOrName ? U(O, w.names) : O;
  }
  function F(O, w, S) {
    if (O instanceof t.Name)
      return P(O);
    if (!V(O))
      return O;
    return new t._Code(O._items.reduce((q, te) => (te instanceof t.Name && (te = P(te)), te instanceof t._Code ? q.push(...te._items) : q.push(te), q), []));
    function P(q) {
      const te = S[q.str];
      return te === void 0 || w[q.str] !== 1 ? q : (delete w[q.str], te);
    }
    function V(q) {
      return q instanceof t._Code && q._items.some((te) => te instanceof t.Name && w[te.str] === 1 && S[te.str] !== void 0);
    }
  }
  function I(O, w) {
    for (const S in w)
      O[S] = (O[S] || 0) - (w[S] || 0);
  }
  function C(O) {
    return typeof O == "boolean" || typeof O == "number" || O === null ? !O : (0, t._)`!${T(O)}`;
  }
  e.not = C;
  const L = j(e.operators.AND);
  function B(...O) {
    return O.reduce(L);
  }
  e.and = B;
  const J = j(e.operators.OR);
  function k(...O) {
    return O.reduce(J);
  }
  e.or = k;
  function j(O) {
    return (w, S) => w === t.nil ? S : S === t.nil ? w : (0, t._)`${T(w)} ${O} ${T(S)}`;
  }
  function T(O) {
    return O instanceof t.Name ? O : (0, t._)`(${O})`;
  }
})(ee);
var W = {};
Object.defineProperty(W, "__esModule", { value: !0 });
W.checkStrictMode = W.getErrorPath = W.Type = W.useFunc = W.setEvaluated = W.evaluatedPropsToName = W.mergeEvaluated = W.eachItem = W.unescapeJsonPointer = W.escapeJsonPointer = W.escapeFragment = W.unescapeFragment = W.schemaRefOrVal = W.schemaHasRulesButRef = W.schemaHasRules = W.checkUnknownRules = W.alwaysValidSchema = W.toHash = void 0;
const fe = ee, QM = Tn;
function e4(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
W.toHash = e4;
function t4(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Lh(e, t), !Uh(t, e.self.RULES.all));
}
W.alwaysValidSchema = t4;
function Lh(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || zh(e, `unknown keyword: "${a}"`);
}
W.checkUnknownRules = Lh;
function Uh(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
W.schemaHasRules = Uh;
function r4(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
W.schemaHasRulesButRef = r4;
function n4({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, fe._)`${r}`;
  }
  return (0, fe._)`${e}${t}${(0, fe.getProperty)(n)}`;
}
W.schemaRefOrVal = n4;
function s4(e) {
  return Wh(decodeURIComponent(e));
}
W.unescapeFragment = s4;
function a4(e) {
  return encodeURIComponent(ll(e));
}
W.escapeFragment = a4;
function ll(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
W.escapeJsonPointer = ll;
function Wh(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
W.unescapeJsonPointer = Wh;
function i4(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
W.eachItem = i4;
function vd({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, i, o) => {
    const l = i === void 0 ? a : i instanceof fe.Name ? (a instanceof fe.Name ? e(s, a, i) : t(s, a, i), i) : a instanceof fe.Name ? (t(s, i, a), a) : r(a, i);
    return o === fe.Name && !(l instanceof fe.Name) ? n(s, l) : l;
  };
}
W.mergeEvaluated = {
  props: vd({
    mergeNames: (e, t, r) => e.if((0, fe._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, fe._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, fe._)`${r} || {}`).code((0, fe._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, fe._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, fe._)`${r} || {}`), cl(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Vh
  }),
  items: vd({
    mergeNames: (e, t, r) => e.if((0, fe._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, fe._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, fe._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, fe._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Vh(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, fe._)`{}`);
  return t !== void 0 && cl(e, r, t), r;
}
W.evaluatedPropsToName = Vh;
function cl(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, fe._)`${t}${(0, fe.getProperty)(n)}`, !0));
}
W.setEvaluated = cl;
const bd = {};
function o4(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: bd[t.code] || (bd[t.code] = new QM._Code(t.code))
  });
}
W.useFunc = o4;
var Wi;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Wi || (W.Type = Wi = {}));
function l4(e, t, r) {
  if (e instanceof fe.Name) {
    const n = t === Wi.Num;
    return r ? n ? (0, fe._)`"[" + ${e} + "]"` : (0, fe._)`"['" + ${e} + "']"` : n ? (0, fe._)`"/" + ${e}` : (0, fe._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, fe.getProperty)(e).toString() : "/" + ll(e);
}
W.getErrorPath = l4;
function zh(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
W.checkStrictMode = zh;
var bt = {};
Object.defineProperty(bt, "__esModule", { value: !0 });
const De = ee, c4 = {
  // validation function arguments
  data: new De.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new De.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new De.Name("instancePath"),
  parentData: new De.Name("parentData"),
  parentDataProperty: new De.Name("parentDataProperty"),
  rootData: new De.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new De.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new De.Name("vErrors"),
  // null or array of validation errors
  errors: new De.Name("errors"),
  // counter of validation errors
  this: new De.Name("this"),
  // "globals"
  self: new De.Name("self"),
  scope: new De.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new De.Name("json"),
  jsonPos: new De.Name("jsonPos"),
  jsonLen: new De.Name("jsonLen"),
  jsonPart: new De.Name("jsonPart")
};
bt.default = c4;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = ee, r = W, n = bt;
  e.keywordError = {
    message: ({ keyword: y }) => (0, t.str)`must pass "${y}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: y, schemaType: p }) => p ? (0, t.str)`"${y}" keyword must be ${p} ($data)` : (0, t.str)`"${y}" keyword is invalid ($data)`
  };
  function s(y, p = e.keywordError, v, $) {
    const { it: _ } = y, { gen: x, compositeRule: E, allErrors: N } = _, R = f(y, p, v);
    $ ?? (E || N) ? l(x, R) : u(_, (0, t._)`[${R}]`);
  }
  e.reportError = s;
  function a(y, p = e.keywordError, v) {
    const { it: $ } = y, { gen: _, compositeRule: x, allErrors: E } = $, N = f(y, p, v);
    l(_, N), x || E || u($, n.default.vErrors);
  }
  e.reportExtraError = a;
  function i(y, p) {
    y.assign(n.default.errors, p), y.if((0, t._)`${n.default.vErrors} !== null`, () => y.if(p, () => y.assign((0, t._)`${n.default.vErrors}.length`, p), () => y.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = i;
  function o({ gen: y, keyword: p, schemaValue: v, data: $, errsCount: _, it: x }) {
    if (_ === void 0)
      throw new Error("ajv implementation error");
    const E = y.name("err");
    y.forRange("i", _, n.default.errors, (N) => {
      y.const(E, (0, t._)`${n.default.vErrors}[${N}]`), y.if((0, t._)`${E}.instancePath === undefined`, () => y.assign((0, t._)`${E}.instancePath`, (0, t.strConcat)(n.default.instancePath, x.errorPath))), y.assign((0, t._)`${E}.schemaPath`, (0, t.str)`${x.errSchemaPath}/${p}`), x.opts.verbose && (y.assign((0, t._)`${E}.schema`, v), y.assign((0, t._)`${E}.data`, $));
    });
  }
  e.extendErrors = o;
  function l(y, p) {
    const v = y.const("err", p);
    y.if((0, t._)`${n.default.vErrors} === null`, () => y.assign(n.default.vErrors, (0, t._)`[${v}]`), (0, t._)`${n.default.vErrors}.push(${v})`), y.code((0, t._)`${n.default.errors}++`);
  }
  function u(y, p) {
    const { gen: v, validateName: $, schemaEnv: _ } = y;
    _.$async ? v.throw((0, t._)`new ${y.ValidationError}(${p})`) : (v.assign((0, t._)`${$}.errors`, p), v.return(!1));
  }
  const c = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function f(y, p, v) {
    const { createErrors: $ } = y.it;
    return $ === !1 ? (0, t._)`{}` : m(y, p, v);
  }
  function m(y, p, v = {}) {
    const { gen: $, it: _ } = y, x = [
      h(_, v),
      g(y, v)
    ];
    return b(y, p, x), $.object(...x);
  }
  function h({ errorPath: y }, { instancePath: p }) {
    const v = p ? (0, t.str)`${y}${(0, r.getErrorPath)(p, r.Type.Str)}` : y;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, v)];
  }
  function g({ keyword: y, it: { errSchemaPath: p } }, { schemaPath: v, parentSchema: $ }) {
    let _ = $ ? p : (0, t.str)`${p}/${y}`;
    return v && (_ = (0, t.str)`${_}${(0, r.getErrorPath)(v, r.Type.Str)}`), [c.schemaPath, _];
  }
  function b(y, { params: p, message: v }, $) {
    const { keyword: _, data: x, schemaValue: E, it: N } = y, { opts: R, propertyName: A, topSchemaRef: D, schemaPath: M } = N;
    $.push([c.keyword, _], [c.params, typeof p == "function" ? p(y) : p || (0, t._)`{}`]), R.messages && $.push([c.message, typeof v == "function" ? v(y) : v]), R.verbose && $.push([c.schema, E], [c.parentSchema, (0, t._)`${D}${M}`], [n.default.data, x]), A && $.push([c.propertyName, A]);
  }
})(Xn);
Object.defineProperty(Ir, "__esModule", { value: !0 });
Ir.boolOrEmptySchema = Ir.topBoolOrEmptySchema = void 0;
const u4 = Xn, d4 = ee, f4 = bt, p4 = {
  message: "boolean schema is false"
};
function h4(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? Bh(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(f4.default.data) : (t.assign((0, d4._)`${n}.errors`, null), t.return(!0));
}
Ir.topBoolOrEmptySchema = h4;
function m4(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), Bh(e)) : r.var(t, !0);
}
Ir.boolOrEmptySchema = m4;
function Bh(e, t) {
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
  (0, u4.reportError)(s, p4, void 0, t);
}
var Ne = {}, nr = {};
Object.defineProperty(nr, "__esModule", { value: !0 });
nr.getRules = nr.isJSONType = void 0;
const g4 = ["string", "number", "integer", "boolean", "null", "object", "array"], y4 = new Set(g4);
function v4(e) {
  return typeof e == "string" && y4.has(e);
}
nr.isJSONType = v4;
function b4() {
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
nr.getRules = b4;
var jt = {};
Object.defineProperty(jt, "__esModule", { value: !0 });
jt.shouldUseRule = jt.shouldUseGroup = jt.schemaHasRulesForType = void 0;
function $4({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && qh(e, n);
}
jt.schemaHasRulesForType = $4;
function qh(e, t) {
  return t.rules.some((r) => Kh(e, r));
}
jt.shouldUseGroup = qh;
function Kh(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
jt.shouldUseRule = Kh;
Object.defineProperty(Ne, "__esModule", { value: !0 });
Ne.reportTypeError = Ne.checkDataTypes = Ne.checkDataType = Ne.coerceAndCheckDataType = Ne.getJSONTypes = Ne.getSchemaTypes = Ne.DataType = void 0;
const w4 = nr, _4 = jt, x4 = Xn, Q = ee, Gh = W;
var _r;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(_r || (Ne.DataType = _r = {}));
function S4(e) {
  const t = Hh(e.type);
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
Ne.getSchemaTypes = S4;
function Hh(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(w4.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
Ne.getJSONTypes = Hh;
function j4(e, t) {
  const { gen: r, data: n, opts: s } = e, a = E4(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, _4.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const o = ul(t, n, s.strictNumbers, _r.Wrong);
    r.if(o, () => {
      a.length ? O4(e, t, a) : dl(e);
    });
  }
  return i;
}
Ne.coerceAndCheckDataType = j4;
const Jh = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function E4(e, t) {
  return t ? e.filter((r) => Jh.has(r) || t === "array" && r === "array") : [];
}
function O4(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, Q._)`typeof ${s}`), o = n.let("coerced", (0, Q._)`undefined`);
  a.coerceTypes === "array" && n.if((0, Q._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, Q._)`${s}[0]`).assign(i, (0, Q._)`typeof ${s}`).if(ul(t, s, a.strictNumbers), () => n.assign(o, s))), n.if((0, Q._)`${o} !== undefined`);
  for (const u of r)
    (Jh.has(u) || u === "array" && a.coerceTypes === "array") && l(u);
  n.else(), dl(e), n.endIf(), n.if((0, Q._)`${o} !== undefined`, () => {
    n.assign(s, o), N4(e, o);
  });
  function l(u) {
    switch (u) {
      case "string":
        n.elseIf((0, Q._)`${i} == "number" || ${i} == "boolean"`).assign(o, (0, Q._)`"" + ${s}`).elseIf((0, Q._)`${s} === null`).assign(o, (0, Q._)`""`);
        return;
      case "number":
        n.elseIf((0, Q._)`${i} == "boolean" || ${s} === null
              || (${i} == "string" && ${s} && ${s} == +${s})`).assign(o, (0, Q._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, Q._)`${i} === "boolean" || ${s} === null
              || (${i} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(o, (0, Q._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, Q._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(o, !1).elseIf((0, Q._)`${s} === "true" || ${s} === 1`).assign(o, !0);
        return;
      case "null":
        n.elseIf((0, Q._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(o, null);
        return;
      case "array":
        n.elseIf((0, Q._)`${i} === "string" || ${i} === "number"
              || ${i} === "boolean" || ${s} === null`).assign(o, (0, Q._)`[${s}]`);
    }
  }
}
function N4({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, Q._)`${t} !== undefined`, () => e.assign((0, Q._)`${t}[${r}]`, n));
}
function Vi(e, t, r, n = _r.Correct) {
  const s = n === _r.Correct ? Q.operators.EQ : Q.operators.NEQ;
  let a;
  switch (e) {
    case "null":
      return (0, Q._)`${t} ${s} null`;
    case "array":
      a = (0, Q._)`Array.isArray(${t})`;
      break;
    case "object":
      a = (0, Q._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      a = i((0, Q._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = i();
      break;
    default:
      return (0, Q._)`typeof ${t} ${s} ${e}`;
  }
  return n === _r.Correct ? a : (0, Q.not)(a);
  function i(o = Q.nil) {
    return (0, Q.and)((0, Q._)`typeof ${t} == "number"`, o, r ? (0, Q._)`isFinite(${t})` : Q.nil);
  }
}
Ne.checkDataType = Vi;
function ul(e, t, r, n) {
  if (e.length === 1)
    return Vi(e[0], t, r, n);
  let s;
  const a = (0, Gh.toHash)(e);
  if (a.array && a.object) {
    const i = (0, Q._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, Q._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = Q.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, Q.and)(s, Vi(i, t, r, n));
  return s;
}
Ne.checkDataTypes = ul;
const A4 = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, Q._)`{type: ${e}}` : (0, Q._)`{type: ${t}}`
};
function dl(e) {
  const t = P4(e);
  (0, x4.reportError)(t, A4);
}
Ne.reportTypeError = dl;
function P4(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, Gh.schemaRefOrVal)(e, n, "type");
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
var ka = {};
Object.defineProperty(ka, "__esModule", { value: !0 });
ka.assignDefaults = void 0;
const gr = ee, C4 = W;
function T4(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      $d(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => $d(e, a, s.default));
}
ka.assignDefaults = T4;
function $d(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: i } = e;
  if (r === void 0)
    return;
  const o = (0, gr._)`${a}${(0, gr.getProperty)(t)}`;
  if (s) {
    (0, C4.checkStrictMode)(e, `default is ignored for: ${o}`);
    return;
  }
  let l = (0, gr._)`${o} === undefined`;
  i.useDefaults === "empty" && (l = (0, gr._)`${l} || ${o} === null || ${o} === ""`), n.if(l, (0, gr._)`${o} = ${(0, gr.stringify)(r)}`);
}
var ft = {}, re = {};
Object.defineProperty(re, "__esModule", { value: !0 });
re.validateUnion = re.validateArray = re.usePattern = re.callValidateCode = re.schemaProperties = re.allSchemaProperties = re.noPropertyInData = re.propertyInData = re.isOwnProperty = re.hasPropFunc = re.reportMissingProp = re.checkMissingProp = re.checkReportMissingProp = void 0;
const xe = ee, fl = W, Rt = bt, I4 = W;
function F4(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(hl(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, xe._)`${t}` }, !0), e.error();
  });
}
re.checkReportMissingProp = F4;
function k4({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, xe.or)(...n.map((a) => (0, xe.and)(hl(e, t, a, r.ownProperties), (0, xe._)`${s} = ${a}`)));
}
re.checkMissingProp = k4;
function D4(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
re.reportMissingProp = D4;
function Yh(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, xe._)`Object.prototype.hasOwnProperty`
  });
}
re.hasPropFunc = Yh;
function pl(e, t, r) {
  return (0, xe._)`${Yh(e)}.call(${t}, ${r})`;
}
re.isOwnProperty = pl;
function R4(e, t, r, n) {
  const s = (0, xe._)`${t}${(0, xe.getProperty)(r)} !== undefined`;
  return n ? (0, xe._)`${s} && ${pl(e, t, r)}` : s;
}
re.propertyInData = R4;
function hl(e, t, r, n) {
  const s = (0, xe._)`${t}${(0, xe.getProperty)(r)} === undefined`;
  return n ? (0, xe.or)(s, (0, xe.not)(pl(e, t, r))) : s;
}
re.noPropertyInData = hl;
function Zh(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
re.allSchemaProperties = Zh;
function M4(e, t) {
  return Zh(t).filter((r) => !(0, fl.alwaysValidSchema)(e, t[r]));
}
re.schemaProperties = M4;
function L4({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: i }, o, l, u) {
  const c = u ? (0, xe._)`${e}, ${t}, ${n}${s}` : t, f = [
    [Rt.default.instancePath, (0, xe.strConcat)(Rt.default.instancePath, a)],
    [Rt.default.parentData, i.parentData],
    [Rt.default.parentDataProperty, i.parentDataProperty],
    [Rt.default.rootData, Rt.default.rootData]
  ];
  i.opts.dynamicRef && f.push([Rt.default.dynamicAnchors, Rt.default.dynamicAnchors]);
  const m = (0, xe._)`${c}, ${r.object(...f)}`;
  return l !== xe.nil ? (0, xe._)`${o}.call(${l}, ${m})` : (0, xe._)`${o}(${m})`;
}
re.callValidateCode = L4;
const U4 = (0, xe._)`new RegExp`;
function W4({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, xe._)`${s.code === "new RegExp" ? U4 : (0, I4.useFunc)(e, s)}(${r}, ${n})`
  });
}
re.usePattern = W4;
function V4(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const o = t.let("valid", !0);
    return i(() => t.assign(o, !1)), o;
  }
  return t.var(a, !0), i(() => t.break()), a;
  function i(o) {
    const l = t.const("len", (0, xe._)`${r}.length`);
    t.forRange("i", 0, l, (u) => {
      e.subschema({
        keyword: n,
        dataProp: u,
        dataPropType: fl.Type.Num
      }, a), t.if((0, xe.not)(a), o);
    });
  }
}
re.validateArray = V4;
function z4(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((l) => (0, fl.alwaysValidSchema)(s, l)) && !s.opts.unevaluated)
    return;
  const i = t.let("valid", !1), o = t.name("_valid");
  t.block(() => r.forEach((l, u) => {
    const c = e.subschema({
      keyword: n,
      schemaProp: u,
      compositeRule: !0
    }, o);
    t.assign(i, (0, xe._)`${i} || ${o}`), e.mergeValidEvaluated(c, o) || t.if((0, xe.not)(i));
  })), e.result(i, () => e.reset(), () => e.error(!0));
}
re.validateUnion = z4;
Object.defineProperty(ft, "__esModule", { value: !0 });
ft.validateKeywordUsage = ft.validSchemaType = ft.funcKeywordCode = ft.macroKeywordCode = void 0;
const Le = ee, Zt = bt, B4 = re, q4 = Xn;
function K4(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: i } = e, o = t.macro.call(i.self, s, a, i), l = Xh(r, n, o);
  i.opts.validateSchema !== !1 && i.self.validateSchema(o, !0);
  const u = r.name("valid");
  e.subschema({
    schema: o,
    schemaPath: Le.nil,
    errSchemaPath: `${i.errSchemaPath}/${n}`,
    topSchemaRef: l,
    compositeRule: !0
  }, u), e.pass(u, () => e.error(!0));
}
ft.macroKeywordCode = K4;
function G4(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: i, $data: o, it: l } = e;
  J4(l, t);
  const u = !o && t.compile ? t.compile.call(l.self, a, i, l) : t.validate, c = Xh(n, s, u), f = n.let("valid");
  e.block$data(f, m), e.ok((r = t.valid) !== null && r !== void 0 ? r : f);
  function m() {
    if (t.errors === !1)
      b(), t.modifying && wd(e), y(() => e.error());
    else {
      const p = t.async ? h() : g();
      t.modifying && wd(e), y(() => H4(e, p));
    }
  }
  function h() {
    const p = n.let("ruleErrs", null);
    return n.try(() => b((0, Le._)`await `), (v) => n.assign(f, !1).if((0, Le._)`${v} instanceof ${l.ValidationError}`, () => n.assign(p, (0, Le._)`${v}.errors`), () => n.throw(v))), p;
  }
  function g() {
    const p = (0, Le._)`${c}.errors`;
    return n.assign(p, null), b(Le.nil), p;
  }
  function b(p = t.async ? (0, Le._)`await ` : Le.nil) {
    const v = l.opts.passContext ? Zt.default.this : Zt.default.self, $ = !("compile" in t && !o || t.schema === !1);
    n.assign(f, (0, Le._)`${p}${(0, B4.callValidateCode)(e, c, v, $)}`, t.modifying);
  }
  function y(p) {
    var v;
    n.if((0, Le.not)((v = t.valid) !== null && v !== void 0 ? v : f), p);
  }
}
ft.funcKeywordCode = G4;
function wd(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Le._)`${n.parentData}[${n.parentDataProperty}]`));
}
function H4(e, t) {
  const { gen: r } = e;
  r.if((0, Le._)`Array.isArray(${t})`, () => {
    r.assign(Zt.default.vErrors, (0, Le._)`${Zt.default.vErrors} === null ? ${t} : ${Zt.default.vErrors}.concat(${t})`).assign(Zt.default.errors, (0, Le._)`${Zt.default.vErrors}.length`), (0, q4.extendErrors)(e);
  }, () => e.error());
}
function J4({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function Xh(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Le.stringify)(r) });
}
function Y4(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
ft.validSchemaType = Y4;
function Z4({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(a) : s.keyword !== a)
    throw new Error("ajv implementation error");
  const i = s.dependencies;
  if (i != null && i.some((o) => !Object.prototype.hasOwnProperty.call(e, o)))
    throw new Error(`parent schema must have dependencies of ${a}: ${i.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[a])) {
    const l = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(l);
    else
      throw new Error(l);
  }
}
ft.validateKeywordUsage = Z4;
var qt = {};
Object.defineProperty(qt, "__esModule", { value: !0 });
qt.extendSubschemaMode = qt.extendSubschemaData = qt.getSubschema = void 0;
const ut = ee, Qh = W;
function X4(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: i }) {
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
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, Qh.escapeFragment)(r)}`
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
qt.getSubschema = X4;
function Q4(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: i }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: o } = t;
  if (r !== void 0) {
    const { errorPath: u, dataPathArr: c, opts: f } = t, m = o.let("data", (0, ut._)`${t.data}${(0, ut.getProperty)(r)}`, !0);
    l(m), e.errorPath = (0, ut.str)`${u}${(0, Qh.getErrorPath)(r, n, f.jsPropertySyntax)}`, e.parentDataProperty = (0, ut._)`${r}`, e.dataPathArr = [...c, e.parentDataProperty];
  }
  if (s !== void 0) {
    const u = s instanceof ut.Name ? s : o.let("data", s, !0);
    l(u), i !== void 0 && (e.propertyName = i);
  }
  a && (e.dataTypes = a);
  function l(u) {
    e.data = u, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, u];
  }
}
qt.extendSubschemaData = Q4;
function e5(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
qt.extendSubschemaMode = e5;
var Fe = {}, em = function e(t, r) {
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
}, tm = { exports: {} }, Wt = tm.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  Ss(t, n, s, e, "", e);
};
Wt.keywords = {
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
Wt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Wt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Wt.skipKeywords = {
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
function Ss(e, t, r, n, s, a, i, o, l, u) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, i, o, l, u);
    for (var c in n) {
      var f = n[c];
      if (Array.isArray(f)) {
        if (c in Wt.arrayKeywords)
          for (var m = 0; m < f.length; m++)
            Ss(e, t, r, f[m], s + "/" + c + "/" + m, a, s, c, n, m);
      } else if (c in Wt.propsKeywords) {
        if (f && typeof f == "object")
          for (var h in f)
            Ss(e, t, r, f[h], s + "/" + c + "/" + t5(h), a, s, c, n, h);
      } else (c in Wt.keywords || e.allKeys && !(c in Wt.skipKeywords)) && Ss(e, t, r, f, s + "/" + c, a, s, c, n);
    }
    r(n, s, a, i, o, l, u);
  }
}
function t5(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var r5 = tm.exports;
Object.defineProperty(Fe, "__esModule", { value: !0 });
Fe.getSchemaRefs = Fe.resolveUrl = Fe.normalizeId = Fe._getFullPath = Fe.getFullPath = Fe.inlineRef = void 0;
const n5 = W, s5 = em, a5 = r5, i5 = /* @__PURE__ */ new Set([
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
function o5(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !zi(e) : t ? rm(e) <= t : !1;
}
Fe.inlineRef = o5;
const l5 = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function zi(e) {
  for (const t in e) {
    if (l5.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(zi) || typeof r == "object" && zi(r))
      return !0;
  }
  return !1;
}
function rm(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !i5.has(r) && (typeof e[r] == "object" && (0, n5.eachItem)(e[r], (n) => t += rm(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function nm(e, t = "", r) {
  r !== !1 && (t = xr(t));
  const n = e.parse(t);
  return sm(e, n);
}
Fe.getFullPath = nm;
function sm(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Fe._getFullPath = sm;
const c5 = /#\/?$/;
function xr(e) {
  return e ? e.replace(c5, "") : "";
}
Fe.normalizeId = xr;
function u5(e, t, r) {
  return r = xr(r), e.resolve(t, r);
}
Fe.resolveUrl = u5;
const d5 = /^[a-z_][-a-z0-9._]*$/i;
function f5(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = xr(e[r] || t), a = { "": s }, i = nm(n, s, !1), o = {}, l = /* @__PURE__ */ new Set();
  return a5(e, { allKeys: !0 }, (f, m, h, g) => {
    if (g === void 0)
      return;
    const b = i + m;
    let y = a[g];
    typeof f[r] == "string" && (y = p.call(this, f[r])), v.call(this, f.$anchor), v.call(this, f.$dynamicAnchor), a[m] = y;
    function p($) {
      const _ = this.opts.uriResolver.resolve;
      if ($ = xr(y ? _(y, $) : $), l.has($))
        throw c($);
      l.add($);
      let x = this.refs[$];
      return typeof x == "string" && (x = this.refs[x]), typeof x == "object" ? u(f, x.schema, $) : $ !== xr(b) && ($[0] === "#" ? (u(f, o[$], $), o[$] = f) : this.refs[$] = b), $;
    }
    function v($) {
      if (typeof $ == "string") {
        if (!d5.test($))
          throw new Error(`invalid anchor "${$}"`);
        p.call(this, `#${$}`);
      }
    }
  }), o;
  function u(f, m, h) {
    if (m !== void 0 && !s5(f, m))
      throw c(h);
  }
  function c(f) {
    return new Error(`reference "${f}" resolves to more than one schema`);
  }
}
Fe.getSchemaRefs = f5;
Object.defineProperty(at, "__esModule", { value: !0 });
at.getData = at.KeywordCxt = at.validateFunctionCode = void 0;
const am = Ir, _d = Ne, ml = jt, Vs = Ne, p5 = ka, bn = ft, fi = qt, G = ee, X = bt, h5 = Fe, Et = W, ln = Xn;
function m5(e) {
  if (lm(e) && (cm(e), om(e))) {
    v5(e);
    return;
  }
  im(e, () => (0, am.topBoolOrEmptySchema)(e));
}
at.validateFunctionCode = m5;
function im({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, G._)`${X.default.data}, ${X.default.valCxt}`, n.$async, () => {
    e.code((0, G._)`"use strict"; ${xd(r, s)}`), y5(e, s), e.code(a);
  }) : e.func(t, (0, G._)`${X.default.data}, ${g5(s)}`, n.$async, () => e.code(xd(r, s)).code(a));
}
function g5(e) {
  return (0, G._)`{${X.default.instancePath}="", ${X.default.parentData}, ${X.default.parentDataProperty}, ${X.default.rootData}=${X.default.data}${e.dynamicRef ? (0, G._)`, ${X.default.dynamicAnchors}={}` : G.nil}}={}`;
}
function y5(e, t) {
  e.if(X.default.valCxt, () => {
    e.var(X.default.instancePath, (0, G._)`${X.default.valCxt}.${X.default.instancePath}`), e.var(X.default.parentData, (0, G._)`${X.default.valCxt}.${X.default.parentData}`), e.var(X.default.parentDataProperty, (0, G._)`${X.default.valCxt}.${X.default.parentDataProperty}`), e.var(X.default.rootData, (0, G._)`${X.default.valCxt}.${X.default.rootData}`), t.dynamicRef && e.var(X.default.dynamicAnchors, (0, G._)`${X.default.valCxt}.${X.default.dynamicAnchors}`);
  }, () => {
    e.var(X.default.instancePath, (0, G._)`""`), e.var(X.default.parentData, (0, G._)`undefined`), e.var(X.default.parentDataProperty, (0, G._)`undefined`), e.var(X.default.rootData, X.default.data), t.dynamicRef && e.var(X.default.dynamicAnchors, (0, G._)`{}`);
  });
}
function v5(e) {
  const { schema: t, opts: r, gen: n } = e;
  im(e, () => {
    r.$comment && t.$comment && dm(e), x5(e), n.let(X.default.vErrors, null), n.let(X.default.errors, 0), r.unevaluated && b5(e), um(e), E5(e);
  });
}
function b5(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, G._)`${r}.evaluated`), t.if((0, G._)`${e.evaluated}.dynamicProps`, () => t.assign((0, G._)`${e.evaluated}.props`, (0, G._)`undefined`)), t.if((0, G._)`${e.evaluated}.dynamicItems`, () => t.assign((0, G._)`${e.evaluated}.items`, (0, G._)`undefined`));
}
function xd(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, G._)`/*# sourceURL=${r} */` : G.nil;
}
function $5(e, t) {
  if (lm(e) && (cm(e), om(e))) {
    w5(e, t);
    return;
  }
  (0, am.boolOrEmptySchema)(e, t);
}
function om({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function lm(e) {
  return typeof e.schema != "boolean";
}
function w5(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && dm(e), S5(e), j5(e);
  const a = n.const("_errs", X.default.errors);
  um(e, a), n.var(t, (0, G._)`${a} === ${X.default.errors}`);
}
function cm(e) {
  (0, Et.checkUnknownRules)(e), _5(e);
}
function um(e, t) {
  if (e.opts.jtd)
    return Sd(e, [], !1, t);
  const r = (0, _d.getSchemaTypes)(e.schema), n = (0, _d.coerceAndCheckDataType)(e, r);
  Sd(e, r, !n, t);
}
function _5(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, Et.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function x5(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, Et.checkStrictMode)(e, "default is ignored in the schema root");
}
function S5(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, h5.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function j5(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function dm({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, G._)`${X.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const i = (0, G.str)`${n}/$comment`, o = e.scopeValue("root", { ref: t.root });
    e.code((0, G._)`${X.default.self}.opts.$comment(${a}, ${i}, ${o}.schema)`);
  }
}
function E5(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, G._)`${X.default.errors} === 0`, () => t.return(X.default.data), () => t.throw((0, G._)`new ${s}(${X.default.vErrors})`)) : (t.assign((0, G._)`${n}.errors`, X.default.vErrors), a.unevaluated && O5(e), t.return((0, G._)`${X.default.errors} === 0`));
}
function O5({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof G.Name && e.assign((0, G._)`${t}.props`, r), n instanceof G.Name && e.assign((0, G._)`${t}.items`, n);
}
function Sd(e, t, r, n) {
  const { gen: s, schema: a, data: i, allErrors: o, opts: l, self: u } = e, { RULES: c } = u;
  if (a.$ref && (l.ignoreKeywordsWithRef || !(0, Et.schemaHasRulesButRef)(a, c))) {
    s.block(() => hm(e, "$ref", c.all.$ref.definition));
    return;
  }
  l.jtd || N5(e, t), s.block(() => {
    for (const m of c.rules)
      f(m);
    f(c.post);
  });
  function f(m) {
    (0, ml.shouldUseGroup)(a, m) && (m.type ? (s.if((0, Vs.checkDataType)(m.type, i, l.strictNumbers)), jd(e, m), t.length === 1 && t[0] === m.type && r && (s.else(), (0, Vs.reportTypeError)(e)), s.endIf()) : jd(e, m), o || s.if((0, G._)`${X.default.errors} === ${n || 0}`));
  }
}
function jd(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, p5.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, ml.shouldUseRule)(n, a) && hm(e, a.keyword, a.definition, t.type);
  });
}
function N5(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (A5(e, t), e.opts.allowUnionTypes || P5(e, t), C5(e, e.dataTypes));
}
function A5(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      fm(e.dataTypes, r) || gl(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), I5(e, t);
  }
}
function P5(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && gl(e, "use allowUnionTypes to allow union type keyword");
}
function C5(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, ml.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((i) => T5(t, i)) && gl(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function T5(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function fm(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function I5(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    fm(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function gl(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, Et.checkStrictMode)(e, t, e.opts.strictTypes);
}
class pm {
  constructor(t, r, n) {
    if ((0, bn.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, Et.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", mm(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, bn.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", X.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, G.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, G.not)(t), void 0, r);
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
    this.fail((0, G._)`${r} !== undefined && (${(0, G.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? ln.reportExtraError : ln.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, ln.reportError)(this, this.def.$dataError || ln.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, ln.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = G.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = G.nil, r = G.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: s, schemaType: a, def: i } = this;
    n.if((0, G.or)((0, G._)`${s} === undefined`, r)), t !== G.nil && n.assign(t, !0), (a.length || i.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== G.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: a } = this;
    return (0, G.or)(i(), o());
    function i() {
      if (n.length) {
        if (!(r instanceof G.Name))
          throw new Error("ajv implementation error");
        const l = Array.isArray(n) ? n : [n];
        return (0, G._)`${(0, Vs.checkDataTypes)(l, r, a.opts.strictNumbers, Vs.DataType.Wrong)}`;
      }
      return G.nil;
    }
    function o() {
      if (s.validateSchema) {
        const l = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, G._)`!${l}(${r})`;
      }
      return G.nil;
    }
  }
  subschema(t, r) {
    const n = (0, fi.getSubschema)(this.it, t);
    (0, fi.extendSubschemaData)(n, this.it, t), (0, fi.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return $5(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = Et.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = Et.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, G.Name)), !0;
  }
}
at.KeywordCxt = pm;
function hm(e, t, r, n) {
  const s = new pm(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, bn.funcKeywordCode)(s, r) : "macro" in r ? (0, bn.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, bn.funcKeywordCode)(s, r);
}
const F5 = /^\/(?:[^~]|~0|~1)*$/, k5 = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function mm(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return X.default.rootData;
  if (e[0] === "/") {
    if (!F5.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = X.default.rootData;
  } else {
    const u = k5.exec(e);
    if (!u)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const c = +u[1];
    if (s = u[2], s === "#") {
      if (c >= t)
        throw new Error(l("property/index", c));
      return n[t - c];
    }
    if (c > t)
      throw new Error(l("data", c));
    if (a = r[t - c], !s)
      return a;
  }
  let i = a;
  const o = s.split("/");
  for (const u of o)
    u && (a = (0, G._)`${a}${(0, G.getProperty)((0, Et.unescapeJsonPointer)(u))}`, i = (0, G._)`${i} && ${a}`);
  return i;
  function l(u, c) {
    return `Cannot access ${u} ${c} levels up, current level is ${t}`;
  }
}
at.getData = mm;
var Qn = {};
Object.defineProperty(Qn, "__esModule", { value: !0 });
class D5 extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
Qn.default = D5;
var Yr = {};
Object.defineProperty(Yr, "__esModule", { value: !0 });
const pi = Fe;
class R5 extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, pi.resolveUrl)(t, r, n), this.missingSchema = (0, pi.normalizeId)((0, pi.getFullPath)(t, this.missingRef));
  }
}
Yr.default = R5;
var Ve = {};
Object.defineProperty(Ve, "__esModule", { value: !0 });
Ve.resolveSchema = Ve.getCompilingSchema = Ve.resolveRef = Ve.compileSchema = Ve.SchemaEnv = void 0;
const Qe = ee, M5 = Qn, Gt = bt, rt = Fe, Ed = W, L5 = at;
class Da {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, rt.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Ve.SchemaEnv = Da;
function yl(e) {
  const t = gm.call(this, e);
  if (t)
    return t;
  const r = (0, rt.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new Qe.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let o;
  e.$async && (o = i.scopeValue("Error", {
    ref: M5.default,
    code: (0, Qe._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const l = i.scopeName("validate");
  e.validateName = l;
  const u = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: Gt.default.data,
    parentData: Gt.default.parentData,
    parentDataProperty: Gt.default.parentDataProperty,
    dataNames: [Gt.default.data],
    dataPathArr: [Qe.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: i.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Qe.stringify)(e.schema) } : { ref: e.schema }),
    validateName: l,
    ValidationError: o,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Qe.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Qe._)`""`,
    opts: this.opts,
    self: this
  };
  let c;
  try {
    this._compilations.add(e), (0, L5.validateFunctionCode)(u), i.optimize(this.opts.code.optimize);
    const f = i.toString();
    c = `${i.scopeRefs(Gt.default.scope)}return ${f}`, this.opts.code.process && (c = this.opts.code.process(c, e));
    const h = new Function(`${Gt.default.self}`, `${Gt.default.scope}`, c)(this, this.scope.get());
    if (this.scope.value(l, { ref: h }), h.errors = null, h.schema = e.schema, h.schemaEnv = e, e.$async && (h.$async = !0), this.opts.code.source === !0 && (h.source = { validateName: l, validateCode: f, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: g, items: b } = u;
      h.evaluated = {
        props: g instanceof Qe.Name ? void 0 : g,
        items: b instanceof Qe.Name ? void 0 : b,
        dynamicProps: g instanceof Qe.Name,
        dynamicItems: b instanceof Qe.Name
      }, h.source && (h.source.evaluated = (0, Qe.stringify)(h.evaluated));
    }
    return e.validate = h, e;
  } catch (f) {
    throw delete e.validate, delete e.validateName, c && this.logger.error("Error compiling schema, function code:", c), f;
  } finally {
    this._compilations.delete(e);
  }
}
Ve.compileSchema = yl;
function U5(e, t, r) {
  var n;
  r = (0, rt.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = z5.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: o } = this.opts;
    i && (a = new Da({ schema: i, schemaId: o, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = W5.call(this, a);
}
Ve.resolveRef = U5;
function W5(e) {
  return (0, rt.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : yl.call(this, e);
}
function gm(e) {
  for (const t of this._compilations)
    if (V5(t, e))
      return t;
}
Ve.getCompilingSchema = gm;
function V5(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function z5(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || Ra.call(this, e, t);
}
function Ra(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, rt._getFullPath)(this.opts.uriResolver, r);
  let s = (0, rt.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return hi.call(this, r, e);
  const a = (0, rt.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const o = Ra.call(this, e, i);
    return typeof (o == null ? void 0 : o.schema) != "object" ? void 0 : hi.call(this, r, o);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || yl.call(this, i), a === (0, rt.normalizeId)(t)) {
      const { schema: o } = i, { schemaId: l } = this.opts, u = o[l];
      return u && (s = (0, rt.resolveUrl)(this.opts.uriResolver, s, u)), new Da({ schema: o, schemaId: l, root: e, baseId: s });
    }
    return hi.call(this, r, i);
  }
}
Ve.resolveSchema = Ra;
const B5 = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function hi(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const o of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const l = r[(0, Ed.unescapeFragment)(o)];
    if (l === void 0)
      return;
    r = l;
    const u = typeof r == "object" && r[this.opts.schemaId];
    !B5.has(o) && u && (t = (0, rt.resolveUrl)(this.opts.uriResolver, t, u));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, Ed.schemaHasRulesButRef)(r, this.RULES)) {
    const o = (0, rt.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = Ra.call(this, n, o);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new Da({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const q5 = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", K5 = "Meta-schema for $data reference (JSON AnySchema extension proposal)", G5 = "object", H5 = [
  "$data"
], J5 = {
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
}, Y5 = !1, Z5 = {
  $id: q5,
  description: K5,
  type: G5,
  required: H5,
  properties: J5,
  additionalProperties: Y5
};
var vl = {}, Ma = { exports: {} };
const X5 = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), ym = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function vm(e) {
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
const Q5 = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function Od(e) {
  return e.length = 0, !0;
}
function eL(e, t, r) {
  if (e.length) {
    const n = vm(e);
    if (n !== "")
      t.push(n);
    else
      return r.error = !0, !1;
    e.length = 0;
  }
  return !0;
}
function tL(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], s = [];
  let a = !1, i = !1, o = eL;
  for (let l = 0; l < e.length; l++) {
    const u = e[l];
    if (!(u === "[" || u === "]"))
      if (u === ":") {
        if (a === !0 && (i = !0), !o(s, n, r))
          break;
        if (++t > 7) {
          r.error = !0;
          break;
        }
        l > 0 && e[l - 1] === ":" && (a = !0), n.push(":");
        continue;
      } else if (u === "%") {
        if (!o(s, n, r))
          break;
        o = Od;
      } else {
        s.push(u);
        continue;
      }
  }
  return s.length && (o === Od ? r.zone = s.join("") : i ? n.push(s.join("")) : n.push(vm(s))), r.address = n.join(""), r;
}
function bm(e) {
  if (rL(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = tL(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, isIPV6: !0, escapedHost: n };
  }
}
function rL(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
function nL(e) {
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
function sL(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function aL(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    if (!ym(r)) {
      const n = bm(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var $m = {
  nonSimpleDomain: Q5,
  recomposeAuthority: aL,
  normalizeComponentEncoding: sL,
  removeDotSegments: nL,
  isIPv4: ym,
  isUUID: X5,
  normalizeIPv6: bm
};
const { isUUID: iL } = $m, oL = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function wm(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function _m(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function xm(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function lL(e) {
  return e.secure = wm(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function cL(e) {
  if ((e.port === (wm(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function uL(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(oL);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const s = `${n}:${t.nid || e.nid}`, a = bl(s);
    e.path = void 0, a && (e = a.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function dL(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), s = `${r}:${t.nid || n}`, a = bl(s);
  a && (e = a.serialize(e, t));
  const i = e, o = e.nss;
  return i.path = `${n || t.nid}:${o}`, t.skipEscape = !0, i;
}
function fL(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !iL(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function pL(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const Sm = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: _m,
    serialize: xm
  }
), hL = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: Sm.domainHost,
    parse: _m,
    serialize: xm
  }
), js = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: !0,
    parse: lL,
    serialize: cL
  }
), mL = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: js.domainHost,
    parse: js.parse,
    serialize: js.serialize
  }
), gL = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: uL,
    serialize: dL,
    skipNormalize: !0
  }
), yL = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: fL,
    serialize: pL,
    skipNormalize: !0
  }
), zs = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: Sm,
    https: hL,
    ws: js,
    wss: mL,
    urn: gL,
    "urn:uuid": yL
  }
);
Object.setPrototypeOf(zs, null);
function bl(e) {
  return e && (zs[
    /** @type {SchemeName} */
    e
  ] || zs[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var vL = {
  SCHEMES: zs,
  getSchemeHandler: bl
};
const { normalizeIPv6: bL, removeDotSegments: dn, recomposeAuthority: $L, normalizeComponentEncoding: cs, isIPv4: wL, nonSimpleDomain: _L } = $m, { SCHEMES: xL, getSchemeHandler: jm } = vL;
function SL(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  pt(Pt(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  Pt(pt(e, t), t)), e;
}
function jL(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, s = Em(Pt(e, n), Pt(t, n), n, !0);
  return n.skipEscape = !0, pt(s, n);
}
function Em(e, t, r, n) {
  const s = {};
  return n || (e = Pt(pt(e, r), r), t = Pt(pt(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = dn(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = dn(t.path || ""), s.query = t.query) : (t.path ? (t.path[0] === "/" ? s.path = dn(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = dn(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function EL(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = pt(cs(Pt(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = pt(cs(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = pt(cs(Pt(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = pt(cs(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function pt(e, t) {
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
  }, n = Object.assign({}, t), s = [], a = jm(n.scheme || r.scheme);
  a && a.serialize && a.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && s.push(r.scheme, ":");
  const i = $L(r);
  if (i !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(i), r.path && r.path[0] !== "/" && s.push("/")), r.path !== void 0) {
    let o = r.path;
    !n.absolutePath && (!a || !a.absolutePath) && (o = dn(o)), i === void 0 && o[0] === "/" && o[1] === "/" && (o = "/%2F" + o.slice(2)), s.push(o);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const OL = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
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
  const a = e.match(OL);
  if (a) {
    if (n.scheme = a[1], n.userinfo = a[3], n.host = a[4], n.port = parseInt(a[5], 10), n.path = a[6] || "", n.query = a[7], n.fragment = a[8], isNaN(n.port) && (n.port = a[5]), n.host)
      if (wL(n.host) === !1) {
        const l = bL(n.host);
        n.host = l.host.toLowerCase(), s = l.isIPV6;
      } else
        s = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const i = jm(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!i || !i.unicodeSupport) && n.host && (r.domainHost || i && i.domainHost) && s === !1 && _L(n.host))
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
const $l = {
  SCHEMES: xL,
  normalize: SL,
  resolve: jL,
  resolveComponent: Em,
  equal: EL,
  serialize: pt,
  parse: Pt
};
Ma.exports = $l;
Ma.exports.default = $l;
Ma.exports.fastUri = $l;
var NL = Ma.exports;
Object.defineProperty(vl, "__esModule", { value: !0 });
const Om = NL;
Om.code = 'require("ajv/dist/runtime/uri").default';
vl.default = Om;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = at;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = ee;
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
  const n = Qn, s = Yr, a = nr, i = Ve, o = ee, l = Fe, u = Ne, c = W, f = Z5, m = vl, h = (k, j) => new RegExp(k, j);
  h.code = "new RegExp";
  const g = ["removeAdditional", "useDefaults", "coerceTypes"], b = /* @__PURE__ */ new Set([
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
  }, v = 200;
  function $(k) {
    var j, T, O, w, S, P, V, q, te, Z, he, ue, me, Re, Se, ke, ot, Ft, kt, Qr, en, H, je, $t, hr;
    const Me = k.strict, tn = (j = k.code) === null || j === void 0 ? void 0 : j.optimize, wt = tn === !0 || tn === void 0 ? 1 : tn || 0, ec = (O = (T = k.code) === null || T === void 0 ? void 0 : T.regExp) !== null && O !== void 0 ? O : h, Um = (w = k.uriResolver) !== null && w !== void 0 ? w : m.default;
    return {
      strictSchema: (P = (S = k.strictSchema) !== null && S !== void 0 ? S : Me) !== null && P !== void 0 ? P : !0,
      strictNumbers: (q = (V = k.strictNumbers) !== null && V !== void 0 ? V : Me) !== null && q !== void 0 ? q : !0,
      strictTypes: (Z = (te = k.strictTypes) !== null && te !== void 0 ? te : Me) !== null && Z !== void 0 ? Z : "log",
      strictTuples: (ue = (he = k.strictTuples) !== null && he !== void 0 ? he : Me) !== null && ue !== void 0 ? ue : "log",
      strictRequired: (Re = (me = k.strictRequired) !== null && me !== void 0 ? me : Me) !== null && Re !== void 0 ? Re : !1,
      code: k.code ? { ...k.code, optimize: wt, regExp: ec } : { optimize: wt, regExp: ec },
      loopRequired: (Se = k.loopRequired) !== null && Se !== void 0 ? Se : v,
      loopEnum: (ke = k.loopEnum) !== null && ke !== void 0 ? ke : v,
      meta: (ot = k.meta) !== null && ot !== void 0 ? ot : !0,
      messages: (Ft = k.messages) !== null && Ft !== void 0 ? Ft : !0,
      inlineRefs: (kt = k.inlineRefs) !== null && kt !== void 0 ? kt : !0,
      schemaId: (Qr = k.schemaId) !== null && Qr !== void 0 ? Qr : "$id",
      addUsedSchema: (en = k.addUsedSchema) !== null && en !== void 0 ? en : !0,
      validateSchema: (H = k.validateSchema) !== null && H !== void 0 ? H : !0,
      validateFormats: (je = k.validateFormats) !== null && je !== void 0 ? je : !0,
      unicodeRegExp: ($t = k.unicodeRegExp) !== null && $t !== void 0 ? $t : !0,
      int32range: (hr = k.int32range) !== null && hr !== void 0 ? hr : !0,
      uriResolver: Um
    };
  }
  class _ {
    constructor(j = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), j = this.opts = { ...j, ...$(j) };
      const { es5: T, lines: O } = this.opts.code;
      this.scope = new o.ValueScope({ scope: {}, prefixes: b, es5: T, lines: O }), this.logger = U(j.logger);
      const w = j.validateFormats;
      j.validateFormats = !1, this.RULES = (0, a.getRules)(), x.call(this, y, j, "NOT SUPPORTED"), x.call(this, p, j, "DEPRECATED", "warn"), this._metaOpts = D.call(this), j.formats && R.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), j.keywords && A.call(this, j.keywords), typeof j.meta == "object" && this.addMetaSchema(j.meta), N.call(this), j.validateFormats = w;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: j, meta: T, schemaId: O } = this.opts;
      let w = f;
      O === "id" && (w = { ...f }, w.id = w.$id, delete w.$id), T && j && this.addMetaSchema(w, w[O], !1);
    }
    defaultMeta() {
      const { meta: j, schemaId: T } = this.opts;
      return this.opts.defaultMeta = typeof j == "object" ? j[T] || j : void 0;
    }
    validate(j, T) {
      let O;
      if (typeof j == "string") {
        if (O = this.getSchema(j), !O)
          throw new Error(`no schema with key or ref "${j}"`);
      } else
        O = this.compile(j);
      const w = O(T);
      return "$async" in O || (this.errors = O.errors), w;
    }
    compile(j, T) {
      const O = this._addSchema(j, T);
      return O.validate || this._compileSchemaEnv(O);
    }
    compileAsync(j, T) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: O } = this.opts;
      return w.call(this, j, T);
      async function w(Z, he) {
        await S.call(this, Z.$schema);
        const ue = this._addSchema(Z, he);
        return ue.validate || P.call(this, ue);
      }
      async function S(Z) {
        Z && !this.getSchema(Z) && await w.call(this, { $ref: Z }, !0);
      }
      async function P(Z) {
        try {
          return this._compileSchemaEnv(Z);
        } catch (he) {
          if (!(he instanceof s.default))
            throw he;
          return V.call(this, he), await q.call(this, he.missingSchema), P.call(this, Z);
        }
      }
      function V({ missingSchema: Z, missingRef: he }) {
        if (this.refs[Z])
          throw new Error(`AnySchema ${Z} is loaded but ${he} cannot be resolved`);
      }
      async function q(Z) {
        const he = await te.call(this, Z);
        this.refs[Z] || await S.call(this, he.$schema), this.refs[Z] || this.addSchema(he, Z, T);
      }
      async function te(Z) {
        const he = this._loading[Z];
        if (he)
          return he;
        try {
          return await (this._loading[Z] = O(Z));
        } finally {
          delete this._loading[Z];
        }
      }
    }
    // Adds schema to the instance
    addSchema(j, T, O, w = this.opts.validateSchema) {
      if (Array.isArray(j)) {
        for (const P of j)
          this.addSchema(P, void 0, O, w);
        return this;
      }
      let S;
      if (typeof j == "object") {
        const { schemaId: P } = this.opts;
        if (S = j[P], S !== void 0 && typeof S != "string")
          throw new Error(`schema ${P} must be string`);
      }
      return T = (0, l.normalizeId)(T || S), this._checkUnique(T), this.schemas[T] = this._addSchema(j, O, T, w, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(j, T, O = this.opts.validateSchema) {
      return this.addSchema(j, T, !0, O), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(j, T) {
      if (typeof j == "boolean")
        return !0;
      let O;
      if (O = j.$schema, O !== void 0 && typeof O != "string")
        throw new Error("$schema must be a string");
      if (O = O || this.opts.defaultMeta || this.defaultMeta(), !O)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const w = this.validate(O, j);
      if (!w && T) {
        const S = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(S);
        else
          throw new Error(S);
      }
      return w;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(j) {
      let T;
      for (; typeof (T = E.call(this, j)) == "string"; )
        j = T;
      if (T === void 0) {
        const { schemaId: O } = this.opts, w = new i.SchemaEnv({ schema: {}, schemaId: O });
        if (T = i.resolveSchema.call(this, w, j), !T)
          return;
        this.refs[j] = T;
      }
      return T.validate || this._compileSchemaEnv(T);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(j) {
      if (j instanceof RegExp)
        return this._removeAllSchemas(this.schemas, j), this._removeAllSchemas(this.refs, j), this;
      switch (typeof j) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const T = E.call(this, j);
          return typeof T == "object" && this._cache.delete(T.schema), delete this.schemas[j], delete this.refs[j], this;
        }
        case "object": {
          const T = j;
          this._cache.delete(T);
          let O = j[this.opts.schemaId];
          return O && (O = (0, l.normalizeId)(O), delete this.schemas[O], delete this.refs[O]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(j) {
      for (const T of j)
        this.addKeyword(T);
      return this;
    }
    addKeyword(j, T) {
      let O;
      if (typeof j == "string")
        O = j, typeof T == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), T.keyword = O);
      else if (typeof j == "object" && T === void 0) {
        if (T = j, O = T.keyword, Array.isArray(O) && !O.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (F.call(this, O, T), !T)
        return (0, c.eachItem)(O, (S) => I.call(this, S)), this;
      L.call(this, T);
      const w = {
        ...T,
        type: (0, u.getJSONTypes)(T.type),
        schemaType: (0, u.getJSONTypes)(T.schemaType)
      };
      return (0, c.eachItem)(O, w.type.length === 0 ? (S) => I.call(this, S, w) : (S) => w.type.forEach((P) => I.call(this, S, w, P))), this;
    }
    getKeyword(j) {
      const T = this.RULES.all[j];
      return typeof T == "object" ? T.definition : !!T;
    }
    // Remove keyword
    removeKeyword(j) {
      const { RULES: T } = this;
      delete T.keywords[j], delete T.all[j];
      for (const O of T.rules) {
        const w = O.rules.findIndex((S) => S.keyword === j);
        w >= 0 && O.rules.splice(w, 1);
      }
      return this;
    }
    // Add format
    addFormat(j, T) {
      return typeof T == "string" && (T = new RegExp(T)), this.formats[j] = T, this;
    }
    errorsText(j = this.errors, { separator: T = ", ", dataVar: O = "data" } = {}) {
      return !j || j.length === 0 ? "No errors" : j.map((w) => `${O}${w.instancePath} ${w.message}`).reduce((w, S) => w + T + S);
    }
    $dataMetaSchema(j, T) {
      const O = this.RULES.all;
      j = JSON.parse(JSON.stringify(j));
      for (const w of T) {
        const S = w.split("/").slice(1);
        let P = j;
        for (const V of S)
          P = P[V];
        for (const V in O) {
          const q = O[V];
          if (typeof q != "object")
            continue;
          const { $data: te } = q.definition, Z = P[V];
          te && Z && (P[V] = J(Z));
        }
      }
      return j;
    }
    _removeAllSchemas(j, T) {
      for (const O in j) {
        const w = j[O];
        (!T || T.test(O)) && (typeof w == "string" ? delete j[O] : w && !w.meta && (this._cache.delete(w.schema), delete j[O]));
      }
    }
    _addSchema(j, T, O, w = this.opts.validateSchema, S = this.opts.addUsedSchema) {
      let P;
      const { schemaId: V } = this.opts;
      if (typeof j == "object")
        P = j[V];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof j != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let q = this._cache.get(j);
      if (q !== void 0)
        return q;
      O = (0, l.normalizeId)(P || O);
      const te = l.getSchemaRefs.call(this, j, O);
      return q = new i.SchemaEnv({ schema: j, schemaId: V, meta: T, baseId: O, localRefs: te }), this._cache.set(q.schema, q), S && !O.startsWith("#") && (O && this._checkUnique(O), this.refs[O] = q), w && this.validateSchema(j, !0), q;
    }
    _checkUnique(j) {
      if (this.schemas[j] || this.refs[j])
        throw new Error(`schema with key or id "${j}" already exists`);
    }
    _compileSchemaEnv(j) {
      if (j.meta ? this._compileMetaSchema(j) : i.compileSchema.call(this, j), !j.validate)
        throw new Error("ajv implementation error");
      return j.validate;
    }
    _compileMetaSchema(j) {
      const T = this.opts;
      this.opts = this._metaOpts;
      try {
        i.compileSchema.call(this, j);
      } finally {
        this.opts = T;
      }
    }
  }
  _.ValidationError = n.default, _.MissingRefError = s.default, e.default = _;
  function x(k, j, T, O = "error") {
    for (const w in k) {
      const S = w;
      S in j && this.logger[O](`${T}: option ${w}. ${k[S]}`);
    }
  }
  function E(k) {
    return k = (0, l.normalizeId)(k), this.schemas[k] || this.refs[k];
  }
  function N() {
    const k = this.opts.schemas;
    if (k)
      if (Array.isArray(k))
        this.addSchema(k);
      else
        for (const j in k)
          this.addSchema(k[j], j);
  }
  function R() {
    for (const k in this.opts.formats) {
      const j = this.opts.formats[k];
      j && this.addFormat(k, j);
    }
  }
  function A(k) {
    if (Array.isArray(k)) {
      this.addVocabulary(k);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const j in k) {
      const T = k[j];
      T.keyword || (T.keyword = j), this.addKeyword(T);
    }
  }
  function D() {
    const k = { ...this.opts };
    for (const j of g)
      delete k[j];
    return k;
  }
  const M = { log() {
  }, warn() {
  }, error() {
  } };
  function U(k) {
    if (k === !1)
      return M;
    if (k === void 0)
      return console;
    if (k.log && k.warn && k.error)
      return k;
    throw new Error("logger must implement log, warn and error methods");
  }
  const z = /^[a-z_$][a-z0-9_$:-]*$/i;
  function F(k, j) {
    const { RULES: T } = this;
    if ((0, c.eachItem)(k, (O) => {
      if (T.keywords[O])
        throw new Error(`Keyword ${O} is already defined`);
      if (!z.test(O))
        throw new Error(`Keyword ${O} has invalid name`);
    }), !!j && j.$data && !("code" in j || "validate" in j))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function I(k, j, T) {
    var O;
    const w = j == null ? void 0 : j.post;
    if (T && w)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: S } = this;
    let P = w ? S.post : S.rules.find(({ type: q }) => q === T);
    if (P || (P = { type: T, rules: [] }, S.rules.push(P)), S.keywords[k] = !0, !j)
      return;
    const V = {
      keyword: k,
      definition: {
        ...j,
        type: (0, u.getJSONTypes)(j.type),
        schemaType: (0, u.getJSONTypes)(j.schemaType)
      }
    };
    j.before ? C.call(this, P, V, j.before) : P.rules.push(V), S.all[k] = V, (O = j.implements) === null || O === void 0 || O.forEach((q) => this.addKeyword(q));
  }
  function C(k, j, T) {
    const O = k.rules.findIndex((w) => w.keyword === T);
    O >= 0 ? k.rules.splice(O, 0, j) : (k.rules.push(j), this.logger.warn(`rule ${T} is not defined`));
  }
  function L(k) {
    let { metaSchema: j } = k;
    j !== void 0 && (k.$data && this.opts.$data && (j = J(j)), k.validateSchema = this.compile(j, !0));
  }
  const B = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function J(k) {
    return { anyOf: [k, B] };
  }
})(Mh);
var wl = {}, _l = {}, xl = {};
Object.defineProperty(xl, "__esModule", { value: !0 });
const AL = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
xl.default = AL;
var sr = {};
Object.defineProperty(sr, "__esModule", { value: !0 });
sr.callRef = sr.getValidate = void 0;
const PL = Yr, Nd = re, We = ee, yr = bt, Ad = Ve, us = W, CL = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: o, self: l } = n, { root: u } = a;
    if ((r === "#" || r === "#/") && s === u.baseId)
      return f();
    const c = Ad.resolveRef.call(l, u, s, r);
    if (c === void 0)
      throw new PL.default(n.opts.uriResolver, s, r);
    if (c instanceof Ad.SchemaEnv)
      return m(c);
    return h(c);
    function f() {
      if (a === u)
        return Es(e, i, a, a.$async);
      const g = t.scopeValue("root", { ref: u });
      return Es(e, (0, We._)`${g}.validate`, u, u.$async);
    }
    function m(g) {
      const b = Nm(e, g);
      Es(e, b, g, g.$async);
    }
    function h(g) {
      const b = t.scopeValue("schema", o.code.source === !0 ? { ref: g, code: (0, We.stringify)(g) } : { ref: g }), y = t.name("valid"), p = e.subschema({
        schema: g,
        dataTypes: [],
        schemaPath: We.nil,
        topSchemaRef: b,
        errSchemaPath: r
      }, y);
      e.mergeEvaluated(p), e.ok(y);
    }
  }
};
function Nm(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, We._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
sr.getValidate = Nm;
function Es(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: o, opts: l } = a, u = l.passContext ? yr.default.this : We.nil;
  n ? c() : f();
  function c() {
    if (!o.$async)
      throw new Error("async schema referenced by sync schema");
    const g = s.let("valid");
    s.try(() => {
      s.code((0, We._)`await ${(0, Nd.callValidateCode)(e, t, u)}`), h(t), i || s.assign(g, !0);
    }, (b) => {
      s.if((0, We._)`!(${b} instanceof ${a.ValidationError})`, () => s.throw(b)), m(b), i || s.assign(g, !1);
    }), e.ok(g);
  }
  function f() {
    e.result((0, Nd.callValidateCode)(e, t, u), () => h(t), () => m(t));
  }
  function m(g) {
    const b = (0, We._)`${g}.errors`;
    s.assign(yr.default.vErrors, (0, We._)`${yr.default.vErrors} === null ? ${b} : ${yr.default.vErrors}.concat(${b})`), s.assign(yr.default.errors, (0, We._)`${yr.default.vErrors}.length`);
  }
  function h(g) {
    var b;
    if (!a.opts.unevaluated)
      return;
    const y = (b = r == null ? void 0 : r.validate) === null || b === void 0 ? void 0 : b.evaluated;
    if (a.props !== !0)
      if (y && !y.dynamicProps)
        y.props !== void 0 && (a.props = us.mergeEvaluated.props(s, y.props, a.props));
      else {
        const p = s.var("props", (0, We._)`${g}.evaluated.props`);
        a.props = us.mergeEvaluated.props(s, p, a.props, We.Name);
      }
    if (a.items !== !0)
      if (y && !y.dynamicItems)
        y.items !== void 0 && (a.items = us.mergeEvaluated.items(s, y.items, a.items));
      else {
        const p = s.var("items", (0, We._)`${g}.evaluated.items`);
        a.items = us.mergeEvaluated.items(s, p, a.items, We.Name);
      }
  }
}
sr.callRef = Es;
sr.default = CL;
Object.defineProperty(_l, "__esModule", { value: !0 });
const TL = xl, IL = sr, FL = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  TL.default,
  IL.default
];
_l.default = FL;
var Sl = {}, jl = {};
Object.defineProperty(jl, "__esModule", { value: !0 });
const Bs = ee, Mt = Bs.operators, qs = {
  maximum: { okStr: "<=", ok: Mt.LTE, fail: Mt.GT },
  minimum: { okStr: ">=", ok: Mt.GTE, fail: Mt.LT },
  exclusiveMaximum: { okStr: "<", ok: Mt.LT, fail: Mt.GTE },
  exclusiveMinimum: { okStr: ">", ok: Mt.GT, fail: Mt.LTE }
}, kL = {
  message: ({ keyword: e, schemaCode: t }) => (0, Bs.str)`must be ${qs[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Bs._)`{comparison: ${qs[e].okStr}, limit: ${t}}`
}, DL = {
  keyword: Object.keys(qs),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: kL,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Bs._)`${r} ${qs[t].fail} ${n} || isNaN(${r})`);
  }
};
jl.default = DL;
var El = {};
Object.defineProperty(El, "__esModule", { value: !0 });
const $n = ee, RL = {
  message: ({ schemaCode: e }) => (0, $n.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, $n._)`{multipleOf: ${e}}`
}, ML = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: RL,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), o = a ? (0, $n._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, $n._)`${i} !== parseInt(${i})`;
    e.fail$data((0, $n._)`(${n} === 0 || (${i} = ${r}/${n}, ${o}))`);
  }
};
El.default = ML;
var Ol = {}, Nl = {};
Object.defineProperty(Nl, "__esModule", { value: !0 });
function Am(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Nl.default = Am;
Am.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Ol, "__esModule", { value: !0 });
const Xt = ee, LL = W, UL = Nl, WL = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Xt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Xt._)`{limit: ${e}}`
}, VL = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: WL,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Xt.operators.GT : Xt.operators.LT, i = s.opts.unicode === !1 ? (0, Xt._)`${r}.length` : (0, Xt._)`${(0, LL.useFunc)(e.gen, UL.default)}(${r})`;
    e.fail$data((0, Xt._)`${i} ${a} ${n}`);
  }
};
Ol.default = VL;
var Al = {};
Object.defineProperty(Al, "__esModule", { value: !0 });
const zL = re, Ks = ee, BL = {
  message: ({ schemaCode: e }) => (0, Ks.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Ks._)`{pattern: ${e}}`
}, qL = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: BL,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, i = a.opts.unicodeRegExp ? "u" : "", o = r ? (0, Ks._)`(new RegExp(${s}, ${i}))` : (0, zL.usePattern)(e, n);
    e.fail$data((0, Ks._)`!${o}.test(${t})`);
  }
};
Al.default = qL;
var Pl = {};
Object.defineProperty(Pl, "__esModule", { value: !0 });
const wn = ee, KL = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, wn.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, wn._)`{limit: ${e}}`
}, GL = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: KL,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? wn.operators.GT : wn.operators.LT;
    e.fail$data((0, wn._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
Pl.default = GL;
var Cl = {};
Object.defineProperty(Cl, "__esModule", { value: !0 });
const cn = re, _n = ee, HL = W, JL = {
  message: ({ params: { missingProperty: e } }) => (0, _n.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, _n._)`{missingProperty: ${e}}`
}, YL = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: JL,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: i } = e, { opts: o } = i;
    if (!a && r.length === 0)
      return;
    const l = r.length >= o.loopRequired;
    if (i.allErrors ? u() : c(), o.strictRequired) {
      const h = e.parentSchema.properties, { definedProperties: g } = e.it;
      for (const b of r)
        if ((h == null ? void 0 : h[b]) === void 0 && !g.has(b)) {
          const y = i.schemaEnv.baseId + i.errSchemaPath, p = `required property "${b}" is not defined at "${y}" (strictRequired)`;
          (0, HL.checkStrictMode)(i, p, i.opts.strictRequired);
        }
    }
    function u() {
      if (l || a)
        e.block$data(_n.nil, f);
      else
        for (const h of r)
          (0, cn.checkReportMissingProp)(e, h);
    }
    function c() {
      const h = t.let("missing");
      if (l || a) {
        const g = t.let("valid", !0);
        e.block$data(g, () => m(h, g)), e.ok(g);
      } else
        t.if((0, cn.checkMissingProp)(e, r, h)), (0, cn.reportMissingProp)(e, h), t.else();
    }
    function f() {
      t.forOf("prop", n, (h) => {
        e.setParams({ missingProperty: h }), t.if((0, cn.noPropertyInData)(t, s, h, o.ownProperties), () => e.error());
      });
    }
    function m(h, g) {
      e.setParams({ missingProperty: h }), t.forOf(h, n, () => {
        t.assign(g, (0, cn.propertyInData)(t, s, h, o.ownProperties)), t.if((0, _n.not)(g), () => {
          e.error(), t.break();
        });
      }, _n.nil);
    }
  }
};
Cl.default = YL;
var Tl = {};
Object.defineProperty(Tl, "__esModule", { value: !0 });
const xn = ee, ZL = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, xn.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, xn._)`{limit: ${e}}`
}, XL = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: ZL,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? xn.operators.GT : xn.operators.LT;
    e.fail$data((0, xn._)`${r}.length ${s} ${n}`);
  }
};
Tl.default = XL;
var Il = {}, es = {};
Object.defineProperty(es, "__esModule", { value: !0 });
const Pm = em;
Pm.code = 'require("ajv/dist/runtime/equal").default';
es.default = Pm;
Object.defineProperty(Il, "__esModule", { value: !0 });
const mi = Ne, Te = ee, QL = W, eU = es, tU = {
  message: ({ params: { i: e, j: t } }) => (0, Te.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Te._)`{i: ${e}, j: ${t}}`
}, rU = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: tU,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: o } = e;
    if (!n && !s)
      return;
    const l = t.let("valid"), u = a.items ? (0, mi.getSchemaTypes)(a.items) : [];
    e.block$data(l, c, (0, Te._)`${i} === false`), e.ok(l);
    function c() {
      const g = t.let("i", (0, Te._)`${r}.length`), b = t.let("j");
      e.setParams({ i: g, j: b }), t.assign(l, !0), t.if((0, Te._)`${g} > 1`, () => (f() ? m : h)(g, b));
    }
    function f() {
      return u.length > 0 && !u.some((g) => g === "object" || g === "array");
    }
    function m(g, b) {
      const y = t.name("item"), p = (0, mi.checkDataTypes)(u, y, o.opts.strictNumbers, mi.DataType.Wrong), v = t.const("indices", (0, Te._)`{}`);
      t.for((0, Te._)`;${g}--;`, () => {
        t.let(y, (0, Te._)`${r}[${g}]`), t.if(p, (0, Te._)`continue`), u.length > 1 && t.if((0, Te._)`typeof ${y} == "string"`, (0, Te._)`${y} += "_"`), t.if((0, Te._)`typeof ${v}[${y}] == "number"`, () => {
          t.assign(b, (0, Te._)`${v}[${y}]`), e.error(), t.assign(l, !1).break();
        }).code((0, Te._)`${v}[${y}] = ${g}`);
      });
    }
    function h(g, b) {
      const y = (0, QL.useFunc)(t, eU.default), p = t.name("outer");
      t.label(p).for((0, Te._)`;${g}--;`, () => t.for((0, Te._)`${b} = ${g}; ${b}--;`, () => t.if((0, Te._)`${y}(${r}[${g}], ${r}[${b}])`, () => {
        e.error(), t.assign(l, !1).break(p);
      })));
    }
  }
};
Il.default = rU;
var Fl = {};
Object.defineProperty(Fl, "__esModule", { value: !0 });
const Bi = ee, nU = W, sU = es, aU = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Bi._)`{allowedValue: ${e}}`
}, iU = {
  keyword: "const",
  $data: !0,
  error: aU,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, Bi._)`!${(0, nU.useFunc)(t, sU.default)}(${r}, ${s})`) : e.fail((0, Bi._)`${a} !== ${r}`);
  }
};
Fl.default = iU;
var kl = {};
Object.defineProperty(kl, "__esModule", { value: !0 });
const fn = ee, oU = W, lU = es, cU = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, fn._)`{allowedValues: ${e}}`
}, uU = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: cU,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const o = s.length >= i.opts.loopEnum;
    let l;
    const u = () => l ?? (l = (0, oU.useFunc)(t, lU.default));
    let c;
    if (o || n)
      c = t.let("valid"), e.block$data(c, f);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const h = t.const("vSchema", a);
      c = (0, fn.or)(...s.map((g, b) => m(h, b)));
    }
    e.pass(c);
    function f() {
      t.assign(c, !1), t.forOf("v", a, (h) => t.if((0, fn._)`${u()}(${r}, ${h})`, () => t.assign(c, !0).break()));
    }
    function m(h, g) {
      const b = s[g];
      return typeof b == "object" && b !== null ? (0, fn._)`${u()}(${r}, ${h}[${g}])` : (0, fn._)`${r} === ${b}`;
    }
  }
};
kl.default = uU;
Object.defineProperty(Sl, "__esModule", { value: !0 });
const dU = jl, fU = El, pU = Ol, hU = Al, mU = Pl, gU = Cl, yU = Tl, vU = Il, bU = Fl, $U = kl, wU = [
  // number
  dU.default,
  fU.default,
  // string
  pU.default,
  hU.default,
  // object
  mU.default,
  gU.default,
  // array
  yU.default,
  vU.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  bU.default,
  $U.default
];
Sl.default = wU;
var Dl = {}, Zr = {};
Object.defineProperty(Zr, "__esModule", { value: !0 });
Zr.validateAdditionalItems = void 0;
const Qt = ee, qi = W, _U = {
  message: ({ params: { len: e } }) => (0, Qt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Qt._)`{limit: ${e}}`
}, xU = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: _U,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, qi.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Cm(e, n);
  }
};
function Cm(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const o = r.const("len", (0, Qt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Qt._)`${o} <= ${t.length}`);
  else if (typeof n == "object" && !(0, qi.alwaysValidSchema)(i, n)) {
    const u = r.var("valid", (0, Qt._)`${o} <= ${t.length}`);
    r.if((0, Qt.not)(u), () => l(u)), e.ok(u);
  }
  function l(u) {
    r.forRange("i", t.length, o, (c) => {
      e.subschema({ keyword: a, dataProp: c, dataPropType: qi.Type.Num }, u), i.allErrors || r.if((0, Qt.not)(u), () => r.break());
    });
  }
}
Zr.validateAdditionalItems = Cm;
Zr.default = xU;
var Rl = {}, Xr = {};
Object.defineProperty(Xr, "__esModule", { value: !0 });
Xr.validateTuple = void 0;
const Pd = ee, Os = W, SU = re, jU = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Tm(e, "additionalItems", t);
    r.items = !0, !(0, Os.alwaysValidSchema)(r, t) && e.ok((0, SU.validateArray)(e));
  }
};
function Tm(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: o } = e;
  c(s), o.opts.unevaluated && r.length && o.items !== !0 && (o.items = Os.mergeEvaluated.items(n, r.length, o.items));
  const l = n.name("valid"), u = n.const("len", (0, Pd._)`${a}.length`);
  r.forEach((f, m) => {
    (0, Os.alwaysValidSchema)(o, f) || (n.if((0, Pd._)`${u} > ${m}`, () => e.subschema({
      keyword: i,
      schemaProp: m,
      dataProp: m
    }, l)), e.ok(l));
  });
  function c(f) {
    const { opts: m, errSchemaPath: h } = o, g = r.length, b = g === f.minItems && (g === f.maxItems || f[t] === !1);
    if (m.strictTuples && !b) {
      const y = `"${i}" is ${g}-tuple, but minItems or maxItems/${t} are not specified or different at path "${h}"`;
      (0, Os.checkStrictMode)(o, y, m.strictTuples);
    }
  }
}
Xr.validateTuple = Tm;
Xr.default = jU;
Object.defineProperty(Rl, "__esModule", { value: !0 });
const EU = Xr, OU = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, EU.validateTuple)(e, "items")
};
Rl.default = OU;
var Ml = {};
Object.defineProperty(Ml, "__esModule", { value: !0 });
const Cd = ee, NU = W, AU = re, PU = Zr, CU = {
  message: ({ params: { len: e } }) => (0, Cd.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Cd._)`{limit: ${e}}`
}, TU = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: CU,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, NU.alwaysValidSchema)(n, t) && (s ? (0, PU.validateAdditionalItems)(e, s) : e.ok((0, AU.validateArray)(e)));
  }
};
Ml.default = TU;
var Ll = {};
Object.defineProperty(Ll, "__esModule", { value: !0 });
const Ge = ee, ds = W, IU = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ge.str)`must contain at least ${e} valid item(s)` : (0, Ge.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ge._)`{minContains: ${e}}` : (0, Ge._)`{minContains: ${e}, maxContains: ${t}}`
}, FU = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: IU,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let i, o;
    const { minContains: l, maxContains: u } = n;
    a.opts.next ? (i = l === void 0 ? 1 : l, o = u) : i = 1;
    const c = t.const("len", (0, Ge._)`${s}.length`);
    if (e.setParams({ min: i, max: o }), o === void 0 && i === 0) {
      (0, ds.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (o !== void 0 && i > o) {
      (0, ds.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, ds.alwaysValidSchema)(a, r)) {
      let b = (0, Ge._)`${c} >= ${i}`;
      o !== void 0 && (b = (0, Ge._)`${b} && ${c} <= ${o}`), e.pass(b);
      return;
    }
    a.items = !0;
    const f = t.name("valid");
    o === void 0 && i === 1 ? h(f, () => t.if(f, () => t.break())) : i === 0 ? (t.let(f, !0), o !== void 0 && t.if((0, Ge._)`${s}.length > 0`, m)) : (t.let(f, !1), m()), e.result(f, () => e.reset());
    function m() {
      const b = t.name("_valid"), y = t.let("count", 0);
      h(b, () => t.if(b, () => g(y)));
    }
    function h(b, y) {
      t.forRange("i", 0, c, (p) => {
        e.subschema({
          keyword: "contains",
          dataProp: p,
          dataPropType: ds.Type.Num,
          compositeRule: !0
        }, b), y();
      });
    }
    function g(b) {
      t.code((0, Ge._)`${b}++`), o === void 0 ? t.if((0, Ge._)`${b} >= ${i}`, () => t.assign(f, !0).break()) : (t.if((0, Ge._)`${b} > ${o}`, () => t.assign(f, !1).break()), i === 1 ? t.assign(f, !0) : t.if((0, Ge._)`${b} >= ${i}`, () => t.assign(f, !0)));
    }
  }
};
Ll.default = FU;
var Im = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = ee, r = W, n = re;
  e.error = {
    message: ({ params: { property: l, depsCount: u, deps: c } }) => {
      const f = u === 1 ? "property" : "properties";
      return (0, t.str)`must have ${f} ${c} when property ${l} is present`;
    },
    params: ({ params: { property: l, depsCount: u, deps: c, missingProperty: f } }) => (0, t._)`{property: ${l},
    missingProperty: ${f},
    depsCount: ${u},
    deps: ${c}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(l) {
      const [u, c] = a(l);
      i(l, u), o(l, c);
    }
  };
  function a({ schema: l }) {
    const u = {}, c = {};
    for (const f in l) {
      if (f === "__proto__")
        continue;
      const m = Array.isArray(l[f]) ? u : c;
      m[f] = l[f];
    }
    return [u, c];
  }
  function i(l, u = l.schema) {
    const { gen: c, data: f, it: m } = l;
    if (Object.keys(u).length === 0)
      return;
    const h = c.let("missing");
    for (const g in u) {
      const b = u[g];
      if (b.length === 0)
        continue;
      const y = (0, n.propertyInData)(c, f, g, m.opts.ownProperties);
      l.setParams({
        property: g,
        depsCount: b.length,
        deps: b.join(", ")
      }), m.allErrors ? c.if(y, () => {
        for (const p of b)
          (0, n.checkReportMissingProp)(l, p);
      }) : (c.if((0, t._)`${y} && (${(0, n.checkMissingProp)(l, b, h)})`), (0, n.reportMissingProp)(l, h), c.else());
    }
  }
  e.validatePropertyDeps = i;
  function o(l, u = l.schema) {
    const { gen: c, data: f, keyword: m, it: h } = l, g = c.name("valid");
    for (const b in u)
      (0, r.alwaysValidSchema)(h, u[b]) || (c.if(
        (0, n.propertyInData)(c, f, b, h.opts.ownProperties),
        () => {
          const y = l.subschema({ keyword: m, schemaProp: b }, g);
          l.mergeValidEvaluated(y, g);
        },
        () => c.var(g, !0)
        // TODO var
      ), l.ok(g));
  }
  e.validateSchemaDeps = o, e.default = s;
})(Im);
var Ul = {};
Object.defineProperty(Ul, "__esModule", { value: !0 });
const Fm = ee, kU = W, DU = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Fm._)`{propertyName: ${e.propertyName}}`
}, RU = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: DU,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, kU.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, Fm.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
Ul.default = RU;
var La = {};
Object.defineProperty(La, "__esModule", { value: !0 });
const fs = re, et = ee, MU = bt, ps = W, LU = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, et._)`{additionalProperty: ${e.additionalProperty}}`
}, UU = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: LU,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: o, opts: l } = i;
    if (i.props = !0, l.removeAdditional !== "all" && (0, ps.alwaysValidSchema)(i, r))
      return;
    const u = (0, fs.allSchemaProperties)(n.properties), c = (0, fs.allSchemaProperties)(n.patternProperties);
    f(), e.ok((0, et._)`${a} === ${MU.default.errors}`);
    function f() {
      t.forIn("key", s, (y) => {
        !u.length && !c.length ? g(y) : t.if(m(y), () => g(y));
      });
    }
    function m(y) {
      let p;
      if (u.length > 8) {
        const v = (0, ps.schemaRefOrVal)(i, n.properties, "properties");
        p = (0, fs.isOwnProperty)(t, v, y);
      } else u.length ? p = (0, et.or)(...u.map((v) => (0, et._)`${y} === ${v}`)) : p = et.nil;
      return c.length && (p = (0, et.or)(p, ...c.map((v) => (0, et._)`${(0, fs.usePattern)(e, v)}.test(${y})`))), (0, et.not)(p);
    }
    function h(y) {
      t.code((0, et._)`delete ${s}[${y}]`);
    }
    function g(y) {
      if (l.removeAdditional === "all" || l.removeAdditional && r === !1) {
        h(y);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: y }), e.error(), o || t.break();
        return;
      }
      if (typeof r == "object" && !(0, ps.alwaysValidSchema)(i, r)) {
        const p = t.name("valid");
        l.removeAdditional === "failing" ? (b(y, p, !1), t.if((0, et.not)(p), () => {
          e.reset(), h(y);
        })) : (b(y, p), o || t.if((0, et.not)(p), () => t.break()));
      }
    }
    function b(y, p, v) {
      const $ = {
        keyword: "additionalProperties",
        dataProp: y,
        dataPropType: ps.Type.Str
      };
      v === !1 && Object.assign($, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema($, p);
    }
  }
};
La.default = UU;
var Wl = {};
Object.defineProperty(Wl, "__esModule", { value: !0 });
const WU = at, Td = re, gi = W, Id = La, VU = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Id.default.code(new WU.KeywordCxt(a, Id.default, "additionalProperties"));
    const i = (0, Td.allSchemaProperties)(r);
    for (const f of i)
      a.definedProperties.add(f);
    a.opts.unevaluated && i.length && a.props !== !0 && (a.props = gi.mergeEvaluated.props(t, (0, gi.toHash)(i), a.props));
    const o = i.filter((f) => !(0, gi.alwaysValidSchema)(a, r[f]));
    if (o.length === 0)
      return;
    const l = t.name("valid");
    for (const f of o)
      u(f) ? c(f) : (t.if((0, Td.propertyInData)(t, s, f, a.opts.ownProperties)), c(f), a.allErrors || t.else().var(l, !0), t.endIf()), e.it.definedProperties.add(f), e.ok(l);
    function u(f) {
      return a.opts.useDefaults && !a.compositeRule && r[f].default !== void 0;
    }
    function c(f) {
      e.subschema({
        keyword: "properties",
        schemaProp: f,
        dataProp: f
      }, l);
    }
  }
};
Wl.default = VU;
var Vl = {};
Object.defineProperty(Vl, "__esModule", { value: !0 });
const Fd = re, hs = ee, kd = W, Dd = W, zU = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, o = (0, Fd.allSchemaProperties)(r), l = o.filter((b) => (0, kd.alwaysValidSchema)(a, r[b]));
    if (o.length === 0 || l.length === o.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const u = i.strictSchema && !i.allowMatchingProperties && s.properties, c = t.name("valid");
    a.props !== !0 && !(a.props instanceof hs.Name) && (a.props = (0, Dd.evaluatedPropsToName)(t, a.props));
    const { props: f } = a;
    m();
    function m() {
      for (const b of o)
        u && h(b), a.allErrors ? g(b) : (t.var(c, !0), g(b), t.if(c));
    }
    function h(b) {
      for (const y in u)
        new RegExp(b).test(y) && (0, kd.checkStrictMode)(a, `property ${y} matches pattern ${b} (use allowMatchingProperties)`);
    }
    function g(b) {
      t.forIn("key", n, (y) => {
        t.if((0, hs._)`${(0, Fd.usePattern)(e, b)}.test(${y})`, () => {
          const p = l.includes(b);
          p || e.subschema({
            keyword: "patternProperties",
            schemaProp: b,
            dataProp: y,
            dataPropType: Dd.Type.Str
          }, c), a.opts.unevaluated && f !== !0 ? t.assign((0, hs._)`${f}[${y}]`, !0) : !p && !a.allErrors && t.if((0, hs.not)(c), () => t.break());
        });
      });
    }
  }
};
Vl.default = zU;
var zl = {};
Object.defineProperty(zl, "__esModule", { value: !0 });
const BU = W, qU = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, BU.alwaysValidSchema)(n, r)) {
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
zl.default = qU;
var Bl = {};
Object.defineProperty(Bl, "__esModule", { value: !0 });
const KU = re, GU = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: KU.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Bl.default = GU;
var ql = {};
Object.defineProperty(ql, "__esModule", { value: !0 });
const Ns = ee, HU = W, JU = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Ns._)`{passingSchemas: ${e.passing}}`
}, YU = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: JU,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, i = t.let("valid", !1), o = t.let("passing", null), l = t.name("_valid");
    e.setParams({ passing: o }), t.block(u), e.result(i, () => e.reset(), () => e.error(!0));
    function u() {
      a.forEach((c, f) => {
        let m;
        (0, HU.alwaysValidSchema)(s, c) ? t.var(l, !0) : m = e.subschema({
          keyword: "oneOf",
          schemaProp: f,
          compositeRule: !0
        }, l), f > 0 && t.if((0, Ns._)`${l} && ${i}`).assign(i, !1).assign(o, (0, Ns._)`[${o}, ${f}]`).else(), t.if(l, () => {
          t.assign(i, !0), t.assign(o, f), m && e.mergeEvaluated(m, Ns.Name);
        });
      });
    }
  }
};
ql.default = YU;
var Kl = {};
Object.defineProperty(Kl, "__esModule", { value: !0 });
const ZU = W, XU = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, ZU.alwaysValidSchema)(n, a))
        return;
      const o = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(o);
    });
  }
};
Kl.default = XU;
var Gl = {};
Object.defineProperty(Gl, "__esModule", { value: !0 });
const Gs = ee, km = W, QU = {
  message: ({ params: e }) => (0, Gs.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Gs._)`{failingKeyword: ${e.ifClause}}`
}, e6 = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: QU,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, km.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Rd(n, "then"), a = Rd(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), o = t.name("_valid");
    if (l(), e.reset(), s && a) {
      const c = t.let("ifClause");
      e.setParams({ ifClause: c }), t.if(o, u("then", c), u("else", c));
    } else s ? t.if(o, u("then")) : t.if((0, Gs.not)(o), u("else"));
    e.pass(i, () => e.error(!0));
    function l() {
      const c = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, o);
      e.mergeEvaluated(c);
    }
    function u(c, f) {
      return () => {
        const m = e.subschema({ keyword: c }, o);
        t.assign(i, o), e.mergeValidEvaluated(m, i), f ? t.assign(f, (0, Gs._)`${c}`) : e.setParams({ ifClause: c });
      };
    }
  }
};
function Rd(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, km.alwaysValidSchema)(e, r);
}
Gl.default = e6;
var Hl = {};
Object.defineProperty(Hl, "__esModule", { value: !0 });
const t6 = W, r6 = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, t6.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Hl.default = r6;
Object.defineProperty(Dl, "__esModule", { value: !0 });
const n6 = Zr, s6 = Rl, a6 = Xr, i6 = Ml, o6 = Ll, l6 = Im, c6 = Ul, u6 = La, d6 = Wl, f6 = Vl, p6 = zl, h6 = Bl, m6 = ql, g6 = Kl, y6 = Gl, v6 = Hl;
function b6(e = !1) {
  const t = [
    // any
    p6.default,
    h6.default,
    m6.default,
    g6.default,
    y6.default,
    v6.default,
    // object
    c6.default,
    u6.default,
    l6.default,
    d6.default,
    f6.default
  ];
  return e ? t.push(s6.default, i6.default) : t.push(n6.default, a6.default), t.push(o6.default), t;
}
Dl.default = b6;
var Jl = {}, Yl = {};
Object.defineProperty(Yl, "__esModule", { value: !0 });
const Oe = ee, $6 = {
  message: ({ schemaCode: e }) => (0, Oe.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, Oe._)`{format: ${e}}`
}, w6 = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: $6,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: o } = e, { opts: l, errSchemaPath: u, schemaEnv: c, self: f } = o;
    if (!l.validateFormats)
      return;
    s ? m() : h();
    function m() {
      const g = r.scopeValue("formats", {
        ref: f.formats,
        code: l.code.formats
      }), b = r.const("fDef", (0, Oe._)`${g}[${i}]`), y = r.let("fType"), p = r.let("format");
      r.if((0, Oe._)`typeof ${b} == "object" && !(${b} instanceof RegExp)`, () => r.assign(y, (0, Oe._)`${b}.type || "string"`).assign(p, (0, Oe._)`${b}.validate`), () => r.assign(y, (0, Oe._)`"string"`).assign(p, b)), e.fail$data((0, Oe.or)(v(), $()));
      function v() {
        return l.strictSchema === !1 ? Oe.nil : (0, Oe._)`${i} && !${p}`;
      }
      function $() {
        const _ = c.$async ? (0, Oe._)`(${b}.async ? await ${p}(${n}) : ${p}(${n}))` : (0, Oe._)`${p}(${n})`, x = (0, Oe._)`(typeof ${p} == "function" ? ${_} : ${p}.test(${n}))`;
        return (0, Oe._)`${p} && ${p} !== true && ${y} === ${t} && !${x}`;
      }
    }
    function h() {
      const g = f.formats[a];
      if (!g) {
        v();
        return;
      }
      if (g === !0)
        return;
      const [b, y, p] = $(g);
      b === t && e.pass(_());
      function v() {
        if (l.strictSchema === !1) {
          f.logger.warn(x());
          return;
        }
        throw new Error(x());
        function x() {
          return `unknown format "${a}" ignored in schema at path "${u}"`;
        }
      }
      function $(x) {
        const E = x instanceof RegExp ? (0, Oe.regexpCode)(x) : l.code.formats ? (0, Oe._)`${l.code.formats}${(0, Oe.getProperty)(a)}` : void 0, N = r.scopeValue("formats", { key: a, ref: x, code: E });
        return typeof x == "object" && !(x instanceof RegExp) ? [x.type || "string", x.validate, (0, Oe._)`${N}.validate`] : ["string", x, N];
      }
      function _() {
        if (typeof g == "object" && !(g instanceof RegExp) && g.async) {
          if (!c.$async)
            throw new Error("async format in sync schema");
          return (0, Oe._)`await ${p}(${n})`;
        }
        return typeof y == "function" ? (0, Oe._)`${p}(${n})` : (0, Oe._)`${p}.test(${n})`;
      }
    }
  }
};
Yl.default = w6;
Object.defineProperty(Jl, "__esModule", { value: !0 });
const _6 = Yl, x6 = [_6.default];
Jl.default = x6;
var Fr = {};
Object.defineProperty(Fr, "__esModule", { value: !0 });
Fr.contentVocabulary = Fr.metadataVocabulary = void 0;
Fr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Fr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(wl, "__esModule", { value: !0 });
const S6 = _l, j6 = Sl, E6 = Dl, O6 = Jl, Md = Fr, N6 = [
  S6.default,
  j6.default,
  (0, E6.default)(),
  O6.default,
  Md.metadataVocabulary,
  Md.contentVocabulary
];
wl.default = N6;
var Zl = {}, Ua = {};
Object.defineProperty(Ua, "__esModule", { value: !0 });
Ua.DiscrError = void 0;
var Ld;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Ld || (Ua.DiscrError = Ld = {}));
Object.defineProperty(Zl, "__esModule", { value: !0 });
const vr = ee, Ki = Ua, Ud = Ve, A6 = Yr, P6 = W, C6 = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Ki.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, vr._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, T6 = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: C6,
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
    const l = t.let("valid", !1), u = t.const("tag", (0, vr._)`${r}${(0, vr.getProperty)(o)}`);
    t.if((0, vr._)`typeof ${u} == "string"`, () => c(), () => e.error(!1, { discrError: Ki.DiscrError.Tag, tag: u, tagName: o })), e.ok(l);
    function c() {
      const h = m();
      t.if(!1);
      for (const g in h)
        t.elseIf((0, vr._)`${u} === ${g}`), t.assign(l, f(h[g]));
      t.else(), e.error(!1, { discrError: Ki.DiscrError.Mapping, tag: u, tagName: o }), t.endIf();
    }
    function f(h) {
      const g = t.name("valid"), b = e.subschema({ keyword: "oneOf", schemaProp: h }, g);
      return e.mergeEvaluated(b, vr.Name), g;
    }
    function m() {
      var h;
      const g = {}, b = p(s);
      let y = !0;
      for (let _ = 0; _ < i.length; _++) {
        let x = i[_];
        if (x != null && x.$ref && !(0, P6.schemaHasRulesButRef)(x, a.self.RULES)) {
          const N = x.$ref;
          if (x = Ud.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, N), x instanceof Ud.SchemaEnv && (x = x.schema), x === void 0)
            throw new A6.default(a.opts.uriResolver, a.baseId, N);
        }
        const E = (h = x == null ? void 0 : x.properties) === null || h === void 0 ? void 0 : h[o];
        if (typeof E != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${o}"`);
        y = y && (b || p(x)), v(E, _);
      }
      if (!y)
        throw new Error(`discriminator: "${o}" must be required`);
      return g;
      function p({ required: _ }) {
        return Array.isArray(_) && _.includes(o);
      }
      function v(_, x) {
        if (_.const)
          $(_.const, x);
        else if (_.enum)
          for (const E of _.enum)
            $(E, x);
        else
          throw new Error(`discriminator: "properties/${o}" must have "const" or "enum"`);
      }
      function $(_, x) {
        if (typeof _ != "string" || _ in g)
          throw new Error(`discriminator: "${o}" values must be unique strings`);
        g[_] = x;
      }
    }
  }
};
Zl.default = T6;
const I6 = "http://json-schema.org/draft-07/schema#", F6 = "http://json-schema.org/draft-07/schema#", k6 = "Core schema meta-schema", D6 = {
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
}, R6 = [
  "object",
  "boolean"
], M6 = {
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
}, L6 = {
  $schema: I6,
  $id: F6,
  title: k6,
  definitions: D6,
  type: R6,
  properties: M6,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Mh, n = wl, s = Zl, a = L6, i = ["/properties"], o = "http://json-schema.org/draft-07/schema";
  class l extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((g) => this.addVocabulary(g)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const g = this.opts.$data ? this.$dataMetaSchema(a, i) : a;
      this.addMetaSchema(g, o, !1), this.refs["http://json-schema.org/schema"] = o;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(o) ? o : void 0);
    }
  }
  t.Ajv = l, e.exports = t = l, e.exports.Ajv = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
  var u = at;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return u.KeywordCxt;
  } });
  var c = ee;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return c._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return c.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return c.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return c.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return c.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return c.CodeGen;
  } });
  var f = Qn;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return f.default;
  } });
  var m = Yr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return m.default;
  } });
})(Li, Li.exports);
var Dm = Li.exports;
const U6 = /* @__PURE__ */ kn(Dm);
var Gi = { exports: {} }, Rm = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(A, D) {
    return { validate: A, compare: D };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(a, i),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(l, u),
    "date-time": t(f, m),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: b,
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
    regex: R,
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
    int64: { type: "number", validate: x },
    // C-type float
    float: { type: "number", validate: E },
    // C-type double
    double: { type: "number", validate: E },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, i),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, u),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, m),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function r(A) {
    return A % 4 === 0 && (A % 100 !== 0 || A % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, s = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function a(A) {
    const D = n.exec(A);
    if (!D)
      return !1;
    const M = +D[1], U = +D[2], z = +D[3];
    return U >= 1 && U <= 12 && z >= 1 && z <= (U === 2 && r(M) ? 29 : s[U]);
  }
  function i(A, D) {
    if (A && D)
      return A > D ? 1 : A < D ? -1 : 0;
  }
  const o = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  function l(A, D) {
    const M = o.exec(A);
    if (!M)
      return !1;
    const U = +M[1], z = +M[2], F = +M[3], I = M[5];
    return (U <= 23 && z <= 59 && F <= 59 || U === 23 && z === 59 && F === 60) && (!D || I !== "");
  }
  function u(A, D) {
    if (!(A && D))
      return;
    const M = o.exec(A), U = o.exec(D);
    if (M && U)
      return A = M[1] + M[2] + M[3] + (M[4] || ""), D = U[1] + U[2] + U[3] + (U[4] || ""), A > D ? 1 : A < D ? -1 : 0;
  }
  const c = /t|\s/i;
  function f(A) {
    const D = A.split(c);
    return D.length === 2 && a(D[0]) && l(D[1], !0);
  }
  function m(A, D) {
    if (!(A && D))
      return;
    const [M, U] = A.split(c), [z, F] = D.split(c), I = i(M, z);
    if (I !== void 0)
      return I || u(U, F);
  }
  const h = /\/|:/, g = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function b(A) {
    return h.test(A) && g.test(A);
  }
  const y = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function p(A) {
    return y.lastIndex = 0, y.test(A);
  }
  const v = -2147483648, $ = 2 ** 31 - 1;
  function _(A) {
    return Number.isInteger(A) && A <= $ && A >= v;
  }
  function x(A) {
    return Number.isInteger(A);
  }
  function E() {
    return !0;
  }
  const N = /[^\\]\\Z/;
  function R(A) {
    if (N.test(A))
      return !1;
    try {
      return new RegExp(A), !0;
    } catch {
      return !1;
    }
  }
})(Rm);
var Mm = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = Dm, r = ee, n = r.operators, s = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, a = {
    message: ({ keyword: o, schemaCode: l }) => r.str`should be ${s[o].okStr} ${l}`,
    params: ({ keyword: o, schemaCode: l }) => r._`{comparison: ${s[o].okStr}, limit: ${l}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(s),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: a,
    code(o) {
      const { gen: l, data: u, schemaCode: c, keyword: f, it: m } = o, { opts: h, self: g } = m;
      if (!h.validateFormats)
        return;
      const b = new t.KeywordCxt(m, g.RULES.all.format.definition, "format");
      b.$data ? y() : p();
      function y() {
        const $ = l.scopeValue("formats", {
          ref: g.formats,
          code: h.code.formats
        }), _ = l.const("fmt", r._`${$}[${b.schemaCode}]`);
        o.fail$data(r.or(r._`typeof ${_} != "object"`, r._`${_} instanceof RegExp`, r._`typeof ${_}.compare != "function"`, v(_)));
      }
      function p() {
        const $ = b.schema, _ = g.formats[$];
        if (!_ || _ === !0)
          return;
        if (typeof _ != "object" || _ instanceof RegExp || typeof _.compare != "function")
          throw new Error(`"${f}": format "${$}" does not define "compare" function`);
        const x = l.scopeValue("formats", {
          key: $,
          ref: _,
          code: h.code.formats ? r._`${h.code.formats}${r.getProperty($)}` : void 0
        });
        o.fail$data(v(x));
      }
      function v($) {
        return r._`${$}.compare(${u}, ${c}) ${s[f].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const i = (o) => (o.addKeyword(e.formatLimitDefinition), o);
  e.default = i;
})(Mm);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = Rm, n = Mm, s = ee, a = new s.Name("fullFormats"), i = new s.Name("fastFormats"), o = (u, c = { keywords: !0 }) => {
    if (Array.isArray(c))
      return l(u, c, r.fullFormats, a), u;
    const [f, m] = c.mode === "fast" ? [r.fastFormats, i] : [r.fullFormats, a], h = c.formats || r.formatNames;
    return l(u, h, f, m), c.keywords && n.default(u), u;
  };
  o.get = (u, c = "full") => {
    const m = (c === "fast" ? r.fastFormats : r.fullFormats)[u];
    if (!m)
      throw new Error(`Unknown format "${u}"`);
    return m;
  };
  function l(u, c, f, m) {
    var h, g;
    (h = (g = u.opts.code).formats) !== null && h !== void 0 || (g.formats = s._`require("ajv-formats/dist/formats").${m}`);
    for (const b of c)
      u.addFormat(b, f[b]);
  }
  e.exports = t = o, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = o;
})(Gi, Gi.exports);
var W6 = Gi.exports;
const Wd = /* @__PURE__ */ kn(W6), V6 = {
  allErrors: !0,
  multipleOfPrecision: 8,
  strict: !1,
  verbose: !0,
  discriminator: !1
  // TODO enable this in V6
}, z6 = /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/, B6 = /^data:([a-z]+\/[a-z0-9-+.]+)?;(?:name=(.*);)?base64,(.*)$/;
function q6(e, t, r = {}, n, s = U6) {
  const a = new s({ ...V6, ...r });
  return n ? Wd(a, n) : n !== !1 && Wd(a), a.addFormat("data-url", B6), a.addFormat("color", z6), a.addKeyword(Mn), a.addKeyword(Yi), Array.isArray(e) && a.addMetaSchema(e), be(t) && Object.keys(t).forEach((i) => {
    a.addFormat(i, t[i]);
  }), a;
}
function K6(e = [], t) {
  return e.map((r) => {
    var n;
    const { instancePath: s, keyword: a, params: i, schemaPath: o, parentSchema: l, ...u } = r;
    let { message: c = "" } = u, f = s.replace(/\//g, "."), m = `${f} ${c}`.trim();
    const h = [
      ...((n = i.deps) === null || n === void 0 ? void 0 : n.split(", ")) || [],
      i.missingProperty,
      i.property
    ].filter((g) => g);
    if (h.length > 0)
      h.forEach((g) => {
        const b = f ? `${f}.${g}` : g;
        let y = se(K(t, `${b.replace(/^\./, "")}`)).title;
        if (y === void 0) {
          const p = o.replace(/\/properties\//g, "/").split("/").slice(1, -1).concat([g]);
          y = se(K(t, p)).title;
        }
        if (y)
          c = c.replace(`'${g}'`, `'${y}'`);
        else {
          const p = K(l, [Ee, g, "title"]);
          p && (c = c.replace(`'${g}'`, `'${p}'`));
        }
      }), m = c;
    else {
      const g = se(K(t, `${f.replace(/^\./, "")}`)).title;
      if (g)
        m = `'${g}' ${c}`.trim();
      else {
        const b = l == null ? void 0 : l.title;
        b && (m = `'${b}' ${c}`.trim());
      }
    }
    return "missingProperty" in i && (f = f ? `${f}.${i.missingProperty}` : i.missingProperty), {
      name: a,
      property: f,
      message: c,
      params: i,
      stack: m,
      schemaPath: o
    };
  });
}
function G6(e, t, r, n, s, a, i) {
  const { validationError: o } = t;
  let l = K6(t.errors, i);
  o && (l = [...l, { stack: o.message }]), typeof a == "function" && (l = a(l, i));
  let u = _R(l);
  if (o && (u = {
    ...u,
    $schema: {
      __errors: [o.message]
    }
  }), typeof s != "function")
    return { errors: l, errorSchema: u };
  const c = mh(e, n, r, n, !0), f = s(c, Ps(c), i), m = sl(f);
  return ws({ errors: l, errorSchema: u }, m);
}
class H6 {
  /** Constructs an `AJV8Validator` instance using the `options`
   *
   * @param options - The `CustomValidatorOptionsType` options that are used to create the AJV instance
   * @param [localizer] - If provided, is used to localize a list of Ajv `ErrorObject`s
   */
  constructor(t, r) {
    const { additionalMetaSchemas: n, customFormats: s, ajvOptionsOverrides: a, ajvFormatOptions: i, AjvClass: o } = t;
    this.ajv = q6(n, s, a, i, o), this.localizer = r;
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
    return Cn(t, r);
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
    t[Ut] && (i = this.ajv.getSchema(t[Ut]));
    try {
      i === void 0 && (i = this.ajv.compile(t)), i(r);
    } catch (l) {
      a = l;
    }
    let o;
    return i && (typeof this.localizer == "function" && (((n = i.errors) !== null && n !== void 0 ? n : []).forEach((l) => {
      var u;
      ["missingProperty", "property"].forEach((c) => {
        var f;
        !((f = l.params) === null || f === void 0) && f[c] && (l.params[c] = `'${l.params[c]}'`);
      }), !((u = l.params) === null || u === void 0) && u.deps && (l.params.deps = l.params.deps.split(", ").map((c) => `'${c}'`).join(", "));
    }), this.localizer(i.errors), ((s = i.errors) !== null && s !== void 0 ? s : []).forEach((l) => {
      var u;
      ["missingProperty", "property"].forEach((c) => {
        var f;
        !((f = l.params) === null || f === void 0) && f[c] && (l.params[c] = l.params[c].slice(1, -1));
      }), !((u = l.params) === null || u === void 0) && u.deps && (l.params.deps = l.params.deps.split(", ").map((c) => c.slice(1, -1)).join(", "));
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
    return G6(this, i, t, r, n, s, a);
  }
  /**
   * This function checks if a schema needs to be added and if the root schemas don't match it removes the old root schema from the ajv instance and adds the new one.
   * @param rootSchema - The root schema used to provide $ref resolutions
   */
  handleSchemaUpdate(t) {
    var r, n;
    const s = (r = t[Ut]) !== null && r !== void 0 ? r : Qd;
    this.ajv.getSchema(s) === void 0 ? this.ajv.addSchema(t, s) : _e(t, (n = this.ajv.getSchema(s)) === null || n === void 0 ? void 0 : n.schema) || (this.ajv.removeSchema(s), this.ajv.addSchema(t, s));
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
      const a = al(t), i = (s = a[Ut]) !== null && s !== void 0 ? s : gR(a);
      let o;
      return o = this.ajv.getSchema(i), o === void 0 && (o = this.ajv.addSchema(a, i).getSchema(i) || this.ajv.compile(a)), o(r);
    } catch (a) {
      return console.warn("Error encountered compiling schema:", a), !1;
    }
  }
}
function J6(e = {}, t) {
  return new H6(e, t);
}
const Y6 = J6(), Z6 = (e) => {
  const { widgetProps: t, updateWidgetProps: r } = Jd();
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
}, Wa = (e, t) => {
  var l;
  if (!t) return "image";
  const r = e.toLowerCase();
  if (t.startsWith("data:"))
    return t.startsWith("data:image") ? "image" : t.startsWith("data:video") ? "video" : t.startsWith("data:audio") ? "audio" : "file";
  const n = ((l = t.split(".").pop()) == null ? void 0 : l.toLowerCase()) || "", s = [
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
}, Xl = (e, t) => {
  const r = e.toLowerCase(), n = Wa(e, t);
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
}, Hi = (e, t) => {
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
}, Ql = (e) => typeof e == "string" && /^\[.*\]$/.test(e), X6 = (e) => {
  if (!Ql(e)) return [];
  const t = e.match(/^\[(.*)\]$/);
  return t ? t[1].split(",").map((r) => r.trim()).filter((r) => r.length > 0) : [];
}, Q6 = (e, t) => {
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
  Ql(t) || // Static options array
  t.includes("|") || // Pipe-separated values
  t.includes(",") && t.split(",").length <= 10);
  return s || a;
}, Lm = (e, t) => {
  const r = typeof t, n = e.toLowerCase(), s = {
    title: e.replace(/([A-Z])/g, " $1").replace(/^./, (i) => i.toUpperCase()),
    default: t
  };
  if (Hi(e, t))
    return s.type = "string", s.format = "uri", s;
  if (r === "string") {
    if (s.type = "string", Q6(e, t)) {
      if (t && t.startsWith("/api/"))
        s.description = "API Endpoint", s["x-dynamic-select"] = !0;
      else if (Ql(t)) {
        const o = X6(t);
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
      o.every((u) => {
        const c = i[u];
        return typeof c == "string" || typeof c == "number" || typeof c == "boolean" || c === null;
      }) && o.length > 0 ? (s.items = {
        type: "object",
        properties: o.reduce((u, c) => {
          const f = i[c], m = typeof f, h = {
            title: c.replace(/([A-Z])/g, " $1").replace(/^./, (g) => g.toUpperCase())
          };
          return m === "string" ? (h.type = "string", Hi(c, f) && (h.format = "uri")) : m === "number" ? h.type = "number" : m === "boolean" ? h.type = "boolean" : h.type = "string", u[c] = h, u;
        }, {})
      }, s["x-array-of-objects"] = !0) : (s.items = { type: "object" }, s.format = "json");
    } else t.length > 0 && typeof t[0] == "string" ? (s.items = { type: "string" }, t.every((i) => typeof i == "string") && t.length <= 10 && (s.enum = t)) : s.items = { type: "string" };
  else r === "object" && t !== null ? (s.type = "object", s.format = "json") : s.type = "string";
  return s;
}, e9 = (e) => {
  const t = {
    type: "object",
    properties: {},
    required: []
  };
  return Object.entries(e).forEach(([r, n]) => {
    t.properties[r] = Lm(r, n);
  }), t;
}, t9 = (e, t, r) => {
  const n = {
    "ui:order": Object.keys(t.properties || {})
  };
  return Object.keys(t.properties || {}).forEach((s) => {
    var o;
    const a = t.properties[s], i = e[s];
    Hi(s, i) ? n[s] = {
      "ui:widget": "FileWidget"
    } : a.type === "object" || a.format === "json" ? n[s] = {
      "ui:widget": "JsonWidget"
    } : a.format === "textarea" ? n[s] = {
      "ui:widget": "CustomTextareaWidget",
      "ui:options": {
        rows: 5
      }
    } : a["x-dynamic-select"] || a.enum && a.description === "API Endpoint" ? n[s] = {
      "ui:widget": "CustomSelectWidget",
      "ui:options": {
        isDynamic: !0
      }
    } : a.enum ? n[s] = {
      "ui:widget": "CustomSelectWidget"
    } : a.format === "date" ? n[s] = {
      "ui:widget": "CustomDateWidget"
    } : a.format === "datetime" ? n[s] = {
      "ui:widget": "CustomDateTimeWidget"
    } : a.format === "email" ? n[s] = {
      "ui:widget": "CustomEmailWidget"
    } : a.format === "color" ? n[s] = {
      "ui:widget": "CustomColorWidget"
    } : a.type === "boolean" ? n[s] = {
      "ui:widget": "CustomCheckboxWidget"
    } : a.type === "number" ? n[s] = {
      "ui:widget": "CustomNumberWidget"
    } : a["x-array-of-objects"] || a.format === "array" && ((o = a.items) == null ? void 0 : o.type) === "object" ? n[s] = {
      "ui:widget": "ArrayOfObjectsWidget",
      "ui:options": {
        onFileUpload: r
      }
    } : n[s] = {
      "ui:widget": "CustomTextWidget"
    }, i && typeof i == "string" && i.startsWith("/api/") && (n[s] = {
      ...n[s],
      "ui:description": `API Endpoint: ${i}`
    }), i && typeof i == "string" && i.toLowerCase().startsWith("/customaction/") && (n[s] = {
      ...n[s],
      "ui:description": `Custom Action: ${i}`
    });
  }), n;
}, r9 = (e) => {
  const {
    id: t,
    classNames: r,
    label: n,
    help: s,
    required: a,
    description: i,
    errors: o,
    children: l
  } = e;
  return /* @__PURE__ */ d.jsxs("div", { className: `mb-6 ${r}`, children: [
    n && /* @__PURE__ */ d.jsxs(
      "label",
      {
        htmlFor: t,
        className: "block text-sm font-medium text-gray-700 mb-2",
        children: [
          n,
          a && /* @__PURE__ */ d.jsx("span", { className: "text-red-500 ml-1", children: "*" })
        ]
      }
    ),
    /* @__PURE__ */ d.jsx("div", { className: "w-full", children: l }),
    i && /* @__PURE__ */ d.jsx("div", { className: "text-xs text-gray-500 mt-1", children: i }),
    o && /* @__PURE__ */ d.jsx("div", { className: "text-xs text-red-600 mt-1", children: o }),
    s && /* @__PURE__ */ d.jsx("div", { className: "text-xs text-blue-600 mt-1", children: s })
  ] });
}, n9 = (e) => {
  const [t, r] = oe.useState(!1), [n, s] = oe.useState(e.value || ""), [a, i] = oe.useState(""), [o, l] = oe.useState(/* @__PURE__ */ new Set()), [u, c] = oe.useState(0);
  oe.useEffect(() => {
    s(e.value || ""), e.value || i("");
  }, [e.value]), oe.useEffect(() => () => {
    o.forEach((v) => {
      v.startsWith("blob:") && URL.revokeObjectURL(v);
    });
  }, [o]);
  const f = async (v) => {
    var _;
    const $ = (_ = v.target.files) == null ? void 0 : _[0];
    if ($) {
      i($.name), r(!0), c(0);
      try {
        let x;
        e.onFileUpload ? x = await e.onFileUpload($, {
          onProgress: (E) => {
            c(E);
          },
          onError: (E) => {
            alert(`Upload failed: ${E.message}`), r(!1), c(0);
          }
        }) : $.type.startsWith("image/") && $.size < 5 * 1024 * 1024 ? x = await new Promise((E) => {
          const N = new FileReader();
          N.onload = (R) => {
            var A;
            return E((A = R.target) == null ? void 0 : A.result);
          }, N.readAsDataURL($);
        }) : (x = URL.createObjectURL($), l((E) => /* @__PURE__ */ new Set([...E, x]))), s(x), e.onChange(x), r(!1), c(100);
      } catch (x) {
        console.error("File processing failed:", x), alert("File processing failed"), i(""), r(!1), c(0);
      } finally {
        v.target.value = "";
      }
    }
  }, m = (v) => {
    const $ = v.target.value;
    s($), e.onChange($), i("");
  }, h = () => {
    n.startsWith("blob:") && o.has(n) && (URL.revokeObjectURL(n), l((v) => {
      const $ = new Set(v);
      return $.delete(n), $;
    })), s(""), i(""), c(0), e.onChange("");
  }, g = Wa(e.name, n), b = Xl(e.name, n), p = (() => {
    if (a) return a;
    if (!n) return "";
    try {
      return n.startsWith("data:") ? "Image file" : n.startsWith("blob:") ? "Selected file" : new URL(n).pathname.split("/").pop() || "File";
    } catch {
      const v = n.split("/");
      return v[v.length - 1].split("?")[0] || "File";
    }
  })();
  return /* @__PURE__ */ d.jsxs("div", { className: "space-y-4 w-full", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "space-y-2 w-full", children: [
      /* @__PURE__ */ d.jsx("label", { className: "block text-sm font-medium text-gray-700", children: "File URL" }),
      /* @__PURE__ */ d.jsxs("div", { className: "flex space-x-2 w-full", children: [
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "url",
            value: n,
            onChange: m,
            className: "flex-1 min-w-0 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            placeholder: "https://example.com/file.jpg"
          }
        ),
        n && /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            onClick: h,
            className: "flex-shrink-0 px-4 py-3 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600 transition-colors whitespace-nowrap",
            children: "Clear"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "space-y-2 w-full", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
        /* @__PURE__ */ d.jsxs("div", { className: "flex gap-2 w-full", children: [
          /* @__PURE__ */ d.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "file",
              onChange: f,
              disabled: t,
              accept: b,
              className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
            }
          ) }),
          t && /* @__PURE__ */ d.jsx("div", { className: "flex-shrink-0 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg text-sm flex items-center whitespace-nowrap", children: /* @__PURE__ */ d.jsxs("span", { children: [
            "Uploading... ",
            u,
            "%"
          ] }) })
        ] }),
        t && /* @__PURE__ */ d.jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: /* @__PURE__ */ d.jsx(
          "div",
          {
            className: "bg-blue-600 h-2 rounded-full transition-all duration-300",
            style: { width: `${u}%` }
          }
        ) }),
        p && /* @__PURE__ */ d.jsx("div", { className: "w-full", children: /* @__PURE__ */ d.jsxs(
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
      /* @__PURE__ */ d.jsxs("div", { className: "text-xs text-gray-500 flex flex-col sm:flex-row sm:justify-between gap-1", children: [
        /* @__PURE__ */ d.jsxs("span", { className: "truncate", children: [
          "Accepted: ",
          b === "*/*" ? "All files" : b
        ] }),
        !e.onFileUpload && /* @__PURE__ */ d.jsx("span", { className: "text-orange-600 font-medium whitespace-nowrap", children: "Local preview only" })
      ] })
    ] }),
    n && /* @__PURE__ */ d.jsxs("div", { className: "space-y-2 w-full", children: [
      /* @__PURE__ */ d.jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Preview" }),
      /* @__PURE__ */ d.jsxs("div", { className: "border border-gray-200 rounded-lg p-4 w-full overflow-hidden", children: [
        g === "image" && /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-center space-y-3 w-full", children: [
          /* @__PURE__ */ d.jsx("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ d.jsx(
            "img",
            {
              src: n,
              alt: "Preview",
              className: "max-w-full max-h-48 object-contain rounded",
              onError: (v) => {
                v.target.style.display = "none";
                const $ = v.target.parentElement;
                if ($) {
                  const _ = document.createElement("div");
                  _.className = "text-center py-4", _.innerHTML = `
                          <div class="text-3xl mb-2">🖼️</div>
                          <div class="text-sm text-gray-600">Image preview not available</div>
                        `, $.appendChild(_);
                }
              }
            }
          ) }),
          p && /* @__PURE__ */ d.jsx("div", { className: "text-sm text-gray-600 text-center truncate w-full max-w-full px-2", children: p })
        ] }),
        g === "video" && /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-center space-y-3 w-full", children: [
          /* @__PURE__ */ d.jsx("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ d.jsx(
            "video",
            {
              src: n,
              controls: !0,
              className: "max-w-full max-h-48 rounded"
            }
          ) }),
          p && /* @__PURE__ */ d.jsx("div", { className: "text-sm text-gray-600 text-center truncate w-full max-w-full px-2", children: p })
        ] }),
        g === "audio" && /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-center space-y-3 w-full", children: [
          /* @__PURE__ */ d.jsx("div", { className: "w-full", children: /* @__PURE__ */ d.jsx("audio", { src: n, controls: !0, className: "w-full" }) }),
          p && /* @__PURE__ */ d.jsx("div", { className: "text-sm text-gray-600 text-center truncate w-full max-w-full px-2", children: p })
        ] }),
        (g === "document" || g === "file") && /* @__PURE__ */ d.jsxs("div", { className: "text-center py-4 w-full", children: [
          /* @__PURE__ */ d.jsx("div", { className: "text-3xl mb-2", children: g === "document" ? "📄" : "📎" }),
          p && /* @__PURE__ */ d.jsx("div", { className: "text-sm text-gray-600 truncate w-full max-w-full px-2", children: p })
        ] })
      ] })
    ] })
  ] });
}, s9 = (e) => {
  const [t, r] = oe.useState([]), [n, s] = oe.useState(!1), [a, i] = oe.useState(!1), [o, l] = oe.useState("");
  oe.useEffect(() => {
    (async () => {
      const b = e.schema.description === "API Endpoint" || e.value && typeof e.value == "string" && e.value.startsWith("/api/") || e.schema.format === "dynamic-select";
      if (i(b), b && e.onGetSelectOptions)
        await u();
      else {
        const y = c(e.schema, e.value);
        r(y);
      }
    })();
  }, [e.value, e.schema, e.onGetSelectOptions]);
  const u = async () => {
    if (!e.onGetSelectOptions) {
      l("Dynamic options handler not available");
      return;
    }
    s(!0), l("");
    try {
      const g = await e.onGetSelectOptions(
        e.name,
        e.componentType
      );
      r(g || []);
    } catch (g) {
      console.error("Failed to load options:", g), l("Failed to load options"), r([]);
    } finally {
      s(!1);
    }
  }, c = (g, b) => {
    if (g.enum && Array.isArray(g.enum))
      return g.enum.map((y) => String(y));
    if (g.items && g.items.enum && Array.isArray(g.items.enum))
      return g.items.enum.map((y) => String(y));
    if (g.oneOf && Array.isArray(g.oneOf))
      return g.oneOf.filter((y) => y.const !== void 0).map((y) => String(y.const));
    if (g.anyOf && Array.isArray(g.anyOf))
      return g.anyOf.filter((y) => y.const !== void 0).map((y) => String(y.const));
    if (typeof b == "string") {
      const y = b.match(/^\[(.*)\]$/);
      if (y)
        return y[1].split(",").map((p) => p.trim()).filter((p) => p.length > 0);
    }
    return g.options && Array.isArray(g.options) ? g.options.map((y) => String(y)) : [];
  }, f = () => {
    a && u();
  }, m = a || t.includes(e.value) ? e.value : "", h = t.length > 0 || a;
  return /* @__PURE__ */ d.jsxs("div", { className: "space-y-3", children: [
    h ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsxs("div", { className: "flex space-x-3", children: [
        /* @__PURE__ */ d.jsxs(
          "select",
          {
            value: m || "",
            onChange: (g) => e.onChange(g.target.value),
            disabled: n,
            className: "flex-1 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            children: [
              /* @__PURE__ */ d.jsx("option", { value: "", children: "Select an option" }),
              t.map((g) => /* @__PURE__ */ d.jsx("option", { value: g, children: g }, g))
            ]
          }
        ),
        a && /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            onClick: f,
            disabled: n,
            className: "px-4 py-3 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:bg-gray-400 transition-colors whitespace-nowrap",
            children: n ? "..." : "Refresh"
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "text-xs text-gray-500 flex justify-between items-center", children: [
        /* @__PURE__ */ d.jsx("span", { children: n ? "Loading options..." : `${t.length} options available` }),
        a && /* @__PURE__ */ d.jsx("span", { className: "text-blue-600 font-medium", children: "Dynamic Select" }),
        !a && t.length > 0 && /* @__PURE__ */ d.jsx("span", { className: "text-green-600 font-medium", children: "Static Select" })
      ] })
    ] }) : /* @__PURE__ */ d.jsx("div", { className: "p-4 bg-yellow-50 border border-yellow-200 rounded-lg", children: /* @__PURE__ */ d.jsxs("p", { className: "text-sm text-yellow-800", children: [
      "No options available.",
      " ",
      a ? "Try refreshing or check the API endpoint." : "Add options to the schema."
    ] }) }),
    o && /* @__PURE__ */ d.jsx("div", { className: "p-3 bg-red-50 border border-red-200 rounded-lg", children: /* @__PURE__ */ d.jsx("p", { className: "text-sm text-red-800", children: o }) }),
    !1
  ] });
}, a9 = (e) => {
  const [t, r] = oe.useState(
    typeof e.value == "string" ? e.value : JSON.stringify(e.value, null, 2)
  );
  oe.useEffect(() => {
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
  return /* @__PURE__ */ d.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ d.jsx(
      "textarea",
      {
        value: t,
        onChange: n,
        rows: 8,
        className: "w-full p-3 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        placeholder: "Enter JSON data..."
      }
    ),
    /* @__PURE__ */ d.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ d.jsx(
      "button",
      {
        type: "button",
        onClick: s,
        className: "px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors",
        children: "Format JSON"
      }
    ) })
  ] });
}, i9 = (e) => {
  var z;
  const [t, r] = oe.useState(e.value || []), [n, s] = oe.useState([]), [a, i] = oe.useState(
    {}
  ), [o, l] = oe.useState(
    /* @__PURE__ */ new Set()
  ), [u, c] = oe.useState(!1), [f, m] = oe.useState(!1), [h, g] = oe.useState(e.value || []);
  oe.useEffect(() => {
    const F = e.value || [];
    r(F), g(F);
    const { keys: I, schemas: C } = v(
      e.schema,
      F
    );
    s(I), i(C), m(!1);
  }, [e.schema, (z = e.value) == null ? void 0 : z.length]);
  const b = (F, I, C) => {
    const L = [...h];
    L[F] = { ...L[F], [I]: C }, g(L), m(!0);
    const B = [...t];
    B[F] = { ...B[F], [I]: C }, r(B);
  }, y = () => {
    e.onChange(h), r(h), m(!1);
  }, p = () => {
    const F = e.value || [];
    g(F), r(F), m(!1);
  }, v = (F, I) => {
    const C = [], L = {};
    if (F.items && F.items.properties)
      Object.entries(F.items.properties).forEach(
        ([B, J]) => {
          C.push(B), L[B] = J;
        }
      );
    else if (I && I.length > 0 && typeof I[0] == "object") {
      const B = I[0];
      Object.keys(B).forEach((J) => {
        C.push(J), L[J] = Lm(J, B[J]);
      });
    } else
      ["name", "value", "label", "key"].forEach((J) => {
        C.push(J), L[J] = { type: "string", title: J };
      });
    return { keys: C, schemas: L };
  }, $ = (F, I, C) => {
    const L = I.format || "", B = I.type || "string";
    return L === "file" || L === "uri" || F.toLowerCase().includes("url") || F.toLowerCase().includes("image") || F.toLowerCase().includes("video") || F.toLowerCase().includes("audio") || F.toLowerCase().includes("file") || F.toLowerCase().includes("src") || F.toLowerCase().includes("icon") || F.toLowerCase().includes("avatar") || F.toLowerCase().includes("logo") || F.toLowerCase().includes("thumbnail") || F.toLowerCase().includes("media") || typeof C == "string" && (C.startsWith("http") || C.startsWith("data:") || C.startsWith("blob:") || C.includes("/uploads/") || C.includes("/images/") || C.includes("/media/") || /\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|ogg|mp3|wav|pdf|doc|docx)$/i.test(C)) ? "file" : L === "color" ? "color" : L === "email" ? "email" : L === "uri" || L === "url" ? "url" : L === "date" ? "date" : L === "datetime" ? "datetime-local" : B === "number" ? "number" : L === "select" || L === "dynamic-select" ? "select" : "text";
  }, _ = (F) => {
    const [I, C] = oe.useState(
      F.value || ""
    ), [L, B] = oe.useState(""), [J, k] = oe.useState(/* @__PURE__ */ new Set()), [j, T] = oe.useState(!1), [O, w] = oe.useState(0);
    oe.useEffect(() => {
      C(F.value || ""), F.value || B("");
    }, [F.value]), oe.useEffect(() => () => {
      J.forEach((ue) => {
        ue.startsWith("blob:") && URL.revokeObjectURL(ue);
      });
    }, [J]);
    const S = async (ue) => {
      var Re;
      const me = (Re = ue.target.files) == null ? void 0 : Re[0];
      if (me) {
        B(me.name), T(!0), w(0);
        try {
          let Se;
          F.onFileUpload ? Se = await F.onFileUpload(me, {
            onProgress: (ke) => {
              w(ke);
            },
            onError: (ke) => {
              console.error("Upload error:", ke), alert(`Upload failed: ${ke.message}`), T(!1), w(0);
            }
          }) : me.type.startsWith("image/") && me.size < 5 * 1024 * 1024 ? Se = await new Promise((ke) => {
            const ot = new FileReader();
            ot.onload = (Ft) => {
              var kt;
              return ke((kt = Ft.target) == null ? void 0 : kt.result);
            }, ot.readAsDataURL(me);
          }) : (Se = URL.createObjectURL(me), k((ke) => /* @__PURE__ */ new Set([...ke, Se]))), C(Se), F.onChange(Se), T(!1), w(100);
        } catch (Se) {
          console.error("File processing failed:", Se), B(""), T(!1), w(0);
        } finally {
          ue.target.value = "";
        }
      }
    }, P = (ue) => {
      const me = ue.target.value;
      C(me), F.onChange(me), B("");
    }, V = () => {
      I.startsWith("blob:") && J.has(I) && (URL.revokeObjectURL(I), k((ue) => {
        const me = new Set(ue);
        return me.delete(I), me;
      })), C(""), B(""), w(0), F.onChange("");
    }, te = (() => {
      if (L) return L;
      if (!I) return "";
      try {
        return I.startsWith("data:") ? "Image file" : I.startsWith("blob:") ? "Selected file" : new URL(I).pathname.split("/").pop() || "File";
      } catch {
        const ue = I.split("/");
        return ue[ue.length - 1].split("?")[0] || "File";
      }
    })(), Z = Wa(F.name, I), he = Xl(F.name, I);
    return /* @__PURE__ */ d.jsxs("div", { className: "space-y-3 w-full", children: [
      /* @__PURE__ */ d.jsx("div", { className: "space-y-2 w-full", children: /* @__PURE__ */ d.jsxs("div", { className: "flex space-x-2 w-full", children: [
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "url",
            value: I,
            onChange: P,
            className: "flex-1 min-w-0 p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
            placeholder: "https://example.com/file.jpg"
          }
        ),
        I && /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            onClick: V,
            className: "flex-shrink-0 px-3 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors whitespace-nowrap",
            children: "Clear"
          }
        )
      ] }) }),
      /* @__PURE__ */ d.jsxs("div", { className: "space-y-2 w-full", children: [
        /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
          /* @__PURE__ */ d.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "file",
              onChange: S,
              disabled: j,
              accept: he,
              className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
            }
          ) }),
          j && /* @__PURE__ */ d.jsx("div", { className: "flex-shrink-0 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg text-sm flex items-center whitespace-nowrap", children: /* @__PURE__ */ d.jsxs("span", { children: [
            "Uploading... ",
            O,
            "%"
          ] }) }),
          te && /* @__PURE__ */ d.jsx("div", { className: "w-full", children: /* @__PURE__ */ d.jsxs(
            "div",
            {
              className: "text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded border truncate",
              title: te,
              children: [
                "📄 ",
                te
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "text-xs text-gray-500 flex justify-between", children: [
          /* @__PURE__ */ d.jsxs("span", { children: [
            "Accepted: ",
            he === "*/*" ? "All files" : he
          ] }),
          !F.onFileUpload && /* @__PURE__ */ d.jsx("span", { className: "text-orange-600", children: "Local preview only" })
        ] })
      ] }),
      I && (Z === "image" || Z === "video" || Z === "audio") && /* @__PURE__ */ d.jsxs("div", { className: "space-y-2 w-full", children: [
        /* @__PURE__ */ d.jsx("label", { className: "block text-xs font-medium text-gray-700", children: "Preview" }),
        /* @__PURE__ */ d.jsxs("div", { className: "border border-gray-200 rounded p-2 w-full bg-gray-50", children: [
          Z === "image" && /* @__PURE__ */ d.jsx("div", { className: "flex flex-col items-center space-y-2", children: /* @__PURE__ */ d.jsx(
            "img",
            {
              src: I,
              alt: "Preview",
              className: "max-w-full max-h-32 object-contain rounded",
              onError: (ue) => {
                ue.target.style.display = "none";
                const me = ue.target.parentElement;
                if (me) {
                  const Re = document.createElement("div");
                  Re.className = "text-center py-2", Re.innerHTML = `
                        <div class="text-xl mb-1">🖼️</div>
                        <div class="text-xs text-gray-600">Preview not available</div>
                      `, me.appendChild(Re);
                }
              }
            }
          ) }),
          Z === "video" && /* @__PURE__ */ d.jsx("div", { className: "flex flex-col items-center space-y-2", children: /* @__PURE__ */ d.jsx(
            "video",
            {
              src: I,
              controls: !0,
              className: "max-w-full max-h-32 rounded"
            }
          ) }),
          Z === "audio" && /* @__PURE__ */ d.jsx("div", { className: "w-full", children: /* @__PURE__ */ d.jsx("audio", { src: I, controls: !0, className: "w-full" }) })
        ] })
      ] }),
      I && (Z === "document" || Z === "file") && /* @__PURE__ */ d.jsxs("div", { className: "space-y-2 w-full", children: [
        /* @__PURE__ */ d.jsx("label", { className: "block text-xs font-medium text-gray-700", children: "Preview" }),
        /* @__PURE__ */ d.jsxs("div", { className: "border border-gray-200 rounded p-3 bg-gray-50 text-center", children: [
          /* @__PURE__ */ d.jsx("div", { className: "text-2xl mb-1", children: Z === "document" ? "📄" : "📎" }),
          te && /* @__PURE__ */ d.jsx("div", { className: "text-xs text-gray-600 truncate", children: te })
        ] })
      ] })
    ] });
  }, x = (F, I, C, L) => {
    const B = $(F, I, C), J = `Enter ${F}`;
    switch (B) {
      case "color":
        return /* @__PURE__ */ d.jsxs("div", { className: "flex space-x-2 items-center", children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "color",
              value: C || "#000000",
              onChange: (j) => L(j.target.value),
              className: "w-8 h-8 border border-gray-300 rounded cursor-pointer"
            }
          ),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "text",
              value: C,
              onChange: (j) => L(j.target.value),
              className: "flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
              placeholder: J
            }
          )
        ] });
      case "select":
        const k = I.enum || [];
        return /* @__PURE__ */ d.jsxs(
          "select",
          {
            value: C || "",
            onChange: (j) => L(j.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
            children: [
              /* @__PURE__ */ d.jsxs("option", { value: "", children: [
                "Select ",
                F
              ] }),
              k.map((j) => /* @__PURE__ */ d.jsx("option", { value: j, children: j }, j))
            ]
          }
        );
      case "file":
        return /* @__PURE__ */ d.jsx(
          _,
          {
            value: C,
            onChange: L,
            onFileUpload: e.onFileUpload,
            schema: I,
            name: F
          }
        );
      case "date":
        return /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "date",
            value: C || "",
            onChange: (j) => L(j.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          }
        );
      case "datetime-local":
        return /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "datetime-local",
            value: C || "",
            onChange: (j) => L(j.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          }
        );
      default:
        return /* @__PURE__ */ d.jsx(
          "input",
          {
            type: B,
            value: C || "",
            onChange: (j) => L(j.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
            placeholder: J,
            step: B === "number" ? "any" : void 0
          }
        );
    }
  }, E = (F) => {
    const I = new Set(o);
    I.has(F) ? I.delete(F) : I.add(F), l(I);
  }, N = () => {
    if (u)
      l(/* @__PURE__ */ new Set());
    else {
      const F = new Set(t.map((I, C) => C));
      l(F);
    }
    c(!u);
  }, R = () => {
    if (o.size === 0) return;
    const F = h.filter((I, C) => !o.has(C));
    g(F), r(F), l(/* @__PURE__ */ new Set()), c(!1), m(!0);
  }, A = () => {
    const F = n.reduce((C, L) => {
      var J;
      const B = ((J = a[L]) == null ? void 0 : J.default) || "";
      return C[L] = B, C;
    }, {}), I = [...h, F];
    g(I), r(I), m(!0);
  }, D = (F) => {
    const I = h.filter((L, B) => B !== F);
    g(I), r(I);
    const C = new Set(o);
    C.delete(F), l(C), m(!0);
  }, M = () => {
    g([]), r([]), l(/* @__PURE__ */ new Set()), c(!1), m(!0);
  }, U = (F, I) => I.description ? I.description : I.format === "select" ? "Select field" : I.format === "dynamic-select" ? "Dynamic select field" : I.format === "file" ? "File field" : "";
  return /* @__PURE__ */ d.jsxs("div", { className: "space-y-4 w-full", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ d.jsx("div", { className: "flex items-center space-x-4", children: t.length > 0 && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "checkbox",
              checked: u,
              onChange: N,
              className: "w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            }
          ),
          /* @__PURE__ */ d.jsx("span", { className: "ml-2 text-sm text-gray-700", children: "Select All" })
        ] }),
        o.size > 0 && /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            onClick: R,
            className: "px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors",
            children: [
              "Delete Selected (",
              o.size,
              ")"
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ d.jsxs("div", { className: "flex space-x-2", children: [
        f && /* @__PURE__ */ d.jsxs("div", { className: "flex space-x-2", children: [
          /* @__PURE__ */ d.jsxs(
            "button",
            {
              type: "button",
              onClick: y,
              className: "px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors flex items-center",
              children: [
                /* @__PURE__ */ d.jsx("span", { children: "Apply Changes" }),
                f && /* @__PURE__ */ d.jsx("span", { className: "ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full", children: "●" })
              ]
            }
          ),
          /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              onClick: p,
              className: "px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors",
              children: "Reset"
            }
          )
        ] }),
        /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            onClick: A,
            className: "px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors",
            children: "Add Item"
          }
        ),
        t.length > 0 && /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            onClick: M,
            className: "px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors",
            children: "Clear All"
          }
        )
      ] })
    ] }),
    f && /* @__PURE__ */ d.jsx("div", { className: "p-3 bg-yellow-50 border border-yellow-200 rounded-lg", children: /* @__PURE__ */ d.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ d.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ d.jsx("span", { className: "text-yellow-700 text-sm", children: '⚠️ You have unsaved changes. Click "Apply Changes" to save.' }) }) }) }),
    t.length === 0 ? /* @__PURE__ */ d.jsxs("div", { className: "text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg w-full", children: [
      /* @__PURE__ */ d.jsx("div", { className: "text-5xl mb-3", children: "📝" }),
      /* @__PURE__ */ d.jsx("p", { className: "text-base mb-1", children: "No items added yet" }),
      /* @__PURE__ */ d.jsx("p", { className: "text-sm", children: 'Click "Add Item" to get started' })
    ] }) : /* @__PURE__ */ d.jsx("div", { className: "space-y-4 w-full", children: t.map((F, I) => /* @__PURE__ */ d.jsxs(
      "div",
      {
        className: `border rounded-lg p-4 bg-slate-50 shadow-sm w-full transition-all ${o.has(I) ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200" : "border-gray-200 hover:border-gray-300"}`,
        children: [
          /* @__PURE__ */ d.jsxs("div", { className: "flex justify-between items-center mb-4 pb-3 border-b border-gray-200", children: [
            /* @__PURE__ */ d.jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ d.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: o.has(I),
                  onChange: () => E(I),
                  className: "w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                }
              ),
              /* @__PURE__ */ d.jsxs("h4", { className: "font-medium text-gray-700 text-sm", children: [
                "Item ",
                I + 1
              ] })
            ] }),
            /* @__PURE__ */ d.jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ d.jsxs("div", { className: "flex space-x-1", children: [
                n.includes("name") && n.includes("value") && /* @__PURE__ */ d.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      const C = F.name || `Item ${I + 1}`, L = F.value || `value${I + 1}`;
                      b(I, "name", C), b(I, "value", L);
                    },
                    className: "px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors",
                    title: "Auto-fill name and value",
                    children: "Auto-fill"
                  }
                ),
                n.includes("label") && !F.label && F.name && /* @__PURE__ */ d.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      b(I, "label", F.name);
                    },
                    className: "px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors",
                    title: "Use name as label",
                    children: "Use as Label"
                  }
                )
              ] }),
              /* @__PURE__ */ d.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => D(I),
                  className: "px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors",
                  children: "Delete"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ d.jsx("div", { className: "space-y-4 w-full", children: n.map((C) => {
            const L = a[C] || {}, B = F[C] || "", J = U(C, L);
            return /* @__PURE__ */ d.jsxs("div", { className: "space-y-2 w-full", children: [
              /* @__PURE__ */ d.jsxs("label", { className: "block text-sm font-medium text-gray-700 capitalize", children: [
                L.title || C.replace(/([A-Z])/g, " $1").toLowerCase(),
                L.format === "file" && " 📁",
                L.format === "select" && " 📋",
                L.format === "dynamic-select" && " 🔄"
              ] }),
              /* @__PURE__ */ d.jsx("div", { className: "w-full", children: x(
                C,
                L,
                B,
                (k) => b(I, C, k)
              ) }),
              J && /* @__PURE__ */ d.jsx("p", { className: "text-xs text-gray-500", children: J })
            ] }, C);
          }) })
        ]
      },
      I
    )) }),
    /* @__PURE__ */ d.jsxs("div", { className: "flex justify-between items-center text-sm text-gray-500 pt-2 border-t border-gray-200", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "flex space-x-4", children: [
        /* @__PURE__ */ d.jsxs("span", { children: [
          t.length,
          " item(s) total"
        ] }),
        o.size > 0 && /* @__PURE__ */ d.jsxs("span", { className: "text-blue-600 font-medium", children: [
          o.size,
          " selected"
        ] }),
        f && /* @__PURE__ */ d.jsx("span", { className: "text-yellow-600 font-medium", children: "Unsaved changes" })
      ] }),
      n.length > 0 && /* @__PURE__ */ d.jsxs("span", { children: [
        n.length,
        " fields detected"
      ] })
    ] }),
    f && t.length > 2 && /* @__PURE__ */ d.jsx("div", { className: "sticky bottom-4 mt-6 p-4 bg-white border border-gray-300 rounded-lg shadow-lg", children: /* @__PURE__ */ d.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ d.jsxs("span", { className: "text-sm text-gray-700", children: [
        "You have unsaved changes in ",
        t.length,
        " items"
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "flex space-x-2", children: [
        /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            onClick: p,
            className: "px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors",
            children: "Discard Changes"
          }
        ),
        /* @__PURE__ */ d.jsx(
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
}, o9 = (e) => /* @__PURE__ */ d.jsx(
  "input",
  {
    type: "text",
    value: e.value || "",
    onChange: (t) => e.onChange(t.target.value),
    className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    placeholder: e.placeholder
  }
), l9 = (e) => {
  var t;
  return /* @__PURE__ */ d.jsx(
    "textarea",
    {
      value: e.value || "",
      onChange: (r) => e.onChange(r.target.value),
      rows: ((t = e.options) == null ? void 0 : t.rows) || 4,
      className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical",
      placeholder: e.placeholder
    }
  );
}, c9 = (e) => /* @__PURE__ */ d.jsx(
  "input",
  {
    type: "number",
    value: e.value || "",
    onChange: (t) => e.onChange(Number(t.target.value)),
    className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    step: e.step || "any"
  }
), u9 = (e) => {
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
  return /* @__PURE__ */ d.jsx(
    "input",
    {
      type: "date",
      value: t(e.value),
      onChange: r,
      className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    }
  );
}, d9 = (e) => {
  const t = (n) => {
    if (!n) return "";
    if (typeof n == "string") {
      const s = new Date(n);
      if (!isNaN(s.getTime())) {
        const a = s.getFullYear(), i = String(s.getMonth() + 1).padStart(2, "0"), o = String(s.getDate()).padStart(2, "0"), l = String(s.getHours()).padStart(2, "0"), u = String(s.getMinutes()).padStart(2, "0");
        return `${a}-${i}-${o}T${l}:${u}`;
      }
      return n;
    }
    return n;
  }, r = (n) => {
    e.onChange(n.target.value);
  };
  return /* @__PURE__ */ d.jsx(
    "input",
    {
      type: "datetime-local",
      value: t(e.value),
      onChange: r,
      className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    }
  );
}, f9 = (e) => /* @__PURE__ */ d.jsx(
  "input",
  {
    type: "email",
    value: e.value || "",
    onChange: (t) => e.onChange(t.target.value),
    className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    placeholder: e.placeholder
  }
), p9 = (e) => /* @__PURE__ */ d.jsx(
  "input",
  {
    type: "url",
    value: e.value || "",
    onChange: (t) => e.onChange(t.target.value),
    className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    placeholder: e.placeholder
  }
), h9 = (e) => /* @__PURE__ */ d.jsxs("div", { className: "flex space-x-3 items-center", children: [
  /* @__PURE__ */ d.jsx(
    "input",
    {
      type: "color",
      value: e.value || "#000000",
      onChange: (t) => e.onChange(t.target.value),
      className: "w-16 h-16 border border-gray-300 rounded-lg cursor-pointer"
    }
  ),
  /* @__PURE__ */ d.jsx(
    "input",
    {
      type: "text",
      value: e.value || "",
      onChange: (t) => e.onChange(t.target.value),
      className: "flex-1 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      placeholder: "#000000"
    }
  )
] }), m9 = (e) => /* @__PURE__ */ d.jsxs("div", { className: "flex items-center", children: [
  /* @__PURE__ */ d.jsx(
    "input",
    {
      type: "checkbox",
      checked: !!e.value,
      onChange: (t) => e.onChange(t.target.checked),
      className: "w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border border-gray-300"
    }
  ),
  /* @__PURE__ */ d.jsx("span", { className: "ml-3 text-sm text-gray-700", children: e.value ? "Enabled" : "Disabled" })
] }), g9 = ({
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
  } = Rn(), { updateProps: l, getProps: u } = Z6(s == null ? void 0 : s.id), c = Vt({
    instanceId: (s == null ? void 0 : s.id) || null,
    component: a
  });
  if (tt(() => {
    c.current = {
      instanceId: (s == null ? void 0 : s.id) || null,
      component: a
    };
  }, [s, a]), !s && !a)
    return /* @__PURE__ */ d.jsxs("div", { className: "p-6 text-center text-gray-500", children: [
      /* @__PURE__ */ d.jsx("div", { className: "mb-3 text-2xl", children: "👈" }),
      /* @__PURE__ */ d.jsx("p", { className: "text-base", children: "Select a component from the Components tab or click on a placed component to edit its properties" })
    ] });
  const f = (s == null ? void 0 : s.type) || a, m = (s == null ? void 0 : s.props) || {}, h = u() || {}, g = { ...m, ...h };
  let b, y;
  try {
    b = e9(g), y = t9(g, b, e);
  } catch (E) {
    return console.error("Error generating schema:", E), /* @__PURE__ */ d.jsxs("div", { className: "p-6 text-center text-red-500", children: [
      /* @__PURE__ */ d.jsx("div", { className: "mb-3 text-2xl", children: "❌" }),
      /* @__PURE__ */ d.jsx("p", { className: "text-base", children: "Error generating properties form" }),
      /* @__PURE__ */ d.jsx("p", { className: "text-sm mt-2", children: "Please check the console for details" })
    ] });
  }
  const p = (E) => {
    if (E.formData && s) {
      const N = { ...g, ...E.formData }, R = {
        ...s,
        props: N
      };
      i(R), l(N);
    }
  }, v = {
    FileWidget: (E) => /* @__PURE__ */ d.jsx(
      n9,
      {
        ...E,
        onFileUpload: e ? (N) => {
          const R = Wa(E.name, E.value), A = Xl(E.name, E.value);
          return e(N, {
            onProgress: (D) => {
              console.log(`Upload progress: ${D}%`);
            },
            onError: (D) => {
              console.error("Upload error:", D), alert(`Upload failed: ${D.message}`);
            },
            options: {
              fileType: R,
              fieldName: E.name,
              acceptTypes: A,
              componentType: f
            }
          });
        } : void 0
      }
    ),
    CustomSelectWidget: (E) => /* @__PURE__ */ d.jsx(
      s9,
      {
        ...E,
        onGetSelectOptions: n,
        componentType: f,
        uiSchema: y[E.name]
      }
    ),
    JsonWidget: a9,
    ArrayOfObjectsWidget: (E) => /* @__PURE__ */ d.jsx(
      i9,
      {
        ...E,
        onFileUpload: e ? (N, R, A) => e(N, {
          onProgress: (D) => {
            console.log(`Upload progress: ${D}%`);
          },
          onError: (D) => {
            console.error("Upload error:", D), alert(`Upload failed: ${D.message}`);
          },
          options: {
            fieldName: R || E.name,
            fieldType: A || "file",
            componentType: f,
            isArrayItem: !0
          }
        }) : void 0
      }
    ),
    CustomTextWidget: o9,
    CustomTextareaWidget: l9,
    CustomNumberWidget: c9,
    CustomDateWidget: u9,
    CustomDateTimeWidget: d9,
    CustomEmailWidget: f9,
    CustomURLWidget: p9,
    CustomColorWidget: h9,
    CustomCheckboxWidget: m9
  }, $ = {
    FieldTemplate: r9
  }, _ = (E) => typeof E != "string" ? !1 : E.startsWith("/api/"), x = (E) => typeof E != "string" ? !1 : E.toLowerCase().startsWith("/customaction/");
  return /* @__PURE__ */ d.jsxs("div", { className: "h-full p-4 space-y-4 max-h-[calc(100vh-48*0.25rem)] bg-zinc-200 overflow-y-auto", children: [
    /* @__PURE__ */ d.jsx("div", { className: "border-b border-gray-200 bg-white p-6 sticky top-0 z-10", children: /* @__PURE__ */ d.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ d.jsxs("h3", { className: "text-xl font-semibold text-gray-900", children: [
      f,
      s && /* @__PURE__ */ d.jsxs("span", { className: "text-sm text-gray-500 ml-2 font-normal", children: [
        "(ID: ",
        s.id,
        ")"
      ] })
    ] }) }) }),
    /* @__PURE__ */ d.jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ d.jsx("div", { className: "properties-form", children: /* @__PURE__ */ d.jsx(
        XM,
        {
          schema: b,
          uiSchema: y,
          formData: g,
          onChange: p,
          validator: Y6,
          widgets: v,
          templates: $,
          liveValidate: !0,
          children: /* @__PURE__ */ d.jsx("div", { style: { display: "none" } })
        },
        s == null ? void 0 : s.id
      ) }),
      (t || r) && /* @__PURE__ */ d.jsxs("div", { className: "mt-8 p-5 bg-gray-50 rounded-lg border border-gray-200", children: [
        /* @__PURE__ */ d.jsx("h4", { className: "text-sm font-medium text-gray-800 mb-4", children: "Quick Actions" }),
        /* @__PURE__ */ d.jsxs("div", { className: "flex flex-wrap gap-3", children: [
          t && Object.entries(g).some(
            ([E, N]) => _(N)
          ) && /* @__PURE__ */ d.jsx(
            "button",
            {
              onClick: async () => {
                try {
                  const E = Object.entries(
                    g
                  ).filter(([N, R]) => _(R));
                  for (const [N, R] of E)
                    await y9(N, R, t);
                  E.length === 0 ? alert("No API endpoints found") : alert(
                    `Called ${E.length} API endpoint(s)`
                  );
                } catch (E) {
                  console.error("Failed to call APIs:", E), alert("Failed to call APIs");
                }
              },
              className: "px-4 py-3 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors font-medium",
              children: "Call All API Endpoints"
            }
          ),
          r && Object.entries(g).some(
            ([E, N]) => x(N)
          ) && /* @__PURE__ */ d.jsx(
            "button",
            {
              onClick: async () => {
                try {
                  const E = Object.entries(
                    g
                  ).filter(([N, R]) => x(R));
                  for (const [N, R] of E) {
                    const A = R.replace(
                      "/customaction/",
                      ""
                    );
                    await v9(
                      N,
                      A,
                      g,
                      r
                    );
                  }
                  E.length === 0 ? alert("No custom actions found") : alert(
                    `Executed ${E.length} custom action(s)`
                  );
                } catch (E) {
                  console.error(
                    "Failed to execute custom actions:",
                    E
                  ), alert("Failed to execute actions");
                }
              },
              className: "px-4 py-3 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors font-medium",
              children: "Execute All Custom Actions"
            }
          )
        ] })
      ] }),
      Object.keys(g).length === 0 && /* @__PURE__ */ d.jsxs("div", { className: "text-center py-12 text-gray-500", children: [
        /* @__PURE__ */ d.jsx("div", { className: "text-5xl mb-4", children: "📝" }),
        /* @__PURE__ */ d.jsx("p", { className: "text-base mb-2", children: "No properties available for this component" }),
        /* @__PURE__ */ d.jsx("p", { className: "text-sm", children: "Properties will appear here when the component has configurable options" })
      ] })
    ] }),
    (s || a) && /* @__PURE__ */ d.jsx("div", { className: "border-t border-gray-200 bg-white p-6 sticky bottom-0", children: /* @__PURE__ */ d.jsxs("div", { className: "flex space-x-3", children: [
      /* @__PURE__ */ d.jsx(
        "button",
        {
          onClick: () => {
            i(null), o(null);
          },
          className: "flex-1 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium",
          children: "Clear Selection"
        }
      ),
      /* @__PURE__ */ d.jsx(
        "button",
        {
          onClick: () => {
            const E = Object.keys(g).reduce(
              (N, R) => {
                const A = g[R];
                return typeof A == "number" ? N[R] = 0 : typeof A == "boolean" ? N[R] = !1 : Array.isArray(A) ? N[R] = [] : typeof A == "object" ? N[R] = {} : N[R] = "", N;
              },
              {}
            );
            p({ formData: E });
          },
          className: "px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium",
          children: "Reset"
        }
      )
    ] }) })
  ] });
}, y9 = async (e, t, r) => {
  if (r)
    try {
      return await r(t);
    } catch (n) {
      throw console.error("API call failed:", n), n;
    }
}, v9 = async (e, t, r, n) => {
  if (n)
    try {
      return await n(t, r);
    } catch (s) {
      throw console.error("Custom action failed:", s), s;
    }
};
function b9({ onDropDelete: e }) {
  const { removeWidget: t } = Dn(), r = ne((i) => {
    var l;
    i.preventDefault();
    const o = i.dataTransfer.getData("text/plain");
    if (o) {
      const u = document.querySelector(`[gs-id="${o}"]`);
      u && ((l = u.gridstackNode) != null && l.grid) && u.gridstackNode.grid.removeWidget(u, !0, !0), t(o);
    }
    e();
  }, [e, t]), n = (i) => {
    i.preventDefault(), i.dataTransfer.dropEffect = "move";
  }, s = (i) => {
    i.preventDefault(), i.currentTarget.classList.add("bg-red-200", "border-red-400");
  }, a = (i) => {
    i.preventDefault(), i.currentTarget.classList.remove("bg-red-200", "border-red-400");
  };
  return /* @__PURE__ */ d.jsx(
    "div",
    {
      id: "trash",
      onDrop: r,
      onDragOver: n,
      onDragEnter: s,
      onDragLeave: a,
      className: "bg-red-50 min-h-20 h-18 flex items-center justify-center p-0 border-2 border-dashed border-red-200 rounded-lg transition-all duration-200 hover:bg-red-100 cursor-pointer group",
      children: /* @__PURE__ */ d.jsx("div", { className: "w-full h-full flex flex-col items-center justify-center m-3", children: /* @__PURE__ */ d.jsx(
        "svg",
        {
          className: "w-16 h-16 text-red-300 group-hover:text-red-400 transition-colors",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          children: /* @__PURE__ */ d.jsx(
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
const $9 = ({
  componentMapProvider: e,
  onDragStart: t
}) => {
  const { setSelectedComponent: r, setSelectedInstance: n } = Rn(), s = Xd(e);
  return /* @__PURE__ */ d.jsxs("div", { className: "h-full p-4 space-y-4 max-h-[calc(100vh-48*0.25rem)] bg-zinc-200 overflow-y-auto", children: [
    /* @__PURE__ */ d.jsx("h3", { className: "text-lg font-medium mb-3", children: "Components" }),
    /* @__PURE__ */ d.jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Drag components to the main area or click to select them" }),
    /* @__PURE__ */ d.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ d.jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Delete Zone" }),
      /* @__PURE__ */ d.jsx(
        b9,
        {
          onDropDelete: () => {
            console.log("Component deleted via drop zone"), r(null), n(null);
          }
        }
      ),
      /* @__PURE__ */ d.jsx("p", { className: "text-xs text-gray-500 mt-2 text-center", children: "Drag components here to delete them" })
    ] }),
    /* @__PURE__ */ d.jsx(
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
        children: /* @__PURE__ */ d.jsxs("div", { className: "p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-dashed border-blue-300 text-sm hover:from-blue-100 hover:to-indigo-100 cursor-pointer transition-all duration-200 hover:shadow-lg text-center group", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "font-semibold text-blue-700 mb-2 flex items-center justify-center", children: [
            /* @__PURE__ */ d.jsxs(
              "svg",
              {
                className: "w-5 h-5 mr-2 group-hover:scale-110 transition-transform",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: [
                  /* @__PURE__ */ d.jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
                    }
                  ),
                  /* @__PURE__ */ d.jsx(
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
          /* @__PURE__ */ d.jsx("div", { className: "text-xs text-blue-600 font-medium", children: "Nested Grid Container" }),
          /* @__PURE__ */ d.jsx("div", { className: "text-xs text-blue-500 mt-1", children: "Drag to create nested layout" })
        ] })
      },
      "SubGrid"
    ),
    /* @__PURE__ */ d.jsx("div", { className: "grid grid-cols-2 gap-3", children: Object.entries(s).map(([
      a
      /*Component*/
    ]) => /* @__PURE__ */ d.jsx(
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
        children: /* @__PURE__ */ d.jsxs("div", { className: "p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm hover:bg-gray-100 cursor-pointer transition-all duration-200 hover:shadow-md text-center", children: [
          /* @__PURE__ */ d.jsx("div", { className: "font-medium text-gray-800 mb-2", children: a }),
          /* @__PURE__ */ d.jsx("div", { className: "text-xs text-gray-500", children: "Drag to main area" })
        ] })
      },
      a
    )) })
  ] });
}, w9 = ({ onFileUpload: e }) => {
  const { attributes: t, setPageAttributes: r } = Rn(), [n, s] = ve(!1), [a, i] = ve(0), o = Vt(null), l = (h, g) => {
    const b = {
      ...t,
      [h]: g
    };
    r(b);
  }, u = (h) => {
    const g = h.target.value;
    l("image", g);
  }, c = async (h) => {
    var b;
    const g = (b = h.target.files) == null ? void 0 : b[0];
    if (g) {
      s(!0), i(0);
      try {
        let y = URL.createObjectURL(g);
        e && (y = await e(g, {
          onProgress: (p) => i(p),
          onError: (p) => alert(p.message),
          options: {}
        })), o.current && (o.current.value = ""), l("image", y);
      } catch (y) {
        console.error("Failed to upload image:", y), alert("Failed to upload image. Please try again.");
      } finally {
        s(!1), i(0);
      }
    }
  }, f = () => {
    l("image", ""), o.current && (o.current.value = "");
  }, m = ["draft", "published"];
  return /* @__PURE__ */ d.jsxs("div", { className: "h-full p-4 space-y-4 max-h-[calc(100vh-48*0.25rem)] bg-zinc-200 overflow-y-auto", children: [
    /* @__PURE__ */ d.jsx("h3", { className: "text-lg font-medium mb-3", children: "Page Settings" }),
    /* @__PURE__ */ d.jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Configure the overall page layout and appearance" }),
    /* @__PURE__ */ d.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "border-b border-gray-100 pb-4", children: [
        /* @__PURE__ */ d.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-3", children: "Page Image" }),
        /* @__PURE__ */ d.jsxs("div", { className: "mb-6 space-y-2", children: [
          /* @__PURE__ */ d.jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Image URL" }),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "url",
              value: t.image || "",
              onChange: u,
              placeholder: "https://example.com/image.jpg",
              className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            }
          ),
          /* @__PURE__ */ d.jsx("p", { className: "text-xs text-gray-500", children: "Enter image URL or upload a file below" })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-center space-y-4", children: [
          /* @__PURE__ */ d.jsx("div", { className: "relative bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-200 w-full max-w-md", children: t.image ? /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-center space-y-4", children: [
            /* @__PURE__ */ d.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ d.jsx(
                "img",
                {
                  src: t.image,
                  alt: "Page preview",
                  className: "w-64 h-64 object-contain rounded-lg shadow-lg",
                  onError: (h) => {
                    h.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='16' fill='%239ca3af'%3EImage Error%3C/text%3E%3C/svg%3E";
                  }
                }
              ),
              /* @__PURE__ */ d.jsx(
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
            /* @__PURE__ */ d.jsxs("div", { className: "text-center space-y-1", children: [
              /* @__PURE__ */ d.jsx("p", { className: "text-sm text-gray-600 truncate max-w-xs", children: t.image.startsWith("blob:") ? "Temporary Preview" : "Saved Image" }),
              t.image.length > 60 && /* @__PURE__ */ d.jsxs("p", { className: "text-xs text-gray-500 break-all", children: [
                t.image.substring(0, 80),
                "..."
              ] })
            ] })
          ] }) : /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-center justify-center py-12", children: [
            /* @__PURE__ */ d.jsx("div", { className: "w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 mb-4", children: n ? /* @__PURE__ */ d.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ d.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2" }),
              /* @__PURE__ */ d.jsxs("span", { className: "text-sm", children: [
                "Uploading...",
                a,
                "%"
              ] })
            ] }) : /* @__PURE__ */ d.jsx("span", { className: "text-4xl", children: "🖼️" }) }),
            /* @__PURE__ */ d.jsx("p", { className: "text-gray-500 text-sm text-center", children: n ? "Processing your image..." : "No image selected" })
          ] }) }),
          /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-center space-y-3 w-full max-w-md", children: [
            /* @__PURE__ */ d.jsx(
              "input",
              {
                ref: o,
                type: "file",
                accept: "image/*",
                onChange: c,
                disabled: n,
                className: "hidden",
                id: "page-image-upload"
              }
            ),
            /* @__PURE__ */ d.jsx(
              "label",
              {
                htmlFor: "page-image-upload",
                className: `px-8 py-3 rounded-lg transition-colors cursor-pointer text-sm font-medium w-full text-center ${n ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"}`,
                children: n ? "Uploading..." : "Choose Image File"
              }
            ),
            /* @__PURE__ */ d.jsxs("div", { className: "text-center space-y-1", children: [
              n && /* @__PURE__ */ d.jsx("div", { className: "text-sm text-blue-600 font-medium", children: "⏳ Uploading image to server..." }),
              t.image && !n && /* @__PURE__ */ d.jsx("div", { className: "text-sm text-green-600 font-medium", children: "✅ Image saved successfully" }),
              /* @__PURE__ */ d.jsx("p", { className: "text-xs text-gray-500", children: e ? "Images will be uploaded to your server" : "Images will be stored locally (demo mode)" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "border-b border-gray-100 pb-4", children: [
        /* @__PURE__ */ d.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Status" }),
        /* @__PURE__ */ d.jsx(
          "select",
          {
            value: t.status || "draft",
            onChange: (h) => l("status", h.target.value),
            className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            children: m.map((h) => /* @__PURE__ */ d.jsx("option", { value: h, children: h.charAt(0).toUpperCase() + h.slice(1) }, h))
          }
        ),
        /* @__PURE__ */ d.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Set the publication status of this page" })
      ] }),
      /* @__PURE__ */ d.jsx("div", { className: "border-b border-gray-100 pb-4", children: /* @__PURE__ */ d.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Show Component Menu" }),
          /* @__PURE__ */ d.jsx("p", { className: "text-xs text-gray-500", children: "Display the menu bar with delete button on each component" })
        ] }),
        /* @__PURE__ */ d.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "checkbox",
            checked: t.showMenubar,
            onChange: (h) => l(
              "showMenubar",
              h.target.checked
            ),
            className: "w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Margin" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "text",
            value: t.margin,
            onChange: (h) => l("margin", h.target.value),
            className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            placeholder: "e.g., 0, 10px, 1rem"
          }
        ),
        /* @__PURE__ */ d.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Space around the entire page content" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Padding" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "text",
            value: t.padding,
            onChange: (h) => l("padding", h.target.value),
            className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            placeholder: "e.g., 20px, 2rem"
          }
        ),
        /* @__PURE__ */ d.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Space inside the page container" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Background Color" }),
        /* @__PURE__ */ d.jsxs("div", { className: "flex gap-4 items-center", children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "color",
              value: t.background,
              onChange: (h) => l("background", h.target.value),
              className: "w-16 h-16 border border-gray-300 rounded-lg cursor-pointer shadow-sm"
            }
          ),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "text",
              value: t.background,
              onChange: (h) => l("background", h.target.value),
              className: "flex-1 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              placeholder: "#ffffff, rgb(255,255,255), etc."
            }
          )
        ] }),
        /* @__PURE__ */ d.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Background color for the main content area" })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl", children: [
      /* @__PURE__ */ d.jsx("h4", { className: "font-medium text-blue-800 mb-3 text-lg", children: "Current Page Settings" }),
      /* @__PURE__ */ d.jsxs("div", { className: "text-sm text-blue-700 grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ d.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ d.jsx("span", { className: "font-medium", children: "Menu Bar:" }),
          /* @__PURE__ */ d.jsx("code", { className: `px-2 py-1 rounded ${t.showMenubar ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`, children: t.showMenubar ? "Visible" : "Hidden" })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ d.jsx("span", { className: "font-medium", children: "Status:" }),
          /* @__PURE__ */ d.jsx("code", { className: "px-2 py-1 rounded bg-gray-100", children: t.status || "draft" })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ d.jsx("span", { className: "font-medium", children: "Margin:" }),
          /* @__PURE__ */ d.jsx("code", { className: "px-2 py-1 rounded bg-gray-100", children: t.margin || "Not set" })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ d.jsx("span", { className: "font-medium", children: "Padding:" }),
          /* @__PURE__ */ d.jsx("code", { className: "px-2 py-1 rounded bg-gray-100", children: t.padding || "Not set" })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ d.jsx("span", { className: "font-medium", children: "Background:" }),
          /* @__PURE__ */ d.jsx("code", { className: "px-2 py-1 rounded bg-gray-100 truncate max-w-[120px]", children: t.background || "Not set" })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "col-span-2 flex items-start space-x-2", children: [
          /* @__PURE__ */ d.jsx("span", { className: "font-medium whitespace-nowrap", children: "Image:" }),
          /* @__PURE__ */ d.jsx("code", { className: "px-2 py-1 rounded bg-gray-100 break-all flex-1", children: t.image ? t.image.length > 80 ? t.image.substring(0, 80) + "..." : t.image : "Not set" })
        ] })
      ] })
    ] })
  ] });
};
function Vd({
  onClick: e,
  icon: t,
  label: r,
  className: n = "",
  successMessage: s = "Success",
  errorMessage: a = "Error"
}) {
  const [i, o] = ve(null), [l, u] = ve(!1), c = async () => {
    u(!0), o(null);
    try {
      await e(), o({ message: s, type: "success" });
    } catch {
      o({ message: a, type: "error" });
    } finally {
      u(!1), setTimeout(() => o(null), 3e3);
    }
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "relative z-30", children: [
    /* @__PURE__ */ d.jsx(
      "button",
      {
        onClick: c,
        disabled: l,
        className: `p-2 rounded-lg transition flex items-center ${n} ${l ? "opacity-70" : ""}`,
        children: l ? /* @__PURE__ */ d.jsx(Zd, { className: "stack-btn-icon animate-spin" }) : /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          t,
          /* @__PURE__ */ d.jsx("span", { className: "ml-1 text-sm sm:inline", children: r })
        ] })
      }
    ),
    i && /* @__PURE__ */ d.jsx(
      "div",
      {
        className: `absolute top-full left-0 mt-1 w-full text-center px-2 py-1 rounded-md text-xs font-medium animate-fadeIn ${i.type === "success" ? "bg-blue-500 text-white" : "bg-red-100 text-red-800"}`,
        children: i.message
      }
    )
  ] });
}
function un({
  onClick: e,
  icon: t,
  tooltip: r,
  className: n = ""
}) {
  return /* @__PURE__ */ d.jsxs("div", { className: "relative group", children: [
    /* @__PURE__ */ d.jsx(
      "button",
      {
        onClick: e,
        className: `p-2 rounded-lg transition ${n}`,
        children: t
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: "absolute top-full left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10", children: [
      r,
      /* @__PURE__ */ d.jsx("div", { className: "absolute bottom-full left-1/2 w-2 h-2 bg-black transform -translate-x-1/2 rotate-45 -mb-1" })
    ] })
  ] });
}
const _9 = () => {
  const [e, t] = ve(!1);
  return tt(() => {
    const r = () => {
      t(window.innerWidth <= 768);
    };
    return r(), window.addEventListener("resize", r), () => {
      window.removeEventListener("resize", r);
    };
  }, []), e;
}, x9 = ({
  pageid: e,
  pageMode: t,
  onSaveLayout: r,
  onLoadLayout: n,
  componentMapProvider: s,
  componentPropsProvider: a,
  gobackList: i,
  onFileUpload: o,
  onApiCall: l,
  onCustomAction: u,
  onGetSelectOptions: c,
  children: f
}) => {
  const [m, h] = ve(
    t
  ), g = _9(), [b, y] = ve(!g), [p, v] = ve(!1), $ = Vt(!0), {
    activeTab: _,
    setActiveTab: x,
    attributes: E,
    setPageAttributes: N,
    setSelectedInstance: R,
    setSelectedComponent: A,
    widgetProps: D
    // Add this to get widgetProps from context
  } = Rn(), [M, U] = ve({
    id: e,
    type: "page",
    title: "untitled page",
    layout: za
  }), [z, F] = ve(), [I, C] = ve(), [L, B] = ve(0), [J, k] = ve(za), j = Vt(null), [T, O] = ve(), [w, S] = ve(!1);
  tt(() => {
    h(t);
  }, [t]), tt(() => {
    setTimeout(() => {
      $.current && g && ($.current = !1, y(!g));
    }, 100);
  }, [g]), tt(() => {
    m === "preview" || m === "view" ? N((H) => ({
      ...H,
      showMenubar: !1
    })) : m === "edit" && N((H) => ({
      ...H,
      showMenubar: !0
    }));
  }, [m, N]);
  const P = ne(
    async (H) => {
      const je = await n(H);
      return U(je), F(je.title), C(je.title), N(je.attributes || E), je.layout;
    },
    [n]
  ), V = ne(async () => {
    if (e) {
      U((je) => ({ ...je, id: e }));
      const H = await P(e);
      k(H), B((je) => je + 1), ue(), console.log(`Reload layout: pageid ${e}, props id ${M == null ? void 0 : M.id}`);
    }
  }, [e, P]);
  tt(() => {
    (async () => {
      if (e)
        try {
          await V();
        } catch (je) {
          console.error("Failed to load layout:", je);
        }
    })();
  }, [e, V]);
  const q = () => {
    i && i();
  }, te = (H, je) => {
    if (!H) return H;
    const $t = Array.isArray(H) ? H : H.children;
    if (!$t) return H;
    const hr = $t.map((Me) => {
      if (Me.id && je.has(Me.id)) {
        const tn = je.get(Me.id);
        try {
          let wt = { name: "", props: {} };
          return Me.content && (wt = JSON.parse(Me.content)), wt.props = { ...wt.props, ...tn }, {
            ...Me,
            content: JSON.stringify(wt)
          };
        } catch (wt) {
          return console.error(`Error updating props for widget ${Me.id}:`, wt), Me;
        }
      }
      return Me;
    });
    return Array.isArray(H) ? hr : {
      ...H,
      children: hr
    };
  }, Z = () => {
    var $t;
    let H = ($t = j.current) == null ? void 0 : $t.saveLayout();
    return H && (H = te(H, D)), {
      ...M,
      id: e,
      layout: H,
      attributes: E,
      type: E.type,
      title: E.title,
      status: E.status,
      published_at: E.published_at
    };
  }, he = async () => {
    if (r) {
      const H = Z();
      await r(H);
    }
  }, ue = () => {
    A(null), R(null);
  }, me = () => {
    confirm("Are you sure you want to clear all data? This cannot be undone.") && (k(za), B((H) => H + 1), ue());
  }, Re = () => {
    v(!0);
  }, Se = () => {
    v(!1);
  }, ke = (H) => {
    H.key === "Enter" ? Se() : H.key === "Escape" && (C(z), v(!1));
  }, ot = (H, je) => {
    H.dataTransfer.setData("text/plain", je), H.dataTransfer.effectAllowed = "copy";
  }, Ft = (H) => {
    O(H);
  }, kt = ne(
    (H) => {
      const je = {
        id: H.id,
        type: H.name,
        props: H.props
      };
      R(je), A(H.name), x("properties");
    },
    [R, A, x]
  );
  tt(() => {
    T && j.current && (T.name !== "SubGrid" ? j.current.addWidget((H) => ({
      ...T,
      sizeToContent: !0,
      content: JSON.stringify({
        name: T.name,
        props: Ug(a)[T.name]
      })
    })) : j.current.addSubGrid((H) => ({
      ...T,
      ...Lg
    })));
  }, [T, a]);
  const Qr = g ? {
    width: "100vw",
    minWidth: "100vw",
    height: "calc(100% - var(--stackpage-top-spacing, 60px))",
    top: "var(--stackpage-top-spacing, 60px)",
    zIndex: 101
  } : {
    width: "400px",
    minWidth: "300px",
    height: "calc(100% - var(--stackpage-top-spacing, 60px))",
    top: "var(--stackpage-top-spacing, 60px)"
  }, en = {
    margin: E.margin,
    padding: E.padding,
    backgroundColor: E.background
  };
  return /* @__PURE__ */ d.jsx(tg, { initialOptions: J, children: /* @__PURE__ */ d.jsxs("div", { className: "min-h-screen bg-white text-black flex flex-col", children: [
    m === "edit" && /* @__PURE__ */ d.jsx("header", { className: "mx-2 p-4 bg-white shadow relative", children: /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col md:flex-row md:items-center text-lg", children: [
      /* @__PURE__ */ d.jsx("div", { className: "flex-1 mb-3 sm:mb-0 min-w-0", children: /* @__PURE__ */ d.jsx("div", { className: "flex items-center gap-2", children: p ? /* @__PURE__ */ d.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "text",
          value: I,
          onChange: (H) => C(H.target.value),
          onKeyDown: ke,
          onBlur: Se,
          maxLength: 100,
          className: "text-2xl font-bold border-b-2 border-blue-500 bg-transparent outline-none px-1",
          autoFocus: !0
        }
      ) }) : /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2 group", children: [
        /* @__PURE__ */ d.jsx("h1", { className: "text-2xl font-bold truncate", children: I }),
        /* @__PURE__ */ d.jsx(
          "button",
          {
            onClick: Re,
            className: "p-1 text-gray-400 hover:text-gray-600 group-hover:opacity-100 transition-opacity",
            children: /* @__PURE__ */ d.jsx(kg, { className: "stack-btn-icon" })
          }
        )
      ] }) }) }),
      /* @__PURE__ */ d.jsxs("div", { className: "flex flex-wrap gap-1 justify-end", children: [
        /* @__PURE__ */ d.jsx(
          un,
          {
            onClick: q,
            icon: /* @__PURE__ */ d.jsx(Sg, { className: "stack-btn-icon" }),
            tooltip: "Back to list",
            className: "bg-gray-200 hover:bg-gray-300"
          }
        ),
        /* @__PURE__ */ d.jsx(
          un,
          {
            onClick: () => h("preview"),
            icon: /* @__PURE__ */ d.jsx(Cg, { className: "stack-btn-icon" }),
            tooltip: "Preview",
            className: "bg-purple-600 hover:bg-purple-700 text-white"
          }
        ),
        /* @__PURE__ */ d.jsx(
          Vd,
          {
            onClick: he,
            icon: /* @__PURE__ */ d.jsx(Ag, { className: "stack-btn-icon" }),
            label: "Save",
            className: "bg-green-600 hover:bg-green-700 text-white",
            successMessage: "Saved successfully!",
            errorMessage: "Save failed"
          }
        ),
        /* @__PURE__ */ d.jsx(
          Vd,
          {
            onClick: V,
            icon: /* @__PURE__ */ d.jsx(Zd, { className: "stack-btn-icon" }),
            label: "Reload",
            className: "bg-green-600 hover:bg-green-700 text-white",
            successMessage: "Reloaded successfully",
            errorMessage: "Failed to reload"
          }
        ),
        /* @__PURE__ */ d.jsx(
          un,
          {
            onClick: me,
            icon: /* @__PURE__ */ d.jsx(Rg, { className: "stack-btn-icon" }),
            tooltip: "Clear all data",
            className: "bg-red-600 hover:bg-red-700 text-white"
          }
        ),
        /* @__PURE__ */ d.jsx(
          un,
          {
            onClick: () => S(!0),
            icon: /* @__PURE__ */ d.jsx(Ig, { className: "stack-btn-icon" }),
            tooltip: "Page Info & Settings",
            className: "bg-indigo-600 hover:bg-indigo-700 text-white"
          }
        ),
        !g && /* @__PURE__ */ d.jsx(
          un,
          {
            onClick: () => y(!b),
            icon: b ? /* @__PURE__ */ d.jsx(ac, { className: "stack-btn-icon" }) : /* @__PURE__ */ d.jsx(sc, { className: "stack-btn-icon" }),
            tooltip: b ? "Hide Editor" : "Show Editor",
            className: "bg-gray-200 hover:bg-gray-300"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ d.jsxs("div", { className: "flex flex-1 overflow-hidden relative", children: [
      /* @__PURE__ */ d.jsx(
        "div",
        {
          className: `flex-1 transition-all duration-200 ${b && m === "edit" ? "overflow-auto" : "overflow-hidden"}`,
          style: en,
          children: /* @__PURE__ */ d.jsx("div", { className: "h-full", children: /* @__PURE__ */ d.jsx("div", { className: "bg-white rounded-lg shadow h-full flex flex-col", children: /* @__PURE__ */ d.jsxs(
            "div",
            {
              className: `flex-1 relative p-0 grid-stack-mode-${m}`,
              children: [
                /* @__PURE__ */ d.jsx(Wg, { ref: j }),
                /* @__PURE__ */ d.jsx(
                  mg,
                  {
                    onGridStackDropEvent: Ft,
                    children: /* @__PURE__ */ d.jsx(
                      wg,
                      {
                        componentMap: Xd(s),
                        showMenubar: E.showMenubar,
                        onWidgetSelect: kt
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
      m === "edit" && b && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        g && /* @__PURE__ */ d.jsx(
          "div",
          {
            className: "relative inset-0 bg-black bg-opacity-50 z-40 stack-tab-panel-top-mobile",
            onClick: () => y(!1)
          }
        ),
        /* @__PURE__ */ d.jsxs(
          "div",
          {
            className: `flex flex-col bg-white shadow-lg border-l border-gray-200 ${g ? "fixed right-0 bottom-0 transform transition-transform duration-300" : "relative"}`,
            style: Qr,
            children: [
              g && /* @__PURE__ */ d.jsx("div", { className: "absolute top-4 right-4 z-10", children: /* @__PURE__ */ d.jsx(
                "button",
                {
                  onClick: () => y(!1),
                  className: "p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors",
                  children: /* @__PURE__ */ d.jsx(ac, { className: "stack-btn-icon" })
                }
              ) }),
              /* @__PURE__ */ d.jsx("div", { className: "flex border-b border-gray-200 pt-4 px-4", children: ["components", "properties", "page"].map(
                (H) => /* @__PURE__ */ d.jsx(
                  "button",
                  {
                    className: `flex-1 py-3 px-4 text-sm font-medium capitalize transition-colors ${_ === H ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`,
                    onClick: () => x(H),
                    children: H
                  },
                  H
                )
              ) }),
              /* @__PURE__ */ d.jsxs("div", { className: "flex-1 overflow-y-auto pb-4", children: [
                /* @__PURE__ */ d.jsx(
                  "div",
                  {
                    style: {
                      display: _ === "components" ? "block" : "none"
                    },
                    children: /* @__PURE__ */ d.jsx(
                      $9,
                      {
                        componentMapProvider: s,
                        onDragStart: ot
                      }
                    )
                  }
                ),
                /* @__PURE__ */ d.jsx(
                  "div",
                  {
                    style: {
                      display: _ === "properties" ? "block" : "none"
                    },
                    children: /* @__PURE__ */ d.jsx(
                      g9,
                      {
                        onFileUpload: o,
                        onApiCall: l,
                        onCustomAction: u,
                        onGetSelectOptions: c
                      }
                    )
                  }
                ),
                /* @__PURE__ */ d.jsx(
                  "div",
                  {
                    style: { display: _ === "page" ? "block" : "none" },
                    children: /* @__PURE__ */ d.jsx(w9, { onFileUpload: o })
                  }
                )
              ] })
            ]
          }
        )
      ] })
    ] }),
    m === "edit" && g && !b && /* @__PURE__ */ d.jsx("div", { className: "fixed bottom-4 right-4 z-30", children: /* @__PURE__ */ d.jsx(
      "button",
      {
        onClick: () => y(!0),
        className: "p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors",
        children: /* @__PURE__ */ d.jsx(sc, { className: "stack-btn-icon" })
      }
    ) }),
    m === "preview" && /* @__PURE__ */ d.jsx("div", { className: "fixed inset-0 pointer-events-none z-50", children: /* @__PURE__ */ d.jsx("div", { className: "absolute bottom-8 right-8 pointer-events-auto", children: /* @__PURE__ */ d.jsxs(
      "button",
      {
        onClick: () => h("edit"),
        className: "flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 group",
        title: "Return to Edit Mode",
        children: [
          /* @__PURE__ */ d.jsx(nc, { className: "stack-btn-icon group-hover:animate-bounce" }),
          /* @__PURE__ */ d.jsx("span", { className: "text-sm font-medium", children: "Edit Mode" })
        ]
      }
    ) }) }),
    m === "view" && i && /* @__PURE__ */ d.jsx("div", { className: "fixed inset-0 pointer-events-none z-50", children: /* @__PURE__ */ d.jsx("div", { className: "absolute bottom-8 right-8 pointer-events-auto", children: /* @__PURE__ */ d.jsxs(
      "button",
      {
        onClick: i,
        className: "flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 group",
        title: "Back to List",
        children: [
          /* @__PURE__ */ d.jsx(nc, { className: "stack-btn-icon group-hover:animate-bounce" }),
          /* @__PURE__ */ d.jsx("span", { className: "text-sm font-medium", children: "Back to List" })
        ]
      }
    ) }) }),
    /* @__PURE__ */ d.jsx(
      zg,
      {
        isOpen: w,
        pageInfo: Z,
        resetOpenInfo: S
      }
    )
  ] }) }, L);
}, C9 = (e) => /* @__PURE__ */ d.jsx(Bg, { children: /* @__PURE__ */ d.jsx(x9, { ...e }) });
export {
  tg as GridStackProvider,
  wg as GridStackRender,
  mg as GridStackRenderProvider,
  P9 as LocaleProvider,
  C9 as StackPage,
  za as gridOptions,
  Lg as subGridOptions,
  Dn as useGridStackContext,
  N9 as useGridStackWidgetContext,
  A9 as useLocale
};
//# sourceMappingURL=stackpage.es.js.map
