import { PanelStyles } from "./utils"
import {PNC} from "./tpanel"

type MovieAutoPlay = 'off' | 'onload' | 'onfocus'
/** 初始板属性 用于继承 */
export interface PanelAttributesBase extends PNC<Record<string,any>> {
    Label:{
        /**
         * Note: Using this attribute is the same as assigning `text` property on a Label panel - it does
         * not localize strings and ignores dialog variables. If you need the behavior of XML attribute,
         * use `localizedText` instead.
         */
        text: string | number
        localizedText: string
        html: boolean
    }
    Image:{
        src: string
        scaling: ScalingFunction
    }
    ToggleButton:{
        selected: boolean // checked?
    }
    Slider:{
        style?: never
        value: number
        /** @default 0 */
        min: number
        /** @default 1 */
        max: number
        /**
         * Note: to make slider horizontal it also should have a `HorizontalSlider` class.
         *
         * @default 'vertical'
         */
        direction: 'vertical' | 'horizontal'
    }
    DOTAUserName: {
        steamid: string | 'local'
    }

    DOTAScenePanel: {
        unit: string
        'activity-modifier': string

        map: string
        camera: string
        light: string

        pitchmin: number
        pitchmax: number
        yawmin: number
        yawmax: number
        allowrotation: boolean
        rotateonhover: boolean
        rotateonmousemove: boolean

        // acceleration: number
        antialias: boolean
        // deferredalpha: any
        // drawbackground: boolean
        // environment: any
        // 'live-mode': any
        panoramasurfaceheight: number
        panoramasurfacewidth: number
        panoramasurfacexml: string
        particleonly: boolean
        // 'pin-fov': any
        renderdeferred: boolean
        rendershadows: boolean
        // renderwaterreflections: boolean
    }
}
/** 板属性 */
export interface PanelAttributes extends PNC<Record<string, any>> {
    Panel: {
        dangerouslyCreateChildren: string
        dialogVariables: Record<string, string | number | Date>

        id: string
        className: string
        style: PanelStyles
        hittest: boolean
        hittestchildren: boolean
        acceptsfocus: boolean
        tabindex: number | 'auto'
        inputnamespace: string
        draggable: boolean
        enabled: boolean
        visible: boolean
        // TODO: sectionpos: 'auto'?
    }
    Label: PanelAttributesBase['Label'] & {
        allowtextselection: boolean
    }

    Image: PanelAttributesBase['Image']
    DOTAAbilityImage:  PanelAttributesBase['Image'] & {
        abilityname: string
        abilityid: number
        contextEntityIndex: AbilityEntityIndex
        /** @default false */
        showtooltip: boolean
    }
    DOTAItemImage: PanelAttributesBase['Image'] &  {
        itemname: string
        contextEntityIndex: ItemEntityIndex
        /** @default true */
        showtooltip: boolean
    }
    DOTAHeroImage: PanelAttributesBase['Image'] & {
        heroname: string
        heroid: HeroID
        heroimagestyle: 'icon' | 'portrait' | 'landscape'
        usedefaultimage: boolean
    }
    DOTACountryFlagImage: PanelAttributesBase['Image']& {
        country_code: string
    }
    DOTALeagueImage: PanelAttributesBase['Image'] &  {
        leagueid: number
        /** @default 'Banner' */
        leagueimagestyle: 'Banner' | 'Square' | 'LargeIcon'
    }
    EconItemImage: PanelAttributesBase['Image'] & {
        itemdef: number
    }

    AnimatedImageStrip: PanelAttributesBase['Image'] & {
        frametime: string
        defaultframe: number
        animating: boolean
    }
    DOTAEmoticon: PanelAttributes['AnimatedImageStrip'] & {
        emoticonid: number
        alias: string
    }

    Movie: {
        src: string
        repeat: boolean
        controls: Parameters<MoviePanel['SetControls']>[0]
        title: string
        /** @default 'onload' */
        autoplay: MovieAutoPlay
    }
    DOTAHeroMovie: {
        heroid: HeroID
        heroname: string
        persona: any
        /** @default 'off' */
        autoplay: MovieAutoPlay
    }

    DOTAScenePanel: PanelAttributesBase['DOTAScenePanel']
    DOTAParticleScenePanel: PanelAttributesBase['DOTAScenePanel'] & {
        particleName: string
        cameraOrigin: [number, number, number] | string
        lookAt: [number, number, number] | string
        fov: number
        squarePixels: boolean
        startActive: boolean
    }
    DOTAEconItem: {
        itemdef: number
        itemstyle: number
    }

    ProgressBar: {
        value: number
        min: number
        max: number
    }
    CircularProgressBar: {
        value: number
        min: number
        max: number
    }
    ProgressBarWithMiddle: {
        lowervalue: number
        uppervalue: number
        min: number
        max: number
    }

    DOTAUserName: PanelAttributesBase['DOTAUserName']
    DOTAUserRichPresence: PanelAttributesBase['DOTAUserName']
    DOTAAvatarImage: PanelAttributesBase['DOTAUserName'] &  {
        nocompendiumborder: boolean
        lazy: boolean
    }

    Countdown: {
        startTime: number
        endTime: number
        /** @default 1 */
        updateInterval: number
        /** @default 'countdown_time' */
        timeDialogVariable: string
    }

    Button: {}
    TextButton: PanelAttributesBase['Label']
    ToggleButton: PanelAttributesBase['Label'] & PanelAttributesBase['ToggleButton']
    RadioButton: PanelAttributesBase['ToggleButton'] & {
        group: string
        text: string
        html: boolean
    }

    TextEntry: {
        multiline: boolean
        placeholder: string
        maxchars: number
        textmode: 'normal' | 'password' | 'numeric' | 'numericpassword'

        text: string
    }
    NumberEntry: {
        value: number
        /** @default 0 */
        min: number
        /** @default 1000000 */
        max: number
        /** @default 1 */
        increment: number
    }
    Slider: PanelAttributesBase['Slider']
    SlottedSlider: PanelAttributesBase['Slider'] & {
        notches: number
    }

    DropDown: {
        selected: string
    }
    ContextMenuScript: {}

    Carousel: {
        focus: 'center' | 'edge'
        'focus-offset': string
        wrap: boolean
        selectionposboundary: string
        'panels-visible': number
        clipaftertransform: boolean
        AllowOversized: any
        'autoscroll-delay': string
        'x-offset': string
    }
    CarouselNav: {
        carouselid: string
    }

    DOTAHUDOverlayMap: {
        maptexture: string
        /** @default 4 */
        mapscale: number
        /** @default true */
        mapscroll: boolean
        /** @default false */
        fixedoffsetenabled: boolean
        fixedOffset: { x: number ;y: number }
        fixedBackgroundTexturePosition: { size: number; x: number; y: number }

    }
    DOTAMinimap: {}

    HTML: {

        url: string
  // SetIgnoreCursor doesn't seem to do anything
    }

    TabButton: {
        group: string
        localizedText: string
        html: boolean

        selected: boolean
    }
    TabContents: {

        tabid: string
        group: string

        selected: boolean
    }

    CustomLayoutPanel: {
        layout: string
    }
    GenericPanel: {
        type: string
        [key: string]: any
    }
}

