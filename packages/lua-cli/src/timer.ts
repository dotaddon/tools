declare interface TimeTask {
    resolve: (v?: any) => void
    timeout: number
    holdOnPause: boolean
}

class TsTimerTool {
    private queue: Array<TimeTask> = []
    constructor() {
        SpawnEntityFromTableSynchronous("info_target", { targetname: "vlua_tools_thinker" })
            .SetThink("tick", this, "timers", 0)
        print("[注册]管道计时器初始化");
    }

    /** 使当前的异步函数等待 毫秒 */
    async sleep(ms: number, holdOnPause: boolean = true) {
        let timeout = math.max(ms, 1 / 30) / 1000 + this.time()
        return new Promise((resolve) => {
            this.insert({
                resolve, timeout, holdOnPause
            })
        })
    }

    /** 插入计时任务 */
    insert(item: TimeTask) {
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

    /** 未实现 */
    remove(item: TimeTask) {
    }

    /** 时间戳 */
    private time() {
        return Time() //GameRules.GetGameTime()
    }

    /**同帧业务批处理 */
    private async batchProcessInFrame() {
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
                } catch (error) {
                    debug.traceback(error)
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

const Timer = new TsTimerTool()

/** 等待执行
 * @param think 定时器
 * @param timeout 等待 毫秒
 * @param args 定时器入参
 */
export function setTimeout<B extends void, T extends (...args: any[]) => B>(this: void, think: T, timeout: number = 100, ...args: Parameters<T>) {
    Timer.sleep(timeout)
        .then(think.bind(null, ...args))
}


/** 设置一个定时器
 * @param think 定时器 返回是否继续  false会结束该定时器
 * @param interval 执行间隔 毫秒
 * @param args 定时器入参
 * @returns 
 */
export function setInterval<B extends boolean | null, T extends (...args: any[]) => B>(this: void, think: T, interval: number = 100, ...args: Parameters<T>) {
    let bContinue = true
    async function callback() {
        if (!bContinue)
            return;
        await Timer.sleep(interval)
        callback()
        bContinue = think(...args)
    }
    callback()
}

/** 设置一个逻辑器
 * @param think 定时器 返回下一次执行时间 负数或空值会结束该定时器
 * @param delay 首次等待 毫秒
 * @param args 定时器入参
 */
export function setThink<B extends number | null, T extends (...args: any[]) => B>(this:void, think: T, delay: number = 100, ...args: Parameters<T>) {
    async function callback(timeout:number) {
        await Timer.sleep(timeout)
        let delay = think(...args)
        if (!delay || delay < 0)
            return;
        callback(delay)
    }
    callback(delay)
}