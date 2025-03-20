export class console {
    /** 存储计时器标签和开始时间的映射 */
    private static times = new Map<string, number>();

    /**
     * 内部方法，用于将文本输出到控制台
     * @param text 要输出的文本
     */
    private static write(text: string) {
        print(text);
    }

    private static format(...substitutions: unknown[]) {
        return [ ...substitutions].map(e=>tostring(e)).join(' ');
    }

    /**
     * 断言一个条件，如果条件为假则输出错误信息
     * @param value 要断言的值
     * @param message 断言失败时的消息
     * @param args 附加参数，将被格式化到消息中
     */
    public static assert(value: any, message = 'console.assert', ...args: any[]) {
        if (!value) {
            this.error(new Error(`Assertion failed: ${message}`), ...args);
        }
    }

    /**
     * 输出错误信息到控制台
     * @param args 要输出的参数列表，将被格式化后输出
     */
    public static error(...args: any[]) {
        this.write(`[ERROR] ${this.format(...args)}`);
    }

    /**
     * 输出警告信息到控制台
     * @param args 要输出的参数列表，将被格式化后输出
     */
    public static warn(...args: any[]) {
        this.write(`[WARN] ${this.format(...args)}`);
    }

    /**
     * 输出普通日志信息到控制台
     * @param args 要输出的参数列表，将被格式化后输出
     */
    public static log(...args: any[]) {
        this.write(this.format(...args));
    }

    /** 输出调试信息到控制台，功能与log相同 */
    public static debug = console.log;
    /**
     * 输出信息到控制台General
     * @param args 要输出的参数列表，将被格式化后输出
     */
    public static info(...args: any[]) {
        Msg(this.format(...args));
    }

    /**
     * 启动一个计时器
     * @param label 计时器的标签名称，默认为'default'
     */
    public static time(label = 'default') {
        label = `${label}`;

        if (this.times.has(label)) {
            this.warn(`Timer '${label}' already exists`);
            return;
        }

        this.times.set(label, Time());
    }

    /**
     * 结束一个计时器并输出其运行时间
     * @param label 计时器的标签名称，默认为'default'
     */
    public static timeEnd(label = 'default') {
        label = `${label}`;

        const startTime = this.times.get(label);
        if (startTime == null) {
            this.warn(`Timer '${label} does not exist'`);
            return;
        }

        this.times.delete(label);
        this.write(`${label}: ${Time() - startTime}s`);
    }

    /**
     * 输出当前的调用堆栈信息
     * @param message 要输出的消息
     * @param args 附加参数，将被格式化到消息中
     */
    public static trace(message: any = '', ...args: any[]) {
        const stack = debug.traceback('', 3);
        this.write(`Trace: ${this.format(message, ...args)}\n${stack}`);
    }

    /**
     * 清空控制台
     */
    public static clear() {
        SendToServerConsole('clear');
    }

    /**
     * 显示指定对象的属性列表
     * @throws 该方法尚未实现
     */
    public static dir() {
        throw new Error('console.dir is not implemented');
    }

    /**
     * 以XML格式显示对象
     * @throws 该方法尚未实现
     */
    public static dirxml() {
        throw new Error('console.dirxml is not implemented');
    }

    /**
     * 以表格形式显示数据
     */
    public static table(t: LuaTable | object | Array<any>) {
        // 获取所有一级和二级键
        const headers = new Set<string>();
        const rows: Record<string, any>[] = [];

        // 处理数组类型
        if (Array.isArray(t)) {
            // 遍历数组获取所有二级键
            t.forEach((item, index) => {
                if (typeof item === 'object' && item !== null) {
                    Object.keys(item).forEach(key => headers.add(tostring(key)));
                }
            });

            // 构建数据行
            t.forEach((item, index) => {
                const row: Record<string, any> = {};
                if (typeof item === 'object' && item !== null) {
                    Array.from(headers).forEach(header => {
                        row[header] = item[header] ?? '';
                    });
                } else {
                    row['Value'] = item;
                    headers.add('Value');
                }
                rows.push(row);
            });
        } else {
            // 处理对象类型
            const obj = t as Record<string, any>;
            Object.keys(obj).forEach(key => {
                const value = obj[key];
                if (typeof value === 'object' && value !== null) {
                    Object.keys(value).forEach(subKey => headers.add(tostring(subKey)));
                } else {
                    headers.add('Value');
                }
            });

            // 构建数据行
            Object.entries(obj).forEach(([key, value]) => {
                const row: Record<string, any> = { '(index)': key };
                if (typeof value === 'object' && value !== null) {
                    Array.from(headers).forEach(header => {
                        row[header] = value[header] ?? '';
                    });
                } else {
                    row['Value'] = value;
                }
                rows.push(row);
            });
            headers.add('(index)');
        }

        // 计算每列的最大宽度
        const columnWidths: Record<string, number> = {};
        const headerArray = Array.from(headers);
        headerArray.forEach(header => {
            columnWidths[header] = header.length;
            rows.forEach(row => {
                const value = tostring(row[header] ?? '');
                columnWidths[header] = Math.max(columnWidths[header], value.length);
            });
        });

        // 生成分隔线
        const separator = headerArray.map(header => 
            '─'.repeat(columnWidths[header] + 2)).join('┼');
        const line = `┌${separator}┐`;
        const middleLine = `├${separator}┤`;
        const bottomLine = `└${separator}┘`;

        // 输出表头
        this.write(line);
        const headerRow = headerArray.map(header =>
            ` ${header.padEnd(columnWidths[header])} `).join('│');
        this.write(`│${headerRow}│`);
        this.write(middleLine);

        // 输出数据行
        rows.forEach(row => {
            const dataRow = headerArray.map(header => {
                const value = tostring(row[header] ?? '');
                return ` ${value.padEnd(columnWidths[header])} `;
            }).join('│');
            this.write(`│${dataRow}│`);
        });

        // 输出底部边框
        this.write(bottomLine);
    }

    /**
     * 对调用次数进行计数
     * @throws 该方法尚未实现
     */
    public static count() {
        throw new Error('console.count is not implemented');
    }

    /**
     * 重置计数器
     * @throws 该方法尚未实现
     */
    public static countReset() {
        throw new Error('console.countReset is not implemented');
    }

    /**
     * 创建一个新的分组
     * @throws 该方法尚未实现
     */
    public static group() {
        throw new Error('console.group is not implemented');
    }

    /**
     * 创建一个新的折叠分组
     * @throws 该方法尚未实现
     */
    public static groupCollapsed() {
        throw new Error('console.groupCollapsed is not implemented');
    }

    /**
     * 结束当前分组
     * @throws 该方法尚未实现
     */
    public static groupEnd() {
        throw new Error('console.groupEnd is not implemented');
    }

    /**
     * 启动性能分析器
     * @throws 该方法尚未实现
     */
    public static profile() {
        throw new Error('console.profile is not implemented');
    }

    /**
     * 停止性能分析器
     * @throws 该方法尚未实现
     */
    public static profileEnd() {
        throw new Error('console.profileEnd is not implemented');
    }

    /**
     * 添加时间戳标记
     * @throws 该方法尚未实现
     */
    public static timeStamp() {
        throw new Error('console.timeStamp is not implemented');
    }
}