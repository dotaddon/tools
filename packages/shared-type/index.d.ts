/** 实体实例的索引 */
type EntityIndex = number & { _entityIndex: never };
/** 技能实例的索引 */
type AbilityEntityIndex = EntityIndex & { _abilityEntityIndex: never };
/** 物品技能实例的索引 */
type ItemEntityIndex = AbilityEntityIndex & { _itemEntityIndex: never };

/** 单位实例身上的modifier的索引 */
type BuffID = number & { readonly __tag__: 'BuffID' };
/** 客户端特效的索引 */
type ParticleID = number & { readonly __tag__: 'ParticleID' };
/** dota2英雄的编号 */
type HeroID = EntityIndex & { readonly __tag__: 'HeroID' };
/** 玩家的索引 */
type PlayerID =
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23;
