
export type polyfillScheduleID = number & {
  readonly __polyfillScheduleID: never
}

const intervals = new Map<polyfillScheduleID, () => void>()
let nextIntervalId = 0;

function getNextIntervalId(): polyfillScheduleID {
  nextIntervalId += 1;
  return nextIntervalId as any
}

async function promiseForNext(ms: number, id: polyfillScheduleID): Promise<void> {
  return new Promise<void>((resolve,reject) => {
    $.Schedule(ms, resolve)
    intervals.set(id, reject)
  })
    .catch(e=>e && console.warn(e))
}

export const setTimeout = <TArgs extends any[]>(
  callback: (...args: TArgs) => void,
  timeout = 0,
  ...args: TArgs
): polyfillScheduleID => {
  timeout /= 1000;
  const intervalId = getNextIntervalId();
  promiseForNext(timeout, intervalId)
    .then(() => callback(...args))
    .finally(() => intervals.delete(intervalId))
  return intervalId
};

export function setInterval<TArgs extends any[]>(
  callback: (...args: TArgs) => void,
  timeout = 0,
  ...args: TArgs
): number {
  timeout /= 1000;
  const intervalId = getNextIntervalId();

  (function run() {
    promiseForNext(timeout, intervalId)
      .then(() => callback(...args))
      .then(run)
  })()

  return intervalId;
}

export const setImmediate = <TArgs extends any[]>(
  callback: (...args: TArgs) => void,
  ...args: TArgs
): polyfillScheduleID => setTimeout(callback,0,...args);

function clearTimer(handle?: polyfillScheduleID) {
  if (typeof handle !== 'number') 
    return;
  let reject = intervals.get(handle)
  if (!reject)
    return;
  reject()
  intervals.delete(handle)
}

export { clearTimer as clearTimeout, clearTimer as clearInterval, clearTimer as clearImmediate };
