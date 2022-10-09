export * from './hooks';
export * from './renderer';

declare global {

    const process: {
        env: {
            NODE_ENV: 'production' | 'development';
            BUILD_ENV: 'production' | 'development';
        };
    };

    interface CustomUIConfig {
        temporaryScheduleHandle: ScheduleID;
    }

    interface PanoramaPanelNameMap {
        TabButton: Panel
        TabContents: Panel
        /** 英雄介绍页面 */
        DOTAHeroInspect: Panel
        /** 战斗事件 */
        DOTACombatEvents: Panel
        /** 雷达图 */
        DOTASpiderGraph: Panel
        /** 属性表 */
        DOTAStatsRegion: Panel
        /** 三维表 */
        DOTAHUDStrAgiInt: Panel
        /** 快速购买 */
        DOTAQuickBuy: Panel
        /** 物品栏 */
        DOTAInventory: Panel
        /** 储藏室 */
        DOTAStash: Panel
        /** 经验圈 */
        DOTAXP: Panel
        /** 肖像画 */
        DOTAPortrait: Panel
        /** 死亡状态 */
        DOTAHUDDeathPanel: Panel
        /** BUFF栏 */
        DOTABuffList: Panel
        /** 天赋树图形 */
        DOTAHudTalentDisplay: Panel
        /** 天赋树弹出 */
        DOTAStatBranch: Panel
    }
}