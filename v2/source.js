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
var PROD = (/* unused pure expression or super */ null && ("production" === 'production'));

;// CONCATENATED MODULE: ./src/constants/game.constants.ts
var INVENTORY_ID = {
    'SWORD': 0,
    'PICK': 1,
    'FUR': 2,
    'PICK_GOLD': 3,
    'PICK_DIAMOND': 4,
    'SWORD_GOLD': 5,
    'SWORD_DIAMOND': 6,
    'HAND': 7,
    'PICK_WOOD': 8,
    'PIRATE_SWORD': 9,
    'EARMUFFS': 10,
    'COAT': 11,
    'WOOD_SPEAR': 12,
    'SPEAR': 13,
    'GOLD_SPEAR': 14,
    'DIAMOND_SPEAR': 15,
    'DRAGON_SPEAR': 16,
    'LAVA_SPEAR': 17,
    'CRAB_SPEAR': 18,
    'REIDITE_SWORD': 19,
    'DIAMOND_PROTECTION': 20,
    'AMETHYST_PROTECTION': 21,
    'REIDITE_PROTECTION': 22,
    'EXPLORER_HAT': 23,
    'PIRATE_HAT': 24,
    'STONE_HELMET': 25,
    'GOLD_HELMET': 26,
    'DIAMOND_HELMET': 27,
    'BOOK': 28,
    'BAG': 29,
    'SWORD_AMETHYST': 30,
    'PICK_AMETHYST': 31,
    'PICK_REIDITE': 32,
    'AMETHYST_SPEAR': 33,
    'REIDITE_SPEAR': 34,
    'HAMMER': 35,
    'HAMMER_GOLD': 36,
    'HAMMER_DIAMOND': 37,
    'HAMMER_AMETHYST': 38,
    'HAMMER_REIDITE': 39,
    'CAP_SCARF': 40,
    'CHRISTMAS_HAT': 41,
    'ELF_HAT': 42,
    'AMETHYST_HELMET': 43,
    'REIDITE_HELMET': 44,
    'SUPER_HAMMER': 45,
    'SHOVEL': 46,
    'SUPER_DIVING_SUIT': 47,
    'DIVING_MASK': 48,
    'WATERING_CAN_FULL': 49,
    'SHOVEL_GOLD': 50,
    'SHOVEL_DIAMOND': 51,
    'SHOVEL_AMETHYST': 52,
    'PITCHFORK': 53,
    'PITCHFORK2': 54,
    'SPANNER': 55,
    'MACHETE': 56,
    'SWORD_WOOD': 57,
    'WOOD_HELMET': 58,
    'DRAGON_HELMET': 59,
    'LAVA_HELMET': 60,
    'CROWN_CRAB': 61,
    'DRAGON_SWORD': 62,
    'LAVA_SWORD': 63,
    'WOOD_BOW': 64,
    'STONE_BOW': 65,
    'GOLD_BOW': 66,
    'DIAMOND_BOW': 67,
    'AMETHYST_BOW': 68,
    'REIDITE_BOW': 69,
    'DRAGON_BOW': 70,
    'WOOD_SHIELD': 71,
    'STONE_SHIELD': 72,
    'GOLD_SHIELD': 73,
    'DIAMOND_SHIELD': 74,
    'AMETHYST_SHIELD': 75,
    'REIDITE_SHIELD': 76,
    'CROWN_GREEN': 77,
    'CROWN_ORANGE': 78,
    'CROWN_BLUE': 79,
    'TURBAN1': 80,
    'TURBAN2': 81,
    'PILOT_HELMET': 82,
    'HOOD': 83,
    'PEASANT': 84,
    'WINTER_HOOD': 85,
    'WINTER_PEASANT': 86,
    'FLOWER_HAT': 87,
    'FUR_HAT': 88,
    'SADDLE': 89,
    'WITCH': 90,
    'NIMBUS': 91,
    'WAND1': 92,
    'WAND2': 93,
    'ᐃⲆΔΔⵠ': 94,
    'ⵠᐃᐃⲆᐃ': 95,
    'ᐃᐃⲆᐃΔ': 96,
    'ΔⵠⵠⲆⵠ': 97,
    'ⵠⲆⲆΔΔ': 98,
    'ⵠΔᐃᐃᐃ': 99,
    'FIREFLY': 100,
    'WOOD_ARROW': 101,
    'STONE_ARROW': 102,
    'GOLD_ARROW': 103,
    'DIAMOND_ARROW': 104,
    'AMETHYST_ARROW': 105,
    'REIDITE_ARROW': 106,
    'DRAGON_ARROW': 107,
    'FIRE': 107,
    'STONE': 108,
    'WORKBENCH': 108,
    'WOOD': 109,
    'SEED': 109,
    'PLANT': 110,
    'GOLD': 111,
    'COOKED_MEAT': 111,
    'DIAMOND': 112,
    'BIG_FIRE': 112,
    'FURNACE': 113,
    'PAPER': 114,
    'ⵠⲆⵠᐃⲆ': 115,
    'MEAT': 116,
    'AMETHYST_WALL': 116,
    'AMETHYST_SPIKE': 117,
    'AMETHYST_DOOR': 118,
    'BRIDGE': 119,
    'ⲆᐃᐃⲆⵠ': 120,
    'AMETHYST': 121,
    'BOTTLE_FULL': 121,
    'BOTTLE_EMPTY': 122,
    'ⵠⵠᐃⲆⵠ': 123,
    'WATERING_CAN': 124,
    'ⵠⲆⵠⲆⵠ': 125,
    'SAND': 126,
    'WHEAT_SEED': 126,
    'COOKIE': 127,
    'ΔΔⵠⵠⲆ': 128,
    'KRAKEN_SKIN': 129,
    'WINDMILL': 129,
    'CAKE': 130,
    'FLOUR': 131,
    'FOODFISH_COOKED': 132,
    'ᐃⲆⵠΔⵠ': 133,
    'WILD_WHEAT': 134,
    'PLOT': 135,
    'ΔⲆⲆⵠⵠ': 136,
    'FOODFISH': 137,
    'BREAD': 137,
    'BREAD_OVEN': 138,
    'SCALES': 139,
    'SANDWICH': 139,
    'GROUND': 140,
    'BLUE_CORD': 141,
    'ICE': 142,
    'LOCK': 142,
    'DRAGON_HEART': 143,
    'LAVA_HEART': 144,
    'RESURRECTION': 145,
    'FUR_WINTER': 146,
    'EMERALD_MACHINE': 146,
    'EXTRACTOR_MACHINE_STONE': 147,
    'EXTRACTOR_MACHINE_GOLD': 148,
    'EXTRACTOR_MACHINE_DIAMOND': 149,
    'EXTRACTOR_MACHINE_AMETHYST': 150,
    'EXTRACTOR_MACHINE_REIDITE': 151,
    'LOCKPICK': 152,
    'TOTEM': 153,
    'SPIKE': 154,
    'ᐃΔᐃᐃᐃ': 155,
    'WALL': 156,
    'STONE_WALL': 157,
    'GOLD_WALL': 158,
    'DIAMOND_WALL': 159,
    'WOOD_DOOR': 160,
    'CORD': 161,
    'CHEST': 161,
    'STONE_SPIKE': 162,
    'GOLD_SPIKE': 163,
    'DIAMOND_SPIKE': 164,
    'STONE_DOOR': 165,
    'GOLD_DOOR': 166,
    'DIAMOND_DOOR': 167,
    'ⵠⵠΔⵠⵠ': 168,
    'GEMME_GREEN': 169,
    'GEMME_ORANGE': 170,
    'GEMME_BLUE': 171,
    'ⵠⲆⵠΔⲆ': 172,
    'ⲆΔⲆΔⵠ': 173,
    'FUR_WOLF': 174,
    'BUCKET_FULL': 174,
    'BUCKET_EMPTY': 175,
    'WELL': 176,
    'SIGN': 177,
    'SPECIAL_FUR': 178,
    'DRAGON_CUBE': 178,
    'SPECIAL_FUR_2': 179,
    'DRAGON_ORB': 179,
    'LAVA_CUBE': 180,
    'LAVA_ORB': 181,
    'PUMPKIN_SEED': 182,
    'ⵠᐃⲆᐃᐃ': 183,
    'ROOF': 184,
    'GARLIC_SEED': 185,
    'ⵠΔᐃΔⵠ': 186,
    'THORNBUSH_SEED': 187,
    'ⵠᐃΔΔΔ': 188,
    'PUMPKIN': 189,
    'BANDAGE': 189,
    'CRAB_STICK': 190,
    'CRAB_LOOT': 191,
    'GARLIC': 192,
    'BED': 192,
    'SUGAR_CAN': 193,
    'THORNBUSH': 194,
    'CANDY': 194,
    'GARLAND': 195,
    'REIDITE': 196,
    'FLAME': 197,
    'CARROT_SEED': 198,
    'ΔΔⵠΔⲆ': 199,
    'TOMATO_SEED': 200,
    'ⵠⵠⲆⵠΔ': 201,
    'WATERMELON_SEED': 202,
    'ᐃΔᐃⲆⵠ': 203,
    'ALOE_VERA_SEED': 204,
    'CARROT': 205,
    'WOOD_DOOR_SPIKE': 206,
    'TOMATO': 207,
    'STONE_DOOR_SPIKE': 207,
    'GOLD_DOOR_SPIKE': 208,
    'WATERMELON': 209,
    'DIAMOND_DOOR_SPIKE': 209,
    'AMETHYST_DOOR_SPIKE': 210,
    'ALOE_VERA': 211,
    'REIDITE_WALL': 211,
    'REIDITE_DOOR': 212,
    'REIDITE_SPIKE': 213,
    'REIDITE_DOOR_SPIKE': 214,
    'WOOD_TOWER': 215,
    'ⵠⵠᐃⲆⲆ': 216,
    'BOAT': 217,
    'SLED': 218,
    'MOUNT_BOAR': 219,
    'CRAB_BOSS': 220,
    'BABY_DRAGON': 221,
    'PENGUIN_FEATHER': 222,
    'BABY_LAVA': 222,
    'HAWK': 223,
    'PLANE': 224,
    'ΔⲆᐃᐃΔ': 225,
    'ⵠⵠⲆⲆΔ': 226,
    'ᐃⵠⵠᐃᐃ': 227,
    'EMERALD': 228,
    'ᐃΔⵠⵠⲆ': 229,
    'ⵠⲆⵠⲆΔ': 230,
    'HAWK_FEATHER': 231,
    'VULTURE_FEATHER': 232,
    'CACTUS': 233,
    'BABY_MAMMOTH': 233,
    'ᐃᐃΔᐃᐃ': 234,
    'PITCHFORK_PART': 235,
    'PILOT_GLASSES': 236,
    'FUR_BOAR': 237,
    'SANDWORM_JUICE': 238,
    'ⲆᐃᐃⲆᐃ': 239,
    'FUR_MAMMOTH': 240
};
var UNITS = {
    'PLAYERS': 0,
    'FIRE': 1,
    'WORKBENCH': 2,
    'SEED': 3,
    'WALL': 4,
    'SPIKE': 5,
    'BIG_FIRE': 6,
    'STONE_WALL': 7,
    'GOLD_WALL': 8,
    'DIAMOND_WALL': 9,
    'WOOD_DOOR': 10,
    'CHEST': 11,
    'STONE_SPIKE': 12,
    'GOLD_SPIKE': 13,
    'DIAMOND_SPIKE': 14,
    'STONE_DOOR': 15,
    'GOLD_DOOR': 16,
    'DIAMOND_DOOR': 17,
    'FURNACE': 18,
    'AMETHYST_WALL': 19,
    'AMETHYST_SPIKE': 20,
    'AMETHYST_DOOR': 21,
    'RESURRECTION': 22,
    'EMERALD_MACHINE': 23,
    'EXTRACTOR_MACHINE_STONE': 24,
    'EXTRACTOR_MACHINE_GOLD': 25,
    'EXTRACTOR_MACHINE_DIAMOND': 26,
    'EXTRACTOR_MACHINE_AMETHYST': 27,
    'EXTRACTOR_MACHINE_REIDITE': 28,
    'TOTEM': 29,
    'BRIDGE': 30,
    'WHEAT_SEED': 31,
    'WINDMILL': 32,
    'PLOT': 33,
    'BREAD_OVEN': 34,
    'WELL': 35,
    'SIGN': 36,
    'PUMPKIN_SEED': 37,
    'ROOF': 38,
    'GARLIC_SEED': 39,
    'THORNBUSH_SEED': 40,
    'BED': 41,
    'GARLAND': 42,
    'TOMATO_SEED': 43,
    'CARROT_SEED': 44,
    'WOOD_DOOR_SPIKE': 45,
    'STONE_DOOR_SPIKE': 46,
    'GOLD_DOOR_SPIKE': 47,
    'DIAMOND_DOOR_SPIKE': 48,
    'AMETHYST_DOOR_SPIKE': 49,
    'REIDITE_WALL': 50,
    'REIDITE_DOOR': 51,
    'REIDITE_SPIKE': 52,
    'REIDITE_DOOR_SPIKE': 53,
    'WATERMELON_SEED': 54,
    'ALOE_VERA_SEED': 55,
    'WOOD_TOWER': 56,
    'WOLF': 60,
    'SPIDER': 61,
    'FOX': 62,
    'BEAR': 63,
    'DRAGON': 64,
    'PIRANHA': 65,
    'KRAKEN': 66,
    'CRAB': 67,
    'FLAME': 68,
    'LAVA_DRAGON': 69,
    'BOAR': 70,
    'CRAB_BOSS': 71,
    'BABY_DRAGON': 72,
    'BABY_LAVA': 73,
    'HAWK': 74,
    'VULTURE': 75,
    'SAND_WORM': 76,
    'BABY_MAMMOTH': 77,
    'MAMMOTH': 78,
    'WHEAT_MOB': 79,
    'RABBIT': 80,
    'TREASURE_CHEST': 81,
    'DEAD_BOX': 82,
    'PUMPKIN_MOB': 83,
    'GARLIC_MOB': 84,
    'THORNBUSH_MOB': 85,
    'CRATE': 86,
    'GIFT': 87,
    'PENGUIN': 88,
    'ALOE_VERA_MOB': 89,
    'FIREFLY': 90,
    'SPELL': 91,
    'FRUIT': 100
};
var STATES = {
    'DELETE': 1,
    'HURT': 2,
    'COLD': 4,
    'HUNGER': 8,
    'ATTACK': 16,
    'WALK': 32,
    'IDLE': 64,
    'HEAL': 128,
    'WEB': 256
};

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
                var ready = !!globalObject.Object.defineProperty(globalObject.Object.prototype, name_1, obj);
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
        globalObject.console.log("Successfully hooked ".concat(length, " properties"));
    return done;
}
var VARS = {};
VARS.USER = undefined;
VARS.GAME = undefined;
VARS.WORLD = undefined;
VARS.MOUSE = undefined;
VARS.CLIENT = undefined;
function setHookedVar(property, value) {
    if (!(property in VARS))
        throw new globalObject.ReferenceError("Cannot set var '".concat(property, "': var not found"));
    VARS[property] = value;
    return true;
}
var PROPS = {};
function getVarProperty(hookedVar, defineAs, index) {
    var _a;
    if (index === void 0) { index = 1; }
    var ready = (_a = get('READY')) !== null && _a !== void 0 ? _a : false;
    if (!ready)
        throw new globalObject.ReferenceError('Game is not ready yet');
    if (typeof VARS[hookedVar] === 'undefined' || !(hookedVar in VARS))
        throw new globalObject.ReferenceError("Cannot get var '".concat(hookedVar, "': ").concat(!(hookedVar in VARS) ? 'var not found' : 'var not defined yet'));
    var prop = '';
    var counter = 0;
    for (var property in VARS[hookedVar]) {
        counter++;
        if (counter === index) {
            if ((typeof defineAs === 'string' && !(defineAs in PROPS)) || PROPS[defineAs] !== property)
                PROPS[defineAs] = property;
            prop = property;
            break;
        }
    }
    return prop;
}
// export const OBJECTS_PROPS: StrAny = {};
// export function getObjectProperty(object: any, defineAs: string, index: number = 1): string {
//   const ready = get<boolean>('READY');
//   if (!ready) throw new globalObject.ReferenceError('Game is not ready yet');
//   let prop: string | undefined = undefined;
//   let counter: number = 0;
//   for (const property in object) {
//     counter++;
//     if (counter === index) {
//       prop = property;
//       break;
//     }
//   }
//   if (typeof prop === 'string') {
//     if (!(object in OBJECTS_PROPS))
//       OBJECTS_PROPS[object] = {}
//     const obj = OBJECTS_PROPS[object];
//     if (!(defineAs in obj) || obj[defineAs] !== prop)
//       obj[defineAs] = prop;
//   }
// }
var OBJ_PROPS = {};
function getObjectProperty(obj, defineAs, index) {
    if (index === void 0) { index = 1; }
    var ready = get('READY');
    if (!ready)
        throw new globalObject.ReferenceError('Game is not ready yet');
    var objName = getObjectTypeName(obj);
    if (!(objName in OBJ_PROPS))
        OBJ_PROPS[objName] = {};
    var o = OBJ_PROPS[objName];
    if (!(defineAs in o)) {
        var counter = 0;
        var property = undefined;
        for (var prop in obj) {
            counter++;
            if (counter === index) {
                o[defineAs] = prop;
                property = prop;
                break;
            }
        }
        return property;
    }
    return o[defineAs];
}
// temp
var getCameraPosition = function () {
    var camx = 0;
    var camy = 0;
    var ready = get('READY');
    if (!VARS.USER[PROPS.ALIVE] || !ready)
        return [camx, camy];
    for (var prop1 in VARS.USER) {
        for (var prop2 in VARS.USER[prop1]) {
            switch (prop2) {
                case "x":
                    camx = VARS.USER[prop1][prop2];
                    break;
                case "y":
                    camy = VARS.USER[prop1][prop2];
                    break;
            }
        }
    }
    return [camx, camy];
};

