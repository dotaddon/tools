import { ClassAttributes, ReactNode } from "react";

export type hisoCombination<T, S> = {
    [P in keyof S]?: P extends keyof T ? T[P] : S[P]
};

export type PanelStyles = hisoCombination<VCSSStyleDeclaration2, VCSSStyleDeclaration>

export type ReactDomDivProps<T extends PanelBase = Panel> = ClassAttributes<T> & {
    children?: ReactNode;
}