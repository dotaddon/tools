import { createPortal } from "@mobilc/panorama-react-dom";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { create } from "zustand";

const menuRoute = create<{
    current: any,
    change(target: any): () => void
}>((set, get) => ({
    current: null,
    change(target) {
        return () => {
            let { current } = get()
            if (current != target) {
                set({ current: target })
            }
            else {
                set({ current: undefined })
            }
        }
    },
}))

/** 导航栏
 * @param path 索引路径 
 * @param element 弹出窗口
 * @returns 
 */
export default function NavLink<T extends string | number | symbol>({ path, element }: { path: T, element: ReactNode }) {
    const [show, setShow] = useState(false)
    useEffect(() => menuRoute.subscribe(state => {
        setShow(state.current == path)
    }), [path])

    const portal = useMemo(() => createPortal(element, $.GetContextPanel()), [element])

    return <Panel onactivate={menuRoute.getState().change(path)} style={{ width: "100%", height: "100%" }}>
        {
            show ? portal : null
        }
    </Panel>
}