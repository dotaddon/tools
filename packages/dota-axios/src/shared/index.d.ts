
declare interface axiosEventPUI2Server extends axiosEvents.Event {

}


declare namespace axiosEvents {
    type DeclarationsKey = 'send' | 'back'

    type Event = {
        [K: string]: Partial<Record<DeclarationsKey, object>>
    }

    type InferKey<T extends string | object, N extends Event> = (T extends string ? T : string) | keyof N

    type InferType<T extends string | object, N extends Event, D extends DeclarationsKey> = T extends keyof N
        ? N[T][D]
        : never;
}