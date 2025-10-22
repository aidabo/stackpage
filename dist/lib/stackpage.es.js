import * as x from "react";
import Ne, { createContext as q, useContext as K, useState as C, useCallback as A, useRef as z, useLayoutEffect as ge, useMemo as Ke, useEffect as U, forwardRef as Ye, useImperativeHandle as Xe } from "react";
import { GridStack as Z } from "gridstack";
import { createPortal as Qe } from "react-dom";
function et(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var ke = { exports: {} }, ee = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tt = Ne, rt = Symbol.for("react.element"), st = Symbol.for("react.fragment"), nt = Object.prototype.hasOwnProperty, ot = tt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, at = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ce(t, r, s) {
  var n, o = {}, c = null, i = null;
  s !== void 0 && (c = "" + s), r.key !== void 0 && (c = "" + r.key), r.ref !== void 0 && (i = r.ref);
  for (n in r) nt.call(r, n) && !at.hasOwnProperty(n) && (o[n] = r[n]);
  if (t && t.defaultProps) for (n in r = t.defaultProps, r) o[n] === void 0 && (o[n] = r[n]);
  return { $$typeof: rt, type: t, key: c, ref: i, props: o, _owner: ot.current };
}
ee.Fragment = st;
ee.jsx = Ce;
ee.jsxs = Ce;
ke.exports = ee;
var e = ke.exports;
const Se = q(null);
function Y() {
  const t = K(Se);
  if (!t)
    throw new Error(
      "useGridStackContext must be used within a GridStackProvider"
    );
  return t;
}
function it({
  children: t,
  initialOptions: r
}) {
  const [s, n] = C(null), [o, c] = C(() => {
    var k;
    const u = /* @__PURE__ */ new Map(), m = (b) => {
      var N;
      b.id && b.content && u.set(b.id, b), (N = b.subGridOpts) != null && N.children && b.subGridOpts.children.forEach((d) => {
        m(d);
      });
    };
    return (k = r.children) == null || k.forEach((b) => {
      m(b);
    }), u;
  }), i = A(
    (u) => {
      const m = `widget-${Math.random().toString(36).substring(2, 15)}`, k = u(m);
      s == null || s.addWidget({ ...k, id: m }), c((b) => {
        const N = new Map(b);
        return N.set(m, k), N;
      });
    },
    [s]
  ), p = A(
    (u) => {
      const m = `sub-grid-${Math.random().toString(36).substring(2, 15)}`, k = /* @__PURE__ */ new Map(), b = u(m, (N) => {
        const d = `widget-${Math.random().toString(36).substring(2, 15)}`;
        return k.set(d, N), { ...N, id: d };
      });
      s == null || s.addWidget({ ...b, id: m }), c((N) => {
        const d = new Map(N);
        return k.forEach((E, M) => {
          d.set(M, E);
        }), d;
      });
    },
    [s]
  ), g = A(
    (u) => {
      s == null || s.removeWidget(u), c((m) => {
        const k = new Map(m);
        return k.delete(u), k;
      });
    },
    [s]
  ), y = A(() => s == null ? void 0 : s.save(!0, !0, (u, m) => m), [s]);
  return /* @__PURE__ */ e.jsx(
    Se.Provider,
    {
      value: {
        initialOptions: r,
        gridStack: s,
        addWidget: i,
        removeWidget: g,
        addSubGrid: p,
        saveOptions: y,
        _gridStack: {
          value: s,
          set: n
        },
        _rawWidgetMetaMap: {
          value: o,
          set: c
        }
      },
      children: t
    }
  );
}
const Pe = q(null);
function lt() {
  const t = K(Pe);
  if (!t)
    throw new Error(
      "useGridStackRenderContext must be used within a GridStackProvider"
    );
  return t;
}
var ct = typeof Element < "u", dt = typeof Map == "function", ut = typeof Set == "function", mt = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
function Q(t, r) {
  if (t === r) return !0;
  if (t && r && typeof t == "object" && typeof r == "object") {
    if (t.constructor !== r.constructor) return !1;
    var s, n, o;
    if (Array.isArray(t)) {
      if (s = t.length, s != r.length) return !1;
      for (n = s; n-- !== 0; )
        if (!Q(t[n], r[n])) return !1;
      return !0;
    }
    var c;
    if (dt && t instanceof Map && r instanceof Map) {
      if (t.size !== r.size) return !1;
      for (c = t.entries(); !(n = c.next()).done; )
        if (!r.has(n.value[0])) return !1;
      for (c = t.entries(); !(n = c.next()).done; )
        if (!Q(n.value[1], r.get(n.value[0]))) return !1;
      return !0;
    }
    if (ut && t instanceof Set && r instanceof Set) {
      if (t.size !== r.size) return !1;
      for (c = t.entries(); !(n = c.next()).done; )
        if (!r.has(n.value[0])) return !1;
      return !0;
    }
    if (mt && ArrayBuffer.isView(t) && ArrayBuffer.isView(r)) {
      if (s = t.length, s != r.length) return !1;
      for (n = s; n-- !== 0; )
        if (t[n] !== r[n]) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
    if (t.valueOf !== Object.prototype.valueOf && typeof t.valueOf == "function" && typeof r.valueOf == "function") return t.valueOf() === r.valueOf();
    if (t.toString !== Object.prototype.toString && typeof t.toString == "function" && typeof r.toString == "function") return t.toString() === r.toString();
    if (o = Object.keys(t), s = o.length, s !== Object.keys(r).length) return !1;
    for (n = s; n-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, o[n])) return !1;
    if (ct && t instanceof Element) return !1;
    for (n = s; n-- !== 0; )
      if (!((o[n] === "_owner" || o[n] === "__v" || o[n] === "__o") && t.$$typeof) && !Q(t[o[n]], r[o[n]]))
        return !1;
    return !0;
  }
  return t !== t && r !== r;
}
var pt = function(r, s) {
  try {
    return Q(r, s);
  } catch (n) {
    if ((n.message || "").match(/stack|recursion/i))
      return console.warn("react-fast-compare cannot handle circular refs"), !1;
    throw n;
  }
};
const xt = /* @__PURE__ */ et(pt), L = [];
for (let t = 0; t < 256; ++t)
  L.push((t + 256).toString(16).slice(1));
function gt(t, r = 0) {
  return (L[t[r + 0]] + L[t[r + 1]] + L[t[r + 2]] + L[t[r + 3]] + "-" + L[t[r + 4]] + L[t[r + 5]] + "-" + L[t[r + 6]] + L[t[r + 7]] + "-" + L[t[r + 8]] + L[t[r + 9]] + "-" + L[t[r + 10]] + L[t[r + 11]] + L[t[r + 12]] + L[t[r + 13]] + L[t[r + 14]] + L[t[r + 15]]).toLowerCase();
}
let re;
const ft = new Uint8Array(16);
function ht() {
  if (!re) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    re = crypto.getRandomValues.bind(crypto);
  }
  return re(ft);
}
const bt = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), fe = { randomUUID: bt };
function Ee(t, r, s) {
  var o;
  if (fe.randomUUID && !t)
    return fe.randomUUID();
  t = t || {};
  const n = t.random ?? ((o = t.rng) == null ? void 0 : o.call(t)) ?? ht();
  if (n.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, gt(n);
}
const vt = Z.prototype.resizeToContent;
Z.prototype.resizeToContent = function(t) {
  const r = t.querySelector(".grid-stack-item-content");
  if (r != null && r.firstElementChild)
    return vt.call(this, t);
};
function yt({
  children: t,
  onGridStackDropEvent: r
}) {
  const {
    _gridStack: { value: s, set: n },
    initialOptions: o
  } = Y(), c = z(/* @__PURE__ */ new Map()), i = z(null), p = z(o), g = A(
    (u, m) => {
      m.id && c.current.set(m.id, u);
    },
    []
  ), y = A(() => {
    if (i.current) {
      Z.renderCB = g;
      const u = Z.init(p.current, i.current);
      return Z.setupDragIn(
        ".grid-stack-item-widget",
        {
          appendTo: "body",
          helper: "clone",
          scroll: !1
        }
      ), u.on("dropped", function(m, k, b) {
        if (console.log("dropped....", b), b) {
          const N = b.el, d = N.dataset.gsType;
          if (d && r) {
            const E = {
              name: d,
              id: Ee(),
              x: b.x || 0,
              y: b.y || 0,
              w: d === "SubGrid" ? 12 : 4,
              // SubGrid takes full width
              h: d === "SubGrid" ? 6 : 4
              // SubGrid is taller              
            };
            r(E), u.removeWidget(N, !0);
          }
        }
      }), u;
    }
    return null;
  }, [g, r]);
  return ge(() => {
    if (!xt(o, p.current) && s)
      try {
        s.removeAll(!1), s.destroy(!1), c.current.clear(), p.current = o, n(y());
      } catch (u) {
        console.error("Error reinitializing gridstack", u);
      }
  }, [o, s, y, n]), ge(() => {
    if (!s)
      try {
        n(y());
      } catch (u) {
        console.error("Error initializing gridstack", u);
      }
  }, [s, y, n]), /* @__PURE__ */ e.jsx(
    Pe.Provider,
    {
      value: Ke(
        () => ({
          getWidgetContainer: (u) => c.current.get(u) || null
        }),
        // ! gridStack is required to reinitialize the grid when the options change
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [s]
      ),
      children: /* @__PURE__ */ e.jsx("div", { ref: i, children: s ? t : null })
    }
  );
}
const Le = q(null);
function cr() {
  const t = K(Le);
  if (!t)
    throw new Error(
      "useGridStackWidgetContext must be used within a GridStackWidgetProvider"
    );
  return t;
}
function jt({
  widgetId: t
}) {
  const { removeWidget: r } = Y(), [s, n] = x.useState(!1), [o, c] = x.useState({ top: 0, left: 0 }), i = x.useRef(null), p = (u) => {
    if (u.stopPropagation(), i.current) {
      const m = i.current.getBoundingClientRect();
      c({
        top: m.bottom + window.scrollY,
        left: m.left + window.scrollX
      });
    }
    n(!s);
  }, g = () => {
    n(!1);
  }, y = () => {
    var m;
    r(t);
    const u = document.querySelector(`[gs-id="${t}"]`);
    u && ((m = u.gridstackNode) != null && m.grid) && u.gridstackNode.grid.removeWidget(u, !0, !0), g();
  };
  return x.useEffect(() => {
    const u = (m) => {
      s && n(!1);
    };
    return document.addEventListener("click", u), () => {
      document.removeEventListener("click", u);
    };
  }, [s]), /* @__PURE__ */ e.jsxs("div", { className: "flex justify-end size-4", children: [
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
        ref: i,
        onClick: p,
        className: "p-1 hover:bg-gray-200 rounded transition-colors",
        "aria-haspopup": "true",
        "aria-expanded": s,
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
    s && /* @__PURE__ */ e.jsx(
      "div",
      {
        className: "fixed z-50 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 py-1",
        style: {
          top: `${o.top}px`,
          left: `${o.left}px`,
          transform: "translateX(-100%)"
        },
        onClick: (u) => u.stopPropagation(),
        children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            onClick: y,
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
function wt({ widgetId: t, children: r }) {
  const s = z(null);
  return U(() => {
    var p;
    const n = s.current;
    if (!n) return;
    const o = n.closest(".grid-stack-item");
    if (!o || !((p = o.gridstackNode) != null && p.grid)) return;
    const c = () => {
      var y, u;
      const g = o.querySelector(".grid-stack-item-content");
      g != null && g.firstElementChild && o.gridstackNode && o.gridstackNode.grid && ((u = (y = o.gridstackNode) == null ? void 0 : y.grid) == null || u.resizeToContent(o));
    }, i = new ResizeObserver(() => c());
    return i.observe(n), c(), () => i.disconnect();
  }, [t]), /* @__PURE__ */ e.jsx(
    "div",
    {
      ref: s,
      className: "gridstack-measured-container",
      style: { width: "100%" },
      children: r
    }
  );
}
function Nt(t) {
  let r = null, s = "", n = {};
  try {
    if (t.content) {
      const o = JSON.parse(t.content);
      s = o.name, n = o.props;
    }
  } catch (o) {
    r = o;
  }
  return { name: s, props: n, error: r };
}
function kt({
  id: t,
  meta: r,
  WidgetComponent: s,
  widgetContainer: n,
  showMenubar: o,
  isSelected: c = !1,
  onWidgetSelect: i,
  componentProps: p
  // Add this
}) {
  const g = Nt(r), y = p || g.props, u = (y == null ? void 0 : y.title) || `Widget ${t.slice(0, 4)}`, m = (b) => {
    i && i({
      id: t,
      name: g.name,
      props: y
      // Use the resolved props
    });
  }, k = /* @__PURE__ */ e.jsx(wt, { widgetId: t, children: /* @__PURE__ */ e.jsxs(
    "div",
    {
      className: `h-full w-full ${c ? "outline outline-2 outline-blue-400 outline-offset-1" : ""}`,
      onClick: m,
      children: [
        o && /* @__PURE__ */ e.jsxs("div", { className: "widget-header flex items-center justify-between bg-gray-100 border-b px-2 min-h-[36px]", children: [
          /* @__PURE__ */ e.jsx("div", { className: "font-medium truncate text-sm px-1", children: u }),
          /* @__PURE__ */ e.jsx(jt, { widgetId: t })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "widget-body flex-1 min-h-[40px] cursor-pointer", children: [
          /* @__PURE__ */ e.jsx(s, { ...y }),
          " "
        ] })
      ]
    }
  ) });
  return /* @__PURE__ */ e.jsx(Le.Provider, { value: { widget: { id: t } }, children: Qe(k, n) });
}
const ie = q(
  void 0
), X = () => {
  const t = K(ie);
  if (!t)
    throw new Error("useStackPage must be used within a StackPageProvider");
  return t;
}, Me = () => {
  const t = K(ie);
  if (!t)
    throw new Error(
      "useStackPageWidgetProps must be used within a StackPageProvider"
    );
  return {
    widgetProps: t.widgetProps,
    updateWidgetProps: t.updateWidgetProps
  };
};
function Ct(t) {
  let r = null, s = "", n = {};
  try {
    if (t.content) {
      const o = JSON.parse(t.content);
      s = o.name, n = o.props;
    }
  } catch (o) {
    r = o;
  }
  return { name: s, props: n, error: r };
}
function St({
  componentMap: t,
  showMenubar: r = !1,
  onWidgetSelect: s
}) {
  const { _rawWidgetMetaMap: n } = Y(), { getWidgetContainer: o } = lt(), { widgetProps: c } = Me(), { selectedInstance: i } = X();
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    Array.from(n.value.entries()).length === 0 && /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 p-8 text-center", children: [
      /* @__PURE__ */ e.jsx("div", { className: "text-4xl mb-4", children: "📦" }),
      /* @__PURE__ */ e.jsx("h3", { className: "text-lg font-medium mb-2", children: "Drag Components Here" }),
      /* @__PURE__ */ e.jsx("p", { className: "text-sm", children: "Drag components from the Components tab in the right panel to start building your layout" })
    ] }),
    Array.from(n.value.entries()).map(([p, g]) => {
      const { name: y, props: u } = Ct(g), m = t[y], k = o(p), b = c.get(p) || u;
      return !m || !k ? null : /* @__PURE__ */ e.jsx(
        kt,
        {
          id: p,
          meta: g,
          WidgetComponent: m,
          widgetContainer: k,
          showMenubar: r,
          isSelected: p === (i == null ? void 0 : i.id),
          onWidgetSelect: s,
          componentProps: b
        },
        p
      );
    })
  ] });
}
function Pt({
  title: t,
  titleId: r,
  ...s
}, n) {
  return /* @__PURE__ */ x.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": r
  }, s), t ? /* @__PURE__ */ x.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ x.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const he = /* @__PURE__ */ x.forwardRef(Pt);
function Et({
  title: t,
  titleId: r,
  ...s
}, n) {
  return /* @__PURE__ */ x.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": r
  }, s), t ? /* @__PURE__ */ x.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ x.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
  }));
}
const Lt = /* @__PURE__ */ x.forwardRef(Et);
function Mt({
  title: t,
  titleId: r,
  ...s
}, n) {
  return /* @__PURE__ */ x.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": r
  }, s), t ? /* @__PURE__ */ x.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ x.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
  }));
}
const Re = /* @__PURE__ */ x.forwardRef(Mt);
function Rt({
  title: t,
  titleId: r,
  ...s
}, n) {
  return /* @__PURE__ */ x.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": r
  }, s), t ? /* @__PURE__ */ x.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ x.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 19.5 8.25 12l7.5-7.5"
  }));
}
const be = /* @__PURE__ */ x.forwardRef(Rt);
function Ot({
  title: t,
  titleId: r,
  ...s
}, n) {
  return /* @__PURE__ */ x.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": r
  }, s), t ? /* @__PURE__ */ x.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ x.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m8.25 4.5 7.5 7.5-7.5 7.5"
  }));
}
const ve = /* @__PURE__ */ x.forwardRef(Ot);
function Tt({
  title: t,
  titleId: r,
  ...s
}, n) {
  return /* @__PURE__ */ x.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": r
  }, s), t ? /* @__PURE__ */ x.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ x.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
  }));
}
const Wt = /* @__PURE__ */ x.forwardRef(Tt);
function Dt({
  title: t,
  titleId: r,
  ...s
}, n) {
  return /* @__PURE__ */ x.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": r
  }, s), t ? /* @__PURE__ */ x.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ x.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
  }), /* @__PURE__ */ x.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
  }));
}
const At = /* @__PURE__ */ x.forwardRef(Dt);
function $t({
  title: t,
  titleId: r,
  ...s
}, n) {
  return /* @__PURE__ */ x.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": r
  }, s), t ? /* @__PURE__ */ x.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ x.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
  }));
}
const Ft = /* @__PURE__ */ x.forwardRef($t);
function It({
  title: t,
  titleId: r,
  ...s
}, n) {
  return /* @__PURE__ */ x.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": r
  }, s), t ? /* @__PURE__ */ x.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ x.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
  }));
}
const zt = /* @__PURE__ */ x.forwardRef(It);
function Ut({
  title: t,
  titleId: r,
  ...s
}, n) {
  return /* @__PURE__ */ x.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": r
  }, s), t ? /* @__PURE__ */ x.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ x.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
  }));
}
const _t = /* @__PURE__ */ x.forwardRef(Ut);
function Bt({ content: t }) {
  return /* @__PURE__ */ e.jsx("div", { className: "flex items-start p-2 bg-white border rounded shadow-sm text-left", children: /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx("p", { className: "text-sm", children: t }) }) });
}
const ne = "1rem", oe = [
  //{ c: 1, w: 300 },   // 1 column on screens < 300px
  { c: 1, w: 500 },
  // 2 columns between 300px - 500px
  { c: 3, w: 800 },
  // 4 columns between 500px - 800px
  { c: 6, w: 1024 }
  // 6 columns between 800px - 1024px
  //{ c: 8, w: 1200 },  // 8 columns on screens > 1200px
], ae = {
  acceptWidgets: !0,
  removable: "#trash",
  sizeToContent: !0,
  resizable: { handles: "se" },
  minRow: 10,
  columnOpts: {
    breakpointForWindow: !0,
    breakpoints: oe,
    layout: "moveScale",
    columnMax: 12
  },
  margin: 5,
  cellHeight: ne,
  subGridOpts: {
    acceptWidgets: !0,
    removable: "#trash",
    resizable: { handles: "se" },
    sizeToContent: !0,
    columnOpts: {
      breakpoints: oe,
      layout: "moveScale"
    },
    margin: 5,
    minRow: 1,
    cellHeight: ne
  },
  children: []
}, Gt = {
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
      breakpoints: oe,
      layout: "moveScale"
    },
    margin: 5,
    minRow: 6,
    cellHeight: ne,
    children: []
  },
  children: []
}, se = () => ({
  id: `${Ee()}`,
  title: "untitled page",
  grids: ae
}), ye = {
  Text: {
    content: "Any content other than text are what we call cards. Cards can be accessed by clicking the ➕ button or typing / at the beginning of a paragraph.\nEven better, continue typing to find the card you're looking for, hit enter, and avoid dragging your mouse altogether.\nSome cards have a handy little shortcut, to keep you on track and in flow. Use --- to divide your paragraphs with a line, or ``` to add a code block. You can also drag and drop images directly into the editor to bypass the menu. \nAny content other than text are what we call cards. Cards can be accessed by clicking the ➕ button or typing / at the beginning of a paragraph.",
    title: "This is text card"
  }
}, je = {
  Text: Bt
}, Oe = (t) => {
  if (t) {
    const r = t();
    return { ...je, ...r };
  }
  return je;
}, Ht = (t) => {
  if (t) {
    const r = t();
    return { ...ye, ...r };
  }
  return ye;
}, Jt = Ye((t, r) => {
  const { addWidget: s, addSubGrid: n, saveOptions: o, _rawWidgetMetaMap: c } = Y();
  return Xe(r, () => ({
    saveLayout: () => o(),
    addWidget: s,
    addSubGrid: n,
    rawWidgetMetaMap: c
  })), null;
});
function Vt({ pageInfo: t }) {
  const [r, s] = C(void 0);
  return U(() => {
    t && s(t);
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
function Zt({
  isOpen: t,
  pageInfo: r,
  resetOpenInfo: s
}) {
  const [n, o] = x.useState(!1);
  x.useEffect(() => {
  }, [t, r]);
  const c = () => {
    s(!1);
  }, i = () => {
    var g;
    navigator.clipboard.writeText(
      ((g = document.getElementById("pageinfo")) == null ? void 0 : g.innerText) || ""
    ), o(!0), setTimeout(() => {
      o(!1);
    }, 3e3);
  }, p = (g) => {
    g.target === g.currentTarget && c();
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
                onClick: i,
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
                  n && /* @__PURE__ */ e.jsx("span", { className: "absolute -top-8 -right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap", children: "copied" })
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
        /* @__PURE__ */ e.jsx("div", { className: "p-4 overflow-y-auto flex-1", children: /* @__PURE__ */ e.jsx(Vt, { pageInfo: r }) }),
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
function qt({ children: t }) {
  const [r, s] = C(
    null
  ), [n, o] = C(null), [c, i] = C({
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
  }), [p, g] = C("components"), [y, u] = C(
    /* @__PURE__ */ new Map()
  ), m = A((b, N) => {
    u((d) => {
      const E = new Map(d);
      return E.set(b, N), E;
    });
  }, []), k = {
    selectedComponent: r,
    setSelectedComponent: s,
    selectedInstance: n,
    setSelectedInstance: o,
    pageAttributes: c,
    setPageAttributes: i,
    activeTab: p,
    setActiveTab: g,
    widgetProps: y,
    updateWidgetProps: m
  };
  return /* @__PURE__ */ e.jsx(ie.Provider, { value: k, children: t });
}
const Kt = (t) => {
  const { widgetProps: r, updateWidgetProps: s } = Me();
  return {
    getProps: () => {
      if (t)
        return r.get(t);
    },
    setProps: (i) => {
      t && s(t, i);
    },
    updateProps: (i) => {
      if (!t) return;
      const p = r.get(t) || {};
      s(t, { ...p, ...i });
    },
    hasProps: t ? r.has(t) : !1
  };
}, Yt = ({
  name: t,
  value: r,
  onChange: s,
  onFileUpload: n
}) => {
  const o = z(null), [c, i] = C(!1), [p, g] = C(r || ""), y = (a) => {
    if (typeof a != "string") return !1;
    const v = new Date(a);
    return !isNaN(v.getTime());
  }, u = (a) => {
    try {
      const v = new URL(a);
      return v.protocol === "http:" || v.protocol === "https:";
    } catch {
      return !1;
    }
  }, m = () => {
    const a = t.toLowerCase();
    if ([
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
      "media"
    ].includes(a))
      return "file";
    if ([
      "date",
      "time",
      "datetime",
      "created",
      "updated",
      "start",
      "end",
      "timestamp",
      "published",
      "due",
      "at"
    ].some(
      (S) => a.includes(S)
    ) && y(r))
      return a.includes("time") || a.includes("datetime") || a === "timestamp" ? "datetime" : "date";
    if (typeof r == "number") return "number";
    if (typeof r == "boolean") return "boolean";
    if (Array.isArray(r)) return "array";
    if (typeof r == "object" && r !== null) return "json";
    if (typeof r == "string") {
      const S = /^\[([^\]]+)\]$/, W = r.match(S);
      if (W) {
        const T = W[1];
        if (T.includes(",") || T.includes("|"))
          return "select";
      }
      return r.length > 40 || r.includes(`
`) ? "textarea" : a.includes("color") || r.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/) ? "color" : "text";
    }
    return "text";
  }, k = (a) => {
    const v = a.match(/^\[([^\]]+)\]$/);
    if (!v) return [];
    const l = v[1];
    return l.includes(",") ? l.split(",").map((S) => S.trim()) : l.includes("|") ? l.split("|").map((S) => S.trim()) : [l.trim()];
  }, b = (a, v) => {
    if (!a) return "";
    try {
      const l = new Date(a);
      return isNaN(l.getTime()) ? "" : v === "date" ? l.toISOString().split("T")[0] : l.toISOString().slice(0, 16);
    } catch {
      return "";
    }
  }, N = (a, v) => {
    if (!a) return "";
    try {
      return v === "date" ? (/* @__PURE__ */ new Date(a + "T00:00:00")).toISOString().split("T")[0] : new Date(a).toISOString();
    } catch {
      return a;
    }
  }, d = (a, v) => {
    if (!a) return "";
    try {
      const l = new Date(a);
      if (isNaN(l.getTime())) return "";
      const S = l.getFullYear(), W = String(l.getMonth() + 1).padStart(2, "0"), T = String(l.getDate()).padStart(2, "0");
      if (v === "date")
        return `${S}/${W}/${T}`;
      {
        const D = String(l.getHours()).padStart(2, "0"), H = String(l.getMinutes()).padStart(2, "0");
        return `${S}/${W}/${T} ${D}:${H}`;
      }
    } catch {
      return "";
    }
  }, E = (a) => {
    var D;
    if (!a) return "other";
    if (a.startsWith("data:"))
      return a.startsWith("data:image") ? "image" : a.startsWith("data:video") ? "video" : a.startsWith("data:audio") ? "audio" : "other";
    const v = ((D = a.split(".").pop()) == null ? void 0 : D.toLowerCase()) || "", l = [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "webp",
      "bmp",
      "svg",
      "ico",
      "tiff"
    ], S = [
      "mp4",
      "mov",
      "avi",
      "webm",
      "mkv",
      "flv",
      "wmv",
      "m4v",
      "3gp"
    ], W = ["mp3", "wav", "ogg", "aac", "flac", "m4a", "wma"], T = [
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
    return l.includes(v) ? "image" : S.includes(v) ? "video" : W.includes(v) ? "audio" : T.includes(v) ? "document" : "other";
  }, M = () => {
    const a = t.toLowerCase(), v = E(r);
    if (a.includes("image") || a.includes("avatar") || a.includes("logo") || a.includes("icon"))
      return "image/*";
    if (a.includes("video"))
      return "video/*";
    if (a.includes("audio") || a.includes("sound"))
      return "audio/*";
    if (a.includes("document") || a.includes("pdf") || a.includes("doc"))
      return ".pdf,.doc,.docx,.txt,.rtf,.odt,.xls,.xlsx,.ppt,.pptx";
    switch (v) {
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
  }, O = m(), R = async (a) => {
    var l;
    const v = (l = a.target.files) == null ? void 0 : l[0];
    if (v) {
      i(!0);
      try {
        if (n) {
          const S = await n(v);
          s(S), g(S);
        } else {
          const S = new FileReader();
          S.onload = (W) => {
            var D;
            const T = (D = W.target) == null ? void 0 : D.result;
            s(T), g(T);
          }, S.readAsDataURL(v);
        }
      } catch (S) {
        console.error("File upload failed:", S), alert("Failed to upload file");
      } finally {
        i(!1);
      }
    }
  }, F = (a) => {
    const v = a.target.value;
    g(v);
  }, h = () => {
    if (p && !u(p)) {
      alert("Please enter a valid HTTP or HTTPS URL");
      return;
    }
    s(p);
  }, j = () => {
    typeof r == "string" && r.startsWith("data:") && URL.revokeObjectURL(r), s(""), g(""), o.current && (o.current.value = "");
  }, w = () => {
    switch (E(r)) {
      case "image":
        return /* @__PURE__ */ e.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ e.jsx(
            "img",
            {
              src: r,
              alt: "Preview",
              className: "w-16 h-16 object-cover rounded border"
            }
          ),
          /* @__PURE__ */ e.jsxs("div", { className: "text-sm text-gray-600", children: [
            /* @__PURE__ */ e.jsx("div", { children: "Image File" }),
            /* @__PURE__ */ e.jsx("div", { className: "text-xs text-gray-400 truncate max-w-32", children: r.split("/").pop() || "Image" })
          ] })
        ] });
      case "video":
        return /* @__PURE__ */ e.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ e.jsx("div", { className: "w-16 h-16 bg-gray-200 rounded border flex items-center justify-center", children: /* @__PURE__ */ e.jsx("span", { className: "text-2xl", children: "🎬" }) }),
          /* @__PURE__ */ e.jsxs("div", { className: "text-sm text-gray-600", children: [
            /* @__PURE__ */ e.jsx("div", { children: "Video File" }),
            /* @__PURE__ */ e.jsx("div", { className: "text-xs text-gray-400 truncate max-w-32", children: r.split("/").pop() || "Video" })
          ] })
        ] });
      case "audio":
        return /* @__PURE__ */ e.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ e.jsx("div", { className: "w-16 h-16 bg-gray-200 rounded border flex items-center justify-center", children: /* @__PURE__ */ e.jsx("span", { className: "text-2xl", children: "🎵" }) }),
          /* @__PURE__ */ e.jsxs("div", { className: "text-sm text-gray-600", children: [
            /* @__PURE__ */ e.jsx("div", { children: "Audio File" }),
            /* @__PURE__ */ e.jsx("div", { className: "text-xs text-gray-400 truncate max-w-32", children: r.split("/").pop() || "Audio" })
          ] })
        ] });
      case "document":
        return /* @__PURE__ */ e.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ e.jsx("div", { className: "w-16 h-16 bg-gray-200 rounded border flex items-center justify-center", children: /* @__PURE__ */ e.jsx("span", { className: "text-2xl", children: "📄" }) }),
          /* @__PURE__ */ e.jsxs("div", { className: "text-sm text-gray-600", children: [
            /* @__PURE__ */ e.jsx("div", { children: "Document" }),
            /* @__PURE__ */ e.jsx("div", { className: "text-xs text-gray-400 truncate max-w-32", children: r.split("/").pop() || "Document" })
          ] })
        ] });
      default:
        return /* @__PURE__ */ e.jsx("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ e.jsx("div", { className: "text-sm text-gray-500 truncate max-w-32", children: r.split("/").pop() || "File" }) });
    }
  };
  switch (Ne.useEffect(() => {
    g(r || "");
  }, [r]), O) {
    case "number":
      return /* @__PURE__ */ e.jsx(
        "input",
        {
          type: "number",
          value: r,
          onChange: (l) => s(Number(l.target.value)),
          className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          step: t.toLowerCase().includes("integer") ? "1" : "any"
        }
      );
    case "boolean":
      return /* @__PURE__ */ e.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ e.jsx(
          "input",
          {
            type: "checkbox",
            checked: r,
            onChange: (l) => s(l.target.checked),
            className: "w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          }
        ),
        /* @__PURE__ */ e.jsx("span", { className: "ml-2 text-sm text-gray-600", children: r ? "Enabled" : "Disabled" })
      ] });
    case "textarea":
      return /* @__PURE__ */ e.jsx(
        "textarea",
        {
          value: r,
          onChange: (l) => s(l.target.value),
          rows: Math.min(10, Math.max(3, r.split(`
`).length + 1)),
          className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical",
          placeholder: `Enter ${t}...`
        }
      );
    case "color":
      return /* @__PURE__ */ e.jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ e.jsx(
          "input",
          {
            type: "color",
            value: r,
            onChange: (l) => s(l.target.value),
            className: "w-12 h-12 border border-gray-300 rounded cursor-pointer"
          }
        ),
        /* @__PURE__ */ e.jsx(
          "input",
          {
            type: "text",
            value: r,
            onChange: (l) => s(l.target.value),
            className: "flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            placeholder: "#000000"
          }
        )
      ] });
    case "date":
      return /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
        r && /* @__PURE__ */ e.jsx("div", { className: "text-sms text-gray-700", children: d(r, "date") }),
        /* @__PURE__ */ e.jsx(
          "input",
          {
            type: "date",
            value: b(r, "date"),
            onChange: (l) => s(N(l.target.value, "date")),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          }
        )
      ] });
    case "datetime":
      return /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ e.jsx(
          "input",
          {
            type: "datetime-local",
            value: b(r, "datetime"),
            onChange: (l) => s(N(l.target.value, "datetime")),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          }
        ),
        r && /* @__PURE__ */ e.jsxs("div", { className: "text-xs text-gray-500", children: [
          "Display: ",
          d(r, "datetime")
        ] })
      ] });
    case "file":
      return /* @__PURE__ */ e.jsxs("div", { className: "space-y-3", children: [
        r && /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 rounded border", children: [
          w(),
          /* @__PURE__ */ e.jsx(
            "button",
            {
              type: "button",
              onClick: j,
              className: "text-red-600 hover:text-red-800 text-sm font-medium",
              children: "Remove"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ e.jsx(
            "input",
            {
              ref: o,
              type: "file",
              accept: M(),
              onChange: R,
              disabled: c,
              className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            }
          ),
          c && /* @__PURE__ */ e.jsx("div", { className: "text-sm text-blue-600", children: "Uploading..." }),
          /* @__PURE__ */ e.jsxs("div", { className: "text-xs text-gray-500", children: [
            "Allowed:",
            " ",
            M() === "*/*" ? "All files" : M()
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ e.jsx("div", { className: "text-sm text-gray-600 text-center", children: "OR" }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex space-x-2", children: [
            /* @__PURE__ */ e.jsx(
              "input",
              {
                type: "text",
                value: p,
                onChange: F,
                className: "flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                placeholder: "https://example.com/file.jpg",
                onKeyPress: (l) => {
                  l.key === "Enter" && h();
                }
              }
            ),
            /* @__PURE__ */ e.jsx(
              "button",
              {
                type: "button",
                onClick: h,
                disabled: !p,
                className: "px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 disabled:bg-gray-400",
                children: "Apply URL"
              }
            )
          ] }),
          /* @__PURE__ */ e.jsx("div", { className: "text-xs text-gray-500", children: "Enter a direct URL to an existing file (http or https)" })
        ] })
      ] });
    case "select":
      const a = k(r), v = a.length > 0 ? r : "";
      return /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ e.jsxs(
          "select",
          {
            value: v,
            onChange: (l) => s(l.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            children: [
              /* @__PURE__ */ e.jsx("option", { value: "", children: "Select an option" }),
              a.map((l) => /* @__PURE__ */ e.jsx("option", { value: `[${l}]`, children: l }, l))
            ]
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { className: "text-xs text-gray-500", children: [
          a.length,
          " options available"
        ] })
      ] });
    case "json":
      return /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ e.jsx(
          "textarea",
          {
            value: typeof r == "string" ? r : JSON.stringify(r, null, 2),
            onChange: (l) => {
              try {
                if (l.target.value.trim().startsWith("{") || l.target.value.trim().startsWith("[")) {
                  const S = JSON.parse(l.target.value);
                  s(S);
                } else
                  s(l.target.value);
              } catch {
                s(l.target.value);
              }
            },
            rows: 8,
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-xs",
            placeholder: "Enter JSON data..."
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { className: "text-xs text-gray-500 flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { children: typeof r == "object" ? "JSON Object" : "Text/JSON" }),
          /* @__PURE__ */ e.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                try {
                  const l = JSON.stringify(JSON.parse(r), null, 2);
                  s(l);
                } catch {
                }
              },
              className: "text-blue-600 hover:text-blue-800",
              children: "Format"
            }
          )
        ] })
      ] });
    default:
      return /* @__PURE__ */ e.jsx(
        "input",
        {
          type: "text",
          value: r,
          onChange: (l) => s(l.target.value),
          className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          placeholder: `Enter ${t}...`
        }
      );
  }
}, Xt = ({
  onFileUpload: t,
  onApiCall: r,
  onCustomAction: s,
  onGetSelectOptions: n
}) => {
  const { selectedInstance: o, selectedComponent: c, setSelectedInstance: i, setSelectedComponent: p } = X(), { updateProps: g, getProps: y } = Kt(o == null ? void 0 : o.id);
  if (!o && !c)
    return /* @__PURE__ */ e.jsxs("div", { className: "p-4 text-center text-gray-500", children: [
      /* @__PURE__ */ e.jsx("div", { className: "mb-2", children: "👈" }),
      /* @__PURE__ */ e.jsx("p", { children: "Select a component from the Components tab or click on a placed component to edit its properties" })
    ] });
  const u = (o == null ? void 0 : o.type) || c, m = (o == null ? void 0 : o.props) || {}, k = y() || {}, b = { ...m, ...k }, N = (h, j) => {
    if (o) {
      const w = { ...b, [h]: j }, a = {
        ...o,
        props: w
      };
      i(a), g(w);
    }
  }, d = async (h) => {
    if (n)
      try {
        const w = `[${(await n(h, u || "")).join(", ")}]`;
        N(h, w);
      } catch (j) {
        console.error("Failed to get select options:", j), alert("Failed to load options");
      }
  }, E = async (h, j) => {
    if (r)
      try {
        const w = await r(j);
        N(h, w);
      } catch (w) {
        console.error("API call failed:", w), alert("Failed to fetch data from API");
      }
  }, M = async (h, j, w) => {
    if (s)
      try {
        const a = await s(j, w);
        N(h, a);
      } catch (a) {
        console.error("Custom action failed:", a), alert("Failed to execute action");
      }
  }, O = (h) => {
    if (typeof h != "string") return !1;
    const j = /^\[([^\]]+)\]$/, w = h.match(j);
    return !!(w && (w[1].includes(",") || w[1].includes("|")));
  }, R = (h, j) => {
    const w = h.toLowerCase();
    if (["date", "time", "datetime", "created", "updated", "start", "end", "timestamp"].includes(w)) return !0;
    if (typeof j == "string") {
      const v = new Date(j);
      return !isNaN(v.getTime());
    }
    return !1;
  }, F = (h, j) => typeof j == "number" ? "number" : typeof j == "boolean" ? "boolean" : Array.isArray(j) ? "array" : typeof j == "object" && j !== null ? "object" : O(j) ? "select" : R(h, j) ? "date/datetime" : typeof j == "string" && (j.length > 40 || j.includes(`
`)) ? "long text" : "text";
  return /* @__PURE__ */ e.jsxs("div", { className: "p-4 space-y-4", children: [
    /* @__PURE__ */ e.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ e.jsxs("h3", { className: "text-lg font-medium", children: [
      "Properties - ",
      u,
      o && /* @__PURE__ */ e.jsxs("span", { className: "text-sm text-gray-500 ml-2", children: [
        "(ID: ",
        o.id,
        ")"
      ] })
    ] }) }),
    /* @__PURE__ */ e.jsx("div", { className: "space-y-4", children: Object.entries(b).map(([h, j]) => {
      const w = O(j), a = R(h, j), v = F(h, j);
      return /* @__PURE__ */ e.jsxs(
        "div",
        {
          className: "border-b border-gray-100 pb-3 last:border-b-0",
          children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ e.jsx("label", { className: "block text-sm font-medium text-gray-700 capitalize", children: h.replace(/([A-Z])/g, " $1").trim() }),
              /* @__PURE__ */ e.jsxs("div", { className: "flex space-x-1", children: [
                w && n && /* @__PURE__ */ e.jsx(
                  "button",
                  {
                    onClick: () => d(h),
                    className: "text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700",
                    title: "Refresh options",
                    children: "Refresh"
                  }
                ),
                h.toLowerCase().includes("api") && r && /* @__PURE__ */ e.jsx(
                  "button",
                  {
                    onClick: () => E(h, "/api/data"),
                    className: "text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700",
                    children: "Fetch"
                  }
                ),
                h.toLowerCase().includes("action") && s && /* @__PURE__ */ e.jsx(
                  "button",
                  {
                    onClick: () => M(h, "customAction", b),
                    className: "text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700",
                    children: "Run"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(
              Yt,
              {
                name: h,
                value: j,
                onChange: (l) => N(h, l),
                onFileUpload: t
              }
            ),
            /* @__PURE__ */ e.jsxs("div", { className: "text-xs text-gray-400 mt-1 flex justify-between", children: [
              /* @__PURE__ */ e.jsxs("span", { children: [
                "Type: ",
                v
              ] }),
              w && /* @__PURE__ */ e.jsx("span", { className: "text-blue-500", children: "Select Field" }),
              a && /* @__PURE__ */ e.jsx("span", { className: "text-green-500", children: "Date Field" })
            ] })
          ]
        },
        h
      );
    }) }),
    Object.keys(b).length === 0 && /* @__PURE__ */ e.jsxs("div", { className: "text-center py-8 text-gray-500", children: [
      /* @__PURE__ */ e.jsx("div", { className: "text-4xl mb-2", children: "📝" }),
      /* @__PURE__ */ e.jsx("p", { children: "No properties available for this component" }),
      /* @__PURE__ */ e.jsx("p", { className: "text-sm mt-1", children: "Properties will appear here when the component has configurable options" })
    ] }),
    o && /* @__PURE__ */ e.jsxs("div", { className: "mt-6 pt-4 border-t", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "flex space-x-2", children: [
        /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: () => {
              i(null), p(null);
            },
            className: "flex-1 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors font-medium",
            children: "Clear Selection"
          }
        ),
        /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: () => {
              const h = (o == null ? void 0 : o.props) || {}, j = Object.keys(h).reduce((w, a) => {
                const v = h[a];
                return typeof v == "number" ? w[a] = 0 : typeof v == "boolean" ? w[a] = !1 : Array.isArray(v) ? w[a] = [] : typeof v == "object" ? w[a] = {} : w[a] = "", w;
              }, {});
              N("*RESET*", j);
            },
            className: "px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors font-medium text-sm",
            title: "Reset all properties to default values",
            children: "Reset"
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx("p", { className: "text-sm text-gray-600 mt-3", children: "This is a GridStack widget. Property changes will update the widget in real-time." })
    ] })
  ] });
};
function Qt({ onDropDelete: t }) {
  const { removeWidget: r } = Y(), s = A((i) => {
    var g;
    i.preventDefault();
    const p = i.dataTransfer.getData("text/plain");
    if (p) {
      const y = document.querySelector(`[gs-id="${p}"]`);
      y && ((g = y.gridstackNode) != null && g.grid) && y.gridstackNode.grid.removeWidget(y, !0, !0), r(p);
    }
    t();
  }, [t, r]), n = (i) => {
    i.preventDefault(), i.dataTransfer.dropEffect = "move";
  }, o = (i) => {
    i.preventDefault(), i.currentTarget.classList.add("bg-red-200", "border-red-400");
  }, c = (i) => {
    i.preventDefault(), i.currentTarget.classList.remove("bg-red-200", "border-red-400");
  };
  return /* @__PURE__ */ e.jsx(
    "div",
    {
      id: "trash",
      onDrop: s,
      onDragOver: n,
      onDragEnter: o,
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
const er = ({
  componentMapProvider: t,
  onDragStart: r
}) => {
  const { setSelectedComponent: s, setSelectedInstance: n } = X(), o = Oe(t);
  return /* @__PURE__ */ e.jsxs("div", { className: "p-4 space-y-4", children: [
    /* @__PURE__ */ e.jsx("h3", { className: "text-lg font-medium mb-3", children: "Components" }),
    /* @__PURE__ */ e.jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Drag components to the main area or click to select them" }),
    /* @__PURE__ */ e.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ e.jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Delete Zone" }),
      /* @__PURE__ */ e.jsx(
        Qt,
        {
          onDropDelete: () => {
            console.log("Component deleted via drop zone"), s(null), n(null);
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
        onDragStart: (c) => r(c, "SubGrid"),
        onDragEnd: () => console.log("====SubGrid drag event end...."),
        onClick: () => {
          s("SubGrid"), n(null);
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
    /* @__PURE__ */ e.jsx("div", { className: "grid grid-cols-2 gap-3", children: Object.entries(o).map(([
      c
      /*Component*/
    ]) => /* @__PURE__ */ e.jsx(
      "div",
      {
        "gs-type": c,
        "data-gs-type": c,
        className: "grid-stack-item grid-stack-item-widget",
        draggable: "true",
        onDragStart: (i) => r(i, c),
        onDragEnd: () => console.log("====drag event end...."),
        onClick: () => {
          s(c), n(null);
        },
        children: /* @__PURE__ */ e.jsxs("div", { className: "p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm hover:bg-gray-100 cursor-pointer transition-all duration-200 hover:shadow-md text-center", children: [
          /* @__PURE__ */ e.jsx("div", { className: "font-medium text-gray-800 mb-2", children: c }),
          /* @__PURE__ */ e.jsx("div", { className: "text-xs text-gray-500", children: "Drag to main area" })
        ] })
      },
      c
    )) })
  ] });
}, tr = ({ onFileUpload: t, onGetTags: r }) => {
  const { pageAttributes: s, setPageAttributes: n } = X(), [o, c] = C(null), [i, p] = C(!1), g = z(null), [y, u] = C([
    "home",
    "person",
    "story"
  ]), m = (d, E) => {
    const M = {
      ...s,
      [d]: E
    };
    n(M);
  }, k = async (d) => {
    var M;
    const E = (M = d.target.files) == null ? void 0 : M[0];
    if (E) {
      const O = URL.createObjectURL(E);
      c(O), p(!0);
      try {
        let R = O;
        t && (R = await t(E), URL.revokeObjectURL(O), c(null)), m("image", R);
      } catch (R) {
        console.error("Failed to upload image:", R), alert("Failed to upload image. Please try again.");
      } finally {
        p(!1);
      }
    }
  }, b = () => {
    o && URL.revokeObjectURL(o), c(null), m("image", ""), g.current && (g.current.value = "");
  };
  U(() => {
    const d = async () => r ? await r() || [] : ["home", "person", "story"];
    if (r) {
      const E = d() || [];
      u(E);
    }
  }, [r]);
  const N = ["draft", "published"];
  return /* @__PURE__ */ e.jsxs("div", { className: "p-4 space-y-6", children: [
    /* @__PURE__ */ e.jsx("h3", { className: "text-lg font-medium mb-3", children: "Page Settings" }),
    /* @__PURE__ */ e.jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Configure the overall page layout and appearance" }),
    /* @__PURE__ */ e.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "border-b border-gray-100 pb-4", children: [
        /* @__PURE__ */ e.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-3", children: "Page Image" }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col items-start space-y-3", children: [
          s.image || o ? /* @__PURE__ */ e.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ e.jsx(
              "img",
              {
                src: s.image || o || "",
                alt: "Page preview",
                className: "w-32 h-32 object-cover rounded-lg border border-gray-200"
              }
            ),
            /* @__PURE__ */ e.jsx(
              "button",
              {
                type: "button",
                onClick: b,
                disabled: i,
                className: "absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 disabled:bg-gray-400",
                children: "×"
              }
            )
          ] }) : /* @__PURE__ */ e.jsx("div", { className: "w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400", children: i ? "Uploading..." : "No image" }),
          /* @__PURE__ */ e.jsx(
            "input",
            {
              ref: g,
              type: "file",
              accept: "image/*",
              onChange: k,
              disabled: i,
              className: "hidden",
              id: "page-image-upload"
            }
          ),
          /* @__PURE__ */ e.jsx(
            "label",
            {
              htmlFor: "page-image-upload",
              className: `px-4 py-2 rounded-lg transition-colors cursor-pointer text-sm ${i ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`,
              children: i ? "Uploading..." : "Upload Image"
            }
          ),
          /* @__PURE__ */ e.jsx("p", { className: "text-xs text-gray-500", children: t ? "Image will be uploaded to your server" : "Image will be stored locally (for demo)" })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "border-b border-gray-100 pb-4", children: [
        /* @__PURE__ */ e.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Tag" }),
        /* @__PURE__ */ e.jsxs(
          "select",
          {
            value: s.tag || "",
            onChange: (d) => m("tag", d.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            children: [
              /* @__PURE__ */ e.jsx("option", { value: "", children: "Select a tag" }),
              y.map((d) => /* @__PURE__ */ e.jsx("option", { value: d, children: d }, d))
            ]
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Categorize your page with a tag" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "border-b border-gray-100 pb-4", children: [
        /* @__PURE__ */ e.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Status" }),
        /* @__PURE__ */ e.jsx(
          "select",
          {
            value: s.status || "draft",
            onChange: (d) => m("status", d.target.value),
            className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            children: N.map((d) => /* @__PURE__ */ e.jsx("option", { value: d, children: d.charAt(0).toUpperCase() + d.slice(1) }, d))
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Set the publication status of this page" })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "border-b border-gray-100 pb-4", children: /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Show Component Menu" }),
          /* @__PURE__ */ e.jsx("p", { className: "text-xs text-gray-500", children: "Display the menu bar with delete button on each component" })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ e.jsx(
          "input",
          {
            type: "checkbox",
            checked: s.showMenubar,
            onChange: (d) => m(
              "showMenubar",
              d.target.checked
            ),
            className: "w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Margin" }),
        /* @__PURE__ */ e.jsx(
          "input",
          {
            type: "text",
            value: s.margin,
            onChange: (d) => m("margin", d.target.value),
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
            value: s.padding,
            onChange: (d) => m("padding", d.target.value),
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
              value: s.background,
              onChange: (d) => m("background", d.target.value),
              className: "w-12 h-12 border border-gray-300 rounded cursor-pointer"
            }
          ),
          /* @__PURE__ */ e.jsx(
            "input",
            {
              type: "text",
              value: s.background,
              onChange: (d) => m("background", d.target.value),
              className: "flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              placeholder: "#ffffff, rgb(255,255,255), etc."
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Background color for the main content area" })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg", children: [
      /* @__PURE__ */ e.jsx("h4", { className: "font-medium text-blue-800 mb-2", children: "Current Page Settings" }),
      /* @__PURE__ */ e.jsxs("div", { className: "text-sm text-blue-700 grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ e.jsxs("div", { children: [
          "Menu Bar:",
          " ",
          /* @__PURE__ */ e.jsx("code", { children: s.showMenubar ? "Visible" : "Hidden" })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { children: [
          "Tag: ",
          /* @__PURE__ */ e.jsx("code", { children: s.tag || "Not set" })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { children: [
          "Status: ",
          /* @__PURE__ */ e.jsx("code", { children: s.status || "draft" })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { children: [
          "Margin: ",
          /* @__PURE__ */ e.jsx("code", { children: s.margin })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { children: [
          "Padding: ",
          /* @__PURE__ */ e.jsx("code", { children: s.padding })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { children: [
          "Background: ",
          /* @__PURE__ */ e.jsx("code", { children: s.background })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "col-span-2", children: [
          "Image:",
          " ",
          /* @__PURE__ */ e.jsx("code", { children: s.image ? t ? "Remote" : "Local" : "Not set" })
        ] })
      ] })
    ] })
  ] });
};
function we({
  onClick: t,
  icon: r,
  label: s,
  className: n = "",
  successMessage: o = "Success",
  errorMessage: c = "Error"
}) {
  const [i, p] = C(null), [g, y] = C(!1), u = async () => {
    y(!0), p(null);
    try {
      await t(), p({ message: o, type: "success" });
    } catch {
      p({ message: c, type: "error" });
    } finally {
      y(!1), setTimeout(() => p(null), 3e3);
    }
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "relative z-30", children: [
    /* @__PURE__ */ e.jsx(
      "button",
      {
        onClick: u,
        disabled: g,
        className: `p-2 rounded-lg transition flex items-center ${n} ${g ? "opacity-70" : ""}`,
        children: g ? /* @__PURE__ */ e.jsx(Re, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          r,
          /* @__PURE__ */ e.jsx("span", { className: "ml-1 hidden sm:inline", children: s })
        ] })
      }
    ),
    i && /* @__PURE__ */ e.jsx(
      "div",
      {
        className: `absolute top-full left-0 mt-1 w-full text-center px-2 py-1 rounded-md text-xs font-medium animate-fadeIn ${i.type === "success" ? "bg-blue-500 text-white" : "bg-red-100 text-red-800"}`,
        children: i.message
      }
    )
  ] });
}
function V({
  onClick: t,
  icon: r,
  tooltip: s,
  className: n = ""
}) {
  return /* @__PURE__ */ e.jsxs("div", { className: "relative group", children: [
    /* @__PURE__ */ e.jsx(
      "button",
      {
        onClick: t,
        className: `p-2 rounded-lg transition ${n}`,
        children: r
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "absolute top-full left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10", children: [
      s,
      /* @__PURE__ */ e.jsx("div", { className: "absolute bottom-full left-1/2 w-2 h-2 bg-black transform -translate-x-1/2 rotate-45 -mb-1" })
    ] })
  ] });
}
const rr = q(void 0), sr = ({ children: t, defaultLocale: r = "en-US" }) => {
  const [s, n] = C(r);
  return /* @__PURE__ */ e.jsx(rr.Provider, { value: { locale: s, setLocale: n }, children: t });
}, nr = () => {
  const [t, r] = C(!1);
  return U(() => {
    const s = () => {
      r(window.innerWidth <= 768);
    };
    return s(), window.addEventListener("resize", s), () => {
      window.removeEventListener("resize", s);
    };
  }, []), t;
}, or = ({
  pageid: t,
  pageMode: r,
  onSaveLayout: s,
  onLoadLayout: n,
  componentMapProvider: o,
  componentPropsProvider: c,
  gobackList: i,
  onFileUpload: p,
  onGetTags: g,
  onApiCall: y,
  onCustomAction: u,
  onGetSelectOptions: m,
  children: k
}) => {
  const [b, N] = C(
    r
  ), [d, E] = C(!0), [M, O] = C(!1), {
    activeTab: R,
    setActiveTab: F,
    pageAttributes: h,
    setPageAttributes: j,
    setSelectedInstance: w,
    setSelectedComponent: a,
    widgetProps: v
    // Add this to get widgetProps from context
  } = X(), [l, S] = C({
    ...se(),
    id: t
  }), [W, T] = C(), [D, H] = C(), [Te, le] = C(0), [We, ce] = C(ae), _ = z(null), [I, De] = C(), [Ae, de] = C(!1), B = nr();
  U(() => {
    N(r);
  }, [r]);
  const ue = A(
    async (f) => {
      const P = await n(f) || se();
      return S(P), T(P.title), H(P.title), j(P.pageAttributes || h), P.grids;
    },
    [n]
  ), te = A(async () => {
    if (t) {
      const f = await ue(t);
      ce(f), le((P) => P + 1), me(), console.log(`reload layout: pageid ${t}, props id ${l == null ? void 0 : l.id}`);
    }
  }, [t, ue]);
  U(() => {
    (async () => {
      if (t)
        try {
          await te();
        } catch (P) {
          console.error("Failed to load layout:", P);
        }
    })();
  }, [t, te]);
  const $e = () => {
    i && i();
  }, Fe = (f, P) => {
    if (!f) return f;
    const J = Array.isArray(f) ? f : f.children;
    if (!J) return f;
    const xe = J.map(($) => {
      if ($.id && P.has($.id)) {
        const qe = P.get($.id);
        try {
          let G = { name: "", props: {} };
          return $.content && (G = JSON.parse($.content)), G.props = { ...G.props, ...qe }, {
            ...$,
            content: JSON.stringify(G)
          };
        } catch (G) {
          return console.error(`Error updating props for widget ${$.id}:`, G), $;
        }
      }
      return $;
    });
    return Array.isArray(f) ? xe : {
      ...f,
      children: xe
    };
  }, Ie = async () => {
    var f;
    if (s) {
      let P = (f = _.current) == null ? void 0 : f.saveLayout();
      if (console.log("****grid stack layout: ", P), P) {
        P = Fe(P, v);
        const J = {
          ...l || se(),
          grids: P,
          title: D,
          tag: h.tag,
          status: h.status,
          pageAttributes: h
        };
        console.log(
          `Saving layout: pageid ${t}, props id ${J.id}`
        ), await s(t, J);
      }
    }
  }, me = () => {
    a(null), w(null);
  }, ze = () => {
    confirm("Are you sure you want to clear all data? This cannot be undone.") && (ce(ae), le((f) => f + 1), me());
  }, Ue = () => {
    O(!0);
  }, pe = () => {
    O(!1);
  }, _e = (f) => {
    f.key === "Enter" ? pe() : f.key === "Escape" && (H(W), O(!1));
  }, Be = (f, P) => {
    f.dataTransfer.setData("text/plain", P), f.dataTransfer.effectAllowed = "copy";
  }, Ge = (f) => {
    De(f);
  }, He = A(
    (f) => {
      const P = {
        id: f.id,
        type: f.name,
        props: f.props
      };
      w(P), a(f.name), F("properties");
    },
    [w, a, F]
  ), Je = () => {
    var P;
    const f = JSON.parse(JSON.stringify(l));
    return f.grids = (P = _.current) == null ? void 0 : P.saveLayout(), f;
  };
  U(() => {
    I && _.current && (I.name !== "SubGrid" ? _.current.addWidget((f) => ({
      ...I,
      sizeToContent: !0,
      content: JSON.stringify({
        name: I.name,
        props: Ht(c)[I.name]
      })
    })) : _.current.addSubGrid((f) => ({
      ...I,
      ...Gt
    })));
  }, [I, c]);
  const Ve = B ? { width: "100vw", minWidth: "100vw", height: "100vh" } : { width: "400px", minWidth: "300px", height: "100%" }, Ze = {
    margin: h.margin,
    padding: h.padding,
    backgroundColor: h.background
  };
  return /* @__PURE__ */ e.jsx(it, { initialOptions: We, children: /* @__PURE__ */ e.jsxs("div", { className: "min-h-screen bg-white text-black flex flex-col", children: [
    b === "edit" && /* @__PURE__ */ e.jsx("header", { className: "mx-2 p-4 bg-white shadow relative", children: /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ e.jsx("div", { className: "flex-1 mb-3 sm:mb-0 min-w-0", children: /* @__PURE__ */ e.jsx("div", { className: "flex items-center gap-2", children: M ? /* @__PURE__ */ e.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ e.jsx(
        "input",
        {
          type: "text",
          value: D,
          onChange: (f) => H(f.target.value),
          onKeyDown: _e,
          onBlur: pe,
          className: "text-2xl font-bold border-b-2 border-blue-500 bg-transparent outline-none px-1",
          autoFocus: !0
        }
      ) }) : /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 group", children: [
        /* @__PURE__ */ e.jsx("h1", { className: "text-2xl font-bold truncate", children: D }),
        /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: Ue,
            className: "p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity",
            children: /* @__PURE__ */ e.jsx(zt, { className: "h-4 w-4" })
          }
        )
      ] }) }) }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex flex-wrap gap-1 justify-end", children: [
        /* @__PURE__ */ e.jsx(
          V,
          {
            onClick: $e,
            icon: /* @__PURE__ */ e.jsx(Lt, { className: "h-5 w-5" }),
            tooltip: "Back to list",
            className: "bg-gray-200 hover:bg-gray-300"
          }
        ),
        /* @__PURE__ */ e.jsx(
          V,
          {
            onClick: () => N("preview"),
            icon: /* @__PURE__ */ e.jsx(At, { className: "h-5 w-5" }),
            tooltip: "Preview",
            className: "bg-purple-600 hover:bg-purple-700 text-white"
          }
        ),
        /* @__PURE__ */ e.jsx(
          we,
          {
            onClick: Ie,
            icon: /* @__PURE__ */ e.jsx(Wt, { className: "h-5 w-5" }),
            label: "Save",
            className: "bg-green-600 hover:bg-green-700 text-white",
            successMessage: "Saved successfully!",
            errorMessage: "Save failed"
          }
        ),
        /* @__PURE__ */ e.jsx(
          we,
          {
            onClick: te,
            icon: /* @__PURE__ */ e.jsx(Re, { className: "h-5 w-5" }),
            label: "Reload",
            className: "bg-green-600 hover:bg-green-700 text-white",
            successMessage: "Reloaded successfully",
            errorMessage: "Failed to reload"
          }
        ),
        /* @__PURE__ */ e.jsx(
          V,
          {
            onClick: ze,
            icon: /* @__PURE__ */ e.jsx(_t, { className: "h-5 w-5" }),
            tooltip: "Clear all data",
            className: "bg-red-600 hover:bg-red-700 text-white"
          }
        ),
        /* @__PURE__ */ e.jsx(
          V,
          {
            onClick: () => de(!0),
            icon: /* @__PURE__ */ e.jsx(Ft, { className: "h-5 w-5" }),
            tooltip: "Page Info & Settings",
            className: "bg-indigo-600 hover:bg-indigo-700 text-white"
          }
        ),
        !B && /* @__PURE__ */ e.jsx(
          V,
          {
            onClick: () => E(!d),
            icon: d ? /* @__PURE__ */ e.jsx(ve, { className: "h-5 w-5" }) : /* @__PURE__ */ e.jsx(be, { className: "h-5 w-5" }),
            tooltip: d ? "Hide Editor" : "Show Editor",
            className: "bg-gray-200 hover:bg-gray-300"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "flex flex-1 overflow-hidden relative", children: [
      /* @__PURE__ */ e.jsx(
        "div",
        {
          className: `flex-1 transition-all duration-200 ${d && b === "edit" ? "overflow-auto" : "overflow-hidden"}`,
          style: Ze,
          children: /* @__PURE__ */ e.jsx("div", { className: "h-full", children: /* @__PURE__ */ e.jsx("div", { className: "bg-white rounded-lg shadow h-full flex flex-col", children: /* @__PURE__ */ e.jsxs(
            "div",
            {
              className: `flex-1 relative p-0 grid-stack-mode-${b}`,
              children: [
                /* @__PURE__ */ e.jsx(Jt, { ref: _ }),
                /* @__PURE__ */ e.jsx(
                  yt,
                  {
                    onGridStackDropEvent: Ge,
                    children: /* @__PURE__ */ e.jsx(
                      St,
                      {
                        componentMap: Oe(o),
                        showMenubar: h.showMenubar,
                        onWidgetSelect: He
                      }
                    )
                  }
                ),
                k
              ]
            }
          ) }) })
        }
      ),
      b === "edit" && d && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        B && /* @__PURE__ */ e.jsx(
          "div",
          {
            className: "fixed inset-0 bg-black bg-opacity-50 z-40",
            onClick: () => E(!1)
          }
        ),
        /* @__PURE__ */ e.jsxs(
          "div",
          {
            className: `flex flex-col bg-white shadow-lg border-l border-gray-200 ${B ? "fixed right-0 top-0 bottom-0 z-50 transform transition-transform duration-300" : "relative"}`,
            style: Ve,
            children: [
              B && /* @__PURE__ */ e.jsx("div", { className: "absolute top-4 right-4 z-10", children: /* @__PURE__ */ e.jsx(
                "button",
                {
                  onClick: () => E(!1),
                  className: "p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors",
                  children: /* @__PURE__ */ e.jsx(ve, { className: "h-5 w-5" })
                }
              ) }),
              /* @__PURE__ */ e.jsx("div", { className: "flex border-b border-gray-200 pt-4", children: ["components", "properties", "page"].map(
                (f) => /* @__PURE__ */ e.jsx(
                  "button",
                  {
                    className: `flex-1 py-3 px-4 text-sm font-medium capitalize transition-colors ${R === f ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`,
                    onClick: () => F(f),
                    children: f
                  },
                  f
                )
              ) }),
              /* @__PURE__ */ e.jsxs("div", { className: "flex-1 overflow-y-auto pb-4", children: [
                /* @__PURE__ */ e.jsx("div", { style: { display: R === "components" ? "block" : "none" }, children: /* @__PURE__ */ e.jsx(
                  er,
                  {
                    componentMapProvider: o,
                    onDragStart: Be
                  }
                ) }),
                /* @__PURE__ */ e.jsx("div", { style: { display: R === "properties" ? "block" : "none" }, children: /* @__PURE__ */ e.jsx(
                  Xt,
                  {
                    onFileUpload: p,
                    onApiCall: y,
                    onCustomAction: u,
                    onGetSelectOptions: m
                  }
                ) }),
                /* @__PURE__ */ e.jsx("div", { style: { display: R === "page" ? "block" : "none" }, children: /* @__PURE__ */ e.jsx(
                  tr,
                  {
                    onFileUpload: p,
                    onGetTags: g
                  }
                ) })
              ] })
            ]
          }
        )
      ] })
    ] }),
    b === "edit" && B && !d && /* @__PURE__ */ e.jsx("div", { className: "fixed bottom-4 right-4 z-30", children: /* @__PURE__ */ e.jsx(
      "button",
      {
        onClick: () => E(!0),
        className: "p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors",
        children: /* @__PURE__ */ e.jsx(be, { className: "h-6 w-6" })
      }
    ) }),
    b === "preview" && /* @__PURE__ */ e.jsx("div", { className: "fixed inset-0 pointer-events-none z-50", children: /* @__PURE__ */ e.jsx("div", { className: "absolute bottom-8 right-8 pointer-events-auto", children: /* @__PURE__ */ e.jsxs(
      "button",
      {
        onClick: () => N("edit"),
        className: "flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 group",
        title: "Return to Edit Mode",
        children: [
          /* @__PURE__ */ e.jsx(he, { className: "h-6 w-6 group-hover:animate-bounce" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-sm font-medium", children: "Edit Mode" })
        ]
      }
    ) }) }),
    b === "view" && /* @__PURE__ */ e.jsx("div", { className: "fixed inset-0 pointer-events-none z-50", children: /* @__PURE__ */ e.jsx("div", { className: "absolute bottom-8 right-8 pointer-events-auto", children: /* @__PURE__ */ e.jsxs(
      "button",
      {
        onClick: i,
        className: "flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 group",
        title: "Back to List",
        children: [
          /* @__PURE__ */ e.jsx(he, { className: "h-6 w-6 group-hover:animate-bounce" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-sm font-medium", children: "Back to List" })
        ]
      }
    ) }) }),
    /* @__PURE__ */ e.jsx(
      Zt,
      {
        isOpen: Ae,
        pageInfo: Je(),
        resetOpenInfo: de
      }
    )
  ] }) }, Te);
}, dr = (t) => /* @__PURE__ */ e.jsx(sr, { defaultLocale: "ja-JP", children: /* @__PURE__ */ e.jsx(qt, { children: /* @__PURE__ */ e.jsx(or, { ...t }) }) });
export {
  it as GridStackProvider,
  St as GridStackRender,
  yt as GridStackRenderProvider,
  dr as StackPage,
  Y as useGridStackContext,
  cr as useGridStackWidgetContext
};
//# sourceMappingURL=stackpage.es.js.map
