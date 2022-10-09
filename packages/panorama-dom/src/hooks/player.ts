import { useState } from "react";
import { useGameEvent } from ".";

/** 输出当前玩家ID数组，玩家重连时更新
 *  get all playerID in game now，refresh on anyone connect
 */
export function usePlayerMap() {
    const [list, setList] = useState<PlayerID[]>(() => Game.GetAllPlayerIDs())

    useGameEvent('player_connect_full', () => {
        setList(() => Game.GetAllPlayerIDs());
    }, [])

    return list
}