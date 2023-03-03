
type Task = {

    Waiting: boolean,
    Finished: boolean,
    Result?: any
}

class TsTaskSchedule {
    private tasks = new Map<LuaThread, Task>();
    constructor() {

        GameRules.GetGameModeEntity().SetContextThink("task_scheduler", () => {
            this.DoUpdate();
            return 0;
        }, 0);
        print("协程控制器初始化");
    }

    /**创建一个协程 */
    Fork(f: () => any) {
        let task: Task = { Waiting: false, Finished: false };
        let routine = coroutine.create(() => {
            task.Result = f();
            task.Finished = true;
        });
        this.tasks.set(routine, task);
        this.ResumeCoroutine(routine);
    }
    /**让协程一直等，直到一个结果 */
    WaitUntil(condition: () => boolean) {
        while (!condition()) {
            this.WaitOneFrame();
        }
    }
    /**让协程一直等一个固定的时间 */
    WaitTime(ms: number) {
        if (ms <= 0) {
            this.WaitOneFrame();
        } else {
            let start = GameRules.GetGameTime();
            this.WaitUntil(() => GameRules.GetGameTime() - start >= ms);
        }
    }
    private DoUpdate() {

        let deads: LuaThread[] = [];

        this.tasks.forEach((task, routine) => {
            if (task.Waiting) {
                task.Waiting = false;
                this.ResumeCoroutine(routine);
            }
            if (coroutine.status(routine) == "dead") {
                deads.push(routine);
            }
        });

        for (const routine of deads) {
            this.tasks.delete(routine);
        }
    }
    private ResumeCoroutine(routine: LuaThread) {
        let [ok, err] = coroutine.resume(routine);
        if (!ok) {
            print("Execute coroutine error:", err);
            let stack = debug.traceback(routine);
            print(stack)
        }
    }
    /** 等一帧 */
    private WaitOneFrame() {
        let routine = coroutine.running();
        if (routine) {
            let task = this.tasks.get(routine);
            if (task) {
                task.Waiting = true;
                coroutine.yield(routine);
            }
        }
    }
}

export const taskScheduler = new TsTaskSchedule()