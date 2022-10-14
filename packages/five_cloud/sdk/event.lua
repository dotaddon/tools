function FiveCloudSDK:FiveCloudInit(e)
    self.timeStamp = e.timestamp - math.floor(Time() + 0.5)
    local playerid = e.playerId
    local playerName = e.playerName
    local callback = (function(res)
        if res.code == 200 then
            self.bServerMode = true
            FiveCloudSDK:message(res.message, e.playerId, "info")
        else
            if res.code == 40002 then
                FiveCloudSDK:message("非服务器主机", e.playerId, "info")
            else
                FiveCloudSDK:message(v, e.playerId, "info")
            end
        end
    end)

    FiveCloudSDK:Login(playerid, playerName, callback)
end