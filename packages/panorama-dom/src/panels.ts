import { ExoticComponent } from 'react';
import { DropDownEvent, panoramaDivAcitve, SliderEvent, TabButtonEvent, TextEntryEvent } from '../types/active';
import { panoramaBaseDivMember, panoramaDivMember } from '../types/attributes';
import { reactRequ } from '../types/utils';

export interface AttributesByPanel {
  Panel: reactRequ<Panel> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<Panel> & panoramaDivMember['Panel']>
  Label: reactRequ<LabelPanel> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<LabelPanel> & panoramaDivMember['Label']>
  Image: reactRequ<ImagePanel> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<ImagePanel> & panoramaDivMember['Image']>
  DOTAAbilityImage: reactRequ<AbilityImage> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<AbilityImage> & panoramaDivMember['DOTAAbilityImage']>
  DOTAItemImage: reactRequ<ItemImage> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<ItemImage> & panoramaDivMember['DOTAItemImage']>
  DOTAHeroImage: reactRequ<HeroImage> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<HeroImage> & panoramaDivMember['DOTAHeroImage']>
  DOTACountryFlagImage: reactRequ<ImagePanel> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<ImagePanel> & panoramaDivMember['DOTACountryFlagImage']>
  DOTALeagueImage: reactRequ<LeagueImage> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<LeagueImage> & panoramaDivMember['DOTALeagueImage']>
  EconItemImage: reactRequ<ImagePanel> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<ImagePanel> & panoramaDivMember['EconItemImage']>
  AnimatedImageStrip: reactRequ<AnimatedImageStrip> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<AnimatedImageStrip> & panoramaDivMember['AnimatedImageStrip']>
  DOTAEmoticon: reactRequ<AnimatedImageStrip> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<AnimatedImageStrip> & panoramaDivMember['DOTAEmoticon']>
  Movie: reactRequ<MoviePanel> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<MoviePanel> & panoramaDivMember['Movie']>
  DOTAHeroMovie: reactRequ<HeroMovie> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<HeroMovie> & panoramaDivMember['DOTAHeroMovie']>
  DOTAScenePanel: reactRequ<ScenePanel> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<ScenePanel> & panoramaDivMember['DOTAScenePanel']>
  DOTAParticleScenePanel: reactRequ<ScenePanel> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<ScenePanel> & panoramaDivMember['DOTAParticleScenePanel']>
  DOTAEconItem: reactRequ<EconItemPanel> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<EconItemPanel> & panoramaDivMember['DOTAEconItem']>
  ProgressBar: reactRequ<ProgressBar> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<ProgressBar> & panoramaDivMember['ProgressBar']>
  CircularProgressBar: reactRequ<CircularProgressBar> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<CircularProgressBar> & panoramaDivMember['CircularProgressBar']>
  ProgressBarWithMiddle: reactRequ<ProgressBarWithMiddle> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<ProgressBarWithMiddle> & panoramaDivMember['ProgressBarWithMiddle']>
  DOTAUserName: reactRequ<UserName> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<UserName> & panoramaDivMember['DOTAUserName']>
  DOTAUserRichPresence: reactRequ<UserRichPresence> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<UserRichPresence> & panoramaDivMember['DOTAUserRichPresence']>
  DOTAAvatarImage: reactRequ<AvatarImage> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<AvatarImage> & panoramaDivMember['DOTAAvatarImage']>
  Countdown: reactRequ<CountdownPanel> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<CountdownPanel> & panoramaDivMember['Countdown']>
  Button: reactRequ<Button> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<Button> & panoramaDivMember['Button']>
  TextButton: reactRequ<TextButton> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<TextButton> & panoramaDivMember['TextButton']>
  ToggleButton: reactRequ<ToggleButton> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<ToggleButton> & TabButtonEvent<ToggleButton> & panoramaDivMember['ToggleButton']>
  RadioButton: reactRequ<RadioButton> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<RadioButton> & TabButtonEvent<RadioButton>& panoramaDivMember['RadioButton']>
  TextEntry: reactRequ<TextEntry> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<TextEntry> & TextEntryEvent & panoramaDivMember['TextEntry']>
  NumberEntry: reactRequ<NumberEntry> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<NumberEntry> & SliderEvent<NumberEntry> & panoramaDivMember['NumberEntry']>
  Slider: reactRequ<SliderPanel> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<SliderPanel> & SliderEvent<SliderPanel>& panoramaDivMember['Slider']>
  SlottedSlider: reactRequ<SlottedSlider> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<SlottedSlider> & SliderEvent<SlottedSlider> & panoramaDivMember['SlottedSlider']>
  DropDown: reactRequ<DropDown> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<DropDown> & DropDownEvent & panoramaDivMember['DropDown']>
  ContextMenuScript: reactRequ & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve & panoramaDivMember['ContextMenuScript']>
  Carousel: reactRequ<CarouselPanel> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<CarouselPanel> & panoramaDivMember['Carousel']>
  CarouselNav: reactRequ & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve & panoramaDivMember['CarouselNav']>
  DOTAHUDOverlayMap: reactRequ<HUDOverlayMap> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<HUDOverlayMap> & panoramaDivMember['DOTAHUDOverlayMap']>
  DOTAMinimap: reactRequ & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve & panoramaDivMember['DOTAMinimap']>
  HTML: reactRequ<HTML> & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve<HTML> & panoramaDivMember['HTML']>
  TabButton: reactRequ & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve & TabButtonEvent & panoramaDivMember['TabButton']>
  TabContents: reactRequ & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve & TabButtonEvent & panoramaDivMember['TabContents']>
  CustomLayoutPanel: reactRequ & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve & panoramaDivMember['CustomLayoutPanel']>
  GenericPanel: reactRequ & Partial<panoramaBaseDivMember['Panel'] & panoramaDivAcitve & panoramaDivMember['GenericPanel']>
}

