/** 创建一个http请求 */
export function asyncHttp(url:string) {
    return new THttpAsnycPipe(url)
}

class THttpAsnycPipe {
    private _method: 'GET' | 'POST' = 'POST'
    /** 设置请求方法 默认使用post */
    method(a: typeof this._method) {
        this._method = a
        return this
    }

    constructor(private _url: string) {
    }
    private _headers: Record<string, string> = {}
    /** 设置请求的标头值。 */
    header(name: string, value: string) {
        this._headers[name] = value
        return this
    }
    /** 校验文字
     * @param serverKey 经过 DedicatedServerKeyV2 函数包装后，放到req.header中
     */
    key(serverKey: string) {
        this._headers['serverKey'] = GetDedicatedServerKeyV2(serverKey)
        return this
    }

    private _timeout:number
    private _timeoutAbsolute: number
    /** 超时限制 ms */
    timeout(a: number,absolute:boolean = false) {
        if (absolute)
            this._timeout = a
        else
            this._timeoutAbsolute = a
        return this
    }

    private _params:Record<string,string> = {}
    /** 在请求上设置POST或GET参数。 */
    parameter( name:string, value:string ){
        this._params[name] = value
        return this
    }

    private _bodyName:string
    private _bodyValue:string
    /** 设置post的文字体-设置 parameter 后无效。 */
    postBody( contentType: string, body: object|string ){
        this._bodyName = contentType
        if (typeof(body) == 'object')
            this._bodyValue = json.encode(body)
        else
            this._bodyValue = body
    }
    /** 发送请求
     * @param check 用于检查请求体的信息，可忽略
     * @returns 返回一个承诺对象，当请求结束时触发
     */
    send<T extends object>(check?: (req: CScriptHTTPRequest) => void) {
        const q = CreateHTTPRequest(this._method, this._url)
        Object
            .entries(this._headers)
            .map(
                ([name, value]) => q.SetHTTPRequestHeaderValue(name, value)
            )
        if (this._timeoutAbsolute)
            q.SetHTTPRequestAbsoluteTimeoutMS(this._timeoutAbsolute)
        if (this._timeout)
            q.SetHTTPRequestNetworkActivityTimeout(this._timeout)
        if (this._bodyName)
            q.SetHTTPRequestRawPostBody(this._bodyName, this._bodyValue)
        Object
            .entries(this._params)
            .map(
                ([name, value]) => q.SetHTTPRequestGetOrPostParameter(name, value)
            )
        return new Promise<T>((resolve,reject)=>{
            q.Send(res => {
                check?.(res.Request)
                if (res.StatusCode == 200){
                    let [body, pos, error] = json.decode(res.Body)
                    if(error)
                        reject(error)
                    if (!body)
                        reject(pos)
                    resolve(body)
                }
                else
                    reject(res)
            })
        })
    }
}