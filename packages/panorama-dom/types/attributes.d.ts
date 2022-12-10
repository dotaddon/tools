import { EventHandler } from "./active"
import { hisoCombination } from "./utils"

export type MovieAutoPlay = 'off' | 'onload' | 'onfocus'
export interface panoramaBaseDivMember {
    Panel:{
        dangerouslyCreateChildren: string
        dialogVariables: Record<string, string | number | Date>

        id: string
        className: string
        style: hisoCombination<VCSSStyleDeclaration2, VCSSStyleDeclaration>
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
    RadioButton:{
        selected: boolean // checked?
        onselect: EventHandler<RadioButton>
        ondeselect: EventHandler<RadioButton>
    }
    Slider:{
        style: never
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

export interface panoramaDivMember {
    Panel: panoramaBaseDivMember['Panel']
    Label: panoramaBaseDivMember['Label'] & {
        allowtextselection: boolean
    }

    Image: panoramaBaseDivMember['Panel'] & panoramaBaseDivMember['Image']
    DOTAAbilityImage: panoramaBaseDivMember['Panel'] &  panoramaBaseDivMember['Image'] & {
        abilityname: string
        abilityid: number
        contextEntityIndex: AbilityEntityIndex
        /** @default false */
        showtooltip: boolean
    }
    DOTAItemImage: panoramaBaseDivMember['Panel'] & panoramaBaseDivMember['Image'] &  {
        itemname: string
        contextEntityIndex: ItemEntityIndex
        /** @default true */
        showtooltip: boolean
    }
    DOTAHeroImage: panoramaBaseDivMember['Panel'] & panoramaBaseDivMember['Image'] & {
        heroname: string
        heroid: HeroID
        heroimagestyle: 'icon' | 'portrait' | 'landscape'
        usedefaultimage: boolean
    }
    DOTACountryFlagImage: panoramaBaseDivMember['Panel'] & panoramaBaseDivMember['Image']& {
        country_code: string
    }
    DOTALeagueImage: panoramaBaseDivMember['Panel'] & panoramaBaseDivMember['Image'] &  {
        leagueid: number
        /** @default 'Banner' */
        leagueimagestyle: 'Banner' | 'Square' | 'LargeIcon'
    }
    EconItemImage: panoramaBaseDivMember['Panel'] & panoramaBaseDivMember['Image'] & {
        itemdef: number
    }

    AnimatedImageStrip: panoramaBaseDivMember['Panel'] & panoramaBaseDivMember['Image'] & {
        frametime: string
        defaultframe: number
        animating: boolean
    }
    DOTAEmoticon: panoramaDivMember['AnimatedImageStrip'] & {
        emoticonid: number
        alias: string
    }

    Movie: panoramaBaseDivMember['Panel'] &{
        src: string
        repeat: boolean
        controls: Parameters<MoviePanel['SetControls']>[0]
        title: string
        /** @default 'onload' */
        autoplay: MovieAutoPlay
    }
    DOTAHeroMovie: panoramaBaseDivMember['Panel'] &{
        heroid: HeroID
        heroname: string
        persona: any
        /** @default 'off' */
        autoplay: MovieAutoPlay
    }

    DOTAScenePanel: panoramaBaseDivMember['Panel'] & panoramaBaseDivMember['DOTAScenePanel']
    DOTAParticleScenePanel: panoramaBaseDivMember['Panel'] & panoramaBaseDivMember['DOTAScenePanel'] & {
        particleName: string
        cameraOrigin: [number, number, number] | string
        lookAt: [number, number, number] | string
        fov: number
        squarePixels: boolean
        startActive: boolean
    }
    DOTAEconItem: panoramaBaseDivMember['Panel'] &{
        itemdef: number
        itemstyle: number
    }

    ProgressBar: panoramaBaseDivMember['Panel'] &{
        value: number
        min: number
        max: number
    }
    CircularProgressBar: panoramaBaseDivMember['Panel'] & {
        value: number
        min: number
        max: number
    }
    ProgressBarWithMiddle: panoramaBaseDivMember['Panel'] &{
        lowervalue: number
        uppervalue: number
        min: number
        max: number
    }

    DOTAUserName: panoramaBaseDivMember['Panel'] & panoramaBaseDivMember['DOTAUserName']
    DOTAUserRichPresence: panoramaBaseDivMember['Panel'] & panoramaBaseDivMember['DOTAUserName']
    DOTAAvatarImage: panoramaBaseDivMember['Panel'] & panoramaBaseDivMember['DOTAUserName'] &  {
        nocompendiumborder: boolean
        lazy: boolean
    }

    Countdown: panoramaBaseDivMember['Panel'] & {
        startTime: number
        endTime: number
        /** @default 1 */
        updateInterval: number
        /** @default 'countdown_time' */
        timeDialogVariable: string
    }

    Button: panoramaBaseDivMember['Panel'] & panoramaBaseDivMember['Panel']
    TextButton: panoramaBaseDivMember['Panel'] & panoramaBaseDivMember['Label']
    ToggleButton: panoramaBaseDivMember['Panel'] & panoramaBaseDivMember['Label'] & panoramaBaseDivMember['RadioButton']
    RadioButton: panoramaBaseDivMember['RadioButton'] & {
        group: string
        text: string
        html: boolean
    }

    TextEntry: panoramaBaseDivMember['Panel'] & {
        multiline: boolean
        placeholder: string
        maxchars: number
        textmode: 'normal' | 'password' | 'numeric' | 'numericpassword'

        text: string
        ontextentrychange: EventHandler<TextEntry>
        oninputsubmit: EventHandler<TextEntry>
        // ontextentrysubmit doesn't seem to be ever triggered
    }
    NumberEntry: panoramaBaseDivMember['Panel'] & {
        value: number
        onvaluechanged: EventHandler<NumberEntry>
        /** @default 0 */
        min: number
        /** @default 1000000 */
        max: number
        /** @default 1 */
        increment: number
    }
    Slider: panoramaBaseDivMember['Panel'] & panoramaBaseDivMember['Slider'] & {
        onvaluechanged: EventHandler<SliderPanel>
    }
    SlottedSlider: panoramaBaseDivMember['Panel'] & panoramaBaseDivMember['Slider'] & {
        onvaluechanged: EventHandler<SlottedSlider>
        notches: number
    }

    DropDown: panoramaBaseDivMember['Panel'] & {
        selected: string
        oninputsubmit: EventHandler<DropDown>
    }
    ContextMenuScript: panoramaBaseDivMember['Panel']

    Carousel: panoramaBaseDivMember['Panel'] & {
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
    CarouselNav: panoramaBaseDivMember['Panel'] & {
        carouselid: string
    }

    DOTAHUDOverlayMap: panoramaBaseDivMember['Panel'] & {
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
    DOTAMinimap: panoramaBaseDivMember['Panel']

    HTML: panoramaBaseDivMember['Panel'] & {

        url: string
  // SetIgnoreCursor doesn't seem to do anything
    }

    TabButton: panoramaBaseDivMember['Panel'] & {

        group: string
        localizedText: string
        html: boolean

        selected: boolean
        onselect: EventHandler<Panel>
        ondeselect: EventHandler<Panel>
    }
    TabContents: panoramaBaseDivMember['Panel'] & {

        tabid: string
        group: string

        selected: boolean
        onselect: EventHandler<Panel>
        ondeselect: EventHandler<Panel>
    }

    CustomLayoutPanel: panoramaBaseDivMember['Panel'] & {
        layout: string
    }
    GenericPanel: panoramaBaseDivMember['Panel'] & {
        type: string
        [key: string]: any
    }
}