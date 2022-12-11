import { PanelType, DivByPanelType, PNC } from "./tpanel";

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

    TabContents:
        | 'onselect'
        | 'ondeselect'
    RadioButton:
        | 'onselect'
        | 'ondeselect'
    ToggleButton:
        | 'onselect'
        | 'ondeselect'
    TabButton:
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

export interface panoramaEventDeclarations {
    DragStart(settings: DragSettings): boolean
    DragEnd(dragged: Panel): boolean
    DragDrop(dragged: Panel): boolean
    DragEnter(dragged: Panel): boolean
    DragLeave(dragged: Panel): boolean
}

export type EventHandler<T extends PanelBase> = ((panel: T) => void) | string;
export type panoramaDivActive<T extends PanelType = 'Panel'> = {
    [k in panoramaDivActivates['Panel'] | panoramaDivActivates[T]]: EventHandler<DivByPanelType<T>>
} & {
    [k in `on-ui-${keyof panoramaEventDeclarations}`]: 
    (panel: DivByPanelType<T>, ...arg: Parameters<panoramaEventDeclarations[k extends `on-ui-${infer R}`?R:never]>) => void
}