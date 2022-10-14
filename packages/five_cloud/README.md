# five_cloud
用于收集线上报错信息。

## author
超级鸡蛋人

## 网址
[后端管理页](http://fivecloud.holemystery.com/)


## 使用方法

### 启动服务
在适当的时机运行启动函数
```lua
-- 在设置队伍阶段初始化Key，太早了网络组件还没初始化
if not IsInToolsMode() then
    five_cloud(
        1234,
        "aabbcc",
        "fivecloud",
        "https://www.baidu.com/",
        false,
        false
    )
end
```

### 接收前端错误信息示例
```JavaScript
// js里添加发送时间戳事件和玩家昵称
let data = {
    timestamp: Date.now(),
    playerName: Players.GetPlayerName(Players.GetLocalPlayer())
}  
FireCustomGameEvent('FiveCloudInit', data)
```
```lua
-- lua里监听一下
CustomGameEventManager:RegisterListener( "FiveCloudInit", Dynamic_Wrap(CustomEvent, "FiveCloudInit") )
```

### 接收lua端错误信息
```lua
if __debug_trace_back_original__ == nil then 
	__debug_trace_back_original__ = debug.traceback 
end
debug.traceback = function(thread, message, level)
	local trace
	if thread == nil and message == nil and level == nil then
		trace = __debug_trace_back_original__()
	else
		trace = __debug_trace_back_original__(thread, message, level)
	end
	if thread ~= nil then
		local e = tostring(thread)
        print('[错误]')

        FiveCloudSDK:httpPostWithSign("/dota2/log/edit", nil, {
            Content = e
        }, function(res)
            DeepPrintTable(res)
        end)
	end

	return trace
end
```

### 登录系统演示
```lua
function public:FiveCloudInit(e)
    self.timeStamp = e.timestamp
    local url = '/dota2/user/login'
    local playerid = e.playerId
    local steamid = tostring(PlayerResource:GetSteamID(playerid))
    local data = {
        Steamid = steamid,
        Nickname = e.playerName,
    }
    print("[Nickname] " , PlayerResource:GetPlayerName(playerid))
    local callback = (function(res)
        if res.code == 200 then
            CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(e.playerId), "CustomHUDError", {
                v = res.message
            })
        else
            CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(e.playerId), "CustomHUDError", {
                v = res.message
            })
        end
    end)
    FiveCloudSDK:httpPostWithSign(url, playerid, data, callback)
end
```

### 前端接收报错
```JavaScript
GameEvents.Subscribe("CustomHUDError", (data)=>{
    GameUI.SendCustomHUDError(data.v, "")
})
```