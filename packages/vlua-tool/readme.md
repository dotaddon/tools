


# vlua-tool

一个为Dota2自定义游戏开发提供便利功能的TypeScript/Lua工具库。

## 安装

```bash
pnpm install @mobilc/vlua-tool
```

## 功能特性

- 计时器（Timer）：高效的计时器实现，支持异步等待、定时执行和循环执行
- 自定义事件（CustomGameEvent）：类型安全的自定义事件管理系统
- 网络数据（Network）：结构化的玩家网络数据管理
- HTTP请求：支持异步HTTP请求，便于与外部服务交互
- 单位创建：异步单位创建工具
- 类重载支持：支持运行时类的重载

## API文档

### Timer 计时器

#### sleep(ms: number, holdOnPause: boolean = true): Promise<void>
异步等待指定时间。

- `ms`: 等待时间（毫秒）
- `holdOnPause`: 是否在游戏暂停时暂停计时（默认为true）

```typescript
await sleep(1000) // 等待1秒
```

#### setTimeout(callback: Function, timeout: number, ...args: any[]): number
延迟执行指定函数。

- `callback`: 要执行的函数
- `timeout`: 延迟时间（毫秒）
- `args`: 传递给回调函数的参数

```typescript
const timerId = setTimeout(() => print("Hello"), 1000)
```

#### clearTimeout(id: number): void
清除延时执行的计时器。

#### setInterval(callback: Function, interval: number, ...args: any[]): number
按指定间隔重复执行函数。

```typescript
const intervalId = setInterval(() => print("Tick"), 1000)
```

#### clearInterval(id: number): void
清除重复执行的计时器。

#### setThink(callback: Function, delay: number, ...args: any[]): number
设置一个逻辑器，可动态控制下次执行时间。

```typescript
setThink((count: number) => {
    print(`Think ${count}`)
    return count > 0 ? 1000 : null // 返回下次执行间隔或null停止
}, 0, 3)
```

### CustomGameEvent 自定义事件

#### BaseCustomGameEventManager
自定义事件管理器基类，提供类型安全的事件监听机制。

```typescript
class MyEventManager extends BaseCustomGameEventManager {
    player_ready(userId: EntityIndex, event: CGEventData<"player_ready">) {
        print(`Player ${event.PlayerID} is ready`)
    }
}
```

### Network 网络数据

#### playerNetSet<T, K>(unique: PlayerID, keyName: K, value: T[K]): boolean
设置玩家网络表数据。

#### playerNetGet<T, K>(unique: PlayerID, keyName: K): NetworkedData<T[K]>
获取玩家网络表数据。

#### tsOperatorBase<T>
玩家数据结构化管理类。

```typescript
interface PlayerData {
    playerid: PlayerID
    score: number
}

const players = new tsOperatorBase<PlayerData>([
    { playerid: 0, score: 100 }
])
```

### HTTP 请求

#### asyncHttp(url: string)
创建异步HTTP请求。

```typescript
await asyncHttp('http://api.example.com')
    .method('POST')
    .postBody('application/json', { data: 123 })
    .send()
```

### Unit 单位

#### createUnit(name: string, location: Vector, team: DOTATeam_t, params?: createUnitParams): Promise<CDOTA_BaseNPC>
异步创建单位。

```typescript
const unit = await createUnit('npc_dota_hero_axe', Vector(0, 0, 0), DOTATeam_t.DOTA_TEAM_GOODGUYS)
```

### Adapter 适配器

#### BaseAbility, BaseItem, BaseModifier
提供基础的技能、物品和修饰器类。

```typescript
class MyModifier extends BaseModifier {
    OnCreated() {
        this.StartIntervalThink(1)
    }
}
```

## 注意事项

1. 计时器系统使用了优化的实现，相比原生Timer更高效
2. 自定义事件管理器需要正确声明事件类型以获得类型检查
3. 网络数据操作应注意性能影响
4. HTTP请求应处理可能的超时和错误情况

## 许可证

MIT