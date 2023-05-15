/** 裁切逻辑 */
declare type VCSSOverFlow = 'squish' | 'clip' | 'scroll' | 'noclip'
/** 排序方向 */
declare type VCSSDirection = 'up' | 'down' | 'left' | 'right'
/** 水平居中 */
declare type VCSSVerticalAlign = 'top' | 'center' | 'bottom' | 'middle'
/** 垂直居中 */
declare type VCSSHorizontalAlign = 'left' | 'center' | 'right'
/** 百分比字符串 */
declare type VCSSPercentString = `${number}%`
/** 像素字符串 */
declare type VCSSPixelsString = `${number}px`

declare type DefaultFont = 
  | "Radiance"
  | "FZLanTingHei-R-GBK"
  | "TH Sarabun New"
  | "YDYGO 540"
  | "Gulim"
  | "MingLiU"
  | "RadianceM"
  | "Reaver"
  | "Goudy Trajan Medium"
  | "FZKai-Z03"
  | "Courier New"
  | "Courier"
  | "Creepster"
  | "Valve Radus"


interface VCSSStyleDeclaration2 {
    /** 水平居中 */
    verticalAlign: VCSSVerticalAlign;

    /** 垂直居中 */
    horizontalAlign: VCSSHorizontalAlign;

    align: `${VCSSHorizontalAlign} ${VCSSVerticalAlign}`

    /**
      * 指定如何处理溢出面板可用空间的内容。 可能的值：
      * "squish" - 如果需要，孩子会被压扁以适应面板的边界（默认）
      * "clip"   - 孩子们保持他们想要的大小，但他们的内容被剪掉了
      * "scroll" - 孩子们保持他们想要的大小，并且一个滚动条被添加到这个面板
     *
     * 例子:
     * overflow: squish squish; // 在水平和垂直方向挤压内容
     * overflow: squish scroll; // 在 Y 方向滚动内容
     */
    overflow: VCSSOverFlow | `${VCSSOverFlow} ${VCSSOverFlow}`;

    /**
     * 子成员自动排列
     */
    flowChildren: VCSSDirection | `${VCSSDirection}-wrap`;

    /** 板子的宽度 */
    width: 'fit-children' | VCSSPixelsString | VCSSPercentString | `height-percentage(${VCSSPercentString})` | `fill-parent-flow(${number})`
    /** 板子的高度 */
    height: 'fit-children' | VCSSPixelsString | VCSSPercentString | `width-percentage(${VCSSPercentString})` | `fill-parent-flow(${number})`

    /** 字体文件 */
    fontFamily: DefaultFont | string

    /** 忽略父级flow样式 */
    ignoreParentFlow: boolean
}

type vcssPick = 
  | 'not'
  | 'hover'
  | 'active'
  | 'selected'
  | 'disabled'
  | 'enabled'
  | 'focus'
  | 'descendantfocus'
  | 'Selected'