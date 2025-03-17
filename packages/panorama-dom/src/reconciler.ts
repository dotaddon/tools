import '@mobilc/panorama-polyfill/dist/console'; // console:React calls console.error on errors during render
import '@mobilc/panorama-polyfill/dist/timers'; // timers:React is using setTimeout directly, ignoring host config
import ReactReconciler from 'react-reconciler';
import { InternalPanel, noop, temporaryPanelHost, temporaryScenePanelHost } from './utils';
import { splitInitialProps, updateProperty, getPropertyInfo } from './attributes';
import { fixPanelBase, panelBaseNames } from './panel-base';
import { PanelType } from '../types/panel';


const rootHostContext = {};
const childHostContext = {};

function appendChild(parent: InternalPanel, child: InternalPanel) {
  if (parent.paneltype === 'DropDown') {
    (parent as DropDown).AddOption(child);
    return;
  }

  if (parent.paneltype === 'ContextMenuScript') {
    parent = (parent as ContextMenuScriptPanel).GetContentsPanel();
  }

  if (parent === child.GetParent()) {
    parent.MoveChildAfter(child, parent.GetChild(parent.GetChildCount() - 1)!);
  } else {
    child.SetParent(parent);
  }
}

function insertBefore(parent: InternalPanel, child: InternalPanel, beforeChild: InternalPanel) {
  if (parent.paneltype === 'DropDown') {
    (parent as DropDown).AddOption(child);
    (parent as DropDown).AccessDropDownMenu().MoveChildBefore(child, beforeChild);
    return;
  }

  if (parent.paneltype === 'ContextMenuScript') {
    parent = (parent as ContextMenuScriptPanel).GetContentsPanel();
  }

  child.SetParent(parent);
  parent.MoveChildBefore(child, beforeChild);
}

function removeChild(parent: InternalPanel, child: InternalPanel) {
  // 清理事件处理器
  if (child._eventHandlers) {
    for (const eventName in child._eventHandlers) {
      child.ClearPanelEvent(eventName as PanelEvent);
    }
    delete child._eventHandlers;
  }

  // 递归清理子面板的事件处理器
  for (let i = 0; i < child.GetChildCount(); i++) {
    const childPanel = child.GetChild(i) as InternalPanel;
    if (childPanel._eventHandlers) {
      for (const eventName in childPanel._eventHandlers) {
        childPanel.ClearPanelEvent(eventName as PanelEvent);
      }
      delete childPanel._eventHandlers;
    }
  }

  if (parent.paneltype === 'DropDown') {
    (parent as DropDown).RemoveOption(child.id);
  } else if ((child.paneltype === 'DOTAScenePanel' || child.paneltype === 'DOTAParticleScenePanel') && !child.BHasClass('SceneLoaded')) {
    child.SetParent(temporaryScenePanelHost);
  } else {
    child.SetParent(temporaryPanelHost);
    // 立即删除临时面板中的子元素以释放内存
    $.Schedule(0, () => {
      if (temporaryPanelHost.IsValid()) {
        temporaryPanelHost.RemoveAndDeleteChildren();
      }
    });
  }

  // 清理其他资源
  if (child._rotateParams) delete child._rotateParams;
  if (child._econItemDef) delete child._econItemDef;
  if (child._econItemStyle) delete child._econItemStyle;
}

function createInstance(type: PanelType, newProps: Record<string, any>, rootContainerInstance: InternalPanel, hostContext: object, internalInstanceHandle: ReactReconciler.Fiber) {
  const { initialProps, otherProps } = splitInitialProps(type, newProps);

  if (type === 'GenericPanel') type = newProps.type;

  // Create it on the context panel instead of rootContainerInstance to
  // preserve style context for elements rendered outside of the main tree
  const panel = $.CreatePanel(type, $.GetContextPanel(), newProps.id || '', initialProps) as InternalPanel

  if (panelBaseNames.has(type)) {
    fixPanelBase(panel);
  }

  for (const propName in otherProps) {
    updateProperty(type, panel, propName, undefined, otherProps[propName]);
  }

  return panel;
}

const hostConfig: ReactReconciler.HostConfig<
  PanelType, // Type
  Record<string, any>, // Props
  InternalPanel, // Container
  InternalPanel, // Instance
  InternalPanel, // TextInstance
  never, // HydratableInstance
  InternalPanel, // PublicInstance
  object, // HostContext
  true, // UpdatePayload
  never, // ChildSet
  number, // TimeoutHandle
  number // NoTimeout
> = {
  getPublicInstance: (instance) => instance,
  getRootHostContext: () => rootHostContext,
  getChildHostContext: () => childHostContext,

  prepareForCommit: noop,
  resetAfterCommit: noop,

  // https://github.com/facebook/react/pull/14984
  scheduleDeferredCallback: undefined!,
  cancelDeferredCallback: undefined!,
  // https://github.com/facebook/react/pull/19124
  shouldDeprioritizeSubtree: undefined!,

  setTimeout,
  clearTimeout,
  noTimeout: -1,
  now: Date.now,

  isPrimaryRenderer: true,
  supportsMutation: true,
  supportsPersistence: false,
  supportsHydration: false,

  shouldSetTextContent: () => false,
  createInstance,
  createTextInstance(text: string, ...args) {
    return createInstance('Label', {text}, ...args);
  },
  appendInitialChild: appendChild,
  finalizeInitialChildren: () => false,

  appendChild,
  appendChildToContainer: appendChild,
  insertBefore,
  insertInContainerBefore: insertBefore,
  removeChild,
  removeChildFromContainer: removeChild,

  // https://github.com/facebook/react/pull/8607
  prepareUpdate: () => true,
  commitUpdate(panel, _updatePayload, type, oldProps, newProps) {
    for (const propName in newProps) {
      let oldValue = oldProps[propName];
      let newValue = newProps[propName];
      const propertyInformation = getPropertyInfo(type, propName);

      if (propertyInformation && typeof propertyInformation.preOperation === 'function') {
        newValue = propertyInformation.preOperation(newValue);
        oldValue = propertyInformation.preOperation(oldValue);
      }

      if (oldValue !== newValue) {
        updateProperty(type, panel, propName, oldValue, newValue);
      }
    }

    for (const propName in oldProps) {
      if (!(propName in newProps)) {
        updateProperty(type, panel, propName, undefined, oldProps[propName]);
      }
    }
  },
};

export const reconciler = ReactReconciler(hostConfig);
