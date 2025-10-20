import * as l from "react";
import Xe, { createContext as F, useContext as re, useState as f, useCallback as C, useRef as B, useLayoutEffect as me, useMemo as Qe, useEffect as z, forwardRef as et, useImperativeHandle as tt } from "react";
import { GridStack as _ } from "gridstack";
import { createPortal as rt } from "react-dom";
function nt(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var ye = { exports: {} }, H = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var st = Xe, ot = Symbol.for("react.element"), at = Symbol.for("react.fragment"), it = Object.prototype.hasOwnProperty, lt = st.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, ct = { key: !0, ref: !0, __self: !0, __source: !0 };
function je(t, r, n) {
  var s, o = {}, d = null, c = null;
  n !== void 0 && (d = "" + n), r.key !== void 0 && (d = "" + r.key), r.ref !== void 0 && (c = r.ref);
  for (s in r) it.call(r, s) && !ct.hasOwnProperty(s) && (o[s] = r[s]);
  if (t && t.defaultProps) for (s in r = t.defaultProps, r) o[s] === void 0 && (o[s] = r[s]);
  return { $$typeof: ot, type: t, key: d, ref: c, props: o, _owner: lt.current };
}
H.Fragment = at;
H.jsx = je;
H.jsxs = je;
ye.exports = H;
var e = ye.exports;
const ke = F(null);
function $() {
  const t = re(ke);
  if (!t)
    throw new Error(
      "useGridStackContext must be used within a GridStackProvider"
    );
  return t;
}
function dt({
  children: t,
  initialOptions: r
}) {
  const [n, s] = f(null), [o, d] = f(() => {
    var j;
    const i = /* @__PURE__ */ new Map(), m = (x) => {
      var v;
      x.id && x.content && i.set(x.id, x), (v = x.subGridOpts) != null && v.children && x.subGridOpts.children.forEach((b) => {
        m(b);
      });
    };
    return (j = r.children) == null || j.forEach((x) => {
      m(x);
    }), i;
  }), c = C(
    (i) => {
      const m = `widget-${Math.random().toString(36).substring(2, 15)}`, j = i(m);
      n == null || n.addWidget({ ...j, id: m }), d((x) => {
        const v = new Map(x);
        return v.set(m, j), v;
      });
    },
    [n]
  ), g = C(
    (i) => {
      const m = `sub-grid-${Math.random().toString(36).substring(2, 15)}`, j = /* @__PURE__ */ new Map(), x = i(m, (v) => {
        const b = `widget-${Math.random().toString(36).substring(2, 15)}`;
        return j.set(b, v), { ...v, id: b };
      });
      n == null || n.addWidget({ ...x, id: m }), d((v) => {
        const b = new Map(v);
        return j.forEach((M, W) => {
          b.set(W, M);
        }), b;
      });
    },
    [n]
  ), u = C(
    (i) => {
      n == null || n.removeWidget(i), d((m) => {
        const j = new Map(m);
        return j.delete(i), j;
      });
    },
    [n]
  ), h = C(() => n == null ? void 0 : n.save(!0, !0, (i, m) => m), [n]);
  return /* @__PURE__ */ e.jsx(
    ke.Provider,
    {
      value: {
        initialOptions: r,
        gridStack: n,
        addWidget: c,
        removeWidget: u,
        addSubGrid: g,
        saveOptions: h,
        _gridStack: {
          value: n,
          set: s
        },
        _rawWidgetMetaMap: {
          value: o,
          set: d
        }
      },
      children: t
    }
  );
}
const Ne = F(null);
function ut() {
  const t = re(Ne);
  if (!t)
    throw new Error(
      "useGridStackRenderContext must be used within a GridStackProvider"
    );
  return t;
}
var mt = typeof Element < "u", gt = typeof Map == "function", ht = typeof Set == "function", pt = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
function I(t, r) {
  if (t === r) return !0;
  if (t && r && typeof t == "object" && typeof r == "object") {
    if (t.constructor !== r.constructor) return !1;
    var n, s, o;
    if (Array.isArray(t)) {
      if (n = t.length, n != r.length) return !1;
      for (s = n; s-- !== 0; )
        if (!I(t[s], r[s])) return !1;
      return !0;
    }
    var d;
    if (gt && t instanceof Map && r instanceof Map) {
      if (t.size !== r.size) return !1;
      for (d = t.entries(); !(s = d.next()).done; )
        if (!r.has(s.value[0])) return !1;
      for (d = t.entries(); !(s = d.next()).done; )
        if (!I(s.value[1], r.get(s.value[0]))) return !1;
      return !0;
    }
    if (ht && t instanceof Set && r instanceof Set) {
      if (t.size !== r.size) return !1;
      for (d = t.entries(); !(s = d.next()).done; )
        if (!r.has(s.value[0])) return !1;
      return !0;
    }
    if (pt && ArrayBuffer.isView(t) && ArrayBuffer.isView(r)) {
      if (n = t.length, n != r.length) return !1;
      for (s = n; s-- !== 0; )
        if (t[s] !== r[s]) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
    if (t.valueOf !== Object.prototype.valueOf && typeof t.valueOf == "function" && typeof r.valueOf == "function") return t.valueOf() === r.valueOf();
    if (t.toString !== Object.prototype.toString && typeof t.toString == "function" && typeof r.toString == "function") return t.toString() === r.toString();
    if (o = Object.keys(t), n = o.length, n !== Object.keys(r).length) return !1;
    for (s = n; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, o[s])) return !1;
    if (mt && t instanceof Element) return !1;
    for (s = n; s-- !== 0; )
      if (!((o[s] === "_owner" || o[s] === "__v" || o[s] === "__o") && t.$$typeof) && !I(t[o[s]], r[o[s]]))
        return !1;
    return !0;
  }
  return t !== t && r !== r;
}
var ft = function(r, n) {
  try {
    return I(r, n);
  } catch (s) {
    if ((s.message || "").match(/stack|recursion/i))
      return console.warn("react-fast-compare cannot handle circular refs"), !1;
    throw s;
  }
};
const xt = /* @__PURE__ */ nt(ft), y = [];
for (let t = 0; t < 256; ++t)
  y.push((t + 256).toString(16).slice(1));
function bt(t, r = 0) {
  return (y[t[r + 0]] + y[t[r + 1]] + y[t[r + 2]] + y[t[r + 3]] + "-" + y[t[r + 4]] + y[t[r + 5]] + "-" + y[t[r + 6]] + y[t[r + 7]] + "-" + y[t[r + 8]] + y[t[r + 9]] + "-" + y[t[r + 10]] + y[t[r + 11]] + y[t[r + 12]] + y[t[r + 13]] + y[t[r + 14]] + y[t[r + 15]]).toLowerCase();
}
let Y;
const vt = new Uint8Array(16);
function wt() {
  if (!Y) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    Y = crypto.getRandomValues.bind(crypto);
  }
  return Y(vt);
}
const yt = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), ge = { randomUUID: yt };
function Ce(t, r, n) {
  var o;
  if (ge.randomUUID && !t)
    return ge.randomUUID();
  t = t || {};
  const s = t.random ?? ((o = t.rng) == null ? void 0 : o.call(t)) ?? wt();
  if (s.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return s[6] = s[6] & 15 | 64, s[8] = s[8] & 63 | 128, bt(s);
}
const jt = _.prototype.resizeToContent;
_.prototype.resizeToContent = function(t) {
  const r = t.querySelector(".grid-stack-item-content");
  if (r != null && r.firstElementChild)
    return jt.call(this, t);
};
function kt({
  children: t,
  onGridStackDropEvent: r
}) {
  const {
    _gridStack: { value: n, set: s },
    initialOptions: o
  } = $(), d = B(/* @__PURE__ */ new Map()), c = B(null), g = B(o), u = C(
    (i, m) => {
      m.id && d.current.set(m.id, i);
    },
    []
  ), h = C(() => {
    if (c.current) {
      _.renderCB = u;
      const i = _.init(g.current, c.current);
      return _.setupDragIn(
        ".grid-stack-item-widget",
        {
          appendTo: "body",
          helper: "clone",
          scroll: !1
        }
      ), i.on("dropped", function(m, j, x) {
        if (console.log("dropped....", x), x) {
          const v = x.el, b = v.dataset.gsType;
          if (b && r) {
            const M = {
              name: b,
              id: Ce(),
              x: x.x || 0,
              y: x.y || 0,
              w: b === "SubGrid" ? 12 : 4,
              // SubGrid takes full width
              h: b === "SubGrid" ? 6 : 4
              // SubGrid is taller              
            };
            r(M), i.removeWidget(v, !0);
          }
        }
      }), i;
    }
    return null;
  }, [u, r]);
  return me(() => {
    if (!xt(o, g.current) && n)
      try {
        n.removeAll(!1), n.destroy(!1), d.current.clear(), g.current = o, s(h());
      } catch (i) {
        console.error("Error reinitializing gridstack", i);
      }
  }, [o, n, h, s]), me(() => {
    if (!n)
      try {
        s(h());
      } catch (i) {
        console.error("Error initializing gridstack", i);
      }
  }, [n, h, s]), /* @__PURE__ */ e.jsx(
    Ne.Provider,
    {
      value: Qe(
        () => ({
          getWidgetContainer: (i) => d.current.get(i) || null
        }),
        // ! gridStack is required to reinitialize the grid when the options change
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [n]
      ),
      children: /* @__PURE__ */ e.jsx("div", { ref: c, children: n ? t : null })
    }
  );
}
const Se = F(null);
function sr() {
  const t = re(Se);
  if (!t)
    throw new Error(
      "useGridStackWidgetContext must be used within a GridStackWidgetProvider"
    );
  return t;
}
function Nt({
  widgetId: t
}) {
  const { removeWidget: r } = $(), [n, s] = l.useState(!1), [o, d] = l.useState({ top: 0, left: 0 }), c = l.useRef(null), g = (i) => {
    if (i.stopPropagation(), c.current) {
      const m = c.current.getBoundingClientRect();
      d({
        top: m.bottom + window.scrollY,
        left: m.left + window.scrollX
      });
    }
    s(!n);
  }, u = () => {
    s(!1);
  }, h = () => {
    var m;
    r(t);
    const i = document.querySelector(`[gs-id="${t}"]`);
    i && ((m = i.gridstackNode) != null && m.grid) && i.gridstackNode.grid.removeWidget(i, !0, !0), u();
  };
  return l.useEffect(() => {
    const i = (m) => {
      n && s(!1);
    };
    return document.addEventListener("click", i), () => {
      document.removeEventListener("click", i);
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
        ref: c,
        onClick: g,
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
          top: `${o.top}px`,
          left: `${o.left}px`,
          transform: "translateX(-100%)"
        },
        onClick: (i) => i.stopPropagation(),
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
function Ct({ widgetId: t, children: r }) {
  const n = B(null);
  return z(() => {
    var g;
    const s = n.current;
    if (!s) return;
    const o = s.closest(".grid-stack-item");
    if (!o || !((g = o.gridstackNode) != null && g.grid)) return;
    const d = () => {
      var h, i;
      const u = o.querySelector(".grid-stack-item-content");
      u != null && u.firstElementChild && o.gridstackNode && o.gridstackNode.grid && ((i = (h = o.gridstackNode) == null ? void 0 : h.grid) == null || i.resizeToContent(o));
    }, c = new ResizeObserver(() => d());
    return c.observe(s), d(), () => c.disconnect();
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
function St(t) {
  let r = null, n = "", s = {};
  try {
    if (t.content) {
      const o = JSON.parse(t.content);
      n = o.name, s = o.props;
    }
  } catch (o) {
    r = o;
  }
  return { name: n, props: s, error: r };
}
function Et({
  id: t,
  meta: r,
  WidgetComponent: n,
  widgetContainer: s,
  showMenubar: o,
  isSelected: d = !1,
  onWidgetSelect: c
}) {
  var m;
  const g = St(r), u = ((m = g.props) == null ? void 0 : m.title) || `Widget ${t.slice(0, 4)}`, h = (j) => {
    c && c({
      id: t,
      name: g.name,
      props: g.props
    });
  }, i = /* @__PURE__ */ e.jsx(Ct, { widgetId: t, children: /* @__PURE__ */ e.jsxs(
    "div",
    {
      className: `h-full w-full ${d ? "outline outline-2 outline-blue-400 outline-offset-1" : ""}`,
      onClick: h,
      children: [
        o && /* @__PURE__ */ e.jsxs("div", { className: "widget-header flex items-center justify-between bg-gray-100 border-b px-2 min-h-[36px]", children: [
          /* @__PURE__ */ e.jsx("div", { className: "font-medium truncate text-sm px-1", children: u }),
          /* @__PURE__ */ e.jsx(Nt, { widgetId: t })
        ] }),
        /* @__PURE__ */ e.jsx(
          "div",
          {
            className: "widget-body flex-1 min-h-[40px] cursor-pointer",
            children: /* @__PURE__ */ e.jsx(n, { ...g.props })
          }
        )
      ]
    }
  ) });
  return /* @__PURE__ */ e.jsx(Se.Provider, { value: { widget: { id: t } }, children: rt(i, s) });
}
function Mt(t) {
  let r = null, n = "", s = {};
  try {
    if (t.content) {
      const o = JSON.parse(t.content);
      n = o.name, s = o.props;
    }
  } catch (o) {
    r = o;
  }
  return { name: n, props: s, error: r };
}
function Lt({
  componentMap: t,
  showMenubar: r = !1,
  selectedWidgetId: n,
  onWidgetSelect: s
}) {
  const { _rawWidgetMetaMap: o } = $(), { getWidgetContainer: d } = ut();
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    Array.from(o.value.entries()).length === 0 && /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 p-8 text-center", children: [
      /* @__PURE__ */ e.jsx("div", { className: "text-4xl mb-4", children: "📦" }),
      /* @__PURE__ */ e.jsx("h3", { className: "text-lg font-medium mb-2", children: "Drag Components Here" }),
      /* @__PURE__ */ e.jsx("p", { className: "text-sm", children: "Drag components from the Components tab in the right panel to start building your layout" })
    ] }),
    Array.from(o.value.entries()).map(([c, g]) => {
      const { name: u } = Mt(g), h = t[u], i = d(c);
      return !h || !i ? null : /* @__PURE__ */ e.jsx(
        Et,
        {
          id: c,
          meta: g,
          WidgetComponent: h,
          widgetContainer: i,
          showMenubar: r,
          isSelected: c === n,
          onWidgetSelect: s
        },
        c
      );
    })
  ] });
}
function Rt({
  title: t,
  titleId: r,
  ...n
}, s) {
  return /* @__PURE__ */ l.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: s,
    "aria-labelledby": r
  }, n), t ? /* @__PURE__ */ l.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ l.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const he = /* @__PURE__ */ l.forwardRef(Rt);