;// CONCATENATED MODULE: ./src/constants/hooks.constants.ts
var _a, _b, _c, _d, _e, _f, _g;

var BASE = Symbol();
var BASE_HOOKS = [
    ['IDLE', (_a = {},
            _a['get'] = function () { return this[BASE]; },
            _a['set'] = function (data) {
                this[BASE] = data;
                setHookedVar('MOUSE', this);
            },
            _a)],
    ['time', (_b = {},
            _b['get'] = function () { return this[BASE]; },
            _b['set'] = function (data) {
                this[BASE] = data;
                setHookedVar('WORLD', this);
            },
            _b)],
    ['options', (_c = {},
            _c['get'] = function () { return this[BASE]; },
            _c['set'] = function (data) {
                this[BASE] = data;
                setHookedVar('GAME', this);
            },
            _c)],
    ['connect', (_d = {},
            _d['get'] = function () { return this[BASE]; },
            _d['set'] = function (data) {
                this[BASE] = data;
                setHookedVar('CLIENT', this);
            },
            _d)],
    ['reconnect', (_e = {},
            _e['get'] = function () { return this[BASE]; },
            _e['set'] = function (data) {
                this[BASE] = data;
                setHookedVar('USER', this);
            },
            _e)],
    ['opacity', (_f = {}, _f['get'] = function () { return 0.25; }, _f)],
    // TODO: zoom
    // ['width', {
    //   ['get']: function() { return 3840 },
    //   ['set']: function(data: any) {
    //     (this as any)[BASE] = data;
    //   }
    // }],
    // ['height', {
    //   ['get']: function() { return 2160 },
    //   ['set']: function(data: any) {
    //     (this as any)[BASE] = data;
    //   }
    // }],
    ['isBlocked', (_g = {}, _g['get'] = function () { return false; }, _g)], // Ads again..
];
var PROP_HOOKS = [
    // User hooks
    ['USER', 'ID', 16],
    ['USER', 'ALIVE', 11],
    ['USER', 'CAMERA', 28],
    ['USER', 'INVENTORY', 35],
    // World hooks
    ['WORLD', 'MODE', 1],
    ['WORLD', 'UNITS', 6],
    ['WORLD', 'PLAYERS', 5],
    ['WORLD', 'MAX_UNITS', 2],
    ['WORLD', 'FAST_UNITS', 7],
    // NetworkClient hooks
    ['CLIENT', 'SOCKET', 1],
    // Game hooks
    ['GAME', 'CHEST_BUTTONS', 46],
];

