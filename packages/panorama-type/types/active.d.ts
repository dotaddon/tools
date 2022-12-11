
// 官方控制台公布的 2021年9月更新
interface panoramaEventDeclarations {
    /** 向板添加一个css类。 */
    AddStyle(className: string): void
    /** Add a CSS class to a panel after a specified delay. */
    AddStyleAfterDelay(className: string, delay: number): void
    /** 向板的所有继承添加一个CSS类。 */
    AddStyleToEachChild(className: string): void
    /** Add a class for a specified duration, with optional pre-delay; clears existing timers when called with same class. */
    AddTimedStyle(className: string, arg1: number, arg2: number ): void
    /** 在一定延迟(以秒记)后发出另一个事件。 */
    AsyncEvent(delay: number, eventName: string): void
    /** Tip to display, panel to attach to (default 'DefaultTipAttachment') */
    DOTADisplayDashboardTip( arg0: string, arg1: string ): void
    /** 隐藏技能栏。 */
    DOTAHideAbilityTooltip(): void
    /** 隐藏BUFF栏。 */
    DOTAHideBuffTooltip(): void
    /** Hide the dropped item tooltip */
    DOTAHideDroppedItemTooltip(): void
    /** 隐藏经济/物品栏。 */
    DOTAHideEconItemTooltip(): void
    /** Hide the profile card / battle cup tooltip. */
    DOTAHideProfileCardBattleCupTooltip(): void
    /** 隐藏英雄头像。 */
    DOTAHideProfileCardTooltip(): void
    /** Hide the rank tier tooltip. */
    DOTAHideRankTierTooltip(): void
    /** Hide the rune tooltip */
    DOTAHideRuneTooltip(): void
    /** 隐藏文本框。 */
    DOTAHideTextTooltip(): void
    /** Hide the ti10 event game tooltip */
    DOTAHideTI10EventGameTooltip(): void
    /** 隐藏图片文本框。 */
    DOTAHideTitleImageTextTooltip(): void
    /** Hide the title text tooltip. */
    DOTAHideTitleTextTooltip(): void
    /** Notify change in RTime32 we expect the stream to start */
    DOTALiveStreamUpcoming( arg0: number ): void
    /** Notify change in video state (is it pointing at a live stream page or not) */
    DOTALiveStreamVideoLive( arg0: boolean ): void
    /** Show tooltip for an item in the entityIndex NPC's inventory. */
    DOTAShowAbilityInventoryItemTooltip(ent: EntityIndex, slot: number): void
    /** Show tooltip for an item in the entityIndex NPC's shop. */
    DOTAShowAbilityShopItemTooltip( arg0: string, arg1: string, arg2: EntityIndex ): void
    /** 显示技能栏。 */
    DOTAShowAbilityTooltip( arg0: string ): void
    /** 显示技能栏。等级信息将从由实体索引具体化的实体获取。没有等级显示 */
    DOTAShowAbilityTooltipForEntityIndex(text: string, ability: EntityIndex): void
    /** Show an ability tooltip annotated with a particular guide's info. */
    DOTAShowAbilityTooltipForGuide( arg0: string, arg1: string ): void
    /** Show an ability tooltip for the specified hero. 精简，没有文字描述 */
    DOTAShowAbilityTooltipForHero( arg0: string, arg1: number, arg2: boolean ): void
    /** Show an ability tooltip for a specific level. */
    DOTAShowAbilityTooltipForLevel( arg0: string, arg1: number ): void
    /** Show a buff tooltip for the specified entityIndex + buff serial. */
    DOTAShowBuffTooltip( arg0: EntityIndex, arg1: number, arg2: boolean ): void
    /** 根据指定物品、样式、英雄，显示经济物品栏。0表示默认样式，-1表示默认英雄。 */
    DOTAShowEconItemTooltip(econid: number, arg0: number, hero: 0 | -1 ): void
    /** Show the battle cup portion of the user's profile card, if it exists */
    DOTAShowProfileCardBattleCupTooltip( arg0: number ): void
    /** Show a user's profile card. Use pro name determines whether to use their professional team name if applicable. */
    DOTAShowProfileCardTooltip( arg0: number, arg1: boolean ): void
    /** Show the rank tier tooltip for a user */
    DOTAShowRankTierTooltip( arg0: number, arg1: any ): void
    /** Show a rune tooltip in the X Y location for the rune type */
    DOTAShowRuneTooltip( arg0: number, arg1: number, arg2: number ): void
    /** 显示包含指定信息的提示栏。 */
    DOTAShowTextTooltip( arg0: string ): void
    /** 显示包含指定信息的提示栏。同时应用名为“style”的CSS类来使用定制样式。 */
    DOTAShowTextTooltipStyled( arg0: string, arg1: string ): void
    /** Show a ti10 event game tooltip */
    DOTAShowTI10EventGameTooltip( arg0: string ): void
    /** 显示包含指定标题、图像、文本的提示栏。 */
    DOTAShowTitleImageTextTooltip( arg0: string, arg1: string, arg2: string ): void
    /** 显示包含指定标题、图像、文本的提示栏。同时应用名为“style”的CSS类来使用定制样式。 */
    DOTAShowTitleImageTextTooltipStyled( arg0: string, arg1: string, arg2: string, arg3: string ): void
    /** 显示包含指定标题和文本的提示栏。 */
    DOTAShowTitleTextTooltip( arg0: string, arg1: string ): void
    /** 显示包含指定标题和文本的提示栏。同时应用名为“style”的CSS类来使用定制样式。 */
    DOTAShowTitleTextTooltipStyled( arg0: string, arg1: string, arg2: string ): void
    /** Drop focus entirely from the window containing this panel. */
    DropInputFocus(): void
    /** 如果该板含有指定的类，则发出另一个事件。 */
    IfHasClassEvent( arg0: string, arg1: string ): void
    /** 如果光标悬浮在某个具有特定ID的板上，则发出另一个事件。 */
    IfHoverOtherEvent( arg0: string, arg1: string ): void
    /** 如果该板不含有指定的类，则发出另一个事件 */
    IfNotHasClassEvent( arg0: string, arg1: string ): void
    /** 如果光标悬浮在某个不具有特定ID的板上，则发出另一个事件。 */
    IfNotHoverOtherEvent( arg0: string, arg1: string ): void
    /** 从一个板向下移动。默认情况下，聚焦位置将会被改变，但某些类型的板可能会做出不同的操作。 */
    MovePanelDown( arg0: number ): void
    /** 从一个板向左移动。默认情况下，聚焦位置将会被改变，但某些类型的板可能会做出不同的操作。 */
    MovePanelLeft( arg0: number ): void
    /** 从一个板向右移动。默认情况下，聚焦位置将会被改变，但某些类型的板可能会做出不同的操作。 */
    MovePanelRight( arg0: number ): void
    /** 从一个板向上移动。默认情况下，聚焦位置将会被改变，但某些类型的板可能会做出不同的操作。 */
    MovePanelUp( arg0: number ): void
    /** 将板向下滚动一页。 */
    PageDown(): void
    /** 将板向左滚动一页。 */
    PageLeft(): void
    /** 将板向下滚动一页。 */
    PagePanelDown(): void
    /** 将板向左滚动一夜。 */
    PagePanelLeft(): void
    /** 将板向右滚动一页 */
    PagePanelRight(): void
    /** 将板向上滚动一页。 */
    PagePanelUp(): void
    /** 将板向右滚动一页。 */
    PageRight(): void
    /** 将板向上滚动一页。 */
    PageUp(): void
    /** 从板中移除一个 CSS类。 */
    RemoveStyle( className: string ): void
    /** Remove a CSS class from a panel after a specified delay. */
    RemoveStyleAfterDelay(className: string, delay: number ): void
    /** 从板的所有的子板中移除一个CSS类。 */
    RemoveStyleFromEachChild(className: string ): void
    /** 将板向下滚动一行。 */
    ScrollDown(): void
    /** 将板向左滚动一行。 */
    ScrollLeft(): void
    /** 将板向下滚动一行。 */
    ScrollPanelDown(): void
    /** 将板向左滚动一行。 */
    ScrollPanelLeft(): void
    /** 将板向右滚动一行。 */
    ScrollPanelRight(): void
    /** 将板向上滚动一行。 */
    ScrollPanelUp(): void
    /** 将板向右滚动一行。 */
    ScrollRight(): void
    /** 将板滚动到底部。 */
    ScrollToBottom(): void
    /** 将板滚动到顶部 */
    ScrollToTop(): void
    /** 将板向上滚动一行。 */
    ScrollUp(): void
    /** 设定所有子板是否被选择。 */
    SetChildPanelsSelected( arg0: boolean ): void
    /** 将聚焦设定到此板上。 */
    SetInputFocus(): void
    /** Sets whether the given panel is enabled */
    SetPanelEnabled( arg0: boolean ): void
    /** 设定该板是否被选择。 */
    SetPanelSelected( arg0: boolean ): void
    /** Switch which class the panel has for a given attribute slot. Allows easily changing between multiple states. */
    SwitchStyle( arg0: string, arg1: string ): void
    /** 切换该板的被选择状态。 */
    TogglePanelSelected(): void
    /** 切换该板是否含有某CSS类。 */
    ToggleStyle( arg0: string ): void
    /** Remove then immediately add back a CSS class from a panel. Useful to re-trigger events like animations or sound effects. */
    TriggerStyle( arg0: string ): void

}

