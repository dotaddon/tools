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
  if (parent.paneltype === 'DropDown') {
    (parent as DropDown).RemoveOption(child.id);
  } else if ((child.paneltype === 'DOTAScenePanel' || child.paneltype === 'DOTAParticleScenePanel') && !child.BHasClass('SceneLoaded')) {
    child.SetParent(temporaryScenePanelHost);
  } else {
    child.SetParent(temporaryPanelHost);
    temporaryPanelHost.RemoveAndDeleteChildren();
    // TODO: child.DeleteAsync(0)?
  }
}

const hostConfig: ReactReconciler.HostConfig<
  PanelType, // Type
  Record<string, any>, // Props
  InternalPanel, // Container
  InternalPanel, // Instance
  never, // TextInstance
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
  createInstance(type, newProps) {
    const { initialProps, otherProps } = splitInitialProps(type, newProps);

    if (type === 'GenericPanel') type = newProps.type;
    // Create it on the context panel instead of rootContainerInstance to
    // preserve style context for elements rendered outside of the main tree
    const panel = $.CreatePanel(type, $.GetContextPanel(), newProps.id || '', initialProps != undefined ? initialProps : null)

    if (panelBaseNames.has(type)) {
      fixPanelBase(panel);
    }

    for (const propName in otherProps) {
      updateProperty(type, panel, propName, undefined, otherProps[propName]);
    }

    return panel;
  },
  createTextInstance() {
    throw new Error('React DOM不支持文本节点。请改用<Label/>元素。');
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
