# AXT-AyaKoto/Zahlen.js

## Function: `Zahlen()`

```js
/** @type {(x: number|bigint|Qi|Q|Z) => Qi|Q|Z} */
```

各種数値表現を受け取り、それをZahlen.jsにおける数値表現に変換します。

- Parameters:
    - `x`: `number|bigint|Qi|Q|Z` - 変換する数値表現
- Returns:
    - `Qi|Q|Z` - 変換後の数値表現

> **Notes:**
> - `x`が`bigint`の場合は、そのまま`Z`が返ってきます
> - `x`が`number`の場合は、浮動小数点数が表現している値をそのまま変換して`Q`を返します
> - `x`が`Qi|Q|Z`の場合、必要に応じてより上位のクラスに変換されて返ります

## Class: `Qi`

**`Qi(Rn, Rd, In, Id)`**

Qiオブジェクトは「ガウス有理数」、すなわち実部と虚部がそれぞれ有理数である複素数を表します。
`Rn`が実部の分子、`Rd`が実部の分母、`In`が虚部の分子、`Id`が虚部の分母です。

### Constructor

**`new Qi(Rn, Rd, In, Id)`**

- Parameters:
    - `Rn`: `bigint` - 実部の分子(任意の整数)
    - `Rd`: `bigint` - 実部の分母(任意の整数(0は除く))
    - `In`: `{bigint}` - 虚部の分子(任意の整数)
    - `Id`: `{bigint}` - 虚部の分母(任意の整数(0は除く))

> **Notes:**
> - 内部的には、`Rn/Rd`と`In/Id`はそれぞれ既約分数になるように変換されます。
> - 内部的には、実部と虚部それぞれの符号は分子(`Rn`, `In`)が保持するように変換されます。

### Members

#### `Qi.Rn`

```js
/** @type {bigint} */
```

実部の分子です。

#### `Qi.Rd`

```js
/** @type {bigint} */
```

実部の分母です。

#### `Qi.In`

```js
/** @type {bigint} */
```

虚部の分子です。

#### `Qi.Id`

```js
/** @type {bigint} */
```

虚部の分母です。

### Getters

#### `Qi.real`

```js
/** @type {Q} */
```

実部を表す`Q`オブジェクトです。

#### `Qi.imag`

```js
/** @type {Q} */
```

虚部を表す`Q`オブジェクトです。

### Methods

#### `Qi.valueOf()`

```js
/** @type {() => number} */
```

このガウス有理数を浮動小数点数`number`に変換した値を返します。

#### `Qi.toString()`

```js
/** @type {() => string} */
```

このガウス有理数を文字列に変換します。

#### `Qi.conjugate()`

```js
/** @type {() => Qi} */
```

このガウス有理数の共役を返します。

#### `Qi.add(y)`

```js
/** @type {(y: Qi) => Qi} */
```

このガウス有理数に`y`を加算した結果を返します。

- Parameters:
    - `y`: `Qi` - 加算するガウス有理数
- Returns:
    - `Qi` - 加算結果

#### `Qi.sub(y)`

```js
/** @type {(y: Qi) => Qi} */
```

このガウス有理数から`y`を減算した結果を返します。

- Parameters:
    - `y`: `Qi` - 減算するガウス有理数
- Returns:
    - `Qi` - 減算結果

#### `Qi.mul(y)`

```js
/** @type {(y: Qi) => Qi} */
```

このガウス有理数に`y`を乗算した結果を返します。

- Parameters:
    - `y`: `Qi` - 乗算するガウス有理数
- Returns:
    - `Qi` - 乗算結果

#### `Qi.div(y)`

```js
/** @type {(y: Qi) => Qi} */
```

このガウス有理数を`y`で除算した結果を返します。

- Parameters:
    - `y`: `Qi` - 除算するガウス有理数
- Returns:
    - `Qi` - 除算結果

#### `Qi.mod(y)`

```js
/** @type {(y: Qi) => Qi} */
```

このガウス有理数を`y`で剰余した結果を返します。

- Parameters:
    - `y`: `Qi` - 剰余するガウス有理数
- Returns:
    - `Qi` - 剰余結果