;// CONCATENATED MODULE: ./src/constants/index.ts




;// CONCATENATED MODULE: ./src/utils/game.utils.ts

var extras = [
    UNITS.EXTRACTOR_MACHINE_STONE,
    UNITS.EXTRACTOR_MACHINE_GOLD,
    UNITS.EXTRACTOR_MACHINE_DIAMOND,
    UNITS.EXTRACTOR_MACHINE_AMETHYST,
    UNITS.EXTRACTOR_MACHINE_REIDITE
];
var extras_length = extras.length;
function getExtractorTypeName(type) {
    switch (type) {
        case UNITS.EXTRACTOR_MACHINE_GOLD: return 'Gold';
        case UNITS.EXTRACTOR_MACHINE_STONE: return 'Stone';
        case UNITS.EXTRACTOR_MACHINE_DIAMOND: return 'Diamond';
        case UNITS.EXTRACTOR_MACHINE_REIDITE: return 'Reidite';
        case UNITS.EXTRACTOR_MACHINE_AMETHYST: return 'Amethyst';
    }
    return 'Unknown';
}

;// CONCATENATED MODULE: ./src/utils/number.utils.ts
function getReadableTime(seconds) {
    if (seconds < 1)
        return "".concat((seconds * 60).toFixed(0), "s");
    return "".concat(seconds.toFixed(2), "m");
}

