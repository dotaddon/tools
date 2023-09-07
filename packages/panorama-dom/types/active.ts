import { PanelType, DivByPanelType, PNC } from "./panel";

/** 已经实现的事件 */
export interface panoramaDivActivates extends PNC<PanelEvent> {
    Panel:
        | 'onload'
        | 'onfocus'
        | 'onactivate'
        | 'onmouseactivate'
        | 'ondblclick'
        | 'oncontextmenu'
        | 'onmouseover'
        | 'onmouseout'
        | 'onmovedown'
        | 'onmoveleft'
        | 'onmoveright'
        | 'onmoveup'
        | 'oncancel'
        | 'ontabforward'
        | 'ondescendantfocus'
        | 'onblur'
        | 'ondescendantblur'
        | 'ontabbackward'
        | 'onscrolledtobottom'
        | 'onscrolledtorightedge'
        | 'onselect'
        | 'ondeselect'

    DropDown:
        | 'oninputsubmit'

    Slider:
        | 'onvaluechanged'
    SlottedSlider:
        | 'onvaluechanged'
    NumberEntry:
        | 'onvaluechanged'
    TextEntry:
        | 'ontextentrychange'
        | 'oninputsubmit'
    // | 'ontextentrysubmit' // doesn't seem to be ever triggered
}

type EventHandler<T extends PanelBase, P extends any[]> = (panel: T, ...args:P) => void;

export type panoramaDivActive<T extends PanelType = 'Panel'> = {
    [k in panoramaDivActivates['Panel'] | panoramaDivActivates[T]]: 
        EventHandler<DivByPanelType<T>, void[]>
} & {
    [k in `on-ui-${keyof panelEventDeclarations}`]: 
    EventHandler<DivByPanelType<T>, Parameters<panelEventDeclarations[k extends `on-ui-${infer R}` ? R : never]>>
}