#### `Qi.pow(n)`

```js
/** @type {(n: number|bigint) => Qi} */
```

このガウス有理数を`n`乗した結果を返します。

- Parameters:
    - `n`: `number|bigint` - 乗数

#### `Qi.eq(y)`

```js
/** @type {(y: Qi) => boolean} */
```

このガウス有理数が`y`と等しいかどうかを返します。

- Parameters:
    - `y`: `Qi` - 比較するガウス有理数
- Returns:
    - `boolean` - 等しい場合は`true`、それ以外は`false`

#### `Qi.ne(y)`

```js
/** @type {(y: Qi) => boolean} */
```

このガウス有理数が`y`と等しくないかどうかを返します。

- Parameters:
    - `y`: `Qi` - 比較するガウス有理数
- Returns:
    - `boolean` - 等しくない場合は`true`、それ以外は`false`

#### `Qi.lt(y)`

```js
/** @type {(y: Qi) => boolean} */
```

このガウス有理数が`y`より小さいかどうかを返します。

- Parameters:
    - `y`: `Qi` - 比較するガウス有理数
- Returns:
    - `boolean` - 小さい場合は`true`、それ以外は`false`

#### `Qi.le(y)`

```js
/** @type {(y: Qi) => boolean} */
```

このガウス有理数が`y`以下かどうかを返します。

- Parameters:
    - `y`: `Qi` - 比較するガウス有理数
- Returns:
    - `boolean` - 以下の場合は`true`、それ以外は`false`

#### `Qi.gt(y)`

```js
/** @type {(y: Qi) => boolean} */
```

このガウス有理数が`y`より大きいかどうかを返します。

- Parameters:
    - `y`: `Qi` - 比較するガウス有理数
- Returns:
    - `boolean` - 大きい場合は`true`、それ以外は`false`

#### `Qi.ge(y)`

```js
/** @type {(y: Qi) => boolean} */
```

このガウス有理数が`y`以上かどうかを返します。

- Parameters:
    - `y`: `Qi` - 比較するガウス有理数
- Returns:
    - `boolean` - 以上の場合は`true`、それ以外は`false`

## Class: `Q`

**`Q(n, d)`**

Qオブジェクトは「有理数」を表します。
`n`が分子、`d`が分母です。

> **Notes:**
> - `Q`クラスは、`Qi`クラスを継承しています。

### Constructor

**`new Q(n, d)`**

- Parameters:
    - `n`: `bigint` - 分子
    - `d`: `bigint` - 分母

> **Notes:**
> - 内部的には、`n/d`は既約分数になるように変換されます。
> - 内部的には、符号は分子(`n`)が保持するように変換されます。

## Class: `Z`

**`Z(n)`**

Zオブジェクトは「整数」を表します。

> **Notes:**
> - `Z`クラスは、`Q`クラスを継承しています。

### Constructor

**`new Z(n)`**

- Parameters:
    - `n`: `bigint` - 整数

## Class: `zmath`

zmathオブジェクトは、各種数学関数を提供します。

### Members

#### `zmath.PI`

```js
/** @type {Q} */
```

円周率の近似値です。

#### `zmath.E`

```js
/** @type {Q} */
```

ネイピア数の近似値です。

#### `zmath.LN2`

```js
/** @type {Q} */
```

2の自然対数の近似値です。

#### `zmath.LN10`

```js
/** @type {Q} */
```

10の自然対数の近似値です。

#### `zmath.LOG2E`

```js
/** @type {Q} */
```

自然対数の底と2の底の対数の近似値です。

#### `zmath.LOG10E`

```js
/** @type {Q} */
```

自然対数の底と10の底の対数の近似値です。

#### `zmath.SQRT2`

```js
/** @type {Q} */
```

2の平方根の近似値です。

#### `zmath.SQRT1_2`

```js
/** @type {Q} */
```

1/2の平方根の近似値です。

#### `zmath.I`

```js
/** @type {Qi} */
```

虚数単位iです。

### Methods > Rounding

#### *(static)* `zmath.ceil(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の切り上げを返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 切り上げる数値
- Returns:
    - `Qi|Q|Z` - 切り上げ結果

