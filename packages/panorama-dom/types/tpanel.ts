import { ExoticComponent } from "react";
import { PanelAttributesExpand } from "./attributes";

export type PanelType =
    | 'Panel'
    | 'Label'

    | 'Image'
    | 'DOTAAbilityImage'
    | 'DOTAItemImage'
    | 'DOTAHeroImage'
    | 'DOTACountryFlagImage'
    | 'DOTALeagueImage'
    | 'EconItemImage'

    | 'AnimatedImageStrip'
    | 'DOTAEmoticon'

    | 'Movie'
    | 'DOTAHeroMovie'

    | 'DOTAScenePanel'
    | 'DOTAParticleScenePanel'
    | 'DOTAEconItem'

    | 'ProgressBar'
    | 'CircularProgressBar'
    | 'ProgressBarWithMiddle'

    | 'DOTAUserName'
    | 'DOTAUserRichPresence'
    | 'DOTAAvatarImage'

    | 'Countdown'

    | 'Button'
    | 'TextButton'
    | 'ToggleButton'
    | 'RadioButton'

    | 'TextEntry'
    | 'NumberEntry'
    | 'Slider'
    | 'SlottedSlider'

    | 'DropDown'
    | 'ContextMenuScript'

    | 'Carousel'
    | 'CarouselNav'

    | 'DOTAHUDOverlayMap'
    | 'DOTAMinimap'

    | 'HTML'

    | 'TabButton'
    | 'TabContents'

    | 'CustomLayoutPanel'
    | 'GenericPanel'


export type PNC<T =any> = Record<PanelType, T>

export type DivByPanelType<T extends PanelType> = PanoramaPanelNameMap[Extract<
    T,
    keyof PanoramaPanelNameMap
>];

export type panoramaDiv<T extends PanelType> = ExoticComponent<PanelAttributesExpand[T]>
