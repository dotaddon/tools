import ReactReconciler from 'react-reconciler';

export const noop = () => { };

const microtaskPromise = Promise.resolve();
export function queueMicrotask(callback: () => void) {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises, promise/catch-or-return, promise/prefer-await-to-then, promise/no-callback-in-promise
  microtaskPromise.then(callback);
}

export const reactPanoramaSymbol = Symbol('_reactPanoramaSymbol');

export type InternalPanel<T extends PanelBase = Panel> = T & {
  _reactPanoramaSymbol?: typeof reactPanoramaSymbol;
  _rootContainer?: ReactReconciler.FiberRoot;
  _eventHandlers?: Record<PanelEvent, (...args: any[]) => void>;
  _rotateParams?: Partial<Record<string, number>>;
  _econItemDef?: number;
  _econItemStyle?: number;
};

// TODO: Put it into a shared library?
const windowRoot = (() => {
  let panel: Panel | null = $.GetContextPanel();
  while (panel) {
    if (panel.BHasClass('WindowRoot')) return panel;
    if (panel.BHasClass('WorldUIRoot')) return panel;
    panel = panel.GetParent();
  }
})()!;

export const temporaryPanelHost =
  windowRoot.FindChildTraverse('__react_panorama_temporary_host__') ??
  $.CreatePanel('Panel', windowRoot, '__react_panorama_temporary_host__');
temporaryPanelHost.RemoveAndDeleteChildren();
temporaryPanelHost.visible = false;

export const temporaryScenePanelHost =
  windowRoot.FindChildTraverse('__react_panorama_temporary_scene_host__') ??
  $.CreatePanel('Panel', windowRoot, '__react_panorama_temporary_scene_host__');
temporaryScenePanelHost.RemoveAndDeleteChildren();
temporaryScenePanelHost.visible = false;

// 优化临时面板清理逻辑
const CLEANUP_INTERVAL = 1; // 清理间隔（秒）
const MAX_TEMP_PANELS = 100; // 临时面板数量上限

GameUI.CustomUIConfig().temporaryScheduleHandle = -1 as ScheduleID;
const checkFunc = () => {
  // 检查并移动已加载的场景面板
  for (let i = 0; i < temporaryScenePanelHost.GetChildCount(); i += 1) {
    const child = temporaryScenePanelHost.GetChild(i);
    if (child !== null && child.BHasClass('SceneLoaded')) {
      child.SetParent(temporaryPanelHost);
    }
  }

  // 检查临时面板数量是否超过上限
  if (temporaryPanelHost.GetChildCount() > MAX_TEMP_PANELS) {
    temporaryPanelHost.RemoveAndDeleteChildren();
  }

  // 定期清理无效的面板
  const cleanupInvalidPanels = (panel: Panel) => {
    for (let i = panel.GetChildCount() - 1; i >= 0; i--) {
      const child = panel.GetChild(i);
      if (child && !child.IsValid()) {
        child.DeleteAsync(0);
      }
    }
  };

  cleanupInvalidPanels(temporaryPanelHost);
  cleanupInvalidPanels(temporaryScenePanelHost);

  GameUI.CustomUIConfig().temporaryScheduleHandle = $.Schedule(CLEANUP_INTERVAL, checkFunc);
};

if (GameUI.CustomUIConfig().temporaryScheduleHandle !== (-1 as ScheduleID)) {
  try {
    $.CancelScheduled(GameUI.CustomUIConfig().temporaryScheduleHandle);
  } catch {}
  GameUI.CustomUIConfig().temporaryScheduleHandle = -1 as ScheduleID;
}

checkFunc();
