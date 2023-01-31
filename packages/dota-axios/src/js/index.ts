
class Axios {
    constructor() {
        
    }

    /** 发送一个请求到 lua.server */
    async server<T extends string | object>(
        name: axiosEvents.InferKey<T, axiosEventPUI2Server>,
        data: axiosEvents.InferType<T, axiosEventPUI2Server, 'send'>,
    ) {
        let __tick__ = Game.GetGameTime()
        //@ts-ignore
        GameEvents.SendCustomGameEventToServer<NonNullable<typeof data>>(`p2s_${name}`, {
            ...data,
            __tick__
        });
        return new Promise<axiosEvents.InferType<T, axiosEventPUI2Server, 'back'>>(
            resolve =>
                this.#on<axiosEvents.InferType<T, axiosEventPUI2Server, 'back'>>(`s2p_${name}`, __tick__, resolve)
        )
    }

    // /** 发送一个请求到 lua.client */
    // async client<T extends string | object>(
    //     name: axiosEvents.InferKey<T>,
    //     data: axiosEvents.InferType<T, 'p2c'>,
    // ) {
    //     let __tick__ = Game.GetGameTime()
    //     //@ts-ignore
    //     GameEvents.SendCustomGameEventToClient<NonNullable<typeof data>>(`p2c_${name}`, {
    //         ...data,
    //         __tick__
    //     });
    //     return new Promise<axiosEvents.InferType<T, 'c2p'>>(
    //         resolve =>
    //             this.#on<axiosEvents.InferType<T, 'c2p'>>(`c2p_${name}`, __tick__, resolve)
    //     )
    // }

    #on<T extends object | undefined>(
        name: string,
        tick:number,
        funcVal: (event: NonNullable<T>) => void,
    ) {
        let listen: GameEventListenerID
        listen = GameEvents.Subscribe<{ __tick__ :number}>(name,data=>{
            if (tick != data.__tick__)
                return;
            funcVal(data as any)
            GameEvents.Unsubscribe(listen)
        })
    }
}

export const axios = new Axios()