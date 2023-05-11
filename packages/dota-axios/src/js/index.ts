declare global {
    /** js 向 lua.server 通讯声明 */
    interface axiosEventPUI2Server extends axios.Event { }
}

export namespace axios {
    type DeclarationsKey = 'send' | 'back'

    export type Event = {
        [K: string]: Partial<Record<DeclarationsKey, object>>
    }

    type InferKey<T extends string | object, N extends Event> = (T extends string ? T : string) | keyof N

    type InferType<T extends string | object, N extends Event, D extends DeclarationsKey> = T extends keyof N
        ? N[T][D]
        : never;

    /** 发送一个请求到 lua.server */
    export async function server<
        T extends string | object,
        E extends InferKey<T, axiosEventPUI2Server>,
        S extends InferType<T, axiosEventPUI2Server, 'send'>,
        B extends InferType<T, axiosEventPUI2Server, 'back'>
    >(name: E, data: S) {
        let __tick__ = Game.GetGameTime()
        GameEvents.SendCustomGameEventToServer<{ body: S, __tick__: number }>(`axios_p2s_${name}`, {
            body: data,
            __tick__
        });
        return new Promise<NetworkedData<B>>(
            resolve => once<B>(`axios_s2p_${name}`, __tick__, resolve)
        )
    }

    function once<T extends object | undefined>(
        name: string,
        tick: number,
        funcVal: (event: NetworkedData<T>) => void,
    ) {
        let listen: GameEventListenerID
        listen = GameEvents.Subscribe<{ body: T, __tick__: number }>(name, response => {
            if (tick != response.__tick__)
                return;
            funcVal(response.body)
            GameEvents.Unsubscribe(listen)
        })
    }
}
