! function(e, t) {
	"object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("Typewriter", [], t) : "object" == typeof exports ? exports.Typewriter = t() : e.Typewriter = t()
}("undefined" != typeof self ? self : this, (() => (() => {
	var e = {
			75: function(e) {
				(function() {
					var t, n, r, o, a, i;
					"undefined" != typeof performance && null !== performance && performance.now ? e.exports = function() {
						return performance.now()
					} : "undefined" != typeof process && null !== process && process.hrtime ? (e.exports = function() {
						return (t() - a) / 1e6
					}, n = process.hrtime, o = (t = function() {
						var e;
						return 1e9 * (e = n())[0] + e[1]
					})(), i = 1e9 * process.uptime(), a = o - i) : Date.now ? (e.exports = function() {
						return Date.now() - r
					}, r = Date.now()) : (e.exports = function() {
						return (new Date).getTime() - r
					}, r = (new Date).getTime())
				}).call(this)
			},
			4087: (e, t, n) => {
				for (var r = n(75), o = "undefined" == typeof window ? n.g : window, a = ["moz", "webkit"], i = "AnimationFrame", s = o["request" + i], u = o["cancel" + i] || o["cancelRequest" + i], l = 0; !s && l < a.length; l++) s = o[a[l] + "Request" + i], u = o[a[l] + "Cancel" + i] || o[a[l] + "CancelRequest" + i];
				if (!s || !u) {
					var c = 0,
						p = 0,
						d = [];
					s = function(e) {
						if (0 === d.length) {
							var t = r(),
								n = Math.max(0, 16.666666666666668 - (t - c));
							c = n + t, setTimeout((function() {
								var e = d.slice(0);
								d.length = 0;
								for (var t = 0; t < e.length; t++)
									if (!e[t].cancelled) try {
										e[t].callback(c)
									} catch (e) {
										setTimeout((function() {
											throw e
										}), 0)
									}
							}), Math.round(n))
						}
						return d.push({
							handle: ++p,
							callback: e,
							cancelled: !1
						}), p
					}, u = function(e) {
						for (var t = 0; t < d.length; t++) d[t].handle === e && (d[t].cancelled = !0)
					}
				}
				e.exports = function(e) {
					return s.call(o, e)
				}, e.exports.cancel = function() {
					u.apply(o, arguments)
				}, e.exports.polyfill = function(e) {
					e || (e = o), e.requestAnimationFrame = s, e.cancelAnimationFrame = u
				}
			}
		},
		t = {};

	function n(r) {
		var o = t[r];
		if (void 0 !== o) return o.exports;
		var a = t[r] = {
			exports: {}
		};
		return e[r].call(a.exports, a, a.exports, n), a.exports
	}
	n.n = e => {
		var t = e && e.__esModule ? () => e.default : () => e;
		return n.d(t, {
			a: t
		}), t
	}, n.d = (e, t) => {
		for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {
			enumerable: !0,
			get: t[r]
		})
	}, n.g = function() {
		if ("object" == typeof globalThis) return globalThis;
		try {
			return this || new Function("return this")()
		} catch (e) {
			if ("object" == typeof window) return window
		}
	}(), n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
	var r = {};
	return (() => {
		"use strict";
		n.d(r, {
			default: () => N
		});
		var e = n(4087),
			t = n.n(e);
		const o = function(e) {
				return new RegExp(/<[a-z][\s\S]*>/i).test(e)
			},
			a = function(e, t) {
				return Math.floor(Math.random() * (t - e + 1)) + e
			};
		var i = "TYPE_CHARACTER",
			s = "REMOVE_CHARACTER",
			u = "REMOVE_ALL",
			l = "REMOVE_LAST_VISIBLE_NODE",
			c = "PAUSE_FOR",
			p = "CALL_FUNCTION",
			d = "ADD_HTML_TAG_ELEMENT",
			f = "CHANGE_DELETE_SPEED",
			v = "CHANGE_DELAY",
			h = "CHANGE_CURSOR",
			y = "PASTE_STRING",
			m = "HTML_TAG";

		function g(e) {
			return g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
				return typeof e
			} : function(e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
			}, g(e)
		}

		function w(e, t) {
			var n = Object.keys(e);
			if (Object.getOwnPropertySymbols) {
				var r = Object.getOwnPropertySymbols(e);
				t && (r = r.filter((function(t) {
					return Object.getOwnPropertyDescriptor(e, t).enumerable
				}))), n.push.apply(n, r)
			}
			return n
		}

		function E(e) {
			for (var t = 1; t < arguments.length; t++) {
				var n = null != arguments[t] ? arguments[t] : {};
				t % 2 ? w(Object(n), !0).forEach((function(t) {
					S(e, t, n[t])
				})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : w(Object(n)).forEach((function(t) {
					Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
				}))
			}
			return e
		}

		function b(e) {
			return function(e) {
				if (Array.isArray(e)) return T(e)
			}(e) || function(e) {
				if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
			}(e) || function(e, t) {
				if (e) {
					if ("string" == typeof e) return T(e, t);
					var n = Object.prototype.toString.call(e).slice(8, -1);
					return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? T(e, t) : void 0
				}
			}(e) || function() {
				throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}()
		}

		function T(e, t) {
			(null == t || t > e.length) && (t = e.length);
			for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
			return r
		}

		function S(e, t, n) {
			return (t = A(t)) in e ? Object.defineProperty(e, t, {
				value: n,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}) : e[t] = n, e
		}

		function A(e) {
			var t = function(e, t) {
				if ("object" !== g(e) || null === e) return e;
				var n = e[Symbol.toPrimitive];
				if (void 0 !== n) {
					var r = n.call(e, "string");
					if ("object" !== g(r)) return r;
					throw new TypeError("@@toPrimitive must return a primitive value.")
				}
				return String(e)
			}(e);
			return "symbol" === g(t) ? t : String(t)
		}
		const N = function() {
			function n(r, g) {
				var w = this;
				if (function(e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}(this, n), S(this, "state", {
						cursorAnimation: null,
						lastFrameTime: null,
						pauseUntil: null,
						eventQueue: [],
						eventLoop: null,
						eventLoopPaused: !1,
						reverseCalledEvents: [],
						calledEvents: [],
						visibleNodes: [],
						initialOptions: null,
						elements: {
							container: null,
							wrapper: document.createElement("span"),
							cursor: document.createElement("span")
						}
					}), S(this, "options", {
						strings: null,
						cursor: "|",
						delay: "natural",
						pauseFor: 1500,
						deleteSpeed: "natural",
						loop: !1,
						autoStart: !1,
						devMode: !1,
						skipAddStyles: !1,
						wrapperClassName: "Typewriter__wrapper",
						cursorClassName: "Typewriter__cursor",
						stringSplitter: null,
						onCreateTextNode: null,
						onRemoveNode: null
					}), S(this, "setupWrapperElement", (function() {
						w.state.elements.container && (w.state.elements.wrapper.className = w.options.wrapperClassName, w.state.elements.cursor.className = w.options.cursorClassName, w.state.elements.cursor.innerHTML = w.options.cursor, w.state.elements.container.innerHTML = "", w.state.elements.container.appendChild(w.state.elements.wrapper), w.state.elements.container.appendChild(w.state.elements.cursor))
					})), S(this, "start", (function() {
						return w.state.eventLoopPaused = !1, w.runEventLoop(), w
					})), S(this, "pause", (function() {
						return w.state.eventLoopPaused = !0, w
					})), S(this, "stop", (function() {
						return w.state.eventLoop && ((0, e.cancel)(w.state.eventLoop), w.state.eventLoop = null), w
					})), S(this, "pauseFor", (function(e) {
						return w.addEventToQueue(c, {
							ms: e
						}), w
					})), S(this, "typeOutAllStrings", (function() {
						return "string" == typeof w.options.strings ? (w.typeString(w.options.strings).pauseFor(w.options.pauseFor), w) : (w.options.strings.forEach((function(e) {
							w.typeString(e).pauseFor(w.options.pauseFor).deleteAll(w.options.deleteSpeed)
						})), w)
					})), S(this, "typeString", (function(e) {
						var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
						if (o(e)) return w.typeOutHTMLString(e, t);
						if (e) {
							var n = (w.options || {}).stringSplitter,
								r = "function" == typeof n ? n(e) : e.split("");
							w.typeCharacters(r, t)
						}
						return w
					})), S(this, "pasteString", (function(e) {
						var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
						return o(e) ? w.typeOutHTMLString(e, t, !0) : (e && w.addEventToQueue(y, {
							character: e,
							node: t
						}), w)
					})), S(this, "typeOutHTMLString", (function(e) {
						var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
							n = arguments.length > 2 ? arguments[2] : void 0,
							r = function(e) {
								var t = document.createElement("div");
								return t.innerHTML = e, t.childNodes
							}(e);
						if (r.length > 0)
							for (var o = 0; o < r.length; o++) {
								var a = r[o],
									i = a.innerHTML;
								a && 3 !== a.nodeType ? (a.innerHTML = "", w.addEventToQueue(d, {
									node: a,
									parentNode: t
								}), n ? w.pasteString(i, a) : w.typeString(i, a)) : a.textContent && (n ? w.pasteString(a.textContent, t) : w.typeString(a.textContent, t))
							}
						return w
					})), S(this, "deleteAll", (function() {
						var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "natural";
						return w.addEventToQueue(u, {
							speed: e
						}), w
					})), S(this, "changeDeleteSpeed", (function(e) {
						if (!e) throw new Error("Must provide new delete speed");
						return w.addEventToQueue(f, {
							speed: e
						}), w
					})), S(this, "changeDelay", (function(e) {
						if (!e) throw new Error("Must provide new delay");
						return w.addEventToQueue(v, {
							delay: e
						}), w
					})), S(this, "changeCursor", (function(e) {
						if (!e) throw new Error("Must provide new cursor");
						return w.addEventToQueue(h, {
							cursor: e
						}), w
					})), S(this, "deleteChars", (function(e) {
						if (!e) throw new Error("Must provide amount of characters to delete");
						for (var t = 0; t < e; t++) w.addEventToQueue(s);
						return w
					})), S(this, "callFunction", (function(e, t) {
						if (!e || "function" != typeof e) throw new Error("Callback must be a function");
						return w.addEventToQueue(p, {
							cb: e,
							thisArg: t
						}), w
					})), S(this, "typeCharacters", (function(e) {
						var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
						if (!e || !Array.isArray(e)) throw new Error("Characters must be an array");
						return e.forEach((function(e) {
							w.addEventToQueue(i, {
								character: e,
								node: t
							})
						})), w
					})), S(this, "removeCharacters", (function(e) {
						if (!e || !Array.isArray(e)) throw new Error("Characters must be an array");
						return e.forEach((function() {
							w.addEventToQueue(s)
						})), w
					})), S(this, "addEventToQueue", (function(e, t) {
						var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
						return w.addEventToStateProperty(e, t, n, "eventQueue")
					})), S(this, "addReverseCalledEvent", (function(e, t) {
						var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
						return w.options.loop ? w.addEventToStateProperty(e, t, n, "reverseCalledEvents") : w
					})), S(this, "addEventToStateProperty", (function(e, t) {
						var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
							r = arguments.length > 3 ? arguments[3] : void 0,
							o = {
								eventName: e,
								eventArgs: t || {}
							};
						return w.state[r] = n ? [o].concat(b(w.state[r])) : [].concat(b(w.state[r]), [o]), w
					})), S(this, "runEventLoop", (function() {
						w.state.lastFrameTime || (w.state.lastFrameTime = Date.now());
						var e = Date.now(),
							n = e - w.state.lastFrameTime;
						if (!w.state.eventQueue.length) {
							if (!w.options.loop) return;
							w.state.eventQueue = b(w.state.calledEvents), w.state.calledEvents = [], w.options = E({}, w.state.initialOptions)
						}
						if (w.state.eventLoop = t()(w.runEventLoop), !w.state.eventLoopPaused) {
							if (w.state.pauseUntil) {
								if (e < w.state.pauseUntil) return;
								w.state.pauseUntil = null
							}
							var r, o = b(w.state.eventQueue),
								g = o.shift();
							if (!(n <= (r = g.eventName === l || g.eventName === s ? "natural" === w.options.deleteSpeed ? a(40, 80) : w.options.deleteSpeed : "natural" === w.options.delay ? a(120, 160) : w.options.delay))) {
								var T = g.eventName,
									S = g.eventArgs;
								switch (w.logInDevMode({
										currentEvent: g,
										state: w.state,
										delay: r
									}), T) {
									case y:
									case i:
										var A = S.character,
											N = S.node,
											C = document.createTextNode(A),
											_ = C;
										w.options.onCreateTextNode && "function" == typeof w.options.onCreateTextNode && (_ = w.options.onCreateTextNode(A, C)), _ && (N ? N.appendChild(_) : w.state.elements.wrapper.appendChild(_)), w.state.visibleNodes = [].concat(b(w.state.visibleNodes), [{
											type: "TEXT_NODE",
											character: A,
											node: _
										}]);
										break;
									case s:
										o.unshift({
											eventName: l,
											eventArgs: {
												removingCharacterNode: !0
											}
										});
										break;
									case c:
										var O = g.eventArgs.ms;
										w.state.pauseUntil = Date.now() + parseInt(O);
										break;
									case p:
										var L = g.eventArgs,
											x = L.cb,
											D = L.thisArg;
										x.call(D, {
											elements: w.state.elements
										});
										break;
									case d:
										var M = g.eventArgs,
											P = M.node,
											k = M.parentNode;
										k ? k.appendChild(P) : w.state.elements.wrapper.appendChild(P), w.state.visibleNodes = [].concat(b(w.state.visibleNodes), [{
											type: m,
											node: P,
											parentNode: k || w.state.elements.wrapper
										}]);
										break;
									case u:
										var j = w.state.visibleNodes,
											R = S.speed,
											Q = [];
										R && Q.push({
											eventName: f,
											eventArgs: {
												speed: R,
												temp: !0
											}
										});
										for (var F = 0, H = j.length; F < H; F++) Q.push({
											eventName: l,
											eventArgs: {
												removingCharacterNode: !1
											}
										});
										R && Q.push({
											eventName: f,
											eventArgs: {
												speed: w.options.deleteSpeed,
												temp: !0
											}
										}), o.unshift.apply(o, Q);
										break;
									case l:
										var I = g.eventArgs.removingCharacterNode;
										if (w.state.visibleNodes.length) {
											var U = w.state.visibleNodes.pop(),
												q = U.type,
												G = U.node,
												Y = U.character;
											w.options.onRemoveNode && "function" == typeof w.options.onRemoveNode && w.options.onRemoveNode({
												node: G,
												character: Y
											}), G && G.parentNode.removeChild(G), q === m && I && o.unshift({
												eventName: l,
												eventArgs: {}
											})
										}
										break;
									case f:
										w.options.deleteSpeed = g.eventArgs.speed;
										break;
									case v:
										w.options.delay = g.eventArgs.delay;
										break;
									case h:
										w.options.cursor = g.eventArgs.cursor, w.state.elements.cursor.innerHTML = g.eventArgs.cursor
								}
								w.options.loop && (g.eventName === l || g.eventArgs && g.eventArgs.temp || (w.state.calledEvents = [].concat(b(w.state.calledEvents), [g]))), w.state.eventQueue = o, w.state.lastFrameTime = e
							}
						}
					})), r)
					if ("string" == typeof r) {
						var T = document.querySelector(r);
						if (!T) throw new Error("Could not find container element");
						this.state.elements.container = T
					} else this.state.elements.container = r;
				g && (this.options = E(E({}, this.options), g)), this.state.initialOptions = E({}, this.options), this.init()
			}
			var r, g;
			return r = n, (g = [{
				key: "init",
				value: function() {
					var e;
					this.setupWrapperElement(), this.addEventToQueue(h, {
						cursor: this.options.cursor
					}, !0), this.addEventToQueue(u, null, !0), !window || window.___TYPEWRITER_JS_STYLES_ADDED___ || this.options.skipAddStyles || (".Typewriter__cursor{-webkit-animation:Typewriter-cursor 1s infinite;animation:Typewriter-cursor 1s infinite;margin-left:1px}@-webkit-keyframes Typewriter-cursor{0%{opacity:0}50%{opacity:1}100%{opacity:0}}@keyframes Typewriter-cursor{0%{opacity:0}50%{opacity:1}100%{opacity:0}}", (e = document.createElement("style")).appendChild(document.createTextNode(".Typewriter__cursor{-webkit-animation:Typewriter-cursor 1s infinite;animation:Typewriter-cursor 1s infinite;margin-left:1px}@-webkit-keyframes Typewriter-cursor{0%{opacity:0}50%{opacity:1}100%{opacity:0}}@keyframes Typewriter-cursor{0%{opacity:0}50%{opacity:1}100%{opacity:0}}")), document.head.appendChild(e), window.___TYPEWRITER_JS_STYLES_ADDED___ = !0), !0 === this.options.autoStart && this.options.strings && this.typeOutAllStrings().start()
				}
			}, {
				key: "logInDevMode",
				value: function(e) {
					this.options.devMode && console.log(e)
				}
			}]) && function(e, t) {
				for (var n = 0; n < t.length; n++) {
					var r = t[n];
					r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, A(r.key), r)
				}
			}(r.prototype, g), Object.defineProperty(r, "prototype", {
				writable: !1
			}), n
		}()
	})(), r.default
})()));