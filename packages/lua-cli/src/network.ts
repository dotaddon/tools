declare global {
    interface PlayerNetTableDeclarations {}
}
export function playerNetSet<
    T extends PlayerNetTableDeclarations,
    K extends keyof T
    >(unique:number, keyName: K, value: T[K]): boolean {
    // @ts-ignore
    return CustomNetTables.SetTableValue(`player_${unique}`,keyName,value)
}
export function playerNetGet<
    T extends PlayerNetTableDeclarations,
    K extends keyof T
    >(unique:number, keyName: K): NetworkedData<T[K]> {
    // @ts-ignore
    return CustomNetTables.GetTableValue(`player_${unique}`,keyName)
}
/** 玩家数据结构化管理 */
export class tsOperatorBase<Single extends {playerid:PlayerID} & PlayerNetTableDeclarations> {
    constructor(
        private prList = new Map<PlayerID,Single>()
    ){}

    /** 获取一个玩家的信息 */
    get(id:PlayerID):Single {
        return this.prList.get(id)
    }
    /** 更新一个玩家的信息 */
    set(id: PlayerID, data: Partial<Single>){
        this.prList[id] = Object.assign(this.prList[id], data)
    }
    /** 是否存在某个玩家数据 */
    has(id: PlayerID){
        return this.prList.has(id)
    }

    /** 获取玩家所选英雄 */
    Hero(id:PlayerID ):CDOTA_BaseNPC_Hero {
        return PlayerResource.GetSelectedHeroEntity(id)
    }

    /** 修改通讯数据 将玩家信息发送到 netTable */
    net<T extends PlayerID | Single>(
        key:(T extends PlayerID ? PlayerID:Single) | Single, 
        title:keyof PlayerNetTableDeclarations
        ){
        let id:PlayerID
        let pr:Single
        switch (type(key)) {
            case 'number':
                if(key==-1) return;
                id = key as PlayerID
                pr = this.get(id)
                break;
            case 'table':
                pr = key as Single
                id = pr.playerid
                if(!id) error('参数1错误');
                break;
            default:
                error('参数1错误');
        }
        playerNetSet(id, title, pr[title])
    }

    each(callback:(this:void, ele:Single, index:PlayerID)=>void){
        this.prList.forEach(
            ele=>PlayerResource.IsValidPlayerID(ele.playerid)&&callback(ele,ele.playerid)
        )
    }
}