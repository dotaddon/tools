require "sdk.index"

function five_cloud(
    appID:number,
    appSecret:string,
    requestKey:string,
    baseURL:string,
    bServerMode,
    keyStatus,
)
    print("[FiveCloud初始化]")
    FiveCloudSDK.appID = appID
    FiveCloudSDK.appSecret = appSecret
    FiveCloudSDK.requestKey = requestKey
    FiveCloudSDK.baseURL = baseURL
    FiveCloudSDK.timeStamp = 0
    FiveCloudSDK.bServerMode = bServerMode or false
    FiveCloudSDK.keyStatus = keyStatus or false
    FiveCloudSDK:keyInit()
end

return {
    five_cloud = five_cloud,
}