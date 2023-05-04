import { PanelAttributes, createPortal } from "@mobilc/panorama-react-dom";
import { ReactNode, useEffect, useMemo, useState } from "react";
import create from "zustand";

const menuRoute = create<{ current: any }>((set, get) => ({
    current: null,
}))

/** 导航栏 */
export function NavLink<T extends string | number | symbol>({ to, children }: { to: T, children?: ReactNode[] }) {
    return <Panel onactivate={() => menuRoute.setState({ current: to })} >
        {
            children
        }
    </Panel>
}

/** 跳转目标页签 */
export function Route<T extends string | number | symbol>({ path, style, visible = false, children, ...p }: { path: T } & PanelAttributes) {
    const [show, setShow] = useState(visible)
    useEffect(() => menuRoute.subscribe(state => {
        setShow(state.current == path)
    }), [path])

    const windows = useMemo(() =>
        <Panel {...p} style={{ ...style, align: 'center center' }} >
            {children}
        </Panel>
        , [children]);

    if (!show) return null;
    return createPortal(windows, $.GetContextPanel());
}