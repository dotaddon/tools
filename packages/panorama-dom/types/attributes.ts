import { panelStyles } from "./utils"
import {PNC} from "./tpanel"

export type MovieAutoPlay = 'off' | 'onload' | 'onfocus'
export interface panoramaBaseDivMember {
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

export interface panoramaDivMember extends PNC {
    Panel: {
        dangerouslyCreateChildren: string
        dialogVariables: Record<string, string | number | Date>

        id: string
        className: string
        style: panelStyles
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
    Label: panoramaBaseDivMember['Label'] & {
        allowtextselection: boolean
    }

    Image: panoramaBaseDivMember['Image']
    DOTAAbilityImage:  panoramaBaseDivMember['Image'] & {
        abilityname: string
        abilityid: number
        contextEntityIndex: AbilityEntityIndex
        /** @default false */
        showtooltip: boolean
    }
    DOTAItemImage: panoramaBaseDivMember['Image'] &  {
        itemname: string
        contextEntityIndex: ItemEntityIndex
        /** @default true */
        showtooltip: boolean
    }
    DOTAHeroImage: panoramaBaseDivMember['Image'] & {
        heroname: string
        heroid: HeroID
        heroimagestyle: 'icon' | 'portrait' | 'landscape'
        usedefaultimage: boolean
    }
    DOTACountryFlagImage: panoramaBaseDivMember['Image']& {
        country_code: string
    }
    DOTALeagueImage: panoramaBaseDivMember['Image'] &  {
        leagueid: number
        /** @default 'Banner' */
        leagueimagestyle: 'Banner' | 'Square' | 'LargeIcon'
    }
    EconItemImage: panoramaBaseDivMember['Image'] & {
        itemdef: number
    }

    AnimatedImageStrip: panoramaBaseDivMember['Image'] & {
        frametime: string
        defaultframe: number
        animating: boolean
    }
    DOTAEmoticon: panoramaDivMember['AnimatedImageStrip'] & {
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

    DOTAScenePanel: panoramaBaseDivMember['DOTAScenePanel']
    DOTAParticleScenePanel: panoramaBaseDivMember['DOTAScenePanel'] & {
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

    DOTAUserName: panoramaBaseDivMember['DOTAUserName']
    DOTAUserRichPresence: panoramaBaseDivMember['DOTAUserName']
    DOTAAvatarImage: panoramaBaseDivMember['DOTAUserName'] &  {
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
    TextButton: panoramaBaseDivMember['Label']
    ToggleButton: panoramaBaseDivMember['Label'] & panoramaBaseDivMember['ToggleButton']
    RadioButton: panoramaBaseDivMember['ToggleButton'] & {
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
    Slider: panoramaBaseDivMember['Slider']
    SlottedSlider: panoramaBaseDivMember['Slider'] & {
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

