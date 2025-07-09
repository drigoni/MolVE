//
// ChemDoodle Web Components 11.0.0
//
// https://web.chemdoodle.com
//
// Copyright 2009-2025 iChemLabs, LLC.  All rights reserved.
//
// The ChemDoodle Web Components library is licensed under version 3
// of the GNU GENERAL PUBLIC LICENSE.
//
// You may redistribute it and/or modify it under the terms of the
// GNU General Public License as published by the Free Software Foundation,
// either version 3 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// Please contact iChemLabs <https://www.ichemlabs.com/contact-us> for
// alternate licensing options.
//
/*
* MIT License
* 
* Copyright (c) 2021 Floating UI contributors
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*
*/


! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e)
    : e((ChemDoodle.lib).FloatingUICore = {})
}(this, (function(t) {
    "use strict";
    const e = ["top", "right", "bottom", "left"],
        n = ["start", "end"],
        i = e.reduce(((t, e) => t.concat(e, e + "-" + n[0], e + "-" + n[1])), []),
        o = Math.min,
        r = Math.max,
        a = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        },
        l = {
            start: "end",
            end: "start"
        };

    function s(t, e, n) {
        return r(t, o(e, n))
    }

    function f(t, e) {
        return "function" == typeof t ? t(e) : t
    }

    function c(t) {
        return t.split("-")[0]
    }

    function u(t) {
        return t.split("-")[1]
    }

    function m(t) {
        return "x" === t ? "y" : "x"
    }

    function d(t) {
        return "y" === t ? "height" : "width"
    }

    function g(t) {
        return ["top", "bottom"].includes(c(t)) ? "y" : "x"
    }

    function p(t) {
        return m(g(t))
    }

    function h(t, e, n) {
        void 0 === n && (n = !1);
        const i = u(t),
            o = p(t),
            r = d(o);
        let a = "x" === o ? i === (n ? "end" : "start") ? "right" : "left" : "start" === i ? "bottom" : "top";
        return e.reference[r] > e.floating[r] && (a = w(a)), [a, w(a)]
    }

    function y(t) {
        return t.replace(/start|end/g, (t => l[t]))
    }

    function w(t) {
        return t.replace(/left|right|bottom|top/g, (t => a[t]))
    }

    function x(t) {
        return "number" != typeof t ? function(t) {
            return {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                ...t
            }
        }(t) : {
            top: t,
            right: t,
            bottom: t,
            left: t
        }
    }

    function v(t) {
        const {
            x: e,
            y: n,
            width: i,
            height: o
        } = t;
        return {
            width: i,
            height: o,
            top: n,
            left: e,
            right: e + i,
            bottom: n + o,
            x: e,
            y: n
        }
    }

    function b(t, e, n) {
        let {
            reference: i,
            floating: o
        } = t;
        const r = g(e),
            a = p(e),
            l = d(a),
            s = c(e),
            f = "y" === r,
            m = i.x + i.width / 2 - o.width / 2,
            h = i.y + i.height / 2 - o.height / 2,
            y = i[l] / 2 - o[l] / 2;
        let w;
        switch (s) {
            case "top":
                w = {
                    x: m,
                    y: i.y - o.height
                };
                break;
            case "bottom":
                w = {
                    x: m,
                    y: i.y + i.height
                };
                break;
            case "right":
                w = {
                    x: i.x + i.width,
                    y: h
                };
                break;
            case "left":
                w = {
                    x: i.x - o.width,
                    y: h
                };
                break;
            default:
                w = {
                    x: i.x,
                    y: i.y
                }
        }
        switch (u(e)) {
            case "start":
                w[a] -= y * (n && f ? -1 : 1);
                break;
            case "end":
                w[a] += y * (n && f ? -1 : 1)
        }
        return w
    }
    async function A(t, e) {
        var n;
        void 0 === e && (e = {});
        const {
            x: i,
            y: o,
            platform: r,
            rects: a,
            elements: l,
            strategy: s
        } = t, {
            boundary: c = "clippingAncestors",
            rootBoundary: u = "viewport",
            elementContext: m = "floating",
            altBoundary: d = !1,
            padding: g = 0
        } = f(e, t), p = x(g), h = l[d ? "floating" === m ? "reference" : "floating" : m], y = v(await r.getClippingRect({
            element: null == (n = await (null == r.isElement ? void 0 : r.isElement(h))) || n ? h : h.contextElement || await (null == r.getDocumentElement ? void 0 : r.getDocumentElement(l.floating)),
            boundary: c,
            rootBoundary: u,
            strategy: s
        })), w = "floating" === m ? {
            x: i,
            y: o,
            width: a.floating.width,
            height: a.floating.height
        } : a.reference, b = await (null == r.getOffsetParent ? void 0 : r.getOffsetParent(l.floating)), A = await (null == r.isElement ? void 0 : r.isElement(b)) && await (null == r.getScale ? void 0 : r.getScale(b)) || {
            x: 1,
            y: 1
        }, R = v(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: l,
            rect: w,
            offsetParent: b,
            strategy: s
        }) : w);
        return {
            top: (y.top - R.top + p.top) / A.y,
            bottom: (R.bottom - y.bottom + p.bottom) / A.y,
            left: (y.left - R.left + p.left) / A.x,
            right: (R.right - y.right + p.right) / A.x
        }
    }

    function R(t, e) {
        return {
            top: t.top - e.height,
            right: t.right - e.width,
            bottom: t.bottom - e.height,
            left: t.left - e.width
        }
    }

    function P(t) {
        return e.some((e => t[e] >= 0))
    }

    function D(t) {
        const e = o(...t.map((t => t.left))),
            n = o(...t.map((t => t.top)));
        return {
            x: e,
            y: n,
            width: r(...t.map((t => t.right))) - e,
            height: r(...t.map((t => t.bottom))) - n
        }
    }
    t.arrow = t => ({
        name: "arrow",
        options: t,
        async fn(e) {
            const {
                x: n,
                y: i,
                placement: r,
                rects: a,
                platform: l,
                elements: c,
                middlewareData: m
            } = e, {
                element: g,
                padding: h = 0
            } = f(t, e) || {};
            if (null == g) return {};
            const y = x(h),
                w = {
                    x: n,
                    y: i
                },
                v = p(r),
                b = d(v),
                A = await l.getDimensions(g),
                R = "y" === v,
                P = R ? "top" : "left",
                D = R ? "bottom" : "right",
                T = R ? "clientHeight" : "clientWidth",
                O = a.reference[b] + a.reference[v] - w[v] - a.floating[b],
                E = w[v] - a.reference[v],
                L = await (null == l.getOffsetParent ? void 0 : l.getOffsetParent(g));
            let k = L ? L[T] : 0;
            k && await (null == l.isElement ? void 0 : l.isElement(L)) || (k = c.floating[T] || a.floating[b]);
            const C = O / 2 - E / 2,
                B = k / 2 - A[b] / 2 - 1,
                H = o(y[P], B),
                S = o(y[D], B),
                F = H,
                j = k - A[b] - S,
                z = k / 2 - A[b] / 2 + C,
                M = s(F, z, j),
                V = !m.arrow && null != u(r) && z !== M && a.reference[b] / 2 - (z < F ? H : S) - A[b] / 2 < 0,
                W = V ? z < F ? z - F : z - j : 0;
            return {
                [v]: w[v] + W,
                data: {
                    [v]: M,
                    centerOffset: z - M - W,
                    ...V && {
                        alignmentOffset: W
                    }
                },
                reset: V
            }
        }
    }), t.autoPlacement = function(t) {
        return void 0 === t && (t = {}), {
            name: "autoPlacement",
            options: t,
            async fn(e) {
                var n, o, r;
                const {
                    rects: a,
                    middlewareData: l,
                    placement: s,
                    platform: m,
                    elements: d
                } = e, {
                    crossAxis: g = !1,
                    alignment: p,
                    allowedPlacements: w = i,
                    autoAlignment: x = !0,
                    ...v
                } = f(t, e), b = void 0 !== p || w === i ? function(t, e, n) {
                    return (t ? [...n.filter((e => u(e) === t)), ...n.filter((e => u(e) !== t))] : n.filter((t => c(t) === t))).filter((n => !t || u(n) === t || !!e && y(n) !== n))
                }(p || null, x, w) : w, R = await A(e, v), P = (null == (n = l.autoPlacement) ? void 0 : n.index) || 0, D = b[P];
                if (null == D) return {};
                const T = h(D, a, await (null == m.isRTL ? void 0 : m.isRTL(d.floating)));
                if (s !== D) return {
                    reset: {
                        placement: b[0]
                    }
                };
                const O = [R[c(D)], R[T[0]], R[T[1]]],
                    E = [...(null == (o = l.autoPlacement) ? void 0 : o.overflows) || [], {
                        placement: D,
                        overflows: O
                    }],
                    L = b[P + 1];
                if (L) return {
                    data: {
                        index: P + 1,
                        overflows: E
                    },
                    reset: {
                        placement: L
                    }
                };
                const k = E.map((t => {
                        const e = u(t.placement);
                        return [t.placement, e && g ? t.overflows.slice(0, 2).reduce(((t, e) => t + e), 0) : t.overflows[0], t.overflows]
                    })).sort(((t, e) => t[1] - e[1])),
                    C = (null == (r = k.filter((t => t[2].slice(0, u(t[0]) ? 2 : 3).every((t => t <= 0))))[0]) ? void 0 : r[0]) || k[0][0];
                return C !== s ? {
                    data: {
                        index: P + 1,
                        overflows: E
                    },
                    reset: {
                        placement: C
                    }
                } : {}
            }
        }
    }, t.computePosition = async (t, e, n) => {
        const {
            placement: i = "bottom",
            strategy: o = "absolute",
            middleware: r = [],
            platform: a
        } = n, l = r.filter(Boolean), s = await (null == a.isRTL ? void 0 : a.isRTL(e));
        let f = await a.getElementRects({
                reference: t,
                floating: e,
                strategy: o
            }),
            {
                x: c,
                y: u
            } = b(f, i, s),
            m = i,
            d = {},
            g = 0;
        for (let n = 0; n < l.length; n++) {
            const {
                name: r,
                fn: p
            } = l[n], {
                x: h,
                y: y,
                data: w,
                reset: x
            } = await p({
                x: c,
                y: u,
                initialPlacement: i,
                placement: m,
                strategy: o,
                middlewareData: d,
                rects: f,
                platform: a,
                elements: {
                    reference: t,
                    floating: e
                }
            });
            c = null != h ? h : c, u = null != y ? y : u, d = {
                ...d,
                [r]: {
                    ...d[r],
                    ...w
                }
            }, x && g <= 50 && (g++, "object" == typeof x && (x.placement && (m = x.placement), x.rects && (f = !0 === x.rects ? await a.getElementRects({
                reference: t,
                floating: e,
                strategy: o
            }) : x.rects), ({
                x: c,
                y: u
            } = b(f, m, s))), n = -1)
        }
        return {
            x: c,
            y: u,
            placement: m,
            strategy: o,
            middlewareData: d
        }
    }, t.detectOverflow = A, t.flip = function(t) {
        return void 0 === t && (t = {}), {
            name: "flip",
            options: t,
            async fn(e) {
                var n, i;
                const {
                    placement: o,
                    middlewareData: r,
                    rects: a,
                    initialPlacement: l,
                    platform: s,
                    elements: m
                } = e, {
                    mainAxis: d = !0,
                    crossAxis: p = !0,
                    fallbackPlacements: x,
                    fallbackStrategy: v = "bestFit",
                    fallbackAxisSideDirection: b = "none",
                    flipAlignment: R = !0,
                    ...P
                } = f(t, e);
                if (null != (n = r.arrow) && n.alignmentOffset) return {};
                const D = c(o),
                    T = g(l),
                    O = c(l) === l,
                    E = await (null == s.isRTL ? void 0 : s.isRTL(m.floating)),
                    L = x || (O || !R ? [w(l)] : function(t) {
                        const e = w(t);
                        return [y(t), e, y(e)]
                    }(l)),
                    k = "none" !== b;
                !x && k && L.push(... function(t, e, n, i) {
                    const o = u(t);
                    let r = function(t, e, n) {
                        const i = ["left", "right"],
                            o = ["right", "left"],
                            r = ["top", "bottom"],
                            a = ["bottom", "top"];
                        switch (t) {
                            case "top":
                            case "bottom":
                                return n ? e ? o : i : e ? i : o;
                            case "left":
                            case "right":
                                return e ? r : a;
                            default:
                                return []
                        }
                    }(c(t), "start" === n, i);
                    return o && (r = r.map((t => t + "-" + o)), e && (r = r.concat(r.map(y)))), r
                }(l, R, b, E));
                const C = [l, ...L],
                    B = await A(e, P),
                    H = [];
                let S = (null == (i = r.flip) ? void 0 : i.overflows) || [];
                if (d && H.push(B[D]), p) {
                    const t = h(o, a, E);
                    H.push(B[t[0]], B[t[1]])
                }
                if (S = [...S, {
                        placement: o,
                        overflows: H
                    }], !H.every((t => t <= 0))) {
                    var F, j;
                    const t = ((null == (F = r.flip) ? void 0 : F.index) || 0) + 1,
                        e = C[t];
                    if (e) return {
                        data: {
                            index: t,
                            overflows: S
                        },
                        reset: {
                            placement: e
                        }
                    };
                    let n = null == (j = S.filter((t => t.overflows[0] <= 0)).sort(((t, e) => t.overflows[1] - e.overflows[1]))[0]) ? void 0 : j.placement;
                    if (!n) switch (v) {
                        case "bestFit": {
                            var z;
                            const t = null == (z = S.filter((t => {
                                if (k) {
                                    const e = g(t.placement);
                                    return e === T || "y" === e
                                }
                                return !0
                            })).map((t => [t.placement, t.overflows.filter((t => t > 0)).reduce(((t, e) => t + e), 0)])).sort(((t, e) => t[1] - e[1]))[0]) ? void 0 : z[0];
                            t && (n = t);
                            break
                        }
                        case "initialPlacement":
                            n = l
                    }
                    if (o !== n) return {
                        reset: {
                            placement: n
                        }
                    }
                }
                return {}
            }
        }
    }, t.hide = function(t) {
        return void 0 === t && (t = {}), {
            name: "hide",
            options: t,
            async fn(e) {
                const {
                    rects: n
                } = e, {
                    strategy: i = "referenceHidden",
                    ...o
                } = f(t, e);
                switch (i) {
                    case "referenceHidden": {
                        const t = R(await A(e, {
                            ...o,
                            elementContext: "reference"
                        }), n.reference);
                        return {
                            data: {
                                referenceHiddenOffsets: t,
                                referenceHidden: P(t)
                            }
                        }
                    }
                    case "escaped": {
                        const t = R(await A(e, {
                            ...o,
                            altBoundary: !0
                        }), n.floating);
                        return {
                            data: {
                                escapedOffsets: t,
                                escaped: P(t)
                            }
                        }
                    }
                    default:
                        return {}
                }
            }
        }
    }, t.inline = function(t) {
        return void 0 === t && (t = {}), {
            name: "inline",
            options: t,
            async fn(e) {
                const {
                    placement: n,
                    elements: i,
                    rects: a,
                    platform: l,
                    strategy: s
                } = e, {
                    padding: u = 2,
                    x: m,
                    y: d
                } = f(t, e), p = Array.from(await (null == l.getClientRects ? void 0 : l.getClientRects(i.reference)) || []), h = function(t) {
                    const e = t.slice().sort(((t, e) => t.y - e.y)),
                        n = [];
                    let i = null;
                    for (let t = 0; t < e.length; t++) {
                        const o = e[t];
                        !i || o.y - i.y > i.height / 2 ? n.push([o]) : n[n.length - 1].push(o), i = o
                    }
                    return n.map((t => v(D(t))))
                }(p), y = v(D(p)), w = x(u);
                const b = await l.getElementRects({
                    reference: {
                        getBoundingClientRect: function() {
                            if (2 === h.length && h[0].left > h[1].right && null != m && null != d) return h.find((t => m > t.left - w.left && m < t.right + w.right && d > t.top - w.top && d < t.bottom + w.bottom)) || y;
                            if (h.length >= 2) {
                                if ("y" === g(n)) {
                                    const t = h[0],
                                        e = h[h.length - 1],
                                        i = "top" === c(n),
                                        o = t.top,
                                        r = e.bottom,
                                        a = i ? t.left : e.left,
                                        l = i ? t.right : e.right;
                                    return {
                                        top: o,
                                        bottom: r,
                                        left: a,
                                        right: l,
                                        width: l - a,
                                        height: r - o,
                                        x: a,
                                        y: o
                                    }
                                }
                                const t = "left" === c(n),
                                    e = r(...h.map((t => t.right))),
                                    i = o(...h.map((t => t.left))),
                                    a = h.filter((n => t ? n.left === i : n.right === e)),
                                    l = a[0].top,
                                    s = a[a.length - 1].bottom;
                                return {
                                    top: l,
                                    bottom: s,
                                    left: i,
                                    right: e,
                                    width: e - i,
                                    height: s - l,
                                    x: i,
                                    y: l
                                }
                            }
                            return y
                        }
                    },
                    floating: i.floating,
                    strategy: s
                });
                return a.reference.x !== b.reference.x || a.reference.y !== b.reference.y || a.reference.width !== b.reference.width || a.reference.height !== b.reference.height ? {
                    reset: {
                        rects: b
                    }
                } : {}
            }
        }
    }, t.limitShift = function(t) {
        return void 0 === t && (t = {}), {
            options: t,
            fn(e) {
                const {
                    x: n,
                    y: i,
                    placement: o,
                    rects: r,
                    middlewareData: a
                } = e, {
                    offset: l = 0,
                    mainAxis: s = !0,
                    crossAxis: u = !0
                } = f(t, e), d = {
                    x: n,
                    y: i
                }, p = g(o), h = m(p);
                let y = d[h],
                    w = d[p];
                const x = f(l, e),
                    v = "number" == typeof x ? {
                        mainAxis: x,
                        crossAxis: 0
                    } : {
                        mainAxis: 0,
                        crossAxis: 0,
                        ...x
                    };
                if (s) {
                    const t = "y" === h ? "height" : "width",
                        e = r.reference[h] - r.floating[t] + v.mainAxis,
                        n = r.reference[h] + r.reference[t] - v.mainAxis;
                    y < e ? y = e : y > n && (y = n)
                }
                if (u) {
                    var b, A;
                    const t = "y" === h ? "width" : "height",
                        e = ["top", "left"].includes(c(o)),
                        n = r.reference[p] - r.floating[t] + (e && (null == (b = a.offset) ? void 0 : b[p]) || 0) + (e ? 0 : v.crossAxis),
                        i = r.reference[p] + r.reference[t] + (e ? 0 : (null == (A = a.offset) ? void 0 : A[p]) || 0) - (e ? v.crossAxis : 0);
                    w < n ? w = n : w > i && (w = i)
                }
                return {
                    [h]: y,
                    [p]: w
                }
            }
        }
    }, t.offset = function(t) {
        return void 0 === t && (t = 0), {
            name: "offset",
            options: t,
            async fn(e) {
                var n, i;
                const {
                    x: o,
                    y: r,
                    placement: a,
                    middlewareData: l
                } = e, s = await async function(t, e) {
                    const {
                        placement: n,
                        platform: i,
                        elements: o
                    } = t, r = await (null == i.isRTL ? void 0 : i.isRTL(o.floating)), a = c(n), l = u(n), s = "y" === g(n), m = ["left", "top"].includes(a) ? -1 : 1, d = r && s ? -1 : 1, p = f(e, t);
                    let {
                        mainAxis: h,
                        crossAxis: y,
                        alignmentAxis: w
                    } = "number" == typeof p ? {
                        mainAxis: p,
                        crossAxis: 0,
                        alignmentAxis: null
                    } : {
                        mainAxis: p.mainAxis || 0,
                        crossAxis: p.crossAxis || 0,
                        alignmentAxis: p.alignmentAxis
                    };
                    return l && "number" == typeof w && (y = "end" === l ? -1 * w : w), s ? {
                        x: y * d,
                        y: h * m
                    } : {
                        x: h * m,
                        y: y * d
                    }
                }(e, t);
                return a === (null == (n = l.offset) ? void 0 : n.placement) && null != (i = l.arrow) && i.alignmentOffset ? {} : {
                    x: o + s.x,
                    y: r + s.y,
                    data: {
                        ...s,
                        placement: a
                    }
                }
            }
        }
    }, t.rectToClientRect = v, t.shift = function(t) {
        return void 0 === t && (t = {}), {
            name: "shift",
            options: t,
            async fn(e) {
                const {
                    x: n,
                    y: i,
                    placement: o
                } = e, {
                    mainAxis: r = !0,
                    crossAxis: a = !1,
                    limiter: l = {
                        fn: t => {
                            let {
                                x: e,
                                y: n
                            } = t;
                            return {
                                x: e,
                                y: n
                            }
                        }
                    },
                    ...u
                } = f(t, e), d = {
                    x: n,
                    y: i
                }, p = await A(e, u), h = g(c(o)), y = m(h);
                let w = d[y],
                    x = d[h];
                if (r) {
                    const t = "y" === y ? "bottom" : "right";
                    w = s(w + p["y" === y ? "top" : "left"], w, w - p[t])
                }
                if (a) {
                    const t = "y" === h ? "bottom" : "right";
                    x = s(x + p["y" === h ? "top" : "left"], x, x - p[t])
                }
                const v = l.fn({
                    ...e,
                    [y]: w,
                    [h]: x
                });
                return {
                    ...v,
                    data: {
                        x: v.x - n,
                        y: v.y - i,
                        enabled: {
                            [y]: r,
                            [h]: a
                        }
                    }
                }
            }
        }
    }, t.size = function(t) {
        return void 0 === t && (t = {}), {
            name: "size",
            options: t,
            async fn(e) {
                var n, i;
                const {
                    placement: a,
                    rects: l,
                    platform: s,
                    elements: m
                } = e, {
                    apply: d = (() => {}),
                    ...p
                } = f(t, e), h = await A(e, p), y = c(a), w = u(a), x = "y" === g(a), {
                    width: v,
                    height: b
                } = l.floating;
                let R, P;
                "top" === y || "bottom" === y ? (R = y, P = w === (await (null == s.isRTL ? void 0 : s.isRTL(m.floating)) ? "start" : "end") ? "left" : "right") : (P = y, R = "end" === w ? "top" : "bottom");
                const D = b - h.top - h.bottom,
                    T = v - h.left - h.right,
                    O = o(b - h[R], D),
                    E = o(v - h[P], T),
                    L = !e.middlewareData.shift;
                let k = O,
                    C = E;
                if (null != (n = e.middlewareData.shift) && n.enabled.x && (C = T), null != (i = e.middlewareData.shift) && i.enabled.y && (k = D), L && !w) {
                    const t = r(h.left, 0),
                        e = r(h.right, 0),
                        n = r(h.top, 0),
                        i = r(h.bottom, 0);
                    x ? C = v - 2 * (0 !== t || 0 !== e ? t + e : r(h.left, h.right)) : k = b - 2 * (0 !== n || 0 !== i ? n + i : r(h.top, h.bottom))
                }
                await d({
                    ...e,
                    availableWidth: C,
                    availableHeight: k
                });
                const B = await s.getDimensions(m.floating);
                return v !== B.width || b !== B.height ? {
                    reset: {
                        rects: !0
                    }
                } : {}
            }
        }
    }
}));
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("@floating-ui/core")) : "function" == typeof define && define.amd ? define(["exports", "@floating-ui/core"], e)
    : e((t = ChemDoodle.lib).FloatingUIDOM = {}, t.FloatingUICore)
}(this, (function(t, e) {
    "use strict";
    const n = Math.min,
        o = Math.max,
        i = Math.round,
        r = Math.floor,
        c = t => ({
            x: t,
            y: t
        });

    function l() {
        return "undefined" != typeof window
    }

    function s(t) {
        return a(t) ? (t.nodeName || "").toLowerCase() : "#document"
    }

    function f(t) {
        var e;
        return (null == t || null == (e = t.ownerDocument) ? void 0 : e.defaultView) || window
    }

    function u(t) {
        var e;
        return null == (e = (a(t) ? t.ownerDocument : t.document) || window.document) ? void 0 : e.documentElement
    }

    function a(t) {
        return !!l() && (t instanceof Node || t instanceof f(t).Node)
    }

    function d(t) {
        return !!l() && (t instanceof Element || t instanceof f(t).Element)
    }

    function h(t) {
        return !!l() && (t instanceof HTMLElement || t instanceof f(t).HTMLElement)
    }

    function p(t) {
        return !(!l() || "undefined" == typeof ShadowRoot) && (t instanceof ShadowRoot || t instanceof f(t).ShadowRoot)
    }

    function g(t) {
        const {
            overflow: e,
            overflowX: n,
            overflowY: o,
            display: i
        } = b(t);
        return /auto|scroll|overlay|hidden|clip/.test(e + o + n) && !["inline", "contents"].includes(i)
    }

    function m(t) {
        return ["table", "td", "th"].includes(s(t))
    }

    function y(t) {
        return [":popover-open", ":modal"].some((e => {
            try {
                return t.matches(e)
            } catch (t) {
                return !1
            }
        }))
    }

    function w(t) {
        const e = x(),
            n = d(t) ? b(t) : t;
        return ["transform", "translate", "scale", "rotate", "perspective"].some((t => !!n[t] && "none" !== n[t])) || !!n.containerType && "normal" !== n.containerType || !e && !!n.backdropFilter && "none" !== n.backdropFilter || !e && !!n.filter && "none" !== n.filter || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((t => (n.willChange || "").includes(t))) || ["paint", "layout", "strict", "content"].some((t => (n.contain || "").includes(t)))
    }

    function x() {
        return !("undefined" == typeof CSS || !CSS.supports) && CSS.supports("-webkit-backdrop-filter", "none")
    }

    function v(t) {
        return ["html", "body", "#document"].includes(s(t))
    }

    function b(t) {
        return f(t).getComputedStyle(t)
    }

    function T(t) {
        return d(t) ? {
            scrollLeft: t.scrollLeft,
            scrollTop: t.scrollTop
        } : {
            scrollLeft: t.scrollX,
            scrollTop: t.scrollY
        }
    }

    function L(t) {
        if ("html" === s(t)) return t;
        const e = t.assignedSlot || t.parentNode || p(t) && t.host || u(t);
        return p(e) ? e.host : e
    }

    function R(t) {
        const e = L(t);
        return v(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : h(e) && g(e) ? e : R(e)
    }

    function C(t, e, n) {
        var o;
        void 0 === e && (e = []), void 0 === n && (n = !0);
        const i = R(t),
            r = i === (null == (o = t.ownerDocument) ? void 0 : o.body),
            c = f(i);
        if (r) {
            const t = E(c);
            return e.concat(c, c.visualViewport || [], g(i) ? i : [], t && n ? C(t) : [])
        }
        return e.concat(i, C(i, [], n))
    }

    function E(t) {
        return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null
    }

    function S(t) {
        const e = b(t);
        let n = parseFloat(e.width) || 0,
            o = parseFloat(e.height) || 0;
        const r = h(t),
            c = r ? t.offsetWidth : n,
            l = r ? t.offsetHeight : o,
            s = i(n) !== c || i(o) !== l;
        return s && (n = c, o = l), {
            width: n,
            height: o,
            $: s
        }
    }

    function F(t) {
        return d(t) ? t : t.contextElement
    }

    function O(t) {
        const e = F(t);
        if (!h(e)) return c(1);
        const n = e.getBoundingClientRect(),
            {
                width: o,
                height: r,
                $: l
            } = S(e);
        let s = (l ? i(n.width) : n.width) / o,
            f = (l ? i(n.height) : n.height) / r;
        return s && Number.isFinite(s) || (s = 1), f && Number.isFinite(f) || (f = 1), {
            x: s,
            y: f
        }
    }
    const D = c(0);

    function H(t) {
        const e = f(t);
        return x() && e.visualViewport ? {
            x: e.visualViewport.offsetLeft,
            y: e.visualViewport.offsetTop
        } : D
    }

    function P(t, n, o, i) {
        void 0 === n && (n = !1), void 0 === o && (o = !1);
        const r = t.getBoundingClientRect(),
            l = F(t);
        let s = c(1);
        n && (i ? d(i) && (s = O(i)) : s = O(t));
        const u = function(t, e, n) {
            return void 0 === e && (e = !1), !(!n || e && n !== f(t)) && e
        }(l, o, i) ? H(l) : c(0);
        let a = (r.left + u.x) / s.x,
            h = (r.top + u.y) / s.y,
            p = r.width / s.x,
            g = r.height / s.y;
        if (l) {
            const t = f(l),
                e = i && d(i) ? f(i) : i;
            let n = t,
                o = E(n);
            for (; o && i && e !== n;) {
                const t = O(o),
                    e = o.getBoundingClientRect(),
                    i = b(o),
                    r = e.left + (o.clientLeft + parseFloat(i.paddingLeft)) * t.x,
                    c = e.top + (o.clientTop + parseFloat(i.paddingTop)) * t.y;
                a *= t.x, h *= t.y, p *= t.x, g *= t.y, a += r, h += c, n = f(o), o = E(n)
            }
        }
        return e.rectToClientRect({
            width: p,
            height: g,
            x: a,
            y: h
        })
    }

    function W(t, e) {
        const n = T(t).scrollLeft;
        return e ? e.left + n : P(u(t)).left + n
    }

    function M(t, e, n) {
        void 0 === n && (n = !1);
        const o = t.getBoundingClientRect();
        return {
            x: o.left + e.scrollLeft - (n ? 0 : W(t, o)),
            y: o.top + e.scrollTop
        }
    }

    function z(t, n, i) {
        let r;
        if ("viewport" === n) r = function(t, e) {
            const n = f(t),
                o = u(t),
                i = n.visualViewport;
            let r = o.clientWidth,
                c = o.clientHeight,
                l = 0,
                s = 0;
            if (i) {
                r = i.width, c = i.height;
                const t = x();
                (!t || t && "fixed" === e) && (l = i.offsetLeft, s = i.offsetTop)
            }
            return {
                width: r,
                height: c,
                x: l,
                y: s
            }
        }(t, i);
        else if ("document" === n) r = function(t) {
            const e = u(t),
                n = T(t),
                i = t.ownerDocument.body,
                r = o(e.scrollWidth, e.clientWidth, i.scrollWidth, i.clientWidth),
                c = o(e.scrollHeight, e.clientHeight, i.scrollHeight, i.clientHeight);
            let l = -n.scrollLeft + W(t);
            const s = -n.scrollTop;
            return "rtl" === b(i).direction && (l += o(e.clientWidth, i.clientWidth) - r), {
                width: r,
                height: c,
                x: l,
                y: s
            }
        }(u(t));
        else if (d(n)) r = function(t, e) {
            const n = P(t, !0, "fixed" === e),
                o = n.top + t.clientTop,
                i = n.left + t.clientLeft,
                r = h(t) ? O(t) : c(1);
            return {
                width: t.clientWidth * r.x,
                height: t.clientHeight * r.y,
                x: i * r.x,
                y: o * r.y
            }
        }(n, i);
        else {
            const e = H(t);
            r = {
                x: n.x - e.x,
                y: n.y - e.y,
                width: n.width,
                height: n.height
            }
        }
        return e.rectToClientRect(r)
    }

    function A(t, e) {
        const n = L(t);
        return !(n === e || !d(n) || v(n)) && ("fixed" === b(n).position || A(n, e))
    }

    function B(t, e, n) {
        const o = h(e),
            i = u(e),
            r = "fixed" === n,
            l = P(t, !0, r, e);
        let f = {
            scrollLeft: 0,
            scrollTop: 0
        };
        const a = c(0);
        if (o || !o && !r)
            if (("body" !== s(e) || g(i)) && (f = T(e)), o) {
                const t = P(e, !0, r, e);
                a.x = t.x + e.clientLeft, a.y = t.y + e.clientTop
            } else i && (a.x = W(i));
        const d = !i || o || r ? c(0) : M(i, f);
        return {
            x: l.left + f.scrollLeft - a.x - d.x,
            y: l.top + f.scrollTop - a.y - d.y,
            width: l.width,
            height: l.height
        }
    }

    function V(t) {
        return "static" === b(t).position
    }

    function N(t, e) {
        if (!h(t) || "fixed" === b(t).position) return null;
        if (e) return e(t);
        let n = t.offsetParent;
        return u(t) === n && (n = n.ownerDocument.body), n
    }

    function I(t, e) {
        const n = f(t);
        if (y(t)) return n;
        if (!h(t)) {
            let e = L(t);
            for (; e && !v(e);) {
                if (d(e) && !V(e)) return e;
                e = L(e)
            }
            return n
        }
        let o = N(t, e);
        for (; o && m(o) && V(o);) o = N(o, e);
        return o && v(o) && V(o) && !w(o) ? n : o || function(t) {
            let e = L(t);
            for (; h(e) && !v(e);) {
                if (w(e)) return e;
                if (y(e)) return null;
                e = L(e)
            }
            return null
        }(t) || n
    }
    const k = {
        convertOffsetParentRelativeRectToViewportRelativeRect: function(t) {
            let {
                elements: e,
                rect: n,
                offsetParent: o,
                strategy: i
            } = t;
            const r = "fixed" === i,
                l = u(o),
                f = !!e && y(e.floating);
            if (o === l || f && r) return n;
            let a = {
                    scrollLeft: 0,
                    scrollTop: 0
                },
                d = c(1);
            const p = c(0),
                m = h(o);
            if ((m || !m && !r) && (("body" !== s(o) || g(l)) && (a = T(o)), h(o))) {
                const t = P(o);
                d = O(o), p.x = t.x + o.clientLeft, p.y = t.y + o.clientTop
            }
            const w = !l || m || r ? c(0) : M(l, a, !0);
            return {
                width: n.width * d.x,
                height: n.height * d.y,
                x: n.x * d.x - a.scrollLeft * d.x + p.x + w.x,
                y: n.y * d.y - a.scrollTop * d.y + p.y + w.y
            }
        },
        getDocumentElement: u,
        getClippingRect: function(t) {
            let {
                element: e,
                boundary: i,
                rootBoundary: r,
                strategy: c
            } = t;
            const l = [..."clippingAncestors" === i ? y(e) ? [] : function(t, e) {
                    const n = e.get(t);
                    if (n) return n;
                    let o = C(t, [], !1).filter((t => d(t) && "body" !== s(t))),
                        i = null;
                    const r = "fixed" === b(t).position;
                    let c = r ? L(t) : t;
                    for (; d(c) && !v(c);) {
                        const e = b(c),
                            n = w(c);
                        n || "fixed" !== e.position || (i = null), (r ? !n && !i : !n && "static" === e.position && i && ["absolute", "fixed"].includes(i.position) || g(c) && !n && A(t, c)) ? o = o.filter((t => t !== c)) : i = e, c = L(c)
                    }
                    return e.set(t, o), o
                }(e, this._c) : [].concat(i), r],
                f = l[0],
                u = l.reduce(((t, i) => {
                    const r = z(e, i, c);
                    return t.top = o(r.top, t.top), t.right = n(r.right, t.right), t.bottom = n(r.bottom, t.bottom), t.left = o(r.left, t.left), t
                }), z(e, f, c));
            return {
                width: u.right - u.left,
                height: u.bottom - u.top,
                x: u.left,
                y: u.top
            }
        },
        getOffsetParent: I,
        getElementRects: async function(t) {
            const e = this.getOffsetParent || I,
                n = this.getDimensions,
                o = await n(t.floating);
            return {
                reference: B(t.reference, await e(t.floating), t.strategy),
                floating: {
                    x: 0,
                    y: 0,
                    width: o.width,
                    height: o.height
                }
            }
        },
        getClientRects: function(t) {
            return Array.from(t.getClientRects())
        },
        getDimensions: function(t) {
            const {
                width: e,
                height: n
            } = S(t);
            return {
                width: e,
                height: n
            }
        },
        getScale: O,
        isElement: d,
        isRTL: function(t) {
            return "rtl" === b(t).direction
        }
    };

    function q(t, e) {
        return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height
    }
    const U = e.detectOverflow,
        j = e.offset,
        X = e.autoPlacement,
        Y = e.shift,
        $ = e.flip,
        _ = e.size,
        G = e.hide,
        J = e.arrow,
        K = e.inline,
        Q = e.limitShift;
    t.arrow = J, t.autoPlacement = X, t.autoUpdate = function(t, e, i, c) {
        void 0 === c && (c = {});
        const {
            ancestorScroll: l = !0,
            ancestorResize: s = !0,
            elementResize: f = "function" == typeof ResizeObserver,
            layoutShift: a = "function" == typeof IntersectionObserver,
            animationFrame: d = !1
        } = c, h = F(t), p = l || s ? [...h ? C(h) : [], ...C(e)] : [];
        p.forEach((t => {
            l && t.addEventListener("scroll", i, {
                passive: !0
            }), s && t.addEventListener("resize", i)
        }));
        const g = h && a ? function(t, e) {
            let i, c = null;
            const l = u(t);

            function s() {
                var t;
                clearTimeout(i), null == (t = c) || t.disconnect(), c = null
            }
            return function f(u, a) {
                void 0 === u && (u = !1), void 0 === a && (a = 1), s();
                const d = t.getBoundingClientRect(),
                    {
                        left: h,
                        top: p,
                        width: g,
                        height: m
                    } = d;
                if (u || e(), !g || !m) return;
                const y = {
                    rootMargin: -r(p) + "px " + -r(l.clientWidth - (h + g)) + "px " + -r(l.clientHeight - (p + m)) + "px " + -r(h) + "px",
                    threshold: o(0, n(1, a)) || 1
                };
                let w = !0;

                function x(e) {
                    const n = e[0].intersectionRatio;
                    if (n !== a) {
                        if (!w) return f();
                        n ? f(!1, n) : i = setTimeout((() => {
                            f(!1, 1e-7)
                        }), 1e3)
                    }
                    1 !== n || q(d, t.getBoundingClientRect()) || f(), w = !1
                }
                try {
                    c = new IntersectionObserver(x, {
                        ...y,
                        root: l.ownerDocument
                    })
                } catch (t) {
                    c = new IntersectionObserver(x, y)
                }
                c.observe(t)
            }(!0), s
        }(h, i) : null;
        let m, y = -1,
            w = null;
        f && (w = new ResizeObserver((t => {
            let [n] = t;
            n && n.target === h && w && (w.unobserve(e), cancelAnimationFrame(y), y = requestAnimationFrame((() => {
                var t;
                null == (t = w) || t.observe(e)
            }))), i()
        })), h && !d && w.observe(h), w.observe(e));
        let x = d ? P(t) : null;
        return d && function e() {
            const n = P(t);
            x && !q(x, n) && i();
            x = n, m = requestAnimationFrame(e)
        }(), i(), () => {
            var t;
            p.forEach((t => {
                l && t.removeEventListener("scroll", i), s && t.removeEventListener("resize", i)
            })), null == g || g(), null == (t = w) || t.disconnect(), w = null, d && cancelAnimationFrame(m)
        }
    }, t.computePosition = (t, n, o) => {
        const i = new Map,
            r = {
                platform: k,
                ...o
            },
            c = {
                ...r.platform,
                _c: i
            };
        return e.computePosition(t, n, {
            ...r,
            platform: c
        })
    }, t.detectOverflow = U, t.flip = $, t.getOverflowAncestors = C, t.hide = G, t.inline = K, t.limitShift = Q, t.offset = j, t.platform = k, t.shift = Y, t.size = _
}));
ChemDoodle.uis = (function(undefined) {
	'use strict';

	let p = {};

	p.actions = {};
	p.gui = {};
	p.gui.desktop = {};
	p.gui.desktop.interaction = {};
	p.gui.mobile = {};
	p.states = {};
	p.tools = {};

	return p;

})();
//Copyright 2009 iChemLabs, LLC.All rights reserved.

ChemDoodle.components = (function(Element, document, undefined) {
	'use strict';
	let pack = {};
	
	pack.fadeOut = function(element, duration, callback) {
		if(element && element instanceof Element){
			element.style.opacity = 1;
			element.style.transition = 'opacity '+duration+'ms ease-in-out';
			element.addEventListener('transitionend', function() {
				element.style.display = 'none';
				element.style.transition = '';
				if (callback) {
					callback();
				}
			}, { once: true }); // Ensure the listener runs only once
			setTimeout(() => {
				element.style.opacity = 0;
			}, 0);
		}
	};
	
	pack.fadeIn = function(element, duration, callback) {
		if(element && element instanceof Element){
			element.style.opacity = 0;
			element.style.display = 'block'; // Or the original display style
			element.style.transition = 'opacity '+duration+'ms ease-in-out';
			element.addEventListener('transitionend', function() {
				element.style.transition = '';
				if (callback) {
					callback();
				}
			}, { once: true });
			setTimeout(() => {
				element.style.opacity = 1;
			}, 0);
		}
	};
	
	pack.slideUp = function(element, duration = 300, callback) {
		if(element && element instanceof Element){
			element.style.overflow = 'hidden';
			element.style.transitionProperty = 'height, opacity';
			element.style.transitionDuration = duration+'ms';
			element.style.opacity = 1;
			element.style.height = element.offsetHeight + 'px';
				
			// Force reflow to trigger the transition
			element.offsetHeight;
				
			element.style.height = '0px';
			element.style.opacity = 0;
				
			setTimeout(() => {
				element.style.display = 'none';
				element.style.removeProperty('height');
				element.style.removeProperty('opacity');
				element.style.removeProperty('overflow');
				element.style.removeProperty('transition-property');
				element.style.removeProperty('transition-duration');
				if (callback) {
					callback();
				}
			}, duration);
		}
	}
	
	pack.slideDown = function(element, duration = 300, callback) {
		if(element && element instanceof Element){
			element.style.removeProperty('display');
			let display = window.getComputedStyle(element).display;
			if (display === 'none') display = 'block'; // Default to block if initially hidden
				
			element.style.overflow = 'hidden';
			element.style.height = '0px';
			element.style.opacity = 0;
			element.style.transitionProperty = 'height, opacity';
			element.style.transitionDuration = duration+'ms';
				
			// Force reflow to trigger the transition
			element.offsetHeight;
				
			element.style.height = element.scrollHeight + 'px';
			element.style.opacity = 1;
				
			setTimeout(() => {
				element.style.removeProperty('height');
				element.style.removeProperty('overflow');
				element.style.removeProperty('transition-property');
				element.style.removeProperty('transition-duration');
				if (callback) {
					callback();
				}
			}, duration);
		}
	}

	return pack;

})(Element, document);

ChemDoodle.uis.gui.imageDepot = (function (ext, undefined) {
	'use strict';
	let d = {};
	d.getURI = function (s) {
		// for PNG, but all internal images are SVG now
		//return 'data:image/png;base64,' + s;
		// for SVG
		return 'data:image/svg+xml;base64,' + s;
	};

	d.ADD_LONE_PAIR = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PGNpcmNsZSByPSIyIiBjeD0iNiIgY3k9IjEwIiBzdHJva2U9Im5vbmUiICAgICAgLz48Y2lyY2xlIHI9IjIiIGN4PSIxNCIgY3k9IjEwIiBzdHJva2U9Im5vbmUiICAgIC8+PC9nICA+PC9nPjwvc3ZnPg==';
	d.ADD_RADICAL = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PGNpcmNsZSByPSIyIiBjeD0iMTAiIGN5PSIxMCIgc3Ryb2tlPSJub25lIiAgICAvPjwvZyAgPjwvZz48L3N2Zz4=';
	d.ANGLE = 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIzLjAuMywgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNOS41LDQuNQoJYy00Ljk3MSwwLTksNC4wMjktOSw5djJoMTh2LTJDMTguNSw4LjUyOSwxNC40NzEsNC41LDkuNSw0LjV6IE0zLjU4MywxMi41YzAuNDc4LTIuODM0LDIuOTQ5LTUsNS45MTctNXM1LjQzOSwyLjE2Niw1LjkxNyw1SDMuNTgzegoJIi8+CjxnPgoJCgkJPGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjkuNSIgeTE9IjQuNSIgeDI9IjkuNSIgeTI9IjUuOTI1Ii8+CjwvZz4KPGc+CgkKCQk8bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB4MT0iNi40MjIiIHkxPSI1LjA0MyIgeDI9IjYuOTA5IiB5Mj0iNi4zODIiLz4KPC9nPgo8Zz4KCQoJCTxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSIzLjcxNSIgeTE9IjYuNjA2IiB4Mj0iNC42MzEiIHkyPSI3LjY5NyIvPgo8L2c+CjxnPgoJCgkJPGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjEuNzA2IiB5MT0iOSIgeDI9IjIuOTQiIHkyPSI5LjcxMyIvPgo8L2c+CjxnPgoJCgkJPGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjAuNjM3IiB5MT0iMTEuOTM3IiB4Mj0iMi4wNCIgeTI9IjEyLjE4NSIvPgo8L2c+CjxnPgoJCgkJPGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjE2Ljg3NiIgeTE9IjEyLjE5OSIgeDI9IjE4LjM2MyIgeTI9IjExLjkzNyIvPgo8L2c+CjxnPgoJCgkJPGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjE1Ljk4NyIgeTE9IjkuNzU1IiB4Mj0iMTcuMjk0IiB5Mj0iOSIvPgo8L2c+CjxnPgoJCgkJPGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjE0LjMxNSIgeTE9IjcuNzYyIiB4Mj0iMTUuMjg1IiB5Mj0iNi42MDYiLz4KPC9nPgo8Zz4KCQoJCTxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSIxMi4wNjIiIHkxPSI2LjQ2MSIgeDI9IjEyLjU3OCIgeTI9IjUuMDQzIi8+CjwvZz4KPGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjIuNSIgeTE9IjE1LjUiIHgyPSIyLjUiIHkyPSIxNC41Ii8+CjxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSI0LjUiIHkxPSIxNS41IiB4Mj0iNC41IiB5Mj0iMTQuNSIvPgo8bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB4MT0iNi41IiB5MT0iMTUuNSIgeDI9IjYuNSIgeTI9IjE0LjUiLz4KPGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjguNSIgeTE9IjE1LjUiIHgyPSI4LjUiIHkyPSIxNC41Ii8+CjxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSIxMC41IiB5MT0iMTUuNSIgeDI9IjEwLjUiIHkyPSIxNC41Ii8+CjxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSIxMi41IiB5MT0iMTUuNSIgeDI9IjEyLjUiIHkyPSIxNC41Ii8+CjxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSIxNC41IiB5MT0iMTUuNSIgeDI9IjE0LjUiIHkyPSIxNC41Ii8+CjxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSIxNi41IiB5MT0iMTUuNSIgeDI9IjE2LjUiIHkyPSIxNC41Ii8+Cjwvc3ZnPgo=';
	d.ANIMATION = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgk8cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9IjE1LjUsOS41IAkJMTQuNSw5LjUgMTQuNSwxMi41IDE1LjUsMTIuNSAxOC41LDE0LjUgMTguNSw3LjUgCSIvPgk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMi41LDguNXY2CQljMCwwLjU1MiwwLjQ0OCwxLDEsMWgxMGMwLjU1MiwwLDEtMC40NDgsMS0xdi02YzAtMC41NTItMC40NDgtMS0xLTFoLTEwQzIuOTQ4LDcuNSwyLjUsNy45NDgsMi41LDguNXoiLz4JCQk8bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB4MT0iNi41IiB5MT0iMTUuNSIgeDI9IjQuNSIgeTI9IjE5LjUiLz4JCQk8bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB4MT0iMTAuNSIgeTE9IjE1LjUiIHgyPSIxMi41IiB5Mj0iMTkuNSIvPgkJCTxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSI4LjUiIHkxPSIxNS41IiB4Mj0iOC41IiB5Mj0iMTkuNSIvPgkJCTxjaXJjbGUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgY3g9IjUuNSIgY3k9IjQiIHI9IjIuNSIvPgkJCTxjaXJjbGUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgY3g9IjExLjUiIGN5PSI0IiByPSIyLjUiLz4JPHBvbHlsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50cz0iNi41LDkuNSAJCTYuNSwxMy41IDEwLjUsMTEuNSA2LjUsOS41IAkiLz48L2c+PC9zdmc+';
	d.ARROW_DOWN = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHZpZXdCb3g9IjAgMCA5IDIwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA5IDIwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHBvbHlnb24gc3R5bGU9InN0cm9rZTojMDAwMDAwO3N0cm9rZS1taXRlcmxpbWl0OjEwOyIgcG9pbnRzPSIxLjI3OCw3LjY5NSA3LjcyMiw3LjY5NSA0LjYwNSwxMi4zMDUgIi8+PC9zdmc+';
	d.ARROW_EQUILIBRIUM = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGltYWdlLXJlbmRlcmluZz0ib3B0aW1pemVTcGVlZCIgICAgPjxsaW5lIHkyPSI4LjUiIGZpbGw9Im5vbmUiIHgxPSIxIiB4Mj0iMTkiIHkxPSI4LjUiICAgICAgLz48bGluZSB5Mj0iMTEuNSIgZmlsbD0ibm9uZSIgeDE9IjEiIHgyPSIxOSIgeTE9IjExLjUiICAgICAgLz48cGF0aCBkPSJNMSAxMS41IEw2Ljc1NyAxMy4xOTA0IEM2Ljc1NyAxMy4xOTA0IDUuNjA1NiAxMi44NTIzIDUuNjA1NiAxMS41IFoiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZT0ibm9uZSIgICAgICAvPjxwYXRoIGZpbGw9Im5vbmUiIGQ9Ik0xIDExLjUgTDYuNzU3IDEzLjE5MDQgQzYuNzU3IDEzLjE5MDQgNS42MDU2IDEyLjg1MjMgNS42MDU2IDExLjUgWiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgICAgICAvPjxwYXRoIGQ9Ik0xOSA4LjUgTDEzLjI0MyA2LjgwOTYgQzEzLjI0MyA2LjgwOTYgMTQuMzk0NCA3LjE0NzcgMTQuMzk0NCA4LjUgWiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlPSJub25lIiAgICAgIC8+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTE5IDguNSBMMTMuMjQzIDYuODA5NiBDMTMuMjQzIDYuODA5NiAxNC4zOTQ0IDcuMTQ3NyAxNC4zOTQ0IDguNSBaIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiAgICAvPjwvZyAgPjwvZz48L3N2Zz4=';
	d.ARROW_RESONANCE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PGxpbmUgeTI9IjEwIiBmaWxsPSJub25lIiB4MT0iMiIgeDI9IjE4IiB5MT0iMTAiICAgICAgLz48cGF0aCBkPSJNMTkgMTAgTDE0LjIwMjUgMTEuNDA4NyBDMTQuMjAyNSAxMS40MDg3IDE1LjE2MiAxMS4xMjY5IDE1LjE2MiAxMCBDMTUuMTYyIDguODczMSAxNC4yMDI1IDguNTkxMyAxNC4yMDI1IDguNTkxMyBaIiBzdHJva2U9Im5vbmUiICAgICAgLz48cGF0aCBmaWxsPSJub25lIiBkPSJNMTkgMTAgTDE0LjIwMjUgMTEuNDA4NyBDMTQuMjAyNSAxMS40MDg3IDE1LjE2MiAxMS4xMjY5IDE1LjE2MiAxMCBDMTUuMTYyIDguODczMSAxNC4yMDI1IDguNTkxMyAxNC4yMDI1IDguNTkxMyBaIiAgICAgIC8+PHBhdGggZD0iTTEgMTAgTDUuNzk3NSA4LjU5MTMgQzUuNzk3NSA4LjU5MTMgNC44MzggOC44NzMxIDQuODM4IDEwIEM0LjgzOCAxMS4xMjY5IDUuNzk3NSAxMS40MDg3IDUuNzk3NSAxMS40MDg3IFoiIHN0cm9rZT0ibm9uZSIgICAgICAvPjxwYXRoIGZpbGw9Im5vbmUiIGQ9Ik0xIDEwIEw1Ljc5NzUgOC41OTEzIEM1Ljc5NzUgOC41OTEzIDQuODM4IDguODczMSA0LjgzOCAxMCBDNC44MzggMTEuMTI2OSA1Ljc5NzUgMTEuNDA4NyA1Ljc5NzUgMTEuNDA4NyBaIiAgICAvPjwvZyAgPjwvZz48L3N2Zz4=';
	d.ARROW_RETROSYNTHETIC = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGltYWdlLXJlbmRlcmluZz0ib3B0aW1pemVTcGVlZCIgICAgPjxsaW5lIHkyPSIxMi41IiBmaWxsPSJub25lIiB4MT0iMSIgeDI9IjE2LjUiIHkxPSIxMi41IiAgICAgIC8+PGxpbmUgeTI9IjcuNSIgZmlsbD0ibm9uZSIgeDE9IjEiIHgyPSIxNi41IiB5MT0iNy41IiAgICAgIC8+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTExLjkyODkgMTcuMDcxMSBMMTkgMTAgTDExLjkyODkgMi45Mjg5IiAgICAvPjwvZyAgPjwvZz48L3N2Zz4=';
	d.ARROW_SYNTHETIC = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PGxpbmUgeTI9IjEwIiBmaWxsPSJub25lIiB4MT0iMSIgeDI9IjE4IiB5MT0iMTAiICAgICAgLz48cGF0aCBkPSJNMTkgMTAgTDEzLjI5MzcgMTEuODU0MSBDMTMuMjkzNyAxMS44NTQxIDE0LjQzNDkgMTEuNDgzMyAxNC40MzQ5IDEwIEMxNC40MzQ5IDguNTE2NyAxMy4yOTM3IDguMTQ1OSAxMy4yOTM3IDguMTQ1OSBaIiBzdHJva2U9Im5vbmUiICAgICAgLz48cGF0aCBmaWxsPSJub25lIiBkPSJNMTkgMTAgTDEzLjI5MzcgMTEuODU0MSBDMTMuMjkzNyAxMS44NTQxIDE0LjQzNDkgMTEuNDgzMyAxNC40MzQ5IDEwIEMxNC40MzQ5IDguNTE2NyAxMy4yOTM3IDguMTQ1OSAxMy4yOTM3IDguMTQ1OSBaIiAgICAvPjwvZyAgPjwvZz48L3N2Zz4=';
	d.ATOM_REACTION_MAP = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PGxpbmUgeTI9IjE2IiBmaWxsPSJub25lIiB4MT0iMSIgeDI9IjE4IiB5MT0iMTYiICAgICAgLz48cGF0aCBkPSJNMTkgMTYgTDEzLjI5MzcgMTcuODU0MSBDMTMuMjkzNyAxNy44NTQxIDE0LjQzNDkgMTcuNDgzMyAxNC40MzQ5IDE2IEMxNC40MzQ5IDE0LjUxNjcgMTMuMjkzNyAxNC4xNDU5IDEzLjI5MzcgMTQuMTQ1OSBaIiBzdHJva2U9Im5vbmUiICAgICAgLz48cGF0aCBmaWxsPSJub25lIiBkPSJNMTkgMTYgTDEzLjI5MzcgMTcuODU0MSBDMTMuMjkzNyAxNy44NTQxIDE0LjQzNDkgMTcuNDgzMyAxNC40MzQ5IDE2IEMxNC40MzQ5IDE0LjUxNjcgMTMuMjkzNyAxNC4xNDU5IDEzLjI5MzcgMTQuMTQ1OSBaIiAgICAgIC8+PHJlY3QgZmlsbD0iZ3JheSIgeD0iMSIgd2lkdGg9IjYiIGhlaWdodD0iOCIgeT0iNCIgc3Ryb2tlPSJub25lIiAgICAgIC8+PHJlY3QgZmlsbD0iZ3JheSIgeD0iMTMiIHdpZHRoPSI2IiBoZWlnaHQ9IjgiIHk9IjQiIHN0cm9rZT0ibm9uZSIgICAgLz48L2cgICAgPjxnIGZvbnQtc2l6ZT0iOHB4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiBjb2xvci1yZW5kZXJpbmc9Im9wdGltaXplUXVhbGl0eSIgZm9udC1mYW1pbHk9IidMdWNpZGEgR3JhbmRlJyIgc3Ryb2tlPSJ3aGl0ZSIgY29sb3ItaW50ZXJwb2xhdGlvbj0ibGluZWFyUkdCIiAgICA+PHBhdGggZD0iTTIuNzAzMSAxMSBMMi43MDMxIDEwLjQyMTkgTDMuODU5NCAxMC40MjE5IEwzLjg1OTQgNS44NTk0IEwyLjcwMzEgNi4xNDg0IEwyLjcwMzEgNS41NTQ3IEw0LjYzMjggNS4wNzQyIEw0LjYzMjggMTAuNDIxOSBMNS43ODkxIDEwLjQyMTkgTDUuNzg5MSAxMSBaIiBzdHJva2U9Im5vbmUiICAgICAgLz48cGF0aCBkPSJNMTQuNzAzMSAxMSBMMTQuNzAzMSAxMC40MjE5IEwxNS44NTk0IDEwLjQyMTkgTDE1Ljg1OTQgNS44NTk0IEwxNC43MDMxIDYuMTQ4NCBMMTQuNzAzMSA1LjU1NDcgTDE2LjYzMjggNS4wNzQyIEwxNi42MzI4IDEwLjQyMTkgTDE3Ljc4OTEgMTAuNDIxOSBMMTcuNzg5MSAxMSBaIiBzdHJva2U9Im5vbmUiICAgIC8+PC9nICA+PC9nPjwvc3ZnPg==';
	d.BENZENE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAsMTApIiBjb2xvci1yZW5kZXJpbmc9Im9wdGltaXplUXVhbGl0eSIgY29sb3ItaW50ZXJwb2xhdGlvbj0ibGluZWFyUkdCIiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplU3BlZWQiICAgID48bGluZSB5Mj0iNS41IiBmaWxsPSJub25lIiB4MT0iLTQuNzYzMSIgeDI9Ii0wIiB5MT0iMi43NSIgICAgICAvPjxsaW5lIHkyPSItMi43NSIgZmlsbD0ibm9uZSIgeDE9IjQuNzYzMSIgeDI9IjQuNzYzMSIgeTE9IjIuNzUiICAgICAgLz48bGluZSB5Mj0iLTIuNzUiIGZpbGw9Im5vbmUiIHgxPSIwIiB4Mj0iLTQuNzYzMSIgeTE9Ii01LjUiICAgICAgLz48bGluZSB5Mj0iOC41IiBmaWxsPSJub25lIiB4MT0iLTcuMzYxMiIgeDI9Ii0wIiB5MT0iNC4yNSIgICAgICAvPjxsaW5lIHkyPSI0LjI1IiBmaWxsPSJub25lIiB4MT0iLTAiIHgyPSI3LjM2MTIiIHkxPSI4LjUiICAgICAgLz48bGluZSB5Mj0iLTQuMjUiIGZpbGw9Im5vbmUiIHgxPSI3LjM2MTIiIHgyPSI3LjM2MTIiIHkxPSI0LjI1IiAgICAgIC8+PGxpbmUgeTI9Ii04LjUiIGZpbGw9Im5vbmUiIHgxPSI3LjM2MTIiIHgyPSIwIiB5MT0iLTQuMjUiICAgICAgLz48bGluZSB5Mj0iLTQuMjUiIGZpbGw9Im5vbmUiIHgxPSIwIiB4Mj0iLTcuMzYxMiIgeTE9Ii04LjUiICAgICAgLz48bGluZSB5Mj0iNC4yNSIgZmlsbD0ibm9uZSIgeDE9Ii03LjM2MTIiIHgyPSItNy4zNjEyIiB5MT0iLTQuMjUiICAgIC8+PC9nICA+PC9nPjwvc3ZnPg==';
	d.BOND_ANY = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGRlZnMgaWQ9ImRlZnMxIiAgICA+PGNsaXBQYXRoIGNsaXBQYXRoVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY2xpcFBhdGgxIiAgICAgID48cGF0aCBkPSJNMCAwIEwwIDIwIEwyMCAyMCBMMjAgMTQgTDEgMTQgTDEgNyBMMjAgNyBMMjAgMCBaIiAgICAgIC8+PC9jbGlwUGF0aCAgICAgID48Y2xpcFBhdGggY2xpcFBhdGhVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjbGlwUGF0aDIiICAgICAgPjxwYXRoIGQ9Ik0wIDAgTDIwIDAgTDIwIDIwIEwwIDIwIEwwIDAgWiIgICAgICAvPjwvY2xpcFBhdGggICAgPjwvZGVmcyAgICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgZm9udC1zaXplPSI4cHgiIGZvbnQtZmFtaWx5PSInTHVjaWRhIEdyYW5kZSciIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGltYWdlLXJlbmRlcmluZz0ib3B0aW1pemVTcGVlZCIgICAgPjxsaW5lIHkyPSIyIiBmaWxsPSJub25lIiB4MT0iMiIgY2xpcC1wYXRoPSJ1cmwoI2NsaXBQYXRoMSkiIHgyPSIxOCIgeTE9IjE4IiAgICAgIC8+PHBhdGggZD0iTTUuNjc1OCAxMS43ODkxIEw0LjY5MTQgOS4yOTY5IEwzLjcwMzEgMTEuNzg5MSBaTTYuNTQzIDE0IEw1LjkxNDEgMTIuMzk4NCBMMy40NjQ4IDEyLjM5ODQgTDIuODI4MSAxNCBMMi4wNjY0IDE0IEw0LjM1OTQgOC4yMTg4IEw1LjE3MTkgOC4yMTg4IEw3LjQyOTcgMTQgWk04Ljc0NjEgMTQgTDguNzQ2MSA4LjIxODggTDkuNTUwOCA4LjIxODggTDEyLjQ2MDkgMTIuNjgzNiBMMTIuNDYwOSA4LjIxODggTDEzLjE2NDEgOC4yMTg4IEwxMy4xNjQxIDE0IEwxMi4zNjMzIDE0IEw5LjQ0OTIgOS41MzUyIEw5LjQ0OTIgMTQgWk0xNS45OTYxIDE0IEwxNS45OTYxIDExLjU4NTkgTDE0LjA2NjQgOC4yMTg4IEwxNS4wMDM5IDguMjE4OCBMMTYuNTAzOSAxMC44MjgxIEwxOC4xMjExIDguMjE4OCBMMTguODgyOCA4LjIxODggTDE2LjgxNjQgMTEuNTcwMyBMMTYuODE2NCAxNCBaIiBjbGlwLXBhdGg9InVybCgjY2xpcFBhdGgyKSIgc3Ryb2tlPSJub25lIiAgICAvPjwvZyAgPjwvZz48L3N2Zz4=';
	d.BOND_DATIVE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PGxpbmUgeTI9IjIiIGZpbGw9Im5vbmUiIHgxPSIyIiB4Mj0iMTgiIHkxPSIxOCIgICAgICAvPjxwb2x5Z29uIHBvaW50cz0iIDE4IDIgMTIgNSAxNiA4IiBzdHJva2U9Im5vbmUiICAgIC8+PC9nICA+PC9nPjwvc3ZnPg==';
	d.BOND_DOUBLE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PGxpbmUgeTI9IjEiIGZpbGw9Im5vbmUiIHgxPSIxIiB4Mj0iMTciIHkxPSIxNyIgICAgICAvPjxsaW5lIHkyPSIzIiBmaWxsPSJub25lIiB4MT0iMyIgeDI9IjE5IiB5MT0iMTkiICAgIC8+PC9nICA+PC9nPjwvc3ZnPg==';
	d.BOND_DOUBLE_AMBIGUOUS = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PGxpbmUgeTI9IjMiIGZpbGw9Im5vbmUiIHgxPSIxIiB4Mj0iMTkiIHkxPSIxNyIgICAgICAvPjxsaW5lIHkyPSIxIiBmaWxsPSJub25lIiB4MT0iMyIgeDI9IjE3IiB5MT0iMTkiICAgIC8+PC9nICA+PC9nPjwvc3ZnPg==';
	d.BOND_HALF = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgc3Ryb2tlLWRhc2hvZmZzZXQ9IjEiIHRleHQtcmVuZGVyaW5nPSJnZW9tZXRyaWNQcmVjaXNpb24iIGltYWdlLXJlbmRlcmluZz0ib3B0aW1pemVTcGVlZCIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIHN0cm9rZS1saW5lam9pbj0iYmV2ZWwiIHN0cm9rZS1kYXNoYXJyYXk9IjEsMSw0LDQsNCw0LDQsNCw0LDEiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEiICAgID48bGluZSB5Mj0iMiIgZmlsbD0ibm9uZSIgeDE9IjIiIHgyPSIxOCIgeTE9IjE4IiAgICAvPjwvZyAgPjwvZz48L3N2Zz4=';
	d.BOND_PROTRUDING = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PHBvbHlnb24gcG9pbnRzPSIgMiAxOCAxNiAwIDIwIDQiIHN0cm9rZT0ibm9uZSIgICAgLz48L2cgID48L2c+PC9zdmc+';
	d.BOND_QUADRUPLE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PGxpbmUgeTI9IjEiIGZpbGw9Im5vbmUiIHgxPSIxIiB4Mj0iMTMiIHkxPSIxMyIgICAgICAvPjxsaW5lIHkyPSI3IiBmaWxsPSJub25lIiB4MT0iNyIgeDI9IjE5IiB5MT0iMTkiICAgICAgLz48bGluZSB5Mj0iMyIgZmlsbD0ibm9uZSIgeDE9IjMiIHgyPSIxNSIgeTE9IjE1IiAgICAgIC8+PGxpbmUgeTI9IjUiIGZpbGw9Im5vbmUiIHgxPSI1IiB4Mj0iMTciIHkxPSIxNyIgICAgLz48L2cgID48L2c+PC9zdmc+';
	d.BOND_QUINTUPLE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PGxpbmUgeTI9IjEiIGZpbGw9Im5vbmUiIHgxPSIxIiB4Mj0iMTEiIHkxPSIxMSIgICAgICAvPjxsaW5lIHkyPSI5IiBmaWxsPSJub25lIiB4MT0iOSIgeDI9IjE5IiB5MT0iMTkiICAgICAgLz48bGluZSB5Mj0iMyIgZmlsbD0ibm9uZSIgeDE9IjMiIHgyPSIxMyIgeTE9IjEzIiAgICAgIC8+PGxpbmUgeTI9IjciIGZpbGw9Im5vbmUiIHgxPSI3IiB4Mj0iMTciIHkxPSIxNyIgICAgICAvPjxsaW5lIHkyPSI1IiBmaWxsPSJub25lIiB4MT0iNSIgeDI9IjE1IiB5MT0iMTUiICAgIC8+PC9nICA+PC9nPjwvc3ZnPg==';
	d.BOND_RECESSED = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGRlZnMgaWQ9ImRlZnMxIiAgICA+PGNsaXBQYXRoIGNsaXBQYXRoVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY2xpcFBhdGgxIiAgICAgID48cGF0aCBkPSJNMiAxOCBMMTYgMCBMMjAgNCBaIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiICAgICAgLz48L2NsaXBQYXRoICAgID48L2RlZnMgICAgPjxnIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtZGFzaG9mZnNldD0iMS4yMSIgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiBjb2xvci1yZW5kZXJpbmc9Im9wdGltaXplUXVhbGl0eSIgc3Ryb2tlLWxpbmVqb2luPSJiZXZlbCIgc3Ryb2tlLWRhc2hhcnJheT0iMS4yMSwzIiBjb2xvci1pbnRlcnBvbGF0aW9uPSJsaW5lYXJSR0IiIHN0cm9rZS13aWR0aD0iNi4yIiBzdHJva2UtbWl0ZXJsaW1pdD0iMSIgICAgPjxsaW5lIHkyPSIyIiBmaWxsPSJub25lIiB4MT0iMiIgY2xpcC1wYXRoPSJ1cmwoI2NsaXBQYXRoMSkiIHgyPSIxOCIgeTE9IjE4IiAgICAvPjwvZyAgPjwvZz48L3N2Zz4=';
	d.BOND_RESONANCE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PGxpbmUgeTI9IjEiIGZpbGw9Im5vbmUiIHgxPSIxIiB4Mj0iMTciIHkxPSIxNyIgICAgLz48L2cgICAgPjxnIHN0cm9rZS1kYXNob2Zmc2V0PSIxIiB0ZXh0LXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplU3BlZWQiIGNvbG9yLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiBzdHJva2UtbGluZWpvaW49ImJldmVsIiBzdHJva2UtZGFzaGFycmF5PSIxLDEsNCw0LDQsNCw0LDQsNCwxIiBjb2xvci1pbnRlcnBvbGF0aW9uPSJsaW5lYXJSR0IiIHN0cm9rZS1taXRlcmxpbWl0PSIxIiAgICA+PGxpbmUgeTI9IjMiIGZpbGw9Im5vbmUiIHgxPSIzIiB4Mj0iMTkiIHkxPSIxOSIgICAgLz48L2cgID48L2c+PC9zdmc+';
	d.BOND_SEXTUPLE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PGxpbmUgeTI9IjEiIGZpbGw9Im5vbmUiIHgxPSIxIiB4Mj0iOSIgeTE9IjkiICAgICAgLz48bGluZSB5Mj0iMTEiIGZpbGw9Im5vbmUiIHgxPSIxMSIgeDI9IjE5IiB5MT0iMTkiICAgICAgLz48bGluZSB5Mj0iMyIgZmlsbD0ibm9uZSIgeDE9IjMiIHgyPSIxMSIgeTE9IjExIiAgICAgIC8+PGxpbmUgeTI9IjkiIGZpbGw9Im5vbmUiIHgxPSI5IiB4Mj0iMTciIHkxPSIxNyIgICAgICAvPjxsaW5lIHkyPSI1IiBmaWxsPSJub25lIiB4MT0iNSIgeDI9IjEzIiB5MT0iMTMiICAgICAgLz48bGluZSB5Mj0iNyIgZmlsbD0ibm9uZSIgeDE9IjciIHgyPSIxNSIgeTE9IjE1IiAgICAvPjwvZyAgPjwvZz48L3N2Zz4=';
	d.BOND_SINGLE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PGxpbmUgeTI9IjIiIGZpbGw9Im5vbmUiIHgxPSIyIiB4Mj0iMTgiIHkxPSIxOCIgICAgLz48L2cgID48L2c+PC9zdmc+';
	d.BOND_TRIPLE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PGxpbmUgeTI9IjEiIGZpbGw9Im5vbmUiIHgxPSIxIiB4Mj0iMTUiIHkxPSIxNSIgICAgICAvPjxsaW5lIHkyPSIzIiBmaWxsPSJub25lIiB4MT0iMyIgeDI9IjE3IiB5MT0iMTciICAgICAgLz48bGluZSB5Mj0iNSIgZmlsbD0ibm9uZSIgeDE9IjUiIHgyPSIxOSIgeTE9IjE5IiAgICAvPjwvZyAgPjwvZz48L3N2Zz4=';
	d.BOND_WAVY = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTIgMTggUTcuMzAzMyAxOS43Njc4IDUuNTM1NSAxNC40NjQ1IFEzLjc2NzggOS4xNjEyIDkuMDcxMSAxMC45Mjg5IFExNC4zNzQ0IDEyLjY5NjcgMTIuNjA2NiA3LjM5MzQgUTEwLjgzODggMi4wOTAxIDE2LjE0MjEgMy44NTc5IiAgICAvPjwvZyAgPjwvZz48L3N2Zz4=';
	d.BOND_ZERO = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PGNpcmNsZSByPSIxIiBjeD0iNSIgY3k9IjE2IiBzdHJva2U9Im5vbmUiICAgICAgLz48Y2lyY2xlIHI9IjEiIGN4PSI5IiBjeT0iMTIiIHN0cm9rZT0ibm9uZSIgICAgICAvPjxjaXJjbGUgcj0iMSIgY3g9IjEzIiBjeT0iOCIgc3Ryb2tlPSJub25lIiAgICAgIC8+PGNpcmNsZSByPSIxIiBjeD0iMTciIGN5PSI0IiBzdHJva2U9Im5vbmUiICAgIC8+PC9nICA+PC9nPjwvc3ZnPg==';
	d.BRACKET_CHARGE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGltYWdlLXJlbmRlcmluZz0ib3B0aW1pemVTcGVlZCIgICAgPjxwYXRoIGZpbGw9Im5vbmUiIGQ9Ik0zIDMgTDEgMyBMMSAxNyBMMyAxNyBNOSAxNyBMMTEgMTcgTDExIDMgTDkgMyIgICAgICAvPjxwYXRoIGQ9Ik0xMy4zMDA4IDEwIEwxMy4zMDA4IDkuMTMyOCBMMjAuMjM4MyA5LjEzMjggTDIwLjIzODMgMTAgWk0xNi4zMzU5IDguMjY1NiBMMTYuMzM1OSA2LjA5NzcgTDEzLjMwMDggNi4wOTc3IEwxMy4zMDA4IDUuMjMwNSBMMTYuMzM1OSA1LjIzMDUgTDE2LjMzNTkgMy4wNjI1IEwxNy4yMDMxIDMuMDYyNSBMMTcuMjAzMSA1LjIzMDUgTDIwLjIzODMgNS4yMzA1IEwyMC4yMzgzIDYuMDk3NyBMMTcuMjAzMSA2LjA5NzcgTDE3LjIwMzEgOC4yNjU2IFoiIHN0cm9rZT0ibm9uZSIgICAgLz48L2cgID48L2c+PC9zdmc+';
	d.BRACKET_REPEAT_UNIT = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PGxpbmUgeTI9IjEiIGZpbGw9Im5vbmUiIHgxPSIxIiB4Mj0iMyIgeTE9IjEiICAgICAgLz48bGluZSB5Mj0iMTYiIGZpbGw9Im5vbmUiIHgxPSIxIiB4Mj0iMSIgeTE9IjEiICAgICAgLz48bGluZSB5Mj0iMTYiIGZpbGw9Im5vbmUiIHgxPSIxIiB4Mj0iMyIgeTE9IjE2IiAgICAgIC8+PGxpbmUgeTI9IjEiIGZpbGw9Im5vbmUiIHgxPSIxMCIgeDI9IjgiIHkxPSIxIiAgICAgIC8+PGxpbmUgeTI9IjE2IiBmaWxsPSJub25lIiB4MT0iMTAiIHgyPSIxMCIgeTE9IjEiICAgICAgLz48bGluZSB5Mj0iMTYiIGZpbGw9Im5vbmUiIHgxPSIxMCIgeDI9IjgiIHkxPSIxNiIgICAgICAvPjxwYXRoIGQ9Ik0xMi45NjE5IDE5IEwxMi45NjE5IDEzLjY5NzMgTDEzLjkyMzggMTMuNjk3MyBMMTMuOTIzOCAxNC42OTM0IFExNC42ODU1IDEzLjU4MDEgMTUuNzg5MSAxMy41ODAxIFExNi40Nzc1IDEzLjU4MDEgMTYuODg3NyAxNC4wMTcxIFExNy4yOTc5IDE0LjQ1NDEgMTcuMjk3OSAxNS4xOTE0IEwxNy4yOTc5IDE5IEwxNi4zMzU5IDE5IEwxNi4zMzU5IDE1LjUwMzkgUTE2LjMzNTkgMTQuOTEzMSAxNi4xNjI2IDE0LjY2MTYgUTE1Ljk4OTMgMTQuNDEwMiAxNS41ODg5IDE0LjQxMDIgUTE0LjcwNTEgMTQuNDEwMiAxMy45MjM4IDE1LjU2NzQgTDEzLjkyMzggMTkgWiIgc3Ryb2tlPSJub25lIiAgICAvPjwvZyAgPjwvZz48L3N2Zz4=';
	d.BROMINE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgZm9udC1zaXplPSIxNHB4IiBmb250LWZhbWlseT0iJ0x1Y2lkYSBHcmFuZGUnIiBjb2xvci1pbnRlcnBvbGF0aW9uPSJsaW5lYXJSR0IiIGNvbG9yLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplU3BlZWQiICAgID48cGF0aCBkPSJNNC4zMDU3IDE1IEw0LjMwNTcgNC44ODI4IEw2LjkzMDcgNC44ODI4IFE4LjQ0ODIgNC44ODI4IDkuMjU4MyA1LjQ1NyBRMTAuMDY4NCA2LjAzMTIgMTAuMDY4NCA3LjExMTMgUTEwLjA2ODQgOC45NTAyIDcuOTkwMiA5LjcyOTUgUTEwLjQ3MTcgMTAuNDg4MyAxMC40NzE3IDEyLjQ3MDcgUTEwLjQ3MTcgMTMuNzAxMiA5LjY1MTQgMTQuMzUwNiBROC44MzExIDE1IDcuMjg2MSAxNSBaTTUuNzI3NSAxMy45MjY4IEw2LjAyMTUgMTMuOTI2OCBRNy42MDA2IDEzLjkyNjggOC4wNjU0IDEzLjcyODUgUTguOTU0MSAxMy4zNTI1IDguOTU0MSAxMi4zMzQgUTguOTU0MSAxMS40MzE2IDguMTQ3NSAxMC44MzM1IFE3LjM0MDggMTAuMjM1NCA2LjEzMDkgMTAuMjM1NCBMNS43Mjc1IDEwLjIzNTQgWk01LjcyNzUgOS4zMjYyIEw2LjE4NTUgOS4zMjYyIFE3LjMzNCA5LjMyNjIgNy45NjYzIDguODM0IFE4LjU5ODYgOC4zNDE4IDguNTk4NiA3LjQ0NjMgUTguNTk4NiA1Ljk1NjEgNi4yODgxIDUuOTU2MSBMNS43Mjc1IDUuOTU2MSBaTTEyLjM0NjcgMTUgTDEyLjM0NjcgNy41NzYyIEwxMy42OTM0IDcuNTc2MiBMMTMuNjkzNCA4Ljk3MDcgUTE0LjQ5MzIgNy40MTIxIDE2LjAxNzYgNy40MTIxIFExNi4yMjI3IDcuNDEyMSAxNi40NDgyIDcuNDQ2MyBMMTYuNDQ4MiA4LjcwNDEgUTE2LjA5OTYgOC41ODc5IDE1LjgzMyA4LjU4NzkgUTE0LjU1NDcgOC41ODc5IDEzLjY5MzQgMTAuMTA1NSBMMTMuNjkzNCAxNSBaIiBzdHJva2U9Im5vbmUiICAgIC8+PC9nICA+PC9nPjwvc3ZnPg==';
	d.CALCULATE = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgkJCTxyZWN0IHg9IjMuNSIgeT0iMC41IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB3aWR0aD0iMTQiIGhlaWdodD0iMTkiLz4JCQk8cmVjdCB4PSI1LjUiIHk9IjIuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjMiLz4JCQk8cmVjdCB4PSI1LjUiIHk9IjExLjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiLz4JCQk8cmVjdCB4PSI1LjUiIHk9IjcuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgd2lkdGg9IjIiIGhlaWdodD0iMiIvPgkJCTxyZWN0IHg9IjkuNSIgeT0iMTEuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgd2lkdGg9IjIiIGhlaWdodD0iMiIvPgkJCTxyZWN0IHg9IjkuNSIgeT0iNy41IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIi8+CQkJPHJlY3QgeD0iMTMuNSIgeT0iNy41IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIi8+CQkJPHJlY3QgeD0iNS41IiB5PSIxNS41IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIi8+CQkJPHJlY3QgeD0iOS41IiB5PSIxNS41IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIi8+CQkJPHJlY3QgeD0iMTMuNSIgeT0iMTEuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgd2lkdGg9IjIiIGhlaWdodD0iNiIvPjwvZz48L3N2Zz4=';
	d.CARBON = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgZm9udC1zaXplPSIxNHB4IiBmb250LWZhbWlseT0iJ0x1Y2lkYSBHcmFuZGUnIiBjb2xvci1pbnRlcnBvbGF0aW9uPSJsaW5lYXJSR0IiIGNvbG9yLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplU3BlZWQiICAgID48cGF0aCBkPSJNMTAuNjM5NiAxNS4yNTI5IFE4LjI4MTIgMTUuMjUyOSA2Ljk5NjEgMTMuODY4NyBRNS43MTA5IDEyLjQ4NDQgNS43MTA5IDkuOTQ4MiBRNS43MTA5IDcuNDE4OSA3LjAyIDYuMDI0NCBROC4zMjkxIDQuNjI5OSAxMC43MDggNC42Mjk5IFExMi4wNjg0IDQuNjI5OSAxMy44OTM2IDUuMDc0MiBMMTMuODkzNiA2LjQyMDkgUTExLjgxNTQgNS43MDMxIDEwLjY4NzUgNS43MDMxIFE5LjA0IDUuNzAzMSA4LjEzNzcgNi44MTc0IFE3LjIzNTQgNy45MzE2IDcuMjM1NCA5Ljk2MTkgUTcuMjM1NCAxMS44OTY1IDguMTk5MiAxMy4wMTQyIFE5LjE2MzEgMTQuMTMxOCAxMC44MzExIDE0LjEzMTggUTEyLjI2NjYgMTQuMTMxOCAxMy45MDcyIDEzLjI1IEwxMy45MDcyIDE0LjQ4MDUgUTEyLjQxMDIgMTUuMjUyOSAxMC42Mzk2IDE1LjI1MjkgWiIgc3Ryb2tlPSJub25lIiAgICAvPjwvZyAgPjwvZz48L3N2Zz4=';
	d.CENTER = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgkJCTxjaXJjbGUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgY3g9IjkuNSIgY3k9IjkuNSIgcj0iNyIvPgkJCTxjaXJjbGUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgY3g9IjkuNSIgY3k9IjkuNSIgcj0iMiIvPgkJCTxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSI5LjUiIHkxPSIwLjUiIHgyPSI5LjUiIHkyPSI0LjUiLz4JCQk8bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB4MT0iOS41IiB5MT0iMTQuNSIgeDI9IjkuNSIgeTI9IjE4LjUiLz4JCQk8bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB4MT0iMC41IiB5MT0iOS41IiB4Mj0iNC41IiB5Mj0iOS41Ii8+CQkJPGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjE0LjUiIHkxPSI5LjUiIHgyPSIxOC41IiB5Mj0iOS41Ii8+PC9nPjwvc3ZnPg==';
	d.CHAIN_CARBON = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMTkgTDUgMTYgTDUgMTEgTDkgOCBMOSAzIEwxMyAwIiAgICAgIC8+PHBhdGggZD0iTTEzLjk2MTkgMTggTDEzLjk2MTkgMTIuNjk3MyBMMTQuOTIzOCAxMi42OTczIEwxNC45MjM4IDEzLjY5MzQgUTE1LjY4NTUgMTIuNTgwMSAxNi43ODkxIDEyLjU4MDEgUTE3LjQ3NzUgMTIuNTgwMSAxNy44ODc3IDEzLjAxNzEgUTE4LjI5NzkgMTMuNDU0MSAxOC4yOTc5IDE0LjE5MTQgTDE4LjI5NzkgMTggTDE3LjMzNTkgMTggTDE3LjMzNTkgMTQuNTAzOSBRMTcuMzM1OSAxMy45MTMxIDE3LjE2MjYgMTMuNjYxNiBRMTYuOTg5MyAxMy40MTAyIDE2LjU4ODkgMTMuNDEwMiBRMTUuNzA1MSAxMy40MTAyIDE0LjkyMzggMTQuNTY3NCBMMTQuOTIzOCAxOCBaIiBzdHJva2U9Im5vbmUiICAgIC8+PC9nICA+PC9nPjwvc3ZnPg==';
	d.CHLORINE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgZm9udC1zaXplPSIxNHB4IiBmb250LWZhbWlseT0iJ0x1Y2lkYSBHcmFuZGUnIiBjb2xvci1pbnRlcnBvbGF0aW9uPSJsaW5lYXJSR0IiIGNvbG9yLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplU3BlZWQiICAgID48cGF0aCBkPSJNOC42Mzk2IDE1LjI1MjkgUTYuMjgxMiAxNS4yNTI5IDQuOTk2MSAxMy44Njg3IFEzLjcxMDkgMTIuNDg0NCAzLjcxMDkgOS45NDgyIFEzLjcxMDkgNy40MTg5IDUuMDIgNi4wMjQ0IFE2LjMyOTEgNC42Mjk5IDguNzA4IDQuNjI5OSBRMTAuMDY4NCA0LjYyOTkgMTEuODkzNiA1LjA3NDIgTDExLjg5MzYgNi40MjA5IFE5LjgxNTQgNS43MDMxIDguNjg3NSA1LjcwMzEgUTcuMDQgNS43MDMxIDYuMTM3NyA2LjgxNzQgUTUuMjM1NCA3LjkzMTYgNS4yMzU0IDkuOTYxOSBRNS4yMzU0IDExLjg5NjUgNi4xOTkyIDEzLjAxNDIgUTcuMTYzMSAxNC4xMzE4IDguODMxMSAxNC4xMzE4IFExMC4yNjY2IDE0LjEzMTggMTEuOTA3MiAxMy4yNSBMMTEuOTA3MiAxNC40ODA1IFExMC40MTAyIDE1LjI1MjkgOC42Mzk2IDE1LjI1MjkgWk0xNC4zNDY3IDE1IEwxNC4zNDY3IDQuMjA2MSBMMTUuNjkzNCA0LjIwNjEgTDE1LjY5MzQgMTUgWiIgc3Ryb2tlPSJub25lIiAgICAvPjwvZyAgPjwvZz48L3N2Zz4=';
	d.CLEAR = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMTIuNSwxOS41aC02CQljLTAuNTUyLDAtMS0wLjQ0OC0xLTFWOS43MzZjMC0wLjc1OCwwLjQyOC0xLjQ1LDEuMTA2LTEuNzg5TDcuNSw3LjVoNGwwLjg5NCwwLjQ0N0MxMy4wNzIsOC4yODYsMTMuNSw4Ljk3OSwxMy41LDkuNzM2VjE4LjUJCUMxMy41LDE5LjA1MiwxMy4wNTIsMTkuNSwxMi41LDE5LjV6Ii8+CQkJPHJlY3QgeD0iNy41IiB5PSI0LjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHdpZHRoPSI0IiBoZWlnaHQ9IjMiLz4JPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTkuNSw0LjVWMS44MjYJCWMwLTAuNjY0LTAuNjM2LTEuMTQ0LTEuMjc1LTAuOTYyTDIuNSwyLjUiLz48L2c+PC9zdmc+';
	d.COPY = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMTYuNSwxNC41aC04CQljLTAuNTUyLDAtMS0wLjQ0OC0xLTF2LTExYzAtMC41NTIsMC40NDgtMSwxLTFoNC41ODZjMC4yNjUsMCwwLjUyLDAuMTA1LDAuNzA3LDAuMjkzbDMuNDE0LDMuNDE0CQlDMTcuMzk1LDUuMzk1LDE3LjUsNS42NDksMTcuNSw1LjkxNFYxMy41QzE3LjUsMTQuMDUyLDE3LjA1MiwxNC41LDE2LjUsMTQuNXoiLz4JPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTUuNSw1LjVoLTIJCWMtMC41NTIsMC0xLDAuNDQ4LTEsMXYxMWMwLDAuNTUyLDAuNDQ4LDEsMSwxaDhjMC41NTIsMCwxLTAuNDQ4LDEtMXYtMSIvPgk8cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9IjE3LjUsNS41IAkJMTMuNSw1LjUgMTMuNSwxLjUgCSIvPjwvZz48L3N2Zz4=';
	d.CUT = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNNy44NzQsMy4xODEJCWMwLjIxMSwwLjc4LDAuMDU5LDEuNDk4LTAuMjgxLDIuMUwxOCwxNi43MzdsLTAuMjc5LDAuMWMtMS4yMjksMC40NDMtMi42MDYsMC4yMzktMy42NDMtMC41NGwtMy42MTEtMy40OTMJCWMtMC45MjUtMC44OTUtMS41NjUtMi4wMy0xLjg0My0zLjI2OEw4LjQyLDguNjI2TDYuMzE4LDYuNDc4Yy0wLjYxNiwwLjMtMS4zMzgsMC40MjQtMi4xMjIsMC4yMQkJYy0xLjEwOS0wLjMwNC0xLjk4Ni0xLjIyNi0yLjE2LTIuMzMxQzEuNzI2LDIuMzkyLDMuNDUsMC43MjUsNS40NzYsMS4wMzhDNi42MjYsMS4yMTUsNy41NzksMi4wODgsNy44NzQsMy4xODF6Ii8+CTxnPgkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTExLjg4LDEwTDE4LDMuMjYzCQkJbC0wLjI3OS0wLjFjLTEuMjI5LTAuNDQzLTIuNjA2LTAuMjM5LTMuNjQzLDAuNTRMOS44NjMsNy43OEwxMS44OCwxMHoiLz4JCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik05LjkwNCwxMi4xNzUJCQljLTAuNTM0LTAuNjY3LTAuOTIxLTEuNDMtMS4xNi0yLjI0NGwtMC4zMjQsMS40NDNsLTIuMTAxLDIuMTQ4Yy0wLjQwMy0wLjE5Ny0wLjg1MS0wLjMxOC0xLjMzMy0wLjMxOAkJCUMzLjMzNywxMy4yMDQsMiwxNC41MDIsMiwxNi4xMDJDMiwxNy43MDMsMy4zMzcsMTksNC45ODUsMTljMS42NDksMCwyLjk4Ni0xLjI5NywyLjk4Ni0yLjg5OGMwLTAuNTA0LTAuMTQ0LTAuOTcxLTAuMzc4LTEuMzg0CQkJTDkuOTA0LDEyLjE3NXoiLz4JPC9nPjwvZz48L3N2Zz4=';
	d.CYCLOBUTANE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAsMTApIiBjb2xvci1yZW5kZXJpbmc9Im9wdGltaXplUXVhbGl0eSIgY29sb3ItaW50ZXJwb2xhdGlvbj0ibGluZWFyUkdCIiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplU3BlZWQiICAgID48bGluZSB5Mj0iOSIgZmlsbD0ibm9uZSIgeDE9Ii05IiB4Mj0iLTAiIHkxPSIwIiAgICAgIC8+PGxpbmUgeTI9IjAiIGZpbGw9Im5vbmUiIHgxPSItMCIgeDI9IjkiIHkxPSI5IiAgICAgIC8+PGxpbmUgeTI9Ii05IiBmaWxsPSJub25lIiB4MT0iOSIgeDI9IjAiIHkxPSIwIiAgICAgIC8+PGxpbmUgeTI9IjAiIGZpbGw9Im5vbmUiIHgxPSIwIiB4Mj0iLTkiIHkxPSItOSIgICAgLz48L2cgID48L2c+PC9zdmc+';
	d.CYCLOHEPTANE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAsMTApIiBjb2xvci1yZW5kZXJpbmc9Im9wdGltaXplUXVhbGl0eSIgY29sb3ItaW50ZXJwb2xhdGlvbj0ibGluZWFyUkdCIiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplU3BlZWQiICAgID48bGluZSB5Mj0iLTUuNjExNCIgZmlsbD0ibm9uZSIgeDE9Ii0wIiB4Mj0iLTcuMDM2NSIgeTE9Ii05IiAgICAgIC8+PGxpbmUgeTI9IjIuMDAyNyIgZmlsbD0ibm9uZSIgeDE9Ii03LjAzNjUiIHgyPSItOC43NzQ0IiB5MT0iLTUuNjExNCIgICAgICAvPjxsaW5lIHkyPSI4LjEwODciIGZpbGw9Im5vbmUiIHgxPSItOC43NzQ0IiB4Mj0iLTMuOTA1IiB5MT0iMi4wMDI3IiAgICAgIC8+PGxpbmUgeTI9IjguMTA4NyIgZmlsbD0ibm9uZSIgeDE9Ii0zLjkwNSIgeDI9IjMuOTA1IiB5MT0iOC4xMDg3IiAgICAgIC8+PGxpbmUgeTI9IjIuMDAyNyIgZmlsbD0ibm9uZSIgeDE9IjMuOTA1IiB4Mj0iOC43NzQ0IiB5MT0iOC4xMDg3IiAgICAgIC8+PGxpbmUgeTI9Ii01LjYxMTQiIGZpbGw9Im5vbmUiIHgxPSI4Ljc3NDQiIHgyPSI3LjAzNjUiIHkxPSIyLjAwMjciICAgICAgLz48bGluZSB5Mj0iLTkiIGZpbGw9Im5vbmUiIHgxPSI3LjAzNjUiIHgyPSItMCIgeTE9Ii01LjYxMTQiICAgIC8+PC9nICA+PC9nPjwvc3ZnPg==';
	d.CYCLOHEXANE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAsMTApIiBjb2xvci1yZW5kZXJpbmc9Im9wdGltaXplUXVhbGl0eSIgY29sb3ItaW50ZXJwb2xhdGlvbj0ibGluZWFyUkdCIiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplU3BlZWQiICAgID48bGluZSB5Mj0iOC41IiBmaWxsPSJub25lIiB4MT0iLTcuMzYxMiIgeDI9Ii0wIiB5MT0iNC4yNSIgICAgICAvPjxsaW5lIHkyPSI0LjI1IiBmaWxsPSJub25lIiB4MT0iLTAiIHgyPSI3LjM2MTIiIHkxPSI4LjUiICAgICAgLz48bGluZSB5Mj0iLTQuMjUiIGZpbGw9Im5vbmUiIHgxPSI3LjM2MTIiIHgyPSI3LjM2MTIiIHkxPSI0LjI1IiAgICAgIC8+PGxpbmUgeTI9Ii04LjUiIGZpbGw9Im5vbmUiIHgxPSI3LjM2MTIiIHgyPSIwIiB5MT0iLTQuMjUiICAgICAgLz48bGluZSB5Mj0iLTQuMjUiIGZpbGw9Im5vbmUiIHgxPSIwIiB4Mj0iLTcuMzYxMiIgeTE9Ii04LjUiICAgICAgLz48bGluZSB5Mj0iNC4yNSIgZmlsbD0ibm9uZSIgeDE9Ii03LjM2MTIiIHgyPSItNy4zNjEyIiB5MT0iLTQuMjUiICAgIC8+PC9nICA+PC9nPjwvc3ZnPg==';
	d.CYCLOOCTANE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAsMTApIiBjb2xvci1yZW5kZXJpbmc9Im9wdGltaXplUXVhbGl0eSIgY29sb3ItaW50ZXJwb2xhdGlvbj0ibGluZWFyUkdCIiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplU3BlZWQiICAgID48bGluZSB5Mj0iNi4zNjQiIGZpbGw9Im5vbmUiIHgxPSItOSIgeDI9Ii02LjM2NCIgeTE9IjAiICAgICAgLz48bGluZSB5Mj0iOSIgZmlsbD0ibm9uZSIgeDE9Ii02LjM2NCIgeDI9Ii0wIiB5MT0iNi4zNjQiICAgICAgLz48bGluZSB5Mj0iNi4zNjQiIGZpbGw9Im5vbmUiIHgxPSItMCIgeDI9IjYuMzY0IiB5MT0iOSIgICAgICAvPjxsaW5lIHkyPSIwIiBmaWxsPSJub25lIiB4MT0iNi4zNjQiIHgyPSI5IiB5MT0iNi4zNjQiICAgICAgLz48bGluZSB5Mj0iLTYuMzY0IiBmaWxsPSJub25lIiB4MT0iOSIgeDI9IjYuMzY0IiB5MT0iMCIgICAgICAvPjxsaW5lIHkyPSItOSIgZmlsbD0ibm9uZSIgeDE9IjYuMzY0IiB4Mj0iMCIgeTE9Ii02LjM2NCIgICAgICAvPjxsaW5lIHkyPSItNi4zNjQiIGZpbGw9Im5vbmUiIHgxPSIwIiB4Mj0iLTYuMzY0IiB5MT0iLTkiICAgICAgLz48bGluZSB5Mj0iMCIgZmlsbD0ibm9uZSIgeDE9Ii02LjM2NCIgeDI9Ii05IiB5MT0iLTYuMzY0IiAgICAvPjwvZyAgPjwvZz48L3N2Zz4=';
	d.CYCLOPENTANE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAsMTApIiBjb2xvci1yZW5kZXJpbmc9Im9wdGltaXplUXVhbGl0eSIgY29sb3ItaW50ZXJwb2xhdGlvbj0ibGluZWFyUkdCIiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplU3BlZWQiICAgID48bGluZSB5Mj0iLTIuNzgxMiIgZmlsbD0ibm9uZSIgeDE9Ii0wIiB4Mj0iLTguNTU5NSIgeTE9Ii05IiAgICAgIC8+PGxpbmUgeTI9IjcuMjgxMiIgZmlsbD0ibm9uZSIgeDE9Ii04LjU1OTUiIHgyPSItNS4yOTAxIiB5MT0iLTIuNzgxMiIgICAgICAvPjxsaW5lIHkyPSI3LjI4MTIiIGZpbGw9Im5vbmUiIHgxPSItNS4yOTAxIiB4Mj0iNS4yOTAxIiB5MT0iNy4yODEyIiAgICAgIC8+PGxpbmUgeTI9Ii0yLjc4MTIiIGZpbGw9Im5vbmUiIHgxPSI1LjI5MDEiIHgyPSI4LjU1OTUiIHkxPSI3LjI4MTIiICAgICAgLz48bGluZSB5Mj0iLTkiIGZpbGw9Im5vbmUiIHgxPSI4LjU1OTUiIHgyPSItMCIgeTE9Ii0yLjc4MTIiICAgIC8+PC9nICA+PC9nPjwvc3ZnPg==';
	d.CYCLOPROPANE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAsMTApIHJvdGF0ZSg5MCkgdHJhbnNsYXRlKDIsMCkiIGNvbG9yLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiBjb2xvci1pbnRlcnBvbGF0aW9uPSJsaW5lYXJSR0IiIGltYWdlLXJlbmRlcmluZz0ib3B0aW1pemVTcGVlZCIgICAgPjxsaW5lIHkyPSI3Ljc5NDIiIGZpbGw9Im5vbmUiIHgxPSItOSIgeDI9IjQuNSIgeTE9IjAiICAgICAgLz48bGluZSB5Mj0iLTcuNzk0MiIgZmlsbD0ibm9uZSIgeDE9IjQuNSIgeDI9IjQuNSIgeTE9IjcuNzk0MiIgICAgICAvPjxsaW5lIHkyPSIwIiBmaWxsPSJub25lIiB4MT0iNC41IiB4Mj0iLTkiIHkxPSItNy43OTQyIiAgICAvPjwvZyAgPjwvZz48L3N2Zz4=';
	d.DECREASE_CHARGE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItaW50ZXJwb2xhdGlvbj0ibGluZWFyUkdCIiBjb2xvci1yZW5kZXJpbmc9Im9wdGltaXplUXVhbGl0eSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGltYWdlLXJlbmRlcmluZz0ib3B0aW1pemVTcGVlZCIgc3Ryb2tlLWxpbmVqb2luPSJiZXZlbCIgICAgPjxsaW5lIHkyPSIxMCIgZmlsbD0ibm9uZSIgeDE9IjYiIHgyPSIxNCIgeTE9IjEwIiAgICAgIC8+PGNpcmNsZSBmaWxsPSJub25lIiByPSI2IiBjeD0iMTAiIGN5PSIxMCIgICAgLz48L2cgID48L2c+PC9zdmc+';
	d.DISTANCE = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgk8Zz4JCQkJCTxjaXJjbGUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgY3g9IjEwLjUiIGN5PSIyLjUiIHI9IjIiLz4JCQkJCTxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSIxMC41IiB5MT0iNC41IiB4Mj0iNy41IiB5Mj0iMTIuNSIvPgkJCQkJPGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjEwLjUiIHkxPSI0LjUiIHgyPSIxMy41IiB5Mj0iMTIuNSIvPgkJCQkJPGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjguNjYzIiB5MT0iOS41IiB4Mj0iMTIuMzc1IiB5Mj0iOS41Ii8+CTwvZz4JCQk8cmVjdCB4PSIxLjUiIHk9IjE0LjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHdpZHRoPSIxOCIgaGVpZ2h0PSI1Ii8+CQkJPGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjMuNSIgeTE9IjE5LjUiIHgyPSIzLjUiIHkyPSIxNy41Ii8+CQkJPGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjUuNSIgeTE9IjE5LjUiIHgyPSI1LjUiIHkyPSIxNy41Ii8+CQkJPGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjcuNSIgeTE9IjE5LjUiIHgyPSI3LjUiIHkyPSIxNi41Ii8+CQkJPGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjkuNSIgeTE9IjE5LjUiIHgyPSI5LjUiIHkyPSIxNy41Ii8+CQkJPGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjExLjUiIHkxPSIxOS41IiB4Mj0iMTEuNSIgeTI9IjE3LjUiLz4JCQk8bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB4MT0iMTMuNSIgeTE9IjE5LjUiIHgyPSIxMy41IiB5Mj0iMTYuNSIvPgkJCTxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSIxNS41IiB5MT0iMTkuNSIgeDI9IjE1LjUiIHkyPSIxNy41Ii8+CQkJPGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjE3LjUiIHkxPSIxOS41IiB4Mj0iMTcuNSIgeTI9IjE3LjUiLz48L2c+PC9zdmc+';
	d.ERASE = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNNC40NjQsMTguNjU3CQlsLTMuNTM2LTMuNTM2Yy0wLjM5MS0wLjM5MS0wLjM5MS0xLjAyNCwwLTEuNDE0bDIuMTIxLTIuMTIxTDgsMTYuNTM2bC0yLjEyMSwyLjEyMUM1LjQ4OCwxOS4wNDcsNC44NTUsMTkuMDQ3LDQuNDY0LDE4LjY1N3oiLz4JCQk8cmVjdCB4PSIzLjUiIHk9IjguMDg2IiB0cmFuc2Zvcm09Im1hdHJpeCgwLjcwNzEgMC43MDcxIC0wLjcwNzEgMC43MDcxIDEwLjUzNTUgLTIuMjYzNSkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHdpZHRoPSI5IiBoZWlnaHQ9IjciLz4JCQk8bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB4MT0iMy43NTciIHkxPSI5LjQ2NCIgeDI9IjEwLjEyMSIgeTI9IjE1LjgyOCIvPgkJCTxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSI1Ljg3OSIgeTE9IjcuMzQzIiB4Mj0iMTIuMjQzIiB5Mj0iMTMuNzA3Ii8+CTxwb2x5bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9IgkJMTMuNjU3LDAuOTc5IDgsNi42MzYgMTIuOTUsMTEuNTg2IDE4LjYwNyw1LjkyOSAJIi8+CQkJPGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjEwLjUzNiIgeTE9IjkuMTcyIiB4Mj0iMTYuMTkyIiB5Mj0iMy41MTUiLz48L2c+PC9zdmc+';
	d.ESTEREO = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgZm9udC1zaXplPSI4cHgiIGZvbnQtZmFtaWx5PSInTHVjaWRhIEdyYW5kZSciIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGltYWdlLXJlbmRlcmluZz0ib3B0aW1pemVTcGVlZCIgICAgPjxwYXRoIGQ9Ik02Ljk1NyA2LjQ2MDkgUTYuMjY1NiA3LjA5NzcgNS42MjUgNy4wOTc3IFE1LjA5NzcgNy4wOTc3IDQuNzUgNi43Njc2IFE0LjQwMjMgNi40Mzc1IDQuNDAyMyA1LjkzMzYgUTQuNDAyMyA1LjIzODMgNC45ODYzIDQuODY1MiBRNS41NzAzIDQuNDkyMiA2LjY2MDIgNC40OTIyIEw2Ljg0MzggNC40OTIyIEw2Ljg0MzggMy45ODA1IFE2Ljg0MzggMy4yNDIyIDYuMDg1OSAzLjI0MjIgUTUuNDc2NiAzLjI0MjIgNC43Njk1IDMuNjE3MiBMNC43Njk1IDIuOTgwNSBRNS41NDY5IDIuNjY0MSA2LjIyNjYgMi42NjQxIFE2LjkzNzUgMi42NjQxIDcuMjc1NCAyLjk4NDQgUTcuNjEzMyAzLjMwNDcgNy42MTMzIDMuOTgwNSBMNy42MTMzIDUuOTAyMyBRNy42MTMzIDYuNTYyNSA4LjAxOTUgNi41NjI1IFE4LjA3MDMgNi41NjI1IDguMTY4IDYuNTQ2OSBMOC4yMjI3IDYuOTcyNyBRNy45NjA5IDcuMDk3NyA3LjY0NDUgNy4wOTc3IFE3LjEwNTUgNy4wOTc3IDYuOTU3IDYuNDYwOSBaTTYuODQzOCA2LjA0MyBMNi44NDM4IDQuOTQ1MyBMNi41ODU5IDQuOTM3NSBRNS45NTMxIDQuOTM3NSA1LjU2MjUgNS4xNzc3IFE1LjE3MTkgNS40MTggNS4xNzE5IDUuODA4NiBRNS4xNzE5IDYuMDg1OSA1LjM2NzIgNi4yNzczIFE1LjU2MjUgNi40Njg4IDUuODQzOCA2LjQ2ODggUTYuMzI0MiA2LjQ2ODggNi44NDM4IDYuMDQzIFpNOC43Njk1IDcuMDQ2OSBMOC43Njk1IDAuODMyIEw5LjUzOTEgMC44MzIgTDkuNTM5MSAzLjU1NDcgUTEwLjAxMTcgMi42NjQxIDEwLjk1NyAyLjY2NDEgUTExLjcyMjcgMi42NjQxIDEyLjE2MjEgMy4yMjI3IFExMi42MDE2IDMuNzgxMiAxMi42MDE2IDQuNzUgUTEyLjYwMTYgNS44MDQ3IDEyLjEwMzUgNi40NTEyIFExMS42MDU1IDcuMDk3NyAxMC43OTMgNy4wOTc3IFExMC4wMzkxIDcuMDk3NyA5LjUzOTEgNi41MTk1IEw5LjQ0NTMgNy4wNDY5IFpNOS41MzkxIDUuOTg4MyBRMTAuMTMyOCA2LjUxOTUgMTAuNjcxOSA2LjUxOTUgUTExLjc4MTIgNi41MTk1IDExLjc4MTIgNC44MjgxIFExMS43ODEyIDMuMzM1OSAxMC43OTY5IDMuMzM1OSBRMTAuMTUyMyAzLjMzNTkgOS41MzkxIDQuMDM1MiBaTTE0Ljg5NDUgNy4wOTc3IFExNC4zNjcyIDcuMDk3NyAxMy42MTMzIDYuODUxNiBMMTMuNjEzMyA2LjE0NDUgUTE0LjM2NzIgNi41MTk1IDE0LjkyNTggNi41MTk1IFExNS4yNTc4IDYuNTE5NSAxNS40NzY2IDYuMzM5OCBRMTUuNjk1MyA2LjE2MDIgMTUuNjk1MyA1Ljg5MDYgUTE1LjY5NTMgNS40OTYxIDE1LjA4MiA1LjIzODMgTDE0LjYzMjggNS4wNDY5IFExMy42MzY3IDQuNjMyOCAxMy42MzY3IDMuODU1NSBRMTMuNjM2NyAzLjMwMDggMTQuMDI5MyAyLjk4MjQgUTE0LjQyMTkgMi42NjQxIDE1LjEwNTUgMi42NjQxIFExNS40NjA5IDIuNjY0MSAxNS45ODQ0IDIuNzYxNyBMMTYuMTQ0NSAyLjc5MyBMMTYuMTQ0NSAzLjQzMzYgUTE1LjUgMy4yNDIyIDE1LjEyMTEgMy4yNDIyIFExNC4zNzg5IDMuMjQyMiAxNC4zNzg5IDMuNzgxMiBRMTQuMzc4OSA0LjEyODkgMTQuOTQxNCA0LjM2NzIgTDE1LjMxMjUgNC41MjM0IFExNS45NDE0IDQuNzg5MSAxNi4yMDMxIDUuMDg0IFExNi40NjQ4IDUuMzc4OSAxNi40NjQ4IDUuODIwMyBRMTYuNDY0OCA2LjM3ODkgMTYuMDIzNCA2LjczODMgUTE1LjU4MiA3LjA5NzcgMTQuODk0NSA3LjA5NzcgWiIgc3Ryb2tlPSJub25lIiAgICAgIC8+PHBhdGggZD0iTTguNDI5NyAxMy4wOTc3IFE3LjUxOTUgMTMuMDk3NyA2Ljk3NjYgMTIuNDk0MSBRNi40MzM2IDExLjg5MDYgNi40MzM2IDEwLjg3ODkgUTYuNDMzNiA5Ljg1NTUgNi45Nzg1IDkuMjU5OCBRNy41MjM0IDguNjY0MSA4LjQ1NyA4LjY2NDEgUTkuMzkwNiA4LjY2NDEgOS45MzU1IDkuMjU5OCBRMTAuNDgwNSA5Ljg1NTUgMTAuNDgwNSAxMC44NzExIFExMC40ODA1IDExLjkxMDIgOS45MzM2IDEyLjUwMzkgUTkuMzg2NyAxMy4wOTc3IDguNDI5NyAxMy4wOTc3IFpNOC40NDE0IDEyLjUxOTUgUTkuNjY0MSAxMi41MTk1IDkuNjY0MSAxMC44NzExIFE5LjY2NDEgOS4yNDIyIDguNDU3IDkuMjQyMiBRNy4yNTM5IDkuMjQyMiA3LjI1MzkgMTAuODc4OSBRNy4yNTM5IDEyLjUxOTUgOC40NDE0IDEyLjUxOTUgWk0xMS43Njk1IDEzIEwxMS43Njk1IDguNzU3OCBMMTIuNTM5MSA4Ljc1NzggTDEyLjUzOTEgOS41NTQ3IFExMi45OTYxIDguNjY0MSAxMy44NjcyIDguNjY0MSBRMTMuOTg0NCA4LjY2NDEgMTQuMTEzMyA4LjY4MzYgTDE0LjExMzMgOS40MDIzIFExMy45MTQxIDkuMzM1OSAxMy43NjE3IDkuMzM1OSBRMTMuMDMxMiA5LjMzNTkgMTIuNTM5MSAxMC4yMDMxIEwxMi41MzkxIDEzIFoiIHN0cm9rZT0ibm9uZSIgICAgICAvPjxwYXRoIGQ9Ik01Ljk1NyAxOC40NjA5IFE1LjI2NTYgMTkuMDk3NyA0LjYyNSAxOS4wOTc3IFE0LjA5NzcgMTkuMDk3NyAzLjc1IDE4Ljc2NzYgUTMuNDAyMyAxOC40Mzc1IDMuNDAyMyAxNy45MzM2IFEzLjQwMjMgMTcuMjM4MyAzLjk4NjMgMTYuODY1MiBRNC41NzAzIDE2LjQ5MjIgNS42NjAyIDE2LjQ5MjIgTDUuODQzOCAxNi40OTIyIEw1Ljg0MzggMTUuOTgwNSBRNS44NDM4IDE1LjI0MjIgNS4wODU5IDE1LjI0MjIgUTQuNDc2NiAxNS4yNDIyIDMuNzY5NSAxNS42MTcyIEwzLjc2OTUgMTQuOTgwNSBRNC41NDY5IDE0LjY2NDEgNS4yMjY2IDE0LjY2NDEgUTUuOTM3NSAxNC42NjQxIDYuMjc1NCAxNC45ODQ0IFE2LjYxMzMgMTUuMzA0NyA2LjYxMzMgMTUuOTgwNSBMNi42MTMzIDE3LjkwMjMgUTYuNjEzMyAxOC41NjI1IDcuMDE5NSAxOC41NjI1IFE3LjA3MDMgMTguNTYyNSA3LjE2OCAxOC41NDY5IEw3LjIyMjcgMTguOTcyNyBRNi45NjA5IDE5LjA5NzcgNi42NDQ1IDE5LjA5NzcgUTYuMTA1NSAxOS4wOTc3IDUuOTU3IDE4LjQ2MDkgWk01Ljg0MzggMTguMDQzIEw1Ljg0MzggMTYuOTQ1MyBMNS41ODU5IDE2LjkzNzUgUTQuOTUzMSAxNi45Mzc1IDQuNTYyNSAxNy4xNzc3IFE0LjE3MTkgMTcuNDE4IDQuMTcxOSAxNy44MDg2IFE0LjE3MTkgMTguMDg1OSA0LjM2NzIgMTguMjc3MyBRNC41NjI1IDE4LjQ2ODggNC44NDM4IDE4LjQ2ODggUTUuMzI0MiAxOC40Njg4IDUuODQzOCAxOC4wNDMgWk03Ljc2OTUgMTkgTDcuNzY5NSAxNC43NTc4IEw4LjUzOTEgMTQuNzU3OCBMOC41MzkxIDE1LjU1NDcgUTkuMTQ4NCAxNC42NjQxIDEwLjAzMTIgMTQuNjY0MSBRMTAuNTgyIDE0LjY2NDEgMTAuOTEwMiAxNS4wMTM3IFExMS4yMzgzIDE1LjM2MzMgMTEuMjM4MyAxNS45NTMxIEwxMS4yMzgzIDE5IEwxMC40Njg4IDE5IEwxMC40Njg4IDE2LjIwMzEgUTEwLjQ2ODggMTUuNzMwNSAxMC4zMzAxIDE1LjUyOTMgUTEwLjE5MTQgMTUuMzI4MSA5Ljg3MTEgMTUuMzI4MSBROS4xNjQxIDE1LjMyODEgOC41MzkxIDE2LjI1MzkgTDguNTM5MSAxOSBaTTE1LjQ5MjIgMTkgTDE1LjQ5MjIgMTguMjAzMSBRMTUuMDIzNCAxOS4wOTc3IDE0LjA3ODEgMTkuMDk3NyBRMTMuMzEyNSAxOS4wOTc3IDEyLjg3MyAxOC41MzkxIFExMi40MzM2IDE3Ljk4MDUgMTIuNDMzNiAxNy4wMTE3IFExMi40MzM2IDE1Ljk1MzEgMTIuOTMxNiAxNS4zMDg2IFExMy40Mjk3IDE0LjY2NDEgMTQuMjQyMiAxNC42NjQxIFExNC45OTYxIDE0LjY2NDEgMTUuNDkyMiAxNS4yNDIyIEwxNS40OTIyIDEyLjgzMiBMMTYuMjY1NiAxMi44MzIgTDE2LjI2NTYgMTkgWk0xNS40OTIyIDE1Ljc2OTUgUTE0Ljg5NDUgMTUuMjQyMiAxNC4zNTk0IDE1LjI0MjIgUTEzLjI1MzkgMTUuMjQyMiAxMy4yNTM5IDE2LjkzMzYgUTEzLjI1MzkgMTguNDIxOSAxNC4yMzgzIDE4LjQyMTkgUTE0Ljg3ODkgMTguNDIxOSAxNS40OTIyIDE3LjcyMjcgWiIgc3Ryb2tlPSJub25lIiAgICAvPjwvZyAgPjwvZz48L3N2Zz4=';
	d.FLIP_HOR = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgk8Zz4JCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0xNC43OTIsMTEuMzE3CQkJYy0yLjQzLTMuMi02LjM2Mi0zLjItOC43OTIsMCIvPgkJPHBvbHlsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50cz0iCQkJMTUuMTc0LDkuNzU3IDE1LjE3NCwxMS45MTcgMTMuMDE0LDExLjkxNyAJCSIvPgk8L2c+CTxwb2x5bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9IgkJMTAuNSwxMS40ODYgMTAuNSwxNy41IDIuNSwxNy41IDIuNSwyLjUgMTAuNSwyLjUgMTAuNSw2Ljg0IAkiLz4JPGc+CQk8Zz4JCQk8cGF0aCBkPSJNMTMsM2gtMC41QzEyLjIyNCwzLDEyLDIuNzc2LDEyLDIuNVMxMi4yMjQsMiwxMi41LDJIMTNjMC4yNzYsMCwwLjUsMC4yMjQsMC41LDAuNVMxMy4yNzYsMywxMywzeiIvPgkJPC9nPgkJPGc+CQkJPHBhdGggZD0iTTE2LDNoLTFjLTAuMjc2LDAtMC41LTAuMjI0LTAuNS0wLjVTMTQuNzI0LDIsMTUsMmgxYzAuMjc2LDAsMC41LDAuMjI0LDAuNSwwLjVTMTYuMjc2LDMsMTYsM3oiLz4JCTwvZz4JCTxnPgkJCTxwYXRoIGQ9Ik0xOC41LDMuNUMxOC4yMjQsMy41LDE4LDMuMjc2LDE4LDNjLTAuMjc2LDAtMC41LTAuMjI0LTAuNS0wLjVTMTcuNzI0LDIsMTgsMmgwLjVDMTguNzc2LDIsMTksMi4yMjQsMTksMi41VjMJCQkJQzE5LDMuMjc2LDE4Ljc3NiwzLjUsMTguNSwzLjV6Ii8+CQk8L2c+CQk8Zz4JCQk8cGF0aCBkPSJNMTguNSwxNS41Yy0wLjI3NiwwLTAuNS0wLjIyNC0wLjUtMC41di0xYzAtMC4yNzYsMC4yMjQtMC41LDAuNS0wLjVTMTksMTMuNzI0LDE5LDE0djFDMTksMTUuMjc2LDE4Ljc3NiwxNS41LDE4LjUsMTUuNQkJCQl6IE0xOC41LDEyLjVjLTAuMjc2LDAtMC41LTAuMjI0LTAuNS0wLjV2LTFjMC0wLjI3NiwwLjIyNC0wLjUsMC41LTAuNVMxOSwxMC43MjQsMTksMTF2MUMxOSwxMi4yNzYsMTguNzc2LDEyLjUsMTguNSwxMi41egkJCQkgTTE4LjUsOS41QzE4LjIyNCw5LjUsMTgsOS4yNzYsMTgsOVY4YzAtMC4yNzYsMC4yMjQtMC41LDAuNS0wLjVTMTksNy43MjQsMTksOHYxQzE5LDkuMjc2LDE4Ljc3Niw5LjUsMTguNSw5LjV6IE0xOC41LDYuNQkJCQlDMTguMjI0LDYuNSwxOCw2LjI3NiwxOCw2VjVjMC0wLjI3NiwwLjIyNC0wLjUsMC41LTAuNVMxOSw0LjcyNCwxOSw1djFDMTksNi4yNzYsMTguNzc2LDYuNSwxOC41LDYuNXoiLz4JCTwvZz4JCTxnPgkJCTxwYXRoIGQ9Ik0xOC41LDE4SDE4Yy0wLjI3NiwwLTAuNS0wLjIyNC0wLjUtMC41UzE3LjcyNCwxNywxOCwxN2MwLTAuMjc2LDAuMjI0LTAuNSwwLjUtMC41UzE5LDE2LjcyNCwxOSwxN3YwLjUJCQkJQzE5LDE3Ljc3NiwxOC43NzYsMTgsMTguNSwxOHoiLz4JCTwvZz4JCTxnPgkJCTxwYXRoIGQ9Ik0xNiwxOGgtMWMtMC4yNzYsMC0wLjUtMC4yMjQtMC41LTAuNVMxNC43MjQsMTcsMTUsMTdoMWMwLjI3NiwwLDAuNSwwLjIyNCwwLjUsMC41UzE2LjI3NiwxOCwxNiwxOHoiLz4JCTwvZz4JCTxnPgkJCTxwYXRoIGQ9Ik0xMywxOGgtMC41Yy0wLjI3NiwwLTAuNS0wLjIyNC0wLjUtMC41czAuMjI0LTAuNSwwLjUtMC41SDEzYzAuMjc2LDAsMC41LDAuMjI0LDAuNSwwLjVTMTMuMjc2LDE4LDEzLDE4eiIvPgkJPC9nPgk8L2c+CQkJPGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjEwLjUiIHkxPSIxNy41IiB4Mj0iMTAuNSIgeTI9IjE5LjUiLz4JCQk8bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB4MT0iMTAuNSIgeTE9IjIuNSIgeDI9IjEwLjUiIHkyPSIwLjUiLz48L2c+PC9zdmc+';
	d.FLIP_VER = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgk8Zz4JCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik04LjY4MywxMy43OTIJCQljMy4yLTIuNDMsMy4yLTYuMzYyLDAtOC43OTIiLz4JCTxwb2x5bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9IgkJCTEwLjI0MywxNC4xNzQgOC4wODMsMTQuMTc0IDguMDgzLDEyLjAxNCAJCSIvPgk8L2c+CTxwb2x5bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9IjguNTE0LDkuNSAJCTIuNSw5LjUgMi41LDEuNSAxNy41LDEuNSAxNy41LDkuNSAxMy4xNiw5LjUgCSIvPgk8Zz4JCTxnPgkJCTxwYXRoIGQ9Ik0xNy41LDEyLjVjLTAuMjc2LDAtMC41LTAuMjI0LTAuNS0wLjV2LTAuNWMwLTAuMjc2LDAuMjI0LTAuNSwwLjUtMC41czAuNSwwLjIyNCwwLjUsMC41VjEyCQkJCUMxOCwxMi4yNzYsMTcuNzc2LDEyLjUsMTcuNSwxMi41eiIvPgkJPC9nPgkJPGc+CQkJPHBhdGggZD0iTTE3LjUsMTUuNWMtMC4yNzYsMC0wLjUtMC4yMjQtMC41LTAuNXYtMWMwLTAuMjc2LDAuMjI0LTAuNSwwLjUtMC41UzE4LDEzLjcyNCwxOCwxNHYxQzE4LDE1LjI3NiwxNy43NzYsMTUuNSwxNy41LDE1LjUJCQkJeiIvPgkJPC9nPgkJPGc+CQkJPHBhdGggZD0iTTE3LjUsMThIMTdjLTAuMjc2LDAtMC41LTAuMjI0LTAuNS0wLjVTMTYuNzI0LDE3LDE3LDE3YzAtMC4yNzYsMC4yMjQtMC41LDAuNS0wLjVTMTgsMTYuNzI0LDE4LDE3djAuNQkJCQlDMTgsMTcuNzc2LDE3Ljc3NiwxOCwxNy41LDE4eiIvPgkJPC9nPgkJPGc+CQkJPHBhdGggZD0iTTE1LDE4aC0xYy0wLjI3NiwwLTAuNS0wLjIyNC0wLjUtMC41UzEzLjcyNCwxNywxNCwxN2gxYzAuMjc2LDAsMC41LDAuMjI0LDAuNSwwLjVTMTUuMjc2LDE4LDE1LDE4eiBNMTIsMThoLTEJCQkJYy0wLjI3NiwwLTAuNS0wLjIyNC0wLjUtMC41UzEwLjcyNCwxNywxMSwxN2gxYzAuMjc2LDAsMC41LDAuMjI0LDAuNSwwLjVTMTIuMjc2LDE4LDEyLDE4eiBNOSwxOEg4Yy0wLjI3NiwwLTAuNS0wLjIyNC0wLjUtMC41CQkJCVM3LjcyNCwxNyw4LDE3aDFjMC4yNzYsMCwwLjUsMC4yMjQsMC41LDAuNVM5LjI3NiwxOCw5LDE4eiBNNiwxOEg1Yy0wLjI3NiwwLTAuNS0wLjIyNC0wLjUtMC41UzQuNzI0LDE3LDUsMTdoMQkJCQljMC4yNzYsMCwwLjUsMC4yMjQsMC41LDAuNVM2LjI3NiwxOCw2LDE4eiIvPgkJPC9nPgkJPGc+CQkJPHBhdGggZD0iTTMsMThIMi41QzIuMjI0LDE4LDIsMTcuNzc2LDIsMTcuNVYxN2MwLTAuMjc2LDAuMjI0LTAuNSwwLjUtMC41UzMsMTYuNzI0LDMsMTdjMC4yNzYsMCwwLjUsMC4yMjQsMC41LDAuNQkJCQlTMy4yNzYsMTgsMywxOHoiLz4JCTwvZz4JCTxnPgkJCTxwYXRoIGQ9Ik0yLjUsMTUuNUMyLjIyNCwxNS41LDIsMTUuMjc2LDIsMTV2LTFjMC0wLjI3NiwwLjIyNC0wLjUsMC41LTAuNVMzLDEzLjcyNCwzLDE0djFDMywxNS4yNzYsMi43NzYsMTUuNSwyLjUsMTUuNXoiLz4JCTwvZz4JCTxnPgkJCTxwYXRoIGQ9Ik0yLjUsMTIuNUMyLjIyNCwxMi41LDIsMTIuMjc2LDIsMTJ2LTAuNUMyLDExLjIyNCwyLjIyNCwxMSwyLjUsMTFTMywxMS4yMjQsMywxMS41VjEyQzMsMTIuMjc2LDIuNzc2LDEyLjUsMi41LDEyLjV6Ii8+CQk8L2c+CTwvZz4JCQk8bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB4MT0iMi41IiB5MT0iOS41IiB4Mj0iMC41IiB5Mj0iOS41Ii8+CQkJPGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjE3LjUiIHkxPSI5LjUiIHgyPSIxOS41IiB5Mj0iOS41Ii8+PC9nPjwvc3ZnPg==';
	d.FLUORINE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgZm9udC1zaXplPSIxNHB4IiBmb250LWZhbWlseT0iJ0x1Y2lkYSBHcmFuZGUnIiBjb2xvci1pbnRlcnBvbGF0aW9uPSJsaW5lYXJSR0IiIGNvbG9yLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplU3BlZWQiICAgID48cGF0aCBkPSJNNy4zMDU3IDE1IEw3LjMwNTcgNC44ODI4IEwxMi45NTkgNC44ODI4IEwxMi45NTkgNS45NTYxIEw4Ljc0MTIgNS45NTYxIEw4Ljc0MTIgOS4zNDY3IEwxMi4yODIyIDkuMzQ2NyBMMTIuMjgyMiAxMC40MDYyIEw4Ljc0MTIgMTAuNDA2MiBMOC43NDEyIDE1IFoiIHN0cm9rZT0ibm9uZSIgICAgLz48L2cgID48L2c+PC9zdmc+';
	d.HYDROGEN = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgZm9udC1zaXplPSIxNHB4IiBmb250LWZhbWlseT0iJ0x1Y2lkYSBHcmFuZGUnIiBjb2xvci1pbnRlcnBvbGF0aW9uPSJsaW5lYXJSR0IiIGNvbG9yLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplU3BlZWQiICAgID48cGF0aCBkPSJNNi4zMDU3IDE1IEw2LjMwNTcgNC44ODI4IEw3Ljc0MTIgNC44ODI4IEw3Ljc0MTIgOS4xNDg0IEwxMi41NTM3IDkuMTQ4NCBMMTIuNTUzNyA0Ljg4MjggTDEzLjk4OTMgNC44ODI4IEwxMy45ODkzIDE1IEwxMi41NTM3IDE1IEwxMi41NTM3IDEwLjIyMTcgTDcuNzQxMiAxMC4yMjE3IEw3Ljc0MTIgMTUgWiIgc3Ryb2tlPSJub25lIiAgICAvPjwvZyAgPjwvZz48L3N2Zz4=';
	d.IMPLICITH = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgZm9udC1mYW1pbHk9IidMdWNpZGEgR3JhbmRlJyIgY29sb3ItaW50ZXJwb2xhdGlvbj0ibGluZWFyUkdCIiBjb2xvci1yZW5kZXJpbmc9Im9wdGltaXplUXVhbGl0eSIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PHBhdGggZD0iTTQuMTE5MSAxMyBMNC4xMTkxIDQuMzI4MSBMNS4zNDk2IDQuMzI4MSBMNS4zNDk2IDcuOTg0NCBMOS40NzQ2IDcuOTg0NCBMOS40NzQ2IDQuMzI4MSBMMTAuNzA1MSA0LjMyODEgTDEwLjcwNTEgMTMgTDkuNDc0NiAxMyBMOS40NzQ2IDguOTA0MyBMNS4zNDk2IDguOTA0MyBMNS4zNDk2IDEzIFoiIHN0cm9rZT0ibm9uZSIgICAgICAvPjxwYXRoIGQ9Ik0xMi40Mjk3IDE2IEwxNC40NDYzIDEzLjI2MDcgTDEyLjQ4ODMgMTAuNjk3MyBMMTMuNjMwOSAxMC42OTczIEwxNS4xNzg3IDEyLjczODMgTDE2LjU4MDEgMTAuNjk3MyBMMTcuNTE3NiAxMC42OTczIEwxNS42ODE2IDEzLjM4NzcgTDE3LjY3ODcgMTYgTDE2LjUzNjEgMTYgTDE0LjkzOTUgMTMuOTAwNCBMMTMuMzk2NSAxNiBaIiBzdHJva2U9Im5vbmUiICAgIC8+PC9nICA+PC9nPjwvc3ZnPg==';
	d.INCREASE_CHARGE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItaW50ZXJwb2xhdGlvbj0ibGluZWFyUkdCIiBjb2xvci1yZW5kZXJpbmc9Im9wdGltaXplUXVhbGl0eSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGltYWdlLXJlbmRlcmluZz0ib3B0aW1pemVTcGVlZCIgc3Ryb2tlLWxpbmVqb2luPSJiZXZlbCIgICAgPjxsaW5lIHkyPSIxMCIgZmlsbD0ibm9uZSIgeDE9IjYiIHgyPSIxNCIgeTE9IjEwIiAgICAgIC8+PGxpbmUgeTI9IjE0IiBmaWxsPSJub25lIiB4MT0iMTAiIHgyPSIxMCIgeTE9IjYiICAgICAgLz48Y2lyY2xlIGZpbGw9Im5vbmUiIHI9IjYiIGN4PSIxMCIgY3k9IjEwIiAgICAvPjwvZyAgPjwvZz48L3N2Zz4=';
	d.IODINE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgZm9udC1zaXplPSIxNHB4IiBmb250LWZhbWlseT0iJ0x1Y2lkYSBHcmFuZGUnIiBjb2xvci1pbnRlcnBvbGF0aW9uPSJsaW5lYXJSR0IiIGNvbG9yLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplU3BlZWQiICAgID48cGF0aCBkPSJNOS4yOTg4IDE1IEw5LjI5ODggNC44ODI4IEwxMC43MzQ0IDQuODgyOCBMMTAuNzM0NCAxNSBaIiBzdHJva2U9Im5vbmUiICAgIC8+PC9nICA+PC9nPjwvc3ZnPg==';
	d.ISOTOPE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgZm9udC1mYW1pbHk9IidMdWNpZGEgR3JhbmRlJyIgY29sb3ItaW50ZXJwb2xhdGlvbj0ibGluZWFyUkdCIiBjb2xvci1yZW5kZXJpbmc9Im9wdGltaXplUXVhbGl0eSIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PHBhdGggZD0iTTEzLjMzNCAxNS4yMTY4IFExMS4zMTI1IDE1LjIxNjggMTAuMjEwOSAxNC4wMzAzIFE5LjEwOTQgMTIuODQzOCA5LjEwOTQgMTAuNjY5OSBROS4xMDk0IDguNTAyIDEwLjIzMTQgNy4zMDY2IFExMS4zNTM1IDYuMTExMyAxMy4zOTI2IDYuMTExMyBRMTQuNTU4NiA2LjExMTMgMTYuMTIzIDYuNDkyMiBMMTYuMTIzIDcuNjQ2NSBRMTQuMzQxOCA3LjAzMTIgMTMuMzc1IDcuMDMxMiBRMTEuOTYyOSA3LjAzMTIgMTEuMTg5NSA3Ljk4NjMgUTEwLjQxNiA4Ljk0MTQgMTAuNDE2IDEwLjY4MTYgUTEwLjQxNiAxMi4zMzk4IDExLjI0MjIgMTMuMjk3OSBRMTIuMDY4NCAxNC4yNTU5IDEzLjQ5OCAxNC4yNTU5IFExNC43Mjg1IDE0LjI1NTkgMTYuMTM0OCAxMy41IEwxNi4xMzQ4IDE0LjU1NDcgUTE0Ljg1MTYgMTUuMjE2OCAxMy4zMzQgMTUuMjE2OCBaIiBzdHJva2U9Im5vbmUiICAgICAgLz48cGF0aCBkPSJNMi40Mjk3IDEwIEw0LjQ0NjMgNy4yNjA3IEwyLjQ4ODMgNC42OTczIEwzLjYzMDkgNC42OTczIEw1LjE3ODcgNi43MzgzIEw2LjU4MDEgNC42OTczIEw3LjUxNzYgNC42OTczIEw1LjY4MTYgNy4zODc3IEw3LjY3ODcgMTAgTDYuNTM2MSAxMCBMNC45Mzk1IDcuOTAwNCBMMy4zOTY1IDEwIFoiIHN0cm9rZT0ibm9uZSIgICAgLz48L2cgID48L2c+PC9zdmc+';
	d.LASSO = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMi4xNjcsNwkJYzAtMy4wMzgsMy42NTYtNS41LDguMTY3LTUuNVMxOC41LDMuOTYyLDE4LjUsN3MtMy42NTYsNS41LTguMTY3LDUuNWMtMS41NDEsMC0yLjk4My0wLjI4OC00LjIxMy0wLjc4NyIvPgkJCTxjaXJjbGUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgY3g9IjQuNSIgY3k9IjEwLjUiIHI9IjIiLz4JPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTYuNSwxOC41CQljMy0yLDIuNDQ4LTUuNDQ4LTAuMzk1LTYuNzQ5Ii8+PC9nPjwvc3ZnPg==';
	d.LASSO_SHAPES = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50cz0iMTUsOC41IAkxMC41LDE4LjUgMTkuNSwxOC41ICIvPjxnPgk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMTAuMzMzLDEyLjUJCWMtMS41NDEsMC0yLjk4My0wLjI4OC00LjIxMy0wLjc4NyIvPgk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMi4xNjcsNwkJYzAtMy4wMzgsMy42NTYtNS41LDguMTY3LTUuNVMxOC41LDMuOTYyLDE4LjUsN2MwLDAuNTItMC4xMDcsMS4wMjMtMC4zMDgsMS41Ii8+CQkJPGNpcmNsZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBjeD0iNC41IiBjeT0iMTAuNSIgcj0iMiIvPgk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNNi41LDE4LjUJCWMzLTIsMi40NDgtNS40NDgtMC4zOTUtNi43NDkiLz48L2c+PC9zdmc+';
	d.MARQUEE = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgk8cG9seWxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIwLjUsMy41IAkJMC41LDAuNSAzLjUsMC41IAkiLz4JCQk8bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB4MT0iOC41IiB5MT0iMC41IiB4Mj0iMTEuNSIgeTI9IjAuNSIvPgkJCTxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSI4LjUiIHkxPSIxOS41IiB4Mj0iMTEuNSIgeTI9IjE5LjUiLz4JCQk8bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB4MT0iMTkuNSIgeTE9IjExLjUiIHgyPSIxOS41IiB5Mj0iOC41Ii8+CQkJPGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjAuNSIgeTE9IjExLjUiIHgyPSIwLjUiIHkyPSI4LjUiLz4JPHBvbHlsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50cz0iMTkuNSwzLjUgCQkxOS41LDAuNSAxNi41LDAuNSAJIi8+CTxwb2x5bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9IjE5LjUsMTYuNSAJCTE5LjUsMTkuNSAxNi41LDE5LjUgCSIvPgk8cG9seWxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIwLjUsMTYuNSAJCTAuNSwxOS41IDMuNSwxOS41IAkiLz48L2c+PC9zdmc+';
	d.MOVE = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNNC41LDcuNXY1LjkwOQkJYzAsMi44MTEsMi4yNzksNS4wOTEsNS4wOTEsNS4wOTFoMGMyLjMwNiwwLDQuMzIzLTEuNTUsNC45MTgtMy43NzdMMTYuMzA0LDhsMCwwYy0xLjEzMS0wLjM5LTIuMzcxLDAuMTU5LTIuODQzLDEuMjU4TDEyLjUsMTEuNSIJCS8+CTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik00LjUsMTAuNXYtNAkJYzAtMC41NTIsMC40NDgtMSwxLTFoMGMwLjU1MiwwLDEsMC40NDgsMSwxdjMiLz4JPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTYuNSw5LjV2LTUJCWMwLTAuNTUyLDAuNDQ4LTEsMS0xaDBjMC41NTIsMCwxLDAuNDQ4LDEsMXY1Ii8+CTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik04LjUsOS41di03CQljMC0wLjU1MiwwLjQ0OC0xLDEtMWgwYzAuNTUyLDAsMSwwLjQ0OCwxLDF2NyIvPgk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMTAuNSw5LjV2LTYJCWMwLTAuNTUyLDAuNDQ4LTEsMS0xaDBjMC41NTIsMCwxLDAuNDQ4LDEsMXY4Ii8+PC9nPjwvc3ZnPg==';
	d.NITROGEN = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgZm9udC1zaXplPSIxNHB4IiBmb250LWZhbWlseT0iJ0x1Y2lkYSBHcmFuZGUnIiBjb2xvci1pbnRlcnBvbGF0aW9uPSJsaW5lYXJSR0IiIGNvbG9yLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplU3BlZWQiICAgID48cGF0aCBkPSJNNi4zMDU3IDE1IEw2LjMwNTcgNC44ODI4IEw3LjcxMzkgNC44ODI4IEwxMi44MDY2IDEyLjY5NjMgTDEyLjgwNjYgNC44ODI4IEwxNC4wMzcxIDQuODgyOCBMMTQuMDM3MSAxNSBMMTIuNjM1NyAxNSBMNy41MzYxIDcuMTg2NSBMNy41MzYxIDE1IFoiIHN0cm9rZT0ibm9uZSIgICAgLz48L2cgID48L2c+PC9zdmc+';
	d.OPEN = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMTQuOTI1LDE2LjVIMy4xNjIJCWMtMC43NDMsMC0xLjIyNy0wLjc4Mi0wLjg5NC0xLjQ0N2wzLTZDNS40MzYsOC43MTQsNS43ODMsOC41LDYuMTYyLDguNWgxMS43NjRjMC43NDMsMCwxLjIyNywwLjc4MiwwLjg5NCwxLjQ0N2wtMyw2CQlDMTUuNjUsMTYuMjg2LDE1LjMwNCwxNi41LDE0LjkyNSwxNi41eiIvPgk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMi4yNjcsMTUuMDUzbDMtNgkJQzUuNDM2LDguNzE0LDUuNzgzLDguNSw2LjE2MSw4LjVoOS4zODJ2LTJjMC0wLjU1Mi0wLjQ0OC0xLTEtMWgtN3YtMWMwLTAuNTUyLTAuNDQ4LTEtMS0xaC00Yy0wLjU1MiwwLTEsMC40NDgtMSwxdjExCQljMCwwLjU1MiwwLjQ0OCwxLDEsMWgwLjYxOEMyLjQxOCwxNi41LDEuOTM1LDE1LjcxOCwyLjI2NywxNS4wNTN6Ii8+PC9nPjwvc3ZnPg==';
	d.OPTIMIZE = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMTcuNSwxNS41aC0xNQkJYy0wLjU1MiwwLTEtMC40NDgtMS0xdjBjMC0wLjU1MiwwLjQ0OC0xLDEtMWgxNWMwLjU1MiwwLDEsMC40NDgsMSwxdjBDMTguNSwxNS4wNTIsMTguMDUyLDE1LjUsMTcuNSwxNS41eiIvPgk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMTcuNSwxMy41aC0xNXYwCQljMC0zLjg2NiwzLjEzNC03LDctN2g4VjEzLjV6Ii8+CTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik00LjkxNywxMS41CQljMC40MjQtMC45NjcsMS4xNDUtMS43NzYsMi4wNDctMi4zMDkiLz4JCQk8Y2lyY2xlIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGN4PSIxNCIgY3k9IjEwIiByPSIxLjUiLz4JPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTE0LjA4MywxLjVoLTIuMTY1CQlDMTAuMDMzLDEuNSw4LjUsMy4wMzMsOC41LDQuOTE3VjYuNWg5VjQuOTE3QzE3LjUsMy4wMzMsMTUuOTY3LDEuNSwxNC4wODMsMS41eiBNMTUuNSw2LjVoLTVWNC45MTcJCWMwLTAuNzgzLDAuNjM1LTEuNDE3LDEuNDE3LTEuNDE3aDIuMTY1YzAuNzgzLDAsMS40MTcsMC42MzUsMS40MTcsMS40MTdWNi41eiIvPjwvZz48L3N2Zz4=';
	d.OXYGEN = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgZm9udC1zaXplPSIxNHB4IiBmb250LWZhbWlseT0iJ0x1Y2lkYSBHcmFuZGUnIiBjb2xvci1pbnRlcnBvbGF0aW9uPSJsaW5lYXJSR0IiIGNvbG9yLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplU3BlZWQiICAgID48cGF0aCBkPSJNMTAuMzc5OSAxNS4yNTI5IFE4LjI3NDQgMTUuMjUyOSA2Ljk5MjcgMTMuNzkzNSBRNS43MTA5IDEyLjMzNCA1LjcxMDkgOS45MzQ2IFE1LjcxMDkgNy41MjE1IDYuOTk5NSA2LjA3NTcgUTguMjg4MSA0LjYyOTkgMTAuNDQxNCA0LjYyOTkgUTEyLjU4NzkgNC42Mjk5IDEzLjg3OTkgNi4wNzIzIFExNS4xNzE5IDcuNTE0NiAxNS4xNzE5IDkuOTIwOSBRMTUuMTcxOSAxMi4zNzUgMTMuODc5OSAxMy44MTQgUTEyLjU4NzkgMTUuMjUyOSAxMC4zNzk5IDE1LjI1MjkgWk0xMC40MDA0IDE0LjE3OTcgUTExLjk1MjEgMTQuMTc5NyAxMi43OTk4IDEzLjA2MiBRMTMuNjQ3NSAxMS45NDQzIDEzLjY0NzUgOS45MDcyIFExMy42NDc1IDcuOTMxNiAxMi43OTY0IDYuODE3NCBRMTEuOTQ1MyA1LjcwMzEgMTAuNDQxNCA1LjcwMzEgUTguOTMwNyA1LjcwMzEgOC4wODMgNi44MjA4IFE3LjIzNTQgNy45Mzg1IDcuMjM1NCA5LjkyNzcgUTcuMjM1NCAxMS45MTAyIDguMDc2MiAxMy4wNDQ5IFE4LjkxNyAxNC4xNzk3IDEwLjQwMDQgMTQuMTc5NyBaIiBzdHJva2U9Im5vbmUiICAgIC8+PC9nICA+PC9nPjwvc3ZnPg==';
	d.PASTE = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgk8cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9IjExLjUsNy41IAkJOC41LDcuNSA5LjUsMC41IDEwLjUsMC41IAkiLz4JPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTExLjUsOS41aC0zCQljLTAuNTUyLDAtMS0wLjQ0OC0xLTF2MGMwLTAuNTUyLDAuNDQ4LTEsMS0xaDNjMC41NTIsMCwxLDAuNDQ4LDEsMXYwQzEyLjUsOS4wNTIsMTIuMDUyLDkuNSwxMS41LDkuNXoiLz4JPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTEyLjE2Nyw5LjVINy44MzMJCWwtMS4xNTgsMC45OTNDNS45MjksMTEuMTMyLDUuNSwxMi4wNjUsNS41LDEzLjA0OFYxOC41YzAsMC41NTIsMC40NDgsMSwxLDFoN2MwLjU1MiwwLDEtMC40NDgsMS0xdi01LjQ1MgkJYzAtMC45ODItMC40MjktMS45MTYtMS4xNzUtMi41NTVMMTIuMTY3LDkuNXoiLz4JPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTEwLjUsMTcuNWgtMQkJYy0wLjU1MiwwLTEtMC40NDgtMS0xdi0zYzAtMC41NTIsMC40NDgtMSwxLTFoMWMwLjU1MiwwLDEsMC40NDgsMSwxdjNDMTEuNSwxNy4wNTIsMTEuMDUyLDE3LjUsMTAuNSwxNy41eiIvPjwvZz48L3N2Zz4=';
	d.PERIODIC_TABLE = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgkJCTxyZWN0IHg9IjAuNSIgeT0iMS41IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiLz4JCQk8cmVjdCB4PSIyLjUiIHk9IjMuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgd2lkdGg9IjIiIGhlaWdodD0iMiIvPgkJCTxyZWN0IHg9IjIuNSIgeT0iNS41IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIi8+CQkJPHJlY3QgeD0iMi41IiB5PSI3LjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiLz4JCQk8cmVjdCB4PSIyLjUiIHk9IjkuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgd2lkdGg9IjIiIGhlaWdodD0iMiIvPgkJCTxyZWN0IHg9IjIuNSIgeT0iMTEuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgd2lkdGg9IjIiIGhlaWdodD0iMiIvPgkJCTxyZWN0IHg9IjQuNSIgeT0iNS41IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIi8+CQkJPHJlY3QgeD0iNC41IiB5PSI3LjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiLz4JCQk8cmVjdCB4PSI0LjUiIHk9IjkuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgd2lkdGg9IjIiIGhlaWdodD0iMiIvPgkJCTxyZWN0IHg9IjQuNSIgeT0iMTEuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgd2lkdGg9IjIiIGhlaWdodD0iMiIvPgkJCTxyZWN0IHg9IjQuNSIgeT0iMTUuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgd2lkdGg9IjIiIGhlaWdodD0iMiIvPgkJCTxyZWN0IHg9IjYuNSIgeT0iMTUuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgd2lkdGg9IjIiIGhlaWdodD0iMiIvPgkJCTxyZWN0IHg9IjguNSIgeT0iMTUuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgd2lkdGg9IjIiIGhlaWdodD0iMiIvPgkJCTxyZWN0IHg9IjEwLjUiIHk9IjE1LjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiLz4JCQk8cmVjdCB4PSIxMi41IiB5PSIxNS41IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIi8+CQkJPHJlY3QgeD0iNi41IiB5PSI3LjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiLz4JCQk8cmVjdCB4PSI2LjUiIHk9IjkuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgd2lkdGg9IjIiIGhlaWdodD0iMiIvPgkJCTxyZWN0IHg9IjYuNSIgeT0iMTEuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgd2lkdGg9IjIiIGhlaWdodD0iMiIvPgkJCTxyZWN0IHg9IjguNSIgeT0iNy41IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIi8+CQkJPHJlY3QgeD0iOC41IiB5PSIzLjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiLz4JCQk8cmVjdCB4PSI4LjUiIHk9IjkuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgd2lkdGg9IjIiIGhlaWdodD0iMiIvPgkJCTxyZWN0IHg9IjguNSIgeT0iMTEuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgd2lkdGg9IjIiIGhlaWdodD0iMiIvPgkJCTxyZWN0IHg9IjEwLjUiIHk9IjcuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgd2lkdGg9IjIiIGhlaWdodD0iMiIvPgkJCTxyZWN0IHg9IjEwLjUiIHk9IjkuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgd2lkdGg9IjIiIGhlaWdodD0iMiIvPgkJCTxyZWN0IHg9IjEwLjUiIHk9IjExLjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiLz4JCQk8cmVjdCB4PSIxMi41IiB5PSI1LjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiLz4JCQk8cmVjdCB4PSIxMi41IiB5PSI3LjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiLz4JCQk8cmVjdCB4PSIxMi41IiB5PSI5LjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiLz4JCQk8cmVjdCB4PSIxMi41IiB5PSIxMS41IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIi8+CQkJPHJlY3QgeD0iMTQuNSIgeT0iNS41IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIi8+CQkJPHJlY3QgeD0iMTQuNSIgeT0iNy41IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIi8+CQkJPHJlY3QgeD0iMTQuNSIgeT0iOS41IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIi8+CQkJPHJlY3QgeD0iMTQuNSIgeT0iMTEuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgd2lkdGg9IjIiIGhlaWdodD0iMiIvPjwvZz48L3N2Zz4=';
	d.PERSPECTIVE = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgk8Zz4JCTxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50cz0iCQkJNC41NjQsNC4zMzQgNC41NjQsMTAuNDgxIDEwLjA2NCwxMy42NDEgMTUuNTY0LDEwLjQ4MSAxNS41NjQsNC4zMzQgMTAuMDY0LDEuMzU5IAkJIi8+CQk8cG9seWxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIJCQkxNS41NjQsNC4zMzQgMTAuMDY0LDcuMDUxIDQuNTY0LDQuMzM0IAkJIi8+CQkJCQk8bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB4MT0iMTAuMDY0IiB5MT0iMTMuNjQxIiB4Mj0iMTAuMDY0IiB5Mj0iNy4wNTEiLz4JPC9nPgk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNNy4zODQsMTYuNzc3CQljMC44MzUsMC4xNjYsMS43MzMsMC4yNTcsMi42OCwwLjI1N2M1LjA1NiwwLDguNzM5LTIuNjc4LDguNzM5LTUuMzVjMC0wLjk2OC0wLjQxMS0xLjg3Ny0xLjEzMS0yLjY2NAkJYy0wLjQzMi0wLjQ3Mi0wLjk3NS0wLjg5OS0xLjYwNy0xLjI2OSIvPgk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNNC4wNjIsNy43NTIJCWMtMC41OTgsMC4zNS0xLjExNiwwLjc1Mi0xLjUzNiwxLjE5M2MtMC43NjQsMC44MDMtMS4yMDEsMS43NC0xLjIwMSwyLjczOWMwLDEuNjgyLDEuMzgsMy4zMSwzLjYxMSw0LjMxOSIvPgk8cG9seWxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIJCTQuNTM3LDEzLjQyNCA1LjEyMywxNi4xMzYgMi40MDUsMTYuNTk0IAkiLz48L2c+PC9zdmc+';
	d.PHOSPHORUS = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgZm9udC1zaXplPSIxNHB4IiBmb250LWZhbWlseT0iJ0x1Y2lkYSBHcmFuZGUnIiBjb2xvci1pbnRlcnBvbGF0aW9uPSJsaW5lYXJSR0IiIGNvbG9yLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplU3BlZWQiICAgID48cGF0aCBkPSJNNy4zMDU3IDE1IEw3LjMwNTcgNC44ODI4IEwxMC4wNjA1IDQuODgyOCBRMTEuODkyNiA0Ljg4MjggMTIuNjkyNCA1LjUwMTUgUTEzLjQ5MjIgNi4xMjAxIDEzLjQ5MjIgNy41MzUyIFExMy40OTIyIDkuMTQ4NCAxMi4zOTg0IDEwLjA2NDUgUTExLjMwNDcgMTAuOTgwNSA5LjM2MzMgMTAuOTgwNSBMOC43Mjc1IDEwLjk4MDUgTDguNzI3NSAxNSBaTTguNzI3NSA5Ljg5MzYgTDkuMzA4NiA5Ljg5MzYgUTEwLjU4NjkgOS44OTM2IDExLjI4NDIgOS4zMDU3IFExMS45ODE0IDguNzE3OCAxMS45ODE0IDcuNjQ0NSBRMTEuOTgxNCA2LjczNTQgMTEuNDM0NiA2LjM0NTcgUTEwLjg4NzcgNS45NTYxIDkuNjA5NCA1Ljk1NjEgTDguNzI3NSA1Ljk1NjEgWiIgc3Ryb2tlPSJub25lIiAgICAvPjwvZyAgPjwvZz48L3N2Zz4=';
	d.PUSHER_BOND_FORMING = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PGNpcmNsZSByPSIxIiBjeD0iMiIgY3k9IjgiIHN0cm9rZT0ibm9uZSIgICAgICAvPjxjaXJjbGUgcj0iMSIgY3g9IjE4IiBjeT0iOCIgc3Ryb2tlPSJub25lIiAgICAgIC8+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTIgNSBDMiAtMiA2IC0yIDYgMTEiICAgICAgLz48cGF0aCBmaWxsPSJub25lIiBkPSJNMTggNSBDMTggLTIgMTQgLTIgMTQgMTEiICAgICAgLz48cGF0aCBkPSJNNiAxNSBMOC4yOTYxIDkuNDU2NyBDOC4yOTYxIDkuNDU2NyA3LjgzNjkgMTAuNTY1NCA2IDEwLjU2NTQgWiIgc3Ryb2tlPSJub25lIiAgICAgIC8+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTYgMTUgTDguMjk2MSA5LjQ1NjcgQzguMjk2MSA5LjQ1NjcgNy44MzY5IDEwLjU2NTQgNiAxMC41NjU0IFoiICAgICAgLz48cGF0aCBkPSJNMTQgMTUgTDExLjcwMzkgOS40NTY3IEMxMS43MDM5IDkuNDU2NyAxMi4xNjMxIDEwLjU2NTQgMTQgMTAuNTY1NCBaIiBzdHJva2U9Im5vbmUiICAgICAgLz48cGF0aCBmaWxsPSJub25lIiBkPSJNMTQgMTUgTDExLjcwMzkgOS40NTY3IEMxMS43MDM5IDkuNDU2NyAxMi4xNjMxIDEwLjU2NTQgMTQgMTAuNTY1NCBaIiAgICAgIC8+PGxpbmUgeTI9IjE4IiBmaWxsPSJub25lIiB4MT0iMSIgeDI9IjE5IiB5MT0iMTgiICAgICAgLz48bGluZSB5Mj0iMTkiIGZpbGw9Im5vbmUiIHgxPSIxIiB4Mj0iMTkiIHkxPSIxOSIgICAgLz48L2cgID48L2c+PC9zdmc+';
	d.PUSHER_DOUBLE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PGNpcmNsZSByPSIxIiBjeD0iMSIgY3k9IjE5IiBzdHJva2U9Im5vbmUiICAgICAgLz48Y2lyY2xlIHI9IjEiIGN4PSI1IiBjeT0iMTkiIHN0cm9rZT0ibm9uZSIgICAgICAvPjxwYXRoIGZpbGw9Im5vbmUiIGQ9Ik0zIDE2IEMzIC0zIDE2IC0zIDE2IDE1IiAgICAgIC8+PHBhdGggZD0iTTE2IDE3IEwxMy43MDM5IDExLjQ1NjcgQzEzLjcwMzkgMTEuNDU2NyAxNC4xNjMxIDEyLjU2NTQgMTYgMTIuNTY1NCBDMTcuODM2OSAxMi41NjU0IDE4LjI5NjEgMTEuNDU2NyAxOC4yOTYxIDExLjQ1NjcgWiIgc3Ryb2tlPSJub25lIiAgICAgIC8+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTE2IDE3IEwxMy43MDM5IDExLjQ1NjcgQzEzLjcwMzkgMTEuNDU2NyAxNC4xNjMxIDEyLjU2NTQgMTYgMTIuNTY1NCBDMTcuODM2OSAxMi41NjU0IDE4LjI5NjEgMTEuNDU2NyAxOC4yOTYxIDExLjQ1NjcgWiIgICAgLz48L2cgID48L2c+PC9zdmc+';
	d.PUSHER_SINGLE = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PGNpcmNsZSByPSIxIiBjeD0iMyIgY3k9IjE5IiBzdHJva2U9Im5vbmUiICAgICAgLz48cGF0aCBmaWxsPSJub25lIiBkPSJNMyAxNiBDMyAtMyAxNiAtMyAxNiAxNSIgICAgICAvPjxwYXRoIGQ9Ik0xNiAxNyBMMTguMjk2MSAxMS40NTY3IEMxOC4yOTYxIDExLjQ1NjcgMTcuODM2OSAxMi41NjU0IDE2IDEyLjU2NTQgWiIgc3Ryb2tlPSJub25lIiAgICAgIC8+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTE2IDE3IEwxOC4yOTYxIDExLjQ1NjcgQzE4LjI5NjEgMTEuNDU2NyAxNy44MzY5IDEyLjU2NTQgMTYgMTIuNTY1NCBaIiAgICAvPjwvZyAgPjwvZz48L3N2Zz4=';
	d.QUERY = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgk8Zz4JCTxwYXRoIGQ9Ik03LjA5MSwxLjk5OGMyLjk0MSwwLDUuNDE4LDIuNTU5LDUuNDE4LDYuMzQ2YzAsMy4xMTUtMS40Myw1LjM0Ny0zLjQ2Myw2LjIzYy0wLjY3MSwwLjI5MiwyLjIwNCwyLjA0MiwzLjk1NCwyLjI1djEJCQljLTAuMDAxLDAtMC4wMDIsMC0wLjAwMiwwYy0xLjEzMiwwLTQuNDIyLTAuMDAxLTYuMzU5LTIuODM4Yy0yLjk4OS0wLjE5My01LjE5NC0yLjg3OS01LjE5NC02LjQ0MgkJCUMxLjQ0NSw1LjIxNSwzLjQ2NiwxLjk5OCw3LjA5MSwxLjk5OCBNNy4yNTUsMTQuMjAyYzEuNjQ3LDAsMy4wMDUtMS43NSwzLjAwNS01LjMyMmMwLTMuODczLTEuNDYzLTYuMDg2LTMuNDQyLTYuMDg2CQkJYy0xLjcyMywwLTMuMTAyLDEuODc1LTMuMTAyLDUuMzMzQzMuNzE2LDExLjQ4NSw1LjAxMSwxNC4yMDIsNy4yNTUsMTQuMjAyIE03LjA5MSwwLjk5OGMtNC4zMTcsMC02LjY0NywzLjg4OC02LjY0Nyw3LjU0NgkJCWMwLDMuODk1LDIuMzQ4LDYuOTIyLDUuNjQ5LDcuMzljMi4yNTUsMi44OSw1LjczLDIuODksNi45MDQsMi44OWMwLjU1MiwwLDEuMDAyLTAuNDQ4LDEuMDAyLTF2LTEJCQljMC0wLjUwNy0wLjM3OS0wLjkzMy0wLjg4Mi0wLjk5M2MtMC43ODItMC4wOTMtMS44MjctMC41NjktMi41MzUtMC45ODVjMS44NTMtMS4zMywyLjkyNi0zLjY2OSwyLjkyNi02LjUwMQkJCUMxMy41MDksNC4xNTYsMTAuNzUsMC45OTgsNy4wOTEsMC45OThMNy4wOTEsMC45OTh6IE03LjI1NSwxMy4yMDJjLTEuNjY3LDAtMi41MzktMi41NTMtMi41MzktNS4wNzUJCQljMC0yLjU1MSwwLjg2NC00LjMzMywyLjEwMi00LjMzM2MxLjQ2MSwwLDIuNDQyLDIuMDQ0LDIuNDQyLDUuMDg2QzkuMjYsMTEuNDY2LDguNDU0LDEzLjIwMiw3LjI1NSwxMy4yMDJMNy4yNTUsMTMuMjAyeiIvPgk8L2c+CTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0xNS4xOTIsNy45NzgJCWMwLTEuMzE3LDEuMTgzLTIuMzU4LDIuNTQ0LTIuMTJjMC44NjYsMC4xNTIsMS41NzcsMC44NjMsMS43MjksMS43MjljMC4xOSwxLjA4MS0wLjQyOCwyLjA1LTEuMzUsMi40MDMJCWMtMC40NTEsMC4xNzMtMC43NjksMC41NzctMC43NjksMS4wNnYxLjIzNSIvPgk8Y2lyY2xlIGN4PSIxNy4zNDYiIGN5PSIxNC40MzkiIHI9IjAuNzE4Ii8+PC9nPjwvc3ZnPg==';
	d.REDO = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMTEuNSw3LjV2LTRsNyw2CQlsLTcsNnYtNEg4Ljc0M2MtMi43MTcsMC01LjMyMiwxLjA3OS03LjI0MywzbDAsMHYtMi4wMzFDMS41LDkuNzI1LDMuNzI1LDcuNSw2LjQ2OSw3LjVIMTEuNXoiLz48L2c+PC9zdmc+';
	d.REMOVE_LONE_PAIR = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJmFwb3M7RGlhbG9nJmFwb3M7IiBmb250LXN0eWxlPSJub3JtYWwiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIGZvbnQtc2l6ZT0iMTIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBpbWFnZS1yZW5kZXJpbmc9ImF1dG8iPjxkZWZzIGlkPSJnZW5lcmljRGVmcyIgIC8+PGcgID48ZyB0ZXh0LXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiBjb2xvci1yZW5kZXJpbmc9Im9wdGltaXplUXVhbGl0eSIgY29sb3ItaW50ZXJwb2xhdGlvbj0ibGluZWFyUkdCIiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplU3BlZWQiICAgID48Y2lyY2xlIGZpbGw9Im5vbmUiIHI9IjIiIGN4PSI2IiBjeT0iMTAiICAgICAgLz48Y2lyY2xlIGZpbGw9Im5vbmUiIHI9IjIiIGN4PSIxNCIgY3k9IjEwIiAgICAvPjwvZyAgPjwvZz48L3N2Zz4=';
	d.REMOVE_RADICAL = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJmFwb3M7RGlhbG9nJmFwb3M7IiBmb250LXN0eWxlPSJub3JtYWwiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIGZvbnQtc2l6ZT0iMTIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBpbWFnZS1yZW5kZXJpbmc9ImF1dG8iPjxkZWZzIGlkPSJnZW5lcmljRGVmcyIgIC8+PGcgID48ZyB0ZXh0LXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiBjb2xvci1yZW5kZXJpbmc9Im9wdGltaXplUXVhbGl0eSIgY29sb3ItaW50ZXJwb2xhdGlvbj0ibGluZWFyUkdCIiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplU3BlZWQiICAgID48Y2lyY2xlIGZpbGw9Im5vbmUiIHI9IjIiIGN4PSIxMCIgY3k9IjEwIiAgICAvPjwvZyAgPjwvZz48L3N2Zz4=';
	d.RING_ARBITRARY = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PGNpcmNsZSBmaWxsPSJub25lIiByPSI5IiBjeD0iMTAiIGN5PSIxMCIgICAgICAvPjxwYXRoIGQ9Ik03LjY1NDMgMTMuNSBMNy42NTQzIDcuMTM2NyBMOC44MDg2IDcuMTM2NyBMOC44MDg2IDguMzMyIFE5LjcyMjcgNi45OTYxIDExLjA0NjkgNi45OTYxIFExMS44NzMgNi45OTYxIDEyLjM2NTIgNy41MjA1IFExMi44NTc0IDguMDQ0OSAxMi44NTc0IDguOTI5NyBMMTIuODU3NCAxMy41IEwxMS43MDMxIDEzLjUgTDExLjcwMzEgOS4zMDQ3IFExMS43MDMxIDguNTk1NyAxMS40OTUxIDguMjkzOSBRMTEuMjg3MSA3Ljk5MjIgMTAuODA2NiA3Ljk5MjIgUTkuNzQ2MSA3Ljk5MjIgOC44MDg2IDkuMzgwOSBMOC44MDg2IDEzLjUgWiIgc3Ryb2tlPSJub25lIiAgICAvPjwvZyAgPjwvZz48L3N2Zz4=';
	d.SAVE = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMTcuNSwxOC41aC0xNAkJYy0wLjU1MiwwLTEtMC40NDgtMS0xdi0xNGMwLTAuNTUyLDAuNDQ4LTEsMS0xaDExbDQsNXYxMEMxOC41LDE4LjA1MiwxOC4wNTIsMTguNSwxNy41LDE4LjV6Ii8+CQkJPHJlY3QgeD0iNS41IiB5PSIxMC41IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iOCIvPgkJCTxyZWN0IHg9IjUuNSIgeT0iMi41IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB3aWR0aD0iNyIgaGVpZ2h0PSI0Ii8+CQkJPGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjcuNSIgeTE9IjEzLjUiIHgyPSIxMy41IiB5Mj0iMTMuNSIvPgkJCTxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSI3LjUiIHkxPSIxNS41IiB4Mj0iMTMuNSIgeTI9IjE1LjUiLz48L2c+PC9zdmc+';
	d.SEARCH = 'PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj4gIDx0aXRsZT5pQ2hlbUxhYnM8L3RpdGxlPiAgPGc+ICAgIDxjaXJjbGUgY3g9IjEwIiBjeT0iMyIgcj0iMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4gICAgPGNpcmNsZSBjeD0iMTciIGN5PSIxMC41IiByPSIyIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPiAgICA8Y2lyY2xlIGN4PSIxMCIgY3k9IjE3IiByPSIyIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPiAgICA8bGluZSB4MT0iMTEuNzA1IiB5MT0iNC44MjciIHgyPSIxNS4yOTUiIHkyPSI4LjY3MyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4gICAgPGxpbmUgeDE9IjE1LjE2OSIgeTE9IjEyLjIiIHgyPSIxMS43NjgiIHkyPSIxNS4yMzIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+ICA8L2c+ICA8cG9seWdvbiBwb2ludHM9IjUuNSA4LjUgNS41IDUuNSAwLjUgMTAgNS41IDE0LjUgNS41IDExLjUgOS41IDExLjUgOS41MzEgOC41IDUuNSA4LjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+';
	d.SETTINGS = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgk8cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9IgkJMTkuNSwxMS4zNTcgMTkuNSw4LjY0MyAxNi42NDksOC42NDMgMTUuNjU3LDYuMjYyIDE3LjY3Nyw0LjI0MiAxNS43NTgsMi4zMjMgMTMuNzM4LDQuMzQzIDExLjM1NywzLjM1MSAxMS4zNTcsMC41IDguNjQzLDAuNSAJCTguNjQzLDMuMzUxIDYuMjYyLDQuMzQzIDQuMjQyLDIuMzIzIDIuMzIzLDQuMjQyIDQuMzQzLDYuMjYyIDMuMzUxLDguNjQzIDAuNSw4LjY0MyAwLjUsMTEuMzU3IDMuMzUxLDExLjM1NyA0LjM0MywxMy43MzggCQkyLjMyMywxNS43NTggNC4yNDIsMTcuNjc3IDYuMjYyLDE1LjY1NyA4LjY0MywxNi42NDkgOC42NDMsMTkuNSAxMS4zNTcsMTkuNSAxMS4zNTcsMTYuNjQ5IDEzLjczOCwxNS42NTcgMTUuNzU4LDE3LjY3NyAJCTE3LjY3NywxNS43NTggMTUuNjU3LDEzLjczOCAxNi42NDksMTEuMzU3IAkiLz4JCQk8Y2lyY2xlIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGN4PSIxMCIgY3k9IjEwIiByPSIzLjE2NyIvPjwvZz48L3N2Zz4=';
	d.SILICON = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgZm9udC1zaXplPSIxNHB4IiBmb250LWZhbWlseT0iJ0x1Y2lkYSBHcmFuZGUnIiBjb2xvci1pbnRlcnBvbGF0aW9uPSJsaW5lYXJSR0IiIGNvbG9yLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplU3BlZWQiICAgID48cGF0aCBkPSJNNy4yODgxIDE1LjI1MjkgUTYuMjY5NSAxNS4yNTI5IDQuNjgzNiAxNC44MDg2IEw0LjY4MzYgMTMuMzg2NyBRNi4zOTI2IDE0LjE3OTcgNy40OTMyIDE0LjE3OTcgUTguMzQwOCAxNC4xNzk3IDguODU2OSAxMy43MzU0IFE5LjM3MyAxMy4yOTEgOS4zNzMgMTIuNTY2NCBROS4zNzMgMTEuOTcxNyA5LjAzNDcgMTEuNTU0NyBROC42OTYzIDExLjEzNzcgNy43ODcxIDEwLjYyNSBMNy4wODk4IDEwLjIyMTcgUTUuNzk3OSA5LjQ4MzQgNS4yNjgxIDguODMwNiBRNC43MzgzIDguMTc3NyA0LjczODMgNy4zMDk2IFE0LjczODMgNi4xNDA2IDUuNTg1OSA1LjM4NTMgUTYuNDMzNiA0LjYyOTkgNy43NDYxIDQuNjI5OSBROC45MTUgNC42Mjk5IDEwLjIxMzkgNS4wMTk1IEwxMC4yMTM5IDYuMzMyIFE4LjYxNDMgNS43MDMxIDcuODI4MSA1LjcwMzEgUTcuMDgzIDUuNzAzMSA2LjU5NzcgNi4wOTk2IFE2LjExMjMgNi40OTYxIDYuMTEyMyA3LjA5NzcgUTYuMTEyMyA3LjYwMzUgNi40Njc4IDcuOTkzMiBRNi44MjMyIDguMzgyOCA3Ljc2NjYgOC45MjI5IEw4LjQ5MTIgOS4zMzMgUTkuODAzNyAxMC4wNzgxIDEwLjMyMzIgMTAuNzQxMiBRMTAuODQyOCAxMS40MDQzIDEwLjg0MjggMTIuMzM0IFExMC44NDI4IDEzLjY1MzMgOS44Njg3IDE0LjQ1MzEgUTguODk0NSAxNS4yNTI5IDcuMjg4MSAxNS4yNTI5IFpNMTMuMzQ2NyAxNSBMMTMuMzQ2NyA3LjU3NjIgTDE0LjY5MzQgNy41NzYyIEwxNC42OTM0IDE1IFpNMTMuMzQ2NyA2LjIyOTUgTDEzLjM0NjcgNC44ODI4IEwxNC42OTM0IDQuODgyOCBMMTQuNjkzNCA2LjIyOTUgWiIgc3Ryb2tlPSJub25lIiAgICAvPjwvZyAgPjwvZz48L3N2Zz4=';
	d.STYLES = 'PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj4gIDx0aXRsZT5VbnRpdGxlZC0xPC90aXRsZT4gIDxnPiAgICA8cGF0aCBkPSJNNC41LDEzLjUsMywxOC41bC0xLjUtNVYzQTEuNSwxLjUsMCwwLDEsMywxLjVIM0ExLjUsMS41LDAsMCwxLDQuNSwzWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4gICAgPHJlY3QgeD0iMTMuNSIgeT0iMS41IiB3aWR0aD0iMyIgaGVpZ2h0PSIxNSIgcng9IjEuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4gICAgPGxpbmUgeDE9IjEuNSIgeTE9IjQuNSIgeDI9IjQuNSIgeTI9IjQuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4gICAgPGxpbmUgeDE9IjEuNSIgeTE9IjEzLjUiIHgyPSI0LjUiIHkyPSIxMy41IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPiAgICA8cGF0aCBkPSJNMTEuMzUyLDE0LjcyNGMuMTI1LDIuNS0yLjIzNy42MTItMS44ODgsMy45NjMsMCwwLTIuNTkxLTEuNzY5LTIuNTkxLTMuNTA4UzcuODI1LDEyLjAzMiw5LDEyLjAzMkEyLjY4MSwyLjY4MSwwLDAsMSwxMS4zNTIsMTQuNzI0WiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4gICAgPHBhdGggZD0iTTksMTIuMDMxYTEuODc4LDEuODc4LDAsMCwxLC45OTQuMzE1LDIxLjQ0NSwyMS40NDUsMCwwLDAsLjUwNi01LjFjMC0zLjk4MS0xLTUuNzUtMS01Ljc1aC0xYTE4LjI1MSwxOC4yNTEsMCwwLDAtMSw1Ljc1LDI1LjY3NSwyNS42NzUsMCwwLDAsLjU1Myw1LjEyNEExLjU4OSwxLjU4OSwwLDAsMSw5LDEyLjAzMVoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+ICAgIDxsaW5lIHgxPSIxMy41IiB5MT0iNy41IiB4Mj0iMTYuNSIgeTI9IjcuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4gICAgPHBhdGggZD0iTTE2LjUsMy41NDJoMGEyLDIsMCwwLDEsMiwyVjEwLjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+ICA8L2c+ICA8bGluZSB4MT0iMTUiIHkxPSIxNi41IiB4Mj0iMTUiIHkyPSIxOC41IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==';
	d.SULFUR = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgZm9udC1zaXplPSIxNHB4IiBmb250LWZhbWlseT0iJ0x1Y2lkYSBHcmFuZGUnIiBjb2xvci1pbnRlcnBvbGF0aW9uPSJsaW5lYXJSR0IiIGNvbG9yLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplU3BlZWQiICAgID48cGF0aCBkPSJNOS4yODgxIDE1LjI1MjkgUTguMjY5NSAxNS4yNTI5IDYuNjgzNiAxNC44MDg2IEw2LjY4MzYgMTMuMzg2NyBROC4zOTI2IDE0LjE3OTcgOS40OTMyIDE0LjE3OTcgUTEwLjM0MDggMTQuMTc5NyAxMC44NTY5IDEzLjczNTQgUTExLjM3MyAxMy4yOTEgMTEuMzczIDEyLjU2NjQgUTExLjM3MyAxMS45NzE3IDExLjAzNDcgMTEuNTU0NyBRMTAuNjk2MyAxMS4xMzc3IDkuNzg3MSAxMC42MjUgTDkuMDg5OCAxMC4yMjE3IFE3Ljc5NzkgOS40ODM0IDcuMjY4MSA4LjgzMDYgUTYuNzM4MyA4LjE3NzcgNi43MzgzIDcuMzA5NiBRNi43MzgzIDYuMTQwNiA3LjU4NTkgNS4zODUzIFE4LjQzMzYgNC42Mjk5IDkuNzQ2MSA0LjYyOTkgUTEwLjkxNSA0LjYyOTkgMTIuMjEzOSA1LjAxOTUgTDEyLjIxMzkgNi4zMzIgUTEwLjYxNDMgNS43MDMxIDkuODI4MSA1LjcwMzEgUTkuMDgzIDUuNzAzMSA4LjU5NzcgNi4wOTk2IFE4LjExMjMgNi40OTYxIDguMTEyMyA3LjA5NzcgUTguMTEyMyA3LjYwMzUgOC40Njc4IDcuOTkzMiBROC44MjMyIDguMzgyOCA5Ljc2NjYgOC45MjI5IEwxMC40OTEyIDkuMzMzIFExMS44MDM3IDEwLjA3ODEgMTIuMzIzMiAxMC43NDEyIFExMi44NDI4IDExLjQwNDMgMTIuODQyOCAxMi4zMzQgUTEyLjg0MjggMTMuNjUzMyAxMS44Njg3IDE0LjQ1MzEgUTEwLjg5NDUgMTUuMjUyOSA5LjI4ODEgMTUuMjUyOSBaIiBzdHJva2U9Im5vbmUiICAgIC8+PC9nICA+PC9nPjwvc3ZnPg==';
	d.TEMPLATES = 'PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj4gIDx0aXRsZT5pQ2hlbUxhYnM8L3RpdGxlPiAgPHBhdGggZD0iTTcsMTcuNTc4YTEuNSwxLjUsMCwwLDEsMC0zLDEuNDgzLDEuNDgzLDAsMCwxLC41LjA5MlYxMi41NzhINS40MDhhMS40NzksMS40NzksMCwwLDAsLjA5Mi0uNSwxLjUsMS41LDAsMCwwLTMsMCwxLjQ3OSwxLjQ3OSwwLDAsMCwuMDkyLjVILjV2N2g3VjE3LjQ4N0ExLjUwNywxLjUwNywwLDAsMSw3LDE3LjU3OFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+ICA8cGF0aCBkPSJNMi41LDEyLjA3OGExLjUsMS41LDAsMCwxLDMsMCwxLjQ3OSwxLjQ3OSwwLDAsMS0uMDkyLjVINy41VjEwLjQ4N0ExLjUsMS41LDAsMSwwLDgsNy41NzhhMS40ODMsMS40ODMsMCwwLDAtLjUuMDkyVjUuNTc4SC41djdIMi41OTJBMS40NzksMS40NzksMCwwLDEsMi41LDEyLjA3OFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+ICA8cGF0aCBkPSJNMTEuMzE4LDYuNTYxYTEuNSwxLjUsMCwxLDEsMS43LDIuNDFMMTQuNSwxMC40NWwxLjQ3OS0xLjQ3OWExLjUsMS41LDAsMSwwLDEuOTkyLTEuOTkyTDE5LjQ1LDUuNSwxNC41LjU1LDkuNTUsNS41bDEuNDc5LDEuNDc5QTEuNDg1LDEuNDg1LDAsMCwxLDExLjMxOCw2LjU2MVoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+ICA8cGF0aCBkPSJNMTIuNSwxMy4wNzhhMS41LDEuNSwwLDEsMS0yLjkwOC0uNUg3LjVWMTQuNjdhMS40ODMsMS40ODMsMCwwLDAtLjUtLjA5MiwxLjUsMS41LDAsMSwwLC41LDIuOTA5djIuMDkxaDd2LTdIMTIuNDA4QTEuNDg4LDEuNDg4LDAsMCwxLDEyLjUsMTMuMDc4WiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=';
	d.TEXT = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgk8Zz4JCQkJCTxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSIxNy41IiB5MT0iMS44MzUiIHgyPSIxNy41IiB5Mj0iMTguNDk4Ii8+CQkJCQk8bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB4MT0iMTUuNSIgeTE9IjEuNDk4IiB4Mj0iMTkuNSIgeTI9IjEuNDk4Ii8+CQkJCQk8bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB4MT0iMTUuNSIgeTE9IjE4LjQ5OCIgeDI9IjE5LjUiIHkyPSIxOC40OTgiLz4JPC9nPgk8Zz4JCTxnPgkJCTxwYXRoIGQ9Ik04LjI4MywzLjk5OGMxLjIyLDMuNDE0LDIuNDM0LDYuNzE1LDMuNjU4LDEwLjA5MWMwLjU5NCwxLjYzOCwwLjYwNiwxLjc1MiwyLjA2LDEuOTA5VjE3SDl2LTEuMDAyCQkJCWMxLjI0My0wLjEzNywxLjI4MS0wLjIxMiwxLjA1MS0wLjg4MmMtMC4yNDMtMC43MjktMC40MzgtMS4yOTktMC43MDgtMi4wNTVINS4xMDhjLTAuMTc2LDAuNTMtMC4zNDYsMC45NzMtMC41NTMsMS42NjIJCQkJQzQuMjM4LDE1Ljc1Niw0LjQ3OSwxNS44NjQsNiwxNS45OThWMTdIMXYtMS4wMDJjMS40MzEtMC4xODgsMS41NC0wLjEzNCwyLjIwNi0xLjg1N0w3LjAzMSwzLjk5OEg4LjI4MyBNNS40NDUsMTEuOTY5aDMuNTg2CQkJCUw3LjI0Niw2Ljg2NUM2Ljc0Niw4LjM1Niw1Ljk3NiwxMC40MjksNS40NDUsMTEuOTY5IE04LjI4MywyLjk5OEg3LjAzMWMtMC40MTYsMC0wLjc4OSwwLjI1OC0wLjkzNiwwLjY0N0wyLjI3LDEzLjc4OAkJCQljLTAuMDk5LDAuMjU2LTAuMzcsMC45NTgtMC40OTYsMS4wNjljLTAuMDc2LDAuMDQyLTAuNDI4LDAuMDg3LTAuNzM4LDAuMTI3TDAuODcsMTUuMDA2QzAuMzcyLDE1LjA3MSwwLDE1LjQ5NiwwLDE1Ljk5OFYxNwkJCQljMCwwLjU1MiwwLjQ0OCwxLDEsMWg1YzAuNTUyLDAsMS0wLjQ0OCwxLTF2LTEuMDAyYzAtMC41MTgtMC4zOTYtMC45NTEtMC45MTItMC45OTZjLTAuMTEtMC4wMS0wLjM0My0wLjAzLTAuNTU1LTAuMDU3CQkJCWMwLjEwNS0wLjM0MywwLjE5OS0wLjYyMiwwLjI5LTAuODg0aDIuODE0YzAuMTExLDAuMzE3LDAuMjEzLDAuNjE3LDAuMzIxLDAuOTM2Yy0wLjAyMiwwLjAwMi0wLjA0NCwwLjAwNS0wLjA2NiwwLjAwNwkJCQlDOC4zODQsMTUuMDYsOCwxNS40ODgsOCwxNS45OThWMTdjMCwwLjU1MiwwLjQ0OCwxLDEsMWg1YzAuNTUyLDAsMS0wLjQ0OCwxLTF2LTEuMDAyYzAtMC41MTEtMC4zODUtMC45NC0wLjg5My0wLjk5NAkJCQljLTAuMTY1LTAuMDE4LTAuNjY3LTAuMDcyLTAuNzc2LTAuMTMyYy0wLjA3NC0wLjA4NC0wLjI0Ny0wLjU2Mi0wLjQxNC0xLjAyM2wtMC4wMzYtMC4xYy0wLjQxMS0xLjEzNS0wLjgyMi0yLjI2My0xLjIzMi0zLjM4OQkJCQljLTAuODA4LTIuMjItMS42MTUtNC40MzQtMi40MjQtNi42OThDOS4wODIsMy4yNjMsOC43MDUsMi45OTgsOC4yODMsMi45OThMOC4yODMsMi45OTh6IE02Ljg1NywxMC45NjkJCQkJYzAuMTA4LTAuMzAyLDAuMjE5LTAuNjEyLDAuMzMtMC45MjJjMC4wMTktMC4wNTMsMC4wMzgtMC4xMDYsMC4wNTctMC4xNTlsMC4zNzgsMS4wODFINi44NTdMNi44NTcsMTAuOTY5eiIvPgkJPC9nPgk8L2c+PC9nPjwvc3ZnPg==';
	d.TORSION = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgk8cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9IgkJNS4zNjUsMTkuMzY1IDEuMzY1LDE2LjcyNyAxLjM2NSwxMS40NTIgNS4zNjUsMTQuMDg5IAkiLz4JPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTUuMzY1LDE5LjM2NQkJYzcuMjUsMCw3LjY3OS04Ljc5MiwxNC41LTguNzkybC00LTIuNjM4Yy01LDAtNS43NTUsNi4xNTUtMTAuNSw2LjE1NVYxOS4zNjV6Ii8+CTxnPgkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTEwLjI4NSwxMS4yNjYJCQljLTMuMTA4LTAuODc0LTYuNzAxLTEuNzY2LTguOTIsMC4xODVsNCwyLjYzOEM3LjYwNiwxNC4wODksOC45NTcsMTIuNzE1LDEwLjI4NSwxMS4yNjZ6Ii8+CQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMTIuNDcsMTUuMzI0CQkJYzIuNTY4LDAuNTg2LDUuMjAxLDAuOTE2LDcuMzk1LTAuMjk4di00LjQ1NEMxNi4yNywxMC41NzMsMTQuNDQ5LDEzLjAxNCwxMi40NywxNS4zMjR6Ii8+CTwvZz4JPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTcuNSwxLjE4NQkJQzYuNjUzLDIuNDc4LDYuNjY0LDUuMzc4LDkuMTE3LDUuNjIxczMuODM1LTEuMDA2LDQuMjgxLTIuODc4UzEwLjUtMS44NDgsOC43MTUsOC4yNjUiLz48L2c+PC9zdmc+';
	d.UNDO = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNOC41LDcuNXYtNGwtNyw2CQlsNyw2di00aDIuNzU3YzIuNzE3LDAsNS4zMjIsMS4wNzksNy4yNDMsM2wwLDB2LTIuMDMxYzAtMi43NDQtMi4yMjUtNC45NjktNC45NjktNC45NjlIOC41eiIvPjwvZz48L3N2Zz4=';
	d.VARIABLE_ATTACHMENT_POINTS = 'PHN2ZyBmaWxsLW9wYWNpdHk9IjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb2xvci1yZW5kZXJpbmc9ImF1dG8iIGNvbG9yLWludGVycG9sYXRpb249ImF1dG8iIHRleHQtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiB3aWR0aD0iMjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc2hhcGUtcmVuZGVyaW5nPSJhdXRvIiBzdHJva2Utb3BhY2l0eT0iMSIgZmlsbD0iYmxhY2siIHN0cm9rZS1kYXNoYXJyYXk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHN0cm9rZS13aWR0aD0iMSIgdmlld0JveD0iMCAwIDIwLjAgMjAuMCIgaGVpZ2h0PSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmb250LWZhbWlseT0iJ0RpYWxvZyciIGZvbnQtc3R5bGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZm9udC1zaXplPSIxMnB4IiBzdHJva2UtZGFzaG9mZnNldD0iMCIgaW1hZ2UtcmVuZGVyaW5nPSJhdXRvIj48ZGVmcyBpZD0iZ2VuZXJpY0RlZnMiICAvPjxnICA+PGcgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgY29sb3ItcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGNvbG9yLWludGVycG9sYXRpb249ImxpbmVhclJHQiIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIiAgICA+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTcgNiBMMTMgMTAgTDEzIDE2IEw3IDIwIEwxIDE2IEwxIDEwIFoiICAgICAgLz48Y2lyY2xlIGZpbGw9Im5vbmUiIHI9IjMiIGN4PSI3IiBjeT0iMTMiICAgICAgLz48bGluZSB5Mj0iNyIgZmlsbD0ibm9uZSIgeDE9IjciIHgyPSIxMyIgeTE9IjEzIiAgICAgIC8+PHBhdGggZD0iTTE0LjIxNTMgNiBMMTYuMjk4MyAyLjc5NjQgTDE0LjMwNzYgLTAuNTAzOSBMMTUuODg1MyAtMC41MDM5IEwxNy4yMDggMS42ODQ2IEwxOC42NDA2IC0wLjUwMzkgTDE5LjczNDkgLTAuNTAzOSBMMTcuNzM5NyAyLjU2MzUgTDE5LjgwNTIgNiBMMTguMjMxOSA2IEwxNi44MjEzIDMuNjc1MyBMMTUuMzA5NiA2IFoiIHN0cm9rZT0ibm9uZSIgICAgLz48L2cgID48L2c+PC9zdmc+';
	d.ZOOM_IN = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgkJCTxjaXJjbGUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgY3g9IjcuNSIgY3k9IjcuNSIgcj0iNyIvPgk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMTcuNDI3LDE4Ljk3MwkJbC01Ljc4Ny01Ljc4N2wxLjU0Ni0xLjU0Nmw1Ljc4Nyw1Ljc4N2MwLjQyNywwLjQyNywwLjQyNywxLjExOSwwLDEuNTQ2bDAsMEMxOC41NDYsMTkuNCwxNy44NTQsMTkuNCwxNy40MjcsMTguOTczeiIvPgkJCTxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSIzLjUiIHkxPSI3LjUiIHgyPSIxMS41IiB5Mj0iNy41Ii8+CQkJPGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjcuNSIgeTE9IjExLjUiIHgyPSI3LjUiIHkyPSIzLjUiLz48L2c+PC9zdmc+';
	d.ZOOM_OUT = 'PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIJIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPgkJCTxjaXJjbGUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgY3g9IjcuNSIgY3k9IjcuNSIgcj0iNyIvPgk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMTcuNDI3LDE4Ljk3MwkJbC01Ljc4Ny01Ljc4N2wxLjU0Ni0xLjU0Nmw1Ljc4Nyw1Ljc4N2MwLjQyNywwLjQyNywwLjQyNywxLjExOSwwLDEuNTQ2bDAsMEMxOC41NDYsMTkuNCwxNy44NTQsMTkuNCwxNy40MjcsMTguOTczeiIvPgkJCTxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSIzLjUiIHkxPSI3LjUiIHgyPSIxMS41IiB5Mj0iNy41Ii8+PC9nPjwvc3ZnPg==';

	d.DIALOG_CLOSE = 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgd2lkdGg9IjgwMHB4IiBoZWlnaHQ9IjgwMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8Zz4NCjxwYXRoIGQ9Ik03IDcuMDAwMDZMMTcgMTcuMDAwMU03IDE3LjAwMDFMMTcgNy4wMDAwNiIgc3Ryb2tlPSIjMjkyOTI5IiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+DQo8L2c+DQo8L3N2Zz4=';
	
	return d;

})(ChemDoodle.extensions);

ChemDoodle.uis.gui.templateDepot = (function(JSON, localStorage, undefined) {
	'use strict';
	let d = [];
	
	let group = {name:'Amino Acids', templates:[]};
	group.templates.push({
		name: 'Alanine <b>Ala</b> <i>A</i>',
		data: {"a":[{"x":195.34,"y":269},{"x":195.34,"y":289,"l":"N"},{"x":178.018,"y":259},{"x":212.66,"y":259},{"x":212.66,"y":239,"l":"O"},{"x":229.982,"y":269,"l":"O"}],"b":[{"b":0,"e":2},{"b":0,"e":3},{"b":0,"e":1},{"b":3,"e":5},{"b":3,"e":4,"o":2}]}
	});
	group.templates.push({
		name: 'Alanine <i>chain</i>',
		data: {"a":[{"x":-29.9995,"y":0,"l":"N"},{"x":-9.9989,"y":0},{"x":9.9989,"y":0},{"x":-9.9989,"y":20.0006},{"x":29.9995,"y":0,"l":"O"},{"x":9.9989,"y":-20.0006,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":1,"e":3},{"b":2,"e":4},{"b":2,"e":5,"o":2}]}
	});
	group.templates.push({
		name: 'Alanine <i>side chain</i>',
		data: {"a":[{"x":-10,"y":0},{"x":10,"y":0}],"b":[{"b":0,"e":1}]}
	});
	group.templates.push({
		name: 'Arginine <b>Arg</b> <i>R</i>',
		data: {"a":[{"x":134.718,"y":269,"l":"N"},{"x":152.04,"y":259},{"x":169.36,"y":269,"l":"N"},{"x":152.04,"y":239,"l":"N"},{"x":186.68,"y":259},{"x":204,"y":269},{"x":221.322,"y":259},{"x":238.642,"y":269},{"x":255.962,"y":259},{"x":238.642,"y":289,"l":"N"},{"x":273.282,"y":269,"l":"O"},{"x":255.962,"y":239,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":1,"e":3,"o":2},{"b":2,"e":4},{"b":4,"e":5},{"b":5,"e":6},{"b":7,"e":6},{"b":7,"e":8},{"b":7,"e":9},{"b":8,"e":10},{"b":8,"e":11,"o":2}]}
	});
	group.templates.push({
		name: 'Arginine <i>chain</i>',
		data: {"a":[{"x":-30.0001,"y":-49.9998,"l":"N"},{"x":-9.9991,"y":-49.9998},{"x":9.9991,"y":-49.9998},{"x":-9.9991,"y":-29.9988},{"x":9.9991,"y":-70.0007,"l":"O"},{"x":30.0001,"y":-49.9998,"l":"O"},{"x":-9.9991,"y":-10.0005},{"x":-9.9991,"y":10.0005},{"x":-9.9991,"y":29.9987,"l":"N"},{"x":-9.9991,"y":49.9997},{"x":-9.9991,"y":70.0007,"l":"N"},{"x":9.9991,"y":49.9997,"l":"N"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":1,"e":3},{"b":2,"e":5},{"b":2,"e":4,"o":2},{"b":3,"e":6},{"b":6,"e":7},{"b":7,"e":8},{"b":8,"e":9},{"b":9,"e":10},{"b":9,"e":11,"o":2}]}
	});
	group.templates.push({
		name: 'Arginine <i>side chain</i>',
		data: {"a":[{"x":-59.9973,"y":9.9986},{"x":-39.9973,"y":9.9986},{"x":-20,"y":9.9986},{"x":-0,"y":9.9986},{"x":19.9972,"y":9.9986,"l":"N"},{"x":39.9973,"y":9.9986},{"x":39.9973,"y":-9.9986,"l":"N"},{"x":59.9973,"y":9.9986,"l":"N"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":2,"e":3},{"b":3,"e":4},{"b":4,"e":5},{"b":5,"e":7},{"b":5,"e":6,"o":2}]}
	});
	group.templates.push({
		name: 'Asparagine <b>Asn</b> <i>N</i>',
		data: {"a":[{"x":178.02,"y":269},{"x":178.02,"y":289,"l":"N"},{"x":160.698,"y":259,"l":"O"},{"x":195.34,"y":259},{"x":212.66,"y":269},{"x":229.98,"y":259},{"x":212.66,"y":289,"l":"N"},{"x":247.302,"y":269,"l":"O"},{"x":229.98,"y":239,"l":"O"}],"b":[{"b":0,"e":3},{"b":0,"e":2,"o":2},{"b":0,"e":1},{"b":4,"e":3},{"b":4,"e":5},{"b":4,"e":6},{"b":5,"e":7},{"b":5,"e":8,"o":2}]}
	});
	group.templates.push({
		name: 'Asparagine <i>chain</i>',
		data: {"a":[{"x":-30.0002,"y":-19.9996,"l":"N"},{"x":-9.9991,"y":-19.9996},{"x":-9.9991,"y":0.0014},{"x":9.9991,"y":-19.9996},{"x":-9.9991,"y":19.9996},{"x":9.9991,"y":-40.0007,"l":"O"},{"x":30.0002,"y":-19.9997,"l":"O"},{"x":-9.9991,"y":40.0007,"l":"N"},{"x":9.9991,"y":19.9996,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":1,"e":2},{"b":3,"e":6},{"b":3,"e":5,"o":2},{"b":2,"e":4},{"b":4,"e":7},{"b":4,"e":8,"o":2}]}
	});
	group.templates.push({
		name: 'Asparagine <i>side chain</i>',
		data: {"a":[{"x":-29.9986,"y":9.9986},{"x":-9.9986,"y":9.9986},{"x":9.9986,"y":9.9986},{"x":29.9986,"y":9.9986,"l":"N"},{"x":9.9986,"y":-9.9986,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":2,"e":3},{"b":2,"e":4,"o":2}]}
	});
	group.templates.push({
		name: 'Aspartic Acid <b>Asp</b> <i>D</i>',
		data: {"a":[{"x":178.02,"y":269},{"x":178.02,"y":289,"l":"O"},{"x":195.34,"y":259},{"x":160.698,"y":259,"l":"O"},{"x":212.66,"y":269},{"x":229.98,"y":259},{"x":212.66,"y":289,"l":"N"},{"x":229.98,"y":239,"l":"O"},{"x":247.302,"y":269,"l":"O"}],"b":[{"b":0,"e":2},{"b":0,"e":3,"o":2},{"b":0,"e":1},{"b":4,"e":2},{"b":4,"e":5},{"b":4,"e":6},{"b":5,"e":8},{"b":5,"e":7,"o":2}]}
	});
	group.templates.push({
		name: 'Aspartic Acid <i>chain</i>',
		data: {"a":[{"x":-30.0002,"y":-19.9997,"l":"N"},{"x":-9.9991,"y":-19.9997},{"x":-9.9991,"y":0.0014},{"x":9.9991,"y":-19.9997},{"x":-9.9991,"y":19.9996},{"x":30.0002,"y":-19.9997,"l":"O"},{"x":9.9991,"y":-40.0007,"l":"O"},{"x":-9.9991,"y":40.0007,"l":"O"},{"x":9.9991,"y":19.9996,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":1,"e":2},{"b":3,"e":5},{"b":3,"e":6,"o":2},{"b":2,"e":4},{"b":4,"e":7},{"b":4,"e":8,"o":2}]}
	});
	group.templates.push({
		name: 'Aspartic Acid <i>side chain</i>',
		data: {"a":[{"x":-29.9986,"y":9.9986},{"x":-9.9986,"y":9.9986},{"x":9.9986,"y":9.9986},{"x":9.9986,"y":-9.9986,"l":"O"},{"x":29.9986,"y":9.9986,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":2,"e":4},{"b":2,"e":3,"o":2}]}
	});
	group.templates.push({
		name: 'Cysteine <b>Cys</b> <i>C</i>',
		data: {"a":[{"x":169.358,"y":269,"l":"S"},{"x":186.678,"y":259},{"x":203.998,"y":269},{"x":221.32,"y":259},{"x":203.998,"y":289,"l":"N"},{"x":221.32,"y":239,"l":"O"},{"x":238.642,"y":269,"l":"O"}],"b":[{"b":0,"e":1},{"b":2,"e":1},{"b":2,"e":3},{"b":2,"e":4},{"b":3,"e":6},{"b":3,"e":5,"o":2}]}
	});
	group.templates.push({
		name: 'Cysteine <i>chain</i>',
		data: {"a":[{"x":-30,"y":-9.9991,"l":"N"},{"x":-9.9991,"y":-9.9991},{"x":-9.9991,"y":10.0019},{"x":9.9991,"y":-9.9991},{"x":-9.9991,"y":30,"l":"S"},{"x":30,"y":-9.9991,"l":"O"},{"x":9.9991,"y":-30,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":1,"e":2},{"b":3,"e":5},{"b":3,"e":6,"o":2},{"b":2,"e":4}]}
	});
	group.templates.push({
		name: 'Cysteine <i>side chain</i>',
		data: {"a":[{"x":-19.9986,"y":0},{"x":0.0014,"y":0},{"x":19.9986,"y":0,"l":"S"}],"b":[{"b":0,"e":1},{"b":1,"e":2}]}
	});
	group.templates.push({
		name: 'Glutamic Acid <b>Glu</b> <i>E</i>',
		data: {"a":[{"x":152.038,"y":269,"l":"O"},{"x":169.358,"y":259},{"x":186.68,"y":269},{"x":169.358,"y":239,"l":"O"},{"x":204,"y":259},{"x":221.32,"y":269},{"x":238.642,"y":259},{"x":221.32,"y":289,"l":"N"},{"x":255.962,"y":269,"l":"O"},{"x":238.642,"y":239,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":1,"e":3,"o":2},{"b":2,"e":4},{"b":5,"e":4},{"b":5,"e":6},{"b":5,"e":7},{"b":6,"e":8},{"b":6,"e":9,"o":2}]}
	});
	group.templates.push({
		name: 'Glutamic Acid <i>chain</i>',
		data: {"a":[{"x":-30.0005,"y":-29.9991,"l":"N"},{"x":-9.9992,"y":-29.9991},{"x":-9.9992,"y":-9.9978},{"x":9.9993,"y":-29.9991},{"x":-9.9992,"y":10.0006},{"x":9.9992,"y":-50.0003,"l":"O"},{"x":30.0005,"y":-29.9991,"l":"O"},{"x":-9.9992,"y":30.0018},{"x":-9.9992,"y":50.0003,"l":"O"},{"x":9.9992,"y":30.0018,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":1,"e":2},{"b":3,"e":6},{"b":3,"e":5,"o":2},{"b":2,"e":4},{"b":4,"e":7},{"b":7,"e":8},{"b":7,"e":9,"o":2}]}
	});
	group.templates.push({
		name: 'Glutamic Acid <i>side chain</i>',
		data: {"a":[{"x":-40.0028,"y":10},{"x":-20,"y":10},{"x":0,"y":10},{"x":20.0028,"y":10},{"x":40.0028,"y":10,"l":"O"},{"x":20.0028,"y":-10,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":2,"e":3},{"b":3,"e":4},{"b":3,"e":5,"o":2}]}
	});
	group.templates.push({
		name: 'Glutamine <b>Gln</b> <i>Q</i>',
		data: {"a":[{"x":152.038,"y":269,"l":"N"},{"x":169.358,"y":259},{"x":186.68,"y":269},{"x":169.358,"y":239,"l":"O"},{"x":204,"y":259},{"x":221.32,"y":269},{"x":238.642,"y":259},{"x":221.32,"y":289,"l":"N"},{"x":238.642,"y":239,"l":"O"},{"x":255.962,"y":269,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":1,"e":3,"o":2},{"b":2,"e":4},{"b":5,"e":4},{"b":5,"e":6},{"b":5,"e":7},{"b":6,"e":9},{"b":6,"e":8,"o":2}]}
	});
	group.templates.push({
		name: 'Glutamine <i>chain</i>',
		data: {"a":[{"x":-30.0005,"y":-29.9991,"l":"N"},{"x":-9.9992,"y":-29.9991},{"x":9.9992,"y":-29.9991},{"x":-9.9992,"y":-9.9979},{"x":9.9992,"y":-50.0003,"l":"O"},{"x":30.0005,"y":-29.9991,"l":"O"},{"x":-9.9992,"y":10.0006},{"x":-9.9992,"y":30.0018},{"x":-9.9992,"y":50.0003,"l":"N"},{"x":9.9992,"y":30.0018,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":1,"e":3},{"b":2,"e":5},{"b":2,"e":4,"o":2},{"b":3,"e":6},{"b":6,"e":7},{"b":7,"e":8},{"b":7,"e":9,"o":2}]}
	});
	group.templates.push({
		name: 'Glutamine <i>side chain</i>',
		data: {"a":[{"x":-40.0028,"y":10},{"x":-20,"y":10},{"x":0,"y":10},{"x":20.0028,"y":10},{"x":40.0027,"y":10,"l":"N"},{"x":20.0028,"y":-10,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":2,"e":3},{"b":3,"e":4},{"b":3,"e":5,"o":2}]}
	});
	group.templates.push({
		name: 'Glycine <b>Gly</b> <i>G</i>',
		data: {"a":[{"x":186.678,"y":269},{"x":204,"y":259},{"x":186.678,"y":289,"l":"N"},{"x":221.322,"y":269,"l":"O"},{"x":204,"y":239,"l":"O"}],"b":[{"b":0,"e":1},{"b":0,"e":2},{"b":1,"e":3},{"b":1,"e":4,"o":2}]}
	});
	group.templates.push({
		name: 'Glycine <i>chain</i>',
		data: {"a":[{"x":-29.9995,"y":0,"l":"N"},{"x":-9.9989,"y":0},{"x":9.9989,"y":0},{"x":-9.9989,"y":20.0005,"l":"H"},{"x":29.9995,"y":0,"l":"O"},{"x":9.9989,"y":-20.0005,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":1,"e":3},{"b":2,"e":4},{"b":2,"e":5,"o":2}]}
	});
	group.templates.push({
		name: 'Glycine <i>side chain</i>',
		data: {"a":[{"x":-10,"y":0},{"x":10,"y":0,"l":"H"}],"b":[{"b":0,"e":1}]}
	});
	group.templates.push({
		name: 'Histidine <b>His</b> <i>H</i>',
		data: {"a":[{"x":185.186,"y":266.976},{"x":166.914,"y":258.84,"l":"N"},{"x":183.094,"y":286.866},{"x":202.506,"y":256.976},{"x":153.532,"y":273.704},{"x":163.532,"y":291.024,"l":"N"},{"x":219.826,"y":266.976},{"x":219.826,"y":286.976,"l":"N"},{"x":237.146,"y":256.976},{"x":254.468,"y":266.976,"l":"O"},{"x":237.146,"y":236.976,"l":"O"}],"b":[{"b":0,"e":3},{"b":0,"e":2,"o":2},{"b":0,"e":1},{"b":6,"e":3},{"b":2,"e":5},{"b":4,"e":1,"o":2},{"b":5,"e":4},{"b":6,"e":8},{"b":6,"e":7},{"b":8,"e":9},{"b":8,"e":10,"o":2}]}
	});
	group.templates.push({
		name: 'Histidine <i>chain</i>',
		data: {"a":[{"x":-30.009,"y":-25.4208,"l":"N"},{"x":-10.0021,"y":-25.4208},{"x":10.0021,"y":-25.4208},{"x":-10.0021,"y":-5.4138},{"x":30.009,"y":-25.4208,"l":"O"},{"x":10.0021,"y":-45.4277,"l":"O"},{"x":-10.0021,"y":14.5903},{"x":6.1209,"y":26.4104},{"x":-26.1636,"y":26.4104,"l":"N"},{"x":0.0179,"y":45.4277,"l":"N"},{"x":-19.9532,"y":45.4277}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":1,"e":3},{"b":2,"e":4},{"b":2,"e":5,"o":2},{"b":3,"e":6},{"b":6,"e":8},{"b":8,"e":10,"o":2},{"b":10,"e":9},{"b":9,"e":7},{"b":6,"e":7,"o":2}]}
	});
	group.templates.push({
		name: 'Histidine <i>side chain</i>',
		data: {"a":[{"x":-35.4168,"y":-0.0193},{"x":-15.4141,"y":-0.0193},{"x":4.5859,"y":-0.0193},{"x":16.4035,"y":16.1389,"l":"N"},{"x":16.4035,"y":-16.1389},{"x":35.4168,"y":9.9297},{"x":35.4168,"y":-10.0372,"l":"N"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":2,"e":3},{"b":3,"e":5,"o":2},{"b":5,"e":6},{"b":6,"e":4},{"b":2,"e":4,"o":2}]}
	});
	group.templates.push({
		name: 'Isoleucine <b>Ile</b> <i>I</i>',
		data: {"a":[{"x":178.02,"y":269},{"x":160.698,"y":259},{"x":195.34,"y":259},{"x":212.66,"y":269},{"x":195.34,"y":239},{"x":212.66,"y":289,"l":"N"},{"x":229.98,"y":259},{"x":247.302,"y":269,"l":"O"},{"x":229.98,"y":239,"l":"O"}],"b":[{"b":0,"e":2},{"b":0,"e":1},{"b":2,"e":3},{"b":2,"e":4},{"b":3,"e":6},{"b":3,"e":5},{"b":6,"e":7},{"b":6,"e":8,"o":2}]}
	});
	group.templates.push({
		name: 'Isoleucine <i>chain</i>',
		data: {"a":[{"x":-30.0002,"y":-19.9997,"l":"N"},{"x":-9.9991,"y":-19.9997},{"x":-9.9991,"y":0.0014},{"x":9.9991,"y":-19.9997},{"x":9.9991,"y":0.0014},{"x":-9.9991,"y":19.9997},{"x":9.9991,"y":-40.0007,"l":"O"},{"x":30.0002,"y":-19.9997,"l":"O"},{"x":-9.9991,"y":40.0007}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":1,"e":2},{"b":3,"e":7},{"b":3,"e":6,"o":2},{"b":2,"e":4},{"b":2,"e":5},{"b":5,"e":8}]}
	});
	group.templates.push({
		name: 'Isoleucine <i>side chain</i>',
		data: {"a":[{"x":-27.0711,"y":2.5882},{"x":-7.0711,"y":2.5882},{"x":7.0711,"y":16.7303},{"x":-1.8947,"y":-16.7303,"l":"H"},{"x":7.0711,"y":-11.554},{"x":27.0711,"y":16.7303}],"b":[{"b":0,"e":1},{"b":1,"e":4},{"b":1,"e":2},{"b":2,"e":5},{"b":1,"e":3}]}
	});
	group.templates.push({
		name: 'Leucine <b>Leu</b> <i>L</i>',
		data: {"a":[{"x":178.02,"y":269},{"x":178.02,"y":289},{"x":160.698,"y":259},{"x":195.34,"y":259},{"x":212.66,"y":269},{"x":212.66,"y":289,"l":"N"},{"x":229.98,"y":259},{"x":247.302,"y":269,"l":"O"},{"x":229.98,"y":239,"l":"O"}],"b":[{"b":0,"e":3},{"b":0,"e":2},{"b":0,"e":1},{"b":4,"e":3},{"b":4,"e":6},{"b":4,"e":5},{"b":6,"e":7},{"b":6,"e":8,"o":2}]}
	});
	group.templates.push({
		name: 'Leucine <i>chain</i>',
		data: {"a":[{"x":-30.0002,"y":-19.9997,"l":"N"},{"x":-9.9991,"y":-19.9997},{"x":-9.9991,"y":0.0013},{"x":9.9991,"y":-19.9997},{"x":-9.9991,"y":19.9996},{"x":9.9991,"y":-40.0007,"l":"O"},{"x":30.0002,"y":-19.9997,"l":"O"},{"x":-9.9992,"y":40.0007},{"x":9.9991,"y":19.9996}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":1,"e":2},{"b":3,"e":6},{"b":3,"e":5,"o":2},{"b":2,"e":4},{"b":4,"e":8},{"b":4,"e":7}]}
	});
	group.templates.push({
		name: 'Leucine <i>side chain</i>',
		data: {"a":[{"x":-29.9986,"y":9.9986},{"x":-9.9986,"y":9.9986},{"x":9.9986,"y":9.9986},{"x":29.9986,"y":9.9986},{"x":9.9986,"y":-9.9986}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":2,"e":4},{"b":2,"e":3}]}
	});
	group.templates.push({
		name: 'Lysine <b>Lys</b> <i>K</i>',
		data: {"a":[{"x":160.698,"y":269},{"x":143.378,"y":259,"l":"N"},{"x":178.02,"y":259},{"x":195.34,"y":269},{"x":212.66,"y":259},{"x":229.98,"y":269},{"x":247.302,"y":259},{"x":229.98,"y":289,"l":"N"},{"x":264.622,"y":269,"l":"O"},{"x":247.302,"y":239,"l":"O"}],"b":[{"b":0,"e":2},{"b":0,"e":1},{"b":2,"e":3},{"b":3,"e":4},{"b":5,"e":4},{"b":5,"e":6},{"b":5,"e":7},{"b":6,"e":8},{"b":6,"e":9,"o":2}]}
	});
	group.templates.push({
		name: 'Lysine <i>chain</i>',
		data: {"a":[{"x":-30,"y":-39.9991,"l":"N"},{"x":-9.9991,"y":-39.9991},{"x":-9.9991,"y":-19.9982},{"x":9.9991,"y":-39.9991},{"x":-9.9991,"y":-0},{"x":30,"y":-39.9991,"l":"O"},{"x":9.9991,"y":-60,"l":"O"},{"x":-9.9991,"y":20.0009},{"x":-9.9991,"y":39.9991},{"x":-9.9991,"y":60.0001,"l":"N"}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":1,"e":2},{"b":3,"e":5},{"b":3,"e":6,"o":2},{"b":2,"e":4},{"b":4,"e":7},{"b":7,"e":8},{"b":8,"e":9}]}
	});
	group.templates.push({
		name: 'Lysine <i>side chain</i>',
		data: {"a":[{"x":-49.9973,"y":0},{"x":-29.9973,"y":0},{"x":-10,"y":0},{"x":10,"y":0},{"x":29.9973,"y":0},{"x":49.9973,"y":0,"l":"N"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":2,"e":3},{"b":3,"e":4},{"b":4,"e":5}]}
	});
	group.templates.push({
		name: 'Methionine <b>Met</b> <i>M</i>',
		data: {"a":[{"x":169.36,"y":259,"l":"S"},{"x":152.038,"y":269},{"x":186.68,"y":269},{"x":204,"y":259},{"x":221.32,"y":269},{"x":221.32,"y":289,"l":"N"},{"x":238.642,"y":259},{"x":255.962,"y":269,"l":"O"},{"x":238.642,"y":239,"l":"O"}],"b":[{"b":0,"e":1},{"b":0,"e":2},{"b":2,"e":3},{"b":4,"e":3},{"b":4,"e":6},{"b":4,"e":5},{"b":6,"e":7},{"b":6,"e":8,"o":2}]}
	});
	group.templates.push({
		name: 'Methionine <i>chain</i>',
		data: {"a":[{"x":-30.0002,"y":-29.9989,"l":"N"},{"x":-9.9992,"y":-29.9989},{"x":9.9991,"y":-29.9989},{"x":-9.9991,"y":-9.9978},{"x":9.9991,"y":-49.9999,"l":"O"},{"x":30.0002,"y":-29.9989,"l":"O"},{"x":-9.9991,"y":10.0004},{"x":-9.9991,"y":30.0015,"l":"S"},{"x":-9.9992,"y":49.9998}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":1,"e":3},{"b":2,"e":5},{"b":2,"e":4,"o":2},{"b":3,"e":6},{"b":6,"e":7},{"b":7,"e":8}]}
	});
	group.templates.push({
		name: 'Methionine <i>side chain</i>',
		data: {"a":[{"x":-39.9972,"y":0},{"x":-19.9972,"y":0},{"x":0,"y":0},{"x":20,"y":0,"l":"S"},{"x":39.9972,"y":0}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":2,"e":3},{"b":3,"e":4}]}
	});
	group.templates.push({
		name: 'Phenylalanine <b>Phe</b> <i>F</i>',
		data: {"a":[{"x":186.678,"y":264},{"x":169.358,"y":254},{"x":186.678,"y":284},{"x":204,"y":254},{"x":152.04,"y":264},{"x":169.358,"y":294},{"x":221.322,"y":264},{"x":152.04,"y":284},{"x":238.64,"y":254},{"x":221.322,"y":284,"l":"N"},{"x":255.96,"y":264,"l":"O"},{"x":238.64,"y":234,"l":"O"}],"b":[{"b":0,"e":2,"o":2},{"b":0,"e":1},{"b":0,"e":3},{"b":2,"e":5},{"b":4,"e":1,"o":2},{"b":6,"e":3},{"b":5,"e":7,"o":2},{"b":7,"e":4},{"b":6,"e":8},{"b":6,"e":9},{"b":8,"e":10},{"b":8,"e":11,"o":2}]}
	});
	group.templates.push({
		name: 'Phenylalanine <i>chain</i>',
		data: {"a":[{"x":-29.9902,"y":-30.0426,"l":"N"},{"x":-9.9958,"y":-30.0426},{"x":-9.9958,"y":-10.0482},{"x":9.9958,"y":-30.0426},{"x":-9.9958,"y":9.9435},{"x":29.9902,"y":-30.0426,"l":"O"},{"x":9.9958,"y":-50.037,"l":"O"},{"x":-27.3098,"y":19.993},{"x":7.2823,"y":19.993},{"x":-27.3098,"y":40.0232},{"x":7.2823,"y":40.0232},{"x":-9.9958,"y":50.037}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":1,"e":2},{"b":3,"e":5},{"b":3,"e":6,"o":2},{"b":2,"e":4},{"b":4,"e":7,"o":2},{"b":7,"e":9},{"b":9,"e":11,"o":2},{"b":11,"e":10},{"b":10,"e":8,"o":2},{"b":4,"e":8}]}
	});
	group.templates.push({
		name: 'Phenylalanine <i>side chain</i>',
		data: {"a":[{"x":-40.0373,"y":-0.0179},{"x":-20.0442,"y":-0.0179},{"x":-0.0537,"y":-0.0179},{"x":9.9952,"y":17.295},{"x":9.9952,"y":-17.295},{"x":30.0242,"y":17.295},{"x":30.0242,"y":-17.295},{"x":40.0373,"y":-0.0179}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":2,"e":3,"o":2},{"b":3,"e":5},{"b":5,"e":7,"o":2},{"b":7,"e":6},{"b":6,"e":4,"o":2},{"b":2,"e":4}]}
	});
	group.templates.push({
		name: 'Proline <b>Pro</b> <i>P</i>',
		data: {"a":[{"x":202.506,"y":266.976},{"x":184.236,"y":258.84},{"x":200.414,"y":286.866,"l":"N"},{"x":219.828,"y":256.976},{"x":170.854,"y":273.704},{"x":180.854,"y":291.024},{"x":237.148,"y":266.976,"l":"O"},{"x":219.828,"y":236.976,"l":"O"}],"b":[{"b":0,"e":2},{"b":0,"e":1},{"b":0,"e":3},{"b":2,"e":5},{"b":4,"e":1},{"b":5,"e":4},{"b":3,"e":6},{"b":3,"e":7,"o":2}]}
	});
	group.templates.push({
		name: 'Proline <i>chain</i>',
		data: {"a":[{"x":14.9378,"y":29.9651},{"x":14.9378,"y":9.9874},{"x":-4.0875,"y":36.1665},{"x":-4.0875,"y":3.786},{"x":-15.8902,"y":19.9597,"l":"N"},{"x":-4.0875,"y":-16.1888},{"x":15.8902,"y":-16.1888,"l":"O"},{"x":-4.0875,"y":-36.1665,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":3,"e":4},{"b":4,"e":2},{"b":0,"e":2},{"b":3,"e":5},{"b":5,"e":6},{"b":5,"e":7,"o":2}]}
	});
	group.templates.push({
		name: 'Proline <i>side chain</i>',
		data: {"a":[{"x":15.4059,"y":9.9836},{"x":15.4059,"y":-9.9836},{"x":-3.6094,"y":16.1817},{"x":-3.6094,"y":-16.1817},{"x":-15.4059,"y":-0.0165}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":4,"e":2},{"b":0,"e":2}]}
	});
	group.templates.push({
		name: 'Serine <b>Ser</b> <i>S</i>',
		data: {"a":[{"x":204.002,"y":269},{"x":221.322,"y":259},{"x":186.678,"y":259},{"x":204.002,"y":289,"l":"N"},{"x":238.642,"y":269,"l":"O"},{"x":221.322,"y":239,"l":"O"},{"x":169.358,"y":269,"l":"O"}],"b":[{"b":0,"e":2},{"b":0,"e":1},{"b":0,"e":3},{"b":2,"e":6},{"b":1,"e":4},{"b":1,"e":5,"o":2}]}
	});
	group.templates.push({
		name: 'Serine <i>chain</i>',
		data: {"a":[{"x":-30,"y":-9.9991,"l":"N"},{"x":-9.9991,"y":-9.9991},{"x":9.9991,"y":-9.9991},{"x":-9.9991,"y":10.0019},{"x":30,"y":-9.9991,"l":"O"},{"x":9.9991,"y":-29.9999,"l":"O"},{"x":-9.9991,"y":30,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":1,"e":3},{"b":2,"e":4},{"b":2,"e":5,"o":2},{"b":3,"e":6}]}
	});
	group.templates.push({
		name: 'Serine <i>side chain</i>',
		data: {"a":[{"x":-19.9986,"y":0},{"x":0.0014,"y":0},{"x":19.9986,"y":0,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":2}]}
	});
	group.templates.push({
		name: 'Threonine <b>Thr</b> <i>T</i>',
		data: {"a":[{"x":204.002,"y":269},{"x":221.322,"y":259},{"x":204.002,"y":289,"l":"N"},{"x":186.68,"y":259},{"x":221.322,"y":239,"l":"O"},{"x":238.642,"y":269,"l":"O"},{"x":186.68,"y":239,"l":"O"},{"x":169.358,"y":269}],"b":[{"b":0,"e":1},{"b":0,"e":2},{"b":0,"e":3},{"b":1,"e":4,"o":2},{"b":1,"e":5},{"b":3,"e":7},{"b":3,"e":6}]}
	});
	group.templates.push({
		name: 'Threonine <i>chain</i>',
		data: {"a":[{"x":-30.0004,"y":-9.9993,"l":"N"},{"x":-9.9992,"y":-9.9993},{"x":-9.9992,"y":10.002},{"x":9.9992,"y":-9.9993},{"x":-9.9992,"y":30.0004},{"x":9.9992,"y":10.002,"l":"O"},{"x":30.0004,"y":-9.9992,"l":"O"},{"x":9.9992,"y":-30.0004,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":1,"e":2},{"b":3,"e":6},{"b":3,"e":7,"o":2},{"b":2,"e":5},{"b":2,"e":4}]}
	});
	group.templates.push({
		name: 'Threonine <i>side chain</i>',
		data: {"a":[{"x":-17.0711,"y":0.999},{"x":2.9289,"y":0.999},{"x":8.1053,"y":-18.3195,"l":"H"},{"x":12.9289,"y":18.3195},{"x":17.0711,"y":-13.1431,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":4},{"b":1,"e":3},{"b":1,"e":2}]}
	});
	group.templates.push({
		name: 'Tryptophan <b>Trp</b> <i>W</i>',
		data: {"a":[{"x":232.89,"y":267.526},{"x":232.89,"y":287.526,"l":"N"},{"x":250.21,"y":257.526},{"x":215.57,"y":257.526},{"x":267.532,"y":267.526,"l":"O"},{"x":250.21,"y":237.526,"l":"O"},{"x":198.248,"y":267.526},{"x":196.158,"y":287.418},{"x":179.98,"y":259.392},{"x":176.596,"y":291.576,"l":"N"},{"x":173.23,"y":240.256},{"x":166.596,"y":274.254},{"x":153.6,"y":236.424},{"x":146.968,"y":270.424},{"x":140.468,"y":251.51}],"b":[{"b":0,"e":2},{"b":0,"e":3},{"b":0,"e":1},{"b":2,"e":4},{"b":2,"e":5,"o":2},{"b":3,"e":6},{"b":6,"e":7,"o":2},{"b":6,"e":8},{"b":7,"e":9},{"b":11,"e":8,"o":2},{"b":10,"e":8},{"b":9,"e":11},{"b":11,"e":13},{"b":12,"e":10,"o":2},{"b":13,"e":14,"o":2},{"b":14,"e":12}]}
	});
	group.templates.push({
		name: 'Tryptophan <i>chain</i>',
		data: {"a":[{"x":-34.5594,"y":-32.7962,"l":"N"},{"x":-14.5632,"y":-32.7962},{"x":-14.5632,"y":-12.8},{"x":5.4302,"y":-32.7962},{"x":-14.5632,"y":7.1934},{"x":25.4264,"y":-32.7962,"l":"O"},{"x":5.4302,"y":-52.7924,"l":"O"},{"x":-30.7519,"y":18.8666},{"x":1.5511,"y":18.8666},{"x":-24.6495,"y":37.8737,"l":"N"},{"x":-4.6891,"y":37.8737},{"x":21.1946,"y":14.7065},{"x":8.6757,"y":52.7924},{"x":34.5594,"y":29.6581},{"x":28.2834,"y":48.7011}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":1,"e":2},{"b":3,"e":5},{"b":3,"e":6,"o":2},{"b":2,"e":4},{"b":4,"e":7,"o":2},{"b":7,"e":9},{"b":9,"e":10},{"b":10,"e":8,"o":2},{"b":4,"e":8},{"b":10,"e":12},{"b":12,"e":14,"o":2},{"b":14,"e":13},{"b":13,"e":11,"o":2},{"b":8,"e":11}]}
	});
	group.templates.push({
		name: 'Tryptophan <i>side chain</i>',
		data: {"a":[{"x":-42.876,"y":16.3756},{"x":-22.8416,"y":16.3756},{"x":-2.81,"y":16.3756},{"x":9.0262,"y":0.2305},{"x":9.0262,"y":32.5593},{"x":4.9631,"y":-19.0972},{"x":28.0696,"y":6.3418},{"x":28.0696,"y":26.3403,"l":"N"},{"x":19.6976,"y":-32.5593},{"x":42.876,"y":-7.0485},{"x":38.6693,"y":-26.517}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":2,"e":4,"o":2},{"b":4,"e":7},{"b":7,"e":6},{"b":6,"e":3,"o":2},{"b":2,"e":3},{"b":6,"e":9},{"b":9,"e":10,"o":2},{"b":10,"e":8},{"b":8,"e":5,"o":2},{"b":3,"e":5}]}
	});
	group.templates.push({
		name: 'Tyrosine <b>Tyr</b> <i>Y</i>',
		data: {"a":[{"x":247.3,"y":254},{"x":247.3,"y":234,"l":"O"},{"x":229.98,"y":264},{"x":264.622,"y":264,"l":"O"},{"x":212.66,"y":254},{"x":229.98,"y":284,"l":"N"},{"x":195.34,"y":264},{"x":195.34,"y":284},{"x":178.018,"y":254},{"x":178.018,"y":294},{"x":160.698,"y":264},{"x":160.698,"y":284},{"x":143.378,"y":294,"l":"O"}],"b":[{"b":0,"e":1,"o":2},{"b":0,"e":3},{"b":0,"e":2},{"b":2,"e":4},{"b":2,"e":5},{"b":4,"e":6},{"b":6,"e":7,"o":2},{"b":6,"e":8},{"b":7,"e":9},{"b":10,"e":8,"o":2},{"b":9,"e":11,"o":2},{"b":11,"e":10},{"b":11,"e":12}]}
	});
	group.templates.push({
		name: 'Tyrosine <i>chain</i>',
		data: {"a":[{"x":-29.9912,"y":-40.0397,"l":"N"},{"x":-9.9962,"y":-40.0397},{"x":9.9961,"y":-40.0397},{"x":-9.9962,"y":-20.0447},{"x":29.9911,"y":-40.0397,"l":"O"},{"x":9.9961,"y":-60.0347,"l":"O"},{"x":-9.9962,"y":-0.0524},{"x":7.2826,"y":9.9976},{"x":-27.3107,"y":9.9976},{"x":7.2826,"y":30.0284},{"x":-27.3107,"y":30.0285},{"x":-9.9962,"y":40.0424},{"x":-9.9962,"y":60.0347,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":1,"e":3},{"b":2,"e":4},{"b":2,"e":5,"o":2},{"b":3,"e":6},{"b":6,"e":8,"o":2},{"b":8,"e":10},{"b":10,"e":11,"o":2},{"b":11,"e":9},{"b":9,"e":7,"o":2},{"b":6,"e":7},{"b":11,"e":12}]}
	});
	group.templates.push({
		name: 'Tyrosine <i>side chain</i>',
		data: {"a":[{"x":-50.0496,"y":-0.0179},{"x":-30.0496,"y":-0.0179},{"x":-10.0524,"y":-0.0179},{"x":0,"y":17.3009},{"x":0,"y":-17.3009},{"x":20.0358,"y":17.3009},{"x":20.0358,"y":-17.3009},{"x":30.0524,"y":-0.0179},{"x":50.0496,"y":-0.0179,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":2,"e":3,"o":2},{"b":3,"e":5},{"b":5,"e":7,"o":2},{"b":7,"e":6},{"b":6,"e":4,"o":2},{"b":2,"e":4},{"b":7,"e":8}]}
	});
	group.templates.push({
		name: 'Valine <b>Val</b> <i>V</i>',
		data: {"a":[{"x":204,"y":269},{"x":204,"y":289,"l":"N"},{"x":186.678,"y":259},{"x":221.322,"y":259},{"x":186.678,"y":239},{"x":169.36,"y":269},{"x":238.64,"y":269,"l":"O"},{"x":221.322,"y":239,"l":"O"}],"b":[{"b":0,"e":3},{"b":0,"e":2},{"b":0,"e":1},{"b":3,"e":6},{"b":3,"e":7,"o":2},{"b":2,"e":5},{"b":2,"e":4}]}
	});
	group.templates.push({
		name: 'Valine <i>chain</i>',
		data: {"a":[{"x":-30.0004,"y":-9.9992,"l":"N"},{"x":-9.9992,"y":-9.9992},{"x":-9.9992,"y":10.0019},{"x":9.9992,"y":-9.9992},{"x":9.9992,"y":10.0019},{"x":-9.9992,"y":30.0004},{"x":30.0004,"y":-9.9992,"l":"O"},{"x":9.9992,"y":-30.0005,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":1,"e":2},{"b":3,"e":6},{"b":3,"e":7,"o":2},{"b":2,"e":4},{"b":2,"e":5}]}
	});
	group.templates.push({
		name: 'Valine <i>side chain</i>',
		data: {"a":[{"x":-20.0014,"y":10},{"x":0.0014,"y":10},{"x":20.0014,"y":10},{"x":0.0014,"y":-10}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":1,"e":2}]}
	});
	d.push(group);
	
	group = {name:'Cyclic Terpenes', templates:[]};
	group.templates.push({
		name: 'Bornane',
		data: {"a":[{"x":-1.0324,"y":-18.324},{"x":9.6351,"y":-4.5595},{"x":-16.3453,"y":-28.3032},{"x":-5.3337,"y":12.4741},{"x":14.1611,"y":-27.0959},{"x":-10.8395,"y":1.8066},{"x":25.2923,"y":1.8066},{"x":-14.2806,"y":28.3032},{"x":-25.2923,"y":15.9152},{"x":14.7968,"y":16.6035}],"b":[{"b":0,"e":4},{"b":0,"e":2},{"b":0,"e":1},{"b":1,"e":6},{"b":6,"e":9},{"b":9,"e":3},{"b":3,"e":7},{"b":8,"e":3},{"b":8,"e":5},{"b":5,"e":1},{"b":0,"e":3}]}
	});
	group.templates.push({
		name: 'Carane',
		data: {"a":[{"x":-19.9985,"y":-39.643},{"x":-9.9992,"y":-22.3243},{"x":-19.9985,"y":-5.0056},{"x":9.9992,"y":-22.3242},{"x":-9.9992,"y":12.3151},{"x":19.9985,"y":-5.0056},{"x":0,"y":29.6437},{"x":9.9992,"y":12.3151},{"x":-17.3187,"y":39.643},{"x":17.3187,"y":39.643}],"b":[{"b":4,"e":6},{"b":7,"e":6},{"b":6,"e":9},{"b":6,"e":8},{"b":4,"e":7},{"b":4,"e":2},{"b":7,"e":5},{"b":2,"e":1},{"b":5,"e":3},{"b":1,"e":3},{"b":1,"e":0}]}
	});
	group.templates.push({
		name: 'Menthane',
		data: {"a":[{"x":-17.3202,"y":-5.0001},{"x":-17.3203,"y":15.0002},{"x":0,"y":-15.0002},{"x":0,"y":25.0003},{"x":17.3203,"y":-5.0001},{"x":0,"y":-35.0005},{"x":17.3202,"y":15.0002},{"x":0,"y":45.0006},{"x":-17.3203,"y":-45.0006},{"x":17.3202,"y":-45.0006}],"b":[{"b":2,"e":0},{"b":2,"e":4},{"b":2,"e":5},{"b":0,"e":1},{"b":4,"e":6},{"b":3,"e":6},{"b":3,"e":1},{"b":3,"e":7},{"b":5,"e":9},{"b":5,"e":8}]}
	});
	group.templates.push({
		name: 'Norbornane 1',
		data: {"a":[{"x":-0.995,"y":-16.8329},{"x":-5.1411,"y":12.8527},{"x":9.2871,"y":-3.5656},{"x":-24.3787,"y":16.1695},{"x":14.2624,"y":16.8329},{"x":-10.448,"y":2.5705},{"x":24.3787,"y":2.5705}],"b":[{"b":0,"e":2},{"b":2,"e":6},{"b":6,"e":4},{"b":4,"e":1},{"b":3,"e":1},{"b":3,"e":5},{"b":5,"e":2},{"b":0,"e":1}]}
	});
	group.templates.push({
		name: 'Norbornane 2',
		data: {"a":[{"x":0,"y":-19.7533},{"x":-6.3211,"y":0},{"x":17.1069,"y":-9.8766},{"x":-17.1069,"y":-9.8766},{"x":0,"y":19.7533},{"x":17.1069,"y":9.8767},{"x":-17.1069,"y":9.8767}],"b":[{"b":0,"e":3},{"b":3,"e":6},{"b":6,"e":4},{"b":4,"e":5},{"b":5,"e":2},{"b":2,"e":0},{"b":4,"e":1},{"b":0,"e":1}]}
	});
	group.templates.push({
		name: 'Norcarane',
		data: {"a":[{"x":9.9989,"y":-25.983},{"x":19.9977,"y":-8.665},{"x":-9.9989,"y":-25.983},{"x":9.9989,"y":8.653},{"x":-19.9977,"y":-8.665},{"x":0,"y":25.9831},{"x":-9.9989,"y":8.653}],"b":[{"b":3,"e":6},{"b":3,"e":5},{"b":3,"e":1},{"b":6,"e":5},{"b":6,"e":4},{"b":1,"e":0},{"b":4,"e":2},{"b":0,"e":2}]}
	});
	group.templates.push({
		name: 'Norpinane',
		data: {"a":[{"x":-9.0329,"y":-16.7698},{"x":-14.1777,"y":-0.5106},{"x":-5.027,"y":9.1507},{"x":3.6889,"y":3.8049},{"x":-24.1925,"y":16.7698},{"x":15.081,"y":13.8636},{"x":24.1925,"y":0.3535}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":3,"e":6},{"b":6,"e":5},{"b":5,"e":2},{"b":4,"e":2},{"b":4,"e":1},{"b":0,"e":2}]}
	});
	group.templates.push({
		name: 'Pinane',
		data: {"a":[{"x":-9.3626,"y":-10.136},{"x":-24.0985,"y":-22.6738},{"x":3.2566,"y":-24.6277},{"x":-5.2105,"y":16.7306},{"x":-14.6952,"y":6.7166},{"x":15.6315,"y":21.6154},{"x":-25.0755,"y":24.6277},{"x":5.5362,"y":2.646},{"x":25.0755,"y":7.6122},{"x":13.3519,"y":-10.6245}],"b":[{"b":0,"e":2},{"b":0,"e":1},{"b":0,"e":4},{"b":4,"e":7},{"b":7,"e":9},{"b":7,"e":8},{"b":8,"e":5},{"b":5,"e":3},{"b":6,"e":3},{"b":6,"e":4},{"b":0,"e":3}]}
	});
	group.templates.push({
		name: 'Thujane',
		data: {"a":[{"x":-24.0519,"y":2.3998},{"x":-12.2969,"y":-13.7808},{"x":-12.2969,"y":18.5784},{"x":6.7214,"y":-7.5993},{"x":6.7214,"y":12.399},{"x":-18.4764,"y":37.5967},{"x":6.7214,"y":-27.5976},{"x":24.0519,"y":2.3998},{"x":24.0419,"y":-37.5967},{"x":-10.5971,"y":-37.5967}],"b":[{"b":3,"e":4},{"b":3,"e":7},{"b":3,"e":1},{"b":3,"e":6},{"b":4,"e":7},{"b":4,"e":2},{"b":2,"e":0},{"b":2,"e":5},{"b":1,"e":0},{"b":6,"e":8},{"b":6,"e":9}]}
	});
	d.push(group);
	
	group = {name:'Cycloalkanes', templates:[]};
	group.templates.push({
		name: '<a></a><b>9</b> Nonane <i>packed</i>',
		data: {"a":[{"x":236.708,"y":264},{"x":224.954,"y":247.82},{"x":224.954,"y":280.178},{"x":205.932,"y":254},{"x":205.932,"y":273.998},{"x":188.612,"y":244},{"x":188.612,"y":284},{"x":171.29,"y":254},{"x":171.29,"y":273.998}],"b":[{"b":0,"e":2},{"b":0,"e":1},{"b":2,"e":4},{"b":3,"e":1},{"b":4,"e":6},{"b":3,"e":5},{"b":6,"e":8},{"b":7,"e":5},{"b":8,"e":7}]}
	});
	group.templates.push({
		name: '<a></a><b>9</b> Nonane <i>unpacked</i>',
		data: {"a":[{"x":175.644,"y":274},{"x":175.644,"y":254},{"x":188.5,"y":289.32},{"x":188.5,"y":238.68},{"x":208.196,"y":292.794},{"x":208.196,"y":235.206},{"x":225.516,"y":282.794},{"x":225.516,"y":245.206},{"x":232.356,"y":264}],"b":[{"b":0,"e":2},{"b":0,"e":1},{"b":2,"e":4},{"b":3,"e":1},{"b":4,"e":6},{"b":3,"e":5},{"b":6,"e":8},{"b":7,"e":5},{"b":8,"e":7}]}
	});
	group.templates.push({
		name: '<b>10</b> Decane <i>packed</i>',
		data: {"a":[{"x":186.678,"y":244},{"x":169.36,"y":254},{"x":204,"y":254},{"x":169.36,"y":274},{"x":221.32,"y":244},{"x":186.678,"y":284},{"x":238.642,"y":254},{"x":204,"y":274},{"x":238.642,"y":274},{"x":221.32,"y":284}],"b":[{"b":0,"e":2},{"b":0,"e":1},{"b":2,"e":4},{"b":3,"e":1},{"b":4,"e":6},{"b":5,"e":3},{"b":6,"e":8},{"b":7,"e":5},{"b":8,"e":9},{"b":9,"e":7}]}
	});
	group.templates.push({
		name: '<b>10</b> Decane <i>unpacked</i>',
		data: {"a":[{"x":173.224,"y":274},{"x":184.978,"y":290.18},{"x":173.224,"y":254},{"x":204,"y":296.36},{"x":184.978,"y":237.82},{"x":223.022,"y":290.18},{"x":204,"y":231.64},{"x":234.776,"y":274},{"x":223.022,"y":237.82},{"x":234.776,"y":254}],"b":[{"b":0,"e":1},{"b":0,"e":2},{"b":1,"e":3},{"b":4,"e":2},{"b":3,"e":5},{"b":6,"e":4},{"b":5,"e":7},{"b":8,"e":6},{"b":7,"e":9},{"b":9,"e":8}]}
	});
	group.templates.push({
		name: '<b>11</b> Undecane <i>packed</i>',
		data: {"a":[{"x":169.358,"y":243.61},{"x":169.358,"y":263.612},{"x":186.678,"y":233.612},{"x":186.678,"y":273.61},{"x":204,"y":243.61},{"x":193.998,"y":294.388},{"x":221.318,"y":233.612},{"x":213.998,"y":294.388},{"x":238.64,"y":243.61},{"x":221.318,"y":273.61},{"x":238.64,"y":263.612}],"b":[{"b":0,"e":2},{"b":0,"e":1},{"b":2,"e":4},{"b":3,"e":1},{"b":4,"e":6},{"b":5,"e":3},{"b":6,"e":8},{"b":7,"e":5},{"b":8,"e":10},{"b":9,"e":7},{"b":10,"e":9}]}
	});
	group.templates.push({
		name: '<b>11</b> Undecane <i>unpacked</i>',
		data: {"a":[{"x":169.224,"y":274},{"x":180.038,"y":290.826},{"x":169.224,"y":254},{"x":198.23,"y":299.134},{"x":180.038,"y":237.174},{"x":218.026,"y":296.288},{"x":198.23,"y":228.866},{"x":233.142,"y":283.19},{"x":218.026,"y":231.712},{"x":238.776,"y":264},{"x":233.142,"y":244.81}],"b":[{"b":0,"e":1},{"b":0,"e":2},{"b":1,"e":3},{"b":4,"e":2},{"b":3,"e":5},{"b":6,"e":4},{"b":5,"e":7},{"b":8,"e":6},{"b":7,"e":9},{"b":10,"e":8},{"b":9,"e":10}]}
	});
	group.templates.push({
		name: '<b>12</b> Dodecane <i>packed</i>',
		data: {"a":[{"x":204,"y":229},{"x":186.678,"y":239},{"x":221.32,"y":239},{"x":186.678,"y":259},{"x":221.32,"y":259},{"x":169.358,"y":269},{"x":238.64,"y":269},{"x":169.358,"y":289},{"x":238.64,"y":289},{"x":186.678,"y":299},{"x":221.32,"y":299},{"x":204,"y":289}],"b":[{"b":0,"e":2},{"b":0,"e":1},{"b":2,"e":4},{"b":3,"e":1},{"b":4,"e":6},{"b":3,"e":5},{"b":6,"e":8},{"b":7,"e":5},{"b":8,"e":10},{"b":9,"e":7},{"b":10,"e":11},{"b":11,"e":9}]}
	});
	group.templates.push({
		name: '<b>12</b> Dodecane <i>unpacked</i>',
		data: {"a":[{"x":166.68,"y":274},{"x":176.68,"y":291.32},{"x":166.68,"y":254},{"x":194,"y":301.32},{"x":176.68,"y":236.68},{"x":214,"y":301.32},{"x":194,"y":226.68},{"x":231.32,"y":291.32},{"x":214,"y":226.68},{"x":241.32,"y":274},{"x":231.32,"y":236.68},{"x":241.32,"y":254}],"b":[{"b":0,"e":1},{"b":0,"e":2},{"b":1,"e":3},{"b":4,"e":2},{"b":3,"e":5},{"b":4,"e":6},{"b":5,"e":7},{"b":8,"e":6},{"b":7,"e":9},{"b":10,"e":8},{"b":9,"e":11},{"b":11,"e":10}]}
	});
	group.templates.push({
		name: '<b>13</b> Tridecane <i>packed</i>',
		data: {"a":[{"x":204,"y":218.612},{"x":221.322,"y":228.614},{"x":186.68,"y":228.614},{"x":221.322,"y":248.612},{"x":186.68,"y":248.612},{"x":238.64,"y":258.614},{"x":169.358,"y":258.614},{"x":238.64,"y":278.612},{"x":169.358,"y":278.612},{"x":221.322,"y":288.614},{"x":186.68,"y":288.614},{"x":214.002,"y":309.388},{"x":194,"y":309.388}],"b":[{"b":0,"e":1},{"b":0,"e":2},{"b":1,"e":3},{"b":4,"e":2},{"b":3,"e":5},{"b":6,"e":4},{"b":5,"e":7},{"b":8,"e":6},{"b":7,"e":9},{"b":10,"e":8},{"b":9,"e":11},{"b":12,"e":10},{"b":11,"e":12}]}
	});
	group.templates.push({
		name: '<b>13</b> Tridecane <i>unpacked</i>',
		data: {"a":[{"x":162.822,"y":274},{"x":172.116,"y":291.71},{"x":162.822,"y":254},{"x":188.576,"y":303.07},{"x":172.116,"y":236.29},{"x":208.43,"y":305.482},{"x":188.576,"y":224.93},{"x":227.13,"y":298.39},{"x":208.43,"y":222.518},{"x":240.392,"y":283.418},{"x":227.13,"y":229.61},{"x":245.178,"y":264},{"x":240.392,"y":244.582}],"b":[{"b":0,"e":1},{"b":0,"e":2},{"b":1,"e":3},{"b":4,"e":2},{"b":3,"e":5},{"b":6,"e":4},{"b":5,"e":7},{"b":8,"e":6},{"b":7,"e":9},{"b":10,"e":8},{"b":9,"e":11},{"b":12,"e":10},{"b":11,"e":12}]}
	});
	group.templates.push({
		name: '<b>14</b> Tetradecane <i>packed</i>',
		data: {"a":[{"x":204,"y":214},{"x":186.68,"y":224},{"x":221.32,"y":224},{"x":186.68,"y":244},{"x":221.32,"y":244},{"x":169.358,"y":254},{"x":238.642,"y":254},{"x":169.358,"y":274},{"x":238.642,"y":274},{"x":186.68,"y":284},{"x":221.32,"y":284},{"x":186.68,"y":304},{"x":221.32,"y":304},{"x":204,"y":314}],"b":[{"b":0,"e":2},{"b":0,"e":1},{"b":2,"e":4},{"b":3,"e":1},{"b":4,"e":6},{"b":5,"e":3},{"b":6,"e":8},{"b":7,"e":5},{"b":8,"e":10},{"b":9,"e":7},{"b":10,"e":12},{"b":11,"e":9},{"b":12,"e":13},{"b":13,"e":11}]}
	});
	group.templates.push({
		name: '<b>14</b> Tetradecane <i>unpacked</i>',
		data: {"a":[{"x":160.188,"y":274},{"x":168.864,"y":292.02},{"x":160.188,"y":254},{"x":184.502,"y":304.49},{"x":168.864,"y":235.98},{"x":204,"y":308.94},{"x":184.502,"y":223.51},{"x":223.498,"y":304.49},{"x":204,"y":219.06},{"x":239.136,"y":292.02},{"x":223.498,"y":223.51},{"x":247.812,"y":274},{"x":239.136,"y":235.98},{"x":247.812,"y":254}],"b":[{"b":0,"e":1},{"b":0,"e":2},{"b":1,"e":3},{"b":4,"e":2},{"b":3,"e":5},{"b":6,"e":4},{"b":5,"e":7},{"b":8,"e":6},{"b":7,"e":9},{"b":10,"e":8},{"b":9,"e":11},{"b":12,"e":10},{"b":11,"e":13},{"b":13,"e":12}]}
	});
	group.templates.push({
		name: '<b>15</b> Pendecane <i>packed</i>',
		data: {"a":[{"x":184,"y":251.23},{"x":164,"y":251.23},{"x":186.226,"y":233.358},{"x":154,"y":268.548},{"x":204.306,"y":224.808},{"x":164,"y":285.87},{"x":222.264,"y":233.61},{"x":184,"y":285.87},{"x":224,"y":251.23},{"x":194,"y":303.192},{"x":244,"y":251.23},{"x":214,"y":303.192},{"x":254,"y":268.548},{"x":224,"y":285.87},{"x":244,"y":285.87}],"b":[{"b":0,"e":1},{"b":0,"e":2},{"b":3,"e":1},{"b":2,"e":4},{"b":5,"e":3},{"b":4,"e":6},{"b":7,"e":5},{"b":6,"e":8},{"b":9,"e":7},{"b":8,"e":10},{"b":11,"e":9},{"b":10,"e":12},{"b":13,"e":11},{"b":12,"e":14},{"b":14,"e":13}]}
	});
	group.templates.push({
		name: '<b>15</b> Pendecane <i>unpacked</i>',
		data: {"a":[{"x":156.428,"y":274},{"x":164.562,"y":292.27},{"x":156.428,"y":254},{"x":179.426,"y":305.654},{"x":164.562,"y":235.728},{"x":198.446,"y":311.834},{"x":179.426,"y":222.346},{"x":218.338,"y":309.744},{"x":198.446,"y":216.166},{"x":235.658,"y":299.744},{"x":218.338,"y":218.256},{"x":247.414,"y":283.562},{"x":235.658,"y":228.256},{"x":251.572,"y":264},{"x":247.414,"y":244.438}],"b":[{"b":0,"e":1},{"b":0,"e":2},{"b":3,"e":1},{"b":2,"e":4},{"b":5,"e":3},{"b":4,"e":6},{"b":7,"e":5},{"b":6,"e":8},{"b":9,"e":7},{"b":8,"e":10},{"b":11,"e":9},{"b":10,"e":12},{"b":13,"e":11},{"b":12,"e":14},{"b":14,"e":13}]}
	});
	group.templates.push({
		name: '<b>16</b> Hexadecane <i>packed</i>',
		data: {"a":[{"x":186.68,"y":229},{"x":204.002,"y":239},{"x":169.36,"y":239},{"x":221.32,"y":229},{"x":169.36,"y":259},{"x":238.642,"y":239},{"x":152.038,"y":269},{"x":238.642,"y":259},{"x":152.038,"y":289},{"x":255.962,"y":269},{"x":169.36,"y":299},{"x":255.962,"y":289},{"x":186.68,"y":289},{"x":238.642,"y":299},{"x":204.002,"y":299},{"x":221.32,"y":289}],"b":[{"b":0,"e":1},{"b":0,"e":2},{"b":1,"e":3},{"b":4,"e":2},{"b":3,"e":5},{"b":4,"e":6},{"b":5,"e":7},{"b":8,"e":6},{"b":7,"e":9},{"b":10,"e":8},{"b":9,"e":11},{"b":12,"e":10},{"b":11,"e":13},{"b":14,"e":12},{"b":15,"e":13},{"b":15,"e":14}]}
	});
	group.templates.push({
		name: '<b>16</b> Hexadecane <i>unpacked</i>',
		data: {"a":[{"x":153.726,"y":274},{"x":161.38,"y":292.478},{"x":153.726,"y":254},{"x":175.522,"y":306.62},{"x":161.38,"y":235.522},{"x":194,"y":314.274},{"x":175.522,"y":221.38},{"x":214,"y":314.274},{"x":194,"y":213.726},{"x":232.478,"y":306.62},{"x":214,"y":213.726},{"x":246.62,"y":292.478},{"x":232.478,"y":221.38},{"x":254.274,"y":274},{"x":246.62,"y":235.522},{"x":254.274,"y":254}],"b":[{"b":0,"e":1},{"b":0,"e":2},{"b":1,"e":3},{"b":4,"e":2},{"b":3,"e":5},{"b":4,"e":6},{"b":5,"e":7},{"b":8,"e":6},{"b":7,"e":9},{"b":10,"e":8},{"b":9,"e":11},{"b":12,"e":10},{"b":11,"e":13},{"b":14,"e":12},{"b":15,"e":13},{"b":15,"e":14}]}
	});
	group.templates.push({
		name: '<b>17</b> Heptadecane <i>packed</i>',
		data: {"a":[{"x":152.038,"y":228.614},{"x":152.038,"y":248.612},{"x":169.358,"y":218.612},{"x":169.358,"y":258.614},{"x":186.68,"y":228.614},{"x":169.358,"y":278.612},{"x":203.998,"y":218.612},{"x":186.68,"y":288.614},{"x":221.32,"y":228.614},{"x":194,"y":309.388},{"x":238.64,"y":218.612},{"x":214,"y":309.388},{"x":255.962,"y":228.614},{"x":221.32,"y":288.614},{"x":255.962,"y":248.612},{"x":238.64,"y":278.612},{"x":238.64,"y":258.614}],"b":[{"b":0,"e":2},{"b":0,"e":1},{"b":2,"e":4},{"b":3,"e":1},{"b":4,"e":6},{"b":5,"e":3},{"b":6,"e":8},{"b":7,"e":5},{"b":8,"e":10},{"b":9,"e":7},{"b":10,"e":12},{"b":11,"e":9},{"b":12,"e":14},{"b":13,"e":11},{"b":14,"e":16},{"b":15,"e":13},{"b":16,"e":15}]}
	});
	group.templates.push({
		name: '<b>17</b> Heptadecane <i>unpacked</i>',
		data: {"a":[{"x":150.042,"y":274},{"x":150.042,"y":254},{"x":157.266,"y":292.65},{"x":157.266,"y":235.35},{"x":170.74,"y":307.43},{"x":170.74,"y":220.57},{"x":188.644,"y":316.344},{"x":188.644,"y":211.656},{"x":208.558,"y":318.19},{"x":208.558,"y":209.81},{"x":227.794,"y":312.716},{"x":227.794,"y":215.284},{"x":243.754,"y":300.664},{"x":243.754,"y":227.336},{"x":254.284,"y":283.66},{"x":254.284,"y":244.34},{"x":257.958,"y":264}],"b":[{"b":0,"e":2},{"b":0,"e":1},{"b":2,"e":4},{"b":3,"e":1},{"b":4,"e":6},{"b":5,"e":3},{"b":6,"e":8},{"b":7,"e":5},{"b":8,"e":10},{"b":9,"e":7},{"b":10,"e":12},{"b":11,"e":9},{"b":12,"e":14},{"b":13,"e":11},{"b":14,"e":16},{"b":15,"e":13},{"b":16,"e":15}]}
	});
	group.templates.push({
		name: '<b>18</b> Octodecane <i>packed</i>',
		data: {"a":[{"x":186.68,"y":214},{"x":169.36,"y":224},{"x":204.002,"y":224},{"x":169.36,"y":244},{"x":221.32,"y":214},{"x":152.038,"y":254},{"x":238.642,"y":224},{"x":152.038,"y":274},{"x":238.642,"y":244},{"x":169.36,"y":284},{"x":255.962,"y":254},{"x":169.36,"y":304},{"x":255.962,"y":274},{"x":186.68,"y":314},{"x":238.642,"y":284},{"x":204.002,"y":304},{"x":238.642,"y":304},{"x":221.32,"y":314}],"b":[{"b":0,"e":2},{"b":0,"e":1},{"b":2,"e":4},{"b":3,"e":1},{"b":4,"e":6},{"b":3,"e":5},{"b":6,"e":8},{"b":7,"e":5},{"b":8,"e":10},{"b":9,"e":7},{"b":10,"e":12},{"b":11,"e":9},{"b":12,"e":14},{"b":13,"e":11},{"b":14,"e":16},{"b":15,"e":13},{"b":16,"e":17},{"b":17,"e":15}]}
	});
	group.templates.push({
		name: '<b>18</b> Octodecane <i>unpacked</i>',
		data: {"a":[{"x":147.288,"y":274},{"x":147.288,"y":254},{"x":154.128,"y":292.794},{"x":154.128,"y":235.206},{"x":166.984,"y":308.114},{"x":166.984,"y":219.886},{"x":184.304,"y":318.114},{"x":184.304,"y":209.886},{"x":204,"y":321.588},{"x":204,"y":206.412},{"x":223.696,"y":318.114},{"x":223.696,"y":209.886},{"x":241.016,"y":308.114},{"x":241.016,"y":219.886},{"x":253.872,"y":292.794},{"x":253.872,"y":235.206},{"x":260.712,"y":274},{"x":260.712,"y":254}],"b":[{"b":0,"e":2},{"b":0,"e":1},{"b":2,"e":4},{"b":3,"e":1},{"b":4,"e":6},{"b":3,"e":5},{"b":6,"e":8},{"b":7,"e":5},{"b":8,"e":10},{"b":9,"e":7},{"b":10,"e":12},{"b":11,"e":9},{"b":12,"e":14},{"b":13,"e":11},{"b":14,"e":16},{"b":15,"e":13},{"b":16,"e":17},{"b":17,"e":15}]}
	});
	group.templates.push({
		name: '<b>19</b> Enneadecane <i>packed</i>',
		data: {"a":[{"x":186.68,"y":203.612},{"x":169.36,"y":213.61},{"x":203.998,"y":213.61},{"x":169.36,"y":233.612},{"x":221.32,"y":203.612},{"x":152.038,"y":243.61},{"x":238.642,"y":213.61},{"x":152.038,"y":263.612},{"x":238.642,"y":233.612},{"x":169.36,"y":273.61},{"x":255.962,"y":243.61},{"x":169.36,"y":293.612},{"x":255.962,"y":263.612},{"x":186.68,"y":303.61},{"x":238.642,"y":273.61},{"x":194,"y":324.388},{"x":238.64,"y":293.612},{"x":214,"y":324.388},{"x":221.32,"y":303.61}],"b":[{"b":0,"e":2},{"b":0,"e":1},{"b":2,"e":4},{"b":3,"e":1},{"b":4,"e":6},{"b":3,"e":5},{"b":6,"e":8},{"b":7,"e":5},{"b":8,"e":10},{"b":9,"e":7},{"b":10,"e":12},{"b":11,"e":9},{"b":12,"e":14},{"b":13,"e":11},{"b":14,"e":16},{"b":15,"e":13},{"b":16,"e":18},{"b":17,"e":15},{"b":18,"e":17}]}
	});
	group.templates.push({
		name: '<b>19</b> Enneadecane <i>unpacked</i>',
		data: {"a":[{"x":143.658,"y":274},{"x":150.152,"y":292.916},{"x":143.658,"y":254},{"x":162.438,"y":308.7},{"x":150.154,"y":235.084},{"x":179.18,"y":319.638},{"x":162.438,"y":219.3},{"x":198.568,"y":324.548},{"x":179.18,"y":208.362},{"x":218.5,"y":322.896},{"x":198.568,"y":203.452},{"x":236.816,"y":314.862},{"x":218.5,"y":205.104},{"x":251.53,"y":301.316},{"x":236.816,"y":213.138},{"x":261.05,"y":283.728},{"x":251.53,"y":226.684},{"x":264.342,"y":264},{"x":261.05,"y":244.272}],"b":[{"b":0,"e":1},{"b":0,"e":2},{"b":1,"e":3},{"b":4,"e":2},{"b":3,"e":5},{"b":4,"e":6},{"b":5,"e":7},{"b":8,"e":6},{"b":7,"e":9},{"b":10,"e":8},{"b":9,"e":11},{"b":12,"e":10},{"b":11,"e":13},{"b":14,"e":12},{"b":13,"e":15},{"b":16,"e":14},{"b":15,"e":17},{"b":18,"e":16},{"b":17,"e":18}]}
	});
	group.templates.push({
		name: '<b>20</b> Icosane <i>packed</i>',
		data: {"a":[{"x":139.36,"y":264},{"x":149.358,"y":281.318},{"x":149.358,"y":246.682},{"x":169.36,"y":281.318},{"x":169.36,"y":246.682},{"x":169.36,"y":301.32},{"x":169.36,"y":226.68},{"x":186.678,"y":311.318},{"x":186.678,"y":216.682},{"x":204,"y":301.32},{"x":204,"y":226.68},{"x":221.322,"y":311.318},{"x":221.322,"y":216.682},{"x":238.642,"y":301.32},{"x":238.642,"y":226.68},{"x":238.642,"y":281.318},{"x":238.642,"y":246.682},{"x":258.642,"y":281.318},{"x":258.642,"y":246.682},{"x":268.64,"y":264}],"b":[{"b":0,"e":2},{"b":0,"e":1},{"b":2,"e":4},{"b":3,"e":1},{"b":4,"e":6},{"b":3,"e":5},{"b":6,"e":8},{"b":7,"e":5},{"b":8,"e":10},{"b":9,"e":7},{"b":10,"e":12},{"b":9,"e":11},{"b":12,"e":14},{"b":13,"e":11},{"b":14,"e":16},{"b":15,"e":13},{"b":16,"e":18},{"b":17,"e":15},{"b":18,"e":19},{"b":19,"e":17}]}
	});
	group.templates.push({
		name: '<b>20</b> Icosane <i>unpacked</i>',
		data: {"a":[{"x":140.862,"y":274},{"x":147.042,"y":293.02},{"x":140.862,"y":254},{"x":158.798,"y":309.202},{"x":147.042,"y":234.98},{"x":174.978,"y":320.958},{"x":158.798,"y":218.798},{"x":194,"y":327.138},{"x":174.978,"y":207.042},{"x":214,"y":327.138},{"x":194,"y":200.862},{"x":233.022,"y":320.958},{"x":214,"y":200.862},{"x":249.202,"y":309.202},{"x":233.02,"y":207.042},{"x":260.958,"y":293.02},{"x":249.202,"y":218.798},{"x":267.138,"y":274},{"x":260.958,"y":234.978},{"x":267.138,"y":254}],"b":[{"b":0,"e":1},{"b":0,"e":2},{"b":1,"e":3},{"b":4,"e":2},{"b":3,"e":5},{"b":4,"e":6},{"b":5,"e":7},{"b":8,"e":6},{"b":7,"e":9},{"b":10,"e":8},{"b":9,"e":11},{"b":10,"e":12},{"b":11,"e":13},{"b":14,"e":12},{"b":13,"e":15},{"b":16,"e":14},{"b":15,"e":17},{"b":18,"e":16},{"b":17,"e":19},{"b":19,"e":18}]}
	});
	d.push(group);
	
	group = {name:'Functional Groups', templates:[]};
	group.templates.push({
		name: 'Alkenyl',
		data: {"a":[{"x":194.002,"y":263.998},{"x":214,"y":263.998},{"x":184,"y":246.68},{"x":184,"y":281.32},{"x":224.002,"y":281.32},{"x":224.002,"y":246.68}],"b":[{"b":0,"e":1,"o":2},{"b":0,"e":2},{"b":0,"e":3},{"b":1,"e":5},{"b":1,"e":4}]}
	});
	group.templates.push({
		name: 'Alkynyl',
		data: {"a":[{"x":193.998,"y":264},{"x":174,"y":264},{"x":213.998,"y":264},{"x":234,"y":264}],"b":[{"b":0,"e":2,"o":3},{"b":0,"e":1},{"b":2,"e":3}]}
	});
	group.templates.push({
		name: 'Amine',
		data: {"a":[{"x":204.002,"y":259.002,"l":"N"},{"x":221.32,"y":249},{"x":204.002,"y":279},{"x":186.68,"y":249}],"b":[{"b":0,"e":1},{"b":0,"e":3},{"b":0,"e":2}]}
	});
	group.templates.push({
		name: 'Ammonium',
		data: {"a":[{"c":1,"x":203.998,"y":265.342,"l":"N"},{"x":186.68,"y":275.34},{"x":203.998,"y":245.34},{"x":194,"y":282.66},{"x":221.32,"y":275.34}],"b":[{"b":0,"e":2},{"b":0,"e":4},{"b":0,"e":1},{"b":0,"e":3}]}
	});
	group.templates.push({
		name: 'Azide',
		data: {"a":[{"x":178.02,"y":263.998},{"x":195.34,"y":254,"l":"N"},{"c":1,"x":212.662,"y":263.998,"l":"N"},{"c":-1,"x":229.98,"y":274,"l":"N"}],"b":[{"b":0,"e":1},{"b":1,"e":2,"o":2},{"b":2,"e":3,"o":2}]}
	});
	group.templates.push({
		name: 'Azo',
		data: {"a":[{"x":184,"y":246.68},{"x":194,"y":264.002,"l":"N"},{"x":214,"y":264.002,"l":"N"},{"x":224,"y":281.32}],"b":[{"b":0,"e":1},{"b":1,"e":2,"o":2},{"b":2,"e":3}]}
	});
	group.templates.push({
		name: 'Benzyl',
		data: {"a":[{"x":169.36,"y":254},{"x":186.678,"y":244},{"x":204,"y":254},{"x":204,"y":274},{"x":221.32,"y":244},{"x":221.32,"y":284},{"x":238.64,"y":254},{"x":238.64,"y":274}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":2,"e":4,"o":2},{"b":2,"e":3},{"b":4,"e":6},{"b":5,"e":3,"o":2},{"b":6,"e":7,"o":2},{"b":7,"e":5}]}
	});
	group.templates.push({
		name: 'Carbonate Ester',
		data: {"a":[{"x":186.678,"y":279,"l":"O"},{"x":169.36,"y":269.002},{"x":204,"y":269.002},{"x":221.32,"y":279,"l":"O"},{"x":204,"y":249,"l":"O"},{"x":238.642,"y":269.002}],"b":[{"b":0,"e":2},{"b":0,"e":1},{"b":2,"e":4,"o":2},{"b":2,"e":3},{"b":3,"e":5}]}
	});
	group.templates.push({
		name: 'Carbonyl',
		data: {"a":[{"x":186.68,"y":279},{"x":204.002,"y":268.998},{"x":204.002,"y":249,"l":"O"},{"x":221.32,"y":279}],"b":[{"b":0,"e":1},{"b":1,"e":2,"o":2},{"b":1,"e":3}]}
	});
	group.templates.push({
		name: 'Carboxamide',
		data: {"a":[{"x":178.02,"y":269},{"x":195.34,"y":259},{"x":195.34,"y":239,"l":"O"},{"x":212.662,"y":269,"l":"N"},{"x":212.662,"y":289},{"x":229.98,"y":259}],"b":[{"b":0,"e":1},{"b":1,"e":2,"o":2},{"b":1,"e":3},{"b":3,"e":5},{"b":3,"e":4}]}
	});
	group.templates.push({
		name: 'Cyanate',
		data: {"a":[{"x":178.02,"y":263.998},{"x":195.338,"y":254,"l":"O"},{"x":212.66,"y":263.998},{"x":229.98,"y":274,"l":"N"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":2,"e":3,"o":3}]}
	});
	group.templates.push({
		name: 'Disulfide',
		data: {"a":[{"x":184,"y":246.68},{"x":194,"y":263.998,"l":"S"},{"x":214,"y":263.998,"l":"S"},{"x":224,"y":281.32}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":2,"e":3}]}
	});
	group.templates.push({
		name: 'Ester',
		data: {"a":[{"x":178.02,"y":279},{"x":195.34,"y":269.002},{"x":212.66,"y":279,"l":"O"},{"x":195.34,"y":249,"l":"O"},{"x":229.98,"y":269.002}],"b":[{"b":0,"e":1},{"b":1,"e":3,"o":2},{"b":1,"e":2},{"b":2,"e":4}]}
	});
	group.templates.push({
		name: 'Ether',
		data: {"a":[{"x":186.68,"y":269},{"x":204.002,"y":259,"l":"O"},{"x":221.32,"y":269}],"b":[{"b":0,"e":1},{"b":1,"e":2}]}
	});
	group.templates.push({
		name: 'Imide',
		data: {"a":[{"x":169.36,"y":269.002},{"x":186.678,"y":258.998},{"x":186.678,"y":239.002,"l":"O"},{"x":204,"y":269.002,"l":"N"},{"x":204,"y":288.998},{"x":221.32,"y":258.998},{"x":238.64,"y":269.002},{"x":221.32,"y":239.002,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":1,"e":2,"o":2},{"b":3,"e":5},{"b":3,"e":4},{"b":5,"e":6},{"b":5,"e":7,"o":2}]}
	});
	group.templates.push({
		name: 'Isocyanate',
		data: {"a":[{"x":178.02,"y":264.002},{"x":195.34,"y":254,"l":"N"},{"x":212.662,"y":264.002},{"x":229.98,"y":274,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":2,"o":2},{"b":2,"e":3,"o":2}]}
	});
	group.templates.push({
		name: 'Isocyanide',
		data: {"a":[{"x":184,"y":264},{"c":1,"x":204.002,"y":264,"l":"N"},{"c":-1,"x":224,"y":264}],"b":[{"b":0,"e":1},{"b":1,"e":2,"o":3}]}
	});
	group.templates.push({
		name: 'Isothiocyanate',
		data: {"a":[{"x":178.02,"y":264},{"x":195.34,"y":254,"l":"N"},{"x":212.662,"y":264},{"x":229.98,"y":274,"l":"S"}],"b":[{"b":0,"e":1},{"b":1,"e":2,"o":2},{"b":2,"e":3,"o":2}]}
	});
	group.templates.push({
		name: 'Ketimine',
		data: {"a":[{"x":204,"y":273.998},{"x":204,"y":254.002,"l":"N"},{"x":221.32,"y":284.002},{"x":186.68,"y":284.002},{"x":221.32,"y":243.998}],"b":[{"b":0,"e":1,"o":2},{"b":0,"e":3},{"b":0,"e":2},{"b":1,"e":4}]}
	});
	group.templates.push({
		name: 'Nitrate',
		data: {"a":[{"x":178.02,"y":269},{"x":195.338,"y":279,"l":"O"},{"c":1,"x":212.66,"y":269,"l":"N"},{"c":-1,"x":229.98,"y":279,"l":"O"},{"x":212.66,"y":249,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":2,"e":3},{"b":2,"e":4,"o":2}]}
	});
	group.templates.push({
		name: 'Nitrile',
		data: {"a":[{"x":184,"y":264},{"x":204.002,"y":264},{"x":224,"y":264,"l":"N"}],"b":[{"b":0,"e":1},{"b":1,"e":2,"o":3}]}
	});
	group.templates.push({
		name: 'Nitro',
		data: {"a":[{"x":189,"y":263.998},{"c":1,"x":209.002,"y":263.998,"l":"N"},{"c":-1,"x":219,"y":281.32,"l":"O"},{"x":219,"y":246.68,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":3,"o":2},{"b":1,"e":2}]}
	});
	group.templates.push({
		name: 'Nitroso',
		data: {"a":[{"x":186.68,"y":269},{"x":203.998,"y":259,"l":"N"},{"x":221.32,"y":269,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":2,"o":2}]}
	});
	group.templates.push({
		name: 'Nitrosooxy',
		data: {"a":[{"x":178.018,"y":259},{"x":195.34,"y":269,"l":"O"},{"x":212.66,"y":259,"l":"N"},{"x":229.982,"y":269,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":2,"e":3,"o":2}]}
	});
	group.templates.push({
		name: 'Peroxy',
		data: {"a":[{"x":183.998,"y":246.68},{"x":194.002,"y":264.002,"l":"O"},{"x":213.998,"y":264.002,"l":"O"},{"x":224.002,"y":281.32}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":2,"e":3}]}
	});
	group.templates.push({
		name: 'Phosphate',
		data: {"a":[{"x":204,"y":265.342,"l":"P"},{"x":221.322,"y":275.34,"l":"O"},{"x":204,"y":245.34,"l":"O"},{"x":186.682,"y":275.34,"l":"O"},{"x":194.002,"y":282.66,"l":"O"},{"x":238.642,"y":265.342},{"x":169.36,"y":265.342},{"x":174,"y":282.66}],"b":[{"b":0,"e":2,"o":2},{"b":0,"e":1},{"b":0,"e":3},{"b":0,"e":4},{"b":1,"e":5},{"b":3,"e":6},{"b":4,"e":7}]}
	});
	group.templates.push({
		name: 'Phosphino',
		data: {"a":[{"x":204,"y":255.34,"l":"P"},{"x":194.002,"y":272.66},{"x":186.678,"y":265.34},{"x":221.322,"y":265.34}],"b":[{"b":0,"e":2},{"b":0,"e":3},{"b":0,"e":1}]}
	});
	group.templates.push({
		name: 'Pyridyl',
		data: {"a":[{"x":178.018,"y":244},{"x":195.34,"y":254},{"x":212.66,"y":244},{"x":195.34,"y":274},{"x":229.982,"y":254},{"x":212.66,"y":284},{"x":229.982,"y":274,"l":"N"}],"b":[{"b":0,"e":1},{"b":1,"e":2,"o":2},{"b":1,"e":3},{"b":2,"e":4},{"b":5,"e":3,"o":2},{"b":4,"e":6,"o":2},{"b":6,"e":5}]}
	});
	group.templates.push({
		name: 'Sulfide',
		data: {"a":[{"x":203.998,"y":259,"l":"S"},{"x":186.68,"y":269},{"x":221.32,"y":269}],"b":[{"b":0,"e":1},{"b":0,"e":2}]}
	});
	group.templates.push({
		name: 'Sulfinyl',
		data: {"a":[{"x":186.68,"y":279},{"x":203.998,"y":268.998,"l":"S"},{"x":203.998,"y":249,"l":"O"},{"x":221.32,"y":279}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":1,"e":2,"o":2}]}
	});
	group.templates.push({
		name: 'Sulfonyl',
		data: {"a":[{"x":204,"y":267.66,"l":"S"},{"x":194.002,"y":250.342,"l":"O"},{"x":213.998,"y":250.342,"l":"O"},{"x":186.68,"y":277.658},{"x":221.32,"y":277.658}],"b":[{"b":0,"e":3},{"b":0,"e":4},{"b":0,"e":1,"o":2},{"b":0,"e":2,"o":2}]}
	});
	group.templates.push({
		name: 'Thiocyanate',
		data: {"a":[{"x":178.018,"y":264.002},{"x":195.34,"y":254,"l":"S"},{"x":212.66,"y":264.002},{"x":229.982,"y":274,"l":"N"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":2,"e":3,"o":3}]}
	});
	d.push(group);
	
	group = {name:'Sugars (Hexoses)', templates:[]};
	group.templates.push({
		name: 'Allose <i>Fisher Projection</i>',
		data: {"a":[{"x":0,"y":-50,"l":"CHO"},{"x":0,"y":-30},{"x":0,"y":-10},{"x":20,"y":-30,"l":"O"},{"x":-20,"y":-30,"l":"H"},{"x":-20,"y":-10,"l":"H"},{"x":20,"y":-10,"l":"O"},{"x":0,"y":10},{"x":20,"y":10,"l":"O"},{"x":-20,"y":10,"l":"H"},{"x":0,"y":30},{"x":-20,"y":30,"l":"H"},{"x":20,"y":30,"l":"O"},{"x":0,"y":50,"l":"CH2OH"}],"b":[{"b":0,"e":1},{"b":1,"e":4},{"b":1,"e":3},{"b":1,"e":2},{"b":2,"e":5},{"b":2,"e":6},{"b":2,"e":7},{"b":7,"e":9},{"b":7,"e":8},{"b":7,"e":10},{"b":10,"e":11},{"b":10,"e":12},{"b":10,"e":13}]}
	});
	group.templates.push({
		name: 'Allose <i>Furanose Form</i>',
		data: {"a":[{"x":7.3205,"y":-13.6239,"l":"O"},{"x":-27.7677,"y":-1.3055},{"x":42.4087,"y":-1.3055},{"x":-14.3652,"y":18.6261},{"x":-27.7677,"y":-21.3055},{"x":-27.7677,"y":18.6945,"l":"H"},{"x":29.0062,"y":18.6261},{"x":62.4087,"y":-1.3055,"l":"O"},{"x":-14.3652,"y":38.6261,"l":"O"},{"x":-14.3652,"y":-1.3739,"l":"H"},{"x":-17.7677,"y":-38.6261,"l":"O"},{"x":-45.0882,"y":-31.3055},{"x":-9.2969,"y":-28.9755,"l":"H"},{"x":29.0062,"y":38.6261,"l":"O"},{"x":29.0062,"y":-1.3739,"l":"H"},{"x":-62.4087,"y":-21.3055,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":3,"e":6,"o":1},{"b":2,"e":6},{"b":2,"e":0},{"b":3,"e":9},{"b":3,"e":8},{"b":6,"e":14},{"b":6,"e":13},{"b":1,"e":4},{"b":1,"e":5},{"b":4,"e":11},{"b":11,"e":15},{"b":4,"e":10},{"b":4,"e":12},{"b":2,"e":7,"o":1}]}
	});
	group.templates.push({
		name: 'Allose <i>Pyranose Form</i>',
		data: {"a":[{"x":-36.6654,"y":-9.7292},{"x":-22.0845,"y":15.5237},{"x":-36.6654,"y":-29.7292,"l":"H"},{"x":-8.6254,"y":-2.3409},{"x":-54.1679,"y":-0.0514,"l":"O"},{"x":-22.0845,"y":35.5237,"l":"O"},{"x":-41.6882,"y":11.5623,"l":"H"},{"x":6.1279,"y":8.1324},{"x":-8.6254,"y":24.8818,"l":"H"},{"x":-23.6658,"y":-15.5237},{"x":19.5899,"y":-9.7292,"l":"O"},{"x":34.1679,"y":15.5237},{"x":6.1279,"y":-11.8676,"l":"H"},{"x":20.3041,"y":22.2404,"l":"O"},{"x":-23.6658,"y":-35.5237,"l":"O"},{"x":54.1679,"y":15.5237,"l":"O"}],"b":[{"b":0,"e":1},{"b":3,"e":0},{"b":10,"e":3},{"b":11,"e":7},{"b":11,"e":10},{"b":3,"e":8},{"b":7,"e":12},{"b":7,"e":13},{"b":3,"e":9},{"b":9,"e":14},{"b":0,"e":2},{"b":0,"e":4},{"b":1,"e":5},{"b":1,"e":6},{"b":1,"e":7,"o":1},{"b":11,"e":15,"o":1}]}
	});
	group.templates.push({
		name: 'Altrose <i>Fisher Projection</i>',
		data: {"a":[{"x":0,"y":-50,"l":"CHO"},{"x":0,"y":-30},{"x":-20,"y":-30,"l":"O"},{"x":0,"y":-10},{"x":20,"y":-30,"l":"H"},{"x":-20,"y":-10,"l":"H"},{"x":20,"y":-10,"l":"O"},{"x":0,"y":10},{"x":20,"y":10,"l":"O"},{"x":-20,"y":10,"l":"H"},{"x":0,"y":30},{"x":-20,"y":30,"l":"H"},{"x":0,"y":50,"l":"CH2OH"},{"x":20,"y":30,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":1,"e":4},{"b":1,"e":3},{"b":3,"e":5},{"b":3,"e":6},{"b":3,"e":7},{"b":7,"e":9},{"b":7,"e":8},{"b":7,"e":10},{"b":10,"e":11},{"b":10,"e":13},{"b":10,"e":12}]}
	});
	group.templates.push({
		name: 'Altrose <i>Furanose Form</i>',
		data: {"a":[{"x":7.3205,"y":-13.6239,"l":"O"},{"x":-27.7677,"y":-1.3055},{"x":42.4087,"y":-1.3055},{"x":-27.7677,"y":18.6945,"l":"H"},{"x":-14.3652,"y":18.6261},{"x":-27.7677,"y":-21.3055},{"x":29.0062,"y":18.6261},{"x":62.4087,"y":-1.3055,"l":"O"},{"x":-14.3652,"y":38.6261,"l":"O"},{"x":-14.3652,"y":-1.3739,"l":"H"},{"x":-9.2969,"y":-28.9755,"l":"H"},{"x":-45.0882,"y":-31.3055},{"x":-17.7677,"y":-38.6261,"l":"O"},{"x":29.0062,"y":-1.3739,"l":"O"},{"x":29.0062,"y":38.6261,"l":"H"},{"x":-62.4087,"y":-21.3055,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":4},{"b":4,"e":6,"o":1},{"b":2,"e":6},{"b":2,"e":0},{"b":4,"e":9},{"b":4,"e":8},{"b":6,"e":13},{"b":6,"e":14},{"b":1,"e":5},{"b":1,"e":3},{"b":5,"e":11},{"b":11,"e":15},{"b":5,"e":12},{"b":5,"e":10},{"b":2,"e":7,"o":1}]}
	});
	group.templates.push({
		name: 'Altrose <i>Pyranose Form</i>',
		data: {"a":[{"x":-36.6654,"y":-9.7292},{"x":-22.0845,"y":15.5237},{"x":-36.6654,"y":-29.7292,"l":"H"},{"x":-8.6254,"y":-2.3409},{"x":-54.1679,"y":-0.0514,"l":"O"},{"x":-22.0845,"y":35.5237,"l":"O"},{"x":6.1279,"y":8.1324},{"x":-41.6882,"y":11.5623,"l":"H"},{"x":-8.6254,"y":24.8818,"l":"H"},{"x":19.5899,"y":-9.7292,"l":"O"},{"x":-23.6658,"y":-15.5237},{"x":20.3041,"y":22.2404,"l":"H"},{"x":34.1679,"y":15.5237},{"x":6.1279,"y":-11.8676,"l":"O"},{"x":-23.6658,"y":-35.5237,"l":"O"},{"x":54.1679,"y":15.5237,"l":"O"}],"b":[{"b":0,"e":1},{"b":3,"e":0},{"b":9,"e":3},{"b":12,"e":6},{"b":12,"e":9},{"b":3,"e":8},{"b":6,"e":13},{"b":6,"e":11},{"b":3,"e":10},{"b":10,"e":14},{"b":0,"e":2},{"b":0,"e":4},{"b":1,"e":5},{"b":1,"e":7},{"b":1,"e":6,"o":1},{"b":12,"e":15,"o":1}]}
	});
	group.templates.push({
		name: 'Galactose <i>Fisher Projection</i>',
		data: {"a":[{"x":0,"y":-50,"l":"CHO"},{"x":0,"y":-30},{"x":20,"y":-30,"l":"O"},{"x":0,"y":-10},{"x":-20,"y":-30,"l":"H"},{"x":-20,"y":-10,"l":"O"},{"x":20,"y":-10,"l":"H"},{"x":0,"y":10},{"x":-20,"y":10,"l":"O"},{"x":20,"y":10,"l":"H"},{"x":0,"y":30},{"x":20,"y":30,"l":"O"},{"x":0,"y":50,"l":"CH2OH"},{"x":-20,"y":30,"l":"H"}],"b":[{"b":0,"e":1},{"b":1,"e":4},{"b":1,"e":2},{"b":1,"e":3},{"b":3,"e":5},{"b":3,"e":6},{"b":3,"e":7},{"b":7,"e":8},{"b":7,"e":9},{"b":7,"e":10},{"b":10,"e":13},{"b":10,"e":11},{"b":10,"e":12}]}
	});
	group.templates.push({
		name: 'Galactose <i>Furanose Form</i>',
		data: {"a":[{"x":8.6603,"y":-22.3184,"l":"O"},{"x":43.7485,"y":-10},{"x":-26.428,"y":-10},{"x":30.346,"y":9.9316},{"x":63.7485,"y":-10,"l":"O"},{"x":-43.7485,"y":0},{"x":-13.0255,"y":9.9316},{"x":-26.428,"y":-30,"l":"H"},{"x":30.346,"y":-10.0684,"l":"H"},{"x":30.346,"y":29.9316,"l":"O"},{"x":-63.7485,"y":0,"l":"O"},{"x":-53.7485,"y":-17.3205,"l":"H"},{"x":-43.7485,"y":20},{"x":-13.0255,"y":-10.0684,"l":"O"},{"x":-13.0255,"y":29.9316,"l":"H"},{"x":-61.069,"y":30,"l":"O"}],"b":[{"b":6,"e":3,"o":1},{"b":1,"e":3},{"b":1,"e":0},{"b":6,"e":13},{"b":6,"e":14},{"b":3,"e":8},{"b":3,"e":9},{"b":1,"e":4,"o":1},{"b":0,"e":2},{"b":2,"e":6},{"b":2,"e":7},{"b":2,"e":5},{"b":5,"e":12},{"b":12,"e":15},{"b":5,"e":11},{"b":5,"e":10}]}
	});
	group.templates.push({
		name: 'Galactose <i>Pyranose Form</i>',
		data: {"a":[{"x":-36.6654,"y":-9.7292},{"x":-36.6654,"y":-29.7292,"l":"O"},{"x":-54.1679,"y":-0.0514,"l":"H"},{"x":-22.0845,"y":15.5237},{"x":-8.6254,"y":-2.3409},{"x":-41.6882,"y":11.5623,"l":"O"},{"x":6.1279,"y":8.1324},{"x":-22.0845,"y":35.5237,"l":"H"},{"x":-8.6254,"y":24.8818,"l":"H"},{"x":-23.6658,"y":-15.5237},{"x":19.5899,"y":-9.7292,"l":"O"},{"x":34.1679,"y":15.5237},{"x":6.1279,"y":-11.8676,"l":"H"},{"x":20.3041,"y":22.2404,"l":"O"},{"x":-23.6658,"y":-35.5237,"l":"O"},{"x":54.1679,"y":15.5237,"l":"O"}],"b":[{"b":0,"e":3},{"b":4,"e":0},{"b":10,"e":4},{"b":11,"e":6},{"b":11,"e":10},{"b":4,"e":8},{"b":6,"e":12},{"b":6,"e":13},{"b":4,"e":9},{"b":9,"e":14},{"b":0,"e":1},{"b":0,"e":2},{"b":3,"e":7},{"b":3,"e":5},{"b":3,"e":6,"o":1},{"b":11,"e":15,"o":1}]}
	});
	group.templates.push({
		name: 'Glucose <i>Fisher Projection</i>',
		data: {"a":[{"x":0,"y":-50,"l":"CHO"},{"x":0,"y":-30},{"x":-20,"y":-30,"l":"H"},{"x":20,"y":-30,"l":"O"},{"x":0,"y":-10},{"x":20,"y":-10,"l":"H"},{"x":-20,"y":-10,"l":"O"},{"x":0,"y":10},{"x":-20,"y":10,"l":"H"},{"x":20,"y":10,"l":"O"},{"x":0,"y":30},{"x":-20,"y":30,"l":"H"},{"x":20,"y":30,"l":"O"},{"x":0,"y":50,"l":"CH2OH"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":1,"e":3},{"b":1,"e":4},{"b":4,"e":6},{"b":4,"e":5},{"b":4,"e":7},{"b":7,"e":8},{"b":7,"e":9},{"b":7,"e":10},{"b":10,"e":11},{"b":10,"e":12},{"b":10,"e":13}]}
	});
	group.templates.push({
		name: 'Glucose <i>Furanose Form</i>',
		data: {"a":[{"x":7.3205,"y":-13.6239,"l":"O"},{"x":42.4087,"y":-1.3055},{"x":-27.7677,"y":-1.3055},{"x":29.0062,"y":18.6261},{"x":62.4087,"y":-1.3055,"l":"O"},{"x":-27.7677,"y":18.6945,"l":"H"},{"x":-14.3652,"y":18.6261},{"x":-27.7677,"y":-21.3055},{"x":29.0062,"y":38.6261,"l":"O"},{"x":29.0062,"y":-1.3739,"l":"H"},{"x":-14.3652,"y":38.6261,"l":"H"},{"x":-14.3652,"y":-1.3739,"l":"O"},{"x":-9.2969,"y":-28.9755,"l":"H"},{"x":-17.7677,"y":-38.6261,"l":"O"},{"x":-45.0882,"y":-31.3055},{"x":-62.4087,"y":-21.3055,"l":"O"}],"b":[{"b":0,"e":2},{"b":2,"e":6},{"b":6,"e":3,"o":1},{"b":1,"e":3},{"b":1,"e":0},{"b":6,"e":11},{"b":6,"e":10},{"b":3,"e":9},{"b":3,"e":8},{"b":2,"e":7},{"b":2,"e":5},{"b":7,"e":14},{"b":14,"e":15},{"b":7,"e":13},{"b":7,"e":12},{"b":1,"e":4,"o":1}]}
	});
	group.templates.push({
		name: 'Glucose <i>Pyranose Form</i>',
		data: {"a":[{"x":-36.6654,"y":-9.7292},{"x":-54.1679,"y":-0.0514,"l":"O"},{"x":-36.6654,"y":-29.7292,"l":"H"},{"x":-8.6254,"y":-2.3409},{"x":-22.0845,"y":15.5237},{"x":19.5899,"y":-9.7292,"l":"O"},{"x":-8.6254,"y":24.8818,"l":"H"},{"x":-23.6658,"y":-15.5237},{"x":-22.0845,"y":35.5237,"l":"H"},{"x":6.1279,"y":8.1324},{"x":-41.6882,"y":11.5623,"l":"O"},{"x":34.1679,"y":15.5237},{"x":-23.6658,"y":-35.5237,"l":"O"},{"x":20.3041,"y":22.2404,"l":"O"},{"x":6.1279,"y":-11.8676,"l":"H"},{"x":54.1679,"y":15.5237,"l":"O"}],"b":[{"b":0,"e":4},{"b":3,"e":0},{"b":5,"e":3},{"b":11,"e":9},{"b":11,"e":5},{"b":3,"e":6},{"b":9,"e":14},{"b":9,"e":13},{"b":3,"e":7},{"b":7,"e":12},{"b":0,"e":2},{"b":0,"e":1},{"b":4,"e":8},{"b":4,"e":10},{"b":4,"e":9,"o":1},{"b":11,"e":15,"o":1}]}
	});
	group.templates.push({
		name: 'Gulose <i>Fisher Projection</i>',
		data: {"a":[{"x":0,"y":-50,"l":"CHO"},{"x":0,"y":-30},{"x":-20,"y":-30,"l":"H"},{"x":20,"y":-30,"l":"O"},{"x":0,"y":-10},{"x":-20,"y":-10,"l":"H"},{"x":20,"y":-10,"l":"O"},{"x":0,"y":10},{"x":-20,"y":10,"l":"O"},{"x":20,"y":10,"l":"H"},{"x":0,"y":30},{"x":-20,"y":30,"l":"H"},{"x":20,"y":30,"l":"O"},{"x":0,"y":50,"l":"CH2OH"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":1,"e":3},{"b":1,"e":4},{"b":4,"e":5},{"b":4,"e":6},{"b":4,"e":7},{"b":7,"e":8},{"b":7,"e":9},{"b":7,"e":10},{"b":10,"e":11},{"b":10,"e":12},{"b":10,"e":13}]}
	});
	group.templates.push({
		name: 'Gulose <i>Furanose Form</i>',
		data: {"a":[{"x":8.6603,"y":-22.3184,"l":"O"},{"x":43.7485,"y":-10},{"x":-26.428,"y":-10},{"x":63.7485,"y":-10,"l":"O"},{"x":30.346,"y":9.9316},{"x":-43.7485,"y":0},{"x":-13.0255,"y":9.9316},{"x":-26.428,"y":-30,"l":"H"},{"x":30.346,"y":29.9316,"l":"O"},{"x":30.346,"y":-10.0684,"l":"H"},{"x":-43.7485,"y":20},{"x":-53.7485,"y":-17.3205,"l":"H"},{"x":-63.7485,"y":0,"l":"O"},{"x":-13.0255,"y":29.9316,"l":"O"},{"x":-13.0255,"y":-10.0684,"l":"H"},{"x":-61.069,"y":30,"l":"O"}],"b":[{"b":6,"e":4,"o":1},{"b":1,"e":4},{"b":1,"e":0},{"b":6,"e":14},{"b":6,"e":13},{"b":4,"e":9},{"b":4,"e":8},{"b":1,"e":3,"o":1},{"b":0,"e":2},{"b":2,"e":6},{"b":2,"e":7},{"b":2,"e":5},{"b":5,"e":10},{"b":10,"e":15},{"b":5,"e":11},{"b":5,"e":12}]}
	});
	group.templates.push({
		name: 'Gulose <i>Pyranose Form</i>',
		data: {"a":[{"x":-36.6654,"y":-9.7292},{"x":-22.0845,"y":15.5237},{"x":-36.6654,"y":-29.7292,"l":"O"},{"x":-54.1679,"y":-0.0514,"l":"H"},{"x":-8.6254,"y":-2.3409},{"x":-41.6882,"y":11.5623,"l":"H"},{"x":-22.0845,"y":35.5237,"l":"O"},{"x":6.1279,"y":8.1324},{"x":-8.6254,"y":24.8818,"l":"H"},{"x":19.5899,"y":-9.7292,"l":"O"},{"x":-23.6658,"y":-15.5237},{"x":34.1679,"y":15.5237},{"x":6.1279,"y":-11.8676,"l":"H"},{"x":20.3041,"y":22.2404,"l":"O"},{"x":-23.6658,"y":-35.5237,"l":"O"},{"x":54.1679,"y":15.5237,"l":"O"}],"b":[{"b":0,"e":1},{"b":4,"e":0},{"b":9,"e":4},{"b":11,"e":7},{"b":11,"e":9},{"b":4,"e":8},{"b":7,"e":12},{"b":7,"e":13},{"b":4,"e":10},{"b":10,"e":14},{"b":0,"e":2},{"b":0,"e":3},{"b":1,"e":6},{"b":1,"e":5},{"b":1,"e":7,"o":1},{"b":11,"e":15,"o":1}]}
	});
	group.templates.push({
		name: 'Idose <i>Fisher Projection</i>',
		data: {"a":[{"x":0,"y":-50,"l":"CHO"},{"x":0,"y":-30},{"x":0,"y":-10},{"x":20,"y":-30,"l":"H"},{"x":-20,"y":-30,"l":"O"},{"x":0,"y":10},{"x":-20,"y":-10,"l":"H"},{"x":20,"y":-10,"l":"O"},{"x":0,"y":30},{"x":-20,"y":10,"l":"O"},{"x":20,"y":10,"l":"H"},{"x":-20,"y":30,"l":"H"},{"x":20,"y":30,"l":"O"},{"x":0,"y":50,"l":"CH2OH"}],"b":[{"b":0,"e":1},{"b":1,"e":4},{"b":1,"e":3},{"b":1,"e":2},{"b":2,"e":6},{"b":2,"e":7},{"b":2,"e":5},{"b":5,"e":9},{"b":5,"e":10},{"b":5,"e":8},{"b":8,"e":11},{"b":8,"e":12},{"b":8,"e":13}]}
	});
	group.templates.push({
		name: 'Idose <i>Furanose Form</i>',
		data: {"a":[{"x":8.6603,"y":-22.3184,"l":"O"},{"x":43.7485,"y":-10},{"x":-26.428,"y":-10},{"x":30.346,"y":9.9316},{"x":63.7485,"y":-10,"l":"O"},{"x":-43.7485,"y":0},{"x":-13.0255,"y":9.9316},{"x":-26.428,"y":-30,"l":"H"},{"x":30.346,"y":-10.0684,"l":"O"},{"x":30.346,"y":29.9316,"l":"H"},{"x":-53.7485,"y":-17.3205,"l":"H"},{"x":-43.7485,"y":20},{"x":-63.7485,"y":0,"l":"O"},{"x":-13.0255,"y":-10.0684,"l":"H"},{"x":-13.0255,"y":29.9316,"l":"O"},{"x":-61.069,"y":30,"l":"O"}],"b":[{"b":6,"e":3,"o":1},{"b":1,"e":3},{"b":1,"e":0},{"b":6,"e":13},{"b":6,"e":14},{"b":3,"e":8},{"b":3,"e":9},{"b":1,"e":4,"o":1},{"b":0,"e":2},{"b":2,"e":6},{"b":2,"e":7},{"b":2,"e":5},{"b":5,"e":11},{"b":11,"e":15},{"b":5,"e":10},{"b":5,"e":12}]}
	});
	group.templates.push({
		name: 'Idose <i>Pyranose Form</i>',
		data: {"a":[{"x":-36.6654,"y":-9.7292},{"x":-22.0845,"y":15.5237},{"x":-54.1679,"y":-0.0514,"l":"H"},{"x":-8.6254,"y":-2.3409},{"x":-36.6654,"y":-29.7292,"l":"O"},{"x":-41.6882,"y":11.5623,"l":"H"},{"x":-22.0845,"y":35.5237,"l":"O"},{"x":6.1279,"y":8.1324},{"x":-8.6254,"y":24.8818,"l":"H"},{"x":19.5899,"y":-9.7292,"l":"O"},{"x":-23.6658,"y":-15.5237},{"x":20.3041,"y":22.2404,"l":"H"},{"x":6.1279,"y":-11.8676,"l":"O"},{"x":34.1679,"y":15.5237},{"x":-23.6658,"y":-35.5237,"l":"O"},{"x":54.1679,"y":15.5237,"l":"O"}],"b":[{"b":0,"e":1},{"b":3,"e":0},{"b":9,"e":3},{"b":13,"e":7},{"b":13,"e":9},{"b":3,"e":8},{"b":7,"e":12},{"b":7,"e":11},{"b":3,"e":10},{"b":10,"e":14},{"b":0,"e":4},{"b":0,"e":2},{"b":1,"e":6},{"b":1,"e":5},{"b":1,"e":7,"o":1},{"b":13,"e":15,"o":1}]}
	});
	group.templates.push({
		name: 'Mannose <i>Fisher Projection</i>',
		data: {"a":[{"x":0,"y":-50,"l":"CHO"},{"x":0,"y":-30},{"x":20,"y":-30,"l":"H"},{"x":-20,"y":-30,"l":"O"},{"x":0,"y":-10},{"x":20,"y":-10,"l":"H"},{"x":-20,"y":-10,"l":"O"},{"x":0,"y":10},{"x":0,"y":30},{"x":-20,"y":10,"l":"H"},{"x":20,"y":10,"l":"O"},{"x":-20,"y":30,"l":"H"},{"x":0,"y":50,"l":"CH2OH"},{"x":20,"y":30,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":1,"e":2},{"b":1,"e":4},{"b":4,"e":6},{"b":4,"e":5},{"b":4,"e":7},{"b":7,"e":9},{"b":7,"e":10},{"b":7,"e":8},{"b":8,"e":11},{"b":8,"e":13},{"b":8,"e":12}]}
	});
	group.templates.push({
		name: 'Mannose <i>Furanose Form</i>',
		data: {"a":[{"x":7.3205,"y":-13.6239,"l":"O"},{"x":42.4087,"y":-1.3055},{"x":-27.7677,"y":-1.3055},{"x":29.0062,"y":18.6261},{"x":62.4087,"y":-1.3055,"l":"O"},{"x":-14.3652,"y":18.6261},{"x":-27.7677,"y":18.6945,"l":"H"},{"x":-27.7677,"y":-21.3055},{"x":29.0062,"y":38.6261,"l":"H"},{"x":29.0062,"y":-1.3739,"l":"O"},{"x":-14.3652,"y":-1.3739,"l":"O"},{"x":-14.3652,"y":38.6261,"l":"H"},{"x":-9.2969,"y":-28.9755,"l":"H"},{"x":-45.0882,"y":-31.3055},{"x":-17.7677,"y":-38.6261,"l":"O"},{"x":-62.4087,"y":-21.3055,"l":"O"}],"b":[{"b":0,"e":2},{"b":2,"e":5},{"b":5,"e":3,"o":1},{"b":1,"e":3},{"b":1,"e":0},{"b":5,"e":10},{"b":5,"e":11},{"b":3,"e":9},{"b":3,"e":8},{"b":2,"e":7},{"b":2,"e":6},{"b":7,"e":13},{"b":13,"e":15},{"b":7,"e":14},{"b":7,"e":12},{"b":1,"e":4,"o":1}]}
	});
	group.templates.push({
		name: 'Mannose <i>Pyranose Form</i>',
		data: {"a":[{"x":-36.6654,"y":-9.7292},{"x":-8.6254,"y":-2.3409},{"x":-36.6654,"y":-29.7292,"l":"H"},{"x":-54.1679,"y":-0.0514,"l":"O"},{"x":-22.0845,"y":15.5237},{"x":19.5899,"y":-9.7292,"l":"O"},{"x":-8.6254,"y":24.8818,"l":"H"},{"x":-23.6658,"y":-15.5237},{"x":6.1279,"y":8.1324},{"x":-22.0845,"y":35.5237,"l":"H"},{"x":-41.6882,"y":11.5623,"l":"O"},{"x":34.1679,"y":15.5237},{"x":-23.6658,"y":-35.5237,"l":"O"},{"x":6.1279,"y":-11.8676,"l":"O"},{"x":20.3041,"y":22.2404,"l":"H"},{"x":54.1679,"y":15.5237,"l":"O"}],"b":[{"b":0,"e":4},{"b":1,"e":0},{"b":5,"e":1},{"b":11,"e":8},{"b":11,"e":5},{"b":1,"e":6},{"b":8,"e":13},{"b":8,"e":14},{"b":1,"e":7},{"b":7,"e":12},{"b":0,"e":2},{"b":0,"e":3},{"b":4,"e":9},{"b":4,"e":10},{"b":4,"e":8,"o":1},{"b":11,"e":15,"o":1}]}
	});
	group.templates.push({
		name: 'Talose <i>Fisher Projection</i>',
		data: {"a":[{"x":0,"y":-50,"l":"CHO"},{"x":0,"y":-30},{"x":0,"y":-10},{"x":-20,"y":-30,"l":"O"},{"x":20,"y":-30,"l":"H"},{"x":-20,"y":-10,"l":"O"},{"x":20,"y":-10,"l":"H"},{"x":0,"y":10},{"x":20,"y":10,"l":"H"},{"x":0,"y":30},{"x":-20,"y":10,"l":"O"},{"x":20,"y":30,"l":"O"},{"x":0,"y":50,"l":"CH2OH"},{"x":-20,"y":30,"l":"H"}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":1,"e":4},{"b":1,"e":2},{"b":2,"e":5},{"b":2,"e":6},{"b":2,"e":7},{"b":7,"e":10},{"b":7,"e":8},{"b":7,"e":9},{"b":9,"e":13},{"b":9,"e":11},{"b":9,"e":12}]}
	});
	group.templates.push({
		name: 'Talose <i>Furanose Form</i>',
		data: {"a":[{"x":8.6603,"y":-22.3184,"l":"O"},{"x":43.7485,"y":-10},{"x":-26.428,"y":-10},{"x":30.346,"y":9.9316},{"x":63.7485,"y":-10,"l":"O"},{"x":-13.0255,"y":9.9316},{"x":-26.428,"y":-30,"l":"H"},{"x":-43.7485,"y":0},{"x":30.346,"y":29.9316,"l":"H"},{"x":30.346,"y":-10.0684,"l":"O"},{"x":-13.0255,"y":29.9316,"l":"H"},{"x":-13.0255,"y":-10.0684,"l":"O"},{"x":-43.7485,"y":20},{"x":-53.7485,"y":-17.3205,"l":"H"},{"x":-63.7485,"y":0,"l":"O"},{"x":-61.069,"y":30,"l":"O"}],"b":[{"b":5,"e":3,"o":1},{"b":1,"e":3},{"b":1,"e":0},{"b":5,"e":11},{"b":5,"e":10},{"b":3,"e":9},{"b":3,"e":8},{"b":1,"e":4,"o":1},{"b":0,"e":2},{"b":2,"e":5},{"b":2,"e":6},{"b":2,"e":7},{"b":7,"e":12},{"b":12,"e":15},{"b":7,"e":13},{"b":7,"e":14}]}
	});
	group.templates.push({
		name: 'Talose <i>Pyranose Form</i>',
		data: {"a":[{"x":-36.6654,"y":-9.7292},{"x":-22.0845,"y":15.5237},{"x":-54.1679,"y":-0.0514,"l":"H"},{"x":-36.6654,"y":-29.7292,"l":"O"},{"x":-8.6254,"y":-2.3409},{"x":-41.6882,"y":11.5623,"l":"O"},{"x":-22.0845,"y":35.5237,"l":"H"},{"x":6.1279,"y":8.1324},{"x":19.5899,"y":-9.7292,"l":"O"},{"x":-8.6254,"y":24.8818,"l":"H"},{"x":-23.6658,"y":-15.5237},{"x":34.1679,"y":15.5237},{"x":20.3041,"y":22.2404,"l":"H"},{"x":6.1279,"y":-11.8676,"l":"O"},{"x":-23.6658,"y":-35.5237,"l":"O"},{"x":54.1679,"y":15.5237,"l":"O"}],"b":[{"b":0,"e":1},{"b":4,"e":0},{"b":8,"e":4},{"b":11,"e":7},{"b":11,"e":8},{"b":4,"e":9},{"b":7,"e":13},{"b":7,"e":12},{"b":4,"e":10},{"b":10,"e":14},{"b":0,"e":3},{"b":0,"e":2},{"b":1,"e":6},{"b":1,"e":5},{"b":1,"e":7,"o":1},{"b":11,"e":15,"o":1}]}
	});
	d.push(group);
	
	group = {name:'Sugars (Other Monosaccharides)', templates:[]};
	group.templates.push({
		name: 'Glyceraldehyde <i>Fisher Projection</i>',
		data: {"a":[{"x":0,"y":0},{"x":0,"y":-20,"l":"CHO"},{"x":0,"y":20,"l":"CH2OH"},{"x":-20,"y":0,"l":"H"},{"x":20,"y":0,"l":"O"}],"b":[{"b":0,"e":1},{"b":0,"e":2},{"b":0,"e":3},{"b":0,"e":4}]}
	});
	group.templates.push({
		name: 'Erythrose <i>Fisher Projection</i>',
		data: {"a":[{"x":0,"y":-30,"l":"CHO"},{"x":0,"y":-10},{"x":20,"y":-10,"l":"O"},{"x":0,"y":10},{"x":-20,"y":-10,"l":"H"},{"x":20,"y":10,"l":"O"},{"x":0,"y":30,"l":"CH2OH"},{"x":-20,"y":10,"l":"H"}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":3,"e":6},{"b":3,"e":5},{"b":1,"e":2},{"b":1,"e":4},{"b":3,"e":7}]}
	});
	group.templates.push({
		name: 'Threose <i>Fisher Projection</i>',
		data: {"a":[{"x":0,"y":-30,"l":"CHO"},{"x":0,"y":-10},{"x":0,"y":10},{"x":20,"y":-10,"l":"H"},{"x":-20,"y":-10,"l":"O"},{"x":-20,"y":10,"l":"H"},{"x":20,"y":10,"l":"O"},{"x":0,"y":30,"l":"CH2OH"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":2,"e":7},{"b":2,"e":6},{"b":1,"e":3},{"b":1,"e":4},{"b":2,"e":5}]}
	});
	group.templates.push({
		name: 'Ribose <i>Fisher Projection</i>',
		data: {"a":[{"x":0,"y":-20},{"x":20,"y":-20,"l":"O"},{"x":0,"y":0},{"x":0,"y":-40,"l":"CHO"},{"x":-20,"y":-20,"l":"H"},{"x":20,"y":0,"l":"O"},{"x":-20,"y":0,"l":"H"},{"x":0,"y":20},{"x":0,"y":40,"l":"CH2OH"},{"x":20,"y":20,"l":"O"},{"x":-20,"y":20,"l":"H"}],"b":[{"b":0,"e":3},{"b":0,"e":2},{"b":2,"e":7},{"b":7,"e":8},{"b":0,"e":4},{"b":0,"e":1},{"b":2,"e":6},{"b":2,"e":5},{"b":7,"e":10},{"b":7,"e":9}]}
	});
	group.templates.push({
		name: 'Arabinose <i>Fisher Projection</i>',
		data: {"a":[{"x":0,"y":-20},{"x":0,"y":-40,"l":"CHO"},{"x":-20,"y":-20,"l":"O"},{"x":0,"y":0},{"x":20,"y":-20,"l":"H"},{"x":-20,"y":0,"l":"H"},{"x":20,"y":0,"l":"O"},{"x":0,"y":20},{"x":0,"y":40,"l":"CH2OH"},{"x":-20,"y":20,"l":"H"},{"x":20,"y":20,"l":"O"}],"b":[{"b":0,"e":1},{"b":0,"e":3},{"b":3,"e":7},{"b":7,"e":8},{"b":0,"e":2},{"b":0,"e":4},{"b":3,"e":5},{"b":3,"e":6},{"b":7,"e":9},{"b":7,"e":10}]}
	});
	group.templates.push({
		name: 'Xylose <i>Fisher Projection</i>',
		data: {"a":[{"x":0,"y":-20},{"x":0,"y":-40,"l":"CHO"},{"x":0,"y":0},{"x":-20,"y":-20,"l":"H"},{"x":20,"y":-20,"l":"O"},{"x":20,"y":0,"l":"H"},{"x":0,"y":20},{"x":-20,"y":0,"l":"O"},{"x":20,"y":20,"l":"O"},{"x":-20,"y":20,"l":"H"},{"x":0,"y":40,"l":"CH2OH"}],"b":[{"b":0,"e":1},{"b":0,"e":2},{"b":2,"e":6},{"b":6,"e":10},{"b":0,"e":3},{"b":0,"e":4},{"b":2,"e":7},{"b":2,"e":5},{"b":6,"e":9},{"b":6,"e":8}]}
	});
	group.templates.push({
		name: 'Lyxose <i>Fisher Projection</i>',
		data: {"a":[{"x":0,"y":-20},{"x":-20,"y":-20,"l":"O"},{"x":0,"y":-40,"l":"CHO"},{"x":20,"y":-20,"l":"H"},{"x":0,"y":0},{"x":20,"y":0,"l":"H"},{"x":0,"y":20},{"x":-20,"y":0,"l":"O"},{"x":20,"y":20,"l":"O"},{"x":-20,"y":20,"l":"H"},{"x":0,"y":40,"l":"CH2OH"}],"b":[{"b":0,"e":2},{"b":0,"e":4},{"b":4,"e":6},{"b":6,"e":10},{"b":0,"e":1},{"b":0,"e":3},{"b":4,"e":7},{"b":4,"e":5},{"b":6,"e":9},{"b":6,"e":8}]}
	});
	d.push(group);
	
	group = {name:'Nucleotides', templates:[]};
	group.templates.push({
		name: 'Adenine',
		data: {"a":[{"x":-32.709,"y":10},{"x":-20.9532,"y":26.1804,"l":"N"},{"x":-20.9532,"y":-6.1803,"l":"N"},{"x":-1.9321,"y":20},{"x":-1.9321,"y":0},{"x":15.3884,"y":30.0001,"l":"N"},{"x":15.3884,"y":-10},{"x":32.709,"y":20},{"x":15.3884,"y":-30,"l":"N"},{"x":32.709,"y":0,"l":"N"}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":3,"e":4,"o":2},{"b":4,"e":2},{"b":2,"e":0,"o":2},{"b":3,"e":5},{"b":5,"e":7,"o":2},{"b":7,"e":9},{"b":9,"e":6,"o":2},{"b":6,"e":4},{"b":6,"e":8}]}
	});
	group.templates.push({
		name: 'Guanine',
		data: {"a":[{"x":-41.3692,"y":10},{"x":-29.6135,"y":-6.1804,"l":"N"},{"x":-29.6135,"y":26.1803,"l":"N"},{"x":-10.5924,"y":-0},{"x":-10.5924,"y":20},{"x":6.7282,"y":-10.0001},{"x":6.7282,"y":30,"l":"N"},{"x":6.7282,"y":-30,"l":"O"},{"x":24.0487,"y":-0,"l":"N"},{"x":24.0487,"y":20},{"x":41.3692,"y":30,"l":"N"}],"b":[{"b":0,"e":2},{"b":2,"e":4},{"b":4,"e":3,"o":2},{"b":3,"e":1},{"b":1,"e":0,"o":2},{"b":4,"e":6},{"b":6,"e":9,"o":2},{"b":9,"e":8},{"b":8,"e":5},{"b":5,"e":3},{"b":5,"e":7,"o":2},{"b":9,"e":10}]}
	});
	group.templates.push({
		name: 'Cytosine',
		data: {"a":[{"x":-8.6603,"y":-10},{"x":-8.6603,"y":-30,"l":"N"},{"x":-25.9808,"y":0},{"x":8.6603,"y":0,"l":"N"},{"x":-25.9808,"y":20},{"x":8.6603,"y":20},{"x":-8.6603,"y":30,"l":"N"},{"x":25.9808,"y":30,"l":"O"}],"b":[{"b":0,"e":2},{"b":2,"e":4,"o":2},{"b":4,"e":6},{"b":6,"e":5},{"b":5,"e":3},{"b":3,"e":0,"o":2},{"b":5,"e":7,"o":2},{"b":0,"e":1}]}
	});
	group.templates.push({
		name: 'Thymine',
		data: {"a":[{"x":0,"y":-10},{"x":17.3205,"y":0,"l":"N"},{"x":0,"y":-30,"l":"O"},{"x":-17.3205,"y":0},{"x":17.3205,"y":20},{"x":-17.3205,"y":20},{"x":-34.641,"y":-10},{"x":34.641,"y":30,"l":"O"},{"x":0,"y":30,"l":"N"}],"b":[{"b":0,"e":3},{"b":3,"e":5,"o":2},{"b":5,"e":8},{"b":8,"e":4},{"b":4,"e":1},{"b":1,"e":0},{"b":0,"e":2,"o":2},{"b":3,"e":6},{"b":4,"e":7,"o":2}]}
	});
	group.templates.push({
		name: 'Uracil',
		data: {"a":[{"x":-8.6603,"y":-10},{"x":-25.9808,"y":0},{"x":-8.6603,"y":-30,"l":"O"},{"x":8.6603,"y":0,"l":"N"},{"x":-25.9808,"y":20},{"x":8.6603,"y":20},{"x":-8.6603,"y":30,"l":"N"},{"x":25.9808,"y":30,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":4,"o":2},{"b":4,"e":6},{"b":6,"e":5},{"b":5,"e":3},{"b":3,"e":0},{"b":0,"e":2,"o":2},{"b":5,"e":7,"o":2}]}
	});
	group.templates.push({
		name: 'Ribonucleoside',
		data: {"a":[{"x":-14.2796,"y":-14.9551},{"c":-1,"x":-34.2796,"y":-14.9551,"l":"O"},{"x":-14.2796,"y":5.0449},{"x":9.5513,"y":-2.7359,"l":"O"},{"x":-5.177,"y":17.6345},{"x":33.3822,"y":5.045},{"x":24.2796,"y":17.6345},{"x":-15.177,"y":34.955,"l":"O"},{"x":33.3822,"y":-34.955,"l":"N"},{"x":34.2796,"y":34.955,"l":"O"}],"b":[{"b":3,"e":2},{"b":2,"e":4},{"b":4,"e":6,"o":1},{"b":5,"e":6},{"b":5,"e":3},{"b":4,"e":7},{"b":5,"e":8},{"b":2,"e":0},{"b":0,"e":1},{"b":6,"e":9}]}
	});
	group.templates.push({
		name: 'Ribonucleoside Monophosphate',
		data: {"a":[{"x":5.7204,"y":-14.955},{"x":-14.2796,"y":-14.955,"l":"O"},{"x":5.7204,"y":5.045},{"x":-34.2796,"y":-14.955,"l":"P"},{"x":14.823,"y":17.6345},{"x":29.5513,"y":-2.7358,"l":"O"},{"c":-1,"x":-54.2796,"y":-14.9551,"l":"O"},{"x":-34.2796,"y":-34.955,"l":"O"},{"c":-1,"x":-34.2796,"y":5.045,"l":"O"},{"x":4.823,"y":34.955,"l":"O"},{"x":44.2796,"y":17.6345},{"x":53.3822,"y":5.045},{"x":54.2796,"y":34.955,"l":"O"},{"x":53.3822,"y":-34.955,"l":"N"}],"b":[{"b":5,"e":2},{"b":2,"e":4},{"b":4,"e":10,"o":1},{"b":11,"e":10},{"b":11,"e":5},{"b":4,"e":9},{"b":11,"e":13},{"b":2,"e":0},{"b":0,"e":1},{"b":1,"e":3},{"b":3,"e":6},{"b":3,"e":7,"o":2},{"b":3,"e":8},{"b":10,"e":12}]}
	});
	group.templates.push({
		name: 'Ribonucleoside Diphosphate',
		data: {"a":[{"x":25.7204,"y":-14.955},{"x":5.7204,"y":-14.955,"l":"O"},{"x":25.7204,"y":5.045},{"x":-14.2796,"y":-14.955,"l":"P"},{"x":49.5513,"y":-2.7358,"l":"O"},{"x":34.823,"y":17.6345},{"c":-1,"x":-14.2796,"y":5.045,"l":"O"},{"x":-14.2796,"y":-34.955,"l":"O"},{"x":-34.2796,"y":-14.955,"l":"O"},{"x":73.3822,"y":5.045},{"x":64.2796,"y":17.6345},{"x":24.823,"y":34.955,"l":"O"},{"x":-54.2796,"y":-14.955,"l":"P"},{"x":73.3822,"y":-34.955,"l":"N"},{"x":74.2796,"y":34.9551,"l":"O"},{"c":-1,"x":-54.2796,"y":5.045,"l":"O"},{"x":-54.2796,"y":-34.955,"l":"O"},{"c":-1,"x":-74.2796,"y":-14.955,"l":"O"}],"b":[{"b":4,"e":2},{"b":2,"e":5},{"b":5,"e":10,"o":1},{"b":9,"e":10},{"b":9,"e":4},{"b":5,"e":11},{"b":9,"e":13},{"b":2,"e":0},{"b":0,"e":1},{"b":1,"e":3},{"b":3,"e":8},{"b":3,"e":7,"o":2},{"b":3,"e":6},{"b":10,"e":14},{"b":8,"e":12},{"b":12,"e":17},{"b":12,"e":16,"o":2},{"b":12,"e":15}]}
	});
	group.templates.push({
		name: 'Ribonucleoside Triphosphate',
		data: {"a":[{"x":45.7204,"y":-14.955},{"x":45.7204,"y":5.045},{"x":25.7204,"y":-14.955,"l":"O"},{"x":54.823,"y":17.6345},{"x":69.5513,"y":-2.7358,"l":"O"},{"x":5.7204,"y":-14.955,"l":"P"},{"x":44.823,"y":34.955,"l":"O"},{"x":84.2796,"y":17.6345},{"x":93.3822,"y":5.045},{"c":-1,"x":5.7204,"y":5.045,"l":"O"},{"x":-14.2796,"y":-14.955,"l":"O"},{"x":5.7204,"y":-34.955,"l":"O"},{"x":94.2796,"y":34.9551,"l":"O"},{"x":93.3822,"y":-34.955,"l":"N"},{"x":-34.2796,"y":-14.955,"l":"P"},{"c":-1,"x":-34.2796,"y":5.045,"l":"O"},{"x":-34.2796,"y":-34.955,"l":"O"},{"x":-54.2796,"y":-14.955,"l":"O"},{"x":-74.2796,"y":-14.955,"l":"P"},{"x":-74.2796,"y":-34.955,"l":"O"},{"c":-1,"x":-94.2796,"y":-14.955,"l":"O"},{"c":-1,"x":-74.2796,"y":5.045,"l":"O"}],"b":[{"b":4,"e":1},{"b":1,"e":3},{"b":3,"e":7,"o":1},{"b":8,"e":7},{"b":8,"e":4},{"b":3,"e":6},{"b":8,"e":13},{"b":1,"e":0},{"b":0,"e":2},{"b":2,"e":5},{"b":5,"e":10},{"b":5,"e":11,"o":2},{"b":5,"e":9},{"b":7,"e":12},{"b":10,"e":14},{"b":14,"e":17},{"b":14,"e":16,"o":2},{"b":14,"e":15},{"b":17,"e":18},{"b":18,"e":20},{"b":18,"e":19,"o":2},{"b":18,"e":21}]}
	});
	group.templates.push({
		name: 'Ribonucleotide chain form',
		data: {"a":[{"x":-13.8309,"y":-36.2948},{"x":-33.8309,"y":-36.2948,"l":"O"},{"x":-13.8309,"y":-16.2948},{"x":10,"y":-24.0756,"l":"O"},{"x":-4.7283,"y":-3.7052},{"x":33.8309,"y":-16.2948},{"x":24.7283,"y":-3.7052},{"x":-4.7283,"y":16.2948,"l":"O"},{"x":33.8309,"y":-56.2948,"l":"N"},{"x":24.7283,"y":16.2948,"l":"O"},{"x":-4.7283,"y":36.2948,"l":"P"},{"c":-1,"x":-4.7283,"y":56.2948,"l":"O"},{"c":-1,"x":15.2717,"y":36.2948,"l":"O"},{"x":-24.7283,"y":36.2948,"l":"O"}],"b":[{"b":3,"e":2},{"b":2,"e":4},{"b":4,"e":6,"o":1},{"b":5,"e":6},{"b":5,"e":3},{"b":4,"e":7},{"b":5,"e":8},{"b":2,"e":0},{"b":0,"e":1},{"b":6,"e":9},{"b":7,"e":10},{"b":10,"e":12},{"b":10,"e":13,"o":2},{"b":10,"e":11}]}
	});
	group.templates.push({
		name: 'Deoxyribonucleoside',
		data: {"a":[{"x":-13.8309,"y":-14.9551},{"c":-1,"x":-33.8309,"y":-14.9551,"l":"O"},{"x":-13.8309,"y":5.0449},{"x":10,"y":-2.7359,"l":"O"},{"x":-4.7283,"y":17.6345},{"x":33.8309,"y":5.045},{"x":24.7283,"y":17.6345},{"x":-14.7283,"y":34.955,"l":"O"},{"x":33.8309,"y":-34.955,"l":"N"}],"b":[{"b":3,"e":2},{"b":2,"e":4},{"b":4,"e":6,"o":1},{"b":5,"e":6},{"b":5,"e":3},{"b":4,"e":7},{"b":5,"e":8},{"b":2,"e":0},{"b":0,"e":1}]}
	});
	group.templates.push({
		name: 'Deoxyribonucleoside Monophosphate',
		data: {"a":[{"x":6.1691,"y":-14.955},{"x":-13.8309,"y":-14.955,"l":"O"},{"x":6.1691,"y":5.045},{"x":-33.8309,"y":-14.955,"l":"P"},{"x":30,"y":-2.7358,"l":"O"},{"x":15.2717,"y":17.6345},{"x":-33.8309,"y":-34.955,"l":"O"},{"c":-1,"x":-53.8309,"y":-14.9551,"l":"O"},{"c":-1,"x":-33.8309,"y":5.045,"l":"O"},{"x":53.8309,"y":5.045},{"x":5.2717,"y":34.955,"l":"O"},{"x":44.7283,"y":17.6345},{"x":53.8309,"y":-34.955,"l":"N"}],"b":[{"b":4,"e":2},{"b":2,"e":5},{"b":5,"e":11,"o":1},{"b":9,"e":11},{"b":9,"e":4},{"b":5,"e":10},{"b":9,"e":12},{"b":2,"e":0},{"b":0,"e":1},{"b":1,"e":3},{"b":3,"e":7},{"b":3,"e":6,"o":2},{"b":3,"e":8}]}
	});
	group.templates.push({
		name: 'Deoxyribonucleoside Diphosphate',
		data: {"a":[{"x":26.1691,"y":-14.955},{"x":6.1691,"y":-14.955,"l":"O"},{"x":26.1691,"y":5.045},{"x":-13.8309,"y":-14.955,"l":"P"},{"x":50,"y":-2.7358,"l":"O"},{"x":35.2717,"y":17.6345},{"c":-1,"x":-13.8309,"y":5.045,"l":"O"},{"x":-13.8309,"y":-34.955,"l":"O"},{"x":-33.8309,"y":-14.955,"l":"O"},{"x":73.8309,"y":5.045},{"x":64.7283,"y":17.6345},{"x":25.2717,"y":34.955,"l":"O"},{"x":-53.8309,"y":-14.955,"l":"P"},{"x":73.8309,"y":-34.955,"l":"N"},{"x":-53.8309,"y":-34.955,"l":"O"},{"c":-1,"x":-53.8309,"y":5.045,"l":"O"},{"c":-1,"x":-73.8309,"y":-14.955,"l":"O"}],"b":[{"b":4,"e":2},{"b":2,"e":5},{"b":5,"e":10,"o":1},{"b":9,"e":10},{"b":9,"e":4},{"b":5,"e":11},{"b":9,"e":13},{"b":2,"e":0},{"b":0,"e":1},{"b":1,"e":3},{"b":3,"e":8},{"b":3,"e":7,"o":2},{"b":3,"e":6},{"b":8,"e":12},{"b":12,"e":16},{"b":12,"e":14,"o":2},{"b":12,"e":15}]}
	});
	group.templates.push({
		name: 'Deoxyribonucleoside Triphosphate',
		data: {"a":[{"x":46.1691,"y":-14.955},{"x":26.1691,"y":-14.955,"l":"O"},{"x":46.1691,"y":5.045},{"x":6.1691,"y":-14.955,"l":"P"},{"x":70,"y":-2.7358,"l":"O"},{"x":55.2717,"y":17.6345},{"c":-1,"x":6.1691,"y":5.045,"l":"O"},{"x":-13.8309,"y":-14.955,"l":"O"},{"x":6.1691,"y":-34.955,"l":"O"},{"x":93.8309,"y":5.045},{"x":84.7283,"y":17.6345},{"x":45.2717,"y":34.955,"l":"O"},{"x":-33.8309,"y":-14.955,"l":"P"},{"x":93.8309,"y":-34.955,"l":"N"},{"x":-33.8309,"y":-34.955,"l":"O"},{"c":-1,"x":-33.8309,"y":5.045,"l":"O"},{"x":-53.8309,"y":-14.955,"l":"O"},{"x":-73.8309,"y":-14.955,"l":"P"},{"x":-73.8309,"y":-34.955,"l":"O"},{"c":-1,"x":-93.8309,"y":-14.955,"l":"O"},{"c":-1,"x":-73.8309,"y":5.045,"l":"O"}],"b":[{"b":4,"e":2},{"b":2,"e":5},{"b":5,"e":10,"o":1},{"b":9,"e":10},{"b":9,"e":4},{"b":5,"e":11},{"b":9,"e":13},{"b":2,"e":0},{"b":0,"e":1},{"b":1,"e":3},{"b":3,"e":7},{"b":3,"e":8,"o":2},{"b":3,"e":6},{"b":7,"e":12},{"b":12,"e":16},{"b":12,"e":14,"o":2},{"b":12,"e":15},{"b":16,"e":17},{"b":17,"e":19},{"b":17,"e":18,"o":2},{"b":17,"e":20}]}
	});
	group.templates.push({
		name: 'Deoxyribonucleotide chain form',
		data: {"a":[{"x":-13.8309,"y":-36.2948},{"x":-13.8309,"y":-16.2948},{"x":-33.8309,"y":-36.2948,"l":"O"},{"x":10,"y":-24.0756,"l":"O"},{"x":-4.7284,"y":-3.7052},{"x":33.8309,"y":-16.2948},{"x":24.7283,"y":-3.7052},{"x":-4.7284,"y":16.2948,"l":"O"},{"x":33.8309,"y":-56.2948,"l":"N"},{"x":-4.7284,"y":36.2948,"l":"P"},{"x":-24.7284,"y":36.2948,"l":"O"},{"c":-1,"x":-4.7284,"y":56.2948,"l":"O"},{"c":-1,"x":15.2716,"y":36.2948,"l":"O"}],"b":[{"b":3,"e":1},{"b":1,"e":4},{"b":4,"e":6,"o":1},{"b":5,"e":6},{"b":5,"e":3},{"b":4,"e":7},{"b":5,"e":8},{"b":1,"e":0},{"b":0,"e":2},{"b":7,"e":9},{"b":9,"e":12},{"b":9,"e":10,"o":2},{"b":9,"e":11}]}
	});
	group.templates.push({
		name: 'Phosphate',
		data: {"a":[{"x":-18.6602,"y":-0.6571,"l":"O"},{"x":1.3398,"y":-0.6571,"l":"P"},{"c":-1,"x":8.6025,"y":17.9776,"l":"O"},{"x":11.3398,"y":-17.9776,"l":"O"},{"c":-1,"x":18.6603,"y":9.3429,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":1,"e":3,"o":2},{"b":1,"e":4}]}
	});
	d.push(group);
	
	group = {name:'Other', templates:[]};
	group.templates.push({
		name: 'Adamantane',
		data: {"a":[{"x":-23.2311,"y":23.1027},{"x":-5.451,"y":14.1461},{"x":-12.329,"y":4.0241},{"x":12.3291,"y":23.1027},{"x":-5.451,"y":-4.0241},{"x":5.451,"y":13.1092},{"x":-12.329,"y":-14.1461},{"x":23.2311,"y":4.0241},{"x":5.451,"y":-23.1027},{"x":23.2311,"y":-14.1461}],"b":[{"b":0,"e":1},{"b":4,"e":8},{"b":8,"e":6},{"b":6,"e":2},{"b":0,"e":2},{"b":2,"e":5},{"b":5,"e":7},{"b":7,"e":3},{"b":1,"e":3},{"b":7,"e":9},{"b":8,"e":9},{"b":4,"e":1}]}
	});
	group.templates.push({
		name: 'Basketane',
		data: {"a":[{"x":8.0624,"y":-6.6984,"z":0.0009},{"x":-10.9369,"y":7.243,"z":0.0009},{"x":6.1745,"y":-24.4805,"z":0.0007},{"x":21.1864,"y":7.5359,"z":0.0002},{"x":4.6483,"y":26.1053,"z":0.0005},{"x":-21.1864,"y":5.6242,"z":-0.0003},{"x":-4.1138,"y":-26.1053,"z":-0.0005},{"x":10.9373,"y":5.9171,"z":-0.001},{"x":-5.8568,"y":24.4464,"z":-0.0007},{"x":-7.126,"y":-9.0969,"z":-0.0009}],"b":[{"b":0,"e":3},{"b":0,"e":2},{"b":0,"e":1},{"b":3,"e":7},{"b":3,"e":4},{"b":7,"e":8},{"b":7,"e":9},{"b":8,"e":4},{"b":8,"e":5},{"b":4,"e":1},{"b":1,"e":5},{"b":5,"e":9},{"b":9,"e":6},{"b":6,"e":2}]}
	});
	group.templates.push({
		name: 'Bishomotwistane',
		data: {"a":[{"x":-9.3245,"y":9.3434,"z":0.0012},{"x":-3.4592,"y":27.6792,"z":0.0006},{"x":-27.685,"y":3.7727,"z":0.0006},{"x":9.1603,"y":-9.3884,"z":0.0012},{"x":3.7793,"y":27.6792,"z":-0.0006},{"x":-27.6729,"y":-3.3575,"z":-0.0006},{"x":27.5776,"y":-3.773,"z":0.0006},{"x":3.3516,"y":-27.6792,"z":0.0006},{"x":9.4006,"y":9.313,"z":-0.0012},{"x":-9.3316,"y":-9.1718,"z":-0.0012},{"x":27.6851,"y":3.4533,"z":-0.0006},{"x":-3.7669,"y":-27.5837,"z":-0.0006}],"b":[{"b":0,"e":3},{"b":0,"e":1},{"b":3,"e":7},{"b":9,"e":8},{"b":9,"e":11},{"b":8,"e":4},{"b":1,"e":4},{"b":7,"e":11},{"b":0,"e":2},{"b":2,"e":5},{"b":5,"e":9},{"b":8,"e":10},{"b":10,"e":6},{"b":6,"e":3}]}
	});
	group.templates.push({
		name: 'Cuneane',
		data: {"a":[{"x":1.9228,"y":16.1562,"z":0.0003},{"x":-17.4892,"y":4.2593,"z":0.0007},{"x":21.6967,"y":1.7764,"z":0.0004},{"x":-1.9533,"y":6.9712,"z":-0.0008},{"x":-21.6967,"y":-5.7118,"z":-0.0004},{"x":-10.3535,"y":-14.8421,"z":0.0004},{"x":10.3842,"y":-16.1562,"z":0.0002},{"x":17.4892,"y":-8.1944,"z":-0.0007}],"b":[{"b":0,"e":3},{"b":0,"e":1},{"b":0,"e":2},{"b":3,"e":4},{"b":3,"e":7},{"b":1,"e":4},{"b":1,"e":5},{"b":2,"e":7},{"b":2,"e":6},{"b":4,"e":5},{"b":7,"e":6},{"b":5,"e":6}]}
	});
	group.templates.push({
		name: 'Diademan',
		data: {"a":[{"x":-13.929,"y":-20.6479,"z":-0.0001},{"x":-14.1084,"y":-8.6671,"z":0.0009},{"x":-23.7135,"y":3.8281,"z":0},{"x":7.2834,"y":-23.6595,"z":-0.0005},{"x":8.8036,"y":0.6176,"z":0.0009},{"x":-10.952,"y":21.9588,"z":-0.0002},{"x":22.0579,"y":-2.6695,"z":-0.0008},{"x":23.7134,"y":-14.0348,"z":0.0002},{"x":8.6453,"y":23.6595,"z":0.0004},{"x":13.6064,"y":18.472,"z":-0.0007}],"b":[{"b":0,"e":1},{"b":0,"e":2},{"b":0,"e":3},{"b":1,"e":2},{"b":1,"e":4},{"b":2,"e":5},{"b":3,"e":7},{"b":3,"e":6},{"b":4,"e":7},{"b":4,"e":8},{"b":5,"e":8},{"b":5,"e":9},{"b":7,"e":6},{"b":6,"e":9},{"b":8,"e":9}]}
	});
	group.templates.push({
		name: 'Diamantane',
		data: {"a":[{"x":-14.141,"y":21.12,"z":0},{"x":-29.3361,"y":18.0407,"z":0.0006},{"x":10.8073,"y":19.3824,"z":0.0006},{"x":-10.7711,"y":6.3888,"z":-0.0011},{"x":-27.8889,"y":-9.1493,"z":0.001},{"x":25.7558,"y":25.458,"z":0.0001},{"x":10.7709,"y":-6.3887,"z":0.0011},{"x":-10.8074,"y":-19.3824,"z":-0.0006},{"x":2.5813,"y":11.5032,"z":-0.0017},{"x":-25.7559,"y":-25.458,"z":-0.0001},{"x":-2.5814,"y":-11.5031,"z":0.0017},{"x":27.8887,"y":9.1493,"z":-0.001},{"x":14.1409,"y":-21.12,"z":-0},{"x":29.3361,"y":-18.0406,"z":-0.0006}],"b":[{"b":0,"e":3},{"b":0,"e":2},{"b":0,"e":1},{"b":3,"e":7},{"b":3,"e":8},{"b":2,"e":6},{"b":2,"e":5},{"b":7,"e":12},{"b":7,"e":9},{"b":6,"e":12},{"b":6,"e":10},{"b":12,"e":13},{"b":4,"e":1},{"b":4,"e":9},{"b":4,"e":10},{"b":11,"e":8},{"b":11,"e":5},{"b":11,"e":13}]}
	});
	group.templates.push({
		name: 'Dihomocubane',
		data: {"a":[{"x":-1.8424,"y":-19.703,"z":-0.0007},{"x":-16.4495,"y":-15.2664,"z":0.0004},{"x":19.0463,"y":-14.4468,"z":0.0001},{"x":-4.0421,"y":5.4673,"z":-0.0011},{"x":4.0428,"y":-5.4672,"z":0.0011},{"x":-29.925,"y":-0.6907,"z":0.0003},{"x":29.9251,"y":0.6911,"z":-0.0003},{"x":-19.0462,"y":14.4468,"z":-0.0001},{"x":16.4496,"y":15.2664,"z":-0.0004},{"x":1.8432,"y":19.703,"z":0.0007}],"b":[{"b":0,"e":3},{"b":0,"e":1},{"b":0,"e":2},{"b":3,"e":7},{"b":3,"e":8},{"b":4,"e":9},{"b":4,"e":1},{"b":4,"e":2},{"b":9,"e":7},{"b":9,"e":8},{"b":1,"e":5},{"b":2,"e":6},{"b":7,"e":5},{"b":8,"e":6}]}
	});
	group.templates.push({
		name: 'Homoadamantane',
		data: {"a":[{"x":-18.7389,"y":6.0639,"z":-0.0008},{"x":3.5456,"y":9.9613,"z":-0.0015},{"x":-25.4634,"y":21.2769,"z":0.0001},{"x":-23.4106,"y":-20.1097,"z":-0.0006},{"x":21.6364,"y":2.2969,"z":-0.0006},{"x":-9.571,"y":14.4702,"z":0.0011},{"x":-4.1032,"y":-23.0779,"z":0.0003},{"x":25.4634,"y":17.5276,"z":0.0002},{"x":19.5509,"y":-21.9076,"z":-0.0002},{"x":11.2348,"y":23.0779,"z":0.001},{"x":-9.4581,"y":-10.5918,"z":0.0014}],"b":[{"b":0,"e":3},{"b":0,"e":1},{"b":0,"e":2},{"b":6,"e":3},{"b":6,"e":8},{"b":6,"e":10},{"b":4,"e":1},{"b":4,"e":8},{"b":4,"e":7},{"b":5,"e":2},{"b":5,"e":10},{"b":5,"e":9},{"b":7,"e":9}]}
	});
	group.templates.push({
		name: 'Homocubane',
		data: {"a":[{"x":6.7729,"y":18.8807,"z":0.0007},{"x":7.3705,"y":-7.6566,"z":0.001},{"x":17.1692,"y":14.1707,"z":-0.0004},{"x":-18.1844,"y":14.3742,"z":0.0002},{"x":-16.6906,"y":-8.9747,"z":0.0006},{"x":18.1844,"y":-12.5556,"z":-0.0001},{"x":-7.3703,"y":9.4751,"z":-0.001},{"x":-15.1701,"y":-18.8807,"z":-0.0001},{"x":-3.1609,"y":-15.1039,"z":-0.0008}],"b":[{"b":0,"e":2},{"b":0,"e":3},{"b":0,"e":1},{"b":2,"e":6},{"b":2,"e":5},{"b":3,"e":6},{"b":3,"e":4},{"b":1,"e":5},{"b":1,"e":4},{"b":6,"e":8},{"b":5,"e":8},{"b":4,"e":7},{"b":8,"e":7}]}
	});
	group.templates.push({
		name: 'Pagodane',
		data: {"a":[{"x":-14.2104,"y":6.7147,"z":0.0011},{"x":-20.5671,"y":-2.7196,"z":-0.0008},{"x":20.5671,"y":2.7185,"z":0.0008},{"x":-21.1215,"y":-15.4349,"z":0.0015},{"x":-17.4963,"y":31.478,"z":0.0009},{"x":-28.3797,"y":-26.2067,"z":-0.0006},{"x":-24.7543,"y":20.706,"z":-0.0012},{"x":14.2099,"y":-6.7158,"z":-0.0011},{"x":28.3797,"y":26.2067,"z":0.0006},{"x":24.7543,"y":-20.706,"z":0.0012},{"x":-33.3155,"y":-26.6568,"z":0.0006},{"x":0.1614,"y":-37.1774,"z":0.0016},{"x":6.6932,"y":47.3504,"z":0.0004},{"x":-28.6453,"y":33.7758,"z":-0.0002},{"x":-6.6932,"y":-47.3504,"z":-0.0004},{"x":-0.1614,"y":37.1774,"z":-0.0016},{"x":17.4963,"y":-31.478,"z":-0.0009},{"x":21.1215,"y":15.4349,"z":-0.0015},{"x":33.3155,"y":26.6568,"z":-0.0006},{"x":28.6453,"y":-33.7758,"z":0.0002}],"b":[{"b":0,"e":1},{"b":0,"e":2},{"b":0,"e":3},{"b":0,"e":4},{"b":1,"e":7},{"b":1,"e":5},{"b":1,"e":6},{"b":2,"e":7},{"b":2,"e":9},{"b":2,"e":8},{"b":7,"e":16},{"b":7,"e":17},{"b":3,"e":11},{"b":3,"e":10},{"b":4,"e":12},{"b":4,"e":13},{"b":5,"e":14},{"b":5,"e":10},{"b":6,"e":15},{"b":6,"e":13},{"b":9,"e":11},{"b":9,"e":19},{"b":8,"e":12},{"b":8,"e":18},{"b":16,"e":14},{"b":16,"e":19},{"b":17,"e":15},{"b":17,"e":18},{"b":11,"e":14},{"b":12,"e":15}]}
	});
	group.templates.push({
		name: 'Peristylane',
		data: {"a":[{"x":-15.3409,"y":-17.2723,"z":-0.0002},{"x":4.8361,"y":-19.4524,"z":-0.0006},{"x":-13.4583,"y":-10.0681,"z":0.0008},{"x":-29.1197,"y":-8.9382,"z":-0.0008},{"x":7.9832,"y":-12.9467,"z":-0.0016},{"x":19.1897,"y":-13.5953,"z":0.0001},{"x":7.8828,"y":-7.7953,"z":0.001},{"x":-25.658,"y":4.3094,"z":0.0011},{"x":-13.5287,"y":-2.0397,"z":-0.0017},{"x":-34.3758,"y":8.6531,"z":-0},{"x":25.8177,"y":2.1503,"z":-0.0012},{"x":34.3758,"y":-2.1764,"z":-0.0001},{"x":13.585,"y":8.4881,"z":0.0015},{"x":-7.912,"y":19.4523,"z":0.0014},{"x":29.2903,"y":15.4332,"z":0.0007}],"b":[{"b":0,"e":1},{"b":0,"e":2},{"b":0,"e":3},{"b":1,"e":5},{"b":1,"e":4},{"b":2,"e":6},{"b":2,"e":7},{"b":5,"e":6},{"b":5,"e":11},{"b":6,"e":12},{"b":3,"e":8},{"b":3,"e":9},{"b":4,"e":8},{"b":4,"e":10},{"b":7,"e":9},{"b":7,"e":13},{"b":11,"e":10},{"b":11,"e":14},{"b":12,"e":13},{"b":12,"e":14}]}
	});
	group.templates.push({
		name: 'Porphine',
		data: {"a":[{"x":40.7025,"y":17.8205},{"x":20.9488,"y":20.9488,"l":"N"},{"x":49.7832,"y":-0},{"x":49.7817,"y":35.6396},{"x":17.8205,"y":40.7024},{"x":40.7025,"y":-17.8205},{"x":35.6396,"y":49.7817},{"x":0,"y":49.7832},{"x":49.7817,"y":-35.6396},{"x":20.9487,"y":-20.9487,"l":"N"},{"x":-17.8205,"y":40.7025},{"x":35.6396,"y":-49.7818},{"x":17.8205,"y":-40.7025},{"x":-35.6396,"y":49.7818},{"x":-20.9487,"y":20.9488,"l":"N"},{"x":-0,"y":-49.7832},{"x":-49.7817,"y":35.6396},{"x":-40.7025,"y":17.8205},{"x":-17.8205,"y":-40.7025},{"x":-49.7832,"y":0},{"x":-35.6396,"y":-49.7817},{"x":-20.9488,"y":-20.9487,"l":"N"},{"x":-40.7024,"y":-17.8205},{"x":-49.7818,"y":-35.6396}],"b":[{"b":0,"e":2},{"b":2,"e":5,"o":2},{"b":5,"e":8},{"b":8,"e":11,"o":2},{"b":5,"e":9},{"b":9,"e":12},{"b":12,"e":11},{"b":12,"e":15,"o":2},{"b":0,"e":1,"o":2},{"b":1,"e":4},{"b":4,"e":6},{"b":6,"e":3,"o":2},{"b":3,"e":0},{"b":4,"e":7,"o":2},{"b":7,"e":10},{"b":10,"e":13,"o":2},{"b":13,"e":16},{"b":16,"e":17,"o":2},{"b":17,"e":19},{"b":19,"e":22,"o":2},{"b":22,"e":23},{"b":23,"e":20,"o":2},{"b":20,"e":18},{"b":18,"e":15},{"b":18,"e":21,"o":2},{"b":21,"e":22},{"b":17,"e":14},{"b":14,"e":10}]}
	});
	group.templates.push({
		name: 'Propellaprismane',
		data: {"a":[{"x":15.8061,"y":23.5917,"z":0.0008},{"x":26.2297,"y":29.8832,"z":0.0014},{"x":23.1528,"y":15.0751,"z":-0.001},{"x":-23.3446,"y":21.8447,"z":0.0005},{"x":15.998,"y":-13.3281,"z":0.0013},{"x":32.9326,"y":10.6278,"z":0.0022},{"x":-15.998,"y":13.3281,"z":-0.0013},{"x":23.3446,"y":-21.8447,"z":-0.0005},{"x":38.3971,"y":15.7753,"z":-0.0015},{"x":-23.1528,"y":-15.0751,"z":0.001},{"x":-38.6203,"y":26.9893,"z":0.0009},{"x":26.452,"y":-12.882,"z":0.002},{"x":-26.452,"y":12.882,"z":-0.002},{"x":-15.8061,"y":-23.5917,"z":-0.0008},{"x":38.6192,"y":-26.9897,"z":-0.0009},{"x":48.1469,"y":-7.0099,"z":-0.0015},{"x":-38.3981,"y":-15.7758,"z":0.0015},{"x":-48.1469,"y":7.0099,"z":0.0015},{"x":-32.9318,"y":-10.628,"z":-0.0022},{"x":-26.2297,"y":-29.8832,"z":-0.0014}],"b":[{"b":0,"e":2},{"b":0,"e":3},{"b":0,"e":4},{"b":0,"e":1},{"b":4,"e":7},{"b":4,"e":9},{"b":4,"e":11},{"b":7,"e":13},{"b":7,"e":14},{"b":7,"e":2},{"b":2,"e":6},{"b":2,"e":8},{"b":3,"e":6},{"b":3,"e":10},{"b":3,"e":9},{"b":9,"e":13},{"b":9,"e":16},{"b":13,"e":6},{"b":13,"e":19},{"b":6,"e":12},{"b":14,"e":15},{"b":15,"e":8},{"b":11,"e":5},{"b":5,"e":1},{"b":10,"e":17},{"b":17,"e":16},{"b":12,"e":18},{"b":18,"e":19}]}
	});
	group.templates.push({
		name: 'Pyramidane',
		data: {"a":[{"x":-17.2378,"y":6.685,"z":0.0002},{"x":-4.7779,"y":2.0713,"z":-0.0009},{"x":1.0091,"y":-10.8859,"z":0.0002},{"x":4.7776,"y":10.8859,"z":0.0008},{"x":17.2379,"y":6.2731,"z":-0.0003}],"b":[{"b":0,"e":3},{"b":3,"e":4},{"b":4,"e":1},{"b":1,"e":0},{"b":0,"e":2},{"b":2,"e":1},{"b":4,"e":2},{"b":3,"e":2}]}
	});
	group.templates.push({
		name: 'Secocubane',
		data: {"a":[{"x":-12.7876,"y":0.469,"z":0.0009},{"x":-17.3436,"y":-13.3054,"z":0.0001},{"x":-3.3968,"y":18.2664,"z":0.0006},{"x":1.8735,"y":-18.2664,"z":-0.0005},{"x":-18.1791,"y":9.8903,"z":-0.0003},{"x":15.8203,"y":13.3053,"z":-0},{"x":18.1791,"y":-7.5251,"z":-0.0001},{"x":2.5011,"y":4.5517,"z":-0.001}],"b":[{"b":0,"e":1},{"b":0,"e":2},{"b":1,"e":4},{"b":1,"e":3},{"b":3,"e":6},{"b":3,"e":7},{"b":6,"e":5},{"b":2,"e":4},{"b":2,"e":5},{"b":4,"e":7},{"b":7,"e":5}]}
	});
	group.templates.push({
		name: 'Snoutane',
		data: {"a":[{"x":-6.3364,"y":20.3269,"z":-0.0001},{"x":7.6179,"y":19.8849,"z":0.0003},{"x":-8.926,"y":7.7702,"z":-0.0008},{"x":-20.0203,"y":9.1351,"z":0.0002},{"x":8.926,"y":8.2183,"z":0.001},{"x":20.0203,"y":6.8534,"z":0},{"x":8.4811,"y":-3.8285,"z":-0.0007},{"x":-9.6143,"y":-1.6023,"z":0.001},{"x":3.4219,"y":-20.3269,"z":-0.0003},{"x":-6.3552,"y":-19.124,"z":0.0006}],"b":[{"b":0,"e":1},{"b":0,"e":2},{"b":0,"e":3},{"b":1,"e":5},{"b":1,"e":4},{"b":2,"e":3},{"b":2,"e":6},{"b":3,"e":7},{"b":5,"e":4},{"b":5,"e":6},{"b":4,"e":7},{"b":6,"e":8},{"b":7,"e":9},{"b":8,"e":9}]}
	});
	group.templates.push({
		name: 'Tetraasterane',
		data: {"a":[{"x":7.9814,"y":-4.7005,"z":-0.0012},{"x":4.5426,"y":16.8926,"z":-0.0011},{"x":7.4295,"y":-23.9433,"z":-0.0007},{"x":16.8749,"y":22.9377,"z":0.0001},{"x":-19.7619,"y":17.8982,"z":-0.0005},{"x":19.7619,"y":-17.8982,"z":0.0005},{"x":-16.8749,"y":-22.9377,"z":-0.0001},{"x":24.425,"y":3.3596,"z":0.0004},{"x":-7.4295,"y":23.9433,"z":0.0007},{"x":-24.425,"y":-3.3596,"z":-0.0004},{"x":-4.5426,"y":-16.8926,"z":0.0011},{"x":-7.9814,"y":4.7005,"z":0.0012}],"b":[{"b":0,"e":2},{"b":0,"e":1},{"b":2,"e":6},{"b":2,"e":5},{"b":1,"e":4},{"b":1,"e":3},{"b":6,"e":9},{"b":6,"e":10},{"b":4,"e":9},{"b":4,"e":8},{"b":7,"e":5},{"b":7,"e":3},{"b":5,"e":10},{"b":3,"e":8},{"b":10,"e":11},{"b":8,"e":11}]}
	});
	group.templates.push({
		name: 'Triptycene',
		data: {"a":[{"x":-1.8416,"y":33.5953},{"x":-22.0802,"y":39.915},{"x":15.2565,"y":41.2332},{"x":-1.8416,"y":7.8124},{"x":-11.7283,"y":24.3677},{"x":-40.1864,"y":47.0877},{"x":25.5308,"y":24.329},{"x":29.5243,"y":50.9648},{"x":9.2469,"y":-6.8431},{"x":-10.1774,"y":-11.9997},{"x":-32.4321,"y":21.9251},{"x":9.2469,"y":15.1014},{"x":-57.6334,"y":41.2332},{"x":45.3042,"y":24.329},{"x":46.9713,"y":50.9648},{"x":14.0546,"y":-29.4079},{"x":-6.3003,"y":-36.1929},{"x":-47.9406,"y":27.7409},{"x":57.6334,"y":35.4563},{"x":8.045,"y":-50.9648}],"b":[{"b":0,"e":1},{"b":1,"e":4,"o":2},{"b":4,"e":11},{"b":0,"e":3},{"b":3,"e":8,"o":2},{"b":11,"e":8},{"b":11,"e":6},{"b":0,"e":2},{"b":6,"e":2,"o":2},{"b":2,"e":7},{"b":7,"e":14,"o":2},{"b":14,"e":18},{"b":18,"e":13,"o":2},{"b":6,"e":13},{"b":4,"e":10},{"b":10,"e":17,"o":2},{"b":17,"e":12},{"b":12,"e":5,"o":2},{"b":1,"e":5},{"b":3,"e":9},{"b":9,"e":16,"o":2},{"b":16,"e":19},{"b":19,"e":15,"o":2},{"b":8,"e":15}]}
	});
	group.templates.push({
		name: 'Twistane',
		data: {"a":[{"x":-9.5219,"y":-26.0012},{"x":7.2133,"y":-26.1571},{"x":-14.5434,"y":-10.0357},{"x":12.5334,"y":-10.2879},{"x":-28.325,"y":0.1651},{"x":13.5307,"y":10.0357},{"x":28.325,"y":-1.1706},{"x":-13.5501,"y":10.2879},{"x":8.5073,"y":26.0012},{"x":-8.228,"y":26.1571}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":3,"e":6},{"b":6,"e":5},{"b":5,"e":8},{"b":8,"e":9},{"b":9,"e":7},{"b":7,"e":3},{"b":7,"e":4},{"b":4,"e":2},{"b":2,"e":0},{"b":2,"e":5}]}
	});
	d.push(group);
	
	group = {name:'Platonic Solids', templates:[]};
	group.templates.push({
		name: 'Cubane',
		data: {"a":[{"x":6.8116,"y":7.3797,"z":-0.001},{"x":15.7836,"y":14.3051,"z":0.0002},{"x":-16.3582,"y":9.4716,"z":-0.0005},{"x":7.3866,"y":-16.3971,"z":-0.0006},{"x":-7.3865,"y":16.3971,"z":0.0006},{"x":16.3582,"y":-9.4716,"z":0.0005},{"x":-15.7838,"y":-14.3053,"z":-0.0002},{"x":-6.8118,"y":-7.38,"z":0.001}],"b":[{"b":0,"e":1},{"b":1,"e":4},{"b":4,"e":2},{"b":2,"e":0},{"b":0,"e":3},{"b":2,"e":6},{"b":4,"e":7},{"b":1,"e":5},{"b":6,"e":3},{"b":3,"e":5},{"b":5,"e":7},{"b":7,"e":6}]}
	});
	group.templates.push({
		name: 'Dodecahedrane',
		data: {"a":[{"x":5.5634,"y":23.4684,"z":-0.0013},{"x":16.1591,"y":0.9427,"z":-0.0016},{"x":-19.3759,"y":19.7391,"z":-0.0011},{"x":15.6559,"y":31.7957,"z":-0.0002},{"x":-2.2312,"y":-16.7085,"z":-0.0016},{"x":32.801,"y":-4.6523,"z":-0.0007},{"x":-24.6961,"y":25.7614,"z":0.0001},{"x":-24.1925,"y":-5.0917,"z":-0.0013},{"x":32.4899,"y":14.4157,"z":0.0002},{"x":-3.0451,"y":33.2128,"z":0.0006},{"x":3.0451,"y":-33.2128,"z":-0.0006},{"x":24.6961,"y":-25.7618,"z":-0.0001},{"x":-32.801,"y":4.6523,"z":0.0007},{"x":-32.4904,"y":-14.4156,"z":-0.0002},{"x":24.1925,"y":5.0917,"z":0.0013},{"x":2.2307,"y":16.7087,"z":0.0016},{"x":-15.6564,"y":-31.7956,"z":0.0002},{"x":19.3759,"y":-19.7394,"z":0.0011},{"x":-16.1591,"y":-0.9427,"z":0.0016},{"x":-5.5634,"y":-23.4684,"z":0.0013}],"b":[{"b":0,"e":1},{"b":0,"e":2},{"b":0,"e":3},{"b":1,"e":4},{"b":1,"e":5},{"b":2,"e":7},{"b":2,"e":6},{"b":3,"e":8},{"b":3,"e":9},{"b":4,"e":7},{"b":4,"e":10},{"b":5,"e":8},{"b":5,"e":11},{"b":7,"e":13},{"b":6,"e":9},{"b":6,"e":12},{"b":8,"e":14},{"b":9,"e":15},{"b":10,"e":11},{"b":10,"e":16},{"b":11,"e":17},{"b":13,"e":12},{"b":13,"e":16},{"b":12,"e":18},{"b":14,"e":15},{"b":14,"e":17},{"b":15,"e":18},{"b":16,"e":19},{"b":17,"e":19},{"b":18,"e":19}]}
	});
	group.templates.push({
		name: 'Icosahedrane',
		data: {"a":[{"x":-2.1935,"y":16.5915,"z":0.0009},{"x":19.041,"y":14.7651,"z":0.0002},{"x":-2.7246,"y":23.1426,"z":-0.0004},{"x":-12.2778,"y":-6.837,"z":0.001},{"x":13.1368,"y":-3.7632,"z":0.001},{"x":-22.0806,"y":9.7916,"z":0.0002},{"x":12.2777,"y":6.837,"z":-0.001},{"x":22.0806,"y":-9.7917,"z":-0.0002},{"x":-13.1371,"y":3.7632,"z":-0.001},{"x":2.7243,"y":-23.1426,"z":0.0004},{"x":-19.0411,"y":-14.7652,"z":-0.0002},{"x":2.1933,"y":-16.5915,"z":-0.0009}],"b":[{"b":0,"e":4},{"b":4,"e":7},{"b":7,"e":6},{"b":6,"e":2},{"b":2,"e":0},{"b":0,"e":1},{"b":1,"e":2},{"b":1,"e":6},{"b":1,"e":7},{"b":1,"e":4},{"b":11,"e":8},{"b":8,"e":5},{"b":5,"e":3},{"b":3,"e":9},{"b":9,"e":11},{"b":11,"e":10},{"b":10,"e":9},{"b":10,"e":8},{"b":10,"e":5},{"b":10,"e":3},{"b":0,"e":3,"o":2},{"b":0,"e":5},{"b":5,"e":2},{"b":2,"e":8},{"b":8,"e":6},{"b":6,"e":11},{"b":11,"e":7},{"b":7,"e":9},{"b":9,"e":4},{"b":4,"e":3}]}
	});
	group.templates.push({
		name: 'Octahedrane',
		data: {"a":[{"x":17.605,"y":1.6441,"z":0.0003},{"x":-0.3217,"y":18.0965,"z":-0.0002},{"x":0.3216,"y":-18.0965,"z":0.0002},{"x":5.9408,"y":-3.8922,"z":-0.0009},{"x":-5.941,"y":3.8922,"z":0.0009},{"x":-17.605,"y":-1.6443,"z":-0.0003}],"b":[{"b":0,"e":1},{"b":1,"e":5},{"b":5,"e":2},{"b":2,"e":0},{"b":2,"e":4},{"b":1,"e":4},{"b":0,"e":3},{"b":2,"e":3},{"b":1,"e":3},{"b":5,"e":3},{"b":5,"e":4},{"b":0,"e":4}]}
	});
	group.templates.push({
		name: 'Tetrahedrane',
		data: {"a":[{"x":-10.8801,"y":10.377,"z":-0.0003},{"x":9.7747,"y":11.0081,"z":0.0004},{"x":-2.0447,"y":-11.0081,"z":0.0002},{"x":10.8801,"y":0.3176,"z":-0.0007}],"b":[{"b":0,"e":1},{"b":0,"e":3},{"b":3,"e":1},{"b":1,"e":2},{"b":2,"e":3},{"b":2,"e":0}]}
	});
	d.push(group);
	
	group = {name:'Ring Conformers', templates:[]};
	group.templates.push({
		name: '<b>4</b> Cyclobutane',
		data: {"a":[{"x":188,"y":262},{"x":198,"y":260},{"x":208,"y":272},{"x":220,"y":256}],"b":[{"b":0,"e":2},{"b":1,"e":0},{"b":2,"e":3},{"b":3,"e":1}]}
	});
	group.templates.push({
		name: '<b>5</b> Cyclopentane <i>Parallel Pentagon</i>',
		data: {"a":[{"x":204,"y":249},{"x":186.68,"y":259},{"x":221.32,"y":259},{"x":186.68,"y":279},{"x":221.32,"y":279}],"b":[{"b":0,"e":1},{"b":0,"e":2},{"b":1,"e":3},{"b":2,"e":4},{"b":3,"e":4}]}
	});
	group.templates.push({
		name: '<b>5</b> Cyclopentane',
		data: {"a":[{"x":187.5,"y":256},{"x":182.5,"y":272},{"x":214.5,"y":259},{"x":202.5,"y":265},{"x":225.5,"y":263}],"b":[{"b":0,"e":1},{"b":2,"e":0},{"b":1,"e":3},{"b":4,"e":2},{"b":3,"e":4}]}
	});
	group.templates.push({
		name: '<b>6</b> Cyclohexane <i>Boat</i>',
		data: {"a":[{"x":185.5,"y":254.5},{"x":201.5,"y":265.5},{"x":189.5,"y":273.5},{"x":222.5,"y":264.5},{"x":208.5,"y":273.5},{"x":220.5,"y":254.5}],"b":[{"b":0,"e":2},{"b":1,"e":0},{"b":2,"e":4},{"b":3,"e":1},{"b":4,"e":5},{"b":5,"e":3}]}
	});
	group.templates.push({
		name: '<b>6</b> Cyclohexane <i>Chair 1</i>',
		data: {"a":[{"x":179.754,"y":255.356},{"x":198.95,"y":260.414},{"x":189.736,"y":272.644},{"x":218.266,"y":255.356},{"x":209.05,"y":267.584},{"x":228.246,"y":272.644}],"b":[{"b":0,"e":2},{"b":1,"e":0},{"b":2,"e":4},{"b":3,"e":1},{"b":4,"e":5},{"b":5,"e":3}]}
	});
	group.templates.push({
		name: '<b>6</b> Cyclohexane <i>Chair 2</i>',
		data: {"a":[{"x":189.736,"y":255.356},{"x":209.05,"y":260.84},{"x":179.752,"y":272.644},{"x":228.248,"y":255.356},{"x":198.95,"y":267.158},{"x":218.262,"y":272.644}],"b":[{"b":0,"e":2},{"b":1,"e":0},{"b":2,"e":4},{"b":3,"e":1},{"b":4,"e":5},{"b":5,"e":3}]}
	});
	group.templates.push({
		name: '<b>6</b> Cyclohexane <i>Twist Boat</i>',
		data: {"a":[{"x":183.5,"y":258},{"x":196.5,"y":267},{"x":190.5,"y":274},{"x":219.5,"y":268},{"x":208.5,"y":265},{"x":224.5,"y":254}],"b":[{"b":0,"e":1},{"b":2,"e":0},{"b":1,"e":3},{"b":4,"e":2},{"b":3,"e":5},{"b":5,"e":4}]}
	});
	group.templates.push({
		name: '<b>7</b> Cycloheptane',
		data: {"a":[{"x":178,"y":254.5},{"x":177,"y":275.5},{"x":196,"y":256.5},{"x":201,"y":284.5},{"x":218,"y":243.5},{"x":217,"y":261.5},{"x":231,"y":257.5}],"b":[{"b":0,"e":1},{"b":2,"e":0},{"b":1,"e":3},{"b":4,"e":2},{"b":3,"e":5},{"b":6,"e":4},{"b":5,"e":6}]}
	});
	group.templates.push({
		name: '<b>8</b> Cyclooctane',
		data: {"a":[{"x":188.5,"y":239},{"x":171.5,"y":260},{"x":205.5,"y":248},{"x":180.5,"y":274},{"x":229.5,"y":245},{"x":201.5,"y":289},{"x":236.5,"y":270},{"x":223.5,"y":273}],"b":[{"b":0,"e":1},{"b":2,"e":0},{"b":1,"e":3},{"b":4,"e":2},{"b":3,"e":5},{"b":6,"e":4},{"b":5,"e":7},{"b":7,"e":6}]}
	});
	d.push(group);
	
	group = {name:'Stereocenters and Geometries', templates:[]};
	group.templates.push({
		name: 'Bent Away',
		data: {"a":[{"x":195.34,"y":279},{"x":212.66,"y":269.002},{"x":212.66,"y":249}],"b":[{"b":0,"e":1},{"b":1,"e":2}]}
	});
	group.templates.push({
		name: 'Bent Towards',
		data: {"a":[{"x":195.338,"y":279},{"x":212.66,"y":269.002},{"x":212.66,"y":249}],"b":[{"b":0,"e":1},{"b":1,"e":2}]}
	});
	group.templates.push({
		name: 'Generic Diastereocenter',
		data: {"a":[{"x":181.68,"y":268.998},{"x":198.998,"y":258.998},{"x":216.32,"y":268.998},{"x":209,"y":241.68},{"x":189,"y":241.68},{"x":206.322,"y":286.32},{"x":226.32,"y":286.32}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":1,"e":4},{"b":1,"e":3},{"b":2,"e":5},{"b":2,"e":6}]}
	});
	group.templates.push({
		name: 'Generic Stereocenter',
		data: {"a":[{"x":190.34,"y":277.66},{"x":207.662,"y":267.662},{"x":217.66,"y":250.34},{"x":197.66,"y":250.34}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":1,"e":2}]}
	});
	group.templates.push({
		name: 'Heptavalent 1',
		data: {"a":[{"x":185.34,"y":263.998},{"x":205.338,"y":263.998},{"x":205.338,"y":284},{"x":222.66,"y":254},{"x":197.34,"y":252.68},{"x":199.338,"y":276.32},{"x":205.338,"y":244},{"x":222.66,"y":274}],"b":[{"b":0,"e":1},{"b":1,"e":6},{"b":1,"e":2},{"b":1,"e":3},{"b":1,"e":7},{"b":1,"e":4},{"b":1,"e":5}]}
	});
	group.templates.push({
		name: 'Heptavalent 2',
		data: {"a":[{"x":186.68,"y":252.66},{"x":204.002,"y":262.658},{"x":221.32,"y":252.66},{"x":186.68,"y":272.658},{"x":194.002,"y":245.34},{"x":221.32,"y":272.658},{"x":214,"y":245.34},{"x":204.002,"y":282.66}],"b":[{"b":1,"e":0},{"b":1,"e":2},{"b":1,"e":5},{"b":1,"e":3},{"b":1,"e":4},{"b":1,"e":6},{"b":1,"e":7}]}
	});
	group.templates.push({
		name: 'Hexavalent',
		data: {"a":[{"x":203.998,"y":263.998},{"x":186.68,"y":274},{"x":221.32,"y":274},{"x":214,"y":281.32},{"x":194,"y":246.68},{"x":214,"y":246.68},{"x":194,"y":281.32}],"b":[{"b":0,"e":4},{"b":0,"e":5},{"b":0,"e":1},{"b":0,"e":6},{"b":0,"e":2},{"b":0,"e":3}]}
	});
	group.templates.push({
		name: 'Incomplete Diastereocenter 1',
		data: {"a":[{"x":186.68,"y":269},{"x":203.998,"y":259},{"x":203.998,"y":239},{"x":221.32,"y":269},{"x":221.32,"y":289}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":1,"e":3},{"b":3,"e":4}]}
	});
	group.templates.push({
		name: 'Incomplete Diastereocenter 2',
		data: {"a":[{"x":186.68,"y":269.002},{"x":203.998,"y":258.998},{"x":221.32,"y":269.002},{"x":203.998,"y":239.002},{"x":221.32,"y":288.998}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":1,"e":2},{"b":2,"e":4}]}
	});
	group.templates.push({
		name: 'Incomplete Diastereocenter 3',
		data: {"a":[{"x":186.68,"y":269},{"x":203.998,"y":259},{"x":221.32,"y":269},{"x":203.998,"y":239},{"x":221.32,"y":289}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":1,"e":2},{"b":2,"e":4}]}
	});
	group.templates.push({
		name: 'Incomplete Diastereocenter 4',
		data: {"a":[{"x":186.68,"y":269},{"x":204.002,"y":259},{"x":204.002,"y":239},{"x":221.32,"y":269},{"x":221.32,"y":289}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":1,"e":3},{"b":3,"e":4}]}
	});
	group.templates.push({
		name: 'Octahedral',
		data: {"a":[{"x":203.998,"y":244},{"x":203.998,"y":264},{"x":186.68,"y":254},{"x":186.68,"y":274},{"x":203.998,"y":284},{"x":221.32,"y":254},{"x":221.32,"y":274}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":1,"e":5},{"b":1,"e":3},{"b":1,"e":6},{"b":1,"e":4}]}
	});
	group.templates.push({
		name: 'Octavalent 1',
		data: {"a":[{"x":204,"y":264.002},{"x":194,"y":281.32},{"x":221.322,"y":254},{"x":213.998,"y":246.68},{"x":213.998,"y":281.32},{"x":186.678,"y":254},{"x":186.678,"y":274},{"x":221.322,"y":274},{"x":194,"y":246.68}],"b":[{"b":0,"e":5},{"b":0,"e":6},{"b":0,"e":2},{"b":0,"e":7},{"b":0,"e":8},{"b":0,"e":3},{"b":0,"e":1},{"b":0,"e":4}]}
	});
	group.templates.push({
		name: 'Octavalent 2',
		data: {"a":[{"x":183.998,"y":264},{"x":204,"y":264},{"x":194.002,"y":246.682},{"x":221.32,"y":274},{"x":213.998,"y":281.318},{"x":186.68,"y":274},{"x":213.998,"y":246.682},{"x":224.002,"y":264},{"x":194.002,"y":281.318}],"b":[{"b":0,"e":1},{"b":1,"e":7},{"b":1,"e":2},{"b":1,"e":6},{"b":1,"e":5},{"b":1,"e":3},{"b":1,"e":8},{"b":1,"e":4}]}
	});
	group.templates.push({
		name: 'Square Planar',
		data: {"a":[{"x":186.68,"y":254},{"x":203.998,"y":264.002},{"x":186.68,"y":274},{"x":221.32,"y":254},{"x":221.32,"y":274}],"b":[{"b":1,"e":0},{"b":1,"e":2},{"b":1,"e":3},{"b":1,"e":4}]}
	});
	group.templates.push({
		name: 'Square Pyramidal',
		data: {"a":[{"x":204.002,"y":249},{"x":204.002,"y":268.998},{"x":186.68,"y":259},{"x":221.32,"y":259},{"x":221.32,"y":279},{"x":186.68,"y":279}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":1,"e":3},{"b":1,"e":4},{"b":1,"e":5}]}
	});
	group.templates.push({
		name: 'Tetrahedral',
		data: {"a":[{"x":204.002,"y":265.338},{"x":221.32,"y":275.34},{"x":204.002,"y":245.34},{"x":214,"y":282.66},{"x":186.68,"y":275.34}],"b":[{"b":0,"e":2},{"b":0,"e":4},{"b":0,"e":1},{"b":0,"e":3}]}
	});
	group.templates.push({
		name: 'Trigonal Bipyramidal',
		data: {"a":[{"x":185.338,"y":263.998},{"x":205.34,"y":263.998},{"x":205.34,"y":284},{"x":222.662,"y":274},{"x":205.34,"y":244},{"x":222.662,"y":254}],"b":[{"b":0,"e":1},{"b":1,"e":4},{"b":1,"e":2},{"b":1,"e":5},{"b":1,"e":3}]}
	});
	group.templates.push({
		name: 'Trigonal Planar',
		data: {"a":[{"x":185.338,"y":263.998},{"x":205.34,"y":263.998},{"x":222.662,"y":254},{"x":222.662,"y":274}],"b":[{"b":0,"e":1},{"b":1,"e":2},{"b":1,"e":3}]}
	});
	group.templates.push({
		name: 'Trigonal Pyramidal',
		data: {"a":[{"x":186.68,"y":265.34},{"x":204.002,"y":255.34},{"x":214,"y":272.66},{"x":221.32,"y":265.34}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":1,"e":2}]}
	});
	d.push(group);
	
	group = {name:'Vitamins', templates:[]};
	group.templates.push({
		name: 'Vitamin A',
		data: {"a":[{"x":51.9615,"y":33.6602},{"x":51.9615,"y":13.6602},{"x":69.282,"y":3.6602},{"x":34.641,"y":3.6602},{"x":86.6025,"y":13.6602},{"x":17.3205,"y":13.6602},{"x":103.9231,"y":3.6602,"l":"OH"},{"x":0,"y":3.6602},{"x":-17.3205,"y":13.6602},{"x":-17.3205,"y":33.6602},{"x":-34.641,"y":3.6602},{"x":-51.9615,"y":13.6602},{"x":-69.2821,"y":3.6602},{"x":-86.6025,"y":13.6602},{"x":-69.2821,"y":-16.3398},{"x":-86.6025,"y":33.6602},{"x":-103.9231,"y":3.6602},{"x":-49.2821,"y":-16.3398},{"x":-59.2821,"y":-33.6603},{"x":-86.6025,"y":-26.3398},{"x":-103.9231,"y":-16.3398}],"b":[{"b":0,"e":1},{"b":1,"e":2,"o":2},{"b":2,"e":4},{"b":4,"e":6},{"b":1,"e":3},{"b":3,"e":5,"o":2},{"b":5,"e":7},{"b":7,"e":8,"o":2},{"b":8,"e":9},{"b":8,"e":10},{"b":10,"e":11,"o":2},{"b":11,"e":12},{"b":12,"e":13,"o":2},{"b":13,"e":15},{"b":13,"e":16},{"b":16,"e":20},{"b":20,"e":19},{"b":19,"e":14},{"b":12,"e":14},{"b":14,"e":18},{"b":14,"e":17}]}
	});
	group.templates.push({
		name: 'Vitamin B<sub>12</sub> (Cyanocobalamin)',
		data: {"a":[{"c":1,"x":3.3371,"y":-66.8596,"l":"Co"},{"x":3.3371,"y":-101.4081,"l":"CN"},{"x":23.0279,"y":-45.765,"l":"N"},{"x":-11.166,"y":-45.6584,"l":"N"},{"x":19.8359,"y":-89.7705,"l":"N"},{"x":-3.2171,"y":38.9619,"l":"N"},{"x":-14.0155,"y":-84.9408,"l":"N"},{"x":23.0322,"y":-25.5761},{"x":41.9322,"y":-51.4369},{"x":-28.8696,"y":-53.9362},{"x":-11.8939,"y":-26.1046},{"x":39.3607,"y":-86.886},{"x":16.9262,"y":-109.7484},{"x":-14.614,"y":55.3971},{"x":15.9353,"y":44.7225},{"x":-17.558,"y":-104.1851},{"x":-30.3391,"y":-74.1948},{"x":41.9009,"y":-19.2102},{"x":5.5664,"y":-16.0075},{"x":53.7886,"y":-35.3435},{"x":49.8682,"y":-69.8304},{"x":-42.1304,"y":-38.4984},{"x":-42.2629,"y":-57.2596,"l":"H"},{"x":-31.6747,"y":-21.3799},{"x":48.7705,"y":-104.5222},{"x":34.6787,"y":-118.7709},{"x":-1.7374,"y":-116.6962},{"x":-2.5054,"y":71.3148,"l":"N"},{"x":16.3752,"y":64.7177},{"x":33.0317,"y":34.344},{"x":-37.8135,"y":-106.0053},{"x":-45.6892,"y":-87.5572},{"x":-49.3397,"y":-67.9516},{"x":47.9104,"y":-0.1344},{"x":5.3354,"y":3.9912},{"x":62.8086,"y":-17.493},{"x":73.7887,"y":-35.3435},{"x":-62.0654,"y":-40.1103},{"x":-24.2744,"y":-2.7994},{"x":-48.9952,"y":-11.3799},{"x":68.5611,"y":-107.4094},{"x":44.6789,"y":-136.0914},{"x":24.6787,"y":-136.0914},{"x":-4.8522,"y":-136.4521},{"x":-2.5054,"y":127.7894},{"x":33.9115,"y":74.3343},{"x":50.5679,"y":43.9606},{"x":-48.0763,"y":-123.1714},{"x":-62.2078,"y":-76.2816},{"x":-63.5787,"y":-96.4996},{"x":67.3099,"y":4.73},{"x":-73.4289,"y":-23.6522,"l":"CONH2"},{"x":-48.9952,"y":8.6201},{"x":80.9568,"y":-91.7139},{"x":64.6788,"y":-136.0914,"l":"CONH2"},{"x":-21.4629,"y":133.9404,"l":"O"},{"x":-11.6748,"y":118.62},{"x":51.0078,"y":63.9557},{"x":67.6643,"y":33.5821},{"x":-38.0763,"y":-140.4919},{"x":-80.2678,"y":-85.4781,"l":"CONH2"},{"x":81.2223,"y":-9.6382,"l":"CONH2"},{"x":-66.3158,"y":18.6201},{"x":100.9568,"y":-91.7139,"l":"CONH2"},{"x":-40.8672,"y":127.8124},{"x":-31.6748,"y":118.62},{"x":-11.6748,"y":98.62,"l":"O"},{"x":68.5441,"y":73.5724},{"x":-48.0763,"y":-157.8124,"l":"CONH2"},{"x":-83.6363,"y":8.6201,"l":"O"},{"x":-66.3158,"y":38.62,"l":"N"},{"x":-40.8672,"y":147.8124},{"x":-31.6748,"y":98.62,"l":"O"},{"x":-83.6363,"y":48.62},{"x":-58.1877,"y":157.8124,"l":"O"},{"x":-48.9953,"y":88.62,"l":"P"},{"x":-83.6363,"y":68.62},{"x":-38.9953,"y":71.2995,"l":"O"},{"x":-66.3158,"y":78.62,"l":"O"},{"x":-58.9953,"y":105.9405,"l":"O"},{"x":-100.9568,"y":78.62}],"b":[{"b":20,"e":11},{"b":8,"e":20,"o":2},{"b":11,"e":4,"o":2},{"b":11,"e":24},{"b":19,"e":8},{"b":2,"e":8},{"b":4,"e":0,"o":0},{"b":12,"e":4},{"b":24,"e":40},{"b":24,"e":25},{"b":19,"e":36},{"b":17,"e":19},{"b":19,"e":35},{"b":2,"e":0,"o":0},{"b":2,"e":7,"o":2},{"b":3,"e":0},{"b":6,"e":0,"o":0},{"b":25,"e":12},{"b":12,"e":26,"o":2},{"b":40,"e":53},{"b":25,"e":41},{"b":25,"e":42},{"b":17,"e":33},{"b":7,"e":17},{"b":18,"e":7},{"b":3,"e":10},{"b":3,"e":9},{"b":15,"e":6,"o":2},{"b":6,"e":16},{"b":15,"e":26},{"b":26,"e":43},{"b":53,"e":63},{"b":41,"e":54},{"b":33,"e":50},{"b":18,"e":34},{"b":23,"e":10},{"b":9,"e":21},{"b":9,"e":22},{"b":9,"e":16},{"b":30,"e":15},{"b":16,"e":32},{"b":16,"e":31},{"b":50,"e":61},{"b":21,"e":23},{"b":23,"e":39},{"b":23,"e":38},{"b":21,"e":37},{"b":31,"e":30},{"b":30,"e":47},{"b":31,"e":48},{"b":31,"e":49},{"b":39,"e":52},{"b":37,"e":51},{"b":47,"e":59},{"b":49,"e":60},{"b":52,"e":62},{"b":59,"e":68},{"b":62,"e":70},{"b":62,"e":69,"o":2},{"b":70,"e":73},{"b":73,"e":76},{"b":76,"e":80},{"b":76,"e":78},{"b":78,"e":75},{"b":75,"e":72},{"b":75,"e":77,"o":2},{"b":75,"e":79},{"b":72,"e":65},{"b":65,"e":56},{"b":56,"e":66},{"b":56,"e":44},{"b":65,"e":64},{"b":64,"e":55},{"b":44,"e":55},{"b":64,"e":71},{"b":71,"e":74},{"b":44,"e":27},{"b":27,"e":28},{"b":28,"e":14},{"b":14,"e":5},{"b":5,"e":13,"o":2},{"b":13,"e":27},{"b":28,"e":45,"o":2},{"b":45,"e":57},{"b":57,"e":46,"o":2},{"b":46,"e":29},{"b":29,"e":14,"o":2},{"b":46,"e":58},{"b":57,"e":67},{"b":0,"e":5,"o":0},{"b":10,"e":18,"o":2},{"b":0,"e":1}]}
	});
	group.templates.push({
		name: 'Vitamin B<sub>1</sub>',
		data: {"a":[{"x":24.1354,"y":-28.8488},{"x":19.9771,"y":-9.2859},{"x":33.3597,"y":5.577},{"c":1,"x":1.7062,"y":-1.1512,"l":"N"},{"x":53.2502,"y":3.4865},{"x":23.3597,"y":22.8975,"l":"S"},{"x":3.7968,"y":18.7393},{"x":-15.6143,"y":-11.1512},{"x":65.0059,"y":19.6668},{"x":-32.9348,"y":-1.1512},{"x":84.8963,"y":17.5762,"l":"OH"},{"x":-32.9348,"y":18.8488},{"x":-50.2553,"y":-11.1512},{"x":-50.2553,"y":28.8488,"l":"N"},{"x":-15.6143,"y":28.8488,"l":"NH2"},{"x":-67.5758,"y":-1.1512,"l":"N"},{"x":-67.5758,"y":18.8488},{"x":-84.8963,"y":28.8488}],"b":[{"b":0,"e":1},{"b":1,"e":2,"o":2},{"b":2,"e":4},{"b":4,"e":8},{"b":8,"e":10},{"b":2,"e":5},{"b":5,"e":6},{"b":6,"e":3,"o":2},{"b":1,"e":3},{"b":3,"e":7},{"b":7,"e":9},{"b":9,"e":11,"o":2},{"b":11,"e":14},{"b":11,"e":13},{"b":13,"e":16,"o":2},{"b":16,"e":17},{"b":16,"e":15},{"b":15,"e":12,"o":2},{"b":9,"e":12}]}
	});
	group.templates.push({
		name: 'Vitamin B<sub>3</sub> (Niacin)',
		data: {"a":[{"x":-17.3205,"y":30,"l":"N"},{"x":0,"y":20},{"x":-34.641,"y":20},{"x":0,"y":0},{"x":-34.641,"y":0},{"x":-17.3205,"y":-10},{"x":17.3205,"y":-10},{"x":17.3205,"y":-30,"l":"O"},{"x":34.641,"y":0}],"b":[{"b":0,"e":1,"o":2},{"b":1,"e":3},{"b":3,"e":5,"o":2},{"b":5,"e":4},{"b":4,"e":2,"o":2},{"b":2,"e":0},{"b":3,"e":6},{"b":6,"e":8},{"b":6,"e":7,"o":2}]}
	});
	group.templates.push({
		name: 'Vitamin B<sub>5</sub>',
		data: {"a":[{"x":-15.9808,"y":23.6603,"l":"H"},{"x":-25.9808,"y":6.3397},{"x":-8.6603,"y":-3.6603},{"x":-35.9808,"y":23.6603,"l":"OH"},{"x":-43.3013,"y":-3.6603},{"x":-8.6603,"y":-23.6603,"l":"O"},{"x":8.6602,"y":6.3397,"l":"NH"},{"x":-53.3013,"y":-20.9808},{"x":-60.6218,"y":6.3397},{"x":-33.3013,"y":-20.9808},{"x":25.9807,"y":-3.6603},{"x":-77.9423,"y":-3.6603,"l":"OH"},{"x":43.3012,"y":6.3397},{"x":60.6218,"y":-3.6603},{"x":77.9423,"y":6.3397,"l":"OH"},{"x":60.6218,"y":-23.6603,"l":"O"}],"b":[{"b":1,"e":0},{"b":1,"e":3},{"b":1,"e":2},{"b":2,"e":5,"o":2},{"b":2,"e":6},{"b":6,"e":10},{"b":10,"e":12},{"b":12,"e":13},{"b":13,"e":14},{"b":13,"e":15,"o":2},{"b":1,"e":4},{"b":4,"e":9},{"b":4,"e":7},{"b":4,"e":8},{"b":8,"e":11}]}
	});
	group.templates.push({
		name: 'Vitamin B<sub>6</sub>',
		data: {"a":[{"x":-43.3012,"y":-10},{"x":-25.9808,"y":0},{"x":-25.9808,"y":20,"l":"N"},{"x":-8.6602,"y":-10},{"x":-8.6602,"y":30},{"x":8.6602,"y":0},{"x":-8.6602,"y":-30,"l":"OH"},{"x":8.6602,"y":20},{"x":25.9808,"y":-10},{"x":25.9808,"y":30},{"x":43.3012,"y":0,"l":"OH"},{"x":43.3012,"y":20,"l":"OH"}],"b":[{"b":0,"e":1},{"b":1,"e":2,"o":2},{"b":2,"e":4},{"b":4,"e":7,"o":2},{"b":7,"e":9},{"b":9,"e":11},{"b":7,"e":5},{"b":5,"e":8},{"b":8,"e":10},{"b":5,"e":3,"o":2},{"b":1,"e":3},{"b":3,"e":6}]}
	});
	group.templates.push({
		name: 'Vitamin B<sub>7</sub>',
		data: {"a":[{"x":-65.6493,"y":26.9066,"l":"H"},{"x":-52.2667,"y":12.0436},{"x":-42.2667,"y":29.3641},{"x":-38.8841,"y":-2.8193},{"x":-70.5376,"y":3.9089,"l":"NH"},{"x":-22.7037,"y":25.2059,"l":"S"},{"x":-48.8841,"y":-20.1398,"l":"NH"},{"x":-25.5015,"y":-17.6822,"l":"H"},{"x":-20.6132,"y":5.3155},{"x":-68.447,"y":-15.9815},{"x":-3.2927,"y":-4.6845},{"x":-83.3099,"y":-29.3641,"l":"O"},{"x":14.0278,"y":5.3155},{"x":31.3483,"y":-4.6845},{"x":48.6689,"y":5.3155},{"x":65.9894,"y":-4.6845},{"x":65.9894,"y":-24.6845,"l":"O"},{"x":83.3099,"y":5.3155,"l":"OH"}],"b":[{"b":1,"e":0},{"b":1,"e":2},{"b":2,"e":5},{"b":5,"e":8},{"b":8,"e":10},{"b":10,"e":12},{"b":12,"e":13},{"b":13,"e":14},{"b":14,"e":15},{"b":15,"e":17},{"b":15,"e":16,"o":2},{"b":8,"e":3},{"b":1,"e":3},{"b":3,"e":7},{"b":3,"e":6},{"b":6,"e":9},{"b":9,"e":11,"o":2},{"b":9,"e":4},{"b":1,"e":4}]}
	});
	group.templates.push({
		name: 'Vitamin B<sub>9</sub>',
		data: {"a":[{"x":-147.2244,"y":50,"l":"NH2"},{"x":-129.9039,"y":40},{"x":-129.9039,"y":20,"l":"N"},{"x":-112.5833,"y":50,"l":"N"},{"x":-112.5833,"y":10},{"x":-95.2628,"y":40},{"x":-95.2628,"y":20},{"x":-112.5833,"y":-10,"l":"OH"},{"x":-77.9423,"y":50,"l":"N"},{"x":-77.9423,"y":10,"l":"N"},{"x":-60.6218,"y":40},{"x":-60.6218,"y":20},{"x":-43.3013,"y":10},{"x":-25.9808,"y":20,"l":"NH"},{"x":-8.6603,"y":10},{"x":-8.6603,"y":-10},{"x":8.6602,"y":20},{"x":8.6602,"y":-20},{"x":25.9808,"y":10},{"x":25.9808,"y":-10},{"x":43.3013,"y":-20},{"x":43.3013,"y":-40,"l":"O"},{"x":60.6218,"y":-10,"l":"NH"},{"x":77.9423,"y":-20},{"x":95.2628,"y":-10},{"x":77.9423,"y":-40},{"x":112.5834,"y":-20},{"x":60.6218,"y":-50,"l":"O"},{"x":95.2628,"y":-50,"l":"OH"},{"x":129.9038,"y":-10},{"x":147.2244,"y":-20,"l":"OH"},{"x":129.9038,"y":10,"l":"O"}],"b":[{"b":0,"e":1},{"b":1,"e":2,"o":2},{"b":2,"e":4},{"b":4,"e":7},{"b":4,"e":6,"o":2},{"b":6,"e":9},{"b":9,"e":11,"o":2},{"b":11,"e":12},{"b":12,"e":13},{"b":13,"e":14},{"b":14,"e":15,"o":2},{"b":15,"e":17},{"b":17,"e":19,"o":2},{"b":19,"e":18},{"b":18,"e":16,"o":2},{"b":14,"e":16},{"b":19,"e":20},{"b":20,"e":21,"o":2},{"b":20,"e":22},{"b":22,"e":23},{"b":23,"e":24},{"b":24,"e":26},{"b":26,"e":29},{"b":29,"e":30},{"b":29,"e":31,"o":2},{"b":23,"e":25},{"b":25,"e":28},{"b":25,"e":27,"o":2},{"b":11,"e":10},{"b":10,"e":8,"o":2},{"b":8,"e":5},{"b":6,"e":5},{"b":5,"e":3,"o":2},{"b":1,"e":3}]}
	});
	group.templates.push({
		name: 'Vitamin C',
		data: {"a":[{"x":14.8183,"y":-7.3993,"l":"H"},{"x":-2.5022,"y":2.6007},{"x":-14.2579,"y":18.781,"l":"O"},{"x":-14.2579,"y":-13.5797},{"x":14.8183,"y":12.6007},{"x":-33.279,"y":12.6007},{"x":-33.2791,"y":-7.3993},{"x":-8.0775,"y":-32.6008,"l":"OH"},{"x":32.1389,"y":2.6007},{"x":14.8183,"y":32.6007,"l":"OH"},{"x":-49.4593,"y":24.3563,"l":"O"},{"x":-49.4593,"y":-19.155,"l":"OH"},{"x":49.4594,"y":12.6007,"l":"OH"}],"b":[{"b":1,"e":0},{"b":1,"e":2},{"b":2,"e":5},{"b":5,"e":10,"o":2},{"b":5,"e":6},{"b":6,"e":11},{"b":6,"e":3,"o":2},{"b":1,"e":3},{"b":3,"e":7},{"b":1,"e":4},{"b":4,"e":9},{"b":4,"e":8},{"b":8,"e":12}]}
	});
	group.templates.push({
		name: 'Vitamin D<sub>3</sub>',
		data: {"a":[{"x":-177.0877,"y":20.5302},{"x":-153.0316,"y":34.4191},{"x":-153.0316,"y":62.1969},{"x":-128.9753,"y":20.5302},{"x":-104.9189,"y":34.4191},{"x":-80.8628,"y":20.5302},{"x":-56.8066,"y":34.4191},{"x":-32.7503,"y":20.5302},{"x":-56.8066,"y":62.1969},{"x":-56.8065,"y":6.6413,"l":"H"},{"x":-29.8467,"y":-7.0957},{"x":-7.3741,"y":31.8285},{"x":-2.6759,"y":-12.871},{"x":-28.0168,"y":50.415},{"x":11.213,"y":11.185},{"x":1.2099,"y":58.2465},{"x":27.5404,"y":-11.2874,"l":"H"},{"x":38.3838,"y":16.961},{"x":28.3806,"y":64.0218},{"x":46.9676,"y":43.379},{"x":56.9707,"y":-3.6825},{"x":84.1414,"y":2.0928},{"x":103.7833,"y":-17.549},{"x":130.6146,"y":-10.359},{"x":96.5939,"y":-44.38},{"x":150.2565,"y":-30.0015},{"x":69.7627,"y":-51.5693},{"x":116.2357,"y":-64.0218},{"x":177.0877,"y":-22.8116,"l":"OH"},{"x":143.0669,"y":-56.8325}],"b":[{"b":14,"e":16},{"b":14,"e":12},{"b":12,"e":10},{"b":10,"e":7},{"b":7,"e":6},{"b":6,"e":8},{"b":6,"e":5},{"b":5,"e":4},{"b":4,"e":3},{"b":3,"e":1},{"b":1,"e":2},{"b":1,"e":0},{"b":7,"e":11},{"b":14,"e":11},{"b":11,"e":13},{"b":11,"e":15},{"b":15,"e":18},{"b":18,"e":19},{"b":19,"e":17},{"b":14,"e":17},{"b":17,"e":20,"o":2},{"b":20,"e":21},{"b":21,"e":22,"o":2},{"b":22,"e":23},{"b":23,"e":25},{"b":25,"e":28},{"b":25,"e":29},{"b":29,"e":27},{"b":27,"e":24},{"b":22,"e":24},{"b":24,"e":26,"o":2},{"b":7,"e":9}]}
	});
	group.templates.push({
		name: 'Vitamin D<sub>4</sub>',
		data: {"a":[{"x":-150.3688,"y":57.1289},{"x":-126.3125,"y":71.0178},{"x":-102.2562,"y":57.1289},{"x":-126.3125,"y":98.7956},{"x":-78.1999,"y":71.0178},{"x":-102.2562,"y":29.3511},{"x":-54.1437,"y":57.1289},{"x":-30.0875,"y":71.0178},{"x":-30.0875,"y":98.7956},{"x":-6.0311,"y":57.1289},{"x":-6.0311,"y":84.9067,"l":"H"},{"x":-17.3294,"y":31.7532},{"x":21.5944,"y":54.2257},{"x":3.3135,"y":13.166},{"x":42.2374,"y":72.8122},{"x":27.3697,"y":27.0549},{"x":13.0107,"y":80.6437},{"x":68.6556,"y":64.2287},{"x":30.2734,"y":-0.571,"l":"H"},{"x":53.788,"y":18.4706},{"x":74.4309,"y":37.0578},{"x":59.5634,"y":-8.6995},{"x":85.9816,"y":-17.2838},{"x":91.7569,"y":-44.4546},{"x":118.1751,"y":-53.0382},{"x":71.114,"y":-63.0412},{"x":123.9505,"y":-80.209},{"x":76.8894,"y":-90.212},{"x":44.6957,"y":-54.4576},{"x":150.3688,"y":-88.7926,"l":"OH"},{"x":103.3076,"y":-98.7956}],"b":[{"b":9,"e":10},{"b":9,"e":11},{"b":11,"e":13},{"b":13,"e":15},{"b":15,"e":18},{"b":15,"e":19},{"b":19,"e":20},{"b":20,"e":17},{"b":17,"e":14},{"b":14,"e":12},{"b":9,"e":12},{"b":15,"e":12},{"b":12,"e":16},{"b":19,"e":21,"o":2},{"b":21,"e":22},{"b":22,"e":23,"o":2},{"b":23,"e":24},{"b":24,"e":26},{"b":26,"e":29},{"b":26,"e":30},{"b":30,"e":27},{"b":27,"e":25},{"b":23,"e":25},{"b":25,"e":28,"o":2},{"b":9,"e":7},{"b":7,"e":8},{"b":7,"e":6},{"b":6,"e":4},{"b":4,"e":2},{"b":2,"e":5},{"b":2,"e":1},{"b":1,"e":3},{"b":1,"e":0}]}
	});
	group.templates.push({
		name: 'Vitamin D<sub>5</sub>',
		data: {"a":[{"x":-150.3688,"y":57.1289},{"x":-126.3126,"y":71.0178},{"x":-102.2563,"y":57.1289},{"x":-102.2563,"y":29.3511},{"x":-78.2,"y":71.0178},{"x":-78.2,"y":15.4622},{"x":-126.3126,"y":15.4622},{"x":-54.1438,"y":57.1289},{"x":-30.0875,"y":71.0178},{"x":-6.0311,"y":57.1289},{"x":-30.0875,"y":98.7956},{"x":-17.3294,"y":31.7532},{"x":-6.0311,"y":84.9067,"l":"H"},{"x":21.5944,"y":54.2257},{"x":3.3135,"y":13.166},{"x":42.2374,"y":72.8122},{"x":27.3698,"y":27.0549},{"x":13.0106,"y":80.6437},{"x":68.6556,"y":64.2287},{"x":30.2734,"y":-0.571,"l":"H"},{"x":53.788,"y":18.4713},{"x":74.4308,"y":37.0578},{"x":59.5634,"y":-8.6995},{"x":85.9816,"y":-17.2838},{"x":91.7569,"y":-44.4546},{"x":118.1751,"y":-53.0382},{"x":71.1139,"y":-63.0412},{"x":123.9505,"y":-80.209},{"x":76.8894,"y":-90.212},{"x":44.6957,"y":-54.4576},{"x":103.3076,"y":-98.7956},{"x":150.3688,"y":-88.7926,"l":"OH"}],"b":[{"b":9,"e":12},{"b":9,"e":11},{"b":11,"e":14},{"b":14,"e":16},{"b":16,"e":19},{"b":16,"e":20},{"b":20,"e":21},{"b":21,"e":18},{"b":18,"e":15},{"b":15,"e":13},{"b":9,"e":13},{"b":16,"e":13},{"b":13,"e":17},{"b":20,"e":22,"o":2},{"b":22,"e":23},{"b":23,"e":24,"o":2},{"b":24,"e":25},{"b":25,"e":27},{"b":27,"e":31},{"b":27,"e":30},{"b":30,"e":28},{"b":28,"e":26},{"b":24,"e":26},{"b":26,"e":29,"o":2},{"b":9,"e":8},{"b":8,"e":10},{"b":8,"e":7},{"b":7,"e":4},{"b":4,"e":2},{"b":2,"e":1},{"b":1,"e":0},{"b":2,"e":3},{"b":3,"e":6},{"b":3,"e":5}]}
	});
	group.templates.push({
		name: 'Vitamin E',
		data: {"a":[{"x":138.5641,"y":-10},{"x":138.5641,"y":10},{"x":121.2436,"y":20},{"x":155.8846,"y":20},{"x":103.9231,"y":10},{"x":86.6026,"y":20},{"x":69.282,"y":10},{"x":69.282,"y":-10},{"x":51.9615,"y":20},{"x":34.641,"y":10},{"x":17.3205,"y":20},{"x":0,"y":10},{"x":0,"y":-10},{"x":-17.3205,"y":20},{"x":-34.641,"y":10},{"x":-51.9615,"y":20},{"x":-69.2821,"y":10},{"x":-69.2821,"y":30},{"x":-69.2821,"y":-10},{"x":-86.6026,"y":20,"l":"O"},{"x":-86.6026,"y":-20},{"x":-103.9231,"y":10},{"x":-103.9231,"y":-10},{"x":-121.2436,"y":20},{"x":-121.2436,"y":-20},{"x":-138.5641,"y":10},{"x":-121.2436,"y":40},{"x":-121.2436,"y":-40},{"x":-138.5641,"y":-10},{"x":-155.8846,"y":20},{"x":-155.8846,"y":-20,"l":"OH"}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":1,"e":2},{"b":2,"e":4},{"b":4,"e":5},{"b":5,"e":6},{"b":6,"e":7},{"b":6,"e":8},{"b":8,"e":9},{"b":9,"e":10},{"b":10,"e":11},{"b":11,"e":12},{"b":11,"e":13},{"b":13,"e":14},{"b":14,"e":15},{"b":15,"e":16},{"b":16,"e":17},{"b":16,"e":18},{"b":18,"e":20},{"b":20,"e":22},{"b":22,"e":24,"o":2},{"b":24,"e":27},{"b":24,"e":28},{"b":28,"e":30},{"b":28,"e":25,"o":2},{"b":25,"e":29},{"b":25,"e":23},{"b":23,"e":26},{"b":23,"e":21,"o":2},{"b":22,"e":21},{"b":21,"e":19},{"b":16,"e":19}]}
	});
	group.templates.push({
		name: 'Vitamin K<sub>1</sub>',
		data: {"a":[{"x":-155.8846,"y":40},{"x":-155.8846,"y":20},{"x":-138.5641,"y":10},{"x":-173.2051,"y":10},{"x":-121.2436,"y":20},{"x":-103.9231,"y":10},{"x":-86.6025,"y":20},{"x":-86.6025,"y":40},{"x":-69.2821,"y":10},{"x":-51.9615,"y":20},{"x":-34.641,"y":10},{"x":-17.3205,"y":20},{"x":0,"y":10},{"x":-17.3205,"y":40},{"x":17.3205,"y":20},{"x":34.641,"y":10},{"x":51.9615,"y":20},{"x":69.2821,"y":10},{"x":51.9615,"y":40},{"x":86.6026,"y":20},{"x":103.9231,"y":10},{"x":121.2437,"y":20},{"x":103.9231,"y":-10},{"x":138.5641,"y":10},{"x":121.2437,"y":40,"l":"O"},{"x":121.2437,"y":-20},{"x":86.6026,"y":-20},{"x":155.8847,"y":20},{"x":138.5641,"y":-10},{"x":121.2437,"y":-40,"l":"O"},{"x":173.2051,"y":10},{"x":155.8847,"y":-20},{"x":173.2051,"y":-10}],"b":[{"b":0,"e":1},{"b":1,"e":3},{"b":1,"e":2},{"b":2,"e":4},{"b":4,"e":5},{"b":5,"e":6},{"b":6,"e":7},{"b":6,"e":8},{"b":8,"e":9},{"b":9,"e":10},{"b":10,"e":11},{"b":11,"e":13},{"b":11,"e":12},{"b":12,"e":14},{"b":14,"e":15},{"b":15,"e":16},{"b":16,"e":18},{"b":16,"e":17,"o":2},{"b":17,"e":19},{"b":19,"e":20},{"b":20,"e":22,"o":2},{"b":22,"e":26},{"b":22,"e":25},{"b":25,"e":29,"o":2},{"b":25,"e":28},{"b":28,"e":23,"o":2},{"b":23,"e":27},{"b":27,"e":30,"o":2},{"b":30,"e":32},{"b":32,"e":31,"o":2},{"b":28,"e":31},{"b":23,"e":21},{"b":20,"e":21},{"b":21,"e":24,"o":2}]}
	});
	d.push(group);
	
	// this is the user's template group, don't remove this or the templates widget won't work
	// IE/Edge doesn't allow localStorage from local files
	let saved;
	if(localStorage){
		// load from local storage
		saved = localStorage.getItem('chemdoodle_user_templates');
	}
	group = {name:'My Templates', templates:!saved||saved===null?[]:JSON.parse(saved)};
	d.push(group);

	return d;

})(JSON, localStorage);

(function(c, interaction, undefined) {
	'use strict';
	interaction.Draggable = function(element, options = {}) {
		this.element = element;
	    this.options = options;

	    this.active = false;
		this.initialElementX = 0;
		this.initialElementY = 0;
	    this.initialMouseX = 0;
		this.initialMouseY = 0;
	    this.handleElement = this.options.handle ? this.options.handle : this.element;
		// change mouse cursor to move
		if(this.handleElement){
			this.handleElement.style.cursor = 'move';
		}
		

	    this.initEvents();
	};
	let _ = interaction.Draggable.prototype;
	_.initEvents = function() {
		// Mouse events
		this.handleElement.addEventListener('mousedown', this.dragStart.bind(this));
	    document.addEventListener('mouseup', this.dragEnd.bind(this));
	    document.addEventListener('mousemove', this.dragMove.bind(this));
		
		// Touch events
		this.handleElement.addEventListener('touchstart', this.dragStart.bind(this));
	    document.addEventListener('touchend', this.dragEnd.bind(this));
	    document.addEventListener('touchmove', this.dragMove.bind(this));
	};
	_.dragStart = function(e){
		if(this.active){
			// failsafe, just in case something went wrong, turn it off
			dragEnd(e);
			return;
		}
		if (e.touches && e.touches.length > 1) {
			// Ignore multi-touch
			return;
		}

		let clientX, clientY;
		let targetElement;
		if (e.type === 'mousedown') {
			if(e.button !== 0) {
				return; // Only left click
			}
			clientX = e.clientX;
			clientY = e.clientY;
			targetElement = e.target;
		} else if (e.type === 'touchstart') {
			clientX = e.touches[0].clientX;
			clientY = e.touches[0].clientY;
			targetElement = e.touches[0].target;
		}
		
		if (targetElement === this.handleElement || this.handleElement.contains(targetElement)) {
			e.preventDefault();
	    	e.stopPropagation();

			this.active = true;
			this.initialElementX = parseInt(window.getComputedStyle(this.element).left, 10);
			if (isNaN(this.initialElementX)) {
				this.initialElementX = this.element.offsetLeft;
			}
			this.initialElementY = parseInt(window.getComputedStyle(this.element).top, 10);
			if (isNaN(this.initialElementY)) {
				this.initialElementY = this.element.offsetTop;
			}
			this.initialMouseX = clientX;
			this.initialMouseY = clientY;
			
			// define the body cursor to move so we do not see flashing or blinking of the cursor while dragging
			document.body.style.cursor = 'move';
			
			// Prevent visual highlighting during drag
			document.body.style.userSelect = 'none';
			document.body.style.webkitUserSelect = 'none';
			document.body.style.MozUserSelect = 'none';
			document.body.style.msUserSelect = 'none';
	    }
	};
	_.dragEnd = function(e){
	    this.active = false;
		
		// return the body cursor to empty
		document.body.style.cursor = '';
		
		// Re-enable visual highlighting
		document.body.style.userSelect = '';
		document.body.style.webkitUserSelect = '';
		document.body.style.MozUserSelect = '';
		document.body.style.msUserSelect = '';
	};
	_.dragMove = function(e){
		if (!this.active) {
			return;
	    }
		
		e.preventDefault();
	    e.stopPropagation();

		let clientX, clientY;
		if (e.type === 'mousemove') {
			clientX = e.clientX;
			clientY = e.clientY;
		} else if (e.type === 'touchmove') {
			if (e.touches.length > 1) {
				return; // Ignore multi-touch
			}
			clientX = e.touches[0].clientX;
			clientY = e.touches[0].clientY;
		} else {
			return; // Should not happen
		}

	    const difX = clientX - this.initialMouseX;
		const difY = clientY - this.initialMouseY;

	    this.element.style.left = (this.initialElementX+difX)+'px';
	    this.element.style.top = (this.initialElementY+difY)+'px';
	    const offset = this.applyContainment();
		if(offset.x!==0){
		    this.element.style.left = (this.initialElementX+difX+offset.x)+'px';
		}
		if(offset.y!==0){
		    this.element.style.top = (this.initialElementY+difY+offset.y)+'px';
		}

	    if (this.options.drag && typeof this.options.drag === 'function') {
			this.options.drag.call(this.element);
	    }
	};
	_.applyContainment = function(e){
		const offset = {x:0, y:0};
		if (this.options.containment) {
			let container;
			if (this.options.containment instanceof HTMLElement) {
				container = this.options.containment;
			} else if (this.options.containment === 'document') {
				container = document.documentElement;
			} else if (this.options.containment === 'parent') {
				container = this.element.parentNode;
			} else if (typeof this.options.containment === 'string') {
				container = document.querySelector(this.options.containment);
			}
			
			if (container) {
				const containerRect = container.getBoundingClientRect();
				const elementRect = this.element.getBoundingClientRect();
				if (elementRect.left < containerRect.left) {
					offset.x = containerRect.left-elementRect.left;
				}
				if (elementRect.top < containerRect.top) {
					offset.y = containerRect.top-elementRect.top;
				}
				if (elementRect.right > containerRect.right) {
					offset.x = containerRect.right-elementRect.right;
				}
				if (elementRect.bottom > containerRect.bottom) {
					offset.y = containerRect.bottom-elementRect.bottom;
				}
			}
		}
		return offset;
	};

})(ChemDoodle, ChemDoodle.uis.gui.desktop.interaction);

(function(c, interaction, undefined) {
	'use strict';
	interaction.Resizable = function(element, options = {}) {
        this.element = typeof element === 'string' ? document.querySelector(element) : element;
        this.options = {
            handles: 'se', // Default to south-east handle
            ...options,
        };

        this.active = false;

        this.init();
    };

    let _ = interaction.Resizable.prototype;

    _.init = function() {
		if(this.element && this.element.tagName === 'CANVAS'){
			// Create a container element.
			// This will hold both the canvas and the resize handles as no divs can be added to <canvas> elements
			this.containerElement = document.createElement('div');
			this.containerElement.className = 'reset-all';
			this.containerElement.style.display = 'inline-block';
			this.containerElement.style.position = 'relative'; // Handles are positioned relative to this
			this.containerElement.style.userSelect = 'none';
			this.element.parentNode.insertBefore(this.containerElement, this.element);  //insert container before canvas
			this.containerElement.appendChild(this.element); // Move the canvas into the container
		}else{
			this.containerElement = this.element;			
		}

        this.handles = this._getHandles(); //still creates handles, but appends to container
        this._attachHandleEvents();
    };

    _._getHandles = function() {
        const handles = {};
        const handlePositions = this.options.handles.toLowerCase().split(' ');
        const self = this;

        const createHandle = (direction) => {
            const handle = document.createElement('div');
            handle.style.position = 'absolute';
            // Basic styling, you'll likely want to enhance this with CSS
            Object.assign(handle.style, {
                width: '10px',
                height: '10px',
                background: 'rgba(0, 0, 0, 0.1)',
                zIndex: '90',
				boxSizing: 'border-box'
            });
            return handle;
        };
		
		for(const loc of handlePositions){
			const handle = createHandle(loc);
			let stylesToAdd = undefined;
			switch(loc){
				case 'n':
					stylesToAdd = { left: '50%', top: '0', cursor: 'n-resize' };
					break;
				case 'e':
					stylesToAdd = { top: '50%', right: '0', cursor: 'e-resize' };
					break;
				case 's':
					stylesToAdd = { left: '50%', bottom: '0', cursor: 's-resize' };
					break;
				case 'w':
					stylesToAdd = { top: '50%', left: '0', cursor: 'w-resize' };
					break;
				case 'ne':
					stylesToAdd = { top: '0', right: '0', cursor: 'ne-resize' };
					break;
				case 'nw':
					stylesToAdd = { top: '0', left: '0', cursor: 'nw-resize' };
					break;
				case 'se':
					stylesToAdd = { bottom: '0', right: '0', cursor: 'se-resize' };
					break;
				case 'sw':
					stylesToAdd = { bottom: '0', left: '0', cursor: 'sw-resize' };
					break;
			}
			Object.assign(handle.style, stylesToAdd);
			handles[loc] = handle;
			this.containerElement.appendChild(handle);
		}

        return handles;
    };

    _._attachHandleEvents = function() {
        const self = this;
        for (const direction in this.handles) {
            this.handles[direction].addEventListener('mousedown', function(e) {
                self._resizeStart(e, direction);
            });
        }
        document.addEventListener('mousemove', this._resizing.bind(this));
        document.addEventListener('mouseup', this._resizeStop.bind(this));
    };

    _._resizeStart = function(e, direction) {
		if(e.button !== 0){
			// not the left click mouse button
			return;
		}
		if(this.active){
			// failsafe, just in case something went wrong, turn it off
			this.active = false;
			return;
		}
        this.active = true;
        this.direction = direction;
		this.downX = e.clientX;
		this.downY = e.clientY;
        this.startWidth = this.element.offsetWidth;
        this.startHeight = this.element.offsetHeight;
    };

    _._resizing = function(e) {
        if (!this.active) {
            return;
        }

        e.preventDefault();

        const deltaX = e.clientX - this.downX;
        const deltaY = e.clientY - this.downY;
        let newWidth = this.startWidth;
        let newHeight = this.startHeight;

        switch (this.direction) {
            case 'n':
				newHeight -= deltaY
                break;
            case 'e':
				newWidth += deltaX;
                break;
            case 's':
				newHeight += deltaY;
                break;
            case 'w':
				newWidth -= deltaX;
                break;
            case 'ne':
                newWidth += deltaX;
                newHeight -= deltaY;
                break;
            case 'nw':
				newWidth -= deltaX;
				newHeight -= deltaY;
                break;
            case 'se':
				newWidth += deltaX;
				newHeight += deltaY;
                break;
            case 'sw':
				newWidth -= deltaX;
				newHeight += deltaY;
                break;
        }

        this.element.style.width = Math.max(0, newWidth) + 'px';
        this.element.style.height = Math.max(0, newHeight) + 'px';

        if (this.options.resize && typeof this.options.resize === 'function') {
			this.options.resize.call(this.element, {
				originalEvent: e,
				element: this.element,
				size: { width: newWidth, height: newHeight },
			});
        }
    };

    _._resizeStop = function(e) {
        if (!this.active) {
            return;
        }
        this.active = false;
        this.direction = undefined;

        if (this.options.stop && typeof this.options.stop === 'function') {
            this.options.stop.call(this.element, {
                originalEvent: e,
                element: this.element,
                size: { width: this.element.offsetWidth, height: this.element.offsetHeight },
                position: { left: this.element.offsetLeft, top: this.element.offsetTop },
            });
        }
    };

})(ChemDoodle, ChemDoodle.uis.gui.desktop.interaction);

(function(desktop, d, undefined) {
	'use strict';
	desktop._Component = function(id) {
		this.id = id;
	};
	let _ = desktop._Component.prototype;
	_.getElement = function() {
		return d.getElementById(this.id);
	};
	_.disable = function() {
		this.getElement().disabled = true;
	};
	_.enable = function() {
		this.getElement().disabled = false;
	};
	_.enabled = function() {
		return !this.getElement().disabled;
	};

})(ChemDoodle.uis.gui.desktop, document);

(function(desktop, window, undefined) {
	'use strict';
	desktop.CursorManager = function(sketcher) {
		this.sketcher = sketcher;
		this.lastCursor = undefined;
		this.currentCursor = undefined;
	};
	desktop.CursorManager.POINTER = 'default';
	desktop.CursorManager.CROSSHAIR = 'crosshair';
	desktop.CursorManager.TEXT = 'text';
	// Internet Explorer does not support grab or grabbing and setting these will not change the current cursor
	// CWC only supports IE11
	let IE11 = window.navigator.userAgent.indexOf('Trident/')!==-1;
	desktop.CursorManager.HAND_OPEN = IE11?'move':'grab';
	desktop.CursorManager.HAND_CLOSE = IE11?'move':'grabbing';
	desktop.CursorManager.HAND_POINT = 'pointer';
	desktop.CursorManager.LASSO = 'default';
	desktop.CursorManager.ROTATE = 'alias';
	desktop.CursorManager.RESIZE = 'move';
	desktop.CursorManager.ERASER = 'cell';
	let _ = desktop.CursorManager.prototype;
	_.setCursor = function(cursor) {
		if(!this.sketcher.isMobile && this.currentCursor!==cursor){
			this.lastCursor = this.currentCursor;
			this.currentCursor = cursor;
			document.getElementById(this.sketcher.id).style.cursor = cursor;
		}
	};
	_.setPreviousCursor = function() {
		if(!this.sketcher.isMobile && this.lastCursor!==undefined && this.lastCursor!==this.currentCursor){
			this.currentCursor = this.lastCursor;
			document.getElementById(this.sketcher.id).style.cursor = this.lastCursor;
		}
	};
	_.getCurrentCursor = function(){
		return this.currentCursor;
	};

})(ChemDoodle.uis.gui.desktop, window);
(function(desktop, undefined) {
	'use strict';
	desktop.CheckboxInput = function(id, tooltip, func, defaultValue) {
		desktop._Component.call(this, id);
		this.defaultValue = defaultValue ? defaultValue : false;
		this.tooltip = tooltip ? tooltip : '';
		this.func = func ? func : undefined;
	};
	let _ = desktop.CheckboxInput.prototype = new desktop._Component();
	_.getSource = function() {
		return `<input type="checkbox" id="${this.id}" title="${this.tooltip}" ${this.defaultValue?'checked':''}>`;
	};
	_.setup = function() {
		this.getElement().addEventListener('change', this.func);
	};
	_.check = function() {
		this.getElement().checked = true;
	};
	_.uncheck = function() {
		this.getElement().checked = false;
	};
	_.checked = function() {
		return this.getElement().checked;
	};
})(ChemDoodle.uis.gui.desktop);
(function(desktop, undefined) {
	'use strict';
	desktop.ColorInput = function (id, tooltip, func) {
		desktop._Component.call(this, id);
		this.tooltip = tooltip ? tooltip : '';
		this.func = func ? func : undefined;
	};
	let _ = desktop.ColorInput.prototype = new desktop._Component();
	_.getSource = function() {
		return `
			<input id="${this.id}" title="${this.tooltip}" type="color" value="#000000" />
		`;
	};
	_.setup = function() {
		this.getElement().addEventListener('input', this.func, false);
	};
	_.setColor = function(color) {
		if(!color.startsWith('#')){
			color = '#'+color;
		}
		if(color.length === 4){
			const repeat = color.substring(1);
			color += repeat;
		}
		this.getElement().value = color;
	};
})(ChemDoodle.uis.gui.desktop);
(function(desktop, undefined) {
	'use strict';
	desktop.NumberInput = function(id, tooltip, func, min, max, defaultValue, unit) {
		desktop._Component.call(this, id);
		this.tooltip = tooltip ? tooltip : '';
		this.func = func ? func : undefined;
		this.min = min;
		this.max = max;
		this.defaultValue = defaultValue === undefined ? '' : defaultValue;
		this.unit = unit === undefined ? '' : unit;
	};
	let _ = desktop.NumberInput.prototype = new desktop._Component();
	_.getSource = function() {
		return `<input type="number" id="${this.id}" min="${this.min}" max="${this.max}" value="${this.defaultValue}">${this.unit}`;
	};
	_.setup = function() {
		this.getElement().addEventListener('change', this.func);
	};
	_.setValue = function(value) {
		this.getElement().value = value;
	};
})(ChemDoodle.uis.gui.desktop);
(function(desktop, undefined) {
	'use strict';
	desktop.SelectInput = function(id, tooltip, func, defaultIndex) {
		desktop._Component.call(this, id);
		this.tooltip = tooltip ? tooltip : '';
		this.func = func ? func : undefined;
		this.defaultIndex = defaultIndex===undefined ? 0 : defaultIndex;
		this.options = [];
	};
	let _ = desktop.SelectInput.prototype = new desktop._Component();
	_.getSource = function() {
		const sb = [`<select id="${this.id}" title="${this.tooltip}" style="user-select:none;">`];
		for(const o of this.options){
			sb.push(`<option value="${o.value}">${o.display}</option>`);
		}
		sb.push('</select>');
		return sb.join('');
	};
	_.setup = function() {
		this.getElement().addEventListener('change', this.func);
	};
	_.setValue = function(value) {
		this.getElement().value = value;
	};
})(ChemDoodle.uis.gui.desktop);

(function(desktop, imageDepot, undefined) {
	'use strict';
	desktop.Button = function(id, icon, tooltip, func) {
		desktop._Component.call(this, id);
		this.icon = icon;
		this.tooltip = tooltip ? tooltip : '';
		this.func = func ? func : undefined;
		// in the _Component parent, enabled is a function, but we override it here to a boolean as Button is a <div>
		this.enabled = true;
		this.toggle = false;
		this.selected = false;
	};
	let _ = desktop.Button.prototype = new desktop._Component();
	_.dimension = 20;
	_.getSource = function() {
		// img id is important as the UI Canvases use img loads to set things up
		return `
			<div id="${this.id}" class="reset-all" title="${this.tooltip}" style="display:inline-block;line-height:1em;font-size:0;vertical-align:middle;user-select:none;cursor:pointer;background:#eee;padding:3px;border:1px solid #ccc;border-radius: 6px;">
				<img id="${this.id}_icon" width="${this.dimension}" height="${this.dimension}" class="reset-all" style="pointer-events:none;user-select:none;width:${this.dimension}px;height:${this.dimension}px;" draggable="false" title="${this.tooltip}" src="${imageDepot.getURI(this.icon)}">
			</div>
		`;
	};
	_.setup = function(bg) {
		const element = this.getElement();
		element.addEventListener('mouseout', (e) => {
		    e.preventDefault();
		    e.stopPropagation();
			if (this.enabled && !this.selected) {
				this.setColors(false, false);
			}
		});
		element.addEventListener('mouseover', (e) => {
		    e.preventDefault();
		    e.stopPropagation();
			if (this.enabled && !this.selected) {
				this.setColors(true, false);
			}
		});
		element.addEventListener('mouseup', (e) => {
		    e.preventDefault();
		    e.stopPropagation();
			if (this.enabled && !this.toggle) {
				this.setColors(true, false);
			}
		});
		element.addEventListener('mousedown', (e) => {
		    e.preventDefault();
		    e.stopPropagation();
			if (this.enabled && !this.toggle) {
				this.setColors(true, true);
			}
		});
		element.addEventListener('click', (e) => {
			// we cannot preventDefault() or stopPropagation() here or the DropDown tray will not disappear when an option is clicked
			if (this.enabled) {
				if(this.selected && this.toggle && this.bg===undefined){
					// this is a toggle button, not in a button group, allow it to be deselected
					this.deselect();
				}else{
					this.select();
				}
			}
		});
		if(bg!==undefined){
			this.bg = bg;
			this.toggle = true;
			bg.push(this);
		}
	};
	_.disable = function() {
		this.enabled = false;
		const element = this.getElement();
		if(element){
			element.style.opacity = 0.4;
			element.style.pointerEvents = 'none';
		}
	};
	_.enable = function() {
		this.enabled = true;
		const element = this.getElement();
		if(element){
			element.style.opacity = 1.0;
			element.style.pointerEvents = 'auto';
		}
	};
	_.select = function(value, skipFunction) {
		if (typeof value !== 'undefined' && value === false) {
			// if there is a value set and only if it is a boolean of false, call deselect()
			this.deselect();
		}else{
			if(this.enabled){
				if(this.bg!==undefined){
					for(let b of this.bg){
						if(b!==this && b.selected){
							b.selected = false;
							b.setColors(false);
						}
					}
				}
				if(this.toggle){
					this.selected = true;
					this.setColors(false, true);
				}
				if(!skipFunction && this.func){
					this.func();
				}
			}
		}
	};
	_.deselect = function() {
		if(this.enabled && this.toggle && this.selected){
			this.selected = false;
			this.setColors(false);
		}
	};
	_.setColors = function(active, pressed) {
		const element = this.getElement();
		if(pressed){
			element.style.background = element.style.borderColor = '#999';
		}else if(active){
			element.style.background = '#f8f8f8';
			element.style.borderColor = '#bbb';
		}else{
			element.style.background = '#eee';
			element.style.borderColor = '#ccc';
		}
	};

})(ChemDoodle.uis.gui.desktop, ChemDoodle.uis.gui.imageDepot);
(function(desktop, undefined) {
	'use strict';
	desktop.ButtonSet = function(id) {
		desktop._Component.call(this, id);
		this.buttons = [];
		this.toggle = true;
		this.columnCount = -1;
	};
	let _ = desktop.ButtonSet.prototype = new desktop._Component();
	_.getSource = function() {
		let sb = [];
		if(this.columnCount===-1){
			sb.push('<span id="');
			sb.push(this.id);
			// font-size of 0 removes horizontal whitespace
			sb.push('" class="reset-all" style="font-size:0;">');
			for (const b of this.buttons) {
				if (this.toggle) {
					b.toggle = true;
				}
				sb.push(b.getSource());
			}
			if (this.dropDown) {
				sb.push(this.dropDown.getSource());
			}
			sb.push('</span>');
			if (this.dropDown) {
				sb.push(this.dropDown.getHiddenSource());
			}
		}else{
			sb.push('<table class="reset-all" style="padding:1px;border-spacing:1px;" cellspacing="1">');
			let c = 0;
			for (const b of this.buttons) {
				if (this.toggle) {
					b.toggle = true;
				}
				if(c===0){
					sb.push('<tr>');
				}
				sb.push('<td class="reset-all" style="padding:0px;">');
				sb.push(b.getSource());
				sb.push('</td>');
				c++;
				if(c===this.columnCount){
					sb.push('</tr>');
					c = 0;
				}
			}
			sb.push('</table>');
		}
		return sb.join('');
	};
	_.setup = function(bg) {
		for (let i = 0, ii = this.buttons.length; i<ii; i++) {
			let b = this.buttons[i];
			b.setup(bg);
			if(this.columnCount===-1){
				const belement = b.getElement();
				if(i===0){
					// left
					belement.style.borderRadius = '6px 0 0 6px';
				}else if(i===this.buttons.length-1 && !this.dropDown){
					// right
					belement.style.borderRadius = '0 6px 6px 0';
					belement.style.borderLeft = 'none';
				}else{
					// center
					belement.style.borderRadius = '0px';
					belement.style.borderLeft = 'none';
				}
			}
		}
		if (this.dropDown) {
			this.dropDown.setup();
		}
	};
	_.addDropDown = function(tooltip) {
		this.dropDown = new desktop.DropDown(this.id + '_dd', tooltip, this.buttons[this.buttons.length - 1]);
	};
	_.disable = function() {
		for (const b of this.buttons) {
			b.disable();
		}
	};
	_.enable = function() {
		for (const b of this.buttons) {
			b.enable();
		}
	};

})(ChemDoodle.uis.gui.desktop);
(function(desktop, imageDepot, FloatingUIDOM, document, undefined) {
	'use strict';
	desktop.DropDown = function(id, tooltip, dummy) {
		desktop.Button.call(this, id, imageDepot.ARROW_DOWN, tooltip);
		this.dummy = dummy;
		this.buttonSet = new desktop.ButtonSet(id + '_set');
		this.buttonSet.buttonGroup = tooltip;
		this.defaultButton = undefined;
	};
	let _ = desktop.DropDown.prototype = new desktop.Button();
	_.superSetup = _.setup;
	_.getHiddenSource = function() {
		return `
			<div id="${this.id}_hidden" style="display:none;position:absolute;z-index:10;border:1px #C1C1C1 solid;background:#F5F5F5;padding:2px;border-radius:5px;">
				${this.buttonSet.getSource(this.id + '_popup_set')}
				<div id="${this.id}_arrow" style="position:absolute;z-index:-1;border-top:1px #C1C1C1 solid;border-left:1px #C1C1C1 solid;background:#F5F5F5;width:8px;height:8px;transform:rotate(45deg);"></div>
			</div>
		`;
	};
	_.setup = function() {
		if (!this.defaultButton) {
			this.defaultButton = this.buttonSet.buttons[0];
		}
		
		this.func = function () {
			const element = this.getElement();
			const hiddenMenu = document.getElementById(this.id + '_hidden');
			const arrowElement = document.getElementById(this.id + '_arrow');
		
		    // Position the hidden menu
		    hiddenMenu.style.display = 'block';
		
		    // Basic positioning logic, position centered under the button
		    FloatingUIDOM.computePosition(element, hiddenMenu, {
			  placement: 'bottom',
			  middleware: [
			    FloatingUIDOM.offset(6),
			    FloatingUIDOM.flip(),
			    FloatingUIDOM.shift({padding: 5}),
			    FloatingUIDOM.arrow({element: arrowElement}),
			  ],
			}).then(({x, y, placement, middlewareData}) => {
			  Object.assign(hiddenMenu.style, {
			    left: `${x}px`,
			    top: `${y}px`,
			  });
			 
			  // Accessing the data
			  const {x: arrowX, y: arrowY} = middlewareData.arrow;
			 
			  const staticSide = {
			    top: 'bottom',
			    right: 'left',
			    bottom: 'top',
			    left: 'right',
			  }[placement.split('-')[0]];
			 
			  Object.assign(arrowElement.style, {
			    left: arrowX != null ? `${arrowX}px` : '',
			    top: arrowY != null ? `${arrowY}px` : '',
			    right: '',
			    bottom: '',
			    [staticSide]: '-5px',
				transform: placement.startsWith('top') ? 'rotate(225deg)' : 'rotate(45deg)',
			  });
			});
		
		    // Hide on next document click
			const self = this;
			if(!self.docClick){
				// cache this, so if the user clicks on the drop down button multiple times, the hidden drop down is toggled
			    self.docClick = function () {
			      hiddenMenu.style.display = 'none';
			      document.removeEventListener('click', self.docClick);
				  self.docClick = undefined;
			    };
			    setTimeout(() => {
			      // Let the current click pass first
			      document.addEventListener('click', self.docClick);
			    }, 0);
			}
		};
		this.superSetup();
  
		// Setup buttons in the set
  		this.buttonSet.setup([]);
  		for(const button of this.buttonSet.buttons){
			const belement = button.getElement();
			belement.addEventListener('click', () => {
				this.dummy.absorb(button);
				this.dummy.getElement().click();
			});
		}
		this.dummy.absorb(this.defaultButton);
		// skip the function, we just want to show it as selected
		this.defaultButton.select(true, true);
		
		// finish the look
		const element = this.getElement();
		element.style.borderRadius = '0 6px 6px 0';
		element.style.borderLeft = 'none';
		element.style.padding = '0 2px 0 2px';
		const img = element.getElementsByTagName('img')[0];
		if (img) {
			img.style.width = (desktop.Button.prototype.dimension/2)+'px';
			img.style.height = (desktop.Button.prototype.dimension+6)+'px';
		}
	};

})(ChemDoodle.uis.gui.desktop, ChemDoodle.uis.gui.imageDepot, ChemDoodle.lib.FloatingUIDOM, document);

(function(desktop, imageDepot, undefined) {
	'use strict';

	// blank 20x20, placeholder until it is set
	const BLANK = 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PC9zdmc+';
	
	desktop.DummyButton = function(id, tooltip) {
		desktop.Button.call(this, id, BLANK, tooltip);
	};
	let _ = desktop.DummyButton.prototype = new desktop.Button();
	_.absorb = function(button) {
		const img = this.getElement().getElementsByTagName('img')[0];
		if (img) {
		  img.src = imageDepot.getURI(button.icon);
		}
		this.func = button.func;
	};

})(ChemDoodle.uis.gui.desktop, ChemDoodle.uis.gui.imageDepot);
(function(desktop, undefined) {
	'use strict';
	desktop.TextButton = function(id, display, tooltip, func) {
		desktop.Button.call(this, id, undefined, tooltip, func);
		this.display = display;
	};
	let _ = desktop.TextButton.prototype = new desktop.Button();
	_.getSource = function(buttonGroup) {
		return `
			<div id="${this.id}" onclick="return false;" title="${this.tooltip}" class="reset-all" style="display:inline-block;font-size:0;vertical-align:middle;user-select:none;cursor:pointer;background:#eee;padding: 3px 6px;border:1px solid #ccc;border-radius:6px;">
				<span style="font-family:sans-serif;font-size:14px;color:#007bff;line-height:normal;">${this.display}</span>
			</div>
		`;
	};
	_.superSetColors = _.setColors;
	_.setColors = function(active, pressed) {
		this.superSetColors(active, pressed);
		const elementSpan = this.getElement().getElementsByTagName('span')[0];
		if(pressed){
			elementSpan.style.color = '#fff';
		}else if(active){
			elementSpan.style.color = '#007bff';
		}else{
			elementSpan.style.color = '#007bff';
		}
	};

})(ChemDoodle.uis.gui.desktop);

(function(desktop, imageDepot, interaction, FloatingUIDOM, components, document, undefined) {
	'use strict';
	desktop.Dialog = function(webComponent, subid, title) {
		// sketcher.id is the DOM element id everything will be anchored around
		// when adding dynamically.
		desktop._Component.call(this, (webComponent ? webComponent.id : '') + subid);
		this.webComponent = webComponent;
		this.title = title ? title : 'Information';
	};
	let _ = desktop.Dialog.prototype = new desktop._Component();
	// a value of -1 means it will fit the natural width of the contents
	_.width = -1;
	_.opened = false;
	_.buttons = [];
	_.message = undefined;
	_.afterMessage = undefined;
	_.includeTextArea = false;
	_.includeTextField = false;
	_.getTextArea = function() {
		return document.getElementById(this.id + '_ta');
	};
	_.getTextField = function() {
		return document.getElementById(this.id + '_tf');
	};
	_.getSource = function() {
		this.closeButton = new desktop.Button(this.id+'_handle_close_button', imageDepot.DIALOG_CLOSE, 'Close window', ()=>{ this.close(); });
		this.closeButton.dimension = 10;
		// create other buttons
		let buttonSource = [];
		if(this.buttons){
			for (const key in this.buttons) {
				if (this.buttons.hasOwnProperty(key)) { // Ensure it's a direct property of the object
					const f = this.buttons[key];
					if (typeof f === 'function') {
						f.component = new desktop.TextButton(this.id+'_'+key.replace(/ /g, '_'), key, undefined, f);
						buttonSource.push(f.component.getSource());
					}
				}
			}
		}
		return `
			<div id="${this.id}" class="reset-all" style="display:none;user-select:none;position:absolute;z-index:10;${this.width===-1?'':'width:'+this.width+'px;'}border:1px #C1C1C1 solid;background:#F5F5F5;border-radius:6px;">
				<div id="${this.id}_handle" class="reset-all" style="cursor:move;user-select:none;padding:5px;display:flex;align-items:center;background:${this.webComponent.uiColor};border-radius:5px;margin:5px 5px 0 5px;">
					<div class="reset-all" style="cursor:move;flex-grow:1;text-align:center;min-width:0;font-family:sans-serif;font-size:14px;font-weight:bold;color:white;">${this.title}</div>
					<div class="reset-all" style="margin-left:auto;">${this.closeButton.getSource()}</div>
				</div>
				<div class="reset-all" style="font-size:12px;text-align:left;padding:5px 10px 5px 10px;" id="${this.id}">
					${this.getContentSource()}
				</div>
				<div class="reset-all" style="margin:0 5px 5px 5px;text-align:right;">
					${buttonSource.join('')}
				</div>
			</div>
		`;
	};
	_.getContentSource = function() {
		let sb = [];
		if (this.message) {
			sb.push('<p>', this.message, '</p>');
		}
		if (this.includeTextField) {
			sb.push('<input type="text" style="font-family:\'Courier New\';" id="', this.id, '_tf" autofocus></input>');
		}
		if (this.includeTextArea) {
			sb.push('<textarea style="font-family:\'Courier New\';" id="', this.id, '_ta" cols="50" rows="10"></textarea>');
		}
		if (this.afterMessage) {
			sb.push('<p>', this.afterMessage, '</p>');
		}
		return sb.join('');
	};
	_.setup = function() {
		let src = this.getSource();
		const sketcherElement = document.getElementById(this.webComponent.id);
		if (sketcherElement) {
			sketcherElement.insertAdjacentHTML('beforebegin', src);
		} else {
			document.writeln(src);
		}
		this.closeButton.setup();
		if(this.buttons){
			for (const key in this.buttons) {
				if (this.buttons.hasOwnProperty(key)) { // Ensure it's a direct property of the object
					const f = this.buttons[key];
					if (typeof f === 'function' && f.component) {
						f.component.setup();
					}
				}
			}
		}
		const element = this.getElement();
		new interaction.Draggable(element, {
			handle: document.getElementById(this.id+'_handle'),
			containment: 'document'
		});
		//new interaction.Resizable(element, {
		//  	handles: 'se'
		//});
		if(this.innersetup){
			this.innersetup();
		}
	};
	_.open = function() {
		const element = this.getElement();
		if(element.style.display === 'none'){
			if(!this.opened){
				if(this.onFirstOpen){
					this.onFirstOpen();
				}
				// Basic positioning logic, position centered right of the canvas, if it fits, otherwise, autoplace
			    FloatingUIDOM.computePosition(document.getElementById(this.webComponent.id), element, {
				  placement: 'right',
				  middleware: [
				    FloatingUIDOM.offset(6),
					FloatingUIDOM.shift({padding: 5}),
				    FloatingUIDOM.autoPlacement(),
				  ],
				}).then(({x, y}) => {
				  Object.assign(element.style, {
				    left: `${x}px`,
				    top: `${y}px`,
				  });
				});
				this.opened = true;
			}
			components.fadeIn(element, 200);
		}
	};
	_.close = function() {
		this.getElement().style.display = 'none';
	};

})(ChemDoodle.uis.gui.desktop, ChemDoodle.uis.gui.imageDepot, ChemDoodle.uis.gui.desktop.interaction, ChemDoodle.lib.FloatingUIDOM, ChemDoodle.components, document);

(function(c, structures, actions, desktop, document, undefined) {
	'use strict';

	let makeRow = function(id, name, tag, description, component) {
		let sb = ['<tr>'];
		// checkbox for include
		sb.push('<td>');
		if(id.indexOf('_elements')===-1){
			sb.push('<input type="checkbox" id="');
			sb.push(id);
			sb.push('_include">');
		}
		sb.push('</td>');
		// name and tag
		sb.push('<td>');
		sb.push(name);
		if(tag){
			sb.push('<br>(<strong>');
			sb.push(tag);
			sb.push('</strong>)');
		}
		sb.push('</td>');
		// component
		sb.push('<td style="padding-left:20px;padding-right:20px;">');
		sb.push(description);
		if(component){
			sb.push('<br>');
			if(component===1){
				sb.push('<input type="text" id="');
				sb.push(id);
				sb.push('_value">');
			}else{
				sb.push(component);
			}
		}
		sb.push('</td>');
		// checkbox for not
		sb.push('<td><input type="checkbox" id="');
		sb.push(id);
		sb.push('_not"><br><strong>NOT</strong>');
		sb.push('</td>');
		// close
		sb.push('</tr>');
		return sb.join('');
	};
	
	desktop.AtomQueryDialog = function(sketcher, subid) {
		desktop.Dialog.call(this, sketcher, subid, 'Atom Query');
		this.buttons = {
			'Cancel' : this.close.bind(this),
			'Remove' : this.removeQuery.bind(this),
			'Set' : this.setNewQuery.bind(this)
		};
		this.width = 500;
	};
	let _ = desktop.AtomQueryDialog.prototype = new desktop.Dialog();
	_.setAtom = function(a) {
		this.a = a;
		let use = a.query;
		if(!use){
			use = new structures.Query(structures.Query.TYPE_ATOM);
			use.elements.v.push(a.label);
		}
		for(let i = 0, ii = this.periodicTable.cells.length; i<ii; i++){
			this.periodicTable.cells[i].selected = use.elements.v.indexOf(this.periodicTable.cells[i].element.symbol)!==-1;
		}
		this.periodicTable.repaint();
		document.getElementById(this.id+'_el_any').checked = use.elements.v.indexOf('a')!==-1;
		document.getElementById(this.id+'_el_noth').checked = use.elements.v.indexOf('r')!==-1;
		document.getElementById(this.id+'_el_het').checked = use.elements.v.indexOf('q')!==-1;
		document.getElementById(this.id+'_el_hal').checked = use.elements.v.indexOf('x')!==-1;
		document.getElementById(this.id+'_el_met').checked = use.elements.v.indexOf('m')!==-1;
		document.getElementById(this.id+'_elements_not').checked = use.elements.not;
		
		document.getElementById(this.id+'_aromatic_include').checked = use.aromatic!==undefined;
		document.getElementById(this.id+'_aromatic_not').checked = use.aromatic!==undefined&&use.aromatic.not;
		document.getElementById(this.id+'_charge_include').checked = use.charge!==undefined;
		document.getElementById(this.id+'_charge_value').value = use.charge?use.outputRange(use.charge.v):'';
		document.getElementById(this.id+'_charge_not').checked = use.charge!==undefined&&use.charge.not;
		document.getElementById(this.id+'_hydrogens_include').checked = use.hydrogens!==undefined;
		document.getElementById(this.id+'_hydrogens_value').value = use.hydrogens?use.outputRange(use.hydrogens.v):'';
		document.getElementById(this.id+'_hydrogens_not').checked = use.charge!==undefined&&use.hydrogens.not;
		document.getElementById(this.id+'_ringCount_include').checked = use.ringCount!==undefined;
		document.getElementById(this.id+'_ringCount_value').value = use.ringCount?use.outputRange(use.ringCount.v):'';
		document.getElementById(this.id+'_ringCount_not').checked = use.ringCount!==undefined&&use.ringCount.not;
		document.getElementById(this.id+'_saturation_include').checked = use.saturation!==undefined;
		document.getElementById(this.id+'_saturation_not').checked = use.saturation!==undefined&&use.saturation.not;
		document.getElementById(this.id+'_connectivity_include').checked = use.connectivity!==undefined;
		document.getElementById(this.id+'_connectivity_value').value = use.connectivity?use.outputRange(use.connectivity.v):'';
		document.getElementById(this.id+'_connectivity_not').checked = use.connectivity!==undefined&&use.connectivity.not;
		document.getElementById(this.id+'_connectivityNoH_include').checked = use.connectivityNoH!==undefined;
		document.getElementById(this.id+'_connectivityNoH_value').value = use.connectivityNoH?use.outputRange(use.connectivityNoH.v):'';
		document.getElementById(this.id+'_connectivityNoH_not').checked = use.connectivityNoH!==undefined&&use.connectivityNoH.not;
		document.getElementById(this.id+'_chirality_include').checked = use.chirality!==undefined;
		if(!use.chirality || use.chirality.v === 'R'){
			this.stereoButtonR.select();
		}else if(!use.chirality || use.chirality.v === 'S'){
			this.stereoButtonS.select();
		}else if(!use.chirality || use.chirality.v === 'A'){
			this.stereoButtonA.select();
		}
		document.getElementById(this.id+'_chirality_not').checked = use.chirality!==undefined&&use.chirality.not;
	};
	_.getContentSource = function() {
		this.stereoButtonA = new desktop.TextButton(this.id+'_stereoButtonA', 'Any (A)');
		this.stereoButtonR = new desktop.TextButton(this.id+'_stereoButtonR', 'Rectus (R)');
		this.stereoButtonS = new desktop.TextButton(this.id+'_stereoButtonS', 'Sinestra (S)');
		this.stereoButtonSet = new desktop.ButtonSet(this.id+'_stereoSet');
		this.stereoButtonSet.buttons.push(this.stereoButtonA, this.stereoButtonR, this.stereoButtonS);
		return `
			<div style="font-size:12px;text-align:center;height:300px;overflow-y:scroll;" id="${this.id}">
				<p>Set the following form to define the atom query.</p>
				<table>
					${makeRow(this.id+'_elements', 'Identity', undefined, 'Select any number of elements and/or wildcards.', '<canvas class="ChemDoodleWebComponent" id="'+this.id+'_pt"></canvas><br><input type="checkbox" id="'+this.id+'_el_any">Any (a)<input type="checkbox" id="'+this.id+'_el_noth">!Hydrogen (r)<input type="checkbox" id="'+this.id+'_el_het">Heteroatom (q)<br><input type="checkbox" id="'+this.id+'_el_hal">Halide (x)<input type="checkbox" id="'+this.id+'_el_met">Metal (m)')}
					<tr><td colspan="4"><hr style="width:100%"></td></tr>
					${makeRow(this.id+'_aromatic', 'Aromatic', 'A', 'Specifies that the matched atom should be aromatic. Use the NOT modifier to specify not aromatic or anti-aromatic.')}
					${makeRow(this.id+'_charge', 'Charge', 'C', 'Defines the allowed charge for the matched atom.', 1)}
					${makeRow(this.id+'_hydrogens', 'Hydrogens', 'H', 'Defines the total number of hydrogens attached to the atom, implicit and explicit.', 1)}
					${makeRow(this.id+'_ringCount', 'Ring Count', 'R', 'Defines the total number of rings this atom is a member of. (SSSR)', 1)}
					${makeRow(this.id+'_saturation', 'Saturation', 'S', 'Specifies that the matched atom should be saturated. Use the NOT modifier to specify unsaturation.')}
					${makeRow(this.id+'_connectivity', 'Connectivity', 'X', 'Defines the total number of bonds connected to the atom, including all hydrogens.', 1)}
					${makeRow(this.id+'_connectivityNoH', 'Connectivity (No H)', 'x', 'Defines the total number of bonds connected to the atom, excluding all hydrogens.', 1)}
					${makeRow(this.id+'_chirality', 'Chirality', '@', 'Defines the stereochemical configuration of the atom.', this.stereoButtonSet.getSource())}
				</table>
			</div>
		`;
	};
	_.innersetup = function() {
		this.periodicTable = new c.PeriodicTableCanvas(this.id + '_pt', 16);
		this.periodicTable.allowMultipleSelections = true;
		this.periodicTable.drawCell = function(ctx, styles, cell){
		    //if hovered, then show a red background
		    if(this.hovered===cell){
		      ctx.fillStyle='blue';
		      ctx.fillRect(cell.x, cell.y, cell.dimension, cell.dimension);
		    }else if(cell.selected){
			    ctx.fillStyle='#c10000';
			    ctx.fillRect(cell.x, cell.y, cell.dimension, cell.dimension);
			}
		    //draw the main cells
		    ctx.strokeStyle='black';
		    ctx.strokeRect(cell.x, cell.y, cell.dimension, cell.dimension);
		    ctx.font = '10px Sans-serif';
		    ctx.fillStyle='black';
		    ctx.textAlign = 'center';
		    ctx.textBaseline = 'middle';
		    ctx.fillText(cell.element.symbol, cell.x+cell.dimension/2, cell.y+cell.dimension/2);
		};
		this.periodicTable.repaint();
		this.stereoButtonSet.setup([]);
	};
	_.removeQuery = function(){
		this.webComponent.historyManager.pushUndo(new actions.ChangeQueryAction(this.a));
		this.close();
	};
	_.setNewQuery = function(){
		let query = new structures.Query(structures.Query.TYPE_ATOM);
		
		if(document.getElementById(this.id+'_el_any').checked){
			query.elements.v.push('a');
		}
		if(document.getElementById(this.id+'_el_noth').checked){
			query.elements.v.push('r');
		}
		if(document.getElementById(this.id+'_el_het').checked){
			query.elements.v.push('q');
		}
		if(document.getElementById(this.id+'_el_hal').checked){
			query.elements.v.push('x');
		}
		if(document.getElementById(this.id+'_el_met').checked){
			query.elements.v.push('m');
		}
		for(let i = 0, ii = this.periodicTable.cells.length; i<ii; i++){
			if(this.periodicTable.cells[i].selected){
				query.elements.v.push(this.periodicTable.cells[i].element.symbol);
			}
		}
		if(document.getElementById(this.id+'_elements_not').checked){
			query.elements.not = true;
		}
		
		if(document.getElementById(this.id+'_aromatic_include').checked){
			query.aromatic = {v:true,not:document.getElementById(this.id+'_aromatic_not').checked};
		}
		if(document.getElementById(this.id+'_charge_include').checked){
			query.charge = {v:query.parseRange(document.getElementById(this.id+'_charge_value').value),not:document.getElementById(this.id+'_charge_not').checked};
		}
		if(document.getElementById(this.id+'_hydrogens_include').checked){
			query.hydrogens = {v:query.parseRange(document.getElementById(this.id+'_hydrogens_value').value),not:document.getElementById(this.id+'_hydrogens_not').checked};
		}
		if(document.getElementById(this.id+'_ringCount_include').checked){
			query.ringCount = {v:query.parseRange(document.getElementById(this.id+'_ringCount_value').value),not:document.getElementById(this.id+'_ringCount_not').checked};
		}
		if(document.getElementById(this.id+'_saturation_include').checked){
			query.saturation = {v:true,not:document.getElementById(this.id+'_saturation_not').checked};
		}
		if(document.getElementById(this.id+'_connectivity_include').checked){
			query.connectivity = {v:query.parseRange(document.getElementById(this.id+'_connectivity_value').value),not:document.getElementById(this.id+'_connectivity_not').checked};
		}
		if(document.getElementById(this.id+'_connectivityNoH_include').checked){
			query.connectivityNoH = {v:query.parseRange(document.getElementById(this.id+'_connectivityNoH_value').value),not:document.getElementById(this.id+'_connectivityNoH_not').checked};
		}
		if(document.getElementById(this.id+'_chirality_include').checked){
			let val = 'R';
			if(this.stereoButtonA.selected){
				val = 'A';
			}else if(this.stereoButtonS.selected){
				val = 'S';
			}
			query.chirality = {v:val,not:document.getElementById(this.id+'_chirality_not').checked};
		}
		
		this.webComponent.historyManager.pushUndo(new actions.ChangeQueryAction(this.a, query));
		this.close();
	};

})(ChemDoodle, ChemDoodle.structures, ChemDoodle.uis.actions, ChemDoodle.uis.gui.desktop, document);

(function(c, structures, actions, desktop, imageDepot, document, undefined) {
	'use strict';

	let makeRow = function(id, name, tag, description, component) {
		let sb = ['<tr>'];
		// checkbox for include
		sb.push('<td>');
		if(id.indexOf('_orders')===-1){
			sb.push('<input type="checkbox" id="');
			sb.push(id);
			sb.push('_include">');
		}
		sb.push('</td>');
		// name and tag
		sb.push('<td>');
		sb.push(name);
		if(tag){
			sb.push('<br>(<strong>');
			sb.push(tag);
			sb.push('</strong>)');
		}
		sb.push('</td>');
		// component
		sb.push('<td style="padding-left:20px;padding-right:20px;">');
		sb.push(description);
		if(component){
			sb.push('<br>');
			if(component===1){
				sb.push('<input type="text" id="');
				sb.push(id);
				sb.push('_value">');
			}else{
				sb.push(component);
			}
		}
		sb.push('</td>');
		// checkbox for not
		sb.push('<td><input type="checkbox" id="');
		sb.push(id);
		sb.push('_not"><br><strong>NOT</strong>');
		sb.push('</td>');
		// close
		sb.push('</tr>');
		return sb.join('');
	};
	
	desktop.BondQueryDialog = function(sketcher, subid) {
		desktop.Dialog.call(this, sketcher, subid, 'Bond Query');
		this.buttons = {
			'Cancel' : this.close.bind(this),
			'Remove' : this.removeQuery.bind(this),
			'Set' : this.setNewQuery.bind(this)
		};
		this.width = 520;
	};
	let _ = desktop.BondQueryDialog.prototype = new desktop.Dialog();
	_.setBond = function(b) {
		this.b = b;
		let use = b.query;
		if(!use){
			use = new structures.Query(structures.Query.TYPE_BOND);
			// default to the bond's current explicit order
			switch(b.bondOrder){
			case 0:
				use.orders.v.push('0');
				break;
			case 0.5:
				use.orders.v.push('h');
				break;
			case 1:
				use.orders.v.push('1');
				break;
			case 1.5:
				use.orders.v.push('r');
				break;
			case 2:
				use.orders.v.push('2');
				break;
			case 3:
				use.orders.v.push('3');
				break;
			}
		}
		
		this.bondTypeButton0.select(use.orders.v.indexOf('0')!==-1);
		this.bondTypeButton1.select(use.orders.v.indexOf('1')!==-1);
		this.bondTypeButton2.select(use.orders.v.indexOf('2')!==-1);
		this.bondTypeButton3.select(use.orders.v.indexOf('3')!==-1);
		this.bondTypeButton4.select(use.orders.v.indexOf('4')!==-1);
		this.bondTypeButton5.select(use.orders.v.indexOf('5')!==-1);
		this.bondTypeButton6.select(use.orders.v.indexOf('6')!==-1);
		this.bondTypeButtonH.select(use.orders.v.indexOf('h')!==-1);
		this.bondTypeButtonR.select(use.orders.v.indexOf('r')!==-1);
		this.bondTypeButtonA.select(use.orders.v.indexOf('a')!==-1);
		document.getElementById(this.id+'_orders_not').checked = use.orders.not;
		
		document.getElementById(this.id+'_aromatic_include').checked = use.aromatic!==undefined;
		document.getElementById(this.id+'_aromatic_not').checked = use.aromatic!==undefined&&use.aromatic.not;
		document.getElementById(this.id+'_ringCount_include').checked = use.ringCount!==undefined;
		document.getElementById(this.id+'_ringCount_value').value = use.ringCount?use.outputRange(use.ringCount.v):'';
		document.getElementById(this.id+'_ringCount_not').checked = use.ringCount!==undefined&&use.ringCount.not;
		document.getElementById(this.id+'_stereo_include').checked = use.stereo!==undefined;
		if(!use.stereo || use.stereo.v === 'E'){
			this.stereoButtonE.select();
		}else if(!use.stereo || use.stereo.v === 'Z'){
			this.stereoButtonZ.select();
		}else if(!use.stereo || use.stereo.v === 'A'){
			this.stereoButtonA.select();
		}
		document.getElementById(this.id+'_stereo_not').checked = use.stereo!==undefined&&use.stereo.not;
	};
	_.getContentSource = function() {
		this.bondTypeButton0 = new desktop.Button(this.id+'_bondType0', imageDepot.BOND_ZERO);
		this.bondTypeButton1 = new desktop.Button(this.id+'_bondType1', imageDepot.BOND_SINGLE);
		this.bondTypeButton2 = new desktop.Button(this.id+'_bondType2', imageDepot.BOND_DOUBLE);
		this.bondTypeButton3 = new desktop.Button(this.id+'_bondType3', imageDepot.BOND_TRIPLE);
		this.bondTypeButton4 = new desktop.Button(this.id+'_bondType4', imageDepot.BOND_QUADRUPLE);
		this.bondTypeButton5 = new desktop.Button(this.id+'_bondType5', imageDepot.BOND_QUINTUPLE);
		this.bondTypeButton6 = new desktop.Button(this.id+'_bondType6', imageDepot.BOND_SEXTUPLE);
		this.bondTypeButtonH = new desktop.Button(this.id+'_bondTypeH', imageDepot.BOND_HALF);
		this.bondTypeButtonR = new desktop.Button(this.id+'_bondTypeR', imageDepot.BOND_RESONANCE);
		this.bondTypeButtonA = new desktop.Button(this.id+'_bondTypeA', imageDepot.BOND_ANY);
		this.bondTypeButtonSet = new desktop.ButtonSet(this.id+'_bondTypeSet');
		this.bondTypeButtonSet.buttons.push(this.bondTypeButton0, this.bondTypeButton1, this.bondTypeButton2, this.bondTypeButton3, this.bondTypeButton4, this.bondTypeButton5, this.bondTypeButton6, this.bondTypeButtonH, this.bondTypeButtonR, this.bondTypeButtonA);
	
		this.stereoButtonA = new desktop.TextButton(this.id+'_stereoButtonA', 'Any (A)');
		this.stereoButtonE = new desktop.TextButton(this.id+'_stereoButtonR', 'Entgegen (E)');
		this.stereoButtonZ = new desktop.TextButton(this.id+'_stereoButtonS', 'Zusammen (Z)');
		this.stereoButtonSet = new desktop.ButtonSet(this.id+'_stereoSet');
		this.stereoButtonSet.buttons.push(this.stereoButtonA, this.stereoButtonE, this.stereoButtonZ);
		return `
			<div style="font-size:12px;text-align:center;height:300px;overflow-y:scroll;" id="${this.id}">
				<p>Set the following form to define the bond query.</p>
				<table>
					${makeRow(this.id+'_orders', 'Identity', undefined, 'Select any number of bond types.', this.bondTypeButtonSet.getSource())}
					<tr><td colspan="4"><hr style="width:100%"></td></tr>
					${makeRow(this.id+'_aromatic', 'Aromatic', 'A', 'Specifies that the matched bond should be aromatic. Use the NOT modifier to specify not aromatic or anti-aromatic.')}
					${makeRow(this.id+'_ringCount', 'Ring Count', 'R', 'Defines the total number of rings this bond is a member of. (SSSR)', 1)}
					${makeRow(this.id+'_stereo', 'Stereochemistry', '@', 'Defines the stereochemical configuration of the bond.', this.stereoButtonSet.getSource())}
				</table>
			</div>
		`;
	};
	_.innersetup = function() {
		this.bondTypeButtonSet.setup();
		this.stereoButtonSet.setup([]);
	};
	_.removeQuery = function(){
		this.webComponent.historyManager.pushUndo(new actions.ChangeQueryAction(this.b));
		this.close();
	};
	_.setNewQuery = function(){
		let query = new structures.Query(structures.Query.TYPE_BOND);

		if(this.bondTypeButton0.selected){
			query.orders.v.push('0');
		}
		if(this.bondTypeButton1.selected){
			query.orders.v.push('1');
		}
		if(this.bondTypeButton2.selected){
			query.orders.v.push('2');
		}
		if(this.bondTypeButton3.selected){
			query.orders.v.push('3');
		}
		if(this.bondTypeButton4.selected){
			query.orders.v.push('4');
		}
		if(this.bondTypeButton5.selected){
			query.orders.v.push('5');
		}
		if(this.bondTypeButton6.selected){
			query.orders.v.push('6');
		}
		if(this.bondTypeButtonH.selected){
			query.orders.v.push('h');
		}
		if(this.bondTypeButtonR.selected){
			query.orders.v.push('r');
		}
		if(this.bondTypeButtonA.selected){
			query.orders.v.push('a');
		}
		if(document.getElementById(this.id+'_orders_not').checked){
			query.orders.not = true;
		}
		
		if(document.getElementById(this.id+'_aromatic_include').checked){
			query.aromatic = {v:true,not:document.getElementById(this.id+'_aromatic_not').checked};
		}
		if(document.getElementById(this.id+'_ringCount_include').checked){
			query.ringCount = {v:query.parseRange(document.getElementById(this.id+'_ringCount_value').value),not:document.getElementById(this.id+'_ringCount_not').checked};
		}
		if(document.getElementById(this.id+'_stereo_include').checked){
			let val = 'E';
			if(this.stereoButtonA.selected){
				val = 'A';
			}else if(this.stereoButtonZ.selected){
				val = 'Z';
			}
			query.stereo = {v:val,not:document.getElementById(this.id+'_stereo_not').checked};
		}
		
		this.webComponent.historyManager.pushUndo(new actions.ChangeQueryAction(this.b, query));
		this.close();
	};

})(ChemDoodle, ChemDoodle.structures, ChemDoodle.uis.actions, ChemDoodle.uis.gui.desktop, ChemDoodle.uis.gui.imageDepot, document);

(function(c, actions, desktop, undefined) {
	'use strict';
	desktop.MolGrabberDialog = function(sketcher, subid) {
		desktop.Dialog.call(this, sketcher, subid, 'MolGrabber');
		this.width = 250;
		this.buttons = {
			'Load' : this.load.bind(this)
		};
	};
	let _ = desktop.MolGrabberDialog.prototype = new desktop.Dialog();
	_.getContentSource = function(){
		return `
			<div class="reset-all" style="font-size:12px;text-align:center;" id="${this.id}">
				${this.message?'<p>'+this.message+'</p>':''}
				<canvas class="ChemDoodleWebComponent" id="${this.id}_mg"></canvas>
				${this.afterMessage?'<p>'+this.afterMessage+'</p>':''}
			</div>
		`;
	};
	_.innersetup = function() {
		this.canvas = new c.MolGrabberCanvas(this.id + '_mg', 200, 200);
		this.canvas.styles.backgroundColor = '#fff';
		this.canvas.repaint();
	};
	_.load = function() {
		const newMol = this.canvas.molecules[0];
		if (newMol && newMol.atoms.length > 0) {
			this.close();
			if (this.webComponent.oneMolecule) {
				if (newMol !== this.webComponent.molecule) {
					this.webComponent.historyManager.pushUndo(new actions.SwitchMoleculeAction(this.webComponent, newMol));
				}
			} else {
				this.webComponent.historyManager.pushUndo(new actions.AddContentAction(this.webComponent, this.canvas.molecules, this.canvas.shapes));
				this.webComponent.toolbarManager.buttonLasso.select();
				this.webComponent.toolbarManager.buttonLasso.getElement().click();
				let as = [];
				for(let i = 0, ii = this.canvas.molecules.length; i<ii; i++){
					as = as.concat(this.canvas.molecules[i].atoms);
				}
				this.webComponent.lasso.select(as, this.canvas.shapes);
			}
		}else{
			alert('After entering a search term, press the "Show Molecule" button to show it before loading. To close this dialog, press the "X" button to the top-right.');
		}
	}

})(ChemDoodle, ChemDoodle.uis.actions, ChemDoodle.uis.gui.desktop);

(function(c, desktop, document, undefined) {
	'use strict';
	desktop.PeriodicTableDialog = function(sketcher, subid) {
		desktop.Dialog.call(this, sketcher, subid, 'Periodic Table');
	};
	let _ = desktop.PeriodicTableDialog.prototype = new desktop.Dialog();
	_.getContentSource = function(){
		return `
			<div style="text-align:center;" id="${this.id}">
				<canvas class="ChemDoodleWebComponents" id="${this.id}_pt"></canvas>
			</div>
		`;
	};
	_.innersetup = function() {
		this.canvas = new ChemDoodle.PeriodicTableCanvas(this.id + '_pt', 20);
		// set default to oxygen
		this.canvas.selected = this.canvas.cells[7];
		this.canvas.repaint();
		let self = this;
		this.canvas.click = function(evt) {
			if (this.hovered) {
				this.selected = this.hovered;
				let e = this.getHoveredElement();
				self.webComponent.stateManager.setState(self.webComponent.stateManager.STATE_LABEL);
				self.webComponent.stateManager.STATE_LABEL.label = e.symbol;
				if(self.webComponent.floatDrawTools){
					self.webComponent.toolbarManager.labelTray.open(self.webComponent.toolbarManager.buttonLabelPT);
				}else{
					self.webComponent.toolbarManager.buttonLabel.absorb(self.webComponent.toolbarManager.buttonLabelPT);
				}
				self.webComponent.toolbarManager.buttonLabel.select();
				this.repaint();
			}
		};
	};

})(ChemDoodle, ChemDoodle.uis.gui.desktop, document);

(function(c, desktop, document, undefined) {
	'use strict';
	desktop.SaveFileDialog = function(sketcher, subid) {
		desktop.Dialog.call(this, sketcher, subid, 'Save File');
		this.width = 435;
	};
	let _ = desktop.SaveFileDialog.prototype = new desktop.Dialog();
	_.clear = function() {
		document.getElementById(this.id + '_link').innerHTML = 'The file link will appear here.';
	};
	_.getContentSource = function(){
		return `
			<div style="font-size:12px;" id="${this.id}">
				<p>Select the file format to save your structure to and click on the <strong>Generate File</strong> button.</p>
				<nobr>
					<select id="${this.id}_select" style="user-select:none;">
						<option value="sk2">ACD/ChemSketch Document {sk2}
						<option value="ros">Beilstein ROSDAL {ros}
						<option value="cdx">Cambridgesoft ChemDraw Exchange {cdx}
						<option value="cdxml">Cambridgesoft ChemDraw XML {cdxml}
						<option value="mrv">ChemAxon Marvin Document {mrv}
						<option value="cml">Chemical Markup Language {cml}
						<option value="smiles">Daylight SMILES {smiles}
						<option value="icl" selected>iChemLabs ChemDoodle Document {icl}
						<option value="inchi">IUPAC InChI {inchi}
						<option value="jdx">IUPAC JCAMP-DX {jdx}
						<option value="skc">MDL ISIS Sketch {skc}
						<option value="tgf">MDL ISIS Sketch Transportable Graphics File {tgf}
						<option value="mol">MDL MOLFile {mol}
						<!--<option value="rdf">MDL RDFile {rdf}-->
						<!--<option value="rxn">MDL RXNFile {rxn}-->
						<option value="sdf">MDL SDFile {sdf}
						<option value="jme">Molinspiration JME String {jme}
						<option value="pdb">RCSB Protein Data Bank {pdb}
						<option value="mmd">Schr&ouml;dinger Macromodel {mmd}
						<option value="mae">Schr&ouml;dinger Maestro {mae}
						<option value="smd">Standard Molecular Data {smd}
						<option value="mol2">Tripos Mol2 {mol2}
						<option value="sln">Tripos SYBYL SLN {sln}
						<option value="xyz">XYZ {xyz}
					</select>
					<button type="button" id="${this.id}_button" class="reset-all-button">Generate File</button>
				</nobr>
				<p>When the file is written, a link will appear in the red-bordered box below, right-click on the link and choose the browser\'s <strong>Save As...</strong> function to save the file to your computer.</p>
				<div style="width:100%;height:30px;border:1px solid #c10000;text-align:center;" id="${this.id}_link">The file link will appear here.</div>
				<p><a href="http://www.chemdoodle.com" target="_blank">How do I use these files?</a></p>
			</div>
		`;
	};
	_.innersetup = function() {
		let self = this;
		document.getElementById(this.id + '_button').addEventListener('click', (e) => {
			const linkElement = document.getElementById(this.id + '_link');
			linkElement.innerHTML = 'Generating file, please wait...';
			ChemDoodle.iChemLabs.saveFile(self.sketcher.oneMolecule ? self.sketcher.molecules[0] : self.sketcher.lasso.getFirstMolecule(), {
				ext : document.getElementById(self.id + '_select').value
			}, function(link) {
				linkElement.innerHTML = `<a href="${link}"><span style="text-decoration:underline;">File is generated. Right-click on this link and Save As...</span></a>`;
			});
		});
	};

})(ChemDoodle, ChemDoodle.uis.gui.desktop, document);

(function(c, io, desktop, templateDepot, m, document, JSON, localStorage, undefined) {
	'use strict';
	
	let INTERPRETER = new io.JSONInterpreter();
	let allowedRegex = /[^A-z0-9]|\[|\]/g;
	
	function makeTemplateImageInteractive(id, condensedName, templateDialog){
		const img = document.getElementById(`${id}_${condensedName}`);
		img.addEventListener('click', () => {
			templateDialog.loadTemplate(parseInt(img.getAttribute('g')), parseInt(img.getAttribute('t')), true);
		});
		img.addEventListener('mouseover', () => {
			img.style.border = '1px solid '+templateDialog.webComponent.styles.colorHover;
			img.style.margin = '-1px';
		});
		img.addEventListener('mouseout', () => {
		 	img.style.border = 'none';
			img.style.margin = '0px';
		});
	};
	
	desktop.TemplateDialog = function(sketcher, subid) {
		desktop.Dialog.call(this, sketcher, subid, 'Templates');
		this.width = 260;
	};
	let _ = desktop.TemplateDialog.prototype = new desktop.Dialog();
	_.getContentSource = function() {
		let sb = [];
		sb.push(`
			<div style="font-size:12px;align-items:center;display:flex;flex-direction:column;" id="${this.id}">
				<canvas class="ChemDoodleWebComponent" id="${this.id}_buffer" style="display:none;"></canvas>
				<canvas class="ChemDoodleWebComponent" id="${this.id}_attachment"></canvas>
				<div style="margin-top:5px;">
					<nobr>
						<select id="${this.id}_select" style="max-width:150px;user-select:none;">
		`);
		for(let i = 0, ii = templateDepot.length; i<ii; i++){
			let group = templateDepot[i];
			sb.push('<option value="', group.name, '">', group.name, '</option>');
		}
		sb.push(`
						</select>
						<button type="button" id="${this.id}_button_add" class="reset-all-button">Add Template</button>
					</nobr>
				</div>
		`);
		// have to include height for Safari...
		sb.push(`
				<div id="${this.id}_scroll" style="width:100%;height:150px;flex-grow:1;overflow-y:scroll;overflow-x:hidden;background:#eee;padding-right:5px;padding-bottom:5px;">
		`);
		for(let i = 0, ii = templateDepot.length; i<ii; i++){
			let group = templateDepot[i];
			group.condensedName = group.name.replace(allowedRegex, '');
			sb.push('<div style="display:flex;flex-wrap:wrap;justify-content:center;" id="', this.id, '_', group.condensedName, '_panel"></div>');
		}
		sb.push(`
				</div>
			</div>
		`);
		return sb.join('');
	};
	_.innersetup = function() {
		let self = this;
		this.buffer = new c.ViewerCanvas(this.id + '_buffer', 100, 100);
		this.bufferElement = document.getElementById(this.buffer.id);
		this.canvas = new c.ViewerCanvas(this.id + '_attachment', 250, 250);
		this.canvas.mouseout = function(e){
			if(this.molecules.length!==0){
				for(let i = 0, ii = this.molecules[0].atoms.length; i<ii; i++){
					this.molecules[0].atoms[i].isHover = false;
				}
				this.repaint();
			}
		};
		this.canvas.touchend = this.canvas.mouseout;
		this.canvas.mousemove = function(e){
			if(this.molecules.length!==0){
				let closest=undefined;
				e.p.x = this.width / 2 + (e.p.x - this.width / 2) / this.styles.scale;
				e.p.y = this.height / 2 + (e.p.y - this.height / 2) / this.styles.scale;
				for(let i = 0, ii = this.molecules[0].atoms.length; i<ii; i++){
					let a = this.molecules[0].atoms[i];
					a.isHover = false;
					if(closest===undefined || e.p.distance(a)<e.p.distance(closest)){
						closest = a;
					}
				}
				if(e.p.distance(closest)<10){
					closest.isHover = true;
				}
				this.repaint();
			}
		};
		this.canvas.mousedown = function(e){
			if(this.molecules.length!==0){
				let cont = false;
				for(let i = 0, ii = this.molecules[0].atoms.length; i<ii; i++){
					let a = this.molecules[0].atoms[i];
					if(a.isHover){
						cont = true;
						break;
					}
				}
				// if no atom is hovered, then don't continue
				if(cont){
					for(let i = 0, ii = this.molecules[0].atoms.length; i<ii; i++){
						let a = this.molecules[0].atoms[i];
						a.isSelected = false;
						if(a.isHover){
							a.isSelected = true;
							a.isHover = false;
							self.webComponent.stateManager.STATE_NEW_TEMPLATE.attachPos = i;
							self.webComponent.toolbarManager.buttonTemplate.select();
							self.webComponent.toolbarManager.buttonTemplate.getElement().click();
						}
					}
				}
				this.repaint();
			}
		};
		this.canvas.touchstart = function(e){
			self.canvas.mousemove(e);
			self.canvas.mousedown(e);
		};
		this.canvas.drawChildExtras = function(ctx, styles){
			ctx.strokeStyle = self.webComponent.styles.colorSelect;
			ctx.fillStyle = self.webComponent.styles.colorSelect;
			ctx.beginPath();
			ctx.arc(8, 8, 7, 0, m.PI * 2, false);
			ctx.stroke();
			ctx.textAlign = 'left';
			ctx.textBaseline = 'middle';
			ctx.fillText('Substitution Point', 18, 8);
			ctx.save();
			ctx.translate(this.width / 2, this.height / 2);
			ctx.rotate(styles.rotateAngle);
			ctx.scale(styles.scale, styles.scale);
			ctx.translate(-this.width / 2, -this.height / 2);
			if(this.molecules.length!==0){
				for(let i = 0, ii = this.molecules[0].atoms.length; i<ii; i++){
					this.molecules[0].atoms[i].drawDecorations(ctx, self.webComponent.styles);
				}
			}
			ctx.restore();
		};
		
		const select = document.getElementById(this.id+'_select');
		select.addEventListener('change', () => {
			const index = select.selectedIndex;
			for(let i = 0, ii = templateDepot.length; i<ii; i++){
				let group = templateDepot[i];
				document.getElementById(`${this.id}_${group.condensedName}_panel`).style.display = 'none';
			}
			document.getElementById(`${this.id}_${templateDepot[index].condensedName}_panel`).style.display = 'flex';
			document.getElementById(`${this.id}_scroll`).scrollTop = 0;
			this.loadTemplate(index, 0, true);
		});
		
		document.getElementById(this.id+'_button_add').addEventListener('click', () => {
			if(this.webComponent.lasso.atoms.length===0){
				alert('Please select a structure to define a template.');
			}else{
				let cont = true;
				if(this.webComponent.lasso.atoms.length>1){
					let mol = this.webComponent.lasso.getFirstMolecule();
					for(let i = 1, ii = this.webComponent.lasso.atoms.length; i<ii; i++){
						if(mol!==this.webComponent.getMoleculeByAtom(this.webComponent.lasso.atoms[i])){
							cont = false;
							alert('Templates may only be defined of a single discrete structure.');
							break;
						}
					}
				}
				if(cont){
					let name = prompt("Please enter the template name:", "My template");
					if(name!==null){
						let userTemplates = templateDepot[templateDepot.length-1];
						let jsonm = INTERPRETER.molTo(this.webComponent.lasso.getFirstMolecule());
						let mol = INTERPRETER.molFrom(jsonm);
						let panel = document.getElementById(`${this.id}_${userTemplates.condensedName}_panel`);
						if (userTemplates.templates.length === 0) {
							panel.innerHTML = '';
						}
						let t = {name:name, data:jsonm};
						mol.scaleToAverageBondLength(this.webComponent.styles.bondLength_2D);
						this.buffer.loadMolecule(mol);
						t.img = this.bufferElement.toDataURL('image/png');
						t.condensedName = t.name.replace(allowedRegex, '');
						
						const newDiv = document.createElement('div');
						newDiv.style.marginLeft = '5px';
						newDiv.style.marginTop = '5px';
						newDiv.style.display = 'inline-block';
						newDiv.innerHTML = `<center><img src="${t.img}" id="${this.id}_${t.condensedName}" g="${templateDepot.length - 1}" t="${userTemplates.templates.length}" class="reset-all" style="width:100px;height:100px;" /><br>${t.name}</center>`;
						panel.appendChild(newDiv);
						
						makeTemplateImageInteractive(this.id, t.condensedName, this);
						userTemplates.templates.push(t);
						// IE/Edge doesn't allow localStorage from local files
						if(localStorage){
							localStorage.setItem('chemdoodle_user_templates', JSON.stringify(templateDepot[templateDepot.length-1].templates));
						}
					}
				}
			}
		});
	};
	_.loadTemplate = function(g, t, changeState){
		let template = templateDepot[g].templates[t];
		if(template){
			let loading = INTERPRETER.molFrom(template.data);
			loading.scaleToAverageBondLength(this.webComponent.styles.bondLength_2D);
			let first = -1;
			let min = Infinity;
			for (let i = 0, ii = loading.atoms.length; i<ii; i++) {
				let a = loading.atoms[i];
				if (a.label==='C' && a.x < min) {
					first = i;
					min = a.x;
				}
			}
			if (first === -1) {
				first = 0;
			}
			loading.atoms[first].isSelected = true;
			this.canvas.loadMolecule(loading);
			this.webComponent.stateManager.STATE_NEW_TEMPLATE.template = template.data;
			this.webComponent.stateManager.STATE_NEW_TEMPLATE.attachPos = first;
			if(changeState){
				this.webComponent.toolbarManager.buttonTemplate.select();
				this.webComponent.toolbarManager.buttonTemplate.getElement().click();
			}
		}
	};
	_.onFirstOpen = function(){
		this.populate();
	};
	_.populate = function() {
		// copy over styles from the sketcher
		this.canvas.styles = { ...this.webComponent.styles };
		this.canvas.styles.atoms_implicitHydrogens_2D = false;
		this.buffer.styles = { ...this.webComponent.styles };
		this.buffer.styles.atoms_implicitHydrogens_2D = false;
		// make template panels
		for(let i = 0, ii = templateDepot.length; i<ii; i++){
			let group = templateDepot[i];
			const panel = document.getElementById(`${this.id}_${group.condensedName}_panel`);
    		if(group.templates.length===0){
	    		const noTemplatesDiv = document.createElement('div');
				noTemplatesDiv.style.margin = '5px';
				noTemplatesDiv.textContent = 'There are no templates in this group.';
				panel.appendChild(noTemplatesDiv);
			}else{
				for(let j = 0, jj = group.templates.length; j<jj; j++){
					let t = group.templates[j];
					let mol = INTERPRETER.molFrom(t.data);
					mol.scaleToAverageBondLength(this.webComponent.styles.bondLength_2D);
					this.buffer.loadMolecule(mol);
					t.img = this.bufferElement.toDataURL('image/png');
					t.condensedName = t.name.replace(allowedRegex, '');
					
					const templateDiv = document.createElement('div');
					templateDiv.style.marginLeft = '5px';
					templateDiv.style.marginTop = '5px';
					templateDiv.style.display = 'inline-block';
					templateDiv.innerHTML = `<center><img src="${t.img}" id="${this.id}_${t.condensedName}" g="${i}" t="${j}" class="reset-all" style="width:100px;height:100px;border-radius:6px;" /><br>${t.name}</center>`;
					panel.appendChild(templateDiv);
					
					makeTemplateImageInteractive(this.id, t.condensedName, this);
				}
			}
			if(i!==0){
				panel.style.display = 'none';
			}
		}
		if (templateDepot.length !== 0) {
			document.getElementById(`${this.id}_${templateDepot[0].condensedName}_panel`).style.display = 'flex';
			this.loadTemplate(0, 0, false);
		}
	};

})(ChemDoodle, ChemDoodle.io, ChemDoodle.uis.gui.desktop, ChemDoodle.uis.gui.templateDepot, Math, document, JSON, localStorage);

(function(c, actions, gui, desktop, undefined) {
	'use strict';
	gui.DialogManager = function(sketcher) {
		const self = this;
	
		if (sketcher.useServices) {
			this.saveDialog = new desktop.SaveFileDialog(sketcher, '_save_dialog');
		} else {
			this.saveDialog = new desktop.Dialog(sketcher, '_save_dialog', 'Save Molecule');
			this.saveDialog.message = 'Copy and paste the content of the textarea into a file and save it with the extension <strong>.mol</strong>.';
			this.saveDialog.includeTextArea = true;
			// You must keep this link displayed at all times to abide by the
			// license
			// Contact us for permission to remove it,
			// http://www.ichemlabs.com/contact-us
			this.saveDialog.afterMessage = '<a href="http://www.chemdoodle.com" target="_blank">How do I use MOLFiles?</a>';
		}
		this.saveDialog.setup();

		this.openPopup = new desktop.Popover(sketcher, sketcher.id+'_open_popover');
		this.openPopup.getContentSource = function(){
			let sb = ['<div style="width:320px;">'];
			//sb.push('<div width="100%">Open chemical file from your computer:</div><br><form action="demo_form.asp">'];
  			//sb.push('<input type="file" name="file" accept="image/*">');
  			//sb.push('<input onclick="alert(\'include your form code here.\');" type="button" value="Open" /*type="submit"*/>');
			//sb.push('</form>');
			//sb.push('<hr>
			// You must keep this link displayed at all times to abide by the
			// license
			// Contact us for permission to remove it,
			// http://www.ichemlabs.com/contact-us
			if(sketcher instanceof ChemDoodle.EditorCanvas3D){
				sb.push('<div width="100%">Paste <em>MOL</em> or <em>ChemDoodle JSON</em> text and press the <strong>Load</strong> button.<br><br><center><a href="http://www.chemdoodle.com/3d" target="_blank">Where do I get MOL or ChemDoodle JSON?</a></center><br></div>');
			}else{
				sb.push('<div width="100%">Paste <em>MOL</em>, <em>RXN</em> or <em>ChemDoodle JSON</em> text and press the <strong>Load</strong> button.<br><br><center><a href="http://www.chemdoodle.com" target="_blank">Where do I get MOL, RXN or ChemDoodle JSON?</a></center><br></div>');
			}
			sb.push('<textarea rows="12" id="'+sketcher.id+'_open_text" style="width:100%;"></textarea>');
			sb.push('<br><button type="button" class="reset-all-button" style="margin-left:270px;" id="'+sketcher.id+'_open_load">Load</button></div>');
			return sb.join('');
		};
		this.openPopup.setupContent = function(){
			document.getElementById(sketcher.id+'_open_load').addEventListener('click', function(){
				self.openPopup.close();
				let s = document.getElementById(sketcher.id+'_open_text').value;
				let newContent;
				if (s.indexOf('v2000') !== -1 || s.indexOf('V2000') !== -1 || s.indexOf('v3000') !== -1 || s.indexOf('V3000') !== -1) {
					if(s.startsWith('$RXN')){
						newContent = c.readRXN(s);
					}else{
						newContent = {
							molecules : [ c.readMOL(s) ],
							shapes : []
						};
					}
				} else if (s.charAt(0) === '{') {
					newContent = c.readJSON(s);
				}
				if (sketcher.oneMolecule && newContent && newContent.molecules.length > 0 && newContent.molecules[0].atoms.length > 0) {
					sketcher.historyManager.pushUndo(new actions.SwitchMoleculeAction(sketcher, newContent.molecules[0]));
				} else if (!sketcher.oneMolecule && newContent && (newContent.molecules.length > 0 || newContent.shapes.length > 0)) {
					if(sketcher.lasso){
						sketcher.lasso.empty();
					}
					sketcher.historyManager.pushUndo(new actions.SwitchContentAction(sketcher, newContent.molecules, newContent.shapes));
				} else {
					alert('No chemical content was recognized.');
				}
			});
		};
		this.openPopup.setup();

		(this.enhancedStereoPopup = new desktop.EnhancedStereoPopover(sketcher, '_enhanced_stereo_popover')).setup();

		(this.implicitHydrogenPopup = new desktop.ImplicitHydrogenPopover(sketcher, '_implicit_hydrogen_popover')).setup();

		(this.isotopePopup = new desktop.IsotopePopover(sketcher, '_isotope_popover')).setup();

		(this.atomQueryDialog = new desktop.AtomQueryDialog(sketcher, '_atom_query_dialog')).setup();

		(this.bondQueryDialog = new desktop.BondQueryDialog(sketcher, '_bond_query_dialog')).setup();

		(this.templateDialog = new desktop.TemplateDialog(sketcher, '_templates_dialog')).setup();

		(this.searchDialog = new desktop.MolGrabberDialog(sketcher, '_search_dialog')).setup();

		if (sketcher.setupScene) {
			(this.stylesDialog = new desktop.StylesDialog(sketcher, '_styles_dialog')).setup();
		}

		(this.periodicTableDialog = new desktop.PeriodicTableDialog(sketcher, '_periodicTable_dialog')).setup();

		this.calculateDialog = new desktop.Dialog(sketcher, '_calculate_dialog', 'Calculations');
		this.calculateDialog.includeTextArea = true;
		// You must keep this link displayed at all times to abide by the license
		// Contact us for permission to remove it,
		// http://www.ichemlabs.com/contact-us
		this.calculateDialog.afterMessage = '<a href="http://www.chemdoodle.com" target="_blank">Want more calculations?</a>';
		this.calculateDialog.setup();

		if(this.makeOtherDialogs){
			this.makeOtherDialogs(sketcher);
		}
	};

})(ChemDoodle, ChemDoodle.uis.actions, ChemDoodle.uis.gui, ChemDoodle.uis.gui.desktop);
(function(desktop, FloatingUIDOM, components, document, window, undefined) {
	'use strict';
	desktop.Popover = function(sketcher, id, free, onclose) {
		desktop._Component.call(this, id);
		this.sketcher = sketcher;
		this.free = free;
		this.onclose = onclose;
	};
	let _ = desktop.Popover.prototype = new desktop._Component();
	_.getSource = function() {
		let roundedCorners = 'border-bottom-left-radius:5px;border-bottom-right-radius:5px;border-top-color:black;';
		if(this.free){
			// if free, round all edges
			roundedCorners = 'border-radius:5px;';
		}
		return `
			<div id="${this.id}" class="reset-all" style="display:none;user-select:none;position:absolute;z-index:10;border:1px #C1C1C1 solid;background:#F5F5F5;padding:5px;${roundedCorners}">
				${this.getContentSource()}
			</div>
		`;
	};
	_.setup = function() {
		const sketcherElement = document.getElementById(this.sketcher.id);
		if (sketcherElement) {
			sketcherElement.insertAdjacentHTML('beforebegin', this.getSource());
		} else {
			document.writeln(this.getSource());
		}
		if(this.setupContent){
			this.setupContent();
		}
	};
	_.show = function(e){
		if(this.sketcher.modal){
			// apparently there is already another popover up, this shouldn't happen
			return false;
		}
		this.sketcher.modal = this;
		this.sketcher.doEventDefault = true;
		let element = this.getElement();
		let self = this;
		if(this.free){
			// center on top of the mouse position in the viewport
			const viewportReference = {
			  getBoundingClientRect: () => ({
			      x: event.clientX,
			      y: event.clientY,
			      width: 0,
			      height: 0,
			      top: event.clientY,
			      right: event.clientX,
			      bottom: event.clientY,
			      left: event.clientX,
			    }),
			    contextElement: document.documentElement || document.body,
			};
			FloatingUIDOM.computePosition(viewportReference, element, {
			  placement: 'top-center',
			  middleware: [
			    FloatingUIDOM.offset(0),
			    FloatingUIDOM.flip(),
			    FloatingUIDOM.shift(),
			    {
					name: 'centerAndAlignBottomToInternalPoint',
					fn({ rects, placement }) {
						// Calculate the desired x-coordinate for centering over internalX
						const floatingX = rects.reference.x - rects.floating.width / 2;
						
						// Calculate the desired y-coordinate to align the bottom of floating with internalY
						let floatingY = rects.reference.y;
						if (placement.startsWith('top')) {
							// flipped
							floatingY -= rects.floating.height;
						}
						
						return {
							x: floatingX,
							y: floatingY,
						};
					},
			     },
			  ]
			}).then(({x, y}) => {
			  Object.assign(element.style, {
			    left: `${x}px`,
			    top: `${y}px`,
			  });
			});
			components.fadeIn(element, 200);
		}else{
			// position centered over the sketcher window, tops touching
		    FloatingUIDOM.computePosition(document.getElementById(this.sketcher.id), element, {
			  placement: 'top-center',
			  middleware: [
			    FloatingUIDOM.offset(0),
			    FloatingUIDOM.flip(),
			    FloatingUIDOM.shift(),
			    {
		          name: 'centerTopOverlap',
			      fn({ rects, placement }) {
			          const { reference, floating } = rects;
			
			          // Calculate the horizontal center of the reference element
			          const referenceCenter = reference.x + reference.width / 2;
			
			          // Calculate the desired x-coordinate for the floating element
			          const floatingX = referenceCenter - floating.width / 2;
			
			          return {
			            x: floatingX,
			            y: reference.y // Align the top of the floating element with the top of the reference
			          };
			      },
		        }
			  ]
			}).then(({x, y}) => {
			  Object.assign(element.style, {
			    left: `${x}px`,
			    top: `${y}px`,
			  });
			});
			components.slideDown(element, 400);
		}
		return false;
	};
	_.close = function(cancel){
		let component = this.getElement();
		if(this.free){
			component.style.display = 'none';
		}else{
			components.slideUp(component, 400);
		}
		if(this.onclose){
			this.onclose(cancel);
		}
		this.sketcher.modal = undefined;
		this.sketcher.doEventDefault = false;
	};

})(ChemDoodle.uis.gui.desktop, ChemDoodle.lib.FloatingUIDOM, ChemDoodle.components, document, window);

(function(c, structures, actions, desktop, document, undefined) {
	'use strict';
	desktop.EnhancedStereoPopover = function(sketcher, id) {
		this.sketcher = sketcher;
		this.id = sketcher.id+id;
		this.free = true;
		this.onclose = function(){
			// we need to clear the hover or it will remain, this process is different for mobile
			let curstate = sketcher.stateManager.getCurrentState();
			if(curstate.mobileHover){
				// make sure to clear the hover in this case
				curstate.mobileHover = undefined;
			}
			curstate.clearHover();
			sketcher.repaint();
		};
	};
	let _ = desktop.EnhancedStereoPopover.prototype = new desktop.Popover();
	_.populate = function(atom) {
		if(atom){
			if(atom.enhancedStereo.type===structures.Atom.ESTEREO_ABSOLUTE){
				// abs
				document.getElementById(this.id+'_estereo_abs').checked = true;
			}else if(atom.enhancedStereo.type===structures.Atom.ESTEREO_AND){
				// &
				document.getElementById(this.id+'_estereo_and').checked = true;
			}else if(atom.enhancedStereo.type===structures.Atom.ESTEREO_OR){
				// or
				document.getElementById(this.id+'_estereo_or').checked = true;
			}
			document.getElementById(this.id+'_input').value = atom.enhancedStereo.group;
		}
	};
	_.getContentSource = function(){
		return `
			<div>
				<table style="margin-bottom:20px;">
					<tr>
						<td style="vertical-align:top;"><strong>Enhanced<br>Stereochemistry</strong>:</td>
						<td style="vertical-align:top;">
							<table>
								<tr>
									<td>
										<input type="radio" id="${this.id}_estereo_abs" name="estereo" value="abs"><label for="${this.id}_estereo_abs">Absolute</label>
									</td>
								</tr>
								<tr>
									<td>
										<input type="radio" id="${this.id}_estereo_or" name="estereo" value="or"><label for="${this.id}_estereo_or">Or</label>
									</td>
									<td rowspan="2">
										<input type="number" id="${this.id}_input" name="tentacles" min="1" max="99" style="margin:10px;"></input>(1 to 99)
									</td>
								</tr>
								<tr>
									<td>
										<input type="radio" id="${this.id}_estereo_and" name="estereo" value="and"><label for="${this.id}_estereo_and">And</label>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
				<center>
					<button type="button" id="${this.id}_set" class="reset-all-button">OK</button>
					<button class="reset-all-button" style="margin-left:10px;" type="button" id="${this.id}_cancel">Cancel</button>
				</center>
			</div>
		`;
	};
	_.setupContent = function(){
		document.getElementById(this.id+'_set').addEventListener('click', (e) => {
			let type = structures.Atom.ESTEREO_ABSOLUTE;
			if(document.getElementById(this.id+'_estereo_and').checked) {
				type = structures.Atom.ESTEREO_AND;
			}else if(document.getElementById(this.id+'_estereo_or').checked){
				type = structures.Atom.ESTEREO_OR;
			}
		
			// default is any
			let input = document.getElementById(this.id+'_input').value;
			if(!input.match(/^-?\d+$/)){
				alert('Please enter a positive integer value with only the digits 0-9.');
				return;
			}
			let group = parseInt(input);
			if(group<1){
				alert('Please input a positive integer for the enhanced stereochemistry group number.');
				return;
			}else if(group>99){
				alert('The maximum allowed enhanced stereochemistry group number is 99.');
				return;
			}

			if(this.sketcher.hovering.enhancedStereo.type !== type || this.sketcher.hovering.enhancedStereo.group !== group){
				this.sketcher.historyManager.pushUndo(new actions.ChangeEnhancedStereoAction(this.sketcher.hovering, type, group));
			}
			this.close();
		});
		document.getElementById(this.id+'_cancel').addEventListener('click', (e) => {
			this.close();
		});
	};

})(ChemDoodle, ChemDoodle.structures, ChemDoodle.uis.actions, ChemDoodle.uis.gui.desktop, document);

(function(c, actions, desktop, document, undefined) {
	'use strict';
	desktop.ImplicitHydrogenPopover = function(sketcher, id) {
		this.sketcher = sketcher;
		this.id = sketcher.id+id;
		this.free = true;
		this.onclose = function(){
			// we need to clear the hover or it will remain, this process is different for mobile
			let curstate = sketcher.stateManager.getCurrentState();
			if(curstate.mobileHover){
				// make sure to clear the hover in this case
				curstate.mobileHover = undefined;
			}
			curstate.clearHover();
			sketcher.repaint();
		};
	};
	let _ = desktop.ImplicitHydrogenPopover.prototype = new desktop.Popover();
	_.populate = function(atom) {
		document.getElementById(this.id+'_input').value = atom.implicitH===-1?'':atom.implicitH;
	};
	_.getContentSource = function(){
		return `
			<div style="width:320px;">
				<div width="100%">Enter a positive integer or zero (0-15) for the implicit hydrogen count:</div>
				<center>
					<table>
						<tr>
							<td><button type="button" id="${this.id}_remove" class="reset-all-button" style="margin-right:100px;">Remove</button></td>
							<td><input type="number" id="${this.id}_input" name="tentacles" min="0" max="15" style="margin:10px;"></input></td>
							<td><button type="button" id="${this.id}_set" class="reset-all-button">Set</button></td>
						</tr>
					</table>
				</center>
			</div>
		`;
	};
	_.setupContent = function(){
		document.getElementById(this.id+'_set').addEventListener('click', (e) => {
			let input = document.getElementById(this.id+'_input').value;
			if(input.trim().length===0){
				// if the field is blank and the user tries to set it, remove the value
				if(this.sketcher.hovering.implicitH!==-1){
					this.sketcher.historyManager.pushUndo(new actions.ChangeImplicitHydrogenAction(this.sketcher.hovering, -1));
				}
				// close() must be called last, as close() sets the hovered object to undefined
				this.close();
				return;
			}
			if(!input.match(/^-?\d+$/)){
				alert('Please enter a positive integer value with only the digits 0-9.');
				return;
			}
			let iv = parseInt(input);
			if(iv<0){
				alert('Please input a positive integer or zero for the implicit hydrogen count.');
				return;
			}else if(iv>15){
				alert('The maximum allowed implicit hydrogen count is 15.');
				return;
			}else if(this.sketcher.hovering.implicitH !== iv){
				this.sketcher.historyManager.pushUndo(new actions.ChangeImplicitHydrogenAction(this.sketcher.hovering, iv));
			}
			// close() must be called last, as close() sets the hovered object to undefined
			this.close();
		});
		document.getElementById(this.id+'_remove').addEventListener('click', (e) => {
			if(this.sketcher.hovering.implicit !== -1){
				this.sketcher.historyManager.pushUndo(new actions.ChangeImplicitHydrogenAction(this.sketcher.hovering, -1));
			}
			// close() must be called last, as close() sets the hovered object to undefined
			this.close();
		});
	};

})(ChemDoodle, ChemDoodle.uis.actions, ChemDoodle.uis.gui.desktop, document);

(function(c, actions, desktop, document, undefined) {
	'use strict';
	desktop.IsotopePopover = function(sketcher, id) {
		this.sketcher = sketcher;
		this.id = sketcher.id+id;
		this.free = true;
		this.onclose = function(){
			// we need to clear the hover or it will remain, this process is different for mobile
			let curstate = sketcher.stateManager.getCurrentState();
			if(curstate.mobileHover){
				// make sure to clear the hover in this case
				curstate.mobileHover = undefined;
			}
			curstate.clearHover();
			sketcher.repaint();
		};
	};
	let _ = desktop.IsotopePopover.prototype = new desktop.Popover();
	_.populate = function(atom) {
		document.getElementById(this.id+'_input').value = atom.mass===-1?'':atom.mass;
	};
	_.getContentSource = function(){
		return `
			<div style="width:320px;">
				<div width="100%">Enter a positive integer (1-999) for the isotope value:</div>
				<center>
					<table>
						<tr>
							<td><button type="button" id="${this.id}_remove" class="reset-all-button" style="margin-right:100px;">Remove</button></td>
							<td><input type="number" id="${this.id}_input" name="tentacles" min="1" max="999" style="margin:10px;"></input></td>
							<td><button type="button" id="${this.id}_set" class="reset-all-button">Set</button></td>
						</tr>
					</table>
				</center>
			</div>
		`;
	};
	_.setupContent = function(){
		document.getElementById(this.id+'_set').addEventListener('click', (e) => {
		   let input = document.getElementById(this.id+'_input').value;
			if(input.trim().length===0){
				// if the field is blank and the user tries to set it, remove the value
				if(this.sketcher.hovering.mass!==-1){
					this.sketcher.historyManager.pushUndo(new actions.ChangeIsotopeAction(this.sketcher.hovering, -1));
				}
				// close() must be called last, as close() sets the hovered object to undefined
				this.close();
				return;
			}
			if(!input.match(/^-?\d+$/)){
				alert('Please enter a positive integer value with only the digits 0-9.');
				return;
			}
			let iv = parseInt(input);
			if(iv<1){
				alert('Please input a positive integer for the isotope value.');
				return;
			}else if(iv>999){
				alert('The maximum allowed isotope value is 999.');
				return;
			}else if(this.sketcher.hovering.mass !== iv){
				this.sketcher.historyManager.pushUndo(new actions.ChangeIsotopeAction(this.sketcher.hovering, iv));
			}
			// close() must be called last, as close() sets the hovered object to undefined
			this.close();
		});
		document.getElementById(this.id+'_remove').addEventListener('click', (e) => {
			if(this.sketcher.hovering.mass !== -1){
				this.sketcher.historyManager.pushUndo(new actions.ChangeIsotopeAction(this.sketcher.hovering, -1));
			}
			// close() must be called last, as close() sets the hovered object to undefined
			this.close();
		});
	};

})(ChemDoodle, ChemDoodle.uis.actions, ChemDoodle.uis.gui.desktop, document);
(function(desktop, interaction, FloatingUIDOM, document, undefined) {
	'use strict';
	desktop.FloatingToolbar = function(sketcher, id) {
		desktop._Component.call(this, id);
		this.sketcher = sketcher;
		this.components = [];
	};
	let _ = desktop.FloatingToolbar.prototype = new desktop._Component();
	_.getSource = function() {
		// box-sizing makes the browser include borders and padding in width and height
		let sb = [`
			<div id="${this.id}" class="reset-all" style="position:absolute;z-index:10;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);border:1px #C1C1C1 solid;border-radius:4px;background:#F5F5F5;padding:2px;">
				<div id="${this.id}_handle" class="reset-all" style="cursor:move;height:10px;">
					<div class="reset-all" style="cursor:move;box-sizing:border-box;padding-left:2px;padding-right:2px;height:4px;border-top:1px solid #999;border-bottom:1px solid #999;"></div>
				</div>
		`];
		for ( let i = 0, ii = this.components.length; i < ii; i++) {
			sb.push(this.components[i].getSource());
			sb.push('<div class="reset-all" style="height:2px;"></div>');	
		}
		sb.push('</div>');
		return sb.join('');
	};
	_.setup = function(bg) {
		let self = this;
		new interaction.Draggable(document.getElementById(this.id), {
			handle: document.getElementById(this.id+'_handle'),
			drag: function(){
				if(self.sketcher.openTray){
					self.sketcher.openTray.reposition();
				}
			},
			containment: 'document'
		});
		for (let component of this.components) {
			component.setup(bg);
		}
		// position centered left of the sketcher, with a 100px buffer for the open tray
		const sketcherElement = document.getElementById(this.sketcher.id);
		const element = this.getElement();
	    FloatingUIDOM.computePosition(sketcherElement, element, {
		  placement: 'left',
		  middleware: [
		    FloatingUIDOM.offset(50),
		    FloatingUIDOM.flip(),
		    FloatingUIDOM.shift({padding: 5}),
		  ],
		}).then(({x, y}) => {
		  Object.assign(element.style, {
		    left: `${x}px`,
		    top: `${y}px`,
		  });
			if(self.sketcher.openTray){
				self.sketcher.openTray.reposition();
			}
		});
	};

})(ChemDoodle.uis.gui.desktop, ChemDoodle.uis.gui.desktop.interaction, ChemDoodle.lib.FloatingUIDOM, document);
(function(desktop, document, undefined) {
	'use strict';
	desktop.MainToolbar = function(webComponent) {
		desktop._Component.call(this, webComponent.id+'_main_toolbar');
		this.webComponent = webComponent;
		this.components = [];
	};
	let _ = desktop.MainToolbar.prototype = new desktop._Component();
	_.getSource = function() {
		return '<div id="'+this.webComponent.id+'_main_toolbar" class="reset-all" style="font-size:0px;user-select:none;padding-bottom:5px;">';
	};
	_.getNewRowSource = function(){
		return '<hr class="reset-all" style="height:3px;visibility:hidden;border:none;margin:0;" />';
	};
	_.write = function(source){
		const webComponentElement = document.getElementById(this.webComponent.id);
		if (webComponentElement) {
			const tempContainer = document.createElement('div');
			tempContainer.innerHTML = source;
			while (tempContainer.firstChild) {
				webComponentElement.parentNode.insertBefore(tempContainer.firstChild, webComponentElement);
			}
		} else {
			document.write(source);
		}
	};
	_.setup = function(bg) {
		// make open tray disappear when one of the button group buttons is pressed
		for(const component of bg){
			component.getElement().addEventListener('click', (e) => {
				// dummy buttons for Trays have a .tray parameter
				if(this.webComponent.openTray !== undefined && this.webComponent.openTray !== component.tray){
					this.webComponent.openTray.close();
				}
			});
		}
		// space toolbar components
		const children = document.getElementById(this.id).children;
		for (let i = 0, ii = children.length - 1; i < ii; i++) {
			const currentChild = children[i];
			const nextSibling = currentChild.nextElementSibling;
	
			// Check if it's not the last child AND (there's no next sibling OR the next sibling is a div)
			if (i < children.length - 1 && (!nextSibling || (nextSibling.tagName === 'DIV' || nextSibling.tagName === 'SPAN'))) {
				currentChild.style.marginRight = '3px';
			} else {
				currentChild.style.marginRight = ''; // Or '0', to explicitly remove any existing margin
			}
		}
	};

})(ChemDoodle.uis.gui.desktop, document);
(function(desktop, imageDepot, FloatingUIDOM, document, undefined) {
	'use strict';
	desktop.Tray = function(sketcher, id, dummy, columnCount) {
		desktop._Component.call(this, id);
		this.sketcher = sketcher;
		this.tooltip = dummy.tooltip;
		this.dummy = dummy;
		this.dummy.toggle = true;
		this.dummy.tray = this;
		this.buttonSet = new desktop.ButtonSet(id + '_set');
		this.buttonSet.columnCount = columnCount;
		this.buttonSet.buttonGroup = this.tooltip;
		this.defaultButton = undefined;
	};
	let _ = desktop.Tray.prototype = new desktop._Component();
	_.getSource = function() {
		return `
			${this.dummy.getSource()}
			<div class="reset-all" style="display:none;position:absolute;z-index:11;border:1px #C1C1C1 solid;background:#F5F5F5;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);border-radius:4px;margin:0px;" id="${this.id}_hidden">
				${this.buttonSet.getSource(this.id + '_popup_set')}
				<div id="${this.id}_arrow" class="reset-all" style="position:absolute;z-index:-1;border-top:1px #C1C1C1 solid;border-right:1px #C1C1C1 solid;background:#F5F5F5;width:8px;height:8px;transform:rotate(45deg);"></div>
			</div>
		`;
	};
	_.getHiddenTrayElement = function(){
		return document.getElementById(this.id + '_hidden');
	};
	_.setup = function(dummyButtonGroup) {
		this.dummy.setup(dummyButtonGroup);
		const button = this.dummy.getElement();
		if (!this.defaultButton) {
			this.defaultButton = this.buttonSet.buttons[0];
		}
		button.addEventListener('click', (e) => {
			// have to duplicate here as scope makes "this" the button
			if(this.sketcher.openTray !== this){
				if(this.sketcher.openTray){
					this.sketcher.openTray.close();
				}
				this.sketcher.openTray = this;
				// Trigger document click manually for compatibility
		        let clickEvent = new Event('click');
		        document.dispatchEvent(clickEvent);
		
		        this.getHiddenTrayElement().style.display = 'block';
			}
			this.reposition();
		});
		this.buttonSet.setup([]);
		this.buttonSet.buttons.forEach((button) => {
			button.getElement().addEventListener('click', () => {
				this.dummy.absorb(button);
			});
		});
		this.dummy.absorb(this.defaultButton);
		this.defaultButton.select();
	};
	_.open = function(select) {
		if(this.sketcher.openTray!==this){
			if(this.sketcher.openTray){
				this.sketcher.openTray.close();
			}
			this.sketcher.openTray = this;
			
			let clickEvent = new Event('click');
			document.dispatchEvent(clickEvent);
			this.getHiddenTrayElement().style.display = 'block';
		}
		if(select){
			this.dummy.absorb(select);
			select.select();
		}
		this.reposition();
	};
	_.reposition = function(){
		const dummyElement = this.dummy.getElement();
	    const popup = this.getHiddenTrayElement();
	    const arrowElement = document.getElementById(this.id + '_arrow');
	
	    // Basic positioning logic, position centered right of the button
	    FloatingUIDOM.computePosition(dummyElement, popup, {
		  placement: 'left',
		  middleware: [
		    FloatingUIDOM.offset(6),
		    FloatingUIDOM.flip(),
		    FloatingUIDOM.shift({padding: 5}),
		    FloatingUIDOM.arrow({element: arrowElement}),
		  ],
		}).then(({x, y, placement, middlewareData}) => {
		  Object.assign(popup.style, {
		    left: `${x}px`,
		    top: `${y}px`,
		  });
		 
		  // Accessing the data
		  const {x: arrowX, y: arrowY} = middlewareData.arrow;
		 
		  const staticSide = {
		    top: 'bottom',
		    right: 'left',
		    bottom: 'top',
		    left: 'right',
		  }[placement.split('-')[0]];
		 
		  Object.assign(arrowElement.style, {
		    left: arrowX != null ? `${arrowX}px` : '',
		    top: arrowY != null ? `${arrowY}px` : '',
		    right: '',
		    bottom: '',
		    [staticSide]: '-5px',
			transform: placement.startsWith('right') ? 'rotate(225deg)' : 'rotate(45deg)',
		  });
		});
	};
	_.close = function(){
		this.getHiddenTrayElement().style.display = 'none';
		this.sketcher.openTray = undefined;
	};

})(ChemDoodle.uis.gui.desktop, ChemDoodle.uis.gui.imageDepot, ChemDoodle.lib.FloatingUIDOM, document);
(function(c, iChemLabs, io, structures, actions, gui, imageDepot, desktop, tools, states, components, ELEMENT, document, undefined) {
	'use strict';
	gui.ToolbarManager = function(sketcher) {
		this.sketcher = sketcher;

		if(this.sketcher.floatDrawTools){
			this.drawTools = new desktop.FloatingToolbar(sketcher, sketcher.id+'_floating_toolbar');
		}
		
		// open
		this.buttonOpen = new desktop.Button(sketcher.id + '_button_open', imageDepot.OPEN, 'Open', function() {
			sketcher.dialogManager.openPopup.show();
		});
		// save
		this.buttonSave = new desktop.Button(sketcher.id + '_button_save', imageDepot.SAVE, 'Save', function() {
			let cont = true;
			if (sketcher.useServices) {
				sketcher.dialogManager.saveDialog.clear();
			} else {
				if (sketcher.oneMolecule) {
					sketcher.dialogManager.saveDialog.getTextArea().value = c.writeMOL(sketcher.molecules[0]);
				} else {
					if (sketcher.lasso.isActive() && sketcher.lasso.atoms.length > 0){
						sketcher.dialogManager.saveDialog.getTextArea().value = c.writeMOL(sketcher.lasso.getFirstMolecule());
					}else{
						cont = false;
						alert('The MOLfile must be generated from a single chemical structure. Please draw and select a single molecule to be output as a MOLfile.');
					}
				}
			}
			if(cont){
				sketcher.dialogManager.saveDialog.open();
			}
		});
		// template
		this.buttonTemplate = new desktop.Button(sketcher.id + '_button_template', imageDepot.TEMPLATES, 'Templates', function() {
			sketcher.stateManager.setState(sketcher.stateManager.STATE_NEW_TEMPLATE);
			sketcher.dialogManager.templateDialog.open();
		});
		// search
		this.buttonSearch = new desktop.Button(sketcher.id + '_button_search', imageDepot.SEARCH, 'Search', function() {
			sketcher.dialogManager.searchDialog.open();
		});
		// calculate
		this.buttonCalculate = new desktop.Button(sketcher.id + '_button_calculate', imageDepot.CALCULATE, 'Calculate', function() {
			let mol = sketcher.oneMolecule ? sketcher.molecules[0] : sketcher.lasso.getFirstMolecule();
			if (mol) {
				iChemLabs.calculate(mol, {
					descriptors : [ 'mf', 'ef', 'mw', 'miw', 'deg_unsat', 'hba', 'hbd', 'rot', 'electron', 'pol_miller', 'cmr', 'tpsa', 'vabc', 'xlogp2', 'bertz' ]
				}, function(content) {
					let sb = [];
					function addDatum(title, value, unit) {
						sb.push(title);
						sb.push(': ');
						for ( let i = title.length + 2; i < 30; i++) {
							sb.push(' ');
						}
						sb.push(value);
						sb.push(' ');
						sb.push(unit);
						sb.push('\n');
					}
					addDatum('Molecular Formula', content.mf, '');
					addDatum('Empirical Formula', content.ef, '');
					addDatum('Molecular Mass', content.mw, 'amu');
					addDatum('Monoisotopic Mass', content.miw, 'amu');
					addDatum('Degree of Unsaturation', content.deg_unsat, '');
					addDatum('Hydrogen Bond Acceptors', content.hba, '');
					addDatum('Hydrogen Bond Donors', content.hbd, '');
					addDatum('Rotatable Bonds', content.rot, '');
					addDatum('Total Electrons', content.rot, '');
					addDatum('Molecular Polarizability', content.pol_miller, 'A^3');
					addDatum('Molar Refractivity', content.cmr, 'cm^3/mol');
					addDatum('Polar Surface Area', content.tpsa, 'A^2');
					addDatum('vdW Volume', content.vabc, 'A^3');
					addDatum('logP', content.xlogp2, '');
					addDatum('Complexity', content.bertz, '');
					sketcher.dialogManager.calculateDialog.getTextArea().value = sb.join('');
					sketcher.dialogManager.calculateDialog.open();
				});
			}
		});

		// move
		this.buttonMove = new desktop.Button(sketcher.id + '_button_move', imageDepot.MOVE, 'Move', function() {
			sketcher.stateManager.setState(sketcher.stateManager.STATE_MOVE);
		});
		// erase
		this.buttonErase = new desktop.Button(sketcher.id + '_button_erase', imageDepot.ERASE, 'Erase', function() {
			sketcher.stateManager.setState(sketcher.stateManager.STATE_ERASE);
		});
		// center
		this.buttonCenter = new desktop.Button(sketcher.id + '_button_center', imageDepot.CENTER, 'Center', function() {
			let dif = new structures.Point(sketcher.width / 2, sketcher.height / 2);
			let bounds = sketcher.getContentBounds();
			dif.x -= (bounds.maxX + bounds.minX) / 2;
			dif.y -= (bounds.maxY + bounds.minY) / 2;
			sketcher.historyManager.pushUndo(new actions.MoveAction(sketcher.getAllPoints(), dif));
		});

		// clear
		this.buttonClear = new desktop.Button(sketcher.id + '_button_clear', imageDepot.CLEAR, 'Clear', function() {
			let clear = true;
			if (sketcher.oneMolecule) {
				if (sketcher.molecules[0].atoms.length === 1) {
					let a = sketcher.molecules[0].atoms[0];
					if (a.label === 'C' && a.charge === 0 && a.mass === -1) {
						clear = false;
					}
				}
			} else {
				if (sketcher.molecules.length === 0 && sketcher.shapes.length === 0) {
					clear = false;
				}
			}
			if (clear) {
				sketcher.stateManager.getCurrentState().clearHover();
				if (sketcher.lasso && sketcher.lasso.isActive()) {
					sketcher.lasso.empty();
				}
				sketcher.historyManager.pushUndo(new actions.ClearAction(sketcher));
			}
		});
		// clean
		this.buttonClean = new desktop.Button(sketcher.id + '_button_clean', imageDepot.OPTIMIZE, 'Clean', function() {
			let mol = sketcher.oneMolecule ? sketcher.molecules[0] : sketcher.lasso.getFirstMolecule();
			if (mol) {
				let json = new io.JSONInterpreter();
				iChemLabs._contactServer('optimize', {
					'mol' : json.molTo(mol)
				}, {
					dimension : 2
				}, function(content) {
					let optimized = json.molFrom(content.mol);
					let optCenter = optimized.getCenter();
					let dif = sketcher.oneMolecule ? new structures.Point(sketcher.width / 2, sketcher.height / 2) : mol.getCenter();
					dif.sub(optCenter);
					
					let ca = new actions.CompoundAction();
					for (let i = 0, ii = optimized.atoms.length; i < ii; i++) {
						optimized.atoms[i].add(dif);
					}
					ca.actions.push(new actions.ChangeCoordinatesAction(mol.atoms, optimized.atoms));
					for (let i = 0, ii = optimized.bonds.length; i < ii; i++) {
						let b1 = mol.bonds[i];
						let b2 = optimized.bonds[i];
						if(b1.stereo!==b2.stereo){
							ca.actions.push(new actions.ChangeBondAction(b1, b1.bondOrder, b2.stereo));
						}
					}
					
					sketcher.historyManager.pushUndo(ca);
				});
			}
		});

		// lasso set
		this.makeLassoSet(this);

		// cut/copy/paste set
		this.makeCopySet(this);

		// scale set
		this.makeScaleSet(this);

		// flip set
		this.makeFlipSet(this);

		// history set
		this.makeHistorySet(this);

		// label set
		this.makeLabelSet(this);
		
		// query
		this.buttonTextInput = new desktop.Button(sketcher.id + '_button_text_input', imageDepot.TEXT, 'Set Atom Label', function() {
			sketcher.stateManager.setState(sketcher.stateManager.STATE_TEXT_INPUT);
		});
		this.buttonQuery = new desktop.Button(sketcher.id + '_button_query', imageDepot.QUERY, 'Set Query to Atom or Bond', function() {
			sketcher.stateManager.setState(sketcher.stateManager.STATE_QUERY);
		});

		// bond set
		this.makeBondSet(this);

		// ring set
		this.makeRingSet(this);
		
		// chain
		this.buttonChain = new desktop.Button(sketcher.id + '_button_chain', imageDepot.CHAIN_CARBON, 'Add Carbon Chain', function() {
			sketcher.stateManager.setState(sketcher.stateManager.STATE_NEW_CHAIN);
		});

		// attribute set
		this.makeAttributeSet(this);

		// shape set
		this.makeShapeSet(this);
		
		if(this.makeOtherButtons){
			this.makeOtherButtons(this);
		}
	};
	let _ = gui.ToolbarManager.prototype;
	_.write = function() {
		this.mainToolbar = new desktop.MainToolbar(this.sketcher);
		const sb = [this.mainToolbar.getSource()];
		if (this.sketcher.oneMolecule) {
			sb.push(this.buttonMove.getSource());
		} else {
			sb.push(this.lassoSet.getSource());
		}
		sb.push(this.buttonClear.getSource());
		sb.push(this.buttonErase.getSource());
		sb.push(this.buttonCenter.getSource());
		if (this.sketcher.useServices) {
			sb.push(this.buttonClean.getSource());
		}
		sb.push(this.flipSet.getSource());
		sb.push(this.historySet.getSource());
		if (!this.sketcher.oneMolecule) {
			sb.push(this.copySet.getSource());
		}
		sb.push(this.scaleSet.getSource());
		sb.push(this.buttonOpen.getSource());
		sb.push(this.buttonSave.getSource());
		sb.push(this.buttonTemplate.getSource());
		if (this.sketcher.useServices) {
			sb.push(this.buttonSearch.getSource());
			sb.push(this.buttonCalculate.getSource());
		}
		if(!this.sketcher.floatDrawTools){
			sb.push(this.mainToolbar.getNewRowSource());
			if(desktop.TextInput){
				sb.push(this.buttonTextInput.getSource());
			}
			sb.push(this.labelSet.getSource());
			if (this.sketcher.includeQuery) {
				sb.push(this.buttonQuery.getSource());
			}
			sb.push(this.attributeSet.getSource());
			sb.push(this.bondSet.getSource());
			sb.push(this.ringSet.getSource());
			sb.push(this.buttonChain.getSource());
			if (!this.sketcher.oneMolecule) {
				sb.push(this.shapeSet.getSource());
			}
		}
		sb.push('</div>');
		if(this.sketcher.floatDrawTools){
			if(desktop.TextInput){
				this.drawTools.components.splice(0, 0, this.buttonTextInput);
			}
			if (this.sketcher.includeQuery) {
				this.drawTools.components.splice((desktop.TextInput?1:0), 0, this.buttonQuery);
			}
			this.drawTools.components.splice(this.drawTools.components.length-(this.sketcher.oneMolecule?1:3), 0, this.buttonChain);
			if (!this.sketcher.oneMolecule) {
				this.drawTools.components.push(this.buttonVAP);
			}
			sb.push(this.drawTools.getSource());
		}

		this.mainToolbar.write(sb.join(''));
		this.written = true;
	};
	_.setup = function() {
		const bg = [];
		if (this.sketcher.oneMolecule) {
			this.buttonMove.setup(bg);
		} else {
			this.lassoSet.setup(bg);
		}
		this.buttonClear.setup();
		this.buttonErase.setup(bg);
		this.buttonCenter.setup();
		if (this.sketcher.useServices) {
			this.buttonClean.setup();
		}
		this.flipSet.setup();
		this.historySet.setup();
		if (!this.sketcher.oneMolecule) {
			this.copySet.setup();
		}
		this.scaleSet.setup();
		this.buttonOpen.setup();
		this.buttonSave.setup();
		this.buttonTemplate.setup(bg);
		if (this.sketcher.useServices) {
			this.buttonSearch.setup();
			this.buttonCalculate.setup();
		}
		if(this.sketcher.floatDrawTools){
			this.drawTools.setup(bg);
			this.buttonBond.getElement().click();
		}else{
			if(desktop.TextInput){
				this.buttonTextInput.setup(bg);
			}
			this.labelSet.setup(bg);
			if (this.sketcher.includeQuery) {
				this.buttonQuery.setup(bg);
			}
			this.attributeSet.setup(bg);
			this.bondSet.setup(bg);
			this.ringSet.setup(bg);
			this.buttonChain.setup(bg);
			if (!this.sketcher.oneMolecule) {
				this.shapeSet.setup(bg);
			}
			this.buttonSingle.getElement().click();
		}

		this.buttonUndo.disable();
		this.buttonRedo.disable();
		if (!this.sketcher.oneMolecule) {
			this.buttonCut.disable();
			this.buttonCopy.disable();
			this.buttonPaste.disable();
			this.buttonFlipVert.disable();
			this.buttonFlipHor.disable();
			if (this.sketcher.useServices) {
				this.buttonClean.disable();
				this.buttonCalculate.disable();
				this.buttonSave.disable();
			}
		}
		
		this.mainToolbar.setup(bg);
	};

	_.makeCopySet = function(self) {
		this.buttonCut = new desktop.Button(self.sketcher.id + '_button_cut', imageDepot.CUT, 'Cut', function() {
			self.sketcher.copyPasteManager.copy(true);
		});
		this.buttonCopy = new desktop.Button(self.sketcher.id + '_button_copy', imageDepot.COPY, 'Copy', function() {
			self.sketcher.copyPasteManager.copy(false);
		});
		this.buttonPaste = new desktop.Button(self.sketcher.id + '_button_paste', imageDepot.PASTE, 'Paste', function() {
			self.sketcher.copyPasteManager.paste();
		});
		
		this.copySet = new desktop.ButtonSet(self.sketcher.id + '_buttons_copy');
		this.copySet.toggle = false;
		this.copySet.buttons.push(this.buttonCut);
		this.copySet.buttons.push(this.buttonCopy);
		this.copySet.buttons.push(this.buttonPaste);
	};
	_.makeScaleSet = function(self) {
		this.buttonScalePlus = new desktop.Button(self.sketcher.id + '_button_scale_plus', imageDepot.ZOOM_IN, 'Increase Scale', function() {
			self.sketcher.styles.scale *= 1.5;
			self.sketcher.checkScale();
			self.sketcher.repaint();
		});
		this.buttonScaleMinus = new desktop.Button(self.sketcher.id + '_button_scale_minus', imageDepot.ZOOM_OUT, 'Decrease Scale', function() {
			self.sketcher.styles.scale /= 1.5;
			self.sketcher.checkScale();
			self.sketcher.repaint();
		});
		
		this.scaleSet = new desktop.ButtonSet(self.sketcher.id + '_buttons_scale');
		this.scaleSet.toggle = false;
		this.scaleSet.buttons.push(this.buttonScalePlus);
		this.scaleSet.buttons.push(this.buttonScaleMinus);
	};
	_.makeLassoSet = function(self) {
		this.buttonLassoAll = new desktop.Button(self.sketcher.id + '_button_lasso_lasso', imageDepot.LASSO, 'Lasso Tool', function() {
			self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_LASSO);
			self.sketcher.lasso.mode = tools.Lasso.MODE_LASSO;
			if (!self.sketcher.lasso.isActive()) {
				self.sketcher.lasso.selectNextMolecule();
			}
		});
		this.buttonLassoShapes = new desktop.Button(self.sketcher.id + '_button_lasso_shapes', imageDepot.LASSO_SHAPES, 'Lasso Tool (shapes only)', function() {
			self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_LASSO);
			self.sketcher.lasso.mode = tools.Lasso.MODE_LASSO_SHAPES;
			if (!self.sketcher.lasso.isActive()) {
				self.sketcher.lasso.selectNextShape();
			}
		});
		this.buttonRectMarq = new desktop.Button(self.sketcher.id + '_button_lasso_marquee', imageDepot.MARQUEE, 'Marquee Tool', function() {
			self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_LASSO);
			self.sketcher.lasso.mode = tools.Lasso.MODE_RECTANGLE_MARQUEE;
			if (!self.sketcher.lasso.isActive()) {
				self.sketcher.lasso.selectNextMolecule();
			}
		});
		
		this.lassoSet = new desktop.ButtonSet(self.sketcher.id + '_buttons_lasso');
		this.buttonLasso = new desktop.DummyButton(self.sketcher.id + '_button_lasso', 'Selection Tool');
		this.lassoSet.buttons.push(this.buttonLasso);
		this.lassoSet.addDropDown('More Selection Tools');
		this.lassoSet.dropDown.buttonSet.buttons.push(this.buttonLassoAll);
		this.lassoSet.dropDown.buttonSet.buttons.push(this.buttonLassoShapes);
		this.lassoSet.dropDown.buttonSet.buttons.push(this.buttonRectMarq);
	};
	_.makeFlipSet = function(self) {
		let action = function(horizontal){
			let ps = self.sketcher.oneMolecule?self.sketcher.getAllPoints():self.sketcher.lasso.getAllPoints();
			let bs = [];
			let lbs = self.sketcher.oneMolecule?self.sketcher.getAllBonds():self.sketcher.lasso.getBonds();
			for(let i = 0, ii = lbs.length; i<ii; i++){
				let b = lbs[i];
				if(b.bondOrder===1 && (b.stereo===structures.Bond.STEREO_PROTRUDING || b.stereo===structures.Bond.STEREO_RECESSED)){
					bs.push(b);
				}
			}
			self.sketcher.historyManager.pushUndo(new actions.FlipAction(ps, bs, horizontal));
		}
		this.buttonFlipVert = new desktop.Button(self.sketcher.id + '_button_flip_hor', imageDepot.FLIP_HOR, 'Flip Horizontally', function() {
			action(true);
		});
		this.buttonFlipHor = new desktop.Button(self.sketcher.id + '_button_flip_ver', imageDepot.FLIP_VER, 'Flip Vertically', function() {
			action(false);
		});
		
		this.flipSet = new desktop.ButtonSet(self.sketcher.id + '_buttons_flip');
		this.flipSet.toggle = false;
		this.flipSet.buttons.push(this.buttonFlipVert);
		this.flipSet.buttons.push(this.buttonFlipHor);
	};
	_.makeHistorySet = function(self) {
		this.buttonUndo = new desktop.Button(self.sketcher.id + '_button_undo', imageDepot.UNDO, 'Undo', function() {
			self.sketcher.historyManager.undo();
		});
		this.buttonRedo = new desktop.Button(self.sketcher.id + '_button_redo', imageDepot.REDO, 'Redo', function() {
			self.sketcher.historyManager.redo();
		});
		
		this.historySet = new desktop.ButtonSet(self.sketcher.id + '_buttons_history');
		this.historySet.toggle = false;
		this.historySet.buttons.push(this.buttonUndo);
		this.historySet.buttons.push(this.buttonRedo);
	};
	_.makeLabelSet = function(self) {
		function createLabelButton(element){
			return new desktop.Button(self.sketcher.id + '_button_label_'+element.symbol.toLowerCase(), imageDepot[element.name.toUpperCase()], element.name, function() {
				self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_LABEL);
				self.sketcher.stateManager.STATE_LABEL.label = element.symbol;
			});
		};
	
		this.buttonLabelH = createLabelButton(ELEMENT.H);
		this.buttonLabelC = createLabelButton(ELEMENT.C);
		this.buttonLabelN = createLabelButton(ELEMENT.N);
		this.buttonLabelO = createLabelButton(ELEMENT.O);
		this.buttonLabelF = createLabelButton(ELEMENT.F);
		this.buttonLabelCl = createLabelButton(ELEMENT.Cl);
		this.buttonLabelBr = createLabelButton(ELEMENT.Br);
		this.buttonLabelI = createLabelButton(ELEMENT.I);
		this.buttonLabelP = createLabelButton(ELEMENT.P);
		this.buttonLabelS = createLabelButton(ELEMENT.S);
		this.buttonLabelSi = createLabelButton(ELEMENT.Si);
		this.buttonLabelPT = new desktop.Button(self.sketcher.id + '_button_label_pt', imageDepot.PERIODIC_TABLE, 'Choose Symbol', function() {
			if(self.sketcher.dialogManager.periodicTableDialog.canvas.selected){
				self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_LABEL);
				self.sketcher.stateManager.STATE_LABEL.label = self.sketcher.dialogManager.periodicTableDialog.canvas.selected.element.symbol;
			}
			self.sketcher.dialogManager.periodicTableDialog.open();
		});
		
		this.buttonLabel = new desktop.DummyButton(self.sketcher.id + '_button_label', 'Set Label');
		if(self.sketcher.floatDrawTools){
			this.labelTray = new desktop.Tray(self.sketcher, self.sketcher.id + '_buttons_label', this.buttonLabel, 3);
			this.labelTray.defaultButton = this.buttonLabelO;
			this.labelTray.buttonSet.buttons.push(this.buttonLabelH);
			this.labelTray.buttonSet.buttons.push(this.buttonLabelC);
			this.labelTray.buttonSet.buttons.push(this.buttonLabelN);
			this.labelTray.buttonSet.buttons.push(this.buttonLabelO);
			this.labelTray.buttonSet.buttons.push(this.buttonLabelF);
			this.labelTray.buttonSet.buttons.push(this.buttonLabelCl);
			this.labelTray.buttonSet.buttons.push(this.buttonLabelBr);
			this.labelTray.buttonSet.buttons.push(this.buttonLabelI);
			this.labelTray.buttonSet.buttons.push(this.buttonLabelP);
			this.labelTray.buttonSet.buttons.push(this.buttonLabelS);
			this.labelTray.buttonSet.buttons.push(this.buttonLabelSi);
			this.labelTray.buttonSet.buttons.push(this.buttonLabelPT);
			this.drawTools.components.push(this.labelTray);
		}else{
			this.labelSet = new desktop.ButtonSet(self.sketcher.id + '_buttons_label');
			this.labelSet.buttons.push(this.buttonLabel);
			this.labelSet.addDropDown('More Labels');
			this.labelSet.dropDown.defaultButton = this.buttonLabelO;
			this.labelSet.dropDown.buttonSet.buttons.push(this.buttonLabelH);
			this.labelSet.dropDown.buttonSet.buttons.push(this.buttonLabelC);
			this.labelSet.dropDown.buttonSet.buttons.push(this.buttonLabelN);
			this.labelSet.dropDown.buttonSet.buttons.push(this.buttonLabelO);
			this.labelSet.dropDown.buttonSet.buttons.push(this.buttonLabelF);
			this.labelSet.dropDown.buttonSet.buttons.push(this.buttonLabelCl);
			this.labelSet.dropDown.buttonSet.buttons.push(this.buttonLabelBr);
			this.labelSet.dropDown.buttonSet.buttons.push(this.buttonLabelI);
			this.labelSet.dropDown.buttonSet.buttons.push(this.buttonLabelP);
			this.labelSet.dropDown.buttonSet.buttons.push(this.buttonLabelS);
			this.labelSet.dropDown.buttonSet.buttons.push(this.buttonLabelSi);
			this.labelSet.dropDown.buttonSet.buttons.push(this.buttonLabelPT);
		}
	};
	_.makeBondSet = function(self) {
		function createBondButton(order, stereo, append, icon, description){
			return new desktop.Button(self.sketcher.id + '_button_bond_' + append, icon, description, function() {
				self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_NEW_BOND);
				self.sketcher.stateManager.STATE_NEW_BOND.bondOrder = order;
				self.sketcher.stateManager.STATE_NEW_BOND.stereo = stereo;
			});
		};
	
		this.buttonSingle = createBondButton(1, structures.Bond.STEREO_NONE, 'single', imageDepot.BOND_SINGLE, 'Single Bond');
		this.buttonRecessed = createBondButton(1, structures.Bond.STEREO_RECESSED, 'recessed', imageDepot.BOND_RECESSED, 'Recessed Bond');
		this.buttonProtruding = createBondButton(1, structures.Bond.STEREO_PROTRUDING, 'protruding', imageDepot.BOND_PROTRUDING, 'Protruding Bond');
		this.buttonDouble = createBondButton(2, structures.Bond.STEREO_NONE, 'double', imageDepot.BOND_DOUBLE, 'Double Bond');
		this.buttonZero = createBondButton(0, structures.Bond.STEREO_NONE, 'zero', imageDepot.BOND_ZERO, 'Zero Bond (Ionic/Hydrogen)');
		this.buttonCovalent = createBondButton(0, structures.Bond.STEREO_PROTRUDING, 'covalent', imageDepot.BOND_DATIVE, 'Dative Bond');
		this.buttonHalf = createBondButton(0.5, structures.Bond.STEREO_NONE, 'half', imageDepot.BOND_HALF, 'Half Bond');
		this.buttonWavy = createBondButton(1, structures.Bond.STEREO_AMBIGUOUS, 'wavy', imageDepot.BOND_WAVY, 'Wavy Bond');
		this.buttonResonance = createBondButton(1.5, structures.Bond.STEREO_NONE, 'resonance', imageDepot.BOND_RESONANCE, 'Resonance Bond');
		this.buttonDoubleAmbiguous = createBondButton(2, structures.Bond.STEREO_AMBIGUOUS, 'double_ambiguous', imageDepot.BOND_DOUBLE_AMBIGUOUS, 'Ambiguous Double Bond');
		this.buttonTriple = createBondButton(3, structures.Bond.STEREO_NONE, 'triple', imageDepot.BOND_TRIPLE, 'Triple Bond');
		
		this.buttonBond = new desktop.DummyButton(self.sketcher.id + '_button_bond', self.sketcher.floatDrawTools?'Draw Bond':'Other Bond');
		if(self.sketcher.floatDrawTools){
			this.bondTray = new desktop.Tray(self.sketcher, self.sketcher.id + '_buttons_bond', this.buttonBond, 2);
			this.bondTray.defaultButton = this.buttonSingle;
			this.bondTray.buttonSet.buttons.push(this.buttonZero);
			this.bondTray.buttonSet.buttons.push(this.buttonCovalent);
			this.bondTray.buttonSet.buttons.push(this.buttonHalf);
			this.bondTray.buttonSet.buttons.push(this.buttonSingle);
			this.bondTray.buttonSet.buttons.push(this.buttonRecessed);
			this.bondTray.buttonSet.buttons.push(this.buttonProtruding);
			this.bondTray.buttonSet.buttons.push(this.buttonWavy);
			this.bondTray.buttonSet.buttons.push(this.buttonResonance);
			this.bondTray.buttonSet.buttons.push(this.buttonDoubleAmbiguous);
			this.bondTray.buttonSet.buttons.push(this.buttonDouble);
			this.bondTray.buttonSet.buttons.push(this.buttonTriple);
			this.drawTools.components.push(this.bondTray);
		}else{
			this.bondSet = new desktop.ButtonSet(self.sketcher.id + '_buttons_bond');
			this.bondSet.buttons.push(this.buttonSingle);
			this.bondSet.buttons.push(this.buttonRecessed);
			this.bondSet.buttons.push(this.buttonProtruding);
			this.bondSet.buttons.push(this.buttonDouble);
			this.bondSet.buttons.push(this.buttonBond);
			this.bondSet.addDropDown('More Bonds');
			this.bondSet.dropDown.buttonSet.buttons.push(this.buttonZero);
			this.bondSet.dropDown.buttonSet.buttons.push(this.buttonCovalent);
			this.bondSet.dropDown.buttonSet.buttons.push(this.buttonHalf);
			this.bondSet.dropDown.buttonSet.buttons.push(this.buttonWavy);
			this.bondSet.dropDown.buttonSet.buttons.push(this.buttonResonance);
			this.bondSet.dropDown.buttonSet.buttons.push(this.buttonDoubleAmbiguous);
			this.bondSet.dropDown.buttonSet.buttons.push(this.buttonTriple);
			this.bondSet.dropDown.defaultButton = this.buttonTriple;
		}
	};
	_.makeRingSet = function(self) {
		function createRingButton(numSides, unsaturated, append, icon, description){
			return new desktop.Button(self.sketcher.id + '_button_bond_' + append, icon, description, function() {
				self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_NEW_RING);
				self.sketcher.stateManager.STATE_NEW_RING.numSides = numSides;
				self.sketcher.stateManager.STATE_NEW_RING.unsaturated = unsaturated;
			});
		};
		
		this.buttonCyclohexane = createRingButton(6, false, 'cyclohexane', imageDepot.CYCLOHEXANE, 'Cyclohexane Ring');
		this.buttonBenzene = createRingButton(6, true, 'benzene', imageDepot.BENZENE, 'Benzene Ring');
		this.buttonCyclopropane = createRingButton(3, false, 'cyclopropane', imageDepot.CYCLOPROPANE, 'Cyclopropane Ring');
		this.buttonCyclobutane = createRingButton(4, false, 'cyclobutane', imageDepot.CYCLOBUTANE, 'Cyclobutane Ring');
		this.buttonCyclopentane = createRingButton(5, false, 'cyclopentane', imageDepot.CYCLOPENTANE, 'Cyclopentane Ring');
		this.buttonCycloheptane = createRingButton(7, false, 'cycloheptane', imageDepot.CYCLOHEPTANE, 'Cycloheptane Ring');
		this.buttonCyclooctane = createRingButton(8, false, 'cyclooctane', imageDepot.CYCLOOCTANE, 'Cyclooctane Ring');
		this.buttonRingArbitrary =createRingButton(-1, false, 'arbitrary', imageDepot.RING_ARBITRARY, 'Arbitrary Ring Size Tool');
		
		this.buttonRing = new desktop.DummyButton(self.sketcher.id + '_button_ring', self.sketcher.floatDrawTools?'Draw Ring':'Other Ring');
		if(self.sketcher.floatDrawTools){
			this.ringTray = new desktop.Tray(self.sketcher, self.sketcher.id + '_buttons_ring', this.buttonRing, 2);
			this.ringTray.defaultButton = this.buttonCyclohexane;
			this.ringTray.buttonSet.buttons.push(this.buttonCyclopropane);
			this.ringTray.buttonSet.buttons.push(this.buttonCyclobutane);
			this.ringTray.buttonSet.buttons.push(this.buttonCyclopentane);
			this.ringTray.buttonSet.buttons.push(this.buttonCyclohexane);
			this.ringTray.buttonSet.buttons.push(this.buttonCycloheptane);
			this.ringTray.buttonSet.buttons.push(this.buttonCyclooctane);
			this.ringTray.buttonSet.buttons.push(this.buttonBenzene);
			this.ringTray.buttonSet.buttons.push(this.buttonRingArbitrary);
			this.drawTools.components.push(this.ringTray);
		}else{
			this.ringSet = new desktop.ButtonSet(self.sketcher.id + '_buttons_ring');
			this.ringSet.buttons.push(this.buttonCyclohexane);
			this.ringSet.buttons.push(this.buttonBenzene);
			this.ringSet.buttons.push(this.buttonRing);
			this.ringSet.addDropDown('More Rings');
			this.ringSet.dropDown.buttonSet.buttons.push(this.buttonCyclopropane);
			this.ringSet.dropDown.buttonSet.buttons.push(this.buttonCyclobutane);
			this.ringSet.dropDown.buttonSet.buttons.push(this.buttonCyclopentane);
			this.ringSet.dropDown.defaultButton = this.buttonCyclopentane;
			this.ringSet.dropDown.buttonSet.buttons.push(this.buttonCycloheptane);
			this.ringSet.dropDown.buttonSet.buttons.push(this.buttonCyclooctane);
			this.ringSet.dropDown.buttonSet.buttons.push(this.buttonRingArbitrary);
		}
	};
	_.makeAttributeSet = function(self) {
		this.buttonChargePlus = new desktop.Button(self.sketcher.id + '_button_attribute_charge_increment', imageDepot.INCREASE_CHARGE, 'Increase Charge', function() {
			self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_CHARGE);
			self.sketcher.stateManager.STATE_CHARGE.delta = 1;
		});
		this.buttonChargeMinus = new desktop.Button(self.sketcher.id + '_button_attribute_charge_decrement', imageDepot.DECREASE_CHARGE, 'Decrease Charge', function() {
			self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_CHARGE);
			self.sketcher.stateManager.STATE_CHARGE.delta = -1;
		});
		this.buttonPairPlus = new desktop.Button(self.sketcher.id + '_button_attribute_lonePair_increment', imageDepot.ADD_LONE_PAIR, 'Add Lone Pair', function() {
			self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_LONE_PAIR);
			self.sketcher.stateManager.STATE_LONE_PAIR.delta = 1;
		});
		this.buttonPairMinus = new desktop.Button(self.sketcher.id + '_button_attribute_lonePair_decrement', imageDepot.REMOVE_LONE_PAIR, 'Remove Lone Pair', function() {
			self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_LONE_PAIR);
			self.sketcher.stateManager.STATE_LONE_PAIR.delta = -1;
		});
		this.buttonRadicalPlus = new desktop.Button(self.sketcher.id + '_button_attribute_radical_increment', imageDepot.ADD_RADICAL, 'Add Radical', function() {
			self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_RADICAL);
			self.sketcher.stateManager.STATE_RADICAL.delta = 1;
		});
		this.buttonRadicalMinus = new desktop.Button(self.sketcher.id + '_button_attribute_radical_decrement', imageDepot.REMOVE_RADICAL, 'Remove Radical', function() {
			self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_RADICAL);
			self.sketcher.stateManager.STATE_RADICAL.delta = -1;
		});
		this.buttonIsotope = new desktop.Button(self.sketcher.id + '_button_attribute_isotope', imageDepot.ISOTOPE, 'Set Isotope Value', function() {
			self.sketcher.stateManager.STATE_ATTRIBUTE_INPUT.type = 0;
			self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_ATTRIBUTE_INPUT);
		});
		this.buttonImplicitHydrogen = new desktop.Button(self.sketcher.id + '_button_attribute_implicit_hydrogen', imageDepot.IMPLICITH, 'Set Implicit Hydrogen Count', function() {
			self.sketcher.stateManager.STATE_ATTRIBUTE_INPUT.type = 1;
			self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_ATTRIBUTE_INPUT);
		});
		this.buttonEnhancedStereo = new desktop.Button(self.sketcher.id + '_button_attribute_enhanced_stereo', imageDepot.ESTEREO, 'Define Enhanced Stereochemistry', function() {
			self.sketcher.stateManager.STATE_ATTRIBUTE_INPUT.type = 2;
			self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_ATTRIBUTE_INPUT);
		});
	
		this.buttonAttribute = new desktop.DummyButton(self.sketcher.id + '_button_attribute', 'Attributes');
		if(self.sketcher.floatDrawTools){
			this.attributeTray = new desktop.Tray(self.sketcher, self.sketcher.id + '_buttons_attribute', this.buttonAttribute, 2);
			this.attributeTray.defaultButton = this.buttonChargePlus;
			this.attributeTray.buttonSet.buttons.push(this.buttonChargeMinus);
			this.attributeTray.buttonSet.buttons.push(this.buttonChargePlus);
			this.attributeTray.buttonSet.buttons.push(this.buttonPairMinus);
			this.attributeTray.buttonSet.buttons.push(this.buttonPairPlus);
			this.attributeTray.buttonSet.buttons.push(this.buttonRadicalMinus);
			this.attributeTray.buttonSet.buttons.push(this.buttonRadicalPlus);
			this.attributeTray.buttonSet.buttons.push(this.buttonIsotope);
			this.attributeTray.buttonSet.buttons.push(this.buttonImplicitHydrogen);
			this.attributeTray.buttonSet.buttons.push(this.buttonEnhancedStereo);
			this.drawTools.components.push(this.attributeTray);
		}else{
			this.attributeSet = new desktop.ButtonSet(self.sketcher.id + '_buttons_attribute');
			this.attributeSet.buttons.push(this.buttonAttribute);
			this.attributeSet.addDropDown('More Attributes');
			this.attributeSet.dropDown.buttonSet.buttons.push(this.buttonChargePlus);
			this.attributeSet.dropDown.buttonSet.buttons.push(this.buttonChargeMinus);
			this.attributeSet.dropDown.buttonSet.buttons.push(this.buttonPairPlus);
			this.attributeSet.dropDown.buttonSet.buttons.push(this.buttonPairMinus);
			this.attributeSet.dropDown.buttonSet.buttons.push(this.buttonRadicalPlus);
			this.attributeSet.dropDown.buttonSet.buttons.push(this.buttonRadicalMinus);
			this.attributeSet.dropDown.buttonSet.buttons.push(this.buttonIsotope);
			this.attributeSet.dropDown.buttonSet.buttons.push(this.buttonImplicitHydrogen);
			this.attributeSet.dropDown.buttonSet.buttons.push(this.buttonEnhancedStereo);
		}
	};
	_.makeShapeSet = function(self) {
		this.buttonArrowSynthetic = new desktop.Button(self.sketcher.id + '_button_shape_arrow_synthetic', imageDepot.ARROW_SYNTHETIC, 'Synthetic Arrow', function() {
			self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_SHAPE);
			self.sketcher.stateManager.STATE_SHAPE.shapeType = states.ShapeState.ARROW_SYNTHETIC;
		});
		this.buttonArrowRetrosynthetic = new desktop.Button(self.sketcher.id + '_button_shape_arrow_retrosynthetic', imageDepot.ARROW_RETROSYNTHETIC, 'Retrosynthetic Arrow', function() {
			self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_SHAPE);
			self.sketcher.stateManager.STATE_SHAPE.shapeType = states.ShapeState.ARROW_RETROSYNTHETIC;
		});
		this.buttonArrowResonance = new desktop.Button(self.sketcher.id + '_button_shape_arrow_resonance', imageDepot.ARROW_RESONANCE, 'Resonance Arrow', function() {
			self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_SHAPE);
			self.sketcher.stateManager.STATE_SHAPE.shapeType = states.ShapeState.ARROW_RESONANCE;
		});
		this.buttonArrowEquilibrum = new desktop.Button(self.sketcher.id + '_button_shape_arrow_equilibrium', imageDepot.ARROW_EQUILIBRIUM, 'Equilibrium Arrow', function() {
			self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_SHAPE);
			self.sketcher.stateManager.STATE_SHAPE.shapeType = states.ShapeState.ARROW_EQUILIBRIUM;
		});
		this.buttonReactionMapping = new desktop.Button(self.sketcher.id + '_button_reaction_mapping', imageDepot.ATOM_REACTION_MAP, 'Reaction Mapping', function() {
			self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_PUSHER);
			self.sketcher.stateManager.STATE_PUSHER.numElectron = -10;
		});
		this.buttonPusher1 = new desktop.Button(self.sketcher.id + '_button_shape_pusher_1', imageDepot.PUSHER_SINGLE, 'Single Electron Pusher', function() {
			self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_PUSHER);
			self.sketcher.stateManager.STATE_PUSHER.numElectron = 1;
		});
		this.buttonPusher2 = new desktop.Button(self.sketcher.id + '_button_shape_pusher_2', imageDepot.PUSHER_DOUBLE, 'Electron Pair Pusher', function() {
			self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_PUSHER);
			self.sketcher.stateManager.STATE_PUSHER.numElectron = 2;
		});
		this.buttonPusherBond = new desktop.Button(self.sketcher.id + '_button_shape_pusher_bond_forming', imageDepot.PUSHER_BOND_FORMING, 'Bond Forming Pusher', function() {
			self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_PUSHER);
			self.sketcher.stateManager.STATE_PUSHER.numElectron = -1;
		});
		this.buttonReactionMapping = new desktop.Button(self.sketcher.id + '_button_reaction_mapping', imageDepot.ATOM_REACTION_MAP, 'Reaction Mapping', function() {
			self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_PUSHER);
			self.sketcher.stateManager.STATE_PUSHER.numElectron = -10;
		});
		this.buttonBracket = new desktop.Button(self.sketcher.id + '_button_shape_charge_bracket', imageDepot.BRACKET_CHARGE, 'Bracket', function() {
			self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_SHAPE);
			self.sketcher.stateManager.STATE_SHAPE.shapeType = states.ShapeState.BRACKET;
			self.sketcher.repaint();
		});
		this.buttonRepeatUnit = new desktop.Button(self.sketcher.id + '_button_repeat_unit', imageDepot.BRACKET_REPEAT_UNIT, 'Repeat Unit', function() {
			self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_REPEAT_UNIT);
		});
		this.buttonVAP = new desktop.Button(self.sketcher.id + '_button_vap', imageDepot.VARIABLE_ATTACHMENT_POINTS, 'Variable Attachment Points', function() {
			self.sketcher.stateManager.setState(self.sketcher.stateManager.STATE_VAP);
		});
		
		if(!this.sketcher.oneMolecule){
			this.buttonShape = new desktop.DummyButton(self.sketcher.id + '_button_shape', self.sketcher.floatDrawTools?'Reactions':'Shapes');
			if(self.sketcher.floatDrawTools){
				this.shapeTray = new desktop.Tray(self.sketcher, self.sketcher.id + '_buttons_shape', this.buttonShape, 4);
				this.shapeTray.defaultButton = this.buttonArrowSynthetic;
				this.shapeTray.buttonSet.buttons.push(this.buttonArrowSynthetic);
				this.shapeTray.buttonSet.buttons.push(this.buttonArrowRetrosynthetic);
				this.shapeTray.buttonSet.buttons.push(this.buttonArrowResonance);
				this.shapeTray.buttonSet.buttons.push(this.buttonArrowEquilibrum);
				this.shapeTray.buttonSet.buttons.push(this.buttonPusher1);
				this.shapeTray.buttonSet.buttons.push(this.buttonPusher2);
				this.shapeTray.buttonSet.buttons.push(this.buttonPusherBond);
				this.shapeTray.buttonSet.buttons.push(this.buttonReactionMapping);
				this.drawTools.components.push(this.shapeTray);
				this.buttonBrackets = new desktop.DummyButton(self.sketcher.id + '_button_bracket', 'Brackets');
				this.bracketTray = new desktop.Tray(self.sketcher, self.sketcher.id + '_buttons_bracket', this.buttonBrackets, 2);
				this.bracketTray.buttonSet.buttons.push(this.buttonBracket);
				this.bracketTray.buttonSet.buttons.push(this.buttonRepeatUnit);
				this.drawTools.components.push(this.bracketTray);
			}else{
				this.shapeSet = new desktop.ButtonSet(self.sketcher.id + '_buttons_shape');
				this.shapeSet.buttons.push(this.buttonShape);
				this.shapeSet.addDropDown('More Shapes');
				this.shapeSet.dropDown.buttonSet.buttons.push(this.buttonArrowSynthetic);
				this.shapeSet.dropDown.buttonSet.buttons.push(this.buttonArrowRetrosynthetic);
				this.shapeSet.dropDown.buttonSet.buttons.push(this.buttonArrowResonance);
				this.shapeSet.dropDown.buttonSet.buttons.push(this.buttonArrowEquilibrum);
				this.shapeSet.dropDown.buttonSet.buttons.push(this.buttonPusher1);
				this.shapeSet.dropDown.buttonSet.buttons.push(this.buttonPusher2);
				this.shapeSet.dropDown.buttonSet.buttons.push(this.buttonPusherBond);
				this.shapeSet.dropDown.buttonSet.buttons.push(this.buttonReactionMapping);
				this.shapeSet.dropDown.buttonSet.buttons.push(this.buttonBracket);
				this.shapeSet.dropDown.buttonSet.buttons.push(this.buttonRepeatUnit);
				this.shapeSet.dropDown.buttonSet.buttons.push(this.buttonVAP);
			}
		}
	};

})(ChemDoodle, ChemDoodle.iChemLabs, ChemDoodle.io, ChemDoodle.structures, ChemDoodle.uis.actions, ChemDoodle.uis.gui, ChemDoodle.uis.gui.imageDepot, ChemDoodle.uis.gui.desktop, ChemDoodle.uis.tools, ChemDoodle.uis.states, ChemDoodle.components, ChemDoodle.ELEMENT, document);

(function(actions, undefined) {
	'use strict';
	actions._Action = function() {};
	let _ = actions._Action.prototype;
	_.forward = function(sketcher) {
		this.innerForward();
		this.checks(sketcher);
	};
	_.reverse = function(sketcher) {
		this.innerReverse();
		this.checks(sketcher);
	};
	_.checks = function(sketcher) {
		if(sketcher){
			for ( let i = 0, ii = sketcher.molecules.length; i < ii; i++) {
				sketcher.molecules[i].check();
			}
			if (sketcher.lasso && sketcher.lasso.isActive()) {
				sketcher.lasso.setBounds();
			}
			sketcher.checksOnAction();
			sketcher.repaint();
		}
	};

})(ChemDoodle.uis.actions);

(function(actions, undefined) {
	'use strict';
	actions.CompoundAction = function() {
		this.actions = [];
	};
	let _ = actions.CompoundAction.prototype = new actions._Action();
	_.innerForward = function() {
		for(let i = 0, ii = this.actions.length; i<ii; i++){
			this.actions[i].innerForward();
		}
	};
	_.innerReverse = function() {
		// reversing needs to go in the opposite direction
		for(let i = this.actions.length-1; i>=0; i--){
			this.actions[i].innerReverse();
		}
	};

})(ChemDoodle.uis.actions);

(function(informatics, structures, actions, undefined) {
	'use strict';
	actions.AddAction = function(sketcher, a, as, bs) {
		this.sketcher = sketcher;
		this.a = a;
		this.as = as;
		this.bs = bs;
	};
	let _ = actions.AddAction.prototype = new actions._Action();
	_.innerForward = function() {
		let mol = this.sketcher.getMoleculeByAtom(this.a);
		if (!mol) {
			mol = new structures.Molecule();
			this.sketcher.molecules.push(mol);
		}
		if (this.as) {
			for ( let i = 0, ii = this.as.length; i < ii; i++) {
				mol.atoms.push(this.as[i]);
			}
		}
		if (this.bs) {
			let merging = [];
			for ( let i = 0, ii = this.bs.length; i < ii; i++) {
				let b = this.bs[i];
				if (mol.atoms.indexOf(b.a1) === -1) {
					let otherMol = this.sketcher.getMoleculeByAtom(b.a1);
					if (merging.indexOf(otherMol) === -1) {
						merging.push(otherMol);
					}
				}
				if (mol.atoms.indexOf(b.a2) === -1) {
					let otherMol = this.sketcher.getMoleculeByAtom(b.a2);
					if (merging.indexOf(otherMol) === -1) {
						merging.push(otherMol);
					}
				}
				mol.bonds.push(b);
			}
			for ( let i = 0, ii = merging.length; i < ii; i++) {
				let molRemoving = merging[i];
				this.sketcher.removeMolecule(molRemoving);
				mol.atoms = mol.atoms.concat(molRemoving.atoms);
				mol.bonds = mol.bonds.concat(molRemoving.bonds);
			}
		}
	};
	_.innerReverse = function() {
		let mol = this.sketcher.getMoleculeByAtom(this.a);
		if (this.as) {
			let aKeep = [];
			for ( let i = 0, ii = mol.atoms.length; i < ii; i++) {
				if (this.as.indexOf(mol.atoms[i]) === -1) {
					aKeep.push(mol.atoms[i]);
				}
			}
			mol.atoms = aKeep;
		}
		if (this.bs) {
			let bKeep = [];
			for ( let i = 0, ii = mol.bonds.length; i < ii; i++) {
				if (this.bs.indexOf(mol.bonds[i]) === -1) {
					bKeep.push(mol.bonds[i]);
				}
			}
			mol.bonds = bKeep;
		}
		if (mol.atoms.length === 0) {
			// remove molecule if it is empty
			this.sketcher.removeMolecule(mol);
		} else {
			let split = new informatics.Splitter().split(mol);
			if (split.length > 1) {
				this.sketcher.removeMolecule(mol);
				for ( let i = 0, ii = split.length; i < ii; i++) {
					this.sketcher.molecules.push(split[i]);
				}
			}
		}
	};

})(ChemDoodle.informatics, ChemDoodle.structures, ChemDoodle.uis.actions);

(function(actions, undefined) {
	'use strict';
	actions.AddContentAction = function(sketcher, mols, shapes) {
		this.sketcher = sketcher;
		this.mols = mols;
		this.shapes = shapes;
	};
	let _ = actions.AddContentAction.prototype = new actions._Action();
	_.innerForward = function() {
		this.sketcher.molecules = this.sketcher.molecules.concat(this.mols);
		this.sketcher.shapes = this.sketcher.shapes.concat(this.shapes);
	};
	_.innerReverse = function() {
		for(let i = 0, ii = this.mols.length; i<ii; i++){
			this.sketcher.removeMolecule(this.mols[i]);
		}
		for(let i = 0, ii = this.shapes.length; i<ii; i++){
			this.sketcher.removeShape(this.shapes[i]);
		}
	};

})(ChemDoodle.uis.actions);

(function(actions, undefined) {
	'use strict';
	actions.AddShapeAction = function(sketcher, s) {
		this.sketcher = sketcher;
		this.s = s;
	};
	let _ = actions.AddShapeAction.prototype = new actions._Action();
	_.innerForward = function() {
		this.sketcher.shapes.push(this.s);
	};
	_.innerReverse = function() {
		this.sketcher.removeShape(this.s);
	};

})(ChemDoodle.uis.actions);
(function(actions, undefined) {
	'use strict';
	actions.AddVAPAttachementAction = function(vap, a, substituent) {
		this.vap = vap;
		this.a = a;
		this.substituent = substituent;
	};
	let _ = actions.AddVAPAttachementAction.prototype = new actions._Action();
	_.innerForward = function() {
		if(this.substituent){
			this.vap.substituent = this.a;
		}else{
			this.vap.attachments.push(this.a);
		}
	};
	_.innerReverse = function() {
		if(this.substituent){
			this.vap.substituent = undefined;
		}else{
			this.vap.attachments.pop();
		}
	};

})(ChemDoodle.uis.actions);
(function(actions, Bond, m, undefined) {
	'use strict';
	actions.ChangeBondAction = function(b, orderAfter, stereoAfter) {
		if(b){
			this.b = b;
			this.orderBefore = b.bondOrder;
			this.stereoBefore = b.stereo;
			if (orderAfter===undefined) {
				// increment order
				// make sure to floor so half bond types increment correctly
				this.orderAfter = m.floor(b.bondOrder + 1);
				if (this.orderAfter > 3) {
					this.orderAfter = 1;
				}
				this.stereoAfter = Bond.STEREO_NONE;
			} else {
				this.orderAfter = orderAfter;
				this.stereoAfter = stereoAfter;
			}
		}
	};
	let _ = actions.ChangeBondAction.prototype = new actions._Action();
	_.innerForward = function() {
		this.b.bondOrder = this.orderAfter;
		this.b.stereo = this.stereoAfter;
	};
	_.innerReverse = function() {
		this.b.bondOrder = this.orderBefore;
		this.b.stereo = this.stereoBefore;
	};

})(ChemDoodle.uis.actions, ChemDoodle.structures.Bond, Math);
(function(actions, m, undefined) {
	'use strict';
	actions.ChangeRepeatUnitAttributeAction = function(s, type) {
		this.s = s;
		this.type = type;
	};
	let _ = actions.ChangeRepeatUnitAttributeAction.prototype = new actions._Action();
	_.innerForward = function() {
		let c = this.type > 0 ? 1 : -1;
		switch (m.abs(this.type)) {
		case 1:
			this.s.n1 += c;
			break;
		case 2:
			this.s.n2 += c;
			break;
		}
	};
	_.innerReverse = function() {
		let c = this.type > 0 ? -1 : 1;
		switch (m.abs(this.type)) {
		case 1:
			this.s.n1 += c;
			break;
		case 2:
			this.s.n2 += c;
			break;
		}
	};

})(ChemDoodle.uis.actions, Math);
(function(actions, m, undefined) {
	'use strict';
	actions.ChangeBracketAttributeAction = function(s, type) {
		this.s = s;
		this.type = type;
	};
	let _ = actions.ChangeBracketAttributeAction.prototype = new actions._Action();
	_.innerForward = function() {
		let c = this.type > 0 ? 1 : -1;
		switch (m.abs(this.type)) {
		case 1:
			this.s.charge += c;
			break;
		case 2:
			this.s.repeat += c;
			break;
		case 3:
			this.s.mult += c;
			break;
		}
	};
	_.innerReverse = function() {
		let c = this.type > 0 ? -1 : 1;
		switch (m.abs(this.type)) {
		case 1:
			this.s.charge += c;
			break;
		case 2:
			this.s.repeat += c;
			break;
		case 3:
			this.s.mult += c;
			break;
		}
	};

})(ChemDoodle.uis.actions, Math);
(function(actions, undefined) {
	'use strict';
	actions.ChangeChargeAction = function(a, delta) {
		this.a = a;
		this.delta = delta;
	};
	let _ = actions.ChangeChargeAction.prototype = new actions._Action();
	_.innerForward = function() {
		this.a.charge += this.delta;
	};
	_.innerReverse = function() {
		this.a.charge -= this.delta;
	};

})(ChemDoodle.uis.actions);
(function(actions, undefined) {
	'use strict';
	actions.ChangeCoordinatesAction = function(as, newCoords) {
		this.as = as;
		this.recs = [];
		for ( let i = 0, ii = this.as.length; i < ii; i++) {
			this.recs[i] = {
				'xo' : this.as[i].x,
				'yo' : this.as[i].y,
				'xn' : newCoords[i].x,
				'yn' : newCoords[i].y
			};
		}
	};
	let _ = actions.ChangeCoordinatesAction.prototype = new actions._Action();
	_.innerForward = function() {
		for ( let i = 0, ii = this.as.length; i < ii; i++) {
			this.as[i].x = this.recs[i].xn;
			this.as[i].y = this.recs[i].yn;
		}
	};
	_.innerReverse = function() {
		for ( let i = 0, ii = this.as.length; i < ii; i++) {
			this.as[i].x = this.recs[i].xo;
			this.as[i].y = this.recs[i].yo;
		}
	};

})(ChemDoodle.uis.actions);
(function(actions, undefined) {
	'use strict';
	actions.ChangeEnhancedStereoAction = function(a, type, group) {
		this.a = a;
		this.oldType = a.enhancedStereo.type;
		this.oldGroup = a.enhancedStereo.group;
		this.type = type;
		this.group = group;
	};
	let _ = actions.ChangeEnhancedStereoAction.prototype = new actions._Action();
	_.innerForward = function() {
		this.a.enhancedStereo.type = this.type;
		this.a.enhancedStereo.group = this.group;
	};
	_.innerReverse = function() {
		this.a.enhancedStereo.type = this.oldType;
		this.a.enhancedStereo.group = this.oldGroup;
	};

})(ChemDoodle.uis.actions);
(function(actions, undefined) {
	'use strict';
	actions.ChangeLabelAction = function(a, after) {
		this.a = a;
		this.before = a.label;
		this.after = after;
	};
	let _ = actions.ChangeLabelAction.prototype = new actions._Action();
	_.innerForward = function() {
		this.a.label = this.after;
	};
	_.innerReverse = function() {
		this.a.label = this.before;
	};

})(ChemDoodle.uis.actions);
(function(actions, undefined) {
	'use strict';
	actions.ChangeLonePairAction = function(a, delta) {
		this.a = a;
		this.delta = delta;
	};
	let _ = actions.ChangeLonePairAction.prototype = new actions._Action();
	_.innerForward = function() {
		this.a.numLonePair += this.delta;
	};
	_.innerReverse = function() {
		this.a.numLonePair -= this.delta;
	};

})(ChemDoodle.uis.actions);
(function(actions, undefined) {
	'use strict';
	actions.ChangeQueryAction = function(o, after) {
		this.o = o;
		this.before = o.query;
		this.after = after;
	};
	let _ = actions.ChangeQueryAction.prototype = new actions._Action();
	_.innerForward = function() {
		this.o.query = this.after;
	};
	_.innerReverse = function() {
		this.o.query = this.before;
	};

})(ChemDoodle.uis.actions);
(function(actions, undefined) {
	'use strict';
	actions.ChangeRadicalAction = function(a, delta) {
		this.a = a;
		this.delta = delta;
	};
	let _ = actions.ChangeRadicalAction.prototype = new actions._Action();
	_.innerForward = function() {
		this.a.numRadical += this.delta;
	};
	_.innerReverse = function() {
		this.a.numRadical -= this.delta;
	};

})(ChemDoodle.uis.actions);
(function(actions, undefined) {
	'use strict';
	actions.ChangeImplicitHydrogenAction = function(a, val) {
		this.a = a;
		this.old = a.implicitH;
		this.val = val;
	};
	let _ = actions.ChangeImplicitHydrogenAction.prototype = new actions._Action();
	_.innerForward = function() {
		this.a.implicitH = this.val;
	};
	_.innerReverse = function() {
		this.a.implicitH = this.old;
	};

})(ChemDoodle.uis.actions);
(function(actions, undefined) {
	'use strict';
	actions.ChangeIsotopeAction = function(a, val) {
		this.a = a;
		this.old = a.mass;
		this.val = val;
	};
	let _ = actions.ChangeIsotopeAction.prototype = new actions._Action();
	_.innerForward = function() {
		this.a.mass = this.val;
	};
	_.innerReverse = function() {
		this.a.mass = this.old;
	};

})(ChemDoodle.uis.actions);
(function(actions, Bond, m, undefined) {
	'use strict';
	actions.ChangeVAPOrderAction = function(vap, orderAfter) {
		this.vap = vap;
		this.orderBefore = vap.bondType;
		this.orderAfter = orderAfter;
	};
	let _ = actions.ChangeVAPOrderAction.prototype = new actions._Action();
	_.innerForward = function() {
		this.vap.bondType = this.orderAfter;
	};
	_.innerReverse = function() {
		this.vap.bondType = this.orderBefore;
	};

})(ChemDoodle.uis.actions, ChemDoodle.structures.Bond, Math);
(function(actions, Bond, m, undefined) {
	'use strict';
	actions.ChangeVAPSubstituentAction = function(vap, nsub) {
		this.vap = vap;
		this.nsub = nsub;
		this.orderBefore = vap.bondType;
		this.osub = vap.substituent;
	};
	let _ = actions.ChangeVAPSubstituentAction.prototype = new actions._Action();
	_.innerForward = function() {
		this.vap.bondType = 1;
		this.vap.substituent = this.nsub;
		this.vap.attachments.splice(this.vap.attachments.indexOf(this.nsub), 1);
		if(this.osub){
			this.vap.attachments.push(this.osub);
		}
	};
	_.innerReverse = function() {
		this.vap.bondType = this.orderBefore;
		this.vap.substituent = this.osub;
		if(this.osub){
			this.vap.attachments.pop();
		}
		this.vap.attachments.push(this.nsub);
	};

})(ChemDoodle.uis.actions, ChemDoodle.structures.Bond, Math);
(function(structures, actions, undefined) {
	'use strict';
	actions.ClearAction = function(sketcher) {
		this.sketcher = sketcher;
		this.beforeMols = this.sketcher.molecules;
		this.beforeShapes = this.sketcher.shapes;
		this.sketcher.clear();
		if (this.sketcher.oneMolecule && !this.sketcher.setupScene) {
			this.afterMol = new structures.Molecule();
			this.afterMol.atoms.push(new structures.Atom());
			this.sketcher.molecules.push(this.afterMol);
			this.sketcher.center();
			this.sketcher.repaint();
		}
	};
	let _ = actions.ClearAction.prototype = new actions._Action();
	_.innerForward = function() {
		this.sketcher.molecules = [];
		this.sketcher.shapes = [];
		if (this.sketcher.oneMolecule && !this.sketcher.setupScene) {
			this.sketcher.molecules.push(this.afterMol);
		}
	};
	_.innerReverse = function() {
		this.sketcher.molecules = this.beforeMols;
		this.sketcher.shapes = this.beforeShapes;
	};

})(ChemDoodle.structures, ChemDoodle.uis.actions);
(function(actions, undefined) {
	'use strict';
	actions.DeleteAction = function(sketcher, a, as, bs) {
		this.sketcher = sketcher;
		this.a = a;
		this.as = as;
		this.bs = bs;
		this.ss = [];
	};
	let _ = actions.DeleteAction.prototype = new actions._Action();
	_.innerForwardAReverse = actions.AddAction.prototype.innerReverse;
	_.innerReverseAForward = actions.AddAction.prototype.innerForward;
	_.innerForward = function() {
		this.innerForwardAReverse();
		for ( let i = 0, ii = this.ss.length; i < ii; i++) {
			this.sketcher.removeShape(this.ss[i]);
		}
	};
	_.innerReverse = function() {
		this.innerReverseAForward();
		if (this.ss.length > 0) {
			this.sketcher.shapes = this.sketcher.shapes.concat(this.ss);
		}
	};

})(ChemDoodle.uis.actions);

(function(informatics, actions, undefined) {
	'use strict';
	actions.DeleteContentAction = function(sketcher, as, ss) {
		this.sketcher = sketcher;
		this.as = as;
		this.ss = ss;
		this.bs = [];
		for ( let i = 0, ii = this.sketcher.molecules.length; i < ii; i++) {
			let mol = this.sketcher.molecules[i];
			for ( let j = 0, jj = mol.bonds.length; j < jj; j++) {
				let b = mol.bonds[j];
				if (b.a1.isLassoed || b.a2.isLassoed) {
					this.bs.push(b);
				}
			}
		}
	};
	let _ = actions.DeleteContentAction.prototype = new actions._Action();
	_.innerForward = function() {
		for ( let i = 0, ii = this.ss.length; i < ii; i++) {
			this.sketcher.removeShape(this.ss[i]);
		}
		let asKeep = [];
		let bsKeep = [];
		for ( let i = 0, ii = this.sketcher.molecules.length; i < ii; i++) {
			let mol = this.sketcher.molecules[i];
			for ( let j = 0, jj = mol.atoms.length; j < jj; j++) {
				let a = mol.atoms[j];
				if (this.as.indexOf(a) === -1) {
					asKeep.push(a);
				}
			}
			for ( let j = 0, jj = mol.bonds.length; j < jj; j++) {
				let b = mol.bonds[j];
				if (this.bs.indexOf(b) === -1) {
					bsKeep.push(b);
				}
			}
		}
		this.sketcher.molecules = new informatics.Splitter().split({
			atoms : asKeep,
			bonds : bsKeep
		});
	};
	_.innerReverse = function() {
		this.sketcher.shapes = this.sketcher.shapes.concat(this.ss);
		let asKeep = [];
		let bsKeep = [];
		for ( let i = 0, ii = this.sketcher.molecules.length; i < ii; i++) {
			let mol = this.sketcher.molecules[i];
			asKeep = asKeep.concat(mol.atoms);
			bsKeep = bsKeep.concat(mol.bonds);
		}
		this.sketcher.molecules = new informatics.Splitter().split({
			atoms : asKeep.concat(this.as),
			bonds : bsKeep.concat(this.bs)
		});
	};

})(ChemDoodle.informatics, ChemDoodle.uis.actions);
(function(actions, undefined) {
	'use strict';
	actions.DeleteShapeAction = function(sketcher, s) {
		this.sketcher = sketcher;
		this.s = s;
	};
	let _ = actions.DeleteShapeAction.prototype = new actions._Action();
	_.innerForward = actions.AddShapeAction.prototype.innerReverse;
	_.innerReverse = actions.AddShapeAction.prototype.innerForward;

})(ChemDoodle.uis.actions);
(function(actions, undefined) {
	'use strict';
	actions.DeleteVAPConnectionAction = function(vap, connection) {
		this.vap = vap;
		this.connection = connection;
		this.substituent = vap.substituent===connection;
	};
	let _ = actions.DeleteVAPConnectionAction.prototype = new actions._Action();
	_.innerForward = function() {
		if(this.substituent){
			this.vap.substituent = undefined;
		}else{
			this.vap.attachments.splice(this.vap.attachments.indexOf(this.connection), 1);
		}
	};
	_.innerReverse = function() {
		if(this.substituent){
			this.vap.substituent = this.connection;
		}else{
			this.vap.attachments.push(this.connection);
		}
	};

})(ChemDoodle.uis.actions);
(function(structures, actions, m, undefined) {
	'use strict';
	actions.FlipAction = function(ps, bs, horizontal) {
		this.ps = ps;
		this.bs = bs;
		let minX = Infinity, minY = Infinity;
		let maxX = -Infinity, maxY = -Infinity;
		for ( let i = 0, ii = this.ps.length; i < ii; i++) {
			minX = m.min(this.ps[i].x, minX);
			minY = m.min(this.ps[i].y, minY);
			maxX = m.max(this.ps[i].x, maxX);
			maxY = m.max(this.ps[i].y, maxY);
		}
		this.center = new structures.Point((maxX + minX) / 2, (maxY + minY) / 2);
		this.horizontal = horizontal;		
	};
	let _ = actions.FlipAction.prototype = new actions._Action();
	_.innerForward = _.innerReverse = function() {
		for ( let i = 0, ii = this.ps.length; i < ii; i++) {
			let p = this.ps[i];
			if(this.horizontal){
				p.x += 2*(this.center.x-p.x);
			}else{
				p.y += 2*(this.center.y-p.y);
			}
		}
		for(let i = 0, ii = this.bs.length; i<ii; i++){
			let b = this.bs[i];
			if(b.stereo===structures.Bond.STEREO_PROTRUDING){
				b.stereo = structures.Bond.STEREO_RECESSED;
			}else if(b.stereo===structures.Bond.STEREO_RECESSED){
				b.stereo = structures.Bond.STEREO_PROTRUDING;
			}
		}
	};

})(ChemDoodle.structures, ChemDoodle.uis.actions, Math);
(function(actions, undefined) {
	'use strict';
	actions.FlipBondAction = function(b) {
		this.b = b;
	};
	let _ = actions.FlipBondAction.prototype = new actions._Action();
	_.innerForward = function() {
		let temp = this.b.a1;
		this.b.a1 = this.b.a2;
		this.b.a2 = temp;
	};
	_.innerReverse = function() {
		this.innerForward();
	};

})(ChemDoodle.uis.actions);
(function(actions, undefined) {
	'use strict';
	actions.FlipRepeatUnitAction = function(b) {
		this.b = b;
	};
	let _ = actions.FlipRepeatUnitAction.prototype = new actions._Action();
	_.innerReverse = _.innerForward = function() {
		this.b.flip = !this.b.flip;
	};

})(ChemDoodle.uis.actions);
(function(actions, undefined) {
	'use strict';
	actions.MoveAction = function(ps, dif) {
		this.ps = ps;
		this.dif = dif;
	};
	let _ = actions.MoveAction.prototype = new actions._Action();
	_.innerForward = function() {
		for ( let i = 0, ii = this.ps.length; i < ii; i++) {
			this.ps[i].add(this.dif);
		}
	};
	_.innerReverse = function() {
		for ( let i = 0, ii = this.ps.length; i < ii; i++) {
			this.ps[i].sub(this.dif);
		}
	};

})(ChemDoodle.uis.actions);

(function(structures, actions, undefined) {
	'use strict';
	actions.NewMoleculeAction = function(sketcher, as, bs) {
		this.sketcher = sketcher;
		this.as = as;
		this.bs = bs;
	};
	let _ = actions.NewMoleculeAction.prototype = new actions._Action();
	_.innerForward = function() {
		let mol = new structures.Molecule();
		mol.atoms = mol.atoms.concat(this.as);
		mol.bonds = mol.bonds.concat(this.bs);
		mol.check();
		this.sketcher.addMolecule(mol);
	};
	_.innerReverse = function() {
		this.sketcher.removeMolecule(this.sketcher.getMoleculeByAtom(this.as[0]));
	};

})(ChemDoodle.structures, ChemDoodle.uis.actions);
(function(actions, m, undefined) {
	'use strict';
	actions.RotateAction = function(ps, dif, center) {
		this.ps = ps;
		this.dif = dif;
		this.center = center;
	};
	let _ = actions.RotateAction.prototype = new actions._Action();
	_.innerForward = function() {
		for ( let i = 0, ii = this.ps.length; i < ii; i++) {
			let p = this.ps[i];
			let dist = this.center.distance(p);
			let angle = this.center.angle(p) + this.dif;
			p.x = this.center.x + dist * m.cos(angle);
			p.y = this.center.y - dist * m.sin(angle);
		}
	};
	_.innerReverse = function() {
		for ( let i = 0, ii = this.ps.length; i < ii; i++) {
			let p = this.ps[i];
			let dist = this.center.distance(p);
			let angle = this.center.angle(p) - this.dif;
			p.x = this.center.x + dist * m.cos(angle);
			p.y = this.center.y - dist * m.sin(angle);
		}
	};

})(ChemDoodle.uis.actions, Math);

(function(actions, undefined) {
	'use strict';
	actions.SwitchContentAction = function(sketcher, mols, shapes) {
		this.sketcher = sketcher;
		this.beforeMols = this.sketcher.molecules;
		this.beforeShapes = this.sketcher.shapes;
		this.molsA = mols;
		this.shapesA = shapes;
	};
	let _ = actions.SwitchContentAction.prototype = new actions._Action();
	_.innerForward = function() {
		this.sketcher.loadContent(this.molsA, this.shapesA);
	};
	_.innerReverse = function() {
		this.sketcher.molecules = this.beforeMols;
		this.sketcher.shapes = this.beforeShapes;
	};

})(ChemDoodle.uis.actions);

(function(actions, undefined) {
	'use strict';
	actions.SwitchMoleculeAction = function(sketcher, mol) {
		this.sketcher = sketcher;
		this.beforeMols = this.sketcher.molecules;
		this.beforeShapes = this.sketcher.shapes;
		this.molA = mol;
	};
	let _ = actions.SwitchMoleculeAction.prototype = new actions._Action();
	_.innerForward = function() {
		this.sketcher.loadMolecule(this.molA);
	};
	_.innerReverse = function() {
		this.sketcher.molecules = this.beforeMols;
		this.sketcher.shapes = this.beforeShapes;
	};

})(ChemDoodle.uis.actions);

(function(actions, undefined) {
	'use strict';
	actions.HistoryManager = function(sketcher) {
		this.sketcher = sketcher;
		this.undoStack = [];
		this.redoStack = [];
	};
	let _ = actions.HistoryManager.prototype;
	_.undo = function() {
		if (this.undoStack.length !== 0) {
			if (this.sketcher.lasso && this.sketcher.lasso.isActive()) {
				this.sketcher.lasso.empty();
			}
			let a = this.undoStack.pop();
			a.reverse(this.sketcher);
			this.redoStack.push(a);
			if (this.undoStack.length === 0) {
				this.sketcher.toolbarManager.buttonUndo.disable();
			}
			this.sketcher.toolbarManager.buttonRedo.enable();
		}
	};
	_.redo = function() {
		if (this.redoStack.length !== 0) {
			if (this.sketcher.lasso && this.sketcher.lasso.isActive()) {
				this.sketcher.lasso.empty();
			}
			let a = this.redoStack.pop();
			a.forward(this.sketcher);
			this.undoStack.push(a);
			this.sketcher.toolbarManager.buttonUndo.enable();
			if (this.redoStack.length === 0) {
				this.sketcher.toolbarManager.buttonRedo.disable();
			}
		}
	};
	_.pushUndo = function(a) {
		a.forward(this.sketcher);
		if(this.mergeNextUndo){
			this.mergeNextUndo = false;
			let previousAction = this.undoStack.pop();
			if(previousAction !== undefined){
				let compoundAction = new actions.CompoundAction();
				compoundAction.actions.push(previousAction, a);
				a = compoundAction;
			}
		}
		this.undoStack.push(a);
		if (this.redoStack.length !== 0) {
			this.redoStack = [];
		}
		this.sketcher.toolbarManager.buttonUndo.enable();
		this.sketcher.toolbarManager.buttonRedo.disable();
	};
	_.clear = function() {
		if (this.undoStack.length !== 0) {
			this.undoStack = [];
			this.sketcher.toolbarManager.buttonUndo.disable();
		}
		if (this.redoStack.length !== 0) {
			this.redoStack = [];
			this.sketcher.toolbarManager.buttonRedo.disable();
		}
	};

})(ChemDoodle.uis.actions);

(function(math, monitor, actions, states, desktop, structures, d2, SYMBOLS, m, window, undefined) {
	'use strict';
	states._State = function(sketcher) {
		this.sketcher = sketcher;
	};
	let _ = states._State.prototype;
	_.clearHover = function() {
		if (this.sketcher.hovering) {
			this.sketcher.hovering.isHover = false;
			this.sketcher.hovering.isSelected = false;
			this.sketcher.hovering = undefined;
		}
	};
	_.findHoveredObject = function(e, includeAtoms, includeBonds, includeShapes) {
		this.clearHover();
		let min = Infinity;
		let hovering;
		let hoverdist = 10;
		if (!this.sketcher.isMobile) {
			hoverdist /= this.sketcher.styles.scale;
		}
		if (includeAtoms) {
			for ( let i = 0, ii = this.sketcher.molecules.length; i < ii; i++) {
				let mol = this.sketcher.molecules[i];
				for ( let j = 0, jj = mol.atoms.length; j < jj; j++) {
					let a = mol.atoms[j];
					a.isHover = false;
					let dist = e.p.distance(a);
					if (dist < hoverdist && dist < min) {
						min = dist;
						hovering = a;
					}
				}
			}
		}
		if (includeBonds) {
			for ( let i = 0, ii = this.sketcher.molecules.length; i < ii; i++) {
				let mol = this.sketcher.molecules[i];
				for ( let j = 0, jj = mol.bonds.length; j < jj; j++) {
					let b = mol.bonds[j];
					b.isHover = false;
					let dist = math.distanceFromPointToLineInclusive(e.p, b.a1, b.a2, hoverdist/2);
					if (dist !== -1 && dist < hoverdist && dist < min) {
						min = dist;
						hovering = b;
					}
				}
			}
		}
		if (includeShapes) {
			for ( let i = 0, ii = this.sketcher.shapes.length; i < ii; i++) {
				let s = this.sketcher.shapes[i];
				s.isHover = false;
				s.hoverPoint = undefined;
				if(this instanceof states.RepeatUnitState && (!(s instanceof d2.RepeatUnit) || !s.contents.flippable)){
					continue;
				}
				let sps = s.getPoints();
				for ( let j = 0, jj = sps.length; j < jj; j++) {
					let p = sps[j];
					let dist = e.p.distance(p);
					if (dist < hoverdist && dist < min) {
						min = dist;
						hovering = s;
						s.hoverPoint = p;
					}
				}
				if(this instanceof states.EraseState && s instanceof d2.VAP){
					s.hoverBond = undefined;
					// check vap bonds only in the erase state
					if(s.substituent){
						let att = s.substituent;
						let dist = e.p.distance(new structures.Point((s.asterisk.x + att.x) / 2, (s.asterisk.y + att.y) / 2));
						if (dist < hoverdist && dist < min) {
							min = dist;
							s.hoverBond = att;
							hovering = s;
						}
					}
					for ( let j = 0, jj = s.attachments.length; j < jj; j++) {
						let att = s.attachments[j];
						let dist = e.p.distance(new structures.Point((s.asterisk.x + att.x) / 2, (s.asterisk.y + att.y) / 2));
						if (dist < hoverdist && dist < min) {
							min = dist;
							s.hoverBond = att;
							hovering = s;
						}
					}
				}
			}
			if (!hovering) {
				// find smallest shape pointer is over
				for ( let i = 0, ii = this.sketcher.shapes.length; i < ii; i++) {
					let s = this.sketcher.shapes[i];
					if (s.isOver(e.p, hoverdist)) {
						hovering = s;
					}
				}
			}
		}
		if (hovering) {
			hovering.isHover = true;
			this.sketcher.hovering = hovering;
		}
	};
	_.getOptimumAngle = function(a, order) {
		let mol = this.sketcher.getMoleculeByAtom(a);
		let angles = mol.getAngles(a);
		let angle = 0;
		if (angles.length === 0) {
			angle = m.PI / 6;
		} else if (angles.length === 1) {
			let b;
			for ( let j = 0, jj = mol.bonds.length; j < jj; j++) {
				if (mol.bonds[j].contains(this.sketcher.hovering)) {
					b = mol.bonds[j];
				}
			}
			if (b.bondOrder >= 3 || order>=3) {
				angle = angles[0] + m.PI;
			} else {
				let concerned = angles[0] % m.PI * 2;
				if (math.isBetween(concerned, 0, m.PI / 2) || math.isBetween(concerned, m.PI, 3 * m.PI / 2)) {
					angle = angles[0] + 2 * m.PI / 3;
				} else {
					angle = angles[0] - 2 * m.PI / 3;
				}
			}
		} else {
			// avoid inside rings
			let modded;
			for ( let j = 0, jj = mol.rings.length; j < jj; j++) {
				let r = mol.rings[j];
				if(r.atoms.indexOf(a)!==-1){
					angles.push(a.angle(r.getCenter()));
					modded = true;
				}
			}
			if(modded){
				angles.sort(function(a, b) {
					return a - b;
				});
			}
			angle = math.angleBetweenLargest(angles).angle;
		}
		return angle;
	};
	_.removeStartAtom = function() {
		if (this.sketcher.startAtom) {
			this.sketcher.startAtom.x = -10;
			this.sketcher.startAtom.y = -10;
			this.sketcher.repaint();
		}
	};
	_.placeRequiredAtom = function(e){
		let a = new structures.Atom('C', e.p.x, e.p.y);
		this.sketcher.hovering = a;
		this.sketcher.hovering.isHover = true;
		this.sketcher.historyManager.pushUndo(new actions.NewMoleculeAction(this.sketcher, [ a ], []));
		this.sketcher.historyManager.mergeNextUndo = true;
		this.innermousedown(e);
	};

	_.enter = function() {
		// always default to the crosshair cursor
		this.sketcher.cursorManager.setCursor(desktop.CursorManager.CROSSHAIR);
		if (this.innerenter) {
			this.innerenter();
		}
	};
	_.exit = function() {
		if (this.innerexit) {
			this.innerexit();
		}
	};
	_.click = function(e) {
		if (this.innerclick) {
			this.innerclick(e);
		}
	};
	_.rightclick = function(e) {
		if (this.innerrightclick) {
			this.innerrightclick(e);
		}
	};
	_.dblclick = function(e) {
		if (this.innerdblclick) {
			this.innerdblclick(e);
		}
		if (!this.sketcher.hovering && this.sketcher.oneMolecule) {
			// center structure
			this.sketcher.toolbarManager.buttonCenter.func();
		}
	};
	_.mousedown = function(e) {
		this.sketcher.lastPoint = e.p;
		// must also check for mobile hits here to the help button
		if (this.sketcher.isHelp || this.sketcher.isMobile && e.op.distance(new structures.Point(this.sketcher.width - 20, 20)) < 10) {
			if(!this.sketcher.isHelp){
				this.sketcher.doEventDefault = true;
			}
		} else if (this.innermousedown) {
			this.innermousedown(e);
		}
	};
	_.rightmousedown = function(e) {
		if (this.innerrightmousedown) {
			this.innerrightmousedown(e);
		}
	};
	_.mousemove = function(e) {
		// lastMousePos is really only used for pasting
		this.sketcher.lastMousePos = e.p;
		if (this.innermousemove) {
			this.innermousemove(e);
		}
		if(this.sketcher.isHelp){
			this.sketcher.cursorManager.setCursor(desktop.CursorManager.POINTER);
		}else if(this.sketcher.cursorManager.getCurrentCursor()===desktop.CursorManager.POINTER){
			this.sketcher.cursorManager.setPreviousCursor();
		}
		// call the repaint here to repaint the help button, also this is called
		// by other functions, so the repaint must be here
		this.sketcher.repaint();
	};
	_.mouseout = function(e) {
		this.sketcher.lastMousePos = undefined;
		if (this.innermouseout) {
			this.innermouseout(e);
		}
		if (this.sketcher.isHelp) {
			this.sketcher.isHelp = false;
			this.sketcher.repaint();
		}
		if (this.sketcher.hovering && monitor.CANVAS_DRAGGING != this.sketcher) {
			this.sketcher.hovering = undefined;
			this.sketcher.repaint();
		}
	};
	_.mouseover = function(e) {
		if (this.innermouseover) {
			this.innermouseover(e);
		}
	};
	_.mouseup = function(e) {
		this.parentAction = undefined;
		// must also check for mobile hits here to the help button
		if (this.sketcher.isHelp || this.sketcher.isMobile && this.sketcher.doEventDefault && e.op.distance(new structures.Point(this.sketcher.width - 20, 20)) < 10) {
			this.sketcher.isHelp = false;
			this.sketcher.lastPoint = undefined;
			this.sketcher.repaint();
			// window.open doesn't work once Event.preventDefault() has been called
			window.open('https://web.chemdoodle.com/demos/2d-sketcher', '_blank');
			this.sketcher.doEventDefault = false;
		} else if (this.innermouseup) {
			this.innermouseup(e);
		}
	};
	_.rightmouseup = function(e) {
		if (this.innerrightmouseup) {
			this.innerrightmouseup(e);
		}
	};
	_.mousewheel = function(e, delta) {
		if (this.innermousewheel) {
			this.innermousewheel(e);
		}
		this.sketcher.styles.scale += delta / 50;
		this.sketcher.checkScale();
		this.sketcher.repaint();
	};
	_.drag = function(e) {
		if (this.innerdrag) {
			this.innerdrag(e);
		}
		if (!this.sketcher.hovering && !this.dontTranslateOnDrag) {
			if (monitor.SHIFT) {
				// rotate structure
				if (this.parentAction) {
					let center = this.parentAction.center;
					let oldAngle = center.angle(this.sketcher.lastPoint);
					let newAngle = center.angle(e.p);
					let rot = newAngle - oldAngle;
					this.parentAction.dif += rot;
					for ( let i = 0, ii = this.parentAction.ps.length; i < ii; i++) {
						let a = this.parentAction.ps[i];
						let dist = center.distance(a);
						let angle = center.angle(a) + rot;
						a.x = center.x + dist * m.cos(angle);
						a.y = center.y - dist * m.sin(angle);
					}
					// must check here as change is outside of an action
					for ( let i = 0, ii = this.sketcher.molecules.length; i < ii; i++) {
						this.sketcher.molecules[i].check();
					}
				} else {
					let center = new structures.Point(this.sketcher.width / 2, this.sketcher.height / 2);
					let oldAngle = center.angle(this.sketcher.lastPoint);
					let newAngle = center.angle(e.p);
					let rot = newAngle - oldAngle;
					this.parentAction = new actions.RotateAction(this.sketcher.getAllPoints(), rot, center);
					this.sketcher.historyManager.pushUndo(this.parentAction);
				}
			} else {
				if (!this.sketcher.lastPoint) {
					// this prevents the structure from being rotated and
					// translated at the same time while a gesture is occuring,
					// which is preferable based on use cases since the rotation
					// center is the canvas center
					return;
				}
				// move structure
				let dif = new structures.Point(e.p.x, e.p.y);
				dif.sub(this.sketcher.lastPoint);
				if (this.parentAction) {
					this.parentAction.dif.add(dif);
					for ( let i = 0, ii = this.parentAction.ps.length; i < ii; i++) {
						this.parentAction.ps[i].add(dif);
					}
					if (this.sketcher.lasso && this.sketcher.lasso.isActive()) {
						this.sketcher.lasso.bounds.minX += dif.x;
						this.sketcher.lasso.bounds.maxX += dif.x;
						this.sketcher.lasso.bounds.minY += dif.y;
						this.sketcher.lasso.bounds.maxY += dif.y;
					}
					// must check here as change is outside of an action
					for ( let i = 0, ii = this.sketcher.molecules.length; i < ii; i++) {
						this.sketcher.molecules[i].check();
					}
				} else {
					this.parentAction = new actions.MoveAction(this.sketcher.getAllPoints(), dif);
					this.sketcher.historyManager.pushUndo(this.parentAction);
				}
			}
			this.sketcher.repaint();
		}
		this.sketcher.lastPoint = e.p;
	};
	_.keydown = function(e) {
		if (monitor.CANVAS_DRAGGING === this.sketcher) {
			if (this.sketcher.lastPoint) {
				// create a copy, as the drag function may alter the point
				e.p = new structures.Point(this.sketcher.lastPoint.x, this.sketcher.lastPoint.y);
				this.drag(e);
			}
		} else if (monitor.META) {
			if (e.which === 90) {
				// z
				this.sketcher.historyManager.undo();
			} else if (e.which === 89) {
				// y
				this.sketcher.historyManager.redo();
			} else if (e.which === 83) {
				// s
				this.sketcher.toolbarManager.buttonSave.func();
			} else if (e.which === 79) {
				// o
				this.sketcher.toolbarManager.buttonOpen.func();
			} else if (e.which === 78) {
				// n
				this.sketcher.toolbarManager.buttonClear.func();
			} else if (e.which === 187 || e.which === 61) {
				// +
				this.sketcher.toolbarManager.buttonScalePlus.func();
			} else if (e.which === 189 || e.which === 109) {
				// -
				this.sketcher.toolbarManager.buttonScaleMinus.func();
			} else if (e.which === 65) {
				// a
				if (!this.sketcher.oneMolecule) {
					this.sketcher.toolbarManager.buttonLasso.select();
					this.sketcher.toolbarManager.buttonLasso.getElement().click();
					this.sketcher.lasso.select(this.sketcher.getAllAtoms(), this.sketcher.shapes);
				}
			} else if (e.which === 88) {
				// x
				this.sketcher.copyPasteManager.copy(true);
			} else if (e.which === 67) {
				// c
				this.sketcher.copyPasteManager.copy(false);
			} else if (e.which === 86) {
				// v
				this.sketcher.copyPasteManager.paste();
			}
		} else if (e.which === 9) {
			// tab
			if (!this.sketcher.oneMolecule) {
				this.sketcher.lasso.block = true;
				this.sketcher.toolbarManager.buttonLasso.select();
				this.sketcher.toolbarManager.buttonLasso.getElement().click();
				this.sketcher.lasso.block = false;
				if (monitor.SHIFT) {
					this.sketcher.lasso.selectNextShape();
				} else {
					this.sketcher.lasso.selectNextMolecule();
				}
			}
		} else if (e.which === 32) {
			// space key
			if (this.sketcher.lasso) {
				this.sketcher.lasso.empty();
			}
			if(this.sketcher.hovering instanceof structures.Atom){
				if(desktop.TextInput){
					this.sketcher.stateManager.STATE_TEXT_INPUT.innerclick(e);
				}
			}else if(this.sketcher.stateManager.getCurrentState() === this.sketcher.stateManager.STATE_LASSO){
				if(this.sketcher.floatDrawTools){
					this.sketcher.toolbarManager.buttonBond.getLabelElement().click();
					this.sketcher.toolbarManager.buttonBond.getElement().click();
				}else{
					this.sketcher.toolbarManager.buttonSingle.getElement().click();
				}
			}
		} else if (e.which === 13) {
			// enter or return key
			if(this.sketcher.hovering instanceof structures.Atom && this.sketcher.stateManager.STATE_TEXT_INPUT.lastLabel && this.sketcher.stateManager.STATE_TEXT_INPUT.lastLabel !== this.sketcher.hovering.label){
				this.sketcher.historyManager.pushUndo(new actions.ChangeLabelAction(this.sketcher.hovering, this.sketcher.stateManager.STATE_TEXT_INPUT.lastLabel));
			}
		} else if (e.which >= 37 && e.which <= 40) {
			// arrow keys
			let dif = new structures.Point();
			switch (e.which) {
			case 37:
				dif.x = -10;
				break;
			case 38:
				dif.y = -10;
				break;
			case 39:
				dif.x = 10;
				break;
			case 40:
				dif.y = 10;
				break;
			}
			this.sketcher.historyManager.pushUndo(new actions.MoveAction(this.sketcher.lasso && this.sketcher.lasso.isActive() ? this.sketcher.lasso.getAllPoints() : this.sketcher.getAllPoints(), dif));
		} else if (e.which === 187 || e.which === 189 || e.which === 61 || e.which === 109) {
			// plus or minus
			if (this.sketcher.hovering && this.sketcher.hovering instanceof structures.Atom) {
				this.sketcher.historyManager.pushUndo(new actions.ChangeChargeAction(this.sketcher.hovering, e.which === 187 || e.which === 61 ? 1 : -1));
			}
		} else if (e.which === 8 || e.which === 46) {
			// delete or backspace
			this.sketcher.stateManager.STATE_ERASE.handleDelete();
		} else if (e.which >= 48 && e.which <= 57) {
			// digits
			if (this.sketcher.hovering) {
				let number = e.which - 48;
				let molIdentifier;
				let as = [];
				let bs = [];
				if (this.sketcher.hovering instanceof structures.Atom) {
					molIdentifier = this.sketcher.hovering;
					if (monitor.SHIFT) {
						if (number > 2 && number < 9) {
							let mol = this.sketcher.getMoleculeByAtom(this.sketcher.hovering);
							let angles = mol.getAngles(this.sketcher.hovering);
							let angle = 3 * m.PI / 2;
							if (angles.length !== 0) {
								angle = math.angleBetweenLargest(angles).angle;
							}
							let ring = this.sketcher.stateManager.STATE_NEW_RING.getRing(this.sketcher.hovering, number, this.sketcher.styles.bondLength_2D, angle, false);
							if (mol.atoms.indexOf(ring[0]) === -1) {
								as.push(ring[0]);
							}
							if (!this.sketcher.bondExists(this.sketcher.hovering, ring[0])) {
								bs.push(new structures.Bond(this.sketcher.hovering, ring[0]));
							}
							for ( let i = 1, ii = ring.length; i < ii; i++) {
								if (mol.atoms.indexOf(ring[i]) === -1) {
									as.push(ring[i]);
								}
								if (!this.sketcher.bondExists(ring[i - 1], ring[i])) {
									bs.push(new structures.Bond(ring[i - 1], ring[i]));
								}
							}
							if (!this.sketcher.bondExists(ring[ring.length - 1], this.sketcher.hovering)) {
								bs.push(new structures.Bond(ring[ring.length - 1], this.sketcher.hovering));
							}
						}
					} else {
						if (number === 0) {
							number = 10;
						}
						let p = new structures.Point(this.sketcher.hovering.x, this.sketcher.hovering.y);
						let a = this.getOptimumAngle(this.sketcher.hovering);
						let prev = this.sketcher.hovering;
						for ( let k = 0; k < number; k++) {
							let ause = a + (k % 2 === 1 ? m.PI / 3 : 0);
							p.x += this.sketcher.styles.bondLength_2D * m.cos(ause);
							p.y -= this.sketcher.styles.bondLength_2D * m.sin(ause);
							let use = new structures.Atom('C', p.x, p.y);
							let minDist = Infinity;
							let closest;
							for ( let i = 0, ii = this.sketcher.molecules.length; i < ii; i++) {
								let mol = this.sketcher.molecules[i];
								for ( let j = 0, jj = mol.atoms.length; j < jj; j++) {
									let at = mol.atoms[j];
									let dist = at.distance(use);
									if (dist < minDist) {
										minDist = dist;
										closest = at;
									}
								}
							}
							if (minDist < 5) {
								use = closest;
							} else {
								as.push(use);
							}
							if (!this.sketcher.bondExists(prev, use)) {
								bs.push(new structures.Bond(prev, use));
							}
							prev = use;
						}
					}
				} else if (this.sketcher.hovering instanceof structures.Bond) {
					molIdentifier = this.sketcher.hovering.a1;
					if (monitor.SHIFT) {
						if (number > 2 && number < 9) {
							let ring = this.sketcher.stateManager.STATE_NEW_RING.getOptimalRing(this.sketcher.hovering, number);
							let start = this.sketcher.hovering.a2;
							let end = this.sketcher.hovering.a1;
							let mol = this.sketcher.getMoleculeByAtom(start);
							if (ring[0] === this.sketcher.hovering.a1) {
								start = this.sketcher.hovering.a1;
								end = this.sketcher.hovering.a2;
							}
							if (mol.atoms.indexOf(ring[1]) === -1) {
								as.push(ring[1]);
							}
							if (!this.sketcher.bondExists(start, ring[1])) {
								bs.push(new structures.Bond(start, ring[1]));
							}
							for ( let i = 2, ii = ring.length; i < ii; i++) {
								if (mol.atoms.indexOf(ring[i]) === -1) {
									as.push(ring[i]);
								}
								if (!this.sketcher.bondExists(ring[i - 1], ring[i])) {
									bs.push(new structures.Bond(ring[i - 1], ring[i]));
								}
							}
							if (!this.sketcher.bondExists(ring[ring.length - 1], end)) {
								bs.push(new structures.Bond(ring[ring.length - 1], end));
							}
						}
					} else if (number > 0 && number < 4 && this.sketcher.hovering.bondOrder !== number) {
						this.sketcher.historyManager.pushUndo(new actions.ChangeBondAction(this.sketcher.hovering, number, structures.Bond.STEREO_NONE));
					} else if (number === 7 || number === 8) {
						let stereo = structures.Bond.STEREO_RECESSED;
						if(number===7){
							stereo = structures.Bond.STEREO_PROTRUDING;
						}
						this.sketcher.historyManager.pushUndo(new actions.ChangeBondAction(this.sketcher.hovering, 1, stereo));
					}
				}
				if (as.length !== 0 || bs.length !== 0) {
					this.sketcher.historyManager.pushUndo(new actions.AddAction(this.sketcher, molIdentifier, as, bs));
				}
			}
		} else if (e.which >= 65 && e.which <= 90) {
			// alphabet
			if (this.sketcher.hovering) {
				if (this.sketcher.hovering instanceof structures.Atom) {
					let check = String.fromCharCode(e.which);
					let firstMatch;
					let firstAfterMatch;
					let found = false;
					for ( let j = 0, jj = SYMBOLS.length; j < jj; j++) {
						if (this.sketcher.hovering.label.charAt(0) === check) {
							if (SYMBOLS[j] === this.sketcher.hovering.label) {
								found = true;
							} else if (SYMBOLS[j].charAt(0) === check) {
								if (found && !firstAfterMatch) {
									firstAfterMatch = SYMBOLS[j];
								} else if (!firstMatch) {
									firstMatch = SYMBOLS[j];
								}
							}
						} else {
							if (SYMBOLS[j].charAt(0) === check) {
								firstMatch = SYMBOLS[j];
								break;
							}
						}
					}
					let use = 'C';
					if (firstAfterMatch) {
						use = firstAfterMatch;
					} else if (firstMatch) {
						use = firstMatch;
					}
					if (use !== this.sketcher.hovering.label) {
						this.sketcher.historyManager.pushUndo(new actions.ChangeLabelAction(this.sketcher.hovering, use));
					}
				} else if (this.sketcher.hovering instanceof structures.Bond) {
					if (e.which === 70) {
						// f
						this.sketcher.historyManager.pushUndo(new actions.FlipBondAction(this.sketcher.hovering));
					}
				}
			}
		}
		if (this.innerkeydown) {
			this.innerkeydown(e);
		}
	};
	_.keypress = function(e) {
		if (this.innerkeypress) {
			this.innerkeypress(e);
		}
	};
	_.keyup = function(e) {
		if (monitor.CANVAS_DRAGGING === this.sketcher) {
			if (this.sketcher.lastPoint) {
				// create a copy, as the drag function may alter the point
				e.p = new structures.Point(this.sketcher.lastPoint.x, this.sketcher.lastPoint.y);
				this.sketcher.drag(e);
			}
		}
		if (this.innerkeyup) {
			this.innerkeyup(e);
		}
	};

})(ChemDoodle.math, ChemDoodle.monitor, ChemDoodle.uis.actions, ChemDoodle.uis.states, ChemDoodle.uis.gui.desktop, ChemDoodle.structures, ChemDoodle.structures.d2, ChemDoodle.SYMBOLS, Math, window);

(function(actions, states, undefined) {
	'use strict';
	states.AttributeInputState = function(sketcher) {
		states._State.call(this, sketcher);
		// types:
		// 0 - isotope
		// 1 - implicit hydrogen
		// 2 - enhanced stereo
	};
	let _ = states.AttributeInputState.prototype = new states._State();
	_.innerclick = function(e) {
		if(this.mobileHover){
			// on mobile, tap is called after touch up, so preserve hovered when forwarded to click
			// but be careful as click follows immediately, closing the popover
			this.sketcher.hovering = this.mobileHover;
		}
		if (this.sketcher.hovering) {
			let popup = this.sketcher.dialogManager.isotopePopup;
			if(this.type===1){
				popup = this.sketcher.dialogManager.implicitHydrogenPopup;
			}else if(this.type===2){
				popup = this.sketcher.dialogManager.enhancedStereoPopup;
			}
			popup.populate(this.sketcher.hovering);
			popup.show(e);
		}
	};
	_.innermouseup = function(e) {
		if(this.sketcher.isMobile && this.sketcher.hovering){
			// on mobile, tap is called after touch up, so preserve hovered when forwarded to click
			this.mobileHover = this.sketcher.hovering;
		}
	};
	_.innermousemove = function(e) {
		this.findHoveredObject(e, true, false);
	};

})(ChemDoodle.uis.actions, ChemDoodle.uis.states);

(function(actions, states, undefined) {
	'use strict';
	states.ChargeState = function(sketcher) {
		states._State.call(this, sketcher);
	};
	let _ = states.ChargeState.prototype = new states._State();
	_.delta = 1;
	_.innermouseup = function(e) {
		if (this.sketcher.hovering) {
			this.sketcher.historyManager.pushUndo(new actions.ChangeChargeAction(this.sketcher.hovering, this.delta));
		}
	};
	_.innermousemove = function(e) {
		this.findHoveredObject(e, true, false);
	};

})(ChemDoodle.uis.actions, ChemDoodle.uis.states);

(function(extensions, math, structures, d2, actions, states, m, undefined) {
	'use strict';
	let controlsize = 4;
	
	states.RepeatUnitState = function(sketcher) {
		states._State.call(this, sketcher);
		this.dontTranslateOnDrag = true;
	};
	let _ = states.RepeatUnitState.prototype = new states._State();
	_.superDoubleClick = _.dblclick;
	_.dblclick = function(e) {
		// override double click not to center when editing controls
		if (!this.control) {
			this.superDoubleClick(e);
		}
	};
	_.innermousedown = function(e) {
		if (this.control) {
			// this part controls the limits
			let cont = true;
			let c = this.control.t > 0 ? 1 : -1;
			switch (m.abs(this.control.t)) {
			case 1:{
					let nn = this.control.s.n1 + c;
					if(nn<0 || nn>this.control.s.n2){
						cont = false;
					}
					break;
				}
			case 2:{
					let nn = this.control.s.n2 + c;
					if(nn>20 || nn<this.control.s.n1){
						cont = false;
					}
					break;
				}
			}
			if(cont){
				this.sketcher.historyManager.pushUndo(new actions.ChangeRepeatUnitAttributeAction(this.control.s, this.control.t));
				this.sketcher.repaint();
			}
		} else if (this.sketcher.hovering && this.start!==this.sketcher.hovering && this.sketcher.hovering instanceof structures.Bond) {
			if(!this.start){
				this.start = this.sketcher.hovering;
			}
		}else{
			this.start = undefined;
			this.end = undefined;
			this.sketcher.repaint();
		}
	};
	_.innerdrag = function(e) {
		this.control = undefined;
		if (this.start) {
			this.end = new structures.Point(e.p.x, e.p.y);
			this.findHoveredObject(e, false, true);
			this.sketcher.repaint();
		}
	};
	_.innermouseup = function(e) {
		if (this.start && this.sketcher.hovering && this.sketcher.hovering !== this.start) {
			let dup;
			let remove = false;
			for ( let i = 0, ii = this.sketcher.shapes.length; i < ii; i++) {
				let s = this.sketcher.shapes[i];
				if (s instanceof d2.RepeatUnit) {
					if (s.b1 === this.start && s.b2 === this.sketcher.hovering || s.b2 === this.start && s.b1 === this.sketcher.hovering) {
						dup = s;
						remove = true;
					}
				}
			}
			if (dup) {
				if (remove) {
					this.sketcher.historyManager.pushUndo(new actions.DeleteShapeAction(this.sketcher, dup));
				}
				this.start = undefined;
				this.end = undefined;
				this.sketcher.repaint();
			} else {
				let shape = new d2.RepeatUnit(this.start, this.sketcher.hovering);
				this.start = undefined;
				this.end = undefined;
				this.sketcher.historyManager.pushUndo(new actions.AddShapeAction(this.sketcher, shape));
			}
		} else if(this.sketcher.hovering instanceof d2.RepeatUnit){
			this.sketcher.historyManager.pushUndo(new actions.FlipRepeatUnitAction(this.sketcher.hovering));
		} else {
			//this.start = undefined;
			//this.end = undefined;
			//this.sketcher.repaint();
		}
	};
	_.innermousemove = function(e) {
		this.control = undefined;
		if(this.start){
			this.end = new structures.Point(e.p.x, e.p.y);
		}else{
			for ( let i = 0, ii = this.sketcher.shapes.length; i < ii; i++) {
				let s = this.sketcher.shapes[i];
				if (s instanceof d2.RepeatUnit && !s.error) {
					let hits = [];
					hits.push({
						x : s.textPos.x-1,
						y : s.textPos.y+6,
						v : 1
					});
					hits.push({
						x : s.textPos.x+13,
						y : s.textPos.y+6,
						v : 2
					});
					for ( let j = 0, jj = hits.length; j < jj; j++) {
						let h = hits[j];
						if (math.isBetween(e.p.x, h.x, h.x + controlsize * 2) && math.isBetween(e.p.y, h.y - controlsize, h.y+3)) {
							this.control = {
								s : s,
								t : h.v
							};
							break;
						} else if (math.isBetween(e.p.x, h.x, h.x + controlsize * 2) && math.isBetween(e.p.y, h.y + controlsize-2, h.y + controlsize * 2+3)) {
							this.control = {
								s : s,
								t : -1 * h.v
							};
							break;
						}
					}
					if (this.control) {
						break;
					}
				}
			}
		}
		if(this.control){
			this.clearHover();
		}else{
			this.findHoveredObject(e, false, true, true);
			if(this.sketcher.hovering && this.sketcher.hovering instanceof d2._Shape && !(this.sketcher.hovering instanceof d2.RepeatUnit)){
				this.clearHover();
			}
		}
		this.sketcher.repaint();
	};
	function drawBracketControl(ctx, styles, x, y, control, type) {
		if (control && m.abs(control.t) === type) {
			ctx.fillStyle = styles.colorHover;
			ctx.beginPath();
			if (control.t > 0) {
				ctx.moveTo(x, y);
				ctx.lineTo(x + controlsize, y - controlsize);
				ctx.lineTo(x + controlsize * 2, y);
			} else {
				ctx.moveTo(x, y + controlsize);
				ctx.lineTo(x + controlsize, y + controlsize * 2);
				ctx.lineTo(x + controlsize * 2, y + controlsize);
			}
			ctx.closePath();
			ctx.fill();
		}
		ctx.strokeStyle = 'blue';
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x + controlsize, y - controlsize);
		ctx.lineTo(x + controlsize * 2, y);
		ctx.moveTo(x, y + controlsize);
		ctx.lineTo(x + controlsize, y + controlsize * 2);
		ctx.lineTo(x + controlsize * 2, y + controlsize);
		ctx.stroke();
	}
	_.draw = function(ctx, styles) {
		if (this.start && this.end) {
			ctx.strokeStyle = styles.colorPreview;
			ctx.fillStyle = styles.colorPreview;
			ctx.lineWidth = 1;
			let p1 = this.start.getCenter();
			let p2 = this.end;
			if (this.sketcher.hovering && this.sketcher.hovering !== this.start) {
				p2 = this.sketcher.hovering.getCenter();
			}
			ctx.beginPath();
			ctx.moveTo(p1.x, p1.y);
			ctx.lineTo(p2.x, p2.y);
			ctx.setLineDash([2]);
			ctx.stroke();
			ctx.setLineDash([]);
		}else {
			// controls
			ctx.lineWidth = 2;
			ctx.lineJoin = 'miter';
			ctx.lineCap = 'butt';
			for ( let i = 0, ii = this.sketcher.shapes.length; i < ii; i++) {
				let s = this.sketcher.shapes[i];
				if (s instanceof d2.RepeatUnit && !s.error) {
					let c = this.control && this.control.s === s ? this.control : undefined;
					drawBracketControl(ctx, styles, s.textPos.x-1, s.textPos.y+6, c, 1);
					drawBracketControl(ctx, styles, s.textPos.x+13, s.textPos.y+6, c, 2);
				}
			}
			if(this.sketcher.hovering && this.sketcher.hovering instanceof d2.RepeatUnit && this.sketcher.hovering.contents.flippable){
				let s = this.sketcher.hovering;
				ctx.font = extensions.getFontString(styles.text_font_size, styles.text_font_families, styles.text_font_bold, styles.text_font_italic);
				ctx.fillStyle = styles.colorPreview;
				ctx.textAlign = 'left';
				ctx.textBaseline = 'bottom';
				ctx.fillText('flip?', s.textPos.x+(s.error?0:20), s.textPos.y);
			}
		}
	};

})(ChemDoodle.extensions, ChemDoodle.math, ChemDoodle.structures, ChemDoodle.structures.d2, ChemDoodle.uis.actions, ChemDoodle.uis.states, Math);

(function(actions, states, desktop, structures, d2, undefined) {
	'use strict';
	states.EraseState = function(sketcher) {
		states._State.call(this, sketcher);
	};
	let _ = states.EraseState.prototype = new states._State();
	_.innerenter = function(e) {
		this.sketcher.cursorManager.setCursor(desktop.CursorManager.ERASER);
	};
	_.handleDelete = function() {
		let action;
		if (this.sketcher.lasso && this.sketcher.lasso.isActive()) {
			action = new actions.DeleteContentAction(this.sketcher, this.sketcher.lasso.atoms, this.sketcher.lasso.shapes);
			this.sketcher.lasso.empty();
		} else if (this.sketcher.hovering) {
			if (this.sketcher.hovering instanceof structures.Atom) {
				if (this.sketcher.oneMolecule) {
					let mol = this.sketcher.molecules[0];
					for ( let j = 0, jj = mol.atoms.length; j < jj; j++) {
						mol.atoms[j].visited = false;
					}
					let connectionsA = [];
					let connectionsB = [];
					this.sketcher.hovering.visited = true;
					for ( let j = 0, jj = mol.bonds.length; j < jj; j++) {
						let bj = mol.bonds[j];
						if (bj.contains(this.sketcher.hovering)) {
							let atoms = [];
							let bonds = [];
							let q = new structures.Queue();
							q.enqueue(bj.getNeighbor(this.sketcher.hovering));
							while (!q.isEmpty()) {
								let a = q.dequeue();
								if (!a.visited) {
									a.visited = true;
									atoms.push(a);
									for ( let k = 0, kk = mol.bonds.length; k < kk; k++) {
										let bk = mol.bonds[k];
										if (bk.contains(a) && !bk.getNeighbor(a).visited) {
											q.enqueue(bk.getNeighbor(a));
											bonds.push(bk);
										}
									}
								}
							}
							connectionsA.push(atoms);
							connectionsB.push(bonds);
						}
					}
					let largest = -1;
					let index = -1;
					for ( let j = 0, jj = connectionsA.length; j < jj; j++) {
						if (connectionsA[j].length > largest) {
							index = j;
							largest = connectionsA[j].length;
						}
					}
					if (index > -1) {
						let as = [];
						let bs = [];
						let hold;
						for ( let i = 0, ii = mol.atoms.length; i < ii; i++) {
							let a = mol.atoms[i];
							if (connectionsA[index].indexOf(a) === -1) {
								as.push(a);
							} else if (!hold) {
								hold = a;
							}
						}
						for ( let i = 0, ii = mol.bonds.length; i < ii; i++) {
							let b = mol.bonds[i];
							if (connectionsB[index].indexOf(b) === -1) {
								bs.push(b);
							}
						}
						action = new actions.DeleteAction(this.sketcher, hold, as, bs);
					} else {
						action = new actions.ClearAction(this.sketcher);
					}
				} else {
					let mol = this.sketcher.getMoleculeByAtom(this.sketcher.hovering);
					action = new actions.DeleteAction(this.sketcher, mol.atoms[0], [ this.sketcher.hovering ], mol.getBonds(this.sketcher.hovering));
				}
			} else if (this.sketcher.hovering instanceof structures.Bond) {
				if (!this.sketcher.oneMolecule || this.sketcher.hovering.ring) {
					action = new actions.DeleteAction(this.sketcher, this.sketcher.hovering.a1, undefined, [ this.sketcher.hovering ]);
				}
			} else if (this.sketcher.hovering instanceof d2._Shape) {
				let s = this.sketcher.hovering;
				if(s.hoverBond){
					// delete only the hovered bond in the VAP
					action = new actions.DeleteVAPConnectionAction(s, s.hoverBond);
				}else{
					action = new actions.DeleteShapeAction(this.sketcher, s);
				}
			}
			this.sketcher.hovering.isHover = false;
			this.sketcher.hovering = undefined;
			this.sketcher.repaint();
		}
		if(action){
			this.sketcher.historyManager.pushUndo(action);
			// check shapes to see if they should be removed
			for ( let i = this.sketcher.shapes.length - 1; i >= 0; i--) {
				let s = this.sketcher.shapes[i];
				if (s instanceof d2.Pusher || s instanceof d2.AtomMapping) {
					let remains1 = false, remains2 = false;
					for ( let j = 0, jj = this.sketcher.molecules.length; j < jj; j++) {
						let mol = this.sketcher.molecules[j];
						for ( let k = 0, kk = mol.atoms.length; k < kk; k++) {
							let a = mol.atoms[k];
							if (a === s.o1) {
								remains1 = true;
							} else if (a === s.o2) {
								remains2 = true;
							}
						}
						for ( let k = 0, kk = mol.bonds.length; k < kk; k++) {
							let b = mol.bonds[k];
							if (b === s.o1) {
								remains1 = true;
							} else if (b === s.o2) {
								remains2 = true;
							}
						}
					}
					if (!remains1 || !remains2) {
						action.ss.push(s);
						this.sketcher.removeShape(s);
					}
				}
				if (s instanceof d2.RepeatUnit) {
					let remains1 = false, remains2 = false;
					for ( let j = 0, jj = this.sketcher.molecules.length; j < jj; j++) {
						let mol = this.sketcher.molecules[j];
						for ( let k = 0, kk = mol.bonds.length; k < kk; k++) {
							let b = mol.bonds[k];
							if (b === s.b1) {
								remains1 = true;
							} else if (b === s.b2) {
								remains2 = true;
							}
						}
					}
					if (!remains1 || !remains2) {
						action.ss.push(s);
						this.sketcher.removeShape(s);
					}
				}
				if (s instanceof d2.VAP) {
					let broken = false;
					for ( let j = 0, jj = this.sketcher.molecules.length; j < jj; j++) {
						let mol = this.sketcher.molecules[j];
						for ( let k = 0, kk = mol.atoms.length; k < kk; k++) {
							mol.atoms[k].present = true;
						}
					}
					if(s.substituent && !s.substituent.present){
						broken = true;
					}
					if(!broken){
						for(let j = 0, jj = s.attachments.length; j < jj; j++){
							if(!s.attachments[j].present){
								broken = true;
								break;
							}
						}
					}
					for ( let j = 0, jj = this.sketcher.molecules.length; j < jj; j++) {
						let mol = this.sketcher.molecules[j];
						for ( let k = 0, kk = mol.atoms.length; k < kk; k++) {
							mol.atoms[k].present = undefined;
						}
					}
					if (broken) {
						action.ss.push(s);
						this.sketcher.removeShape(s);
					}
				}
			}
			this.sketcher.checksOnAction();
			this.sketcher.repaint();
		}
	};
	_.innermouseup = function(e) {
		this.handleDelete();
	};
	_.innermousemove = function(e) {
		this.findHoveredObject(e, true, true, true);
	};

})(ChemDoodle.uis.actions, ChemDoodle.uis.states, ChemDoodle.uis.gui.desktop, ChemDoodle.structures, ChemDoodle.structures.d2);
(function(monitor, structures, actions, states, m, undefined) {
	'use strict';
	states.LabelState = function(sketcher) {
		states._State.call(this, sketcher);
	};
	let _ = states.LabelState.prototype = new states._State();
	_.label = 'C';
	_.innermousedown = function(e) {
		this.downPoint = e.p;
		this.newMolAllowed = true;
		if(this.sketcher.hovering){
			this.sketcher.hovering.isHover = false;
			this.sketcher.hovering.isSelected = true;
			this.sketcher.repaint();
		}
	};
	_.innermouseup = function(e) {
		this.downPoint = undefined;
		if (this.sketcher.hovering) {
			this.sketcher.hovering.isSelected = false;
			if(this.sketcher.tempAtom){
				let b = new structures.Bond(this.sketcher.hovering, this.sketcher.tempAtom);
				this.sketcher.historyManager.pushUndo(new actions.AddAction(this.sketcher, b.a1, [b.a2], [b]));
				this.sketcher.tempAtom = undefined;
			}else if (this.label !== this.sketcher.hovering.label) {
				this.sketcher.historyManager.pushUndo(new actions.ChangeLabelAction(this.sketcher.hovering, this.label));
			}
		} else if (!this.sketcher.oneMolecule && this.newMolAllowed) {
			this.sketcher.historyManager.pushUndo(new actions.NewMoleculeAction(this.sketcher, [ new structures.Atom(this.label, e.p.x, e.p.y) ], []));
		}
		if (!this.sketcher.isMobile) {
			this.mousemove(e);
		}
	};
	_.innermousemove = function(e) {
		this.findHoveredObject(e, true, false);
	};
	_.innerdrag = function(e) {
		if(this.downPoint && this.downPoint.distance(e.p)>3){
			// give it a little allowance, but if we move too much, then don't place a lone atom
			this.newMolAllowed = false;
		}
		if(this.sketcher.hovering){
			let dist = this.sketcher.hovering.distance(e.p);
			if(dist<9){
				this.sketcher.tempAtom = undefined;
			}else if (e.p.distance(this.sketcher.hovering) < 15) {
				let angle = this.getOptimumAngle(this.sketcher.hovering);
				let x = this.sketcher.hovering.x + this.sketcher.styles.bondLength_2D * m.cos(angle);
				let y = this.sketcher.hovering.y - this.sketcher.styles.bondLength_2D * m.sin(angle);
				this.sketcher.tempAtom = new structures.Atom(this.label, x, y, 0);
			} else {
				if (monitor.ALT && monitor.SHIFT) {
					this.sketcher.tempAtom = new structures.Atom(this.label, e.p.x, e.p.y, 0);
				} else {
					let angle = this.sketcher.hovering.angle(e.p);
					let length = this.sketcher.hovering.distance(e.p);
					if (!monitor.SHIFT) {
						length = this.sketcher.styles.bondLength_2D;
					}
					if (!monitor.ALT) {
						let increments = m.floor((angle + m.PI / 12) / (m.PI / 6));
						angle = increments * m.PI / 6;
					}
					this.sketcher.tempAtom = new structures.Atom(this.label, this.sketcher.hovering.x + length * m.cos(angle), this.sketcher.hovering.y - length * m.sin(angle), 0);
				}
			}
			this.sketcher.repaint();
		}
	};

})(ChemDoodle.monitor, ChemDoodle.structures, ChemDoodle.uis.actions, ChemDoodle.uis.states, Math);
(function(math, monitor, structures, d2, actions, states, tools, desktop, m, undefined) {
	'use strict';
	let TRANSLATE = 1;
	let ROTATE = 2;
	//let SCALE = 3;
	let transformType = undefined;
	let paintRotate = false;
	
	states.LassoState = function(sketcher) {
		states._State.call(this, sketcher);
		this.dontTranslateOnDrag = true;
	};
	let _ = states.LassoState.prototype = new states._State();
	_.innerdrag = function(e) {
		this.inDrag = true;
		if (this.sketcher.lasso.isActive() && transformType) {
			if (!this.sketcher.lastPoint) {
				// this prevents the structure from being rotated and
				// translated at the same time while a gesture is occurring,
				// which is preferable based on use cases since the rotation
				// center is the canvas center
				return;
			}
			if (transformType === TRANSLATE) {
				// move selection
				let dif = new structures.Point(e.p.x, e.p.y);
				dif.sub(this.sketcher.lastPoint);
				if (this.parentAction) {
					this.parentAction.dif.add(dif);
					for ( let i = 0, ii = this.parentAction.ps.length; i < ii; i++) {
						this.parentAction.ps[i].add(dif);
					}
					// must check here as change is outside of an action
					this.parentAction.checks(this.sketcher);
				} else {
					this.parentAction = new actions.MoveAction(this.sketcher.lasso.getAllPoints(), dif);
					this.sketcher.historyManager.pushUndo(this.parentAction);
				}
			} else if (transformType === ROTATE) {
				// rotate structure
				if (this.parentAction) {
					let center = this.parentAction.center;
					let oldAngle = center.angle(this.sketcher.lastPoint);
					let newAngle = center.angle(e.p);
					let rot = newAngle - oldAngle;
					this.parentAction.dif += rot;
					for ( let i = 0, ii = this.parentAction.ps.length; i < ii; i++) {
						let a = this.parentAction.ps[i];
						let dist = center.distance(a);
						let angle = center.angle(a) + rot;
						a.x = center.x + dist * m.cos(angle);
						a.y = center.y - dist * m.sin(angle);
					}
					// must check here as change is outside of an action
					this.parentAction.checks(this.sketcher);
				} else {
					let center = new structures.Point((this.sketcher.lasso.bounds.minX + this.sketcher.lasso.bounds.maxX) / 2, (this.sketcher.lasso.bounds.minY + this.sketcher.lasso.bounds.maxY) / 2);
					let oldAngle = center.angle(this.sketcher.lastPoint);
					let newAngle = center.angle(e.p);
					let rot = newAngle - oldAngle;
					this.parentAction = new actions.RotateAction(this.sketcher.lasso.getAllPoints(), rot, center);
					this.sketcher.historyManager.pushUndo(this.parentAction);
				}
			}
		} else if (this.sketcher.hovering) {
			if (!this.sketcher.lastPoint) {
				// this prevents the structure from being rotated and
				// translated at the same time while a gesture is occurring,
				// which is preferable based on use cases since the rotation
				// center is the canvas center
				return;
			}
			// move structure
			let dif = new structures.Point(e.p.x, e.p.y);
			dif.sub(this.sketcher.lastPoint);
			if (!this.parentAction) {
				let ps;
				if (this.sketcher.hovering instanceof structures.Atom) {
					ps = monitor.SHIFT ? [ this.sketcher.hovering ] : this.sketcher.getMoleculeByAtom(this.sketcher.hovering).atoms;
				} else if (this.sketcher.hovering instanceof structures.Bond) {
					ps = [ this.sketcher.hovering.a1, this.sketcher.hovering.a2 ];
				} else if (this.sketcher.hovering instanceof d2._Shape) {
					ps = this.sketcher.hovering.hoverPoint ? [ this.sketcher.hovering.hoverPoint ] : this.sketcher.hovering.getPoints();
				}
				this.parentAction = new actions.MoveAction(ps, dif);
				this.sketcher.historyManager.pushUndo(this.parentAction);
			} else {
				this.parentAction.dif.add(dif);
				for ( let i = 0, ii = this.parentAction.ps.length; i < ii; i++) {
					this.parentAction.ps[i].add(dif);
				}
				// must check here as change is outside of an action
				this.parentAction.checks(this.sketcher);
			}
		} else {
			// must check against undefined as lastGestureRotate can be 0, in
			// mobile mode it is set during gestures, don't use lasso
			this.sketcher.lasso.addPoint(e.p);
			this.sketcher.repaint();
		}
	};
	_.innermousedown = function(e) {
		this.inDrag = false;
		transformType = undefined;
		let cursor = this.sketcher.cursorManager.getCurrentCursor();
		if (this.sketcher.lasso.isActive() && !monitor.SHIFT) {
			let rotateBuffer = 25 / this.sketcher.styles.scale;
			if (math.isBetween(e.p.x, this.sketcher.lasso.bounds.minX, this.sketcher.lasso.bounds.maxX) && math.isBetween(e.p.y, this.sketcher.lasso.bounds.minY, this.sketcher.lasso.bounds.maxY)) {
				transformType = TRANSLATE;
				cursor = desktop.CursorManager.HAND_CLOSE;
			} else if (math.isBetween(e.p.x, this.sketcher.lasso.bounds.minX - rotateBuffer, this.sketcher.lasso.bounds.maxX + rotateBuffer) && math.isBetween(e.p.y, this.sketcher.lasso.bounds.minY - rotateBuffer, this.sketcher.lasso.bounds.maxY + rotateBuffer)) {
				transformType = ROTATE;
			}
		} else if (!this.sketcher.hovering) {
			this.sketcher.lasso.addPoint(e.p);
			this.sketcher.repaint();
		}else{
			cursor = desktop.CursorManager.HAND_CLOSE;
		}
		this.sketcher.cursorManager.setCursor(cursor);
	};
	_.innermouseup = function(e) {
		if (!transformType) {
			if (!this.sketcher.hovering) {
				this.sketcher.lasso.select();
			}
		}
		this.innermousemove(e);
	};
	_.innerclick = function(e) {
		if (!transformType && !this.inDrag) {
			if (this.sketcher.hovering) {
				let as = [];
				let ss = [];
				if (this.sketcher.hovering instanceof structures.Atom) {
					as.push(this.sketcher.hovering);
				} else if (this.sketcher.hovering instanceof structures.Bond) {
					as.push(this.sketcher.hovering.a1);
					as.push(this.sketcher.hovering.a2);
				} else if (this.sketcher.hovering instanceof d2._Shape) {
					ss.push(this.sketcher.hovering);
				}
				this.sketcher.lasso.select(as, ss);
			} else if (this.sketcher.lasso.isActive()) {
				this.sketcher.lasso.empty();
			}
		}
		transformType = undefined;
	};
	_.innermousemove = function(e) {
		let cursor = desktop.CursorManager.CROSSHAIR;
		if (!this.sketcher.lasso.isActive()) {
			let includeMol = this.sketcher.lasso.mode !== tools.Lasso.MODE_LASSO_SHAPES;
			this.findHoveredObject(e, includeMol, includeMol, true);
			if(this.sketcher.hovering){
				cursor = desktop.CursorManager.HAND_OPEN;
			}
		} else if (!monitor.SHIFT) {
			let p = false;
			let rotateBuffer = 25 / this.sketcher.styles.scale;
			let inLassoBounds = math.isBetween(e.p.x, this.sketcher.lasso.bounds.minX, this.sketcher.lasso.bounds.maxX) && math.isBetween(e.p.y, this.sketcher.lasso.bounds.minY, this.sketcher.lasso.bounds.maxY);
			if (!inLassoBounds && math.isBetween(e.p.x, this.sketcher.lasso.bounds.minX - rotateBuffer, this.sketcher.lasso.bounds.maxX + rotateBuffer) && math.isBetween(e.p.y, this.sketcher.lasso.bounds.minY - rotateBuffer, this.sketcher.lasso.bounds.maxY + rotateBuffer)) {
				p = true;
			}
			if (p !== paintRotate) {
				paintRotate = p;
				this.sketcher.repaint();
			}
			if(inLassoBounds){
				cursor = desktop.CursorManager.HAND_OPEN;
			}else if(paintRotate){
				cursor = desktop.CursorManager.ROTATE;
			}
		}
		this.sketcher.cursorManager.setCursor(cursor);
	};
	_.innerdblclick = function(e) {
		if (this.sketcher.lasso.isActive()) {
			this.sketcher.lasso.empty();
		}
	};
	_.draw = function(ctx, styles) {
		if (paintRotate && this.sketcher.lasso.bounds) {
			ctx.fillStyle = styles.colorSelect;
			ctx.globalAlpha = .1;
			let rotateBuffer = 25 / this.sketcher.styles.scale;
			let b = this.sketcher.lasso.bounds;
			ctx.beginPath();
			ctx.rect(b.minX - rotateBuffer, b.minY - rotateBuffer, b.maxX - b.minX + 2 * rotateBuffer, rotateBuffer);
			ctx.rect(b.minX - rotateBuffer, b.maxY, b.maxX - b.minX + 2 * rotateBuffer, rotateBuffer);
			ctx.rect(b.minX - rotateBuffer, b.minY, rotateBuffer, b.maxY - b.minY);
			ctx.rect(b.maxX, b.minY, rotateBuffer, b.maxY - b.minY);
			ctx.fill();
			ctx.globalAlpha = 1;
		}
	};

})(ChemDoodle.math, ChemDoodle.monitor, ChemDoodle.structures, ChemDoodle.structures.d2, ChemDoodle.uis.actions, ChemDoodle.uis.states, ChemDoodle.uis.tools, ChemDoodle.uis.gui.desktop, Math);

(function(actions, states, undefined) {
	'use strict';
	states.LonePairState = function(sketcher) {
		states._State.call(this, sketcher);
	};
	let _ = states.LonePairState.prototype = new states._State();
	_.delta = 1;
	_.innermouseup = function(e) {
		if (this.delta < 0 && this.sketcher.hovering.numLonePair < 1) {
			return;
		}
		if (this.sketcher.hovering) {
			this.sketcher.historyManager.pushUndo(new actions.ChangeLonePairAction(this.sketcher.hovering, this.delta));
		}
	};
	_.innermousemove = function(e) {
		this.findHoveredObject(e, true, false);
	};

})(ChemDoodle.uis.actions, ChemDoodle.uis.states);
(function(actions, states, desktop, structures, undefined) {
	'use strict';
	states.MoveState = function(sketcher) {
		states._State.call(this, sketcher);
	};
	let _ = states.MoveState.prototype = new states._State();
	_.action = undefined;
	_.innerdrag = function(e) {
		if (this.sketcher.hovering) {
			if (!this.action) {
				let ps = [];
				let dif = new structures.Point(e.p.x, e.p.y);
				if (this.sketcher.hovering instanceof structures.Atom) {
					dif.sub(this.sketcher.hovering);
					ps[0] = this.sketcher.hovering;
				} else if (this.sketcher.hovering instanceof structures.Bond) {
					dif.sub(this.sketcher.lastPoint);
					ps[0] = this.sketcher.hovering.a1;
					ps[1] = this.sketcher.hovering.a2;
				}
				this.action = new actions.MoveAction(ps, dif);
				this.sketcher.historyManager.pushUndo(this.action);
			} else {
				let dif = new structures.Point(e.p.x, e.p.y);
				dif.sub(this.sketcher.lastPoint);
				this.action.dif.add(dif);
				for ( let i = 0, ii = this.action.ps.length; i < ii; i++) {
					this.action.ps[i].add(dif);
				}
				for ( let i = 0, ii = this.sketcher.molecules.length; i < ii; i++) {
					this.sketcher.molecules[i].check();
				}
				this.sketcher.repaint();
			}
		}
	};
	_.innermousemove = function(e) {
		this.findHoveredObject(e, true, true);
		if(this.sketcher.hovering){
			this.sketcher.cursorManager.setCursor(desktop.CursorManager.HAND_OPEN);
		}else{
			this.sketcher.cursorManager.setCursor(desktop.CursorManager.CROSSHAIR);
		}
	};
	_.innermousedown = function(e) {
		this.findHoveredObject(e, true, true);
		if(this.sketcher.hovering){
			this.sketcher.cursorManager.setCursor(desktop.CursorManager.HAND_CLOSE);
		}
	};
	_.innermouseup = function(e) {
		this.action = undefined;
		if(this.sketcher.hovering){
			this.sketcher.cursorManager.setCursor(desktop.CursorManager.HAND_OPEN);
		}else{
			this.sketcher.cursorManager.setCursor(desktop.CursorManager.CROSSHAIR);
		}
	};

})(ChemDoodle.uis.actions, ChemDoodle.uis.states, ChemDoodle.uis.gui.desktop, ChemDoodle.structures);
(function(monitor, actions, states, structures, m, undefined) {
	'use strict';
	states.NewBondState = function(sketcher) {
		states._State.call(this, sketcher);
	};
	let _ = states.NewBondState.prototype = new states._State();
	_.bondOrder = 1;
	_.stereo = structures.Bond.STEREO_NONE;
	_.incrementBondOrder = function(b) {
		this.newMolAllowed = false;
		if (this.bondOrder === 1 && this.stereo === structures.Bond.STEREO_NONE) {
			this.sketcher.historyManager.pushUndo(new actions.ChangeBondAction(b));
		} else {
			if (b.bondOrder === this.bondOrder && b.stereo === this.stereo) {
				// if the same bond type, see if we can flip
				// we can flip covalent bonds, wedge bonds and asymmetrical double bonds
				if (b.bondOrder <= 1 && b.stereo !== structures.Bond.STEREO_NONE || b.bondOrder === 2 && b.stereo === structures.Bond.STEREO_NONE) {
					this.sketcher.historyManager.pushUndo(new actions.FlipBondAction(b));
				}
			} else {
				this.sketcher.historyManager.pushUndo(new actions.ChangeBondAction(b, this.bondOrder, this.stereo));
			}
		}
	};

	_.innerexit = function() {
		this.removeStartAtom();
	};
	_.innerdrag = function(e) {
		this.newMolAllowed = false;
		this.removeStartAtom();
		if (this.sketcher.hovering instanceof structures.Atom) {
			if (e.p.distance(this.sketcher.hovering) < 15) {
				let angle = this.getOptimumAngle(this.sketcher.hovering, this.bondOrder);
				let x = this.sketcher.hovering.x + this.sketcher.styles.bondLength_2D * m.cos(angle);
				let y = this.sketcher.hovering.y - this.sketcher.styles.bondLength_2D * m.sin(angle);
				this.sketcher.tempAtom = new structures.Atom('C', x, y, 0);
			} else {
				let closest;
				let distMin = 1000;
				for ( let i = 0, ii = this.sketcher.molecules.length; i < ii; i++) {
					let mol = this.sketcher.molecules[i];
					for ( let j = 0, jj = mol.atoms.length; j < jj; j++) {
						let a = mol.atoms[j];
						let dist = a.distance(e.p);
						if (dist < 5 && (!closest || dist < distMin)) {
							closest = a;
							distMin = dist;
						}
					}
				}
				if (closest) {
					this.sketcher.tempAtom = new structures.Atom('C', closest.x, closest.y, 0);
				} else if (monitor.ALT && monitor.SHIFT) {
					this.sketcher.tempAtom = new structures.Atom('C', e.p.x, e.p.y, 0);
				} else {
					let angle = this.sketcher.hovering.angle(e.p);
					let length = this.sketcher.hovering.distance(e.p);
					if (!monitor.SHIFT) {
						length = this.sketcher.styles.bondLength_2D;
					}
					if (!monitor.ALT) {
						let increments = m.floor((angle + m.PI / 12) / (m.PI / 6));
						angle = increments * m.PI / 6;
					}
					this.sketcher.tempAtom = new structures.Atom('C', this.sketcher.hovering.x + length * m.cos(angle), this.sketcher.hovering.y - length * m.sin(angle), 0);
				}
			}
			for ( let i = 0, ii = this.sketcher.molecules.length; i < ii; i++) {
				let mol = this.sketcher.molecules[i];
				for ( let j = 0, jj = mol.atoms.length; j < jj; j++) {
					let a = mol.atoms[j];
					if (a.distance(this.sketcher.tempAtom) < 5) {
						this.sketcher.tempAtom.x = a.x;
						this.sketcher.tempAtom.y = a.y;
						this.sketcher.tempAtom.isOverlap = true;
					}
				}
			}
			this.sketcher.repaint();
		}
	};
	_.innerclick = function(e) {
		if (!this.sketcher.hovering && !this.sketcher.oneMolecule && this.newMolAllowed) {
			this.sketcher.historyManager.pushUndo(new actions.NewMoleculeAction(this.sketcher, [ new structures.Atom('C', e.p.x, e.p.y) ], []));
			if (!this.sketcher.isMobile) {
				this.mousemove(e);
			}
			this.newMolAllowed = false;
		}
	};
	_.innermousedown = function(e) {
		this.newMolAllowed = true;
		if (this.sketcher.hovering instanceof structures.Atom) {
			this.sketcher.hovering.isHover = false;
			this.sketcher.hovering.isSelected = true;
			this.drag(e);
		} else if (this.sketcher.hovering instanceof structures.Bond) {
			this.sketcher.hovering.isHover = false;
			this.incrementBondOrder(this.sketcher.hovering);
			for ( let i = 0, ii = this.sketcher.molecules.length; i < ii; i++) {
				this.sketcher.molecules[i].check();
			}
			this.sketcher.repaint();
		}else if(!this.sketcher.hovering && !this.sketcher.requireStartingAtom){
			this.placeRequiredAtom(e);
		}
	};
	_.innermouseup = function(e) {
		if (this.sketcher.tempAtom && this.sketcher.hovering) {
			let as = [];
			let bs = [];
			let makeBond = true;
			if (this.sketcher.tempAtom.isOverlap) {
				for ( let i = 0, ii = this.sketcher.molecules.length; i < ii; i++) {
					let mol = this.sketcher.molecules[i];
					for ( let j = 0, jj = mol.atoms.length; j < jj; j++) {
						let a = mol.atoms[j];
						if (a.distance(this.sketcher.tempAtom) < 5) {
							this.sketcher.tempAtom = a;
						}
					}
				}
				let bond = this.sketcher.getBond(this.sketcher.hovering, this.sketcher.tempAtom);
				if (bond) {
					this.incrementBondOrder(bond);
					makeBond = false;
				}
			} else {
				as.push(this.sketcher.tempAtom);
			}
			if (makeBond) {
				bs[0] = new structures.Bond(this.sketcher.hovering, this.sketcher.tempAtom, this.bondOrder);
				bs[0].stereo = this.stereo;
				this.sketcher.historyManager.pushUndo(new actions.AddAction(this.sketcher, bs[0].a1, as, bs));
			}
		}
		this.sketcher.tempAtom = undefined;
		if (!this.sketcher.isMobile) {
			this.mousemove(e);
		}
	};
	_.innermousemove = function(e) {
		if (this.sketcher.tempAtom) {
			return;
		}
		this.findHoveredObject(e, true, true);
		if (this.sketcher.startAtom) {
			if (this.sketcher.hovering) {
				this.sketcher.startAtom.x = -10;
				this.sketcher.startAtom.y = -10;
			} else {
				this.sketcher.startAtom.x = e.p.x;
				this.sketcher.startAtom.y = e.p.y;
			}
		}
	};
	_.innermouseout = function(e) {
		this.removeStartAtom();
	};

})(ChemDoodle.monitor, ChemDoodle.uis.actions, ChemDoodle.uis.states, ChemDoodle.structures, Math);
(function(math, monitor, actions, states, structures, m, undefined) {
	'use strict';
	states.NewChainState = function(sketcher) {
		states._State.call(this, sketcher);
	};
	let _ = states.NewChainState.prototype = new states._State();
	_.getChain = function(pivot, end) {
		if (monitor.SHIFT) {
			let difx = end.x - pivot.x;
			let dify = end.y - pivot.y;
			if (m.abs(difx) > m.abs(dify)) {
				end.x = pivot.x+difx;
				end.y = pivot.y;
			} else {
				end.x = pivot.x;
				end.y = pivot.y+dify;
			}
		}
		let chain = [];
		let beginning = pivot;
		let angle = 2 * m.PI - pivot.angle(end);
		if(!monitor.SHIFT && !monitor.ALT){
			let remainder = angle % (m.PI / 24);
			angle -= remainder;
		}
		let blength = this.sketcher.styles.bondLength_2D;
		let length =  m.floor(pivot.distance(end) / (blength * m.cos(m.PI / 6)));
		let flip = m.round(angle / (m.PI / 24)) % 2 == 1;
		if (flip) {
			angle -= m.PI / 24;
		}
		if (this.flipOverride) {
			flip = !flip;
		}
		for (let i = 0; i < length; i++) {
			let angleAdd = m.PI / 6 * (flip ? 1 : -1);
			if ((i & 1) == 1) {
				angleAdd *= -1;
			}
			let newX = beginning.x + blength * m.cos(angle + angleAdd);
			let newY = beginning.y + blength * m.sin(angle + angleAdd);
			beginning = new structures.Atom('C', newX, newY);
			chain.push(beginning);
		}
		
		let allAs = this.sketcher.getAllAtoms();
		for ( let i = 0, ii = allAs.length; i < ii; i++) {
			allAs[i].isOverlap = false;
		}
		for ( let i = 0, ii = chain.length; i < ii; i++) {
			let minDist = Infinity;
			let closest;
			for ( let k = 0, kk = allAs.length; k < kk; k++) {
				let dist = allAs[k].distance(chain[i]);
				if (dist < minDist) {
					minDist = dist;
					closest = allAs[k];
				}
			}
			if (minDist < 5) {
				chain[i] = closest;
				closest.isOverlap = true;
			}
		}
		return chain;
	};

	_.innerexit = function() {
		this.removeStartAtom();
	};
	_.innerdrag = function(e) {
		this.newMolAllowed = false;
		this.removeStartAtom();
		if (this.sketcher.hovering) {
			// send in a copy of e.p as the getChain function does change the point if shift is held
			this.sketcher.tempChain = this.getChain(this.sketcher.hovering, new structures.Point(e.p.x, e.p.y));
			this.sketcher.repaint();
		}
	};
	_.innerclick = function(e) {
		if (!this.sketcher.hovering && !this.sketcher.oneMolecule && this.newMolAllowed) {
			this.sketcher.historyManager.pushUndo(new actions.NewMoleculeAction(this.sketcher, [ new structures.Atom('C', e.p.x, e.p.y) ], []));
			if (!this.sketcher.isMobile) {
				this.mousemove(e);
			}
			this.newMolAllowed = false;
		}
	};
	_.innermousedown = function(e) {
		this.newMolAllowed = true;
		if (this.sketcher.hovering) {
			this.sketcher.hovering.isHover = false;
			this.sketcher.hovering.isSelected = true;
			this.drag(e);
		}else if(!this.sketcher.requireStartingAtom){
			this.placeRequiredAtom(e);
		}
	};
	_.innermouseup = function(e) {
		if (this.sketcher.tempChain && this.sketcher.hovering && this.sketcher.tempChain.length!==0) {
			let as = [];
			let bs = [];
			let allAs = this.sketcher.getAllAtoms();
			for ( let i = 0, ii = this.sketcher.tempChain.length; i < ii; i++) {
				if (allAs.indexOf(this.sketcher.tempChain[i]) === -1) {
					as.push(this.sketcher.tempChain[i]);
				}
				if (i!=0 && !this.sketcher.bondExists(this.sketcher.tempChain[i - 1], this.sketcher.tempChain[i])) {
					bs.push(new structures.Bond(this.sketcher.tempChain[i - 1], this.sketcher.tempChain[i]));
				}
			}
			if (!this.sketcher.bondExists(this.sketcher.tempChain[0], this.sketcher.hovering)) {
				bs.push(new structures.Bond(this.sketcher.tempChain[0], this.sketcher.hovering));
			}
			if (as.length !== 0 || bs.length !== 0) {
				this.sketcher.historyManager.pushUndo(new actions.AddAction(this.sketcher, this.sketcher.hovering, as, bs));
			}
			for ( let j = 0, jj = allAs.length; j < jj; j++) {
				allAs[j].isOverlap = false;
			}
		}
		this.sketcher.tempChain = undefined;
		if (!this.sketcher.isMobile) {
			this.mousemove(e);
		}
	};
	_.innermousemove = function(e) {
		if (this.sketcher.tempAtom) {
			return;
		}
		this.findHoveredObject(e, true);
		if (this.sketcher.startAtom) {
			if (this.sketcher.hovering) {
				this.sketcher.startAtom.x = -10;
				this.sketcher.startAtom.y = -10;
			} else {
				this.sketcher.startAtom.x = e.p.x;
				this.sketcher.startAtom.y = e.p.y;
			}
		}
	};
	_.innermouseout = function(e) {
		this.removeStartAtom();
	};

})(ChemDoodle.math, ChemDoodle.monitor, ChemDoodle.uis.actions, ChemDoodle.uis.states, ChemDoodle.structures, Math);
(function(math, monitor, actions, states, structures, m, undefined) {
	'use strict';
	states.NewRingState = function(sketcher) {
		states._State.call(this, sketcher);
	};
	let _ = states.NewRingState.prototype = new states._State();
	_.numSides = 6;
	_.unsaturated = false;
	_.getRing = function(a, numSides, bondLength, angle, setOverlaps) {
		let innerAngle = m.PI - 2 * m.PI / numSides;
		angle += innerAngle / 2;
		let ring = [];
		for ( let i = 0; i < numSides - 1; i++) {
			let p = i === 0 ? new structures.Atom('C', a.x, a.y) : new structures.Atom('C', ring[ring.length - 1].x, ring[ring.length - 1].y);
			p.x += bondLength * m.cos(angle);
			p.y -= bondLength * m.sin(angle);
			ring.push(p);
			angle += m.PI + innerAngle;
		}
		for ( let i = 0, ii = this.sketcher.molecules.length; i < ii; i++) {
			let mol = this.sketcher.molecules[i];
			for ( let j = 0, jj = mol.atoms.length; j < jj; j++) {
				mol.atoms[j].isOverlap = false;
			}
		}
		for ( let i = 0, ii = ring.length; i < ii; i++) {
			let minDist = Infinity;
			let closest;
			for ( let k = 0, kk = this.sketcher.molecules.length; k < kk; k++) {
				let mol = this.sketcher.molecules[k];
				for ( let j = 0, jj = mol.atoms.length; j < jj; j++) {
					let dist = mol.atoms[j].distance(ring[i]);
					if (dist < minDist) {
						minDist = dist;
						closest = mol.atoms[j];
					}
				}
			}
			if (minDist < 5) {
				ring[i] = closest;
				if (setOverlaps) {
					closest.isOverlap = true;
				}
			}
		}
		return ring;
	};
	_.getOptimalRing = function(b, numSides) {
		let innerAngle = m.PI / 2 - m.PI / numSides;
		let bondLength = b.a1.distance(b.a2);
		let ring1 = this.getRing(b.a1, numSides, bondLength, b.a1.angle(b.a2) - innerAngle, false);
		let ring2 = this.getRing(b.a2, numSides, bondLength, b.a2.angle(b.a1) - innerAngle, false);
		let dist1 = 0, dist2 = 0;
		for ( let i = 1, ii = ring1.length; i < ii; i++) {
			for ( let k = 0, kk = this.sketcher.molecules.length; k < kk; k++) {
				let mol = this.sketcher.molecules[k];
				for ( let j = 0, jj = mol.atoms.length; j < jj; j++) {
					let d1 = mol.atoms[j].distance(ring1[i]);
					let d2 = mol.atoms[j].distance(ring2[i]);
					dist1 += m.min(1E8, 1 / (d1 * d1));
					dist2 += m.min(1E8, 1 / (d2 * d2));
				}
			}
		}
		if (dist1 < dist2) {
			return ring1;
		} else {
			return ring2;
		}
	};

	_.innerexit = function() {
		this.removeStartAtom();
	};
	_.innerdrag = function(e) {
		this.newMolAllowed = false;
		this.removeStartAtom();
		function getHeight(n, startFromSide, standardLength) {
			let mpn = m.PI / n;
			let r = standardLength/ 2 / m.sin(mpn);
			let a = r * m.cos(mpn);
			let odd = n % 2 == 1;
			return odd ? a + r : startFromSide ? 2 * a : 2 * r;
		};
		if (this.sketcher.hovering instanceof structures.Atom) {
			let a = 0;
			let l = 0;
			let n = this.numSides;
			if(n === -1){
				a = this.sketcher.hovering.angle(e.p);
				l = this.sketcher.styles.bondLength_2D;
				n = 3;
				let dist = this.sketcher.hovering.distance(e.p);
				while (dist > getHeight(n + 1, false, l)) {
					n++;
				}
				if (!monitor.ALT) {
					let increments = m.floor((a + m.PI / 12) / (m.PI / 6));
					a = increments * m.PI / 6;
				}
			}else if (e.p.distance(this.sketcher.hovering) < 15) {
				let angles = this.sketcher.getMoleculeByAtom(this.sketcher.hovering).getAngles(this.sketcher.hovering);
				if (angles.length === 0) {
					a = 3 * m.PI / 2;
				} else {
					a = math.angleBetweenLargest(angles).angle;
				}
				l = this.sketcher.styles.bondLength_2D;
			} else {
				a = this.sketcher.hovering.angle(e.p);
				l = this.sketcher.hovering.distance(e.p);
				if (!(monitor.ALT && monitor.SHIFT)) {
					if (!monitor.SHIFT) {
						l = this.sketcher.styles.bondLength_2D;
					}
					if (!monitor.ALT) {
						let increments = m.floor((a + m.PI / 12) / (m.PI / 6));
						a = increments * m.PI / 6;
					}
				}
			}
			this.sketcher.tempRing = this.getRing(this.sketcher.hovering, n, l, a, true);
			this.sketcher.repaint();
		} else if (this.sketcher.hovering instanceof structures.Bond) {
			let dist = math.distanceFromPointToLineInclusive(e.p, this.sketcher.hovering.a1, this.sketcher.hovering.a2);
			let ringUse;
			let n = this.numSides;
			if(n === -1){
				n = 3;
				let dist = this.sketcher.hovering.getCenter().distance(e.p);
				let bondLength = this.sketcher.hovering.a1.distance(this.sketcher.hovering.a2);
				while (dist > getHeight(n + 1, true, bondLength)) {
					n++;
				}
			}
			if (dist !== -1 && dist <= 7) {
				ringUse = this.getOptimalRing(this.sketcher.hovering, n);
			} else {
				let innerAngle = m.PI / 2 - m.PI / n;
				let bondLength = this.sketcher.hovering.a1.distance(this.sketcher.hovering.a2);
				let ring1 = this.getRing(this.sketcher.hovering.a1, n, bondLength, this.sketcher.hovering.a1.angle(this.sketcher.hovering.a2) - innerAngle, false);
				let ring2 = this.getRing(this.sketcher.hovering.a2, n, bondLength, this.sketcher.hovering.a2.angle(this.sketcher.hovering.a1) - innerAngle, false);
				let center1 = new structures.Point();
				let center2 = new structures.Point();
				for ( let i = 1, ii = ring1.length; i < ii; i++) {
					center1.add(ring1[i]);
					center2.add(ring2[i]);
				}
				center1.x /= (ring1.length - 1);
				center1.y /= (ring1.length - 1);
				center2.x /= (ring2.length - 1);
				center2.y /= (ring2.length - 1);
				let dist1 = center1.distance(e.p);
				let dist2 = center2.distance(e.p);
				ringUse = ring2;
				if (dist1 < dist2) {
					ringUse = ring1;
				}
			}
			for ( let j = 1, jj = ringUse.length; j < jj; j++) {
				if (this.sketcher.getAllAtoms().indexOf(ringUse[j]) !== -1) {
					ringUse[j].isOverlap = true;
				}
			}
			this.sketcher.tempRing = ringUse;
			this.sketcher.repaint();
		}
	};
	_.innerclick = function(e) {
		if (!this.sketcher.hovering && !this.sketcher.oneMolecule && this.newMolAllowed) {
			this.sketcher.historyManager.pushUndo(new actions.NewMoleculeAction(this.sketcher, [ new structures.Atom('C', e.p.x, e.p.y) ], []));
			if (!this.sketcher.isMobile) {
				this.mousemove(e);
			}
			this.newMolAllowed = false;
		}
	};
	_.innermousedown = function(e) {
		this.newMolAllowed = true;
		if (this.sketcher.hovering) {
			this.sketcher.hovering.isHover = false;
			this.sketcher.hovering.isSelected = true;
			this.drag(e);
		}else if(!this.sketcher.requireStartingAtom){
			this.placeRequiredAtom(e);
		}
	};
	_.innermouseup = function(e) {
		if (this.sketcher.tempRing && this.sketcher.hovering) {
			let as = [];
			let bs = [];
			let allAs = this.sketcher.getAllAtoms();
			let unsat = this.unsaturated || this.numSides===-1 && monitor.SHIFT;
			if (this.sketcher.hovering instanceof structures.Atom) {
				if (allAs.indexOf(this.sketcher.tempRing[0]) === -1) {
					as.push(this.sketcher.tempRing[0]);
				}
				if (!this.sketcher.bondExists(this.sketcher.hovering, this.sketcher.tempRing[0])) {
					bs.push(new structures.Bond(this.sketcher.hovering, this.sketcher.tempRing[0]));
				}
				for ( let i = 1, ii = this.sketcher.tempRing.length; i < ii; i++) {
					let ai = this.sketcher.tempRing[i];
					let aip = this.sketcher.tempRing[i-1];
					if (allAs.indexOf(ai) === -1) {
						as.push(ai);
					}
					if (!this.sketcher.bondExists(aip, ai)) {
						bs.push(new structures.Bond(aip, ai, unsat && i % 2 === 1 && ai.getImplicitHydrogenCount()>1 && aip.getImplicitHydrogenCount()>1 ? 2 : 1));
					}
				}
				if (!this.sketcher.bondExists(this.sketcher.tempRing[this.sketcher.tempRing.length - 1], this.sketcher.hovering)) {
					bs.push(new structures.Bond(this.sketcher.tempRing[this.sketcher.tempRing.length - 1], this.sketcher.hovering, unsat && this.sketcher.tempRing.length%2===1 && this.sketcher.tempRing[this.sketcher.tempRing.length - 1].getImplicitHydrogenCount()>1 && this.sketcher.hovering.getImplicitHydrogenCount()>1 ? 2 : 1));
				}
			} else if (this.sketcher.hovering instanceof structures.Bond) {
				let start = this.sketcher.hovering.a2;
				let end = this.sketcher.hovering.a1;
				if (this.sketcher.tempRing[0] === this.sketcher.hovering.a1) {
					start = this.sketcher.hovering.a1;
					end = this.sketcher.hovering.a2;
				}
				if (allAs.indexOf(this.sketcher.tempRing[1]) === -1) {
					as.push(this.sketcher.tempRing[1]);
				}
				if (!this.sketcher.bondExists(start, this.sketcher.tempRing[1])) {
					bs.push(new structures.Bond(start, this.sketcher.tempRing[1]));
				}
				for ( let i = 2, ii = this.sketcher.tempRing.length; i < ii; i++) {
					let ai = this.sketcher.tempRing[i];
					let aip = this.sketcher.tempRing[i - 1];
					if (allAs.indexOf(ai) === -1) {
						as.push(ai);
					}
					if (!this.sketcher.bondExists(aip, ai)) {
						bs.push(new structures.Bond(aip, ai, unsat && i % 2 === 0 && ai.getImplicitHydrogenCount()>1 && aip.getImplicitHydrogenCount()>1 ? 2 : 1));
					}
				}
				if (!this.sketcher.bondExists(this.sketcher.tempRing[this.sketcher.tempRing.length - 1], end)) {
					bs.push(new structures.Bond(this.sketcher.tempRing[this.sketcher.tempRing.length - 1], end, unsat && this.sketcher.tempRing.length % 2 === 0 && this.sketcher.tempRing[this.sketcher.tempRing.length - 1].getImplicitHydrogenCount()>1 && end.getImplicitHydrogenCount()>1 ? 2 : 1));
				}
			}
			if (as.length !== 0 || bs.length !== 0) {
				this.sketcher.historyManager.pushUndo(new actions.AddAction(this.sketcher, bs[0].a1, as, bs));
			}
			for ( let j = 0, jj = allAs.length; j < jj; j++) {
				allAs[j].isOverlap = false;
			}
		}
		this.sketcher.tempRing = undefined;
		if (!this.sketcher.isMobile) {
			this.mousemove(e);
		}
	};
	_.innermousemove = function(e) {
		if (this.sketcher.tempAtom) {
			return;
		}
		this.findHoveredObject(e, true, true);
		if (this.sketcher.startAtom) {
			if (this.sketcher.hovering) {
				this.sketcher.startAtom.x = -10;
				this.sketcher.startAtom.y = -10;
			} else {
				this.sketcher.startAtom.x = e.p.x;
				this.sketcher.startAtom.y = e.p.y;
			}
		}
	};
	_.innermouseout = function(e) {
		this.removeStartAtom();
	};

})(ChemDoodle.math, ChemDoodle.monitor, ChemDoodle.uis.actions, ChemDoodle.uis.states, ChemDoodle.structures, Math);
(function(math, monitor, actions, states, io, structures, m, undefined) {
	'use strict';
	
	let INTERPRETER = new io.JSONInterpreter();
	
	states.NewTemplateState = function(sketcher) {
		states._State.call(this, sketcher);
		this.template = {"a":[{"x":270,"i":"a0","y":105},{"x":252.6795,"i":"a1","y":115},{"x":252.6795,"i":"a2","y":135},{"x":270,"i":"a3","y":145},{"x":287.3205,"i":"a4","y":135},{"x":287.3205,"i":"a5","y":115},{"x":270,"i":"a6","y":85},{"x":287.3205,"i":"a7","y":75},{"x":270,"i":"a8","y":165,"l":"O"},{"x":252.6795,"i":"a9","y":175},{"x":252.6795,"i":"a10","y":195},{"x":252.6795,"i":"a11","y":215},{"x":252.6795,"i":"a12","y":235,"l":"Si"},{"x":272.6795,"i":"a13","y":235},{"x":232.6795,"i":"a14","y":235},{"x":252.6795,"i":"a15","y":255}],"b":[{"b":0,"e":1,"i":"b0","o":2},{"b":1,"e":2,"i":"b1"},{"b":2,"e":3,"i":"b2","o":2},{"b":3,"e":4,"i":"b3"},{"b":4,"e":5,"i":"b4","o":2},{"b":5,"e":0,"i":"b5"},{"b":0,"e":6,"i":"b6"},{"b":6,"e":7,"i":"b7","o":2},{"b":3,"e":8,"i":"b8"},{"b":8,"e":9,"i":"b9"},{"b":9,"e":10,"i":"b10"},{"b":10,"e":11,"i":"b11","o":3},{"b":11,"e":12,"i":"b12"},{"b":12,"e":13,"i":"b13"},{"b":12,"e":14,"i":"b14"},{"b":12,"e":15,"i":"b15"}]};
		this.attachPos = 0;
	};
	let _ = states.NewTemplateState.prototype = new states._State();
	_.getTemplate = function(p) {
		let origin = this.sketcher.hovering;
		let newMol = INTERPRETER.molFrom(this.template);
		newMol.scaleToAverageBondLength(this.sketcher.styles.bondLength_2D);
		let pivot = newMol.atoms[this.attachPos];
		let thrad = origin.angle(p);
		let rotate = true;
		if (!monitor.ALT) {
			if (origin.distance(p) < 15) {
				let angles = this.sketcher.getMoleculeByAtom(this.sketcher.hovering).getAngles(this.sketcher.hovering);
				if (angles.length === 0) {
					thrad = 0;
					rotate = false;
				} else if (angles.length === 1) {
					thrad = angles[0] + m.PI;
				} else {
					thrad = math.angleBetweenLargest(angles).angle;
				}
				let angles2 = newMol.getAngles(pivot);
				if (angles2.length === 1) {
					thrad -= angles2[0] + (angles.length === 1 ? m.PI / 3 : 0);
				} else {
					thrad -= math.angleBetweenLargest(angles2).angle + m.PI;
				}
			} else {
				let divider = m.round(thrad / (m.PI / 6));
				thrad = divider * m.PI / 6;
			}
		}
		let difx = origin.x-pivot.x;
		let dify = origin.y-pivot.y;
		for(let i = 0, ii = newMol.atoms.length; i<ii; i++){
			let a = newMol.atoms[i];
			a.x+=difx;
			a.y+=dify;
		}
		if (rotate) {
			for(let i = 0, ii = newMol.atoms.length; i<ii; i++){
				let a = newMol.atoms[i];
				let angleUse = a.angle(origin) + thrad;
				let distance = pivot.distance(a);
				if (monitor.SHIFT) {
					distance *= origin.distance(p) / this.sketcher.styles.bondLength_2D;
				}
				a.x = origin.x - m.cos(angleUse) * distance;
				a.y = origin.y + m.sin(angleUse) * distance;
			}
		}
		let allAs = this.sketcher.getAllAtoms();
		let allBs = this.sketcher.getAllBonds();
		for ( let j = 0, jj = allAs.length; j < jj; j++) {
			let a2 = allAs[j];
			a2.isOverlap = false;
			let hits = [];
			for(let i = 0, ii = newMol.atoms.length; i<ii; i++){
				let a = newMol.atoms[i];
				if (a2.distance(a) < 5) {
					hits.push(i);
				}
			}
			// make sure to look for the closest, as several atoms may
			// try to merge onto a single atom...
			let closest = -1;
			for(let i = 0, ii = hits.length; i<ii; i++){
				let h = hits[i];
				if (closest === -1 || a2.distance(newMol.atoms[h]) < a2.distance(newMol.atoms[closest])) {
					closest = h;
				}
			}
			if (closest !== -1) {
				let a = newMol.atoms[closest];
				newMol.atoms.splice(closest,1);
				if (a2.x!==pivot.x || a2.y!==pivot.y) {
					a2.isOverlap = true;
				}
				for(let i = 0, ii = newMol.bonds.length; i<ii; i++){
					let b = newMol.bonds[i];
					if(b.a1===a){
						b.a1 = a2;
						b.tmpreplace1 = true;
					}else if(b.a2===a){
						b.a2 = a2;
						b.tmpreplace2 = true;
					}
					if(b.tmpreplace1 && b.tmpreplace2){
						// get rid of the bond if both atoms are overlapping
						// just double check that that bond doesn't exist even if the atoms have both been replaced
						let match = false;
						for(let k = 0, kk = allBs.length; k<kk; k++){
							let b2 = allBs[k];
							if(b.a1===b2.a1 && b.a2===b2.a2 || b.a2===b2.a1 && b.a1===b2.a2){
								match = true;
								break;
							}
						}
						if(match){
							newMol.bonds.splice(i--,1);
							ii--;
						}
					}
				}
			}
		}
		newMol.check();
		newMol.check(true);
		return newMol;
	};

	_.innerexit = function() {
		this.removeStartAtom();
	};
	_.innerdrag = function(e) {
		this.newMolAllowed = false;
		this.removeStartAtom();
		if (this.sketcher.hovering) {
			this.sketcher.tempTemplate = this.getTemplate(e.p);
			this.sketcher.repaint();
		}
	};
	_.innerclick = function(e) {
		if (!this.sketcher.hovering && !this.sketcher.oneMolecule && this.newMolAllowed) {
			this.sketcher.historyManager.pushUndo(new actions.NewMoleculeAction(this.sketcher, [ new structures.Atom('C', e.p.x, e.p.y) ], []));
			if (!this.sketcher.isMobile) {
				this.mousemove(e);
			}
			this.newMolAllowed = false;
		}
	};
	_.innermousedown = function(e) {
		this.newMolAllowed = true;
		if (this.sketcher.hovering) {
			this.sketcher.hovering.isHover = false;
			this.sketcher.hovering.isSelected = true;
			this.drag(e);
		}else if(!this.sketcher.requireStartingAtom){
			this.placeRequiredAtom(e);
		}
	};
	_.innermouseup = function(e) {
		if (this.sketcher.hovering && this.sketcher.tempTemplate) {
			if(this.sketcher.tempTemplate.atoms.length!==0){
				this.sketcher.historyManager.pushUndo(new actions.AddAction(this.sketcher, this.sketcher.hovering, this.sketcher.tempTemplate.atoms, this.sketcher.tempTemplate.bonds));
			}
			let allAs = this.sketcher.getAllAtoms();
			for ( let i = 0, ii = allAs.length; i < ii; i++) {
				allAs[i].isOverlap = false;
			}
			this.sketcher.tempTemplate = undefined;
		}
		if (!this.sketcher.isMobile) {
			this.mousemove(e);
		}
	};
	_.innermousemove = function(e) {
		if (this.sketcher.tempAtom) {
			return;
		}
		this.findHoveredObject(e, true);
		if (this.sketcher.startAtom) {
			if (this.sketcher.hovering) {
				this.sketcher.startAtom.x = -10;
				this.sketcher.startAtom.y = -10;
			} else {
				this.sketcher.startAtom.x = e.p.x;
				this.sketcher.startAtom.y = e.p.y;
			}
		}
	};
	_.innermouseout = function(e) {
		this.removeStartAtom();
	};

})(ChemDoodle.math, ChemDoodle.monitor, ChemDoodle.uis.actions, ChemDoodle.uis.states, ChemDoodle.io, ChemDoodle.structures, Math);

(function(structures, d2, actions, states, undefined) {
	'use strict';
	states.PusherState = function(sketcher) {
		states._State.call(this, sketcher);
		this.dontTranslateOnDrag = true;
	};
	let _ = states.PusherState.prototype = new states._State();
	_.numElectron = 1;
	_.innermousedown = function(e) {
		if (this.sketcher.hovering && this.start!==this.sketcher.hovering) {
			if(!this.start){
				this.start = this.sketcher.hovering;
			}
		}else{
			this.start = undefined;
			this.end = undefined;
			this.sketcher.repaint();
		}
	};
	_.innerdrag = function(e) {
		if (this.start) {
			this.end = new structures.Point(e.p.x, e.p.y);
			this.findHoveredObject(e, true, this.numElectron!=-10);
			this.sketcher.repaint();
		}
	};
	_.innermouseup = function(e) {
		if (this.start && this.sketcher.hovering && this.sketcher.hovering !== this.start) {
			let dup;
			let remove = false;
			for ( let i = 0, ii = this.sketcher.shapes.length; i < ii; i++) {
				let s = this.sketcher.shapes[i];
				if (s instanceof d2.Pusher) {
					if (s.o1 === this.start && s.o2 === this.sketcher.hovering) {
						dup = s;
					} else if (s.o2 === this.start && s.o1 === this.sketcher.hovering) {
						dup = s;
						remove = true;
					}
				}else if (s instanceof d2.AtomMapping) {
					if (s.o1 === this.start && s.o2 === this.sketcher.hovering || s.o2 === this.start && s.o1 === this.sketcher.hovering) {
						dup = s;
						remove = true;
					}
				}
			}
			if (dup) {
				if (remove) {
					this.sketcher.historyManager.pushUndo(new actions.DeleteShapeAction(this.sketcher, dup));
				}
				this.start = undefined;
				this.end = undefined;
				this.sketcher.repaint();
			} else {
				let shape;
				if(this.numElectron==-10){
					shape = new d2.AtomMapping(this.start, this.sketcher.hovering);
				}else{
					shape = new d2.Pusher(this.start, this.sketcher.hovering, this.numElectron);
				}
				this.start = undefined;
				this.end = undefined;
				this.sketcher.historyManager.pushUndo(new actions.AddShapeAction(this.sketcher, shape));
			}
		} else {
			//this.start = undefined;
			//this.end = undefined;
			//this.sketcher.repaint();
		}
	};
	_.innermousemove = function(e) {
		if(this.start){
			this.end = new structures.Point(e.p.x, e.p.y);
		}
		this.findHoveredObject(e, true, this.numElectron!=-10);
		this.sketcher.repaint();
	};
	_.draw = function(ctx, styles) {
		if (this.start && this.end) {
			ctx.strokeStyle = styles.colorPreview;
			ctx.fillStyle = styles.colorPreview;
			ctx.lineWidth = 1;
			let p1 = this.start instanceof structures.Atom ? this.start : this.start.getCenter();
			let p2 = this.end;
			if (this.sketcher.hovering && this.sketcher.hovering !== this.start) {
				p2 = this.sketcher.hovering instanceof structures.Atom ? this.sketcher.hovering : this.sketcher.hovering.getCenter();
			}
			ctx.beginPath();
			ctx.moveTo(p1.x, p1.y);
			ctx.lineTo(p2.x, p2.y);
			ctx.setLineDash([2]);
			ctx.stroke();
			ctx.setLineDash([]);
		}
	};

})(ChemDoodle.structures, ChemDoodle.structures.d2, ChemDoodle.uis.actions, ChemDoodle.uis.states);

(function(actions, states, structures, d2, undefined) {
	'use strict';
	states.QueryState = function(sketcher) {
		states._State.call(this, sketcher);
	};
	let _ = states.QueryState.prototype = new states._State();
	_.innermouseup = function(e) {
		if (this.sketcher.hovering) {
			if(this.sketcher.hovering instanceof structures.Atom){
				this.sketcher.dialogManager.atomQueryDialog.setAtom(this.sketcher.hovering);
				this.sketcher.dialogManager.atomQueryDialog.open();
			}else if(this.sketcher.hovering instanceof structures.Bond){
				this.sketcher.dialogManager.bondQueryDialog.setBond(this.sketcher.hovering);
				this.sketcher.dialogManager.bondQueryDialog.open();
			}
		}
	};
	_.innermousemove = function(e) {
		this.findHoveredObject(e, true, true, false);
	};

})(ChemDoodle.uis.actions, ChemDoodle.uis.states, ChemDoodle.structures, ChemDoodle.structures.d2);

(function(actions, states, undefined) {
	'use strict';
	states.RadicalState = function(sketcher) {
		states._State.call(this, sketcher);
	};
	let _ = states.RadicalState.prototype = new states._State();
	_.delta = 1;
	_.innermouseup = function(e) {
		if (this.delta < 0 && this.sketcher.hovering.numRadical < 1) {
			return;
		}
		if (this.sketcher.hovering) {
			this.sketcher.historyManager.pushUndo(new actions.ChangeRadicalAction(this.sketcher.hovering, this.delta));
		}
	};
	_.innermousemove = function(e) {
		this.findHoveredObject(e, true, false);
	};

})(ChemDoodle.uis.actions, ChemDoodle.uis.states);

(function(math, monitor, structures, d2, actions, states, m, undefined) {
	'use strict';
	states.ShapeState = function(sketcher) {
		states._State.call(this, sketcher);
		this.dontTranslateOnDrag = true;
	};
	let _ = states.ShapeState.prototype = new states._State();
	_.shapeType = states.ShapeState.LINE;
	_.superDoubleClick = _.dblclick;
	_.dblclick = function(e) {
		// override double click not to center when editing shapes
		if (!this.control) {
			this.superDoubleClick(e);
		}
	};
	_.innerexit = function(e) {
		// set it back to line to remove graphical controls for other shapes
		this.shapeType = states.ShapeState.LINE;
		this.sketcher.repaint();
	};
	_.innermousemove = function(e) {
		this.control = undefined;
		if (this.shapeType === states.ShapeState.BRACKET) {
			let size = 6;
			for ( let i = 0, ii = this.sketcher.shapes.length; i < ii; i++) {
				let s = this.sketcher.shapes[i];
				if (s instanceof d2.Bracket) {
					let minX = m.min(s.p1.x, s.p2.x);
					let maxX = m.max(s.p1.x, s.p2.x);
					let minY = m.min(s.p1.y, s.p2.y);
					let maxY = m.max(s.p1.y, s.p2.y);
					let hits = [];
					hits.push({
						x : maxX + 5,
						y : minY + 15,
						v : 1
					});
					hits.push({
						x : maxX + 5,
						y : maxY + 15,
						v : 2
					});
					hits.push({
						x : minX - 17,
						y : (minY + maxY) / 2 + 15,
						v : 3
					});
					for ( let j = 0, jj = hits.length; j < jj; j++) {
						let h = hits[j];
						if (math.isBetween(e.p.x, h.x, h.x + size * 2) && math.isBetween(e.p.y, h.y - size, h.y)) {
							this.control = {
								s : s,
								t : h.v
							};
							break;
						} else if (math.isBetween(e.p.x, h.x, h.x + size * 2) && math.isBetween(e.p.y, h.y + size, h.y + size * 2)) {
							this.control = {
								s : s,
								t : -1 * h.v
							};
							break;
						}
					}
					if (this.control) {
						break;
					}
				}
			}
			this.sketcher.repaint();
		}
	};
	_.innermousedown = function(e) {
		if (this.control) {
			this.sketcher.historyManager.pushUndo(new actions.ChangeBracketAttributeAction(this.control.s, this.control.t));
			this.sketcher.repaint();
		} else {
			this.start = new structures.Point(e.p.x, e.p.y);
			this.end = this.start;
		}
	};
	_.innerdrag = function(e) {
		this.end = new structures.Point(e.p.x, e.p.y);
		if (this.shapeType === states.ShapeState.BRACKET) {
			if (monitor.SHIFT) {
				let difx = this.end.x - this.start.x;
				let dify = this.end.y - this.start.y;
				if (difx < 0 && dify > 0) {
					dify *= -1;
				} else if (difx > 0 && dify < 0) {
					difx *= -1;
				}
				let difuse = dify;
				if (m.abs(difx) < m.abs(dify)) {
					difuse = difx;
				}
				this.end.x = this.start.x + difuse;
				this.end.y = this.start.y + difuse;
			}
		} else {
			if (!monitor.ALT) {
				let angle = this.start.angle(this.end);
				let length = this.start.distance(this.end);
				if (!monitor.ALT) {
					let increments = m.floor((angle + m.PI / 12) / (m.PI / 6));
					angle = increments * m.PI / 6;
				}
				this.end.x = this.start.x + length * m.cos(angle);
				this.end.y = this.start.y - length * m.sin(angle);
			}
		}
		this.sketcher.repaint();
	};
	_.innermouseup = function(e) {
		if (this.start && this.end) {
			let shape;
			if (this.start.distance(this.end) > 5) {
				if (this.shapeType >= states.ShapeState.LINE && this.shapeType <= states.ShapeState.ARROW_EQUILIBRIUM) {
					shape = new d2.Line(this.start, this.end);
					if (this.shapeType === states.ShapeState.ARROW_SYNTHETIC) {
						shape.arrowType = d2.Line.ARROW_SYNTHETIC;
					} else if (this.shapeType === states.ShapeState.ARROW_RETROSYNTHETIC) {
						shape.arrowType = d2.Line.ARROW_RETROSYNTHETIC;
					} else if (this.shapeType === states.ShapeState.ARROW_RESONANCE) {
						shape.arrowType = d2.Line.ARROW_RESONANCE;
					} else if (this.shapeType === states.ShapeState.ARROW_EQUILIBRIUM) {
						shape.arrowType = d2.Line.ARROW_EQUILIBRIUM;
					}
				} else if (this.shapeType === states.ShapeState.BRACKET) {
					shape = new d2.Bracket(this.start, this.end);
				}
			}
			this.start = undefined;
			this.end = undefined;
			if (shape) {
				this.sketcher.historyManager.pushUndo(new actions.AddShapeAction(this.sketcher, shape));
			}
		}
	};
	function drawBracketControl(ctx, styles, x, y, control, type) {
		let size = 6;
		if (control && m.abs(control.t) === type) {
			ctx.fillStyle = styles.colorHover;
			ctx.beginPath();
			if (control.t > 0) {
				ctx.moveTo(x, y);
				ctx.lineTo(x + size, y - size);
				ctx.lineTo(x + size * 2, y);
			} else {
				ctx.moveTo(x, y + size);
				ctx.lineTo(x + size, y + size * 2);
				ctx.lineTo(x + size * 2, y + size);
			}
			ctx.closePath();
			ctx.fill();
		}
		ctx.strokeStyle = 'blue';
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x + size, y - size);
		ctx.lineTo(x + size * 2, y);
		ctx.moveTo(x, y + size);
		ctx.lineTo(x + size, y + size * 2);
		ctx.lineTo(x + size * 2, y + size);
		ctx.stroke();
	}
	_.draw = function(ctx, styles) {
		if (this.start && this.end) {
			ctx.strokeStyle = styles.colorPreview;
			ctx.fillStyle = styles.colorPreview;
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(this.start.x, this.start.y);
			if (this.shapeType === states.ShapeState.BRACKET) {
				ctx.lineTo(this.end.x, this.start.y);
				ctx.lineTo(this.end.x, this.end.y);
				ctx.lineTo(this.start.x, this.end.y);
				ctx.lineTo(this.start.x, this.start.y);
			} else {
				ctx.lineTo(this.end.x, this.end.y);
			}
			ctx.setLineDash([2]);
			ctx.stroke();
			ctx.setLineDash([]);
		} else if (this.shapeType === states.ShapeState.BRACKET) {
			ctx.lineWidth = 2;
			ctx.lineJoin = 'miter';
			ctx.lineCap = 'butt';
			for ( let i = 0, ii = this.sketcher.shapes.length; i < ii; i++) {
				let s = this.sketcher.shapes[i];
				if (s instanceof d2.Bracket) {
					let minX = m.min(s.p1.x, s.p2.x);
					let maxX = m.max(s.p1.x, s.p2.x);
					let minY = m.min(s.p1.y, s.p2.y);
					let maxY = m.max(s.p1.y, s.p2.y);
					let c = this.control && this.control.s === s ? this.control : undefined;
					drawBracketControl(ctx, styles, maxX + 5, minY + 15, c, 1);
					drawBracketControl(ctx, styles, maxX + 5, maxY + 15, c, 2);
					drawBracketControl(ctx, styles, minX - 17, (minY + maxY) / 2 + 15, c, 3);
				}
			}
		}

	};

	states.ShapeState.LINE = 1;
	states.ShapeState.ARROW_SYNTHETIC = 2;
	states.ShapeState.ARROW_RETROSYNTHETIC = 3;
	states.ShapeState.ARROW_RESONANCE = 4;
	states.ShapeState.ARROW_EQUILIBRIUM = 5;
	states.ShapeState.BRACKET = 10;

})(ChemDoodle.math, ChemDoodle.monitor, ChemDoodle.structures, ChemDoodle.structures.d2, ChemDoodle.uis.actions, ChemDoodle.uis.states, Math);

(function(math, structures, d2, actions, states, undefined) {
	'use strict';
	states.VAPState = function(sketcher) {
		states._State.call(this, sketcher);
		this.dontTranslateOnDrag = true;
	};
	let _ = states.VAPState.prototype = new states._State();
	_.innermousedown = function(e) {
		if(!this.sketcher.hovering && (!this.start || !(this.start instanceof d2.VAP))){
			// out of convenience, since the user cannot drag from the VAP asterisk and may accidentally try to, don't allow placement of another vap within 30 pixels
			let add = true; 
			for ( let i = 0, ii = this.sketcher.shapes.length; i < ii; i++) {
				let s = this.sketcher.shapes[i];
				if(s instanceof d2.VAP && s.asterisk.distance(e.p)<30){
					add = false;
				}
			}
			if(add){
				let vap = new d2.VAP(e.p.x, e.p.y);
				if (!this.sketcher.isMobile) {
					vap.isHover = true;
					this.sketcher.hovering = vap;
				}
				this.sketcher.historyManager.pushUndo(new actions.AddShapeAction(this.sketcher, vap));
			}
		}else if (this.sketcher.hovering && this.start!==this.sketcher.hovering) {
			if(this.sketcher.hovering.hoverBond){
				let vap = this.sketcher.hovering;
				if(vap.hoverBond===vap.substituent){
					let nbo = 1;
					if(vap.bondType===1 || vap.bondType===2){
						nbo = vap.bondType+1;
					}else if(vap.bondType===3){
						nbo = .5;
					}
					this.sketcher.historyManager.pushUndo(new actions.ChangeVAPOrderAction(vap, nbo));
				}else {
					this.sketcher.historyManager.pushUndo(new actions.ChangeVAPSubstituentAction(vap, this.sketcher.hovering.hoverBond));
				}
			}else if(!this.start){
				this.start = this.sketcher.hovering;
			}
		}else{
			this.start = undefined;
			this.end = undefined;
			this.sketcher.repaint();
		}
	};
	_.innerdrag = function(e) {
		if (this.start) {
			this.end = new structures.Point(e.p.x, e.p.y);
			this.findHoveredObject(e, this.start instanceof d2.VAP, false, this.start instanceof structures.Atom);
			this.sketcher.repaint();
		}
	};
	_.innermouseup = function(e) {
		if (this.start && this.sketcher.hovering && this.sketcher.hovering !== this.start) {
			let vap = this.sketcher.hovering;
			let attach = this.start;
			if(attach instanceof d2.VAP){
				let tmp = vap;
				vap = attach;
				attach = tmp;
			}
			if(vap.substituent!==attach && vap.attachments.indexOf(attach)===-1){
				this.sketcher.historyManager.pushUndo(new actions.AddVAPAttachementAction(vap, attach, vap.substituent===undefined));
			}
			this.start = undefined;
			this.end = undefined;
			this.sketcher.repaint();
		} else {
			//this.start = undefined;
			//this.end = undefined;
			//this.sketcher.repaint();
		}
	};
	_.innermousemove = function(e) {
		if(this.start){
			this.end = new structures.Point(e.p.x, e.p.y);
			this.findHoveredObject(e, this.start instanceof d2.VAP, false, this.start instanceof structures.Atom);
		}else{
			this.findHoveredObject(e, true, true, true);
		}
		this.sketcher.repaint();
	};
	_.draw = function(ctx, styles) {
		if (this.start && this.end) {
			ctx.strokeStyle = styles.colorPreview;
			ctx.fillStyle = styles.colorPreview;
			ctx.lineWidth = 1;
			let p1 = this.start;
			let p2 = this.end;
			if (this.sketcher.hovering) {
				p2 = this.sketcher.hovering;
			}
			if(p1 instanceof d2.VAP){
				p1 = p1.asterisk;
			}
			if(p2 instanceof d2.VAP){
				p2 = p2.asterisk;
			}
			ctx.beginPath();
			ctx.moveTo(p1.x, p1.y);
			ctx.lineTo(p2.x, p2.y);
			ctx.setLineDash([2]);
			ctx.stroke();
			ctx.setLineDash([]);
		}
	};
	_.findHoveredObject = function(e, includeAtoms, includeVAPsBonds, includeVAPsAsterisks) {
		this.clearHover();
		let min = Infinity;
		let hovering;
		let hoverdist = 10;
		if (!this.sketcher.isMobile) {
			hoverdist /= this.sketcher.styles.scale;
		}
		if (includeAtoms) {
			for ( let i = 0, ii = this.sketcher.molecules.length; i < ii; i++) {
				let mol = this.sketcher.molecules[i];
				for ( let j = 0, jj = mol.atoms.length; j < jj; j++) {
					let a = mol.atoms[j];
					a.isHover = false;
					let dist = e.p.distance(a);
					if (dist < hoverdist && dist < min) {
						min = dist;
						hovering = a;
					}
				}
			}
		}
		if (includeVAPsBonds) {
			for ( let i = 0, ii = this.sketcher.shapes.length; i < ii; i++) {
				let s = this.sketcher.shapes[i];
				if(s instanceof d2.VAP){
					s.hoverBond = undefined;
					if(s.substituent){
						let att = s.substituent;
						let dist = math.distanceFromPointToLineInclusive(e.p, s.asterisk, att, hoverdist/2);
						if (dist !== -1 && dist < hoverdist && dist < min) {
							min = dist;
							s.hoverBond = att;
							hovering = s;
						}
					}
					for ( let j = 0, jj = s.attachments.length; j < jj; j++) {
						let att = s.attachments[j];
						let dist = math.distanceFromPointToLineInclusive(e.p, s.asterisk, att, hoverdist/2);
						if (dist !== -1 && dist < hoverdist && dist < min) {
							min = dist;
							s.hoverBond = att;
							hovering = s;
						}
					}
				}
			}
		}
		if (includeVAPsAsterisks) {
			for ( let i = 0, ii = this.sketcher.shapes.length; i < ii; i++) {
				let s = this.sketcher.shapes[i];
				if(s instanceof d2.VAP){
					s.isHover = false;
					let dist = e.p.distance(s.asterisk);
					if (dist < hoverdist && dist < min) {
						min = dist;
						hovering = s;
					}
				}
			}
		}
		if (hovering) {
			hovering.isHover = true;
			this.sketcher.hovering = hovering;
		}
	};

})(ChemDoodle.math, ChemDoodle.structures, ChemDoodle.structures.d2, ChemDoodle.uis.actions, ChemDoodle.uis.states);

(function(states, undefined) {
	'use strict';
	states.StateManager = function(sketcher) {
		this.STATE_NEW_BOND = new states.NewBondState(sketcher);
		this.STATE_NEW_RING = new states.NewRingState(sketcher);
		this.STATE_NEW_CHAIN = new states.NewChainState(sketcher);
		this.STATE_NEW_TEMPLATE= new states.NewTemplateState(sketcher);
		if(states.TextInputState){
			this.STATE_TEXT_INPUT= new states.TextInputState(sketcher);
		}
		this.STATE_CHARGE = new states.ChargeState(sketcher);
		this.STATE_LONE_PAIR = new states.LonePairState(sketcher);
		this.STATE_RADICAL = new states.RadicalState(sketcher);
		this.STATE_ATTRIBUTE_INPUT = new states.AttributeInputState(sketcher);
		this.STATE_MOVE = new states.MoveState(sketcher);
		this.STATE_ERASE = new states.EraseState(sketcher);
		this.STATE_LABEL = new states.LabelState(sketcher);
		this.STATE_LASSO = new states.LassoState(sketcher);
		this.STATE_SHAPE = new states.ShapeState(sketcher);
		this.STATE_PUSHER = new states.PusherState(sketcher);
		this.STATE_REPEAT_UNIT = new states.RepeatUnitState(sketcher);
		this.STATE_VAP = new states.VAPState(sketcher);
		this.STATE_QUERY = new states.QueryState(sketcher);
		let currentState = this.STATE_NEW_BOND;
		currentState.enter();
		this.setState = function(nextState) {
			if (nextState !== currentState) {
				currentState.exit();
				currentState = nextState;
				currentState.enter();
			}
		};
		this.getCurrentState = function() {
			return currentState;
		};
	};

})(ChemDoodle.uis.states);

(function(math, monitor, structures, tools, undefined) {
	'use strict';
	tools.Lasso = function(sketcher) {
		this.sketcher = sketcher;
		this.atoms = [];
		this.shapes = [];
		this.bounds = undefined;
		this.mode = tools.Lasso.MODE_LASSO;
		this.points = [];
	};
	tools.Lasso.MODE_LASSO = 'lasso';
	tools.Lasso.MODE_LASSO_SHAPES = 'shapes';
	tools.Lasso.MODE_RECTANGLE_MARQUEE = 'rectangle';
	let _ = tools.Lasso.prototype;
	_.select = function(atoms, shapes) {
		if (this.block) {
			return;
		}
		if (!monitor.SHIFT) {
			this.empty();
		}
		if (atoms) {
			this.atoms = atoms.slice(0);
			this.shapes = shapes.slice(0);
		} else {
			if (this.mode !== tools.Lasso.MODE_LASSO_SHAPES) {
				let asAdd = [];
				for ( let i = 0, ii = this.sketcher.molecules.length; i < ii; i++) {
					let mol = this.sketcher.molecules[i];
					for ( let j = 0, jj = mol.atoms.length; j < jj; j++) {
						let a = mol.atoms[j];
						if (this.mode === tools.Lasso.MODE_RECTANGLE_MARQUEE) {
							if (this.points.length === 2) {
								if (math.isBetween(a.x, this.points[0].x, this.points[1].x) && math.isBetween(a.y, this.points[0].y, this.points[1].y)) {
									asAdd.push(a);
								}
							}
						} else {
							if (this.points.length > 1) {
								if (math.isPointInPoly(this.points, a)) {
									asAdd.push(a);
								}
							}
						}
					}
				}
				if (this.atoms.length === 0) {
					this.atoms = asAdd;
				} else {
					let asFinal = [];
					for ( let i = 0, ii = this.atoms.length; i < ii; i++) {
						let a = this.atoms[i];
						if (asAdd.indexOf(a) === -1) {
							asFinal.push(a);
						} else {
							a.isLassoed = false;
						}
					}
					for ( let i = 0, ii = asAdd.length; i < ii; i++) {
						if (this.atoms.indexOf(asAdd[i]) === -1) {
							asFinal.push(asAdd[i]);
						}
					}
					this.atoms = asFinal;
				}
			}
			let ssAdd = [];
			for ( let i = 0, ii = this.sketcher.shapes.length; i < ii; i++) {
				let s = this.sketcher.shapes[i];
				let sps = s.getPoints();
				let contained = sps.length>0;
				for ( let j = 0, jj = sps.length; j < jj; j++) {
					let p = sps[j];
					if (this.mode === tools.Lasso.MODE_RECTANGLE_MARQUEE) {
						if (this.points.length === 2) {
							if (!math.isBetween(p.x, this.points[0].x, this.points[1].x) || !math.isBetween(p.y, this.points[0].y, this.points[1].y)) {
								contained = false;
								break;
							}
						} else {
							contained = false;
							break;
						}
					} else {
						if (this.points.length > 1) {
							if (!math.isPointInPoly(this.points, p)) {
								contained = false;
								break;
							}
						} else {
							contained = false;
							break;
						}
					}
				}
				if (contained) {
					ssAdd.push(s);
				}
			}
			if (this.shapes.length === 0) {
				this.shapes = ssAdd;
			} else {
				let ssFinal = [];
				for ( let i = 0, ii = this.shapes.length; i < ii; i++) {
					let s = this.shapes[i];
					if (ssAdd.indexOf(s) === -1) {
						asFinal.push(s);
					} else {
						s.isLassoed = false;
					}
				}
				for ( let i = 0, ii = ssAdd.length; i < ii; i++) {
					if (this.shapes.indexOf(ssAdd[i]) === -1) {
						ssFinal.push(ssAdd[i]);
					}
				}
				this.shapes = ssFinal;
			}
		}
		for ( let i = 0, ii = this.atoms.length; i < ii; i++) {
			this.atoms[i].isLassoed = true;
		}
		for ( let i = 0, ii = this.shapes.length; i < ii; i++) {
			this.shapes[i].isLassoed = true;
		}
		this.setBounds();
		if (this.bounds && this.bounds.minX === Infinity) {
			this.empty();
		}
		this.points = [];
		this.sketcher.stateManager.getCurrentState().clearHover();
		this.enableButtons();
		this.sketcher.repaint();
	};
	_.enableButtons = function() {
		if (this.sketcher.useServices) {
			if (this.atoms.length > 0) {
				this.sketcher.toolbarManager.buttonClean.enable();
				this.sketcher.toolbarManager.buttonCalculate.enable();
			} else {
				this.sketcher.toolbarManager.buttonClean.disable();
				this.sketcher.toolbarManager.buttonCalculate.disable();
			}
		}
		if(this.atoms.length>0 || this.shapes.length>0){
			this.sketcher.toolbarManager.buttonSave.enable();
			this.sketcher.toolbarManager.buttonCut.enable();
			this.sketcher.toolbarManager.buttonCopy.enable();
			this.sketcher.toolbarManager.buttonFlipVert.enable();
			this.sketcher.toolbarManager.buttonFlipHor.enable();
		}else{
			this.sketcher.toolbarManager.buttonSave.disable();
			this.sketcher.toolbarManager.buttonCut.disable();
			this.sketcher.toolbarManager.buttonCopy.disable();
			this.sketcher.toolbarManager.buttonFlipVert.disable();
			this.sketcher.toolbarManager.buttonFlipHor.disable();
		}
	};
	_.setBounds = function() {
		if (this.isActive()) {
			this.sketcher.repaint();
			this.bounds = new math.Bounds();
			for ( let i = 0, ii = this.atoms.length; i < ii; i++) {
				let a = this.atoms[i];
				this.bounds.expand(a.getBounds());
			}
			for ( let i = 0, ii = this.shapes.length; i < ii; i++) {
				this.bounds.expand(this.shapes[i].getBounds());
			}
			let buffer = 5;
			this.bounds.minX -= buffer;
			this.bounds.minY -= buffer;
			this.bounds.maxX += buffer;
			this.bounds.maxY += buffer;
		} else {
			this.bounds = undefined;
		}
	};
	_.empty = function() {
		for ( let i = 0, ii = this.atoms.length; i < ii; i++) {
			this.atoms[i].isLassoed = false;
		}
		for ( let i = 0, ii = this.shapes.length; i < ii; i++) {
			this.shapes[i].isLassoed = false;
		}
		this.atoms = [];
		this.shapes = [];
		this.bounds = undefined;
		this.enableButtons();
		this.sketcher.repaint();
	};
	_.draw = function(ctx, styles) {
		ctx.strokeStyle = styles.colorSelect;
		ctx.lineWidth = 0.5 / styles.scale;
		ctx.setLineDash([5]);
		if (this.points.length > 0) {
			if (this.mode === tools.Lasso.MODE_RECTANGLE_MARQUEE) {
				if (this.points.length === 2) {
					let p1 = this.points[0];
					let p2 = this.points[1];
					ctx.beginPath();
					ctx.rect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
					ctx.stroke();
				}
			} else {
				if (this.points.length > 1) {
					ctx.beginPath();
					ctx.moveTo(this.points[0].x, this.points[0].y);
					for ( let i = 1, ii = this.points.length; i < ii; i++) {
						ctx.lineTo(this.points[i].x, this.points[i].y);
					}
					ctx.closePath();
					ctx.stroke();
				}
			}
		}
		if (this.bounds) {
			ctx.beginPath();
			ctx.rect(this.bounds.minX, this.bounds.minY, this.bounds.maxX - this.bounds.minX, this.bounds.maxY - this.bounds.minY);
			ctx.stroke();
		}
		ctx.setLineDash([]);
	};
	_.isActive = function() {
		return this.atoms.length > 0 || this.shapes.length > 0;
	};
	_.getFirstMolecule = function() {
		if (this.atoms.length > 0) {
			return this.sketcher.getMoleculeByAtom(this.atoms[0]);
		}
		return undefined;
	};
	_.getBonds = function() {
		let bonds = [];
		if (this.atoms.length > 0) {
			for ( let i = 0, ii = this.sketcher.molecules.length; i < ii; i++) {
				let m = this.sketcher.molecules[i];
				for ( let j = 0, jj = m.bonds.length; j < jj; j++) {
					let b = m.bonds[j];
					if(b.a1.isLassoed && b.a2.isLassoed){
						bonds.push(b);
					}
				}
			}
		}
		return bonds;
	};
	_.getAllPoints = function() {
		let ps = this.atoms;
		for ( let i = 0, ii = this.shapes.length; i < ii; i++) {
			ps = ps.concat(this.shapes[i].getPoints());
		}
		return ps;
	};
	_.addPoint = function(p) {
		if (this.mode === tools.Lasso.MODE_RECTANGLE_MARQUEE) {
			if (this.points.length < 2) {
				this.points.push(p);
			} else {
				let changing = this.points[1];
				changing.x = p.x;
				changing.y = p.y;
			}
		} else {
			this.points.push(p);
		}
	};
	_.selectNextMolecule = function(){
		if (this.sketcher.molecules.length > 0) {
			let nextMolIndex = this.sketcher.molecules.length - 1;
			if (this.atoms.length > 0) {
				let curMol = this.sketcher.getMoleculeByAtom(this.atoms[0]);
				nextMolIndex = this.sketcher.molecules.indexOf(curMol) + 1;
			}
			if (nextMolIndex === this.sketcher.molecules.length) {
				nextMolIndex = 0;
			}
			let mol = this.sketcher.molecules[nextMolIndex];
			let attachedShapes = [];
			// also select shape appendages, like repeating groups
			for(let i = 0, ii = this.sketcher.shapes.length; i<ii; i++){
				let s = this.sketcher.shapes[i];
				if(s instanceof structures.d2.RepeatUnit && s.contents.length!==0 && mol.atoms.indexOf(s.contents[0])!==-1){
					attachedShapes.push(s);
				}
			}
			this.select(mol.atoms, attachedShapes);
		}
	};
	_.selectNextShape = function(){
		if (this.sketcher.shapes.length > 0) {
			let nextShapeIndex = this.sketcher.shapes.length - 1;
			if (this.shapes.length > 0) {
				nextShapeIndex = this.sketcher.shapes.indexOf(this.shapes[0]) + 1;
			}
			if (nextShapeIndex === this.sketcher.shapes.length) {
				nextShapeIndex = 0;
			}
			// have to manually empty because shift modifier key
			// is down
			this.empty();
			this.select([], [ this.sketcher.shapes[nextShapeIndex] ]);
		}
	};

})(ChemDoodle.math, ChemDoodle.monitor, ChemDoodle.structures, ChemDoodle.uis.tools);

(function(informatics, io, structures, uis, actions, undefined) {
	'use strict';
	
	let SPLITTER = new informatics.Splitter();
	
	uis.CopyPasteManager = function(sketcher) {
		this.sketcher = sketcher;
		this.data = undefined;
	};
	let _ = uis.CopyPasteManager.prototype;
	_.interpreter = new io.JSONInterpreter();
	_.copy = function(remove) {
		if (this.sketcher.lasso.isActive()) {
			let mols = SPLITTER.split({atoms:this.sketcher.lasso.atoms, bonds:this.sketcher.lasso.getBonds()}); 
			let shapes = this.sketcher.lasso.shapes;
			this.data = this.interpreter.contentTo(mols, shapes);
			if(remove){
				this.sketcher.stateManager.STATE_ERASE.handleDelete();
			}
			this.sketcher.toolbarManager.buttonPaste.enable();
		}
	};
	_.paste = function() {
		if(this.data){
			let content = this.interpreter.contentFrom(this.data);
			if(content.molecules.length!==0 || content.shapes.length!==0){
				let atoms = [];
				for(let i = 0, ii = content.molecules.length; i<ii; i++){
					atoms = atoms.concat(content.molecules[i].atoms);
				}
				let c;
				if(this.sketcher.lastMousePos){
					// you need to create a copy here as c is modified below
					c = new structures.Point(this.sketcher.lastMousePos.x, this.sketcher.lastMousePos.y);
				}else if(this.sketcher.lasso.isActive()){
					this.sketcher.lasso.setBounds();
					let b = this.sketcher.lasso.bounds;
					c = new structures.Point((b.minX+b.maxX)/2+50, (b.minY+b.maxY)/2+50);
				}else{
					c = new structures.Point(this.sketcher.width / 2, this.sketcher.height / 2);
				}
				this.sketcher.historyManager.pushUndo(new actions.AddContentAction(this.sketcher, content.molecules, content.shapes));
				this.sketcher.lasso.empty();
				this.sketcher.lasso.select(atoms, content.shapes);
				this.sketcher.lasso.setBounds();
				let b2 = this.sketcher.lasso.bounds;
				c.sub(new structures.Point((b2.minX+b2.maxX)/2+10, (b2.minY+b2.maxY)/2+10));
				new actions.MoveAction(this.sketcher.lasso.getAllPoints(), c).forward(this.sketcher);
				this.sketcher.repaint();
			}
		}
	};

})(ChemDoodle.informatics, ChemDoodle.io, ChemDoodle.structures, ChemDoodle.uis, ChemDoodle.uis.actions);

(function(c, extensions, featureDetection, uis, interaction, structures, d2, tools, m, window, undefined) {
	'use strict';
	c.SketcherCanvas = function(id, width, height, options) {
		// keep checks to undefined here as these are booleans
		this.isMobile = options.isMobile === undefined ? featureDetection.supports_touch() : options.isMobile;
		this.useServices = options.useServices === undefined ? false : options.useServices;
		this.oneMolecule = options.oneMolecule === undefined ? false : options.oneMolecule;
		this.requireStartingAtom = options.requireStartingAtom === undefined ? true : options.requireStartingAtom;
		this.includeToolbar = options.includeToolbar === undefined ? true : options.includeToolbar;
		this.floatDrawTools = options.floatDrawTools === undefined ? false : options.floatDrawTools;
		this.resizable = options.resizable === undefined ? false : options.resizable;
		this.includeQuery = options.includeQuery === undefined ? false : options.includeQuery;
		this.uiColor = options.uiColor === undefined ? '#719460' : options.uiColor;
		// save the original options object
		this.originalOptions = options;
		// toolbar manager needs the sketcher id to make it unique to this canvas
		this.id = id;
		this.toolbarManager = new uis.gui.ToolbarManager(this);
		if (this.includeToolbar && !this.toolbarManager.written) {
			this.toolbarManager.write();
			// If pre-created, wait until the last button image loads before
			// calling setup.
			let self = this;
			if (document.getElementById(this.id)) {
				const img = document.getElementById(id + '_button_chain_icon');
				if (img) {
					img.addEventListener('load', function() {
						self.toolbarManager.setup();
					});
				}
			} else {
				window.addEventListener('load', function() {
					self.toolbarManager.setup();
				});
			}
			this.dialogManager = new uis.gui.DialogManager(this);
		}
		if(uis.gui.desktop.TextInput){
			this.textInput = new uis.gui.desktop.TextInput(this, this.id+'_textInput');
		}
		c._Canvas.call(this, id, width, height);
		// cursor manager must be initialized before state manager
		// cursor manager must be initialized after sketcher element is created to set the default cursor
		this.cursorManager = new uis.gui.desktop.CursorManager(this);
		this.stateManager = new uis.states.StateManager(this);
		this.historyManager = new uis.actions.HistoryManager(this);
		this.copyPasteManager = new uis.CopyPasteManager(this);
		// styles is now created and available
		this.styles.atoms_circleDiameter_2D = 7;
		this.styles.atoms_circleBorderWidth_2D = 0;
		this.isHelp = false;
		this.lastPinchScale = 1;
		this.lastGestureRotate = 0;
		this.inGesture = false;
		if (this.oneMolecule) {
			const startMol = new structures.Molecule();
			startMol.atoms.push(new structures.Atom());
			this.loadMolecule(startMol);
		} else {
			this.startAtom = new structures.Atom('C', -10, -10);
			this.startAtom.isLone = true;
			this.lasso = new tools.Lasso(this);
		}
		if(this.resizable){
			const sketcherElement = document.getElementById(this.id);
			const self = this;
			new interaction.Resizable(sketcherElement, {
				handles: 'se',
				resize: function( event, ui ) {
					self.resize(sketcherElement.clientWidth, sketcherElement.clientHeight);
				},
				stop: function( event, ui ) {
					self.repaint();
				}
			});
		}
	};
	let _ = c.SketcherCanvas.prototype = new c._Canvas();
	_.drawSketcherDecorations = function(ctx, styles) {
		ctx.save();
		ctx.translate(this.width / 2, this.height / 2);
		ctx.rotate(styles.rotateAngle);
		ctx.scale(styles.scale, styles.scale);
		ctx.translate(-this.width / 2, -this.height / 2);
		if (this.hovering) {
			this.hovering.drawDecorations(ctx, styles);
		}
		if (this.startAtom && this.startAtom.x != -10 && !this.isMobile) {
			this.startAtom.draw(ctx, styles);
		}
		if (this.tempAtom) {
			ctx.strokeStyle = styles.colorPreview;
			ctx.fillStyle = styles.colorPreview;
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(this.hovering.x, this.hovering.y);
			ctx.lineTo(this.tempAtom.x, this.tempAtom.y);
			ctx.setLineDash([2]);
			ctx.stroke();
			ctx.setLineDash([]);
			if (this.tempAtom.label === 'C') {
				ctx.beginPath();
				ctx.arc(this.tempAtom.x, this.tempAtom.y, 3, 0, m.PI * 2, false);
				ctx.fill();
			}else{
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.font = extensions.getFontString(styles.atoms_font_size_2D, styles.atoms_font_families_2D, styles.atoms_font_bold_2D, styles.atoms_font_italic_2D);
				ctx.fillText(this.tempAtom.label, this.tempAtom.x, this.tempAtom.y);
			}
			if (this.tempAtom.isOverlap) {
				ctx.strokeStyle = styles.colorError;
				ctx.lineWidth = 1.2;
				ctx.beginPath();
				ctx.arc(this.tempAtom.x, this.tempAtom.y, 7, 0, m.PI * 2, false);
				ctx.stroke();
			}
		}
		if (this.tempRing) {
			ctx.strokeStyle = styles.colorPreview;
			ctx.fillStyle = styles.colorPreview;
			ctx.lineWidth = 1;
			ctx.beginPath();
			if (this.hovering instanceof structures.Atom) {
				ctx.moveTo(this.hovering.x, this.hovering.y);
				ctx.lineTo(this.tempRing[0].x, this.tempRing[0].y);
				for ( let i = 1, ii = this.tempRing.length; i < ii; i++) {
					ctx.lineTo(this.tempRing[i].x, this.tempRing[i].y);
				}
				ctx.lineTo(this.hovering.x, this.hovering.y);
			} else if (this.hovering instanceof structures.Bond) {
				let start = this.hovering.a2;
				let end = this.hovering.a1;
				if (this.tempRing[0] === this.hovering.a1) {
					start = this.hovering.a1;
					end = this.hovering.a2;
				}
				ctx.moveTo(start.x, start.y);
				ctx.lineTo(this.tempRing[1].x, this.tempRing[1].y);
				for ( let i = 2, ii = this.tempRing.length; i < ii; i++) {
					ctx.lineTo(this.tempRing[i].x, this.tempRing[i].y);
				}
				ctx.lineTo(end.x, end.y);
			}
			ctx.setLineDash([2]);
			ctx.stroke();
			ctx.setLineDash([]);
			ctx.strokeStyle = styles.colorError;
			ctx.lineWidth = 1.2;
			for ( let i = 0, ii = this.tempRing.length; i < ii; i++) {
				if (this.tempRing[i].isOverlap) {
					ctx.beginPath();
					ctx.arc(this.tempRing[i].x, this.tempRing[i].y, 7, 0, m.PI * 2, false);
					ctx.stroke();
				}
			}
			// arbitrary ring size number
			if(this.stateManager.STATE_NEW_RING.numSides===-1){
				let midx = 0;
				let midy = 0;
				if (this.hovering instanceof structures.Atom) {
					midx+=this.hovering.x;
					midy+=this.hovering.y;
				} else if (this.hovering instanceof structures.Bond) {
					let start = this.hovering.a1;
					if (this.tempRing[0] === this.hovering.a1) {
						start = this.hovering.a2;
					}
					midx+=start.x;
					midy+=start.y;
				}
				let ii = this.tempRing.length;
				for ( let i = 0; i < ii; i++) {
					midx += this.tempRing[i].x;
					midy += this.tempRing[i].y;
				}
				ii++;
				midx /= ii;
				midy /= ii;
				ctx.font = extensions.getFontString(styles.text_font_size, styles.text_font_families, styles.text_font_bold, styles.text_font_italic);
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillStyle = 'black';
				ctx.fillText(ii, midx, midy);
			}
		}
		if (this.tempChain && this.tempChain.length>0) {
			ctx.strokeStyle = styles.colorPreview;
			ctx.fillStyle = styles.colorPreview;
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(this.hovering.x, this.hovering.y);
			ctx.lineTo(this.tempChain[0].x, this.tempChain[0].y);
			for ( let i = 1, ii = this.tempChain.length; i < ii; i++) {
				ctx.lineTo(this.tempChain[i].x, this.tempChain[i].y);
			}
			ctx.setLineDash([2]);
			ctx.stroke();
			ctx.setLineDash([]);
			ctx.strokeStyle = styles.colorError;
			ctx.lineWidth = 1.2;
			for ( let i = 0, ii = this.tempChain.length; i < ii; i++) {
				if (this.tempChain[i].isOverlap) {
					ctx.beginPath();
					ctx.arc(this.tempChain[i].x, this.tempChain[i].y, 7, 0, m.PI * 2, false);
					ctx.stroke();
				}
			}
			ctx.font = extensions.getFontString(styles.text_font_size, styles.text_font_families, styles.text_font_bold, styles.text_font_italic);
			ctx.textAlign = 'left';
			ctx.textBaseline = 'bottom';
			let size = this.tempChain.length;
			ctx.fillStyle = 'black';
			ctx.fillText(size, this.tempChain[size-1].x+10, this.tempChain[size-1].y-10);
		}
		if (this.tempTemplate) {
			if(this.tempTemplate.atoms.length>0){
				let spec1 = styles.atoms_color;
				let spec2 = styles.atoms_useJMOLColors;
				let spec3 = styles.atoms_usePYMOLColors;
				let spec4 = styles.bonds_color;
				let spec5 = styles.atoms_HBlack_2D;
				styles.atoms_color = styles.colorPreview;
				styles.atoms_useJMOLColors = false;
				styles.atoms_usePYMOLColors = false;
				styles.bonds_color = styles.colorPreview;
				styles.atoms_HBlack_2D = false;
				this.tempTemplate.draw(ctx, styles);
				styles.atoms_color = spec1;
				styles.atoms_useJMOLColors = spec2;
				styles.atoms_usePYMOLColors = spec3;
				styles.bonds_color = spec4;
				styles.atoms_HBlack_2D = spec5;
			}
			ctx.strokeStyle = styles.colorError;
			ctx.lineWidth = 1.2;
			for ( let i = 0, ii = this.molecules.length; i < ii; i++) {
				let mol = this.molecules[i];
				for ( let j = 0, jj = mol.atoms.length; j < jj; j++) {
					let a = mol.atoms[j];
					if (a.isOverlap) {
						ctx.beginPath();
						ctx.arc(a.x, a.y, 7, 0, m.PI * 2, false);
						ctx.stroke();
					}
				}
			}
		}
		if (this.lasso) {
			this.lasso.draw(ctx, styles);
		}
		if (this.stateManager.getCurrentState().draw) {
			this.stateManager.getCurrentState().draw(ctx, styles);
		}
		ctx.restore();
	};
	_.checksOnAction = function(force){
		// using force improves efficiency, so changes will not be checked
		// until a render occurs
		// you can force a check by sending true to this function after
		// calling check with a false
		if (force && this.doChecks) {
			// setup data for atom mappings
			let arrow;
			let mappings = [];
			let brackets = [];
			let vaps = [];
			for(let i = 0, ii = this.shapes.length; i<ii; i++){
				let s = this.shapes[i];
				if(s instanceof d2.AtomMapping){
					s.error = false;
					mappings.push(s);
				}else if(s instanceof d2.Line && !arrow){
					// make sure arrow isn't defined, just to make sure we use the first arrow
					arrow = s;
				}else if(s instanceof d2.RepeatUnit){
					s.error = false;
					brackets.push(s);
				}else if(s instanceof d2.VAP){
					s.error = false;
					vaps.push(s);
				}
			}
			for(let i = 0, ii = mappings.length; i<ii; i++){
				let si = mappings[i];
				si.label = (i+1).toString();
				for(let j = i+1, jj = mappings.length; j<jj; j++){
					let sj = mappings[j];
					if(si.o1===sj.o1 || si.o2===sj.o1 || si.o1===sj.o2 || si.o2===sj.o2){
						si.error = true;
						sj.error = true;
					}
				}
				// different labels
				if(!si.error && si.o1.label !== si.o2.label){
					si.error = true;
				}
				// same structure
				if(!si.error && this.getMoleculeByAtom(si.o1) === this.getMoleculeByAtom(si.o2)){
					si.error = true;
				}
			}
			if(brackets.length!==0){
				let allAs = this.getAllAtoms();
				for(let i = 0, ii = allAs.length; i<ii; i++){
					allAs[i].inBracket = false;
				}
				for(let i = 0, ii = brackets.length; i<ii; i++){
					let si = brackets[i];
					si.setContents(this);
					if(si.contents.length===0){
						// user error
						si.error = true;
					}else{
						for(let j = 0, jj = si.contents.length; j<jj; j++){
							if(si.contents[j].inBracket){
								si.error = true;
								break;
							}
						}
					}
					for(let j = 0, jj = si.contents.length; j<jj; j++){
						si.contents[j].inBracket = true;
					}
				}
			}
			for(let i = 0, ii = vaps.length; i<ii; i++){
				let vap = vaps[i];
				if(!vap.substituent){
					// no substituent
					vap.error = true;
				}else if(vap.attachments.length===0){
					// no attachments
					vap.error = true;
				}
				if(!vap.error){
					// check that all attachments are part of the same molecule
					let m = this.getMoleculeByAtom(vap.attachments[0]);
					vap.substituent.present = undefined;
					for(let j = 0, jj = m.atoms.length; j<jj; j++){
						m.atoms[j].present = true;
					}
					// also make sure the substituent is NOT part of the same molecule
					if(vap.substituent.present){
						vap.error = true;
					}
					if(!vap.error){
						for(let j = 0, jj = vap.attachments.length; j<jj; j++){
							if(!vap.attachments[j].present){
								vap.error = true;
								break;
							}
						}
					}
					for(let j = 0, jj = m.atoms.length; j<jj; j++){
						m.atoms[j].present = undefined;
					}
				}
			}
		}
		this.doChecks = !force;
	};
	_.drawChildExtras = function(ctx, styles) {
		this.drawSketcherDecorations(ctx, styles);
		if (!this.hideHelp) {
			// help and tutorial
			let helpPos = new structures.Point(this.width - 20, 20);
			let radgrad = ctx.createRadialGradient(helpPos.x, helpPos.y, 10, helpPos.x, helpPos.y, 2);
			radgrad.addColorStop(0, '#00680F');
			radgrad.addColorStop(1, '#01DF01');
			ctx.fillStyle = radgrad;
			ctx.beginPath();
			ctx.arc(helpPos.x, helpPos.y, 10, 0, m.PI * 2, false);
			ctx.fill();
			ctx.lineWidth = 2;
			if (this.isHelp) {
				ctx.strokeStyle = styles.colorHover;
				ctx.stroke();
			}
			ctx.strokeStyle = 'black';
			ctx.fillStyle = 'white';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.font = '14px sans-serif';
			ctx.strokeText('?', helpPos.x, helpPos.y);
			ctx.fillText('?', helpPos.x, helpPos.y);
		}
		if (!this.paidToHideTrademark) {
			// You must keep this name displayed at all times to abide by the license
			// Contact us for permission to remove it,
			// http://www.ichemlabs.com/contact-us
			ctx.font = '14px sans-serif';
			let x = '\x43\x68\x65\x6D\x44\x6F\x6F\x64\x6C\x65';
			let width = ctx.measureText(x).width;
			ctx.textAlign = 'left';
			ctx.textBaseline = 'bottom';
			ctx.fillStyle = 'rgba(60, 60, 60, 0.5)';
			ctx.fillText(x, this.width - width - 13, this.height - 4);
			ctx.font = '10px sans-serif';
			ctx.fillText('\u00AE', this.width - 13, this.height - 12);
		}
	};
	_.scaleEvent = function(e) {
		e.op = new structures.Point(e.p.x, e.p.y);
		if (this.styles.scale !== 1) {
			e.p.x = this.width / 2 + (e.p.x - this.width / 2) / this.styles.scale;
			e.p.y = this.height / 2 + (e.p.y - this.height / 2) / this.styles.scale;
		}
	};
	_.checkScale = function() {
		if (this.styles.scale < .5) {
			this.styles.scale = .5;
		} else if (this.styles.scale > 10) {
			this.styles.scale = 10;
		}
	};
	// desktop events
	_.click = function(e) {
		this.scaleEvent(e);
		if(this.modal){
			// for modal popovers, close requires a true value to state that is was cancelled
			// for text input, the event is required, followed by a true to state it was committed
			// so send in (e, true), as both will return true when evaluated
			this.modal.close(e, true);
			return false;
		}
		this.stateManager.getCurrentState().click(e);
	};
	_.rightclick = function(e) {
		if(this.modal){
			return false;
		}
		this.scaleEvent(e);
		this.stateManager.getCurrentState().rightclick(e);
	};
	_.dblclick = function(e) {
		if(this.modal){
			return false;
		}
		this.scaleEvent(e);
		this.stateManager.getCurrentState().dblclick(e);
	};
	_.mousedown = function(e) {
		if(this.modal){
			return false;
		}
		this.scaleEvent(e);
		this.stateManager.getCurrentState().mousedown(e);
	};
	_.rightmousedown = function(e) {
		if(this.modal){
			return false;
		}
		this.scaleEvent(e);
		this.stateManager.getCurrentState().rightmousedown(e);
	};
	_.mousemove = function(e) {
		if(this.modal){
			return false;
		}
		// link to tutorial
		this.isHelp = false;
		if (e.p.distance(new structures.Point(this.width - 20, 20)) < 10) {
			this.isHelp = true;
		}
		this.scaleEvent(e);
		this.stateManager.getCurrentState().mousemove(e);
		// repaint is called in the state mousemove event
	};
	_.mouseout = function(e) {
		if(this.modal){
			return false;
		}
		this.scaleEvent(e);
		this.stateManager.getCurrentState().mouseout(e);
	};
	_.mouseover = function(e) {
		if(this.modal){
			return false;
		}
		this.scaleEvent(e);
		this.stateManager.getCurrentState().mouseover(e);
	};
	_.mouseup = function(e) {
		if(this.modal){
			return false;
		}
		this.scaleEvent(e);
		this.stateManager.getCurrentState().mouseup(e);
	};
	_.rightmouseup = function(e) {
		if(this.modal){
			return false;
		}
		this.scaleEvent(e);
		this.stateManager.getCurrentState().rightmouseup(e);
	};
	_.mousewheel = function(e, delta) {
		if(this.modal){
			return false;
		}
		this.scaleEvent(e);
		this.stateManager.getCurrentState().mousewheel(e, delta);
	};
	_.drag = function(e) {
		if(this.modal){
			return false;
		}
		this.scaleEvent(e);
		this.stateManager.getCurrentState().drag(e);
	};
	_.keydown = function(e) {
		if(this.modal){
			return false;
		}
		this.scaleEvent(e);
		this.stateManager.getCurrentState().keydown(e);
	};
	_.keypress = function(e) {
		if(this.modal){
			return false;
		}
		this.scaleEvent(e);
		this.stateManager.getCurrentState().keypress(e);
	};
	_.keyup = function(e) {
		if(this.modal){
			return false;
		}
		this.scaleEvent(e);
		this.stateManager.getCurrentState().keyup(e);
	};
	// mobile events
	_.touchstart = function(e) {
		if(this.modal){
			return false;
		}
		if (e.touches && e.touches.length > 1) {
			if (this.tempAtom || this.tempRing) {
				this.tempAtom = undefined;
				this.tempRing = undefined;
				this.hovering = undefined;
				this.repaint();
			}
			this.lastPoint = undefined;
		} else {
			this.scaleEvent(e);
			this.stateManager.getCurrentState().mousemove(e);
			this.stateManager.getCurrentState().mousedown(e);
		}
	};
	_.touchmove = function(e) {
		if(this.modal){
			return false;
		}
		this.scaleEvent(e);
		if (!this.inGesture && this.lastPoint && this.lastPoint.distance(e.p)>5) {
			this.stateManager.getCurrentState().drag(e);
		}
	};
	_.touchend = function(e) {
		if(this.modal){
			return false;
		}
		this.scaleEvent(e);
		this.stateManager.getCurrentState().mouseup(e);
		if (this.hovering) {
			this.stateManager.getCurrentState().clearHover();
			this.repaint();
		}
	};
	_.gesturechange = function(e) {
		if(this.modal){
			return false;
		}
		this.inGesture = true;
		// set no new mols to form to stop actions in label state
		this.stateManager.getCurrentState().newMolAllowed = false;
		if (e.scale - this.lastPinchScale !== 1) {
			if (!(this.lasso && this.lasso.isActive())) {
				this.styles.scale *= e.scale / this.lastPinchScale;
				this.checkScale();
			}
			this.lastPinchScale = e.scale;
		}
		if (this.lastGestureRotate - e.rotation !== 0) {
			let rot = (this.lastGestureRotate - e.rotation) / 180 * m.PI;
			if (!this.parentAction) {
				let ps = (this.lasso && this.lasso.isActive()) ? this.lasso.getAllPoints() : this.getAllPoints();
				let center = (this.lasso && this.lasso.isActive()) ? new structures.Point((this.lasso.bounds.minX + this.lasso.bounds.maxX) / 2, (this.lasso.bounds.minY + this.lasso.bounds.maxY) / 2) : new structures.Point(this.width / 2, this.height / 2);
				this.parentAction = new uis.actions.RotateAction(ps, rot, center);
				this.historyManager.pushUndo(this.parentAction);
			} else {
				this.parentAction.dif += rot;
				for ( let i = 0, ii = this.parentAction.ps.length; i < ii; i++) {
					let p = this.parentAction.ps[i];
					let dist = this.parentAction.center.distance(p);
					let angle = this.parentAction.center.angle(p) + rot;
					p.x = this.parentAction.center.x + dist * m.cos(angle);
					p.y = this.parentAction.center.y - dist * m.sin(angle);
				}
				// must check here as change is outside of an action
				for ( let i = 0, ii = this.molecules.length; i < ii; i++) {
					this.molecules[i].check();
				}
				if (this.lasso && this.lasso.isActive()) {
					this.lasso.setBounds();
				}
			}
			this.lastGestureRotate = e.rotation;
		}
		this.repaint();
	};
	_.gestureend = function(e) {
		if(this.modal){
			return false;
		}
		this.inGesture = false;
		this.lastPinchScale = 1;
		this.lastGestureRotate = 0;
		this.parentAction = undefined;
	};

})(ChemDoodle, ChemDoodle.extensions, ChemDoodle.featureDetection, ChemDoodle.uis, ChemDoodle.uis.gui.desktop.interaction, ChemDoodle.structures, ChemDoodle.structures.d2, ChemDoodle.uis.tools, Math, window);

(function(c, math, monitor, actions, states, structures, SYMBOLS, m, m4, undefined) {
	'use strict';
	states._State3D = function() {};
	let _ = states._State3D.prototype;
	_.setup = function(editor) {
		this.editor = editor;
	};

	_.enter = function() {
		if (this.innerenter) {
			this.innerenter();
		}
	};
	_.exit = function() {
		if (this.innerexit) {
			this.innerexit();
		}
	};
	_.click = function(e) {
		if (this.innerclick) {
			this.innerclick(e);
		}
	};
	_.rightclick = function(e) {
		if (this.innerrightclick) {
			this.innerrightclick(e);
		}
	};
	_.dblclick = function(e) {
		if (this.innerdblclick) {
			this.innerdblclick(e);
		}
	};
	_.mousedown = function(e) {
		this.editor.defaultmousedown(e);
		this.editor.lastPoint = e.p;
		// must also check for mobile hits here to the help button
		if (this.editor.isHelp || this.editor.isMobile && e.op.distance(new structures.Point(this.editor.width - 20, 20)) < 10) {
			if(!this.editor.isHelp){
				this.editor.doEventDefault = true;
			}
		} else if (this.innermousedown) {
			this.innermousedown(e);
		}
	};
	_.rightmousedown = function(e) {
		if (this.innerrightmousedown) {
			this.innerrightmousedown(e);
		}
		this.editor.defaultrightmousedown(e);
	};
	_.mousemove = function(e) {
		if (this.innermousemove) {
			this.innermousemove(e);
		}
		// call the repaint here to repaint the help button, also this is called
		// by other functions, so the repaint must be here
		this.editor.repaint();
	};
	_.mouseout = function(e) {
		if (this.innermouseout) {
			this.innermouseout(e);
		}
	};
	_.mouseover = function(e) {
		if (this.innermouseover) {
			this.innermouseover(e);
		}
	};
	_.mouseup = function(e) {
		this.parentAction = undefined;
		// must also check for mobile hits here to the help button
		if (this.editor.isHelp || this.editor.isMobile && this.editor.doEventDefault && e.op.distance(new structures.Point(this.editor.width - 20, 20)) < 10) {
			this.editor.isHelp = false;
			this.editor.lastPoint = undefined;
			this.editor.repaint();
			// window.open doesn't work once Event.preventDefault() has been called
			window.open('https://web.chemdoodle.com/demos/3d-editor', '_blank');
			this.editor.doEventDefault = false;
		} else {
			if (this.innermouseup) {
				this.innermouseup(e);
			}
			this.editor.defaultmouseup(e);
		}
	};
	_.rightmouseup = function(e) {
		if (this.innerrightmouseup) {
			this.innerrightmouseup(e);
		}
	};
	_.mousewheel = function(e, delta) {
		if (this.innermousewheel) {
			this.innermousewheel(e);
		} else {
			this.editor.defaultmousewheel(e, delta);
		}
	};
	_.drag = function(e) {
		if (this.innerdrag) {
			this.innerdrag(e);
		} else {
			this.editor.defaultdrag(e);
		}
	};
	_.keydown = function(e) {
		if (monitor.META) {
			if (e.which === 90) {
				// z
				this.editor.historyManager.undo();
			} else if (e.which === 89) {
				// y
				this.editor.historyManager.redo();
			} else if (e.which === 83) {
				// s
				this.editor.toolbarManager.buttonSave.func();
			} else if (e.which === 79) {
				// o
				this.editor.toolbarManager.buttonOpen.func();
			} else if (e.which === 78) {
				// n
				// this seems to always be overridden in some browsers, so we can't actually listen to ctrl/command+n
				this.editor.toolbarManager.buttonClear.func();
			} else if (e.which === 187 || e.which === 61) {
				// +
				this.editor.toolbarManager.buttonScalePlus.func();
			} else if (e.which === 189 || e.which === 109) {
				// -
				this.editor.toolbarManager.buttonScaleMinus.func();
			}
		}
		if (this.innerkeydown) {
			this.innerkeydown(e);
		}
	};
	_.keypress = function(e) {
		if (this.innerkeypress) {
			this.innerkeypress(e);
		}
	};
	_.keyup = function(e) {
		if (this.innerkeyup) {
			this.innerkeyup(e);
		}
	};

})(ChemDoodle, ChemDoodle.math, ChemDoodle.monitor, ChemDoodle.uis.actions, ChemDoodle.uis.states, ChemDoodle.structures, ChemDoodle.SYMBOLS, Math, ChemDoodle.lib.mat4);
(function(actions, states, structures, d3, undefined) {
	'use strict';
	states.MeasureState3D = function(editor) {
		this.setup(editor);
		this.selectedAtoms = [];
	};
	let _ = states.MeasureState3D.prototype = new states._State3D();
	_.numToSelect = 2;

	_.reset = function(){
		for(let i = 0, ii = this.selectedAtoms.length; i<ii; i++){
			this.selectedAtoms[i].isSelected = false;
		}
		this.selectedAtoms = [];
		this.editor.repaint();
	};
	_.innerenter = function(e) {
		this.reset();
	};
	_.innerexit = function(e) {
		this.reset();
	};
	_.innermousemove = function(e) {
		if (this.hoveredAtom) {
			this.hoveredAtom.isHover = false;
			this.hoveredAtom = undefined;
		}
		let obj = this.editor.pick(e.p.x, e.p.y, true, false);
		if (obj && obj instanceof structures.Atom) {
			this.hoveredAtom = obj;
			obj.isHover = true;
		}
		this.editor.repaint();
	};
	_.innermousedown = function(e) {
		// don't use click as that doesn't work on android
		if(this.editor.isMobile){
			this.innermousemove(e);
		}
		if (this.hoveredAtom) {
			this.hoveredAtom.isHover = false;
			if (this.hoveredAtom.isSelected) {
				let a = this.hoveredAtom;
				this.selectedAtoms = this.selectedAtoms.filter(function(value) {
					return value !== a;
				});
			} else {
				this.selectedAtoms.push(this.hoveredAtom);
			}
			this.hoveredAtom.isSelected = !this.hoveredAtom.isSelected;
			this.hoveredAtom = undefined;
			this.editor.repaint();
		}
		if (this.selectedAtoms.length === this.numToSelect) {
			let shape;
			switch(this.numToSelect){
			case 2:
				shape = new d3.Distance(this.selectedAtoms[0], this.selectedAtoms[1]);
				break;
			case 3:
				shape = new d3.Angle(this.selectedAtoms[0], this.selectedAtoms[1], this.selectedAtoms[2]);
				break;
			case 4:
				shape = new d3.Torsion(this.selectedAtoms[0], this.selectedAtoms[1], this.selectedAtoms[2], this.selectedAtoms[3]);
				break;
			}
			this.reset();
			if(shape){
				this.editor.historyManager.pushUndo(new actions.AddShapeAction(this.editor, shape));
			}
		}
	};

})(ChemDoodle.uis.actions, ChemDoodle.uis.states, ChemDoodle.structures, ChemDoodle.structures.d3);
(function(states, undefined) {
	'use strict';
	states.ViewState3D = function(editor) {
		this.setup(editor);
	};
	let _ = states.ViewState3D.prototype = new states._State3D();

})(ChemDoodle.uis.states);

(function(states, undefined) {
	'use strict';
	states.StateManager3D = function(editor) {
		this.STATE_VIEW = new states.ViewState3D(editor);
		this.STATE_MEASURE = new states.MeasureState3D(editor);
		let currentState = this.STATE_VIEW;
		currentState.enter();
		this.setState = function(nextState) {
			if (nextState !== currentState) {
				currentState.exit();
				currentState = nextState;
				currentState.enter();
			}
		};
		this.getCurrentState = function() {
			return currentState;
		};
	};

})(ChemDoodle.uis.states);
(function(c, iChemLabs, io, structures, actions, gui, imageDepot, desktop, tools, states, components, document, undefined) {
	'use strict';
	gui.ToolbarManager3D = function(editor) {
		this.editor = editor;

		// open
		this.buttonOpen = new desktop.Button(editor.id + '_button_open', imageDepot.OPEN, 'Open', function() {
			editor.dialogManager.openPopup.show();
		});
		// save
		this.buttonSave = new desktop.Button(editor.id + '_button_save', imageDepot.SAVE, 'Save', function() {
			if (editor.useServices) {
				editor.dialogManager.saveDialog.clear();
			} else {
				if(editor.molecules.length>0){
					editor.dialogManager.saveDialog.getTextArea().value = c.writeMOL(editor.molecules[0]);
				}
			}
			editor.dialogManager.saveDialog.open();
		});
		// search
		this.buttonSearch = new desktop.Button(editor.id + '_button_search', imageDepot.SEARCH, 'Search', function() {
			editor.dialogManager.searchDialog.open();
		});
		// calculate
		this.buttonCalculate = new desktop.Button(editor.id + '_button_calculate', imageDepot.CALCULATE, 'Calculate', function() {
			let mol = editor.molecules[0];
			if (mol) {
				iChemLabs.calculate(mol, {
					descriptors : [ 'mf', 'ef', 'mw', 'miw', 'deg_unsat', 'hba', 'hbd', 'rot', 'electron', 'pol_miller', 'cmr', 'tpsa', 'vabc', 'xlogp2', 'bertz' ]
				}, function(content) {
					let sb = [];
					function addDatum(title, value, unit) {
						sb.push(title);
						sb.push(': ');
						for ( let i = title.length + 2; i < 30; i++) {
							sb.push(' ');
						}
						sb.push(value);
						sb.push(' ');
						sb.push(unit);
						sb.push('\n');
					}
					addDatum('Molecular Formula', content.mf, '');
					addDatum('Empirical Formula', content.ef, '');
					addDatum('Molecular Mass', content.mw, 'amu');
					addDatum('Monoisotopic Mass', content.miw, 'amu');
					addDatum('Degree of Unsaturation', content.deg_unsat, '');
					addDatum('Hydrogen Bond Acceptors', content.hba, '');
					addDatum('Hydrogen Bond Donors', content.hbd, '');
					addDatum('Rotatable Bonds', content.rot, '');
					addDatum('Total Electrons', content.rot, '');
					addDatum('Molecular Polarizability', content.pol_miller, 'A^3');
					addDatum('Molar Refractivity', content.cmr, 'cm^3/mol');
					addDatum('Polar Surface Area', content.tpsa, 'A^2');
					addDatum('vdW Volume', content.vabc, 'A^3');
					addDatum('logP', content.xlogp2, '');
					addDatum('Complexity', content.bertz, '');
					editor.dialogManager.calculateDialog.getTextArea().value = sb.join('');
					editor.dialogManager.calculateDialog.open();
				});
			}
		});

		// transform
		this.buttonTransform = new desktop.Button(editor.id + '_button_transform', imageDepot.PERSPECTIVE, 'Transform', function() {
			editor.stateManager.setState(editor.stateManager.STATE_VIEW);
		});
		this.buttonTransform.toggle = true;

		// styles
		this.buttonStyles = new desktop.Button(editor.id + '_button_specifications', imageDepot.STYLES, 'Styles', function() {
			editor.dialogManager.stylesDialog.update();
			editor.dialogManager.stylesDialog.open();
		});

		// animations
		this.buttonAnimation = new desktop.Button(editor.id + '_button_animation', imageDepot.ANIMATION, 'Animations', function() {
			editor.stateManager.setState(editor.stateManager.STATE_MOVE);
		});

		// clear
		this.buttonClear = new desktop.Button(editor.id + '_button_clear', imageDepot.CLEAR, 'Clear', function() {
			editor.historyManager.pushUndo(new actions.ClearAction(editor));
		});
		// clean
		this.buttonClean = new desktop.Button(editor.id + '_button_clean', imageDepot.OPTIMIZE, 'Clean', function() {
			let mol = editor.molecules[0];
			if (mol) {
				iChemLabs.optimize(mol, {
					dimension : 3
				}, function(mol) {
					editor.historyManager.pushUndo(new actions.SwitchMoleculeAction(editor, mol));
				});
			}
		});

		// scale set
		this.makeScaleSet(this);

		// history set
		this.makeHistorySet(this);

		// history set
		this.makeMeasurementsSet(this);
	};
	let _ = gui.ToolbarManager3D.prototype;
	_.write = function() {
		this.mainToolbar = new desktop.MainToolbar(this.editor);
		const sb = [this.mainToolbar.getSource()];
		sb.push(this.historySet.getSource());
		sb.push(this.scaleSet.getSource());
		sb.push(this.buttonOpen.getSource());
		sb.push(this.buttonSave.getSource());
		if (this.editor.useServices) {
			sb.push(this.buttonSearch.getSource());
			sb.push(this.buttonCalculate.getSource());
		}
		sb.push(this.mainToolbar.getNewRowSource());
		sb.push(this.buttonTransform.getSource());
		sb.push(this.buttonStyles.getSource());
		//sb.push(this.buttonAnimation.getSource());
		sb.push(this.measurementsSet.getSource());
		sb.push(this.buttonClear.getSource());
		if (this.editor.useServices) {
			sb.push(this.buttonClean.getSource());
		}
		sb.push('</div>');

		this.mainToolbar.write(sb.join(''));
		this.written = true;
	};
	_.setup = function() {
		const bg = [];
		this.buttonTransform.setup(bg);
		this.buttonStyles.setup();
		//this.buttonAnimation.setup();
		this.measurementsSet.setup(bg);
		this.buttonClear.setup();
		if (this.editor.useServices) {
			this.buttonClean.setup();
		}
		this.historySet.setup();
		this.scaleSet.setup();
		this.buttonOpen.setup();
		this.buttonSave.setup();
		if (this.editor.useServices) {
			this.buttonSearch.setup();
			this.buttonCalculate.setup();
		}

		this.buttonTransform.select();
		this.buttonUndo.disable();
		this.buttonRedo.disable();
		
		this.mainToolbar.setup(bg);
	};

	_.makeScaleSet = function(self) {
		this.scaleSet = new desktop.ButtonSet(self.editor.id + '_buttons_scale');
		this.scaleSet.toggle = false;
		this.buttonScalePlus = new desktop.Button(self.editor.id + '_button_scale_plus', imageDepot.ZOOM_IN, 'Increase Scale', function() {
			self.editor.mousewheel(null, -10);
		});
		this.scaleSet.buttons.push(this.buttonScalePlus);
		this.buttonScaleMinus = new desktop.Button(self.editor.id + '_button_scale_minus', imageDepot.ZOOM_OUT, 'Decrease Scale', function() {
			self.editor.mousewheel(null, 10);
		});
		this.scaleSet.buttons.push(this.buttonScaleMinus);
	};
	_.makeHistorySet = function(self) {
		this.historySet = new desktop.ButtonSet(self.editor.id + '_buttons_history');
		this.historySet.toggle = false;
		this.buttonUndo = new desktop.Button(self.editor.id + '_button_undo', imageDepot.UNDO, 'Undo', function() {
			self.editor.historyManager.undo();
		});
		this.historySet.buttons.push(this.buttonUndo);
		this.buttonRedo = new desktop.Button(self.editor.id + '_button_redo', imageDepot.REDO, 'Redo', function() {
			self.editor.historyManager.redo();
		});
		this.historySet.buttons.push(this.buttonRedo);
	};
	_.makeMeasurementsSet = function(self) {
		this.measurementsSet = new desktop.ButtonSet(self.editor.id + '_buttons_measurements');
		this.buttonDistance = new desktop.Button(self.editor.id + '_button_distance', imageDepot.DISTANCE, 'Distance', function() {
			self.editor.stateManager.STATE_MEASURE.numToSelect = 2;
			self.editor.stateManager.STATE_MEASURE.reset();
			self.editor.stateManager.setState(self.editor.stateManager.STATE_MEASURE);
		});
		this.measurementsSet.buttons.push(this.buttonDistance);
		this.buttonAngle = new desktop.Button(self.editor.id + '_button_angle', imageDepot.ANGLE, 'Angle', function() {
			self.editor.stateManager.STATE_MEASURE.numToSelect = 3;
			self.editor.stateManager.STATE_MEASURE.reset();
			self.editor.stateManager.setState(self.editor.stateManager.STATE_MEASURE);
		});
		this.measurementsSet.buttons.push(this.buttonAngle);
		this.buttonTorsion = new desktop.Button(self.editor.id + '_button_torsion', imageDepot.TORSION, 'Torsion', function() {
			self.editor.stateManager.STATE_MEASURE.numToSelect = 4;
			self.editor.stateManager.STATE_MEASURE.reset();
			self.editor.stateManager.setState(self.editor.stateManager.STATE_MEASURE);
		});
		this.measurementsSet.buttons.push(this.buttonTorsion);
	};

})(ChemDoodle, ChemDoodle.iChemLabs, ChemDoodle.io, ChemDoodle.structures, ChemDoodle.uis.actions, ChemDoodle.uis.gui, ChemDoodle.uis.gui.imageDepot, ChemDoodle.uis.gui.desktop, ChemDoodle.uis.tools, ChemDoodle.uis.states, ChemDoodle.components, document);

(function(c, desktop, document, undefined) {
	'use strict';
	desktop.StylesDialog = function(editor, subid) {
		desktop.Dialog.call(this, editor, subid, 'Styles');
		this.width = 478;
	};
	let _ = desktop.StylesDialog.prototype = new desktop.Dialog();
	_.getContentSource = function(){
		const self = this;
		this.components = [];
		
		// representation
		this.components.push({
			title: 'Representation',
			component: (self.representation = new desktop.SelectInput(self.id + '_reps', 'Small molecule representation', function(e){
				let i = this.selectedIndex;
				let ops = this.options;
				self.webComponent.styles.set3DRepresentation(ops[i].value);
				self.webComponent.updateScene();
				self.update();
			}))
		});
		// value is what is sent to the set3DRepresentation function
		this.representation.options.push({value:'Ball and Stick', display:'Ball and Stick'});
		this.representation.options.push({value:'van der Waals Spheres', display:'vdW Spheres'});
		this.representation.options.push({value:'Stick', display:'Stick'});
		this.representation.options.push({value:'Wireframe', display:'Wireframe'});
		this.representation.options.push({value:'Line', display:'Line'});
		
		// canvas
		this.components.push('Canvas');
		this.components.push({
			title: 'Background color',
			component: (self.bgColor = new desktop.ColorInput(self.id + '_bgcolor', 'Background color', function(e){
				self.webComponent.styles.backgroundColor = e.target.value;
				self.webComponent.setupScene();
				self.webComponent.repaint();
			}))
		});
		this.components.push({
			title: 'Projection',
			component: self.makeProjectionSet()
		});
		this.components.push({
			title: 'Fog mode',
			component: self.makeFogModeSet()
		});
		this.components.push({
			title: 'Fog color',
			component: (self.fogColor = new desktop.ColorInput(self.id + '_fogcolor', 'Fog color', function(e){
				self.webComponent.styles.fog_color_3D = e.target.value;
				self.webComponent.setupScene();
				self.webComponent.repaint();
			}))
		});
		this.components.push({
			title: 'Fog start',
			component: (self.fogStart = new desktop.NumberInput(self.id + '_fogstart', 'Fog start', function(e){
				self.webComponent.styles.fog_start_3D = parseInt(this.value)/100;
				self.webComponent.updateScene();
			}, 0, 100, 0, '%'))
		});
		this.components.push({
			title: 'Fog end',
			component: (self.fogEnd = new desktop.NumberInput(self.id + '_fogend', 'Fog end', function(e){
				self.webComponent.styles.fog_end_3D = parseInt(this.value)/100;
				self.webComponent.updateScene();
			}, 0, 100, 100, '%'))
		});
		this.components.push({
			title: 'Fog density',
			component: (self.fogDensity = new desktop.NumberInput(self.id + '_fogdensity', 'Fog density', function(e){
				self.webComponent.styles.fog_density_3D = parseInt(this.value)/100;
				self.webComponent.updateScene();
			}, 0, 100, 100, '%'))
		});
		
		// text
		this.components.push({
			title: 'Text bold',
			component: (self.boldTextToggle = new desktop.CheckboxInput(self.id + '_bold_text_toggle', 'Bold', function(){
				self.webComponent.styles.text_font_bold=this.checked;
				self.webComponent.setupScene();
				self.webComponent.repaint();
			}, false))
		});
		this.components.push({
			title: 'Text italics',
			component: (self.italicTextToggle = new desktop.CheckboxInput(self.id + '_italic_text_toggle', 'Italic', function(){
				self.webComponent.styles.text_font_italics=this.checked;
				self.webComponent.setupScene();
				self.webComponent.repaint();
			}, false))
		});
		// compass
		this.components.push({
			title: 'Display compass',
			component: (self.displayCompassToggle = new desktop.CheckboxInput(self.id + '_display_compass_toggle', 'Display Compass', function(){ 
				if (self.displayCompassToggle.checked()) {
					self.webComponent.styles.compass_display = true;
					self.webComponent.styles.compass_type_3D = 0;
					self.webComponent.styles.compass_size_3D = 50;
					self.compassPositionSet.enable();
					self.webComponent.setupScene();
					self.webComponent.updateScene();
				} else {
					self.webComponent.styles.compass_display = false;
					self.webComponent.setupScene();
					self.webComponent.updateScene();
					self.compassPositionSet.disable();
				} 
			}, false))
		});
		this.components.push({
			title: 'Compass type',
			component: self.makeCompassPositionSet()
		});
		this.components.push({
			title: 'Display axis labels',
			component: (self.axisLabelsToggle = new desktop.CheckboxInput(self.id + '_axis_labels_toggle', 'Axis labels', function(){
				self.webComponent.styles.compass_displayText_3D=this.checked;
				self.webComponent.updateScene();
			}, false))
		});
		
		
		// atoms
		this.components.push('Atoms');
		this.components.push({
			title: 'Display',
			component: (self.atomsDisplayToggle = new desktop.CheckboxInput(self.id + '_atoms_display_toggle', 'Display atoms', function(){
				self.webComponent.styles.atoms_display=this.checked;
				self.webComponent.updateScene();
			}, true))
		});
		this.components.push({
			title: 'Color',
			component: (self.atomColor = new desktop.ColorInput(self.id + '_atomcolor', 'Color', function(e){
				self.webComponent.styles.atoms_color = e.target.value;
				self.webComponent.setupScene();
				self.webComponent.repaint();
			}))
		});
		this.components.push({
			title: 'Use color scheme',
			component: (self.atomColorSetToggle = new desktop.CheckboxInput(self.id + '_atom_color_group_toggle', 'Color Schemes', function(){ 
				if (this.checked) { 
					self.atomColorSet.enable();
					self.webComponent.styles.atoms_useJMOLColors = self.buttonJmolColors.selected;
					self.webComponent.styles.atoms_usePYMOLColors = self.buttonPymolColors.selected;
				} else {
					self.atomColorSet.disable();
					self.webComponent.styles.atoms_useJMOLColors = false;
					self.webComponent.styles.atoms_usePYMOLColors = false;
				}
				self.webComponent.updateScene();
			}, false))
		});
		this.components.push({
			title: 'Color scheme',
			component: self.makeAtomColorSet()
		});
		this.components.push({
			title: 'Sphere diameter',
			component: (self.sphereDiameter = new desktop.NumberInput(this.id + '_spherediameter', 'Fog density', function(e){
				self.webComponent.styles.atoms_sphereDiameter_3D = parseFloat(this.value);
				self.webComponent.updateScene();
			}, 0, 40, 0.8, '&#8491;'))
		});
		this.components.push({
			title: 'Use vdW diameters',
			component: (self.vdWToggle = new desktop.CheckboxInput(self.id + '_vdw_toggle', 'Use vdW diameters', function(){
				self.webComponent.styles.atoms_useVDWDiameters_3D=this.checked;
				self.webComponent.updateScene();
			}, false))
		});
		this.components.push({
			title: 'vdW multiplier',
			component: (self.vdWMultiplier = new desktop.NumberInput(self.id + '_vdwMultiplier', 'Fog density', function(e){
				self.webComponent.styles.atoms_vdwMultiplier_3D = parseInt(this.value)/100;
				self.webComponent.updateScene();
			}, 0, 100, 100, '%'))
		});
		this.components.push({
			title: 'Non-bonded as stars',
			component: (self.atomsNonBondedAsStarsToggle = new desktop.CheckboxInput(self.id + '_non_bonded_as_stars_toggle', 'Non-bonded as stars', function(){
				self.webComponent.styles.atoms_nonBondedAsStars_3D=this.checked;
				self.webComponent.updateScene();
			}, false))
		});
		this.components.push({
			title: 'Show labels',
			component: (self.displayLabelsToggle = new desktop.CheckboxInput(self.id + '_display_labels_toggle', 'Show labels', function(){
				self.webComponent.styles.atoms_displayLabels_3D=this.checked;
				self.webComponent.updateScene();
			}, false))
		});
		
		//bonds
		this.components.push('Bonds');
		this.components.push({
			title: 'Display',
			component: (self.bondsDisplayToggle = new desktop.CheckboxInput(self.id + '_bonds_display_toggle', 'Display bonds', function(){
				self.webComponent.styles.bonds_display=this.checked;
				self.webComponent.updateScene();
			}, true))
		});
		this.components.push({
			title: 'Color',
			component: (self.bondColor = new desktop.ColorInput(self.id + '_bondcolor', 'Color', function(e){
				self.webComponent.styles.bonds_color = e.target.value;
				self.webComponent.setupScene();
				self.webComponent.repaint();
			}))
		});
		this.components.push({
			title: 'Show order',
			component: (self.bondOrderToggle = new desktop.CheckboxInput(self.id + '_bond_order_toggle', 'Show order', function(){
				self.webComponent.styles.bonds_showBondOrders_3D=this.checked;
				self.webComponent.updateScene();
			}, false))
		});
		this.components.push({
			title: 'Render lines',
			component: (self.bondsRenderAsLinesToggle = new desktop.CheckboxInput(self.id + '_bonds_render_as_lines_toggle', 'Render as lines', function(){
				self.webComponent.styles.bonds_renderAsLines_3D=this.checked;
				self.webComponent.updateScene();
			}, false))
		});
		this.components.push({
			title: 'Cylinder diameter',
			component: (self.cylinderDiameter = new desktop.NumberInput(self.id + '_cylinderdiameter', 'Fog density', function(e){
				self.webComponent.styles.bonds_cylinderDiameter_3D = parseFloat(this.value);
				self.webComponent.updateScene();
			}, 0, 40, 0.3, '&#8491;'))
		});
		
		// proteins
		this.components.push('Proteins');
		this.components.push({
			title: 'Show ribbons',
			component: (self.ribbonsToggle = new desktop.CheckboxInput(self.id + '_ribbons_toggle', 'Ribbons', function(){
				self.webComponent.styles.proteins_displayRibbon=this.checked;
				self.webComponent.updateScene();
			}, false))
		});
		this.components.push({
			title: 'Show backbone',
			component: (self.backboneToggle = new desktop.CheckboxInput(self.id + '_backbone_toggle', 'Backbone', function(){
				self.webComponent.styles.proteins_displayBackbone=this.checked;
				self.webComponent.updateScene();
			}, false))
		});
		this.components.push({
			title: 'Show pipe-plank',
			component: (self.pipeplankToggle = new desktop.CheckboxInput(self.id + '_pipeplank_toggle', 'Pipe and Plank', function(){
				self.webComponent.styles.proteins_displayPipePlank=this.checked;
				self.webComponent.updateScene();
			}, false))
		});
		this.components.push({
			title: 'Show cartoon',
			component: (self.cartoonizeToggle = new desktop.CheckboxInput(self.id + '_cartoonize_toggle', 'Cartoonize', function(){
				self.webComponent.styles.proteins_ribbonCartoonize=this.checked;
				self.webComponent.updateScene();
			}, false))
		});
		this.components.push({
			title: 'Color by chain',
			component: (self.colorByChainToggle = new desktop.CheckboxInput(self.id + '_color_by_chain_toggle', 'Color by chain', function(){
				self.webComponent.styles.macro_colorByChain=this.checked;
				self.webComponent.updateScene();
			}, false))
		});
		this.components.push({
			title: 'Color by segment',
			component: (self.proteinColorToggle = new desktop.CheckboxInput(self.id + '_protein_color_toggle', 'Color by segment', function(){
				if (this.checked) {
					self.proteinColors.enable();
					const element = self.proteinColors.getElement();
					const i = element.selectedIndex;
					const ops = element.options;
					self.webComponent.styles.proteins_residueColor = ops[i].value;
				} else {
					self.webComponent.styles.proteins_residueColor = 'none';
					self.proteinColors.disable();
				}
				self.webComponent.updateScene();
			}, false))
		});
		this.components.push({
			title: 'Color scheme',
			component: (self.proteinColors = new desktop.SelectInput(self.id + '_proteinColors', 'Protein residue color set', function(e){
				let i = this.selectedIndex;
				switch(i) {
				case 0:
					self.webComponent.styles.proteins_residueColor = 'amino';
					break;
				case 1:
					self.webComponent.styles.proteins_residueColor = 'shapely';
					break;
				case 2:
					self.webComponent.styles.proteins_residueColor = 'polarity';
					break;
				case 3:
					self.webComponent.styles.proteins_residueColor = 'rainbow';
					break;
				case 4:
					self.webComponent.styles.proteins_residueColor = 'acidity';
					break;
				}
					
				self.webComponent.updateScene();
			}))
		});
		this.proteinColors.options.push({value:'amino', display:'Amino'});
		this.proteinColors.options.push({value:'shapely', display:'Shapely'});
		this.proteinColors.options.push({value:'polarity', display:'Polarity'});
		this.proteinColors.options.push({value:'rainbow', display:'Rainbow'});
		this.proteinColors.options.push({value:'acidity', display:'Acidity'});
		
		//nucleics
		this.components.push('Nucleic acids');
		this.components.push({
			title: 'Color by segment',
			component: (self.nucleicAcidColorToggle = new desktop.CheckboxInput(self.id + '_nucleic_acid_color_toggle', 'Color by segment', function(){ 
				if (this.checked) {
					self.nucleicColors.enable();
					const element = self.nucleicColors.getElement();
					const i = element.selectedIndex;
					const ops = element.options;
					self.webComponent.styles.nucleics_residueColor = ops[i].value;
				} else {
					self.webComponent.styles.nucleics_residueColor = 'none';
					self.nucleicColors.disable();
				}
				self.webComponent.updateScene();
			}, false))
		});
		this.components.push({
			title: 'Color scheme',
			component: (self.nucleicColors = new desktop.SelectInput(self.id + '_nucleicColors', 'Nucleic residue color set', function(e){
				let i = this.selectedIndex;
				switch(i) {
				case 0:
					self.webComponent.styles.nucleics_residueColor = 'shapely';
					break;
				case 1:
					self.webComponent.styles.nucleics_residueColor = 'rainbow';
					break;
				}
					
				self.webComponent.updateScene();
			}))
		});
		this.nucleicColors.options.push({value:'shapely', display:'Shapely'});
		this.nucleicColors.options.push({value:'rainbow', display:'Rainbow'});
		
		// shapes
		this.components.push('Shapes');
		this.components.push({
			title: 'Color',
			component: (self.shapeColor = new desktop.ColorInput(self.id + '_shapecolor', 'Color', function(e){
				self.webComponent.styles.shapes_color = e.target.value;
				self.webComponent.setupScene();
				self.webComponent.repaint();
			}))
		});
		
		const sb = ['<div class="reset-all" style="font-size:14px;text-align:left;overflow-y:scroll;height:300px;padding-right:20px;">'];
		for(const c of this.components){
			if(typeof c === 'string'){
				sb.push(`
					<hr>
					<div style="text-align:left;font-weight:bold;margin-bottom:10px;">${c}</div>
				`);
			}else if(c.component){
				sb.push(`
					<div style="display:flex;justify-content:space-between;width:100%;margin-bottom:10px;">
						<div style="flex-shrink:0;">${c.title}</div>
						<div style="flex-shrink:0;">${c.component.getSource()}</div>
					</div>
				`);
			}
		}
		sb.push('</div>');
		return sb.join('');
	};
	_.innersetup = function(){
		for(const c of this.components){
			if(c.component){
				if(c.component instanceof desktop.ButtonSet){
					c.component.setup([]);
				}else{
					c.component.setup();
				}
			}
		}
	};
	_.update = function(){
		this.bgColor.setColor(this.webComponent.styles.backgroundColor);
		this.fogColor.setColor(this.webComponent.styles.fog_color_3D);
		this.atomColor.setColor(this.webComponent.styles.atoms_color);
		this.bondColor.setColor(this.webComponent.styles.bonds_color);
		this.shapeColor.setColor(this.webComponent.styles.shapes_color);
		if (this.webComponent.styles.projectionPerspective_3D) {
			this.buttonPerspective.select(true, true);
		} else {
			this.buttonOrthographic.select(true, true);
		}
		this.fogModeSet.buttons[this.webComponent.styles.fog_mode_3D].select(true, true);
		this.fogStart.setValue(this.webComponent.styles.fog_start_3D * 100);
		this.fogEnd.setValue(this.webComponent.styles.fog_end_3D * 100);
		this.fogDensity.setValue(this.webComponent.styles.fog_density_3D * 100);
		if (this.webComponent.styles.atoms_display) {
			this.atomsDisplayToggle.check();
		}
		if (this.webComponent.styles.atoms_useVDWDiameters_3D) {
			this.vdWToggle.check();
		}
		this.vdWMultiplier.setValue(this.webComponent.styles.atoms_vdwMultiplier_3D * 100);
		this.sphereDiameter.setValue(this.webComponent.styles.atoms_sphereDiameter_3D);
		if (this.webComponent.styles.atoms_usePYMOLColors) {
			this.buttonPymolColors.select(true, true);
		} else {
			this.buttonJmolColors.select(true, true);
		}
		if (this.webComponent.styles.atoms_useJMOLColors || this.webComponent.styles.atoms_usePYMOLColors) {
			this.atomColorSetToggle.check();
			this.atomColorSet.enable();
		} else {
			this.atomColorSet.disable();
		}
		if (this.webComponent.styles.atoms_nonBondedAsStars_3D) {
			this.atomsNonBondedAsStarsToggle.check();
		} else {
			this.atomsNonBondedAsStarsToggle.uncheck();
		}
		if (this.webComponent.styles.atoms_displayLabels_3D) {
			this.displayLabelsToggle.check();
		}
		if (this.webComponent.styles.bonds_display) {
			this.bondsDisplayToggle.check();
		}
		if (this.webComponent.styles.bonds_showBondOrders_3D) {
			this.bondOrderToggle.check();
		}
		this.cylinderDiameter.setValue(this.webComponent.styles.bonds_cylinderDiameter_3D);
		if (this.webComponent.styles.proteins_displayRibbon) {
			this.ribbonsToggle.check();
		}
		if (this.webComponent.styles.proteins_displayBackbone) {
			this.backboneToggle.check();
		}
		if (this.webComponent.styles.proteins_displayPipePlank) {
			this.pipeplankToggle.check();
		}
		if (this.webComponent.styles.proteins_ribbonCartoonize) {
			this.cartoonizeToggle.check();
		}
		if (this.webComponent.styles.macro_colorByChain) {
			this.colorByChainToggle.check();
		}
		const proteinColorsElement = document.getElementById(this.id+'_proteinColors');
		switch (this.webComponent.styles.proteins_residueColor) {
		case 'amino':
			this.proteinColorToggle.check();
			this.proteinColors.setValue('amino');
			break;
		case 'shapely':
			this.proteinColorToggle.check();
			this.proteinColors.setValue('shapely');
			break;
		case 'polarity':
			this.proteinColorToggle.check();
			this.proteinColors.setValue('polarity');
			break;
		case 'rainbow':
			this.proteinColorToggle.check();
			this.proteinColors.setValue('rainbow');
			break;
		case 'acidity':
			this.proteinColorToggle.check();
			this.proteinColors.setValue('acidity');
			break;
		case 'none':
		default:
			this.proteinColorToggle.uncheck();
			this.proteinColors.disable();
			break;
		}
		const nucleicColorsElement = document.getElementById(this.id+'_nucleicColors');
		switch (this.webComponent.styles.nucleics_residueColor) {
		case 'shapely':
			this.nucleicAcidColorToggle.check();
			this.nucleicColors.setValue('shapely');
			break;
		case 'rainbow':
			this.nucleicAcidColorToggle.check();
			this.nucleicColors.setValue('rainbow');
			break;
		case 'none':
		default:
			this.nucleicAcidColorToggle.uncheck();
			this.nucleicColors.disable();
			break;
		}
		if (this.webComponent.styles.text_font_bold) {
			this.boldTextToggle.check();
		}
		if (this.webComponent.styles.text_font_italic) {
			this.italicTextToggle.check();
		}
		if (this.webComponent.styles.compass_type_3D === 0) {
			this.buttonCompassCorner.select(true, true);
		} else {
			this.buttonCompassOrigin.select(true, true);
		}
		if (this.webComponent.styles.compass_display === true) {
			this.compassPositionSet.enable();
		} else {
			this.compassPositionSet.disable();
		}
		if (this.webComponent.styles.compass_display_text_3D) {
			this.axisLabelsToggle.check();
		}
		if (this.webComponent.styles.compass_displayText_3D) {
			this.axisLabelsToggle.check();
		}
	};
	
	_.makeProjectionSet = function(){
		this.projectionSet = new desktop.ButtonSet(this.id + '_projection_group');
		this.buttonPerspective = new desktop.TextButton(this.id + '_button_Perspective', 'Perspective', 'Perspective', () => {
			this.webComponent.styles.projectionPerspective_3D = true;
			this.webComponent.updateScene();
		});
		this.projectionSet.buttons.push(this.buttonPerspective);
		this.buttonOrthographic = new desktop.TextButton(this.id + '_button_Orthographic', 'Orthographic', 'Orthographic',() => {
			this.webComponent.styles.projectionPerspective_3D = false;
			this.webComponent.updateScene();
		});
		this.projectionSet.buttons.push(this.buttonOrthographic);
		return this.projectionSet;
	};
	
	_.makeAtomColorSet = function(){
		this.atomColorSet = new desktop.ButtonSet(this.id + '_atom_color_group');
		this.atomColorSet.toggle = true;
		this.buttonJmolColors = new desktop.TextButton(this.id + '_button_Jmol_Colors', 'Jmol', 'Jmol', () => {
			this.webComponent.styles.atoms_useJMOLColors = true;
			this.webComponent.styles.atoms_usePYMOLColors = false;
			this.webComponent.updateScene();
		});
		this.atomColorSet.buttons.push(this.buttonJmolColors);
		this.buttonPymolColors = new desktop.TextButton(this.id + '_button_PyMOL_Colors', 'PyMOL', 'PyMOL', () => {
			this.webComponent.styles.atoms_usePYMOLColors = true;
			this.webComponent.styles.atoms_useJMOLColors = false;
			this.webComponent.updateScene();
		});
		this.atomColorSet.buttons.push(this.buttonPymolColors);
		return this.atomColorSet;
	};
	
	_.makeCompassPositionSet = function(){
		this.compassPositionSet = new desktop.ButtonSet(this.id + '_compass_position_group');
		this.buttonCompassCorner = new desktop.TextButton(this.id + '_button_compass_corner', 'Corner', 'Corner',() => {
			this.webComponent.styles.compass_type_3D = 0;
			this.webComponent.styles.compass_size_3D = 50;
			this.webComponent.setupScene();
			this.webComponent.updateScene();
		});
		this.compassPositionSet.buttons.push(this.buttonCompassCorner);
		this.buttonCompassOrigin = new desktop.TextButton(this.id + '_button_compass_origin', 'Origin', 'Origin',() => {
			this.webComponent.styles.compass_type_3D = 1;
			this.webComponent.styles.compass_size_3D = 150;
			this.webComponent.setupScene();
			this.webComponent.updateScene();
		});
		this.compassPositionSet.buttons.push(this.buttonCompassOrigin);
		return this.compassPositionSet;
	};
	
	_.makeFogModeSet = function(){
		this.fogModeSet = new desktop.ButtonSet(this.id + '_fog_mode_group');
		this.buttonFogMode0 = new desktop.TextButton(this.id + '_button_fog_mode_0', 'No Fogging', 'No Fogging', () => {
			this.webComponent.styles.fog_mode_3D = 0;
			this.webComponent.updateScene();
		});
		this.fogModeSet.buttons.push(this.buttonFogMode0);
		this.buttonFogMode1 = new desktop.TextButton(this.id + '_button_fog_mode_1', 'Linear', 'Linear', () => {
			this.webComponent.styles.fog_mode_3D = 1;
			this.webComponent.updateScene();
		});
		this.fogModeSet.buttons.push(this.buttonFogMode1);
		this.buttonFogMode2 = new desktop.TextButton(this.id + '_button_fog_mode_2', 'Exponential', 'Exponential', () => {
			this.webComponent.styles.fog_mode_3D = 2;
			this.webComponent.updateScene();
		});
		this.fogModeSet.buttons.push(this.buttonFogMode2);
		this.buttonFogMode3 = new desktop.TextButton(this.id + '_button_fog_mode_3', 'Exponential&sup2;', 'Exponential&sup2;', () => {
			this.webComponent.styles.fog_mode_3D = 3;
			this.webComponent.updateScene();
		});
		this.fogModeSet.buttons.push(this.buttonFogMode3);
		return this.fogModeSet;
	};

})(ChemDoodle, ChemDoodle.uis.gui.desktop, document);

(function (c, featureDetection, d3, uis, structures, tools, m, m4, window, undefined) {
	'use strict';
	c.EditorCanvas3D = function (id, width, height, options) {
		// keep checks to undefined here as these are booleans
		this.isMobile = options.isMobile === undefined ? featureDetection.supports_touch() : options.isMobile;
		this.useServices = options.useServices === undefined ? false : options.useServices;
		this.includeToolbar = options.includeToolbar === undefined ? true : options.includeToolbar;
		this.uiColor = options.uiColor === undefined ? '#4A84B0' : options.uiColor;
		// save the original options object
		this.originalOptions = options;
		// toolbar manager needs the editor id to make it unique to this canvas
		this.id = id;
		this.toolbarManager = new uis.gui.ToolbarManager3D(this);
		if (this.includeToolbar && !this.toolbarManager.written) {
			this.toolbarManager.write();
			// If pre-created, wait until the last button image loads before calling setup.
			let self = this;
			if (document.getElementById(this.id)) {
				const img = document.getElementById(id + '_button_transform_icon');
				if (img) {
					img.addEventListener('load', function() {
						self.toolbarManager.setup();
					});
				}
			} else {
				window.addEventListener('load', function() {
					self.toolbarManager.setup();
				});
			}
			this.dialogManager = new uis.gui.DialogManager(this);
		}
		this.stateManager = new uis.states.StateManager3D(this);
		this.historyManager = new uis.actions.HistoryManager(this);
		c._Canvas3D.call(this, id, width, height);
		// styles for draw "help" atom
		let helpSpecs = new structures.Styles();
		helpSpecs.atoms_useVDWDiameters_3D = false;
		helpSpecs.atoms_sphereDiameter_3D = 2;
		this.helpButton = new structures.Atom('C', 0, 0, 0);
		this.helpButton.isHover = true;
		this.helpButton.styles = helpSpecs;
		this.styles.backgroundColor = '#000';
		this.styles.shapes_color = '#fff';
		this.isHelp = false;
		this.setupScene();
		this.repaint();
	};
	let _ = c.EditorCanvas3D.prototype = new c._Canvas3D();
	// saves of default behavior
	_.defaultmousedown = _.mousedown;
	_.defaultmouseup = _.mouseup;
	_.defaultrightmousedown = _.rightmousedown;
	_.defaultdrag = _.drag;
	_.defaultmousewheel = _.mousewheel;
	_.drawChildExtras = function (gl) {

		// NOTE: gl and this.gl is same object because "EditorCanvas3D" inherit
		// from "_Canvas3D"

		gl.disable(gl.DEPTH_TEST);

		let translationMatrix = m4.create();

		let height = this.height / 20;
		let tanTheta = m.tan(this.styles.projectionPerspectiveVerticalFieldOfView_3D / 360 * m.PI);
		let depth = height / tanTheta;
		let near = m.max(depth - height, 0.1);
		let far = depth + height;
		let aspec = this.width / this.height;

		let nearRatio = depth / this.height * tanTheta;
		let top = tanTheta * depth;
		let bottom = -top;
		let left = aspec * bottom;
		let right = aspec * top;

		let projectionMatrix = m4.ortho(left, right, bottom, top, near, far, []);

		this.phongShader.useShaderProgram(gl);

		this.phongShader.setProjectionMatrix(gl, projectionMatrix);

		this.phongShader.setFogMode(gl, 0);

		if (!this.hideHelp) {
			// help and tutorial

			let posX = (this.width - 40) * nearRatio;
			let posY = (this.height - 40) * nearRatio;

			m4.translate(m4.identity([]), [posX, posY, -depth], translationMatrix);

			// setting "help" button color
			gl.material.setTempColors(gl, this.styles.bonds_materialAmbientColor_3D, undefined, this.styles.bonds_materialSpecularColor_3D, this.styles.bonds_materialShininess_3D);
			gl.material.setDiffuseColor(gl, '#00ff00');

			// this "gl.modelViewMatrix" must be set because it used by Atom
			// when rendered
			gl.modelViewMatrix = m4.multiply(translationMatrix, gl.rotationMatrix, []);

			this.phongShader.enableAttribsArray(gl);

			gl.sphereBuffer.bindBuffers(this.gl);
			this.helpButton.render(gl, undefined, true);
			if (this.isHelp) {
				gl.sphereBuffer.bindBuffers(gl);
				// colors
				gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
				gl.material.setTempColors(gl, '#000000', undefined, '#000000', 0);
				gl.enable(gl.BLEND);
				gl.depthMask(false);
				gl.material.setAlpha(gl, .4);
				this.helpButton.renderHighlight(gl, undefined);
				gl.depthMask(true);
				gl.disable(gl.BLEND);
				gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
			}

			this.phongShader.disableAttribsArray(gl);

			gl.flush();

			// enable blend and depth mask set to false
			gl.enable(gl.BLEND);
			gl.depthMask(false);

			this.labelShader.useShaderProgram(gl);
			this.labelShader.setProjectionMatrix(gl, projectionMatrix);

			this.textTextImage.updateFont(this.gl, 14.1, ['sans-serif'], false, false, true);

			let modelMatrix = m4.multiply(translationMatrix, m4.identity([]), []);
			this.labelShader.setModelViewMatrix(gl, modelMatrix);

			this.labelShader.enableAttribsArray(gl);

			this.renderText('?', [0, 0, 0]);

			this.labelShader.disableAttribsArray(gl);

			// disable blend and depth mask set to true
			gl.disable(gl.BLEND);
			gl.depthMask(true);
		}

		if (!this.paidToHideTrademark) {
			// You must keep this name displayed at all times to abide by the license
			// Contact us for permission to remove it,
			// http://www.ichemlabs.com/contact-us
			let x = '\x43\x68\x65\x6D\x44\x6F\x6F\x64\x6C\x65';

			// enable blend for transparancy
			gl.enable(this.gl.BLEND);

			this.labelShader.useShaderProgram(gl);
			this.labelShader.setProjectionMatrix(gl, projectionMatrix);

			this.labelShader.enableAttribsArray(gl);
			// Draw the copyright logo and trademark
			this.textTextImage.updateFont(gl, 14.1, ['sans-serif'], false, false, true);

			let width = this.textTextImage.textWidth(x)/this.pixelRatio;

			let posX = (this.width - width - 30) * nearRatio;
			let posY = (-this.height + 24) * nearRatio;

			m4.translate(m4.identity([]), [posX, posY, -depth], translationMatrix);
			let modelMatrix = m4.multiply(translationMatrix, gl.rotationMatrix, []);
			this.labelShader.setModelViewMatrix(gl, modelMatrix);

			this.renderText(x, [0, 0, 0]);

			// Draw the (R) part
			posX = (this.width - 18) * nearRatio;
			posY = (-this.height + 30) * nearRatio;

			m4.translate(m4.identity([]), [posX, posY, -depth], translationMatrix);
			modelMatrix = m4.multiply(translationMatrix, gl.rotationMatrix, []);
			this.labelShader.setModelViewMatrix(gl, modelMatrix);

			this.textTextImage.updateFont(gl, 10, ['sans-serif'], false, false, true);

			this.renderText('\u00AE', [0, 0, 0]);

			// disable vertex for draw text
			this.labelShader.disableAttribsArray(gl);

			// disable blend
			gl.disable(gl.BLEND);
			gl.flush();
		}

		gl.enable(gl.DEPTH_TEST);
	};
	_.checksOnAction = function (force) {
		// using force improves efficiency, so changes will not be checked
		// until a render occurs
		// you can force a check by sending true to this function after
		// calling check with a false
		if (force && this.doChecks) {

		}
		this.doChecks = !force;
	};
	// desktop events
	_.click = function (e) {
		if(this.modal){
			// for modal popovers, close requires a true value to state that is was cancelled
			// for text input, the event is required, followed by a true to state it was committed
			// so send in (e, true), as both will return true when evaluated
			this.modal.close(e, true);
			return false;
		}
		this.stateManager.getCurrentState().click(e);
	};
	_.rightclick = function (e) {
		if(this.modal){
			return false;
		}
		this.stateManager.getCurrentState().rightclick(e);
	};
	_.dblclick = function (e) {
		if(this.modal){
			return false;
		}
		this.stateManager.getCurrentState().dblclick(e);
	};
	_.mousedown = function (e) {
		if(this.modal){
			return false;
		}
		this.stateManager.getCurrentState().mousedown(e);
	};
	_.rightmousedown = function (e) {
		if(this.modal){
			return false;
		}
		this.stateManager.getCurrentState().rightmousedown(e);
	};
	_.mousemove = function (e) {
		if(this.modal){
			return false;
		}
		this.isHelp = false;
		if (e.p.distance(new structures.Point(this.width - 20, 20)) < 10) {
			this.isHelp = true;
		}
		this.stateManager.getCurrentState().mousemove(e);
	};
	_.mouseout = function (e) {
		if(this.modal){
			return false;
		}
		this.stateManager.getCurrentState().mouseout(e);
	};
	_.mouseover = function (e) {
		if(this.modal){
			return false;
		}
		this.stateManager.getCurrentState().mouseover(e);
	};
	_.mouseup = function (e) {
		if(this.modal){
			return false;
		}
		this.stateManager.getCurrentState().mouseup(e);
	};
	_.rightmouseup = function (e) {
		if(this.modal){
			return false;
		}
		this.stateManager.getCurrentState().rightmouseup(e);
	};
	_.mousewheel = function (e, delta) {
		if(this.modal){
			return false;
		}
		this.stateManager.getCurrentState().mousewheel(e, delta);
	};
	_.drag = function (e) {
		if(this.modal){
			return false;
		}
		this.stateManager.getCurrentState().drag(e);
	};
	_.keydown = function (e) {
		if(this.modal){
			return false;
		}
		this.stateManager.getCurrentState().keydown(e);
	};
	_.keypress = function (e) {
		if(this.modal){
			return false;
		}
		this.stateManager.getCurrentState().keypress(e);
	};
	_.keyup = function (e) {
		if(this.modal){
			return false;
		}
		this.stateManager.getCurrentState().keyup(e);
	};

})(ChemDoodle, ChemDoodle.featureDetection, ChemDoodle.structures.d3, ChemDoodle.uis, ChemDoodle.structures, ChemDoodle.uis.tools, Math, ChemDoodle.lib.mat4, window);

(function (c, desktop, imageDepot, FloatingUIDOM, components, document, navigator, undefined) {
	'use strict';
	
	const IS_SAFARI = navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1;
    
    function CellData(id, meta){
        this.id = id;
        this.meta = meta;
    };

    function isOverflown(element) {
       return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
    }
    
	c.StoichiometryTable = function (id, options) {
		this.id = id;
		this.options = options;
		let self = this;
		
		// buttons for editing
	    this.buttonCancel = new desktop.Button(this.id + '_edit_undo', imageDepot.UNDO, 'Cancel Edits', function () {
			self.closeEdit(false);
		});
	    this.buttonClear = new desktop.Button(this.id + '_edit_clear', imageDepot.ERASE, 'Remove Value', function () {
	        // we empty the input text field and tell the program to update from the edit text field
	        document.getElementById(self.id+'_stoichiometry_edit_value').value = '';
			self.closeEdit(true);
		});
		
		// create the HTML components
		let tc = this.makeTableContainer();
		let ec = this.makeEditComponent();
		let element = document.getElementById(this.id);
        if (element) {
        	locationElement.innerHTML = tc+ec;
		} else {
			document.writeln('<div id="'+this.id+'">');
			document.writeln(ec);
			document.writeln(tc);
			document.writeln('</div>');
		}
		
		document.addEventListener('DOMContentLoaded', function() {
			self.buttonCancel.setup();
			self.buttonClear.setup();
		  
			const stoichiometryEditValue = document.getElementById(self.id + '_stoichiometry_edit_value');
			if (stoichiometryEditValue) {
			 	stoichiometryEditValue.addEventListener('keydown', function(event) {
					if (event.key === 'Enter') {
						self.closeEdit(true);
					}else if (event.key === 'Escape') {
						self.closeEdit(false);
					}
			 	});
			}
		});
	};
	let _ = c.StoichiometryTable.prototype;

    _.makeTableContainer = function(){
        return`
        	<!-- spinner -->
        	<div id="progressbar" style="width:16px;height:16px;">
        		<img id="${this.id}_progressbar_image" style="display:none;" src="data:image/gif;base64,R0lGODlhEAAQAPYAAP///wAAANTU1JSUlGBgYEBAQERERG5ubqKiotzc3KSkpCQkJCgoKDAwMDY2Nj4+Pmpqarq6uhwcHHJycuzs7O7u7sLCwoqKilBQUF5eXr6+vtDQ0Do6OhYWFoyMjKqqqlxcXHx8fOLi4oaGhg4ODmhoaJycnGZmZra2tkZGRgoKCrCwsJaWlhgYGAYGBujo6PT09Hh4eISEhPb29oKCgqioqPr6+vz8/MDAwMrKyvj4+NbW1q6urvDw8NLS0uTk5N7e3s7OzsbGxry8vODg4NjY2PLy8tra2np6erS0tLKyskxMTFJSUlpaWmJiYkJCQjw8PMTExHZ2djIyMurq6ioqKo6OjlhYWCwsLB4eHqCgoE5OThISEoiIiGRkZDQ0NMjIyMzMzObm5ri4uH5+fpKSkp6enlZWVpCQkEpKSkhISCIiIqamphAQEAwMDKysrAQEBJqamiYmJhQUFDg4OHR0dC4uLggICHBwcCAgIFRUVGxsbICAgAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAHjYAAgoOEhYUbIykthoUIHCQqLoI2OjeFCgsdJSsvgjcwPTaDAgYSHoY2FBSWAAMLE4wAPT89ggQMEbEzQD+CBQ0UsQA7RYIGDhWxN0E+ggcPFrEUQjuCCAYXsT5DRIIJEBgfhjsrFkaDERkgJhswMwk4CDzdhBohJwcxNB4sPAmMIlCwkOGhRo5gwhIGAgAh+QQJCgAAACwAAAAAEAAQAAAHjIAAgoOEhYU7A1dYDFtdG4YAPBhVC1ktXCRfJoVKT1NIERRUSl4qXIRHBFCbhTKFCgYjkII3g0hLUbMAOjaCBEw9ukZGgidNxLMUFYIXTkGzOmLLAEkQCLNUQMEAPxdSGoYvAkS9gjkyNEkJOjovRWAb04NBJlYsWh9KQ2FUkFQ5SWqsEJIAhq6DAAIBACH5BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhQkKE2kGXiwChgBDB0sGDw4NDGpshTheZ2hRFRVDUmsMCIMiZE48hmgtUBuCYxBmkAAQbV2CLBM+t0puaoIySDC3VC4tgh40M7eFNRdH0IRgZUO3NjqDFB9mv4U6Pc+DRzUfQVQ3NzAULxU2hUBDKENCQTtAL9yGRgkbcvggEq9atUAAIfkECQoAAAAsAAAAABAAEAAAB4+AAIKDhIWFPygeEE4hbEeGADkXBycZZ1tqTkqFQSNIbBtGPUJdD088g1QmMjiGZl9MO4I5ViiQAEgMA4JKLAm3EWtXgmxmOrcUElWCb2zHkFQdcoIWPGK3Sm1LgkcoPrdOKiOCRmA4IpBwDUGDL2A5IjCCN/QAcYUURQIJIlQ9MzZu6aAgRgwFGAFvKRwUCAAh+QQJCgAAACwAAAAAEAAQAAAHjIAAgoOEhYUUYW9lHiYRP4YACStxZRc0SBMyFoVEPAoWQDMzAgolEBqDRjg8O4ZKIBNAgkBjG5AAZVtsgj44VLdCanWCYUI3txUPS7xBx5AVDgazAjC3Q3ZeghUJv5B1cgOCNmI/1YUeWSkCgzNUFDODKydzCwqFNkYwOoIubnQIt244MzDC1q2DggIBACH5BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhTBAOSgrEUEUhgBUQThjSh8IcQo+hRUbYEdUNjoiGlZWQYM2QD4vhkI0ZWKCPQmtkG9SEYJURDOQAD4HaLuyv0ZeB4IVj8ZNJ4IwRje/QkxkgjYz05BdamyDN9uFJg9OR4YEK1RUYzFTT0qGdnduXC1Zchg8kEEjaQsMzpTZ8avgoEAAIfkECQoAAAAsAAAAABAAEAAAB4iAAIKDhIWFNz0/Oz47IjCGADpURAkCQUI4USKFNhUvFTMANxU7KElAhDA9OoZHH0oVgjczrJBRZkGyNpCCRCw8vIUzHmXBhDM0HoIGLsCQAjEmgjIqXrxaBxGCGw5cF4Y8TnybglprLXhjFBUWVnpeOIUIT3lydg4PantDz2UZDwYOIEhgzFggACH5BAkKAAAALAAAAAAQABAAAAeLgACCg4SFhjc6RhUVRjaGgzYzRhRiREQ9hSaGOhRFOxSDQQ0uj1RBPjOCIypOjwAJFkSCSyQrrhRDOYILXFSuNkpjggwtvo86H7YAZ1korkRaEYJlC3WuESxBggJLWHGGFhcIxgBvUHQyUT1GQWwhFxuFKyBPakxNXgceYY9HCDEZTlxA8cOVwUGBAAA7AAAAAAAAAAAA" />
        	</div>
        	<!-- container -->
        	<div id="${this.id}_container" style="display:flex;overflow-x:auto;align-items:center;justify-content:${IS_SAFARI?'left':'center'};"></div>
        `;
    }
    
    _.makeEditComponent = function(){
    	return `
    		<div id="${this.id}_stoichiometry_edit" style="display:none;position:absolute;z-index:10;border:1px #C1C1C1 solid;background:#F5F5F5;padding:5px;">
    			<nobr>
    				<span id="${this.id}_stoichiometry_edit_description">Equivalents</span>
    				<input type="number" style="margin-left:10px;margin-right:5px;" id="${this.id}_stoichiometry_edit_value" size="10" />
    				<div style="display:inline;margin-right:15px;" id="${this.id}_stoichiometry_edit_unit"></div>
    				${this.buttonCancel.getSource()}
    				${this.buttonClear.getSource()}
    			</nobr>
    		</div>
    	`;
    }
	
    _.setupStoichiometryTable = function(tableData){
        this.currentTableData = tableData;
        const tableContainer = document.getElementById(this.id+'_container');
        tableContainer.innerHTML = '';
        this.editableCells = [];
        let columnSkips = [];
        let sb = ['<table class="stoichiometry_table" id="', this.id, '_table">'];
        for(let r = 0; r<tableData.r; r++){
            sb.push('<tr>');
            for(let c = 0; c<tableData.c; c++){
                if(columnSkips.indexOf(c)===-1){
                    let innerID = this.id+'_'+r+'_'+c;
                    let cell = tableData.data[r][c];
                    sb.push('<td class="stoichiometry_cell" id="')
                    sb.push(innerID);
                    sb.push('" ');
                    if(cell.editable){
                        sb.push(' tabindex="0"');
                    }
                    let style = [];
                    if(cell.colspan!==undefined){
                        style.push('text-align:center;');
                        sb.push(' colspan="');
                        sb.push(cell.colspan);
                        sb.push('"');
                    }
                    if(r === 0 && cell.display.length === 0){
                        style.push('width:20px;');
                        sb.push(' rowspan="');
                        sb.push(tableData.r);
                        sb.push('"');
                        columnSkips.push(c);
                    }else if(cell.editable){
                        this.editableCells.push(new CellData(innerID, cell));
                    }
                    if(cell.c!==undefined){
                        style.push('background:');
                        style.push(cell.c);
                        style.push(';');
                    }
                    if(cell.b){
                        style.push('font-weight:bold;');
                    }
                    if(cell.i){
                        style.push('font-style:italic;');
                    }
                    if(cell.editable || cell.align==='center'){
                        style.push('text-align:center;');
                    }else{
                        style.push('padding-left:10px;');
                    }
                    if(style.length>0){
                        sb.push(' style="');
                        sb.push(style.join(''));
                        sb.push('"');
                    }
                    sb.push('>');
                    if(cell.display.length>0){
                        if(cell.value===undefined){
                            sb.push(cell.display);
                        }else{
                            sb.push(cell.value);
                            if(cell.unit!==undefined){
                                sb.push('<span style="font-size:80%">');
                                sb.push(cell.unit);
                                sb.push('</span>');
                            }
                        }
                    }
                    sb.push('</td>');
                    if(cell.colspan!==undefined){
                        c+=cell.colspan-1;
                    }
                }
            }
            sb.push('</tr>');
        }
        sb.push('</table>');
        tableContainer.innerHTML = sb.join('');

        this.setupInteractivity();
    }

    _.updateStoichiometryTable = function(tableData){
        this.currentTableData = tableData;
        // clear editable cells as we are defining new ones
        this.editableCells = [];
        for(let r = 0; r<tableData.r; r++){
            for(let c = 0; c<tableData.c; c++){
                let cell = tableData.data[r][c];
                if(cell.editable){
                    const innerID = this.id+'_'+r+'_'+c;
                    this.editableCells.push(new CellData(innerID, cell));
                    const qcell = document.getElementById(innerID);
                    // if we don't check for qcell here, then this function fails silently...
					if(qcell){
						if(cell.b){
							qcell.style.fontWeight = 'bold';
						}else{
							qcell.style.fontWeight = '';
						}
						if(cell.i){
							qcell.style.fontStyle = 'italic';
						}else{
							qcell.style.fontStyle = '';
						}
						if(cell.ec){
							qcell.style.color = cell.ec;
						}else{
							qcell.style.color = '';
						}
						if(cell.display.length > 0){
							let sb = [cell.value];
							if(cell.unit !== undefined){
								sb.push('<span style="font-size:80%">');
								sb.push(cell.unit);
								sb.push('</span>');
							}
							qcell.innerHTML = sb.join('');
						}else{
							qcell.innerHTML = '';
						}
					}
                }
            }
        }

        this.setupInteractivity();
    }

    _.setupInteractivity = function(){
        // change justification to avoid issue where a center justification cuts off content
        let flexID = this.id+'_container';
        let justifyValue;
		const flexElement = document.getElementById(flexID);
        if(IS_SAFARI || (flexElement && isOverflown(flexElement))){
            justifyValue = 'left';
        }else{
            justifyValue = 'center';
        }
		if(flexElement && flexElement.style.justifyContent !== justifyValue){
			flexElement.style.justifyContent = justifyValue;
		}
        // set up interactivity
        let self = this;
        for(let i = 0, ii = this.editableCells.length; i<ii; i++){
            let cellData = this.editableCells[i];
            let element = document.getElementById(cellData.id);
			if(element){
				element.style.cursor = 'cell';
				// Mouseenter handler
				const mouseenterHandler = function() {
					element.style.border = '4px solid #885210';
				};
				element.addEventListener('mouseenter', mouseenterHandler);
				cellData.mouseenter = mouseenterHandler;
	
				// Mouseleave handler
				const mouseleaveHandler = function() {
					element.style.border = '1px solid black';
				};
				element.addEventListener('mouseleave', mouseleaveHandler);
				cellData.mouseleave = mouseleaveHandler;

				// Click handler
				const clickHandler = function() {
					self.currentCell = cellData;

					const cancelElement = self.buttonCancel.getElement();
					const clearElement = self.buttonClear.getElement();
					if(self.currentCell.meta.b && self.currentCell.meta.i || self.currentCell.meta.display.length===0){
						// explicit or empty, show both buttons
						cancelElement.style.display = 'inline-block';
						clearElement.style.display = 'inline-block';
					}else if(self.currentCell.meta.units && self.currentCell.meta.units.length>1){
						// implicit, but has multiple units to choose from, only show cancel button
						cancelElement.style.display = 'inline-block';
						clearElement.style.display = 'none';
					}else{
						// implicit, no unit selection, don't show any buttons
						cancelElement.style.display = 'none';
						clearElement.style.display = 'none';
					}

					const editElement = document.getElementById(self.id + '_stoichiometry_edit');
					if (editElement) {
						// Basic positioning logic, position centered over the table cell
					    FloatingUIDOM.computePosition(element, editElement, {
						  placement: 'top-center',
						  middleware: [
						    FloatingUIDOM.offset(-4),
						    FloatingUIDOM.flip(),
						    FloatingUIDOM.shift(),
						    {
					          name: 'center-align',
					          fn: ({ rects }) => {
					            return {
					              x: rects.reference.x + rects.reference.width / 2 - rects.floating.width / 2,
					              y: rects.reference.y + rects.reference.height / 2 - rects.floating.height / 2,
					            };
					          },
					        }
						  ]
						}).then(({x, y}) => {
						  Object.assign(editElement.style, {
						    left: `${x}px`,
						    top: `${y}px`,
						  });
						});
						// transition the edit element to visible
						components.fadeIn(editElement, 200);
						// focus text input
						document.getElementById(self.id + '_stoichiometry_edit_description').textContent = cellData.meta.field;
						let unitHTML = '';
						if(cellData.meta.units !== undefined){
							if(cellData.meta.units.length === 1){
								unitHTML = cellData.meta.units[0];
							}else{
								let selectedUnit = cellData.meta.unit === undefined ? cellData.meta.dunit : cellData.meta.unit;
								let sb = ['<select id="', self.id, '_stoichiometry_edit_units" style="user-select:none;">'];
								for(let j = 0, jj = cellData.meta.units.length; j<jj; j++){
									let uj = cellData.meta.units[j];
									sb.push('<option value="', uj, '"');
									if (uj === selectedUnit) {
										sb.push(' selected="selected"');
									}
									sb.push('>', uj, '</option>');
								}
								sb.push('</select>');
								unitHTML = sb.join('');
							}
						}
						document.getElementById(self.id + '_stoichiometry_edit_unit').innerHTML = unitHTML;
						const textInput = document.getElementById(self.id + '_stoichiometry_edit_value');
						if (textInput) {
							if(cellData.meta.value === undefined || cellData.meta.value.trim() === ''){
								textInput.value = '';
							}else{
								textInput.value = cellData.meta.value;
							}
							if(cellData.meta.display.length===0 || cellData.meta.i && cellData.meta.b){
								textInput.disabled = false;
								textInput.focus();
							}else{
								textInput.disabled = true;
							}
						}

						const documentMouseDownHandler = function(event) {
							self.closeEditCheckNotInEditDiv();
							document.removeEventListener('mousedown', documentMouseDownHandler);
						};
						document.addEventListener('mousedown', documentMouseDownHandler);
					}
				}
				element.addEventListener('click', clickHandler);
				cellData.click = clickHandler;

				// Keydown handler - in current browsers, table and td do not reliably capture keyboard events
				const keydownHandler = function(event) {
					if (event.key === 'Backspace' || event.key === 'Delete') {
						// 8 - backspace, 46 - delete
						self.currentCell = cellData;
						const editValueInput = document.getElementById(self.id + '_stoichiometry_edit_value');
						if (editValueInput) {
							editValueInput.value = '';
						}
						self.closeEdit(true);
					} else if (event.key === ' ') {
						// space
						event.stopPropagation();
						event.preventDefault();
						element.click();
					}
				};
				element.addEventListener('keydown', keydownHandler);
				cellData.keydown = keydownHandler;
			}
        }
    };

    _.closeEdit = function(commit) {
        document.getElementById(this.id + '_stoichiometry_edit').style.display = 'none';
        if(commit){
            let changed = true;
            const valueInput = document.getElementById(this.id + '_stoichiometry_edit_value');
			let value = valueInput ? valueInput.value : '';
			const td = document.getElementById(this.currentCell.id);
			if(td){
				if(value.length===0){
					if(this.currentCell.meta.value===undefined){
						changed = false;
					}else{
						// user removed value
						td.innerHTML = '';
						this.currentCell.meta.display = undefined;
						this.currentCell.meta.value = undefined;
						this.currentCell.meta.unit = undefined;
						this.currentCell.meta.b = undefined;
						this.currentCell.meta.i = undefined;
					}
				}else{
					let unit;
					const unitDropdownElement = document.getElementById(this.id + '_stoichiometry_edit_units');
					if (unitDropdownElement) {
						unit = unitDropdownElement.value;
					} else {
						const unitSpanElement = document.getElementById(this.id + '_stoichiometry_edit_unit');
						unit = unitSpanElement ? unitSpanElement.textContent : '';
					}
					if(this.currentCell.meta.value===value && this.currentCell.meta.unit===unit){
						changed = false;
					}else{
						if(this.currentCell.meta.display.length===0){
							// this is completely user defined
							this.currentCell.meta.b = true;
							this.currentCell.meta.i = true;
						}
						this.currentCell.meta.display = value+unit;
						this.currentCell.meta.value = value;
						this.currentCell.meta.unit = unit.length === 0 ? undefined : unit;
						let sb = [];
						sb.push(this.currentCell.meta.value);
						if(this.currentCell.meta.unit!==undefined){
							sb.push('<span style="font-size:80%">');
							sb.push(this.currentCell.meta.unit);
							sb.push('</span>');
						}
						td.innerHTML = sb.join('');
						if(this.currentCell.meta.b && this.currentCell.meta.i){
							td.style.fontWeight = 'bold';
							td.style.fontStyle = 'italic';
						} else {
							td.style.fontWeight = '';
							td.style.fontStyle = '';
						}
					}
				}
				if(changed){
					// only one edit allowed before we must call the server again to validate
					for(let i = 0, ii = this.editableCells.length; i<ii; i++){
						const celli = this.editableCells[i];
						const tdunbind = document.getElementById(celli.id);
						if (tdunbind) {
							if(celli.mouseenter){
								tdunbind.removeEventListener('mouseenter', celli.mouseenter);
								celli.mouseenter = undefined;
							}
							if(celli.mouseleave){
								tdunbind.removeEventListener('mouseleave', celli.mouseleave);
								celli.mouseleave = undefined;
							}
							if(celli.click){
								tdunbind.removeEventListener('click', celli.click);
								celli.click = undefined;
							}
							if(celli.keydown){
								tdunbind.removeEventListener('keydown', celli.keydown);
								celli.keydown = undefined;
							}
						}
					}
					this.serverUpdate(this.currentTableData);
				}
			}
        }
    };

    _.closeEditCheckNotInEditDiv = function() {
	    const editDiv = document.getElementById(this.id + '_stoichiometry_edit');
	    if (editDiv && editDiv.style.display !== 'none') {
	        let targetElement = event.target;
	        let isInEditDiv = false;
	        while (targetElement) {
	            if (targetElement === editDiv) {
	                isInEditDiv = true;
	                break;
	            }
	            targetElement = targetElement.parentNode;
	        }
	
	        if (!isInEditDiv) {
	            this.closeEdit(true);
	        } else {
	            const self = this;
	            document.addEventListener('mousedown', function handleMouseDown(newEvent) {
	                self.closeEditCheckNotInEditDiv(newEvent);
	                document.removeEventListener('mousedown', handleMouseDown); // Remove listener after it fires once
	            });
	        }
	    }
    };
    
    _.serverSetup = function(data){
    	const spinner = document.getElementById(this.id+'_progressbar_image');
        spinner.style.display = 'inline-block';
        if (!this.running) {
            this.running = true;
            let sending = undefined;
            if(typeof(data) === 'string' || data instanceof String){
            	sending = data;
            }else{
            	sending = {
		            'molecules': data.molecules,
		            'shapes': data.shapes
		        };
            }
            let self = this;
            ChemDoodle.iChemLabs.stoichiometry(sending, {}, function(table, message) {
                if(message){
                    alert(message.replace('<br><br>', '\n\n').replace('<center>', '').replace('</center>', ''));
                }
                if (table) {
                    self.setupStoichiometryTable(table);
                }
                self.running = false;
        		spinner.style.display = 'none';
            }, function() {
                self.running = false;
        		spinner.style.display = 'none';
            });
        }
    }

    _.serverUpdate = function(currentTableData){
    	const spinner = document.getElementById(this.id+'_progressbar_image');
        spinner.style.display = 'inline-block';
        if (!this.running) {
            this.running = true;
            let self = this;
            ChemDoodle.iChemLabs.stoichiometry({
                'table': currentTableData
            }, {}, function(table) {
                if (table) {
                    self.updateStoichiometryTable(table);
                }
                self.running = false;
        		spinner.style.display = 'none';
            }, function() {
                self.running = false;
        		spinner.style.display = 'none';
            });
        }
    }
	
	
})(ChemDoodle, ChemDoodle.uis.gui.desktop, ChemDoodle.uis.gui.imageDepot, ChemDoodle.lib.FloatingUIDOM, ChemDoodle.components, document, navigator);
	
