

export type EventHandler<T extends PanelBase> = (panel: T) => void;

/** 已经实现的事件 */
type PanelEventTrue =
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
    | 'onscrolledtorightedge';

export type panoramaDivAcitve<T extends PanelBase = Panel> =
    Record<PanelEventTrue, EventHandler<T>>