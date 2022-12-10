/* eslint-disable @typescript-eslint/no-empty-interface */
import { ClassAttributes, ReactNode } from 'react';
type hisoCombination<T, S> = {
  [P in keyof S]?: P extends keyof T ? T[P] : S[P]
};
type EventHandler<T extends PanelBase> = (panel: T) => void;

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

/** 已经实现的属性 */
type PanelBaseAttributesTrue = {
  dangerouslyCreateChildren: string;
  dialogVariables: Record<string, string | number | Date>;

  id: string;
  className: string;
  style: hisoCombination<VCSSStyleDeclaration2, VCSSStyleDeclaration>;
  hittest: boolean;
  hittestchildren: boolean;
  acceptsfocus: boolean;
  tabindex: number | 'auto';
  inputnamespace: string;
  draggable: boolean;
  enabled: boolean;
  visible: boolean;
  // TODO: sectionpos: 'auto';?
}

export type PanelAttributes<T extends PanelBase = Panel> = ClassAttributes<T>
  & Partial<Record<PanelEventTrue, EventHandler<T>>>
  & Partial<PanelBaseAttributesTrue>
  & {
    children: ReactNode;
  }

type LabelBaseAttributes = {
  /**
   * Note: Using this attribute is the same as assigning `text` property on a Label panel - it does
   * not localize strings and ignores dialog variables. If you need the behavior of XML attribute,
   * use `localizedText` instead.
   */
  text: string | number;
  localizedText: string;
  html: boolean;
}

export type LabelAttributes = PanelAttributes<LabelPanel> & Partial<LabelBaseAttributes> & {
  allowtextselection?: boolean;
}

export type ImageAttributes<T extends ImagePanel = ImagePanel> = PanelAttributes<T> & {
  src?: string;
  scaling?: ScalingFunction;
}

export interface DOTAAbilityImageAttributes extends ImageAttributes<AbilityImage> {
  abilityname?: string;
  abilityid?: number;
  contextEntityIndex?: AbilityEntityIndex;
  /** @default false */
  showtooltip?: boolean;
}

export interface DOTAItemImageAttributes extends ImageAttributes<ItemImage> {
  itemname?: string;
  contextEntityIndex?: ItemEntityIndex;
  /** @default true */
  showtooltip?: boolean;
}

export interface DOTAHeroImageAttributes extends ImageAttributes<HeroImage> {
  heroname?: string;
  heroid?: HeroID;
  heroimagestyle?: 'icon' | 'portrait' | 'landscape';
  usedefaultimage?: boolean;
}

export interface DOTACountryFlagImageAttributes extends ImageAttributes {
  country_code?: string;
}

export interface DOTALeagueImageAttributes extends ImageAttributes<LeagueImage> {
  leagueid?: number;
  /** @default 'Banner' */
  leagueimagestyle?: 'Banner' | 'Square' | 'LargeIcon';
}

export interface EconItemImageAttributes extends ImageAttributes {
  itemdef: number;
}

export interface AnimatedImageStripAttributes extends ImageAttributes {
  frametime?: string;
  defaultframe?: number;
  animating?: boolean;
}

export interface DOTAEmoticonAttributes extends AnimatedImageStripAttributes {
  emoticonid?: number;
  alias?: string;
}

export type MovieAutoPlay = 'off' | 'onload' | 'onfocus';

export interface MovieAttributes extends PanelAttributes<MoviePanel> {
  src?: string;
  repeat?: boolean;
  controls?: Parameters<MoviePanel['SetControls']>[0];
  title?: string;
  /** @default 'onload' */
  autoplay?: MovieAutoPlay;
}

export interface DOTAHeroMovieAttributes extends PanelAttributes<HeroMovie> {
  heroid?: HeroID;
  heroname?: string;
  persona?: any;
  /** @default 'off' */
  autoplay?: MovieAutoPlay;
}

export interface DOTAScenePanelAttributes extends PanelAttributes<ScenePanel> {
  unit?: string;
  'activity-modifier'?: string;

  map?: string;
  camera?: string;
  light?: string;

  pitchmin?: number;
  pitchmax?: number;
  yawmin?: number;
  yawmax?: number;
  allowrotation?: boolean;
  rotateonhover?: boolean;
  rotateonmousemove?: boolean;

  // acceleration?: number;
  antialias?: boolean;
  // deferredalpha?: any;
  // drawbackground?: boolean;
  // environment?: any;
  // 'live-mode'?: any;
  panoramasurfaceheight?: number;
  panoramasurfacewidth?: number;
  panoramasurfacexml?: string;
  particleonly?: boolean;
  // 'pin-fov'?: any;
  renderdeferred?: boolean;
  rendershadows?: boolean;
  // renderwaterreflections?: boolean;
}

export interface DOTAParticleScenePanelAttributes extends DOTAScenePanelAttributes {
  particleName?: string;
  cameraOrigin?: [number, number, number] | string;
  lookAt?: [number, number, number] | string;
  fov?: number;
  squarePixels?: boolean;
  startActive?: boolean;
}

export interface DOTAEconItemAttributes extends PanelAttributes<EconItemPanel> {
  itemdef: number;
  itemstyle?: number;
}

