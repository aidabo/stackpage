import * as i from "react";
import tt, { createContext as H, useContext as se, useState as f, useCallback as E, useRef as P, useLayoutEffect as pe, useMemo as rt, useEffect as G, forwardRef as nt, useImperativeHandle as st } from "react";
import { GridStack as $ } from "gridstack";
import { createPortal as ot } from "react-dom";
function at(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var ke = { exports: {} }, U = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var it = tt, lt = Symbol.for("react.element"), ct = Symbol.for("react.fragment"), dt = Object.prototype.hasOwnProperty, ut = it.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, mt = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ne(t, r, n) {
  var s, a = {}, c = null, d = null;
  n !== void 0 && (c = "" + n), r.key !== void 0 && (c = "" + r.key), r.ref !== void 0 && (d = r.ref);
  for (s in r) dt.call(r, s) && !mt.hasOwnProperty(s) && (a[s] = r[s]);
  if (t && t.defaultProps) for (s in r = t.defaultProps, r) a[s] === void 0 && (a[s] = r[s]);
  return { $$typeof: lt, type: t, key: c, ref: d, props: a, _owner: ut.current };
}
U.Fragment = ct;
U.jsx = Ne;
U.jsxs = Ne;
ke.exports = U;
var e = ke.exports;
const Ce = H(null);
function _() {
  const t = se(Ce);
  if (!t)
    throw new Error(
      "useGridStackContext must be used within a GridStackProvider"
    );
  return t;
}
function gt({
  children: t,
  initialOptions: r
}) {
  const [n, s] = f(null), [a, c] = f(() => {
    var N;
    const l = /* @__PURE__ */ new Map(), g = (v) => {
      var w;
      v.id && v.content && l.set(v.id, v), (w = v.subGridOpts) != null && w.children && v.subGridOpts.children.forEach((j) => {
        g(j);
      });
    };
    return (N = r.children) == null || N.forEach((v) => {
      g(v);
    }), l;
  }), d = E(
    (l) => {
      const g = `widget-${Math.random().toString(36).substring(2, 15)}`, N = l(g);
      n == null || n.addWidget({ ...N, id: g }), c((v) => {
        const w = new Map(v);
        return w.set(g, N), w;
      });
    },
    [n]
  ), p = E(
    (l) => {
      const g = `sub-grid-${Math.random().toString(36).substring(2, 15)}`, N = /* @__PURE__ */ new Map(), v = l(g, (w) => {
        const j = `widget-${Math.random().toString(36).substring(2, 15)}`;
        return N.set(j, w), { ...w, id: j };
      });
      n == null || n.addWidget({ ...v, id: g }), c((w) => {
        const j = new Map(w);
        return N.forEach((R, O) => {
          j.set(O, R);
        }), j;
      });
    },
    [n]
  ), u = E(
    (l) => {
      n == null || n.removeWidget(l), c((g) => {
        const N = new Map(g);
        return N.delete(l), N;
      });
    },
    [n]
  ), h = E(() => n == null ? void 0 : n.save(!0, !0, (l, g) => g), [n]);
  return /* @__PURE__ */ e.jsx(
    Ce.Provider,
    {
      value: {
        initialOptions: r,
        gridStack: n,
        addWidget: d,
        removeWidget: u,
        addSubGrid: p,
        saveOptions: h,
        _gridStack: {
          value: n,
          set: s
        },
        _rawWidgetMetaMap: {
          value: a,
          set: c
        }
      },
      children: t
    }
  );
}
const Se = H(null);
function pt() {
  const t = se(Se);
  if (!t)
    throw new Error(
      "useGridStackRenderContext must be used within a GridStackProvider"
    );
  return t;
}
var ht = typeof Element < "u", ft = typeof Map == "function", xt = typeof Set == "function", bt = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
function F(t, r) {
  if (t === r) return !0;
  if (t && r && typeof t == "object" && typeof r == "object") {
    if (t.constructor !== r.constructor) return !1;
    var n, s, a;
    if (Array.isArray(t)) {
      if (n = t.length, n != r.length) return !1;
      for (s = n; s-- !== 0; )
        if (!F(t[s], r[s])) return !1;
      return !0;
    }
    var c;
    if (ft && t instanceof Map && r instanceof Map) {
      if (t.size !== r.size) return !1;
      for (c = t.entries(); !(s = c.next()).done; )
        if (!r.has(s.value[0])) return !1;
      for (c = t.entries(); !(s = c.next()).done; )
        if (!F(s.value[1], r.get(s.value[0]))) return !1;
      return !0;
    }
    if (xt && t instanceof Set && r instanceof Set) {
      if (t.size !== r.size) return !1;
      for (c = t.entries(); !(s = c.next()).done; )
        if (!r.has(s.value[0])) return !1;
      return !0;
    }
    if (bt && ArrayBuffer.isView(t) && ArrayBuffer.isView(r)) {
      if (n = t.length, n != r.length) return !1;
      for (s = n; s-- !== 0; )
        if (t[s] !== r[s]) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
    if (t.valueOf !== Object.prototype.valueOf && typeof t.valueOf == "function" && typeof r.valueOf == "function") return t.valueOf() === r.valueOf();
    if (t.toString !== Object.prototype.toString && typeof t.toString == "function" && typeof r.toString == "function") return t.toString() === r.toString();
    if (a = Object.keys(t), n = a.length, n !== Object.keys(r).length) return !1;
    for (s = n; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, a[s])) return !1;
    if (ht && t instanceof Element) return !1;
    for (s = n; s-- !== 0; )
      if (!((a[s] === "_owner" || a[s] === "__v" || a[s] === "__o") && t.$$typeof) && !F(t[a[s]], r[a[s]]))
        return !1;
    return !0;
  }
  return t !== t && r !== r;
}
var vt = function(r, n) {
  try {
    return F(r, n);
  } catch (s) {
    if ((s.message || "").match(/stack|recursion/i))
      return console.warn("react-fast-compare cannot handle circular refs"), !1;
    throw s;
  }
};
const wt = /* @__PURE__ */ at(vt), y = [];
for (let t = 0; t < 256; ++t)
  y.push((t + 256).toString(16).slice(1));
function jt(t, r = 0) {
  return (y[t[r + 0]] + y[t[r + 1]] + y[t[r + 2]] + y[t[r + 3]] + "-" + y[t[r + 4]] + y[t[r + 5]] + "-" + y[t[r + 6]] + y[t[r + 7]] + "-" + y[t[r + 8]] + y[t[r + 9]] + "-" + y[t[r + 10]] + y[t[r + 11]] + y[t[r + 12]] + y[t[r + 13]] + y[t[r + 14]] + y[t[r + 15]]).toLowerCase();
}
let X;
const yt = new Uint8Array(16);
function kt() {
  if (!X) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    X = crypto.getRandomValues.bind(crypto);
  }
  return X(yt);
}
const Nt = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), he = { randomUUID: Nt };
function Ee(t, r, n) {
  var a;
  if (he.randomUUID && !t)
    return he.randomUUID();
  t = t || {};
  const s = t.random ?? ((a = t.rng) == null ? void 0 : a.call(t)) ?? kt();
  if (s.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return s[6] = s[6] & 15 | 64, s[8] = s[8] & 63 | 128, jt(s);
}
const Ct = $.prototype.resizeToContent;
$.prototype.resizeToContent = function(t) {
  const r = t.querySelector(".grid-stack-item-content");
  if (r != null && r.firstElementChild)
    return Ct.call(this, t);
};
function St({
  children: t,
  onGridStackDropEvent: r
}) {
  const {
    _gridStack: { value: n, set: s },
    initialOptions: a
  } = _(), c = P(/* @__PURE__ */ new Map()), d = P(null), p = P(a), u = E(
    (l, g) => {
      g.id && c.current.set(g.id, l);
    },
    []
  ), h = E(() => {
    if (d.current) {
      $.renderCB = u;
      const l = $.init(p.current, d.current);
      return $.setupDragIn(
        ".grid-stack-item-widget",
        {
          appendTo: "body",
          helper: "clone",
          scroll: !1
        }
      ), l.on("dropped", function(g, N, v) {
        if (console.log("dropped....", v), v) {
          const w = v.el, j = w.dataset.gsType;
          if (j && r) {
            const R = {
              name: j,
              id: Ee(),
              x: v.x || 0,
              y: v.y || 0,
              w: j === "SubGrid" ? 12 : 4,
              // SubGrid takes full width
              h: j === "SubGrid" ? 6 : 4
              // SubGrid is taller              
            };
            r(R), l.removeWidget(w, !0);
          }
        }
      }), l;
    }
    return null;
  }, [u, r]);
  return pe(() => {
    if (!wt(a, p.current) && n)
      try {
        n.removeAll(!1), n.destroy(!1), c.current.clear(), p.current = a, s(h());
      } catch (l) {
        console.error("Error reinitializing gridstack", l);
      }
  }, [a, n, h, s]), pe(() => {
    if (!n)
      try {
        s(h());
      } catch (l) {
        console.error("Error initializing gridstack", l);
      }
  }, [n, h, s]), /* @__PURE__ */ e.jsx(
    Se.Provider,
    {
      value: rt(
        () => ({
          getWidgetContainer: (l) => c.current.get(l) || null
        }),
        // ! gridStack is required to reinitialize the grid when the options change
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [n]
      ),
      children: /* @__PURE__ */ e.jsx("div", { ref: d, children: n ? t : null })
    }
  );
}
const Me = H(null);
function ar() {
  const t = se(Me);
  if (!t)
    throw new Error(
      "useGridStackWidgetContext must be used within a GridStackWidgetProvider"
    );
  return t;
}
function Et({
  widgetId: t
}) {
  const { removeWidget: r } = _(), [n, s] = i.useState(!1), [a, c] = i.useState({ top: 0, left: 0 }), d = i.useRef(null), p = (l) => {
    if (l.stopPropagation(), d.current) {
      const g = d.current.getBoundingClientRect();
      c({
        top: g.bottom + window.scrollY,
        left: g.left + window.scrollX
      });
    }
    s(!n);
  }, u = () => {
    s(!1);
  }, h = () => {
    var g;
    r(t);
    const l = document.querySelector(`[gs-id="${t}"]`);
    l && ((g = l.gridstackNode) != null && g.grid) && l.gridstackNode.grid.removeWidget(l, !0, !0), u();
  };
  return i.useEffect(() => {
    const l = (g) => {
      n && s(!1);
    };
    return document.addEventListener("click", l), () => {
      document.removeEventListener("click", l);
    };
  }, [n]), /* @__PURE__ */ e.jsxs("div", { className: "flex justify-end size-4", children: [
    /* @__PURE__ */ e.jsx("button", { className: "p-1 hover:bg-gray-200 rounded transition-colors", children: /* @__PURE__ */ e.jsxs(
      "svg",
      {
        className: "w-4 h-4 text-gray-600",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        children: [
          /* @__PURE__ */ e.jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            }
          ),
          /* @__PURE__ */ e.jsx(
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
    /* @__PURE__ */ e.jsx(
      "button",
      {
        ref: d,
        onClick: p,
        className: "p-1 hover:bg-gray-200 rounded transition-colors",
        "aria-haspopup": "true",
        "aria-expanded": n,
        children: /* @__PURE__ */ e.jsx(
          "svg",
          {
            className: "w-4 h-4 text-gray-600",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ e.jsx(
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
    n && /* @__PURE__ */ e.jsx(
      "div",
      {
        className: "fixed z-50 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 py-1",
        style: {
          top: `${a.top}px`,
          left: `${a.left}px`,
          transform: "translateX(-100%)"
        },
        onClick: (l) => l.stopPropagation(),
        children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            onClick: h,
            className: "flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors",
            children: [
              /* @__PURE__ */ e.jsx(
                "svg",
                {
                  className: "w-4 h-4 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ e.jsx(
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
function Mt({ widgetId: t, children: r }) {
  const n = P(null);
  return G(() => {
    var p;
    const s = n.current;
    if (!s) return;
    const a = s.closest(".grid-stack-item");
    if (!a || !((p = a.gridstackNode) != null && p.grid)) return;
    const c = () => {
      var h, l;
      const u = a.querySelector(".grid-stack-item-content");
      u != null && u.firstElementChild && a.gridstackNode && a.gridstackNode.grid && ((l = (h = a.gridstackNode) == null ? void 0 : h.grid) == null || l.resizeToContent(a));
    }, d = new ResizeObserver(() => c());
    return d.observe(s), c(), () => d.disconnect();
  }, [t]), /* @__PURE__ */ e.jsx(
    "div",
    {
      ref: n,
      className: "gridstack-measured-container",
      style: { width: "100%" },
      children: r
    }
  );
}
function Lt(t) {
  let r = null, n = "", s = {};
  try {
    if (t.content) {
      const a = JSON.parse(t.content);
      n = a.name, s = a.props;
    }
  } catch (a) {
    r = a;
  }
  return { name: n, props: s, error: r };
}
function Rt({
  id: t,
  meta: r,
  WidgetComponent: n,
  widgetContainer: s,
  showMenubar: a
}) {
  var u;
  const c = Lt(r), d = ((u = c.props) == null ? void 0 : u.title) || `Widget ${t.slice(0, 4)}`, p = /* @__PURE__ */ e.jsxs(Mt, { widgetId: t, children: [
    a && /* @__PURE__ */ e.jsxs("div", { className: "widget-header flex items-center justify-between bg-gray-100 border-b px-2 min-h-[36px]", children: [
      /* @__PURE__ */ e.jsx("div", { className: "font-medium truncate text-sm px-1", children: d }),
      /* @__PURE__ */ e.jsx(Et, { widgetId: t })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "widget-body flex-1 min-h-[40px]", children: /* @__PURE__ */ e.jsx(n, { ...c.props }) })
  ] });
  return /* @__PURE__ */ e.jsx(Me.Provider, { value: { widget: { id: t } }, children: ot(p, s) });
}
function Ot(t) {
  let r = null, n = "", s = {};
  try {
    if (t.content) {
      const a = JSON.parse(t.content);
      n = a.name, s = a.props;
    }
  } catch (a) {
    r = a;
  }
  return { name: n, props: s, error: r };
}
function Wt({
  componentMap: t,
  showMenubar: r = !1
}) {
  const { _rawWidgetMetaMap: n } = _(), { getWidgetContainer: s } = pt();
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    Array.from(n.value.entries()).length === 0 && /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 p-8 text-center", children: [
      /* @__PURE__ */ e.jsx("div", { className: "text-4xl mb-4", children: "📦" }),
      /* @__PURE__ */ e.jsx("h3", { className: "text-lg font-medium mb-2", children: "Drag Components Here" }),
      /* @__PURE__ */ e.jsx("p", { className: "text-sm", children: "Drag components from the Components tab in the right panel to start building your layout" })
    ] }),
    Array.from(n.value.entries()).map(([a, c]) => {
      const { name: d } = Ot(c), p = t[d], u = s(a);
      return !p || !u ? null : /* @__PURE__ */ e.jsx(
        Rt,
        {
          id: a,
          meta: c,
          WidgetComponent: p,
          widgetContainer: u,
          showMenubar: r
        },
        a
      );
    })
  ] });
}
function Tt({
  title: t,
  titleId: r,
  ...n
}, s) {
  return /* @__PURE__ */ i.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: s,
    "aria-labelledby": r
  }, n), t ? /* @__PURE__ */ i.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ i.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const fe = /* @__PURE__ */ i.forwardRef(Tt);
function Dt({
  title: t,
  titleId: r,
  ...n
}, s) {
  return /* @__PURE__ */ i.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: s,
    "aria-labelledby": r
  }, n), t ? /* @__PURE__ */ i.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ i.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
  }));
}
const Pt = /* @__PURE__ */ i.forwardRef(Dt);
function Gt({
  title: t,
  titleId: r,
  ...n
}, s) {
  return /* @__PURE__ */ i.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: s,
    "aria-labelledby": r
  }, n), t ? /* @__PURE__ */ i.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ i.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
  }));
}
const Le = /* @__PURE__ */ i.forwardRef(Gt);
function zt({
  title: t,
  titleId: r,
  ...n
}, s) {
  return /* @__PURE__ */ i.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: s,
    "aria-labelledby": r
  }, n), t ? /* @__PURE__ */ i.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ i.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 19.5 8.25 12l7.5-7.5"
  }));
}
const xe = /* @__PURE__ */ i.forwardRef(zt);
function Bt({
  title: t,
  titleId: r,
  ...n
}, s) {
  return /* @__PURE__ */ i.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: s,
    "aria-labelledby": r
  }, n), t ? /* @__PURE__ */ i.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ i.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m8.25 4.5 7.5 7.5-7.5 7.5"
  }));
}
const be = /* @__PURE__ */ i.forwardRef(Bt);
function $t({
  title: t,
  titleId: r,
  ...n
}, s) {
  return /* @__PURE__ */ i.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: s,
    "aria-labelledby": r
  }, n), t ? /* @__PURE__ */ i.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ i.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
  }));
}
const _t = /* @__PURE__ */ i.forwardRef($t);
function At({
  title: t,
  titleId: r,
  ...n
}, s) {
  return /* @__PURE__ */ i.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: s,
    "aria-labelledby": r
  }, n), t ? /* @__PURE__ */ i.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ i.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
  }), /* @__PURE__ */ i.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
  }));
}
const It = /* @__PURE__ */ i.forwardRef(At);
function Ft({
  title: t,
  titleId: r,
  ...n
}, s) {
  return /* @__PURE__ */ i.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: s,
    "aria-labelledby": r
  }, n), t ? /* @__PURE__ */ i.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ i.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
  }));
}
const Ht = /* @__PURE__ */ i.forwardRef(Ft);
function Ut({
  title: t,
  titleId: r,
  ...n
}, s) {
  return /* @__PURE__ */ i.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: s,
    "aria-labelledby": r
  }, n), t ? /* @__PURE__ */ i.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ i.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
  }));
}
const Vt = /* @__PURE__ */ i.forwardRef(Ut);
function Zt({
  title: t,
  titleId: r,
  ...n
}, s) {
  return /* @__PURE__ */ i.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: s,
    "aria-labelledby": r
  }, n), t ? /* @__PURE__ */ i.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ i.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
  }));
}
const qt = /* @__PURE__ */ i.forwardRef(Zt);
function Jt({ content: t }) {
  return /* @__PURE__ */ e.jsx("div", { className: "flex items-start p-2 bg-white border rounded shadow-sm text-left", children: /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx("p", { className: "text-sm", children: t }) }) });
}
const te = "1rem", re = [
  //{ c: 1, w: 300 },   // 1 column on screens < 300px
  { c: 1, w: 500 },
  // 2 columns between 300px - 500px
  { c: 3, w: 800 },
  // 4 columns between 500px - 800px
  { c: 6, w: 1024 }
  // 6 columns between 800px - 1024px
  //{ c: 8, w: 1200 },  // 8 columns on screens > 1200px
], ne = {
  acceptWidgets: !0,
  removable: "#trash",
  sizeToContent: !0,
  resizable: { handles: "se" },
  minRow: 10,
  columnOpts: {
    breakpointForWindow: !0,
    breakpoints: re,
    layout: "moveScale",
    columnMax: 12
  },
  margin: 5,
  cellHeight: te,
  subGridOpts: {
    acceptWidgets: !0,
    removable: "#trash",
    resizable: { handles: "se" },
    sizeToContent: !0,
    columnOpts: {
      breakpoints: re,
      layout: "moveScale"
    },
    margin: 5,
    minRow: 1,
    cellHeight: te
  },
  children: []
}, Kt = {
  acceptWidgets: !0,
  removable: "#trash",
  resizable: { handles: "se" },
  sizeToContent: !0,
  subGridOpts: {
    acceptWidgets: !0,
    removable: "#trash",
    resizable: { handles: "se" },
    sizeToContent: !0,
    columnOpts: {
      breakpoints: re,
      layout: "moveScale"
    },
    margin: 5,
    minRow: 6,
    cellHeight: te,
    children: []
  },
  children: []
}, Q = () => ({
  id: `${Ee()}`,
  title: "untitled page",
  grids: ne
}), ve = {
  Text: {
    content: "Any content other than text are what we call cards. Cards can be accessed by clicking the ➕ button or typing / at the beginning of a paragraph.\nEven better, continue typing to find the card you're looking for, hit enter, and avoid dragging your mouse altogether.\nSome cards have a handy little shortcut, to keep you on track and in flow. Use --- to divide your paragraphs with a line, or ``` to add a code block. You can also drag and drop images directly into the editor to bypass the menu. \nAny content other than text are what we call cards. Cards can be accessed by clicking the ➕ button or typing / at the beginning of a paragraph.",
    title: "This is text card"
  }
}, we = {
  Text: Jt
}, je = (t) => {
  if (t) {
    const r = t();
    return { ...we, ...r };
  }
  return we;
}, ee = (t) => {
  if (t) {
    const r = t();
    return { ...ve, ...r };
  }
  return ve;
}, Yt = nt((t, r) => {
  const { addWidget: n, addSubGrid: s, saveOptions: a } = _();
  return st(r, () => ({
    saveLayout: () => a(),
    addWidget: n,
    addSubGrid: s
  })), null;
});
function Xt({ pageInfo: t }) {
  const [r, n] = f(void 0);
  return G(() => {
    t && n(t);
  }, [t]), /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    "div",
    {
      style: {
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(2, 1fr)"
      },
      children: /* @__PURE__ */ e.jsx("div", { id: "pageinfo", children: /* @__PURE__ */ e.jsx(
        "pre",
        {
          style: {
            backgroundColor: "#f3f4f6",
            padding: "1rem",
            borderRadius: "0.25rem",
            overflow: "auto"
          },
          children: JSON.stringify(r || {}, null, 2)
        }
      ) })
    }
  ) });
}
function Qt({
  isOpen: t,
  pageInfo: r,
  resetOpenInfo: n
}) {
  const [s, a] = i.useState(!1);
  i.useEffect(() => {
  }, [t, r]);
  const c = () => {
    n(!1);
  }, d = () => {
    var u;
    navigator.clipboard.writeText(
      ((u = document.getElementById("pageinfo")) == null ? void 0 : u.innerText) || ""
    ), a(!0), setTimeout(() => {
      a(!1);
    }, 3e3);
  }, p = (u) => {
    u.target === u.currentTarget && c();
  };
  return t ? /* @__PURE__ */ e.jsx(
    "div",
    {
      className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
      onClick: p,
      children: /* @__PURE__ */ e.jsxs("div", { className: "bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between p-4 border-b flex-shrink-0", children: [
          /* @__PURE__ */ e.jsx("h2", { className: "text-lg font-semibold truncate mr-2", children: "Page Information" }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center space-x-1 flex-shrink-0", children: [
            /* @__PURE__ */ e.jsxs(
              "button",
              {
                onClick: d,
                className: "p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center relative",
                "aria-label": "Copy page info",
                children: [
                  /* @__PURE__ */ e.jsx(
                    "svg",
                    {
                      className: "w-5 h-5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ e.jsx(
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
                  s && /* @__PURE__ */ e.jsx("span", { className: "absolute -top-8 -right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap", children: "copied" })
                ]
              }
            ),
            /* @__PURE__ */ e.jsx(
              "button",
              {
                onClick: c,
                className: "p-2 hover:bg-gray-100 rounded-full transition-colors",
                "aria-label": "Close",
                children: /* @__PURE__ */ e.jsx(
                  "svg",
                  {
                    className: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ e.jsx(
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
        /* @__PURE__ */ e.jsx("div", { className: "p-4 overflow-y-auto flex-1", children: /* @__PURE__ */ e.jsx(Xt, { pageInfo: r }) }),
        /* @__PURE__ */ e.jsx("div", { className: "flex justify-end p-4 border-t flex-shrink-0", children: /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: c,
            className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors w-full sm:w-auto",
            autoFocus: !0,
            children: "Close"
          }
        ) })
      ] })
    }
  ) : null;
}
function er({ onDropDelete: t }) {
  const { removeWidget: r } = _(), n = E((d) => {
    var u;
    d.preventDefault();
    const p = d.dataTransfer.getData("text/plain");
    if (p) {
      const h = document.querySelector(`[gs-id="${p}"]`);
      h && ((u = h.gridstackNode) != null && u.grid) && h.gridstackNode.grid.removeWidget(h, !0, !0), r(p);
    }
    t();
  }, [t, r]), s = (d) => {
    d.preventDefault(), d.dataTransfer.dropEffect = "move";
  }, a = (d) => {
    d.preventDefault(), d.currentTarget.classList.add("bg-red-200", "border-red-400");
  }, c = (d) => {
    d.preventDefault(), d.currentTarget.classList.remove("bg-red-200", "border-red-400");
  };
  return /* @__PURE__ */ e.jsx(
    "div",
    {
      id: "trash",
      onDrop: n,
      onDragOver: s,
      onDragEnter: a,
      onDragLeave: c,
      className: "bg-red-50 min-h-14 h-18 flex items-center justify-center p-0 border-2 border-dashed border-red-200 rounded-lg transition-all duration-200 hover:bg-red-100 cursor-pointer group",
      children: /* @__PURE__ */ e.jsx("div", { className: "w-full h-full flex flex-col items-center justify-center m-3", children: /* @__PURE__ */ e.jsx(
        "svg",
        {
          className: "w-14 h-14 text-red-300 group-hover:text-red-400 transition-colors",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          children: /* @__PURE__ */ e.jsx(
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
const tr = H(
  void 0
);
function B({
  onClick: t,
  icon: r,
  tooltip: n,
  className: s = ""
}) {
  return /* @__PURE__ */ e.jsxs("div", { className: "relative group", children: [
    /* @__PURE__ */ e.jsx(
      "button",
      {
        onClick: t,
        className: `p-2 rounded-lg transition ${s}`,
        children: r
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "absolute top-full left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10", children: [
      n,
      /* @__PURE__ */ e.jsx("div", { className: "absolute bottom-full left-1/2 w-2 h-2 bg-black transform -translate-x-1/2 rotate-45 -mb-1" })
    ] })
  ] });
}
function ye({
  onClick: t,
  icon: r,
  label: n,
  className: s = "",
  successMessage: a = "Success",
  errorMessage: c = "Error"
}) {
  const [d, p] = f(null), [u, h] = f(!1), l = async () => {
    h(!0), p(null);
    try {
      await t(), p({ message: a, type: "success" });
    } catch {
      p({ message: c, type: "error" });
    } finally {
      h(!1), setTimeout(() => p(null), 3e3);
    }
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "relative z-30", children: [
    /* @__PURE__ */ e.jsx(
      "button",
      {
        onClick: l,
        disabled: u,
        className: `p-2 rounded-lg transition flex items-center ${s} ${u ? "opacity-70" : ""}`,
        children: u ? /* @__PURE__ */ e.jsx(Le, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          r,
          /* @__PURE__ */ e.jsx("span", { className: "ml-1 hidden sm:inline", children: n })
        ] })
      }
    ),
    d && /* @__PURE__ */ e.jsx(
      "div",
      {
        className: `absolute top-full left-0 mt-1 w-full text-center px-2 py-1 rounded-md text-xs font-medium animate-fadeIn ${d.type === "success" ? "bg-blue-500 text-white" : "bg-red-100 text-red-800"}`,
        children: d.message
      }
    )
  ] });
}
const rr = () => {
  const [t, r] = f(!1);
  return G(() => {
    const n = () => {
      r(window.innerWidth <= 768);
    };
    return n(), window.addEventListener("resize", n), () => {
      window.removeEventListener("resize", n);
    };
  }, []), t;
}, ir = ({
  pageid: t,
  pageMode: r,
  onSaveLayout: n,
  onLoadLayout: s,
  componentMapProvider: a,
  componentPropsProvider: c,
  gobackList: d,
  children: p
}) => {
  const [u, h] = f(r), [l, g] = f(!0), [
    N
    /*setPanelWidth*/
  ] = f(400), [v, w] = f(!1), [j, R] = f("components"), [O, Re] = f({ ...Q(), id: t }), [Oe, We] = f(), [V, Z] = f(), [Te, oe] = f(0), [De, ae] = f(ne), T = P(null), [W, Pe] = f(), [Ge, ie] = f(!1), [
    ze
    /*setShowMenubar*/
  ] = f(!0), [q, M] = f(null), [x, S] = f(null), [A, I] = f([]), [k, le] = f({
    margin: "0",
    padding: "20px",
    background: "#ffffff",
    gap: "16px"
  }), Be = P(1), D = rr();
  G(() => {
    h(r);
  }, [r]);
  const ce = E(async (o) => {
    const m = await s(o) || Q();
    return Re(m), We(m.title), Z(m.title), m.grids;
  }, [s]), J = E(async () => {
    if (t) {
      const o = await ce(t);
      ae(o), oe((m) => m + 1), de(), console.log(`reload layout: pageid ${t}, props id ${O == null ? void 0 : O.id}`);
    }
  }, [t, ce]);
  G(() => {
    (async () => {
      if (t)
        try {
          await J();
        } catch (m) {
          console.error("Failed to load layout:", m);
        }
    })();
  }, [t, J]);
  const $e = () => {
    d && d();
  }, _e = async () => {
    var o;
    if (n) {
      const m = (o = T.current) == null ? void 0 : o.saveLayout();
      if (m) {
        const b = {
          ...O || Q(),
          grids: m,
          title: V
        };
        console.log(`Saving layout: pageid ${t}, props id ${b.id}`), await n(t, b);
      }
    }
  }, de = () => {
    M(null), S(null);
  }, Ae = () => {
    confirm("Are you sure you want to clear all data? This cannot be undone.") && (ae(ne), oe((o) => o + 1), de());
  }, Ie = () => {
    w(!0);
  }, ue = () => {
    w(!1);
  }, Fe = (o) => {
    o.key === "Enter" ? ue() : o.key === "Escape" && (Z(Oe), w(!1));
  }, me = (o, m) => {
    o.dataTransfer.setData("text/plain", m), o.dataTransfer.effectAllowed = "copy";
  }, He = (o) => {
    Pe(o);
  }, Ue = (o, m) => {
    const b = `comp-${Be.current++}`, C = ee(c)[o], L = {
      id: b,
      type: o,
      props: { ...C },
      position: m
    };
    I((et) => [...et, L]), S(L), M(o), R("properties");
  }, ge = (o, m) => {
    I(
      (b) => b.map(
        (C) => C.id === o ? { ...C, props: { ...C.props, ...m } } : C
      )
    ), x && x.id === o && S(
      (b) => b ? { ...b, props: { ...b.props, ...m } } : null
    );
  }, K = (o) => {
    I(
      (m) => m.filter((b) => b.id !== o)
    ), x && x.id === o && (S(null), M(null));
  }, Ve = je(a), Y = (o, m) => {
    x && ge(x.id, { [o]: m });
  }, z = (o, m) => {
    const b = {
      ...k,
      [o]: m
    };
    le(b);
  }, Ze = {
    selectedComponent: q,
    setSelectedComponent: M,
    selectedInstance: x,
    setSelectedInstance: S,
    componentInstances: A,
    setComponentInstances: I,
    pageAttributes: k,
    setPageAttributes: le,
    addComponentToLayout: Ue,
    updateComponentProps: ge,
    removeComponent: K
  }, qe = D ? { width: "100vw", minWidth: "100vw", height: "100vh" } : { width: `${N}px`, minWidth: "300px", height: "100%" }, Je = {
    margin: k.margin,
    padding: k.padding,
    backgroundColor: k.background,
    gap: k.gap
  }, Ke = () => {
    var m;
    const o = JSON.parse(JSON.stringify(O));
    return o.grids = (m = T.current) == null ? void 0 : m.saveLayout(), o;
  };
  G(() => {
    W && T.current && (W.name !== "SubGrid" ? T.current.addWidget((o) => ({
      ...W,
      sizeToContent: !0,
      // Ensure the widget is sized to its content
      content: JSON.stringify({
        name: W.name,
        props: ee(c)[W.name]
      })
    })) : T.current.addSubGrid((o) => ({
      ...W,
      ...Kt
    })));
  }, [W, c]);
  const Ye = () => /* @__PURE__ */ e.jsxs("div", { className: "p-4 space-y-4", children: [
    /* @__PURE__ */ e.jsx("h3", { className: "text-lg font-medium mb-3", children: "Components" }),
    /* @__PURE__ */ e.jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Drag components to the main area or click to select them" }),
    /* @__PURE__ */ e.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ e.jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Delete Zone" }),
      /* @__PURE__ */ e.jsx(
        er,
        {
          onDropDelete: () => {
            console.log("Component deleted via drop zone"), M(null), S(null);
          }
        }
      ),
      /* @__PURE__ */ e.jsx("p", { className: "text-xs text-gray-500 mt-2 text-center", children: "Drag components here to delete them" })
    ] }),
    /* @__PURE__ */ e.jsx(
      "div",
      {
        "gs-type": "SubGrid",
        "data-gs-type": "SubGrid",
        className: "grid-stack-item grid-stack-item-widget",
        draggable: "true",
        onDragStart: (o) => me(o, "SubGrid"),
        onDragEnd: () => console.log("====SubGrid drag event end...."),
        onClick: () => {
          M("SubGrid"), S(null);
        },
        children: /* @__PURE__ */ e.jsxs("div", { className: "p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-dashed border-blue-300 text-sm hover:from-blue-100 hover:to-indigo-100 cursor-pointer transition-all duration-200 hover:shadow-lg text-center group", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "font-semibold text-blue-700 mb-2 flex items-center justify-center", children: [
            /* @__PURE__ */ e.jsxs(
              "svg",
              {
                className: "w-5 h-5 mr-2 group-hover:scale-110 transition-transform",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: [
                  /* @__PURE__ */ e.jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
                    }
                  ),
                  /* @__PURE__ */ e.jsx(
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
          /* @__PURE__ */ e.jsx("div", { className: "text-xs text-blue-600 font-medium", children: "Nested Grid Container" }),
          /* @__PURE__ */ e.jsx("div", { className: "text-xs text-blue-500 mt-1", children: "Drag to create nested layout" })
        ] })
      },
      "SubGrid"
    ),
    /* @__PURE__ */ e.jsx("div", { className: "grid grid-cols-2 gap-3", children: Object.entries(Ve).map(([
      o
      /*Component*/
    ]) => /* @__PURE__ */ e.jsx(
      "div",
      {
        "gs-type": o,
        "data-gs-type": o,
        className: "grid-stack-item grid-stack-item-widget",
        draggable: "true",
        onDragStart: (m) => me(m, o),
        onDragEnd: () => console.log("====drag event end...."),
        onClick: () => {
          M(o), S(null);
        },
        children: /* @__PURE__ */ e.jsxs("div", { className: "p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm hover:bg-gray-100 cursor-pointer transition-all duration-200 hover:shadow-md text-center", children: [
          /* @__PURE__ */ e.jsx("div", { className: "font-medium text-gray-800 mb-2", children: o }),
          /* @__PURE__ */ e.jsx("div", { className: "text-xs text-gray-500", children: "Drag to main area" })
        ] })
      },
      o
    )) }),
    A.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "mt-6 pt-4 border-t", children: [
      /* @__PURE__ */ e.jsxs("h4", { className: "font-medium mb-3", children: [
        "Placed Components (",
        A.length,
        ")"
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "space-y-2 max-h-40 overflow-y-auto", children: A.map((o) => /* @__PURE__ */ e.jsxs(
        "div",
        {
          className: `flex justify-between items-center p-2 rounded text-sm ${(x == null ? void 0 : x.id) === o.id ? "bg-blue-100 border border-blue-300" : "bg-gray-100"}`,
          onClick: () => {
            S(o), M(o.type), R("properties");
          },
          draggable: "true",
          onDragStart: (m) => {
            m.dataTransfer.setData("text/plain", o.id), m.dataTransfer.effectAllowed = "move";
          },
          children: [
            /* @__PURE__ */ e.jsx("span", { className: "truncate", children: o.type }),
            /* @__PURE__ */ e.jsx(
              "button",
              {
                onClick: (m) => {
                  m.stopPropagation(), K(o.id);
                },
                className: "text-red-600 hover:text-red-800 text-xs px-2 py-1 rounded",
                children: "Remove"
              }
            )
          ]
        },
        o.id
      )) })
    ] })
  ] }), Xe = () => {
    if (!x && !q)
      return /* @__PURE__ */ e.jsxs("div", { className: "p-4 text-center text-gray-500", children: [
        /* @__PURE__ */ e.jsx("div", { className: "mb-2", children: "👈" }),
        /* @__PURE__ */ e.jsx("p", { children: "Select a component from the Components tab or click on a placed component to edit its properties" })
      ] });
    const o = (x == null ? void 0 : x.type) || q, m = (x == null ? void 0 : x.props) || ee(c)[o || ""];
    return /* @__PURE__ */ e.jsxs("div", { className: "p-4 space-y-4", children: [
      /* @__PURE__ */ e.jsxs("h3", { className: "text-lg font-medium mb-3", children: [
        "Properties - ",
        o,
        x && /* @__PURE__ */ e.jsxs("span", { className: "text-sm text-gray-500 ml-2", children: [
          "(ID: ",
          x.id,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "space-y-4", children: Object.entries(m).map(([b, C]) => /* @__PURE__ */ e.jsxs(
        "div",
        {
          className: "border-b border-gray-100 pb-3 last:border-b-0",
          children: [
            /* @__PURE__ */ e.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2 capitalize", children: b.replace(/([A-Z])/g, " $1").trim() }),
            typeof C == "boolean" ? /* @__PURE__ */ e.jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ e.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: C,
                  onChange: (L) => Y(b, L.target.checked),
                  className: "w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                }
              ),
              /* @__PURE__ */ e.jsx("span", { className: "ml-2 text-sm text-gray-600", children: "Enabled" })
            ] }) : typeof C == "number" ? /* @__PURE__ */ e.jsx(
              "input",
              {
                type: "number",
                value: C,
                onChange: (L) => Y(b, Number(L.target.value)),
                className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              }
            ) : /* @__PURE__ */ e.jsx(
              "input",
              {
                type: "text",
                value: C,
                onChange: (L) => Y(b, L.target.value),
                className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                placeholder: `Enter ${b}`
              }
            )
          ]
        },
        b
      )) }),
      x && /* @__PURE__ */ e.jsx("div", { className: "mt-6 pt-4 border-t", children: /* @__PURE__ */ e.jsx(
        "button",
        {
          onClick: () => K(x.id),
          className: "w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-medium",
          children: "Remove This Component"
        }
      ) })
    ] });
  }, Qe = () => /* @__PURE__ */ e.jsxs("div", { className: "p-4 space-y-4", children: [
    /* @__PURE__ */ e.jsx("h3", { className: "text-lg font-medium mb-3", children: "Page Settings" }),
    /* @__PURE__ */ e.jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Configure the overall page layout and appearance" }),
    /* @__PURE__ */ e.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Margin" }),
        /* @__PURE__ */ e.jsx(
          "input",
          {
            type: "text",
            value: k.margin,
            onChange: (o) => z("margin", o.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            placeholder: "e.g., 0, 10px, 1rem"
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Space around the entire page content" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Padding" }),
        /* @__PURE__ */ e.jsx(
          "input",
          {
            type: "text",
            value: k.padding,
            onChange: (o) => z("padding", o.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            placeholder: "e.g., 20px, 2rem"
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Space inside the page container" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Background Color" }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex gap-3 items-center", children: [
          /* @__PURE__ */ e.jsx(
            "input",
            {
              type: "color",
              value: k.background,
              onChange: (o) => z("background", o.target.value),
              className: "w-12 h-12 border border-gray-300 rounded cursor-pointer"
            }
          ),
          /* @__PURE__ */ e.jsx(
            "input",
            {
              type: "text",
              value: k.background,
              onChange: (o) => z("background", o.target.value),
              className: "flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              placeholder: "#ffffff, rgb(255,255,255), etc."
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Background color for the main content area" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Component Gap" }),
        /* @__PURE__ */ e.jsx(
          "input",
          {
            type: "text",
            value: k.gap,
            onChange: (o) => z("gap", o.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            placeholder: "e.g., 16px, 1rem"
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Space between components in the main area" })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg", children: [
      /* @__PURE__ */ e.jsx("h4", { className: "font-medium text-blue-800 mb-2", children: "Current Page Settings" }),
      /* @__PURE__ */ e.jsxs("div", { className: "text-sm text-blue-700 grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ e.jsxs("div", { children: [
          "Margin: ",
          /* @__PURE__ */ e.jsx("code", { children: k.margin })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { children: [
          "Padding: ",
          /* @__PURE__ */ e.jsx("code", { children: k.padding })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { children: [
          "Background: ",
          /* @__PURE__ */ e.jsx("code", { children: k.background })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { children: [
          "Gap: ",
          /* @__PURE__ */ e.jsx("code", { children: k.gap })
        ] })
      ] })
    ] })
  ] });
  return /* @__PURE__ */ e.jsx(gt, { initialOptions: De, children: /* @__PURE__ */ e.jsx(tr.Provider, { value: Ze, children: /* @__PURE__ */ e.jsxs("div", { className: "min-h-screen bg-white text-black flex flex-col", children: [
    u === "edit" && /* @__PURE__ */ e.jsx("header", { className: "p-4 bg-white shadow relative", children: /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ e.jsx("div", { className: "flex-1 mb-3 sm:mb-0 min-w-0", children: /* @__PURE__ */ e.jsx("div", { className: "flex items-center gap-2", children: v ? /* @__PURE__ */ e.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ e.jsx(
        "input",
        {
          type: "text",
          value: V,
          onChange: (o) => Z(o.target.value),
          onKeyDown: Fe,
          onBlur: ue,
          className: "text-2xl font-bold border-b-2 border-blue-500 bg-transparent outline-none px-1",
          autoFocus: !0
        }
      ) }) : /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 group", children: [
        /* @__PURE__ */ e.jsx("h1", { className: "text-2xl font-bold truncate", children: V }),
        /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: Ie,
            className: "p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity",
            children: /* @__PURE__ */ e.jsx(Vt, { className: "h-4 w-4" })
          }
        )
      ] }) }) }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex flex-wrap gap-1 justify-end", children: [
        /* @__PURE__ */ e.jsx(
          B,
          {
            onClick: $e,
            icon: /* @__PURE__ */ e.jsx(Pt, { className: "h-5 w-5" }),
            tooltip: "Back to list",
            className: "bg-gray-200 hover:bg-gray-300"
          }
        ),
        /* @__PURE__ */ e.jsx(
          B,
          {
            onClick: () => h("preview"),
            icon: /* @__PURE__ */ e.jsx(It, { className: "h-5 w-5" }),
            tooltip: "Preview",
            className: "bg-purple-600 hover:bg-purple-700 text-white"
          }
        ),
        /* @__PURE__ */ e.jsx(
          ye,
          {
            onClick: _e,
            icon: /* @__PURE__ */ e.jsx(_t, { className: "h-5 w-5" }),
            label: "Save",
            className: "bg-green-600 hover:bg-green-700 text-white",
            successMessage: "Saved successfully!",
            errorMessage: "Save failed"
          }
        ),
        /* @__PURE__ */ e.jsx(
          ye,
          {
            onClick: J,
            icon: /* @__PURE__ */ e.jsx(Le, { className: "h-5 w-5" }),
            label: "Reload",
            className: "bg-green-600 hover:bg-green-700 text-white",
            successMessage: "Reloaded successfully",
            errorMessage: "Failed to reload"
          }
        ),
        /* @__PURE__ */ e.jsx(
          B,
          {
            onClick: Ae,
            icon: /* @__PURE__ */ e.jsx(qt, { className: "h-5 w-5" }),
            tooltip: "Clear all data",
            className: "bg-red-600 hover:bg-red-700 text-white"
          }
        ),
        /* @__PURE__ */ e.jsx(
          B,
          {
            onClick: () => ie(!0),
            icon: /* @__PURE__ */ e.jsx(Ht, { className: "h-5 w-5" }),
            tooltip: "Page Info & Settings",
            className: "bg-indigo-600 hover:bg-indigo-700 text-white"
          }
        ),
        !D && /* @__PURE__ */ e.jsx(
          B,
          {
            onClick: () => g(!l),
            icon: l ? /* @__PURE__ */ e.jsx(be, { className: "h-5 w-5" }) : /* @__PURE__ */ e.jsx(xe, { className: "h-5 w-5" }),
            tooltip: l ? "Hide Editor" : "Show Editor",
            className: "bg-gray-200 hover:bg-gray-300"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "flex flex-1 overflow-hidden relative", children: [
      /* @__PURE__ */ e.jsx(
        "div",
        {
          className: `flex-1 transition-all duration-200 ${l && u === "edit" ? "overflow-auto" : "overflow-hidden"}`,
          style: Je,
          children: /* @__PURE__ */ e.jsx("div", { className: "h-full", children: /* @__PURE__ */ e.jsx("div", { className: "bg-white rounded-lg shadow h-full flex flex-col", children: /* @__PURE__ */ e.jsxs(
            "div",
            {
              className: `flex-1 relative p-0 grid-stack-mode-${u}`,
              children: [
                /* @__PURE__ */ e.jsx(Yt, { ref: T }),
                /* @__PURE__ */ e.jsx(
                  St,
                  {
                    onGridStackDropEvent: He,
                    children: /* @__PURE__ */ e.jsx(
                      Wt,
                      {
                        componentMap: je(a),
                        showMenubar: ze
                      }
                    )
                  }
                ),
                p
              ]
            }
          ) }) })
        }
      ),
      u === "edit" && l && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        D && /* @__PURE__ */ e.jsx(
          "div",
          {
            className: "fixed inset-0 bg-black bg-opacity-50 z-40",
            onClick: () => g(!1)
          }
        ),
        /* @__PURE__ */ e.jsxs(
          "div",
          {
            className: `flex flex-col bg-white shadow-lg border-l border-gray-200 ${D ? "fixed right-0 top-0 bottom-0 z-50 transform transition-transform duration-300" : "relative"}`,
            style: qe,
            children: [
              D && /* @__PURE__ */ e.jsx("div", { className: "absolute top-4 right-4 z-10", children: /* @__PURE__ */ e.jsx(
                "button",
                {
                  onClick: () => g(!1),
                  className: "p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors",
                  children: /* @__PURE__ */ e.jsx(be, { className: "h-5 w-5" })
                }
              ) }),
              /* @__PURE__ */ e.jsx("div", { className: "flex border-b border-gray-200 pt-4", children: ["components", "properties", "page"].map(
                (o) => /* @__PURE__ */ e.jsx(
                  "button",
                  {
                    className: `flex-1 py-3 px-4 text-sm font-medium capitalize transition-colors ${j === o ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`,
                    onClick: () => R(o),
                    children: o
                  },
                  o
                )
              ) }),
              /* @__PURE__ */ e.jsxs("div", { className: "flex-1 overflow-y-auto pb-4", children: [
                j === "components" && Ye(),
                j === "properties" && Xe(),
                j === "page" && Qe()
              ] })
            ]
          }
        )
      ] })
    ] }),
    u === "edit" && D && !l && /* @__PURE__ */ e.jsx("div", { className: "fixed bottom-4 right-4 z-30", children: /* @__PURE__ */ e.jsx(
      "button",
      {
        onClick: () => g(!0),
        className: "p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors",
        children: /* @__PURE__ */ e.jsx(xe, { className: "h-6 w-6" })
      }
    ) }),
    u === "preview" && /* @__PURE__ */ e.jsx("div", { className: "fixed inset-0 pointer-events-none z-50", children: /* @__PURE__ */ e.jsx("div", { className: "absolute bottom-8 right-8 pointer-events-auto", children: /* @__PURE__ */ e.jsxs(
      "button",
      {
        onClick: () => h("edit"),
        className: "flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 group",
        title: "Return to Edit Mode",
        children: [
          /* @__PURE__ */ e.jsx(fe, { className: "h-6 w-6 group-hover:animate-bounce" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-sm font-medium", children: "Edit Mode" })
        ]
      }
    ) }) }),
    u === "view" && /* @__PURE__ */ e.jsx("div", { className: "fixed inset-0 pointer-events-none z-50", children: /* @__PURE__ */ e.jsx("div", { className: "absolute bottom-8 right-8 pointer-events-auto", children: /* @__PURE__ */ e.jsxs(
      "button",
      {
        onClick: d,
        className: "flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 group",
        title: "Back to List",
        children: [
          /* @__PURE__ */ e.jsx(fe, { className: "h-6 w-6 group-hover:animate-bounce" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-sm font-medium", children: "Back to List" })
        ]
      }
    ) }) }),
    /* @__PURE__ */ e.jsx(
      Qt,
      {
        isOpen: Ge,
        pageInfo: Ke(),
        resetOpenInfo: ie
      }
    )
  ] }) }) }, Te);
};
export {
  gt as GridStackProvider,
  Wt as GridStackRender,
  St as GridStackRenderProvider,
  ir as StackPage,
  _ as useGridStackContext,
  ar as useGridStackWidgetContext
};
//# sourceMappingURL=stackpage.es.js.map
