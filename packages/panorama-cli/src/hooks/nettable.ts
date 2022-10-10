import { useEffect, useState } from 'react';

/** 获取自定义 NetTable 中某个键的值，并在它更改时更新组件。
 * Gets the value of a key in a custom NetTable and updates component when it changes.
 */
export function useNetTableKey<
    TName extends keyof CustomNetTableDeclarations,
    T extends CustomNetTableDeclarations[TName],
    K extends keyof T
>(name: TName, key: K): NetworkedData<T[K]> | null {
    const [value, setValue] = useState(() => CustomNetTables.GetTableValue<TName, T, K>(name, key));

    useEffect(() => {
        const listener = CustomNetTables.SubscribeNetTableListener(name, (_, eventKey, eventValue) => {
            if (key === eventKey) {
                setValue(eventValue);
            }
        });

        return () => CustomNetTables.UnsubscribeNetTableListener(listener);
    }, [name, key]);

    return value;
}

/**
 * 获取自定义 NetTable 中的所有值并在组件更改时更新组件。
 * Gets all values in a custom NetTable and updates component when it changes.
 */
export function useNetTableAll<
    TName extends keyof CustomNetTableDeclarations,
    T extends CustomNetTableDeclarations[TName]
>(name: TName): NetworkedData<T> {
    const [values, setValue] = useState(() =>
        CustomNetTables.GetAllTableValues<TName, T>(name).reduce<NetworkedData<T>>(
            (accumulator, pair) => ({ ...(accumulator as any), [pair.key]: pair.value }),
            {} as any,
        ),
    );

    useEffect(() => {
        const listener = CustomNetTables.SubscribeNetTableListener(name, (_, eventKey, eventValue) => {
            setValue((current) => ({ ...(current as any), [eventKey]: eventValue }));
        });

        return () => CustomNetTables.UnsubscribeNetTableListener(listener);
    }, [name]);

    return values;
}