export type PanelType = keyof AttributesByPanel;
export type PanelTypeByName<T extends PanelType> = PanoramaPanelNameMap[Extract<
  T,
  keyof PanoramaPanelNameMap
>];
export type panoramaDiv<T extends PanelType> = ExoticComponent<AttributesByPanel[T]>

declare global {
  /* eslint-disable no-var, vars-on-top */
  var Panel: panoramaDiv<'Panel'>
  var Label: panoramaDiv<'Label'>

  var Image: panoramaDiv<'Image'>
  var DOTAAbilityImage: panoramaDiv<'DOTAAbilityImage'>
  var DOTAItemImage: panoramaDiv<'DOTAItemImage'>
  var DOTAHeroImage: panoramaDiv<'DOTAHeroImage'>
  var DOTACountryFlagImage: panoramaDiv<'DOTACountryFlagImage'>
  var DOTALeagueImage: panoramaDiv<'DOTALeagueImage'>
  var EconItemImage: panoramaDiv<'EconItemImage'>

  var AnimatedImageStrip: panoramaDiv<'AnimatedImageStrip'>
  var DOTAEmoticon: panoramaDiv<'DOTAEmoticon'>

  var Movie: panoramaDiv<'Movie'>
  var DOTAHeroMovie: panoramaDiv<'DOTAHeroMovie'>

  var DOTAScenePanel: panoramaDiv<'DOTAScenePanel'>
  var DOTAParticleScenePanel: panoramaDiv<'DOTAParticleScenePanel'>
  var DOTAEconItem: panoramaDiv<'DOTAEconItem'>

  var ProgressBar: panoramaDiv<'ProgressBar'>
  var CircularProgressBar: panoramaDiv<'CircularProgressBar'>
  var ProgressBarWithMiddle: panoramaDiv<'ProgressBarWithMiddle'>

  var DOTAUserName: panoramaDiv<'DOTAUserName'>
  var DOTAUserRichPresence: panoramaDiv<'DOTAUserRichPresence'>
  var DOTAAvatarImage: panoramaDiv<'DOTAAvatarImage'>

  var Countdown: panoramaDiv<'Countdown'>

  var Button: panoramaDiv<'Button'>
  var TextButton: panoramaDiv<'TextButton'>
  var ToggleButton: panoramaDiv<'ToggleButton'>
  var RadioButton: panoramaDiv<'RadioButton'>

  var TextEntry: panoramaDiv<'TextEntry'>
  var NumberEntry: panoramaDiv<'NumberEntry'>
  var Slider: panoramaDiv<'Slider'>
  var SlottedSlider: panoramaDiv<'SlottedSlider'>

  var DropDown: panoramaDiv<'DropDown'>
  var ContextMenuScript: panoramaDiv<'ContextMenuScript'>

  var Carousel: panoramaDiv<'Carousel'>
  var CarouselNav: panoramaDiv<'CarouselNav'>

  var DOTAHUDOverlayMap: panoramaDiv<'DOTAHUDOverlayMap'>
  var DOTAMinimap: panoramaDiv<'DOTAMinimap'>

  var HTML: panoramaDiv<'HTML'>

  var TabButton: panoramaDiv<'TabButton'>
  var TabContents: panoramaDiv<'TabContents'>

  var CustomLayoutPanel: panoramaDiv<'CustomLayoutPanel'>
  /**
   * This element allows to render any unsupported Panorama panel type.
   * All unknown attributes are assumed to be XML properties.
   *
   * @example
   * return (
   *   <GenericPanel
   *     type="DOTABuffList"
   *     showdebuffs={false}
   *     style={{ backgroundColor: 'black' }}
   *   />
   * );
   */
  var GenericPanel: panoramaDiv<'GenericPanel'>;
  /* eslint-enable */
}

// eslint-disable-next-line no-new-func
const global: typeof globalThis = new Function('return this')();

for (const panelName of [
  'Panel',
  'Label',

  'Image',
  'DOTAAbilityImage',
  'DOTAItemImage',
  'DOTAHeroImage',
  'DOTACountryFlagImage',
  'DOTALeagueImage',
  'EconItemImage',

  'AnimatedImageStrip',
  'DOTAEmoticon',

  'Movie',
  'DOTAHeroMovie',

  'DOTAScenePanel',
  'DOTAParticleScenePanel',
  'DOTAEconItem',

  'ProgressBar',
  'CircularProgressBar',
  'ProgressBarWithMiddle',

  'DOTAUserName',
  'DOTAUserRichPresence',
  'DOTAAvatarImage',

  'Countdown',

  'Button',
  'TextButton',
  'ToggleButton',
  'RadioButton',

  'TextEntry',
  'NumberEntry',
  'Slider',
  'SlottedSlider',

  'DropDown',
  'ContextMenuScript',

  'Carousel',
  'CarouselNav',

  'DOTAHUDOverlayMap',
  'DOTAMinimap',

  'HTML',

  'TabButton',
  'TabContents',

  'CustomLayoutPanel',
  'GenericPanel',
] as const) {
  global[panelName] = panelName as any;
}