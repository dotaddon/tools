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
    function Subscribe<
            T extends string | object,
            E extends InferKey<T, axiosEventPUI2Server>,
            S extends NetworkedData<InferType<T, axiosEventPUI2Server, 'send'>>,
            B extends InferType<T, axiosEventPUI2Server, 'back'>
        >(event: E, cb: (event: S, PlayerID: PlayerID) => Promise<B>) {
        let id = CustomGameEventManager.RegisterListener(`axios_p2s_${event}` as any,
            function (_, data: { PlayerID: PlayerID, body: S, __tick__: number }) {
                cb(data.body, data.PlayerID)
                    .then(body => {
                        let response = { body, __tick__: data.__tick__ }
                        CustomGameEventManager.Send_ServerToPlayer(PlayerResource.GetPlayer(data.PlayerID), `axios_s2p_${event}` as any, response)
                    }).catch(e => {
                        debug.traceback(e)
                    })
            })
        return () => CustomGameEventManager.UnregisterListener(id)
    }
}


// /** 发送一个请求到 lua.server */
// async server<T extends string | object>(
//     name: axiosEvents.InferKey<T>,
//     data: axiosEvents.InferType<T, 'p2s'>,
// ) {
//     let __tick__ = GameRules.GetGameTime()
//     CustomGameEventManager.RegisterListener
//     //@ts-ignore
//     GameEvents.SendCustomGameEventToServer<NonNullable<typeof data>>(`p2s_${name}`, {
//         ...data,
//         __tick__
//     });
//     return new Promise<axiosEvents.InferType<T, 's2p'>>(
//         resolve =>
//             this.#on<axiosEvents.InferType<T, 's2p'>>(`s2p_${name}`, __tick__, resolve)
//     )
// }

// /** 发送一个请求到 lua.client */
// async client<T extends string | object>(
//     name: axiosEvents.InferKey<T>,
//     data: axiosEvents.InferType<T, 'p2c'>,
// ) {
//     let __tick__ = GameRules.GetGameTime()

//     CustomGameEventManager.Send_ServerToPlayer<NonNullable<typeof data>>(`p2c_${name}`, {
//         ...data,
//         __tick__
//     });
//     return new Promise<axiosEvents.InferType<T, 'c2p'>>(
//         resolve =>
//             this.#on<axiosEvents.InferType<T, 'c2p'>>(`c2p_${name}`, __tick__, resolve)
//     )
// }

// #on<T extends object | undefined>(
//     name: string,
//     tick: number,
//     funcVal: (event: NonNullable<T>) => void,
// ) {
//     let listen: GameEventListenerID
//     listen = GameEvents.Subscribe<{ __tick__: number }>(name, data => {
//         if (tick != data.__tick__)
//             return;
//         funcVal(data as any)
//         GameEvents.Unsubscribe(listen)
//     })
// }