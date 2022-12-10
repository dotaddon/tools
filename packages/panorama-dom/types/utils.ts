import { ClassAttributes, ReactNode } from "react";
import { panoramaDivAcitve } from "./active";

export type hisoCombination<T, S> = {
    [P in keyof S]?: P extends keyof T ? T[P] : S[P]
};

export type panelStyles = hisoCombination<VCSSStyleDeclaration2, VCSSStyleDeclaration>

export type reactRequ<T extends PanelBase = Panel> = ClassAttributes<T> & {
    children: ReactNode;
}

type divBuff<T extends PanelBase = Panel> = reactRequ<T>
    & Partial<panoramaDivAcitve<T>>