// 自己总结出来的 2021年3月更新
interface panoramaEventDeclarations {
    /** 触发商店的显示或隐藏 */
    DOTAHUDToggleShop(): void
    FireCustomGameEvent_Str( arg0: string, arg1: string ): void
    OverviewHeroShowContextMenu(): void
    DOTAEnsureRecentGamesLoaded( arg0: boolean ): void
    DOTAWeekendTourneyMatchOutcomeSequenceStateNotify( arg0: number ): void
    DOTAShowStoreBrowseCategoryPage( arg0: string ): void
    DOTAShowItemDefPage( arg0: number ): void
    DOTASceneFireEntityInput( arg0: string, arg1: string, arg2: string ): void
    PlaySoundEffect( arg0: string ): void
    DOTACavernCrawlToggleMapVariant(): void
    DOTAInternational2017ViewComic(): void
    DOTASetCurrentDashboardPageFullscreen( arg0: boolean ): void
    DOTABPInternational2017CampaignDetailsAct2Page(): void
    DOTAGlobalSceneSetCameraEntity( arg0: string, arg1: string, arg2: number ): void
    DOTAShopCancelSearch(): void
    DOTASetSpectatorChatEnabled( arg0: boolean ): void
    DOTAGlobalSceneSetRootEntity(): void
    DOTAGlobalSceneFireEntityInput( arg0: string, arg1: string, arg2: string, arg3: string, arg4: number ): void
    DOTAPopupBattleCupWinnerClose(): void
    DOTAPurchaseBattlePassLevelsApplyLevels(): void
    DOTAPurchaseBattlePassLevelsClose(): void
    UIPopupButtonClicked(): void
    DOTASetActiveTab( arg0: number ): void
    DOTAEconSetPreviewSetItemDef( arg0: number, arg1: string, arg2: string, arg3: number, arg4: boolean, arg5: boolean ): void
    DOTAEconSetPreviewSetRotationSpeed( arg0: number ): void
    UIShowCustomLayoutPopup( arg0: string, arg1: string ): void
    DOTASetDashboardBackgroundVisible( arg0: boolean ): void
    DOTACavernCrawlFlareShooting( arg0: boolean ): void
    DOTACavernCrawlAdvanceUpdates(): void
    DOTACavernCrawlShowPathParticles(): void
    DOTAShowHomePage(): void
    DOTASubmitCoachRating( arg0: number, arg1: number, arg2: string, arg3: string ): void
    PostGameProgressConfirmAbusiveCoachRating(): void
    PostGameMVPSubmitVote( arg0: number ): void
    PostGameMVPSubmitVoteTest( arg0: number ): void
    DOTAMatchSubmitPlayerMatchSurvey( arg0: number, arg1: number, arg2: number ): void
    DOTAPostGameProgressShowSummary(): void
    DOTAPostGameProgressAnimationComplete(): void
    UIShowTextTooltip( arg0: string ): void
    UIHideTextTooltip(): void
    PostGameProgressSkippingAhead(): void
}


// 自己总结出来的 2022年7月更新
interface panoramaEventDeclarations {
    /** 玩家属性详情弹出面板 显示 */
    DOTAHUDHideDamageArmorTooltip(): void
    /** 玩家属性详情弹出面板 隐藏 */
    DOTAHUDShowDamageArmorTooltip(): void
    /** 玩家金币详情弹出面板 显示 */
    DOTAHUDShowGoldTooltip(): void
    /** 玩家金币详情弹出面板 隐藏 */
    DOTAHUDHideGoldTooltip(): void
    /** 点击buff按钮 */
    DOTAHUDBuffClicked(): void
    PostGameProgressConfirmAbusiveCoachRatingFinished( arg0: boolean, arg1: string ): void
}