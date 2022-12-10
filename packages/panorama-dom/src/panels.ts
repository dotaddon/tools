import { ExoticComponent } from 'react';
import { panoramaDivAcitve } from '../types/active';
import { panoramaDivMember } from '../types/attributes';
import { PanelType, PanelTypeByName, PNC } from '../types/tpanel';
import { reactRequ } from '../types/utils';

type WWWW<T extends PanelType = 'Panel'> = reactRequ<PanelTypeByName<T>>
    & Partial<panoramaDivAcitve<T>
        & panoramaDivMember[T]
        & panoramaDivMember['Panel']
    >

export interface AttributesByPanel extends PNC {
    Panel: WWWW<'Panel'>
    Label: WWWW<'Label'>
    Image: WWWW<'Image'>
    DOTAAbilityImage: WWWW<'DOTAAbilityImage'>
    DOTAItemImage: WWWW<'DOTAItemImage'>
    DOTAHeroImage: WWWW<'DOTAHeroImage'>
    DOTACountryFlagImage: WWWW<'DOTACountryFlagImage'>
    DOTALeagueImage: WWWW<'DOTALeagueImage'>
    EconItemImage: WWWW<'EconItemImage'>
    AnimatedImageStrip: WWWW<'AnimatedImageStrip'>
    DOTAEmoticon: WWWW<'DOTAEmoticon'>
    Movie: WWWW<'Movie'>
    DOTAHeroMovie: WWWW<'DOTAHeroMovie'>
    DOTAScenePanel: WWWW<'DOTAScenePanel'>
    DOTAParticleScenePanel: WWWW<'DOTAParticleScenePanel'>
    DOTAEconItem: WWWW<'DOTAEconItem'>
    ProgressBar: WWWW<'ProgressBar'>
    CircularProgressBar: WWWW<'CircularProgressBar'>
    ProgressBarWithMiddle: WWWW<'ProgressBarWithMiddle'>
    DOTAUserName: WWWW<'DOTAUserName'>
    DOTAUserRichPresence: WWWW<'DOTAUserRichPresence'>
    DOTAAvatarImage: WWWW<'DOTAAvatarImage'>
    Countdown: WWWW<'Countdown'>
    Button: WWWW<'Button'>
    TextButton: WWWW<'TextButton'>
    ToggleButton: WWWW<'ToggleButton'>
    RadioButton: WWWW<'RadioButton'>
    TextEntry: WWWW<'TextEntry'>
    NumberEntry: WWWW<'NumberEntry'>
    Slider: WWWW<'Slider'>
    SlottedSlider: WWWW<'SlottedSlider'>
    DropDown: WWWW<'DropDown'>
    ContextMenuScript: WWWW<'ContextMenuScript'>
    Carousel: WWWW<'Carousel'>
    CarouselNav: WWWW<'CarouselNav'>
    DOTAHUDOverlayMap: WWWW<'DOTAHUDOverlayMap'>
    DOTAMinimap: WWWW<'DOTAMinimap'>
    HTML: WWWW<'HTML'>
    TabButton: WWWW<'TabButton'>
    TabContents: WWWW<'TabContents'>
    CustomLayoutPanel: WWWW<'CustomLayoutPanel'>
    GenericPanel: WWWW<'GenericPanel'>
}

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