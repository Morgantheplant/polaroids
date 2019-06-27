/**
 * @property inQuad
 * @static
 */
export const inQuad = function inQuad(t) {
    return t * t;
};

/**
 * @property outQuad
 * @static
 */
export const outQuad = function outQuad(t) {
    return -(t -= 1) * t + 1;
};

/**
 * @property inOutQuad
 * @static
 */
export const inOutQuad = function inOutQuad(t) {
    if ((t /= 0.5) < 1) return 0.5 * t * t;
    return -0.5 * (--t * (t - 2) - 1);
};

/**
 * @property inCubic
 * @static
 */
export const inCubic = function inCubic(t) {
    return t * t * t;
};

/**
 * @property outCubic
 * @static
 */
export const outCubic = function outCubic(t) {
    return --t * t * t + 1;
};

/**
 * @property inOutCubic
 * @static
 */
export const inOutCubic = function inOutCubic(t) {
    if ((t /= 0.5) < 1) return 0.5 * t * t * t;
    return 0.5 * ((t -= 2) * t * t + 2);
};

/**
 * @property inQuart
 * @static
 */
export const inQuart = function inQuart(t) {
    return t * t * t * t;
};

/**
 * @property outQuart
 * @static
 */
export const outQuart = function outQuart(t) {
    return -(--t * t * t * t - 1);
};

/**
 * @property inOutQuart
 * @static
 */
export const inOutQuart = function inOutQuart(t) {
    if ((t /= 0.5) < 1) return 0.5 * t * t * t * t;
    return -0.5 * ((t -= 2) * t * t * t - 2);
};

/**
 * @property inQuint
 * @static
 */
export const inQuint = function inQuint(t) {
    return t * t * t * t * t;
};

/**
 * @property outQuint
 * @static
 */
export const outQuint = function outQuint(t) {
    return --t * t * t * t * t + 1;
};

/**
 * @property inOutQuint
 * @static
 */
export const inOutQuint = function inOutQuint(t) {
    if ((t /= 0.5) < 1) return 0.5 * t * t * t * t * t;
    return 0.5 * ((t -= 2) * t * t * t * t + 2);
};

/**
 * @property inSine
 * @static
 */
export const inSine = function inSine(t) {
    return -1.0 * Math.cos(t * (Math.PI / 2)) + 1.0;
};

/**
 * @property outSine
 * @static
 */
export const outSine = function outSine(t) {
    return Math.sin(t * (Math.PI / 2));
};

/**
 * @property inOutSine
 * @static
 */
export const inOutSine = function inOutSine(t) {
    return -0.5 * (Math.cos(Math.PI * t) - 1);
};

/**
 * @property inExpo
 * @static
 */
export const inExpo = function inExpo(t) {
    return t === 0 ? 0.0 : Math.pow(2, 10 * (t - 1));
};

/**
 * @property outExpo
 * @static
 */
export const outExpo = function outExpo(t) {
    return t === 1.0 ? 1.0 : -Math.pow(2, -10 * t) + 1;
};

/**
 * @property inOutExpo
 * @static
 */
export const inOutExpo = function inOutExpo(t) {
    if (t === 0) return 0.0;
    if (t === 1.0) return 1.0;
    if ((t /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
    return 0.5 * (-Math.pow(2, -10 * --t) + 2);
};

/**
 * @property inCirc
 * @static
 */
export const inCirc = function inCirc(t) {
    return -(Math.sqrt(1 - t * t) - 1);
};

/**
 * @property outCirc
 * @static
 */
export const outCirc = function outCirc(t) {
    return Math.sqrt(1 - --t * t);
};

/**
 * @property inOutCirc
 * @static
 */
export const inOutCirc = function inOutCirc(t) {
    if ((t /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);
    return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
};

/**
 * @property inElastic
 * @static
 */
export const inElastic = function inElastic(t) {
    var s = 1.70158;
    var p = 0;
    var a = 1.0;
    if (t === 0) return 0.0;
    if (t === 1) return 1.0;
    if (!p) p = 0.3;
    s = p / (2 * Math.PI) * Math.asin(1.0 / a);
    return -(
        a *
        Math.pow(2, 10 * (t -= 1)) *
        Math.sin((t - s) * (2 * Math.PI) / p)
    );
};

/**
 * @property outElastic
 * @static
 */
export const outElastic = function outElastic(t) {
    var s = 1.70158;
    var p = 0;
    var a = 1.0;
    if (t === 0) return 0.0;
    if (t === 1) return 1.0;
    if (!p) p = 0.3;
    s = p / (2 * Math.PI) * Math.asin(1.0 / a);
    return (
        a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1.0
    );
};

/**
 * @property inOutElastic
 * @static
 */
export const inOutElastic = function inOutElastic(t) {
    var s = 1.70158;
    var p = 0;
    var a = 1.0;
    if (t === 0) return 0.0;
    if ((t /= 0.5) === 2) return 1.0;
    if (!p) p = 0.3 * 1.5;
    s = p / (2 * Math.PI) * Math.asin(1.0 / a);
    if (t < 1)
        return (
            -0.5 *
            (a *
                Math.pow(2, 10 * (t -= 1)) *
                Math.sin((t - s) * (2 * Math.PI) / p))
        );
    return (
        a *
            Math.pow(2, -10 * (t -= 1)) *
            Math.sin((t - s) * (2 * Math.PI) / p) *
            0.5 +
        1.0
    );
};

/**
 * @property inBack
 * @static
 */
export const inBack = function inBack(t, s) {
    if (s === undefined) s = 1.70158;
    return t * t * ((s + 1) * t - s);
};

/**
 * @property outBack
 * @static
 */
export const outBack = function outBack(t, s) {
    if (s === undefined) s = 1.70158;
    return --t * t * ((s + 1) * t + s) + 1;
};

/**
 * @property inOutBack
 * @static
 */
export const inOutBack = function inOutBack(t, s) {
    if (s === undefined) s = 1.70158;
    if ((t /= 0.5) < 1) return 0.5 * (t * t * (((s *= 1.525) + 1) * t - s));
    return 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
};

/**
 * @property inBounce
 * @static
 */
export const inBounce = function inBounce(t) {
    return 1.0 - Easing.outBounce(1.0 - t);
};

/**
 * @property outBounce
 * @static
 */
export const outBounce = function outBounce(t) {
    if (t < 1 / 2.75) {
        return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
        return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
        return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
        return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
};

/**
 * @property inOutBounce
 * @static
 */
export const inOutBounce = function inOutBounce(t) {
    if (t < 0.5) return Easing.inBounce(t * 2) * 0.5;
    return Easing.outBounce(t * 2 - 1.0) * 0.5 + 0.5;
};
