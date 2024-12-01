# AXT-AyaKoto/Zahlen.js

## Global

### Members

#### (const) `globalThis.Zahlen`

```js
/** @type {{new: Function, Qi: Zahlen_Qi, Q: Zahlen_Q, Z: Zahlen_Z, Math: Zahlen_Math} */
```

Zahlen.jsの各機能にアクセスするためのオブジェクトです。

### Methods

#### (const) `globalThis.Zahlen.new`

```js
/** @type {(x: number|bigint|Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

各種数値表現を受け取り、それをZahlen.jsにおける数値表現に変換します。

- Parameters:
    - `x`: `number|bigint|Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 変換する数値表現
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 変換後の数値表現

> **Notes:**
> - `x`が`bigint`の場合は、そのまま`Zahlen_Z`が返ってきます
> - `x`が`number`の場合は、浮動小数点数が表現している値をそのまま変換して`Zahlen_Q`を返します
> - `x`が`Zahlen_Qi|Zahlen_Q|Zahlen_Z`の場合、必要に応じてより上位のクラスに変換されて返ります

## Class: `Zahlen_Qi`

**`Zahlen_Qi(Rn, Rd, In, Id)`**

Zahlen_Qiオブジェクトは「ガウス有理数」、すなわち実部と虚部がそれぞれ有理数である複素数を表します。
`Rn`が実部の分子、`Rd`が実部の分母、`In`が虚部の分子、`Id`が虚部の分母です。

実際に使用する場合は、`globalThis.Zahlen.Qi`からアクセスします。

### Constructor

**`new Zahlen_Qi(Rn, Rd, In, Id)`**

- Parameters:
    - `Rn`: `bigint` - 実部の分子(任意の整数)
    - `Rd`: `bigint` - 実部の分母(任意の整数(0は除く))
    - `In`: `{bigint}` - 虚部の分子(任意の整数)
    - `Id`: `{bigint}` - 虚部の分母(任意の整数(0は除く))

> **Notes:**
> - 内部的には、`Rn/Rd`と`In/Id`はそれぞれ既約分数になるように変換されます。
> - 内部的には、実部と虚部それぞれの符号は分子(`Rn`, `In`)が保持するように変換されます。

### Members

#### `Zahlen_Qi.Rn`

```js
/** @type {bigint} */
```

実部の分子です。

#### `Zahlen_Qi.Rd`

```js
/** @type {bigint} */
```

実部の分母です。

#### `Zahlen_Qi.In`

```js
/** @type {bigint} */
```

虚部の分子です。

#### `Zahlen_Qi.Id`

```js
/** @type {bigint} */
```

虚部の分母です。

### Getters

#### `Zahlen_Qi.real`

```js
/** @type {Zahlen_Q} */
```

実部を表す`Zahlen_Q`オブジェクトです。

#### `Zahlen_Qi.imag`

```js
/** @type {Zahlen_Q} */
```

虚部を表す`Zahlen_Q`オブジェクトです。

### Methods

#### `Zahlen_Qi.valueOf()`

```js
/** @type {() => number} */
```

このガウス有理数を浮動小数点数`number`に変換した値を返します。

#### `Zahlen_Qi.toString()`

```js
/** @type {() => string} */
```

このガウス有理数を文字列に変換します。

#### `Zahlen_Qi.conjugate()`

```js
/** @type {() => Zahlen_Qi} */
```

このガウス有理数の共役を返します。

#### `Zahlen_Qi.add(y)`

```js
/** @type {(y: Zahlen_Qi) => Zahlen_Qi} */
```

このガウス有理数に`y`を加算した結果を返します。

- Parameters:
    - `y`: `Zahlen_Qi` - 加算するガウス有理数
- Returns:
    - `Zahlen_Qi` - 加算結果

#### `Zahlen_Qi.sub(y)`

```js
/** @type {(y: Zahlen_Qi) => Zahlen_Qi} */
```

このガウス有理数から`y`を減算した結果を返します。

- Parameters:
    - `y`: `Zahlen_Qi` - 減算するガウス有理数
- Returns:
    - `Zahlen_Qi` - 減算結果

#### `Zahlen_Qi.mul(y)`

```js
/** @type {(y: Zahlen_Qi) => Zahlen_Qi} */
```