> **Notes:**
> - `x`が`Qi`の場合、実部と虚部それぞれに切り上げを適用します

#### *(static)* `zmath.floor(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の切り捨てを返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 切り捨てる数値
- Returns:
    - `Qi|Q|Z` - 切り捨て結果

> **Notes:**
> - `x`が`Qi`の場合、実部と虚部それぞれに切り捨てを適用します

#### *(static)* `zmath.round(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の四捨五入を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 四捨五入する数値
- Returns:
    - `Qi|Q|Z` - 四捨五入結果

> **Notes:**
> - `x`が`Qi`の場合、実部と虚部それぞれに四捨五入を適用します

#### *(static)* `zmath.trunc(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の整数部分を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 整数部分を求める数値
- Returns:
    - `Qi|Q|Z` - 整数部分

> **Notes:**
> - `x`が`Qi`の場合、実部と虚部それぞれに整数部分を適用します

### Methods > Representation

#### *(static)* `zmath.abs(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の絶対値を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 絶対値を求める数値
- Returns:
    - `Qi|Q|Z` - 絶対値

> **Notes:**
> - `x`が`Qi`の場合は三平方の定理を用いて絶対値を求めます
>     - これは`zmath.hypot(x.real, x.imag)`と等価です

#### *(static)* `zmath.sign(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の符号を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 符号を求める数値
- Returns:
    - `Qi|Q|Z` - 符号

> **Notes:**
> - `x`が`Qi`の場合は、実部と虚部それぞれの符号を返します

### Methods > Basic Arithmetic

#### *(static)* `zmath.add(x, y)`

```js
/** @type {(x: Qi|Q|Z, y: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`と`y`の加算結果を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 加算する数値
    - `y`: `Qi|Q|Z` - 加算する数値
- Returns:
    - `Qi|Q|Z` - 加算結果

#### *(static)* `zmath.sub(x, y)`

```js
/** @type {(x: Qi|Q|Z, y: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`から`y`を減算した結果を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 減算する数値
    - `y`: `Qi|Q|Z` - 減算する数値
- Returns:
    - `Qi|Q|Z` - 減算結果

#### *(static)* `zmath.mul(x, y)`

```js
/** @type {(x: Qi|Q|Z, y: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`と`y`の乗算結果を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 乗算する数値
    - `y`: `Qi|Q|Z` - 乗算する数値
- Returns:
    - `Qi|Q|Z` - 乗算結果

#### *(static)* `zmath.div(x, y)`

```js
/** @type {(x: Qi|Q|Z, y: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`を`y`で除算した結果を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 除算する数値
    - `y`: `Qi|Q|Z` - 除数
- Returns:
    - `Qi|Q|Z` - 除算結果

#### *(static)* `zmath.mod(x, y)`

```js
/** @type {(x: Qi|Q|Z, y: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`を`y`で割った余り(剰余)を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 剰余する数値
    - `y`: `Qi|Q|Z` - 除数
- Returns:
    - `Qi|Q|Z` - 剰余結果

### Methods > Comparison

#### *(static)* `zmath.eq(x, y)`

```js
/** @type {(x: Qi|Q|Z, y: Qi|Q|Z) => boolean} */
```

数値`x`と`y`が等しいかどうかを返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 比較する数値
    - `y`: `Qi|Q|Z` - 比較する数値
- Returns:
    - `boolean` - 等しい場合は`true`、それ以外は`false`

#### *(static)* `zmath.ne(x, y)`

```js
/** @type {(x: Qi|Q|Z, y: Qi|Q|Z) => boolean} */
```

数値`x`と`y`が等しくないかどうかを返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 比較する数値
    - `y`: `Qi|Q|Z` - 比較する数値
- Returns:
    - `boolean` - 等しくない場合は`true`、それ以外は`false`

#### *(static)* `zmath.lt(x, y)`

```js
/** @type {(x: Qi|Q|Z, y: Qi|Q|Z) => boolean} */
```

数値`x`が`y`より小さいかどうかを返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 比較する数値
    - `y`: `Qi|Q|Z` - 比較する数値
- Returns:
    - `boolean` - 小さい場合は`true`、それ以外は`false`

