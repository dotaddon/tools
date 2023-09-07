import { DependencyList, useCallback, useEffect } from "react";

/** 触发控件事件
 * @param event 事件名
 * @returns 
*/
export function FireClientEvent<K extends keyof panelEventDeclarations, P extends PanelBase = Panel>
    (event: K, ...args: Parameters<panelEventDeclarations[K]>) {
    return (p: P) => $.DispatchEvent(event, p, ...args)
}

/** 触发控件事件
 * @param event 事件名
 * @param delay 延迟执行，可选
 * @returns 
*/
export function FireClientEventAsync<K extends keyof panelEventDeclarations, P extends PanelBase = Panel>
    (event: K, delay: number, ...args: Parameters<panelEventDeclarations[K]>) {
    return (p: P) => $.DispatchEventAsync(delay, event, p, ...args)
}

/**
 * 每次触发 `event` UI 事件时执行 `callback`。
 * Executes `callback` every time `event` UI event is fired.
 */
export function useClientEvent<K extends keyof panelEventDeclarations>
(   eventName: K, 
    callback: (...data: Parameters<panelEventDeclarations[K]>) => void, 
    dependencies: DependencyList = []
) {
    const cb = useCallback(callback, dependencies) as typeof callback
    useEffect(() => {
        const listener = $.RegisterForUnhandledEvent(eventName, cb as any);
        return () => $.UnregisterForUnhandledEvent(eventName, listener);
    }, []);
}