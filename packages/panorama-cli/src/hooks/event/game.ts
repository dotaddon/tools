import { DependencyList, useCallback, useEffect } from "react";

/** 主动触发游戏事件 */
export function FireGameEvent<T extends keyof CustomGameEventDeclarations>(
        eventName: T,
        eventData: GameEvents.InferGameEventType<T, never>,
        toServer: boolean = true,
    ) {
    if (toServer)
        GameEvents.SendCustomGameEventToServer(eventName, eventData)
    else
        GameEvents.SendCustomGameEventToAllClients(eventName, eventData)
}

/**
 * 每次触发 `eventName` 游戏事件时执行 `callback`。
 * Executes `callback` every time `eventName` game event is fired.
 */
export function useGameEvent<T extends keyof CustomGameEventDeclarations | keyof GameEventDeclarations>(
    eventName: T,
    callback: (event: NetworkedData<GameEvents.InferGameEventType<T, object>>) => void,
    dependencies: DependencyList = [],
) {
    const cb = useCallback(callback,dependencies)
    useEffect(() => {
        const listener = GameEvents.Subscribe(eventName, cb);
        return () => GameEvents.Unsubscribe(listener);
    }, []);
}