> **Notes:**
> - `x`, `y`のいずれかが`Qi`の場合は、絶対値と符号で比較します。

#### *(static)* `zmath.le(x, y)`

```js
/** @type {(x: Qi|Q|Z, y: Qi|Q|Z) => boolean} */
```

数値`x`が`y`以下かどうかを返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 比較する数値
    - `y`: `Qi|Q|Z` - 比較する数値
- Returns:
    - `boolean` - 以下の場合は`true`、それ以外は`false`

> **Notes:**
> - `x`, `y`のいずれかが`Qi`の場合は、絶対値と符号で比較します。

#### *(static)* `zmath.gt(x, y)`

```js
/** @type {(x: Qi|Q|Z, y: Qi|Q|Z) => boolean} */
```

数値`x`が`y`より大きいかどうかを返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 比較する数値
    - `y`: `Qi|Q|Z` - 比較する数値
- Returns:
    - `boolean` - 大きい場合は`true`、それ以外は`false`

> **Notes:**
> - `x`, `y`のいずれかが`Qi`の場合は、絶対値と符号で比較します。

#### *(static)* `zmath.ge(x, y)`

```js
/** @type {(x: Qi|Q|Z, y: Qi|Q|Z) => boolean} */
```

数値`x`が`y`以上かどうかを返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 比較する数値
    - `y`: `Qi|Q|Z` - 比較する数値
- Returns:
    - `boolean` - 以上の場合は`true`、それ以外は`false`

> **Notes:**
> - `x`, `y`のいずれかが`Qi`の場合は、絶対値と符号で比較します。

### Methods > Trigonometric

#### *(static)* `zmath.sin(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の正弦を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 正弦を求める数値
- Returns:
    - `Qi|Q|Z` - 正弦

> **Notes:**
> - 返り値はラジアン(弧度法)です。°単位(角度法)に変換したい場合は`zmath.degrees()`を使用してください。

#### *(static)* `zmath.cos(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の余弦を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 余弦を求める数値
- Returns:
    - `Qi|Q|Z` - 余弦

> **Notes:**
> - 返り値はラジアン(弧度法)です。°単位(角度法)に変換したい場合は`zmath.degrees()`を使用してください。

#### *(static)* `zmath.tan(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の正接を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 正接を求める数値
- Returns:
    - `Qi|Q|Z` - 正接

> **Notes:**
> - 返り値はラジアン(弧度法)です。°単位(角度法)に変換したい場合は`zmath.degrees()`を使用してください。

#### *(static)* `zmath.asin(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の逆正弦を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 逆正弦を求める数値
- Returns:
    - `Qi|Q|Z` - 逆正弦

> **Notes:**
> - 返り値はラジアン(弧度法)です。°単位(角度法)に変換したい場合は`zmath.degrees()`を使用してください。

#### *(static)* `zmath.acos(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の逆余弦を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 逆余弦を求める数値
- Returns:
    - `Qi|Q|Z` - 逆余弦

> **Notes:**
> - 返り値はラジアン(弧度法)です。°単位(角度法)に変換したい場合は`zmath.degrees()`を使用してください。

#### *(static)* `zmath.atan(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の逆正接を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 逆正接を求める数値
- Returns:
    - `Qi|Q|Z` - 逆正接

> **Notes:**
> - 返り値はラジアン(弧度法)です。°単位(角度法)に変換したい場合は`zmath.degrees()`を使用してください。

#### *(static)* `zmath.atan2(y, x)`

```js
/** @type {(y: Q|Z, x: Q|Z) => Qi|Q|Z} */
```

