/** 裁切逻辑 */
declare type VCSSOverFlow = 'squish' | 'clip' | 'scroll' | 'noclip'
/** 排序方向 */
declare type VCSSDirection = 'up' | 'down' | 'left' | 'right'
/** 水平居中 */
declare type VCSSVerticalAlign = 'top' | 'center' | 'bottom' | 'middle'
/** 垂直居中 */
declare type VCSSHorizontalAlign = 'left' | 'center' | 'right'


interface VCSSStyleDeclaration {
    /** 水平居中 */
    verticalAlign: VCSSVerticalAlign | null;

    /** 垂直居中 */
    horizontalAlign: VCSSHorizontalAlign | null;

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
    overflow: VCSSOverFlow | `${VCSSOverFlow} ${VCSSOverFlow}` | null;

    /**
     * 子成员自动排列
     */
    flowChildren: VCSSDirection | `${VCSSDirection}-wrap` | null;

    /** 板子的宽度 */
    width: `${number}px` | `${number}%` | `height-percentage(${number}%)`
    /** 板子的高度 */
    height: `${number}px` | `${number}%` | `width-percentage(${number}%)`
}