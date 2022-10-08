import { useRef, useState, useEffect } from "react";

/** 定时器 
 * 相当于异步useEffect, 处理当依赖项在回调中被修改造成的挂起
 * same as async useEffect
 * Handle hangs when State in dependencies are modified in callback
 */
export function useInterval(
    /** return to set new interval */
    callback: () => number | null | undefined | void,
    /** 更新间隔 interval */
    delay: number = 0,
    deps: React.DependencyList = []
) {
    const timer = useRef<ScheduleID | null>()
    const [next, setNext] = useState<number>(delay)
    useEffect(() => {
        timer.current = $.Schedule(next, () => {
            timer.current = null
            let delay = callback()
            if (delay)
                setNext(delay)
        })
        return () => {
            if (timer.current)
                $.CancelScheduled(timer.current)
        }
    }, [...deps, next]);
}

/** 更新器 
 * tick tock tool
*/
export function useTick(
    /** 更新间隔 interval */
    tick: number = 0.03
): boolean {
    const [value, setValue] = useState<boolean>(false);
    const timer = useRef<ScheduleID | null>()
    useEffect(() => {
        timer.current = $.Schedule(tick, () => {
            setValue(e => !e)
            timer.current = null
        })
        return () => {
            if (timer.current)
                $.CancelScheduled(timer.current)
        }
    }, [tick, value]);
    return value;
}