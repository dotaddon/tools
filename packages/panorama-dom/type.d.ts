declare const process: {
    env: {
        NODE_ENV: 'production' | 'development';
        BUILD_ENV: 'production' | 'development';
    };
};

declare interface CustomUIConfig {
    temporaryScheduleHandle: ScheduleID;
}
declare interface PanoramaPanelNameMap {
    TabButton: Panel,
    TabContents: Panel,
    DOTAAbilityDetails: AbilityImage;
    DOTAAbilityList: Panel;
}

declare interface HeroImage extends ImagePanel {
    persona: string;
}