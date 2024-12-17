// @ts-check

/**
 * Zahlen.jsにおける最も適切な数値表現を生成する
 * @param {bigint|number|Qi|Q|Z} n - 生成する数値
 * @returns {Qi|Q|Z}
 */
const Zahlen = (n) => {
    /** bigintの場合 : そのままZに変換するだけ */
    if (typeof n === 'bigint') return new Z(n);
    /** numberの場合 : 十分な近似値を表すQに変換する */
    if (typeof n === 'number') return Zahlen(Tools.approximation(n));
    /** Qiの場合 : 虚部が0ならQに変換、さらに実部の分母が1ならZに変換、それ以外ならQiで返す */
    if (n instanceof Qi) {
        if (n.In === 0n) {
            if (n.Rd === 1n) return new Z(n.Rn);
            else return new Q(n.Rn, n.Rd);
        }
        return new Qi(n.Rn, n.Rd, n.In, n.Id);
    }
    /* ---- いずれでもなければエラーを返す ---- */
    throw new Error("[Zahlen.js] zmath Invalid Type Error");
};

/** @description - Zahlen.jsの実装で使う関数諸々 */
const Tools = {
    /**
     * aとbの最大公約数をユークリッドの互除法で求める
     * @param {bigint} a - 整数a
     * @param {bigint} b - 整数b
     * @returns {bigint} - aとbの最大公約数
     */
    "gcd": (a, b) => {
        if (b === 0n) return a;
        if (a < b) return Tools.gcd(b, a);
        return Tools.gcd(b, a % b);
    },
    /**
     * aの絶対値を求める
     * @param {bigint} a - 整数a
     * @returns {bigint} - aの絶対値
     */
    "abs": a => {
        return a < 0n ? -a : a;
    },
    /**
     * aの符号を求める
     * @param {bigint} a - 整数a
     * @returns {bigint} - aの符号(負:-1n, 正:1n, 0:0n)
     */
    "sign": a => {
        return a < 0n ? -1n : a > 0n ? 1n : 0n;
    },
    /**
     * aの十分な近似値を表すQ(有理数)を生成する
     * @param {number} a - 実数a
     * @returns {Q} - aの十分な近似値を表すQ
     */
    "approximation": (a) => {
        /** @description - aが特殊な値の場合 */
        // a === 0 → 0/1
        if (a === 0) return new Q(0n, 1n);
        // a === NaN → 0/0
        if (Number.isNaN(a)) return new Q(0n, 0n);
        // a === +Infinity → 1/0
        if (a === Infinity) return new Q(1n, 0n);
        // a === -Infinity → -1/0
        if (a === -Infinity) return new Q(-1n, 0n);
        /** @description - aが通常の値の場合 */
        /** @type {(num: number) => string} - numberを「そのnumberがIEE 754倍精度浮動小数点数ではどのようなビット列で表現されるか」を表すstringに変換 */
        const numberToBinaryStr = (num) => {
            const buffer = new ArrayBuffer(64);
            const view = new DataView(buffer);
            view.setFloat64(0, num);
            let str = "";
            for (let i = 0; i < 8; i++) {
                str += view.getUint8(i).toString(2).padStart(8, "0");
            }
            return str;
        };
        /** @type {(binary: string) => {n: bigint, d: bigint}} - binaryは0か1で構成された64文字の文字列。binaryで表されるビット列をIEEE754倍精度浮動小数点数として読んだときのnumberに等しい有理数n/dのnとdを返す */
        const binaryStrToRationalNumber = (binary) => {
            const signStr = binary[0];
            const expoStr = binary.substring(1, 12);
            const mantStr = binary.substring(12, 64);

            const mant_n = BigInt(`0b1${mantStr}`);
            const mant_d = 2n ** 52n;

            const expo_unoffset = BigInt(`0b${expoStr}`) - 1023n;
            let expo_n, expo_d;
            if (expo_unoffset >= 0n) {
                expo_n = 2n ** expo_unoffset;
                expo_d = 1n;
            } else {
                expo_n = 1n;
                expo_d = 2n ** (expo_unoffset * -1n);
            }

            const modulus_n = expo_n * mant_n;
            const modulus_d = expo_d * mant_d;

            /** @type {(a: bigint, b: bigint) => bigint} - 最大公約数を求める(a≧b) */
            const gcd = (a, b) => b === 0n ? a : a < b ? gcd(b, a) : gcd(b, a % b);

            const irreducible_modulus_n = modulus_n / gcd(modulus_n, modulus_d);
            const irreducible_modulus_d = modulus_d / gcd(modulus_n, modulus_d);

            if (signStr == "0") {
                return { "n": irreducible_modulus_n, "d": irreducible_modulus_d };
            } else {
                return { "n": -1n * irreducible_modulus_n, "d": irreducible_modulus_d };
            }
        };
        /** @type {string} - aのIEEE754倍精度浮動小数点数表現を表すビット列 */
        const binaryStr = numberToBinaryStr(a);
        /** @type {{n: bigint, d: bigint}} - aに等しい有理数n/dのnとdを持つオブジェクト */
        const rational = binaryStrToRationalNumber(binaryStr);
        return new Q(rational.n, rational.d);
    },
};

/**
 * @class Qi - ガウス有理数(ℚ[i])
 * @property {bigint} Rn - 実部の分子(ℤ, 絶対値はRdと互いに素でなくてもOK)
 * @property {bigint} Rd - 実部の分母(ℕ(∌0), 絶対値はRnと互いに素でなくてもOK)
 * @property {bigint} In - 虚部の分子(ℤ, 絶対値はIdと互いに素でなくてもOK)
 * @property {bigint} Id - 虚部の分母(ℕ(∌0), 絶対値はInと互いに素でなくてもOK)
 */
