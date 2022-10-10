import { DependencyList, useEffect } from "react";
import { panoramaEventDeclarations } from "./list";

/** 触发控件事件
 * @param event 事件名
 * @returns 
*/
export function FireClientEvent<K extends keyof panoramaEventDeclarations, P extends PanelBase = Panel>
    (event: K, ...args: Parameters<panoramaEventDeclarations[K]>) {
    return (p: P) => $.DispatchEvent(event, p, ...args)
}

/** 触发控件事件
 * @param event 事件名
 * @param delay 延迟执行，可选
 * @returns 
*/
export function FireClientEventAsync<K extends keyof panoramaEventDeclarations, P extends PanelBase = Panel>
    (event: K, delay: number, ...args: Parameters<panoramaEventDeclarations[K]>) {
    return (p: P) => $.DispatchEventAsync(delay, event, p, ...args)
}

/**
 * 每次触发 `event` UI 事件时执行 `callback`。
 * Executes `callback` every time `event` UI event is fired.
 */
export function useClientEvent<K extends keyof panoramaEventDeclarations>
    (event: K, callback: (...data: Parameters<panoramaEventDeclarations[K]>) => void, dependencies: DependencyList = [] ) {
    useEffect(() => {
        //@ts-ignore
        const id = $.RegisterForUnhandledEvent(event, callback);
        return () => $.UnregisterForUnhandledEvent(event, id);
    }, dependencies);
}