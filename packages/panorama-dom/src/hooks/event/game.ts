import { DependencyList, useEffect } from "react";

/** 主动触发游戏事件 */
export function FireGameEvent<T extends string | object>(
        eventName: (T extends string ? T : string) | keyof CustomGameEventDeclarations,
        eventData: GameEvents.InferCustomGameEventType<T, never>,
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
export function useGameEvent<T extends string | object>(
    eventName:
        | (T extends string ? T : string)
        | keyof CustomGameEventDeclarations
        | keyof GameEventDeclarations,
    callback: (event: NetworkedData<GameEvents.InferGameEventType<T, object>>) => void,
    dependencies: DependencyList = [],
) {
    useEffect(() => {
        const id = GameEvents.Subscribe(eventName, callback);
        return () => GameEvents.Unsubscribe(id);
    }, dependencies);
}
