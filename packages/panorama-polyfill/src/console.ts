import { console } from './utils/console';

type ConsoleType = typeof console;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Console extends ConsoleType {}

  // eslint-disable-next-line vars-on-top, no-var
  var console: Console;
  interface CustomUIConfig {
    console: Console
  }
}


GameUI.CustomUIConfig().console = console

$.GetContextPanel().RunScriptInPanelContext(`
    if (!this.console)
      this.console = GameUI.CustomUIConfig().console;
`)