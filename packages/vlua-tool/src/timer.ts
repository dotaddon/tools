declare interface TimeTask {
    /** 任务ID */
    id: number
    /** 回调函数 */
    resolve: (v?: any) => void
    /** 超时时间 */
    timeout: number
    /** 是否等待游戏暂停 */
    holdOnPause: boolean
    /** 堆栈信息 */
    trace:string
}

class TsTimerTool {
    private queue: Array<TimeTask> = []
    private nextId: number = 1
    constructor() {
        SpawnEntityFromTableSynchronous("info_target", { targetname: "vlua_tools_thinker" })
            .SetThink("tick", this, "timers", 0)
        print("[注册]管道计时器初始化");
    }

    public static getInstance(): TsTimerTool {
        if (!_G.__TsTimerInstance)
            _G.__TsTimerInstance = new TsTimerTool();

        return _G.__TsTimerInstance
    }

    /** 时间戳 */
    time() {
        return Time() //GameRules.GetGameTime()
    }

    /** 插入计时任务 */
    insert(taskInfo: Omit<TimeTask, "id">) {
        let item: TimeTask = {
            ...taskInfo,
            id: this.nextId++
        }
        let left = 0
        let right = this.queue.length
        let center = 0
        while (right > 0) {
            if (left == right)
                break;
            if (math.floor(30 * (this.queue[right].timeout - this.queue[left].timeout)) == 0)
                break;

            center = math.floor((right - left) / 2) + left

            let centerTimeout = this.queue[center].timeout
            if (centerTimeout == item.timeout) {
                break;
            } else if (centerTimeout < item.timeout) {
                left = center
            } else {
                right = center
            }
        }
        this.queue.splice(center, 0, item)
    }

    /** 移除计时任务 */
    remove(id: number) {
        this.queue = this.queue.filter(task => task.id !== id)
    }

    /**同帧业务批处理 */
    private batchProcessInFrame() {
        let time = this.time()
        let pause = GameRules.IsGamePaused()
        let next: Array<TimeTask> = []
        while (this.queue.length > 0) {
            let task = this.queue.shift()
            if (task.timeout > time) {
                next.push(task)
                break;
            }

            if (task.holdOnPause && pause)
                next.push(task)
            else
                try {
                    task.resolve()
                } catch (err) {
                    print(`[定时器] 发生错误\n${err}\n${task.trace}\n`)
                }
        }
        next.map(item => this.insert(item))
    }

    /** 计时器回调本体 */
    private tick() {
        this.batchProcessInFrame()
        return 0
    }
}


/** 使当前的异步函数
 * @param ms 等待 毫秒
 * @param holdOnPause 是否等待游戏暂停 default:true
 */
export async function sleep(ms: number, holdOnPause: boolean = true) {
    const Timer = TsTimerTool.getInstance()
    let timeout = math.max(ms, 1 / 30) / 1000 + Timer.time()
    return new Promise((resolve) => {
        Timer.insert({
            resolve, timeout, holdOnPause,
            trace:debug.traceback('',3),
        })
    })
}

/** 等待执行
 * @param callback 回调函数
 * @param timeout 等待 毫秒
 * @param args 回调函数入参
 */
export function setTimeout<TArgs extends any[]>(
    callback: (...args: TArgs) => void,
    timeout: number = 0,
    ...args: TArgs
): number {
    const Timer = TsTimerTool.getInstance()
    const task: TimeTask = {
        trace:debug.traceback('',3),
        id: 0,
        timeout: math.max(timeout, 1 / 30) / 1000 + Timer.time(),
        holdOnPause: true,
        resolve: () => callback(...args)
    }
    Timer.insert(task)
    return task.id
}

/** 清除等待执行的计时器
 * @param id 计时器ID
 */
export function clearTimeout(id: number) {
    const Timer = TsTimerTool.getInstance()
    Timer.remove(id)
}


/** 设置一个定时器
 * @param callback 回调函数
 * @param interval 执行间隔 毫秒
 * @param args 回调函数入参
 */
export function setInterval<TArgs extends any[]>(
    callback: (...args: TArgs) => void,
    interval: number = 0,
    ...args: TArgs
): number {

    const Timer = TsTimerTool.getInstance()
    const timeout = math.max(interval, 1 / 30) / 1000
    const task: TimeTask = {
        trace:debug.traceback('',3),
        id: 0,
        timeout: timeout + Timer.time(),
        holdOnPause: true,
        resolve: () => {
            callback(...args)
            task.timeout = timeout + Timer.time()
            Timer.insert(task)
        }
    }
    Timer.insert(task)
    return task.id
}

/** 清除定时器
 * @param id 定时器ID
 */
export function clearInterval(id: number) {
    const Timer = TsTimerTool.getInstance()
    Timer.remove(id)
}

/** 设置一个逻辑器
 * @param callback 回调函数，返回下一次执行时间（毫秒），返回负数或空值会结束该定时器
 * @param delay 首次等待 毫秒
 * @param args 回调函数入参
 */
export function setThink<TArgs extends any[]>(
    callback: (...args: TArgs) => number | null,
    delay: number = 0,
    ...args: TArgs
): number {
    const Timer = TsTimerTool.getInstance()
    const task: TimeTask = {
        trace:debug.traceback('',3),
        id: 0,
        timeout: math.max(delay, 1 / 30) / 1000 + Timer.time(),
        holdOnPause: true,
        resolve: () => {
            const nextDelay = callback(...args)
            if (nextDelay && nextDelay >= 0) {
                task.timeout = nextDelay / 1000 + Timer.time()
                Timer.insert(task)
            }
        }
    }
    Timer.insert(task)
    return task.id
}

/** 清除逻辑器
 * @param id 逻辑器ID
 */
export function clearThink(id: number) {
    const Timer = TsTimerTool.getInstance()
    Timer.remove(id)
}
