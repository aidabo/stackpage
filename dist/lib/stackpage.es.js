var hm = Object.defineProperty;
var mm = (e, t, r) => t in e ? hm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var me = (e, t, r) => mm(e, typeof t != "symbol" ? t + "" : t, r);
import * as re from "react";
import fe, { createContext as jn, useContext as Pr, useState as $e, useCallback as oe, useRef as Ut, useLayoutEffect as zl, useMemo as Pd, useEffect as st, forwardRef as gm, useImperativeHandle as ym, createElement as vm, Component as En, useReducer as bm, createRef as $m } from "react";
import { GridStack as an } from "gridstack";
import { createPortal as wm } from "react-dom";
var Gn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function On(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Cd = { exports: {} }, Ls = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _m = fe, xm = Symbol.for("react.element"), Sm = Symbol.for("react.fragment"), jm = Object.prototype.hasOwnProperty, Em = _m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Om = { key: !0, ref: !0, __self: !0, __source: !0 };
function Td(e, t, r) {
  var n, s = {}, a = null, i = null;
  r !== void 0 && (a = "" + r), t.key !== void 0 && (a = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (n in t) jm.call(t, n) && !Om.hasOwnProperty(n) && (s[n] = t[n]);
  if (e && e.defaultProps) for (n in t = e.defaultProps, t) s[n] === void 0 && (s[n] = t[n]);
  return { $$typeof: xm, type: e, key: a, ref: i, props: s, _owner: Em.current };
}
Ls.Fragment = Sm;
Ls.jsx = Td;
Ls.jsxs = Td;
Cd.exports = Ls;
var d = Cd.exports;
const Id = jn(null);
function Nn() {
  const e = Pr(Id);
  if (!e)
    throw new Error(
      "useGridStackContext must be used within a GridStackProvider"
    );
  return e;
}
function Nm({
  children: e,
  initialOptions: t
}) {
  const [r, n] = $e(null), [s, a] = $e(() => {
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
  }), i = oe(
    (c) => {
      const f = `widget-${Math.random().toString(36).substring(2, 15)}`, m = c(f);
      r == null || r.addWidget({ ...m, id: f }), a((h) => {
        const g = new Map(h);
        return g.set(f, m), g;
      });
    },
    [r]
  ), o = oe(
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
  ), l = oe(
    (c) => {
      r == null || r.removeWidget(c), a((f) => {
        const m = new Map(f);
        return m.delete(c), m;
      });
    },
    [r]
  ), u = oe(() => r == null ? void 0 : r.save(!0, !0, (c, f) => f), [r]);
  return /* @__PURE__ */ d.jsx(
    Id.Provider,
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
const Fd = jn(null);
function Am() {
  const e = Pr(Fd);
  if (!e)
    throw new Error(
      "useGridStackRenderContext must be used within a GridStackProvider"
    );
  return e;
}
var Pm = typeof Element < "u", Cm = typeof Map == "function", Tm = typeof Set == "function", Im = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
function os(e, t) {
  if (e === t) return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor) return !1;
    var r, n, s;
    if (Array.isArray(e)) {
      if (r = e.length, r != t.length) return !1;
      for (n = r; n-- !== 0; )
        if (!os(e[n], t[n])) return !1;
      return !0;
    }
    var a;
    if (Cm && e instanceof Map && t instanceof Map) {
      if (e.size !== t.size) return !1;
      for (a = e.entries(); !(n = a.next()).done; )
        if (!t.has(n.value[0])) return !1;
      for (a = e.entries(); !(n = a.next()).done; )
        if (!os(n.value[1], t.get(n.value[0]))) return !1;
      return !0;
    }
    if (Tm && e instanceof Set && t instanceof Set) {
      if (e.size !== t.size) return !1;
      for (a = e.entries(); !(n = a.next()).done; )
        if (!t.has(n.value[0])) return !1;
      return !0;
    }
    if (Im && ArrayBuffer.isView(e) && ArrayBuffer.isView(t)) {
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
    if (Pm && e instanceof Element) return !1;
    for (n = r; n-- !== 0; )
      if (!((s[n] === "_owner" || s[n] === "__v" || s[n] === "__o") && e.$$typeof) && !os(e[s[n]], t[s[n]]))
        return !1;
    return !0;
  }
  return e !== e && t !== t;
}
var Fm = function(t, r) {
  try {
    return os(t, r);
  } catch (n) {
    if ((n.message || "").match(/stack|recursion/i))
      return console.warn("react-fast-compare cannot handle circular refs"), !1;
    throw n;
  }
};
const km = /* @__PURE__ */ On(Fm), Fe = [];
for (let e = 0; e < 256; ++e)
  Fe.push((e + 256).toString(16).slice(1));
function Dm(e, t = 0) {
  return (Fe[e[t + 0]] + Fe[e[t + 1]] + Fe[e[t + 2]] + Fe[e[t + 3]] + "-" + Fe[e[t + 4]] + Fe[e[t + 5]] + "-" + Fe[e[t + 6]] + Fe[e[t + 7]] + "-" + Fe[e[t + 8]] + Fe[e[t + 9]] + "-" + Fe[e[t + 10]] + Fe[e[t + 11]] + Fe[e[t + 12]] + Fe[e[t + 13]] + Fe[e[t + 14]] + Fe[e[t + 15]]).toLowerCase();
}
let Ia;
const Rm = new Uint8Array(16);
function Mm() {
  if (!Ia) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    Ia = crypto.getRandomValues.bind(crypto);
  }
  return Ia(Rm);
}
const Lm = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), ql = { randomUUID: Lm };
function Um(e, t, r) {
  var s;
  if (ql.randomUUID && !e)
    return ql.randomUUID();
  e = e || {};
  const n = e.random ?? ((s = e.rng) == null ? void 0 : s.call(e)) ?? Mm();
  if (n.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, Dm(n);
}
const Wm = an.prototype.resizeToContent;
an.prototype.resizeToContent = function(e) {
  const t = e.querySelector(".grid-stack-item-content");
  if (t != null && t.firstElementChild)
    return Wm.call(this, e);
};
function Vm({
  children: e,
  onGridStackDropEvent: t
}) {
  const {
    _gridStack: { value: r, set: n },
    initialOptions: s
  } = Nn(), a = Ut(/* @__PURE__ */ new Map()), i = Ut(null), o = Ut(s), l = oe(
    (c, f) => {
      f.id && a.current.set(f.id, c);
    },
    []
  ), u = oe(() => {
    if (i.current) {
      an.renderCB = l;
      const c = an.init(o.current, i.current);
      return an.setupDragIn(
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
              id: Um(),
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
  return zl(() => {
    if (!km(s, o.current) && r)
      try {
        r.removeAll(!1), r.destroy(!1), a.current.clear(), o.current = s, n(u());
      } catch (c) {
        console.error("Error reinitializing gridstack", c);
      }
  }, [s, r, u, n]), zl(() => {
    if (!r)
      try {
        n(u());
      } catch (c) {
        console.error("Error initializing gridstack", c);
      }
  }, [r, u, n]), /* @__PURE__ */ d.jsx(
    Fd.Provider,
    {
      value: Pd(
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
const kd = jn(null);
function y9() {
  const e = Pr(kd);
  if (!e)
    throw new Error(
      "useGridStackWidgetContext must be used within a GridStackWidgetProvider"
    );
  return e;
}
function zm({
  widgetId: e
}) {
  const { removeWidget: t } = Nn(), [r, n] = re.useState(!1), [s, a] = re.useState({ top: 0, left: 0 }), i = re.useRef(null), o = (c) => {
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
  return re.useEffect(() => {
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
function qm({ widgetId: e, children: t }) {
  const r = Ut(null);
  return st(() => {
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
function Bm(e) {
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
function Km({
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
  const l = Bm(t), u = o || l.props, c = (u == null ? void 0 : u.title) || `Widget ${e.slice(0, 4)}`, f = (h) => {
    i && i({
      id: e,
      name: l.name,
      props: u
      // Use the resolved props
    });
  }, m = /* @__PURE__ */ d.jsx(qm, { widgetId: e, children: /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: `h-full w-full ${a ? "outline outline-2 outline-blue-400 outline-offset-1" : ""}`,
      onClick: f,
      children: [
        s && /* @__PURE__ */ d.jsxs("div", { className: "widget-header flex items-center justify-between bg-gray-100 border-b px-2 min-h-[36px]", children: [
          /* @__PURE__ */ d.jsx("div", { className: "font-medium truncate text-sm px-1", children: c }),
          /* @__PURE__ */ d.jsx(zm, { widgetId: e })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "widget-body flex-1 min-h-[40px] cursor-pointer", children: [
          /* @__PURE__ */ d.jsx(r, { ...u }),
          " "
        ] })
      ]
    }
  ) });
  return /* @__PURE__ */ d.jsx(kd.Provider, { value: { widget: { id: e } }, children: wm(m, n) });
}
const Li = jn(
  void 0
), An = () => {
  const e = Pr(Li);
  if (!e)
    throw new Error("useStackPage must be used within a StackPageProvider");
  return e;
}, Dd = () => {
  const e = Pr(Li);
  if (!e)
    throw new Error(
      "useStackPageWidgetProps must be used within a StackPageProvider"
    );
  return {
    widgetProps: e.widgetProps,
    updateWidgetProps: e.updateWidgetProps
  };
};
function Gm(e) {
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
function Hm({
  componentMap: e,
  showMenubar: t = !1,
  onWidgetSelect: r
}) {
  const { _rawWidgetMetaMap: n } = Nn(), { getWidgetContainer: s } = Am(), { widgetProps: a } = Dd(), { selectedInstance: i } = An();
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    Array.from(n.value.entries()).length === 0 && /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 p-8 text-center", children: [
      /* @__PURE__ */ d.jsx("div", { className: "text-4xl mb-4", children: "📦" }),
      /* @__PURE__ */ d.jsx("h3", { className: "text-lg font-medium mb-2", children: "Drag Components Here" }),
      /* @__PURE__ */ d.jsx("p", { className: "text-sm", children: "Drag components from the Components tab in the right panel to start building your layout" })
    ] }),
    Array.from(n.value.entries()).map(([o, l]) => {
      const { name: u, props: c } = Gm(l), f = e[u], m = s(o), h = a.get(o) || c;
      return !f || !m ? null : /* @__PURE__ */ d.jsx(
        Km,
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
const Rd = jn(void 0), v9 = () => {
  const e = Pr(Rd);
  if (!e)
    throw new Error("useLocale must be used within a LocaleProvider");
  return e;
}, b9 = ({ children: e, defaultLocale: t = "en-US" }) => {
  const [r, n] = $e(t);
  return /* @__PURE__ */ d.jsx(Rd.Provider, { value: { locale: r, setLocale: n }, children: e });
};
function Jm({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ re.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ re.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ re.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const Bl = /* @__PURE__ */ re.forwardRef(Jm);
function Ym({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ re.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ re.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ re.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
  }));
}
const Zm = /* @__PURE__ */ re.forwardRef(Ym);
function Xm({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ re.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ re.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ re.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
  }));
}
const Md = /* @__PURE__ */ re.forwardRef(Xm);
function Qm({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ re.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ re.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ re.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 19.5 8.25 12l7.5-7.5"
  }));
}
const Kl = /* @__PURE__ */ re.forwardRef(Qm);
function eg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ re.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ re.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ re.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m8.25 4.5 7.5 7.5-7.5 7.5"
  }));
}
const Gl = /* @__PURE__ */ re.forwardRef(eg);
function tg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ re.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ re.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ re.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
  }));
}
const rg = /* @__PURE__ */ re.forwardRef(tg);
function ng({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ re.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ re.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ re.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
  }), /* @__PURE__ */ re.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
  }));
}
const sg = /* @__PURE__ */ re.forwardRef(ng);
function ag({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ re.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ re.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ re.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
  }));
}
const ig = /* @__PURE__ */ re.forwardRef(ag);
function og({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ re.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ re.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ re.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
  }));
}
const lg = /* @__PURE__ */ re.forwardRef(og);
function cg({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ re.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ re.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ re.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
  }));
}
const ug = /* @__PURE__ */ re.forwardRef(cg);
function dg({ content: e }) {
  return /* @__PURE__ */ d.jsx("div", { className: "flex items-start p-2 bg-white border rounded shadow-sm text-left", children: /* @__PURE__ */ d.jsx("div", { children: /* @__PURE__ */ d.jsx("p", { className: "text-sm", children: e }) }) });
}
const oi = "1rem", li = [
  //{ c: 1, w: 300 },   // 1 column on screens < 300px
  { c: 1, w: 500 },
  // 2 columns between 300px - 500px
  { c: 3, w: 800 },
  // 4 columns between 500px - 800px
  { c: 6, w: 1024 }
  // 6 columns between 800px - 1024px
  //{ c: 8, w: 1200 },  // 8 columns on screens > 1200px
], Fa = {
  acceptWidgets: !0,
  removable: "#trash",
  sizeToContent: !0,
  resizable: { handles: "se" },
  minRow: 10,
  columnOpts: {
    breakpointForWindow: !0,
    breakpoints: li,
    layout: "moveScale",
    columnMax: 12
  },
  margin: 5,
  cellHeight: oi,
  subGridDynamic: !0,
  // v7 api to create sub-grids on the fly
  subGridOpts: {
    acceptWidgets: !0,
    removable: "#trash",
    resizable: { handles: "se" },
    sizeToContent: !0,
    subGridDynamic: !0,
    columnOpts: {
      breakpoints: li,
      layout: "moveScale"
    },
    margin: 5,
    minRow: 1,
    cellHeight: oi
  },
  children: []
}, fg = {
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
      breakpoints: li,
      layout: "moveScale"
    },
    margin: 5,
    minRow: 6,
    cellHeight: oi,
    children: []
  },
  children: []
}, Hl = {
  Text: {
    content: "Any content other than text are what we call cards. Cards can be accessed by clicking the ➕ button or typing / at the beginning of a paragraph.\nEven better, continue typing to find the card you're looking for, hit enter, and avoid dragging your mouse altogether.\nSome cards have a handy little shortcut, to keep you on track and in flow. Use --- to divide your paragraphs with a line, or ``` to add a code block. You can also drag and drop images directly into the editor to bypass the menu. \nAny content other than text are what we call cards. Cards can be accessed by clicking the ➕ button or typing / at the beginning of a paragraph.",
    title: "This is text card"
  }
}, Jl = {
  Text: dg
}, Ld = (e) => {
  if (e) {
    const t = e();
    return { ...Jl, ...t };
  }
  return Jl;
}, pg = (e) => {
  if (e) {
    const t = e();
    return { ...Hl, ...t };
  }
  return Hl;
}, hg = gm((e, t) => {
  const { addWidget: r, addSubGrid: n, saveOptions: s, _rawWidgetMetaMap: a } = Nn();
  return ym(t, () => ({
    saveLayout: () => s(),
    addWidget: r,
    addSubGrid: n,
    rawWidgetMetaMap: a
  })), null;
});
function mg({ pageInfo: e }) {
  const [t, r] = $e(void 0);
  return st(() => {
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
function gg({
  isOpen: e,
  pageInfo: t,
  resetOpenInfo: r
}) {
  const [n, s] = re.useState(!1);
  re.useEffect(() => {
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
        /* @__PURE__ */ d.jsx("div", { className: "p-4 overflow-y-auto flex-1", children: /* @__PURE__ */ d.jsx(mg, { pageInfo: t }) }),
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
function yg({ children: e }) {
  const [t, r] = $e(
    null
  ), [n, s] = $e(null), [a, i] = $e({
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
  }), [o, l] = $e("components"), [u, c] = $e(
    /* @__PURE__ */ new Map()
  ), f = oe((h, g) => {
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
  return /* @__PURE__ */ d.jsx(Li.Provider, { value: m, children: e });
}
function ce(e) {
  return typeof e != "object" || e === null || typeof e.lastModified == "number" && typeof File < "u" && e instanceof File || typeof e.getMonth == "function" && typeof Date < "u" && e instanceof Date ? !1 : !Array.isArray(e);
}
function vg(e) {
  return e.additionalItems === !0 && console.warn("additionalItems=true is currently not supported"), ce(e.additionalItems);
}
function Yl(e) {
  if (e === "")
    return;
  if (e === null)
    return null;
  if (/\.$/.test(e) || /\.0$/.test(e) || /\.\d*0$/.test(e))
    return e;
  const t = Number(e);
  return typeof t == "number" && !Number.isNaN(t) ? t : e;
}
const Pn = "__additional_property", ci = "additionalProperties", Cr = "allOf", it = "anyOf", Ot = "const", bg = "default", Us = "dependencies", $g = "enum", Be = "__errors", Mt = "$id", wg = "if", Wt = "items", _g = "_$junk_option_schema_id$_", ls = "$name", Ke = "oneOf", Oe = "properties", xg = "required", ws = "submitButtonOptions", Te = "$ref", Ui = "__rjsf_additionalProperties", Ud = "__rjsf_rootSchema", Sg = "ui:field", Wi = "ui:widget", on = "ui:options", jg = "ui:globalOptions";
function le(e = {}, t = {}) {
  return Object.keys(e).filter((r) => r.indexOf("ui:") === 0).reduce((r, n) => {
    const s = e[n];
    return n === Wi && ce(s) ? (console.error("Setting options via ui:widget object is no longer supported, use ui:options instead"), r) : n === on && ce(s) ? { ...r, ...s } : { ...r, [n.substring(3)]: s };
  }, { ...t });
}
function Eg(e, t = {}, r) {
  if (!e.additionalProperties)
    return !1;
  const { expandable: n = !0 } = le(t);
  return n === !1 ? n : e.maxProperties !== void 0 && r ? Object.keys(r).length < e.maxProperties : !0;
}
var Wd = typeof global == "object" && global && global.Object === Object && global, Og = typeof self == "object" && self && self.Object === Object && self, ht = Wd || Og || Function("return this")(), Xe = ht.Symbol, Vd = Object.prototype, Ng = Vd.hasOwnProperty, Ag = Vd.toString, Jr = Xe ? Xe.toStringTag : void 0;
function Pg(e) {
  var t = Ng.call(e, Jr), r = e[Jr];
  try {
    e[Jr] = void 0;
    var n = !0;
  } catch {
  }
  var s = Ag.call(e);
  return n && (t ? e[Jr] = r : delete e[Jr]), s;
}
var Cg = Object.prototype, Tg = Cg.toString;
function Ig(e) {
  return Tg.call(e);
}
var Fg = "[object Null]", kg = "[object Undefined]", Zl = Xe ? Xe.toStringTag : void 0;
function Ct(e) {
  return e == null ? e === void 0 ? kg : Fg : Zl && Zl in Object(e) ? Pg(e) : Ig(e);
}
function zd(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var Ws = zd(Object.getPrototypeOf, Object);
function Qe(e) {
  return e != null && typeof e == "object";
}
var Dg = "[object Object]", Rg = Function.prototype, Mg = Object.prototype, qd = Rg.toString, Lg = Mg.hasOwnProperty, Ug = qd.call(Object);
function Zt(e) {
  if (!Qe(e) || Ct(e) != Dg)
    return !1;
  var t = Ws(e);
  if (t === null)
    return !0;
  var r = Lg.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && qd.call(r) == Ug;
}
function _s(e) {
  const t = {
    // We store the list of errors for this node in a property named __errors
    // to avoid name collision with a possible sub schema field named
    // 'errors' (see `utils.toErrorSchema`).
    [Be]: [],
    addError(r) {
      this[Be].push(r);
    }
  };
  if (Array.isArray(e))
    return e.reduce((r, n, s) => ({ ...r, [s]: _s(n) }), t);
  if (Zt(e)) {
    const r = e;
    return Object.keys(r).reduce((n, s) => ({ ...n, [s]: _s(r[s]) }), t);
  }
  return t;
}
function Wg() {
  this.__data__ = [], this.size = 0;
}
function Cn(e, t) {
  return e === t || e !== e && t !== t;
}
function Vs(e, t) {
  for (var r = e.length; r--; )
    if (Cn(e[r][0], t))
      return r;
  return -1;
}
var Vg = Array.prototype, zg = Vg.splice;
function qg(e) {
  var t = this.__data__, r = Vs(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : zg.call(t, r, 1), --this.size, !0;
}
function Bg(e) {
  var t = this.__data__, r = Vs(t, e);
  return r < 0 ? void 0 : t[r][1];
}
function Kg(e) {
  return Vs(this.__data__, e) > -1;
}
function Gg(e, t) {
  var r = this.__data__, n = Vs(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
function Tt(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Tt.prototype.clear = Wg;
Tt.prototype.delete = qg;
Tt.prototype.get = Bg;
Tt.prototype.has = Kg;
Tt.prototype.set = Gg;
function Hg() {
  this.__data__ = new Tt(), this.size = 0;
}
function Jg(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
function Yg(e) {
  return this.__data__.get(e);
}
function Zg(e) {
  return this.__data__.has(e);
}
function we(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Xg = "[object AsyncFunction]", Qg = "[object Function]", ey = "[object GeneratorFunction]", ty = "[object Proxy]";
function zs(e) {
  if (!we(e))
    return !1;
  var t = Ct(e);
  return t == Qg || t == ey || t == Xg || t == ty;
}
var ka = ht["__core-js_shared__"], Xl = function() {
  var e = /[^.]+$/.exec(ka && ka.keys && ka.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function ry(e) {
  return !!Xl && Xl in e;
}
var ny = Function.prototype, sy = ny.toString;
function rr(e) {
  if (e != null) {
    try {
      return sy.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var ay = /[\\^$.*+?()[\]{}|]/g, iy = /^\[object .+?Constructor\]$/, oy = Function.prototype, ly = Object.prototype, cy = oy.toString, uy = ly.hasOwnProperty, dy = RegExp(
  "^" + cy.call(uy).replace(ay, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function fy(e) {
  if (!we(e) || ry(e))
    return !1;
  var t = zs(e) ? dy : iy;
  return t.test(rr(e));
}
function py(e, t) {
  return e == null ? void 0 : e[t];
}
function nr(e, t) {
  var r = py(e, t);
  return fy(r) ? r : void 0;
}
var gn = nr(ht, "Map"), yn = nr(Object, "create");
function hy() {
  this.__data__ = yn ? yn(null) : {}, this.size = 0;
}
function my(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var gy = "__lodash_hash_undefined__", yy = Object.prototype, vy = yy.hasOwnProperty;
function by(e) {
  var t = this.__data__;
  if (yn) {
    var r = t[e];
    return r === gy ? void 0 : r;
  }
  return vy.call(t, e) ? t[e] : void 0;
}
var $y = Object.prototype, wy = $y.hasOwnProperty;
function _y(e) {
  var t = this.__data__;
  return yn ? t[e] !== void 0 : wy.call(t, e);
}
var xy = "__lodash_hash_undefined__";
function Sy(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = yn && t === void 0 ? xy : t, this;
}
function Xt(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Xt.prototype.clear = hy;
Xt.prototype.delete = my;
Xt.prototype.get = by;
Xt.prototype.has = _y;
Xt.prototype.set = Sy;
function jy() {
  this.size = 0, this.__data__ = {
    hash: new Xt(),
    map: new (gn || Tt)(),
    string: new Xt()
  };
}
function Ey(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function qs(e, t) {
  var r = e.__data__;
  return Ey(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
function Oy(e) {
  var t = qs(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function Ny(e) {
  return qs(this, e).get(e);
}
function Ay(e) {
  return qs(this, e).has(e);
}
function Py(e, t) {
  var r = qs(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
function It(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
It.prototype.clear = jy;
It.prototype.delete = Oy;
It.prototype.get = Ny;
It.prototype.has = Ay;
It.prototype.set = Py;
var Cy = 200;
function Ty(e, t) {
  var r = this.__data__;
  if (r instanceof Tt) {
    var n = r.__data__;
    if (!gn || n.length < Cy - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new It(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
function ot(e) {
  var t = this.__data__ = new Tt(e);
  this.size = t.size;
}
ot.prototype.clear = Hg;
ot.prototype.delete = Jg;
ot.prototype.get = Yg;
ot.prototype.has = Zg;
ot.prototype.set = Ty;
var Iy = "__lodash_hash_undefined__";
function Fy(e) {
  return this.__data__.set(e, Iy), this;
}
function ky(e) {
  return this.__data__.has(e);
}
function $r(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new It(); ++t < r; )
    this.add(e[t]);
}
$r.prototype.add = $r.prototype.push = Fy;
$r.prototype.has = ky;
function Dy(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
function Vi(e, t) {
  return e.has(t);
}
var Ry = 1, My = 2;
function Bd(e, t, r, n, s, a) {
  var i = r & Ry, o = e.length, l = t.length;
  if (o != l && !(i && l > o))
    return !1;
  var u = a.get(e), c = a.get(t);
  if (u && c)
    return u == t && c == e;
  var f = -1, m = !0, h = r & My ? new $r() : void 0;
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
      if (!Dy(t, function(p, v) {
        if (!Vi(h, v) && (g === p || s(g, p, r, n, a)))
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
var xs = ht.Uint8Array;
function Ly(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n, s) {
    r[++t] = [s, n];
  }), r;
}
function zi(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n) {
    r[++t] = n;
  }), r;
}
var Uy = 1, Wy = 2, Vy = "[object Boolean]", zy = "[object Date]", qy = "[object Error]", By = "[object Map]", Ky = "[object Number]", Gy = "[object RegExp]", Hy = "[object Set]", Jy = "[object String]", Yy = "[object Symbol]", Zy = "[object ArrayBuffer]", Xy = "[object DataView]", Ql = Xe ? Xe.prototype : void 0, Da = Ql ? Ql.valueOf : void 0;
function Qy(e, t, r, n, s, a, i) {
  switch (r) {
    case Xy:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case Zy:
      return !(e.byteLength != t.byteLength || !a(new xs(e), new xs(t)));
    case Vy:
    case zy:
    case Ky:
      return Cn(+e, +t);
    case qy:
      return e.name == t.name && e.message == t.message;
    case Gy:
    case Jy:
      return e == t + "";
    case By:
      var o = Ly;
    case Hy:
      var l = n & Uy;
      if (o || (o = zi), e.size != t.size && !l)
        return !1;
      var u = i.get(e);
      if (u)
        return u == t;
      n |= Wy, i.set(e, t);
      var c = Bd(o(e), o(t), n, s, a, i);
      return i.delete(e), c;
    case Yy:
      if (Da)
        return Da.call(e) == Da.call(t);
  }
  return !1;
}
function qi(e, t) {
  for (var r = -1, n = t.length, s = e.length; ++r < n; )
    e[s + r] = t[r];
  return e;
}
var Ie = Array.isArray;
function Kd(e, t, r) {
  var n = t(e);
  return Ie(e) ? n : qi(n, r(e));
}
function e0(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, s = 0, a = []; ++r < n; ) {
    var i = e[r];
    t(i, r, e) && (a[s++] = i);
  }
  return a;
}
function Gd() {
  return [];
}
var t0 = Object.prototype, r0 = t0.propertyIsEnumerable, ec = Object.getOwnPropertySymbols, Bi = ec ? function(e) {
  return e == null ? [] : (e = Object(e), e0(ec(e), function(t) {
    return r0.call(e, t);
  }));
} : Gd;
function Hd(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var n0 = "[object Arguments]";
function tc(e) {
  return Qe(e) && Ct(e) == n0;
}
var Jd = Object.prototype, s0 = Jd.hasOwnProperty, a0 = Jd.propertyIsEnumerable, wr = tc(/* @__PURE__ */ function() {
  return arguments;
}()) ? tc : function(e) {
  return Qe(e) && s0.call(e, "callee") && !a0.call(e, "callee");
};
function i0() {
  return !1;
}
var Yd = typeof exports == "object" && exports && !exports.nodeType && exports, rc = Yd && typeof module == "object" && module && !module.nodeType && module, o0 = rc && rc.exports === Yd, nc = o0 ? ht.Buffer : void 0, l0 = nc ? nc.isBuffer : void 0, Qt = l0 || i0, c0 = 9007199254740991, u0 = /^(?:0|[1-9]\d*)$/;
function Bs(e, t) {
  var r = typeof e;
  return t = t ?? c0, !!t && (r == "number" || r != "symbol" && u0.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var d0 = 9007199254740991;
function Ki(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= d0;
}
var f0 = "[object Arguments]", p0 = "[object Array]", h0 = "[object Boolean]", m0 = "[object Date]", g0 = "[object Error]", y0 = "[object Function]", v0 = "[object Map]", b0 = "[object Number]", $0 = "[object Object]", w0 = "[object RegExp]", _0 = "[object Set]", x0 = "[object String]", S0 = "[object WeakMap]", j0 = "[object ArrayBuffer]", E0 = "[object DataView]", O0 = "[object Float32Array]", N0 = "[object Float64Array]", A0 = "[object Int8Array]", P0 = "[object Int16Array]", C0 = "[object Int32Array]", T0 = "[object Uint8Array]", I0 = "[object Uint8ClampedArray]", F0 = "[object Uint16Array]", k0 = "[object Uint32Array]", _e = {};
_e[O0] = _e[N0] = _e[A0] = _e[P0] = _e[C0] = _e[T0] = _e[I0] = _e[F0] = _e[k0] = !0;
_e[f0] = _e[p0] = _e[j0] = _e[h0] = _e[E0] = _e[m0] = _e[g0] = _e[y0] = _e[v0] = _e[b0] = _e[$0] = _e[w0] = _e[_0] = _e[x0] = _e[S0] = !1;
function D0(e) {
  return Qe(e) && Ki(e.length) && !!_e[Ct(e)];
}
function Gi(e) {
  return function(t) {
    return e(t);
  };
}
var Zd = typeof exports == "object" && exports && !exports.nodeType && exports, ln = Zd && typeof module == "object" && module && !module.nodeType && module, R0 = ln && ln.exports === Zd, Ra = R0 && Wd.process, _r = function() {
  try {
    var e = ln && ln.require && ln.require("util").types;
    return e || Ra && Ra.binding && Ra.binding("util");
  } catch {
  }
}(), sc = _r && _r.isTypedArray, Tn = sc ? Gi(sc) : D0, M0 = Object.prototype, L0 = M0.hasOwnProperty;
function Xd(e, t) {
  var r = Ie(e), n = !r && wr(e), s = !r && !n && Qt(e), a = !r && !n && !s && Tn(e), i = r || n || s || a, o = i ? Hd(e.length, String) : [], l = o.length;
  for (var u in e)
    (t || L0.call(e, u)) && !(i && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    a && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    Bs(u, l))) && o.push(u);
  return o;
}
var U0 = Object.prototype;
function Ks(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || U0;
  return e === r;
}
var W0 = zd(Object.keys, Object), V0 = Object.prototype, z0 = V0.hasOwnProperty;
function Qd(e) {
  if (!Ks(e))
    return W0(e);
  var t = [];
  for (var r in Object(e))
    z0.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
function Tr(e) {
  return e != null && Ki(e.length) && !zs(e);
}
function ut(e) {
  return Tr(e) ? Xd(e) : Qd(e);
}
function ui(e) {
  return Kd(e, ut, Bi);
}
var q0 = 1, B0 = Object.prototype, K0 = B0.hasOwnProperty;
function G0(e, t, r, n, s, a) {
  var i = r & q0, o = ui(e), l = o.length, u = ui(t), c = u.length;
  if (l != c && !i)
    return !1;
  for (var f = l; f--; ) {
    var m = o[f];
    if (!(i ? m in t : K0.call(t, m)))
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
var di = nr(ht, "DataView"), fi = nr(ht, "Promise"), gr = nr(ht, "Set"), pi = nr(ht, "WeakMap"), ac = "[object Map]", H0 = "[object Object]", ic = "[object Promise]", oc = "[object Set]", lc = "[object WeakMap]", cc = "[object DataView]", J0 = rr(di), Y0 = rr(gn), Z0 = rr(fi), X0 = rr(gr), Q0 = rr(pi), Ye = Ct;
(di && Ye(new di(new ArrayBuffer(1))) != cc || gn && Ye(new gn()) != ac || fi && Ye(fi.resolve()) != ic || gr && Ye(new gr()) != oc || pi && Ye(new pi()) != lc) && (Ye = function(e) {
  var t = Ct(e), r = t == H0 ? e.constructor : void 0, n = r ? rr(r) : "";
  if (n)
    switch (n) {
      case J0:
        return cc;
      case Y0:
        return ac;
      case Z0:
        return ic;
      case X0:
        return oc;
      case Q0:
        return lc;
    }
  return t;
});
var ev = 1, uc = "[object Arguments]", dc = "[object Array]", Hn = "[object Object]", tv = Object.prototype, fc = tv.hasOwnProperty;
function rv(e, t, r, n, s, a) {
  var i = Ie(e), o = Ie(t), l = i ? dc : Ye(e), u = o ? dc : Ye(t);
  l = l == uc ? Hn : l, u = u == uc ? Hn : u;
  var c = l == Hn, f = u == Hn, m = l == u;
  if (m && Qt(e)) {
    if (!Qt(t))
      return !1;
    i = !0, c = !1;
  }
  if (m && !c)
    return a || (a = new ot()), i || Tn(e) ? Bd(e, t, r, n, s, a) : Qy(e, t, l, r, n, s, a);
  if (!(r & ev)) {
    var h = c && fc.call(e, "__wrapped__"), g = f && fc.call(t, "__wrapped__");
    if (h || g) {
      var b = h ? e.value() : e, y = g ? t.value() : t;
      return a || (a = new ot()), s(b, y, r, n, a);
    }
  }
  return m ? (a || (a = new ot()), G0(e, t, r, n, s, a)) : !1;
}
function Gs(e, t, r, n, s) {
  return e === t ? !0 : e == null || t == null || !Qe(e) && !Qe(t) ? e !== e && t !== t : rv(e, t, r, n, Gs, s);
}
function nv(e, t, r) {
  r = typeof r == "function" ? r : void 0;
  var n = r ? r(e, t) : void 0;
  return n === void 0 ? Gs(e, t, void 0, r) : !!n;
}
function Se(e, t) {
  return nv(e, t, (r, n) => {
    if (typeof r == "function" && typeof n == "function")
      return !0;
  });
}
var sv = "[object Symbol]";
function In(e) {
  return typeof e == "symbol" || Qe(e) && Ct(e) == sv;
}
var av = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, iv = /^\w*$/;
function Hi(e, t) {
  if (Ie(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || In(e) ? !0 : iv.test(e) || !av.test(e) || t != null && e in Object(t);
}
var ov = "Expected a function";
function Ji(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(ov);
  var r = function() {
    var n = arguments, s = t ? t.apply(this, n) : n[0], a = r.cache;
    if (a.has(s))
      return a.get(s);
    var i = e.apply(this, n);
    return r.cache = a.set(s, i) || a, i;
  };
  return r.cache = new (Ji.Cache || It)(), r;
}
Ji.Cache = It;
var lv = 500;
function cv(e) {
  var t = Ji(e, function(n) {
    return r.size === lv && r.clear(), n;
  }), r = t.cache;
  return t;
}
var uv = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, dv = /\\(\\)?/g, ef = cv(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(uv, function(r, n, s, a) {
    t.push(s ? a.replace(dv, "$1") : n || r);
  }), t;
});
function Hs(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, s = Array(n); ++r < n; )
    s[r] = t(e[r], r, e);
  return s;
}
var pc = Xe ? Xe.prototype : void 0, hc = pc ? pc.toString : void 0;
function tf(e) {
  if (typeof e == "string")
    return e;
  if (Ie(e))
    return Hs(e, tf) + "";
  if (In(e))
    return hc ? hc.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function Yi(e) {
  return e == null ? "" : tf(e);
}
function Ir(e, t) {
  return Ie(e) ? e : Hi(e, t) ? [e] : ef(Yi(e));
}
function sr(e) {
  if (typeof e == "string" || In(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function Js(e, t) {
  t = Ir(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[sr(t[r++])];
  return r && r == n ? e : void 0;
}
function Z(e, t, r) {
  var n = e == null ? void 0 : Js(e, t);
  return n === void 0 ? r : n;
}
var fv = "[object Map]", pv = "[object Set]", hv = Object.prototype, mv = hv.hasOwnProperty;
function xr(e) {
  if (e == null)
    return !0;
  if (Tr(e) && (Ie(e) || typeof e == "string" || typeof e.splice == "function" || Qt(e) || Tn(e) || wr(e)))
    return !e.length;
  var t = Ye(e);
  if (t == fv || t == pv)
    return !e.size;
  if (Ks(e))
    return !Qd(e).length;
  for (var r in e)
    if (mv.call(e, r))
      return !1;
  return !0;
}
var Ys = {}, gv = /~/, yv = /~[01]/g;
function vv(e) {
  switch (e) {
    case "~1":
      return "/";
    case "~0":
      return "~";
  }
  throw new Error("Invalid tilde escape: " + e);
}
function rf(e) {
  return gv.test(e) ? e.replace(yv, vv) : e;
}
function bv(e, t, r) {
  for (var n, s, a = 1, i = t.length; a < i; ) {
    if (t[a] === "constructor" || t[a] === "prototype" || t[a] === "__proto__") return e;
    if (n = rf(t[a++]), s = i > a, typeof e[n] > "u" && (Array.isArray(e) && n === "-" && (n = e.length), s && (t[a] !== "" && t[a] < 1 / 0 || t[a] === "-" ? e[n] = [] : e[n] = {})), !s) break;
    e = e[n];
  }
  var o = e[n];
  return r === void 0 ? delete e[n] : e[n] = r, o;
}
function Zi(e) {
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
function nf(e, t) {
  if (typeof e != "object") throw new Error("Invalid input object.");
  t = Zi(t);
  var r = t.length;
  if (r === 1) return e;
  for (var n = 1; n < r; ) {
    if (e = e[rf(t[n++])], r === n) return e;
    if (typeof e != "object" || e === null) return;
  }
}
function sf(e, t, r) {
  if (typeof e != "object") throw new Error("Invalid input object.");
  if (t = Zi(t), t.length === 0) throw new Error("Invalid JSON pointer for set.");
  return bv(e, t, r);
}
function $v(e) {
  var t = Zi(e);
  return {
    get: function(r) {
      return nf(r, t);
    },
    set: function(r, n) {
      return sf(r, t, n);
    }
  };
}
Ys.get = nf;
Ys.set = sf;
Ys.compile = $v;
function Xi(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var Ss = function() {
  try {
    var e = nr(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
function Qi(e, t, r) {
  t == "__proto__" && Ss ? Ss(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var wv = Object.prototype, _v = wv.hasOwnProperty;
function eo(e, t, r) {
  var n = e[t];
  (!(_v.call(e, t) && Cn(n, r)) || r === void 0 && !(t in e)) && Qi(e, t, r);
}
function Fr(e, t, r, n) {
  var s = !r;
  r || (r = {});
  for (var a = -1, i = t.length; ++a < i; ) {
    var o = t[a], l = void 0;
    l === void 0 && (l = e[o]), s ? Qi(r, o, l) : eo(r, o, l);
  }
  return r;
}
function xv(e, t) {
  return e && Fr(t, ut(t), e);
}
function Sv(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var jv = Object.prototype, Ev = jv.hasOwnProperty;
function Ov(e) {
  if (!we(e))
    return Sv(e);
  var t = Ks(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !Ev.call(e, n)) || r.push(n);
  return r;
}
function Fn(e) {
  return Tr(e) ? Xd(e, !0) : Ov(e);
}
function Nv(e, t) {
  return e && Fr(t, Fn(t), e);
}
var af = typeof exports == "object" && exports && !exports.nodeType && exports, mc = af && typeof module == "object" && module && !module.nodeType && module, Av = mc && mc.exports === af, gc = Av ? ht.Buffer : void 0, yc = gc ? gc.allocUnsafe : void 0;
function of(e, t) {
  if (t)
    return e.slice();
  var r = e.length, n = yc ? yc(r) : new e.constructor(r);
  return e.copy(n), n;
}
function to(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
function Pv(e, t) {
  return Fr(e, Bi(e), t);
}
var Cv = Object.getOwnPropertySymbols, lf = Cv ? function(e) {
  for (var t = []; e; )
    qi(t, Bi(e)), e = Ws(e);
  return t;
} : Gd;
function Tv(e, t) {
  return Fr(e, lf(e), t);
}
function ro(e) {
  return Kd(e, Fn, lf);
}
var Iv = Object.prototype, Fv = Iv.hasOwnProperty;
function kv(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && Fv.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
function no(e) {
  var t = new e.constructor(e.byteLength);
  return new xs(t).set(new xs(e)), t;
}
function Dv(e, t) {
  var r = t ? no(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var Rv = /\w*$/;
function Mv(e) {
  var t = new e.constructor(e.source, Rv.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var vc = Xe ? Xe.prototype : void 0, bc = vc ? vc.valueOf : void 0;
function Lv(e) {
  return bc ? Object(bc.call(e)) : {};
}
function cf(e, t) {
  var r = t ? no(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var Uv = "[object Boolean]", Wv = "[object Date]", Vv = "[object Map]", zv = "[object Number]", qv = "[object RegExp]", Bv = "[object Set]", Kv = "[object String]", Gv = "[object Symbol]", Hv = "[object ArrayBuffer]", Jv = "[object DataView]", Yv = "[object Float32Array]", Zv = "[object Float64Array]", Xv = "[object Int8Array]", Qv = "[object Int16Array]", eb = "[object Int32Array]", tb = "[object Uint8Array]", rb = "[object Uint8ClampedArray]", nb = "[object Uint16Array]", sb = "[object Uint32Array]";
function ab(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case Hv:
      return no(e);
    case Uv:
    case Wv:
      return new n(+e);
    case Jv:
      return Dv(e, r);
    case Yv:
    case Zv:
    case Xv:
    case Qv:
    case eb:
    case tb:
    case rb:
    case nb:
    case sb:
      return cf(e, r);
    case Vv:
      return new n();
    case zv:
    case Kv:
      return new n(e);
    case qv:
      return Mv(e);
    case Bv:
      return new n();
    case Gv:
      return Lv(e);
  }
}
var $c = Object.create, uf = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!we(t))
      return {};
    if ($c)
      return $c(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}();
function df(e) {
  return typeof e.constructor == "function" && !Ks(e) ? uf(Ws(e)) : {};
}
var ib = "[object Map]";
function ob(e) {
  return Qe(e) && Ye(e) == ib;
}
var wc = _r && _r.isMap, lb = wc ? Gi(wc) : ob, cb = "[object Set]";
function ub(e) {
  return Qe(e) && Ye(e) == cb;
}
var _c = _r && _r.isSet, db = _c ? Gi(_c) : ub, fb = 1, pb = 2, hb = 4, ff = "[object Arguments]", mb = "[object Array]", gb = "[object Boolean]", yb = "[object Date]", vb = "[object Error]", pf = "[object Function]", bb = "[object GeneratorFunction]", $b = "[object Map]", wb = "[object Number]", hf = "[object Object]", _b = "[object RegExp]", xb = "[object Set]", Sb = "[object String]", jb = "[object Symbol]", Eb = "[object WeakMap]", Ob = "[object ArrayBuffer]", Nb = "[object DataView]", Ab = "[object Float32Array]", Pb = "[object Float64Array]", Cb = "[object Int8Array]", Tb = "[object Int16Array]", Ib = "[object Int32Array]", Fb = "[object Uint8Array]", kb = "[object Uint8ClampedArray]", Db = "[object Uint16Array]", Rb = "[object Uint32Array]", ve = {};
ve[ff] = ve[mb] = ve[Ob] = ve[Nb] = ve[gb] = ve[yb] = ve[Ab] = ve[Pb] = ve[Cb] = ve[Tb] = ve[Ib] = ve[$b] = ve[wb] = ve[hf] = ve[_b] = ve[xb] = ve[Sb] = ve[jb] = ve[Fb] = ve[kb] = ve[Db] = ve[Rb] = !0;
ve[vb] = ve[pf] = ve[Eb] = !1;
function cn(e, t, r, n, s, a) {
  var i, o = t & fb, l = t & pb, u = t & hb;
  if (r && (i = s ? r(e, n, s, a) : r(e)), i !== void 0)
    return i;
  if (!we(e))
    return e;
  var c = Ie(e);
  if (c) {
    if (i = kv(e), !o)
      return to(e, i);
  } else {
    var f = Ye(e), m = f == pf || f == bb;
    if (Qt(e))
      return of(e, o);
    if (f == hf || f == ff || m && !s) {
      if (i = l || m ? {} : df(e), !o)
        return l ? Tv(e, Nv(i, e)) : Pv(e, xv(i, e));
    } else {
      if (!ve[f])
        return s ? e : {};
      i = ab(e, f, o);
    }
  }
  a || (a = new ot());
  var h = a.get(e);
  if (h)
    return h;
  a.set(e, i), db(e) ? e.forEach(function(y) {
    i.add(cn(y, t, r, y, e, a));
  }) : lb(e) && e.forEach(function(y, p) {
    i.set(p, cn(y, t, r, p, e, a));
  });
  var g = u ? l ? ro : ui : l ? Fn : ut, b = c ? void 0 : g(e);
  return Xi(b || e, function(y, p) {
    b && (p = y, y = e[p]), eo(i, p, cn(y, t, r, p, e, a));
  }), i;
}
function Mb(e) {
  var t = e == null ? 0 : e.length;
  return t ? e[t - 1] : void 0;
}
function Lb(e, t, r) {
  var n = -1, s = e.length;
  t < 0 && (t = -t > s ? 0 : s + t), r = r > s ? s : r, r < 0 && (r += s), s = t > r ? 0 : r - t >>> 0, t >>>= 0;
  for (var a = Array(s); ++n < s; )
    a[n] = e[n + t];
  return a;
}
function Ub(e, t) {
  return t.length < 2 ? e : Js(e, Lb(t, 0, -1));
}
function mf(e, t) {
  return t = Ir(t, e), e = Ub(e, t), e == null || delete e[sr(Mb(t))];
}
function Wb(e) {
  return Zt(e) ? void 0 : e;
}
var xc = Xe ? Xe.isConcatSpreadable : void 0;
function Vb(e) {
  return Ie(e) || wr(e) || !!(xc && e && e[xc]);
}
function kn(e, t, r, n, s) {
  var a = -1, i = e.length;
  for (r || (r = Vb), s || (s = []); ++a < i; ) {
    var o = e[a];
    t > 0 && r(o) ? t > 1 ? kn(o, t - 1, r, n, s) : qi(s, o) : n || (s[s.length] = o);
  }
  return s;
}
function zb(e) {
  var t = e == null ? 0 : e.length;
  return t ? kn(e, 1) : [];
}
function qb(e, t, r) {
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
var Sc = Math.max;
function gf(e, t, r) {
  return t = Sc(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, s = -1, a = Sc(n.length - t, 0), i = Array(a); ++s < a; )
      i[s] = n[t + s];
    s = -1;
    for (var o = Array(t + 1); ++s < t; )
      o[s] = n[s];
    return o[t] = r(i), qb(e, this, o);
  };
}
function Bb(e) {
  return function() {
    return e;
  };
}
function Zs(e) {
  return e;
}
var Kb = Ss ? function(e, t) {
  return Ss(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Bb(t),
    writable: !0
  });
} : Zs, Gb = 800, Hb = 16, Jb = Date.now;
function Yb(e) {
  var t = 0, r = 0;
  return function() {
    var n = Jb(), s = Hb - (n - r);
    if (r = n, s > 0) {
      if (++t >= Gb)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
var yf = Yb(Kb);
function vf(e) {
  return yf(gf(e, void 0, zb), e + "");
}
var Zb = 1, Xb = 2, Qb = 4, js = vf(function(e, t) {
  var r = {};
  if (e == null)
    return r;
  var n = !1;
  t = Hs(t, function(a) {
    return a = Ir(a, e), n || (n = a.length > 1), a;
  }), Fr(e, ro(e), r), n && (r = cn(r, Zb | Xb | Qb, Wb));
  for (var s = t.length; s--; )
    mf(r, t[s]);
  return r;
});
function so(e, t) {
  const r = t[e];
  return [js(t, [e]), r];
}
function bf(e, t = {}, r = []) {
  const n = e || "";
  let s;
  if (n.startsWith("#"))
    s = decodeURIComponent(n.substring(1));
  else
    throw new Error(`Could not find a definition for ${e}.`);
  const a = Ys.get(t, s);
  if (a === void 0)
    throw new Error(`Could not find a definition for ${e}.`);
  const i = a[Te];
  if (i) {
    if (r.includes(i)) {
      if (r.length === 1)
        throw new Error(`Definition for ${e} is a circular reference`);
      const [c, ...f] = r, m = [...f, n, c].join(" -> ");
      throw new Error(`Definition for ${c} contains a circular reference through ${m}`);
    }
    const [o, l] = so(Te, a), u = bf(l, t, [...r, n]);
    return Object.keys(o).length > 0 ? { ...o, ...u } : u;
  }
  return a;
}
function $f(e, t = {}) {
  return bf(e, t, []);
}
var e$ = Object.prototype, t$ = e$.hasOwnProperty;
function r$(e, t) {
  return e != null && t$.call(e, t);
}
function wf(e, t, r) {
  t = Ir(t, e);
  for (var n = -1, s = t.length, a = !1; ++n < s; ) {
    var i = sr(t[n]);
    if (!(a = e != null && r(e, i)))
      break;
    e = e[i];
  }
  return a || ++n != s ? a : (s = e == null ? 0 : e.length, !!s && Ki(s) && Bs(i, s) && (Ie(e) || wr(e)));
}
function Ve(e, t) {
  return e != null && wf(e, t, r$);
}
var n$ = "[object Number]";
function _f(e) {
  return typeof e == "number" || Qe(e) && Ct(e) == n$;
}
var s$ = "[object String]";
function Xs(e) {
  return typeof e == "string" || !Ie(e) && Qe(e) && Ct(e) == s$;
}
function a$(e, t, r, n) {
  var s = -1, a = e == null ? 0 : e.length;
  for (n && a && (r = e[++s]); ++s < a; )
    r = t(r, e[s], s, e);
  return r;
}
function i$(e) {
  return function(t, r, n) {
    for (var s = -1, a = Object(t), i = n(t), o = i.length; o--; ) {
      var l = i[++s];
      if (r(a[l], l, a) === !1)
        break;
    }
    return t;
  };
}
var xf = i$();
function Sf(e, t) {
  return e && xf(e, t, ut);
}
function o$(e, t) {
  return function(r, n) {
    if (r == null)
      return r;
    if (!Tr(r))
      return e(r, n);
    for (var s = r.length, a = -1, i = Object(r); ++a < s && n(i[a], a, i) !== !1; )
      ;
    return r;
  };
}
var jf = o$(Sf), l$ = 1, c$ = 2;
function u$(e, t, r, n) {
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
      var c = new ot(), f;
      if (!(f === void 0 ? Gs(u, l, l$ | c$, n, c) : f))
        return !1;
    }
  }
  return !0;
}
function Ef(e) {
  return e === e && !we(e);
}
function d$(e) {
  for (var t = ut(e), r = t.length; r--; ) {
    var n = t[r], s = e[n];
    t[r] = [n, s, Ef(s)];
  }
  return t;
}
function Of(e, t) {
  return function(r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
  };
}
function f$(e) {
  var t = d$(e);
  return t.length == 1 && t[0][2] ? Of(t[0][0], t[0][1]) : function(r) {
    return r === e || u$(r, e, t);
  };
}
function p$(e, t) {
  return e != null && t in Object(e);
}
function Nf(e, t) {
  return e != null && wf(e, t, p$);
}
var h$ = 1, m$ = 2;
function g$(e, t) {
  return Hi(e) && Ef(t) ? Of(sr(e), t) : function(r) {
    var n = Z(r, e);
    return n === void 0 && n === t ? Nf(r, e) : Gs(t, n, h$ | m$);
  };
}
function y$(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function v$(e) {
  return function(t) {
    return Js(t, e);
  };
}
function b$(e) {
  return Hi(e) ? y$(sr(e)) : v$(e);
}
function ao(e) {
  return typeof e == "function" ? e : e == null ? Zs : typeof e == "object" ? Ie(e) ? g$(e[0], e[1]) : f$(e) : b$(e);
}
function $$(e, t, r, n, s) {
  return s(e, function(a, i, o) {
    r = n ? (n = !1, a) : t(r, a, i, o);
  }), r;
}
function w$(e, t, r) {
  var n = Ie(e) ? a$ : $$, s = arguments.length < 3;
  return n(e, ao(t), r, s, jf);
}
function Af(e) {
  return typeof e == "function" ? e : Zs;
}
var _$ = /\s/;
function x$(e) {
  for (var t = e.length; t-- && _$.test(e.charAt(t)); )
    ;
  return t;
}
var S$ = /^\s+/;
function j$(e) {
  return e && e.slice(0, x$(e) + 1).replace(S$, "");
}
var jc = NaN, E$ = /^[-+]0x[0-9a-f]+$/i, O$ = /^0b[01]+$/i, N$ = /^0o[0-7]+$/i, A$ = parseInt;
function P$(e) {
  if (typeof e == "number")
    return e;
  if (In(e))
    return jc;
  if (we(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = we(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = j$(e);
  var r = O$.test(e);
  return r || N$.test(e) ? A$(e.slice(2), r ? 2 : 8) : E$.test(e) ? jc : +e;
}
var Ec = 1 / 0, C$ = 17976931348623157e292;
function T$(e) {
  if (!e)
    return e === 0 ? e : 0;
  if (e = P$(e), e === Ec || e === -Ec) {
    var t = e < 0 ? -1 : 1;
    return t * C$;
  }
  return e === e ? e : 0;
}
function I$(e) {
  var t = T$(e), r = t % 1;
  return t === t ? r ? t - r : t : 0;
}
var F$ = 9007199254740991, Ma = 4294967295, k$ = Math.min;
function Pf(e, t) {
  if (e = I$(e), e < 1 || e > F$)
    return [];
  var r = Ma, n = k$(e, Ma);
  t = Af(t), e -= Ma;
  for (var s = Hd(n, t); ++r < e; )
    t(r);
  return s;
}
function Cf(e, t, r) {
  var n;
  if (e && r) {
    const s = Z(e, r);
    if (s === void 0)
      return;
    for (let a = 0; a < t.length; a++) {
      const i = t[a], o = Z(i, [Oe, r], {});
      if (!(o.type === "object" || o.type === "array") && (o.const === s || !((n = o.enum) === null || n === void 0) && n.includes(s)))
        return a;
    }
  }
}
function Tf(e, t, r, n, s) {
  if (t === void 0)
    return 0;
  const a = Cf(t, r, s);
  if (_f(a))
    return a;
  for (let i = 0; i < r.length; i++) {
    const o = r[i];
    if (s && Ve(o, [Oe, s])) {
      const l = Z(t, s), u = Z(o, [Oe, s], {});
      if (e.isValid(u, l, n))
        return i;
    } else if (o[Oe]) {
      const l = {
        anyOf: Object.keys(o[Oe]).map((c) => ({
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
function io(e, t, r, n, s) {
  return Tf(e, t, r, n, s);
}
function oo(e, t, r, n) {
  if (!we(e))
    return e;
  t = Ir(t, e);
  for (var s = -1, a = t.length, i = a - 1, o = e; o != null && ++s < a; ) {
    var l = sr(t[s]), u = r;
    if (l === "__proto__" || l === "constructor" || l === "prototype")
      return e;
    if (s != i) {
      var c = o[l];
      u = n ? n(c, l, o) : void 0, u === void 0 && (u = we(c) ? c : Bs(t[s + 1]) ? [] : {});
    }
    eo(o, l, u), o = o[l];
  }
  return e;
}
function De(e, t, r) {
  return e == null ? e : oo(e, t, r);
}
function D$(e, t, r) {
  var n = Ie(e), s = n || Qt(e) || Tn(e);
  if (t = ao(t), r == null) {
    var a = e && e.constructor;
    s ? r = n ? new a() : [] : we(e) ? r = zs(a) ? uf(Ws(e)) : {} : r = {};
  }
  return (s ? Xi : Sf)(e, function(i, o, l) {
    return t(r, i, o, l);
  }), r;
}
function hi(e, t, r) {
  (r !== void 0 && !Cn(e[t], r) || r === void 0 && !(t in e)) && Qi(e, t, r);
}
function Es(e) {
  return Qe(e) && Tr(e);
}
function mi(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function R$(e) {
  return Fr(e, Fn(e));
}
function M$(e, t, r, n, s, a, i) {
  var o = mi(e, r), l = mi(t, r), u = i.get(l);
  if (u) {
    hi(e, r, u);
    return;
  }
  var c = a ? a(o, l, r + "", e, t, i) : void 0, f = c === void 0;
  if (f) {
    var m = Ie(l), h = !m && Qt(l), g = !m && !h && Tn(l);
    c = l, m || h || g ? Ie(o) ? c = o : Es(o) ? c = to(o) : h ? (f = !1, c = of(l, !0)) : g ? (f = !1, c = cf(l, !0)) : c = [] : Zt(l) || wr(l) ? (c = o, wr(o) ? c = R$(o) : (!we(o) || zs(o)) && (c = df(l))) : f = !1;
  }
  f && (i.set(l, c), s(c, l, n, a, i), i.delete(l)), hi(e, r, c);
}
function If(e, t, r, n, s) {
  e !== t && xf(t, function(a, i) {
    if (s || (s = new ot()), we(a))
      M$(e, t, i, r, If, n, s);
    else {
      var o = n ? n(mi(e, i), a, i + "", e, t, s) : void 0;
      o === void 0 && (o = a), hi(e, i, o);
    }
  }, Fn);
}
function lo(e, t) {
  return yf(gf(e, t, Zs), e + "");
}
function L$(e, t, r) {
  if (!we(r))
    return !1;
  var n = typeof t;
  return (n == "number" ? Tr(r) && Bs(t, r.length) : n == "string" && t in r) ? Cn(r[t], e) : !1;
}
function U$(e) {
  return lo(function(t, r) {
    var n = -1, s = r.length, a = s > 1 ? r[s - 1] : void 0, i = s > 2 ? r[2] : void 0;
    for (a = e.length > 3 && typeof a == "function" ? (s--, a) : void 0, i && L$(r[0], r[1], i) && (a = s < 3 ? void 0 : a, s = 1), t = Object(t); ++n < s; ) {
      var o = r[n];
      o && e(t, o, n, a);
    }
    return t;
  });
}
var W$ = U$(function(e, t, r) {
  If(e, t, r);
}), V$ = 1 / 0;
function z$(e) {
  var t = e == null ? 0 : e.length;
  return t ? kn(e, V$) : [];
}
function q$(e, t, r, n) {
  for (var s = e.length, a = r + -1; ++a < s; )
    if (t(e[a], a, e))
      return a;
  return -1;
}
function B$(e) {
  return e !== e;
}
function K$(e, t, r) {
  for (var n = r - 1, s = e.length; ++n < s; )
    if (e[n] === t)
      return n;
  return -1;
}
function G$(e, t, r) {
  return t === t ? K$(e, t, r) : q$(e, B$, r);
}
function Ff(e, t) {
  var r = e == null ? 0 : e.length;
  return !!r && G$(e, t, 0) > -1;
}
function H$() {
}
var J$ = 1 / 0, Y$ = gr && 1 / zi(new gr([, -0]))[1] == J$ ? function(e) {
  return new gr(e);
} : H$, Z$ = 200;
function kf(e, t, r) {
  var n = -1, s = Ff, a = e.length, i = !0, o = [], l = o;
  if (a >= Z$) {
    var u = Y$(e);
    if (u)
      return zi(u);
    i = !1, s = Vi, l = new $r();
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
function X$(e) {
  return e && e.length ? kf(e) : [];
}
function Q$() {
  this.__data__ = [], this.size = 0;
}
var e1 = Q$;
function t1(e, t) {
  return e === t || e !== e && t !== t;
}
var kr = t1, r1 = kr;
function n1(e, t) {
  for (var r = e.length; r--; )
    if (r1(e[r][0], t))
      return r;
  return -1;
}
var Qs = n1, s1 = Qs, a1 = Array.prototype, i1 = a1.splice;
function o1(e) {
  var t = this.__data__, r = s1(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : i1.call(t, r, 1), --this.size, !0;
}
var l1 = o1, c1 = Qs;
function u1(e) {
  var t = this.__data__, r = c1(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var d1 = u1, f1 = Qs;
function p1(e) {
  return f1(this.__data__, e) > -1;
}
var h1 = p1, m1 = Qs;
function g1(e, t) {
  var r = this.__data__, n = m1(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
var y1 = g1, v1 = e1, b1 = l1, $1 = d1, w1 = h1, _1 = y1;
function Dr(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Dr.prototype.clear = v1;
Dr.prototype.delete = b1;
Dr.prototype.get = $1;
Dr.prototype.has = w1;
Dr.prototype.set = _1;
var ea = Dr, x1 = ea;
function S1() {
  this.__data__ = new x1(), this.size = 0;
}
var j1 = S1;
function E1(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var O1 = E1;
function N1(e) {
  return this.__data__.get(e);
}
var A1 = N1;
function P1(e) {
  return this.__data__.has(e);
}
var C1 = P1, T1 = typeof Gn == "object" && Gn && Gn.Object === Object && Gn, Df = T1, I1 = Df, F1 = typeof self == "object" && self && self.Object === Object && self, k1 = I1 || F1 || Function("return this")(), mt = k1, D1 = mt, R1 = D1.Symbol, Rr = R1, Oc = Rr, Rf = Object.prototype, M1 = Rf.hasOwnProperty, L1 = Rf.toString, Yr = Oc ? Oc.toStringTag : void 0;
function U1(e) {
  var t = M1.call(e, Yr), r = e[Yr];
  try {
    e[Yr] = void 0;
    var n = !0;
  } catch {
  }
  var s = L1.call(e);
  return n && (t ? e[Yr] = r : delete e[Yr]), s;
}
var W1 = U1, V1 = Object.prototype, z1 = V1.toString;
function q1(e) {
  return z1.call(e);
}
var B1 = q1, Nc = Rr, K1 = W1, G1 = B1, H1 = "[object Null]", J1 = "[object Undefined]", Ac = Nc ? Nc.toStringTag : void 0;
function Y1(e) {
  return e == null ? e === void 0 ? J1 : H1 : Ac && Ac in Object(e) ? K1(e) : G1(e);
}
var ar = Y1;
function Z1(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var gt = Z1, X1 = ar, Q1 = gt, ew = "[object AsyncFunction]", tw = "[object Function]", rw = "[object GeneratorFunction]", nw = "[object Proxy]";
function sw(e) {
  if (!Q1(e))
    return !1;
  var t = X1(e);
  return t == tw || t == rw || t == ew || t == nw;
}
var co = sw, aw = mt, iw = aw["__core-js_shared__"], ow = iw, La = ow, Pc = function() {
  var e = /[^.]+$/.exec(La && La.keys && La.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function lw(e) {
  return !!Pc && Pc in e;
}
var cw = lw, uw = Function.prototype, dw = uw.toString;
function fw(e) {
  if (e != null) {
    try {
      return dw.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Mf = fw, pw = co, hw = cw, mw = gt, gw = Mf, yw = /[\\^$.*+?()[\]{}|]/g, vw = /^\[object .+?Constructor\]$/, bw = Function.prototype, $w = Object.prototype, ww = bw.toString, _w = $w.hasOwnProperty, xw = RegExp(
  "^" + ww.call(_w).replace(yw, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Sw(e) {
  if (!mw(e) || hw(e))
    return !1;
  var t = pw(e) ? xw : vw;
  return t.test(gw(e));
}
var jw = Sw;
function Ew(e, t) {
  return e == null ? void 0 : e[t];
}
var Ow = Ew, Nw = jw, Aw = Ow;
function Pw(e, t) {
  var r = Aw(e, t);
  return Nw(r) ? r : void 0;
}
var ir = Pw, Cw = ir, Tw = mt, Iw = Cw(Tw, "Map"), uo = Iw, Fw = ir, kw = Fw(Object, "create"), ta = kw, Cc = ta;
function Dw() {
  this.__data__ = Cc ? Cc(null) : {}, this.size = 0;
}
var Rw = Dw;
function Mw(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Lw = Mw, Uw = ta, Ww = "__lodash_hash_undefined__", Vw = Object.prototype, zw = Vw.hasOwnProperty;
function qw(e) {
  var t = this.__data__;
  if (Uw) {
    var r = t[e];
    return r === Ww ? void 0 : r;
  }
  return zw.call(t, e) ? t[e] : void 0;
}
var Bw = qw, Kw = ta, Gw = Object.prototype, Hw = Gw.hasOwnProperty;
function Jw(e) {
  var t = this.__data__;
  return Kw ? t[e] !== void 0 : Hw.call(t, e);
}
var Yw = Jw, Zw = ta, Xw = "__lodash_hash_undefined__";
function Qw(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = Zw && t === void 0 ? Xw : t, this;
}
var e_ = Qw, t_ = Rw, r_ = Lw, n_ = Bw, s_ = Yw, a_ = e_;
function Mr(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Mr.prototype.clear = t_;
Mr.prototype.delete = r_;
Mr.prototype.get = n_;
Mr.prototype.has = s_;
Mr.prototype.set = a_;
var i_ = Mr, Tc = i_, o_ = ea, l_ = uo;
function c_() {
  this.size = 0, this.__data__ = {
    hash: new Tc(),
    map: new (l_ || o_)(),
    string: new Tc()
  };
}
var u_ = c_;
function d_(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var f_ = d_, p_ = f_;
function h_(e, t) {
  var r = e.__data__;
  return p_(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var ra = h_, m_ = ra;
function g_(e) {
  var t = m_(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var y_ = g_, v_ = ra;
function b_(e) {
  return v_(this, e).get(e);
}
var $_ = b_, w_ = ra;
function __(e) {
  return w_(this, e).has(e);
}
var x_ = __, S_ = ra;
function j_(e, t) {
  var r = S_(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
var E_ = j_, O_ = u_, N_ = y_, A_ = $_, P_ = x_, C_ = E_;
function Lr(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Lr.prototype.clear = O_;
Lr.prototype.delete = N_;
Lr.prototype.get = A_;
Lr.prototype.has = P_;
Lr.prototype.set = C_;
var fo = Lr, T_ = ea, I_ = uo, F_ = fo, k_ = 200;
function D_(e, t) {
  var r = this.__data__;
  if (r instanceof T_) {
    var n = r.__data__;
    if (!I_ || n.length < k_ - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new F_(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
var R_ = D_, M_ = ea, L_ = j1, U_ = O1, W_ = A1, V_ = C1, z_ = R_;
function Ur(e) {
  var t = this.__data__ = new M_(e);
  this.size = t.size;
}
Ur.prototype.clear = L_;
Ur.prototype.delete = U_;
Ur.prototype.get = W_;
Ur.prototype.has = V_;
Ur.prototype.set = z_;
var na = Ur;
function q_(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var Lf = q_, B_ = ir, K_ = function() {
  try {
    var e = B_(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), Uf = K_, Ic = Uf;
function G_(e, t, r) {
  t == "__proto__" && Ic ? Ic(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var po = G_, H_ = po, J_ = kr, Y_ = Object.prototype, Z_ = Y_.hasOwnProperty;
function X_(e, t, r) {
  var n = e[t];
  (!(Z_.call(e, t) && J_(n, r)) || r === void 0 && !(t in e)) && H_(e, t, r);
}
var Wf = X_, Q_ = Wf, ex = po;
function tx(e, t, r, n) {
  var s = !r;
  r || (r = {});
  for (var a = -1, i = t.length; ++a < i; ) {
    var o = t[a], l = n ? n(r[o], e[o], o, r, e) : void 0;
    l === void 0 && (l = e[o]), s ? ex(r, o, l) : Q_(r, o, l);
  }
  return r;
}
var Dn = tx;
function rx(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var nx = rx;
function sx(e) {
  return e != null && typeof e == "object";
}
var yt = sx, ax = ar, ix = yt, ox = "[object Arguments]";
function lx(e) {
  return ix(e) && ax(e) == ox;
}
var cx = lx, Fc = cx, ux = yt, Vf = Object.prototype, dx = Vf.hasOwnProperty, fx = Vf.propertyIsEnumerable, px = Fc(/* @__PURE__ */ function() {
  return arguments;
}()) ? Fc : function(e) {
  return ux(e) && dx.call(e, "callee") && !fx.call(e, "callee");
}, sa = px, hx = Array.isArray, He = hx, Os = { exports: {} };
function mx() {
  return !1;
}
var gx = mx;
Os.exports;
(function(e, t) {
  var r = mt, n = gx, s = t && !t.nodeType && t, a = s && !0 && e && !e.nodeType && e, i = a && a.exports === s, o = i ? r.Buffer : void 0, l = o ? o.isBuffer : void 0, u = l || n;
  e.exports = u;
})(Os, Os.exports);
var aa = Os.exports, yx = 9007199254740991, vx = /^(?:0|[1-9]\d*)$/;
function bx(e, t) {
  var r = typeof e;
  return t = t ?? yx, !!t && (r == "number" || r != "symbol" && vx.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var ho = bx, $x = 9007199254740991;
function wx(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= $x;
}
var mo = wx, _x = ar, xx = mo, Sx = yt, jx = "[object Arguments]", Ex = "[object Array]", Ox = "[object Boolean]", Nx = "[object Date]", Ax = "[object Error]", Px = "[object Function]", Cx = "[object Map]", Tx = "[object Number]", Ix = "[object Object]", Fx = "[object RegExp]", kx = "[object Set]", Dx = "[object String]", Rx = "[object WeakMap]", Mx = "[object ArrayBuffer]", Lx = "[object DataView]", Ux = "[object Float32Array]", Wx = "[object Float64Array]", Vx = "[object Int8Array]", zx = "[object Int16Array]", qx = "[object Int32Array]", Bx = "[object Uint8Array]", Kx = "[object Uint8ClampedArray]", Gx = "[object Uint16Array]", Hx = "[object Uint32Array]", xe = {};
xe[Ux] = xe[Wx] = xe[Vx] = xe[zx] = xe[qx] = xe[Bx] = xe[Kx] = xe[Gx] = xe[Hx] = !0;
xe[jx] = xe[Ex] = xe[Mx] = xe[Ox] = xe[Lx] = xe[Nx] = xe[Ax] = xe[Px] = xe[Cx] = xe[Tx] = xe[Ix] = xe[Fx] = xe[kx] = xe[Dx] = xe[Rx] = !1;
function Jx(e) {
  return Sx(e) && xx(e.length) && !!xe[_x(e)];
}
var Yx = Jx;
function Zx(e) {
  return function(t) {
    return e(t);
  };
}
var or = Zx, Ns = { exports: {} };
Ns.exports;
(function(e, t) {
  var r = Df, n = t && !t.nodeType && t, s = n && !0 && e && !e.nodeType && e, a = s && s.exports === n, i = a && r.process, o = function() {
    try {
      var l = s && s.require && s.require("util").types;
      return l || i && i.binding && i.binding("util");
    } catch {
    }
  }();
  e.exports = o;
})(Ns, Ns.exports);
var go = Ns.exports, Xx = Yx, Qx = or, kc = go, Dc = kc && kc.isTypedArray, eS = Dc ? Qx(Dc) : Xx, yo = eS, tS = nx, rS = sa, nS = He, sS = aa, aS = ho, iS = yo, oS = Object.prototype, lS = oS.hasOwnProperty;
function cS(e, t) {
  var r = nS(e), n = !r && rS(e), s = !r && !n && sS(e), a = !r && !n && !s && iS(e), i = r || n || s || a, o = i ? tS(e.length, String) : [], l = o.length;
  for (var u in e)
    (t || lS.call(e, u)) && !(i && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    a && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    aS(u, l))) && o.push(u);
  return o;
}
var zf = cS, uS = Object.prototype;
function dS(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || uS;
  return e === r;
}
var vo = dS;
function fS(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var qf = fS, pS = qf, hS = pS(Object.keys, Object), mS = hS, gS = vo, yS = mS, vS = Object.prototype, bS = vS.hasOwnProperty;
function $S(e) {
  if (!gS(e))
    return yS(e);
  var t = [];
  for (var r in Object(e))
    bS.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var wS = $S, _S = co, xS = mo;
function SS(e) {
  return e != null && xS(e.length) && !_S(e);
}
var Wr = SS, jS = zf, ES = wS, OS = Wr;
function NS(e) {
  return OS(e) ? jS(e) : ES(e);
}
var Rn = NS, AS = Dn, PS = Rn;
function CS(e, t) {
  return e && AS(t, PS(t), e);
}
var TS = CS;
function IS(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var FS = IS, kS = gt, DS = vo, RS = FS, MS = Object.prototype, LS = MS.hasOwnProperty;
function US(e) {
  if (!kS(e))
    return RS(e);
  var t = DS(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !LS.call(e, n)) || r.push(n);
  return r;
}
var WS = US, VS = zf, zS = WS, qS = Wr;
function BS(e) {
  return qS(e) ? VS(e, !0) : zS(e);
}
var Vr = BS, KS = Dn, GS = Vr;
function HS(e, t) {
  return e && KS(t, GS(t), e);
}
var JS = HS, As = { exports: {} };
As.exports;
(function(e, t) {
  var r = mt, n = t && !t.nodeType && t, s = n && !0 && e && !e.nodeType && e, a = s && s.exports === n, i = a ? r.Buffer : void 0, o = i ? i.allocUnsafe : void 0;
  function l(u, c) {
    if (c)
      return u.slice();
    var f = u.length, m = o ? o(f) : new u.constructor(f);
    return u.copy(m), m;
  }
  e.exports = l;
})(As, As.exports);
var Bf = As.exports;
function YS(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var bo = YS;
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
var Kf = QS, ej = XS, tj = Kf, rj = Object.prototype, nj = rj.propertyIsEnumerable, Rc = Object.getOwnPropertySymbols, sj = Rc ? function(e) {
  return e == null ? [] : (e = Object(e), ej(Rc(e), function(t) {
    return nj.call(e, t);
  }));
} : tj, $o = sj, aj = Dn, ij = $o;
function oj(e, t) {
  return aj(e, ij(e), t);
}
var lj = oj;
function cj(e, t) {
  for (var r = -1, n = t.length, s = e.length; ++r < n; )
    e[s + r] = t[r];
  return e;
}
var wo = cj, uj = qf, dj = uj(Object.getPrototypeOf, Object), _o = dj, fj = wo, pj = _o, hj = $o, mj = Kf, gj = Object.getOwnPropertySymbols, yj = gj ? function(e) {
  for (var t = []; e; )
    fj(t, hj(e)), e = pj(e);
  return t;
} : mj, Gf = yj, vj = Dn, bj = Gf;
function $j(e, t) {
  return vj(e, bj(e), t);
}
var wj = $j, _j = wo, xj = He;
function Sj(e, t, r) {
  var n = t(e);
  return xj(e) ? n : _j(n, r(e));
}
var Hf = Sj, jj = Hf, Ej = $o, Oj = Rn;
function Nj(e) {
  return jj(e, Oj, Ej);
}
var Jf = Nj, Aj = Hf, Pj = Gf, Cj = Vr;
function Tj(e) {
  return Aj(e, Cj, Pj);
}
var Ij = Tj, Fj = ir, kj = mt, Dj = Fj(kj, "DataView"), Rj = Dj, Mj = ir, Lj = mt, Uj = Mj(Lj, "Promise"), Wj = Uj, Vj = ir, zj = mt, qj = Vj(zj, "Set"), Yf = qj, Bj = ir, Kj = mt, Gj = Bj(Kj, "WeakMap"), Hj = Gj, gi = Rj, yi = uo, vi = Wj, bi = Yf, $i = Hj, Zf = ar, zr = Mf, Mc = "[object Map]", Jj = "[object Object]", Lc = "[object Promise]", Uc = "[object Set]", Wc = "[object WeakMap]", Vc = "[object DataView]", Yj = zr(gi), Zj = zr(yi), Xj = zr(vi), Qj = zr(bi), e2 = zr($i), Kt = Zf;
(gi && Kt(new gi(new ArrayBuffer(1))) != Vc || yi && Kt(new yi()) != Mc || vi && Kt(vi.resolve()) != Lc || bi && Kt(new bi()) != Uc || $i && Kt(new $i()) != Wc) && (Kt = function(e) {
  var t = Zf(e), r = t == Jj ? e.constructor : void 0, n = r ? zr(r) : "";
  if (n)
    switch (n) {
      case Yj:
        return Vc;
      case Zj:
        return Mc;
      case Xj:
        return Lc;
      case Qj:
        return Uc;
      case e2:
        return Wc;
    }
  return t;
});
var ia = Kt, t2 = Object.prototype, r2 = t2.hasOwnProperty;
function n2(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && r2.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var s2 = n2, a2 = mt, i2 = a2.Uint8Array, Xf = i2, zc = Xf;
function o2(e) {
  var t = new e.constructor(e.byteLength);
  return new zc(t).set(new zc(e)), t;
}
var xo = o2, l2 = xo;
function c2(e, t) {
  var r = t ? l2(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var u2 = c2, d2 = /\w*$/;
function f2(e) {
  var t = new e.constructor(e.source, d2.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var p2 = f2, qc = Rr, Bc = qc ? qc.prototype : void 0, Kc = Bc ? Bc.valueOf : void 0;
function h2(e) {
  return Kc ? Object(Kc.call(e)) : {};
}
var m2 = h2, g2 = xo;
function y2(e, t) {
  var r = t ? g2(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var Qf = y2, v2 = xo, b2 = u2, $2 = p2, w2 = m2, _2 = Qf, x2 = "[object Boolean]", S2 = "[object Date]", j2 = "[object Map]", E2 = "[object Number]", O2 = "[object RegExp]", N2 = "[object Set]", A2 = "[object String]", P2 = "[object Symbol]", C2 = "[object ArrayBuffer]", T2 = "[object DataView]", I2 = "[object Float32Array]", F2 = "[object Float64Array]", k2 = "[object Int8Array]", D2 = "[object Int16Array]", R2 = "[object Int32Array]", M2 = "[object Uint8Array]", L2 = "[object Uint8ClampedArray]", U2 = "[object Uint16Array]", W2 = "[object Uint32Array]";
function V2(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case C2:
      return v2(e);
    case x2:
    case S2:
      return new n(+e);
    case T2:
      return b2(e, r);
    case I2:
    case F2:
    case k2:
    case D2:
    case R2:
    case M2:
    case L2:
    case U2:
    case W2:
      return _2(e, r);
    case j2:
      return new n();
    case E2:
    case A2:
      return new n(e);
    case O2:
      return $2(e);
    case N2:
      return new n();
    case P2:
      return w2(e);
  }
}
var z2 = V2, q2 = gt, Gc = Object.create, B2 = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!q2(t))
      return {};
    if (Gc)
      return Gc(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}(), K2 = B2, G2 = K2, H2 = _o, J2 = vo;
function Y2(e) {
  return typeof e.constructor == "function" && !J2(e) ? G2(H2(e)) : {};
}
var ep = Y2, Z2 = ia, X2 = yt, Q2 = "[object Map]";
function eE(e) {
  return X2(e) && Z2(e) == Q2;
}
var tE = eE, rE = tE, nE = or, Hc = go, Jc = Hc && Hc.isMap, sE = Jc ? nE(Jc) : rE, aE = sE, iE = ia, oE = yt, lE = "[object Set]";
function cE(e) {
  return oE(e) && iE(e) == lE;
}
var uE = cE, dE = uE, fE = or, Yc = go, Zc = Yc && Yc.isSet, pE = Zc ? fE(Zc) : dE, hE = pE, mE = na, gE = Lf, yE = Wf, vE = TS, bE = JS, $E = Bf, wE = bo, _E = lj, xE = wj, SE = Jf, jE = Ij, EE = ia, OE = s2, NE = z2, AE = ep, PE = He, CE = aa, TE = aE, IE = gt, FE = hE, kE = Rn, DE = Vr, RE = 1, ME = 2, LE = 4, tp = "[object Arguments]", UE = "[object Array]", WE = "[object Boolean]", VE = "[object Date]", zE = "[object Error]", rp = "[object Function]", qE = "[object GeneratorFunction]", BE = "[object Map]", KE = "[object Number]", np = "[object Object]", GE = "[object RegExp]", HE = "[object Set]", JE = "[object String]", YE = "[object Symbol]", ZE = "[object WeakMap]", XE = "[object ArrayBuffer]", QE = "[object DataView]", eO = "[object Float32Array]", tO = "[object Float64Array]", rO = "[object Int8Array]", nO = "[object Int16Array]", sO = "[object Int32Array]", aO = "[object Uint8Array]", iO = "[object Uint8ClampedArray]", oO = "[object Uint16Array]", lO = "[object Uint32Array]", be = {};
be[tp] = be[UE] = be[XE] = be[QE] = be[WE] = be[VE] = be[eO] = be[tO] = be[rO] = be[nO] = be[sO] = be[BE] = be[KE] = be[np] = be[GE] = be[HE] = be[JE] = be[YE] = be[aO] = be[iO] = be[oO] = be[lO] = !0;
be[zE] = be[rp] = be[ZE] = !1;
function cs(e, t, r, n, s, a) {
  var i, o = t & RE, l = t & ME, u = t & LE;
  if (r && (i = s ? r(e, n, s, a) : r(e)), i !== void 0)
    return i;
  if (!IE(e))
    return e;
  var c = PE(e);
  if (c) {
    if (i = OE(e), !o)
      return wE(e, i);
  } else {
    var f = EE(e), m = f == rp || f == qE;
    if (CE(e))
      return $E(e, o);
    if (f == np || f == tp || m && !s) {
      if (i = l || m ? {} : AE(e), !o)
        return l ? xE(e, bE(i, e)) : _E(e, vE(i, e));
    } else {
      if (!be[f])
        return s ? e : {};
      i = NE(e, f, o);
    }
  }
  a || (a = new mE());
  var h = a.get(e);
  if (h)
    return h;
  a.set(e, i), FE(e) ? e.forEach(function(y) {
    i.add(cs(y, t, r, y, e, a));
  }) : TE(e) && e.forEach(function(y, p) {
    i.set(p, cs(y, t, r, p, e, a));
  });
  var g = u ? l ? jE : SE : l ? DE : kE, b = c ? void 0 : g(e);
  return gE(b || e, function(y, p) {
    b && (p = y, y = e[p]), yE(i, p, cs(y, t, r, p, e, a));
  }), i;
}
var cO = cs, uO = cO, dO = 1, fO = 4;
function pO(e) {
  return uO(e, dO | fO);
}
var hO = pO, mO = "__lodash_hash_undefined__";
function gO(e) {
  return this.__data__.set(e, mO), this;
}
var yO = gO;
function vO(e) {
  return this.__data__.has(e);
}
var bO = vO, $O = fo, wO = yO, _O = bO;
function Ps(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new $O(); ++t < r; )
    this.add(e[t]);
}
Ps.prototype.add = Ps.prototype.push = wO;
Ps.prototype.has = _O;
var oa = Ps;
function xO(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
var SO = xO;
function jO(e, t) {
  return e.has(t);
}
var la = jO, EO = oa, OO = SO, NO = la, AO = 1, PO = 2;
function CO(e, t, r, n, s, a) {
  var i = r & AO, o = e.length, l = t.length;
  if (o != l && !(i && l > o))
    return !1;
  var u = a.get(e), c = a.get(t);
  if (u && c)
    return u == t && c == e;
  var f = -1, m = !0, h = r & PO ? new EO() : void 0;
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
      if (!OO(t, function(p, v) {
        if (!NO(h, v) && (g === p || s(g, p, r, n, a)))
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
var sp = CO;
function TO(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n, s) {
    r[++t] = [s, n];
  }), r;
}
var IO = TO;
function FO(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n) {
    r[++t] = n;
  }), r;
}
var So = FO, Xc = Rr, Qc = Xf, kO = kr, DO = sp, RO = IO, MO = So, LO = 1, UO = 2, WO = "[object Boolean]", VO = "[object Date]", zO = "[object Error]", qO = "[object Map]", BO = "[object Number]", KO = "[object RegExp]", GO = "[object Set]", HO = "[object String]", JO = "[object Symbol]", YO = "[object ArrayBuffer]", ZO = "[object DataView]", eu = Xc ? Xc.prototype : void 0, Ua = eu ? eu.valueOf : void 0;
function XO(e, t, r, n, s, a, i) {
  switch (r) {
    case ZO:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case YO:
      return !(e.byteLength != t.byteLength || !a(new Qc(e), new Qc(t)));
    case WO:
    case VO:
    case BO:
      return kO(+e, +t);
    case zO:
      return e.name == t.name && e.message == t.message;
    case KO:
    case HO:
      return e == t + "";
    case qO:
      var o = RO;
    case GO:
      var l = n & LO;
      if (o || (o = MO), e.size != t.size && !l)
        return !1;
      var u = i.get(e);
      if (u)
        return u == t;
      n |= UO, i.set(e, t);
      var c = DO(o(e), o(t), n, s, a, i);
      return i.delete(e), c;
    case JO:
      if (Ua)
        return Ua.call(e) == Ua.call(t);
  }
  return !1;
}
var QO = XO, tu = Jf, eN = 1, tN = Object.prototype, rN = tN.hasOwnProperty;
function nN(e, t, r, n, s, a) {
  var i = r & eN, o = tu(e), l = o.length, u = tu(t), c = u.length;
  if (l != c && !i)
    return !1;
  for (var f = l; f--; ) {
    var m = o[f];
    if (!(i ? m in t : rN.call(t, m)))
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
var sN = nN, Wa = na, aN = sp, iN = QO, oN = sN, ru = ia, nu = He, su = aa, lN = yo, cN = 1, au = "[object Arguments]", iu = "[object Array]", Jn = "[object Object]", uN = Object.prototype, ou = uN.hasOwnProperty;
function dN(e, t, r, n, s, a) {
  var i = nu(e), o = nu(t), l = i ? iu : ru(e), u = o ? iu : ru(t);
  l = l == au ? Jn : l, u = u == au ? Jn : u;
  var c = l == Jn, f = u == Jn, m = l == u;
  if (m && su(e)) {
    if (!su(t))
      return !1;
    i = !0, c = !1;
  }
  if (m && !c)
    return a || (a = new Wa()), i || lN(e) ? aN(e, t, r, n, s, a) : iN(e, t, l, r, n, s, a);
  if (!(r & cN)) {
    var h = c && ou.call(e, "__wrapped__"), g = f && ou.call(t, "__wrapped__");
    if (h || g) {
      var b = h ? e.value() : e, y = g ? t.value() : t;
      return a || (a = new Wa()), s(b, y, r, n, a);
    }
  }
  return m ? (a || (a = new Wa()), oN(e, t, r, n, s, a)) : !1;
}
var fN = dN, pN = fN, lu = yt;
function ap(e, t, r, n, s) {
  return e === t ? !0 : e == null || t == null || !lu(e) && !lu(t) ? e !== e && t !== t : pN(e, t, r, n, ap, s);
}
var jo = ap, hN = jo;
function mN(e, t) {
  return hN(e, t);
}
var ip = mN, cu = Rr, gN = sa, yN = He, uu = cu ? cu.isConcatSpreadable : void 0;
function vN(e) {
  return yN(e) || gN(e) || !!(uu && e && e[uu]);
}
var bN = vN, $N = wo, wN = bN;
function op(e, t, r, n, s) {
  var a = -1, i = e.length;
  for (r || (r = wN), s || (s = []); ++a < i; ) {
    var o = e[a];
    t > 0 && r(o) ? t > 1 ? op(o, t - 1, r, n, s) : $N(s, o) : n || (s[s.length] = o);
  }
  return s;
}
var Eo = op;
function _N(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, s = Array(n); ++r < n; )
    s[r] = t(e[r], r, e);
  return s;
}
var lr = _N, xN = ar, SN = yt, jN = "[object Symbol]";
function EN(e) {
  return typeof e == "symbol" || SN(e) && xN(e) == jN;
}
var ca = EN, ON = He, NN = ca, AN = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, PN = /^\w*$/;
function CN(e, t) {
  if (ON(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || NN(e) ? !0 : PN.test(e) || !AN.test(e) || t != null && e in Object(t);
}
var Oo = CN, lp = fo, TN = "Expected a function";
function No(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(TN);
  var r = function() {
    var n = arguments, s = t ? t.apply(this, n) : n[0], a = r.cache;
    if (a.has(s))
      return a.get(s);
    var i = e.apply(this, n);
    return r.cache = a.set(s, i) || a, i;
  };
  return r.cache = new (No.Cache || lp)(), r;
}
No.Cache = lp;
var IN = No, FN = IN, kN = 500;
function DN(e) {
  var t = FN(e, function(n) {
    return r.size === kN && r.clear(), n;
  }), r = t.cache;
  return t;
}
var RN = DN, MN = RN, LN = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, UN = /\\(\\)?/g, WN = MN(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(LN, function(r, n, s, a) {
    t.push(s ? a.replace(UN, "$1") : n || r);
  }), t;
}), VN = WN, du = Rr, zN = lr, qN = He, BN = ca, fu = du ? du.prototype : void 0, pu = fu ? fu.toString : void 0;
function cp(e) {
  if (typeof e == "string")
    return e;
  if (qN(e))
    return zN(e, cp) + "";
  if (BN(e))
    return pu ? pu.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
var KN = cp, GN = KN;
function HN(e) {
  return e == null ? "" : GN(e);
}
var JN = HN, YN = He, ZN = Oo, XN = VN, QN = JN;
function eA(e, t) {
  return YN(e) ? e : ZN(e, t) ? [e] : XN(QN(e));
}
var up = eA, tA = ca;
function rA(e) {
  if (typeof e == "string" || tA(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
var ua = rA, nA = up, sA = ua;
function aA(e, t) {
  t = nA(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[sA(t[r++])];
  return r && r == n ? e : void 0;
}
var Ao = aA, iA = na, oA = jo, lA = 1, cA = 2;
function uA(e, t, r, n) {
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
      var f = new iA();
      if (n)
        var m = n(u, c, l, e, t, f);
      if (!(m === void 0 ? oA(c, u, lA | cA, n, f) : m))
        return !1;
    }
  }
  return !0;
}
var dA = uA, fA = gt;
function pA(e) {
  return e === e && !fA(e);
}
var dp = pA, hA = dp, mA = Rn;
function gA(e) {
  for (var t = mA(e), r = t.length; r--; ) {
    var n = t[r], s = e[n];
    t[r] = [n, s, hA(s)];
  }
  return t;
}
var yA = gA;
function vA(e, t) {
  return function(r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
  };
}
var fp = vA, bA = dA, $A = yA, wA = fp;
function _A(e) {
  var t = $A(e);
  return t.length == 1 && t[0][2] ? wA(t[0][0], t[0][1]) : function(r) {
    return r === e || bA(r, e, t);
  };
}
var xA = _A, SA = Ao;
function jA(e, t, r) {
  var n = e == null ? void 0 : SA(e, t);
  return n === void 0 ? r : n;
}
var EA = jA;
function OA(e, t) {
  return e != null && t in Object(e);
}
var NA = OA, AA = up, PA = sa, CA = He, TA = ho, IA = mo, FA = ua;
function kA(e, t, r) {
  t = AA(t, e);
  for (var n = -1, s = t.length, a = !1; ++n < s; ) {
    var i = FA(t[n]);
    if (!(a = e != null && r(e, i)))
      break;
    e = e[i];
  }
  return a || ++n != s ? a : (s = e == null ? 0 : e.length, !!s && IA(s) && TA(i, s) && (CA(e) || PA(e)));
}
var DA = kA, RA = NA, MA = DA;
function LA(e, t) {
  return e != null && MA(e, t, RA);
}
var UA = LA, WA = jo, VA = EA, zA = UA, qA = Oo, BA = dp, KA = fp, GA = ua, HA = 1, JA = 2;
function YA(e, t) {
  return qA(e) && BA(t) ? KA(GA(e), t) : function(r) {
    var n = VA(r, e);
    return n === void 0 && n === t ? zA(r, e) : WA(t, n, HA | JA);
  };
}
var ZA = YA;
function XA(e) {
  return e;
}
var Mn = XA;
function QA(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
var eP = QA, tP = Ao;
function rP(e) {
  return function(t) {
    return tP(t, e);
  };
}
var nP = rP, sP = eP, aP = nP, iP = Oo, oP = ua;
function lP(e) {
  return iP(e) ? sP(oP(e)) : aP(e);
}
var cP = lP, uP = xA, dP = ZA, fP = Mn, pP = He, hP = cP;
function mP(e) {
  return typeof e == "function" ? e : e == null ? fP : typeof e == "object" ? pP(e) ? dP(e[0], e[1]) : uP(e) : hP(e);
}
var gP = mP;
function yP(e) {
  return function(t, r, n) {
    for (var s = -1, a = Object(t), i = n(t), o = i.length; o--; ) {
      var l = i[e ? o : ++s];
      if (r(a[l], l, a) === !1)
        break;
    }
    return t;
  };
}
var vP = yP, bP = vP, $P = bP(), pp = $P, wP = pp, _P = Rn;
function xP(e, t) {
  return e && wP(e, t, _P);
}
var SP = xP, jP = Wr;
function EP(e, t) {
  return function(r, n) {
    if (r == null)
      return r;
    if (!jP(r))
      return e(r, n);
    for (var s = r.length, a = t ? s : -1, i = Object(r); (t ? a-- : ++a < s) && n(i[a], a, i) !== !1; )
      ;
    return r;
  };
}
var OP = EP, NP = SP, AP = OP, PP = AP(NP), hp = PP, CP = hp, TP = Wr;
function IP(e, t) {
  var r = -1, n = TP(e) ? Array(e.length) : [];
  return CP(e, function(s, a, i) {
    n[++r] = t(s, a, i);
  }), n;
}
var FP = IP;
function kP(e, t) {
  var r = e.length;
  for (e.sort(t); r--; )
    e[r] = e[r].value;
  return e;
}
var DP = kP, hu = ca;
function RP(e, t) {
  if (e !== t) {
    var r = e !== void 0, n = e === null, s = e === e, a = hu(e), i = t !== void 0, o = t === null, l = t === t, u = hu(t);
    if (!o && !u && !a && e > t || a && i && l && !o && !u || n && i && l || !r && l || !s)
      return 1;
    if (!n && !a && !u && e < t || u && r && s && !n && !a || o && r && s || !i && s || !l)
      return -1;
  }
  return 0;
}
var MP = RP, LP = MP;
function UP(e, t, r) {
  for (var n = -1, s = e.criteria, a = t.criteria, i = s.length, o = r.length; ++n < i; ) {
    var l = LP(s[n], a[n]);
    if (l) {
      if (n >= o)
        return l;
      var u = r[n];
      return l * (u == "desc" ? -1 : 1);
    }
  }
  return e.index - t.index;
}
var WP = UP, Va = lr, VP = Ao, zP = gP, qP = FP, BP = DP, KP = or, GP = WP, HP = Mn, JP = He;
function YP(e, t, r) {
  t.length ? t = Va(t, function(a) {
    return JP(a) ? function(i) {
      return VP(i, a.length === 1 ? a[0] : a);
    } : a;
  }) : t = [HP];
  var n = -1;
  t = Va(t, KP(zP));
  var s = qP(e, function(a, i, o) {
    var l = Va(t, function(u) {
      return u(a);
    });
    return { criteria: l, index: ++n, value: a };
  });
  return BP(s, function(a, i) {
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
var mp = XP, QP = mp, mu = Math.max;
function eC(e, t, r) {
  return t = mu(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, s = -1, a = mu(n.length - t, 0), i = Array(a); ++s < a; )
      i[s] = n[t + s];
    s = -1;
    for (var o = Array(t + 1); ++s < t; )
      o[s] = n[s];
    return o[t] = r(i), QP(e, this, o);
  };
}
var tC = eC;
function rC(e) {
  return function() {
    return e;
  };
}
var nC = rC, sC = nC, gu = Uf, aC = Mn, iC = gu ? function(e, t) {
  return gu(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: sC(t),
    writable: !0
  });
} : aC, oC = iC, lC = 800, cC = 16, uC = Date.now;
function dC(e) {
  var t = 0, r = 0;
  return function() {
    var n = uC(), s = cC - (n - r);
    if (r = n, s > 0) {
      if (++t >= lC)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
var fC = dC, pC = oC, hC = fC, mC = hC(pC), gC = mC, yC = Mn, vC = tC, bC = gC;
function $C(e, t) {
  return bC(vC(e, t, yC), e + "");
}
var cr = $C, wC = kr, _C = Wr, xC = ho, SC = gt;
function jC(e, t, r) {
  if (!SC(r))
    return !1;
  var n = typeof t;
  return (n == "number" ? _C(r) && xC(t, r.length) : n == "string" && t in r) ? wC(r[t], e) : !1;
}
var Po = jC, EC = Eo, OC = ZP, NC = cr, yu = Po, AC = NC(function(e, t) {
  if (e == null)
    return [];
  var r = t.length;
  return r > 1 && yu(e, t[0], t[1]) ? t = [] : r > 2 && yu(t[0], t[1], t[2]) && (t = [t[0]]), OC(e, EC(t, 1), []);
}), gp = AC;
function PC(e, t, r, n) {
  for (var s = e.length, a = r + (n ? 1 : -1); n ? a-- : ++a < s; )
    if (t(e[a], a, e))
      return a;
  return -1;
}
var CC = PC;
function TC(e) {
  return e !== e;
}
var IC = TC;
function FC(e, t, r) {
  for (var n = r - 1, s = e.length; ++n < s; )
    if (e[n] === t)
      return n;
  return -1;
}
var kC = FC, DC = CC, RC = IC, MC = kC;
function LC(e, t, r) {
  return t === t ? MC(e, t, r) : DC(e, RC, r);
}
var yp = LC, UC = yp;
function WC(e, t) {
  var r = e == null ? 0 : e.length;
  return !!r && UC(e, t, 0) > -1;
}
var Co = WC;
function VC(e, t, r) {
  for (var n = -1, s = e == null ? 0 : e.length; ++n < s; )
    if (r(t, e[n]))
      return !0;
  return !1;
}
var To = VC;
function zC() {
}
var qC = zC, za = Yf, BC = qC, KC = So, GC = 1 / 0, HC = za && 1 / KC(new za([, -0]))[1] == GC ? function(e) {
  return new za(e);
} : BC, JC = HC, YC = oa, ZC = Co, XC = To, QC = la, eT = JC, tT = So, rT = 200;
function nT(e, t, r) {
  var n = -1, s = ZC, a = e.length, i = !0, o = [], l = o;
  if (r)
    i = !1, s = XC;
  else if (a >= rT) {
    var u = t ? null : eT(e);
    if (u)
      return tT(u);
    i = !1, s = QC, l = new YC();
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
var vp = nT, sT = vp;
function aT(e) {
  return e && e.length ? sT(e) : [];
}
var Io = aT, iT = vp;
function oT(e, t) {
  return t = typeof t == "function" ? t : void 0, e && e.length ? iT(e, void 0, t) : [];
}
var Fo = oT, lT = cr, cT = kr, uT = Po, dT = Vr, bp = Object.prototype, fT = bp.hasOwnProperty, pT = lT(function(e, t) {
  e = Object(e);
  var r = -1, n = t.length, s = n > 2 ? t[2] : void 0;
  for (s && uT(t[0], t[1], s) && (n = 1); ++r < n; )
    for (var a = t[r], i = dT(a), o = -1, l = i.length; ++o < l; ) {
      var u = i[o], c = e[u];
      (c === void 0 || cT(c, bp[u]) && !fT.call(e, u)) && (e[u] = a[u]);
    }
  return e;
}), hT = pT, mT = oa, gT = Co, yT = To, vT = lr, bT = or, vu = la, $T = Math.min;
function wT(e, t, r) {
  for (var n = r ? yT : gT, s = e[0].length, a = e.length, i = a, o = Array(a), l = 1 / 0, u = []; i--; ) {
    var c = e[i];
    i && t && (c = vT(c, bT(t))), l = $T(c.length, l), o[i] = !r && (t || s >= 120 && c.length >= 120) ? new mT(i && c) : void 0;
  }
  c = e[0];
  var f = -1, m = o[0];
  e:
    for (; ++f < s && u.length < l; ) {
      var h = c[f], g = t ? t(h) : h;
      if (h = r || h !== 0 ? h : 0, !(m ? vu(m, g) : n(u, g, r))) {
        for (i = a; --i; ) {
          var b = o[i];
          if (!(b ? vu(b, g) : n(e[i], g, r)))
            continue e;
        }
        m && m.push(g), u.push(h);
      }
    }
  return u;
}
var $p = wT, _T = Wr, xT = yt;
function ST(e) {
  return xT(e) && _T(e);
}
var ko = ST, jT = ko;
function ET(e) {
  return jT(e) ? e : [];
}
var wp = ET;
function OT(e) {
  var t = e == null ? 0 : e.length;
  return t ? e[t - 1] : void 0;
}
var NT = OT, AT = lr, PT = $p, CT = cr, TT = wp, IT = NT, FT = CT(function(e) {
  var t = IT(e), r = AT(e, TT);
  return t = typeof t == "function" ? t : void 0, t && r.pop(), r.length && r[0] === e[0] ? PT(r, void 0, t) : [];
}), _p = FT, kT = ar, DT = _o, RT = yt, MT = "[object Object]", LT = Function.prototype, UT = Object.prototype, xp = LT.toString, WT = UT.hasOwnProperty, VT = xp.call(Object);
function zT(e) {
  if (!RT(e) || kT(e) != MT)
    return !1;
  var t = DT(e);
  if (t === null)
    return !0;
  var r = WT.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && xp.call(r) == VT;
}
var da = zT, qT = ar, BT = yt, KT = "[object Boolean]";
function GT(e) {
  return e === !0 || e === !1 || BT(e) && qT(e) == KT;
}
var HT = GT, lt = ip, JT = gp, Do = Io, bu = Fo, YT = hT, ZT = _p, Cs = da, qa = HT, $u = (e) => Array.isArray(e) ? e : [e], Ze = (e) => e === void 0, Yn = (e) => Cs(e) || Array.isArray(e) ? Object.keys(e) : [], mr = (e, t) => e.hasOwnProperty(t), Sr = (e) => JT(Do(e)), wu = (e) => Ze(e) || Array.isArray(e) && e.length === 0, XT = (e, t, r, n) => t && mr(t, r) && e && mr(e, r) && n(e[r], t[r]), Ba = (e, t) => Ze(e) && t === 0 || Ze(t) && e === 0 || lt(e, t), QT = (e, t) => Ze(e) && t === !1 || Ze(t) && e === !1 || lt(e, t), _u = (e) => Ze(e) || lt(e, {}) || e === !0, Zn = (e) => Ze(e) || lt(e, {}), xu = (e) => Ze(e) || Cs(e) || e === !0 || e === !1;
function Su(e, t) {
  return wu(e) && wu(t) ? !0 : lt(Sr(e), Sr(t));
}
function eI(e, t) {
  return e = $u(e), t = $u(t), lt(Sr(e), Sr(t));
}
function us(e, t, r, n) {
  var s = Do(Yn(e).concat(Yn(t)));
  return Zn(e) && Zn(t) ? !0 : Zn(e) && Yn(t).length || Zn(t) && Yn(e).length ? !1 : s.every(function(a) {
    var i = e[a], o = t[a];
    return Array.isArray(i) && Array.isArray(o) ? lt(Sr(e), Sr(t)) : Array.isArray(i) && !Array.isArray(o) || Array.isArray(o) && !Array.isArray(i) ? !1 : XT(e, t, a, n);
  });
}
function tI(e, t, r, n) {
  return Cs(e) && Cs(t) ? n(e, t) : Array.isArray(e) && Array.isArray(t) ? us(e, t, r, n) : lt(e, t);
}
function Ka(e, t, r, n) {
  var s = bu(e, n), a = bu(t, n), i = ZT(s, a, n);
  return i.length === Math.max(s.length, a.length);
}
var rI = {
  title: lt,
  uniqueItems: QT,
  minLength: Ba,
  minItems: Ba,
  minProperties: Ba,
  required: Su,
  enum: Su,
  type: eI,
  items: tI,
  anyOf: Ka,
  allOf: Ka,
  oneOf: Ka,
  properties: us,
  patternProperties: us,
  dependencies: us
}, nI = [
  "properties",
  "patternProperties",
  "dependencies",
  "uniqueItems",
  "minLength",
  "minItems",
  "minProperties",
  "required"
], sI = ["additionalProperties", "additionalItems", "contains", "propertyNames", "not"];
function wi(e, t, r) {
  if (r = YT(r, {
    ignore: []
  }), _u(e) && _u(t))
    return !0;
  if (!xu(e) || !xu(t))
    throw new Error("Either of the values are not a JSON schema.");
  if (e === t)
    return !0;
  if (qa(e) && qa(t))
    return e === t;
  if (e === void 0 && t === !1 || t === void 0 && e === !1 || Ze(e) && !Ze(t) || !Ze(e) && Ze(t))
    return !1;
  var n = Do(Object.keys(e).concat(Object.keys(t)));
  if (r.ignore.length && (n = n.filter((a) => r.ignore.indexOf(a) === -1)), !n.length)
    return !0;
  function s(a, i) {
    return wi(a, i, r);
  }
  return n.every(function(a) {
    var i = e[a], o = t[a];
    if (sI.indexOf(a) !== -1)
      return wi(i, o, r);
    var l = rI[a];
    if (l || (l = lt), lt(i, o))
      return !0;
    if (nI.indexOf(a) === -1 && (!mr(e, a) && mr(t, a) || mr(e, a) && !mr(t, a)))
      return i === o;
    var u = l(i, o, a, s);
    if (!qa(u))
      throw new Error("Comparer must return true or false");
    return u;
  });
}
var Ro = wi;
function aI(e) {
  return Object.prototype.toString.call(e) === "[object Array]";
}
var Mo = Array.isArray || aI;
function iI(e) {
  return (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]") && e.valueOf() === e.valueOf();
}
var oI = iI, lI = oI;
function cI(e) {
  return lI(e) && e % 1 === 0;
}
var uI = cI, dI = Mo, fI = uI;
function pI(e) {
  var t;
  if (!dI(e) || (t = e.length, !t))
    return !1;
  for (var r = 0; r < t; r++)
    if (!fI(e[r]))
      return !1;
  return !0;
}
var Sp = pI;
function hI(e) {
  return typeof e == "function";
}
var jp = hI, mI = Mo, ju = Sp, gI = jp, Xn = Math.pow(2, 31) - 1;
function Eu(e, t) {
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
function Ou(e, t) {
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
function yI() {
  var e = arguments.length, t, r, n, s, a, i, o;
  for (t = new Array(e), o = 0; o < e; o++)
    t[o] = arguments[o];
  if (ju(t)) {
    if (e === 2)
      return a = t[0], i = t[1], a < 0 && (a = -a), i < 0 && (i = -i), a <= Xn && i <= Xn ? Ou(a, i) : Eu(a, i);
    n = t;
  } else if (mI(t[0]))
    if (e > 1) {
      if (n = t[0], r = t[1], !gI(r))
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
  if (e < 3 && !ju(n))
    throw new TypeError("gcd()::invalid input argument. Accessed array values must be integers. Value: `" + n + "`.");
  for (o = 0; o < s; o++)
    a = n[o], a < 0 && (n[o] = -a);
  for (a = n[0], o = 1; o < s; o++)
    i = n[o], i <= Xn && a <= Xn ? a = Ou(a, i) : a = Eu(a, i);
  return a;
}
var vI = yI, Nu = vI, bI = Mo, Au = Sp, $I = jp;
function wI() {
  var e = arguments.length, t, r, n, s, a, i, o;
  for (t = new Array(e), o = 0; o < e; o++)
    t[o] = arguments[o];
  if (Au(t)) {
    if (e === 2)
      return a = t[0], i = t[1], a < 0 && (a = -a), i < 0 && (i = -i), a === 0 || i === 0 ? 0 : a / Nu(a, i) * i;
    n = t;
  } else if (bI(t[0]))
    if (e > 1) {
      if (n = t[0], r = t[1], !$I(r))
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
  if (e < 3 && !Au(n))
    throw new TypeError("lcm()::invalid input argument. Accessed array values must be integers. Value: `" + n + "`.");
  for (o = 0; o < s; o++)
    a = n[o], a < 0 && (n[o] = -a);
  for (a = n[0], o = 1; o < s; o++) {
    if (i = n[o], a === 0 || i === 0)
      return 0;
    a = a / Nu(a, i) * i;
  }
  return a;
}
var _I = wI, xI = po, SI = kr;
function jI(e, t, r) {
  (r !== void 0 && !SI(e[t], r) || r === void 0 && !(t in e)) && xI(e, t, r);
}
var Ep = jI;
function EI(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
var Op = EI, OI = Dn, NI = Vr;
function AI(e) {
  return OI(e, NI(e));
}
var PI = AI, Pu = Ep, CI = Bf, TI = Qf, II = bo, FI = ep, Cu = sa, Tu = He, kI = ko, DI = aa, RI = co, MI = gt, LI = da, UI = yo, Iu = Op, WI = PI;
function VI(e, t, r, n, s, a, i) {
  var o = Iu(e, r), l = Iu(t, r), u = i.get(l);
  if (u) {
    Pu(e, r, u);
    return;
  }
  var c = a ? a(o, l, r + "", e, t, i) : void 0, f = c === void 0;
  if (f) {
    var m = Tu(l), h = !m && DI(l), g = !m && !h && UI(l);
    c = l, m || h || g ? Tu(o) ? c = o : kI(o) ? c = II(o) : h ? (f = !1, c = CI(l, !0)) : g ? (f = !1, c = TI(l, !0)) : c = [] : LI(l) || Cu(l) ? (c = o, Cu(o) ? c = WI(o) : (!MI(o) || RI(o)) && (c = FI(l))) : f = !1;
  }
  f && (i.set(l, c), s(c, l, n, a, i), i.delete(l)), Pu(e, r, c);
}
var zI = VI, qI = na, BI = Ep, KI = pp, GI = zI, HI = gt, JI = Vr, YI = Op;
function Np(e, t, r, n, s) {
  e !== t && KI(t, function(a, i) {
    if (s || (s = new qI()), HI(a))
      GI(e, t, i, r, Np, n, s);
    else {
      var o = n ? n(YI(e, i), a, i + "", e, t, s) : void 0;
      o === void 0 && (o = a), BI(e, i, o);
    }
  }, JI);
}
var Ap = Np, ZI = Ap, Fu = gt;
function Pp(e, t, r, n, s, a) {
  return Fu(e) && Fu(t) && (a.set(t, e), ZI(e, t, void 0, Pp, a), a.delete(t)), e;
}
var XI = Pp, QI = cr, eF = Po;
function tF(e) {
  return QI(function(t, r) {
    var n = -1, s = r.length, a = s > 1 ? r[s - 1] : void 0, i = s > 2 ? r[2] : void 0;
    for (a = e.length > 3 && typeof a == "function" ? (s--, a) : void 0, i && eF(r[0], r[1], i) && (a = s < 3 ? void 0 : a, s = 1), t = Object(t); ++n < s; ) {
      var o = r[n];
      o && e(t, o, n, a);
    }
    return t;
  });
}
var rF = tF, nF = Ap, sF = rF, aF = sF(function(e, t, r, n) {
  nF(e, t, r, n);
}), iF = aF, oF = mp, lF = cr, cF = XI, uF = iF, dF = lF(function(e) {
  return e.push(void 0, cF), oF(uF, void 0, e);
}), fF = dF, pF = Eo;
function hF(e) {
  var t = e == null ? 0 : e.length;
  return t ? pF(e, 1) : [];
}
var Cp = hF, mF = Eo, gF = 1 / 0;
function yF(e) {
  var t = e == null ? 0 : e.length;
  return t ? mF(e, gF) : [];
}
var Tp = yF, vF = lr, bF = $p, $F = cr, wF = wp, _F = $F(function(e) {
  var t = vF(e, wF);
  return t.length && t[0] === e[0] ? bF(t) : [];
}), xF = _F;
function SF(e, t, r, n) {
  for (var s = r - 1, a = e.length; ++s < a; )
    if (n(e[s], t))
      return s;
  return -1;
}
var jF = SF, EF = lr, OF = yp, NF = jF, AF = or, PF = bo, CF = Array.prototype, ku = CF.splice;
function TF(e, t, r, n) {
  var s = n ? NF : OF, a = -1, i = t.length, o = e;
  for (e === t && (t = PF(t)), r && (o = EF(e, AF(r))); ++a < i; )
    for (var l = 0, u = t[a], c = r ? r(u) : u; (l = s(o, c, l, n)) > -1; )
      o !== e && ku.call(o, l, 1), ku.call(e, l, 1);
  return e;
}
var IF = TF, FF = IF;
function kF(e, t) {
  return e && e.length && t && t.length ? FF(e, t) : e;
}
var DF = kF, RF = Mn;
function MF(e) {
  return typeof e == "function" ? e : RF;
}
var LF = MF, UF = Lf, WF = hp, VF = LF, zF = He;
function qF(e, t) {
  var r = zF(e) ? UF : WF;
  return r(e, VF(t));
}
var Ip = qF, BF = oa, KF = Co, GF = To, HF = lr, JF = or, YF = la, ZF = 200;
function XF(e, t, r, n) {
  var s = -1, a = KF, i = !0, o = e.length, l = [], u = t.length;
  if (!o)
    return l;
  r && (t = HF(t, JF(r))), n ? (a = GF, i = !1) : t.length >= ZF && (a = YF, i = !1, t = new BF(t));
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
var QF = XF, ek = QF, tk = cr, rk = ko, nk = tk(function(e, t) {
  return rk(e) ? ek(e, t) : [];
}), sk = nk;
const ak = Cp, ik = Tp, Fp = da, ok = Io, lk = Fo, ck = sk;
function uk(e) {
  for (const t in e)
    kp(e, t) && mk(e[t]) && delete e[t];
  return e;
}
const dk = (e) => ok(ik(e.map(Lo))), fk = (e, t) => e.map((r) => r && r[t]), kp = (e, t) => Object.prototype.hasOwnProperty.call(e, t), Lo = (e) => Fp(e) || Array.isArray(e) ? Object.keys(e) : [], pk = (e) => e !== void 0, hk = (e) => Fp(e) || e === !0 || e === !1, mk = (e) => !Lo(e).length && e !== !1 && e !== !0, gk = (e, ...t) => ck.apply(null, [e].concat(ak(t)));
var Dp = {
  allUniqueKeys: dk,
  deleteUndefinedProps: uk,
  getValues: fk,
  has: kp,
  isSchema: hk,
  keys: Lo,
  notUndefined: pk,
  uniqWith: lk,
  withoutArr: gk
};
const yk = Ro, vk = Ip, {
  allUniqueKeys: bk,
  deleteUndefinedProps: $k,
  getValues: wk,
  keys: Zr,
  notUndefined: _k,
  uniqWith: xk,
  withoutArr: Du
} = Dp;
function Sk(e) {
  vk(e, function(t, r) {
    t === !1 && delete e[r];
  });
}
function Ru(e, t) {
  return bk(e).reduce(function(n, s) {
    const a = wk(e, s), i = xk(a.filter(_k), yk);
    return n[s] = t(i, s), n;
  }, {});
}
var jk = {
  keywords: ["properties", "patternProperties", "additionalProperties"],
  resolver(e, t, r, n) {
    n.ignoreAdditionalProperties || (e.forEach(function(a) {
      const i = e.filter((c) => c !== a), o = Zr(a.properties), u = Zr(a.patternProperties).map((c) => new RegExp(c));
      i.forEach(function(c) {
        const f = Zr(c.properties), m = f.filter((g) => u.some((b) => b.test(g)));
        Du(f, o, m).forEach(function(g) {
          c.properties[g] = r.properties([
            c.properties[g],
            a.additionalProperties
          ], g);
        });
      });
    }), e.forEach(function(a) {
      const i = e.filter((l) => l !== a), o = Zr(a.patternProperties);
      a.additionalProperties === !1 && i.forEach(function(l) {
        const u = Zr(l.patternProperties);
        Du(u, o).forEach((f) => delete l.patternProperties[f]);
      });
    }));
    const s = {
      additionalProperties: r.additionalProperties(e.map((a) => a.additionalProperties)),
      patternProperties: Ru(e.map((a) => a.patternProperties), r.patternProperties),
      properties: Ru(e.map((a) => a.properties), r.properties)
    };
    return s.additionalProperties === !1 && Sk(s.properties), $k(s);
  }
};
const Ek = Ro, Ok = Ip, {
  allUniqueKeys: Nk,
  deleteUndefinedProps: Ak,
  has: Pk,
  isSchema: Rp,
  notUndefined: Mp,
  uniqWith: Ck
} = Dp;
function Tk(e) {
  Ok(e, function(t, r) {
    t === !1 && e.splice(r, 1);
  });
}
function Ik(e, t) {
  return e.map(function(r) {
    if (r)
      if (Array.isArray(r.items)) {
        const n = r.items[t];
        if (Rp(n))
          return n;
        if (Pk(r, "additionalItems"))
          return r.additionalItems;
      } else
        return r.items;
  });
}
function Fk(e) {
  return e.map(function(t) {
    if (t)
      return Array.isArray(t.items) ? t.additionalItems : t.items;
  });
}
function kk(e, t, r) {
  return Nk(r).reduce(function(s, a) {
    const i = Ik(e, a), o = Ck(i.filter(Mp), Ek);
    return s[a] = t(o, a), s;
  }, []);
}
var Dk = {
  keywords: ["items", "additionalItems"],
  resolver(e, t, r) {
    const n = e.map((o) => o.items), s = n.filter(Mp), a = {};
    s.every(Rp) ? a.items = r.items(n) : a.items = kk(e, r.items, n);
    let i;
    return s.every(Array.isArray) ? i = e.map((o) => o.additionalItems) : s.some(Array.isArray) && (i = Fk(e)), i && (a.additionalItems = r.additionalItems(i)), a.additionalItems === !1 && Array.isArray(a.items) && Tk(a.items), Ak(a);
  }
};
const Lp = hO, Ts = Ro, Rk = _I, Mk = fF, Up = Cp, Uo = Tp, Lk = xF, Uk = _p, _i = ip, jr = da, Wk = DF, Wp = gp, Wo = Io, yr = Fo, Vp = jk, zp = Dk, Qn = (e, t) => e.indexOf(t) !== -1, Vk = (e) => jr(e) || e === !0 || e === !1, zk = (e) => e === !1, qp = (e) => e === !0, fa = (e, t, r) => r(e), Bp = (e) => Wp(Wo(Uo(e))), Is = (e) => e !== void 0, Kp = (e) => Wo(Uo(e.map(Jk))), qr = (e) => e[0], qk = (e) => Bp(e), Ln = (e) => Math.max.apply(Math, e), Un = (e) => Math.min.apply(Math, e), Bk = (e) => e.some(qp), Kk = (e) => yr(Up(e), _i);
function Gk(e) {
  return function(t, r) {
    return Ts({
      [e]: t
    }, { [e]: r });
  };
}
function Gp(e) {
  let { allOf: t = [], ...r } = e;
  return r = jr(e) ? r : e, [r, ...t.map(Gp)];
}
function Hp(e, t) {
  return e.map((r) => r && r[t]);
}
function Hk(e, t) {
  return e.map(function(r, n) {
    try {
      return t(r, n);
    } catch {
      return;
    }
  }).filter(Is);
}
function Jk(e) {
  return jr(e) || Array.isArray(e) ? Object.keys(e) : [];
}
function xi(e, t) {
  if (t = t || [], !e.length)
    return t;
  const r = e.slice(0).shift(), n = e.slice(1);
  return t.length ? xi(n, Up(t.map((s) => r.map((a) => [a].concat(s))))) : xi(n, r.map((s) => s));
}
function Jp(e, t) {
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
    const o = r.map((f) => e.reduce((m, h) => (f[h] !== void 0 && (m[h] = f[h]), m), {})), l = yr(o, Ts), u = i.keywords.reduce((f, m) => ({
      ...f,
      [m]: (h, g = []) => n(h, null, a.concat(m, g))
    }), {}), c = i.resolver(l, a.concat(t), u, s);
    return jr(c) || Jp(l, a.concat(t)), c;
  }
}
function Zk(e) {
  return { required: e };
}
const Xk = ["properties", "patternProperties", "definitions", "dependencies"], Qk = ["anyOf", "oneOf"], eD = [
  "additionalProperties",
  "additionalItems",
  "contains",
  "propertyNames",
  "not",
  "items"
], de = {
  type(e) {
    if (e.some(Array.isArray)) {
      const t = e.map(function(n) {
        return Array.isArray(n) ? n : [n];
      }), r = Lk.apply(null, t);
      if (r.length === 1)
        return r[0];
      if (r.length > 1)
        return Wo(r);
    }
  },
  dependencies(e, t, r) {
    return Kp(e).reduce(function(s, a) {
      const i = Hp(e, a);
      let o = yr(i.filter(Is), _i);
      const l = o.filter(Array.isArray);
      if (l.length) {
        if (l.length === o.length)
          s[a] = Bp(o);
        else {
          const u = o.filter(Vk), c = l.map(Zk);
          s[a] = r(u.concat(c), a);
        }
        return s;
      }
      return o = yr(o, Ts), s[a] = r(o, a), s;
    }, {});
  },
  oneOf(e, t, r) {
    const n = xi(Lp(e)), s = Hk(n, r), a = yr(s, Ts);
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
    return Rk(t) / r;
  },
  enum(e) {
    const t = Uk.apply(null, e.concat(_i));
    if (t.length)
      return Wp(t);
  }
};
de.$id = qr;
de.$ref = qr;
de.$schema = qr;
de.additionalItems = fa;
de.additionalProperties = fa;
de.anyOf = de.oneOf;
de.contains = fa;
de.default = qr;
de.definitions = de.dependencies;
de.description = qr;
de.examples = Kk;
de.exclusiveMaximum = Un;
de.exclusiveMinimum = Ln;
de.items = zp;
de.maximum = Un;
de.maxItems = Un;
de.maxLength = Un;
de.maxProperties = Un;
de.minimum = Ln;
de.minItems = Ln;
de.minLength = Ln;
de.minProperties = Ln;
de.properties = Vp;
de.propertyNames = fa;
de.required = qk;
de.title = qr;
de.uniqueItems = Bk;
const tD = {
  properties: Vp,
  items: zp
};
function Vo(e, t, r) {
  t = Mk(t, {
    ignoreAdditionalProperties: !1,
    resolvers: de,
    complexResolvers: tD,
    deep: !0
  });
  const n = Object.entries(t.complexResolvers);
  function s(o, l, u) {
    o = Lp(o.filter(Is)), u = u || [];
    const c = jr(l) ? l : {};
    if (!o.length)
      return;
    if (o.some(zk))
      return !1;
    if (o.every(qp))
      return !0;
    o = o.filter(jr);
    const f = Kp(o);
    if (t.deep && Qn(f, "allOf"))
      return Vo({
        allOf: o
      }, t);
    const m = n.map(([h, g]) => f.filter((b) => g.keywords.includes(b)));
    return m.forEach((h) => Wk(f, h)), f.forEach(function(h) {
      const g = Hp(o, h), b = yr(g.filter(Is), Gk(h));
      if (b.length === 1 && Qn(Qk, h))
        c[h] = b[0].map((y) => s([y], y));
      else if (b.length === 1 && !Qn(Xk, h) && !Qn(eD, h))
        c[h] = b[0];
      else {
        const y = t.resolvers[h] || t.resolvers.defaultResolver;
        if (!y) throw new Error("No resolver found for key " + h + ". You can provide a resolver for this keyword in the options, or provide a default resolver.");
        const p = (v, $ = []) => s(v, null, u.concat(h, $));
        c[h] = y(b, u.concat(h), p, t), c[h] === void 0 ? Jp(b, u.concat(h)) : c[h] === void 0 && delete c[h];
      }
    }), n.reduce((h, [g, b], y) => ({
      ...h,
      ...Yk(m[y], g, o, s, t, u)
    }), c);
  }
  const a = Uo(Gp(e));
  return s(a);
}
Vo.options = {
  resolvers: de
};
var rD = Vo;
const nD = /* @__PURE__ */ On(rD);
function Er(e) {
  let t;
  const r = Z(e, "discriminator.propertyName", void 0);
  return Xs(r) ? t = r : r !== void 0 && console.warn(`Expecting discriminator to be a string, got "${typeof r}" instead`), t;
}
function vn(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : e == null ? "null" : typeof e == "boolean" ? "boolean" : isNaN(e) ? typeof e == "object" ? "object" : "string" : "number";
}
var sD = lo(function(e) {
  return kf(kn(e, 1, Es, !0));
});
function Nt(e) {
  let { type: t } = e;
  return !t && e.const ? vn(e.const) : !t && e.enum ? "string" : !t && (e.properties || e.additionalProperties) ? "object" : (Array.isArray(t) && (t.length === 2 && t.includes("null") ? t = t.find((r) => r !== "null") : t = t[0]), t);
}
function At(e, t) {
  const r = Object.assign({}, e);
  return Object.keys(t).reduce((n, s) => {
    const a = e ? e[s] : {}, i = t[s];
    return e && s in e && ce(i) ? n[s] = At(a, i) : e && t && (Nt(e) === "object" || Nt(t) === "object") && s === xg && Array.isArray(a) && Array.isArray(i) ? n[s] = sD(a, i) : n[s] = i, n;
  }, r);
}
function Ge(e, t, r = {}, n, s) {
  return dt(e, t, r, n, void 0, void 0, s)[0];
}
function aD(e, t, r, n, s, a, i) {
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
function Yp(e) {
  return e.reduce(
    (r, n) => n.length > 1 ? n.flatMap((s) => Pf(r.length, (a) => [...r[a]].concat(s))) : (r.forEach((s) => s.push(n[0])), r),
    [[]]
    // Start with an empty list
  );
}
function iD(e, t, r, n, s, a, i) {
  const o = Zp(e, t, r, n, s, a);
  if (o.length > 1 || o[0] !== t)
    return o;
  if (Us in t)
    return Xp(e, t, r, n, s, a).flatMap((u) => dt(e, u, r, a, n, s, i));
  if (Cr in t && Array.isArray(t.allOf)) {
    const l = t.allOf.map((c) => dt(e, c, r, a, n, s, i));
    return Yp(l).map((c) => ({
      ...t,
      allOf: c
    }));
  }
  return [t];
}
function Zp(e, t, r, n, s, a, i) {
  const o = bn(t, r, s);
  return o !== t ? dt(e, o, r, a, n, s, i) : [t];
}
function bn(e, t, r) {
  if (!ce(e))
    return e;
  let n = e;
  if (Te in n) {
    const { $ref: s, ...a } = n;
    if (r.includes(s))
      return n;
    r.push(s), n = { ...$f(s, t), ...a };
  }
  if (Oe in n) {
    const s = [], a = D$(n[Oe], (i, o, l) => {
      const u = [...r];
      i[l] = bn(o, t, u), s.push(u);
    }, {});
    W$(r, X$(z$(s))), n = { ...n, [Oe]: a };
  }
  return Wt in n && !Array.isArray(n.items) && typeof n.items != "boolean" && (n = {
    ...n,
    items: bn(n.items, t, r)
  }), Se(e, n) ? e : n;
}
function oD(e, t, r, n, s) {
  const a = {
    ...t,
    properties: { ...t.properties }
  }, i = n && ce(n) ? n : {};
  return Object.keys(i).forEach((o) => {
    if (o in a.properties)
      return;
    let l = {};
    typeof a.additionalProperties != "boolean" ? Te in a.additionalProperties ? l = Ge(e, { $ref: Z(a.additionalProperties, [Te]) }, r, i, s) : "type" in a.additionalProperties ? l = { ...a.additionalProperties } : it in a.additionalProperties || Ke in a.additionalProperties ? l = {
      type: "object",
      ...a.additionalProperties
    } : l = { type: vn(Z(i, [o])) } : l = { type: vn(Z(i, [o])) }, a.properties[o] = l, De(a.properties, [o, Pn], !0);
  }), a;
}
function dt(e, t, r, n, s = !1, a = [], i) {
  return ce(t) ? iD(e, t, r, s, a, n, i).flatMap((l) => {
    var u;
    let c = l;
    if (wg in c)
      return aD(e, c, r, s, a, n, i);
    if (Cr in c) {
      if (s) {
        const { allOf: m, ...h } = c;
        return [...m, h];
      }
      try {
        const m = [], h = [];
        (u = c.allOf) === null || u === void 0 || u.forEach((g) => {
          typeof g == "object" && g.contains ? m.push(g) : h.push(g);
        }), m.length && (c = { ...c, allOf: h }), c = i ? i(c) : nD(c, {
          deep: !1
        }), m.length && (c.allOf = m);
      } catch (m) {
        console.warn(`could not merge subschemas in allOf:
`, m);
        const { allOf: h, ...g } = c;
        return g;
      }
    }
    return ci in c && c.additionalProperties !== !1 ? oD(e, c, r, n, i) : c;
  }) : [{}];
}
function lD(e, t, r, n, s) {
  let a;
  const { oneOf: i, anyOf: o, ...l } = t;
  if (Array.isArray(i) ? a = i : Array.isArray(o) && (a = o), a) {
    const u = s === void 0 && n ? {} : s, c = Er(t);
    a = a.map((m) => bn(m, r, []));
    const f = io(e, u, a, r, c);
    if (n)
      return a.map((m) => At(l, m));
    t = At(l, a[f]);
  }
  return [t];
}
function Xp(e, t, r, n, s, a, i) {
  const { dependencies: o, ...l } = t;
  return lD(e, l, r, n, a).flatMap((c) => Qp(e, o, c, r, n, s, a, i));
}
function Qp(e, t, r, n, s, a, i, o) {
  let l = [r];
  for (const u in t) {
    if (!s && Z(i, [u]) === void 0 || r.properties && !(u in r.properties))
      continue;
    const [c, f] = so(u, t);
    return Array.isArray(f) ? l[0] = cD(r, f) : ce(f) && (l = uD(e, r, n, u, f, s, a, i, o)), l.flatMap((m) => Qp(e, c, m, n, s, a, i, o));
  }
  return l;
}
function cD(e, t) {
  if (!t)
    return e;
  const r = Array.isArray(e.required) ? Array.from(/* @__PURE__ */ new Set([...e.required, ...t])) : t;
  return { ...e, required: r };
}
function uD(e, t, r, n, s, a, i, o, l) {
  return dt(e, s, r, o, a, i, l).flatMap((c) => {
    const { oneOf: f, ...m } = c;
    if (t = At(t, m), f === void 0)
      return t;
    const h = f.map((b) => typeof b == "boolean" || !(Te in b) ? [b] : Zp(e, b, r, a, i, o));
    return Yp(h).flatMap((b) => dD(e, t, r, n, b, a, i, o, l));
  });
}
function dD(e, t, r, n, s, a, i, o, l) {
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
    const f = c, [m] = so(n, f.properties), h = { ...f, properties: m };
    return dt(e, h, r, o, a, i, l).map((b) => At(t, b));
  });
}
const fD = {
  type: "object",
  $id: _g,
  properties: {
    __not_really_there__: {
      type: "number"
    }
  }
};
function Si(e, t, r, n, s) {
  let a = 0;
  return r && (we(r.properties) ? a += w$(r.properties, (i, o, l) => {
    const u = Z(n, l);
    if (typeof o == "boolean")
      return i;
    if (Ve(o, Te)) {
      const c = Ge(e, o, t, u, s);
      return i + Si(e, t, c, u || {}, s);
    }
    if ((Ve(o, Ke) || Ve(o, it)) && u) {
      const c = Ve(o, Ke) ? Ke : it, f = Er(o);
      return i + $n(e, t, u, Z(o, c), -1, f, s);
    }
    if (o.type === "object")
      return we(u) && (i += 1), i + Si(e, t, o, u, s);
    if (o.type === vn(u)) {
      let c = i + 1;
      return o.default ? c += u === o.default ? 1 : -1 : o.const && (c += u === o.const ? 1 : -1), c;
    }
    return i;
  }, 0) : Xs(r.type) && r.type === vn(n) && (a += 1)), a;
}
function $n(e, t, r, n, s = -1, a, i) {
  const o = n.map((m) => bn(m, t, [])), l = Cf(r, n, a);
  if (_f(l))
    return l;
  const u = o.reduce((m, h, g) => (io(e, r, [fD, h], t, a) === 1 && m.push(g), m), []);
  if (u.length === 1)
    return u[0];
  u.length || Pf(o.length, (m) => u.push(m));
  const c = /* @__PURE__ */ new Set(), { bestIndex: f } = u.reduce((m, h) => {
    const { bestScore: g } = m, b = o[h], y = Si(e, t, b, r, i);
    return c.add(y), y > g ? { bestIndex: h, bestScore: y } : m;
  }, { bestIndex: s, bestScore: 0 });
  return c.size === 1 && s >= 0 ? s : f;
}
function ji(e) {
  return Array.isArray(e.items) && e.items.length > 0 && e.items.every((t) => ce(t));
}
function un(e) {
  return e == null;
}
function wn(e, t, r = !1, n = !1, s = !1) {
  if (Array.isArray(t)) {
    const a = Array.isArray(e) ? e : [], i = s ? a : t, o = s ? t : a, l = i.map((u, c) => o[c] !== void 0 ? wn(a[c], t[c], r, n, s) : u);
    return (r || s) && l.length < o.length && l.push(...o.slice(l.length)), l;
  }
  if (ce(t)) {
    const a = Object.assign({}, e);
    return Object.keys(t).reduce((i, o) => {
      const l = Z(t, o), u = ce(e) && o in e, c = o in t;
      return i[o] = wn(
        e ? Z(e, o) : {},
        l,
        r,
        n,
        // overrideFormDataWithDefaults can be true only when the key value exists in defaults
        // Or if the key value doesn't exist in formData
        s && (u || !c)
      ), i;
    }, a);
  }
  return n && (!un(e) && un(t) || typeof t == "number" && isNaN(t)) || s && !un(t) ? e : t;
}
function St(e, t, r = !1) {
  return Object.keys(t).reduce((n, s) => {
    const a = e ? e[s] : {}, i = t[s];
    if (e && s in e && ce(i))
      n[s] = St(a, i, r);
    else if (r && Array.isArray(a) && Array.isArray(i)) {
      let o = i;
      r === "preventDuplicates" && (o = i.reduce((l, u) => (a.includes(u) || l.push(u), l), [])), n[s] = a.concat(o);
    } else
      n[s] = i;
    return n;
  }, Object.assign({}, e));
}
function eh(e) {
  return Array.isArray(e.enum) && e.enum.length === 1 || Ot in e;
}
function zo(e, t, r = {}, n) {
  const s = Ge(e, t, r, void 0, n), a = s.oneOf || s.anyOf;
  return Array.isArray(s.enum) ? !0 : Array.isArray(a) ? a.every((i) => typeof i != "boolean" && eh(i)) : !1;
}
function qo(e, t, r, n) {
  return !t.uniqueItems || !t.items || typeof t.items == "boolean" ? !1 : zo(e, t.items, r, n);
}
function th(e) {
  const t = e[Ot], r = Nt(e);
  return ce(t) && Xs(t == null ? void 0 : t.$data) && r !== "object" && r !== "array";
}
function pD(e) {
  if ($g in e && Array.isArray(e.enum) && e.enum.length === 1)
    return e.enum[0];
  if (Ot in e)
    return e.const;
  throw new Error("schema cannot be inferred as a constant");
}
function _n(e, t) {
  const r = e;
  if (e.enum) {
    let a;
    if (t) {
      const { enumNames: i } = le(t);
      a = i;
    }
    return !a && r.enumNames && (a = r.enumNames), e.enum.map((i, o) => ({ label: (a == null ? void 0 : a[o]) || String(i), value: i }));
  }
  let n, s;
  return e.anyOf ? (n = e.anyOf, s = t == null ? void 0 : t.anyOf) : e.oneOf && (n = e.oneOf, s = t == null ? void 0 : t.oneOf), n && n.map((a, i) => {
    const { title: o } = le(s == null ? void 0 : s[i]), l = a, u = pD(l), c = o || l.title || String(u);
    return {
      schema: l,
      label: c,
      value: u
    };
  });
}
const hD = ["string", "number", "integer", "boolean", "null"];
var Or;
(function(e) {
  e[e.Ignore = 0] = "Ignore", e[e.Invert = 1] = "Invert", e[e.Fallback = 2] = "Fallback";
})(Or || (Or = {}));
function Ga(e, t = Or.Ignore, r = -1) {
  if (r >= 0) {
    if (Array.isArray(e.items) && r < e.items.length) {
      const n = e.items[r];
      if (typeof n != "boolean")
        return n;
    }
  } else if (e.items && !Array.isArray(e.items) && typeof e.items != "boolean")
    return e.items;
  return t !== Or.Ignore && ce(e.additionalItems) ? e.additionalItems : {};
}
function Mu(e, t, r, n, s, a = [], i = {}, o = !1) {
  const { emptyObjectFields: l = "populateAllDefaults" } = i;
  if (n || o)
    e[t] = r;
  else if (l !== "skipDefaults") {
    const u = s === void 0 ? a.includes(t) : s;
    ce(r) ? l === "skipEmptyDefaults" ? xr(r) || (e[t] = r) : (!xr(r) || a.includes(t)) && (u || l !== "populateRequiredDefaults") && (e[t] = r) : (
      // Store computedDefault if it's a defined primitive (e.g., true) and satisfies certain conditions
      // Condition 1: computedDefault is not undefined
      // Condition 2: If emptyObjectFields is 'populateAllDefaults' or 'skipEmptyDefaults)
      // Or if isSelfOrParentRequired is 'true' and the key is a required field
      r !== void 0 && (l === "populateAllDefaults" || l === "skipEmptyDefaults" || u && a.includes(t)) && (e[t] = r)
    );
  }
}
function Vt(e, t, r = {}) {
  const { parentDefaults: n, rawFormData: s, rootSchema: a = {}, includeUndefinedValues: i = !1, _recurseList: o = [], experimental_defaultFormStateBehavior: l = void 0, experimental_customMergeAllOf: u = void 0, required: c, shouldMergeDefaultsIntoFormData: f = !1 } = r;
  let m = ce(s) ? s : {};
  const h = ce(t) ? t : {};
  let g = n, b = null, y = l, p = o;
  if (h[Ot] !== void 0 && (l == null ? void 0 : l.constAsDefaults) !== "never" && !th(h))
    g = h[Ot];
  else if (ce(g) && ce(h.default))
    g = St(g, h.default);
  else if (bg in h && !h[it] && !h[Ke])
    g = h.default;
  else if (Te in h) {
    const _ = h[Te];
    o.includes(_) || (p = o.concat(_), b = $f(_, a)), b && !g && (g = h.default), f && b && !ce(s) && (m = s);
  } else if (Us in h) {
    const _ = {
      ...Lu(e, h, r, g),
      ...m
    };
    b = Xp(e, h, a, !1, [], _, u)[0];
  } else if (ji(h))
    g = h.items.map((_, x) => Vt(e, _, {
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
  else if (Ke in h) {
    const { oneOf: _, ...x } = h;
    if (_.length === 0)
      return;
    const E = Er(h), { type: A = "null" } = x;
    !Array.isArray(A) && hD.includes(A) && (y == null ? void 0 : y.constAsDefaults) === "skipOneOf" && (y = {
      ...y,
      constAsDefaults: "never"
    }), b = _[$n(e, a, s ?? h.default, _, 0, E, u)], b = At(x, b);
  } else if (it in h) {
    const { anyOf: _, ...x } = h;
    if (_.length === 0)
      return;
    const E = Er(h);
    b = _[$n(e, a, s ?? h.default, _, 0, E, u)], b = At(x, b);
  }
  if (b)
    return Vt(e, b, {
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
  const v = Lu(e, h, r, g);
  let $ = v ?? g;
  if (f) {
    const { arrayMinItems: _ = {} } = l || {}, { mergeExtraDefaults: x } = _, E = mD(e, h, a, s, l, u);
    (!ce(s) || Cr in h) && ($ = wn($, E, x, !0));
  }
  return $;
}
function mD(e, t, r, n, s, a) {
  const i = !eh(t) && zo(e, t, r, a);
  let o = n;
  if (i) {
    const u = _n(t);
    o = (u == null ? void 0 : u.some((f) => Se(f.value, n))) ? n : void 0;
  }
  return t[Ot] && (s == null ? void 0 : s.constAsDefaults) === "always" && (o = t.const), o;
}
function gD(e, t, { rawFormData: r, rootSchema: n = {}, includeUndefinedValues: s = !1, _recurseList: a = [], experimental_defaultFormStateBehavior: i = void 0, experimental_customMergeAllOf: o = void 0, required: l, shouldMergeDefaultsIntoFormData: u } = {}, c) {
  {
    const f = ce(r) ? r : {}, m = t, h = (i == null ? void 0 : i.allOf) === "populateDefaults" && Cr in m ? Ge(e, m, n, f, o) : m, g = h[Ot], b = Object.keys(h.properties || {}).reduce((y, p) => {
      var v;
      const $ = Z(h, [Oe, p]), _ = ce(g) && g[p] !== void 0, x = (ce($) && Ot in $ || _) && (i == null ? void 0 : i.constAsDefaults) !== "never" && !th($), E = Vt(e, $, {
        rootSchema: n,
        _recurseList: a,
        experimental_defaultFormStateBehavior: i,
        experimental_customMergeAllOf: o,
        includeUndefinedValues: s === !0,
        parentDefaults: Z(c, [p]),
        rawFormData: Z(f, [p]),
        required: (v = h.required) === null || v === void 0 ? void 0 : v.includes(p),
        shouldMergeDefaultsIntoFormData: u
      });
      return Mu(y, p, E, s, l, h.required, i, x), y;
    }, {});
    if (h.additionalProperties) {
      const y = ce(h.additionalProperties) ? h.additionalProperties : {}, p = /* @__PURE__ */ new Set();
      ce(c) && Object.keys(c).filter(($) => !h.properties || !h.properties[$]).forEach(($) => p.add($));
      const v = [];
      Object.keys(f).filter(($) => !h.properties || !h.properties[$]).forEach(($) => {
        p.add($), v.push($);
      }), p.forEach(($) => {
        var _;
        const x = Vt(e, y, {
          rootSchema: n,
          _recurseList: a,
          experimental_defaultFormStateBehavior: i,
          experimental_customMergeAllOf: o,
          includeUndefinedValues: s === !0,
          parentDefaults: Z(c, [$]),
          rawFormData: Z(f, [$]),
          required: (_ = h.required) === null || _ === void 0 ? void 0 : _.includes($),
          shouldMergeDefaultsIntoFormData: u
        });
        Mu(b, $, x, s, l, v);
      });
    }
    return b;
  }
}
function yD(e, t, { rawFormData: r, rootSchema: n = {}, _recurseList: s = [], experimental_defaultFormStateBehavior: a = void 0, experimental_customMergeAllOf: i = void 0, required: o, shouldMergeDefaultsIntoFormData: l } = {}, u) {
  var c, f;
  const m = t, h = (c = a == null ? void 0 : a.arrayMinItems) !== null && c !== void 0 ? c : {}, { populate: g, mergeExtraDefaults: b } = h, y = g === "never", p = g === "requiredOnly", v = g === "all" || !y && !p, $ = (f = h == null ? void 0 : h.computeSkipPopulate) !== null && f !== void 0 ? f : () => !1, x = (a == null ? void 0 : a.emptyObjectFields) === "skipEmptyDefaults" ? void 0 : [];
  if (Array.isArray(u) && (u = u.map((K, q) => {
    const T = Ga(m, Or.Fallback, q);
    return Vt(e, T, {
      rootSchema: n,
      _recurseList: s,
      experimental_defaultFormStateBehavior: a,
      experimental_customMergeAllOf: i,
      parentDefaults: K,
      required: o,
      shouldMergeDefaultsIntoFormData: l
    });
  })), Array.isArray(r)) {
    const K = Ga(m);
    if (y)
      u = r;
    else {
      const q = r.map((F, k) => Vt(e, K, {
        rootSchema: n,
        _recurseList: s,
        experimental_defaultFormStateBehavior: a,
        experimental_customMergeAllOf: i,
        rawFormData: F,
        parentDefaults: Z(u, [k]),
        required: o,
        shouldMergeDefaultsIntoFormData: l
      }));
      u = wn(u, q, (p && o || v) && b);
    }
  }
  if ((ce(m) && Ot in m && (a == null ? void 0 : a.constAsDefaults) !== "never") === !1) {
    if (y)
      return u ?? x;
    if (p && !o)
      return u || void 0;
  }
  const A = Array.isArray(u) ? u.length : 0;
  if (!m.minItems || qo(e, m, n, i) || $(e, m, n) || m.minItems <= A)
    return u || x;
  const U = u || [], C = Ga(m, Or.Invert), L = C.default, W = new Array(m.minItems - A).fill(Vt(e, C, {
    parentDefaults: L,
    rootSchema: n,
    _recurseList: s,
    experimental_defaultFormStateBehavior: a,
    experimental_customMergeAllOf: i,
    required: o,
    shouldMergeDefaultsIntoFormData: l
  }));
  return U.concat(W);
}
function Lu(e, t, r = {}, n) {
  switch (Nt(t)) {
    case "object":
      return gD(e, t, r, n);
    case "array":
      return yD(e, t, r, n);
  }
}
function rh(e, t, r, n, s = !1, a, i) {
  if (!ce(t))
    throw new Error("Invalid schema: " + t);
  const o = Ge(e, t, n, r, i), l = Vt(e, o, {
    rootSchema: n,
    includeUndefinedValues: s,
    experimental_defaultFormStateBehavior: a,
    experimental_customMergeAllOf: i,
    rawFormData: r,
    shouldMergeDefaultsIntoFormData: !0
  });
  if (ce(r) || Array.isArray(r)) {
    const { mergeDefaultsIntoFormData: u } = a || {};
    return wn(
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
function nh(e = {}) {
  return (
    // TODO: Remove the `&& uiSchema['ui:widget'] !== 'hidden'` once we support hidden widgets for arrays.
    // https://rjsf-team.github.io/react-jsonschema-form/docs/usage/widgets/#hidden-widgets
    "widget" in le(e) && le(e).widget !== "hidden"
  );
}
function sh(e, t, r = {}, n, s) {
  if (r[Wi] === "files")
    return !0;
  if (t.items) {
    const a = Ge(e, t.items, n, void 0, s);
    return a.type === "string" && a.format === "data-url";
  }
  return !1;
}
function vD(e, t, r = {}, n, s, a) {
  const i = le(r, s), { label: o = !0 } = i;
  let l = !!o;
  const u = Nt(t);
  return u === "array" && (l = qo(e, t, n, a) || sh(e, t, r, n, a) || nh(r)), u === "object" && (l = !1), u === "boolean" && !r[Wi] && (l = !1), r[Sg] && (l = !1), l;
}
function bD(e, t, r) {
  if (!r)
    return t;
  const { errors: n, errorSchema: s } = t;
  let a = e.toErrorList(r), i = r;
  return xr(s) || (i = St(s, r, !0), a = [...n].concat(a)), { errorSchema: i, errors: a };
}
const fr = Symbol("no Value");
function Ei(e, t, r, n, s = {}, a) {
  let i;
  if (Ve(r, Oe)) {
    const o = {};
    if (Ve(n, Oe)) {
      const c = Z(n, Oe, {});
      Object.keys(c).forEach((f) => {
        Ve(s, f) && (o[f] = void 0);
      });
    }
    const l = Object.keys(Z(r, Oe, {})), u = {};
    l.forEach((c) => {
      const f = Z(s, c);
      let m = Z(n, [Oe, c], {}), h = Z(r, [Oe, c], {});
      Ve(m, Te) && (m = Ge(e, m, t, f, a)), Ve(h, Te) && (h = Ge(e, h, t, f, a));
      const g = Z(m, "type"), b = Z(h, "type");
      if (!g || g === b)
        if (Ve(o, c) && delete o[c], b === "object" || b === "array" && Array.isArray(f)) {
          const y = Ei(e, t, h, m, f, a);
          (y !== void 0 || b === "array") && (u[c] = y);
        } else {
          const y = Z(h, "default", fr), p = Z(m, "default", fr);
          y !== fr && y !== f && (p === f ? o[c] = y : Z(h, "readOnly") === !0 && (o[c] = void 0));
          const v = Z(h, "const", fr), $ = Z(m, "const", fr);
          v !== fr && v !== f && (o[c] = $ === f ? v : void 0);
        }
    }), i = {
      ...typeof s == "string" || Array.isArray(s) ? void 0 : s,
      ...o,
      ...u
    };
  } else if (Z(n, "type") === "array" && Z(r, "type") === "array" && Array.isArray(s)) {
    let o = Z(n, "items"), l = Z(r, "items");
    if (typeof o == "object" && typeof l == "object" && !Array.isArray(o) && !Array.isArray(l)) {
      Ve(o, Te) && (o = Ge(e, o, t, s, a)), Ve(l, Te) && (l = Ge(e, l, t, s, a));
      const u = Z(o, "type"), c = Z(l, "type");
      if (!u || u === c) {
        const f = Z(r, "maxItems", -1);
        c === "object" ? i = s.reduce((m, h) => {
          const g = Ei(e, t, l, o, h, a);
          return g !== void 0 && (f < 0 || m.length < f) && m.push(g), m;
        }, []) : i = f > 0 && s.length > f ? s.slice(0, f) : s;
      }
    } else typeof o == "boolean" && typeof l == "boolean" && o === l && (i = s);
  }
  return i;
}
function ds(e, t, r, n, s, a, i, o = [], l) {
  if (Te in t || Us in t || Cr in t) {
    const f = Ge(e, t, a, i, l);
    if (o.findIndex((h) => Se(h, f)) === -1)
      return ds(e, f, r, n, s, a, i, o.concat(f), l);
  }
  if (Wt in t && !Z(t, [Wt, Te]))
    return ds(e, Z(t, Wt), r, n, s, a, i, o, l);
  const c = { $id: s || r };
  if (Nt(t) === "object" && Oe in t)
    for (const f in t.properties) {
      const m = Z(t, [Oe, f]), h = c[Mt] + n + f;
      c[f] = ds(
        e,
        ce(m) ? m : {},
        r,
        n,
        h,
        a,
        // It's possible that formData is not an object -- this can happen if an
        // array item has just been added, but not populated with data yet
        Z(i, [f]),
        o,
        l
      );
    }
  return c;
}
function $D(e, t, r, n, s, a = "root", i = "_", o) {
  return ds(e, t, a, i, r, n, s, void 0, o);
}
function Gt(e, t, r, n, s, a = [], i) {
  if (Te in t || Us in t || Cr in t) {
    const l = Ge(e, t, n, s, i);
    if (a.findIndex((c) => Se(c, l)) === -1)
      return Gt(e, l, r, n, s, a.concat(l), i);
  }
  let o = {
    [ls]: r.replace(/^\./, "")
  };
  if (Ke in t || it in t) {
    const l = Ke in t ? t.oneOf : t.anyOf, u = Er(t), c = $n(e, n, s, l, 0, u, i), f = l[c];
    o = {
      ...o,
      ...Gt(e, f, r, n, s, a, i)
    };
  }
  if (ci in t && t[ci] !== !1 && De(o, Ui, !0), Wt in t && Array.isArray(s)) {
    const { items: l, additionalItems: u } = t;
    Array.isArray(l) ? s.forEach((c, f) => {
      l[f] ? o[f] = Gt(e, l[f], `${r}.${f}`, n, c, a, i) : u ? o[f] = Gt(e, u, `${r}.${f}`, n, c, a, i) : console.warn(`Unable to generate path schema for "${r}.${f}". No schema defined for it`);
    }) : s.forEach((c, f) => {
      o[f] = Gt(e, l, `${r}.${f}`, n, c, a, i);
    });
  } else if (Oe in t)
    for (const l in t.properties) {
      const u = Z(t, [Oe, l]);
      o[l] = Gt(
        e,
        u,
        `${r}.${l}`,
        n,
        // It's possible that formData is not an object -- this can happen if an
        // array item has just been added, but not populated with data yet
        Z(s, [l]),
        a,
        i
      );
    }
  return o;
}
function wD(e, t, r = "", n, s, a) {
  return Gt(e, t, r, n, s, void 0, a);
}
class _D {
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
    return !t || !r ? !1 : this.validator !== t || !Se(this.rootSchema, r) || !Se(this.experimental_defaultFormStateBehavior, n) || this.experimental_customMergeAllOf !== s;
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
    return rh(this.validator, t, r, this.rootSchema, n, this.experimental_defaultFormStateBehavior, this.experimental_customMergeAllOf);
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
    return vD(this.validator, t, r, this.rootSchema, n, this.experimental_customMergeAllOf);
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
    return $n(this.validator, this.rootSchema, t, r, n, s, this.experimental_customMergeAllOf);
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
    return io(this.validator, t, r, this.rootSchema, n);
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
    return Tf(this.validator, t, r, this.rootSchema, n);
  }
  /** Checks to see if the `schema` and `uiSchema` combination represents an array of files
   *
   * @param schema - The schema for which check for array of files flag is desired
   * @param [uiSchema] - The UI schema from which to check the widget
   * @returns - True if schema/uiSchema contains an array of files, otherwise false
   */
  isFilesArray(t, r) {
    return sh(this.validator, t, r, this.rootSchema, this.experimental_customMergeAllOf);
  }
  /** Checks to see if the `schema` combination represents a multi-select
   *
   * @param schema - The schema for which check for a multi-select flag is desired
   * @returns - True if schema contains a multi-select, otherwise false
   */
  isMultiSelect(t) {
    return qo(this.validator, t, this.rootSchema, this.experimental_customMergeAllOf);
  }
  /** Checks to see if the `schema` combination represents a select
   *
   * @param schema - The schema for which check for a select flag is desired
   * @returns - True if schema contains a select, otherwise false
   */
  isSelect(t) {
    return zo(this.validator, t, this.rootSchema, this.experimental_customMergeAllOf);
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
    return bD(this.validator, t, r);
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
    return Ge(this.validator, t, this.rootSchema, r, this.experimental_customMergeAllOf);
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
    return Ei(this.validator, this.rootSchema, t, r, n, this.experimental_customMergeAllOf);
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
    return $D(this.validator, t, r, this.rootSchema, n, s, a, this.experimental_customMergeAllOf);
  }
  /** Generates an `PathSchema` object for the `schema`, recursively
   *
   * @param schema - The schema for which the display label flag is desired
   * @param [name] - The base name for the schema
   * @param [formData] - The current formData, if any, onto which to provide any missing defaults
   * @returns - The `PathSchema` object for the `schema`
   */
  toPathSchema(t, r, n) {
    return wD(this.validator, t, r, this.rootSchema, n, this.experimental_customMergeAllOf);
  }
}
function xD(e, t, r = {}, n) {
  return new _D(e, t, r, n);
}
function SD(e) {
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
function Rt(e, t) {
  let r = String(e);
  for (; r.length < t; )
    r = "0" + r;
  return r;
}
function ah(e, t) {
  if (e <= 0 && t <= 0)
    e = (/* @__PURE__ */ new Date()).getFullYear() + e, t = (/* @__PURE__ */ new Date()).getFullYear() + t;
  else if (e < 0 || t < 0)
    throw new Error(`Both start (${e}) and stop (${t}) must both be <= 0 or > 0, got one of each`);
  if (e > t)
    return ah(t, e).reverse();
  const r = [];
  for (let n = e; n <= t; n++)
    r.push({ value: n, label: Rt(n, 2) });
  return r;
}
function jD(e, t) {
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
function ED(e, t) {
  return jD(e, t);
}
function pt(e, t = [], r) {
  if (Array.isArray(e))
    return e.map((a) => pt(a, t)).filter((a) => a !== r);
  const n = e === "" || e === null ? -1 : Number(e), s = t[n];
  return s ? s.value : r;
}
function OD(e, t, r = []) {
  const n = pt(e, r);
  return Array.isArray(t) ? t.filter((s) => !Se(s, n)) : Se(n, t) ? void 0 : t;
}
function Bo(e, t) {
  return Array.isArray(t) ? t.some((r) => Se(r, e)) : Se(t, e);
}
function ND(e, t = [], r = !1) {
  const n = t.map((s, a) => Bo(s.value, e) ? String(a) : void 0).filter((s) => typeof s < "u");
  return r ? n : n[0];
}
function AD(e, t, r = []) {
  const n = pt(e, r);
  if (!un(n)) {
    const s = r.findIndex((o) => n === o.value), a = r.map(({ value: o }) => o);
    return t.slice(0, s).concat(n, t.slice(s)).sort((o, l) => +(a.indexOf(o) > a.indexOf(l)));
  }
  return t;
}
var PD = 1, CD = 4;
function ih(e) {
  return cn(e, PD | CD);
}
function TD(e, t, r, n) {
  return n = typeof n == "function" ? n : void 0, e == null ? e : oo(e, t, r, n);
}
class ID {
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
    let n = Array.isArray(t) && t.length > 0 || typeof t == "string" ? Z(this.errorSchema, t) : this.errorSchema;
    return !n && t && (n = {}, TD(this.errorSchema, t, n, Object)), n;
  }
  /** Resets all errors in the `ErrorSchemaBuilder` back to the `initialSchema` if provided, otherwise an empty set.
   *
   * @param [initialSchema] - The optional set of initial errors, that will be cloned into the class
   * @returns - The `ErrorSchemaBuilder` object for chaining purposes
   */
  resetAllErrors(t) {
    return this.errorSchema = t ? ih(t) : {}, this;
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
    let s = Z(n, Be);
    return Array.isArray(s) || (s = [], n[Be] = s), Array.isArray(t) ? De(n, Be, [.../* @__PURE__ */ new Set([...s, ...t])]) : De(n, Be, [.../* @__PURE__ */ new Set([...s, t])]), this;
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
    return De(n, Be, s), this;
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
    return De(r, Be, []), this;
  }
}
function FD(e, t, r = [1900, (/* @__PURE__ */ new Date()).getFullYear() + 2], n = "YMD") {
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
function kD(e) {
  const t = {};
  return e.multipleOf && (t.step = e.multipleOf), (e.minimum || e.minimum === 0) && (t.min = e.minimum), (e.maximum || e.maximum === 0) && (t.max = e.maximum), t;
}
function DD(e, t, r = {}, n = !0) {
  const s = {
    type: t || "text",
    ...kD(e)
  };
  return r.inputType ? s.type = r.inputType : t || (e.type === "number" ? (s.type = "number", n && s.step === void 0 && (s.step = "any")) : e.type === "integer" && (s.type = "number", s.step === void 0 && (s.step = 1))), r.autocomplete && (s.autoComplete = r.autocomplete), r.accept && (s.accept = r.accept), s;
}
const Uu = {
  props: {
    disabled: !1
  },
  submitText: "Submit",
  norender: !1
};
function RD(e = {}) {
  const t = le(e);
  if (t && t[ws]) {
    const r = t[ws];
    return { ...Uu, ...r };
  }
  return Uu;
}
function pe(e, t, r = {}) {
  const { templates: n } = t;
  return e === "ButtonTemplates" ? n[e] : (
    // Evaluating uiOptions[name] results in TS2590: Expression produces a union type that is too complex to represent
    // To avoid that, we cast uiOptions to `any` before accessing the name field
    r[e] || n[e]
  );
}
var oh = { exports: {} }, he = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ko = Symbol.for("react.element"), Go = Symbol.for("react.portal"), pa = Symbol.for("react.fragment"), ha = Symbol.for("react.strict_mode"), ma = Symbol.for("react.profiler"), ga = Symbol.for("react.provider"), ya = Symbol.for("react.context"), MD = Symbol.for("react.server_context"), va = Symbol.for("react.forward_ref"), ba = Symbol.for("react.suspense"), $a = Symbol.for("react.suspense_list"), wa = Symbol.for("react.memo"), _a = Symbol.for("react.lazy"), LD = Symbol.for("react.offscreen"), lh;
lh = Symbol.for("react.module.reference");
function et(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case Ko:
        switch (e = e.type, e) {
          case pa:
          case ma:
          case ha:
          case ba:
          case $a:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case MD:
              case ya:
              case va:
              case _a:
              case wa:
              case ga:
                return e;
              default:
                return t;
            }
        }
      case Go:
        return t;
    }
  }
}
he.ContextConsumer = ya;
he.ContextProvider = ga;
he.Element = Ko;
he.ForwardRef = va;
he.Fragment = pa;
he.Lazy = _a;
he.Memo = wa;
he.Portal = Go;
he.Profiler = ma;
he.StrictMode = ha;
he.Suspense = ba;
he.SuspenseList = $a;
he.isAsyncMode = function() {
  return !1;
};
he.isConcurrentMode = function() {
  return !1;
};
he.isContextConsumer = function(e) {
  return et(e) === ya;
};
he.isContextProvider = function(e) {
  return et(e) === ga;
};
he.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Ko;
};
he.isForwardRef = function(e) {
  return et(e) === va;
};
he.isFragment = function(e) {
  return et(e) === pa;
};
he.isLazy = function(e) {
  return et(e) === _a;
};
he.isMemo = function(e) {
  return et(e) === wa;
};
he.isPortal = function(e) {
  return et(e) === Go;
};
he.isProfiler = function(e) {
  return et(e) === ma;
};
he.isStrictMode = function(e) {
  return et(e) === ha;
};
he.isSuspense = function(e) {
  return et(e) === ba;
};
he.isSuspenseList = function(e) {
  return et(e) === $a;
};
he.isValidElementType = function(e) {
  return typeof e == "string" || typeof e == "function" || e === pa || e === ma || e === ha || e === ba || e === $a || e === LD || typeof e == "object" && e !== null && (e.$$typeof === _a || e.$$typeof === wa || e.$$typeof === ga || e.$$typeof === ya || e.$$typeof === va || e.$$typeof === lh || e.getModuleId !== void 0);
};
he.typeOf = et;
oh.exports = he;
var UD = oh.exports;
const Wu = /* @__PURE__ */ On(UD), Ha = {
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
function WD(e) {
  let t = Z(e, "MergedWidget");
  if (!t) {
    const r = e.defaultProps && e.defaultProps.options || {};
    t = ({ options: n, ...s }) => d.jsx(e, { options: { ...r, ...n }, ...s }), De(e, "MergedWidget", t);
  }
  return t;
}
function jt(e, t, r = {}) {
  const n = Nt(e);
  if (typeof t == "function" || t && Wu.isForwardRef(vm(t)) || Wu.isMemo(t))
    return WD(t);
  if (typeof t != "string")
    throw new Error(`Unsupported widget definition: ${typeof t}`);
  if (t in r) {
    const s = r[t];
    return jt(e, s, r);
  }
  if (typeof n == "string") {
    if (!(n in Ha))
      throw new Error(`No widget for type '${n}'`);
    if (t in Ha[n]) {
      const s = r[Ha[n][t]];
      return jt(e, s, r);
    }
  }
  throw new Error(`No widget '${t}' for type '${n}'`);
}
function VD(e) {
  let t = 0;
  for (let r = 0; r < e.length; r += 1) {
    const n = e.charCodeAt(r);
    t = (t << 5) - t + n, t = t & t;
  }
  return t.toString(16);
}
function zD(e) {
  const t = /* @__PURE__ */ new Set();
  return JSON.stringify(e, (r, n) => (t.add(r), n)), VD(JSON.stringify(e, Array.from(t).sort()));
}
function qD(e, t, r = {}) {
  try {
    return jt(e, t, r), !0;
  } catch (n) {
    const s = n;
    if (s.message && (s.message.startsWith("No widget") || s.message.startsWith("Unsupported widget")))
      return !1;
    throw n;
  }
}
function Wn(e, t) {
  return `${Xs(e) ? e : e[Mt]}__${t}`;
}
function Vn(e) {
  return Wn(e, "description");
}
function ch(e) {
  return Wn(e, "error");
}
function Oi(e) {
  return Wn(e, "examples");
}
function uh(e) {
  return Wn(e, "help");
}
function dh(e) {
  return Wn(e, "title");
}
function ur(e, t = !1) {
  const r = t ? ` ${Oi(e)}` : "";
  return `${ch(e)} ${Vn(e)} ${uh(e)}${r}`;
}
function fh(e, t) {
  return `${e}-${t}`;
}
function BD(e, t, r) {
  return t ? r : e;
}
function KD(e) {
  return e ? new Date(e).toJSON() : void 0;
}
function GD(e, t) {
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
function Ja(e, t = !0) {
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
function fs(e) {
  if (e.const || e.enum && e.enum.length === 1 && e.enum[0] === !0)
    return !0;
  if (e.anyOf && e.anyOf.length === 1)
    return fs(e.anyOf[0]);
  if (e.oneOf && e.oneOf.length === 1)
    return fs(e.oneOf[0]);
  if (e.allOf) {
    const t = (r) => fs(r);
    return e.allOf.some(t);
  }
  return !1;
}
function HD(e, t, r) {
  const { props: n, state: s } = e;
  return !Se(n, t) || !Se(s, r);
}
function Vu(e, t = !0) {
  const { year: r, month: n, day: s, hour: a = 0, minute: i = 0, second: o = 0 } = e, l = Date.UTC(r, n - 1, s, a, i, o), u = new Date(l).toJSON();
  return t ? u : u.slice(0, 10);
}
function xn(e, t = []) {
  if (!e)
    return [];
  let r = [];
  return Be in e && (r = r.concat(e[Be].map((n) => {
    const s = `.${t.join(".")}`;
    return {
      property: s,
      message: n,
      stack: `${s} ${n}`
    };
  }))), Object.keys(e).reduce((n, s) => {
    if (s !== Be) {
      const a = e[s];
      Zt(a) && (n = n.concat(xn(a, [...t, s])));
    }
    return n;
  }, r);
}
function ph(e) {
  return Ie(e) ? Hs(e, sr) : In(e) ? [e] : to(ef(Yi(e)));
}
function JD(e) {
  const t = new ID();
  return e.length && e.forEach((r) => {
    const { property: n, message: s } = r, a = n === "." ? [] : ph(n);
    a.length > 0 && a[0] === "" && a.splice(0, 1), s && t.addErrors(s, a);
  }), t.ErrorSchema;
}
function Ho(e) {
  return Object.keys(e).reduce((t, r) => {
    if (r === "addError")
      return t;
    {
      const n = e[r];
      return Zt(n) ? {
        ...t,
        [r]: Ho(n)
      } : { ...t, [r]: n };
    }
  }, {});
}
function YD(e) {
  if (!e)
    return "";
  const t = new Date(e), r = Rt(t.getFullYear(), 4), n = Rt(t.getMonth() + 1, 2), s = Rt(t.getDate(), 2), a = Rt(t.getHours(), 2), i = Rt(t.getMinutes(), 2), o = Rt(t.getSeconds(), 2), l = Rt(t.getMilliseconds(), 3);
  return `${r}-${n}-${s}T${a}:${i}:${o}.${l}`;
}
function ps(e, t) {
  if (!t)
    return e;
  const { errors: r, errorSchema: n } = e;
  let s = xn(t), a = t;
  return xr(n) || (a = St(n, t, !0), s = [...r].concat(s)), { errorSchema: a, errors: s };
}
function ZD(e) {
  for (const t in e) {
    const r = e, n = r[t];
    t === Te && typeof n == "string" && n.startsWith("#") ? r[t] = Ud + n : r[t] = Jo(n);
  }
  return e;
}
function XD(e) {
  for (let t = 0; t < e.length; t++)
    e[t] = Jo(e[t]);
  return e;
}
function Jo(e) {
  return Array.isArray(e) ? XD([...e]) : we(e) ? ZD({ ...e }) : e;
}
function hh(e, t, r) {
  for (var n = -1, s = t.length, a = {}; ++n < s; ) {
    var i = t[n], o = Js(e, i);
    r(o, i) && oo(a, Ir(i, e), o);
  }
  return a;
}
function QD(e, t) {
  if (e == null)
    return {};
  var r = Hs(ro(e), function(n) {
    return [n];
  });
  return t = ao(t), hh(e, r, function(n, s) {
    return t(n, s[0]);
  });
}
var eR = 200;
function tR(e, t, r, n) {
  var s = -1, a = Ff, i = !0, o = e.length, l = [], u = t.length;
  if (!o)
    return l;
  t.length >= eR && (a = Vi, i = !1, t = new $r(t));
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
var rR = lo(function(e, t) {
  return Es(e) ? tR(e, kn(t, 1, Es, !0)) : [];
});
function nR(e, t) {
  const r = Zt(e), n = Zt(t);
  if (e === t || !r && !n)
    return [];
  if (r && !n)
    return ut(e);
  if (!r && n)
    return ut(t);
  {
    const s = ut(QD(e, (i, o) => !Se(i, Z(t, o)))), a = rR(ut(t), ut(e));
    return [...s, ...a];
  }
}
var ye;
(function(e) {
  e.ArrayItemTitle = "Item", e.MissingItems = "Missing items definition", e.YesLabel = "Yes", e.NoLabel = "No", e.CloseLabel = "Close", e.ErrorsLabel = "Errors", e.NewStringDefault = "New Value", e.AddButton = "Add", e.AddItemButton = "Add Item", e.CopyButton = "Copy", e.MoveDownButton = "Move down", e.MoveUpButton = "Move up", e.RemoveButton = "Remove", e.NowLabel = "Now", e.ClearLabel = "Clear", e.AriaDateLabel = "Select a date", e.PreviewLabel = "Preview", e.DecrementAriaLabel = "Decrease value by 1", e.IncrementAriaLabel = "Increase value by 1", e.UnknownFieldType = "Unknown field type %1", e.OptionPrefix = "Option %1", e.TitleOptionPrefix = "%1 option %2", e.KeyLabel = "%1 Key", e.InvalidObjectField = 'Invalid "%1" object field configuration: _%2_.', e.UnsupportedField = "Unsupported field schema.", e.UnsupportedFieldWithId = "Unsupported field schema for field `%1`.", e.UnsupportedFieldWithReason = "Unsupported field schema: _%1_.", e.UnsupportedFieldWithIdAndReason = "Unsupported field schema for field `%1`: _%2_.", e.FilesInfo = "**%1** (%2, %3 bytes)";
})(ye || (ye = {}));
function sR(e, t) {
  var r = Ie(e) ? Xi : jf;
  return r(e, Af(t));
}
function aR(e, t) {
  return hh(e, t, function(r, n) {
    return Nf(e, n);
  });
}
var zu = vf(function(e, t) {
  return e == null ? {} : aR(e, t);
}), iR = 0;
function oR(e) {
  var t = ++iR;
  return Yi(e) + t;
}
function Ni() {
  return oR("rjsf-array-item-");
}
function qu(e) {
  return Array.isArray(e) ? e.map((t) => ({
    key: Ni(),
    item: t
  })) : [];
}
function Xr(e) {
  return Array.isArray(e) ? e.map((t) => t.item) : [];
}
class lR extends En {
  /** Constructs an `ArrayField` from the `props`, generating the initial keyed data from the `formData`
   *
   * @param props - The `FieldProps` for this template
   */
  constructor(r) {
    super(r);
    /** Returns the default form information for an item based on the schema for that item. Deals with the possibility
     * that the schema is fixed and allows additional items.
     */
    me(this, "_getNewFormDataRow", () => {
      const { schema: r, registry: n } = this.props, { schemaUtils: s } = n;
      let a = r.items;
      return ji(r) && vg(r) && (a = r.additionalItems), s.getDefaultFormState(a);
    });
    /** Callback handler for when the user clicks on the add button. Creates a new row of keyed form data at the end of
     * the list, adding it into the state, and then returning `onChange()` with the plain form data converted from the
     * keyed data
     *
     * @param event - The event for the click
     */
    me(this, "onAddClick", (r) => {
      this._handleAddClick(r);
    });
    /** Callback handler for when the user clicks on the add button on an existing array element. Creates a new row of
     * keyed form data inserted at the `index`, adding it into the state, and then returning `onChange()` with the plain
     * form data converted from the keyed data
     *
     * @param index - The index at which the add button is clicked
     */
    me(this, "onAddIndexClick", (r) => (n) => {
      this._handleAddClick(n, r);
    });
    /** Callback handler for when the user clicks on the copy button on an existing array element. Clones the row of
     * keyed form data at the `index` into the next position in the state, and then returning `onChange()` with the plain
     * form data converted from the keyed data
     *
     * @param index - The index at which the copy button is clicked
     */
    me(this, "onCopyIndexClick", (r) => (n) => {
      n && n.preventDefault();
      const { onChange: s, errorSchema: a } = this.props, { keyedFormData: i } = this.state;
      let o;
      if (a) {
        o = {};
        for (const c in a) {
          const f = parseInt(c);
          f <= r ? De(o, [f], a[c]) : f > r && De(o, [f + 1], a[c]);
        }
      }
      const l = {
        key: Ni(),
        item: ih(i[r].item)
      }, u = [...i];
      r !== void 0 ? u.splice(r + 1, 0, l) : u.push(l), this.setState({
        keyedFormData: u,
        updatedKeyedFormData: !0
      }, () => s(Xr(u), o));
    });
    /** Callback handler for when the user clicks on the remove button on an existing array element. Removes the row of
     * keyed form data at the `index` in the state, and then returning `onChange()` with the plain form data converted
     * from the keyed data
     *
     * @param index - The index at which the remove button is clicked
     */
    me(this, "onDropIndexClick", (r) => (n) => {
      n && n.preventDefault();
      const { onChange: s, errorSchema: a } = this.props, { keyedFormData: i } = this.state;
      let o;
      if (a) {
        o = {};
        for (const u in a) {
          const c = parseInt(u);
          c < r ? De(o, [c], a[u]) : c > r && De(o, [c - 1], a[u]);
        }
      }
      const l = i.filter((u, c) => c !== r);
      this.setState({
        keyedFormData: l,
        updatedKeyedFormData: !0
      }, () => s(Xr(l), o));
    });
    /** Callback handler for when the user clicks on one of the move item buttons on an existing array element. Moves the
     * row of keyed form data at the `index` to the `newIndex` in the state, and then returning `onChange()` with the
     * plain form data converted from the keyed data
     *
     * @param index - The index of the item to move
     * @param newIndex - The index to where the item is to be moved
     */
    me(this, "onReorderClick", (r, n) => (s) => {
      s && (s.preventDefault(), s.currentTarget.blur());
      const { onChange: a, errorSchema: i } = this.props;
      let o;
      if (i) {
        o = {};
        for (const f in i) {
          const m = parseInt(f);
          m == r ? De(o, [n], i[r]) : m == n ? De(o, [r], i[n]) : De(o, [f], i[m]);
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
      }, () => a(Xr(c), o));
    });
    /** Callback handler used to deal with changing the value of the data in the array at the `index`. Calls the
     * `onChange` callback with the updated form data
     *
     * @param index - The index of the item being changed
     */
    me(this, "onChangeForIndex", (r) => (n, s, a) => {
      const { formData: i, onChange: o, errorSchema: l } = this.props, c = (Array.isArray(i) ? i : []).map((f, m) => r === m ? typeof n > "u" ? null : n : f);
      o(c, l && l && {
        ...l,
        [r]: s
      }, a);
    });
    /** Callback handler used to change the value for a checkbox */
    me(this, "onSelectChange", (r) => {
      const { onChange: n, idSchema: s } = this.props;
      n(r, void 0, s && s.$id);
    });
    const { formData: n = [] } = r, s = qu(n);
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
      })) : qu(s)
    };
  }
  /** Returns the appropriate title for an item by getting first the title from the schema.items, then falling back to
   * the description from the schema.items, and finally the string "Item"
   */
  get itemTitle() {
    const { schema: r, registry: n } = this.props, { translateString: s } = n;
    return Z(r, [Wt, "title"], Z(r, [Wt, "description"], s(ye.ArrayItemTitle)));
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
    let { addable: i } = le(s, a.globalUiOptions);
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
        n === void 0 || f < n ? De(o, [f], a[c]) : f >= n && De(o, [f + 1], a[c]);
      }
    }
    const l = {
      key: Ni(),
      item: this._getNewFormDataRow()
    }, u = [...i];
    n !== void 0 ? u.splice(n, 0, l) : u.push(l), this.setState({
      keyedFormData: u,
      updatedKeyedFormData: !0
    }, () => s(Xr(u), o));
  }
  /** Renders the `ArrayField` depending on the specific needs of the schema and uischema elements
   */
  render() {
    const { schema: r, uiSchema: n, idSchema: s, registry: a } = this.props, { schemaUtils: i, translateString: o } = a;
    if (!(Wt in r)) {
      const l = le(n), u = pe("UnsupportedFieldTemplate", a, l);
      return d.jsx(u, { schema: r, idSchema: s, reason: o(ye.MissingItems), registry: a });
    }
    return i.isMultiSelect(r) ? this.renderMultiSelect() : nh(n) ? this.renderCustomWidget() : ji(r) ? this.renderFixedArray() : i.isFilesArray(r, n) ? this.renderFiles() : this.renderNormalArray();
  }
  /** Renders a normal array without any limitations of length
   */
  renderNormalArray() {
    const { schema: r, uiSchema: n = {}, errorSchema: s, idSchema: a, name: i, title: o, disabled: l = !1, readonly: u = !1, autofocus: c = !1, required: f = !1, registry: m, onBlur: h, onFocus: g, idPrefix: b, idSeparator: y = "_", rawErrors: p } = this.props, { keyedFormData: v } = this.state, $ = r.title || o || i, { schemaUtils: _, formContext: x } = m, E = le(n), A = we(r.items) ? r.items : {}, U = _.retrieveSchema(A), C = Xr(this.state.keyedFormData), L = this.canAddItem(C), W = {
      canAdd: L,
      items: v.map((q, T) => {
        const { key: F, item: k } = q, z = k, J = _.retrieveSchema(A, z), Q = s ? s[T] : void 0, M = a.$id + y + T, j = _.toIdSchema(J, M, z, b, y);
        return this.renderArrayFieldItem({
          key: F,
          index: T,
          name: i && `${i}-${T}`,
          title: $ ? `${$}-${T + 1}` : void 0,
          canAdd: L,
          canMoveUp: T > 0,
          canMoveDown: T < C.length - 1,
          itemSchema: J,
          itemIdSchema: j,
          itemErrorSchema: Q,
          itemData: z,
          itemUiSchema: n.items,
          autofocus: c && T === 0,
          onBlur: h,
          onFocus: g,
          rawErrors: p,
          totalItems: v.length
        });
      }),
      className: `field field-array field-array-of-${U.type}`,
      disabled: l,
      idSchema: a,
      uiSchema: n,
      onAddClick: this.onAddClick,
      readonly: u,
      required: f,
      schema: r,
      title: $,
      formContext: x,
      formData: C,
      rawErrors: p,
      registry: m
    }, K = pe("ArrayFieldTemplate", m, E);
    return d.jsx(K, { ...W });
  }
  /** Renders an array using the custom widget provided by the user in the `uiSchema`
   */
  renderCustomWidget() {
    const { schema: r, idSchema: n, uiSchema: s, disabled: a = !1, readonly: i = !1, autofocus: o = !1, required: l = !1, hideError: u, placeholder: c, onBlur: f, onFocus: m, formData: h = [], registry: g, rawErrors: b, name: y } = this.props, { widgets: p, formContext: v, globalUiOptions: $, schemaUtils: _ } = g, { widget: x, title: E, ...A } = le(s, $), U = jt(r, x, p), C = E ?? r.title ?? y, L = _.getDisplayLabel(r, s, $);
    return d.jsx(U, { id: n.$id, name: y, multiple: !0, onChange: this.onSelectChange, onBlur: f, onFocus: m, options: A, schema: r, uiSchema: s, registry: g, value: h, disabled: a, readonly: i, hideError: u, required: l, label: C, hideLabel: !L, placeholder: c, formContext: v, autofocus: o, rawErrors: b });
  }
  /** Renders an array as a set of checkboxes
   */
  renderMultiSelect() {
    const { schema: r, idSchema: n, uiSchema: s, formData: a = [], disabled: i = !1, readonly: o = !1, autofocus: l = !1, required: u = !1, placeholder: c, onBlur: f, onFocus: m, registry: h, rawErrors: g, name: b } = this.props, { widgets: y, schemaUtils: p, formContext: v, globalUiOptions: $ } = h, _ = p.retrieveSchema(r.items, a), x = _n(_, s), { widget: E = "select", title: A, ...U } = le(s, $), C = jt(r, E, y), L = A ?? r.title ?? b, W = p.getDisplayLabel(r, s, $);
    return d.jsx(C, { id: n.$id, name: b, multiple: !0, onChange: this.onSelectChange, onBlur: f, onFocus: m, options: { ...U, enumOptions: x }, schema: r, uiSchema: s, registry: h, value: a, disabled: i, readonly: o, required: u, label: L, hideLabel: !W, placeholder: c, formContext: v, autofocus: l, rawErrors: g });
  }
  /** Renders an array of files using the `FileWidget`
   */
  renderFiles() {
    const { schema: r, uiSchema: n, idSchema: s, name: a, disabled: i = !1, readonly: o = !1, autofocus: l = !1, required: u = !1, onBlur: c, onFocus: f, registry: m, formData: h = [], rawErrors: g } = this.props, { widgets: b, formContext: y, globalUiOptions: p, schemaUtils: v } = m, { widget: $ = "files", title: _, ...x } = le(n, p), E = jt(r, $, b), A = _ ?? r.title ?? a, U = v.getDisplayLabel(r, n, p);
    return d.jsx(E, { options: x, id: s.$id, name: a, multiple: !0, onChange: this.onSelectChange, onBlur: c, onFocus: f, schema: r, uiSchema: n, value: h, disabled: i, readonly: o, required: u, registry: m, formContext: y, autofocus: l, rawErrors: g, label: A, hideLabel: !U });
  }
  /** Renders an array that has a maximum limit of items
   */
  renderFixedArray() {
    const { schema: r, uiSchema: n = {}, formData: s = [], errorSchema: a, idPrefix: i, idSeparator: o = "_", idSchema: l, name: u, title: c, disabled: f = !1, readonly: m = !1, autofocus: h = !1, required: g = !1, registry: b, onBlur: y, onFocus: p, rawErrors: v } = this.props, { keyedFormData: $ } = this.state;
    let { formData: _ = [] } = this.props;
    const x = r.title || c || u, E = le(n), { schemaUtils: A, formContext: U } = b, L = (we(r.items) ? r.items : []).map((F, k) => A.retrieveSchema(F, s[k])), W = we(r.additionalItems) ? A.retrieveSchema(r.additionalItems, s) : null;
    (!_ || _.length < L.length) && (_ = _ || [], _ = _.concat(new Array(L.length - _.length)));
    const K = this.canAddItem(_) && !!W, q = {
      canAdd: K,
      className: "field field-array field-array-fixed-items",
      disabled: f,
      idSchema: l,
      formData: s,
      items: $.map((F, k) => {
        const { key: z, item: J } = F, Q = J, M = k >= L.length, j = (M && we(r.additionalItems) ? A.retrieveSchema(r.additionalItems, Q) : L[k]) || {}, D = l.$id + o + k, P = A.toIdSchema(j, D, Q, i, o), w = M ? n.additionalItems || {} : Array.isArray(n.items) ? n.items[k] : n.items || {}, S = a ? a[k] : void 0;
        return this.renderArrayFieldItem({
          key: z,
          index: k,
          name: u && `${u}-${k}`,
          title: x ? `${x}-${k + 1}` : void 0,
          canAdd: K,
          canRemove: M,
          canMoveUp: k >= L.length + 1,
          canMoveDown: M && k < _.length - 1,
          itemSchema: j,
          itemData: Q,
          itemUiSchema: w,
          itemIdSchema: P,
          itemErrorSchema: S,
          autofocus: h && k === 0,
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
      formContext: U,
      errorSchema: a,
      rawErrors: v
    }, T = pe("ArrayFieldTemplate", b, E);
    return d.jsx(T, { ...q });
  }
  /** Renders the individual array item using a `SchemaField` along with the additional properties required to be send
   * back to the `ArrayFieldItemTemplate`.
   *
   * @param props - The props for the individual array item to be rendered
   */
  renderArrayFieldItem(r) {
    const { key: n, index: s, name: a, canAdd: i, canRemove: o = !0, canMoveUp: l, canMoveDown: u, itemSchema: c, itemData: f, itemUiSchema: m, itemIdSchema: h, itemErrorSchema: g, autofocus: b, onBlur: y, onFocus: p, rawErrors: v, totalItems: $, title: _ } = r, { disabled: x, hideError: E, idPrefix: A, idSeparator: U, readonly: C, uiSchema: L, registry: W, formContext: K } = this.props, { fields: { ArraySchemaField: q, SchemaField: T }, globalUiOptions: F } = W, k = q || T, { orderable: z = !0, removable: J = !0, copyable: Q = !1 } = le(L, F), M = {
      moveUp: z && l,
      moveDown: z && u,
      copy: Q && i,
      remove: J && o,
      toolbar: !1
    };
    return M.toolbar = Object.keys(M).some((j) => M[j]), {
      children: d.jsx(k, { name: a, title: _, index: s, schema: c, uiSchema: m, formData: f, formContext: K, errorSchema: g, idPrefix: A, idSeparator: U, idSchema: h, required: this.isItemRequired(c), onChange: this.onChangeForIndex(s), onBlur: y, onFocus: p, registry: W, disabled: x, readonly: C, hideError: E, autofocus: b, rawErrors: v }),
      className: "array-item",
      disabled: x,
      canAdd: i,
      hasCopy: M.copy,
      hasToolbar: M.toolbar,
      hasMoveUp: M.moveUp,
      hasMoveDown: M.moveDown,
      hasRemove: M.remove,
      index: s,
      totalItems: $,
      key: n,
      onAddIndexClick: this.onAddIndexClick,
      onCopyIndexClick: this.onCopyIndexClick,
      onDropIndexClick: this.onDropIndexClick,
      onReorderClick: this.onReorderClick,
      readonly: C,
      registry: W,
      schema: c,
      uiSchema: m
    };
  }
}
function cR(e) {
  const { schema: t, name: r, uiSchema: n, idSchema: s, formData: a, registry: i, required: o, disabled: l, readonly: u, hideError: c, autofocus: f, title: m, onChange: h, onFocus: g, onBlur: b, rawErrors: y } = e, { title: p } = t, { widgets: v, formContext: $, translateString: _, globalUiOptions: x } = i, {
    widget: E = "checkbox",
    title: A,
    // Unlike the other fields, don't use `getDisplayLabel()` since it always returns false for the boolean type
    label: U = !0,
    ...C
  } = le(n, x), L = jt(t, E, v), W = _(ye.YesLabel), K = _(ye.NoLabel);
  let q;
  const T = A ?? p ?? m ?? r;
  if (Array.isArray(t.oneOf))
    q = _n({
      oneOf: t.oneOf.map((F) => {
        if (we(F))
          return {
            ...F,
            title: F.title || (F.const === !0 ? W : K)
          };
      }).filter((F) => F)
      // cast away the error that typescript can't grok is fixed
    }, n);
  else {
    const F = t, k = t.enum ?? [!0, !1];
    !F.enumNames && k.length === 2 && k.every((z) => typeof z == "boolean") ? q = [
      {
        value: k[0],
        label: k[0] ? W : K
      },
      {
        value: k[1],
        label: k[1] ? W : K
      }
    ] : q = _n({
      enum: k,
      // NOTE: enumNames is deprecated, but still supported for now.
      enumNames: F.enumNames
    }, n);
  }
  return d.jsx(L, { options: { ...C, enumOptions: q }, schema: t, uiSchema: n, id: s.$id, name: r, onChange: h, onFocus: g, onBlur: b, label: T, hideLabel: !U, value: a, required: o, disabled: l, readonly: u, hideError: c, registry: i, formContext: $, autofocus: f, rawErrors: y });
}
class Bu extends En {
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
    me(this, "onOptionChange", (r) => {
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
    if (!Se(r.options, a)) {
      const { registry: { schemaUtils: u } } = this.props, c = a.map((f) => u.retrieveSchema(f, s));
      l = { selectedOption: o, retrievedOptions: c };
    }
    if (!Se(s, r.formData) && i.$id === r.idSchema.$id) {
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
    const { schema: a, registry: { schemaUtils: i } } = this.props, o = Er(a);
    return i.getClosestMatchingOption(n, s, r, o);
  }
  getFieldId() {
    const { idSchema: r, schema: n } = this.props;
    return `${r.$id}${n.oneOf ? "__oneof_select" : "__anyof_select"}`;
  }
  /** Renders the `AnyOfField` selector along with a `SchemaField` for the value of the `formData`
   */
  render() {
    const { name: r, disabled: n = !1, errorSchema: s = {}, formContext: a, onBlur: i, onFocus: o, readonly: l, registry: u, schema: c, uiSchema: f } = this.props, { widgets: m, fields: h, translateString: g, globalUiOptions: b, schemaUtils: y } = u, { SchemaField: p } = h, { selectedOption: v, retrievedOptions: $ } = this.state, { widget: _ = "select", placeholder: x, autofocus: E, autocomplete: A, title: U = c.title, ...C } = le(f, b), L = jt({ type: "number" }, _, m), W = Z(s, Be, []), K = js(s, [Be]), q = y.getDisplayLabel(c, f, b), T = v >= 0 && $[v] || null;
    let F;
    if (T) {
      const { required: j } = c;
      F = j ? At({ required: j }, T) : T;
    }
    let k = [];
    Ke in c && f && Ke in f ? Array.isArray(f[Ke]) ? k = f[Ke] : console.warn(`uiSchema.oneOf is not an array for "${U || r}"`) : it in c && f && it in f && (Array.isArray(f[it]) ? k = f[it] : console.warn(`uiSchema.anyOf is not an array for "${U || r}"`));
    let z = f;
    v >= 0 && k.length > v && (z = k[v]);
    const J = U ? ye.TitleOptionPrefix : ye.OptionPrefix, Q = U ? [U] : [], M = $.map((j, D) => {
      const { title: P = j.title } = le(k[D]);
      return {
        label: P || g(J, Q.concat(String(D + 1))),
        value: D
      };
    });
    return d.jsxs("div", { className: "panel panel-default panel-body", children: [d.jsx("div", { className: "form-group", children: d.jsx(L, { id: this.getFieldId(), name: `${r}${c.oneOf ? "__oneof_select" : "__anyof_select"}`, schema: { type: "number", default: 0 }, onChange: this.onOptionChange, onBlur: i, onFocus: o, disabled: n || xr(M), multiple: !1, rawErrors: W, errorSchema: K, value: v >= 0 ? v : void 0, options: { enumOptions: M, ...C }, registry: u, formContext: a, placeholder: x, autocomplete: A, autofocus: E, label: U ?? r, hideLabel: !q, readonly: l }) }), F && F.type !== "null" && d.jsx(p, { ...this.props, schema: F, uiSchema: z })] });
  }
}
const uR = /\.([0-9]*0)*$/, dR = /[0.]0*$/;
function fR(e) {
  const { registry: t, onChange: r, formData: n, value: s } = e, [a, i] = $e(s), { StringField: o } = t.fields;
  let l = n;
  const u = oe((c, f, m) => {
    i(c), `${c}`.charAt(0) === "." && (c = `0${c}`);
    const h = typeof c == "string" && c.match(uR) ? Yl(c.replace(dR, "")) : Yl(c);
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
const pR = ["children", "options"], Ku = ["allowFullScreen", "allowTransparency", "autoComplete", "autoFocus", "autoPlay", "cellPadding", "cellSpacing", "charSet", "classId", "colSpan", "contentEditable", "contextMenu", "crossOrigin", "encType", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "hrefLang", "inputMode", "keyParams", "keyType", "marginHeight", "marginWidth", "maxLength", "mediaGroup", "minLength", "noValidate", "radioGroup", "readOnly", "rowSpan", "spellCheck", "srcDoc", "srcLang", "srcSet", "tabIndex", "useMap"].reduce((e, t) => (e[t.toLowerCase()] = t, e), { class: "className", for: "htmlFor" }), Gu = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: "“" }, hR = ["style", "script", "pre"], mR = ["src", "href", "data", "formAction", "srcDoc", "action"], gR = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi, yR = /\n{2,}$/, Hu = /^(\s*>[\s\S]*?)(?=\n\n|$)/, vR = /^ *> ?/gm, bR = /^(?:\[!([^\]]*)\]\n)?([\s\S]*)/, $R = /^ {2,}\n/, wR = /^(?:([-*_])( *\1){2,}) *(?:\n *)+\n/, Ju = /^(?: {1,3})?(`{3,}|~{3,}) *(\S+)? *([^\n]*?)?\n([\s\S]*?)(?:\1\n?|$)/, Yu = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/, _R = /^(`+)((?:\\`|(?!\1)`|[^`])+)\1/, xR = /^(?:\n *)*\n/, SR = /\r\n?/g, jR = /^\[\^([^\]]+)](:(.*)((\n+ {4,}.*)|(\n(?!\[\^).+))*)/, ER = /^\[\^([^\]]+)]/, OR = /\f/g, NR = /^---[ \t]*\n(.|\n)*\n---[ \t]*\n/, AR = /^\s*?\[(x|\s)\]/, Zu = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, Xu = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, Qu = /^([^\n]+)\n *(=|-)\2{2,} *\n/, Ya = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?((?:[^>]*[^/])?)>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1\b)[\s\S])*?)<\/\1>(?!<\/\1>)\n*/i, PR = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, ed = /^<!--[\s\S]*?(?:-->)/, CR = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/, Za = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i, TR = /^\{.*\}$/, IR = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, FR = /^<([^ >]+[:@\/][^ >]+)>/, kR = /-([a-z])?/gi, td = /^(\|.*)\n(?: *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*))?\n?/, DR = /^[^\n]+(?:  \n|\n{2,})/, RR = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/, MR = /^!\[([^\]]*)\] ?\[([^\]]*)\]/, LR = /^\[([^\]]*)\] ?\[([^\]]*)\]/, UR = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/, WR = /\t/g, VR = /(^ *\||\| *$)/g, zR = /^ *:-+: *$/, qR = /^ *:-+ *$/, BR = /^ *-+: *$/, xa = (e) => `(?=[\\s\\S]+?\\1${e ? "\\1" : ""})`, Sa = "((?:\\[.*?\\][([].*?[)\\]]|<.*?>(?:.*?<.*?>)?|`.*?`|\\\\\\1|[\\s\\S])+?)", KR = RegExp(`^([*_])\\1${xa(1)}${Sa}\\1\\1(?!\\1)`), GR = RegExp(`^([*_])${xa(0)}${Sa}\\1(?!\\1)`), HR = RegExp(`^(==)${xa(0)}${Sa}\\1`), JR = RegExp(`^(~~)${xa(0)}${Sa}\\1`), YR = /^(:[a-zA-Z0-9-_]+:)/, ZR = /^\\([^0-9A-Za-z\s])/, XR = /\\([^0-9A-Za-z\s])/g, QR = /^[\s\S](?:(?!  \n|[0-9]\.|http)[^=*_~\-\n:<`\\\[!])*/, e3 = /^\n+/, t3 = /^([ \t]*)/, r3 = /(?:^|\n)( *)$/, Yo = "(?:\\d+\\.)", Zo = "(?:[*+-])";
function mh(e) {
  return "( *)(" + (e === 1 ? Yo : Zo) + ") +";
}
const gh = mh(1), yh = mh(2);
function vh(e) {
  return RegExp("^" + (e === 1 ? gh : yh));
}
const n3 = vh(1), s3 = vh(2);
function bh(e) {
  return RegExp("^" + (e === 1 ? gh : yh) + "[^\\n]*(?:\\n(?!\\1" + (e === 1 ? Yo : Zo) + " )[^\\n]*)*(\\n|$)", "gm");
}
const a3 = bh(1), i3 = bh(2);
function $h(e) {
  const t = e === 1 ? Yo : Zo;
  return RegExp("^( *)(" + t + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + t + " (?!" + t + " ))\\n*|\\s*\\n*$)");
}
const wh = $h(1), _h = $h(2);
function rd(e, t) {
  const r = t === 1, n = r ? wh : _h, s = r ? a3 : i3, a = r ? n3 : s3;
  return { t: (i) => a.test(i), o: Nr(function(i, o) {
    const l = r3.exec(o.prevCapture);
    return l && (o.list || !o.inline && !o.simple) ? n.exec(i = l[1] + i) : null;
  }), i: 1, u(i, o, l) {
    const u = r ? +i[2] : void 0, c = i[0].replace(yR, `
`).match(s);
    let f = !1;
    return { items: c.map(function(m, h) {
      const g = a.exec(m)[0].length, b = RegExp("^ {1," + g + "}", "gm"), y = m.replace(b, "").replace(a, ""), p = h === c.length - 1, v = y.indexOf(`

`) !== -1 || p && f;
      f = v;
      const $ = l.inline, _ = l.list;
      let x;
      l.list = !0, v ? (l.inline = !1, x = dn(y) + `

`) : (l.inline = !0, x = dn(y));
      const E = o(x, l);
      return l.inline = $, l.list = _, E;
    }), ordered: r, start: u };
  }, l: (i, o, l) => e(i.ordered ? "ol" : "ul", { key: l.key, start: i.type === "20" ? i.start : void 0 }, i.items.map(function(u, c) {
    return e("li", { key: c }, o(u, l));
  })) };
}
const o3 = RegExp(`^\\[((?:\\[[^\\[\\]]*(?:\\[[^\\[\\]]*\\][^\\[\\]]*)*\\]|[^\\[\\]])*)\\]\\(\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*\\)`), l3 = /^!\[(.*?)\]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/;
function nd(e) {
  return typeof e == "string";
}
function dn(e) {
  let t = e.length;
  for (; t > 0 && e[t - 1] <= " "; ) t--;
  return e.slice(0, t);
}
function hs(e, t) {
  return e.startsWith(t);
}
function c3(e, t, r) {
  if (Array.isArray(r)) {
    for (let n = 0; n < r.length; n++) if (hs(e, r[n])) return !0;
    return !1;
  }
  return r(e, t);
}
function Qr(e) {
  return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
function u3(e) {
  return BR.test(e) ? "right" : zR.test(e) ? "center" : qR.test(e) ? "left" : null;
}
function sd(e, t, r, n) {
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
function d3(e, t, r) {
  r.inline = !0;
  const n = e[2] ? e[2].replace(VR, "").split("|").map(u3) : [], s = e[3] ? function(i, o, l) {
    return i.trim().split(`
`).map(function(u) {
      return sd(u, o, l, !0);
    });
  }(e[3], t, r) : [], a = sd(e[1], t, r, !!s.length);
  return r.inline = !1, s.length ? { align: n, cells: s, header: a, type: "25" } : { children: a, type: "21" };
}
function ad(e, t) {
  return e.align[t] == null ? {} : { textAlign: e.align[t] };
}
function Nr(e) {
  return e.inline = 1, e;
}
function zt(e) {
  return Nr(function(t, r) {
    return r.inline ? e.exec(t) : null;
  });
}
function Ft(e) {
  return Nr(function(t, r) {
    return r.inline || r.simple ? e.exec(t) : null;
  });
}
function wt(e) {
  return function(t, r) {
    return r.inline || r.simple ? null : e.exec(t);
  };
}
function es(e) {
  return Nr(function(t) {
    return e.exec(t);
  });
}
const f3 = /(javascript|vbscript|data(?!:image)):/i;
function p3(e) {
  try {
    const t = decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g, "");
    if (f3.test(t)) return null;
  } catch {
    return null;
  }
  return e;
}
function ct(e) {
  return e && e.replace(XR, "$1");
}
function ms(e, t, r) {
  const n = r.inline || !1, s = r.simple || !1;
  r.inline = !0, r.simple = !0;
  const a = e(t, r);
  return r.inline = n, r.simple = s, a;
}
function h3(e, t, r) {
  const n = r.inline || !1, s = r.simple || !1;
  r.inline = !1, r.simple = !0;
  const a = e(t, r);
  return r.inline = n, r.simple = s, a;
}
function m3(e, t, r) {
  const n = r.inline || !1;
  r.inline = !1;
  const s = e(t, r);
  return r.inline = n, s;
}
const Xa = (e, t, r) => ({ children: ms(t, e[2], r) });
function Qa() {
  return {};
}
function ei() {
  return null;
}
function g3(...e) {
  return e.filter(Boolean).join(" ");
}
function ti(e, t, r) {
  let n = e;
  const s = t.split(".");
  for (; s.length && (n = n[s[0]], n !== void 0); ) s.shift();
  return n || r;
}
function y3(e = "", t = {}) {
  t.overrides = t.overrides || {}, t.namedCodesToUnicode = t.namedCodesToUnicode ? Ht({}, Gu, t.namedCodesToUnicode) : Gu;
  const r = t.slugify || Qr, n = t.sanitizer || p3, s = t.createElement || re.createElement, a = [Hu, Ju, Yu, t.enforceAtxHeadings ? Xu : Zu, Qu, td, wh, _h], i = [...a, DR, Ya, ed, Za];
  function o(p, v) {
    for (let $ = 0; $ < p.length; $++) if (p[$].test(v)) return !0;
    return !1;
  }
  function l(p, v, ...$) {
    const _ = ti(t.overrides, p + ".props", {});
    return s(function(x, E) {
      const A = ti(E, x);
      return A ? typeof A == "function" || typeof A == "object" && "render" in A ? A : ti(E, x + ".component", x) : x;
    }(p, t.overrides), Ht({}, v, _, { className: g3(v == null ? void 0 : v.className, _.className) || void 0 }), ...$);
  }
  function u(p) {
    p = p.replace(NR, "");
    let v = !1;
    t.forceInline ? v = !0 : t.forceBlock || (v = UR.test(p) === !1);
    const $ = b(g(v ? p : dn(p).replace(e3, "") + `

`, { inline: v }));
    for (; nd($[$.length - 1]) && !$[$.length - 1].trim(); ) $.pop();
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
    const $ = v.match(gR);
    return $ ? $.reduce(function(_, x) {
      const E = x.indexOf("=");
      if (E !== -1) {
        const A = function(W) {
          return W.indexOf("-") !== -1 && W.match(CR) === null && (W = W.replace(kR, function(K, q) {
            return q.toUpperCase();
          })), W;
        }(x.slice(0, E)).trim(), U = function(W) {
          const K = W[0];
          return (K === '"' || K === "'") && W.length >= 2 && W[W.length - 1] === K ? W.slice(1, -1) : W;
        }(x.slice(E + 1).trim()), C = Ku[A] || A;
        if (C === "ref") return _;
        const L = _[C] = function(W, K, q, T) {
          return K === "style" ? function(F) {
            const k = [];
            let z = "", J = !1, Q = !1, M = "";
            if (!F) return k;
            for (let D = 0; D < F.length; D++) {
              const P = F[D];
              if (P !== '"' && P !== "'" || J || (Q ? P === M && (Q = !1, M = "") : (Q = !0, M = P)), P === "(" && z.endsWith("url") ? J = !0 : P === ")" && J && (J = !1), P !== ";" || Q || J) z += P;
              else {
                const w = z.trim();
                if (w) {
                  const S = w.indexOf(":");
                  if (S > 0) {
                    const I = w.slice(0, S).trim(), G = w.slice(S + 1).trim();
                    k.push([I, G]);
                  }
                }
                z = "";
              }
            }
            const j = z.trim();
            if (j) {
              const D = j.indexOf(":");
              if (D > 0) {
                const P = j.slice(0, D).trim(), w = j.slice(D + 1).trim();
                k.push([P, w]);
              }
            }
            return k;
          }(q).reduce(function(F, [k, z]) {
            return F[k.replace(/(-[a-z])/g, (J) => J[1].toUpperCase())] = T(z, W, k), F;
          }, {}) : mR.indexOf(K) !== -1 ? T(ct(q), W, K) : (q.match(TR) && (q = ct(q.slice(1, q.length - 1))), q === "true" || q !== "false" && q);
        }(p, A, U, n);
        typeof L == "string" && (Ya.test(L) || Za.test(L)) && (_[C] = u(L.trim()));
      } else x !== "style" && (_[Ku[x] || x] = !0);
      return _;
    }, {}) : null;
  }
  const f = [], m = {}, h = { 0: { t: [">"], o: wt(Hu), i: 1, u(p, v, $) {
    const [, _, x] = p[0].replace(vR, "").match(bR);
    return { alert: _, children: v(x, $) };
  }, l(p, v, $) {
    const _ = { key: $.key };
    return p.alert && (_.className = "markdown-alert-" + r(p.alert.toLowerCase(), Qr), p.children.unshift({ attrs: {}, children: [{ type: "27", text: p.alert }], noInnerParse: !0, type: "11", tag: "header" })), l("blockquote", _, v(p.children, $));
  } }, 1: { t: ["  "], o: es($R), i: 1, u: Qa, l: (p, v, $) => l("br", { key: $.key }) }, 2: { t: ["--", "__", "**", "- ", "* ", "_ "], o: wt(wR), i: 1, u: Qa, l: (p, v, $) => l("hr", { key: $.key }) }, 3: { t: ["    "], o: wt(Yu), i: 0, u: (p) => ({ lang: void 0, text: ct(dn(p[0].replace(/^ {4}/gm, ""))) }), l: (p, v, $) => l("pre", { key: $.key }, l("code", Ht({}, p.attrs, { className: p.lang ? "lang-" + p.lang : "" }), p.text)) }, 4: { t: ["```", "~~~"], o: wt(Ju), i: 0, u: (p) => ({ attrs: c("code", p[3] || ""), lang: p[2] || void 0, text: p[4], type: "3" }) }, 5: { t: ["`"], o: Ft(_R), i: 3, u: (p) => ({ text: ct(p[2]) }), l: (p, v, $) => l("code", { key: $.key }, p.text) }, 6: { t: ["[^"], o: wt(jR), i: 0, u: (p) => (f.push({ footnote: p[2], identifier: p[1] }), {}), l: ei }, 7: { t: ["[^"], o: zt(ER), i: 1, u: (p) => ({ target: "#" + r(p[1], Qr), text: p[1] }), l: (p, v, $) => l("a", { key: $.key, href: n(p.target, "a", "href") }, l("sup", { key: $.key }, p.text)) }, 8: { t: ["[ ]", "[x]"], o: zt(AR), i: 1, u: (p) => ({ completed: p[1].toLowerCase() === "x" }), l: (p, v, $) => l("input", { checked: p.completed, key: $.key, readOnly: !0, type: "checkbox" }) }, 9: { t: ["#"], o: wt(t.enforceAtxHeadings ? Xu : Zu), i: 1, u: (p, v, $) => ({ children: ms(v, p[2], $), id: r(p[2], Qr), level: p[1].length }), l: (p, v, $) => l("h" + p.level, { id: p.id, key: $.key }, v(p.children, $)) }, 10: { t: (p) => {
    const v = p.indexOf(`
`);
    return v > 0 && v < p.length - 1 && (p[v + 1] === "=" || p[v + 1] === "-");
  }, o: wt(Qu), i: 1, u: (p, v, $) => ({ children: ms(v, p[1], $), level: p[2] === "=" ? 1 : 2, type: "9" }) }, 11: { t: ["<"], o: es(Ya), i: 1, u(p, v, $) {
    const [, _] = p[3].match(t3), x = RegExp("^" + _, "gm"), E = p[3].replace(x, ""), A = o(i, E) ? m3 : ms, U = p[1].toLowerCase(), C = hR.indexOf(U) !== -1, L = (C ? U : p[1]).trim(), W = { attrs: c(L, p[2]), noInnerParse: C, tag: L };
    if ($.inAnchor = $.inAnchor || U === "a", C) W.text = p[3];
    else {
      const K = $.inHTML;
      $.inHTML = !0, W.children = A(v, E, $), $.inHTML = K;
    }
    return $.inAnchor = !1, W;
  }, l: (p, v, $) => l(p.tag, Ht({ key: $.key }, p.attrs), p.text || (p.children ? v(p.children, $) : "")) }, 13: { t: ["<"], o: es(Za), i: 1, u(p) {
    const v = p[1].trim();
    return { attrs: c(v, p[2] || ""), tag: v };
  }, l: (p, v, $) => l(p.tag, Ht({}, p.attrs, { key: $.key })) }, 12: { t: ["<!--"], o: es(ed), i: 1, u: () => ({}), l: ei }, 14: { t: ["!["], o: Ft(l3), i: 1, u: (p) => ({ alt: ct(p[1]), target: ct(p[2]), title: ct(p[3]) }), l: (p, v, $) => l("img", { key: $.key, alt: p.alt || void 0, title: p.title || void 0, src: n(p.target, "img", "src") }) }, 15: { t: ["["], o: zt(o3), i: 3, u: (p, v, $) => ({ children: h3(v, p[1], $), target: ct(p[2]), title: ct(p[3]) }), l: (p, v, $) => l("a", { key: $.key, href: n(p.target, "a", "href"), title: p.title }, v(p.children, $)) }, 16: { t: ["<"], o: zt(FR), i: 0, u(p) {
    let v = p[1], $ = !1;
    return v.indexOf("@") !== -1 && v.indexOf("//") === -1 && ($ = !0, v = v.replace("mailto:", "")), { children: [{ text: v, type: "27" }], target: $ ? "mailto:" + v : v, type: "15" };
  } }, 17: { t: (p, v) => !v.inAnchor && !t.disableAutoLink && (hs(p, "http://") || hs(p, "https://")), o: zt(IR), i: 0, u: (p) => ({ children: [{ text: p[1], type: "27" }], target: p[1], title: void 0, type: "15" }) }, 20: rd(l, 1), 33: rd(l, 2), 19: { t: [`
`], o: wt(xR), i: 3, u: Qa, l: () => `
` }, 21: { o: Nr(function(p, v) {
    if (v.inline || v.simple || v.inHTML && p.indexOf(`

`) === -1 && v.prevCapture.indexOf(`

`) === -1) return null;
    let $ = "", _ = 0;
    for (; ; ) {
      const E = p.indexOf(`
`, _), A = p.slice(_, E === -1 ? void 0 : E + 1);
      if (o(a, A) || ($ += A, E === -1 || !A.trim())) break;
      _ = E + 1;
    }
    const x = dn($);
    return x === "" ? null : [$, , x];
  }), i: 3, u: Xa, l: (p, v, $) => l("p", { key: $.key }, v(p.children, $)) }, 22: { t: ["["], o: zt(RR), i: 0, u: (p) => (m[p[1]] = { target: p[2], title: p[4] }, {}), l: ei }, 23: { t: ["!["], o: Ft(MR), i: 0, u: (p) => ({ alt: p[1] ? ct(p[1]) : void 0, ref: p[2] }), l: (p, v, $) => m[p.ref] ? l("img", { key: $.key, alt: p.alt, src: n(m[p.ref].target, "img", "src"), title: m[p.ref].title }) : null }, 24: { t: (p) => p[0] === "[" && p.indexOf("](") === -1, o: zt(LR), i: 0, u: (p, v, $) => ({ children: v(p[1], $), fallbackChildren: p[0], ref: p[2] }), l: (p, v, $) => m[p.ref] ? l("a", { key: $.key, href: n(m[p.ref].target, "a", "href"), title: m[p.ref].title }, v(p.children, $)) : l("span", { key: $.key }, p.fallbackChildren) }, 25: { t: ["|"], o: wt(td), i: 1, u: d3, l(p, v, $) {
    const _ = p;
    return l("table", { key: $.key }, l("thead", null, l("tr", null, _.header.map(function(x, E) {
      return l("th", { key: E, style: ad(_, E) }, v(x, $));
    }))), l("tbody", null, _.cells.map(function(x, E) {
      return l("tr", { key: E }, x.map(function(A, U) {
        return l("td", { key: U, style: ad(_, U) }, v(A, $));
      }));
    })));
  } }, 27: { o: Nr(function(p, v) {
    let $;
    return hs(p, ":") && ($ = YR.exec(p)), $ || QR.exec(p);
  }), i: 4, u(p) {
    const v = p[0];
    return { text: v.indexOf("&") === -1 ? v : v.replace(PR, ($, _) => t.namedCodesToUnicode[_] || $) };
  }, l: (p) => p.text }, 28: { t: ["**", "__"], o: Ft(KR), i: 2, u: (p, v, $) => ({ children: v(p[2], $) }), l: (p, v, $) => l("strong", { key: $.key }, v(p.children, $)) }, 29: { t: (p) => {
    const v = p[0];
    return (v === "*" || v === "_") && p[1] !== v;
  }, o: Ft(GR), i: 3, u: (p, v, $) => ({ children: v(p[2], $) }), l: (p, v, $) => l("em", { key: $.key }, v(p.children, $)) }, 30: { t: ["\\"], o: Ft(ZR), i: 1, u: (p) => ({ text: p[1], type: "27" }) }, 31: { t: ["=="], o: Ft(HR), i: 3, u: Xa, l: (p, v, $) => l("mark", { key: $.key }, v(p.children, $)) }, 32: { t: ["~~"], o: Ft(JR), i: 3, u: Xa, l: (p, v, $) => l("del", { key: $.key }, v(p.children, $)) } };
  t.disableParsingRawHTML === !0 && (delete h[11], delete h[13]);
  const g = function(p) {
    var v = Object.keys(p);
    function $(_, x) {
      var E = [];
      if (x.prevCapture = x.prevCapture || "", _.trim()) for (; _; ) for (var A = 0; A < v.length; ) {
        var U = v[A], C = p[U];
        if (!C.t || c3(_, x, C.t)) {
          var L = C.o(_, x);
          if (L && L[0]) {
            _ = _.substring(L[0].length);
            var W = C.u(L, $, x);
            x.prevCapture += L[0], W.type || (W.type = U), E.push(W);
            break;
          }
          A++;
        } else A++;
      }
      return x.prevCapture = "", E;
    }
    return v.sort(function(_, x) {
      return p[_].i - p[x].i || (_ < x ? -1 : 1);
    }), function(_, x) {
      return $(function(E) {
        return E.replace(SR, `
`).replace(OR, "").replace(WR, "    ");
      }(_), x);
    };
  }(h), b = /* @__PURE__ */ function(p, v) {
    return function $(_, x = {}) {
      if (Array.isArray(_)) {
        const E = x.key, A = [];
        let U = !1;
        for (let C = 0; C < _.length; C++) {
          x.key = C;
          const L = $(_[C], x), W = nd(L);
          W && U ? A[A.length - 1] += L : L !== null && A.push(L), U = W;
        }
        return x.key = E, A;
      }
      return function(E, A, U) {
        const C = p[E.type].l;
        return v ? v(() => C(E, A, U), E, A, U) : C(E, A, U);
      }(_, $, x);
    };
  }(h, t.renderRule), y = u(e);
  return f.length ? l("div", null, y, l("footer", { key: "footer" }, f.map(function(p) {
    return l("div", { id: r(p.identifier, Qr), key: p.identifier }, p.identifier, b(g(p.footnote, { inline: !0 })));
  }))) : y;
}
const ja = (e) => {
  let { children: t, options: r } = e, n = function(s, a) {
    if (s == null) return {};
    var i, o, l = {}, u = Object.keys(s);
    for (o = 0; o < u.length; o++) a.indexOf(i = u[o]) >= 0 || (l[i] = s[i]);
    return l;
  }(e, pR);
  return re.cloneElement(y3(t ?? "", r), n);
};
function v3(e, t) {
  return e == null ? !0 : mf(e, t);
}
class b3 extends En {
  constructor() {
    super(...arguments);
    /** Set up the initial state */
    me(this, "state", {
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
    me(this, "onPropertyChange", (r, n = !1) => (s, a, i) => {
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
    me(this, "onDropPropertyClick", (r) => (n) => {
      n.preventDefault();
      const { onChange: s, formData: a } = this.props, i = { ...a };
      v3(i, r), s(i);
    });
    /** Computes the next available key name from the `preferredKey`, indexing through the already existing keys until one
     * that is already not assigned is found.
     *
     * @param preferredKey - The preferred name of a new key
     * @param [formData] - The form data in which to check if the desired key already exists
     * @returns - The name of the next available key from `preferredKey`
     */
    me(this, "getAvailableKey", (r, n) => {
      const { uiSchema: s, registry: a } = this.props, { duplicateKeySuffixSeparator: i = "-" } = le(s, a.globalUiOptions);
      let o = 0, l = r;
      for (; Ve(n, l); )
        l = `${r}${i}${++o}`;
      return l;
    });
    /** Returns a callback function that deals with the rename of a key for an additional property for a schema. That
     * callback will attempt to rename the key and move the existing data to that key, calling `onChange` when it does.
     *
     * @param oldValue - The old value of a field
     * @returns - The key change callback function
     */
    me(this, "onKeyChange", (r) => (n, s) => {
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
    me(this, "handleAddClick", (r) => () => {
      if (!r.additionalProperties)
        return;
      const { formData: n, onChange: s, registry: a } = this.props, i = { ...n };
      let o, l, u;
      if (we(r.additionalProperties)) {
        o = r.additionalProperties.type, l = r.additionalProperties.const, u = r.additionalProperties.default;
        let m = r.additionalProperties;
        if (Te in m) {
          const { schemaUtils: h } = a;
          m = h.retrieveSchema({ $ref: m[Te] }, n), o = m.type, l = m.const, u = m.default;
        }
        !o && (it in m || Ke in m) && (o = "object");
      }
      const c = this.getAvailableKey("newKey", i), f = l ?? u ?? this.getDefaultValue(o);
      De(i, c, f), s(i);
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
        return n(ye.NewStringDefault);
    }
  }
  /** Renders the `ObjectField` from the given props
   */
  render() {
    const { schema: r, uiSchema: n = {}, formData: s, errorSchema: a, idSchema: i, name: o, required: l = !1, disabled: u, readonly: c, hideError: f, idPrefix: m, idSeparator: h, onBlur: g, onFocus: b, registry: y, title: p } = this.props, { fields: v, formContext: $, schemaUtils: _, translateString: x, globalUiOptions: E } = y, { SchemaField: A } = v, U = _.retrieveSchema(r, s), C = le(n, E), { properties: L = {} } = U, W = C.title ?? U.title ?? p ?? o, K = C.description ?? U.description;
    let q;
    try {
      const k = Object.keys(L);
      q = GD(k, C.order);
    } catch (k) {
      return d.jsxs("div", { children: [d.jsx("p", { className: "config-error", style: { color: "red" }, children: d.jsx(ja, { options: { disableParsingRawHTML: !0 }, children: x(ye.InvalidObjectField, [o || "root", k.message]) }) }), d.jsx("pre", { children: JSON.stringify(U) })] });
    }
    const T = pe("ObjectFieldTemplate", y, C), F = {
      // getDisplayLabel() always returns false for object types, so just check the `uiOptions.label`
      title: C.label === !1 ? "" : W,
      description: C.label === !1 ? void 0 : K,
      properties: q.map((k) => {
        const z = Ve(U, [Oe, k, Pn]), J = z ? n.additionalProperties : n[k], Q = le(J).widget === "hidden", M = Z(i, [k], {});
        return {
          content: d.jsx(A, { name: k, required: this.isRequired(k), schema: Z(U, [Oe, k], {}), uiSchema: J, errorSchema: Z(a, k), idSchema: M, idPrefix: m, idSeparator: h, formData: Z(s, k), formContext: $, wasPropertyKeyModified: this.state.wasPropertyKeyModified, onKeyChange: this.onKeyChange(k), onChange: this.onPropertyChange(k, z), onBlur: g, onFocus: b, registry: y, disabled: u, readonly: c, hideError: f, onDropPropertyClick: this.onDropPropertyClick }, k),
          name: k,
          readonly: c,
          disabled: u,
          required: l,
          hidden: Q
        };
      }),
      readonly: c,
      disabled: u,
      required: l,
      idSchema: i,
      uiSchema: n,
      errorSchema: a,
      schema: U,
      formData: s,
      formContext: $,
      registry: y
    };
    return d.jsx(T, { ...F, onAddClick: this.handleAddClick });
  }
}
const $3 = {
  array: "ArrayField",
  boolean: "BooleanField",
  integer: "NumberField",
  number: "NumberField",
  object: "ObjectField",
  string: "StringField",
  null: "NullField"
};
function w3(e, t, r, n) {
  const s = t.field, { fields: a, translateString: i } = n;
  if (typeof s == "function")
    return s;
  if (typeof s == "string" && s in a)
    return a[s];
  const o = Nt(e), l = Array.isArray(o) ? o[0] : o || "", u = e.$id;
  let c = $3[l];
  return u && u in a && (c = u), !c && (e.anyOf || e.oneOf) ? () => null : c in a ? a[c] : () => {
    const f = pe("UnsupportedFieldTemplate", n, t);
    return d.jsx(f, { schema: e, idSchema: r, reason: i(ye.UnknownFieldType, [String(e.type)]), registry: n });
  };
}
function _3(e) {
  const { schema: t, idSchema: r, uiSchema: n, formData: s, errorSchema: a, idPrefix: i, idSeparator: o, name: l, onChange: u, onKeyChange: c, onDropPropertyClick: f, required: m, registry: h, wasPropertyKeyModified: g = !1 } = e, { formContext: b, schemaUtils: y, globalUiOptions: p } = h, v = le(n, p), $ = pe("FieldTemplate", h, v), _ = pe("DescriptionFieldTemplate", h, v), x = pe("FieldHelpTemplate", h, v), E = pe("FieldErrorTemplate", h, v), A = y.retrieveSchema(t, s), U = r[Mt], C = St(y.toIdSchema(A, U, s, i, o), r), L = oe((B, ee, Ee) => u(B, ee, Ee || U), [U, u]), W = w3(A, v, C, h), K = !!(v.disabled ?? e.disabled), q = !!(v.readonly ?? (e.readonly || e.schema.readOnly || A.readOnly)), T = v.hideError, F = T === void 0 ? e.hideError : !!T, k = !!(v.autofocus ?? e.autofocus);
  if (Object.keys(A).length === 0)
    return null;
  const z = y.getDisplayLabel(A, n, p), { __errors: J, ...Q } = a || {}, M = js(n, ["ui:classNames", "classNames", "ui:style"]);
  on in M && (M[on] = js(M[on], ["classNames", "style"]));
  const j = d.jsx(W, { ...e, onChange: L, idSchema: C, schema: A, uiSchema: M, disabled: K, readonly: q, hideError: F, autofocus: k, errorSchema: Q, formContext: b, rawErrors: J }), D = C[Mt];
  let P;
  g ? P = l : P = Pn in A ? l : v.title || e.schema.title || A.title || e.title || l;
  const w = v.description || e.schema.description || A.description || "", S = v.enableMarkdownInDescription ? d.jsx(ja, { options: { disableParsingRawHTML: !0 }, children: w }) : w, I = v.help, G = v.widget === "hidden", Y = ["form-group", "field", `field-${Nt(A)}`];
  !F && J && J.length > 0 && Y.push("field-error has-error has-danger"), n != null && n.classNames && Y.push(n.classNames), v.classNames && Y.push(v.classNames);
  const ne = d.jsx(x, { help: I, idSchema: C, schema: A, uiSchema: n, hasErrors: !F && J && J.length > 0, registry: h }), te = F || (A.anyOf || A.oneOf) && !y.isSelect(A) ? void 0 : d.jsx(E, { errors: J, errorSchema: a, idSchema: C, schema: A, uiSchema: n, registry: h }), O = {
    description: d.jsx(_, { id: Vn(D), description: S, schema: A, uiSchema: n, registry: h }),
    rawDescription: w,
    help: ne,
    rawHelp: typeof I == "string" ? I : void 0,
    errors: te,
    rawErrors: F ? void 0 : J,
    id: D,
    label: P,
    hidden: G,
    onChange: u,
    onKeyChange: c,
    onDropPropertyClick: f,
    required: m,
    disabled: K,
    readonly: q,
    hideError: F,
    displayLabel: z,
    classNames: Y.join(" ").trim(),
    style: v.style,
    formContext: b,
    formData: s,
    schema: A,
    uiSchema: n,
    registry: h
  }, N = h.fields.AnyOfField, R = h.fields.OneOfField, V = (n == null ? void 0 : n["ui:field"]) && (n == null ? void 0 : n["ui:fieldReplacesAnyOrOneOf"]) === !0;
  return d.jsx($, { ...O, children: d.jsxs(d.Fragment, { children: [j, A.anyOf && !V && !y.isSelect(A) && d.jsx(N, { name: l, disabled: K, readonly: q, hideError: F, errorSchema: a, formData: s, formContext: b, idPrefix: i, idSchema: C, idSeparator: o, onBlur: e.onBlur, onChange: e.onChange, onFocus: e.onFocus, options: A.anyOf.map((B) => y.retrieveSchema(we(B) ? B : {}, s)), registry: h, required: m, schema: A, uiSchema: n }), A.oneOf && !V && !y.isSelect(A) && d.jsx(R, { name: l, disabled: K, readonly: q, hideError: F, errorSchema: a, formData: s, formContext: b, idPrefix: i, idSchema: C, idSeparator: o, onBlur: e.onBlur, onChange: e.onChange, onFocus: e.onFocus, options: A.oneOf.map((B) => y.retrieveSchema(we(B) ? B : {}, s)), registry: h, required: m, schema: A, uiSchema: n })] }) });
}
class x3 extends En {
  shouldComponentUpdate(t) {
    return !Se(this.props, t);
  }
  render() {
    return d.jsx(_3, { ...this.props });
  }
}
function S3(e) {
  const { schema: t, name: r, uiSchema: n, idSchema: s, formData: a, required: i, disabled: o = !1, readonly: l = !1, autofocus: u = !1, onChange: c, onBlur: f, onFocus: m, registry: h, rawErrors: g, hideError: b } = e, { title: y, format: p } = t, { widgets: v, formContext: $, schemaUtils: _, globalUiOptions: x } = h, E = _.isSelect(t) ? _n(t, n) : void 0;
  let A = E ? "select" : "text";
  p && qD(t, p, v) && (A = p);
  const { widget: U = A, placeholder: C = "", title: L, ...W } = le(n), K = _.getDisplayLabel(t, n, x), q = L ?? y ?? r, T = jt(t, U, v);
  return d.jsx(T, { options: { ...W, enumOptions: E }, schema: t, uiSchema: n, id: s.$id, name: r, label: q, hideLabel: !K, hideError: b, value: a, onChange: c, onBlur: f, onFocus: m, required: i, disabled: o, readonly: l, formContext: $, autofocus: u, registry: h, placeholder: C, rawErrors: g });
}
function j3(e) {
  const { formData: t, onChange: r } = e;
  return st(() => {
    t === void 0 && r(null);
  }, [t, r]), null;
}
function E3() {
  return {
    AnyOfField: Bu,
    ArrayField: lR,
    // ArrayField falls back to SchemaField if ArraySchemaField is not defined, which it isn't by default
    BooleanField: cR,
    NumberField: fR,
    ObjectField: b3,
    OneOfField: Bu,
    SchemaField: x3,
    StringField: S3,
    NullField: j3
  };
}
function O3(e) {
  const { idSchema: t, description: r, registry: n, schema: s, uiSchema: a } = e, i = le(a, n.globalUiOptions), { label: o = !0 } = i;
  if (!r || !o)
    return null;
  const l = pe("DescriptionFieldTemplate", n, i);
  return d.jsx(l, { id: Vn(t), description: r, schema: s, uiSchema: a, registry: n });
}
function N3(e) {
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
function A3(e) {
  const { canAdd: t, className: r, disabled: n, idSchema: s, uiSchema: a, items: i, onAddClick: o, readonly: l, registry: u, required: c, schema: f, title: m } = e, h = le(a), g = pe("ArrayFieldDescriptionTemplate", u, h), b = pe("ArrayFieldItemTemplate", u, h), y = pe("ArrayFieldTitleTemplate", u, h), { ButtonTemplates: { AddButton: p } } = u.templates;
  return d.jsxs("fieldset", { className: r, id: s.$id, children: [d.jsx(y, { idSchema: s, title: h.title || m, required: c, schema: f, uiSchema: a, registry: u }), d.jsx(g, { idSchema: s, description: h.description || f.description, schema: f, uiSchema: a, registry: u }), d.jsx("div", { className: "row array-item-list", children: i && i.map(({ key: v, ...$ }) => d.jsx(b, { ...$ }, v)) }), t && d.jsx(p, { className: "array-item-add", onClick: o, disabled: n || l, uiSchema: a, registry: u })] });
}
function P3(e) {
  const { idSchema: t, title: r, schema: n, uiSchema: s, required: a, registry: i } = e, o = le(s, i.globalUiOptions), { label: l = !0 } = o;
  if (!r || !l)
    return null;
  const u = pe("TitleFieldTemplate", i, o);
  return d.jsx(u, { id: dh(t), title: r, required: a, schema: n, uiSchema: s, registry: i });
}
function C3(e) {
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
    ...DD(m, p, f)
  };
  let E;
  x.type === "number" || x.type === "integer" ? E = n || n === 0 ? n : "" : E = n ?? "";
  const A = oe(({ target: { value: L } }) => u(L === "" ? f.emptyValue : L), [u, f]), U = oe(({ target: L }) => o(t, L && L.value), [o, t]), C = oe(({ target: L }) => l(t, L && L.value), [l, t]);
  return d.jsxs(d.Fragment, { children: [d.jsx("input", { id: t, name: t, className: "form-control", readOnly: s, disabled: a, autoFocus: i, value: E, ...x, list: m.examples ? Oi(t) : void 0, onChange: c || A, onBlur: U, onFocus: C, "aria-describedby": ur(t, !!m.examples) }), Array.isArray(m.examples) && d.jsx("datalist", { id: Oi(t), children: m.examples.concat(m.default && !m.examples.includes(m.default) ? [m.default] : []).map((L) => d.jsx("option", { value: L }, L)) }, `datalist_${t}`)] });
}
function T3({ uiSchema: e }) {
  const { submitText: t, norender: r, props: n = {} } = RD(e);
  return r ? null : d.jsx("div", { children: d.jsx("button", { type: "submit", ...n, className: `btn btn-info ${n.className || ""}`, children: t }) });
}
function zn(e) {
  const { iconType: t = "default", icon: r, className: n, uiSchema: s, registry: a, ...i } = e;
  return d.jsx("button", { type: "button", className: `btn btn-${t} ${n}`, ...i, children: d.jsx("i", { className: `glyphicon glyphicon-${r}` }) });
}
function I3(e) {
  const { registry: { translateString: t } } = e;
  return d.jsx(zn, { title: t(ye.CopyButton), className: "array-item-copy", ...e, icon: "copy" });
}
function F3(e) {
  const { registry: { translateString: t } } = e;
  return d.jsx(zn, { title: t(ye.MoveDownButton), className: "array-item-move-down", ...e, icon: "arrow-down" });
}
function k3(e) {
  const { registry: { translateString: t } } = e;
  return d.jsx(zn, { title: t(ye.MoveUpButton), className: "array-item-move-up", ...e, icon: "arrow-up" });
}
function D3(e) {
  const { registry: { translateString: t } } = e;
  return d.jsx(zn, { title: t(ye.RemoveButton), className: "array-item-remove", ...e, iconType: "danger", icon: "remove" });
}
function R3({ className: e, onClick: t, disabled: r, registry: n }) {
  const { translateString: s } = n;
  return d.jsx("div", { className: "row", children: d.jsx("p", { className: `col-xs-3 col-xs-offset-9 text-right ${e}`, children: d.jsx(zn, { iconType: "info", icon: "plus", className: "btn-add col-xs-12", title: s(ye.AddButton), onClick: t, disabled: r, registry: n }) }) });
}
function M3() {
  return {
    SubmitButton: T3,
    AddButton: R3,
    CopyButton: I3,
    MoveDownButton: F3,
    MoveUpButton: k3,
    RemoveButton: D3
  };
}
function L3(e) {
  const { id: t, description: r } = e;
  return r ? typeof r == "string" ? d.jsx("p", { id: t, className: "field-description", children: r }) : d.jsx("div", { id: t, className: "field-description", children: r }) : null;
}
function U3({ errors: e, registry: t }) {
  const { translateString: r } = t;
  return d.jsxs("div", { className: "panel panel-danger errors", children: [d.jsx("div", { className: "panel-heading", children: d.jsx("h3", { className: "panel-title", children: r(ye.ErrorsLabel) }) }), d.jsx("ul", { className: "list-group", children: e.map((n, s) => d.jsx("li", { className: "list-group-item text-danger", children: n.stack }, s)) })] });
}
const W3 = "*";
function xh(e) {
  const { label: t, required: r, id: n } = e;
  return t ? d.jsxs("label", { className: "control-label", htmlFor: n, children: [t, r && d.jsx("span", { className: "required", children: W3 })] }) : null;
}
function V3(e) {
  const { id: t, label: r, children: n, errors: s, help: a, description: i, hidden: o, required: l, displayLabel: u, registry: c, uiSchema: f } = e, m = le(f), h = pe("WrapIfAdditionalTemplate", c, m);
  return o ? d.jsx("div", { className: "hidden", children: n }) : d.jsxs(h, { ...e, children: [u && d.jsx(xh, { label: r, required: l, id: t }), u && i ? i : null, n, s, a] });
}
function z3(e) {
  const { errors: t = [], idSchema: r } = e;
  if (t.length === 0)
    return null;
  const n = ch(r);
  return d.jsx("div", { children: d.jsx("ul", { id: n, className: "error-detail bs-callout bs-callout-info", children: t.filter((s) => !!s).map((s, a) => d.jsx("li", { className: "text-danger", children: s }, a)) }) });
}
function q3(e) {
  const { idSchema: t, help: r } = e;
  if (!r)
    return null;
  const n = uh(t);
  return typeof r == "string" ? d.jsx("p", { id: n, className: "help-block", children: r }) : d.jsx("div", { id: n, className: "help-block", children: r });
}
function B3(e) {
  const { description: t, disabled: r, formData: n, idSchema: s, onAddClick: a, properties: i, readonly: o, registry: l, required: u, schema: c, title: f, uiSchema: m } = e, h = le(m), g = pe("TitleFieldTemplate", l, h), b = pe("DescriptionFieldTemplate", l, h), { ButtonTemplates: { AddButton: y } } = l.templates;
  return d.jsxs("fieldset", { id: s.$id, children: [f && d.jsx(g, { id: dh(s), title: f, required: u, schema: c, uiSchema: m, registry: l }), t && d.jsx(b, { id: Vn(s), description: t, schema: c, uiSchema: m, registry: l }), i.map((p) => p.content), Eg(c, m, n) && d.jsx(y, { className: "object-property-expand", onClick: a(c), disabled: r || o, uiSchema: m, registry: l })] });
}
const K3 = "*";
function G3(e) {
  const { id: t, title: r, required: n } = e;
  return d.jsxs("legend", { id: t, children: [r, n && d.jsx("span", { className: "required", children: K3 })] });
}
function H3(e) {
  const { schema: t, idSchema: r, reason: n, registry: s } = e, { translateString: a } = s;
  let i = ye.UnsupportedField;
  const o = [];
  return r && r.$id && (i = ye.UnsupportedFieldWithId, o.push(r.$id)), n && (i = i === ye.UnsupportedField ? ye.UnsupportedFieldWithReason : ye.UnsupportedFieldWithIdAndReason, o.push(n)), d.jsxs("div", { className: "unsupported-field", children: [d.jsx("p", { children: d.jsx(ja, { options: { disableParsingRawHTML: !0 }, children: a(i, o) }) }), t && d.jsx("pre", { children: JSON.stringify(t, null, 2) })] });
}
function J3(e) {
  const { id: t, classNames: r, style: n, disabled: s, label: a, onKeyChange: i, onDropPropertyClick: o, readonly: l, required: u, schema: c, children: f, uiSchema: m, registry: h } = e, { templates: g, translateString: b } = h, { RemoveButton: y } = g.ButtonTemplates, p = b(ye.KeyLabel, [a]);
  return Pn in c ? d.jsx("div", { className: r, style: n, children: d.jsxs("div", { className: "row", children: [d.jsx("div", { className: "col-xs-5 form-additional", children: d.jsxs("div", { className: "form-group", children: [d.jsx(xh, { label: p, required: u, id: `${t}-key` }), d.jsx("input", { className: "form-control", type: "text", id: `${t}-key`, onBlur: ({ target: $ }) => i($ && $.value), defaultValue: a })] }) }), d.jsx("div", { className: "form-additional form-group col-xs-5", children: f }), d.jsx("div", { className: "col-xs-2", children: d.jsx(y, { className: "array-item-remove btn-block", style: { border: "0" }, disabled: s || l, onClick: o(a), uiSchema: m, registry: h }) })] }) }) : d.jsx("div", { className: r, style: n, children: f });
}
function Y3() {
  return {
    ArrayFieldDescriptionTemplate: O3,
    ArrayFieldItemTemplate: N3,
    ArrayFieldTemplate: A3,
    ArrayFieldTitleTemplate: P3,
    ButtonTemplates: M3(),
    BaseInputTemplate: C3,
    DescriptionFieldTemplate: L3,
    ErrorListTemplate: U3,
    FieldTemplate: V3,
    FieldErrorTemplate: z3,
    FieldHelpTemplate: q3,
    ObjectFieldTemplate: B3,
    TitleFieldTemplate: G3,
    UnsupportedFieldTemplate: H3,
    WrapIfAdditionalTemplate: J3
  };
}
function Z3(e) {
  return Object.values(e).every((t) => t !== -1);
}
function X3({ type: e, range: t, value: r, select: n, rootId: s, name: a, disabled: i, readonly: o, autofocus: l, registry: u, onBlur: c, onFocus: f }) {
  const m = s + "_" + e, { SelectWidget: h } = u.widgets;
  return d.jsx(h, { schema: { type: "integer" }, id: m, name: a, className: "form-control", options: { enumOptions: ah(t[0], t[1]) }, placeholder: e, value: r, disabled: i, readonly: o, autofocus: l, onChange: (g) => n(e, g), onBlur: c, onFocus: f, registry: u, label: "", "aria-describedby": ur(s) });
}
function Q3({ time: e = !1, disabled: t = !1, readonly: r = !1, autofocus: n = !1, options: s, id: a, name: i, registry: o, onBlur: l, onFocus: u, onChange: c, value: f }) {
  const { translateString: m } = o, [h, g] = $e(f), [b, y] = bm((_, x) => ({ ..._, ...x }), Ja(f, e));
  st(() => {
    const _ = Vu(b, e);
    Z3(b) && _ !== f ? c(_) : h !== f && (g(f), y(Ja(f, e)));
  }, [e, f, c, b, h]);
  const p = oe((_, x) => {
    y({ [_]: x });
  }, []), v = oe((_) => {
    if (_.preventDefault(), t || r)
      return;
    const x = Ja((/* @__PURE__ */ new Date()).toJSON(), e);
    c(Vu(x, e));
  }, [t, r, e]), $ = oe((_) => {
    _.preventDefault(), !(t || r) && c(void 0);
  }, [t, r, c]);
  return d.jsxs("ul", { className: "list-inline", children: [FD(b, e, s.yearsRange, s.format).map((_, x) => d.jsx("li", { className: "list-inline-item", children: d.jsx(X3, { rootId: a, name: i, select: p, ..._, disabled: t, readonly: r, registry: o, onBlur: l, onFocus: u, autofocus: n && x === 0 }) }, x)), (s.hideNowButton !== "undefined" ? !s.hideNowButton : !0) && d.jsx("li", { className: "list-inline-item", children: d.jsx("a", { href: "#", className: "btn btn-info btn-now", onClick: v, children: m(ye.NowLabel) }) }), (s.hideClearButton !== "undefined" ? !s.hideClearButton : !0) && d.jsx("li", { className: "list-inline-item", children: d.jsx("a", { href: "#", className: "btn btn-warning btn-clear", onClick: $, children: m(ye.ClearLabel) }) })] });
}
function eM({ time: e = !0, ...t }) {
  const { AltDateWidget: r } = t.registry.widgets;
  return d.jsx(r, { time: e, ...t });
}
function tM({ schema: e, uiSchema: t, options: r, id: n, value: s, disabled: a, readonly: i, label: o, hideLabel: l, autofocus: u = !1, onBlur: c, onFocus: f, onChange: m, registry: h }) {
  const g = pe("DescriptionFieldTemplate", h, r), b = fs(e), y = oe((_) => m(_.target.checked), [m]), p = oe((_) => c(n, _.target.checked), [c, n]), v = oe((_) => f(n, _.target.checked), [f, n]), $ = r.description ?? e.description;
  return d.jsxs("div", { className: `checkbox ${a || i ? "disabled" : ""}`, children: [!l && !!$ && d.jsx(g, { id: Vn(n), description: $, schema: e, uiSchema: t, registry: h }), d.jsxs("label", { children: [d.jsx("input", { type: "checkbox", id: n, name: n, checked: typeof s > "u" ? !1 : s, required: b, disabled: a || i, autoFocus: u, onChange: y, onBlur: p, onFocus: v, "aria-describedby": ur(n) }), BD(d.jsx("span", { children: o }), l)] })] });
}
function rM({ id: e, disabled: t, options: { inline: r = !1, enumOptions: n, enumDisabled: s, emptyValue: a }, value: i, autofocus: o = !1, readonly: l, onChange: u, onBlur: c, onFocus: f }) {
  const m = Array.isArray(i) ? i : [i], h = oe(({ target: b }) => c(e, pt(b && b.value, n, a)), [c, e]), g = oe(({ target: b }) => f(e, pt(b && b.value, n, a)), [f, e]);
  return d.jsx("div", { className: "checkboxes", id: e, children: Array.isArray(n) && n.map((b, y) => {
    const p = Bo(b.value, m), v = Array.isArray(s) && s.indexOf(b.value) !== -1, $ = t || v || l ? "disabled" : "", _ = (E) => {
      E.target.checked ? u(AD(y, m, n)) : u(OD(y, m, n));
    }, x = d.jsxs("span", { children: [d.jsx("input", { type: "checkbox", id: fh(e, y), name: e, checked: p, value: String(y), disabled: t || v || l, autoFocus: o && y === 0, onChange: _, onBlur: h, onFocus: g, "aria-describedby": ur(e) }), d.jsx("span", { children: b.label })] });
    return r ? d.jsx("label", { className: `checkbox-inline ${$}`, children: x }, y) : d.jsx("div", { className: `checkbox ${$}`, children: d.jsx("label", { children: x }) }, y);
  }) });
}
function nM(e) {
  const { disabled: t, readonly: r, options: n, registry: s } = e, a = pe("BaseInputTemplate", s, n);
  return d.jsx(a, { type: "color", ...e, disabled: t || r });
}
function sM(e) {
  const { onChange: t, options: r, registry: n } = e, s = pe("BaseInputTemplate", n, r), a = oe((i) => t(i || void 0), [t]);
  return d.jsx(s, { type: "date", ...e, onChange: a });
}
function aM(e) {
  const { onChange: t, value: r, options: n, registry: s } = e, a = pe("BaseInputTemplate", s, n);
  return d.jsx(a, { type: "datetime-local", ...e, value: YD(r), onChange: (i) => t(KD(i)) });
}
function iM(e) {
  const { options: t, registry: r } = e, n = pe("BaseInputTemplate", r, t);
  return d.jsx(n, { type: "email", ...e });
}
function oM(e, t) {
  return e === null ? null : e.replace(";base64", `;name=${encodeURIComponent(t)};base64`);
}
function lM(e) {
  const { name: t, size: r, type: n } = e;
  return new Promise((s, a) => {
    const i = new window.FileReader();
    i.onerror = a, i.onload = (o) => {
      var l;
      typeof ((l = o.target) == null ? void 0 : l.result) == "string" ? s({
        dataURL: oM(o.target.result, t),
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
function cM(e) {
  return Promise.all(Array.from(e).map(lM));
}
function uM({ fileInfo: e, registry: t }) {
  const { translateString: r } = t, { dataURL: n, type: s, name: a } = e;
  return n ? ["image/jpeg", "image/png"].includes(s) ? d.jsx("img", { src: n, style: { maxWidth: "100%" }, className: "file-preview" }) : d.jsxs(d.Fragment, { children: [" ", d.jsx("a", { download: `preview-${a}`, href: n, className: "file-download", children: r(ye.PreviewLabel) })] }) : null;
}
function dM({ filesInfo: e, registry: t, preview: r, onRemove: n, options: s }) {
  if (e.length === 0)
    return null;
  const { translateString: a } = t, { RemoveButton: i } = pe("ButtonTemplates", t, s);
  return d.jsx("ul", { className: "file-info", children: e.map((o, l) => {
    const { name: u, size: c, type: f } = o, m = () => n(l);
    return d.jsxs("li", { children: [d.jsx(ja, { children: a(ye.FilesInfo, [u, f, String(c)]) }), r && d.jsx(uM, { fileInfo: o, registry: t }), d.jsx(i, { onClick: m, registry: t })] }, l);
  }) });
}
function fM(e) {
  return e.reduce((t, r) => {
    if (!r)
      return t;
    try {
      const { blob: n, name: s } = SD(r);
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
function pM(e) {
  const { disabled: t, readonly: r, required: n, multiple: s, onChange: a, value: i, options: o, registry: l } = e, u = pe("BaseInputTemplate", l, o), c = oe((h) => {
    h.target.files && cM(h.target.files).then((g) => {
      const b = g.map((y) => y.dataURL);
      a(s ? i.concat(b) : b[0]);
    });
  }, [s, i, a]), f = Pd(() => fM(Array.isArray(i) ? i : [i]), [i]), m = oe((h) => {
    if (s) {
      const g = i.filter((b, y) => y !== h);
      a(g);
    } else
      a(void 0);
  }, [s, i, a]);
  return d.jsxs("div", { children: [d.jsx(u, { ...e, disabled: t || r, type: "file", required: i ? !1 : n, onChangeOverride: c, value: "", accept: o.accept ? String(o.accept) : void 0 }), d.jsx(dM, { filesInfo: f, onRemove: m, registry: l, preview: o.filePreview, options: o })] });
}
function hM({ id: e, value: t }) {
  return d.jsx("input", { type: "hidden", id: e, name: e, value: typeof t > "u" ? "" : t });
}
function mM(e) {
  const { options: t, registry: r } = e, n = pe("BaseInputTemplate", r, t);
  return d.jsx(n, { type: "password", ...e });
}
function gM({ options: e, value: t, required: r, disabled: n, readonly: s, autofocus: a = !1, onBlur: i, onFocus: o, onChange: l, id: u }) {
  const { enumOptions: c, enumDisabled: f, inline: m, emptyValue: h } = e, g = oe(({ target: y }) => i(u, pt(y && y.value, c, h)), [i, u]), b = oe(({ target: y }) => o(u, pt(y && y.value, c, h)), [o, u]);
  return d.jsx("div", { className: "field-radio-group", id: u, children: Array.isArray(c) && c.map((y, p) => {
    const v = Bo(y.value, t), $ = Array.isArray(f) && f.indexOf(y.value) !== -1, _ = n || $ || s ? "disabled" : "", x = () => l(y.value), E = d.jsxs("span", { children: [d.jsx("input", { type: "radio", id: fh(u, p), checked: v, name: u, required: r, value: String(p), disabled: n || $ || s, autoFocus: a && p === 0, onChange: x, onBlur: g, onFocus: b, "aria-describedby": ur(u) }), d.jsx("span", { children: y.label })] });
    return m ? d.jsx("label", { className: `radio-inline ${_}`, children: E }, p) : d.jsx("div", { className: `radio ${_}`, children: d.jsx("label", { children: E }) }, p);
  }) });
}
function yM(e) {
  const { value: t, registry: { templates: { BaseInputTemplate: r } } } = e;
  return d.jsxs("div", { className: "field-range-wrapper", children: [d.jsx(r, { type: "range", ...e }), d.jsx("span", { className: "range-view", children: t })] });
}
function ri(e, t) {
  return t ? Array.from(e.target.options).slice().filter((r) => r.selected).map((r) => r.value) : e.target.value;
}
function vM({ schema: e, id: t, options: r, value: n, required: s, disabled: a, readonly: i, multiple: o = !1, autofocus: l = !1, onChange: u, onBlur: c, onFocus: f, placeholder: m }) {
  const { enumOptions: h, enumDisabled: g, emptyValue: b } = r, y = o ? [] : "", p = oe((E) => {
    const A = ri(E, o);
    return f(t, pt(A, h, b));
  }, [f, t, e, o, h, b]), v = oe((E) => {
    const A = ri(E, o);
    return c(t, pt(A, h, b));
  }, [c, t, e, o, h, b]), $ = oe((E) => {
    const A = ri(E, o);
    return u(pt(A, h, b));
  }, [u, e, o, h, b]), _ = ND(n, h, o), x = !o && e.default === void 0;
  return d.jsxs("select", { id: t, name: t, multiple: o, className: "form-control", value: typeof _ > "u" ? y : _, required: s, disabled: a || i, autoFocus: l, onBlur: v, onFocus: p, onChange: $, "aria-describedby": ur(t), children: [x && d.jsx("option", { value: "", children: m }), Array.isArray(h) && h.map(({ value: E, label: A }, U) => {
    const C = g && g.indexOf(E) !== -1;
    return d.jsx("option", { value: String(U), disabled: C, children: A }, U);
  })] });
}
function Sh({ id: e, options: t = {}, placeholder: r, value: n, required: s, disabled: a, readonly: i, autofocus: o = !1, onChange: l, onBlur: u, onFocus: c }) {
  const f = oe(({ target: { value: g } }) => l(g === "" ? t.emptyValue : g), [l, t.emptyValue]), m = oe(({ target: g }) => u(e, g && g.value), [u, e]), h = oe(({ target: g }) => c(e, g && g.value), [e, c]);
  return d.jsx("textarea", { id: e, name: e, className: "form-control", value: n || "", placeholder: r, required: s, disabled: a, readOnly: i, autoFocus: o, rows: t.rows, onBlur: m, onFocus: h, onChange: f, "aria-describedby": ur(e) });
}
Sh.defaultProps = {
  autofocus: !1,
  options: {}
};
function bM(e) {
  const { options: t, registry: r } = e, n = pe("BaseInputTemplate", r, t);
  return d.jsx(n, { ...e });
}
function $M(e) {
  const { onChange: t, options: r, registry: n } = e, s = pe("BaseInputTemplate", n, r), a = oe((i) => t(i ? `${i}:00` : void 0), [t]);
  return d.jsx(s, { type: "time", ...e, onChange: a });
}
function wM(e) {
  const { options: t, registry: r } = e, n = pe("BaseInputTemplate", r, t);
  return d.jsx(n, { type: "url", ...e });
}
function _M(e) {
  const { options: t, registry: r } = e, n = pe("BaseInputTemplate", r, t);
  return d.jsx(n, { type: "number", ...e });
}
function xM() {
  return {
    AltDateWidget: Q3,
    AltDateTimeWidget: eM,
    CheckboxWidget: tM,
    CheckboxesWidget: rM,
    ColorWidget: nM,
    DateWidget: sM,
    DateTimeWidget: aM,
    EmailWidget: iM,
    FileWidget: pM,
    HiddenWidget: hM,
    PasswordWidget: mM,
    RadioWidget: gM,
    RangeWidget: yM,
    SelectWidget: vM,
    TextWidget: bM,
    TextareaWidget: Sh,
    TimeWidget: $M,
    UpDownWidget: _M,
    URLWidget: wM
  };
}
function SM() {
  return {
    fields: E3(),
    templates: Y3(),
    widgets: xM(),
    rootSchema: {},
    formContext: {},
    translateString: ED
  };
}
class jM extends En {
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
    me(this, "formElement");
    /** Returns the `formData` with only the elements specified in the `fields` list
     *
     * @param formData - The data for the `Form`
     * @param fields - The fields to keep while filtering
     */
    me(this, "getUsedFormData", (r, n) => {
      if (n.length === 0 && typeof r != "object")
        return r;
      const s = zu(r, n);
      return Array.isArray(r) ? Object.keys(s).map((a) => s[a]) : s;
    });
    /** Returns the list of field names from inspecting the `pathSchema` as well as using the `formData`
     *
     * @param pathSchema - The `PathSchema` object for the form
     * @param [formData] - The form data to use while checking for empty objects/arrays
     */
    me(this, "getFieldNames", (r, n) => {
      const s = (a, i = [], o = [[]]) => (Object.keys(a).forEach((l) => {
        if (typeof a[l] == "object") {
          const u = o.map((c) => [...c, l]);
          a[l][Ui] && a[l][ls] !== "" ? i.push(a[l][ls]) : s(a[l], i, u);
        } else l === ls && a[l] !== "" && o.forEach((u) => {
          const c = Z(n, u);
          (typeof c != "object" || xr(c) || Array.isArray(c) && c.every((f) => typeof f != "object")) && i.push(u);
        });
      }), i);
      return s(r);
    });
    /** Returns the `formData` after filtering to remove any extra data not in a form field
     *
     * @param formData - The data for the `Form`
     * @returns The `formData` after omitting extra data
     */
    me(this, "omitExtraData", (r) => {
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
    me(this, "onChange", (r, n, s) => {
      const { extraErrors: a, omitExtraData: i, liveOmit: o, noValidate: l, liveValidate: u, onChange: c } = this.props, { schemaUtils: f, schema: m } = this.state;
      let h = this.state.retrievedSchema;
      if (ce(r) || Array.isArray(r)) {
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
          const E = ps(p, a);
          $ = E.errorSchema, v = E.errors;
        }
        if (n) {
          const E = this.filterErrorsBasedOnSchema(n, h, y);
          $ = St($, E, "preventDuplicates");
        }
        b = {
          formData: y,
          errors: v,
          errorSchema: $,
          schemaValidationErrors: _,
          schemaValidationErrorSchema: x
        };
      } else if (!l && n) {
        const p = a ? St(n, a, "preventDuplicates") : n;
        b = {
          formData: y,
          errorSchema: p,
          errors: xn(p)
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
    me(this, "reset", () => {
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
    me(this, "onBlur", (r, n) => {
      const { onBlur: s } = this.props;
      s && s(r, n);
    });
    /** Callback function to handle when a field on the form is focused. Calls the `onFocus` callback for the `Form` if it
     * was provided.
     *
     * @param id - The unique `id` of the field that was focused
     * @param data - The data associated with the field that was focused
     */
    me(this, "onFocus", (r, n) => {
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
    me(this, "onSubmit", (r) => {
      if (r.preventDefault(), r.target !== r.currentTarget)
        return;
      r.persist();
      const { omitExtraData: n, extraErrors: s, noValidate: a, onSubmit: i } = this.props;
      let { formData: o } = this.state;
      if (n === !0 && (o = this.omitExtraData(o)), a || this.validateFormWithFormData(o)) {
        const l = s || {}, u = s ? xn(s) : [];
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
    me(this, "submit", () => {
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
    me(this, "validateFormWithFormData", (r) => {
      const { extraErrors: n, extraErrorsBlockSubmit: s, focusOnFirstError: a, onError: i } = this.props, { errors: o } = this.state, l = this.validate(r);
      let u = l.errors, c = l.errorSchema;
      const f = u, m = c, h = u.length > 0 || n && s;
      if (h) {
        if (n) {
          const g = ps(l, n);
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
    this.state = this.getStateFromProps(r, r.formData), this.props.onChange && !Se(this.state.formData, this.props.formData) && this.props.onChange(this.state), this.formElement = $m();
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
    if (!Se(this.props, r)) {
      const s = nR(this.props.formData, r.formData), a = !Se(r.schema, this.props.schema), i = s.length > 0 || !Se(r.formData, this.props.formData), o = this.getStateFromProps(
        this.props,
        this.props.formData,
        // If the `schema` has changed, we need to update the retrieved schema.
        // Or if the `formData` changes, for example in the case of a schema with dependencies that need to
        //  match one of the subSchemas, the retrieved schema must be updated.
        a || i ? void 0 : this.state.retrievedSchema,
        a,
        s
      ), l = !Se(o, n);
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
      !Se(a.formData, this.props.formData) && !Se(a.formData, n.formData) && this.props.onChange && this.props.onChange(a), this.setState(a);
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
    var L;
    const o = this.state || {}, l = "schema" in r ? r.schema : this.props.schema, u = ("uiSchema" in r ? r.uiSchema : this.props.uiSchema) || {}, c = typeof n < "u", f = "liveValidate" in r ? r.liveValidate : this.props.liveValidate, m = c && !r.noValidate && f, h = l, g = "experimental_defaultFormStateBehavior" in r ? r.experimental_defaultFormStateBehavior : this.props.experimental_defaultFormStateBehavior, b = "experimental_customMergeAllOf" in r ? r.experimental_customMergeAllOf : this.props.experimental_customMergeAllOf;
    let y = o.schemaUtils;
    (!y || y.doesSchemaUtilsDiffer(r.validator, h, g, b)) && (y = xD(r.validator, h, g, b));
    const p = y.getDefaultFormState(l, n), v = this.updateRetrievedSchema(s ?? y.retrieveSchema(l, p)), $ = () => r.noValidate || a ? { errors: [], errorSchema: {} } : r.liveValidate ? {
      errors: o.errors || [],
      errorSchema: o.errorSchema || {}
    } : {
      errors: o.schemaValidationErrors || [],
      errorSchema: o.schemaValidationErrorSchema || {}
    };
    let _, x, E = o.schemaValidationErrors, A = o.schemaValidationErrorSchema;
    if (m) {
      const W = this.validate(p, l, y, v);
      _ = W.errors, s === void 0 ? x = W.errorSchema : x = St((L = this.state) == null ? void 0 : L.errorSchema, W.errorSchema, "preventDuplicates"), E = _, A = x;
    } else {
      const W = $();
      if (_ = W.errors, x = W.errorSchema, i.length > 0) {
        const K = i.reduce((q, T) => (q[T] = void 0, q), {});
        x = A = St(W.errorSchema, K, "preventDuplicates");
      }
    }
    if (r.extraErrors) {
      const W = ps({ errorSchema: x, errors: _ }, r.extraErrors);
      x = W.errorSchema, _ = W.errors;
    }
    const U = y.toIdSchema(v, u["ui:rootFieldId"], p, r.idPrefix, r.idSeparator);
    return {
      schemaUtils: y,
      schema: l,
      uiSchema: u,
      idSchema: U,
      formData: p,
      edit: c,
      errors: _,
      errorSchema: x,
      schemaValidationErrors: E,
      schemaValidationErrorSchema: A,
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
    return HD(this, r, n);
  }
  /** Gets the previously raised customValidate errors.
   *
   * @returns the previous customValidate errors
   */
  getPreviousCustomValidateErrors() {
    const { customValidate: r, uiSchema: n } = this.props, s = this.state.formData;
    let a = {};
    if (typeof r == "function") {
      const i = r(s, _s(s), n);
      a = Ho(i);
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
    const { errors: n, errorSchema: s, schema: a, uiSchema: i } = this.state, { formContext: o } = this.props, l = le(i), u = pe("ErrorListTemplate", r, l);
    return n && n.length ? d.jsx(u, { errors: n, errorSchema: s || {}, schema: a, uiSchema: i, formContext: o, registry: r }) : null;
  }
  // Filtering errors based on your retrieved schema to only show errors for properties in the selected branch.
  filterErrorsBasedOnSchema(r, n, s) {
    const { retrievedSchema: a, schemaUtils: i } = this.state, o = n ?? a, l = i.toPathSchema(o, "", s), u = this.getFieldNames(l, s), c = zu(r, u);
    (n == null ? void 0 : n.type) !== "object" && (n == null ? void 0 : n.type) !== "array" && (c.__errors = r.__errors);
    const f = this.getPreviousCustomValidateErrors(), m = (g = [], b) => g.length === 0 ? g : g.filter((y) => !b.includes(y)), h = (g, b = {}) => (sR(g, (y, p) => {
      const v = b[p];
      un(y) || Array.isArray(y) && y.length === 0 ? delete g[p] : ce(y) && ce(v) && Array.isArray(v == null ? void 0 : v.__errors) ? g[p] = m(y.__errors, v.__errors) : typeof y == "object" && !Array.isArray(y.__errors) && h(y, b[p]);
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
    return Se(r, (s = this.state) == null ? void 0 : s.retrievedSchema) ? this.state.retrievedSchema : r;
  }
  /** Returns the registry for the form */
  getRegistry() {
    var c;
    const { translateString: r, uiSchema: n = {} } = this.props, { schemaUtils: s } = this.state, { fields: a, templates: i, widgets: o, formContext: l, translateString: u } = SM();
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
      globalUiOptions: n[jg]
    };
  }
  /** Attempts to focus on the field associated with the `error`. Uses the `property` field to compute path of the error
   * field, then, using the `idPrefix` and `idSeparator` converts that path into an id. Then the input element with that
   * id is attempted to be found using the `formElement` ref. If it is located, then it is focused.
   *
   * @param error - The error on which to focus
   */
  focusOnError(r) {
    const { idPrefix: n = "root", idSeparator: s = "_" } = this.props, { property: a } = r, i = ph(a);
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
    const { children: r, id: n, idPrefix: s, idSeparator: a, className: i = "", tagName: o, name: l, method: u, target: c, action: f, autoComplete: m, enctype: h, acceptcharset: g, acceptCharset: b, noHtml5Validate: y = !1, disabled: p, readonly: v, formContext: $, showErrorList: _ = "top", _internalFormWrapper: x } = this.props, { schema: E, uiSchema: A, formData: U, errorSchema: C, idSchema: L } = this.state, W = this.getRegistry(), { SchemaField: K } = W.fields, { SubmitButton: q } = W.templates.ButtonTemplates, T = x ? o : void 0, F = x || o || "form";
    let { [ws]: k = {} } = le(A);
    p && (k = { ...k, props: { ...k.props, disabled: !0 } });
    const z = { [on]: { [ws]: k } };
    return d.jsxs(F, { className: i || "rjsf", id: n, name: l, method: u, target: c, action: f, autoComplete: m, encType: h, acceptCharset: b || g, noValidate: y, onSubmit: this.onSubmit, as: T, ref: this.formElement, children: [_ === "top" && this.renderErrors(W), d.jsx(K, { name: "", schema: E, uiSchema: A, errorSchema: C, idSchema: L, idPrefix: s, idSeparator: a, formContext: $, formData: U, onChange: this.onChange, onBlur: this.onBlur, onFocus: this.onFocus, registry: W, disabled: p, readonly: v }), r || d.jsx(q, { uiSchema: z, registry: W }), _ === "bottom" && this.renderErrors(W)] });
  }
}
var Ai = { exports: {} }, jh = {}, _t = {}, qt = {}, qn = {}, ae = {}, Sn = {};
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
})(Sn);
var Pi = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Sn;
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
})(Pi);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Sn, r = Pi;
  var n = Sn;
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
  var s = Pi;
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
    constructor(w, S, I) {
      super(), this.varKind = w, this.name = S, this.rhs = I;
    }
    render({ es5: w, _n: S }) {
      const I = w ? r.varKinds.var : this.varKind, G = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${I} ${this.name}${G};` + S;
    }
    optimizeNames(w, S) {
      if (w[this.name.str])
        return this.rhs && (this.rhs = T(this.rhs, w, S)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class o extends a {
    constructor(w, S, I) {
      super(), this.lhs = w, this.rhs = S, this.sideEffects = I;
    }
    render({ _n: w }) {
      return `${this.lhs} = ${this.rhs};` + w;
    }
    optimizeNames(w, S) {
      if (!(this.lhs instanceof t.Name && !w[this.lhs.str] && !this.sideEffects))
        return this.rhs = T(this.rhs, w, S), this;
    }
    get names() {
      const w = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return q(w, this.rhs);
    }
  }
  class l extends o {
    constructor(w, S, I, G) {
      super(w, I, G), this.op = S;
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
      return this.code = T(this.code, w, S), this;
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
      return this.nodes.reduce((S, I) => S + I.render(w), "");
    }
    optimizeNodes() {
      const { nodes: w } = this;
      let S = w.length;
      for (; S--; ) {
        const I = w[S].optimizeNodes();
        Array.isArray(I) ? w.splice(S, 1, ...I) : I ? w[S] = I : w.splice(S, 1);
      }
      return w.length > 0 ? this : void 0;
    }
    optimizeNames(w, S) {
      const { nodes: I } = this;
      let G = I.length;
      for (; G--; ) {
        const Y = I[G];
        Y.optimizeNames(w, S) || (F(w, Y.names), I.splice(G, 1));
      }
      return I.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((w, S) => K(w, S.names), {});
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
        const I = S.optimizeNodes();
        S = this.else = Array.isArray(I) ? new y(I) : I;
      }
      if (S)
        return w === !1 ? S instanceof p ? S : S.nodes : this.nodes.length ? this : new p(k(w), S instanceof p ? [S] : S.nodes);
      if (!(w === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(w, S) {
      var I;
      if (this.else = (I = this.else) === null || I === void 0 ? void 0 : I.optimizeNames(w, S), !!(super.optimizeNames(w, S) || this.else))
        return this.condition = T(this.condition, w, S), this;
    }
    get names() {
      const w = super.names;
      return q(w, this.condition), this.else && K(w, this.else.names), w;
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
        return this.iteration = T(this.iteration, w, S), this;
    }
    get names() {
      return K(super.names, this.iteration.names);
    }
  }
  class _ extends v {
    constructor(w, S, I, G) {
      super(), this.varKind = w, this.name = S, this.from = I, this.to = G;
    }
    render(w) {
      const S = w.es5 ? r.varKinds.var : this.varKind, { name: I, from: G, to: Y } = this;
      return `for(${S} ${I}=${G}; ${I}<${Y}; ${I}++)` + super.render(w);
    }
    get names() {
      const w = q(super.names, this.from);
      return q(w, this.to);
    }
  }
  class x extends v {
    constructor(w, S, I, G) {
      super(), this.loop = w, this.varKind = S, this.name = I, this.iterable = G;
    }
    render(w) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(w);
    }
    optimizeNames(w, S) {
      if (super.optimizeNames(w, S))
        return this.iterable = T(this.iterable, w, S), this;
    }
    get names() {
      return K(super.names, this.iterable.names);
    }
  }
  class E extends g {
    constructor(w, S, I) {
      super(), this.name = w, this.args = S, this.async = I;
    }
    render(w) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(w);
    }
  }
  E.kind = "func";
  class A extends h {
    render(w) {
      return "return " + super.render(w);
    }
  }
  A.kind = "return";
  class U extends g {
    render(w) {
      let S = "try" + super.render(w);
      return this.catch && (S += this.catch.render(w)), this.finally && (S += this.finally.render(w)), S;
    }
    optimizeNodes() {
      var w, S;
      return super.optimizeNodes(), (w = this.catch) === null || w === void 0 || w.optimizeNodes(), (S = this.finally) === null || S === void 0 || S.optimizeNodes(), this;
    }
    optimizeNames(w, S) {
      var I, G;
      return super.optimizeNames(w, S), (I = this.catch) === null || I === void 0 || I.optimizeNames(w, S), (G = this.finally) === null || G === void 0 || G.optimizeNames(w, S), this;
    }
    get names() {
      const w = super.names;
      return this.catch && K(w, this.catch.names), this.finally && K(w, this.finally.names), w;
    }
  }
  class C extends g {
    constructor(w) {
      super(), this.error = w;
    }
    render(w) {
      return `catch(${this.error})` + super.render(w);
    }
  }
  C.kind = "catch";
  class L extends g {
    render(w) {
      return "finally" + super.render(w);
    }
  }
  L.kind = "finally";
  class W {
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
      const I = this._extScope.value(w, S);
      return (this._values[I.prefix] || (this._values[I.prefix] = /* @__PURE__ */ new Set())).add(I), I;
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
    _def(w, S, I, G) {
      const Y = this._scope.toName(S);
      return I !== void 0 && G && (this._constants[Y.str] = I), this._leafNode(new i(w, Y, I)), Y;
    }
    // `const` declaration (`var` in es5 mode)
    const(w, S, I) {
      return this._def(r.varKinds.const, w, S, I);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(w, S, I) {
      return this._def(r.varKinds.let, w, S, I);
    }
    // `var` declaration with optional assignment
    var(w, S, I) {
      return this._def(r.varKinds.var, w, S, I);
    }
    // assignment code
    assign(w, S, I) {
      return this._leafNode(new o(w, S, I));
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
      for (const [I, G] of w)
        S.length > 1 && S.push(","), S.push(I), (I !== G || this.opts.es5) && (S.push(":"), (0, t.addCodeArg)(S, G));
      return S.push("}"), new t._Code(S);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(w, S, I) {
      if (this._blockNode(new p(w)), S && I)
        this.code(S).else().code(I).endIf();
      else if (S)
        this.code(S).endIf();
      else if (I)
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
    forRange(w, S, I, G, Y = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const ne = this._scope.toName(w);
      return this._for(new _(Y, ne, S, I), () => G(ne));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(w, S, I, G = r.varKinds.const) {
      const Y = this._scope.toName(w);
      if (this.opts.es5) {
        const ne = S instanceof t.Name ? S : this.var("_arr", S);
        return this.forRange("_i", 0, (0, t._)`${ne}.length`, (te) => {
          this.var(Y, (0, t._)`${ne}[${te}]`), I(Y);
        });
      }
      return this._for(new x("of", G, Y, S), () => I(Y));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(w, S, I, G = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(w, (0, t._)`Object.keys(${S})`, I);
      const Y = this._scope.toName(w);
      return this._for(new x("in", G, Y, S), () => I(Y));
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
      const S = new A();
      if (this._blockNode(S), this.code(w), S.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(A);
    }
    // `try` statement
    try(w, S, I) {
      if (!S && !I)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const G = new U();
      if (this._blockNode(G), this.code(w), S) {
        const Y = this.name("e");
        this._currNode = G.catch = new C(Y), S(Y);
      }
      return I && (this._currNode = G.finally = new L(), this.code(I)), this._endBlockNode(C, L);
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
      const I = this._nodes.length - S;
      if (I < 0 || w !== void 0 && I !== w)
        throw new Error(`CodeGen: wrong number of nodes: ${I} vs ${w} expected`);
      return this._nodes.length = S, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(w, S = t.nil, I, G) {
      return this._blockNode(new E(w, S, I)), G && this.code(G).endFunc(), this;
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
      const I = this._currNode;
      if (I instanceof w || S && I instanceof S)
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
  e.CodeGen = W;
  function K(P, w) {
    for (const S in w)
      P[S] = (P[S] || 0) + (w[S] || 0);
    return P;
  }
  function q(P, w) {
    return w instanceof t._CodeOrName ? K(P, w.names) : P;
  }
  function T(P, w, S) {
    if (P instanceof t.Name)
      return I(P);
    if (!G(P))
      return P;
    return new t._Code(P._items.reduce((Y, ne) => (ne instanceof t.Name && (ne = I(ne)), ne instanceof t._Code ? Y.push(...ne._items) : Y.push(ne), Y), []));
    function I(Y) {
      const ne = S[Y.str];
      return ne === void 0 || w[Y.str] !== 1 ? Y : (delete w[Y.str], ne);
    }
    function G(Y) {
      return Y instanceof t._Code && Y._items.some((ne) => ne instanceof t.Name && w[ne.str] === 1 && S[ne.str] !== void 0);
    }
  }
  function F(P, w) {
    for (const S in w)
      P[S] = (P[S] || 0) - (w[S] || 0);
  }
  function k(P) {
    return typeof P == "boolean" || typeof P == "number" || P === null ? !P : (0, t._)`!${D(P)}`;
  }
  e.not = k;
  const z = j(e.operators.AND);
  function J(...P) {
    return P.reduce(z);
  }
  e.and = J;
  const Q = j(e.operators.OR);
  function M(...P) {
    return P.reduce(Q);
  }
  e.or = M;
  function j(P) {
    return (w, S) => w === t.nil ? S : S === t.nil ? w : (0, t._)`${D(w)} ${P} ${D(S)}`;
  }
  function D(P) {
    return P instanceof t.Name ? P : (0, t._)`(${P})`;
  }
})(ae);
var H = {};
Object.defineProperty(H, "__esModule", { value: !0 });
H.checkStrictMode = H.getErrorPath = H.Type = H.useFunc = H.setEvaluated = H.evaluatedPropsToName = H.mergeEvaluated = H.eachItem = H.unescapeJsonPointer = H.escapeJsonPointer = H.escapeFragment = H.unescapeFragment = H.schemaRefOrVal = H.schemaHasRulesButRef = H.schemaHasRules = H.checkUnknownRules = H.alwaysValidSchema = H.toHash = void 0;
const ge = ae, EM = Sn;
function OM(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
H.toHash = OM;
function NM(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Eh(e, t), !Oh(t, e.self.RULES.all));
}
H.alwaysValidSchema = NM;
function Eh(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || Ph(e, `unknown keyword: "${a}"`);
}
H.checkUnknownRules = Eh;
function Oh(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
H.schemaHasRules = Oh;
function AM(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
H.schemaHasRulesButRef = AM;
function PM({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ge._)`${r}`;
  }
  return (0, ge._)`${e}${t}${(0, ge.getProperty)(n)}`;
}
H.schemaRefOrVal = PM;
function CM(e) {
  return Nh(decodeURIComponent(e));
}
H.unescapeFragment = CM;
function TM(e) {
  return encodeURIComponent(Xo(e));
}
H.escapeFragment = TM;
function Xo(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
H.escapeJsonPointer = Xo;
function Nh(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
H.unescapeJsonPointer = Nh;
function IM(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
H.eachItem = IM;
function id({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, i, o) => {
    const l = i === void 0 ? a : i instanceof ge.Name ? (a instanceof ge.Name ? e(s, a, i) : t(s, a, i), i) : a instanceof ge.Name ? (t(s, i, a), a) : r(a, i);
    return o === ge.Name && !(l instanceof ge.Name) ? n(s, l) : l;
  };
}
H.mergeEvaluated = {
  props: id({
    mergeNames: (e, t, r) => e.if((0, ge._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, ge._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, ge._)`${r} || {}`).code((0, ge._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, ge._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, ge._)`${r} || {}`), Qo(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Ah
  }),
  items: id({
    mergeNames: (e, t, r) => e.if((0, ge._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ge._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ge._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ge._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Ah(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ge._)`{}`);
  return t !== void 0 && Qo(e, r, t), r;
}
H.evaluatedPropsToName = Ah;
function Qo(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ge._)`${t}${(0, ge.getProperty)(n)}`, !0));
}
H.setEvaluated = Qo;
const od = {};
function FM(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: od[t.code] || (od[t.code] = new EM._Code(t.code))
  });
}
H.useFunc = FM;
var Ci;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Ci || (H.Type = Ci = {}));
function kM(e, t, r) {
  if (e instanceof ge.Name) {
    const n = t === Ci.Num;
    return r ? n ? (0, ge._)`"[" + ${e} + "]"` : (0, ge._)`"['" + ${e} + "']"` : n ? (0, ge._)`"/" + ${e}` : (0, ge._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ge.getProperty)(e).toString() : "/" + Xo(e);
}
H.getErrorPath = kM;
function Ph(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
H.checkStrictMode = Ph;
var vt = {};
Object.defineProperty(vt, "__esModule", { value: !0 });
const Ue = ae, DM = {
  // validation function arguments
  data: new Ue.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Ue.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Ue.Name("instancePath"),
  parentData: new Ue.Name("parentData"),
  parentDataProperty: new Ue.Name("parentDataProperty"),
  rootData: new Ue.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Ue.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Ue.Name("vErrors"),
  // null or array of validation errors
  errors: new Ue.Name("errors"),
  // counter of validation errors
  this: new Ue.Name("this"),
  // "globals"
  self: new Ue.Name("self"),
  scope: new Ue.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Ue.Name("json"),
  jsonPos: new Ue.Name("jsonPos"),
  jsonLen: new Ue.Name("jsonLen"),
  jsonPart: new Ue.Name("jsonPart")
};
vt.default = DM;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = ae, r = H, n = vt;
  e.keywordError = {
    message: ({ keyword: y }) => (0, t.str)`must pass "${y}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: y, schemaType: p }) => p ? (0, t.str)`"${y}" keyword must be ${p} ($data)` : (0, t.str)`"${y}" keyword is invalid ($data)`
  };
  function s(y, p = e.keywordError, v, $) {
    const { it: _ } = y, { gen: x, compositeRule: E, allErrors: A } = _, U = f(y, p, v);
    $ ?? (E || A) ? l(x, U) : u(_, (0, t._)`[${U}]`);
  }
  e.reportError = s;
  function a(y, p = e.keywordError, v) {
    const { it: $ } = y, { gen: _, compositeRule: x, allErrors: E } = $, A = f(y, p, v);
    l(_, A), x || E || u($, n.default.vErrors);
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
    y.forRange("i", _, n.default.errors, (A) => {
      y.const(E, (0, t._)`${n.default.vErrors}[${A}]`), y.if((0, t._)`${E}.instancePath === undefined`, () => y.assign((0, t._)`${E}.instancePath`, (0, t.strConcat)(n.default.instancePath, x.errorPath))), y.assign((0, t._)`${E}.schemaPath`, (0, t.str)`${x.errSchemaPath}/${p}`), x.opts.verbose && (y.assign((0, t._)`${E}.schema`, v), y.assign((0, t._)`${E}.data`, $));
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
    const { keyword: _, data: x, schemaValue: E, it: A } = y, { opts: U, propertyName: C, topSchemaRef: L, schemaPath: W } = A;
    $.push([c.keyword, _], [c.params, typeof p == "function" ? p(y) : p || (0, t._)`{}`]), U.messages && $.push([c.message, typeof v == "function" ? v(y) : v]), U.verbose && $.push([c.schema, E], [c.parentSchema, (0, t._)`${L}${W}`], [n.default.data, x]), C && $.push([c.propertyName, C]);
  }
})(qn);
var ld;
function RM() {
  if (ld) return qt;
  ld = 1, Object.defineProperty(qt, "__esModule", { value: !0 }), qt.boolOrEmptySchema = qt.topBoolOrEmptySchema = void 0;
  const e = qn, t = ae, r = vt, n = {
    message: "boolean schema is false"
  };
  function s(o) {
    const { gen: l, schema: u, validateName: c } = o;
    u === !1 ? i(o, !1) : typeof u == "object" && u.$async === !0 ? l.return(r.default.data) : (l.assign((0, t._)`${c}.errors`, null), l.return(!0));
  }
  qt.topBoolOrEmptySchema = s;
  function a(o, l) {
    const { gen: u, schema: c } = o;
    c === !1 ? (u.var(l, !1), i(o)) : u.var(l, !0);
  }
  qt.boolOrEmptySchema = a;
  function i(o, l) {
    const { gen: u, data: c } = o, f = {
      gen: u,
      keyword: "false schema",
      data: c,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: o
    };
    (0, e.reportError)(f, n, void 0, l);
  }
  return qt;
}
var Ce = {}, er = {};
Object.defineProperty(er, "__esModule", { value: !0 });
er.getRules = er.isJSONType = void 0;
const MM = ["string", "number", "integer", "boolean", "null", "object", "array"], LM = new Set(MM);
function UM(e) {
  return typeof e == "string" && LM.has(e);
}
er.isJSONType = UM;
function WM() {
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
er.getRules = WM;
var Et = {};
Object.defineProperty(Et, "__esModule", { value: !0 });
Et.shouldUseRule = Et.shouldUseGroup = Et.schemaHasRulesForType = void 0;
function VM({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && Ch(e, n);
}
Et.schemaHasRulesForType = VM;
function Ch(e, t) {
  return t.rules.some((r) => Th(e, r));
}
Et.shouldUseGroup = Ch;
function Th(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
Et.shouldUseRule = Th;
Object.defineProperty(Ce, "__esModule", { value: !0 });
Ce.reportTypeError = Ce.checkDataTypes = Ce.checkDataType = Ce.coerceAndCheckDataType = Ce.getJSONTypes = Ce.getSchemaTypes = Ce.DataType = void 0;
const zM = er, qM = Et, BM = qn, se = ae, Ih = H;
var vr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(vr || (Ce.DataType = vr = {}));
function KM(e) {
  const t = Fh(e.type);
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
Ce.getSchemaTypes = KM;
function Fh(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(zM.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
Ce.getJSONTypes = Fh;
function GM(e, t) {
  const { gen: r, data: n, opts: s } = e, a = HM(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, qM.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const o = el(t, n, s.strictNumbers, vr.Wrong);
    r.if(o, () => {
      a.length ? JM(e, t, a) : tl(e);
    });
  }
  return i;
}
Ce.coerceAndCheckDataType = GM;
const kh = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function HM(e, t) {
  return t ? e.filter((r) => kh.has(r) || t === "array" && r === "array") : [];
}
function JM(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, se._)`typeof ${s}`), o = n.let("coerced", (0, se._)`undefined`);
  a.coerceTypes === "array" && n.if((0, se._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, se._)`${s}[0]`).assign(i, (0, se._)`typeof ${s}`).if(el(t, s, a.strictNumbers), () => n.assign(o, s))), n.if((0, se._)`${o} !== undefined`);
  for (const u of r)
    (kh.has(u) || u === "array" && a.coerceTypes === "array") && l(u);
  n.else(), tl(e), n.endIf(), n.if((0, se._)`${o} !== undefined`, () => {
    n.assign(s, o), YM(e, o);
  });
  function l(u) {
    switch (u) {
      case "string":
        n.elseIf((0, se._)`${i} == "number" || ${i} == "boolean"`).assign(o, (0, se._)`"" + ${s}`).elseIf((0, se._)`${s} === null`).assign(o, (0, se._)`""`);
        return;
      case "number":
        n.elseIf((0, se._)`${i} == "boolean" || ${s} === null
              || (${i} == "string" && ${s} && ${s} == +${s})`).assign(o, (0, se._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, se._)`${i} === "boolean" || ${s} === null
              || (${i} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(o, (0, se._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, se._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(o, !1).elseIf((0, se._)`${s} === "true" || ${s} === 1`).assign(o, !0);
        return;
      case "null":
        n.elseIf((0, se._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(o, null);
        return;
      case "array":
        n.elseIf((0, se._)`${i} === "string" || ${i} === "number"
              || ${i} === "boolean" || ${s} === null`).assign(o, (0, se._)`[${s}]`);
    }
  }
}
function YM({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, se._)`${t} !== undefined`, () => e.assign((0, se._)`${t}[${r}]`, n));
}
function Ti(e, t, r, n = vr.Correct) {
  const s = n === vr.Correct ? se.operators.EQ : se.operators.NEQ;
  let a;
  switch (e) {
    case "null":
      return (0, se._)`${t} ${s} null`;
    case "array":
      a = (0, se._)`Array.isArray(${t})`;
      break;
    case "object":
      a = (0, se._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      a = i((0, se._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = i();
      break;
    default:
      return (0, se._)`typeof ${t} ${s} ${e}`;
  }
  return n === vr.Correct ? a : (0, se.not)(a);
  function i(o = se.nil) {
    return (0, se.and)((0, se._)`typeof ${t} == "number"`, o, r ? (0, se._)`isFinite(${t})` : se.nil);
  }
}
Ce.checkDataType = Ti;
function el(e, t, r, n) {
  if (e.length === 1)
    return Ti(e[0], t, r, n);
  let s;
  const a = (0, Ih.toHash)(e);
  if (a.array && a.object) {
    const i = (0, se._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, se._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = se.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, se.and)(s, Ti(i, t, r, n));
  return s;
}
Ce.checkDataTypes = el;
const ZM = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, se._)`{type: ${e}}` : (0, se._)`{type: ${t}}`
};
function tl(e) {
  const t = XM(e);
  (0, BM.reportError)(t, ZM);
}
Ce.reportTypeError = tl;
function XM(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, Ih.schemaRefOrVal)(e, n, "type");
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
var en = {}, cd;
function QM() {
  if (cd) return en;
  cd = 1, Object.defineProperty(en, "__esModule", { value: !0 }), en.assignDefaults = void 0;
  const e = ae, t = H;
  function r(s, a) {
    const { properties: i, items: o } = s.schema;
    if (a === "object" && i)
      for (const l in i)
        n(s, l, i[l].default);
    else a === "array" && Array.isArray(o) && o.forEach((l, u) => n(s, u, l.default));
  }
  en.assignDefaults = r;
  function n(s, a, i) {
    const { gen: o, compositeRule: l, data: u, opts: c } = s;
    if (i === void 0)
      return;
    const f = (0, e._)`${u}${(0, e.getProperty)(a)}`;
    if (l) {
      (0, t.checkStrictMode)(s, `default is ignored for: ${f}`);
      return;
    }
    let m = (0, e._)`${f} === undefined`;
    c.useDefaults === "empty" && (m = (0, e._)`${m} || ${f} === null || ${f} === ""`), o.if(m, (0, e._)`${f} = ${(0, e.stringify)(i)}`);
  }
  return en;
}
var tt = {}, ie = {};
Object.defineProperty(ie, "__esModule", { value: !0 });
ie.validateUnion = ie.validateArray = ie.usePattern = ie.callValidateCode = ie.schemaProperties = ie.allSchemaProperties = ie.noPropertyInData = ie.propertyInData = ie.isOwnProperty = ie.hasPropFunc = ie.reportMissingProp = ie.checkMissingProp = ie.checkReportMissingProp = void 0;
const je = ae, rl = H, kt = vt, e4 = H;
function t4(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(sl(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, je._)`${t}` }, !0), e.error();
  });
}
ie.checkReportMissingProp = t4;
function r4({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, je.or)(...n.map((a) => (0, je.and)(sl(e, t, a, r.ownProperties), (0, je._)`${s} = ${a}`)));
}
ie.checkMissingProp = r4;
function n4(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ie.reportMissingProp = n4;
function Dh(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, je._)`Object.prototype.hasOwnProperty`
  });
}
ie.hasPropFunc = Dh;
function nl(e, t, r) {
  return (0, je._)`${Dh(e)}.call(${t}, ${r})`;
}
ie.isOwnProperty = nl;
function s4(e, t, r, n) {
  const s = (0, je._)`${t}${(0, je.getProperty)(r)} !== undefined`;
  return n ? (0, je._)`${s} && ${nl(e, t, r)}` : s;
}
ie.propertyInData = s4;
function sl(e, t, r, n) {
  const s = (0, je._)`${t}${(0, je.getProperty)(r)} === undefined`;
  return n ? (0, je.or)(s, (0, je.not)(nl(e, t, r))) : s;
}
ie.noPropertyInData = sl;
function Rh(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ie.allSchemaProperties = Rh;
function a4(e, t) {
  return Rh(t).filter((r) => !(0, rl.alwaysValidSchema)(e, t[r]));
}
ie.schemaProperties = a4;
function i4({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: i }, o, l, u) {
  const c = u ? (0, je._)`${e}, ${t}, ${n}${s}` : t, f = [
    [kt.default.instancePath, (0, je.strConcat)(kt.default.instancePath, a)],
    [kt.default.parentData, i.parentData],
    [kt.default.parentDataProperty, i.parentDataProperty],
    [kt.default.rootData, kt.default.rootData]
  ];
  i.opts.dynamicRef && f.push([kt.default.dynamicAnchors, kt.default.dynamicAnchors]);
  const m = (0, je._)`${c}, ${r.object(...f)}`;
  return l !== je.nil ? (0, je._)`${o}.call(${l}, ${m})` : (0, je._)`${o}(${m})`;
}
ie.callValidateCode = i4;
const o4 = (0, je._)`new RegExp`;
function l4({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, je._)`${s.code === "new RegExp" ? o4 : (0, e4.useFunc)(e, s)}(${r}, ${n})`
  });
}
ie.usePattern = l4;
function c4(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const o = t.let("valid", !0);
    return i(() => t.assign(o, !1)), o;
  }
  return t.var(a, !0), i(() => t.break()), a;
  function i(o) {
    const l = t.const("len", (0, je._)`${r}.length`);
    t.forRange("i", 0, l, (u) => {
      e.subschema({
        keyword: n,
        dataProp: u,
        dataPropType: rl.Type.Num
      }, a), t.if((0, je.not)(a), o);
    });
  }
}
ie.validateArray = c4;
function u4(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((l) => (0, rl.alwaysValidSchema)(s, l)) && !s.opts.unevaluated)
    return;
  const i = t.let("valid", !1), o = t.name("_valid");
  t.block(() => r.forEach((l, u) => {
    const c = e.subschema({
      keyword: n,
      schemaProp: u,
      compositeRule: !0
    }, o);
    t.assign(i, (0, je._)`${i} || ${o}`), e.mergeValidEvaluated(c, o) || t.if((0, je.not)(i));
  })), e.result(i, () => e.reset(), () => e.error(!0));
}
ie.validateUnion = u4;
var ud;
function d4() {
  if (ud) return tt;
  ud = 1, Object.defineProperty(tt, "__esModule", { value: !0 }), tt.validateKeywordUsage = tt.validSchemaType = tt.funcKeywordCode = tt.macroKeywordCode = void 0;
  const e = ae, t = vt, r = ie, n = qn;
  function s(m, h) {
    const { gen: g, keyword: b, schema: y, parentSchema: p, it: v } = m, $ = h.macro.call(v.self, y, p, v), _ = u(g, b, $);
    v.opts.validateSchema !== !1 && v.self.validateSchema($, !0);
    const x = g.name("valid");
    m.subschema({
      schema: $,
      schemaPath: e.nil,
      errSchemaPath: `${v.errSchemaPath}/${b}`,
      topSchemaRef: _,
      compositeRule: !0
    }, x), m.pass(x, () => m.error(!0));
  }
  tt.macroKeywordCode = s;
  function a(m, h) {
    var g;
    const { gen: b, keyword: y, schema: p, parentSchema: v, $data: $, it: _ } = m;
    l(_, h);
    const x = !$ && h.compile ? h.compile.call(_.self, p, v, _) : h.validate, E = u(b, y, x), A = b.let("valid");
    m.block$data(A, U), m.ok((g = h.valid) !== null && g !== void 0 ? g : A);
    function U() {
      if (h.errors === !1)
        W(), h.modifying && i(m), K(() => m.error());
      else {
        const q = h.async ? C() : L();
        h.modifying && i(m), K(() => o(m, q));
      }
    }
    function C() {
      const q = b.let("ruleErrs", null);
      return b.try(() => W((0, e._)`await `), (T) => b.assign(A, !1).if((0, e._)`${T} instanceof ${_.ValidationError}`, () => b.assign(q, (0, e._)`${T}.errors`), () => b.throw(T))), q;
    }
    function L() {
      const q = (0, e._)`${E}.errors`;
      return b.assign(q, null), W(e.nil), q;
    }
    function W(q = h.async ? (0, e._)`await ` : e.nil) {
      const T = _.opts.passContext ? t.default.this : t.default.self, F = !("compile" in h && !$ || h.schema === !1);
      b.assign(A, (0, e._)`${q}${(0, r.callValidateCode)(m, E, T, F)}`, h.modifying);
    }
    function K(q) {
      var T;
      b.if((0, e.not)((T = h.valid) !== null && T !== void 0 ? T : A), q);
    }
  }
  tt.funcKeywordCode = a;
  function i(m) {
    const { gen: h, data: g, it: b } = m;
    h.if(b.parentData, () => h.assign(g, (0, e._)`${b.parentData}[${b.parentDataProperty}]`));
  }
  function o(m, h) {
    const { gen: g } = m;
    g.if((0, e._)`Array.isArray(${h})`, () => {
      g.assign(t.default.vErrors, (0, e._)`${t.default.vErrors} === null ? ${h} : ${t.default.vErrors}.concat(${h})`).assign(t.default.errors, (0, e._)`${t.default.vErrors}.length`), (0, n.extendErrors)(m);
    }, () => m.error());
  }
  function l({ schemaEnv: m }, h) {
    if (h.async && !m.$async)
      throw new Error("async keyword in sync schema");
  }
  function u(m, h, g) {
    if (g === void 0)
      throw new Error(`keyword "${h}" failed to compile`);
    return m.scopeValue("keyword", typeof g == "function" ? { ref: g } : { ref: g, code: (0, e.stringify)(g) });
  }
  function c(m, h, g = !1) {
    return !h.length || h.some((b) => b === "array" ? Array.isArray(m) : b === "object" ? m && typeof m == "object" && !Array.isArray(m) : typeof m == b || g && typeof m > "u");
  }
  tt.validSchemaType = c;
  function f({ schema: m, opts: h, self: g, errSchemaPath: b }, y, p) {
    if (Array.isArray(y.keyword) ? !y.keyword.includes(p) : y.keyword !== p)
      throw new Error("ajv implementation error");
    const v = y.dependencies;
    if (v != null && v.some(($) => !Object.prototype.hasOwnProperty.call(m, $)))
      throw new Error(`parent schema must have dependencies of ${p}: ${v.join(",")}`);
    if (y.validateSchema && !y.validateSchema(m[p])) {
      const _ = `keyword "${p}" value is invalid at path "${b}": ` + g.errorsText(y.validateSchema.errors);
      if (h.validateSchema === "log")
        g.logger.error(_);
      else
        throw new Error(_);
    }
  }
  return tt.validateKeywordUsage = f, tt;
}
var xt = {}, dd;
function f4() {
  if (dd) return xt;
  dd = 1, Object.defineProperty(xt, "__esModule", { value: !0 }), xt.extendSubschemaMode = xt.extendSubschemaData = xt.getSubschema = void 0;
  const e = ae, t = H;
  function r(a, { keyword: i, schemaProp: o, schema: l, schemaPath: u, errSchemaPath: c, topSchemaRef: f }) {
    if (i !== void 0 && l !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (i !== void 0) {
      const m = a.schema[i];
      return o === void 0 ? {
        schema: m,
        schemaPath: (0, e._)`${a.schemaPath}${(0, e.getProperty)(i)}`,
        errSchemaPath: `${a.errSchemaPath}/${i}`
      } : {
        schema: m[o],
        schemaPath: (0, e._)`${a.schemaPath}${(0, e.getProperty)(i)}${(0, e.getProperty)(o)}`,
        errSchemaPath: `${a.errSchemaPath}/${i}/${(0, t.escapeFragment)(o)}`
      };
    }
    if (l !== void 0) {
      if (u === void 0 || c === void 0 || f === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: l,
        schemaPath: u,
        topSchemaRef: f,
        errSchemaPath: c
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  xt.getSubschema = r;
  function n(a, i, { dataProp: o, dataPropType: l, data: u, dataTypes: c, propertyName: f }) {
    if (u !== void 0 && o !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: m } = i;
    if (o !== void 0) {
      const { errorPath: g, dataPathArr: b, opts: y } = i, p = m.let("data", (0, e._)`${i.data}${(0, e.getProperty)(o)}`, !0);
      h(p), a.errorPath = (0, e.str)`${g}${(0, t.getErrorPath)(o, l, y.jsPropertySyntax)}`, a.parentDataProperty = (0, e._)`${o}`, a.dataPathArr = [...b, a.parentDataProperty];
    }
    if (u !== void 0) {
      const g = u instanceof e.Name ? u : m.let("data", u, !0);
      h(g), f !== void 0 && (a.propertyName = f);
    }
    c && (a.dataTypes = c);
    function h(g) {
      a.data = g, a.dataLevel = i.dataLevel + 1, a.dataTypes = [], i.definedProperties = /* @__PURE__ */ new Set(), a.parentData = i.data, a.dataNames = [...i.dataNames, g];
    }
  }
  xt.extendSubschemaData = n;
  function s(a, { jtdDiscriminator: i, jtdMetadata: o, compositeRule: l, createErrors: u, allErrors: c }) {
    l !== void 0 && (a.compositeRule = l), u !== void 0 && (a.createErrors = u), c !== void 0 && (a.allErrors = c), a.jtdDiscriminator = i, a.jtdMetadata = o;
  }
  return xt.extendSubschemaMode = s, xt;
}
var Re = {}, Mh = function e(t, r) {
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
}, Lh = { exports: {} }, Lt = Lh.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  gs(t, n, s, e, "", e);
};
Lt.keywords = {
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
Lt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Lt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Lt.skipKeywords = {
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
function gs(e, t, r, n, s, a, i, o, l, u) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, i, o, l, u);
    for (var c in n) {
      var f = n[c];
      if (Array.isArray(f)) {
        if (c in Lt.arrayKeywords)
          for (var m = 0; m < f.length; m++)
            gs(e, t, r, f[m], s + "/" + c + "/" + m, a, s, c, n, m);
      } else if (c in Lt.propsKeywords) {
        if (f && typeof f == "object")
          for (var h in f)
            gs(e, t, r, f[h], s + "/" + c + "/" + p4(h), a, s, c, n, h);
      } else (c in Lt.keywords || e.allKeys && !(c in Lt.skipKeywords)) && gs(e, t, r, f, s + "/" + c, a, s, c, n);
    }
    r(n, s, a, i, o, l, u);
  }
}
function p4(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var h4 = Lh.exports;
Object.defineProperty(Re, "__esModule", { value: !0 });
Re.getSchemaRefs = Re.resolveUrl = Re.normalizeId = Re._getFullPath = Re.getFullPath = Re.inlineRef = void 0;
const m4 = H, g4 = Mh, y4 = h4, v4 = /* @__PURE__ */ new Set([
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
function b4(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Ii(e) : t ? Uh(e) <= t : !1;
}
Re.inlineRef = b4;
const $4 = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Ii(e) {
  for (const t in e) {
    if ($4.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Ii) || typeof r == "object" && Ii(r))
      return !0;
  }
  return !1;
}
function Uh(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !v4.has(r) && (typeof e[r] == "object" && (0, m4.eachItem)(e[r], (n) => t += Uh(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function Wh(e, t = "", r) {
  r !== !1 && (t = br(t));
  const n = e.parse(t);
  return Vh(e, n);
}
Re.getFullPath = Wh;
function Vh(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Re._getFullPath = Vh;
const w4 = /#\/?$/;
function br(e) {
  return e ? e.replace(w4, "") : "";
}
Re.normalizeId = br;
function _4(e, t, r) {
  return r = br(r), e.resolve(t, r);
}
Re.resolveUrl = _4;
const x4 = /^[a-z_][-a-z0-9._]*$/i;
function S4(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = br(e[r] || t), a = { "": s }, i = Wh(n, s, !1), o = {}, l = /* @__PURE__ */ new Set();
  return y4(e, { allKeys: !0 }, (f, m, h, g) => {
    if (g === void 0)
      return;
    const b = i + m;
    let y = a[g];
    typeof f[r] == "string" && (y = p.call(this, f[r])), v.call(this, f.$anchor), v.call(this, f.$dynamicAnchor), a[m] = y;
    function p($) {
      const _ = this.opts.uriResolver.resolve;
      if ($ = br(y ? _(y, $) : $), l.has($))
        throw c($);
      l.add($);
      let x = this.refs[$];
      return typeof x == "string" && (x = this.refs[x]), typeof x == "object" ? u(f, x.schema, $) : $ !== br(b) && ($[0] === "#" ? (u(f, o[$], $), o[$] = f) : this.refs[$] = b), $;
    }
    function v($) {
      if (typeof $ == "string") {
        if (!x4.test($))
          throw new Error(`invalid anchor "${$}"`);
        p.call(this, `#${$}`);
      }
    }
  }), o;
  function u(f, m, h) {
    if (m !== void 0 && !g4(f, m))
      throw c(h);
  }
  function c(f) {
    return new Error(`reference "${f}" resolves to more than one schema`);
  }
}
Re.getSchemaRefs = S4;
var fd;
function Ea() {
  if (fd) return _t;
  fd = 1, Object.defineProperty(_t, "__esModule", { value: !0 }), _t.getData = _t.KeywordCxt = _t.validateFunctionCode = void 0;
  const e = RM(), t = Ce, r = Et, n = Ce, s = QM(), a = d4(), i = f4(), o = ae, l = vt, u = Re, c = H, f = qn;
  function m(O) {
    if (x(O) && (A(O), _(O))) {
      y(O);
      return;
    }
    h(O, () => (0, e.topBoolOrEmptySchema)(O));
  }
  _t.validateFunctionCode = m;
  function h({ gen: O, validateName: N, schema: R, schemaEnv: V, opts: B }, ee) {
    B.code.es5 ? O.func(N, (0, o._)`${l.default.data}, ${l.default.valCxt}`, V.$async, () => {
      O.code((0, o._)`"use strict"; ${v(R, B)}`), b(O, B), O.code(ee);
    }) : O.func(N, (0, o._)`${l.default.data}, ${g(B)}`, V.$async, () => O.code(v(R, B)).code(ee));
  }
  function g(O) {
    return (0, o._)`{${l.default.instancePath}="", ${l.default.parentData}, ${l.default.parentDataProperty}, ${l.default.rootData}=${l.default.data}${O.dynamicRef ? (0, o._)`, ${l.default.dynamicAnchors}={}` : o.nil}}={}`;
  }
  function b(O, N) {
    O.if(l.default.valCxt, () => {
      O.var(l.default.instancePath, (0, o._)`${l.default.valCxt}.${l.default.instancePath}`), O.var(l.default.parentData, (0, o._)`${l.default.valCxt}.${l.default.parentData}`), O.var(l.default.parentDataProperty, (0, o._)`${l.default.valCxt}.${l.default.parentDataProperty}`), O.var(l.default.rootData, (0, o._)`${l.default.valCxt}.${l.default.rootData}`), N.dynamicRef && O.var(l.default.dynamicAnchors, (0, o._)`${l.default.valCxt}.${l.default.dynamicAnchors}`);
    }, () => {
      O.var(l.default.instancePath, (0, o._)`""`), O.var(l.default.parentData, (0, o._)`undefined`), O.var(l.default.parentDataProperty, (0, o._)`undefined`), O.var(l.default.rootData, l.default.data), N.dynamicRef && O.var(l.default.dynamicAnchors, (0, o._)`{}`);
    });
  }
  function y(O) {
    const { schema: N, opts: R, gen: V } = O;
    h(O, () => {
      R.$comment && N.$comment && q(O), L(O), V.let(l.default.vErrors, null), V.let(l.default.errors, 0), R.unevaluated && p(O), U(O), T(O);
    });
  }
  function p(O) {
    const { gen: N, validateName: R } = O;
    O.evaluated = N.const("evaluated", (0, o._)`${R}.evaluated`), N.if((0, o._)`${O.evaluated}.dynamicProps`, () => N.assign((0, o._)`${O.evaluated}.props`, (0, o._)`undefined`)), N.if((0, o._)`${O.evaluated}.dynamicItems`, () => N.assign((0, o._)`${O.evaluated}.items`, (0, o._)`undefined`));
  }
  function v(O, N) {
    const R = typeof O == "object" && O[N.schemaId];
    return R && (N.code.source || N.code.process) ? (0, o._)`/*# sourceURL=${R} */` : o.nil;
  }
  function $(O, N) {
    if (x(O) && (A(O), _(O))) {
      E(O, N);
      return;
    }
    (0, e.boolOrEmptySchema)(O, N);
  }
  function _({ schema: O, self: N }) {
    if (typeof O == "boolean")
      return !O;
    for (const R in O)
      if (N.RULES.all[R])
        return !0;
    return !1;
  }
  function x(O) {
    return typeof O.schema != "boolean";
  }
  function E(O, N) {
    const { schema: R, gen: V, opts: B } = O;
    B.$comment && R.$comment && q(O), W(O), K(O);
    const ee = V.const("_errs", l.default.errors);
    U(O, ee), V.var(N, (0, o._)`${ee} === ${l.default.errors}`);
  }
  function A(O) {
    (0, c.checkUnknownRules)(O), C(O);
  }
  function U(O, N) {
    if (O.opts.jtd)
      return k(O, [], !1, N);
    const R = (0, t.getSchemaTypes)(O.schema), V = (0, t.coerceAndCheckDataType)(O, R);
    k(O, R, !V, N);
  }
  function C(O) {
    const { schema: N, errSchemaPath: R, opts: V, self: B } = O;
    N.$ref && V.ignoreKeywordsWithRef && (0, c.schemaHasRulesButRef)(N, B.RULES) && B.logger.warn(`$ref: keywords ignored in schema at path "${R}"`);
  }
  function L(O) {
    const { schema: N, opts: R } = O;
    N.default !== void 0 && R.useDefaults && R.strictSchema && (0, c.checkStrictMode)(O, "default is ignored in the schema root");
  }
  function W(O) {
    const N = O.schema[O.opts.schemaId];
    N && (O.baseId = (0, u.resolveUrl)(O.opts.uriResolver, O.baseId, N));
  }
  function K(O) {
    if (O.schema.$async && !O.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function q({ gen: O, schemaEnv: N, schema: R, errSchemaPath: V, opts: B }) {
    const ee = R.$comment;
    if (B.$comment === !0)
      O.code((0, o._)`${l.default.self}.logger.log(${ee})`);
    else if (typeof B.$comment == "function") {
      const Ee = (0, o.str)`${V}/$comment`, Me = O.scopeValue("root", { ref: N.root });
      O.code((0, o._)`${l.default.self}.opts.$comment(${ee}, ${Ee}, ${Me}.schema)`);
    }
  }
  function T(O) {
    const { gen: N, schemaEnv: R, validateName: V, ValidationError: B, opts: ee } = O;
    R.$async ? N.if((0, o._)`${l.default.errors} === 0`, () => N.return(l.default.data), () => N.throw((0, o._)`new ${B}(${l.default.vErrors})`)) : (N.assign((0, o._)`${V}.errors`, l.default.vErrors), ee.unevaluated && F(O), N.return((0, o._)`${l.default.errors} === 0`));
  }
  function F({ gen: O, evaluated: N, props: R, items: V }) {
    R instanceof o.Name && O.assign((0, o._)`${N}.props`, R), V instanceof o.Name && O.assign((0, o._)`${N}.items`, V);
  }
  function k(O, N, R, V) {
    const { gen: B, schema: ee, data: Ee, allErrors: Me, opts: Ae, self: Le } = O, { RULES: Pe } = Le;
    if (ee.$ref && (Ae.ignoreKeywordsWithRef || !(0, c.schemaHasRulesButRef)(ee, Pe))) {
      B.block(() => G(O, "$ref", Pe.all.$ref.definition));
      return;
    }
    Ae.jtd || J(O, N), B.block(() => {
      for (const ue of Pe.rules)
        X(ue);
      X(Pe.post);
    });
    function X(ue) {
      (0, r.shouldUseGroup)(ee, ue) && (ue.type ? (B.if((0, n.checkDataType)(ue.type, Ee, Ae.strictNumbers)), z(O, ue), N.length === 1 && N[0] === ue.type && R && (B.else(), (0, n.reportTypeError)(O)), B.endIf()) : z(O, ue), Me || B.if((0, o._)`${l.default.errors} === ${V || 0}`));
    }
  }
  function z(O, N) {
    const { gen: R, schema: V, opts: { useDefaults: B } } = O;
    B && (0, s.assignDefaults)(O, N.type), R.block(() => {
      for (const ee of N.rules)
        (0, r.shouldUseRule)(V, ee) && G(O, ee.keyword, ee.definition, N.type);
    });
  }
  function J(O, N) {
    O.schemaEnv.meta || !O.opts.strictTypes || (Q(O, N), O.opts.allowUnionTypes || M(O, N), j(O, O.dataTypes));
  }
  function Q(O, N) {
    if (N.length) {
      if (!O.dataTypes.length) {
        O.dataTypes = N;
        return;
      }
      N.forEach((R) => {
        P(O.dataTypes, R) || S(O, `type "${R}" not allowed by context "${O.dataTypes.join(",")}"`);
      }), w(O, N);
    }
  }
  function M(O, N) {
    N.length > 1 && !(N.length === 2 && N.includes("null")) && S(O, "use allowUnionTypes to allow union type keyword");
  }
  function j(O, N) {
    const R = O.self.RULES.all;
    for (const V in R) {
      const B = R[V];
      if (typeof B == "object" && (0, r.shouldUseRule)(O.schema, B)) {
        const { type: ee } = B.definition;
        ee.length && !ee.some((Ee) => D(N, Ee)) && S(O, `missing type "${ee.join(",")}" for keyword "${V}"`);
      }
    }
  }
  function D(O, N) {
    return O.includes(N) || N === "number" && O.includes("integer");
  }
  function P(O, N) {
    return O.includes(N) || N === "integer" && O.includes("number");
  }
  function w(O, N) {
    const R = [];
    for (const V of O.dataTypes)
      P(N, V) ? R.push(V) : N.includes("integer") && V === "number" && R.push("integer");
    O.dataTypes = R;
  }
  function S(O, N) {
    const R = O.schemaEnv.baseId + O.errSchemaPath;
    N += ` at "${R}" (strictTypes)`, (0, c.checkStrictMode)(O, N, O.opts.strictTypes);
  }
  class I {
    constructor(N, R, V) {
      if ((0, a.validateKeywordUsage)(N, R, V), this.gen = N.gen, this.allErrors = N.allErrors, this.keyword = V, this.data = N.data, this.schema = N.schema[V], this.$data = R.$data && N.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, c.schemaRefOrVal)(N, this.schema, V, this.$data), this.schemaType = R.schemaType, this.parentSchema = N.schema, this.params = {}, this.it = N, this.def = R, this.$data)
        this.schemaCode = N.gen.const("vSchema", te(this.$data, N));
      else if (this.schemaCode = this.schemaValue, !(0, a.validSchemaType)(this.schema, R.schemaType, R.allowUndefined))
        throw new Error(`${V} value must be ${JSON.stringify(R.schemaType)}`);
      ("code" in R ? R.trackErrors : R.errors !== !1) && (this.errsCount = N.gen.const("_errs", l.default.errors));
    }
    result(N, R, V) {
      this.failResult((0, o.not)(N), R, V);
    }
    failResult(N, R, V) {
      this.gen.if(N), V ? V() : this.error(), R ? (this.gen.else(), R(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(N, R) {
      this.failResult((0, o.not)(N), void 0, R);
    }
    fail(N) {
      if (N === void 0) {
        this.error(), this.allErrors || this.gen.if(!1);
        return;
      }
      this.gen.if(N), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    fail$data(N) {
      if (!this.$data)
        return this.fail(N);
      const { schemaCode: R } = this;
      this.fail((0, o._)`${R} !== undefined && (${(0, o.or)(this.invalid$data(), N)})`);
    }
    error(N, R, V) {
      if (R) {
        this.setParams(R), this._error(N, V), this.setParams({});
        return;
      }
      this._error(N, V);
    }
    _error(N, R) {
      (N ? f.reportExtraError : f.reportError)(this, this.def.error, R);
    }
    $dataError() {
      (0, f.reportError)(this, this.def.$dataError || f.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, f.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(N) {
      this.allErrors || this.gen.if(N);
    }
    setParams(N, R) {
      R ? Object.assign(this.params, N) : this.params = N;
    }
    block$data(N, R, V = o.nil) {
      this.gen.block(() => {
        this.check$data(N, V), R();
      });
    }
    check$data(N = o.nil, R = o.nil) {
      if (!this.$data)
        return;
      const { gen: V, schemaCode: B, schemaType: ee, def: Ee } = this;
      V.if((0, o.or)((0, o._)`${B} === undefined`, R)), N !== o.nil && V.assign(N, !0), (ee.length || Ee.validateSchema) && (V.elseIf(this.invalid$data()), this.$dataError(), N !== o.nil && V.assign(N, !1)), V.else();
    }
    invalid$data() {
      const { gen: N, schemaCode: R, schemaType: V, def: B, it: ee } = this;
      return (0, o.or)(Ee(), Me());
      function Ee() {
        if (V.length) {
          if (!(R instanceof o.Name))
            throw new Error("ajv implementation error");
          const Ae = Array.isArray(V) ? V : [V];
          return (0, o._)`${(0, n.checkDataTypes)(Ae, R, ee.opts.strictNumbers, n.DataType.Wrong)}`;
        }
        return o.nil;
      }
      function Me() {
        if (B.validateSchema) {
          const Ae = N.scopeValue("validate$data", { ref: B.validateSchema });
          return (0, o._)`!${Ae}(${R})`;
        }
        return o.nil;
      }
    }
    subschema(N, R) {
      const V = (0, i.getSubschema)(this.it, N);
      (0, i.extendSubschemaData)(V, this.it, N), (0, i.extendSubschemaMode)(V, N);
      const B = { ...this.it, ...V, items: void 0, props: void 0 };
      return $(B, R), B;
    }
    mergeEvaluated(N, R) {
      const { it: V, gen: B } = this;
      V.opts.unevaluated && (V.props !== !0 && N.props !== void 0 && (V.props = c.mergeEvaluated.props(B, N.props, V.props, R)), V.items !== !0 && N.items !== void 0 && (V.items = c.mergeEvaluated.items(B, N.items, V.items, R)));
    }
    mergeValidEvaluated(N, R) {
      const { it: V, gen: B } = this;
      if (V.opts.unevaluated && (V.props !== !0 || V.items !== !0))
        return B.if(R, () => this.mergeEvaluated(N, o.Name)), !0;
    }
  }
  _t.KeywordCxt = I;
  function G(O, N, R, V) {
    const B = new I(O, R, N);
    "code" in R ? R.code(B, V) : B.$data && R.validate ? (0, a.funcKeywordCode)(B, R) : "macro" in R ? (0, a.macroKeywordCode)(B, R) : (R.compile || R.validate) && (0, a.funcKeywordCode)(B, R);
  }
  const Y = /^\/(?:[^~]|~0|~1)*$/, ne = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function te(O, { dataLevel: N, dataNames: R, dataPathArr: V }) {
    let B, ee;
    if (O === "")
      return l.default.rootData;
    if (O[0] === "/") {
      if (!Y.test(O))
        throw new Error(`Invalid JSON-pointer: ${O}`);
      B = O, ee = l.default.rootData;
    } else {
      const Le = ne.exec(O);
      if (!Le)
        throw new Error(`Invalid JSON-pointer: ${O}`);
      const Pe = +Le[1];
      if (B = Le[2], B === "#") {
        if (Pe >= N)
          throw new Error(Ae("property/index", Pe));
        return V[N - Pe];
      }
      if (Pe > N)
        throw new Error(Ae("data", Pe));
      if (ee = R[N - Pe], !B)
        return ee;
    }
    let Ee = ee;
    const Me = B.split("/");
    for (const Le of Me)
      Le && (ee = (0, o._)`${ee}${(0, o.getProperty)((0, c.unescapeJsonPointer)(Le))}`, Ee = (0, o._)`${Ee} && ${ee}`);
    return Ee;
    function Ae(Le, Pe) {
      return `Cannot access ${Le} ${Pe} levels up, current level is ${N}`;
    }
  }
  return _t.getData = te, _t;
}
var Bn = {};
Object.defineProperty(Bn, "__esModule", { value: !0 });
class j4 extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
Bn.default = j4;
var Br = {};
Object.defineProperty(Br, "__esModule", { value: !0 });
const ni = Re;
class E4 extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, ni.resolveUrl)(t, r, n), this.missingSchema = (0, ni.normalizeId)((0, ni.getFullPath)(t, this.missingRef));
  }
}
Br.default = E4;
var qe = {};
Object.defineProperty(qe, "__esModule", { value: !0 });
qe.resolveSchema = qe.getCompilingSchema = qe.resolveRef = qe.compileSchema = qe.SchemaEnv = void 0;
const rt = ae, O4 = Bn, Bt = vt, at = Re, pd = H, N4 = Ea();
class Oa {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, at.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
qe.SchemaEnv = Oa;
function al(e) {
  const t = zh.call(this, e);
  if (t)
    return t;
  const r = (0, at.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new rt.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let o;
  e.$async && (o = i.scopeValue("Error", {
    ref: O4.default,
    code: (0, rt._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const l = i.scopeName("validate");
  e.validateName = l;
  const u = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: Bt.default.data,
    parentData: Bt.default.parentData,
    parentDataProperty: Bt.default.parentDataProperty,
    dataNames: [Bt.default.data],
    dataPathArr: [rt.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: i.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, rt.stringify)(e.schema) } : { ref: e.schema }),
    validateName: l,
    ValidationError: o,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: rt.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, rt._)`""`,
    opts: this.opts,
    self: this
  };
  let c;
  try {
    this._compilations.add(e), (0, N4.validateFunctionCode)(u), i.optimize(this.opts.code.optimize);
    const f = i.toString();
    c = `${i.scopeRefs(Bt.default.scope)}return ${f}`, this.opts.code.process && (c = this.opts.code.process(c, e));
    const h = new Function(`${Bt.default.self}`, `${Bt.default.scope}`, c)(this, this.scope.get());
    if (this.scope.value(l, { ref: h }), h.errors = null, h.schema = e.schema, h.schemaEnv = e, e.$async && (h.$async = !0), this.opts.code.source === !0 && (h.source = { validateName: l, validateCode: f, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: g, items: b } = u;
      h.evaluated = {
        props: g instanceof rt.Name ? void 0 : g,
        items: b instanceof rt.Name ? void 0 : b,
        dynamicProps: g instanceof rt.Name,
        dynamicItems: b instanceof rt.Name
      }, h.source && (h.source.evaluated = (0, rt.stringify)(h.evaluated));
    }
    return e.validate = h, e;
  } catch (f) {
    throw delete e.validate, delete e.validateName, c && this.logger.error("Error compiling schema, function code:", c), f;
  } finally {
    this._compilations.delete(e);
  }
}
qe.compileSchema = al;
function A4(e, t, r) {
  var n;
  r = (0, at.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = T4.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: o } = this.opts;
    i && (a = new Oa({ schema: i, schemaId: o, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = P4.call(this, a);
}
qe.resolveRef = A4;
function P4(e) {
  return (0, at.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : al.call(this, e);
}
function zh(e) {
  for (const t of this._compilations)
    if (C4(t, e))
      return t;
}
qe.getCompilingSchema = zh;
function C4(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function T4(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || Na.call(this, e, t);
}
function Na(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, at._getFullPath)(this.opts.uriResolver, r);
  let s = (0, at.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return si.call(this, r, e);
  const a = (0, at.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const o = Na.call(this, e, i);
    return typeof (o == null ? void 0 : o.schema) != "object" ? void 0 : si.call(this, r, o);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || al.call(this, i), a === (0, at.normalizeId)(t)) {
      const { schema: o } = i, { schemaId: l } = this.opts, u = o[l];
      return u && (s = (0, at.resolveUrl)(this.opts.uriResolver, s, u)), new Oa({ schema: o, schemaId: l, root: e, baseId: s });
    }
    return si.call(this, r, i);
  }
}
qe.resolveSchema = Na;
const I4 = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function si(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const o of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const l = r[(0, pd.unescapeFragment)(o)];
    if (l === void 0)
      return;
    r = l;
    const u = typeof r == "object" && r[this.opts.schemaId];
    !I4.has(o) && u && (t = (0, at.resolveUrl)(this.opts.uriResolver, t, u));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, pd.schemaHasRulesButRef)(r, this.RULES)) {
    const o = (0, at.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = Na.call(this, n, o);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new Oa({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const F4 = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", k4 = "Meta-schema for $data reference (JSON AnySchema extension proposal)", D4 = "object", R4 = [
  "$data"
], M4 = {
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
}, L4 = !1, U4 = {
  $id: F4,
  description: k4,
  type: D4,
  required: R4,
  properties: M4,
  additionalProperties: L4
};
var il = {}, Aa = { exports: {} };
const W4 = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), qh = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function Bh(e) {
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
const V4 = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function hd(e) {
  return e.length = 0, !0;
}
function z4(e, t, r) {
  if (e.length) {
    const n = Bh(e);
    if (n !== "")
      t.push(n);
    else
      return r.error = !0, !1;
    e.length = 0;
  }
  return !0;
}
function q4(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], s = [];
  let a = !1, i = !1, o = z4;
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
        o = hd;
      } else {
        s.push(u);
        continue;
      }
  }
  return s.length && (o === hd ? r.zone = s.join("") : i ? n.push(s.join("")) : n.push(Bh(s))), r.address = n.join(""), r;
}
function Kh(e) {
  if (B4(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = q4(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, isIPV6: !0, escapedHost: n };
  }
}
function B4(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
function K4(e) {
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
function G4(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function H4(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    if (!qh(r)) {
      const n = Kh(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var Gh = {
  nonSimpleDomain: V4,
  recomposeAuthority: H4,
  normalizeComponentEncoding: G4,
  removeDotSegments: K4,
  isIPv4: qh,
  isUUID: W4,
  normalizeIPv6: Kh
};
const { isUUID: J4 } = Gh, Y4 = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function Hh(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function Jh(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function Yh(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function Z4(e) {
  return e.secure = Hh(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function X4(e) {
  if ((e.port === (Hh(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function Q4(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(Y4);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const s = `${n}:${t.nid || e.nid}`, a = ol(s);
    e.path = void 0, a && (e = a.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function e5(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), s = `${r}:${t.nid || n}`, a = ol(s);
  a && (e = a.serialize(e, t));
  const i = e, o = e.nss;
  return i.path = `${n || t.nid}:${o}`, t.skipEscape = !0, i;
}
function t5(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !J4(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function r5(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const Zh = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: Jh,
    serialize: Yh
  }
), n5 = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: Zh.domainHost,
    parse: Jh,
    serialize: Yh
  }
), ys = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: !0,
    parse: Z4,
    serialize: X4
  }
), s5 = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: ys.domainHost,
    parse: ys.parse,
    serialize: ys.serialize
  }
), a5 = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: Q4,
    serialize: e5,
    skipNormalize: !0
  }
), i5 = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: t5,
    serialize: r5,
    skipNormalize: !0
  }
), Fs = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: Zh,
    https: n5,
    ws: ys,
    wss: s5,
    urn: a5,
    "urn:uuid": i5
  }
);
Object.setPrototypeOf(Fs, null);
function ol(e) {
  return e && (Fs[
    /** @type {SchemeName} */
    e
  ] || Fs[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var o5 = {
  SCHEMES: Fs,
  getSchemeHandler: ol
};
const { normalizeIPv6: l5, removeDotSegments: nn, recomposeAuthority: c5, normalizeComponentEncoding: ts, isIPv4: u5, nonSimpleDomain: d5 } = Gh, { SCHEMES: f5, getSchemeHandler: Xh } = o5;
function p5(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  ft(Pt(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  Pt(ft(e, t), t)), e;
}
function h5(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, s = Qh(Pt(e, n), Pt(t, n), n, !0);
  return n.skipEscape = !0, ft(s, n);
}
function Qh(e, t, r, n) {
  const s = {};
  return n || (e = Pt(ft(e, r), r), t = Pt(ft(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = nn(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = nn(t.path || ""), s.query = t.query) : (t.path ? (t.path[0] === "/" ? s.path = nn(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = nn(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function m5(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = ft(ts(Pt(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = ft(ts(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = ft(ts(Pt(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = ft(ts(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function ft(e, t) {
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
  }, n = Object.assign({}, t), s = [], a = Xh(n.scheme || r.scheme);
  a && a.serialize && a.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && s.push(r.scheme, ":");
  const i = c5(r);
  if (i !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(i), r.path && r.path[0] !== "/" && s.push("/")), r.path !== void 0) {
    let o = r.path;
    !n.absolutePath && (!a || !a.absolutePath) && (o = nn(o)), i === void 0 && o[0] === "/" && o[1] === "/" && (o = "/%2F" + o.slice(2)), s.push(o);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const g5 = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
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
  const a = e.match(g5);
  if (a) {
    if (n.scheme = a[1], n.userinfo = a[3], n.host = a[4], n.port = parseInt(a[5], 10), n.path = a[6] || "", n.query = a[7], n.fragment = a[8], isNaN(n.port) && (n.port = a[5]), n.host)
      if (u5(n.host) === !1) {
        const l = l5(n.host);
        n.host = l.host.toLowerCase(), s = l.isIPV6;
      } else
        s = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const i = Xh(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!i || !i.unicodeSupport) && n.host && (r.domainHost || i && i.domainHost) && s === !1 && d5(n.host))
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
const ll = {
  SCHEMES: f5,
  normalize: p5,
  resolve: h5,
  resolveComponent: Qh,
  equal: m5,
  serialize: ft,
  parse: Pt
};
Aa.exports = ll;
Aa.exports.default = ll;
Aa.exports.fastUri = ll;
var y5 = Aa.exports;
Object.defineProperty(il, "__esModule", { value: !0 });
const em = y5;
em.code = 'require("ajv/dist/runtime/uri").default';
il.default = em;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = Ea();
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = ae;
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
  const n = Bn, s = Br, a = er, i = qe, o = ae, l = Re, u = Ce, c = H, f = U4, m = il, h = (M, j) => new RegExp(M, j);
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
  function $(M) {
    var j, D, P, w, S, I, G, Y, ne, te, O, N, R, V, B, ee, Ee, Me, Ae, Le, Pe, X, ue, bt, dr;
    const We = M.strict, Hr = (j = M.code) === null || j === void 0 ? void 0 : j.optimize, $t = Hr === !0 || Hr === void 0 ? 1 : Hr || 0, Vl = (P = (D = M.code) === null || D === void 0 ? void 0 : D.regExp) !== null && P !== void 0 ? P : h, pm = (w = M.uriResolver) !== null && w !== void 0 ? w : m.default;
    return {
      strictSchema: (I = (S = M.strictSchema) !== null && S !== void 0 ? S : We) !== null && I !== void 0 ? I : !0,
      strictNumbers: (Y = (G = M.strictNumbers) !== null && G !== void 0 ? G : We) !== null && Y !== void 0 ? Y : !0,
      strictTypes: (te = (ne = M.strictTypes) !== null && ne !== void 0 ? ne : We) !== null && te !== void 0 ? te : "log",
      strictTuples: (N = (O = M.strictTuples) !== null && O !== void 0 ? O : We) !== null && N !== void 0 ? N : "log",
      strictRequired: (V = (R = M.strictRequired) !== null && R !== void 0 ? R : We) !== null && V !== void 0 ? V : !1,
      code: M.code ? { ...M.code, optimize: $t, regExp: Vl } : { optimize: $t, regExp: Vl },
      loopRequired: (B = M.loopRequired) !== null && B !== void 0 ? B : v,
      loopEnum: (ee = M.loopEnum) !== null && ee !== void 0 ? ee : v,
      meta: (Ee = M.meta) !== null && Ee !== void 0 ? Ee : !0,
      messages: (Me = M.messages) !== null && Me !== void 0 ? Me : !0,
      inlineRefs: (Ae = M.inlineRefs) !== null && Ae !== void 0 ? Ae : !0,
      schemaId: (Le = M.schemaId) !== null && Le !== void 0 ? Le : "$id",
      addUsedSchema: (Pe = M.addUsedSchema) !== null && Pe !== void 0 ? Pe : !0,
      validateSchema: (X = M.validateSchema) !== null && X !== void 0 ? X : !0,
      validateFormats: (ue = M.validateFormats) !== null && ue !== void 0 ? ue : !0,
      unicodeRegExp: (bt = M.unicodeRegExp) !== null && bt !== void 0 ? bt : !0,
      int32range: (dr = M.int32range) !== null && dr !== void 0 ? dr : !0,
      uriResolver: pm
    };
  }
  class _ {
    constructor(j = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), j = this.opts = { ...j, ...$(j) };
      const { es5: D, lines: P } = this.opts.code;
      this.scope = new o.ValueScope({ scope: {}, prefixes: b, es5: D, lines: P }), this.logger = K(j.logger);
      const w = j.validateFormats;
      j.validateFormats = !1, this.RULES = (0, a.getRules)(), x.call(this, y, j, "NOT SUPPORTED"), x.call(this, p, j, "DEPRECATED", "warn"), this._metaOpts = L.call(this), j.formats && U.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), j.keywords && C.call(this, j.keywords), typeof j.meta == "object" && this.addMetaSchema(j.meta), A.call(this), j.validateFormats = w;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: j, meta: D, schemaId: P } = this.opts;
      let w = f;
      P === "id" && (w = { ...f }, w.id = w.$id, delete w.$id), D && j && this.addMetaSchema(w, w[P], !1);
    }
    defaultMeta() {
      const { meta: j, schemaId: D } = this.opts;
      return this.opts.defaultMeta = typeof j == "object" ? j[D] || j : void 0;
    }
    validate(j, D) {
      let P;
      if (typeof j == "string") {
        if (P = this.getSchema(j), !P)
          throw new Error(`no schema with key or ref "${j}"`);
      } else
        P = this.compile(j);
      const w = P(D);
      return "$async" in P || (this.errors = P.errors), w;
    }
    compile(j, D) {
      const P = this._addSchema(j, D);
      return P.validate || this._compileSchemaEnv(P);
    }
    compileAsync(j, D) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: P } = this.opts;
      return w.call(this, j, D);
      async function w(te, O) {
        await S.call(this, te.$schema);
        const N = this._addSchema(te, O);
        return N.validate || I.call(this, N);
      }
      async function S(te) {
        te && !this.getSchema(te) && await w.call(this, { $ref: te }, !0);
      }
      async function I(te) {
        try {
          return this._compileSchemaEnv(te);
        } catch (O) {
          if (!(O instanceof s.default))
            throw O;
          return G.call(this, O), await Y.call(this, O.missingSchema), I.call(this, te);
        }
      }
      function G({ missingSchema: te, missingRef: O }) {
        if (this.refs[te])
          throw new Error(`AnySchema ${te} is loaded but ${O} cannot be resolved`);
      }
      async function Y(te) {
        const O = await ne.call(this, te);
        this.refs[te] || await S.call(this, O.$schema), this.refs[te] || this.addSchema(O, te, D);
      }
      async function ne(te) {
        const O = this._loading[te];
        if (O)
          return O;
        try {
          return await (this._loading[te] = P(te));
        } finally {
          delete this._loading[te];
        }
      }
    }
    // Adds schema to the instance
    addSchema(j, D, P, w = this.opts.validateSchema) {
      if (Array.isArray(j)) {
        for (const I of j)
          this.addSchema(I, void 0, P, w);
        return this;
      }
      let S;
      if (typeof j == "object") {
        const { schemaId: I } = this.opts;
        if (S = j[I], S !== void 0 && typeof S != "string")
          throw new Error(`schema ${I} must be string`);
      }
      return D = (0, l.normalizeId)(D || S), this._checkUnique(D), this.schemas[D] = this._addSchema(j, P, D, w, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(j, D, P = this.opts.validateSchema) {
      return this.addSchema(j, D, !0, P), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(j, D) {
      if (typeof j == "boolean")
        return !0;
      let P;
      if (P = j.$schema, P !== void 0 && typeof P != "string")
        throw new Error("$schema must be a string");
      if (P = P || this.opts.defaultMeta || this.defaultMeta(), !P)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const w = this.validate(P, j);
      if (!w && D) {
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
      let D;
      for (; typeof (D = E.call(this, j)) == "string"; )
        j = D;
      if (D === void 0) {
        const { schemaId: P } = this.opts, w = new i.SchemaEnv({ schema: {}, schemaId: P });
        if (D = i.resolveSchema.call(this, w, j), !D)
          return;
        this.refs[j] = D;
      }
      return D.validate || this._compileSchemaEnv(D);
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
          const D = E.call(this, j);
          return typeof D == "object" && this._cache.delete(D.schema), delete this.schemas[j], delete this.refs[j], this;
        }
        case "object": {
          const D = j;
          this._cache.delete(D);
          let P = j[this.opts.schemaId];
          return P && (P = (0, l.normalizeId)(P), delete this.schemas[P], delete this.refs[P]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(j) {
      for (const D of j)
        this.addKeyword(D);
      return this;
    }
    addKeyword(j, D) {
      let P;
      if (typeof j == "string")
        P = j, typeof D == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), D.keyword = P);
      else if (typeof j == "object" && D === void 0) {
        if (D = j, P = D.keyword, Array.isArray(P) && !P.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (T.call(this, P, D), !D)
        return (0, c.eachItem)(P, (S) => F.call(this, S)), this;
      z.call(this, D);
      const w = {
        ...D,
        type: (0, u.getJSONTypes)(D.type),
        schemaType: (0, u.getJSONTypes)(D.schemaType)
      };
      return (0, c.eachItem)(P, w.type.length === 0 ? (S) => F.call(this, S, w) : (S) => w.type.forEach((I) => F.call(this, S, w, I))), this;
    }
    getKeyword(j) {
      const D = this.RULES.all[j];
      return typeof D == "object" ? D.definition : !!D;
    }
    // Remove keyword
    removeKeyword(j) {
      const { RULES: D } = this;
      delete D.keywords[j], delete D.all[j];
      for (const P of D.rules) {
        const w = P.rules.findIndex((S) => S.keyword === j);
        w >= 0 && P.rules.splice(w, 1);
      }
      return this;
    }
    // Add format
    addFormat(j, D) {
      return typeof D == "string" && (D = new RegExp(D)), this.formats[j] = D, this;
    }
    errorsText(j = this.errors, { separator: D = ", ", dataVar: P = "data" } = {}) {
      return !j || j.length === 0 ? "No errors" : j.map((w) => `${P}${w.instancePath} ${w.message}`).reduce((w, S) => w + D + S);
    }
    $dataMetaSchema(j, D) {
      const P = this.RULES.all;
      j = JSON.parse(JSON.stringify(j));
      for (const w of D) {
        const S = w.split("/").slice(1);
        let I = j;
        for (const G of S)
          I = I[G];
        for (const G in P) {
          const Y = P[G];
          if (typeof Y != "object")
            continue;
          const { $data: ne } = Y.definition, te = I[G];
          ne && te && (I[G] = Q(te));
        }
      }
      return j;
    }
    _removeAllSchemas(j, D) {
      for (const P in j) {
        const w = j[P];
        (!D || D.test(P)) && (typeof w == "string" ? delete j[P] : w && !w.meta && (this._cache.delete(w.schema), delete j[P]));
      }
    }
    _addSchema(j, D, P, w = this.opts.validateSchema, S = this.opts.addUsedSchema) {
      let I;
      const { schemaId: G } = this.opts;
      if (typeof j == "object")
        I = j[G];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof j != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let Y = this._cache.get(j);
      if (Y !== void 0)
        return Y;
      P = (0, l.normalizeId)(I || P);
      const ne = l.getSchemaRefs.call(this, j, P);
      return Y = new i.SchemaEnv({ schema: j, schemaId: G, meta: D, baseId: P, localRefs: ne }), this._cache.set(Y.schema, Y), S && !P.startsWith("#") && (P && this._checkUnique(P), this.refs[P] = Y), w && this.validateSchema(j, !0), Y;
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
      const D = this.opts;
      this.opts = this._metaOpts;
      try {
        i.compileSchema.call(this, j);
      } finally {
        this.opts = D;
      }
    }
  }
  _.ValidationError = n.default, _.MissingRefError = s.default, e.default = _;
  function x(M, j, D, P = "error") {
    for (const w in M) {
      const S = w;
      S in j && this.logger[P](`${D}: option ${w}. ${M[S]}`);
    }
  }
  function E(M) {
    return M = (0, l.normalizeId)(M), this.schemas[M] || this.refs[M];
  }
  function A() {
    const M = this.opts.schemas;
    if (M)
      if (Array.isArray(M))
        this.addSchema(M);
      else
        for (const j in M)
          this.addSchema(M[j], j);
  }
  function U() {
    for (const M in this.opts.formats) {
      const j = this.opts.formats[M];
      j && this.addFormat(M, j);
    }
  }
  function C(M) {
    if (Array.isArray(M)) {
      this.addVocabulary(M);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const j in M) {
      const D = M[j];
      D.keyword || (D.keyword = j), this.addKeyword(D);
    }
  }
  function L() {
    const M = { ...this.opts };
    for (const j of g)
      delete M[j];
    return M;
  }
  const W = { log() {
  }, warn() {
  }, error() {
  } };
  function K(M) {
    if (M === !1)
      return W;
    if (M === void 0)
      return console;
    if (M.log && M.warn && M.error)
      return M;
    throw new Error("logger must implement log, warn and error methods");
  }
  const q = /^[a-z_$][a-z0-9_$:-]*$/i;
  function T(M, j) {
    const { RULES: D } = this;
    if ((0, c.eachItem)(M, (P) => {
      if (D.keywords[P])
        throw new Error(`Keyword ${P} is already defined`);
      if (!q.test(P))
        throw new Error(`Keyword ${P} has invalid name`);
    }), !!j && j.$data && !("code" in j || "validate" in j))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function F(M, j, D) {
    var P;
    const w = j == null ? void 0 : j.post;
    if (D && w)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: S } = this;
    let I = w ? S.post : S.rules.find(({ type: Y }) => Y === D);
    if (I || (I = { type: D, rules: [] }, S.rules.push(I)), S.keywords[M] = !0, !j)
      return;
    const G = {
      keyword: M,
      definition: {
        ...j,
        type: (0, u.getJSONTypes)(j.type),
        schemaType: (0, u.getJSONTypes)(j.schemaType)
      }
    };
    j.before ? k.call(this, I, G, j.before) : I.rules.push(G), S.all[M] = G, (P = j.implements) === null || P === void 0 || P.forEach((Y) => this.addKeyword(Y));
  }
  function k(M, j, D) {
    const P = M.rules.findIndex((w) => w.keyword === D);
    P >= 0 ? M.rules.splice(P, 0, j) : (M.rules.push(j), this.logger.warn(`rule ${D} is not defined`));
  }
  function z(M) {
    let { metaSchema: j } = M;
    j !== void 0 && (M.$data && this.opts.$data && (j = Q(j)), M.validateSchema = this.compile(j, !0));
  }
  const J = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function Q(M) {
    return { anyOf: [M, J] };
  }
})(jh);
var cl = {}, ul = {}, dl = {};
Object.defineProperty(dl, "__esModule", { value: !0 });
const v5 = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
dl.default = v5;
var tr = {};
Object.defineProperty(tr, "__esModule", { value: !0 });
tr.callRef = tr.getValidate = void 0;
const b5 = Br, md = ie, ze = ae, pr = vt, gd = qe, rs = H, $5 = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: o, self: l } = n, { root: u } = a;
    if ((r === "#" || r === "#/") && s === u.baseId)
      return f();
    const c = gd.resolveRef.call(l, u, s, r);
    if (c === void 0)
      throw new b5.default(n.opts.uriResolver, s, r);
    if (c instanceof gd.SchemaEnv)
      return m(c);
    return h(c);
    function f() {
      if (a === u)
        return vs(e, i, a, a.$async);
      const g = t.scopeValue("root", { ref: u });
      return vs(e, (0, ze._)`${g}.validate`, u, u.$async);
    }
    function m(g) {
      const b = tm(e, g);
      vs(e, b, g, g.$async);
    }
    function h(g) {
      const b = t.scopeValue("schema", o.code.source === !0 ? { ref: g, code: (0, ze.stringify)(g) } : { ref: g }), y = t.name("valid"), p = e.subschema({
        schema: g,
        dataTypes: [],
        schemaPath: ze.nil,
        topSchemaRef: b,
        errSchemaPath: r
      }, y);
      e.mergeEvaluated(p), e.ok(y);
    }
  }
};
function tm(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, ze._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
tr.getValidate = tm;
function vs(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: o, opts: l } = a, u = l.passContext ? pr.default.this : ze.nil;
  n ? c() : f();
  function c() {
    if (!o.$async)
      throw new Error("async schema referenced by sync schema");
    const g = s.let("valid");
    s.try(() => {
      s.code((0, ze._)`await ${(0, md.callValidateCode)(e, t, u)}`), h(t), i || s.assign(g, !0);
    }, (b) => {
      s.if((0, ze._)`!(${b} instanceof ${a.ValidationError})`, () => s.throw(b)), m(b), i || s.assign(g, !1);
    }), e.ok(g);
  }
  function f() {
    e.result((0, md.callValidateCode)(e, t, u), () => h(t), () => m(t));
  }
  function m(g) {
    const b = (0, ze._)`${g}.errors`;
    s.assign(pr.default.vErrors, (0, ze._)`${pr.default.vErrors} === null ? ${b} : ${pr.default.vErrors}.concat(${b})`), s.assign(pr.default.errors, (0, ze._)`${pr.default.vErrors}.length`);
  }
  function h(g) {
    var b;
    if (!a.opts.unevaluated)
      return;
    const y = (b = r == null ? void 0 : r.validate) === null || b === void 0 ? void 0 : b.evaluated;
    if (a.props !== !0)
      if (y && !y.dynamicProps)
        y.props !== void 0 && (a.props = rs.mergeEvaluated.props(s, y.props, a.props));
      else {
        const p = s.var("props", (0, ze._)`${g}.evaluated.props`);
        a.props = rs.mergeEvaluated.props(s, p, a.props, ze.Name);
      }
    if (a.items !== !0)
      if (y && !y.dynamicItems)
        y.items !== void 0 && (a.items = rs.mergeEvaluated.items(s, y.items, a.items));
      else {
        const p = s.var("items", (0, ze._)`${g}.evaluated.items`);
        a.items = rs.mergeEvaluated.items(s, p, a.items, ze.Name);
      }
  }
}
tr.callRef = vs;
tr.default = $5;
Object.defineProperty(ul, "__esModule", { value: !0 });
const w5 = dl, _5 = tr, x5 = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  w5.default,
  _5.default
];
ul.default = x5;
var fl = {}, pl = {};
Object.defineProperty(pl, "__esModule", { value: !0 });
const ks = ae, Dt = ks.operators, Ds = {
  maximum: { okStr: "<=", ok: Dt.LTE, fail: Dt.GT },
  minimum: { okStr: ">=", ok: Dt.GTE, fail: Dt.LT },
  exclusiveMaximum: { okStr: "<", ok: Dt.LT, fail: Dt.GTE },
  exclusiveMinimum: { okStr: ">", ok: Dt.GT, fail: Dt.LTE }
}, S5 = {
  message: ({ keyword: e, schemaCode: t }) => (0, ks.str)`must be ${Ds[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, ks._)`{comparison: ${Ds[e].okStr}, limit: ${t}}`
}, j5 = {
  keyword: Object.keys(Ds),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: S5,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, ks._)`${r} ${Ds[t].fail} ${n} || isNaN(${r})`);
  }
};
pl.default = j5;
var hl = {};
Object.defineProperty(hl, "__esModule", { value: !0 });
const fn = ae, E5 = {
  message: ({ schemaCode: e }) => (0, fn.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, fn._)`{multipleOf: ${e}}`
}, O5 = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: E5,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), o = a ? (0, fn._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, fn._)`${i} !== parseInt(${i})`;
    e.fail$data((0, fn._)`(${n} === 0 || (${i} = ${r}/${n}, ${o}))`);
  }
};
hl.default = O5;
var ml = {}, gl = {};
Object.defineProperty(gl, "__esModule", { value: !0 });
function rm(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
gl.default = rm;
rm.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(ml, "__esModule", { value: !0 });
const Jt = ae, N5 = H, A5 = gl, P5 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Jt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Jt._)`{limit: ${e}}`
}, C5 = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: P5,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Jt.operators.GT : Jt.operators.LT, i = s.opts.unicode === !1 ? (0, Jt._)`${r}.length` : (0, Jt._)`${(0, N5.useFunc)(e.gen, A5.default)}(${r})`;
    e.fail$data((0, Jt._)`${i} ${a} ${n}`);
  }
};
ml.default = C5;
var yl = {};
Object.defineProperty(yl, "__esModule", { value: !0 });
const T5 = ie, Rs = ae, I5 = {
  message: ({ schemaCode: e }) => (0, Rs.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Rs._)`{pattern: ${e}}`
}, F5 = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: I5,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, i = a.opts.unicodeRegExp ? "u" : "", o = r ? (0, Rs._)`(new RegExp(${s}, ${i}))` : (0, T5.usePattern)(e, n);
    e.fail$data((0, Rs._)`!${o}.test(${t})`);
  }
};
yl.default = F5;
var vl = {};
Object.defineProperty(vl, "__esModule", { value: !0 });
const pn = ae, k5 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, pn.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, pn._)`{limit: ${e}}`
}, D5 = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: k5,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? pn.operators.GT : pn.operators.LT;
    e.fail$data((0, pn._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
vl.default = D5;
var bl = {};
Object.defineProperty(bl, "__esModule", { value: !0 });
const tn = ie, hn = ae, R5 = H, M5 = {
  message: ({ params: { missingProperty: e } }) => (0, hn.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, hn._)`{missingProperty: ${e}}`
}, L5 = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: M5,
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
          (0, R5.checkStrictMode)(i, p, i.opts.strictRequired);
        }
    }
    function u() {
      if (l || a)
        e.block$data(hn.nil, f);
      else
        for (const h of r)
          (0, tn.checkReportMissingProp)(e, h);
    }
    function c() {
      const h = t.let("missing");
      if (l || a) {
        const g = t.let("valid", !0);
        e.block$data(g, () => m(h, g)), e.ok(g);
      } else
        t.if((0, tn.checkMissingProp)(e, r, h)), (0, tn.reportMissingProp)(e, h), t.else();
    }
    function f() {
      t.forOf("prop", n, (h) => {
        e.setParams({ missingProperty: h }), t.if((0, tn.noPropertyInData)(t, s, h, o.ownProperties), () => e.error());
      });
    }
    function m(h, g) {
      e.setParams({ missingProperty: h }), t.forOf(h, n, () => {
        t.assign(g, (0, tn.propertyInData)(t, s, h, o.ownProperties)), t.if((0, hn.not)(g), () => {
          e.error(), t.break();
        });
      }, hn.nil);
    }
  }
};
bl.default = L5;
var $l = {};
Object.defineProperty($l, "__esModule", { value: !0 });
const mn = ae, U5 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, mn.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, mn._)`{limit: ${e}}`
}, W5 = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: U5,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? mn.operators.GT : mn.operators.LT;
    e.fail$data((0, mn._)`${r}.length ${s} ${n}`);
  }
};
$l.default = W5;
var wl = {}, Kn = {};
Object.defineProperty(Kn, "__esModule", { value: !0 });
const nm = Mh;
nm.code = 'require("ajv/dist/runtime/equal").default';
Kn.default = nm;
Object.defineProperty(wl, "__esModule", { value: !0 });
const ai = Ce, ke = ae, V5 = H, z5 = Kn, q5 = {
  message: ({ params: { i: e, j: t } }) => (0, ke.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, ke._)`{i: ${e}, j: ${t}}`
}, B5 = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: q5,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: o } = e;
    if (!n && !s)
      return;
    const l = t.let("valid"), u = a.items ? (0, ai.getSchemaTypes)(a.items) : [];
    e.block$data(l, c, (0, ke._)`${i} === false`), e.ok(l);
    function c() {
      const g = t.let("i", (0, ke._)`${r}.length`), b = t.let("j");
      e.setParams({ i: g, j: b }), t.assign(l, !0), t.if((0, ke._)`${g} > 1`, () => (f() ? m : h)(g, b));
    }
    function f() {
      return u.length > 0 && !u.some((g) => g === "object" || g === "array");
    }
    function m(g, b) {
      const y = t.name("item"), p = (0, ai.checkDataTypes)(u, y, o.opts.strictNumbers, ai.DataType.Wrong), v = t.const("indices", (0, ke._)`{}`);
      t.for((0, ke._)`;${g}--;`, () => {
        t.let(y, (0, ke._)`${r}[${g}]`), t.if(p, (0, ke._)`continue`), u.length > 1 && t.if((0, ke._)`typeof ${y} == "string"`, (0, ke._)`${y} += "_"`), t.if((0, ke._)`typeof ${v}[${y}] == "number"`, () => {
          t.assign(b, (0, ke._)`${v}[${y}]`), e.error(), t.assign(l, !1).break();
        }).code((0, ke._)`${v}[${y}] = ${g}`);
      });
    }
    function h(g, b) {
      const y = (0, V5.useFunc)(t, z5.default), p = t.name("outer");
      t.label(p).for((0, ke._)`;${g}--;`, () => t.for((0, ke._)`${b} = ${g}; ${b}--;`, () => t.if((0, ke._)`${y}(${r}[${g}], ${r}[${b}])`, () => {
        e.error(), t.assign(l, !1).break(p);
      })));
    }
  }
};
wl.default = B5;
var _l = {};
Object.defineProperty(_l, "__esModule", { value: !0 });
const Fi = ae, K5 = H, G5 = Kn, H5 = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Fi._)`{allowedValue: ${e}}`
}, J5 = {
  keyword: "const",
  $data: !0,
  error: H5,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, Fi._)`!${(0, K5.useFunc)(t, G5.default)}(${r}, ${s})`) : e.fail((0, Fi._)`${a} !== ${r}`);
  }
};
_l.default = J5;
var xl = {};
Object.defineProperty(xl, "__esModule", { value: !0 });
const sn = ae, Y5 = H, Z5 = Kn, X5 = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, sn._)`{allowedValues: ${e}}`
}, Q5 = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: X5,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const o = s.length >= i.opts.loopEnum;
    let l;
    const u = () => l ?? (l = (0, Y5.useFunc)(t, Z5.default));
    let c;
    if (o || n)
      c = t.let("valid"), e.block$data(c, f);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const h = t.const("vSchema", a);
      c = (0, sn.or)(...s.map((g, b) => m(h, b)));
    }
    e.pass(c);
    function f() {
      t.assign(c, !1), t.forOf("v", a, (h) => t.if((0, sn._)`${u()}(${r}, ${h})`, () => t.assign(c, !0).break()));
    }
    function m(h, g) {
      const b = s[g];
      return typeof b == "object" && b !== null ? (0, sn._)`${u()}(${r}, ${h}[${g}])` : (0, sn._)`${r} === ${b}`;
    }
  }
};
xl.default = Q5;
Object.defineProperty(fl, "__esModule", { value: !0 });
const eL = pl, tL = hl, rL = ml, nL = yl, sL = vl, aL = bl, iL = $l, oL = wl, lL = _l, cL = xl, uL = [
  // number
  eL.default,
  tL.default,
  // string
  rL.default,
  nL.default,
  // object
  sL.default,
  aL.default,
  // array
  iL.default,
  oL.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  lL.default,
  cL.default
];
fl.default = uL;
var Sl = {}, Kr = {};
Object.defineProperty(Kr, "__esModule", { value: !0 });
Kr.validateAdditionalItems = void 0;
const Yt = ae, ki = H, dL = {
  message: ({ params: { len: e } }) => (0, Yt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Yt._)`{limit: ${e}}`
}, fL = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: dL,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, ki.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    sm(e, n);
  }
};
function sm(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const o = r.const("len", (0, Yt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Yt._)`${o} <= ${t.length}`);
  else if (typeof n == "object" && !(0, ki.alwaysValidSchema)(i, n)) {
    const u = r.var("valid", (0, Yt._)`${o} <= ${t.length}`);
    r.if((0, Yt.not)(u), () => l(u)), e.ok(u);
  }
  function l(u) {
    r.forRange("i", t.length, o, (c) => {
      e.subschema({ keyword: a, dataProp: c, dataPropType: ki.Type.Num }, u), i.allErrors || r.if((0, Yt.not)(u), () => r.break());
    });
  }
}
Kr.validateAdditionalItems = sm;
Kr.default = fL;
var jl = {}, Gr = {};
Object.defineProperty(Gr, "__esModule", { value: !0 });
Gr.validateTuple = void 0;
const yd = ae, bs = H, pL = ie, hL = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return am(e, "additionalItems", t);
    r.items = !0, !(0, bs.alwaysValidSchema)(r, t) && e.ok((0, pL.validateArray)(e));
  }
};
function am(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: o } = e;
  c(s), o.opts.unevaluated && r.length && o.items !== !0 && (o.items = bs.mergeEvaluated.items(n, r.length, o.items));
  const l = n.name("valid"), u = n.const("len", (0, yd._)`${a}.length`);
  r.forEach((f, m) => {
    (0, bs.alwaysValidSchema)(o, f) || (n.if((0, yd._)`${u} > ${m}`, () => e.subschema({
      keyword: i,
      schemaProp: m,
      dataProp: m
    }, l)), e.ok(l));
  });
  function c(f) {
    const { opts: m, errSchemaPath: h } = o, g = r.length, b = g === f.minItems && (g === f.maxItems || f[t] === !1);
    if (m.strictTuples && !b) {
      const y = `"${i}" is ${g}-tuple, but minItems or maxItems/${t} are not specified or different at path "${h}"`;
      (0, bs.checkStrictMode)(o, y, m.strictTuples);
    }
  }
}
Gr.validateTuple = am;
Gr.default = hL;
Object.defineProperty(jl, "__esModule", { value: !0 });
const mL = Gr, gL = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, mL.validateTuple)(e, "items")
};
jl.default = gL;
var El = {};
Object.defineProperty(El, "__esModule", { value: !0 });
const vd = ae, yL = H, vL = ie, bL = Kr, $L = {
  message: ({ params: { len: e } }) => (0, vd.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, vd._)`{limit: ${e}}`
}, wL = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: $L,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, yL.alwaysValidSchema)(n, t) && (s ? (0, bL.validateAdditionalItems)(e, s) : e.ok((0, vL.validateArray)(e)));
  }
};
El.default = wL;
var Ol = {};
Object.defineProperty(Ol, "__esModule", { value: !0 });
const Je = ae, ns = H, _L = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Je.str)`must contain at least ${e} valid item(s)` : (0, Je.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Je._)`{minContains: ${e}}` : (0, Je._)`{minContains: ${e}, maxContains: ${t}}`
}, xL = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: _L,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let i, o;
    const { minContains: l, maxContains: u } = n;
    a.opts.next ? (i = l === void 0 ? 1 : l, o = u) : i = 1;
    const c = t.const("len", (0, Je._)`${s}.length`);
    if (e.setParams({ min: i, max: o }), o === void 0 && i === 0) {
      (0, ns.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (o !== void 0 && i > o) {
      (0, ns.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, ns.alwaysValidSchema)(a, r)) {
      let b = (0, Je._)`${c} >= ${i}`;
      o !== void 0 && (b = (0, Je._)`${b} && ${c} <= ${o}`), e.pass(b);
      return;
    }
    a.items = !0;
    const f = t.name("valid");
    o === void 0 && i === 1 ? h(f, () => t.if(f, () => t.break())) : i === 0 ? (t.let(f, !0), o !== void 0 && t.if((0, Je._)`${s}.length > 0`, m)) : (t.let(f, !1), m()), e.result(f, () => e.reset());
    function m() {
      const b = t.name("_valid"), y = t.let("count", 0);
      h(b, () => t.if(b, () => g(y)));
    }
    function h(b, y) {
      t.forRange("i", 0, c, (p) => {
        e.subschema({
          keyword: "contains",
          dataProp: p,
          dataPropType: ns.Type.Num,
          compositeRule: !0
        }, b), y();
      });
    }
    function g(b) {
      t.code((0, Je._)`${b}++`), o === void 0 ? t.if((0, Je._)`${b} >= ${i}`, () => t.assign(f, !0).break()) : (t.if((0, Je._)`${b} > ${o}`, () => t.assign(f, !1).break()), i === 1 ? t.assign(f, !0) : t.if((0, Je._)`${b} >= ${i}`, () => t.assign(f, !0)));
    }
  }
};
Ol.default = xL;
var im = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = ae, r = H, n = ie;
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
})(im);
var Nl = {};
Object.defineProperty(Nl, "__esModule", { value: !0 });
const om = ae, SL = H, jL = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, om._)`{propertyName: ${e.propertyName}}`
}, EL = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: jL,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, SL.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, om.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
Nl.default = EL;
var Pa = {};
Object.defineProperty(Pa, "__esModule", { value: !0 });
const ss = ie, nt = ae, OL = vt, as = H, NL = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, nt._)`{additionalProperty: ${e.additionalProperty}}`
}, AL = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: NL,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: o, opts: l } = i;
    if (i.props = !0, l.removeAdditional !== "all" && (0, as.alwaysValidSchema)(i, r))
      return;
    const u = (0, ss.allSchemaProperties)(n.properties), c = (0, ss.allSchemaProperties)(n.patternProperties);
    f(), e.ok((0, nt._)`${a} === ${OL.default.errors}`);
    function f() {
      t.forIn("key", s, (y) => {
        !u.length && !c.length ? g(y) : t.if(m(y), () => g(y));
      });
    }
    function m(y) {
      let p;
      if (u.length > 8) {
        const v = (0, as.schemaRefOrVal)(i, n.properties, "properties");
        p = (0, ss.isOwnProperty)(t, v, y);
      } else u.length ? p = (0, nt.or)(...u.map((v) => (0, nt._)`${y} === ${v}`)) : p = nt.nil;
      return c.length && (p = (0, nt.or)(p, ...c.map((v) => (0, nt._)`${(0, ss.usePattern)(e, v)}.test(${y})`))), (0, nt.not)(p);
    }
    function h(y) {
      t.code((0, nt._)`delete ${s}[${y}]`);
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
      if (typeof r == "object" && !(0, as.alwaysValidSchema)(i, r)) {
        const p = t.name("valid");
        l.removeAdditional === "failing" ? (b(y, p, !1), t.if((0, nt.not)(p), () => {
          e.reset(), h(y);
        })) : (b(y, p), o || t.if((0, nt.not)(p), () => t.break()));
      }
    }
    function b(y, p, v) {
      const $ = {
        keyword: "additionalProperties",
        dataProp: y,
        dataPropType: as.Type.Str
      };
      v === !1 && Object.assign($, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema($, p);
    }
  }
};
Pa.default = AL;
var Al = {};
Object.defineProperty(Al, "__esModule", { value: !0 });
const PL = Ea(), bd = ie, ii = H, $d = Pa, CL = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && $d.default.code(new PL.KeywordCxt(a, $d.default, "additionalProperties"));
    const i = (0, bd.allSchemaProperties)(r);
    for (const f of i)
      a.definedProperties.add(f);
    a.opts.unevaluated && i.length && a.props !== !0 && (a.props = ii.mergeEvaluated.props(t, (0, ii.toHash)(i), a.props));
    const o = i.filter((f) => !(0, ii.alwaysValidSchema)(a, r[f]));
    if (o.length === 0)
      return;
    const l = t.name("valid");
    for (const f of o)
      u(f) ? c(f) : (t.if((0, bd.propertyInData)(t, s, f, a.opts.ownProperties)), c(f), a.allErrors || t.else().var(l, !0), t.endIf()), e.it.definedProperties.add(f), e.ok(l);
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
Al.default = CL;
var Pl = {};
Object.defineProperty(Pl, "__esModule", { value: !0 });
const wd = ie, is = ae, _d = H, xd = H, TL = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, o = (0, wd.allSchemaProperties)(r), l = o.filter((b) => (0, _d.alwaysValidSchema)(a, r[b]));
    if (o.length === 0 || l.length === o.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const u = i.strictSchema && !i.allowMatchingProperties && s.properties, c = t.name("valid");
    a.props !== !0 && !(a.props instanceof is.Name) && (a.props = (0, xd.evaluatedPropsToName)(t, a.props));
    const { props: f } = a;
    m();
    function m() {
      for (const b of o)
        u && h(b), a.allErrors ? g(b) : (t.var(c, !0), g(b), t.if(c));
    }
    function h(b) {
      for (const y in u)
        new RegExp(b).test(y) && (0, _d.checkStrictMode)(a, `property ${y} matches pattern ${b} (use allowMatchingProperties)`);
    }
    function g(b) {
      t.forIn("key", n, (y) => {
        t.if((0, is._)`${(0, wd.usePattern)(e, b)}.test(${y})`, () => {
          const p = l.includes(b);
          p || e.subschema({
            keyword: "patternProperties",
            schemaProp: b,
            dataProp: y,
            dataPropType: xd.Type.Str
          }, c), a.opts.unevaluated && f !== !0 ? t.assign((0, is._)`${f}[${y}]`, !0) : !p && !a.allErrors && t.if((0, is.not)(c), () => t.break());
        });
      });
    }
  }
};
Pl.default = TL;
var Cl = {};
Object.defineProperty(Cl, "__esModule", { value: !0 });
const IL = H, FL = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, IL.alwaysValidSchema)(n, r)) {
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
Cl.default = FL;
var Tl = {};
Object.defineProperty(Tl, "__esModule", { value: !0 });
const kL = ie, DL = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: kL.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Tl.default = DL;
var Il = {};
Object.defineProperty(Il, "__esModule", { value: !0 });
const $s = ae, RL = H, ML = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, $s._)`{passingSchemas: ${e.passing}}`
}, LL = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: ML,
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
        (0, RL.alwaysValidSchema)(s, c) ? t.var(l, !0) : m = e.subschema({
          keyword: "oneOf",
          schemaProp: f,
          compositeRule: !0
        }, l), f > 0 && t.if((0, $s._)`${l} && ${i}`).assign(i, !1).assign(o, (0, $s._)`[${o}, ${f}]`).else(), t.if(l, () => {
          t.assign(i, !0), t.assign(o, f), m && e.mergeEvaluated(m, $s.Name);
        });
      });
    }
  }
};
Il.default = LL;
var Fl = {};
Object.defineProperty(Fl, "__esModule", { value: !0 });
const UL = H, WL = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, UL.alwaysValidSchema)(n, a))
        return;
      const o = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(o);
    });
  }
};
Fl.default = WL;
var kl = {};
Object.defineProperty(kl, "__esModule", { value: !0 });
const Ms = ae, lm = H, VL = {
  message: ({ params: e }) => (0, Ms.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Ms._)`{failingKeyword: ${e.ifClause}}`
}, zL = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: VL,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, lm.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Sd(n, "then"), a = Sd(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), o = t.name("_valid");
    if (l(), e.reset(), s && a) {
      const c = t.let("ifClause");
      e.setParams({ ifClause: c }), t.if(o, u("then", c), u("else", c));
    } else s ? t.if(o, u("then")) : t.if((0, Ms.not)(o), u("else"));
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
        t.assign(i, o), e.mergeValidEvaluated(m, i), f ? t.assign(f, (0, Ms._)`${c}`) : e.setParams({ ifClause: c });
      };
    }
  }
};
function Sd(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, lm.alwaysValidSchema)(e, r);
}
kl.default = zL;
var Dl = {};
Object.defineProperty(Dl, "__esModule", { value: !0 });
const qL = H, BL = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, qL.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Dl.default = BL;
Object.defineProperty(Sl, "__esModule", { value: !0 });
const KL = Kr, GL = jl, HL = Gr, JL = El, YL = Ol, ZL = im, XL = Nl, QL = Pa, eU = Al, tU = Pl, rU = Cl, nU = Tl, sU = Il, aU = Fl, iU = kl, oU = Dl;
function lU(e = !1) {
  const t = [
    // any
    rU.default,
    nU.default,
    sU.default,
    aU.default,
    iU.default,
    oU.default,
    // object
    XL.default,
    QL.default,
    ZL.default,
    eU.default,
    tU.default
  ];
  return e ? t.push(GL.default, JL.default) : t.push(KL.default, HL.default), t.push(YL.default), t;
}
Sl.default = lU;
var Rl = {}, Ml = {};
Object.defineProperty(Ml, "__esModule", { value: !0 });
const Ne = ae, cU = {
  message: ({ schemaCode: e }) => (0, Ne.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, Ne._)`{format: ${e}}`
}, uU = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: cU,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: o } = e, { opts: l, errSchemaPath: u, schemaEnv: c, self: f } = o;
    if (!l.validateFormats)
      return;
    s ? m() : h();
    function m() {
      const g = r.scopeValue("formats", {
        ref: f.formats,
        code: l.code.formats
      }), b = r.const("fDef", (0, Ne._)`${g}[${i}]`), y = r.let("fType"), p = r.let("format");
      r.if((0, Ne._)`typeof ${b} == "object" && !(${b} instanceof RegExp)`, () => r.assign(y, (0, Ne._)`${b}.type || "string"`).assign(p, (0, Ne._)`${b}.validate`), () => r.assign(y, (0, Ne._)`"string"`).assign(p, b)), e.fail$data((0, Ne.or)(v(), $()));
      function v() {
        return l.strictSchema === !1 ? Ne.nil : (0, Ne._)`${i} && !${p}`;
      }
      function $() {
        const _ = c.$async ? (0, Ne._)`(${b}.async ? await ${p}(${n}) : ${p}(${n}))` : (0, Ne._)`${p}(${n})`, x = (0, Ne._)`(typeof ${p} == "function" ? ${_} : ${p}.test(${n}))`;
        return (0, Ne._)`${p} && ${p} !== true && ${y} === ${t} && !${x}`;
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
        const E = x instanceof RegExp ? (0, Ne.regexpCode)(x) : l.code.formats ? (0, Ne._)`${l.code.formats}${(0, Ne.getProperty)(a)}` : void 0, A = r.scopeValue("formats", { key: a, ref: x, code: E });
        return typeof x == "object" && !(x instanceof RegExp) ? [x.type || "string", x.validate, (0, Ne._)`${A}.validate`] : ["string", x, A];
      }
      function _() {
        if (typeof g == "object" && !(g instanceof RegExp) && g.async) {
          if (!c.$async)
            throw new Error("async format in sync schema");
          return (0, Ne._)`await ${p}(${n})`;
        }
        return typeof y == "function" ? (0, Ne._)`${p}(${n})` : (0, Ne._)`${p}.test(${n})`;
      }
    }
  }
};
Ml.default = uU;
Object.defineProperty(Rl, "__esModule", { value: !0 });
const dU = Ml, fU = [dU.default];
Rl.default = fU;
var Ar = {};
Object.defineProperty(Ar, "__esModule", { value: !0 });
Ar.contentVocabulary = Ar.metadataVocabulary = void 0;
Ar.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Ar.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(cl, "__esModule", { value: !0 });
const pU = ul, hU = fl, mU = Sl, gU = Rl, jd = Ar, yU = [
  pU.default,
  hU.default,
  (0, mU.default)(),
  gU.default,
  jd.metadataVocabulary,
  jd.contentVocabulary
];
cl.default = yU;
var Ll = {}, Ca = {};
Object.defineProperty(Ca, "__esModule", { value: !0 });
Ca.DiscrError = void 0;
var Ed;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Ed || (Ca.DiscrError = Ed = {}));
Object.defineProperty(Ll, "__esModule", { value: !0 });
const hr = ae, Di = Ca, Od = qe, vU = Br, bU = H, $U = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Di.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, hr._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, wU = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: $U,
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
    const l = t.let("valid", !1), u = t.const("tag", (0, hr._)`${r}${(0, hr.getProperty)(o)}`);
    t.if((0, hr._)`typeof ${u} == "string"`, () => c(), () => e.error(!1, { discrError: Di.DiscrError.Tag, tag: u, tagName: o })), e.ok(l);
    function c() {
      const h = m();
      t.if(!1);
      for (const g in h)
        t.elseIf((0, hr._)`${u} === ${g}`), t.assign(l, f(h[g]));
      t.else(), e.error(!1, { discrError: Di.DiscrError.Mapping, tag: u, tagName: o }), t.endIf();
    }
    function f(h) {
      const g = t.name("valid"), b = e.subschema({ keyword: "oneOf", schemaProp: h }, g);
      return e.mergeEvaluated(b, hr.Name), g;
    }
    function m() {
      var h;
      const g = {}, b = p(s);
      let y = !0;
      for (let _ = 0; _ < i.length; _++) {
        let x = i[_];
        if (x != null && x.$ref && !(0, bU.schemaHasRulesButRef)(x, a.self.RULES)) {
          const A = x.$ref;
          if (x = Od.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, A), x instanceof Od.SchemaEnv && (x = x.schema), x === void 0)
            throw new vU.default(a.opts.uriResolver, a.baseId, A);
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
Ll.default = wU;
const _U = "http://json-schema.org/draft-07/schema#", xU = "http://json-schema.org/draft-07/schema#", SU = "Core schema meta-schema", jU = {
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
}, EU = [
  "object",
  "boolean"
], OU = {
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
}, NU = {
  $schema: _U,
  $id: xU,
  title: SU,
  definitions: jU,
  type: EU,
  properties: OU,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = jh, n = cl, s = Ll, a = NU, i = ["/properties"], o = "http://json-schema.org/draft-07/schema";
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
  var u = Ea();
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return u.KeywordCxt;
  } });
  var c = ae;
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
  var f = Bn;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return f.default;
  } });
  var m = Br;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return m.default;
  } });
})(Ai, Ai.exports);
var cm = Ai.exports;
const AU = /* @__PURE__ */ On(cm);
var Ri = { exports: {} }, um = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(C, L) {
    return { validate: C, compare: L };
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
    regex: U,
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
  function r(C) {
    return C % 4 === 0 && (C % 100 !== 0 || C % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, s = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function a(C) {
    const L = n.exec(C);
    if (!L)
      return !1;
    const W = +L[1], K = +L[2], q = +L[3];
    return K >= 1 && K <= 12 && q >= 1 && q <= (K === 2 && r(W) ? 29 : s[K]);
  }
  function i(C, L) {
    if (C && L)
      return C > L ? 1 : C < L ? -1 : 0;
  }
  const o = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  function l(C, L) {
    const W = o.exec(C);
    if (!W)
      return !1;
    const K = +W[1], q = +W[2], T = +W[3], F = W[5];
    return (K <= 23 && q <= 59 && T <= 59 || K === 23 && q === 59 && T === 60) && (!L || F !== "");
  }
  function u(C, L) {
    if (!(C && L))
      return;
    const W = o.exec(C), K = o.exec(L);
    if (W && K)
      return C = W[1] + W[2] + W[3] + (W[4] || ""), L = K[1] + K[2] + K[3] + (K[4] || ""), C > L ? 1 : C < L ? -1 : 0;
  }
  const c = /t|\s/i;
  function f(C) {
    const L = C.split(c);
    return L.length === 2 && a(L[0]) && l(L[1], !0);
  }
  function m(C, L) {
    if (!(C && L))
      return;
    const [W, K] = C.split(c), [q, T] = L.split(c), F = i(W, q);
    if (F !== void 0)
      return F || u(K, T);
  }
  const h = /\/|:/, g = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function b(C) {
    return h.test(C) && g.test(C);
  }
  const y = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function p(C) {
    return y.lastIndex = 0, y.test(C);
  }
  const v = -2147483648, $ = 2 ** 31 - 1;
  function _(C) {
    return Number.isInteger(C) && C <= $ && C >= v;
  }
  function x(C) {
    return Number.isInteger(C);
  }
  function E() {
    return !0;
  }
  const A = /[^\\]\\Z/;
  function U(C) {
    if (A.test(C))
      return !1;
    try {
      return new RegExp(C), !0;
    } catch {
      return !1;
    }
  }
})(um);
var dm = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = cm, r = ae, n = r.operators, s = {
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
})(dm);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = um, n = dm, s = ae, a = new s.Name("fullFormats"), i = new s.Name("fastFormats"), o = (u, c = { keywords: !0 }) => {
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
})(Ri, Ri.exports);
var PU = Ri.exports;
const Nd = /* @__PURE__ */ On(PU), CU = {
  allErrors: !0,
  multipleOfPrecision: 8,
  strict: !1,
  verbose: !0,
  discriminator: !1
  // TODO enable this in V6
}, TU = /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/, IU = /^data:([a-z]+\/[a-z0-9-+.]+)?;(?:name=(.*);)?base64,(.*)$/;
function FU(e, t, r = {}, n, s = AU) {
  const a = new s({ ...CU, ...r });
  return n ? Nd(a, n) : n !== !1 && Nd(a), a.addFormat("data-url", IU), a.addFormat("color", TU), a.addKeyword(Pn), a.addKeyword(Ui), Array.isArray(e) && a.addMetaSchema(e), we(t) && Object.keys(t).forEach((i) => {
    a.addFormat(i, t[i]);
  }), a;
}
function kU(e = [], t) {
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
        let y = le(Z(t, `${b.replace(/^\./, "")}`)).title;
        if (y === void 0) {
          const p = o.replace(/\/properties\//g, "/").split("/").slice(1, -1).concat([g]);
          y = le(Z(t, p)).title;
        }
        if (y)
          c = c.replace(`'${g}'`, `'${y}'`);
        else {
          const p = Z(l, [Oe, g, "title"]);
          p && (c = c.replace(`'${g}'`, `'${p}'`));
        }
      }), m = c;
    else {
      const g = le(Z(t, `${f.replace(/^\./, "")}`)).title;
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
function DU(e, t, r, n, s, a, i) {
  const { validationError: o } = t;
  let l = kU(t.errors, i);
  o && (l = [...l, { stack: o.message }]), typeof a == "function" && (l = a(l, i));
  let u = JD(l);
  if (o && (u = {
    ...u,
    $schema: {
      __errors: [o.message]
    }
  }), typeof s != "function")
    return { errors: l, errorSchema: u };
  const c = rh(e, n, r, n, !0), f = s(c, _s(c), i), m = Ho(f);
  return ps({ errors: l, errorSchema: u }, m);
}
class RU {
  /** Constructs an `AJV8Validator` instance using the `options`
   *
   * @param options - The `CustomValidatorOptionsType` options that are used to create the AJV instance
   * @param [localizer] - If provided, is used to localize a list of Ajv `ErrorObject`s
   */
  constructor(t, r) {
    const { additionalMetaSchemas: n, customFormats: s, ajvOptionsOverrides: a, ajvFormatOptions: i, AjvClass: o } = t;
    this.ajv = FU(n, s, a, i, o), this.localizer = r;
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
    return xn(t, r);
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
    t[Mt] && (i = this.ajv.getSchema(t[Mt]));
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
    return DU(this, i, t, r, n, s, a);
  }
  /**
   * This function checks if a schema needs to be added and if the root schemas don't match it removes the old root schema from the ajv instance and adds the new one.
   * @param rootSchema - The root schema used to provide $ref resolutions
   */
  handleSchemaUpdate(t) {
    var r, n;
    const s = (r = t[Mt]) !== null && r !== void 0 ? r : Ud;
    this.ajv.getSchema(s) === void 0 ? this.ajv.addSchema(t, s) : Se(t, (n = this.ajv.getSchema(s)) === null || n === void 0 ? void 0 : n.schema) || (this.ajv.removeSchema(s), this.ajv.addSchema(t, s));
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
      const a = Jo(t), i = (s = a[Mt]) !== null && s !== void 0 ? s : zD(a);
      let o;
      return o = this.ajv.getSchema(i), o === void 0 && (o = this.ajv.addSchema(a, i).getSchema(i) || this.ajv.compile(a)), o(r);
    } catch (a) {
      return console.warn("Error encountered compiling schema:", a), !1;
    }
  }
}
function MU(e = {}, t) {
  return new RU(e, t);
}
const LU = MU(), UU = (e) => {
  const { widgetProps: t, updateWidgetProps: r } = Dd();
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
}, Ta = (e, t) => {
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
}, Ul = (e, t) => {
  const r = e.toLowerCase(), n = Ta(e, t);
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
}, Mi = (e, t) => {
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
}, Wl = (e) => typeof e == "string" && /^\[.*\]$/.test(e), WU = (e) => {
  if (!Wl(e)) return [];
  const t = e.match(/^\[(.*)\]$/);
  return t ? t[1].split(",").map((r) => r.trim()).filter((r) => r.length > 0) : [];
}, VU = (e, t) => {
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
  Wl(t) || // Static options array
  t.includes("|") || // Pipe-separated values
  t.includes(",") && t.split(",").length <= 10);
  return s || a;
}, fm = (e, t) => {
  const r = typeof t, n = e.toLowerCase(), s = {
    title: e.replace(/([A-Z])/g, " $1").replace(/^./, (i) => i.toUpperCase()),
    default: t
  };
  if (Mi(e, t))
    return s.type = "string", s.format = "uri", s;
  if (r === "string") {
    if (s.type = "string", VU(e, t)) {
      if (t && t.startsWith("/api/"))
        s.description = "API Endpoint", s["x-dynamic-select"] = !0;
      else if (Wl(t)) {
        const o = WU(t);
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
          return m === "string" ? (h.type = "string", Mi(c, f) && (h.format = "uri")) : m === "number" ? h.type = "number" : m === "boolean" ? h.type = "boolean" : h.type = "string", u[c] = h, u;
        }, {})
      }, s["x-array-of-objects"] = !0) : (s.items = { type: "object" }, s.format = "json");
    } else t.length > 0 && typeof t[0] == "string" ? (s.items = { type: "string" }, t.every((i) => typeof i == "string") && t.length <= 10 && (s.enum = t)) : s.items = { type: "string" };
  else r === "object" && t !== null ? (s.type = "object", s.format = "json") : s.type = "string";
  return s;
}, zU = (e) => {
  const t = {
    type: "object",
    properties: {},
    required: []
  };
  return Object.entries(e).forEach(([r, n]) => {
    t.properties[r] = fm(r, n);
  }), t;
}, qU = (e, t, r) => {
  const n = {
    "ui:order": Object.keys(t.properties || {})
  };
  return Object.keys(t.properties || {}).forEach((s) => {
    var o;
    const a = t.properties[s], i = e[s];
    Mi(s, i) ? n[s] = {
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
}, BU = (e) => {
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
}, KU = (e) => {
  const [t, r] = fe.useState(!1), [n, s] = fe.useState(e.value || ""), [a, i] = fe.useState(""), [o, l] = fe.useState(/* @__PURE__ */ new Set()), [u, c] = fe.useState(0);
  fe.useEffect(() => {
    s(e.value || ""), e.value || i("");
  }, [e.value]), fe.useEffect(() => () => {
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
          const A = new FileReader();
          A.onload = (U) => {
            var C;
            return E((C = U.target) == null ? void 0 : C.result);
          }, A.readAsDataURL($);
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
  }, g = Ta(e.name, n), b = Ul(e.name, n), p = (() => {
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
}, GU = (e) => {
  const [t, r] = fe.useState([]), [n, s] = fe.useState(!1), [a, i] = fe.useState(!1), [o, l] = fe.useState("");
  fe.useEffect(() => {
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
}, HU = (e) => {
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
}, JU = (e) => {
  var q;
  const [t, r] = fe.useState(e.value || []), [n, s] = fe.useState([]), [a, i] = fe.useState(
    {}
  ), [o, l] = fe.useState(
    /* @__PURE__ */ new Set()
  ), [u, c] = fe.useState(!1), [f, m] = fe.useState(!1), [h, g] = fe.useState(e.value || []);
  fe.useEffect(() => {
    const T = e.value || [];
    r(T), g(T);
    const { keys: F, schemas: k } = v(
      e.schema,
      T
    );
    s(F), i(k), m(!1);
  }, [e.schema, (q = e.value) == null ? void 0 : q.length]);
  const b = (T, F, k) => {
    const z = [...h];
    z[T] = { ...z[T], [F]: k }, g(z), m(!0);
    const J = [...t];
    J[T] = { ...J[T], [F]: k }, r(J);
  }, y = () => {
    e.onChange(h), r(h), m(!1);
  }, p = () => {
    const T = e.value || [];
    g(T), r(T), m(!1);
  }, v = (T, F) => {
    const k = [], z = {};
    if (T.items && T.items.properties)
      Object.entries(T.items.properties).forEach(
        ([J, Q]) => {
          k.push(J), z[J] = Q;
        }
      );
    else if (F && F.length > 0 && typeof F[0] == "object") {
      const J = F[0];
      Object.keys(J).forEach((Q) => {
        k.push(Q), z[Q] = fm(Q, J[Q]);
      });
    } else
      ["name", "value", "label", "key"].forEach((Q) => {
        k.push(Q), z[Q] = { type: "string", title: Q };
      });
    return { keys: k, schemas: z };
  }, $ = (T, F, k) => {
    const z = F.format || "", J = F.type || "string";
    return z === "file" || z === "uri" || T.toLowerCase().includes("url") || T.toLowerCase().includes("image") || T.toLowerCase().includes("video") || T.toLowerCase().includes("audio") || T.toLowerCase().includes("file") || T.toLowerCase().includes("src") || T.toLowerCase().includes("icon") || T.toLowerCase().includes("avatar") || T.toLowerCase().includes("logo") || T.toLowerCase().includes("thumbnail") || T.toLowerCase().includes("media") || typeof k == "string" && (k.startsWith("http") || k.startsWith("data:") || k.startsWith("blob:") || k.includes("/uploads/") || k.includes("/images/") || k.includes("/media/") || /\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|ogg|mp3|wav|pdf|doc|docx)$/i.test(k)) ? "file" : z === "color" ? "color" : z === "email" ? "email" : z === "uri" || z === "url" ? "url" : z === "date" ? "date" : z === "datetime" ? "datetime-local" : J === "number" ? "number" : z === "select" || z === "dynamic-select" ? "select" : "text";
  }, _ = (T) => {
    const [F, k] = fe.useState(
      T.value || ""
    ), [z, J] = fe.useState(""), [Q, M] = fe.useState(/* @__PURE__ */ new Set()), [j, D] = fe.useState(!1), [P, w] = fe.useState(0);
    fe.useEffect(() => {
      k(T.value || ""), T.value || J("");
    }, [T.value]), fe.useEffect(() => () => {
      Q.forEach((N) => {
        N.startsWith("blob:") && URL.revokeObjectURL(N);
      });
    }, [Q]);
    const S = async (N) => {
      var V;
      const R = (V = N.target.files) == null ? void 0 : V[0];
      if (R) {
        J(R.name), D(!0), w(0);
        try {
          let B;
          T.onFileUpload ? B = await T.onFileUpload(R, {
            onProgress: (ee) => {
              w(ee);
            },
            onError: (ee) => {
              console.error("Upload error:", ee), alert(`Upload failed: ${ee.message}`), D(!1), w(0);
            }
          }) : R.type.startsWith("image/") && R.size < 5 * 1024 * 1024 ? B = await new Promise((ee) => {
            const Ee = new FileReader();
            Ee.onload = (Me) => {
              var Ae;
              return ee((Ae = Me.target) == null ? void 0 : Ae.result);
            }, Ee.readAsDataURL(R);
          }) : (B = URL.createObjectURL(R), M((ee) => /* @__PURE__ */ new Set([...ee, B]))), k(B), T.onChange(B), D(!1), w(100);
        } catch (B) {
          console.error("File processing failed:", B), J(""), D(!1), w(0);
        } finally {
          N.target.value = "";
        }
      }
    }, I = (N) => {
      const R = N.target.value;
      k(R), T.onChange(R), J("");
    }, G = () => {
      F.startsWith("blob:") && Q.has(F) && (URL.revokeObjectURL(F), M((N) => {
        const R = new Set(N);
        return R.delete(F), R;
      })), k(""), J(""), w(0), T.onChange("");
    }, ne = (() => {
      if (z) return z;
      if (!F) return "";
      try {
        return F.startsWith("data:") ? "Image file" : F.startsWith("blob:") ? "Selected file" : new URL(F).pathname.split("/").pop() || "File";
      } catch {
        const N = F.split("/");
        return N[N.length - 1].split("?")[0] || "File";
      }
    })(), te = Ta(T.name, F), O = Ul(T.name, F);
    return /* @__PURE__ */ d.jsxs("div", { className: "space-y-3 w-full", children: [
      /* @__PURE__ */ d.jsx("div", { className: "space-y-2 w-full", children: /* @__PURE__ */ d.jsxs("div", { className: "flex space-x-2 w-full", children: [
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "url",
            value: F,
            onChange: I,
            className: "flex-1 min-w-0 p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
            placeholder: "https://example.com/file.jpg"
          }
        ),
        F && /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            onClick: G,
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
              accept: O,
              className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
            }
          ) }),
          j && /* @__PURE__ */ d.jsx("div", { className: "flex-shrink-0 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg text-sm flex items-center whitespace-nowrap", children: /* @__PURE__ */ d.jsxs("span", { children: [
            "Uploading... ",
            P,
            "%"
          ] }) }),
          ne && /* @__PURE__ */ d.jsx("div", { className: "w-full", children: /* @__PURE__ */ d.jsxs(
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
        /* @__PURE__ */ d.jsxs("div", { className: "text-xs text-gray-500 flex justify-between", children: [
          /* @__PURE__ */ d.jsxs("span", { children: [
            "Accepted: ",
            O === "*/*" ? "All files" : O
          ] }),
          !T.onFileUpload && /* @__PURE__ */ d.jsx("span", { className: "text-orange-600", children: "Local preview only" })
        ] })
      ] }),
      F && (te === "image" || te === "video" || te === "audio") && /* @__PURE__ */ d.jsxs("div", { className: "space-y-2 w-full", children: [
        /* @__PURE__ */ d.jsx("label", { className: "block text-xs font-medium text-gray-700", children: "Preview" }),
        /* @__PURE__ */ d.jsxs("div", { className: "border border-gray-200 rounded p-2 w-full bg-gray-50", children: [
          te === "image" && /* @__PURE__ */ d.jsx("div", { className: "flex flex-col items-center space-y-2", children: /* @__PURE__ */ d.jsx(
            "img",
            {
              src: F,
              alt: "Preview",
              className: "max-w-full max-h-32 object-contain rounded",
              onError: (N) => {
                N.target.style.display = "none";
                const R = N.target.parentElement;
                if (R) {
                  const V = document.createElement("div");
                  V.className = "text-center py-2", V.innerHTML = `
                        <div class="text-xl mb-1">🖼️</div>
                        <div class="text-xs text-gray-600">Preview not available</div>
                      `, R.appendChild(V);
                }
              }
            }
          ) }),
          te === "video" && /* @__PURE__ */ d.jsx("div", { className: "flex flex-col items-center space-y-2", children: /* @__PURE__ */ d.jsx(
            "video",
            {
              src: F,
              controls: !0,
              className: "max-w-full max-h-32 rounded"
            }
          ) }),
          te === "audio" && /* @__PURE__ */ d.jsx("div", { className: "w-full", children: /* @__PURE__ */ d.jsx("audio", { src: F, controls: !0, className: "w-full" }) })
        ] })
      ] }),
      F && (te === "document" || te === "file") && /* @__PURE__ */ d.jsxs("div", { className: "space-y-2 w-full", children: [
        /* @__PURE__ */ d.jsx("label", { className: "block text-xs font-medium text-gray-700", children: "Preview" }),
        /* @__PURE__ */ d.jsxs("div", { className: "border border-gray-200 rounded p-3 bg-gray-50 text-center", children: [
          /* @__PURE__ */ d.jsx("div", { className: "text-2xl mb-1", children: te === "document" ? "📄" : "📎" }),
          ne && /* @__PURE__ */ d.jsx("div", { className: "text-xs text-gray-600 truncate", children: ne })
        ] })
      ] })
    ] });
  }, x = (T, F, k, z) => {
    const J = $(T, F, k), Q = `Enter ${T}`;
    switch (J) {
      case "color":
        return /* @__PURE__ */ d.jsxs("div", { className: "flex space-x-2 items-center", children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "color",
              value: k || "#000000",
              onChange: (j) => z(j.target.value),
              className: "w-8 h-8 border border-gray-300 rounded cursor-pointer"
            }
          ),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "text",
              value: k,
              onChange: (j) => z(j.target.value),
              className: "flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
              placeholder: Q
            }
          )
        ] });
      case "select":
        const M = F.enum || [];
        return /* @__PURE__ */ d.jsxs(
          "select",
          {
            value: k || "",
            onChange: (j) => z(j.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
            children: [
              /* @__PURE__ */ d.jsxs("option", { value: "", children: [
                "Select ",
                T
              ] }),
              M.map((j) => /* @__PURE__ */ d.jsx("option", { value: j, children: j }, j))
            ]
          }
        );
      case "file":
        return /* @__PURE__ */ d.jsx(
          _,
          {
            value: k,
            onChange: z,
            onFileUpload: e.onFileUpload,
            schema: F,
            name: T
          }
        );
      case "date":
        return /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "date",
            value: k || "",
            onChange: (j) => z(j.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          }
        );
      case "datetime-local":
        return /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "datetime-local",
            value: k || "",
            onChange: (j) => z(j.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          }
        );
      default:
        return /* @__PURE__ */ d.jsx(
          "input",
          {
            type: J,
            value: k || "",
            onChange: (j) => z(j.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
            placeholder: Q,
            step: J === "number" ? "any" : void 0
          }
        );
    }
  }, E = (T) => {
    const F = new Set(o);
    F.has(T) ? F.delete(T) : F.add(T), l(F);
  }, A = () => {
    if (u)
      l(/* @__PURE__ */ new Set());
    else {
      const T = new Set(t.map((F, k) => k));
      l(T);
    }
    c(!u);
  }, U = () => {
    if (o.size === 0) return;
    const T = h.filter((F, k) => !o.has(k));
    g(T), r(T), l(/* @__PURE__ */ new Set()), c(!1), m(!0);
  }, C = () => {
    const T = n.reduce((k, z) => {
      var Q;
      const J = ((Q = a[z]) == null ? void 0 : Q.default) || "";
      return k[z] = J, k;
    }, {}), F = [...h, T];
    g(F), r(F), m(!0);
  }, L = (T) => {
    const F = h.filter((z, J) => J !== T);
    g(F), r(F);
    const k = new Set(o);
    k.delete(T), l(k), m(!0);
  }, W = () => {
    g([]), r([]), l(/* @__PURE__ */ new Set()), c(!1), m(!0);
  }, K = (T, F) => F.description ? F.description : F.format === "select" ? "Select field" : F.format === "dynamic-select" ? "Dynamic select field" : F.format === "file" ? "File field" : "";
  return /* @__PURE__ */ d.jsxs("div", { className: "space-y-4 w-full", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ d.jsx("div", { className: "flex items-center space-x-4", children: t.length > 0 && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "checkbox",
              checked: u,
              onChange: A,
              className: "w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            }
          ),
          /* @__PURE__ */ d.jsx("span", { className: "ml-2 text-sm text-gray-700", children: "Select All" })
        ] }),
        o.size > 0 && /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            onClick: U,
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
            onClick: C,
            className: "px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors",
            children: "Add Item"
          }
        ),
        t.length > 0 && /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            onClick: W,
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
    ] }) : /* @__PURE__ */ d.jsx("div", { className: "space-y-4 w-full", children: t.map((T, F) => /* @__PURE__ */ d.jsxs(
      "div",
      {
        className: `border rounded-lg p-4 bg-slate-50 shadow-sm w-full transition-all ${o.has(F) ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200" : "border-gray-200 hover:border-gray-300"}`,
        children: [
          /* @__PURE__ */ d.jsxs("div", { className: "flex justify-between items-center mb-4 pb-3 border-b border-gray-200", children: [
            /* @__PURE__ */ d.jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ d.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: o.has(F),
                  onChange: () => E(F),
                  className: "w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                }
              ),
              /* @__PURE__ */ d.jsxs("h4", { className: "font-medium text-gray-700 text-sm", children: [
                "Item ",
                F + 1
              ] })
            ] }),
            /* @__PURE__ */ d.jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ d.jsxs("div", { className: "flex space-x-1", children: [
                n.includes("name") && n.includes("value") && /* @__PURE__ */ d.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      const k = T.name || `Item ${F + 1}`, z = T.value || `value${F + 1}`;
                      b(F, "name", k), b(F, "value", z);
                    },
                    className: "px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors",
                    title: "Auto-fill name and value",
                    children: "Auto-fill"
                  }
                ),
                n.includes("label") && !T.label && T.name && /* @__PURE__ */ d.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      b(F, "label", T.name);
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
                  onClick: () => L(F),
                  className: "px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors",
                  children: "Delete"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ d.jsx("div", { className: "space-y-4 w-full", children: n.map((k) => {
            const z = a[k] || {}, J = T[k] || "", Q = K(k, z);
            return /* @__PURE__ */ d.jsxs("div", { className: "space-y-2 w-full", children: [
              /* @__PURE__ */ d.jsxs("label", { className: "block text-sm font-medium text-gray-700 capitalize", children: [
                z.title || k.replace(/([A-Z])/g, " $1").toLowerCase(),
                z.format === "file" && " 📁",
                z.format === "select" && " 📋",
                z.format === "dynamic-select" && " 🔄"
              ] }),
              /* @__PURE__ */ d.jsx("div", { className: "w-full", children: x(
                k,
                z,
                J,
                (M) => b(F, k, M)
              ) }),
              Q && /* @__PURE__ */ d.jsx("p", { className: "text-xs text-gray-500", children: Q })
            ] }, k);
          }) })
        ]
      },
      F
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
}, YU = (e) => /* @__PURE__ */ d.jsx(
  "input",
  {
    type: "text",
    value: e.value || "",
    onChange: (t) => e.onChange(t.target.value),
    className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    placeholder: e.placeholder
  }
), ZU = (e) => {
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
}, XU = (e) => /* @__PURE__ */ d.jsx(
  "input",
  {
    type: "number",
    value: e.value || "",
    onChange: (t) => e.onChange(Number(t.target.value)),
    className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    step: e.step || "any"
  }
), QU = (e) => {
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
}, e9 = (e) => {
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
}, t9 = (e) => /* @__PURE__ */ d.jsx(
  "input",
  {
    type: "email",
    value: e.value || "",
    onChange: (t) => e.onChange(t.target.value),
    className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    placeholder: e.placeholder
  }
), r9 = (e) => /* @__PURE__ */ d.jsx(
  "input",
  {
    type: "url",
    value: e.value || "",
    onChange: (t) => e.onChange(t.target.value),
    className: "w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    placeholder: e.placeholder
  }
), n9 = (e) => /* @__PURE__ */ d.jsxs("div", { className: "flex space-x-3 items-center", children: [
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
] }), s9 = (e) => /* @__PURE__ */ d.jsxs("div", { className: "flex items-center", children: [
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
] }), a9 = ({
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
  } = An(), { updateProps: l, getProps: u } = UU(s == null ? void 0 : s.id), c = Ut({
    instanceId: (s == null ? void 0 : s.id) || null,
    component: a
  });
  if (st(() => {
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
    b = zU(g), y = qU(g, b, e);
  } catch (E) {
    return console.error("Error generating schema:", E), /* @__PURE__ */ d.jsxs("div", { className: "p-6 text-center text-red-500", children: [
      /* @__PURE__ */ d.jsx("div", { className: "mb-3 text-2xl", children: "❌" }),
      /* @__PURE__ */ d.jsx("p", { className: "text-base", children: "Error generating properties form" }),
      /* @__PURE__ */ d.jsx("p", { className: "text-sm mt-2", children: "Please check the console for details" })
    ] });
  }
  const p = (E) => {
    if (E.formData && s) {
      const A = { ...g, ...E.formData }, U = {
        ...s,
        props: A
      };
      i(U), l(A);
    }
  }, v = {
    FileWidget: (E) => /* @__PURE__ */ d.jsx(
      KU,
      {
        ...E,
        onFileUpload: e ? (A) => {
          const U = Ta(E.name, E.value), C = Ul(E.name, E.value);
          return e(A, {
            onProgress: (L) => {
              console.log(`Upload progress: ${L}%`);
            },
            onError: (L) => {
              console.error("Upload error:", L), alert(`Upload failed: ${L.message}`);
            },
            options: {
              fileType: U,
              fieldName: E.name,
              acceptTypes: C,
              componentType: f
            }
          });
        } : void 0
      }
    ),
    CustomSelectWidget: (E) => /* @__PURE__ */ d.jsx(
      GU,
      {
        ...E,
        onGetSelectOptions: n,
        componentType: f,
        uiSchema: y[E.name]
      }
    ),
    JsonWidget: HU,
    ArrayOfObjectsWidget: (E) => /* @__PURE__ */ d.jsx(
      JU,
      {
        ...E,
        onFileUpload: e ? (A, U, C) => e(A, {
          onProgress: (L) => {
            console.log(`Upload progress: ${L}%`);
          },
          onError: (L) => {
            console.error("Upload error:", L), alert(`Upload failed: ${L.message}`);
          },
          options: {
            fieldName: U || E.name,
            fieldType: C || "file",
            componentType: f,
            isArrayItem: !0
          }
        }) : void 0
      }
    ),
    CustomTextWidget: YU,
    CustomTextareaWidget: ZU,
    CustomNumberWidget: XU,
    CustomDateWidget: QU,
    CustomDateTimeWidget: e9,
    CustomEmailWidget: t9,
    CustomURLWidget: r9,
    CustomColorWidget: n9,
    CustomCheckboxWidget: s9
  }, $ = {
    FieldTemplate: BU
  }, _ = (E) => typeof E != "string" ? !1 : E.startsWith("/api/"), x = (E) => typeof E != "string" ? !1 : E.toLowerCase().startsWith("/customaction/");
  return /* @__PURE__ */ d.jsxs("div", { className: "h-full p-4 space-y-4 max-h-[calc(100vh-48*0.25rem)] bg-zinc-200 overflow-y-auto", children: [
    /* @__PURE__ */ d.jsx("div", { className: "border-b border-gray-200 bg-transparent p-6 sticky top-0 z-10", children: /* @__PURE__ */ d.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ d.jsxs("h3", { className: "text-xl font-semibold text-gray-900", children: [
      f,
      s && /* @__PURE__ */ d.jsxs("span", { className: "text-sm text-gray-500 ml-2 font-normal", children: [
        "(ID: ",
        s.id,
        ")"
      ] })
    ] }) }) }),
    /* @__PURE__ */ d.jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ d.jsx("div", { className: "properties-form", children: /* @__PURE__ */ d.jsx(
        jM,
        {
          schema: b,
          uiSchema: y,
          formData: g,
          onChange: p,
          validator: LU,
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
            ([E, A]) => _(A)
          ) && /* @__PURE__ */ d.jsx(
            "button",
            {
              onClick: async () => {
                try {
                  const E = Object.entries(
                    g
                  ).filter(([A, U]) => _(U));
                  for (const [A, U] of E)
                    await i9(A, U, t);
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
            ([E, A]) => x(A)
          ) && /* @__PURE__ */ d.jsx(
            "button",
            {
              onClick: async () => {
                try {
                  const E = Object.entries(
                    g
                  ).filter(([A, U]) => x(U));
                  for (const [A, U] of E) {
                    const C = U.replace(
                      "/customaction/",
                      ""
                    );
                    await o9(
                      A,
                      C,
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
    (s || a) && /* @__PURE__ */ d.jsx("div", { className: "border-t border-gray-200 bg-transparent p-6 sticky bottom-0", children: /* @__PURE__ */ d.jsxs("div", { className: "flex space-x-3", children: [
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
              (A, U) => {
                const C = g[U];
                return typeof C == "number" ? A[U] = 0 : typeof C == "boolean" ? A[U] = !1 : Array.isArray(C) ? A[U] = [] : typeof C == "object" ? A[U] = {} : A[U] = "", A;
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
}, i9 = async (e, t, r) => {
  if (r)
    try {
      return await r(t);
    } catch (n) {
      throw console.error("API call failed:", n), n;
    }
}, o9 = async (e, t, r, n) => {
  if (n)
    try {
      return await n(t, r);
    } catch (s) {
      throw console.error("Custom action failed:", s), s;
    }
};
function l9({ onDropDelete: e }) {
  const { removeWidget: t } = Nn(), r = oe((i) => {
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
const c9 = ({
  componentMapProvider: e,
  onDragStart: t
}) => {
  const { setSelectedComponent: r, setSelectedInstance: n } = An(), s = Ld(e);
  return /* @__PURE__ */ d.jsxs("div", { className: "h-full p-4 space-y-4 max-h-[calc(100vh-48*0.25rem)] bg-zinc-200 overflow-y-auto", children: [
    /* @__PURE__ */ d.jsx("h3", { className: "text-lg font-medium mb-3", children: "Components" }),
    /* @__PURE__ */ d.jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Drag components to the main area or click to select them" }),
    /* @__PURE__ */ d.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ d.jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Delete Zone" }),
      /* @__PURE__ */ d.jsx(
        l9,
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
}, u9 = ({ onFileUpload: e }) => {
  const { attributes: t, setPageAttributes: r } = An(), [n, s] = $e(!1), [a, i] = $e(0), o = Ut(null), l = (h, g) => {
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
function Ad({
  onClick: e,
  icon: t,
  label: r,
  className: n = "",
  successMessage: s = "Success",
  errorMessage: a = "Error"
}) {
  const [i, o] = $e(null), [l, u] = $e(!1), c = async () => {
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
        children: l ? /* @__PURE__ */ d.jsx(Md, { className: "stack-btn-icon animate-spin" }) : /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
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
function rn({
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
const d9 = () => {
  const [e, t] = $e(!1);
  return st(() => {
    const r = () => {
      t(window.innerWidth <= 768);
    };
    return r(), window.addEventListener("resize", r), () => {
      window.removeEventListener("resize", r);
    };
  }, []), e;
}, f9 = ({
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
  const [m, h] = $e(
    t
  ), g = d9(), [b, y] = $e(!g), [p, v] = $e(!1), $ = Ut(!0), {
    activeTab: _,
    setActiveTab: x,
    attributes: E,
    setPageAttributes: A,
    setSelectedInstance: U,
    setSelectedComponent: C,
    widgetProps: L
    // Add this to get widgetProps from context
  } = An(), [W, K] = $e({
    id: e,
    type: "page",
    title: "untitled page",
    layout: Fa
  }), [q, T] = $e(), [F, k] = $e(), [z, J] = $e(0), [Q, M] = $e(Fa), j = Ut(null), [D, P] = $e(), [w, S] = $e(!1);
  st(() => {
    h(t);
  }, [t]), st(() => {
    setTimeout(() => {
      $.current && g && ($.current = !1, y(!g));
    }, 100);
  }, [g]), st(() => {
    m === "preview" || m === "view" ? A((X) => ({
      ...X,
      showMenubar: !1
    })) : m === "edit" && A((X) => ({
      ...X,
      showMenubar: !0
    }));
  }, [m, A]);
  const I = oe(
    async (X) => {
      const ue = await n(X);
      return K(ue), T(ue.title), k(ue.title), A(ue.attributes || E), ue.layout;
    },
    [n]
  ), G = oe(async () => {
    if (e) {
      K((ue) => ({ ...ue, id: e }));
      const X = await I(e);
      M(X), J((ue) => ue + 1), N(), console.log(`Reload layout: pageid ${e}, props id ${W == null ? void 0 : W.id}`);
    }
  }, [e, I]);
  st(() => {
    (async () => {
      if (e)
        try {
          await G();
        } catch (ue) {
          console.error("Failed to load layout:", ue);
        }
    })();
  }, [e, G]);
  const Y = () => {
    i && i();
  }, ne = (X, ue) => {
    if (!X) return X;
    const bt = Array.isArray(X) ? X : X.children;
    if (!bt) return X;
    const dr = bt.map((We) => {
      if (We.id && ue.has(We.id)) {
        const Hr = ue.get(We.id);
        try {
          let $t = { name: "", props: {} };
          return We.content && ($t = JSON.parse(We.content)), $t.props = { ...$t.props, ...Hr }, {
            ...We,
            content: JSON.stringify($t)
          };
        } catch ($t) {
          return console.error(`Error updating props for widget ${We.id}:`, $t), We;
        }
      }
      return We;
    });
    return Array.isArray(X) ? dr : {
      ...X,
      children: dr
    };
  }, te = () => {
    var bt;
    let X = (bt = j.current) == null ? void 0 : bt.saveLayout();
    return X && (X = ne(X, L)), {
      ...W,
      id: e,
      layout: X,
      attributes: E,
      type: E.type,
      title: E.title,
      status: E.status,
      published_at: E.published_at
    };
  }, O = async () => {
    if (r) {
      const X = te();
      await r(X);
    }
  }, N = () => {
    C(null), U(null);
  }, R = () => {
    confirm("Are you sure you want to clear all data? This cannot be undone.") && (M(Fa), J((X) => X + 1), N());
  }, V = () => {
    v(!0);
  }, B = () => {
    v(!1);
  }, ee = (X) => {
    X.key === "Enter" ? B() : X.key === "Escape" && (k(q), v(!1));
  }, Ee = (X, ue) => {
    X.dataTransfer.setData("text/plain", ue), X.dataTransfer.effectAllowed = "copy";
  }, Me = (X) => {
    P(X);
  }, Ae = oe(
    (X) => {
      const ue = {
        id: X.id,
        type: X.name,
        props: X.props
      };
      U(ue), C(X.name), x("properties");
    },
    [U, C, x]
  );
  st(() => {
    D && j.current && (D.name !== "SubGrid" ? j.current.addWidget((X) => ({
      ...D,
      sizeToContent: !0,
      content: JSON.stringify({
        name: D.name,
        props: pg(a)[D.name]
      })
    })) : j.current.addSubGrid((X) => ({
      ...D,
      ...fg
    })));
  }, [D, a]);
  const Le = g ? {
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
  }, Pe = {
    margin: E.margin,
    padding: E.padding,
    backgroundColor: E.background
  };
  return /* @__PURE__ */ d.jsx(Nm, { initialOptions: Q, children: /* @__PURE__ */ d.jsxs("div", { className: "min-h-screen bg-white text-black flex flex-col", children: [
    m === "edit" && /* @__PURE__ */ d.jsx("header", { className: "mx-2 p-4 bg-white shadow relative", children: /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col md:flex-row md:items-center text-lg", children: [
      /* @__PURE__ */ d.jsx("div", { className: "flex-1 mb-3 sm:mb-0 min-w-0", children: /* @__PURE__ */ d.jsx("div", { className: "flex items-center gap-2", children: p ? /* @__PURE__ */ d.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "text",
          value: F,
          onChange: (X) => k(X.target.value),
          onKeyDown: ee,
          onBlur: B,
          maxLength: 100,
          className: "text-2xl font-bold border-b-2 border-blue-500 bg-transparent outline-none px-1",
          autoFocus: !0
        }
      ) }) : /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2 group", children: [
        /* @__PURE__ */ d.jsx("h1", { className: "text-2xl font-bold truncate", children: F }),
        /* @__PURE__ */ d.jsx(
          "button",
          {
            onClick: V,
            className: "p-1 text-gray-400 hover:text-gray-600 group-hover:opacity-100 transition-opacity",
            children: /* @__PURE__ */ d.jsx(lg, { className: "stack-btn-icon" })
          }
        )
      ] }) }) }),
      /* @__PURE__ */ d.jsxs("div", { className: "flex flex-wrap gap-1 justify-end", children: [
        /* @__PURE__ */ d.jsx(
          rn,
          {
            onClick: Y,
            icon: /* @__PURE__ */ d.jsx(Zm, { className: "stack-btn-icon" }),
            tooltip: "Back to list",
            className: "bg-gray-200 hover:bg-gray-300"
          }
        ),
        /* @__PURE__ */ d.jsx(
          rn,
          {
            onClick: () => h("preview"),
            icon: /* @__PURE__ */ d.jsx(sg, { className: "stack-btn-icon" }),
            tooltip: "Preview",
            className: "bg-purple-600 hover:bg-purple-700 text-white"
          }
        ),
        /* @__PURE__ */ d.jsx(
          Ad,
          {
            onClick: O,
            icon: /* @__PURE__ */ d.jsx(rg, { className: "stack-btn-icon" }),
            label: "Save",
            className: "bg-green-600 hover:bg-green-700 text-white",
            successMessage: "Saved successfully!",
            errorMessage: "Save failed"
          }
        ),
        /* @__PURE__ */ d.jsx(
          Ad,
          {
            onClick: G,
            icon: /* @__PURE__ */ d.jsx(Md, { className: "stack-btn-icon" }),
            label: "Reload",
            className: "bg-green-600 hover:bg-green-700 text-white",
            successMessage: "Reloaded successfully",
            errorMessage: "Failed to reload"
          }
        ),
        /* @__PURE__ */ d.jsx(
          rn,
          {
            onClick: R,
            icon: /* @__PURE__ */ d.jsx(ug, { className: "stack-btn-icon" }),
            tooltip: "Clear all data",
            className: "bg-red-600 hover:bg-red-700 text-white"
          }
        ),
        /* @__PURE__ */ d.jsx(
          rn,
          {
            onClick: () => S(!0),
            icon: /* @__PURE__ */ d.jsx(ig, { className: "stack-btn-icon" }),
            tooltip: "Page Info & Settings",
            className: "bg-indigo-600 hover:bg-indigo-700 text-white"
          }
        ),
        !g && /* @__PURE__ */ d.jsx(
          rn,
          {
            onClick: () => y(!b),
            icon: b ? /* @__PURE__ */ d.jsx(Gl, { className: "stack-btn-icon" }) : /* @__PURE__ */ d.jsx(Kl, { className: "stack-btn-icon" }),
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
          style: Pe,
          children: /* @__PURE__ */ d.jsx("div", { className: "h-full", children: /* @__PURE__ */ d.jsx("div", { className: "bg-white rounded-lg shadow h-full flex flex-col", children: /* @__PURE__ */ d.jsxs(
            "div",
            {
              className: `flex-1 relative p-0 grid-stack-mode-${m}`,
              children: [
                /* @__PURE__ */ d.jsx(hg, { ref: j }),
                /* @__PURE__ */ d.jsx(
                  Vm,
                  {
                    onGridStackDropEvent: Me,
                    children: /* @__PURE__ */ d.jsx(
                      Hm,
                      {
                        componentMap: Ld(s),
                        showMenubar: E.showMenubar,
                        onWidgetSelect: Ae
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
            style: Le,
            children: [
              g && /* @__PURE__ */ d.jsx("div", { className: "absolute top-4 right-4 z-10", children: /* @__PURE__ */ d.jsx(
                "button",
                {
                  onClick: () => y(!1),
                  className: "p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors",
                  children: /* @__PURE__ */ d.jsx(Gl, { className: "stack-btn-icon" })
                }
              ) }),
              /* @__PURE__ */ d.jsx("div", { className: "flex border-b border-gray-200 pt-4 px-4", children: ["components", "properties", "page"].map(
                (X) => /* @__PURE__ */ d.jsx(
                  "button",
                  {
                    className: `flex-1 py-3 px-4 text-sm font-medium capitalize transition-colors ${_ === X ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`,
                    onClick: () => x(X),
                    children: X
                  },
                  X
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
                      c9,
                      {
                        componentMapProvider: s,
                        onDragStart: Ee
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
                      a9,
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
                    children: /* @__PURE__ */ d.jsx(u9, { onFileUpload: o })
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
        children: /* @__PURE__ */ d.jsx(Kl, { className: "stack-btn-icon" })
      }
    ) }),
    m === "preview" && /* @__PURE__ */ d.jsx("div", { className: "fixed inset-0 pointer-events-none z-50", children: /* @__PURE__ */ d.jsx("div", { className: "absolute bottom-8 right-8 pointer-events-auto", children: /* @__PURE__ */ d.jsxs(
      "button",
      {
        onClick: () => h("edit"),
        className: "flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 group",
        title: "Return to Edit Mode",
        children: [
          /* @__PURE__ */ d.jsx(Bl, { className: "stack-btn-icon group-hover:animate-bounce" }),
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
          /* @__PURE__ */ d.jsx(Bl, { className: "stack-btn-icon group-hover:animate-bounce" }),
          /* @__PURE__ */ d.jsx("span", { className: "text-sm font-medium", children: "Back to List" })
        ]
      }
    ) }) }),
    /* @__PURE__ */ d.jsx(
      gg,
      {
        isOpen: w,
        pageInfo: te,
        resetOpenInfo: S
      }
    )
  ] }) }, z);
}, $9 = (e) => /* @__PURE__ */ d.jsx(yg, { children: /* @__PURE__ */ d.jsx(f9, { ...e }) });
export {
  Nm as GridStackProvider,
  Hm as GridStackRender,
  Vm as GridStackRenderProvider,
  b9 as LocaleProvider,
  $9 as StackPage,
  Fa as gridOptions,
  fg as subGridOptions,
  Nn as useGridStackContext,
  y9 as useGridStackWidgetContext,
  v9 as useLocale
};
//# sourceMappingURL=stackpage.es.js.map
