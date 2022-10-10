const reloadKey = new Date().getTime()
/**按键绑定 */
export function KeyBind<T extends 按键列表>
    (key: T, up?: (name: string) => void, down?: (name: string) => void)
{
    let name = 'Key' + key + reloadKey
    Game.CreateCustomKeyBind(key, "+" + name);
    up && Game.AddCommand("+" + name, up, "", 0 << 32);
    down && Game.AddCommand("-" + name, down, "", 0 << 32);
}

type 按键列表 = F区键 | 数字键 | 字母键 | 功能键 | 方向键 | 数字区 | 鼠标 | 手柄键
type F区键 =
    | "F1"
    | "F2"
    | "F3"
    | "F4"
    | "F5"
    | "F6"
    | "F8"
    | "F9"
    | "F10";

type 数字键 =
    | "0"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"

type 字母键 =
    | "a"
    | "b"
    | "c"
    | "d"
    | "e"
    | "f"
    | "g"
    | "h"
    | "i"
    | "j"
    | "k"
    | "l"
    | "m"
    | "n"
    | "o"
    | "p"
    | "q"
    | "r"
    | "s"
    | "t"
    | "u"
    | "v"
    | "w"
    | "x"
    | "y"
    | "z"

type 功能键 =
    | "["
    | "\\"
    | "`"
    | "BACKSPACE"
    | "CTRL"
    | "END"
    | "ENTER"
    | "ESCAPE"
    | "HOME"
    | "PAUSE"
    | "RCTRL"
    | "RSHIFT"
    | "SEMICOLON"
    | "SHIFT"
    | "SPACE"
    | "TAB"

type 方向键 =
    | "RIGHTARROW"
    | "UPARROW"
    | "LEFTARROW"
    | "DOWNARROW"

type 数字区 =
    | "KP_0"
    | "KP_1"
    | "KP_2"
    | "KP_3"
    | "KP_4"
    | "KP_5"
    | "KP_6"
    | "KP_7"
    | "KP_8"
    | "KP_9"
    | "KP_DOWNARROW"
    | "KP_LEFTARROW"
    | "KP_RIGHTARROW"
    | "KP_UPARROW"
    | "KP_MULTIPLY"
    | "KP_PLUS"
    | "KP_ENTER"
    | "KP_MINUS"

type 鼠标 =
    | "MOUSE_X"
    | "MOUSE_Y"
    | "MOUSE1"
    | "MOUSE2"
    | "MOUSE4"
    | "MWHEELDOWN"
    | "MWHEELUP"

type 手柄键 =
    | "L_TRIGGER"
    | "R_TRIGGER"
    | "X_BUTTON"
    | "Y_BUTTON"
    | "A_BUTTON"
    | "B_BUTTON"
    | "R_AXIS"
    | "X_AXIS"
    | "U_AXIS"
    | "Y_AXIS"