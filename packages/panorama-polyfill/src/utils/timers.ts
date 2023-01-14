declare global {
  interface CustomUIConfig {
    __polyfillTimersResolve: Map<polyfillScheduleID, (value: void | PromiseLike<void>) => void>
  }
}
GameUI.CustomUIConfig().__polyfillTimersResolve = new Map()


function ScheduleDelay(id: polyfillScheduleID) {
  $.GetContextPanel().RunScriptInPanelContext(`
  if (!GameUI.CustomUIConfig().__polyfillTimersResolve)
    return;
  let handle = GameUI.CustomUIConfig().__polyfillTimersResolve.get(${id})
  if(!handle)
    return;
    handle(0)
`)
}

export type polyfillScheduleID = number & {
  readonly __polyfillScheduleID: never
}

const intervals = new Map<polyfillScheduleID, ScheduleID>()
let nextIntervalId = 0;

function getNextIntervalId(): polyfillScheduleID {
  nextIntervalId += 1;
  return nextIntervalId as any
}

function promiseForNext(ms: number, id: polyfillScheduleID): Promise<void> {
  return new Promise((resolve) => {
    GameUI.CustomUIConfig().__polyfillTimersResolve.set(id, resolve)
    intervals.set(id, $.Schedule(ms, () => ScheduleDelay(id)))
  })
}

export const setTimeout = <TArgs extends any[]>(
  callback: (...args: TArgs) => void,
  timeout = 0,
  ...args: TArgs
): polyfillScheduleID => {
  timeout /= 1000;
  const intervalId = getNextIntervalId();
  promiseForNext(timeout, intervalId).then(() => callback(...args))
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
    // $.CancelScheduled throws on expired or non-existent timer handles
  let pro = intervals.get(handle)
  if (!pro)
    return;
  try {
    $.CancelScheduled(pro)
  }catch (err) {

  }
}

export { clearTimer as clearTimeout, clearTimer as clearInterval, clearTimer as clearImmediate };