const Qi = class Qi {
    /**
     * @param {bigint} Rn - 実部の分子(ℤ)
     * @param {bigint} Rd - 実部の分母(ℤ)
     * @param {bigint} In - 虚部の分子(ℤ)
     * @param {bigint} Id - 虚部の分母(ℤ)
     */
    constructor(Rn, Rd, In, Id) {
        /** @type {bigint[]} - 4引数の絶対値を求める */
        const [Rn_abs, Rd_abs, In_abs, Id_abs] = [Rn, Rd, In, Id].map(Tools.abs);
        /** @type {bigint[]} - 実部と虚部の符号を求める */
        const [R_sign, I_sign] = [Rn * Rd, In * Id].map(Tools.sign);
        /** @type {bigint[]} - 実部と虚部それぞれで、分母と分子の最大公約数を求める */
        const [R_gcd, I_gcd] = [[Rn_abs, Rd_abs], [In_abs, Id_abs]].map(([a, b]) => Tools.gcd(a, b));
        /** @type {bigint[]} - 実部と虚部それぞれで、分母と分子(の絶対値)を最大公約数で割って約分する */
        const [Rn_reduced, Rd_reduced] = [Rn_abs / R_gcd, Rd_abs / R_gcd];
        const [In_reduced, Id_reduced] = [In_abs / I_gcd, Id_abs / I_gcd];
        /** @description - 符号を分子に掛けて、プロパティに代入する */
        /** @type {bigint} - 実部の分子(ℤ, 絶対値はRdと互いに素) */
        this.Rn = Rn_reduced * R_sign;
        /** @type {bigint} - 実部の分母(ℕ(∌0), 絶対値はRnと互いに素) */
        this.Rd = Rd_reduced;
        /** @type {bigint} - 虚部の分子(ℤ, 絶対値はIdと互いに素) */
        this.In = In_reduced * I_sign;
        /** @type {bigint} - 虚部の分母(ℕ(∌0), 絶対値はInと互いに素) */
        this.Id = Id_reduced;
    }
    /** @type {() => number} - このガウス有理数をnumberに変換する */
    valueOf() {
        return Number(this.Rn) / Number(this.Rd) + Number(this.In) / Number(this.Id) * Math.sqrt(-1);
    }
    /** @type {() => string} - このガウス有理数をstringに変換する */
    toString() {
        return `${this.Rn}/${this.Rd} + ${this.In}/${this.Id}i`;
    }
    /* ======== Pythonのcomplex型をベースにしたメソッド/プロパティ ======== */
    /** @type {Q} - 実部 */
    get real() {
        return new Q(this.Rn, this.Rd);
    }
    /** @type {Q} - 虚部 */
    get imag() {
        return new Q(this.In, this.Id);
    }
    /** @type {() => Q} - 共役な複素数 */
    conjugate() {
        return Zahlen(new Qi(this.Rn, this.Rd, -this.In, this.Id));
    }
    /* ======== 一般に中置演算子で表されることが多い各種演算 ======== */
    /** @type {(y: Qi|Q|Z) => Qi|Q|Z} - 加算(`x + y`) */
    add(y) {
        return zmath.add(this, y);
    }
    /** @type {(y: Qi|Q|Z) => Qi|Q|Z} - 減算(`x - y`) */
    sub(y) {
        return zmath.sub(this, y);
    }
    /** @type {(y: Qi|Q|Z) => Qi|Q|Z} - 乗算(`x * y`) */
    mul(y) {
        return zmath.mul(this, y);
    }
    /** @type {(y: Qi|Q|Z) => Qi|Q|Z} - 除算(`x / y`) */
    div(y) {
        return zmath.div(this, y);
    }
    /** @type {(y: Qi|Q|Z) => Qi|Q|Z} - 剰余(`x % y`) */
    mod(y) {
        return zmath.mod(this, y);
    }
    /** @type {(y: Qi|Q|Z) => Qi|Q|Z} - 累乗(`x ** y`) */
    pow(y) {
        return zmath.pow(this, y);
    }
    /** @type {(y: Qi|Q|Z) => boolean} - 等価(`x == y`) */
    eq(y) {
        return zmath.eq(this, y);
    }
    /** @type {(y: Qi|Q|Z) => boolean} - 不等価(`x != y`) */
    ne(y) {
        return zmath.ne(this, y);
    }
    /** @type {(y: Qi|Q|Z) => boolean} - 小なり(`x < y`) */
    lt(y) {
        return zmath.lt(this, y);
    }
    /** @type {(y: Qi|Q|Z) => boolean} - 小なりイコール(`x <= y`) */
    le(y) {
        return zmath.le(this, y);
    }
    /** @type {(y: Qi|Q|Z) => boolean} - 大なり(`x > y`) */
    gt(y) {
        return zmath.gt(this, y);
    }
    /** @type {(y: Qi|Q|Z) => boolean} - 大なりイコール(`x >= y`) */
    ge(y) {
        return zmath.ge(this, y);
    }
};

/**
 * @class Q - 有理数(ℚ)
 * @extends Qi
 * @property {bigint} Rn - 分子(ℤ, 絶対値はRdと互いに素)
 * @property {bigint} Rd - 分母(ℕ(∌0), 絶対値はRnと互いに素)
 * @property {0n} In - 虚部の分子(※有理数なので常に0)
 * @property {1n} Id - 虚部の分母(※有理数なので常に1)
 */
