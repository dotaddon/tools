
// 官方控制台公布的 2021年9月更新
export interface panoramaEventDeclarations {
    /** 向板添加一个css类。 */
    AddStyle: [string]
    /** Add a CSS class to a panel after a specified delay. */
    AddStyleAfterDelay: [string, number]
    /** 向板的所有继承添加一个CSS类。 */
    AddStyleToEachChild: [string]
    /** Add a class for a specified duration, with optional pre-delay; clears existing timers when called with same class. */
    AddTimedStyle: [string, number, number]
    /** 在一定延迟(以秒记)后发出另一个事件。 */
    AsyncEvent: [number, string]
    /** Tip to display, panel to attach to (default 'DefaultTipAttachment') */
    DOTADisplayDashboardTip: [string, string]
    /** 隐藏技能栏。 */
    DOTAHideAbilityTooltip: []
    /** 隐藏BUFF栏。 */
    DOTAHideBuffTooltip: []
    /** Hide the dropped item tooltip */
    DOTAHideDroppedItemTooltip: []
    /** 隐藏经济/物品栏。 */
    DOTAHideEconItemTooltip: []
    /** Hide the profile card / battle cup tooltip. */
    DOTAHideProfileCardBattleCupTooltip: []
    /** 隐藏英雄头像。 */
    DOTAHideProfileCardTooltip: []
    /** Hide the rank tier tooltip. */
    DOTAHideRankTierTooltip: []
    /** Hide the rune tooltip */
    DOTAHideRuneTooltip: []
    /** 隐藏文本框。 */
    DOTAHideTextTooltip: []
    /** Hide the ti10 event game tooltip */
    DOTAHideTI10EventGameTooltip: []
    /** 隐藏图片文本框。 */
    DOTAHideTitleImageTextTooltip: []
    /** Hide the title text tooltip. */
    DOTAHideTitleTextTooltip: []
    /** Notify change in RTime32 we expect the stream to start */
    DOTALiveStreamUpcoming: [number]
    /** Notify change in video state (is it pointing at a live stream page or not) */
    DOTALiveStreamVideoLive: [boolean]
    /** Show tooltip for an item in the entityIndex NPC's inventory. */
    DOTAShowAbilityInventoryItemTooltip: [EntityIndex, number]
    /** Show tooltip for an item in the entityIndex NPC's shop. */
    DOTAShowAbilityShopItemTooltip: [string, string, EntityIndex]
    /** 显示技能栏。 */
    DOTAShowAbilityTooltip: [string]
    /** 显示技能栏。等级信息将从由实体索引具体化的实体获取。没有等级显示 */
    DOTAShowAbilityTooltipForEntityIndex: [string, EntityIndex]
    /** Show an ability tooltip annotated with a particular guide's info. */
    DOTAShowAbilityTooltipForGuide: [string, string]
    /** Show an ability tooltip for the specified hero. 精简，没有文字描述 */
    DOTAShowAbilityTooltipForHero: [string, number, boolean]
    /** Show an ability tooltip for a specific level. */
    DOTAShowAbilityTooltipForLevel: [string, number]
    /** Show a buff tooltip for the specified entityIndex + buff serial. */
    DOTAShowBuffTooltip: [EntityIndex, number, boolean]
    /** 根据指定物品、样式、英雄，显示经济物品栏。0表示默认样式，-1表示默认英雄。 */
    DOTAShowEconItemTooltip: [string, 0 | 1, number]
    /** Show the battle cup portion of the user's profile card, if it exists */
    DOTAShowProfileCardBattleCupTooltip: [number]
    /** Show a user's profile card. Use pro name determines whether to use their professional team name if applicable. */
    DOTAShowProfileCardTooltip: [number, boolean]
    /** Show the rank tier tooltip for a user */
    DOTAShowRankTierTooltip: [number, any]
    /** Show a rune tooltip in the X Y location for the rune type */
    DOTAShowRuneTooltip: [number, number, number]
    /** 显示包含指定信息的提示栏。 */
    DOTAShowTextTooltip: [string]
    /** 显示包含指定信息的提示栏。同时应用名为“style”的CSS类来使用定制样式。 */
    DOTAShowTextTooltipStyled: [string, string]
    /** Show a ti10 event game tooltip */
    DOTAShowTI10EventGameTooltip: [string]
    /** 显示包含指定标题、图像、文本的提示栏。 */
    DOTAShowTitleImageTextTooltip: [string, string, string]
    /** 显示包含指定标题、图像、文本的提示栏。同时应用名为“style”的CSS类来使用定制样式。 */
    DOTAShowTitleImageTextTooltipStyled: [string, string, string, string]
    /** 显示包含指定标题和文本的提示栏。 */
    DOTAShowTitleTextTooltip: [string, string]
    /** 显示包含指定标题和文本的提示栏。同时应用名为“style”的CSS类来使用定制样式。 */
    DOTAShowTitleTextTooltipStyled: [string, string, string]
    /** Drop focus entirely from the window containing this panel. */
    DropInputFocus: []
    /** 如果该板含有指定的类，则发出另一个事件。 */
    IfHasClassEvent: [string, string]
    /** 如果光标悬浮在某个具有特定ID的板上，则发出另一个事件。 */
    IfHoverOtherEvent: [string, string]
    /** 如果该板不含有指定的类，则发出另一个事件 */
    IfNotHasClassEvent: [string, string]
    /** 如果光标悬浮在某个不具有特定ID的板上，则发出另一个事件。 */
    IfNotHoverOtherEvent: [string, string]
    /** 从一个板向下移动。默认情况下，聚焦位置将会被改变，但某些类型的板可能会做出不同的操作。 */
    MovePanelDown: [number]
    /** 从一个板向左移动。默认情况下，聚焦位置将会被改变，但某些类型的板可能会做出不同的操作。 */
    MovePanelLeft: [number]
    /** 从一个板向右移动。默认情况下，聚焦位置将会被改变，但某些类型的板可能会做出不同的操作。 */
    MovePanelRight: [number]
    /** 从一个板向上移动。默认情况下，聚焦位置将会被改变，但某些类型的板可能会做出不同的操作。 */
    MovePanelUp: [number]
    /** 将板向下滚动一页。 */
    PageDown: []
    /** 将板向左滚动一页。 */
    PageLeft: []
    /** 将板向下滚动一页。 */
    PagePanelDown: []
    /** 将板向左滚动一夜。 */
    PagePanelLeft: []
    /** 将板向右滚动一页 */
    PagePanelRight: []
    /** 将板向上滚动一页。 */
    PagePanelUp: []
    /** 将板向右滚动一页。 */
    PageRight: []
    /** 将板向上滚动一页。 */
    PageUp: []
    /** 从板中移除一个 CSS类。 */
    RemoveStyle: [string]
    /** Remove a CSS class from a panel after a specified delay. */
    RemoveStyleAfterDelay: [string, number]
    /** 从板的所有的子板中移除一个CSS类。 */
    RemoveStyleFromEachChild: [string]
    /** 将板向下滚动一行。 */
    ScrollDown: []
    /** 将板向左滚动一行。 */
    ScrollLeft: []
    /** 将板向下滚动一行。 */
    ScrollPanelDown: []
    /** 将板向左滚动一行。 */
    ScrollPanelLeft: []
    /** 将板向右滚动一行。 */
    ScrollPanelRight: []
    /** 将板向上滚动一行。 */
    ScrollPanelUp: []
    /** 将板向右滚动一行。 */
    ScrollRight: []
    /** 将板滚动到底部。 */
    ScrollToBottom: []
    /** 将板滚动到顶部 */
    ScrollToTop: []
    /** 将板向上滚动一行。 */
    ScrollUp: []
    /** 设定所有子板是否被选择。 */
    SetChildPanelsSelected: [boolean]
    /** 将聚焦设定到此板上。 */
    SetInputFocus: []
    /** Sets whether the given panel is enabled */
    SetPanelEnabled: [boolean]
    /** 设定该板是否被选择。 */
    SetPanelSelected: [boolean]
    /** Switch which class the panel has for a given attribute slot. Allows easily changing between multiple states. */
    SwitchStyle: [string, string]
    /** 切换该板的被选择状态。 */
    TogglePanelSelected: []
    /** 切换该板是否含有某CSS类。 */
    ToggleStyle: [string]
    /** Remove then immediately add back a CSS class from a panel. Useful to re-trigger events like animations or sound effects. */
    TriggerStyle: [string]

}

