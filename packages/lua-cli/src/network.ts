declare interface PlayerNetTableDeclarations {}
export function playerNetSet<
    T extends PlayerNetTableDeclarations,
    K extends keyof T
    >(teamid:number, keyName: K, value: T[K]): boolean {
    // @ts-ignore
    return CustomNetTables.SetTableValue(`player_${teamid}`,keyName,value)
}
export function playerNetGet<
    T extends PlayerNetTableDeclarations,
    K extends keyof T
    >(teamid:number, keyName: K): NetworkedData<T[K]> {
    // @ts-ignore
    return CustomNetTables.GetTableValue(`player_${teamid}`,keyName)
}
export class tsOperaterBase<Single extends {playerid:PlayerID} & PlayerNetTableDeclarations> {
    constructor(
        private prList:Single[] = []
    ){}

    /** 获取一个玩家信息 */
    id(id:PlayerID):Single {
        return this.prList[id]
    }

    /** 获取玩家所选英雄 */
    Hero(id:PlayerID ):CDOTA_BaseNPC_Hero {
        return PlayerResource.GetSelectedHeroEntity(id)
    }

    /** 修改通讯数据 */
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
                pr = this.id(id)
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

    each(callback:(this:void, ele: Single,index:PlayerID)=>void){
        // for (let i in this.prList){
        //     //@ts-ignore
        //     if(PlayerResource.IsValidPlayerID(i-1)) callback(this.id(i),i)
        // }
        this.prList.forEach(
            ele=>PlayerResource.IsValidPlayerID(ele.playerid)&&callback(ele,ele.playerid)
        )
    }
}