;// CONCATENATED MODULE: ./src/utils/global.utils.ts
var getGlobalObject = function (context) { return context && context.Math === context.Math && context; };
var globalObject = getGlobalObject(typeof self === 'object' && self) ||
    getGlobalObject(typeof window === 'object' && window) ||
    getGlobalObject(typeof globalThis === 'object' && globalThis) ||
    window;
function isArray(array) {
    return !!globalObject.Array.isArray(array);
}
function getObjectTypeName(obj) {
    if (obj === null)
        return 'null';
    if (obj === undefined)
        return 'undefined';
    if (typeof obj === 'object' && obj.constructor) {
        return obj.constructor.name;
    }
    else if (typeof obj === 'function') {
        return obj.name;
    }
    else if (typeof obj === 'object') {
        return 'Object';
    }
    return typeof obj;
}

;// CONCATENATED MODULE: ./src/utils/timeout.utils.ts

function sleep(ms) {
    return new globalObject.Promise(function (resolve) { return globalObject.setTimeout(resolve, ms); });
}

;// CONCATENATED MODULE: ./src/utils/index.ts
// SOON:
// export * from './vector.utils';





;// CONCATENATED MODULE: ./src/modules/memory.module.ts

var memory = new globalObject.Map();
var get = function (key) { var _a; return (_a = memory.get(key)) !== null && _a !== void 0 ? _a : undefined; };
var set = function (key, value) {
    memory.set(key, value);
};
var remove = function (key) {
    memory.delete(key);
};

