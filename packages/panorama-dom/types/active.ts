import { PanelType, DivByPanelType, PNC } from "./tpanel";


export type EventHandler<T extends PanelBase> = (panel: T) => void;

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

export type panoramaDivActive<T extends PanelType = 'Panel'> = {
    [k in keyof panoramaDivActivates[T] | keyof panoramaDivActivates['Panel']]: EventHandler<DivByPanelType<T>>
}