このガウス有理数に`y`を乗算した結果を返します。

- Parameters:
    - `y`: `Zahlen_Qi` - 乗算するガウス有理数
- Returns:
    - `Zahlen_Qi` - 乗算結果

#### `Zahlen_Qi.div(y)`

```js
/** @type {(y: Zahlen_Qi) => Zahlen_Qi} */
```

このガウス有理数を`y`で除算した結果を返します。

- Parameters:
    - `y`: `Zahlen_Qi` - 除算するガウス有理数
- Returns:
    - `Zahlen_Qi` - 除算結果

#### `Zahlen_Qi.mod(y)`

```js
/** @type {(y: Zahlen_Qi) => Zahlen_Qi} */
```

このガウス有理数を`y`で剰余した結果を返します。

- Parameters:
    - `y`: `Zahlen_Qi` - 剰余するガウス有理数
- Returns:
    - `Zahlen_Qi` - 剰余結果

#### `Zahlen_Qi.eq(y)`

```js
/** @type {(y: Zahlen_Qi) => boolean} */
```

このガウス有理数が`y`と等しいかどうかを返します。

- Parameters:
    - `y`: `Zahlen_Qi` - 比較するガウス有理数
- Returns:
    - `boolean` - 等しい場合は`true`、それ以外は`false`

#### `Zahlen_Qi.ne(y)`

```js
/** @type {(y: Zahlen_Qi) => boolean} */
```

このガウス有理数が`y`と等しくないかどうかを返します。

- Parameters:
    - `y`: `Zahlen_Qi` - 比較するガウス有理数
- Returns:
    - `boolean` - 等しくない場合は`true`、それ以外は`false`

#### `Zahlen_Qi.lt(y)`

```js
/** @type {(y: Zahlen_Qi) => boolean} */
```

このガウス有理数が`y`より小さいかどうかを返します。

- Parameters:
    - `y`: `Zahlen_Qi` - 比較するガウス有理数
- Returns:
    - `boolean` - 小さい場合は`true`、それ以外は`false`

#### `Zahlen_Qi.le(y)`

```js
/** @type {(y: Zahlen_Qi) => boolean} */
```

このガウス有理数が`y`以下かどうかを返します。

- Parameters:
    - `y`: `Zahlen_Qi` - 比較するガウス有理数
- Returns:
    - `boolean` - 以下の場合は`true`、それ以外は`false`

#### `Zahlen_Qi.gt(y)`

```js
/** @type {(y: Zahlen_Qi) => boolean} */
```

このガウス有理数が`y`より大きいかどうかを返します。

- Parameters:
    - `y`: `Zahlen_Qi` - 比較するガウス有理数
- Returns:
    - `boolean` - 大きい場合は`true`、それ以外は`false`

#### `Zahlen_Qi.ge(y)`

```js
/** @type {(y: Zahlen_Qi) => boolean} */
```

このガウス有理数が`y`以上かどうかを返します。

- Parameters:
    - `y`: `Zahlen_Qi` - 比較するガウス有理数
- Returns:
    - `boolean` - 以上の場合は`true`、それ以外は`false`

## Class: `Zahlen_Q`

**`Zahlen_Q(n, d)`**

Zahlen_Qオブジェクトは「有理数」を表します。
`n`が分子、`d`が分母です。

実際に使用する場合は、`globalThis.Zahlen.Q`からアクセスします。

> **Notes:**
> - `Zahlen_Q`クラスは、`Zahlen_Qi`クラスを継承しています。

### Constructor

**`new Zahlen_Q(n, d)`**

- Parameters:
    - `n`: `bigint` - 分子
    - `d`: `bigint` - 分母

> **Notes:**
> - 内部的には、`n/d`は既約分数になるように変換されます。
> - 内部的には、符号は分子(`n`)が保持するように変換されます。

## Class: `Zahlen_Z`

**`Zahlen_Z(n)`**

Zahlen_Zオブジェクトは「整数」を表します。

実際に使用する場合は、`globalThis.Zahlen.Z`からアクセスします。

> **Notes:**
> - `Zahlen_Z`クラスは、`Zahlen_Q`クラスを継承しています。

### Constructor

**`new Zahlen_Z(n)`**

- Parameters:
    - `n`: `bigint` - 整数

## Class: `Zahlen_Math`