;// CONCATENATED MODULE: ./src/modules/draw.module.ts


var last = 0;
var delta = 0;
var draw_module_frames = [];
var drawFns = [];
function draw(timestamp) {
    if (timestamp === void 0) { timestamp = 0; }
    var ready = get('READY');
    if (!ready)
        return;
    globalObject.requestAnimationFrame(draw);
    var ms = timestamp - last;
    draw_module_frames.push(ms);
    if (draw_module_frames.length > 100)
        draw_module_frames.shift();
    delta = ms / 1000;
    delta = delta > 1 ? 1 : delta;
    last = timestamp;
    var context = get('CONTEXT');
    for (var _i = 0, drawFns_1 = drawFns; _i < drawFns_1.length; _i++) {
        var render = drawFns_1[_i];
        render(context, delta);
    }
}
;
function addToDraw(renderFunction) {
    if (!drawFns.includes(renderFunction))
        drawFns.push(renderFunction);
}
;
function removeFromDraw(renderFunction) {
    var index = drawFns.indexOf(renderFunction);
    if (index !== -1)
        drawFns.splice(index, 1);
}
;
var getFPS = function () { return globalObject.Math.round(1000 / (draw_module_frames.reduce(function (a, b) { return a + b; }, 0) / draw_module_frames.length)); };

;// CONCATENATED MODULE: ./src/modules/index.ts



;// CONCATENATED MODULE: ./src/drawers/base.drawer.ts

function drawBase(context, delta) {
    // console.log(delta);
    context.save();
    // Draw FPS
    var fps = getFPS();
    var fpsT = "FPS: ".concat(fps);
    context.font = "16px Baloo Paaji";
    context.fillStyle = "#fff";
    context.lineWidth = 4;
    context.strokeText(fpsT, 10, 50);
    context.fillText(fpsT, 10, 50);
    context.restore();
}
;

;// CONCATENATED MODULE: ./src/hooks/players.hook.ts



var STORED_PLAYERS = [];
function getPlayerByPid(pid) {
    return STORED_PLAYERS.find(function (player) { return player && player.pid === pid; });
}
function updatePlayers() {
    var sl = STORED_PLAYERS.length;
    if (!VARS.USER[PROPS.ALIVE]) {
        if (sl > 0)
            STORED_PLAYERS = [];
        return;
    }
    var FAST_UNITS = VARS.WORLD[PROPS.FAST_UNITS];
    if (!isArray(FAST_UNITS) || FAST_UNITS.length === 0)
        return;
    var ful = FAST_UNITS.length;
    for (var i = 0; i < ful; i++) {
        var FAST_UNIT = FAST_UNITS[i];
        if (FAST_UNIT) {
            var type = FAST_UNIT[getObjectProperty(FAST_UNIT, 'UNIT_TYPE', 1)];
            if (type !== UNITS.PLAYERS)
                continue;
            var pid = FAST_UNIT[getObjectProperty(FAST_UNIT, 'UNIT_PID', 2)];
            if (!getPlayerByPid(pid))
                STORED_PLAYERS.push({ pid: pid });
            var obj = FAST_UNIT[getObjectProperty(FAST_UNIT, 'UNIT_OBJ', 14)];
            if (obj) {
                var player = getPlayerByPid(pid);
                player.nickname = obj[getObjectProperty(obj, 'PLAYER_NICKNAME', 1)];
            }
        }
    }
}

