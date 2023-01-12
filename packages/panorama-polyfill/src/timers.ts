import * as timers from './utils/timers';

declare global {
  function setInterval<TArgs extends any[]>(
    callback: (...args: TArgs) => void,
    timeout?: number,
    ...args: TArgs
  ): number;
  function clearInterval(handle?: number): void;

  function setTimeout<TArgs extends any[]>(
    callback: (...args: TArgs) => void,
    timeout?: number,
    ...args: TArgs
  ): number;
  function clearTimeout(handle?: number): void;

  function setImmediate<TArgs extends any[]>(
    callback: (...args: TArgs) => void,
    ...args: TArgs
  ): number;
  function clearImmediate(handle?: number): void;

  interface CustomUIConfig {
    __polyfillTimers :typeof timers
  }
}

GameUI.CustomUIConfig().__polyfillTimers = timers

$.GetContextPanel().RunScriptInPanelContext(`
  for (const func in GameUI.CustomUIConfig().__polyfillTimers){
    if (!this[func])
    this[func] = GameUI.CustomUIConfig().__polyfillTimers[func]
  }
`)