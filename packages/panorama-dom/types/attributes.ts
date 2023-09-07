import {DivByPanelType, PanelType, PNC} from "./panel"
import { panoramaDivActive } from "./active"
import { ClassAttributes, ReactNode } from "react"

export type PanelAttributes<T extends PanelType = 'Panel'> = PanelAttributesExpand[T]

export type PanelAttributesExpand = {
    [P in PanelType]: ReactDomDivProps<DivByPanelType<P>>
    & Partial<
        panoramaDivActive<P>
        & PanelAttributesUtil[P]
        & PanelAttributesUtil['Panel']
    >
}

type MovieAutoPlay = 'off' | 'onload' | 'onfocus'

export type PanelStyles = Partial<VCSSStyleDeclaration>

export type ReactDomDivProps<T extends PanelBase = Panel> = ClassAttributes<T> & {
    children?: ReactNode;
}

/** 初始板属性 用于继承 */
export interface PanelAttributesBase extends PNC<Record<string,any>> {
    Label:{
        /**
         * *注意：使用此属性与在“标签”面板上分配“文本”属性相同
         * 它不会本地化字符串并忽略对话框变量。
         * 如果需要XML属性的行为，请改用“localizedText”。
         */
        text: string | number | ((panel: LabelPanel) => string);
        localizedText: string
        unlocalized: boolean;
        html: boolean;
    }
    Image:{
        src: string
        scaling: ScalingFunction
        svgfillrule: 'nonzero' | 'evenodd';
        svgopacity: number;
        svgstrokeopacity: number;
        svgstrokelinejoin: 'miter' | 'round' | 'bevel' | 'inherit';
        svgstrokelinecap: 'butt' | 'round' | 'square';
        svgstrokewidth: number;
        svgstroke: '#ffffff' | string;
        svgfillopacity: number;
        svgfill: '#ffffff' | string;
        /**
         * texturewidth and textureheight can be used to override the size of vector graphics. Default value of -1 indicates texture width/height to be determined from source file
         */
        texturewidth: number;
        /**
         * texturewidth and textureheight can be used to override the size of vector graphics. Default value of -1 indicates texture width/height to be determined from source file
         */
        textureheight: number;
        srcset: string;
        animate: string;
        defaultsrc: string;
        verticalalign: VCSSVerticalAlign;
        horizontalalign: VCSSHorizontalAlign | 'middle';
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
        'post-process-fade': number;
        'post-process-material': string;
        'animate-during-pause': boolean;
        'pin-fov': 'horizontal' | 'vertical';
        'live-mode': 'high_end_only' | string;
        'no-intro-effects': boolean;
        environment: 'default' | 'full_body' | 'full_body_right_side' | 'card';
        'activity-modifier': string;
        unit: string;

        map: string;
        camera: string;
        light: string;

        pitchmin: number;
        pitchmax: number;
        yawmin: number;
        yawmax: number;
        acceleration: number;
        autorotatespeed: number;
        allowrotation: boolean;
        rotateonhover: boolean;
        rotateonmousemove: boolean;

        antialias: boolean;
        deferredalpha: boolean;
        drawbackground: boolean;
        panoramasurfaceheight: number;
        panoramasurfacewidth: number;
        panoramasurfacexml: string;
        particleonly: boolean;
        renderdeferred: boolean;
        rendershadows: boolean;
        renderwaterreflections: boolean;
        allowsuspendrepaint: boolean;
    }
}
/** 板属性 */
export interface PanelAttributesUtil extends PNC<Record<string, any>> {
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

        useglobalcontext: boolean;
        disallowedstyleflags: string;
        'never-cache-composition-layer': boolean;
        'always-cache-composition-layer': boolean;
        'require-composition-layer': boolean;
        registerforreadyevents: boolean;
        readyfordisplay: boolean;
        clipaftertransform: boolean;
        rememberchildfocus: boolean;
        keepscrolltobottom: boolean;
        sendchildscrolledintoviewevents: boolean;
        'overscroll-x': number;
        'overscroll-y': number;
        scrollparenttofitwhenfocused: boolean;
        acceptsinput: boolean;
        analogstickscroll: boolean;
        childfocusonhover: boolean;
        focusonhover: boolean;
        mousecanactivate: 'unfocused' | 'iffocused' | 'ifparentfocused(<parentid>)' | string;
        defaultfocus: string;
        selectionposboundary: 'both' | 'vertical' | 'horizontal' | string;
        // TODO: sectionpos: 'auto'?
    }
    Label: PanelAttributesBase['Label'] & {
        allowtextselection: boolean
        imgscaling: number;
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
        persona: string;
        defaultimage: string;
    }
    DOTALeagueImage: PanelAttributesBase['Image'] &  {
        leagueid: number
        /** @default 'Banner' */
        leagueimagestyle: 'Banner' | 'Square' | 'LargeIcon'
    }
    EconItemImage: PanelAttributesBase['Image'] & {
        itemdef: number
        itemstyle: number;
    }

    AnimatedImageStrip: PanelAttributesBase['Image'] & {
        frametime: string
        defaultframe: number
        animating: boolean
        framewidth: number;
        frameheight: number;
    }
    DOTAEmoticon: PanelAttributesUtil['AnimatedImageStrip'] & {
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

        volume: number;
        muted: boolean;
        notreadybehavior: boolean;
        loadbehavior: boolean;
    }
    DOTAHeroMovie: {
        heroid: HeroID
        heroname: string
        persona: string
        /** @default 'off' */
        autoplay: MovieAutoPlay
        src: string;
        volume: number;
        muted: boolean;
        repeat: boolean;
        notreadybehavior: boolean;
        loadbehavior: boolean;

    }

//TODO export interface RenderPanelAttributes extends PanelAttributes { }

    DOTAScenePanel: PanelAttributesBase['DOTAScenePanel']
    DOTAParticleScenePanel: PanelAttributesBase['DOTAScenePanel'] & {
        syncSpawn: boolean;
        fov: number;
        startActive: boolean;
        squarePixels: boolean;
        farPlane: number;
        lookAt: [number, number, number] | string;
        cameraOrigin: [number, number, number] | string;
        useMapCamera: boolean;
        particleName: string;
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
        global: boolean;
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
        autocompleteposition: 'top' | string;
        capslockwarn: 1 | 0;
        undohistory: 'enabled';
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
        'panels-visible': number
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

    DOTAAbilityList: {}
    DOTAAbilityDetails: PanelAttributesUtil['DOTAAbilityImage']

    CustomLayoutPanel: {
        layout: string
    }

    GenericPanel: {
        type: string
        [key: string]: any
    }
}