;// CONCATENATED MODULE: ./src/hooks/index.ts


;// CONCATENATED MODULE: ./src/drawers/info.drawer.ts
var info_drawer_a, info_drawer_b, info_drawer_c, info_drawer_d, info_drawer_e, info_drawer_f, info_drawer_g;




var infos = (info_drawer_a = {},
    info_drawer_a[UNITS.TOTEM] = (info_drawer_b = {},
        info_drawer_b['strings'] = [
            "Owner: [owner]",
            "Locked: [locked]",
            "People: [people]",
        ],
        info_drawer_b),
    info_drawer_a[UNITS.PLAYERS] = (info_drawer_c = {},
        info_drawer_c['strings'] = [
            "PID: [pid]",
            "Info: [info]"
        ],
        info_drawer_c),
    info_drawer_a[UNITS.BREAD_OVEN] = (info_drawer_d = {},
        info_drawer_d['strings'] = [
            "Owner: [owner]",
            "Wood: [input]",
            "Flour: [input2]",
            "Bread: [output]",
            "Est. time: [time]",
        ],
        info_drawer_d),
    info_drawer_a[UNITS.EMERALD_MACHINE] = (info_drawer_e = {},
        info_drawer_e['strings'] = [
            "Owner: [owner]"
        ],
        info_drawer_e),
    info_drawer_a[UNITS.WINDMILL] = (info_drawer_f = {},
        info_drawer_f['strings'] = [
            "Owner: [owner]",
            "Wheat: [input]",
            "Flour: [output]",
            "Est. time: [time]",
        ],
        info_drawer_f),
    info_drawer_a['extractor'] = (info_drawer_g = {},
        info_drawer_g['strings'] = [
            "Owner: [owner]",
            "Wood: [input]",
            "[type]: [output]",
            "Est. time: [time]",
        ],
        info_drawer_g),
    info_drawer_a);
