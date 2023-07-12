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

    DOTASettingsEnum: Panel;
    DropDownMenu: DropDown
    DOTASettingsEnumDropDown:DropDown;

    RangeSlider: SliderPanel

    TextEntryAutocomplete:TextEntry;
    TextEntryIMEControls: TextEntry;

    CycleButton: ToggleButton;

    VerticalScrollBar: Panel
    HorizontalScrollBar: Panel
    HTMLHorizontalScrollBar: Panel
    HTMLVerticalScrollBar: Panel
    EdgeScroller: Panel
    EdgeScrollBar: Panel

    SimpleContextMenu: Panel
    DOTAUserRichPresence: Panel
    DOTASortHeader: Panel
    DOTAPunchCard: Panel
    DOTATooltipFriendsMenu: Panel
    DOTATooltipCustomGame: Panel
    DOTATooltipProfileCard: Panel
    DOTAContextMenuPlayer: Panel
    DOTATooltipChatBubble: Panel
    DOTATooltipDroppedItem: Panel
    DOTATooltipRune: Panel
    TournamentMatchDetails: Panel
    DOTAGameItemsPage: Panel
    DOTAShopItem: ItemImage
    DOTAWatchDownloadsElement: Panel
    DOTACustomGamesSubscribedPage: Panel
    DOTACustomLobbyList: Panel
    DOTAParty: Panel
    DOTAChat: Panel
    DOTAPostGame: Panel
    DOTATreasureDetailsPage: Panel
    AsyncDataPanel: Panel
    DOTAGuildImage: ImagePanel
    DOTAEventCrestImage: ImagePanel
}

declare interface HeroImage extends ImagePanel {
    persona: string;
}