// 自己总结出来的 2021年3月更新
export interface panoramaEventDeclarations {
    /** 触发商店的显示或隐藏 */
    DOTAHUDToggleShop: []
    FireCustomGameEvent_Str: [string, string]
    OverviewHeroShowContextMenu: []
    DOTAEnsureRecentGamesLoaded: [boolean]
    DOTAWeekendTourneyMatchOutcomeSequenceStateNotify: [number]
    DOTAShowStoreBrowseCategoryPage: [string]
    DOTAShowItemDefPage: [number]
    DOTASceneFireEntityInput: [string, string, string]
    PlaySoundEffect: [string]
    DOTACavernCrawlToggleMapVariant: []
    DOTAInternational2017ViewComic: []
    DOTASetCurrentDashboardPageFullscreen: [boolean]
    DOTABPInternational2017CampaignDetailsAct2Page: []
    DOTAGlobalSceneSetCameraEntity: [string, string, number]
    DOTAShopCancelSearch: []
    DOTASetSpectatorChatEnabled: [boolean]
    DOTAGlobalSceneSetRootEntity: []
    DOTAGlobalSceneFireEntityInput: [string, string, string, string, number]
    DOTAPopupBattleCupWinnerClose: []
    DOTAPurchaseBattlePassLevelsApplyLevels: []
    DOTAPurchaseBattlePassLevelsClose: []
    UIPopupButtonClicked: []
    DOTASetActiveTab: [number]
    DOTAEconSetPreviewSetItemDef: [number, string, string, number, boolean, boolean]
    DOTAEconSetPreviewSetRotationSpeed: [number]
    UIShowCustomLayoutPopup: [string, string]
    DOTASetDashboardBackgroundVisible: [boolean]
    DOTACavernCrawlFlareShooting: [boolean]
    DOTACavernCrawlAdvanceUpdates: []
    DOTACavernCrawlShowPathParticles: []
    DOTAShowHomePage: []
    DOTASubmitCoachRating: [number, number, string, string]
    PostGameProgressConfirmAbusiveCoachRating: []
    PostGameMVPSubmitVote: [number]
    PostGameMVPSubmitVoteTest: [number]
    DOTAMatchSubmitPlayerMatchSurvey: [number, number, number]
    DOTAPostGameProgressShowSummary: []
    DOTAPostGameProgressAnimationComplete: []
    UIShowTextTooltip: [string]
    UIHideTextTooltip: []
    PostGameProgressSkippingAhead: []
}


// 自己总结出来的 2022年7月更新
export interface panoramaEventDeclarations {
    /** 玩家属性详情弹出面板 显示 */
    DOTAHUDHideDamageArmorTooltip: []
    /** 玩家属性详情弹出面板 隐藏 */
    DOTAHUDShowDamageArmorTooltip: []
    /** 玩家金币详情弹出面板 显示 */
    DOTAHUDShowGoldTooltip: []
    /** 玩家金币详情弹出面板 隐藏 */
    DOTAHUDHideGoldTooltip: []
    /** 点击buff按钮 */
    DOTAHUDBuffClicked: []
    PostGameProgressConfirmAbusiveCoachRatingFinished: [boolean, string]
}