function drawPlayerInfo(context) {
    if (!VARS.USER[PROPS.ALIVE])
        return;
    var _a = getCameraPosition(), cam_x = _a[0], cam_y = _a[1];
    var units = VARS.WORLD[PROPS.UNITS];
    if (!isArray(units) || units.length === 0)
        return;
    var players = units[UNITS.PLAYERS];
    if (!isArray(players) || !players)
        return;
    var players_length = players.length;
    if (players_length === 0)
        return;
    context.save();
    context.font = '19px Baloo Paaji';
    context.lineWidth = 4;
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.strokeStyle = 'black';
    for (var index = 0; index < players_length; index++) {
        var player = players[index];
        if (player) {
            var obj = player[getObjectProperty(player, 'UNIT_OBJ', 14)];
            if (obj) {
                var alive = obj[getObjectProperty(obj, 'PLAYER_ALIVE', 13)];
                if (!alive)
                    continue;
                var x = player[getObjectProperty(player, 'UNIT_X', 4)];
                var y = player[getObjectProperty(player, 'UNIT_Y', 5)];
                var pid = player[getObjectProperty(player, 'UNIT_PID', 2)];
                var info = player[getObjectProperty(player, 'UNIT_INFO', 9)];
                // Drawing multiple infos
                var text_y = 0;
                var text = infos[UNITS.PLAYERS]['strings'];
                var text_length = text.length;
                if (text_length > 0) {
                    for (var j = 0; j < text_length; j++) {
                        var t = text[j]
                            .replace('[pid]', pid)
                            .replace('[info]', info);
                        context.strokeText(t, x + cam_x, y + cam_y + text_y);
                        context.fillText(t, x + cam_x, y + cam_y + text_y);
                        text_y += 22;
                    }
                }
            }
        }
    }
    context.restore();
}
;
function drawExtractorInfo(context) {
    if (!VARS.USER[PROPS.ALIVE])
        return;
    var _a = getCameraPosition(), cam_x = _a[0], cam_y = _a[1];
    var units = VARS.WORLD[PROPS.UNITS];
    if (!isArray(units) || units.length === 0)
        return;
    context.save();
    context.font = '16px Baloo Paaji';
    context.lineWidth = 2;
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.strokeStyle = 'black';
    for (var i = 0; i < extras_length; i++) {
        var extra = extras[i];
        var extractors = units[extra];
        if (!extractors || !isArray(extractors))
            continue;
        var extractors_length = extractors.length;
        for (var j = 0; j < extractors_length; j++) {
            var extractor = extractors[j];
            if (extractor) {
                var x = extractor[getObjectProperty(extractor, 'UNIT_X', 4)];
                var y = extractor[getObjectProperty(extractor, 'UNIT_Y', 5)];
                var pid = extractor[getObjectProperty(extractor, 'UNIT_PID', 2)];
                var type = extractor[getObjectProperty(extractor, 'UNIT_TYPE', 1)];
                var info = extractor[getObjectProperty(extractor, 'UNIT_INFO', 9)];
                var owner = getPlayerByPid(pid);
                var input = info & 0xFF;
                var output = (info & 0xFF00) >> 8;
                var time = getReadableTime(input > 0 ? (((input / 2) * 10) / 60) : 0);
                // Drawing multiple infos
                var text_y = 0;
                var text = infos['extractor']['strings'];
                var text_length = text.length;
                if (text_length > 0) {
                    for (var j_1 = 0; j_1 < text_length; j_1++) {
                        var t = text[j_1]
                            .replace('[owner]', owner ? owner.nickname || 'Unknown' : 'Unknown')
                            .replace('[type]', getExtractorTypeName(type))
                            .replace('[time]', time)
                            .replace('[input]', 'x' + input)
                            .replace('[output]', 'x' + output);
                        context.strokeText(t, x + cam_x, y + cam_y + text_y);
                        context.fillText(t, x + cam_x, y + cam_y + text_y);
                        text_y += 16;
                    }
                }
            }
        }
    }
    context.restore();
}
function drawTotemInfo(context) {
    if (!VARS.USER[PROPS.ALIVE])
        return;
    var _a = getCameraPosition(), cam_x = _a[0], cam_y = _a[1];
    var units = VARS.WORLD[PROPS.UNITS];
    if (!isArray(units) || units.length === 0)
        return;
    context.save();
    context.font = '16px Baloo Paaji';
    context.lineWidth = 2;
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.strokeStyle = 'black';
    var totems = units[UNITS.TOTEM];
    if (!totems || !isArray(totems))
        return;
    var totems_length = totems.length;
    for (var i = 0; i < totems_length; i++) {
        var totem = totems[i];
        if (totem) {
            var x = totem[getObjectProperty(totem, 'UNIT_X', 4)];
            var y = totem[getObjectProperty(totem, 'UNIT_Y', 5)];
            var pid = totem[getObjectProperty(totem, 'UNIT_PID', 2)];
            var info = totem[getObjectProperty(totem, 'UNIT_INFO', 9)];
            var owner = getPlayerByPid(pid);
            var locked = info >= 16;
            var text_y = 0;
            var text = infos[UNITS.TOTEM]['strings'];
            var text_length = text.length;
            if (text_length > 0) {
                for (var j = 0; j < text_length; j++) {
                    var t = text[j]
                        .replace('[owner]', owner ? owner.nickname || 'Unknown' : 'Unknown')
                        .replace('[locked]', locked ? "yes" : "no")
                        .replace('[people]', locked ? info % 16 : info);
                    context.strokeText(t, x + cam_x, y + cam_y + text_y);
                    context.fillText(t, x + cam_x, y + cam_y + text_y);
                    text_y += 16;
                }
            }
        }
    }
    context.restore();
}
function drawEmeraldInfo(context) {
    if (!VARS.USER[PROPS.ALIVE])
        return;
    var _a = getCameraPosition(), cam_x = _a[0], cam_y = _a[1];
    var units = VARS.WORLD[PROPS.UNITS];
    if (!isArray(units) || units.length === 0)
        return;
    context.save();
    context.font = '16px Baloo Paaji';
    context.lineWidth = 2;
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.strokeStyle = 'black';
    var emeralds = units[UNITS.EMERALD_MACHINE];
    if (!emeralds || !isArray(emeralds))
        return;
    var emeralds_length = emeralds.length;
    for (var i = 0; i < emeralds_length; i++) {
        var emerald = emeralds[i];
        if (emerald) {
            var x = emerald[getObjectProperty(emerald, 'UNIT_X', 4)];
            var y = emerald[getObjectProperty(emerald, 'UNIT_Y', 5)];
            var pid = emerald[getObjectProperty(emerald, 'UNIT_PID', 2)];
            var owner = getPlayerByPid(pid);
            var text_y = 0;
            var text = infos[UNITS.EMERALD_MACHINE]['strings'];
            var text_length = text.length;
            if (text_length > 0) {
                for (var j = 0; j < text_length; j++) {
                    var t = text[j]
                        .replace('[owner]', owner ? owner.nickname || 'Unknown' : 'Unknown');
                    context.strokeText(t, x + cam_x, y + cam_y + text_y);
                    context.fillText(t, x + cam_x, y + cam_y + text_y);
                    text_y += 16;
                }
            }
        }
    }
    context.restore();
}
function drawWindmillInfo(context) {
    if (!VARS.USER[PROPS.ALIVE])
        return;
    var _a = getCameraPosition(), cam_x = _a[0], cam_y = _a[1];
    var units = VARS.WORLD[PROPS.UNITS];
    if (!isArray(units) || units.length === 0)
        return;
    var windmills = units[UNITS.WINDMILL];
    if (!isArray(windmills) || !windmills)
        return;
    var windmills_length = windmills.length;
    if (windmills_length === 0)
        return;
    context.save();
    context.font = '16px Baloo Paaji';
    context.lineWidth = 2;
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.strokeStyle = 'black';
    for (var i = 0; i < windmills_length; i++) {
        var windmill = windmills[i];
        if (windmill) {
            var x = windmill[getObjectProperty(windmill, 'UNIT_X', 4)];
            var y = windmill[getObjectProperty(windmill, 'UNIT_Y', 5)];
            var pid = windmill[getObjectProperty(windmill, 'UNIT_PID', 2)];
            var info = windmill[getObjectProperty(windmill, 'UNIT_INFO', 9)];
            var owner = getPlayerByPid(pid);
            var input = info & 0xFF;
            var output = (info & 0xFF00) >> 8;
            var time = getReadableTime(input > 0 ? (((input / 2) * 10) / 60) : 0);
            var text_y = 0;
            var text = infos[UNITS.WINDMILL]['strings'];
            var text_length = text.length;
            if (text_length > 0) {
                for (var j = 0; j < text_length; j++) {
                    var t = text[j]
                        .replace('[owner]', owner ? owner.nickname || 'Unknown' : 'Unknown')
                        .replace('[time]', time)
                        .replace('[input]', 'x' + input)
                        .replace('[output]', 'x' + output);
                    context.strokeText(t, x + cam_x, y + cam_y + text_y);
                    context.fillText(t, x + cam_x, y + cam_y + text_y);
                    text_y += 16;
                }
            }
        }
    }
    context.restore();
}
function drawOvenInfo(context) {
    if (!VARS.USER[PROPS.ALIVE])
        return;
    var _a = getCameraPosition(), cam_x = _a[0], cam_y = _a[1];
    var units = VARS.WORLD[PROPS.UNITS];
    if (!isArray(units) || units.length === 0)
        return;
    var ovens = units[UNITS.BREAD_OVEN];
    if (!isArray(ovens) || !ovens)
        return;
    var ovens_length = ovens.length;
    if (ovens_length === 0)
        return;
    context.save();
    context.font = '16px Baloo Paaji';
    context.lineWidth = 2;
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.strokeStyle = 'black';
    for (var i = 0; i < ovens_length; i++) {
        var oven = ovens[i];
        if (oven) {
            var x = oven[getObjectProperty(oven, 'UNIT_X', 4)];
            var y = oven[getObjectProperty(oven, 'UNIT_Y', 5)];
            var pid = oven[getObjectProperty(oven, 'UNIT_PID', 2)];
            var info = oven[getObjectProperty(oven, 'UNIT_INFO', 9)];
            var owner = getPlayerByPid(pid);
            var input = info & 0x1F;
            var input2 = (info & 0x3E0) >> 5;
            var output = (info & 0x7C00) >> 10;
            var time = getReadableTime(input > 0 ? (((input / 2) * 10) / 60) : 0);
            var text_y = 0;
            var text = infos[UNITS.BREAD_OVEN]['strings'];
            var text_length = text.length;
            if (text_length > 0) {
                for (var j = 0; j < text_length; j++) {
                    var t = text[j]
                        .replace('[owner]', owner ? owner.nickname || 'Unknown' : 'Unknown')
                        .replace('[time]', time)
                        .replace('[input]', 'x' + input)
                        .replace('[input2]', 'x' + input2)
                        .replace('[output]', 'x' + output);
                    context.strokeText(t, x + cam_x, y + cam_y + text_y);
                    context.fillText(t, x + cam_x, y + cam_y + text_y);
                    text_y += 16;
                }
            }
        }
    }
    context.restore();
}

