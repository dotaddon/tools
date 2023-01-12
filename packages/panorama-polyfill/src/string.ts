declare interface String {
    /** 使用 {0} 的占位符， 用后续参数顶替 */
    format(...args: Array<number | string>): string;
    /** 转化为方言 */
    local():string
}

String.prototype.format = function (this: string, ...args: Array<number | string>) {
    return this.replace(/{[0-9]+}/g, (substring: string) =>
        String(args[Number(substring.replace(/[\{\}]/g, ''))])
    );
};

String.prototype.local = function (this: string) {
    return $.Localize('#' + this)
};