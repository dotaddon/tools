const global = globalThis as typeof globalThis & {
    reloadCache: Record<string, any>;
    eventListenerIDs: EventListenerID[];
    customEventListenerIDs: CustomGameEventListenerID[];
};
if (global.reloadCache === undefined) {
    global.reloadCache = {};
}

/** 支持类的重载 */
export function reloadable<T extends { new(...args: any[]): {}; }>(constructor: T): T {
    const className = constructor.name;
    if (global.reloadCache[className] === undefined) {
        global.reloadCache[className] = constructor;
    }

    Object.assign(global.reloadCache[className].prototype, constructor.prototype);
    return global.reloadCache[className];
}

/** 支持对原生函数AOP */
export function remapFunction<T extends Object, K extends keyof T>(parent: T, child: K, creatFunc: (oldFunc: T[K]) => T[K]): void {
    let oldFunc = parent[child]
    let newFunc = creatFunc(oldFunc)
    parent[child] = newFunc
}