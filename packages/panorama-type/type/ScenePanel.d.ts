interface ScenePanel extends Panel {
    FireEntityInput(entityID: string, inputName: string, value: string): void;
    PlayEntitySoundEvent(arg1: any, arg2: any): number;
    /** 设置显示单位 大头像 渲染背景 */
    SetUnit(unitName: string, environment: string, drawBackground: boolean): void;
    /** 获取附着于材质表面的板子 */
    GetPanoramaSurfacePanel(): Panel | null;
    /** 设置旋转参数 */
    SetRotateParams(yawMin: number, yawMax: number, pitchMin: number, pitchMax: number): void;
    /** 生成指定场次 获胜队伍的 玩家英雄 带饰品 无展台 */
    SpawnHeroInScenePanelByPlayerSlotWithFullBodyView(matchID: number, playerSlot: number): boolean;
    /** 在场景中指定镜头前生成指定场次 获胜队伍的 玩家英雄 带饰品 */
    SpawnHeroInScenePanelByPlayerSlot(match_id: string, playerSlot: PlayerID, camera: string): boolean;
    /** 在场景中生成指定英雄 指定饰品 默认无 */
    SpawnHeroInScenePanelByHeroId(heroId: HeroID, camera: string, /** 饰品id */econId: number): boolean;
    /** 比赛场次，玩家编号 获胜队伍的0-4玩家 展台 有饰品 */
    SetScenePanelToPlayerHero(matchID: string, playerSlot: PlayerID): boolean;
    /** 展示本地玩家的指定英雄 带饰品的展台 */
    SetScenePanelToLocalHero(heroId: HeroID): boolean;
    SetPostProcessFade(value: number): void;
    /**
     * @example
     * scenePanel.SetCustomPostProcessMaterial("materials/dev/deferred_post_process_graphic_ui.vmat")
     */
    SetCustomPostProcessMaterial(material: string): void;
    LerpToCameraEntity(unknown1: string, unknown2: number): void;
}