[atan2](https://ja.wikipedia.org/wiki/Atan2)を返します。
返り値は(0,0)と(x,y)を結ぶ半直線と正のx軸のが成す角の角度を表します。

- Parameters:
    - `y`: `Q|Z` - 逆正接を求める数値
    - `x`: `Q|Z` - 逆正接を求める数値
- Returns:
    - `Q|Z` - 逆正接

> **Notes:**
> - 返り値はラジアン(弧度法)です。°単位(角度法)に変換したい場合は`zmath.degrees()`を使用してください。
> - 返り値$\phi$の範囲は$\pi\lt\phi\le\pi$です。
> - `x`, `y`のいずれかが`Qi`の場合は`TypeError`となります。
>     - メッセージ : `[Zahlen.js] zmath.atan2() can only accept Q( or Z) as arguments`

### Methods > Hyperbolic

#### *(static)* `zmath.sinh(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の双曲線正弦を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 双曲線正弦を求める数値
- Returns:
    - `Qi|Q|Z` - 双曲線正弦

#### *(static)* `zmath.cosh(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の双曲線余弦を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 双曲線余弦を求める数値
- Returns:
    - `Qi|Q|Z` - 双曲線余弦

#### *(static)* `zmath.tanh(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の双曲線正接を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 双曲線正接を求める数値
- Returns:
    - `Qi|Q|Z` - 双曲線正接

#### *(static)* `zmath.asinh(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の逆双曲線正弦を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 逆双曲線正弦を求める数値
- Returns:
    - `Qi|Q|Z` - 逆双曲線正弦

#### *(static)* `zmath.acosh(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の逆双曲線余弦を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 逆双曲線余弦を求める数値
- Returns:
    - `Qi|Q|Z` - 逆双曲線余弦


#### *(static)* `zmath.atanh(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の逆双曲線正接を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 逆双曲線正接を求める数値
- Returns:
    - `Qi|Q|Z` - 逆双曲線正接

### Methods > Exponential & Logarithmic

#### *(static)* `zmath.exp(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の指数関数`e^x`を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 求める数値
- Returns:
    - `Qi|Q|Z` - $e^x$

> **Notes:**
> - `x`が`Qi`の場合、複素指数関数を計算します。

#### *(static)* `zmath.expm1(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の`exp(x) - 1`を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 計算する数値
- Returns:
    - `Qi|Q|Z` - $e^x - 1$

> **Notes:**
> - `zmath.sub(zmath.exp(x), Zahlen_new(1))`と等価です。

#### *(static)* `zmath.log(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の自然対数($\log_e{x}$, $\ln x$)を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 自然対数を求める数値
- Returns:
    - `Qi|Q|Z` - 自然対数

> **Notes:**
> - `x`が`Qi`の場合には主値を返します。
>     - $\textrm{Log} z = \log_e|z| + i (\textrm{Arg} z)$(ただし$\textrm{Arg} z$は$-\pi\lt\arg{z}\le\pi$に限定した$\arg$)

#### *(static)* `zmath.log1p(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の`log(1 + x)`を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 計算する数値
- Returns:
    - `Qi|Q|Z` - `log(1 + x)`の結果

> **Notes:**
> - `x`が`Qi`の場合、`zmath.add(zmath.log(z), Zahlen_new(1))`と等価です。

#### *(static)* `zmath.log10(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の10を底とする対数を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 10を底とする対数を求める数値
- Returns:
    - `Qi|Q|Z` - 10を底とする対数

#### *(static)* `zmath.log2(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の2を底とする対数を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 2を底とする対数を求める数値
- Returns:
    - `Qi|Q|Z` - 2を底とする対数

### Methods > Power & Root

#### *(static)* `zmath.pow(x, y)`

```js
/** @type {(x: Qi|Q|Z, y: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の`y`乗を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 底
    - `y`: `Qi|Q|Z` - 指数
- Returns:
    - `Qi|Q|Z` - `x`の`y`乗

> **Notes:**
> - `x`, `y`のいずれかが`Qi`の場合は主値を返します。
>     - $\textrm{pv } z^a = e^{a \textrm{Log} z}$

#### *(static)* `zmath.sqrt(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の平方根を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 平方根を求める数値
- Returns:
    - `Qi|Q|Z` - 平方根

> **Notes:**
> - `zmath.pow(x, new Q(1n, 2n))`と等価です。

#### *(static)* `zmath.cbrt(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

数値`x`の立方根を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 立方根を求める数値
- Returns:
    - `Qi|Q|Z` - 立方根

> **Notes:**
> - `zmath.pow(x, new Q(1n, 3n))`と等価です。

#### *(static)* `zmath.hypot(...values)`

```js
/** @type {(...values: (Qi|Q|Z)[]) => Qi|Q|Z} */
```

引数の平方和の平方根を返します。

- Parameters:
    - `...values`: `(Qi|Q|Z)[]` - 平方和の平方根を求める数値
- Returns:
    - `Qi|Q|Z` - 平方和の平方根

> **Notes:**
> - `zmath.sqrt(values.reduce((acc, val) => zmath.add(acc, zmath.pow(val, new Z(2n))), new Z(0n)))`と等価です。

### Methods > Min & Max

#### *(static)* `zmath.min(...values)`

```js
/** @type {(...values: (Qi|Q|Z)[]) => Qi|Q|Z} */
```

引数の最小値を返します。

- Parameters:
    - `...values`: `(Qi|Q|Z)[]` - 最小値を求める数値
- Returns:
    - `Qi|Q|Z` - 最小値

> **Notes:**
> - `x`が`Qi`の場合は、絶対値と符号で比較します。

#### *(static)* `zmath.max(...values)`

```js
/** @type {(...values: (Qi|Q|Z)[]) => Qi|Q|Z} */
```

引数の最大値を返します。

- Parameters:
    - `...values`: `(Qi|Q|Z)[]` - 最大値を求める数値
- Returns:
    - `Qi|Q|Z` - 最大値

> **Notes:**
> - `x`が`Qi`の場合は、絶対値と符号で比較します。

### Methods > Complex

#### *(static)* `zmath.degrees(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

弧度法(ラジアン)で表された数値`x`を角度法(度)に変換して返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 変換する数値
- Returns:
    - `Qi|Q|Z` - 角度法(度)での数値

> **Notes:**
> - `zmath.mul(x, zmath.div(new Z(180n), zmath.PI))`と等価です。

#### *(static)* `zmath.radians(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

角度法(度)で表された数値`x`を弧度法(ラジアン)に変換して返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 変換する数値
- Returns:
    - `Qi|Q|Z` - 弧度法(ラジアン)での数値

> **Notes:**
> - `zmath.mul(x, zmath.div(zmath.PI, new Z(180n)))`と等価です。

#### *(static)* `zmath.arg(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

複素数`x`の偏角(位相)を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 偏角を求める複素数
- Returns:
    - `Qi|Q|Z` - 偏角(ラジアン)

> **Notes:**
> - 返り値$\phi$の範囲は$\pi\lt\phi\le\pi$です。
> - `zmath.atan2(x.imag, x.real)`と等価です。

#### *(static)* `zmath.phase(x)`

```js
/** @type {(x: Qi|Q|Z) => Qi|Q|Z} */
```

複素数`x`の偏角(位相)を返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 偏角を求める複素数
- Returns:
    - `Qi|Q|Z` - 偏角(ラジアン)

> **Notes:**
> - `zmath.arg`のエイリアスです。

#### *(static)* `zmath.polar(x)`

```js
/** @type {(x: Qi|Q|Z) => [Qi|Q|Z, Qi|Q|Z]} */
```

複素数`x`を極形式で表現し、絶対値と偏角のペアを返します。

- Parameters:
    - `x`: `Qi|Q|Z` - 極形式に変換する複素数
- Returns:
    - `[Qi|Q|Z, Qi|Q|Z]` - `[絶対値, 偏角]`のペア

> **Notes:**
> - `[Zahlen.Math.abs(x), Zahlen.Math.phase(x)]`と等価です。

#### *(static)* `zmath.orthogonal(abs, amp)`

```js
/** @type {(abs: Qi|Q|Z, amp: Qi|Q|Z) => Qi|Q|Z} */
```

絶対値`abs`と偏角`amp`からなる複素数の極形式表現を、複素数平面形式に変換して返します。

- Parameters:
    - `abs`: `Qi|Q|Z` - 絶対値
    - `amp`: `Qi|Q|Z` - 偏角
- Returns:
    - `Qi|Q|Z` - 複素数平面形式の複素数

> **Notes:**
> - `zmath.add( zmath.mul(abs, zmath.cos(amp)), zmath.mul(abs, zmath.mul(new Qi(0n, 1n, 1n, 1n), zmath.sin(amp))) )`と等価です。
