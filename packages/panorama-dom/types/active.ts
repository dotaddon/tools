

export type EventHandler<T extends PanelBase> = (panel: T) => void;

/** 已经实现的事件 */
export interface panoramaBaseDivActivate {
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

    TabButton:
        | 'onselect'
        | 'ondeselect'

    DropDown:
        | 'oninputsubmit'

    Slider:
        | 'onvaluechanged'

    TextEntry:
        | 'ontextentrychange'
        | 'oninputsubmit'
    // | 'ontextentrysubmit' // doesn't seem to be ever triggered
}

export type TextEntryEvent =
    Record<panoramaBaseDivActivate['DropDown'], EventHandler<TextEntry>>

export type SliderEvent<T extends PanelBase = Panel> =
    Record<panoramaBaseDivActivate['Slider'], EventHandler<T>>

export type DropDownEvent =
    Record<panoramaBaseDivActivate['DropDown'], EventHandler<DropDown>>

export type panoramaDivAcitve<T extends PanelBase = Panel> = 
Record<panoramaBaseDivActivate['Panel'], EventHandler<T>>

export type TabButtonEvent<T extends PanelBase = Panel> = 
Record<panoramaBaseDivActivate['TabButton'], EventHandler<T>>
