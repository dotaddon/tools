function FiveCloudSDK:getKeyStatus(callback)
    local result = self:httpPostWithSign("/app/getKeyStatus", nil, {
        appid = self.appID,
        appsecret = self.appSecret
    }, callback)
end

function FiveCloudSDK:setKey()
    self:httpPost("/app/setKey", {
        appid = self.appID,
        appsecret = self.appSecret,
        key = GetDedicatedServerKeyV2(self.requestKey)
    }, function(res)
        if res.code == 200 then
            self.bServerMode = true
            print("[设置Key]", res.message)
        else
            print("[设置Key]", res.message)
        end
    end) 
end

-- 第一次上传地图的时候获取一下Key
function FiveCloudSDK:keyInit()
    if not self.keyStatus then
        self:setKey()
    else
        self:getKeyStatus(function(res)
            if res.code == 200 then
                self.bServerMode = true
            else
                print("[Key状态]",res.message)
            end
        end) 
    end
end

function FiveCloudSDK:Login(playerid, playerName, callback)
    local url = '/dota2/user/login'
    local steamid = tostring(PlayerResource:GetSteamID(playerid))
    local data = {
        Steamid = steamid,
        Nickname = playerName,
    }
    FiveCloudSDK:httpPostWithSign(url, playerid, data, callback)
end