var zm = Object.defineProperty;
var Bm = (e, t, r) => t in e ? zm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var ue = (e, t, r) => Bm(e, typeof t != "symbol" ? t + "" : t, r);
import * as G from "react";
import $e, { createContext as In, useContext as Fr, useState as de, useCallback as te, useRef as Xt, useLayoutEffect as tc, useMemo as zd, useEffect as Xe, forwardRef as qm, useImperativeHandle as Km, createElement as Gm, Component as Fn, useReducer as Hm, createRef as Jm } from "react";
import { GridStack as pn } from "gridstack";
import { createPortal as Ym } from "react-dom";
var rs = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function kn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Bd = { exports: {} }, Js = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zm = $e, Xm = Symbol.for("react.element"), Qm = Symbol.for("react.fragment"), eg = Object.prototype.hasOwnProperty, tg = Zm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, rg = { key: !0, ref: !0, __self: !0, __source: !0 };
function qd(e, t, r) {
  var n, s = {}, a = null, i = null;
  r !== void 0 && (a = "" + r), t.key !== void 0 && (a = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (n in t) eg.call(t, n) && !rg.hasOwnProperty(n) && (s[n] = t[n]);
  if (e && e.defaultProps) for (n in t = e.defaultProps, t) s[n] === void 0 && (s[n] = t[n]);
  return { $$typeof: Xm, type: e, key: a, ref: i, props: s, _owner: tg.current };
}
Js.Fragment = Qm;
Js.jsx = qd;
Js.jsxs = qd;
Bd.exports = Js;
var d = Bd.exports;
const Kd = In(null);
function Dn() {
  const e = Fr(Kd);
  if (!e)
    throw new Error(
      "useGridStackContext must be used within a GridStackProvider"
    );
  return e;
}
function ng({
  children: e,
  initialOptions: t
}) {
  const [r, n] = de(null), [s, a] = de(() => {
    var m;
    const c = /* @__PURE__ */ new Map(), f = (h) => {
      var y;
      h.id && h.content && c.set(h.id, h), (y = h.subGridOpts) != null && y.children && h.subGridOpts.children.forEach((v) => {
        f(v);
      });
    };
    return (m = t.children) == null || m.forEach((h) => {
      f(h);
    }), c;
  }), i = te(
    (c) => {
      const f = `widget-${Math.random().toString(36).substring(2, 15)}`, m = c(f);
      r == null || r.addWidget({ ...m, id: f }), a((h) => {
        const y = new Map(h);
        return y.set(f, m), y;
      });
    },
    [r]
  ), o = te(
    (c) => {
      const f = `sub-grid-${Math.random().toString(36).substring(2, 15)}`, m = /* @__PURE__ */ new Map(), h = c(f, (y) => {
        const v = `widget-${Math.random().toString(36).substring(2, 15)}`;
        return m.set(v, y), { ...y, id: v };
      });
      r == null || r.addWidget({ ...h, id: f }), a((y) => {
        const v = new Map(y);
        return m.forEach((g, p) => {
          v.set(p, g);
        }), v;
      });
    },
    [r]
  ), l = te(
    (c) => {
      r == null || r.removeWidget(c), a((f) => {
        const m = new Map(f);
        return m.delete(c), m;
      });
    },
    [r]
  ), u = te(() => r == null ? void 0 : r.save(!0, !0, (c, f) => f), [r]);
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
function sg() {
  const e = Fr(Gd);
  if (!e)
    throw new Error(
      "useGridStackRenderContext must be used within a GridStackProvider"
    );
  return e;
}
var ag = typeof Element < "u", ig = typeof Map == "function", og = typeof Set == "function", lg = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
function gs(e, t) {
  if (e === t) return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor) return !1;
    var r, n, s;
    if (Array.isArray(e)) {
      if (r = e.length, r != t.length) return !1;
      for (n = r; n-- !== 0; )
        if (!gs(e[n], t[n])) return !1;
      return !0;
    }
    var a;
    if (ig && e instanceof Map && t instanceof Map) {
      if (e.size !== t.size) return !1;
      for (a = e.entries(); !(n = a.next()).done; )
        if (!t.has(n.value[0])) return !1;
      for (a = e.entries(); !(n = a.next()).done; )
        if (!gs(n.value[1], t.get(n.value[0]))) return !1;
      return !0;
    }
    if (og && e instanceof Set && t instanceof Set) {
      if (e.size !== t.size) return !1;
      for (a = e.entries(); !(n = a.next()).done; )
        if (!t.has(n.value[0])) return !1;
      return !0;
    }
    if (lg && ArrayBuffer.isView(e) && ArrayBuffer.isView(t)) {
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
    if (ag && e instanceof Element) return !1;
    for (n = r; n-- !== 0; )
      if (!((s[n] === "_owner" || s[n] === "__v" || s[n] === "__o") && e.$$typeof) && !gs(e[s[n]], t[s[n]]))
        return !1;
    return !0;
  }
  return e !== e && t !== t;
}
var cg = function(t, r) {
  try {
    return gs(t, r);
  } catch (n) {
    if ((n.message || "").match(/stack|recursion/i))
      return console.warn("react-fast-compare cannot handle circular refs"), !1;
    throw n;
  }
};
const ug = /* @__PURE__ */ kn(cg), Ae = [];
for (let e = 0; e < 256; ++e)
  Ae.push((e + 256).toString(16).slice(1));
function dg(e, t = 0) {
  return (Ae[e[t + 0]] + Ae[e[t + 1]] + Ae[e[t + 2]] + Ae[e[t + 3]] + "-" + Ae[e[t + 4]] + Ae[e[t + 5]] + "-" + Ae[e[t + 6]] + Ae[e[t + 7]] + "-" + Ae[e[t + 8]] + Ae[e[t + 9]] + "-" + Ae[e[t + 10]] + Ae[e[t + 11]] + Ae[e[t + 12]] + Ae[e[t + 13]] + Ae[e[t + 14]] + Ae[e[t + 15]]).toLowerCase();
}
let Va;
const fg = new Uint8Array(16);
function pg() {
  if (!Va) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    Va = crypto.getRandomValues.bind(crypto);
  }
  return Va(fg);
}
const hg = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), rc = { randomUUID: hg };
function Hd(e, t, r) {
  var s;
  if (rc.randomUUID && !e)
    return rc.randomUUID();
  e = e || {};
  const n = e.random ?? ((s = e.rng) == null ? void 0 : s.call(e)) ?? pg();
  if (n.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, dg(n);
}
const mg = pn.prototype.resizeToContent;
pn.prototype.resizeToContent = function(e) {
  const t = e.querySelector(".grid-stack-item-content");
  if (t != null && t.firstElementChild)
    return mg.call(this, e);
};
function gg({
  children: e,
  onGridStackDropEvent: t
}) {
  const {
    _gridStack: { value: r, set: n },
    initialOptions: s
  } = Dn(), a = Xt(/* @__PURE__ */ new Map()), i = Xt(null), o = Xt(s), l = te(
    (c, f) => {
      f.id && a.current.set(f.id, c);
    },
    []
  ), u = te(() => {
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
          const y = h.el, v = y.dataset.gsType;
          if (v && t) {
            const g = {
              name: v,
              id: Hd(),
              x: h.x || 0,
              y: h.y || 0,
              w: v === "SubGrid" ? 12 : 4,
              // SubGrid takes full width
              h: v === "SubGrid" ? 6 : 4
              // SubGrid is taller              
            };
            t(g), c.removeWidget(y, !0);
          }
        }
      }), c;
    }
    return null;
  }, [l, t]);
  return tc(() => {
    if (!ug(s, o.current) && r)
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
const Jd = In(null);
function N6() {
  const e = Fr(Jd);
  if (!e)
    throw new Error(
      "useGridStackWidgetContext must be used within a GridStackWidgetProvider"
    );
  return e;
}
function yg({
  widgetId: e
}) {
  const { removeWidget: t } = Dn(), [r, n] = G.useState(!1), [s, a] = G.useState({ top: 0, left: 0 }), i = G.useRef(null), o = (c) => {
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
  return G.useEffect(() => {
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
function vg({ widgetId: e, children: t }) {
  const r = Xt(null);
  return Xe(() => {
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
  const l = $g(t), u = o || l.props, c = (u == null ? void 0 : u.title) || `Widget ${e.slice(0, 4)}`, f = (h) => {
    i && i({
      id: e,
      name: l.name,
      props: u
      // Use the resolved props
    });
  }, m = /* @__PURE__ */ d.jsx(vg, { widgetId: e, children: /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: `h-full w-full ${a ? "outline outline-2 outline-blue-400 outline-offset-1" : ""}`,
      onClick: f,
      children: [
        s && /* @__PURE__ */ d.jsxs("div", { className: "widget-header flex items-center justify-between bg-gray-100 border-b px-2 min-h-[36px]", children: [
          /* @__PURE__ */ d.jsx("div", { className: "font-medium truncate text-sm px-1", children: c }),
          /* @__PURE__ */ d.jsx(yg, { widgetId: e })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "widget-body flex-1 min-h-[40px] cursor-pointer", children: [
          /* @__PURE__ */ d.jsx(r, { ...u }),
          " "
        ] })
      ]
    }
  ) });
  return /* @__PURE__ */ d.jsx(Jd.Provider, { value: { widget: { id: e } }, children: Ym(m, n) });
}
const Ji = In(
  void 0
), Rn = () => {
  const e = Fr(Ji);
  if (!e)
    throw new Error("useStackPage must be used within a StackPageProvider");
  return e;
}, Yd = () => {
  const e = Fr(Ji);
  if (!e)
    throw new Error(
      "useStackPageWidgetProps must be used within a StackPageProvider"
    );
  return {
    widgetProps: e.widgetProps,
    updateWidgetProps: e.updateWidgetProps
  };
};
function _g(e) {
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
  const { _rawWidgetMetaMap: n } = Dn(), { getWidgetContainer: s } = sg(), { widgetProps: a } = Yd(), { selectedInstance: i } = Rn();
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    Array.from(n.value.entries()).length === 0 && /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 p-8 text-center", children: [
      /* @__PURE__ */ d.jsx("div", { className: "text-4xl mb-4", children: "📦" }),
      /* @__PURE__ */ d.jsx("h3", { className: "text-lg font-medium mb-2", children: "Drag Components Here" }),
      /* @__PURE__ */ d.jsx("p", { className: "text-sm", children: "Drag components from the Components tab in the right panel to start building your layout" })
    ] }),
    Array.from(n.value.entries()).map(([o, l]) => {
      const { name: u, props: c } = _g(l), f = e[u], m = s(o), h = a.get(o) || c;
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
const Zd = In(void 0), P6 = () => {
  const e = Fr(Zd);
  if (!e)
    throw new Error("useLocale must be used within a LocaleProvider");
  return e;
}, C6 = ({ children: e, defaultLocale: t = "en-US" }) => {
  const [r, n] = de(t);
  return /* @__PURE__ */ d.jsx(Zd.Provider, { value: { locale: r, setLocale: n }, children: e });
};
function xg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ G.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ G.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ G.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const nc = /* @__PURE__ */ G.forwardRef(xg);
function Sg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ G.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ G.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ G.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
  }));
}
const jg = /* @__PURE__ */ G.forwardRef(Sg);
function Eg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ G.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ G.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ G.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
  }));
}
const Xd = /* @__PURE__ */ G.forwardRef(Eg);
function Og({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ G.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ G.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ G.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 19.5 8.25 12l7.5-7.5"
  }));
}
const sc = /* @__PURE__ */ G.forwardRef(Og);
function Ag({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ G.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ G.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ G.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m8.25 4.5 7.5 7.5-7.5 7.5"
  }));
}
const ac = /* @__PURE__ */ G.forwardRef(Ag);
function Ng({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ G.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ G.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ G.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
  }));
}
const Pg = /* @__PURE__ */ G.forwardRef(Ng);
function Cg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ G.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ G.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ G.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
  }), /* @__PURE__ */ G.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
  }));
}
const Tg = /* @__PURE__ */ G.forwardRef(Cg);
function Ig({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ G.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ G.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ G.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
  }));
}
const Fg = /* @__PURE__ */ G.forwardRef(Ig);
function kg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ G.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ G.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ G.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
  }));
}
const Dg = /* @__PURE__ */ G.forwardRef(kg);
function Rg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ G.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ G.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ G.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
  }));
}
const Mg = /* @__PURE__ */ G.forwardRef(Rg);
function Lg({ content: e }) {
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
], $i = {
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
}, Ug = {
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
}, za = () => ({
  id: `${Hd()}`,
  title: "untitled page",
  grids: $i
}), ic = {
  Text: {
    content: "Any content other than text are what we call cards. Cards can be accessed by clicking the ➕ button or typing / at the beginning of a paragraph.\nEven better, continue typing to find the card you're looking for, hit enter, and avoid dragging your mouse altogether.\nSome cards have a handy little shortcut, to keep you on track and in flow. Use --- to divide your paragraphs with a line, or ``` to add a code block. You can also drag and drop images directly into the editor to bypass the menu. \nAny content other than text are what we call cards. Cards can be accessed by clicking the ➕ button or typing / at the beginning of a paragraph.",
    title: "This is text card"
  }
}, oc = {
  Text: Lg
}, Qd = (e) => {
  if (e) {
    const t = e();
    return { ...oc, ...t };
  }
  return oc;
}, Wg = (e) => {
  if (e) {
    const t = e();
    return { ...ic, ...t };
  }
  return ic;
}, Vg = qm((e, t) => {
  const { addWidget: r, addSubGrid: n, saveOptions: s, _rawWidgetMetaMap: a } = Dn();
  return Km(t, () => ({
    saveLayout: () => s(),
    addWidget: r,
    addSubGrid: n,
    rawWidgetMetaMap: a
  })), null;
});
function zg({ pageInfo: e }) {
  const [t, r] = de(void 0);
  return Xe(() => {
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
function Bg({
  isOpen: e,
  pageInfo: t,
  resetOpenInfo: r
}) {
  const [n, s] = G.useState(!1);
  G.useEffect(() => {
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
        /* @__PURE__ */ d.jsx("div", { className: "p-4 overflow-y-auto flex-1", children: /* @__PURE__ */ d.jsx(zg, { pageInfo: t }) }),
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
function qg({ children: e }) {
  const [t, r] = de(
    null
  ), [n, s] = de(null), [a, i] = de({
    margin: "5",
    padding: "10px",
    background: "#ffffff",
    showMenubar: !0,
    image: "",
    // Add this
    tag: "",
    // Add this
    status: "draft"
    // Add this
  }), [o, l] = de("components"), [u, c] = de(
    /* @__PURE__ */ new Map()
  ), f = te((h, y) => {
    c((v) => {
      const g = new Map(v);
      return g.set(h, y), g;
    });
  }, []), m = {
    selectedComponent: t,
    setSelectedComponent: r,
    selectedInstance: n,
    setSelectedInstance: s,
    pageAttributes: a,
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
function Kg(e) {
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
const Mn = "__additional_property", bi = "additionalProperties", kr = "allOf", et = "anyOf", xt = "const", Gg = "default", Ys = "dependencies", Hg = "enum", Le = "__errors", Dt = "$id", Jg = "if", Mt = "items", Yg = "_$junk_option_schema_id$_", ys = "$name", Ue = "oneOf", xe = "properties", Zg = "required", Ps = "submitButtonOptions", Ee = "$ref", Yi = "__rjsf_additionalProperties", ef = "__rjsf_rootSchema", Xg = "ui:field", Zi = "ui:widget", hn = "ui:options", Qg = "ui:globalOptions";
function se(e = {}, t = {}) {
  return Object.keys(e).filter((r) => r.indexOf("ui:") === 0).reduce((r, n) => {
    const s = e[n];
    return n === Zi && ae(s) ? (console.error("Setting options via ui:widget object is no longer supported, use ui:options instead"), r) : n === hn && ae(s) ? { ...r, ...s } : { ...r, [n.substring(3)]: s };
  }, { ...t });
}
function ey(e, t = {}, r) {
  if (!e.additionalProperties)
    return !1;
  const { expandable: n = !0 } = se(t);
  return n === !1 ? n : e.maxProperties !== void 0 && r ? Object.keys(r).length < e.maxProperties : !0;
}
var tf = typeof global == "object" && global && global.Object === Object && global, ty = typeof self == "object" && self && self.Object === Object && self, dt = tf || ty || Function("return this")(), Ke = dt.Symbol, rf = Object.prototype, ry = rf.hasOwnProperty, ny = rf.toString, rn = Ke ? Ke.toStringTag : void 0;
function sy(e) {
  var t = ry.call(e, rn), r = e[rn];
  try {
    e[rn] = void 0;
    var n = !0;
  } catch {
  }
  var s = ny.call(e);
  return n && (t ? e[rn] = r : delete e[rn]), s;
}
var ay = Object.prototype, iy = ay.toString;
function oy(e) {
  return iy.call(e);
}
var ly = "[object Null]", cy = "[object Undefined]", cc = Ke ? Ke.toStringTag : void 0;
function Ot(e) {
  return e == null ? e === void 0 ? cy : ly : cc && cc in Object(e) ? sy(e) : oy(e);
}
function nf(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var Zs = nf(Object.getPrototypeOf, Object);
function Ge(e) {
  return e != null && typeof e == "object";
}
var uy = "[object Object]", dy = Function.prototype, fy = Object.prototype, sf = dy.toString, py = fy.hasOwnProperty, hy = sf.call(Object);
function Qt(e) {
  if (!Ge(e) || Ot(e) != uy)
    return !1;
  var t = Zs(e);
  if (t === null)
    return !0;
  var r = py.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && sf.call(r) == hy;
}
function Cs(e) {
  const t = {
    // We store the list of errors for this node in a property named __errors
    // to avoid name collision with a possible sub schema field named
    // 'errors' (see `utils.toErrorSchema`).
    [Le]: [],
    addError(r) {
      this[Le].push(r);
    }
  };
  if (Array.isArray(e))
    return e.reduce((r, n, s) => ({ ...r, [s]: Cs(n) }), t);
  if (Qt(e)) {
    const r = e;
    return Object.keys(r).reduce((n, s) => ({ ...n, [s]: Cs(r[s]) }), t);
  }
  return t;
}
function my() {
  this.__data__ = [], this.size = 0;
}
function Ln(e, t) {
  return e === t || e !== e && t !== t;
}
function Xs(e, t) {
  for (var r = e.length; r--; )
    if (Ln(e[r][0], t))
      return r;
  return -1;
}
var gy = Array.prototype, yy = gy.splice;
function vy(e) {
  var t = this.__data__, r = Xs(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : yy.call(t, r, 1), --this.size, !0;
}
function $y(e) {
  var t = this.__data__, r = Xs(t, e);
  return r < 0 ? void 0 : t[r][1];
}
function by(e) {
  return Xs(this.__data__, e) > -1;
}
function _y(e, t) {
  var r = this.__data__, n = Xs(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
function At(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
At.prototype.clear = my;
At.prototype.delete = vy;
At.prototype.get = $y;
At.prototype.has = by;
At.prototype.set = _y;
function wy() {
  this.__data__ = new At(), this.size = 0;
}
function xy(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
function Sy(e) {
  return this.__data__.get(e);
}
function jy(e) {
  return this.__data__.has(e);
}
function ge(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Ey = "[object AsyncFunction]", Oy = "[object Function]", Ay = "[object GeneratorFunction]", Ny = "[object Proxy]";
function Qs(e) {
  if (!ge(e))
    return !1;
  var t = Ot(e);
  return t == Oy || t == Ay || t == Ey || t == Ny;
}
var Ba = dt["__core-js_shared__"], uc = function() {
  var e = /[^.]+$/.exec(Ba && Ba.keys && Ba.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Py(e) {
  return !!uc && uc in e;
}
var Cy = Function.prototype, Ty = Cy.toString;
function sr(e) {
  if (e != null) {
    try {
      return Ty.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Iy = /[\\^$.*+?()[\]{}|]/g, Fy = /^\[object .+?Constructor\]$/, ky = Function.prototype, Dy = Object.prototype, Ry = ky.toString, My = Dy.hasOwnProperty, Ly = RegExp(
  "^" + Ry.call(My).replace(Iy, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Uy(e) {
  if (!ge(e) || Py(e))
    return !1;
  var t = Qs(e) ? Ly : Fy;
  return t.test(sr(e));
}
function Wy(e, t) {
  return e == null ? void 0 : e[t];
}
function ar(e, t) {
  var r = Wy(e, t);
  return Uy(r) ? r : void 0;
}
var Sn = ar(dt, "Map"), jn = ar(Object, "create");
function Vy() {
  this.__data__ = jn ? jn(null) : {}, this.size = 0;
}
function zy(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var By = "__lodash_hash_undefined__", qy = Object.prototype, Ky = qy.hasOwnProperty;
function Gy(e) {
  var t = this.__data__;
  if (jn) {
    var r = t[e];
    return r === By ? void 0 : r;
  }
  return Ky.call(t, e) ? t[e] : void 0;
}
var Hy = Object.prototype, Jy = Hy.hasOwnProperty;
function Yy(e) {
  var t = this.__data__;
  return jn ? t[e] !== void 0 : Jy.call(t, e);
}
var Zy = "__lodash_hash_undefined__";
function Xy(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = jn && t === void 0 ? Zy : t, this;
}
function er(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
er.prototype.clear = Vy;
er.prototype.delete = zy;
er.prototype.get = Gy;
er.prototype.has = Yy;
er.prototype.set = Xy;
function Qy() {
  this.size = 0, this.__data__ = {
    hash: new er(),
    map: new (Sn || At)(),
    string: new er()
  };
}
function e0(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function ea(e, t) {
  var r = e.__data__;
  return e0(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
function t0(e) {
  var t = ea(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function r0(e) {
  return ea(this, e).get(e);
}
function n0(e) {
  return ea(this, e).has(e);
}
function s0(e, t) {
  var r = ea(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
function Nt(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Nt.prototype.clear = Qy;
Nt.prototype.delete = t0;
Nt.prototype.get = r0;
Nt.prototype.has = n0;
Nt.prototype.set = s0;
var a0 = 200;
function i0(e, t) {
  var r = this.__data__;
  if (r instanceof At) {
    var n = r.__data__;
    if (!Sn || n.length < a0 - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new Nt(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
function tt(e) {
  var t = this.__data__ = new At(e);
  this.size = t.size;
}
tt.prototype.clear = wy;
tt.prototype.delete = xy;
tt.prototype.get = Sy;
tt.prototype.has = jy;
tt.prototype.set = i0;
var o0 = "__lodash_hash_undefined__";
function l0(e) {
  return this.__data__.set(e, o0), this;
}
function c0(e) {
  return this.__data__.has(e);
}
function xr(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new Nt(); ++t < r; )
    this.add(e[t]);
}
xr.prototype.add = xr.prototype.push = l0;
xr.prototype.has = c0;
function u0(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
function Xi(e, t) {
  return e.has(t);
}
var d0 = 1, f0 = 2;
function af(e, t, r, n, s, a) {
  var i = r & d0, o = e.length, l = t.length;
  if (o != l && !(i && l > o))
    return !1;
  var u = a.get(e), c = a.get(t);
  if (u && c)
    return u == t && c == e;
  var f = -1, m = !0, h = r & f0 ? new xr() : void 0;
  for (a.set(e, t), a.set(t, e); ++f < o; ) {
    var y = e[f], v = t[f];
    if (n)
      var g = i ? n(v, y, f, t, e, a) : n(y, v, f, e, t, a);
    if (g !== void 0) {
      if (g)
        continue;
      m = !1;
      break;
    }
    if (h) {
      if (!u0(t, function(p, $) {
        if (!Xi(h, $) && (y === p || s(y, p, r, n, a)))
          return h.push($);
      })) {
        m = !1;
        break;
      }
    } else if (!(y === v || s(y, v, r, n, a))) {
      m = !1;
      break;
    }
  }
  return a.delete(e), a.delete(t), m;
}
var Ts = dt.Uint8Array;
function p0(e) {
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
var h0 = 1, m0 = 2, g0 = "[object Boolean]", y0 = "[object Date]", v0 = "[object Error]", $0 = "[object Map]", b0 = "[object Number]", _0 = "[object RegExp]", w0 = "[object Set]", x0 = "[object String]", S0 = "[object Symbol]", j0 = "[object ArrayBuffer]", E0 = "[object DataView]", dc = Ke ? Ke.prototype : void 0, qa = dc ? dc.valueOf : void 0;
function O0(e, t, r, n, s, a, i) {
  switch (r) {
    case E0:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case j0:
      return !(e.byteLength != t.byteLength || !a(new Ts(e), new Ts(t)));
    case g0:
    case y0:
    case b0:
      return Ln(+e, +t);
    case v0:
      return e.name == t.name && e.message == t.message;
    case _0:
    case x0:
      return e == t + "";
    case $0:
      var o = p0;
    case w0:
      var l = n & h0;
      if (o || (o = Qi), e.size != t.size && !l)
        return !1;
      var u = i.get(e);
      if (u)
        return u == t;
      n |= m0, i.set(e, t);
      var c = af(o(e), o(t), n, s, a, i);
      return i.delete(e), c;
    case S0:
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
var Oe = Array.isArray;
function of(e, t, r) {
  var n = t(e);
  return Oe(e) ? n : eo(n, r(e));
}
function A0(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, s = 0, a = []; ++r < n; ) {
    var i = e[r];
    t(i, r, e) && (a[s++] = i);
  }
  return a;
}
function lf() {
  return [];
}
var N0 = Object.prototype, P0 = N0.propertyIsEnumerable, fc = Object.getOwnPropertySymbols, to = fc ? function(e) {
  return e == null ? [] : (e = Object(e), A0(fc(e), function(t) {
    return P0.call(e, t);
  }));
} : lf;
function cf(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var C0 = "[object Arguments]";
function pc(e) {
  return Ge(e) && Ot(e) == C0;
}
var uf = Object.prototype, T0 = uf.hasOwnProperty, I0 = uf.propertyIsEnumerable, Sr = pc(/* @__PURE__ */ function() {
  return arguments;
}()) ? pc : function(e) {
  return Ge(e) && T0.call(e, "callee") && !I0.call(e, "callee");
};
function F0() {
  return !1;
}
var df = typeof exports == "object" && exports && !exports.nodeType && exports, hc = df && typeof module == "object" && module && !module.nodeType && module, k0 = hc && hc.exports === df, mc = k0 ? dt.Buffer : void 0, D0 = mc ? mc.isBuffer : void 0, tr = D0 || F0, R0 = 9007199254740991, M0 = /^(?:0|[1-9]\d*)$/;
function ta(e, t) {
  var r = typeof e;
  return t = t ?? R0, !!t && (r == "number" || r != "symbol" && M0.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var L0 = 9007199254740991;
function ro(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= L0;
}
var U0 = "[object Arguments]", W0 = "[object Array]", V0 = "[object Boolean]", z0 = "[object Date]", B0 = "[object Error]", q0 = "[object Function]", K0 = "[object Map]", G0 = "[object Number]", H0 = "[object Object]", J0 = "[object RegExp]", Y0 = "[object Set]", Z0 = "[object String]", X0 = "[object WeakMap]", Q0 = "[object ArrayBuffer]", ev = "[object DataView]", tv = "[object Float32Array]", rv = "[object Float64Array]", nv = "[object Int8Array]", sv = "[object Int16Array]", av = "[object Int32Array]", iv = "[object Uint8Array]", ov = "[object Uint8ClampedArray]", lv = "[object Uint16Array]", cv = "[object Uint32Array]", ye = {};
ye[tv] = ye[rv] = ye[nv] = ye[sv] = ye[av] = ye[iv] = ye[ov] = ye[lv] = ye[cv] = !0;
ye[U0] = ye[W0] = ye[Q0] = ye[V0] = ye[ev] = ye[z0] = ye[B0] = ye[q0] = ye[K0] = ye[G0] = ye[H0] = ye[J0] = ye[Y0] = ye[Z0] = ye[X0] = !1;
function uv(e) {
  return Ge(e) && ro(e.length) && !!ye[Ot(e)];
}
function no(e) {
  return function(t) {
    return e(t);
  };
}
var ff = typeof exports == "object" && exports && !exports.nodeType && exports, mn = ff && typeof module == "object" && module && !module.nodeType && module, dv = mn && mn.exports === ff, Ka = dv && tf.process, jr = function() {
  try {
    var e = mn && mn.require && mn.require("util").types;
    return e || Ka && Ka.binding && Ka.binding("util");
  } catch {
  }
}(), gc = jr && jr.isTypedArray, Un = gc ? no(gc) : uv, fv = Object.prototype, pv = fv.hasOwnProperty;
function pf(e, t) {
  var r = Oe(e), n = !r && Sr(e), s = !r && !n && tr(e), a = !r && !n && !s && Un(e), i = r || n || s || a, o = i ? cf(e.length, String) : [], l = o.length;
  for (var u in e)
    (t || pv.call(e, u)) && !(i && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    a && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    ta(u, l))) && o.push(u);
  return o;
}
var hv = Object.prototype;
function ra(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || hv;
  return e === r;
}
var mv = nf(Object.keys, Object), gv = Object.prototype, yv = gv.hasOwnProperty;
function hf(e) {
  if (!ra(e))
    return mv(e);
  var t = [];
  for (var r in Object(e))
    yv.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
function Dr(e) {
  return e != null && ro(e.length) && !Qs(e);
}
function at(e) {
  return Dr(e) ? pf(e) : hf(e);
}
function _i(e) {
  return of(e, at, to);
}
var vv = 1, $v = Object.prototype, bv = $v.hasOwnProperty;
function _v(e, t, r, n, s, a) {
  var i = r & vv, o = _i(e), l = o.length, u = _i(t), c = u.length;
  if (l != c && !i)
    return !1;
  for (var f = l; f--; ) {
    var m = o[f];
    if (!(i ? m in t : bv.call(t, m)))
      return !1;
  }
  var h = a.get(e), y = a.get(t);
  if (h && y)
    return h == t && y == e;
  var v = !0;
  a.set(e, t), a.set(t, e);
  for (var g = i; ++f < l; ) {
    m = o[f];
    var p = e[m], $ = t[m];
    if (n)
      var b = i ? n($, p, m, t, e, a) : n(p, $, m, e, t, a);
    if (!(b === void 0 ? p === $ || s(p, $, r, n, a) : b)) {
      v = !1;
      break;
    }
    g || (g = m == "constructor");
  }
  if (v && !g) {
    var w = e.constructor, x = t.constructor;
    w != x && "constructor" in e && "constructor" in t && !(typeof w == "function" && w instanceof w && typeof x == "function" && x instanceof x) && (v = !1);
  }
  return a.delete(e), a.delete(t), v;
}
var wi = ar(dt, "DataView"), xi = ar(dt, "Promise"), $r = ar(dt, "Set"), Si = ar(dt, "WeakMap"), yc = "[object Map]", wv = "[object Object]", vc = "[object Promise]", $c = "[object Set]", bc = "[object WeakMap]", _c = "[object DataView]", xv = sr(wi), Sv = sr(Sn), jv = sr(xi), Ev = sr($r), Ov = sr(Si), Be = Ot;
(wi && Be(new wi(new ArrayBuffer(1))) != _c || Sn && Be(new Sn()) != yc || xi && Be(xi.resolve()) != vc || $r && Be(new $r()) != $c || Si && Be(new Si()) != bc) && (Be = function(e) {
  var t = Ot(e), r = t == wv ? e.constructor : void 0, n = r ? sr(r) : "";
  if (n)
    switch (n) {
      case xv:
        return _c;
      case Sv:
        return yc;
      case jv:
        return vc;
      case Ev:
        return $c;
      case Ov:
        return bc;
    }
  return t;
});
var Av = 1, wc = "[object Arguments]", xc = "[object Array]", ns = "[object Object]", Nv = Object.prototype, Sc = Nv.hasOwnProperty;
function Pv(e, t, r, n, s, a) {
  var i = Oe(e), o = Oe(t), l = i ? xc : Be(e), u = o ? xc : Be(t);
  l = l == wc ? ns : l, u = u == wc ? ns : u;
  var c = l == ns, f = u == ns, m = l == u;
  if (m && tr(e)) {
    if (!tr(t))
      return !1;
    i = !0, c = !1;
  }
  if (m && !c)
    return a || (a = new tt()), i || Un(e) ? af(e, t, r, n, s, a) : O0(e, t, l, r, n, s, a);
  if (!(r & Av)) {
    var h = c && Sc.call(e, "__wrapped__"), y = f && Sc.call(t, "__wrapped__");
    if (h || y) {
      var v = h ? e.value() : e, g = y ? t.value() : t;
      return a || (a = new tt()), s(v, g, r, n, a);
    }
  }
  return m ? (a || (a = new tt()), _v(e, t, r, n, s, a)) : !1;
}
function na(e, t, r, n, s) {
  return e === t ? !0 : e == null || t == null || !Ge(e) && !Ge(t) ? e !== e && t !== t : Pv(e, t, r, n, na, s);
}
function Cv(e, t, r) {
  r = typeof r == "function" ? r : void 0;
  var n = r ? r(e, t) : void 0;
  return n === void 0 ? na(e, t, void 0, r) : !!n;
}
function be(e, t) {
  return Cv(e, t, (r, n) => {
    if (typeof r == "function" && typeof n == "function")
      return !0;
  });
}
var Tv = "[object Symbol]";
function Wn(e) {
  return typeof e == "symbol" || Ge(e) && Ot(e) == Tv;
}
var Iv = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Fv = /^\w*$/;
function so(e, t) {
  if (Oe(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || Wn(e) ? !0 : Fv.test(e) || !Iv.test(e) || t != null && e in Object(t);
}
var kv = "Expected a function";
function ao(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(kv);
  var r = function() {
    var n = arguments, s = t ? t.apply(this, n) : n[0], a = r.cache;
    if (a.has(s))
      return a.get(s);
    var i = e.apply(this, n);
    return r.cache = a.set(s, i) || a, i;
  };
  return r.cache = new (ao.Cache || Nt)(), r;
}
ao.Cache = Nt;
var Dv = 500;
function Rv(e) {
  var t = ao(e, function(n) {
    return r.size === Dv && r.clear(), n;
  }), r = t.cache;
  return t;
}
var Mv = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Lv = /\\(\\)?/g, mf = Rv(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Mv, function(r, n, s, a) {
    t.push(s ? a.replace(Lv, "$1") : n || r);
  }), t;
});
function sa(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, s = Array(n); ++r < n; )
    s[r] = t(e[r], r, e);
  return s;
}
var jc = Ke ? Ke.prototype : void 0, Ec = jc ? jc.toString : void 0;
function gf(e) {
  if (typeof e == "string")
    return e;
  if (Oe(e))
    return sa(e, gf) + "";
  if (Wn(e))
    return Ec ? Ec.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function io(e) {
  return e == null ? "" : gf(e);
}
function Rr(e, t) {
  return Oe(e) ? e : so(e, t) ? [e] : mf(io(e));
}
function ir(e) {
  if (typeof e == "string" || Wn(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function aa(e, t) {
  t = Rr(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[ir(t[r++])];
  return r && r == n ? e : void 0;
}
function z(e, t, r) {
  var n = e == null ? void 0 : aa(e, t);
  return n === void 0 ? r : n;
}
var Uv = "[object Map]", Wv = "[object Set]", Vv = Object.prototype, zv = Vv.hasOwnProperty;
function Er(e) {
  if (e == null)
    return !0;
  if (Dr(e) && (Oe(e) || typeof e == "string" || typeof e.splice == "function" || tr(e) || Un(e) || Sr(e)))
    return !e.length;
  var t = Be(e);
  if (t == Uv || t == Wv)
    return !e.size;
  if (ra(e))
    return !hf(e).length;
  for (var r in e)
    if (zv.call(e, r))
      return !1;
  return !0;
}
var ia = {}, Bv = /~/, qv = /~[01]/g;
function Kv(e) {
  switch (e) {
    case "~1":
      return "/";
    case "~0":
      return "~";
  }
  throw new Error("Invalid tilde escape: " + e);
}
function yf(e) {
  return Bv.test(e) ? e.replace(qv, Kv) : e;
}
function Gv(e, t, r) {
  for (var n, s, a = 1, i = t.length; a < i; ) {
    if (t[a] === "constructor" || t[a] === "prototype" || t[a] === "__proto__") return e;
    if (n = yf(t[a++]), s = i > a, typeof e[n] > "u" && (Array.isArray(e) && n === "-" && (n = e.length), s && (t[a] !== "" && t[a] < 1 / 0 || t[a] === "-" ? e[n] = [] : e[n] = {})), !s) break;
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
function vf(e, t) {
  if (typeof e != "object") throw new Error("Invalid input object.");
  t = oo(t);
  var r = t.length;
  if (r === 1) return e;
  for (var n = 1; n < r; ) {
    if (e = e[yf(t[n++])], r === n) return e;
    if (typeof e != "object" || e === null) return;
  }
}
function $f(e, t, r) {
  if (typeof e != "object") throw new Error("Invalid input object.");
  if (t = oo(t), t.length === 0) throw new Error("Invalid JSON pointer for set.");
  return Gv(e, t, r);
}
function Hv(e) {
  var t = oo(e);
  return {
    get: function(r) {
      return vf(r, t);
    },
    set: function(r, n) {
      return $f(r, t, n);
    }
  };
}
ia.get = vf;
ia.set = $f;
ia.compile = Hv;
function lo(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var Is = function() {
  try {
    var e = ar(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
function co(e, t, r) {
  t == "__proto__" && Is ? Is(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var Jv = Object.prototype, Yv = Jv.hasOwnProperty;
function uo(e, t, r) {
  var n = e[t];
  (!(Yv.call(e, t) && Ln(n, r)) || r === void 0 && !(t in e)) && co(e, t, r);
}
function Mr(e, t, r, n) {
  var s = !r;
  r || (r = {});
  for (var a = -1, i = t.length; ++a < i; ) {
    var o = t[a], l = void 0;
    l === void 0 && (l = e[o]), s ? co(r, o, l) : uo(r, o, l);
  }
  return r;
}
function Zv(e, t) {
  return e && Mr(t, at(t), e);
}
function Xv(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var Qv = Object.prototype, e$ = Qv.hasOwnProperty;
function t$(e) {
  if (!ge(e))
    return Xv(e);
  var t = ra(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !e$.call(e, n)) || r.push(n);
  return r;
}
function Vn(e) {
  return Dr(e) ? pf(e, !0) : t$(e);
}
function r$(e, t) {
  return e && Mr(t, Vn(t), e);
}
var bf = typeof exports == "object" && exports && !exports.nodeType && exports, Oc = bf && typeof module == "object" && module && !module.nodeType && module, n$ = Oc && Oc.exports === bf, Ac = n$ ? dt.Buffer : void 0, Nc = Ac ? Ac.allocUnsafe : void 0;
function _f(e, t) {
  if (t)
    return e.slice();
  var r = e.length, n = Nc ? Nc(r) : new e.constructor(r);
  return e.copy(n), n;
}
function fo(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
function s$(e, t) {
  return Mr(e, to(e), t);
}
var a$ = Object.getOwnPropertySymbols, wf = a$ ? function(e) {
  for (var t = []; e; )
    eo(t, to(e)), e = Zs(e);
  return t;
} : lf;
function i$(e, t) {
  return Mr(e, wf(e), t);
}
function po(e) {
  return of(e, Vn, wf);
}
var o$ = Object.prototype, l$ = o$.hasOwnProperty;
function c$(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && l$.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
function ho(e) {
  var t = new e.constructor(e.byteLength);
  return new Ts(t).set(new Ts(e)), t;
}
function u$(e, t) {
  var r = t ? ho(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var d$ = /\w*$/;
function f$(e) {
  var t = new e.constructor(e.source, d$.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var Pc = Ke ? Ke.prototype : void 0, Cc = Pc ? Pc.valueOf : void 0;
function p$(e) {
  return Cc ? Object(Cc.call(e)) : {};
}
function xf(e, t) {
  var r = t ? ho(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var h$ = "[object Boolean]", m$ = "[object Date]", g$ = "[object Map]", y$ = "[object Number]", v$ = "[object RegExp]", $$ = "[object Set]", b$ = "[object String]", _$ = "[object Symbol]", w$ = "[object ArrayBuffer]", x$ = "[object DataView]", S$ = "[object Float32Array]", j$ = "[object Float64Array]", E$ = "[object Int8Array]", O$ = "[object Int16Array]", A$ = "[object Int32Array]", N$ = "[object Uint8Array]", P$ = "[object Uint8ClampedArray]", C$ = "[object Uint16Array]", T$ = "[object Uint32Array]";
function I$(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case w$:
      return ho(e);
    case h$:
    case m$:
      return new n(+e);
    case x$:
      return u$(e, r);
    case S$:
    case j$:
    case E$:
    case O$:
    case A$:
    case N$:
    case P$:
    case C$:
    case T$:
      return xf(e, r);
    case g$:
      return new n();
    case y$:
    case b$:
      return new n(e);
    case v$:
      return f$(e);
    case $$:
      return new n();
    case _$:
      return p$(e);
  }
}
var Tc = Object.create, Sf = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!ge(t))
      return {};
    if (Tc)
      return Tc(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}();
function jf(e) {
  return typeof e.constructor == "function" && !ra(e) ? Sf(Zs(e)) : {};
}
var F$ = "[object Map]";
function k$(e) {
  return Ge(e) && Be(e) == F$;
}
var Ic = jr && jr.isMap, D$ = Ic ? no(Ic) : k$, R$ = "[object Set]";
function M$(e) {
  return Ge(e) && Be(e) == R$;
}
var Fc = jr && jr.isSet, L$ = Fc ? no(Fc) : M$, U$ = 1, W$ = 2, V$ = 4, Ef = "[object Arguments]", z$ = "[object Array]", B$ = "[object Boolean]", q$ = "[object Date]", K$ = "[object Error]", Of = "[object Function]", G$ = "[object GeneratorFunction]", H$ = "[object Map]", J$ = "[object Number]", Af = "[object Object]", Y$ = "[object RegExp]", Z$ = "[object Set]", X$ = "[object String]", Q$ = "[object Symbol]", eb = "[object WeakMap]", tb = "[object ArrayBuffer]", rb = "[object DataView]", nb = "[object Float32Array]", sb = "[object Float64Array]", ab = "[object Int8Array]", ib = "[object Int16Array]", ob = "[object Int32Array]", lb = "[object Uint8Array]", cb = "[object Uint8ClampedArray]", ub = "[object Uint16Array]", db = "[object Uint32Array]", he = {};
he[Ef] = he[z$] = he[tb] = he[rb] = he[B$] = he[q$] = he[nb] = he[sb] = he[ab] = he[ib] = he[ob] = he[H$] = he[J$] = he[Af] = he[Y$] = he[Z$] = he[X$] = he[Q$] = he[lb] = he[cb] = he[ub] = he[db] = !0;
he[K$] = he[Of] = he[eb] = !1;
function gn(e, t, r, n, s, a) {
  var i, o = t & U$, l = t & W$, u = t & V$;
  if (r && (i = s ? r(e, n, s, a) : r(e)), i !== void 0)
    return i;
  if (!ge(e))
    return e;
  var c = Oe(e);
  if (c) {
    if (i = c$(e), !o)
      return fo(e, i);
  } else {
    var f = Be(e), m = f == Of || f == G$;
    if (tr(e))
      return _f(e, o);
    if (f == Af || f == Ef || m && !s) {
      if (i = l || m ? {} : jf(e), !o)
        return l ? i$(e, r$(i, e)) : s$(e, Zv(i, e));
    } else {
      if (!he[f])
        return s ? e : {};
      i = I$(e, f, o);
    }
  }
  a || (a = new tt());
  var h = a.get(e);
  if (h)
    return h;
  a.set(e, i), L$(e) ? e.forEach(function(g) {
    i.add(gn(g, t, r, g, e, a));
  }) : D$(e) && e.forEach(function(g, p) {
    i.set(p, gn(g, t, r, p, e, a));
  });
  var y = u ? l ? po : _i : l ? Vn : at, v = c ? void 0 : y(e);
  return lo(v || e, function(g, p) {
    v && (p = g, g = e[p]), uo(i, p, gn(g, t, r, p, e, a));
  }), i;
}
function fb(e) {
  var t = e == null ? 0 : e.length;
  return t ? e[t - 1] : void 0;
}
function pb(e, t, r) {
  var n = -1, s = e.length;
  t < 0 && (t = -t > s ? 0 : s + t), r = r > s ? s : r, r < 0 && (r += s), s = t > r ? 0 : r - t >>> 0, t >>>= 0;
  for (var a = Array(s); ++n < s; )
    a[n] = e[n + t];
  return a;
}
function hb(e, t) {
  return t.length < 2 ? e : aa(e, pb(t, 0, -1));
}
function Nf(e, t) {
  return t = Rr(t, e), e = hb(e, t), e == null || delete e[ir(fb(t))];
}
function mb(e) {
  return Qt(e) ? void 0 : e;
}
var kc = Ke ? Ke.isConcatSpreadable : void 0;
function gb(e) {
  return Oe(e) || Sr(e) || !!(kc && e && e[kc]);
}
function zn(e, t, r, n, s) {
  var a = -1, i = e.length;
  for (r || (r = gb), s || (s = []); ++a < i; ) {
    var o = e[a];
    t > 0 && r(o) ? t > 1 ? zn(o, t - 1, r, n, s) : eo(s, o) : n || (s[s.length] = o);
  }
  return s;
}
function yb(e) {
  var t = e == null ? 0 : e.length;
  return t ? zn(e, 1) : [];
}
function vb(e, t, r) {
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
function Pf(e, t, r) {
  return t = Dc(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, s = -1, a = Dc(n.length - t, 0), i = Array(a); ++s < a; )
      i[s] = n[t + s];
    s = -1;
    for (var o = Array(t + 1); ++s < t; )
      o[s] = n[s];
    return o[t] = r(i), vb(e, this, o);
  };
}
function $b(e) {
  return function() {
    return e;
  };
}
function oa(e) {
  return e;
}
var bb = Is ? function(e, t) {
  return Is(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: $b(t),
    writable: !0
  });
} : oa, _b = 800, wb = 16, xb = Date.now;
function Sb(e) {
  var t = 0, r = 0;
  return function() {
    var n = xb(), s = wb - (n - r);
    if (r = n, s > 0) {
      if (++t >= _b)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
var Cf = Sb(bb);
function Tf(e) {
  return Cf(Pf(e, void 0, yb), e + "");
}
var jb = 1, Eb = 2, Ob = 4, Fs = Tf(function(e, t) {
  var r = {};
  if (e == null)
    return r;
  var n = !1;
  t = sa(t, function(a) {
    return a = Rr(a, e), n || (n = a.length > 1), a;
  }), Mr(e, po(e), r), n && (r = gn(r, jb | Eb | Ob, mb));
  for (var s = t.length; s--; )
    Nf(r, t[s]);
  return r;
});
function mo(e, t) {
  const r = t[e];
  return [Fs(t, [e]), r];
}
function If(e, t = {}, r = []) {
  const n = e || "";
  let s;
  if (n.startsWith("#"))
    s = decodeURIComponent(n.substring(1));
  else
    throw new Error(`Could not find a definition for ${e}.`);
  const a = ia.get(t, s);
  if (a === void 0)
    throw new Error(`Could not find a definition for ${e}.`);
  const i = a[Ee];
  if (i) {
    if (r.includes(i)) {
      if (r.length === 1)
        throw new Error(`Definition for ${e} is a circular reference`);
      const [c, ...f] = r, m = [...f, n, c].join(" -> ");
      throw new Error(`Definition for ${c} contains a circular reference through ${m}`);
    }
    const [o, l] = mo(Ee, a), u = If(l, t, [...r, n]);
    return Object.keys(o).length > 0 ? { ...o, ...u } : u;
  }
  return a;
}
function Ff(e, t = {}) {
  return If(e, t, []);
}
var Ab = Object.prototype, Nb = Ab.hasOwnProperty;
function Pb(e, t) {
  return e != null && Nb.call(e, t);
}
function kf(e, t, r) {
  t = Rr(t, e);
  for (var n = -1, s = t.length, a = !1; ++n < s; ) {
    var i = ir(t[n]);
    if (!(a = e != null && r(e, i)))
      break;
    e = e[i];
  }
  return a || ++n != s ? a : (s = e == null ? 0 : e.length, !!s && ro(s) && ta(i, s) && (Oe(e) || Sr(e)));
}
function Fe(e, t) {
  return e != null && kf(e, t, Pb);
}
var Cb = "[object Number]";
function Df(e) {
  return typeof e == "number" || Ge(e) && Ot(e) == Cb;
}
var Tb = "[object String]";
function la(e) {
  return typeof e == "string" || !Oe(e) && Ge(e) && Ot(e) == Tb;
}
function Ib(e, t, r, n) {
  var s = -1, a = e == null ? 0 : e.length;
  for (n && a && (r = e[++s]); ++s < a; )
    r = t(r, e[s], s, e);
  return r;
}
function Fb(e) {
  return function(t, r, n) {
    for (var s = -1, a = Object(t), i = n(t), o = i.length; o--; ) {
      var l = i[++s];
      if (r(a[l], l, a) === !1)
        break;
    }
    return t;
  };
}
var Rf = Fb();
function Mf(e, t) {
  return e && Rf(e, t, at);
}
function kb(e, t) {
  return function(r, n) {
    if (r == null)
      return r;
    if (!Dr(r))
      return e(r, n);
    for (var s = r.length, a = -1, i = Object(r); ++a < s && n(i[a], a, i) !== !1; )
      ;
    return r;
  };
}
var Lf = kb(Mf), Db = 1, Rb = 2;
function Mb(e, t, r, n) {
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
      var c = new tt(), f;
      if (!(f === void 0 ? na(u, l, Db | Rb, n, c) : f))
        return !1;
    }
  }
  return !0;
}
function Uf(e) {
  return e === e && !ge(e);
}
function Lb(e) {
  for (var t = at(e), r = t.length; r--; ) {
    var n = t[r], s = e[n];
    t[r] = [n, s, Uf(s)];
  }
  return t;
}
function Wf(e, t) {
  return function(r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
  };
}
function Ub(e) {
  var t = Lb(e);
  return t.length == 1 && t[0][2] ? Wf(t[0][0], t[0][1]) : function(r) {
    return r === e || Mb(r, e, t);
  };
}
function Wb(e, t) {
  return e != null && t in Object(e);
}
function Vf(e, t) {
  return e != null && kf(e, t, Wb);
}
var Vb = 1, zb = 2;
function Bb(e, t) {
  return so(e) && Uf(t) ? Wf(ir(e), t) : function(r) {
    var n = z(r, e);
    return n === void 0 && n === t ? Vf(r, e) : na(t, n, Vb | zb);
  };
}
function qb(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function Kb(e) {
  return function(t) {
    return aa(t, e);
  };
}
function Gb(e) {
  return so(e) ? qb(ir(e)) : Kb(e);
}
function go(e) {
  return typeof e == "function" ? e : e == null ? oa : typeof e == "object" ? Oe(e) ? Bb(e[0], e[1]) : Ub(e) : Gb(e);
}
function Hb(e, t, r, n, s) {
  return s(e, function(a, i, o) {
    r = n ? (n = !1, a) : t(r, a, i, o);
  }), r;
}
function Jb(e, t, r) {
  var n = Oe(e) ? Ib : Hb, s = arguments.length < 3;
  return n(e, go(t), r, s, Lf);
}
function zf(e) {
  return typeof e == "function" ? e : oa;
}
var Yb = /\s/;
function Zb(e) {
  for (var t = e.length; t-- && Yb.test(e.charAt(t)); )
    ;
  return t;
}
var Xb = /^\s+/;
function Qb(e) {
  return e && e.slice(0, Zb(e) + 1).replace(Xb, "");
}
var Rc = NaN, e1 = /^[-+]0x[0-9a-f]+$/i, t1 = /^0b[01]+$/i, r1 = /^0o[0-7]+$/i, n1 = parseInt;
function s1(e) {
  if (typeof e == "number")
    return e;
  if (Wn(e))
    return Rc;
  if (ge(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = ge(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = Qb(e);
  var r = t1.test(e);
  return r || r1.test(e) ? n1(e.slice(2), r ? 2 : 8) : e1.test(e) ? Rc : +e;
}
var Mc = 1 / 0, a1 = 17976931348623157e292;
function i1(e) {
  if (!e)
    return e === 0 ? e : 0;
  if (e = s1(e), e === Mc || e === -Mc) {
    var t = e < 0 ? -1 : 1;
    return t * a1;
  }
  return e === e ? e : 0;
}
function o1(e) {
  var t = i1(e), r = t % 1;
  return t === t ? r ? t - r : t : 0;
}
var l1 = 9007199254740991, Ga = 4294967295, c1 = Math.min;
function Bf(e, t) {
  if (e = o1(e), e < 1 || e > l1)
    return [];
  var r = Ga, n = c1(e, Ga);
  t = zf(t), e -= Ga;
  for (var s = cf(n, t); ++r < e; )
    t(r);
  return s;
}
function qf(e, t, r) {
  var n;
  if (e && r) {
    const s = z(e, r);
    if (s === void 0)
      return;
    for (let a = 0; a < t.length; a++) {
      const i = t[a], o = z(i, [xe, r], {});
      if (!(o.type === "object" || o.type === "array") && (o.const === s || !((n = o.enum) === null || n === void 0) && n.includes(s)))
        return a;
    }
  }
}
function Kf(e, t, r, n, s) {
  if (t === void 0)
    return 0;
  const a = qf(t, r, s);
  if (Df(a))
    return a;
  for (let i = 0; i < r.length; i++) {
    const o = r[i];
    if (s && Fe(o, [xe, s])) {
      const l = z(t, s), u = z(o, [xe, s], {});
      if (e.isValid(u, l, n))
        return i;
    } else if (o[xe]) {
      const l = {
        anyOf: Object.keys(o[xe]).map((c) => ({
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
  return Kf(e, t, r, n, s);
}
function vo(e, t, r, n) {
  if (!ge(e))
    return e;
  t = Rr(t, e);
  for (var s = -1, a = t.length, i = a - 1, o = e; o != null && ++s < a; ) {
    var l = ir(t[s]), u = r;
    if (l === "__proto__" || l === "constructor" || l === "prototype")
      return e;
    if (s != i) {
      var c = o[l];
      u = n ? n(c, l, o) : void 0, u === void 0 && (u = ge(c) ? c : ta(t[s + 1]) ? [] : {});
    }
    uo(o, l, u), o = o[l];
  }
  return e;
}
function Pe(e, t, r) {
  return e == null ? e : vo(e, t, r);
}
function u1(e, t, r) {
  var n = Oe(e), s = n || tr(e) || Un(e);
  if (t = go(t), r == null) {
    var a = e && e.constructor;
    s ? r = n ? new a() : [] : ge(e) ? r = Qs(a) ? Sf(Zs(e)) : {} : r = {};
  }
  return (s ? lo : Mf)(e, function(i, o, l) {
    return t(r, i, o, l);
  }), r;
}
function ji(e, t, r) {
  (r !== void 0 && !Ln(e[t], r) || r === void 0 && !(t in e)) && co(e, t, r);
}
function ks(e) {
  return Ge(e) && Dr(e);
}
function Ei(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function d1(e) {
  return Mr(e, Vn(e));
}
function f1(e, t, r, n, s, a, i) {
  var o = Ei(e, r), l = Ei(t, r), u = i.get(l);
  if (u) {
    ji(e, r, u);
    return;
  }
  var c = a ? a(o, l, r + "", e, t, i) : void 0, f = c === void 0;
  if (f) {
    var m = Oe(l), h = !m && tr(l), y = !m && !h && Un(l);
    c = l, m || h || y ? Oe(o) ? c = o : ks(o) ? c = fo(o) : h ? (f = !1, c = _f(l, !0)) : y ? (f = !1, c = xf(l, !0)) : c = [] : Qt(l) || Sr(l) ? (c = o, Sr(o) ? c = d1(o) : (!ge(o) || Qs(o)) && (c = jf(l))) : f = !1;
  }
  f && (i.set(l, c), s(c, l, n, a, i), i.delete(l)), ji(e, r, c);
}
function Gf(e, t, r, n, s) {
  e !== t && Rf(t, function(a, i) {
    if (s || (s = new tt()), ge(a))
      f1(e, t, i, r, Gf, n, s);
    else {
      var o = n ? n(Ei(e, i), a, i + "", e, t, s) : void 0;
      o === void 0 && (o = a), ji(e, i, o);
    }
  }, Vn);
}
function $o(e, t) {
  return Cf(Pf(e, t, oa), e + "");
}
function p1(e, t, r) {
  if (!ge(r))
    return !1;
  var n = typeof t;
  return (n == "number" ? Dr(r) && ta(t, r.length) : n == "string" && t in r) ? Ln(r[t], e) : !1;
}
function h1(e) {
  return $o(function(t, r) {
    var n = -1, s = r.length, a = s > 1 ? r[s - 1] : void 0, i = s > 2 ? r[2] : void 0;
    for (a = e.length > 3 && typeof a == "function" ? (s--, a) : void 0, i && p1(r[0], r[1], i) && (a = s < 3 ? void 0 : a, s = 1), t = Object(t); ++n < s; ) {
      var o = r[n];
      o && e(t, o, n, a);
    }
    return t;
  });
}
var m1 = h1(function(e, t, r) {
  Gf(e, t, r);
}), g1 = 1 / 0;
function y1(e) {
  var t = e == null ? 0 : e.length;
  return t ? zn(e, g1) : [];
}
function v1(e, t, r, n) {
  for (var s = e.length, a = r + -1; ++a < s; )
    if (t(e[a], a, e))
      return a;
  return -1;
}
function $1(e) {
  return e !== e;
}
function b1(e, t, r) {
  for (var n = r - 1, s = e.length; ++n < s; )
    if (e[n] === t)
      return n;
  return -1;
}
function _1(e, t, r) {
  return t === t ? b1(e, t, r) : v1(e, $1, r);
}
function Hf(e, t) {
  var r = e == null ? 0 : e.length;
  return !!r && _1(e, t, 0) > -1;
}
function w1() {
}
var x1 = 1 / 0, S1 = $r && 1 / Qi(new $r([, -0]))[1] == x1 ? function(e) {
  return new $r(e);
} : w1, j1 = 200;
function Jf(e, t, r) {
  var n = -1, s = Hf, a = e.length, i = !0, o = [], l = o;
  if (a >= j1) {
    var u = S1(e);
    if (u)
      return Qi(u);
    i = !1, s = Xi, l = new xr();
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
function E1(e) {
  return e && e.length ? Jf(e) : [];
}
function O1() {
  this.__data__ = [], this.size = 0;
}
var A1 = O1;
function N1(e, t) {
  return e === t || e !== e && t !== t;
}
var Lr = N1, P1 = Lr;
function C1(e, t) {
  for (var r = e.length; r--; )
    if (P1(e[r][0], t))
      return r;
  return -1;
}
var ca = C1, T1 = ca, I1 = Array.prototype, F1 = I1.splice;
function k1(e) {
  var t = this.__data__, r = T1(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : F1.call(t, r, 1), --this.size, !0;
}
var D1 = k1, R1 = ca;
function M1(e) {
  var t = this.__data__, r = R1(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var L1 = M1, U1 = ca;
function W1(e) {
  return U1(this.__data__, e) > -1;
}
var V1 = W1, z1 = ca;
function B1(e, t) {
  var r = this.__data__, n = z1(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
var q1 = B1, K1 = A1, G1 = D1, H1 = L1, J1 = V1, Y1 = q1;
function Ur(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Ur.prototype.clear = K1;
Ur.prototype.delete = G1;
Ur.prototype.get = H1;
Ur.prototype.has = J1;
Ur.prototype.set = Y1;
var ua = Ur, Z1 = ua;
function X1() {
  this.__data__ = new Z1(), this.size = 0;
}
var Q1 = X1;
function e_(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var t_ = e_;
function r_(e) {
  return this.__data__.get(e);
}
var n_ = r_;
function s_(e) {
  return this.__data__.has(e);
}
var a_ = s_, i_ = typeof rs == "object" && rs && rs.Object === Object && rs, Yf = i_, o_ = Yf, l_ = typeof self == "object" && self && self.Object === Object && self, c_ = o_ || l_ || Function("return this")(), ft = c_, u_ = ft, d_ = u_.Symbol, Wr = d_, Lc = Wr, Zf = Object.prototype, f_ = Zf.hasOwnProperty, p_ = Zf.toString, nn = Lc ? Lc.toStringTag : void 0;
function h_(e) {
  var t = f_.call(e, nn), r = e[nn];
  try {
    e[nn] = void 0;
    var n = !0;
  } catch {
  }
  var s = p_.call(e);
  return n && (t ? e[nn] = r : delete e[nn]), s;
}
var m_ = h_, g_ = Object.prototype, y_ = g_.toString;
function v_(e) {
  return y_.call(e);
}
var $_ = v_, Uc = Wr, b_ = m_, __ = $_, w_ = "[object Null]", x_ = "[object Undefined]", Wc = Uc ? Uc.toStringTag : void 0;
function S_(e) {
  return e == null ? e === void 0 ? x_ : w_ : Wc && Wc in Object(e) ? b_(e) : __(e);
}
var or = S_;
function j_(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var pt = j_, E_ = or, O_ = pt, A_ = "[object AsyncFunction]", N_ = "[object Function]", P_ = "[object GeneratorFunction]", C_ = "[object Proxy]";
function T_(e) {
  if (!O_(e))
    return !1;
  var t = E_(e);
  return t == N_ || t == P_ || t == A_ || t == C_;
}
var bo = T_, I_ = ft, F_ = I_["__core-js_shared__"], k_ = F_, Ha = k_, Vc = function() {
  var e = /[^.]+$/.exec(Ha && Ha.keys && Ha.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function D_(e) {
  return !!Vc && Vc in e;
}
var R_ = D_, M_ = Function.prototype, L_ = M_.toString;
function U_(e) {
  if (e != null) {
    try {
      return L_.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Xf = U_, W_ = bo, V_ = R_, z_ = pt, B_ = Xf, q_ = /[\\^$.*+?()[\]{}|]/g, K_ = /^\[object .+?Constructor\]$/, G_ = Function.prototype, H_ = Object.prototype, J_ = G_.toString, Y_ = H_.hasOwnProperty, Z_ = RegExp(
  "^" + J_.call(Y_).replace(q_, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function X_(e) {
  if (!z_(e) || V_(e))
    return !1;
  var t = W_(e) ? Z_ : K_;
  return t.test(B_(e));
}
var Q_ = X_;
function ew(e, t) {
  return e == null ? void 0 : e[t];
}
var tw = ew, rw = Q_, nw = tw;
function sw(e, t) {
  var r = nw(e, t);
  return rw(r) ? r : void 0;
}
var lr = sw, aw = lr, iw = ft, ow = aw(iw, "Map"), _o = ow, lw = lr, cw = lw(Object, "create"), da = cw, zc = da;
function uw() {
  this.__data__ = zc ? zc(null) : {}, this.size = 0;
}
var dw = uw;
function fw(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var pw = fw, hw = da, mw = "__lodash_hash_undefined__", gw = Object.prototype, yw = gw.hasOwnProperty;
function vw(e) {
  var t = this.__data__;
  if (hw) {
    var r = t[e];
    return r === mw ? void 0 : r;
  }
  return yw.call(t, e) ? t[e] : void 0;
}
var $w = vw, bw = da, _w = Object.prototype, ww = _w.hasOwnProperty;
function xw(e) {
  var t = this.__data__;
  return bw ? t[e] !== void 0 : ww.call(t, e);
}
var Sw = xw, jw = da, Ew = "__lodash_hash_undefined__";
function Ow(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = jw && t === void 0 ? Ew : t, this;
}
var Aw = Ow, Nw = dw, Pw = pw, Cw = $w, Tw = Sw, Iw = Aw;
function Vr(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Vr.prototype.clear = Nw;
Vr.prototype.delete = Pw;
Vr.prototype.get = Cw;
Vr.prototype.has = Tw;
Vr.prototype.set = Iw;
var Fw = Vr, Bc = Fw, kw = ua, Dw = _o;
function Rw() {
  this.size = 0, this.__data__ = {
    hash: new Bc(),
    map: new (Dw || kw)(),
    string: new Bc()
  };
}
var Mw = Rw;
function Lw(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var Uw = Lw, Ww = Uw;
function Vw(e, t) {
  var r = e.__data__;
  return Ww(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var fa = Vw, zw = fa;
function Bw(e) {
  var t = zw(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var qw = Bw, Kw = fa;
function Gw(e) {
  return Kw(this, e).get(e);
}
var Hw = Gw, Jw = fa;
function Yw(e) {
  return Jw(this, e).has(e);
}
var Zw = Yw, Xw = fa;
function Qw(e, t) {
  var r = Xw(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
var ex = Qw, tx = Mw, rx = qw, nx = Hw, sx = Zw, ax = ex;
function zr(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
zr.prototype.clear = tx;
zr.prototype.delete = rx;
zr.prototype.get = nx;
zr.prototype.has = sx;
zr.prototype.set = ax;
var wo = zr, ix = ua, ox = _o, lx = wo, cx = 200;
function ux(e, t) {
  var r = this.__data__;
  if (r instanceof ix) {
    var n = r.__data__;
    if (!ox || n.length < cx - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new lx(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
var dx = ux, fx = ua, px = Q1, hx = t_, mx = n_, gx = a_, yx = dx;
function Br(e) {
  var t = this.__data__ = new fx(e);
  this.size = t.size;
}
Br.prototype.clear = px;
Br.prototype.delete = hx;
Br.prototype.get = mx;
Br.prototype.has = gx;
Br.prototype.set = yx;
var pa = Br;
function vx(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var Qf = vx, $x = lr, bx = function() {
  try {
    var e = $x(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), ep = bx, qc = ep;
function _x(e, t, r) {
  t == "__proto__" && qc ? qc(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var xo = _x, wx = xo, xx = Lr, Sx = Object.prototype, jx = Sx.hasOwnProperty;
function Ex(e, t, r) {
  var n = e[t];
  (!(jx.call(e, t) && xx(n, r)) || r === void 0 && !(t in e)) && wx(e, t, r);
}
var tp = Ex, Ox = tp, Ax = xo;
function Nx(e, t, r, n) {
  var s = !r;
  r || (r = {});
  for (var a = -1, i = t.length; ++a < i; ) {
    var o = t[a], l = n ? n(r[o], e[o], o, r, e) : void 0;
    l === void 0 && (l = e[o]), s ? Ax(r, o, l) : Ox(r, o, l);
  }
  return r;
}
var Bn = Nx;
function Px(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var Cx = Px;
function Tx(e) {
  return e != null && typeof e == "object";
}
var ht = Tx, Ix = or, Fx = ht, kx = "[object Arguments]";
function Dx(e) {
  return Fx(e) && Ix(e) == kx;
}
var Rx = Dx, Kc = Rx, Mx = ht, rp = Object.prototype, Lx = rp.hasOwnProperty, Ux = rp.propertyIsEnumerable, Wx = Kc(/* @__PURE__ */ function() {
  return arguments;
}()) ? Kc : function(e) {
  return Mx(e) && Lx.call(e, "callee") && !Ux.call(e, "callee");
}, ha = Wx, Vx = Array.isArray, Ve = Vx, Ds = { exports: {} };
function zx() {
  return !1;
}
var Bx = zx;
Ds.exports;
(function(e, t) {
  var r = ft, n = Bx, s = t && !t.nodeType && t, a = s && !0 && e && !e.nodeType && e, i = a && a.exports === s, o = i ? r.Buffer : void 0, l = o ? o.isBuffer : void 0, u = l || n;
  e.exports = u;
})(Ds, Ds.exports);
var ma = Ds.exports, qx = 9007199254740991, Kx = /^(?:0|[1-9]\d*)$/;
function Gx(e, t) {
  var r = typeof e;
  return t = t ?? qx, !!t && (r == "number" || r != "symbol" && Kx.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var So = Gx, Hx = 9007199254740991;
function Jx(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Hx;
}
var jo = Jx, Yx = or, Zx = jo, Xx = ht, Qx = "[object Arguments]", eS = "[object Array]", tS = "[object Boolean]", rS = "[object Date]", nS = "[object Error]", sS = "[object Function]", aS = "[object Map]", iS = "[object Number]", oS = "[object Object]", lS = "[object RegExp]", cS = "[object Set]", uS = "[object String]", dS = "[object WeakMap]", fS = "[object ArrayBuffer]", pS = "[object DataView]", hS = "[object Float32Array]", mS = "[object Float64Array]", gS = "[object Int8Array]", yS = "[object Int16Array]", vS = "[object Int32Array]", $S = "[object Uint8Array]", bS = "[object Uint8ClampedArray]", _S = "[object Uint16Array]", wS = "[object Uint32Array]", ve = {};
ve[hS] = ve[mS] = ve[gS] = ve[yS] = ve[vS] = ve[$S] = ve[bS] = ve[_S] = ve[wS] = !0;
ve[Qx] = ve[eS] = ve[fS] = ve[tS] = ve[pS] = ve[rS] = ve[nS] = ve[sS] = ve[aS] = ve[iS] = ve[oS] = ve[lS] = ve[cS] = ve[uS] = ve[dS] = !1;
function xS(e) {
  return Xx(e) && Zx(e.length) && !!ve[Yx(e)];
}
var SS = xS;
function jS(e) {
  return function(t) {
    return e(t);
  };
}
var cr = jS, Rs = { exports: {} };
Rs.exports;
(function(e, t) {
  var r = Yf, n = t && !t.nodeType && t, s = n && !0 && e && !e.nodeType && e, a = s && s.exports === n, i = a && r.process, o = function() {
    try {
      var l = s && s.require && s.require("util").types;
      return l || i && i.binding && i.binding("util");
    } catch {
    }
  }();
  e.exports = o;
})(Rs, Rs.exports);
var Eo = Rs.exports, ES = SS, OS = cr, Gc = Eo, Hc = Gc && Gc.isTypedArray, AS = Hc ? OS(Hc) : ES, Oo = AS, NS = Cx, PS = ha, CS = Ve, TS = ma, IS = So, FS = Oo, kS = Object.prototype, DS = kS.hasOwnProperty;
function RS(e, t) {
  var r = CS(e), n = !r && PS(e), s = !r && !n && TS(e), a = !r && !n && !s && FS(e), i = r || n || s || a, o = i ? NS(e.length, String) : [], l = o.length;
  for (var u in e)
    (t || DS.call(e, u)) && !(i && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    a && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    IS(u, l))) && o.push(u);
  return o;
}
var np = RS, MS = Object.prototype;
function LS(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || MS;
  return e === r;
}
var Ao = LS;
function US(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var sp = US, WS = sp, VS = WS(Object.keys, Object), zS = VS, BS = Ao, qS = zS, KS = Object.prototype, GS = KS.hasOwnProperty;
function HS(e) {
  if (!BS(e))
    return qS(e);
  var t = [];
  for (var r in Object(e))
    GS.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var JS = HS, YS = bo, ZS = jo;
function XS(e) {
  return e != null && ZS(e.length) && !YS(e);
}
var qr = XS, QS = np, ej = JS, tj = qr;
function rj(e) {
  return tj(e) ? QS(e) : ej(e);
}
var qn = rj, nj = Bn, sj = qn;
function aj(e, t) {
  return e && nj(t, sj(t), e);
}
var ij = aj;
function oj(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var lj = oj, cj = pt, uj = Ao, dj = lj, fj = Object.prototype, pj = fj.hasOwnProperty;
function hj(e) {
  if (!cj(e))
    return dj(e);
  var t = uj(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !pj.call(e, n)) || r.push(n);
  return r;
}
var mj = hj, gj = np, yj = mj, vj = qr;
function $j(e) {
  return vj(e) ? gj(e, !0) : yj(e);
}
var Kr = $j, bj = Bn, _j = Kr;
function wj(e, t) {
  return e && bj(t, _j(t), e);
}
var xj = wj, Ms = { exports: {} };
Ms.exports;
(function(e, t) {
  var r = ft, n = t && !t.nodeType && t, s = n && !0 && e && !e.nodeType && e, a = s && s.exports === n, i = a ? r.Buffer : void 0, o = i ? i.allocUnsafe : void 0;
  function l(u, c) {
    if (c)
      return u.slice();
    var f = u.length, m = o ? o(f) : new u.constructor(f);
    return u.copy(m), m;
  }
  e.exports = l;
})(Ms, Ms.exports);
var ap = Ms.exports;
function Sj(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var No = Sj;
function jj(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, s = 0, a = []; ++r < n; ) {
    var i = e[r];
    t(i, r, e) && (a[s++] = i);
  }
  return a;
}
var Ej = jj;
function Oj() {
  return [];
}
var ip = Oj, Aj = Ej, Nj = ip, Pj = Object.prototype, Cj = Pj.propertyIsEnumerable, Jc = Object.getOwnPropertySymbols, Tj = Jc ? function(e) {
  return e == null ? [] : (e = Object(e), Aj(Jc(e), function(t) {
    return Cj.call(e, t);
  }));
} : Nj, Po = Tj, Ij = Bn, Fj = Po;
function kj(e, t) {
  return Ij(e, Fj(e), t);
}
var Dj = kj;
function Rj(e, t) {
  for (var r = -1, n = t.length, s = e.length; ++r < n; )
    e[s + r] = t[r];
  return e;
}
var Co = Rj, Mj = sp, Lj = Mj(Object.getPrototypeOf, Object), To = Lj, Uj = Co, Wj = To, Vj = Po, zj = ip, Bj = Object.getOwnPropertySymbols, qj = Bj ? function(e) {
  for (var t = []; e; )
    Uj(t, Vj(e)), e = Wj(e);
  return t;
} : zj, op = qj, Kj = Bn, Gj = op;
function Hj(e, t) {
  return Kj(e, Gj(e), t);
}
var Jj = Hj, Yj = Co, Zj = Ve;
function Xj(e, t, r) {
  var n = t(e);
  return Zj(e) ? n : Yj(n, r(e));
}
var lp = Xj, Qj = lp, eE = Po, tE = qn;
function rE(e) {
  return Qj(e, tE, eE);
}
var cp = rE, nE = lp, sE = op, aE = Kr;
function iE(e) {
  return nE(e, aE, sE);
}
var oE = iE, lE = lr, cE = ft, uE = lE(cE, "DataView"), dE = uE, fE = lr, pE = ft, hE = fE(pE, "Promise"), mE = hE, gE = lr, yE = ft, vE = gE(yE, "Set"), up = vE, $E = lr, bE = ft, _E = $E(bE, "WeakMap"), wE = _E, Oi = dE, Ai = _o, Ni = mE, Pi = up, Ci = wE, dp = or, Gr = Xf, Yc = "[object Map]", xE = "[object Object]", Zc = "[object Promise]", Xc = "[object Set]", Qc = "[object WeakMap]", eu = "[object DataView]", SE = Gr(Oi), jE = Gr(Ai), EE = Gr(Ni), OE = Gr(Pi), AE = Gr(Ci), Kt = dp;
(Oi && Kt(new Oi(new ArrayBuffer(1))) != eu || Ai && Kt(new Ai()) != Yc || Ni && Kt(Ni.resolve()) != Zc || Pi && Kt(new Pi()) != Xc || Ci && Kt(new Ci()) != Qc) && (Kt = function(e) {
  var t = dp(e), r = t == xE ? e.constructor : void 0, n = r ? Gr(r) : "";
  if (n)
    switch (n) {
      case SE:
        return eu;
      case jE:
        return Yc;
      case EE:
        return Zc;
      case OE:
        return Xc;
      case AE:
        return Qc;
    }
  return t;
});
var ga = Kt, NE = Object.prototype, PE = NE.hasOwnProperty;
function CE(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && PE.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var TE = CE, IE = ft, FE = IE.Uint8Array, fp = FE, tu = fp;
function kE(e) {
  var t = new e.constructor(e.byteLength);
  return new tu(t).set(new tu(e)), t;
}
var Io = kE, DE = Io;
function RE(e, t) {
  var r = t ? DE(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var ME = RE, LE = /\w*$/;
function UE(e) {
  var t = new e.constructor(e.source, LE.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var WE = UE, ru = Wr, nu = ru ? ru.prototype : void 0, su = nu ? nu.valueOf : void 0;
function VE(e) {
  return su ? Object(su.call(e)) : {};
}
var zE = VE, BE = Io;
function qE(e, t) {
  var r = t ? BE(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var pp = qE, KE = Io, GE = ME, HE = WE, JE = zE, YE = pp, ZE = "[object Boolean]", XE = "[object Date]", QE = "[object Map]", e2 = "[object Number]", t2 = "[object RegExp]", r2 = "[object Set]", n2 = "[object String]", s2 = "[object Symbol]", a2 = "[object ArrayBuffer]", i2 = "[object DataView]", o2 = "[object Float32Array]", l2 = "[object Float64Array]", c2 = "[object Int8Array]", u2 = "[object Int16Array]", d2 = "[object Int32Array]", f2 = "[object Uint8Array]", p2 = "[object Uint8ClampedArray]", h2 = "[object Uint16Array]", m2 = "[object Uint32Array]";
function g2(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case a2:
      return KE(e);
    case ZE:
    case XE:
      return new n(+e);
    case i2:
      return GE(e, r);
    case o2:
    case l2:
    case c2:
    case u2:
    case d2:
    case f2:
    case p2:
    case h2:
    case m2:
      return YE(e, r);
    case QE:
      return new n();
    case e2:
    case n2:
      return new n(e);
    case t2:
      return HE(e);
    case r2:
      return new n();
    case s2:
      return JE(e);
  }
}
var y2 = g2, v2 = pt, au = Object.create, $2 = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!v2(t))
      return {};
    if (au)
      return au(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}(), b2 = $2, _2 = b2, w2 = To, x2 = Ao;
function S2(e) {
  return typeof e.constructor == "function" && !x2(e) ? _2(w2(e)) : {};
}
var hp = S2, j2 = ga, E2 = ht, O2 = "[object Map]";
function A2(e) {
  return E2(e) && j2(e) == O2;
}
var N2 = A2, P2 = N2, C2 = cr, iu = Eo, ou = iu && iu.isMap, T2 = ou ? C2(ou) : P2, I2 = T2, F2 = ga, k2 = ht, D2 = "[object Set]";
function R2(e) {
  return k2(e) && F2(e) == D2;
}
var M2 = R2, L2 = M2, U2 = cr, lu = Eo, cu = lu && lu.isSet, W2 = cu ? U2(cu) : L2, V2 = W2, z2 = pa, B2 = Qf, q2 = tp, K2 = ij, G2 = xj, H2 = ap, J2 = No, Y2 = Dj, Z2 = Jj, X2 = cp, Q2 = oE, eO = ga, tO = TE, rO = y2, nO = hp, sO = Ve, aO = ma, iO = I2, oO = pt, lO = V2, cO = qn, uO = Kr, dO = 1, fO = 2, pO = 4, mp = "[object Arguments]", hO = "[object Array]", mO = "[object Boolean]", gO = "[object Date]", yO = "[object Error]", gp = "[object Function]", vO = "[object GeneratorFunction]", $O = "[object Map]", bO = "[object Number]", yp = "[object Object]", _O = "[object RegExp]", wO = "[object Set]", xO = "[object String]", SO = "[object Symbol]", jO = "[object WeakMap]", EO = "[object ArrayBuffer]", OO = "[object DataView]", AO = "[object Float32Array]", NO = "[object Float64Array]", PO = "[object Int8Array]", CO = "[object Int16Array]", TO = "[object Int32Array]", IO = "[object Uint8Array]", FO = "[object Uint8ClampedArray]", kO = "[object Uint16Array]", DO = "[object Uint32Array]", me = {};
me[mp] = me[hO] = me[EO] = me[OO] = me[mO] = me[gO] = me[AO] = me[NO] = me[PO] = me[CO] = me[TO] = me[$O] = me[bO] = me[yp] = me[_O] = me[wO] = me[xO] = me[SO] = me[IO] = me[FO] = me[kO] = me[DO] = !0;
me[yO] = me[gp] = me[jO] = !1;
function vs(e, t, r, n, s, a) {
  var i, o = t & dO, l = t & fO, u = t & pO;
  if (r && (i = s ? r(e, n, s, a) : r(e)), i !== void 0)
    return i;
  if (!oO(e))
    return e;
  var c = sO(e);
  if (c) {
    if (i = tO(e), !o)
      return J2(e, i);
  } else {
    var f = eO(e), m = f == gp || f == vO;
    if (aO(e))
      return H2(e, o);
    if (f == yp || f == mp || m && !s) {
      if (i = l || m ? {} : nO(e), !o)
        return l ? Z2(e, G2(i, e)) : Y2(e, K2(i, e));
    } else {
      if (!me[f])
        return s ? e : {};
      i = rO(e, f, o);
    }
  }
  a || (a = new z2());
  var h = a.get(e);
  if (h)
    return h;
  a.set(e, i), lO(e) ? e.forEach(function(g) {
    i.add(vs(g, t, r, g, e, a));
  }) : iO(e) && e.forEach(function(g, p) {
    i.set(p, vs(g, t, r, p, e, a));
  });
  var y = u ? l ? Q2 : X2 : l ? uO : cO, v = c ? void 0 : y(e);
  return B2(v || e, function(g, p) {
    v && (p = g, g = e[p]), q2(i, p, vs(g, t, r, p, e, a));
  }), i;
}
var RO = vs, MO = RO, LO = 1, UO = 4;
function WO(e) {
  return MO(e, LO | UO);
}
var VO = WO, zO = "__lodash_hash_undefined__";
function BO(e) {
  return this.__data__.set(e, zO), this;
}
var qO = BO;
function KO(e) {
  return this.__data__.has(e);
}
var GO = KO, HO = wo, JO = qO, YO = GO;
function Ls(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new HO(); ++t < r; )
    this.add(e[t]);
}
Ls.prototype.add = Ls.prototype.push = JO;
Ls.prototype.has = YO;
var ya = Ls;
function ZO(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
var XO = ZO;
function QO(e, t) {
  return e.has(t);
}
var va = QO, eA = ya, tA = XO, rA = va, nA = 1, sA = 2;
function aA(e, t, r, n, s, a) {
  var i = r & nA, o = e.length, l = t.length;
  if (o != l && !(i && l > o))
    return !1;
  var u = a.get(e), c = a.get(t);
  if (u && c)
    return u == t && c == e;
  var f = -1, m = !0, h = r & sA ? new eA() : void 0;
  for (a.set(e, t), a.set(t, e); ++f < o; ) {
    var y = e[f], v = t[f];
    if (n)
      var g = i ? n(v, y, f, t, e, a) : n(y, v, f, e, t, a);
    if (g !== void 0) {
      if (g)
        continue;
      m = !1;
      break;
    }
    if (h) {
      if (!tA(t, function(p, $) {
        if (!rA(h, $) && (y === p || s(y, p, r, n, a)))
          return h.push($);
      })) {
        m = !1;
        break;
      }
    } else if (!(y === v || s(y, v, r, n, a))) {
      m = !1;
      break;
    }
  }
  return a.delete(e), a.delete(t), m;
}
var vp = aA;
function iA(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n, s) {
    r[++t] = [s, n];
  }), r;
}
var oA = iA;
function lA(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n) {
    r[++t] = n;
  }), r;
}
var Fo = lA, uu = Wr, du = fp, cA = Lr, uA = vp, dA = oA, fA = Fo, pA = 1, hA = 2, mA = "[object Boolean]", gA = "[object Date]", yA = "[object Error]", vA = "[object Map]", $A = "[object Number]", bA = "[object RegExp]", _A = "[object Set]", wA = "[object String]", xA = "[object Symbol]", SA = "[object ArrayBuffer]", jA = "[object DataView]", fu = uu ? uu.prototype : void 0, Ja = fu ? fu.valueOf : void 0;
function EA(e, t, r, n, s, a, i) {
  switch (r) {
    case jA:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case SA:
      return !(e.byteLength != t.byteLength || !a(new du(e), new du(t)));
    case mA:
    case gA:
    case $A:
      return cA(+e, +t);
    case yA:
      return e.name == t.name && e.message == t.message;
    case bA:
    case wA:
      return e == t + "";
    case vA:
      var o = dA;
    case _A:
      var l = n & pA;
      if (o || (o = fA), e.size != t.size && !l)
        return !1;
      var u = i.get(e);
      if (u)
        return u == t;
      n |= hA, i.set(e, t);
      var c = uA(o(e), o(t), n, s, a, i);
      return i.delete(e), c;
    case xA:
      if (Ja)
        return Ja.call(e) == Ja.call(t);
  }
  return !1;
}
var OA = EA, pu = cp, AA = 1, NA = Object.prototype, PA = NA.hasOwnProperty;
function CA(e, t, r, n, s, a) {
  var i = r & AA, o = pu(e), l = o.length, u = pu(t), c = u.length;
  if (l != c && !i)
    return !1;
  for (var f = l; f--; ) {
    var m = o[f];
    if (!(i ? m in t : PA.call(t, m)))
      return !1;
  }
  var h = a.get(e), y = a.get(t);
  if (h && y)
    return h == t && y == e;
  var v = !0;
  a.set(e, t), a.set(t, e);
  for (var g = i; ++f < l; ) {
    m = o[f];
    var p = e[m], $ = t[m];
    if (n)
      var b = i ? n($, p, m, t, e, a) : n(p, $, m, e, t, a);
    if (!(b === void 0 ? p === $ || s(p, $, r, n, a) : b)) {
      v = !1;
      break;
    }
    g || (g = m == "constructor");
  }
  if (v && !g) {
    var w = e.constructor, x = t.constructor;
    w != x && "constructor" in e && "constructor" in t && !(typeof w == "function" && w instanceof w && typeof x == "function" && x instanceof x) && (v = !1);
  }
  return a.delete(e), a.delete(t), v;
}
var TA = CA, Ya = pa, IA = vp, FA = OA, kA = TA, hu = ga, mu = Ve, gu = ma, DA = Oo, RA = 1, yu = "[object Arguments]", vu = "[object Array]", ss = "[object Object]", MA = Object.prototype, $u = MA.hasOwnProperty;
function LA(e, t, r, n, s, a) {
  var i = mu(e), o = mu(t), l = i ? vu : hu(e), u = o ? vu : hu(t);
  l = l == yu ? ss : l, u = u == yu ? ss : u;
  var c = l == ss, f = u == ss, m = l == u;
  if (m && gu(e)) {
    if (!gu(t))
      return !1;
    i = !0, c = !1;
  }
  if (m && !c)
    return a || (a = new Ya()), i || DA(e) ? IA(e, t, r, n, s, a) : FA(e, t, l, r, n, s, a);
  if (!(r & RA)) {
    var h = c && $u.call(e, "__wrapped__"), y = f && $u.call(t, "__wrapped__");
    if (h || y) {
      var v = h ? e.value() : e, g = y ? t.value() : t;
      return a || (a = new Ya()), s(v, g, r, n, a);
    }
  }
  return m ? (a || (a = new Ya()), kA(e, t, r, n, s, a)) : !1;
}
var UA = LA, WA = UA, bu = ht;
function $p(e, t, r, n, s) {
  return e === t ? !0 : e == null || t == null || !bu(e) && !bu(t) ? e !== e && t !== t : WA(e, t, r, n, $p, s);
}
var ko = $p, VA = ko;
function zA(e, t) {
  return VA(e, t);
}
var bp = zA, _u = Wr, BA = ha, qA = Ve, wu = _u ? _u.isConcatSpreadable : void 0;
function KA(e) {
  return qA(e) || BA(e) || !!(wu && e && e[wu]);
}
var GA = KA, HA = Co, JA = GA;
function _p(e, t, r, n, s) {
  var a = -1, i = e.length;
  for (r || (r = JA), s || (s = []); ++a < i; ) {
    var o = e[a];
    t > 0 && r(o) ? t > 1 ? _p(o, t - 1, r, n, s) : HA(s, o) : n || (s[s.length] = o);
  }
  return s;
}
var Do = _p;
function YA(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, s = Array(n); ++r < n; )
    s[r] = t(e[r], r, e);
  return s;
}
var ur = YA, ZA = or, XA = ht, QA = "[object Symbol]";
function eN(e) {
  return typeof e == "symbol" || XA(e) && ZA(e) == QA;
}
var $a = eN, tN = Ve, rN = $a, nN = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, sN = /^\w*$/;
function aN(e, t) {
  if (tN(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || rN(e) ? !0 : sN.test(e) || !nN.test(e) || t != null && e in Object(t);
}
var Ro = aN, wp = wo, iN = "Expected a function";
function Mo(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(iN);
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
var oN = Mo, lN = oN, cN = 500;
function uN(e) {
  var t = lN(e, function(n) {
    return r.size === cN && r.clear(), n;
  }), r = t.cache;
  return t;
}
var dN = uN, fN = dN, pN = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, hN = /\\(\\)?/g, mN = fN(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(pN, function(r, n, s, a) {
    t.push(s ? a.replace(hN, "$1") : n || r);
  }), t;
}), gN = mN, xu = Wr, yN = ur, vN = Ve, $N = $a, Su = xu ? xu.prototype : void 0, ju = Su ? Su.toString : void 0;
function xp(e) {
  if (typeof e == "string")
    return e;
  if (vN(e))
    return yN(e, xp) + "";
  if ($N(e))
    return ju ? ju.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
var bN = xp, _N = bN;
function wN(e) {
  return e == null ? "" : _N(e);
}
var xN = wN, SN = Ve, jN = Ro, EN = gN, ON = xN;
function AN(e, t) {
  return SN(e) ? e : jN(e, t) ? [e] : EN(ON(e));
}
var Sp = AN, NN = $a;
function PN(e) {
  if (typeof e == "string" || NN(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
var ba = PN, CN = Sp, TN = ba;
function IN(e, t) {
  t = CN(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[TN(t[r++])];
  return r && r == n ? e : void 0;
}
var Lo = IN, FN = pa, kN = ko, DN = 1, RN = 2;
function MN(e, t, r, n) {
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
      var f = new FN();
      if (n)
        var m = n(u, c, l, e, t, f);
      if (!(m === void 0 ? kN(c, u, DN | RN, n, f) : m))
        return !1;
    }
  }
  return !0;
}
var LN = MN, UN = pt;
function WN(e) {
  return e === e && !UN(e);
}
var jp = WN, VN = jp, zN = qn;
function BN(e) {
  for (var t = zN(e), r = t.length; r--; ) {
    var n = t[r], s = e[n];
    t[r] = [n, s, VN(s)];
  }
  return t;
}
var qN = BN;
function KN(e, t) {
  return function(r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
  };
}
var Ep = KN, GN = LN, HN = qN, JN = Ep;
function YN(e) {
  var t = HN(e);
  return t.length == 1 && t[0][2] ? JN(t[0][0], t[0][1]) : function(r) {
    return r === e || GN(r, e, t);
  };
}
var ZN = YN, XN = Lo;
function QN(e, t, r) {
  var n = e == null ? void 0 : XN(e, t);
  return n === void 0 ? r : n;
}
var eP = QN;
function tP(e, t) {
  return e != null && t in Object(e);
}
var rP = tP, nP = Sp, sP = ha, aP = Ve, iP = So, oP = jo, lP = ba;
function cP(e, t, r) {
  t = nP(t, e);
  for (var n = -1, s = t.length, a = !1; ++n < s; ) {
    var i = lP(t[n]);
    if (!(a = e != null && r(e, i)))
      break;
    e = e[i];
  }
  return a || ++n != s ? a : (s = e == null ? 0 : e.length, !!s && oP(s) && iP(i, s) && (aP(e) || sP(e)));
}
var uP = cP, dP = rP, fP = uP;
function pP(e, t) {
  return e != null && fP(e, t, dP);
}
var hP = pP, mP = ko, gP = eP, yP = hP, vP = Ro, $P = jp, bP = Ep, _P = ba, wP = 1, xP = 2;
function SP(e, t) {
  return vP(e) && $P(t) ? bP(_P(e), t) : function(r) {
    var n = gP(r, e);
    return n === void 0 && n === t ? yP(r, e) : mP(t, n, wP | xP);
  };
}
var jP = SP;
function EP(e) {
  return e;
}
var Kn = EP;
function OP(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
var AP = OP, NP = Lo;
function PP(e) {
  return function(t) {
    return NP(t, e);
  };
}
var CP = PP, TP = AP, IP = CP, FP = Ro, kP = ba;
function DP(e) {
  return FP(e) ? TP(kP(e)) : IP(e);
}
var RP = DP, MP = ZN, LP = jP, UP = Kn, WP = Ve, VP = RP;
function zP(e) {
  return typeof e == "function" ? e : e == null ? UP : typeof e == "object" ? WP(e) ? LP(e[0], e[1]) : MP(e) : VP(e);
}
var BP = zP;
function qP(e) {
  return function(t, r, n) {
    for (var s = -1, a = Object(t), i = n(t), o = i.length; o--; ) {
      var l = i[e ? o : ++s];
      if (r(a[l], l, a) === !1)
        break;
    }
    return t;
  };
}
var KP = qP, GP = KP, HP = GP(), Op = HP, JP = Op, YP = qn;
function ZP(e, t) {
  return e && JP(e, t, YP);
}
var XP = ZP, QP = qr;
function eC(e, t) {
  return function(r, n) {
    if (r == null)
      return r;
    if (!QP(r))
      return e(r, n);
    for (var s = r.length, a = t ? s : -1, i = Object(r); (t ? a-- : ++a < s) && n(i[a], a, i) !== !1; )
      ;
    return r;
  };
}
var tC = eC, rC = XP, nC = tC, sC = nC(rC), Ap = sC, aC = Ap, iC = qr;
function oC(e, t) {
  var r = -1, n = iC(e) ? Array(e.length) : [];
  return aC(e, function(s, a, i) {
    n[++r] = t(s, a, i);
  }), n;
}
var lC = oC;
function cC(e, t) {
  var r = e.length;
  for (e.sort(t); r--; )
    e[r] = e[r].value;
  return e;
}
var uC = cC, Eu = $a;
function dC(e, t) {
  if (e !== t) {
    var r = e !== void 0, n = e === null, s = e === e, a = Eu(e), i = t !== void 0, o = t === null, l = t === t, u = Eu(t);
    if (!o && !u && !a && e > t || a && i && l && !o && !u || n && i && l || !r && l || !s)
      return 1;
    if (!n && !a && !u && e < t || u && r && s && !n && !a || o && r && s || !i && s || !l)
      return -1;
  }
  return 0;
}
var fC = dC, pC = fC;
function hC(e, t, r) {
  for (var n = -1, s = e.criteria, a = t.criteria, i = s.length, o = r.length; ++n < i; ) {
    var l = pC(s[n], a[n]);
    if (l) {
      if (n >= o)
        return l;
      var u = r[n];
      return l * (u == "desc" ? -1 : 1);
    }
  }
  return e.index - t.index;
}
var mC = hC, Za = ur, gC = Lo, yC = BP, vC = lC, $C = uC, bC = cr, _C = mC, wC = Kn, xC = Ve;
function SC(e, t, r) {
  t.length ? t = Za(t, function(a) {
    return xC(a) ? function(i) {
      return gC(i, a.length === 1 ? a[0] : a);
    } : a;
  }) : t = [wC];
  var n = -1;
  t = Za(t, bC(yC));
  var s = vC(e, function(a, i, o) {
    var l = Za(t, function(u) {
      return u(a);
    });
    return { criteria: l, index: ++n, value: a };
  });
  return $C(s, function(a, i) {
    return _C(a, i, r);
  });
}
var jC = SC;
function EC(e, t, r) {
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
var Np = EC, OC = Np, Ou = Math.max;
function AC(e, t, r) {
  return t = Ou(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, s = -1, a = Ou(n.length - t, 0), i = Array(a); ++s < a; )
      i[s] = n[t + s];
    s = -1;
    for (var o = Array(t + 1); ++s < t; )
      o[s] = n[s];
    return o[t] = r(i), OC(e, this, o);
  };
}
var NC = AC;
function PC(e) {
  return function() {
    return e;
  };
}
var CC = PC, TC = CC, Au = ep, IC = Kn, FC = Au ? function(e, t) {
  return Au(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: TC(t),
    writable: !0
  });
} : IC, kC = FC, DC = 800, RC = 16, MC = Date.now;
function LC(e) {
  var t = 0, r = 0;
  return function() {
    var n = MC(), s = RC - (n - r);
    if (r = n, s > 0) {
      if (++t >= DC)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
var UC = LC, WC = kC, VC = UC, zC = VC(WC), BC = zC, qC = Kn, KC = NC, GC = BC;
function HC(e, t) {
  return GC(KC(e, t, qC), e + "");
}
var dr = HC, JC = Lr, YC = qr, ZC = So, XC = pt;
function QC(e, t, r) {
  if (!XC(r))
    return !1;
  var n = typeof t;
  return (n == "number" ? YC(r) && ZC(t, r.length) : n == "string" && t in r) ? JC(r[t], e) : !1;
}
var Uo = QC, eT = Do, tT = jC, rT = dr, Nu = Uo, nT = rT(function(e, t) {
  if (e == null)
    return [];
  var r = t.length;
  return r > 1 && Nu(e, t[0], t[1]) ? t = [] : r > 2 && Nu(t[0], t[1], t[2]) && (t = [t[0]]), tT(e, eT(t, 1), []);
}), Pp = nT;
function sT(e, t, r, n) {
  for (var s = e.length, a = r + (n ? 1 : -1); n ? a-- : ++a < s; )
    if (t(e[a], a, e))
      return a;
  return -1;
}
var aT = sT;
function iT(e) {
  return e !== e;
}
var oT = iT;
function lT(e, t, r) {
  for (var n = r - 1, s = e.length; ++n < s; )
    if (e[n] === t)
      return n;
  return -1;
}
var cT = lT, uT = aT, dT = oT, fT = cT;
function pT(e, t, r) {
  return t === t ? fT(e, t, r) : uT(e, dT, r);
}
var Cp = pT, hT = Cp;
function mT(e, t) {
  var r = e == null ? 0 : e.length;
  return !!r && hT(e, t, 0) > -1;
}
var Wo = mT;
function gT(e, t, r) {
  for (var n = -1, s = e == null ? 0 : e.length; ++n < s; )
    if (r(t, e[n]))
      return !0;
  return !1;
}
var Vo = gT;
function yT() {
}
var vT = yT, Xa = up, $T = vT, bT = Fo, _T = 1 / 0, wT = Xa && 1 / bT(new Xa([, -0]))[1] == _T ? function(e) {
  return new Xa(e);
} : $T, xT = wT, ST = ya, jT = Wo, ET = Vo, OT = va, AT = xT, NT = Fo, PT = 200;
function CT(e, t, r) {
  var n = -1, s = jT, a = e.length, i = !0, o = [], l = o;
  if (r)
    i = !1, s = ET;
  else if (a >= PT) {
    var u = t ? null : AT(e);
    if (u)
      return NT(u);
    i = !1, s = OT, l = new ST();
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
var Tp = CT, TT = Tp;
function IT(e) {
  return e && e.length ? TT(e) : [];
}
var zo = IT, FT = Tp;
function kT(e, t) {
  return t = typeof t == "function" ? t : void 0, e && e.length ? FT(e, void 0, t) : [];
}
var Bo = kT, DT = dr, RT = Lr, MT = Uo, LT = Kr, Ip = Object.prototype, UT = Ip.hasOwnProperty, WT = DT(function(e, t) {
  e = Object(e);
  var r = -1, n = t.length, s = n > 2 ? t[2] : void 0;
  for (s && MT(t[0], t[1], s) && (n = 1); ++r < n; )
    for (var a = t[r], i = LT(a), o = -1, l = i.length; ++o < l; ) {
      var u = i[o], c = e[u];
      (c === void 0 || RT(c, Ip[u]) && !UT.call(e, u)) && (e[u] = a[u]);
    }
  return e;
}), VT = WT, zT = ya, BT = Wo, qT = Vo, KT = ur, GT = cr, Pu = va, HT = Math.min;
function JT(e, t, r) {
  for (var n = r ? qT : BT, s = e[0].length, a = e.length, i = a, o = Array(a), l = 1 / 0, u = []; i--; ) {
    var c = e[i];
    i && t && (c = KT(c, GT(t))), l = HT(c.length, l), o[i] = !r && (t || s >= 120 && c.length >= 120) ? new zT(i && c) : void 0;
  }
  c = e[0];
  var f = -1, m = o[0];
  e:
    for (; ++f < s && u.length < l; ) {
      var h = c[f], y = t ? t(h) : h;
      if (h = r || h !== 0 ? h : 0, !(m ? Pu(m, y) : n(u, y, r))) {
        for (i = a; --i; ) {
          var v = o[i];
          if (!(v ? Pu(v, y) : n(e[i], y, r)))
            continue e;
        }
        m && m.push(y), u.push(h);
      }
    }
  return u;
}
var Fp = JT, YT = qr, ZT = ht;
function XT(e) {
  return ZT(e) && YT(e);
}
var qo = XT, QT = qo;
function eI(e) {
  return QT(e) ? e : [];
}
var kp = eI;
function tI(e) {
  var t = e == null ? 0 : e.length;
  return t ? e[t - 1] : void 0;
}
var rI = tI, nI = ur, sI = Fp, aI = dr, iI = kp, oI = rI, lI = aI(function(e) {
  var t = oI(e), r = nI(e, iI);
  return t = typeof t == "function" ? t : void 0, t && r.pop(), r.length && r[0] === e[0] ? sI(r, void 0, t) : [];
}), Dp = lI, cI = or, uI = To, dI = ht, fI = "[object Object]", pI = Function.prototype, hI = Object.prototype, Rp = pI.toString, mI = hI.hasOwnProperty, gI = Rp.call(Object);
function yI(e) {
  if (!dI(e) || cI(e) != fI)
    return !1;
  var t = uI(e);
  if (t === null)
    return !0;
  var r = mI.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && Rp.call(r) == gI;
}
var _a = yI, vI = or, $I = ht, bI = "[object Boolean]";
function _I(e) {
  return e === !0 || e === !1 || $I(e) && vI(e) == bI;
}
var wI = _I, nt = bp, xI = Pp, Ko = zo, Cu = Bo, SI = VT, jI = Dp, Us = _a, Qa = wI, Tu = (e) => Array.isArray(e) ? e : [e], qe = (e) => e === void 0, as = (e) => Us(e) || Array.isArray(e) ? Object.keys(e) : [], vr = (e, t) => e.hasOwnProperty(t), Or = (e) => xI(Ko(e)), Iu = (e) => qe(e) || Array.isArray(e) && e.length === 0, EI = (e, t, r, n) => t && vr(t, r) && e && vr(e, r) && n(e[r], t[r]), ei = (e, t) => qe(e) && t === 0 || qe(t) && e === 0 || nt(e, t), OI = (e, t) => qe(e) && t === !1 || qe(t) && e === !1 || nt(e, t), Fu = (e) => qe(e) || nt(e, {}) || e === !0, is = (e) => qe(e) || nt(e, {}), ku = (e) => qe(e) || Us(e) || e === !0 || e === !1;
function Du(e, t) {
  return Iu(e) && Iu(t) ? !0 : nt(Or(e), Or(t));
}
function AI(e, t) {
  return e = Tu(e), t = Tu(t), nt(Or(e), Or(t));
}
function $s(e, t, r, n) {
  var s = Ko(as(e).concat(as(t)));
  return is(e) && is(t) ? !0 : is(e) && as(t).length || is(t) && as(e).length ? !1 : s.every(function(a) {
    var i = e[a], o = t[a];
    return Array.isArray(i) && Array.isArray(o) ? nt(Or(e), Or(t)) : Array.isArray(i) && !Array.isArray(o) || Array.isArray(o) && !Array.isArray(i) ? !1 : EI(e, t, a, n);
  });
}
function NI(e, t, r, n) {
  return Us(e) && Us(t) ? n(e, t) : Array.isArray(e) && Array.isArray(t) ? $s(e, t, r, n) : nt(e, t);
}
function ti(e, t, r, n) {
  var s = Cu(e, n), a = Cu(t, n), i = jI(s, a, n);
  return i.length === Math.max(s.length, a.length);
}
var PI = {
  title: nt,
  uniqueItems: OI,
  minLength: ei,
  minItems: ei,
  minProperties: ei,
  required: Du,
  enum: Du,
  type: AI,
  items: NI,
  anyOf: ti,
  allOf: ti,
  oneOf: ti,
  properties: $s,
  patternProperties: $s,
  dependencies: $s
}, CI = [
  "properties",
  "patternProperties",
  "dependencies",
  "uniqueItems",
  "minLength",
  "minItems",
  "minProperties",
  "required"
], TI = ["additionalProperties", "additionalItems", "contains", "propertyNames", "not"];
function Ti(e, t, r) {
  if (r = SI(r, {
    ignore: []
  }), Fu(e) && Fu(t))
    return !0;
  if (!ku(e) || !ku(t))
    throw new Error("Either of the values are not a JSON schema.");
  if (e === t)
    return !0;
  if (Qa(e) && Qa(t))
    return e === t;
  if (e === void 0 && t === !1 || t === void 0 && e === !1 || qe(e) && !qe(t) || !qe(e) && qe(t))
    return !1;
  var n = Ko(Object.keys(e).concat(Object.keys(t)));
  if (r.ignore.length && (n = n.filter((a) => r.ignore.indexOf(a) === -1)), !n.length)
    return !0;
  function s(a, i) {
    return Ti(a, i, r);
  }
  return n.every(function(a) {
    var i = e[a], o = t[a];
    if (TI.indexOf(a) !== -1)
      return Ti(i, o, r);
    var l = PI[a];
    if (l || (l = nt), nt(i, o))
      return !0;
    if (CI.indexOf(a) === -1 && (!vr(e, a) && vr(t, a) || vr(e, a) && !vr(t, a)))
      return i === o;
    var u = l(i, o, a, s);
    if (!Qa(u))
      throw new Error("Comparer must return true or false");
    return u;
  });
}
var Go = Ti;
function II(e) {
  return Object.prototype.toString.call(e) === "[object Array]";
}
var Ho = Array.isArray || II;
function FI(e) {
  return (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]") && e.valueOf() === e.valueOf();
}
var kI = FI, DI = kI;
function RI(e) {
  return DI(e) && e % 1 === 0;
}
var MI = RI, LI = Ho, UI = MI;
function WI(e) {
  var t;
  if (!LI(e) || (t = e.length, !t))
    return !1;
  for (var r = 0; r < t; r++)
    if (!UI(e[r]))
      return !1;
  return !0;
}
var Mp = WI;
function VI(e) {
  return typeof e == "function";
}
var Lp = VI, zI = Ho, Ru = Mp, BI = Lp, os = Math.pow(2, 31) - 1;
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
function qI() {
  var e = arguments.length, t, r, n, s, a, i, o;
  for (t = new Array(e), o = 0; o < e; o++)
    t[o] = arguments[o];
  if (Ru(t)) {
    if (e === 2)
      return a = t[0], i = t[1], a < 0 && (a = -a), i < 0 && (i = -i), a <= os && i <= os ? Lu(a, i) : Mu(a, i);
    n = t;
  } else if (zI(t[0]))
    if (e > 1) {
      if (n = t[0], r = t[1], !BI(r))
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
    i = n[o], i <= os && a <= os ? a = Lu(a, i) : a = Mu(a, i);
  return a;
}
var KI = qI, Uu = KI, GI = Ho, Wu = Mp, HI = Lp;
function JI() {
  var e = arguments.length, t, r, n, s, a, i, o;
  for (t = new Array(e), o = 0; o < e; o++)
    t[o] = arguments[o];
  if (Wu(t)) {
    if (e === 2)
      return a = t[0], i = t[1], a < 0 && (a = -a), i < 0 && (i = -i), a === 0 || i === 0 ? 0 : a / Uu(a, i) * i;
    n = t;
  } else if (GI(t[0]))
    if (e > 1) {
      if (n = t[0], r = t[1], !HI(r))
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
var YI = JI, ZI = xo, XI = Lr;
function QI(e, t, r) {
  (r !== void 0 && !XI(e[t], r) || r === void 0 && !(t in e)) && ZI(e, t, r);
}
var Up = QI;
function eF(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
var Wp = eF, tF = Bn, rF = Kr;
function nF(e) {
  return tF(e, rF(e));
}
var sF = nF, Vu = Up, aF = ap, iF = pp, oF = No, lF = hp, zu = ha, Bu = Ve, cF = qo, uF = ma, dF = bo, fF = pt, pF = _a, hF = Oo, qu = Wp, mF = sF;
function gF(e, t, r, n, s, a, i) {
  var o = qu(e, r), l = qu(t, r), u = i.get(l);
  if (u) {
    Vu(e, r, u);
    return;
  }
  var c = a ? a(o, l, r + "", e, t, i) : void 0, f = c === void 0;
  if (f) {
    var m = Bu(l), h = !m && uF(l), y = !m && !h && hF(l);
    c = l, m || h || y ? Bu(o) ? c = o : cF(o) ? c = oF(o) : h ? (f = !1, c = aF(l, !0)) : y ? (f = !1, c = iF(l, !0)) : c = [] : pF(l) || zu(l) ? (c = o, zu(o) ? c = mF(o) : (!fF(o) || dF(o)) && (c = lF(l))) : f = !1;
  }
  f && (i.set(l, c), s(c, l, n, a, i), i.delete(l)), Vu(e, r, c);
}
var yF = gF, vF = pa, $F = Up, bF = Op, _F = yF, wF = pt, xF = Kr, SF = Wp;
function Vp(e, t, r, n, s) {
  e !== t && bF(t, function(a, i) {
    if (s || (s = new vF()), wF(a))
      _F(e, t, i, r, Vp, n, s);
    else {
      var o = n ? n(SF(e, i), a, i + "", e, t, s) : void 0;
      o === void 0 && (o = a), $F(e, i, o);
    }
  }, xF);
}
var zp = Vp, jF = zp, Ku = pt;
function Bp(e, t, r, n, s, a) {
  return Ku(e) && Ku(t) && (a.set(t, e), jF(e, t, void 0, Bp, a), a.delete(t)), e;
}
var EF = Bp, OF = dr, AF = Uo;
function NF(e) {
  return OF(function(t, r) {
    var n = -1, s = r.length, a = s > 1 ? r[s - 1] : void 0, i = s > 2 ? r[2] : void 0;
    for (a = e.length > 3 && typeof a == "function" ? (s--, a) : void 0, i && AF(r[0], r[1], i) && (a = s < 3 ? void 0 : a, s = 1), t = Object(t); ++n < s; ) {
      var o = r[n];
      o && e(t, o, n, a);
    }
    return t;
  });
}
var PF = NF, CF = zp, TF = PF, IF = TF(function(e, t, r, n) {
  CF(e, t, r, n);
}), FF = IF, kF = Np, DF = dr, RF = EF, MF = FF, LF = DF(function(e) {
  return e.push(void 0, RF), kF(MF, void 0, e);
}), UF = LF, WF = Do;
function VF(e) {
  var t = e == null ? 0 : e.length;
  return t ? WF(e, 1) : [];
}
var qp = VF, zF = Do, BF = 1 / 0;
function qF(e) {
  var t = e == null ? 0 : e.length;
  return t ? zF(e, BF) : [];
}
var Kp = qF, KF = ur, GF = Fp, HF = dr, JF = kp, YF = HF(function(e) {
  var t = KF(e, JF);
  return t.length && t[0] === e[0] ? GF(t) : [];
}), ZF = YF;
function XF(e, t, r, n) {
  for (var s = r - 1, a = e.length; ++s < a; )
    if (n(e[s], t))
      return s;
  return -1;
}
var QF = XF, ek = ur, tk = Cp, rk = QF, nk = cr, sk = No, ak = Array.prototype, Gu = ak.splice;
function ik(e, t, r, n) {
  var s = n ? rk : tk, a = -1, i = t.length, o = e;
  for (e === t && (t = sk(t)), r && (o = ek(e, nk(r))); ++a < i; )
    for (var l = 0, u = t[a], c = r ? r(u) : u; (l = s(o, c, l, n)) > -1; )
      o !== e && Gu.call(o, l, 1), Gu.call(e, l, 1);
  return e;
}
var ok = ik, lk = ok;
function ck(e, t) {
  return e && e.length && t && t.length ? lk(e, t) : e;
}
var uk = ck, dk = Kn;
function fk(e) {
  return typeof e == "function" ? e : dk;
}
var pk = fk, hk = Qf, mk = Ap, gk = pk, yk = Ve;
function vk(e, t) {
  var r = yk(e) ? hk : mk;
  return r(e, gk(t));
}
var Gp = vk, $k = ya, bk = Wo, _k = Vo, wk = ur, xk = cr, Sk = va, jk = 200;
function Ek(e, t, r, n) {
  var s = -1, a = bk, i = !0, o = e.length, l = [], u = t.length;
  if (!o)
    return l;
  r && (t = wk(t, xk(r))), n ? (a = _k, i = !1) : t.length >= jk && (a = Sk, i = !1, t = new $k(t));
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
var Ok = Ek, Ak = Ok, Nk = dr, Pk = qo, Ck = Nk(function(e, t) {
  return Pk(e) ? Ak(e, t) : [];
}), Tk = Ck;
const Ik = qp, Fk = Kp, Hp = _a, kk = zo, Dk = Bo, Rk = Tk;
function Mk(e) {
  for (const t in e)
    Jp(e, t) && zk(e[t]) && delete e[t];
  return e;
}
const Lk = (e) => kk(Fk(e.map(Jo))), Uk = (e, t) => e.map((r) => r && r[t]), Jp = (e, t) => Object.prototype.hasOwnProperty.call(e, t), Jo = (e) => Hp(e) || Array.isArray(e) ? Object.keys(e) : [], Wk = (e) => e !== void 0, Vk = (e) => Hp(e) || e === !0 || e === !1, zk = (e) => !Jo(e).length && e !== !1 && e !== !0, Bk = (e, ...t) => Rk.apply(null, [e].concat(Ik(t)));
var Yp = {
  allUniqueKeys: Lk,
  deleteUndefinedProps: Mk,
  getValues: Uk,
  has: Jp,
  isSchema: Vk,
  keys: Jo,
  notUndefined: Wk,
  uniqWith: Dk,
  withoutArr: Bk
};
const qk = Go, Kk = Gp, {
  allUniqueKeys: Gk,
  deleteUndefinedProps: Hk,
  getValues: Jk,
  keys: sn,
  notUndefined: Yk,
  uniqWith: Zk,
  withoutArr: Hu
} = Yp;
function Xk(e) {
  Kk(e, function(t, r) {
    t === !1 && delete e[r];
  });
}
function Ju(e, t) {
  return Gk(e).reduce(function(n, s) {
    const a = Jk(e, s), i = Zk(a.filter(Yk), qk);
    return n[s] = t(i, s), n;
  }, {});
}
var Qk = {
  keywords: ["properties", "patternProperties", "additionalProperties"],
  resolver(e, t, r, n) {
    n.ignoreAdditionalProperties || (e.forEach(function(a) {
      const i = e.filter((c) => c !== a), o = sn(a.properties), u = sn(a.patternProperties).map((c) => new RegExp(c));
      i.forEach(function(c) {
        const f = sn(c.properties), m = f.filter((y) => u.some((v) => v.test(y)));
        Hu(f, o, m).forEach(function(y) {
          c.properties[y] = r.properties([
            c.properties[y],
            a.additionalProperties
          ], y);
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
    return s.additionalProperties === !1 && Xk(s.properties), Hk(s);
  }
};
const eD = Go, tD = Gp, {
  allUniqueKeys: rD,
  deleteUndefinedProps: nD,
  has: sD,
  isSchema: Zp,
  notUndefined: Xp,
  uniqWith: aD
} = Yp;
function iD(e) {
  tD(e, function(t, r) {
    t === !1 && e.splice(r, 1);
  });
}
function oD(e, t) {
  return e.map(function(r) {
    if (r)
      if (Array.isArray(r.items)) {
        const n = r.items[t];
        if (Zp(n))
          return n;
        if (sD(r, "additionalItems"))
          return r.additionalItems;
      } else
        return r.items;
  });
}
function lD(e) {
  return e.map(function(t) {
    if (t)
      return Array.isArray(t.items) ? t.additionalItems : t.items;
  });
}
function cD(e, t, r) {
  return rD(r).reduce(function(s, a) {
    const i = oD(e, a), o = aD(i.filter(Xp), eD);
    return s[a] = t(o, a), s;
  }, []);
}
var uD = {
  keywords: ["items", "additionalItems"],
  resolver(e, t, r) {
    const n = e.map((o) => o.items), s = n.filter(Xp), a = {};
    s.every(Zp) ? a.items = r.items(n) : a.items = cD(e, r.items, n);
    let i;
    return s.every(Array.isArray) ? i = e.map((o) => o.additionalItems) : s.some(Array.isArray) && (i = lD(e)), i && (a.additionalItems = r.additionalItems(i)), a.additionalItems === !1 && Array.isArray(a.items) && iD(a.items), nD(a);
  }
};
const Qp = VO, Ws = Go, dD = YI, fD = UF, eh = qp, Yo = Kp, pD = ZF, hD = Dp, Ii = bp, Ar = _a, mD = uk, th = Pp, Zo = zo, br = Bo, rh = Qk, nh = uD, ls = (e, t) => e.indexOf(t) !== -1, gD = (e) => Ar(e) || e === !0 || e === !1, yD = (e) => e === !1, sh = (e) => e === !0, wa = (e, t, r) => r(e), ah = (e) => th(Zo(Yo(e))), Vs = (e) => e !== void 0, ih = (e) => Zo(Yo(e.map(xD))), Hr = (e) => e[0], vD = (e) => ah(e), Gn = (e) => Math.max.apply(Math, e), Hn = (e) => Math.min.apply(Math, e), $D = (e) => e.some(sh), bD = (e) => br(eh(e), Ii);
function _D(e) {
  return function(t, r) {
    return Ws({
      [e]: t
    }, { [e]: r });
  };
}
function oh(e) {
  let { allOf: t = [], ...r } = e;
  return r = Ar(e) ? r : e, [r, ...t.map(oh)];
}
function lh(e, t) {
  return e.map((r) => r && r[t]);
}
function wD(e, t) {
  return e.map(function(r, n) {
    try {
      return t(r, n);
    } catch {
      return;
    }
  }).filter(Vs);
}
function xD(e) {
  return Ar(e) || Array.isArray(e) ? Object.keys(e) : [];
}
function Fi(e, t) {
  if (t = t || [], !e.length)
    return t;
  const r = e.slice(0).shift(), n = e.slice(1);
  return t.length ? Fi(n, eh(t.map((s) => r.map((a) => [a].concat(s))))) : Fi(n, r.map((s) => s));
}
function ch(e, t) {
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
function SD(e, t, r, n, s, a) {
  if (e.length) {
    const i = s.complexResolvers[t];
    if (!i || !i.resolver)
      throw new Error("No resolver found for " + t);
    const o = r.map((f) => e.reduce((m, h) => (f[h] !== void 0 && (m[h] = f[h]), m), {})), l = br(o, Ws), u = i.keywords.reduce((f, m) => ({
      ...f,
      [m]: (h, y = []) => n(h, null, a.concat(m, y))
    }), {}), c = i.resolver(l, a.concat(t), u, s);
    return Ar(c) || ch(l, a.concat(t)), c;
  }
}
function jD(e) {
  return { required: e };
}
const ED = ["properties", "patternProperties", "definitions", "dependencies"], OD = ["anyOf", "oneOf"], AD = [
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
      }), r = pD.apply(null, t);
      if (r.length === 1)
        return r[0];
      if (r.length > 1)
        return Zo(r);
    }
  },
  dependencies(e, t, r) {
    return ih(e).reduce(function(s, a) {
      const i = lh(e, a);
      let o = br(i.filter(Vs), Ii);
      const l = o.filter(Array.isArray);
      if (l.length) {
        if (l.length === o.length)
          s[a] = ah(o);
        else {
          const u = o.filter(gD), c = l.map(jD);
          s[a] = r(u.concat(c), a);
        }
        return s;
      }
      return o = br(o, Ws), s[a] = r(o, a), s;
    }, {});
  },
  oneOf(e, t, r) {
    const n = Fi(Qp(e)), s = wD(n, r), a = br(s, Ws);
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
    return dD(t) / r;
  },
  enum(e) {
    const t = hD.apply(null, e.concat(Ii));
    if (t.length)
      return th(t);
  }
};
ie.$id = Hr;
ie.$ref = Hr;
ie.$schema = Hr;
ie.additionalItems = wa;
ie.additionalProperties = wa;
ie.anyOf = ie.oneOf;
ie.contains = wa;
ie.default = Hr;
ie.definitions = ie.dependencies;
ie.description = Hr;
ie.examples = bD;
ie.exclusiveMaximum = Hn;
ie.exclusiveMinimum = Gn;
ie.items = nh;
ie.maximum = Hn;
ie.maxItems = Hn;
ie.maxLength = Hn;
ie.maxProperties = Hn;
ie.minimum = Gn;
ie.minItems = Gn;
ie.minLength = Gn;
ie.minProperties = Gn;
ie.properties = rh;
ie.propertyNames = wa;
ie.required = vD;
ie.title = Hr;
ie.uniqueItems = $D;
const ND = {
  properties: rh,
  items: nh
};
function Xo(e, t, r) {
  t = fD(t, {
    ignoreAdditionalProperties: !1,
    resolvers: ie,
    complexResolvers: ND,
    deep: !0
  });
  const n = Object.entries(t.complexResolvers);
  function s(o, l, u) {
    o = Qp(o.filter(Vs)), u = u || [];
    const c = Ar(l) ? l : {};
    if (!o.length)
      return;
    if (o.some(yD))
      return !1;
    if (o.every(sh))
      return !0;
    o = o.filter(Ar);
    const f = ih(o);
    if (t.deep && ls(f, "allOf"))
      return Xo({
        allOf: o
      }, t);
    const m = n.map(([h, y]) => f.filter((v) => y.keywords.includes(v)));
    return m.forEach((h) => mD(f, h)), f.forEach(function(h) {
      const y = lh(o, h), v = br(y.filter(Vs), _D(h));
      if (v.length === 1 && ls(OD, h))
        c[h] = v[0].map((g) => s([g], g));
      else if (v.length === 1 && !ls(ED, h) && !ls(AD, h))
        c[h] = v[0];
      else {
        const g = t.resolvers[h] || t.resolvers.defaultResolver;
        if (!g) throw new Error("No resolver found for key " + h + ". You can provide a resolver for this keyword in the options, or provide a default resolver.");
        const p = ($, b = []) => s($, null, u.concat(h, b));
        c[h] = g(v, u.concat(h), p, t), c[h] === void 0 ? ch(v, u.concat(h)) : c[h] === void 0 && delete c[h];
      }
    }), n.reduce((h, [y, v], g) => ({
      ...h,
      ...SD(m[g], y, o, s, t, u)
    }), c);
  }
  const a = Yo(oh(e));
  return s(a);
}
Xo.options = {
  resolvers: ie
};
var PD = Xo;
const CD = /* @__PURE__ */ kn(PD);
function Nr(e) {
  let t;
  const r = z(e, "discriminator.propertyName", void 0);
  return la(r) ? t = r : r !== void 0 && console.warn(`Expecting discriminator to be a string, got "${typeof r}" instead`), t;
}
function En(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : e == null ? "null" : typeof e == "boolean" ? "boolean" : isNaN(e) ? typeof e == "object" ? "object" : "string" : "number";
}
var TD = $o(function(e) {
  return Jf(zn(e, 1, ks, !0));
});
function St(e) {
  let { type: t } = e;
  return !t && e.const ? En(e.const) : !t && e.enum ? "string" : !t && (e.properties || e.additionalProperties) ? "object" : (Array.isArray(t) && (t.length === 2 && t.includes("null") ? t = t.find((r) => r !== "null") : t = t[0]), t);
}
function jt(e, t) {
  const r = Object.assign({}, e);
  return Object.keys(t).reduce((n, s) => {
    const a = e ? e[s] : {}, i = t[s];
    return e && s in e && ae(i) ? n[s] = jt(a, i) : e && t && (St(e) === "object" || St(t) === "object") && s === Zg && Array.isArray(a) && Array.isArray(i) ? n[s] = TD(a, i) : n[s] = i, n;
  }, r);
}
function We(e, t, r = {}, n, s) {
  return ot(e, t, r, n, void 0, void 0, s)[0];
}
function ID(e, t, r, n, s, a, i) {
  const { if: o, then: l, else: u, ...c } = t, f = e.isValid(o, a || {}, r);
  let m = [c], h = [];
  if (n)
    l && typeof l != "boolean" && (h = h.concat(ot(e, l, r, a, n, s, i))), u && typeof u != "boolean" && (h = h.concat(ot(e, u, r, a, n, s, i)));
  else {
    const y = f ? l : u;
    y && typeof y != "boolean" && (h = h.concat(ot(e, y, r, a, n, s, i)));
  }
  return h.length && (m = h.map((y) => jt(c, y))), m.flatMap((y) => ot(e, y, r, a, n, s, i));
}
function uh(e) {
  return e.reduce(
    (r, n) => n.length > 1 ? n.flatMap((s) => Bf(r.length, (a) => [...r[a]].concat(s))) : (r.forEach((s) => s.push(n[0])), r),
    [[]]
    // Start with an empty list
  );
}
function FD(e, t, r, n, s, a, i) {
  const o = dh(e, t, r, n, s, a);
  if (o.length > 1 || o[0] !== t)
    return o;
  if (Ys in t)
    return fh(e, t, r, n, s, a).flatMap((u) => ot(e, u, r, a, n, s, i));
  if (kr in t && Array.isArray(t.allOf)) {
    const l = t.allOf.map((c) => ot(e, c, r, a, n, s, i));
    return uh(l).map((c) => ({
      ...t,
      allOf: c
    }));
  }
  return [t];
}
function dh(e, t, r, n, s, a, i) {
  const o = On(t, r, s);
  return o !== t ? ot(e, o, r, a, n, s, i) : [t];
}
function On(e, t, r) {
  if (!ae(e))
    return e;
  let n = e;
  if (Ee in n) {
    const { $ref: s, ...a } = n;
    if (r.includes(s))
      return n;
    r.push(s), n = { ...Ff(s, t), ...a };
  }
  if (xe in n) {
    const s = [], a = u1(n[xe], (i, o, l) => {
      const u = [...r];
      i[l] = On(o, t, u), s.push(u);
    }, {});
    m1(r, E1(y1(s))), n = { ...n, [xe]: a };
  }
  return Mt in n && !Array.isArray(n.items) && typeof n.items != "boolean" && (n = {
    ...n,
    items: On(n.items, t, r)
  }), be(e, n) ? e : n;
}
function kD(e, t, r, n, s) {
  const a = {
    ...t,
    properties: { ...t.properties }
  }, i = n && ae(n) ? n : {};
  return Object.keys(i).forEach((o) => {
    if (o in a.properties)
      return;
    let l = {};
    typeof a.additionalProperties != "boolean" ? Ee in a.additionalProperties ? l = We(e, { $ref: z(a.additionalProperties, [Ee]) }, r, i, s) : "type" in a.additionalProperties ? l = { ...a.additionalProperties } : et in a.additionalProperties || Ue in a.additionalProperties ? l = {
      type: "object",
      ...a.additionalProperties
    } : l = { type: En(z(i, [o])) } : l = { type: En(z(i, [o])) }, a.properties[o] = l, Pe(a.properties, [o, Mn], !0);
  }), a;
}
function ot(e, t, r, n, s = !1, a = [], i) {
  return ae(t) ? FD(e, t, r, s, a, n, i).flatMap((l) => {
    var u;
    let c = l;
    if (Jg in c)
      return ID(e, c, r, s, a, n, i);
    if (kr in c) {
      if (s) {
        const { allOf: m, ...h } = c;
        return [...m, h];
      }
      try {
        const m = [], h = [];
        (u = c.allOf) === null || u === void 0 || u.forEach((y) => {
          typeof y == "object" && y.contains ? m.push(y) : h.push(y);
        }), m.length && (c = { ...c, allOf: h }), c = i ? i(c) : CD(c, {
          deep: !1
        }), m.length && (c.allOf = m);
      } catch (m) {
        console.warn(`could not merge subschemas in allOf:
`, m);
        const { allOf: h, ...y } = c;
        return y;
      }
    }
    return bi in c && c.additionalProperties !== !1 ? kD(e, c, r, n, i) : c;
  }) : [{}];
}
function DD(e, t, r, n, s) {
  let a;
  const { oneOf: i, anyOf: o, ...l } = t;
  if (Array.isArray(i) ? a = i : Array.isArray(o) && (a = o), a) {
    const u = s === void 0 && n ? {} : s, c = Nr(t);
    a = a.map((m) => On(m, r, []));
    const f = yo(e, u, a, r, c);
    if (n)
      return a.map((m) => jt(l, m));
    t = jt(l, a[f]);
  }
  return [t];
}
function fh(e, t, r, n, s, a, i) {
  const { dependencies: o, ...l } = t;
  return DD(e, l, r, n, a).flatMap((c) => ph(e, o, c, r, n, s, a, i));
}
function ph(e, t, r, n, s, a, i, o) {
  let l = [r];
  for (const u in t) {
    if (!s && z(i, [u]) === void 0 || r.properties && !(u in r.properties))
      continue;
    const [c, f] = mo(u, t);
    return Array.isArray(f) ? l[0] = RD(r, f) : ae(f) && (l = MD(e, r, n, u, f, s, a, i, o)), l.flatMap((m) => ph(e, c, m, n, s, a, i, o));
  }
  return l;
}
function RD(e, t) {
  if (!t)
    return e;
  const r = Array.isArray(e.required) ? Array.from(/* @__PURE__ */ new Set([...e.required, ...t])) : t;
  return { ...e, required: r };
}
function MD(e, t, r, n, s, a, i, o, l) {
  return ot(e, s, r, o, a, i, l).flatMap((c) => {
    const { oneOf: f, ...m } = c;
    if (t = jt(t, m), f === void 0)
      return t;
    const h = f.map((v) => typeof v == "boolean" || !(Ee in v) ? [v] : dh(e, v, r, a, i, o));
    return uh(h).flatMap((v) => LD(e, t, r, n, v, a, i, o, l));
  });
}
function LD(e, t, r, n, s, a, i, o, l) {
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
    return ot(e, h, r, o, a, i, l).map((v) => jt(t, v));
  });
}
const UD = {
  type: "object",
  $id: Yg,
  properties: {
    __not_really_there__: {
      type: "number"
    }
  }
};
function ki(e, t, r, n, s) {
  let a = 0;
  return r && (ge(r.properties) ? a += Jb(r.properties, (i, o, l) => {
    const u = z(n, l);
    if (typeof o == "boolean")
      return i;
    if (Fe(o, Ee)) {
      const c = We(e, o, t, u, s);
      return i + ki(e, t, c, u || {}, s);
    }
    if ((Fe(o, Ue) || Fe(o, et)) && u) {
      const c = Fe(o, Ue) ? Ue : et, f = Nr(o);
      return i + An(e, t, u, z(o, c), -1, f, s);
    }
    if (o.type === "object")
      return ge(u) && (i += 1), i + ki(e, t, o, u, s);
    if (o.type === En(u)) {
      let c = i + 1;
      return o.default ? c += u === o.default ? 1 : -1 : o.const && (c += u === o.const ? 1 : -1), c;
    }
    return i;
  }, 0) : la(r.type) && r.type === En(n) && (a += 1)), a;
}
function An(e, t, r, n, s = -1, a, i) {
  const o = n.map((m) => On(m, t, [])), l = qf(r, n, a);
  if (Df(l))
    return l;
  const u = o.reduce((m, h, y) => (yo(e, r, [UD, h], t, a) === 1 && m.push(y), m), []);
  if (u.length === 1)
    return u[0];
  u.length || Bf(o.length, (m) => u.push(m));
  const c = /* @__PURE__ */ new Set(), { bestIndex: f } = u.reduce((m, h) => {
    const { bestScore: y } = m, v = o[h], g = ki(e, t, v, r, i);
    return c.add(g), g > y ? { bestIndex: h, bestScore: g } : m;
  }, { bestIndex: s, bestScore: 0 });
  return c.size === 1 && s >= 0 ? s : f;
}
function Di(e) {
  return Array.isArray(e.items) && e.items.length > 0 && e.items.every((t) => ae(t));
}
function yn(e) {
  return e == null;
}
function Nn(e, t, r = !1, n = !1, s = !1) {
  if (Array.isArray(t)) {
    const a = Array.isArray(e) ? e : [], i = s ? a : t, o = s ? t : a, l = i.map((u, c) => o[c] !== void 0 ? Nn(a[c], t[c], r, n, s) : u);
    return (r || s) && l.length < o.length && l.push(...o.slice(l.length)), l;
  }
  if (ae(t)) {
    const a = Object.assign({}, e);
    return Object.keys(t).reduce((i, o) => {
      const l = z(t, o), u = ae(e) && o in e, c = o in t;
      return i[o] = Nn(
        e ? z(e, o) : {},
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
function $t(e, t, r = !1) {
  return Object.keys(t).reduce((n, s) => {
    const a = e ? e[s] : {}, i = t[s];
    if (e && s in e && ae(i))
      n[s] = $t(a, i, r);
    else if (r && Array.isArray(a) && Array.isArray(i)) {
      let o = i;
      r === "preventDuplicates" && (o = i.reduce((l, u) => (a.includes(u) || l.push(u), l), [])), n[s] = a.concat(o);
    } else
      n[s] = i;
    return n;
  }, Object.assign({}, e));
}
function hh(e) {
  return Array.isArray(e.enum) && e.enum.length === 1 || xt in e;
}
function Qo(e, t, r = {}, n) {
  const s = We(e, t, r, void 0, n), a = s.oneOf || s.anyOf;
  return Array.isArray(s.enum) ? !0 : Array.isArray(a) ? a.every((i) => typeof i != "boolean" && hh(i)) : !1;
}
function el(e, t, r, n) {
  return !t.uniqueItems || !t.items || typeof t.items == "boolean" ? !1 : Qo(e, t.items, r, n);
}
function mh(e) {
  const t = e[xt], r = St(e);
  return ae(t) && la(t == null ? void 0 : t.$data) && r !== "object" && r !== "array";
}
function WD(e) {
  if (Hg in e && Array.isArray(e.enum) && e.enum.length === 1)
    return e.enum[0];
  if (xt in e)
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
    const { title: o } = se(s == null ? void 0 : s[i]), l = a, u = WD(l), c = o || l.title || String(u);
    return {
      schema: l,
      label: c,
      value: u
    };
  });
}
const VD = ["string", "number", "integer", "boolean", "null"];
var Pr;
(function(e) {
  e[e.Ignore = 0] = "Ignore", e[e.Invert = 1] = "Invert", e[e.Fallback = 2] = "Fallback";
})(Pr || (Pr = {}));
function ri(e, t = Pr.Ignore, r = -1) {
  if (r >= 0) {
    if (Array.isArray(e.items) && r < e.items.length) {
      const n = e.items[r];
      if (typeof n != "boolean")
        return n;
    }
  } else if (e.items && !Array.isArray(e.items) && typeof e.items != "boolean")
    return e.items;
  return t !== Pr.Ignore && ae(e.additionalItems) ? e.additionalItems : {};
}
function Yu(e, t, r, n, s, a = [], i = {}, o = !1) {
  const { emptyObjectFields: l = "populateAllDefaults" } = i;
  if (n || o)
    e[t] = r;
  else if (l !== "skipDefaults") {
    const u = s === void 0 ? a.includes(t) : s;
    ae(r) ? l === "skipEmptyDefaults" ? Er(r) || (e[t] = r) : (!Er(r) || a.includes(t)) && (u || l !== "populateRequiredDefaults") && (e[t] = r) : (
      // Store computedDefault if it's a defined primitive (e.g., true) and satisfies certain conditions
      // Condition 1: computedDefault is not undefined
      // Condition 2: If emptyObjectFields is 'populateAllDefaults' or 'skipEmptyDefaults)
      // Or if isSelfOrParentRequired is 'true' and the key is a required field
      r !== void 0 && (l === "populateAllDefaults" || l === "skipEmptyDefaults" || u && a.includes(t)) && (e[t] = r)
    );
  }
}
function Lt(e, t, r = {}) {
  const { parentDefaults: n, rawFormData: s, rootSchema: a = {}, includeUndefinedValues: i = !1, _recurseList: o = [], experimental_defaultFormStateBehavior: l = void 0, experimental_customMergeAllOf: u = void 0, required: c, shouldMergeDefaultsIntoFormData: f = !1 } = r;
  let m = ae(s) ? s : {};
  const h = ae(t) ? t : {};
  let y = n, v = null, g = l, p = o;
  if (h[xt] !== void 0 && (l == null ? void 0 : l.constAsDefaults) !== "never" && !mh(h))
    y = h[xt];
  else if (ae(y) && ae(h.default))
    y = $t(y, h.default);
  else if (Gg in h && !h[et] && !h[Ue])
    y = h.default;
  else if (Ee in h) {
    const w = h[Ee];
    o.includes(w) || (p = o.concat(w), v = Ff(w, a)), v && !y && (y = h.default), f && v && !ae(s) && (m = s);
  } else if (Ys in h) {
    const w = {
      ...Zu(e, h, r, y),
      ...m
    };
    v = fh(e, h, a, !1, [], w, u)[0];
  } else if (Di(h))
    y = h.items.map((w, x) => Lt(e, w, {
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
  else if (Ue in h) {
    const { oneOf: w, ...x } = h;
    if (w.length === 0)
      return;
    const P = Nr(h), { type: j = "null" } = x;
    !Array.isArray(j) && VD.includes(j) && (g == null ? void 0 : g.constAsDefaults) === "skipOneOf" && (g = {
      ...g,
      constAsDefaults: "never"
    }), v = w[An(e, a, s ?? h.default, w, 0, P, u)], v = jt(x, v);
  } else if (et in h) {
    const { anyOf: w, ...x } = h;
    if (w.length === 0)
      return;
    const P = Nr(h);
    v = w[An(e, a, s ?? h.default, w, 0, P, u)], v = jt(x, v);
  }
  if (v)
    return Lt(e, v, {
      rootSchema: a,
      includeUndefinedValues: i,
      _recurseList: p,
      experimental_defaultFormStateBehavior: g,
      experimental_customMergeAllOf: u,
      parentDefaults: y,
      rawFormData: s ?? m,
      required: c,
      shouldMergeDefaultsIntoFormData: f
    });
  y === void 0 && (y = h.default);
  const $ = Zu(e, h, r, y);
  let b = $ ?? y;
  if (f) {
    const { arrayMinItems: w = {} } = l || {}, { mergeExtraDefaults: x } = w, P = zD(e, h, a, s, l, u);
    (!ae(s) || kr in h) && (b = Nn(b, P, x, !0));
  }
  return b;
}
function zD(e, t, r, n, s, a) {
  const i = !hh(t) && Qo(e, t, r, a);
  let o = n;
  if (i) {
    const u = Pn(t);
    o = (u == null ? void 0 : u.some((f) => be(f.value, n))) ? n : void 0;
  }
  return t[xt] && (s == null ? void 0 : s.constAsDefaults) === "always" && (o = t.const), o;
}
function BD(e, t, { rawFormData: r, rootSchema: n = {}, includeUndefinedValues: s = !1, _recurseList: a = [], experimental_defaultFormStateBehavior: i = void 0, experimental_customMergeAllOf: o = void 0, required: l, shouldMergeDefaultsIntoFormData: u } = {}, c) {
  {
    const f = ae(r) ? r : {}, m = t, h = (i == null ? void 0 : i.allOf) === "populateDefaults" && kr in m ? We(e, m, n, f, o) : m, y = h[xt], v = Object.keys(h.properties || {}).reduce((g, p) => {
      var $;
      const b = z(h, [xe, p]), w = ae(y) && y[p] !== void 0, x = (ae(b) && xt in b || w) && (i == null ? void 0 : i.constAsDefaults) !== "never" && !mh(b), P = Lt(e, b, {
        rootSchema: n,
        _recurseList: a,
        experimental_defaultFormStateBehavior: i,
        experimental_customMergeAllOf: o,
        includeUndefinedValues: s === !0,
        parentDefaults: z(c, [p]),
        rawFormData: z(f, [p]),
        required: ($ = h.required) === null || $ === void 0 ? void 0 : $.includes(p),
        shouldMergeDefaultsIntoFormData: u
      });
      return Yu(g, p, P, s, l, h.required, i, x), g;
    }, {});
    if (h.additionalProperties) {
      const g = ae(h.additionalProperties) ? h.additionalProperties : {}, p = /* @__PURE__ */ new Set();
      ae(c) && Object.keys(c).filter((b) => !h.properties || !h.properties[b]).forEach((b) => p.add(b));
      const $ = [];
      Object.keys(f).filter((b) => !h.properties || !h.properties[b]).forEach((b) => {
        p.add(b), $.push(b);
      }), p.forEach((b) => {
        var w;
        const x = Lt(e, g, {
          rootSchema: n,
          _recurseList: a,
          experimental_defaultFormStateBehavior: i,
          experimental_customMergeAllOf: o,
          includeUndefinedValues: s === !0,
          parentDefaults: z(c, [b]),
          rawFormData: z(f, [b]),
          required: (w = h.required) === null || w === void 0 ? void 0 : w.includes(b),
          shouldMergeDefaultsIntoFormData: u
        });
        Yu(v, b, x, s, l, $);
      });
    }
    return v;
  }
}
function qD(e, t, { rawFormData: r, rootSchema: n = {}, _recurseList: s = [], experimental_defaultFormStateBehavior: a = void 0, experimental_customMergeAllOf: i = void 0, required: o, shouldMergeDefaultsIntoFormData: l } = {}, u) {
  var c, f;
  const m = t, h = (c = a == null ? void 0 : a.arrayMinItems) !== null && c !== void 0 ? c : {}, { populate: y, mergeExtraDefaults: v } = h, g = y === "never", p = y === "requiredOnly", $ = y === "all" || !g && !p, b = (f = h == null ? void 0 : h.computeSkipPopulate) !== null && f !== void 0 ? f : () => !1, x = (a == null ? void 0 : a.emptyObjectFields) === "skipEmptyDefaults" ? void 0 : [];
  if (Array.isArray(u) && (u = u.map((D, U) => {
    const M = ri(m, Pr.Fallback, U);
    return Lt(e, M, {
      rootSchema: n,
      _recurseList: s,
      experimental_defaultFormStateBehavior: a,
      experimental_customMergeAllOf: i,
      parentDefaults: D,
      required: o,
      shouldMergeDefaultsIntoFormData: l
    });
  })), Array.isArray(r)) {
    const D = ri(m);
    if (g)
      u = r;
    else {
      const U = r.map((B, R) => Lt(e, D, {
        rootSchema: n,
        _recurseList: s,
        experimental_defaultFormStateBehavior: a,
        experimental_customMergeAllOf: i,
        rawFormData: B,
        parentDefaults: z(u, [R]),
        required: o,
        shouldMergeDefaultsIntoFormData: l
      }));
      u = Nn(u, U, (p && o || $) && v);
    }
  }
  if ((ae(m) && xt in m && (a == null ? void 0 : a.constAsDefaults) !== "never") === !1) {
    if (g)
      return u ?? x;
    if (p && !o)
      return u || void 0;
  }
  const j = Array.isArray(u) ? u.length : 0;
  if (!m.minItems || el(e, m, n, i) || b(e, m, n) || m.minItems <= j)
    return u || x;
  const N = u || [], A = ri(m, Pr.Invert), C = A.default, F = new Array(m.minItems - j).fill(Lt(e, A, {
    parentDefaults: C,
    rootSchema: n,
    _recurseList: s,
    experimental_defaultFormStateBehavior: a,
    experimental_customMergeAllOf: i,
    required: o,
    shouldMergeDefaultsIntoFormData: l
  }));
  return N.concat(F);
}
function Zu(e, t, r = {}, n) {
  switch (St(t)) {
    case "object":
      return BD(e, t, r, n);
    case "array":
      return qD(e, t, r, n);
  }
}
function gh(e, t, r, n, s = !1, a, i) {
  if (!ae(t))
    throw new Error("Invalid schema: " + t);
  const o = We(e, t, n, r, i), l = Lt(e, o, {
    rootSchema: n,
    includeUndefinedValues: s,
    experimental_defaultFormStateBehavior: a,
    experimental_customMergeAllOf: i,
    rawFormData: r,
    shouldMergeDefaultsIntoFormData: !0
  });
  if (ae(r) || Array.isArray(r)) {
    const { mergeDefaultsIntoFormData: u } = a || {};
    return Nn(
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
function yh(e = {}) {
  return (
    // TODO: Remove the `&& uiSchema['ui:widget'] !== 'hidden'` once we support hidden widgets for arrays.
    // https://rjsf-team.github.io/react-jsonschema-form/docs/usage/widgets/#hidden-widgets
    "widget" in se(e) && se(e).widget !== "hidden"
  );
}
function vh(e, t, r = {}, n, s) {
  if (r[Zi] === "files")
    return !0;
  if (t.items) {
    const a = We(e, t.items, n, void 0, s);
    return a.type === "string" && a.format === "data-url";
  }
  return !1;
}
function KD(e, t, r = {}, n, s, a) {
  const i = se(r, s), { label: o = !0 } = i;
  let l = !!o;
  const u = St(t);
  return u === "array" && (l = el(e, t, n, a) || vh(e, t, r, n, a) || yh(r)), u === "object" && (l = !1), u === "boolean" && !r[Zi] && (l = !1), r[Xg] && (l = !1), l;
}
function GD(e, t, r) {
  if (!r)
    return t;
  const { errors: n, errorSchema: s } = t;
  let a = e.toErrorList(r), i = r;
  return Er(s) || (i = $t(s, r, !0), a = [...n].concat(a)), { errorSchema: i, errors: a };
}
const hr = Symbol("no Value");
function Ri(e, t, r, n, s = {}, a) {
  let i;
  if (Fe(r, xe)) {
    const o = {};
    if (Fe(n, xe)) {
      const c = z(n, xe, {});
      Object.keys(c).forEach((f) => {
        Fe(s, f) && (o[f] = void 0);
      });
    }
    const l = Object.keys(z(r, xe, {})), u = {};
    l.forEach((c) => {
      const f = z(s, c);
      let m = z(n, [xe, c], {}), h = z(r, [xe, c], {});
      Fe(m, Ee) && (m = We(e, m, t, f, a)), Fe(h, Ee) && (h = We(e, h, t, f, a));
      const y = z(m, "type"), v = z(h, "type");
      if (!y || y === v)
        if (Fe(o, c) && delete o[c], v === "object" || v === "array" && Array.isArray(f)) {
          const g = Ri(e, t, h, m, f, a);
          (g !== void 0 || v === "array") && (u[c] = g);
        } else {
          const g = z(h, "default", hr), p = z(m, "default", hr);
          g !== hr && g !== f && (p === f ? o[c] = g : z(h, "readOnly") === !0 && (o[c] = void 0));
          const $ = z(h, "const", hr), b = z(m, "const", hr);
          $ !== hr && $ !== f && (o[c] = b === f ? $ : void 0);
        }
    }), i = {
      ...typeof s == "string" || Array.isArray(s) ? void 0 : s,
      ...o,
      ...u
    };
  } else if (z(n, "type") === "array" && z(r, "type") === "array" && Array.isArray(s)) {
    let o = z(n, "items"), l = z(r, "items");
    if (typeof o == "object" && typeof l == "object" && !Array.isArray(o) && !Array.isArray(l)) {
      Fe(o, Ee) && (o = We(e, o, t, s, a)), Fe(l, Ee) && (l = We(e, l, t, s, a));
      const u = z(o, "type"), c = z(l, "type");
      if (!u || u === c) {
        const f = z(r, "maxItems", -1);
        c === "object" ? i = s.reduce((m, h) => {
          const y = Ri(e, t, l, o, h, a);
          return y !== void 0 && (f < 0 || m.length < f) && m.push(y), m;
        }, []) : i = f > 0 && s.length > f ? s.slice(0, f) : s;
      }
    } else typeof o == "boolean" && typeof l == "boolean" && o === l && (i = s);
  }
  return i;
}
function bs(e, t, r, n, s, a, i, o = [], l) {
  if (Ee in t || Ys in t || kr in t) {
    const f = We(e, t, a, i, l);
    if (o.findIndex((h) => be(h, f)) === -1)
      return bs(e, f, r, n, s, a, i, o.concat(f), l);
  }
  if (Mt in t && !z(t, [Mt, Ee]))
    return bs(e, z(t, Mt), r, n, s, a, i, o, l);
  const c = { $id: s || r };
  if (St(t) === "object" && xe in t)
    for (const f in t.properties) {
      const m = z(t, [xe, f]), h = c[Dt] + n + f;
      c[f] = bs(
        e,
        ae(m) ? m : {},
        r,
        n,
        h,
        a,
        // It's possible that formData is not an object -- this can happen if an
        // array item has just been added, but not populated with data yet
        z(i, [f]),
        o,
        l
      );
    }
  return c;
}
function HD(e, t, r, n, s, a = "root", i = "_", o) {
  return bs(e, t, a, i, r, n, s, void 0, o);
}
function Gt(e, t, r, n, s, a = [], i) {
  if (Ee in t || Ys in t || kr in t) {
    const l = We(e, t, n, s, i);
    if (a.findIndex((c) => be(c, l)) === -1)
      return Gt(e, l, r, n, s, a.concat(l), i);
  }
  let o = {
    [ys]: r.replace(/^\./, "")
  };
  if (Ue in t || et in t) {
    const l = Ue in t ? t.oneOf : t.anyOf, u = Nr(t), c = An(e, n, s, l, 0, u, i), f = l[c];
    o = {
      ...o,
      ...Gt(e, f, r, n, s, a, i)
    };
  }
  if (bi in t && t[bi] !== !1 && Pe(o, Yi, !0), Mt in t && Array.isArray(s)) {
    const { items: l, additionalItems: u } = t;
    Array.isArray(l) ? s.forEach((c, f) => {
      l[f] ? o[f] = Gt(e, l[f], `${r}.${f}`, n, c, a, i) : u ? o[f] = Gt(e, u, `${r}.${f}`, n, c, a, i) : console.warn(`Unable to generate path schema for "${r}.${f}". No schema defined for it`);
    }) : s.forEach((c, f) => {
      o[f] = Gt(e, l, `${r}.${f}`, n, c, a, i);
    });
  } else if (xe in t)
    for (const l in t.properties) {
      const u = z(t, [xe, l]);
      o[l] = Gt(
        e,
        u,
        `${r}.${l}`,
        n,
        // It's possible that formData is not an object -- this can happen if an
        // array item has just been added, but not populated with data yet
        z(s, [l]),
        a,
        i
      );
    }
  return o;
}
function JD(e, t, r = "", n, s, a) {
  return Gt(e, t, r, n, s, void 0, a);
}
class YD {
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
    return !t || !r ? !1 : this.validator !== t || !be(this.rootSchema, r) || !be(this.experimental_defaultFormStateBehavior, n) || this.experimental_customMergeAllOf !== s;
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
    return gh(this.validator, t, r, this.rootSchema, n, this.experimental_defaultFormStateBehavior, this.experimental_customMergeAllOf);
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
    return KD(this.validator, t, r, this.rootSchema, n, this.experimental_customMergeAllOf);
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
    return An(this.validator, this.rootSchema, t, r, n, s, this.experimental_customMergeAllOf);
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
    return Kf(this.validator, t, r, this.rootSchema, n);
  }
  /** Checks to see if the `schema` and `uiSchema` combination represents an array of files
   *
   * @param schema - The schema for which check for array of files flag is desired
   * @param [uiSchema] - The UI schema from which to check the widget
   * @returns - True if schema/uiSchema contains an array of files, otherwise false
   */
  isFilesArray(t, r) {
    return vh(this.validator, t, r, this.rootSchema, this.experimental_customMergeAllOf);
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
    return GD(this.validator, t, r);
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
    return We(this.validator, t, this.rootSchema, r, this.experimental_customMergeAllOf);
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
    return Ri(this.validator, this.rootSchema, t, r, n, this.experimental_customMergeAllOf);
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
    return HD(this.validator, t, r, this.rootSchema, n, s, a, this.experimental_customMergeAllOf);
  }
  /** Generates an `PathSchema` object for the `schema`, recursively
   *
   * @param schema - The schema for which the display label flag is desired
   * @param [name] - The base name for the schema
   * @param [formData] - The current formData, if any, onto which to provide any missing defaults
   * @returns - The `PathSchema` object for the `schema`
   */
  toPathSchema(t, r, n) {
    return JD(this.validator, t, r, this.rootSchema, n, this.experimental_customMergeAllOf);
  }
}
function ZD(e, t, r = {}, n) {
  return new YD(e, t, r, n);
}
function XD(e) {
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
function kt(e, t) {
  let r = String(e);
  for (; r.length < t; )
    r = "0" + r;
  return r;
}
function $h(e, t) {
  if (e <= 0 && t <= 0)
    e = (/* @__PURE__ */ new Date()).getFullYear() + e, t = (/* @__PURE__ */ new Date()).getFullYear() + t;
  else if (e < 0 || t < 0)
    throw new Error(`Both start (${e}) and stop (${t}) must both be <= 0 or > 0, got one of each`);
  if (e > t)
    return $h(t, e).reverse();
  const r = [];
  for (let n = e; n <= t; n++)
    r.push({ value: n, label: kt(n, 2) });
  return r;
}
function QD(e, t) {
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
function eR(e, t) {
  return QD(e, t);
}
function ut(e, t = [], r) {
  if (Array.isArray(e))
    return e.map((a) => ut(a, t)).filter((a) => a !== r);
  const n = e === "" || e === null ? -1 : Number(e), s = t[n];
  return s ? s.value : r;
}
function tR(e, t, r = []) {
  const n = ut(e, r);
  return Array.isArray(t) ? t.filter((s) => !be(s, n)) : be(n, t) ? void 0 : t;
}
function tl(e, t) {
  return Array.isArray(t) ? t.some((r) => be(r, e)) : be(t, e);
}
function rR(e, t = [], r = !1) {
  const n = t.map((s, a) => tl(s.value, e) ? String(a) : void 0).filter((s) => typeof s < "u");
  return r ? n : n[0];
}
function nR(e, t, r = []) {
  const n = ut(e, r);
  if (!yn(n)) {
    const s = r.findIndex((o) => n === o.value), a = r.map(({ value: o }) => o);
    return t.slice(0, s).concat(n, t.slice(s)).sort((o, l) => +(a.indexOf(o) > a.indexOf(l)));
  }
  return t;
}
var sR = 1, aR = 4;
function bh(e) {
  return gn(e, sR | aR);
}
function iR(e, t, r, n) {
  return n = typeof n == "function" ? n : void 0, e == null ? e : vo(e, t, r, n);
}
class oR {
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
    let n = Array.isArray(t) && t.length > 0 || typeof t == "string" ? z(this.errorSchema, t) : this.errorSchema;
    return !n && t && (n = {}, iR(this.errorSchema, t, n, Object)), n;
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
    let s = z(n, Le);
    return Array.isArray(s) || (s = [], n[Le] = s), Array.isArray(t) ? Pe(n, Le, [.../* @__PURE__ */ new Set([...s, ...t])]) : Pe(n, Le, [.../* @__PURE__ */ new Set([...s, t])]), this;
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
    return Pe(n, Le, s), this;
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
    return Pe(r, Le, []), this;
  }
}
function lR(e, t, r = [1900, (/* @__PURE__ */ new Date()).getFullYear() + 2], n = "YMD") {
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
function cR(e) {
  const t = {};
  return e.multipleOf && (t.step = e.multipleOf), (e.minimum || e.minimum === 0) && (t.min = e.minimum), (e.maximum || e.maximum === 0) && (t.max = e.maximum), t;
}
function uR(e, t, r = {}, n = !0) {
  const s = {
    type: t || "text",
    ...cR(e)
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
function dR(e = {}) {
  const t = se(e);
  if (t && t[Ps]) {
    const r = t[Ps];
    return { ...Xu, ...r };
  }
  return Xu;
}
function oe(e, t, r = {}) {
  const { templates: n } = t;
  return e === "ButtonTemplates" ? n[e] : (
    // Evaluating uiOptions[name] results in TS2590: Expression produces a union type that is too complex to represent
    // To avoid that, we cast uiOptions to `any` before accessing the name field
    r[e] || n[e]
  );
}
var _h = { exports: {} }, ce = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rl = Symbol.for("react.element"), nl = Symbol.for("react.portal"), xa = Symbol.for("react.fragment"), Sa = Symbol.for("react.strict_mode"), ja = Symbol.for("react.profiler"), Ea = Symbol.for("react.provider"), Oa = Symbol.for("react.context"), fR = Symbol.for("react.server_context"), Aa = Symbol.for("react.forward_ref"), Na = Symbol.for("react.suspense"), Pa = Symbol.for("react.suspense_list"), Ca = Symbol.for("react.memo"), Ta = Symbol.for("react.lazy"), pR = Symbol.for("react.offscreen"), wh;
wh = Symbol.for("react.module.reference");
function He(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case rl:
        switch (e = e.type, e) {
          case xa:
          case ja:
          case Sa:
          case Na:
          case Pa:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case fR:
              case Oa:
              case Aa:
              case Ta:
              case Ca:
              case Ea:
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
ce.ContextConsumer = Oa;
ce.ContextProvider = Ea;
ce.Element = rl;
ce.ForwardRef = Aa;
ce.Fragment = xa;
ce.Lazy = Ta;
ce.Memo = Ca;
ce.Portal = nl;
ce.Profiler = ja;
ce.StrictMode = Sa;
ce.Suspense = Na;
ce.SuspenseList = Pa;
ce.isAsyncMode = function() {
  return !1;
};
ce.isConcurrentMode = function() {
  return !1;
};
ce.isContextConsumer = function(e) {
  return He(e) === Oa;
};
ce.isContextProvider = function(e) {
  return He(e) === Ea;
};
ce.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === rl;
};
ce.isForwardRef = function(e) {
  return He(e) === Aa;
};
ce.isFragment = function(e) {
  return He(e) === xa;
};
ce.isLazy = function(e) {
  return He(e) === Ta;
};
ce.isMemo = function(e) {
  return He(e) === Ca;
};
ce.isPortal = function(e) {
  return He(e) === nl;
};
ce.isProfiler = function(e) {
  return He(e) === ja;
};
ce.isStrictMode = function(e) {
  return He(e) === Sa;
};
ce.isSuspense = function(e) {
  return He(e) === Na;
};
ce.isSuspenseList = function(e) {
  return He(e) === Pa;
};
ce.isValidElementType = function(e) {
  return typeof e == "string" || typeof e == "function" || e === xa || e === ja || e === Sa || e === Na || e === Pa || e === pR || typeof e == "object" && e !== null && (e.$$typeof === Ta || e.$$typeof === Ca || e.$$typeof === Ea || e.$$typeof === Oa || e.$$typeof === Aa || e.$$typeof === wh || e.getModuleId !== void 0);
};
ce.typeOf = He;
_h.exports = ce;
var hR = _h.exports;
const Qu = /* @__PURE__ */ kn(hR), ni = {
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
function mR(e) {
  let t = z(e, "MergedWidget");
  if (!t) {
    const r = e.defaultProps && e.defaultProps.options || {};
    t = ({ options: n, ...s }) => d.jsx(e, { options: { ...r, ...n }, ...s }), Pe(e, "MergedWidget", t);
  }
  return t;
}
function bt(e, t, r = {}) {
  const n = St(e);
  if (typeof t == "function" || t && Qu.isForwardRef(Gm(t)) || Qu.isMemo(t))
    return mR(t);
  if (typeof t != "string")
    throw new Error(`Unsupported widget definition: ${typeof t}`);
  if (t in r) {
    const s = r[t];
    return bt(e, s, r);
  }
  if (typeof n == "string") {
    if (!(n in ni))
      throw new Error(`No widget for type '${n}'`);
    if (t in ni[n]) {
      const s = r[ni[n][t]];
      return bt(e, s, r);
    }
  }
  throw new Error(`No widget '${t}' for type '${n}'`);
}
function gR(e) {
  let t = 0;
  for (let r = 0; r < e.length; r += 1) {
    const n = e.charCodeAt(r);
    t = (t << 5) - t + n, t = t & t;
  }
  return t.toString(16);
}
function yR(e) {
  const t = /* @__PURE__ */ new Set();
  return JSON.stringify(e, (r, n) => (t.add(r), n)), gR(JSON.stringify(e, Array.from(t).sort()));
}
function vR(e, t, r = {}) {
  try {
    return bt(e, t, r), !0;
  } catch (n) {
    const s = n;
    if (s.message && (s.message.startsWith("No widget") || s.message.startsWith("Unsupported widget")))
      return !1;
    throw n;
  }
}
function Jn(e, t) {
  return `${la(e) ? e : e[Dt]}__${t}`;
}
function Yn(e) {
  return Jn(e, "description");
}
function xh(e) {
  return Jn(e, "error");
}
function Mi(e) {
  return Jn(e, "examples");
}
function Sh(e) {
  return Jn(e, "help");
}
function jh(e) {
  return Jn(e, "title");
}
function fr(e, t = !1) {
  const r = t ? ` ${Mi(e)}` : "";
  return `${xh(e)} ${Yn(e)} ${Sh(e)}${r}`;
}
function Eh(e, t) {
  return `${e}-${t}`;
}
function $R(e, t, r) {
  return t ? r : e;
}
function bR(e) {
  return e ? new Date(e).toJSON() : void 0;
}
function _R(e, t) {
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
function _s(e) {
  if (e.const || e.enum && e.enum.length === 1 && e.enum[0] === !0)
    return !0;
  if (e.anyOf && e.anyOf.length === 1)
    return _s(e.anyOf[0]);
  if (e.oneOf && e.oneOf.length === 1)
    return _s(e.oneOf[0]);
  if (e.allOf) {
    const t = (r) => _s(r);
    return e.allOf.some(t);
  }
  return !1;
}
function wR(e, t, r) {
  const { props: n, state: s } = e;
  return !be(n, t) || !be(s, r);
}
function ed(e, t = !0) {
  const { year: r, month: n, day: s, hour: a = 0, minute: i = 0, second: o = 0 } = e, l = Date.UTC(r, n - 1, s, a, i, o), u = new Date(l).toJSON();
  return t ? u : u.slice(0, 10);
}
function Cn(e, t = []) {
  if (!e)
    return [];
  let r = [];
  return Le in e && (r = r.concat(e[Le].map((n) => {
    const s = `.${t.join(".")}`;
    return {
      property: s,
      message: n,
      stack: `${s} ${n}`
    };
  }))), Object.keys(e).reduce((n, s) => {
    if (s !== Le) {
      const a = e[s];
      Qt(a) && (n = n.concat(Cn(a, [...t, s])));
    }
    return n;
  }, r);
}
function Oh(e) {
  return Oe(e) ? sa(e, ir) : Wn(e) ? [e] : fo(mf(io(e)));
}
function xR(e) {
  const t = new oR();
  return e.length && e.forEach((r) => {
    const { property: n, message: s } = r, a = n === "." ? [] : Oh(n);
    a.length > 0 && a[0] === "" && a.splice(0, 1), s && t.addErrors(s, a);
  }), t.ErrorSchema;
}
function sl(e) {
  return Object.keys(e).reduce((t, r) => {
    if (r === "addError")
      return t;
    {
      const n = e[r];
      return Qt(n) ? {
        ...t,
        [r]: sl(n)
      } : { ...t, [r]: n };
    }
  }, {});
}
function SR(e) {
  if (!e)
    return "";
  const t = new Date(e), r = kt(t.getFullYear(), 4), n = kt(t.getMonth() + 1, 2), s = kt(t.getDate(), 2), a = kt(t.getHours(), 2), i = kt(t.getMinutes(), 2), o = kt(t.getSeconds(), 2), l = kt(t.getMilliseconds(), 3);
  return `${r}-${n}-${s}T${a}:${i}:${o}.${l}`;
}
function ws(e, t) {
  if (!t)
    return e;
  const { errors: r, errorSchema: n } = e;
  let s = Cn(t), a = t;
  return Er(n) || (a = $t(n, t, !0), s = [...r].concat(s)), { errorSchema: a, errors: s };
}
function jR(e) {
  for (const t in e) {
    const r = e, n = r[t];
    t === Ee && typeof n == "string" && n.startsWith("#") ? r[t] = ef + n : r[t] = al(n);
  }
  return e;
}
function ER(e) {
  for (let t = 0; t < e.length; t++)
    e[t] = al(e[t]);
  return e;
}
function al(e) {
  return Array.isArray(e) ? ER([...e]) : ge(e) ? jR({ ...e }) : e;
}
function Ah(e, t, r) {
  for (var n = -1, s = t.length, a = {}; ++n < s; ) {
    var i = t[n], o = aa(e, i);
    r(o, i) && vo(a, Rr(i, e), o);
  }
  return a;
}
function OR(e, t) {
  if (e == null)
    return {};
  var r = sa(po(e), function(n) {
    return [n];
  });
  return t = go(t), Ah(e, r, function(n, s) {
    return t(n, s[0]);
  });
}
var AR = 200;
function NR(e, t, r, n) {
  var s = -1, a = Hf, i = !0, o = e.length, l = [], u = t.length;
  if (!o)
    return l;
  t.length >= AR && (a = Xi, i = !1, t = new xr(t));
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
var PR = $o(function(e, t) {
  return ks(e) ? NR(e, zn(t, 1, ks, !0)) : [];
});
function CR(e, t) {
  const r = Qt(e), n = Qt(t);
  if (e === t || !r && !n)
    return [];
  if (r && !n)
    return at(e);
  if (!r && n)
    return at(t);
  {
    const s = at(OR(e, (i, o) => !be(i, z(t, o)))), a = PR(at(t), at(e));
    return [...s, ...a];
  }
}
var pe;
(function(e) {
  e.ArrayItemTitle = "Item", e.MissingItems = "Missing items definition", e.YesLabel = "Yes", e.NoLabel = "No", e.CloseLabel = "Close", e.ErrorsLabel = "Errors", e.NewStringDefault = "New Value", e.AddButton = "Add", e.AddItemButton = "Add Item", e.CopyButton = "Copy", e.MoveDownButton = "Move down", e.MoveUpButton = "Move up", e.RemoveButton = "Remove", e.NowLabel = "Now", e.ClearLabel = "Clear", e.AriaDateLabel = "Select a date", e.PreviewLabel = "Preview", e.DecrementAriaLabel = "Decrease value by 1", e.IncrementAriaLabel = "Increase value by 1", e.UnknownFieldType = "Unknown field type %1", e.OptionPrefix = "Option %1", e.TitleOptionPrefix = "%1 option %2", e.KeyLabel = "%1 Key", e.InvalidObjectField = 'Invalid "%1" object field configuration: _%2_.', e.UnsupportedField = "Unsupported field schema.", e.UnsupportedFieldWithId = "Unsupported field schema for field `%1`.", e.UnsupportedFieldWithReason = "Unsupported field schema: _%1_.", e.UnsupportedFieldWithIdAndReason = "Unsupported field schema for field `%1`: _%2_.", e.FilesInfo = "**%1** (%2, %3 bytes)";
})(pe || (pe = {}));
function TR(e, t) {
  var r = Oe(e) ? lo : Lf;
  return r(e, zf(t));
}
function IR(e, t) {
  return Ah(e, t, function(r, n) {
    return Vf(e, n);
  });
}
var td = Tf(function(e, t) {
  return e == null ? {} : IR(e, t);
}), FR = 0;
function kR(e) {
  var t = ++FR;
  return io(e) + t;
}
function Li() {
  return kR("rjsf-array-item-");
}
function rd(e) {
  return Array.isArray(e) ? e.map((t) => ({
    key: Li(),
    item: t
  })) : [];
}
function an(e) {
  return Array.isArray(e) ? e.map((t) => t.item) : [];
}
class DR extends Fn {
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
      return Di(r) && Kg(r) && (a = r.additionalItems), s.getDefaultFormState(a);
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
        for (const c in a) {
          const f = parseInt(c);
          f <= r ? Pe(o, [f], a[c]) : f > r && Pe(o, [f + 1], a[c]);
        }
      }
      const l = {
        key: Li(),
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
    ue(this, "onDropIndexClick", (r) => (n) => {
      n && n.preventDefault();
      const { onChange: s, errorSchema: a } = this.props, { keyedFormData: i } = this.state;
      let o;
      if (a) {
        o = {};
        for (const u in a) {
          const c = parseInt(u);
          c < r ? Pe(o, [c], a[u]) : c > r && Pe(o, [c - 1], a[u]);
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
    ue(this, "onReorderClick", (r, n) => (s) => {
      s && (s.preventDefault(), s.currentTarget.blur());
      const { onChange: a, errorSchema: i } = this.props;
      let o;
      if (i) {
        o = {};
        for (const f in i) {
          const m = parseInt(f);
          m == r ? Pe(o, [n], i[r]) : m == n ? Pe(o, [r], i[n]) : Pe(o, [f], i[m]);
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
    ue(this, "onChangeForIndex", (r) => (n, s, a) => {
      const { formData: i, onChange: o, errorSchema: l } = this.props, c = (Array.isArray(i) ? i : []).map((f, m) => r === m ? typeof n > "u" ? null : n : f);
      o(c, l && l && {
        ...l,
        [r]: s
      }, a);
    });
    /** Callback handler used to change the value for a checkbox */
    ue(this, "onSelectChange", (r) => {
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
    return z(r, [Mt, "title"], z(r, [Mt, "description"], s(pe.ArrayItemTitle)));
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
        n === void 0 || f < n ? Pe(o, [f], a[c]) : f >= n && Pe(o, [f + 1], a[c]);
      }
    }
    const l = {
      key: Li(),
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
    if (!(Mt in r)) {
      const l = se(n), u = oe("UnsupportedFieldTemplate", a, l);
      return d.jsx(u, { schema: r, idSchema: s, reason: o(pe.MissingItems), registry: a });
    }
    return i.isMultiSelect(r) ? this.renderMultiSelect() : yh(n) ? this.renderCustomWidget() : Di(r) ? this.renderFixedArray() : i.isFilesArray(r, n) ? this.renderFiles() : this.renderNormalArray();
  }
  /** Renders a normal array without any limitations of length
   */
  renderNormalArray() {
    const { schema: r, uiSchema: n = {}, errorSchema: s, idSchema: a, name: i, title: o, disabled: l = !1, readonly: u = !1, autofocus: c = !1, required: f = !1, registry: m, onBlur: h, onFocus: y, idPrefix: v, idSeparator: g = "_", rawErrors: p } = this.props, { keyedFormData: $ } = this.state, b = r.title || o || i, { schemaUtils: w, formContext: x } = m, P = se(n), j = ge(r.items) ? r.items : {}, N = w.retrieveSchema(j), A = an(this.state.keyedFormData), C = this.canAddItem(A), F = {
      canAdd: C,
      items: $.map((U, M) => {
        const { key: B, item: R } = U, Q = R, Z = w.retrieveSchema(j, Q), ee = s ? s[M] : void 0, k = a.$id + g + M, E = w.toIdSchema(Z, k, Q, v, g);
        return this.renderArrayFieldItem({
          key: B,
          index: M,
          name: i && `${i}-${M}`,
          title: b ? `${b}-${M + 1}` : void 0,
          canAdd: C,
          canMoveUp: M > 0,
          canMoveDown: M < A.length - 1,
          itemSchema: Z,
          itemIdSchema: E,
          itemErrorSchema: ee,
          itemData: Q,
          itemUiSchema: n.items,
          autofocus: c && M === 0,
          onBlur: h,
          onFocus: y,
          rawErrors: p,
          totalItems: $.length
        });
      }),
      className: `field field-array field-array-of-${N.type}`,
      disabled: l,
      idSchema: a,
      uiSchema: n,
      onAddClick: this.onAddClick,
      readonly: u,
      required: f,
      schema: r,
      title: b,
      formContext: x,
      formData: A,
      rawErrors: p,
      registry: m
    }, D = oe("ArrayFieldTemplate", m, P);
    return d.jsx(D, { ...F });
  }
  /** Renders an array using the custom widget provided by the user in the `uiSchema`
   */
  renderCustomWidget() {
    const { schema: r, idSchema: n, uiSchema: s, disabled: a = !1, readonly: i = !1, autofocus: o = !1, required: l = !1, hideError: u, placeholder: c, onBlur: f, onFocus: m, formData: h = [], registry: y, rawErrors: v, name: g } = this.props, { widgets: p, formContext: $, globalUiOptions: b, schemaUtils: w } = y, { widget: x, title: P, ...j } = se(s, b), N = bt(r, x, p), A = P ?? r.title ?? g, C = w.getDisplayLabel(r, s, b);
    return d.jsx(N, { id: n.$id, name: g, multiple: !0, onChange: this.onSelectChange, onBlur: f, onFocus: m, options: j, schema: r, uiSchema: s, registry: y, value: h, disabled: a, readonly: i, hideError: u, required: l, label: A, hideLabel: !C, placeholder: c, formContext: $, autofocus: o, rawErrors: v });
  }
  /** Renders an array as a set of checkboxes
   */
  renderMultiSelect() {
    const { schema: r, idSchema: n, uiSchema: s, formData: a = [], disabled: i = !1, readonly: o = !1, autofocus: l = !1, required: u = !1, placeholder: c, onBlur: f, onFocus: m, registry: h, rawErrors: y, name: v } = this.props, { widgets: g, schemaUtils: p, formContext: $, globalUiOptions: b } = h, w = p.retrieveSchema(r.items, a), x = Pn(w, s), { widget: P = "select", title: j, ...N } = se(s, b), A = bt(r, P, g), C = j ?? r.title ?? v, F = p.getDisplayLabel(r, s, b);
    return d.jsx(A, { id: n.$id, name: v, multiple: !0, onChange: this.onSelectChange, onBlur: f, onFocus: m, options: { ...N, enumOptions: x }, schema: r, uiSchema: s, registry: h, value: a, disabled: i, readonly: o, required: u, label: C, hideLabel: !F, placeholder: c, formContext: $, autofocus: l, rawErrors: y });
  }
  /** Renders an array of files using the `FileWidget`
   */
  renderFiles() {
    const { schema: r, uiSchema: n, idSchema: s, name: a, disabled: i = !1, readonly: o = !1, autofocus: l = !1, required: u = !1, onBlur: c, onFocus: f, registry: m, formData: h = [], rawErrors: y } = this.props, { widgets: v, formContext: g, globalUiOptions: p, schemaUtils: $ } = m, { widget: b = "files", title: w, ...x } = se(n, p), P = bt(r, b, v), j = w ?? r.title ?? a, N = $.getDisplayLabel(r, n, p);
    return d.jsx(P, { options: x, id: s.$id, name: a, multiple: !0, onChange: this.onSelectChange, onBlur: c, onFocus: f, schema: r, uiSchema: n, value: h, disabled: i, readonly: o, required: u, registry: m, formContext: g, autofocus: l, rawErrors: y, label: j, hideLabel: !N });
  }
  /** Renders an array that has a maximum limit of items
   */
  renderFixedArray() {
    const { schema: r, uiSchema: n = {}, formData: s = [], errorSchema: a, idPrefix: i, idSeparator: o = "_", idSchema: l, name: u, title: c, disabled: f = !1, readonly: m = !1, autofocus: h = !1, required: y = !1, registry: v, onBlur: g, onFocus: p, rawErrors: $ } = this.props, { keyedFormData: b } = this.state;
    let { formData: w = [] } = this.props;
    const x = r.title || c || u, P = se(n), { schemaUtils: j, formContext: N } = v, C = (ge(r.items) ? r.items : []).map((B, R) => j.retrieveSchema(B, s[R])), F = ge(r.additionalItems) ? j.retrieveSchema(r.additionalItems, s) : null;
    (!w || w.length < C.length) && (w = w || [], w = w.concat(new Array(C.length - w.length)));
    const D = this.canAddItem(w) && !!F, U = {
      canAdd: D,
      className: "field field-array field-array-fixed-items",
      disabled: f,
      idSchema: l,
      formData: s,
      items: b.map((B, R) => {
        const { key: Q, item: Z } = B, ee = Z, k = R >= C.length, E = (k && ge(r.additionalItems) ? j.retrieveSchema(r.additionalItems, ee) : C[R]) || {}, T = l.$id + o + R, O = j.toIdSchema(E, T, ee, i, o), _ = k ? n.additionalItems || {} : Array.isArray(n.items) ? n.items[R] : n.items || {}, S = a ? a[R] : void 0;
        return this.renderArrayFieldItem({
          key: Q,
          index: R,
          name: u && `${u}-${R}`,
          title: x ? `${x}-${R + 1}` : void 0,
          canAdd: D,
          canRemove: k,
          canMoveUp: R >= C.length + 1,
          canMoveDown: k && R < w.length - 1,
          itemSchema: E,
          itemData: ee,
          itemUiSchema: _,
          itemIdSchema: O,
          itemErrorSchema: S,
          autofocus: h && R === 0,
          onBlur: g,
          onFocus: p,
          rawErrors: $,
          totalItems: b.length
        });
      }),
      onAddClick: this.onAddClick,
      readonly: m,
      required: y,
      registry: v,
      schema: r,
      uiSchema: n,
      title: x,
      formContext: N,
      errorSchema: a,
      rawErrors: $
    }, M = oe("ArrayFieldTemplate", v, P);
    return d.jsx(M, { ...U });
  }
  /** Renders the individual array item using a `SchemaField` along with the additional properties required to be send
   * back to the `ArrayFieldItemTemplate`.
   *
   * @param props - The props for the individual array item to be rendered
   */
  renderArrayFieldItem(r) {
    const { key: n, index: s, name: a, canAdd: i, canRemove: o = !0, canMoveUp: l, canMoveDown: u, itemSchema: c, itemData: f, itemUiSchema: m, itemIdSchema: h, itemErrorSchema: y, autofocus: v, onBlur: g, onFocus: p, rawErrors: $, totalItems: b, title: w } = r, { disabled: x, hideError: P, idPrefix: j, idSeparator: N, readonly: A, uiSchema: C, registry: F, formContext: D } = this.props, { fields: { ArraySchemaField: U, SchemaField: M }, globalUiOptions: B } = F, R = U || M, { orderable: Q = !0, removable: Z = !0, copyable: ee = !1 } = se(C, B), k = {
      moveUp: Q && l,
      moveDown: Q && u,
      copy: ee && i,
      remove: Z && o,
      toolbar: !1
    };
    return k.toolbar = Object.keys(k).some((E) => k[E]), {
      children: d.jsx(R, { name: a, title: w, index: s, schema: c, uiSchema: m, formData: f, formContext: D, errorSchema: y, idPrefix: j, idSeparator: N, idSchema: h, required: this.isItemRequired(c), onChange: this.onChangeForIndex(s), onBlur: g, onFocus: p, registry: F, disabled: x, readonly: A, hideError: P, autofocus: v, rawErrors: $ }),
      className: "array-item",
      disabled: x,
      canAdd: i,
      hasCopy: k.copy,
      hasToolbar: k.toolbar,
      hasMoveUp: k.moveUp,
      hasMoveDown: k.moveDown,
      hasRemove: k.remove,
      index: s,
      totalItems: b,
      key: n,
      onAddIndexClick: this.onAddIndexClick,
      onCopyIndexClick: this.onCopyIndexClick,
      onDropIndexClick: this.onDropIndexClick,
      onReorderClick: this.onReorderClick,
      readonly: A,
      registry: F,
      schema: c,
      uiSchema: m
    };
  }
}
function RR(e) {
  const { schema: t, name: r, uiSchema: n, idSchema: s, formData: a, registry: i, required: o, disabled: l, readonly: u, hideError: c, autofocus: f, title: m, onChange: h, onFocus: y, onBlur: v, rawErrors: g } = e, { title: p } = t, { widgets: $, formContext: b, translateString: w, globalUiOptions: x } = i, {
    widget: P = "checkbox",
    title: j,
    // Unlike the other fields, don't use `getDisplayLabel()` since it always returns false for the boolean type
    label: N = !0,
    ...A
  } = se(n, x), C = bt(t, P, $), F = w(pe.YesLabel), D = w(pe.NoLabel);
  let U;
  const M = j ?? p ?? m ?? r;
  if (Array.isArray(t.oneOf))
    U = Pn({
      oneOf: t.oneOf.map((B) => {
        if (ge(B))
          return {
            ...B,
            title: B.title || (B.const === !0 ? F : D)
          };
      }).filter((B) => B)
      // cast away the error that typescript can't grok is fixed
    }, n);
  else {
    const B = t, R = t.enum ?? [!0, !1];
    !B.enumNames && R.length === 2 && R.every((Q) => typeof Q == "boolean") ? U = [
      {
        value: R[0],
        label: R[0] ? F : D
      },
      {
        value: R[1],
        label: R[1] ? F : D
      }
    ] : U = Pn({
      enum: R,
      // NOTE: enumNames is deprecated, but still supported for now.
      enumNames: B.enumNames
    }, n);
  }
  return d.jsx(C, { options: { ...A, enumOptions: U }, schema: t, uiSchema: n, id: s.$id, name: r, onChange: h, onFocus: y, onBlur: v, label: M, hideLabel: !N, value: a, required: o, disabled: l, readonly: u, hideError: c, registry: i, formContext: b, autofocus: f, rawErrors: g });
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
    ue(this, "onOptionChange", (r) => {
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
    if (!be(r.options, a)) {
      const { registry: { schemaUtils: u } } = this.props, c = a.map((f) => u.retrieveSchema(f, s));
      l = { selectedOption: o, retrievedOptions: c };
    }
    if (!be(s, r.formData) && i.$id === r.idSchema.$id) {
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
    const { schema: a, registry: { schemaUtils: i } } = this.props, o = Nr(a);
    return i.getClosestMatchingOption(n, s, r, o);
  }
  getFieldId() {
    const { idSchema: r, schema: n } = this.props;
    return `${r.$id}${n.oneOf ? "__oneof_select" : "__anyof_select"}`;
  }
  /** Renders the `AnyOfField` selector along with a `SchemaField` for the value of the `formData`
   */
  render() {
    const { name: r, disabled: n = !1, errorSchema: s = {}, formContext: a, onBlur: i, onFocus: o, readonly: l, registry: u, schema: c, uiSchema: f } = this.props, { widgets: m, fields: h, translateString: y, globalUiOptions: v, schemaUtils: g } = u, { SchemaField: p } = h, { selectedOption: $, retrievedOptions: b } = this.state, { widget: w = "select", placeholder: x, autofocus: P, autocomplete: j, title: N = c.title, ...A } = se(f, v), C = bt({ type: "number" }, w, m), F = z(s, Le, []), D = Fs(s, [Le]), U = g.getDisplayLabel(c, f, v), M = $ >= 0 && b[$] || null;
    let B;
    if (M) {
      const { required: E } = c;
      B = E ? jt({ required: E }, M) : M;
    }
    let R = [];
    Ue in c && f && Ue in f ? Array.isArray(f[Ue]) ? R = f[Ue] : console.warn(`uiSchema.oneOf is not an array for "${N || r}"`) : et in c && f && et in f && (Array.isArray(f[et]) ? R = f[et] : console.warn(`uiSchema.anyOf is not an array for "${N || r}"`));
    let Q = f;
    $ >= 0 && R.length > $ && (Q = R[$]);
    const Z = N ? pe.TitleOptionPrefix : pe.OptionPrefix, ee = N ? [N] : [], k = b.map((E, T) => {
      const { title: O = E.title } = se(R[T]);
      return {
        label: O || y(Z, ee.concat(String(T + 1))),
        value: T
      };
    });
    return d.jsxs("div", { className: "panel panel-default panel-body", children: [d.jsx("div", { className: "form-group", children: d.jsx(C, { id: this.getFieldId(), name: `${r}${c.oneOf ? "__oneof_select" : "__anyof_select"}`, schema: { type: "number", default: 0 }, onChange: this.onOptionChange, onBlur: i, onFocus: o, disabled: n || Er(k), multiple: !1, rawErrors: F, errorSchema: D, value: $ >= 0 ? $ : void 0, options: { enumOptions: k, ...A }, registry: u, formContext: a, placeholder: x, autocomplete: j, autofocus: P, label: N ?? r, hideLabel: !U, readonly: l }) }), B && B.type !== "null" && d.jsx(p, { ...this.props, schema: B, uiSchema: Q })] });
  }
}
const MR = /\.([0-9]*0)*$/, LR = /[0.]0*$/;
function UR(e) {
  const { registry: t, onChange: r, formData: n, value: s } = e, [a, i] = de(s), { StringField: o } = t.fields;
  let l = n;
  const u = te((c, f, m) => {
    i(c), `${c}`.charAt(0) === "." && (c = `0${c}`);
    const h = typeof c == "string" && c.match(MR) ? lc(c.replace(LR, "")) : lc(c);
    r(h, f, m);
  }, [r]);
  if (typeof a == "string" && typeof l == "number") {
    const c = new RegExp(`^(${String(l).replace(".", "\\.")})?\\.?0*$`);
    a.match(c) && (l = a);
  }
  return d.jsx(o, { ...e, formData: l, onChange: u });
}
function Ht() {
  return Ht = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ht.apply(this, arguments);
}
const WR = ["children", "options"], sd = ["allowFullScreen", "allowTransparency", "autoComplete", "autoFocus", "autoPlay", "cellPadding", "cellSpacing", "charSet", "classId", "colSpan", "contentEditable", "contextMenu", "crossOrigin", "encType", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "hrefLang", "inputMode", "keyParams", "keyType", "marginHeight", "marginWidth", "maxLength", "mediaGroup", "minLength", "noValidate", "radioGroup", "readOnly", "rowSpan", "spellCheck", "srcDoc", "srcLang", "srcSet", "tabIndex", "useMap"].reduce((e, t) => (e[t.toLowerCase()] = t, e), { class: "className", for: "htmlFor" }), ad = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: "“" }, VR = ["style", "script", "pre"], zR = ["src", "href", "data", "formAction", "srcDoc", "action"], BR = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi, qR = /\n{2,}$/, id = /^(\s*>[\s\S]*?)(?=\n\n|$)/, KR = /^ *> ?/gm, GR = /^(?:\[!([^\]]*)\]\n)?([\s\S]*)/, HR = /^ {2,}\n/, JR = /^(?:([-*_])( *\1){2,}) *(?:\n *)+\n/, od = /^(?: {1,3})?(`{3,}|~{3,}) *(\S+)? *([^\n]*?)?\n([\s\S]*?)(?:\1\n?|$)/, ld = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/, YR = /^(`+)((?:\\`|(?!\1)`|[^`])+)\1/, ZR = /^(?:\n *)*\n/, XR = /\r\n?/g, QR = /^\[\^([^\]]+)](:(.*)((\n+ {4,}.*)|(\n(?!\[\^).+))*)/, e3 = /^\[\^([^\]]+)]/, t3 = /\f/g, r3 = /^---[ \t]*\n(.|\n)*\n---[ \t]*\n/, n3 = /^\s*?\[(x|\s)\]/, cd = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, ud = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, dd = /^([^\n]+)\n *(=|-)\2{2,} *\n/, ai = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?((?:[^>]*[^/])?)>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1\b)[\s\S])*?)<\/\1>(?!<\/\1>)\n*/i, s3 = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, fd = /^<!--[\s\S]*?(?:-->)/, a3 = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/, ii = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i, i3 = /^\{.*\}$/, o3 = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, l3 = /^<([^ >]+[:@\/][^ >]+)>/, c3 = /-([a-z])?/gi, pd = /^(\|.*)\n(?: *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*))?\n?/, u3 = /^[^\n]+(?:  \n|\n{2,})/, d3 = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/, f3 = /^!\[([^\]]*)\] ?\[([^\]]*)\]/, p3 = /^\[([^\]]*)\] ?\[([^\]]*)\]/, h3 = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/, m3 = /\t/g, g3 = /(^ *\||\| *$)/g, y3 = /^ *:-+: *$/, v3 = /^ *:-+ *$/, $3 = /^ *-+: *$/, Ia = (e) => `(?=[\\s\\S]+?\\1${e ? "\\1" : ""})`, Fa = "((?:\\[.*?\\][([].*?[)\\]]|<.*?>(?:.*?<.*?>)?|`.*?`|\\\\\\1|[\\s\\S])+?)", b3 = RegExp(`^([*_])\\1${Ia(1)}${Fa}\\1\\1(?!\\1)`), _3 = RegExp(`^([*_])${Ia(0)}${Fa}\\1(?!\\1)`), w3 = RegExp(`^(==)${Ia(0)}${Fa}\\1`), x3 = RegExp(`^(~~)${Ia(0)}${Fa}\\1`), S3 = /^(:[a-zA-Z0-9-_]+:)/, j3 = /^\\([^0-9A-Za-z\s])/, E3 = /\\([^0-9A-Za-z\s])/g, O3 = /^[\s\S](?:(?!  \n|[0-9]\.|http)[^=*_~\-\n:<`\\\[!])*/, A3 = /^\n+/, N3 = /^([ \t]*)/, P3 = /(?:^|\n)( *)$/, il = "(?:\\d+\\.)", ol = "(?:[*+-])";
function Nh(e) {
  return "( *)(" + (e === 1 ? il : ol) + ") +";
}
const Ph = Nh(1), Ch = Nh(2);
function Th(e) {
  return RegExp("^" + (e === 1 ? Ph : Ch));
}
const C3 = Th(1), T3 = Th(2);
function Ih(e) {
  return RegExp("^" + (e === 1 ? Ph : Ch) + "[^\\n]*(?:\\n(?!\\1" + (e === 1 ? il : ol) + " )[^\\n]*)*(\\n|$)", "gm");
}
const I3 = Ih(1), F3 = Ih(2);
function Fh(e) {
  const t = e === 1 ? il : ol;
  return RegExp("^( *)(" + t + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + t + " (?!" + t + " ))\\n*|\\s*\\n*$)");
}
const kh = Fh(1), Dh = Fh(2);
function hd(e, t) {
  const r = t === 1, n = r ? kh : Dh, s = r ? I3 : F3, a = r ? C3 : T3;
  return { t: (i) => a.test(i), o: Cr(function(i, o) {
    const l = P3.exec(o.prevCapture);
    return l && (o.list || !o.inline && !o.simple) ? n.exec(i = l[1] + i) : null;
  }), i: 1, u(i, o, l) {
    const u = r ? +i[2] : void 0, c = i[0].replace(qR, `
`).match(s);
    let f = !1;
    return { items: c.map(function(m, h) {
      const y = a.exec(m)[0].length, v = RegExp("^ {1," + y + "}", "gm"), g = m.replace(v, "").replace(a, ""), p = h === c.length - 1, $ = g.indexOf(`

`) !== -1 || p && f;
      f = $;
      const b = l.inline, w = l.list;
      let x;
      l.list = !0, $ ? (l.inline = !1, x = vn(g) + `

`) : (l.inline = !0, x = vn(g));
      const P = o(x, l);
      return l.inline = b, l.list = w, P;
    }), ordered: r, start: u };
  }, l: (i, o, l) => e(i.ordered ? "ol" : "ul", { key: l.key, start: i.type === "20" ? i.start : void 0 }, i.items.map(function(u, c) {
    return e("li", { key: c }, o(u, l));
  })) };
}
const k3 = RegExp(`^\\[((?:\\[[^\\[\\]]*(?:\\[[^\\[\\]]*\\][^\\[\\]]*)*\\]|[^\\[\\]])*)\\]\\(\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*\\)`), D3 = /^!\[(.*?)\]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/;
function md(e) {
  return typeof e == "string";
}
function vn(e) {
  let t = e.length;
  for (; t > 0 && e[t - 1] <= " "; ) t--;
  return e.slice(0, t);
}
function xs(e, t) {
  return e.startsWith(t);
}
function R3(e, t, r) {
  if (Array.isArray(r)) {
    for (let n = 0; n < r.length; n++) if (xs(e, r[n])) return !0;
    return !1;
  }
  return r(e, t);
}
function on(e) {
  return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
function M3(e) {
  return $3.test(e) ? "right" : y3.test(e) ? "center" : v3.test(e) ? "left" : null;
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
function L3(e, t, r) {
  r.inline = !0;
  const n = e[2] ? e[2].replace(g3, "").split("|").map(M3) : [], s = e[3] ? function(i, o, l) {
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
function Cr(e) {
  return e.inline = 1, e;
}
function Bt(e) {
  return Cr(function(t, r) {
    return r.inline ? e.exec(t) : null;
  });
}
function Tt(e) {
  return Cr(function(t, r) {
    return r.inline || r.simple ? e.exec(t) : null;
  });
}
function vt(e) {
  return function(t, r) {
    return r.inline || r.simple ? null : e.exec(t);
  };
}
function cs(e) {
  return Cr(function(t) {
    return e.exec(t);
  });
}
const U3 = /(javascript|vbscript|data(?!:image)):/i;
function W3(e) {
  try {
    const t = decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g, "");
    if (U3.test(t)) return null;
  } catch {
    return null;
  }
  return e;
}
function st(e) {
  return e && e.replace(E3, "$1");
}
function Ss(e, t, r) {
  const n = r.inline || !1, s = r.simple || !1;
  r.inline = !0, r.simple = !0;
  const a = e(t, r);
  return r.inline = n, r.simple = s, a;
}
function V3(e, t, r) {
  const n = r.inline || !1, s = r.simple || !1;
  r.inline = !1, r.simple = !0;
  const a = e(t, r);
  return r.inline = n, r.simple = s, a;
}
function z3(e, t, r) {
  const n = r.inline || !1;
  r.inline = !1;
  const s = e(t, r);
  return r.inline = n, s;
}
const oi = (e, t, r) => ({ children: Ss(t, e[2], r) });
function li() {
  return {};
}
function ci() {
  return null;
}
function B3(...e) {
  return e.filter(Boolean).join(" ");
}
function ui(e, t, r) {
  let n = e;
  const s = t.split(".");
  for (; s.length && (n = n[s[0]], n !== void 0); ) s.shift();
  return n || r;
}
function q3(e = "", t = {}) {
  t.overrides = t.overrides || {}, t.namedCodesToUnicode = t.namedCodesToUnicode ? Ht({}, ad, t.namedCodesToUnicode) : ad;
  const r = t.slugify || on, n = t.sanitizer || W3, s = t.createElement || G.createElement, a = [id, od, ld, t.enforceAtxHeadings ? ud : cd, dd, pd, kh, Dh], i = [...a, u3, ai, fd, ii];
  function o(p, $) {
    for (let b = 0; b < p.length; b++) if (p[b].test($)) return !0;
    return !1;
  }
  function l(p, $, ...b) {
    const w = ui(t.overrides, p + ".props", {});
    return s(function(x, P) {
      const j = ui(P, x);
      return j ? typeof j == "function" || typeof j == "object" && "render" in j ? j : ui(P, x + ".component", x) : x;
    }(p, t.overrides), Ht({}, $, w, { className: B3($ == null ? void 0 : $.className, w.className) || void 0 }), ...b);
  }
  function u(p) {
    p = p.replace(r3, "");
    let $ = !1;
    t.forceInline ? $ = !0 : t.forceBlock || ($ = h3.test(p) === !1);
    const b = v(y($ ? p : vn(p).replace(A3, "") + `

`, { inline: $ }));
    for (; md(b[b.length - 1]) && !b[b.length - 1].trim(); ) b.pop();
    if (t.wrapper === null) return b;
    const w = t.wrapper || ($ ? "span" : "div");
    let x;
    if (b.length > 1 || t.forceWrapper) x = b;
    else {
      if (b.length === 1) return x = b[0], typeof x == "string" ? l("span", { key: "outer" }, x) : x;
      x = null;
    }
    return s(w, { key: "outer" }, x);
  }
  function c(p, $) {
    if (!$ || !$.trim()) return null;
    const b = $.match(BR);
    return b ? b.reduce(function(w, x) {
      const P = x.indexOf("=");
      if (P !== -1) {
        const j = function(F) {
          return F.indexOf("-") !== -1 && F.match(a3) === null && (F = F.replace(c3, function(D, U) {
            return U.toUpperCase();
          })), F;
        }(x.slice(0, P)).trim(), N = function(F) {
          const D = F[0];
          return (D === '"' || D === "'") && F.length >= 2 && F[F.length - 1] === D ? F.slice(1, -1) : F;
        }(x.slice(P + 1).trim()), A = sd[j] || j;
        if (A === "ref") return w;
        const C = w[A] = function(F, D, U, M) {
          return D === "style" ? function(B) {
            const R = [];
            let Q = "", Z = !1, ee = !1, k = "";
            if (!B) return R;
            for (let T = 0; T < B.length; T++) {
              const O = B[T];
              if (O !== '"' && O !== "'" || Z || (ee ? O === k && (ee = !1, k = "") : (ee = !0, k = O)), O === "(" && Q.endsWith("url") ? Z = !0 : O === ")" && Z && (Z = !1), O !== ";" || ee || Z) Q += O;
              else {
                const _ = Q.trim();
                if (_) {
                  const S = _.indexOf(":");
                  if (S > 0) {
                    const I = _.slice(0, S).trim(), W = _.slice(S + 1).trim();
                    R.push([I, W]);
                  }
                }
                Q = "";
              }
            }
            const E = Q.trim();
            if (E) {
              const T = E.indexOf(":");
              if (T > 0) {
                const O = E.slice(0, T).trim(), _ = E.slice(T + 1).trim();
                R.push([O, _]);
              }
            }
            return R;
          }(U).reduce(function(B, [R, Q]) {
            return B[R.replace(/(-[a-z])/g, (Z) => Z[1].toUpperCase())] = M(Q, F, R), B;
          }, {}) : zR.indexOf(D) !== -1 ? M(st(U), F, D) : (U.match(i3) && (U = st(U.slice(1, U.length - 1))), U === "true" || U !== "false" && U);
        }(p, j, N, n);
        typeof C == "string" && (ai.test(C) || ii.test(C)) && (w[A] = u(C.trim()));
      } else x !== "style" && (w[sd[x] || x] = !0);
      return w;
    }, {}) : null;
  }
  const f = [], m = {}, h = { 0: { t: [">"], o: vt(id), i: 1, u(p, $, b) {
    const [, w, x] = p[0].replace(KR, "").match(GR);
    return { alert: w, children: $(x, b) };
  }, l(p, $, b) {
    const w = { key: b.key };
    return p.alert && (w.className = "markdown-alert-" + r(p.alert.toLowerCase(), on), p.children.unshift({ attrs: {}, children: [{ type: "27", text: p.alert }], noInnerParse: !0, type: "11", tag: "header" })), l("blockquote", w, $(p.children, b));
  } }, 1: { t: ["  "], o: cs(HR), i: 1, u: li, l: (p, $, b) => l("br", { key: b.key }) }, 2: { t: ["--", "__", "**", "- ", "* ", "_ "], o: vt(JR), i: 1, u: li, l: (p, $, b) => l("hr", { key: b.key }) }, 3: { t: ["    "], o: vt(ld), i: 0, u: (p) => ({ lang: void 0, text: st(vn(p[0].replace(/^ {4}/gm, ""))) }), l: (p, $, b) => l("pre", { key: b.key }, l("code", Ht({}, p.attrs, { className: p.lang ? "lang-" + p.lang : "" }), p.text)) }, 4: { t: ["```", "~~~"], o: vt(od), i: 0, u: (p) => ({ attrs: c("code", p[3] || ""), lang: p[2] || void 0, text: p[4], type: "3" }) }, 5: { t: ["`"], o: Tt(YR), i: 3, u: (p) => ({ text: st(p[2]) }), l: (p, $, b) => l("code", { key: b.key }, p.text) }, 6: { t: ["[^"], o: vt(QR), i: 0, u: (p) => (f.push({ footnote: p[2], identifier: p[1] }), {}), l: ci }, 7: { t: ["[^"], o: Bt(e3), i: 1, u: (p) => ({ target: "#" + r(p[1], on), text: p[1] }), l: (p, $, b) => l("a", { key: b.key, href: n(p.target, "a", "href") }, l("sup", { key: b.key }, p.text)) }, 8: { t: ["[ ]", "[x]"], o: Bt(n3), i: 1, u: (p) => ({ completed: p[1].toLowerCase() === "x" }), l: (p, $, b) => l("input", { checked: p.completed, key: b.key, readOnly: !0, type: "checkbox" }) }, 9: { t: ["#"], o: vt(t.enforceAtxHeadings ? ud : cd), i: 1, u: (p, $, b) => ({ children: Ss($, p[2], b), id: r(p[2], on), level: p[1].length }), l: (p, $, b) => l("h" + p.level, { id: p.id, key: b.key }, $(p.children, b)) }, 10: { t: (p) => {
    const $ = p.indexOf(`
`);
    return $ > 0 && $ < p.length - 1 && (p[$ + 1] === "=" || p[$ + 1] === "-");
  }, o: vt(dd), i: 1, u: (p, $, b) => ({ children: Ss($, p[1], b), level: p[2] === "=" ? 1 : 2, type: "9" }) }, 11: { t: ["<"], o: cs(ai), i: 1, u(p, $, b) {
    const [, w] = p[3].match(N3), x = RegExp("^" + w, "gm"), P = p[3].replace(x, ""), j = o(i, P) ? z3 : Ss, N = p[1].toLowerCase(), A = VR.indexOf(N) !== -1, C = (A ? N : p[1]).trim(), F = { attrs: c(C, p[2]), noInnerParse: A, tag: C };
    if (b.inAnchor = b.inAnchor || N === "a", A) F.text = p[3];
    else {
      const D = b.inHTML;
      b.inHTML = !0, F.children = j($, P, b), b.inHTML = D;
    }
    return b.inAnchor = !1, F;
  }, l: (p, $, b) => l(p.tag, Ht({ key: b.key }, p.attrs), p.text || (p.children ? $(p.children, b) : "")) }, 13: { t: ["<"], o: cs(ii), i: 1, u(p) {
    const $ = p[1].trim();
    return { attrs: c($, p[2] || ""), tag: $ };
  }, l: (p, $, b) => l(p.tag, Ht({}, p.attrs, { key: b.key })) }, 12: { t: ["<!--"], o: cs(fd), i: 1, u: () => ({}), l: ci }, 14: { t: ["!["], o: Tt(D3), i: 1, u: (p) => ({ alt: st(p[1]), target: st(p[2]), title: st(p[3]) }), l: (p, $, b) => l("img", { key: b.key, alt: p.alt || void 0, title: p.title || void 0, src: n(p.target, "img", "src") }) }, 15: { t: ["["], o: Bt(k3), i: 3, u: (p, $, b) => ({ children: V3($, p[1], b), target: st(p[2]), title: st(p[3]) }), l: (p, $, b) => l("a", { key: b.key, href: n(p.target, "a", "href"), title: p.title }, $(p.children, b)) }, 16: { t: ["<"], o: Bt(l3), i: 0, u(p) {
    let $ = p[1], b = !1;
    return $.indexOf("@") !== -1 && $.indexOf("//") === -1 && (b = !0, $ = $.replace("mailto:", "")), { children: [{ text: $, type: "27" }], target: b ? "mailto:" + $ : $, type: "15" };
  } }, 17: { t: (p, $) => !$.inAnchor && !t.disableAutoLink && (xs(p, "http://") || xs(p, "https://")), o: Bt(o3), i: 0, u: (p) => ({ children: [{ text: p[1], type: "27" }], target: p[1], title: void 0, type: "15" }) }, 20: hd(l, 1), 33: hd(l, 2), 19: { t: [`
`], o: vt(ZR), i: 3, u: li, l: () => `
` }, 21: { o: Cr(function(p, $) {
    if ($.inline || $.simple || $.inHTML && p.indexOf(`

`) === -1 && $.prevCapture.indexOf(`

`) === -1) return null;
    let b = "", w = 0;
    for (; ; ) {
      const P = p.indexOf(`
`, w), j = p.slice(w, P === -1 ? void 0 : P + 1);
      if (o(a, j) || (b += j, P === -1 || !j.trim())) break;
      w = P + 1;
    }
    const x = vn(b);
    return x === "" ? null : [b, , x];
  }), i: 3, u: oi, l: (p, $, b) => l("p", { key: b.key }, $(p.children, b)) }, 22: { t: ["["], o: Bt(d3), i: 0, u: (p) => (m[p[1]] = { target: p[2], title: p[4] }, {}), l: ci }, 23: { t: ["!["], o: Tt(f3), i: 0, u: (p) => ({ alt: p[1] ? st(p[1]) : void 0, ref: p[2] }), l: (p, $, b) => m[p.ref] ? l("img", { key: b.key, alt: p.alt, src: n(m[p.ref].target, "img", "src"), title: m[p.ref].title }) : null }, 24: { t: (p) => p[0] === "[" && p.indexOf("](") === -1, o: Bt(p3), i: 0, u: (p, $, b) => ({ children: $(p[1], b), fallbackChildren: p[0], ref: p[2] }), l: (p, $, b) => m[p.ref] ? l("a", { key: b.key, href: n(m[p.ref].target, "a", "href"), title: m[p.ref].title }, $(p.children, b)) : l("span", { key: b.key }, p.fallbackChildren) }, 25: { t: ["|"], o: vt(pd), i: 1, u: L3, l(p, $, b) {
    const w = p;
    return l("table", { key: b.key }, l("thead", null, l("tr", null, w.header.map(function(x, P) {
      return l("th", { key: P, style: yd(w, P) }, $(x, b));
    }))), l("tbody", null, w.cells.map(function(x, P) {
      return l("tr", { key: P }, x.map(function(j, N) {
        return l("td", { key: N, style: yd(w, N) }, $(j, b));
      }));
    })));
  } }, 27: { o: Cr(function(p, $) {
    let b;
    return xs(p, ":") && (b = S3.exec(p)), b || O3.exec(p);
  }), i: 4, u(p) {
    const $ = p[0];
    return { text: $.indexOf("&") === -1 ? $ : $.replace(s3, (b, w) => t.namedCodesToUnicode[w] || b) };
  }, l: (p) => p.text }, 28: { t: ["**", "__"], o: Tt(b3), i: 2, u: (p, $, b) => ({ children: $(p[2], b) }), l: (p, $, b) => l("strong", { key: b.key }, $(p.children, b)) }, 29: { t: (p) => {
    const $ = p[0];
    return ($ === "*" || $ === "_") && p[1] !== $;
  }, o: Tt(_3), i: 3, u: (p, $, b) => ({ children: $(p[2], b) }), l: (p, $, b) => l("em", { key: b.key }, $(p.children, b)) }, 30: { t: ["\\"], o: Tt(j3), i: 1, u: (p) => ({ text: p[1], type: "27" }) }, 31: { t: ["=="], o: Tt(w3), i: 3, u: oi, l: (p, $, b) => l("mark", { key: b.key }, $(p.children, b)) }, 32: { t: ["~~"], o: Tt(x3), i: 3, u: oi, l: (p, $, b) => l("del", { key: b.key }, $(p.children, b)) } };
  t.disableParsingRawHTML === !0 && (delete h[11], delete h[13]);
  const y = function(p) {
    var $ = Object.keys(p);
    function b(w, x) {
      var P = [];
      if (x.prevCapture = x.prevCapture || "", w.trim()) for (; w; ) for (var j = 0; j < $.length; ) {
        var N = $[j], A = p[N];
        if (!A.t || R3(w, x, A.t)) {
          var C = A.o(w, x);
          if (C && C[0]) {
            w = w.substring(C[0].length);
            var F = A.u(C, b, x);
            x.prevCapture += C[0], F.type || (F.type = N), P.push(F);
            break;
          }
          j++;
        } else j++;
      }
      return x.prevCapture = "", P;
    }
    return $.sort(function(w, x) {
      return p[w].i - p[x].i || (w < x ? -1 : 1);
    }), function(w, x) {
      return b(function(P) {
        return P.replace(XR, `
`).replace(t3, "").replace(m3, "    ");
      }(w), x);
    };
  }(h), v = /* @__PURE__ */ function(p, $) {
    return function b(w, x = {}) {
      if (Array.isArray(w)) {
        const P = x.key, j = [];
        let N = !1;
        for (let A = 0; A < w.length; A++) {
          x.key = A;
          const C = b(w[A], x), F = md(C);
          F && N ? j[j.length - 1] += C : C !== null && j.push(C), N = F;
        }
        return x.key = P, j;
      }
      return function(P, j, N) {
        const A = p[P.type].l;
        return $ ? $(() => A(P, j, N), P, j, N) : A(P, j, N);
      }(w, b, x);
    };
  }(h, t.renderRule), g = u(e);
  return f.length ? l("div", null, g, l("footer", { key: "footer" }, f.map(function(p) {
    return l("div", { id: r(p.identifier, on), key: p.identifier }, p.identifier, v(y(p.footnote, { inline: !0 })));
  }))) : g;
}
const ka = (e) => {
  let { children: t, options: r } = e, n = function(s, a) {
    if (s == null) return {};
    var i, o, l = {}, u = Object.keys(s);
    for (o = 0; o < u.length; o++) a.indexOf(i = u[o]) >= 0 || (l[i] = s[i]);
    return l;
  }(e, WR);
  return G.cloneElement(q3(t ?? "", r), n);
};
function K3(e, t) {
  return e == null ? !0 : Nf(e, t);
}
class G3 extends Fn {
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
    ue(this, "onDropPropertyClick", (r) => (n) => {
      n.preventDefault();
      const { onChange: s, formData: a } = this.props, i = { ...a };
      K3(i, r), s(i);
    });
    /** Computes the next available key name from the `preferredKey`, indexing through the already existing keys until one
     * that is already not assigned is found.
     *
     * @param preferredKey - The preferred name of a new key
     * @param [formData] - The form data in which to check if the desired key already exists
     * @returns - The name of the next available key from `preferredKey`
     */
    ue(this, "getAvailableKey", (r, n) => {
      const { uiSchema: s, registry: a } = this.props, { duplicateKeySuffixSeparator: i = "-" } = se(s, a.globalUiOptions);
      let o = 0, l = r;
      for (; Fe(n, l); )
        l = `${r}${i}${++o}`;
      return l;
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
    ue(this, "handleAddClick", (r) => () => {
      if (!r.additionalProperties)
        return;
      const { formData: n, onChange: s, registry: a } = this.props, i = { ...n };
      let o, l, u;
      if (ge(r.additionalProperties)) {
        o = r.additionalProperties.type, l = r.additionalProperties.const, u = r.additionalProperties.default;
        let m = r.additionalProperties;
        if (Ee in m) {
          const { schemaUtils: h } = a;
          m = h.retrieveSchema({ $ref: m[Ee] }, n), o = m.type, l = m.const, u = m.default;
        }
        !o && (et in m || Ue in m) && (o = "object");
      }
      const c = this.getAvailableKey("newKey", i), f = l ?? u ?? this.getDefaultValue(o);
      Pe(i, c, f), s(i);
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
    const { schema: r, uiSchema: n = {}, formData: s, errorSchema: a, idSchema: i, name: o, required: l = !1, disabled: u, readonly: c, hideError: f, idPrefix: m, idSeparator: h, onBlur: y, onFocus: v, registry: g, title: p } = this.props, { fields: $, formContext: b, schemaUtils: w, translateString: x, globalUiOptions: P } = g, { SchemaField: j } = $, N = w.retrieveSchema(r, s), A = se(n, P), { properties: C = {} } = N, F = A.title ?? N.title ?? p ?? o, D = A.description ?? N.description;
    let U;
    try {
      const R = Object.keys(C);
      U = _R(R, A.order);
    } catch (R) {
      return d.jsxs("div", { children: [d.jsx("p", { className: "config-error", style: { color: "red" }, children: d.jsx(ka, { options: { disableParsingRawHTML: !0 }, children: x(pe.InvalidObjectField, [o || "root", R.message]) }) }), d.jsx("pre", { children: JSON.stringify(N) })] });
    }
    const M = oe("ObjectFieldTemplate", g, A), B = {
      // getDisplayLabel() always returns false for object types, so just check the `uiOptions.label`
      title: A.label === !1 ? "" : F,
      description: A.label === !1 ? void 0 : D,
      properties: U.map((R) => {
        const Q = Fe(N, [xe, R, Mn]), Z = Q ? n.additionalProperties : n[R], ee = se(Z).widget === "hidden", k = z(i, [R], {});
        return {
          content: d.jsx(j, { name: R, required: this.isRequired(R), schema: z(N, [xe, R], {}), uiSchema: Z, errorSchema: z(a, R), idSchema: k, idPrefix: m, idSeparator: h, formData: z(s, R), formContext: b, wasPropertyKeyModified: this.state.wasPropertyKeyModified, onKeyChange: this.onKeyChange(R), onChange: this.onPropertyChange(R, Q), onBlur: y, onFocus: v, registry: g, disabled: u, readonly: c, hideError: f, onDropPropertyClick: this.onDropPropertyClick }, R),
          name: R,
          readonly: c,
          disabled: u,
          required: l,
          hidden: ee
        };
      }),
      readonly: c,
      disabled: u,
      required: l,
      idSchema: i,
      uiSchema: n,
      errorSchema: a,
      schema: N,
      formData: s,
      formContext: b,
      registry: g
    };
    return d.jsx(M, { ...B, onAddClick: this.handleAddClick });
  }
}
const H3 = {
  array: "ArrayField",
  boolean: "BooleanField",
  integer: "NumberField",
  number: "NumberField",
  object: "ObjectField",
  string: "StringField",
  null: "NullField"
};
function J3(e, t, r, n) {
  const s = t.field, { fields: a, translateString: i } = n;
  if (typeof s == "function")
    return s;
  if (typeof s == "string" && s in a)
    return a[s];
  const o = St(e), l = Array.isArray(o) ? o[0] : o || "", u = e.$id;
  let c = H3[l];
  return u && u in a && (c = u), !c && (e.anyOf || e.oneOf) ? () => null : c in a ? a[c] : () => {
    const f = oe("UnsupportedFieldTemplate", n, t);
    return d.jsx(f, { schema: e, idSchema: r, reason: i(pe.UnknownFieldType, [String(e.type)]), registry: n });
  };
}
function Y3(e) {
  const { schema: t, idSchema: r, uiSchema: n, formData: s, errorSchema: a, idPrefix: i, idSeparator: o, name: l, onChange: u, onKeyChange: c, onDropPropertyClick: f, required: m, registry: h, wasPropertyKeyModified: y = !1 } = e, { formContext: v, schemaUtils: g, globalUiOptions: p } = h, $ = se(n, p), b = oe("FieldTemplate", h, $), w = oe("DescriptionFieldTemplate", h, $), x = oe("FieldHelpTemplate", h, $), P = oe("FieldErrorTemplate", h, $), j = g.retrieveSchema(t, s), N = r[Dt], A = $t(g.toIdSchema(j, N, s, i, o), r), C = te((ke, Vt, zt) => u(ke, Vt, zt || N), [N, u]), F = J3(j, $, A, h), D = !!($.disabled ?? e.disabled), U = !!($.readonly ?? (e.readonly || e.schema.readOnly || j.readOnly)), M = $.hideError, B = M === void 0 ? e.hideError : !!M, R = !!($.autofocus ?? e.autofocus);
  if (Object.keys(j).length === 0)
    return null;
  const Q = g.getDisplayLabel(j, n, p), { __errors: Z, ...ee } = a || {}, k = Fs(n, ["ui:classNames", "classNames", "ui:style"]);
  hn in k && (k[hn] = Fs(k[hn], ["classNames", "style"]));
  const E = d.jsx(F, { ...e, onChange: C, idSchema: A, schema: j, uiSchema: k, disabled: D, readonly: U, hideError: B, autofocus: R, errorSchema: ee, formContext: v, rawErrors: Z }), T = A[Dt];
  let O;
  y ? O = l : O = Mn in j ? l : $.title || e.schema.title || j.title || e.title || l;
  const _ = $.description || e.schema.description || j.description || "", S = $.enableMarkdownInDescription ? d.jsx(ka, { options: { disableParsingRawHTML: !0 }, children: _ }) : _, I = $.help, W = $.widget === "hidden", V = ["form-group", "field", `field-${St(j)}`];
  !B && Z && Z.length > 0 && V.push("field-error has-error has-danger"), n != null && n.classNames && V.push(n.classNames), $.classNames && V.push($.classNames);
  const ne = d.jsx(x, { help: I, idSchema: A, schema: j, uiSchema: n, hasErrors: !B && Z && Z.length > 0, registry: h }), re = B || (j.anyOf || j.oneOf) && !g.isSelect(j) ? void 0 : d.jsx(P, { errors: Z, errorSchema: a, idSchema: A, schema: j, uiSchema: n, registry: h }), we = {
    description: d.jsx(w, { id: Yn(T), description: S, schema: j, uiSchema: n, registry: h }),
    rawDescription: _,
    help: ne,
    rawHelp: typeof I == "string" ? I : void 0,
    errors: re,
    rawErrors: B ? void 0 : Z,
    id: T,
    label: O,
    hidden: W,
    onChange: u,
    onKeyChange: c,
    onDropPropertyClick: f,
    required: m,
    disabled: D,
    readonly: U,
    hideError: B,
    displayLabel: Q,
    classNames: V.join(" ").trim(),
    style: $.style,
    formContext: v,
    formData: s,
    schema: j,
    uiSchema: n,
    registry: h
  }, Je = h.fields.AnyOfField, Wt = h.fields.OneOfField, Pt = (n == null ? void 0 : n["ui:field"]) && (n == null ? void 0 : n["ui:fieldReplacesAnyOrOneOf"]) === !0;
  return d.jsx(b, { ...we, children: d.jsxs(d.Fragment, { children: [E, j.anyOf && !Pt && !g.isSelect(j) && d.jsx(Je, { name: l, disabled: D, readonly: U, hideError: B, errorSchema: a, formData: s, formContext: v, idPrefix: i, idSchema: A, idSeparator: o, onBlur: e.onBlur, onChange: e.onChange, onFocus: e.onFocus, options: j.anyOf.map((ke) => g.retrieveSchema(ge(ke) ? ke : {}, s)), registry: h, required: m, schema: j, uiSchema: n }), j.oneOf && !Pt && !g.isSelect(j) && d.jsx(Wt, { name: l, disabled: D, readonly: U, hideError: B, errorSchema: a, formData: s, formContext: v, idPrefix: i, idSchema: A, idSeparator: o, onBlur: e.onBlur, onChange: e.onChange, onFocus: e.onFocus, options: j.oneOf.map((ke) => g.retrieveSchema(ge(ke) ? ke : {}, s)), registry: h, required: m, schema: j, uiSchema: n })] }) });
}
class Z3 extends Fn {
  shouldComponentUpdate(t) {
    return !be(this.props, t);
  }
  render() {
    return d.jsx(Y3, { ...this.props });
  }
}
function X3(e) {
  const { schema: t, name: r, uiSchema: n, idSchema: s, formData: a, required: i, disabled: o = !1, readonly: l = !1, autofocus: u = !1, onChange: c, onBlur: f, onFocus: m, registry: h, rawErrors: y, hideError: v } = e, { title: g, format: p } = t, { widgets: $, formContext: b, schemaUtils: w, globalUiOptions: x } = h, P = w.isSelect(t) ? Pn(t, n) : void 0;
  let j = P ? "select" : "text";
  p && vR(t, p, $) && (j = p);
  const { widget: N = j, placeholder: A = "", title: C, ...F } = se(n), D = w.getDisplayLabel(t, n, x), U = C ?? g ?? r, M = bt(t, N, $);
  return d.jsx(M, { options: { ...F, enumOptions: P }, schema: t, uiSchema: n, id: s.$id, name: r, label: U, hideLabel: !D, hideError: v, value: a, onChange: c, onBlur: f, onFocus: m, required: i, disabled: o, readonly: l, formContext: b, autofocus: u, registry: h, placeholder: A, rawErrors: y });
}
function Q3(e) {
  const { formData: t, onChange: r } = e;
  return Xe(() => {
    t === void 0 && r(null);
  }, [t, r]), null;
}
function eM() {
  return {
    AnyOfField: nd,
    ArrayField: DR,
    // ArrayField falls back to SchemaField if ArraySchemaField is not defined, which it isn't by default
    BooleanField: RR,
    NumberField: UR,
    ObjectField: G3,
    OneOfField: nd,
    SchemaField: Z3,
    StringField: X3,
    NullField: Q3
  };
}
function tM(e) {
  const { idSchema: t, description: r, registry: n, schema: s, uiSchema: a } = e, i = se(a, n.globalUiOptions), { label: o = !0 } = i;
  if (!r || !o)
    return null;
  const l = oe("DescriptionFieldTemplate", n, i);
  return d.jsx(l, { id: Yn(t), description: r, schema: s, uiSchema: a, registry: n });
}
function rM(e) {
  const { children: t, className: r, disabled: n, hasToolbar: s, hasMoveDown: a, hasMoveUp: i, hasRemove: o, hasCopy: l, index: u, onCopyIndexClick: c, onDropIndexClick: f, onReorderClick: m, readonly: h, registry: y, uiSchema: v } = e, { CopyButton: g, MoveDownButton: p, MoveUpButton: $, RemoveButton: b } = y.templates.ButtonTemplates, w = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: "bold"
  };
  return d.jsxs("div", { className: r, children: [d.jsx("div", { className: s ? "col-xs-9" : "col-xs-12", children: t }), s && d.jsx("div", { className: "col-xs-3 array-item-toolbox", children: d.jsxs("div", { className: "btn-group", style: {
    display: "flex",
    justifyContent: "space-around"
  }, children: [(i || a) && d.jsx($, { style: w, disabled: n || h || !i, onClick: m(u, u - 1), uiSchema: v, registry: y }), (i || a) && d.jsx(p, { style: w, disabled: n || h || !a, onClick: m(u, u + 1), uiSchema: v, registry: y }), l && d.jsx(g, { style: w, disabled: n || h, onClick: c(u), uiSchema: v, registry: y }), o && d.jsx(b, { style: w, disabled: n || h, onClick: f(u), uiSchema: v, registry: y })] }) })] });
}
function nM(e) {
  const { canAdd: t, className: r, disabled: n, idSchema: s, uiSchema: a, items: i, onAddClick: o, readonly: l, registry: u, required: c, schema: f, title: m } = e, h = se(a), y = oe("ArrayFieldDescriptionTemplate", u, h), v = oe("ArrayFieldItemTemplate", u, h), g = oe("ArrayFieldTitleTemplate", u, h), { ButtonTemplates: { AddButton: p } } = u.templates;
  return d.jsxs("fieldset", { className: r, id: s.$id, children: [d.jsx(g, { idSchema: s, title: h.title || m, required: c, schema: f, uiSchema: a, registry: u }), d.jsx(y, { idSchema: s, description: h.description || f.description, schema: f, uiSchema: a, registry: u }), d.jsx("div", { className: "row array-item-list", children: i && i.map(({ key: $, ...b }) => d.jsx(v, { ...b }, $)) }), t && d.jsx(p, { className: "array-item-add", onClick: o, disabled: n || l, uiSchema: a, registry: u })] });
}
function sM(e) {
  const { idSchema: t, title: r, schema: n, uiSchema: s, required: a, registry: i } = e, o = se(s, i.globalUiOptions), { label: l = !0 } = o;
  if (!r || !l)
    return null;
  const u = oe("TitleFieldTemplate", i, o);
  return d.jsx(u, { id: jh(t), title: r, required: a, schema: n, uiSchema: s, registry: i });
}
function aM(e) {
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
    formContext: y,
    registry: v,
    rawErrors: g,
    type: p,
    hideLabel: $,
    // remove this from ...rest
    hideError: b,
    // remove this from ...rest
    ...w
  } = e;
  if (!t)
    throw console.log("No id for", e), new Error(`no id for props ${JSON.stringify(e)}`);
  const x = {
    ...w,
    ...uR(m, p, f)
  };
  let P;
  x.type === "number" || x.type === "integer" ? P = n || n === 0 ? n : "" : P = n ?? "";
  const j = te(({ target: { value: C } }) => u(C === "" ? f.emptyValue : C), [u, f]), N = te(({ target: C }) => o(t, C && C.value), [o, t]), A = te(({ target: C }) => l(t, C && C.value), [l, t]);
  return d.jsxs(d.Fragment, { children: [d.jsx("input", { id: t, name: t, className: "form-control", readOnly: s, disabled: a, autoFocus: i, value: P, ...x, list: m.examples ? Mi(t) : void 0, onChange: c || j, onBlur: N, onFocus: A, "aria-describedby": fr(t, !!m.examples) }), Array.isArray(m.examples) && d.jsx("datalist", { id: Mi(t), children: m.examples.concat(m.default && !m.examples.includes(m.default) ? [m.default] : []).map((C) => d.jsx("option", { value: C }, C)) }, `datalist_${t}`)] });
}
function iM({ uiSchema: e }) {
  const { submitText: t, norender: r, props: n = {} } = dR(e);
  return r ? null : d.jsx("div", { children: d.jsx("button", { type: "submit", ...n, className: `btn btn-info ${n.className || ""}`, children: t }) });
}
function Zn(e) {
  const { iconType: t = "default", icon: r, className: n, uiSchema: s, registry: a, ...i } = e;
  return d.jsx("button", { type: "button", className: `btn btn-${t} ${n}`, ...i, children: d.jsx("i", { className: `glyphicon glyphicon-${r}` }) });
}
function oM(e) {
  const { registry: { translateString: t } } = e;
  return d.jsx(Zn, { title: t(pe.CopyButton), className: "array-item-copy", ...e, icon: "copy" });
}
function lM(e) {
  const { registry: { translateString: t } } = e;
  return d.jsx(Zn, { title: t(pe.MoveDownButton), className: "array-item-move-down", ...e, icon: "arrow-down" });
}
function cM(e) {
  const { registry: { translateString: t } } = e;
  return d.jsx(Zn, { title: t(pe.MoveUpButton), className: "array-item-move-up", ...e, icon: "arrow-up" });
}
function uM(e) {
  const { registry: { translateString: t } } = e;
  return d.jsx(Zn, { title: t(pe.RemoveButton), className: "array-item-remove", ...e, iconType: "danger", icon: "remove" });
}
function dM({ className: e, onClick: t, disabled: r, registry: n }) {
  const { translateString: s } = n;
  return d.jsx("div", { className: "row", children: d.jsx("p", { className: `col-xs-3 col-xs-offset-9 text-right ${e}`, children: d.jsx(Zn, { iconType: "info", icon: "plus", className: "btn-add col-xs-12", title: s(pe.AddButton), onClick: t, disabled: r, registry: n }) }) });
}
function fM() {
  return {
    SubmitButton: iM,
    AddButton: dM,
    CopyButton: oM,
    MoveDownButton: lM,
    MoveUpButton: cM,
    RemoveButton: uM
  };
}
function pM(e) {
  const { id: t, description: r } = e;
  return r ? typeof r == "string" ? d.jsx("p", { id: t, className: "field-description", children: r }) : d.jsx("div", { id: t, className: "field-description", children: r }) : null;
}
function hM({ errors: e, registry: t }) {
  const { translateString: r } = t;
  return d.jsxs("div", { className: "panel panel-danger errors", children: [d.jsx("div", { className: "panel-heading", children: d.jsx("h3", { className: "panel-title", children: r(pe.ErrorsLabel) }) }), d.jsx("ul", { className: "list-group", children: e.map((n, s) => d.jsx("li", { className: "list-group-item text-danger", children: n.stack }, s)) })] });
}
const mM = "*";
function Rh(e) {
  const { label: t, required: r, id: n } = e;
  return t ? d.jsxs("label", { className: "control-label", htmlFor: n, children: [t, r && d.jsx("span", { className: "required", children: mM })] }) : null;
}
function gM(e) {
  const { id: t, label: r, children: n, errors: s, help: a, description: i, hidden: o, required: l, displayLabel: u, registry: c, uiSchema: f } = e, m = se(f), h = oe("WrapIfAdditionalTemplate", c, m);
  return o ? d.jsx("div", { className: "hidden", children: n }) : d.jsxs(h, { ...e, children: [u && d.jsx(Rh, { label: r, required: l, id: t }), u && i ? i : null, n, s, a] });
}
function yM(e) {
  const { errors: t = [], idSchema: r } = e;
  if (t.length === 0)
    return null;
  const n = xh(r);
  return d.jsx("div", { children: d.jsx("ul", { id: n, className: "error-detail bs-callout bs-callout-info", children: t.filter((s) => !!s).map((s, a) => d.jsx("li", { className: "text-danger", children: s }, a)) }) });
}
function vM(e) {
  const { idSchema: t, help: r } = e;
  if (!r)
    return null;
  const n = Sh(t);
  return typeof r == "string" ? d.jsx("p", { id: n, className: "help-block", children: r }) : d.jsx("div", { id: n, className: "help-block", children: r });
}
function $M(e) {
  const { description: t, disabled: r, formData: n, idSchema: s, onAddClick: a, properties: i, readonly: o, registry: l, required: u, schema: c, title: f, uiSchema: m } = e, h = se(m), y = oe("TitleFieldTemplate", l, h), v = oe("DescriptionFieldTemplate", l, h), { ButtonTemplates: { AddButton: g } } = l.templates;
  return d.jsxs("fieldset", { id: s.$id, children: [f && d.jsx(y, { id: jh(s), title: f, required: u, schema: c, uiSchema: m, registry: l }), t && d.jsx(v, { id: Yn(s), description: t, schema: c, uiSchema: m, registry: l }), i.map((p) => p.content), ey(c, m, n) && d.jsx(g, { className: "object-property-expand", onClick: a(c), disabled: r || o, uiSchema: m, registry: l })] });
}
const bM = "*";
function _M(e) {
  const { id: t, title: r, required: n } = e;
  return d.jsxs("legend", { id: t, children: [r, n && d.jsx("span", { className: "required", children: bM })] });
}
function wM(e) {
  const { schema: t, idSchema: r, reason: n, registry: s } = e, { translateString: a } = s;
  let i = pe.UnsupportedField;
  const o = [];
  return r && r.$id && (i = pe.UnsupportedFieldWithId, o.push(r.$id)), n && (i = i === pe.UnsupportedField ? pe.UnsupportedFieldWithReason : pe.UnsupportedFieldWithIdAndReason, o.push(n)), d.jsxs("div", { className: "unsupported-field", children: [d.jsx("p", { children: d.jsx(ka, { options: { disableParsingRawHTML: !0 }, children: a(i, o) }) }), t && d.jsx("pre", { children: JSON.stringify(t, null, 2) })] });
}
function xM(e) {
  const { id: t, classNames: r, style: n, disabled: s, label: a, onKeyChange: i, onDropPropertyClick: o, readonly: l, required: u, schema: c, children: f, uiSchema: m, registry: h } = e, { templates: y, translateString: v } = h, { RemoveButton: g } = y.ButtonTemplates, p = v(pe.KeyLabel, [a]);
  return Mn in c ? d.jsx("div", { className: r, style: n, children: d.jsxs("div", { className: "row", children: [d.jsx("div", { className: "col-xs-5 form-additional", children: d.jsxs("div", { className: "form-group", children: [d.jsx(Rh, { label: p, required: u, id: `${t}-key` }), d.jsx("input", { className: "form-control", type: "text", id: `${t}-key`, onBlur: ({ target: b }) => i(b && b.value), defaultValue: a })] }) }), d.jsx("div", { className: "form-additional form-group col-xs-5", children: f }), d.jsx("div", { className: "col-xs-2", children: d.jsx(g, { className: "array-item-remove btn-block", style: { border: "0" }, disabled: s || l, onClick: o(a), uiSchema: m, registry: h }) })] }) }) : d.jsx("div", { className: r, style: n, children: f });
}
function SM() {
  return {
    ArrayFieldDescriptionTemplate: tM,
    ArrayFieldItemTemplate: rM,
    ArrayFieldTemplate: nM,
    ArrayFieldTitleTemplate: sM,
    ButtonTemplates: fM(),
    BaseInputTemplate: aM,
    DescriptionFieldTemplate: pM,
    ErrorListTemplate: hM,
    FieldTemplate: gM,
    FieldErrorTemplate: yM,
    FieldHelpTemplate: vM,
    ObjectFieldTemplate: $M,
    TitleFieldTemplate: _M,
    UnsupportedFieldTemplate: wM,
    WrapIfAdditionalTemplate: xM
  };
}
function jM(e) {
  return Object.values(e).every((t) => t !== -1);
}
function EM({ type: e, range: t, value: r, select: n, rootId: s, name: a, disabled: i, readonly: o, autofocus: l, registry: u, onBlur: c, onFocus: f }) {
  const m = s + "_" + e, { SelectWidget: h } = u.widgets;
  return d.jsx(h, { schema: { type: "integer" }, id: m, name: a, className: "form-control", options: { enumOptions: $h(t[0], t[1]) }, placeholder: e, value: r, disabled: i, readonly: o, autofocus: l, onChange: (y) => n(e, y), onBlur: c, onFocus: f, registry: u, label: "", "aria-describedby": fr(s) });
}
function OM({ time: e = !1, disabled: t = !1, readonly: r = !1, autofocus: n = !1, options: s, id: a, name: i, registry: o, onBlur: l, onFocus: u, onChange: c, value: f }) {
  const { translateString: m } = o, [h, y] = de(f), [v, g] = Hm((w, x) => ({ ...w, ...x }), si(f, e));
  Xe(() => {
    const w = ed(v, e);
    jM(v) && w !== f ? c(w) : h !== f && (y(f), g(si(f, e)));
  }, [e, f, c, v, h]);
  const p = te((w, x) => {
    g({ [w]: x });
  }, []), $ = te((w) => {
    if (w.preventDefault(), t || r)
      return;
    const x = si((/* @__PURE__ */ new Date()).toJSON(), e);
    c(ed(x, e));
  }, [t, r, e]), b = te((w) => {
    w.preventDefault(), !(t || r) && c(void 0);
  }, [t, r, c]);
  return d.jsxs("ul", { className: "list-inline", children: [lR(v, e, s.yearsRange, s.format).map((w, x) => d.jsx("li", { className: "list-inline-item", children: d.jsx(EM, { rootId: a, name: i, select: p, ...w, disabled: t, readonly: r, registry: o, onBlur: l, onFocus: u, autofocus: n && x === 0 }) }, x)), (s.hideNowButton !== "undefined" ? !s.hideNowButton : !0) && d.jsx("li", { className: "list-inline-item", children: d.jsx("a", { href: "#", className: "btn btn-info btn-now", onClick: $, children: m(pe.NowLabel) }) }), (s.hideClearButton !== "undefined" ? !s.hideClearButton : !0) && d.jsx("li", { className: "list-inline-item", children: d.jsx("a", { href: "#", className: "btn btn-warning btn-clear", onClick: b, children: m(pe.ClearLabel) }) })] });
}
function AM({ time: e = !0, ...t }) {
  const { AltDateWidget: r } = t.registry.widgets;
  return d.jsx(r, { time: e, ...t });
}
function NM({ schema: e, uiSchema: t, options: r, id: n, value: s, disabled: a, readonly: i, label: o, hideLabel: l, autofocus: u = !1, onBlur: c, onFocus: f, onChange: m, registry: h }) {
  const y = oe("DescriptionFieldTemplate", h, r), v = _s(e), g = te((w) => m(w.target.checked), [m]), p = te((w) => c(n, w.target.checked), [c, n]), $ = te((w) => f(n, w.target.checked), [f, n]), b = r.description ?? e.description;
  return d.jsxs("div", { className: `checkbox ${a || i ? "disabled" : ""}`, children: [!l && !!b && d.jsx(y, { id: Yn(n), description: b, schema: e, uiSchema: t, registry: h }), d.jsxs("label", { children: [d.jsx("input", { type: "checkbox", id: n, name: n, checked: typeof s > "u" ? !1 : s, required: v, disabled: a || i, autoFocus: u, onChange: g, onBlur: p, onFocus: $, "aria-describedby": fr(n) }), $R(d.jsx("span", { children: o }), l)] })] });
}
function PM({ id: e, disabled: t, options: { inline: r = !1, enumOptions: n, enumDisabled: s, emptyValue: a }, value: i, autofocus: o = !1, readonly: l, onChange: u, onBlur: c, onFocus: f }) {
  const m = Array.isArray(i) ? i : [i], h = te(({ target: v }) => c(e, ut(v && v.value, n, a)), [c, e]), y = te(({ target: v }) => f(e, ut(v && v.value, n, a)), [f, e]);
  return d.jsx("div", { className: "checkboxes", id: e, children: Array.isArray(n) && n.map((v, g) => {
    const p = tl(v.value, m), $ = Array.isArray(s) && s.indexOf(v.value) !== -1, b = t || $ || l ? "disabled" : "", w = (P) => {
      P.target.checked ? u(nR(g, m, n)) : u(tR(g, m, n));
    }, x = d.jsxs("span", { children: [d.jsx("input", { type: "checkbox", id: Eh(e, g), name: e, checked: p, value: String(g), disabled: t || $ || l, autoFocus: o && g === 0, onChange: w, onBlur: h, onFocus: y, "aria-describedby": fr(e) }), d.jsx("span", { children: v.label })] });
    return r ? d.jsx("label", { className: `checkbox-inline ${b}`, children: x }, g) : d.jsx("div", { className: `checkbox ${b}`, children: d.jsx("label", { children: x }) }, g);
  }) });
}
function CM(e) {
  const { disabled: t, readonly: r, options: n, registry: s } = e, a = oe("BaseInputTemplate", s, n);
  return d.jsx(a, { type: "color", ...e, disabled: t || r });
}
function TM(e) {
  const { onChange: t, options: r, registry: n } = e, s = oe("BaseInputTemplate", n, r), a = te((i) => t(i || void 0), [t]);
  return d.jsx(s, { type: "date", ...e, onChange: a });
}
function IM(e) {
  const { onChange: t, value: r, options: n, registry: s } = e, a = oe("BaseInputTemplate", s, n);
  return d.jsx(a, { type: "datetime-local", ...e, value: SR(r), onChange: (i) => t(bR(i)) });
}
function FM(e) {
  const { options: t, registry: r } = e, n = oe("BaseInputTemplate", r, t);
  return d.jsx(n, { type: "email", ...e });
}
function kM(e, t) {
  return e === null ? null : e.replace(";base64", `;name=${encodeURIComponent(t)};base64`);
}
function DM(e) {
  const { name: t, size: r, type: n } = e;
  return new Promise((s, a) => {
    const i = new window.FileReader();
    i.onerror = a, i.onload = (o) => {
      var l;
      typeof ((l = o.target) == null ? void 0 : l.result) == "string" ? s({
        dataURL: kM(o.target.result, t),
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
function RM(e) {
  return Promise.all(Array.from(e).map(DM));
}
function MM({ fileInfo: e, registry: t }) {
  const { translateString: r } = t, { dataURL: n, type: s, name: a } = e;
  return n ? ["image/jpeg", "image/png"].includes(s) ? d.jsx("img", { src: n, style: { maxWidth: "100%" }, className: "file-preview" }) : d.jsxs(d.Fragment, { children: [" ", d.jsx("a", { download: `preview-${a}`, href: n, className: "file-download", children: r(pe.PreviewLabel) })] }) : null;
}
function LM({ filesInfo: e, registry: t, preview: r, onRemove: n, options: s }) {
  if (e.length === 0)
    return null;
  const { translateString: a } = t, { RemoveButton: i } = oe("ButtonTemplates", t, s);
  return d.jsx("ul", { className: "file-info", children: e.map((o, l) => {
    const { name: u, size: c, type: f } = o, m = () => n(l);
    return d.jsxs("li", { children: [d.jsx(ka, { children: a(pe.FilesInfo, [u, f, String(c)]) }), r && d.jsx(MM, { fileInfo: o, registry: t }), d.jsx(i, { onClick: m, registry: t })] }, l);
  }) });
}
function UM(e) {
  return e.reduce((t, r) => {
    if (!r)
      return t;
    try {
      const { blob: n, name: s } = XD(r);
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
function WM(e) {
  const { disabled: t, readonly: r, required: n, multiple: s, onChange: a, value: i, options: o, registry: l } = e, u = oe("BaseInputTemplate", l, o), c = te((h) => {
    h.target.files && RM(h.target.files).then((y) => {
      const v = y.map((g) => g.dataURL);
      a(s ? i.concat(v) : v[0]);
    });
  }, [s, i, a]), f = zd(() => UM(Array.isArray(i) ? i : [i]), [i]), m = te((h) => {
    if (s) {
      const y = i.filter((v, g) => g !== h);
      a(y);
    } else
      a(void 0);
  }, [s, i, a]);
  return d.jsxs("div", { children: [d.jsx(u, { ...e, disabled: t || r, type: "file", required: i ? !1 : n, onChangeOverride: c, value: "", accept: o.accept ? String(o.accept) : void 0 }), d.jsx(LM, { filesInfo: f, onRemove: m, registry: l, preview: o.filePreview, options: o })] });
}
function VM({ id: e, value: t }) {
  return d.jsx("input", { type: "hidden", id: e, name: e, value: typeof t > "u" ? "" : t });
}
function zM(e) {
  const { options: t, registry: r } = e, n = oe("BaseInputTemplate", r, t);
  return d.jsx(n, { type: "password", ...e });
}
function BM({ options: e, value: t, required: r, disabled: n, readonly: s, autofocus: a = !1, onBlur: i, onFocus: o, onChange: l, id: u }) {
  const { enumOptions: c, enumDisabled: f, inline: m, emptyValue: h } = e, y = te(({ target: g }) => i(u, ut(g && g.value, c, h)), [i, u]), v = te(({ target: g }) => o(u, ut(g && g.value, c, h)), [o, u]);
  return d.jsx("div", { className: "field-radio-group", id: u, children: Array.isArray(c) && c.map((g, p) => {
    const $ = tl(g.value, t), b = Array.isArray(f) && f.indexOf(g.value) !== -1, w = n || b || s ? "disabled" : "", x = () => l(g.value), P = d.jsxs("span", { children: [d.jsx("input", { type: "radio", id: Eh(u, p), checked: $, name: u, required: r, value: String(p), disabled: n || b || s, autoFocus: a && p === 0, onChange: x, onBlur: y, onFocus: v, "aria-describedby": fr(u) }), d.jsx("span", { children: g.label })] });
    return m ? d.jsx("label", { className: `radio-inline ${w}`, children: P }, p) : d.jsx("div", { className: `radio ${w}`, children: d.jsx("label", { children: P }) }, p);
  }) });
}
function qM(e) {
  const { value: t, registry: { templates: { BaseInputTemplate: r } } } = e;
  return d.jsxs("div", { className: "field-range-wrapper", children: [d.jsx(r, { type: "range", ...e }), d.jsx("span", { className: "range-view", children: t })] });
}
function di(e, t) {
  return t ? Array.from(e.target.options).slice().filter((r) => r.selected).map((r) => r.value) : e.target.value;
}
function KM({ schema: e, id: t, options: r, value: n, required: s, disabled: a, readonly: i, multiple: o = !1, autofocus: l = !1, onChange: u, onBlur: c, onFocus: f, placeholder: m }) {
  const { enumOptions: h, enumDisabled: y, emptyValue: v } = r, g = o ? [] : "", p = te((P) => {
    const j = di(P, o);
    return f(t, ut(j, h, v));
  }, [f, t, e, o, h, v]), $ = te((P) => {
    const j = di(P, o);
    return c(t, ut(j, h, v));
  }, [c, t, e, o, h, v]), b = te((P) => {
    const j = di(P, o);
    return u(ut(j, h, v));
  }, [u, e, o, h, v]), w = rR(n, h, o), x = !o && e.default === void 0;
  return d.jsxs("select", { id: t, name: t, multiple: o, className: "form-control", value: typeof w > "u" ? g : w, required: s, disabled: a || i, autoFocus: l, onBlur: $, onFocus: p, onChange: b, "aria-describedby": fr(t), children: [x && d.jsx("option", { value: "", children: m }), Array.isArray(h) && h.map(({ value: P, label: j }, N) => {
    const A = y && y.indexOf(P) !== -1;
    return d.jsx("option", { value: String(N), disabled: A, children: j }, N);
  })] });
}
function Mh({ id: e, options: t = {}, placeholder: r, value: n, required: s, disabled: a, readonly: i, autofocus: o = !1, onChange: l, onBlur: u, onFocus: c }) {
  const f = te(({ target: { value: y } }) => l(y === "" ? t.emptyValue : y), [l, t.emptyValue]), m = te(({ target: y }) => u(e, y && y.value), [u, e]), h = te(({ target: y }) => c(e, y && y.value), [e, c]);
  return d.jsx("textarea", { id: e, name: e, className: "form-control", value: n || "", placeholder: r, required: s, disabled: a, readOnly: i, autoFocus: o, rows: t.rows, onBlur: m, onFocus: h, onChange: f, "aria-describedby": fr(e) });
}
Mh.defaultProps = {
  autofocus: !1,
  options: {}
};
function GM(e) {
  const { options: t, registry: r } = e, n = oe("BaseInputTemplate", r, t);
  return d.jsx(n, { ...e });
}
function HM(e) {
  const { onChange: t, options: r, registry: n } = e, s = oe("BaseInputTemplate", n, r), a = te((i) => t(i ? `${i}:00` : void 0), [t]);
  return d.jsx(s, { type: "time", ...e, onChange: a });
}
function JM(e) {
  const { options: t, registry: r } = e, n = oe("BaseInputTemplate", r, t);
  return d.jsx(n, { type: "url", ...e });
}
function YM(e) {
  const { options: t, registry: r } = e, n = oe("BaseInputTemplate", r, t);
  return d.jsx(n, { type: "number", ...e });
}
function ZM() {
  return {
    AltDateWidget: OM,
    AltDateTimeWidget: AM,
    CheckboxWidget: NM,
    CheckboxesWidget: PM,
    ColorWidget: CM,
    DateWidget: TM,
    DateTimeWidget: IM,
    EmailWidget: FM,
    FileWidget: WM,
    HiddenWidget: VM,
    PasswordWidget: zM,
    RadioWidget: BM,
    RangeWidget: qM,
    SelectWidget: KM,
    TextWidget: GM,
    TextareaWidget: Mh,
    TimeWidget: HM,
    UpDownWidget: YM,
    URLWidget: JM
  };
}
function XM() {
  return {
    fields: eM(),
    templates: SM(),
    widgets: ZM(),
    rootSchema: {},
    formContext: {},
    translateString: eR
  };
}
class QM extends Fn {
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
      const s = td(r, n);
      return Array.isArray(r) ? Object.keys(s).map((a) => s[a]) : s;
    });
    /** Returns the list of field names from inspecting the `pathSchema` as well as using the `formData`
     *
     * @param pathSchema - The `PathSchema` object for the form
     * @param [formData] - The form data to use while checking for empty objects/arrays
     */
    ue(this, "getFieldNames", (r, n) => {
      const s = (a, i = [], o = [[]]) => (Object.keys(a).forEach((l) => {
        if (typeof a[l] == "object") {
          const u = o.map((c) => [...c, l]);
          a[l][Yi] && a[l][ys] !== "" ? i.push(a[l][ys]) : s(a[l], i, u);
        } else l === ys && a[l] !== "" && o.forEach((u) => {
          const c = z(n, u);
          (typeof c != "object" || Er(c) || Array.isArray(c) && c.every((f) => typeof f != "object")) && i.push(u);
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
      const { extraErrors: a, omitExtraData: i, liveOmit: o, noValidate: l, liveValidate: u, onChange: c } = this.props, { schemaUtils: f, schema: m } = this.state;
      let h = this.state.retrievedSchema;
      if (ae(r) || Array.isArray(r)) {
        const p = this.getStateFromProps(this.props, r);
        r = p.formData, h = p.retrievedSchema;
      }
      const y = !l && u;
      let v = { formData: r, schema: m }, g = r;
      if (i === !0 && o === !0 && (g = this.omitExtraData(r), v = {
        formData: g
      }), y) {
        const p = this.validate(g, m, f, h);
        let $ = p.errors, b = p.errorSchema;
        const w = $, x = b;
        if (a) {
          const P = ws(p, a);
          b = P.errorSchema, $ = P.errors;
        }
        if (n) {
          const P = this.filterErrorsBasedOnSchema(n, h, g);
          b = $t(b, P, "preventDuplicates");
        }
        v = {
          formData: g,
          errors: $,
          errorSchema: b,
          schemaValidationErrors: w,
          schemaValidationErrorSchema: x
        };
      } else if (!l && n) {
        const p = a ? $t(n, a, "preventDuplicates") : n;
        v = {
          formData: g,
          errorSchema: p,
          errors: Cn(p)
        };
      }
      this.setState(v, () => c && c({ ...this.state, ...v }, s));
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
      const { extraErrors: n, extraErrorsBlockSubmit: s, focusOnFirstError: a, onError: i } = this.props, { errors: o } = this.state, l = this.validate(r);
      let u = l.errors, c = l.errorSchema;
      const f = u, m = c, h = u.length > 0 || n && s;
      if (h) {
        if (n) {
          const y = ws(l, n);
          c = y.errorSchema, u = y.errors;
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
    this.state = this.getStateFromProps(r, r.formData), this.props.onChange && !be(this.state.formData, this.props.formData) && this.props.onChange(this.state), this.formElement = Jm();
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
    if (!be(this.props, r)) {
      const s = CR(this.props.formData, r.formData), a = !be(r.schema, this.props.schema), i = s.length > 0 || !be(r.formData, this.props.formData), o = this.getStateFromProps(
        this.props,
        this.props.formData,
        // If the `schema` has changed, we need to update the retrieved schema.
        // Or if the `formData` changes, for example in the case of a schema with dependencies that need to
        //  match one of the subSchemas, the retrieved schema must be updated.
        a || i ? void 0 : this.state.retrievedSchema,
        a,
        s
      ), l = !be(o, n);
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
      !be(a.formData, this.props.formData) && !be(a.formData, n.formData) && this.props.onChange && this.props.onChange(a), this.setState(a);
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
    var C;
    const o = this.state || {}, l = "schema" in r ? r.schema : this.props.schema, u = ("uiSchema" in r ? r.uiSchema : this.props.uiSchema) || {}, c = typeof n < "u", f = "liveValidate" in r ? r.liveValidate : this.props.liveValidate, m = c && !r.noValidate && f, h = l, y = "experimental_defaultFormStateBehavior" in r ? r.experimental_defaultFormStateBehavior : this.props.experimental_defaultFormStateBehavior, v = "experimental_customMergeAllOf" in r ? r.experimental_customMergeAllOf : this.props.experimental_customMergeAllOf;
    let g = o.schemaUtils;
    (!g || g.doesSchemaUtilsDiffer(r.validator, h, y, v)) && (g = ZD(r.validator, h, y, v));
    const p = g.getDefaultFormState(l, n), $ = this.updateRetrievedSchema(s ?? g.retrieveSchema(l, p)), b = () => r.noValidate || a ? { errors: [], errorSchema: {} } : r.liveValidate ? {
      errors: o.errors || [],
      errorSchema: o.errorSchema || {}
    } : {
      errors: o.schemaValidationErrors || [],
      errorSchema: o.schemaValidationErrorSchema || {}
    };
    let w, x, P = o.schemaValidationErrors, j = o.schemaValidationErrorSchema;
    if (m) {
      const F = this.validate(p, l, g, $);
      w = F.errors, s === void 0 ? x = F.errorSchema : x = $t((C = this.state) == null ? void 0 : C.errorSchema, F.errorSchema, "preventDuplicates"), P = w, j = x;
    } else {
      const F = b();
      if (w = F.errors, x = F.errorSchema, i.length > 0) {
        const D = i.reduce((U, M) => (U[M] = void 0, U), {});
        x = j = $t(F.errorSchema, D, "preventDuplicates");
      }
    }
    if (r.extraErrors) {
      const F = ws({ errorSchema: x, errors: w }, r.extraErrors);
      x = F.errorSchema, w = F.errors;
    }
    const N = g.toIdSchema($, u["ui:rootFieldId"], p, r.idPrefix, r.idSeparator);
    return {
      schemaUtils: g,
      schema: l,
      uiSchema: u,
      idSchema: N,
      formData: p,
      edit: c,
      errors: w,
      errorSchema: x,
      schemaValidationErrors: P,
      schemaValidationErrorSchema: j,
      retrievedSchema: $
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
      const i = r(s, Cs(s), n);
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
    const { errors: n, errorSchema: s, schema: a, uiSchema: i } = this.state, { formContext: o } = this.props, l = se(i), u = oe("ErrorListTemplate", r, l);
    return n && n.length ? d.jsx(u, { errors: n, errorSchema: s || {}, schema: a, uiSchema: i, formContext: o, registry: r }) : null;
  }
  // Filtering errors based on your retrieved schema to only show errors for properties in the selected branch.
  filterErrorsBasedOnSchema(r, n, s) {
    const { retrievedSchema: a, schemaUtils: i } = this.state, o = n ?? a, l = i.toPathSchema(o, "", s), u = this.getFieldNames(l, s), c = td(r, u);
    (n == null ? void 0 : n.type) !== "object" && (n == null ? void 0 : n.type) !== "array" && (c.__errors = r.__errors);
    const f = this.getPreviousCustomValidateErrors(), m = (y = [], v) => y.length === 0 ? y : y.filter((g) => !v.includes(g)), h = (y, v = {}) => (TR(y, (g, p) => {
      const $ = v[p];
      yn(g) || Array.isArray(g) && g.length === 0 ? delete y[p] : ae(g) && ae($) && Array.isArray($ == null ? void 0 : $.__errors) ? y[p] = m(g.__errors, $.__errors) : typeof g == "object" && !Array.isArray(g.__errors) && h(g, v[p]);
    }), y);
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
    return be(r, (s = this.state) == null ? void 0 : s.retrievedSchema) ? this.state.retrievedSchema : r;
  }
  /** Returns the registry for the form */
  getRegistry() {
    var c;
    const { translateString: r, uiSchema: n = {} } = this.props, { schemaUtils: s } = this.state, { fields: a, templates: i, widgets: o, formContext: l, translateString: u } = XM();
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
      globalUiOptions: n[Qg]
    };
  }
  /** Attempts to focus on the field associated with the `error`. Uses the `property` field to compute path of the error
   * field, then, using the `idPrefix` and `idSeparator` converts that path into an id. Then the input element with that
   * id is attempted to be found using the `formElement` ref. If it is located, then it is focused.
   *
   * @param error - The error on which to focus
   */
  focusOnError(r) {
    const { idPrefix: n = "root", idSeparator: s = "_" } = this.props, { property: a } = r, i = Oh(a);
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
    const { children: r, id: n, idPrefix: s, idSeparator: a, className: i = "", tagName: o, name: l, method: u, target: c, action: f, autoComplete: m, enctype: h, acceptcharset: y, acceptCharset: v, noHtml5Validate: g = !1, disabled: p, readonly: $, formContext: b, showErrorList: w = "top", _internalFormWrapper: x } = this.props, { schema: P, uiSchema: j, formData: N, errorSchema: A, idSchema: C } = this.state, F = this.getRegistry(), { SchemaField: D } = F.fields, { SubmitButton: U } = F.templates.ButtonTemplates, M = x ? o : void 0, B = x || o || "form";
    let { [Ps]: R = {} } = se(j);
    p && (R = { ...R, props: { ...R.props, disabled: !0 } });
    const Q = { [hn]: { [Ps]: R } };
    return d.jsxs(B, { className: i || "rjsf", id: n, name: l, method: u, target: c, action: f, autoComplete: m, encType: h, acceptCharset: v || y, noValidate: g, onSubmit: this.onSubmit, as: M, ref: this.formElement, children: [w === "top" && this.renderErrors(F), d.jsx(D, { name: "", schema: P, uiSchema: j, errorSchema: A, idSchema: C, idPrefix: s, idSeparator: a, formContext: b, formData: N, onChange: this.onChange, onBlur: this.onBlur, onFocus: this.onFocus, registry: F, disabled: p, readonly: $ }), r || d.jsx(U, { uiSchema: Q, registry: F }), w === "bottom" && this.renderErrors(F)] });
  }
}
var Ui = { exports: {} }, Lh = {}, rt = {}, Tr = {}, Xn = {}, Y = {}, Tn = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor($) {
      if (super(), !e.IDENTIFIER.test($))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = $;
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
    constructor($) {
      super(), this._items = typeof $ == "string" ? [$] : $;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const $ = this._items[0];
      return $ === "" || $ === '""';
    }
    get str() {
      var $;
      return ($ = this._str) !== null && $ !== void 0 ? $ : this._str = this._items.reduce((b, w) => `${b}${w}`, "");
    }
    get names() {
      var $;
      return ($ = this._names) !== null && $ !== void 0 ? $ : this._names = this._items.reduce((b, w) => (w instanceof r && (b[w.str] = (b[w.str] || 0) + 1), b), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(p, ...$) {
    const b = [p[0]];
    let w = 0;
    for (; w < $.length; )
      o(b, $[w]), b.push(p[++w]);
    return new n(b);
  }
  e._ = s;
  const a = new n("+");
  function i(p, ...$) {
    const b = [h(p[0])];
    let w = 0;
    for (; w < $.length; )
      b.push(a), o(b, $[w]), b.push(a, h(p[++w]));
    return l(b), new n(b);
  }
  e.str = i;
  function o(p, $) {
    $ instanceof n ? p.push(...$._items) : $ instanceof r ? p.push($) : p.push(f($));
  }
  e.addCodeArg = o;
  function l(p) {
    let $ = 1;
    for (; $ < p.length - 1; ) {
      if (p[$] === a) {
        const b = u(p[$ - 1], p[$ + 1]);
        if (b !== void 0) {
          p.splice($ - 1, 3, b);
          continue;
        }
        p[$++] = "+";
      }
      $++;
    }
  }
  function u(p, $) {
    if ($ === '""')
      return p;
    if (p === '""')
      return $;
    if (typeof p == "string")
      return $ instanceof r || p[p.length - 1] !== '"' ? void 0 : typeof $ != "string" ? `${p.slice(0, -1)}${$}"` : $[0] === '"' ? p.slice(0, -1) + $.slice(1) : void 0;
    if (typeof $ == "string" && $[0] === '"' && !(p instanceof r))
      return `"${p}${$.slice(1)}`;
  }
  function c(p, $) {
    return $.emptyStr() ? p : p.emptyStr() ? $ : i`${p}${$}`;
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
  function y(p) {
    return typeof p == "string" && e.IDENTIFIER.test(p) ? new n(`.${p}`) : s`[${p}]`;
  }
  e.getProperty = y;
  function v(p) {
    if (typeof p == "string" && e.IDENTIFIER.test(p))
      return new n(`${p}`);
    throw new Error(`CodeGen: invalid export name: ${p}, use explicit $id name mapping`);
  }
  e.getEsmExportName = v;
  function g(p) {
    return new n(p.toString());
  }
  e.regexpCode = g;
})(Tn);
var Wi = {};
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
      const m = this.toName(u), { prefix: h } = m, y = (f = c.key) !== null && f !== void 0 ? f : c.ref;
      let v = this._values[h];
      if (v) {
        const $ = v.get(y);
        if ($)
          return $;
      } else
        v = this._values[h] = /* @__PURE__ */ new Map();
      v.set(y, m);
      const g = this._scope[h] || (this._scope[h] = []), p = g.length;
      return g[p] = c.ref, m.setValue(c, { property: h, itemIndex: p }), m;
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
      for (const y in u) {
        const v = u[y];
        if (!v)
          continue;
        const g = f[y] = f[y] || /* @__PURE__ */ new Map();
        v.forEach((p) => {
          if (g.has(p))
            return;
          g.set(p, n.Started);
          let $ = c(p);
          if ($) {
            const b = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            h = (0, t._)`${h}${b} ${p} = ${$};${this.opts._n}`;
          } else if ($ = m == null ? void 0 : m(p))
            h = (0, t._)`${h}${$}${this.opts._n}`;
          else
            throw new r(p);
          g.set(p, n.Completed);
        });
      }
      return h;
    }
  }
  e.ValueScope = o;
})(Wi);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Tn, r = Wi;
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
  var s = Wi;
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
    optimizeNames(_, S) {
      return this;
    }
  }
  class i extends a {
    constructor(_, S, I) {
      super(), this.varKind = _, this.name = S, this.rhs = I;
    }
    render({ es5: _, _n: S }) {
      const I = _ ? r.varKinds.var : this.varKind, W = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${I} ${this.name}${W};` + S;
    }
    optimizeNames(_, S) {
      if (_[this.name.str])
        return this.rhs && (this.rhs = M(this.rhs, _, S)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class o extends a {
    constructor(_, S, I) {
      super(), this.lhs = _, this.rhs = S, this.sideEffects = I;
    }
    render({ _n: _ }) {
      return `${this.lhs} = ${this.rhs};` + _;
    }
    optimizeNames(_, S) {
      if (!(this.lhs instanceof t.Name && !_[this.lhs.str] && !this.sideEffects))
        return this.rhs = M(this.rhs, _, S), this;
    }
    get names() {
      const _ = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return U(_, this.rhs);
    }
  }
  class l extends o {
    constructor(_, S, I, W) {
      super(_, I, W), this.op = S;
    }
    render({ _n: _ }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + _;
    }
  }
  class u extends a {
    constructor(_) {
      super(), this.label = _, this.names = {};
    }
    render({ _n: _ }) {
      return `${this.label}:` + _;
    }
  }
  class c extends a {
    constructor(_) {
      super(), this.label = _, this.names = {};
    }
    render({ _n: _ }) {
      return `break${this.label ? ` ${this.label}` : ""};` + _;
    }
  }
  class f extends a {
    constructor(_) {
      super(), this.error = _;
    }
    render({ _n: _ }) {
      return `throw ${this.error};` + _;
    }
    get names() {
      return this.error.names;
    }
  }
  class m extends a {
    constructor(_) {
      super(), this.code = _;
    }
    render({ _n: _ }) {
      return `${this.code};` + _;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(_, S) {
      return this.code = M(this.code, _, S), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class h extends a {
    constructor(_ = []) {
      super(), this.nodes = _;
    }
    render(_) {
      return this.nodes.reduce((S, I) => S + I.render(_), "");
    }
    optimizeNodes() {
      const { nodes: _ } = this;
      let S = _.length;
      for (; S--; ) {
        const I = _[S].optimizeNodes();
        Array.isArray(I) ? _.splice(S, 1, ...I) : I ? _[S] = I : _.splice(S, 1);
      }
      return _.length > 0 ? this : void 0;
    }
    optimizeNames(_, S) {
      const { nodes: I } = this;
      let W = I.length;
      for (; W--; ) {
        const V = I[W];
        V.optimizeNames(_, S) || (B(_, V.names), I.splice(W, 1));
      }
      return I.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((_, S) => D(_, S.names), {});
    }
  }
  class y extends h {
    render(_) {
      return "{" + _._n + super.render(_) + "}" + _._n;
    }
  }
  class v extends h {
  }
  class g extends y {
  }
  g.kind = "else";
  class p extends y {
    constructor(_, S) {
      super(S), this.condition = _;
    }
    render(_) {
      let S = `if(${this.condition})` + super.render(_);
      return this.else && (S += "else " + this.else.render(_)), S;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const _ = this.condition;
      if (_ === !0)
        return this.nodes;
      let S = this.else;
      if (S) {
        const I = S.optimizeNodes();
        S = this.else = Array.isArray(I) ? new g(I) : I;
      }
      if (S)
        return _ === !1 ? S instanceof p ? S : S.nodes : this.nodes.length ? this : new p(R(_), S instanceof p ? [S] : S.nodes);
      if (!(_ === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(_, S) {
      var I;
      if (this.else = (I = this.else) === null || I === void 0 ? void 0 : I.optimizeNames(_, S), !!(super.optimizeNames(_, S) || this.else))
        return this.condition = M(this.condition, _, S), this;
    }
    get names() {
      const _ = super.names;
      return U(_, this.condition), this.else && D(_, this.else.names), _;
    }
  }
  p.kind = "if";
  class $ extends y {
  }
  $.kind = "for";
  class b extends $ {
    constructor(_) {
      super(), this.iteration = _;
    }
    render(_) {
      return `for(${this.iteration})` + super.render(_);
    }
    optimizeNames(_, S) {
      if (super.optimizeNames(_, S))
        return this.iteration = M(this.iteration, _, S), this;
    }
    get names() {
      return D(super.names, this.iteration.names);
    }
  }
  class w extends $ {
    constructor(_, S, I, W) {
      super(), this.varKind = _, this.name = S, this.from = I, this.to = W;
    }
    render(_) {
      const S = _.es5 ? r.varKinds.var : this.varKind, { name: I, from: W, to: V } = this;
      return `for(${S} ${I}=${W}; ${I}<${V}; ${I}++)` + super.render(_);
    }
    get names() {
      const _ = U(super.names, this.from);
      return U(_, this.to);
    }
  }
  class x extends $ {
    constructor(_, S, I, W) {
      super(), this.loop = _, this.varKind = S, this.name = I, this.iterable = W;
    }
    render(_) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(_);
    }
    optimizeNames(_, S) {
      if (super.optimizeNames(_, S))
        return this.iterable = M(this.iterable, _, S), this;
    }
    get names() {
      return D(super.names, this.iterable.names);
    }
  }
  class P extends y {
    constructor(_, S, I) {
      super(), this.name = _, this.args = S, this.async = I;
    }
    render(_) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(_);
    }
  }
  P.kind = "func";
  class j extends h {
    render(_) {
      return "return " + super.render(_);
    }
  }
  j.kind = "return";
  class N extends y {
    render(_) {
      let S = "try" + super.render(_);
      return this.catch && (S += this.catch.render(_)), this.finally && (S += this.finally.render(_)), S;
    }
    optimizeNodes() {
      var _, S;
      return super.optimizeNodes(), (_ = this.catch) === null || _ === void 0 || _.optimizeNodes(), (S = this.finally) === null || S === void 0 || S.optimizeNodes(), this;
    }
    optimizeNames(_, S) {
      var I, W;
      return super.optimizeNames(_, S), (I = this.catch) === null || I === void 0 || I.optimizeNames(_, S), (W = this.finally) === null || W === void 0 || W.optimizeNames(_, S), this;
    }
    get names() {
      const _ = super.names;
      return this.catch && D(_, this.catch.names), this.finally && D(_, this.finally.names), _;
    }
  }
  class A extends y {
    constructor(_) {
      super(), this.error = _;
    }
    render(_) {
      return `catch(${this.error})` + super.render(_);
    }
  }
  A.kind = "catch";
  class C extends y {
    render(_) {
      return "finally" + super.render(_);
    }
  }
  C.kind = "finally";
  class F {
    constructor(_, S = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...S, _n: S.lines ? `
` : "" }, this._extScope = _, this._scope = new r.Scope({ parent: _ }), this._nodes = [new v()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(_) {
      return this._scope.name(_);
    }
    // reserves unique name in the external scope
    scopeName(_) {
      return this._extScope.name(_);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(_, S) {
      const I = this._extScope.value(_, S);
      return (this._values[I.prefix] || (this._values[I.prefix] = /* @__PURE__ */ new Set())).add(I), I;
    }
    getScopeValue(_, S) {
      return this._extScope.getValue(_, S);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(_) {
      return this._extScope.scopeRefs(_, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(_, S, I, W) {
      const V = this._scope.toName(S);
      return I !== void 0 && W && (this._constants[V.str] = I), this._leafNode(new i(_, V, I)), V;
    }
    // `const` declaration (`var` in es5 mode)
    const(_, S, I) {
      return this._def(r.varKinds.const, _, S, I);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(_, S, I) {
      return this._def(r.varKinds.let, _, S, I);
    }
    // `var` declaration with optional assignment
    var(_, S, I) {
      return this._def(r.varKinds.var, _, S, I);
    }
    // assignment code
    assign(_, S, I) {
      return this._leafNode(new o(_, S, I));
    }
    // `+=` code
    add(_, S) {
      return this._leafNode(new l(_, e.operators.ADD, S));
    }
    // appends passed SafeExpr to code or executes Block
    code(_) {
      return typeof _ == "function" ? _() : _ !== t.nil && this._leafNode(new m(_)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(..._) {
      const S = ["{"];
      for (const [I, W] of _)
        S.length > 1 && S.push(","), S.push(I), (I !== W || this.opts.es5) && (S.push(":"), (0, t.addCodeArg)(S, W));
      return S.push("}"), new t._Code(S);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(_, S, I) {
      if (this._blockNode(new p(_)), S && I)
        this.code(S).else().code(I).endIf();
      else if (S)
        this.code(S).endIf();
      else if (I)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(_) {
      return this._elseNode(new p(_));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new g());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(p, g);
    }
    _for(_, S) {
      return this._blockNode(_), S && this.code(S).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(_, S) {
      return this._for(new b(_), S);
    }
    // `for` statement for a range of values
    forRange(_, S, I, W, V = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const ne = this._scope.toName(_);
      return this._for(new w(V, ne, S, I), () => W(ne));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(_, S, I, W = r.varKinds.const) {
      const V = this._scope.toName(_);
      if (this.opts.es5) {
        const ne = S instanceof t.Name ? S : this.var("_arr", S);
        return this.forRange("_i", 0, (0, t._)`${ne}.length`, (re) => {
          this.var(V, (0, t._)`${ne}[${re}]`), I(V);
        });
      }
      return this._for(new x("of", W, V, S), () => I(V));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(_, S, I, W = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(_, (0, t._)`Object.keys(${S})`, I);
      const V = this._scope.toName(_);
      return this._for(new x("in", W, V, S), () => I(V));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode($);
    }
    // `label` statement
    label(_) {
      return this._leafNode(new u(_));
    }
    // `break` statement
    break(_) {
      return this._leafNode(new c(_));
    }
    // `return` statement
    return(_) {
      const S = new j();
      if (this._blockNode(S), this.code(_), S.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(j);
    }
    // `try` statement
    try(_, S, I) {
      if (!S && !I)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const W = new N();
      if (this._blockNode(W), this.code(_), S) {
        const V = this.name("e");
        this._currNode = W.catch = new A(V), S(V);
      }
      return I && (this._currNode = W.finally = new C(), this.code(I)), this._endBlockNode(A, C);
    }
    // `throw` statement
    throw(_) {
      return this._leafNode(new f(_));
    }
    // start self-balancing block
    block(_, S) {
      return this._blockStarts.push(this._nodes.length), _ && this.code(_).endBlock(S), this;
    }
    // end the current self-balancing block
    endBlock(_) {
      const S = this._blockStarts.pop();
      if (S === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const I = this._nodes.length - S;
      if (I < 0 || _ !== void 0 && I !== _)
        throw new Error(`CodeGen: wrong number of nodes: ${I} vs ${_} expected`);
      return this._nodes.length = S, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(_, S = t.nil, I, W) {
      return this._blockNode(new P(_, S, I)), W && this.code(W).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(P);
    }
    optimize(_ = 1) {
      for (; _-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(_) {
      return this._currNode.nodes.push(_), this;
    }
    _blockNode(_) {
      this._currNode.nodes.push(_), this._nodes.push(_);
    }
    _endBlockNode(_, S) {
      const I = this._currNode;
      if (I instanceof _ || S && I instanceof S)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${S ? `${_.kind}/${S.kind}` : _.kind}"`);
    }
    _elseNode(_) {
      const S = this._currNode;
      if (!(S instanceof p))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = S.else = _, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const _ = this._nodes;
      return _[_.length - 1];
    }
    set _currNode(_) {
      const S = this._nodes;
      S[S.length - 1] = _;
    }
  }
  e.CodeGen = F;
  function D(O, _) {
    for (const S in _)
      O[S] = (O[S] || 0) + (_[S] || 0);
    return O;
  }
  function U(O, _) {
    return _ instanceof t._CodeOrName ? D(O, _.names) : O;
  }
  function M(O, _, S) {
    if (O instanceof t.Name)
      return I(O);
    if (!W(O))
      return O;
    return new t._Code(O._items.reduce((V, ne) => (ne instanceof t.Name && (ne = I(ne)), ne instanceof t._Code ? V.push(...ne._items) : V.push(ne), V), []));
    function I(V) {
      const ne = S[V.str];
      return ne === void 0 || _[V.str] !== 1 ? V : (delete _[V.str], ne);
    }
    function W(V) {
      return V instanceof t._Code && V._items.some((ne) => ne instanceof t.Name && _[ne.str] === 1 && S[ne.str] !== void 0);
    }
  }
  function B(O, _) {
    for (const S in _)
      O[S] = (O[S] || 0) - (_[S] || 0);
  }
  function R(O) {
    return typeof O == "boolean" || typeof O == "number" || O === null ? !O : (0, t._)`!${T(O)}`;
  }
  e.not = R;
  const Q = E(e.operators.AND);
  function Z(...O) {
    return O.reduce(Q);
  }
  e.and = Z;
  const ee = E(e.operators.OR);
  function k(...O) {
    return O.reduce(ee);
  }
  e.or = k;
  function E(O) {
    return (_, S) => _ === t.nil ? S : S === t.nil ? _ : (0, t._)`${T(_)} ${O} ${T(S)}`;
  }
  function T(O) {
    return O instanceof t.Name ? O : (0, t._)`(${O})`;
  }
})(Y);
var L = {};
Object.defineProperty(L, "__esModule", { value: !0 });
L.checkStrictMode = L.getErrorPath = L.Type = L.useFunc = L.setEvaluated = L.evaluatedPropsToName = L.mergeEvaluated = L.eachItem = L.unescapeJsonPointer = L.escapeJsonPointer = L.escapeFragment = L.unescapeFragment = L.schemaRefOrVal = L.schemaHasRulesButRef = L.schemaHasRules = L.checkUnknownRules = L.alwaysValidSchema = L.toHash = void 0;
const fe = Y, e4 = Tn;
function t4(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
L.toHash = t4;
function r4(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Uh(e, t), !Wh(t, e.self.RULES.all));
}
L.alwaysValidSchema = r4;
function Uh(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || Bh(e, `unknown keyword: "${a}"`);
}
L.checkUnknownRules = Uh;
function Wh(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
L.schemaHasRules = Wh;
function n4(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
L.schemaHasRulesButRef = n4;
function s4({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, fe._)`${r}`;
  }
  return (0, fe._)`${e}${t}${(0, fe.getProperty)(n)}`;
}
L.schemaRefOrVal = s4;
function a4(e) {
  return Vh(decodeURIComponent(e));
}
L.unescapeFragment = a4;
function i4(e) {
  return encodeURIComponent(ll(e));
}
L.escapeFragment = i4;
function ll(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
L.escapeJsonPointer = ll;
function Vh(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
L.unescapeJsonPointer = Vh;
function o4(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
L.eachItem = o4;
function vd({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, i, o) => {
    const l = i === void 0 ? a : i instanceof fe.Name ? (a instanceof fe.Name ? e(s, a, i) : t(s, a, i), i) : a instanceof fe.Name ? (t(s, i, a), a) : r(a, i);
    return o === fe.Name && !(l instanceof fe.Name) ? n(s, l) : l;
  };
}
L.mergeEvaluated = {
  props: vd({
    mergeNames: (e, t, r) => e.if((0, fe._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, fe._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, fe._)`${r} || {}`).code((0, fe._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, fe._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, fe._)`${r} || {}`), cl(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: zh
  }),
  items: vd({
    mergeNames: (e, t, r) => e.if((0, fe._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, fe._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, fe._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, fe._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function zh(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, fe._)`{}`);
  return t !== void 0 && cl(e, r, t), r;
}
L.evaluatedPropsToName = zh;
function cl(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, fe._)`${t}${(0, fe.getProperty)(n)}`, !0));
}
L.setEvaluated = cl;
const $d = {};
function l4(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: $d[t.code] || ($d[t.code] = new e4._Code(t.code))
  });
}
L.useFunc = l4;
var Vi;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Vi || (L.Type = Vi = {}));
function c4(e, t, r) {
  if (e instanceof fe.Name) {
    const n = t === Vi.Num;
    return r ? n ? (0, fe._)`"[" + ${e} + "]"` : (0, fe._)`"['" + ${e} + "']"` : n ? (0, fe._)`"/" + ${e}` : (0, fe._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, fe.getProperty)(e).toString() : "/" + ll(e);
}
L.getErrorPath = c4;
function Bh(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
L.checkStrictMode = Bh;
var mt = {};
Object.defineProperty(mt, "__esModule", { value: !0 });
const Te = Y, u4 = {
  // validation function arguments
  data: new Te.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Te.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Te.Name("instancePath"),
  parentData: new Te.Name("parentData"),
  parentDataProperty: new Te.Name("parentDataProperty"),
  rootData: new Te.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Te.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Te.Name("vErrors"),
  // null or array of validation errors
  errors: new Te.Name("errors"),
  // counter of validation errors
  this: new Te.Name("this"),
  // "globals"
  self: new Te.Name("self"),
  scope: new Te.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Te.Name("json"),
  jsonPos: new Te.Name("jsonPos"),
  jsonLen: new Te.Name("jsonLen"),
  jsonPart: new Te.Name("jsonPart")
};
mt.default = u4;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = Y, r = L, n = mt;
  e.keywordError = {
    message: ({ keyword: g }) => (0, t.str)`must pass "${g}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: g, schemaType: p }) => p ? (0, t.str)`"${g}" keyword must be ${p} ($data)` : (0, t.str)`"${g}" keyword is invalid ($data)`
  };
  function s(g, p = e.keywordError, $, b) {
    const { it: w } = g, { gen: x, compositeRule: P, allErrors: j } = w, N = f(g, p, $);
    b ?? (P || j) ? l(x, N) : u(w, (0, t._)`[${N}]`);
  }
  e.reportError = s;
  function a(g, p = e.keywordError, $) {
    const { it: b } = g, { gen: w, compositeRule: x, allErrors: P } = b, j = f(g, p, $);
    l(w, j), x || P || u(b, n.default.vErrors);
  }
  e.reportExtraError = a;
  function i(g, p) {
    g.assign(n.default.errors, p), g.if((0, t._)`${n.default.vErrors} !== null`, () => g.if(p, () => g.assign((0, t._)`${n.default.vErrors}.length`, p), () => g.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = i;
  function o({ gen: g, keyword: p, schemaValue: $, data: b, errsCount: w, it: x }) {
    if (w === void 0)
      throw new Error("ajv implementation error");
    const P = g.name("err");
    g.forRange("i", w, n.default.errors, (j) => {
      g.const(P, (0, t._)`${n.default.vErrors}[${j}]`), g.if((0, t._)`${P}.instancePath === undefined`, () => g.assign((0, t._)`${P}.instancePath`, (0, t.strConcat)(n.default.instancePath, x.errorPath))), g.assign((0, t._)`${P}.schemaPath`, (0, t.str)`${x.errSchemaPath}/${p}`), x.opts.verbose && (g.assign((0, t._)`${P}.schema`, $), g.assign((0, t._)`${P}.data`, b));
    });
  }
  e.extendErrors = o;
  function l(g, p) {
    const $ = g.const("err", p);
    g.if((0, t._)`${n.default.vErrors} === null`, () => g.assign(n.default.vErrors, (0, t._)`[${$}]`), (0, t._)`${n.default.vErrors}.push(${$})`), g.code((0, t._)`${n.default.errors}++`);
  }
  function u(g, p) {
    const { gen: $, validateName: b, schemaEnv: w } = g;
    w.$async ? $.throw((0, t._)`new ${g.ValidationError}(${p})`) : ($.assign((0, t._)`${b}.errors`, p), $.return(!1));
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
  function f(g, p, $) {
    const { createErrors: b } = g.it;
    return b === !1 ? (0, t._)`{}` : m(g, p, $);
  }
  function m(g, p, $ = {}) {
    const { gen: b, it: w } = g, x = [
      h(w, $),
      y(g, $)
    ];
    return v(g, p, x), b.object(...x);
  }
  function h({ errorPath: g }, { instancePath: p }) {
    const $ = p ? (0, t.str)`${g}${(0, r.getErrorPath)(p, r.Type.Str)}` : g;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, $)];
  }
  function y({ keyword: g, it: { errSchemaPath: p } }, { schemaPath: $, parentSchema: b }) {
    let w = b ? p : (0, t.str)`${p}/${g}`;
    return $ && (w = (0, t.str)`${w}${(0, r.getErrorPath)($, r.Type.Str)}`), [c.schemaPath, w];
  }
  function v(g, { params: p, message: $ }, b) {
    const { keyword: w, data: x, schemaValue: P, it: j } = g, { opts: N, propertyName: A, topSchemaRef: C, schemaPath: F } = j;
    b.push([c.keyword, w], [c.params, typeof p == "function" ? p(g) : p || (0, t._)`{}`]), N.messages && b.push([c.message, typeof $ == "function" ? $(g) : $]), N.verbose && b.push([c.schema, P], [c.parentSchema, (0, t._)`${C}${F}`], [n.default.data, x]), A && b.push([c.propertyName, A]);
  }
})(Xn);
Object.defineProperty(Tr, "__esModule", { value: !0 });
Tr.boolOrEmptySchema = Tr.topBoolOrEmptySchema = void 0;
const d4 = Xn, f4 = Y, p4 = mt, h4 = {
  message: "boolean schema is false"
};
function m4(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? qh(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(p4.default.data) : (t.assign((0, f4._)`${n}.errors`, null), t.return(!0));
}
Tr.topBoolOrEmptySchema = m4;
function g4(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), qh(e)) : r.var(t, !0);
}
Tr.boolOrEmptySchema = g4;
function qh(e, t) {
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
  (0, d4.reportError)(s, h4, void 0, t);
}
var je = {}, rr = {};
Object.defineProperty(rr, "__esModule", { value: !0 });
rr.getRules = rr.isJSONType = void 0;
const y4 = ["string", "number", "integer", "boolean", "null", "object", "array"], v4 = new Set(y4);
function $4(e) {
  return typeof e == "string" && v4.has(e);
}
rr.isJSONType = $4;
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
rr.getRules = b4;
var _t = {};
Object.defineProperty(_t, "__esModule", { value: !0 });
_t.shouldUseRule = _t.shouldUseGroup = _t.schemaHasRulesForType = void 0;
function _4({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && Kh(e, n);
}
_t.schemaHasRulesForType = _4;
function Kh(e, t) {
  return t.rules.some((r) => Gh(e, r));
}
_t.shouldUseGroup = Kh;
function Gh(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
_t.shouldUseRule = Gh;
Object.defineProperty(je, "__esModule", { value: !0 });
je.reportTypeError = je.checkDataTypes = je.checkDataType = je.coerceAndCheckDataType = je.getJSONTypes = je.getSchemaTypes = je.DataType = void 0;
const w4 = rr, x4 = _t, S4 = Xn, J = Y, Hh = L;
var _r;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(_r || (je.DataType = _r = {}));
function j4(e) {
  const t = Jh(e.type);
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
je.getSchemaTypes = j4;
function Jh(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(w4.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
je.getJSONTypes = Jh;
function E4(e, t) {
  const { gen: r, data: n, opts: s } = e, a = O4(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, x4.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const o = ul(t, n, s.strictNumbers, _r.Wrong);
    r.if(o, () => {
      a.length ? A4(e, t, a) : dl(e);
    });
  }
  return i;
}
je.coerceAndCheckDataType = E4;
const Yh = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function O4(e, t) {
  return t ? e.filter((r) => Yh.has(r) || t === "array" && r === "array") : [];
}
function A4(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, J._)`typeof ${s}`), o = n.let("coerced", (0, J._)`undefined`);
  a.coerceTypes === "array" && n.if((0, J._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, J._)`${s}[0]`).assign(i, (0, J._)`typeof ${s}`).if(ul(t, s, a.strictNumbers), () => n.assign(o, s))), n.if((0, J._)`${o} !== undefined`);
  for (const u of r)
    (Yh.has(u) || u === "array" && a.coerceTypes === "array") && l(u);
  n.else(), dl(e), n.endIf(), n.if((0, J._)`${o} !== undefined`, () => {
    n.assign(s, o), N4(e, o);
  });
  function l(u) {
    switch (u) {
      case "string":
        n.elseIf((0, J._)`${i} == "number" || ${i} == "boolean"`).assign(o, (0, J._)`"" + ${s}`).elseIf((0, J._)`${s} === null`).assign(o, (0, J._)`""`);
        return;
      case "number":
        n.elseIf((0, J._)`${i} == "boolean" || ${s} === null
              || (${i} == "string" && ${s} && ${s} == +${s})`).assign(o, (0, J._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, J._)`${i} === "boolean" || ${s} === null
              || (${i} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(o, (0, J._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, J._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(o, !1).elseIf((0, J._)`${s} === "true" || ${s} === 1`).assign(o, !0);
        return;
      case "null":
        n.elseIf((0, J._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(o, null);
        return;
      case "array":
        n.elseIf((0, J._)`${i} === "string" || ${i} === "number"
              || ${i} === "boolean" || ${s} === null`).assign(o, (0, J._)`[${s}]`);
    }
  }
}
function N4({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, J._)`${t} !== undefined`, () => e.assign((0, J._)`${t}[${r}]`, n));
}
function zi(e, t, r, n = _r.Correct) {
  const s = n === _r.Correct ? J.operators.EQ : J.operators.NEQ;
  let a;
  switch (e) {
    case "null":
      return (0, J._)`${t} ${s} null`;
    case "array":
      a = (0, J._)`Array.isArray(${t})`;
      break;
    case "object":
      a = (0, J._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      a = i((0, J._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = i();
      break;
    default:
      return (0, J._)`typeof ${t} ${s} ${e}`;
  }
  return n === _r.Correct ? a : (0, J.not)(a);
  function i(o = J.nil) {
    return (0, J.and)((0, J._)`typeof ${t} == "number"`, o, r ? (0, J._)`isFinite(${t})` : J.nil);
  }
}
je.checkDataType = zi;
function ul(e, t, r, n) {
  if (e.length === 1)
    return zi(e[0], t, r, n);
  let s;
  const a = (0, Hh.toHash)(e);
  if (a.array && a.object) {
    const i = (0, J._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, J._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = J.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, J.and)(s, zi(i, t, r, n));
  return s;
}
je.checkDataTypes = ul;
const P4 = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, J._)`{type: ${e}}` : (0, J._)`{type: ${t}}`
};
function dl(e) {
  const t = C4(e);
  (0, S4.reportError)(t, P4);
}
je.reportTypeError = dl;
function C4(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, Hh.schemaRefOrVal)(e, n, "type");
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
var Da = {};
Object.defineProperty(Da, "__esModule", { value: !0 });
Da.assignDefaults = void 0;
const mr = Y, T4 = L;
function I4(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      bd(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => bd(e, a, s.default));
}
Da.assignDefaults = I4;
function bd(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: i } = e;
  if (r === void 0)
    return;
  const o = (0, mr._)`${a}${(0, mr.getProperty)(t)}`;
  if (s) {
    (0, T4.checkStrictMode)(e, `default is ignored for: ${o}`);
    return;
  }
  let l = (0, mr._)`${o} === undefined`;
  i.useDefaults === "empty" && (l = (0, mr._)`${l} || ${o} === null || ${o} === ""`), n.if(l, (0, mr._)`${o} = ${(0, mr.stringify)(r)}`);
}
var lt = {}, X = {};
Object.defineProperty(X, "__esModule", { value: !0 });
X.validateUnion = X.validateArray = X.usePattern = X.callValidateCode = X.schemaProperties = X.allSchemaProperties = X.noPropertyInData = X.propertyInData = X.isOwnProperty = X.hasPropFunc = X.reportMissingProp = X.checkMissingProp = X.checkReportMissingProp = void 0;
const _e = Y, fl = L, It = mt, F4 = L;
function k4(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(hl(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, _e._)`${t}` }, !0), e.error();
  });
}
X.checkReportMissingProp = k4;
function D4({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, _e.or)(...n.map((a) => (0, _e.and)(hl(e, t, a, r.ownProperties), (0, _e._)`${s} = ${a}`)));
}
X.checkMissingProp = D4;
function R4(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
X.reportMissingProp = R4;
function Zh(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, _e._)`Object.prototype.hasOwnProperty`
  });
}
X.hasPropFunc = Zh;
function pl(e, t, r) {
  return (0, _e._)`${Zh(e)}.call(${t}, ${r})`;
}
X.isOwnProperty = pl;
function M4(e, t, r, n) {
  const s = (0, _e._)`${t}${(0, _e.getProperty)(r)} !== undefined`;
  return n ? (0, _e._)`${s} && ${pl(e, t, r)}` : s;
}
X.propertyInData = M4;
function hl(e, t, r, n) {
  const s = (0, _e._)`${t}${(0, _e.getProperty)(r)} === undefined`;
  return n ? (0, _e.or)(s, (0, _e.not)(pl(e, t, r))) : s;
}
X.noPropertyInData = hl;
function Xh(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
X.allSchemaProperties = Xh;
function L4(e, t) {
  return Xh(t).filter((r) => !(0, fl.alwaysValidSchema)(e, t[r]));
}
X.schemaProperties = L4;
function U4({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: i }, o, l, u) {
  const c = u ? (0, _e._)`${e}, ${t}, ${n}${s}` : t, f = [
    [It.default.instancePath, (0, _e.strConcat)(It.default.instancePath, a)],
    [It.default.parentData, i.parentData],
    [It.default.parentDataProperty, i.parentDataProperty],
    [It.default.rootData, It.default.rootData]
  ];
  i.opts.dynamicRef && f.push([It.default.dynamicAnchors, It.default.dynamicAnchors]);
  const m = (0, _e._)`${c}, ${r.object(...f)}`;
  return l !== _e.nil ? (0, _e._)`${o}.call(${l}, ${m})` : (0, _e._)`${o}(${m})`;
}
X.callValidateCode = U4;
const W4 = (0, _e._)`new RegExp`;
function V4({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, _e._)`${s.code === "new RegExp" ? W4 : (0, F4.useFunc)(e, s)}(${r}, ${n})`
  });
}
X.usePattern = V4;
function z4(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const o = t.let("valid", !0);
    return i(() => t.assign(o, !1)), o;
  }
  return t.var(a, !0), i(() => t.break()), a;
  function i(o) {
    const l = t.const("len", (0, _e._)`${r}.length`);
    t.forRange("i", 0, l, (u) => {
      e.subschema({
        keyword: n,
        dataProp: u,
        dataPropType: fl.Type.Num
      }, a), t.if((0, _e.not)(a), o);
    });
  }
}
X.validateArray = z4;
function B4(e) {
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
    t.assign(i, (0, _e._)`${i} || ${o}`), e.mergeValidEvaluated(c, o) || t.if((0, _e.not)(i));
  })), e.result(i, () => e.reset(), () => e.error(!0));
}
X.validateUnion = B4;
Object.defineProperty(lt, "__esModule", { value: !0 });
lt.validateKeywordUsage = lt.validSchemaType = lt.funcKeywordCode = lt.macroKeywordCode = void 0;
const Ie = Y, Jt = mt, q4 = X, K4 = Xn;
function G4(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: i } = e, o = t.macro.call(i.self, s, a, i), l = Qh(r, n, o);
  i.opts.validateSchema !== !1 && i.self.validateSchema(o, !0);
  const u = r.name("valid");
  e.subschema({
    schema: o,
    schemaPath: Ie.nil,
    errSchemaPath: `${i.errSchemaPath}/${n}`,
    topSchemaRef: l,
    compositeRule: !0
  }, u), e.pass(u, () => e.error(!0));
}
lt.macroKeywordCode = G4;
function H4(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: i, $data: o, it: l } = e;
  Y4(l, t);
  const u = !o && t.compile ? t.compile.call(l.self, a, i, l) : t.validate, c = Qh(n, s, u), f = n.let("valid");
  e.block$data(f, m), e.ok((r = t.valid) !== null && r !== void 0 ? r : f);
  function m() {
    if (t.errors === !1)
      v(), t.modifying && _d(e), g(() => e.error());
    else {
      const p = t.async ? h() : y();
      t.modifying && _d(e), g(() => J4(e, p));
    }
  }
  function h() {
    const p = n.let("ruleErrs", null);
    return n.try(() => v((0, Ie._)`await `), ($) => n.assign(f, !1).if((0, Ie._)`${$} instanceof ${l.ValidationError}`, () => n.assign(p, (0, Ie._)`${$}.errors`), () => n.throw($))), p;
  }
  function y() {
    const p = (0, Ie._)`${c}.errors`;
    return n.assign(p, null), v(Ie.nil), p;
  }
  function v(p = t.async ? (0, Ie._)`await ` : Ie.nil) {
    const $ = l.opts.passContext ? Jt.default.this : Jt.default.self, b = !("compile" in t && !o || t.schema === !1);
    n.assign(f, (0, Ie._)`${p}${(0, q4.callValidateCode)(e, c, $, b)}`, t.modifying);
  }
  function g(p) {
    var $;
    n.if((0, Ie.not)(($ = t.valid) !== null && $ !== void 0 ? $ : f), p);
  }
}
lt.funcKeywordCode = H4;
function _d(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Ie._)`${n.parentData}[${n.parentDataProperty}]`));
}
function J4(e, t) {
  const { gen: r } = e;
  r.if((0, Ie._)`Array.isArray(${t})`, () => {
    r.assign(Jt.default.vErrors, (0, Ie._)`${Jt.default.vErrors} === null ? ${t} : ${Jt.default.vErrors}.concat(${t})`).assign(Jt.default.errors, (0, Ie._)`${Jt.default.vErrors}.length`), (0, K4.extendErrors)(e);
  }, () => e.error());
}
function Y4({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function Qh(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Ie.stringify)(r) });
}
function Z4(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
lt.validSchemaType = Z4;
function X4({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
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
lt.validateKeywordUsage = X4;
var Ut = {};
Object.defineProperty(Ut, "__esModule", { value: !0 });
Ut.extendSubschemaMode = Ut.extendSubschemaData = Ut.getSubschema = void 0;
const it = Y, em = L;
function Q4(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: i }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const o = e.schema[t];
    return r === void 0 ? {
      schema: o,
      schemaPath: (0, it._)`${e.schemaPath}${(0, it.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: o[r],
      schemaPath: (0, it._)`${e.schemaPath}${(0, it.getProperty)(t)}${(0, it.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, em.escapeFragment)(r)}`
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
Ut.getSubschema = Q4;
function e5(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: i }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: o } = t;
  if (r !== void 0) {
    const { errorPath: u, dataPathArr: c, opts: f } = t, m = o.let("data", (0, it._)`${t.data}${(0, it.getProperty)(r)}`, !0);
    l(m), e.errorPath = (0, it.str)`${u}${(0, em.getErrorPath)(r, n, f.jsPropertySyntax)}`, e.parentDataProperty = (0, it._)`${r}`, e.dataPathArr = [...c, e.parentDataProperty];
  }
  if (s !== void 0) {
    const u = s instanceof it.Name ? s : o.let("data", s, !0);
    l(u), i !== void 0 && (e.propertyName = i);
  }
  a && (e.dataTypes = a);
  function l(u) {
    e.data = u, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, u];
  }
}
Ut.extendSubschemaData = e5;
function t5(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Ut.extendSubschemaMode = t5;
var Ce = {}, tm = function e(t, r) {
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
}, rm = { exports: {} }, Rt = rm.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  js(t, n, s, e, "", e);
};
Rt.keywords = {
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
Rt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Rt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Rt.skipKeywords = {
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
function js(e, t, r, n, s, a, i, o, l, u) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, i, o, l, u);
    for (var c in n) {
      var f = n[c];
      if (Array.isArray(f)) {
        if (c in Rt.arrayKeywords)
          for (var m = 0; m < f.length; m++)
            js(e, t, r, f[m], s + "/" + c + "/" + m, a, s, c, n, m);
      } else if (c in Rt.propsKeywords) {
        if (f && typeof f == "object")
          for (var h in f)
            js(e, t, r, f[h], s + "/" + c + "/" + r5(h), a, s, c, n, h);
      } else (c in Rt.keywords || e.allKeys && !(c in Rt.skipKeywords)) && js(e, t, r, f, s + "/" + c, a, s, c, n);
    }
    r(n, s, a, i, o, l, u);
  }
}
function r5(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var n5 = rm.exports;
Object.defineProperty(Ce, "__esModule", { value: !0 });
Ce.getSchemaRefs = Ce.resolveUrl = Ce.normalizeId = Ce._getFullPath = Ce.getFullPath = Ce.inlineRef = void 0;
const s5 = L, a5 = tm, i5 = n5, o5 = /* @__PURE__ */ new Set([
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
function l5(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Bi(e) : t ? nm(e) <= t : !1;
}
Ce.inlineRef = l5;
const c5 = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Bi(e) {
  for (const t in e) {
    if (c5.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Bi) || typeof r == "object" && Bi(r))
      return !0;
  }
  return !1;
}
function nm(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !o5.has(r) && (typeof e[r] == "object" && (0, s5.eachItem)(e[r], (n) => t += nm(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function sm(e, t = "", r) {
  r !== !1 && (t = wr(t));
  const n = e.parse(t);
  return am(e, n);
}
Ce.getFullPath = sm;
function am(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Ce._getFullPath = am;
const u5 = /#\/?$/;
function wr(e) {
  return e ? e.replace(u5, "") : "";
}
Ce.normalizeId = wr;
function d5(e, t, r) {
  return r = wr(r), e.resolve(t, r);
}
Ce.resolveUrl = d5;
const f5 = /^[a-z_][-a-z0-9._]*$/i;
function p5(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = wr(e[r] || t), a = { "": s }, i = sm(n, s, !1), o = {}, l = /* @__PURE__ */ new Set();
  return i5(e, { allKeys: !0 }, (f, m, h, y) => {
    if (y === void 0)
      return;
    const v = i + m;
    let g = a[y];
    typeof f[r] == "string" && (g = p.call(this, f[r])), $.call(this, f.$anchor), $.call(this, f.$dynamicAnchor), a[m] = g;
    function p(b) {
      const w = this.opts.uriResolver.resolve;
      if (b = wr(g ? w(g, b) : b), l.has(b))
        throw c(b);
      l.add(b);
      let x = this.refs[b];
      return typeof x == "string" && (x = this.refs[x]), typeof x == "object" ? u(f, x.schema, b) : b !== wr(v) && (b[0] === "#" ? (u(f, o[b], b), o[b] = f) : this.refs[b] = v), b;
    }
    function $(b) {
      if (typeof b == "string") {
        if (!f5.test(b))
          throw new Error(`invalid anchor "${b}"`);
        p.call(this, `#${b}`);
      }
    }
  }), o;
  function u(f, m, h) {
    if (m !== void 0 && !a5(f, m))
      throw c(h);
  }
  function c(f) {
    return new Error(`reference "${f}" resolves to more than one schema`);
  }
}
Ce.getSchemaRefs = p5;
Object.defineProperty(rt, "__esModule", { value: !0 });
rt.getData = rt.KeywordCxt = rt.validateFunctionCode = void 0;
const im = Tr, wd = je, ml = _t, zs = je, h5 = Da, $n = lt, fi = Ut, q = Y, H = mt, m5 = Ce, wt = L, ln = Xn;
function g5(e) {
  if (cm(e) && (um(e), lm(e))) {
    $5(e);
    return;
  }
  om(e, () => (0, im.topBoolOrEmptySchema)(e));
}
rt.validateFunctionCode = g5;
function om({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, q._)`${H.default.data}, ${H.default.valCxt}`, n.$async, () => {
    e.code((0, q._)`"use strict"; ${xd(r, s)}`), v5(e, s), e.code(a);
  }) : e.func(t, (0, q._)`${H.default.data}, ${y5(s)}`, n.$async, () => e.code(xd(r, s)).code(a));
}
function y5(e) {
  return (0, q._)`{${H.default.instancePath}="", ${H.default.parentData}, ${H.default.parentDataProperty}, ${H.default.rootData}=${H.default.data}${e.dynamicRef ? (0, q._)`, ${H.default.dynamicAnchors}={}` : q.nil}}={}`;
}
function v5(e, t) {
  e.if(H.default.valCxt, () => {
    e.var(H.default.instancePath, (0, q._)`${H.default.valCxt}.${H.default.instancePath}`), e.var(H.default.parentData, (0, q._)`${H.default.valCxt}.${H.default.parentData}`), e.var(H.default.parentDataProperty, (0, q._)`${H.default.valCxt}.${H.default.parentDataProperty}`), e.var(H.default.rootData, (0, q._)`${H.default.valCxt}.${H.default.rootData}`), t.dynamicRef && e.var(H.default.dynamicAnchors, (0, q._)`${H.default.valCxt}.${H.default.dynamicAnchors}`);
  }, () => {
    e.var(H.default.instancePath, (0, q._)`""`), e.var(H.default.parentData, (0, q._)`undefined`), e.var(H.default.parentDataProperty, (0, q._)`undefined`), e.var(H.default.rootData, H.default.data), t.dynamicRef && e.var(H.default.dynamicAnchors, (0, q._)`{}`);
  });
}
function $5(e) {
  const { schema: t, opts: r, gen: n } = e;
  om(e, () => {
    r.$comment && t.$comment && fm(e), S5(e), n.let(H.default.vErrors, null), n.let(H.default.errors, 0), r.unevaluated && b5(e), dm(e), O5(e);
  });
}
function b5(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, q._)`${r}.evaluated`), t.if((0, q._)`${e.evaluated}.dynamicProps`, () => t.assign((0, q._)`${e.evaluated}.props`, (0, q._)`undefined`)), t.if((0, q._)`${e.evaluated}.dynamicItems`, () => t.assign((0, q._)`${e.evaluated}.items`, (0, q._)`undefined`));
}
function xd(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, q._)`/*# sourceURL=${r} */` : q.nil;
}
function _5(e, t) {
  if (cm(e) && (um(e), lm(e))) {
    w5(e, t);
    return;
  }
  (0, im.boolOrEmptySchema)(e, t);
}
function lm({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function cm(e) {
  return typeof e.schema != "boolean";
}
function w5(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && fm(e), j5(e), E5(e);
  const a = n.const("_errs", H.default.errors);
  dm(e, a), n.var(t, (0, q._)`${a} === ${H.default.errors}`);
}
function um(e) {
  (0, wt.checkUnknownRules)(e), x5(e);
}
function dm(e, t) {
  if (e.opts.jtd)
    return Sd(e, [], !1, t);
  const r = (0, wd.getSchemaTypes)(e.schema), n = (0, wd.coerceAndCheckDataType)(e, r);
  Sd(e, r, !n, t);
}
function x5(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, wt.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function S5(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, wt.checkStrictMode)(e, "default is ignored in the schema root");
}
function j5(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, m5.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function E5(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function fm({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, q._)`${H.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const i = (0, q.str)`${n}/$comment`, o = e.scopeValue("root", { ref: t.root });
    e.code((0, q._)`${H.default.self}.opts.$comment(${a}, ${i}, ${o}.schema)`);
  }
}
function O5(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, q._)`${H.default.errors} === 0`, () => t.return(H.default.data), () => t.throw((0, q._)`new ${s}(${H.default.vErrors})`)) : (t.assign((0, q._)`${n}.errors`, H.default.vErrors), a.unevaluated && A5(e), t.return((0, q._)`${H.default.errors} === 0`));
}
function A5({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof q.Name && e.assign((0, q._)`${t}.props`, r), n instanceof q.Name && e.assign((0, q._)`${t}.items`, n);
}
function Sd(e, t, r, n) {
  const { gen: s, schema: a, data: i, allErrors: o, opts: l, self: u } = e, { RULES: c } = u;
  if (a.$ref && (l.ignoreKeywordsWithRef || !(0, wt.schemaHasRulesButRef)(a, c))) {
    s.block(() => mm(e, "$ref", c.all.$ref.definition));
    return;
  }
  l.jtd || N5(e, t), s.block(() => {
    for (const m of c.rules)
      f(m);
    f(c.post);
  });
  function f(m) {
    (0, ml.shouldUseGroup)(a, m) && (m.type ? (s.if((0, zs.checkDataType)(m.type, i, l.strictNumbers)), jd(e, m), t.length === 1 && t[0] === m.type && r && (s.else(), (0, zs.reportTypeError)(e)), s.endIf()) : jd(e, m), o || s.if((0, q._)`${H.default.errors} === ${n || 0}`));
  }
}
function jd(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, h5.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, ml.shouldUseRule)(n, a) && mm(e, a.keyword, a.definition, t.type);
  });
}
function N5(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (P5(e, t), e.opts.allowUnionTypes || C5(e, t), T5(e, e.dataTypes));
}
function P5(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      pm(e.dataTypes, r) || gl(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), F5(e, t);
  }
}
function C5(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && gl(e, "use allowUnionTypes to allow union type keyword");
}
function T5(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, ml.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((i) => I5(t, i)) && gl(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function I5(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function pm(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function F5(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    pm(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function gl(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, wt.checkStrictMode)(e, t, e.opts.strictTypes);
}
class hm {
  constructor(t, r, n) {
    if ((0, $n.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, wt.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", gm(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, $n.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", H.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, q.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, q.not)(t), void 0, r);
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
    this.fail((0, q._)`${r} !== undefined && (${(0, q.or)(this.invalid$data(), t)})`);
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
  block$data(t, r, n = q.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = q.nil, r = q.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: s, schemaType: a, def: i } = this;
    n.if((0, q.or)((0, q._)`${s} === undefined`, r)), t !== q.nil && n.assign(t, !0), (a.length || i.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== q.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: a } = this;
    return (0, q.or)(i(), o());
    function i() {
      if (n.length) {
        if (!(r instanceof q.Name))
          throw new Error("ajv implementation error");
        const l = Array.isArray(n) ? n : [n];
        return (0, q._)`${(0, zs.checkDataTypes)(l, r, a.opts.strictNumbers, zs.DataType.Wrong)}`;
      }
      return q.nil;
    }
    function o() {
      if (s.validateSchema) {
        const l = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, q._)`!${l}(${r})`;
      }
      return q.nil;
    }
  }
  subschema(t, r) {
    const n = (0, fi.getSubschema)(this.it, t);
    (0, fi.extendSubschemaData)(n, this.it, t), (0, fi.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return _5(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = wt.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = wt.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, q.Name)), !0;
  }
}
rt.KeywordCxt = hm;
function mm(e, t, r, n) {
  const s = new hm(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, $n.funcKeywordCode)(s, r) : "macro" in r ? (0, $n.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, $n.funcKeywordCode)(s, r);
}
const k5 = /^\/(?:[^~]|~0|~1)*$/, D5 = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function gm(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return H.default.rootData;
  if (e[0] === "/") {
    if (!k5.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = H.default.rootData;
  } else {
    const u = D5.exec(e);
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
    u && (a = (0, q._)`${a}${(0, q.getProperty)((0, wt.unescapeJsonPointer)(u))}`, i = (0, q._)`${i} && ${a}`);
  return i;
  function l(u, c) {
    return `Cannot access ${u} ${c} levels up, current level is ${t}`;
  }
}
rt.getData = gm;
var Qn = {};
Object.defineProperty(Qn, "__esModule", { value: !0 });
class R5 extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
Qn.default = R5;
var Jr = {};
Object.defineProperty(Jr, "__esModule", { value: !0 });
const pi = Ce;
class M5 extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, pi.resolveUrl)(t, r, n), this.missingSchema = (0, pi.normalizeId)((0, pi.getFullPath)(t, this.missingRef));
  }
}
Jr.default = M5;
var Re = {};
Object.defineProperty(Re, "__esModule", { value: !0 });
Re.resolveSchema = Re.getCompilingSchema = Re.resolveRef = Re.compileSchema = Re.SchemaEnv = void 0;
const Ye = Y, L5 = Qn, qt = mt, Qe = Ce, Ed = L, U5 = rt;
class Ra {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Qe.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Re.SchemaEnv = Ra;
function yl(e) {
  const t = ym.call(this, e);
  if (t)
    return t;
  const r = (0, Qe.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new Ye.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let o;
  e.$async && (o = i.scopeValue("Error", {
    ref: L5.default,
    code: (0, Ye._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const l = i.scopeName("validate");
  e.validateName = l;
  const u = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: qt.default.data,
    parentData: qt.default.parentData,
    parentDataProperty: qt.default.parentDataProperty,
    dataNames: [qt.default.data],
    dataPathArr: [Ye.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: i.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Ye.stringify)(e.schema) } : { ref: e.schema }),
    validateName: l,
    ValidationError: o,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Ye.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Ye._)`""`,
    opts: this.opts,
    self: this
  };
  let c;
  try {
    this._compilations.add(e), (0, U5.validateFunctionCode)(u), i.optimize(this.opts.code.optimize);
    const f = i.toString();
    c = `${i.scopeRefs(qt.default.scope)}return ${f}`, this.opts.code.process && (c = this.opts.code.process(c, e));
    const h = new Function(`${qt.default.self}`, `${qt.default.scope}`, c)(this, this.scope.get());
    if (this.scope.value(l, { ref: h }), h.errors = null, h.schema = e.schema, h.schemaEnv = e, e.$async && (h.$async = !0), this.opts.code.source === !0 && (h.source = { validateName: l, validateCode: f, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: y, items: v } = u;
      h.evaluated = {
        props: y instanceof Ye.Name ? void 0 : y,
        items: v instanceof Ye.Name ? void 0 : v,
        dynamicProps: y instanceof Ye.Name,
        dynamicItems: v instanceof Ye.Name
      }, h.source && (h.source.evaluated = (0, Ye.stringify)(h.evaluated));
    }
    return e.validate = h, e;
  } catch (f) {
    throw delete e.validate, delete e.validateName, c && this.logger.error("Error compiling schema, function code:", c), f;
  } finally {
    this._compilations.delete(e);
  }
}
Re.compileSchema = yl;
function W5(e, t, r) {
  var n;
  r = (0, Qe.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = B5.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: o } = this.opts;
    i && (a = new Ra({ schema: i, schemaId: o, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = V5.call(this, a);
}
Re.resolveRef = W5;
function V5(e) {
  return (0, Qe.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : yl.call(this, e);
}
function ym(e) {
  for (const t of this._compilations)
    if (z5(t, e))
      return t;
}
Re.getCompilingSchema = ym;
function z5(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function B5(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || Ma.call(this, e, t);
}
function Ma(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Qe._getFullPath)(this.opts.uriResolver, r);
  let s = (0, Qe.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return hi.call(this, r, e);
  const a = (0, Qe.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const o = Ma.call(this, e, i);
    return typeof (o == null ? void 0 : o.schema) != "object" ? void 0 : hi.call(this, r, o);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || yl.call(this, i), a === (0, Qe.normalizeId)(t)) {
      const { schema: o } = i, { schemaId: l } = this.opts, u = o[l];
      return u && (s = (0, Qe.resolveUrl)(this.opts.uriResolver, s, u)), new Ra({ schema: o, schemaId: l, root: e, baseId: s });
    }
    return hi.call(this, r, i);
  }
}
Re.resolveSchema = Ma;
const q5 = /* @__PURE__ */ new Set([
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
    !q5.has(o) && u && (t = (0, Qe.resolveUrl)(this.opts.uriResolver, t, u));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, Ed.schemaHasRulesButRef)(r, this.RULES)) {
    const o = (0, Qe.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = Ma.call(this, n, o);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new Ra({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const K5 = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", G5 = "Meta-schema for $data reference (JSON AnySchema extension proposal)", H5 = "object", J5 = [
  "$data"
], Y5 = {
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
}, Z5 = !1, X5 = {
  $id: K5,
  description: G5,
  type: H5,
  required: J5,
  properties: Y5,
  additionalProperties: Z5
};
var vl = {}, La = { exports: {} };
const Q5 = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), vm = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function $m(e) {
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
const eL = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function Od(e) {
  return e.length = 0, !0;
}
function tL(e, t, r) {
  if (e.length) {
    const n = $m(e);
    if (n !== "")
      t.push(n);
    else
      return r.error = !0, !1;
    e.length = 0;
  }
  return !0;
}
function rL(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], s = [];
  let a = !1, i = !1, o = tL;
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
  return s.length && (o === Od ? r.zone = s.join("") : i ? n.push(s.join("")) : n.push($m(s))), r.address = n.join(""), r;
}
function bm(e) {
  if (nL(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = rL(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, isIPV6: !0, escapedHost: n };
  }
}
function nL(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
function sL(e) {
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
function aL(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function iL(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    if (!vm(r)) {
      const n = bm(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var _m = {
  nonSimpleDomain: eL,
  recomposeAuthority: iL,
  normalizeComponentEncoding: aL,
  removeDotSegments: sL,
  isIPv4: vm,
  isUUID: Q5,
  normalizeIPv6: bm
};
const { isUUID: oL } = _m, lL = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function wm(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function xm(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function Sm(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function cL(e) {
  return e.secure = wm(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function uL(e) {
  if ((e.port === (wm(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function dL(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(lL);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const s = `${n}:${t.nid || e.nid}`, a = $l(s);
    e.path = void 0, a && (e = a.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function fL(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), s = `${r}:${t.nid || n}`, a = $l(s);
  a && (e = a.serialize(e, t));
  const i = e, o = e.nss;
  return i.path = `${n || t.nid}:${o}`, t.skipEscape = !0, i;
}
function pL(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !oL(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function hL(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const jm = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: xm,
    serialize: Sm
  }
), mL = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: jm.domainHost,
    parse: xm,
    serialize: Sm
  }
), Es = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: !0,
    parse: cL,
    serialize: uL
  }
), gL = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: Es.domainHost,
    parse: Es.parse,
    serialize: Es.serialize
  }
), yL = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: dL,
    serialize: fL,
    skipNormalize: !0
  }
), vL = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: pL,
    serialize: hL,
    skipNormalize: !0
  }
), Bs = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: jm,
    https: mL,
    ws: Es,
    wss: gL,
    urn: yL,
    "urn:uuid": vL
  }
);
Object.setPrototypeOf(Bs, null);
function $l(e) {
  return e && (Bs[
    /** @type {SchemeName} */
    e
  ] || Bs[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var $L = {
  SCHEMES: Bs,
  getSchemeHandler: $l
};
const { normalizeIPv6: bL, removeDotSegments: dn, recomposeAuthority: _L, normalizeComponentEncoding: us, isIPv4: wL, nonSimpleDomain: xL } = _m, { SCHEMES: SL, getSchemeHandler: Em } = $L;
function jL(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  ct(Et(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  Et(ct(e, t), t)), e;
}
function EL(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, s = Om(Et(e, n), Et(t, n), n, !0);
  return n.skipEscape = !0, ct(s, n);
}
function Om(e, t, r, n) {
  const s = {};
  return n || (e = Et(ct(e, r), r), t = Et(ct(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = dn(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = dn(t.path || ""), s.query = t.query) : (t.path ? (t.path[0] === "/" ? s.path = dn(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = dn(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function OL(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = ct(us(Et(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = ct(us(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = ct(us(Et(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = ct(us(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function ct(e, t) {
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
  }, n = Object.assign({}, t), s = [], a = Em(n.scheme || r.scheme);
  a && a.serialize && a.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && s.push(r.scheme, ":");
  const i = _L(r);
  if (i !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(i), r.path && r.path[0] !== "/" && s.push("/")), r.path !== void 0) {
    let o = r.path;
    !n.absolutePath && (!a || !a.absolutePath) && (o = dn(o)), i === void 0 && o[0] === "/" && o[1] === "/" && (o = "/%2F" + o.slice(2)), s.push(o);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const AL = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function Et(e, t) {
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
  const a = e.match(AL);
  if (a) {
    if (n.scheme = a[1], n.userinfo = a[3], n.host = a[4], n.port = parseInt(a[5], 10), n.path = a[6] || "", n.query = a[7], n.fragment = a[8], isNaN(n.port) && (n.port = a[5]), n.host)
      if (wL(n.host) === !1) {
        const l = bL(n.host);
        n.host = l.host.toLowerCase(), s = l.isIPV6;
      } else
        s = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const i = Em(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!i || !i.unicodeSupport) && n.host && (r.domainHost || i && i.domainHost) && s === !1 && xL(n.host))
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
const bl = {
  SCHEMES: SL,
  normalize: jL,
  resolve: EL,
  resolveComponent: Om,
  equal: OL,
  serialize: ct,
  parse: Et
};
La.exports = bl;
La.exports.default = bl;
La.exports.fastUri = bl;
var NL = La.exports;
Object.defineProperty(vl, "__esModule", { value: !0 });
const Am = NL;
Am.code = 'require("ajv/dist/runtime/uri").default';
vl.default = Am;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = rt;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = Y;
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
  const n = Qn, s = Jr, a = rr, i = Re, o = Y, l = Ce, u = je, c = L, f = X5, m = vl, h = (k, E) => new RegExp(k, E);
  h.code = "new RegExp";
  const y = ["removeAdditional", "useDefaults", "coerceTypes"], v = /* @__PURE__ */ new Set([
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
  ]), g = {
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
  }, $ = 200;
  function b(k) {
    var E, T, O, _, S, I, W, V, ne, re, we, Je, Wt, Pt, ke, Vt, zt, pr, Xr, Qr, en, tn, K, le, gt;
    const Ct = k.strict, Me = (E = k.code) === null || E === void 0 ? void 0 : E.optimize, ts = Me === !0 || Me === void 0 ? 1 : Me || 0, yt = (O = (T = k.code) === null || T === void 0 ? void 0 : T.regExp) !== null && O !== void 0 ? O : h, Vm = (_ = k.uriResolver) !== null && _ !== void 0 ? _ : m.default;
    return {
      strictSchema: (I = (S = k.strictSchema) !== null && S !== void 0 ? S : Ct) !== null && I !== void 0 ? I : !0,
      strictNumbers: (V = (W = k.strictNumbers) !== null && W !== void 0 ? W : Ct) !== null && V !== void 0 ? V : !0,
      strictTypes: (re = (ne = k.strictTypes) !== null && ne !== void 0 ? ne : Ct) !== null && re !== void 0 ? re : "log",
      strictTuples: (Je = (we = k.strictTuples) !== null && we !== void 0 ? we : Ct) !== null && Je !== void 0 ? Je : "log",
      strictRequired: (Pt = (Wt = k.strictRequired) !== null && Wt !== void 0 ? Wt : Ct) !== null && Pt !== void 0 ? Pt : !1,
      code: k.code ? { ...k.code, optimize: ts, regExp: yt } : { optimize: ts, regExp: yt },
      loopRequired: (ke = k.loopRequired) !== null && ke !== void 0 ? ke : $,
      loopEnum: (Vt = k.loopEnum) !== null && Vt !== void 0 ? Vt : $,
      meta: (zt = k.meta) !== null && zt !== void 0 ? zt : !0,
      messages: (pr = k.messages) !== null && pr !== void 0 ? pr : !0,
      inlineRefs: (Xr = k.inlineRefs) !== null && Xr !== void 0 ? Xr : !0,
      schemaId: (Qr = k.schemaId) !== null && Qr !== void 0 ? Qr : "$id",
      addUsedSchema: (en = k.addUsedSchema) !== null && en !== void 0 ? en : !0,
      validateSchema: (tn = k.validateSchema) !== null && tn !== void 0 ? tn : !0,
      validateFormats: (K = k.validateFormats) !== null && K !== void 0 ? K : !0,
      unicodeRegExp: (le = k.unicodeRegExp) !== null && le !== void 0 ? le : !0,
      int32range: (gt = k.int32range) !== null && gt !== void 0 ? gt : !0,
      uriResolver: Vm
    };
  }
  class w {
    constructor(E = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), E = this.opts = { ...E, ...b(E) };
      const { es5: T, lines: O } = this.opts.code;
      this.scope = new o.ValueScope({ scope: {}, prefixes: v, es5: T, lines: O }), this.logger = D(E.logger);
      const _ = E.validateFormats;
      E.validateFormats = !1, this.RULES = (0, a.getRules)(), x.call(this, g, E, "NOT SUPPORTED"), x.call(this, p, E, "DEPRECATED", "warn"), this._metaOpts = C.call(this), E.formats && N.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), E.keywords && A.call(this, E.keywords), typeof E.meta == "object" && this.addMetaSchema(E.meta), j.call(this), E.validateFormats = _;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: E, meta: T, schemaId: O } = this.opts;
      let _ = f;
      O === "id" && (_ = { ...f }, _.id = _.$id, delete _.$id), T && E && this.addMetaSchema(_, _[O], !1);
    }
    defaultMeta() {
      const { meta: E, schemaId: T } = this.opts;
      return this.opts.defaultMeta = typeof E == "object" ? E[T] || E : void 0;
    }
    validate(E, T) {
      let O;
      if (typeof E == "string") {
        if (O = this.getSchema(E), !O)
          throw new Error(`no schema with key or ref "${E}"`);
      } else
        O = this.compile(E);
      const _ = O(T);
      return "$async" in O || (this.errors = O.errors), _;
    }
    compile(E, T) {
      const O = this._addSchema(E, T);
      return O.validate || this._compileSchemaEnv(O);
    }
    compileAsync(E, T) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: O } = this.opts;
      return _.call(this, E, T);
      async function _(re, we) {
        await S.call(this, re.$schema);
        const Je = this._addSchema(re, we);
        return Je.validate || I.call(this, Je);
      }
      async function S(re) {
        re && !this.getSchema(re) && await _.call(this, { $ref: re }, !0);
      }
      async function I(re) {
        try {
          return this._compileSchemaEnv(re);
        } catch (we) {
          if (!(we instanceof s.default))
            throw we;
          return W.call(this, we), await V.call(this, we.missingSchema), I.call(this, re);
        }
      }
      function W({ missingSchema: re, missingRef: we }) {
        if (this.refs[re])
          throw new Error(`AnySchema ${re} is loaded but ${we} cannot be resolved`);
      }
      async function V(re) {
        const we = await ne.call(this, re);
        this.refs[re] || await S.call(this, we.$schema), this.refs[re] || this.addSchema(we, re, T);
      }
      async function ne(re) {
        const we = this._loading[re];
        if (we)
          return we;
        try {
          return await (this._loading[re] = O(re));
        } finally {
          delete this._loading[re];
        }
      }
    }
    // Adds schema to the instance
    addSchema(E, T, O, _ = this.opts.validateSchema) {
      if (Array.isArray(E)) {
        for (const I of E)
          this.addSchema(I, void 0, O, _);
        return this;
      }
      let S;
      if (typeof E == "object") {
        const { schemaId: I } = this.opts;
        if (S = E[I], S !== void 0 && typeof S != "string")
          throw new Error(`schema ${I} must be string`);
      }
      return T = (0, l.normalizeId)(T || S), this._checkUnique(T), this.schemas[T] = this._addSchema(E, O, T, _, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(E, T, O = this.opts.validateSchema) {
      return this.addSchema(E, T, !0, O), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(E, T) {
      if (typeof E == "boolean")
        return !0;
      let O;
      if (O = E.$schema, O !== void 0 && typeof O != "string")
        throw new Error("$schema must be a string");
      if (O = O || this.opts.defaultMeta || this.defaultMeta(), !O)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const _ = this.validate(O, E);
      if (!_ && T) {
        const S = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(S);
        else
          throw new Error(S);
      }
      return _;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(E) {
      let T;
      for (; typeof (T = P.call(this, E)) == "string"; )
        E = T;
      if (T === void 0) {
        const { schemaId: O } = this.opts, _ = new i.SchemaEnv({ schema: {}, schemaId: O });
        if (T = i.resolveSchema.call(this, _, E), !T)
          return;
        this.refs[E] = T;
      }
      return T.validate || this._compileSchemaEnv(T);
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
          const T = P.call(this, E);
          return typeof T == "object" && this._cache.delete(T.schema), delete this.schemas[E], delete this.refs[E], this;
        }
        case "object": {
          const T = E;
          this._cache.delete(T);
          let O = E[this.opts.schemaId];
          return O && (O = (0, l.normalizeId)(O), delete this.schemas[O], delete this.refs[O]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(E) {
      for (const T of E)
        this.addKeyword(T);
      return this;
    }
    addKeyword(E, T) {
      let O;
      if (typeof E == "string")
        O = E, typeof T == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), T.keyword = O);
      else if (typeof E == "object" && T === void 0) {
        if (T = E, O = T.keyword, Array.isArray(O) && !O.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (M.call(this, O, T), !T)
        return (0, c.eachItem)(O, (S) => B.call(this, S)), this;
      Q.call(this, T);
      const _ = {
        ...T,
        type: (0, u.getJSONTypes)(T.type),
        schemaType: (0, u.getJSONTypes)(T.schemaType)
      };
      return (0, c.eachItem)(O, _.type.length === 0 ? (S) => B.call(this, S, _) : (S) => _.type.forEach((I) => B.call(this, S, _, I))), this;
    }
    getKeyword(E) {
      const T = this.RULES.all[E];
      return typeof T == "object" ? T.definition : !!T;
    }
    // Remove keyword
    removeKeyword(E) {
      const { RULES: T } = this;
      delete T.keywords[E], delete T.all[E];
      for (const O of T.rules) {
        const _ = O.rules.findIndex((S) => S.keyword === E);
        _ >= 0 && O.rules.splice(_, 1);
      }
      return this;
    }
    // Add format
    addFormat(E, T) {
      return typeof T == "string" && (T = new RegExp(T)), this.formats[E] = T, this;
    }
    errorsText(E = this.errors, { separator: T = ", ", dataVar: O = "data" } = {}) {
      return !E || E.length === 0 ? "No errors" : E.map((_) => `${O}${_.instancePath} ${_.message}`).reduce((_, S) => _ + T + S);
    }
    $dataMetaSchema(E, T) {
      const O = this.RULES.all;
      E = JSON.parse(JSON.stringify(E));
      for (const _ of T) {
        const S = _.split("/").slice(1);
        let I = E;
        for (const W of S)
          I = I[W];
        for (const W in O) {
          const V = O[W];
          if (typeof V != "object")
            continue;
          const { $data: ne } = V.definition, re = I[W];
          ne && re && (I[W] = ee(re));
        }
      }
      return E;
    }
    _removeAllSchemas(E, T) {
      for (const O in E) {
        const _ = E[O];
        (!T || T.test(O)) && (typeof _ == "string" ? delete E[O] : _ && !_.meta && (this._cache.delete(_.schema), delete E[O]));
      }
    }
    _addSchema(E, T, O, _ = this.opts.validateSchema, S = this.opts.addUsedSchema) {
      let I;
      const { schemaId: W } = this.opts;
      if (typeof E == "object")
        I = E[W];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof E != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let V = this._cache.get(E);
      if (V !== void 0)
        return V;
      O = (0, l.normalizeId)(I || O);
      const ne = l.getSchemaRefs.call(this, E, O);
      return V = new i.SchemaEnv({ schema: E, schemaId: W, meta: T, baseId: O, localRefs: ne }), this._cache.set(V.schema, V), S && !O.startsWith("#") && (O && this._checkUnique(O), this.refs[O] = V), _ && this.validateSchema(E, !0), V;
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
      const T = this.opts;
      this.opts = this._metaOpts;
      try {
        i.compileSchema.call(this, E);
      } finally {
        this.opts = T;
      }
    }
  }
  w.ValidationError = n.default, w.MissingRefError = s.default, e.default = w;
  function x(k, E, T, O = "error") {
    for (const _ in k) {
      const S = _;
      S in E && this.logger[O](`${T}: option ${_}. ${k[S]}`);
    }
  }
  function P(k) {
    return k = (0, l.normalizeId)(k), this.schemas[k] || this.refs[k];
  }
  function j() {
    const k = this.opts.schemas;
    if (k)
      if (Array.isArray(k))
        this.addSchema(k);
      else
        for (const E in k)
          this.addSchema(k[E], E);
  }
  function N() {
    for (const k in this.opts.formats) {
      const E = this.opts.formats[k];
      E && this.addFormat(k, E);
    }
  }
  function A(k) {
    if (Array.isArray(k)) {
      this.addVocabulary(k);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const E in k) {
      const T = k[E];
      T.keyword || (T.keyword = E), this.addKeyword(T);
    }
  }
  function C() {
    const k = { ...this.opts };
    for (const E of y)
      delete k[E];
    return k;
  }
  const F = { log() {
  }, warn() {
  }, error() {
  } };
  function D(k) {
    if (k === !1)
      return F;
    if (k === void 0)
      return console;
    if (k.log && k.warn && k.error)
      return k;
    throw new Error("logger must implement log, warn and error methods");
  }
  const U = /^[a-z_$][a-z0-9_$:-]*$/i;
  function M(k, E) {
    const { RULES: T } = this;
    if ((0, c.eachItem)(k, (O) => {
      if (T.keywords[O])
        throw new Error(`Keyword ${O} is already defined`);
      if (!U.test(O))
        throw new Error(`Keyword ${O} has invalid name`);
    }), !!E && E.$data && !("code" in E || "validate" in E))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function B(k, E, T) {
    var O;
    const _ = E == null ? void 0 : E.post;
    if (T && _)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: S } = this;
    let I = _ ? S.post : S.rules.find(({ type: V }) => V === T);
    if (I || (I = { type: T, rules: [] }, S.rules.push(I)), S.keywords[k] = !0, !E)
      return;
    const W = {
      keyword: k,
      definition: {
        ...E,
        type: (0, u.getJSONTypes)(E.type),
        schemaType: (0, u.getJSONTypes)(E.schemaType)
      }
    };
    E.before ? R.call(this, I, W, E.before) : I.rules.push(W), S.all[k] = W, (O = E.implements) === null || O === void 0 || O.forEach((V) => this.addKeyword(V));
  }
  function R(k, E, T) {
    const O = k.rules.findIndex((_) => _.keyword === T);
    O >= 0 ? k.rules.splice(O, 0, E) : (k.rules.push(E), this.logger.warn(`rule ${T} is not defined`));
  }
  function Q(k) {
    let { metaSchema: E } = k;
    E !== void 0 && (k.$data && this.opts.$data && (E = ee(E)), k.validateSchema = this.compile(E, !0));
  }
  const Z = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function ee(k) {
    return { anyOf: [k, Z] };
  }
})(Lh);
var _l = {}, wl = {}, xl = {};
Object.defineProperty(xl, "__esModule", { value: !0 });
const PL = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
xl.default = PL;
var nr = {};
Object.defineProperty(nr, "__esModule", { value: !0 });
nr.callRef = nr.getValidate = void 0;
const CL = Jr, Ad = X, De = Y, gr = mt, Nd = Re, ds = L, TL = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: o, self: l } = n, { root: u } = a;
    if ((r === "#" || r === "#/") && s === u.baseId)
      return f();
    const c = Nd.resolveRef.call(l, u, s, r);
    if (c === void 0)
      throw new CL.default(n.opts.uriResolver, s, r);
    if (c instanceof Nd.SchemaEnv)
      return m(c);
    return h(c);
    function f() {
      if (a === u)
        return Os(e, i, a, a.$async);
      const y = t.scopeValue("root", { ref: u });
      return Os(e, (0, De._)`${y}.validate`, u, u.$async);
    }
    function m(y) {
      const v = Nm(e, y);
      Os(e, v, y, y.$async);
    }
    function h(y) {
      const v = t.scopeValue("schema", o.code.source === !0 ? { ref: y, code: (0, De.stringify)(y) } : { ref: y }), g = t.name("valid"), p = e.subschema({
        schema: y,
        dataTypes: [],
        schemaPath: De.nil,
        topSchemaRef: v,
        errSchemaPath: r
      }, g);
      e.mergeEvaluated(p), e.ok(g);
    }
  }
};
function Nm(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, De._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
nr.getValidate = Nm;
function Os(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: o, opts: l } = a, u = l.passContext ? gr.default.this : De.nil;
  n ? c() : f();
  function c() {
    if (!o.$async)
      throw new Error("async schema referenced by sync schema");
    const y = s.let("valid");
    s.try(() => {
      s.code((0, De._)`await ${(0, Ad.callValidateCode)(e, t, u)}`), h(t), i || s.assign(y, !0);
    }, (v) => {
      s.if((0, De._)`!(${v} instanceof ${a.ValidationError})`, () => s.throw(v)), m(v), i || s.assign(y, !1);
    }), e.ok(y);
  }
  function f() {
    e.result((0, Ad.callValidateCode)(e, t, u), () => h(t), () => m(t));
  }
  function m(y) {
    const v = (0, De._)`${y}.errors`;
    s.assign(gr.default.vErrors, (0, De._)`${gr.default.vErrors} === null ? ${v} : ${gr.default.vErrors}.concat(${v})`), s.assign(gr.default.errors, (0, De._)`${gr.default.vErrors}.length`);
  }
  function h(y) {
    var v;
    if (!a.opts.unevaluated)
      return;
    const g = (v = r == null ? void 0 : r.validate) === null || v === void 0 ? void 0 : v.evaluated;
    if (a.props !== !0)
      if (g && !g.dynamicProps)
        g.props !== void 0 && (a.props = ds.mergeEvaluated.props(s, g.props, a.props));
      else {
        const p = s.var("props", (0, De._)`${y}.evaluated.props`);
        a.props = ds.mergeEvaluated.props(s, p, a.props, De.Name);
      }
    if (a.items !== !0)
      if (g && !g.dynamicItems)
        g.items !== void 0 && (a.items = ds.mergeEvaluated.items(s, g.items, a.items));
      else {
        const p = s.var("items", (0, De._)`${y}.evaluated.items`);
        a.items = ds.mergeEvaluated.items(s, p, a.items, De.Name);
      }
  }
}
nr.callRef = Os;
nr.default = TL;
Object.defineProperty(wl, "__esModule", { value: !0 });
const IL = xl, FL = nr, kL = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  IL.default,
  FL.default
];
wl.default = kL;
var Sl = {}, jl = {};
Object.defineProperty(jl, "__esModule", { value: !0 });
const qs = Y, Ft = qs.operators, Ks = {
  maximum: { okStr: "<=", ok: Ft.LTE, fail: Ft.GT },
  minimum: { okStr: ">=", ok: Ft.GTE, fail: Ft.LT },
  exclusiveMaximum: { okStr: "<", ok: Ft.LT, fail: Ft.GTE },
  exclusiveMinimum: { okStr: ">", ok: Ft.GT, fail: Ft.LTE }
}, DL = {
  message: ({ keyword: e, schemaCode: t }) => (0, qs.str)`must be ${Ks[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, qs._)`{comparison: ${Ks[e].okStr}, limit: ${t}}`
}, RL = {
  keyword: Object.keys(Ks),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: DL,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, qs._)`${r} ${Ks[t].fail} ${n} || isNaN(${r})`);
  }
};
jl.default = RL;
var El = {};
Object.defineProperty(El, "__esModule", { value: !0 });
const bn = Y, ML = {
  message: ({ schemaCode: e }) => (0, bn.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, bn._)`{multipleOf: ${e}}`
}, LL = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: ML,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), o = a ? (0, bn._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, bn._)`${i} !== parseInt(${i})`;
    e.fail$data((0, bn._)`(${n} === 0 || (${i} = ${r}/${n}, ${o}))`);
  }
};
El.default = LL;
var Ol = {}, Al = {};
Object.defineProperty(Al, "__esModule", { value: !0 });
function Pm(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Al.default = Pm;
Pm.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Ol, "__esModule", { value: !0 });
const Yt = Y, UL = L, WL = Al, VL = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Yt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Yt._)`{limit: ${e}}`
}, zL = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: VL,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Yt.operators.GT : Yt.operators.LT, i = s.opts.unicode === !1 ? (0, Yt._)`${r}.length` : (0, Yt._)`${(0, UL.useFunc)(e.gen, WL.default)}(${r})`;
    e.fail$data((0, Yt._)`${i} ${a} ${n}`);
  }
};
Ol.default = zL;
var Nl = {};
Object.defineProperty(Nl, "__esModule", { value: !0 });
const BL = X, Gs = Y, qL = {
  message: ({ schemaCode: e }) => (0, Gs.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Gs._)`{pattern: ${e}}`
}, KL = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: qL,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, i = a.opts.unicodeRegExp ? "u" : "", o = r ? (0, Gs._)`(new RegExp(${s}, ${i}))` : (0, BL.usePattern)(e, n);
    e.fail$data((0, Gs._)`!${o}.test(${t})`);
  }
};
Nl.default = KL;
var Pl = {};
Object.defineProperty(Pl, "__esModule", { value: !0 });
const _n = Y, GL = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, _n.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, _n._)`{limit: ${e}}`
}, HL = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: GL,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? _n.operators.GT : _n.operators.LT;
    e.fail$data((0, _n._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
Pl.default = HL;
var Cl = {};
Object.defineProperty(Cl, "__esModule", { value: !0 });
const cn = X, wn = Y, JL = L, YL = {
  message: ({ params: { missingProperty: e } }) => (0, wn.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, wn._)`{missingProperty: ${e}}`
}, ZL = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: YL,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: i } = e, { opts: o } = i;
    if (!a && r.length === 0)
      return;
    const l = r.length >= o.loopRequired;
    if (i.allErrors ? u() : c(), o.strictRequired) {
      const h = e.parentSchema.properties, { definedProperties: y } = e.it;
      for (const v of r)
        if ((h == null ? void 0 : h[v]) === void 0 && !y.has(v)) {
          const g = i.schemaEnv.baseId + i.errSchemaPath, p = `required property "${v}" is not defined at "${g}" (strictRequired)`;
          (0, JL.checkStrictMode)(i, p, i.opts.strictRequired);
        }
    }
    function u() {
      if (l || a)
        e.block$data(wn.nil, f);
      else
        for (const h of r)
          (0, cn.checkReportMissingProp)(e, h);
    }
    function c() {
      const h = t.let("missing");
      if (l || a) {
        const y = t.let("valid", !0);
        e.block$data(y, () => m(h, y)), e.ok(y);
      } else
        t.if((0, cn.checkMissingProp)(e, r, h)), (0, cn.reportMissingProp)(e, h), t.else();
    }
    function f() {
      t.forOf("prop", n, (h) => {
        e.setParams({ missingProperty: h }), t.if((0, cn.noPropertyInData)(t, s, h, o.ownProperties), () => e.error());
      });
    }
    function m(h, y) {
      e.setParams({ missingProperty: h }), t.forOf(h, n, () => {
        t.assign(y, (0, cn.propertyInData)(t, s, h, o.ownProperties)), t.if((0, wn.not)(y), () => {
          e.error(), t.break();
        });
      }, wn.nil);
    }
  }
};
Cl.default = ZL;
var Tl = {};
Object.defineProperty(Tl, "__esModule", { value: !0 });
const xn = Y, XL = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, xn.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, xn._)`{limit: ${e}}`
}, QL = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: XL,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? xn.operators.GT : xn.operators.LT;
    e.fail$data((0, xn._)`${r}.length ${s} ${n}`);
  }
};
Tl.default = QL;
var Il = {}, es = {};
Object.defineProperty(es, "__esModule", { value: !0 });
const Cm = tm;
Cm.code = 'require("ajv/dist/runtime/equal").default';
es.default = Cm;
Object.defineProperty(Il, "__esModule", { value: !0 });
const mi = je, Ne = Y, eU = L, tU = es, rU = {
  message: ({ params: { i: e, j: t } }) => (0, Ne.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Ne._)`{i: ${e}, j: ${t}}`
}, nU = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: rU,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: o } = e;
    if (!n && !s)
      return;
    const l = t.let("valid"), u = a.items ? (0, mi.getSchemaTypes)(a.items) : [];
    e.block$data(l, c, (0, Ne._)`${i} === false`), e.ok(l);
    function c() {
      const y = t.let("i", (0, Ne._)`${r}.length`), v = t.let("j");
      e.setParams({ i: y, j: v }), t.assign(l, !0), t.if((0, Ne._)`${y} > 1`, () => (f() ? m : h)(y, v));
    }
    function f() {
      return u.length > 0 && !u.some((y) => y === "object" || y === "array");
    }
    function m(y, v) {
      const g = t.name("item"), p = (0, mi.checkDataTypes)(u, g, o.opts.strictNumbers, mi.DataType.Wrong), $ = t.const("indices", (0, Ne._)`{}`);
      t.for((0, Ne._)`;${y}--;`, () => {
        t.let(g, (0, Ne._)`${r}[${y}]`), t.if(p, (0, Ne._)`continue`), u.length > 1 && t.if((0, Ne._)`typeof ${g} == "string"`, (0, Ne._)`${g} += "_"`), t.if((0, Ne._)`typeof ${$}[${g}] == "number"`, () => {
          t.assign(v, (0, Ne._)`${$}[${g}]`), e.error(), t.assign(l, !1).break();
        }).code((0, Ne._)`${$}[${g}] = ${y}`);
      });
    }
    function h(y, v) {
      const g = (0, eU.useFunc)(t, tU.default), p = t.name("outer");
      t.label(p).for((0, Ne._)`;${y}--;`, () => t.for((0, Ne._)`${v} = ${y}; ${v}--;`, () => t.if((0, Ne._)`${g}(${r}[${y}], ${r}[${v}])`, () => {
        e.error(), t.assign(l, !1).break(p);
      })));
    }
  }
};
Il.default = nU;
var Fl = {};
Object.defineProperty(Fl, "__esModule", { value: !0 });
const qi = Y, sU = L, aU = es, iU = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, qi._)`{allowedValue: ${e}}`
}, oU = {
  keyword: "const",
  $data: !0,
  error: iU,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, qi._)`!${(0, sU.useFunc)(t, aU.default)}(${r}, ${s})`) : e.fail((0, qi._)`${a} !== ${r}`);
  }
};
Fl.default = oU;
var kl = {};
Object.defineProperty(kl, "__esModule", { value: !0 });
const fn = Y, lU = L, cU = es, uU = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, fn._)`{allowedValues: ${e}}`
}, dU = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: uU,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const o = s.length >= i.opts.loopEnum;
    let l;
    const u = () => l ?? (l = (0, lU.useFunc)(t, cU.default));
    let c;
    if (o || n)
      c = t.let("valid"), e.block$data(c, f);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const h = t.const("vSchema", a);
      c = (0, fn.or)(...s.map((y, v) => m(h, v)));
    }
    e.pass(c);
    function f() {
      t.assign(c, !1), t.forOf("v", a, (h) => t.if((0, fn._)`${u()}(${r}, ${h})`, () => t.assign(c, !0).break()));
    }
    function m(h, y) {
      const v = s[y];
      return typeof v == "object" && v !== null ? (0, fn._)`${u()}(${r}, ${h}[${y}])` : (0, fn._)`${r} === ${v}`;
    }
  }
};
kl.default = dU;
Object.defineProperty(Sl, "__esModule", { value: !0 });
const fU = jl, pU = El, hU = Ol, mU = Nl, gU = Pl, yU = Cl, vU = Tl, $U = Il, bU = Fl, _U = kl, wU = [
  // number
  fU.default,
  pU.default,
  // string
  hU.default,
  mU.default,
  // object
  gU.default,
  yU.default,
  // array
  vU.default,
  $U.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  bU.default,
  _U.default
];
Sl.default = wU;
var Dl = {}, Yr = {};
Object.defineProperty(Yr, "__esModule", { value: !0 });
Yr.validateAdditionalItems = void 0;
const Zt = Y, Ki = L, xU = {
  message: ({ params: { len: e } }) => (0, Zt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Zt._)`{limit: ${e}}`
}, SU = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: xU,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Ki.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Tm(e, n);
  }
};
function Tm(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const o = r.const("len", (0, Zt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Zt._)`${o} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Ki.alwaysValidSchema)(i, n)) {
    const u = r.var("valid", (0, Zt._)`${o} <= ${t.length}`);
    r.if((0, Zt.not)(u), () => l(u)), e.ok(u);
  }
  function l(u) {
    r.forRange("i", t.length, o, (c) => {
      e.subschema({ keyword: a, dataProp: c, dataPropType: Ki.Type.Num }, u), i.allErrors || r.if((0, Zt.not)(u), () => r.break());
    });
  }
}
Yr.validateAdditionalItems = Tm;
Yr.default = SU;
var Rl = {}, Zr = {};
Object.defineProperty(Zr, "__esModule", { value: !0 });
Zr.validateTuple = void 0;
const Pd = Y, As = L, jU = X, EU = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Im(e, "additionalItems", t);
    r.items = !0, !(0, As.alwaysValidSchema)(r, t) && e.ok((0, jU.validateArray)(e));
  }
};
function Im(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: o } = e;
  c(s), o.opts.unevaluated && r.length && o.items !== !0 && (o.items = As.mergeEvaluated.items(n, r.length, o.items));
  const l = n.name("valid"), u = n.const("len", (0, Pd._)`${a}.length`);
  r.forEach((f, m) => {
    (0, As.alwaysValidSchema)(o, f) || (n.if((0, Pd._)`${u} > ${m}`, () => e.subschema({
      keyword: i,
      schemaProp: m,
      dataProp: m
    }, l)), e.ok(l));
  });
  function c(f) {
    const { opts: m, errSchemaPath: h } = o, y = r.length, v = y === f.minItems && (y === f.maxItems || f[t] === !1);
    if (m.strictTuples && !v) {
      const g = `"${i}" is ${y}-tuple, but minItems or maxItems/${t} are not specified or different at path "${h}"`;
      (0, As.checkStrictMode)(o, g, m.strictTuples);
    }
  }
}
Zr.validateTuple = Im;
Zr.default = EU;
Object.defineProperty(Rl, "__esModule", { value: !0 });
const OU = Zr, AU = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, OU.validateTuple)(e, "items")
};
Rl.default = AU;
var Ml = {};
Object.defineProperty(Ml, "__esModule", { value: !0 });
const Cd = Y, NU = L, PU = X, CU = Yr, TU = {
  message: ({ params: { len: e } }) => (0, Cd.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Cd._)`{limit: ${e}}`
}, IU = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: TU,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, NU.alwaysValidSchema)(n, t) && (s ? (0, CU.validateAdditionalItems)(e, s) : e.ok((0, PU.validateArray)(e)));
  }
};
Ml.default = IU;
var Ll = {};
Object.defineProperty(Ll, "__esModule", { value: !0 });
const ze = Y, fs = L, FU = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, ze.str)`must contain at least ${e} valid item(s)` : (0, ze.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, ze._)`{minContains: ${e}}` : (0, ze._)`{minContains: ${e}, maxContains: ${t}}`
}, kU = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: FU,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let i, o;
    const { minContains: l, maxContains: u } = n;
    a.opts.next ? (i = l === void 0 ? 1 : l, o = u) : i = 1;
    const c = t.const("len", (0, ze._)`${s}.length`);
    if (e.setParams({ min: i, max: o }), o === void 0 && i === 0) {
      (0, fs.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (o !== void 0 && i > o) {
      (0, fs.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, fs.alwaysValidSchema)(a, r)) {
      let v = (0, ze._)`${c} >= ${i}`;
      o !== void 0 && (v = (0, ze._)`${v} && ${c} <= ${o}`), e.pass(v);
      return;
    }
    a.items = !0;
    const f = t.name("valid");
    o === void 0 && i === 1 ? h(f, () => t.if(f, () => t.break())) : i === 0 ? (t.let(f, !0), o !== void 0 && t.if((0, ze._)`${s}.length > 0`, m)) : (t.let(f, !1), m()), e.result(f, () => e.reset());
    function m() {
      const v = t.name("_valid"), g = t.let("count", 0);
      h(v, () => t.if(v, () => y(g)));
    }
    function h(v, g) {
      t.forRange("i", 0, c, (p) => {
        e.subschema({
          keyword: "contains",
          dataProp: p,
          dataPropType: fs.Type.Num,
          compositeRule: !0
        }, v), g();
      });
    }
    function y(v) {
      t.code((0, ze._)`${v}++`), o === void 0 ? t.if((0, ze._)`${v} >= ${i}`, () => t.assign(f, !0).break()) : (t.if((0, ze._)`${v} > ${o}`, () => t.assign(f, !1).break()), i === 1 ? t.assign(f, !0) : t.if((0, ze._)`${v} >= ${i}`, () => t.assign(f, !0)));
    }
  }
};
Ll.default = kU;
var Fm = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = Y, r = L, n = X;
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
    for (const y in u) {
      const v = u[y];
      if (v.length === 0)
        continue;
      const g = (0, n.propertyInData)(c, f, y, m.opts.ownProperties);
      l.setParams({
        property: y,
        depsCount: v.length,
        deps: v.join(", ")
      }), m.allErrors ? c.if(g, () => {
        for (const p of v)
          (0, n.checkReportMissingProp)(l, p);
      }) : (c.if((0, t._)`${g} && (${(0, n.checkMissingProp)(l, v, h)})`), (0, n.reportMissingProp)(l, h), c.else());
    }
  }
  e.validatePropertyDeps = i;
  function o(l, u = l.schema) {
    const { gen: c, data: f, keyword: m, it: h } = l, y = c.name("valid");
    for (const v in u)
      (0, r.alwaysValidSchema)(h, u[v]) || (c.if(
        (0, n.propertyInData)(c, f, v, h.opts.ownProperties),
        () => {
          const g = l.subschema({ keyword: m, schemaProp: v }, y);
          l.mergeValidEvaluated(g, y);
        },
        () => c.var(y, !0)
        // TODO var
      ), l.ok(y));
  }
  e.validateSchemaDeps = o, e.default = s;
})(Fm);
var Ul = {};
Object.defineProperty(Ul, "__esModule", { value: !0 });
const km = Y, DU = L, RU = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, km._)`{propertyName: ${e.propertyName}}`
}, MU = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: RU,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, DU.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, km.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
Ul.default = MU;
var Ua = {};
Object.defineProperty(Ua, "__esModule", { value: !0 });
const ps = X, Ze = Y, LU = mt, hs = L, UU = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Ze._)`{additionalProperty: ${e.additionalProperty}}`
}, WU = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: UU,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: o, opts: l } = i;
    if (i.props = !0, l.removeAdditional !== "all" && (0, hs.alwaysValidSchema)(i, r))
      return;
    const u = (0, ps.allSchemaProperties)(n.properties), c = (0, ps.allSchemaProperties)(n.patternProperties);
    f(), e.ok((0, Ze._)`${a} === ${LU.default.errors}`);
    function f() {
      t.forIn("key", s, (g) => {
        !u.length && !c.length ? y(g) : t.if(m(g), () => y(g));
      });
    }
    function m(g) {
      let p;
      if (u.length > 8) {
        const $ = (0, hs.schemaRefOrVal)(i, n.properties, "properties");
        p = (0, ps.isOwnProperty)(t, $, g);
      } else u.length ? p = (0, Ze.or)(...u.map(($) => (0, Ze._)`${g} === ${$}`)) : p = Ze.nil;
      return c.length && (p = (0, Ze.or)(p, ...c.map(($) => (0, Ze._)`${(0, ps.usePattern)(e, $)}.test(${g})`))), (0, Ze.not)(p);
    }
    function h(g) {
      t.code((0, Ze._)`delete ${s}[${g}]`);
    }
    function y(g) {
      if (l.removeAdditional === "all" || l.removeAdditional && r === !1) {
        h(g);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: g }), e.error(), o || t.break();
        return;
      }
      if (typeof r == "object" && !(0, hs.alwaysValidSchema)(i, r)) {
        const p = t.name("valid");
        l.removeAdditional === "failing" ? (v(g, p, !1), t.if((0, Ze.not)(p), () => {
          e.reset(), h(g);
        })) : (v(g, p), o || t.if((0, Ze.not)(p), () => t.break()));
      }
    }
    function v(g, p, $) {
      const b = {
        keyword: "additionalProperties",
        dataProp: g,
        dataPropType: hs.Type.Str
      };
      $ === !1 && Object.assign(b, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(b, p);
    }
  }
};
Ua.default = WU;
var Wl = {};
Object.defineProperty(Wl, "__esModule", { value: !0 });
const VU = rt, Td = X, gi = L, Id = Ua, zU = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Id.default.code(new VU.KeywordCxt(a, Id.default, "additionalProperties"));
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
Wl.default = zU;
var Vl = {};
Object.defineProperty(Vl, "__esModule", { value: !0 });
const Fd = X, ms = Y, kd = L, Dd = L, BU = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, o = (0, Fd.allSchemaProperties)(r), l = o.filter((v) => (0, kd.alwaysValidSchema)(a, r[v]));
    if (o.length === 0 || l.length === o.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const u = i.strictSchema && !i.allowMatchingProperties && s.properties, c = t.name("valid");
    a.props !== !0 && !(a.props instanceof ms.Name) && (a.props = (0, Dd.evaluatedPropsToName)(t, a.props));
    const { props: f } = a;
    m();
    function m() {
      for (const v of o)
        u && h(v), a.allErrors ? y(v) : (t.var(c, !0), y(v), t.if(c));
    }
    function h(v) {
      for (const g in u)
        new RegExp(v).test(g) && (0, kd.checkStrictMode)(a, `property ${g} matches pattern ${v} (use allowMatchingProperties)`);
    }
    function y(v) {
      t.forIn("key", n, (g) => {
        t.if((0, ms._)`${(0, Fd.usePattern)(e, v)}.test(${g})`, () => {
          const p = l.includes(v);
          p || e.subschema({
            keyword: "patternProperties",
            schemaProp: v,
            dataProp: g,
            dataPropType: Dd.Type.Str
          }, c), a.opts.unevaluated && f !== !0 ? t.assign((0, ms._)`${f}[${g}]`, !0) : !p && !a.allErrors && t.if((0, ms.not)(c), () => t.break());
        });
      });
    }
  }
};
Vl.default = BU;
var zl = {};
Object.defineProperty(zl, "__esModule", { value: !0 });
const qU = L, KU = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, qU.alwaysValidSchema)(n, r)) {
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
zl.default = KU;
var Bl = {};
Object.defineProperty(Bl, "__esModule", { value: !0 });
const GU = X, HU = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: GU.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Bl.default = HU;
var ql = {};
Object.defineProperty(ql, "__esModule", { value: !0 });
const Ns = Y, JU = L, YU = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Ns._)`{passingSchemas: ${e.passing}}`
}, ZU = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: YU,
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
        (0, JU.alwaysValidSchema)(s, c) ? t.var(l, !0) : m = e.subschema({
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
ql.default = ZU;
var Kl = {};
Object.defineProperty(Kl, "__esModule", { value: !0 });
const XU = L, QU = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, XU.alwaysValidSchema)(n, a))
        return;
      const o = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(o);
    });
  }
};
Kl.default = QU;
var Gl = {};
Object.defineProperty(Gl, "__esModule", { value: !0 });
const Hs = Y, Dm = L, e9 = {
  message: ({ params: e }) => (0, Hs.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Hs._)`{failingKeyword: ${e.ifClause}}`
}, t9 = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: e9,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Dm.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Rd(n, "then"), a = Rd(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), o = t.name("_valid");
    if (l(), e.reset(), s && a) {
      const c = t.let("ifClause");
      e.setParams({ ifClause: c }), t.if(o, u("then", c), u("else", c));
    } else s ? t.if(o, u("then")) : t.if((0, Hs.not)(o), u("else"));
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
        t.assign(i, o), e.mergeValidEvaluated(m, i), f ? t.assign(f, (0, Hs._)`${c}`) : e.setParams({ ifClause: c });
      };
    }
  }
};
function Rd(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Dm.alwaysValidSchema)(e, r);
}
Gl.default = t9;
var Hl = {};
Object.defineProperty(Hl, "__esModule", { value: !0 });
const r9 = L, n9 = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, r9.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Hl.default = n9;
Object.defineProperty(Dl, "__esModule", { value: !0 });
const s9 = Yr, a9 = Rl, i9 = Zr, o9 = Ml, l9 = Ll, c9 = Fm, u9 = Ul, d9 = Ua, f9 = Wl, p9 = Vl, h9 = zl, m9 = Bl, g9 = ql, y9 = Kl, v9 = Gl, $9 = Hl;
function b9(e = !1) {
  const t = [
    // any
    h9.default,
    m9.default,
    g9.default,
    y9.default,
    v9.default,
    $9.default,
    // object
    u9.default,
    d9.default,
    c9.default,
    f9.default,
    p9.default
  ];
  return e ? t.push(a9.default, o9.default) : t.push(s9.default, i9.default), t.push(l9.default), t;
}
Dl.default = b9;
var Jl = {}, Yl = {};
Object.defineProperty(Yl, "__esModule", { value: !0 });
const Se = Y, _9 = {
  message: ({ schemaCode: e }) => (0, Se.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, Se._)`{format: ${e}}`
}, w9 = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: _9,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: o } = e, { opts: l, errSchemaPath: u, schemaEnv: c, self: f } = o;
    if (!l.validateFormats)
      return;
    s ? m() : h();
    function m() {
      const y = r.scopeValue("formats", {
        ref: f.formats,
        code: l.code.formats
      }), v = r.const("fDef", (0, Se._)`${y}[${i}]`), g = r.let("fType"), p = r.let("format");
      r.if((0, Se._)`typeof ${v} == "object" && !(${v} instanceof RegExp)`, () => r.assign(g, (0, Se._)`${v}.type || "string"`).assign(p, (0, Se._)`${v}.validate`), () => r.assign(g, (0, Se._)`"string"`).assign(p, v)), e.fail$data((0, Se.or)($(), b()));
      function $() {
        return l.strictSchema === !1 ? Se.nil : (0, Se._)`${i} && !${p}`;
      }
      function b() {
        const w = c.$async ? (0, Se._)`(${v}.async ? await ${p}(${n}) : ${p}(${n}))` : (0, Se._)`${p}(${n})`, x = (0, Se._)`(typeof ${p} == "function" ? ${w} : ${p}.test(${n}))`;
        return (0, Se._)`${p} && ${p} !== true && ${g} === ${t} && !${x}`;
      }
    }
    function h() {
      const y = f.formats[a];
      if (!y) {
        $();
        return;
      }
      if (y === !0)
        return;
      const [v, g, p] = b(y);
      v === t && e.pass(w());
      function $() {
        if (l.strictSchema === !1) {
          f.logger.warn(x());
          return;
        }
        throw new Error(x());
        function x() {
          return `unknown format "${a}" ignored in schema at path "${u}"`;
        }
      }
      function b(x) {
        const P = x instanceof RegExp ? (0, Se.regexpCode)(x) : l.code.formats ? (0, Se._)`${l.code.formats}${(0, Se.getProperty)(a)}` : void 0, j = r.scopeValue("formats", { key: a, ref: x, code: P });
        return typeof x == "object" && !(x instanceof RegExp) ? [x.type || "string", x.validate, (0, Se._)`${j}.validate`] : ["string", x, j];
      }
      function w() {
        if (typeof y == "object" && !(y instanceof RegExp) && y.async) {
          if (!c.$async)
            throw new Error("async format in sync schema");
          return (0, Se._)`await ${p}(${n})`;
        }
        return typeof g == "function" ? (0, Se._)`${p}(${n})` : (0, Se._)`${p}.test(${n})`;
      }
    }
  }
};
Yl.default = w9;
Object.defineProperty(Jl, "__esModule", { value: !0 });
const x9 = Yl, S9 = [x9.default];
Jl.default = S9;
var Ir = {};
Object.defineProperty(Ir, "__esModule", { value: !0 });
Ir.contentVocabulary = Ir.metadataVocabulary = void 0;
Ir.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Ir.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(_l, "__esModule", { value: !0 });
const j9 = wl, E9 = Sl, O9 = Dl, A9 = Jl, Md = Ir, N9 = [
  j9.default,
  E9.default,
  (0, O9.default)(),
  A9.default,
  Md.metadataVocabulary,
  Md.contentVocabulary
];
_l.default = N9;
var Zl = {}, Wa = {};
Object.defineProperty(Wa, "__esModule", { value: !0 });
Wa.DiscrError = void 0;
var Ld;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Ld || (Wa.DiscrError = Ld = {}));
Object.defineProperty(Zl, "__esModule", { value: !0 });
const yr = Y, Gi = Wa, Ud = Re, P9 = Jr, C9 = L, T9 = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Gi.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, yr._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, I9 = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: T9,
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
    const l = t.let("valid", !1), u = t.const("tag", (0, yr._)`${r}${(0, yr.getProperty)(o)}`);
    t.if((0, yr._)`typeof ${u} == "string"`, () => c(), () => e.error(!1, { discrError: Gi.DiscrError.Tag, tag: u, tagName: o })), e.ok(l);
    function c() {
      const h = m();
      t.if(!1);
      for (const y in h)
        t.elseIf((0, yr._)`${u} === ${y}`), t.assign(l, f(h[y]));
      t.else(), e.error(!1, { discrError: Gi.DiscrError.Mapping, tag: u, tagName: o }), t.endIf();
    }
    function f(h) {
      const y = t.name("valid"), v = e.subschema({ keyword: "oneOf", schemaProp: h }, y);
      return e.mergeEvaluated(v, yr.Name), y;
    }
    function m() {
      var h;
      const y = {}, v = p(s);
      let g = !0;
      for (let w = 0; w < i.length; w++) {
        let x = i[w];
        if (x != null && x.$ref && !(0, C9.schemaHasRulesButRef)(x, a.self.RULES)) {
          const j = x.$ref;
          if (x = Ud.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, j), x instanceof Ud.SchemaEnv && (x = x.schema), x === void 0)
            throw new P9.default(a.opts.uriResolver, a.baseId, j);
        }
        const P = (h = x == null ? void 0 : x.properties) === null || h === void 0 ? void 0 : h[o];
        if (typeof P != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${o}"`);
        g = g && (v || p(x)), $(P, w);
      }
      if (!g)
        throw new Error(`discriminator: "${o}" must be required`);
      return y;
      function p({ required: w }) {
        return Array.isArray(w) && w.includes(o);
      }
      function $(w, x) {
        if (w.const)
          b(w.const, x);
        else if (w.enum)
          for (const P of w.enum)
            b(P, x);
        else
          throw new Error(`discriminator: "properties/${o}" must have "const" or "enum"`);
      }
      function b(w, x) {
        if (typeof w != "string" || w in y)
          throw new Error(`discriminator: "${o}" values must be unique strings`);
        y[w] = x;
      }
    }
  }
};
Zl.default = I9;
const F9 = "http://json-schema.org/draft-07/schema#", k9 = "http://json-schema.org/draft-07/schema#", D9 = "Core schema meta-schema", R9 = {
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
}, M9 = [
  "object",
  "boolean"
], L9 = {
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
}, U9 = {
  $schema: F9,
  $id: k9,
  title: D9,
  definitions: R9,
  type: M9,
  properties: L9,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Lh, n = _l, s = Zl, a = U9, i = ["/properties"], o = "http://json-schema.org/draft-07/schema";
  class l extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((y) => this.addVocabulary(y)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const y = this.opts.$data ? this.$dataMetaSchema(a, i) : a;
      this.addMetaSchema(y, o, !1), this.refs["http://json-schema.org/schema"] = o;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(o) ? o : void 0);
    }
  }
  t.Ajv = l, e.exports = t = l, e.exports.Ajv = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
  var u = rt;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return u.KeywordCxt;
  } });
  var c = Y;
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
  var m = Jr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return m.default;
  } });
})(Ui, Ui.exports);
var Rm = Ui.exports;
const W9 = /* @__PURE__ */ kn(Rm);
var Hi = { exports: {} }, Mm = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(A, C) {
    return { validate: A, compare: C };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(a, i),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(l, u),
    "date-time": t(f, m),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: v,
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
    regex: N,
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
    int32: { type: "number", validate: w },
    // signed 64 bit integer
    int64: { type: "number", validate: x },
    // C-type float
    float: { type: "number", validate: P },
    // C-type double
    double: { type: "number", validate: P },
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
    const C = n.exec(A);
    if (!C)
      return !1;
    const F = +C[1], D = +C[2], U = +C[3];
    return D >= 1 && D <= 12 && U >= 1 && U <= (D === 2 && r(F) ? 29 : s[D]);
  }
  function i(A, C) {
    if (A && C)
      return A > C ? 1 : A < C ? -1 : 0;
  }
  const o = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  function l(A, C) {
    const F = o.exec(A);
    if (!F)
      return !1;
    const D = +F[1], U = +F[2], M = +F[3], B = F[5];
    return (D <= 23 && U <= 59 && M <= 59 || D === 23 && U === 59 && M === 60) && (!C || B !== "");
  }
  function u(A, C) {
    if (!(A && C))
      return;
    const F = o.exec(A), D = o.exec(C);
    if (F && D)
      return A = F[1] + F[2] + F[3] + (F[4] || ""), C = D[1] + D[2] + D[3] + (D[4] || ""), A > C ? 1 : A < C ? -1 : 0;
  }
  const c = /t|\s/i;
  function f(A) {
    const C = A.split(c);
    return C.length === 2 && a(C[0]) && l(C[1], !0);
  }
  function m(A, C) {
    if (!(A && C))
      return;
    const [F, D] = A.split(c), [U, M] = C.split(c), B = i(F, U);
    if (B !== void 0)
      return B || u(D, M);
  }
  const h = /\/|:/, y = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function v(A) {
    return h.test(A) && y.test(A);
  }
  const g = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function p(A) {
    return g.lastIndex = 0, g.test(A);
  }
  const $ = -2147483648, b = 2 ** 31 - 1;
  function w(A) {
    return Number.isInteger(A) && A <= b && A >= $;
  }
  function x(A) {
    return Number.isInteger(A);
  }
  function P() {
    return !0;
  }
  const j = /[^\\]\\Z/;
  function N(A) {
    if (j.test(A))
      return !1;
    try {
      return new RegExp(A), !0;
    } catch {
      return !1;
    }
  }
})(Mm);
var Lm = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = Rm, r = Y, n = r.operators, s = {
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
      const { gen: l, data: u, schemaCode: c, keyword: f, it: m } = o, { opts: h, self: y } = m;
      if (!h.validateFormats)
        return;
      const v = new t.KeywordCxt(m, y.RULES.all.format.definition, "format");
      v.$data ? g() : p();
      function g() {
        const b = l.scopeValue("formats", {
          ref: y.formats,
          code: h.code.formats
        }), w = l.const("fmt", r._`${b}[${v.schemaCode}]`);
        o.fail$data(r.or(r._`typeof ${w} != "object"`, r._`${w} instanceof RegExp`, r._`typeof ${w}.compare != "function"`, $(w)));
      }
      function p() {
        const b = v.schema, w = y.formats[b];
        if (!w || w === !0)
          return;
        if (typeof w != "object" || w instanceof RegExp || typeof w.compare != "function")
          throw new Error(`"${f}": format "${b}" does not define "compare" function`);
        const x = l.scopeValue("formats", {
          key: b,
          ref: w,
          code: h.code.formats ? r._`${h.code.formats}${r.getProperty(b)}` : void 0
        });
        o.fail$data($(x));
      }
      function $(b) {
        return r._`${b}.compare(${u}, ${c}) ${s[f].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const i = (o) => (o.addKeyword(e.formatLimitDefinition), o);
  e.default = i;
})(Lm);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = Mm, n = Lm, s = Y, a = new s.Name("fullFormats"), i = new s.Name("fastFormats"), o = (u, c = { keywords: !0 }) => {
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
    var h, y;
    (h = (y = u.opts.code).formats) !== null && h !== void 0 || (y.formats = s._`require("ajv-formats/dist/formats").${m}`);
    for (const v of c)
      u.addFormat(v, f[v]);
  }
  e.exports = t = o, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = o;
})(Hi, Hi.exports);
var V9 = Hi.exports;
const Wd = /* @__PURE__ */ kn(V9), z9 = {
  allErrors: !0,
  multipleOfPrecision: 8,
  strict: !1,
  verbose: !0,
  discriminator: !1
  // TODO enable this in V6
}, B9 = /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/, q9 = /^data:([a-z]+\/[a-z0-9-+.]+)?;(?:name=(.*);)?base64,(.*)$/;
function K9(e, t, r = {}, n, s = W9) {
  const a = new s({ ...z9, ...r });
  return n ? Wd(a, n) : n !== !1 && Wd(a), a.addFormat("data-url", q9), a.addFormat("color", B9), a.addKeyword(Mn), a.addKeyword(Yi), Array.isArray(e) && a.addMetaSchema(e), ge(t) && Object.keys(t).forEach((i) => {
    a.addFormat(i, t[i]);
  }), a;
}
function G9(e = [], t) {
  return e.map((r) => {
    var n;
    const { instancePath: s, keyword: a, params: i, schemaPath: o, parentSchema: l, ...u } = r;
    let { message: c = "" } = u, f = s.replace(/\//g, "."), m = `${f} ${c}`.trim();
    const h = [
      ...((n = i.deps) === null || n === void 0 ? void 0 : n.split(", ")) || [],
      i.missingProperty,
      i.property
    ].filter((y) => y);
    if (h.length > 0)
      h.forEach((y) => {
        const v = f ? `${f}.${y}` : y;
        let g = se(z(t, `${v.replace(/^\./, "")}`)).title;
        if (g === void 0) {
          const p = o.replace(/\/properties\//g, "/").split("/").slice(1, -1).concat([y]);
          g = se(z(t, p)).title;
        }
        if (g)
          c = c.replace(`'${y}'`, `'${g}'`);
        else {
          const p = z(l, [xe, y, "title"]);
          p && (c = c.replace(`'${y}'`, `'${p}'`));
        }
      }), m = c;
    else {
      const y = se(z(t, `${f.replace(/^\./, "")}`)).title;
      if (y)
        m = `'${y}' ${c}`.trim();
      else {
        const v = l == null ? void 0 : l.title;
        v && (m = `'${v}' ${c}`.trim());
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
function H9(e, t, r, n, s, a, i) {
  const { validationError: o } = t;
  let l = G9(t.errors, i);
  o && (l = [...l, { stack: o.message }]), typeof a == "function" && (l = a(l, i));
  let u = xR(l);
  if (o && (u = {
    ...u,
    $schema: {
      __errors: [o.message]
    }
  }), typeof s != "function")
    return { errors: l, errorSchema: u };
  const c = gh(e, n, r, n, !0), f = s(c, Cs(c), i), m = sl(f);
  return ws({ errors: l, errorSchema: u }, m);
}
class J9 {
  /** Constructs an `AJV8Validator` instance using the `options`
   *
   * @param options - The `CustomValidatorOptionsType` options that are used to create the AJV instance
   * @param [localizer] - If provided, is used to localize a list of Ajv `ErrorObject`s
   */
  constructor(t, r) {
    const { additionalMetaSchemas: n, customFormats: s, ajvOptionsOverrides: a, ajvFormatOptions: i, AjvClass: o } = t;
    this.ajv = K9(n, s, a, i, o), this.localizer = r;
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
    t[Dt] && (i = this.ajv.getSchema(t[Dt]));
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
    return H9(this, i, t, r, n, s, a);
  }
  /**
   * This function checks if a schema needs to be added and if the root schemas don't match it removes the old root schema from the ajv instance and adds the new one.
   * @param rootSchema - The root schema used to provide $ref resolutions
   */
  handleSchemaUpdate(t) {
    var r, n;
    const s = (r = t[Dt]) !== null && r !== void 0 ? r : ef;
    this.ajv.getSchema(s) === void 0 ? this.ajv.addSchema(t, s) : be(t, (n = this.ajv.getSchema(s)) === null || n === void 0 ? void 0 : n.schema) || (this.ajv.removeSchema(s), this.ajv.addSchema(t, s));
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
      const a = al(t), i = (s = a[Dt]) !== null && s !== void 0 ? s : yR(a);
      let o;
      return o = this.ajv.getSchema(i), o === void 0 && (o = this.ajv.addSchema(a, i).getSchema(i) || this.ajv.compile(a)), o(r);
    } catch (a) {
      return console.warn("Error encountered compiling schema:", a), !1;
    }
  }
}
function Y9(e = {}, t) {
  return new J9(e, t);
}
const Z9 = Y9(), X9 = (e) => {
  const { widgetProps: t, updateWidgetProps: r } = Yd();
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
}, Q9 = (e) => {
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
}, Xl = (e, t) => {
  var l;
  if (!t) return "other";
  const r = e.toLowerCase();
  if (t.startsWith("data:"))
    return t.startsWith("data:image") ? "image" : t.startsWith("data:video") ? "video" : t.startsWith("data:audio") ? "audio" : "other";
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
  return s.includes(n) ? "image" : a.includes(n) ? "video" : i.includes(n) ? "audio" : o.includes(n) ? "document" : r.includes("image") || r.includes("avatar") || r.includes("logo") || r.includes("icon") ? "image" : r.includes("video") ? "video" : r.includes("audio") || r.includes("sound") ? "audio" : r.includes("document") || r.includes("pdf") || r.includes("doc") ? "document" : "other";
}, Um = (e, t) => {
  const r = e.toLowerCase(), n = Xl(e, t);
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
}, Wm = (e, t) => {
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
}, e6 = (e) => {
  const [t, r] = $e.useState(!1), [n, s] = $e.useState(e.value || ""), [a, i] = $e.useState(""), [o, l] = $e.useState(/* @__PURE__ */ new Set());
  $e.useEffect(() => {
    s(e.value || ""), e.value || i("");
  }, [e.value]), $e.useEffect(() => () => {
    o.forEach((g) => {
      g.startsWith("blob:") && URL.revokeObjectURL(g);
    });
  }, [o]);
  const u = async (g) => {
    var $;
    const p = ($ = g.target.files) == null ? void 0 : $[0];
    if (p) {
      i(p.name), r(!0);
      try {
        let b;
        e.onFileUpload ? b = await e.onFileUpload(p) : p.type.startsWith("image/") && p.size < 5 * 1024 * 1024 ? b = await new Promise((w) => {
          const x = new FileReader();
          x.onload = (P) => {
            var j;
            return w((j = P.target) == null ? void 0 : j.result);
          }, x.readAsDataURL(p);
        }) : (b = URL.createObjectURL(p), l((w) => /* @__PURE__ */ new Set([...w, b]))), s(b), e.onChange(b);
      } catch (b) {
        console.error("File processing failed:", b), alert("File processing failed"), i("");
      } finally {
        r(!1), g.target.value = "";
      }
    }
  }, c = (g) => {
    const p = g.target.value;
    s(p), e.onChange(p), i("");
  }, f = () => {
    n.startsWith("blob:") && o.has(n) && (URL.revokeObjectURL(n), l((g) => {
      const p = new Set(g);
      return p.delete(n), p;
    })), s(""), i(""), e.onChange("");
  }, m = Xl(e.name, n), h = Um(e.name, n), v = (() => {
    if (a) return a;
    if (!n) return "";
    try {
      return n.startsWith("data:") ? "Image file" : n.startsWith("blob:") ? "Selected file" : new URL(n).pathname.split("/").pop() || "File";
    } catch {
      const g = n.split("/");
      return g[g.length - 1].split("?")[0] || "File";
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
            onChange: c,
            className: "flex-1 min-w-0 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            placeholder: "https://example.com/file.jpg"
          }
        ),
        n && /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            onClick: f,
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
              onChange: u,
              disabled: t,
              accept: h,
              className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            }
          ) }),
          t && /* @__PURE__ */ d.jsx("div", { className: "flex-shrink-0 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg text-sm flex items-center whitespace-nowrap", children: e.onFileUpload ? "Uploading..." : "Processing..." })
        ] }),
        v && /* @__PURE__ */ d.jsx("div", { className: "w-full", children: /* @__PURE__ */ d.jsxs(
          "div",
          {
            className: "text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded border truncate w-full",
            title: v,
            children: [
              "📄 ",
              v
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "text-xs text-gray-500 flex flex-col sm:flex-row sm:justify-between gap-1", children: [
        /* @__PURE__ */ d.jsxs("span", { className: "truncate", children: [
          "Accepted: ",
          h === "*/*" ? "All files" : h
        ] }),
        !e.onFileUpload && /* @__PURE__ */ d.jsx("span", { className: "text-orange-600 font-medium whitespace-nowrap", children: "Local preview only" })
      ] })
    ] }),
    n && /* @__PURE__ */ d.jsxs("div", { className: "space-y-2 w-full", children: [
      /* @__PURE__ */ d.jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Preview" }),
      /* @__PURE__ */ d.jsxs("div", { className: "border border-gray-200 rounded-lg p-4 w-full overflow-hidden", children: [
        m === "image" && /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-center space-y-3 w-full", children: [
          /* @__PURE__ */ d.jsx("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ d.jsx(
            "img",
            {
              src: n,
              alt: "Preview",
              className: "max-w-full max-h-48 object-contain rounded",
              onError: (g) => {
                g.target.style.display = "none";
                const p = g.target.parentElement;
                if (p) {
                  const $ = document.createElement("div");
                  $.className = "text-center py-4", $.innerHTML = `
                          <div class="text-3xl mb-2">🖼️</div>
                          <div class="text-sm text-gray-600">Image preview not available</div>
                        `, p.appendChild($);
                }
              }
            }
          ) }),
          v && /* @__PURE__ */ d.jsx("div", { className: "text-sm text-gray-600 text-center truncate w-full max-w-full px-2", children: v })
        ] }),
        m === "video" && /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-center space-y-3 w-full", children: [
          /* @__PURE__ */ d.jsx("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ d.jsx(
            "video",
            {
              src: n,
              controls: !0,
              className: "max-w-full max-h-48 rounded"
            }
          ) }),
          v && /* @__PURE__ */ d.jsx("div", { className: "text-sm text-gray-600 text-center truncate w-full max-w-full px-2", children: v })
        ] }),
        m === "audio" && /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-center space-y-3 w-full", children: [
          /* @__PURE__ */ d.jsx("div", { className: "w-full", children: /* @__PURE__ */ d.jsx("audio", { src: n, controls: !0, className: "w-full" }) }),
          v && /* @__PURE__ */ d.jsx("div", { className: "text-sm text-gray-600 text-center truncate w-full max-w-full px-2", children: v })
        ] }),
        (m === "document" || m === "other") && /* @__PURE__ */ d.jsxs("div", { className: "text-center py-4 w-full", children: [
          /* @__PURE__ */ d.jsx("div", { className: "text-3xl mb-2", children: m === "document" ? "📄" : "📎" }),
          v && /* @__PURE__ */ d.jsx("div", { className: "text-sm text-gray-600 truncate w-full max-w-full px-2", children: v })
        ] })
      ] })
    ] })
  ] });
}, t6 = (e) => {
  const [t, r] = $e.useState([]), [n, s] = $e.useState(!1), [a, i] = $e.useState(!1), [o, l] = $e.useState("");
  $e.useEffect(() => {
    (async () => {
      const v = e.schema.description === "API Endpoint" || e.value && typeof e.value == "string" && e.value.startsWith("/api/") || e.schema.format === "dynamic-select";
      if (i(v), v && e.onGetSelectOptions)
        await u();
      else {
        const g = c(e.schema, e.value);
        r(g);
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
      const y = await e.onGetSelectOptions(
        e.name,
        e.componentType
      );
      r(y || []);
    } catch (y) {
      console.error("Failed to load options:", y), l("Failed to load options"), r([]);
    } finally {
      s(!1);
    }
  }, c = (y, v) => {
    if (y.enum && Array.isArray(y.enum))
      return y.enum.map((g) => String(g));
    if (y.items && y.items.enum && Array.isArray(y.items.enum))
      return y.items.enum.map((g) => String(g));
    if (y.oneOf && Array.isArray(y.oneOf))
      return y.oneOf.filter((g) => g.const !== void 0).map((g) => String(g.const));
    if (y.anyOf && Array.isArray(y.anyOf))
      return y.anyOf.filter((g) => g.const !== void 0).map((g) => String(g.const));
    if (typeof v == "string") {
      const g = v.match(/^\[(.*)\]$/);
      if (g)
        return g[1].split(",").map((p) => p.trim()).filter((p) => p.length > 0);
    }
    return y.options && Array.isArray(y.options) ? y.options.map((g) => String(g)) : [];
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
            onChange: (y) => e.onChange(y.target.value),
            disabled: n,
            className: "flex-1 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            children: [
              /* @__PURE__ */ d.jsx("option", { value: "", children: "Select an option" }),
              t.map((y) => /* @__PURE__ */ d.jsx("option", { value: y, children: y }, y))
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
}, r6 = (e) => {
  const [t, r] = $e.useState(
    typeof e.value == "string" ? e.value : JSON.stringify(e.value, null, 2)
  );
  $e.useEffect(() => {
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
}, n6 = (e) => {
  const [t, r] = $e.useState(e.value || []), [n, s] = $e.useState([]), [a, i] = $e.useState(
    {}
  ), [o, l] = $e.useState(
    /* @__PURE__ */ new Set()
  ), [u, c] = $e.useState(!1);
  $e.useEffect(() => {
    r(e.value || []);
    const { keys: j, schemas: N } = m(
      e.schema,
      e.value
    );
    s(j), i(N);
  }, [e.value, e.schema]);
  const f = (j, N, A) => {
    const C = [...t];
    C[j] = { ...C[j], [N]: A }, r(C), e.onChange(C);
  }, m = (j, N) => {
    const A = [], C = {};
    if (j.items && j.items.properties)
      Object.entries(j.items.properties).forEach(
        ([F, D]) => {
          A.push(F), C[F] = D;
        }
      );
    else if (N && N.length > 0 && typeof N[0] == "object") {
      const F = N[0];
      Object.keys(F).forEach((D) => {
        A.push(D), C[D] = Ql(D, F[D]);
      });
    } else
      ["name", "value", "label", "key"].forEach((D) => {
        A.push(D), C[D] = { type: "string", title: D };
      });
    return { keys: A, schemas: C };
  }, h = (j, N, A) => {
    const C = N.format || "", F = N.type || "string";
    return C === "color" ? "color" : C === "email" ? "email" : C === "uri" || j.toLowerCase().includes("url") || j.toLowerCase().includes("link") ? "url" : C === "date" ? "date" : C === "datetime" ? "datetime-local" : F === "number" ? "number" : C === "select" || C === "dynamic-select" ? "select" : C === "file" ? "file" : "text";
  }, y = (j) => {
    const [N, A] = $e.useState(
      j.value || ""
    ), [C, F] = $e.useState(""), [D, U] = $e.useState(/* @__PURE__ */ new Set());
    $e.useEffect(() => {
      A(j.value || ""), j.value || F("");
    }, [j.value]), $e.useEffect(() => () => {
      D.forEach((E) => {
        E.startsWith("blob:") && URL.revokeObjectURL(E);
      });
    }, [D]);
    const M = async (E) => {
      var O;
      const T = (O = E.target.files) == null ? void 0 : O[0];
      if (T) {
        F(T.name);
        try {
          let _;
          j.onFileUpload ? _ = await j.onFileUpload(T) : T.type.startsWith("image/") && T.size < 5 * 1024 * 1024 ? _ = await new Promise((S) => {
            const I = new FileReader();
            I.onload = (W) => {
              var V;
              return S((V = W.target) == null ? void 0 : V.result);
            }, I.readAsDataURL(T);
          }) : (_ = URL.createObjectURL(T), U((S) => /* @__PURE__ */ new Set([...S, _]))), A(_), j.onChange(_);
        } catch (_) {
          console.error("File processing failed:", _), F("");
        } finally {
          E.target.value = "";
        }
      }
    }, B = (E) => {
      const T = E.target.value;
      A(T), j.onChange(T), F("");
    }, R = () => {
      N.startsWith("blob:") && D.has(N) && (URL.revokeObjectURL(N), U((E) => {
        const T = new Set(E);
        return T.delete(N), T;
      })), A(""), F(""), j.onChange("");
    }, Z = (() => {
      if (C) return C;
      if (!N) return "";
      try {
        return N.startsWith("data:") ? "Image file" : N.startsWith("blob:") ? "Selected file" : new URL(N).pathname.split("/").pop() || "File";
      } catch {
        const E = N.split("/");
        return E[E.length - 1].split("?")[0] || "File";
      }
    })(), ee = Xl(j.name, N), k = Um(j.name, N);
    return /* @__PURE__ */ d.jsxs("div", { className: "space-y-3 w-full", children: [
      /* @__PURE__ */ d.jsx("div", { className: "space-y-2 w-full", children: /* @__PURE__ */ d.jsxs("div", { className: "flex space-x-2 w-full", children: [
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "url",
            value: N,
            onChange: B,
            className: "flex-1 min-w-0 p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
            placeholder: "https://example.com/file.jpg"
          }
        ),
        N && /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            onClick: R,
            className: "flex-shrink-0 px-3 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors whitespace-nowrap",
            children: "Clear"
          }
        )
      ] }) }),
      /* @__PURE__ */ d.jsxs("div", { className: "space-y-2 w-full", children: [
        /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "file",
              onChange: M,
              accept: k,
              className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            }
          ),
          Z && /* @__PURE__ */ d.jsx("div", { className: "w-full", children: /* @__PURE__ */ d.jsxs(
            "div",
            {
              className: "text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded border truncate",
              title: Z,
              children: [
                "📄 ",
                Z
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "text-xs text-gray-500 flex justify-between", children: [
          /* @__PURE__ */ d.jsxs("span", { children: [
            "Accepted: ",
            k === "*/*" ? "All files" : k
          ] }),
          !j.onFileUpload && /* @__PURE__ */ d.jsx("span", { className: "text-orange-600", children: "Local preview only" })
        ] })
      ] }),
      N && (ee === "image" || ee === "video" || ee === "audio") && /* @__PURE__ */ d.jsxs("div", { className: "space-y-2 w-full", children: [
        /* @__PURE__ */ d.jsx("label", { className: "block text-xs font-medium text-gray-700", children: "Preview" }),
        /* @__PURE__ */ d.jsxs("div", { className: "border border-gray-200 rounded p-2 w-full bg-gray-50", children: [
          ee === "image" && /* @__PURE__ */ d.jsx("div", { className: "flex flex-col items-center space-y-2", children: /* @__PURE__ */ d.jsx(
            "img",
            {
              src: N,
              alt: "Preview",
              className: "max-w-full max-h-32 object-contain rounded",
              onError: (E) => {
                E.target.style.display = "none";
                const T = E.target.parentElement;
                if (T) {
                  const O = document.createElement("div");
                  O.className = "text-center py-2", O.innerHTML = `
                        <div class="text-xl mb-1">🖼️</div>
                        <div class="text-xs text-gray-600">Preview not available</div>
                      `, T.appendChild(O);
                }
              }
            }
          ) }),
          ee === "video" && /* @__PURE__ */ d.jsx("div", { className: "flex flex-col items-center space-y-2", children: /* @__PURE__ */ d.jsx(
            "video",
            {
              src: N,
              controls: !0,
              className: "max-w-full max-h-32 rounded"
            }
          ) }),
          ee === "audio" && /* @__PURE__ */ d.jsx("div", { className: "w-full", children: /* @__PURE__ */ d.jsx("audio", { src: N, controls: !0, className: "w-full" }) })
        ] })
      ] }),
      N && (ee === "document" || ee === "other") && /* @__PURE__ */ d.jsxs("div", { className: "space-y-2 w-full", children: [
        /* @__PURE__ */ d.jsx("label", { className: "block text-xs font-medium text-gray-700", children: "Preview" }),
        /* @__PURE__ */ d.jsxs("div", { className: "border border-gray-200 rounded p-3 bg-gray-50 text-center", children: [
          /* @__PURE__ */ d.jsx("div", { className: "text-2xl mb-1", children: ee === "document" ? "📄" : "📎" }),
          Z && /* @__PURE__ */ d.jsx("div", { className: "text-xs text-gray-600 truncate", children: Z })
        ] })
      ] })
    ] });
  }, v = (j, N, A, C) => {
    const F = h(j, N), D = `Enter ${j}`;
    switch (F) {
      case "color":
        return /* @__PURE__ */ d.jsxs("div", { className: "flex space-x-2 items-center", children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "color",
              value: A || "#000000",
              onChange: (M) => C(M.target.value),
              className: "w-8 h-8 border border-gray-300 rounded cursor-pointer"
            }
          ),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "text",
              value: A,
              onChange: (M) => C(M.target.value),
              className: "flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
              placeholder: D
            }
          )
        ] });
      case "select":
        const U = N.enum || [];
        return /* @__PURE__ */ d.jsxs(
          "select",
          {
            value: A || "",
            onChange: (M) => C(M.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
            children: [
              /* @__PURE__ */ d.jsxs("option", { value: "", children: [
                "Select ",
                j
              ] }),
              U.map((M) => /* @__PURE__ */ d.jsx("option", { value: M, children: M }, M))
            ]
          }
        );
      case "file":
        return /* @__PURE__ */ d.jsx(
          y,
          {
            value: A,
            onChange: C,
            onFileUpload: e.onFileUpload,
            schema: N,
            name: j
          }
        );
      case "date":
        return /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "date",
            value: A || "",
            onChange: (M) => C(M.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          }
        );
      case "datetime-local":
        return /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "datetime-local",
            value: A || "",
            onChange: (M) => C(M.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          }
        );
      default:
        return /* @__PURE__ */ d.jsx(
          "input",
          {
            type: F,
            value: A || "",
            onChange: (M) => C(M.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
            placeholder: D,
            step: F === "number" ? "any" : void 0
          }
        );
    }
  }, g = (j) => {
    const N = new Set(o);
    N.has(j) ? N.delete(j) : N.add(j), l(N);
  }, p = () => {
    if (u)
      l(/* @__PURE__ */ new Set());
    else {
      const j = new Set(t.map((N, A) => A));
      l(j);
    }
    c(!u);
  }, $ = () => {
    if (o.size === 0) return;
    const j = t.filter((N, A) => !o.has(A));
    r(j), l(/* @__PURE__ */ new Set()), c(!1), e.onChange(j);
  }, b = () => {
    const j = n.reduce((A, C) => {
      var D;
      const F = ((D = a[C]) == null ? void 0 : D.default) || "";
      return A[C] = F, A;
    }, {}), N = [...t, j];
    r(N), e.onChange(N);
  }, w = (j) => {
    const N = t.filter((C, F) => F !== j);
    r(N);
    const A = new Set(o);
    A.delete(j), l(A), e.onChange(N);
  }, x = () => {
    r([]), l(/* @__PURE__ */ new Set()), c(!1), e.onChange([]);
  }, P = (j, N) => N.description ? N.description : N.format === "select" ? "Select field" : N.format === "dynamic-select" ? "Dynamic select field" : N.format === "file" ? "File field" : "";
  return /* @__PURE__ */ d.jsxs("div", { className: "space-y-4 w-full", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ d.jsx("div", { className: "flex items-center space-x-4", children: t.length > 0 && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "checkbox",
              checked: u,
              onChange: p,
              className: "w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            }
          ),
          /* @__PURE__ */ d.jsx("span", { className: "ml-2 text-sm text-gray-700", children: "Select All" })
        ] }),
        o.size > 0 && /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            onClick: $,
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
        /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            onClick: b,
            className: "px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors",
            children: "Add Item"
          }
        ),
        t.length > 0 && /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            onClick: x,
            className: "px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors",
            children: "Clear All"
          }
        )
      ] })
    ] }),
    t.length === 0 ? /* @__PURE__ */ d.jsxs("div", { className: "text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg w-full", children: [
      /* @__PURE__ */ d.jsx("div", { className: "text-5xl mb-3", children: "📝" }),
      /* @__PURE__ */ d.jsx("p", { className: "text-base mb-1", children: "No items added yet" }),
      /* @__PURE__ */ d.jsx("p", { className: "text-sm", children: 'Click "Add Item" to get started' })
    ] }) : /* @__PURE__ */ d.jsx("div", { className: "space-y-4 w-full", children: t.map((j, N) => /* @__PURE__ */ d.jsxs(
      "div",
      {
        className: `border rounded-lg p-4 bg-white shadow-sm w-full transition-all ${o.has(N) ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200" : "border-gray-200 hover:border-gray-300"}`,
        children: [
          /* @__PURE__ */ d.jsxs("div", { className: "flex justify-between items-center mb-4 pb-3 border-b border-gray-200", children: [
            /* @__PURE__ */ d.jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ d.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: o.has(N),
                  onChange: () => g(N),
                  className: "w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                }
              ),
              /* @__PURE__ */ d.jsxs("h4", { className: "font-medium text-gray-700 text-sm", children: [
                "Item ",
                N + 1
              ] })
            ] }),
            /* @__PURE__ */ d.jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ d.jsxs("div", { className: "flex space-x-1", children: [
                n.includes("name") && n.includes("value") && /* @__PURE__ */ d.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      const A = j.name || `Item ${N + 1}`, C = j.value || `value${N + 1}`;
                      f(N, "name", A), f(N, "value", C);
                    },
                    className: "px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors",
                    title: "Auto-fill name and value",
                    children: "Auto-fill"
                  }
                ),
                n.includes("label") && !j.label && j.name && /* @__PURE__ */ d.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      f(N, "label", j.name);
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
                  onClick: () => w(N),
                  className: "px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors",
                  children: "Delete"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ d.jsx("div", { className: "space-y-4 w-full", children: n.map((A) => {
            const C = a[A] || {}, F = j[A] || "", D = P(A, C);
            return /* @__PURE__ */ d.jsxs("div", { className: "space-y-2 w-full", children: [
              /* @__PURE__ */ d.jsxs("label", { className: "block text-sm font-medium text-gray-700 capitalize", children: [
                C.title || A.replace(/([A-Z])/g, " $1").toLowerCase(),
                C.format === "file" && " 📁",
                C.format === "select" && " 📋",
                C.format === "dynamic-select" && " 🔄"
              ] }),
              /* @__PURE__ */ d.jsx("div", { className: "w-full", children: v(
                A,
                C,
                F,
                (U) => f(N, A, U)
              ) }),
              D && /* @__PURE__ */ d.jsx("p", { className: "text-xs text-gray-500", children: D })
            ] }, A);
          }) })
        ]
      },
      N
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
        ] })
      ] }),
      n.length > 0 && /* @__PURE__ */ d.jsxs("span", { children: [
        n.length,
        " fields detected"
      ] })
    ] })
  ] });
}, s6 = (e) => /* @__PURE__ */ d.jsx(
  "input",
  {
    type: "text",
    value: e.value || "",
    onChange: (t) => e.onChange(t.target.value),
    className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    placeholder: e.placeholder
  }
), a6 = (e) => {
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
}, i6 = (e) => /* @__PURE__ */ d.jsx(
  "input",
  {
    type: "number",
    value: e.value || "",
    onChange: (t) => e.onChange(Number(t.target.value)),
    className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    step: e.step || "any"
  }
), o6 = (e) => {
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
}, l6 = (e) => {
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
}, c6 = (e) => /* @__PURE__ */ d.jsx(
  "input",
  {
    type: "email",
    value: e.value || "",
    onChange: (t) => e.onChange(t.target.value),
    className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    placeholder: e.placeholder
  }
), u6 = (e) => /* @__PURE__ */ d.jsx(
  "input",
  {
    type: "url",
    value: e.value || "",
    onChange: (t) => e.onChange(t.target.value),
    className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    placeholder: e.placeholder
  }
), d6 = (e) => /* @__PURE__ */ d.jsxs("div", { className: "flex space-x-3 items-center", children: [
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
] }), f6 = (e) => /* @__PURE__ */ d.jsxs("div", { className: "flex items-center", children: [
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
] }), p6 = (e) => {
  const t = {
    type: "object",
    properties: {},
    required: []
  };
  return Object.entries(e).forEach(([r, n]) => {
    t.properties[r] = Ql(r, n);
  }), t;
}, Ql = (e, t) => {
  const r = typeof t, n = e.toLowerCase(), s = {
    title: e.replace(/([A-Z])/g, " $1").replace(/^./, (i) => i.toUpperCase()),
    default: t
  };
  if (Wm(e, t))
    return s.type = "string", s.format = "file", s;
  if (r === "string") {
    if (s.type = "string", h6(e, t)) {
      if (s.format = "select", t && t.startsWith("/api/"))
        s.description = "API Endpoint", s.format = "dynamic-select";
      else if (ec(t)) {
        const o = m6(t);
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
        return typeof c == "string" || typeof c == "number" || typeof c == "boolean";
      }) && o.length > 0 ? (s.items = {
        type: "object",
        properties: o.reduce((u, c) => (u[c] = Ql(c, i[c]), u), {})
      }, s.format = "array-of-objects") : s.items = { type: "object" };
    } else t.length > 0 && typeof t[0] == "string" ? (s.items = { type: "string" }, t.every((i) => typeof i == "string") && t.length <= 10 && (s.format = "select", s.enum = t)) : s.items = { type: "string" };
  else r === "object" && t !== null ? (s.type = "object", s.format = "json") : s.type = "string";
  return s;
}, h6 = (e, t) => {
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
  ec(t) || // Static options array
  t.includes("|") || // Pipe-separated values
  t.includes(",") && t.split(",").length <= 10);
  return s || a;
}, ec = (e) => typeof e == "string" && /^\[.*\]$/.test(e), m6 = (e) => {
  if (!ec(e)) return [];
  const t = e.match(/^\[(.*)\]$/);
  return t ? t[1].split(",").map((r) => r.trim()).filter((r) => r.length > 0) : [];
}, g6 = (e, t) => {
  const r = {
    "ui:order": Object.keys(t.properties || {})
  };
  return Object.keys(t.properties || {}).forEach((n) => {
    const s = t.properties[n], a = e[n];
    s.format === "file" || Wm(n, a) ? r[n] = {
      "ui:widget": "FileWidget"
    } : s.type === "object" || s.format === "json" ? r[n] = {
      "ui:widget": "JsonWidget"
    } : s.format === "textarea" ? r[n] = {
      "ui:widget": "CustomTextareaWidget",
      "ui:options": {
        rows: 5
      }
    } : s.format === "select" || s.format === "dynamic-select" ? (r[n] = {
      "ui:widget": "CustomSelectWidget"
    }, s.format === "dynamic-select" && (r[n]["ui:options"] = {
      ...r[n]["ui:options"],
      isDynamic: !0
    })) : s.format === "date" ? r[n] = {
      "ui:widget": "CustomDateWidget"
    } : s.format === "datetime" ? r[n] = {
      "ui:widget": "CustomDateTimeWidget"
    } : s.format === "email" ? r[n] = {
      "ui:widget": "CustomEmailWidget"
    } : s.format === "color" ? r[n] = {
      "ui:widget": "CustomColorWidget"
    } : s.type === "boolean" ? r[n] = {
      "ui:widget": "CustomCheckboxWidget"
    } : s.type === "number" ? r[n] = {
      "ui:widget": "CustomNumberWidget"
    } : s.format === "array-of-objects" ? r[n] = {
      "ui:widget": "ArrayOfObjectsWidget"
    } : r[n] = {
      "ui:widget": "CustomTextWidget"
    }, a && typeof a == "string" && a.startsWith("/api/") && (r[n] = {
      ...r[n],
      "ui:description": `API Endpoint: ${a}`
    }), a && typeof a == "string" && a.toLowerCase().startsWith("/customaction/") && (r[n] = {
      ...r[n],
      "ui:description": `Custom Action: ${a}`
    });
  }), r;
}, y6 = ({
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
  } = Rn(), { updateProps: l, getProps: u } = X9(s == null ? void 0 : s.id);
  if (!s && !a)
    return /* @__PURE__ */ d.jsxs("div", { className: "p-6 text-center text-gray-500", children: [
      /* @__PURE__ */ d.jsx("div", { className: "mb-3 text-2xl", children: "👈" }),
      /* @__PURE__ */ d.jsx("p", { className: "text-base", children: "Select a component from the Components tab or click on a placed component to edit its properties" })
    ] });
  const c = (s == null ? void 0 : s.type) || a, f = (s == null ? void 0 : s.props) || {}, m = u() || {}, h = { ...f, ...m }, y = p6(h), v = g6(h, y), g = (x) => {
    if (x.formData && s) {
      const P = { ...h, ...x.formData }, j = {
        ...s,
        props: P
      };
      i(j), l(P);
    }
  }, p = {
    FileWidget: (x) => /* @__PURE__ */ d.jsx(e6, { ...x, onFileUpload: e }),
    CustomSelectWidget: (x) => /* @__PURE__ */ d.jsx(
      t6,
      {
        ...x,
        onGetSelectOptions: n,
        componentType: c,
        uiSchema: v[x.name]
      }
    ),
    JsonWidget: r6,
    ArrayOfObjectsWidget: n6,
    CustomTextWidget: s6,
    CustomTextareaWidget: a6,
    CustomNumberWidget: i6,
    CustomDateWidget: o6,
    CustomDateTimeWidget: l6,
    CustomEmailWidget: c6,
    CustomURLWidget: u6,
    CustomColorWidget: d6,
    CustomCheckboxWidget: f6
  }, $ = {
    FieldTemplate: Q9
  }, b = (x) => typeof x != "string" ? !1 : x.startsWith("/api/"), w = (x) => typeof x != "string" ? !1 : x.toLowerCase().startsWith("/customaction/");
  return /* @__PURE__ */ d.jsxs("div", { className: "h-full overflow-auto bg-white", children: [
    /* @__PURE__ */ d.jsx("div", { className: "border-b border-gray-200 bg-white p-6 sticky top-0 z-10", children: /* @__PURE__ */ d.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ d.jsxs("h3", { className: "text-xl font-semibold text-gray-900", children: [
      c,
      s && /* @__PURE__ */ d.jsxs("span", { className: "text-sm text-gray-500 ml-2 font-normal", children: [
        "(ID: ",
        s.id,
        ")"
      ] })
    ] }) }) }),
    /* @__PURE__ */ d.jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ d.jsx("div", { className: "properties-form", children: /* @__PURE__ */ d.jsx(
        QM,
        {
          schema: y,
          uiSchema: v,
          formData: h,
          onChange: g,
          validator: Z9,
          widgets: p,
          templates: $,
          liveValidate: !0,
          children: /* @__PURE__ */ d.jsx("div", { style: { display: "none" } })
        }
      ) }),
      (t || r) && /* @__PURE__ */ d.jsxs("div", { className: "mt-8 p-5 bg-gray-50 rounded-lg border border-gray-200", children: [
        /* @__PURE__ */ d.jsx("h4", { className: "text-sm font-medium text-gray-800 mb-4", children: "Quick Actions" }),
        /* @__PURE__ */ d.jsxs("div", { className: "flex flex-wrap gap-3", children: [
          t && Object.entries(h).some(
            ([x, P]) => b(P)
          ) && /* @__PURE__ */ d.jsx(
            "button",
            {
              onClick: async () => {
                try {
                  const x = Object.entries(
                    h
                  ).filter(([P, j]) => b(j));
                  for (const [P, j] of x)
                    await v6(P, j);
                  x.length === 0 ? alert("No API endpoints found") : alert(
                    `Called ${x.length} API endpoint(s)`
                  );
                } catch (x) {
                  console.error("Failed to call APIs:", x), alert("Failed to call APIs");
                }
              },
              className: "px-4 py-3 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors font-medium",
              children: "Call All API Endpoints"
            }
          ),
          r && Object.entries(h).some(
            ([x, P]) => w(P)
          ) && /* @__PURE__ */ d.jsx(
            "button",
            {
              onClick: async () => {
                try {
                  const x = Object.entries(
                    h
                  ).filter(([P, j]) => w(j));
                  for (const [P, j] of x) {
                    const N = j.replace(
                      "/customaction/",
                      ""
                    );
                    await $6(
                      P,
                      N,
                      h
                    );
                  }
                  x.length === 0 ? alert("No custom actions found") : alert(
                    `Executed ${x.length} custom action(s)`
                  );
                } catch (x) {
                  console.error(
                    "Failed to execute custom actions:",
                    x
                  ), alert("Failed to execute actions");
                }
              },
              className: "px-4 py-3 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors font-medium",
              children: "Execute All Custom Actions"
            }
          )
        ] })
      ] }),
      Object.keys(h).length === 0 && /* @__PURE__ */ d.jsxs("div", { className: "text-center py-12 text-gray-500", children: [
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
            const x = Object.keys(h).reduce(
              (P, j) => {
                const N = h[j];
                return typeof N == "number" ? P[j] = 0 : typeof N == "boolean" ? P[j] = !1 : Array.isArray(N) ? P[j] = [] : typeof N == "object" ? P[j] = {} : P[j] = "", P;
              },
              {}
            );
            g({ formData: x });
          },
          className: "px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium",
          children: "Reset"
        }
      )
    ] }) })
  ] });
}, v6 = async (e, t, r) => {
}, $6 = async (e, t, r, n) => {
};
function b6({ onDropDelete: e }) {
  const { removeWidget: t } = Dn(), r = te((i) => {
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
      className: "bg-red-50 min-h-14 h-18 flex items-center justify-center p-0 border-2 border-dashed border-red-200 rounded-lg transition-all duration-200 hover:bg-red-100 cursor-pointer group",
      children: /* @__PURE__ */ d.jsx("div", { className: "w-full h-full flex flex-col items-center justify-center m-3", children: /* @__PURE__ */ d.jsx(
        "svg",
        {
          className: "w-14 h-14 text-red-300 group-hover:text-red-400 transition-colors",
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
const _6 = ({
  componentMapProvider: e,
  onDragStart: t
}) => {
  const { setSelectedComponent: r, setSelectedInstance: n } = Rn(), s = Qd(e);
  return /* @__PURE__ */ d.jsxs("div", { className: "p-4 space-y-4", children: [
    /* @__PURE__ */ d.jsx("h3", { className: "text-lg font-medium mb-3", children: "Components" }),
    /* @__PURE__ */ d.jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Drag components to the main area or click to select them" }),
    /* @__PURE__ */ d.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ d.jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Delete Zone" }),
      /* @__PURE__ */ d.jsx(
        b6,
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
}, w6 = ({ onFileUpload: e, onGetTags: t }) => {
  const { pageAttributes: r, setPageAttributes: n } = Rn(), [s, a] = de(null), [i, o] = de(!1), l = Xt(null), [u, c] = de([
    "home",
    "person",
    "story"
  ]), f = (v, g) => {
    const p = {
      ...r,
      [v]: g
    };
    n(p);
  }, m = async (v) => {
    var p;
    const g = (p = v.target.files) == null ? void 0 : p[0];
    if (g) {
      const $ = URL.createObjectURL(g);
      a($), o(!0);
      try {
        let b = $;
        e && (b = await e(g), URL.revokeObjectURL($), a(null)), f("image", b);
      } catch (b) {
        console.error("Failed to upload image:", b), alert("Failed to upload image. Please try again.");
      } finally {
        o(!1);
      }
    }
  }, h = () => {
    s && URL.revokeObjectURL(s), a(null), f("image", ""), l.current && (l.current.value = "");
  };
  Xe(() => {
    const v = async () => t ? await t() || [] : ["home", "person", "story"];
    if (t) {
      const g = v() || [];
      c(g);
    }
  }, [t]);
  const y = ["draft", "published"];
  return /* @__PURE__ */ d.jsxs("div", { className: "p-4 space-y-6", children: [
    /* @__PURE__ */ d.jsx("h3", { className: "text-lg font-medium mb-3", children: "Page Settings" }),
    /* @__PURE__ */ d.jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Configure the overall page layout and appearance" }),
    /* @__PURE__ */ d.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "border-b border-gray-100 pb-4", children: [
        /* @__PURE__ */ d.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-3", children: "Page Image" }),
        /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-start space-y-3", children: [
          r.image || s ? /* @__PURE__ */ d.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ d.jsx(
              "img",
              {
                src: r.image || s || "",
                alt: "Page preview",
                className: "w-32 h-32 object-cover rounded-lg border border-gray-200"
              }
            ),
            /* @__PURE__ */ d.jsx(
              "button",
              {
                type: "button",
                onClick: h,
                disabled: i,
                className: "absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 disabled:bg-gray-400",
                children: "×"
              }
            )
          ] }) : /* @__PURE__ */ d.jsx("div", { className: "w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400", children: i ? "Uploading..." : "No image" }),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              ref: l,
              type: "file",
              accept: "image/*",
              onChange: m,
              disabled: i,
              className: "hidden",
              id: "page-image-upload"
            }
          ),
          /* @__PURE__ */ d.jsx(
            "label",
            {
              htmlFor: "page-image-upload",
              className: `px-4 py-2 rounded-lg transition-colors cursor-pointer text-sm ${i ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`,
              children: i ? "Uploading..." : "Upload Image"
            }
          ),
          /* @__PURE__ */ d.jsx("p", { className: "text-xs text-gray-500", children: e ? "Image will be uploaded to your server" : "Image will be stored locally (for demo)" })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "border-b border-gray-100 pb-4", children: [
        /* @__PURE__ */ d.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Tag" }),
        /* @__PURE__ */ d.jsxs(
          "select",
          {
            value: r.tag || "",
            onChange: (v) => f("tag", v.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            children: [
              /* @__PURE__ */ d.jsx("option", { value: "", children: "Select a tag" }),
              u.map((v) => /* @__PURE__ */ d.jsx("option", { value: v, children: v }, v))
            ]
          }
        ),
        /* @__PURE__ */ d.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Categorize your page with a tag" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "border-b border-gray-100 pb-4", children: [
        /* @__PURE__ */ d.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Status" }),
        /* @__PURE__ */ d.jsx(
          "select",
          {
            value: r.status || "draft",
            onChange: (v) => f("status", v.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            children: y.map((v) => /* @__PURE__ */ d.jsx("option", { value: v, children: v.charAt(0).toUpperCase() + v.slice(1) }, v))
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
            checked: r.showMenubar,
            onChange: (v) => f(
              "showMenubar",
              v.target.checked
            ),
            className: "w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Margin" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "text",
            value: r.margin,
            onChange: (v) => f("margin", v.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
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
            value: r.padding,
            onChange: (v) => f("padding", v.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            placeholder: "e.g., 20px, 2rem"
          }
        ),
        /* @__PURE__ */ d.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Space inside the page container" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Background Color" }),
        /* @__PURE__ */ d.jsxs("div", { className: "flex gap-3 items-center", children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "color",
              value: r.background,
              onChange: (v) => f("background", v.target.value),
              className: "w-12 h-12 border border-gray-300 rounded cursor-pointer"
            }
          ),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "text",
              value: r.background,
              onChange: (v) => f("background", v.target.value),
              className: "flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              placeholder: "#ffffff, rgb(255,255,255), etc."
            }
          )
        ] }),
        /* @__PURE__ */ d.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Background color for the main content area" })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg", children: [
      /* @__PURE__ */ d.jsx("h4", { className: "font-medium text-blue-800 mb-2", children: "Current Page Settings" }),
      /* @__PURE__ */ d.jsxs("div", { className: "text-sm text-blue-700 grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ d.jsxs("div", { children: [
          "Menu Bar:",
          " ",
          /* @__PURE__ */ d.jsx("code", { children: r.showMenubar ? "Visible" : "Hidden" })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { children: [
          "Tag: ",
          /* @__PURE__ */ d.jsx("code", { children: r.tag || "Not set" })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { children: [
          "Status: ",
          /* @__PURE__ */ d.jsx("code", { children: r.status || "draft" })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { children: [
          "Margin: ",
          /* @__PURE__ */ d.jsx("code", { children: r.margin })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { children: [
          "Padding: ",
          /* @__PURE__ */ d.jsx("code", { children: r.padding })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { children: [
          "Background: ",
          /* @__PURE__ */ d.jsx("code", { children: r.background })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "col-span-2", children: [
          "Image:",
          " ",
          /* @__PURE__ */ d.jsx("code", { children: r.image ? e ? "Remote" : "Local" : "Not set" })
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
  const [i, o] = de(null), [l, u] = de(!1), c = async () => {
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
        children: l ? /* @__PURE__ */ d.jsx(Xd, { className: "stack-btn-icon animate-spin" }) : /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
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
const x6 = () => {
  const [e, t] = de(!1);
  return Xe(() => {
    const r = () => {
      t(window.innerWidth <= 768);
    };
    return r(), window.addEventListener("resize", r), () => {
      window.removeEventListener("resize", r);
    };
  }, []), e;
}, S6 = ({
  pageid: e,
  pageMode: t,
  onSaveLayout: r,
  onLoadLayout: n,
  componentMapProvider: s,
  componentPropsProvider: a,
  gobackList: i,
  onFileUpload: o,
  onGetTags: l,
  onApiCall: u,
  onCustomAction: c,
  onGetSelectOptions: f,
  children: m
}) => {
  const [h, y] = de(
    t
  ), v = x6(), [g, p] = de(!v), [$, b] = de(!1), w = Xt(!0), {
    activeTab: x,
    setActiveTab: P,
    pageAttributes: j,
    setPageAttributes: N,
    setSelectedInstance: A,
    setSelectedComponent: C,
    widgetProps: F
    // Add this to get widgetProps from context
  } = Rn(), [D, U] = de({
    ...za(),
    id: e
  }), [M, B] = de(), [R, Q] = de(), [Z, ee] = de(0), [k, E] = de($i), T = Xt(null), [O, _] = de(), [S, I] = de(!1);
  Xe(() => {
    y(t);
  }, [t]), Xe(() => {
    setTimeout(() => {
      w.current && v && (w.current = !1, p(!v));
    }, 100);
  }, [v]), Xe(() => {
    h === "preview" || h === "view" ? N((K) => ({
      ...K,
      showMenubar: !1
    })) : h === "edit" && N((K) => ({
      ...K,
      showMenubar: !0
    }));
  }, [h, N]);
  const W = te(
    async (K) => {
      const le = await n(K) || za();
      return U(le), B(le.title), Q(le.title), N(le.pageAttributes || j), le.grids;
    },
    [n]
  ), V = te(async () => {
    if (e) {
      const K = await W(e);
      E(K), ee((le) => le + 1), Je(), console.log(`reload layout: pageid ${e}, props id ${D == null ? void 0 : D.id}`);
    }
  }, [e, W]);
  Xe(() => {
    (async () => {
      if (e)
        try {
          await V();
        } catch (le) {
          console.error("Failed to load layout:", le);
        }
    })();
  }, [e, V]);
  const ne = () => {
    i && i();
  }, re = (K, le) => {
    if (!K) return K;
    const gt = Array.isArray(K) ? K : K.children;
    if (!gt) return K;
    const Ct = gt.map((Me) => {
      if (Me.id && le.has(Me.id)) {
        const ts = le.get(Me.id);
        try {
          let yt = { name: "", props: {} };
          return Me.content && (yt = JSON.parse(Me.content)), yt.props = { ...yt.props, ...ts }, {
            ...Me,
            content: JSON.stringify(yt)
          };
        } catch (yt) {
          return console.error(`Error updating props for widget ${Me.id}:`, yt), Me;
        }
      }
      return Me;
    });
    return Array.isArray(K) ? Ct : {
      ...K,
      children: Ct
    };
  }, we = async () => {
    var K;
    if (r) {
      let le = (K = T.current) == null ? void 0 : K.saveLayout();
      if (console.log("****grid stack layout: ", le), le) {
        le = re(le, F);
        const gt = {
          ...D || za(),
          grids: le,
          title: R,
          tag: j.tag,
          status: j.status,
          pageAttributes: j
        };
        console.log(
          `Saving layout: pageid ${e}, props id ${gt.id}`
        ), await r(e, gt);
      }
    }
  }, Je = () => {
    C(null), A(null);
  }, Wt = () => {
    confirm("Are you sure you want to clear all data? This cannot be undone.") && (E($i), ee((K) => K + 1), Je());
  }, Pt = () => {
    b(!0);
  }, ke = () => {
    b(!1);
  }, Vt = (K) => {
    K.key === "Enter" ? ke() : K.key === "Escape" && (Q(M), b(!1));
  }, zt = (K, le) => {
    K.dataTransfer.setData("text/plain", le), K.dataTransfer.effectAllowed = "copy";
  }, pr = (K) => {
    _(K);
  }, Xr = te(
    (K) => {
      const le = {
        id: K.id,
        type: K.name,
        props: K.props
      };
      A(le), C(K.name), P("properties");
    },
    [A, C, P]
  ), Qr = () => {
    var le;
    const K = JSON.parse(JSON.stringify(D));
    return K.grids = (le = T.current) == null ? void 0 : le.saveLayout(), K;
  };
  Xe(() => {
    O && T.current && (O.name !== "SubGrid" ? T.current.addWidget((K) => ({
      ...O,
      sizeToContent: !0,
      content: JSON.stringify({
        name: O.name,
        props: Wg(a)[O.name]
      })
    })) : T.current.addSubGrid((K) => ({
      ...O,
      ...Ug
    })));
  }, [O, a]);
  const en = v ? {
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
  }, tn = {
    margin: j.margin,
    padding: j.padding,
    backgroundColor: j.background
  };
  return /* @__PURE__ */ d.jsx(ng, { initialOptions: k, children: /* @__PURE__ */ d.jsxs("div", { className: "min-h-screen bg-white text-black flex flex-col", children: [
    h === "edit" && /* @__PURE__ */ d.jsx("header", { className: "mx-2 p-4 bg-white shadow relative", children: /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col md:flex-row md:items-center text-lg", children: [
      /* @__PURE__ */ d.jsx("div", { className: "flex-1 mb-3 sm:mb-0 min-w-0", children: /* @__PURE__ */ d.jsx("div", { className: "flex items-center gap-2", children: $ ? /* @__PURE__ */ d.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "text",
          value: R,
          onChange: (K) => Q(K.target.value),
          onKeyDown: Vt,
          onBlur: ke,
          maxLength: 100,
          className: "text-2xl font-bold border-b-2 border-blue-500 bg-transparent outline-none px-1",
          autoFocus: !0
        }
      ) }) : /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2 group", children: [
        /* @__PURE__ */ d.jsx("h1", { className: "text-2xl font-bold truncate", children: R }),
        /* @__PURE__ */ d.jsx(
          "button",
          {
            onClick: Pt,
            className: "p-1 text-gray-400 hover:text-gray-600 group-hover:opacity-100 transition-opacity",
            children: /* @__PURE__ */ d.jsx(Dg, { className: "stack-btn-icon" })
          }
        )
      ] }) }) }),
      /* @__PURE__ */ d.jsxs("div", { className: "flex flex-wrap gap-1 justify-end", children: [
        /* @__PURE__ */ d.jsx(
          un,
          {
            onClick: ne,
            icon: /* @__PURE__ */ d.jsx(jg, { className: "stack-btn-icon" }),
            tooltip: "Back to list",
            className: "bg-gray-200 hover:bg-gray-300"
          }
        ),
        /* @__PURE__ */ d.jsx(
          un,
          {
            onClick: () => y("preview"),
            icon: /* @__PURE__ */ d.jsx(Tg, { className: "stack-btn-icon" }),
            tooltip: "Preview",
            className: "bg-purple-600 hover:bg-purple-700 text-white"
          }
        ),
        /* @__PURE__ */ d.jsx(
          Vd,
          {
            onClick: we,
            icon: /* @__PURE__ */ d.jsx(Pg, { className: "stack-btn-icon" }),
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
            icon: /* @__PURE__ */ d.jsx(Xd, { className: "stack-btn-icon" }),
            label: "Reload",
            className: "bg-green-600 hover:bg-green-700 text-white",
            successMessage: "Reloaded successfully",
            errorMessage: "Failed to reload"
          }
        ),
        /* @__PURE__ */ d.jsx(
          un,
          {
            onClick: Wt,
            icon: /* @__PURE__ */ d.jsx(Mg, { className: "stack-btn-icon" }),
            tooltip: "Clear all data",
            className: "bg-red-600 hover:bg-red-700 text-white"
          }
        ),
        /* @__PURE__ */ d.jsx(
          un,
          {
            onClick: () => I(!0),
            icon: /* @__PURE__ */ d.jsx(Fg, { className: "stack-btn-icon" }),
            tooltip: "Page Info & Settings",
            className: "bg-indigo-600 hover:bg-indigo-700 text-white"
          }
        ),
        !v && /* @__PURE__ */ d.jsx(
          un,
          {
            onClick: () => p(!g),
            icon: g ? /* @__PURE__ */ d.jsx(ac, { className: "stack-btn-icon" }) : /* @__PURE__ */ d.jsx(sc, { className: "stack-btn-icon" }),
            tooltip: g ? "Hide Editor" : "Show Editor",
            className: "bg-gray-200 hover:bg-gray-300"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ d.jsxs("div", { className: "flex flex-1 overflow-hidden relative", children: [
      /* @__PURE__ */ d.jsx(
        "div",
        {
          className: `flex-1 transition-all duration-200 ${g && h === "edit" ? "overflow-auto" : "overflow-hidden"}`,
          style: tn,
          children: /* @__PURE__ */ d.jsx("div", { className: "h-full", children: /* @__PURE__ */ d.jsx("div", { className: "bg-white rounded-lg shadow h-full flex flex-col", children: /* @__PURE__ */ d.jsxs(
            "div",
            {
              className: `flex-1 relative p-0 grid-stack-mode-${h}`,
              children: [
                /* @__PURE__ */ d.jsx(Vg, { ref: T }),
                /* @__PURE__ */ d.jsx(
                  gg,
                  {
                    onGridStackDropEvent: pr,
                    children: /* @__PURE__ */ d.jsx(
                      wg,
                      {
                        componentMap: Qd(s),
                        showMenubar: j.showMenubar,
                        onWidgetSelect: Xr
                      }
                    )
                  }
                ),
                m
              ]
            }
          ) }) })
        }
      ),
      h === "edit" && g && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        v && /* @__PURE__ */ d.jsx(
          "div",
          {
            className: "relative inset-0 bg-black bg-opacity-50 z-40 stack-tab-panel-top-mobile",
            onClick: () => p(!1)
          }
        ),
        /* @__PURE__ */ d.jsxs(
          "div",
          {
            className: `flex flex-col bg-white shadow-lg border-l border-gray-200 ${v ? "fixed right-0 bottom-0 transform transition-transform duration-300" : "relative"}`,
            style: en,
            children: [
              v && /* @__PURE__ */ d.jsx("div", { className: "absolute top-4 right-4 z-10", children: /* @__PURE__ */ d.jsx(
                "button",
                {
                  onClick: () => p(!1),
                  className: "p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors",
                  children: /* @__PURE__ */ d.jsx(ac, { className: "stack-btn-icon" })
                }
              ) }),
              /* @__PURE__ */ d.jsx("div", { className: "flex border-b border-gray-200 pt-4 px-4", children: ["components", "properties", "page"].map(
                (K) => /* @__PURE__ */ d.jsx(
                  "button",
                  {
                    className: `flex-1 py-3 px-4 text-sm font-medium capitalize transition-colors ${x === K ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`,
                    onClick: () => P(K),
                    children: K
                  },
                  K
                )
              ) }),
              /* @__PURE__ */ d.jsxs("div", { className: "flex-1 overflow-y-auto pb-4", children: [
                /* @__PURE__ */ d.jsx(
                  "div",
                  {
                    style: {
                      display: x === "components" ? "block" : "none"
                    },
                    children: /* @__PURE__ */ d.jsx(
                      _6,
                      {
                        componentMapProvider: s,
                        onDragStart: zt
                      }
                    )
                  }
                ),
                /* @__PURE__ */ d.jsx(
                  "div",
                  {
                    style: {
                      display: x === "properties" ? "block" : "none"
                    },
                    children: /* @__PURE__ */ d.jsx(
                      y6,
                      {
                        onFileUpload: o,
                        onApiCall: u,
                        onCustomAction: c,
                        onGetSelectOptions: f
                      }
                    )
                  }
                ),
                /* @__PURE__ */ d.jsx(
                  "div",
                  {
                    style: { display: x === "page" ? "block" : "none" },
                    children: /* @__PURE__ */ d.jsx(
                      w6,
                      {
                        onFileUpload: o,
                        onGetTags: l
                      }
                    )
                  }
                )
              ] })
            ]
          }
        )
      ] })
    ] }),
    h === "edit" && v && !g && /* @__PURE__ */ d.jsx("div", { className: "fixed bottom-4 right-4 z-30", children: /* @__PURE__ */ d.jsx(
      "button",
      {
        onClick: () => p(!0),
        className: "p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors",
        children: /* @__PURE__ */ d.jsx(sc, { className: "stack-btn-icon" })
      }
    ) }),
    h === "preview" && /* @__PURE__ */ d.jsx("div", { className: "fixed inset-0 pointer-events-none z-50", children: /* @__PURE__ */ d.jsx("div", { className: "absolute bottom-8 right-8 pointer-events-auto", children: /* @__PURE__ */ d.jsxs(
      "button",
      {
        onClick: () => y("edit"),
        className: "flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 group",
        title: "Return to Edit Mode",
        children: [
          /* @__PURE__ */ d.jsx(nc, { className: "stack-btn-icon group-hover:animate-bounce" }),
          /* @__PURE__ */ d.jsx("span", { className: "text-sm font-medium", children: "Edit Mode" })
        ]
      }
    ) }) }),
    h === "view" && /* @__PURE__ */ d.jsx("div", { className: "fixed inset-0 pointer-events-none z-50", children: /* @__PURE__ */ d.jsx("div", { className: "absolute bottom-8 right-8 pointer-events-auto", children: /* @__PURE__ */ d.jsxs(
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
      Bg,
      {
        isOpen: S,
        pageInfo: Qr(),
        resetOpenInfo: I
      }
    )
  ] }) }, Z);
}, T6 = (e) => /* @__PURE__ */ d.jsx(qg, { children: /* @__PURE__ */ d.jsx(S6, { ...e }) });
export {
  ng as GridStackProvider,
  wg as GridStackRender,
  gg as GridStackRenderProvider,
  C6 as LocaleProvider,
  T6 as StackPage,
  za as getDefaultPageProps,
  Dn as useGridStackContext,
  N6 as useGridStackWidgetContext,
  P6 as useLocale
};
//# sourceMappingURL=stackpage.es.js.map
