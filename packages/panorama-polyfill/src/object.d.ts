interface ObjectConstructor {
    /**
     * Returns an object created by key-value entries for properties and methods
     * @param entries An iterable object that contains key-value entries for properties and methods.
     */
    fromEntries<T = any>(entries: Iterable<readonly [PropertyKey, T]>): { [k: string]: T };

    /**
     * Returns an object created by key-value entries for properties and methods
     * @param entries An iterable object that contains key-value entries for properties and methods.
     */
    fromEntries(entries: Iterable<readonly any[]>): any;

    /** 对obj对象map, 返回一个新的obj */
    entriesMap<O extends object, K extends keyof O, N = any>(entries: O, mothon: (o: [K, O[K]]) => N): Record<K,N>
}
