import { useRef, useState, useEffect } from "react";

/** 等待 不会冻结线程 */
export const sleep = (msc: number)=>new Promise<void>((resolve, reject) => {
    $.Schedule(msc/1000,resolve)
})

/** 跨帧执行 effect回调
 * 将effect的微任务调整为宏任务
 * 处理effect 依赖项在 回调中被修改造成的微任务死循环
 */
export function EffectCallbackAsync(callback: () => void, msc:number ) {
    let timeout = Math.max(msc,4)
    const listener = setTimeout(callback, timeout)
    return () => clearTimeout(listener)
}

/** 定时器 
 * 相当于异步useEffect, 处理当依赖项在回调中被修改造成的挂起
 * same as async useEffect
 * Handle hangs when State in dependencies are modified in callback
 */
export function useSchedule(
    /** return to set new interval */
    callback: () => number | null | undefined | void,
    /** 更新间隔 interval */
    msc: number = 0,
    deps: React.DependencyList = []
) {
    const [next, setNext] = useState<number>(msc)
    useEffect(() => EffectCallbackAsync(() => {
        let delay = callback()
        if (delay)
            setNext(delay)
    },next), [...deps, next]);
}

/** 更新器 
 * tick tock tool
*/
export function useTick(
    /** 更新间隔 interval */
    msc: number = 30
): boolean {
    const [value, setValue] = useState<boolean>(false);
    useEffect(() => EffectCallbackAsync(()=>setValue(e => !e),msc), [msc, value]);
    return value;
}

/** 往复式数据
 * @param frequency 频率 毫秒
 * @param amplitude 振幅
 * @param median 中位
 */
export function useBreath(frequency: number, amplitude: number, median: number = 0) {
    const [breath, setBreath] = useState(median);

    useEffect(() =>
        EffectCallbackAsync(() => setBreath((e) => (e + 1) % amplitude), frequency),
        [breath]
    );
    return breath
}