Zahlen_Mathオブジェクトは、各種数学関数を提供します。

実際に使用する場合は、`globalThis.Zahlen.Math`からアクセスします。

### Members

#### `Zahlen_Math.PI`

```js
/** @type {Zahlen_Q} */
```

円周率の近似値です。

#### `Zahlen_Math.E`

```js
/** @type {Zahlen_Q} */
```

ネイピア数の近似値です。

#### `Zahlen_Math.LN2`

```js
/** @type {Zahlen_Q} */
```

2の自然対数の近似値です。

#### `Zahlen_Math.LN10`

```js
/** @type {Zahlen_Q} */
```

10の自然対数の近似値です。

#### `Zahlen_Math.LOG2E`

```js
/** @type {Zahlen_Q} */
```

自然対数の底と2の底の対数の近似値です。

#### `Zahlen_Math.LOG10E`

```js
/** @type {Zahlen_Q} */
```

自然対数の底と10の底の対数の近似値です。

#### `Zahlen_Math.SQRT2`

```js
/** @type {Zahlen_Q} */
```

2の平方根の近似値です。

#### `Zahlen_Math.SQRT1_2`

```js
/** @type {Zahlen_Q} */
```

1/2の平方根の近似値です。

#### `Zahlen_Math.I`

```js
/** @type {Zahlen_Qi} */
```

虚数単位iです。

### Methods > Rounding

#### *(static)* `Zahlen_Math.ceil(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の切り上げを返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 切り上げる数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 切り上げ結果

> **Notes:**
> - `x`が`Zahlen_Qi`の場合、実部と虚部それぞれに切り上げを適用します

#### *(static)* `Zahlen_Math.floor(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の切り捨てを返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 切り捨てる数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 切り捨て結果

> **Notes:**
> - `x`が`Zahlen_Qi`の場合、実部と虚部それぞれに切り捨てを適用します

#### *(static)* `Zahlen_Math.round(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の四捨五入を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 四捨五入する数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 四捨五入結果

> **Notes:**
> - `x`が`Zahlen_Qi`の場合、実部と虚部それぞれに四捨五入を適用します

#### *(static)* `Zahlen_Math.trunc(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の整数部分を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 整数部分を求める数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 整数部分

> **Notes:**
> - `x`が`Zahlen_Qi`の場合、実部と虚部それぞれに整数部分を適用します

### Methods > Representation

#### *(static)* `Zahlen_Math.abs(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の絶対値を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 絶対値を求める数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 絶対値

> **Notes:**
> - `x`が`Zahlen_Qi`の場合は三平方の定理を用いて絶対値を求めます
>     - これは`Zahlen_Math.hypot(x.real, x.imag)`と等価です

#### *(static)* `Zahlen_Math.sign(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の符号を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 符号を求める数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 符号

> **Notes:**
> - `x`が`Zahlen_Qi`の場合は、実部と虚部それぞれの符号を返します

### Methods > Basic Arithmetic

#### *(static)* `Zahlen_Math.add(x, y)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z, y: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`と`y`の加算結果を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 加算する数値
    - `y`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 加算する数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 加算結果

#### *(static)* `Zahlen_Math.sub(x, y)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z, y: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`から`y`を減算した結果を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 減算する数値
    - `y`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 減算する数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 減算結果

#### *(static)* `Zahlen_Math.mul(x, y)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z, y: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`と`y`の乗算結果を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 乗算する数値
    - `y`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 乗算する数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 乗算結果

#### *(static)* `Zahlen_Math.div(x, y)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z, y: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`を`y`で除算した結果を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 除算する数値
    - `y`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 除数
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 除算結果

#### *(static)* `Zahlen_Math.mod(x, y)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z, y: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`を`y`で割った余り(剰余)を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 剰余する数値
    - `y`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 除数
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 剰余結果

### Methods > Comparison