// export type ProgressBarAttributes = PanelAttributes<ProgressBar> & Partial<ProgressBar>
// export type CircularProgressBarAttributes = PanelAttributes<CircularProgressBar> & Partial<CircularProgressBar>
// export type ProgressBarWithMiddleAttributes = PanelAttributes<ProgressBarWithMiddle> & Partial<ProgressBarWithMiddle>

export interface ProgressBarAttributes extends PanelAttributes<ProgressBar> {
  value?: number;
  min?: number;
  max?: number;
}

export interface CircularProgressBarAttributes extends PanelAttributes<CircularProgressBar> {
  value?: number;
  min?: number;
  max?: number;
}

export interface ProgressBarWithMiddleAttributes extends PanelAttributes<ProgressBarWithMiddle> {
  lowervalue?: number;
  uppervalue?: number;
  min?: number;
  max?: number;
}

export type DOTAUserNameAttributes = PanelAttributes<UserName> & {
  steamid?: string | 'local';
}

export interface DOTAUserRichPresenceAttributes extends PanelAttributes<UserRichPresence> {
  steamid?: string | 'local';
}

export interface DOTAAvatarImageAttributes extends PanelAttributes<AvatarImage> {
  steamid?: string | 'local';
  nocompendiumborder?: boolean;
  lazy?: boolean;
}

export interface CountdownAttributes extends PanelAttributes<CountdownPanel> {
  startTime?: number;
  endTime: number;
  /** @default 1 */
  updateInterval?: number;
  /** @default 'countdown_time' */
  timeDialogVariable?: string;
}

export type TextButtonAttributes = PanelAttributes<TextButton> & Partial<LabelBaseAttributes>

type RadioButtonBaseAttributes = {
  selected: boolean; // checked?
  onselect: EventHandler<RadioButton>;
  ondeselect: EventHandler<RadioButton>;
}
export type ToggleButtonAttributes = PanelAttributes<ToggleButton> & Partial<LabelBaseAttributes> & Partial<RadioButtonBaseAttributes>

export type RadioButtonAttributes = PanelAttributes<RadioButton> & Partial<RadioButtonBaseAttributes> & {
  group?: string;
  text?: string;
  html?: boolean;
}

export interface TextEntryAttributes extends PanelAttributes<TextEntry> {
  multiline?: boolean;
  placeholder?: string;
  maxchars?: number;
  textmode?: 'normal' | 'password' | 'numeric' | 'numericpassword';

  text?: string;
  ontextentrychange?: EventHandler<TextEntry>;
  oninputsubmit?: EventHandler<TextEntry>;
  // ontextentrysubmit doesn't seem to be ever triggered
}

export interface NumberEntryAttributes extends PanelAttributes<NumberEntry> {
  value?: number;
  onvaluechanged?: EventHandler<NumberEntry>;
  /** @default 0 */
  min?: number;
  /** @default 1000000 */
  max?: number;
  /** @default 1 */
  increment?: number;
}

export interface SliderAttributes<T extends SliderPanel = SliderPanel> extends PanelAttributes<T> {
  style?: never;

  value?: number;
  onvaluechanged?: EventHandler<T>;

  /** @default 0 */
  min?: number;

  /** @default 1 */
  max?: number;

  /**
   * Note: to make slider horizontal it also should have a `HorizontalSlider` class.
   *
   * @default 'vertical'
   */
  direction?: 'vertical' | 'horizontal';
}

export interface SlottedSliderAttributes<T extends SlottedSlider = SlottedSlider>
  extends SliderAttributes<T> {
  notches?: number;
}

export interface DropDownAttributes extends PanelAttributes<DropDown> {
  selected?: string;
  oninputsubmit?: EventHandler<DropDown>;
}

// Untested
export interface CarouselAttributes extends PanelAttributes<CarouselPanel> {
  focus?: 'center' | 'edge';
  'focus-offset'?: string;
  wrap?: boolean;
  selectionposboundary?: string;
  'panels-visible'?: number;
  clipaftertransform?: boolean;
  AllowOversized?: any;
  'autoscroll-delay'?: string;
  'x-offset'?: string;
}

export interface CarouselNavAttributes extends PanelAttributes {
  carouselid?: string;
}

export interface DOTAHUDOverlayMapAttributes extends PanelAttributes<HUDOverlayMap> {
  maptexture?: string;
  /** @default 4 */
  mapscale?: number;
  /** @default true */
  mapscroll?: boolean;
  /** @default false */
  fixedoffsetenabled?: boolean;
  fixedOffset?: { x: number; y: number; };
  fixedBackgroundTexturePosition?: { size: number; x: number; y: number; };
}

export interface HTMLAttributes extends PanelAttributes<HTML> {
  url?: string;
  // SetIgnoreCursor doesn't seem to do anything
}

export interface TabButtonAttributes extends PanelAttributes {
  group?: string;
  localizedText?: string;
  html?: boolean;

  selected?: boolean;
  onselect?: EventHandler<Panel>;
  ondeselect?: EventHandler<Panel>;
}

export interface TabContentsAttributes extends PanelAttributes {
  tabid?: string;
  group?: string;

  selected?: boolean;
  onselect?: EventHandler<Panel>;
  ondeselect?: EventHandler<Panel>;
}

export interface CustomLayoutPanelAttributes extends PanelAttributes {
  layout: string;
}

export interface GenericPanelAttributes extends PanelAttributes {
  type: string;
  [key: string]: any;
}
