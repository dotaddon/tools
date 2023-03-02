
/** 单位创建的其他参数 */
export interface createUnitParams {
    findClearSpace: boolean
    npcOwner: CBaseEntity
    entityOwner: CBaseEntity
}

/** 单位创建的异步函数 */
export async function createUnit(name: string, location: Vector, team: DOTATeam_t, otherParams?: createUnitParams) {
    return new Promise<CDOTA_BaseNPC>((resolve)=>{
        let handle = CreateUnitByNameAsync(name, location, otherParams.findClearSpace, otherParams.npcOwner, otherParams.entityOwner,team,u=>resolve(u))
        IsInToolsMode() && print('单位创建的异步 ',handle)
    })
}