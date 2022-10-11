
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
    protected listen<T extends keyof CustomGameEventDeclarations>
        (eventName: keyof Intersection<this, CustomGameEventDeclarations>, funcName?: keyof this | CGEventDeclarationsCallbacks[T]) {
        let codeName = eventName as keyof CustomGameEventDeclarations
        if (funcName) {
            if (typeof (funcName) == 'function')
                CustomGameEventManager.RegisterListener(codeName, (id, event) => funcName(id, event as CGEventData<T>))
            else //@ts-ignore
                CustomGameEventManager.RegisterListener(codeName, (id, event) => this[funcName]?.(id, event))
        } else //@ts-ignore
            CustomGameEventManager.RegisterListener(codeName, (id, event) => this[codeName]?.(id, event))
    }
}