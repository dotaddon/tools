
export type CGEventData<T extends keyof CustomGameEventDeclarations> =
    NetworkedData<CCustomGameEventManager.InferEventType<T, object> & { PlayerID: PlayerID }>

/** 取交集 */
export type Intersection<D, T> = {
    [P in keyof D]: P extends keyof T ? P : never
}

/** 事件回调集合 */
export type CGEventDeclarationsCallbacks = {
    [P in keyof CustomGameEventDeclarations]?: (
        userId: EntityIndex,
        event: CGEventData<P>,
    ) => void;
}
/** 自定义事件管理器
 *  构造示例 extends BaseCustomGameEventManager implements CGEventDeclarationsCallbacks
 */
export class BaseCustomGameEventManager {
    /** 监听指令 */

    /** 注册一个监听事件
     * @param eventName 事件名
     * @param functionName 响应函数 或 函数名
     * @param context 包含回调事件的对象
     */
    protected listen<T extends keyof CustomGameEventDeclarations>
        (eventName: keyof Intersection<this, CustomGameEventDeclarations>): void
    protected listen<T extends keyof CustomGameEventDeclarations>
        (eventName: T, functionName: CGEventDeclarationsCallbacks[T]): void
    protected listen<T extends keyof CustomGameEventDeclarations, E extends keyof S, S>
        (eventName: T, functionName: S[E] extends CGEventDeclarationsCallbacks[T]?E:never, context: S): void
    protected listen<T extends keyof CustomGameEventDeclarations, E extends keyof S, S extends any = this>
        (eventName: keyof Intersection<S, CustomGameEventDeclarations>, funcName?: S[E] extends CGEventDeclarationsCallbacks[T] ? E : CGEventDeclarationsCallbacks[T], context?: S) {
        let codeName = eventName as keyof CustomGameEventDeclarations
        if (funcName) {
            if (typeof (funcName) == 'function')
                CustomGameEventManager.RegisterListener(codeName, (id, event) => funcName(id, event as CGEventData<T>))
            else if(context) //@ts-ignore
                CustomGameEventManager.RegisterListener(codeName, (id, event) => context[funcName]?.(id, event))
            else //@ts-ignore
                CustomGameEventManager.RegisterListener(codeName, (id, event) => this[funcName]?.(id, event))
        } else //@ts-ignore
            CustomGameEventManager.RegisterListener(codeName, (id, event) => this[codeName]?.(id, event))
    } 
    /** 注册监听所有带下划线的自定义事件
     * @param context 包含回调事件的对象
     */
    protected register( context: any) {
        for (let i in context.prototype) {
            if (i.includes('_')) {
                try {
                    this.listen(i as keyof CustomGameEventDeclarations, i, context.prototype)
                } catch (error) {
                    print('这TM还能写错？')
                    print(error)
                }
            }
        }
    }
}