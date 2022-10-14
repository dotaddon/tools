declare global {
    const FiveCloudSDK: FiveCloudSDK;

    interface FiveCloudSDK {
        FiveCloudInit():void
        getKeyStatus(callback:()=> void): void
        /** 设置key */
        setKey(): void
        /** 第一次上传地图的时候获取一下Key */
        keyInit(): void
        Login(playerid: PlayerID, playerName: string, callback:(data:any)=>void): void
        message(content: string, playerid: PlayerID, type: 'success' | 'error' | 'info'): void
        request<T>(methon:'POST'|'GET', url:string, data:T, callback:(data:T)=>void, retry:number):void
        httpGet(url: string, callback: () => void): void
        httpPost<T>(url: string, data: T, callback: (data: T) => void): void
        httpPostWithSign<T>(url: string, playerid: PlayerID, data: T, callback: (data: T) => void): void
        makeData<T>(playerid: PlayerID, data: T): T
        makeSign<T>(data:T):T
        randomStr(len:number):string
    }
}

export function five_cloud(
    appID:number,
    appSecret:string,
    requestKey:string,
    baseURL:string,
    /** 是否是服务器模式 */
    bServerMode:boolean,
    /** 未设置key时false，设置完key需要改成true */
    keyStatus?:boolean,
) :void