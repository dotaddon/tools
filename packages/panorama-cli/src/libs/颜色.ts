/** 整数转换为16进制 */
export function intToARGB(i: number): string {
    let to16 = (params: number) => ('00' + params.toString(16)).substr(-2)
    return to16(i & 0xFF) +
        to16((i >> 8) & 0xFF) +
        to16((i >> 16) & 0xFF) +
        to16((i >> 24) & 0xFF);
}
/** 获取玩家标识的颜色 16进制 */
export const PlayerColor = (id: PlayerID) => '#' + intToARGB(Players.GetPlayerColor(id))