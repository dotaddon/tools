declare global {
    type TimerNameStr = string & {
        readonly __tag__: 'TimerNameStr';
    };
}


class TsTimerTool {
    queue: Record<TimerNameStr, boolean> = {}
    constructor(){
    }

    private name():TimerNameStr {
        return DoUniqueString("timer") as TimerNameStr
    }
    
    /**
     * 设置循环计时器，返回用于删除的关键词
     * @param callback 每次执行的回调函数，返回下次执行的间隔秒数
     * @param delay 首期执行的延迟启动秒数
     * @param rest 可选，回调需要的参数
     */
    public start(callback:(...args:any)=>number|void, delay: number = 0): TimerNameStr {
        let timerName = this.name();
        let _think = () =>{
            if (GameRules.IsGamePaused()) return 0.1;
            if (this.queue[timerName]) return callback();
            return null;
        }

        this.queue[timerName] = true;
        // @ts-ignore
        GameRules.GetGameModeEntity().SetContextThink(timerName, _think, delay);
        return timerName;
    }

    /**
     * 删除循环计时器
     * @param timerName 设置时使用的容器名
     */
    public over(timerName: TimerNameStr):void {
        this.queue[timerName] = null;
    }
    
    /**
     * 设置一次性循环计时器，返回用于删除的关键词
     * @param callback 每次执行的回调函数，返回下次执行的间隔秒数
     * @param delay 首期执行的延迟启动秒数
     */
    public once(callback:(...args:any)=>number|void, delay: number = 0): void {
        let timerName = this.name();
        let _think = () => GameRules.IsGamePaused() ? 0.1 :callback();
        // @ts-ignore
        GameRules.GetGameModeEntity().SetContextThink(timerName, _think, delay);
    }
}

export const Timer = new TsTimerTool()