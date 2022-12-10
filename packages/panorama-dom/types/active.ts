import { PanelType, PanelTypeByName, PNC } from "./tpanel";


export type EventHandler<T extends PanelBase> = (panel: T) => void;

/** 已经实现的事件 */
export interface panoramaBaseDivActivate extends Record<PanelType, string> {
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

export type panoramaDivAcitve<T extends PanelType = 'Panel'> = {
    [k in keyof panoramaBaseDivActivate[T] | keyof panoramaBaseDivActivate['Panel']]: EventHandler<PanelTypeByName<T>>
}