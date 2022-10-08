/** 默认配置内存回收频率 */
export default ()=>{
    collectgarbage("setpause", 100)
    collectgarbage("setstepmul", 5000)
}