function Wt({
  title: t,
  titleId: r,
  ...n
}, s) {
  return /* @__PURE__ */ l.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: s,
    "aria-labelledby": r
  }, n), t ? /* @__PURE__ */ l.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ l.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
  }));
}
const Ot = /* @__PURE__ */ l.forwardRef(Wt);
function Tt({
  title: t,
  titleId: r,
  ...n
}, s) {
  return /* @__PURE__ */ l.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: s,
    "aria-labelledby": r
  }, n), t ? /* @__PURE__ */ l.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ l.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
  }));
}
const Ee = /* @__PURE__ */ l.forwardRef(Tt);
function Pt({
  title: t,
  titleId: r,
  ...n
}, s) {
  return /* @__PURE__ */ l.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: s,
    "aria-labelledby": r
  }, n), t ? /* @__PURE__ */ l.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ l.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 19.5 8.25 12l7.5-7.5"
  }));
}
const pe = /* @__PURE__ */ l.forwardRef(Pt);
function Dt({
  title: t,
  titleId: r,
  ...n
}, s) {
  return /* @__PURE__ */ l.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: s,
    "aria-labelledby": r
  }, n), t ? /* @__PURE__ */ l.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ l.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m8.25 4.5 7.5 7.5-7.5 7.5"
  }));
}
const fe = /* @__PURE__ */ l.forwardRef(Dt);
function zt({
  title: t,
  titleId: r,
  ...n
}, s) {
  return /* @__PURE__ */ l.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: s,
    "aria-labelledby": r
  }, n), t ? /* @__PURE__ */ l.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ l.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
  }));
}
const Gt = /* @__PURE__ */ l.forwardRef(zt);
function Bt({
  title: t,
  titleId: r,
  ...n
}, s) {
  return /* @__PURE__ */ l.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: s,
    "aria-labelledby": r
  }, n), t ? /* @__PURE__ */ l.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ l.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
  }), /* @__PURE__ */ l.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
  }));
}
const _t = /* @__PURE__ */ l.forwardRef(Bt);
function $t({
  title: t,
  titleId: r,
  ...n
}, s) {
  return /* @__PURE__ */ l.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: s,
    "aria-labelledby": r
  }, n), t ? /* @__PURE__ */ l.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ l.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
  }));
}
const At = /* @__PURE__ */ l.forwardRef($t);
function It({
  title: t,
  titleId: r,
  ...n
}, s) {
  return /* @__PURE__ */ l.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: s,
    "aria-labelledby": r
  }, n), t ? /* @__PURE__ */ l.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ l.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
  }));
}
const Ft = /* @__PURE__ */ l.forwardRef(It);
function Ht({
  title: t,
  titleId: r,
  ...n
}, s) {
  return /* @__PURE__ */ l.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: s,
    "aria-labelledby": r
  }, n), t ? /* @__PURE__ */ l.createElement("title", {
    id: r
  }, t) : null, /* @__PURE__ */ l.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
  }));
}
const Ut = /* @__PURE__ */ l.forwardRef(Ht);
function Vt({ content: t }) {
  return /* @__PURE__ */ e.jsx("div", { className: "flex items-start p-2 bg-white border rounded shadow-sm text-left", children: /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx("p", { className: "text-sm", children: t }) }) });
}
const Q = "1rem", ee = [
  //{ c: 1, w: 300 },   // 1 column on screens < 300px
  { c: 1, w: 500 },
  // 2 columns between 300px - 500px
  { c: 3, w: 800 },
  // 4 columns between 500px - 800px
  { c: 6, w: 1024 }
  // 6 columns between 800px - 1024px
  //{ c: 8, w: 1200 },  // 8 columns on screens > 1200px
], te = {
  acceptWidgets: !0,
  removable: "#trash",
  sizeToContent: !0,
  resizable: { handles: "se" },
  minRow: 10,
  columnOpts: {
    breakpointForWindow: !0,
    breakpoints: ee,
    layout: "moveScale",
    columnMax: 12
  },
  margin: 5,
  cellHeight: Q,
  subGridOpts: {
    acceptWidgets: !0,
    removable: "#trash",
    resizable: { handles: "se" },
    sizeToContent: !0,
    columnOpts: {
      breakpoints: ee,
      layout: "moveScale"
    },
    margin: 5,
    minRow: 1,
    cellHeight: Q
  },
  children: []
}, Zt = {
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
      breakpoints: ee,
      layout: "moveScale"
    },
    margin: 5,
    minRow: 6,
    cellHeight: Q,
    children: []
  },
  children: []
}, X = () => ({
  id: `${Ce()}`,
  title: "untitled page",
  grids: te
}), xe = {
  Text: {
    content: "Any content other than text are what we call cards. Cards can be accessed by clicking the ➕ button or typing / at the beginning of a paragraph.\nEven better, continue typing to find the card you're looking for, hit enter, and avoid dragging your mouse altogether.\nSome cards have a handy little shortcut, to keep you on track and in flow. Use --- to divide your paragraphs with a line, or ``` to add a code block. You can also drag and drop images directly into the editor to bypass the menu. \nAny content other than text are what we call cards. Cards can be accessed by clicking the ➕ button or typing / at the beginning of a paragraph.",
    title: "This is text card"
  }
}, be = {
  Text: Vt
}, ve = (t) => {
  if (t) {
    const r = t();
    return { ...be, ...r };
  }
  return be;
}, qt = (t) => {
  if (t) {
    const r = t();
    return { ...xe, ...r };
  }
  return xe;
}, Jt = et((t, r) => {
  const { addWidget: n, addSubGrid: s, saveOptions: o, _rawWidgetMetaMap: d } = $();
  return tt(r, () => ({
    saveLayout: () => o(),
    addWidget: n,
    addSubGrid: s,
    rawWidgetMetaMap: d
  })), null;
});
function Kt({ pageInfo: t }) {
  const [r, n] = f(void 0);
  return z(() => {
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
function Yt({
  isOpen: t,
  pageInfo: r,
  resetOpenInfo: n
}) {
  const [s, o] = l.useState(!1);
  l.useEffect(() => {
  }, [t, r]);
  const d = () => {
    n(!1);
  }, c = () => {
    var u;
    navigator.clipboard.writeText(
      ((u = document.getElementById("pageinfo")) == null ? void 0 : u.innerText) || ""
    ), o(!0), setTimeout(() => {
      o(!1);
    }, 3e3);
  }, g = (u) => {
    u.target === u.currentTarget && d();
  };
  return t ? /* @__PURE__ */ e.jsx(
    "div",
    {
      className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
      onClick: g,
      children: /* @__PURE__ */ e.jsxs("div", { className: "bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between p-4 border-b flex-shrink-0", children: [
          /* @__PURE__ */ e.jsx("h2", { className: "text-lg font-semibold truncate mr-2", children: "Page Information" }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center space-x-1 flex-shrink-0", children: [
            /* @__PURE__ */ e.jsxs(
              "button",
              {
                onClick: c,
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
                onClick: d,
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
        /* @__PURE__ */ e.jsx("div", { className: "p-4 overflow-y-auto flex-1", children: /* @__PURE__ */ e.jsx(Kt, { pageInfo: r }) }),
        /* @__PURE__ */ e.jsx("div", { className: "flex justify-end p-4 border-t flex-shrink-0", children: /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: d,
            className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors w-full sm:w-auto",
            autoFocus: !0,
            children: "Close"
          }
        ) })
      ] })
    }
  ) : null;
}
function Xt({ onDropDelete: t }) {
  const { removeWidget: r } = $(), n = C((c) => {
    var u;
    c.preventDefault();
    const g = c.dataTransfer.getData("text/plain");
    if (g) {
      const h = document.querySelector(`[gs-id="${g}"]`);
      h && ((u = h.gridstackNode) != null && u.grid) && h.gridstackNode.grid.removeWidget(h, !0, !0), r(g);
    }
    t();
  }, [t, r]), s = (c) => {
    c.preventDefault(), c.dataTransfer.dropEffect = "move";
  }, o = (c) => {
    c.preventDefault(), c.currentTarget.classList.add("bg-red-200", "border-red-400");
  }, d = (c) => {
    c.preventDefault(), c.currentTarget.classList.remove("bg-red-200", "border-red-400");
  };
  return /* @__PURE__ */ e.jsx(
    "div",
    {
      id: "trash",
      onDrop: n,
      onDragOver: s,
      onDragEnter: o,
      onDragLeave: d,
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
const Qt = F(
  void 0
);
function G({
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
function we({
  onClick: t,
  icon: r,
  label: n,
  className: s = "",
  successMessage: o = "Success",
  errorMessage: d = "Error"
}) {
  const [c, g] = f(null), [u, h] = f(!1), i = async () => {
    h(!0), g(null);
    try {
      await t(), g({ message: o, type: "success" });
    } catch {
      g({ message: d, type: "error" });
    } finally {
      h(!1), setTimeout(() => g(null), 3e3);
    }
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "relative z-30", children: [
    /* @__PURE__ */ e.jsx(
      "button",
      {
        onClick: i,
        disabled: u,
        className: `p-2 rounded-lg transition flex items-center ${s} ${u ? "opacity-70" : ""}`,
        children: u ? /* @__PURE__ */ e.jsx(Ee, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          r,
          /* @__PURE__ */ e.jsx("span", { className: "ml-1 hidden sm:inline", children: n })
        ] })
      }
    ),
    c && /* @__PURE__ */ e.jsx(
      "div",
      {
        className: `absolute top-full left-0 mt-1 w-full text-center px-2 py-1 rounded-md text-xs font-medium animate-fadeIn ${c.type === "success" ? "bg-blue-500 text-white" : "bg-red-100 text-red-800"}`,
        children: c.message
      }
    )
  ] });
}
const er = () => {
  const [t, r] = f(!1);
  return z(() => {
    const n = () => {
      r(window.innerWidth <= 768);
    };
    return n(), window.addEventListener("resize", n), () => {
      window.removeEventListener("resize", n);
    };
  }, []), t;
}, or = ({
  pageid: t,
  pageMode: r,
  onSaveLayout: n,
  onLoadLayout: s,
  componentMapProvider: o,
  componentPropsProvider: d,
  gobackList: c,
  children: g
}) => {
  const [u, h] = f(
    r
  ), [i, m] = f(!0), [
    j
    /*setPanelWidth*/
  ] = f(400), [x, v] = f(!1), [b, M] = f("components"), [W, Me] = f({
    ...X(),
    id: t
  }), [Le, Re] = f(), [U, V] = f(), [We, ne] = f(0), [Oe, se] = f(te), O = B(null), [T, Te] = f(), [Pe, oe] = f(!1), [Z, De] = f(!0), [q, L] = f(
    null
  ), [w, S] = f(null), [k, ae] = f({
    margin: "5",
    padding: "10px",
    background: "#ffffff"
  }), D = er();
  z(() => {
    h(r);
  }, [r]);
  const ie = C(
    async (a) => {
      const p = await s(a) || X();
      return Me(p), Re(p.title), V(p.title), p.grids;
    },
    [s]
  ), J = C(async () => {
    if (t) {
      const a = await ie(t);
      se(a), ne((p) => p + 1), le(), console.log(`reload layout: pageid ${t}, props id ${W == null ? void 0 : W.id}`);
    }
  }, [t, ie]);
  z(() => {
    (async () => {
      if (t)
        try {
          await J();
        } catch (p) {
          console.error("Failed to load layout:", p);
        }
    })();
  }, [t, J]);
  const ze = () => {
    c && c();
  }, Ge = async () => {
    var a;
    if (n) {
      const p = (a = O.current) == null ? void 0 : a.saveLayout();
      if (p) {
        const P = {
          ...W || X(),
          grids: p,
          title: U
        };
        console.log(
          `Saving layout: pageid ${t}, props id ${P.id}`
        ), await n(t, P);
      }
    }
  }, le = () => {
    L(null), S(null);
  }, Be = () => {
    confirm("Are you sure you want to clear all data? This cannot be undone.") && (se(te), ne((a) => a + 1), le());
  }, _e = () => {
    v(!0);
  }, ce = () => {
    v(!1);
  }, $e = (a) => {
    a.key === "Enter" ? ce() : a.key === "Escape" && (V(Le), v(!1));
  }, de = (a, p) => {
    a.dataTransfer.setData("text/plain", p), a.dataTransfer.effectAllowed = "copy";
  }, Ae = (a) => {
    Te(a);
  }, Ie = ve(o), Fe = C(
    (a) => {
      const p = {
        id: a.id,
        type: a.name,
        props: a.props
      };
      S(p), L(a.name), M("properties");
    },
    [S, L, M]
  ), A = (a, p) => {
    const P = {
      ...k,
      [a]: p
    };
    ae(P);
  }, He = {
    selectedComponent: q,
    setSelectedComponent: L,
    selectedInstance: w,
    setSelectedInstance: S,
    pageAttributes: k,
    setPageAttributes: ae,
    activeTab: b,
    setActiveTab: M
  }, Ue = D ? { width: "100vw", minWidth: "100vw", height: "100vh" } : { width: `${j}px`, minWidth: "300px", height: "100%" }, Ve = {
    margin: k.margin,
    padding: k.padding,
    backgroundColor: k.background
  }, Ze = () => {
    var p;
    const a = JSON.parse(JSON.stringify(W));
    return a.grids = (p = O.current) == null ? void 0 : p.saveLayout(), a;
  };
  z(() => {
    T && O.current && (T.name !== "SubGrid" ? O.current.addWidget((a) => ({
      ...T,
      sizeToContent: !0,
      // Ensure the widget is sized to its content
      content: JSON.stringify({
        name: T.name,
        props: qt(d)[T.name]
      })
    })) : O.current.addSubGrid((a) => ({
      ...T,
      ...Zt
    })));
  }, [T, d]);
  const qe = () => /* @__PURE__ */ e.jsxs("div", { className: "p-4 space-y-4", children: [
    /* @__PURE__ */ e.jsx("h3", { className: "text-lg font-medium mb-3", children: "Components" }),
    /* @__PURE__ */ e.jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Drag components to the main area or click to select them" }),
    /* @__PURE__ */ e.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ e.jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Delete Zone" }),
      /* @__PURE__ */ e.jsx(
        Xt,
        {
          onDropDelete: () => {
            console.log("Component deleted via drop zone"), L(null), S(null);
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
        onDragStart: (a) => de(a, "SubGrid"),
        onDragEnd: () => console.log("====SubGrid drag event end...."),
        onClick: () => {
          L("SubGrid"), S(null);
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
    /* @__PURE__ */ e.jsx("div", { className: "grid grid-cols-2 gap-3", children: Object.entries(Ie).map(([
      a
      /*Component*/
    ]) => /* @__PURE__ */ e.jsx(
      "div",
      {
        "gs-type": a,
        "data-gs-type": a,
        className: "grid-stack-item grid-stack-item-widget",
        draggable: "true",
        onDragStart: (p) => de(p, a),
        onDragEnd: () => console.log("====drag event end...."),
        onClick: () => {
          L(a), S(null);
        },
        children: /* @__PURE__ */ e.jsxs("div", { className: "p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm hover:bg-gray-100 cursor-pointer transition-all duration-200 hover:shadow-md text-center", children: [
          /* @__PURE__ */ e.jsx("div", { className: "font-medium text-gray-800 mb-2", children: a }),
          /* @__PURE__ */ e.jsx("div", { className: "text-xs text-gray-500", children: "Drag to main area" })
        ] })
      },
      a
    )) })
  ] }), Je = () => {
    var ue;
    const a = (ue = O.current) == null ? void 0 : ue.rawWidgetMetaMap;
    if (!w && !q)
      return /* @__PURE__ */ e.jsxs("div", { className: "p-4 text-center text-gray-500", children: [
        /* @__PURE__ */ e.jsx("div", { className: "mb-2", children: "👈" }),
        /* @__PURE__ */ e.jsx("p", { children: "Select a component from the Components tab or click on a placed component to edit its properties" })
      ] });
    const p = (w == null ? void 0 : w.type) || q, P = (w == null ? void 0 : w.props) || {}, K = (E, R) => {
      if (w && (S(
        (N) => N ? { ...N, props: { ...N.props, [E]: R } } : null
      ), a.value.has(w.id))) {
        const N = { ...P, [E]: R }, Ye = JSON.stringify({
          name: p,
          props: N
        });
        console.log("Update widget:", w.id, Ye);
      }
    };
    return /* @__PURE__ */ e.jsxs("div", { className: "p-4 space-y-4", children: [
      /* @__PURE__ */ e.jsxs("h3", { className: "text-lg font-medium mb-3", children: [
        "Properties - ",
        p,
        w && /* @__PURE__ */ e.jsxs("span", { className: "text-sm text-gray-500 ml-2", children: [
          "(ID: ",
          w.id,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "space-y-4", children: Object.entries(P).map(([E, R]) => /* @__PURE__ */ e.jsxs(
        "div",
        {
          className: "border-b border-gray-100 pb-3 last:border-b-0",
          children: [
            /* @__PURE__ */ e.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2 capitalize", children: E.replace(/([A-Z])/g, " $1").trim() }),
            typeof R == "boolean" ? /* @__PURE__ */ e.jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ e.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: R,
                  onChange: (N) => K(E, N.target.checked),
                  className: "w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                }
              ),
              /* @__PURE__ */ e.jsx("span", { className: "ml-2 text-sm text-gray-600", children: "Enabled" })
            ] }) : typeof R == "number" ? /* @__PURE__ */ e.jsx(
              "input",
              {
                type: "number",
                value: R,
                onChange: (N) => K(E, Number(N.target.value)),
                className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              }
            ) : /* @__PURE__ */ e.jsx(
              "input",
              {
                type: "text",
                value: R,
                onChange: (N) => K(E, N.target.value),
                className: "w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                placeholder: `Enter ${E}`
              }
            )
          ]
        },
        E
      )) }),
      w && /* @__PURE__ */ e.jsxs("div", { className: "mt-6 pt-4 border-t", children: [
        /* @__PURE__ */ e.jsx("p", { className: "text-sm text-gray-600 mb-3", children: "This is a GridStack widget. Property changes will update the widget in real-time." }),
        /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: () => {
              S(null), L(null);
            },
            className: "w-full py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors font-medium",
            children: "Clear Selection"
          }
        )
      ] })
    ] });
  }, Ke = () => /* @__PURE__ */ e.jsxs("div", { className: "p-4 space-y-4", children: [
    /* @__PURE__ */ e.jsx("h3", { className: "text-lg font-medium mb-3", children: "Page Settings" }),
    /* @__PURE__ */ e.jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Configure the overall page layout and appearance" }),
    /* @__PURE__ */ e.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ e.jsx("div", { className: "border-b border-gray-100 pb-4", children: /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Show Component Menu" }),
          /* @__PURE__ */ e.jsx("p", { className: "text-xs text-gray-500", children: "Display the menu bar with delete button on each component" })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ e.jsx(
          "input",
          {
            type: "checkbox",
            checked: Z,
            onChange: (a) => De(a.target.checked),
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
            value: k.margin,
            onChange: (a) => A("margin", a.target.value),
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
            onChange: (a) => A("padding", a.target.value),
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
              onChange: (a) => A("background", a.target.value),
              className: "w-12 h-12 border border-gray-300 rounded cursor-pointer"
            }
          ),
          /* @__PURE__ */ e.jsx(
            "input",
            {
              type: "text",
              value: k.background,
              onChange: (a) => A("background", a.target.value),
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
          "Menu Bar: ",
          /* @__PURE__ */ e.jsx("code", { children: Z ? "Visible" : "Hidden" })
        ] }),
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
        ] })
      ] })
    ] })
  ] });
  return /* @__PURE__ */ e.jsx(dt, { initialOptions: Oe, children: /* @__PURE__ */ e.jsx(Qt.Provider, { value: He, children: /* @__PURE__ */ e.jsxs("div", { className: "min-h-screen bg-white text-black flex flex-col", children: [
    u === "edit" && /* @__PURE__ */ e.jsx("header", { className: "p-4 bg-white shadow relative", children: /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ e.jsx("div", { className: "flex-1 mb-3 sm:mb-0 min-w-0", children: /* @__PURE__ */ e.jsx("div", { className: "flex items-center gap-2", children: x ? /* @__PURE__ */ e.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ e.jsx(
        "input",
        {
          type: "text",
          value: U,
          onChange: (a) => V(a.target.value),
          onKeyDown: $e,
          onBlur: ce,
          className: "text-2xl font-bold border-b-2 border-blue-500 bg-transparent outline-none px-1",
          autoFocus: !0
        }
      ) }) : /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 group", children: [
        /* @__PURE__ */ e.jsx("h1", { className: "text-2xl font-bold truncate", children: U }),
        /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: _e,
            className: "p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity",
            children: /* @__PURE__ */ e.jsx(Ft, { className: "h-4 w-4" })
          }
        )
      ] }) }) }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex flex-wrap gap-1 justify-end", children: [
        /* @__PURE__ */ e.jsx(
          G,
          {
            onClick: ze,
            icon: /* @__PURE__ */ e.jsx(Ot, { className: "h-5 w-5" }),
            tooltip: "Back to list",
            className: "bg-gray-200 hover:bg-gray-300"
          }
        ),
        /* @__PURE__ */ e.jsx(
          G,
          {
            onClick: () => h("preview"),
            icon: /* @__PURE__ */ e.jsx(_t, { className: "h-5 w-5" }),
            tooltip: "Preview",
            className: "bg-purple-600 hover:bg-purple-700 text-white"
          }
        ),
        /* @__PURE__ */ e.jsx(
          we,
          {
            onClick: Ge,
            icon: /* @__PURE__ */ e.jsx(Gt, { className: "h-5 w-5" }),
            label: "Save",
            className: "bg-green-600 hover:bg-green-700 text-white",
            successMessage: "Saved successfully!",
            errorMessage: "Save failed"
          }
        ),
        /* @__PURE__ */ e.jsx(
          we,
          {
            onClick: J,
            icon: /* @__PURE__ */ e.jsx(Ee, { className: "h-5 w-5" }),
            label: "Reload",
            className: "bg-green-600 hover:bg-green-700 text-white",
            successMessage: "Reloaded successfully",
            errorMessage: "Failed to reload"
          }
        ),
        /* @__PURE__ */ e.jsx(
          G,
          {
            onClick: Be,
            icon: /* @__PURE__ */ e.jsx(Ut, { className: "h-5 w-5" }),
            tooltip: "Clear all data",
            className: "bg-red-600 hover:bg-red-700 text-white"
          }
        ),
        /* @__PURE__ */ e.jsx(
          G,
          {
            onClick: () => oe(!0),
            icon: /* @__PURE__ */ e.jsx(At, { className: "h-5 w-5" }),
            tooltip: "Page Info & Settings",
            className: "bg-indigo-600 hover:bg-indigo-700 text-white"
          }
        ),
        !D && /* @__PURE__ */ e.jsx(
          G,
          {
            onClick: () => m(!i),
            icon: i ? /* @__PURE__ */ e.jsx(fe, { className: "h-5 w-5" }) : /* @__PURE__ */ e.jsx(pe, { className: "h-5 w-5" }),
            tooltip: i ? "Hide Editor" : "Show Editor",
            className: "bg-gray-200 hover:bg-gray-300"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "flex flex-1 overflow-hidden relative", children: [
      /* @__PURE__ */ e.jsx(
        "div",
        {
          className: `flex-1 transition-all duration-200 ${i && u === "edit" ? "overflow-auto" : "overflow-hidden"}`,
          style: Ve,
          children: /* @__PURE__ */ e.jsx("div", { className: "h-full", children: /* @__PURE__ */ e.jsx("div", { className: "bg-white rounded-lg shadow h-full flex flex-col", children: /* @__PURE__ */ e.jsxs(
            "div",
            {
              className: `flex-1 relative p-0 grid-stack-mode-${u}`,
              children: [
                /* @__PURE__ */ e.jsx(Jt, { ref: O }),
                /* @__PURE__ */ e.jsx(
                  kt,
                  {
                    onGridStackDropEvent: Ae,
                    children: /* @__PURE__ */ e.jsx(
                      Lt,
                      {
                        componentMap: ve(o),
                        showMenubar: Z,
                        onWidgetSelect: Fe,
                        selectedWidgetId: w == null ? void 0 : w.id
                      }
                    )
                  }
                ),
                g
              ]
            }
          ) }) })
        }
      ),
      u === "edit" && i && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        D && /* @__PURE__ */ e.jsx(
          "div",
          {
            className: "fixed inset-0 bg-black bg-opacity-50 z-40",
            onClick: () => m(!1)
          }
        ),
        /* @__PURE__ */ e.jsxs(
          "div",
          {
            className: `flex flex-col bg-white shadow-lg border-l border-gray-200 ${D ? "fixed right-0 top-0 bottom-0 z-50 transform transition-transform duration-300" : "relative"}`,
            style: Ue,
            children: [
              D && /* @__PURE__ */ e.jsx("div", { className: "absolute top-4 right-4 z-10", children: /* @__PURE__ */ e.jsx(
                "button",
                {
                  onClick: () => m(!1),
                  className: "p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors",
                  children: /* @__PURE__ */ e.jsx(fe, { className: "h-5 w-5" })
                }
              ) }),
              /* @__PURE__ */ e.jsx("div", { className: "flex border-b border-gray-200 pt-4", children: ["components", "properties", "page"].map(
                (a) => /* @__PURE__ */ e.jsx(
                  "button",
                  {
                    className: `flex-1 py-3 px-4 text-sm font-medium capitalize transition-colors ${b === a ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`,
                    onClick: () => M(a),
                    children: a
                  },
                  a
                )
              ) }),
              /* @__PURE__ */ e.jsxs("div", { className: "flex-1 overflow-y-auto pb-4", children: [
                b === "components" && qe(),
                b === "properties" && Je(),
                b === "page" && Ke()
              ] })
            ]
          }
        )
      ] })
    ] }),
    u === "edit" && D && !i && /* @__PURE__ */ e.jsx("div", { className: "fixed bottom-4 right-4 z-30", children: /* @__PURE__ */ e.jsx(
      "button",
      {
        onClick: () => m(!0),
        className: "p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors",
        children: /* @__PURE__ */ e.jsx(pe, { className: "h-6 w-6" })
      }
    ) }),
    u === "preview" && /* @__PURE__ */ e.jsx("div", { className: "fixed inset-0 pointer-events-none z-50", children: /* @__PURE__ */ e.jsx("div", { className: "absolute bottom-8 right-8 pointer-events-auto", children: /* @__PURE__ */ e.jsxs(
      "button",
      {
        onClick: () => h("edit"),
        className: "flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 group",
        title: "Return to Edit Mode",
        children: [
          /* @__PURE__ */ e.jsx(he, { className: "h-6 w-6 group-hover:animate-bounce" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-sm font-medium", children: "Edit Mode" })
        ]
      }
    ) }) }),
    u === "view" && /* @__PURE__ */ e.jsx("div", { className: "fixed inset-0 pointer-events-none z-50", children: /* @__PURE__ */ e.jsx("div", { className: "absolute bottom-8 right-8 pointer-events-auto", children: /* @__PURE__ */ e.jsxs(
      "button",
      {
        onClick: c,
        className: "flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 group",
        title: "Back to List",
        children: [
          /* @__PURE__ */ e.jsx(he, { className: "h-6 w-6 group-hover:animate-bounce" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-sm font-medium", children: "Back to List" })
        ]
      }
    ) }) }),
    /* @__PURE__ */ e.jsx(
      Yt,
      {
        isOpen: Pe,
        pageInfo: Ze(),
        resetOpenInfo: oe
      }
    )
  ] }) }) }, We);
};
export {
  dt as GridStackProvider,
  Lt as GridStackRender,
  kt as GridStackRenderProvider,
  or as StackPage,
  $ as useGridStackContext,
  sr as useGridStackWidgetContext
};
//# sourceMappingURL=stackpage.es.js.map
