// ==UserScript==
// @name         Sanitarium (free)
// @version      2024-06-13.alpha1
// @author       Sanitarium Development Team
// @match        *://starve.io/*
// @run-at       document-start
// @grant        unsafeWindow
// @webRequest   [{"selector":"*https://cadmus.script.ac/d1r100yi8pmbig/script.js*", "action": "cancel"}]
// ==/UserScript==

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/constants/env.constants.ts
var DEV = "production" === 'development';
var PROD = "production" === 'production';

;// CONCATENATED MODULE: ./src/utils/global.utils.ts
var getGlobalObject = function (context) { return context && context.Math === context.Math && context; };
var global_utils_globalObject = getGlobalObject(typeof self === 'object' && self) ||
    getGlobalObject(typeof window === 'object' && window) ||
    getGlobalObject(typeof globalThis === 'object' && globalThis) ||
    window;
var isArray = function (array) { return !!global_utils_globalObject.Array.isArray(array); };

;// CONCATENATED MODULE: ./src/utils/timeout.utils.ts

var sleep = function (ms) { return new globalObject.Promise(function (resolve) { return setTimeout(resolve, ms); }); };

;// CONCATENATED MODULE: ./src/utils/index.ts




;// CONCATENATED MODULE: ./src/modules/memory.module.ts

var memory = new global_utils_globalObject.Map();
var get = function (key) { var _a; return (_a = memory.get(key)) !== null && _a !== void 0 ? _a : undefined; };
var set = function (key, value) {
    memory.set(key, value);
};
var remove = function (key) {
    memory.delete(key);
};

;// CONCATENATED MODULE: ./src/modules/index.ts


;// CONCATENATED MODULE: ./src/constants/hooks.constants.ts
var _a, _b, _c, _d, _e, _f;


var BASE = global_utils_globalObject.Symbol();
var BASE_HOOKS = [
    ['IDLE', (_a = {},
            _a['get'] = function () { return this[BASE]; },
            _a['set'] = function (data) {
                this[BASE] = data;
                set('MOUSE', this);
            },
            _a)],
    ['time', (_b = {},
            _b['get'] = function () { return this[BASE]; },
            _b['set'] = function (data) {
                this[BASE] = data;
                set('WORLD', this);
            },
            _b)],
    ['options', (_c = {},
            _c['get'] = function () { return this[BASE]; },
            _c['set'] = function (data) {
                this[BASE] = data;
                set('GAME', this);
            },
            _c)],
    ['connect', (_d = {},
            _d['get'] = function () { return this[BASE]; },
            _d['set'] = function (data) {
                this[BASE] = data;
                set('CLIENT', this);
            },
            _d)],
    ['reconnect', (_e = {},
            _e['get'] = function () { return this[BASE]; },
            _e['set'] = function (data) {
                this[BASE] = data;
                set('USER', this);
            },
            _e)],
    ['isBlocked', (_f = {}, _f['get'] = function () { return false; }, _f)] // Ads again..
];

;// CONCATENATED MODULE: ./src/constants/index.ts



;// CONCATENATED MODULE: ./src/polyfills/disable-prod-console.polyfills.ts


if (!DEV && PROD) {
    var noop_1 = function () { };
    var consoleMethods = ['log', 'warn', 'error', 'info', 'debug', 'assert', 'trace'];
    consoleMethods.forEach(function (method) {
        global_utils_globalObject.console[method] = noop_1;
    });
}

;// CONCATENATED MODULE: ./src/polyfills/index.ts


;// CONCATENATED MODULE: ./src/core/index.ts


function hook(hooks) {
    if (!isArray(hooks))
        return false;
    var done = false;
    var hooked = 0;
    var length = hooks.length;
    for (var index = 0; index < length; index++) {
        var hook_1 = hooks[index];
        if (hook_1 && isArray(hook_1)) {
            var name_1 = hook_1[0], obj = hook_1[1];
            try {
                var ready = !!global_utils_globalObject.Object.defineProperty(global_utils_globalObject.Object.prototype, name_1, obj);
                ready && hooked++;
            }
            catch (e) {
                throw "Hooking '".concat(name_1, "' failed: ").concat(e.message);
            }
        }
    }
    if (hooked === length && !done)
        done = true;
    if (DEV && done)
        global_utils_globalObject.console.log("Successfully hooked ".concat(length, " properties"));
    return done;
}

;// CONCATENATED MODULE: ./src/index.ts



function bootstrap() {
    hook(BASE_HOOKS);
}
bootstrap();

/******/ })()
;