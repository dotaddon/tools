
class Axios {
    constructor() {

    }

    Subscribe<T extends string | object>(
        event: axiosEvents.InferKey<T, axiosEventPUI2Server>,
        cb: (event: NetworkedData<axiosEvents.InferType<T, axiosEventPUI2Server, 'send'> & { PlayerID: PlayerID }>) => axiosEvents.InferType<T, axiosEventPUI2Server, 'back'>
    ) {
        let id = CustomGameEventManager.RegisterListener(`p2s_${event}` as any, (user, data) => {
            print(event, user, data, data.name)
            let result = { ...cb(data), __tick__: data.__tick__ }
            CustomGameEventManager.Send_ServerToPlayer(PlayerResource.GetPlayer(data.PlayerID), `s2p_${event}` as any, result)
        })
        return ()=>CustomGameEventManager.UnregisterListener(id)
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
}

export const axios = new Axios()