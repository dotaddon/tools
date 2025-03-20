/** 默认配置内存回收频率 */
export function recycle() {
    collectgarbage("setpause", 100)
    collectgarbage("setstepmul", 5000)
}