#### *(static)* `Zahlen_Math.eq(x, y)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z, y: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => boolean} */
```

数値`x`と`y`が等しいかどうかを返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 比較する数値
    - `y`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 比較する数値
- Returns:
    - `boolean` - 等しい場合は`true`、それ以外は`false`

#### *(static)* `Zahlen_Math.ne(x, y)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z, y: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => boolean} */
```

数値`x`と`y`が等しくないかどうかを返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 比較する数値
    - `y`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 比較する数値
- Returns:
    - `boolean` - 等しくない場合は`true`、それ以外は`false`

#### *(static)* `Zahlen_Math.lt(x, y)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z, y: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => boolean} */
```

数値`x`が`y`より小さいかどうかを返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 比較する数値
    - `y`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 比較する数値
- Returns:
    - `boolean` - 小さい場合は`true`、それ以外は`false`

> **Notes:**
> - `x`, `y`のいずれかが`Zahlen_Qi`の場合は、絶対値と符号で比較します。

#### *(static)* `Zahlen_Math.le(x, y)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z, y: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => boolean} */
```

数値`x`が`y`以下かどうかを返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 比較する数値
    - `y`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 比較する数値
- Returns:
    - `boolean` - 以下の場合は`true`、それ以外は`false`

> **Notes:**
> - `x`, `y`のいずれかが`Zahlen_Qi`の場合は、絶対値と符号で比較します。

#### *(static)* `Zahlen_Math.gt(x, y)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z, y: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => boolean} */
```

数値`x`が`y`より大きいかどうかを返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 比較する数値
    - `y`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 比較する数値
- Returns:
    - `boolean` - 大きい場合は`true`、それ以外は`false`

> **Notes:**
> - `x`, `y`のいずれかが`Zahlen_Qi`の場合は、絶対値と符号で比較します。

#### *(static)* `Zahlen_Math.ge(x, y)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z, y: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => boolean} */
```

数値`x`が`y`以上かどうかを返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 比較する数値
    - `y`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 比較する数値
- Returns:
    - `boolean` - 以上の場合は`true`、それ以外は`false`

> **Notes:**
> - `x`, `y`のいずれかが`Zahlen_Qi`の場合は、絶対値と符号で比較します。

### Methods > Trigonometric

#### *(static)* `Zahlen_Math.sin(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の正弦を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 正弦を求める数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 正弦

> **Notes:**
> - 返り値はラジアン(弧度法)です。°単位(角度法)に変換したい場合は`Zahlen_Math.degrees()`を使用してください。

#### *(static)* `Zahlen_Math.cos(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の余弦を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 余弦を求める数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 余弦

> **Notes:**
> - 返り値はラジアン(弧度法)です。°単位(角度法)に変換したい場合は`Zahlen_Math.degrees()`を使用してください。

#### *(static)* `Zahlen_Math.tan(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の正接を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 正接を求める数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 正接

> **Notes:**
> - 返り値はラジアン(弧度法)です。°単位(角度法)に変換したい場合は`Zahlen_Math.degrees()`を使用してください。

#### *(static)* `Zahlen_Math.asin(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の逆正弦を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 逆正弦を求める数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 逆正弦

> **Notes:**
> - 返り値はラジアン(弧度法)です。°単位(角度法)に変換したい場合は`Zahlen_Math.degrees()`を使用してください。

#### *(static)* `Zahlen_Math.acos(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の逆余弦を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 逆余弦を求める数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 逆余弦

> **Notes:**
> - 返り値はラジアン(弧度法)です。°単位(角度法)に変換したい場合は`Zahlen_Math.degrees()`を使用してください。

#### *(static)* `Zahlen_Math.atan(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の逆正接を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 逆正接を求める数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 逆正接

> **Notes:**
> - 返り値はラジアン(弧度法)です。°単位(角度法)に変換したい場合は`Zahlen_Math.degrees()`を使用してください。

#### *(static)* `Zahlen_Math.atan2(y, x)`

```js
/** @type {(y: Zahlen_Q|Zahlen_Z, x: Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

[atan2](https://ja.wikipedia.org/wiki/Atan2)を返します。
返り値は(0,0)と(x,y)を結ぶ半直線と正のx軸のが成す角の角度を表します。

- Parameters:
    - `y`: `Zahlen_Q|Zahlen_Z` - 逆正接を求める数値
    - `x`: `Zahlen_Q|Zahlen_Z` - 逆正接を求める数値
- Returns:
    - `Zahlen_Q|Zahlen_Z` - 逆正接

> **Notes:**
> - 返り値はラジアン(弧度法)です。°単位(角度法)に変換したい場合は`Zahlen_Math.degrees()`を使用してください。
> - 返り値$\phi$の範囲は$\pi\lt\phi\le\pi$です。
> - `x`, `y`のいずれかが`Zahlen_Qi`の場合は`TypeError`となります。
>     - メッセージ : `[Zahlen.js] Zahlen_Math.atan2() can only accept Zahlen_Q( or Zahlen_Z) as arguments`

### Methods > Hyperbolic

#### *(static)* `Zahlen_Math.sinh(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の双曲線正弦を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 双曲線正弦を求める数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 双曲線正弦

#### *(static)* `Zahlen_Math.cosh(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の双曲線余弦を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 双曲線余弦を求める数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 双曲線余弦

#### *(static)* `Zahlen_Math.tanh(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の双曲線正接を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 双曲線正接を求める数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 双曲線正接

#### *(static)* `Zahlen_Math.asinh(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の逆双曲線正弦を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 逆双曲線正弦を求める数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 逆双曲線正弦

> **Notes:**
> - `x`が`Zahlen_Qi`の場合については未実装です。

#### *(static)* `Zahlen_Math.acosh(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の逆双曲線余弦を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 逆双曲線余弦を求める数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 逆双曲線余弦

> **Notes:**
> - `x`が`Zahlen_Qi`の場合については未実装です。

#### *(static)* `Zahlen_Math.atanh(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の逆双曲線正接を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 逆双曲線正接を求める数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 逆双曲線正接

> **Notes:**
> - `x`が`Zahlen_Qi`の場合については未実装です。

### Methods > Exponential & Logarithmic

#### *(static)* `Zahlen_Math.exp(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の指数関数`e^x`を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 求める数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - $e^x$

> **Notes:**
> - `x`が`Zahlen_Qi`の場合、複素指数関数を計算します。

#### *(static)* `Zahlen_Math.expm1(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の`exp(x) - 1`を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 計算する数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - $e^x - 1$

> **Notes:**
> - `Zahlen_Math.sub(Zahlen_Math.exp(x), Zahlen_new(1))`と等価です。

#### *(static)* `Zahlen_Math.log(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の自然対数($\log_e{x}$, $\ln x$)を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 自然対数を求める数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 自然対数

> **Notes:**
> - `x`が`Zahlen_Qi`の場合には主値を返します。
>     - $\textrm{Log} z = \log_e|z| + i (\textrm{Arg} z)$(ただし$\textrm{Arg} z$は$-\pi\lt\arg{z}\le\pi$に限定した$\arg$)

#### *(static)* `Zahlen_Math.log1p(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の`log(1 + x)`を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 計算する数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - `log(1 + x)`の結果

> **Notes:**
> - `x`が`Zahlen_Qi`の場合、`Zahlen_Math.add(Zahlen_Math.log(z), Zahlen_new(1))`と等価です。

#### *(static)* `Zahlen_Math.log10(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の10を底とする対数を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 10を底とする対数を求める数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 10を底とする対数

#### *(static)* `Zahlen_Math.log2(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の2を底とする対数を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 2を底とする対数を求める数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 2を底とする対数

### Methods > Power & Root

#### *(static)* `Zahlen_Math.pow(x, y)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z, y: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の`y`乗を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 底
    - `y`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 指数
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - `x`の`y`乗

> **Notes:**
> - `x`, `y`のいずれかが`Zahlen_Qi`の場合は主値を返します。
>     - $\textrm{pv } z^a = e^{a \textrm{Log} z}$

#### *(static)* `Zahlen_Math.sqrt(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の平方根を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 平方根を求める数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 平方根

> **Notes:**
> - `Zahlen_Math.pow(x, new Zahlen_Q(1n, 2n))`と等価です。

#### *(static)* `Zahlen_Math.cbrt(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

数値`x`の立方根を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 立方根を求める数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 立方根

> **Notes:**
> - `Zahlen_Math.pow(x, new Zahlen_Q(1n, 3n))`と等価です。

#### *(static)* `Zahlen_Math.hypot(...values)`

```js
/** @type {(...values: (Zahlen_Qi|Zahlen_Q|Zahlen_Z)[]) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

引数の平方和の平方根を返します。

- Parameters:
    - `...values`: `(Zahlen_Qi|Zahlen_Q|Zahlen_Z)[]` - 平方和の平方根を求める数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 平方和の平方根

> **Notes:**
> - `Zahlen_Math.sqrt(values.reduce((acc, val) => Zahlen_Math.add(acc, Zahlen_Math.pow(val, new Zahlen_Z(2n))), new Zahlen_Z(0n)))`と等価です。

### Methods > Min & Max

#### *(static)* `Zahlen_Math.min(...values)`

```js
/** @type {(...values: (Zahlen_Qi|Zahlen_Q|Zahlen_Z)[]) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

引数の最小値を返します。

- Parameters:
    - `...values`: `(Zahlen_Qi|Zahlen_Q|Zahlen_Z)[]` - 最小値を求める数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 最小値

> **Notes:**
> - `x`が`Zahlen_Qi`の場合は、絶対値と符号で比較します。

#### *(static)* `Zahlen_Math.max(...values)`

```js
/** @type {(...values: (Zahlen_Qi|Zahlen_Q|Zahlen_Z)[]) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

引数の最大値を返します。

- Parameters:
    - `...values`: `(Zahlen_Qi|Zahlen_Q|Zahlen_Z)[]` - 最大値を求める数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 最大値

> **Notes:**
> - `x`が`Zahlen_Qi`の場合は、絶対値と符号で比較します。

### Methods > Complex

#### *(static)* `Zahlen_Math.degrees(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

弧度法(ラジアン)で表された数値`x`を角度法(度)に変換して返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 変換する数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 角度法(度)での数値

> **Notes:**
> - `Zahlen_Math.mul(x, Zahlen_Math.div(new Zahlen_Z(180n), Zahlen_Math.PI))`と等価です。

#### *(static)* `Zahlen_Math.radians(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

角度法(度)で表された数値`x`を弧度法(ラジアン)に変換して返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 変換する数値
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 弧度法(ラジアン)での数値

> **Notes:**
> - `Zahlen_Math.mul(x, Zahlen_Math.div(Zahlen_Math.PI, new Zahlen_Z(180n)))`と等価です。

#### *(static)* `Zahlen_Math.arg(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

複素数`x`の偏角(位相)を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 偏角を求める複素数
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 偏角(ラジアン)

> **Notes:**
> - 返り値$\phi$の範囲は$\pi\lt\phi\le\pi$です。
> - `Zahlen_Math.atan2(x.imag, x.real)`と等価です。

#### *(static)* `Zahlen_Math.phase(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

複素数`x`の偏角(位相)を返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 偏角を求める複素数
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 偏角(ラジアン)

> **Notes:**
> - `Zahlen_Math.arg`のエイリアスです。

#### *(static)* `Zahlen_Math.polar(x)`

```js
/** @type {(x: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => [Zahlen_Qi|Zahlen_Q|Zahlen_Z, Zahlen_Qi|Zahlen_Q|Zahlen_Z]} */
```

複素数`x`を極形式で表現し、絶対値と偏角のペアを返します。

- Parameters:
    - `x`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 極形式に変換する複素数
- Returns:
    - `[Zahlen_Qi|Zahlen_Q|Zahlen_Z, Zahlen_Qi|Zahlen_Q|Zahlen_Z]` - `[絶対値, 偏角]`のペア

> **Notes:**
> - `[Zahlen.Math.abs(x), Zahlen.Math.phase(x)]`と等価です。

#### *(static)* `Zahlen_Math.orthogonal(abs, amp)`

```js
/** @type {(abs: Zahlen_Qi|Zahlen_Q|Zahlen_Z, amp: Zahlen_Qi|Zahlen_Q|Zahlen_Z) => Zahlen_Qi|Zahlen_Q|Zahlen_Z} */
```

絶対値`abs`と偏角`amp`からなる複素数の極形式表現を、複素数平面形式に変換して返します。

- Parameters:
    - `abs`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 絶対値
    - `amp`: `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 偏角
- Returns:
    - `Zahlen_Qi|Zahlen_Q|Zahlen_Z` - 複素数平面形式の複素数

> **Notes:**
> - `Zahlen_Math.add( Zahlen_Math.mul(abs, Zahlen_Math.cos(amp)), Zahlen_Math.mul(abs, Zahlen_Math.mul(new Zahlen_Qi(0n, 1n, 1n, 1n), Zahlen_Math.sin(amp))) )`と等価です。
