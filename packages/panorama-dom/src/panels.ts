import { ExoticComponent } from 'react';
import { panoramaDivAcitve } from '../types/active';
import { panoramaDivMember } from '../types/attributes';
import { reactRequ } from '../types/utils';

export interface AttributesByPanel {
  Panel: reactRequ<Panel> & Partial<panoramaDivAcitve<Panel> & panoramaDivMember['Panel']>
  Label: reactRequ<LabelPanel> & Partial<panoramaDivAcitve<LabelPanel> & panoramaDivMember['Label']>
  Image: reactRequ<ImagePanel> & Partial<panoramaDivAcitve<ImagePanel> & panoramaDivMember['Image']>
  DOTAAbilityImage: reactRequ<AbilityImage> & Partial<panoramaDivAcitve<AbilityImage> & panoramaDivMember['DOTAAbilityImage']>
  DOTAItemImage: reactRequ<ItemImage> & Partial<panoramaDivAcitve<ItemImage> & panoramaDivMember['DOTAItemImage']>
  DOTAHeroImage: reactRequ<HeroImage> & Partial<panoramaDivAcitve<HeroImage> & panoramaDivMember['DOTAHeroImage']>
  DOTACountryFlagImage: reactRequ<ImagePanel> & Partial<panoramaDivAcitve<ImagePanel> & panoramaDivMember['DOTACountryFlagImage']>
  DOTALeagueImage: reactRequ<LeagueImage> & Partial<panoramaDivAcitve<LeagueImage> & panoramaDivMember['DOTALeagueImage']>
  EconItemImage: reactRequ<ImagePanel> & Partial<panoramaDivAcitve<ImagePanel> & panoramaDivMember['EconItemImage']>
  AnimatedImageStrip: reactRequ<AnimatedImageStrip> & Partial<panoramaDivAcitve<AnimatedImageStrip> & panoramaDivMember['AnimatedImageStrip']>
  DOTAEmoticon: reactRequ<AnimatedImageStrip> & Partial<panoramaDivAcitve<AnimatedImageStrip> & panoramaDivMember['DOTAEmoticon']>
  Movie: reactRequ<MoviePanel> & Partial<panoramaDivAcitve<MoviePanel> & panoramaDivMember['Movie']>
  DOTAHeroMovie: reactRequ<HeroMovie> & Partial<panoramaDivAcitve<HeroMovie> & panoramaDivMember['DOTAHeroMovie']>
  DOTAScenePanel: reactRequ<ScenePanel> & Partial<panoramaDivAcitve<ScenePanel> & panoramaDivMember['DOTAScenePanel']>
  DOTAParticleScenePanel: reactRequ<ScenePanel> & Partial<panoramaDivAcitve<ScenePanel> & panoramaDivMember['DOTAParticleScenePanel']>
  DOTAEconItem: reactRequ<EconItemPanel> & Partial<panoramaDivAcitve<EconItemPanel> & panoramaDivMember['DOTAEconItem']>
  ProgressBar: reactRequ<ProgressBar> & Partial<panoramaDivAcitve<ProgressBar> & panoramaDivMember['ProgressBar']>
  CircularProgressBar: reactRequ<CircularProgressBar> & Partial<panoramaDivAcitve<CircularProgressBar> & panoramaDivMember['CircularProgressBar']>
  ProgressBarWithMiddle: reactRequ<ProgressBarWithMiddle> & Partial<panoramaDivAcitve<ProgressBarWithMiddle> & panoramaDivMember['ProgressBarWithMiddle']>
  DOTAUserName: reactRequ<UserName> & Partial<panoramaDivAcitve<UserName> & panoramaDivMember['DOTAUserName']>
  DOTAUserRichPresence: reactRequ<UserRichPresence> & Partial<panoramaDivAcitve<UserRichPresence> & panoramaDivMember['DOTAUserRichPresence']>
  DOTAAvatarImage: reactRequ<AvatarImage> & Partial<panoramaDivAcitve<AvatarImage> & panoramaDivMember['DOTAAvatarImage']>
  Countdown: reactRequ<CountdownPanel> & Partial<panoramaDivAcitve<CountdownPanel> & panoramaDivMember['Countdown']>
  Button: reactRequ<Button> & Partial<panoramaDivAcitve<Button> & panoramaDivMember['Button']>
  TextButton: reactRequ<TextButton> & Partial<panoramaDivAcitve<TextButton> & panoramaDivMember['TextButton']>
  ToggleButton: reactRequ<ToggleButton> & Partial<panoramaDivAcitve<ToggleButton> & panoramaDivMember['ToggleButton']>
  RadioButton: reactRequ<RadioButton> & Partial<panoramaDivAcitve<RadioButton> & panoramaDivMember['RadioButton']>
  TextEntry: reactRequ<TextEntry> & Partial<panoramaDivAcitve<TextEntry> & panoramaDivMember['TextEntry']>
  NumberEntry: reactRequ<NumberEntry> & Partial<panoramaDivAcitve<NumberEntry> & panoramaDivMember['NumberEntry']>
  Slider: reactRequ<SliderPanel> & Partial<panoramaDivAcitve<SliderPanel> & panoramaDivMember['Slider']>
  SlottedSlider: reactRequ<SlottedSlider> & Partial<panoramaDivAcitve<SlottedSlider> & panoramaDivMember['SlottedSlider']>
  DropDown: reactRequ<DropDown> & Partial<panoramaDivAcitve<DropDown> & panoramaDivMember['DropDown']>
  ContextMenuScript: reactRequ & Partial<panoramaDivAcitve & panoramaDivMember['ContextMenuScript']>
  Carousel: reactRequ<CarouselPanel> & Partial<panoramaDivAcitve<CarouselPanel> & panoramaDivMember['Carousel']>
  CarouselNav: reactRequ & Partial<panoramaDivAcitve & panoramaDivMember['CarouselNav']>
  DOTAHUDOverlayMap: reactRequ<HUDOverlayMap> & Partial<panoramaDivAcitve<HUDOverlayMap> & panoramaDivMember['DOTAHUDOverlayMap']>
  DOTAMinimap: reactRequ & Partial<panoramaDivAcitve & panoramaDivMember['DOTAMinimap']>
  HTML: reactRequ<HTML> & Partial<panoramaDivAcitve<HTML> & panoramaDivMember['HTML']>
  TabButton: reactRequ & Partial<panoramaDivAcitve & panoramaDivMember['TabButton']>
  TabContents: reactRequ & Partial<panoramaDivAcitve & panoramaDivMember['TabContents']>
  CustomLayoutPanel: reactRequ & Partial<panoramaDivAcitve & panoramaDivMember['CustomLayoutPanel']>
  GenericPanel: reactRequ & Partial<panoramaDivAcitve & panoramaDivMember['GenericPanel']>
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