const Q = class Q extends Qi {
    /**
     * @param {bigint} Rn - 分子(ℤ)
     * @param {bigint} Rd - 分母(ℤ)
     */
    constructor(Rn, Rd) {
        super(Rn, Rd, 0n, 1n);
    }
    /** @type {() => number} - この有理数をnumberに変換する */
    valueOf() {
        return Number(this.Rn) / Number(this.Rd);
    }
    /** @type {() => string} - この有理数をstringに変換する */
    toString() {
        return `${this.Rn}/${this.Rd}`;
    }
};

/**
 * @class Z - 整数(ℤ)
 * @extends Q
 * @property {bigint} Rn - 数
 * @property {1n} Rd - 分母(※整数なので常に1)
 * @property {0n} In - 虚部の分子(※整数なので常に0)
 * @property {1n} Id - 虚部の分母(※整数なので常に1)
 */
const Z = class Z extends Q {
    /**
     * @param {bigint} Rn - 数
     */
    constructor(Rn) {
        super(Rn, 1n);
    }
    /** @type {() => number} - この整数をnumberに変換する */
    valueOf() {
        return Number(this.Rn);
    }
    /** @type {() => string} - この整数をstringに変換する */
    toString() {
        return `${this.Rn}`;
    }
};

/** @description - Zahlen.js専用の数学関数etcを実装したオブジェクト群 */
const zmath = {
    /** ======== 定数 ======== **/
    /** @type {Q} - ネイピア数の近似値 */
    E: Zahlen(Math.E),
    /** @type {Q} - 2の自然対数の近似値 */
    LN2: Zahlen(Math.LN2),
    /** @type {Q} - 10の自然対数の近似値 */
    LN10: Zahlen(Math.LN10),
    /** @type {Q} - 自然対数の底と2の底の対数の近似値 */
    LOG2E: Zahlen(Math.LOG2E),
    /** @type {Q} - 自然対数の底と10の底の対数の近似値 */
    LOG10E: Zahlen(Math.LOG10E),
    /** @type {Q} - 円周率の近似値 */
    PI: Zahlen(Math.PI),
    /** @type {Q} - 1/2の平方根の近似値 */
    SQRT1_2: Zahlen(Math.SQRT1_2),
    /** @type {Q} - 2の平方根の近似値 */
    SQRT2: Zahlen(Math.SQRT2),
    /** @type {Qi} - 虚数単位i */
    I: Zahlen(new Qi(0n, 1n, 1n, 1n)),
    /** ======== 丸め・特徴 ======== **/
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 切り上げを返す */
    ceil: x => {
        /* ---- Z範囲 : なにもしない ---- */
        if (x instanceof Z) return x;
        /* ---- Q範囲 : 正ならtruncに+1、負ならtruncそのまま ---- */
        if (x instanceof Q) {
            if (x.Rn >= 0n) return zmath.add(zmath.trunc(x), new Z(1n));
            else return zmath.trunc(x);
        }
        /* ---- Qi範囲 : 実部と虚部それぞれでceilを取って設定し直す ---- */
        if (x instanceof Qi) {
            const real_ceil = zmath.ceil(new Q(x.Rn, x.Rd));
            const imag_ceil = zmath.ceil(new Q(x.In, x.Id));
            return Zahlen(new Qi(real_ceil.Rn, real_ceil.Rd, imag_ceil.Rn, imag_ceil.Rd));
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 切り捨てを返す */
    floor: x => {
        /* ---- Z範囲 : なにもしない ---- */
        if (x instanceof Z) return x;
        /* ---- Q範囲 : 正ならtruncそのまま、負ならtruncに-1 ---- */
        if (x instanceof Q) {
            if (x.Rn >= 0n) return zmath.trunc(x);
            else return zmath.sub(zmath.trunc(x), new Z(1n));
        }
        /* ---- Qi範囲 : 実部と虚部それぞれでfloorを取って設定し直す ---- */
        if (x instanceof Qi) {
            const real_floor = zmath.floor(new Q(x.Rn, x.Rd));
            const imag_floor = zmath.floor(new Q(x.In, x.Id));
            return Zahlen(new Qi(real_floor.Rn, real_floor.Rd, imag_floor.Rn, imag_floor.Rd));
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 四捨五入を返す */
    round: x => {
        /* ---- Z範囲 : なにもしない ---- */
        if (x instanceof Z) return x;
        /* ---- Q範囲 : 正なら+1/2のfloor、負なら-1/2のceilに ---- */
        if (x instanceof Q) {
            if (x.Rn >= 0n) return zmath.floor(zmath.add(x, new Q(1n, 2n)));
            else return zmath.ceil(zmath.sub(x, new Q(1n, 2n)));
        }
        /* ---- Qi範囲 : 実部と虚部それぞれでroundを取って設定し直す ---- */
        if (x instanceof Qi) {
            const real_round = zmath.round(new Q(x.Rn, x.Rd));
            const imag_round = zmath.round(new Q(x.In, x.Id));
            return Zahlen(new Qi(real_round.Rn, real_round.Rd, imag_round.Rn, imag_round.Rd));
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 整数部分を返す */
    trunc: x => {
        /* ---- Z範囲 : なにもしない ---- */
        if (x instanceof Z) return x;
        /* ---- Q範囲 : bigintでxRn/xRdをやったら整数部分が返ってくる ---- */
        if (x instanceof Q) {
            return new Z(x.Rn / x.Rd);
        }
        /* ---- Qi範囲 : 実部と虚部それぞれでtruncを取って設定し直す ---- */
        if (x instanceof Qi) {
            const real_trunc = zmath.trunc(new Q(x.Rn, x.Rd));
            const imag_trunc = zmath.trunc(new Q(x.In, x.Id));
            return Zahlen(new Qi(real_trunc.Rn, real_trunc.Rd, imag_trunc.Rn, imag_trunc.Rd));
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 絶対値を返す */
    abs: x => {
        /* ---- Q範囲 : RnとInをそれぞれabsに通して設定し直す ---- */
        if (x instanceof Q) return Zahlen(new Q(Tools.abs(x.Rn), x.Rd));
        /* ---- Qi範囲 : 実部と虚部で三平方の定理。hypotで計算できる ---- */
        if (x instanceof Qi) {
            return Zahlen(zmath.hypot(new Q(x.Rn, x.Rd), new Q(x.In, x.Id)));
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 符号を返す */
    sign: x => {
        /* ---- Qi範囲 : RnとInをそれぞれsignに通して設定し直す ---- */
        if (x instanceof Qi) return Zahlen(new Qi(Tools.sign(x.Rn), 1n, Tools.sign(x.In), 1n));
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** ======== 四則演算 ======== **/
    /** @type {(x: Qi|Q|Z, y: Qi|Q|Z) => Qi|Q|Z} - 加算を返す */
    add: (x, y) => {
        /* ---- Q範囲 : xRn/xRd + yRn/yRd = (xRn*yRd + yRn*xRd) / (xRd*yRd) ---- */
        if (x instanceof Q && y instanceof Q) {
            return Zahlen(new Q(x.Rn * y.Rd + y.Rn * x.Rd, x.Rd * y.Rd));
        }
        /* ---- Qi範囲 : 実部と虚部をそれぞれQで表して定義通りやって戻す ---- */
        if (x instanceof Qi && y instanceof Qi) {
            const [x_real, x_imag] = [new Q(x.Rn, x.Rd), new Q(x.In, x.Id)];
            const [y_real, y_imag] = [new Q(y.Rn, y.Rd), new Q(y.In, y.Id)];
            // (a+bi)+(c+di) = (a+c)+(b+d)i
            const ans_real = zmath.add(x_real, y_real);
            const ans_imag = zmath.add(x_imag, y_imag);
            return Zahlen(new Qi(ans_real.Rn, ans_real.Rd, ans_imag.Rn, ans_imag.Rd));
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z, y: Qi|Q|Z) => Qi|Q|Z} - 減算を返す */
    sub: (x, y) => {
        /* ---- Q範囲 : xRn/xRd - yRn/yRd = (xRn*yRd - yRn*xRd) / (xRd*yRd) ---- */
        if (x instanceof Q && y instanceof Q) {
            return Zahlen(new Q(x.Rn * y.Rd - y.Rn * x.Rd, x.Rd * y.Rd));
        }
        /* ---- Qi範囲 : 実部と虚部をそれぞれQで表して定義通りやって戻す ---- */
        if (x instanceof Qi && y instanceof Qi) {
            const [x_real, x_imag] = [new Q(x.Rn, x.Rd), new Q(x.In, x.Id)];
            const [y_real, y_imag] = [new Q(y.Rn, y.Rd), new Q(y.In, y.Id)];
            // (a+bi)-(c+di) = (a-c)+(b-d)i
            const ans_real = zmath.sub(x_real, y_real);
            const ans_imag = zmath.sub(x_imag, y_imag);
            return Zahlen(new Qi(ans_real.Rn, ans_real.Rd, ans_imag.Rn, ans_imag.Rd));
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z, y: Qi|Q|Z) => Qi|Q|Z} - 乗算を返す */
    mul: (x, y) => {
        /* ---- Q範囲 : xRn/xRd * yRn/yRd = (xRn*yRn) / (xRd*yRd) ---- */
        if (x instanceof Q && y instanceof Q) {
            return Zahlen(new Q(x.Rn * y.Rn, x.Rd * y.Rd));
        }
        /* ---- Qi範囲 : 実部と虚部をそれぞれQで表して定義通りやって戻す ---- */
        if (x instanceof Qi && y instanceof Qi) {
            const [x_real, x_imag] = [new Q(x.Rn, x.Rd), new Q(x.In, x.Id)];
            const [y_real, y_imag] = [new Q(y.Rn, y.Rd), new Q(y.In, y.Id)];
            // (a+bi)*(c+di) = (ac-bd)+(ad+bc)i
            const ans_real = zmath.sub(zmath.mul(x_real, y_real), zmath.mul(x_imag, y_imag));
            const ans_imag = zmath.add(zmath.mul(x_real, y_imag), zmath.mul(x_imag, y_real));
            return Zahlen(new Qi(ans_real.Rn, ans_real.Rd, ans_imag.Rn, ans_imag.Rd));
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z, y: Qi|Q|Z) => Qi|Q|Z} - 除算を返す */
    div: (x, y) => {
        /* ---- Q範囲 : (xRn/xRd )/ (yRn/yRd) = (xRn*yRd) / (xRd*yRn) ---- */
        if (x instanceof Q && y instanceof Q) {
            return Zahlen(new Q(x.Rn * y.Rd, x.Rd * y.Rn));
        }
        /* ---- Qi範囲 : 実部と虚部をそれぞれQで表して定義通りやって戻す ---- */
        if (x instanceof Qi && y instanceof Qi) {
            const [x_real, x_imag] = [new Q(x.Rn, x.Rd), new Q(x.In, x.Id)];
            const [y_real, y_imag] = [new Q(y.Rn, y.Rd), new Q(y.In, y.Id)];
            // (a+bi)/(c+di) = (ac+bd)/(c²+d²) + ((bc-ad)/(c²+d²))i
            const denominator = zmath.add(zmath.pow(y_real, new Z(2n)), zmath.pow(y_imag, new Z(2n)));
            const ans_real = zmath.div(zmath.add(zmath.mul(x_real, y_real), zmath.mul(x_imag, y_imag)), denominator);
            const ans_imag = zmath.div(zmath.sub(zmath.mul(x_imag, y_real), zmath.mul(x_real, y_imag)), denominator);
            return Zahlen(new Qi(ans_real.Rn, ans_real.Rd, ans_imag.Rn, ans_imag.Rd));
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z, y: Qi|Q|Z) => Qi|Q|Z} - 剰余を返す */
    mod: (x, y) => {
        /* ---- Q範囲 : まあ定義に沿ってやるだけ…… ---- */
        if (x instanceof Q && y instanceof Q) {
            /* -- 正数の場合 : 任意の正数x,yについて x mod y = x - y*trunc(x/y) -- */
            if (Tools.sign(x.Rn) >= 0n && Tools.sign(y.Rn) >= 0n) {
                return zmath.sub(x, zmath.mul(y, zmath.trunc(zmath.div(x, y))));
            }
            /* -- 負数の場合 : 任意の実数x,yについて x mod y = (xの符号)×(|x| mod |y|) -- */
            const x_sign = Tools.sign(x.Rn);
            const x_abs = new Q(Tools.abs(x.Rn), x.Rd);
            const y_abs = new Q(Tools.abs(y.Rn), y.Rd);
            return zmath.mul(new Q(x_sign, 1n), zmath.mod(x_abs, y_abs));
        }
        /* ---- Qi範囲 : x mod y = (y/(2πi))log(e^((2π/y)ix)) ---- */
        if (x instanceof Qi && y instanceof Qi) {
            const two_pi = zmath.mul(Zahlen(2n), zmath.PI);
            const two_pi_i = zmath.mul(two_pi, zmath.I);
            const two_pi_div_y = zmath.div(two_pi, y);
            const log = zmath.log(zmath.exp(zmath.mul(two_pi_div_y, zmath.mul(zmath.I, x))));
            return zmath.mul(zmath.div(y, two_pi_i), log);
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** ======== 比較演算 ======== **/
    /** @type {(x: Qi|Q|Z, y: Qi|Q|Z) => boolean} - 等価を返す */
    eq: (x, y) => {
        /* ---- Qi範囲 : Zahlenに通したうえで、各プロパティを比較して全て等価ならtrue ---- */
        if (x instanceof Qi && y instanceof Qi) {
            const x_new = Zahlen(x);
            const y_new = Zahlen(y);
            return x_new.Rn === y_new.Rn && x_new.Rd === y_new.Rd && x_new.In === y_new.In && x_new.Id === y_new.Id;
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z, y: Qi|Q|Z) => boolean} - 不等価を返す */
    ne: (x, y) => {
        /* ---- Qi範囲 : 等価の否定を返す ---- */
        if (x instanceof Qi && y instanceof Qi) {
            return !zmath.eq(x, y);
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z, y: Qi|Q|Z) => boolean} - x < y */
    lt: (x, y) => {
        /* ---- Q範囲 : xRn/xRd < yRn/yRd  ⇔  xRn*yRd < yRn*xRd ---- */
        if (x instanceof Q && y instanceof Q) {
            return x.Rn * y.Rd < y.Rn * x.Rd;
        }
        /* ---- Qi範囲 : 絶対値で比較 ---- */
        if (x instanceof Qi && y instanceof Qi) {
            const x_abs = zmath.abs(x);
            const y_abs = zmath.abs(y);
            return zmath.lt(x_abs, y_abs);
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z, y: Qi|Q|Z) => boolean} - x <= y */
    le: (x, y) => {
        /* ---- Qi範囲 : gtの否定を返す ---- */
        if (x instanceof Qi && y instanceof Qi) {
            return !zmath.gt(x, y);
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z, y: Qi|Q|Z) => boolean} - x > y */
    gt: (x, y) => {
        /* ---- Qi範囲 : xとyを逆にしてltを使う ---- */
        if (x instanceof Qi && y instanceof Qi) {
            return zmath.lt(y, x);
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z, y: Qi|Q|Z) => boolean} - x >= y */
    ge: (x, y) => {
        /* ---- Qi範囲 : ltの否定を返す ---- */
        if (x instanceof Qi && y instanceof Qi) {
            return !zmath.lt(x, y);
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** ======== 三角関数・逆三角関数 ======== **/
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 正弦を返す */
    sin: x => {
        /* ---- Q範囲 : Zahlenがnumber→Qをやってくれるので、Math.sinを借りちゃえばOK ---- */
        if (x instanceof Q) return Zahlen(Math.sin(Number(x)));
        /* ---- Qi範囲 : sin z = (e^iz - e^(-iz)) / 2i ---- */
        if (x instanceof Qi) {
            const exp_iz = zmath.exp(zmath.mul(x, zmath.I));
            const exp_minus_iz = zmath.exp(zmath.mul(zmath.neg(x), zmath.I));
            const exp_diff = zmath.sub(exp_iz, exp_minus_iz);
            return zmath.div(exp_diff, zmath.mul(zmath.I, Zahlen(2n)));
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 余弦を返す */
    cos: x => {
        /* ---- Q範囲 : Zahlenがnumber→Qをやってくれるので、Math.cosを借りちゃえばOK ---- */
        if (x instanceof Q) return Zahlen(Math.cos(Number(x)));
        /* ---- Qi範囲 : cos z = (e^iz + e^(-iz)) / 2 ---- */
        if (x instanceof Qi) {
            const exp_iz = zmath.exp(zmath.mul(x, zmath.I));
            const exp_minus_iz = zmath.exp(zmath.mul(zmath.neg(x), zmath.I));
            const exp_sum = zmath.add(exp_iz, exp_minus_iz);
            return zmath.div(exp_sum, Zahlen(2n));
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 正接を返す */
    tan: x => {
        /* ---- Q範囲 : Zahlenがnumber→Qをやってくれるので、Math.tanを借りちゃえばOK ---- */
        if (x instanceof Q) return Zahlen(Math.tan(Number(x)));
        /* ---- Qi範囲 : tan z = sin z / cos z ---- */
        if (x instanceof Qi) return zmath.div(zmath.sin(x), zmath.cos(x));
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 逆正弦を返す */
    asin: x => {
        /* ---- Q範囲 : Zahlenがnumber→Qをやってくれるので、Math.asinを借りちゃえばOK ---- */
        if (x instanceof Q) return Zahlen(Math.asin(Number(x)));
        /* ---- Qi範囲 : asin x = -i log( ix + sqrt( 1 - x^2 ) ) ---- */
        if (x instanceof Qi) {
            const ix = zmath.mul(zmath.I, x);
            const sqrt = zmath.sqrt(zmath.sub(Zahlen(1n), zmath.pow(x, new Z(2n))));
            return zmath.mul(zmath.mul(zmath.I, Zahlen(-1n)), zmath.log(zmath.add(ix, sqrt)));
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 逆余弦を返す */
    acos: x => {
        /* ---- Q範囲 : Zahlenがnumber→Qをやってくれるので、Math.acosを借りちゃえばOK ---- */
        if (x instanceof Q) return Zahlen(Math.acos(Number(x)));
        /* ---- Qi範囲 : acos x = pi/2 - asin x ---- */
        if (x instanceof Qi) return zmath.sub(zmath.div(zmath.PI, Zahlen(2n)), zmath.asin(x));
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 逆正接を返す */
    atan: x => {
        /* ---- Q範囲 : Zahlenがnumber→Qをやってくれるので、Math.atanを借りちゃえばOK ---- */
        if (x instanceof Q) return Zahlen(Math.atan(Number(x)));
        /* ---- Qi範囲 : atan x = i/2 * { log( 1-ix ) - log( 1+ix) } ---- */
        if (x instanceof Qi) {
            const ix = zmath.mul(zmath.I, x);
            const log1 = zmath.log(zmath.sub(Zahlen(1n), ix));
            const log2 = zmath.log(zmath.add(Zahlen(1n), ix));
            return zmath.mul(zmath.div(zmath.I, Zahlen(2n)), zmath.sub(log1, log2));
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(y: Q|Z, x: Q|Z) => Q|Z} - 2つの引数の逆正接を返す */
    atan2: (y, x) => {
        /* ---- Q範囲 : Zahlenがnumber→Qをやってくれるので、Math.atan2を借りちゃえばOK ---- */
        if (y instanceof Q && x instanceof Q) return Zahlen(Math.atan2(Number(y), Number(x)));
        /* ---- Q範囲外ならエラーを返す ---- */
        throw new TypeError("[Zahlen.js] zmath.atan2() can only accept Q( or Z) as arguments");
    },
    /** ======== 双曲線関数・逆双曲線関数 ======== **/
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 双曲線正弦を返す */
    sinh: x => {
        /* ---- Q範囲 : Zahlenがnumber→Qをやってくれるので、Math.sinhを借りちゃえばOK ---- */
        if (x instanceof Q) return Zahlen(Math.sinh(Number(x)));
        /* ---- Qi範囲 : sinh z = (e^z - e^(-z)) / 2i ---- */
        if (x instanceof Qi) {
            const exp_z = zmath.exp(x);
            const exp_minus_z = zmath.exp(zmath.neg(x));
            const exp_diff = zmath.sub(exp_z, exp_minus_z);
            return zmath.div(exp_diff, zmath.mul(zmath.I, Zahlen(2n)));
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 双曲線余弦を返す */
    cosh: x => {
        /* ---- Q範囲 : Zahlenがnumber→Qをやってくれるので、Math.coshを借りちゃえばOK ---- */
        if (x instanceof Q) return Zahlen(Math.cosh(Number(x)));
        /* ---- Qi範囲 : cosh z = (e^z + e^(-z)) / 2i ---- */
        if (x instanceof Qi) {
            const exp_z = zmath.exp(x);
            const exp_minus_z = zmath.exp(zmath.neg(x));
            const exp_sum = zmath.add(exp_z, exp_minus_z);
            return zmath.div(exp_sum, zmath.mul(zmath.I, Zahlen(2n)));
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 双曲線正接を返す */
    tanh: x => {
        /* ---- Q範囲 : Zahlenがnumber→Qをやってくれるので、Math.tanhを借りちゃえばOK ---- */
        if (x instanceof Q) return Zahlen(Math.tanh(Number(x)));
        /* ---- Qi範囲 : tanh z = sinh z / cosh z ---- */
        if (x instanceof Qi) {
            const sinh_z = zmath.sinh(x);
            const cosh_z = zmath.cosh(x);
            return zmath.div(sinh_z, cosh_z);
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 逆双曲線正弦を返す */
    asinh: x => {
        /* ---- Q範囲 : Zahlenがnumber→Qをやってくれるので、Math.asinhを借りちゃえばOK ---- */
        if (x instanceof Q) return Zahlen(Math.asinh(Number(x)));
        /* ---- Qi範囲 : asinh z =  log_e( z + sqrt( z^2 + 1 ) ) ---- */
        if (x instanceof Qi) {
            const sqrt = zmath.sqrt(zmath.add(zmath.pow(x, new Z(2n)), Zahlen(1n)));
            return zmath.log(zmath.add(x, sqrt));
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 逆双曲線余弦を返す */
    acosh: x => {
        /* ---- Q範囲 : Zahlenがnumber→Qをやってくれるので、Math.acoshを借りちゃえばOK ---- */
        if (x instanceof Q) return Zahlen(Math.acosh(Number(x)));
        /* ---- Qi範囲 : acosh z =  log_e( z + sqrt( z + 1 ) * sqrt( z - 1 ) ) ---- */
        if (x instanceof Qi) {
            const sqrt1 = zmath.sqrt(zmath.add(x, Zahlen(1n)));
            const sqrt2 = zmath.sqrt(zmath.sub(x, Zahlen(1n)));
            const sqrt = zmath.mul(sqrt1, sqrt2);
            return zmath.log(zmath.add(x, sqrt));
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 逆双曲線正接を返す */
    atanh: x => {
        /* ---- Q範囲 : Zahlenがnumber→Qをやってくれるので、Math.atanhを借りちゃえばOK ---- */
        if (x instanceof Q) return Zahlen(Math.atanh(Number(x)));
        /* ---- Qi範囲 : atanh z =  1/2 * log_e( (1+z)/(1-z) ) ---- */
        if (x instanceof Qi) {
            const z_plus_1 = zmath.add(x, Zahlen(1n));
            const z_minus_1 = zmath.sub(x, Zahlen(1n));
            const log = zmath.log(zmath.div(z_plus_1, z_minus_1));
            return zmath.mul(zmath.div(Zahlen(1n), Zahlen(2n)), log);
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** ======== 指数関数・対数関数 ======== **/
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 指数関数(e^x)を返す */
    exp: x => {
        /* ---- Q範囲 : Zahlenがnumber→Qをやってくれるので、Math.expを借りちゃえばOK ---- */
        if (x instanceof Q) return Zahlen(Math.exp(Number(x)));
        /* ---- Qi範囲 : e^(a+bi) = e^a * (cos b + i sin b) ---- */
        if (x instanceof Qi) {
            const exp_a = zmath.exp(x.real);
            const cos_b = zmath.cos(x.imag);
            const sin_b = zmath.sin(x.imag);
            const i_sin_b = zmath.mul(sin_b, zmath.I);
            return zmath.mul(exp_a, zmath.add(cos_b, i_sin_b));
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - exp(x) - 1を返す */
    expm1: x => {
        /* ---- Qi範囲 : zmath.exp()を借りて1引けばOK ---- */
        if (x instanceof Qi) return zmath.sub(zmath.exp(x), Zahlen(1));
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 自然対数を返す */
    log: x => {
        /* ---- Q⁺範囲 : Zahlenがnumber→Qをやってくれるので、Math.logを借りちゃえばOK ---- */
        if (x instanceof Q && x.gt(Zahlen(0))) return Zahlen(Math.log(Number(x)));
        /* ---- Qi範囲 : Log z = log |z| + i (Arg z) ---- */
        if (x instanceof Qi) {
            const abs_z = zmath.abs(x);
            const arg_z = zmath.arg(x);
            return zmath.add(zmath.log(abs_z), zmath.mul(arg_z, zmath.I));
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - log(1 + x)を返す */
    log1p: x => {
        /* ---- Q範囲 : Zahlenがnumber→Qをやってくれるので、Math.log1pを借りちゃえばOK ---- */
        if (x instanceof Q) return Zahlen(Math.log1p(Number(x)));
        /* ---- Qi範囲 : zmath.log()を借りて1足せばOK ---- */
        if (x instanceof Qi) return zmath.log(zmath.add(x, Zahlen(1)));
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 10を底とする対数を返す */
    log10: x => {
        /* ---- Q範囲 : Zahlenがnumber→Qをやってくれるので、Math.log10を借りちゃえばOK ---- */
        if (x instanceof Q) return Zahlen(Math.log10(Number(x)));
        /* ---- Q範囲 : たぶん底の変換公式でいいだろ ---- */
        if (x instanceof Qi) {
            const numerator = zmath.log(x);
            const denominator = zmath.log(Zahlen(10));
            return zmath.div(numerator, denominator);
        };
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 2を底とする対数を返す */
    log2: x => {
        /* ---- Q範囲 : Zahlenがnumber→Qをやってくれるので、Math.log2を借りちゃえばOK ---- */
        if (x instanceof Q) return Zahlen(Math.log2(Number(x)));
        /* ---- Q範囲 : たぶん底の変換公式でいいだろ ---- */
        if (x instanceof Qi) {
            const numerator = zmath.log(x);
            const denominator = zmath.log(Zahlen(2));
            return zmath.div(numerator, denominator);
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** ======== 冪乗・冪根 ======== **/
    /** @type {(x: Qi|Q|Z, y: Qi|Q|Z) => Qi|Q|Z} - xのy乗を返す */
    pow: (x, y) => {
        /* ---- 1. y = 0 なら固定で 1 を返す ---- */
        if (
            zmath.eq(y, new Z(0n))
        ) {
            return Zahlen(1);
        }
        /* ---- 2. x = 0 なら固定で 0 を返す ---- */
        if (
            zmath.eq(x, new Z(0n))
        ) {
            return Zahlen(0);
        }
        /* ---- 3. x∈ℤ かつ y∈ℤ⁺ なら BigInt同士の直接演算にまかせてOK ---- */
        if (
            x instanceof Z
            && y instanceof Z
            && zmath.gt(y, new Z(0n))
        ) {
            return Zahlen(BigInt(x.Rn) ** BigInt(y.Rn));
        }
        /* ---- 4. x∈ℤ かつ y∈ℤ⁻ なら 1 / (x ^ |y|) になる ---- */
        if (
            x instanceof Z
            && y instanceof Z
            && zmath.lt(y, new Z(0n))
        ) {
            return zmath.div(new Z(1n), zmath.pow(x, zmath.abs(y)));
        }
        /* ---- 5. x∈ℚ かつ y∈ℤ なら x.Rn ^ y / x.Rd ^ y になる ---- */
        if (
            x instanceof Q
            && y instanceof Z) {
            return Zahlen(new Q(BigInt(x.Rn) ** BigInt(y.Rn), BigInt(x.Rd) ** BigInt(y.Rn)));
        }
        /* ---- 6. x∈ℚ(i) かつ y∈ℤ⁺ なら しょうがないのでfor文で愚直にy回掛け算する ---- */
        if (
            x instanceof Qi
            && y instanceof Z
            && zmath.gt(y, new Z(0n))
        ) {
            let result = Zahlen(1);
            for (let i = 0n; Zahlen(i).gt(y); i += 1n) {
                result = zmath.mul(result, x);
            }
            return result;
        }
        /* ---- 7. x∈ℚ(i) かつ y∈ℤ⁻ なら 1 / (x ^ |y|) になる ---- */
        if (
            x instanceof Qi
            && y instanceof Z
            && zmath.lt(y, new Z(0n))
        ) {
            return zmath.div(new Qi(1n, 1n, 0n, 1n), zmath.pow(x, zmath.abs(y)));
        }
        /* ---- ↑以外でQi範囲なら牛刀割鶏だが複素数範囲の定義を使うほうが速い  ---- */
        if (x instanceof Qi && y instanceof Qi) {
            /* pv z^a = e^(a Log z) ※pvは"主値" */
            return zmath.exp(zmath.mul(y, zmath.log(x)));
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 平方根を返す */
    sqrt: x => {
        /* ---- 平方根は1/2乗なので、powを借りる ---- */
        try {
            return zmath.pow(x, new Q(1n, 2n));
        } catch (error) {
            throw new Error("[Zahlen.js] zmath Invalid Type Error");
        }
    },
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 立方根を返す */
    cbrt: x => {
        /* ---- 立方根は1/3乗なので、powを借りる ---- */
        try {
            return zmath.pow(x, new Q(1n, 3n));
        } catch (error) {
            throw new Error("[Zahlen.js] zmath Invalid Type Error");
        }
    },
    /** @type {(...values: (Qi|Q|Z)[]) => Qi|Q|Z} - 引数の平方和の平方根を返す */
    hypot: (...values) => {
        /* ---- Qi範囲 : 各要素の2乗(pow)→合計(reduce)→平方根(sqrt) ---- */
        if (values.every(v => v instanceof Qi)) {
            const squares = values.map(value => zmath.pow(value, new Z(2n)));
            const sum = squares.reduce((prev, current) => zmath.add(prev, current), new Z(0n));
            return zmath.sqrt(sum);
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** ======== 最大・最小 ======== **/
    /** @type {(...values: (Qi|Q|Z)[]) => Qi|Q|Z} - 引数のうち最大の値を返す */
    max: (...values) => {
        /* ---- Qi範囲 : ltで順番に比較して最大値を返す ---- */
        if (values.every(v => v instanceof Qi)) {
            return values.reduce((prev, current) => zmath.lt(prev, current) ? current : prev);
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(...values: (Qi|Q|Z)[]) => Qi|Q|Z} - 引数のうち最小の値を返す */
    min: (...values) => {
        /* ---- Qi範囲 : gtで順番に比較して最小値を返す ---- */
        if (values.every(v => v instanceof Qi)) {
            return values.reduce((prev, current) => zmath.gt(prev, current) ? current : prev);
        }
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /* ======== 複素数関連(Pythonのcomplex型をベースに) ======== */
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 弧度法(ラジアン) → 角度法(度)の変換 */
    degrees: (x) => {
        return zmath.mul(x, zmath.div(new Z(180n), zmath.PI));
    },
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 角度法(度) → 弧度法(ラジアン)の変換 */
    radians: (x) => {
        return zmath.mul(x, zmath.div(zmath.PI, new Z(180n)));
    },
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 複素数の偏角(の主値(-π<y≦π)) */
    arg: x => {
        /* ---- Qi範囲 : atan2をそのまま借りる ---- */
        if (x instanceof Qi) return zmath.atan2(x.imag, x.real);
        /* ---- Qi範囲外ならエラーを返す ---- */
        throw new Error("[Zahlen.js] zmath Invalid Type Error");
    },
    /** @type {(x: Qi|Q|Z) => Qi|Q|Z} - 複素数の偏角(の主値(-π<y≦π)) */
    phase: (...args) => zmath.arg(...args),
    /** @type {(x: Qi|Q|Z) => [(Qi|Q|Z), (Qi|Q|Z)]} -  極形式表現を`[絶対値, 偏角]`で返す。`[Zahlen.Math.abs(x), Zahlen.Math.phase(x)]`と等価 */
    polar: (x) => {
        return [zmath.abs(x), zmath.phase(x)];
    },
    /** @type {(abs: Qi|Q|Z, amp: Qi|Q|Z) => Qi|Q|Z} -  絶対値と偏角からなる複素数の極形式表現を複素数平面形式に変換してZahlen.Qiで返す。`abs * math.cos(amp) + abs * math.sin(amp) * i`と等価 */
    orthogonal: (abs, amp) => {
        return zmath.add(
            zmath.mul(abs, zmath.cos(amp)),
            zmath.mul(abs, zmath.mul(zmath.I, zmath.sin(amp)))
        );
    },
};

export { zmath, Zahlen, Q, Qi, Z };
