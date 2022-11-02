

/** 防抖套壳
 * 限时内只运行一次，以最后一次生效
 * @param method 执行的方法
 * @param wait 等待时间 默认100
 * @param immediate 立即执行
 */
export function debounce<T extends (...args: any) => any>(method: T, wait: number =100, immediate?: boolean)  {
    let timeout:number|null
    // debounced函数为返回值
    // 使用Async/Await处理异步，如果函数异步执行，等待setTimeout执行完，拿到原函数返回值后将其返回
    // args为返回函数调用时传入的参数，传给method
    return function (this:ThisType<T>|void,...args:Parameters<T>) {
        return new Promise<ReturnType<T>>(resolve => {
            // 用于记录原函数执行结果
            let result
            // 将method执行时this的指向设为debounce返回的函数被调用时的this指向
            let context = this
            // 如果存在定时器则将其清除
            if (timeout) {
                clearTimeout(timeout)
            }
            // 立即执行需要两个条件，一是immediate为true，二是timeout未被赋值或被置为null
            if (immediate) {
                // 如果定时器不存在，则立即执行，并设置一个定时器，wait毫秒后将定时器置为null
                // 这样确保立即执行后wait毫秒内不会被再次触发
                let callNow = !timeout
                timeout = setTimeout(() => {
                    timeout = null
                }, wait)
                // 如果满足上述两个条件，则立即执行并记录其执行结果
                if (callNow) {
                    result = method.apply(context, args)
                    resolve(result)
                }
            } else {
                // 如果immediate为false，则等待函数执行并记录其执行结果
                // 并将Promise状态置为fullfilled，以使函数继续执行
                timeout = setTimeout(() => {
                    // args是一个数组，所以使用fn.apply
                    // 也可写作method.call(context, ...args)
                    result = method.apply(context, args)
                    resolve(result)
                }, wait)
            }
        })
    }
}
/** 节流套壳
 * 限时内只运行一次，以最后一次生效
 * @param method 执行的方法 默认100
 * @param wait 等待时间
 */
export function throttle<T extends (...args: any) => any>(method: T, wait: number = 100 ) {
    wait = wait || 0;
    let timerId: number | null
    let lastTime = 0;

    function throttled(this: ThisType<T> | void, ...args: Parameters<T>) {
        let context = this
        let currentTime =Game.Time();
        if (currentTime >= lastTime + wait) {
            method.apply(context, args)
            lastTime = currentTime;
        } else {
            if (timerId) {
                clearTimeout(timerId);
                timerId = null;
            }
            timerId = setTimeout(function () {
                method.apply(context, args)
            }, wait);
        }
    }
    return throttled;
}