;// CONCATENATED MODULE: ./src/drawers/hooks.drawer.ts


function updateHooks() {
    hook(BASE_HOOKS);
}

;// CONCATENATED MODULE: ./src/drawers/index.ts




;// CONCATENATED MODULE: ./src/index.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






function hookAllProperties() {
    var length = PROP_HOOKS.length;
    for (var index = 0; index < length; index++) {
        var hookProp = PROP_HOOKS[index];
        if (hookProp && isArray(hookProp)) {
            var variable = hookProp[0], property = hookProp[1], address = hookProp[2];
            var hooked = getVarProperty(variable, property, address);
            if (!!hooked && DEV)
                globalObject.console.log("found ".concat(variable, ".").concat(property, " in address ").concat(address, " (").concat(hooked, ")"));
        }
    }
}
var drawModules = [
    // Hooks
    updateHooks,
    updatePlayers,
    // Draw stuff
    drawBase,
    drawOvenInfo,
    drawTotemInfo,
    drawPlayerInfo,
    drawEmeraldInfo,
    drawWindmillInfo,
    drawExtractorInfo,
];
function readyCallback() {
    var ready = get('READY');
    var canvas = get('CANVAS');
    if (!canvas)
        set('CANVAS', globalObject.document.getElementById('game_canvas'));
    if (!ready && (VARS.USER !== undefined && VARS.GAME !== undefined && VARS.WORLD !== undefined && VARS.CLIENT !== undefined)) {
        set('READY', true);
        set('CONTEXT', canvas === null || canvas === void 0 ? void 0 : canvas.getContext('2d'));
    }
    else
        return;
    draw(0);
    var moduleLength = drawModules.length;
    for (var i = 0; i < moduleLength; i++) {
        var module_1 = drawModules[i];
        if (typeof module_1 !== 'function')
            continue;
        addToDraw(module_1);
    }
    hookAllProperties();
    setInterval(function () {
        console.log(VARS.WORLD[PROPS.PLAYERS]);
        console.log(VARS.GAME[PROPS.CHEST_BUTTONS][INVENTORY_ID.AMETHYST]);
    }, 1000);
    console.log('ready', VARS, PROPS);
}
function waitUntilReady() {
    return __awaiter(this, void 0, void 0, function () {
        var ready;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ready = get('READY');
                    _a.label = 1;
                case 1:
                    if (!!ready) return [3 /*break*/, 3];
                    ready = get('READY');
                    return [4 /*yield*/, sleep(50)];
                case 2:
                    _a.sent();
                    readyCallback();
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function bootstrap() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hook(BASE_HOOKS);
                    return [4 /*yield*/, waitUntilReady()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
bootstrap();

/******/ })()
;