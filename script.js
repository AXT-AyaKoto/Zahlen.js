/**
 * @typedef Formula - "式"。演算子と被演算子(BigInt)から成る。
 * @property {(Operator|BigInt)[]} token - 逆ポーランド記法で並んだ演算子と被演算子の列
 */

/**
 * @typedef Operator - "演算子"。関数なども含む。
 * @property {string} name - 演算子名
 * @property {number} priority - 優先度
 * @property {{left: number, right: number}} arity - 一般的な算術記法で(左|右)側に来る被演算子の数
 * @property {"L"|"R"} associativity - 結合性。"L" なら左結合、"R" なら右結合
 * @property {(...args: Formula[]) => Formula[]} func - 演算子の挙動の実装
 */

/**
 * @typedef Variable - "変数"。変数を表す。
 * @property {string} name - 変数名
 */


