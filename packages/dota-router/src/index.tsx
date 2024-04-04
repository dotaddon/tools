import { createPortal,PanelAttributes } from "@mobilc/panorama-react-dom";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { create } from "zustand";

const menuRoute = create<{
    current: any,
    change(target: any,setFunc:React.Dispatch<React.SetStateAction<boolean>>): () => void
}>((set, get) => ({
    current: null,
    change(target, setFunc) {
        return () => {
            setFunc(false)
            let { current } = get()
            if (current != target) {
                set({ current: target })
            }
            else {
                set({ current: undefined })
            }
            setTimeout(()=>setFunc(true), 50)
        }
    },
}))

/** 导航栏
 * @param path 索引路径 
 * @param element 弹出窗口
 * @returns 
 */
export function NavLink<T extends string | number | symbol>({ path, element, rootNode}: { path: T, element: ReactNode , rootNode?:React.RefObject<Panel>}) {
    const [show, setShow] = useState(false)
    useEffect(() => menuRoute.subscribe(state => {
        setShow(state.current == path)
    }), [path])

    const portal = useMemo(() => createPortal(element, rootNode?.current ?? $.GetContextPanel()), [element,rootNode?.current])

    return <Router to={path} style={{ width: "100%", height: "100%" }} >
        {
            show ? portal : null
        }
    </Router>
}

/** 点击跳转到指定路由
 * 自带50ms防连点
 */
export function Router<T extends string | number | symbol>({to, ...data}:{to: T}&Omit<PanelAttributes,'enabled'|'onactivate'>) {
    const [enable,setEnable] = useState(true)
    return <Button onactivate={menuRoute.getState().change(to,setEnable)} enabled={enable} {...data} />
}