



declare type BUffCreateInfos<BuffType> = BuffType extends { OnCreated: (p: any) => void } 
    ? BuffType['OnCreated'] extends (p: infer S) => any 
        ? S 
        : never 
    : undefined

export interface BaseAbility extends CDOTA_Ability_Lua { }
export class BaseAbility { }

export interface BaseItem extends CDOTA_Item_Lua { }
export class BaseItem { }

export interface BaseModifier extends CDOTA_Modifier_Lua { }
export class BaseModifier {
    /** 给目标上buff */
    public static apply<T extends typeof BaseModifier>(
        this: T,
        target: CDOTA_BaseNPC,
        caster: CDOTA_BaseNPC = target,
        ability?: CDOTABaseAbility,
        CreateInfos?: BUffCreateInfos<InstanceType<T>>,
    ): InstanceType<T> {
        return target.AddNewModifier(caster, ability, this.name, CreateInfos) as any;
    }

    /** 判断是否拥有此buff */
    public static on<T extends typeof BaseModifier>(this: T, target: CDOTA_BaseNPC): boolean {
        return target.HasModifier(this.name);
    }

    /** 移除目标身上所有该buff */
    public static remove<T extends typeof BaseModifier>(this: T, target: CDOTA_BaseNPC): void {
        target.RemoveModifierByName(this.name);
    }
    /** 在目标地点创建法术场 */
    public static dummy<T extends typeof BaseModifier>(
        this: T,
        caster: CDOTA_BaseNPC,
        ability?: CDOTABaseAbility,
        target: Vector = caster.GetOrigin(),
        CreateInfos?: BUffCreateInfos<InstanceType<T>>,
    ): CDOTA_BaseNPC {
        return CreateModifierThinker(caster,ability,this.name,CreateInfos,target,caster.GetTeam(),false)
    }
}

export interface BaseModifierMotionHorizontal extends CDOTA_Modifier_Lua_Horizontal_Motion { }
export class BaseModifierMotionHorizontal extends BaseModifier { }

export interface BaseModifierMotionVertical extends CDOTA_Modifier_Lua_Vertical_Motion { }
export class BaseModifierMotionVertical extends BaseModifier { }

export interface BaseModifierMotionBoth extends CDOTA_Modifier_Lua_Motion_Both { }
export class BaseModifierMotionBoth extends BaseModifier { }

// Add standard base classes to prototype chain to make `super.*` work as `self.BaseClass.*`
setmetatable(BaseAbility.prototype, { __index: CDOTA_Ability_Lua ?? C_DOTA_Ability_Lua });
setmetatable(BaseItem.prototype, { __index: CDOTA_Item_Lua ?? C_DOTA_Item_Lua });
setmetatable(BaseModifier.prototype, { __index: CDOTA_Modifier_Lua ?? CDOTA_Modifier_Lua });


export const registerAbility = (
    abilityName?: string,
    localizationTokens?: { [x: string]: string; },
    name?: string,
) => (ability: new () => CDOTA_Ability_Lua | CDOTA_Item_Lua) => {
    if (name !== undefined) {
        // @ts-ignore
        ability.name = name;
    } else {
        name = ability.name;
    }

    const [env] = getFileScope();

    if (env[name]) {
        clearTable(env[name]);
    } else {
        env[name] = {};
    }

    toDotaClassInstance(env[name], ability);

    const originalSpawn = (env[name] as CDOTA_Ability_Lua).Spawn;
    env[name].Spawn = function () {
        this.____constructor();
        if (originalSpawn) {
            originalSpawn.call(this);
        }
    };
};

export const registerModifier = (modifierName?: string, modifierDescription?: string, name?: string) => (modifier: new () => CDOTA_Modifier_Lua) => {
    if (name !== undefined) {
        // @ts-ignore
        modifier.name = name;
    } else {
        name = modifier.name;
    }

    const [env, source] = getFileScope();
    const [fileName] = string.gsub(source, ".*scripts[\\/]vscripts[\\/]", "");

    if (env[name]) {
        clearTable(env[name]);
    } else {
        env[name] = {};
    }

    toDotaClassInstance(env[name], modifier);

    const originalOnCreated = (env[name] as CDOTA_Modifier_Lua).OnCreated;
    env[name].OnCreated = function (parameters: any) {
        this.____constructor();
        if (originalOnCreated) {
            originalOnCreated.call(this, parameters);
        }
    };

    let type = LuaModifierType.LUA_MODIFIER_MOTION_NONE;
    let base = (modifier as any).____super;
    while (base) {
        if (base === BaseModifierMotionBoth) {
            type = LuaModifierType.LUA_MODIFIER_MOTION_BOTH;
            break;
        } else if (base === BaseModifierMotionHorizontal) {
            type = LuaModifierType.LUA_MODIFIER_MOTION_HORIZONTAL;
            break;
        } else if (base === BaseModifierMotionVertical) {
            type = LuaModifierType.LUA_MODIFIER_MOTION_VERTICAL;
            break;
        }

        base = base.____super;
    }

    LinkLuaModifier(name, fileName, type);
};

function clearTable(table: object) {
    for (const key in table) {
        delete (table as any)[key];
    }
}

function getFileScope(): [any, string] {
    let level = 1;
    while (true) {
        const info = debug.getinfo(level, "S");
        if (info && info.what === "main") {
            return [getfenv(level), info.source!];
        }

        level += 1;
    }
}

function toDotaClassInstance(instance: any, table: new () => any) {
    let { prototype } = table;
    while (prototype) {
        for (const key in prototype) {
            // Using hasOwnProperty to ignore methods from metatable added by ExtendInstance
            // https://github.com/SteamDatabase/GameTracking-Dota2/blob/7edcaa294bdcf493df0846f8bbcd4d47a5c3bd57/game/core/scripts/vscripts/init.lua#L195
            if (!instance.hasOwnProperty(key)) {
                instance[key] = prototype[key];
            }
        }

        prototype = getmetatable(prototype);
    }
}
